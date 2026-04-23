document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const navLinks = document.querySelectorAll('.nav-link[data-target], .submenu-link[data-target]');
    const sections = document.querySelectorAll('.content-section');

    // Sidebar Toggle Function
    const toggleSidebar = () => {
        sidebar.classList.toggle('collapsed');
        
        // Mobile handling
        if (window.innerWidth <= 992) {
            sidebar.classList.toggle('mobile-open');
        }
    };

    toggleBtn.addEventListener('click', toggleSidebar);
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // Content Switching
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            
            if (targetId) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                // Add active class to current link and target section
                link.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Close sidebar on mobile after selection
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });
    });

    // Submenu handling is now primarily managed by Bootstrap data attributes and CSS transitions

    // Add animation to cards on scroll or load
    const cards = document.querySelectorAll('.web-setting-card, .account-card, .stat-card, .hrm-card, .order-status-card, .user-card, .prod-box, .pos-item, .setting-row, .catalog-builder-box, .cogs-card, .hrm-setup-card, .mgmt-item, .asset-tile, .pos-action-card, .active-warehouse-card, .p-link');
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

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
