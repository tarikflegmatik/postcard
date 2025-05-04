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
