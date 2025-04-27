document.addEventListener('DOMContentLoaded', function() {
    loadHighlights();

    document.getElementById('summarizeBtn').addEventListener('click', summarizeHighlights);
});

function loadHighlights() {
    chrome.storage.local.get(["highlights"], function(result) {
        const highlights = result.highlights || [];
        const list = document.getElementById('highlightList');
        list.innerHTML = '';

        highlights.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `"${item.text}" (${new URL(item.url).hostname})`;

            const delBtn = document.createElement('button');
            delBtn.textContent = '🗑️';
            delBtn.style.marginLeft = '10px';
            delBtn.onclick = function() {
                deleteHighlight(index);
            };

            li.appendChild(delBtn);
            list.appendChild(li);
        });
    });
}

function deleteHighlight(index) {
    chrome.storage.local.get(["highlights"], function(result) {
        let highlights = result.highlights || [];
        highlights.splice(index, 1);
        chrome.storage.local.set({ highlights: highlights }, function() {
            loadHighlights();
        });
    });
}

