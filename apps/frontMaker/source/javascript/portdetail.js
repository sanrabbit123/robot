const PortdetailJs = function () {
  this.mother = new GeneralJs();
}

PortdetailJs.prototype.standard = 0;

PortdetailJs.prototype.slide_arr = function (m) {
  var valueArr = [ "-221px", "-82px", "57px", "196px", "335px", "474px", "613px", "752px", "891px" ];
  var keyArr = [
    [ 6, 7, 8, 9, 1, 2, 3, 4, 5 ],
    [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
    [ 8, 9, 1, 2, 3, 4, 5, 6, 7 ],
    [ 9, 1, 2, 3, 4, 5, 6, 7, 8 ],
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 2, 3, 4, 5, 6, 7, 8, 9, 1 ],
    [ 3, 4, 5, 6, 7, 8, 9, 1, 2 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 5, 6, 7, 8, 9, 1, 2, 3, 4 ],
  ];
  for (var i = 0; i < 9; i++) {
    document.querySelector("#pordthumb" + String(keyArr[m][i])).style.left = valueArr[i];
  }
  var slidethumbs = document.querySelectorAll(".slidethumb");
  for (i = 0; i < slidethumbs.length; i++) {
    slidethumbs[i].style.transform = "translateX(0px)";
  }
  this.standard = Number(m);
}

PortdetailJs.prototype.slide_fade = function () {
  var valueArr = [
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 1, 0, 1, 1, 0, 0, 0, 0, 0 ],
    [ 1, 0, 0, 1, 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 1, 1, 1, 0, 0, 0 ],
    [ 1, 0, 0, 0, 1, 1, 1, 0, 0 ],
    [ 1, 0, 0, 0, 0, 1, 1, 1, 0 ],
    [ 1, 0, 0, 0, 0, 0, 0, 1, 1 ],
  ]
  for (var z = 0; z < 9; z++) {
    if (this.standard === z) {
      for (var i = 0; i < 9; i++) {
        document.querySelector("#pordpicture" + String(i+1)).style.opacity = String(valueArr[z][i]);
      }
    }
  }
}

PortdetailJs.prototype.position_func = function (m) {
  var instance = this;
  var slidethumbs = document.querySelectorAll(".slidethumb");
  var position_arr = [ "-139px", "-278px", "139px", "278px" ];

  if (m === 1) { this.transfunc("r"); }
  else if (m === 3) { this.transfunc("l"); }
  for (var i = 0; i < slidethumbs.length; i++) { slidethumbs[i].style.transform = "translateX(" + position_arr[m] + ")"; }
  setTimeout(function(){
    for (var i = 0; i < slidethumbs.length; i++) { slidethumbs[i].style.transitionDuration = "0s"; }
  },50);

  setTimeout(function(){
    if (m === 0) {
      if (instance.standard < 8) { instance.slide_arr(instance.standard + 1); }
      else { instance.slide_arr(0); }
    } else if (m === 1) {
      if (instance.standard < 7) { instance.slide_arr(instance.standard + 2); }
      else if (instance.standard === 7) { instance.slide_arr(0); }
      else if (instance.standard === 8) { instance.slide_arr(1); }
    } else if (m === 2) {
      if (instance.standard > 0 && instance.standard < 9) { instance.slide_arr(instance.standard - 1); }
      else { instance.slide_arr(8); }
    } else if (m === 3) {
      if (instance.standard > 1) { instance.slide_arr(instance.standard - 2); }
      else if (instance.standard === 1) { instance.slide_arr(8); }
      else if (instance.standard === 0) { instance.slide_arr(7); }
    }
    instance.slide_fade();
  },210);

  setTimeout(function(){
    for (var i = 0; i < slidethumbs.length; i++) { slidethumbs[i].style.transitionDuration = "0.2s"; }
  },260);

}

PortdetailJs.prototype.transfunc = function (m) {
  var slidethumbs = document.querySelectorAll(".slidethumb");
  var boo = {
    r: [ "-221px", "1030px" ],
    l: [ "891px", "-360px" ],
  }
  function left(t) {
    for (var i = 0; i < 9; i++) {
      if (slidethumbs[i].style.left === boo[t][0]) { slidethumbs[i].style.left = boo[t][1]; }
    }
  }
  if(m === 'r'){ left('r'); }
  else { left('l'); }
}

PortdetailJs.prototype.slidepause = true;

PortdetailJs.prototype.slibutton = function () {
  var instance = this;
  var buttons = document.querySelectorAll(".slibutton");
  function mouseover_event(e) {
    instance.slidepause = false;
  }
  function mouseout_event(e) {
    instance.slidepause = true;
  }
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", mouseover_event);
    buttons[i].addEventListener("mouseout", mouseout_event);
  }
}

PortdetailJs.prototype.slilaunching = function () {
  var me = this;
  this.slide_arr(0);
  document.getElementById("jari_r1").addEventListener("click", function (e) { me.position_func(0); });
  document.getElementById("jari_r2").addEventListener("click", function (e) { me.position_func(1); });
  document.getElementById("jari_l1").addEventListener("click", function (e) { me.position_func(2); });
  document.getElementById("jari_l2").addEventListener("click", function (e) { me.position_func(3); });
  this.slibutton();
  setInterval(function(){
    if (me.slidepause) {
      me.position_func(0);
      me.slide_fade();
    }
  },3000);
}

PortdetailJs.prototype.launching = async function () {
  this.slilaunching();
}
