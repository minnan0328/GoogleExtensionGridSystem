var popup = (() =>{
  var Sketch = document.getElementById('Sketch');
  var Bootstrap = document.getElementById('Bootstrap');
  var FillGrid = document.getElementById('FillGrid');
  var StrokeOutline = document.getElementById('StrokeOutline');
  var currentChromeTabId = undefined;
  var Visuals = undefined;
  window.addEventListener('load', function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        currentChromeTabId = tabs[0].id;
        //Initialize state
        popup.init();
    });
  });
  Sketch.addEventListener('click', function () {
    Bootstrap.checked = false;
    checkedCilckType();
    sendCreateGrid('Sketch', Visuals);
  });
  Bootstrap.addEventListener('click', function () {
    Sketch.checked = false;
    checkedCilckType()
  })
  FillGrid.addEventListener('click', function () {
      StrokeOutline.checked = false;
      StrokeOutline.disabled = false;
      FillGrid.disabled = true;
      Visuals = 'FillGrid';
      if (Sketch.checked) {
        sendCreateGrid('Sketch', Visuals);
      }
      if (Bootstrap.checked) {
        console.log('Bootstrap')
      }
  })
  StrokeOutline.addEventListener('click', function () {
    FillGrid.checked = false;
    FillGrid.disabled = false;
    StrokeOutline.disabled = true;
    Visuals = 'StrokeOutline';
    if (Sketch.checked){
      sendCreateGrid('Sketch', Visuals);
    }
    if(Bootstrap.checked) {
      console.log('Bootstrap')
    }
  })
  function sendCreateGrid(type, Visuals) {
    gridController.updateGrid(currentChromeTabId, {
      type: type,
      VisualsType: Visuals
    });
  }
  function checkedCilckType(){
    if (Sketch.checked || Bootstrap.checked) {
      FillGrid.checked = true;
      FillGrid.disabled = true;
      StrokeOutline.disabled = false;
      Visuals = 'FillGrid';
      if (FillGrid.checked) {
        StrokeOutline.checked = false;
      }
    }else {
      FillGrid.checked = false;
      StrokeOutline.checked = false;
      FillGrid.disabled = true;
      StrokeOutline.disabled = true;
    }
  }
  var init = () => {
    chrome.tabs.executeScript(currentChromeTabId, {file: "/executedScripts/grid.js"});
    chrome.tabs.executeScript(currentChromeTabId, {file: "/executedScripts/gridStatus.js"});
  }
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.SketchStatus !== undefined) {
      if (request.SketchStatus === 1 && Sketch.checked === false) {
        Sketch.checked = true;
        // FillGrid.checked = true;
        // StrokeOutline.checked = false;
        // StrokeOutline.disabled = false;
        // FillGrid.disabled = false;
        calculationGridSetting.getFormValueSetting();
      } else if (request.SketchStatus === 0 && Sketch.checked === true) {
        Sketch.checked = false;
        // FillGrid.disabled = true;
        // FillGrid.checked = false;
        // StrokeOutline.disabled = true;
        // StrokeOutline.checked = false;
      }
    }
  }
);
  return {
    init: init
  }
})();
