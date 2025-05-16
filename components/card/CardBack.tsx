import React from "react";
import Image from "next/image";
import { FlipCardButton } from "../providers/FlipCardProvider";
import { Invitation, Media, Postcard, Stamp } from "@/lib/types/payload-types";
import ScrollToSignup from "./ScrollToSignup";
import SignatureInput from "./SignatureInput";
import { CardContentProvider } from "@/components/providers/CardContentProvider";
import Link from "next/link";
import CreatePostcardHandler from "@/components/CreatePostcardHandler";

// Manually created Type, might cause an issue
type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
};

type CardPreviewType = "postcard-template" | "invitation" | "postcard-created";
type CardSupportedLanguage = "english" | "croatian";

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
    const borderPattern = card.back.borderPattern as Media;
    if (borderPattern) {
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
    if ("borderImage" in card) {
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
    return <div className="absolute inset-0 z-10 bg-white" />;
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
  lang,
  postcardTemplateId,
}: {
  type: CardPreviewType;
  lang: CardSupportedLanguage;
  postcardTemplateId: number;
}) => {
  if (type === "invitation") {
    return (
      <div className={"flex w-full justify-center xl:hidden"}>
        <ScrollToSignup />
      </div>
    );
  }
  if (type === "postcard-created") {
    return (
      <div className={"hidden w-full justify-center md:flex xl:hidden"}>
        <Link
          href={"/"}
          className={
            "w-full max-w-[150px] border-2 border-white bg-[#BEA568] py-1 text-center text-sm text-white hover:cursor-pointer sm:text-base md:max-w-[220px] md:py-2 md:text-xl lg:max-w-[290px] lg:py-4"
          }
        >
          {lang === "croatian"
            ? "Pošalji svoju razglednicu"
            : "Send your postcard"}
        </Link>
      </div>
    );
  }
  if (type === "postcard-template")
    return (
      <div className={"hidden w-full md:block xl:hidden"}>
        <CreatePostcardHandler postcardTemplateId={postcardTemplateId} />
      </div>
    );
};

const CardBack = ({
  type,
  lang,
  card,
  signature,
  withContentProvider = true,
}: {
  type: CardPreviewType;
  lang: CardSupportedLanguage;
  card: Postcard | Invitation;
  signature?: string;
  withContentProvider?: boolean;
}) => {
  const messageTextCollection = (
    card.back.messageText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const signatureTextCollection = (
    card.back.signatureText.root.children as LexicalNode[]
  ).map((textBlock) => textBlock.children?.[0]?.text);

  const postageStampImage = (card.back.postageStamp as Stamp).image as Media;

  const content = (
    <div
      className={
        "relative aspect-[80/45] h-full w-full border bg-white p-2 shadow-xl sm:p-3 md:p-5"
      }
    >
      <CardBackBorder type={type} card={card} />
      <div
        className={
          "relative z-20 flex h-full w-full divide-x bg-white px-2 py-3 md:px-4 md:py-5 lg:py-7"
        }
      >
        <div
          className={`font-kalam flex h-full flex-3/5 flex-col justify-center gap-0.5 text-xs sm:gap-1 sm:text-xl md:gap-3 md:text-2xl lg:flex-1 lg:gap-5 lg:text-3xl`}
        >
          {messageTextCollection.map((textBlock, i) => {
            const isLast = i === messageTextCollection.length - 1;
            if (!isLast)
              return (
                <p key={i} className={"pr-2 [font-family:var(--font-caveat)]"}>
                  {textBlock}
                </p>
              );

            return (
              <div key={i} className={"flex w-full flex-col items-start"}>
                <p key={i} className={"pr-2 [font-family:var(--font-caveat)]"}>
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
            className={`font-kalam flex h-full w-full flex-col items-center justify-center gap-2 text-xs sm:text-xl md:text-2xl lg:text-3xl`}
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
            <CardBackRightBottom
              type={type}
              lang={lang}
              postcardTemplateId={card.id}
            />
          </div>
        </div>
      </div>
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 z-30 h-[45px] w-[45px] rounded-full border border-white bg-[#BEA568] text-xs font-semibold break-words text-white hover:cursor-pointer sm:h-[60px] sm:w-[60px] lg:text-sm lg:font-bold"
        }
      >
        {lang === "croatian" ? "Okreni" : "Flip"}
      </FlipCardButton>
    </div>
  );
  return withContentProvider ? (
    <CardContentProvider>{content}</CardContentProvider>
  ) : (
    content
  );
};

export default CardBack;
