// WRM Lab – shared nav utility for project pages
// The home page (index.html) uses inline nav HTML.
// This script is called by the pages/ subpages via buildNav().

const NAV_ITEMS = [
  { label: 'Home',            href: '../index.html',           id: 'home' },
  { label: '01 Pyromes',      href: '01-pyrogeography.html',   id: '01-pyrogeography' },
  { label: '02 Fire Weather', href: '02-fire-weather.html',    id: '02-fire-weather' },
  { label: '03 Korea 2025',   href: '03-extreme-fires.html',   id: '03-extreme-fires' },
  { label: '04 Simulations',  href: '04-simulations.html',     id: '04-simulations' },
  { label: '05 Risk Networks',href: '05-risk-networks.html',   id: '05-risk-networks' },
  { label: '06 Responsibility',href: '06-responsibility.html', id: '06-responsibility' },
];

function buildNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Build hamburger button if not present
  if (!nav.querySelector('.nav-hamburger')) {
    const btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.id = 'navHamburger';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.innerHTML = '&#9776;';
    nav.appendChild(btn);
    btn.addEventListener('click', function() {
      nav.classList.toggle('nav-open');
    });
  }

  const list = nav.querySelector('.nav-links');
  if (!list) return;
  list.innerHTML = '';

  NAV_ITEMS.forEach(function(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.id === 'home' ? '../index.html' : item.href;
    a.textContent = item.label;
    if (item.id === activePage) a.classList.add('active');
    li.appendChild(a);
    list.appendChild(li);
  });
}
