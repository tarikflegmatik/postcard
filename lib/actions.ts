"use server";
import { incrementViewAnalytic } from "@/lib/mutations";

export const updateViewAnalyticClient = async (postcardId: number) => {
  await incrementViewAnalytic(postcardId);
};
