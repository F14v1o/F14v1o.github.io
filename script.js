// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const navigation = document.querySelector('.navigation-menu');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// ACTIVE NAVIGATION ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');

function activateNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            correspondingNavLink?.classList.add('active');
        } else {
            correspondingNavLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavOnScroll);

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HIDE/SHOW NAVIGATION ON SCROLL
// ============================================

let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= scrollThreshold) {
        navigation.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down
        navigation.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll) {
        // Scrolling up
        navigation.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// PROJECT MODAL
// ============================================

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const projectViewButtons = document.querySelectorAll('.project-view-btn');

// Project data
const projectData = {
    'hr-agent': {
        title: 'Swiss HR Agent',
        images: ['Screenshots/HR-AGent 1.png', 'Screenshots/HR-AGENT 2.png', 'Screenshots/HR-Agent 3.png'],
        description: `
            <h2>Swiss HR Agent</h2>
            <p><strong>Mehrsprachiger HR-Assistent für Schweizer KMUs</strong></p>
            <p>Der Swiss HR Agent ist eine innovative Lösung, die speziell für kleine und mittlere Unternehmen in der Schweiz entwickelt wurde. Die Anwendung unterstützt Unternehmen bei HR-bezogenen Aufgaben unter Einhaltung des Schweizer Arbeitsrechts (OR, Art. 319-362).</p>
            
            <h3>Hauptfunktionen:</h3>
            <ul>
                <li><strong>Mehrsprachigkeit:</strong> Unterstützung für Deutsch, Französisch, Italienisch und Englisch</li>
                <li><strong>Rechtliche Compliance:</strong> Vollständig konform mit Schweizer Arbeitsrecht</li>
                <li><strong>Benutzerfreundlich:</strong> Intuitive Benutzeroberfläche für Mitarbeiter und Management</li>
                <li><strong>Automatisierung:</strong> Automatische Verarbeitung von HR-Anfragen und Dokumenten</li>
            </ul>
            
            <h3>Technologien:</h3>
            <p>Python, AI/ML, Natural Language Processing, Schweizer Rechtsdatenbank-Integration</p>
        `
    },
    'email-scraper': {
        title: 'Web Scraper für Email-Extraktion',
        images: ['Screenshots/EMAIL scraper 1.png', 'Screenshots/EMAIL SCRAPER 2.png'],
        description: `
            <h2>Web Scraper für Email-Extraktion</h2>
            <p><strong>Intelligenter Web-Scraper mit erweiterten Funktionen</strong></p>
            <p>Ein leistungsstarkes Tool zur automatisierten Extraktion von Email-Adressen aus Webseiten. Das System nutzt fortgeschrittene Techniken wie AJAX-Unterstützung und Pattern-Matching, um auch dynamisch geladene Inhalte zu erfassen.</p>
            
            <h3>Hauptfunktionen:</h3>
            <ul>
                <li><strong>AJAX-Unterstützung:</strong> Erfassung von dynamisch nachgeladenen Inhalten</li>
                <li><strong>Pattern-Matching:</strong> Intelligente Erkennung verschiedener Email-Formate</li>
                <li><strong>Batch-Processing:</strong> Verarbeitung mehrerer URLs gleichzeitig</li>
                <li><strong>CSV-Export:</strong> Automatischer Export der Ergebnisse in strukturierte CSV-Dateien</li>
                <li><strong>Duplikat-Erkennung:</strong> Vermeidung von doppelten Einträgen</li>
            </ul>
            
            <h3>Technologien:</h3>
            <p>Python, AsyncIO, BeautifulSoup, Selenium, Regex, CSV Processing</p>
            
            <h3>Anwendungsfälle:</h3>
            <ul>
                <li>Lead-Generierung für Marketing-Kampagnen</li>
                <li>Recherche und Datensammlung</li>
                <li>Kontaktlisten-Erstellung</li>
            </ul>
        `
    },
    'n8n-workflow': {
        title: 'N8N Workflow AI-Agent Automation',
        images: ['Screenshots/N8N Workflow AI-Agent automation.png'],
        description: `
            <h2>N8N Workflow AI-Agent Automation</h2>
            <p><strong>Komplexe Workflow-Automatisierung mit AI-Integration</strong></p>
            <p>Ein hochentwickeltes Automatisierungssystem, das N8N mit AI-Agenten kombiniert, um intelligente, selbstlernende Workflows zu erstellen. Das System kann komplexe Geschäftsprozesse automatisieren und dynamisch auf verschiedene Eingaben reagieren.</p>
            
            <h3>Hauptfunktionen:</h3>
            <ul>
                <li><strong>AI-Integration:</strong> Nutzung von KI für intelligente Entscheidungsfindung</li>
                <li><strong>Multi-Step Workflows:</strong> Komplexe, mehrstufige Automatisierungsprozesse</li>
                <li><strong>API-Integration:</strong> Verbindung mit verschiedenen externen Services</li>
                <li><strong>Conditional Logic:</strong> Dynamische Verzweigungen basierend auf Daten</li>
                <li><strong>Error Handling:</strong> Robuste Fehlerbehandlung und Logging</li>
            </ul>
            
            <h3>Workflow-Komponenten:</h3>
            <ul>
                <li>Datenerfassung und -validierung</li>
                <li>AI-gestützte Datenverarbeitung</li>
                <li>Automatische Benachrichtigungen</li>
                <li>Datenbank-Operationen</li>
                <li>Reporting und Analytics</li>
            </ul>
            
            <h3>Technologien:</h3>
            <p>N8N, AI/ML APIs, REST APIs, Webhooks, JSON Processing, Database Integration</p>
            
            <h3>Vorteile:</h3>
            <ul>
                <li>Reduzierung manueller Arbeit um bis zu 80%</li>
                <li>Fehlerreduktion durch Automatisierung</li>
                <li>Skalierbare Lösung für wachsende Anforderungen</li>
                <li>24/7 Verfügbarkeit</li>
            </ul>
        `
    },
    'home-nas': {
        title: 'Home NAS – Network Attached Storage',
        images: [
            'Screenshots/NAS.png',
            'Screenshots/NAS 1.png',
            'Screenshots/NAS 3.jpg',
            'Screenshots/NAS 4.jpg'
        ],
        description: `
            <h2>Home NAS – Network Attached Storage</h2>
            <p><strong>Headless Server mit redundantem Speichersystem, Media-Stack und sicherem Remote-Zugriff.</strong></p>

            <h3>Technische Eckdaten:</h3>
            <ul>
                <li>4-Bay-Gehäuse mit hot-swappable Festplatteneinschüben und SATA-Backplane</li>
                <li>Headless Administration via SSH und Web-Dashboard (Docker + Portainer)</li>
                <li>ZFS RAIDZ-Konfiguration mit automatisierten SMART-Checks und Snapshots</li>
            </ul>

            <h3>Media & Services:</h3>
            <ul>
                <li><strong>Jellyfin:</strong> Eigener Streaming-Service für Filme und Serien inkl. automatischer Metadaten-Beschaffung</li>
                <li>Transcoding-Queue für unterschiedliche Endgeräte (Mobile, Smart TV, Browser)</li>
                <li>Geplante Backup-Jobs auf externes Laufwerk und verschlüsselten Cloud-Bucket</li>
            </ul>

            <h3>Security & Remote Access:</h3>
            <ul>
                <li>WireGuard VPN-Tunnel für verschlüsselten Zugriff von unterwegs</li>
                <li>Role-based Access Control für Freigaben (Media, Archive, Dev-Files)</li>
                <li>Monitoring via Uptime-Kuma und Telegram Alerts bei Temperatur- oder RAID-Events</li>
            </ul>

            <p>Das Setup ermöglicht mir, Medienbibliotheken, Projektdateien und Backups zentral zu hosten und dank VPN-Tunnel jederzeit sicher darauf zuzugreifen – ganz ohne Peripherie, vollständig headless.</p>
        `
    }
};

// Open modal with project details
projectViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            let imagesHTML = '';
            project.images.forEach(img => {
                imagesHTML += `<img src="${img}" alt="${project.title}">`;
            });
            
            modalBody.innerHTML = `
                ${imagesHTML}
                <div class="modal-description">
                    ${project.description}
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and elements for animation
const animateElements = document.querySelectorAll('.about-card, .project-card, .certificate-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
// ============================================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const typingSpeed = 50;
    let charIndex = 0;
    
    // Uncomment below to enable typing effect
    /*
    heroSubtitle.textContent = '';
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    setTimeout(typeWriter, 500);
    */
}

// ============================================
// PARALLAX EFFECT FOR HERO SECTION (Optional)
// ============================================

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c👋 Hallo!', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cInteressiert an meinem Code? Kontaktieren Sie mich gerne!', 'font-size: 14px; color: #6b7280;');
console.log('%c🚀 Dieses Portfolio wurde mit Vanilla JavaScript, HTML5 und CSS3 erstellt.', 'font-size: 12px; color: #6b7280;');

