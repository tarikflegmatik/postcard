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
    className="fixed inset-x-0 bottom-0 z-10 flex h-full max-h-3/5 flex-col rounded-t-4xl border-t border-black/5 bg-white p-6 pr-4 shadow-md md:hidden"
  >
    <h2 className="mb-4 text-left text-lg font-semibold">Explore locations</h2>
    <div className="flex flex-1 flex-col overflow-y-auto">
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => onSelect(location)}
          className={`mb-2 rounded-lg border-2 px-4 py-5 text-left transition hover:cursor-pointer ${
            selectedId === location.id
              ? "border-[#007092] bg-[#007092]/10 font-semibold text-[#007092]"
              : "border-transparent bg-[#80AFBE]/10 font-medium text-[#383838]"
          }`}
        >
          {location.name}
        </button>
      ))}
    </div>
    <button
      onClick={onClose}
      className="mt-6 flex w-full items-center justify-center rounded-lg border-[#007092] bg-[#007092] px-4 py-5 text-white hover:cursor-pointer hover:bg-[#007092]/80"
    >
      <h3 className="font-bold">Close</h3>
    </button>
  </motion.div>
);

export default MobileLocationDrawer;
