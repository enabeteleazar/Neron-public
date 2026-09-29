'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export type CarouselSlide = {
  id: string;
  label: string;
  glowClass: string;
  content: ReactNode;
};

/**
 * Un seul panneau visible à la fois, défilement horizontal entre les
 * trois offres. S'appuie sur le scroll-snap natif (swipe tactile, molette
 * horizontale et défilement au clavier gratuits, sans dépendance externe)
 * — le JS ne sert qu'à synchroniser les boutons/points avec la position
 * réellement affichée.
 */
export default function OfferCarousel({ slides }: { slides: CarouselSlide[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slideEls = Array.from(viewport.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best
        );
        if (mostVisible.intersectionRatio > 0.6) {
          setActive(slideEls.indexOf(mostVisible.target as HTMLElement));
        }
      },
      { root: viewport, threshold: [0.6, 0.9] }
    );

    slideEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // React 18 ne sérialise pas encore la prop JSX `inert` (ajouté dans React
  // 19) : on la pose nous-mêmes sur le vrai nœud DOM, pour exclure les
  // panneaux hors écran du clavier et des lecteurs d'écran sans les cacher
  // visuellement (nécessaire pendant le défilement, où les deux panneaux
  // voisins restent visibles un instant).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    Array.from(viewport.children).forEach((el, i) => {
      (el as HTMLElement & { inert: boolean }).inert = i !== active;
    });
  }, [active]);

  function goTo(index: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const target = viewport.children[index] as HTMLElement | undefined;
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }

  return (
    <div className="carousel">
      <div
        className="carousel-viewport"
        ref={viewportRef}
        role="group"
        aria-roledescription="carrousel"
        aria-label="Les trois offres Néron"
      >
        {slides.map((slide, i) => (
          <div
            className={`carousel-slide ${slide.glowClass}`}
            key={slide.id}
            id={`offre-${slide.id}`}
            aria-hidden={i !== active}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Offre précédente"
        >
          ‹
        </button>

        <div className="carousel-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className="carousel-dot"
              aria-current={i === active ? 'true' : undefined}
              aria-label={`Aller à l’offre ${slide.label}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow"
          onClick={() => goTo(active + 1)}
          disabled={active === slides.length - 1}
          aria-label="Offre suivante"
        >
          ›
        </button>
      </div>
    </div>
  );
}
