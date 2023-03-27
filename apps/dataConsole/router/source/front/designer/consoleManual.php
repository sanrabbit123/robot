<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "consoleManual";
$fullLink = $hostLink."/designer/manual.php";

$titleString = "디자이너 콘솔 설명서";
$descriptionString = "디자이너 콘솔 설명서";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "디자이너 콘솔 설명서";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
