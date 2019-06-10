(function () {
    /**
     * Used to check the status of the grid.
     * Whether it is on or off
     */
    if (document.getElementsByClassName('Sketch-Grid-Layout').length) {
        chrome.runtime.sendMessage({
            SketchStatus: 1,
            type: 'Sketch'
        });
    } else {
        chrome.runtime.sendMessage({
            SketchStatus: 0,
            type: 'Sketch'
        });
    }
    
    if (document.getElementsByClassName('Bootstrap-Grid-Layout').length) {
        chrome.runtime.sendMessage({
            BootstrapStatus: 1,
            type: 'Bootstrap'
        });
    } else {
        chrome.runtime.sendMessage({
            BootstrapStatus: 0,
            type: 'Bootstrap'
        });
    }
    
    if (document.getElementsByClassName('StrokeOutline').length){
        chrome.runtime.sendMessage({
            StrokeOutlineStatus: 1,
            type: 'StrokeOutline',
            isVisualFill: false
        });
    }else{
        chrome.runtime.sendMessage({
            StrokeOutlineStatus: 0,
            type: 'StrokeOutline',
            isVisualFill: false
        });
    }
    if (document.getElementsByClassName('FillGrid').length) {
        chrome.runtime.sendMessage({
            FillGridStatus: 1,
            type: 'FillGrid',
            isVisualFill: true
        });
    }else{
        chrome.runtime.sendMessage({
            FillGridStatus: 0,
            type: 'FillGrid',
            isVisualFill: false
        });
    }
})();