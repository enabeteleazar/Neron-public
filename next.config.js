/** @type {import('next').NextConfig} */

// Les en-têtes de sécurité (CSP avec nonce, HSTS, etc.) sont posés par
// middleware.ts — un nonce par requête est nécessaire pour que la CSP
// reste stricte (script-src 'self', sans 'unsafe-inline') tout en
// autorisant les scripts inline que Next.js génère lui-même pour
// l'hydratation. next.config.js ne peut pas générer de valeur par
// requête, donc rien n'est dupliqué ici.

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
