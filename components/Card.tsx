import React from "react";
import {
  FlipCardButton,
  FlipCardProvider,
  FlipCardSide,
  FlipCardWrapper,
} from "@/components/providers/FlipCardProvider";
import CardFront from "@/components/CardFront";
import CardBack from "@/components/CardBack";
import { Invitation, Postcard } from "@/lib/types/payload-types";

const CardComponent = ({ card }: { card: Postcard | Invitation }) => {
  return (
    <FlipCardProvider>
      <div className={"flex w-full flex-col items-center"}>
        <div className={"flex w-full justify-center divide-x"}>
          <FlipCardButton
            side={"front"}
            className={"p-4 text-white hover:cursor-pointer"}
          >
            Prednja strana
          </FlipCardButton>
          <FlipCardButton
            side={"back"}
            className={"p-4 text-white hover:cursor-pointer"}
          >
            Zadnja strana
          </FlipCardButton>
        </div>
        <FlipCardWrapper className={"flex aspect-[80/45] w-full flex-col"}>
          <FlipCardSide side={"front"}>
            <CardFront card={card} />
          </FlipCardSide>
          <FlipCardSide side={"back"}>
            <CardBack card={card} />
          </FlipCardSide>
        </FlipCardWrapper>
      </div>
    </FlipCardProvider>
  );
};

export default CardComponent;
