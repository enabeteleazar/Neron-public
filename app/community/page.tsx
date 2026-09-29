import type { Metadata } from 'next';
import Placeholder from '@/components/Placeholder';
import StatusBadge from '@/components/StatusBadge';
import siteData from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Néron Community',
  description:
    "Néron Community : assistant IA 100% local, installable en une commande. Génération précédente de Néron, en maintenance limitée.",
  alternates: { canonical: '/community' },
};

const features = [
  {
    title: 'LLM local via Ollama',
    body: 'Llama, Mistral, Gemma — choisissez votre modèle. Aucune API externe, aucune latence réseau, zéro frais.',
  },
  {
    title: 'Mémoire persistante',
    body: 'SQLite embarqué. Néron se souvient de vos conversations, préférences et contexte au fil du temps.',
  },
  {
    title: 'Interface Telegram',
    body: "L'IA, la mémoire et vos données tournent chez vous ; Telegram reste un service tiers, par lequel vos messages transitent pour vous atteindre.",
  },
  {
    title: 'Service systemd',
    body: 'Démarre automatiquement au boot, redémarre en cas de crash.',
  },
];

export default function CommunityPage() {
  const info = siteData.neron_community;

  return (
    <>
      <section className="hero hero-compact">
        <div className="hero-inner hero-inner-narrow">
          <span className="eyebrow">// néron community</span>
          <StatusBadge status="disponible" label="Disponible, gratuit" />
          <h1 className="h1-sub">100&nbsp;% local. Chez vous. Une commande.</h1>
          <p className="lead lead-narrow">
            Néron Community est la version gratuite de Néron : elle tourne
            entièrement sur votre machine. C&apos;est la génération
            précédente de Néron — le développement actif se poursuit
            ailleurs.{' '}
            <Placeholder
              value={info.rythme_maintenance}
              fallback="Les mises à jour de cette version sont donc moins fréquentes. [À CONFIRMER]"
            />
          </p>
          <div className="actions">
            <a href="#install" className="btn btn-solid">
              Installer Néron Community
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Tout ce dont vous avez besoin.</h2>
            <p className="lead">
              Une architecture modulaire pensée pour tourner sur du
              matériel humble.
            </p>
          </div>
          <div className="panels panels-tight">
            {features.map((f) => (
              <div className="glass feature-mini" key={f.title}>
                <h3>{f.title}</h3>
                <p className="body body-full">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="install">
        <div className="wrap-narrow">
          <div className="section-head align-start">
            <h2>Prêt en une commande.</h2>
            <p className="lead">
              Un script bootstrap s&apos;occupe de tout — dépendances,
              Ollama, modèle, service systemd.
            </p>
          </div>
          <div className="code-block glass">
            <div>
              <span className="code-comment"># Installation one-liner</span>
            </div>
            <div>
              <span className="prompt">$</span>{' '}
              <span className={info.commande_installation ? 'cmd' : 'cmd placeholder'}>
                <Placeholder
                  value={info.commande_installation}
                  fallback="curl -fsSL [À CONFIRMER : URL d'installation] | bash"
                />
              </span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="code-ok">✔</span> RAM&nbsp;: 3816MB OK
            </div>
            <div>
              <span className="code-ok">✔</span> Dépendances OK
            </div>
            <div>
              <span className="code-ok">✔</span> Ollama installé
            </div>
            <div>
              <span className="code-ok">✔</span> Fichiers installés → /etc/neron
            </div>
            <div>
              <span className="code-ok">✔</span> Service systemd activé
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="code-ok">✅ Installation terminée !</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="code-comment"># Démarrage</span>
            </div>
            <div>
              <span className="prompt">$</span> <span className="cmd">make -C /etc/neron start</span>
            </div>
            <div>
              <span className="code-ok">✔</span> Néron démarré
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta glass">
            <div className="chat-head chat-head-center">
              <span className="dot" />
              Néron — Telegram
            </div>
            <div className="chat-demo">
              <p className="bubble me">Bonjour Néron, quelle heure est-il ?</p>
              <p className="bubble">Il est 14h32. Puis-je vous aider avec autre chose ?</p>
              <p className="bubble me">/status</p>
              <p className="bubble">🖥 CPU : 12% · 💾 RAM : 34% · 🦙 Ollama : actif · ✅ Tout fonctionne</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
