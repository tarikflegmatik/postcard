"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { Media, Postcard } from "@/lib/types/payload-types";

type PostcardCarouselProps = {
  postcards: Postcard[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  listRef: React.Ref<HTMLDivElement>;
};

const CardCarousel = forwardRef<HTMLDivElement, PostcardCarouselProps>(
  (
    { postcards, activeIndex, onPrev, onNext, onSelect, listRef },
    carouselRef,
  ) => (
    <>
      <div className="relative flex flex-1 items-center justify-center">
        <button
          onClick={onPrev}
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:cursor-pointer"
        >
          &#8592;
        </button>

        <div
          ref={carouselRef as React.RefObject<HTMLDivElement>}
          className="scrollbar-none flex w-full max-w-xl touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {postcards.map((postcard) => (
            <div
              key={postcard.id}
              className="flex h-full w-full max-w-xl flex-shrink-0 snap-center flex-col gap-2"
            >
              <h2 className="text-center text-xl font-semibold">
                {postcard.name}
              </h2>
              <div className="relative aspect-[80/45] h-full w-full">
                <Image
                  src={(postcard.front.mainImage as Media).url || ""}
                  alt={(postcard.front.mainImage as Media).alt || ""}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:cursor-pointer"
        >
          &#8594;
        </button>
      </div>

      <div className="my-8 flex w-full justify-center md:hidden">
        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className="flex h-14 w-fit max-w-xl gap-1 overflow-x-auto scroll-smooth"
        >
          {postcards.map((postcard, index) => {
            const isSelected = index === activeIndex;
            return (
              <div
                key={postcard.id}
                onClick={() => onSelect(index)}
                className={`relative aspect-[80/45] h-full transition-opacity hover:cursor-pointer ${
                  isSelected
                    ? "border-2 border-black opacity-100"
                    : "opacity-60"
                }`}
              >
                <Image
                  src={(postcard.front.mainImage as Media).url || ""}
                  alt={(postcard.front.mainImage as Media).alt || ""}
                  fill
                  className="object-cover shadow-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  ),
);

CardCarousel.displayName = "PostcardCarousel";
export default CardCarousel;
