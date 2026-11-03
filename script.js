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
