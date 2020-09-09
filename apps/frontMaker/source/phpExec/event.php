<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/event_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();

$ranran = rand(0,20);
$ranlink = (($ranran < 10) ? 'o' : 's');
if(!isset($_GET['qqq'])){
  header('Location: https://home-liaison.com/event.php?qqq='.$ranlink);
}

$htmlhtml = new Blockstyle();
$headhtml = '';

$titleinfo = ['원룸 홈스타일링 이벤트 | 홈리에종','홈리에종 프로모션 : 원룸 홈스타일링 이벤트','/event.php?qqq=o','/list_image/portpp18/t19p18.jpg'];
$titleinfo2 = ['새싹 디자이너 이벤트 | 홈리에종','홈리에종 프로모션 : 새싹 디자이너 이벤트','/event.php?qqq=s','/list_image/portpp18/t19p18.jpg'];
$box3dan = [['p13','t8'],['a56','t2'],['a62','t3']];
$htmlindex = new Eventf($box3dan);

$hiddentext = '<h1>홈리에종 프로모션 이벤트 : 원룸 홈스타일링 이벤트! & 새싹 디자이너 이벤트!</h1>';
$hiddentext .= '<p>원룸 꾸미기가 막막하다면? 나에게 가장 알맞는 스타일로 집을 꾸미고 싶다면?홈스타일링 디자이너와 함께 1:1 큐레이션을 받으며 나의 취향과 라이프스타일이 반영된 나만의 아지트를 만들어보세요.막막하게만 느껴지던 원룸 홈스타일링 서비스를 최대 40만원까지 할인 받을 수 있어요!</p>';
$hiddentext .= '<h3>혜택 1 시간과 돈, 모두 소중하니까요 :)</h3>';
$hiddentext .= '<p>예쁜 원룸 나도 똑같이 꾸미고 싶지만,시간과 비용 문제로 망설였다면!홈리에종 원룸 홈스타일링으로 시간과 비용을 잘 활용하고 더욱 합리적으로 나만의 공간을 만들어보세요!</p>';
$hiddentext .= '<h3>혜택 2 원룸이니까, 나에게 가장 꼭-맞게</h3>';
$hiddentext .= '<p>나만의 라이프스타일이 반영된 공간으로 꾸미고 싶다면!홈리에종의 전문 디자이너와 함께 가구부터 패브릭까지 나만의 라이프스타일이 반영된 집을 함께 꾸며보세요!</p>';
$hiddentext .= '<h3>혜택 3 홈리에종의 1:1 상담 케어까지!</h3>';
$hiddentext .= '<p>날짜와 시간은 어떻게 조정해야할지 모르겠다면!홈리에종의 전담 매니저를 통해 1:1 상담은 물론!커스터 마이징으로 내 소중한 원룸의 완성도를 높여줍니다!</p>';

//html start
if($_GET['qqq'] === 'o'){
  $headhtml .= $htmlhtml->htmlstart($titleinfo, 'event');
} else {
  $headhtml .= $htmlhtml->htmlstart($titleinfo2, 'event');
}

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;

//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- 1 -->
<div class="defalutbox box1">
  <div class="absol back box1gray"></div>
  <img class="absol box1shadow" src="./list_image/event/promotion200110/shadow1.png">
  <div class="absol box1contents">
    <img class="absol box1woimage" src="./list_image/event/promotion200110/main<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.jpg">
    <img class="absol box1wo30" src="./list_svg/event/promotion200110/samship.svg">
    <img class="absol box1wotitle" src="./list_svg/event/promotion200110/demaintitle<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.svg">
  </div>
</div>

<!-- 2 -->
<div class="defalutbox">
  <div class="absol box2hwasal1"></div>
  <img class="absol box2hwasal2" src="./list_svg/event/promotion200110/hwasal.svg">
  <div class="blockrela box2contents">
    <img class="blockrela box2wo1" src="./list_svg/event/promotion200110/desubtitle<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.svg">
    <img class="blockrela box2wo2" src="./list_svg/event/promotion200110/leftea/leftea10.svg">
    <img class="blockrela box2wo3" src="./list_svg/event/promotion200110/dedescription<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.svg">
  </div>
</div>

<!-- 3 -->
<div class="defalutbox">
  <div class="absol back box3green"></div>
  <div class="blockrela box3totalcon">
    <?php echo $htmlindex->box3danfunc(true); ?>
  </div>
</div>

<!-- 4 -->
<div class="defalutbox box4">
  <img class="blockrela box4word1" src="./list_svg/event/promotion200110/saletitle.svg">
  <img class="blockrela box4word2" src="./list_svg/event/promotion200110/sale<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.svg">
  <a href="./consulting.php?promotion=yes">
    <div class="blockrela box4button">
      <img class="absol box4buttonword" src="./list_svg/event/promotion200110/salebutton.svg">
    </div>
  </a>
</div>

<!-- 5 -->
<div class="box5">
  <img class="box5terms" src="./list_svg/event/promotion200110/determs1.svg">
</div>

<!-- margin -->
<div class="mainmargin0"></div>

<!-- copyright -->
<div class="mainback2 maba3">
  <img class="main2s5 main2s5sub1" src="./list_svg/main/copybutton.svg">
  <img class="main2s5 main2s5sub2" src="./list_svg/main/copyright.svg">
  <a href="./consulting.php"><div class="copybut copybut1"></div></a>
  <a href="http://hansungidschool.com/ver02/course/course2.asp"><div class="copybut copybut2"></div></a>
  <a href="https://forms.gle/e6w7KtmNBHAgXGjw8"><div class="copybut copybut3"></div></a>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<!-- won -->
<div class="moblockrela mowonmain">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 422.4366455" style="enable-background:new 0 0 600 422.4366455;" xml:space="preserve">
  	<defs><path id="SVGID_1_" d="M0,0v274.588562c60.7810669,88.5579834,171.8562012,147.8480835,298.8155518,147.8480835 c128.6265869,0,240.949585-60.8569946,301.1844482-151.3515625V0H0z"/></defs>
  	<clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_"  style="overflow:visible;"/></clipPath>
  	<g style="clip-path:url(#SVGID_2_);"><image style="overflow:visible;" width="3508" height="2480" xlink:href="./list_image/portpa56/mobile/mot1a56.jpg"  transform="matrix(0.1710376 0 0 0.1710376 0 -1.7366726)"></image></g>
  </svg>
</div>

<!-- 30% -->
<img class="moblockrela mocenter mosamship" src="./list_svg/event/promotion200110/mobile/mosamship.svg">

<!-- title/description -->
<div class="moblockrela">
  <div class="absol motibar motibarleft"></div>
  <div class="absol motibar motibarright"></div>
  <img class="moblockrela motitle" src="./list_svg/event/promotion200110/mobile/motitle<?php echo (($_GET['qqq']=='o')?'1':'2'); ?>.svg">
</div>
<img class="moblockrela mocenter modescrip" src="./list_svg/event/promotion200110/mobile/modescription.svg">

<!-- green -->
<div class="moblockrela mogreen">
  <?php echo $htmlindex->box3danfunc(false); ?>
</div>

<!-- sale/button -->
<img class="moblockrela mocenter mosale" src="./list_svg/event/promotion200110/mobile/mosale.svg">
<a href="./consulting.php?promotion=yes"><div class="moblockrela mocenter mobutton">
  <img class="absol box4buttonword" src="./list_svg/event/promotion200110/salebutton.svg">
</div></a>

<!-- terms -->
<div class="moblockrela mocenter moterms">
  <img src="./list_svg/event/promotion200110/mobile/moterms2.svg">
</div>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('event');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
