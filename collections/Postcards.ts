import type { CollectionConfig, CollectionSlug } from "payload";

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
      name: "pageHeader",
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
    {
      name: "front",
      type: "group",
      fields: [
        {
          name: "mainImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "back",
      type: "group",
      fields: [
        {
          name: "frameImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "messageText",
          type: "richText",
          required: true,
        },
        {
          name: "postageStamp",
          type: "relationship",
          relationTo: "stamps" as CollectionSlug,
          required: true,
        },
        {
          name: "signatureText",
          type: "richText",
          required: true,
        },
      ],
    },
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
};
