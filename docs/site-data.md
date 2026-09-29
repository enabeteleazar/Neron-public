# site-data.json — remplir les informations manquantes

`site-data.json`, à la racine du dépôt, est **le seul fichier** à modifier
pour compléter les informations manquantes du site (juridique, hébergement,
statuts des offres...). Chaque champ vaut `null` tant qu'il n'est pas rempli
— le site continue d'afficher `[À CONFIRMER]`/`[À COMPLÉTER]` à cet endroit
sans rien casser.

## Comment ça marche

Le fichier est importé par `js/config.js` au moment du build (Vite). Chaque
page HTML porte des éléments `<span data-field="chemin.vers.champ">` ; au
chargement, `js/nav.js` remplace leur texte par la valeur correspondante dans
`site-data.json` si elle est renseignée (sinon il laisse le placeholder tel
quel).

## Mettre à jour le site

1. Modifiez les valeurs dans `site-data.json` (ne touchez pas aux noms de
   champs, seulement aux valeurs).
2. Pour vérifier en local avant de publier :
   ```bash
   pnpm build && pnpm preview
   ```
3. Committez et poussez sur GitHub (branche `develop` ou une PR) : Vercel
   reconstruit le site automatiquement avec les nouvelles valeurs.

## Cas particulier : le contact affiché sans JavaScript

Le message affiché sur `box.html` quand JavaScript est désactivé (dans
`<noscript>`) ne peut pas être rempli automatiquement par ce mécanisme,
puisqu'il n'est visible que lorsque JavaScript ne s'exécute pas. Ce seul
placeholder doit être édité directement dans `box.html`.

## Champs spéciaux

- `neron_en_ligne.statut` : accepte uniquement `"disponible"` ou
  `"bientot"` (exactement ces deux valeurs) — pilote automatiquement le
  badge de statut et le bouton d'inscription sur tout le site.
- `domaines.site_vitrine` / `domaines.app` : changent les liens
  canoniques, `og:url`, et le bouton « Se connecter » partout sur le site.
- `liste_attente.endpoint` : URL technique de l'API — nécessite aussi de
  mettre à jour `vercel.json` (`form-action`, `connect-src`), voir
  `docs/liste-attente.md`.
