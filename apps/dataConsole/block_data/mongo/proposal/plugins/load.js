Proposal.prototype.load_initevent = function () {
  let instance = this;
  return function (e) {
    if (instance.toggleSetting.listCreate === 1) {
      let obj = JSON.parse(this.parentElement.querySelector("section").textContent);
      let button0 = document.getElementById("blewpp_button0");
      let button1 = document.getElementById("blewpp_button1");
      button1.children[0].style.color = "#59af89";
      button1.children[0].style.opacity = "";
      button0.children[0].style.color = "";
      button0.children[0].style.opacity = "0.4";
      let mother = document.querySelector(".mongo_box_create");
      let father = document.querySelector(".mongo_box_list");
      father.classList.add("listpp_fadeout");
      father.classList.remove("listpp_fadein");
      mother.classList.remove("listpp_fadeout");
      mother.classList.add("listpp_fadein");
      father.style.zIndex = "-1";
      instance.toggleSetting.listCreate = 0;

      Proposal.toggleTimeout.load_init = setTimeout(function () {
        father.style.display = "";
        father.style.transform = "";
        father.style.opacity = "";
        while (father.firstChild) {father.removeChild(father.lastChild);}
        let button2 = document.getElementById("blewpp_button2");
        let button3 = document.getElementById("blewpp_button3");
        button2.removeEventListener("click", Proposal.below_events.first.b2);
        button2.removeEventListener("click", Proposal.below_events.second.b2);
        button2.removeEventListener("click", Proposal.below_events.third.b2);
        button2.removeEventListener("click", Proposal.below_events.fourth.b2);
        console.log(obj);
        button3.setAttribute("cus_id", obj.proid);
        if (document.querySelector(".pp_designer_selected") === null) {
          instance.load_reset(obj);
        } else {
          document.querySelector('#pp_thirdprocess_box .pp_title').click();
          Proposal.toggleTimeout.load_init_in = setTimeout(function () {
            instance.load_reset(obj);
          }, 500);
        }
        instance.toggleSetting.listCreate = 0;
      }, 500);
    }
  }
}

Proposal.prototype.load_reset = function (obj = {}) {
  let instance = this;
  let inputs;

  //title reset
  if (document.getElementById("pp_title_sub_b") !== null) {
    document.getElementById("pp_title_sub_b").remove();
  }
  if (document.getElementById("pp_title2_sub_b") !== null) {
    document.getElementById("pp_title2_sub_b").remove();
  }
  inputs = document.getElementById("pp_firstprocess_box").querySelectorAll("input");
  for (let input of inputs) { input.checked = false; }
  inputs = document.getElementById("pp_secondprocess_box").querySelectorAll("input");
  for (let input of inputs) { input.checked = false; }

  //fifth reset
  if (document.querySelector(".pp_fifth_cancelback")) {
    document.querySelector(".pp_fifth_cancelback").remove();
    document.querySelector(".pp_fifth_whitebox").remove();
  }
  //fourth reset
  if (this.fourthChildren instanceof Map) {
    this.fourthChildren.forEach(function (value, key, map) {
      value.remove();
    });
    this.fourthChildren = {}
    let fourth = {}
    fourth.total = this.domBox.get("디자이너 선택");
    fourth.title = fourth.total.children[0];
    fourth.contents = fourth.total.children[1];
    fourth.box = fourth.contents.querySelector(".pp_contents_inbox");
    fourth.box.style.display = "";
    fourth.title.style.color = "";
    fourth.contents.style.background = "";
    fourth.contents.style.border = "";
    fourth.contents.style.borderRadius = "";
    fourth.contents.style.padding = "";
    for (let i = 0; i < 3; i++) { this.thirdChildren.get("box" + String(i)).style.opacity = ""; }
  }
  //third reset
  let service = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  this.domBox.get("서비스 선택").children[0].style.color = "";
  this.domBox.get("서비스 선택").children[1].style.background = "";
  this.domBox.get("서비스 선택").style.height = "";
  this.domBox.get("서비스 선택").style.borderBottom = "";
  this.domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
  this.domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";
  for (let i of service) {
    i.style.opacity = "";
    i.style.background = "white";
    i.children[0].style.color = "#59af89";
    i.children[0].style.fontSize = "1.7vh";
  }
  for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
  for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
  for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }
  let service_input = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
  for (let i of service_input) { if (i.checked) { i.nextElementSibling.style.background = "#59af89";i.nextElementSibling.children[0].style.color = "white"; } }
  this.domBox.get("디자이너 선택").style.height = "";
  this.domBox.get("디자이너 선택").children[1].style.height = "";
  this.domBox.get("디자이너 선택").children[1].style.marginTop = "";

  if (this.thirdChildren instanceof Map) {
    this.thirdChildren.get("box1_designerInput").style.color = "";
    this.thirdChildren.get("box1_title").style.color = "";
    this.thirdChildren.get("box1_designerInput").style.fontSize = "";
    this.thirdChildren.get("box1_title").style.fontSize = "";
    this.thirdChildren.get("box1").style.background = "";
    this.thirdChildren.get("box1").style.border = "";
    this.thirdChildren.get("box1_question").style.top = "";
  }
  if (document.querySelector("#pp_designer_question_press")) { document.querySelector("#pp_designer_question_press").remove(); }

  //second reset
  document.querySelector(".pp_designer_question").classList.add("pp_designer_question_remove");
  document.querySelector(".pp_designer_question").classList.remove("pp_designer_question_add");
  document.querySelector(".pp_designer_question_press").classList.add("pp_designer_question_press_remove");
  document.querySelector(".pp_designer_question_press").classList.remove("pp_designer_question_press_add");
  this.domBox.get("고객 선택").style.height = "";
  this.domBox.get("고객 선택").style.borderBottom = "";
  this.domBox.get("서비스 선택").style.height = "";
  this.domBox.get("서비스 선택").children[1].style.height = "";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "";
  let service2 = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  for (let i of service2) {
    i.style.background = "";
    i.children[0].style.color = "";
    i.children[0].style.fontSize = "";
    i.children[0].style.marginTop = "";
  }
  this.domBox.get("고객 선택").children[0].style.color = "";
  this.domBox.get("고객 선택").children[1].style.background = "";

  this.toggleSetting.first = 0;
  this.toggleSetting.second = 0;
  this.toggleSetting.third = 0;
  this.toggleSetting.fourth = 0;

  console.log("all reset");
  this.pastMaps = [];

  if (obj.cliid !== undefined) {
    Proposal.toggleTimeout.load_zero = setTimeout(this.load_processLoad(obj), 500);
    clearTimeout(Proposal.toggleTimeout.load_init_in);
    clearTimeout(Proposal.toggleTimeout.load_init);
  }
}

Proposal.prototype.load_processLoad = function (obj) {
  let instance = this;
  console.log(obj);
  return function () {
    instance.toggleSetting.load = 1;
    instance.load_processLoad_first(obj);
    instance.load_processLoad_second(obj, instance.load_processLoad_third());
  }
}

Proposal.prototype.load_processLoad_first = function (obj) {
  clearTimeout(Proposal.toggleTimeout.load_zero);
  this.domBox.get("고객 선택").style.height = "3.2vh";
  this.domBox.get("고객 선택").style.borderBottom = "1px solid #ececec";

  this.domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
  this.domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

  let service = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  for (let i of service) {
    i.style.background = "white";
    i.children[0].style.color = "#59af89";
    i.children[0].style.fontSize = "1.7vh";
  }
  for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
  for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
  for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }

  let service_input = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
  for (let i of service_input) {
    if (i.checked) {
      i.nextElementSibling.style.background = "#59af89";
      i.nextElementSibling.children[0].style.color = "white";
    }
  }
  this.domBox.get("고객 선택").children[0].style.color = "#59af89";
  this.domBox.get("고객 선택").children[1].style.background = "white";
  if (document.querySelector("#pp_title_sub_b")) { document.querySelector("#pp_title_sub_b").remove(); }
  this.domBox.get("고객 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title_sub_b" cus_id="' + obj.cliid + '" style="color:#59af89;font-weight:300"> : ' + obj.client + '</b>');
  this.toggleSetting.first = 1;
}

Proposal.prototype.load_processLoad_second = function (obj, third) {
  let instance = this;
  let e = {}
  let labels = document.querySelectorAll(".pp_clients_label");
  for (let lbj of labels) {
    if (lbj.getAttribute("cus_value") === obj.service) {
      e.target = lbj.querySelector("div");
    }
  }
  let service = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
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
  Proposal.toggleTimeout.load_second = setTimeout(function () {
    instance.domBox.get("서비스 선택").children[0].style.color = "#59af89";
    instance.domBox.get("서비스 선택").children[1].style.background = "white";
    if (document.querySelector("#pp_title2_sub_b")) { document.querySelector("#pp_title2_sub_b").remove(); }
    instance.domBox.get("서비스 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title2_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_value") + '" style="color:#59af89;font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
    instance.domBox.get("서비스 선택").style.height = "3.2vh";
    instance.domBox.get("서비스 선택").style.borderBottom = "1px solid #ececec";
    for (let i of service) { i.style.opacity = "0"; }
    instance.domBox.get("서비스 선택").children[1].style.height = "";
    instance.domBox.get("서비스 선택").children[1].style.marginTop = "";
    instance.domBox.get("디자이너 선택").style.height = "calc(100% - 6.4vh - 63px)";
    instance.domBox.get("디자이너 선택").children[1].style.height = "calc(90% + 2.7vh)";
    instance.domBox.get("디자이너 선택").children[1].style.marginTop = "-2.7vh";
    if (instance.thirdChildren instanceof Map) {
      instance.thirdChildren.get("box1_designerInput").focus();
      instance.thirdChildren.get("box1_designerInput").style.color = "#59af89";
      instance.thirdChildren.get("box1_designerInput").setAttribute("value", String(obj.proposal.length) + "명");
      instance.thirdChildren.get("box1_title").style.color = "#59af89";
      instance.thirdChildren.get("box1_designerInput").style.fontSize = "24px";
      instance.thirdChildren.get("box1_title").style.fontSize = "24px";
      instance.thirdChildren.get("box1").style.background = "white";
      instance.thirdChildren.get("box1").style.border = "1px solid #dddddd";
    }
    Proposal.toggleTimeout.load_third = setTimeout(function () {
      third(obj);
    }, 500);
  }, 550);
}

Proposal.prototype.load_processLoad_third = function () {
  let instance = this;
  return async function (obj) {
    clearTimeout(Proposal.toggleTimeout.load_third);
    clearTimeout(Proposal.toggleTimeout.load_second);
    for (let i = 0; i < 3; i++) {
      instance.thirdChildren.get("box" + String(i)).style.opacity = "0";
    }
    let num = Number(instance.thirdChildren.get("box1_designerInput").getAttribute("value").replace(/[^0-9]/g, ''));
    let setTimeout_func = await instance.fourthsetTimeout(num, obj);
    instance.toggleSetting.first = 1;
    instance.toggleSetting.second = 1;
    instance.toggleSetting.third = 1;
    instance.toggleSetting.fourth = 0;
    Proposal.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
  }
}
