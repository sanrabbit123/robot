<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "designerReport";
$fullLink = $hostLink."/designer/report.php";

$titleString = "정산 리포트";
$descriptionString = "정산 리포트";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "정산 리포트";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
