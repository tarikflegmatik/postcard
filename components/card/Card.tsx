import React from "react";
import {
  FlipCardButton,
  FlipCardProvider,
  FlipCardSide,
  FlipCardWrapper,
} from "@/components/providers/FlipCardProvider";
import CardFront from "@/components/card/CardFront";
import CardBack from "@/components/card/CardBack";
import { Invitation, Postcard } from "@/lib/types/payload-types";

type CardPreviewType = "postcard-template" | "invitation" | "postcard-created";
type CardSupportedLanguage = "english" | "croatian";

const CardComponent = ({
  type,
  lang,
  card,
  signature,
  withFlipProvider = true,
  withContentProvider = true,
}: {
  type: CardPreviewType;
  lang: CardSupportedLanguage;
  card: Postcard | Invitation;
  signature?: string;
  withFlipProvider?: boolean;
  withContentProvider?: boolean;
}) => {
  if (type === "postcard-created" && signature === undefined) {
    throw new Error(
      "Card is in postcard-created mode, but missing 'signature' value.",
    );
  }

  const content = (
    <div className={"flex w-full flex-col items-center"}>
      <div className={"flex w-full justify-center divide-x divide-white"}>
        <FlipCardButton
          side={"front"}
          className={"min-w-[150px] p-4 text-white hover:cursor-pointer"}
        >
          {lang === "croatian" ? "Prednja strana" : "Front side"}
        </FlipCardButton>
        <FlipCardButton
          side={"back"}
          className={"min-w-[150px] p-4 text-white hover:cursor-pointer"}
        >
          {lang === "croatian" ? "Zadnja strana" : "Back side"}
        </FlipCardButton>
      </div>
      <FlipCardWrapper className={"flex aspect-[80/45] w-full flex-col"}>
        <FlipCardSide side={"front"}>
          <CardFront type={type} lang={lang} card={card} />
        </FlipCardSide>
        <FlipCardSide side={"back"}>
          <CardBack
            type={type}
            lang={lang}
            card={card}
            signature={signature}
            withContentProvider={withContentProvider}
          />
        </FlipCardSide>
      </FlipCardWrapper>
    </div>
  );

  return withFlipProvider ? (
    <FlipCardProvider>{content}</FlipCardProvider>
  ) : (
    content
  );
};

export default CardComponent;
