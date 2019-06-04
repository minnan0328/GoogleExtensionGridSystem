var CalculationGridSetting = (()=>{
    var init = ((GridData) => {
        let gridSetting = {
            availWidth : GridData.ScreenAvailDPI.availWidth,
            availHeight : GridData.ScreenAvailDPI.availHeight,
            gutterWidth : GridData.setting.gutterWidth,
            gutterOnOutside: GridData.setting.gutterWidth / 2,
            totalWidth: GridData.setting.totalWidth - GridData.setting.gutterWidth,
            columns: GridData.setting.columns,
            columnWidth: GridData.setting.columnWidth,
            offset: GridData.setting.offset
        }
        girdFormValueSetting(gridSetting)
        return gridSetting
    })
    var girdFormValueSetting = ((gridSetting) => {
        const girdForm = document.forms['girdForm'];
        girdForm.elements.availWidth.value = gridSetting.availWidth
        girdForm.elements.availHeight.value = gridSetting.availHeight
        girdForm.elements.totalWidth.value = gridSetting.totalWidth
        girdForm.elements.offset.value = gridSetting.offset
        girdForm.elements.numberColumns.value = gridSetting.columns
        girdForm.elements.gutterWidth.value = gridSetting.gutterWidth
        girdForm.elements.columnWidth.value = gridSetting.columnWidth
    })
    return {
        init:init,
        girdFormValueSetting: girdFormValueSetting
    }
})();