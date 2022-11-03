import FetchUtil from "./fetchUtil";
import Ticker from "../Model/Ticker";
export default class Api {

    static PRICE_URL = "https://xtrade.newone.com.cn/market/json?funcno=20003&version=1&stock_list=SH:";

    /**
     * Ticker
     * @param {T} stock 
     * @returns 
     */
    static async getTicker(stock) {

       const url = "https://xtrade.newone.com.cn/market/json?funcno=20003&version=1&stock_list=SH:" + stock;
       const {code,data} = await FetchUtil.Get(url);
       return new Ticker(data.results[0]);
       
    }

    /**
     * 信息 content.khgp.gpcc
     * "khgp":{
            "bz":"1",
            "zsz":"303.00",
            "zfdyk":"-5.00",
            "zykbl":"-1.62%",
            "gpcc":[
                {
                    "gpmc":"广州",
                    "gpdm":"00052",
                    "scdm":"2",
                    "ccsz":"303.00",
                    "fdyk":"-5.00",
                    "ykbl":"-1.62%",
                    "ccye":"100",
                    "kyye":"0",
                    "xj":"3.0300",
                    "cbj":"3.080",
                    "isggt":false,
                    "hl":"",
                    "djsl":null
                }
            ]
        }
     * 
     */
    static async getAccount() {
        const url = "https://xtrade.newone.com.cn/capi/zc_getPCKhzc";
        const data = await FetchUtil.Post(url,"bz=1");
        console.log("account",data);
        // return new Account(data);
        return data;
    }

    /**
     * 可取消的
     */
    static async gp_queryApplyForCancel() {
        const url = "https://xtrade.newone.com.cn/capi/gp_queryApplyForCancel";
        const data = await FetchUtil.Post(url);
        console.log("可取消",data);
        return data?.content ?? [];
    }

    //

    
    /**
     * 单个取消 scdm 方向 wtph 撤单编号
     */
     static async gp_cancel(scdm=1,hth,jytoken) {
        const url = "https://xtrade.newone.com.cn/capi/gp_cancel";
        const data = await FetchUtil.Post(url,`scdm=${scdm}hth=${hth}&jytoken=${jytoken}`);
        return data;
    }
    /**
     * 批量取消 scdm 方向 wtph 撤单编号
     */
     static async gp_batchCacnelApply(jytoken) {
        const url = "https://xtrade.newone.com.cn/capi/gp_batchCacnelApply";
        const data = await FetchUtil.Post(url,`hth=1-6&jytoken=${jytoken}`);
        return data;
    }

    /**
     * 当日已成
     */
    static async gp_queryTransaction() {
        const url = "https://xtrade.newone.com.cn/capi/gp_queryTransaction";
        const data = await FetchUtil.Post(url);
        console.log("当日已成",data);
    }

    // 

    /**
     * 
     * 获取 gdzh
     */
    static async gp_inputZqdm(zqdm,mmlx=1) {
        const url = "https://xtrade.newone.com.cn/capi/gp_inputZqdm";
        const data = await FetchUtil.Post(url,`zqdm=${zqdm}&mmlx=${mmlx}`);
        console.log("gdzh",data?.content?.gdlist);
        let code = "A524538438";
        if (data?.content?.gdlist?.length > 0) {
            code = data.content.gdlist[0]?.gdzh ?? "A524538438";
        }
        return code;
    }

    /**
     * jytoken 规则
     * zqdm 代码
     * wtsl 手数
     * wtjg 价格
     * gdzh 户号
     * 当日已成
     */
     static async gp_buy(jytoken="",zqdm,wtsl,wtjg,gdzh="A524538438") {
        const url = "https://xtrade.newone.com.cn/capi/gp_buy";
        const data = await FetchUtil.Post(url,`xylist=&ywqrxx=&jytoken=${jytoken}&scdm=1&gdzh=${gdzh}&zqdm=${zqdm}&wtsl=${wtsl}&wtjg=${wtjg}&sjwtbz=0&tjrdm=`);
        console.log("买单",data);
        return data;
    }

     /**
     * jytoken 规则
     * zqdm 代码
     * wtsl 手数
     * wtjg 价格
     * gdzh 户号
     * 当日已成
     */
    static async gp_sell(jytoken="",zqdm,wtsl,wtjg,gdzh="A524538438") {
        const url = "https://xtrade.newone.com.cn/capi/gp_sell";
        const data = await FetchUtil.Post(url,`xylist=&ywqrxx=&jytoken=${jytoken}&scdm=2&gdzh=${gdzh}&zqdm=${zqdm}&wtsl=${wtsl}&wtjg=${wtjg}&sjwtbz=0&tjrdm=`);
        console.log("买单",data);
        return data;
    }

}