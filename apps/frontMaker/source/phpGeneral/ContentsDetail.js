module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Generalf.php';
require_once __DIR__.'/Jandi.php';
$jandi = new Jandi("https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844");
$jandiarray = array();

class ContentsDetail extends Generalf {

  private $id;

  function __construct($id) {
    $this->id = $id;
  }

  public function escape($string) {
    $newStr = preg_replace("/[\\&\\+\\-\\%\\@\\/\\:\\^\\~\\|\\!\\?\\*\\$\\<\\>\\[\\]\\{\\}]/i", "", $string);
    return $newStr;
  }

  public function getDetail() {
    $query = "SELECT porlid,photosg,photodae,slide,wordingtitle,wordingkey,desid,designer,apartname,description,revid FROM pordeta WHERE porlid = '".$this->id."';";
    $info_row = $this->mysqlGet($query);
    if ($info_row === "error") {
      return "error";
    }
    $info = $info_row[0];

    $wordingKeyRAW = explode(' ',$info[5]);
    $dcount = count($wordingKeyRAW);
    $wordingKey = [];

    for ($i = 0; $i < count($wordingKeyRAW); $i++) {
      array_push($wordingKey, (int)$wordingKeyRAW[$i]);
    }

    $photosg = explode(' ', $info[1]);
    $photoauto = [ "auto 100%" ];
    for ($i = 0; $i < count($photosg); $i++) {
      if ($photosg[$i] === "s") {
        array_push($photoauto, "auto 100%");
      } else {
        array_push($photoauto, "100% auto");
      }
    }

    $designerQuery = "SELECT desid,name,start_Y,start_M,method1,method2,daepyo_a,daepyo_t FROM deslist WHERE desid = '".$info[6]."'";
    $designerInfo_row = $this->mysqlGet($designerQuery);
    if ($designerInfo_row === "error") {
      return "error";
    }
    $designerInfo = $designerInfo_row[0];
    $g = ((intval(date('Y')) - intval($info[2])) * 12) + intval(date('m')) - intval($info[3]);
    $y = floor(($g)/12);
    $m = $g - (12 * floor(($g)/12));
    $career = array(
      "year" => $y,
      "month" => $m
    );

    $designer = array(
      "desid" => $designerInfo[0],
      "name" => $designerInfo[1],
      "method1" => $designerInfo[4],
      "method2" => $designerInfo[5],
      "daepyo_a" => $designerInfo[6],
      "daepyo_t" => $designerInfo[7],
      "career" => $career
    );

    $row = array(
      "porlid" => $info[0],
      "photosg" => $photosg,
      "photonum" => count($photosg),
      "photodae" => explode(' ',$info[2]),
      "photoauto" => $photoauto,
      "slide" => explode(' ',$info[3]),
      "apartname" => $info[8],
      "description" => $info[9],
      "wordingKey" => $wordingKey,
      "wordingTitle" => explode(' ',$info[4]),
      "revid" => $info[10],
      "desid" => $info[6],
      "designer" => $designer,
    );
    return $row;
  }

  public function launching() {
    $row = $this->getDetail();
    return $row;
  }
}

$instance = new ContentsDetail($_POST["id"]);
$result = $instance->launching();

if ($result === "error") {
  $jandi->send("디비에 문제 생김", $jandiarray, "#FAC11B");
  return "error";
} else {
  echo json_encode($result);
}

?>`;
}
