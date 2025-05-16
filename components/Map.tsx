"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import CustomMarker from "@/components/CustomMarker";
import { useSelection } from "@/components/providers/SelectionProvider";
import throttle from "lodash/throttle";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Init map config
const initMap = (container: HTMLDivElement): mapboxgl.Map => {
  return new mapboxgl.Map({
    container,
    style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
    center: [16.453371, 43.469612],
    zoom: 9,
    minZoom: 4,
    maxZoom: 12,
    maxBounds: [
      [13.0, 41.8],
      [20.0, 46.6],
    ],
    attributionControl: false,
  });
};

const MapElement = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRoots = useRef<Map<number, { root: Root; el: HTMLDivElement }>>(
    new Map(),
  );
  const prevSelectedId = useRef<number | null>(null);

  const { locations, selectedLocation, setSelectedLocation } = useSelection();

  // 1️⃣ Init map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = initMap(mapContainerRef.current);
    mapRef.current = map;

    const clear = throttle(() => setSelectedLocation(null), 300);
    map.on("dragstart", clear);

    return () => {
      map.off("dragstart", clear);
      map.remove();
      mapRef.current = null;
    };
  }, [setSelectedLocation]);

  // 2️⃣ Add markers on locations change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Cleanup old markers
    markerRoots.current.forEach(({ root, el }) => {
      queueMicrotask(() => {
        root.unmount();
        el.remove(); // 🔥 remove marker from DOM
      });
    });
    markerRoots.current.clear();

    locations.forEach((location) => {
      const el = document.createElement("div");

      new mapboxgl.Marker(el)
        .setLngLat([location.coords.longitude, location.coords.latitude])
        .addTo(map);

      const root = createRoot(el);
      root.render(
        <CustomMarker
          title={location.name}
          selected={false}
          onClick={() => setSelectedLocation(location)}
        />,
      );

      markerRoots.current.set(location.id, { root, el });
    });
  }, [locations, setSelectedLocation]);

  // 3️⃣ Update only changed selection marker
  useEffect(() => {
    const currentId = selectedLocation?.id ?? null;
    const prevId = prevSelectedId.current;

    if (currentId === prevId) return;

    // 🔄 Unselect previous
    if (prevId) {
      const { root } = markerRoots.current.get(prevId)!;
      const location = locations.find((location) => location.id === prevId)!;

      root.render(
        <CustomMarker
          title={location.name}
          selected={false}
          onClick={() => setSelectedLocation(location)}
        />,
      );
    }

    // ✅ Select new
    if (currentId) {
      const { root } = markerRoots.current.get(currentId)!;
      const location = locations.find((location) => location.id === currentId)!;
      root.render(
        <CustomMarker
          title={location.name}
          selected={true}
          onClick={() => setSelectedLocation(location)}
        />,
      );

      const COORDS_OFFSET: [number, number] = [0, -200];
      mapRef.current?.flyTo({
        center: [location.coords.longitude, location.coords.latitude],
        zoom: 12,
        speed: 1.2,
        offset: COORDS_OFFSET,
      });
    }

    prevSelectedId.current = currentId;
  }, [selectedLocation, locations, setSelectedLocation]);

  return (
    <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />
  );
};

export default MapElement;
