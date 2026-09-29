import type { Metadata } from 'next';
import Placeholder from '@/components/Placeholder';
import StatusBadge from '@/components/StatusBadge';
import siteData from '@/lib/site-data';
import { onlineStatus, onlineStatusLabel, loginUrl, signupUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Néron en ligne',
  description:
    "Néron en ligne : un compte, une connexion via Apple, Google ou un code email, un assistant prêt à l'emploi. Découvrez où sont hébergées vos données.",
  alternates: { canonical: '/en-ligne' },
};

export default function EnLignePage() {
  const info = siteData.neron_en_ligne;

  return (
    <>
      <section className="hero hero-compact">
        <div className="hero-inner hero-inner-narrow">
          <span className="eyebrow">// néron en ligne</span>
          <StatusBadge status={onlineStatus} label={onlineStatusLabel} />
          <h1 className="h1-sub">
            Un compte. Un assistant prêt à l&apos;emploi.
          </h1>
          <p className="lead lead-narrow">
            Néron en ligne vous donne accès à l&apos;assistant sans rien
            installer. Créez un compte, connectez-vous, et commencez à
            discuter. Cette offre fonctionne différemment de Néron
            Community et de la Néron Box&nbsp;: vos échanges sont hébergés
            par la société, pas sur votre machine.
          </p>
          <div className="actions">
            {onlineStatus === 'disponible' ? (
              <a href={signupUrl} className="btn btn-solid">
                Créer un compte
              </a>
            ) : (
              <span className="btn btn-glass glass" aria-disabled="true">
                {onlineStatusLabel}
              </span>
            )}
            <a href={loginUrl} className="btn btn-glass glass">
              Se connecter
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap-narrow prose">
          <h2>Comment ça marche</h2>
          <ul>
            <li>
              <strong>Créez un compte</strong> — avec votre adresse email, ou
              directement via Apple ou Google.
            </li>
            <li>
              <strong>Connectez-vous</strong> — via Apple, Google, ou un code
              à usage unique envoyé par email. Aucun mot de passe à
              retenir.
            </li>
            <li>
              <strong>Accédez à votre tableau de bord</strong> — et
              commencez à discuter avec Néron, sans installation.
            </li>
          </ul>

          <h2>Où sont vos données</h2>
          <p>
            Contrairement à Néron Community et à la Néron Box, l&apos;offre
            en ligne <strong>n&apos;est pas 100&nbsp;% locale</strong>&nbsp;:
            le contenu de vos conversations et les données de votre compte
            sont traités et stockés par la société qui exploite Néron en
            ligne.
          </p>
          <ul>
            <li>
              <strong>Hébergement des données</strong> :{' '}
              <Placeholder
                value={info.hebergement_donnees}
                fallback="[À CONFIRMER : pays et prestataire d'hébergement]"
              />
            </li>
            <li>
              <strong>Fournisseur du modèle de langage (LLM)</strong> :{' '}
              <Placeholder value={info.fournisseur_llm} fallback="[À CONFIRMER]" />
            </li>
            <li>
              <strong>Service d&apos;envoi d&apos;emails</strong> (codes de
              connexion, notifications) :{' '}
              <Placeholder value={info.service_envoi_emails} fallback="[À CONFIRMER]" />
            </li>
            <li>
              <strong>Transferts hors Union européenne</strong> :{' '}
              <Placeholder value={info.transferts_hors_ue} fallback="[À CONFIRMER]" />
            </li>
          </ul>
          <p>
            Le détail complet des sous-traitants et des durées de
            conservation figure dans notre{' '}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>

          <h2>Ce qui est disponible aujourd&apos;hui</h2>
          <ul>
            <li>
              Création de compte et connexion via Apple, Google ou code
              email{' '}
              <Placeholder
                value={info.disponibilite_creation_compte}
                fallback="[À CONFIRMER : disponibilité réelle]"
              />
            </li>
            <li>
              Conversation avec l&apos;assistant depuis le tableau de bord{' '}
              <Placeholder value={info.disponibilite_conversation} fallback="[À CONFIRMER]" />
            </li>
          </ul>

          <h2>Ce qui n&apos;est pas encore disponible</h2>
          <p>
            Tant que ces fonctionnalités ne sont pas livrées, nous ne les
            proposons pas comme si elles existaient déjà.
          </p>
          <ul>
            <li>
              Export de vos données <span className="badge-soon">(prochainement)</span>
            </li>
            <li>
              Suppression complète du compte et des données associées{' '}
              <span className="badge-soon">(prochainement)</span>
            </li>
            <li>
              <Placeholder
                value={info.autres_fonctionnalites_a_venir}
                fallback="[À CONFIRMER : autres fonctionnalités prévues à lister ici]"
              />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
