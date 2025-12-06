document.addEventListener('DOMContentLoaded', () => {

    // 1. Mise à jour de l'année
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 2. Menu Mobile Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = navToggle.querySelector('.material-symbols-outlined');
        icon.textContent = navLinks.classList.contains('open') ? 'close' : 'menu';
    });

    // Fermer le menu lors du clic sur un lien (pour la navigation fluide)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
            }
        });
    });

    // 3. Fonctionnalité de Copie d'Email
    const emailButton = document.getElementById('emailCopyButton');
    const emailAddress = 'ugo.castagna19@gmail.com';

    emailButton.addEventListener('click', () => {
        navigator.clipboard.writeText(emailAddress)
            .then(() => {
                const statusSpan = emailButton.querySelector('.copy-status');
                const originalText = statusSpan.textContent;
                
                statusSpan.textContent = 'Copié !';
                statusSpan.classList.add('copied');

                setTimeout(() => {
                    statusSpan.textContent = originalText;
                    statusSpan.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                console.error('Erreur lors de la copie: ', err);
            });
    });

    // 4. Animation d'apparition au scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // L'élément doit être visible à 10%
    });

    fadeElements.forEach(el => observer.observe(el));

    // 5. Mise à jour de la classe active de la navigation au scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const setActiveLink = () => {
        let current = '';
        sections.forEach(s => {
            const sectionTop = s.offsetTop - 150; 
            if (window.scrollY >= sectionTop) {
                current = s.getAttribute('id');
            }
        });

        navLinksList.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
        
        // Cas particulier pour la section d'accueil (top of the page)
        if (window.scrollY < document.getElementById('apropos').offsetTop - 150) {
            document.querySelector('.nav-links a[href="#accueil"]').classList.add('active');
        }
    };
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Appel initial au chargement
});

