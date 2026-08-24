// Mobile navigation toggle
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open');
  });

  // Close menu when a nav link is clicked
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}
