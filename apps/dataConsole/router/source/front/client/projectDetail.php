<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;

if (!isset($_GET["proid"])) {
  header("Location: ".$hostLink."/index.php");
}

$proid = $_GET["proid"];
$project = $general->getProject($proid);
$client = $general->getClient($project->cliid);

$name = "projectDetail";
$fullLink = $hostLink."/project.php?proid=".$proid;

$titleString = "프로젝트 상세 | 홈리에종";
$descriptionString = $client->name." 고객님 프로젝트 상세 페이지입니다!";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = $client->name." 고객님 프로젝트 상세 페이지입니다!";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink);
echo $html;

?>
