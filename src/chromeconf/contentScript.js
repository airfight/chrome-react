
// function start() {
//     console.log("chrome.runtime.getURL()")
//     document.getElementById("login-btn cmsui-btn cmsui-btn--fillred cmsui-btn--block").innerText = "hello";
    
// }

console.log('content script start');

// inject injected script
var s = document.createElement('script');
console.log('content script',s);
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
// function load() {
//     var s = document.createElement('script');
//     console.log('content script',s);
//     s.src = chrome.runtime.getURL('background.js');
//     s.onload = function () {
//         this.remove();
//     };
//     (document.head || document.documentElement).appendChild(s);
// }
// load()
 
// receive message from injected script
window.addEventListener('message', function (e) {
    // console.log('content script received:' , e.data.type, e?.data?.data);
    console.log('message content script',e);
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("content received backgrond",request);
    // if (request.type == "fetch")
    //   chrome.notifications.create('worktimer-notification', request.options, function() { });

    sendResponse("123");

    window.postMessage("content received backgrond");
});



// // window.postMessage({ type: 'fetch', data: "====" }, '*');
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log("response.farewell",response);
});

//注入js
function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL(scriptName + '.js');
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}
