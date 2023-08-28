const withTM = require('next-transpile-modules')(['shared']);
require('dotenv').config({ path: '../../.env' });

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
});
