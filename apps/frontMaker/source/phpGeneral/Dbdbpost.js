module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Jandi.php';
require_once __DIR__.'/Loopstyle.php';

$instance = new Loopstyle();
$jandi = new Jandi("https://wh.jandi.com/connect-api/webhook/20614472/1c7efd1bd02b1e237092e1b8a694e844");
$jandiarray = array();

$qquery = $instance->escape($_POST['qquery']);

$nullset = ['g00','2','1'];
$info = $instance->mysqlGet_nullSet($qquery, $nullset, 3, false, 0);
if ($info === "error") {
  $ipaddress = '';
  if ($_SERVER['HTTP_CLIENT_IP']) {
    $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
  } else if($_SERVER['HTTP_X_FORWARDED_FOR']) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else if($_SERVER['HTTP_X_FORWARDED']) {
    $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
  } else if($_SERVER['HTTP_FORWARDED_FOR']) {
    $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
  } else if($_SERVER['HTTP_FORWARDED']) {
    $ipaddress = $_SERVER['HTTP_FORWARDED'];
  } else if($_SERVER['REMOTE_ADDR']) {
    $ipaddress = $_SERVER['REMOTE_ADDR'];
  } else {
    $ipaddress = '알 수 없음';
  }
  $who = $_SERVER['HTTP_USER_AGENT']." / Query : ".$qquery." / IP : ".$ipaddress;
  echo "Exception occur";
  $jandi->send("디비에 문제 생김".$who, $jandiarray, "#FAC11B");
}

if ($_POST["garoarray"] === "main") {
  if ($_POST["switch"] === "deporlist") {
    $garoarray = [ 0 ];
  } else {
    $garoarray = [ 9999 ];
  }
  $mogaroarray = [ 9999 ];
} else if ($_POST["garoarray"] === "revli") {
  $garoarray = [ 0, 9, 19 ];
  $mogaroarray = [ 0, 11 ];
} else {
  $garoarray = [];
  $i = 0;
  while ((5 * $i) < count($info)) {
    array_push($garoarray, ((5 * $i) + 0));
    array_push($garoarray, ((5 * ($i + 1)) + 4));
    $i = $i + 2;
  }
  $mogaroarray = [];
  $i = 0;
  while ((4*$i) < count($info)) {
    array_push($mogaroarray, ((4 * $i) + 4));
    array_push($mogaroarray, ((4 * ($i + 1)) + 3));
    $i = $i + 2;
  }
}

switch ($_POST["switch"]) {
  case 'deporlist':
    echo $instance->porporloop($garoarray, $info);
    break;
  case 'moporlist':
    echo $instance->moporporloop($mogaroarray, $info);
    break;
  case 'derevlist':
    echo $instance->revrevloop($garoarray, $info);
    break;
  case 'morevlist':
    echo $instance->morevrevloop($mogaroarray, $info);
    break;
}
?>`;
}
