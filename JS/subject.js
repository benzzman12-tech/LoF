// Add interactive animations and effects

document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = entry.target.dataset.animation;
            }
        });
    }, observerOptions);

    // Button interaction
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);
    });

    ctaButton.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });

    // Add parallax effect to decorative elements
    document.addEventListener('mousemove', function(event) {
        const stars = document.querySelectorAll('.star');
        const circles = document.querySelectorAll('.circle');
        
        const mouseX = event.clientX / window.innerWidth;
        const mouseY = event.clientY / window.innerHeight;

        stars.forEach((star, index) => {
            const speed = 5 + index * 2;
            star.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });

        circles.forEach((circle, index) => {
            const speed = 3 + index * 1.5;
            circle.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Counter animation for the episode number
    const episodeNumber = document.querySelector('.episode-number');
    if (episodeNumber) {
        animateCounter(episodeNumber, 0, 100, 2000);
    }
});

// Counter animation function
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Add ripple effect to button
document.querySelector('.cta-button').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(255, 255, 255, 0.7)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);