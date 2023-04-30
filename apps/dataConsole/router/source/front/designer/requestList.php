<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "requestList";
$fullLink = $hostLink."/designer/requests.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈스타일링 의뢰서 목록";
$descriptionString = "홈스타일링 의뢰서 목록";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈스타일링 의뢰서 목록";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
