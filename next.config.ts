import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pxckfwaqlatmvozcjnry.supabase.co",
        pathname: "/storage/v1/object/public/assets-public/**",
      },
    ],
  },
};

export default nextConfig;
