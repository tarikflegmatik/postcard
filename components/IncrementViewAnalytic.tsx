"use client";

import React, { useEffect } from "react";
import { updateViewAnalyticClient } from "@/lib/actions";

const IncrementViewAnalytic = ({ postcardId }: { postcardId: number }) => {
  useEffect(() => {
    updateViewAnalyticClient(postcardId);
  }, [postcardId]);
  return <></>;
};

export default IncrementViewAnalytic;
