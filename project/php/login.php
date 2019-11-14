<?php
    $username = $_POST["username"];
    $password = $_POST["password"];
    mysql_connect("localhost","root","root");
    mysql_select_db("test");
    $SQL = "select * from users where name = '$username' and password = '$password'";
    $result = mysql_query($SQL);
    $row = mysql_fetch_assoc($result);
    if($row){
        echo "ok";
    } else {
        echo "error";
    };
?>