import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '팔자왕 - 무료 사주 운세',
    short_name: '팔자왕',
    description: '전통 명리학 기반 무료 사주, 운세, 궁합, 타로 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#7c3aed',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['entertainment', 'lifestyle'],
    lang: 'ko',
  }
}
