/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");
const federationConfig = {
  name: "host",
  filename: "static/chunks/remoteEntry.js",
  remotes: {},
  shared: {},
};

const nextConfig = {
  webpack5: true,
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  buildId: "host",
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(new NextFederationPlugin(federationConfig));
    }
    return config;
  },
};

module.exports = nextConfig;
