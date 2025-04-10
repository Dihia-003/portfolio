document.addEventListener('DOMContentLoaded', () => {
    // Effet de parallaxe sur la section hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Animation des cartes de projet au scroll
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Optionnel: arrêter d'observer après animation
                }
            });
        }, observerOptions);

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Transition plus douce
            observer.observe(card);
        });
    }

    // Effet sur les cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Exemple: léger scale au survol
                 card.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', () => {
                 card.style.transform = 'scale(1)';
            });
        });
    }

    // Smooth scroll pour les liens de navigation internes
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Hauteur du header fixe
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Gérer la classe active pour la navigation
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active link on scroll (optionnel mais bon UX)
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = 90; // Un peu plus pour l'activation

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === '#' + current) {
                li.classList.add('active');
            }
        });
        // Gérer le cas où on est tout en haut
        if (window.pageYOffset < sections[0].offsetTop - headerOffset) {
             navLi.forEach(li => li.classList.remove('active'));
             document.querySelector('.nav-links a[href="#accueil"]').classList.add('active');
        }
    });

    // Animation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;

            // Simulation d'envoi
            setTimeout(() => {
                submitButton.textContent = 'Message envoyé !';
                // Ne pas vider le formulaire tout de suite, laisser le temps de voir
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    contactForm.reset(); // Vider après la confirmation
                }, 2500);
            }, 1500);
        });
    }

    // Effet de survol sur les liens sociaux du footer
    const socialLinksFooter = document.querySelectorAll('.footer .social-links a');
    if (socialLinksFooter.length > 0) {
        socialLinksFooter.forEach(link => {
            // Les styles hover sont déjà gérés en CSS, JS non nécessaire ici
            // Sauf si on veut une animation plus complexe
        });
    }
}); 