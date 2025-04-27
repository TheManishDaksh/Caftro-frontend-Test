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
    saveButton.textContent = 'Save';
    saveButton.style.position = 'absolute';
    saveButton.style.top = `${y}px`;
    saveButton.style.left = `${x}px`;
    saveButton.style.zIndex = 9999;
    saveButton.className = 'save-highlight-button';
    document.body.appendChild(saveButton);

    saveButton.addEventListener('click', function() {
        saveHighlight(selectedText);
        removeSaveButton();
    });
}

function removeSaveButton() {
    if (saveButton) {
        saveButton.remove();
        saveButton = null;
    }
}

function saveHighlight(text) {
    chrome.storage.local.get(["highlights"], function(result) {
        let highlights = result.highlights || [];
        highlights.push({
            text: text,
            url: window.location.href,
            timestamp: new Date().toISOString()
        });
        chrome.storage.local.set({ highlights: highlights });
    });
}
