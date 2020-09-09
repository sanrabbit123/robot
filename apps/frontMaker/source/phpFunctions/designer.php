<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Designerf extends Generalf {

  private $query;
  private $row;
  private $nullcount = 3;

  function __construct(){}

  public function setNull($arr) {
    $query = "SELECT desid,start_Y,start_M,method1,method2,daepyo_a,daepyo_t FROM deslist WHERE NOT ";
    for ($i = 0; $i < count($arr); $i++) {
      $query .= "desid = '" . $arr[$i] . "' AND NOT ";
    }
    $query = substr($query, 0, -9);
    $query .= " ORDER BY order_function DESC;";
    $this->query = $query;
    return $query;
  }

  public function setRow() {
    $nullset = [ "de999", date('Y'), date('m'), "mth8", "mth8", "g00", "t1" ];
    $row = $this->mysqlGet_nullSet($this->query, $nullset, $this->nullcount, true, $this->nullcount);
    if ($row === "error") { return "error"; }
    $this->row = $row;
    return $row;
  }

  public function calcCareer() {
    $gyeong = [];
    $gyeong_Y = [];
    $gyeong_M = [];
    for ($i = 0; $i < count($this->row); $i++) {
      $gyeong[$i] = ((intval(date('Y')) - intval($this->row[$i][1])) * 12) + intval(date('m')) - intval($this->row[$i][2]);
      $gyeong_Y[$i] = floor(($gyeong[$i]) / 12);
      $gyeong_M[$i] = $gyeong[$i] - (12 * floor(($gyeong[$i])/12));
    }
    $result = (object) array(
      'career' => $gyeong,
      'year' => $gyeong_Y,
      'month' => $gyeong_M,
    );
    return $result;
  }

  public function designerList($boo) {
    $h = '';
    $i = 0;
    $career = $this->calcCareer();
    //desktop
    if ($boo) {
      while ($i < count($this->row) - $this->nullcount) {
        $h .= '<div class="delimargin"></div>';
        for ($j = 0; $j < 3; $j++) {
          $h .= '<div class="delibox'.(string)$j.'"><img src="./list_image/portp'.$this->row[$i+$j][5].'/mobile/mo'.$this->row[$i+$j][6].$this->row[$i+$j][5].'.jpg" class="insideimg"><div class="insidesvg">';
          $h .= '<img class="delinameimg" src="./list_svg/delist/name/name'.$this->row[$i+$j][0].'.svg">';
          $h .= '<img class="delimethodimg delimethodimg1" src="./list_svg/delist/method/'.$this->row[$i+$j][3].'.svg">';
          $h .= '<img class="delimethodimg delimethodimg2" src="./list_svg/delist/method/'.$this->row[$i+$j][4].'.svg">';
          $h .= '<div class="deligyeongbox">';
          $h .= '<img class="deligetc" src="./list_svg/delist/etc/etc1.svg"><img class="deligetc" src="./list_svg/delist/etc/etc0.svg">';
          $h .= '<div class="deliwetc0">'.$career->year[$i+$j].'</div><img class="deligetc deligetc2" src="./list_svg/delist/etc/etc2.svg">';
          $h .= '<div class="deliwetc0"> '.$career->month[$i+$j].'</div><img class="deligetc deligetc2" src="./list_svg/delist/etc/etc3.svg"></div>';
          $h .= '<div class="deligraybar"></div></div>';
          $h .= '<a href="./desdetail.php?qqq='.$this->row[$i+$j][0].'"><div class="delibutton"></div></a></div>';
        }
        $h .= '<div class="delimargin"></div><div class="deliblock"></div>';
        $i = $i + 3;
      }
    //mobile
    } else {
      while ($i < count($this->row) - $this->nullcount) {
        for ($j = 0; $j < 2; $j++) {
          $h .= '<div class="modelibox modelibox'.(string)$j.'"><div class="moinsideimg" style="background-image:url(./list_image/portp'.$this->row[$i+$j][5].'/mobile/mo'.$this->row[$i+$j][6].$this->row[$i+$j][5].'.jpg)"></div>';
          $h .= '<div class="modelimargin1"></div>';
          $h .= '<div class="moinsidesvg moinsidesvg'.(string)$j.'">';
          $h .= '<div class="moinsidesvgab">';
          $h .= '<img class="modelinameimg" src="./list_svg/delist/name/name'.$this->row[$i+$j][0].'.svg">';
          $h .= '<img class="modelimethod1img" src="./list_svg/delist/method/'.$this->row[$i+$j][3].'.svg">';
          $h .= '<img class="modelimethod2img" src="./list_svg/delist/method/'.$this->row[$i+$j][4].'.svg">';
          $h .= '<div class="modeligraybar"></div>';
          $h .= '<div class="modeligyeongbox">';
          $h .= '<div class="modeligyeong">경력 : '.$career->year[$i+$j].'년</div>';
          $h .= '</div>';
          $h .= '</div></div><a href="./desdetail.php?qqq='.$this->row[$i+$j][0].'"><div class="modelibutton"></div></a></div>';
          $h .= '<div class="modelimargin'.(string)($j+2).'"></div>';
        }
        $i = $i + 2;
      }
    }
    return $h;
  }

}
?>
