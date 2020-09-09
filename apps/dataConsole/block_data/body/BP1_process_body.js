module.exports = function (d) {
//Inline js
let js = `

const plugin1 = {};
let funcs_arr = [
  function (m1, m2) { console.log('Callbacks : ', m1, m2); },
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
  }
};

const funcs_obj = {
  a5_name: function (obj) {
    funcs_funcs.ajax_update(['a5_name', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
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
      funcs_funcs.ajax_update(['e1_fee', rows[0].c1_fees, obj.where, obj.standard, 'BP2_calculation']);
    });
  },
  b1_process: function (obj) {
    funcs_funcs.ajax_update(['b1_process', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
    function blank_and_hypen(obj, boo) {
      let mother = document.getElementById("row" + obj.r_id.replace(/^_[rc]/g, ''));
      let collection = mother.children;
      if (boo) {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '') {
          collection[i].textContent = '-';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '-', obj.where, 'a4_customernumber', 'BP1_process']);
        }}
      } else {
        for (let i = 1; i < collection.length; i++) { if (collection[i].textContent === '-') {
          collection[i].textContent = '';
          funcs_funcs.ajax_update([collection[i].id.replace(/_[rc][0-9]+$/g, ''), '', obj.where, 'a4_customernumber', 'BP1_process']);
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

    let sessionupdate = "title=BP1_process&method=color&thisid=" + obj.where + "&thisid2=color_palettes_backdiv_standard&value=" + this_target.style.background;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/session_update3');
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) { return }
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        let sessionupdate2 = "title=BP2_calculation&method=color&thisid=" + obj.where + "&thisid2=color_palettes_backdiv_standard&value=" + this_target.style.background;
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
  b2_contractfee: function (obj) {
    funcs_funcs.ajax_update(['d5_deposit_yn', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
  },
  b3_designfee: function (obj) {
    funcs_funcs.ajax_update(['d6_left_yn', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
  },
  g1_constuct: function (obj) {
    funcs_funcs.ajax_update(['g1_constuct', obj.data, obj.where, 'a4_customernumber', 'BP2_calculation']);
  }
};

`;
//Inline css
let css = [ 1200, `` ];
//Second
let second = `
funcs2.title0('현재 진행 상황');
funcs2.progress_bar({
  standard: ['b1_process','진행중'],

}, function () {

});
funcs2.title1(function (rows) {
  let count1 = 0;
  let count2 = 0;
  for (let row of rows) {
    if (row.b1_process === '진행중') { count1 = count1 + 1; }
    else if (row.b1_process === '완료') { count2 = count2 + 1; }
  }
  let h;
  h = '<p>총 <b>' + String(count1) + '</b> 프로젝트 진행중</p>';
  h += '<strong> | </strong>';
  h += '<p><b>' + String(count2) + '</b> 프로젝트 완료</p>';
  return h;
});



`;
return { inlinejs: js, inlinecss: css, second: second };
}
