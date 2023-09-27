const withTM = require('next-transpile-modules')(['shared']);
require('dotenv').config({ path: '../../.env' });
const jsonImporter = require('node-sass-json-importer');
const backendPort = process.env.BACKENDPORT || 5002;
const backendHost = process.env.BACKENDHOST || 'http://localhost';

module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${backendHost}:${backendPort}/api/:path*`, // Proxy to Backend
        },
      ],
    };
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  sassOptions: {
    importer: jsonImporter(),
  },
});
