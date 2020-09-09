module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Slack.php';
require_once __DIR__.'/Jandi.php';
require_once __DIR__.'/Generalf.php';

class Cardamount extends Generalf {
  private $columns = [ "name", "phone", "amount" ];
  private $values;
  private $tokens = array(
    "slack" => "xoxp-717757271335-715434169876-796715313798-0d913f2a0bdbebe7a0c1004cd0ac1533",
    "jandi" => "https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844",
  );

  function __construct() {
  }

  public function setValue($arr) {
    $this->values = $arr;
  }

  public function valueFilter($string) {
    $filfil = preg_replace("/[\\&\\=\\^\\|\\*\\$\\<\\>\\[\\]\\{\\}]/i", "", $string);
    return addslashes($filfil);
  }

  public function queryMaker() {
    $sql = "SELECT amount FROM cardlist WHERE phone = ";
    $sql .= "'";
    $sql .= $this->values["phone"];
    $sql .= "'";
    $sql .= " AND name = ";
    $sql .= "'";
    $sql .= $this->values["name"];
    $sql .= "'";
    $sql .= ";";
    return $sql;
  }

  public function launching() {
    $slack = new Slack($this->tokens["slack"]);
    $jandi = new Jandi($this->tokens["jandi"]);

    //mysql
    $query = $this->queryMaker();
    $result = $this->mysqlGet($query);
    if ($result !== "error" && $result !== "zero") {
      $message = $this->values["name"]."님이 카드 결제 중이십니다!";
      //slack
      $slack->setUserName('consulting_bot');
      $slack->setChannel('#401_consulting');
      $slack->setMessage($message);
      $slackresult = $slack->send();
      //jandi
      $jandiarray = array();
      $jandi->send($message, $jandiarray, "#FAC11B");
      echo $result[0][0];
    } else {
      echo "error";
    }
  }
}

$instance = new Cardamount();
$postArr = array(
  "name" => $instance->valueFilter($_POST["pretext"]),
  "phone" => $instance->valueFilter($_POST["cellphone"]),
);
$instance->setValue($postArr);
$instance->launching();

?>`;
}
