<?php
require_once __DIR__.'/general.php';

$general = new GeneralPhp();
$general->officeRedirect();
$host = $general->host;
$protocol = $general->protocol;
$hostLink = $protocol.$host;
$sessionId = $general->setSessionId();
$clientInfo = $general->getClientInfo();

$name = "frontIndex";
$fullLink = $hostLink."/index.php";

if (!($sessionId)) {
  $general->clearAllCookies();
  header("Location: ".$fullLink);
}

$titleString = "홈리에종 | 디자이너와 함께 하는 홈스타일링";
$descriptionString = "홈리에종은 홈스타일링 전문 플랫폼으로, 집을 디자인하는 새로운 방법을 제안합니다.";
$imageString = "/list_image/portpp18/t19p18.jpg";

$hiddenString = '<h1>홈리에종 | 디자이너와 함께하는 홈스타일링 플랫폼</h1>';
$hiddenString .= '<p>작은집에 사는 사람도, 큰집에 사는 사람도 자신의 집이 가장 소중하고 누구나, 행복하게 아름답게 살 권리가 있어요. 집은 섬세하고 요소가 100가지가 넘기 때문에 어떤 디자이너를 만나는지가 중요해요. 특히 가용예산에 맞춰지면 최고죠.서울 마포 사무실에 만난 홈리에종 박혜연(36)대표의 말이다. 2015년 창업해 현재 3년째인 홈스타일링 플랫폼 업체인 홈리에종은 현재 박 대표를 포함해 3명의 직원과 프리랜서 디자이너 60여명이 활동 중이다.';
$hiddenString .= '소비자와 디자이너를 연결해주는 회사 홈리에종은 인테리어 스타일링 서비스를 거래하는 전문 플랫폼으로 디자이너와의 만남부터 시공 및 세팅까지 체계적으로 지원하는 인테리어 서비스 플랫폼이다. 벽지 등의 간단한 마감재나 가구나 소품의 선택부터 질 높은 시공 서비스까지 케어해주는 Web 기반 서비스이다.쾌적한 곳에서 살고 싶다는 욕구는 누구나 갖고 있지만 돈이 문제다. 돈을 많이 들이지 않고도 집을 원하는 대로 스타일링 하고 싶어하는 소비자에게 딱 맞는 서비스를 제공하는 홈리에종은 인테리어 시장에서 가성비 높은 서비스를 제공하는 회사다';
$hiddenString .= '15년간 공간기획 및 디자인 분야에서 일했어요. 그러다 30대 중반 잠시 1년간 해외에서 쉬면서 계속 공부를 할 것인가를 고민하다. 의미 있는 일, 고객에게 가치 있는 어떤 역할을 하고 싶다는 생각에서 일을 시작하게 되었어요.”</p>';

$html = $general->bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo);
echo $html;
?>
