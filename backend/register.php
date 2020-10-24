<?php

include 'connection.php';

if (isset($_POST['userName'])) {
    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];
    $userPhone = $_POST['userPhone'];
    $userPassword = $_POST['userPassword'];

    $query = "SELECT * FROM users where email = '$userEmail'";
    $result = mysqli_query($connection, $query);

    if ($array = mysqli_fetch_array($result)) {
        die('exist');
    } else {
        $insertQuery = "INSERT INTO users (nombre, email, password, telefono) VALUES ('$userName', '$userEmail', '$userPassword', '$userPhone')";
        $insertResult = mysqli_query($connection, $insertQuery);

        if (!$insertResult) {
            echo '¡Ha ocurrido un error, por favor intentelo de nuevo!';
        } else {
            $selectQuery = "SELECT * FROM users where email = '$userEmail' AND password = '$userPassword'";
            $selectResult = mysqli_query($connection, $query);
            $selectArray = mysqli_fetch_array($selectResult);

            if ($selectArray) {
                setcookie('USER_EMAIL', $selectArray['email'], time() + 31622400, '/');
                setcookie('USER_PASSWORD', $selectArray['password'], time() + 31622400, '/');
                setcookie('USER_ID', $selectArray['idusuario'], time() + 316622400, '/');

                echo 'successful';
            } else {
                echo '¡Ha ocurrido un error, por favor intentelo de nuevo!';
            }

        }
    }
}
