document.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes de projet au scroll (peut rester si les projets sont sur une autre page)
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
                }
            });
        }, observerOptions);

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
    }

    // Effet miroir sur les cartes de compétences (si souhaité)
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Décommenter pour activer l'effet miroir
                // card.style.transform = 'translateY(-10px) scaleX(-1)';
            });
            card.addEventListener('mouseleave', () => {
                 // Décommenter pour activer l'effet miroir
                // card.style.transform = 'translateY(0) scaleX(1)';
            });
        });
    }

    // Smooth scroll pour les liens de navigation internes (mis à jour)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculer la position de la cible en tenant compte du header fixe
                const headerOffset = 80; // Hauteur du header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Mettre à jour la classe 'active' dans la nav
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
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

            // Simulation d'envoi (remplacer par une vraie logique si nécessaire)
            setTimeout(() => {
                submitButton.textContent = 'Message envoyé !';
                contactForm.reset(); // Vider le formulaire
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 2500);
            }, 1500);
        });
    }

    // Effet de survol sur les liens sociaux du footer
    const socialLinks = document.querySelectorAll('.footer .social-links a');
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.2) rotate(5deg)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1) rotate(0)';
            });
        });
    }
}); 