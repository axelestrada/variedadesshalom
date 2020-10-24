<?php

include 'connection.php';

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($connection, $query);
    $array = mysqli_fetch_array($result);

    if ($array) {
        setcookie('USER_EMAIL', $array['email'], time() + 31622400, '/');
        setcookie('USER_PASSWORD', $array['password'], time() + 31622400, '/');
        setcookie('USER_ID', $array['idusuario'], time() + 316622400, '/');

        echo 'true';
    } else {
        echo 'false';
    }
}
