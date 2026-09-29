import type { Metadata } from 'next';
import Placeholder from '@/components/Placeholder';
import StatusBadge from '@/components/StatusBadge';
import WaitlistForm from '@/components/WaitlistForm';
import siteData from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Néron Box',
  description:
    "Néron Box : l'assistant IA 100% local, clé en main, pour les particuliers et les professionnels. Prochainement — rejoignez la liste d'attente.",
  alternates: { canonical: '/box' },
};

export default function BoxPage() {
  const info = siteData.neron_box;

  return (
    <>
      <section className="hero hero-compact">
        <div className="hero-inner hero-inner-narrow">
          <span className="eyebrow">// néron box</span>
          <StatusBadge status="prochainement" label="Prochainement" />
          <h1 className="h1-sub">
            L&apos;assistant local, clé en main.
          </h1>
          <p className="lead lead-narrow">
            La Néron Box fait tourner Néron localement dans un boîtier prêt
            à l&apos;emploi, pour les particuliers comme pour les
            professionnels. Elle n&apos;est pas encore en vente&nbsp;:
            aucun prix, aucune date de livraison ne sont fixés pour
            l&apos;instant.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap-narrow prose">
          <h2>Ce que l&apos;on sait déjà</h2>
          <ul>
            <li>
              Assistant IA fonctionnant 100&nbsp;% en local, sans dépendre
              d&apos;un service en ligne pour l&apos;IA elle-même.
            </li>
            <li>Destinée aux particuliers et aux professionnels.</li>
            <li>
              Même principe de confidentialité que Néron Community&nbsp;:
              l&apos;IA, la mémoire et vos données tournent chez vous&nbsp;;
              les services que vous choisissez de connecter (Telegram,
              agenda, mail) restent des services tiers.
            </li>
            <li>
              <strong>Caractéristiques matérielles</strong> :{' '}
              <Placeholder value={info.caracteristiques_materielles} fallback="[À CONFIRMER]" />
            </li>
            <li>
              <strong>Prix indicatif</strong> :{' '}
              <Placeholder value={info.prix_indicatif} fallback="[À CONFIRMER]" />
            </li>
            <li>
              <strong>Date d&apos;ouverture des ventes</strong> :{' '}
              <Placeholder value={info.date_ouverture_ventes} fallback="[À CONFIRMER]" />
            </li>
          </ul>

          <h2>Rejoindre la liste d&apos;attente</h2>
          <p>
            Laissez votre email pour être informé(e) en priorité de
            l&apos;ouverture des ventes. Aucune obligation d&apos;achat.
          </p>

          <WaitlistForm />

          <noscript>
            <p className="form-status" data-tone="error">
              L&apos;envoi de ce formulaire nécessite JavaScript pour
              l&apos;instant. Vous pouvez aussi nous écrire directement à{' '}
              <span className="placeholder">[À CONFIRMER : adresse de contact]</span>.
            </p>
          </noscript>
        </div>
      </section>
    </>
  );
}
