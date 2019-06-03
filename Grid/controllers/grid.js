(() =>{
    var chromeMessageListeners = [];
    function createListener(request, sender, sendResponse) {
        if (request.method == "create") {
            var numColumns = 12;

            var div = document.createElement('div');
            div.setAttribute("class", "cb-grid-lines");

            var output = '<div class="grid-overlay-container"> \
            <div class="grid-overlay-row">';

            for (var i = 0; i < numColumns; i += 1) {
                output += '<div class="grid-overlay-col"></div>';
            }

            output += '</div> \
            </div>';

            div.innerHTML = output;
            document.body.appendChild(div);

        }
    }
    chrome.runtime.onMessage.addListener(createListener);
    chromeMessageListeners.push(createListener);
})();