<?php
    $username = $_POST["username"];
    $password = $_POST["password"];
    mysql_connect("localhost","root","root");
    mysql_select_db("test");
    $SQL = "insert into users (NAME,PASSWORD) VALUES('$username','$password');";
    $result = mysql_query($SQL);
    //检测是否注册成功
    // $SQL2 = "select * from users where name = '$username' and password = '$password'";
    // $result2 = mysql_query($SQL2);
    // $row = mysql_fetch_assoc($result2);
    // if($row){
        echo "ok";
    // } else {
    //     echo "error";
    // };
?>