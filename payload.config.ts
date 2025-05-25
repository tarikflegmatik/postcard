// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Locations } from "./collections/Locations";
import { Stamps } from "./collections/Stamp";
import { Postcards } from "./collections/Postcards";
import { s3Storage } from "@payloadcms/storage-s3";
import { Invitations } from "./collections/Invitations";
import { SignedPostcards } from "@/collections/SignedPostcards";
import { Landmarks } from "@/collections/Landmarks";
import { LandmarkLocations } from "@/collections/LandmarkLocations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Locations,
    Stamps,
    Postcards,
    Invitations,
    SignedPostcards,
    Landmarks,
    LandmarkLocations,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "lib/types/payload-types.ts"),
    schema: [
      ({ jsonSchema }) => {
        if (!jsonSchema.definitions) return jsonSchema;
        jsonSchema.definitions.PostcardsByLocation = {
          type: "object",
          additionalProperties: {
            type: "object",
            properties: {
              location: {
                $ref: "#/definitions/locations",
              },
              postcards: {
                type: "array",
                items: {
                  $ref: "#/definitions/postcards",
                },
              },
            },
            additionalProperties: false,
            required: ["location", "postcards"],
          },
        };

        return jsonSchema;
      },
    ],
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: (args) => {
            return `${process.env.S3_HOSTNAME}/${args.filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});
