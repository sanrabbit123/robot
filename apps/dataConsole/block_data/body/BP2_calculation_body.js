module.exports = function (d) {
//Inline js
let js = `



const plugin2 = new M_moneymath(['c1_supply', 'd2_left', 'e2_feeamount', 'f2_calculamount', 'f3_calculfirst', 'f5_calcullast', 'g3_constuctfee', 'h2_refund', 'g2_constuctamount', 'g6_constuctcustomer', 'g7_constuctvat', 'g8_constuctfeesun']);
let funcs_arr = [
  function (m1, m2) { console.log('Callbacks : ', m1, m2); },
  plugin2.set_moneymathshort(),
  plugin2.moneymathshort()
];

// let plugin1 = new M_joinreading();
// let funcs_attach = [
//   plugin1.joinreading(['a21_address', 'a4_customernumber', 'BC1_conlist', 'a4_customernumber', 'a21_address']),
//   plugin1.joinreading(['a16_service', 'a4_customernumber', 'BC1_conlist', 'a4_customernumber', 'a16_service']),
//   plugin1.joinreading(['a24_pyeong', 'a4_customernumber', 'BC1_conlist', 'a4_customernumber', 'a24_pyeong'])
// ];

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
  func0: function (callback) {
    return function (obj) {
      let ajax = function (target, data, callback) {
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

      let qquery = "SELECT c1_fees FROM BD2_deslist WHERE a5_name = '" + obj.data + "';";
      ajax('/post_read_arr', ('qquery=' + qquery), function (data) {
        let rows = JSON.parse(data);
        document.getElementById('e1_fee' + obj.r_id).textContent = rows[0].c1_fees;
        let update_query = 'c=e1_fee&v=' + rows[0].c1_fees + '&i=' + obj.where + '&st=' + obj.standard + '&table=' + obj.table;
        ajax('/post_update', update_query, function (data) {
          console.log(data, "callback start");
          callback(obj);
        });
      });
      let update_query = 'c=a5_name&v=' + obj.data + '&i=' + obj.where + '&st=a4_customernumber&table=BP1_process';
      ajax('/post_update', update_query, function (data) { console.log(data); });
    };
  },
  func1: function (obj) {
    let x_node, y_node;
    let condition0_node, condition1_node;
    x_node = document.getElementById('c1_supply' + obj.r_id);
    y_node = document.getElementById('c3_vat' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 0.1, obj);
    y_node = document.getElementById('c2_consumer' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 1.1, obj);
    y_node = document.getElementById('d2_left' + obj.r_id);
    condition0_node = document.getElementById('d1_deposit' + obj.r_id);
    plugin2.calc_left(x_node, y_node, condition0_node, obj);
    y_node = document.getElementById('e2_feeamount' + obj.r_id);
    condition0_node = document.getElementById('e1_fee' + obj.r_id);
    plugin2.calc_fee(x_node, y_node, condition0_node, obj);
    y_node = document.getElementById('f2_calculamount' + obj.r_id);
    condition1_node = document.getElementById('f1_calculmethod' + obj.r_id);
    plugin2.calc_jeongsan(x_node, y_node, condition0_node, condition1_node, obj, false);
    y_node = document.getElementById('f3_calculfirst' + obj.r_id);
    plugin2.calc_jeongsan(x_node, y_node, condition0_node, condition1_node, obj, true);
    y_node = document.getElementById('f5_calcullast' + obj.r_id);
    plugin2.calc_jeongsan(x_node, y_node, condition0_node, condition1_node, obj, true);
  },
  func2: function (obj) {
    let x_node, y_node;
    x_node = document.getElementById('g2_constuctamount' + obj.r_id);
    y_node = document.getElementById('g3_constuctfee' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 0.05, obj);
    y_node = document.getElementById('g7_constuctvat' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 0.1, obj);
    y_node = document.getElementById('g6_constuctcustomer' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 1.1, obj);
    y_node = document.getElementById('g8_constuctfeesun' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, 0.055, obj);
  },
  func3: function (obj) {
    let x_node, y_node, z_node;
    let ratio = (Number(document.getElementById('h1_refundratio' + obj.r_id).textContent.replace(/\%/g, '')) / 100);
    x_node = document.getElementById('c2_consumer' + obj.r_id);
    y_node = document.getElementById('h2_refund' + obj.r_id);
    plugin2.calc_ratio(x_node, y_node, ratio, obj);
    z_node = document.getElementById('h5_refundleaf' + obj.r_id);
    plugin2.calc_minus(x_node, z_node, y_node, obj);
  }
}

const funcs_obj = {
  a5_name: funcs_funcs.func0(funcs_funcs.func1),
  b1_process: function (obj) {
    funcs_funcs.ajax_update(['b1_process', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
    function blank_and_hypen(obj, boo) {
      let mother = document.getElementById("row" + obj.r_id.replace(/^_[rc]/g, ''));
      let collection = mother.children;
      if (boo) {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '') {
          collection[i].textContent = '-';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '-', obj.where, 'a4_customernumber', 'BP2_calculation']);
        }}
      } else {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '-') {
          collection[i].textContent = '';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '', obj.where, 'a4_customernumber', 'BP2_calculation']);
        }}
      }
    }

    let this_target = document.getElementById('rowdiv_back' + obj.r_id.replace(/^_[rc]/g, ''));
    let this_target_init = document.getElementById('rowdiv_back' + obj.r_id.replace(/^_[rc]/g, '') + "_init");
    if (obj.data === "대기") {
      this_target.style.background = "#bb9988";
      this_target_init.style.background = "#bb9988";
      blank_and_hypen(obj, false);
    } else if (obj.data === "홀딩") {
      this_target.style.background = "#f5b5a7";
      this_target_init.style.background = "#f5b5a7";
      blank_and_hypen(obj, true);
    } else if (obj.data === "진행중") {
      this_target.style.background = "transparent";
      this_target_init.style.background = "transparent";
      blank_and_hypen(obj, false);
    } else if (obj.data === "완료") {
      this_target.style.background = "silver";
      this_target_init.style.background = "silver";
      blank_and_hypen(obj, true);
    } else if (obj.data === "드랍") {
      this_target.style.background = "#808080";
      this_target_init.style.background = "#808080";
      blank_and_hypen(obj, true);
    }

    let sessionupdate = "title=BP2_calculation&method=color&thisid=" + obj.where + "&thisid2=color_palettes_backdiv_standard&value=" + this_target.style.background;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/session_update3');
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) { return }
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        let sessionupdate2 = "title=BP1_process&method=color&thisid=" + obj.where + "&thisid2=color_palettes_backdiv_standard&value=" + this_target.style.background;
        const xhr2 = new XMLHttpRequest();
        xhr2.open('POST', '/session_update3');
        xhr2.onreadystatechange = function (e) {
          if (xhr2.readyState !== 4) { return }
          if (xhr2.status === 200) {
            console.log(xhr2.responseText);
          } else {
            console.log('error', e);
          }
        }
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.send(sessionupdate2);
      } else {
        console.log('error', e);
      }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(sessionupdate);

  },
  c1_supply: funcs_funcs.func1,
  d1_deposit: funcs_funcs.func1,
  d5_deposit_yn: function (obj) {
    funcs_funcs.ajax_update(['b2_contractfee', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
  },
  d6_left_yn: function (obj) {
    funcs_funcs.ajax_update(['b3_designfee', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
  },
  e1_fee: funcs_funcs.func1,
  f1_calculmethod: funcs_funcs.func1,
  g1_constuct: function (obj) {
    funcs_funcs.ajax_update(['g1_constuct', obj.data, obj.where, 'a4_customernumber', 'BP1_process']);
  },
  g2_constuctamount: funcs_funcs.func2,
  h1_refundratio: funcs_funcs.func3
};



`;
//Inline css
let css = [ 1200, `` ];
//Second
let second_table1_width = '100';
let second = `
funcs2.title0('월별 / 주별 정산표');
funcs2.calc_week_and_monthly({
  col: [
  //입금
  { title: "inmoney",
    callback: [
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = 330000;
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = 330000;
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if (general_array[0] === '0000') { general_array = row["d5_deposit_yn"].slice(0,10).split('-'); }
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.d2_left.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.d2_left.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.g3_constuctfee.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.g3_constuctfee.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
    ],
    data: [ "d5_deposit_yn", "d6_left_yn", "g5_constuct_yn" ],
    string: [ "주별 매출", "누적 매출", "주별 실매출", "누적 실매출" ],
  },
  //출금
  { title: "outmoney",
    callback: [
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if (general_array[0] === '0000') { general_array = row["d5_deposit_yn"].slice(0,10).split('-'); }
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.f3_calculfirst.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.f3_calculfirst.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if (general_array[0] === '0000') { general_array = row["d5_deposit_yn"].slice(0,10).split('-'); }
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.f5_calcullast.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.f5_calcullast.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.h2_refund.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.h2_refund.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
    ],
    data: [ "f4_calculfisrtyn", "f6_calcullastyn", "h4_refund_yn" ],
    string: [ "주별 정산", "누적 정산", "주별 실정산", "누적 실정산" ],
  },
  //순수익
  { title: "puremoney",
    callback: [
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.e2_feeamount.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.e2_feeamount.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.g3_constuctfee.replace(/,/g, ''));
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = Number(row.g3_constuctfee.replace(/,/g, ''));
            }
            return h;
            break;
        }
      },
      function (row, month, sun, stan_start, stan_end, general_array, rows_today) {
        let h = 0;
        switch (sun) {
          case 0:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = (Number(row.h2_refund.replace(/,/g, '')) * -1);
            }
            return h;
            break;
          case 1:
            if ((Number(rows_today.getFullYear()) === Number(general_array[0])) && (Number(stan_start[0]) === Number(general_array[1])) && (Number(stan_start[1]) <= Number(general_array[2])) && (Number(stan_end[1]) >= Number(general_array[2]))) {
              h = (Number(row.h2_refund.replace(/,/g, '')) * -1);
            }
            return h;
            break;
        }
      },
    ],
    data: [ "f6_calcullastyn", "g5_constuct_yn", "h4_refund_yn" ],
    string: [ "매출 예정", "정산 예정", "주별 순수익", "누적 순수익" ],
    },
  ],
  callback: [
    function (arr) {
      let h = '<p><strong>총 매출 </strong><b style="color:#2fa678;font-weight:200;">' + arr[0] + '</b><strong>원</strong></p>';
      h += '<p><strong>총 순수익 </strong><b style="color:#2fa678;font-weight:200;">' + arr[2] + '</b><strong>원</strong></p>';
      return h;
    },function () {
      return ${second_table1_width};
    }
  ]
}, function (row) {
  let main_array = document.querySelector("#second_table1_down3").children;
  let week_array;
  for (let i = 0; i < main_array[0].children.length; i++) {
    for (let j = 0; j < main_array[0].children[i].children.length; j++) {
      main_array[2].children[i].children[j].children[0].textContent = Y.auto_comma(Number(main_array[0].children[i].children[j].children[0].textContent.replace(/,/g, '')) - Number(main_array[0].children[i].children[j].children[2].textContent.replace(/,/g, '')));
      main_array[2].children[i].children[j].children[1].textContent = Y.auto_comma(Number(main_array[1].children[i].children[j].children[0].textContent.replace(/,/g, '')) - Number(main_array[1].children[i].children[j].children[2].textContent.replace(/,/g, '')));
      main_array[2].children[i].children[j].children[1].style.color = "#404040";
    }
  }
});
funcs2.title1(function (rows) {
  let main_array = document.querySelector("#second_table1_down3").children;
  let mon;
  let tol = 0, don1 = 0, don2 = 0;
  for (let i = 0; i < main_array[0].children.length; i++) {
    mon = document.getElementById('second_table1_down3').querySelectorAll('.second_monthly_calc')[i].querySelectorAll('p')[1].children[1].textContent.replace(/,/g, '');
    tol += Number(mon);
    for (let j = 0; j < main_array[2].children[i].children.length; j++) {
      mon = main_array[2].children[i].children[j].children[0].textContent.replace(/,/g, '');
      don1 += Number(mon);
      mon = main_array[2].children[i].children[j].children[1].textContent.replace(/,/g, '');
      don2 += Number(mon);
    }
  }
  let h = '';
  h += '<p>총 순수익 <b>' + Y.auto_comma(tol) + '</b>원</p>';
  h += '<strong> | </strong>';
  h += '<p>입금 대기 <b>' + Y.auto_comma(don1) + '</b>원</p>';
  h += '<strong> | </strong>';
  h += '<p>출금 대기 <b>' + Y.auto_comma(don2) + '</b>원</p>';
  return h;
});

</script>
<style>
.second_table1_week{width:${second_table1_width}px;}
:root{--second-ycolumn: 125px;}
</style>
<script>

`;
return { inlinejs: js, inlinecss: css, second: second };
}
