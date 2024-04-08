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

$name = "styleExplanation";
$fullLink = $hostLink."/curation_test.php?cliid=".$cliid;

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "상세 큐레이션 | 홈리에종";
$descriptionString = $client->name." 고객님과 디자이너의 정확한 매칭을 위해 상세한 정보가 필요합니다. 그 정보를 기입할 수 있는 상세 큐레이션 페이지입니다.";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = $client->name." 고객님과 디자이너의 정확한 매칭을 위해 상세한 정보가 필요합니다. 그 정보를 기입할 수 있는 상세 큐레이션 페이지입니다.";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;

?>
