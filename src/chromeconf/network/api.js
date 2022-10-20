import FetchUtil from "./fetchUtil";
export default class Api {

    static PRICE_URL = "https://xtrade.newone.com.cn/market/json?funcno=20003&version=1&stock_list=SH:";

    static async getActualPrice(code) {

       const url = "https://xtrade.newone.com.cn/market/json?funcno=20003&version=1&stock_list=SH:" + code;
       const res = await FetchUtil.Get(url);

       console.log("返回数据");
       console.log("res:",res);
    }

}