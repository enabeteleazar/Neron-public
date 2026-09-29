import type { Metadata } from 'next';
import LegalBanner from '@/components/LegalBanner';
import Placeholder from '@/components/Placeholder';
import siteData from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site neronOS.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/mentions-legales' },
};

export default function MentionsLegalesPage() {
  const { entreprise, hebergement_site: hebergement } = siteData;

  return (
    <>
      <LegalBanner />
      <section className="section section-top-tight">
        <div className="wrap-narrow">
          <span className="eyebrow">// informations légales</span>
          <h1 className="h1-legal">Mentions légales</h1>

          <div className="prose">
            <h2>Éditeur du site</h2>
            <ul>
              <li>
                <strong>Dénomination sociale</strong> :{' '}
                <Placeholder value={entreprise.denomination_sociale} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Forme juridique</strong> :{' '}
                <Placeholder value={entreprise.forme_juridique} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Capital social</strong> :{' '}
                <Placeholder value={entreprise.capital_social} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Siège social</strong> :{' '}
                <Placeholder value={entreprise.siege_social} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>SIREN / RCS</strong> :{' '}
                <Placeholder value={entreprise.siren_rcs} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Directeur de la publication</strong> :{' '}
                <Placeholder value={entreprise.directeur_publication} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Contact</strong> :{' '}
                <Placeholder
                  value={entreprise.contact_general}
                  fallback="[À COMPLÉTER : adresse email ou postale de contact]"
                />
              </li>
            </ul>

            <h2>Hébergement du site</h2>
            <ul>
              <li>
                <strong>Hébergeur</strong> :{' '}
                <Placeholder value={hebergement.nom} fallback="[À COMPLÉTER : nom de l'hébergeur]" />
              </li>
              <li>
                <strong>Adresse</strong> :{' '}
                <Placeholder value={hebergement.adresse} fallback="[À COMPLÉTER]" />
              </li>
              <li>
                <strong>Contact</strong> :{' '}
                <Placeholder value={hebergement.contact} fallback="[À COMPLÉTER]" />
              </li>
            </ul>
            <p>
              Le site vitrine (<code>neronos.fr</code>) est distinct de
              l&apos;application en ligne (<code>app.neronos.fr</code>), qui
              peut avoir son propre hébergeur — voir la{' '}
              <a href="/confidentialite">politique de confidentialité</a>{' '}
              pour le détail applicable à Néron en ligne.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus de ce site (textes, mise en
              page, logiciels Néron) est la propriété de l&apos;éditeur
              mentionné ci-dessus, sauf mention contraire.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative à ce site :{' '}
              <Placeholder value={entreprise.contact_general} fallback="[À COMPLÉTER]" />.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
