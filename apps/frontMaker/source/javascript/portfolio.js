const PortfolioJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
}

PortfolioJs.prototype.truefalse = true;

PortfolioJs.prototype.loopAjaxGet = function (from, to) {
  var me = this;
  return function () {
    GeneralJs.ajax(GeneralJs.formtoAjax(from), "./engine/Dbdbpost.php", function (data) {
      var toDom = document.getElementById(to);
      while (toDom.firstChild) { toDom.removeChild(toDom.lastChild); }
      toDom.insertAdjacentHTML("beforeend", data);
    });
  };
}

PortfolioJs.prototype.appendporlist = function () {
  var me = this;
  function appendEvent(id) {
    var arraym = [];
    if (id === 'de') { arraym = [3200,'qqueryid','porporform','porporid']; }
    else { arraym = [2000,'moqqueryid','moporporform','moporporid']; }
    return function (e) {
      var scroll = Math.abs(document.querySelector("body").getBoundingClientRect().top + document.body.scrollTop);
      if (scroll >= arraym[0] && me.truefalse) {
        document.getElementById(arraym[1]).value = "SELECT porlid,photodae_s,photodae_d FROM porlist ORDER BY key9 DESC LIMIT 20,300;";
        GeneralJs.ajax(GeneralJs.formtoAjax(arraym[2]), "./engine/Dbdbpost.php", function (data) {
          document.getElementById(arraym[3]).insertAdjacentHTML("beforeend", data);
        });
        me.truefalse = false;
      }
    };
  }
  if(window.innerWidth >= 900){ window.addEventListener("scroll", appendEvent("de")); }
  else if (window.innerWidth < 900) { window.addEventListener("scroll", appendEvent("mo")); }
}

PortfolioJs.prototype.searchdelay = function (callback, ms) {
  var timer = 0;
  return function (e) {
    if (timer !== 0) { clearTimeout(timer); }
    timer = setTimeout(callback, ms);
  };
}

PortfolioJs.prototype.searchcallback = function (id) {
  var me = this;
  var arrayid = [];
  if (id === 'de') { arrayid = ['polisearch','polisearch2','polisearch3','qqueryid','porporform','porporid']; }
  else { arrayid = ['mopolisearch','mopolisearch2','mopolisearch3','moqqueryid','moporporform','moporporid']; }
  return function () {
    me.truefalse = false;
    var currentVal = document.getElementById(arrayid[0]).value;
    var vararray = {
      search1 : currentVal.replace(/[\*\!\?\~\^\:\/\@\%\&\+\<\>\;\#\$\[\]\\\|\-\(\)\`\'\"\{\}]/g, ''),
      search2 : document.getElementById(arrayid[1]).value,
      search3 : document.getElementById(arrayid[2]).value
    };
    if (vararray.search1 === '') { vararray.search1 = '.'; }
    document.getElementById(arrayid[3]).value = "SELECT porlid,photodae_s,photodae_d FROM porlist WHERE (designer regexp '"+vararray.search1+"' OR region regexp '"+vararray.search1+"' OR tag regexp '"+vararray.search1+"' OR title regexp '"+vararray.search1+"' OR subtitle regexp '"+vararray.search1+"' OR apart regexp '"+vararray.search1+"' OR pyeong regexp '"+vararray.search1+"') AND (method regexp '"+vararray.search3+"' OR tag regexp '"+vararray.search3+"') ORDER BY "+vararray.search2+" DESC;";
    (me.loopAjaxGet(arrayid[4], arrayid[5]))();
  };
}

PortfolioJs.prototype.searchbaron = function (id) {
  var me = this;
  var arraym = [];
  if (id === 'de') {
    arraym = ['porlidelidediv','porlidelideimg','-190px'];
  } else {
    arraym = ['moporlidelidediv','moporlidelideimg','-35vw'];
  }
  return function () {
    if (document.getElementById(arraym[0]).style.opacity === "0") {
      document.getElementById(arraym[0]).style.opacity = "1";
      document.getElementById(arraym[1]).style.top = "0";
    } else {
      document.getElementById(arraym[0]).style.opacity = "0";
      document.getElementById(arraym[1]).style.top = arraym[2];
    }
  };
}

PortfolioJs.prototype.ordertoggle = function (id, dm) {
  var me = this;
  var arraym = [];
  switch (id) {
    case 1:
      arraym = [ '0', 'key9' ];
      break;
    case 2:
      arraym = [ '1', 'key8' ];
      break;
  }
  return function () {
    me.truefalse = false;
    document.getElementById((dm ? '' : 'mo') + 'poliorderedsvg2').style.opacity = arraym[0];
    document.getElementById((dm ? '' : 'mo') + 'polisearch2').value = arraym[1];
    setTimeout(me.searchcallback(dm ? 'de' : 'mo'), 300);
  };
}

PortfolioJs.prototype.methodselect = function (id, dm) {
  var me = this;
  var arraym = [];
  switch (id) {
    case 1:
      arraym = ['0','0','0','0','0','all'];
      break;
    case 2:
      arraym = ['1','0','0','0','0','토탈스타일링'];
      break;
    case 3:
      arraym = ['0','1','0','0','0','홈퍼니싱'];
      break;
    case 4:
      arraym = ['0','0','1','0','0','제작가구'];
      break;
    case 5:
      arraym = ['0','0','0','1','0','아이방'];
      break;
    case 6:
      arraym = ['0','0','0','0','1','원룸'];
      break;
  }
  return function () {
    me.truefalse = false;
    document.getElementById((dm ? '' : 'mo') + 'politypesvg2').style.opacity = arraym[0];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg3').style.opacity = arraym[1];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg4').style.opacity = arraym[2];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg5').style.opacity = arraym[3];
    document.getElementById((dm ? '' : 'mo') + 'politypesvg6').style.opacity = arraym[4];
    document.getElementById((dm ? '' : 'mo') + 'polisearch3').value = arraym[5];
    setTimeout(me.searchcallback(dm ? 'de' : 'mo'), 300);
  };
}

//------------------------------------------------------------------------------------------new

/*

PortfolioJs.prototype.initialDom = function () {
  const instance = this;
  const grand = {
    desktop: document.getElementById("totalcontents"),
    mobile: document.getElementById("mototalcontents"),
  };
  let list = {
    desktop: [
      {
        id: "slide",
        source: [ instance.map.main.slide.src.images.desktop, instance.map.main.slide.src.words.desktop ],
        callback: function (id, source) {

        }
      },
    ],
    mobile: [
    ],
  };
  let boo = Object.keys(list);
  let temp, temp_callback, temp_id, temp_source;
  for (let i = 0; i < boo.length; i++) {
    for (let j = 0; j < list[boo[i]].length; j++) {
      temp_callback = list[boo[i]][j]["callback"];
      temp_id = list[boo[i]][j]["id"];
      temp_source = list[boo[i]][j]["source"];
      temp = temp_callback(temp_id, temp_source);
      grand[boo[i]].appendChild(temp);
    }
  }
}

*/

PortfolioJs.prototype.launching = async function () {
  const instance = this;
  try {
    //this.initialDom();

    /<%cssOut%>/ %/max-width:900px/%`

    #bodymain0817 {
      position:relative;
      top:0px;
      width:100%;
    }
    #totalcontents {
      display:block;
      position:relative;
      width:100%;
      height:auto;
    }
    #mototalcontents{
      display:none;
    }
    .circles{
      position:absolute;
      bottom:0;
      width:10px;
      height:10px;
      border-radius:6px;
      background-color:#aaaaaa;
      transition:all 0.5s ease;
    }
    .zlevel1{
      z-index:1;
    }

    `%/%/e


  } catch (e) {
    window.location.href = "https://home-liaison.com";
  }
  /*
  var me = this;
  var i = 0, j = 0;
  (this.loopAjaxGet("porporform", "porporid"))();
  (this.loopAjaxGet("moporporform", "moporporid"))();
  this.appendporlist();
  document.getElementById("polisearch").addEventListener("keyup", me.searchdelay(me.searchcallback('de'), 500));
  document.getElementById("polisubmit").addEventListener("click", me.searchdelay(me.searchcallback('de'), 500));
  document.getElementById("mopolisearch").addEventListener("keyup", me.searchdelay(me.searchcallback('mo'), 500));
  document.getElementById("mopolisubmit").addEventListener("click", me.searchdelay(me.searchcallback('mo'), 500));
  var politypebu = document.querySelectorAll(".politypebu");
  for (i = 0; i < politypebu.length; i++) {
    politypebu[i].addEventListener("click", me.searchbaron('de'));
  }
  var mopolitypebu = document.querySelectorAll(".mopolitypebu");
  for (j = 0; j < mopolitypebu.length; j++) {
    mopolitypebu[j].addEventListener("click", me.searchbaron('mo'));
  }
  document.getElementById("poliordered1div").addEventListener("click", me.ordertoggle(1, true));
  document.getElementById("poliordered2div").addEventListener("click", me.ordertoggle(2, true));
  document.getElementById("mopoliordered1div").addEventListener("click", me.ordertoggle(1, false));
  document.getElementById("mopoliordered2div").addEventListener("click", me.ordertoggle(2, false));
  for (i = 1; i < 7; i++) {
    document.querySelector(".plt" + String(i)).addEventListener("click", me.methodselect(i, true));
    document.querySelector(".moplt" + String(i)).addEventListener("click", me.methodselect(i, false));
  }
  */
}
