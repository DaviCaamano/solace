const withTM = require('next-transpile-modules')(['shared']);
require('dotenv').config({ path: '../../.env' });

console.log('BACKENDPORT', process.env);

const backendPort = process.env.BACKENDPORT || 5002;
const backendHost = process.env.BACKENDHOST || 'http://localhost';
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendHost}:${backendPort}/:path*`, // Proxy to Backend
      },
    ];
  },
});
