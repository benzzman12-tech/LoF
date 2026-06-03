// ============ IMAGE GALLERY ============
const images = [
    '../src/Banner/Chairs las.jpg',
    '../src/Banner/pic las.jpg',
    '../src/Banner/teacher.png',
    '../src/Banner/bglas (2).jpg'
];

let currentImageIndex = 0;

/**
 * Change the displayed image with fade animation
 */
function changeImage(index) {
    if (index >= 0 && index < images.length) {
        const mainImage = document.getElementById('mainImage');
        const counter = document.getElementById('imageCounter');

        if (!mainImage) return;

        mainImage.classList.add('fade-out');

        setTimeout(() => {
            currentImageIndex = index;
            mainImage.src = images[index];
            mainImage.classList.remove('fade-out');

            if (counter) {
                counter.textContent = `${index + 1} / ${images.length}`;
            }

            updateThumbnails();
            updateAriaLabels();
        }, 300);
    }
}

/**
 * Navigate to next image (with loop)
 */
function nextImage() {
    const nextIndex = (currentImageIndex + 1) % images.length;
    changeImage(nextIndex);
}

/**
 * Navigate to previous image (with loop)
 */
function prevImage() {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeImage(prevIndex);
}

/**
 * Update thumbnail active state
 */
function updateThumbnails() {
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

/**
 * Update ARIA labels for accessibility
 */
function updateAriaLabels() {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.setAttribute(
            'alt',
            `Event gallery image ${currentImageIndex + 1} of ${images.length}`
        );
    }
}

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
});

// ============ TOUCH/SWIPE SUPPORT ============
let touchStartX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const mainImageContainer = document.querySelector('.main-image-container');
    if (mainImageContainer) {
        mainImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        mainImageContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                diff > 0 ? nextImage() : prevImage();
            }
        });
    }

    // ============ INITIALIZATION ============
    const counter = document.getElementById('imageCounter');
    if (counter) {
        counter.textContent = `1 / ${images.length}`;
    }
    updateAriaLabels();
});

// ============ SMOOTH SCROLL ============
document.documentElement.style.scrollBehavior = 'smooth';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ MOBILE MENU TOGGLE ============
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close menu when link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// ============ DROPDOWN MENU TOGGLE (Mobile) ============
document.querySelectorAll('.dropdown-nav-list').forEach(dropdown => {
    const parent = dropdown.parentElement;
    if (parent) {
        parent.addEventListener('click', (e) => {
            if (
                window.innerWidth <= 768 &&
                e.target.tagName === 'A' &&
                e.target.querySelector('.fa-chevron-down')
            ) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});
