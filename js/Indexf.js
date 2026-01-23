
        lucide.createIcons();

        document.addEventListener('DOMContentLoaded', () => {
            const splash = document.getElementById('splash-screen');
            const body = document.body;

            // Lógica del Splash Screen
            setTimeout(() => {
                // 1. Desvanecer Splash
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                
                // 2. Reactivar Scroll del body
                body.style.overflow = 'auto';
                
                // 3. Activar animaciones del Hero (vía clase CSS)
                body.classList.add('loaded');
                
            }, 2500); // <-- TIEMPO DE ESPERA: 2.5 segundos

            // Header Scroll Effect
            const header = document.getElementById('main-header');
            const logoText = document.getElementById('logo-text');
            const navLinks = document.querySelectorAll('.nav-link');
            const menuBtnIcon = document.querySelector('#mobile-menu-btn i');
            
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    header.classList.add('glass-header', 'py-4');
                    header.classList.remove('py-6');
                    logoText.classList.remove('text-white');
                    logoText.classList.add('text-brand-primary');
                    navLinks.forEach(link => {
                        link.classList.remove('text-white/80');
                        link.classList.add('text-slate-600');
                    });
                    if(menuBtnIcon) menuBtnIcon.style.color = '#002651';
                } else {
                    header.classList.remove('glass-header', 'py-4');
                    header.classList.add('py-6');
                    logoText.classList.add('text-white');
                    logoText.classList.remove('text-brand-primary');
                    navLinks.forEach(link => {
                        link.classList.add('text-white/80');
                        link.classList.remove('text-slate-600');
                    });
                    if(menuBtnIcon) menuBtnIcon.style.color = 'white';
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Menu Móvil
            const menuBtn = document.getElementById('mobile-menu-btn');
            const closeBtn = document.getElementById('close-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            const toggleMenu = () => {
                const isOpen = !mobileMenu.classList.contains('translate-x-full');
                if (isOpen) {
                    mobileMenu.classList.add('translate-x-full');
                } else {
                    mobileMenu.classList.remove('translate-x-full');
                }
            };

            if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
            if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
            mobileLinks.forEach(l => l.addEventListener('click', toggleMenu));

            // Scroll Reveal
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            // Form
            const form = document.getElementById('contact-form');
            const successMsg = document.getElementById('success-message');
            if(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button');
                    btn.innerHTML = 'Procesando...';
                    btn.disabled = true;
                    btn.classList.add('opacity-75');
                    setTimeout(() => {
                        form.style.display = 'none';
                        successMsg.classList.remove('hidden');
                    }, 1500);
                });
            }
        });
    