"use client";

import { useCardContentContext } from "@/components/providers/CardContentProvider";

const SignatureInput = () => {
  const {
    senderName,
    setSenderName,
    showSenderNameWarning,
    setShowSenderNameWarning,
  } = useCardContentContext();
  return (
    <div
      className={`relative w-full after:absolute after:inset-0 after:translate-y-full after:text-center after:text-xs after:text-red-500 after:content-['Unesite_ime_pošiljatelja'] ${showSenderNameWarning ? "after:block" : "after:hidden"}`}
    >
      <input
        value={senderName}
        onChange={(e) => {
          setSenderName(e.target.value);
          setShowSenderNameWarning(false);
        }}
        placeholder={"Your signature..."}
        className={`w-full border-b border-gray-400 text-center [font-family:var(--font-caveat)] text-base outline-none focus:border-black sm:text-xl md:text-2xl lg:text-3xl ${showSenderNameWarning ? "border-red-500 focus:border-red-600" : ""}`}
        tabIndex={0}
      />
    </div>
  );
};

export default SignatureInput;
