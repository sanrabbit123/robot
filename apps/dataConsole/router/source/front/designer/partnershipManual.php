<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "partnershipManual";
$fullLink = $hostLink."/designer/partnership.php";

$titleString = "홈리에종 파트너십";
$descriptionString = "홈리에종 파트너십";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈리에종 파트너십";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
