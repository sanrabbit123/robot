<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "serviceDetail";
$fullLink = $hostLink."/service.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$thisMode = "furnishing";
if (!isset($_GET["mode"])) {
  $thisMode = "furnishing";
} else {
  $thisMode = $_GET["mode"];
}

if ($thisMode === "furnishing") {
  $titleString = "홈퍼니싱 소개 | 홈리에종";
  $descriptionString = "홈퍼니싱 소개 및 설명 페이지 입니다! | 홈리에종";
  $hiddenString = "홈퍼니싱 소개 및 설명 페이지 입니다! | 홈리에종";
} else if ($thisMode === "styling") {
  $titleString = "홈스타일링 소개 | 홈리에종";
  $descriptionString = "홈스타일링 소개 및 설명 페이지 입니다! | 홈리에종";
  $hiddenString = "홈스타일링 소개 및 설명 페이지 입니다! | 홈리에종";
} else if ($thisMode === "total") {
  $titleString = "토탈 스타일링 소개 | 홈리에종";
  $descriptionString = "토탈 스타일링 소개 및 설명 페이지 입니다! | 홈리에종";
  $hiddenString = "토탈 스타일링 소개 및 설명 페이지 입니다! | 홈리에종";
}

$imageString = "/list_image/portpp18/t19p18.jpg";

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
