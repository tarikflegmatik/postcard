"use client";

import { createSignedPostcard } from "@/lib/actions";
import React, { useActionState } from "react";
import { useCardContentContext } from "@/components/providers/CardContentProvider";
import PostcardShareOptions from "@/components/card/PostcardShareOptions";

const CreatePostcardForm = ({
  postcardTemplateId,
}: {
  postcardTemplateId: number;
}) => {
  const { senderName } = useCardContentContext();
  const createSignedPostcardWithData = createSignedPostcard.bind(
    null,
    senderName,
    postcardTemplateId,
  );
  const [state, createAction, isPending] = useActionState(
    createSignedPostcardWithData,
    null,
  );

  if (state?.data) {
    return <PostcardShareOptions slug={state?.data.signedPostcardSlug} />;
  }

  if (state?.error) {
    return (
      <span className={"text-center text-sm text-red-500"}>
        Dogodila se greška pri kreiranju razglednice. <br /> Pokušajte kasnije.
      </span>
    );
  }

  return (
    <form action={createAction}>
      <button
        type={"submit"}
        disabled={isPending}
        className={
          "border-2 border-[#BEA568] bg-[#BEA568] px-12 py-4 text-lg text-white hover:cursor-pointer hover:bg-white hover:text-[#BEA568] disabled:cursor-not-allowed disabled:border-[#d9cba0] disabled:bg-[#f3eddb] disabled:text-[#a49a71] disabled:hover:bg-[#f3eddb] disabled:hover:text-[#a49a71]"
        }
      >
        {isPending ? "Izrada razglednice..." : "Pošalji razglednicu"}
      </button>
    </form>
  );
};

export default CreatePostcardForm;
