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
    chrome.tabs.executeScript(currentChromeTabId, {file: "/controllers/gridStatus.js"});
  }
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.status !== undefined) {
            if (request.status === 1 && SketchGrid.checked === false) {
                console.log('Grid already enabled on page');
                SketchGrid.checked = true;
            } else if (request.status === 0 && SketchGrid.checked === true) {
              SketchGrid.checked = false;
            }
        }
    }
);
  return {
    init: init
  }
})();
