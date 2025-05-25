"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import CustomMarker from "@/components/CustomMarker";
import { Location } from "@/lib/types/payload-types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Init map config
const initMap = (
  container: HTMLDivElement,
  view: Props["view"],
): mapboxgl.Map => {
  return new mapboxgl.Map({
    container,
    style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
    center: [view.longitude, view.latitude],
    zoom: 12,
    minZoom: 4,
    maxZoom: 12,
    maxBounds: [
      [13.0, 41.8],
      [20.0, 46.6],
    ],
    attributionControl: false,
    interactive: false,
  });
};

type Props = {
  location: Location;
  view: {
    longitude: number;
    latitude: number;
  };
};

const StaticLocationMap = ({ location, view }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // 1️⃣ Init map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = initMap(mapContainerRef.current, view);
    mapRef.current = map;

    const el = document.createElement("div");

    new mapboxgl.Marker(el)
      .setLngLat([view.longitude, view.latitude])
      .addTo(map);

    const root = createRoot(el);
    root.render(<CustomMarker title={location.name} selected={true} />);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [location.name, view]);

  return (
    <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />
  );
};

export default StaticLocationMap;
