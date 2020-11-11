Proposal.below_events = {
  save: async function (e) {
    let msg = await Proposal.save_init(false);
    console.log(msg);
  },
  update: async function (e) {
    let msg = await Proposal.save_init(true);
    console.log(msg);
  },
  search: {
    client: function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        this.value = this.value.replace(/ /g, '').replace(/\t/g, '').replace(/\n/g, '');
        let targets = document.querySelectorAll('.pp_clients_label > div');
        for (let i of targets) {
          if (i.parentElement.getAttribute("cus_value") === this.value) {
            i.click();
          }
        }
      }
    },
    service: function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        this.value = this.value.replace(/ /g, '').replace(/\t/g, '').replace(/\n/g, '');
        let targets = document.querySelectorAll('.pp_clients_label > div');
        if (/퍼/g.test(this.value)) {
          for (let i of targets) {
            if (i.parentElement.getAttribute("cus_value") === "홈퍼니싱 basic") {
              i.click();
            }
          }
        } else if (/홈스/g.test(this.value)) {
          for (let i of targets) {
            if (i.parentElement.getAttribute("cus_value") === "홈스타일링 basic") {
              i.click();
            }
          }
        } else if (/토/g.test(this.value)) {
          for (let i of targets) {
            if (i.parentElement.getAttribute("cus_value") === "토탈 스타일링 basic") {
              i.click();
            }
          }
        } else if (/설/g.test(this.value)) {
          for (let i of targets) {
            if (i.parentElement.getAttribute("cus_value") === "설계 변경 basic") {
              i.click();
            }
          }
        }
      }
    },
    designer: function (e) {
      this.value = this.value.replace(/ /g, '').replace(/\t/g, '').replace(/\n/g, '');
      let mothers = document.querySelectorAll(".pp_designer_selected");
      let key = 0;
      let keyBoo = [];
      let temp, targets;
      for (let i = 0; i < mothers.length; i++) {
        temp = mothers[i].querySelectorAll(".pp_designer_selected_box_contents_designers_input");
        keyBoo.unshift(false);
        for (let j of temp) { if (j.checked) { key++; keyBoo.unshift(true); } }
        if (!keyBoo[0]) { break; }
      }
      e.preventDefault();
      if (e.keyCode === 13 || e.keyCode === 32) {
        if (key < mothers.length) {
          targets = mothers[key].querySelectorAll('.pp_designer_selected_box_contents_designers > label > div');
          for (let i of targets) {
            if (i.getAttribute("cus_value") === this.value) {
              i.click();
            }
          }
        } else {
          if (mothers.length > 0) {
            targets = mothers[mothers.length - 1].querySelectorAll('.pp_designer_selected_box_contents_designers > label > div');
            for (let i of targets) {
              if (i.getAttribute("cus_value") === this.value) {
                i.click();
              }
            }
          } else {
            alert("디자이너 명수를 선택해주세요!");
            document.getElementById('pp_designer_question_input').focus();
          }
        }
        this.value = '';
      } else if (e.keyCode === 8 && this.value === '') {
        if (key !== 0) {
          if (key < mothers.length) {
            targets = mothers[key - 1].querySelectorAll('.pp_designer_selected_box_contents_designers_input');
            for (let i of targets) {
              i.checked = false;
            }
          } else {
            targets = mothers[mothers.length - 1].querySelectorAll('.pp_designer_selected_box_contents_designers_input');
            for (let i of targets) {
              i.checked = false;
            }
          }
        }
      }
    },
  },
  first: {
    b2: async function (e) {
      console.log("first button2");
    },
  },
  second: {
    b2: async function (e) {
      console.log("second button2");
    },
  },
  third: {
    b2: async function (e) {
      console.log("third button2");
    },
  },
  fourth: {
    b2: async function (e) {
      console.log("fourth button2");
    },
  },
  fifth: {
    b2: async function fifth_click_button2(e) {
      let designer = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_designer");
      let desid = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_desid");

      let result = JSON.parse(await Genemongo.ajax("/post_mfind", "collection=Designer&find1=" + JSON.stringify({ past_desid: desid }) + "&find2=" + JSON.stringify({})));
      let mother = this;
      let div = document.createElement("DIV");
      div.classList.add("blewpp_fifthevent_box");
      let cancel = document.createElement("DIV");
      cancel.id = "blewpp_fifthevent_cancelbox";
      let div_clone;
      async function click_event(e) {
        if (this.id !== "blewpp_fifthevent_cancelbox") {
          //general
          let this_order = Number(this.getAttribute("cus_order").replace(/^s/g, ''));

          //name
          let today = new Date();
          let new_name = document.getElementById("pp_title_sub_b").textContent.replace(/:/g, '').replace(/ /g, '') + ' ' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1));
          result[0].picture.settings[this_order].name = new_name;

          //value
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
          result[0].picture.settings[this_order].value = Genemongo.tagParsing(general_str);
          console.log(await Genemongo.ajax("/post_mupdate", "table=Designer&st=past_desid&i=" + desid + "&c=picture.settings&v=" + JSON.stringify(result[0].picture.settings)));
        }

        //remove
        let targets = document.querySelectorAll(".blewpp_fifthevent_box");
        for (let node of targets) { node.remove(); }
        document.getElementById("blewpp_fifthevent_cancelbox").remove();
        mother.addEventListener("click", fifth_click_button2, { once: true });
      }

      async function contextmenu_event(e) {
        if (e.cancelable) { e.preventDefault(); }
        if (this.id !== "blewpp_fifthevent_cancelbox") {
          //general
          let this_order = Number(this.getAttribute("cus_order").replace(/^s/g, ''));
          // Default 0
          let descriptions = result[0].picture.settings[this_order].value.pop();
          let default_setting = result[0].picture.settings[this_order].value;
          function picturebox_make(dom) {
            let div = document.createElement("DIV");
            let div_clone, inbox;
            inbox = div.cloneNode(true);
            inbox.classList.add("ppw_left_picturebox_inbox");
            for (let i = 0; i < default_setting.length; i++) {
              div_clone = div.cloneNode(true);
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
          }
          let pictureBox = document.querySelector(".ppw_left_picturebox");
          while (pictureBox.firstChild) { pictureBox.removeChild(pictureBox.lastChild); }
          picturebox_make(pictureBox);
          Proposal.fifthDrag(".fifth_drag_img");
          let descriptionBox = document.querySelector(".ppw_left_description");
          let descriptionBox_inputs = descriptionBox.querySelectorAll("input");
          for (let i = 0; i < descriptionBox_inputs.length; i++) {
            descriptionBox_inputs[i].value = descriptions["description" + String(i)];
          }
        }
        //remove
        let targets = document.querySelectorAll(".blewpp_fifthevent_box");
        for (let node of targets) { node.remove(); }
        document.getElementById("blewpp_fifthevent_cancelbox").remove();
        document.getElementById("svgcirclered_b").style.opacity = "";
        mother.addEventListener("click", fifth_click_button2, { once: true });
      }

      cancel.addEventListener("click", click_event, { once: true });
      cancel.addEventListener("contextmenu", contextmenu_event, { once: true });

      this.parentElement.parentElement.parentElement.appendChild(cancel);

      let loop_css = [ "top: -8px;", "top: -53px;", "top: -98px;", "top: -144px;", "top: -190px;" ];
      let loop_order = [ "s0", "s1", "s2", "s3", "s4" ];

      for (let i = 0; i < loop_css.length; i++) {
        div_clone = div.cloneNode(true);
        div_clone.style.cssText = loop_css[i];
        div_clone.textContent = result[0].picture.settings[i].name;
        div_clone.setAttribute("cus_order", loop_order[i]);
        div_clone.addEventListener("click", click_event, { once: true });
        div_clone.addEventListener("contextmenu", contextmenu_event, { once: true });

        this.parentElement.appendChild(div_clone);
      }
    },
  },
}

Proposal.prototype.below_initial = function () {
  const instance = this;

  let div_clone, div_clone2, div_clone3, temp_dom, input_clone;
  let buttonTexts = {
    width: [ 122, 108, 126, 108 ],
    leftRight: [ 48, 180, 173, 55 ],
    contents: [ "제안서 리스트", "제안서 생성", "변동 버튼 1", "변동 버튼 2" ],
  }
  let h = document.createDocumentFragment();
  for (let i = 0; i < buttonTexts.contents.length; i++) {
    if (i === 2) {
      div_clone = Genemongo.nodes.div.cloneNode(true);
      div_clone.classList.add("blewpp_bar");
      div_clone.classList.add("blewpp_barleft");
      this.below_tong.set("barleft", div_clone);
      h.appendChild(div_clone);

      div_clone = Genemongo.nodes.div.cloneNode(true);
      div_clone.className = "blewpp_numberbar_total";

      input_clone = Genemongo.nodes.input.cloneNode(true);
      input_clone.setAttribute("type", "text");
      input_clone.setAttribute("placeholder", "고객 이름 검색...");
      input_clone.classList.add("blewpp_input");
      this.below_tong.set("search", input_clone);
      div_clone.appendChild(input_clone);
      h.appendChild(div_clone);

      div_clone = Genemongo.nodes.div.cloneNode(true);
      div_clone.classList.add("blewpp_bar");
      div_clone.classList.add("blewpp_barright");
      this.below_tong.set("barright", div_clone);
      h.appendChild(div_clone);
    }
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.className = "blewpp_button";
    div_clone.id = "blewpp_button" + String(i);
    if (i === 0) {
      div_clone.addEventListener("click", function (e) {
        if (instance.toggleSetting.listCreate === 0) {
          this.children[0].style.color = "#59af89";
          this.children[0].style.opacity = "";
          this.nextElementSibling.children[0].style.color = "";
          this.nextElementSibling.children[0].style.opacity = "0.4";
          let mother = document.querySelector(".mongo_box_create");
          let father = document.querySelector(".mongo_box_list");
          father.classList.remove("listpp_fadeout");
          father.classList.add("listpp_fadein");
          instance.list_launching();
          mother.classList.add("listpp_fadeout");
          mother.classList.remove("listpp_fadein");
          father.style.zIndex = "0";
          instance.toggleSetting.listCreate = 1;
          instance.pastMaps = [];
        }
      });
    } else if (i === 1) {
      div_clone.addEventListener("click", function (e) {
        if (instance.toggleSetting.listCreate === 1) {
          this.children[0].style.color = "#59af89";
          this.children[0].style.opacity = "";
          this.previousElementSibling.children[0].style.color = "";
          this.previousElementSibling.children[0].style.opacity = "0.4";
          let mother = document.querySelector(".mongo_box_create");
          let father = document.querySelector(".mongo_box_list");
          father.classList.add("listpp_fadeout");
          father.classList.remove("listpp_fadein");
          mother.classList.remove("listpp_fadeout");
          mother.classList.add("listpp_fadein");
          father.style.zIndex = "-1";
          instance.toggleSetting.listCreate = 0;
          if (instance.toggleSetting.load === 1) {
            instance.load_reset({});
            temp_dom = document.getElementById("blewpp_button3");
            temp_dom.children[0].textContent = "제안서 저장";
            temp_dom.addEventListener("click", Proposal.below_events.save);
            temp_dom.removeEventListener("click", Proposal.below_events.update);
            temp_dom.setAttribute("cus_id", "");
          }
          instance.toggleSetting.load = 0;
          instance.pastMaps = [];
        }
      });
    }
    if (i < 2) { div_clone.style.left = String(buttonTexts.leftRight[i]) + "px"; }
    else { div_clone.style.right = String(buttonTexts.leftRight[i]) + "px"; }
    div_clone.style.width = String(buttonTexts.width[i]) + "px";

    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.className = "blewpp_button_text";
    div_clone2.textContent = buttonTexts.contents[i];
    div_clone.appendChild(div_clone2);
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.className = "blewpp_button_garim";
    div_clone.appendChild(div_clone2);
    h.appendChild(div_clone);
    this.below_tong.set("button" + String(i), div_clone);
  }
  document.getElementById("belowgreen").appendChild(h);
}

Proposal.prototype.below_first = function () {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  //button
  this.below_tong.get("button2").children[0].textContent = "고객 카드 보기";
  if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
  else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
  this.below_tong.get("button2").style.right = String(173) + "px";
  this.below_tong.get("button3").style.right = String(55) + "px";
  this.below_tong.get("button2").addEventListener("click", Proposal.below_events.first.b2);
  if (this.toggleSetting.load === 0) { this.below_tong.get("button3").addEventListener("click", Proposal.below_events.save); }
  else { this.below_tong.get("button3").addEventListener("click", Proposal.below_events.update); }
  //bar
  this.below_tong.get("barright").style.width = "calc(50% - 457px)";
  this.below_tong.get("barright").style.right = String(324) + "px";
  //search
  this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
  this.below_tong.get("search").value = "";
  this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
  this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.designer);
  this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.client);
}

Proposal.prototype.below_second = function (onoff) {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 437px)";
    this.below_tong.get("barright").style.right = String(304) + "px";
    //button
    this.below_tong.get("button2").style.width = String(108) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "서비스 상세";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.second.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.service);

  } else {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "고객 카드 보기";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.first.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.client);
  }
}

Proposal.prototype.below_third = function (onoff) {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 목록";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.third.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.designer);
  } else {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 437px)";
    this.below_tong.get("barright").style.right = String(304) + "px";
    //button
    this.below_tong.get("button2").style.width = String(108) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "서비스 상세";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.second.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.designer);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.service);
  }
}

Proposal.prototype.below_fourth = function (onoff) {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 카드";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.third.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.fourth.b2);
    if (this.toggleSetting.load === 1) {
      this.below_tong.get("button3").removeEventListener("click", Proposal.below_events.save);
      this.below_tong.get("button3").addEventListener("click", Proposal.below_events.update);
    }
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.designer);
  } else {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 목록";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.third.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.designer);
  }
}

Proposal.prototype.below_fifth = function (onoff) {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "세팅 저장하기";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }

    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.fifth.b2, { once: true });
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.designer);
  } else {
    //bar
    this.below_tong.get("barright").style.width = "calc(50% - 457px)";
    this.below_tong.get("barright").style.right = String(324) + "px";
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 카드";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", Proposal.below_events.fifth.b2, { once: true });
    this.below_tong.get("button2").addEventListener("click", Proposal.below_events.fourth.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", Proposal.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", Proposal.below_events.search.designer);
  }
}

Proposal.prototype.below_launching = function (button, onoff = "on") {
  let temp_string;
  if (button === "first") {
    this.below_initial();
    this.below_first();
  } else {
    temp_string = "below_" + button;
    (this[temp_string])(onoff);
  }
}
