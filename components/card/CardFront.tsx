import React from "react";
import Image from "next/image";
import { FlipCardButton } from "../providers/FlipCardProvider";
import { Invitation, Media, Postcard } from "@/lib/types/payload-types";

type CardPreviewType = "postcard-template" | "invitation" | "postcard-created";
type CardSupportedLanguage = "english" | "croatian";

const CardFrontBorder = ({
  type,
  card,
}: {
  type: CardPreviewType;
  card: Postcard | Invitation;
}) => {
  if (type === "invitation") {
    const borderPattern = card.front.borderPattern as Media;
    if (!borderPattern) {
      return <div className="absolute inset-0 z-10 bg-white" />;
    }
    return (
      <div
        className="absolute inset-0 z-10 bg-[length:8px_8px] bg-repeat-space sm:bg-[length:12px_12px] md:bg-[length:20px_20px]"
        style={{
          backgroundImage: `url("${borderPattern.url}")`,
          backgroundPosition: "top left",
          backgroundRepeat: "space",
        }}
      />
    );
  }
  if (type === "postcard-template" || type === "postcard-created") {
    return <div className="absolute inset-0 z-10 bg-white" />;
  }
};

const CardFrontHashtag = ({ hashtag }: { hashtag: string }) => {
  return (
    <div
      className={
        "absolute right-2 bottom-0 z-20 bg-white px-1 py-2 sm:right-3 sm:px-2 sm:py-3 md:right-5"
      }
    >
      <span
        className={
          "[font-family:var(--font-caveat)] text-base sm:text-xl md:text-2xl lg:text-3xl"
        }
      >
        {hashtag}
      </span>
    </div>
  );
};

const CardFront = ({
  type,
  lang,
  card,
}: {
  type: CardPreviewType;
  lang: CardSupportedLanguage;
  card: Postcard | Invitation;
}) => {
  const mainImage = card.front.mainImage as Media;
  const hashtag = "hashtag" in card ? card.hashtag : "";

  return (
    <div
      className={
        "relative h-full w-full border bg-white p-2 shadow-xl sm:p-3 md:p-5"
      }
    >
      <CardFrontBorder type={type} card={card} />
      <div className={"relative z-20 h-full w-full"}>
        <Image
          className={"h-full w-full object-cover"}
          src={mainImage.url || ""}
          alt={mainImage.alt || ""}
          fill
        />
      </div>
      {hashtag && <CardFrontHashtag hashtag={hashtag} />}
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 z-30 h-[45px] w-[45px] rounded-full border border-white bg-[#BEA568] text-xs font-semibold break-words text-white hover:cursor-pointer sm:h-[60px] sm:w-[60px] lg:text-sm lg:font-bold"
        }
      >
        {lang === "croatian" ? "Okreni" : "Flip"}
      </FlipCardButton>
    </div>
  );
};

export default CardFront;
