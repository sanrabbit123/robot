const Diagram = function () {
  this.genemongo = new Genemongo();
}

Diagram.prototype.data_objects = {
  serviceX: { furnishing: "홈퍼니싱", homestyling: "홈스타일링", total: "토탈 스타일링", architecture: "설계 변경" },
  serviceY: { mini: "mini", basic: "basic", premium: "premium" },
  calc: {
    detailitems00: 6,
    detailitems01: 7,
    detailitems02: 8,
    detailitems10: 9,
    detailitems11: 10,
    detailitems12: 13,
    detailitems20: 14,
    detailitems21: 15,
    detailitems22: 16,
    detailitems30: 20,
    detailitems31: 21,
    detailitems32: 25
  },
  progress: {
    contents: { index: 1, title: "1차 미팅 및 컨셉", items: [ "요소1", "요소2", "요소3", "요소4" ] },
    design: { index: 2, title: "디자인 작업", items: [ "요소1", "요소2", "요소3", "요소4", "요소5" ] },
    construct: { index: 3, title: "시공사 연계", items: [ "요소1", "요소2", "요소3", "요소4", "요소5" ] },
    purchase: { index: 4, title: "제품 구매 및 배송 / 설치", items: [ "요소1", "요소2", "제작 가구", "제작 패브릭" ] },
    interview: { index: 5, title: "인터뷰 및 촬영", items: [ "중간 시공 촬영", "최종 인터뷰 촬영" ] },
    money: { index: 6, title: "정산 및 프로젝트 종료", items: [ "요소1", "요소2" ] }
  }
}

Diagram.prototype.inital_div = function () {
  let instance = this;
  let mother = document.getElementById('mongo_totalcontents');
  let div = document.createElement('DIV');
  let input = document.createElement('INPUT');
  input.setAttribute("type", "radio");
  input.classList.add("dd2_radio");
  let label = document.createElement('LABEL');
  let h = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, input_clone, input_clone2, label_clone, label_clone2;

  //-----------------------------------------------------------------two buttons

  let buttons_array = ['기준 보기', '일괄 변경'];
  for (let i = 0; i < buttons_array.length; i++){
    div_clone = div.cloneNode(true);
    div_clone.classList.add("dd2_buttons");
    div_clone.id = "dd2_buttons" + String(i);
    div_clone.textContent = buttons_array[i];

    input_clone = input.cloneNode(true);
    input_clone.setAttribute("name", "dd2_buttons_radio" + String(i));
    input_clone.id = "dd2_buttons_radio" + String(i) + "true";
    input_clone2 = input.cloneNode(true);
    input_clone2.setAttribute("name", "dd2_buttons_radio" + String(i));
    input_clone2.id = "dd2_buttons_radio" + String(i) + "false";
    mother.appendChild(input_clone);
    mother.appendChild(input_clone2);

    if (i === 1) { input_clone2.checked = true; }
    div_clone2 = div.cloneNode(true);
    div_clone2.classList.add('dd2_buttons_img');
    div_clone3 = div.cloneNode(true);
    div_clone3.classList.add('dd2_buttons_img_circle');
    div_clone2.appendChild(div_clone3);
    label_clone = label.cloneNode(true);
    label_clone.classList.add('dd2_buttons_img_label');
    label_clone.id = 'dd2_buttons_img_label_true' + String(i);
    label_clone.setAttribute("for", "dd2_buttons_radio" + String(i) + "true");
    div_clone2.appendChild(label_clone);
    label_clone2 = label.cloneNode(true);
    label_clone2.classList.add('dd2_buttons_img_label');
    label_clone2.id = 'dd2_buttons_img_label_false' + String(i);
    label_clone2.setAttribute("for", "dd2_buttons_radio" + String(i) + "false");
    div_clone2.appendChild(label_clone2);
    div_clone.appendChild(div_clone2);
    mother.appendChild(div_clone);
  }

  //-----------------------------------------------------------------two buttons

  //-----------------------------------------------------------------main box

  let text_arrayX = Object.keys(instance.data_objects.serviceX);
  let text_arrayY = ['Class A', 'Class B', 'Class C'];
  let text_arrayZ = Object.keys(instance.data_objects.serviceY);
  for (let i = 0; i < text_arrayX.length; i++) {
    div_clone = div.cloneNode(true);
    div_clone.classList.add('dd2_Xdetail');
    div_clone2 = div.cloneNode(true);
    div_clone2.classList.add('dd2_Xdetail_text');
    div_clone2.textContent = instance.data_objects.serviceX[text_arrayX[i]];
    div_clone.appendChild(div_clone2);
    h.appendChild(div_clone);
  }

  div_clone2 = div.cloneNode(true);
  div_clone2.classList.add('dd2_Ys');
  for (let i = 0; i < text_arrayY.length; i++) {
    div_clone = div.cloneNode(true);
    div_clone.classList.add('dd2_Ydetail');
    div_clone.classList.add('dd2_Y' + String(i));
    div_clone.textContent = text_arrayY[i];
    div_clone2.appendChild(div_clone);
  }
  h.appendChild(div_clone2);

  div_clone = div.cloneNode(true);
  div_clone.classList.add("dd2_detail");
  for (let i = 0; i < text_arrayX.length; i++) {
    for (let j = 0; j < text_arrayZ.length; j++) {
      div_clone3 = div.cloneNode(true);
      div_clone3.classList.add("dd2_detailitems");
      div_clone3.id = "detailitems" + String(i) + String(j);
      div_clone2 = div.cloneNode(true);
      div_clone2.classList.add("dd2_detailitems_text");
      div_clone2.textContent = instance.data_objects.serviceX[text_arrayX[i]] + ' ' + instance.data_objects.serviceY[text_arrayZ[j]];
      div_clone2.id = "dd2_" + text_arrayX[i] + '_' + text_arrayZ[j];
      div_clone3.appendChild(div_clone2);
      div_clone2 = div.cloneNode(true);
      div_clone2.classList.add("dd2_detailitems_append");
      div_clone2.textContent = "10만원";
      div_clone3.appendChild(div_clone2);
      div_clone.appendChild(div_clone3);
    }
  }
  h.appendChild(div_clone);

  div_clone2 = div.cloneNode(true);
  div_clone2.id = "dd2_diagram";
  div_clone2.appendChild(h);
  mother.appendChild(div_clone2);

  //-----------------------------------------------------------------main box

  //-----------------------------------------------------------------gijun box
  let gijuns = ["300만원", "700만원", "1,000만원", "2,000만원", "3,000만원", "4,000만원", "5,000만원", "1억원"];
  div_clone = div.cloneNode(true);
  div_clone.id = "dd2_gijunbox";
  for (let i = 0; i < gijuns.length; i++) {
    div_clone2 = div.cloneNode(true);
    div_clone2.classList.add("dd2_gijungijun");
    div_clone3 = div.cloneNode(true);
    div_clone3.classList.add("dd2_gijunupdown");
    if (i % 2) { div_clone3.classList.add("dd2_gijunup"); }
    else { div_clone3.classList.add("dd2_gijundown"); }
    div_clone3.textContent = gijuns[i];
    div_clone2.appendChild(div_clone3);
    div_clone.appendChild(div_clone2);
  }
  mother.appendChild(div_clone);

  //-----------------------------------------------------------------gijun box

  //-----------------------------------------------------------------ea box

  div_clone = div.cloneNode(true);
  div_clone.id = "dd2_eabox";
  div_clone.textContent = "단위 : 평당 단가";
  mother.appendChild(div_clone);

  //-----------------------------------------------------------------ea box
}

Diagram.prototype.calc_event = function () {
  let instance = this;
  //click and text-modify
  function node_click(e) {
    let mother = this;
    if (e.target.nodeName !== "TEXTAREA" && e.target.id !== "dd2_detailitems_append_cancel") {
      let div = document.createElement("DIV");
      let textarea = document.createElement("TEXTAREA");
      let textarea_clone, div_clone;
      div_clone = div.cloneNode(true);
      div_clone.id = "dd2_detailitems_append_cancel";
      textarea_clone = textarea.cloneNode(true);
      textarea_clone.classList.add("dd2_detailitems_append_textarea");
      textarea_clone.textContent = this.textContent;
      this.removeChild(this.firstChild);
      this.appendChild(div_clone);
      this.appendChild(textarea_clone);
      textarea_clone.style.color = "#2fa678";
      textarea_clone.focus();
      function update(e) {
        if ((e.type === "keydown" && (e.keyCode === 13 || e.keyCode === 9)) || (e.type === "click" && e.target.nodeName !== "TEXTAREA")) {
          let value = textarea_clone.value;
          while (mother.firstChild) { mother.removeChild(mother.lastChild); }
          mother.textContent = value;
          if (document.querySelector("#dd2_buttons_radio1false").checked) {
            let nodes = document.querySelectorAll('.dd2_detailitems');
            for (let node of nodes) {
              node.children[1].removeChild(node.children[1].firstChild);
              node.children[1].textContent = String(Math.round(Number(value.replace(/[^0-9]/g, '')) * (instance.data_objects.calc[node.id] / instance.data_objects.calc[mother.parentElement.id]))) + "만원";
            }
          }
        }
      }
      textarea_clone.addEventListener("keydown", update);
      div_clone.addEventListener("click", update);
    }
  }
  let nodes = document.querySelectorAll('.dd2_detailitems_append');
  for (let node of nodes) { node.addEventListener("click", node_click); }

  //white popup
  function box_up(e) {
    let mother = this;
    if (e.target.nodeName !== "SECTION" && e.target.nodeName !== "INPUT" && e.target.nodeName !== "LABEL" && e.target.nodeName !== "ASIDE" && e.target.nodeName !== "ARTICLE" && e.target.nodeName !== "TEXTAREA" && e.target.id !== "dd2_detailitems_append_cancel" && e.target.id !== "dd2_detailitems_append_cancel2") {
      let div = document.createElement("DIV");
      let article = document.createElement("ARTICLE");
      let section = document.createElement("SECTION");
      let textarea = document.createElement("TEXTAREA");
      let div_clone, article_clone, section_clone0, section_clone_title, section_clone, textarea_clone;

      //making first popup box
      div_clone = div.cloneNode(true);
      div_clone.id = "dd2_detailitems_append_cancel";
      article_clone = article.cloneNode(true);
      article_clone.classList.add("dd2_detailitems_text_article");
      section_clone0 = section.cloneNode(true);
      section_clone0.classList.add("dd2_detailitems_text_section");
      section_clone_title = section.cloneNode(true);
      section_clone_title.classList.add("dd2_detailitems_text_section_title");
      section_clone_title.id = mother.id.replace(/^dd2_/g, "dd2_popup_");
      section_clone_title.textContent = mother.textContent;
      section_clone0.appendChild(section_clone_title);
      section_clone = section.cloneNode(true);
      section_clone.classList.add("dd2_detailitems_text_section_gray");
      section_clone0.appendChild(section_clone);
      article_clone.appendChild(section_clone0);
      textarea_clone = textarea.cloneNode(true);
      textarea_clone.classList.add("dd2_detailitems_textarea0");
      article_clone.appendChild(textarea_clone);
      section_clone0 = section.cloneNode(true);
      section_clone0.classList.add("dd2_detailitems_section_designer");
      section_clone0.textContent = "디자이너 특이사항";
      article_clone.appendChild(section_clone0);
      textarea_clone = textarea.cloneNode(true);
      textarea_clone.classList.add("dd2_detailitems_textarea1");
      article_clone.appendChild(textarea_clone);

      //append box
      this.appendChild(div_clone);
      this.appendChild(article_clone);
      document.getElementById("mongo_totalcontents").style.background = "#e6e6e6";
      document.getElementById("belowscroll").style.display = "none";

      //cancel event
      div_clone.addEventListener("click", function (e) {
        if (e.target.nodeName !== "SECTION" && e.target.nodeName !== "ARTICLE") {
          mother.removeChild(mother.lastChild);
          mother.removeChild(mother.lastChild);
          document.getElementById("mongo_totalcontents").style.background = "#ffffff";
          document.getElementById("belowscroll").style.display = "block";
        }
      });

      //check event
      async function inputclick_event(e) {
        let boo;
        if (document.getElementById(this.id.replace(/_label$/g, '')).checked) { boo = 0; }
        else { boo = 1; }
        let h = 'where0=' + this.getAttribute("cus_where0") + "&where1=" + this.getAttribute("cus_where1") + "&where2=" + this.getAttribute("cus_where2") + "&value=" + String(boo) + "&itemsboo=1&qquery=sixend_standard";
        let data = await Genemongo.ajax("/diagram_setting_update", h);
        console.log(data);
      }

      //typing event
      function inputtyping_event(e) {
        if (e.target.nodeName !== "TEXTAREA" && e.target.id !== "dd2_detailitems_append_cancel3") {
          let textarea = document.createElement("TEXTAREA");
          let aside = document.createElement("ASIDE");
          let textarea_clone, aside_clone, text;
          let mother = this;
          textarea_clone = textarea.cloneNode(true);
          text = this.textContent;
          textarea_clone.className = "dd2_progressbox_speedarray_speed_array_textarea";
          textarea_clone.textContent = text;
          this.removeChild(this.firstChild);
          aside_clone = aside.cloneNode(true);
          aside_clone.id = "dd2_detailitems_append_cancel3";
          textarea_clone.addEventListener("keydown", async function (e) {
            if (e.keyCode === 13 || e.keyCode === 9) {
              e.preventDefault();
              let text = this.value;
              let h = 'where0=' + mother.getAttribute("cus_where0") + "&where1=" + mother.getAttribute("cus_where1") + "&where2=" + mother.getAttribute("cus_where2") + "&value=" + text + "&itemsboo=0&qquery=sixend_standard";
              while (mother.firstChild) { mother.removeChild(mother.lastChild); }
              mother.textContent = text;
              let data = await Genemongo.ajax("/diagram_setting_update", h);
              console.log(data);
            }
          });
          aside_clone.addEventListener("click", async function (e) {
            let text = textarea_clone.value;
            let h = 'where0=' + mother.getAttribute("cus_where0") + "&where1=" + mother.getAttribute("cus_where1") + "&where2=" + mother.getAttribute("cus_where2") + "&value=" + text + "&itemsboo=0&qquery=sixend_standard";
            while (mother.firstChild) { mother.removeChild(mother.lastChild); }
            mother.textContent = text;
            let data = await Genemongo.ajax("/diagram_setting_update", h);
            console.log(data);
          });
          this.appendChild(aside_clone);
          this.appendChild(textarea_clone);
          textarea_clone.focus();
        }
      }

      //second event - second white popup
      async function second_white_popup(e) {
        let mother = this;
        let target = mother.id.replace(/^dd2_popup_/g, '');
        if (e.target.nodeName !== "ASIDE" && e.target.nodeName !== "INPUT" && e.target.nodeName !== "LABEL" && e.target.nodeName !== "TEXTAREA" && !e.target.classList.contains("dd2_thirddepth") && e.target.id !== "dd2_detailitems_append_cancel2") {

          let data = await Genemongo.ajax("/diagram_setting_reading", "qquery=sixend_standard");
          let setting = JSON.parse(data);
          let div = document.createElement("DIV");
          let aside = document.createElement("ASIDE");
          let input = document.createElement("INPUT");
          let label = document.createElement("LABEL");
          let div_clone, aside_clone, section_clone0, section_clone, section_clone2, input_clone, label_clone, detail, detail2;

          //making cancel back
          div_clone = div.cloneNode(true);
          div_clone.id = "dd2_detailitems_append_cancel2";
          mother.appendChild(div_clone);

          //making second white popup contents
          aside_clone = aside.cloneNode(true);
          aside_clone.id = "dd2_progressbox";

          //white popup contents 1 : title
          section_clone = aside.cloneNode(true);
          section_clone.classList.add("dd2_progressbox_title");
          section_clone.textContent = mother.textContent;
          aside_clone.appendChild(section_clone);

          //white popup contents 2 : six items -------------------------------
          section_clone2 = aside.cloneNode(true);
          section_clone2.classList.add("dd2_progressbox_process_box");
          let progress_contents = instance.data_objects.progress;
          let progress_contents_array = Object.keys(progress_contents);
          for (let i = 0; i < progress_contents_array.length; i++) {
            section_clone = aside.cloneNode(true);
            section_clone.classList.add("dd2_progressbox_process");
            section_clone.id = "dd2_progressbox_process" + String(i);
            //index
            detail = aside.cloneNode(true);
            detail.classList.add("dd2_progressbox_process_index");
            detail.textContent = String(progress_contents[progress_contents_array[i]].index);
            section_clone.appendChild(detail);
            //title
            detail = aside.cloneNode(true);
            detail.classList.add("dd2_progressbox_process_title");
            detail.textContent = progress_contents[progress_contents_array[i]].title;
            section_clone.appendChild(detail);
            //items
            detail = aside.cloneNode(true);
            detail.classList.add("dd2_progressbox_process_items");
            for (let k = 0; k < progress_contents[progress_contents_array[i]].items.length; k++) {
              input_clone = input.cloneNode(true);
              input_clone.setAttribute("type", "checkbox");
              input_clone.classList.add("dd2_progressbox_process_items_detail_checkbox");
              input_clone.id = "dd2_input_" + target + progress_contents_array[i] + String(k);
              if (Boolean(setting[target][progress_contents_array[i]].items[k])) { input_clone.checked = true; }
              detail.appendChild(input_clone);
              detail2 = aside.cloneNode(true);
              detail2.classList.add("dd2_progressbox_process_items_detail");
              detail2.textContent = progress_contents[progress_contents_array[i]].items[k];
              label_clone = label.cloneNode(true);
              label_clone.classList.add("dd2_progressbox_process_items_detail_label");
              label_clone.id = "dd2_input_" + target + progress_contents_array[i] + String(k) + "_label";
              label_clone.setAttribute("for", ("dd2_input_" + target + progress_contents_array[i] + String(k)));
              label_clone.setAttribute("cus_where0", target);
              label_clone.setAttribute("cus_where1", progress_contents_array[i]);
              label_clone.setAttribute("cus_where2", String(k));
              label_clone.appendChild(detail2);
              label_clone.addEventListener("click", inputclick_event);
              detail.appendChild(label_clone);
            }
            section_clone.appendChild(detail);
            //append tong
            section_clone2.appendChild(section_clone);
          }
          aside_clone.appendChild(section_clone2);

          //white popup contents 3 : speed array
          section_clone2 = aside.cloneNode(true);
          section_clone2.classList.add("dd2_progressbox_speedarray_box");

          section_clone = aside.cloneNode(true);
          section_clone.classList.add("dd2_progressbox_speedarray_money");
          section_clone2.appendChild(section_clone);

          section_clone0 = aside.cloneNode(true);
          section_clone0.classList.add("dd2_progressbox_speedarray_money_title");
          section_clone0.textContent = "평당 평균 가격 (원)";
          section_clone.appendChild(section_clone0);

          section_clone0 = aside.cloneNode(true);
          section_clone0.classList.add("dd2_progressbox_speedarray_money_array");
          let money_array = new Array(progress_contents_array.length);
          let speed_array = new Array(progress_contents_array.length);
          for (let k = 0; k < progress_contents_array.length; k++) {
            money_array[k] = setting[target][progress_contents_array[k]].average_money;
            speed_array[k] = setting[target][progress_contents_array[k]].average_speed;
          }
          for (let k = 1; k < 7; k++) {
            detail = aside.cloneNode(true);
            detail2 = aside.cloneNode(true);
            detail.classList.add("dd2_progressbox_speedarray_money_array_title");
            detail2.classList.add("dd2_progressbox_speedarray_money_array_contents");
            detail.textContent = String(k);
            detail2.textContent = money_array[k-1];
            detail2.setAttribute("cus_where0", target);
            detail2.setAttribute("cus_where1", progress_contents_array[k-1]);
            detail2.setAttribute("cus_where2", "average_money");
            detail2.addEventListener("click", inputtyping_event);
            section_clone0.appendChild(detail);
            section_clone0.appendChild(detail2);
          }
          section_clone.appendChild(section_clone0);
          section_clone = aside.cloneNode(true);
          section_clone.classList.add("dd2_progressbox_speedarray_speed");
          section_clone2.appendChild(section_clone);
          section_clone0 = aside.cloneNode(true);
          section_clone0.classList.add("dd2_progressbox_speedarray_speed_title");
          section_clone0.textContent = "평당 평균 속도 (일)";
          section_clone.appendChild(section_clone0);
          section_clone0 = aside.cloneNode(true);
          section_clone0.classList.add("dd2_progressbox_speedarray_speed_array");

          for (let k = 1; k < 7; k++) {
            detail = aside.cloneNode(true);
            detail2 = aside.cloneNode(true);
            detail.classList.add("dd2_progressbox_speedarray_speed_array_title");
            detail2.classList.add("dd2_progressbox_speedarray_speed_array_contents");
            detail.textContent = String(k);
            detail2.textContent = speed_array[k-1];
            detail2.setAttribute("cus_where0", target);
            detail2.setAttribute("cus_where1", progress_contents_array[k-1]);
            detail2.setAttribute("cus_where2", "average_speed");
            detail2.addEventListener("click", inputtyping_event);
            section_clone0.appendChild(detail);
            section_clone0.appendChild(detail2);
          }
          section_clone.appendChild(section_clone0);
          aside_clone.appendChild(section_clone2);

          //final append
          mother.appendChild(aside_clone);
          div_clone.addEventListener("click", function (e) {
            mother.removeChild(mother.lastChild);
            mother.removeChild(this);
          });



        }
      }
      section_clone_title.addEventListener("click", second_white_popup);
    }
  }
  let nodes2 = document.querySelectorAll('.dd2_detailitems_text');
  for (let node of nodes2) { node.addEventListener("click", box_up); }
}

Diagram.prototype.gijun_event = function () {
  let instance = this;
  function node_click(e) {
    let mother = this;
    let grandmother = this.parentElement;
    if (e.target.nodeName !== "TEXTAREA" && e.target.id !== "dd2_gijunupdown_cancel") {
      let div = document.createElement("DIV");
      let textarea = document.createElement("TEXTAREA");
      let textarea_clone, div_clone;
      div_clone = div.cloneNode(true);
      div_clone.id = "dd2_gijunupdown_cancel";
      textarea_clone = textarea.cloneNode(true);
      textarea_clone.classList.add("dd2_gijunupdown_textarea");
      textarea_clone.textContent = this.textContent;
      this.removeChild(this.firstChild);
      this.appendChild(div_clone);
      this.appendChild(textarea_clone);
      grandmother.style.zIndex = 2;
      textarea_clone.focus();
      function update(e) {
        if ((e.type === "keydown" && (e.keyCode === 13 || e.keyCode === 9)) || (e.type === "click" && e.target.nodeName !== "TEXTAREA")) {
          let value = textarea_clone.value;
          while (mother.firstChild) { mother.removeChild(mother.lastChild); }
          mother.textContent = value;
          grandmother.style.zIndex = 'auto';
        }
      }
      textarea_clone.addEventListener("keydown", update);
      div_clone.addEventListener("click", update);
    }
  }
  let nodes = document.querySelectorAll('.dd2_gijunupdown');
  for (let node of nodes) { node.addEventListener("click", node_click); }
}



Diagram.prototype.below_event = async function () {
  let instance = this;

  let designers_row_body = "collection=BD2_deslist&find1=" + JSON.stringify({}) + "&find2=" + JSON.stringify({ a5_name: 1 });
  let designers_row_string = await Genemongo.ajax("/post_mfind", designers_row_body);
  let designers_row = JSON.parse(designers_row_string);
  let designers_arr = [];
  for (let designer of designers_row) {
    designers_arr.push(designer.a5_name);
  }

  let below_html = '<div class="designers_whiteback"></div>';
  below_html += '<div class="designers_selection_box">';
  below_html += '<div class="designers_selection_inline">';
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < designers_arr.length; i++) {
      below_html += '<input type="radio" id="designers' + String(j) + String(i) + '_input" name="designers_input" class="designers_input" value="' + designers_arr[i] + '">';
      below_html += '<label for="designers' + String(j) + String(i) + '_input">';
      below_html += '<div id="designers' + String(j) + String(i) + '_bu" class="designers_obj">'
      below_html += '<div draggable="false" class="designers_text">' + designers_arr[i] + '</div>';
      below_html += '<div class="designers_garim"></div>';
      below_html += '</div>';
      below_html += '</label>';
    }
  }
  below_html += '</div>';
  below_html += '</div>';
  below_html += '<img src="/list_svg/triangle1_white.svg" class="designers_img1">';
  below_html += '<img src="/list_svg/triangle2_white.svg" class="designers_img2">';
  document.getElementById("belowgreen").insertAdjacentHTML("beforeend", below_html);

  let obj = document.querySelectorAll(".designers_obj");
  let obj_input = document.querySelectorAll(".designers_input");
  let obj_num = obj.length / 10;
  function obj_event(e) {
    function moving(grand, grand2, obj, m2) {
      let l = Math.abs(parseInt(grand.getBoundingClientRect().left)) + obj.getBoundingClientRect().left - (parseInt(grand2.getBoundingClientRect().width * m2)/100);
      return l;
    }
    let mother = this.parentElement.parentElement;
    let grandmother = this.parentElement.parentElement.parentElement;
    grandmother.scrollTo({left: moving(mother, grandmother, this, 49.5), behavior:'smooth'});
  }
  for (let node of obj) {
    node.addEventListener("click", obj_event);
  }

  function move_hwa(e) {
    let target, num, gijun, fafa;
    for (let input of obj_input) {
      if (input.checked) { target = input; }
    }
    num = target.id.replace(/[^0-9]/g, '');
    gijun1 = Number(num.slice(0, 1));
    gijun2 = Number(num.slice(1));
    if (this.className === "designers_img2") {
      fafa = (((gijun2 + 1) >= obj_num) ? ((gijun1 !== 9) ? String(gijun1 + 1) : String(0)) : String(gijun1)) + (((gijun2 + 1) >= obj_num) ? String(0) : String(gijun2 + 1));
    } else {
      fafa = (((gijun2 - 1) < 0) ? ((gijun1 !== 0) ? String(gijun1 - 1) : String(0)) : String(gijun1)) + (((gijun2 - 1) < 0) ? String(obj_num - 1) : String(gijun2 - 1));
    }
    document.getElementById("designers" + fafa + "_input").checked = true;
    obj_event.call(document.getElementById("designers" + fafa + "_bu"), {});
  }

  let hwa_left = document.querySelector(".designers_img1");
  let hwa_right = document.querySelector(".designers_img2");
  hwa_left.addEventListener("click", move_hwa);
  hwa_right.addEventListener("click", move_hwa);

  setTimeout(function () {
    let target = document.getElementById('designers60_input');
    target.checked = true;
    let target2 = document.getElementById('designers60_bu');
    let mother = target2.parentElement.parentElement;
    let grandmother = target2.parentElement.parentElement.parentElement;
    grandmother.scrollTo({left: (15795 - (window.innerWidth / 2)), behavior:'smooth'});
  }, 0);
}



Diagram.prototype.launching = function () {
  this.inital_div();
  this.calc_event();
  this.gijun_event();
  this.below_event();
}
