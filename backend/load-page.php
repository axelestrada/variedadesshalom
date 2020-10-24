<?php

include 'connection.php';

if(isset($_COOKIE['USER_ID'])){
    $email = $_COOKIE['USER_EMAIL'];
    $password = $_COOKIE['USER_PASSWORD'];
    
    $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($connection, $query);
    $array = mysqli_fetch_array($result);

    if($array){              
        echo 'true';
    }else{          
        echo 'false';      
    }
}

?>