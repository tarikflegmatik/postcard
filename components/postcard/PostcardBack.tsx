import React from "react";
import Image from "next/image";
import PostageStampImage from "@/public/markica.webp";
import { FlipCardButton } from "./providers/FlipCardProvider";

const PostcardBack = () => {
  return (
    <div
      className={"relative aspect-[80/45] h-full w-full border p-5 shadow-xl"}
    >
      <FlipCardButton
        className={
          "absolute -top-3 -right-3 h-[60px] w-[60px] rounded-full border border-black bg-black text-xs font-semibold break-words text-white hover:cursor-pointer lg:text-sm lg:font-bold"
        }
      >
        Flip
      </FlipCardButton>
      <div
        className={"flex h-full w-full divide-x bg-white py-5 md:px-4 md:py-7"}
      >
        <div
          className={`font-kalam flex h-full flex-1 flex-col justify-between text-lg`}
        >
          <p>Greetings from Split,</p>
          <p>
            Where the genius work of art from Ivan Meštrović testify that
            artistic excellence is achieved only with great effort!
          </p>
          <p>
            A perfect blend of natural beauty and artistic vision that is worth
            experiencing!
          </p>
          <p>Yours digitally,</p>
        </div>
        <div className={"flex flex-1 flex-col items-center justify-between"}>
          <div className={"-mt-7 flex w-full justify-end"}>
            <Image
              className={"w-7/12 lg:w-8/12"}
              src={PostageStampImage}
              alt={"Postage stamp"}
            />
          </div>
          <div
            className={`font-kalam flex h-full w-full flex-col items-center justify-center gap-2 text-lg`}
          >
            <span className={"ml-1 w-full text-center"}>Future visitors</span>
            <span className={"ml-1 w-full text-center"}>
              @allaroundtheglobe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcardBack;
