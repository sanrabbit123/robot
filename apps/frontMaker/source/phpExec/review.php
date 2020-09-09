<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/review_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();

$htmlhtml = new Blockstyle();
$headhtml = '';

$titleinfo = ['홈리에종 고객 후기 | 홈리에종','홈리에종 고객님들의 솔직한 리뷰','/review.php','/list_image/portpp18/t19p18.jpg'];
$htmlindex = new Reviewf();

$qquery = "SELECT revid,porlid,review_photo FROM revlist ORDER BY order_function DESC;";

$hiddentext = '<p>홈리에종 서비스를 받아보신 고객님들의 솔직한 후기, "우리집을 소개합니다"</p>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'review');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- Init -->
<div id="porli2s0back0817" style="background-image: url('./list_image/revrevrev/revlideskback0826.jpg');background-size: 100% auto;background-position: 50% 48%;"></div>
<div id="porli2s0position">
  <img src="./list_svg/revrevrev/desk_revli01105.svg">
</div>

<!-- Reviews -->
<div class="porli2s1position"><img src="./list_svg/revrevrev/revli.svg" class="porporporimgh"><div class="graybari"></div></div>
<div id="porporid" class="porlicontent"></div>
<form id="porporform" style="display:none;" method="POST">
  <input type="hidden" id="qqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="derevlist">
  <input type="hidden" name="garoarray" value="revli">
</form>

<!-- Below -->
<div id="porlibelowback">
  <div id="pordbelowbox">
    <img src="./list_svg/revrevrev/belowrevli.svg" class="pordbelowsvg">
    <a href="./portfolio.php"><div id="pordbelowbutton1" class="pordbelowbubu"></div></a>
    <a href="./designer.php"><div id="pordbelowbutton2" class="pordbelowbubu"></div></a>
    <a href="./consulting.php"><div id="pordbelowbutton3" class="pordbelowbubu"></div></a>
  </div>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- Init -->
<div id="moporli2s0back0817" style="background-image: url('./list_image/revrevrev/mobile/morevlideskback0826.jpg');background-size: auto 100%;background-position: 44% 65%;"></div>
<div id="moporli2s0position">
  <img src="./list_svg/revrevrev/mobile/mobile_revli00831.svg">
</div>

<!-- Reviews -->
<img src="./list_svg/revrevrev/mobile/morevli2s1.svg" id="moporli2s1position">
<div id="moporporid" class="moporlicontent"></div>
<form id="moporporform" style="display:none;" method="POST">
  <input type="hidden" id="moqqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="morevlist">
  <input type="hidden" name="garoarray" value="revli">
</form>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('review');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
