<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "frontTerms";
$fullLink = $hostLink."/terms.php";

$titleString = "홈리에종 개인정보 처리 방침 | 홈리에종";
$descriptionString = "홈리에종 홈리에종 개인정보 처리 방침 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '홈리에종 홈리에종 개인정보 처리 방침 페이지 입니다! | 홈리에종';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
