// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mekan Gezer - Şehri Keşfet, Fotoğrafla, Paylaş',
  description: 'Şehirdeki mekanları keşfet, fotoğraf gezilerine katıl, topluluğa katıl. İstanbul, Ankara, İzmir ve daha fazlası.',
  keywords: 'mekan, keşif, fotoğraf, etkinlik, istanbul, ankara, gezginci, topluluk',
  authors: [{ name: 'Mekan Gezer' }],
  openGraph: {
    title: 'Mekan Gezer',
    description: 'Şehri keşfet, fotoğrafla, paylaş',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mekan Gezer',
    description: 'Şehri keşfet, fotoğrafla, paylaş',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
