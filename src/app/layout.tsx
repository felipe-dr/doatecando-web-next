import { Inter } from 'next/font/google';

import './styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  openGraph: {
    images: '/opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-base-16 text-lg text-base-5 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
