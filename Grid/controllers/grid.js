(() =>{
    var chromeMessageListeners = [];
    function createListener(request, sender, sendResponse) {
        if (request.method === "create") {
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

    function getGridType (request, sender, sendResponse){
        if (request.method === "getGridType") {
            var payload = {
                ScreenAvailDPI: {
                   availWidth: window.screen.availWidth,
                   availHeight: window.screen.availHeight
                },
                key: ''
            }
            switch (true) {
                case (payload.ScreenAvailDPI >= 1440):
                    payload.key = 'xl';
                    break;
                case (payload.ScreenAvailDPI >= 1024):
                    payload.key = 'lg';
                    break;
                case (payload.ScreenAvailDPI >= 768):
                    payload.key = 'md';
                    break;
                case (payload.ScreenAvailDPI >= 414):
                    kpayload.keyey = 'sm';
                    break;
                case (payload.ScreenAvailDPI >= 375):
                    payload.key = 'xs';
                    break;
                case (payload.ScreenAvailDPI >= 320):
                    payload.key = 'xxs';
                    break;
                default:
                    payload.key = 'xl';
            }
            sendResponse(payload)
        }
    }
    chrome.runtime.onMessage.addListener(getGridType);
})();