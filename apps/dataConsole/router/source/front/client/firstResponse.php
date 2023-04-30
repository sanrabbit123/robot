<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["cliid"])) {
  header("Location: ".$hostLink."/consulting.php");
}

$cliid = $_GET["cliid"];
$client = $general->getClient($cliid);

$name = "firstResponse";
$fullLink = $hostLink."/response.php?cliid=".$cliid;

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 서비스 설명 | 홈리에종";
$descriptionString = "홈리에종 서비스 설명 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈리에종 서비스 설명 페이지 입니다! | 홈리에종";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
