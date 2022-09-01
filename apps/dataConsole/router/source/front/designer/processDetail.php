<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "processDetail";
$fullLink = $hostLink."/designer/process.php";

$titleString = "프로젝트 상세";
$descriptionString = "프로젝트 상세";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "프로젝트 상세";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
