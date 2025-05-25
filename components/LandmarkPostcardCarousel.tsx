"use client";

import CardCarouselSimple from "@/components/CardCarouselSimple";
import Link from "next/link";
import { useRef } from "react";
import { useCarousel } from "@/lib/hooks/useCarousel";
import { Postcard } from "@/lib/types/payload-types";

const LandmarkPostcardCarousel = ({ postcards }: { postcards: Postcard[] }) => {
  // Centralize carousel logic
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { activeIndex, setActiveIndex } = useCarousel(
    postcards.length,
    carouselRef,
    listRef,
  );
  return (
    <div className="flex w-full overflow-hidden">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <CardCarouselSimple
          ref={carouselRef}
          listRef={listRef}
          postcards={postcards}
          activeIndex={activeIndex}
          onPrev={() => setActiveIndex(activeIndex - 1)}
          onNext={() => setActiveIndex(activeIndex + 1)}
          onSelect={(index) => setActiveIndex(index)}
        />

        <div className="mt-2 flex flex-col items-center md:mt-1">
          <Link
            href={`/postcards/templates/${postcards[activeIndex]?.slug}`}
            target="_blank"
            className="w-full max-w-sm rounded-lg border-2 border-[#007092] bg-[#007092] py-5 text-center text-white shadow-md hover:bg-[#007092]/80"
          >
            Create your Postcard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandmarkPostcardCarousel;
