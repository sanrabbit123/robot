<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "firstResponse";
$fullLink = $hostLink."/response.php";

$titleString = "홈리에종 서비스 설명 | 홈리에종";
$descriptionString = "홈리에종 서비스 설명 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈리에종 서비스 설명 페이지 입니다! | 홈리에종";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
