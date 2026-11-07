// src/app/manifest.ts v5.2.35

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HanziMaster 汉字大师',
    short_name: 'HanziMaster',
    description: 'Interactive Chinese character learning with stroke-order practice.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#c53d43',
    lang: 'en',
    dir: 'ltr',
    categories: ['education', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
