<?php

include 'connection.php';

if(isset($_POST['password'])){
    $userId = $_COOKIE['USER_ID'];
    $password = $_POST['password'];

    $querySelect = "SELECT password FROM users WHERE idusuario = '$userId'";
    $result = mysqli_query($connection, $querySelect);
        
    if($array = mysqli_fetch_array($result)){
        $queryUpdate = "UPDATE users SET password = '$password' WHERE idusuario = '$userId'";
        $result = mysqli_query($connection, $queryUpdate);
        
        setcookie('USER_PASSWORD', $password, time() + 31622400, '/');
        echo 'true';
    }else{
        echo 'false';
    }
}

?>