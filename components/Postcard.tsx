import React from "react";
import {
  FlipCardButton,
  FlipCardProvider,
  FlipCardSide,
  FlipCardWrapper,
} from "@/components/providers/FlipCardProvider";
import PostcardFront from "@/components/PostcardFront";
import PostcardBack from "@/components/PostcardBack";
import { Postcard } from "@/lib/types/payload-types";

const PostcardComponent = ({ postcard }: { postcard: Postcard }) => {
  return (
    <FlipCardProvider>
      <div className={"flex w-full justify-center divide-x"}>
        <FlipCardButton side={"front"} className={"p-4 hover:cursor-pointer"}>
          Front Side
        </FlipCardButton>
        <FlipCardButton side={"back"} className={"p-4 hover:cursor-pointer"}>
          Back Side
        </FlipCardButton>
      </div>
      <FlipCardWrapper
        className={
          "mb-16 flex aspect-[80/45] w-full flex-col px-6 sm:max-w-[590px] sm:px-0 md:max-w-screen-sm lg:max-w-screen-md"
        }
      >
        <FlipCardSide side={"front"}>
          <PostcardFront postcard={postcard} />
        </FlipCardSide>
        <FlipCardSide side={"back"}>
          <PostcardBack postcard={postcard} />
        </FlipCardSide>
      </FlipCardWrapper>
    </FlipCardProvider>
  );
};

export default PostcardComponent;
