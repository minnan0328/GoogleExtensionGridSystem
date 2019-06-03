var gridController = (() => {
    var updateGrid = ((currentTabId) => {
        toggleGrid(currentTabId);
        console.log("updateGrid", currentTabId)
    });
    var toggleGrid = ((currentTabId) => {
        var gridToggle = document.getElementById('gridToggle');
        if (gridToggle.checked){
            console.log(gridToggle.checked, currentTabId)
            createGrid(currentTabId)
        }
    });
    var createGrid = ((currentTabId) => {
        chrome.tabs.sendMessage(currentTabId, {
            method: "create",
            tabId: currentTabId
        });
    })
    return {
        toggleGrid: toggleGrid,
        updateGrid: updateGrid
    }
})();