// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2024-06-15T15:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

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
        // Le mariage est passé
        document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">🎉</span><span class="countdown-label">Mariés !</span></div>';
    }
}

// Mettre à jour le countdown chaque seconde
setInterval(updateCountdown, 1000);
updateCountdown();

// Animation au scroll pour la timeline
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer tous les éléments de la timeline
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Fonctions pour les boutons de la section détails
function openMap(location) {
    let address = '';
    if (location === 'ceremony') {
        address = 'Église Saint-Pierre, 123 Rue de l\'Amour, Paris';
    } else if (location === 'reception') {
        address = 'Château de Versailles, Place d\'Armes, Versailles';
    }
    
    // Ouvrir Google Maps dans un nouvel onglet
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

function showPlaylist() {
    alert('🎵 Playlist de notre mariage :\n\n• "Perfect" - Ed Sheeran\n• "All of Me" - John Legend\n• "A Thousand Years" - Christina Perri\n• "Can\'t Help Myself" - The Four Tops\n• "I Want It That Way" - Backstreet Boys\n\n... et bien d\'autres surprises ! 🎶');
}

// Gestion de la galerie et du modal
const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

const galleryData = [
    { title: 'Notre première photo', description: 'Ce moment magique où tout a commencé...' },
    { title: 'La demande en mariage', description: 'Le plus beau "oui" de ma vie !' },
    { title: 'Séance engagement', description: 'Nos plus beaux sourires pour immortaliser notre amour.' },
    { title: 'Nos voyages', description: 'Découvrir le monde ensemble, main dans la main.' },
    { title: 'En famille', description: 'Entourés de ceux qu\'on aime le plus.' },
    { title: 'Moments spéciaux', description: 'Tous ces petits instants qui font notre bonheur.' }
];

function openModal(imageIndex) {
    const data = galleryData[imageIndex - 1];
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Gestion du formulaire RSVP
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
    };
    
    // Simulation d'envoi du formulaire
    showSuccessMessage();
    
    // Reset du formulaire
    rsvpForm.reset();
});

function showSuccessMessage() {
    const successHTML = `
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; border: 1px solid #c3e6cb;">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Merci ! Votre réponse a été envoyée avec succès. Nous avons hâte de célébrer avec vous !
        </div>
    `;
    
    rsvpForm.insertAdjacentHTML('beforebegin', successHTML);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        const successMessage = document.querySelector('[style*="background: #d4edda"]');
        if (successMessage) {
            successMessage.remove();
        }
    }, 5000);
}

// Animation d'apparition des éléments au scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Appliquer l'animation aux cartes de détails
document.querySelectorAll('.detail-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});

// Appliquer l'animation aux éléments de la galerie
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(item);
});

// Effet parallax léger pour le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Changement de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Fonction pour générer des particules de cœur (effet décoratif)
function createHeartParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.opacity = '0.7';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = 'floatUp 6s linear forwards';
            
            hero.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 300);
    }
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Déclencher les particules toutes les 10 secondes
setInterval(createHeartParticles, 10000);

console.log('🎉 Site de mariage d\'Aurélien & Laeticia chargé avec succès ! 💕');
