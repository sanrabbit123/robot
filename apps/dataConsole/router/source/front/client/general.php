<?php
class GeneralPhp {

  public $host = "__host__";
  public $realFrontHost = "__realHost__";
  public $frontHost = "__host__";
  public $secondHost = "__secondHost__";
  public $logHost = "__logHost__";
  public $backHost = "__backHost__";
  public $officeIp = "__officeIp__";
  public $protocol = "https://";
  public $testHost = "__testHost__";
  public $acceptCode = "accepthomeliaison";

  function __construct() {}

  public function bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo) {

    $gtagId = "G-XCNTB3TRCK";
    $gadsId = "AW-652862533";
    $gadsConverting = "AW-652862533/7uUPCMKJ7bADEMXIp7cC";
    $googleSearchId = "YRxCc6xhQlM3qTygta5Qw0CObJJrLDYmUE8_wCR0AQc";
    $naverSearchId = "59096f538ddb9a8704025cefc11269d504f62aac";
    $naverLogId = "s_dc977e44f53";
    $facebookId = "814052605684956";
    $kakaoId = "2786607572511510355";
    $indexName = "frontIndex";
    $hostLink = "https://".$this->host;
    $curationName = "styleCuration";

    // head
    $html = '<!DOCTYPE html>'."\n";
    $html .= '<html lang="ko" dir="ltr"><head>'."\n";
    $html .= '<meta charset="utf-8">'."\n";
    $html .= '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">'."\n";
    $html .= '<link rel="canonical" href="'.$fullLink.'">'."\n";
    $html .= '<meta content="'.$fullLink.'" property="og:url"><meta content="website" property="og:type">'."\n";
    $html .= '<meta name="google-site-verification" content="'.$googleSearchId.'">'."\n";
    $html .= '<meta name="naver-site-verification" content="'.$naverSearchId.'">'."\n";
    $html .= '<meta name="twitter:card" content="summary_large_image">'."\n";
    $html .= '<meta content="'.$facebookId.'" property="fb:app_id">'."\n";
    $html .= '<meta name="robots" content="index,follow">'."\n";
    $html .= '<meta content="'.$titleString.'" property="og:title">'."\n";
    $html .= '<meta content="'.$descriptionString.'" property="og:description">'."\n";
    $html .= '<meta content="'.$imageString.'" property="og:image">'."\n";
    $html .= '<meta name="description" content="'.$descriptionString.'">'."\n";
    $html .= '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-20190722112100.png"><meta name="msapplication-TileImage" content="/mstile-144x144-20190722112100.png">'."\n";
    $html .= '<link rel="manifest" href="/manifest.json">'."\n";
    $html .= '<meta name="keywords" content="홈스타일링, 홈리에종, 주거인테리어">'."\n";
    if ($name === $indexName) {
      $html .= '<script type="application/ld+json">{"@context": "http:\/\/schema.org","@id": "'.$hostLink.'#","@type": "ProfessionalService","url": "'.$hostLink.'","name": "홈리에종 | 디자이너와 함께하는 홈스타일링 플랫폼","description": "홈리에종은 홈스타일링 플랫폼으로, 집을 디자인하는 새로운 방법을 제안합니다.","sameAs": ["https:\/\/www.facebook.com\/homeliaison","https:\/\/blog.naver.com\/homeliaison","https:\/\/www.instagram.com\/homeliaison"],"address": {"@type": "PostalAddress","streetAddress": "279, Dongmak-ro","addressLocality": "Seoul","addressRegion": "Mapo-gu","postalCode": "04151","addressCountry": "KR"},"telephone": "02-2039-2252","image": "'.$hostLink.'/share/lb-image-0.jpg","openingHoursSpecification": {"@type": "OpeningHoursSpecification","dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens": "09:00","closes": "18:00"}}</script>'."\n";
    }
    $html .= '<title>'.$titleString.'</title><style></style>'."\n";

    // session and client info
    $html .= '<script>'."\n";
    $html .= 'if (window.localStorage.getItem("homeliaisonSessionId") === null) {'."\n";
    $html .= 'window.localStorage.setItem("homeliaisonSessionId", "'.$sessionId.'");'."\n";
    $html .= 'window.homeliaisonSessionId = "'.$sessionId.'";'."\n";
    $html .= '} else { window.homeliaisonSessionId = window.localStorage.getItem("homeliaisonSessionId"); }'."\n";
    $html .= 'window.homeliaisonClientInfo = '.$clientInfo.';'."\n";
    $html .= 'if (typeof window.homeliaisonClientInfo === "object" && window.homeliaisonClientInfo !== null) { window.homeliaisonClientInfo["pageTitle"] = "'.$titleString.'"; }'."\n";
    $html .= '</script>'."\n";

    // google
    $html .= '<script async src="https://www.googletagmanager.com/gtag/js?id='.$gtagId.'"></script>'."\n";
    $html .= '<script>'."\n";
    $html .= 'window.dataLayer = window.dataLayer || [];'."\n";
    $html .= 'window.gtagId = "'.$gtagId.'";'."\n";
    $html .= 'window.gadsId = "'.$gadsId.'";'."\n";
    $html .= 'window.gadsConverting = "'.$gadsConverting.'";'."\n";    
    $html .= 'window.gtag = function () { window.dataLayer.push(arguments); }'."\n";
    $html .= 'window.gtag("js", new Date());'."\n";
    $html .= 'window.gtag("config", "'.$gtagId.'");'."\n";
    $html .= 'window.gtag("config", "'.$gadsId.'");'."\n";
    $html .= 'window.gtagPage = function () {'."\n";
    $html .= '  window.gtag("config", "'.$gtagId.'");'."\n";
    $html .= '}'."\n";
    $html .= '</script>'."\n";

    // facebook
    $html .= '<!-- Meta Pixel Code -->'."\n";
    $html .= '<script>'."\n";
    $html .= '!function(f,b,e,v,n,t,s)'."\n";
    $html .= '{if(f.fbq)return;n=f.fbq=function(){n.callMethod?'."\n";
    $html .= 'n.callMethod.apply(n,arguments):n.queue.push(arguments)};'."\n";
    $html .= 'if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";'."\n";
    $html .= 'n.queue=[];t=b.createElement(e);t.async=!0;'."\n";
    $html .= 't.src=v;s=b.getElementsByTagName(e)[0];'."\n";
    $html .= 's.parentNode.insertBefore(t,s)}(window, document,"script","https://connect.facebook.net/en_US/fbevents.js");'."\n";
    $html .= 'fbq("init", "'.$facebookId.'");'."\n";
    $html .= 'fbq("track", "PageView");'."\n";
    $html .= '</script>'."\n";
    $html .= '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='.$facebookId.'&ev=PageView&noscript=1" /></noscript>'."\n";
    $html .= '<!-- End Meta Pixel Code -->'."\n";

    // kakao
    $html .= '<!-- Kakao Pixel Code -->'."\n";
    $html .= '<script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/kas/static/kp.js"></script>'."\n";
    $html .= '<script type="text/javascript">'."\n";
    $html .= 'window.kakaoPixelHlId = "'.$kakaoId.'";'."\n";
    $html .= 'if (typeof window.kakaoPixel === "function") {'."\n";
    $html .= '  window.kakaoPixel("'.$kakaoId.'").pageView();'."\n";
    $html .= '}'."\n";
    $html .= '</script>'."\n";
    $html .= '<!-- End Kakao Pixel Code -->'."\n";

    // body
    $html .= '</head><body>'."\n";
    $html .= '<div style="display: none;position: absolute;opacity: 0;font-size: 0px;">'.$this->hiddenHtml($hiddenString).'</div>'."\n";
    $html .= '<div id="totalcontents"></div>'."\n";
    $html .= '<script src="/middle/'.$name.'.js"></script>'."\n";

    // naver
    $html .= '<script type="text/javascript" src="https://wcs.naver.net/wcslog.js"></script>'."\n";
    $html .= '<script type="text/javascript">'."\n";
    if ($name === $curationName) {
      $html .= 'var _nasa={};'."\n";
      $html .= 'if (window.wcs) { _nasa["cnv"] = wcs.cnv("4", "10"); }'."\n";
    }
    $html .= 'if (!wcs_add) { var wcs_add = {}; }'."\n";
    $html .= 'wcs_add["wa"] = "'.$naverLogId.'";'."\n";
    $html .= 'if (!_nasa) { var _nasa={}; }'."\n";
    $html .= 'if (window.wcs) { wcs.inflow("'.$this->host.'"); wcs_do(_nasa); }'."\n";
    $html .= '</script>'."\n";

    // body end
    $html .= '</body></html>';

    return $html;
  }

  public function hiddenHtml($hiddenString) {
    $html = '<header class="hiddenobject"><h1>홈스타일링 플랫폼 : 홈리에종</h1></header>'."\n";
    $html .= '<nav class="hiddenobject"><a href="/about.php" class="hiddenobject">홈스타일링 서비스 소개</a>'."\n";
    $html .= '<a href="/portfolio.php" class="hiddenobject"><b>홈스타일링</b> 디자이너 주거 인테리어 디자인 포트폴리오</a>'."\n";
    $html .= '<a href="/review.php" class="hiddenobject">홈리에종 고객 후기</a>'."\n";
    $html .= '<a href="/designer.php" class="hiddenobject">홈스타일링 디자이너 모아보기</a>'."\n";
    $html .= '<a href="/consulting.php" class="hiddenobject">홈스타일링 상담 신청</a>'."\n";
    $html .= '<a href="/index.php" class="hiddenobject">홈리에종 홈페이지</a>'."\n";
    $html .= '<a href="/magazine.php" class="hiddenobject">홈리에종 매거진</a></nav>'."\n";
    $html .= '<article class="hiddenobject"><b>홈스타일링</b> 디자이너 주거 인테리어 디자인 포트폴리오</article>'."\n";
    $html .= '<aside class="hiddenobject">홈스타일링 디자이너 주거 인테리어</aside>'."\n";
    $html .= '<section class="hiddenobject"><b>홈스타일링</b> <p>디자이너 주거 인테리어 디자인 포트폴리오</p></section>'."\n";
    $html .= '<main class="hiddenobject">'.$hiddenString.'</main>'."\n";
    $html .= '<footer class="hiddenobject"><h1 class="hiddenobject">(주)홈리에종</h1>'."\n";
    $html .= '<p class="hiddenobject">CEO : 박혜연</p>'."\n";
    $html .= '<p class="hiddenobject">서울특별시 성동구 성수일로 10, 서울숲ITCT지식산업센터 605호</p>'."\n";
    $html .= '<p class="hiddenobject">사업자등록번호 : 221 - 81 - 49759</p>'."\n";
    $html .= '<p class="hiddenobject">통신판매신고업 : 제 2020 - 서울성동 - 01563호</p>'."\n";
    $html .= '<p class="hiddenobject">T : 02-2039-2252</p>'."\n";
    $html .= '<p class="hiddenobject">E : help@home-liaison.com</p>'."\n";
    $html .= '<a href="/terms.php" class="hiddenobject">홈리에종 개인정보 처리 방침 / 이용약관</a>'."\n";
    $html .= '<a href="/faq.php" class="hiddenobject">홈리에종 FAQ</a>'."\n";
    $html .= '<a href="http://pf.kakao.com/_vxixkjxl" class="hiddenobject">홈리에종 카카오 플러스 채널</a>'."\n";
    $html .= '<a href="https://blog.naver.com/homeliaison" class="hiddenobject">홈리에종 네이버 블로그</a>'."\n";
    $html .= '<a href="https://instagram.com/homeliaison" class="hiddenobject">홈리에종 인스타그램</a></footer>'."\n";
    return $html;
  }

  public function mysqlGet($query) {
    $connection = new mysqli("localhost", "__user__", "__password__", "__database__");
    $connection->set_charset("utf8");

    if ($connection->connect_errno) {
      return "error";
    }

    $result = $connection->query($query);

    if (!$result) {
      return "error";
    }

    $resultArray = [];
    $count = $result->num_rows;
    for ($i = 0; $i < $count; $i++) {
      array_push($resultArray, $result->fetch_array(MYSQLI_NUM));
    }

    $result->free();
    $connection->close();

    return $resultArray;
  }

  public function ajaxJson($json, $url) {
    $headers = array();
    array_push($headers, "Content-Type: application/json");
    array_push($headers, "origin: __host__");
    array_push($headers, "host: __host__");

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response);
  }

  public function getRealClientIp() {
    $ipAddress = '';
    try {
      if ($_SERVER['HTTP_CLIENT_IP']) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
      } else if($_SERVER['HTTP_X_FORWARDED_FOR']) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
      } else if($_SERVER['HTTP_X_FORWARDED']) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
      } else if($_SERVER['HTTP_FORWARDED_FOR']) {
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
      } else if($_SERVER['HTTP_FORWARDED']) {
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
      } else if($_SERVER['REMOTE_ADDR']) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
      } else {
        $ipAddress = 'unknown';
      }
    } catch (Exception $e){
      $ipAddress = 'unknown';
    }
    return $ipAddress;
  }

  public function officeRedirect() {
    // try {
    //   $thisIp = $this->getRealClientIp();
    //   if (gettype($thisIp) === "string") {
    //     if (trim($thisIp) === $this->officeIp) {
    //       if (isset($_GET[$this->acceptCode])) {
    //         if ($_GET[$this->acceptCode] === "true") {
    //           // pass
    //         } else {
    //           header("location: https://".$this->testHost.$_SERVER["REQUEST_URI"]);
    //         }
    //       } else {
    //         header("location: https://".$this->testHost.$_SERVER["REQUEST_URI"]);
    //       }
    //     }
    //   }
    //   return $thisIp;
    // } catch (Exception $e){
    //   return "";
    // }
    return "";
  }

  public function getClients(string $cliid) {
    $url = $this->protocol.$this->secondHost."/getClients";
    $whereQuery = array();
    $whereQuery["cliid"] = $cliid;
    $data = array();
    $data["whereQuery"] = $whereQuery;
    $dataJson = json_encode($data);
    $response = $this->ajaxJson($dataJson, $url);
    return $response;
  }

  public function getClient(string $cliid) {
    $clients = $this->getClients($cliid);
    return $clients[0];
  }

  public function getDesigners(string $desid) {
    $url = $this->protocol.$this->secondHost."/getDesigners";
    $whereQuery = array();
    $whereQuery["desid"] = $desid;
    $data = array();
    $data["whereQuery"] = $whereQuery;
    $dataJson = json_encode($data);
    $response = $this->ajaxJson($dataJson, $url);
    return $response;
  }

  public function getDesigner(string $desid) {
    $designers = $this->getDesigners($desid);
    return $designers[0];
  }

  public function getProjects(string $proid) {
    $url = $this->protocol.$this->secondHost."/getProjects";
    $whereQuery = array();
    $whereQuery["proid"] = $proid;
    $data = array();
    $data["whereQuery"] = $whereQuery;
    $dataJson = json_encode($data);
    $response = $this->ajaxJson($dataJson, $url);
    return $response;
  }

  public function getProject(string $proid) {
    $projects = $this->getProjects($proid);
    return $projects[0];
  }

  public function getMagazine(string $mid) {
    $url = $this->protocol.$this->logHost."/getContents";
    $data = array();
    $data["mode"] = "magazine";
    $data["mid"] = $mid;
    $dataJson = json_encode($data);
    $response = $this->ajaxJson($dataJson, $url);
    return $response->contentsArr[0];
  }

  public function getMagazineList() {
    $url = $this->protocol.$this->logHost."/getContents";
    $data = array();
    $data["mode"] = "magazine";
    $dataJson = json_encode($data);
    $response = $this->ajaxJson($dataJson, $url);
    return $response->contentsArr;
  }

  public function getRandomHex(int $bytesNumber) {
    return bin2hex(openssl_random_pseudo_bytes($bytesNumber));
  }

  public function getHomeLiaisonSessionId() {
    $str0 = $this->getRandomHex(8);
    $str1 = $this->getRandomHex(4);
    $token = "_";
    return "homeliaison".$token.$str0.$token.(string)(time()).$token.$str1;
  }

  public function setSessionId() {
    $sessionName = "HLSESSIONID";
    $expire = time() + (86400 * 365 * 30);
    if (!isset($_COOKIE["HLSESSIONID"])) {
      $newId = $this->getHomeLiaisonSessionId();
      setcookie($sessionName, $newId, $expire, "/", '.'.$this->host, true, true);
      return $newId;
    } else {
      return $_COOKIE["HLSESSIONID"];
    }
  }

  public function getClientIp() {
    $ipaddress = '';
    if (getenv("HTTP_CLIENT_IP")) {
      $ipaddress = getenv("HTTP_CLIENT_IP");
    } else if (getenv("HTTP_X_FORWARDED_FOR")) {
      $ipaddress = getenv("HTTP_X_FORWARDED_FOR");
    } else if (getenv("HTTP_X_FORWARDED")) {
      $ipaddress = getenv("HTTP_X_FORWARDED");
    } else if (getenv("HTTP_FORWARDED_FOR")) {
      $ipaddress = getenv("HTTP_FORWARDED_FOR");
    } else if (getenv("HTTP_FORWARDED")) {
      $ipaddress = getenv("HTTP_FORWARDED");
    } else if (getenv("REMOTE_ADDR")) {
      $ipaddress = getenv("REMOTE_ADDR");
    } else {
      if (isset($_SERVER["REMOTE_ADDR"])) {
        $ipaddress = $_SERVER["REMOTE_ADDR"];
      } else if (isset($_SERVER["HTTP_X_SIMPLEXI"])) {
        $ipaddress = $_SERVER["HTTP_X_SIMPLEXI"];
      } else {
        $ipaddress = "(not set)";
      }
    }
    return $ipaddress;
  }

  public function getClientUserAgent() {
    $userAgent = "";
    if (getenv("http_user_agnet")) {
      $userAgent = getenv("http_user_agnet");
    } else {
      if (isset($_SERVER["HTTP_USER_AGENT"])) {
        $userAgent = $_SERVER["HTTP_USER_AGENT"];
      } else {
        $userAgent = "(not set)";
      }
    }
    return $userAgent;
  }

  public function getClientReferer() {
    $referer = "";
    if (getenv("http_referer")) {
      $referer = getenv("http_referer");
    } else {
      if (isset($_SERVER["HTTP_REFERER"])) {
        $referer = $_SERVER["HTTP_REFERER"];
      } else {
        $referer = "(not set)";
      }
    }
    return $referer;
  }

  public function getClientRequestUrl () {
    $requestUrl = "";
    if (isset($_SERVER["REQUEST_URI"])) {
      $requestUrl = $_SERVER["REQUEST_URI"];
    } else {
      $requestUrl = "(not set)";
    }
    return $requestUrl;
  }

  public function getClientInfo() {
    $clientInfo = array();
    $clientInfo["ip"] = $this->getClientIp();
    $clientInfo["userAgent"] = $this->getClientUserAgent();
    $clientInfo["referer"] = $this->getClientReferer();
    $clientInfo["requestUrl"] = $this->getClientRequestUrl();
    return json_encode($clientInfo);
  }

  public function clearAllCookies() {
    if (isset($_SERVER["HTTP_COOKIE"])) {
      $cookies = explode(';', $_SERVER["HTTP_COOKIE"]);
      foreach ($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time() - 3600);
        setcookie($name, '', time() - 3600, "/");
        setcookie($name, '', time() - 3600, "/", $this->host);
        setcookie($name, '', time() - 3600, "/", "www.".$this->host);
        setcookie($name, '', time() - 3600, "/", ".".$this->host);
        unset($_COOKIE[$name]);
      }
    }
  }

}
?>
