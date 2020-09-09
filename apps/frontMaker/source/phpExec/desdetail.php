<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/desdetail_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();

$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Desdetailf();

if ($_GET['qqq'] === "de999" || !isset($_GET['qqq'])) { header('Location: https://home-liaison.com/designer.php'); }
$designer = $htmlindex->getDesigner($_GET['qqq']);
$htmlindex->setDesigner($designer);
$row = $htmlindex->getContents();
$htmlindex->setContents($row);
if ($row === "error" || $designer === "error") { header('Location: https://home-liaison.com/designer.php'); }
$qquery = "SELECT porlid,photodae_s,photodae_d FROM porlist WHERE desid regexp '".$designer->desid."' ORDER BY key9 DESC LIMIT 20;";

$titleinfo = [ ($designer->name." | 홈리에종"), ("홈리에종과 협업중인 홈스타일링 디자이너, ".$designer->name."의 상세 페이지입니다."), ("/desdetail.php?qqq=".$designer->desid), '/list_image/portpp18/t19p18.jpg' ];

$hiddentext = '<h1>홈리에종 협업 디자이너</h1><h2>홈스타일링 디자이너</h2><p>홈스타일링 디자이너들의 포트폴리오 및 소개 페이지입니다.</p><p>CEO : 박혜연서울특별시 마포구 독막로 279, B1f 06호사업자등록번호 : 863-65-00069통신판매신고업 : 제 2018 - 서울마포 - 2380호</p>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'desdetail');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- background -->
<div id="dedeback1" class="fadeInmaininit"></div>
<div id="dedeback0" class="fadeInmaininit"></div>
<div id="dedetail2s0position" class="fadeInmaininit">
  <img src="./list_svg/dedetail/designerdetail.svg">
</div>

<!-- designer box -->
<img id="dedeshadow1" src="./list_image/main2s3shadow30520.png">
<div id="dedetaildesignerbox">
  <?php echo $htmlindex->designerBox(true); ?>
</div>

<!-- portfolio -->
<div id="porporid" class="porlicontent"></div>
<form id="porporform" style="display:none;" method="POST">
  <input type="hidden" id="qqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="deporlist">
  <input type="hidden" name="garoarray" value="porli">
</form>

<!-- below -->
<div id="dedebelowback">
  <div id="dedebelowbox">
    <img src="./list_svg/belowlir190905.svg" class="dedebelowsvg">
    <a href="./designer.php"><div id="dedebelowbutton1" class="dedebelowbubu"></div></a>
    <a href="https://blog.naver.com/homeliaison"><div id="dedebelowbutton2" class="dedebelowbubu"></div></a>
    <a href="./consulting.php"><div id="dedebelowbutton3" class="dedebelowbubu"></div></a>
  </div>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- background -->
<div id="modedeback1"></div>
<div id="modedeback0"></div>

<!-- designer box -->
<div id="modedetaildesignerbox">
  <?php echo $htmlindex->designerBox(false); ?>
  <div class="modivclass1"><div class="modivclass2"></div></div>
</div>

<!-- portfolio -->
<div id="moporporid" class="moporlicontent"></div>
<form id="moporporform" style="display:none;" method="POST">
  <input type="hidden" id="moqqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="moporlist">
  <input type="hidden" name="garoarray" value="porli">
</form>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('desdetail');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
