import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/dashboard", destination: "/dashboard" },
      { source: "/businesses", destination: "/businesses" },
      { source: "/categories", destination: "/categories" },
      { source: "/coupons", destination: "/coupons" },
      { source: "/notification", destination: "/notification" },
      { source: "/users", destination: "/users" },
      { source: "/staff", destination: "/staff" },
      { source: "/staff-accounts", destination: "/staff" },
      { source: "/roles", destination: "/roles" },
      { source: "/roles-permissions", destination: "/roles" },
    ];
  },
};

export default nextConfig;
