<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "clientEvaluation";
$fullLink = $hostLink."/evaluation.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 서비스 평가 | 홈리에종";
$descriptionString = "홈리에종 서비스 평가 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈리에종 서비스 평가 페이지 입니다! | 홈리에종";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
