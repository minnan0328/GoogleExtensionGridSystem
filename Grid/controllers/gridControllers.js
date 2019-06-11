var gridController = (() => {
    var updateGrid = (currentTabId, payload) => {
        var Sketch = document.getElementById('Sketch');
        var Bootstrap = document.getElementById('Bootstrap');
        var FillGrid = document.getElementById('FillGrid');
        var StrokeOutline = document.getElementById('StrokeOutline');
        if (Sketch.checked || Bootstrap.checked || FillGrid.checked || StrokeOutline.checked) {
            removeGrid(currentTabId, payload)
            getGridSetting(currentTabId, payload)
        }else{
            removeGrid(currentTabId, payload)
        }
    }
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     if (request.method === 'openResize'){
    //         console.log('openResize')
    //         updateGrid(request.tabId, {
    //             type: request.type
    //         })
    //     }
    // });
    var getGridSetting = (currentTabId, payload) => {
        console.log(currentTabId, payload)
        chrome.tabs.sendMessage(currentTabId, {
            method: "getGridType",
            type: payload.type,
            tabId: currentTabId
        }, (response) => {
            fetch(`./../static/data/${payload.type}.json`).then((res) => {
                return res.json();
            }).then((result) => {
                calculationGrid(currentTabId,{
                    ScreenAvailDPI: response.ScreenAvailDPI,
                    setting: result[payload.type][response.key],
                    type: payload.type,
                    VisualsType: payload.VisualsType
                })
            }).catch((error) =>{
                console.log(error)
            })
        })
    }
    var calculationGrid = (currentTabId, payload) => {
        var calculationResult = calculationGridSetting.init(payload)
        createGrid(currentTabId,calculationResult)
        createGridStyle(currentTabId,calculationResult)
    }
    var createGrid = (currentTabId, payload) => {
        // (payload.type === 'Sketch') && SketchRespond(currentTabId,1, payload.type);
        // (payload.type === 'Bootstrap') && BootstrapRespond(currentTabId,1, payload.type);
        chrome.tabs.sendMessage(currentTabId, {
            method: "create",
            type: payload.type,
            numColumns: payload.numColumns,
            VisualsType: payload.VisualsType
        })
    }
    var createGridStyle = (currentTabId, payload) => {
        var GridCss = createGridCss.init(payload)
        chrome.tabs.sendMessage(currentTabId, {
            method: "createCss",
            type: payload.type,
            css: GridCss
        })
    }
    var removeGrid = (currentTabId, payload) => {
        // (payload.type === 'Sketch') && SketchRespond(currentTabId, 0, payload.type);
        // (payload.type === 'Bootstrap') && BootstrapRespond(currentTabId,0, payload.type);
        chrome.tabs.sendMessage(currentTabId, {
            method: "removeGrid",
            type: payload.type
        })
        chrome.tabs.sendMessage(currentTabId, {
            method: "removeCSS",
            type: payload.type
        })
    }
    var SketchRespond = (currentTabId,gridStatus, type) => {
        chrome.tabs.sendMessage(currentTabId ,{
            SketchStatus: gridStatus,
            type: type
        })
    }
    var BootstrapRespond = (currentTabId,gridStatus, type) => {
        chrome.tabs.sendMessage(currentTabId ,{
            BootstrapStatus: gridStatus,
            type: type
        })
    }
    return {
        updateGrid: updateGrid,
        getGridSetting: getGridSetting
    }
})();