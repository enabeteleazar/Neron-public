# URLs publiques — conformité Apple / Google

Apple (App Store Connect, Sign in with Apple) et Google (Play Console, Sign
in with Google) exigent des URLs publiques stables pour la politique de
confidentialité et les conditions d'utilisation lors de la configuration de
la connexion « Apple » / « Google » sur Néron en ligne.

- **Politique de confidentialité** : `https://neronos.fr/confidentialite.html`
- **Conditions générales d'utilisation** : `https://neronos.fr/cgu.html`

**[À CONFIRMER]** le domaine définitif (`neronos.fr`) — si un autre domaine
est retenu, mettre à jour `js/config.js` (`site.domain`, `app.domain`) et
recalculer ces deux URLs en conséquence.

Ces deux pages sont actuellement des **modèles** (bandeau d'avertissement en
tête de page, placeholders `[À COMPLÉTER]`). Elles doivent être validées par
un professionnel du droit avant d'être renseignées dans les consoles Apple
et Google — une fois publiées avec du contenu réel, retirer la balise
`<meta name="robots" content="noindex, follow">` de ces deux pages pour
qu'elles soient indexées normalement.
