const M_pictureselection = function (col) {
  let queryselec = '.rowdiv > .';
  for (let i of col) {
    queryselec += i + ',.rowdiv > .';
  }
  queryselec = queryselec.slice(0,-12);
  this.exceptions_col = queryselec;
}

M_pictureselection.prototype.set_pictureselection = function () {
  let queryselec = this.exceptions_col;
  return function (m, mege) {
    let target_node = document.querySelectorAll(queryselec);
    if (mege === 'trs') {
      for (let node of target_node) { node.classList.add('trs_pictureselection'); }
    }
  };
}

M_pictureselection.prototype.pictureselection = function () {
  return function (m, mege) {
    let instance = m;
    function pictureselection_event(e) {
      this.c = instance.data_flow.onoff_c;
      if ((e.target.id !== "cancel_back" && e.target.id !== "pictureselectionbox" && e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "SECTION" && e.target.nodeName !== "P") && this.c === 0) {
        instance.data_flow.past_data.unshift(this.textContent);
        let left = instance.rowcards('exceptions', mege, true, this, ['position:fixed;top:20%;left:3.5%;width:calc(90% - 53px);height:63.5%;', 13, 51]);
        let div = '<div style="display:none;">' + this.textContent + '</div>';
        this.textContent = '';
        this.style.cssText = "color: #009c6a;overflow: visible;";

        //append div
        if (mege === 'tcs') {
          document.getElementById('cardviewbox').scrollTo({ top: 0, behavior: 'smooth' });
          this.parentNode.parentNode.appendChild(instance.divmaker("pictureselectionbox", left, div));
        } else {
          this.appendChild(instance.divmaker("pictureselectionbox", left, div));
        }

        //update event - ajax this
        (function (m) {
          let main_box = document.getElementById('pictureselectionbox');
          let main_arr = m.textContent.split(',');
          console.log(main_arr);
          let this_col = m.id.replace(/_[rc][0-9]+/g, '');
          let this_id = /_[rc][0-9]+/g.exec(m.id)[0];
          let cancel_node = document.querySelectorAll('#cancel_back');

          if (main_arr[0] !== 'nothing') {
            let dataq = "SELECT l.porlid,l.title,d.photosg FROM porlist AS l JOIN pordeta AS d ON l.porlid = d.porlid WHERE";
            for (let i of main_arr){
              dataq += " l.porlid = '" + i + "' OR";
            }
            dataq = dataq.slice(0,-3) + ";";
            let read_query = 'qquery=' + dataq;
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/post_read_arr');
            xhr.onreadystatechange = function (e) {
              if (xhr.readyState !== 4) { return }
              if (xhr.status === 200) {
                let rows = JSON.parse(xhr.responseText);
                let result = '';
                let img = '';
                let arr = [];
                let width = 0;
                for (let i of rows) {
                  arr = i.photosg.split(' ');
                  img = '';
                  width = 0;
                  for (let j = 0;j < arr.length;j++) {
  									img += '<input type="checkbox" class="picocheck" id="t' + String(j+1) + i.porlid + '_input">';
  									img += '<div class="picocheck_div">';
  									img += '<img id="t' + String(j+1) + i.porlid + '_img" src="/list_image/portp' + i.porlid + '/t' + String(j+1) + i.porlid + '.jpg" class="picimg">';
  									img += '<label for="t' + String(j+1) + i.porlid + '_input" class="picocheck_label">';
  									img += '<img src="/list_svg/checkicon0.svg" class="checkicon0">';
  									img += '<img src="/list_svg/checkicon1.svg" class="checkicon1">';
  									img += '</label>';
  									img += '</div>';
  									width += ((arr[j] === 'g') ? 363.77 : 186.66);
  								}
  								result += '<section class="picdiv_row">';
                  result += `<figure class="picdiv" id="${this_col}_idbox${this_id}">${i.porlid}</figure>`;
  								result += `<aside class="picdiv" id="${this_col}_textbox${this_id}">`;
                  result += ` : ${i.title}<strong style="font-weight:300;color:#dddddd"> | </strong>`;
  								result += `<input type="checkbox" class="picopen" id="picopen_${i.porlid + this_id}" checked>`;
                  result += `<label id="picopenla_${i.porlid + this_id}" class="piclabel" for="picopen_${i.porlid + this_id}">사진 보기</label>`;
                  result += '</aside>';
                  result += '</section>';
  								result += `<div id="${this_col}_imgbox_${i.porlid + this_id}" class="picimgbox">`;
  								result += `<div id="${this_col}_imgboxscr_${i.porlid + this_id}" class="picimgboxscr" style="width:${String(width + 100)}px">${img}</div>`;
  								result += '</div>';
                }
                while (main_box.firstChild) { main_box.removeChild(main_box.lastChild); }
                main_box.insertAdjacentHTML('beforeend', result);

                //ajax after events
                (function () {
                  let slider = document.querySelectorAll('.picimgbox');
                	let isDown = false;
                	let startX;
                	let scrollLeft;
                  for (let i = 0; i < slider.length; i++) {
                  	slider[i].addEventListener('mousedown', function (e) {
                  		isDown = true;
                  		startX = e.pageX - slider[i].offsetLeft;
                  		scrollLeft = slider[i].scrollLeft;
                  	});
                  	slider[i].addEventListener('mouseleave', function (e) {
                  		isDown = false;
                  	});
                  	slider[i].addEventListener('mouseup', function (e) {
                  		isDown = false;
                  	});
                  	slider[i].addEventListener('mousemove', function (e) {
                  		if (!isDown) { return }
                  		e.preventDefault();
                  		let x = e.pageX - slider[i].offsetLeft;
                  		let walk = x - startX;
                  		slider[i].scrollLeft = scrollLeft - walk;
                  	});
                  }

                  let label_node = document.querySelectorAll(".piclabel");
                  function label_event(e) {
                    let _r = /_[rc][0-9]+/gi.exec(this.id)[0];
                    let _a = /_[abcdefgmnopq][0-9]+/gi.exec(this.id)[0];
                    if (document.getElementById('picopen' + _a + _r).checked) { document.getElementById(this_col + '_imgbox' + _a + _r).style.cssText = 'height: 0px;border-bottom: 1px solid #dddddd'; }
                    else { document.getElementById(this_col + '_imgbox' + _a + _r).style.cssText = 'height: 250px;border-bottom: 0px solid'; }
                  };
                  for (let node of label_node) { node.addEventListener("click" ,label_event); }
                })();
              } else {
                console.log('error', e);
              }
            }
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(read_query);
          }

          function cancel_event(e) {
            //update past div
            while (m.firstChild) { m.removeChild(m.lastChild); }
            m.textContent = instance.data_flow.past_data[0];
            instance.rowcards('exceptions', mege, false, m, ['', 19, 51]);
            m.style.cssText = "color: #404040;overflow: hidden;";

            //finishing
            instance.data_flow.onoff_c = 0;
            m.c = instance.data_flow.onoff_c;
            if (document.getElementById('cancel_back')) {
              document.getElementById('cancel_back').remove();
              document.getElementById('pictureselectionbox').remove();
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
    let pictureselection_node = document.querySelectorAll('.' + mege + '_pictureselection');
    for (let node of pictureselection_node) { node.addEventListener("click", pictureselection_event); }
  };
}
