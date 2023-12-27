<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "setPortfolio";
$fullLink = $hostLink."/designer/setting.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "세트 포트폴리오 전송";
$descriptionString = "세트 포트폴리오 전송";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "세트 포트폴리오 전송";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
