import React from "react";
import Image from "next/image";
import { FlipCardButton } from "./providers/FlipCardProvider";
import { Media, Postcard } from "@/lib/types/payload-types";

const PostcardFront = ({ postcard }: { postcard: Postcard }) => {
  const mainImage = postcard.front.mainImage as Media;

  return (
    <div className={"relative h-full w-full border p-5 shadow-xl"}>
      <div className={"relative h-full w-full"}>
        <Image
          className={"h-full w-full object-cover"}
          src={mainImage.url || ""}
          alt={mainImage.alt || ""}
          fill
        />
      </div>
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 h-[60px] w-[60px] rounded-full border border-black bg-black text-xs font-semibold break-words text-white backface-hidden hover:cursor-pointer lg:text-sm lg:font-bold"
        }
      >
        Flip
      </FlipCardButton>
    </div>
  );
};

export default PostcardFront;
