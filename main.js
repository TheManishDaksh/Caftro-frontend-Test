let saveButton = null;

document.addEventListener('mouseup', function(e) {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText.length > 0) {
        showSaveButton(e.pageX, e.pageY, selectedText);
    } else {
        removeSaveButton();
    }
});

function showSaveButton(x, y, selectedText) {
    removeSaveButton();

    saveButton = document.createElement('button');
    saveButton.textContent = 'Save Highlight';
    saveButton.style.position = 'absolute';
    saveButton.style.top = `${y + 10}px`;
    saveButton.style.left = `${x - 50}px`;
    saveButton.style.zIndex = 9999;
    saveButton.className = 'text-highlighter-button';
    document.body.appendChild(saveButton);

    saveButton.addEventListener('click', function() {
        saveHighlight(selectedText);
        console.log("data saved");
        
        removeSaveButton();
    });
    
    // Close the button when clicking elsewhere
    document.addEventListener('mousedown', function onMouseDown(event) {
        if (event.target !== saveButton) {
            removeSaveButton();
            document.removeEventListener('mousedown', onMouseDown);
        }
    });
}

function removeSaveButton() {
    if (saveButton) {
        saveButton.remove();
        saveButton = null;
    }
}

function saveHighlight(text) {
    chrome.storage.local.get(['highlights'], function(result) {
        let highlights = result.highlights || [];
        highlights.push({
            text: text,
            timestamp: new Date().toISOString()
        });
        chrome.storage.local.set({ highlights: highlights });
    });
}