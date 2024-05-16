/**
 * @type {import('next').NextConfig}
 */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    domains: ["i.pravatar.cc", "gravatar.com"],
  },
};

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
