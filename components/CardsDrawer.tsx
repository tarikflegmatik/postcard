"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSelection } from "@/components/providers/SelectionProvider";
import { Media } from "@/lib/types/payload-types";

const CardsDrawer = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselListRef = useRef<HTMLDivElement>(null);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<number>(0);
  const [isMobileLocationsDrawerOpen, setIsMobileLocationsDrawerOpen] =
    useState(false);

  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    filteredPostcards,
  } = useSelection();

  useEffect(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;

    setSelectedPreviewIndex(0);

    const updateActivePreview = () => {
      const scrollLeft = container.scrollLeft;
      const containerItems = container.children;

      const GAP_WIDTH = 16;
      const itemWidth = containerItems[0].clientWidth + GAP_WIDTH;
      const currentPostcard = Math.round(scrollLeft / itemWidth);

      setSelectedPreviewIndex(currentPostcard);
    };

    let scrollTimeout: NodeJS.Timeout | null = null;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActivePreview, 100);
    };

    container.addEventListener("scroll", onScroll);
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      container.removeEventListener("scroll", onScroll);
    };
  }, [selectedLocation]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    container.scrollTo({
      left: container.clientWidth * selectedPreviewIndex,
      behavior: "smooth",
    });
    if (!carouselListRef.current) return;
    const listContainer = carouselListRef.current;
    const listItems = Array.from(listContainer.children);
    listItems[selectedPreviewIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [selectedPreviewIndex]);

  return (
    <AnimatePresence>
      {selectedLocation && (
        <motion.div
          key={1}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-20 flex min-h-3/5 flex-col border-t border-black/5 bg-white p-6 shadow-md shadow-black/10 xl:left-80"
        >
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold">{selectedLocation?.name}</h3>
            <p className="text-gray-600">
              Select your favorite postcard design
            </p>
          </div>
          <div className="mt-5 flex flex-1 overflow-hidden md:mt-6">
            <div className="hidden w-60 flex-col overflow-y-auto pr-4 md:flex">
              {filteredPostcards.map((postcard, index) => (
                <button
                  key={postcard.id}
                  onClick={() => setSelectedPreviewIndex(index)}
                  className={`mb-2 rounded-lg px-3 py-2 text-left transition hover:cursor-pointer ${
                    index === selectedPreviewIndex
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {postcard.name}
                </button>
              ))}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="relative flex flex-1 items-center justify-center">
                <button
                  onClick={() =>
                    setSelectedPreviewIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="absolute top-1/2 left-4 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:cursor-pointer"
                >
                  &#8592;
                </button>

                <div
                  ref={carouselRef}
                  className="scrollbar-none flex w-full max-w-xl touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
                >
                  {filteredPostcards.map((postcard) => (
                    <div
                      key={postcard.id}
                      className={
                        "flex h-full w-full max-w-xl flex-shrink-0 snap-center flex-col gap-2"
                      }
                    >
                      <h2 className={"text-center text-xl font-semibold"}>
                        {postcard.name}
                      </h2>
                      <div
                        key={postcard.id}
                        className="relative aspect-[80/45] h-full w-full"
                      >
                        <Image
                          src={(postcard.front.mainImage as Media).url || ""}
                          alt={(postcard.front.mainImage as Media).alt || ""}
                          fill
                          className="rounded-lg object-cover shadow-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setSelectedPreviewIndex((prev) =>
                      Math.min(filteredPostcards.length - 1, prev + 1),
                    )
                  }
                  className="absolute top-1/2 right-4 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md hover:cursor-pointer"
                >
                  &#8594;
                </button>
              </div>
              <div className={"my-8 flex w-full justify-center md:hidden"}>
                <div
                  ref={carouselListRef}
                  className={
                    "flex h-14 w-full max-w-xl justify-center gap-1 overflow-x-auto scroll-smooth"
                  }
                >
                  {filteredPostcards.map((postcard, index) => {
                    const isSelected = selectedPreviewIndex === index;
                    return (
                      <div
                        key={postcard.id}
                        onClick={() => setSelectedPreviewIndex(index)}
                        className={`relative aspect-[80/45] h-full py-4 transition-opacity hover:cursor-pointer ${isSelected ? "border-2 border-black opacity-100" : "opacity-60"}`}
                      >
                        <Image
                          src={(postcard.front.mainImage as Media).url || ""}
                          alt={(postcard.front.mainImage as Media).alt || ""}
                          fill
                          className="object-cover shadow-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-2 md:mt-5">
                <Link
                  href={`/postcards/templates/${filteredPostcards[selectedPreviewIndex].slug}`}
                  className="w-full max-w-sm rounded-lg border bg-black py-5 text-center text-white shadow-md transition-colors hover:bg-white hover:text-black"
                >
                  Create your Postcard
                </Link>
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setIsMobileLocationsDrawerOpen(false);
                  }}
                  className={
                    "mb-2 w-full max-w-sm rounded-lg border bg-white py-5 text-center text-black transition hover:cursor-pointer md:hidden"
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {!isMobileLocationsDrawerOpen && (
        <motion.div
          key={2}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-10 flex h-fit flex-col border-t border-black/5 bg-white p-6 pr-4 shadow-md shadow-black/10 md:hidden"
        >
          <button
            className={
              "flex w-full items-center justify-center rounded-md bg-gray-100 py-5 hover:cursor-pointer hover:bg-gray-200"
            }
            onClick={() => setIsMobileLocationsDrawerOpen(true)}
          >
            <h3 className={"text-2xl font-bold"}>Explore Locations</h3>
          </button>
        </motion.div>
      )}
      {isMobileLocationsDrawerOpen && (
        <motion.div
          key={3}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 bottom-0 left-0 z-10 flex h-full max-h-4/5 flex-col border-t border-black/5 bg-white p-6 pr-4 shadow-md shadow-black/10 md:hidden"
        >
          <h2 className="mb-4 text-center text-xl font-bold">Locations</h2>
          <div className={"flex flex-1 flex-col overflow-y-auto"}>
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  setSelectedLocation(location);
                  setIsMobileLocationsDrawerOpen(false);
                }}
                className={`mb-2 rounded-lg px-4 py-5 text-center transition hover:cursor-pointer ${
                  selectedLocation?.id === location.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
          <button
            className={
              "mt-6 flex w-full items-center justify-center rounded-lg bg-black px-4 py-5 text-white hover:cursor-pointer"
            }
            onClick={() => setIsMobileLocationsDrawerOpen(false)}
          >
            <h3 className={"font-bold"}>Close</h3>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardsDrawer;
