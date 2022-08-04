<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "requestDetail";
$fullLink = $hostLink."/designer/request.php";

$titleString = "홈스타일링 의뢰서";
$descriptionString = "홈스타일링 의뢰서";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈스타일링 의뢰서";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
