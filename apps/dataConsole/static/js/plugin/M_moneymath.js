const M_moneymath = function (col) {
  let queryselec = '.rowdiv > .';
  for (let i of col) {
    queryselec += i + ',.rowdiv > .';
  }
  queryselec = queryselec.slice(0,-12);
  this.exceptions_col = queryselec;
}

M_moneymath.ajax = function (target, data, callback) {
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
  const xhr = new XMLHttpRequest();
  xhr.open('POST', target);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== 4) { return }
    if (xhr.status === 200) {
      let data = xhr.responseText;
      callback(data);
    } else { console.log('error', e); }
  }
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

M_moneymath.auto_comma = function (str) {
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return tmp;
  }
  return num;
}

M_moneymath.prototype.set_moneymathshort = function () {
  let queryselec = this.exceptions_col;
  return function (m, mege) {
    let target_node = document.querySelectorAll(queryselec);
    if (mege === 'trs') { for (let node of target_node) { node.classList.add('textrows'); node.classList.add('trs_moneymathshort'); } }
  };
}

M_moneymath.prototype.moneymathshort = function () {
  return function (m, mege) {
    let instance = m;
    function moneymathshort_event(e) {
      this.c = instance.data_flow.onoff_c;
      if (e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "TEXTAREA" && e.target.id !== "cancel_back" && this.c === 0) {
        instance.data_flow.past_data.unshift(this.textContent);

        let left = instance.rowcards('exceptions', mege, true, this, [ 'top:76px;font-size:13.2px;', 42, 51 ]);
        let div = '<textarea id="' + this.id + '_ta" class="rowinput rowinputshort">';
        div += this.textContent + '</textarea>';
        this.style.cssText = "color: #009c6a;overflow: visible;";
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
              let new_data = M_moneymath.auto_comma(document.getElementById(m.id + '_ta').value);
              instance.data_flow.undo_data.unshift(instance.data_flow.past_data[0]);
              instance.data_flow.target_id.unshift(m.id);
              instance.data_flow.new_data.unshift(new_data);
              instance.data_flow.target_col.unshift(m.id.replace(/_[rc][0-9]+/gi, ''));
              instance.data_flow.target_where.unshift(document.getElementById(instance.data.standard + (/_[rc][0-9]+/gi.exec(m.id)[0]).replace(/c/, 'r')).textContent);
              instance.data_flow.count = 0;
              let update_query = 'c=' + instance.data_flow.target_col[0] + '&v=' + instance.data_flow.new_data[0] + '&i=' + instance.data_flow.target_where[0] + '&st=' + instance.data.standard + '&table=' + instance.data.dbtitle;
              //ajax update
              M_moneymath.ajax('/post_update', update_query, function (data) {
                console.log(data);
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
              });
              //update div
              while (m.firstChild) { m.removeChild(m.lastChild); }
              m.textContent = instance.data_flow.new_data[0];
              instance.rowcards('exceptions', mege, false, m, [ 'top:76px;font-size:13.2px;', 42, 51 ]);
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
            instance.rowcards('exceptions', mege, false, m, [ 'top:76px;font-size:13.2px;', 42, 51 ]);
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
    let moneymathshort_node = document.querySelectorAll('.' + mege + '_moneymathshort');
    for (let node of moneymathshort_node) { node.addEventListener("click", moneymathshort_event); }
  };
}

//-----------------------------------------------------------------------------

M_moneymath.prototype.calc_ratio = function (x_node, y_node, ratio, obj) {
  let num = Number(x_node.textContent.replace(/,/g, ''));
  let result = Math.round(num * ratio);
  y_node.textContent = M_moneymath.auto_comma(String(result));
  let update_query = 'c=' + y_node.id.replace(/_[rc][0-9]+/g, '') + '&v=' + y_node.textContent + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
  M_moneymath.ajax('/post_update', update_query, function (data) { console.log(data, 'calc_ratio'); });
}

M_moneymath.prototype.calc_minus = function (x_node, y_node, z_node, obj) {
  let num = Number(x_node.textContent.replace(/,/g, ''));
  let mum = Number(z_node.textContent.replace(/,/g, ''));
  let result = Math.round(num - mum);
  y_node.textContent = M_moneymath.auto_comma(String(result));
  let update_query = 'c=' + y_node.id.replace(/_[rc][0-9]+/g, '') + '&v=' + y_node.textContent + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
  M_moneymath.ajax('/post_update', update_query, function (data) { console.log(data, 'calc_minus'); });
}

M_moneymath.prototype.calc_left = function (x_node, y_node, condition0_node, obj) {
  let num = Number(x_node.textContent.replace(/,/g, ''));
  let result = ((condition0_node.textContent === 'Y') ? Math.round((num * 1.1) - 330000) : Math.round(num * 1.1));
  y_node.textContent = M_moneymath.auto_comma(String(result));
  let update_query = 'c=' + y_node.id.replace(/_[rc][0-9]+/g, '') + '&v=' + y_node.textContent + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
  M_moneymath.ajax('/post_update', update_query, function (data) { console.log(data, 'calc_left'); });
}

M_moneymath.prototype.calc_fee = function (x_node, y_node, condition1_node, obj) {
  let num = Number(x_node.textContent.replace(/,/g, ''));
  let fee = (Number(condition1_node.textContent.replace(/\%/g, '')) / 100);
  let result = Math.round(num * fee);
  y_node.textContent = M_moneymath.auto_comma(String(result));
  let update_query = 'c=' + y_node.id.replace(/_[rc][0-9]+/g, '') + '&v=' + y_node.textContent + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
  M_moneymath.ajax('/post_update', update_query, function (data) { console.log(data, 'calc_fee'); });
}

M_moneymath.prototype.calc_jeongsan = function (x_node, y_node, condition1_node, condition2_node, obj, half = false) {
  let num = Number(x_node.textContent.replace(/,/g, ''));
  let fee = (Number(condition1_node.textContent.replace(/\%/g, '')) / 100);
  let ratio = 0, result = 0;
  switch (condition2_node.textContent) {
    case '사업자(일반)':
      if (half) { result = Math.round(((num * 1.1) * (1 - fee)) / 2); }
      else { result = Math.round((num * 1.1) * (1 - fee)); }
      break;
    case '사업자(간이)':
      if (half) { result = Math.round((num * (1 - fee)) / 2); }
      else { result = Math.round(num * (1 - fee)); }
      break;
    case '프리랜서':
      ratio = 0.967;
      if (half) { result = Math.round(((num - (num * fee)) * ratio) / 2); }
      else { result = Math.round((num - (num * fee)) * ratio); }
      break;
  }
  y_node.textContent = M_moneymath.auto_comma(String(result));
  let update_query = 'c=' + y_node.id.replace(/_[rc][0-9]+/g, '') + '&v=' + y_node.textContent + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
  M_moneymath.ajax('/post_update', update_query, function (data) { console.log(data, 'calc_jeongsan'); });
}
