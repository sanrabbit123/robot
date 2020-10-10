<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/portdetail_f.php';
// require_once __DIR__.'/engine/Sessions.php';
// $sessionHandler = new SessionExec();

$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Portdetailf();

if ($_GET['qqq'] === "g00" || $_GET['qqq'] === "_removed_" || !isset($_GET['qqq'])) { header('Location: https://home-liaison.com/portfolio.php'); }
$row = $htmlindex->getContents($_GET['qqq']);
$designer = $htmlindex->getDesigner($row->desid);
$htmlindex->setContents($row);
$htmlindex->setDesigner($designer);
if ($row === "error" || $designer === "error") { header('Location: https://home-liaison.com/portfolio.php'); }

$titleinfo = [ ($row->apartname." | 홈리에종"), ("홈리에종 디자이너 포트폴리오 | ".$row->apartname), ("/portdetail.php?qqq=".$row->porlid), "/list_image/portp".$row->porlid."/t".$row->photodae[1].$row->porlid.".jpg" ];

$hiddentext = '<h1>홈스타일링 포트폴리오</h1>';
$hiddentext .= '<p>홈리에종 디자이너들의 상세한 홈스타일링 포트폴리오 컨텐츠</p>';
$hiddentext .= '<h1>주거 인테리어 포트폴리오</h1>';
$hiddentext .= '<p>인테리어 디자이너들의 상세한 디자인 포트폴리오 컨텐츠</p>';
$hiddentext .= '<section id="prd_ids" style="display:none" cus_p_id="'.$row->porlid.'" cus_r_id="'.$row->revid.'" cus_d_id="'.$row->desid.'"></section>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'portdetail');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- above box -->
<div id="pordmainbox" class="fadeInmaininit">
  <?php
  //slide
  echo $htmlindex->slideBox("desktop");
  //designer box
  echo $htmlindex->designerBox("porddesignerbox", true);
  //title box
  echo $htmlindex->titleBox("desktop");
  ?>
</div>

<!-- detail back & wording -->
<div id="porddetailback" class="fadeInmaininit"></div>
<div id="porddetail" class="fadeInmaininit"><img src="./list_svg/detail190905.svg"></div>

<!-- main contents -->

<!-- contents -->
<div id="pordcontent">
  <?php
  //desktop title
  echo $htmlindex->mainContentTitle();
  //desktop content
  echo $htmlindex->mainContentLoop(true);
  //desktop hook box
  echo $htmlindex->hookBox("desktop");
  ?>
</div>

<!-- below -->
<div id="pordbelowback">
  <div id="pordbelowbox">
    <img src="./list_svg/belowbar190905.svg" class="pordbelowsvg">
    <a href="./portfolio.php"><div id="pordbelowbutton1" class="pordbelowbubu"></div></a>
    <a href="./review.php"><div id="pordbelowbutton2" class="pordbelowbubu"></div></a>
    <a href="./consulting.php"><div id="pordbelowbutton3" class="pordbelowbubu"></div></a>
  </div>
</div>


<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//mobile silde
echo $htmlindex->slideBox("mobile");

//mobile title
echo $htmlindex->titleBox("mobile");

//mobile main contents
echo $htmlindex->mainContentLoop(false);

//mobile designer box
echo $htmlindex->designerBox("moporddesigner modsub1", false);

//mobile hook box
echo $htmlindex->hookBox("mobile");

//mobile footer
echo $htmlhtml->mofootfoot('portdetail');
echo $htmlhtml->htmlend();
// $sessionHandler->closeSession();
?>
