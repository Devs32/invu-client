import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      minWidth: {
        'sm': '375px'
      },
      fontFamily: {
        sans: [ 'KoPubWorld Batang', 'sans-serif' ]
      }
    }
  },
  plugins: []
} satisfies Config;
