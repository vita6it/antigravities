// Initialize Lucide icons
lucide.createIcons();

// Tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toast notification function
function showToast() {
    const toast = document.getElementById('copyToast');
    if (toast) {
        // Show toast
        toast.classList.add('show');

        // Re-initialize lucide icons for the toast
        lucide.createIcons();

        // Hide toast after 2.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}

// Copy code functionality
function copyCode(button) {
    const codeSection = button.closest('.code-container');
    const codeContent = codeSection.querySelector('.code-content');
    const textToCopy = codeContent.textContent.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show toast notification
        showToast();

        // Change icon to checkmark
        const icon = button.querySelector('i');
        const textSpan = button.querySelector('span');

        icon.setAttribute('data-lucide', 'circle-check');
        lucide.createIcons();

        // Change button style and text
        button.classList.add('copied');
        if (textSpan) {
            textSpan.textContent = 'Copied!';
        }

        // Reset after 2 seconds
        setTimeout(() => {
            icon.setAttribute('data-lucide', 'clipboard-copy');
            lucide.createIcons();
            button.classList.remove('copied');
            if (textSpan) {
                textSpan.textContent = 'Copy Script';
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
let isMenuOpen = false;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    const icon = mobileMenuBtn.querySelector('i');

    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        icon.setAttribute('data-lucide', 'x'); // Change icon to close (X)
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        mobileMenu.classList.remove('active');
        icon.setAttribute('data-lucide', 'menu'); // Change icon back to menu
        document.body.style.overflow = ''; // Restore scrolling
    }
    lucide.createIcons();
}
