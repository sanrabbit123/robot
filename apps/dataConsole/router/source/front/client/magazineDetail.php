<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["mid"])) {
  header("Location: ".$hostLink."/magazine.php");
}

$mid = $_GET["mid"];

$name = "magazineDetail";
$fullLink = $hostLink."/magdetail.php?mid=".$mid;

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 매거진 | 홈리에종";
$descriptionString = "홈리에종 매거진 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<h1>홈리에종 매거진</h1><h3>홈스타일링 매거진</h3>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
