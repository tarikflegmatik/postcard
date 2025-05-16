"use client";

import React from "react";
import { motion } from "motion/react";
import { Location } from "@/lib/types/payload-types";

type MobileLocationDrawerProps = {
  locations: Location[];
  selectedId?: number;
  onSelect: (loc: Location) => void;
  onClose: () => void;
};

const MobileLocationDrawer: React.FC<MobileLocationDrawerProps> = ({
  locations,
  selectedId,
  onSelect,
  onClose,
}) => (
  <motion.div
    key="mobileDrawer"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed inset-x-0 bottom-0 z-10 flex h-full max-h-4/5 flex-col border-t border-black/5 bg-white p-6 pr-4 shadow-md md:hidden"
  >
    <h2 className="mb-4 text-center text-xl font-bold">Locations</h2>
    <div className="flex flex-1 flex-col overflow-y-auto">
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => onSelect(location)}
          className={`mb-2 rounded-lg px-4 py-5 text-center transition hover:cursor-pointer ${
            selectedId === location.id
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {location.name}
        </button>
      ))}
    </div>
    <button
      onClick={onClose}
      className="mt-6 flex w-full items-center justify-center rounded-lg bg-black px-4 py-5 text-white hover:cursor-pointer"
    >
      <h3 className="font-bold">Close</h3>
    </button>
  </motion.div>
);

export default MobileLocationDrawer;
