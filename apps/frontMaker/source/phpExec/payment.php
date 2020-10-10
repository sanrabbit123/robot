<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/payment_f.php';
// require_once __DIR__.'/engine/Sessions.php';
// $sessionHandler = new SessionExec();
$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Paymentf();

$hiddentext = "<h1>계약금 안내 | 홈리에종</h1><h2>홈리에종 계약금 안내 및 카드 결제 페이지입니다.</h2>";
$titleinfo = ['계약금 안내 | 홈리에종','홈리에종 계약금 안내 및 카드 결제 페이지입니다.','/payment.php?type=contract','/list_image/portpp18/t19p18.jpg'];

if ($_GET["type"] === "left") {
  $hiddentext = "<h1>잔금 안내 | 홈리에종</h1><h2>홈리에종 잔금 안내 및 카드 결제 페이지입니다.</h2>";
  $titleinfo = ['잔금 안내 | 홈리에종','홈리에종 잔금 안내 및 카드 결제 페이지입니다.','/payment.php?type=left','/list_image/portpp18/t19p18.jpg'];
} else if ($_GET["type"] === "channel") {
  $hiddentext = "<h1>홈리에종 채널 안내 | 홈리에종</h1><h2>홈리에종 채널 안내 페이지입니다.</h2>";
  $titleinfo = ['홈리에종 채널 안내 | 홈리에종','홈리에종 채널 안내 페이지입니다.','/payment.php?type=channel','/list_image/portpp18/t19p18.jpg'];
} else if ($_GET["type"] === "terms") {
  $hiddentext = "<h1>개인정보 처리 방침 | 홈리에종</h1><h2>홈리에종 개인정보 처리 방침 페이지입니다.</h2>";
  $titleinfo = ['개인정보 처리 방침 | 홈리에종','홈리에종 개인정보 처리 방침 페이지입니다.','/payment.php?type=terms','/list_image/portpp18/t19p18.jpg'];
  if($_GET['qqq'] == "policy"){
    $hiddentext = "<h1>이용 약관 | 홈리에종</h1><h2>홈리에종 이용 약관 페이지입니다.</h2>";
    $titleinfo = ['이용 약관 | 홈리에종','홈리에종 이용 약관 페이지입니다.','/payment.php?type=terms&qqq=policy','/list_image/portpp18/t19p18.jpg'];
  } else if($_GET['qqq'] == "faq"){
    $hiddentext = "<h1>FAQ | 홈리에종</h1><h2>홈리에종 FAQ 페이지입니다.</h2>";
    $titleinfo = ['FAQ | 홈리에종','홈리에종 FAQ 페이지입니다.','/payment.php?type=faq','/list_image/portpp18/t19p18.jpg'];
  }
}

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'payment');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$pluginjs = [
  "https://code.jquery.com/jquery-1.12.4.min.js",
  "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js",
];
$headhtml .= $htmlhtml->totaljavascript('payment', $pluginjs);

echo $headhtml;
// $sessionHandler->closeSession();
?>
