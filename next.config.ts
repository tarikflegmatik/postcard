import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(process.env.S3_HOSTNAME! + "/**")],
  },
};

export default withPayload(nextConfig);
