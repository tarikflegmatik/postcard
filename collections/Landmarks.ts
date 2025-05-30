import type { CollectionConfig, CollectionSlug } from "payload";
import { revalidateTag } from "next/cache";

export const Landmarks: CollectionConfig = {
  slug: "landmarks",
  labels: {
    singular: "Landmark",
    plural: "Landmarks",
  },
  admin: {
    useAsTitle: "name",
    livePreview: {
      url: ({ data }) => `/landmarks/${data.slug}`,
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
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "landmarkLocations" as CollectionSlug,
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
      name: "postcards",
      type: "relationship",
      relationTo: "postcards" as CollectionSlug,
      hasMany: true,
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
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const currentSlug = doc.slug;
        const previousSlug = previousDoc?.slug;

        revalidateTag(`landmark-${currentSlug}`);
        revalidateTag("landmarks");

        // If the slug changed, also invalidate the previous tag
        if (previousSlug && previousSlug !== currentSlug) {
          revalidateTag(`landmark-${previousSlug}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidateTag(`landmark-${doc.slug}`);
      },
    ],
  },
};
