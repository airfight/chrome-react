
/**
 * 
 * 
 * 品种Ticker信息
 */
export default class Ticket {

    constructor(args) {

        this.stock = args[0];
        this.name =  args[1];
        this.last = args[30];
        this.buy = args[16];
        this.sell = args[10];
        this.low = args[26];
        this.high = args[28];
        this.open = args[27];

    }

}