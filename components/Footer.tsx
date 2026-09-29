import { products, legalLinks, site } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-brand">{site.name}</p>
      <p className="footer-desc">
        Trois façons d&apos;utiliser Néron : en ligne, en local avec Néron
        Community, ou bientôt avec la Néron Box.
      </p>
      <ul className="footer-links">
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href={products.online.page}>{products.online.name}</a>
        </li>
        <li>
          <a href={products.community.page}>{products.community.name}</a>
        </li>
        <li>
          <a href={products.box.page}>{products.box.name}</a>
        </li>
        {legalLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <p className="footer-copy">
        © {year} {site.name}
      </p>
    </footer>
  );
}
