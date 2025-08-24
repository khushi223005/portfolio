document.addEventListener('DOMContentLoaded', function () {
    let activeLink = document.querySelector('.nav-items.active-nav-link');

    // Change nav link to active on click
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            activeLink = document.querySelector('.nav-items.active-nav-link');
            activeLink.classList.remove('active-nav-link');
            this.querySelector('li').classList.add('active-nav-link');
        });
    });

    // Set default nav link
    const setActiveNavLink = (navItem) => {
        activeLink.classList.remove('active-nav-link');
        navItem.classList.add('active-nav-link');
        activeLink = navItem;
    };

    // const fragment = window.location.hash;

    // if (fragment) {
    //     const targetNavItem = document.querySelector(
    //         `a[href="${fragment}"] li`
    //     );
    //     setActiveNavLink(targetNavItem);
    // }

    // Mobile Menu

    const toggleMenu = () => {
        const menuSelector = document.querySelector('div[aria-label="menu"]');

        if (menuSelector.classList.contains('translate-y-52')) {
            menuSelector.classList.remove('translate-y-52');
            menuSelector.classList.add('translate-y-0');
        } else {
            menuSelector.classList.remove('translate-y-0');
            menuSelector.classList.add('translate-y-52');
        }
    };

    const menuIconSelector = document.querySelector('.open-menu');
    const menuLink = document.querySelector('.menu-link');

    menuIconSelector.addEventListener('click', toggleMenu);
    menuLink.addEventListener('click', toggleMenu);

    window.addEventListener('scroll', function (event) {
        const menuSelector = document.querySelector('div[aria-label="menu"]');
        if (menuSelector.classList.contains('translate-y-0')) {
            menuSelector.classList.remove('translate-y-0');
            menuSelector.classList.add('translate-y-52');
        }
    });

    // On scroll check active section
    // const sections = document.querySelectorAll('section');
    // let activeSection = 'hero';

    // const isSectionInView = (section) => {
    //     const rect = section.getBoundingClientRect();
    //     return rect.top >= 0 && rect.top <= 100;
    // };

    // const updateSection = () => {
    //     sections.forEach((section) => {
    //         if (isSectionInView(section)) {
    //             activeSection = section.id;
    //             console.log(activeSection);
    //         }
    //     });
    // };

    // const handleScroll = () => {
    //     updateSection();
    //     activeLink = document.querySelector('.nav-items.active-nav-link');
    //     const targetNavItem = document.querySelector(
    //         `a[href="#${activeSection}"] li`
    //     );
    //     setActiveNavLink(targetNavItem);
    // };

    // window.addEventListener('scroll', handleScroll);

    // Contact Form Functionality
    (function() {
        // Initialize EmailJS
        emailjs.init("W4_lKUsIyLTQ2dgH9");

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const loadingText = document.getElementById('loadingText');
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.getElementById('toast');
        const toastIcon = document.getElementById('toastIcon');
        const toastMessage = document.getElementById('toastMessage');
        const toastClose = document.getElementById('toastClose');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitText.style.display = 'none';
            loadingText.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Hide previous toast
            toastContainer.style.display = 'none';

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send email using EmailJS
            emailjs.send('service_qjtltvg', 'template_rp9a068', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success toast
                    showToast('Thank you! Your message has been sent successfully.', 'success');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button state
                    submitText.style.display = 'inline';
                    loadingText.style.display = 'none';
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error toast
                    showToast('Sorry, there was an error sending your message. Please try again.', 'error');
                    
                    // Reset button state
                    submitText.style.display = 'inline';
                    loadingText.style.display = 'none';
                    submitBtn.disabled = false;
                });
        });

        // Toast function
        function showToast(message, type) {
            console.log('showToast called with:', message, type);
            
            // Check if elements exist
            if (!toastContainer || !toast || !toastMessage || !toastIcon) {
                console.error('Toast elements not found:', {
                    toastContainer: !!toastContainer,
                    toast: !!toast,
                    toastMessage: !!toastMessage,
                    toastIcon: !!toastIcon
                });
                return;
            }
            
            // Update toast content
            toastMessage.textContent = message;
            
            // Update toast styling based on type
            if (type === 'success') {
                toast.className = 'bg-white border-l-4 border-green-500 shadow-lg rounded-lg p-4 max-w-sm';
                toastIcon.className = 'uil uil-check-circle text-green-500 text-xl';
            } else {
                toast.className = 'bg-white border-l-4 border-red-500 shadow-lg rounded-lg p-4 max-w-sm';
                toastIcon.className = 'uil uil-exclamation-triangle text-red-500 text-xl';
            }
            
            // Show toast
            toastContainer.style.display = 'block';
            console.log('Toast should be visible now');
            
            // Auto hide after 5 seconds
            setTimeout(function() {
                toastContainer.style.display = 'none';
                console.log('Toast auto-hidden');
            }, 5000);
        }

        // Close toast on button click
        toastClose.addEventListener('click', function() {
            toastContainer.style.display = 'none';
        });
    })();
});
