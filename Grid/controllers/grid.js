(() =>{
    var requestData = [];
    var resizeData = {};
    var isResize = false;
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        requestData.push(request);
    });
    chrome.runtime.onMessage.addListener(createListener);
    chrome.runtime.onMessage.addListener(addCSSListener);
    chrome.runtime.onMessage.addListener(destroyListener);
    chrome.runtime.onMessage.addListener(removeCSSListener);
    chrome.runtime.onMessage.addListener(getGridType);
    function createListener(request, sender, sendResponse) {
        if (request.method === "create") {
            var numColumns = request.numColumns || 12;
            var div = document.createElement('div');
            div.setAttribute("class", `${request.type}-Grid-Layout`);
            var output = '<div class="Grid-Container"> \
            <div class="Grid-row">';
            for (var i = 0; i < numColumns; i += 1) {
                output += '<div class="Grid-columns"></div>';
            }
            output += '</div> \
            </div>';
            div.innerHTML = output;
            document.body.appendChild(div);
            SketchRespond(1);
        }
    }
    function addCSSListener(request, sender, sendResponse) {
        if (request.method == "createCss") {
            var customGridStyles = document.createElement('style');
            customGridStyles.id = `${request.type}-grid-style`;
            customGridStyles.appendChild(document.createTextNode(
                request.css
            ));
            document.head.appendChild(customGridStyles);
        }
    }
    function destroyListener(request, sender, sendResponse) {
        if (request.method == "destroy" && document.getElementsByClassName(`${request.type}-Grid-Layout`).length) {
            document.body.removeChild(document.getElementsByClassName(`${request.type}-Grid-Layout`)[0]);
            SketchRespond(0);
        }
    }
    function removeCSSListener(request, sender, sendResponse) {
        if (request.method == "removeCSS") {
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
                    payload.key = 'sm';
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
    var SketchRespond = (gridStatus) => {
        chrome.runtime.sendMessage({
            SketchStatus: gridStatus
        });
    };
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