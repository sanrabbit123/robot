const X = function (data, arr) {
  this.data = data;
  this.callbacks = arr;
}

X.ajax = function (target, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', target);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== 4) { return }
    if (xhr.status === 200) {
      let data = xhr.responseText;
      callback(data);
    } else {
      console.log('error', e);
    }
  }
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

X.prototype.toggle = {
  red_button : 1,
  onetimefuncs : 0,
  calcperiod : 0
};

X.prototype.data_flow = {
  past_data : [],
  undo_data : [],
  new_data : [],
  target_col : [],
  target_id : [],
  target_where : [],
  count : 0,
  onoff_c : 0
};

X.prototype.columns_scroll = function () {
  let instance = this;
  function moving(m1, m2) {
    let obj = document.getElementById(m1.replace(/_bu$/g, '') + '_col');
    let l = Math.abs(parseInt(document.querySelector('html').getBoundingClientRect().left)) + obj.getBoundingClientRect().left - (parseInt(document.querySelector('html').getBoundingClientRect().width * m2)/100);
    return l;
  }

  let setting_ajax = 'title=' + instance.data.dbtitle + '&method=onoff';
  let setting = {};
  X.ajax('/session_on', setting_ajax, function (data) {
    setting = JSON.parse(data);
    for (let i in setting) { document.getElementById(i + '_switch').checked = ((setting[i] === 1) ? false : true ); }
  });

  function bletotal_arr_event_click(e) {
    let cla = this.id.replace(/_bu$/g, '');
    let checkbox = document.getElementById(cla + '_switch');
    let session_obj = 'title=' + instance.data.dbtitle + '&method=onoff';

    if (checkbox.checked) {
      checkbox.checked = false;
      setting[cla] = 1;
      session_obj += '&obj=' + JSON.stringify(setting);
      X.ajax('/session_update', session_obj, function (data) { console.log(data); });
    } else {
      checkbox.checked = true;
      setting[cla] = 0;
      session_obj += '&obj=' + JSON.stringify(setting);
      X.ajax('/session_update', session_obj, function (data) { console.log(data); });
    }
  }
  function bletotal_arr_event_contextmenu(e) {
    e.preventDefault();
    window.scrollTo({left: moving(this.id, 50), behavior:'smooth'});
  }
  let bletotal_arr = document.querySelectorAll('.blegarim');
  for (let node of bletotal_arr) {
    node.addEventListener('click', bletotal_arr_event_click);
    node.addEventListener('contextmenu', bletotal_arr_event_contextmenu);
  }
}

X.prototype.columns_drag = function (mege = true) {
  const total = document.getElementById('totalcontents');
  let total_width = total.getBoundingClientRect().width;
  const mother = document.getElementById('belowscroll');
  const button = document.getElementById('belowscroll_button');
  let isDown = false;
  let end, endX, move, click;
  function current_update() {
    let current_width = window.pageXOffset;
    button.style.left = String(((current_width / total_width) * 100) + 2) + "%";
  }
  current_update();

  mother.addEventListener('mousedown', function (e) {
    isDown = true;
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
        window.scrollTo({ left : move });
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
    button.style.cursor = 'pointer';
    mother.style.cursor = 'pointer';
  });
  mother.addEventListener('mouseleave', function (e) {
    isDown = false;
    button.style.cursor = 'pointer';
    mother.style.cursor = 'pointer';
    if (isDown) {
      button.style.cursor = 'grabbing';
      mother.style.cursor = 'grabbing';
    }
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
    window.scrollTo({ left : mm, behavior : 'smooth'});
    current_update();
  });
  let setmoving;
  naviscroll.addEventListener('mousedown', function (e) {
    setmoving = setInterval(function () {
      let mm = window.pageXOffset + 300;
      window.scrollTo({ left : mm, behavior : 'smooth'});
    }, 80);
  });
  naviscroll.addEventListener('mouseup', function (e) {
    clearInterval(setmoving);
  });
}

X.prototype.columns_moving = function () {
  let ddnodes = document.querySelectorAll(".columnobj");
  function dragstart_event(e) {
    e.dataTransfer.setData("sun", e.target.id);
    e.target.style.opacity = "0.4";
  }
  function dragend_event(e) {
    e.target.style.opacity = "";
  }
  function dragenter_event(e) {
    e.target.style.opacity = "0.4";
  }
  function dragleave_event(e) {
    e.target.style.opacity = "";
  }
  function dragover_event(e) { e.preventDefault(); }
  function drop_event(e) {
    e.preventDefault();
    let node_id = e.dataTransfer.getData("sun");
    let div_col = node_id.replace(/_col$/g, '');
    let target_col = e.target.id.replace(/_col$/g, '');

    let move_node = document.getElementById(node_id);
    let move_rows = document.querySelectorAll(".rowdiv ." + div_col);
    let target_rows = document.querySelectorAll(".rowdiv ." + target_col);

    document.querySelector('.columns').insertBefore(move_node, e.target);
    let id_num = '';
    for (let i = 0; i < move_rows.length; i++) {
      id_num = /_[rc][0-9]+/g.exec(move_rows[i].id)[0].slice(2);
      document.getElementById('row' + id_num).insertBefore(move_rows[i], target_rows[i]);
    }
    for (let node of ddnodes) {
      node.style.opacity = "";
    }
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

X.prototype.exceptions = function () {
  let instance = this;
  let arr = Object.keys(instance.data.period);
  return {
    exceptionlist : arr,
    calcperiod : function (m) {
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

X.prototype.query_cancel = function (mege) {
  let instance = this;
  let query_arr = function (m) {
    if (instance.data_flow.target_col[m]) {
      let return_query = 'c=' + instance.data_flow.target_col[m] + '&v=' + instance.data_flow.undo_data[m] + '&i=' + instance.data_flow.target_where[m] + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;
      //ajax update
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/post_update');
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== 4) { return }
        if (xhr.status === 200) {
          console.log('return');
          let past_ele = document.getElementById(instance.data_flow.target_id[m]);
          while (past_ele.firstChild) { past_ele.removeChild(past_ele.lastChild); }
          if (instance.exceptions().exceptionlist.indexOf(instance.data_flow.target_col[m]) === -1) {
            document.getElementById(instance.data_flow.target_id[m]).textContent = instance.data_flow.undo_data[m];
          } else {
            document.getElementById(instance.data_flow.target_id[m]).appendChild(instance.exceptions().calcperiod(instance.data_flow.undo_data[m]));
          }
          console.log(xhr.responseText);
          console.log(instance.data_flow);
        } else {
          console.log('error', e);
        }
      }
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(return_query);
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
  if (mege) {
    document.querySelector('.return_query').addEventListener("click", query_exec);
  } else {
    query_exec();
  }
}

X.prototype.scrollX_moving = function () {
  let scrollX = Math.abs(document.querySelector('html').getBoundingClientRect().left) - ((this.toggle.red_button === 0) ? 150 : 0);
  setTimeout(function () { document.getElementById("initcolumn").style.cssText = "transform: translateX(" + String(scrollX) + "px)" }, 0);
}

X.prototype.button_onoff = function () {
  let instance = this;
  let i = { b : 0, n : 0 };
  let w = { b : 1, n : 1 };
  let switchfunc = {
    b : [
        "_b",
        "#below",
        function (m) {
          let card_switch = document.getElementById("red_button_Y_switch");
          if (m === 0) {
            //init
            card_switch.checked = false;
          } else if (m === 1) {
            //red
            if (w.b === 1) {
              card_switch.checked = true;
            } else {
              card_switch.checked = false;
            }
          } else if (m === 2) {
            //off
            card_switch.checked = true;
          } else {
            //on
            card_switch.checked = false;
          }
        }
    ],
    n : [
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
      if (m === "yellow" && a === "b") {
        document.getElementById('coloring_switch').checked = true;
        instance.colorpalettes(true);
      }
      if ((m === "red" || m === "green") && a === "b") {
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
    calendar : [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 151px)', 'top:76px;left:calc(100% - 304px)' ],
    basicslider : [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    scopeslider : [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 180px)', 'top:76px;left:calc(100% - 360px)' ],
    calcperiod : [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 192px)', 'top:76px;left:calc(100% - 384px)' ],
    multiplesel : [ 'top:76px;left:0;', 'top:76px;left:calc(50% - 192px)', 'top:76px;left:calc(100% - 384px)' ]
  };
  if (r < w/3) {
    return dic[mege2][0];
  } else if (r >= w/3 && r < ((w/3)*2)) {
    return dic[mege2][1];
  } else if (r >= ((w/3)*2)) {
    return dic[mege2][2];
  }
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
    longtext : [ 'position:fixed;top:20%;left:3.5%;width:calc(90% - 40px);height:63.5%;', 16, 40 ],
    shorttext : [ 'top:76px;font-size:13.2px;', 42, 51 ],
    menubar : [ 'top:76px;', 42, 51 ],
    calendar : [ 753346, 30, 51 ],
    basicslider : [ 753346, 39, 51 ],
    scopeslider : [ 753346, 39, 51 ],
    calcperiod : [ 753346, 39, 51 ],
    multiplesel : [ 753346, 33, 51 ],
    exceptions : []
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

X.prototype.update_query = function (mege1, mege2) {
  let instance = this;
  instance.data_flow.undo_data.unshift(instance.data_flow.past_data[0]);
  instance.data_flow.target_id.unshift(mege1.id);
  instance.data_flow.new_data.unshift(mege2);
  instance.data_flow.target_col.unshift(mege1.id.replace(/_[rc][0-9]+/gi, ''));
  instance.data_flow.target_where.unshift(document.getElementById(instance.data.standard + (/_[rc][0-9]+/gi.exec(mege1.id)[0]).replace(/c/, 'r')).textContent);
  instance.data_flow.count = 0;
  let update_query = 'c=' + instance.data_flow.target_col[0] + '&v=' + instance.data_flow.new_data[0] + '&i=' + instance.data_flow.target_where[0] + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;

  //ajax update
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/post_update');
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== 4) { return }
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      console.log(instance.data_flow);
    } else {
      console.log('error', e);
    }
  }
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(update_query);
}

//longtext : no hidden, no query
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
        document.getElementById('cardviewbox').scrollTo({ top : 0, behavior : 'smooth' });
        this.parentNode.parentNode.appendChild(instance.divmaker("longtextbox", left, div));
      } else {
        this.appendChild(instance.divmaker("longtextbox", left, div));
      }

      //update event - binding this
      (function (m) {
        document.querySelector('#longtextbox > textarea').focus();
        let update_node1 = document.querySelector('#longtextbox > textarea');
        let update_node2 = document.querySelector('#savecancelbt1');
        let cancel_node = document.querySelectorAll('#cancel_back,#savecancelbt2');

        function removing() {
          document.getElementById('cancel_back').remove();
          document.getElementById('longtextbox').remove();
        }

        //update
        function update_event(e) {
          if ((e.type === "click" && e.target.id === "savecancelbt1") || (e.type === "keydown" && e.key === "Tab")) {

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
        function cancel_event(e) {

          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        //node add event
        for (let node of cancel_node){
          node.addEventListener("click", cancel_event);
          node.addEventListener("contextmenu", cancel_event);
        }
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

//shorttext : no hidden, no query
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
        let cancel_node = document.querySelector('#cancel_back');

        //update
        function update_event(e) {
          if (e.keyCode === 13 || e.key === "Tab") {
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
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        //node add event
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
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

//menubar : no hidden, no query
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
        let cancel_node = document.querySelector('#cancel_back');

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
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
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

//calendar : no hidden, no query
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
        let cancel_node = document.querySelector('#cancel_back');
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
            instance.rowcards('calendar', mege, false, m);
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

        //cancel
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
          instance.rowcards('shorttext', mege, false, m);
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
        //node add event
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
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

//basicslider : no hidden, no query
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
      if (this.textContent !== '') {
        v = Number(this.textContent);
      }
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
        let cancel_node = document.querySelector('#cancel_back');

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
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
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

//scopeslider : no hidden, no query
X.prototype.scopeslider = function (mege) {
  let instance = this;

  function scopeslider_event(e) {
    this.c = instance.data_flow.onoff_c;
    if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.id !== "cancel_back" && this.c === 0) {

      //intial ready
      instance.data_flow.past_data.unshift(this.textContent);
      let left = instance.rowcards('scopeslider', mege, true, this);

      //contents
      let arr_string = this.textContent.split(' - ');
      let arr = [ 200, 500 ];
      if (arr_string[0] !== "") {
        arr = [ Number(arr_string[0]), Number(arr_string[1]) ];
      }
      let j = [ parseInt((arr[0]-50)/25), parseInt((arr[1]-50)/25), 25, 320 ];
      let div = '<div class="slidebar">';
      div += '<div class="slidebackbar" id="slidebackbar1" style="transform:scaleX(' + String((j[0]/j[2]) + 0.02) + ')"></div>';
      div += '<div class="slidebackbar" id="slidebackbar2" style="transform:scaleX(' + String(((j[2]-j[1])/j[2]) - 0.02) + ')"></div>';
      for (let i = 0;i < j[2];i++) {
          div += '<p class="slidebackbarbuttons" id="slidebackbarbuttons' + String(i) + '" style="left:' + String((j[3]/j[2])*i) + 'px"></p>';
      }
      div += '<p class="slidercircle" id="slidecircle1" style="transform:translateX(' + String((j[3]/j[2])*j[0]) + 'px);"></p>';
      div += '<p class="slidercircle" id="slidecircle2" style="transform:translateX(' + String((j[3]/j[2])*j[1]) + 'px);"></p>';
      div += '</div>';
      div += '<section class="slidenumber">' + '최소 ' + String(50+(25*j[0])) + '만원 <strong style="color:#59af89">~</strong> 최대 ' + String(50+(25*j[1])) + '만원' + '</section>';

      //overflow
      this.style.cssText = "overflow: visible;";

      //append div
      if (mege === 'tcs') { this.parentNode.appendChild(instance.divmaker("slidebox", left, div)); }
      else { this.appendChild(instance.divmaker("slidebox", left, div)); }

      //update event - binding this
      (function (m) {
        let effect_node = document.querySelectorAll('.slidebackbarbuttons');
        let update_node = document.querySelectorAll('.slidercircle');
        let cancel_node = document.querySelector('#cancel_back');

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
          let h_arr = [[h_strong.cloneNode(true),h_strong.cloneNode(true),h_strong.cloneNode(true)],[('최소 '+String(50+(25*j[0]))+'만원 '),'~',(' 최대 '+String(50+(25*j[1]))+'만원')],['color:#404040;','color:#59af89;','color:#404040;']];
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
          let new_data = document.querySelector(".slidenumber").textContent.match(/[0-9]+/gi)[0] + " - " + document.querySelector(".slidenumber").textContent.match(/[0-9]+/gi)[1];
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
        //node add event
        for (let node of update_node){
          node.addEventListener("click", update_event);
        }

        //cancel
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        //node add event
        cancel_node.addEventListener("click", cancel_event);
        cancel_node.addEventListener("contextmenu", cancel_event);
      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let scopeslider_node = document.querySelectorAll('.' + mege + '_scope');
  for (let node of scopeslider_node) { node.addEventListener("click", scopeslider_event); }
}

//calcperiod : yes hidden, yes query
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
      let this_var = { start : this_arr[1].split('-'), end : this_arr[2].split('-') };
      let calc = function (m1, m2) {
        let total_career = ((m2[0]*12) + m2[1]) - ((m1[0]*12) + m1[1]);
        return [ parseInt(total_career / 12), (total_career % 12) ];
      }
      let start_end = {
        start : [ Number(this_var.start[0]), Number(this_var.start[1]), Number(this_var.start[2]) ],
        end : [ Number(this_var.end[0]), Number(this_var.end[1]), Number(this_var.end[2]) ]
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
          if ((e.target.id === "period_text" && e.type === "click") || (e.type === "keydown" && e.key === "Tab") || (e.type === "keydown" && e.keyCode === 13)) {
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
    function period_auto_update(m) {
      const today = new Date();
      let this_arr = m.textContent.split(',');
      let this_var = { start : this_arr[1].split('-'), end : this_arr[2].split('-') };
      let calc = function (m1, m2) {
        let total_career = ((m2[0]*12) + m2[1]) - ((m1[0]*12) + m1[1]);
        return [ parseInt(total_career / 12), (total_career % 12) ];
      }
      let start_end = {
        start : [ Number(this_var.start[0]), Number(this_var.start[1]), Number(this_var.start[2]) ],
        end : [ Number(this_var.end[0]), Number(this_var.end[1]), Number(this_var.end[2]) ]
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
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/post_update');
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState !== 4) { return }
          if (xhr.status === 200) {
            console.log(xhr.responseText);
          } else {
            console.log('error', e);
          }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(update_query);
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

//multiplesel : no hidden, no query
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
        let cancel_node = document.querySelectorAll('#cancel_back,#multiplebox_cancel');

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
        function cancel_event(e) {
          //update past div
          while (m.firstChild) { m.removeChild(m.lastChild); }
          m.textContent = instance.data_flow.past_data[0];
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
        for (let node of cancel_node){
          node.addEventListener("click", cancel_event);
          node.addEventListener("contextmenu", cancel_event);
        }
      })(this);
      instance.data_flow.onoff_c = 1;
      this.c = instance.data_flow.onoff_c;
    }
  }
  //node add event
  let multiplesel_node = document.querySelectorAll('.' + mege + '_multiple');
  for (let node of multiplesel_node) { node.addEventListener("click", multiplesel_event); }
}

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
    console.log('end popup');
    document.getElementById('card_on_switch').checked = false;
    instance.data_flow.onoff_c = 0;
    instance.ajaxfunc();
    fu(mege);
    if(document.getElementById("cardviewbox")) { document.getElementById("cardviewbox").remove(); }
    let end_node = document.getElementById('cancel_back_card');
    end_node.remove();
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
    end_node.addEventListener('click', end_card_event, { capture : false, once : true, passive : false });
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
        console.log('end card append');
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
    let row = document.getElementById(mege.childNodes[1].id.replace(/_init/gi, ''));
    let row_total = row.parentElement.cloneNode(true);
    row_total.removeChild(row_total.firstChild);
    let rowrow = row_total.childNodes;
    instance.grayfocus(true, row);
    setTimeout(function () {
      card_maker(rowrow);
      instance.ajaxcall('tcs');
      console.log('end card append');
      end_card(rowrow);
      move_buttons(Number(/_r[0-9]+/.exec(rowrow[0].id)[0].slice(2)));
    }, 0);
  });
  let name_nodes = document.querySelectorAll('.rowdiv_init');
  for (let node of name_nodes) { node.addEventListener('click', pop_event); }
}

X.prototype.createview = function () {
  let instance = this;
  function create_card_maker() {
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
        else if (instance.data.short.indexOf(i) !== -1) { h2 += ' text tcs_short'; }
        else if (instance.data.menu.hasOwnProperty(i)) { h2 += ' tcs_menu'; }
        else if (instance.data.calendar.indexOf(i) !== -1) { h2 += ' tcs_calendar'; }
        else if (instance.data.slide.hasOwnProperty(i)) { h2 += ' tcs_slide'; }
        else if (instance.data.scope.indexOf(i) !== -1) { h2 += ' tcs_scope'; }
        else if (instance.data.period.hasOwnProperty(i)) { h2 += ' tcs_period'; }
        else if (instance.data.multiple.hasOwnProperty(i)) { h2 += ' tcs_multiple'; }
        else { h2 += ''; }
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
  }

  let end_card_event = instance.whitepopdown('callbacks', function (m) {
    console.log(m);
    document.getElementById('grayfocus_switch').checked = false;
    document.getElementById('create_on_switch').checked = false;
    let delete_query = 'title=' + instance.data.dbtitle + '&v=' + '__create__';
    X.ajax('/post_delete', delete_query, function (data) { console.log('create out'); });
  });

  let view_on = this.whitepopup(function () {
    let create_query = 'title=' + instance.data.dbtitle + '&col_arr=' + instance.data.standard + '&val_arr=' + "'__create__'" + '&method=query';
    X.ajax('/post_create', create_query, function (data) { console.log('create in'); });
    document.getElementById('grayfocus_switch').checked = true;
    document.getElementById('create_on_switch').checked = true;
    setTimeout(function () {
      let end_node = document.getElementById('cancel_back_card');
      end_node.addEventListener('click', function (e) {
        end_card_event();
        window.location.reload();
      }, { capture : false, once : true, passive : false });
    }, 0);
  });

  let icon = document.querySelector('.create_row');
  icon.addEventListener('click', function () {
    view_on();
    setTimeout(function () {
      create_card_maker();
      setTimeout(function () {
        instance.ajaxcall('tcs');
        let create_icon = document.querySelector('.cardtitle_img3');
        create_icon.addEventListener('click', function (e) {
          let this_standard = document.querySelector('#cardtitle_sub_create').value;
          let this_title = document.querySelector('#cardtitle_main_create').value;
          let col_title, col_init, col_con, col_arr, val_title, val_init, val_con, val_arr;
          for (i of instance.data.colinit_arr) {
            if (instance.data.coltitle.hasOwnProperty(i)) { col_title = i + ','; }
            else { col_init = i + ','; }
          }
          col_con = '';
          for (i of instance.data.colleft_arr) { col_con += i + ','; }
          col_arr = col_title + col_init + col_con.slice(0,-1);
          for (i of instance.data.colinit_arr) {
            if (instance.data.coltitle.hasOwnProperty(i)) { val_title = "'" + this_title + "',"; }
            else { val_init = "'" + this_standard + "',"; }
          }
          val_con = '';
          for (i of instance.data.colleft_arr) { val_con += "'" + document.getElementById(i + '_c0').textContent + "',"; }
          val_arr = val_title + val_init + val_con.slice(0,-1);
          let create_query = 'title=' + instance.data.dbtitle + '&col_arr=' + col_arr + '&val_arr=' + val_arr + '&method=query';
          let create_setting = 'title=' + instance.data.dbtitle + '&standard=' + this_standard + '&method=setting';
          X.ajax('/post_create', create_query, function (data) {
            console.log(data);
            X.ajax('/post_create', create_setting, function (data) {
              console.log(data);
              alert('저장 성공');
              end_card_event();
              window.location.reload();
            });
          });
        });
      }, 0);
    }, 0);
  });

  // function delete_row(e) {
  //   this.c = instance.data_flow.onoff_c;
  //   if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P" && e.target.nodeName !== "STRONG" && e.target.nodeName !== "LABEL" && e.target.id !== "cancel_back" && this.c === 0) {
  //     let div = '<p class="sortbox_item" id="deleteitem">삭제하기</p>';
  //     this.appendChild(instance.divmaker("sortbox", "", div));
  //     (function (m) {
  //       let delete_node = document.querySelector('.sortbox_item');
  //       let cancel_node = document.querySelectorAll('#cancel_back');
  //       function delete_event(e) {
  //         let delete_query = 'title=' + instance.data.dbtitle + '&v=' + this.childNodes[1].textContent;
  //         X.ajax('/post_delete', delete_query, function (data) { console.log(data); });
  //         instance.data_flow.onoff_c = 0;
  //         m.c = instance.data_flow.onoff_c;
  //         if (document.getElementById('cancel_back')) {
  //           document.getElementById('cancel_back').remove();
  //           document.getElementById('sortbox').remove();
  //         }
  //         if (e.cancelable) { e.preventDefault(); }
  //       }
  //       delete_node.addEventListener("click", delete_event);
  //
  //       function cancel_event(e) {
  //         instance.data_flow.onoff_c = 0;
  //         m.c = instance.data_flow.onoff_c;
  //         if (document.getElementById('cancel_back')) {
  //           document.getElementById('cancel_back').remove();
  //           document.getElementById('sortbox').remove();
  //         }
  //         if (e.cancelable) { e.preventDefault(); }
  //       }
  //       for (let node of cancel_node){
  //         node.addEventListener("click", cancel_event);
  //         node.addEventListener("contextmenu", cancel_event);
  //       }
  //     })(this);
  //     instance.data_flow.onoff_c = 1;
  //     this.c = instance.data_flow.onoff_c;
  //     if (e.cancelable) { e.preventDefault(); }
  //   }
  // }
  // let delete_node = document.querySelectorAll('.rowdiv_init');
  // for (let node of delete_node) { node.addEventListener("contextmenu", delete_row); }
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

  function pivot_event(m, id) {
    let menu_i = Number(id.slice(9)) - 1;
    let menu_a = m.id.replace(/_col/g, '');
    let target_name;
    if (menu_i >= 0) {
      target_name = instance.data.menu[menu_a][menu_i];
    } else {
      target_name = 'all';
    }
    let select_arr = [];
    let select_init_arr = [];
    for (let i = 0; i < count; i++){
      if (target_name !== 'all' && total_past[i].querySelector('.' + menu_a).textContent === target_name) {
        select_arr.push(total_past[i].cloneNode(true));
        select_init_arr.push(total_init_past[i].cloneNode(true));
      } else if (target_name === 'all') {
        select_arr.push(total_past[i].cloneNode(true));
        select_init_arr.push(total_init_past[i].cloneNode(true));
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
      if (mode === 0){ sort_arr.push({ con : i.textContent, id : this_id }); }
      else { sort_arr.push({ con : Number(i.textContent), id : this_id }); }
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
    console.log(result_arr);
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
      if (instance.data.menu.hasOwnProperty(node_id)) {
        let menu = instance.data.menu[node_id];
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

        if (instance.data.menu.hasOwnProperty(node_id)) {
          let filter_node = document.querySelectorAll('.fiterbox_item');
          function filter_event(e) {
            pivot_event(m, this.id);
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

X.prototype.ajaxcall = function (mege) {
  let instance = this;
  if (document.querySelector('.' + mege + '_long') !== null) { this.longtext(mege); }
  if (document.querySelector('.' + mege + '_short') !== null) { this.shorttext(mege); }
  if (document.querySelector('.' + mege + '_menu') !== null) { this.menubar(mege); }
  if (document.querySelector('.' + mege + '_calendar') !== null) { this.calendar(mege); }
  if (document.querySelector('.' + mege + '_slide') !== null) { this.basicslider(mege); }
  if (document.querySelector('.' + mege + '_scope') !== null) { this.scopeslider(mege); }
  if (document.querySelector('.' + mege + '_period') !== null) { this.calcperiod(mege); }
  if (document.querySelector('.' + mege + '_multiple') !== null) { this.multiplesel(mege); }
  if (instance.toggle.onetimefuncs === 0) {
    this.createview();
    instance.toggle.onetimefuncs++;
  }
  //async func
  setTimeout(function () {
    for (let callback_functions of instance.callbacks) { callback_functions(instance, mege); }
    if (mege === 'trs') {
      instance.cardview();
      instance.sortrow();
      instance.columns_moving();
    }
    if (document.getElementById('coloring_switch').checked) { instance.colorpalettes(true); }
  }, 0);
}

X.prototype.ajaxajax = function (mege) {
  let instance = this;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/post_read');
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== 4) { return }
    if (xhr.status === 200) {
      function remove_and_set(mege, mege2) {
        while (mege.firstChild) { mege.removeChild(mege.lastChild); }
        mege.insertAdjacentHTML('beforeend', data[mege2]);
      }
      console.log('reading...');
      let initcolumn_data = document.getElementById('initcolumn_data');
      let datadiv = document.getElementById('datadiv');
      let initcolumn_column = document.getElementById('initcolumn_column');
      let columns = document.getElementById('columns');
      let data = xhr.responseText.split('~~,_split_,~~');
      remove_and_set(initcolumn_data, 0);
      remove_and_set(datadiv, 1);
      remove_and_set(initcolumn_column, 2);
      remove_and_set(columns, 3);
      instance.ajaxcall('trs');
    } else {
      console.log('error', e);
    }
  }
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(mege);
}

X.prototype.ajaxfunc = function () {
  let dataq = 'id=' + this.data.dbtitle + '&qquery=' + 'SELECT * FROM ' + this.data.dbtitle + ' ORDER BY ' + this.data.standard + ' DESC;';
  this.ajaxajax(dataq);
}

X.prototype.key_search = function () {
  let instance = this;
  let search_input = document.getElementById('searchinputid');
  let keycode_arr = [ 13, 9, 32, 16, 27, 8 ];
  function search_input_event(e) {
    if (keycode_arr.indexOf(e.keyCode) !== -1) {
      let where_query = " WHERE ";
      for (let i of instance.data.colcol_arr) {
        where_query += i + " regexp '" + this.value + "' OR ";
      }
      where_query = where_query.slice(0, -4);
      let qqq1 = "";
      if (this.value !== "") {
        qqq1 = 'SELECT * FROM ' + instance.data.dbtitle + where_query + ' ORDER BY ' + instance.data.standard + ' DESC;';
      } else {
        qqq1 = 'SELECT * FROM ' + instance.data.dbtitle + ' ORDER BY ' + instance.data.standard + ' DESC;';
      }
      let dataq = 'id=' + instance.data.dbtitle + '&qquery=' + qqq1;
      instance.ajaxajax(dataq);
    }
  }
  search_input.addEventListener("keyup", search_input_event);
  search_input.addEventListener("keydown", search_input_event);
}

X.prototype.colorpalettes = function (mege) {
  let instance = this;
  if (mege) {
    // drag and drop event on
    let ddnodes = document.querySelectorAll(".color_palettes,.rowdiv_back,.rowdiv_init_back");
    let backs = document.querySelectorAll(".rowdiv_back,.rowdiv_init_back");
    function dragstart_event(e) {
      e.dataTransfer.setData("color_num", e.target.textContent);
      for (let node of backs) {
        node.style.display = 'block';
        node.style.zIndex = '1';
      }
    }
    function dragend_event(e) {
      for (let node of backs) { node.style.zIndex = '0'; }
    }
    function dragover_event(e) {
      e.preventDefault();
    }
    function drop_event(e) {
      e.preventDefault();
      if ( e.target.className === "rowdiv_back" ) {
        let target_id = e.target.id.replace(/div_back/g,'') + '_init'
        let target = document.getElementById(target_id).childNodes[1];
        let data = e.dataTransfer.getData("color_num");
        if (data === '#ffffff') { data = 'transparent'; }
        e.target.style.background = data;
        document.getElementById(e.target.id + '_init').style.background = data;
        let update_query = 'c=background_color&v=' + data + '&i=' + target.textContent + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle + '_setting';
        X.ajax('/post_update', update_query, function (data) { console.log(data); });
      }
    }
    for (let node of ddnodes) {
      node.addEventListener("dragstart", dragstart_event);
      node.addEventListener("dragend", dragend_event);
      node.addEventListener("dragover", dragover_event);
      node.addEventListener("drop", drop_event);
    }

    //get setting
    let qquery = "SELECT " + instance.data.standard + ",background_color FROM " + instance.data.dbtitle + "_setting;";
    qquery = "qquery=" + qquery;
    X.ajax('/post_read_arr', qquery, function (data) {
        console.log('setting update...');
        let rows = JSON.parse(data);
        let this_id, this_target, this_target_init;
        for (let node of rows) {
          this_id = {};
          this_target = {};
          this_target_init = {};
          if (document.querySelector('.id_' + node[instance.data.standard].replace(/[-]/gi, ''))) {
            this_id = document.querySelector('.id_' + node[instance.data.standard].replace(/[-]/gi, '')).id.slice(0,-5).slice(3);
            this_target = document.getElementById('rowdiv_back' + this_id);
            this_target_init = document.getElementById('rowdiv_back' + this_id + "_init");
            this_target.style.display = 'block';
            this_target_init.style.display = 'block';
            this_target.style.background = node["background_color"];
            this_target_init.style.background = node["background_color"];
          }
        }
    });
  } else {
    let rowdiv = document.querySelectorAll('.rowdiv_back');
    let rowdiv_init = document.querySelectorAll('.rowdiv_init_back');
    function trans(m) {
      m.style.display = 'none';
      m.style.background = 'transparent';
    }
    for (let node of rowdiv) { trans(node) }
    for (let node of rowdiv_init) { trans(node) }
  }
}
