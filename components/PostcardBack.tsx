import React from "react";
import Image from "next/image";
import { FlipCardButton } from "./providers/FlipCardProvider";
import { Media, Postcard, Stamp } from "@/lib/types/payload-types";

// Manually created Type, might cause an issue
type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
};

const PostcardBack = ({ postcard }: { postcard: Postcard }) => {
  const messageTextCollection = (
    postcard.back.messageText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const signatureTextCollection = (
    postcard.back.signatureText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const frameImage = postcard.back.frameImage as Media;
  const postageStampImage = (postcard.back.postageStamp as Stamp)
    .image as Media;

  return (
    <div
      className={
        "relative aspect-[80/45] h-full w-full border p-3 shadow-xl md:p-5"
      }
    >
      <div className={"absolute top-0 left-0 -z-10 h-full w-full"}>
        <Image
          className={"object-cover"}
          src={frameImage.url || ""}
          alt={frameImage.alt || ""}
          fill
        />
      </div>
      <div className={"flex h-full w-full divide-x bg-white px-4 py-5 md:py-7"}>
        <div
          className={`font-kalam flex h-full flex-1 flex-col justify-between pr-2 text-sm sm:text-base md:text-lg`}
        >
          {messageTextCollection.map((textBlock, i) => (
            <p key={i}>{textBlock}</p>
          ))}
        </div>
        <div
          className={"flex flex-1 flex-col items-center justify-between pl-2"}
        >
          <div className={"flex w-full justify-end"}>
            <div className={"relative aspect-square w-8/12"}>
              <Image
                className={"object-contain"}
                src={postageStampImage.url || ""}
                alt={postageStampImage.alt}
                fill
              />
            </div>
          </div>
          <div
            className={`font-kalam flex h-full w-full flex-col items-center justify-center gap-2 text-sm sm:text-base md:text-lg`}
          >
            {signatureTextCollection.map((textBlock, i) => (
              <span key={i} className={"ml-1 w-full text-center"}>
                {textBlock}
              </span>
            ))}
          </div>
        </div>
      </div>
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 h-[60px] w-[60px] rounded-full border border-black bg-black text-xs font-semibold break-words text-white hover:cursor-pointer lg:text-sm lg:font-bold"
        }
      >
        Flip
      </FlipCardButton>
    </div>
  );
};

export default PostcardBack;
