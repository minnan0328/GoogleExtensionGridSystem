var createGridCss = (()=>{
    var createGridBoxCSS = (calculationResult, units) => {
        return `.${calculationResult.type}-Grid-Layout {
            width: 100${units};
            hright: 100vh;
            display: flex;
            position: fixed;
            justify-content: center;
            top: 0;
            left: 0;
            margin: 0;
            z-index: 16777271;
        }
        .${calculationResult.type}-Grid-Layout .Grid-Container {
            width: 100%;
            display: flex;
            justify-content: center;
            //margin: 0px ${calculationResult.offset};
        }`
    }
    var createGridContainer = (calculationResult,units) => {
        return `.${calculationResult.type}-Grid-Layout .Grid-Container .Grid-row {
            display: grid;
            grid-template-columns: repeat(${calculationResult.numColumns}, 1fr);
            height: 100vh;
            width: ${calculationResult.totalWidth}px;
            margin: 0 auto;
            padding: 0 ${calculationResult.gutterOnOutside}px;
            grid-gap: ${calculationResult.gutterWidth}px;
            position: fixed;
        }`
    }
    var createGridVisuals = (calculationResult) => {
        var Visuals = null;
        if (calculationResult.VisualsType === 'FillGrid'){
            Visuals = 'background-color: rgba(255,0,0,0.2);'
        }
        if (calculationResult.VisualsType === 'StrokeOutline'){
            Visuals = 'border: 1px dashed rgba(0,0,0,0.5);'
        }
        return `.${calculationResult.type}-Grid-Layout .Grid-Container .Grid-row .Grid-columns {
            ${Visuals}
        }`
    }
    var init = (calculationResult)=>{
        var unitWidth = 'vw'
        return `${createGridBoxCSS(calculationResult,unitWidth)}${createGridContainer(calculationResult,unitWidth)}${createGridVisuals(calculationResult)}`
    }
    return {init:init}
})();