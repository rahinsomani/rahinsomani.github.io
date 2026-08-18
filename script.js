const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle?.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    menuToggle.textContent = isOpen ? 'Close' : 'Menu';
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuToggle.textContent = 'Menu';
        menuToggle.setAttribute('aria-label', 'Open menu');
    });
});

// Active section highlighting for sidebar nav
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

function setActiveNav() {
    const offset = window.innerWidth >= 900 ? 180 : 90;
    let currentId = '';

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href').slice(1);
        if (href === currentId) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
window.addEventListener('resize', setActiveNav, { passive: true });
setActiveNav();
