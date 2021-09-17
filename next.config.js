/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {source: '/:path*.html', destination: '/:path*'},
  ],
};