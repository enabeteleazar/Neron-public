export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-code" aria-hidden="true">
        404
      </div>
      <h1 className="h1-404">Page introuvable</h1>
      <p className="lead">Cette page n&apos;existe pas ou a été déplacée.</p>
      <a href="/" className="btn btn-solid">
        Retour à l&apos;accueil
      </a>
    </div>
  );
}
