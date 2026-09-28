/**
 * Formulaire de liste d'attente — Néron Box.
 * Contrat détaillé dans docs/liste-attente.md.
 * Anti-spam sans tiers : champ honeypot + délai minimal de soumission.
 * Aucune donnée n'est stockée côté navigateur (pas de localStorage, pas de cookie).
 */
(function () {
  'use strict';

  const form = document.getElementById('waitlist-form');
  if (!form) return;

  const cfg = window.NERON_CONFIG;
  const endpoint = cfg && cfg.waitlist ? cfg.waitlist.endpoint : null;
  const statusEl = document.getElementById('waitlist-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const loadedAt = Date.now();
  const MIN_DELAY_MS = 2500;

  if (endpoint) {
    form.setAttribute('action', endpoint);
    form.setAttribute('method', 'POST');
  }

  function announce(message, tone) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.tone = tone || 'info';
  }

  function setBusy(isBusy) {
    if (submitBtn) submitBtn.disabled = isBusy;
    form.setAttribute('aria-busy', String(isBusy));
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = form.elements['email'] ? form.elements['email'].value.trim() : '';
    const profile = form.elements['profile'] ? form.elements['profile'].value : '';
    const consent = form.elements['consent'] ? form.elements['consent'].checked : false;
    const honeypot = form.elements['website'] ? form.elements['website'].value : '';

    // Honeypot rempli ou soumission trop rapide : probable robot, on ignore silencieusement.
    if (honeypot || Date.now() - loadedAt < MIN_DELAY_MS) {
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      announce('Merci de renseigner une adresse email valide.', 'error');
      form.elements['email'] && form.elements['email'].focus();
      return;
    }

    if (!consent) {
      announce('Merci de cocher la case de consentement pour être recontacté(e).', 'error');
      return;
    }

    if (!endpoint) {
      announce(
        'La liste d’attente n’est pas encore connectée. Merci de réessayer plus tard.',
        'error'
      );
      return;
    }

    setBusy(true);
    announce('Envoi en cours…', 'info');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, profile: profile, consent: true }),
    })
      .then(function (response) {
        setBusy(false);
        if (response.status === 202) {
          announce('Merci ! Vous êtes inscrit(e) à la liste d’attente de la Néron Box.', 'success');
          form.reset();
        } else if (response.status === 400) {
          announce('Les informations envoyées sont invalides. Merci de vérifier votre email.', 'error');
        } else if (response.status === 429) {
          announce('Trop de tentatives. Merci de réessayer dans quelques minutes.', 'error');
        } else {
          announce('Une erreur est survenue. Merci de réessayer plus tard.', 'error');
        }
      })
      .catch(function () {
        setBusy(false);
        announce('Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.', 'error');
      });
  });
})();
