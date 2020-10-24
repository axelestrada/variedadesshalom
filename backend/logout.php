<?php

if(isset($_COOKIE['USER_ID'])){
    setcookie('USER_EMAIL', null, -1, '/');
    setcookie('USER_PASSWORD', null, -1, '/');
    setcookie('USER_ID', null, -1, '/');

    echo 'logout';
}else{
    echo 'error';
}

?>