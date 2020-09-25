<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/revdetail_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();

$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Revdetailf();

if ($_GET['qqq'] === "re999" || $_GET['qqq'] === "_removed_" || !isset($_GET['qqq'])) { header('Location: https://home-liaison.com/review.php'); }
$row = $htmlindex->getContents($_GET['qqq']);
$designer = $htmlindex->getDesigner($row->desid);
$htmlindex->setContents($row);
$htmlindex->setDesigner($designer);

$titleinfo = [ ($row->retitle." | 홈리에종"), ("홈리에종 디자이너 포트폴리오 | ".$row->retitle), ("/revdetail.php?qqq=".$row->revid), "/list_image/portp".$row->porlid."/t".$row->photodae[1].$row->porlid.".jpg" ];

$hiddentext = '<p>홈리에종 서비스를 받아보신 고객님들의 솔직한 후기입니다.</p>';
$hiddentext .= '<section id="prd_ids" style="display:none" cus_p_id="'.$row->porlid.'" cus_r_id="'.$row->revid.'" cus_d_id="'.$row->desid.'"></section>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'revdetail');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Init
echo $htmlindex->mainBox(true);

//Main contents
echo '<div id="pordcontent">';
echo $htmlindex->contentsBox(true);
echo $htmlindex->hookBox(true);
echo '</div>';

//Below
echo $htmlindex->belowBox();

//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Init
echo $htmlindex->mainBox(false);

//Main contents
echo $htmlindex->contentsBox(false);
echo $htmlindex->hookBox(false);

//mobile footer
echo $htmlhtml->mofootfoot('revdetail');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
