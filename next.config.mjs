/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/actualites',
        permanent: true,
      },
      {
        source: '/articles/:slug',
        destination: '/actualites/:slug',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://fsac.univh2c.ma https://images.unsplash.com https://gfdlfsncbnxklprwmwfi.supabase.co; font-src 'self'; connect-src 'self' https://va.vercel-scripts.com https://gfdlfsncbnxklprwmwfi.supabase.co; frame-src https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ]
  },
}

export default nextConfig
