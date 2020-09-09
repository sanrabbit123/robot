module.exports = function (dayString) {
  return `<?php
class Smssend {
  private $id;
  private $key;
  private $sender;
  private $meth = 'LMS';

  function __construct($a,$b,$c){
    $this->id = $a;
    $this->key = $b;
    $this->sender = $c;
  }

  public function setmethod($m){
    $this->meth = $m;
  }

  public function smsali($name,$phone){
    $sms = array(
      'user_id'=>$this->id,
      'key'=>$this->key,
      'msg'=>"안녕하세요 ".$name."님!\\n작성해주신 신청서는 접수 완료되었습니다 :)\\n영업일 기준 2일안에 전화드리겠습니다.\\n\\n플러스 친구로 선호 사진과 이사갈 집 사진을 보내주시면 더 빠른 상담이 가능합니다.\\n\\n사진 전송 안내 : https://home-liaison.com/plusfriend.php",
      'receiver'=>str_replace("-","",$phone),
      'destination'=>$name,
      'sender'=>$this->sender,
      'rdate'=>'',
      'rtime'=>'',
      'testmode_yn'=>'N',
      'title'=>'홈리에종 서비스 신청 완료',
      'msg_type'=>$this->meth
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

    if(substr((string)$ret,16,1) === '1'){
      return "문자 전송 성공";
    } else {
      return "문자 전송 실패";
    }
  }
}
?>`;
}
