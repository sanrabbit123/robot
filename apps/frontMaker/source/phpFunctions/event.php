<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Eventf extends Generalf {

  private $box3dan;

  function __construct($mege){
    $this->box3dan = $mege;
  }

  public function box3danfunc($tf){
    $html = '';
    for ($i = 0; $i < 3; $i++) {
      $html .= '<img class="absol '.(($tf)?'':'mo').'box3good" id="'.(($tf)?'':'mo').'good3a'.(string)($i+1).'" src="./list_svg/event/promotion200110/good'.(string)($i+1).'.svg">';
      $html .= '<img class="absol '.(($tf)?'':'mo').'box3shadow" id="'.(($tf)?'':'mo').'shadow3a'.(string)($i+1).'" src="./list_image/event/promotion200110/shadow2.png">';
      $html .= '<div class="'.(($tf)?'':'mo').'box33dan'.(($i===2)?'':' dan3margin').'">';
      $html .= '<div class="absol dan3bar"></div>';
      $html .= '<img class="dan3title" src="./list_svg/event/promotion200110/goodtitle'.(string)($i+1).'.svg">';
      $html .= '<img class="dan3script" src="./list_svg/event/promotion200110/gooddescript'.(string)($i+1).'.svg">';
      $html .= '<img class="dan3img" src="./list_image/portp'.$this->box3dan[$i][0].'/'.$this->box3dan[$i][1].$this->box3dan[$i][0].'.jpg">';
      $html .= '</div>';
    }
    return $html;
  }

}
?>
