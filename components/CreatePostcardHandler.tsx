"use client";

import { createSignedPostcard } from "@/lib/actions";
import React, { useActionState, useEffect } from "react";
import { useCardContentContext } from "@/components/providers/CardContentProvider";
import PostcardShareOptions from "@/components/card/PostcardShareOptions";

const CreatePostcardHandler = ({
  postcardTemplateId,
}: {
  postcardTemplateId: number;
}) => {
  const { senderName, setShowSenderNameWarning } = useCardContentContext();
  const createSignedPostcardWithData = createSignedPostcard.bind(
    null,
    senderName,
    postcardTemplateId,
  );
  const [state, createAction, isPending] = useActionState(
    createSignedPostcardWithData,
    null,
  );

  useEffect(() => {
    if (state?.error === "Missing sender name.") {
      setShowSenderNameWarning(true);
    }
  }, [state?.error, setShowSenderNameWarning]);

  if (state?.data) {
    return <PostcardShareOptions slug={state?.data.signedPostcardSlug} />;
  }

  if (state?.error && state?.error !== "Missing sender name.") {
    return (
      <span className={"text-center text-xs leading-1 text-red-500"}>
        An error occurred while creating the postcard.
      </span>
    );
  }

  return (
    <form action={createAction} className={"flex w-full justify-center"}>
      <button
        type={"submit"}
        disabled={isPending}
        className={
          "w-full max-w-[150px] border-2 border-[#BEA568] bg-[#BEA568] py-1 text-sm text-white hover:cursor-pointer hover:bg-white hover:text-[#BEA568] disabled:cursor-not-allowed disabled:border-[#d9cba0] disabled:bg-[#f3eddb] disabled:text-[#a49a71] disabled:hover:bg-[#f3eddb] disabled:hover:text-[#a49a71] sm:text-base md:max-w-[220px] md:py-2 md:text-xl lg:max-w-[290px] lg:py-4"
        }
      >
        {isPending ? "Creating postcard..." : "Send postcard"}
      </button>
    </form>
  );
};

export default CreatePostcardHandler;
