// Configuration générale
const CONFIG = {
    weddingDate: new Date('2024-09-15T15:30:00'),
    mapConfig: {
        center: [48.8698, 2.1651], // Coordonnées approximatives du Château de Malmaison
        zoom: 15
    }
};

// Variables globales
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCountdown();
    initializeMap();
    initializeGallery();
    initializeForms();
    initializeScrollAnimations();
    initializeParallax();
});

// Navigation mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Gestion du scroll pour la navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Compte à rebours
function initializeCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.weddingDate.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Le mariage a eu lieu
            document.getElementById('countdown').innerHTML = '<p class="countdown-finished">C\'est le grand jour ! 🎉</p>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Carte interactive
function initializeMap() {
    try {
        const map = L.map('map').setView(CONFIG.mapConfig.center, CONFIG.mapConfig.zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Marqueur personnalisé
        const customIcon = L.divIcon({
            html: '<i class="fas fa-heart" style="color: #d4a574; font-size: 20px;"></i>',
            iconSize: [20, 20],
            className: 'custom-div-icon'
        });

        L.marker(CONFIG.mapConfig.center, { icon: customIcon })
            .addTo(map)
            .bindPopup('<b>Château de Malmaison</b><br>Notre lieu de mariage')
            .openPopup();

        // Désactiver le zoom avec la molette pour éviter les problèmes de scroll
        map.scrollWheelZoom.disable();
        
        // Réactiver le zoom sur clic
        map.on('click', function() {
            map.scrollWheelZoom.enable();
        });

        map.on('mouseout', function() {
            map.scrollWheelZoom.disable();
        });

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
        document.getElementById('map').innerHTML = '<p style="text-align: center; padding: 2rem;">Carte non disponible</p>';
    }
}

// Galerie photo
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openModal(item.querySelector('img').src);
        });
    });

    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
    });

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
    });

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
}

// Formulaires
function initializeForms() {
    // Formulaire RSVP
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVPSubmit);
    }

    // Formulaire Livre d'or
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.
