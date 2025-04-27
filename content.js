document.addEventListener('DOMContentLoaded', function() {
    loadHighlights();
  });
  
  function loadHighlights() {
    chrome.storage.local.get(['highlights'], function(result) {
      const highlightsContainer = document.getElementById('highlights-container');
      const emptyState = document.getElementById('empty-state');
      highlightsContainer.innerHTML = '';
      
      const highlights = result.highlights || [];
      
      if (highlights.length === 0) {
        emptyState.style.display = 'block';
        return;
      }
      
      emptyState.style.display = 'none';
      
      // Sort highlights by timestamp (newest first)
      highlights.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      highlights.forEach(function(highlight, index) {
        const highlightElement = document.createElement('div');
        highlightElement.className = 'highlight-item';
        
        const date = new Date(highlight.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        highlightElement.innerHTML = `
          "${highlight.text}"
          
            ${highlight.title || highlight.url}
          
          
            ${formattedDate}
            Delete
          
        `;
        
        highlightsContainer.appendChild(highlightElement);
      });
      
      // Add delete functionality
      document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          deleteHighlight(index);
        });
      });
    });
  }
  
  function deleteHighlight(index) {
    chrome.storage.local.get(['highlights'], function(result) {
      let highlights = result.highlights || [];
      highlights.splice(index, 1);
      chrome.storage.local.set({ highlights: highlights }, function() {
        loadHighlights(); // Reload the list after deletion
      });
    });
  }