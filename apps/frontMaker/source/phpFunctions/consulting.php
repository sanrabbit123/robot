<?php
require_once dirname(__DIR__, 1).'/Generalf.php';
class Consultingf extends Generalf {

  function __construct(){}

  public function createBlock($boo) {
    $block = '<div class="'.($boo ? '' : 'mo').'blockbox"></div>';
    $html = '';
    for ($i = 0; $i < 6; $i++) {
      $html .= $block;
    }
    return $html;
  }

}
?>
