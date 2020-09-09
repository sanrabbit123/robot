window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-97880990-1');

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document, 'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '814052605684956');
fbq('track', 'PageView');

const local_funcs = new /<%name%>/Js();

document.body.style.height = "105vh";
local_funcs.mother.loaderMake();
local_funcs.mother.navigatorMake();

document.addEventListener("DOMContentLoaded", async function (e) {
  try {
    local_funcs.mother.fadeIn();
    local_funcs.mother.rightClick();
    await local_funcs.launching();
    local_funcs.mother.specialBan();
    local_funcs.mother.footerMake('/<%name%>/');
    local_funcs.mother.homeliaisonTalk(local_funcs);
    document.body.style.height = "";
  } catch (e) {
    window.location.href = "https://home-liaison.com/";
  }
});

document.addEventListener("error", function (e) {
  window.location.href = "https://home-liaison.com/";
});
