import React from "react";
import Image from "next/image";
import { FlipCardButton } from "../providers/FlipCardProvider";
import { Invitation, Media, Postcard, Stamp } from "@/lib/types/payload-types";
import ScrollToSignup from "./ScrollToSignup";
import SignatureInput from "./SignatureInput";
import { CardContentProvider } from "@/components/providers/CardContentProvider";
import Link from "next/link";
import CreatePostcardForm from "@/components/CreatePostcardForm";

// Manually created Type, might cause an issue
type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
};

type CardPreviewType = "postcard-template" | "invitation" | "postcard-created";

const CardBackBorder = ({
  type,
  card,
}: {
  type: CardPreviewType;
  card: Postcard | Invitation;
}) => {
  if (type === "invitation") {
    const borderPattern = card.back.borderPattern as Media;
    if (!borderPattern) {
      return <div className="absolute inset-0 z-10 bg-white" />;
    }
    return (
      <div
        className="absolute inset-0 z-10 bg-[length:12px_12px] bg-repeat-space md:bg-[length:20px_20px]"
        style={{
          backgroundImage: `url("${borderPattern.url}")`,
          backgroundPosition: "top left",
          backgroundRepeat: "space",
        }}
      />
    );
  }
  if (type === "postcard-template" || type === "postcard-created") {
    if (!("borderImage" in card)) {
      return <div className="absolute inset-0 z-10 bg-white" />;
    }
    const borderImage = card.borderImage as Media;
    return (
      <div className="absolute inset-0 z-10">
        <Image
          src={borderImage?.url || ""}
          alt={borderImage?.alt || ""}
          className={"object-cover"}
          fill
        />
      </div>
    );
  }
};

const CardBackLeftBottom = ({
  type,
  signature,
}: {
  type: CardPreviewType;
  signature?: string;
}) => {
  if (type === "invitation") return <></>;
  if (type === "postcard-template") return <SignatureInput />;
  if (type === "postcard-created") {
    if (!signature)
      throw new Error(
        "Card is in postcard-created mode, but missing 'signature' value.",
      );
    return (
      <span
        className={`w-full text-left [font-family:var(--font-caveat)] text-base sm:text-xl md:text-2xl lg:text-3xl`}
      >
        {signature}
      </span>
    );
  }
};

const CardBackRightBottom = ({
  type,
  postcardTemplateId,
}: {
  type: CardPreviewType;
  postcardTemplateId: number;
}) => {
  if (type === "invitation") {
    return (
      <div className={"block xl:hidden"}>
        <ScrollToSignup />
      </div>
    );
  }
  if (type === "postcard-created") {
    return (
      <Link
        href={"/postcards"}
        className={
          "border-2 border-white bg-[#BEA568] px-12 py-2 text-lg text-white hover:cursor-pointer"
        }
      >
        Pošalji svoju razglednicu
      </Link>
    );
  }
  if (type === "postcard-template")
    return <CreatePostcardForm postcardTemplateId={postcardTemplateId} />;
};

const CardBack = ({
  type,
  card,
  signature,
}: {
  type: CardPreviewType;
  card: Postcard | Invitation;
  signature?: string;
}) => {
  const messageTextCollection = (
    card.back.messageText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const signatureTextCollection = (
    card.back.signatureText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const postageStampImage = (card.back.postageStamp as Stamp).image as Media;

  return (
    <CardContentProvider>
      <div
        className={
          "relative aspect-[80/45] h-full w-full border bg-white p-3 shadow-xl md:p-5"
        }
      >
        <CardBackBorder type={type} card={card} />
        <div
          className={
            "relative z-20 flex h-full w-full divide-x bg-white px-4 py-5 md:py-7"
          }
        >
          <div
            className={`font-kalam flex h-full flex-3/5 flex-col justify-center gap-0.5 text-base sm:gap-1 sm:text-xl md:gap-3 md:text-2xl lg:flex-1 lg:gap-5 lg:text-3xl`}
          >
            {messageTextCollection.map((textBlock, i) => {
              const isLast = i === messageTextCollection.length - 1;
              if (!isLast)
                return (
                  <p
                    key={i}
                    className={"pr-2 [font-family:var(--font-caveat)]"}
                  >
                    {textBlock}
                  </p>
                );

              return (
                <div key={i} className={"flex w-full flex-col items-start"}>
                  <p
                    key={i}
                    className={"pr-2 [font-family:var(--font-caveat)]"}
                  >
                    {textBlock}
                  </p>
                  <CardBackLeftBottom type={type} signature={signature} />
                </div>
              );
            })}
          </div>
          <div
            className={
              "flex flex-2/5 flex-col items-center justify-between lg:flex-1"
            }
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
              className={`font-kalam flex h-full w-full flex-col items-center justify-center gap-2 text-base sm:text-xl md:text-2xl lg:text-3xl`}
            >
              {signatureTextCollection.map((textBlock, i) => (
                <span
                  key={i}
                  className={
                    "ml-1 w-full max-w-[150px] border-b border-b-gray-400 text-center [font-family:var(--font-caveat)] md:max-w-[220px] lg:max-w-[290px]"
                  }
                >
                  {textBlock}
                </span>
              ))}
              <CardBackRightBottom type={type} postcardTemplateId={card.id} />
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
    </CardContentProvider>
  );
};

export default CardBack;
