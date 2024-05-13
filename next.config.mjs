/**
 * @type {import('next').NextConfig}
 */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
  },
};

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
});

export default withPWA(nextConfig);
