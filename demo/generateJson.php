<?php
/**
 * Created by PhpStorm.
 * User: quentinmangin
 * Date: 19/05/2016
 * Time: 19:02
 */

$dir    = 'r1/';
$files = scandir($dir);
$files = array_diff($files, array('.', '..'));

$baseArray = array();

foreach($files as $imageUrl){
    $type = pathinfo($dir.$imageUrl, PATHINFO_EXTENSION);
    $data = file_get_contents($dir.$imageUrl);
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

    array_push($baseArray,$base64);
}

$fp = fopen('ronin_2.json', 'w');
fwrite($fp, json_encode($baseArray, JSON_PRETTY_PRINT));
fclose($fp);