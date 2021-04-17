module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Jandi.php';
require_once __DIR__.'/Generalf.php';

class Submit extends Generalf {
  private $columns = [ "name", "phone", "email", "address", "family", "budget", "pyeong", "due_date", "residence", "contract", "space", "etc", "channel", "timeline" ];
  private $values;
  private $tokens = array(
    "jandi" => "https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844",
  );

  function __construct() {
  }

  public static function valueFilter($string) {
    $newStr = preg_replace("/[\\&\\=\\^\\|\\*\\$\\<\\>\\[\\]\\{\\}]/i", "", $string);
    return addslashes($newStr);
  }

  public static function arrToString($arr) {
    $str = '';
    $tempString = '';
    foreach ($arr as $key => $value) {
      $str .= $key;
      $str .= '=';
      $tempString = (string)$value;
      $tempString = preg_replace("/[\\=\\&]/i", "", $tempString);
      $str .= $tempString;
      $str .= '&';
    }
    $str = substr($str, 0, -1);
    return $str;
  }

  public function setValue($arr) {
    $this->values = $arr;
  }

  public function messageMaker() {
    $sincheong = "새로운 상담 문의가 왔습니다!  |  ".$this->values["timeline"]."\\n";
    $sincheong .= "성함 : ".$this->values["name"]."\\n";
    $sincheong .= "연락처 : ".$this->values["phone"]."\\n";
    $sincheong .= "이메일 : ".$this->values["email"]."\\n";
    $sincheong .= "주소 : ".$this->values["address"]."\\n";
    $sincheong .= "가족 구성원 : ".$this->values["family"]."\\n";
    $sincheong .= "예산 : ".$this->values["budget"]."\\n";
    $sincheong .= "평수 : ".$this->values["pyeong"]."\\n";
    $sincheong .= "입주 예정일 : ".$this->values["due_date"]."\\n";
    $sincheong .= "계약 형태 : ".$this->values["contract"]."\\n";
    $sincheong .= "공간 상태 : ".$this->values["space"]."\\n";
    $sincheong .= "요청 사항 : ".$this->values["etc"]."\\n";
    $sincheong .= "유입 경로 : ".$this->values["channel"]."\\n";
    return $sincheong;
  }

  public function queryMaker() {
    $sql = "INSERT INTO conlist ";
    $col = '(';
    for ($i = 0; $i < count($this->columns); $i++) {
      $col .= $this->columns[$i].',';
    }
    $col = substr($col, 0, -1).')';
    $val = '(';
    for ($i = 0; $i < count($this->columns); $i++) {
      $val .= "'".$this->values[$this->columns[$i]]."',";
    }
    $val = substr($val, 0, -1).')';
    $sql .= $col;
    $sql .= " VALUES ";
    $sql .= $val.';';
    return $sql;
  }

  public function launching() {
    $jandi = new Jandi($this->tokens["jandi"]);

    $message = $this->messageMaker();

    //jandi
    $jandiarray = array();
    $jandi->send($message, $jandiarray, "#FAC11B");

    //mysql
    $query = $this->queryMaker();
    $result = $this->mysqlGeneral($query);
    if ($result !== "success") {
      echo "error";
    }

    echo "success";

  }
}

$timeline = date('Y-m-d H:i:s');
$postArr = array(
  "name" => Submit::valueFilter($_POST["pretext"]),
  "phone" => Submit::valueFilter($_POST["cellphone"]),
  "email" => Submit::valueFilter($_POST["email"]),
  "address" => Submit::valueFilter($_POST["dwelling"]),
  "family" => Submit::valueFilter($_POST["folk"]),
  "budget" => Submit::valueFilter($_POST["money"]),
  "pyeong" => Submit::valueFilter($_POST["area"]."평"),
  "due_date" => Submit::valueFilter($_POST["movingdate"]),
  "residence" => '',
  "contract" => Submit::valueFilter($_POST["myhomeboo"]),
  "space" => Submit::valueFilter($_POST["spotspec"]),
  "etc" => Submit::valueFilter($_POST["description"]),
  "channel" => Submit::valueFilter($_POST["wayto"]),
  "timeline" => $timeline,
);

$instance = new Submit();
$instance->setValue($postArr);
$instance->launching();

?>`;
}
