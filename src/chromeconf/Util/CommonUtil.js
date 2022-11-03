
export default {

    isTimeCanCanleOrder: function(orderTime) {

        const times = orderTime?.split(':')
        if (times.length > 1) {
            const millis = parseInt(times[0]) * 60 + parseInt(times[1]);//分钟转换

            let myDate = new Date();
            let h = myDate.getHours(); // 获取当前小时数(0-23)
            let m = myDate.getMinutes(); // 获取当前分钟数(0-59)
            const now = parseInt(h) * 60 + parseInt(m);
            return now - millis > 15;
        }

        return false;
    }

}