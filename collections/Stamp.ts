import type { CollectionConfig } from "payload";

export const Stamps: CollectionConfig = {
  slug: "stamps",
  labels: {
    singular: "Stamp",
    plural: "Stamps",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
