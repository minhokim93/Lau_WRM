// Shared navigation and utilities

const NAV_LINKS = [
  { href: '../index.html', label: 'Home' },
  { href: '01-pyrogeography.html', label: '01 Pyromes' },
  { href: '02-fire-weather.html', label: '02 Fire Weather' },
  { href: '03-extreme-fires.html', label: '03 Korea 2025' },
  { href: '04-simulations.html', label: '04 Simulations' },
  { href: '05-risk-networks.html', label: '05 Risk Networks' },
  { href: '06-responsibility.html', label: '06 Responsibility' },
];

function buildNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  
  const logo = nav.querySelector('.nav-logo');
  const list = nav.querySelector('.nav-links');
  if (!list) return;

  const prefix = activePage === 'home' ? 'pages/' : '';
  const homeHref = activePage === 'home' ? '#' : '../index.html';

  NAV_LINKS.forEach((link, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const href = activePage === 'home' ? `pages/${link.href.replace('../', '')}` : link.href;
    a.href = i === 0 ? homeHref : href;
    a.textContent = link.label;
    if ((activePage === 'home' && i === 0) || link.href.includes(activePage)) {
      a.classList.add('active');
    }
    li.appendChild(a);
    list.appendChild(li);
  });
}

// Intersection observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.animationPlayState = 'running';
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.animationPlayState = 'paused';
    el.classList.add('animate-in');
    observer.observe(el);
  });
});
