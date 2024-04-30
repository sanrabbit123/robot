<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["proid"])) {
  header("Location: ".$hostLink."/index.php");
}

$proid = $_GET["proid"];
$project = $general->getProject($proid);
$client = $general->getClient($project->cliid);

$name = "designerProposal";
$fullLink = $hostLink."/proposal.php?proid=".$proid;

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "디자이너 추천서 | 홈리에종";
$descriptionString = $client->name." 고객님을 위한 서비스와 디자이너 추천 페이지입니다.";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = $client->name." 고객님을 위한 서비스와 디자이너 추천 페이지입니다.";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;

?>
