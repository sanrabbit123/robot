<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["pid"])) {
  header("Location: ".$hostLink."/portfolio.php");
}

$pid = $_GET["pid"];
$contentsList = $general->mysqlGet("SELECT pid, portfoliotitlemain, apart, portfoliocontents, portfoliotid FROM contents WHERE pid = '".$pid."';");

$name = "portfolioDetail";
$fullLink = $hostLink."/portdetail.php?pid=".$pid;

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = $contentsList[0][2]." | 홈리에종";
$descriptionString = explode("\n", $contentsList[0][3])[0];
$imageString = "/list_image/portp".$contentsList[0][0]."/".$contentsList[0][4].$contentsList[0][0].".jpg";

$hiddenString = '<h1>'.$contentsList[0][1].'</h1><p>'.$contentsList[0][3].'</p>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
