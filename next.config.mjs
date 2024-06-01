/**
 * @type {import('next').NextConfig}
 */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public",
  disable: true,
});

export default withPWA(nextConfig);
