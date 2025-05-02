import type { CollectionConfig } from "payload";

// 'name': A human-readable label for editors and users
// 'slug': A URL-friendly, unique identifier that exists in case it is ever required in frontend filter purposes

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: "Location",
    plural: "Locations",
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
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "coords",
      type: "group",
      fields: [
        {
          name: "latitude",
          type: "number",
          required: true,
        },
        {
          name: "longitude",
          type: "number",
          required: true,
        },
      ],
    },
  ],
};
