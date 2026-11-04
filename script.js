const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const whatsappForm = document.querySelector('#whatsapp-form');

whatsappForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(whatsappForm);
  const name = data.get('name');
  const phone = data.get('phone');
  const service = data.get('service');
  const message = data.get('message');
  const text = `Bună ziua! Mă numesc ${name} și sunt interesată de ${service}.${phone ? ` Numărul meu este ${phone}.` : ''}${message ? ` Mesaj: ${message}` : ''}`;
  window.open(`https://wa.me/40755331403?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

const galleryItems = [...document.querySelectorAll('.portfolio-item[data-category]')];
const galleryFilters = [...document.querySelectorAll('.gallery-filter')];
const galleryMore = document.querySelector('.gallery-more');
let activeCategory = 'all';
let visibleLimit = 15;

const renderGallery = () => {
  const matchingItems = galleryItems.filter((item) => activeCategory === 'all' || item.dataset.category === activeCategory);
  galleryItems.forEach((item) => { item.hidden = true; });
  matchingItems.forEach((item, index) => { item.hidden = index >= visibleLimit; });
  if (galleryMore) galleryMore.hidden = visibleLimit >= matchingItems.length;
};

galleryFilters.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    visibleLimit = activeCategory === 'all' ? 15 : Number.POSITIVE_INFINITY;
    galleryFilters.forEach((filter) => filter.classList.toggle('active', filter === button));
    renderGallery();
  });
});

galleryMore?.addEventListener('click', () => {
  visibleLimit += 9;
  renderGallery();
});

if (galleryItems.length) renderGallery();

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
};

document.querySelectorAll('.gallery-open').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    if (!lightbox || !lightboxImage || !image) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
});
