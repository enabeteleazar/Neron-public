import siteData from './site-data';

/**
 * Configuration centralisée du site — équivalent React de l'ancien
 * js/config.js. Les informations qui manquent encore vivent dans
 * site-data.json à la racine du dépôt : c'est LE fichier à éditer pour
 * compléter le site (voir docs/site-data.md).
 */

export const site = {
  name: 'neronOS',
  domain: siteData.domaines.site_vitrine || 'https://neronos.fr',
};

export const app = {
  domain: siteData.domaines.app || 'https://app.neronos.fr',
  loginPath: '/login',
  signupPath: siteData.domaines.chemin_inscription || '/signup',
};

export const loginUrl = app.domain + app.loginPath;
export const signupUrl = app.domain + app.signupPath;

export type OnlineStatus = 'disponible' | 'bientot';

export const onlineStatus: OnlineStatus =
  siteData.neron_en_ligne.statut === 'disponible' ? 'disponible' : 'bientot';

export const onlineStatusLabel: string =
  onlineStatus === 'disponible' ? 'Disponible' : 'Bientôt disponible';

export const products = {
  online: {
    id: 'online' as const,
    name: 'Néron en ligne',
    tagline: 'Rien à installer.',
    status: onlineStatus,
    statusLabel: onlineStatusLabel,
    page: '/en-ligne',
    glowClass: 'glow-magenta',
  },
  community: {
    id: 'community' as const,
    name: 'Néron Community',
    tagline: 'Gratuit, sur votre machine.',
    status: 'disponible' as const,
    statusLabel: 'Disponible, gratuit',
    page: '/community',
    glowClass: 'glow-cyan',
  },
  box: {
    id: 'box' as const,
    name: 'Néron Box',
    tagline: 'Un serveur chez vous.',
    status: 'prochainement' as const,
    statusLabel: 'Prochainement',
    page: '/box',
    glowClass: 'glow-amber',
  },
};

export const navLinks = [
  { label: 'Néron en ligne', href: '/en-ligne' },
  { label: 'Néron Community', href: '/community' },
  { label: 'Néron Box', href: '/box' },
];

export const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'CGU', href: '/cgu' },
];
