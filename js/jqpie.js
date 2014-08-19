/// <reference path="jquery-1.11.1.js" />
/// <reference path="d3.v3.js" />
$(document).ready(function () {
    var json = "{ \"score\": \"1-50\", \"type\": \"5\" }#{ \"score\": \"51-60\", \"type\": \"10\" }#{ \"score\": \"61-70\", \"type\": \"25\" }#{ \"score\": \"71-80\", \"type\": \"30\" }#{ \"score\": \"81-90\", \"type\": \"20\" }#{ \"score\": \"91-100\", \"type\": \"10\" }";
    json = json.split("#");
    var data = new Array();
    for (var i = 0; i < json.length; i++) {
        data[i] = JSON.parse(json[i]);
    }
    DrawPie("chart", data, true, 460, 320,0,0);
});

function DrawPie(divid, data, tips, width, height, outWidth, innerWidth) {
    ///<summary>绘制饼状图</summary>
    ///<param name="divid" type="String">div的id</param>
    ///<param name="data" type="Array">已经转换为对象数组的json数据</param>
    ///<param name="tips" type="Bool">是否显示扇形标记</param>
    ///<param name="width" type="Inter">宽度</param>
    ///<param name="height" type="Inter">高度</param>
    ///<param name="outWidth" type="Inter">外圈大小，设置默认为0</param>
    ///<param name="innerWidth" type="Inter">内圈大小，设置为0时默认为height的1/2</param>
    //var width = 960,
    //height = 600,
    //外圈
    //var radiusout = height / 2;

    if (height <= innerWidth) {
        console.error("宽度设置不正确");
    }

    if (innerWidth == 0) {
        innerWidth = height / 2;
    }

    var color = d3.scale.ordinal()//构造一个ordinal变换对象
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var pie = d3.layout.pie()//构造一个默认的饼图
        .value(function (d) { return d.type; })//获取或设置值访问器
        .sort(null); //设置饼图的顺时针方法的排序方法

    var arc = d3.svg.arc()//创建弧发生器
        .outerRadius(outWidth)//外圈
        .innerRadius(innerWidth); //内圈
    //.outerRadius(0)//外圈
    //.innerRadius(radiusout); //内圈

    var svg = d3.select("#" + divid).append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //    var data = [
    //        { score: "1-50", type: "5" },
    //        { score: "51-60", type: "10" },
    //        { score: "61-70", type: "25" },
    //        { score: "71-80", type: "30" },
    //        { score: "81-90", type: "20" },
    //        { score: "91-100", type: "10" }
    //    ];
    //求总量（计算百分比使用）
    var type = 0;
    for (var i = 0; i < data.length; i++) {
        type += parseInt(data[i].type);
    }

    //    d3.svg("data.csv",function(d){
    //        data.forEach(function(d){
    //            d.score
    //        });
    //    });

    //    data.forEach(function (d) {
    //        d.type = +d.type;
    //    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path")
        .attr("d", arc)
    //.style("fill", function (d, i) {
    //    return color(i);
    //});
        .style("fill", function (d) {
            return color(d.data.score);
        });
    g.append("text")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            if (tips) {
                return 100 * d.data.type / type + "% (" + d.data.score + ")";
            } else {
                return "";
            }
        });
}

var obj = {
    "name": "Simon",
    "age": "20",
    "clothing": {
        "style": "simple",
        "isDouche": false
    }
}

//$(document).ready(function () {
    //var json="{ \"score\": \"1-50\", \"type\": \"5\" },{ \"score\": \"51-60\", \"type\": \"10\" },{ \"score\": \"61-70\", \"type\": \"25\" },{ \"score\": \"71-80\", \"type\": \"30\" }";
//    json=JSON.parse

//    var data = new Array();
//    var i = 0;
//    var pieClass={
//        name,
//        value
//    };

//    for (var propt in obj) {
//        alert(propt + ":" + obj[propt]);
//    }
    //
//    alert(data.length);
//    alert(data[0]);
//});
