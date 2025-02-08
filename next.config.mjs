/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image configuration
  images: {
    domains: ['drive.google.com', 'docs.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },

  // Headers configuration
  async headers() {
    return [
      // Auth API routes
      {
        source: '/api/auth/:path*',
        headers: [
          // Security headers
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'Content-Type', value: 'application/json' },
          // CORS headers for auth endpoints
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXTAUTH_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      // General API routes
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        ],
      },
    ];
  },

  // Redirects for authentication
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: true,
      },
    ];
  },

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  
  // Handle Google Drive CORS issues
  async rewrites() {
    return {
      beforeFiles: [
        // Add any necessary rewrites for Google Drive
        {
          source: '/drive-proxy/:path*',
          destination: 'https://drive.google.com/:path*',
        },
      ],
    };
  },
};

// Environment specific configurations
if (process.env.NODE_ENV === 'production') {
  nextConfig.optimizeFonts = true;
  nextConfig.productionBrowserSourceMaps = false; // Disable source maps in production
}

export default nextConfig;

