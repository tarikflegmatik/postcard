import type { CollectionConfig, CollectionSlug } from "payload";
import { baseCardFields } from "@/fields/baseCardFields";
import { revalidateTag } from "next/cache";

export const Postcards: CollectionConfig = {
  slug: "postcards",
  labels: {
    singular: "Postcard",
    plural: "Postcards",
  },
  admin: {
    useAsTitle: "name",
    livePreview: {
      url: ({ data }) => `/postcards/${data.slug}`,
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations" as CollectionSlug,
      required: true,
    },
    {
      name: "pageContent",
      type: "group",
      fields: [
        {
          name: "subtitle",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
      ],
    },
    ...baseCardFields,
    {
      name: "analytics",
      type: "group",
      admin: { readOnly: true },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "opens",
              type: "number",
              defaultValue: 0,
              admin: { width: "50%" },
            },
            {
              name: "shares",
              type: "number",
              defaultValue: 0,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const currentSlug = doc.slug;
        const previousSlug = previousDoc?.slug;

        revalidateTag(`postcard-${currentSlug}`);

        // If the slug changed, also invalidate the previous tag
        if (previousSlug && previousSlug !== currentSlug) {
          revalidateTag(`postcard-${previousSlug}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidateTag(`postcard-${doc.slug}`);
      },
    ],
  },
};
