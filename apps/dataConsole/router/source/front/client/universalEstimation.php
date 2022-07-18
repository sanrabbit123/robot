<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

if (!isset($_GET["cliid"])) {
  header("Location: ".$hostLink."/index.php");
}

$cliid = $_GET["cliid"];
$client = $general->getClient($cliid);

$name = "universalEstimation";
$fullLink = $hostLink + "/estimation.php?cliid=" + $cliid;

$titleString = "결제 안내 | 홈리에종";
$descriptionString = $client->name." 고객님의 결제 안내 페이지입니다.";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = $client->name." 고객님의 결제 안내 페이지입니다.";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;

?>
