<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/portfolio_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();

if (!isset($_SESSION['from'])) {
  if (isset($_SERVER['HTTP_REFERER'])) {
    $sessionHandler->intoSession(array("from" => $_SERVER['HTTP_REFERER']));
  } else {
    $sessionHandler->intoSession(array("from" => "null"));
  }
}

$htmlhtml = new Blockstyle();
$headhtml = '';

$titleinfo = ['디자이너 포트폴리오 | 홈리에종','홈리에종과 협업중인 디자이너분들의 포트폴리오를 만나보세요!','/portfolio.php','/list_image/portpp18/t19p18.jpg'];
$htmlindex = new Portfoliof();

if(!$_GET['search2']){
  $qquery = "SELECT porlid,photodae_s,photodae_d FROM porlist ORDER BY key9 DESC LIMIT 20;";
} else {
  $filtered1 = $htmlindex->eescape($_GET['search1']);
  $filtered2 = $htmlindex->eescape($_GET['search3']);
  $filtered3 = $htmlindex->eescape($_GET['search2']);
  if($filtered1 === ""){
    $filtered1 .= "all";
  }
  $qquery = "SELECT porlid,photodae_s,photodae_d FROM porlist WHERE (designer regexp '{$filtered1}' OR region regexp '{$filtered1}' OR method regexp '{$filtered1}' OR tag regexp '{$filtered1}' OR title regexp '{$filtered1}' OR subtitle regexp '{$filtered1}' OR apart regexp '{$filtered1}' OR pyeong regexp '{$filtered1}') AND (method regexp '{$filtered2}' OR tag regexp '{$filtered2}' OR title regexp '{$filtered2}') ORDER BY {$filtered3} DESC;";
}

$hiddentext = '<h1>홈리에종 디자이너 포트폴리오</h1>';
$hiddentext .= '<h3>홈스타일링 디자이너 포트폴리오 리스트</h3>';
$hiddentext .= '<p>홈리에종 디자이너들의 포트폴리오를 통해 다양한 홈스타일링의 인테리어 스타일을 만나보세요!</p>';
$hiddentext .= '<h3>검색으로 찾는 우리집 홈스타일링</h3>';
$hiddentext .= '<p>다양한 스타일의 우리집 인테리어, 전문적인 디자이너와 함께 꾸며보세요!</p>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'portfolio');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//porlist back
$headhtml .= $htmlindex->porliback();

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- Search bar -->
<?php echo $htmlindex->searchbar(true); ?>

<!-- Contents -->
<div class="porli2s1position"><img src="./list_svg/porporpor/porli.svg" class="porporporimgh"><div class="graybari"></div></div>
<div id="porporid" class="porlicontent"></div>
<form id="porporform" style="display:none;" method="POST">
  <input type="hidden" id="qqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="deporlist">
  <input type="hidden" name="garoarray" value="porli">
</form>

<!-- Below bar -->
<div id="porlibelowback">
  <div id="pordbelowbox">
    <img src="./list_svg/belowlir190905.svg" class="pordbelowsvg">
    <a href="./designer.php"><div id="pordbelowbutton1" class="pordbelowbubu"></div></a>
    <a href="./review.php"><div id="pordbelowbutton2" class="pordbelowbubu"></div></a>
    <a href="./consulting.php"><div id="pordbelowbutton3" class="pordbelowbubu"></div></a>
  </div>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- Margin -->
<div class="moporlimargin0"></div>

<!-- Mobile search bar -->
<?php echo $htmlindex->searchbar(false); ?>

<!-- Margin -->
<div class="moporlimargin1"></div><div class="moporlimargin2"></div>

<!-- Mobile contents -->
<img src="./list_svg/porporpor/mobile/moporli2s1.svg" id="moporli2s1position">
<div id="moporporid" class="moporlicontent"></div>
<form id="moporporform" style="display:none;" method="POST">
  <input type="hidden" id="moqqueryid" name="qquery" value="<?= $qquery ?>">
  <input type="hidden" name="switch" value="moporlist">
  <input type="hidden" name="garoarray" value="porli">
</form>
<div class="moporlimargin0"></div>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('portfolio');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
