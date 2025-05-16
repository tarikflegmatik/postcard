"use client";

import React from "react";
import { motion } from "motion/react";

type LocationDrawerToggleProps = {
  onClick: () => void;
};

const LocationDrawerToggle: React.FC<LocationDrawerToggleProps> = ({
  onClick,
}) => (
  <motion.div
    key="toggle"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed inset-x-0 bottom-0 z-10 flex h-fit flex-col rounded-t-4xl border-t border-black/5 bg-white p-6 pr-4 shadow-md md:hidden"
  >
    <h2 className="mb-4 text-left text-lg font-semibold">Explore locations</h2>
    <button
      className="flex w-full items-center justify-center rounded-md border-[#007092] bg-[#007092] py-5 hover:cursor-pointer hover:bg-[#007092]/80"
      onClick={onClick}
    >
      <h3 className="text-2xl font-bold text-white">Generate a Postcard</h3>
    </button>
  </motion.div>
);

export default LocationDrawerToggle;
