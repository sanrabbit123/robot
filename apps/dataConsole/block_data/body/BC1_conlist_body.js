module.exports = function (d) {

//Inline js
let js = `

const funcs_arr = [
  function (m1, m2) { console.log('Callbacks : ', m1, m2); }
];
const funcs_funcs = {
  ajax_update: function (tong) {
    let update_query = 'c=' + tong[0] + '&v=' + tong[1] + '&i=' + tong[2] + '&st=' + tong[3] + '&table=' + tong[4];
    //ajax update
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
  },
  ajax_general: function (target, data, callback) {
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
}

const funcs_obj = {
  a1_class1: function (obj) {
    let target_arr = ['BP2_calculation', 'BP1_process'];
    function do_create(r, obj, boo) {
      let read_query = "col_arr=a4_customernumber&title=" + r + "&standard=a4_customernumber" + "&where=" + obj.where;
      funcs_funcs.ajax_general('/post_select', read_query, function (data) {
        if (boo) {
          if (JSON.parse(data).length === 0) {
            let insert_query = "title=" + r;
            insert_query += "&col_arr=a4_customernumber"
            insert_query += ",a19_name";
            insert_query += ",a16_service";
            insert_query += ",a21_address";
            insert_query += ",a24_pyeong";
            insert_query += ",b1_process";
            if (r === 'BP1_process') {
              insert_query += ",a30_channel";
              insert_query += ",a18_timeline";
              insert_query += ",z1_history1";
              insert_query += ",z2_history2";
              insert_query += ",z3_history3";
              insert_query += ",a5_name";
              insert_query += ",g1_constuct";
              insert_query += ",b2_contractfee";
              insert_query += ",b3_designfee";
              insert_query += ",b4_calling";
              insert_query += ",b5_metting1";
              insert_query += ",b6_metting2";
              insert_query += ",b7_change";
              insert_query += ",b8_interview";
              insert_query += ",b9_interviewissue";
              insert_query += ",b10_contents";
              insert_query += ",b11_review";
              insert_query += ",c1_photo";
              insert_query += ",c2_interviewer";
            } else {
              insert_query += ",d3_depositinfo";
              insert_query += ",d4_leftinfo";
              insert_query += ",f7_calculinfo";
              insert_query += ",h6_inisisinfo";
              insert_query += ",a5_name";
              insert_query += ",c1_supply"
              insert_query += ",c2_consumer"
              insert_query += ",c3_vat"
              insert_query += ",d1_deposit"
              insert_query += ",d2_left"
              insert_query += ",d5_deposit_yn"
              insert_query += ",d6_left_yn"
              insert_query += ",e1_fee"
              insert_query += ",e2_feeamount"
              insert_query += ",f1_calculmethod"
              insert_query += ",f2_calculamount"
              insert_query += ",f3_calculfirst"
              insert_query += ",f4_calculfisrtyn"
              insert_query += ",f5_calcullast"
              insert_query += ",f6_calcullastyn"
              insert_query += ",g1_constuct"
              insert_query += ",g2_constuctamount"
              insert_query += ",g3_constuctfee"
              insert_query += ",g4_constuctinfo"
              insert_query += ",g5_constuct_yn"
              insert_query += ",g6_constuctcustomer"
              insert_query += ",g7_constuctvat"
              insert_query += ",g8_constuctfeesun"
              insert_query += ",h1_refundratio"
              insert_query += ",h2_refund"
              insert_query += ",h4_refund_yn"
              insert_query += ",h5_refundleaf"
            }
            insert_query += "&val_arr=" + obj.where;
            insert_query += "," + document.getElementById('a19_name_init' + obj.r_id).textContent.replace(/,/g, '');
            insert_query += "," + document.getElementById('a16_service' + obj.r_id).textContent.replace(/,/g, '');
            insert_query += "," + document.getElementById('a21_address' + obj.r_id).textContent.replace(/,/g, '');
            insert_query += "," + document.getElementById('a24_pyeong' + obj.r_id).textContent.replace(/,/g, '');
            insert_query += ",대기";
            if (r === 'BP1_process') {
              insert_query += "," + document.getElementById('a30_channel' + obj.r_id).textContent.replace(/,/g, '');
              insert_query += "," + document.getElementById('a18_timeline' + obj.r_id).textContent.replace(/,/g, '');
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
              insert_query += ",";
            } else {
              insert_query += ",방식 - / 증빙 - / 수신자 -";
              insert_query += ",방식 - / 증빙 - / 수신자 -";
              insert_query += ",계좌 - / 증빙 - / 수신자 - / 비고 -";
              insert_query += ",수수료 - / 정산액 -";
              insert_query += ",";
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
              insert_query += ","
            }
            funcs_funcs.ajax_general('/post_create', insert_query, function (data) { console.log('chaning', data); });
          }
        } else {
          if (JSON.parse(data).length !== 0) {
            let delete_query = "title=" + r + "&v=" + obj.where;
            funcs_funcs.ajax_general('/post_delete', delete_query, function (data) { console.log('chaning', data); });
          }
        }
      });
    }
    for (let r of target_arr) {
      if (obj.data === "진행") { do_create(r, obj, true); }
      else if (obj.data === "응대중" || obj.data === "드랍") { do_create(r, obj, false); }
    }

    function blank_and_hypen(obj, boo) {
      let mother = document.getElementById("row" + obj.r_id.replace(/^_[rc]/g, ''));
      let collection = mother.children;
      if (boo) {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '') {
          collection[i].textContent = '-';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '-', obj.where, 'a4_customernumber', 'BC1_conlist']);
        }}
      } else {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '-') {
          collection[i].textContent = '';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '', obj.where, 'a4_customernumber', 'BC1_conlist']);
        }}
      }
    }

    let this_target = document.getElementById('rowdiv_back' + obj.r_id.replace(/^_[rc]/g, ''));
    let this_target_init = document.getElementById('rowdiv_back' + obj.r_id.replace(/^_[rc]/g, '') + "_init");

    if (obj.data === "진행") {
      document.getElementById('a3_reason' + obj.r_id).textContent = '-';
      funcs_funcs.ajax_update(['a3_reason', '-', obj.where, 'a4_customernumber', 'BC1_conlist']);
      this_target.style.background = "lightblue";
      this_target_init.style.background = "lightblue";
      blank_and_hypen(obj, false);
    } else if (obj.data === "응대중" || obj.data === "드랍") {
      document.getElementById('a3_reason' + obj.r_id).textContent = '';
      funcs_funcs.ajax_update(['a3_reason', '', obj.where, 'a4_customernumber', 'BC1_conlist']);
      if (obj.data === "응대중") {
        this_target.style.background = "transparent";
        this_target_init.style.background = "transparent";
        blank_and_hypen(obj, false);
      } else {
        this_target.style.background = "silver";
        this_target_init.style.background = "silver";
        blank_and_hypen(obj, true);
      }
    } else if (obj.data === "완료") {
      document.getElementById('a3_reason' + obj.r_id).textContent = '-';
      funcs_funcs.ajax_update(['a3_reason', '-', obj.where, 'a4_customernumber', 'BC1_conlist']);
      this_target.style.background = "seagreen";
      this_target_init.style.background = "seagreen";
      blank_and_hypen(obj, true);
    }

    let sessionupdate = "title=BC1_conlist&method=color&thisid=" + obj.where + "&thisid2=color_palettes_backdiv_standard&value=" + this_target.style.background;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/session_update3');
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) { return }
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log('error', e);
      }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(sessionupdate);


  },
  a16_service: function (obj) {
    let this_status = document.getElementById('a1_class1' + obj.r_id).textContent;
    console.log(this_status);
    if (this_status === "진행") {
      funcs_funcs.ajax_update(['a16_service', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
      funcs_funcs.ajax_update(['a16_service', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    }
  },
  a21_address: function (obj) {
    let this_status = document.getElementById('a1_class1' + obj.r_id).textContent;
    console.log(this_status);
    if (this_status === "진행") {
      funcs_funcs.ajax_update(['a21_address', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
      funcs_funcs.ajax_update(['a21_address', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    }
  },
  a24_pyeong: function (obj) {
    let this_status = document.getElementById('a1_class1' + obj.r_id).textContent;
    console.log(this_status);
    if (this_status === "진행") {
      funcs_funcs.ajax_update(['a24_pyeong', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
      funcs_funcs.ajax_update(['a24_pyeong', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    }
  },
  a30_channel: function (obj) {
    let this_status = document.getElementById('a1_class1' + obj.r_id).textContent;
    console.log(this_status);
    if (this_status === "진행") {
      funcs_funcs.ajax_update(['a30_channel', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    }
  },
  a18_timeline: function (obj) {
    let this_status = document.getElementById('a1_class1' + obj.r_id).textContent;
    console.log(this_status);
    if (this_status === "진행") {
      funcs_funcs.ajax_update(['a18_timeline', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    }
  }
};


`;

//Inline css
let css = [ 1200, `` ];

//Second
let second = `
funcs2.title0('월별 문의 현황표');
funcs2.count_monthly({
  col: [ "a18_timeline", "a9_proposal", "object_cal1" ],
  string: [ "문의", "제안", ["주별 진행", "누계 진행", "계약 기준", "누계 계약"] ],
  obj: {
    object_cal1: { standard: "a18_timeline", target: "a1_class1", filter: '진행',
    callback: function (dom, tong, i) {
      let query = 'col_arr=d5_deposit_yn,d6_left_yn&title=BP2_calculation';
      let num, general_array, rows_today, rows_year, rows_month, rows_day, stan_arr, stan_start, stan_end, accumulate_num;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/post_select_all');
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== 4) { return }
        if (xhr.status === 200) {
          let rows = JSON.parse(xhr.responseText);
          accumulate_num = 0;
          for (let j = 0; j < tong.length; j++) {
            rows_today = new Date();
            num = 0;
            for (let k = 0; k < rows.length; k++) {
              if (rows[k]["d5_deposit_yn"] === '-' || rows[k]["d5_deposit_yn"] === '') {
                general_array = rows[k]["d6_left_yn"].slice(0,10).split('-');
              } else {
                general_array = rows[k]["d5_deposit_yn"].slice(0,10).split('-');
              }
              rows_year = '0000';
              rows_month = '00';
              rows_day = '00';
              if (general_array.length > 1) {
                rows_year = general_array[0];
                rows_month = general_array[1];
                rows_day = general_array[2];
              }
              stan_arr = tong[j].split(' ~ ');
              stan_start = stan_arr[0].split('/');
              stan_end = stan_arr[1].split('/');
              if ((Number(rows_today.getFullYear()) === Number(rows_year)) && (Number(stan_start[0]) === Number(rows_month)) && (Number(stan_start[1]) <= Number(rows_day)) && (Number(stan_end[1]) >= Number(rows_day))) { num++; }
            }
            accumulate_num = accumulate_num + num;
            dom[j].insertAdjacentHTML('beforeend', ('<div class="second_detail">' + String(num) + '</div>'));
            dom[j].insertAdjacentHTML('beforeend', ('<div class="second_detail" style="color:' + ((j === tong.length - 1) ? '#2fa678' : '#cccccc') + '">' + String(accumulate_num) + '</div>'));
          }
        } else {
          console.log('error', e);
        }
      }
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(query);
    }
   }
  },
  callback: function (arr) {
    let h = '<p><strong>총</strong> ' + arr[0] + '</p>';
    h += '<p><strong>제안율</strong> ' + String(Math.floor((Number(arr[1]) / Number(arr[0])) * 100)) + '%</p>';
    h += '<p><strong>진행율</strong> ' + String(Math.floor((Number(arr[2]) / Number(arr[0])) * 100)) + '%</p>';
    h += '<p><strong>제안후 진행율</strong> ' + String(Math.floor((Number(arr[2]) / Number(arr[1])) * 100)) + '%</p>';
    return h;
  }
}, function (row) {



});
funcs2.title1(funcs2.calc_menu({
  col: 'a1_class1',
  menu: ['진행','응대중','드랍','완료'],
  count: [0,0,0,0,0,0,0,0],
  callback: function (length, count_arr) {
    return function (rows) {
      let h = '';
      h += '<p>총 문의 <b>' + String(length) + '</b>건</p>';
      h += '<strong> | </strong>';
      h += '<p>진행 <b>' + String(count_arr[4]) + '</b>건</p>';
      h += '<strong> | </strong>';
      h += '<p>응대중 <b>' + String(count_arr[1]) + '</b>건</p>';
      h += '<strong> | </strong>';
      h += '<p>진행율 <b>' + String(count_arr[5]) + '</b>%</p>';
      return h;
    }
  },
  addcallbacks: [
    function (length, count_arr) {
      count_arr[4] = count_arr[0] + count_arr[3];
      count_arr[5] = Math.round(((count_arr[0] + count_arr[3]) / length) * 100);
    }
  ]
}));
`;
return { inlinejs: js, inlinecss: css, second: second };
}
