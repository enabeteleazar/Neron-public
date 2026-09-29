import { NextRequest, NextResponse } from 'next/server';

/**
 * CSP stricte, générée par requête avec un nonce.
 *
 * Next.js (App Router) a besoin d'exécuter quelques scripts inline pour
 * hydrater le rendu serveur (streaming RSC) — un simple en-tête statique
 * (via next.config.js) ne peut donc pas passer en script-src 'self' seul
 * sans casser le site. Le nonce généré ici est automatiquement repris par
 * Next.js pour ses propres scripts inline dès qu'il le détecte dans cet
 * en-tête, sans configuration supplémentaire.
 * Voir : https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isProd = process.env.NODE_ENV === 'production';

  const csp = isProd
    ? `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`
    // En dev, le HMR de Next.js a besoin de 'unsafe-eval' (webpack) et
    // d'un peu plus de latitude ; cette CSP stricte ne s'applique donc
    // pleinement qu'en production (pnpm build && pnpm start).
    : "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' ws:; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

export const config = {
  matcher: [
    // Toutes les routes sauf les fichiers statiques internes de Next.js.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
