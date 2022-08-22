<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

$name = "designerPossible";
$fullLink = $hostLink."/designer/possible.php";

$titleString = "가능 일정 관리";
$descriptionString = "홈스타일링 프로젝트 가능 일정 관리 콘솔";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈스타일링 프로젝트 가능 일정 관리 콘솔";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;
?>
