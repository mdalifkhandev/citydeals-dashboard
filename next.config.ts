import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/dashboard/businesses", destination: "/businesses" },
      { source: "/dashboard/categories", destination: "/categories" },
      { source: "/dashboard/coupons", destination: "/coupons" },
      { source: "/dashboard/notification", destination: "/notification" },
    ];
  },
};

export default nextConfig;
