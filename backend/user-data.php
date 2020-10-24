<?php

include 'connection.php';

if(isset($_COOKIE['USER_ID'])){
    $userId = $_COOKIE['USER_ID'];
    
    $query = "SELECT * FROM users WHERE idusuario = '$userId'";
    $result = mysqli_query($connection, $query);
    $array = mysqli_fetch_array($result);

    if($array){              
        $json = array();

        $image = base64_encode($array['imagen']);

        $json[] = array(
            'userId' => $array['idusuario'],
            'userName' => $array['nombre'],
            'userAge' => $array['edad'],
            'userEmail' => $array['email'],
            'userPhone' => $array['telefono'],
            'userDirection' => $array['direccion'],
            'userPassword' => $array['password'],
            'typeImage' => $array['tipoimagen'],
            'userImage' => $image
        );        

        $jsonstring = json_encode($json);
        echo $jsonstring;
        
    }else{          
        echo 'false';      
    }
}

?>