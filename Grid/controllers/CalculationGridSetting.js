var calculationGridSetting = (()=>{
    var gridSetting = {
        availWidth: null,
        availHeight: null,
        gutterWidth: null,
        gutterOnOutside: null,
        totalWidth: null,
        numColumns: null,
        columnWidth: null,
        offset: null,
        type: null
    }
    var init = (GridData) => {
        gridSetting = {
            availWidth : GridData.ScreenAvailDPI.availWidth,
            availHeight : GridData.ScreenAvailDPI.availHeight,
            gutterWidth : GridData.setting.gutterWidth,
            gutterOnOutside: GridData.setting.gutterWidth / 2,
            totalWidth: GridData.setting.totalWidth - GridData.setting.gutterWidth,
            numColumns: GridData.setting.numColumns,
            columnWidth: GridData.setting.columnWidth,
            offset: GridData.setting.offset,
            type: GridData.type,
            VisualsType: GridData.VisualsType
        }
        localStorage.setItem('todoList', JSON.stringify(gridSetting))
        getFormValueSetting(gridSetting)
        return gridSetting
    }
    var getFormValueSetting = (gridSetting) => {
        var gridData = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : gridSetting
        const getForm = document.forms['girdForm'];
        getForm.elements.availWidth.value = gridData.availWidth
        getForm.elements.availHeight.value = gridData.availHeight
        getForm.elements.totalWidth.value = gridData.totalWidth
        getForm.elements.offset.value = gridData.offset
        getForm.elements.numColumns.value = gridData.numColumns
        getForm.elements.gutterWidth.value = gridData.gutterWidth
        getForm.elements.columnWidth.value = gridData.columnWidth
    }
    return {
        init:init,
        getFormValueSetting: getFormValueSetting
    }
})();