"use client";

import { motion } from "motion/react";

type Props = { title: string; selected: boolean; onClick?: () => void };

const CustomMarker = ({ title, selected, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      animate={{ scale: selected ? 1.5 : 1, y: selected ? -10 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex -translate-y-1/2 cursor-pointer flex-col items-center select-none"
    >
      <div
        className={`rounded-lg border-1 border-[#007092] px-2 py-1 text-xs font-semibold shadow-md ${
          selected ? "bg-white text-[#007092]" : "bg-[#007092] text-white"
        }`}
      >
        {title}
      </div>
      <div className="mt-1 h-2 w-2 rounded-full border-2 border-white bg-[#007092]" />
    </motion.div>
  );
};

export default CustomMarker;
