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
    CreateLine("#chart", data, "lightgreen", "mediumseagreen","white","black","black");
});


function CreateLine(divid,data,colorline,colorcircle,colorcirclemin,colorX,colorY) {
    ///<summary>绘制折线图</summary>
    ///<param name="divid" type="String">div的id</param>
    ///<param name="data" type="Array">已经转换为对象数组的json数据</param>
    ///<param name="colorline" type="String">折线颜色</param>
    ///<param name="colorcircle" type="String">折线上标记点颜色</param>
    ///<param name="colorcirclemin" type="String">第一个点标记颜色效果</param>
    ///<param name="colorX" type="String">x轴颜色</param>
    ///<param name="colorY" type="String">y轴颜色</param>
    var margin = { top: 100, right: 100, bottom: 100, left: 100 };
    var width = 960 - margin.left - margin.right;
    var height = 460 - margin.top - margin.bottom;

    //时间样式
    var datenew = d3.time.format("%Y-%m-%e %H:%M:%S").parse;

    //横坐标宽度，横坐标为时间
    var x = d3.time.scale().range([0,width]);
    //纵坐标高度，纵坐标为线性数
    var y = d3.scale.linear().range([height, 0]);

    //创建坐标轴生成器
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5); //X轴范围时间内分的段数,越大精确度越高。
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);//Y轴范围时间内分的段数，越大精确度越高。

    //定义折线上值的数值
    var valuenew = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.value); });

    //追加html
    var svg1 = d3.select("#chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function (d) {
        d.date = datenew(d.date); //横坐标：转换格式
        //d.value=+d.value;
    });

    //x,y设置范围
    x.domain(d3.extent(data, function (d) { return d.date; }))
    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    //折线
    svg1.append("path")
    //.attr("class", "path")//设置path路径的样式，也可以直接在此设置
        .attr("style", "stroke:" + colorline + ";stroke-width:2;fill:none;")
        .attr("d", valuenew(data)); //stroke: lightgreen;//将新值传入折线
         

    //在折线的每个标记点画圆圈
    svg1.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", "5")//半径
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) { return y(d.value); })//所在的点坐标
        .attr("fill",colorcircle)//填充颜色
        .attr("id", function (d, i) {
            //设置圈圈id
            return "dot" + i;//设置圈圈id
        });

    var minIndex = GetMinIndex(data); //data里面最小日期的索引
    var maxIndex = data.length - minIndex - 1; //data里面最大日期的索引

    //最小日期的圈圈效果
    $("#dot" + (minIndex)).css("fill", colorcirclemin);
    svg1.append("circle")
    .attr("r", "3")
    .attr("cx", x(data[minIndex].date))
    .attr("cy", y(data[minIndex].value))
    .attr("fill", "#06A95E");

    //在折线前面加上一部分延长线
    var linePre = "M " + (x(data[minIndex].date) - 50) + "," + y(data[minIndex].value)
    + " L " + x(data[minIndex].date) + "," + y(data[minIndex].value);
    svg1.append("path")
    .attr("d", linePre)
    .attr("style", "stroke: #89E4BB;stroke-width: 1;fill: none;");
    //console.log(linePre);

    //在折线后面加上一部分延长线
    var lineNext = "M " + x(data[maxIndex].date) + "," + y(data[maxIndex].value)
    + " L " + (x(data[maxIndex].date) + 50) + "," + y(data[maxIndex].value);
    svg1.append("path")
    .attr("d", lineNext)
    .attr("style", "stroke: #89E4BB;stroke-width: 1;fill: none;");
    //console.log(lineNext);

    //标识小三角形的索引位置index
    var triangleIndex = 0;
    //在折线后面加上数值备具  时间
    svg1.selectAll("dot")
    .data(data)
    .enter().append("text")
    .attr("x", function (d, i) { return x(d.date) - 10; })
    .attr("y", function (d, i) { return y(d.value) - 10; })
    .text(function (d, i) {
        /*if (i == maxIndex) {
        return " 当前指数"
        }*/
        if (d.desc == "最新数据") {
            triangleIndex = i;
            return "最新数据";
        }
        return " " + DateToDate(d.date);
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
