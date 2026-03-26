document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    function updateTheme(theme) {
        body.classList.remove('light', 'dark');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        
        // Show/hide theme elements
        const lightElements = document.querySelectorAll('.sun, .cloud');
        const darkElements = document.querySelectorAll('.moon, .star');
        
        if (theme === 'light') {
            lightElements.forEach(el => el.style.display = 'block');
            darkElements.forEach(el => el.style.display = 'none');
        } else {
            lightElements.forEach(el => el.style.display = 'none');
            darkElements.forEach(el => el.style.display = 'block');
        }
    }
    
    updateTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light') ? 'dark' : 'light';
        updateTheme(newTheme);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Explore button scroll
    const exploreBtn = document.getElementById('explore-btn');
    exploreBtn.addEventListener('click', () => {
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    });

    // Video controls - pause others when one plays
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            videos.forEach(v => {
                if (v !== video) v.pause();
            });
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    const ticketForm = document.getElementById('ticket-form');
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(ticketForm);
        const ticketData = Object.fromEntries(formData.entries());
        console.log('Ticket submitted:', ticketData);
        alert('Ticket opened successfully! Ticket ID: ' + Math.random().toString(36).substr(2, 9).toUpperCase());
        ticketForm.reset();
    });

    // Chatbot functionality
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chatbot-messages');

    const responses = {
        'hello': 'Hello! How can I help you with our tech services?',
        'services': 'We offer Laptop/Desktop Repairs, 3D Billboards, CCTV, Networking, and more. Check our Services section!',
        'contact': 'You can reach us at +959403710059, +959940350948, or mrwantedtheorigin@gmail.com',
        'repair': 'For repairs, please open a ticket or contact us directly. We handle both software and hardware issues.',
        'default': 'I\'m here to help! Ask me about our services, repairs, or how to contact us.'
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(message) {
        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    chatbotToggle.addEventListener('click', () => {
        chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotClose.addEventListener('click', () => {
        chatbot.style.display = 'none';
    });

    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            setTimeout(() => {
                addMessage(getResponse(message));
            }, 500);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });

    // Add some interactive effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Background video logo animation
    const logoOverlay = document.getElementById('logo-overlay');
    let logoVisible = true;
    setInterval(() => {
        logoVisible = !logoVisible;
        logoOverlay.style.opacity = logoVisible ? '1' : '0.3';
    }, 3000);
});