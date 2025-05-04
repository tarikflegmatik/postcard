"use client";

import React, { useActionState } from "react";
import { registerToInvitation } from "@/lib/actions";

const RegisterForm = ({ invitationId }: { invitationId: number }) => {
  const registerToInvitationWithId = registerToInvitation.bind(
    null,
    invitationId,
  );
  const [state, registerAction, isPending] = useActionState(
    registerToInvitationWithId,
    null,
  );
  return (
    <form
      action={registerAction}
      id={"sign-up-section"}
      className={"flex w-full flex-col gap-6 self-center xl:pl-10"}
    >
      <div className={"flex flex-col"}>
        <label htmlFor="name" className={"w-full text-xl font-bold text-white"}>
          Vaše ime i prezime
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={"Unesite ime i prezime"}
          className={
            "w-full border-b-2 border-white py-2 text-xl text-white focus:outline-none"
          }
        />
      </div>
      <button
        type={"submit"}
        disabled={isPending}
        className={
          "border-2 border-white bg-[#BEA568] px-12 py-4 text-lg text-white hover:cursor-pointer hover:bg-white hover:text-[#BEA568] disabled:cursor-not-allowed disabled:border-[#d9cba0] disabled:bg-[#f3eddb] disabled:text-[#a49a71] disabled:hover:bg-[#f3eddb] disabled:hover:text-[#a49a71]"
        }
      >
        {isPending ? "Slanje prijave..." : "Prijavi se"}
      </button>
      {state?.status === 201 && (
        <div className={"w-full bg-white p-5"}>
          <p>Zahvaljujemo na vašoj prijavi.</p>
        </div>
      )}
      {state?.status === 404 && (
        <div className={"w-full bg-white p-5"}>
          <p>Došlo je do pogreške pri prijavi. Molimo pokušajte kasnije.</p>
        </div>
      )}
      {state?.status === 500 && (
        <div className={"w-full bg-white p-5"}>
          <p>Molimo prvo unesite svoje ime i prezime.</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
