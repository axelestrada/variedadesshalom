<?php

include 'connection.php';

if (isset($_POST['userName']) && isset($_COOKIE['USER_ID'])) {
    $userId = $_COOKIE['USER_ID'];
    $userName = $_POST['userName'];
    $userAge = $_POST['userAge'];
    $userEmail = $_POST['userEmail'];
    $userPhone = $_POST['userPhone'];
    $userDirection = $_POST['userDirection'];

    if (strpos($userEmail, 'same') !== false) {
        $userEmailSame = explode('*', $userEmail);
        $email = $userEmailSame[0];

        $insertQuery = "UPDATE users SET nombre = '$userName', edad = '$userAge', email = '$email', telefono = '$userPhone', direccion = '$userDirection' where idusuario = '$userId'";
        $insertResult = mysqli_query($connection, $insertQuery);

        if (!$insertResult) {
            echo '¡Ha ocurrido un error, por favor intentelo de nuevo!';
        } else {
            $selectQuery = "SELECT * FROM users where email = '$email'";
            $selectResult = mysqli_query($connection, $selectQuery);
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

    } else {
        $userEmailSame = explode('*', $userEmail);
        $email = $userEmailSame[0];

        $query = "SELECT * FROM users where email = '$email'";
        $result = mysqli_query($connection, $query);

        if ($array = mysqli_fetch_array($result)) {
            die('exist');
        } else {
            $insertQuery = "UPDATE users SET nombre = '$userName', edad = '$userAge', email = '$userEmail', telefono = '$userPhone', direccion = '$userDirection' where idusuario = '$userId'";
            $insertResult = mysqli_query($connection, $insertQuery);

            if (!$insertResult) {
                echo '¡Ha ocurrido un error, por favor intentelo de nuevo!';
            } else {
                $selectQuery = "SELECT * FROM users where email = '$userEmail'";
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

}
