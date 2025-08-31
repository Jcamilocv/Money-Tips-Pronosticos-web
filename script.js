document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar ? navbar.offsetHeight : 0;

    window.addEventListener('resize', () => {
        navbarHeight = navbar ? navbar.offsetHeight : 0;
    });

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    const currentPathname = window.location.pathname;
    const currentHash = window.location.hash;

    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkUrl = new URL(link.href);
        const linkPath = linkUrl.pathname;
        const linkHash = linkUrl.hash;

        // Normalize paths for comparison
        const normalizedCurrentPath = currentPathname.endsWith('/') ? currentPathname.slice(0, -1) : currentPathname;
        const normalizedLinkPath = linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;

        let isActive = false;
        if (normalizedLinkPath === normalizedCurrentPath || (normalizedCurrentPath === '/index.html' && normalizedLinkPath === '')) {
             if (linkHash && linkHash === currentHash) {
                isActive = true;
             } else if (!linkHash && !currentHash) {
                isActive = true;
             }
        }

        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        link.addEventListener('click', function (e) {
            // Check if the link is for the current page
            const isSamePage = (link.pathname === window.location.pathname) ||
                               (link.pathname === '/' && window.location.pathname.includes('/index.html'));

            if (link.hash && isSamePage) {
                e.preventDefault();
                const targetElement = document.querySelector(link.hash);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            // Always close hamburger on click
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});
