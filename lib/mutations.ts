import { getPayload } from "payload";
import config from "@payload-config";

export const incrementViewAnalytic = async (postcardId: number) => {
  const payload = await getPayload({ config });

  const postcard = await payload.findByID({
    collection: "postcards",
    id: postcardId,
  });

  const current =
    typeof postcard.analytics?.opens === "number"
      ? postcard.analytics.opens
      : 0;
  console.log(current);

  await payload.update({
    collection: "postcards",
    id: postcardId,
    data: {
      analytics: {
        opens: current + 1,
      },
    },
  });
};

export async function incrementShareAnalytic(postcardId: number) {
  const payload = await getPayload({ config });

  const postcard = await payload.findByID({
    collection: "postcards",
    id: postcardId,
  });

  const current =
    typeof postcard.analytics?.shares === "number"
      ? postcard.analytics.shares
      : 0;

  await payload.update({
    collection: "postcards",
    id: postcardId,
    data: {
      analytics: {
        shares: current + 1,
      },
    },
  });
}
