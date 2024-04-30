<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "reviewList";
$fullLink = $hostLink."/review.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 고객 리뷰 | 홈리에종";
$descriptionString = "홈리에종 고객 리뷰 리스트 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<p>홈리에종 홈스타일링 서비스를 받아보신 고객님들의 솔직한 후기, "우리집을 소개합니다"</p>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
