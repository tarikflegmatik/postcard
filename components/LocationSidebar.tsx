"use client";

import { useSelection } from "@/components/providers/SelectionProvider";

const LocationSidebar = () => {
  const { locations, selectedLocation, setSelectedLocation } = useSelection();
  return (
    <aside
      className={`hidden ${selectedLocation ? "h-2/5" : "h-full"} w-80 flex-col overflow-y-auto border-r border-black/5 bg-white/90 pt-16 pr-10 pl-6 shadow-md shadow-black/10 md:flex xl:h-full xl:pl-16`}
    >
      <h2 className="mb-4 text-xl font-bold">Locations</h2>
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => setSelectedLocation(location)}
          className={`mb-2 rounded-lg border-2 px-3 py-2 text-left transition hover:cursor-pointer ${
            selectedLocation?.id === location.id
              ? "border-[#007092] bg-[#007092]/10 font-semibold text-[#007092]"
              : "border-transparent bg-[#80AFBE]/10 font-medium text-[#383838]"
          }`}
        >
          {location.name}
        </button>
      ))}
    </aside>
  );
};

export default LocationSidebar;
