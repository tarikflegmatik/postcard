import {
  Invitation,
  Location,
  Postcard,
  PostcardsByLocation,
  SignedPostcard,
} from "@/lib/types/payload-types";
import { CollectionSlug, getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";

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

export const getCachedInvitation = cache((slug: Invitation["slug"]) => {
  return unstable_cache(async () => getInvitation(slug), [slug], {
    tags: ["invitation", `invitation-${slug}`],
  })();
});

export const getPostcardTemplate = async (
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

export const getCachedPostcardTemplate = cache((slug: Postcard["slug"]) => {
  return unstable_cache(async () => getPostcardTemplate(slug), [slug], {
    tags: [`postcard-${slug}`],
  })();
});

export const getPostcard = async (
  slug: SignedPostcard["slug"],
): Promise<SignedPostcard | null> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "signedPostcards" as CollectionSlug,
    where: {
      slug: { equals: slug },
    },
    depth: 3,
    limit: 1,
  });

  if (data.docs.length === 0) return null;

  const [postcard] = data.docs;
  return postcard as SignedPostcard;
};

export const getPostcardTemplates = async (): Promise<Postcard[]> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "postcards" as CollectionSlug,
    pagination: false,
  });

  return data.docs as Postcard[];
};

export const getCachedPostcardTemplates = cache(() => {
  return unstable_cache(async () => getPostcardTemplates(), [], {
    tags: [`postcards`],
  })();
});

export const getPostcardTemplatesByLocation =
  async (): Promise<PostcardsByLocation> => {
    const postcards = await getCachedPostcardTemplates();

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

export const getCachedLocations = cache(() => {
  return unstable_cache(async () => getLocations(), [], {
    tags: [`postcards`],
  })();
});

export const getInvitations = async (): Promise<Invitation[]> => {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "invitations" as CollectionSlug,
    pagination: false,
  });

  return data.docs as Invitation[];
};
