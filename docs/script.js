// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme on load
initTheme();

// Theme toggle buttons
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('mobileThemeToggle')?.addEventListener('click', toggleTheme);

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
let overlay = null;

function createOverlay() {
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeSidebar);
  }
}

function openSidebar() {
  sidebar.classList.add('open');
  createOverlay();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Navigation Accordion
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    const section = this.getAttribute('data-section');
    const children = document.getElementById(`${section}-children`);

    if (children) {
      // Toggle current section
      children.classList.toggle('hidden');
      this.classList.toggle('active');
    }
  });
});

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL without jumping
      history.pushState(null, '', href);

      // Update active state
      document.querySelectorAll('.nav-child').forEach(child => {
        child.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Highlight current section on scroll
function highlightCurrentSection() {
  const sections = document.querySelectorAll('h2[id], h1[id]');
  const navChildren = document.querySelectorAll('.nav-child');

  let currentSection = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100) {
      currentSection = section.id;
    }
  });

  navChildren.forEach(child => {
    const href = child.getAttribute('href');
    if (href && href.includes(`#${currentSection}`)) {
      child.classList.add('active');
    } else if (!href?.startsWith('#')) {
      // Don't remove active from links to other pages
    } else {
      child.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightCurrentSection);

// Close sidebar when clicking a nav link on mobile
document.querySelectorAll('.nav-child').forEach(child => {
  child.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      closeSidebar();
    }
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    closeSidebar();
  }
});
