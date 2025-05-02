"use client";

import { useSelection } from "@/components/providers/SelectionProvider";

const LocationSidebar = () => {
  const { locations, selectedLocation, setSelectedLocation } = useSelection();
  return (
    <aside className="hidden w-72 flex-col overflow-y-auto border-r border-black/5 bg-white/90 p-4 pl-16 shadow-md shadow-black/10 md:flex">
      <h2 className="mb-4 text-xl font-bold">Locations</h2>
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => setSelectedLocation(location)}
          className={`mb-2 rounded-lg px-3 py-2 text-left transition hover:cursor-pointer ${
            selectedLocation?.id === location.id
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {location.name}
        </button>
      ))}
    </aside>
  );
};

export default LocationSidebar;
