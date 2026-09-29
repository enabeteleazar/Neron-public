# site-data.json — remplir les informations manquantes

`site-data.json`, à la racine du dépôt, est **le seul fichier** à modifier
pour compléter les informations manquantes du site (juridique, hébergement,
statuts des offres...). Chaque champ vaut `null` tant qu'il n'est pas rempli
— le site continue d'afficher `[À CONFIRMER]`/`[À COMPLÉTER]` à cet endroit
sans rien casser.

## Comment ça marche

Le fichier est importé par `lib/site-data.ts`, lui-même utilisé par
`lib/config.ts` et par les pages (`app/**/page.tsx`). Chaque page affiche un
composant `<Placeholder value={...} fallback="[À CONFIRMER]" />` : s'il
reçoit une valeur non vide, il l'affiche ; sinon il affiche le texte de
repli stylé. Comme le rendu se fait côté serveur (App Router), aucun
JavaScript n'est nécessaire côté visiteur pour que les valeurs apparaissent
— il faut seulement reconstruire le site (`pnpm build`) après modification.

## Mettre à jour le site

1. Modifiez les valeurs dans `site-data.json` (ne touchez pas aux noms de
   champs, seulement aux valeurs).
2. Pour vérifier en local avant de publier :
   ```bash
   pnpm build && pnpm start
   ```
3. Committez et poussez sur GitHub (branche `develop` ou une PR) : Vercel
   reconstruit le site automatiquement avec les nouvelles valeurs.

## Cas particulier : le contact affiché sans JavaScript

Le message affiché sur `/box` quand JavaScript est désactivé (dans
`<noscript>`) ne peut pas être rempli automatiquement par ce mécanisme, pour
une autre raison que sur l'ancienne version du site : ce texte est fixe
dans `app/box/page.tsx`. Il doit être édité directement dans ce fichier.

## Champs spéciaux

- `neron_en_ligne.statut` : accepte uniquement `"disponible"` ou
  `"bientot"` (exactement ces deux valeurs) — pilote automatiquement le
  badge de statut et le bouton d'inscription sur tout le site.
- `domaines.site_vitrine` / `domaines.app` : changent les liens
  canoniques et le bouton « Se connecter » partout sur le site.
- `liste_attente.endpoint` : URL technique de l'API — nécessite aussi de
  mettre à jour `next.config.js` (`form-action`, `connect-src` dans la CSP),
  voir `docs/liste-attente.md`.
