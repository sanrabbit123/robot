<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "designerLogin";
$fullLink = $hostLink."/designer/login.php";

$titleString = "디자이너 콘솔";
$descriptionString = "디자이너 콘솔";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "디자이너 콘솔";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
