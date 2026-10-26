// Interactions légères : apparition des sections, navigation mobile et formulaire de démonstration.
const nav = document.querySelector('#site-nav');
const menuButton = document.querySelector('.menu-toggle');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

const scrollLine = document.querySelector('.scroll-line');
let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollLine.style.width = `${maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0}%`;
    scheduled = false;
  });
}, { passive: true });

const form = document.querySelector('#signup-form');
const feedback = document.querySelector('#form-feedback');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  feedback.textContent = 'Merci pour votre intérêt ! Ceci est une démonstration : aucune inscription réelle n’a été effectuée.';
  form.reset();
});
