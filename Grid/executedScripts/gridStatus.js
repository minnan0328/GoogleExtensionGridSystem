(function () {
    /**
     * Used to check the status of the grid.
     * Whether it is on or off
     */
    if (document.getElementsByClassName('Sketch-Grid-Layout').length) {
        SketchRespond(1);
    } else {
        SketchRespond(0);
    }

    function SketchRespond(gridStatus) {
        chrome.runtime.sendMessage({SketchStatus: gridStatus});
    }


})();