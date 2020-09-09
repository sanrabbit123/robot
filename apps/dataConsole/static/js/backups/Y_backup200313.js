const Y = function (data, arr) {
  this.data = data;
  this.rows = arr;
}

Y.ajax = function (target, data, callback) {
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

Y.auto_comma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus;
  if (/\-/g.test(str)) { minus = /\-/g.exec(str)[0]; }
  else { minus = ''; }
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
}

Y.prototype.scrollX = function (node) {
  let isDown = false;
  let startX;
  let scrollLeft;
  node.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
    node.style.cssText = 'cursor:grabbing;';
  });
  node.addEventListener('mouseleave', function (e) {
    isDown = false;
    node.style.cssText = 'cursor:pointer;';
  });
  node.addEventListener('mouseup', function (e) {
    isDown = false;
    node.style.cssText = 'cursor:pointer;';
  });
  node.addEventListener('mousemove', function (e) {
    if (!isDown) { return }
    e.preventDefault();
    let x = e.pageX - node.offsetLeft;
    let walk = x - startX;
    node.scrollLeft = scrollLeft - walk;
    node.style.cssText = 'cursor:grabbing;';
  });
}

Y.prototype.title0 = function (str) {
  let mother = document.getElementById('second_data');
  let div = document.createElement('DIV');
  let p = document.createElement('P');
  let h = document.createDocumentFragment();
  let general_string, general_array, div_clone, div_clone2, div_clone3, p_clone;
  div_clone = div.cloneNode(true);
  div_clone.classList.add('second_title0');
  p_clone = p.cloneNode(true);
  p_clone.classList.add('second_title_p');
  p_clone.textContent = str;
  div_clone2 = div.cloneNode(true);
  div_clone2.classList.add('second_title_bar');
  div_clone.appendChild(p_clone);
  div_clone.appendChild(div_clone2);
  h.appendChild(div_clone);
  mother.appendChild(h);
}

Y.prototype.title1 = function (dom) {
  let mother = document.getElementById('second_data');
  let div = document.createElement('DIV');
  let h = document.createDocumentFragment();
  let div_clone, div_clone2;
  div_clone = div.cloneNode(true);
  div_clone.classList.add('second_title1');
  div_clone2 = div.cloneNode(true);
  div_clone2.classList.add('second_title_p2');
  div_clone2.insertAdjacentHTML('beforeend', dom(this.rows));
  div_clone.appendChild(div_clone2);
  h.appendChild(div_clone);
  mother.appendChild(h);
}

Y.prototype.calc_monthly = function () {
  const today = new Date();
  let year = today.getFullYear();
  let mon = today.getMonth();
  let stan = [];
  let tong = [0,0,0,0,0,0,0,0,0,0,0,0];
  let calc_num, a, b, group_num, this_month;

  while (mon >= 0) {
    stan.push(new Date(year, mon));
    mon = mon - 1;
  }

  for (let i of stan) {
    a = new Date(year, i.getMonth());
    b = new Date(year, i.getMonth());
    a.setDate(28);
    b.setDate(29);
    if (a.getMonth() === b.getMonth()) {
      b.setDate(30);
      if (a.getMonth() === b.getMonth()) {
        b.setDate(31);
        if (a.getMonth() === b.getMonth()) { i.dayLast = 31; }
        else { i.dayLast = 30; }
      } else { i.dayLast = 29; }
    } else { i.dayLast = 28; }

    if (i.getDay() === 6) { calc_num = 0; }
    else if (i.getDay() === 0) { calc_num = 6; }
    else if (i.getDay() === 1) { calc_num = 5; }
    else if (i.getDay() === 2) { calc_num = 4; }
    else if (i.getDay() === 3) { calc_num = 3; }
    else if (i.getDay() === 4) { calc_num = 2; }
    else if (i.getDay() === 5) { calc_num = 1; }

    calc_num_mo = parseInt((i.dayLast - calc_num - 1) / 7);
    calc_num_na = (i.dayLast - calc_num - 1) % 7;
    if (calc_num_na !== 0) { group_num = calc_num_mo + 2; }
    else { group_num = calc_num_mo + 1; }
    tong[i.getMonth()] = new Array(group_num);

    this_month = String(i.getMonth() + 1);
    tong[i.getMonth()][0] = this_month + '/' + '1' + ' ~ ' + this_month  + '/' + String(1 + calc_num);
    for (let k = 0; k < calc_num_mo; k++) { tong[i.getMonth()][k + 1] = this_month + '/' + String(1 + calc_num + (1 + (7 * k))) + ' ~ ' + this_month  + '/' + String(calc_num + (1 + (7 * (k + 1)))); }
    if (calc_num_na !== 0) { tong[i.getMonth()][calc_num_mo + 1] = this_month + '/' + String(i.dayLast - calc_num_na + 1) + ' ~ ' + this_month  + '/' + String(i.dayLast); }
  }
  return tong;
}

Y.prototype.count_monthly = function (obj) {
  let mother = document.getElementById('second_data');
  let brother = document.createElement('DIV');
  let h = document.createDocumentFragment();
  let div = document.createElement('DIV');
  let general_string, general_array, div_clone, div_clone2, div_clone3, div_clone4, rows_today, rows_month, rows_day, stan_arr, stan_start, stan_end, day_count, accumulate_count, day_tong, day_ele, month_num, data_col_ele_blocks, data_col_ele_blocks_weeks
  let data_col = obj;
  let data_count = data_col.col.length;

  //make cloumns
  div_clone = div.cloneNode(true);
  div_clone.id = "second_table1_columns";
  div_clone2 = div.cloneNode(true);
  div_clone2.className = "second_table1_up";
  div_clone.appendChild(div_clone2);
  div_clone3 = div.cloneNode(true);
  div_clone3.className = "second_table1_down";
  for (let j = 0; j < data_count; j++) {
    div_clone4 = div.cloneNode(true);
    div_clone4.classList.add('second_table1_databox');
    general_string = `<div class="second_table1_block">`;
    general_string += `<div class="second_detail">주별 ${data_col.string[j]}</div>`;
    general_string += `<div class="second_detail">누계 ${data_col.string[j]}</div>`;
    general_string += `<div class="second_detail">월별 ${data_col.string[j]} %</div>`;
    general_string += `<div class="second_detail">${data_col.string[j]} 증감</div>`;
    general_string += `</div>`;
    div_clone4.insertAdjacentHTML('beforeend', general_string);
    div_clone3.appendChild(div_clone4);
  }
  div_clone.appendChild(div_clone3);
  h.appendChild(div_clone);

  div_clone3 = div.cloneNode(true);
  div_clone3.id = "second_table1_total";

  div_clone = div.cloneNode(true);
  div_clone.className = "second_table1_up";
  div_clone.id = "second_table1_up3";
  div_clone3.appendChild(div_clone);

  //make data-pot
  div_clone = div.cloneNode(true);
  div_clone.className = "second_table1_down";
  div_clone.id = "second_table1_down3";

  for (let i of data_col.col) {
    div_clone2 = div.cloneNode(true);
    div_clone2.classList.add('second_table1_databox');
    div_clone2.id = i + "_second";
    div_clone.appendChild(div_clone2);
  }

  div_clone3.appendChild(div_clone);
  h.appendChild(div_clone3);
  brother.classList.add('second_brother');
  brother.appendChild(h);
  //append to total-mother
  mother.appendChild(brother);

  //---------------------------------------------------------------------------------------------------------

  //append details-init
  let child_col = document.getElementById('second_table1_up3');
  let data_col_ele = new Array(data_count);
  for (let i = 0; i < data_count; i++) { data_col_ele[i] = document.getElementById(data_col.col[i] + "_second"); }
  let day_total_tong = {};
  for (let c of data_col.col) { day_total_tong[c] = new Array(12); }
  let tong = this.calc_monthly();

  //append details
  for (let i = 0; i < 12; i++) { if (tong[11 - i] !== 0) {
      //column
      div_clone = div.cloneNode(true);
      div_clone.classList.add("second_table1_block_init");
      div_clone2 = div.cloneNode(true);
      div_clone2.className = "second_table1_month_init";
      div_clone2.textContent = String(12 - i) + "월";
      div_clone.appendChild(div_clone2);

      div_clone3 = div.cloneNode(true);
      div_clone3.classList.add("second_table1_block");
      for (let j = 0; j < tong[11 - i].length; j++){
        div_clone2 = div.cloneNode(true);
        div_clone2.className = "second_table1_week";
        div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail">' + tong[11 - i][j].replace(/[0-9]\//g, '') + '</div>'))
        div_clone3.appendChild(div_clone2);
      }
      div_clone.appendChild(div_clone3);
      child_col.appendChild(div_clone);

      //------------------------------------------------------------------------ data
      for (let z = 0; z < data_count; z++) {
        day_tong = { week: [], total: 0, percent: [] };
        day_ele = {};
        div_clone = div.cloneNode(true);
        div_clone.classList.add("second_table1_block");
        accumulate_count = 0;
        for (let j = 0; j < tong[11 - i].length; j++) {
          div_clone2 = div.cloneNode(true);
          div_clone2.className = "second_table1_week";
          day_count = 0;
          rows_today = new Date();
          if (!/object_cal/.test(data_col.col[z])) {
            for (let k = 0; k < this.rows.length; k++) {
              general_array = this.rows[k][data_col.col[z]].slice(0,10).split('-');
              rows_year = '0000';
              rows_month = '00';
              rows_day = '00';
              if (general_array.length > 1) {
                rows_year = general_array[0];
                rows_month = general_array[1];
                rows_day = general_array[2];
              }
              stan_arr = tong[11 - i][j].split(' ~ ');
              stan_start = stan_arr[0].split('/');
              stan_end = stan_arr[1].split('/');
              if ((Number(rows_today.getFullYear()) === Number(rows_year)) && (Number(stan_start[0]) === Number(rows_month)) && (Number(stan_start[1]) <= Number(rows_day)) && (Number(stan_end[1]) >= Number(rows_day))) { day_count++; }
            }
          } else {
            for (let k = 0; k < this.rows.length; k++) {
              general_array = this.rows[k][data_col.obj[data_col.col[z]].standard].slice(0,10).split('-');
              rows_year = '0000';
              rows_month = '00';
              rows_day = '00';
              if (general_array.length > 1) {
                rows_year = general_array[0];
                rows_month = general_array[1];
                rows_day = general_array[2];
              }
              stan_arr = tong[11 - i][j].split(' ~ ');
              stan_start = stan_arr[0].split('/');
              stan_end = stan_arr[1].split('/');
              if ((Number(rows_today.getFullYear()) === Number(rows_year)) && (Number(stan_start[0]) === Number(rows_month)) && (Number(stan_start[1]) <= Number(rows_day)) && (Number(stan_end[1]) >= Number(rows_day))) {
                if (this.rows[k][data_col.obj[data_col.col[z]].target] === data_col.obj[data_col.col[z]].filter) {
                  day_count++;
                }
              }
            }
          }
          accumulate_count = accumulate_count + day_count;
          div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail">' + String(day_count) + '</div>'));
          div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail" style="color:' + ((j === tong[11 - i].length - 1) ? '#2fa678' : '#cccccc') + '">' + String(accumulate_count) + '</div>'));
          day_tong.week.push(day_count);
          div_clone.appendChild(div_clone2);
        }
        //percent
        if (accumulate_count === 0) { accumulate_count = 1; }
        day_tong.total = accumulate_count;
        data_col_ele[z].appendChild(div_clone);
        day_ele = div_clone.querySelectorAll('.second_table1_week');
        for (let j = 0; j < day_ele.length; j++) {
          day_tong.percent.push(Math.round((day_tong.week[j] / accumulate_count) * 100));
          day_ele[j].insertAdjacentHTML('beforeend', ('<div class="second_detail">' + String(day_tong.percent[j]) + '%</div>'));
        }
        day_total_tong[data_col.col[z]][11 - i] = day_tong;
      }
      //----------------------------------------------------------------------------------------------------
  }}
  //------------------------------------------------------------------------ data 1 : count - consulting
  for (let z = 0; z < data_count; z++) {
    for (let i = 0; i < day_total_tong[data_col.col[z]].length; i++) { if (day_total_tong[data_col.col[z]][i]) {
        month_num = day_total_tong[data_col.col[z]][i].week.length;
        day_total_tong[data_col.col[z]][i].increase = new Array(month_num);
        for (let m = 0; m < month_num; m++) {
          if (m === 0) {
            if (i === 0 ) { day_total_tong[data_col.col[z]][i].increase[m] = day_total_tong[data_col.col[z]][i].week[m]; }
            else { day_total_tong[data_col.col[z]][i].increase[m] = day_total_tong[data_col.col[z]][i].week[m] - day_total_tong[data_col.col[z]][i - 1].week.slice(-1)[0]; }
          } else { day_total_tong[data_col.col[z]][i].increase[m] = day_total_tong[data_col.col[z]][i].week[m] - day_total_tong[data_col.col[z]][i].week[m - 1]; }
        }
    }}
    data_col_ele_blocks = data_col_ele[z].querySelectorAll('.second_table1_block');
    for (let i = 0; i < data_col_ele_blocks.length; i++) {
      data_col_ele_blocks_weeks = data_col_ele_blocks[data_col_ele_blocks.length - 1 - i].querySelectorAll('.second_table1_week');
      for (let j = 0; j < data_col_ele_blocks_weeks.length; j++) {
        data_col_ele_blocks_weeks[j].insertAdjacentHTML('beforeend', ('<div class="second_detail">' + String(day_total_tong[data_col.col[z]][i].increase[j]) + '</div>'));
      }
    }
  }
  console.log(day_total_tong);
  //----------------------------------------------------------------------------------------------------

  div_clone = document.getElementById('second_table1_down3');
  for (let i = 0; i < 12; i++) { if (tong[11 - i] !== 0) {
    div_clone2 = div.cloneNode(true);
    div_clone2.className = "second_monthly_calc";
    div_clone2.style.width = String((70 * day_total_tong[data_col.col[0]][11 - i].week.length) + 40) + "px";
    general_array = [];
    for (let j = 0; j < data_count; j++) {
      general_array.push(String(day_total_tong[data_col.col[j]][11 - i].total));
    }
    div_clone2.insertAdjacentHTML('beforeend', data_col.callback(general_array));
    div_clone.appendChild(div_clone2);
  }}

  //----------------------------------------------------------------------------------------------------

  div_clone = document.getElementById('second_table1_total');
  div_clone2 = div.cloneNode(true);
  div_clone2.className = "second_garim";
  div_clone.appendChild(div_clone2);
  this.scrollX(document.querySelector('.second_brother'));

}

Y.prototype.calc_menu = function (obj) {
  let data_col = obj;
  for (let k = 0; k < this.rows.length; k++) {
    for (let i = 0; i < data_col.menu.length; i++) {
      if (this.rows[k][data_col.col] === data_col.menu[i]) { data_col.count[i]++; }
    }
  }
  for (let funcs of data_col.addcallbacks) {
    funcs(this.rows.length, data_col.count);
  }
  return data_col.callback(this.rows.length, data_col.count);
}

Y.prototype.calc_week_and_monthly = function (obj, last_callback) {
  let instance = this;
  let mother = document.getElementById('second_data');
  let brother = document.createElement('DIV');
  let h = document.createDocumentFragment();
  let div = document.createElement('DIV');
  let general_string, general_array, div_clone, div_clone2, div_clone3, div_clone4, rows_today, rows_month, rows_day, stan_arr, stan_start, stan_end, day_count, accumulate_count, day_tong, day_ele, month_num, data_col_ele_blocks, data_col_ele_blocks_weeks
  let data_col = obj;
  let data_count = data_col.col.length;

  //make cloumns
  div_clone = div.cloneNode(true);
  div_clone.id = "second_table1_columns";
  div_clone2 = div.cloneNode(true);
  div_clone2.className = "second_table1_up";
  div_clone.appendChild(div_clone2);

  div_clone3 = div.cloneNode(true);
  div_clone3.className = "second_table1_down";
  for (let j = 0; j < data_count; j++) {
    div_clone4 = div.cloneNode(true);
    div_clone4.classList.add('second_table1_databox');
    general_string = `<div class="second_table1_block">`;
    general_string += `<div class="second_detail">${data_col.col[j].string[0]}</div>`;
    general_string += `<div class="second_detail">${data_col.col[j].string[1]}</div>`;
    general_string += `<div class="second_detail">${data_col.col[j].string[2]}</div>`;
    general_string += `<div class="second_detail">${data_col.col[j].string[3]}</div>`;
    general_string += `</div>`;
    div_clone4.insertAdjacentHTML('beforeend', general_string);
    div_clone3.appendChild(div_clone4);
  }
  div_clone.appendChild(div_clone3);
  h.appendChild(div_clone);

  div_clone3 = div.cloneNode(true);
  div_clone3.id = "second_table1_total";
  div_clone = div.cloneNode(true);
  div_clone.className = "second_table1_up";
  div_clone.id = "second_table1_up3";
  div_clone3.appendChild(div_clone);

  //make data-pot
  div_clone = div.cloneNode(true);
  div_clone.className = "second_table1_down";
  div_clone.id = "second_table1_down3";

  for (let i of data_col.col) {
    div_clone2 = div.cloneNode(true);
    div_clone2.classList.add('second_table1_databox');
    div_clone2.id = i.title + "_second";
    div_clone.appendChild(div_clone2);
  }

  div_clone3.appendChild(div_clone);
  h.appendChild(div_clone3);
  brother.classList.add('second_brother');
  brother.appendChild(h);
  //append to total-mother
  mother.appendChild(brother);

  //---------------------------------------------------------------------------------------------------------

  //append details-init
  let child_col = document.getElementById('second_table1_up3');
  let data_col_ele = new Array(data_count);
  for (let i = 0; i < data_count; i++) { data_col_ele[i] = document.getElementById(data_col.col[i].title + "_second"); }
  let day_total_tong = {};
  for (let c of data_col.col) { day_total_tong[c.title] = new Array(12); }
  let tong = this.calc_monthly();

  //append details
  for (let i = 0; i < 12; i++) { if (tong[11 - i] !== 0) {
      //column
      div_clone = div.cloneNode(true);
      div_clone.classList.add("second_table1_block_init");
      div_clone2 = div.cloneNode(true);
      div_clone2.className = "second_table1_month_init";
      div_clone2.textContent = String(12 - i) + "월";
      div_clone.appendChild(div_clone2);

      div_clone3 = div.cloneNode(true);
      div_clone3.classList.add("second_table1_block");
      for (let j = 0; j < tong[11 - i].length; j++){
        div_clone2 = div.cloneNode(true);
        div_clone2.className = "second_table1_week";
        div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail">' + tong[11 - i][j].replace(/[0-9]\//g, '') + '</div>'))
        div_clone3.appendChild(div_clone2);
      }
      div_clone.appendChild(div_clone3);
      child_col.appendChild(div_clone);

      //------------------------------------------------------------------------ data
      for (let z = 0; z < data_count; z++) {
        day_tong = { week: [], total: 0, percent: [] };
        day_ele = {};
        div_clone = div.cloneNode(true);
        div_clone.classList.add("second_table1_block");
        accumulate_count = 0;
        for (let j = 0; j < tong[11 - i].length; j++) {
          div_clone2 = div.cloneNode(true);
          div_clone2.className = "second_table1_week";
          day_count = 0;
          rows_today = new Date();

          for (let k = 0; k < this.rows.length; k++) {
            stan_arr = tong[11 - i][j].split(' ~ ');
            stan_start = stan_arr[0].split('/');
            stan_end = stan_arr[1].split('/');


            for (let a = 0; a < data_col.col[z].data.length; a++) {
              general_array = this.rows[k][data_col.col[z].data[a]].slice(0,10).split('-');
              rows_year = '0000';
              rows_month = '00';
              rows_day = '00';
              if (general_array.length > 1) {
                rows_year = general_array[0];
                rows_month = general_array[1];
                rows_day = general_array[2];
              }
              if ((Number(rows_today.getFullYear()) === Number(rows_year)) && (Number(stan_start[0]) === Number(rows_month)) && (Number(stan_start[1]) <= Number(rows_day)) && (Number(stan_end[1]) >= Number(rows_day))) {
                day_count = day_count + (data_col.col[z].callback[a])(this.rows[k], (11-i));
              }
            }
          }
          accumulate_count = accumulate_count + day_count;
          div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail">' + Y.auto_comma(day_count) + '</div>'));
          div_clone2.insertAdjacentHTML('beforeend', ('<div class="second_detail" style="color:' + ((j === tong[11 - i].length - 1) ? '#2fa678' : '#cccccc') + '">' + Y.auto_comma(accumulate_count) + '</div>'));
          day_tong.week.push(day_count);
          div_clone.appendChild(div_clone2);
        }

        if (accumulate_count === 0) { accumulate_count = 1; }
        day_tong.total = accumulate_count;
        data_col_ele[z].appendChild(div_clone);

        //percent
        day_ele = div_clone.querySelectorAll('.second_table1_week');
        for (let j = 0; j < day_ele.length; j++) {
          day_tong.percent.push(Math.round((day_tong.week[j] / accumulate_count) * 100));
          day_ele[j].insertAdjacentHTML('beforeend', ('<div class="second_detail">' + String(day_tong.percent[j]) + '%</div>'));
        }


        day_total_tong[data_col.col[z].title][11 - i] = day_tong;
        console.log(day_total_tong);
      }
      //----------------------------------------------------------------------------------------------------
  }}



  //------------------------------------------------------------------------ data 1 : count - consulting
  for (let z = 0; z < data_count; z++) {
    for (let i = 0; i < day_total_tong[data_col.col[z].title].length; i++) { if (day_total_tong[data_col.col[z].title][i]) {
        month_num = day_total_tong[data_col.col[z].title][i].week.length;
        day_total_tong[data_col.col[z].title][i].increase = new Array(month_num);
        for (let m = 0; m < month_num; m++) {
          if (m === 0) {
            if (i === 0 ) { day_total_tong[data_col.col[z].title][i].increase[m] = day_total_tong[data_col.col[z].title][i].week[m]; }
            else { day_total_tong[data_col.col[z].title][i].increase[m] = day_total_tong[data_col.col[z].title][i].week[m] - day_total_tong[data_col.col[z].title][i - 1].week.slice(-1)[0]; }
          } else { day_total_tong[data_col.col[z].title][i].increase[m] = day_total_tong[data_col.col[z].title][i].week[m] - day_total_tong[data_col.col[z].title][i].week[m - 1]; }
        }
    }}
    data_col_ele_blocks = data_col_ele[z].querySelectorAll('.second_table1_block');
    for (let i = 0; i < data_col_ele_blocks.length; i++) {
      data_col_ele_blocks_weeks = data_col_ele_blocks[data_col_ele_blocks.length - 1 - i].querySelectorAll('.second_table1_week');
      for (let j = 0; j < data_col_ele_blocks_weeks.length; j++) {
        data_col_ele_blocks_weeks[j].insertAdjacentHTML('beforeend', ('<div class="second_detail">' + Y.auto_comma(day_total_tong[data_col.col[z].title][i].increase[j]) + '</div>'));
      }
    }
  }
  console.log(day_total_tong);
  //----------------------------------------------------------------------------------------------------

  div_clone = document.getElementById('second_table1_down3');
  for (let i = 0; i < 12; i++) { if (tong[11 - i] !== 0) {
    div_clone2 = div.cloneNode(true);
    div_clone2.className = "second_monthly_calc";
    div_clone2.style.width = String((data_col.callback[1]() * day_total_tong[data_col.col[0].title][11 - i].week.length) + 40) + "px";
    general_array = [];
    for (let j = 0; j < data_count; j++) {
      general_array.push(Y.auto_comma(day_total_tong[data_col.col[j].title][11 - i].total));
    }
    div_clone2.insertAdjacentHTML('beforeend', data_col.callback[0](general_array));
    div_clone.appendChild(div_clone2);
  }}

  //----------------------------------------------------------------------------------------------------

  div_clone = document.getElementById('second_table1_total');
  div_clone2 = div.cloneNode(true);
  div_clone2.className = "second_garim";
  div_clone.appendChild(div_clone2);
  this.scrollX(document.querySelector('.second_brother'));
  last_callback(this.rows);
}







//exit
