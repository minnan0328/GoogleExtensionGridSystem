var gridController = (() => {
    var updateGrid = ((currentTabId, payload) => {
        var SketchGrid = document.getElementById('SketchGrid');
        if (SketchGrid.checked) {
            getGridSetting(currentTabId, payload)
        }else{
            removeGrid(currentTabId)
        }
    });
    var getGridSetting = ((currentTabId, payload) => {
        chrome.tabs.sendMessage(currentTabId, {
            method: "getGridType",
            tabId: currentTabId
        }, (response) => {
            fetch(`./../static/data/${payload.type}.json`).then((res) => {
                return res.json();
            }).then((result) => {
                var GridData = {
                    ScreenAvailDPI: response.ScreenAvailDPI,
                    setting: result[payload.type][response.key]
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
        respond(1);
        chrome.tabs.sendMessage(currentTabId, {
            method: "create",
            tabId: currentTabId,
            numColumns: calculationResult.numColumns
        });
    })
    var createGridStyle = ((currentTabId,calculationResult)=>{
        var GridCss = createGridCss.init(calculationResult)
        chrome.tabs.sendMessage(currentTabId, {
            method: "createCss",
            css: GridCss
        });
    })
    var removeGrid = ((currentTabId) =>{
        respond(0);
        chrome.tabs.sendMessage(currentTabId, {method: "destroy", tabId: currentTabId});
        chrome.tabs.sendMessage(currentTabId, {method: "removeCSS", tabId: currentTabId});
    })
    var respond = ((gridStatus) => {
        chrome.runtime.sendMessage({status: gridStatus});
    });
    return {
        updateGrid: updateGrid
    }
})();