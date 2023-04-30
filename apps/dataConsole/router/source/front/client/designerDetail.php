<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

if (!isset($_GET["desid"])) {
  header("Location: ".$hostLink."/designer.php");
}

$desid = $_GET["desid"];
$designerList = $general->mysqlGet("SELECT desid, designer, introduction, porlid, tid FROM designer WHERE desid = '".$desid."';");
$contentsList = $general->mysqlGet("SELECT pid, portfoliotitlemain, reviewtitlemain FROM contents WHERE desid = '".$desid."';");

$name = "designerDetail";
$fullLink = $hostLink."/desdetail.php?desid=".$desid;

$titleString = $designerList[0][1]." 디자이너 | 홈리에종";
$descriptionString = "홈리에종 디자이너, ".$designerList[0][1]." 디자이너의 상세 내용 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portp".$designerList[0][3]."/".$designerList[0][4].$designerList[0][3].".jpg";

$hiddenString = "<h1>홈리에종 디자이너, ".$designerList[0][1]." 디자이너의 상세 내용 페이지 입니다!</h1>";
$hiddenString .= "\n<p>".$designerList[0][2]."</p>";

for ($i = 0; $i < count($contentsList); $i++) {
  $hiddenString .= "\n".'<a href="/portdetail.php?pid='.$contentsList[$i][0].'">'.$contentsList[$i][1].'</a>';
  if ($contentsList[$i][2] !== '') {
    $hiddenString .= "\n".'<a href="/reviewDetail.php?pid='.$contentsList[$i][0].'">'.$contentsList[$i][2].'</a>';
  }
}

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;

?>
