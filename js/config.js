/**
 * Configuration centralisée du site vitrine neronOS.
 * Toute donnée qui varie dans le temps (noms, statuts, domaines, liens,
 * textes de badge) doit être lue ici — jamais recopiée en dur dans une page.
 * Les valeurs marquées [À CONFIRMER] sont des choix provisoires de l'agent :
 * ne pas les considérer comme validées par NABET.
 */
window.NERON_CONFIG = Object.freeze({
  site: {
    name: 'neronOS',
    // [À CONFIRMER] domaine définitif du site vitrine
    domain: 'https://neronos.fr',
  },

  app: {
    // [À CONFIRMER] domaine définitif de l'application en ligne
    domain: 'https://app.neronos.fr',
    loginPath: '/login',
    // [À CONFIRMER] chemin d'inscription — supposé « /signup » en l'absence de confirmation
    signupPath: '/signup',
  },

  github: {
    repoUrl: 'https://github.com/enabeteleazar/Neron_AI',
    installScriptUrl: 'https://github.com/enabeteleazar/Neron_AI/blob/master/install.sh',
    installCommand:
      'curl -fsSL https://raw.githubusercontent.com/enabeteleazar/Neron_AI/master/install.sh | bash',
  },

  // Contrat attendu par le formulaire de liste d'attente — voir docs/liste-attente.md.
  // Tant que l'endpoint n'existe pas, le formulaire passe en mode dégradé
  // (message d'erreur clair, aucun envoi silencieux).
  waitlist: {
    // [À CONFIRMER] endpoint réel de collecte de la liste d'attente
    endpoint: null,
  },

  products: {
    online: {
      id: 'online',
      name: 'Néron en ligne', // [À CONFIRMER] nom définitif
      shortLabel: 'En ligne',
      // [À CONFIRMER] statut réel : cette valeur suppose que le service n'est pas encore ouvert.
      // Valeurs possibles : 'disponible' | 'bientot'
      status: 'bientot',
      statusLabel: 'Bientôt disponible',
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
      // [À CONFIRMER] rythme réel des mises à jour de cette génération
      maintenanceNote:
        'Génération précédente de Néron : les mises à jour de Néron Community sont ' +
        'moins fréquentes que celles des offres en ligne et Box. [À CONFIRMER]',
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
});
