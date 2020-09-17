// Create process 1 ------------------------------------------------------------

Proposal.toggleTimeout = {
  first: {},
  second: {},
  fourth: {},
  fourth_load: {},
  load_init: {},
  load_init_in: {},
  load_zero: {},
  load_second: {},
  load_third: {},
}

Proposal.prototype.firstToggle = function (m, domBox) {
  const instance = this;
  let nodes = {
    title: domBox.get("고객 선택").children[0],
    contents: domBox.get("고객 선택").children[1],
  }
  if (m === "on") {
    return function (e) {
      if (instance.toggleSetting.first === 0) {
        Proposal.toggleTimeout.first = setTimeout(function () {
          instance.below_launching("second", m);
          domBox.get("고객 선택").style.height = "3.2vh";
          domBox.get("고객 선택").style.borderBottom = "1px solid #ececec";
          domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
          domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
          domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

          let service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
          for (let i of service) {
            i.style.background = "white";
            i.children[0].style.color = "#59af89";
            i.children[0].style.fontSize = "1.7vh";
          }
          if (/^M/g.test(navigator.platform)) {
            for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
            for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
            for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }
          } else {
            for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "0px"; }
            for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-1px"; }
            for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-4px"; }
          }

          let service_input = domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
          for (let i of service_input) {
            if (i.checked) {
              i.nextElementSibling.style.background = "#59af89";
              i.nextElementSibling.children[0].style.color = "white";
            }
          }
          nodes.title.style.color = "#59af89";
          nodes.contents.style.background = "white";

          if (document.querySelector("#pp_title_sub_b")) { document.querySelector("#pp_title_sub_b").remove(); }
          nodes.title.insertAdjacentHTML('beforeend', '<b id="pp_title_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_id") + '" style="color:#59af89;font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
          instance.toggleSetting.first = 1;
        }, 300);
      }
    }
  } else if (m === "off") {
    return function (e) {
      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 0) {
        clearTimeout(Proposal.toggleTimeout.first);
        instance.below_launching("second", m);
        domBox.get("고객 선택").style.height = "";
        domBox.get("고객 선택").style.borderBottom = "";
        domBox.get("서비스 선택").style.height = "";
        domBox.get("서비스 선택").children[1].style.height = "";
        domBox.get("서비스 선택").children[1].style.marginTop = "";
        let service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.background = "";
          i.children[0].style.color = "";
          i.children[0].style.fontSize = "";
          i.children[0].style.marginTop = "";
        }
        nodes.title.style.color = "";
        nodes.contents.style.background = "";
        instance.toggleSetting.first = 0;
      }
    }
  }
}

Proposal.prototype.firstProcess = async function () {
  let h = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let titles = [ "pp_firstprocess_box", "pp_secondprocess_box", "pp_thirdprocess_box", ];
  let titles_con = [ "고객 선택", "서비스 선택", "디자이너 선택", ];
  let domBox = new Map();
  for (let i = 0; i < titles.length; i++) {
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.id = titles[i];
    div_clone.classList.add("pp_box");
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_title");
    div_clone2.textContent = titles_con[i];
    div_clone.appendChild(div_clone2);
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_contents");
    div_clone.appendChild(div_clone2);
    h.appendChild(div_clone);
    domBox.set(titles_con[i], div_clone);
  }
  this.mother.appendChild(h);
  console.log(domBox);
  let clients = JSON.parse(await Genemongo.ajax("/post_select", "col_arr=a4_customernumber,a19_name&title=BC1_conlist&standard=a1_class1&where=응대중"));
  div_clone4 = Genemongo.nodes.div.cloneNode(true);
  div_clone4.classList.add("pp_contents_inbox");

  for (let i = 0; i < clients.length; i++) {
    input_clone = Genemongo.nodes.input.cloneNode(true);
    input_clone.classList.add("pp_clients_input");
    input_clone.id = "pp_clients_input" + String(i);
    input_clone.setAttribute("type", "radio");
    input_clone.setAttribute("name", "pp_clients_input");
    div_clone4.appendChild(input_clone);
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_clients");
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.textContent = clients[i].a4_customernumber + " | " + clients[i].a19_name;
    div_clone.appendChild(div_clone2);
    label_clone = Genemongo.nodes.label.cloneNode(true);
    label_clone.classList.add("pp_clients_label");
    label_clone.setAttribute("for", "pp_clients_input" + String(i));
    label_clone.setAttribute("cus_value", clients[i].a19_name);
    label_clone.setAttribute("cus_id", clients[i].a4_customernumber);
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("garim");
    label_clone.appendChild(div_clone2);
    label_clone.addEventListener("click", this.firstToggle("on", domBox));
    div_clone.appendChild(label_clone);
    div_clone4.appendChild(div_clone);
    domBox.get(titles_con[0]).children[1].appendChild(div_clone4);
  }
  domBox.get(titles_con[0]).children[0].addEventListener("click", this.firstToggle("off", domBox));
  this.below_launching("first");
  return domBox;
}

// Create process 2 ------------------------------------------------------------

Proposal.prototype.secondToggle = function (m, domBox) {
  let instance = this;
  if (m === "on") {
    return function (e) {
      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 0) {
        let service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.background = "white";
          i.children[0].style.color = "#59af89";
          i.children[0].style.fontSize = "1.7vh";
        }
        for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
        for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
        for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }
        let target0 = e.target.parentNode.parentNode;
        let target1 = e.target.parentNode.parentNode.children[0];
        target0.style.background = "#59af89";
        target1.style.color = "white";
        Proposal.toggleTimeout.second = setTimeout(function () {
          instance.below_launching("third", m);
          domBox.get("서비스 선택").children[0].style.color = "#59af89";
          domBox.get("서비스 선택").children[1].style.background = "white";
          if (document.querySelector("#pp_title2_sub_b")) { document.querySelector("#pp_title2_sub_b").remove(); }
          domBox.get("서비스 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title2_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_value") + '" style="color:#59af89;font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
          domBox.get("서비스 선택").style.height = "3.2vh";
          domBox.get("서비스 선택").style.borderBottom = "1px solid #ececec";
          for (let i of service) { i.style.opacity = "0"; }
          instance.toggleSetting.second = 1;
          domBox.get("서비스 선택").children[1].style.height = "";
          domBox.get("서비스 선택").children[1].style.marginTop = "";
          domBox.get("디자이너 선택").style.height = "calc(100% - 6.4vh - 63px)";
          domBox.get("디자이너 선택").children[1].style.height = "calc(90% + 2.7vh)";
          domBox.get("디자이너 선택").children[1].style.marginTop = "-2.7vh";
          instance.thirdChildren.get("box1_designerInput").focus();
          instance.thirdChildren.get("box1_designerInput").style.color = "#59af89";
          instance.thirdChildren.get("box1_title").style.color = "#59af89";
          instance.thirdChildren.get("box1_designerInput").style.fontSize = "24px";
          instance.thirdChildren.get("box1_title").style.fontSize = "24px";
          instance.thirdChildren.get("box1").style.background = "white";
          instance.thirdChildren.get("box1").style.border = "1px solid #dddddd";
          document.querySelector(".pp_designer_question").classList.remove("pp_designer_question_remove");
          document.querySelector(".pp_designer_question").classList.add("pp_designer_question_add");
          document.querySelector(".pp_designer_question_press").classList.remove("pp_designer_question_press_remove");
          document.querySelector(".pp_designer_question_press").classList.add("pp_designer_question_press_add");
        }, 300);
      }
    }
  } else if (m === "off") {
    return function (e) {
      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 1) {
        clearTimeout(Proposal.toggleTimeout.second);
        document.querySelector(".pp_designer_question").classList.add("pp_designer_question_remove");
        document.querySelector(".pp_designer_question").classList.remove("pp_designer_question_add");
        document.querySelector(".pp_designer_question_press").classList.add("pp_designer_question_press_remove");
        document.querySelector(".pp_designer_question_press").classList.remove("pp_designer_question_press_add");
        instance.below_launching("third", m);
        let service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        domBox.get("서비스 선택").children[0].style.color = "";
        domBox.get("서비스 선택").children[1].style.background = "";
        domBox.get("서비스 선택").style.height = "";
        domBox.get("서비스 선택").style.borderBottom = "";
        instance.toggleSetting.second = 0;
        domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
        domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
        domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";
        for (let i of service) {
          i.style.opacity = "";
          i.style.background = "white";
          i.children[0].style.color = "#59af89";
          i.children[0].style.fontSize = "1.7vh";
        }
        for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
        for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
        for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }
        let service_input = domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
        for (let i of service_input) { if (i.checked) { i.nextElementSibling.style.background = "#59af89";i.nextElementSibling.children[0].style.color = "white"; } }
        domBox.get("디자이너 선택").style.height = "";
        domBox.get("디자이너 선택").children[1].style.height = "";
        domBox.get("디자이너 선택").children[1].style.marginTop = "";

        instance.thirdChildren.get("box1_designerInput").style.color = "";
        instance.thirdChildren.get("box1_title").style.color = "";
        instance.thirdChildren.get("box1_designerInput").style.fontSize = "";
        instance.thirdChildren.get("box1_title").style.fontSize = "";
        instance.thirdChildren.get("box1").style.background = "";
        instance.thirdChildren.get("box1").style.border = "";
        instance.thirdChildren.get("box1_question").style.top = "";
        if (document.querySelector("#pp_designer_question_press")) { document.querySelector("#pp_designer_question_press").remove(); }

      }
    }
  }
}

Proposal.prototype.secondProcess = async function () {
  let second = {}
  second.total = this.domBox.get("서비스 선택");
  second.title = second.total.children[0];
  second.contents = second.total.children[1];
  let h = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let serviceX = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "설계 변경" ];
  let serviceY = [ "mini", "basic", "premium" ];
  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_contents_inbox");
  for (let i = 0; i < serviceY.length; i++) {
    for (let j = 0; j < serviceX.length; j++) {
      input_clone = Genemongo.nodes.input.cloneNode(true);
      input_clone.classList.add("pp_clients_input");
      input_clone.id = "pp_service_input" + String(j) + String(i);
      input_clone.setAttribute("type", "radio");
      input_clone.setAttribute("name", "pp_service_input");
      div_clone.appendChild(input_clone);
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_service");
      div_clone3 = Genemongo.nodes.div.cloneNode(true);
      div_clone3.classList.add("pp_service_wording");
      div_clone3.textContent = serviceX[j] + ' ' + serviceY[i];
      div_clone2.appendChild(div_clone3);
      label_clone = Genemongo.nodes.label.cloneNode(true);
      label_clone.classList.add("pp_clients_label");
      label_clone.setAttribute("for", "pp_service_input" + String(j) + String(i));
      label_clone.setAttribute("cus_value", serviceX[j] + ' ' + serviceY[i]);
      label_clone.addEventListener("click", this.secondToggle("on", this.domBox));
      div_clone3 = Genemongo.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      label_clone.appendChild(div_clone3);
      div_clone2.appendChild(label_clone);
      div_clone.appendChild(div_clone2);
    }
  }
  second.total.addEventListener("click", this.secondToggle("off", this.domBox));
  second.contents.appendChild(div_clone);
}

// Create process 3 ------------------------------------------------------------

Proposal.prototype.thirdKeyup = function () {
  const instance = this;
  return function (e) {
    if (e.cancelable) { e.preventDefault(); }
    if (e.keyCode !== 13 && e.keyCode !== 9) {
      if (this.value.length > 2) { this.value = "4명"; }
      this.value = this.value.replace(/[^0-9]/g, '') + "명";
    } else {
      instance.fourthProcess(Number(this.value.replace(/[^0-9]/g, '')));
    }
  }
}

Proposal.prototype.thirdProcess = async function () {
  let third = {}
  third.total = this.domBox.get("디자이너 선택");
  third.title = third.total.children[0];
  third.contents = third.total.children[1];
  let h = document.createDocumentFragment();
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let children = new Map();

  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_contents_inbox");
  for (let i = 0; i < 3; i++) {
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer");
    div_clone.appendChild(div_clone2);
    children.set("box" + String(i), div_clone2);
  }
  third.contents.appendChild(div_clone);

  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_designer_question");
  children.set("box1_question", div_clone);

  div_clone2 = Genemongo.nodes.div.cloneNode(true);
  div_clone2.textContent = "추천 디자이너 수 : "
  div_clone.appendChild(div_clone2);
  children.set("box1_title", div_clone2);

  input_clone = Genemongo.nodes.input.cloneNode(true);
  input_clone.id = "pp_designer_question_input";
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("name", "pp_designer_question_input");
  input_clone.setAttribute("value", "3명");
  div_clone.appendChild(input_clone);

  div_clone3 = Genemongo.nodes.div.cloneNode(true);
  div_clone3.className = "pp_designer_question_press";
  div_clone3.textContent = "완료 후 Enter나 Tap키를 누르세요.";
  div_clone.appendChild(div_clone3);

  children.set("box1_designerInput", input_clone);
  children.get("box1").appendChild(div_clone);
  input_clone.addEventListener("keydown", function (e) {
    if (e.keyCode === 13 || e.keyCode === 9) { if (e.cancelable) { e.preventDefault(); } }
  });
  input_clone.addEventListener("keyup", this.thirdKeyup());

  return children;
}

// Create process 4 ------------------------------------------------------------

Proposal.prototype.fourthsetTimeout = async function (num, obj = {}) {
  let fourthChildren = new Map();
  let instance = this;
  let thirdChildren = this.thirdChildren;
  let domBox = this.domBox;
  let fourth = {}
  fourth.total = domBox.get("디자이너 선택");
  fourth.title = fourth.total.children[0];
  fourth.contents = fourth.total.children[1];
  fourth.box = fourth.contents.querySelector(".pp_contents_inbox");
  fourth.titles = [ "디자이너 이름", "서비스 방식", "서비스 금액", "사진 선택" ];
  fourth.callbacks = new Map();
  fourth.events = {};

  fourth.events.money = function (e) {
    if (this.value === '') { this.value = "0"; }
    if (e.type === "keyup") {
      if (e.keyCode === 13 || e.keyCode === 9) {
        this.value = Proposal.auto_comma(this.value);
      }
    } else if (e.type === "blur") {
      this.value = Proposal.auto_comma(this.value);
    }
    this.style.width = String(0.85 * this.value.length) + "vh";
    if (this.value.replace(/,/g, '').length < 7) {
      this.style.width = String(0.9 * this.value.length) + "vh";
    }
    if (this.value.replace(/,/g, '').length < 4) {
      this.style.width = String(1.1 * this.value.length) + "vh";
    }
  }

  let money_set = function (onoff, s = 0) {
    let div_clone, div_clone2, div_clone3, input_clone;
    //set
    div_clone3 = Genemongo.nodes.div.cloneNode(true);
    div_clone3.classList.add("pp_designer_selected_box_contents_money_set");
    //--------------------------------------------------------------------------
    if (typeof onoff === "string") {
      div_clone3.classList.add("pp_designer_selected_box_contents_money_set" + ((onoff === "오프라인") ? "_offline" : "_online"));
    } else {
      div_clone3.classList.add("pp_designer_selected_box_contents_money_set" + ((onoff.fee[s].method === "offline") ? "_offline" : "_online"));
    }
    //--------------------------------------------------------------------------
    //1
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer_selected_box_contents_money_text");
    //--------------------------------------------------------------------------
    if (typeof onoff === "string") {
      div_clone2.textContent = onoff;
    } else {
      div_clone2.textContent = ((onoff.fee[s].method === "offline") ? "오프라인" : "온라인");
    }
    //--------------------------------------------------------------------------
    div_clone3.appendChild(div_clone2);
    //2
    input_clone = Genemongo.nodes.input.cloneNode(true);
    input_clone.setAttribute("type", "text");
    input_clone.classList.add("pp_designer_selected_box_contents_money_input");
    //--------------------------------------------------------------------------
    if (typeof onoff === "string") {
      input_clone.value = "2,000,000";
    } else {
      input_clone.value = Proposal.auto_comma(String(onoff.fee[s].money));
    }
    //--------------------------------------------------------------------------
    input_clone.style.width = String(0.85 * input_clone.value.length) + "vh";
    input_clone.addEventListener("keyup", fourth.events.money);
    input_clone.addEventListener("blur", fourth.events.money);
    div_clone3.appendChild(input_clone);
    //3
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer_selected_box_contents_money_text2");
    div_clone2.insertAdjacentHTML("beforeend", '원');
    div_clone3.appendChild(div_clone2);
    return div_clone3;
  }

  fourth.events.designer = function (e) {
    function getnode(num, boo = true) {
      if (boo) {
        return instance.fourthChildren.get("box" + e.target.getAttribute("cus_num")).children[3].children[num].style;
      } else {
        return instance.fourthChildren.get("box" + e.target.getAttribute("cus_num")).children[3].children[1].children[0].style;
      }
    }
    getnode(0).color = "#59af89";
    getnode(1).background = "#59af89";
    getnode(1, false).color = "white";

    let target;
    if ((target = document.getElementById("pp_designer_selected_box_contents_selection" + this.getAttribute("cus_num"))) !== null) {
      while (target.firstChild) {
        target.removeChild(target.lastChild);
      }
      target.textContent = this.getAttribute("cus_value") + " 디자이너의 사진 선택";
    }

    target = document.querySelectorAll('.pp_designer_selected_box_value')[Number(this.getAttribute("cus_num"))];
    if (target.textContent !== "") {
      target.textContent = '';
    }
  }

  fourth.events.service = function (e) {
    let n = this.getAttribute("cus_id").replace(/[^0-9]/g, '');
    if (document.getElementById(this.parentElement.getAttribute("for")).checked) {
      // alert("off")
      if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
        document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).querySelector(".pp_designer_selected_box_contents_money_set" + ((this.getAttribute("cus_value") === "오프라인") ? "_offline" : "_online")).remove();
      }
    } else {
      // alert("on")
      if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
        document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).appendChild(money_set(this.getAttribute("cus_value")));
      }
    }
  }

  fourth.events.popup = async function (e) {
    let n = this.getAttribute("cus_id").replace(/[^0-9]/g, '');
    if (this.textContent !== "디자이너를 선택해주세요!") {
      let selected = document.querySelectorAll(".pp_designer_selected");
      let selected_box = selected[n].querySelector(".pp_designer_selected_box_contents_designers_total");
      let inputs = selected_box.querySelectorAll("input");
      let desid;
      for (let input of inputs) {
        if (input.checked) { desid = input.value }
      }
      instance.below_launching("fifth", "on");
      let fifth = await instance.fifthProcess(desid, n);
      fifth();
    } else {
      alert("디자이너를 선택해주세요!");
    }
  }

  //디자이너 이름
  //------------------------------------------------------------------------
  let designers = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Designer&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({ designer: 1, past_desid: 1 })));
  //------------------------------------------------------------------------

  fourth.callbacks.set("디자이너 이름", function (dom, n) {
    let input = Genemongo.nodes.input.cloneNode(true);
    input.classList.add("pp_designer_selected_box_contents_designers_input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "pp_designer_selected_box_contents_designers_input" + String(n));
    input.style.display = "none";
    let div_clone, div_clone2, div_clone3, input_clone, label_clone;
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_designers_total");
    let i = 0;
    for (let designer of designers) {
      input_clone = input.cloneNode(true);
      input_clone.id = "pp_designer_selected_box_contents_designers_input" + String(n) + String(i);
      input_clone.value = designer.past_desid;
      div_clone.appendChild(input_clone);
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.textContent = designer.designer;
      label_clone = Genemongo.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_designers_input" + String(n) + String(i));
      div_clone3 = Genemongo.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      div_clone3.setAttribute("cus_value", designer.designer);
      div_clone3.setAttribute("cus_num", String(n));
      div_clone3.addEventListener("click", fourth.events.designer);
      label_clone.appendChild(div_clone3);
      div_clone2.appendChild(label_clone);
      div_clone.appendChild(div_clone2);
      //------------------------------------------------------------------------
      if (obj.proposal !== undefined) {
        if (designer.past_desid === obj.proposal[n].desid) {
          input_clone.checked = true;
        }
      }
      //------------------------------------------------------------------------
      i = i + 1;
    }
    for (let j = 0; j < 10; j++) {
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.textContent = "자이너";
      div_clone2.style.opacity = 0;
      div_clone.appendChild(div_clone2);
    }
    dom.appendChild(div_clone);
  });

  //서비스 방식
  fourth.callbacks.set("서비스 방식", function (dom, n) {
    let input = Genemongo.nodes.input.cloneNode(true);
    input.classList.add("pp_designer_selected_box_contents_service_input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "pp_designer_selected_box_contents_service_input" + String(n));
    input.style.display = "none";

    let div_clone, div_clone2, div_clone3, input_clone, label_clone;
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_service_total");
    let service = [ "오프라인", "온라인", "부분 공간" ];

    for (let i = 0; i < service.length; i++) {
      input_clone = input.cloneNode(true);
      input_clone.id = "pp_designer_selected_box_contents_service_input" + String(n) + String(i);
      input_clone.value = service[i];
      //------------------------------------------------------------------------
      if (obj.service === undefined) {
        if (i === 0) { input_clone.checked = true; }
      }
      //------------------------------------------------------------------------
      div_clone.appendChild(input_clone);
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_service");
      div_clone2.textContent = service[i];
      div_clone2.insertAdjacentHTML('afterbegin', '<div class="pp_designer_selected_box_contents_service_won"></div>');
      label_clone = Genemongo.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_service_input" + String(n) + String(i));
      div_clone3 = Genemongo.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      div_clone3.setAttribute("cus_value", service[i]);
      div_clone3.setAttribute("cus_id", 's' + String(n));
      if (i !== 2) { div_clone3.addEventListener("click", fourth.events.service); }
      label_clone.appendChild(div_clone3);
      div_clone2.appendChild(label_clone);
      div_clone.appendChild(div_clone2);

      //------------------------------------------------------------------------
      if (obj.proposal !== undefined) {
        if (obj.proposal[n].fee.length === 1) {
          if (obj.proposal[n].fee[0].method === "offline") {
            if (i === 0) { input_clone.checked = true; }
            if (i === 1) { input_clone.checked = false; }
          } else if (obj.proposal[n].fee[0].method === "online") {
            if (i === 0) { input_clone.checked = false; }
            if (i === 1) { input_clone.checked = true; }
          }
        } else if (obj.proposal[n].fee.length === 2) {
          if (i === 0 || i === 1) { input_clone.checked = true; }
        }
        if (obj.proposal[n].fee[0].partial) {
          if (i === 2) { input_clone.checked = true; }
        }
      }
      //------------------------------------------------------------------------
    }
    dom.appendChild(div_clone);
  });

  //서비스 금액
  fourth.callbacks.set("서비스 금액", function (dom, n) {
    let div_clone, div_clone2, div_clone3, input_clone;
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_money");
    div_clone.id = "pp_designer_selected_box_contents_money" + String(n);
    //------------------------------------------------------------------------
    if (obj.proposal === undefined) {
      div_clone.appendChild(money_set("오프라인"));
    } else {
      for (let i = 0; i < obj.proposal[n].fee.length; i++) {
        div_clone.appendChild(money_set(obj.proposal[n], i));
      }
    }
    //------------------------------------------------------------------------
    dom.appendChild(div_clone);
  });

  //사진 선택
  fourth.callbacks.set("사진 선택", function (dom, n) {
    let div_clone, div_clone2, div_clone3, input_clone;
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_selection");
    div_clone.id = "pp_designer_selected_box_contents_selection" + String(n);
    div_clone.textContent = "디자이너를 선택해주세요!";
    //------------------------------------------------------------------------
    if (obj.proposal !== undefined) {
      for (let d of designers) {
        if (d.past_desid === obj.proposal[n].desid) {
          div_clone.textContent = d.designer + " 디자이너의 사진 선택";
        }
      }
      div_clone.style.color = "white";
      dom.style.background = "#59af89";
    }
    //------------------------------------------------------------------------
    div_clone.setAttribute("cus_id", 's' + String(n));
    div_clone.addEventListener("click", fourth.events.popup);
    dom.appendChild(div_clone);
  });

  return function () {
    //------------------------------------------------------------------------
    let div_clone, div_clone2, div_clone3, div_clone4, general_string;
    let target0, target1, target2;
    //------------------------------------------------------------------------
    fourth.box.style.display = "none";
    fourth.title.style.color = "#59af89";
    fourth.contents.style.background = "white";
    fourth.contents.style.border = "1px solid #ececec";
    fourth.contents.style.borderRadius = "6px";
    fourth.contents.style.padding = "0px";
    instance.below_launching("fourth", "on");
    instance.totalTong.fifthScrollmove = {}

    if (instance.pastMaps[0] === undefined) {
      console.log("out past");
      for (let i = 0; i < num; i++) {
        div_clone = Genemongo.nodes.div.cloneNode(true);
        div_clone.classList.add("pp_designer_selected");
        div_clone.setAttribute("cus_id", 's' + String(i));
        div_clone.style.width = "calc(100% / " + String(num) + ")";
        if (i !== 0) { div_clone.style.borderLeft = "1px solid #ececec"; }

        for (let j = 0; j < fourth.titles.length; j++) {
          div_clone2 = Genemongo.nodes.div.cloneNode(true);
          div_clone2.classList.add("pp_designer_selected_box");
          div_clone3 = Genemongo.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_title");
          div_clone3.textContent = fourth.titles[j];
          div_clone2.appendChild(div_clone3);
          div_clone3 = Genemongo.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_contents");
          (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
          div_clone2.appendChild(div_clone3);
          div_clone.appendChild(div_clone2);
        }
        //remember value
        div_clone4 = Genemongo.nodes.div.cloneNode(true);
        div_clone4.classList.add("pp_designer_selected_box_value");
        //------------------------------------------------------------------------
        if (obj.proposal !== undefined) {
          general_string = '';
          for (let k of obj.proposal[i].picture_settings) {
            general_string += Genemongo.tagCoverting(k)  + "__split3__";
          }
          general_string = general_string.slice(0, -10);
          div_clone4.textContent = general_string;
        }
        //------------------------------------------------------------------------
        div_clone.appendChild(div_clone4);

        fourth.contents.appendChild(div_clone);
        fourthChildren.set("box" + String(i), div_clone);
        instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
      }
    } else {
      console.log("in past");
      if (num <= instance.pastMaps[0].size) {
        for (let i = 0; i < num; i++) {
          instance.pastMaps[0].get("box" + String(i)).style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) { instance.pastMaps[0].get("box" + String(i)).style.borderLeft = "1px solid #ececec"; }
          fourth.contents.appendChild(instance.pastMaps[0].get("box" + String(i)));
          fourthChildren.set("box" + String(i), instance.pastMaps[0].get("box" + String(i)));
          instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
        }
        // add events
        target0 = document.querySelectorAll(".pp_designer_selected_box_contents_designers > label > .garim");
        target1 = document.querySelectorAll(".pp_designer_selected_box_contents_service > label > .garim");
        target2 = document.querySelectorAll(".pp_designer_selected_box_contents_selection");
        target3 = document.querySelectorAll(".pp_designer_selected_box_contents_money_input");
        for (let node of target0) { node.addEventListener("click", fourth.events.designer); }
        for (let node of target1) { if (node.getAttribute("cus_value") !== "부분 공간") { node.addEventListener("click", fourth.events.service); } }
        for (let node of target2) { node.addEventListener("click", fourth.events.popup); }
        for (let node of target3) {
          node.addEventListener("keyup", fourth.events.money);
          node.addEventListener("blur", fourth.events.money);
        }
      } else {
        for (let i = 0; i < instance.pastMaps[0].size; i++) {
          instance.pastMaps[0].get("box" + String(i)).style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) { instance.pastMaps[0].get("box" + String(i)).style.borderLeft = "1px solid #ececec"; }
          fourth.contents.appendChild(instance.pastMaps[0].get("box" + String(i)));
          fourthChildren.set("box" + String(i), instance.pastMaps[0].get("box" + String(i)));
          instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
        }
        target0 = document.querySelectorAll(".pp_designer_selected_box_contents_designers > label > .garim");
        target1 = document.querySelectorAll(".pp_designer_selected_box_contents_service > label > .garim");
        target2 = document.querySelectorAll(".pp_designer_selected_box_contents_selection");
        target3 = document.querySelectorAll(".pp_designer_selected_box_contents_money_input");
        for (let node of target0) { node.addEventListener("click", fourth.events.designer); }
        for (let node of target1) { if (node.getAttribute("cus_value") !== "부분 공간") { node.addEventListener("click", fourth.events.service); } }
        for (let node of target2) { node.addEventListener("click", fourth.events.popup); }
        for (let node of target3) {
          node.addEventListener("keyup", fourth.events.money);
          node.addEventListener("blur", fourth.events.money);
        }
        for (let i = instance.pastMaps[0].size; i < num; i++) {
          div_clone = Genemongo.nodes.div.cloneNode(true);
          div_clone.classList.add("pp_designer_selected");
          div_clone.setAttribute("cus_id", 's' + String(i));
          div_clone.style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) { div_clone.style.borderLeft = "1px solid #ececec"; }
          for (let j = 0; j < fourth.titles.length; j++) {
            div_clone2 = Genemongo.nodes.div.cloneNode(true);
            div_clone2.classList.add("pp_designer_selected_box");
            div_clone3 = Genemongo.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_title");
            div_clone3.textContent = fourth.titles[j];
            div_clone2.appendChild(div_clone3);
            div_clone3 = Genemongo.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_contents");
            (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
            div_clone2.appendChild(div_clone3);
            div_clone.appendChild(div_clone2);
          }
          //remember value
          div_clone4 = Genemongo.nodes.div.cloneNode(true);
          div_clone4.classList.add("pp_designer_selected_box_value");
          //------------------------------------------------------------------------
          if (obj.proposal !== undefined) {
            general_string = '';
            for (let k of obj.proposal[i].picture_settings) {
              general_string += Genemongo.tagCoverting(k)  + "__split3__";
            }
            general_string = general_string.slice(0, -10);
            div_clone4.textContent = general_string;
          }
          //------------------------------------------------------------------------
          div_clone.appendChild(div_clone4);
          fourth.contents.appendChild(div_clone);
          fourthChildren.set("box" + String(i), div_clone);
          instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
        }
      }
    }

    if (document.querySelector(".blewpp_input") !== null) {
      document.querySelector(".blewpp_input").focus();
    }
    instance.fourthChildren = fourthChildren;
    instance.toggleSetting.fourth = 1;
    console.log(instance.fourthChildren);

    let removeAll = function (e) {
      //------------------------------------------------------------------------
      if (instance.fourthChildren instanceof Map) {
        instance.below_launching("fourth", "off");
        instance.pastMaps.unshift(new Map());
        instance.fourthChildren.forEach(function (value, key, map) {
          instance.pastMaps[0].set(key, value.cloneNode(true));
          value.remove();
        });
        instance.fourthChildren = {}
        instance.totalTong.fifthScrollmove = {}
        fourthChildren = {}
        fourth.box.style.display = "";
        fourth.title.style.color = "";
        fourth.contents.style.background = "";
        fourth.contents.style.border = "";
        fourth.contents.style.borderRadius = "";
        fourth.contents.style.padding = "";
        for (let i = 0; i < 3; i++) { instance.thirdChildren.get("box" + String(i)).style.opacity = ""; }
        document.querySelector("#pp_designer_question_input").focus();
        console.log(instance.pastMaps[0]);
      }
    }
    fourth.title.addEventListener("click", removeAll, { once: true });
    //------------------------------------------------------------------------
    clearTimeout(Proposal.toggleTimeout.fourth);
  }
}

Proposal.prototype.fourthProcess = async function (num) {
  let instance = this;
  for (let i = 0; i < 3; i++) {
    this.thirdChildren.get("box" + String(i)).style.opacity = "0";
  }
  let setTimeout_func = await this.fourthsetTimeout(num);
  Proposal.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
}

// Create process 5 ------------------------------------------------------------

Proposal.prototype.fifthWhitesave = function (id) {
  const instance = this;
  return function (e) {
    let obj = {}
    let pictures = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    let descriptions = document.querySelectorAll(".ppw_left_description_inbox_input");
    let targetBoxes = document.querySelectorAll(".pp_designer_selected");
    let general_str = '';
    for (let pic of pictures) {
      general_str += pic.getAttribute("cus_info") + "__split1__" + "styleText" + "__split2__" + pic.style.cssText + "__split3__";
    }
    for (let i = 0; i < descriptions.length; i++) {
      obj["description" + String(i)] = descriptions[i].value;
    }
    general_str += Genemongo.tagCoverting(obj);

    targetBoxes[id].querySelector(".pp_designer_selected_box_value").textContent = general_str;
    instance.below_launching("fifth", "off");
    document.querySelector(".pp_fifth_cancelback").remove();
    document.querySelector(".pp_fifth_whitebox").remove();
  }
}

Proposal.prototype.fifthWhiteup = function (whitebox, porpor, id, ghost, picture_settings) {
  let instance = this;
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, scroll_box, input_clone, label_clone, img_clone, img_clone2;
  let leftMother, rightMother;
  let mother = whitebox;
  let whiteBoxDom = new Map();

  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_leftbox");
  mother.appendChild(div_clone);
  whiteBoxDom.set("leftbox", div_clone);
  leftMother = div_clone;

  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_rightbox");
  mother.appendChild(div_clone);
  whiteBoxDom.set("rightbox", div_clone);
  rightMother = div_clone;

  // Left
  let leftList = [ "title", "picturebox", "description", ];
  let target_value = document.querySelectorAll(".pp_designer_selected");
  let values = target_value[id].querySelector(".pp_designer_selected_box_value").textContent;

  // Default 0
  let descriptions = picture_settings[0].value.pop();
  let default_setting = picture_settings[0].value;

  // if memory this
  if (values !== "") {
    values = Genemongo.tagParsing(values);
    descriptions = values.pop();
    default_setting = values;
  }
  let leftcallbacks = [
    //title
    function (dom) {
      dom.textContent = "사진 구성";
    },
    //picturebox
    function (dom) {
      let div_clone, inbox;
      inbox = Genemongo.nodes.div.cloneNode(true);
      inbox.classList.add("ppw_left_picturebox_inbox");
      for (let i = 0; i < default_setting.length; i++) {
        div_clone = Genemongo.nodes.div.cloneNode(true);
        div_clone.classList.add("ppw_left_picturebox_inbox_detail");
        if (default_setting[i].unionPo !== "union") {
          div_clone.addEventListener("click", Proposal.fifthPicturebox_union(), { once: true });
        } else if (default_setting[i].unionPo === "union") {
          div_clone.addEventListener("click", Proposal.fifthPicturebox_split(), { once: true });
        }
        div_clone.setAttribute("cus_info", Genemongo.tagCoverting(default_setting[i]));
        div_clone.classList.add("fifth_drag_img");
        div_clone.style.cssText = default_setting[i].styleText;
        inbox.appendChild(div_clone);
      }
      dom.appendChild(inbox);
    },
    //description
    function (dom) {
      let inbox, inbutton, div_clone, div_clone2, input_clone;
      inbox = Genemongo.nodes.div.cloneNode(true);
      inbox.classList.add("ppw_left_description_inbox");
      div_clone = Genemongo.nodes.div.cloneNode(true);
      div_clone.classList.add("ppw_left_description_inbox_detail");
      div_clone.textContent = "디자이너 설명";
      inbox.appendChild(div_clone);
      for (let i in descriptions) {
        input_clone = Genemongo.nodes.input.cloneNode(true);
        input_clone.classList.add("ppw_left_description_inbox_input");
        input_clone.value = descriptions[i];
        inbox.appendChild(input_clone);
      }
      dom.appendChild(inbox);
      inbutton = Genemongo.nodes.div.cloneNode(true);
      inbutton.classList.add("ppw_left_description_inbutton");
      inbutton.textContent = "완료";
      inbutton.addEventListener("click", instance.fifthWhitesave(id));
      dom.appendChild(inbutton);
    },
  ];
  for (let i = 0; i < leftList.length; i++) {
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("ppw_left_" + leftList[i]);
    (leftcallbacks[i])(div_clone);
    leftMother.appendChild(div_clone);
  }

  //Right
  let rightList = [ "title", "picturebox", "buttonup" ];
  let sgTong = {
    s: [],
    g: [],
  }
  let imgSrc, sgTrue;
  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_right_totalbox");

  for (let j = 0; j < (porpor.length + 1); j++) {
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("ppw_right_set");
    for (let i = 0; i < rightList.length; i++) {
      div_clone3 = Genemongo.nodes.div.cloneNode(true);
      div_clone3.classList.add("ppw_right_" + rightList[i]);

      //title
      if (i === 0) {
        if (j < porpor.length) {
          div_clone3.textContent = porpor[j].porlid + " : " + porpor[j].title;
        } else {
          div_clone3.textContent = "기타 미등록 포트폴리오";
        }
      }
      //pictures
      else if (i === 1) {
        sgTong.s = [];
        sgTong.g = [];
        scroll_box = Genemongo.nodes.div.cloneNode(true);
        scroll_box.classList.add("ppw_right_picturebox_scroll");
        if (j < porpor.length) {
          for (let k = 0; k < porpor[j].photosg.length; k++) {
            div_clone4 = Genemongo.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + porpor[j].photosg[k]);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = Genemongo.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = "/list_image/portp" + porpor[j].porlid + "/t" + String(k + 1) + porpor[j].porlid + ".jpg";
            sgTrue = porpor[j].photosg[k];
            img_clone.setAttribute("src", imgSrc);
            img_clone.setAttribute("cus_info", Genemongo.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
            img_clone.setAttribute("draggable", "true");
            div_clone4.appendChild(img_clone);
            scroll_box.appendChild(div_clone4);
            if (porpor[j].photosg[k] === 's') {
              sgTong.s.push(porpor[j].photosg[k]);
            } else {
              sgTong.g.push(porpor[j].photosg[k]);
            }
          }
        } else {

          for (let k = 0; k < ghost.length; k++) {
            div_clone4 = Genemongo.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + ghost[k].sgTrue);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = Genemongo.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = ghost[k].link;
            sgTrue = ghost[k].sgTrue;
            img_clone.setAttribute("src", imgSrc);
            img_clone.setAttribute("cus_info", Genemongo.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
            img_clone.setAttribute("draggable", "true");
            div_clone4.appendChild(img_clone);
            scroll_box.appendChild(div_clone4);

            if (ghost[k].sgTrue === 's') {
              sgTong.s.push(ghost[k].sgTrue);
            } else {
              sgTong.g.push(ghost[k].sgTrue);
            }
          }

        }
        scroll_box.style.width = String((125 * (sgTong.s.length)) + (238 * (sgTong.g.length))) + "px";
        div_clone3.appendChild(scroll_box);
      }
      //buttonup
      else if (i === 2) {
        img_clone2  = Genemongo.nodes.img.cloneNode(true);
        img_clone2.classList.add("ppw_right_buttonup_img_left");
        img_clone2.src = "/list_svg/triangle1.svg";
        div_clone3.appendChild(img_clone2);
        img_clone2  = Genemongo.nodes.img.cloneNode(true);
        img_clone2.classList.add("ppw_right_buttonup_img_right");
        img_clone2.src = "/list_svg/triangle2.svg";
        div_clone3.appendChild(img_clone2);
        div_clone4 = Genemongo.nodes.div.cloneNode(true);
        div_clone4.classList.add("ppw_right_buttonup_div_left");
        div_clone4.addEventListener("click", this.fifthScrollX("click", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mousedown", this.fifthScrollX("mousedown", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseup", this.fifthScrollX("mouseup", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseleave", this.fifthScrollX("mouseleave", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseout", this.fifthScrollX("mouseout", { direction: "left", order: j, id: id, }));

        div_clone3.appendChild(div_clone4);
        div_clone4 = Genemongo.nodes.div.cloneNode(true);
        div_clone4.classList.add("ppw_right_buttonup_div_right");
        div_clone4.addEventListener("click", this.fifthScrollX("click", { direction: "right", order: j, id: id, }));
        div_clone4.addEventListener("mousedown", this.fifthScrollX("mousedown", { direction: "right", order: j, id: id, }));
        div_clone4.addEventListener("mouseup", this.fifthScrollX("mouseup", { direction: "right", order: j, id: id, }));
        div_clone4.addEventListener("mouseleave", this.fifthScrollX("mouseleave", { direction: "right", order: j, id: id, }));
        div_clone4.addEventListener("mouseout", this.fifthScrollX("mouseout", { direction: "right", order: j, id: id, }));

        div_clone3.appendChild(div_clone4);
      }
      div_clone2.appendChild(div_clone3);
    }
    div_clone.appendChild(div_clone2);
  }
  rightMother.appendChild(div_clone);
  Proposal.fifthDrag(".fifth_drag_img");
  this.whiteBox = whiteBoxDom;
}

Proposal.fifthDrag = function (mege) {
  let ddnodes = document.querySelectorAll(mege);
  let eventArr = Proposal.fifthDrag_funcs();
  for (let node of ddnodes) {
    node.addEventListener("dragstart", eventArr[0]);
    node.addEventListener("dragend", eventArr[1]);
    node.addEventListener("dragenter", eventArr[2]);
    node.addEventListener("dragleave", eventArr[3]);
    node.addEventListener("dragover", eventArr[4]);
    node.addEventListener("drop", eventArr[5]);
  }
}

Proposal.prototype.fifthScrollX = function (method, options) {
  const instance = this;
  if (method === "click") {
    return function (e) {
      let target_nodes = document.querySelectorAll(".ppw_right_picturebox");
      let left = target_nodes[options.order].querySelector(".ppw_right_picturebox_scroll").getBoundingClientRect().left;
      let result;
      if (options.direction === "left") {
        result = Math.abs(974 - left) - 400;
      } else {
        result = Math.abs(974 - left) + 400;
      }
      target_nodes[options.order].scrollTo({ left: result, behavior: "smooth" });
    }
  } else if (method === "mousedown") {
    return function (e) {
      let temp = setInterval(function () {
        let target_nodes = document.querySelectorAll(".ppw_right_picturebox");
        let left = target_nodes[options.order].querySelector(".ppw_right_picturebox_scroll").getBoundingClientRect().left;
        let result;
        if (options.direction === "left") {
          result = Math.abs(974 - left) - 100;
        } else {
          result = Math.abs(974 - left) + 100;
        }
        target_nodes[options.order].scrollTo({ left: result, behavior: "smooth" });
      }, 80);
      instance.totalTong.fifthScrollmove["designer" + String(options.id)].set(options.order, temp);
    }
  } else if (method === "mouseup" || method === "mouseleave" || method === "mouseout") {
    return function (e) {
      clearInterval(instance.totalTong.fifthScrollmove["designer" + String(options.id)].get(options.order));
    }
  }
}

Proposal.prototype.fifthProcess = async function (desid, id) {
  let instance = this;
  let total = this.mother.parentNode;
  let popupDom = new Map();
  let ghost = JSON.parse(await Genemongo.ajax("/post_mfind", "collection=Designer&find1=" + JSON.stringify({ past_desid: desid }) + "&find2=" + JSON.stringify({})));
  let find1 = { desid: ghost[0].past_desid }
  let find2 = {}
  let porpor = JSON.parse(await Genemongo.ajax("/post_mfind", "collection=FP1_porlist&find1=" + JSON.stringify(find1) + "&find2=" + JSON.stringify(find2)));
  let pordeta = JSON.parse(await Genemongo.ajax("/post_mfind", "collection=FP2_pordeta&find1=" + JSON.stringify(find1) + "&find2=" + JSON.stringify(find2)));
  for (let i of porpor) {
    for (let j of pordeta) {
      if (i.porlid === j.porlid) {
        i.photosg = j.photosg.split(" ");
      }
    }
  }
  return function () {
    let div_clone;
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_fifth_cancelback");
    div_clone.addEventListener("click", instance.fifthWhitesave(id));
    total.appendChild(div_clone);
    popupDom.set("cancelBack", div_clone);
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_fifth_whitebox");
    div_clone.setAttribute("cus_designer", ghost[0].designer);
    div_clone.setAttribute("cus_desid", ghost[0].past_desid);
    div_clone.setAttribute("cus_boxid", String(id));
    total.appendChild(div_clone);
    popupDom.set("whiteBox", div_clone);
    instance.fifthWhiteup(div_clone, porpor, id, ghost[0].picture.ghost, ghost[0].picture.settings);
    instance.fifthChildren = popupDom;
  }
}

Proposal.fifthDrag_funcs = function () {
  function dragstart_event(e) {
    e.dataTransfer.setData("sun", this.getAttribute("cus_info"));
  }
  function dragend_event(e) { this.style.opacity = ""; }
  function dragenter_event(e) { this.style.opacity = "0.4"; }
  function dragleave_event(e) { this.style.opacity = ""; }
  function dragover_event(e) { e.preventDefault(); }
  function drop_event(e) { e.preventDefault(); if (e.target.nodeName === "DIV") {
    let data = Genemongo.tagParsing(e.dataTransfer.getData("sun"));
    let jari = Genemongo.tagParsing(this.getAttribute("cus_info"));
    if (jari.sgTrue === data.sgTrue) {
      this.style.backgroundImage = "url('" + data.imgSrc + "')";
      jari.imgSrc = data.imgSrc;
      this.setAttribute("cus_info", Genemongo.tagCoverting(jari));
    }
  } this.style.opacity = ""; }
  return [ dragstart_event, dragend_event, dragenter_event, dragleave_event, dragover_event, drop_event ];
}

Proposal.fifthPicturebox_split = function () {
  let eventArr = Proposal.fifthDrag_funcs();
  let nodePosition = [ "top", "left", "width", "height" ];

  function filter(str) {
    str = str.replace(/\%/g, '').replace(/px/g, "");
    return str;
  }
  function filterValue(dom) {
    let this_css = {
      top: dom.style.top,
      left: dom.style.left,
      width: dom.style.width,
      height: dom.style.height,
    }
    let current = {
      from: [],
      to: [],
    };
    if (filter(this_css.top) === "0" && filter(this_css.left) === "0" && filter(this_css.width) === "66.5" && filter(this_css.height) === "66") {
      current.from = [ "0%", "0%", "32.8%", "66%" ];
      current.to = [ "0%", "33.5%", "33%", "66%" ];
    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "33.5" && filter(this_css.width) === "66.5" && filter(this_css.height) === "66") {
      current.from = [ "0", "33.5%", "33%", "66%" ];
      current.to = [ "0", "67.2%", "32.8%", "66%" ];
    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "0" && filter(this_css.width) === "32.8" && filter(this_css.height) === "33") {
      current.from = [ "67%", "0%", "16%", "33%" ];
      current.to = [ "67%", "16.8%", "16%", "33%" ];
    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "33.5" && filter(this_css.width) === "33" && filter(this_css.height) === "33") {
      current.from = [ "67%", "33.5%", "16%", "33%" ];
      current.to = [ "67%", "50.3%", "16.2%", "33%" ];
    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "67.2" && filter(this_css.width) === "32.8" && filter(this_css.height) === "33") {
      current.from = [ "67%", "67.2%", "16%", "33%" ];
      current.to = [ "67%", "84%", "16%", "33%" ];
    }
    return current;
  }
  return function (e) {
    let current = filterValue(this);
    let div = document.createElement("DIV");
    let div_clone, obj, obj2;
    for (let i = 0; i < nodePosition.length; i++) {
      this.style[nodePosition[i]] = current.from[i];
    }
    obj = Genemongo.tagParsing(this.getAttribute("cus_info"));
    obj.sgTrue = 's';
    obj.imgSrc = '';
    obj.unionPo = "left";
    this.style.backgroundImage = '';
    this.setAttribute("cus_info", Genemongo.tagCoverting(obj));
    this.addEventListener("click", Proposal.fifthPicturebox_union(), { once: true });

    div_clone = div.cloneNode(true);
    div_clone.classList.add("ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < nodePosition.length; i++) {
      div_clone.style[nodePosition[i]] = current.to[i];
    }
    div_clone.setAttribute("cus_info", Genemongo.tagCoverting({ position: String(Number(obj.position) + 1), sgTrue: 's', unionPo: "right" }));
    div_clone.addEventListener("dragstart", eventArr[0]);
    div_clone.addEventListener("dragend", eventArr[1]);
    div_clone.addEventListener("dragenter", eventArr[2]);
    div_clone.addEventListener("dragleave", eventArr[3]);
    div_clone.addEventListener("dragover", eventArr[4]);
    div_clone.addEventListener("drop", eventArr[5]);
    div_clone.addEventListener("click", Proposal.fifthPicturebox_union(), { once: true });

    this.parentNode.insertBefore(div_clone, this.nextElementSibling);
    let details = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < details.length; i++) {
      obj2 = Genemongo.tagParsing(details[i].getAttribute("cus_info"));
      obj2.position = String(i);
      details[i].setAttribute("cus_info", Genemongo.tagCoverting(obj2));
    }
  }
}

Proposal.fifthPicturebox_union = function () {
  let nodePosition = [ "top", "left", "width", "height" ];

  function filter(str) {
    str = str.replace(/\%/g, "").replace(/px/g, "");
    return str;
  }
  function filterValue(dom) {
    let this_css = {
      top: dom.style.top,
      left: dom.style.left,
      width: dom.style.width,
      height: dom.style.height,
    }
    let current = {
      to: [],
    };
    if (filter(this_css.top) === "0" && filter(this_css.left) === "0" && filter(this_css.width) === "32.8" && filter(this_css.height) === "66") {
      current.to = [ "0%", "0%", "66.5%", "66%" ];

    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "33.5" && filter(this_css.width) === "33" && filter(this_css.height) === "66" && Genemongo.tagParsing(dom.getAttribute("cus_info")).unionPo === "right") {
      current.to = [ "0%", "0%", "66.5%", "66%" ];

    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "33.5" && filter(this_css.width) === "33" && filter(this_css.height) === "66" && Genemongo.tagParsing(dom.getAttribute("cus_info")).unionPo === "left") {
      current.to = [ "0%", "33.5%", "66.5%", "66%" ];

    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "67.2" && filter(this_css.width) === "32.8" && filter(this_css.height) === "66") {
      current.to = [ "0%", "33.5%", "66.5%", "66%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "0" && filter(this_css.width) === "16" && filter(this_css.height) === "33") {
      current.to = [ "67%", "0%", "32.8%", "33%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "16.8" && filter(this_css.width) === "16" && filter(this_css.height) === "33") {
      current.to = [ "67%", "0%", "32.8%", "33%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "33.5" && filter(this_css.width) === "16" && filter(this_css.height) === "33") {
      current.to = [ "67%", "33.5%", "33%", "33%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "50.3" && filter(this_css.width) === "16.2" && filter(this_css.height) === "33") {
      current.to = [ "67%", "33.5%", "33%", "33%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "67.2" && filter(this_css.width) === "16" && filter(this_css.height) === "33") {
      current.to = [ "67%", "67.2%", "32.8%", "33%" ];

    } else if (filter(this_css.top) === "67" && filter(this_css.left) === "84" && filter(this_css.width) === "16" && filter(this_css.height) === "33") {
      current.to = [ "67%", "67.2%", "32.8%", "33%" ];

    }
    return current;
  }
  return function (e) {
    let objp;
    let current = filterValue(this);
    if (filter(this.style.top) === "0" && filter(this.style.left) === "67.2" && filter(this.style.width) === "32.8" && filter(this.style.height) === "66") {
        objp = Genemongo.tagParsing(this.previousElementSibling.getAttribute("cus_info"));
        if (objp.unionPo === "union") {
          this.addEventListener("click", Proposal.fifthPicturebox_union(), { once: true });
          return
        }
    }
    if (filter(this.style.top) === "0" && filter(this.style.left) === "0" && filter(this.style.width) === "32.8" && filter(this.style.height) === "66") {
      objp = Genemongo.tagParsing(this.nextElementSibling.getAttribute("cus_info"));
      if (objp.unionPo === "union") {
        this.addEventListener("click", Proposal.fifthPicturebox_union(), { once: true });
        return
      }
    }
    let div_clone, obj, obj2;
    obj = Genemongo.tagParsing(this.getAttribute("cus_info"));
    if (obj.unionPo === "left") { this.nextElementSibling.remove(); }
    else { this.previousElementSibling.remove(); }
    for (let i = 0; i < nodePosition.length; i++) {
      this.style[nodePosition[i]] = current.to[i];
    }
    obj.sgTrue = 'g';
    obj.imgSrc = '';
    obj.unionPo = "union";
    this.style.backgroundImage = '';
    this.setAttribute("cus_info", Genemongo.tagCoverting(obj));
    this.addEventListener("click", Proposal.fifthPicturebox_split(), { once: true });
    let details = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < details.length; i++) {
      obj2 = Genemongo.tagParsing(details[i].getAttribute("cus_info"));
      obj2.position = String(i);
      details[i].setAttribute("cus_info", Genemongo.tagCoverting(obj2));
    }
  }
}
