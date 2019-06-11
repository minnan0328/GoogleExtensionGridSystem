(() =>{
    var requestData = [];
    var resizeData = {};
    var isResize = false;
    chrome.runtime.onMessage.addListener(createListener);
    chrome.runtime.onMessage.addListener(addCSSListener);
    chrome.runtime.onMessage.addListener(destroyListener);
    chrome.runtime.onMessage.addListener(removeCSSListener);
    chrome.runtime.onMessage.addListener(getGridType);
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        requestData.push(request);
        if (request.method === 'executeScript' && request.greeting) {
            sendResponse({message: false});
        }else{
            sendResponse({message: true});
        }
    });
    function createListener(request, sender, sendResponse) {
        if (request.method === "create") {
            var numColumns = request.numColumns || 12;
            var div = document.createElement('div');
            div.id = request.type;
            div.setAttribute("class", `${request.type}-Grid-Layout ${request.VisualsType}`);
            var output = '<div class="Grid-Container"> \
            <div class="Grid-row">';
            for (var i = 0; i < numColumns; i += 1) {
                output += '<div class="Grid-columns"></div>';
            }
            output += '</div> \
            </div>';
            div.innerHTML = output;
            document.body.appendChild(div);
        }
    }
    function addCSSListener(request, sender, sendResponse) {
        if (request.method === "createCss") {
            var customGridStyles = document.createElement('style');
            customGridStyles.id = `${request.type}-grid-style`;
            customGridStyles.appendChild(document.createTextNode(
                request.css
            ));
            document.head.appendChild(customGridStyles);
        }
    }
    function destroyListener(request, sender, sendResponse) {
        if (request.method === "removeGrid" && document.getElementsByClassName(`${request.type}-Grid-Layout`).length) {
            document.body.removeChild(document.getElementsByClassName(`${request.type}-Grid-Layout`)[0]);
        }
    }
    function removeCSSListener(request, sender, sendResponse) {
        if (request.method === "removeCSS") {
            var customGridStyles = document.getElementById(`${request.type}-grid-style`);
            if (customGridStyles) {
                customGridStyles.parentNode.removeChild(customGridStyles);
            }
        }
    }
    function getGridType (request, sender, sendResponse){
        if (request.method === "getGridType") {
            resizeData = request;
            var payload = {
                ScreenAvailDPI: {
                   availWidth: window.screen.availWidth,
                   availHeight: window.screen.availHeight
                },
                key: ''
            }
            switch (true) {
                case (payload.ScreenAvailDPI.availWidth >= 1199.99):
                    payload.key = 'xl';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 991.99):
                    payload.key = 'lg';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 767.99):
                    payload.key = 'md';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 575.99):
                    payload.key = 'sm';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 413.99):
                    payload.key = 'max';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 374.99):
                    payload.key = 'iphone-xs';
                    break;
                case (payload.ScreenAvailDPI.availWidth >= 319.99):
                    payload.key = 'xs';
                    break;
                default:
                    payload.key = 'xl';
            }
            sendResponse(payload);
        }
    }
    // window.addEventListener('resize',() => {
    //     isResize = true;
    //     if (isResize){
    //         console.log(resizeData)
    //         chrome.runtime.sendMessage({
    //             method: 'openResize',
    //             type: resizeData.type,
    //             tabId: resizeData.tabId
    //         });
    //     }
    // },false);
})();