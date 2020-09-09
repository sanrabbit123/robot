module.exports = function (dayString, template) {
  return `<?php
class Alimtalk {

  public function sendalim ($name, $phone) {
    $_variables =	array(
      'apikey'      => '${template.apikey}',
      'userid'      => '${template.userid}',
      'token'       => '${template.token}',
      'senderkey'   => '${template.senderkey}',
      'tpl_code'    => '${template.tpl_code}',
      'sender'      => '${template.sender}',
      'receiver_1'  => str_replace("-", "", $phone),
      'recvname_1'  => $name,
      'subject_1'   => '${template.subject_1}',
      'message_1'   => "${template.message_1.replace(/\n/g, "\\n")}",
      'button_1'    => '${JSON.stringify(template.button_1)}',
      'failover'    => '${template.failover}',
      'fsubject_1'  => '${template.fsubject_1}',
      'fmessage_1'  => "${template.fmessage_1.replace(/\n/g, "\\n")}"
    );

    $oCurl = curl_init();
    curl_setopt($oCurl, CURLOPT_PORT, 443);
    curl_setopt($oCurl, CURLOPT_URL, 'https://kakaoapi.aligo.in/akv10/alimtalk/send/');
    curl_setopt($oCurl, CURLOPT_POST, 1);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS, $_variables);
    curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
    $ret = curl_exec($oCurl);
    curl_close($oCurl);

    if(substr((string)$ret,8,1) === '0'){
      return "알림톡 전송 성공";
    } else {
      return "알림톡 전송 실패";
    }
  }

}
?>`;
}
