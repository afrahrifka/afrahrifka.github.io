import siteContent from './content.json';

const contentByKey = new Map(siteContent.fields.map(field => [field.key, field]));
let language = 'id';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function contentValue(key, lang = language) {
  const field = contentByKey.get(key);
  return field?.[lang] ?? field?.id ?? '';
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-copy-key]').forEach(element => {
    element.textContent = contentValue(element.dataset.copyKey);
  });
  document.querySelectorAll('[data-content-title]').forEach(element => {
    document.title = contentValue(element.dataset.contentTitle);
  });
  document.querySelectorAll('[data-content-src]').forEach(element => {
    element.setAttribute('src', contentValue(element.dataset.contentSrc, 'id'));
  });
  document.querySelectorAll('[data-content-href]').forEach(element => {
    element.setAttribute('href', contentValue(element.dataset.contentHref, 'id'));
  });
  document.querySelectorAll('[data-content-download]').forEach(element => {
    element.setAttribute('download', contentValue(element.dataset.contentDownload, 'id'));
  });
  document.querySelectorAll('[data-content-alt]').forEach(element => {
    element.setAttribute('alt', contentValue(element.dataset.contentAlt));
  });
  document.querySelectorAll('[data-content-aria-label]').forEach(element => {
    element.setAttribute('aria-label', contentValue(element.dataset.contentAriaLabel));
  });
  document.querySelectorAll('[data-content-content]').forEach(element => {
    element.setAttribute('content', contentValue(element.dataset.contentContent));
  });
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === next));
  });
  menuButton.setAttribute('aria-label', contentValue(menuButton.getAttribute('aria-expanded') === 'true' ? 'ui-menu-close' : 'ui-menu-open'));
  try { localStorage.setItem('portfolio-language', next); } catch {}
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', contentValue('ui-menu-open'));
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-label', contentValue(open ? 'ui-menu-close' : 'ui-menu-open'));
});
 navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
 document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-ready');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
}

const petalContainer = document.querySelector('.petals');
for (let i = 0; i < 12; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = `${9 + (i * 17) % 92}%`;
  petal.style.animationDuration = `${12 + i % 7}s`;
  petal.style.animationDelay = `${-i * 2.3}s`;
  petal.style.width = `${6 + i % 5}px`;
  petalContainer.append(petal);
}
const parallaxElements = [...document.querySelectorAll('[data-parallax]')];
let scheduled = false;
function updateScroll() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector('.scroll-progress').style.width = `${scrollRange > 0 ? window.scrollY / scrollRange * 100 : 0}%`;
  if (!reducedMotion.matches) parallaxElements.forEach(element => {
    const section = element.closest('section');
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    if (bounds.bottom >= -200 && bounds.top <= window.innerHeight + 200) element.style.transform = `translate3d(0,${-bounds.top * Number(element.dataset.parallax)}px,0)`;
  });
  scheduled = false;
}
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) parallaxElements.forEach(element => element.style.removeProperty('transform')); updateScroll(); });
updateScroll();

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('selected', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('.work-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) card.classList.add('visible');
  });
}));

const dialog = document.querySelector('#work-dialog');
let lastCard;
document.querySelectorAll('[data-detail]').forEach(card => card.addEventListener('click', () => {
  const detail = siteContent.details[card.dataset.detail]?.[language] || siteContent.details[card.dataset.detail]?.id;
  if (!detail) return;
  const source = card.querySelector('img');
  const picture = document.querySelector('#dialog-image');
  picture.src = source.src;
  picture.alt = source.alt;
  document.querySelector('#dialog-label').textContent = detail.label;
  document.querySelector('#dialog-title').textContent = detail.title;
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  document.querySelector('#dialog-description').textContent = detail.description;
  document.querySelector('#dialog-tags').replaceChildren(...detail.tags.map(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    return span;
  }));
  lastCard = card;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastCard?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let initialLanguage = 'id';
try { if (localStorage.getItem('portfolio-language') === 'en') initialLanguage = 'en'; } catch {}
setLanguage(initialLanguage);
