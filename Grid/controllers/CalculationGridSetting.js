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
            offset: (GridData.ScreenAvailDPI.availWidth - GridData.setting.totalWidth) / 2,
            type: GridData.type,
            VisualsType: GridData.VisualsType
        }
        localStorage.setItem('todoList', JSON.stringify(gridSetting))
        getFormValueSetting(gridSetting)
        return gridSetting
    }
    var getFormValueSetting = (gridSetting) => {
        var GridData = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : gridSetting
        const getForm = document.forms['girdForm'];
        getForm.elements.availWidth.value = GridData.availWidth
        getForm.elements.availHeight.value = GridData.availHeight
        getForm.elements.totalWidth.value = GridData.totalWidth
        getForm.elements.offset.value = GridData.offset
        getForm.elements.numColumns.value = GridData.numColumns
        getForm.elements.gutterWidth.value = GridData.gutterWidth
        getForm.elements.columnWidth.value = GridData.columnWidth
    }
    return {
        init:init,
        getFormValueSetting: getFormValueSetting
    }
})();