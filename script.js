<<<<<<< HEAD
// Force scroll to top on page refresh
(function() {
  // Save current page position before unload
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('wasRefreshed', 'true');
  });

  // Check if page was refreshed and scroll to top if it was
  if (sessionStorage.getItem('wasRefreshed')) {
    // Remove the flag
    sessionStorage.removeItem('wasRefreshed');
    
    // Make sure we're at the top - use both methods for maximum compatibility
    window.scrollTo(0, 0);
    
    // For browsers that might delay scroll operations
    setTimeout(function() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 10);
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  // Prevent default anchor hash behavior on page load
  if (window.location.hash) {
    // Remove the hash to prevent automatic scrolling
    setTimeout(function() {
      window.scrollTo(0, 0);
      
      // If you want to completely remove the hash from URL without scrolling:
      // history.replaceState(null, null, ' ');
    }, 1);
  }
  
  // Focus on hero section on page load
  window.onload = function() {
    window.scrollTo(0, 0);
  };
  
  // If you have any smooth scrolling for anchor links, ensure they work correctly
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Only scroll if it's not the page top link
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }
      }
    });
  });

  // =============== CHATBOT FUNCTIONALITY ===============
  const supportButton = document.getElementById('supportButton');
  const chatContainer = document.getElementById('chatContainer');
  const closeChat = document.getElementById('closeChat');
  
  // Function to update z-index for proper display
  function updateChatContainerZIndex() {
    if (!chatContainer) return;
    
    // Force social icons to stay behind the chat container
    document.querySelectorAll('.social-icons-left, .social-icons-right').forEach(el => {
      el.style.zIndex = '0'; // Lower z-index when chat is open
    });
    
    // Add a chat-open class to body for styling
    document.body.classList.add('chat-open');
  }
  
  // Show chat function - consolidated approach
  function showChat() {
    if (!chatContainer) return;
    
    chatContainer.style.display = 'block';
    chatContainer.classList.add('active');
    updateChatContainerZIndex();
  }
  
  // Hide chat function - consolidated approach
  function hideChat() {
    if (!chatContainer) return;
    
    // Restore normal z-index for social icons
    document.querySelectorAll('.social-icons-left, .social-icons-right').forEach(el => {
      el.style.zIndex = '900';
    });
    
    // Remove chat-open class from body
    document.body.classList.remove('chat-open');
    
    chatContainer.style.display = 'none';
    chatContainer.classList.remove('active');
  }
  
  // Initially hide the chat container
  hideChat();
  
  // Event listeners for chatbot
  if (supportButton) {
    supportButton.addEventListener('click', showChat);
  }
  
  if (closeChat) {
    closeChat.addEventListener('click', hideChat);
  }
  
  // =============== NAVBAR FUNCTIONALITY ===============
  // Get all navbar links
  const navLinks = document.querySelectorAll('.navbar .nav-links li a');
  
  // Add click event to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Special handling for contact link to open chat
      if (this.id === 'contact-link') {
        e.preventDefault(); // Prevent default anchor behavior
        showChat(); // Use the consolidated function
        
        // Scroll to where the chat is visible (top of page)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle Home link click - scroll to top
  const homeLink = document.getElementById('home-link');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add ID to premium services section for direct linking
  const servicesSection = document.querySelector('.premium-services');
  if (servicesSection) {
    servicesSection.id = 'services';
  }
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip for links that don't point to an ID or for the contact link
      if (targetId === '#' || this.id === 'contact-link') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate position to scroll to (with offset for fixed navbar)
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Scroll to the target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // =============== BUTTONS FUNCTIONALITY ===============
  // General buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get button text
      const buttonText = this.textContent.trim();
      
      // Show appropriate message based on which button was clicked
      if (buttonText.includes('Telegram')) {
        window.location.href = 'https://t.me/+923107188339';
      } else if (buttonText.includes('Whatsapp')) {
        // Corrected WhatsApp link with proper country code format
        window.location.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20more%20information';
      } else if (buttonText.includes('Discord')) {
        alert('Redirecting to Discord server...');
        // window.location.href = 'your-discord-link';
      } else if (buttonText.includes('Book A Call')) {
        alert('Opening booking calendar...');
        // window.location.href = 'your-calendar-link';
      } else {
        alert('Button clicked!');
      }
    });
  });

  // Contact buttons in chatbot - UPDATED WITH CORRECT PHONE NUMBER AND WHATSAPP FORMAT
  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.classList.contains('whatsapp') ? 'WhatsApp' : 
                    this.classList.contains('telegram') ? 'Telegram' : 'Telegram Community';
      
      // Updated links with the provided phone number and proper formatting
      const links = {
        'WhatsApp': 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20more%20information',
        'Telegram': 'https://t.me/+923107188339',
        'Telegram Community': 'https://t.me/+923107188339'
      };
      
      window.open(links[service], '_blank');
    });
  });
  
  // Update WhatsApp and Telegram links in the modal footer
  const modalWhatsApp = document.querySelector('.modal-footer .contact-button.whatsapp');
  const modalTelegram = document.querySelector('.modal-footer .contact-button.telegram');
  
  if (modalWhatsApp) {
    // Corrected WhatsApp link
    modalWhatsApp.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services';
  }
  
  if (modalTelegram) {
    modalTelegram.href = 'https://t.me/+923107188339';
  }
  
  // Also update the links in the chatbot container
  const chatbotWhatsApp = document.querySelector('.chatbot .contact-btn.whatsapp');
  const chatbotTelegram = document.querySelector('.chatbot .contact-btn.telegram');
  
  if (chatbotWhatsApp) {
    // Corrected WhatsApp link
    chatbotWhatsApp.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services';
  }
  
  if (chatbotTelegram) {
    chatbotTelegram.href = 'https://t.me/+923107188339';
  }
  
  // =============== ANIMATION EFFECTS ===============
  // Service cards animation
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (serviceCards.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // =============== BACK TO TOP FUNCTIONALITY ===============
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopButton.style.display = "flex";
        backToTopButton.style.opacity = 1;
      } else {
        backToTopButton.style.opacity = 0;
        setTimeout(() => {
          if (window.scrollY <= 200) {
            backToTopButton.style.display = "none";
          }
        }, 300);
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  // =============== MODAL FUNCTIONALITY ===============
  // Function to open modal with product details - allows direct onclick calls from HTML
  window.openModal = function(productName, price) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPrice = document.getElementById('modalPrice');
    const modalSubtitle = document.getElementById('modalSubtitle');
    
    if (modalOverlay && modalPrice && modalSubtitle) {
      document.body.classList.add('modal-open'); // Add modal-open class
      modalPrice.textContent = price;
      modalSubtitle.textContent = productName;
      modalOverlay.style.display = 'flex';
    }
  };

  // Function to close modal
  function closeModal() {
    document.body.classList.remove('modal-open'); // Remove modal-open class
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  }

  const buyNowButtons = document.querySelectorAll('.order-button, .buy-btn:not([disabled])');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  // If there are "Buy Now" buttons but no onclick handlers (for legacy support)
  if (buyNowButtons.length > 0 && modalOverlay) {
    buyNowButtons.forEach(button => {
      // Only add event listener if there's no onclick attribute already
      if (!button.getAttribute('onclick')) {
        button.addEventListener('click', (e) => {
          // Find closest parent with price info
          const card = e.target.closest('.card');
          const tableRow = e.target.closest('.table-row');
          
          let priceText = '';
          let subtitleText = '';
          
          if (card) {
            const priceEl = card.querySelector('.price');
            const subtitleEl = card.querySelector('.card-header h3');
            
            if (priceEl && subtitleEl) {
              // Extract only the price (without original price)
              const priceMatch = priceEl.textContent.match(/\$\d+\.?\d*/);
              priceText = priceMatch ? priceMatch[0] : '';
              subtitleText = subtitleEl.textContent.trim();
            }
          } else if (tableRow) {
            const priceEl = tableRow.querySelector('.price');
            const productEl = tableRow.querySelector('.product-text');
            
            if (priceEl && productEl) {
              // Extract only the first price in the string
              const priceMatch = priceEl.textContent.match(/\$\d+\.?\d*/);
              priceText = priceMatch ? priceMatch[0] : '';
              subtitleText = productEl.textContent.trim();
            }
          }
          
          if (priceText && subtitleText) {
            window.openModal(subtitleText, priceText);
          }
        });
      }
    });
  }

  // Close modal on "X" click
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the modal
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  // Copy product name functionality
  const copyButton = document.querySelector('.copy-button');
  if (copyButton) {
    copyButton.addEventListener('click', () => {
      const modalSubtitle = document.getElementById('modalSubtitle');
      const textToCopy = modalSubtitle ? modalSubtitle.textContent : copyButton.getAttribute('data-product');
      
      if (!textToCopy) return;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Please copy this text manually: ' + textToCopy);
      });
    });
  }
  
  // =============== FAQ TOGGLE ===============
  // Function to toggle FAQ answers
  window.toggleFAQ = function(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  };
  
  // =============== PRODUCT DESCRIPTION TOGGLE ===============
  // Function to toggle product description visibility
  window.toggleDescription = function(descriptionId, element) {
    const description = document.getElementById(descriptionId);
    const icon = element.querySelector('i');
    
    if (description.style.display === 'block') {
      description.style.display = 'none';
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      description.style.display = 'block';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  };
  
  // =============== ENSURE FOOTER STICKS TO BOTTOM ===============
  // Force a small repaint to ensure footer alignment
  setTimeout(function() {
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.style.display = 'block';
      setTimeout(() => {
        footer.style.display = '';
      }, 10);
    }
  }, 300);
  
  // =============== RESPONSIVE MENU TOGGLE ===============
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinksContainer && navLinksContainer.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.menu-toggle')) {
      navLinksContainer.classList.remove('active');
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
    }
  });
  
  // =============== UPDATE COPYRIGHT YEAR ===============
  const copyrightYear = document.getElementById('year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});

// CSS for chatbot visibility
const style = document.createElement('style');
style.innerHTML = `
  .chat-container {
    display: none;
  }
  
  .chat-container.active {
    display: block;
  }
  
  /* Hide social icons when chat is open */
  body.chat-open .social-icons-left,
  body.chat-open .social-icons-right {
    z-index: 0 !important;
  }
`;
=======
document.addEventListener('DOMContentLoaded', function() {
  // =============== CHATBOT FUNCTIONALITY ===============
  const supportButton = document.getElementById('supportButton');
  const chatContainer = document.getElementById('chatContainer');
  const closeChat = document.getElementById('closeChat');
  
  // Function to update z-index for proper display
  function updateChatContainerZIndex() {
    if (!chatContainer) return;
    
    // Force social icons to stay behind the chat container
    document.querySelectorAll('.social-icons-left, .social-icons-right').forEach(el => {
      el.style.zIndex = '0'; // Lower z-index when chat is open
    });
    
    // Add a chat-open class to body for styling
    document.body.classList.add('chat-open');
  }
  
  // Show chat function - consolidated approach
  function showChat() {
    if (!chatContainer) return;
    
    chatContainer.style.display = 'block';
    chatContainer.classList.add('active');
    updateChatContainerZIndex();
  }
  
  // Hide chat function - consolidated approach
  function hideChat() {
    if (!chatContainer) return;
    
    // Restore normal z-index for social icons
    document.querySelectorAll('.social-icons-left, .social-icons-right').forEach(el => {
      el.style.zIndex = '900';
    });
    
    // Remove chat-open class from body
    document.body.classList.remove('chat-open');
    
    chatContainer.style.display = 'none';
    chatContainer.classList.remove('active');
  }
  
  // Initially hide the chat container
  hideChat();
  
  // Event listeners for chatbot
  if (supportButton) {
    supportButton.addEventListener('click', showChat);
  }
  
  if (closeChat) {
    closeChat.addEventListener('click', hideChat);
  }
  
  // =============== NAVBAR FUNCTIONALITY ===============
  // Get all navbar links
  const navLinks = document.querySelectorAll('.navbar .nav-links li a');
  
  // Add click event to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Special handling for contact link to open chat
      if (this.id === 'contact-link') {
        e.preventDefault(); // Prevent default anchor behavior
        showChat(); // Use the consolidated function
        
        // Scroll to where the chat is visible (top of page)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle Home link click - scroll to top
  const homeLink = document.getElementById('home-link');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add ID to premium services section for direct linking
  const servicesSection = document.querySelector('.premium-services');
  if (servicesSection) {
    servicesSection.id = 'services';
  }
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip for links that don't point to an ID or for the contact link
      if (targetId === '#' || this.id === 'contact-link') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate position to scroll to (with offset for fixed navbar)
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Scroll to the target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // =============== BUTTONS FUNCTIONALITY ===============
  // General buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get button text
      const buttonText = this.textContent.trim();
      
      // Show appropriate message based on which button was clicked
      if (buttonText.includes('Telegram')) {
        window.location.href = 'https://t.me/+923107188339';
      } else if (buttonText.includes('Whatsapp')) {
        // Corrected WhatsApp link with proper country code format
        window.location.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20more%20information';
      } else if (buttonText.includes('Discord')) {
        alert('Redirecting to Discord server...');
        // window.location.href = 'your-discord-link';
      } else if (buttonText.includes('Book A Call')) {
        alert('Opening booking calendar...');
        // window.location.href = 'your-calendar-link';
      } else {
        alert('Button clicked!');
      }
    });
  });

  // Contact buttons in chatbot - UPDATED WITH CORRECT PHONE NUMBER AND WHATSAPP FORMAT
  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.classList.contains('whatsapp') ? 'WhatsApp' : 
                    this.classList.contains('telegram') ? 'Telegram' : 'Telegram Community';
      
      // Updated links with the provided phone number and proper formatting
      const links = {
        'WhatsApp': 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20more%20information',
        'Telegram': 'https://t.me/+923107188339',
        'Telegram Community': 'https://t.me/+923107188339'
      };
      
      window.open(links[service], '_blank');
    });
  });
  
  // Update WhatsApp and Telegram links in the modal footer
  const modalWhatsApp = document.querySelector('.modal-footer .contact-button.whatsapp');
  const modalTelegram = document.querySelector('.modal-footer .contact-button.telegram');
  
  if (modalWhatsApp) {
    // Corrected WhatsApp link
    modalWhatsApp.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services';
  }
  
  if (modalTelegram) {
    modalTelegram.href = 'https://t.me/+923107188339';
  }
  
  // Also update the links in the chatbot container
  const chatbotWhatsApp = document.querySelector('.chatbot .contact-btn.whatsapp');
  const chatbotTelegram = document.querySelector('.chatbot .contact-btn.telegram');
  
  if (chatbotWhatsApp) {
    // Corrected WhatsApp link
    chatbotWhatsApp.href = 'https://wa.me/923107188339?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services';
  }
  
  if (chatbotTelegram) {
    chatbotTelegram.href = 'https://t.me/+923107188339';
  }
  
  // =============== ANIMATION EFFECTS ===============
  // Service cards animation
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (serviceCards.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // =============== BACK TO TOP FUNCTIONALITY ===============
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopButton.style.display = "flex";
        backToTopButton.style.opacity = 1;
      } else {
        backToTopButton.style.opacity = 0;
        setTimeout(() => {
          if (window.scrollY <= 200) {
            backToTopButton.style.display = "none";
          }
        }, 300);
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  // =============== MODAL FUNCTIONALITY ===============
  // Function to open modal with product details - allows direct onclick calls from HTML
  window.openModal = function(productName, price) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPrice = document.getElementById('modalPrice');
    const modalSubtitle = document.getElementById('modalSubtitle');
    
    if (modalOverlay && modalPrice && modalSubtitle) {
      document.body.classList.add('modal-open'); // Add modal-open class
      modalPrice.textContent = price;
      modalSubtitle.textContent = productName;
      modalOverlay.style.display = 'flex';
    }
  };

  // Function to close modal
  function closeModal() {
    document.body.classList.remove('modal-open'); // Remove modal-open class
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  }

  const buyNowButtons = document.querySelectorAll('.order-button, .buy-btn:not([disabled])');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  // If there are "Buy Now" buttons but no onclick handlers (for legacy support)
  if (buyNowButtons.length > 0 && modalOverlay) {
    buyNowButtons.forEach(button => {
      // Only add event listener if there's no onclick attribute already
      if (!button.getAttribute('onclick')) {
        button.addEventListener('click', (e) => {
          // Find closest parent with price info
          const card = e.target.closest('.card');
          const tableRow = e.target.closest('.table-row');
          
          let priceText = '';
          let subtitleText = '';
          
          if (card) {
            const priceEl = card.querySelector('.price');
            const subtitleEl = card.querySelector('.card-header h3');
            
            if (priceEl && subtitleEl) {
              // Extract only the price (without original price)
              const priceMatch = priceEl.textContent.match(/\$\d+\.?\d*/);
              priceText = priceMatch ? priceMatch[0] : '';
              subtitleText = subtitleEl.textContent.trim();
            }
          } else if (tableRow) {
            const priceEl = tableRow.querySelector('.price');
            const productEl = tableRow.querySelector('.product-text');
            
            if (priceEl && productEl) {
              // Extract only the first price in the string
              const priceMatch = priceEl.textContent.match(/\$\d+\.?\d*/);
              priceText = priceMatch ? priceMatch[0] : '';
              subtitleText = productEl.textContent.trim();
            }
          }
          
          if (priceText && subtitleText) {
            window.openModal(subtitleText, priceText);
          }
        });
      }
    });
  }

  // Close modal on "X" click
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the modal
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  
  // Copy product name functionality
  const copyButton = document.querySelector('.copy-button');
  if (copyButton) {
    copyButton.addEventListener('click', () => {
      const modalSubtitle = document.getElementById('modalSubtitle');
      const textToCopy = modalSubtitle ? modalSubtitle.textContent : copyButton.getAttribute('data-product');
      
      if (!textToCopy) return;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Please copy this text manually: ' + textToCopy);
      });
    });
  }
  
  // =============== FAQ TOGGLE ===============
  // Function to toggle FAQ answers
  window.toggleFAQ = function(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  };
  
  // =============== PRODUCT DESCRIPTION TOGGLE ===============
  // Function to toggle product description visibility
  window.toggleDescription = function(descriptionId, element) {
    const description = document.getElementById(descriptionId);
    const icon = element.querySelector('i');
    
    if (description.style.display === 'block') {
      description.style.display = 'none';
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      description.style.display = 'block';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    }
  };
  
  // =============== ENSURE FOOTER STICKS TO BOTTOM ===============
  // Force a small repaint to ensure footer alignment
  setTimeout(function() {
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.style.display = 'block';
      setTimeout(() => {
        footer.style.display = '';
      }, 10);
    }
  }, 300);
  
  // =============== RESPONSIVE MENU TOGGLE ===============
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinksContainer && navLinksContainer.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.menu-toggle')) {
      navLinksContainer.classList.remove('active');
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
    }
  });
  
  // =============== UPDATE COPYRIGHT YEAR ===============
  const copyrightYear = document.getElementById('year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});

// CSS for chatbot visibility
const style = document.createElement('style');
style.innerHTML = `
  .chat-container {
    display: none;
  }
  
  .chat-container.active {
    display: block;
  }
  
  /* Hide social icons when chat is open */
  body.chat-open .social-icons-left,
  body.chat-open .social-icons-right {
    z-index: 0 !important;
  }
`;
>>>>>>> b70c645dee394802a87da25431caeaac7557bbf5
document.head.appendChild(style);