
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let currentId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navAnchors.forEach(anchor => {
    anchor.classList.remove('active');
    if (anchor.getAttribute('href') === '#' + currentId) {
      anchor.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav(); // Run once on load

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 12px rgba(12,35,64,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('form-msg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show success message
  formMsg.style.display = 'block';

  // Reset the form
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    formMsg.style.display = 'none';
  }, 5000);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Elements to animate
const animatedEls = document.querySelectorAll(
  '.course-card, .member-card, .news-card, .project-card, .pillar, .stat-box'
);

animatedEls.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
  fadeObserver.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
