/**
 * Configuration centralisée du site vitrine neronOS.
 *
 * Les informations qui manquent encore (juridique, hébergement, statuts...)
 * vivent dans site-data.json, à la racine du dépôt — c'est LE fichier à
 * éditer pour compléter le site. Ce module l'importe, comble les valeurs
 * manquantes avec des valeurs par défaut sûres, et expose le tout (y
 * compris les champs bruts de site-data.json sous `info`, utilisés par le
 * binder générique [data-field] de js/nav.js).
 */
import siteData from '../site-data.json';

const info = siteData;

const onlineStatus =
  info.neron_en_ligne.statut === 'disponible' ? 'disponible' : 'bientot';

const onlineStatusLabel =
  onlineStatus === 'disponible' ? 'Disponible' : 'Bientôt disponible';

const communityMaintenanceNote =
  info.neron_community.rythme_maintenance ||
  'Les mises à jour de cette version sont donc moins fréquentes que celles des ' +
    'offres en ligne et Box. [À CONFIRMER]';

export default Object.freeze({
  site: {
    name: 'neronOS',
    domain: info.domaines.site_vitrine || 'https://neronos.fr',
  },

  app: {
    domain: info.domaines.app || 'https://app.neronos.fr',
    loginPath: '/login',
    signupPath: info.domaines.chemin_inscription || '/signup',
  },

  github: {
    // Le dépôt a beaucoup évolué depuis la v2.0.0 (architecture à sous-modules,
    // multi-services — voir CHANGELOG). « master » et « main » n'ont plus de
    // install.sh à la racine : on pointe volontairement sur le tag v2.0.0,
    // qui correspond à ce que décrit Néron Community. Vérifié le 2026-09-28
    // (clone + fetch --tags + raw.githubusercontent.com → 200).
    repoUrl: 'https://github.com/enabeteleazar/Neron_AI',
    communityTag: 'v2.0.0',
    communityTagUrl: 'https://github.com/enabeteleazar/Neron_AI/tree/v2.0.0',
    installScriptUrl: 'https://github.com/enabeteleazar/Neron_AI/blob/v2.0.0/install.sh',
    installCommand:
      'curl -fsSL https://raw.githubusercontent.com/enabeteleazar/Neron_AI/v2.0.0/install.sh | bash',
  },

  // Contrat attendu par le formulaire de liste d'attente — voir docs/liste-attente.md.
  // Tant que l'endpoint n'existe pas, le formulaire passe en mode dégradé
  // (message d'erreur clair, aucun envoi silencieux).
  waitlist: {
    endpoint: info.liste_attente.endpoint || null,
  },

  products: {
    online: {
      id: 'online',
      name: 'Néron en ligne',
      shortLabel: 'En ligne',
      // Piloté par site-data.json (neron_en_ligne.statut) : 'disponible' | 'bientot'
      status: onlineStatus,
      statusLabel: onlineStatusLabel,
      tagline: 'Un compte, un assistant prêt à l’emploi.',
      description:
        'Créez un compte et connectez-vous avec Apple, Google ou un code reçu par email. ' +
        'Vos échanges sont hébergés par la société — aucune installation nécessaire.',
      page: 'en-ligne.html',
      ctaLabel: 'Découvrir l’offre en ligne',
    },
    community: {
      id: 'community',
      name: 'Néron Community',
      shortLabel: 'Community',
      version: 'v2.0',
      status: 'disponible',
      statusLabel: 'Disponible, gratuit',
      license: 'MIT',
      tagline: '100 % local, open source, installable en une commande.',
      description:
        'L’assistant tourne entièrement sur votre machine. Aucune donnée n’est envoyée ' +
        'à la société. Code source ouvert, licence MIT.',
      maintenanceNote: communityMaintenanceNote,
      page: 'community.html',
      ctaLabel: 'Installer Néron Community',
    },
    box: {
      id: 'box',
      name: 'Néron Box',
      shortLabel: 'Box',
      status: 'prochainement',
      statusLabel: 'Prochainement',
      tagline: 'L’assistant local, clé en main.',
      description:
        'Un boîtier physique qui fait tourner Néron localement, pour les particuliers ' +
        'et les professionnels. Aucune vente n’est ouverte pour l’instant.',
      page: 'box.html',
      ctaLabel: 'Rejoindre la liste d’attente',
    },
  },

  nav: [
    { label: 'Néron en ligne', href: 'en-ligne.html' },
    { label: 'Néron Community', href: 'community.html' },
    { label: 'Néron Box', href: 'box.html' },
  ],

  legal: [
    { label: 'Mentions légales', href: 'mentions-legales.html' },
    { label: 'Confidentialité', href: 'confidentialite.html' },
    { label: 'CGU', href: 'cgu.html' },
  ],

  // Champs bruts de site-data.json, pour le binder générique [data-field]
  // (voir js/nav.js). Chemin d'accès = chemin JSON, ex.
  // data-field="entreprise.denomination_sociale".
  info,
});
