module.exports = function (dayString) {
  return `<?php
class Blockstyle {

  private $plugin = NULL;

  function __construct() {}

  public function htmlstart($titleinfo, $cssself) {
    $html = "<!DOCTYPE html>\\n";
    $html .= "<html lang=\\"ko-KR\\" xmlns:og=\\"http://ogp.me/ns#\\">\\n<head>\\n<meta charset=\\"UTF-8\\">\\n";
    $html .= "<title>".$titleinfo[0]."</title>\\n";
    $html .= '<meta name="referrer" content="same-origin">';
    $html .= '<meta name="description" content="'.$titleinfo[1].'">';
    $html .= '<link rel="canonical" href="https://home-liaison.com'.$titleinfo[2].'">';
    $html .= '<meta content="'.$titleinfo[0].'" property="og:title">';
    $html .= '<meta content="'.$titleinfo[1].'" property="og:description">';
    $html .= '<meta content="https://home-liaison.com'.$titleinfo[2].'" property="og:url">'.'<meta content="website" property="og:type">';
    $html .= '<meta content="https://home-liaison.com'.$titleinfo[3].'" property="og:image">';
    $html .= '<meta name="google-site-verification" content="YRxCc6xhQlM3qTygta5Qw0CObJJrLDYmUE8_wCR0AQc">'.'<meta name="twitter:card" content="summary_large_image">'.'<meta content="855866308109037" property="fb:app_id">';
    $html .= '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">';
    $html .= '<meta name="robots" content="index,follow">';
    $html .= '<style></style>';
    $html .= '<script type="text/javascript" src="/js/'.$cssself.'_svg_${dayString}.js"></script>';
    $html .= '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">'.'<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-20190722112100.png">'.'<meta name="msapplication-TileImage" content="/mstile-144x144-20190722112100.png">';
    $html .= '<link rel="manifest" href="/manifest.json">';
    $html .= '<meta name="keywords" content="홈스타일링, 홈리에종, 주거인테리어">';
    if ($cssself === "index") {
      $html .= '<script type="application/ld+json">{"@context": "http:\\/\\/schema.org","@id": "http:\\/\\/home-liaison.com#","@type": "ProfessionalService","url": "https:\\/\\/home-liaison.com","name": "홈리에종 | 디자이너와 함께하는 홈스타일링 플랫폼","description": "홈리에종은 홈스타일링 플랫폼으로, 집을 디자인하는 새로운 방법을 제안합니다.","sameAs": ["https:\\/\\/www.facebook.com\\/homeliaison","https:\\/\\/blog.naver.com\\/homeliaison","https:\\/\\/www.instagram.com\\/homeliaison"],"address": {"@type": "PostalAddress","streetAddress": "279, Dongmak-ro","addressLocality": "Seoul","addressRegion": "Mapo-gu","postalCode": "04151","addressCountry": "KR"},"telephone": "02-2039-2252","image": "https:\\/\\/home-liaison.com\\/share\\/lb-image-0.jpg","openingHoursSpecification": {"@type": "OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens": "09:00","closes": "18:00"}}</script>';
    }
    $html .= '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-97880990-1"></script>';
    return $html;
  }

  public function navinavi() {
    $html = "\\n</head>\\n<body id=\\"bodymain0817\\">\\n";
    return $html;
  }

  public function hiddentext(string $text) {
    $html = "\\n<div id=\\"hiddentextmain0817\\">";
    $html .= "\\n";
    $html .= '<a href="/about.php" class="hiddenobject"><div class="hiddenobject">홈스타일링 서비스 소개</div></a>';
    $html .= "\\n";
    $html .= '<a href="/portfolio.php" class="hiddenobject"><div class="hiddenobject"><b>홈스타일링</b> 디자이너 주거 인테리어 디자인 포트폴리오</div></a>';
    $html .= "\\n";
    $html .= '<a href="/review.php" class="hiddenobject"><div class="hiddenobject">홈리에종 고객 후기</div></a>';
    $html .= "\\n";
    $html .= '<a href="/designer.php" class="hiddenobject"><div class="hiddenobject">홈스타일링 디자이너 모아보기</div></a>';
    $html .= "\\n";
    $html .= '<a href="/consulting.php" class="hiddenobject"><div class="hiddenobject">홈스타일링 상담 신청</div></a>';
    $html .= "\\n";
    $html .= '<a href="/index.php" class="hiddenobject"><div class="hiddenobject">홈리에종 홈페이지</div></a>';
    $html .= "\\n";
    $html .= '<a href="/payment.php?card=true" class="hiddenobject"><div class="hiddenobject">홈리에종 결제 관련 정보</div></a>';
    $html .= "\\n";
    $html .= '<a href="/payment.php?type=terms" class="hiddenobject"><div class="hiddenobject">홈리에종 개인정보 처리 방침 / 이용약관</div></a>';
    $html .= "\\n";
    $html .= '<a href="/payment.php?type=terms&qqq=faq" class="hiddenobject"><div class="hiddenobject">홈리에종 FAQ</div></a>';
    $html .= "\\n";
    $html .= '<a href="http://pf.kakao.com/_vxixkjxl" class="hiddenobject"><div class="hiddenobject">홈리에종 카카오 플러스 채널</div></a>';
    $html .= "\\n";
    $html .= '<a href="https://blog.naver.com/homeliaison" class="hiddenobject"><div class="hiddenobject">홈리에종 네이버 블로그</div></a>';
    $html .= "\\n";
    $html .= '<a href="https://www.instagram.com/homeliaison" class="hiddenobject"><div class="hiddenobject">홈리에종 카카오 플러스 채널</div></a>';
    $html .= "\\n";
    $html .= $text;
    $html .= "\\n";
    $html .= '<h1 class="hiddenobject">(주)홈리에종</h1>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">CEO : 박혜연</p>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">서울특별시 성동구 성수이로22길 37, 4층 408C</p>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">사업자등록번호 : 221 - 81 - 49759</p>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">통신판매신고업 : 제 2020 - 서울성동 - 01563호</p>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">T : 02-2039-2252</p>';
    $html .= "\\n";
    $html .= '<p class="hiddenobject">E : help@home-liaison.com</p>';
    $html .= "\\n";
    $html .= '</div>';
    return $html;
  }

  public function totalstart() {
    $html = '<div id="totalcontents" class="fadeInmaininit">';
    return $html;
  }

  public function footfoot() {
    $html .= '</div><div id="mototalcontents" class="fadeInmaininit">';
    return $html;
  }

  public function mofootfoot($jsself) {
    $html .= "</div>";
    if ($this->plugin !== NULL) {
      $pluginCount = count($this->plugin);
      for ($i = 0; $i < $pluginCount; $i++) {
        $html .= "\\n<script type=\\"text/javascript\\" src=\\"".$this->plugin[$i]."\\"></script>";
      }
    }
    $html .= '<script type="text/javascript" src="/js/'.$jsself.'_${dayString}.js"></script>';
    $html .= '<script async type="text/javascript" src="/js/'.$jsself.'_async_${dayString}.js"></script>';
    return $html;
  }

  public function htmlend() {
    return "\\n</body>\\n</html>";
  }

  public function totaljavascript($jsself, $pluginjs) {
    $this->plugin = $pluginjs;
    $html .= '<div id="totalcontents" class="fadeInmaininit"></div>';
    $html .= '<div id="mototalcontents" class="fadeInmaininit">';
    $html .= $this->mofootfoot($jsself);
    $html .= $this->htmlend();
    return $html;
  }

}
?>`;
}
