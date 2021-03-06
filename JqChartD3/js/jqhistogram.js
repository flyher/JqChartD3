/// <reference path="jquery-1.11.1.js" />
/// <reference path="d3.v3.js" />

$(document).ready(function () {
    var json = "{\"date\":\"1404548323000\",\"value\":\"98\",\"value2\":\"100\",\"desc\":\"\"}#{\"date\":\"1404461923000\",\"value\":\"91\",\"value2\":\"90\",\"desc\":\"最新数据\"}#{\"date\":\"1404321015337\",\"value\":\"72\",\"value2\":\"0\",\"desc\":\"\"}#{\"date\":\"1404232721740\",\"value\":\"87\",\"value2\":\"89\",\"desc\":\"\"}#{\"date\":\"1404177101616\",\"value\":\"70\",\"value2\":\"82\",\"desc\":\"\"}#{\"date\":\"1404084120285\",\"value\":\"90\",\"value2\":\"93\",\"desc\":\"\"}#{\"date\":\"1403994569503\",\"value\":\"13\",\"value2\":\"20\",\"desc\":\"\"}";
    //将json字符串转换为对象数组
    json = json.split("#");
    var data = new Array();
    for (var i = 0; i < json.length; i++) {
        data[i] = JSON.parse(json[i]);
        data[i].date = DateToDate(parseInt(data[i].date));
    }
    DrawLine("#chart", data, "lightgreen", "mediumseagreen","white","black","black");
});


function DrawLine(divid,data,colorline,colorcircle,colorcirclemin,colorX,colorY) {
    })
    .attr("style", "fill:#666666;font-family:@Microsoft Yahei;font-size:10pt;text-align:center;");

    //在折线后面加上数值备具  数值
    svg1.selectAll("dot")
    .data(data)
    .enter().append("text")
    .attr("x", function (d, i) { return x(d.date) - 10; })
    .attr("y", function (d, i) { return y(d.value) - 15 - 10; })
    .text(function (d, i) {
        return d.value;
    })
    .attr("style", "fill:#666666;font-family:@Microsoft Yahei;font-size:14pt;");

    //在折线圈圈“当前指数”点后加上一个小三角
    var triangleNow = (x(data[triangleIndex].date) + 55 - 10) + "," + (y(data[triangleIndex].value) - 10)
        + " " + (x(data[triangleIndex].date) + 55 + 10 - 10) + "," + (y(data[triangleIndex].value) - 10)
        + " " + (x(data[triangleIndex].date) + 55 + 5 - 10) + "," + (y(data[triangleIndex].value) - 8 - 10);
    svg1.append("polygon")
    .attr("points", triangleNow)
    .attr("style", "fill:#06A95E;stroke:#06A95E;stroke-width:1");

    //$("#dot" + (data.length - 1)).append("circle");
    //            .attr("r", "2")
    //            .attr("cx", x(data[data.length - 1].date))
    //            .attr("cy",y(data[data.length-1].value))
    //            .attr("fill","lightgreen");

        //x轴
        svg1.append("g")
            //.attr("class", "x axis")
            .attr("style","fill: none;stroke:"+colorX+";stroke-width: 1;shape-rendering: crispEdges;")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //y轴
        svg1.append("g")
            //.attr("class", "y axis")
            .attr("style", "fill: none;stroke:"+colorY+";stroke-width: 1;shape-rendering: crispEdges;")
            .call(yAxis);
}

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
