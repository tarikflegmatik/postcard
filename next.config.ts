import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(process.env.S3_HOSTNAME! + "/**")],
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default withPayload(nextConfig);
