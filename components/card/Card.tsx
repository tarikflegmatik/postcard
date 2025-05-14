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

const CardComponent = ({
  type,
  card,
  signature,
}: {
  type: CardPreviewType;
  card: Postcard | Invitation;
  signature?: string;
}) => {
  if (type === "postcard-created" && signature === undefined) {
    throw new Error(
      "Card is in postcard-created mode, but missing 'signature' value.",
    );
  }

  return (
    <FlipCardProvider>
      <div className={"flex w-full flex-col items-center"}>
        <div className={"flex w-full justify-center divide-x divide-white"}>
          <FlipCardButton
            side={"front"}
            className={"min-w-[150px] p-4 text-white hover:cursor-pointer"}
          >
            Prednja strana
          </FlipCardButton>
          <FlipCardButton
            side={"back"}
            className={"min-w-[150px] p-4 text-white hover:cursor-pointer"}
          >
            Zadnja strana
          </FlipCardButton>
        </div>
        <FlipCardWrapper className={"flex aspect-[80/45] w-full flex-col"}>
          <FlipCardSide side={"front"}>
            <CardFront type={type} card={card} />
          </FlipCardSide>
          <FlipCardSide side={"back"}>
            <CardBack type={type} card={card} signature={signature} />
          </FlipCardSide>
        </FlipCardWrapper>
      </div>
    </FlipCardProvider>
  );
};

export default CardComponent;
