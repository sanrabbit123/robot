const X = function (data, arr, obj) {
  this.data = data;
  this.callbacks = arr;
  this.chaining = obj;
}

X.queryFilter = function (str) {
  return str.replace(/ &/g, ',').replace(/&/g, ',').replace(/=/g, '');
}

X.nodes = {
  div: document.createElement("DIV"),
  img: document.createElement("IMG"),
  input: document.createElement("INPUT"),
  textarea: document.createElement("TEXTAREA"),
  a: document.createElement('A'),
}

X.ajax = function (url, data) {
  let ampArray = [ ...data.matchAll(/&/g) ];
  let equArray = [ ...data.matchAll(/=/g) ];
  let totalArray = ampArray.concat(equArray);
  totalArray.sort(function (a, b) {
    return a.index - b.index;
  });
  let problems = [];
  for (let z = 0; z < totalArray.length - 1; z++) {
    if (totalArray[z][0] === '=' && totalArray[z+1][0] !== '&') {
      problems.push(totalArray[z+1]);
    } else if (totalArray[z][0] === '&' && totalArray[z+1][0] !== '=') {
      problems.push(totalArray[z]);
    }
  }
  if (totalArray[totalArray.length - 1][0] !== '=') {
    problems.push(totalArray[totalArray.length - 1]);
  }
  for (let i = 0; i < problems.length; i++) {
    if (problems[i][0] === '=') {
      data = data.slice(0, problems[i].index) + '_' + data.slice(problems[i].index + 1);
    } else if (problems[i][0] === '&') {
      data = data.slice(0, problems[i].index) + ',' + data.slice(problems[i].index + 1);
    }
  }
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
      if (xhr.readyState !== 4) { return }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  });
}

//-------------------------------------------------------- About property & exceptions

X.prototype.toggle = { red_button: 1, onetimefuncs: 0, calcperiod: 0 };

X.prototype.data_flow = { past_data: [], undo_data: [], new_data: [], target_col: [], target_id: [], target_where: [], count: 0, onoff_c: 0 };

X.prototype.exceptions = function () {
  let instance = this;
  let arr = Object.keys(instance.data.period);
  return {
    exceptionlist: arr,
    calcperiod: function (m) {
      let h = document.createDocumentFragment();
      let do1 = document.createElement('STRONG');
      let do2 = do1.cloneNode(true);
      do2.className = "hiddenp";
      let arr = m.split(',');
      do1.textContent = arr[0];
      do2.textContent = ',' + arr[1] + ',' + arr[2];
      h.appendChild(do1);
      h.appendChild(do2);
      return h;
    }
  };
}

//-------------------------------------------------------- About scroll

X.prototype.columns_scroll = async function () {
  let instance = this;
  function moving(m1, m2) {
    let obj = document.getElementById(m1.replace(/_bu$/g, '') + '_col');
    let l = Math.abs(parseInt(document.querySelector('html').getBoundingClientRect().left)) + obj.getBoundingClientRect().left - (parseInt(document.querySelector('html').getBoundingClientRect().width * m2)/100);
    return l;
  }
  let setting_ajax = 'title=' + instance.data.dbtitle + '&method=onoff';
  let data = await X.ajax("/session_on", setting_ajax);
  let setting = JSON.parse(data);
  for (let i in setting) { document.getElementById(i + '_switch').checked = ((setting[i] === 1) ? false : true ); }

  async function bletotal_arr_event_click(e) {
    if (e.cancelable) { e.preventDefault(); }
    let data;
    let cla = this.id.replace(/_bu$/g, '');
    let checkbox = document.getElementById(cla + '_switch');
    let session_obj = 'title=' + instance.data.dbtitle + '&method=onoff';
    if (checkbox.checked) {
      checkbox.checked = false;
      setting[cla] = 1;
      session_obj += '&obj=' + JSON.stringify(setting);
      data = await X.ajax("/session_update", session_obj);
      console.log(data);
    } else {
      checkbox.checked = true;
      setting[cla] = 0;
      session_obj += '&obj=' + JSON.stringify(setting);
      data = await X.ajax("/session_update", session_obj);
      console.log(data);
    }
  }
  function bletotal_arr_event_contextmenu(e) {
    e.preventDefault();
    window.scrollTo({left: moving(this.id, 50), behavior:'smooth'});
  }
  let bletotal_arr = document.querySelectorAll('.blegarim');
  for (let node of bletotal_arr) {
    node.addEventListener('contextmenu', bletotal_arr_event_click);
    node.addEventListener('dblclick', bletotal_arr_event_contextmenu);
  }
}

X.prototype.columns_drag = function (mege = true) {
  const total = document.getElementById('totalcontents');
  let total_width = total.getBoundingClientRect().width;
  const mother = document.getElementById('belowscroll');
  const button = document.getElementById('belowscroll_button');
  let div = document.createElement('DIV');
  let isDown = false;
  let end, endX, move, click, div_clone;
  function current_update() {
    let current_width = window.pageXOffset;
    button.style.left = String(((current_width / total_width) * 100) + 2) + "%";
  }
  current_update();

  mother.addEventListener('mousedown', function (e) {
    isDown = true;
    if (!document.querySelector("#belowscroll_back")) {
      div_clone = div.cloneNode(true);
      div_clone.id = "belowscroll_back";
      this.insertBefore(div_clone, this.firstChild);
    }
    button.style.cursor = 'grabbing';
    mother.style.cursor = 'grabbing';
  });
  mother.addEventListener('mousemove', function (e) {
    if (isDown) {
      end = e.screenX - mother.getBoundingClientRect().left;
      endX = Number((end / 880) * 100).toFixed(4);
      move = (total_width * ((endX - 3) / 100));
      if (endX > 2 && endX < 98) {
        button.style.left = String(endX) + "%";
        window.scrollTo({ left: move });
      }
      button.style.cursor = 'grabbing';
      mother.style.cursor = 'grabbing';
    }
  });
  mother.addEventListener('click', function (e) {
    click = e.screenX - mother.getBoundingClientRect().left;
    endX = Number((click / 880) * 100).toFixed(4);
    move = (total_width * ((endX - 3) / 100));
    if (endX > 2 && endX < 98) {
      button.style.left = String(endX) + "%";
      window.scrollTo({left: move});
    }
  });
  mother.addEventListener('mouseup', function (e) {
    isDown = false;
    this.removeChild(this.firstChild);
    button.style.cursor = 'pointer';
    mother.style.cursor = 'pointer';
  });
  mother.addEventListener('mouseover', function (e) {
    mother.style.cssText = 'opacity: 1;transform: translateY(0px);';
    if (isDown) {
      button.style.cursor = 'grabbing';
      mother.style.cursor = 'grabbing';
    }
  });
  mother.addEventListener('mouseout', function (e) {
    mother.style.cssText = 'opacity: 0;transform: translateY(7px);';
    if (isDown) {
      button.style.cursor = 'grabbing';
      mother.style.cursor = 'grabbing';
    }
  });

  let naviscroll = document.getElementById('naviscroll');
  let naviscroll_ele = document.querySelectorAll('.naviscroll_circle');
  let naviscroll_ele_count = naviscroll_ele.length;
  naviscroll.addEventListener('mouseover', function (e) {
    this.style.cssText = 'opacity: 1;';
    for (let i = 0; i < naviscroll_ele_count; i++) {
      naviscroll_ele[i].classList.add('naviscroll_circle' + String(i+1));
    }
  });
  naviscroll.addEventListener('mouseout', function (e) {
    isDown = false;
    this.style.cssText = 'opacity: 0;';
  });
  naviscroll.addEventListener('click', function (e) {
    let mm = window.pageXOffset + 100;
    window.scrollTo({ left: mm, behavior: 'smooth'});
    current_update();
  });
  let setmoving;
  naviscroll.addEventListener('mousedown', function (e) {
    setmoving = setInterval(function () {
      let mm = window.pageXOffset + 300;
      window.scrollTo({ left: mm, behavior: 'smooth'});
    }, 80);
  });
  naviscroll.addEventListener('mouseup', function (e) {
    clearInterval(setmoving);
  });
}

X.prototype.scrollX_moving = function () {
  let target = document.getElementById("initcolumn");
  let scrollX = Math.abs(document.querySelector('html').getBoundingClientRect().left) - ((this.toggle.red_button === 0) ? 150 : 0);
  target.style.cssText = "transform: translateX(" + String(scrollX) + "px)";
}

//-------------------------------------------------------- About columns

X.prototype.columns_moving = function (mege) {
  let instance = this;
  let ddnodes = document.querySelectorAll(mege);

  function dragstart_event(e) {
    e.dataTransfer.setData("sun", this.id);
    this.style.opacity = "0.4";
  }
  function dragend_event(e) { this.style.opacity = ""; }
  function dragenter_event(e) { this.style.opacity = "0.4"; }
  function dragleave_event(e) { this.style.opacity = ""; }
  function dragover_event(e) { e.preventDefault(); }
  async function drop_event(e) {
    e.preventDefault();
    let node_id = e.dataTransfer.getData("sun");
    let div_col, target_col, move_lum, target_lum;

    if (mege === ".bletotal") {
      div_col = node_id.replace(/_buto$/g, '');
      target_col = this.id.replace(/_buto$/g, '');
      move_lum = document.getElementById(div_col + "_col");
      target_lum = document.getElementById(target_col + "_col");
    } else {
      div_col = node_id.replace(/_col$/g, '');
      target_col = e.target.id.replace(/_col$/g, '');
      move_lum = document.getElementById(div_col + "_buto");
      target_lum = document.getElementById(target_col + "_buto");
    }
    let move_node = document.getElementById(node_id);
    let move_rows = document.querySelectorAll(".rowdiv ." + div_col);
    let target_rows = document.querySelectorAll(".rowdiv ." + target_col);
    let move_rows_back = document.querySelectorAll(".rowdiv .rowdiv_back ." + div_col + "_back");
    let target_rows_back = document.querySelectorAll(".rowdiv .rowdiv_back ." + target_col + "_back");

    if (mege === ".bletotal") {
      document.querySelector('#belowgreen').insertBefore(move_node, this);
      document.querySelector('#columns').insertBefore(move_lum, target_lum);
    } else {
      document.querySelector('.columns').insertBefore(move_node, this);
      document.querySelector('#belowgreen').insertBefore(move_lum, target_lum);
    }

    let id_num = '';
    for (let i = 0; i < move_rows.length; i++) {
      id_num = /_[rc][0-9]+/g.exec(move_rows[i].id)[0].slice(2);
      document.getElementById('row' + id_num).insertBefore(move_rows[i], target_rows[i]);
      document.getElementById('rowdiv_back' + id_num).insertBefore(move_rows_back[i], target_rows_back[i]);
    }
    for (let node of ddnodes) { node.style.opacity = ""; }

    let children = document.getElementById('columns').childNodes;
    let sun_seo = [];
    for (let child of children) {
      sun_seo.push(child.id.replace(/_col$/g, ''));
    }
    let sessionupdate = "title=" + instance.data.dbtitle + "&obj=" + JSON.stringify(sun_seo) + "&method=order";
    let ajax_data = await X.ajax('/session_update', sessionupdate);
    console.log(ajax_data);
  }
  for (let node of ddnodes) {
    node.addEventListener("dragstart", dragstart_event);
    node.addEventListener("dragend", dragend_event);
    node.addEventListener("dragenter", dragenter_event);
    node.addEventListener("dragleave", dragleave_event);
    node.addEventListener("dragover", dragover_event);
    node.addEventListener("drop", drop_event);
  }
}

X.prototype.sortrow = function () {
  let instance = this;
  let total_past = document.querySelectorAll('.rowdiv');
  let total_init_past = document.querySelectorAll('.rowdiv_init');
  let count = total_past.length - 100;
  let empty_past = [];
  let empty_init_past = [];
  for (let i = 0; i < 100; i++) {
    empty_past.push(total_past[count + i].cloneNode(true));
    empty_init_past.push(total_init_past[count + i].cloneNode(true));
  }

  function pivot_event(m, id, boo) {
    let menu_i = Number(id.slice(9)) - 1;
    let menu_a = m.id.replace(/_col/g, '');
    let target_name;
    let select_arr = [];
    let select_init_arr = [];
    if (boo) {
      if (menu_i >= 0) {
        target_name = instance.data.menu[menu_a][menu_i];
      } else {
        target_name = 'all';
      }
      for (let i = 0; i < count; i++){
        if (target_name !== 'all' && total_past[i].querySelector('.' + menu_a).textContent === target_name) {
          select_arr.push(total_past[i].cloneNode(true));
          select_init_arr.push(total_init_past[i].cloneNode(true));
        } else if (target_name === 'all') {
          select_arr.push(total_past[i].cloneNode(true));
          select_init_arr.push(total_init_past[i].cloneNode(true));
        }
      }
    } else {
      if (menu_i >= 0) {
        target_name = instance.data.calendarplus[menu_a][menu_i];
      } else {
        target_name = 'all';
      }
      for (let i = 0; i < count; i++){
        if (target_name === 'Y' && ((total_past[i].querySelector('.' + menu_a).textContent !== '') && (total_past[i].querySelector('.' + menu_a).textContent !== '-'))) {
          select_arr.push(total_past[i].cloneNode(true));
          select_init_arr.push(total_init_past[i].cloneNode(true));
        } else if (target_name === 'N' && ((total_past[i].querySelector('.' + menu_a).textContent === '') || (total_past[i].querySelector('.' + menu_a).textContent === '-'))) {
          select_arr.push(total_past[i].cloneNode(true));
          select_init_arr.push(total_init_past[i].cloneNode(true));
        } else if (target_name === 'all') {
          select_arr.push(total_past[i].cloneNode(true));
          select_init_arr.push(total_init_past[i].cloneNode(true));
        }
      }
    }
    let result_arr = select_arr.concat(empty_past);
    let result_init_arr = select_init_arr.concat(empty_init_past);
    let frag1 = document.createDocumentFragment();
    let frag2 = document.createDocumentFragment();
    for (let i = 0; i < result_arr.length; i++) {
      frag1.appendChild(result_arr[i]);
      frag2.appendChild(result_init_arr[i]);
    }
    let data = document.getElementById('datadiv');
    let data_init = document.getElementById('initcolumn_data');
    while (data.firstChild) { data.removeChild(data.lastChild); }
    data.appendChild(frag1);
    while (data_init.firstChild) { data_init.removeChild(data_init.lastChild); }
    data_init.appendChild(frag2);
    instance.ajaxcall('trs');
  }

  function desc_event(m, id) {
    let mode = 0;
    let node_id = m.id.replace(/_col/g, '');
    if (instance.data.slide.hasOwnProperty(node_id)) { mode = 1; }
    let data = document.getElementById('datadiv');
    let data_init = document.getElementById('initcolumn_data');
    function emptyarr() { return new Array(count); }
    let total = document.querySelectorAll('.rowdiv');
    let total_init = document.querySelectorAll('.rowdiv_init');
    let count = total.length - 100;
    let frag1 = document.createDocumentFragment();
    let frag2 = document.createDocumentFragment();
    let target = document.querySelectorAll('.rowdiv .' + node_id);
    let target_arr = emptyarr();
    let result_arr = emptyarr();
    let result_arr_init = emptyarr();
    let sunseo = emptyarr();
    let sort_arr = [];
    for (let i = 0; i < count; i++) {
      target_arr[i] = target[i];
    }
    for (let i of target_arr) {
      let this_id = Number(/_r[0-9]+/g.exec(i.id)[0].slice(2));
      if (mode === 0){ sort_arr.push({ con: i.textContent, id: this_id }); }
      else { sort_arr.push({ con: Number(i.textContent), id: this_id }); }
    }
    switch (id) {
      case 'sortitem1':
        if (mode === 0){ sort_arr.sort(function (a, b) { return (a.con < b.con ? -1 : 1); }); }
        else { sort_arr.sort(function (a, b) { return (a.con - b.con); }); }
        break;
      case 'sortitem2':
        if (mode === 0){ sort_arr.sort(function (a, b) { return (a.con < b.con ? 1 : -1); }); }
        else { sort_arr.sort(function (a, b) { return (b.con - a.con); }); }
        break;
      case 'sortitem3':
        sort_arr.sort(function (a, b) { return (a.id - b.id); });
        break;
      case 'sortitem4':
        sort_arr.sort(function (a, b) { return (b.id - a.id); });
        break;
    }
    for (let i = 0; i < count; i++) { sunseo[i] = sort_arr[i].id - 1; }
    for (let i = 0; i < count; i++) {
      result_arr[i] = total_past[sunseo[i]].cloneNode(true);
      result_arr_init[i] = total_init_past[sunseo[i]].cloneNode(true);
    }
    for (let i = 0; i < count; i++) {
      data.removeChild(data.firstChild);
      data_init.removeChild(data_init.firstChild);
      frag1.appendChild(result_arr[i]);
      frag2.appendChild(result_arr_init[i]);
    }
    data.insertBefore(frag1, data.firstChild);
    data_init.insertBefore(frag2, data_init.firstChild);
    instance.ajaxcall('trs');
  }

  function sortrow_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.nodeName !== "LABEL" && e.target.id !== "cancel_back" && this.c === 0) {
      let node_id = this.id.replace(/_col/g, '');
      let div = '';
      let arr = ['오름차순 정렬','내림차순 정렬','아이디순 정렬','아이디순 역정렬'];
      for (let i = 0; i < arr.length; i++) { div += '<p class="sortbox_item" id="sortitem' + String(i+1) + '">' + arr[i] + '</p>'; }
      if (instance.data.menu.hasOwnProperty(node_id) || instance.data.calendarplus.hasOwnProperty(node_id)) {
        let menu;
        if (instance.data.menu.hasOwnProperty(node_id)) {
          menu = instance.data.menu[node_id];
        } else {
          menu = instance.data.calendarplus[node_id];
        }
        div += '<section class="filter"><section class="filter_back"></section>';
        div += '<p class="fiterbox_item" id="fiteritem0">전체 보기</p>';
        for (let i = 0; i < menu.length; i++) { div += '<p class="fiterbox_item" id="fiteritem' + String(i+1) + '">' + menu[i] + '</p>'; }
        div += '</section>';
      }
      this.appendChild(instance.divmaker("sortbox", "", div));
      (function (m) {
        let sort_node = document.querySelectorAll('.sortbox_item');
        let cancel_node = document.querySelectorAll('#cancel_back');
        function sort_event(e) {
          desc_event(m, this.id);
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('sortbox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        for (let node of sort_node) { node.addEventListener("click", sort_event); }

        if (instance.data.menu.hasOwnProperty(node_id) || instance.data.calendarplus.hasOwnProperty(node_id)) {
          let filter_node = document.querySelectorAll('.fiterbox_item');
          function filter_event(e) {
            if (instance.data.sortquery.hasOwnProperty(m.id.replace(/_col$/g, ''))) {
              let valval = e.target.textContent;
              if (valval === "전체 보기") { valval = "."; }
              let where_query = {}
              where_query[m.id.replace(/_col$/g, '')] = valval;
              let dataq = 'title=' + instance.data.dbtitle;
              dataq += '&where=' + JSON.stringify(where_query);
              dataq += '&standard=multi';
              dataq += '&col_arr=all';
              dataq += '&sort=DESC';
              dataq += '&sortStandard=' + instance.data.standard;
              if (valval === "전체 보기") { dataq += '&limit=120'; }
              instance.ajaxajax(dataq);
            } else {
              pivot_event(m, this.id, instance.data.menu.hasOwnProperty(node_id));
            }
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('sortbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
          for (let node of filter_node) { node.addEventListener("click", filter_event); }
        }

        function cancel_event(e) {
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('sortbox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        for (let node of cancel_node){
          node.addEventListener("click", cancel_event);
          node.addEventListener("contextmenu", cancel_event);
        }
      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  let sortrow_node = document.querySelectorAll('.columnobj,.columnobjinit');
  for (let node of sortrow_node) { node.addEventListener("click", sortrow_event); }
}

//-------------------------------------------------------- About below

X.prototype.button_onoff = function () {
  let instance = this;
  let i = { b: 0, n: 0 };
  let w = { b: 1, n: 1 };
  let switchfunc = {
    b: [
        "_b",
        "#below",
        function (m) {
          let card_switch = document.getElementById("red_button_Y_switch");
          if (m === 0) {
            //init
            card_switch.checked = false;
          } else if (m === 1) {
            //red
            if (w.b === 1) { card_switch.checked = true; }
            else { card_switch.checked = false; }
          } else if (m === 2) {
            //off
            card_switch.checked = true;
          } else {
            //on
            card_switch.checked = false;
          }
        }
    ],
    n: [
        "_n",
        "#navi",
        function (m) {
          let card_switch = document.getElementById("red_button_X_switch");
          let initcolumn = document.getElementById("initcolumn");
          if (m === 0) {
            //init
            instance.toggle.red_button = 1;
            card_switch.checked = false;
          } else if (m === 1) {
            //red
            if (w.n === 1) {
              instance.toggle.red_button = 0;
              card_switch.checked = true;
              initcolumn.style.cssText = 'transform: translateX(' + String(parseInt(window.scrollX) - 150) + 'px);';
            } else {
              instance.toggle.red_button = 1;
              card_switch.checked = false;
              initcolumn.style.cssText = 'transform: translateX(' + String(parseInt(window.scrollX)) + 'px)';
            }
          } else if (m === 2) {
            //off
            instance.toggle.red_button = 0;
            card_switch.checked = true;
            initcolumn.style.cssText = 'transform: translateX(' + String(parseInt(window.scrollX) - 150) + 'px)';
          } else {
            //on
            instance.toggle.red_button = 1;
            card_switch.checked = false;
            initcolumn.style.cssText = 'transform: translateX(' + String(parseInt(window.scrollX)) + 'px)';
          }
        }
    ]
  };

  function buttons(m, a) {
    if (i[a] === 0) {
      switchfunc[a][2](0);
      i[a]++;
    }
    document.querySelector("#svgcircle" + m + switchfunc[a][0]).addEventListener("click", function (e) {
      if ((m === "yellow" || m === "green") && a === "b") {
        document.getElementById('coloring_switch').checked = true;
        instance.colorpalettes(true);
      }
      if ((m === "red") && a === "b") {
        document.getElementById('coloring_switch').checked = false;
        instance.colorpalettes(false);
      }
      //red
      if (m === "red") {
        switchfunc[a][2](1);
        w[a] = ((w[a] === 1) ? 0 : 1);
      //on to green/yellow
      } else if (w[a] === 1) {
        switchfunc[a][2](2);
        setTimeout(function () {
          document.querySelector(switchfunc[a][1] + m).style.cssText = "display: block;";
          document.querySelector(switchfunc[a][1] + ((m === "green") ? "yellow" : "green")).style.cssText = "display: none;";
        }, 600);
        setTimeout(function () {
          switchfunc[a][2](3);
        }, 650);
        w[a] = 1;
      //off to green/yellow
      } else {
        document.querySelector(switchfunc[a][1] + m).style.cssText = "display: block;";
        document.querySelector(switchfunc[a][1] + ((m === "green") ? "yellow" : "green")).style.cssText = "display: none;";
        setTimeout(function () {
          switchfunc[a][2](3);
        }, 50);
        w[a] = 1;
      }
    });
  }
  buttons("red", "b");
  buttons("green", "b");
  buttons("yellow", "b");
  buttons("red", "n");
  buttons("green", "n");
  buttons("yellow", "n");
}

X.prototype.colorpalettes = async function (mege) {
  let instance = this;
  // drag and drop event on
  let ddnodes = document.querySelectorAll(".color_palettes,.rowdiv_back,.rowdiv_init_back");
  let backs = document.querySelectorAll(".rowdiv_back,.rowdiv_init_back");
  let clicknodes = document.querySelectorAll(".rowdiv_init_id");

  if (mege === 'init') {
    function dragstart_event(e) {
      e.dataTransfer.setData("color_num", e.target.textContent);
      document.getElementById("coloringback_switch").checked = true;
    }
    function dragend_event(e) {
      document.getElementById("coloringback_switch").checked = false;
    }
    function dragover_event(e) { e.preventDefault(); }
    async function drop_event(e) {
      if (e.cancelable) { e.preventDefault(); }
      let target_id, target, sessionupdate, ajax_data;
      let data = e.dataTransfer.getData("color_num");
      if (data === '#ffffff') { data = 'transparent'; }
      e.target.style.background = data;
      if ( e.target.className === "rowdiv_init_back" ) {
        target_id = this.id.replace(/div_back/g, '');
        target = document.getElementById(target_id).childNodes[1];
        document.getElementById(this.id.replace(/_init$/g, '')).style.background = data;
        sessionupdate = "title=" + instance.data.dbtitle + "&method=color&thisid=" + target.textContent + "&thisid2=color_palettes_backdiv_standard&value=" + data;
        ajax_data = await X.ajax('/session_update3', sessionupdate);
        console.log(ajax_data);
      } else if ( e.target.className !== "color_palettes") {
        target_id = e.target.parentNode.parentNode.id + "_init";
        target = document.getElementById(target_id).childNodes[1];
        sessionupdate = "title=" + instance.data.dbtitle + "&method=color&thisid=" + target.textContent + "&thisid2=" + e.target.classList[1].replace(/_back$/, '') + "&value=" + data;
        ajax_data = await X.ajax('/session_update3', sessionupdate);
        console.log(ajax_data);
      }
    }
    async function click_event(e) {
      if (e.cancelable) { e.preventDefault(); }
      let data, data_temp, ajax_data;
      let init_back = this.parentElement.childNodes[0];
      let rows_back = document.getElementById(this.parentElement.childNodes[0].id.replace(/_init$/g, ''));
      switch (e.type) {
        case "click":
          data = "#d0e3d6";
          if (e.altKey) { data = "transparent"; }
          if (e.metaKey) { data = "#f5b5a7"; }
          init_back.style.background = data;
          rows_back.style.background = data;
          this.setAttribute("cus_tempcolor", data);
          target_id = this.parentElement.childNodes[0].id.replace(/div_back/g, '');
          target = document.getElementById(target_id).childNodes[1];
          sessionupdate = "title=" + instance.data.dbtitle + "&method=color&thisid=" + target.textContent + "&thisid2=color_palettes_backdiv_standard&value=" + data;
          ajax_data = await X.ajax('/session_update3', sessionupdate);
          console.log(ajax_data);
          break;
        case "mouseenter":
          this.setAttribute("cus_tempcolor", init_back.style.background);
          init_back.style.background = "#f9e3a8";
          rows_back.style.background = "#f9e3a8";
          break;
        case "mouseleave":
          if (this.hasAttribute("cus_tempcolor")) {
            init_back.style.background = this.getAttribute("cus_tempcolor");
            rows_back.style.background = this.getAttribute("cus_tempcolor");
          } else {
            init_back.style.background = "transparent";
            rows_back.style.background = "transparent";
          }
          break;
      }
    }
    for (let node of ddnodes) {
      node.addEventListener("dragstart", dragstart_event);
      node.addEventListener("dragend", dragend_event);
      node.addEventListener("dragover", dragover_event);
      node.addEventListener("drop", drop_event);
    }
    for (let node of clicknodes) {
      node.addEventListener("click", click_event);
      node.addEventListener("mouseenter", click_event);
      node.addEventListener("mouseleave", click_event);
    }
  }
  if (mege === 'init' || mege) {
    //get setting
    let sessionon = "title=" + instance.data.dbtitle + "&method=color";
    let data = await X.ajax('/session_on', sessionon);
    console.log('color setting update...');
    let rows = JSON.parse(data);
    console.log(rows);
    let rows_row = Object.keys(rows);
    let this_id, this_target, this_target_init, loop_dom;
    for (let stan of rows_row) {
      this_id = {};
      this_target = {};
      this_target_init = {};
      if (document.querySelector('.id_' + stan)) {
        this_id = document.querySelector('.id_' + stan).id.slice(0,-5).slice(3);
        this_target = document.getElementById('rowdiv_back' + this_id);
        this_target_init = document.getElementById('rowdiv_back' + this_id + "_init");
        this_target.style.display = 'block';
        this_target_init.style.display = 'block';
        this_target.style.background = rows[stan]['color_palettes_backdiv_standard'];
        this_target_init.style.background = rows[stan]['color_palettes_backdiv_standard'];
        for (let i of instance.data.colleft_arr) {
          loop_dom = this_target.querySelector('.' + i + "_back");
          loop_dom.style.background = rows[stan][i];
        }
      }
    }
  } else {
    function trans(m) {
      m.style.display = 'none';
      m.style.background = 'transparent';
    }
    for (let node of backs) { trans(node) }
  }
}

//-------------------------------------------------------- Funcs about event (event_api use : leftcenterright, rowcards)

X.prototype.scrollcenter = function (m1, m2, m3) {
  let t = Math.abs(parseInt(document.querySelector('html').getBoundingClientRect().top)) + m1.getBoundingClientRect().top - ((window.innerHeight * m2)/100);
  let l = Math.abs(parseInt(document.querySelector('html').getBoundingClientRect().left)) + m1.getBoundingClientRect().left - ((window.innerWidth * m3)/100);
  window.scrollTo({top: t, left: l, behavior:'smooth'});
}

X.prototype.grayfocus = function (m, t, back = true) {
  let _r = /_r[0-9]+/gi.exec(String(t.id))[0];
  if (back) { document.getElementById('grayfocus_switch').checked = (m ? true : false); }
  let elements1 = document.querySelectorAll('.rowdiv_init,.columnobj');
  for (let node of elements1) {
    node.style.cssText = 'opacity: ' + (m ? '0.4;' : '1;');
  }
  document.getElementById('row' + _r.slice(2) + '_init').style.cssText = 'opacity: 1;color: ' + (m ? '#2fa678;' : '#404040;');
  if (document.querySelector('#' + t.id.replace(/_r[0-9]+/gi, '') + '_col') !== null) { document.getElementById(t.id.replace(/_r[0-9]+/gi, '') + '_col').style.cssText = 'opacity: 1;'; }
  t.style.cssText = 'color: ' + (m ? '#2fa678;' : '#404040;');
}

X.prototype.leftcenterright  = function (mege1, mege2) {
  let instance = this;
  let mainbox = document.getElementById('cardviewbox');
  let w = mainbox.getBoundingClientRect().width;
  let r = Math.abs(mainbox.getBoundingClientRect().left - mege1.getBoundingClientRect().left);
  let dic = {
    calendar: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 151px)', 'top:76px;left:calc(100% - 304px)' ],
    calendarplus: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 151px)', 'top:76px;left:calc(100% - 304px)' ],
    basicslider: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    scopeslider: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    oppositeslider: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    calcperiod: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 192px)', 'top:76px;left:calc(100% - 384px)' ],
    multiplesel: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 192px)', 'top:76px;left:calc(100% - 384px)' ],
    arraymaker: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    objectmaker: [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ]
  };
  if (r < w/3) { return dic[mege2][0]; }
  else if (r >= w/3 && r < ((w/3)*2)) { return dic[mege2][1]; }
  else if (r >= ((w/3)*2)) { return dic[mege2][2]; }
}

X.prototype.divmaker = function (title_id, css, contents) {
  let h = document.createDocumentFragment();
  let canceldiv = document.createElement("ARTICLE");
  let contentsdiv = canceldiv.cloneNode(true);
  canceldiv.id = 'cancel_back';
  contentsdiv.id = title_id;
  contentsdiv.style.cssText = css;
  contentsdiv.insertAdjacentHTML('beforeend', contents);
  h.appendChild(canceldiv);
  h.appendChild(contentsdiv);
  return h;
}

X.prototype.rowcards = function (title, mege1, mege2, mege3, excep = [753346, 753346, 753346]) {
  let instance = this;
  let box = {
    longtext: [ 'position:fixed;top:20%;left:3.5%;width:calc(93.4% - 86px);height:63.5%;', 16, 50 ],
    longtextplus: [ 'position:fixed;top:20%;left:3.5%;width:calc(93.4% - 6px);height:auto;', 16, 50 ],
    shorttext: [ 'top:76px;font-size:13.2px;', 42, 51 ],
    eashort: [ 'top:76px;font-size:13.2px;', 42, 51 ],
    menubar: [ 'top:76px;', 42, 51 ],
    calendar: [ 753346, 30, 51 ],
    calendarplus: [ 753346, 30, 51 ],
    basicslider: [ 753346, 39, 51 ],
    scopeslider: [ 753346, 39, 51 ],
    oppositeslider: [ 753346, 39, 51 ],
    calcperiod: [ 753346, 39, 51 ],
    multiplesel: [ 753346, 33, 51 ],
    arraymaker: [ 753346, 33, 51 ],
    objectmaker: [ 'top:76px;', 33, 51 ],
    exceptions: []
  }
  if (excep[2] !== 753346) { box.exceptions = excep; }
  let csstext = '';
  switch (mege1) {
    case 'tcs':
      if (box[title][0] === 753346) { box[title][0] = instance.leftcenterright(mege3, title); }
      let cards = document.querySelectorAll('.cards_input');
      let checkbox_local = document.getElementById(mege3.id + '_input');
      let checkbox_total = document.getElementById('grayfocus_card_switch');
      if (mege2) {
        csstext = box[title][0];
        checkbox_total.checked = true;
        for (let node of cards) { node.checked = false; }
        checkbox_local.checked = true;
      } else {
        checkbox_total.checked = false;
        for (let node of cards) { node.checked = true; }
      }
      break;
    case 'trs':
      if (mege2) {
        csstext = '';
        this.scrollcenter(mege3, box[title][1], box[title][2]);
        this.grayfocus(true, mege3);
      } else {
        this.grayfocus(false, mege3);
      }
      break;
  }
  if (mege2) { return csstext; }
}

X.prototype.cancel_event = function (cancel_node, m, mege, rowcards, boxtitle, callback = function () {}) {
  let instance = this;
  let cancel_event = function (e) {
    while (m.firstChild) { m.removeChild(m.lastChild); }
    m.textContent = instance.data_flow.past_data[0];
    instance.rowcards(rowcards, mege, false, m);
    m.style.cssText = "color: #404040;overflow: hidden;";
    callback();
    instance.data_flow.onoff_c = 0;
    m.c = instance.data_flow.onoff_c;
    if (document.querySelector("#cancel_back")) {
      document.getElementById("cancel_back").remove();
      document.getElementById(boxtitle).remove();
    }
    if (e.cancelable) { e.preventDefault(); }
  }
  //node add event
  for (let node of cancel_node){
    node.addEventListener("click", cancel_event);
    node.addEventListener("contextmenu", cancel_event);
  }
}

//-------------------------------------------------------- Update & Return query

X.prototype.query_cancel = function (mege) {
  let instance = this;
  let query_arr = async function (m) {
    if (instance.data_flow.target_col[m]) {
      let return_query = 'c=' + instance.data_flow.target_col[m] + '&v=' + instance.data_flow.undo_data[m] + '&i=' + instance.data_flow.target_where[m] + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;
      //ajax update
      let msg = await X.ajax("/post_update", return_query);
      console.log('return');
      let past_ele = document.getElementById(instance.data_flow.target_id[m]);
      while (past_ele.firstChild) { past_ele.removeChild(past_ele.lastChild); }
      if (instance.exceptions().exceptionlist.indexOf(instance.data_flow.target_col[m]) === -1) {
        document.getElementById(instance.data_flow.target_id[m]).textContent = instance.data_flow.undo_data[m];
      } else {
        document.getElementById(instance.data_flow.target_id[m]).appendChild(instance.exceptions().calcperiod(instance.data_flow.undo_data[m]));
      }
      console.log(instance.data_flow);
      if (instance.data.chaining.indexOf(instance.data_flow.target_col[m]) !== -1) {
        let info_obj = {
          col: instance.data_flow.target_col[m],
          data: instance.data_flow.new_data[m],
          r_id: /_[rc][0-9]+/gi.exec(instance.data_flow.target_id[m])[0],
          where: instance.data_flow.target_where[m],
          standard: instance.data.standard,
          table: instance.data.dbtitle
        }
        console.log(info_obj);
        let chaining_func = instance.chaining[instance.data_flow.target_col[m]];
        chaining_func(info_obj);
      }
    }
  }
  let query_exec = function () {
    if (instance.data_flow.target_col.length !== 0 && instance.data_flow.count < 5) {
      if (instance.data_flow.count === 0) {
        if (instance.data_flow.target_col.length >= 1) {
          query_arr(0);
          instance.data_flow.count = 1;
        }
      } else if (instance.data_flow.count === 1) {
        if (instance.data_flow.target_col.length >= 2) {
          query_arr(1);
          instance.data_flow.count = 2;
        }
      } else if (instance.data_flow.count === 2) {
        if (instance.data_flow.target_col.length >= 3) {
          query_arr(2);
          instance.data_flow.count = 3;
        }
      } else if (instance.data_flow.count === 3) {
        if (instance.data_flow.target_col.length >= 4) {
          query_arr(3);
          instance.data_flow.count = 4;
        }
      } else if (instance.data_flow.count === 4) {
        if (instance.data_flow.target_col.length >= 5) {
          query_arr(4);
          instance.data_flow.count = 5;
        }
      }
    }
  }
  if (mege) { document.querySelector('.return_query').addEventListener("click", query_exec); }
  else { query_exec(); }
}

X.prototype.update_query = async function (mege1, mege2) {
  let instance = this;
  instance.data_flow.undo_data.unshift(instance.data_flow.past_data[0]);
  instance.data_flow.target_id.unshift(mege1.id);
  instance.data_flow.new_data.unshift(mege2);
  instance.data_flow.target_col.unshift(mege1.id.replace(/_[rc][0-9]+/gi, ''));
  instance.data_flow.target_where.unshift(document.getElementById(instance.data.standard + (/_[rc][0-9]+/gi.exec(mege1.id)[0]).replace(/c/, 'r')).textContent);
  instance.data_flow.count = 0;
  let update_query = 'c=' + instance.data_flow.target_col[0] + '&v=' + instance.data_flow.new_data[0] + '&i=' + instance.data_flow.target_where[0] + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;
  let msg = await X.ajax("/post_update", update_query);
  console.log(msg);
  console.log(instance.data_flow);
  if (instance.data.chaining.indexOf(instance.data_flow.target_col[0]) !== -1) {
    let info_obj = {
      col: instance.data_flow.target_col[0],
      data: instance.data_flow.new_data[0],
      r_id: /_[rc][0-9]+/gi.exec(instance.data_flow.target_id[0])[0],
      where: instance.data_flow.target_where[0],
      standard: instance.data.standard,
      table: instance.data.dbtitle
    }
    console.log(info_obj);
    let chaining_func = instance.chaining[instance.data_flow.target_col[0]];
    chaining_func(info_obj);
  }
}

//-------------------------------------------------------- Event APIs

X.prototype.longtext = function (mege) {
  let instance = this;
  function longtext_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.id !== "cancel_back" && e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "TEXTAREA" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "STRONG" && this.c === 0) {
      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('longtext', mege, true, this);

      //contents
      let div = '<textarea id="' + this.id + '_ta" class="rowinput rowinputlong">' + this.textContent + '</textarea>';
      div += '<section id="savecancel">Save&nbsp;&nbsp;<strong style="color:#dddddd">|</strong>&nbsp;&nbsp;Cancel';
      div += '<strong class="savecancelbt" id="savecancelbt1"></strong><strong class="savecancelbt" id="savecancelbt2"></strong></section>';

      //clean this
      while (this.firstChild) { this.removeChild(this.lastChild); }
      this.textContent = "수정중";
      this.style.cssText = "color: #009c6a;overflow: visible;";

      //append div
      if (mege === 'tcs') {
        document.getElementById('cardviewbox').scrollTo({ top: 0, behavior: 'smooth' });
        this.parentNode.parentNode.appendChild(instance.divmaker("longtextbox", left, div));
      } else {
        this.appendChild(instance.divmaker("longtextbox", left, div));
      }

      //update event - binding this
      (function (m) {
        document.querySelector('#longtextbox > textarea').focus();
        let update_node1 = document.querySelector('#longtextbox > textarea');
        let update_node2 = document.querySelector('#savecancelbt1');

        //update
        function update_event(e) {
          if ((e.type === "click" && e.target.id === "savecancelbt1") || (e.type === "keydown" && e.keyCode === 9)) {

            //update query
            let new_data = document.getElementById(m.id + '_ta').value;
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('longtext', mege, false, m);
            m.style.cssText = "color: #404040;overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('longtextbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node1.addEventListener("keydown", update_event);
        update_node2.addEventListener("click", update_event);

        //cancel
        let cancel_node = document.querySelectorAll('#cancel_back,#savecancelbt2');
        instance.cancel_event(cancel_node, m, mege, "longtext", "longtextbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let longtext_node = document.querySelectorAll('.' + mege + '_long');
  for (let node of longtext_node) { node.addEventListener("click", longtext_event); }
}

X.prototype.longtextplus = function (mege) {
  let instance = this;
  function longtextplus_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "IMG" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.nodeName !== "LABEL" && e.target.id !== "cancel_back" && this.c === 0) {
      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('longtextplus', mege, true, this);

      //contents
      let this_col = this.id.replace(/_[rc][0-9]+/gi, '');
      let this_arr = this.textContent.split('__________split__________');
      let div = '';
      for (let text of this_arr) { div += '<section class="longtextitems"><textarea class="rowinput rowinputlong">' + text + '</textarea></section>'; }
      div += '<section id="array_update"><img id="array_upimg" src="/list_svg/checkicon1.svg"></section>';
      div += '<section id="array_plus"><img id="array_img" src="/list_svg/create_row1.svg"></section>';

      //clean this
      while (this.firstChild) { this.removeChild(this.lastChild); }
      this.textContent = "수정중";
      this.style.cssText = "color: #009c6a;overflow: visible;";

      //append div
      if (mege === 'tcs') {
        document.getElementById('cardviewbox').scrollTo({ top: 0, behavior: 'smooth' });
        this.parentNode.parentNode.appendChild(instance.divmaker("longtextplusbox", left, div));
      } else {
        this.appendChild(instance.divmaker("longtextplusbox", left, div));
      }

      //update event - binding this
      (function (m) {
        document.querySelector('.longtextitems > textarea').focus();
        let effect_node = document.querySelector('#array_img');
        let delete_node = document.querySelectorAll('.rowinputlong');
        let update_node = document.querySelector('#array_update');

        //delete
        function delete_event(e) {
          if (e.target.nodeName === "TEXTAREA"){ e.target.parentElement.remove(); }
          else if (e.target.nodeName === "SECTION") { e.target.remove(); }
          e.preventDefault();
        }
        //node add event
        for (let node of delete_node) { node.addEventListener("contextmenu", delete_event); }

        //update
        function update_event(e) {
          if ((e.type === "click" && this.id === "array_update") || (e.type === "keydown" && e.keyCode === 9)) {
            //update query
            let arr_vals = document.querySelectorAll('.rowinputlong');
            let new_data = "";
            for (let node of arr_vals) { new_data += node.value + "__________split__________"; }
            new_data = new_data.slice(0, -25);
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('longtextplus', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('longtextplusbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node.addEventListener("click", update_event);
        for (let node of delete_node) { node.addEventListener("keydown", update_event); }

        //effect
        function effect_event(e) {
          let array_section = document.createElement('SECTION');
          let array_textarea = document.createElement('TEXTAREA');
          let array_update = document.getElementById('array_update');
          array_section.classList.add("longtextitems");
          array_textarea.classList.add("rowinput");
          array_textarea.classList.add("rowinputlong");
          array_section.appendChild(array_textarea);
          document.getElementById('longtextplusbox').insertBefore(array_section, array_update);
          array_textarea.addEventListener("contextmenu", delete_event);
          array_textarea.addEventListener("keydown", update_event);
        }
        //node add event
        effect_node.addEventListener("click", effect_event);

        //cancel
        let cancel_node = document.querySelectorAll('#cancel_back');
        instance.cancel_event(cancel_node, m, mege, "longtextplus", "longtextplusbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let longtextplus_node = document.querySelectorAll('.' + mege + '_longplus');
  for (let node of longtextplus_node) { node.addEventListener("click", longtextplus_event); }
}

X.prototype.shorttext = function (mege) {
  let instance = this;
  function shorttext_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "TEXTAREA" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('shorttext', mege, true, this);

      //contents
      let div = '<textarea id="' + this.id + '_ta" class="rowinput rowinputshort">';
      div += this.textContent + '</textarea>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("shortbox", left, div)); }
      else { this.appendChild(instance.divmaker("shortbox", left, div)); }

      //update event - binding this
      (function (m) {
        document.querySelector('#shortbox > textarea').focus();
        let update_node = document.querySelector('#shortbox > textarea');

        //update
        function update_event(e) {
          if (e.keyCode === 13 || e.keyCode === 9) {
            //update query
            let new_data = document.getElementById(m.id + '_ta').value;
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('shorttext', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('shortbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node.addEventListener("keydown", update_event);

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "shorttext", "shortbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let shorttext_node = document.querySelectorAll('.' + mege + '_short');
  for (let node of shorttext_node) { node.addEventListener("click", shorttext_event); }
}

X.prototype.eashort = function (mege) {
  let instance = this;
  function eashorttext_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "TEXTAREA" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('eashort', mege, true, this);

      //contents
      let this_col = this.id.replace(/_[rc][0-9]+/g, '');
      let this_eamenu = instance.data.eashort[this_col];
      let this_eamenu_num = this_eamenu.length;
      let this_reg = new Array(this_eamenu_num);
      let this_text = this.textContent;
      let this_ea = ""
      for (let i = 0; i < this_eamenu_num; i++) {
        this_reg[i] = new RegExp((this_eamenu[i] + "$"), "g");
        this_ea += ((this_text.match(this_reg[i])) ? this_eamenu[i] : "");
        this_text = this_text.replace(this_reg[i], "");
      }
      let div = '<section id="eabox1">';
      div += '<textarea id="' + this.id + '_ta" class="rowinput rowinputshort">';
      div += this_text;
      div += '</textarea>';
      div += '</section>';
      div += '<section id="eabox2">';
      div += '<section class="ea_current">';
      div += '<label class="ea_label" for="ea_input">' + this_ea + '</label>';
      div += '<input type="checkbox" id="ea_input" name="ea_hiddenspot" class="switch">'
      div += '<section class="ea_hiddenspot">';
      div += '<section class="ea_menu_box">';
      for (let item of this_eamenu) { div += '<section class="ea_menu_detail">' + item + '</section>'; }
      div += '</section>';
      div += '</section>';
      div += '</section>';
      div += '</section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("eashortbox", left, div)); }
      else { this.appendChild(instance.divmaker("eashortbox", left, div)); }

      //update event - binding this
      (function (m) {
        document.querySelector('#eabox1 > textarea').focus();
        let effect_node = document.querySelectorAll('.ea_menu_detail');
        let update_node = document.querySelector('#eabox1 > textarea');
        let subupdate_node = document.querySelector('.ea_label');

        //effect
        function effect_event(e) {
          //update query
          let new_data = document.getElementById(m.id + '_ta').value + this.textContent;
          instance.update_query(m, new_data);

          //update div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.new_data[0];
          instance.rowcards("eashort", mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById("cancel_back")) {
            document.getElementById("cancel_back").remove();
            document.getElementById("eashortbox").remove();
          }
          if (e.cancelable) { e.preventDefault(); }
          // document.querySelector('#ea_input').checked = false;
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("click", effect_event);
        }

        //update
        function update_event(e) {
          if (e.keyCode === 13 || e.keyCode === 9) {
            //update query
            let new_data = document.getElementById(m.id + '_ta').value + subupdate_node.textContent;
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards("eashort", mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById("cancel_back")) {
              document.getElementById("cancel_back").remove();
              document.getElementById("eashortbox").remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node.addEventListener("keydown", update_event);

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "eashort", "eashortbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let eashorttext_node = document.querySelectorAll('.' + mege + '_eashort');
  for (let node of eashorttext_node) { node.addEventListener("click", eashorttext_event); }
}

X.prototype.menubar = function (mege) {
  let instance = this;
  function menubar_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "P" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('menubar', mege, true, this);

      //contents
      let items = instance.data.menu[this.id.replace(/_[rc][0-9]+/gi, '')];
      let div = '';
      for (let i = 0; i < items.length; i++) { div += '<p class="d_menu" id="d_menu' + String(i+1) + '">' + items[i] + '</p>'; }

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("menubox", left, div)); }
      else { this.appendChild(instance.divmaker("menubox", left, div)); }

      //update event - binding this
      (function (m) {
        let update_node = document.querySelectorAll('.d_menu');

        //update
        function update_event(e) {
          //update query
          let new_data = e.target.textContent;
          instance.update_query(m, new_data);

          //update div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.new_data[0];
          instance.rowcards('menubar', mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('menubox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        //node add event
        for (let node of update_node){
          node.addEventListener("click", update_event);
        }

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "menubar", "menubox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let menubar_node = document.querySelectorAll('.' + mege + '_menu');
  for (let node of menubar_node) { node.addEventListener("click", menubar_event); }
}

X.prototype.calendar = function (mege) {
  let instance = this;
  function calendar_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "BUTTON" && e.target.nodeName !== "SECTION" && e.target.id !== "cancel_back" && e.target.id !== "calendar" && e.target.id !== "calendarbox" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('calendar', mege, true, this);

      //contents
      let div = '<section class="calendar" id="calendar"></section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("calendarbox", left, div)); }
      else { this.appendChild(instance.divmaker("calendarbox", left, div)); }

      //update event - binding this
      (function (m) {
        let calendar = new FullCalendar.Calendar(document.querySelector('#calendar'), {
          plugins: ['interaction', 'dayGrid'],
          defaultView: 'dayGridMonth',
          locale: 'en',
          selectable: true,
          height: 400,
          dateClick: function (e) {
            //update query
            let new_data = e.dateStr;
            instance.update_query(m, new_data);
            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards("calendar", mege, false, m);
            m.style.cssText = "overflow: hidden;";
            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.querySelector("#cancel_back")) {
              document.getElementById("cancel_back").remove();
              document.getElementById("calendarbox").remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        });
        calendar.render();

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "calendar", "calendarbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let calendar_node = document.querySelectorAll('.' + mege + '_calendar');
  for (let node of calendar_node) { node.addEventListener("click", calendar_event); }
}

X.prototype.calendarplus = function (mege) {
  let instance = this;
  function calendarplus_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "BUTTON" && e.target.nodeName !== "SECTION" && e.target.id !== "cancel_back" && e.target.id !== "calendar" && e.target.id !== "calendarbox" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('calendarplus', mege, true, this);

      //contents
      let div = '<section class="calendar" id="calendar"></section>';
      div += '<section id="calendar_text">';
      div += '<textarea id="' + this.id + '_ta" class="rowinputplus rowinputshort">';
      div += this.textContent;
      div += '</textarea>';
      div += '</section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("calendarbox", left, div)); }
      else { this.appendChild(instance.divmaker("calendarbox", left, div)); }

      //update event - binding this
      (function (m) {
        document.querySelector('#calendar_text > textarea').focus();
        let update_node = document.querySelector('#calendar_text > textarea');
        let calendar = new FullCalendar.Calendar(document.querySelector('#calendar'), {
          plugins: ['interaction', 'dayGrid'],
          defaultView: 'dayGridMonth',
          locale: 'en',
          selectable: true,
          height: 400,
          dateClick: function (e) {
            //update query
            let new_data = e.dateStr;
            instance.update_query(m, new_data);
            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('calendarplus', mege, false, m);
            m.style.cssText = "overflow: hidden;";
            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('calendarbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        });
        calendar.render();

        //update
        function update_event(e) {
          if (e.keyCode === 13 || e.keyCode === 9) {
            //update query
            let new_data = document.getElementById(m.id + '_ta').value;
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('calendarplus', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.querySelector("#cancel_back")) {
              document.getElementById("cancel_back").remove();
              document.getElementById("calendarbox").remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node.addEventListener("keydown", update_event);

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "calendarplus", "calendarbox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let calendarplus_node = document.querySelectorAll('.' + mege + '_calendarplus');
  for (let node of calendarplus_node) { node.addEventListener("click", calendarplus_event); }
}

X.prototype.basicslider = function (mege) {
  let instance = this;
  function basicslider_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('basicslider', mege, true, this);

      //contents
      let k = this.id.replace(/_[rc][0-9]+/gi, '');
      let man = instance.data.slide[k];
      let v = man/2;
      if (this.textContent !== '') { v = Number(this.textContent); }
      let j = [((v/25)*(600/man)), 25, 320];
      let div = '<div class="slidebar">';
      div += '<div class="slidebackbar" id="slidebackbar2" style="transform:scaleX(' + String(((j[1] - j[0])/j[1]) - 0.02) + ')"></div>';
      for (let i = 0;i < j[1];i++) {
          div += '<p class="slidebackbarbuttons" id="slidebackbarbuttons' + String(i) + '" style="left:' + String((j[2]/j[1])*i) + 'px"></p>';
      }
      div += '<p class="slidercircle" id="slidecircle1" style="transform:translateX(' + String((j[2]/j[1])*j[0]) + 'px);"></p>';
      div += '</div>';
      div += '<section class="slidenumber">' + String(man) + '점 만점에 <strong style="color:#59af89">' + String(Math.round((25*j[0])/(600/man))) + '</strong>점' + '</section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("slidebox", left, div)); }
      else { this.appendChild(instance.divmaker("slidebox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelectorAll('.slidebackbarbuttons');
        let update_node = document.querySelectorAll('.slidercircle');

        //effect
        function effect_event(e) {
          j[0] = Number(e.target.id.slice(19));
          document.getElementById("slidecircle1").style.cssText = "transform: translateX(" + String((j[2]/j[1]) * j[0]) + "px);";
          document.getElementById("slidebackbar2").style.cssText = "transform: scaleX(" + String(((j[1] - j[0])/j[1]) - 0.02) + ");";
          let string_spot = document.querySelector(".slidenumber");
          while (string_spot.firstChild) { string_spot.removeChild(string_spot.lastChild); }
          let h = document.createDocumentFragment();
          let h_strong = document.createElement('STRONG');
          //arr means - 1 : element, 2 : contents text, 3 : css
          let h_arr = [[h_strong.cloneNode(true),h_strong.cloneNode(true),h_strong.cloneNode(true)],[(String(man) + '점 만점에 '),String(Math.round((25 * j[0])/(600/man))),'점'],['color:#404040;','color:#59af89;','color:#404040;']];
          for (let i = 0; i < 3; i++) {
            h_arr[0][i].textContent = h_arr[1][i]
            h_arr[0][i].style.cssText = h_arr[2][i]
            h.appendChild(h_arr[0][i]);
          }
          string_spot.appendChild(h);
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("mouseover", effect_event);
        }

        //update
        function update_event(e) {
          //update query
          let new_data = document.querySelector(".slidenumber").textContent.match(/[0-9]+/gi)[1];
          instance.update_query(m, new_data);

          //update div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.new_data[0];
          instance.rowcards('basicslider', mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('slidebox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        //node add event
        for (let node of update_node){
          node.addEventListener("click", update_event);
        }

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "basicslider", "slidebox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let basicslider_node = document.querySelectorAll('.' + mege + '_slide');
  for (let node of basicslider_node) { node.addEventListener("click", basicslider_event); }
}

X.prototype.scopeslider = function (mege) {
  let instance = this;

  function scopeslider_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('scopeslider', mege, true, this);
      let this_col = this.id.replace(/_[rc][0-9]+/g, '');
      let boo_gijun = instance.data.scope[this_col][0];

      //contents
      let arr_string = '';
      let arr = [], j = [];
      let div = '';
      let gijun = 1;
      let minimum = 50;
      if (typeof boo_gijun === "number") {
        //scope number
        arr_string = this.textContent.split(' - ');
        gijun = Math.round(instance.data.scope[this.id.replace(/_[rc][0-9]+/g, '')][1] / 25);
        minimum = instance.data.scope[this.id.replace(/_[rc][0-9]+/g, '')][0];
        arr = [ 200, 500 ];
        if (arr_string[0] !== "") { arr = [ Number(arr_string[0]), Number(arr_string[1]) ]; }
        j = [ parseInt((arr[0]-minimum)/gijun), parseInt((arr[1]-minimum)/gijun), 25, 320 ];
        div = '<div class="slidebar">';
        div += '<div class="slidebackbar" id="slidebackbar1" style="transform:scaleX(' + String((j[0]/j[2]) + 0.02) + ')"></div>';
        div += '<div class="slidebackbar" id="slidebackbar2" style="transform:scaleX(' + String(((j[2]-j[1])/j[2]) - 0.02) + ')"></div>';
        for (let i = 0;i < j[2];i++) {
            div += '<p class="slidebackbarbuttons" id="slidebackbarbuttons' + String(i) + '" style="left:' + String((j[3]/j[2])*i) + 'px"></p>';
        }
        div += '<p class="slidercircle" id="slidecircle1" style="transform:translateX(' + String((j[3]/j[2])*j[0]) + 'px);"></p>';
        div += '<p class="slidercircle" id="slidecircle2" style="transform:translateX(' + String((j[3]/j[2])*j[1]) + 'px);"></p>';
        div += '</div>';
        div += '<section class="slidenumber">' + '최소 ' + String(minimum+(gijun*j[0])) + '만원 <strong style="color:#59af89">~</strong> 최대 ' + String(minimum+(gijun*j[1])) + '만원' + '</section>';
      } else if (boo_gijun === "input") {
        //scope string
        arr_string = this.textContent.split(' - ');
        if (arr_string.length !== 2) { arr_string = [ '', '' ]; }
        div += '<p class="scopep" id="scopep_title">범위 :</p>';
        div += '<input type="text" class="scopeinput" id="scopeinput_min" value="' + arr_string[0] + '">';
        div += '<p class="scopep">' + instance.data.scope[this.id.replace(/_[rc][0-9]+/g, '')][1] + '</p>';
        div += '<p class="scopep" id="scopep_mul"> ~ </p>';
        div += '<input type="text" class="scopeinput" id="scopeinput_max" value="' + arr_string[1] + '">';
        div += '<p class="scopep">' + instance.data.scope[this.id.replace(/_[rc][0-9]+/g, '')][1] + '</p>';
      }

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("slidebox", left, div)); }
      else { this.appendChild(instance.divmaker("slidebox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node, update_node;

        if (typeof boo_gijun === "number") {
          effect_node = document.querySelectorAll('.slidebackbarbuttons');
          //effect
          function effect_event(e) {
            let this_num = Number(e.target.id.slice(19));
            let slidecircle1_ele = document.getElementById('slidecircle1');
            let slidecircle2_ele = document.getElementById('slidecircle2');
            if (this_num > j[1]) {
              slidecircle2_ele.style.cssText = "transform: translateX("+String((j[3]/j[2])*this_num)+"px);";
              j[1] = this_num;
            } else if (this_num > j[0] && this_num < j[1]) {
              if (Math.abs(j[1] - this_num) > Math.abs(j[0] - this_num)) {
                slidecircle1_ele.style.cssText = "transform: translateX("+String((j[3]/j[2])*this_num)+"px);";
                j[0] = this_num;
              } else {
                slidecircle2_ele.style.cssText = "transform: translateX("+String((j[3]/j[2])*this_num)+"px);";
                j[1] = this_num;
              }
            } else if (this_num < j[0]) {
              slidecircle1_ele.style.cssText = "transform: translateX("+String((j[3]/j[2])*this_num)+"px);";
              j[0] = this_num;
            }
            document.getElementById("slidebackbar1").style.cssText = "transform: scaleX(" + String((j[0]/j[2]) + 0.02) + ");";
            document.getElementById("slidebackbar2").style.cssText = "transform: scaleX(" + String(((j[2]-j[1])/j[2]) - 0.02) + ");";
            let string_spot = document.querySelector(".slidenumber");
            while (string_spot.firstChild) { string_spot.removeChild(string_spot.lastChild); }

            let h = document.createDocumentFragment();
            let h_strong = document.createElement('STRONG');
            //arr means - 1 : element, 2 : contents text, 3 : css
            let h_arr = [[h_strong.cloneNode(true),h_strong.cloneNode(true),h_strong.cloneNode(true)],[('최소 '+String(minimum+(gijun*j[0]))+'만원 '),'~',(' 최대 '+String(minimum+(gijun*j[1]))+'만원')],['color:#404040;','color:#59af89;','color:#404040;']];
            for (let i = 0; i < 3; i++) {
              h_arr[0][i].textContent = h_arr[1][i]
              h_arr[0][i].style.cssText = h_arr[2][i]
              h.appendChild(h_arr[0][i]);
            }
            string_spot.appendChild(h);
          }
          //node add event
          for (let node of effect_node){ node.addEventListener("mouseover", effect_event); }
          update_node = document.querySelectorAll('.slidercircle');
        } else if (boo_gijun === "input") {
          update_node = document.querySelectorAll('.scopeinput');
        }

        //update
        function update_event(e) {
          if (e.type === "click" || (e.type === "keydown" && (e.keyCode === 9 || e.keyCode === 13))) {
            //update query
            let new_data;
            if (typeof boo_gijun === "number") {
              new_data = document.querySelector(".slidenumber").textContent.match(/[0-9]+/gi)[0] + " - " + document.querySelector(".slidenumber").textContent.match(/[0-9]+/gi)[1];
            } else if (boo_gijun === "input") {
              new_data = document.getElementById("scopeinput_min").value.replace(/[^0-9]+/g, '') + " - " + document.getElementById("scopeinput_max").value.replace(/[^0-9]+/g, '');
            }
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('scopeslider', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('slidebox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        for (let node of update_node){ node.addEventListener(((typeof boo_gijun === "number") ? "click" : "keydown"), update_event); }

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "scopeslider", "slidebox");

      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let scopeslider_node = document.querySelectorAll('.' + mege + '_scope');
  for (let node of scopeslider_node) { node.addEventListener("click", scopeslider_event); }
}

X.prototype.oppositeslider = function (mege) {
  let instance = this;
  function oppositeslider_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('oppositeslider', mege, true, this);

      //contents
      let k = this.id.replace(/_[rc][0-9]+/gi, '');
      let man = instance.data.opposite[k];
      let v = man/2;
      if (this.textContent.slice(0, 1) === 'X') {
        v = Number(this.textContent.split(' / ')[0].slice(4));
      }
      let j = [((v/25)*(600/man)), 25, 320];
      let div = '<div class="slidebar">';
      div += '<div class="slidebackbar" id="slidebackbar2" style="background:#f9e3a8;transform:scaleX(' + String(((j[1] - j[0])/j[1]) - 0.02) + ')"></div>';
      for (let i = 0;i < j[1];i++) { div += '<p class="slidebackbarbuttons" id="slidebackbarbuttons' + String(i) + '" style="left:' + String((j[2]/j[1])*i) + 'px"></p>'; }
      div += '<p class="slidercircle" id="slidecircle1" style="transform:translateX(' + String((j[2]/j[1])*j[0]) + 'px);"></p>';
      div += '</div>';
      div += '<section class="slidenumber">';
      div += '<strong>X </strong><strong style="color:#dddddd">: </strong>';
      div += '<strong id="x_value">' + String(Math.round((25*j[0])/(600/man))) + '</strong>';
      div += '<strong style="color:#fff">--</strong><strong style="color:#dddddd"><---></strong><strong style="color:#fff">--</strong>';
      div += '<strong>Y </strong><strong style="color:#dddddd">: </strong>';
      div += '<strong id="y_value">' + String(man - Math.round((25*j[0])/(600/man))) + '</strong>';
      div += '</section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("slidebox", left, div)); }
      else { this.appendChild(instance.divmaker("slidebox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelectorAll('.slidebackbarbuttons');
        let update_node = document.querySelectorAll('.slidercircle');

        //effect
        function effect_event(e) {
          j[0] = Number(e.target.id.slice(19));
          document.getElementById("slidecircle1").style.cssText = "transform: translateX(" + String((j[2]/j[1]) * j[0]) + "px);";
          document.getElementById("slidebackbar2").style.cssText = "background:#f9e3a8;transform: scaleX(" + String(((j[1] - j[0])/j[1]) - 0.02) + ");";
          let x_spot = document.querySelector("#x_value");
          let y_spot = document.querySelector("#y_value");
          while (x_spot.firstChild) { x_spot.removeChild(x_spot.lastChild); }
          while (y_spot.firstChild) { y_spot.removeChild(y_spot.lastChild); }
          x_spot.textContent = String(Math.round((25 * j[0])/(600/man)));
          y_spot.textContent = String(man - Math.round((25 * j[0])/(600/man)));
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("mouseover", effect_event);
        }

        //update
        function update_event(e) {
          //update query
          let new_data = "X : " + document.querySelector("#x_value").textContent + " / " + "Y : " + document.querySelector("#y_value").textContent;
          instance.update_query(m, new_data);

          //update div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.new_data[0];
          instance.rowcards('oppositeslider', mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('slidebox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        //node add event
        for (let node of update_node){
          node.addEventListener("click", update_event);
        }

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "oppositeslider", "slidebox");

      })(this);
      //event on
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let oppositeslider_node = document.querySelectorAll('.' + mege + '_opposite');
  for (let node of oppositeslider_node) { node.addEventListener("click", oppositeslider_event); }
}

X.prototype.calcperiod = function (mege) {
  let instance = this;
  function calcperiod_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "INPUT" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      let to_string = this.firstChild.textContent + this.lastChild.textContent;
      instance.data_flow.past_data.unshift(to_string);
      let left = instance.rowcards('calcperiod', mege, true, this);

      //contents
      const today = new Date();
      let this_id = this.id.replace(/_[rc][0-9]+/gi, '');
      let this_arr = to_string.split(',');
      let this_var = { start: this_arr[1].split('-'), end: this_arr[2].split('-') };
      let calc = function (m1, m2) {
        let total_career = ((m2[0]*12) + m2[1]) - ((m1[0]*12) + m1[1]);
        return [ parseInt(total_career / 12), (total_career % 12) ];
      }
      let start_end = {
        start: [ Number(this_var.start[0]), Number(this_var.start[1]), Number(this_var.start[2]) ],
        end: [ Number(this_var.end[0]), Number(this_var.end[1]), Number(this_var.end[2]) ]
      };
      if (instance.data.period[this_id][0] === 'now') { start_end.start = [today.getFullYear(), (today.getMonth() + 1), today.getDate()]; }
      if (instance.data.period[this_id][1] === 'now') { start_end.end = [today.getFullYear(), (today.getMonth() + 1), today.getDate()]; }
      let div = '<section id="period_before">';
      div += '<p class="periodp periodptitle">시작일</p>';
      div += '<input type="text" class="periodinput" id="periodinput_before_y" value="' + String(start_end.start[0]) + '"><p class="periodp">년</p>';
      div += '<input type="text" class="periodinput" id="periodinput_before_m" value="' + String(start_end.start[1]) + '"><p class="periodp">월</p>';
      div += '<input type="text" class="periodinput" id="periodinput_before_d" value="' + String(start_end.start[2]) + '"><p class="periodp">일</p>';
      div += '</section>';
      div += '<section id="period_after">';
      div += '<p class="periodp periodptitle">종료일</p>';
      div += '<input type="text" class="periodinput" id="periodinput_after_y" value="' + String(start_end.end[0]) + '"><p class="periodp">년</p>';
      div += '<input type="text" class="periodinput" id="periodinput_after_m" value="' + String(start_end.end[1]) + '"><p class="periodp">월</p>';
      div += '<input type="text" class="periodinput" id="periodinput_after_d" value="' + String(start_end.end[2]) + '"><p class="periodp">일</p>';
      div += '</section>';
      div += '<section class="period_textbox"><p id="period_equal">=</p><p id="period_text">총 ' + String(calc(start_end.start, start_end.end)[0]) + '년 ' + String(calc(start_end.start, start_end.end)[1]) + '개월</p></section>';
      div += '<input type="hidden" style="display:none" id="start_val" value="' + String(start_end.start[0]) + '-' + String(start_end.start[1]) + '-' + String(start_end.start[2]) + '">';
      div += '<input type="hidden" style="display:none" id="end_val" value="' + String(start_end.end[0]) + '-' + String(start_end.end[1]) + '-' + String(start_end.end[2]) + '">';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("periodbox", left, div)); }
      else { this.appendChild(instance.divmaker("periodbox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelectorAll('.periodinput');
        let update_node = document.querySelector('#period_text');
        let cancel_node = document.querySelector('#cancel_back');

        //effect
        function effect_event(e) {
          let elements = [
            [],
            ['periodinput_before_y','periodinput_before_m','periodinput_before_d','periodinput_after_y','periodinput_after_m','periodinput_after_d','period_text','start_val','end_val']
          ];
          for (let i of elements[1]) {
            elements[0].push(document.getElementById(i));
          }
          start_end.start = [ Number(elements[0][0].value), Number(elements[0][1].value), Number(elements[0][2].value) ];
          start_end.end = [ Number(elements[0][3].value), Number(elements[0][4].value), Number(elements[0][5].value) ];
          while (elements[0][6].firstChild) { elements[0][6].removeChild(elements[0][6].lastChild); }
          elements[0][6].textContent = "총 " + String(calc(start_end.start, start_end.end)[0]) + "년 " + String(calc(start_end.start, start_end.end)[1]) + "개월";
          elements[0][7].value = String(start_end.start[0]) + '-' + String(start_end.start[1]) + '-' + String(start_end.start[2]);
          elements[0][8].value = String(start_end.end[0]) + '-' + String(start_end.end[1]) + '-' + String(start_end.end[2]);
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("keyup", effect_event);
          node.addEventListener("keydown", effect_event);
        }

        //update
        function update_event(e) {
          if ((e.target.id === "period_text" && e.type === "click") || (e.type === "keydown" && e.keyCode === 9) || (e.type === "keydown" && e.keyCode === 13)) {
            //update query
            let new_data = document.getElementById("period_text").textContent.replace(/총 /gi, '') + ',' + document.getElementById("start_val").value + ',' + document.getElementById("end_val").value;
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.appendChild(instance.exceptions().calcperiod(new_data));
            instance.rowcards('calcperiod', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('periodbox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("keydown", update_event);
        }
        update_node.addEventListener("click", update_event);

        //cancel
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.appendChild(instance.exceptions().calcperiod(instance.data_flow.past_data[0]));
          instance.rowcards('calcperiod', mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('periodbox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        //node add event
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let calcperiod_node = document.querySelectorAll('.' + mege + '_period');
  for (let node of calcperiod_node) { node.addEventListener("click", calcperiod_event); }

  //period auto update
  if (mege === 'trs') {
    async function period_auto_update(m) {
      const today = new Date();
      let this_arr = m.textContent.split(',');
      let this_var = { start: this_arr[1].split('-'), end: this_arr[2].split('-') };
      let calc = function (m1, m2) {
        let total_career = ((m2[0]*12) + m2[1]) - ((m1[0]*12) + m1[1]);
        return [ parseInt(total_career / 12), (total_career % 12) ];
      }
      let start_end = {
        start: [ Number(this_var.start[0]), Number(this_var.start[1]), Number(this_var.start[2]) ],
        end: [ Number(this_var.end[0]), Number(this_var.end[1]), Number(this_var.end[2]) ]
      };
      if (instance.toggle.calcperiod === 0) {
        let this_id = m.id.replace(/_r[0-9]+/gi, '');
        if (instance.data.period[this_id][0] === 'now') { start_end.start = [today.getFullYear(), (today.getMonth() + 1), today.getDate()]; }
        if (instance.data.period[this_id][1] === 'now') { start_end.end = [today.getFullYear(), (today.getMonth() + 1), today.getDate()]; }
      }
      this_arr[1] = String(start_end.start[0]) + '-' + String(start_end.start[1]) + '-' + String(start_end.start[2]);
      this_arr[2] = String(start_end.end[0]) + '-' + String(start_end.end[1]) + '-' + String(start_end.end[2]);
      let new_data = String(calc(start_end.start, start_end.end)[0]) + '년 ' + String(calc(start_end.start, start_end.end)[1]) + '개월' + ',' + this_arr[1] + ',' + this_arr[2];
      if (instance.toggle.calcperiod === 0) {
        //ajax update
        let update_query = 'c=' + (m.id.replace(/_r[0-9]+/gi, '')) + '&v=' + new_data + '&i=' + document.getElementById(instance.data.standard + /_r[0-9]+/gi.exec(m.id)[0]).textContent + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;
        let msg = await X.ajax("/post_update", update_query);
        console.log(msg);
      }
      //update
      while (m.firstChild) { m.removeChild(m.lastChild); }
      m.appendChild(instance.exceptions().calcperiod(new_data));
    }

    setTimeout(function () {
      let current_row = document.querySelectorAll('.rowdiv');
      const rows_length = current_row.length - 100;
      let period_rows = {};
      for (let j in instance.data.period) {
        period_rows[j] = [];
      }
      for (let j in instance.data.period) {
        for (let i = 0;i < rows_length;i++) {
          period_rows[j].push(current_row[i].querySelector('.' + j));
          period_auto_update(period_rows[j][i]);
        }
      }
      instance.toggle.calcperiod++;
    }, 0);
  }
}

X.prototype.multiplesel = function (mege) {
  let instance = this;
  function multiplesel_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.nodeName !== "LABEL" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('multiplesel', mege, true, this);

      //contents
      let this_col = this.id.replace(/_[rc][0-9]+/gi, '');
      let j = 1;
      let this_arr = this.textContent.split(',');
      let this_val = '';
      for (let i of this_arr) {
        this_val += i + ',';
      }
      let div = '';
      for (let i of instance.data.multiple[this_col]) {
        div += '<input type="checkbox" value="' + i + '" id="' + this.id + "_val" + String(j) + ((this_arr.indexOf(i) === -1) ? '">' : '" checked>');
        div += '<label class="multiplebox_label" for="' + this.id + "_val" + String(j) + '"><section>' + i + '</section></label>';
        j++;
      }
      div += '<div class="multiplebox_buttons">Save&nbsp;&nbsp;<strong style="color:#dddddd">|</strong>&nbsp;&nbsp;Cancel<p id="multiplebox_save"></p><p id="multiplebox_cancel"></p></div>';
      div += '<input type="hidden" class="multiplebox_value" value="' + this_val.slice(0, -1) + '">';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("multiplebox", left, div)); }
      else { this.appendChild(instance.divmaker("multiplebox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelectorAll('#multiplebox input[type=checkbox]');
        let update_node = document.querySelector('#multiplebox_save');

        //effect
        function effect_event(e) {
          let check_array = document.querySelectorAll('#multiplebox input[type=checkbox]');
          let total_string = '';
          for (let node of check_array) {
            if (node.checked) { total_string += node.value + ','; }
          }
          total_string = total_string.slice(0, -1);
          document.querySelector('.multiplebox_value').value = total_string;
        }
        //node add event
        for (let node of effect_node){
          node.addEventListener("change", effect_event);
        }

        //update
        function update_event(e) {
          //update query
          let new_data = document.querySelector('.multiplebox_value').value;
          instance.update_query(m, new_data);

          //update div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.new_data[0];
          instance.rowcards('multiplesel', mege, false, m);
          m.style.cssText = "overflow: hidden;";

          //finishing
          instance.data_flow.onoff_c = 0;
          m.c = instance.data_flow.onoff_c;
          if (document.getElementById('cancel_back')) {
            document.getElementById('cancel_back').remove();
            document.getElementById('multiplebox').remove();
          }
          if (e.cancelable) { e.preventDefault(); }
        }
        //node add event
        update_node.addEventListener("click", update_event);

        //cancel
        let cancel_node = document.querySelectorAll('#cancel_back,#multiplebox_cancel');
        instance.cancel_event(cancel_node, m, mege, "multiplesel", "multiplebox");

      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let multiplesel_node = document.querySelectorAll('.' + mege + '_multiple');
  for (let node of multiplesel_node) { node.addEventListener("click", multiplesel_event); }
}

X.prototype.arraymaker = function (mege) {
  let instance = this;
  function arraymaker_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "IMG" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.nodeName !== "LABEL" && e.target.id !== "cancel_back" && this.c === 0) {
      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('arraymaker', mege, true, this);

      //contents
      let this_col = this.id.replace(/_[rc][0-9]+/gi, '');
      let this_arr = this.textContent.split(' ');

      let div = '';
      for (let text of this_arr) { div += '<section class="arrayitems"><textarea class="rowinput rowinputarray">' + text + '</textarea></section>'; }
      div += '<section id="array_update"><img id="array_upimg" src="/list_svg/checkicon1.svg"></section>';
      div += '<section id="array_plus"><img id="array_img" src="/list_svg/create_row1.svg"></section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("arraybox", left, div)); }
      else { this.appendChild(instance.divmaker("arraybox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelector('#array_img');
        let delete_node = document.querySelectorAll('.rowinputarray');
        let update_node = document.querySelector('#array_update');

        //delete
        function delete_event(e) {
          if (e.target.nodeName === "TEXTAREA"){ e.target.parentElement.remove(); }
          else if (e.target.nodeName === "SECTION") { e.target.remove(); }
          e.preventDefault();
        }
        //node add event
        for (let node of delete_node) { node.addEventListener("contextmenu", delete_event); }

        //update
        function update_event(e) {
          if ((e.type === "click" && this.id === "array_update") || (e.type === "keydown" && (e.keyCode === 13 || e.keyCode === 9))) {
            //update query
            let arr_vals = document.querySelectorAll('.rowinputarray');
            let new_data = "";
            for (let node of arr_vals) { new_data += node.value.replace(/ /g, "") + " "; }
            new_data = new_data.slice(0, -1);
            instance.update_query(m, new_data);

            //update div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.new_data[0];
            instance.rowcards('arraymaker', mege, false, m);
            m.style.cssText = "overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('arraybox').remove();
            }
            if (e.cancelable) { e.preventDefault(); }
          }
        }
        //node add event
        update_node.addEventListener("click", update_event);
        for (let node of delete_node) { node.addEventListener("keydown", update_event); }

        //effect
        function effect_event(e) {
          let array_section = document.createElement('SECTION');
          let array_textarea = document.createElement('TEXTAREA');
          let array_update = document.getElementById('array_update');
          array_section.classList.add("arrayitems");
          array_textarea.classList.add("rowinput");
          array_textarea.classList.add("rowinputarray");
          array_section.appendChild(array_textarea);
          document.getElementById('arraybox').insertBefore(array_section, array_update);
          array_textarea.addEventListener("contextmenu", delete_event);
          array_textarea.addEventListener("keydown", update_event);
        }
        //node add event
        effect_node.addEventListener("click", effect_event);

        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "arraymaker", "arraybox");

      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let arraymaker_node = document.querySelectorAll('.' + mege + '_array');
  for (let node of arraymaker_node) { node.addEventListener("click", arraymaker_event); }
}

X.prototype.objectmaker = function (mege) {
  let instance = this;
  function objectmaker_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "IMG" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('objectmaker', mege, true, this);

      //contents
      let this_col = this.id.replace(/_[rc][0-9]+/gi, '');
      let this_object_raw = instance.data.objectmaker[this_col];
      let this_object_count = this_object_raw.length;
      let this_arr = this.textContent.split(' / ');
      let obj_reg, h, boo;
      let this_items = [];
      for (let i = 0; i < this_object_count; i++) {
        h = '';
        if (typeof this_object_raw[i][1] === 'string') {
          obj_reg = new RegExp(this_object_raw[i][0] + ' ', 'g')
          this_items.push(this_arr[i].replace(obj_reg, ''));
          boo = false;
        } else {
          for (let items of this_object_raw[i][1]) {
            obj_reg = new RegExp(items + '$', 'g');
            if (this_arr[i].match(obj_reg)) { h = this_arr[i].match(obj_reg)[0]; this_items.push(h); }
          }
          boo = true;
        }
      }
      let div = '';
      for (let i = 0; i < this_object_count; i++) {
        div += '<section class="objectitems" style="' + ((mege === 'tcs') ? 'margin-bottom:9px;' : '') + '">';
        div += '<section class="objectitem_x" style="' + ((boo) ? '' : 'overflow:hidden;') + ((mege === 'tcs') ? 'height:31px;' : '') + '">' + this_object_raw[i][0] + '</section>';
        div += '<section class="objectitem_y" style="' + ((boo) ? '' : 'overflow:hidden;') + ((mege === 'tcs') ? 'height:31px;' : '') + '">';
        if (boo) {
          div += this_items[i];
          div += '<label for="objectitem_y_input' + String(i) + '"></label>';
          div += '<input class="objectitem_y_input switch" id="objectitem_y_input' + String(i) + '" name="objectitem_y_input' + String(i) + '" type="checkbox">';
          div += '<section class="objectitem_y_items">';
          for (let items of this_object_raw[i][1]) { div += '<section class="objectitem_y_items_detail">' + items + '</section>'; }
          div += '</section>';
        } else {
          div += '<textarea class="objectitem_y_text">' + this_items[i] + '</textarea>';
        }
        div += '</section>';
        div += '</section>';
      }

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("objectbox", left, div)); }
      else { this.appendChild(instance.divmaker("objectbox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = ((boo) ? document.querySelectorAll('.objectitem_y_items_detail') : document.querySelectorAll('.objectitem_y_text'));
        if (boo) {
          //effect
          function effect_event(e) {
            let brother = this.parentElement.parentElement;
            brother.removeChild(brother.firstChild);
            brother.insertAdjacentText('afterbegin', this.textContent);
            brother.childNodes[2].checked = false;
            let new_data = '';
            for (let node of document.querySelectorAll('.objectitems')) {
              new_data += node.firstElementChild.textContent;
              new_data += ' ';
              new_data += node.lastElementChild.childNodes[0].textContent;
              new_data += ' / ';
            }
            new_data = new_data.slice(0,-3);
            let mother = m;
            mother.removeChild(mother.childNodes[0]);
            mother.insertAdjacentText('afterbegin', new_data);
            instance.update_query(m, new_data);
            instance.data_flow.past_data.unshift(new_data);
          }
          //node add event
          for (let node of effect_node) { node.addEventListener("click", effect_event); }
        } else {
          //update
          function update_event(e) {
            if (e.keyCode === 13 || e.keyCode === 9) {
              let new_data = '';
              for (let node of document.querySelectorAll('.objectitems')) {
                new_data += node.firstElementChild.textContent;
                new_data += ' ';
                new_data += node.lastElementChild.firstElementChild.value;
                new_data += ' / ';
              }
              new_data = new_data.slice(0,-3);
              let mother = m;
              mother.removeChild(mother.childNodes[0]);
              mother.insertAdjacentText('afterbegin', new_data);
              instance.update_query(m, new_data);
              instance.data_flow.past_data.unshift(new_data);
              e.preventDefault();
            }
          }
          effect_node[0].focus();
          //node add event
          for (let node of effect_node) { node.addEventListener("keydown", update_event); }
        }
        //cancel
        let cancel_node = document.querySelectorAll("#cancel_back");
        instance.cancel_event(cancel_node, m, mege, "objectmaker", "objectbox");
      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let objectmaker_node = document.querySelectorAll('.' + mege + '_object');
  for (let node of objectmaker_node) { node.addEventListener("click", objectmaker_event); }

}

//-------------------------------------------------------- White cards

X.prototype.whitepopup = function (fu) {
  return function () {
    console.log(this);
    let h = document.createDocumentFragment();
    let canceldiv = document.createElement("DIV");
    let contentsdiv = canceldiv.cloneNode(true);
    canceldiv.id = 'cancel_back_card';
    contentsdiv.id = 'cardviewbox';
    h.appendChild(canceldiv);
    h.appendChild(contentsdiv);
    let cardmain = document.getElementById('cardmain');
    document.getElementById('card_on_switch').checked = true;
    while (cardmain.firstChild) { cardmain.removeChild(cardmain.lastChild); }
    cardmain.appendChild(h);
    fu(this);
  }
}

X.prototype.whitepopdown = function (mege, fu) {
  let instance = this;
  return function () {
    document.getElementById('card_on_switch').checked = false;
    instance.data_flow.onoff_c = 0;
    // instance.ajaxfunc();
    fu(mege);
    if(document.querySelector("#cardviewbox")) { document.getElementById("cardviewbox").remove(); }
    if(document.querySelector("#cancel_back_card")) { document.getElementById("cancel_back_card").remove(); }
  };
}

X.prototype.cardview = function () {
  let instance = this;
  console.log('card view install success');

  //card maker
  function card_maker(mege) {
    let bloo = 0;
    let classes = '';
    let card_col = '';
    let card_id = '';
    let excep = '';

    //Fragments
    let h_loop1 = document.createDocumentFragment();
    let h_loop2 = document.createDocumentFragment();
    let h_loop3 = document.createDocumentFragment();

    //elements
    let h_input = document.createElement('INPUT');
    let h_section = document.createElement('SECTION');
    let h_p = document.createElement('P');
    let h_div = document.createElement('DIV');
    let h_img = document.createElement('IMG');

    //clones
    let h_input_clone, h_section_clone, h_p_clone, h_div_clone, h_img_clone;
    let div_classes = '';
    for (let i of mege) {
      card_col = i.id.replace(/_r[0-9]+/gi, '');
      card_id = card_col + (/_r[0-9]+/gi.exec(i.id)[0]).replace(/_r/, '_c');
      if (instance.data.colleft[/([a-z][0-9]+_[^ ]+)/i.exec(i.className)[0]]) {
        classes = 'cards';
        bloo = instance.data.colleft[/([a-z][0-9]+_[^ ]+)/i.exec(i.className)[0]];
        if (bloo < 111) { classes += ' cardwidth1'; }
        else if (111 <= bloo && bloo < 222) { classes += ' cardwidth2'; }
        else if (222 <= bloo) { classes += ' cardwidth3'; }

        //make clone
        h_input_clone = h_input.cloneNode(true);
        h_input_clone.setAttribute('type', 'checkbox');
        h_input_clone.checked = true;
        h_input_clone.className = "cards_input";
        h_input_clone.id = card_id + "_input";
        h_section_clone = h_section.cloneNode(true);
        h_section_clone.className = classes;
        h_p_clone = h_p.cloneNode(true);
        h_p_clone.className = "cardcolumns";
        h_p_clone.textContent = instance.data.colcol[i.id.replace(/_r[0-9]+/gi, '')];
        h_div_clone = h_div.cloneNode(true);
        h_div_clone.id = card_id;

        //main contents div
        div_classes = i.className.replace(/( [a-z][0-9]+_[^ ]+)/gi, '');
        div_classes = div_classes.replace(/rows/gi, '');
        div_classes = div_classes.replace(/trs/gi, 'tcs');
        h_div_clone.className = "cardcontents" + div_classes;
        if (instance.exceptions().exceptionlist.indexOf(card_col) === -1) {
          h_div_clone.textContent = i.textContent;
        } else {
          excep = instance.exceptions().calcperiod(i.firstChild.textContent + i.lastChild.textContent);
          h_div_clone.appendChild(excep);
        }

        //append
        h_section_clone.appendChild(h_p_clone);
        h_section_clone.appendChild(h_div_clone);
        h_loop1.appendChild(h_input_clone);
        h_loop1.appendChild(h_section_clone);
      } else if (instance.data.coltitle[i.id.replace(/_r[0-9]+/gi, '')]) {
        //title main
        h_p_clone = h_p.cloneNode(true);
        h_p_clone.className = "cardtitle_main " + i.id.replace(/_r/gi, '_ctitle');
        h_p_clone.textContent = i.textContent;
        h_loop2.appendChild(h_p_clone);
      } else {
        //title sub
        h_p_clone = h_p.cloneNode(true);
        h_p_clone.className = "cardtitle_sub " + i.id.replace(/_r/gi, '_ctitle');
        h_p_clone.textContent = i.textContent;
        h_loop3.appendChild(h_p_clone);
      }
    }
    //create main container
    let h = document.createDocumentFragment();
    let h_title = h_section.cloneNode(true);
    let h_contents = h_section.cloneNode(true);
    h_title.className = "cardtitle";
    h_contents.className = "carddata";

    //make clone 1
    h_img_clone = h_img.cloneNode(true);
    h_img_clone.className = "cardtitle_img1";
    h_img_clone.src = "/list_svg/triangle1.svg";
    h_title.appendChild(h_img_clone);

    //make clone 2
    h_div_clone = h_div.cloneNode(true);
    h_div_clone.className = "cardtitle_white";
    h_div_clone.appendChild(h_loop2);
    h_div_clone.appendChild(h_loop3);
    h_title.appendChild(h_div_clone);

    //make clone 3
    h_img_clone = h_img.cloneNode(true);
    h_img_clone.className = "cardtitle_img2";
    h_img_clone.src = "/list_svg/triangle2.svg";
    h_title.appendChild(h_img_clone);

    //append
    h.appendChild(h_title);
    h_contents.appendChild(h_loop1);
    h.appendChild(h_contents);

    let cardview_node = document.getElementById('cardviewbox');
    while (cardview_node.firstChild) { cardview_node.removeChild(cardview_node.lastChild); }
    cardview_node.appendChild(h);
  }

  //card remove
  function end_card(mege) {
    let end_node = document.getElementById('cancel_back_card');
    let end_card_event = instance.whitepopdown(mege, function (m) {
      let current = 'row' + /_r[0-9]+/.exec(m[0].id)[0].replace(/_r/, '');
      instance.grayfocus(false, document.getElementById(current).childNodes[1]);
    });
    end_node.addEventListener('click', end_card_event, { capture: false, once: true, passive: false });
  }

  //card move
  function move_buttons(mege) {
    function move_buttons_event(e) {
      //cancel reload
      let end_node = document.getElementById('cancel_back_card');
      end_node.remove();
      let h = document.createDocumentFragment();
      let canceldiv = document.createElement("DIV");
      canceldiv.id = 'cancel_back_card';
      h.appendChild(canceldiv);
      //appending reloaded cancel back
      let cardmain = document.getElementById('cardmain');
      cardmain.insertBefore(h, cardmain.firstChild);

      let row_past = document.getElementById('row' + String(mege));
      let row;
      if (e.target.className === 'cardtitle_img1') { row = row_past.previousElementSibling; }
      else { row = row_past.nextElementSibling; }
      let id_num = 1;
      if (row) {
        id_num = Number(row.id.slice(3));
        if (row.childNodes[1].textContent === "") { id_num = mege }
      };
      if (!row || row.childNodes[1].textContent === "") {
        let row_past_null = row_past.cloneNode(true);
        row_past_null.removeChild(row_past_null.firstChild);
        let rownull = row_past_null.childNodes;
        setTimeout(function () {
          end_card(rownull);
        }, 0);
        return 'exit';
      }
      let row_past_total = row_past.cloneNode(true);
      row_past_total.removeChild(row_past_total.firstChild);
      let row_total = row.cloneNode(true);
      row_total.removeChild(row_total.firstChild);
      let rowrow = row_total.childNodes;
      setTimeout(function () {
        card_maker(rowrow);
        instance.ajaxcall('tcs');
        end_card(rowrow);
      }, 0);
      setTimeout(function () {
        if (document.querySelector('.' + Object.keys(instance.data.coltitle)[0] + '_ctitle' + String(id_num)) !== null) {
          move_buttons(id_num);
          instance.grayfocus(false, row_past_total.firstElementChild, false);
          instance.grayfocus(true, row_total.firstElementChild, false);
        }
      }, 0);
    }
    let move_buttons_node = document.querySelectorAll('.cardtitle_img1,.cardtitle_img2');
    for (let node of move_buttons_node) { node.addEventListener("click", move_buttons_event); }
  }

  //pop up event
  let pop_event = this.whitepopup(function (mege) {
    let row = document.getElementById(mege.parentElement.childNodes[1].id.replace(/_init/gi, ''));
    let row_total = row.parentElement.cloneNode(true);
    row_total.removeChild(row_total.firstChild);
    let rowrow = row_total.childNodes;
    instance.grayfocus(true, row);
    setTimeout(function () {
      card_maker(rowrow);
      instance.ajaxcall('tcs');
      end_card(rowrow);
      move_buttons(Number(/_r[0-9]+/.exec(rowrow[0].id)[0].slice(2)));
    }, 0);
  });
  let name_nodes = document.querySelectorAll('.rowdiv_init_title');
  for (let node of name_nodes) { node.addEventListener('click', pop_event); }
}

X.prototype.createview = function () {
  let instance = this;
  function card_maker() {
    let bloo = 0;
    let classes = '';
    let card_col = '';
    let card_id = '';
    let h2 = '';
    let excep = '';

    //Fragments
    let h_loop1 = document.createDocumentFragment();
    let h_loop2 = document.createDocumentFragment();
    let h_loop3 = document.createDocumentFragment();

    //elements
    let h_input = document.createElement('INPUT');
    let h_section = document.createElement('SECTION');
    let h_p = document.createElement('P');
    let h_div = document.createElement('DIV');
    let h_img = document.createElement('IMG');

    //clones
    let h_input_clone, h_section_clone, h_p_clone, h_div_clone, h_img_clone, h_placeholder;
    let div_classes = '';
    for (let i of instance.data.colcol_arr) {
      card_col = i;
      card_id = card_col + '_c0';

      if (instance.data.colleft[i]) {
        classes = 'cards';
        bloo = instance.data.colleft[i];
        if (bloo < 111) { classes += ' cardwidth1'; }
        else if (111 <= bloo && bloo < 222) { classes += ' cardwidth2'; }
        else if (222 <= bloo) { classes += ' cardwidth3'; }

        //make clone
        h_input_clone = h_input.cloneNode(true);
        h_input_clone.setAttribute('type', 'checkbox');
        h_input_clone.checked = true;
        h_input_clone.className = "cards_input";
        h_input_clone.id = card_id + "_input";

        h_section_clone = h_section.cloneNode(true);
        h_section_clone.className = classes;
        h_p_clone = h_p.cloneNode(true);
        h_p_clone.className = "cardcolumns";
        h_p_clone.textContent = instance.data.colcol[i];
        h_div_clone = h_div.cloneNode(true);
        h_div_clone.id = card_id;

        //main contents div
        h2 = '';
        if (instance.data.long.indexOf(i) !== -1) { h2 += ' text tcs_long'; }
        else if (instance.data.longplus.indexOf(i) !== -1) { h2 += ' text tcs_longplus'; }
        else if (instance.data.short.indexOf(i) !== -1) { h2 += ' text tcs_short'; }
        // short replace
        else if (instance.data.eashort.hasOwnProperty(i)) { h2 += ' text tcs_short'; }
        else if (instance.data.menu.hasOwnProperty(i)) { h2 += ' tcs_menu'; }
        else if (instance.data.calendar.indexOf(i) !== -1) { h2 += ' tcs_calendar'; }
        else if (instance.data.calendarplus.hasOwnProperty(i)) { h2 += ' tcs_calendarplus'; }
        else if (instance.data.slide.hasOwnProperty(i)) { h2 += ' tcs_slide'; }
        else if (instance.data.scope.hasOwnProperty(i)) { h2 += ' tcs_scope'; }
        else if (instance.data.opposite.hasOwnProperty(i)) { h2 += ' tcs_opposite'; }
        else if (instance.data.period.hasOwnProperty(i)) { h2 += ' tcs_period'; }
        else if (instance.data.multiple.hasOwnProperty(i)) { h2 += ' tcs_multiple'; }
        else if (instance.data.arraymaker.indexOf(i) !== -1) { h2 += ' tcs_array'; }
        // short replace
        else if (instance.data.objectmaker.hasOwnProperty(i)) { h2 += ' text tcs_short'; }
        // short replace
        else { h2 += ' text tcs_short'; }
        h_div_clone.className = "cardcontents" + h2;
        h_div_clone.textContent = "";

        //append
        h_section_clone.appendChild(h_p_clone);
        h_section_clone.appendChild(h_div_clone);
        h_loop1.appendChild(h_input_clone);
        h_loop1.appendChild(h_section_clone);
      } else if (instance.data.coltitle[i]) {
        //title main
        h_placeholder = document.getElementById(i + '_init_r1');
        h_input_clone = h_input.cloneNode(true);
        h_input_clone.className = "cardtitle_main";
        h_input_clone.id = "cardtitle_main_create";
        h_input_clone.setAttribute('type', 'text');
        h_input_clone.setAttribute('placeholder', h_placeholder.textContent);
        h_loop2.appendChild(h_input_clone);
      } else {
        //title sub
        h_placeholder = document.getElementById(i + '_init_r1');
        h_input_clone = h_input.cloneNode(true);
        h_input_clone.className = "cardtitle_sub";
        h_input_clone.id = "cardtitle_sub_create";
        h_input_clone.setAttribute('type', 'text');
        h_input_clone.setAttribute('placeholder', h_placeholder.textContent);
        h_loop3.appendChild(h_input_clone);
      }
    }
    //create main container
    let h = document.createDocumentFragment();
    let h_title = h_section.cloneNode(true);
    let h_contents = h_section.cloneNode(true);
    h_title.className = "cardtitle";
    h_contents.className = "carddata";

    h_div_clone = h_div.cloneNode(true);
    h_div_clone.className = "cardtitle_white";
    h_div_clone.appendChild(h_loop2);
    h_div_clone.appendChild(h_loop3);
    h_title.appendChild(h_div_clone);

    h_img_clone = h_img.cloneNode(true);
    h_img_clone.className = "cardtitle_img3";
    h_img_clone.src = "/list_svg/create_row1.svg";
    h_title.appendChild(h_img_clone);

    //append
    h.appendChild(h_title);
    h_contents.appendChild(h_loop1);
    h.appendChild(h_contents);

    let cardview_node = document.getElementById('cardviewbox');
    while (cardview_node.firstChild) { cardview_node.removeChild(cardview_node.lastChild); }
    cardview_node.appendChild(h);
    let create_standard = '<div id="' + instance.data.standard + '_r0" style="display:none;">__create__</div>';
    cardview_node.insertAdjacentHTML('beforeend', create_standard);

    setTimeout(function () {
      instance.ajaxcall('tcs');
      let create_icon = document.querySelector('.cardtitle_img3');
      create_icon.addEventListener('click', async function (e) {
        let this_standard = document.querySelector('#cardtitle_sub_create').value;
        let this_title = document.querySelector('#cardtitle_main_create').value;
        let col_title, col_init, col_con, col_arr, val_title, val_init, val_con, val_arr;
        for (let i of instance.data.colinit_arr) {
          if (instance.data.coltitle.hasOwnProperty(i)) { col_title = i + ','; }
          else { col_init = i + ','; }
        }
        col_con = '';
        for (let i of instance.data.colleft_arr) { col_con += i + ','; }
        col_arr = col_title + col_init + col_con.slice(0,-1);
        for (let i of instance.data.colinit_arr) {
          if (instance.data.coltitle.hasOwnProperty(i)) { val_title = this_title + ","; }
          else { val_init = this_standard + ","; }
        }
        val_con = '';
        for (i of instance.data.colleft_arr) { val_con += document.getElementById(i + '_c0').textContent + ","; }
        val_arr = val_title + val_init + val_con.slice(0,-1);
        let create_query = 'title=' + instance.data.dbtitle + '&col_arr=' + col_arr + '&val_arr=' + val_arr;
        await X.ajax('/post_create', create_query);
        end_card_event();
        window.location.reload();
      });
    }, 0);
  }

  let end_card_event = instance.whitepopdown('callbacks', async function (m) {
    console.log(m);
    document.getElementById('grayfocus_switch').checked = false;
    document.getElementById('create_on_switch').checked = false;
    let delete_query = 'title=' + instance.data.dbtitle + '&v=__create__';
    let ajax_data = await X.ajax('/post_delete', delete_query);
    console.log('create out');
  });

  let view_on = this.whitepopup(async function () {
    let create_query = 'title=' + instance.data.dbtitle + '&col_arr=' + instance.data.standard + '&val_arr=__create__';
    let ajax_data = await X.ajax('/post_create', create_query);
    console.log('create in');
    document.getElementById('grayfocus_switch').checked = true;
    document.getElementById('create_on_switch').checked = true;
    setTimeout(function () {
      card_maker();
      let end_node = document.getElementById('cancel_back_card');
      end_node.addEventListener('click', function (e) {
        end_card_event();
        window.location.reload();
      }, { capture: false, once: true, passive: false });
    }, 0);
  });

  let icon = document.querySelector('.create_row');
  icon.addEventListener('click', function (e) { view_on(); });
}

X.prototype.secondview = function () {
  let instance = this;
  function card_maker() {
    let h = document.createDocumentFragment();
    let div = document.createElement('DIV');
    let iframe = document.createElement('IFRAME');
    let div_clone, iframe_clone;

    iframe_clone = iframe.cloneNode(true);
    iframe_clone.id = 'secondviewbox';
    iframe_clone.setAttribute("src", "/second/" + instance.data.dbtitle);
    h.appendChild(iframe_clone);

    let cardview_node = document.getElementById('cardviewbox');
    while (cardview_node.firstChild) { cardview_node.removeChild(cardview_node.lastChild); }
    cardview_node.appendChild(h);
  }
  let end_card_event = this.whitepopdown('callbacks', function (m) {
    document.getElementById('grayfocus_switch').checked = false;
    document.getElementById('create_on_switch').checked = false;
  });
  let view_on = this.whitepopup(function () {
    document.getElementById('grayfocus_switch').checked = true;
    document.getElementById('create_on_switch').checked = true;
    setTimeout(function () {
      card_maker();
      let end_node = document.getElementById('cancel_back_card');
      end_node.addEventListener('click', function (e) {
        end_card_event();
      }, { capture: false, once: true, passive: false });
    }, 0);
  });

  let icon = document.querySelector('.second_view');
  icon.addEventListener('click', function (e) { view_on(); });
}

//-------------------------------------------------------- Ajax about (event_api use : ajaxcall)

X.prototype.ajaxcall = function (mege) {
  let instance = this;
  if (document.querySelector('.' + mege + '_long') !== null) { this.longtext(mege); }
  if (document.querySelector('.' + mege + '_longplus') !== null) { this.longtextplus(mege); }
  if (document.querySelector('.' + mege + '_short') !== null) { this.shorttext(mege); }
  if (document.querySelector('.' + mege + '_eashort') !== null) { this.eashort(mege); }
  if (document.querySelector('.' + mege + '_menu') !== null) { this.menubar(mege); }
  if (document.querySelector('.' + mege + '_calendar') !== null) { this.calendar(mege); }
  if (document.querySelector('.' + mege + '_calendarplus') !== null) { this.calendarplus(mege); }
  if (document.querySelector('.' + mege + '_slide') !== null) { this.basicslider(mege); }
  if (document.querySelector('.' + mege + '_scope') !== null) { this.scopeslider(mege); }
  if (document.querySelector('.' + mege + '_opposite') !== null) { this.oppositeslider(mege); }
  if (document.querySelector('.' + mege + '_period') !== null) { this.calcperiod(mege); }
  if (document.querySelector('.' + mege + '_multiple') !== null) { this.multiplesel(mege); }
  if (document.querySelector('.' + mege + '_array') !== null) { this.arraymaker(mege); }
  if (document.querySelector('.' + mege + '_object') !== null) { this.objectmaker(mege); }
  if (instance.toggle.onetimefuncs === 0) {
    this.createview();
    this.secondview();
    this.columns_moving(".columnobj");
    instance.toggle.onetimefuncs++;
  }
  for (let callback_functions of instance.callbacks) { callback_functions(instance, mege); }
  if (mege === 'trs') {
    instance.cardview();
    instance.sortrow();
    document.getElementById('coloring_switch').checked = true;
    instance.colorpalettes('init');
  }
}

X.prototype.ajaxajax = async function (mege) {
  let instance = this;
  await X.ajax("/session_color", mege);
  const rows = JSON.parse(await X.ajax("/post_select", mege));
  let rowsOrder = await X.ajax("/session_on", "title=" + this.data.dbtitle + "&method=order");
  let table_standard = this.data.standard;
  let order_colinit = this.data.colinit_arr;
  let order_coltitle = this.data.coltitle;
  let order_colleft = this.data.colleft_arr;
  let order_colcol = this.data.colcol_arr;
  let dom_objs = [];
  let temp, fragle, div_clone, div_clone2, div_clone3;
  if (rowsOrder !== "nothing") {
    rowsOrder = JSON.parse(rowsOrder);
    order_colleft = rowsOrder;
    order_colcol = order_colinit.concat(rowsOrder);
  }
  fragle = document.createDocumentFragment();
  for (let i = 0; i < rows.length + 100; i++) {
    div_clone = X.nodes.div.cloneNode(true);
    div_clone.id = `row${String(i+1)}_init`;
    div_clone.classList.add(`rowdiv_init`);
    if (i < rows.length) {
      div_clone.classList.add(('id_' + rows[i][table_standard]).replace(/[-]/gi, ''));
    }
    div_clone2 = X.nodes.div.cloneNode(true);
    div_clone2.id = `rowdiv_back${String(i+1)}_init`;
    div_clone2.style.display = `none`;
    div_clone2.classList.add(`rowdiv_init_back`);
    div_clone.appendChild(div_clone2);
    for (let r of order_colinit) {
      div_clone2 = X.nodes.div.cloneNode(true);
      div_clone2.id = `${r}_init_r${String(i+1)}`;
      div_clone2.classList.add(`${r}_init`);
      temp = (order_coltitle.hasOwnProperty(r)) ? "rowdiv_init_title" : "rowdiv_init_id";
      div_clone2.classList.add(temp);
      div_clone2.textContent = (i < rows.length) ? rows[i][r] : '';
      div_clone.appendChild(div_clone2);
    }
    fragle.appendChild(div_clone);
  }
  dom_objs.push(fragle);

  fragle = document.createDocumentFragment();
  for (let i = 0; i < rows.length + 100; i++) {
    div_clone = X.nodes.div.cloneNode(true);
    div_clone.id = `row${String(i+1)}`;
    div_clone.classList.add(`rowdiv`);
    div_clone2 = X.nodes.div.cloneNode(true);
    div_clone2.id = `rowdiv_back${String(i+1)}`;
    div_clone2.style.display = `none`;
    div_clone2.classList.add(`rowdiv_back`);
    for (let r of order_colleft) {
      div_clone3 = X.nodes.div.cloneNode(true);
      div_clone3.id = `${r}_back${String(i+1)}`;
      div_clone3.classList.add(`rows_back`);
      div_clone3.classList.add(`${r}_back`);
      div_clone2.appendChild(div_clone3);
    }
    div_clone.appendChild(div_clone2);
    for (let r of order_colcol) {
      div_clone2 = X.nodes.div.cloneNode(true);
      div_clone2.id = `${r}_r${String(i+1)}`;
      div_clone2.classList.add(`rows`);
      div_clone2.classList.add(r);
      //long text
      if (instance.data.long.indexOf(r) !== -1) {
        div_clone2.classList.add(`textrows`);
        div_clone2.classList.add(`trs_long`);
      //longplus text
      } else if (instance.data.longplus.indexOf(r) !== -1) {
        div_clone2.classList.add(`textrows`);
        div_clone2.classList.add(`trs_longplus`);
      //short text
      } else if (instance.data.short.indexOf(r) !== -1) {
        div_clone2.classList.add(`textrows`);
        div_clone2.classList.add(`trs_short`);
      //eashort text
      } else if (instance.data.eashort.hasOwnProperty(r)) {
        div_clone2.classList.add(`textrows`);
        div_clone2.classList.add(`trs_eashort`);
      //menu
      } else if (instance.data.menu.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_menu`);
      //calendar
      } else if (instance.data.calendar.indexOf(r) !== -1) {
        div_clone2.classList.add(`trs_calendar`);
      //calendarplus basic
      } else if (instance.data.calendarplus.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_calendarplus`);
      //slide basic
      } else if (instance.data.slide.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_slide`);
      //slide scope
      } else if (instance.data.scope.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_scope`);
      //slide opposite
      } else if (instance.data.opposite.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_opposite`);
      //calc period
      } else if (instance.data.period.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_period`);
      //multiple selection
      } else if (instance.data.multiple.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_multiple`);
      //array maker
      } else if (instance.data.arraymaker.indexOf(r) !== -1) {
        div_clone2.classList.add(`trs_array`);
      //object maker
      } else if (instance.data.objectmaker.hasOwnProperty(r)) {
        div_clone2.classList.add(`trs_object`);
      }
      div_clone2.textContent = (i < rows.length) ? rows[i][r] : '';
      div_clone.appendChild(div_clone2);
    }
    fragle.appendChild(div_clone);
  }
  dom_objs.push(fragle);

  fragle = document.createDocumentFragment();
  for (let i of order_colinit) {
    div_clone = X.nodes.div.cloneNode(true);
    div_clone.id = `${i}_col`;
    div_clone.classList.add(`${i}_init`);
    div_clone.classList.add(`columnobjinit`);
    div_clone.textContent = instance.data.colcol[i];
    fragle.appendChild(div_clone);
  }
  dom_objs.push(fragle);

  fragle = document.createDocumentFragment();
  for (let i of order_colleft) {
    div_clone = X.nodes.div.cloneNode(true);
    div_clone.id = `${i}_col`;
    div_clone.setAttribute(`draggable`, `true`);
    div_clone.classList.add(i);
    div_clone.classList.add(`columnobj`);
    div_clone.textContent = instance.data.colcol[i];
    fragle.appendChild(div_clone);
  }
  dom_objs.push(fragle);

  let initcolumn_data = document.getElementById('initcolumn_data');
  let datadiv = document.getElementById('datadiv');
  let initcolumn_column = document.getElementById('initcolumn_column');
  let columns = document.getElementById('columns');
  function remove_and_set(mege, mege2) {
    while (mege.firstChild) { mege.removeChild(mege.lastChild); }
    mege.appendChild(mege2);
  }
  remove_and_set(initcolumn_data, dom_objs[0]);
  remove_and_set(datadiv, dom_objs[1]);
  remove_and_set(initcolumn_column, dom_objs[2]);
  remove_and_set(columns, dom_objs[3]);
  instance.ajaxcall('trs');
}

X.prototype.ajaxfunc = function () {
  let dataq = 'title=' + this.data.dbtitle;
  dataq += '&standard=all';
  dataq += '&col_arr=all';
  dataq += '&sort=DESC';
  dataq += '&sortStandard=' + this.data.standard;
  dataq += '&limit=120';
  this.ajaxajax(dataq);
}

X.prototype.key_search = function () {
  let instance = this;
  let search_input = document.getElementById('searchinputid');
  let keycode_arr = [ 13, 9, 32, 16, 27, 8 ];
  function search_input_event(e) {
    if (keycode_arr.indexOf(e.keyCode) !== -1) {
      let where_query = {}
      for (let i of instance.data.colcol_arr) {
        where_query[i] = this.value;
      }
      let dataq = 'title=' + instance.data.dbtitle;
      dataq += '&col_arr=all';
      dataq += '&sort=DESC';
      dataq += '&sortStandard=' + instance.data.standard;
      if (this.value !== "") {
        dataq += '&where=' + JSON.stringify(where_query);
        dataq += '&standard=multi';
      } else {
        dataq += '&standard=all';
        dataq += '&limit=120';
      }
      instance.ajaxajax(dataq);
    }
  }
  search_input.addEventListener("keydown", search_input_event);
}
