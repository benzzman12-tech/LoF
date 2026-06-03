// MAP Initialization and Error Handling
    const mapErrorEl = document.getElementById('mapError');
    function initMap() {
      try {
        const nyc = { lat: 40.741, lng: -73.989 };
        const map = new google.maps.Map(document.getElementById('map'), {
          center: nyc,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        new google.maps.Marker({
          position: nyc,
          map,
          title: "Light of Asia School",
        });
      } catch (err) {
        showMapError();
      }
    }

    function showMapError() {
      if (mapErrorEl) mapErrorEl.style.display = 'flex';
    }

    
    window.addEventListener('load', () => {
  
      setTimeout(() => {
        if (!window.google || !window.google.maps) {
          showMapError();
        }
      }, 600);
    });
    //end of map code
    //form code
       const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');

    function showError(id, inputEl, show) {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', show);
      inputEl.classList.toggle('error', show);
      inputEl.classList.toggle('success', !show);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Name: only letters
      const name = form.name.value.trim();
      const namePattern = /^[A-Za-z\s]+$/;
      if (!name || !namePattern.test(name)) {
        showError('errName', form.name, true);
        valid = false;
      } else {
        showError('errName', form.name, false);
      }

      // Phone: only digits
      const phone = form.phone.value.trim();
      const numPattern = /^[0-9]+$/;
      if (!phone || !numPattern.test(phone)) {
        showError('errPhone', form.phone, true);
        valid = false;
      } else {
        showError('errPhone', form.phone, false);
      }

      // Email
      const email = form.email.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('errEmail', form.email, true);
        valid = false;
      } else {
        showError('errEmail', form.email, false);
      }

    //  CONTAX
    // DOM Elements
const infoCards = document.querySelectorAll('.info-card');
const mapPlaceholder = document.querySelector('.map-placeholder');

// Add hover animations to info cards
infoCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    // Add click animation
    card.addEventListener('click', () => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.header-content, .info-card, .map-container').forEach(el => {
    observer.observe(el);
});

// Map interaction
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
        // You can open Google Maps link here
        console.log('Map clicked - integrate with Google Maps API');
    });

    mapPlaceholder.style.cursor = 'pointer';
    mapPlaceholder.addEventListener('mouseenter', () => {
        mapPlaceholder.style.transform = 'scale(1.02)';
        mapPlaceholder.style.transition = 'transform 0.3s ease';
    });

    mapPlaceholder.addEventListener('mouseleave', () => {
        mapPlaceholder.style.transform = 'scale(1)';
    });
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header-content');
    
    if (header) {
        header.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

console.log('Contact section loaded with animations!');
    });
    