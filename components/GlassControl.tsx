'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'neron-tint';
const MIN_STEP = 0;
const MAX_STEP = 5;
const DEFAULT_STEP = 2;

/**
 * Curseur de teinte du verre — de « ultra clair » à « entièrement teinté »,
 * par paliers discrets (attribut data-tint sur <html>, voir globals.css)
 * plutôt qu'une valeur continue en style inline, incompatible avec la CSP
 * (style-src 'self' sans 'unsafe-inline').
 * Préférence par appareil uniquement (localStorage), jamais partagée ni lue
 * par le serveur. Respecte prefers-reduced-transparency (voir globals.css),
 * que ce curseur ne peut pas contredire.
 */
export default function GlassControl() {
  const [step, setStep] = useState(DEFAULT_STEP);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!Number.isNaN(parsed) && parsed >= MIN_STEP && parsed <= MAX_STEP) {
          setStep(parsed);
        }
      }
    } catch {
      // localStorage indisponible (navigation privée, etc.) — on garde la valeur par défaut.
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-tint', String(step));
    try {
      window.localStorage.setItem(STORAGE_KEY, String(step));
    } catch {
      // rien à faire si le stockage est indisponible
    }
  }, [step]);

  return (
    <div className="control glass rise rise-4">
      <label htmlFor="tint-range">Verre</label>
      <input
        id="tint-range"
        type="range"
        min={MIN_STEP}
        max={MAX_STEP}
        step={1}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        aria-label="Réglage de la teinte du verre, de clair à teinté"
      />
    </div>
  );
}
