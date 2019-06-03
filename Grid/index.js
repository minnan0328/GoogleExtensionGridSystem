var popup = (() =>{
  var gridToggle = document.getElementById('gridToggle');
  var currentChromeTabId = undefined;
  window.addEventListener('load', function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        currentChromeTabId = tabs[0].id;
        //Initialize state
        popup.init();
    });
  });
    gridToggle.addEventListener('click', function () {
      console.log(currentChromeTabId)
      gridController.updateGrid(currentChromeTabId);
    });
    var init = () => {
      console.log("createGrid")
      chrome.tabs.executeScript(currentChromeTabId, {
        file: "/controllers/grid.js"
      });
    }
    return {
      init: init
    }
})();
