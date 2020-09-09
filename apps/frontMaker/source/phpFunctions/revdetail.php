<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Revdetailf extends Generalf {

  private $row;

  function __construct(){}

  public function getContents($getid) {
    if ($getid === "g00" || $getid === "") {
      return "error";
    }
    $query = "SELECT revid,porlid,phototnum,photosg,photodae,wordingkey,desid,retitle,description FROM revdeta WHERE revid = '".$getid."';";
    $info_row = $this->mysqlGet($query);
    if ($info_row === "error") { return "error"; }
    $info = $info_row[0];

    $photonumber = explode(' ',$info[2]);
    $photosg = explode(' ',$info[3]);
    $photodae = explode(' ',$info[4]);
    $dearrayaa = explode(' ', $info[5]);
    $dearray = [];
    for ($i = 0; $i < count($dearrayaa); $i++) {
      array_push($dearray, (int)$dearrayaa[$i]);
    }
    $photoauto = [ "auto 100%" ];
    for ($i = 0; $i < count($photosg); $i++) {
      if ($photosg[$i] === "s") { array_push($photoauto, "auto 100%"); }
      else { array_push($photoauto, "100% auto"); }
    }

    $row = (object) array(
      "revid" => $info[0],
      "porlid" => $info[1],
      "photonumber" => $photonumber,
      "photosg" => $photosg,
      "photonum" => count($photosg),
      "photodae" => $photodae,
      "retitle" => $info[7],
      "description" => $info[8],
      "dearray" => $dearray,
      "photoauto" => $photoauto,
      "desid" => $info[6]
    );
    return $row;
  }

  public function setContents($r) {
    $this->row = $r;
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

  public function mainBox($boo) {
    $html = '';
    if ($boo) {
      $html .= '<div id="revmainbox" class="revmainboxsc">';
      $html .= '<div class="revmainback revmainbacksc"></div>';
      $html .= '<img class="revmainshadow revmainshadowsc" src="./list_image/revrevrev/welcomeshadow4.png">';
      $html .= '<div class="revmainpicture revmainpicturesc" style="background-image:url(./list_image/portp'.$this->row->porlid.'/b1'.$this->row->porlid.'.jpg);"></div>';
      $html .= '<img class="revmwre rvmw1" src="./list_svg/revrevrev/detail/number/nu'.$this->row->revid.'.svg">';
      $html .= '<img class="revmwre rvmw2" src="./list_svg/revrevrev/revwelcom3.svg">';
      $html .= '<div class="revmwre rvmw3"></div>';
      $html .= '<img class="revmwre rvmw4" src="./list_svg/revrevrev/detail/'.$this->row->revid.'/resubti'.$this->row->revid.'.svg">';
      $html .= '</div>';
    } else {
      $html .= '<div id="mopordsli1">';
      $html .= '<div class="morevpictureclass" style="background-image:url(./list_image/portp'.$this->row->porlid.'/mobile/mot'.$this->row->photodae[1].$this->row->porlid.'.jpg);background-size:100% auto;background-position:50% 50%;"></div>';
      $html .= '<img src="./list_svg/revrevrev/morevwelcome3.svg" class="morevmainwhite">';
      $html .= '</div>';
    }
    return $html;
  }

  public function contentsBox($boo) {
    $html = '';
    $html .= '<div class="'.($boo ? '' : 'mo').'pordbase0"><img class="'.($boo ? '' : 'mo').'pordeimgti" src="./list_svg/revrevrev/detail/'.$this->row->revid.'/retitle'.$this->row->revid.'.svg"></div>';
    $html .= '<div class="'.($boo ? '' : 'mo').'pordtitleclass"><img src="./list_svg/revrevrev/detail/'.$this->row->revid.'/'.($boo ? '' : 'mo').'reword'.$this->row->revid.'_01.svg"></div>';
    $i = 0;
    $j = 2;
    while ($i < $this->row->photonum) {
      if ($this->row->photosg[$i] == "s") {
        $html .= '<div class="'.($boo ? '' : 'mo').'pordgaropicture">';
        $html .= '<div id="'.($boo ? '' : 'mo').'pordgaropicture'.(string)($i + 1).'" class="'.($boo ? '' : 'mo').'pordsero1" ';
        $html .= 'style="background-image: url(./list_image/portp'.$this->row->porlid.($boo ? '/t' : '/mobile/mot').$this->row->photonumber[$i].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;">';
        $html .= '</div>';
        $html .= '<div id="'.($boo ? '' : 'mo').'pordgaropicture'.(string)($i + 2).'" class="'.($boo ? '' : 'mo').'pordsero2" ';
        $html .= 'style="background-image: url(./list_image/portp'.$this->row->porlid.($boo ? '/t' : '/mobile/mot').$this->row->photonumber[$i + 1].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 2].';background-position: 50% 50%;background-repeat:no-repeat;">';
        $html .= '</div></div>';
        $i = $i + 2;
      } else {
        $html .= '<div id="'.($boo ? '' : 'mo').'pordgaropicture'.(string)($i + 1).'" class="'.($boo ? '' : 'mo').'pordgray" ';
        $html .= 'style="background-image: url(./list_image/portp'.$this->row->porlid.($boo ? '/t' : '/mobile/mot').$this->row->photonumber[$i].$this->row->porlid.'.jpg);background-size: '.$this->row->photoauto[$i + 1].';background-position: 50% 50%;background-repeat:no-repeat;">';
        $html .= '</div>';
        $i = $i + 1;
      }
      if (in_array($i, $this->row->dearray)) {
        $html .= '<div class="'.($boo ? '' : 'mo').'pordbase1"><img src="./list_svg/revrevrev/detail/'.$this->row->revid.'/'.($boo ? '' : 'mo').'reword'.$this->row->revid.'_0'.(string)$j.'.svg"></div>';
        $j = $j + 1;
        continue;
      }
      $html .= '<div class="'.($boo ? '' : 'mo').'pordmargin"></div>';
    }
    return $html;
  }

  public function hookBox($boo) {
    $html = '';
    if ($boo) {
      if($this->row->porlid == "r01" || $this->row->porlid == "r02"){
        $html .= '<div class="hookbox" style="display:none;">';
      } else {
        $html .= '<div class="hookbox" style="display:block;">';
      }
      $html .= '<div class="hookmargin"></div>';
      $html .= '<div class="hookdesigner">';
      $html .= $this->designerBox("porddesignerbox", $boo);
      $html .= '</div>';
      $html .= '<div class="hookport" style="background-image:url(./list_image/portp'.$this->row->porlid.'/t'.$this->row->photodae[1].$this->row->porlid.'.jpg);background-size:auto 100%;background-position:50% 50%;"></div>';
      $html .= '<img class="hooktitle0" src="./list_svg/revrevrev/revhook3.svg">';
      $html .= '<img class="hooktitle1" src="./list_image/portp'.$this->row->porlid.'/name2'.$this->row->porlid.'.svg">';
      $html .= '<a href="./portdetail.php?qqq='.$this->row->porlid.'"><div class="hookbutton"></div></a>';
      $html .= '</div>';
    } else {
      $html .= '<div class="moporddesigner modsub1">';
      $html .= $this->designerBox("porddesignerbox", $boo);
      $html .= '</div>';
      if ($this->row->porlid !== "r01" && $this->row->porlid !== "r02" ) {
        $html .= '<div class="moporddesigner modsub2">';
        $html .= '<img class="modeligdet2" src="./list_svg/revrevrev/revhook3.svg">';
        $html .= '<div class="modeligmar"></div>';
        $html .= '<div class="morevgaro"><a href="./portdetail.php?qqq='.$this->row->porlid.'"><img src="./list_image/portp'.$this->row->porlid.'/mobile/mot'.$this->row->photodae[1].$this->row->porlid.'.jpg" class="morevimg"></a></div>';
        $html .= '<div class="morerevmargin1"></div>';
        $html .= '<div class="morevtigaro"><a href="./portdetail.php?qqq='.$this->row->porlid.'"><img src="./list_svg/porporpor/mobile/motitlesero/moportivec'.$this->row->porlid.'.svg"></a></div>';
        $html .= '<div class="morerevmargin2"></div>';
        $html .= '</div>';
      } else {
        $html .= '<div class="moporddesigner modsub2">';
        $html .= '</div>';
      }
    }
    return $html;
  }

  public function belowBox() {
    $html = '';
    $html .= '<div id="pordbelowback">';
    $html .= '<div id="pordbelowbox">';
    $html .= '<img src="./list_svg/revrevrev/belowrevde.svg" class="pordbelowsvg">';
    $html .= '<a href="./review.php"><div id="pordbelowbutton1" class="pordbelowbubu"></div></a>';
    $html .= '<a href="./portfolio.php"><div id="pordbelowbutton2" class="pordbelowbubu"></div></a>';
    $html .= '<a href="./consulting.php"><div id="pordbelowbutton3" class="pordbelowbubu"></div></a>';
    $html .= '</div>';
    $html .= '</div>';
    return $html;
  }

}
?>
