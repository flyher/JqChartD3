function DateToDate(date) {
    ///<summary>将基准时间转为yyyy-MM-dd HH24:mi:ss</summary>
    ///<param name="date" type="String">要转换的时间</param>
    var newdate = new Date(date).getFullYear() + "-" + (parseInt(new Date(date).getMonth()) + 1) + "-" + new Date(date).getDate() + " " + new Date(date).getHours() + ":" + new Date(date).getMinutes() + ":" + new Date(date).getSeconds();
    return newdate.toString();
}
function GetMinIndex(data) {
    ///<summary>获取最小的数据索引</summary>
    ///<param name="date" type="Array">已经格式化成对象的数组集合</param>
    var count = data.length;
    var a = data[0].date;
    var b = data[1].date;
    if (a > b) {
        return data.length - 1;
    } else {
        return 0;
    }
}
