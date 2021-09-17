/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: async () => [
    {source: '/index.html', destination: '/'},
    {source: '/:path*.html', destination: '/:path*'},
  ],
};