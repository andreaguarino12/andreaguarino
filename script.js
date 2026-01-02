// Effetto particelle di sfondo
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza particelle
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6366f1" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6366f1",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Effetto luce che segue il mouse
    const mouseLight = document.querySelector('.mouse-light');
    
    document.addEventListener('mousemove', (e) => {
        mouseLight.style.left = e.clientX + 'px';
        mouseLight.style.top = e.clientY + 'px';
        mouseLight.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        mouseLight.style.opacity = '0';
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.padding = '1.5rem 5%';
        }
        
        // Nascondi/mostra navbar in base alla direzione di scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Animazione skill bar quando visibili
        animateSkillsOnScroll();
        
        // Animazione numeri statistiche
        animateStatsOnScroll();
    });

    // Menu mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Chiudi menu mobile al click su link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Effetto magnetico per bottoni
    document.querySelectorAll('.magnetic').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const strength = parseFloat(this.getAttribute('data-strength')) || 0.3;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Animazione hover per card progetti
    document.querySelectorAll('.project-card').forEach(card => {
        const hoverEffect = card.querySelector('.project-hover-effect');
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            hoverEffect.style.setProperty('--x', `${x}px`);
            hoverEffect.style.setProperty('--y', `${y}px`);
        });
    });

    // Tab skills
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCategories = document.querySelectorAll('.skills-category');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Rimuovi active da tutti i tab
            tabBtns.forEach(b => b.classList.remove('active'));
            skillCategories.forEach(cat => cat.classList.remove('active'));
            
            // Aggiungi active al tab cliccato
            btn.classList.add('active');
            
            // Mostra la categoria corrispondente
            const category = btn.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });

    // Animazione skill bar
    function animateSkillsOnScroll() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight - 100);
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
                
                // Animazione del numero percentuale
                const percentageElement = bar.parentElement.parentElement.querySelector('.skill-percentage');
                const targetPercent = parseInt(percentageElement.getAttribute('data-percent'));
                animateCounter(percentageElement, 0, targetPercent, 1500);
            }
        });
    }

    // Animazione contatore numeri per statistiche
    function animateStatsOnScroll() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight - 100);
            
            if (isVisible && !stat.classList.contains('animated')) {
                const targetCount = parseInt(stat.getAttribute('data-count'));
                animateStatCounter(stat, 0, targetCount, 2000);
                stat.classList.add('animated');
            }
        });
    }

    // Animazione contatore per statistiche (solo numeri, senza %)
    function animateStatCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animazione contatore per percentuali (con %)
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + "%";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Sfera tecnologie 3D
    const techSphere = document.getElementById('tech-sphere');
    const technologies = [
        "Docker", "Kubernetes", "Python", "JavaScript", 
        "Vue.js", "Django", "MySQL", "PostgreSQL",
        "Linux", "Git", "CI/CD", "REST API",
        "Arduino", "Flask", "Node.js"
    ];
    
    // Crea i tag tecnologici sulla sfera
    function createTechSphere() {
        const radius = 120;
        const total = technologies.length;
        
        technologies.forEach((tech, i) => {
            const phi = Math.acos(-1 + (2 * i) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;
            
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            
            const tag = document.createElement('div');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            
            techSphere.appendChild(tag);
        });
    }
    
    createTechSphere();
    
    // Rotazione sfera
    const rotateBtn = document.getElementById('rotate-sphere');
    const explodeBtn = document.getElementById('explode-sphere');
    let rotationAngle = 0;
    let rotationInterval;
    let isRotating = false;
    
    function startRotation() {
        if (!isRotating) {
            isRotating = true;
            rotationInterval = setInterval(() => {
                rotationAngle += 0.5;
                techSphere.style.transform = `rotateY(${rotationAngle}deg)`;
            }, 50);
            
            rotateBtn.innerHTML = '<i class="fas fa-pause"></i> Ferma Rotazione';
        } else {
            stopRotation();
        }
    }
    
    function stopRotation() {
        isRotating = false;
        clearInterval(rotationInterval);
        rotateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Ruota Sfera';
    }
    
    rotateBtn.addEventListener('click', startRotation);
    
    // Effetto esplosione sfera
    explodeBtn.addEventListener('click', () => {
        const tags = document.querySelectorAll('.tech-tag');
        const radius = 300;
        
        tags.forEach(tag => {
            const randomX = (Math.random() - 0.5) * radius * 2;
            const randomY = (Math.random() - 0.5) * radius * 2;
            const randomZ = (Math.random() - 0.5) * radius * 2;
            
            tag.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            tag.style.transform = `translate3d(${randomX}px, ${randomY}px, ${randomZ}px)`;
            tag.style.opacity = '0.8';
            
            // Reset dopo l'esplosione
            setTimeout(() => {
                tag.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // Calcola posizione originale sulla sfera
                const index = Array.from(tags).indexOf(tag);
                const total = tags.length;
                const phi = Math.acos(-1 + (2 * index) / total);
                const theta = Math.sqrt(total * Math.PI) * phi;
                
                const x = 120 * Math.cos(theta) * Math.sin(phi);
                const y = 120 * Math.sin(theta) * Math.sin(phi);
                const z = 120 * Math.cos(phi);
                
                tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                tag.style.opacity = '1';
            }, 1500);
        });
    });

    // Form di contatto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula invio form
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            submitBtn.disabled = true;
            
            // Simula invio dopo 2 secondi
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Messaggio Inviato!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button dopo 3 secondi
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Smooth scroll per anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fix typewriter - scrive solo una volta
    const typewriterText = "Studente IT & Sys-DevOps";
    const typewriterElement = document.querySelector('.typewriter');
    
    if (typewriterElement) {
        // Controlla se l'elemento è già stato scritto
        if (typewriterElement.textContent === "") {
            let charIndex = 0;
            
            function typeWriter() {
                if (charIndex < typewriterText.length) {
                    typewriterElement.textContent += typewriterText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Inizia typewriter quando la pagina è caricata
            window.addEventListener('load', function() {
                // Assicurati che l'elemento sia vuoto prima di iniziare
                typewriterElement.textContent = "";
                setTimeout(typeWriter, 1000);
            });
        }
    }

    // Effetto parallax per sezioni
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach(section => {
            const rate = scrolled * -0.2;
            section.style.backgroundPosition = `center ${rate}px`;
        });
    });

    // Inizializza animazioni al caricamento
    animateSkillsOnScroll();
    animateStatsOnScroll();
});