import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { site } from '@/lib/config';
import './globals.css';

// Police de secours pour les appareils sans SF Pro (Windows, Linux, Android).
// Sur Apple, la pile système prend le relais (voir --font dans globals.css).
// next/font héberge la police localement au build : aucune requête vers
// Google Fonts au chargement de la page.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: 'neronOS — Un assistant IA, trois façons de l’utiliser',
    template: '%s — neronOS',
  },
  description:
    'neronOS propose trois façons d’utiliser l’assistant IA Néron : en ligne, en local avec Néron Community, ou bientôt avec la Néron Box.',
  alternates: { canonical: '/' },
};

// Nécessaire pour une CSP stricte avec nonce (voir middleware.ts) : le
// nonce change à chaque requête, donc les pages ne peuvent pas être
// pré-rendues une fois pour toutes au build — elles sont rendues côté
// serveur à chaque requête (toujours rapide pour un site de cette taille).
export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: '#07080d',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        <div className="stage" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </div>
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
