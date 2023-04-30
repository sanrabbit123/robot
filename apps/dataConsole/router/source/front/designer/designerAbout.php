<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "designerAbout";
$fullLink = $hostLink."/designer/about.php";

$titleString = "디자이너 체크리스트";
$descriptionString = "디자이너 체크리스트";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = "디자이너 체크리스트";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
