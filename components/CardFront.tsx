import React from "react";
import Image from "next/image";
import { FlipCardButton } from "./providers/FlipCardProvider";
import { Invitation, Media, Postcard } from "@/lib/types/payload-types";

const CardFront = ({ card }: { card: Postcard | Invitation }) => {
  const mainImage = card.front.mainImage as Media;
  const borderPattern = card.front.borderPattern as Media;

  return (
    <div
      className={"relative h-full w-full border bg-white p-3 shadow-xl md:p-5"}
    >
      <div
        className="absolute top-0 left-0 z-10 h-full w-full bg-[length:12px_12px] bg-repeat-space md:bg-[length:20px_20px]"
        style={{
          backgroundImage: `url(${borderPattern.url})`,
          backgroundPosition: "top left",
          backgroundRepeat: "space",
        }}
      />
      <div className={"relative z-20 h-full w-full"}>
        <Image
          className={"h-full w-full object-cover"}
          src={mainImage.url || ""}
          alt={mainImage.alt || ""}
          fill
        />
      </div>
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 z-30 h-[60px] w-[60px] rounded-full border border-white bg-[#BEA568] text-xs font-semibold break-words text-white hover:cursor-pointer lg:text-sm lg:font-bold"
        }
      >
        Okreni
      </FlipCardButton>
    </div>
  );
};

export default CardFront;
