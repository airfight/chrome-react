import Api from "./network/api";
import CommonUtils from "./Util/CommonUtil";
const exChangeStocks = ["600360"];
let stockMaxValue = 50000;
let accountInfo = {};
const getcms_token = () => {
  let cms_token = "";
  chrome.cookies.get({url:"https://xtrade.newone.com.cn/",name:"cms_token"}, (cookies) => {
    console.log(cookies?.value);
    cms_token = cookies?.value;
  })
  return cms_token;
}

const onTicker = async () => {
  
  const account = await Api.getAccount();
  const orders = await Api.gp_queryApplyForCancel();

  for (var i = 0; i < exChangeStocks.length;i++) {

    const stock = exChangeStocks[i];
    let isContinue = false;
    for (var j = 0; j < orders?.length; j++) {
        if (stock == orders[j].zqdm) {
          isContinue = true;
          if (CommonUtils.isTimeCanCanleOrder(orders[j]?.wtsj)) {
            isContinue = false;
            chrome.cookies.get({url:"https://xtrade.newone.com.cn/",name:"cms_token"}, async (cookies)  => {
              Api.gp_batchCacnelApply(cookies?.value);
            })
          }
          break;
        } 
    }

    if (isContinue) {
      continue;
    }
    const ticker = await Api.getTicker(stock);

    // 均衡对比
    if (true) {
      //1 buy 2 sell
      const zqdm = await Api.gp_inputZqdm(stock,1);
      chrome.cookies.get({url:"https://xtrade.newone.com.cn/",name:"cms_token"}, async (cookies)  => {
        const exChangeInfo = await Api.gp_buy(cookies?.value,stock,100,ticker.last,zqdm);
        // console.log("exChangeInfo"+exChangeInfo);
      })
    }

  }



}

// const ticker = Sync(getTicker,600058);
onTicker()
console.log("后台sw");
let color = '#3aa757';
getUrlTab().then((response) => {
    console.log("获取指定URL的tab",response.id);
    sendMessageToTab(response.id);
});
chrome.runtime.onInstalled.addListener(async () => {

    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.
    let url = chrome.runtime.getURL("xp.html");
  
    // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
    //
    // Many of the extension platform's APIs are asynchronous and can either take a callback argument
    // or return a promise. Since we're inside an async function, we can await the resolution of the
    // promise returned by the tabs.create call. See the following link for more info on async/await.
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    // let tab = await chrome.tabs.create({ url });
  
    // Finally, let's log the ID of the newly created tab using a template literal.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //
    // To view this log message, open chrome://extensions, find "Hello, World!", and click the
    // "service worker" link in the card to open DevTools.
    // console.log(`Created tab ${tab.id}`);
  });

  
// chrome.cookies.getAllCookieStores((e)=> {
//     console.log("e",e)
// })

// console.log("getAllCookiess",getAllCookiess())
// window.open("http://www.baidu.com");    

function getAllCookiess() {
    let cookieKeys = [{url:"https://xtrade.newone.com.cn/",name:"cms_token"},
                    {url:"https://xtrade.newone.com.cn/",name:"xydflag"},
                    {url:"https://xtrade.newone.com.cn/",name:"ya"},
                    {url:"https://xtrade.newone.com.cn/",name:"PLAY_SESSION"},
                    {url:"https://xtrade.newone.com.cn/",name:"cms1"},
                    {url:"https://xtrade.newone.com.cn/",name:"account"},
                    {url:"https://xtrade.newone.com.cn/",name:"COOKIE_ACCOUNT"},//需特殊处理
                    {url:"https://xtrade.newone.com.cn/",name:"uuid"},
                    {url:"https://xtrade.newone.com.cn/",name:"sid_c"},
                    // {url:"https://xtrade.newone.com.cn/",name:"sid_c"},
                    // {url:"https://xtrade.newone.com.cn/",name:"sid_c"}
                ];
    let cooKiess = [];
    for (let i = 0; i < cookieKeys.length;i++) {
        chrome.cookies.get(cookieKeys[i], (cookies) => {
            console.log(cookies)
            // cooKiess[i][`${cookieKeys[i].name}`] = cookies?.value ?? "null";
            cooKiess.push({key: cookieKeys[i].name,value:cookies?.value})
        })
    }

    return cooKiess;
}

function sendMessageToTab(tabId) {
      chrome.tabs.sendMessage(
        tabId,
        {greeting: "Hi from background script"}
      ).then(response => {
        console.log("Message from the content script:");
        console.log(response);
      }).catch((e)=> {
        console.log("e",e);
      });
}

// while(true) {
//     chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//         console.log("backgrond received content");
//         // if (request.type == "fetch")
//         //   chrome.notifications.create('worktimer-notification', request.options, function() { });
    
//         sendResponse("123");
//     });
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//             console.log("backgrond received content",request);
//             // if (request.type == "fetch")
//             //   chrome.notifications.create('worktimer-notification', request.options, function() { });
        
//             sendResponse("backgrond received content");
// });

// setTimeout(function() {

//     chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//         console.log(response);
//     });
// },1000 * 5)

// window.addEventListener('message', function (e) {
//     console.log('bg script received:' , e.data.type, e.data.data);
// });
// (async () => {
//     const src = chrome.runtime.getURL("./api.js");
//     const contentMain = await import(src);
//     contentMain.test();
// })();

//监测新开tab
// chrome.tabs.onCreated.addListener(function(tab) {
//     console.log('tabs.onCreated --'+ tab
//                 + ' window: ' + tab.windowId
//                 + ' tab: '    + tab.id
//                 + ' index: '  + tab.index
//                 + ' url: '    + tab.url);
//   });
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// document.getElementsByClassName("vcode-img")[0].addEventListener("click",(event) => {
//     console.log('点击了获取验证码按钮')
// })
// 获取用户权限
// chrome.permissions.request({
//     permissions: ['cookies'],
//     origins: ['https://xtrade.newone.com.cn/']
//   }, (granted) => {
//     // The callback argument will be true if the user granted the permissions.
//     if (granted) {
//       console.log("获取权限成功")
//     } else {
//         console.log("获取权限失败")
//     }
// });
// chrome.scripting.registerContentScript({
//     "matches": ["https://xtrade.newone.com.cn/*"],
//     "js": ["contentScript.js"]
//   });
// contentScript.start()


/** 
 * 获取当前的tabId
 * **/
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

/** 
 * 获取指定的URL 的 tab
 * **/
 async function getUrlTab() {
    const [tradeTabs] = await chrome.tabs.query({
        url: [
          "https://xtrade.newone.com.cn/*",
        ],
    });
    
    return tradeTabs;
}

// async function getTicker(stock) {
//   const ticker = await Api.getTicker(stock);
//   console.log(ticker)
//   return ticker;
// }

