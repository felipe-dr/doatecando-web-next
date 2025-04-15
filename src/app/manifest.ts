import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Doatecando - Doação que Educa, Atitude que Preserva',
    short_name: 'Dinamiques',
    description:
      'A Doatecando é uma iniciativa que visa promover mais inclusão digital e sustentabilidade, pois acredita que a educação aliada com a tecnologia podem transformar vidas e construir novas soluções.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#9752d3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
