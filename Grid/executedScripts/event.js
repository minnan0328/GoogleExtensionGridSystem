//On installation, clear all non-default extension settings data
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.get(function (allData) {

        var defaultSettings = allData['default'];

        chrome.storage.sync.clear(function () {
            if (defaultSettings) {
                chrome.storage.sync.set({
                    'default': defaultSettings
                });
            }
        });

    });
});
/**
 * set mouse hover title
 * while user hover on the extension icon
 */
chrome.browserAction.setTitle({
    title: 'Use ( Alt + A ) to activate Design Grid Overlay'
});
//Clear tab sync storage when it is closed
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    chrome.storage.sync.remove(tabId.toString());
});

//On keyboard command
chrome.commands.onCommand.addListener(function (command) {
    // this function is not scaleable

    var type = '';
    switch (command) {
        case 'Sketch-Layout':
            type = 'Sketch';
            break;
        case 'Bootstrap-Layout':
            type = 'Sketch';
            break;
    }

    chrome.tabs.query({currentWindow: true,active: true}, function (tabs) {
        var currentId = tabs[i].id;
        gridController.getGridSetting(currentId, {
            type: type,
            VisualsType: 'StrokeOutline'
        });
        // for (var i = 0; i < tabs.length; i++) {
        //     if (chrome.runtime.lastError) {
        //         console.warn("Whoops.. " + chrome.runtime.lastError.message);
        //     } else {
        //         if (tabs[i]) {
        //             var currentId = tabs[i].id;
        //             chrome.tabs.sendMessage(currentId, {
        //                 method: method,
        //                 tabId: currentId
        //             });
        //         }
        //     }
        // }
    });
});
