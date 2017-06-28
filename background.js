var targetWindow = null;
var tabCount = 0;
var bookmarkfolder = null;
var date = "";
function start(tab) {
  chrome.windows.getCurrent(getWindows);
}

function getWindows(win) {
  targetWindow = win;
  chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
}

function getTabs(tabs) {
  var date = CurentTime();
  chrome.bookmarks.create({
    'parentId':'1',
    title: "backup for time:" + CurentTime()
}, function(bookmark){
    // 创建成功会反回该文件夹对象
    bookmarkfolder = bookmark;
});
  tabCount = tabs.length;
  chrome.tabs.query({},function (tabs) {
  tabs.forEach(function (tab) {
    chrome.bookmarks.create({
      'parentId':bookmarkfolder.id,
      'title': tab.title,
      'url': tab.url});
  });
});
}

function CurentTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var clock = year + "-";
  if(month < 10)
    clock += "0";
  clock += month + "-";
  if(day < 10)
    clock += "0";
  clock += day + " ";
  if(hh < 10)
    clock += "0";
  clock += hh + ":";
  if (mm < 10) clock += '0'; 
    clock += mm; 
  return(clock); 
}

chrome.browserAction.onClicked.addListener(start);
