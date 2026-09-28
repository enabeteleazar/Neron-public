# Contrat API — liste d'attente Néron Box

Le formulaire de `box.html` (logique dans `js/waitlist.js`) envoie une requête
`POST` en JSON vers l'endpoint défini dans `js/config.js`
(`NERON_CONFIG.waitlist.endpoint`).

**Cet endpoint n'existe pas encore.** Tant que `waitlist.endpoint` vaut `null`
dans la config, le formulaire reste fonctionnel côté interface (validation,
anti-spam) mais affiche un message d'erreur clair au moment de l'envoi, sans
perte silencieuse de la saisie de l'utilisateur.

## Requête

```
POST <endpoint>
Content-Type: application/json
```

```json
{
  "email": "personne@example.com",
  "profile": "particulier",
  "consent": true
}
```

- `email` (string, obligatoire) : adresse email de contact.
- `profile` (string, obligatoire) : `"particulier"` ou `"professionnel"`.
- `consent` (boolean, obligatoire) : toujours `true` — le formulaire
  n'envoie pas la requête si la case n'est pas cochée.

Le formulaire inclut aussi un champ honeypot (`website`) qui doit toujours
être vide côté client ; il n'est volontairement pas transmis dans le corps
JSON. Un serveur qui reçoit un champ `website` non vide via un client HTML
non-JS (soumission de secours) doit le traiter comme un signal de spam.

## Réponses attendues

| Code | Signification | Comportement du formulaire |
|---|---|---|
| `202 Accepted` | Inscription prise en compte (avec ou sans double opt-in derrière) | Message de succès, formulaire réinitialisé |
| `400 Bad Request` | Email invalide ou champ manquant | Message d'erreur, formulaire conservé |
| `429 Too Many Requests` | Limite de fréquence atteinte | Message invitant à réessayer plus tard |
| Autre code / erreur réseau | Panne, timeout, etc. | Message d'erreur générique, aucune perte de saisie |

## Anti-spam

- **Honeypot** : champ `website`, cosmétiquement masqué (pas de `display:none`
  pour rester lisible par certains lecteurs d'écran, mais retiré du flux
  visuel et de l'ordre de tabulation). Si rempli, la soumission est ignorée
  silencieusement côté client — aucune requête n'est envoyée.
- **Délai minimal** : la soumission est ignorée si elle intervient moins de
  2,5 secondes après le chargement du formulaire.
- Aucun CAPTCHA tiers n'est utilisé (voir règle de confidentialité : aucune
  requête vers un domaine externe).

## Stockage côté navigateur

Aucun. Le formulaire ne lit ni n'écrit dans `localStorage`, `sessionStorage`
ou les cookies.

## À faire côté backend (NABET)

- Choisir et documenter l'endpoint réel, puis renseigner
  `NERON_CONFIG.waitlist.endpoint` dans `js/config.js`.
- Mettre à jour `vercel.json` (`Content-Security-Policy`, directives
  `form-action` **et** `connect-src`) pour inclure le domaine de cet
  endpoint — sans cela, le navigateur bloquera à la fois la soumission
  de secours sans JS et l'appel `fetch()` de `js/waitlist.js`.
- Définir la politique de rétention et de désinscription des emails
  collectés, à refléter dans `confidentialite.html`.
