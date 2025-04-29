import React from "react";
import PostcardFront from "@/components/postcard/PostcardFront";
import PostcardBack from "@/components/postcard/PostcardBack";
import {
  FlipCardButton,
  FlipCardProvider,
  FlipCardSide,
  FlipCardWrapper,
} from "@/components/postcard/providers/FlipCardProvider";
import Navbar from "@/components/Navbar";

const Page = async ({
  params,
}: {
  params: Promise<{ postcardTemplateId: string }>;
}) => {
  const { postcardTemplateId } = await params;
  console.log(postcardTemplateId);
  return (
    <div
      className={
        "flex min-h-screen w-full flex-col items-center justify-center bg-gray-200"
      }
    >
      <Navbar />
      <div className={"grid w-full grid-cols-12 p-16"}>
        <div className={"col-span-6 col-start-1 row-span-1 row-start-1"}>
          <h3 className={"text-3xl"}>SEND LOVE INSTANTLY</h3>
        </div>
        <div className={"col-span-6 col-start-1 row-span-1 row-start-2"}>
          <h1 className={"text-6xl"}>Digital Postcards for your Loved Ones</h1>
        </div>
        <div className={"col-span-6 col-start-7 row-span-2 row-start-1 grid"}>
          <button className="self-end justify-self-end rounded-lg border bg-black px-4 py-2 text-white hover:cursor-pointer hover:bg-white hover:text-black">
            Share Postcard
          </button>
        </div>
      </div>
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
            "flex aspect-[80/45] w-full flex-col sm:max-w-[590px] md:max-w-screen-sm lg:max-w-screen-md"
          }
        >
          <FlipCardSide side={"front"}>
            <PostcardFront />
          </FlipCardSide>
          <FlipCardSide side={"back"}>
            <PostcardBack />
          </FlipCardSide>
        </FlipCardWrapper>
      </FlipCardProvider>
    </div>
  );
};

export default Page;
