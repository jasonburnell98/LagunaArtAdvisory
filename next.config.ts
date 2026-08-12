import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The gallery is the home page now; keep old bookmarks/shared links
      // working (?view= deep links are passed through automatically).
      { source: "/gallery", destination: "/", permanent: true },
    ];
  },
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
