'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks, loginUrl } from '@/lib/config';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Comme sur iOS 27 : quand le contenu passe sous la barre, un bord
          uniforme apparaît en haut pour garder le texte lisible. */}
      <div className="scroll-edge" data-on={scrolled} aria-hidden="true" />
      <header className="nav">
        <nav className="nav-pill glass" aria-label="Navigation principale">
          <a href="/" className="brand">
            Néron
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href={loginUrl} className="btn btn-solid btn-sm">
            Se connecter
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bars" aria-hidden="true" />
          </button>
        </nav>
      </header>
      {open && (
        <div id="nav-sheet" className="nav-sheet glass" role="menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
