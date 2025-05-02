"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import type {
  Location,
  Postcard,
  PostcardsByLocation,
} from "@/lib/types/payload-types";

type SelectionContextType = {
  locations: Location[];
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  postcardsByLocation: PostcardsByLocation;
  filteredPostcards: Postcard[];
};

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const SelectionProvider: React.FC<{
  children: React.ReactNode;
  locations: Location[];
  postcardsByLocation: PostcardsByLocation;
}> = ({ children, locations, postcardsByLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const filteredPostcards = useMemo(() => {
    return selectedLocation
      ? (postcardsByLocation[selectedLocation.id]?.postcards ?? [])
      : [];
  }, [selectedLocation, postcardsByLocation]);

  return (
    <SelectionContext.Provider
      value={{
        locations,
        selectedLocation,
        setSelectedLocation,
        postcardsByLocation,
        filteredPostcards,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};
