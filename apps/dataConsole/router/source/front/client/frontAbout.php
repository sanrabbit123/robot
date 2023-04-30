<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "frontAbout";
$fullLink = $hostLink."/about.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 서비스 소개 | 홈리에종";
$descriptionString = "홈리에종 서비스 소개 페이지 입니다! | 홈리에종";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<h1>서비스 소개 | 홈리에종</h1><h2>최종적인 모습까지</h2><p>홈리에종은 \'인테리어의 완성\'을 가구, 패브릭,조명, 소품까지 자리잡은 상태라고 정의합니다.</p><p>그 완벽한 ‘인테리어의 완성’을 위해 홈리에종은마지막 과정까지 서비스를 진행해드립니다.</p><h2>효율적인 프로세스</h2><p>홈리에종에서 서비스 추천, 디자이너 큐레이션,디자인, 필요한 시공, 홈스타일링까지 한번에!</p><p>또한 필요한 부분만 골라서 할 수도 있어요!시공 따로 스타일링 따로하는 것도 가능하답니다.</p><h2>홈스타일링이란?</h2><p>불필요한 시공으로 과한 예산을 사용하고스타일링은 안 해주는 리모델링과 달리,</p><p>홈스타일링은 꼭 필요한 시공과 가구 / 소품배치를 통해 합리적으로 예산을 사용합니다.</p><h2>디자이너와 함께</h2><p>디자이너와 함께 하면 디자인비가 들지만,훨씬 더 나은 퀄리티의 결과는 물론이고</p><p>시행 착오로 인한 낭비를 막아주며, 할인또한 받을 수 있어 예산상으로도 좋습니다.</p><h2>홈리에종의 역할</h2><p>홈리에종은 고객님의 상황과 취향을 보고정확히 딱 맞는 디자이너를 추천해드립니다.</p><p>또한 에스크로 서비스를 통해 안전한스타일링비 거래를 보증하고 중재해드리죠.</p><h2>만족스런 후기</h2><p>처음에 망설이시는 고객님들이 많아요.홈스타일링이 낯설고, 두려울 수 있으니까요.</p><p>하지만 끝나고 나선 얼굴에 행복이 가득하셨죠. 그분들의 만족런 후기! 지금 만나보세요.</p>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
