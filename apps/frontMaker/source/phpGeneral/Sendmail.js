module.exports = function (dayString) {
  return `<?php
require dirname(__DIR__, 1).'/vendor/autoload.php';
class Sendmail {
  private $toEmail;
  private $emailSubject;
  private $emailBody;

  function __construct($a, $b, $c) {
    $this->toEmail = $a;
    $this->emailSubject = $b;
    $this->emailBody = $c;
  }

  private function getClient($value='') {
    $client = new Google_Client();
    $client->setApplicationName('Gmail API PHP Quickstart');
    $client->setScopes([ "https://mail.google.com/", 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send', ]);
    $client->setAuthConfig(__DIR__.'/token/credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');
    $tokenPath = __DIR__.'/token/token.json';
    $accessToken = json_decode(file_get_contents($tokenPath), true);
    $client->setAccessToken($accessToken);
    if ($client->isAccessTokenExpired()) {
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
  }

  private function sendEmail($fromemail, $toemail, $emailSubject, $emailBody) {
    $strRawMessage = "From: Email <$fromemail> \\r\\n";
    $strRawMessage .= "To: <$toemail>\\r\\n";
    $strRawMessage .= 'Subject: =?utf-8?B?' . base64_encode($emailSubject) . "?=\\r\\n";
    $strRawMessage .= "MIME-Version: 1.0\\r\\n";
    $strRawMessage .= "Content-Type: text/html; charset=utf-8\\r\\n";
    $strRawMessage .= 'Content-Transfer-Encoding: quoted-printable' . "\\r\\n\\r\\n";
    $strRawMessage .= "$emailBody\\r\\n";
    $mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
    $msg = new Google_Service_Gmail_Message();
    $msg->setRaw($mime);
    return $msg;
  }

  public function launching() {
    $client = $this->getClient();
    $service = new Google_Service_Gmail($client);
    $msg = $this->sendEmail("uragenbooks@gmail.com", $this->toEmail, $this->emailSubject, $this->emailBody);
    $service->users_messages->send("me", $msg);
    return "success";
  }
}

$instance = new Sendmail($_POST["toemail"], $_POST["subject"], $_POST["body"]);
echo $instance->launching();
?>`;
}
