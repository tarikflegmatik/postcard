"use client";

import { useState, useEffect } from "react";

const OrientationWarning = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      const breakPoint = 560;
      setIsPortrait(window.innerWidth < breakPoint);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
        <p className="bg-opacity-50 w-3/4 bg-white p-1 text-center text-xl font-semibold">
          Molimo rotirajte svoj uređaj za bolji pregled.
        </p>
      </div>
    );
  }
};

export default OrientationWarning;
