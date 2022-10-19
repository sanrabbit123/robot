<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "styleParts";
$fullLink = $hostLink."/styleparts.php";

$titleString = "스타일 파츠 | 홈리에종";
$descriptionString = "스타일 파츠 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '스타일 파츠 페이지 입니다! | 홈리에종';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
