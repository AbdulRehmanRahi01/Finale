// Enhanced modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const copyButton = document.querySelector('.copy-button');
  const modalPrice = document.getElementById('modalPrice');
  const modalSubtitle = document.getElementById('modalSubtitle');
  
  // Function to open modal with product details
  window.openModal = function(productName, price) {
    modalPrice.textContent = price;
    modalSubtitle.textContent = productName;
    
    // Display modal
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal function
  function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  // Close button event
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close on outside click
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalOverlay.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Copy button functionality
  if (copyButton) {
    copyButton.addEventListener('click', function() {
      const productName = modalSubtitle.textContent;
      
      // Try to use the modern clipboard API
      if (navigator.clipboard) {
        navigator.clipboard.writeText(productName)
          .then(() => {
            showCopyFeedback();
          })
          .catch(() => {
            fallbackCopyText(productName);
          });
      } else {
        fallbackCopyText(productName);
      }
    });
  }
  
  // Show visual feedback after copying
  function showCopyFeedback() {
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-clipboard"></i> Copy product name';
    }, 2000);
  }
  
  // Fallback copy method for older browsers
  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea invisible
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    
    document.body.removeChild(textArea);
  }
});