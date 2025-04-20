import type { NextConfig } from 'next';

const apiBaseUrl = (() => {
  switch(process.env.NODE_ENV) {
  case 'development':
    return 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app';
  case 'test':
    return 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app';
  default: // production
    return 'https://port-0-invu-server-release-m78pe23vb8056d68.sel4.cloudtype.app'; // real 환경의 API URL
  }
})();

const serverApiBaseUrl = (() => {
  switch(process.env.NODE_ENV) {
  case 'development':
    return 'https://port-0-invu-api-server-m78pe23vb8056d68.sel4.cloudtype.app';
  case 'test':
    return 'http://invu-api-server:8080';
  default: // production
    return 'http://invu-server-release:8080'; // real 환경의 서버 URL
  }
})();

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
