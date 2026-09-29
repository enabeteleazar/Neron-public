export default function StatusBadge({
  status,
  label,
}: {
  status: 'disponible' | 'bientot' | 'prochainement';
  label: string;
}) {
  return <span className={`status status-${status}`}>{label}</span>;
}
