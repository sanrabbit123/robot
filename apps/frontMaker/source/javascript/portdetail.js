const PortdetailJs = function () {
  this.mother = new GeneralJs();
}

PortdetailJs.prototype.slideBox = function () {
  const instance = this;
  const { slide } = this.contents;
  const sildeNum = slide.length;
  let slideBox, div_clone;
  let style = {};
  let ea = "px";
  let position;

  slideBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    top: String(0),
    left: String(0),
    width: String(795) + ea,
    height: "100%",
    overflow: "hidden",
  };
  for (let i in style) {
    slideBox.style[i] = style[i];
  }

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    h0 = ".slide {position:absolute;top:0px;left:0px;width:795px;height:562px;background-color:#f7f7f7;transition:all 0.4s ease;}";
    h0 += ".slidethumbnail {position:absolute;top:603px;width:124px;height:124px;background-color:#f7f7f7;transform:translateX(0px);transition:transform 0.2s ease;left:0;}";
    h0 += ".slidebutton {cursor:pointer;position:absolute;top:603px;width:124px;height:124px;opacity:0;}";
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  //opacity slide
  this.slide = [];
  for (let i = 0; i < sildeNum; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("slide");
    style = {
      backgroundImage: ("url('" + this.contents.backgroundImage[i] + "')"),
      backgroundSize: this.contents.backgroundSize[i],
      backgroundPosition: "50% 50%",
      backgroundRepeat: "no-repeat",
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }
    this.slide.push(div_clone);
    slideBox.appendChild(div_clone);
  }

  //thumbnail slide
  this.thumbnail = [];
  for (let i = 0; i < sildeNum; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("slidethumbnail");
    style = {
      backgroundImage: ("url('" + this.contents.backgroundImage[i] + "')"),
      backgroundSize: this.contents.backgroundSize[i],
      backgroundPosition: "50% 50%",
      backgroundRepeat: "no-repeat",
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }
    this.thumbnail.push(div_clone);
    slideBox.appendChild(div_clone);
  }

  //silde buttons
  this.slideButtons = [];
  position = [
    { direction: "left", value: 57, },
    { direction: "left", value: 196, },
    { direction: "left", value: 335, },
    { direction: "right", value: 197, },
    { direction: "right", value: 58, },
  ]
  for (let i = 0; i < 5; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("slidebutton");
    div_clone.style[position.direction] = String(position.value) + ea;
    this.slideButtons.push(div_clone);
    slideBox.appendChild(div_clone);
  }

  return slideBox;
}


PortdetailJs.prototype.designerBox = function () {
  const instance = this;
  let designerBox, div_clone;
  let style = {};
  let ea = "px";
  designerBox = GeneralJs.nodes.div.cloneNode(true);

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    h0 = ".designerBox {position:relative;top:0;margin-left:842px;width:208px;height:303px;background-color:#f7f7f7;border-radius:5px;}";
    h0 += ".slidethumbnail {position:absolute;top:603px;width:124px;height:124px;background-color:#f7f7f7;transform:translateX(0px);transition:transform 0.2s ease;left:0;}";
    h0 += ".slidebutton {cursor:pointer;position:absolute;top:603px;width:124px;height:124px;opacity:0;}";
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  designerBox.classList.add("designerBox");


  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(36) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }


  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    display: "block",
    position: "relative",
    width: String(120) + ea,
    height: String(120) + ea,
    borderRadius: String(60) + ea,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundSize: "auto 100%",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }




  return designerBox;
}


PortdetailJs.prototype.titleBox = function () {
  const instance = this;
  let titleBox, div_clone;
  let style = {};
  let ea = "px";
  titleBox = GeneralJs.nodes.div.cloneNode(true);




  return titleBox;
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

PortdetailJs.prototype.setContents = async function () {
  const instance = this;
  try {
    const getData = GeneralJs.returnGet();
    const contentsRAW = await GeneralJs.ajaxPromise(("id=" + getData.qqq), "/engine/ContentsDetail.php");
    let filteredContents, contents;

    contents = JSON.parse(contentsRAW);
    filteredContents = { ...contents };
    const { porlid, slide, photoauto } = contents;

    /*
    apartname: "호반 써밋플레이스 39py 홈스타일링"
    description: ""
    desid: "de044"
    photoauto: (24) ["auto 100%", "auto 100%", "auto 100%", "100% auto", "100% auto", "auto 100%", "auto 100%", "100% auto", "100% auto", "auto 100%", "auto 100%", "auto 100%", "auto 100%", "100% auto", "100% auto", "auto 100%", "auto 100%", "100% auto", "auto 100%", "auto 100%", "100% auto", "100% auto", "auto 100%", "auto 100%"]
    photodae: (2) ["9", "3"]
    photonum: 23
    photosg: (23) ["s", "s", "g", "g", "s", "s", "g", "g", "s", "s", "s", "s", "g", "g", "s", "s", "g", "s", "s", "g", "g", "s", "s"]
    porlid: "a74"
    revid: "re999"
    slide: (9) ["1", "2", "3", "4", "7", "8", "13", "14", "17"]
    wordingKey: (6) [2, 7, 13, 16, 20, 23]
    wordingtitle: (6) ["entrance", "livingroom", "diningroom", "bedroom", "kidsroom", "kidsroom"]
    */

    filteredContents.backgroundImage = [];
    filteredContents.backgroundSize = [];
    for (let i = 0; i < slide.length; i++) {
      filteredContents.backgroundImage.push("/list_image/portp" + porlid + "/t" + slide[i] + porlid + ".jpg");
      filteredContents.backgroundSize.push(photoauto[Number(slide[i])]);
    }

    this.contents = filteredContents;
  } catch (e) {
    console.log(e);
  }
}

PortdetailJs.prototype.launching = async function () {
  const instance = this;
  try {
    await this.setContents();

    console.log(this.contents);


    this.slilaunching();

  } catch (e) {
    console.log(e);
  }
}
