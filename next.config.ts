import type { NextConfig } from 'next';

const apiBaseUrl = process.env.NODE_ENV === 'development'
  ? 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app'
  : 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app';

const serverApiBaseUrl = process.env.NODE_ENV === 'development'
  ? 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app'
  : 'http://invu-api-server:8080';

const nextConfig: NextConfig = {
  env: {
    CLIENT_API_BASE_URL: apiBaseUrl,
    SERVER_API_BASE_URL: serverApiBaseUrl
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-68537adb098842dca26d13cffdcd289e.r2.dev'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
