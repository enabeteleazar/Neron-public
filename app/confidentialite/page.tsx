import type { Metadata } from 'next';
import LegalBanner from '@/components/LegalBanner';
import Placeholder from '@/components/Placeholder';
import siteData from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité de neronOS : données collectées par produit, finalités, sous-traitants, durées de conservation et droits des personnes.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/confidentialite' },
};

export default function ConfidentialitePage() {
  const { entreprise, neron_en_ligne: online, liste_attente: waitlist, confidentialite: contact } = siteData;

  return (
    <>
      <LegalBanner />
      <section className="section section-top-tight">
        <div className="wrap-narrow">
          <span className="eyebrow">// données personnelles</span>
          <h1 className="h1-legal">Politique de confidentialité</h1>

          <div className="prose">
            <h2>1. Responsable de traitement</h2>
            <p>
              <Placeholder value={entreprise.denomination_sociale} fallback="[À COMPLÉTER]" />,{' '}
              <Placeholder value={entreprise.forme_juridique} fallback="SASU" />, dont le siège
              social est situé{' '}
              <Placeholder value={entreprise.siege_social} fallback="[À COMPLÉTER]" />, immatriculée
              sous le numéro <Placeholder value={entreprise.siren_rcs} fallback="[À COMPLÉTER]" />,
              ci-après « la société », est responsable des traitements de données décrits
              ci-dessous pour le site vitrine et pour Néron en ligne.
            </p>
            <p>
              Pour Néron Community et la Néron Box, voir la section 6 : la société ne collecte,
              dans leur usage normal, aucune donnée relative à votre utilisation de
              l&apos;assistant.
            </p>

            <h2>2. Données collectées, par produit</h2>

            <h3>2.1 Site vitrine (neronos.fr)</h3>
            <p>
              Aucun cookie non essentiel, aucun traceur, aucun outil d&apos;analyse tiers. Le site
              ne dépose aucun cookie et ne charge aucune ressource depuis un domaine externe.
            </p>

            <h3>2.2 Liste d&apos;attente Néron Box</h3>
            <ul>
              <li>Adresse email</li>
              <li>Profil déclaré (particulier ou professionnel)</li>
              <li>Consentement à être recontacté(e)</li>
            </ul>
            <p>
              Voir le contrat technique dans <code>docs/liste-attente.md</code> du dépôt du site.
            </p>

            <h3>2.3 Compte Néron en ligne</h3>
            <ul>
              <li>
                Adresse email, et selon la méthode de connexion choisie, identifiant fourni par
                Apple ou Google
              </li>
              <li>
                Données de connexion (horodatage, éventuellement adresse IP) :{' '}
                <Placeholder value={online.donnees_connexion_collectees} fallback="[À CONFIRMER]" />
              </li>
              <li>Contenu de vos conversations avec l&apos;assistant</li>
              <li>
                <Placeholder
                  value={online.autres_donnees_compte}
                  fallback="[À CONFIRMER : autres données de compte collectées]"
                />
              </li>
            </ul>

            <h2>3. Finalités et bases légales</h2>
            <ul>
              <li>
                <strong>Fourniture du service Néron en ligne</strong> (exécution du contrat) :
                création et gestion du compte, fonctionnement de l&apos;assistant.
              </li>
              <li>
                <strong>Gestion de la liste d&apos;attente</strong> (consentement) : vous informer
                de l&apos;ouverture des ventes de la Néron Box.
              </li>
              <li>
                <strong>Sécurité et prévention de la fraude</strong> (intérêt légitime) : lutte
                contre les soumissions automatisées.
              </li>
              <li>
                <Placeholder value={online.autres_finalites} fallback="[À CONFIRMER : autres finalités]" />
              </li>
            </ul>

            <h2>4. Destinataires et sous-traitants</h2>
            <p>Pour Néron en ligne uniquement :</p>
            <ul>
              <li>
                <strong>Fournisseur du modèle de langage (LLM)</strong> :{' '}
                <Placeholder value={online.fournisseur_llm} fallback="[À CONFIRMER]" />
              </li>
              <li>
                <strong>Hébergeur des données</strong> :{' '}
                <Placeholder value={online.hebergement_donnees} fallback="[À CONFIRMER]" />
              </li>
              <li>
                <strong>Service d&apos;envoi d&apos;emails</strong> :{' '}
                <Placeholder value={online.service_envoi_emails} fallback="[À CONFIRMER]" />
              </li>
              <li>
                <Placeholder
                  value={online.autres_sous_traitants}
                  fallback="[À CONFIRMER : autres sous-traitants]"
                />
              </li>
            </ul>
            <p>
              Pour la liste d&apos;attente Néron Box, le sous-traitant recevant les emails
              collectés est :{' '}
              <Placeholder value={waitlist.prestataire} fallback="[À CONFIRMER : prestataire choisi]" />.
            </p>

            <h2>5. Hébergement et transferts hors Union européenne</h2>
            <p>
              Les données de Néron en ligne sont hébergées par :{' '}
              <Placeholder
                value={online.hebergement_donnees}
                fallback="[À CONFIRMER : pays et prestataire d'hébergement]"
              />
              . Transferts hors Union européenne :{' '}
              <Placeholder
                value={online.transferts_hors_ue}
                fallback="[À CONFIRMER : existence et mécanisme de garantie le cas échéant]"
              />
              .
            </p>

            <h2>6. Néron Community et Néron Box : aucune donnée collectée par la société</h2>
            <p>
              Néron Community tourne entièrement sur votre machine&nbsp;: elle ne transmet aucune
              donnée à la société. Il en va de même, par conception, pour la Néron Box une fois
              commercialisée.
            </p>
            <p>
              <strong>Nuance importante</strong> : l&apos;IA, la mémoire et vos données tournent
              chez vous. Les services tiers que vous choisissez vous-même de connecter (par
              exemple Telegram, un agenda ou une messagerie) restent des services tiers, soumis à
              leurs propres conditions et politiques de confidentialité — vos messages transitent
              alors par leurs serveurs, en dehors de tout contrôle de la société.
            </p>

            <h2>7. Durées de conservation</h2>
            <ul>
              <li>
                Liste d&apos;attente Néron Box : jusqu&apos;à l&apos;ouverture des ventes ou votre
                désinscription,{' '}
                <Placeholder value={waitlist.duree_conservation} fallback="[À CONFIRMER : durée maximale]" />
                .
              </li>
              <li>
                Compte Néron en ligne :{' '}
                <Placeholder value={online.duree_conservation_compte} fallback="[À CONFIRMER]" />.
              </li>
            </ul>

            <h2>8. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos
              données. Pour Néron en ligne, l&apos;export et la suppression complète du compte
              sont <span className="badge-soon">(prochainement)</span> — en attendant, exercez vos
              droits en nous contactant directement.
            </p>
            <p>
              Pour exercer ces droits :{' '}
              <Placeholder
                value={contact.contact_rgpd}
                fallback="[À COMPLÉTER : adresse de contact dédiée]"
              />
              .
            </p>
            <p>
              Vous disposez également du droit d&apos;introduire une réclamation auprès de la
              Commission Nationale de l&apos;Informatique et des Libertés (CNIL) —{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                cnil.fr
              </a>
              .
            </p>

            <h2>9. Contact</h2>
            <p>
              <Placeholder value={contact.contact_section9} fallback="[À COMPLÉTER]" />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
