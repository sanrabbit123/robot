module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Generalf.php';
class Loopstyle extends Generalf {

  public function escape($string) {
    $newStr = preg_replace("/[\\&\\+\\-\\%\\@\\/\\:\\^\\~\\|\\!\\?\\*\\$\\<\\>\\[\\]\\{\\}]/i", "", $string);
    return $newStr;
  }

  // 1 - desktop portfolio
  public function porporloop($garoarray, $dbarray) {
    $porhtml = '';
    for ($i = 0; $i < count($dbarray); $i++) {
      if (in_array($i, $garoarray)) {
        $garosero1 = 'garo';
        $garosero2 = 'garo';
        $garosero3 = $dbarray[$i][2];
      } else {
        $garosero1 = 'sero';
        $garosero2 = '';
        $garosero3 = $dbarray[$i][1];
      }
      $porhtml .= '<div id="pblockid'.(string)$i.'" class="portliblock p'.$garosero1.'">';
      $porhtml .= '<a href="/portdetail.php?qqq='.$dbarray[$i][0].'"><div class="portliblock1" style="background-image:url(/list_image/portp'.$dbarray[$i][0].'/t'.$garosero3.$dbarray[$i][0].'.jpg)">';
      $porhtml .= '<div class="porporporimg piho"><div class="porhoverblack"></div><img src="/list_svg/porporpor/titlehoversero/porhovec'.$dbarray[$i][0].'.svg" class="porporporimg"></div>';
      $porhtml .= '</div></a>';
      $porhtml .= '<a href="/portdetail.php?qqq='.$dbarray[$i][0].'"><div class="portliblock2">';
      $porhtml .= '<img src="/list_svg/porporpor/title'.$garosero1.'/portivec'.$garosero2.$dbarray[$i][0].'.svg" class="porporporimg">';
      $porhtml .= '<div class="porporporimg pwho"></div>';
      $porhtml .= '</div></a></div>';
    }
    return $porhtml;
  }

  // 2 - mobile portfolio
  public function moporporloop($garoarray, $dbarray) {
    $moporhtml = '';
    for ($i = 0; $i < count($dbarray); $i++) {
      if (in_array($i, $garoarray)) {
        $mogarosero1 = 'garo';
        $mogarosero2 = 'garo';
        $mogarosero3 = $dbarray[$i][2];
      } else {
        $mogarosero1 = 'sero';
        $mogarosero2 = '';
        if (in_array(9999, $garoarray)) {
          $mogarosero3 = $dbarray[$i][2];
        } else {
          $mogarosero3 = $dbarray[$i][1];
        }
      }
      $moporhtml .= '<div class="moportliblock mop'.$mogarosero1.'">';
      $moporhtml .= '<a href="/portdetail.php?qqq='.$dbarray[$i][0].'"><div class="moportliblock1" style="background-image:url(/list_image/portp'.$dbarray[$i][0].'/mobile/mot'.$mogarosero3.$dbarray[$i][0].'.jpg)"></div></a>';
      $moporhtml .= '<a href="/portdetail.php?qqq='.$dbarray[$i][0].'"><div class="moportliblock2">';
      $moporhtml .= '<img src="/list_svg/porporpor/mobile/motitle'.$mogarosero1.'/moportivec'.$mogarosero2.$dbarray[$i][0].'.svg" class="porporporimg">';
      $moporhtml .= '</div></a></div>';
    }
    return $moporhtml;
  }

  // 3 - desktop review
  public function revrevloop($garoarray, $dbarray) {
    $revhtml = '';
    for ($i = 0; $i < count($dbarray); $i++) {
      if (in_array($i, $garoarray)) {
        $garosero1 = 'garo';
        $garosero2 = '3';
      } else {
        $garosero1 = 'sero';
        $garosero2 = '1';
      }
      $revhtml .= '<div id="rblockid'.(string)$i.'" class="reviliblock p'.$garosero1.'">';
      $revhtml .= '<a href="/revdetail.php?qqq='.$dbarray[$i][0].'"><div class="reviliblock'.$garosero2.'" style="background-image:url(/list_image/portp'.$dbarray[$i][1].'/t'.$dbarray[$i][2].$dbarray[$i][1].'.jpg)">';
      $revhtml .= '<div class="porporporimg piho"><div class="porhoverblack"></div><img src="/list_svg/revrevrev/revhovector/revhovec'.$dbarray[$i][0].'.svg" class="porporporimg"></div>';
      $revhtml .= '</div></a>';
      $revhtml .= '<a href="/revdetail.php?qqq='.$dbarray[$i][0].'"><div class="reviliblock2">';
      $revhtml .= '<img src="/list_svg/revrevrev/rereetc1.svg" class="revrevrevimgetc1"><img src="/list_svg/revrevrev/rereetc2.svg" class="revrevrevimgetc2"><img src="/list_svg/revrevrev/revivector/revtivec'.$dbarray[$i][0].'.svg" class="revrevrevimgti">';
      $revhtml .= '<div class="porporporimg pgho"></div>';
      $revhtml .= '</div></a></div>';
    }
    return $revhtml;
  }

  // 4 - mobile review
  public function morevrevloop($garoarray, $dbarray) {
    $morevhtml = '';
    for ($i = 0; $i < count($dbarray); $i++) {
      if (in_array($i, $garoarray)) {
        $mogarosero1 = 'garo';
        $mogarosero2 = '3';
      } else {
        $mogarosero1 = 'sero';
        $mogarosero2 = '1';
      }
      $morevhtml .= '<div class="moreviliblock mop'.$mogarosero1.'">';
      $morevhtml .= '<a href="/revdetail.php?qqq='.$dbarray[$i][0].'"><div class="moportliblock'.$mogarosero2.'" style="background-image:url(/list_image/portp'.$dbarray[$i][1].'/mobile/mot'.$dbarray[$i][2].$dbarray[$i][1].'.jpg)"></div></a>';
      $morevhtml .= '<a href="/revdetail.php?qqq='.$dbarray[$i][0].'"><div class="moreviliblock2">';
      $morevhtml .= '<img src="/list_svg/revrevrev/rereetc1.svg" class="morevrevrevimgetc1"><img src="/list_svg/revrevrev/rereetc2.svg" class="morevrevrevimgetc2"><img src="/list_svg/revrevrev/morevivector/morevtivec'.$dbarray[$i][0].'.svg" class="morevrevrevimg sero">';
      $morevhtml .= '</div></a></div>';
    }
    return $morevhtml;
  }
}
?>`;
}
