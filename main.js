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
  
  // 1. Existing Intersection Observer for sub-page scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.animationPlayState = 'running';
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // 2. Slider Logic for the Home Page
  const slider = document.getElementById('slider');
  if (slider) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlide = document.getElementById('currentSlide');
    
    let slideWidth = slider.clientWidth;
    
    // Update width on screen resize to keep snaps accurate
    window.addEventListener('resize', () => {
      slideWidth = slider.clientWidth;
    });

    // Update the [ 00 / 06 ] counter
    const updateCounter = () => {
      const index = Math.round(slider.scrollLeft / slideWidth);
      currentSlide.textContent = index === 0 ? "00" : "0" + index;
    };

    // Listen to touch/scroll swipes
    slider.addEventListener('scroll', () => {
      clearTimeout(slider.scrollTimeout);
      slider.scrollTimeout = setTimeout(updateCounter, 50);
    });

    // Arrow Button Controls
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
  }
});