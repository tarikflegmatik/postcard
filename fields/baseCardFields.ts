import type { Field } from "payload";

export const baseCardFields: Field[] = [
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
      {
        name: "frameImage",
        type: "upload",
        relationTo: "media",
      },
      {
        name: "borderPattern",
        type: "upload",
        relationTo: "media",
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
        name: "borderPattern",
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
        relationTo: "stamps",
        required: true,
      },
      {
        name: "signatureText",
        type: "richText",
        required: true,
      },
    ],
  },
];
