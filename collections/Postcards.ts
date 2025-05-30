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
      url: ({ data }) => `/postcards/templates/${data.slug}`,
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
        {
          name: "backgroundImage",
          type: "upload",
          required: false,
          relationTo: "media",
        },
      ],
    },
    {
      name: "metadata",
      type: "group",
      label: "Page Metadata",
      admin: {
        description: "Used for SEO and social sharing.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Meta Title",
          required: false,
          admin: {
            placeholder: "Used as <title> tag and Open Graph title",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta Description",
          required: false,
          admin: {
            placeholder: "Used for SEO and social previews",
          },
          validate: (value) => {
            if (value && value.length < 160) return true;
            return "Meta description must be 160 characters or fewer.";
          },
        },
        {
          name: "image",
          type: "upload",
          label: "Social Share Image",
          relationTo: "media",
          required: false,
        },
        {
          name: "noIndex",
          type: "checkbox",
          label: "Prevent Search Indexing",
          defaultValue: false,
          admin: {
            description: "Adds <meta name='robots' content='noindex'>",
          },
        },
      ],
    },
    ...baseCardFields,
    {
      name: "hashtag",
      type: "text",
      label: "Hashtag",
      maxLength: 30,
      admin: {
        description:
          "Shown in the bottom right corner of the postcard, like #YoursDigitally",
      },
    },
    {
      name: "borderImage",
      type: "upload",
      required: false,
      relationTo: "media",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const currentSlug = doc.slug;
        const previousSlug = previousDoc?.slug;

        revalidateTag(`postcard-${currentSlug}`);
        revalidateTag("postcards");

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
