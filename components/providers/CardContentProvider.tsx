"use client";

import React, { useContext, createContext, useState } from "react";

type CardContentContextProviderType = {
  senderName: string;

  setSenderName: (senderName: string) => void;
  showSenderNameWarning: boolean;
  setShowSenderNameWarning: (showSenderNameWarning: boolean) => void;
};

const CardContentContext = createContext<
  CardContentContextProviderType | undefined
>(undefined);

export const CardContentProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [senderName, setSenderName] = useState("");
  const [showSenderNameWarning, setShowSenderNameWarning] = useState(false);

  return (
    <CardContentContext.Provider
      value={{
        senderName,
        setSenderName,
        showSenderNameWarning,
        setShowSenderNameWarning,
      }}
    >
      {children}
    </CardContentContext.Provider>
  );
};

export const useCardContentContext = () => {
  const context = useContext(CardContentContext);
  if (!context) {
    throw new Error(
      "useCardContentContext must be used within CardContentProvider",
    );
  }
  return context;
};
