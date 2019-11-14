/*--------------------------------------------------- 轮播图------------------------------------------------------------- */
var $box = $(".banner");
var $ul = $("#ul");
var $btns = $(".btn");
var $points = $(".point");

//获取一个图片的宽度
var $width = $ul.children().width();
//设置一个计数器
var $index = 0;

//点击左按钮
$btns.children().first().click(function () {
    $index--;
    if ($index < 0) {
        $index = $ul.children().length - 1;
        $ul.css("left", -$index * $width);
        $index--;
    }
    $ul.stop().animate({ left: -$index * $width }, 1000, 'linear', function () {
        $points.children().eq($index).addClass("active").siblings().removeClass("active");
    });
});

//点击右按钮
$btns.children().last().click(function () {
    $index++;
    $ul.stop().animate({ left: -$index * $width }, 1000, 'linear', function () {
        if ($index >= $ul.children().length - 1) {
            $index = 0;
            $ul.css("left", 0);
        }
        $points.children().eq($index).addClass("active").siblings().removeClass("active");
    });
});

//点击小圆点
for (let i = 0; i < $points.children().length; i++) {
    $points.children()[i].onclick = function () {
        $index = i;
        $ul.stop().animate({ left: -$index * $width }, 1000, 'linear', function () {
            $points.children().eq($index).addClass("active").siblings().removeClass("active");
        });
    };
}

//设置定时滚动
var timer = setInterval(function () {
    $btns.children().last().trigger("click");
}, 4000);

//设置hover的时候停止滚动
//悬停ul时停止滚动
$ul.children().hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(function () {
        $btns.children().last().trigger("click");
    }, 4000);
})
//悬停左右按钮时停止滚动
$btns.children().hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(function () {
        $btns.children().last().trigger("click");
    }, 4000);
})
//悬停小圆点时停止滚动
$points.children().hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(function () {
        $btns.children().last().trigger("click");
    }, 4000);
})


/* -----------------------------------楼层缓动-------------------------------------------------------- */
$(".fanhui").click(function(){
    $("html").animate({
        // scrollTop:$("header").eq($(this)).offset()
        scrollTop:0
    })
})


/* -------------------------------------------搜索----------------------------------------------------------- */
// window.onload = function(){

//     var oButton = $("#search").children[0];
//     var oText = $("#search").children[0];
//     var timerOut;
//     oText.onkeyup = function(){
//         //获取数据
//         //延时获取; >> 防止事件多次触发请求冗余过多;
//         clearTimeout(timerOut);	
//         timerOut = setTimeout(function(){
//             getRes(oText.value);//获取数据;
//         },500)
//     }
// }
// function getRes(val){
//     var script = document.createElement("script");
//     script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+val+"&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback";
//     document.getElementsByTagName("head")[0].appendChild(script);
// }
// function callback(res){//回调函数;
//     console.log(res.s);//回调数组 中都是关键词字符串;
//     var str = "";
//     for(var i = 0 ;i < res.s.length ; i++){
//         str += "<li>"+res.s[i]+"</li>";
//     }
//     $(".search-res").innerHTML = str;
// }
// function $(select){
//     return document.querySelector(select);
// }

/* --------------------------------------------分页------------------------------------------------------------ */
let ul = document.querySelector(".good ul")
$.getJSON("../goods.json",function(data){
    // ul.innerHTML = ""
    for(let i = 0; i< 24;i++){
        ul.innerHTML += `
        <a href="../html/detail.html">
        <li>
        <img src="${data[i].goods_small_logo}">
        <p class="name">${data[i].goods_name}</p>
        <p class="price">￥${data[i].goods_price}</p>
        </li>
        </a>
        `
    }
})

$("input").click(function(){
    let j = this.value;
    $.getJSON("../goods.json",function(data){
        ul.innerHTML = ""
        for(let i = (j - 1)*24 ; i< (j-1)*24 +24;i++){
            ul.innerHTML += `
            <a href="../html/detail.html">
            <li>
            <img src="${data[i].goods_small_logo}">
            <p class="name">${data[i].goods_name}</p>
            <p class="price">${data[i].goods_price}</p>
            </li>
            </a>
            `
        }
    })
})