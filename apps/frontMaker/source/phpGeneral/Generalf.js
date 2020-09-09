module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Alphasector.php';
class Generalf extends Alphasector {

  protected $orderarray = [[1,700/655],[1,7/6],[1200,1050],[1400,1050],['display:inline-block;','display:none;'],[18,12],['about.php','consulting.php']];
  protected $dewidthmw = [1400,1050];
  protected $designer;

  function __construct() {
  }

  public function mysqlGeneral($query) {
    $conn = new mysqli($this->dbarr["dbhost"], $this->dbarr["dbid"], $this->dbarr["dbpw"], $this->dbarr["dbname"]);
    if ($conn->connect_errno) { return "error"; }
    $conn->set_charset("utf8");
    $conn->query($query);
    $conn->close();
    return "success";
  }

  public function mysqlGet($query, $objBoo = null) {
    if ($objBoo === null) {
      $objBoo = false;
    }
    $conn = new mysqli($this->dbarr["dbhost"], $this->dbarr["dbid"], $this->dbarr["dbpw"], $this->dbarr["dbname"]);
    if ($conn->connect_errno) { return "error"; }
    $conn->set_charset("utf8");
    $result = $conn->query($query);
    if (!$result) { return "error"; }
    $info = [];
    $count = $result->num_rows;
    if ($count === 0) {
      return "zero";
    } else {
      if ($objBoo) {
        for ($i = 0; $i < $count; $i++) { array_push($info, $result->fetch_array(MYSQLI_ASSOC)); }
      } else {
        for ($i = 0; $i < $count; $i++) { array_push($info, $result->fetch_array(MYSQLI_NUM)); }
      }
    }
    $result->free();
    $conn->close();
    return $info;
  }

  public function mysqlGet_nullSet($query, $nullset, $nullset_count, $boo, $boo_count) {
    $result = [];
    $info = $this->mysqlGet($query, false);
    if ($info === "error") { return "error"; }
    if ($info === "zero") {
      for ($i = 0; $i < $nullset_count; $i++) {
        array_push($result, $nullset);
      }
      return $result;
    } else {
      $result = $info;
      if ($boo) {
        for ($i = 0; $i < $boo_count; $i++) {
          array_push($result, $nullset);
        }
      }
      return $result;
    }
  }

  public function getDesigner($desid) {
    $query = "SELECT desid,name,start_Y,start_M,method1,method2,daepyo_a,daepyo_t FROM deslist WHERE desid = '".$desid."'";
    $info_row = $this->mysqlGet($query);
    if ($info_row === "error") { return "error"; }
    $info = $info_row[0];
    $g = ((intval(date('Y')) - intval($info[2])) * 12) + intval(date('m')) - intval($info[3]);
    $y = floor(($g)/12);
    $m = $g - (12 * floor(($g)/12));
    $career = (object) array(
      "year" => $y,
      "month" => $m
    );
    $designer = (object) array(
      "desid" => $info[0],
      "name" => $info[1],
      "method1" => $info[4],
      "method2" => $info[5],
      "daepyo_a" => $info[6],
      "daepyo_t" => $info[7],
      "career" => $career
    );
    return $designer;
  }

  public function setDesigner($d) {
    $this->designer = $d;
  }

}
?>`;
}
