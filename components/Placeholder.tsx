/**
 * Affiche une valeur de site-data.json si elle est renseignée, sinon un
 * texte de repli stylé [À CONFIRMER]/[À COMPLÉTER]. Équivalent React du
 * binder générique [data-field] de l'ancienne version vanilla — ici,
 * aucun JavaScript client n'est nécessaire : tout se joue au rendu.
 */
export default function Placeholder({
  value,
  fallback,
}: {
  value: string | null | undefined;
  fallback: string;
}) {
  if (value && value.trim() !== '') {
    return <>{value}</>;
  }
  return <span className="placeholder">{fallback}</span>;
}
