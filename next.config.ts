import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns:[{
            protocol: "https",
            hostname: "*"
        }]
    },
    experimental:{
        ppr: "incremental"
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
