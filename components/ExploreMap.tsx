"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import SplitImage from "@/public/split.jpg";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

type MarkerProps = { title: string; selected: boolean; onClick: () => void };
function CustomMarker({ title, selected, onClick }: MarkerProps) {
  return (
    <motion.div
      onClick={onClick}
      animate={{ scale: selected ? 1.5 : 1, y: selected ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center cursor-pointer select-none -translate-y-1/2"
    >
      <div className="relative flex mb-1">
        <motion.div
          animate={{ rotate: selected ? -15 : -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-5 h-7 bg-white border border-black rounded-sm shadow -left-2"
        />
        <motion.div className="w-5 h-7 bg-black border border-black rounded-sm shadow z-10" />
        <motion.div
          animate={{ rotate: selected ? 15 : 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-5 h-7 bg-white border border-black rounded-sm shadow left-2"
        />
      </div>
      <div
        className={`px-2 py-1 rounded-lg text-xs font-semibold shadow-md ${
          selected ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {title}
      </div>
      <div className="w-2 h-2 rounded-full border-2 border-white bg-black mt-1" />
    </motion.div>
  );
}

export default function PostcardMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [postcardIndex, setPostcardIndex] = useState(0);
  const markerRoots = useRef<Map<number, Root>>(new Map());
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample data
  const locations = [
    { id: 1, title: "Zagreb", coords: [15.9819, 45.815] as [number, number] },
    { id: 2, title: "Split", coords: [16.4402, 43.5081] as [number, number] },
    {
      id: 3,
      title: "Dubrovnik",
      coords: [18.0944, 42.6507] as [number, number],
    },
    { id: 4, title: "Zadar", coords: [15.2314, 44.1194] as [number, number] },
    { id: 5, title: "Solin", coords: [16.4884, 43.5396] as [number, number] },
  ];

  const postcardsByLocation: Record<
    number,
    { id: number; title: string; image: string }[]
  > = {
    1: [
      { id: 101, title: "Zagreb Cathedral", image: "/postcards/zagreb1.jpg" },
      { id: 102, title: "Ban Jelačić Square", image: "/postcards/zagreb2.jpg" },
    ],
    2: [
      { id: 201, title: "Diocletian's Palace", image: "/postcards/split1.jpg" },
      { id: 202, title: "Marjan Hill", image: "/postcards/split2.jpg" },
    ],
    3: [
      { id: 301, title: "Old Town Walls", image: "/postcards/dubrovnik1.jpg" },
      { id: 302, title: "Stradun", image: "/postcards/dubrovnik2.jpg" },
    ],
    4: [
      { id: 401, title: "Sea Organ", image: "/postcards/zadar1.jpg" },
      { id: 402, title: "Sun Salutation", image: "/postcards/zadar2.jpg" },
    ],
    5: [
      { id: 501, title: "Solin Antiquity", image: "/postcards/solin1.jpg" },
      { id: 502, title: "Salona Ruins", image: "/postcards/solin2.jpg" },
    ],
  };

  // Initialize map and markers
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [16, 45],
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 12,
      maxBounds: [
        [13.0, 41.8],
        [20.0, 46.6],
      ],
      attributionControl: false,
    });
    mapRef.current = map;

    locations.forEach((loc) => {
      const el = document.createElement("div");
      new mapboxgl.Marker(el).setLngLat(loc.coords).addTo(map);
      const root = createRoot(el);
      root.render(
        <CustomMarker
          title={loc.title}
          selected={false}
          onClick={() => selectLocation(loc.id)}
        />,
      );
      markerRoots.current.set(loc.id, root);
    });

    map.on("dragstart", clearSelection);

    return () => map.remove();
  }, []);

  // Update marker selection state
  useEffect(() => {
    markerRoots.current.forEach((root, id) => {
      const isSel = id === selectedLocation;
      const loc = locations.find((l) => l.id === id)!;
      root.render(
        <CustomMarker
          title={loc.title}
          selected={isSel}
          onClick={() => selectLocation(id)}
        />,
      );
    });
  }, [selectedLocation]);

  const selectLocation = (id: number) => {
    setSelectedLocation(id);
    setPostcardIndex(0);
    const loc = locations.find((l) => l.id === id)!;
    const COORDS_OFFSET: [number, number] = [0, -200];
    mapRef.current?.flyTo({
      center: loc.coords,
      zoom: 12,
      speed: 1.2,
      offset: COORDS_OFFSET,
    });
  };

  const clearSelection = () => setSelectedLocation(null);

  const selectedPostcards =
    selectedLocation != null ? postcardsByLocation[selectedLocation] : [];
  const hasCards = selectedPostcards.length > 0;

  // Scroll carousel on index change
  useEffect(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    container.scrollTo({
      left: container.clientWidth * postcardIndex,
      behavior: "smooth",
    });
  }, [postcardIndex]);

  // Sync scroll->index on user drag
  useEffect(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;

    const updateActivePreview = () => {
      const scrollLeft = container.scrollLeft;
      const containerItems = container.children;
      const itemWidth = containerItems[0].clientWidth + 16; // item + gap
      const currentPage = Math.round(scrollLeft / itemWidth);

      setPostcardIndex(currentPage);
    };

    let scrollTimeout: NodeJS.Timeout | null = null;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActivePreview, 100);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [selectedLocation]);

  return (
    <div className="flex h-screen w-screen overflow-visible">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/90 p-4 overflow-y-auto">
        <h2 className="font-bold text-xl mb-4">Locations</h2>
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => selectLocation(loc.id)}
            className={`mb-2 px-3 py-2 rounded-lg transition text-left hover:cursor-pointer ${
              selectedLocation === loc.id
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {loc.title}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Map indicator */}
        <div className={"relative flex-1"}>
          <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-white/70 backdrop-blur-md shadow-md">
            <div className="flex items-center space-x-2">
              <Image src="/next.svg" alt="Postcard" width={32} height={32} />
              <span className="font-bold text-lg">Postcard</span>
            </div>
            {hasCards && (
              <button
                onClick={clearSelection}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Drawer */}
        <AnimatePresence>
          {hasCards && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed z-10 bottom-0 left-64 right-0 h-3/5 bg-white p-6 border-t shadow-inner flex flex-col"
            >
              {/* Header */}
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-bold">
                  {locations.find((l) => l.id === selectedLocation)?.title}
                </h3>
                <p className="text-gray-600">
                  Select your favorite postcard design
                </p>
              </div>

              {/* Body */}
              <div className="flex flex-1 overflow-hidden">
                <aside className="hidden lg:flex flex-col w-48 pr-4 overflow-y-auto">
                  {selectedPostcards.map((pc, idx) => (
                    <button
                      key={pc.id}
                      onClick={() => setPostcardIndex(idx)}
                      className={`py-2 px-3 mb-2 rounded-lg transition text-left hover:cursor-pointer ${
                        idx === postcardIndex
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {pc.title}
                    </button>
                  ))}
                </aside>

                <div className="flex-1 flex flex-col overflow-y-auto">
                  <div className="relative flex-1 flex items-center justify-center">
                    <button
                      onClick={() =>
                        setPostcardIndex(
                          (postcardIndex - 1 + selectedPostcards.length) %
                            selectedPostcards.length,
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
                    >
                      &#8592;
                    </button>

                    <div
                      ref={carouselRef}
                      className="overflow-x-auto w-full max-w-xl maxw gap-4 flex snap-x snap-mandatory touch-pan-x scrollbar-none scroll-smooth"
                    >
                      {selectedPostcards.map((pc) => (
                        <div
                          key={pc.id}
                          className="snap-center relative aspect-[80/45] h-full flex-shrink-0 w-full max-w-xl"
                        >
                          <Image
                            unoptimized
                            src={SplitImage}
                            alt={pc.title}
                            fill
                            className="object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setPostcardIndex(
                          (postcardIndex + 1) % selectedPostcards.length,
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
                    >
                      &#8594;
                    </button>
                  </div>

                  <div className="flex justify-center w-full">
                    <Link
                      href={`/templates/${selectedPostcards[postcardIndex]?.id}`}
                      className="px-6 py-2 bg-black border text-white shadow-md hover:bg-white hover:text-black transition-colors"
                    >
                      Create Your Own Postcard
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
