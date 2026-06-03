// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-list > li > a');
  const dropdownToggles = document.querySelectorAll('.nav-list > li > a');

  // Toggle navigation menu
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if this is a dropdown toggle
      const parentLi = this.parentElement;
      const dropdown = parentLi.querySelector('.dropdown-nav-list');
      
      if (dropdown) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      } else {
        // Close the menu if it's a regular link
        if (window.innerWidth <= 768) {
          navList.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.site-header')) {
      navList.classList.remove('active');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navList.classList.remove('active');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('[class*="animate-"]').forEach(el => {
  observer.observe(el);
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION INDICATOR
// ============================================

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ============================================

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector('.hero-background');
  
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ============================================
// ANIMATED COUNTERS FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      document.querySelectorAll('.stat-number-large').forEach(el => {
        const target = parseInt(el.textContent);
        animateCounter(el, target);
      });
      statsAnimated = true;
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(button);

  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });

  button.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

createScrollToTopButton();

// ============================================
// CARD HOVER EFFECTS
// ============================================

document.querySelectorAll('.program-card, .service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.animation = 'lift 0.4s ease-out forwards';
  });

  card.addEventListener('mouseleave', function() {
    this.style.animation = 'none';
  });
});

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.animation = 'fadeIn 0.6s ease-out';
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// FORM VALIDATION AND ANIMATION
// ============================================

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.animation = 'shake 0.5s ease-in-out';
        isValid = false;
        
        setTimeout(() => {
          input.style.animation = 'none';
        }, 500);
      }
    });

    if (isValid) {
      form.style.animation = 'slideInUp 0.6s ease-out';
      // Submit form here
    }
  });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', function() {
  document.body.style.animation = 'fadeIn 0.6s ease-out';
});

// ============================================
// ELEMENT VISIBILITY CHECK
// ============================================

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// ============================================
// DYNAMIC ANIMATION TRIGGER
// ============================================

window.addEventListener('scroll', function() {
  document.querySelectorAll('[data-animate]').forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('animated')) {
      const animationType = element.getAttribute('data-animate');
      element.classList.add(`animate-${animationType}`, 'animated');
    }
  });
});

console.log('✅ Animation script loaded successfully!');
