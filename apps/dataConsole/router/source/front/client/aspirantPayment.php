<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "aspirantPayment";
$fullLink = $hostLink."/asppayment.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 디자이너 등록비 결제 | 홈리에종";
$descriptionString = "홈리에종 디자이너 등록비 결제 안내 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈리에종 디자이너 등록비 결제 안내 페이지 입니다! | 홈리에종";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
