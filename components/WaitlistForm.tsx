'use client';

import { useRef, useState } from 'react';
import siteData from '@/lib/site-data';

const MIN_DELAY_MS = 2500;

type Tone = 'info' | 'success' | 'error';

/**
 * Formulaire de liste d'attente — Néron Box.
 * Contrat détaillé dans docs/liste-attente.md.
 * Anti-spam sans tiers : champ honeypot + délai minimal de soumission.
 * Aucune donnée n'est stockée côté navigateur (pas de localStorage, pas de cookie).
 */
export default function WaitlistForm() {
  const [status, setStatus] = useState<{ message: string; tone: Tone } | null>(null);
  const [busy, setBusy] = useState(false);
  const loadedAt = useRef(Date.now());
  const endpoint = siteData.liste_attente.endpoint;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim() ?? '';
    const profile = (form.elements.namedItem('profile') as RadioNodeList)?.value ?? '';
    const consent = (form.elements.namedItem('consent') as HTMLInputElement)?.checked ?? false;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value ?? '';

    // Honeypot rempli ou soumission trop rapide : probable robot, on ignore silencieusement.
    if (honeypot || Date.now() - loadedAt.current < MIN_DELAY_MS) {
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ message: 'Merci de renseigner une adresse email valide.', tone: 'error' });
      (form.elements.namedItem('email') as HTMLInputElement)?.focus();
      return;
    }

    if (!consent) {
      setStatus({
        message: 'Merci de cocher la case de consentement pour être recontacté(e).',
        tone: 'error',
      });
      return;
    }

    if (!endpoint) {
      setStatus({
        message: 'La liste d’attente n’est pas encore connectée. Merci de réessayer plus tard.',
        tone: 'error',
      });
      return;
    }

    setBusy(true);
    setStatus({ message: 'Envoi en cours…', tone: 'info' });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, profile, consent: true }),
      });
      setBusy(false);
      if (response.status === 202) {
        setStatus({
          message: 'Merci ! Vous êtes inscrit(e) à la liste d’attente de la Néron Box.',
          tone: 'success',
        });
        form.reset();
      } else if (response.status === 400) {
        setStatus({
          message: 'Les informations envoyées sont invalides. Merci de vérifier votre email.',
          tone: 'error',
        });
      } else if (response.status === 429) {
        setStatus({ message: 'Trop de tentatives. Merci de réessayer dans quelques minutes.', tone: 'error' });
      } else {
        setStatus({ message: 'Une erreur est survenue. Merci de réessayer plus tard.', tone: 'error' });
      }
    } catch {
      setBusy(false);
      setStatus({
        message: 'Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.',
        tone: 'error',
      });
    }
  }

  return (
    <form
      className="form"
      noValidate
      onSubmit={handleSubmit}
      action={endpoint ?? undefined}
      method={endpoint ? 'POST' : undefined}
    >
      <div className="field">
        <label htmlFor="waitlist-email">Adresse email</label>
        <input type="email" id="waitlist-email" name="email" autoComplete="email" required aria-required="true" />
      </div>

      <fieldset className="field fieldset-reset">
        <legend className="field-legend">Vous êtes</legend>
        <div className="radio-row">
          <span className="radio-option">
            <input type="radio" id="profile-particulier" name="profile" value="particulier" defaultChecked />
            <label htmlFor="profile-particulier">Un particulier</label>
          </span>
          <span className="radio-option">
            <input type="radio" id="profile-professionnel" name="profile" value="professionnel" />
            <label htmlFor="profile-professionnel">Un professionnel</label>
          </span>
        </div>
      </fieldset>

      {/* Honeypot anti-spam : champ invisible que seuls les robots remplissent */}
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="waitlist-website">Ne pas remplir ce champ</label>
        <input type="text" id="waitlist-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="checkbox-row">
        <input type="checkbox" id="waitlist-consent" name="consent" required aria-required="true" />
        <label htmlFor="waitlist-consent">
          J&apos;accepte d&apos;être recontacté(e) au sujet de la Néron Box. Je peux me désinscrire à
          tout moment.
        </label>
      </div>

      <button type="submit" className="btn btn-solid" disabled={busy}>
        Rejoindre la liste d&apos;attente
      </button>

      <div className="form-status" role="status" aria-live="polite" data-tone={status?.tone}>
        {status?.message}
      </div>
    </form>
  );
}
