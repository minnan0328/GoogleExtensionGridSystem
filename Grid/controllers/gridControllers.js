var gridController = (() => {
    var updateGrid = ((currentTabId, payload) => {
        var SketchGrid = document.getElementById('SketchGrid');
        if (SketchGrid.checked) {
            removeGrid(currentTabId, payload)
            getGridSetting(currentTabId, payload)
        }else{
            removeGrid(currentTabId, payload)
        }
    });
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     if (request.method === 'openResize'){
    //         console.log('openResize')
    //         updateGrid(request.tabId, {
    //             type: request.type
    //         })
    //     }
    // });
    var getGridSetting = ((currentTabId, payload) => {
        chrome.tabs.sendMessage(currentTabId, {
            method: "getGridType",
            type: payload.type,
            tabId: currentTabId
        }, (response) => {
            fetch(`./../static/data/${payload.type}.json`).then((res) => {
                return res.json();
            }).then((result) => {
                var GridData = {
                    ScreenAvailDPI: response.ScreenAvailDPI,
                    setting: result[payload.type][response.key],
                    type: payload.type
                }
                calculationGrid(currentTabId,GridData)
            }).catch((error) =>{
                console.log(error)
            })
        });
    })
    var calculationGrid = ((currentTabId, GridData) => {
        var calculationResult = calculationGridSetting.init(GridData)
        createGrid(currentTabId,calculationResult)
        createGridStyle(currentTabId,calculationResult)
    })
    var createGrid = ((currentTabId,calculationResult) => {
        SketchRespond(1);
        chrome.tabs.sendMessage(currentTabId, {
            method: "create",
            type: calculationResult.type,
            numColumns: calculationResult.numColumns
        });
    })
    var createGridStyle = ((currentTabId,calculationResult) => {
        var GridCss = createGridCss.init(calculationResult)
        chrome.tabs.sendMessage(currentTabId, {
            method: "createCss",
            type: calculationResult.type,
            css: GridCss
        });
    })
    var removeGrid = ((currentTabId, payload) => {
        SketchRespond(0);
        chrome.tabs.sendMessage(currentTabId, {
            method: "destroy",
            type: payload.type
        });
        chrome.tabs.sendMessage(currentTabId, {
            method: "removeCSS",
            type: payload.type
        });
    })
    var SketchRespond = ((gridStatus) => {
        chrome.runtime.sendMessage({
            SketchStatus: gridStatus
        });
    });
    return {
        updateGrid: updateGrid
    }
})();