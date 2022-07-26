<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "frontNotfound";
$fullLink = $hostLink."/notfound.php";

$titleString = "잘못 들어오셨습니다! | 홈리에종";
$descriptionString = "잘못 들어오셨습니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '잘못 들어오셨습니다! | 홈리에종';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
