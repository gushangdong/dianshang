var submit = document.getElementById("sub");
var username = document.getElementById("username");
var password = document.getElementById("pwd");
var returnIndex = document.getElementById("returnIndex");

//点击返回首页时
returnIndex.onclick = function () {
    window.location.href = "index.html";
}

//验证密码强度
password.onblur = function () {
    // 每次验证之前，都设置状态，用来记录是否出现某种类型：a数字，b字母，c特殊
    var a = b = c = 0;
    var str = this.value;
    // 先判断长度
    if (str.length >= 6 && str.length <= 18) {
        // 拿到每个字符
        for (var i = 0; i < str.length; i++) {
            // 是否出现数字
            if (str[i] >= 0 && str[i] <= 9) {
                a = 1;
            }
            // 是否出现字母
            if (str[i].charCodeAt() >= 97 && str[i].charCodeAt() <= 122 || str[i].charCodeAt() >= 65 && str[i].charCodeAt() <= 90) {
                b = 1;
            }
            // 是否出现特殊字符
            if (str[i].charCodeAt() >= 33 && str[i].charCodeAt() <= 47 || str[i].charCodeAt() >= 58 && str[i].charCodeAt() <= 64) {
                c = 1;
            }
        }
        // 将所有的状态累加，通过结果验证出现了几种类型
        switch (a + b + c) {
            case 1: this.nextElementSibling.innerHTML = "简单"; break;
            case 2: this.nextElementSibling.innerHTML = "一般"; break;
            case 3: this.nextElementSibling.innerHTML = "困难"; break;
        }
        //点击注册时
        submit.onclick = function (e) {
            if (username.value && password.value) {
                //消除登录默认事件
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
                //发送Ajax
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "../php/regist.php", true);
                xmlhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xmlhttp.send(`username=${username.value}&password=${password.value}`);
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4 && xmlhttp.status == 200 && xmlhttp.status < 300 || xmlhttp.status == 304) {
                        if (xmlhttp.responseText == "ok") {
                            window.location.href = `../html/login.html?location=index&src=aaa#first`;
                        } else {
                            alert("注册失败");
                        }
                    }
                }
            } else {
                submit.onclick = function (e) {
                    //消除登录默认事件
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        window.event.returnValue = false;
                    }
                }
            }
        }
    } else {
        this.nextElementSibling.innerHTML = "<br/>长度不符，密码长度应在6~18位之间";
        submit.onclick = function (e) {
            //消除登录默认事件
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }
        };
    }
}