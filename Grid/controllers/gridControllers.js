var gridController = (() => {
    var updateGrid = ((currentTabId, payload) => {
        var SketchGrid = document.getElementById('SketchGrid');
        if (SketchGrid.checked) {
            getGridSetting(currentTabId, payload)
            // createGrid(currentTabId)
        }
    });
    var createGrid = ((currentTabId,) => {
        chrome.tabs.sendMessage(currentTabId, {
            method: "create",
            tabId: currentTabId
        });
    })
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
                CalculationGrid(currentTabId,GridData)
            }).catch((error) =>{
                console.log(error)
            })
        });
    })
    var CalculationGrid = ((currentTabId, GridData) => {
        var CalculationResult = CalculationGridSetting.init(GridData)
        console.log(CalculationResult)
    })
    return {
        updateGrid: updateGrid
    }
})();