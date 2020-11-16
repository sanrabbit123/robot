const PortdetailJs = function () {
  this.mother = new GeneralJs();
  this.map = /<%map%>/;
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
  let designerBox, div_clone, div_clone2, img_clone;
  let style = {};
  let inputStyle = {
    display: "inline",
    fontFamily: "'Roboto',sans-serif",
    fontSize: String(12) + ea,
    color: "#303030",
    letterSpacing: String(-0.5) + ea,
  };
  let ea = "px";
  designerBox = GeneralJs.nodes.div.cloneNode(true);

  //css
  /<%cssOut%>/ {
    let h0 = '', h1 = '', h2 = '', h3 = '';
    h0 = ".designerBox {position:relative;top:0;margin-left:842px;padding-top:36px;width:208px;height:303px;background-color:#f7f7f7;border-radius:5px;}";
    h0 += ".designerMethods {display:block;position:relative;width:80px;height:12px;margin-right:auto;margin-left:auto;}";
    h0 += ".designerButton{position:absolute;width:100%;height:100%;top:0;background-color:#fff;opacity:0;transition:all 0.3s ease;cursor:pointer;}";
    h0 += ".designerButton:hover{opacity:0.3;}";
    return { mediaAll: h0, media1400: h1, media1050: h2, media900: h3 };
  } %/%/e

  designerBox.classList.add("designerBox");

  //circle photo
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
    backgroundImage: ("url('" + this.contents.designer.photo + "')"),
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  designerBox.appendChild(div_clone);

  //designer name
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = this.contents.designer.name;
  style = {
    display: "block",
    position: "relative",
    width: String(50) + ea,
    height: String(18) + ea,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: String(13) + ea,
    paddingLeft: ((this.contents.designer.desid === "de000") ? String(16) : String(0) + ea),
  };
  for (let i in style) {
    img_clone.style[i] = style[i];
  }
  designerBox.appendChild(img_clone);

  //designer methods
  for (let i = 0; i < this.contents.designer.methods.length; i++) {
    img_clone = GeneralJs.nodes.img.cloneNode(true);
    img_clone.src = this.contents.designer.methods[i];
    img_clone.classList.add("designerMethods");
    img_clone.style.marginTop = (Boolean(i) ? String(6) : String(15)) + ea;
    designerBox.appendChild(img_clone);
  }

  //designer career
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    height: String(15) + ea,
    marginTop: String(17) + ea,
    left: String(0) + ea,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  //career title
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = this.contents.designer.career.title;
  style = {
    display: "inline-block",
    position: "relative",
    top: String(1) + ea,
    height: String(11) + ea,
  };
  for (let i in style) {
    img_clone.style[i] = style[i];
  }
  div_clone.appendChild(img_clone);

  //career bar
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = this.contents.designer.career.bar;
  for (let i in style) {
    img_clone.style[i] = style[i];
  }
  div_clone.appendChild(img_clone);

  //career year
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.textContent = this.contents.designer.career.values.year;
  for (let i in inputStyle) {
    div_clone2.style[i] = inputStyle[i];
  }
  div_clone.appendChild(div_clone2);

  //career year wording
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = this.contents.designer.career.year;
  for (let i in style) {
    img_clone.style[i] = style[i];
  }
  img_clone.style.paddingLeft = String(1.5) + ea;
  div_clone.appendChild(img_clone);

  //career month
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.textContent = this.contents.designer.career.values.month;
  for (let i in inputStyle) {
    div_clone2.style[i] = inputStyle[i];
  }
  div_clone.appendChild(div_clone2);

  //career month wording
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = this.contents.designer.career.month;
  for (let i in style) {
    img_clone.style[i] = style[i];
  }
  img_clone.style.paddingLeft = String(1.5) + ea;
  div_clone.appendChild(img_clone);

  designerBox.appendChild(div_clone);

  //button
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("designerButton");
  GeneralJs.addHrefEvent(div_clone, ("/desdetail.php?qqq" + this.contents.designer.desid));
  designerBox.appendChild(div_clone);

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
    const sourceLink = GeneralJs.universalLink + "/designer";
    const today = new Date();

    let currentDate, pastDate;
    let filteredContents, contents;

    contents = JSON.parse(contentsRAW);
    filteredContents = { ...contents };
    const { porlid, slide, photoauto } = contents;

    filteredContents.designer.photo = "/list_image/portp" + filteredContents.designer.daepyo_a + "/mobile/mo" + filteredContents.designer.daepyo_t + filteredContents.designer.daepyo_a + ".jpg";

    filteredContents.designer.name = sourceLink + "/name/" + filteredContents.designer.desid + ".svg";
    filteredContents.designer.methods = [];
    filteredContents.designer.methods.push(sourceLink + "/method/" + filteredContents.designer.method1 + ".svg");
    filteredContents.designer.methods.push(sourceLink + "/method/" + filteredContents.designer.method2 + ".svg");

    currentDate = (today.getFullYear() * 12) + (today.getMonth() + 1);
    pastDate = (Number(filteredContents.designer.career.year) * 12) + (Number(filteredContents.designer.career.month));

    filteredContents.designer.career.title = sourceLink + "/career/title.svg";
    filteredContents.designer.career.bar = sourceLink + "/career/bar.svg";
    filteredContents.designer.career.values = {};
    filteredContents.designer.career.values.year = Math.floor((currentDate - pastDate) / 12);
    filteredContents.designer.career.values.month = (currentDate - pastDate) % 12;
    filteredContents.designer.career.year = sourceLink + "/career/year.svg";
    filteredContents.designer.career.month = sourceLink + "/career/month.svg";

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
