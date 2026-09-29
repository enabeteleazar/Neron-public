import type { Metadata } from 'next';
import LegalBanner from '@/components/LegalBanner';
import Placeholder from '@/components/Placeholder';
import siteData from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description: "Conditions générales d'utilisation de Néron en ligne.",
  robots: { index: false, follow: true },
  alternates: { canonical: '/cgu' },
};

export default function CguPage() {
  const info = siteData.neron_en_ligne;

  return (
    <>
      <LegalBanner />
      <section className="section section-top-tight">
        <div className="wrap-narrow">
          <span className="eyebrow">// conditions d&apos;utilisation</span>
          <h1 className="h1-legal">Conditions générales d&apos;utilisation</h1>

          <div className="prose">
            <h2>1. Objet</h2>
            <p>
              Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès
              et l&apos;usage de Néron en ligne, le service d&apos;assistant IA hébergé accessible
              sur <code>app.neronos.fr</code>. Elles ne s&apos;appliquent pas à Néron Community ni
              à la Néron Box, utilisés localement sans compte.
            </p>

            <h2>2. Création de compte et connexion</h2>
            <p>
              L&apos;accès à Néron en ligne nécessite la création d&apos;un compte. La connexion
              s&apos;effectue au choix via Apple, Google, ou un code à usage unique envoyé par
              email. Vous êtes responsable de la confidentialité des moyens d&apos;accès à votre
              compte.
            </p>

            <h2>3. Usages interdits</h2>
            <p>Vous vous engagez à ne pas utiliser Néron en ligne pour :</p>
            <ul>
              <li>des activités illégales ou frauduleuses ;</li>
              <li>porter atteinte aux droits de tiers ;</li>
              <li>tenter de contourner les mesures de sécurité du service ;</li>
              <li>collecter des données du service de manière automatisée sans autorisation ;</li>
              <li>
                <Placeholder
                  value={info.usages_interdits_specifiques}
                  fallback="[À COMPLÉTER : autres usages interdits spécifiques]"
                />
              </li>
            </ul>

            <h2>4. Disponibilité du service</h2>
            <p>
              Néron en ligne{' '}
              <Placeholder
                value={info.statut_description_cgu}
                fallback="[À CONFIRMER : statut actuel — disponible ou en accès anticipé]"
              />
              . Le service peut faire l&apos;objet d&apos;interruptions, notamment pour
              maintenance, sans que cela n&apos;engage la responsabilité de la société au-delà de
              ce que la loi impose.
            </p>

            <h2>5. Responsabilité</h2>
            <p>
              Néron en ligne est un assistant IA qui peut produire des réponses erronées ou
              incomplètes. Il ne se substitue pas à un avis professionnel (médical, juridique,
              financier ou autre). La société ne garantit pas l&apos;exactitude des réponses
              fournies.
            </p>
            <p>
              <Placeholder
                value={info.clauses_responsabilite_garantie}
                fallback="[À COMPLÉTER : clauses de responsabilité et de garantie propres à la société]"
              />
            </p>

            <h2>6. Résiliation et suppression du compte</h2>
            <p>
              Vous pouvez cesser d&apos;utiliser Néron en ligne à tout moment. La suppression
              complète du compte et des données associées est{' '}
              <span className="badge-soon">(prochainement)</span> — en attendant, contactez-nous
              pour toute demande de suppression (voir la{' '}
              <a href="/confidentialite">politique de confidentialité</a>).
            </p>
            <p>
              La société se réserve le droit de suspendre ou résilier un compte en cas de
              violation des présentes CGU.
            </p>

            <h2>7. Droit applicable et juridiction</h2>
            <p>
              Les présentes CGU sont soumises au droit français.{' '}
              <Placeholder
                value={info.juridiction_competente}
                fallback="[À COMPLÉTER : juridiction compétente]"
              />
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
