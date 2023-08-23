const withTM = require('next-transpile-modules')(['shared']);

module.exports = withTM({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/',
        has: [
          {
            type: 'header',
            key: 'host',
            value: 'localhost:3000',
          },
        ],
        permanent: false,
        destination: 'localhost:5002/',
      },
    ];
  },
});
