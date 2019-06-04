(() =>{
    function createListener(request, sender, sendResponse) {
        if (request.method === "create") {
            var numColumns = request.numColumns || 12;
            var div = document.createElement('div');
            div.setAttribute("class", "Grid-Layout");
            var output = '<div class="Grid-Container"> \
            <div class="Grid-row">';
            for (var i = 0; i < numColumns; i += 1) {
                output += '<div class="Grid-columns"></div>';
            }
            output += '</div> \
            </div>';
            div.innerHTML = output;
            document.body.appendChild(div);
            respond(1);
        }
    }
    chrome.runtime.onMessage.addListener(createListener);

    function addCSSListener(request, sender, sendResponse) {
        if (request.method == "createCss") {

            var customGridStyles = document.createElement('style');
            customGridStyles.id = "create-grid-style";
            customGridStyles.appendChild(document.createTextNode(
                request.css
            ));

            document.head.appendChild(customGridStyles);
        }
    }
    chrome.runtime.onMessage.addListener(addCSSListener);

    function destroyListener(request, sender, sendResponse) {
        if (request.method == "destroy" && document.getElementsByClassName('Grid-Layout').length) {
            document.body.removeChild(document.getElementsByClassName('Grid-Layout')[0]);
            respond(0);
        }
    }
    chrome.runtime.onMessage.addListener(destroyListener);
    
    function removeCSSListener(request, sender, sendResponse) {
        if (request.method == "removeCSS") {
            var customGridStyles = document.getElementById("create-grid-style");
            if (customGridStyles) {
                customGridStyles.parentNode.removeChild(customGridStyles);
            }
        }
    }
    chrome.runtime.onMessage.addListener(removeCSSListener);
    
    // function toggleGridListener(request, sender, sendResponse) {
    //     if (document.getElementsByClassName('Grid-Layout').length) {
    //         request.method = 'destroy';
    //         destroyListener(request, sender, sendResponse);
    //     } else {
    //         request.method = 'create';
    //         createListener(request, sender, sendResponse);
    //     }
    // }
    // chrome.runtime.onMessage.addListener(toggleGridListener);

    var respond = ((gridStatus) =>{
        chrome.runtime.sendMessage({status: gridStatus});
    });
    var isResize = false;

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
                case (payload.ScreenAvailDPI.availWidth >= 1440):
                    payload.key = 'xl';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 1024):
                    payload.key = 'lg';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 768):
                    payload.key = 'md';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 414):
                    kpayload.keyey = 'sm';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 375):
                    payload.key = 'xs';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 320):
                    payload.key = 'xxs';
                    break;
                default:
                    payload.key = 'xl';
            }
            sendResponse(payload);
        }
    }
    chrome.runtime.onMessage.addListener(getGridType);

    window.addEventListener('resize',() => {
        isResize = true;
    },false);
})();