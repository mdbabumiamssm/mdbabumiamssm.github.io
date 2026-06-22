/**
 * MD Babu Mia - Professional Portfolio
 * Main JavaScript File
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initTypingEffect();
  initMobileNav();
  initSmoothScroll();
  initScrollAnimations();
  initCounterAnimations();
  initSkillBarAnimations();
  initHeaderScroll();
  initActiveNavLink();
  initParticles();
});

// ============================================
// Year in Footer
// ============================================
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ============================================
// Typing Effect for Hero Title
// ============================================
function initTypingEffect() {
  const typedElement = document.getElementById('typed-text');
  if (!typedElement) return;

  const titles = [
    'Biomedical AI Researcher',
    'Assistant Professor',
    'Machine Learning Engineer',
    'Single-Cell Genomics Expert',
    'Clinical AI Developer',
    'USDL Architect'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after initial animations
  setTimeout(type, 1500);
}

// ============================================
// Mobile Navigation
// ============================================
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const links = document.querySelectorAll('.nav__links a');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    menu.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Scroll Reveal Animations
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(`
    .about__text,
    .about__card,
    .research-card,
    .project-card,
    .launch-card,
    .publication-card,
    .skill-category,
    .timeline__item,
    .roadmap-card,
    .contact-item,
    .social-card
  `);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach((el, index) => {
    el.classList.add('pre-animate');
    el.style.transitionDelay = `${index % 6 * 0.1}s`;
    observer.observe(el);
  });
}

// ============================================
// Counter Animations
// ============================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-target]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * easeOut);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// Skill Bar Animations
// ============================================
function initSkillBarAnimations() {
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = `${width}%`;
          }, 200);
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// Active Navigation Link
// ============================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

// ============================================
// Particle Background (Simple CSS-based)
// ============================================
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(77, 246, 255, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
      animation-delay: ${Math.random() * -20}s;
    `;
    container.appendChild(particle);
  }

  // Add particle animation to page
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Utility: Debounce Function
// ============================================
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// Utility: Throttle Function
// ============================================
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// Console Welcome Message
// ============================================
console.log(`
%c MD Babu Mia - Portfolio
%c Biomedical AI Researcher | Mount Sinai
%c https://github.com/mdbabumiamssm

`,
'color: #4df6ff; font-size: 20px; font-weight: bold;',
'color: #9966ff; font-size: 14px;',
'color: #888; font-size: 12px;'
);

// ============================================
// Live GitHub Sync
// Keeps hero stats and the Projects grid in sync with github.com on every
// page load. Pure client-side: no build step, no automation, nothing that
// can overwrite the site. If the API is unreachable or rate-limited, the
// static fallback content already in the HTML is left untouched.
// ============================================
const GH_USER = 'mdbabumiamssm';

document.addEventListener('DOMContentLoaded', () => {
  initGitHubSync();
});

async function initGitHubSync() {
  try {
    const [user, repos] = await Promise.all([
      ghFetch(`https://api.github.com/users/${GH_USER}`),
      fetchAllRepos(GH_USER),
    ]);
    updateHeroStats(user, repos);
    renderProjects(repos);
    updateRepoCount(user.public_repos);
  } catch (err) {
    console.warn('GitHub live sync unavailable; keeping cached content.', err);
  }
}

function ghFetch(url) {
  return fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json();
    });
}

async function fetchAllRepos(user) {
  let page = 1;
  let all = [];
  let batch;
  do {
    batch = await ghFetch(
      `https://api.github.com/users/${user}/repos?per_page=100&type=owner&sort=pushed&page=${page}`
    );
    all = all.concat(batch);
    page += 1;
  } while (batch.length === 100 && page <= 3);
  return all;
}

function updateHeroStats(user, repos) {
  const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  setStatByLabel('repositories', user.public_repos);
  setStatByLabel('github stars', stars);
  setStatByLabel('followers', user.followers);
}

function setStatByLabel(label, value) {
  if (value == null) return;
  document.querySelectorAll('.mini-stat').forEach(stat => {
    const lbl = stat.querySelector('.mini-stat__label');
    const val = stat.querySelector('.mini-stat__value');
    if (lbl && val && lbl.textContent.trim().toLowerCase() === label) {
      val.dataset.target = value;
      animateCounter(val, value);
    }
  });
}

function renderProjects(repos) {
  const grid = document.querySelector('.projects__grid');
  if (!grid) return;
  const featured = repos
    .filter(r => !r.fork && !r.archived && !/\.github\.io$/.test(r.name))
    .sort((a, b) =>
      (b.stargazers_count - a.stargazers_count) ||
      (new Date(b.pushed_at) - new Date(a.pushed_at))
    )
    .slice(0, 6);
  if (!featured.length) return; // keep static fallback cards
  grid.innerHTML = featured.map((repo, i) => projectCard(repo, i === 0)).join('');

  const subtitle = document.querySelector('.projects .section-subtitle');
  if (subtitle) subtitle.textContent = 'Top repositories, synced live from GitHub';
}

function projectCard(repo, isFeatured) {
  const tech = [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 3);
  const desc = repo.description || 'Open-source project by MD Babu Mia, PhD.';
  const badges = [
    isFeatured ? '<span class="badge badge--featured">Featured</span>' : '',
    repo.stargazers_count > 0
      ? `<span class="badge badge--stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>`
      : '',
  ].join('');
  const techTags = tech.map(t => `<span>${escapeHtml(t)}</span>`).join('') +
    `<span><i class="fas fa-clock"></i> ${relativeTime(repo.pushed_at)}</span>`;
  const homepage = repo.homepage
    ? `<a href="${encodeURI(repo.homepage)}" target="_blank" rel="noreferrer"><i class="fas fa-external-link-alt"></i> Live</a>`
    : '';
  return `
          <article class="project-card${isFeatured ? ' project-card--featured' : ''}">
            <div class="project-card__header">
              <div class="project-card__icon"><i class="${languageIcon(repo.language)}"></i></div>
              <div class="project-card__badges">${badges}</div>
            </div>
            <h3>${escapeHtml(repo.name)}</h3>
            <p>${escapeHtml(desc)}</p>
            <div class="project-card__tech">${techTags}</div>
            <div class="project-card__links">
              <a href="${repo.html_url}" target="_blank" rel="noreferrer"><i class="fab fa-github"></i> View Repository</a>
              ${homepage}
            </div>
          </article>`;
}

function updateRepoCount(count) {
  if (!count) return;
  const cta = document.querySelector('.projects__cta .btn');
  if (cta) cta.innerHTML = `<i class="fab fa-github"></i> View All ${count} Repositories`;
}

function languageIcon(lang) {
  const map = {
    Python: 'fab fa-python',
    'Jupyter Notebook': 'fas fa-book-open',
    JavaScript: 'fab fa-js',
    TypeScript: 'fab fa-js',
    HTML: 'fab fa-html5',
    CSS: 'fab fa-css3-alt',
    Shell: 'fas fa-terminal',
    Rust: 'fas fa-gears',
    R: 'fas fa-chart-line',
    Mermaid: 'fas fa-diagram-project',
  };
  return map[lang] || 'fas fa-code-branch';
}

function relativeTime(iso) {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'updated today';
  if (days === 1) return 'updated yesterday';
  if (days < 30) return `updated ${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `updated ${months}mo ago`;
  return `updated ${Math.floor(months / 12)}y ago`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
