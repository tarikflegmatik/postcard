"use client";

import { motion } from "motion/react";

type Props = { title: string; selected: boolean; onClick: () => void };

const CustomMarker = ({ title, selected, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      animate={{ scale: selected ? 1.5 : 1, y: selected ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex -translate-y-1/2 cursor-pointer flex-col items-center select-none"
    >
      <div className="relative mb-1 flex">
        <motion.div
          animate={{ rotate: selected ? -15 : -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute -left-2 h-7 w-5 rounded-sm border border-black bg-white shadow"
        />
        <motion.div className="z-10 h-7 w-5 rounded-sm border border-black bg-black shadow" />
        <motion.div
          animate={{ rotate: selected ? 15 : 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute left-2 h-7 w-5 rounded-sm border border-black bg-white shadow"
        />
      </div>
      <div
        className={`rounded-lg px-2 py-1 text-xs font-semibold shadow-md ${
          selected ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        {title}
      </div>
      <div className="mt-1 h-2 w-2 rounded-full border-2 border-white bg-black" />
    </motion.div>
  );
};

export default CustomMarker;
