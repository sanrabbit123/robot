<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/desevent_f.php';

$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Deseventf();

$title = "";
if ($_GET["mode"] === "presentation") {
  $title = "디자이너 설명회 | 홈리에종";
} else {
  $title = "디자이너 파트너십 | 홈리에종";
}

$titleinfo = [ $title, '홈리에종의 디자이너 파트너십 신청 페이지입니다.', '/desevent.php', '/list_image/portpp18/t19p18.jpg' ];

$hiddentext = "<h1>디자이너 신청 | 홈리에종</h1><h2>홈리에종의 디자이너 파트너십 신청 페이지입니다.</h2><p>CEO : 박혜연서울특별시 마포구 독막로 279, B1f 06호사업자등록번호 : 863-65-00069통신판매신고업 : 제 2018 - 서울마포 - 2380호</p>";

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'desevent');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$pluginjs = [
  "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js",
];
$headhtml .= $htmlhtml->totaljavascript('desevent', $pluginjs);

echo $headhtml;
?>
