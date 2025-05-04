import React from "react";
import Image from "next/image";
import { FlipCardButton } from "./providers/FlipCardProvider";
import { Invitation, Media, Postcard, Stamp } from "@/lib/types/payload-types";

// Manually created Type, might cause an issue
type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
};

const CardBack = ({ card }: { card: Postcard | Invitation }) => {
  console.log(card);
  const messageTextCollection = (
    card.back.messageText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const signatureTextCollection = (
    card.back.signatureText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const borderPattern = card.front.borderPattern as Media;
  const postageStampImage = (card.back.postageStamp as Stamp).image as Media;

  return (
    <div
      className={
        "relative aspect-[80/45] h-full w-full border bg-white p-3 shadow-xl md:p-5"
      }
    >
      <div
        className="absolute top-0 left-0 z-10 h-full w-full bg-[length:12px_12px] bg-repeat md:bg-[length:20px_20px]"
        style={{
          backgroundImage: `url(${borderPattern.url})`,
          backgroundPosition: "top left",
        }}
      />

      <div
        className={
          "relative z-20 flex h-full w-full divide-x bg-white px-4 py-5 md:py-7"
        }
      >
        <div
          className={`font-kalam flex h-full flex-1 flex-col justify-center gap-0.5 pr-2 text-base sm:gap-1 sm:text-lg md:gap-3 lg:gap-5 lg:text-3xl`}
        >
          {messageTextCollection.map((textBlock, i) => (
            <p key={i} className={"[font-family:var(--font-reenie-beanie)]"}>
              {textBlock}
            </p>
          ))}
        </div>
        <div
          className={"flex flex-1 flex-col items-center justify-between pl-2"}
        >
          <div className={"flex h-fit w-full justify-end"}>
            <div className={"w-8/12"}>
              {/* pt-[100%] -> replacement for aspect-square because of Safari browser support issue */}
              <div className={"relative w-full pt-[100%]"}>
                <Image
                  className={"object-contain"}
                  src={postageStampImage.url || ""}
                  alt={postageStampImage.alt}
                  fill
                />
              </div>
            </div>
          </div>
          <div
            className={`font-kalam flex h-full w-full flex-col items-center justify-center gap-2 text-base sm:text-lg lg:text-3xl`}
          >
            {signatureTextCollection.map((textBlock, i) => (
              <span
                key={i}
                className={
                  "ml-1 w-full text-center [font-family:var(--font-reenie-beanie)]"
                }
              >
                {textBlock}
              </span>
            ))}
          </div>
        </div>
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

export default CardBack;
