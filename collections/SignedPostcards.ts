import type { CollectionConfig } from "payload";
import ObjectId from "bson-objectid";

export const SignedPostcards: CollectionConfig = {
  slug: "signedPostcards",
  labels: {
    singular: "Signed Postcard",
    plural: "Signed Postcards",
  },
  fields: [
    {
      name: "template",
      type: "relationship",
      relationTo: "postcards",
      required: true,
    },
    {
      name: "signature",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      defaultValue: () => ObjectId().toHexString(),
      admin: { readOnly: true },
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
  hooks: {},
};
