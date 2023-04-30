<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "portfolioList";
$fullLink = $hostLink."/portfolio.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 포트폴리오 | 홈리에종";
$descriptionString = "홈리에종 디자이너 포트폴리오 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<h1>홈리에종 디자이너 포트폴리오</h1><h3>홈스타일링 디자이너 포트폴리오 리스트</h3><p>홈리에종 디자이너들의 포트폴리오를 통해 다양한 홈스타일링의 인테리어 스타일을 만나보세요!</p><h3>검색으로 찾는 우리집 홈스타일링</h3><p>다양한 스타일의 우리집 인테리어, 전문적인 디자이너와 함께 꾸며보세요!</p>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
