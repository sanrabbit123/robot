<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Desdetailf extends Generalf {

  private $row;

  function __construct(){}

  public function setContents($r) {
    $this->row = $r;
  }

  public function setDesigner($d) {
    $this->designer = $d;
  }

  public function getContents() {
    $query = "SELECT desid,start_Y,start_M,method1,method2,daepyo_a,daepyo_t FROM deslist WHERE desid = '";
    $query .= $this->designer->desid;
    $query .= "'";
    $row = $this->mysqlGet($query);
    if ($row === "error") { return "error"; }
    return $row[0];
  }

  public function designerBox($boo) {
    $html = '';
    if ($boo) {
      $html .= '<img src="./list_image/portp'.$this->designer->daepyo_a.'/'.$this->designer->daepyo_t.$this->designer->daepyo_a.'.jpg" class="dedemainimg">';
      $html .= '<div class="dedegray dgybar1"></div>';
      $html .= '<div class="dedegray dgybar2"></div>';
      $html .= '<img src="./list_svg/delist/name/name'.$this->designer->desid.'.svg" class="dedesvgname">';
      $html .= '<img src="./list_svg/delist/method/'.$this->designer->method1.'.svg" class="dedesvgmeth ddsmethod1">';
      $html .= '<img src="./list_svg/delist/method/'.$this->designer->method2.'.svg" class="dedesvgmeth ddsmethod2">';
      $html .= '<div class="dedegyeongbox">';
      $html .= '<img class="dedegyeong" src="./list_svg/delist/etc/etc1.svg">';
      $html .= '<img class="dedegyeong ddgetc0" src="./list_svg/delist/etc/etc0.svg">';
      $html .= '<div class="dedegyeongword ddword1">'.$this->designer->career->year.'</div>';
      $html .= '<img class="dedegyeong ddgetc1" src="./list_svg/delist/etc/etc2.svg">';
      $html .= '<div class="dedegyeongword ddword2">'.$this->designer->career->month.'</div>';
      $html .= '<img class="dedegyeong ddgetc1" src="./list_svg/delist/etc/etc3.svg">';
      $html .= '</div>';
      $html .= '<img src="./list_svg/dedetail/wording/word'.$this->designer->desid.'.svg" class="dedesvgdesc">';
    } else {
      $html .= '<img src="./list_image/portp'.$this->designer->daepyo_a.'/mobile/mo'.$this->designer->daepyo_t.$this->designer->daepyo_a.'.jpg" class="modedemainimg">';
      $html .= '<img src="./list_svg/delist/name/name'.$this->designer->desid.'.svg" class="modedesvgname">';
      $html .= '<img src="./list_svg/delist/method/'.$this->designer->method1.'.svg" class="modedesvgmeth moddsmethod1">';
      $html .= '<img src="./list_svg/delist/method/'.$this->designer->method2.'.svg" class="modedesvgmeth moddsmethod2">';
      $html .= '<div class="modedegyeongbox">';
      $html .= '<img class="modedegyeongib" src="./list_svg/delist/etc/etc1.svg">';
      $html .= '<img class="modedegyeongib mogca1" src="./list_svg/delist/etc/etc0.svg">';
      $html .= '<div class="modedegyeongword">'.$this->designer->career->year.'</div>';
      $html .= '<img class="modedegyeongib mogca2" src="./list_svg/delist/etc/etc2.svg">';
      $html .= '<div class="modedegyeongword">'.$this->designer->career->month.'</div>';
      $html .= '<img class="modedegyeongib mogca2" src="./list_svg/delist/etc/etc3.svg">';
      $html .= '</div>';
      $html .= '<img src="./list_svg/dedetail/wording/moword'.$this->designer->desid.'.svg" class="modetail">';
    }
    return $html;
  }

}
?>
