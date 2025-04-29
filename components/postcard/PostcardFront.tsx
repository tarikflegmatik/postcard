import React from "react";
import { FlipCardButton } from "./providers/FlipCardProvider";

const PostcardFront = () => {
  return (
    <div className={"relative h-full w-full border p-5 shadow-xl"}>
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 h-[60px] w-[60px] rounded-full border border-black bg-black text-xs font-semibold break-words text-white hover:cursor-pointer lg:text-sm lg:font-bold"
        }
      >
        Flip
      </FlipCardButton>
      <div className={"h-full w-full bg-black"}></div>
    </div>
  );
};

export default PostcardFront;
