<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "designerList";
$fullLink = $hostLink."/designer.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "디자이너 리스트 | 홈리에종";
$descriptionString = "홈리에종 협업 디자이너 리스트 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$designerList = $general->mysqlGet("SELECT desid, designer FROM designer;");

$hiddenString = "<h1>홈리에종 협업 디자이너</h1><h2>홈스타일링 디자이너</h2><p>홈스타일링 디자이너들의 포트폴리오 및 소개 페이지입니다.</p>";
for ($i = 0; $i < count($designerList); $i++) {
  $hiddenString .= "\n".'<a href="/desdetail.php?desid='.$designerList[$i][0].'">'.$designerList[$i][1]." 디자이너 상세 페이지".'</a>';
}

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;

?>
