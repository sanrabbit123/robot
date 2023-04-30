<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["mid"])) {
  header("Location: ".$hostLink."/magazine.php");
}

$mid = $_GET["mid"];
$magazine = $general->getMagazine($mid);

$name = "magazineDetail";
$fullLink = $hostLink."/magdetail.php?mid=".$mid;

$titleString = $magazine->contents->detail[0]->text[0]." ".$magazine->contents->detail[0]->text[1]." | 홈리에종";
$descriptionString = $magazine->contents->detail[1]->text[0];
$imageString = "/list_image/magaz".$magazine->mid.$magazine->contents->init[1];

$hiddenString = '<h1>홈리에종 매거진</h1><h3>홈스타일링 매거진 디테일</h3>'.$magazine->contents->detail[0]->text[0]." ".$magazine->contents->detail[0]->text[1]." ".$magazine->contents->detail[1]->text[0];

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
