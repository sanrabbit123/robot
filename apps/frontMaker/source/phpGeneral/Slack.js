module.exports = function (dayString) {
  return `<?php
class Slack {
    private $token;
    private $channel;
    private $username;
    private $message;
    public function __construct($token, $username='consulting_bot') {
        $this->token    = $token;
        $this->username = $username;
    }
    public function setChannel($channel) {
        $this->channel = $channel;
    }
    public function setUserName($username) {
        $this->username = $username;
    }
    public function setMessage($message) {
        $this->message = $message;
    }
    public function send() {
        $postData = array(
            'token'    => $this->token,
            'channel'  => $this->channel,
            'username' => $this->username,
            'text'     => $this->message
        );
        $ch = curl_init("https://slack.com/api/chat.postMessage");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST,  'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS,     $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
}

?>`;
}
