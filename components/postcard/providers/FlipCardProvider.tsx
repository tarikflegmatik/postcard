"use client";

import React, { useContext, createContext, useState } from "react";

type FlipCardContextProviderType = {
  isCardFlipped: boolean;
  flipCard: (side?: "front" | "back") => void;
};

const FlipCardContext = createContext<FlipCardContextProviderType | undefined>(
  undefined,
);

export const FlipCardProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const flipCard = (side?: "front" | "back") => {
    if (side === "front") {
      setIsCardFlipped(false);
      return;
    }
    if (side === "back") {
      setIsCardFlipped(true);
      return;
    }
    setIsCardFlipped((prev) => !prev);
  };

  return (
    <FlipCardContext.Provider value={{ isCardFlipped, flipCard }}>
      {children}
    </FlipCardContext.Provider>
  );
};

export const useFlipCardContext = () => {
  const context = useContext(FlipCardContext);
  if (!context) {
    throw new Error("useFlipCardContext must be used within FlipCardProvider");
  }
  return context;
};

export const FlipCardWrapper = ({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const { isCardFlipped } = useFlipCardContext();
  return (
    <div className={`[perspective:1000px] ${className}`}>
      <div
        className={`${isCardFlipped ? "[transform:rotateY(-180deg)]" : ""} relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]`}
      >
        {children}
      </div>
    </div>
  );
};

export const FlipCardSide = ({
  children,
  side,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  side: "front" | "back";
  className?: string;
}>) => {
  const isBackSide = side === "back";
  return (
    <div
      className={`absolute h-full w-full [backface-visibility:hidden] ${isBackSide ? "[transform:rotateY(180deg)]" : ""} ${className}}`}
    >
      {children}
    </div>
  );
};

export const FlipCardButton = ({
  children,
  side,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  side?: "front" | "back";
  className?: string;
}>) => {
  const { flipCard } = useFlipCardContext();

  return (
    <button onClick={() => flipCard(side)} className={className}>
      {children}
    </button>
  );
};
