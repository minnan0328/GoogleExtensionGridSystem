document.addEventListener('DOMContentLoaded', function(dcle) {
  var Button1 = document.getElementById("button1");
  var Button2 = document.getElementById("button2");
  Button1.addEventListener('click', function(e) {
    console.log('click');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { content: "你好，此訊息來自彈出視窗腳本Button1" }, function(response) {
            console.log(response,tabs);
        });
    });
});
  Button2.addEventListener('click', function(e) {
    console.log('click');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { content: "你好，此訊息來自彈出視窗腳本Button2" }, function(response) {
            console.log(response,tabs);
        });
    });
  });
  //點擊按鈕，向內容腳本發送訊息


});
