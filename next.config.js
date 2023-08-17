/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    loader: "default",
    domains: ["admin.alliance38.ru"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
