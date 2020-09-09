<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Portfoliof extends Generalf {

  function __construct(){}

  public function eescape($string){
    $filfil = preg_replace("/[\&\+\-\%\@\/\\\:\^\`\~\|\!\?\*\$\<\>\[\]\(\)\'\"\{\}]/i", "", $string);
    return addslashes($filfil);
  }

  public function porliback(){
    $html = '';
    $html .= '<div id="porli2s0back0817" class="fadeInmaininit" style="background-image: url(./list_image/porporpor0906/porlideskback0826.jpg);background-size: 100% auto;background-position: 50% 40%;"></div>';
    $html .= '<div id="moporli2s0back0817" class="fadeInmaininit" style="background-image: url(./list_image/porporpor0906/mobile/moporlideskback0826.jpg);background-size: auto 100%;background-position: 44% 65%;"></div>';
    $html .= '<div id="porli2s0position" class="fadeInmaininit">';
      $html .= '<img src="./list_svg/porporpor/desk_porli01104.svg">';
    $html .= '</div>';
    $html .= '<div id="moporli2s0position" class="fadeInmaininit">';
      $html .= '<img src="./list_svg/porporpor/mobile/mobile_porli00831.svg">';
    $html .= '</div>';
    return $html;
  }

  public function searchbar($m){
    $methodarr = ['all','토탈스타일링','홈퍼니싱','제작가구','아이방','원룸'];
    $html = '';
    $html .= "<div class=\"polisearchbox\">\n";
    $html .= '<div id="'.($m?'':'mo').'polisearch01">';
    $html .= '<img src="./list_svg/porporpor/search/searbae'.($m?'0':'1').'1.svg" class="porporporimg">';
    $html .= '<input id="'.($m?'':'mo').'polisearch" class="polisearchclass" type="text" name="search1">';
    $html .= '<input id="'.($m?'':'mo').'polisearch2" style="display:none;" type="hidden" name="search2" value="key9">';
    $html .= '<input id="'.($m?'':'mo').'polisearch3" style="display:none;" type="hidden" name="search3" value="all">';
    $html .= '<input id="'.($m?'':'mo').'polisubmit" type="button" class="poliordered">';
    $html .= '<label class="polilabel" for="'.($m?'':'mo').'polisubmit"><div id="'.($m?'':'mo').'polisubmitdiv"></div></label>';
    $html .= '</div>';
    $html .= '<div id="'.($m?'':'mo').'polisearch02">';
    for($i1 = 0;$i1 < 2;$i1++){
      for($i2 = 0;$i2 < 2;$i2++){
        if($i1 !== 1){
          $html .= '<img src="./list_svg/porporpor/search/searbae'.($m?'0':'1').(string)($i2+2).'.svg" class="porporporimg" id="'.($m?'':'mo').'poliorderedsvg'.(string)($i2+1).'">';
        } else {
          $html .= '<label class="polilabel" for="'.($m?'':'mo').'poliordered'.(string)($i2+1).'"><div id="'.($m?'':'mo').'poliordered'.(string)($i2+1).'div"></div></label>';
        }
      }
    }
    $html .= '</div>';
    $html .= '<div id="'.($m?'':'mo').'polisearch03">';
    for($i4 = 0;$i4 < 6;$i4++){
      if($m){
        $html .= '<img id="politypesvg'.(string)($i4+1).'" src="./list_svg/porporpor/search/searbae0'.(string)($i4+4).'.svg" class="porporporimg">';
      } else {
        $html .= '<img id="mopolitypesvg'.(string)($i4+1).'" src="./list_svg/porporpor/search/searbae'.(string)($i4+15).'.svg" class="porporporimg">';
      }
    }
    $html .= '<a class="'.($m?'':'mo').'politypebu" id="'.($m?'':'mo').'politypebu"></a>';
    $html .= '</div>';
    $html .= '<div id="'.($m?'':'mo').'porlidelidediv" style="opacity:0;">';
    $html .= '<img src="./list_svg/porporpor/search/searbae1'.($m?'0':'4').'.svg" id="'.($m?'':'mo').'porlidelideimg" class="porporporimg">';
    for($i6 = 0;$i6 < 6;$i6++){
      $html .= '<label class="polilabel '.($m?'':'mo').'politypebu" for="'.($m?'':'mo').'politype'.(string)($i6+1).'"><div class="'.($m?'':'mo').'politypediv '.($m?'':'mo').'plt'.(string)($i6+1).'"></div></label>';
    }
    $html .= "</div>\n";
    $html .= '</div>';
    return $html;
  }

}
?>
