import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Repo images are served from /public; admin-uploaded images live in
    // Supabase Storage and are served from the project's *.supabase.co host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
