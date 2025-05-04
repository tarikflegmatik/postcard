import type { CollectionConfig } from "payload";
import { baseCardFields } from "@/fields/baseCardFields";

export const Invitations: CollectionConfig = {
  slug: "invitations",
  labels: {
    singular: "Invitation",
    plural: "Invitations",
  },
  admin: {
    useAsTitle: "name",
    livePreview: {
      url: ({ data }) => `/invitations/${data.slug}`,
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
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    ...baseCardFields,
    {
      name: "registrations",
      label: "Registered Names",
      type: "array",
      admin: { readOnly: true },
      fields: [
        {
          name: "fullName",
          type: "text",
          required: true,
          admin: { readOnly: true },
        },
        {
          name: "registeredAt",
          type: "date",
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
};
