<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Portdetailf extends Generalf {

  private $row;

  function __construct(){}

  public function getContents($getid) {
    if ($getid === "g00" || $getid === "") {
      return "error";
    }
    $query = "SELECT porlid,photosg,photodae,slide,wordingtitle,wordingkey,desid,designer,apartname,description,revid FROM pordeta WHERE porlid = '".$getid."';";
    $info_row = $this->mysqlGet($query);
    if ($info_row === "error") { return "error"; }
    $info = $info_row[0];

    $dearrayaa = explode(' ',$info[5]);
    $dcount = count($dearrayaa);
    $dearray = [];
    for ($i = 0; $i < count($dearrayaa); $i++) {
      array_push($dearray, (int)$dearrayaa[$i]);
    }
    $photosg = explode(' ', $info[1]);
    $photoauto = [ "auto 100%" ];
    for ($i = 0; $i < count($photosg); $i++) {
      if ($photosg[$i] === "s") { array_push($photoauto, "auto 100%"); }
      else { array_push($photoauto, "100% auto"); }
    }
    $row = (object) array(
      "porlid" => $info[0],
      "photosg" => $photosg,
      "photonum" => count($photosg),
      "photodae" => explode(' ',$info[2]),
      "slide" => explode(' ',$info[3]),
      "wordingtitle" => explode(' ',$info[4]),
      "apartname" => $info[8],
      "description" => $info[9],
      "dearray" => $dearray,
      "photoauto" => $photoauto,
      "revid" => $info[10],
      "desid" => $info[6]
    );
    return $row;
  }

  public function setContents($r) {
    $this->row = $r;
  }

  public function slideBox($flatform) {
    $html = '';
    if ($flatform === "desktop") {

      $arr = [ "jari_l2", "jari_l1", "jari_ce", "jari_r2", "jari_r1" ];

      $html .= '<div id="pordslibox">';

      for ($i = 0; $i < 9; $i++) {
        $html .= '<div id="pordpicture'.(string)($i + 1).'" class="slidemain pordpictureclass'.(string)($i + 1).'" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.$this->row->slide[$i].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$this->row->slide[$i]].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
      }

      for ($i = 0; $i < 9; $i++) {
        $html .= '<div id="pordthumb'.(string)($i + 1).'" class="slidethumb" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.$this->row->slide[$i].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$this->row->slide[$i]].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
      }

      for ($i = 0; $i < 5; $i++) {
        $html .= '<div id="'.$arr[$i].'" class="slibutton"></div>';
      }

      $html .= '</div>';

    } else {
      $html .= '<div id="mopordsli1">';
      for ($i = 0; $i < 9; $i++) {
        $html .= '<div id="mopordpicture'.(string)($i + 1).'" class="mopordpictureclass'.(string)($i + 1).'" style="background-image: url(./list_image/portp'.$this->row->porlid.'/mobile/mot'.$this->row->slide[$i].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$this->row->slide[$i]].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
      }
      $html .= '</div>';
      $html .= '<div id="mopordwonsli1">';
      for ($i = 0; $i < 9; $i++) {
        $html .= '<img src="./list_svg/mobilewonwon_0'.(string)($i + 1).'.svg" class="mopordwonwon'.(string)($i + 1).'">';
      }
      $html .= '</div>';
    }
    return $html;
  }

  public function designerBox($className, $boo) {
    $html = '<div class="'.$className.'">';




    $html .= '<div class="'.(($boo) ? '' : 'mo').'deligmar"></div>';

    if (!$boo) { $html .= '<img class="modeligdet1" src="./list_svg/revrevrev/revhook2.svg">'; }

    $html .= '<div class="'.(($boo) ? '' : 'mo').'deligimg" style="background-image: url(./list_image/portp'.$this->designer->daepyo_a.'/mobile/mo'.$this->designer->daepyo_t.$this->designer->daepyo_a.'.jpg);"></div>';

    $html .= '<img class="'.(($boo) ? '' : 'mo').'deligname" ';
    if ($boo) { $html .= 'style="padding-left:'.(($this->row->desid === "de000") ? "16px" : "0px").';" '; }
    $html .= 'src="./list_svg/delist/name/name'.$this->designer->desid.'.svg">';

    $html .= '<img class="'.(($boo) ? '' : 'mo').'deligmethod '.(($boo) ? '' : 'mo').'mtd1" src="./list_svg/delist/method/'.$this->designer->method1.(($boo) ? '_mid' : '').'.svg">';

    $html .= '<img class="'.(($boo) ? '' : 'mo').'deligmethod '.(($boo) ? '' : 'mo').'mtd2" src="./list_svg/delist/method/'.$this->designer->method2.(($boo) ? '_mid' : '').'.svg">';


    $html .= '<div class="'.(($boo) ? '' : 'mo').'deligyeongbox">';
    $html .= '<img class="'.(($boo) ? 'deligetc' : 'modedegyeongib').'" src="./list_svg/delist/etc/etc1.svg">';
    if ($boo) { $html .= '<img class="deligetc" src="./list_svg/delist/etc/etc0.svg">'; }
    $html .= '<div class="'.(($boo) ? 'deliwetc0' : 'modedegyeongword').'">'.$this->designer->career->year.'</div>';
    $html .= '<img class="'.(($boo) ? 'deligetc deligetc2' : 'modedegyeongib mogca2').'" src="./list_svg/delist/etc/etc2.svg">';
    $html .= '<div class="'.(($boo) ? 'deliwetc0' : 'modedegyeongword').'"> '.$this->designer->career->month.'</div>';
    $html .= '<img class="'.(($boo) ? 'deligetc deligetc2' : 'modedegyeongib mogca2').'" src="./list_svg/delist/etc/etc3.svg">';
    $html .= '</div>';

    $html .= '<a href="./desdetail.php?qqq='.$this->designer->desid.'"><div class="delibutton"></div></a>';





    $html .= '</div>';
    return $html;
  }

  public function titleBox($flatform) {
    $html = '';
    if ($flatform === "desktop") {
      $html .= '<div class="pordtitlebox">';
      $html .= '<img src="./list_image/portp'.$this->row->porlid.'/name'.$this->row->porlid.'.svg" class="porduppertitlesvg">';
      $html .= '<a href="./consulting.php"><div class="pordtitlebutton"></div></a>';
      $html .= '</div>';
    } else {
      $html .= '<div class="mopordbase0">';
      $html .= '<img class="mopordeimgti" src="./list_image/portp'.$this->row->porlid.'/svg/title'.$this->row->porlid.'.svg">';
      $html .= '</div>';
      $html .= '<div class="mopordtitleclass">';
      $html .= '<img src="./list_image/portp'.$this->row->porlid.'/svg/moword1003'.$this->row->porlid.'_01.svg">';
      $html .= '</div>';
    }
    return $html;
  }

  public function hookBox($flatform) {
    $html = '';
    if ($flatform === "desktop") {
      for ($i = 0; $i < 3; $i++) {
        $html .= '<div class="pordmargin0"></div>';
      }
      if ($this->row->revid !== "re999") {
        $html .= '<div class="hookbox" style="display:block;">';
      } else {
        $html .= '<div class="hookbox" style="display:none;">';
      }
      $html .= $this->designerBox("hookdesigner", true);
      $html .= '<div class="hookport" style="background-image:url(./list_image/portp'.$this->row->porlid.'/t'.$this->row->photodae[1].$this->row->porlid.'.jpg);background-size:auto 100%;background-position:50% 50%;"></div>';
      $html .= '<img class="hooktitle0" src="./list_svg/revrevrev/revhook1.svg">';
      $html .= '<img class="hooktitle1" src="./list_svg/revrevrev/detail/'.$this->row->revid.'/name2'.$this->row->revid.'.svg">';
      $html .= '<a href="./revdetail.php?qqq='.$this->row->revid.'"><div class="hookbutton"></div></a>';
      $html .= '</div>';
    } else {
      $html .= '<div class="moporddesigner modsub2">';
      if ($this->row->revid !== "re999") {
        $html .= '<div class="moporddesigner modsub2">';
        $html .= '<img class="modeligdet2" src="./list_svg/revrevrev/revhook1.svg">';
        $html .= '<div class="modeligmar"></div>';
        $html .= '<div class="morevgaro"><a href="./revdetail.php?qqq='.$this->row->revid.'"><img src="./list_image/portp'.$this->row->porlid.'/mobile/mot'.$this->row->photodae[1].$this->row->porlid.'.jpg" class="morevimg"></a></div>';
        $html .= '<div class="morerevmargin1"></div>';
        $html .= '<div class="morevtigaro"><a href="./revdetail.php?qqq='.$this->row->revid.'"><img src="./list_svg/revrevrev/rereetc1.svg" class="morevrevrevimgetc1"><img src="./list_svg/revrevrev/rereetc2.svg" class="morevrevrevimgetc2"><img src="./list_svg/revrevrev/morevivector/morevtivec'.$this->row->revid.'.svg" class="morevrevrevimg sero"></a></div>';
        $html .= '<div class="morerevmargin2"></div>';
        $html .= '</div>';
      }
      $html .= '</div>';
    }
    return $html;
  }

  public function mainContentTitle() {
    $html = '<div class="pordgaropicture">';
    $html .= '<img class="pordgarodesktiti01" src="./list_image/portp'.$this->row->porlid.'/svg/word1003'.$this->row->porlid.'_00.svg">';
    $html .= '<svg shape-rendering="geometricPrecision" class="pordgarodesktiti01" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 875.39526 618.95386" style="enable-background:new 0 0 875.39526 618.95386;" xml:space="preserve"><image style="overflow:visible;opacity:0.12;" width="1883" height="2704" xlink:href="list_image/ppdeshadow.png"  transform="matrix(0.23953 0 0 0.23965 -0.15459 -15.23818)"></image></svg>';
    $html .= '<div class="pordgarodesktiti02" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.$this->row->photodae[0].$this->row->porlid.'.jpg);background-size: auto 100%;background-position: 50% 50%;background-repeat:no-repeat;"></div>';
    $html .= '</div>';
    $html .= '<div class="pordbase0"><img class="pordeimgti" src="./list_image/portp'.$this->row->porlid.'/svg/title'.$this->row->porlid.'.svg"></div>';
    $html .= '<div class="pordbase1"><img src="./list_image/portp'.$this->row->porlid.'/svg/word1003'.$this->row->porlid.'_01.svg"></div><div class="pordmargin1"></div>';
    return $html;
  }

  public function mainContentLoop($boo) {
    $html = '';
    $i = 0;
    $j = 2;
    while ($i < $this->row->photonum) {
    if ($this->row->photosg[$i] === "s") {
      if ($boo) {
        $html .= '<div class="pordgaropicture">';
        $html .= '<div id="pordgaropicture'.(string)($i+1).'" class="pordserosvg1" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.(string)($i + 1).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
        $html .= '<div id="pordgaropicture'.(string)($i+2).'" class="pordserosvg2" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.(string)($i + 2).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 2].';background-position: 50% 50%;background-repeat:no-repeat;"></div></div>';
      } else {
        $html .= '<div class="mopordgaro">';
        $html .= '<div id="mopordgaropicture'.(string)($i+1).'" class="mopordsero1" style="background-image: url(./list_image/portp'.$this->row->porlid.'/mobile/mot'.(string)($i + 1).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
        $html .= '<div id="mopordgaropicture'.(string)($i+2).'" class="mopordsero2" style="background-image: url(./list_image/portp'.$this->row->porlid.'/mobile/mot'.(string)($i + 2).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 2].';background-position: 50% 50%;background-repeat:no-repeat;"></div></div>';
      }
      $i = $i + 2;
    } else {
      if ($boo) {
        $html .= '<div id="pordgaropicture'.(string)($i+1).'" class="pordgarogray" style="background-image: url(./list_image/portp'.$this->row->porlid.'/t'.(string)($i + 1).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
      } else {
        $html .= '<div id="mopordgaropicture'.(string)($i+1).'" class="mopordgray" style="background-image: url(./list_image/portp'.$this->row->porlid.'/mobile/mot'.(string)($i + 1).$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;"></div>';
      }
      $i = $i + 1;
    }
    if (in_array($i, $this->row->dearray)) {
      if ($boo) {
        $html .= '<div class="pordbase0"><img class="pordeimg0" src="./list_svg/porporpor/rooms/'.$this->row->wordingtitle[$j-2].'.svg"></div>';
        $html .= '<div class="pordbase1"><img src="./list_image/portp'.$this->row->porlid.'/svg/word1003'.$this->row->porlid.'_0'.(string)$j.'.svg"></div>';
      } else {
        $html .= '<div class="mopordbase0"><img class="mopordeimg0" src="./list_svg/porporpor/rooms/'.$this->row->wordingtitle[$j-2].'.svg"></div>';
        $html .= '<div class="mopordbase1"><img src="./list_image/portp'.$this->row->porlid.'/svg/moword1003'.$this->row->porlid.'_0'.(string)$j.'.svg"></div>';
      }
      $j = $j + 1;
      continue;
    }
      $html .= '<div class="'.(($boo) ? '' : 'mo').'pordmargin"></div>';
    }
    return $html;
  }

}
?>
