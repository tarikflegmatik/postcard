"use client";

import React, { useEffect } from "react";
import { updateViewAnalyticAction } from "@/lib/actions";

const IncrementViewAnalytic = ({ postcardId }: { postcardId: number }) => {
  useEffect(() => {
    updateViewAnalyticAction(postcardId);
  }, [postcardId]);
  return <></>;
};

export default IncrementViewAnalytic;
