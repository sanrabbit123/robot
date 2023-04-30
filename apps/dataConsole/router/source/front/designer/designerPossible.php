<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "designerPossible";
$fullLink = $hostLink."/designer/possible.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "가능 일정 관리";
$descriptionString = "홈스타일링 프로젝트 가능 일정 관리 콘솔";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "홈스타일링 프로젝트 가능 일정 관리 콘솔";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
