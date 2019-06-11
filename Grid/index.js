var popup = (() =>{
  var Sketch = document.getElementById('Sketch');
  var Bootstrap = document.getElementById('Bootstrap');
  var FillGrid = document.getElementById('FillGrid');
  var StrokeOutline = document.getElementById('StrokeOutline');
  var currentChromeTabId = undefined;
  var Visuals = undefined;
  var isVisualFill = false;
  window.addEventListener('load', function () {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        currentChromeTabId = tabs[0].id;
        popup.init();
        chrome.tabs.executeScript(currentChromeTabId, {file: "/executedScripts/gridStatus.js"});
    });
  });
  Sketch.addEventListener('click', function () {
    Bootstrap.checked = false;
    checkedCilckType();
    sendCreateGrid('Sketch', Visuals);
    sendRemoveGrid('Bootstrap');
  });
  Bootstrap.addEventListener('click', function () {
    Sketch.checked = false;
    checkedCilckType();
    sendCreateGrid('Bootstrap', Visuals);
    sendRemoveGrid('Sketch');
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
        sendCreateGrid('Bootstrap', Visuals);
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
      sendCreateGrid('Bootstrap', Visuals);
    }
  })
  function sendCreateGrid(type, Visuals) {
    gridController.updateGrid(currentChromeTabId, {
      type: type,
      VisualsType: Visuals
    });
  }
  function sendRemoveGrid(type) {
    chrome.tabs.sendMessage(currentChromeTabId, {
      method: 'removeGrid',
      type: type
    });
    chrome.tabs.sendMessage(currentChromeTabId, {
      method: 'removeCSS',
      type: type
    });
  }
  function checkedCilckType(){
    if (Sketch.checked || Bootstrap.checked) {
      if (isVisualFill){
        Visuals = 'FillGrid';
        FillGrid.checked = true;
        FillGrid.disabled = true;
        StrokeOutline.checked = false;
        StrokeOutline.disabled = false;
      }else{
        Visuals = 'StrokeOutline';
        FillGrid.checked = false;
        FillGrid.disabled = false;
        StrokeOutline.checked = true;
        StrokeOutline.disabled = true;
      }
    }else {
      FillGrid.checked = false;
      StrokeOutline.checked = false;
      FillGrid.disabled = true;
      StrokeOutline.disabled = true;
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.SketchStatus !== undefined && request.type === 'Sketch') {
      if (request.SketchStatus === 1 && Sketch.checked === false) {
        Sketch.checked = true;
        Bootstrap.checked = false;
        calculationGridSetting.getFormValueSetting();
      } else if (request.SketchStatus === 0 && Sketch.checked === true) {
        Sketch.checked = false;
      }
    }
    if (request.BootstrapStatus !== undefined && request.type === 'Bootstrap') {
      if (request.BootstrapStatus === 1 && Bootstrap.checked === false) {
        Bootstrap.checked = true;
        Sketch.checked = false;
        calculationGridSetting.getFormValueSetting();
      } else if (request.BootstrapStatus === 0 && Bootstrap.checked === true) {
        Bootstrap.checked = false;
      }
    }
    if (request.StrokeOutlineStatus !== undefined && request.type === 'StrokeOutline') {
      isVisualFill = request.isVisualFill
      if (request.StrokeOutlineStatus === 1 && StrokeOutline.checked === false) {
        FillGrid.checked = false;
        FillGrid.disabled = false;
        StrokeOutline.checked = true;
        StrokeOutline.disabled = true;
      } else if (request.StrokeOutlineStatus === 0 && StrokeOutline.checked === true) {
        StrokeOutline.checked = false;
        StrokeOutline.disabled = false;
      }
    }
    if (request.FillGridStatus !== undefined && request.type === 'FillGrid') {
      isVisualFill = request.isVisualFill
      if (request.FillGridStatus === 1 && FillGrid.checked === false) {
        FillGrid.checked = true;
        FillGrid.disabled = true;
        StrokeOutline.checked = false;
        StrokeOutline.disabled = false;
      } else if (request.FillGridStatus === 0 && FillGrid.checked === true) {
        FillGrid.checked = false;
        FillGrid.disabled = false;
      }
    }
  });
  var init = () => {
    chrome.tabs.sendMessage(currentChromeTabId, {method:'executeScript',greeting: true}, function (response) {
      if (response) {
        console.log("Design Grid Overlay JS already injected.");
      }else{
        console.log("Design Grid Overlay JS not already injected, injecting now.");
        chrome.tabs.executeScript(currentChromeTabId, {file: "/executedScripts/grid.js"});
      }
    });
  }
  return {
    init: init
  }
})();
