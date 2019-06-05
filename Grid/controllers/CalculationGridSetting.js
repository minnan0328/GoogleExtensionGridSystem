var calculationGridSetting = (()=>{
    let gridSetting = {
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
    var init = ((GridData) => {
        gridSetting = {
            availWidth : GridData.ScreenAvailDPI.availWidth,
            availHeight : GridData.ScreenAvailDPI.availHeight,
            gutterWidth : GridData.setting.gutterWidth,
            gutterOnOutside: GridData.setting.gutterWidth / 2,
            totalWidth: GridData.setting.totalWidth - GridData.setting.gutterWidth,
            numColumns: GridData.setting.numColumns,
            columnWidth: GridData.setting.columnWidth,
            offset: GridData.setting.offset,
            type: GridData.type
        }
        localStorage.setItem('todoList', JSON.stringify(gridSetting))
        girdFormValueSetting(gridSetting)
        return gridSetting
    })
    var girdFormValueSetting = ((gridSetting) => {
        var gridData = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : gridSetting
        const girdForm = document.forms['girdForm'];
        girdForm.elements.availWidth.value = gridData.availWidth
        girdForm.elements.availHeight.value = gridData.availHeight
        girdForm.elements.totalWidth.value = gridData.totalWidth
        girdForm.elements.offset.value = gridData.offset
        girdForm.elements.numColumns.value = gridData.numColumns
        girdForm.elements.gutterWidth.value = gridData.gutterWidth
        girdForm.elements.columnWidth.value = gridData.columnWidth
    })
    return {
        init:init,
        girdFormValueSetting: girdFormValueSetting
    }
})();