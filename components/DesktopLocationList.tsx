"use client";

import React from "react";
import { Postcard } from "@/lib/types/payload-types";

type DesktopLocationListProps = {
  postcards: Postcard[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const DesktopLocationList: React.FC<DesktopLocationListProps> = ({
  postcards,
  activeIndex,
  onSelect,
}) => (
  <div className="hidden w-60 flex-col overflow-y-auto pr-4 md:flex">
    {postcards.map((postcard, index) => (
      <button
        key={postcard.id}
        onClick={() => onSelect(index)}
        className={`mb-2 rounded-lg border-2 px-3 py-2 text-left transition hover:cursor-pointer ${
          index === activeIndex
            ? "border-[#007092] bg-[#007092]/10 font-semibold text-[#007092]"
            : "border-transparent bg-[#80AFBE]/10 font-medium text-[#383838]"
        }`}
      >
        {postcard.name}
      </button>
    ))}
  </div>
);

export default DesktopLocationList;
