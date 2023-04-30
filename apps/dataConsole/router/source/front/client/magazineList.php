<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$magazineList = $general->getMagazineList();

$name = "magazineList";
$fullLink = $hostLink."/magazine.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 매거진 | 홈리에종";
$descriptionString = "홈리에종 매거진 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<h1>홈리에종 매거진</h1><h3>홈스타일링 매거진 리스트</h3>';
for ($i = 0; $i < count($magazineList); $i++) {
  $hiddenString .= '<a href="/magdetail.php?mid='.$magazineList[$i]->mid.'" class="hiddenobject">'.$magazineList[$i]->contents->detail[0]->text[0]." ".$magazineList[$i]->contents->detail[0]->text[1].'</a>';
}

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
