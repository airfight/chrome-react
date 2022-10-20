console.log("injected");
/*
(function (xhr) {

    var XHR = XMLHttpRequest.prototype;

    var open = XHR.open;
    var send = XHR.send;

    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function (postData) {
        console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData);
        this.addEventListener('load', function () {
            window.postMessage({ type: 'xhr', data: this.response }, '*');  // send to content script
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);



const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);
    console.log('injected script fetch request:', args);
    response
        .clone()
        .blob() // maybe json(), text(), blob()
        .then(data => {
            window.postMessage({ type: 'fetch', data: data }, '*'); // send to content script
            //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
        })
        .catch(err => console.error(err));
    return response;
};
*/

/**
 * 是否已存在挂单 
*/

function getOrder() {

    const navitems = document.getElementsByClassName("nav-item");
    navitems[8]?.click();
    setTimeout(() => {
        navitems[7]?.click();

    },1000 * 5);
    console.log("-================================================================",navitems)

}

window.addEventListener('message', function (e) {
    // console.log('content script received:' , e.data.type, e?.data?.data);
    console.log('message form contentScript',e.data);
});

setTimeout(function(){
    getOrder();

},1000 * 3)


// setTimeout
// setInterval
/* 买入操作
setTimeout(() => {
    // console.log('injected script timee222')
    // console.log('docment',     document.getElementsByClassName("cmsui-input__inner")  )
    // const divs = document.getElementsByClassName("cmsui-input__inner");
    //卖出按钮
    // const st = document.getElementsByClassName("tabs-nav__item cmsui-col-12 sell-btn");//或者$("#eleId")[0];
    // st[0]?.click();
    try {
    const ev = document.createEvent("HTMLEvents");
    ev.initEvent("change", false, true);

    const inputPrice = document.getElementsByClassName("cmsui-input__inner");
    inputPrice[0].value = "600058";
    // inputPrice[0].focus();
    inputPrice[0].dispatchEvent(ev);
    console.log(inputPrice);
    const tradeInputNumber = document.getElementsByClassName("trade-input-number__inner");
    setTimeout(function(){
        //二次确认
        tradeInputNumber[0].value = 7.9;
        tradeInputNumber[0].focus();
    },1000 * 2)

    setTimeout(function(){
         // tradeInputNumber[0].dispatchEvent(new Event("input"));
        tradeInputNumber[1].value = 100;
        // tradeInputNumber[1].dispatchEvent(new Event("input"));
        tradeInputNumber[1].focus();

    },1000 * 3)

    setTimeout(function(){
       //买入
        const st = document.getElementsByClassName("buy-confirm cmsui-btn cmsui-btn--sm cmsui-btn--block cmsui-btn--fillred");//或者$("#eleId")[0];
        st[0]?.click();

   },1000 * 5)
  
   
    setTimeout(function(){
        //二次确认
        const st2 = document.getElementsByClassName("cmsui-btn cmsui-btn--sm cmsui-btn--red");//或者$("#eleId")[0];
        console.log(st2);
        st2[2]?.click();
        // location.reload();

    },1000 * 6)
    
    } catch (e) {
        console.log('e===========>',e);
    }


    
}, 1000 * 3);

*/

/**
 * 主动执行脚本
 * 
 * const tabId = getTabId();
chrome.scripting.executeScript(
    {
      target: {tabId: tabId, allFrames: true},
      files: ['script.js'],
    },
    () => { ... });
 */