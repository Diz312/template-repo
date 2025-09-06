import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Example: adjust logging during development
  // logging: { fetches: { fullUrl: true } },
  // Example: tune server actions limits or CSRF allowed origins
  // experimental: { serverActions: { bodySizeLimit: '2mb', allowedOrigins: [] } },
}

export default nextConfig
