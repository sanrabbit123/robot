<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/designer_f.php';
// require_once __DIR__.'/engine/Sessions.php';
// $sessionHandler = new SessionExec();

$htmlhtml = new Blockstyle();
$headhtml = '';
$titleinfo = ['디자이너 | 홈리에종','홈리에종과 협업중인 홈스타일링 디자이너 리스트입니다.','/designer.php','/list_image/portpp18/t19p18.jpg'];
$htmlindex = new Designerf();
$htmlindex->setNull([ "de024" ]);
$row = $htmlindex->setRow();
if ($row === "error") {
  header('Location: https://home-liaison.com');
}

$hiddentext = '<h1>홈리에종 협업 디자이너</h1><h2>홈스타일링 디자이너</h2><p>홈스타일링 디자이너들의 포트폴리오 및 소개 페이지입니다.</p><p>CEO : 박혜연서울특별시 마포구 독막로 279, B1f 06호사업자등록번호 : 863-65-00069통신판매신고업 : 제 2018 - 서울마포 - 2380호</p>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'designer');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;
//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- init -->
<div id="deliback1"></div>
<div id="deliback0" style="background-image: url('./list_image/delist/designerback10830.jpg');background-size: 100% auto;background-position: 50% 77%;"></div>
<div id="deli2s0position">
  <img src="./list_svg/delist/desk_deli00831.svg">
</div>

<!-- list -->
<div id="delist2stotal">
  <div class="delicontent">
    <img class="delishadow" src="list_image/newconsultingshadowweb.png">
    <div class="deliwhitebox">
      <?php echo $htmlindex->designerList(true); ?>
    </div>
  </div>
  <div class="totalmargin1"></div>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- init -->
<div id="modeliback0" style="background-image: url('./list_image/delist/mobile/modesignerback10830.jpg');background-size: auto 100%;background-position: 44% 65%;"></div>
<div id="modeli2s0">
  <img src="./list_svg/delist/mobile_deli00831.svg">
</div>

<!-- list -->
<div id="modelist2s1">
  <div class="modelicontent">
      <img src="./list_svg/delist/modeli2s1.svg" id="modeli2s1position">
      <?php echo $htmlindex->designerList(false); ?>
  </div>
</div>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('designer');
echo $htmlhtml->htmlend();
// $sessionHandler->closeSession();
?>
