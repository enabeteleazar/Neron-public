/**
 * Composant commun header/footer.
 * Construit le DOM directement (pas d'innerHTML) à partir de js/config.js,
 * pour que le nom de domaine, les statuts et les libellés restent centralisés.
 * S'exécute en tant que script différé : le HTML est déjà analysé,
 * donc pas besoin d'attendre DOMContentLoaded.
 */
(function () {
  'use strict';

  const cfg = window.NERON_CONFIG;
  if (!cfg) return;

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach((key) => {
        if (key === 'text') {
          node.textContent = props[key];
        } else if (key === 'aria') {
          Object.keys(props.aria).forEach((a) => node.setAttribute('aria-' + a, props.aria[a]));
        } else {
          node.setAttribute(key, props[key]);
        }
      });
    }
    (children || []).forEach((child) => node.appendChild(child));
    return node;
  }

  function renderHeader() {
    const mount = document.getElementById('site-header');
    if (!mount) return;

    const activeHref = document.body.getAttribute('data-page') || '';

    const dot = el('span', { 'aria-hidden': 'true', text: '.' });
    const logo = el('a', { href: 'index.html', class: 'nav-logo', 'aria-label': cfg.site.name + ' — Accueil' });
    logo.appendChild(document.createTextNode(cfg.site.name));
    logo.appendChild(dot);

    const toggle = el('button', {
      type: 'button',
      class: 'nav-toggle',
      'aria-expanded': 'false',
      'aria-controls': 'nav-menu',
      'aria-label': 'Ouvrir le menu',
    }, [el('span'), el('span'), el('span')]);

    const menu = el('ul', { class: 'nav-links', id: 'nav-menu', role: 'list' });

    cfg.nav.forEach((item) => {
      const a = el('a', { href: item.href, text: item.label });
      if (item.href === activeHref) a.setAttribute('aria-current', 'page');
      menu.appendChild(el('li', {}, [a]));
    });

    const loginA = el('a', {
      href: cfg.app.domain + cfg.app.loginPath,
      class: 'nav-cta',
      text: 'Se connecter',
    });
    menu.appendChild(el('li', {}, [loginA]));

    const nav = el('nav', { 'aria-label': 'Navigation principale' }, [logo, toggle, menu]);
    mount.appendChild(nav);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;

    const logo = el('span', { class: 'footer-logo', text: cfg.site.name });
    const desc = el('p', {
      class: 'footer-desc',
      text: 'Trois façons d’utiliser Néron : en ligne, en local avec Néron Community, ou bientôt avec la Néron Box.',
    });

    const linkList = [
      { label: 'Accueil', href: 'index.html' },
      { label: cfg.products.online.name, href: cfg.products.online.page },
      { label: cfg.products.community.name, href: cfg.products.community.page },
      { label: cfg.products.box.name, href: cfg.products.box.page },
      { label: 'Code source', href: cfg.github.repoUrl, external: true },
    ].concat(cfg.legal);

    const ul = el('ul', { class: 'footer-links', role: 'list' });
    linkList.forEach((item) => {
      const props = { href: item.href, text: item.label };
      if (item.external) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      }
      ul.appendChild(el('li', {}, [el('a', props)]));
    });

    const footNav = el('nav', { 'aria-label': 'Liens du pied de page' }, [ul]);
    const copy = el('p', {
      class: 'footer-copy',
      text: '© ' + new Date().getFullYear() + ' ' + cfg.site.name,
    });

    mount.appendChild(logo);
    mount.appendChild(desc);
    mount.appendChild(footNav);
    mount.appendChild(copy);
  }

  function applyProductBindings() {
    // Permet de changer un statut ("bientôt" → "disponible") en un seul
    // endroit (js/config.js) sans toucher au HTML de chaque page.
    document.querySelectorAll('[data-status-for]').forEach((node) => {
      const product = cfg.products[node.getAttribute('data-status-for')];
      if (!product) return;
      node.textContent = product.statusLabel;
      node.className = 'badge-status badge-status--' + product.status;
    });

    document.querySelectorAll('[data-product-name-for]').forEach((node) => {
      const product = cfg.products[node.getAttribute('data-product-name-for')];
      if (product) node.textContent = product.name;
    });

    document.querySelectorAll('[data-app-login]').forEach((node) => {
      node.setAttribute('href', cfg.app.domain + cfg.app.loginPath);
    });

    document.querySelectorAll('[data-app-signup]').forEach((node) => {
      node.setAttribute('href', cfg.app.domain + cfg.app.signupPath);
    });

    document.querySelectorAll('[data-github-repo]').forEach((node) => {
      node.setAttribute('href', cfg.github.repoUrl);
    });

    document.querySelectorAll('[data-github-install-script]').forEach((node) => {
      node.setAttribute('href', cfg.github.installScriptUrl);
    });

    document.querySelectorAll('[data-github-community-tag]').forEach((node) => {
      node.setAttribute('href', cfg.github.communityTagUrl);
    });

    document.querySelectorAll('[data-install-command]').forEach((node) => {
      node.textContent = cfg.github.installCommand;
    });

    document.querySelectorAll('[data-community-maintenance]').forEach((node) => {
      node.textContent = cfg.products.community.maintenanceNote;
    });

    document.querySelectorAll('[data-online-primary-cta]').forEach((node) => {
      const product = cfg.products.online;
      if (product.status === 'disponible') {
        node.setAttribute('href', cfg.app.domain + cfg.app.signupPath);
        node.textContent = 'Créer un compte';
        node.removeAttribute('aria-disabled');
        node.classList.remove('is-disabled');
      } else {
        node.textContent = product.statusLabel;
        node.setAttribute('aria-disabled', 'true');
        node.removeAttribute('href');
        node.classList.add('is-disabled');
      }
    });
  }

  renderHeader();
  renderFooter();
  applyProductBindings();
})();
