<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "consoleManual";
$fullLink = $hostLink."/designer/manual.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "디자이너 콘솔 설명서";
$descriptionString = "디자이너 콘솔 설명서";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "디자이너 콘솔 설명서";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
