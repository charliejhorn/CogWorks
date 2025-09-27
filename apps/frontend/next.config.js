module.exports = {
  reactStrictMode: true,
  env: {
    // prefer NEXT_PUBLIC_API_BASE for all frontend fetches
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000',
    // legacy compatibility if used elsewhere
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
  },
  webpack: (config) => {
    // customize webpack configuration here
    return config;
  },
};