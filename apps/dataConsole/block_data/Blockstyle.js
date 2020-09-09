const Blockstyle = function (d, mongoboo = "mysql") {
  this.data = d;
  if (mongoboo !== "mongo") {
    this.body = require(`./body/${d.dbtitle}_body.js`)(d);
  }
  this.rows = [];
}

//cssmaker
Blockstyle.prototype.cssmaker = function (totalwidth) {
  let _ = { width_css: ``, totalwidth: 0 };

  for (let i of this.data.colinit_arr) { _.width_css += `.${i}{display:none;}`; }
  for (let i of this.data.colleft_arr) { _.width_css += `.${i},.${i}_back{width:${String(this.data.colleft[i])}px}`;_.totalwidth += this.data.colleft[i]; }
  _.totalwidth += totalwidth;
  _.totalwidth += 30;
  for (let i of this.data.colinit_arr) { _.width_css += `.${i}_init,`; }
  _.width_css = _.width_css.slice(0, -1) + `{display:inline-block;margin:6px;position:absolute;font-size:14px;text-align:center;}`;

  for (let i of this.data.colinit_arr) { _.width_css += `.${i}_init{${this.data.colinit[i]}}`; }

  let h = `body{width:${String(_.totalwidth)}px;}#totalcontents{width:${String(_.totalwidth)}px;}.columns{width:${String(_.totalwidth)}px;}.data{width:${String(_.totalwidth + 18)}px;}.rowdiv{width:${String(_.totalwidth)}px;}${_.width_css}`;
  for (let i of this.data.colleft_arr) { h += `#${i}_switch:checked ~ #rowmain > #belowid > #belowgreen > #${i}_buto{opacity:0.5}`; }
  for (let i of this.data.colleft_arr) { h += `#${i}_switch:checked ~ #rowmain > #totalcontents > #datadiv > .rowdiv > .${i}{display:none;}`; }
  for (let i of this.data.colleft_arr) { h += `#${i}_switch:checked ~ #rowmain > #totalcontents > .columns > .${i}{display:none;}`; }
  for (let i of this.data.colleft_arr) { h += `#${i}_switch:checked ~ #rowmain > #totalcontents > #datadiv > .rowdiv > .rowdiv_back > .${i}_back{display:none;}`; }
  return h;
}

//html start
Blockstyle.prototype.headhead = function (mege1 = false, mege2 = '') {
  let h = "<!DOCTYPE html>\n";
  h += `<html lang="ko" dir="ltr">\n`;
  h += `<head><meta charset="utf-8"><title>${this.data.dbtitle}</title>`;
  h += `<link href="/font/fonts.css" rel="stylesheet">`;
  if (!mege1) {
    h += `<link href='/plugin/fullcalendar/HLstyle.css' rel='stylesheet' />`;
    h += `<script src='/plugin/fullcalendar/core.js'></script>`;
    h += `<script src='/plugin/fullcalendar/interaction.js'></script><script src='/plugin/fullcalendar/daygrid.js'></script>`;
  }
  h += `<script>const front_data = ${JSON.stringify(this.data)};</script>`;
  h += `<link href="/css/style.css" rel="stylesheet">`;
  if (mege1) { h += `<link href="/css/${mege2}.css" rel="stylesheet">`; }
  if (!mege1) { h += `<style>${(this.cssmaker(this.body.inlinecss[0]) + this.body.inlinecss[1])}</style>`; }
  h += `</head>\n`;
  return h;
}

//navigator
Blockstyle.prototype.navinavi = function (mete2) {
  let instance = this;
  let order_colleft;
  if (mete2 !== "mongo") {
    order_colleft = mete2;
  } else {
    order_colleft = [];
  }
  let navibelow_funcs = [
    //Navi 1 (green)
    function () {
      let h = ``;
      h += `<div class="navitotalgroup">`;
        h += `<div class="navigroup">`;
          h += `<p class="navititle"><b>C</b> 고객</p>`;
          h += `<a href="/first/BC1_conlist"><p class="navipara"${((instance.data.dbtitle === 'BC1_conlist')?' style="color:#59af89;font-weight:700;"':'')}><b>-</b> 1차 응대</p></a>`;
          h += `<a href="/mongo/proposal"><p class="navipara"${((instance.data.dbtitle === 'proposal')?' style="color:#59af89;font-weight:700;"':'')}><b>-</b> 홈스타일링 제안서</p></a>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 홈스타일링 의뢰서</p></a>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 고객 계약서</p></a>`;
        h += `</div>`;
        h += `<div class="navigroup">`;
          h += `<p class="navititle"><b>D</b> 디자이너</p>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 외부 디자이너 DB</p></a>`;
          h += `<a href="/first/BD2_deslist"><p class="navipara"${((instance.data.dbtitle === 'BD2_deslist')?' style="color:#59af89;font-weight:700;"':'')}><b>-</b> 협력 디자이너 카드</p></a>`;
        h += `</div>`;
        h += `<div class="navigroup">`;
          h += `<p class="navititle"><b>S</b> 서비스</p>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 큐레이팅 근거</p></a>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 홈리에종 서비스</p></a>`;
        h += `</div>`;
        h += `<div class="navigroup">`;
          h += `<p class="navititle"><b>P</b> 프로젝트</p>`;
          h += `<a href="/first/BP1_process"><p class="navipara"${((instance.data.dbtitle === 'BP1_process')?' style="color:#59af89;font-weight:700;"':'')}><b>-</b> 프로세스 관리</p></a>`;
          h += `<a href="/first/BP2_calculation"><p class="navipara"${((instance.data.dbtitle === 'BP2_calculation')?' style="color:#59af89;font-weight:700;"':'')}><b>-</b> 정산 관리</p></a>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 이슈 관리</p></a>`;
          h += `<a href="/first/"><p class="navipara"><b>-</b> 시공팀 관리</p></a>`;
        h += `</div>`;
      h += `</div>`;
      // h += `<div class="navitalk">`;
      //   h += `<img src="/list_svg/talkicon.svg" class="navitalkicon">`;
      // h += `</div>`;
      h += `<div class="second_view">`;
        h += `<img src="/list_svg/secondview.svg" class="second_viewicon">`;
      h += `</div>`;
      h += `<div class="return_query">`;
        h += `<img src="/list_svg/return_query.svg" class="return_queryicon">`;
      h += `</div>`;
      h += `<div class="create_row">`;
        h += `<img src="/list_svg/create_row2.svg" class="create_rowicon">`;
      h += `</div>`;
      return h;
    },
    //Navi 2 (yellow)
    function () {
      let h = ``;
      return h;
    },
    //Navi 3 (scroll)
    function () {
      let h = `<div id="naviscroll_box">`;
      for (let i = 0; i < 3; i++) {
        h += `<img class="naviscroll_circle" id="naviscroll_circle${String(i+1)}" src="/list_svg/scrollX.svg">`;
      }
      h += `</div>`;
      return h;
    },
    //Below 1 (green)
    function () {
      let h = ``;
      if (mete2 !== "mongo") { for (let r of order_colleft) { h += `<div class="bletotal" draggable="true" id="${r}_buto"><div class="bleobj">${instance.data.colcol[r]}</div><div class="blegarim" id="${r}_bu"></div></div>`; } }
      return h;
    },
    //Below 2 (yellow)
    function () {
      let h = `<div id="colorling_box">`;
      let color_arr = ['#ffffff','#59af89','#d0e3d6','#f9e3a8','#f5b5a7','#bb9988','#96bed4','#ececec','#d3d2d0','#808080'];
      for (let i = 0; i < 10; i++) {
        h += `<div class="color_palettes_box" id="colorling${String(i)}"><div style="background:${color_arr[i]}" draggable="true" class="color_palettes">${color_arr[i]}</div></div>`
      }
      h += `</div>`;
      return h;
    },
    //Below 3 (scroll)
    function () {
      let h = `<div id="belowscroll_bar"></div>`;
      h += `<div id="belowscroll_button"></div>`;
      return h;
    },
  ];

  function circle(m) {
    let c = {
      navi: [ 'navicircle', '_n' ],
      below: [ 'belowcircle', '_b' ]
    }
    let h = ``;
    h += `<svg class="circle ${c[m][0]}" id="svgcirclegreen${c[m][1]}"><circle cx="6px" cy="6px" r="6px" fill="#59af89" /></svg>`;
    h += `<svg class="circle ${c[m][0]}" id="svgcircleyellow${c[m][1]}"><circle cx="6px" cy="6px" r="6px" fill="#FFBD3D" /></svg>`;
    h += `<svg class="circle ${c[m][0]}" id="svgcirclered${c[m][1]}"><circle cx="6px" cy="6px" r="6px" fill="#FF5F57" /></svg>`;
    return h;
  }

  // 0 : navi, 1 : below
  let navibelow_arr = [
    [ 'navi', 'translateX(0px)', 0, 1, 2 ],
    [ 'below', 'translateY(123px)', 3, 4, 5 ]
  ];

  //main switches
  let h = `<body>\n`;
  for (let i of this.data.colcol_arr) { h += `<input type="checkbox" id="${i}_switch" class="columnobj_switch switch">`; }
  h += `<input type="checkbox" id="coloringback_switch" class="switch">`;
  h += `<input type="checkbox" id="coloring_switch" class="switch">`;
  h += `<input type="checkbox" id="red_button_Y_switch" class="switch">`;
  h += `<input type="checkbox" id="red_button_X_switch" class="switch">`;
  h += `<input type="checkbox" id="create_on_switch" class="switch">`;
  h += `<input type="checkbox" id="card_on_switch" class="switch">`;
  h += `<input type="checkbox" id="grayfocus_card_switch" class="switch">`;
  h += `<input type="checkbox" id="grayfocus_switch" class="switch">\n`;
  h += `<aside id="cardmain"></aside>\n`;
  h += `<main id="rowmain">`;

  // making html
  for (let navi_below of navibelow_arr) {
    h += `<div id="${navi_below[0]}id" class="${navi_below[0]}">`;
    h += circle(navi_below[0]);
    h += `<div class="${navi_below[0]}2" id="${navi_below[0]}green" style="display:block">`;
    h += `<div class="navibelow_back" id="${navi_below[0]}green_back"></div>`;
    h += navibelow_funcs[navi_below[2]]();
    h += `</div>`;
    h += `<div class="${navi_below[0]}2" id="${navi_below[0]}yellow" style="display:none;">`;
    h += `<div class="navibelow_back" id="${navi_below[0]}yellow_back"></div>`;
    h += navibelow_funcs[navi_below[3]]();
    h += `</div>`;
    h += `<div id="${navi_below[0]}scroll">`;
    h += navibelow_funcs[navi_below[4]]();
    h += `</div>`;
    h += `</div>\n`;
  }
  return h;
}

//desktop total div
Blockstyle.prototype.demain = function () {
  let h = ``;
  h += `<div class="searchbar" id="searchbar"><img src="/list_svg/porporpor/search/searbae01.svg" class="searchicon"><input type="text" class="searchinput" name="search" id="searchinputid"></div>\n`;
  h += `<div id="initcolumn" class="initcolumn">`;
  h += `<div id="initcolumn_column_stikcy"><div id="initcolumn_column"></div></div>`;
  h += `<div id="initcolumn_data"></div>`;
  h += `</div>\n`;
  h += `<div id="totalcontents">\n`;
  h += `<div id="columns" class="columns"></div>\n`;
  h += `<div class="data" id="datadiv"></div>\n`;
  h += `</div>`;
  h += `<script src="/js/X.js"></script>`;
  for (let i = 0; i < this.data.plugin.length; i++) { h += `<script src="/js/plugin/${this.data.plugin[i]}.js"></script>`; }
  h += `<script>`;
  h += this.body.inlinejs;
  h += `const funcs = new X(front_data, funcs_arr, funcs_obj);\n`;
  h += `window.addEventListener('DOMContentLoaded', function (e) {\n`;
  h += `  funcs.button_onoff();
  funcs.columns_scroll();
  funcs.columns_drag();
  funcs.key_search();
  funcs.ajaxfunc();
  funcs.columns_moving(".bletotal");
  funcs.query_cancel(true);\n`;
  h += `});\n`
  h += `window.addEventListener('scroll', function (e) { if (window.scrollX >= 0) { funcs.scrollX_moving(); } });\n`;
  h += `window.addEventListener('keydown', function (e) { if (e.key === "Escape" && funcs.data_flow.onoff_c !== 1) { funcs.query_cancel(false); } });\n`;
  h += `window.addEventListener('error', function (e) { alert('에러가 발생하였답니당:)'); });\n`;
  h += `</script>`;
  h += `</main></body>\n</html>`;
  return h;
}

//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV

//html start
Blockstyle.prototype.mongohead = function () {
  let h = "<!DOCTYPE html>\n";
  h += `<html lang="ko" dir="ltr">\n`;
  h += `<head><meta charset="utf-8"><title>${this.data.dbtitle}</title>`;
  h += `<link href="/font/fonts.css" rel="stylesheet">`;
  h += `<link href="/css/style.css" rel="stylesheet">`;
  h += `<style>${this.data.css}</style>`;
  h += `</head>\n`;
  return h;
}

Blockstyle.prototype.mongobody = function () {
  let h = ``;
  h += `<div id="mongo_totalcontents">\n`;
  // h += `<div id="mongo_box"></div>\n`;
  h += `</div>`;
  h += `<script>${this.data.js}</script>`;
  h += `<script>`;
  h += `const funcs = new ${this.data.dbtitle[0].toUpperCase() + this.data.dbtitle.slice(1)}();\n`;
  h += `window.addEventListener('DOMContentLoaded', function (e) {\n`;
  if (Object.keys(this.data.query).length === 0) {
    h += `  funcs.launching();`;
  } else {
    h += `  funcs.launching(${JSON.stringify(this.data.query)});`;
  }
  h += `});\n`
  h += `window.addEventListener('error', function (e) { alert('에러가 발생하였답니다!');
  console.log(e);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/slack");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("message=" + e.error.stack + "&channel=#error_log&query={}"); });\n`;
  h += `</script>`;
  h += `</main></body>\n</html>`;
  return h;
}

//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV
//--------------------------------------------------------------------------------------------------------------- DEV



//second body
Blockstyle.prototype.setrowsdata = function (data) {
  this.rows = data;
}

Blockstyle.prototype.secondbody = function () {
  let h = `<body>`;
  h += `<div id="secondcontents"><div id="second_data"></div></div>`
  h += `<script src="/js/Y.js"></script>`;
  h += `<script>
  const funcs2_rows = ${JSON.stringify(this.rows)};
  const funcs2 = new Y(front_data, funcs2_rows);`;
  h += this.body.second;
  h += `</script>`;
  h += `</body>\n</html>`;
  return h;
}



module.exports = Blockstyle;
