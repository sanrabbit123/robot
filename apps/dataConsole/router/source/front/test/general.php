<?php
class GeneralPhp {

  public $host = "127.0.0.1";
  public $realFrontHost = "__realHost__";
  public $frontHost = "__host__";
  public $secondHost = "__secondHost__";
  public $logHost = "__logHost__";
  public $backHost = "__backHost__";
  public $officeIp = "__officeIp__";
  public $protocol = "https://";
  public $testHost = "__testHost__";
  public $acceptCode = "accepthomeliaison";
  public $coreHost = "__coreHost__";

  function __construct() {}

  public function bastHtml($name, $titleString, $descriptionString, $hiddenString, $imageString, $fullLink, $sessionId, $clientInfo) {

    $gtagId = "G-6KYB6YEQLS";
    $hostLink = "http://".$this->host;

    // head
    $html = '<!DOCTYPE html>'."\n";
    $html .= '<html lang="ko" dir="ltr"><head>'."\n";
    $html .= '<meta charset="utf-8">'."\n";
    $html .= '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">'."\n";
    $html .= '<link rel="canonical" href="'.$fullLink.'">'."\n";
    $html .= '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-20190722112100.png"><meta name="msapplication-TileImage" content="/mstile-144x144-20190722112100.png">'."\n";
    $html .= '<link rel="manifest" href="/manifest.json">'."\n";
    $html .= '<title>'.$titleString.'</title><style></style>'."\n";

    // session and client info
    $html .= '<script>'."\n";
    $html .= 'window.homeliaisonSessionId = "'.$sessionId.'";'."\n";
    $html .= 'window.homeliaisonClientInfo = '.$clientInfo.';'."\n";
    $html .= 'if (typeof window.homeliaisonClientInfo === "object" && window.homeliaisonClientInfo !== null) { window.homeliaisonClientInfo["pageTitle"] = "'.$titleString.'"; }'."\n";
    $html .= '</script>'."\n";

    // google
    $html .= '<script>'."\n";
    $html .= 'window.dataLayer = window.dataLayer || [];'."\n";
    $html .= 'window.gtagId = "'.$gtagId.'";'."\n";
    $html .= 'window.gadsId = "";'."\n";
    $html .= 'window.gadsConverting = "";'."\n";    
    $html .= 'window.gtag = function () {}'."\n";
    $html .= 'window.gtag("js", new Date());'."\n";
    $html .= 'window.gtagPage = function () {'."\n";
    $html .= '  window.gtag();'."\n";
    $html .= '}'."\n";
    $html .= '</script>'."\n";

    // facebook
    $html .= '<script>'."\n";
    $html .= 'window.fbq = () => {};'."\n";
    $html .= '</script>'."\n";

    // body
    $html .= '</head><body>'."\n";
    $html .= '<div style="display: none;position: absolute;opacity: 0;font-size: 0px;">'.$this->hiddenHtml($hiddenString).'</div>'."\n";
    $html .= '<div id="totalcontents"></div>'."\n";
    $html .= '<script src="/middle/'.$name.'.js"></script>'."\n";

    // body end
    $html .= '</body></html>';

    return $html;
  }

  public function hiddenHtml($hiddenString) {
    $html = '<header class="hiddenobject"><h1>aa</h1></header>'."\n";
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
    } catch(Exception $e){
      $ipAddress = 'unknown';
    }
    return $ipAddress;
  }

  public function officeRedirect() {
    try {
      return "";
    } catch (Exception $e){
      return "";
    }
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
    return "testHomeLiaison";
  }

  public function setSessionId() {
    $sessionName = "TESTHL";
    $expire = time() + (86400 * 365 * 30);
    if (!isset($_COOKIE["TESTHL"])) {
      $newId = $this->getHomeLiaisonSessionId();
      return $newId;
    } else {
      return $_COOKIE["TESTHL"];
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
