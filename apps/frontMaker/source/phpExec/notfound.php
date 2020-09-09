<?php
require_once __DIR__.'/engine/Blockstyle.php';
require_once __DIR__.'/engine/functions/notfound_f.php';
require_once __DIR__.'/engine/Sessions.php';
$sessionHandler = new SessionExec();
$htmlhtml = new Blockstyle();
$headhtml = '';
$htmlindex = new Notfoundf();
$hiddentext = "<h1>404 | 홈리에종</h1><h2>잘못된 주소를 입력하셨습니다.</h2>";
$titleinfo = ['404 | 홈리에종','잘못된 주소를 입력하셨습니다.','/notfound.php','/list_image/portpp18/t19p18.jpg'];

//html start
$headhtml .= $htmlhtml->htmlstart($titleinfo, 'notfound');

//navigator
$headhtml .= $htmlhtml->navinavi().$htmlhtml->hiddentext($hiddentext);

//desktop start
$headhtml .= $htmlhtml->totalstart();

echo $headhtml;
//DESKTOP--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<div class="termterm">
  <h1 class="termsh1">저런..! 잘못 들어오셨어요!</h1>
  <div class="greenbar a1"></div>
  <h3 class="termsh3">존재하지 않는 페이지</h3><br>
  <p class="termparagraph">
	서버에 없는 주소로 들어 오셨습니다. <a href="https://home-liaison.com">홈페이지</a> 또는 이전 페이지로 돌아가주시면 감사하겠습니다.
  </p>
</div>

<?php
//desktop footer
echo $htmlhtml->footfoot();
//MOBILE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
?>

<div class="termterm">
  <h1 class="termsh1">저런..! 잘못 들어오셨어요!</h1>
  <div class="greenbar a1"></div>
  <h3 class="termsh3">존재하지 않는 페이지</h3><br>
  <p class="termparagraph">
	서버에 없는 주소로 들어 오셨습니다. <a href="https://home-liaison.com">홈페이지</a> 또는 이전 페이지로 돌아가주시면 감사하겠습니다.
  </p>
</div>

<?php
//mobile footer
echo $htmlhtml->mofootfoot('notfound');
echo $htmlhtml->htmlend();
$sessionHandler->closeSession();
?>
