module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Generalf.php';
require_once __DIR__.'/Jandi.php';
$jandi = new Jandi("https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844");
$jandiarray = array();

class ContentsLoop extends Generalf {

  private $arr;
  private $query;

  function __construct($arr) {
    $this->arr = $arr;
  }

  public function escape($string) {
    $newStr = preg_replace("/[\\&\\+\\-\\%\\@\\/\\:\\^\\~\\|\\!\\?\\*\\$\\<\\>\\[\\]\\{\\}]/i", "", $string);
    return $newStr;
  }

  public function setQuery() {
    $arr = $this->arr;
    $query = "SELECT ";
    $query .= $arr["columns"];
    $query .= " FROM ";
    $query .= $arr["collection"];
    if ($arr["where"] !== "nothing") {
      $query .= ' ';
      $query .= "WHERE ";
      $queryAndOr = "";
      for ($i = 0; $i < count($arr["where"]); $i++) {
        $queryOr = "(";
        for ($j = 0; $j < count($arr["where"][$i]); $j++) {
          $queryOr .= $arr["where"][$i][$j][0];
          if (isset($arr["where"][$i][$j][2])) {
            $queryOr .= " NOT REGEXP ";
          } else {
            $queryOr .= " REGEXP ";
          }
          $queryOr .= "'".$this->escape($arr["where"][$i][$j][1])."'";
          $queryOr .= " OR ";
        }
        $queryOr = substr($queryOr, 0, -4);
        $queryOr .= ")";
        $queryOr .= " AND ";
        $queryAndOr .= $queryOr;
      }
      $queryAndOr = substr($queryAndOr, 0, -5);
      $query .= $queryAndOr;
    }
    if ($arr["sort"] !== "nothing") {
      $query .= ' ';
      $query .= "ORDER BY ";
      $query .= $arr["sort"][0];
      $query .= ' ';
      $query .= $arr["sort"][1];
    }
    if ($arr["limit"] !== "nothing") {
      $query .= ' ';
      $query .= "LIMIT ";
      $query .= (string)$arr["limit"][0];
      if (isset($arr["limit"][1])) {
        $query .= ',';
        $query .= (string)$arr["limit"][1];
      }
    }
    $query .= ";";
    $this->query = $query;
  }

  public function launching() {
    $this->setQuery();
    $result = $this->mysqlGet($this->query, true);
    if ($result === "zero") {
      return [];
    }
    return $result;
  }
}

$where = "nothing";
$sort = "nothing";
$limit = "nothing";
if (isset($_POST["where"])) {
  $where = json_decode($_POST["where"], true);
}
if (isset($_POST["sort"])) {
  $sort = json_decode($_POST["sort"], true);
}
if (isset($_POST["limit"])) {
  $limit = json_decode($_POST["limit"], true);
}
$arr = array(
  'collection' => $_POST["collection"],
  'columns' => $_POST["columns"],
  'where' => $where,
  'sort' => $sort,
  'limit' => $limit,
);

$instance = new ContentsLoop($arr);
$result = $instance->launching();

if ($result === "error") {
  $jandi->send("디비에 문제 생김", $jandiarray, "#FAC11B");
  return "error";
} else {
  echo json_encode($result);
}

?>`;
}
