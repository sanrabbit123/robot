module.exports = function (dayString) {
  return `<?php
class Smssend {
  private $id;
  private $key;
  private $sender;
  private $meth = 'LMS';

  function __construct($a, $b, $c) {
    $this->id = $a;
    $this->key = $b;
    $this->sender = $c;
  }

  public function setmethod($m) {
    $this->meth = $m;
  }

  public function sndSms($name, $phone, $certification) {
    $sms = array(
      'user_id' => $this->id,
      'key' => $this->key,
      'msg' => "[홈리에종] 안녕하세요! ".$name."님,\\n휴대폰 인증번호를 보내드립니다.\\n\\n인증번호 : ".$certification."\\n\\n인증번호를 팝업창에 입력해주세요!",
      'receiver' => str_replace("-", "", $phone),
      'destination' => $name,
      'sender' => $this->sender,
      'rdate' => '',
      'rtime' => '',
      'testmode_yn' => 'N',
      'title' => '홈리에종 서비스 신청 완료',
      'msg_type' => $this->meth
    );

    $oCurl = curl_init();
    curl_setopt($oCurl, CURLOPT_PORT, 443);
    curl_setopt($oCurl, CURLOPT_URL, "https://apis.aligo.in/send/");
    curl_setopt($oCurl, CURLOPT_POST, 1);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS, $sms);
    curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
    $ret = curl_exec($oCurl);
    curl_close($oCurl);

    if (substr((string)$ret, 16, 1) === '1') {
      return "문자 전송 성공";
    } else {
      return "문자 전송 실패";
    }
  }

}

$instance = new Smssend();
$instance->sndSms($_POST["name"], $_POST["phone"], $_POST["certification"]);

?>`;
}
