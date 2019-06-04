var popup = (() =>{
  var SketchGrid = document.getElementById('SketchGrid');
  var currentChromeTabId = undefined;
  window.addEventListener('load', function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        currentChromeTabId = tabs[0].id;
        //Initialize state
        popup.init();
    });
  });
  SketchGrid.addEventListener('click', function () {
    gridController.updateGrid(currentChromeTabId, {
      type: "Sketch",
    });
  });
  var init = () => {
    chrome.tabs.executeScript(currentChromeTabId, {file: "/controllers/grid.js"});
    // chrome.tabs.executeScript(currentChromeTabId, {file: "/controllers/getGridSetting.js"});
  }
  return {
    init: init
  }
})();
