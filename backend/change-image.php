<?php

include 'connection.php';

if (isset($_FILES['file']['name'])) {
    if (($_FILES["file"]["type"] == "image/pjpeg") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/gif")) {
        $userId = $_COOKIE['USER_ID'];

        $tipoArchivo = $_FILES['file']['type'];
        $nombreArchivo = $_FILES['file']['name'];
        $tamanoArchivo = $_FILES['file']['size'];
        
        $imagenSubida = fopen($_FILES['file']['tmp_name'], 'r');
        $binariosImagen = fread($imagenSubida, $tamanoArchivo);

        $binariosImagen = mysqli_escape_string($connection, $binariosImagen);

        $query = "UPDATE users SET nombreimagen = '".$nombreArchivo."', imagen = '".$binariosImagen."', tipoimagen = '".$tipoArchivo."' WHERE idusuario = '".$userId."'";
        $result = mysqli_query($connection, $query);

        $query = "SELECT nombreimagen FROM users where nombreimagen = '".$nombreArchivo."'";
        $result = mysqli_query($connection, $query);

        if($array = mysqli_fetch_array($result)){
            echo 'true';
        }else{
            echo 'error :(';
        }

    } else {
        echo '¡Formato de imagen incorrecto!';
    }
}
