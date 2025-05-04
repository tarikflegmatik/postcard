import {
  Invitation,
  Location,
  Postcard,
  PostcardsByLocation,
} from "@/lib/types/payload-types";
import { CollectionSlug, getPayload } from "payload";
import config from "@payload-config";

export const getInvitation = async (
  slug: Invitation["slug"],
): Promise<Invitation | null> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "invitations" as CollectionSlug,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  if (data.docs.length === 0) return null;

  const [invitation] = data.docs;
  return invitation as Invitation;
};

export const getPostcard = async (
  slug: Postcard["slug"],
): Promise<Postcard | null> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "postcards" as CollectionSlug,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  if (data.docs.length === 0) return null;

  const [postcard] = data.docs;
  return postcard as Postcard;
};

export const getPostcardsByLocation =
  async (): Promise<PostcardsByLocation> => {
    const payload = await getPayload({ config });
    const data = await payload.find({
      collection: "postcards" as CollectionSlug,
      pagination: false,
    });

    const postcards = data.docs as Postcard[];

    return postcards.reduce((grouped, postcard) => {
      const location = postcard.location as Location;
      if (location.id in grouped) {
        grouped[location.id].postcards.push(postcard);
        return grouped;
      }
      grouped[location.id] = {
        location: location,
        postcards: [postcard],
      };
      return grouped;
    }, {} as PostcardsByLocation);
  };

export const getLocations = async (): Promise<Location[]> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "locations" as CollectionSlug,
    pagination: false,
  });

  return data.docs as Location[];
};
