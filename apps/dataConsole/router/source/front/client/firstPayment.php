<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "firstPayment";
$fullLink = $hostLink."/payment.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "계약금 결제 안내 | 홈리에종";
$descriptionString = "계약금 결제 안내 페이지입니다.";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "계약금 결제 안내 페이지입니다.";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;

?>
