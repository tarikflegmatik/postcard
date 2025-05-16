"use client";

import { useState, useEffect, useRef } from "react";

const OrientationWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const breakPoint = 560;

    const checkOrientation = () => {
      const isPortrait = window.innerWidth < breakPoint;

      if (isPortrait) {
        setShowWarning(true);
        // Reset any existing timer
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Hide after 2 seconds
        timeoutRef.current = setTimeout(() => {
          setShowWarning(false);
        }, 3500);
      } else {
        // Hide immediately if rotated
        setShowWarning(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <p className="bg-opacity-50 w-3/4 bg-white p-1 text-center text-xl font-semibold">
        Molimo rotirajte svoj uređaj za bolji pregled.
      </p>
    </div>
  );
};

export default OrientationWarning;
