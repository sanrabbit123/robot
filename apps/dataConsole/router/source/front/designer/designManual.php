<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "designManual";
$fullLink = $hostLink."/designer/manual.php";

$titleString = "홈스타일링 제공 내역";
$descriptionString = "홈스타일링 제공 내역";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈스타일링 제공 내역";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
