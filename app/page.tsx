import GlassControl from '@/components/GlassControl';
import StatusBadge from '@/components/StatusBadge';
import { products, loginUrl } from '@/lib/config';

const connections = ['Agenda', 'Rappels', 'Mail', 'Notes', 'Telegram', 'Notion'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1 className="rise rise-0">
            Un assistant qui agit, pas seulement qui répond.
          </h1>
          <p className="lead rise rise-1">
            Agenda, rappels, mails, notes : Néron se connecte à vos
            applications et s&apos;en occupe. Trois façons de l&apos;utiliser :
            en ligne, en local, ou bientôt sur un serveur dédié.
          </p>
          <div className="actions rise rise-2">
            <a href={loginUrl} className="btn btn-solid">
              Se connecter
            </a>
            <a href="#produits" className="btn btn-glass glass">
              Voir les offres
            </a>
          </div>

          <div
            className="chat glass rise rise-3"
            role="img"
            aria-label="Exemple de conversation : l'utilisateur demande de décaler une réunion, Néron confirme, puis crée un rappel."
          >
            <div className="chat-head">
              <span className="dot" />
              Néron
            </div>
            <p className="bubble me">Décale ma réunion de demain à 15 h.</p>
            <p className="bubble">C&apos;est fait. Elle est maintenant à 15 h.</p>
            <p className="bubble me">Rappelle-moi d&apos;appeler Sarah avant.</p>
            <p className="bubble">Rappel créé pour 14 h 30.</p>
          </div>

          <GlassControl />
        </div>
      </section>

      <section className="section" id="produits">
        <div className="wrap">
          <div className="section-head">
            <h2>Trois façons d&apos;avoir Néron.</h2>
            <p className="lead">
              Sur votre ordinateur, dans le navigateur ou sur un serveur à
              brancher chez vous. Chaque offre a ses propres garanties.
            </p>
          </div>

          <div className="panels">
            <div className={`panel-wrap ${products.community.glowClass}`}>
              <article className="panel glass">
                <div className="panel-text">
                  <h3>{products.community.name}</h3>
                  <p className="tagline">{products.community.tagline}</p>
                  <p className="body">
                    Installez Néron sur votre machine : tout tourne chez
                    vous, aucune donnée n&apos;est envoyée à la société.
                  </p>
                  <StatusBadge
                    status={products.community.status}
                    label={products.community.statusLabel}
                  />
                  <a href={products.community.page} className="btn btn-glass glass">
                    Découvrir Community
                  </a>
                </div>
                <ul className="facts">
                  <li>Gratuit</li>
                  <li>100 % local</li>
                  <li>Installable en une commande</li>
                </ul>
              </article>
            </div>

            <div className={`panel-wrap ${products.online.glowClass}`}>
              <article className="panel glass">
                <div className="panel-text">
                  <h3>{products.online.name}</h3>
                  <p className="tagline">{products.online.tagline}</p>
                  <p className="body">
                    Connectez-vous depuis votre navigateur et retrouvez
                    votre assistant sur son tableau de bord.
                  </p>
                  <StatusBadge
                    status={products.online.status}
                    label={products.online.statusLabel}
                  />
                  <a href={products.online.page} className="btn btn-glass glass">
                    Découvrir l&apos;offre en ligne
                  </a>
                </div>
                <ul className="facts">
                  <li>Connexion Apple, Google ou code email</li>
                  <li>Rien à installer</li>
                  <li>Données hébergées par la société</li>
                </ul>
              </article>
            </div>

            <div className={`panel-wrap ${products.box.glowClass}`}>
              <article className="panel glass">
                <div className="panel-text">
                  <h3>{products.box.name}</h3>
                  <p className="tagline">{products.box.tagline}</p>
                  <p className="body">
                    Branchez-le sur votre réseau : Néron tourne à la
                    maison, comme Community, dans un boîtier prêt à
                    l&apos;emploi.
                  </p>
                  <StatusBadge status={products.box.status} label={products.box.statusLabel} />
                  <a href={products.box.page} className="btn btn-glass glass">
                    Rejoindre la liste d&apos;attente
                  </a>
                </div>
                <ul className="facts">
                  <li>Particuliers et professionnels</li>
                  <li>100 % local</li>
                  <li>Aucune vente ouverte pour l&apos;instant</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="connexions">
        <div className="wrap">
          <div className="section-head">
            <h2>Néron travaille dans vos applications.</h2>
            <p className="lead">
              Sur les offres locales (Community et Box), l&apos;IA, la
              mémoire et vos données tournent chez vous&nbsp;; les services
              tiers que vous connectez restent des services tiers.
            </p>
          </div>
          <ul className="chips">
            {connections.map((c) => (
              <li className="chip glass" key={c}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta glass">
            <h2>Essayez Néron en ligne.</h2>
            <p className="lead">
              Connectez-vous avec Apple, Google ou un code reçu par e-mail.
            </p>
            <a href={loginUrl} className="btn btn-solid">
              Se connecter
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
