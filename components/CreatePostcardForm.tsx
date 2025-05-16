"use client";

import { createSignedPostcard } from "@/lib/actions";
import React, { useActionState, useEffect } from "react";
import { useCardContentContext } from "@/components/providers/CardContentProvider";
import PostcardShareOptions from "@/components/card/PostcardShareOptions";
import { useFlipCardContext } from "@/components/providers/FlipCardProvider";

const CreatePostcardForm = ({
  postcardTemplateId,
}: {
  postcardTemplateId: number;
}) => {
  const {
    senderName,
    setSenderName,
    setShowSenderNameWarning,
    showSenderNameWarning,
  } = useCardContentContext();
  const { flipCard } = useFlipCardContext();
  const createSignedPostcardWithData = createSignedPostcard.bind(
    null,
    senderName,
    postcardTemplateId,
  );
  const [state, createAction, isPending] = useActionState(
    createSignedPostcardWithData,
    null,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    flipCard("back");
    setShowSenderNameWarning(false);
    setSenderName(e.target.value);
  };

  useEffect(() => {
    if (state?.error === "Missing sender name.") {
      setShowSenderNameWarning(true);
    }
  }, [state?.error, setShowSenderNameWarning]);

  if (state?.data) {
    return (
      <div className={"flex w-full flex-col gap-6 pl-10"}>
        <h4 className={"w-full text-xl font-bold text-white"}>
          Share your Postcard
        </h4>
        <PostcardShareOptions slug={state?.data.signedPostcardSlug} />
      </div>
    );
  }

  if (state?.error && state?.error !== "Missing sender name.") {
    return (
      <div className={"flex w-full flex-col gap-6 pl-10"}>
        <span className={"text-center text-xs leading-1 text-red-500"}>
          An error occurred while creating the postcard.
        </span>
      </div>
    );
  }

  return (
    <form
      action={createAction}
      className={"flex w-full flex-col gap-6 self-center xl:pl-10"}
    >
      <div className={"flex flex-col"}>
        <label htmlFor="name" className={"w-full text-xl font-bold text-white"}>
          Your signature
        </label>
        <div
          className={`relative w-full after:absolute after:inset-0 after:translate-y-full after:text-center after:text-xs after:text-red-500 after:content-['Unesite_ime_pošiljatelja'] ${showSenderNameWarning ? "after:block" : "after:hidden"}`}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder={"Enter your signature"}
            value={senderName}
            onChange={handleInputChange}
            className={`w-full border-b-2 py-2 text-xl text-white focus:outline-none ${showSenderNameWarning ? "border-red-500 focus:border-red-600" : "border-white"}`}
          />
        </div>
      </div>
      <button
        type={"submit"}
        disabled={isPending}
        className={
          "border-2 border-[#BEA568] bg-[#BEA568] px-12 py-4 text-lg text-white hover:cursor-pointer hover:bg-white hover:text-[#BEA568] disabled:cursor-not-allowed disabled:border-[#d9cba0] disabled:bg-[#f3eddb] disabled:text-[#a49a71] disabled:hover:bg-[#f3eddb] disabled:hover:text-[#a49a71]"
        }
      >
        {isPending ? "Creating postcard..." : "Send postcard"}
      </button>
    </form>
  );
};

export default CreatePostcardForm;
