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

$hiddentext = '<h1>홈리에종 디자이너 포트폴리오</h1><h3>홈스타일링 디자이너 포트폴리오 리스트</h3><p>홈리에종 디자이너들의 포트폴리오를 통해 다양한 홈스타일링의 인테리어 스타일을 만나보세요!</p><h3>검색으로 찾는 우리집 홈스타일링</h3><p>다양한 스타일의 우리집 인테리어, 전문적인 디자이너와 함께 꾸며보세요!</p>';

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'portfolio');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$pluginjs = [];
$headhtml .= $htmlhtml->totaljavascript('portfolio', $pluginjs);

echo $headhtml;
$sessionHandler->closeSession();
?>
