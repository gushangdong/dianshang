var submit = document.getElementById("sub");
var username = document.getElementById("username");
var password = document.getElementById("pwd");
var returnIndex = document.getElementById("returnIndex");

//点击返货首页时
returnIndex.onclick = function () {
    window.location.href = "index.html";
}

submit.onclick = function (e) {
    //消除submit默认事件
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    //发送Ajax
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/login.php", true);
    xmlhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(`username=${username.value}&password=${password.value}`);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status == 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
            if (xmlhttp.responseText == "ok") {
                //添加cookie
                document.cookie = `name=${username.value};path=/`;
                //返回上一个页面
                var search = window.location.search;
                var arr = search.split("=");
                arr.shift();
                var str = arr[0].slice(0, -4);
                arr[0] = str;
                var hash = window.location.hash.substring(1);
                window.location.href = `../html/${arr[0]}.html?location=login&src=${arr[1]}#${hash}`;
            } else {
                alert("账号密码不正确");
            }
        }
    }
}