const ProposalJs = function () {
  this.mother = new GeneralJs();
  this.grandmother = document.getElementById("totalcontents");
  this.createPannel = {};
  this.domBox = new Map();
  this.thirdChildren = {};
  this.fourthChildren = {};
  this.fifthChildren = {};
  this.whiteBox = {};
  this.pastMaps = [];
  this.totalTong = {};
  this.totalTong.fifthScrollmove = {};
  this.below_tong = new Map();
  this.list_domBox = new Map();
}

ProposalJs.prototype.totalInitial = function () {
  let div_clone;
  let style;

  //total contents
  style = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 123px)",
    overflow: "hidden",
  };
  for (let i in style) {
    this.grandmother.style[i] = style[i];
  }

  //total create pannel
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    display: "block",
    width: "calc(100% - 96px)",
    height: "calc(100% - 112px)",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  this.createPannel = div_clone;
  this.grandmother.appendChild(div_clone);

  //total list pannel
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    zIndex: "-1",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  this.grandmother.appendChild(div_clone);
  this.listPannel = div_clone;
}

ProposalJs.prototype.toggleSetting = {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0,
  listCreate: 0,
  load: 0,
}

ProposalJs.auto_comma = function (str) {
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

ProposalJs.below_events = {
  save: async function (e) {
    await ProposalJs.save_init(false);
  },
  update: async function (e) {
    await ProposalJs.save_init(true);
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

      let result = JSON.parse(await GeneralJs.ajaxPromise("collection=Designer&find1=" + JSON.stringify({ past_desid: desid }) + "&find2={}", "/post_mfind"));
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
          general_str += GeneralJs.tagCoverting(obj);
          result[0].picture.settings[this_order].value = GeneralJs.tagParsing(general_str);
          console.log(await GeneralJs.ajaxPromise("table=Designer&st=past_desid&i=" + desid + "&c=picture.settings&v=" + JSON.stringify(result[0].picture.settings), "/post_mupdate"));
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
                div_clone.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
              } else if (default_setting[i].unionPo === "union") {
                div_clone.addEventListener("click", ProposalJs.fifthPicturebox_split(), { once: true });
              }
              div_clone.setAttribute("cus_info", GeneralJs.tagCoverting(default_setting[i]));
              div_clone.classList.add("fifth_drag_img");
              div_clone.style.cssText = default_setting[i].styleText;
              inbox.appendChild(div_clone);
            }
            dom.appendChild(inbox);
          }
          let pictureBox = document.querySelector(".ppw_left_picturebox");
          while (pictureBox.firstChild) { pictureBox.removeChild(pictureBox.lastChild); }
          picturebox_make(pictureBox);
          ProposalJs.fifthDrag(".fifth_drag_img");
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

ProposalJs.prototype.below_initial = function () {
  const instance = this;
  let div_clone, div_clone2, div_clone3, temp_dom, input_clone;
  let buttonTexts = {
    width: [ 122, 108, 126, 108 ],
    leftRight: [ 48, 180, 173, 55 ],
    contents: [ "제안서 리스트", "제안서 생성", "변동 버튼 1", "변동 버튼 2" ],
  };
  let h = document.createDocumentFragment();

  for (let i = 0; i < buttonTexts.contents.length; i++) {
    if (i === 2) {
      this.below_tong.set("search", this.mother.searchInput);
    }

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.className = "blewpp_button";
    div_clone.id = "blewpp_button" + String(i);

    if (i === 0) {
      div_clone.addEventListener("click", function (e) {
        if (instance.toggleSetting.listCreate === 0) {
          this.children[0].style.color = "#59af89";
          this.children[0].style.opacity = "";
          this.nextElementSibling.children[0].style.color = "";
          this.nextElementSibling.children[0].style.opacity = "0.4";
          let mother = instance.createPannel;
          let father = instance.listPannel;
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
          let mother = instance.createPannel;
          let father = instance.listPannel;
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
            temp_dom.addEventListener("click", ProposalJs.below_events.save);
            temp_dom.removeEventListener("click", ProposalJs.below_events.update);
            temp_dom.setAttribute("cus_id", "");
          }
          instance.toggleSetting.load = 0;
          instance.pastMaps = [];
        }
      });
    }

    if (i < 2) {
      div_clone.style.left = String(buttonTexts.leftRight[i]) + "px";
    } else {
      div_clone.style.right = String(buttonTexts.leftRight[i]) + "px";
    }

    div_clone.style.width = String(buttonTexts.width[i]) + "px";

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.className = "blewpp_button_text";
    div_clone2.textContent = buttonTexts.contents[i];
    div_clone.appendChild(div_clone2);
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.className = "blewpp_button_garim";
    div_clone.appendChild(div_clone2);
    h.appendChild(div_clone);
    this.below_tong.set("button" + String(i), div_clone);
  }
  this.mother.below.appendChild(h);
}

ProposalJs.prototype.below_first = function () {
  const instance = this;

  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";

  //button
  this.below_tong.get("button2").children[0].textContent = "고객 카드 보기";
  if (this.toggleSetting.load === 0) {
    this.below_tong.get("button3").children[0].textContent = "제안서 저장";
  } else {
    this.below_tong.get("button3").children[0].textContent = "제안서 수정";
  }
  this.below_tong.get("button2").style.right = String(173) + "px";
  this.below_tong.get("button3").style.right = String(55) + "px";
  this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.first.b2);
  if (this.toggleSetting.load === 0) {
    this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.save);
  } else {
    this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.update);
  }

  //search
  this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
  this.below_tong.get("search").value = "";
  this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
  this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
  this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.client);
}

ProposalJs.prototype.below_second = function (onoff) {
  const instance = this;

  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";

  if (onoff === "on") {

    //button
    this.below_tong.get("button2").style.width = String(108) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "서비스 상세";
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").children[0].textContent = "제안서 저장";
    } else {
      this.below_tong.get("button3").children[0].textContent = "제안서 수정";
    }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.second.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.service);

  } else {

    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "고객 카드 보기";
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").children[0].textContent = "제안서 저장";
    } else {
      this.below_tong.get("button3").children[0].textContent = "제안서 수정";
    }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.first.b2);

    //search
    this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.client);
  }

}

ProposalJs.prototype.below_third = function (onoff) {
  const instance = this;

  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 목록";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.third.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
  } else {
    //button
    this.below_tong.get("button2").style.width = String(108) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "서비스 상세";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.second.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.service);
  }
}

ProposalJs.prototype.below_fourth = function (onoff) {
  const instance = this;

  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 카드";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.third.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.fourth.b2);
    if (this.toggleSetting.load === 1) {
      this.below_tong.get("button3").removeEventListener("click", ProposalJs.below_events.save);
      this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.update);
    }
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
  } else {
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 목록";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.third.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
  }
}

ProposalJs.prototype.below_fifth = function (onoff) {
  const instance = this;
  //general
  this.below_tong.get("button0").children[0].style.opacity = "0.4";
  this.below_tong.get("button1").children[0].style.color = "#59af89";
  if (onoff === "on") {
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "세팅 저장하기";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }

    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.first.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.second.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.third.b2);
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fourth.b2);
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.fifth.b2, { once: true });
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
  } else {
    //button
    this.below_tong.get("button2").style.width = String(126) + "px";
    this.below_tong.get("button2").style.right = String(173) + "px";
    this.below_tong.get("button3").style.right = String(55) + "px";
    this.below_tong.get("button2").children[0].textContent = "디자이너 카드";
    if (this.toggleSetting.load === 0) { this.below_tong.get("button3").children[0].textContent = "제안서 저장"; }
    else { this.below_tong.get("button3").children[0].textContent = "제안서 수정"; }
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fifth.b2, { once: true });
    this.below_tong.get("button2").addEventListener("click", ProposalJs.below_events.fourth.b2);
    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
  }
}

ProposalJs.prototype.below_launching = function (button, onoff = "on") {
  let temp_string;
  if (button === "first") {
    this.below_initial();
    this.below_first();
  } else {
    temp_string = "below_" + button;
    (this[temp_string])(onoff);
  }
}

// Create process 1 ------------------------------------------------------------

ProposalJs.toggleTimeout = {
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

ProposalJs.prototype.firstToggle = function (button, domBox) {
  const instance = this;
  const title = domBox.get("고객 선택").children[0];
  const contents =  domBox.get("고객 선택").children[1];
  let service, service_input;

  if (button === "on") {
    return function (e) {
      if (instance.toggleSetting.first === 0) {
        ProposalJs.toggleTimeout.first = setTimeout(function () {

          instance.below_launching("second", button);
          domBox.get("고객 선택").style.height = "3.2vh";
          domBox.get("고객 선택").style.borderBottom = "1px solid #ececec";

          domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
          domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
          domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

          service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
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

          service_input = domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
          for (let i of service_input) {
            if (i.checked) {
              i.nextElementSibling.style.background = "#59af89";
              i.nextElementSibling.children[0].style.color = "white";
            }
          }
          title.style.color = "#59af89";
          contents.style.background = "white";

          if (document.querySelector("#pp_title_sub_b") !== null) {
            document.querySelector("#pp_title_sub_b").remove();
          }

          title.insertAdjacentHTML('beforeend', '<b id="pp_title_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_id") + '" style="color:#59af89;font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');

          instance.toggleSetting.first = 1;
        }, 300);
      }
    }
  } else if (button === "off") {
    return function (e) {
      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 0) {

        clearTimeout(ProposalJs.toggleTimeout.first);

        instance.below_launching("second", button);

        domBox.get("고객 선택").style.height = "calc(calc(100% / 3) - 21px)",
        domBox.get("고객 선택").style.borderBottom = "";

        domBox.get("서비스 선택").style.height = "calc(calc(100% / 3) - 21px)",
        domBox.get("서비스 선택").children[1].style.height = "calc(90% - 10px)";
        domBox.get("서비스 선택").children[1].style.marginTop = "10px";

        service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.background = "";
          i.children[0].style.color = "";
          i.children[0].style.fontSize = "";
          i.children[0].style.marginTop = "";
        }
        title.style.color = "#404040";
        contents.style.background = "#f7f7f7";
        instance.toggleSetting.first = 0;
      }
    }
  }
}

ProposalJs.prototype.firstProcess = async function () {
  const instance = this;
  let h;
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let titles = [ "pp_firstprocess_box", "pp_secondprocess_box", "pp_thirdprocess_box" ];
  let titles_con = [ "고객 선택", "서비스 선택", "디자이너 선택" ];
  let domBox;
  let clients;
  let style;
  let ea = "px";

  h = document.createDocumentFragment();
  domBox = new Map();

  for (let i = 0; i < titles.length; i++) {

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.id = titles[i];
    style = {
      width: "100%",
      display: "block",
      height: "calc(calc(100% / 3) - 21px)",
      marginBottom: "21px",
      overflow: "hidden",
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      fontSize: "1.8vh",
      fontWeight: "700",
      display: "block",
      height: "10%",
      cursor: "pointer",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone2.textContent = titles_con[i];
    div_clone.appendChild(div_clone2);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      display: "block",
      height: "calc(90% - 10px)",
      marginTop: "10px",
      background: "#f7f7f7",
      borderRadius: "10px",
      paddingRight: "30px",
      paddingLeft: "30px",
      boxSizing: "border-box",
    };
    for (let i in style) {
      div_clone2.style[i] = style[i];
    }
    div_clone.appendChild(div_clone2);

    h.appendChild(div_clone);

    domBox.set(titles_con[i], div_clone);
  }

  this.createPannel.appendChild(h);

  //get client
  clients = JSON.parse(await GeneralJs.ajaxPromise("where=" + JSON.stringify({ "requests": { "$elemMatch": { "analytics.response.status": "응대중" } } }), "/getClients"));
  div_clone4 = GeneralJs.nodes.div.cloneNode(true);
  div_clone4.classList.add("pp_contents_inbox");

  for (let i = 0; i < clients.data.length; i++) {

    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("pp_clients_input");
    input_clone.id = "pp_clients_input" + String(i);
    input_clone.setAttribute("type", "radio");
    input_clone.setAttribute("name", "pp_clients_input");
    div_clone4.appendChild(input_clone);

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_clients");

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.textContent = clients.data[i].standard.cliid + " | " + clients.data[i].standard.name;
    div_clone.appendChild(div_clone2);

    label_clone = GeneralJs.nodes.label.cloneNode(true);
    label_clone.classList.add("pp_clients_label");
    label_clone.setAttribute("for", "pp_clients_input" + String(i));
    label_clone.setAttribute("cus_value", clients.data[i].standard.name);
    label_clone.setAttribute("cus_id", clients.data[i].standard.cliid);

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
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

ProposalJs.prototype.secondToggle = function (button, domBox) {
  const instance = this;
  let service, service_input;

  if (button === "on") {
    return function (e) {
      let selectionBoxBack, selectionBoxWording;

      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 0) {

        service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.background = "white";
          i.children[0].style.color = "#59af89";
          i.children[0].style.fontSize = "1.7vh";
        }

        for (let i = 0; i < 4; i++) {
          service[i].children[0].style.marginTop = "-2px";
        }
        for (let i = 4; i < 8; i++) {
          service[i].children[0].style.marginTop = "-4px";
        }
        for (let i = 8; i < 12; i++) {
          service[i].children[0].style.marginTop = "-6px";
        }

        selectionBoxBack = e.target.parentNode.parentNode;
        selectionBoxWording = e.target.parentNode.parentNode.children[0];

        selectionBoxBack.style.background = "#59af89";
        selectionBoxWording.style.color = "white";

        ProposalJs.toggleTimeout.second = setTimeout(function () {

          instance.below_launching("third", button);

          domBox.get("서비스 선택").children[0].style.color = "#59af89";
          domBox.get("서비스 선택").children[1].style.background = "white";

          if (document.querySelector("#pp_title2_sub_b") !== null) {
            document.querySelector("#pp_title2_sub_b").remove();
          }

          domBox.get("서비스 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title2_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_value") + '" style="color:#59af89;font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
          domBox.get("서비스 선택").style.height = "3.2vh";
          domBox.get("서비스 선택").style.borderBottom = "1px solid #ececec";

          for (let i of service) {
            i.style.opacity = "0";
          }

          instance.toggleSetting.second = 1;

          domBox.get("서비스 선택").children[1].style.height = "calc(90% - 10px)";
          domBox.get("서비스 선택").children[1].style.marginTop = "10px";
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
  } else if (button === "off") {
    return function (e) {
      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 1) {

        clearTimeout(ProposalJs.toggleTimeout.second);
        document.querySelector(".pp_designer_question").classList.add("pp_designer_question_remove");
        document.querySelector(".pp_designer_question").classList.remove("pp_designer_question_add");
        document.querySelector(".pp_designer_question_press").classList.add("pp_designer_question_press_remove");
        document.querySelector(".pp_designer_question_press").classList.remove("pp_designer_question_press_add");

        instance.below_launching("third", button);

        domBox.get("서비스 선택").children[0].style.color = "#404040";
        domBox.get("서비스 선택").children[1].style.background = "#f7f7f7";
        domBox.get("서비스 선택").style.height = "calc(calc(100% / 3) - 21px)";
        domBox.get("서비스 선택").style.borderBottom = "";
        instance.toggleSetting.second = 0;
        domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
        domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
        domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

        service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.opacity = "";
          i.style.background = "white";
          i.children[0].style.color = "#59af89";
          i.children[0].style.fontSize = "1.7vh";
        }

        for (let i = 0; i < 4; i++) {
          service[i].children[0].style.marginTop = "-2px";
        }
        for (let i = 4; i < 8; i++) {
          service[i].children[0].style.marginTop = "-4px";
        }
        for (let i = 8; i < 12; i++) {
          service[i].children[0].style.marginTop = "-6px";
        }

        service_input = domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
        for (let i of service_input) { if (i.checked) { i.nextElementSibling.style.background = "#59af89";i.nextElementSibling.children[0].style.color = "white"; } }
        domBox.get("디자이너 선택").style.height = "calc(calc(100% / 3) - 21px)";
        domBox.get("디자이너 선택").children[1].style.height = "calc(90% - 10px)";
        domBox.get("디자이너 선택").children[1].style.marginTop = "10px";

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

ProposalJs.prototype.secondProcess = async function () {
  const instance = this;
  let second = {};
  let h;
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let serviceX, serviceY;
  let style;
  let ea = "px";

  second.total = this.domBox.get("서비스 선택");
  second.title = second.total.children[0];
  second.contents = second.total.children[1];

  h = document.createDocumentFragment();
  serviceX = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "설계 변경" ];
  serviceY = [ "mini", "basic", "premium" ];

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_contents_inbox");
  style = {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: "2.5px",
    paddingTop: "16px",
    height: "calc(100% - 56px)",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }

  for (let i = 0; i < serviceY.length; i++) {
    for (let j = 0; j < serviceX.length; j++) {
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("pp_clients_input");
      input_clone.id = "pp_service_input" + String(j) + String(i);
      input_clone.setAttribute("type", "radio");
      input_clone.setAttribute("name", "pp_service_input");
      div_clone.appendChild(input_clone);
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_service");
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.classList.add("pp_service_wording");
      div_clone3.textContent = serviceX[j] + ' ' + serviceY[i];
      div_clone2.appendChild(div_clone3);
      label_clone = GeneralJs.nodes.label.cloneNode(true);
      label_clone.classList.add("pp_clients_label");
      label_clone.setAttribute("for", "pp_service_input" + String(j) + String(i));
      label_clone.setAttribute("cus_value", serviceX[j] + ' ' + serviceY[i]);
      label_clone.addEventListener("click", this.secondToggle("on", this.domBox));
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
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

ProposalJs.prototype.thirdKeyup = function () {
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

ProposalJs.prototype.thirdProcess = async function () {
  const instance = this;
  let h;
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let third;
  let children;

  third = {};
  h = document.createDocumentFragment();
  children = new Map();

  third.total = this.domBox.get("디자이너 선택");
  third.title = third.total.children[0];
  third.contents = third.total.children[1];

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_contents_inbox");

  for (let i = 0; i < 3; i++) {
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer");
    div_clone.appendChild(div_clone2);
    children.set("box" + String(i), div_clone2);
  }

  third.contents.appendChild(div_clone);

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("pp_designer_question");
  children.set("box1_question", div_clone);

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  div_clone2.textContent = "추천 디자이너 수 : ";
  div_clone.appendChild(div_clone2);
  children.set("box1_title", div_clone2);

  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.id = "pp_designer_question_input";
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("name", "pp_designer_question_input");
  input_clone.setAttribute("value", "3명");
  div_clone.appendChild(input_clone);

  div_clone3 = GeneralJs.nodes.div.cloneNode(true);
  div_clone3.className = "pp_designer_question_press";
  div_clone3.textContent = "완료 후 Enter나 Tap키를 누르세요.";
  div_clone.appendChild(div_clone3);

  children.set("box1_designerInput", input_clone);
  children.get("box1").appendChild(div_clone);

  input_clone.addEventListener("keydown", function (e) {
    if (e.keyCode === 13 || e.keyCode === 9) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  });
  input_clone.addEventListener("keyup", this.thirdKeyup());

  return children;
}

// Create process 4 ------------------------------------------------------------

ProposalJs.prototype.fourthsetTimeout = async function (num, obj = {}) {
  const instance = this;
  const domBox = this.domBox;
  let fourthChildren;
  let thirdChildren;
  let fourth;
  let money_set;
  let designers;

  fourthChildren = new Map();
  thirdChildren = this.thirdChildren;
  fourth = {};

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
        this.value = ProposalJs.auto_comma(this.value);
      }
    } else if (e.type === "blur") {
      this.value = ProposalJs.auto_comma(this.value);
    }
    this.style.width = String(0.85 * this.value.length) + "vh";
    if (this.value.replace(/,/g, '').length < 7) {
      this.style.width = String(0.9 * this.value.length) + "vh";
    }
    if (this.value.replace(/,/g, '').length < 4) {
      this.style.width = String(1.1 * this.value.length) + "vh";
    }
  }

  money_set = function (onoff, s = 0) {
    let div_clone, div_clone2, div_clone3, input_clone;

    //set
    div_clone3 = GeneralJs.nodes.div.cloneNode(true);
    div_clone3.classList.add("pp_designer_selected_box_contents_money_set");
    if (typeof onoff === "string") {
      div_clone3.classList.add("pp_designer_selected_box_contents_money_set" + ((onoff === "오프라인") ? "_offline" : "_online"));
    } else {
      div_clone3.classList.add("pp_designer_selected_box_contents_money_set" + ((onoff.fee[s].method === "offline") ? "_offline" : "_online"));
    }

    //1
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer_selected_box_contents_money_text");
    if (typeof onoff === "string") {
      div_clone2.textContent = onoff;
    } else {
      div_clone2.textContent = ((onoff.fee[s].method === "offline") ? "오프라인" : "온라인");
    }
    div_clone3.appendChild(div_clone2);

    //2
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.setAttribute("type", "text");
    input_clone.classList.add("pp_designer_selected_box_contents_money_input");
    if (typeof onoff === "string") {
      input_clone.value = "2,000,000";
    } else {
      input_clone.value = ProposalJs.auto_comma(String(onoff.fee[s].money));
    }
    input_clone.style.width = String(0.85 * input_clone.value.length) + "vh";
    input_clone.addEventListener("keyup", fourth.events.money);
    input_clone.addEventListener("blur", fourth.events.money);
    div_clone3.appendChild(input_clone);

    //3
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer_selected_box_contents_money_text2");
    div_clone2.insertAdjacentHTML("beforeend", '원');
    div_clone3.appendChild(div_clone2);
    return div_clone3;

  }

  fourth.events.designer = function (e) {
    const getnode = function (num, boo = true) {
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
      if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
        document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).querySelector(".pp_designer_selected_box_contents_money_set" + ((this.getAttribute("cus_value") === "오프라인") ? "_offline" : "_online")).remove();
      }
    } else {
      if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
        document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).appendChild(money_set(this.getAttribute("cus_value")));
      }
    }
  }

  fourth.events.popup = async function (e) {
    let n;
    let selected, selected_box;
    let inputs;
    let desid;
    let fifth;

    n = this.getAttribute("cus_id").replace(/[^0-9]/g, '');
    if (this.textContent !== "디자이너를 선택해주세요!") {
      selected = document.querySelectorAll(".pp_designer_selected");
      selected_box = selected[n].querySelector(".pp_designer_selected_box_contents_designers_total");
      inputs = selected_box.querySelectorAll("input");
      for (let input of inputs) {
        if (input.checked) { desid = input.value }
      }
      instance.below_launching("fifth", "on");
      fifth = await instance.fifthProcess(desid, n);
      fifth();
    } else {
      alert("디자이너를 선택해주세요!");
    }
  }

  //디자이너 이름
  designers = JSON.parse(await GeneralJs.ajaxPromise('collection=Designer&find1={}&find2=' + JSON.stringify({ designer: 1, past_desid: 1 }), '/post_mfind'));

  fourth.callbacks.set("디자이너 이름", function (dom, n) {
    let input, div_clone, div_clone2, div_clone3, input_clone, label_clone;
    let i;

    input = GeneralJs.nodes.input.cloneNode(true);
    input.classList.add("pp_designer_selected_box_contents_designers_input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "pp_designer_selected_box_contents_designers_input" + String(n));
    input.style.display = "none";

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_designers_total");

    i = 0;
    for (let designer of designers) {

      input_clone = input.cloneNode(true);
      input_clone.id = "pp_designer_selected_box_contents_designers_input" + String(n) + String(i);
      input_clone.value = designer.past_desid;

      div_clone.appendChild(input_clone);
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.textContent = designer.designer;

      label_clone = GeneralJs.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_designers_input" + String(n) + String(i));

      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      div_clone3.setAttribute("cus_value", designer.designer);
      div_clone3.setAttribute("cus_num", String(n));
      div_clone3.addEventListener("click", fourth.events.designer);

      label_clone.appendChild(div_clone3);

      div_clone2.appendChild(label_clone);
      div_clone.appendChild(div_clone2);

      if (obj.proposal !== undefined) {
        if (designer.past_desid === obj.proposal[n].desid) {
          input_clone.checked = true;
        }
      }

      i = i + 1;
    }

    for (let j = 0; j < 10; j++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.textContent = "자이너";
      div_clone2.style.opacity = 0;
      div_clone.appendChild(div_clone2);
    }

    dom.appendChild(div_clone);
  });

  //서비스 방식
  fourth.callbacks.set("서비스 방식", function (dom, n) {
    let input = GeneralJs.nodes.input.cloneNode(true);
    input.classList.add("pp_designer_selected_box_contents_service_input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "pp_designer_selected_box_contents_service_input" + String(n));
    input.style.display = "none";

    let div_clone, div_clone2, div_clone3, input_clone, label_clone;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
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
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_service");
      div_clone2.textContent = service[i];
      div_clone2.insertAdjacentHTML('afterbegin', '<div class="pp_designer_selected_box_contents_service_won"></div>');
      label_clone = GeneralJs.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_service_input" + String(n) + String(i));
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
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
    div_clone = GeneralJs.nodes.div.cloneNode(true);
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
    div_clone = GeneralJs.nodes.div.cloneNode(true);
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
    let div_clone, div_clone2, div_clone3, div_clone4, general_string;
    let target0, target1, target2;

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
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("pp_designer_selected");
        div_clone.setAttribute("cus_id", 's' + String(i));
        div_clone.style.width = "calc(100% / " + String(num) + ")";
        if (i !== 0) { div_clone.style.borderLeft = "1px solid #ececec"; }

        for (let j = 0; j < fourth.titles.length; j++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("pp_designer_selected_box");
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_title");
          div_clone3.textContent = fourth.titles[j];
          div_clone2.appendChild(div_clone3);
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_contents");
          (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
          div_clone2.appendChild(div_clone3);
          div_clone.appendChild(div_clone2);
        }

        //remember value
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add("pp_designer_selected_box_value");
        //------------------------------------------------------------------------
        if (obj.proposal !== undefined) {
          general_string = '';
          for (let k of obj.proposal[i].picture_settings) {
            general_string += GeneralJs.tagCoverting(k)  + "__split3__";
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
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("pp_designer_selected");
          div_clone.setAttribute("cus_id", 's' + String(i));
          div_clone.style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) { div_clone.style.borderLeft = "1px solid #ececec"; }
          for (let j = 0; j < fourth.titles.length; j++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("pp_designer_selected_box");
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_title");
            div_clone3.textContent = fourth.titles[j];
            div_clone2.appendChild(div_clone3);
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_contents");
            (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
            div_clone2.appendChild(div_clone3);
            div_clone.appendChild(div_clone2);
          }
          //remember value
          div_clone4 = GeneralJs.nodes.div.cloneNode(true);
          div_clone4.classList.add("pp_designer_selected_box_value");
          //------------------------------------------------------------------------
          if (obj.proposal !== undefined) {
            general_string = '';
            for (let k of obj.proposal[i].picture_settings) {
              general_string += GeneralJs.tagCoverting(k)  + "__split3__";
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

    clearTimeout(ProposalJs.toggleTimeout.fourth);
  }
}

ProposalJs.prototype.fourthProcess = async function (num) {
  const instance = this;
  let setTimeout_func;
  try {
    for (let i = 0; i < 3; i++) {
      this.thirdChildren.get("box" + String(i)).style.opacity = "0";
    }
    setTimeout_func = await this.fourthsetTimeout(num);
    ProposalJs.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
  } catch (e) {
    console.log(e);
  }
}

// Create process 5 ------------------------------------------------------------

ProposalJs.prototype.fifthWhitesave = function (id) {
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
    general_str += GeneralJs.tagCoverting(obj);

    targetBoxes[id].querySelector(".pp_designer_selected_box_value").textContent = general_str;
    instance.below_launching("fifth", "off");
    document.querySelector(".pp_fifth_cancelback").remove();
    document.querySelector(".pp_fifth_whitebox").remove();
  }
}

ProposalJs.prototype.fifthWhiteup = function (whitebox, porpor, id, ghost, picture_settings) {
  let instance = this;
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, scroll_box, input_clone, label_clone, img_clone, img_clone2;
  let leftMother, rightMother;
  let mother = whitebox;
  let whiteBoxDom = new Map();

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_leftbox");
  mother.appendChild(div_clone);
  whiteBoxDom.set("leftbox", div_clone);
  leftMother = div_clone;

  div_clone = GeneralJs.nodes.div.cloneNode(true);
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
    values = GeneralJs.tagParsing(values);
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
      inbox = GeneralJs.nodes.div.cloneNode(true);
      inbox.classList.add("ppw_left_picturebox_inbox");
      for (let i = 0; i < default_setting.length; i++) {
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("ppw_left_picturebox_inbox_detail");
        if (default_setting[i].unionPo !== "union") {
          div_clone.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
        } else if (default_setting[i].unionPo === "union") {
          div_clone.addEventListener("click", ProposalJs.fifthPicturebox_split(), { once: true });
        }
        div_clone.setAttribute("cus_info", GeneralJs.tagCoverting(default_setting[i]));
        div_clone.classList.add("fifth_drag_img");
        div_clone.style.cssText = default_setting[i].styleText;
        inbox.appendChild(div_clone);
      }
      dom.appendChild(inbox);
    },
    //description
    function (dom) {
      let inbox, inbutton, div_clone, div_clone2, input_clone;
      inbox = GeneralJs.nodes.div.cloneNode(true);
      inbox.classList.add("ppw_left_description_inbox");
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("ppw_left_description_inbox_detail");
      div_clone.textContent = "디자이너 설명";
      inbox.appendChild(div_clone);
      for (let i in descriptions) {
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("ppw_left_description_inbox_input");
        input_clone.value = descriptions[i];
        inbox.appendChild(input_clone);
      }
      dom.appendChild(inbox);
      inbutton = GeneralJs.nodes.div.cloneNode(true);
      inbutton.classList.add("ppw_left_description_inbutton");
      inbutton.textContent = "완료";
      inbutton.addEventListener("click", instance.fifthWhitesave(id));
      dom.appendChild(inbutton);
    },
  ];
  for (let i = 0; i < leftList.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
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
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_right_totalbox");

  for (let j = 0; j < (porpor.length + 1); j++) {
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("ppw_right_set");
    for (let i = 0; i < rightList.length; i++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
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
        scroll_box = GeneralJs.nodes.div.cloneNode(true);
        scroll_box.classList.add("ppw_right_picturebox_scroll");
        if (j < porpor.length) {
          for (let k = 0; k < porpor[j].photosg.length; k++) {
            div_clone4 = GeneralJs.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + porpor[j].photosg[k]);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = "/list_image/portp" + porpor[j].porlid + "/t" + String(k + 1) + porpor[j].porlid + ".jpg";
            sgTrue = porpor[j].photosg[k];
            img_clone.setAttribute("src", imgSrc);
            img_clone.setAttribute("cus_info", GeneralJs.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
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
            div_clone4 = GeneralJs.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + ghost[k].sgTrue);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = ghost[k].link;
            sgTrue = ghost[k].sgTrue;
            img_clone.setAttribute("src", imgSrc);
            img_clone.setAttribute("cus_info", GeneralJs.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
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
        img_clone2  = GeneralJs.nodes.img.cloneNode(true);
        img_clone2.classList.add("ppw_right_buttonup_img_left");
        img_clone2.src = "/list_svg/triangle1.svg";
        div_clone3.appendChild(img_clone2);
        img_clone2  = GeneralJs.nodes.img.cloneNode(true);
        img_clone2.classList.add("ppw_right_buttonup_img_right");
        img_clone2.src = "/list_svg/triangle2.svg";
        div_clone3.appendChild(img_clone2);
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add("ppw_right_buttonup_div_left");
        div_clone4.addEventListener("click", this.fifthScrollX("click", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mousedown", this.fifthScrollX("mousedown", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseup", this.fifthScrollX("mouseup", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseleave", this.fifthScrollX("mouseleave", { direction: "left", order: j, id: id, }));
        div_clone4.addEventListener("mouseout", this.fifthScrollX("mouseout", { direction: "left", order: j, id: id, }));

        div_clone3.appendChild(div_clone4);
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
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
  ProposalJs.fifthDrag(".fifth_drag_img");
  this.whiteBox = whiteBoxDom;
}

ProposalJs.fifthDrag = function (mege) {
  let ddnodes = document.querySelectorAll(mege);
  let eventArr = ProposalJs.fifthDrag_funcs();
  for (let node of ddnodes) {
    node.addEventListener("dragstart", eventArr[0]);
    node.addEventListener("dragend", eventArr[1]);
    node.addEventListener("dragenter", eventArr[2]);
    node.addEventListener("dragleave", eventArr[3]);
    node.addEventListener("dragover", eventArr[4]);
    node.addEventListener("drop", eventArr[5]);
  }
}

ProposalJs.prototype.fifthScrollX = function (method, options) {
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

ProposalJs.prototype.fifthProcess = async function (desid, id) {
  const instance = this;
  const total = this.createPannel.parentNode;
  let popupDom;
  let ghost;
  let find1, find2;
  let porpor, pordeta;

  popupDom = new Map();
  ghost = JSON.parse(await GeneralJs.ajaxPromise("collection=Designer&find1=" + JSON.stringify({ past_desid: desid }) + "&find2={}", "/post_mfind"));
  find1 = { desid: ghost[0].past_desid };
  find2 = {};
  porpor = JSON.parse(await GeneralJs.ajaxPromise("collection=FP1_porlist&find1=" + JSON.stringify(find1) + "&find2=" + JSON.stringify(find2), "/post_mfind"));
  pordeta = JSON.parse(await GeneralJs.ajaxPromise("collection=FP2_pordeta&find1=" + JSON.stringify(find1) + "&find2=" + JSON.stringify(find2), "/post_mfind"));
  for (let i of porpor) {
    for (let j of pordeta) {
      if (i.porlid === j.porlid) {
        i.photosg = j.photosg.split(" ");
      }
    }
  }

  return function () {
    let div_clone;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_fifth_cancelback");
    div_clone.addEventListener("click", instance.fifthWhitesave(id));
    total.appendChild(div_clone);

    popupDom.set("cancelBack", div_clone);
    div_clone = GeneralJs.nodes.div.cloneNode(true);
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

ProposalJs.fifthDrag_funcs = function () {
  function dragstart_event(e) {
    e.dataTransfer.setData("sun", this.getAttribute("cus_info"));
  }
  function dragend_event(e) { this.style.opacity = ""; }
  function dragenter_event(e) { this.style.opacity = "0.4"; }
  function dragleave_event(e) { this.style.opacity = ""; }
  function dragover_event(e) { e.preventDefault(); }
  function drop_event(e) { e.preventDefault(); if (e.target.nodeName === "DIV") {
    let data = GeneralJs.tagParsing(e.dataTransfer.getData("sun"));
    let jari = GeneralJs.tagParsing(this.getAttribute("cus_info"));
    if (jari.sgTrue === data.sgTrue) {
      this.style.backgroundImage = "url('" + data.imgSrc + "')";
      jari.imgSrc = data.imgSrc;
      this.setAttribute("cus_info", GeneralJs.tagCoverting(jari));
    }
  } this.style.opacity = ""; }
  return [ dragstart_event, dragend_event, dragenter_event, dragleave_event, dragover_event, drop_event ];
}

ProposalJs.fifthPicturebox_split = function () {
  let eventArr = ProposalJs.fifthDrag_funcs();
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
    obj = GeneralJs.tagParsing(this.getAttribute("cus_info"));
    obj.sgTrue = 's';
    obj.imgSrc = '';
    obj.unionPo = "left";
    this.style.backgroundImage = '';
    this.setAttribute("cus_info", GeneralJs.tagCoverting(obj));
    this.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });

    div_clone = div.cloneNode(true);
    div_clone.classList.add("ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < nodePosition.length; i++) {
      div_clone.style[nodePosition[i]] = current.to[i];
    }
    div_clone.setAttribute("cus_info", GeneralJs.tagCoverting({ position: String(Number(obj.position) + 1), sgTrue: 's', unionPo: "right" }));
    div_clone.addEventListener("dragstart", eventArr[0]);
    div_clone.addEventListener("dragend", eventArr[1]);
    div_clone.addEventListener("dragenter", eventArr[2]);
    div_clone.addEventListener("dragleave", eventArr[3]);
    div_clone.addEventListener("dragover", eventArr[4]);
    div_clone.addEventListener("drop", eventArr[5]);
    div_clone.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });

    this.parentNode.insertBefore(div_clone, this.nextElementSibling);
    let details = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < details.length; i++) {
      obj2 = GeneralJs.tagParsing(details[i].getAttribute("cus_info"));
      obj2.position = String(i);
      details[i].setAttribute("cus_info", GeneralJs.tagCoverting(obj2));
    }
  }
}

ProposalJs.fifthPicturebox_union = function () {
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

    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "33.5" && filter(this_css.width) === "33" && filter(this_css.height) === "66" && GeneralJs.tagParsing(dom.getAttribute("cus_info")).unionPo === "right") {
      current.to = [ "0%", "0%", "66.5%", "66%" ];

    } else if (filter(this_css.top) === "0" && filter(this_css.left) === "33.5" && filter(this_css.width) === "33" && filter(this_css.height) === "66" && GeneralJs.tagParsing(dom.getAttribute("cus_info")).unionPo === "left") {
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
        objp = GeneralJs.tagParsing(this.previousElementSibling.getAttribute("cus_info"));
        if (objp.unionPo === "union") {
          this.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
          return
        }
    }
    if (filter(this.style.top) === "0" && filter(this.style.left) === "0" && filter(this.style.width) === "32.8" && filter(this.style.height) === "66") {
      objp = GeneralJs.tagParsing(this.nextElementSibling.getAttribute("cus_info"));
      if (objp.unionPo === "union") {
        this.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
        return
      }
    }
    let div_clone, obj, obj2;
    obj = GeneralJs.tagParsing(this.getAttribute("cus_info"));
    if (obj.unionPo === "left") { this.nextElementSibling.remove(); }
    else { this.previousElementSibling.remove(); }
    for (let i = 0; i < nodePosition.length; i++) {
      this.style[nodePosition[i]] = current.to[i];
    }
    obj.sgTrue = 'g';
    obj.imgSrc = '';
    obj.unionPo = "union";
    this.style.backgroundImage = '';
    this.setAttribute("cus_info", GeneralJs.tagCoverting(obj));
    this.addEventListener("click", ProposalJs.fifthPicturebox_split(), { once: true });
    let details = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    for (let i = 0; i < details.length; i++) {
      obj2 = GeneralJs.tagParsing(details[i].getAttribute("cus_info"));
      obj2.position = String(i);
      details[i].setAttribute("cus_info", GeneralJs.tagCoverting(obj2));
    }
  }
}

ProposalJs.prototype.list_initial = async function () {
  const instance = this;
  let mother = this.listPannel;
  let div_clone, div_clone2;
  let classes = [ "listpp_searchBar", "listpp_leftBar", "listpp_mainArea" ];
  let mapname = [ "검색창", "제안 현황", "메인 리스트" ];
  for (let i = 0; i < classes.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add(classes[i]);
    mother.appendChild(div_clone);
    this.list_domBox.set(mapname[i], div_clone);
  }
  console.log(this.list_domBox);
}

ProposalJs.prototype.list_searchBar_event = async function () {
  let instance = this;
  let search_obj = [];
  let temp_obj, temp_str1, temp_str2, temp_str3;
  let proposal_list_raw = JSON.parse(await GeneralJs.ajaxPromise('collection=Project&find1={}&find2={}', '/post_mfind'));
  let designer_names = JSON.parse(await GeneralJs.ajaxPromise('collection=Designer&find1={}&find2=' + JSON.stringify({ past_desid: 1, designer: 1 }), '/post_mfind'));
  let designer_names_obj = {};
  for (let obj of designer_names) {
    designer_names_obj[obj.past_desid] = obj.designer;
  }
  for (let obj of proposal_list_raw) {
    temp_obj = {}
    temp_obj.originalObj = obj;
    temp_obj.proid = obj.proid;
    temp_obj.client = obj.client;
    temp_obj.cliid = obj.cliid;
    temp_obj.service = obj.service;
    temp_str1 = '';
    temp_str2 = '';
    temp_str3 = '';
    for (let obj2 of obj.proposal) {
      temp_str1 += obj2.desid;
      temp_str1 += designer_names_obj[obj2.desid];
      for (let obj3 of obj2.fee) {
        temp_str2 += obj3.method;
        temp_str3 += (obj3.partial) ? "부분" : '';
      }
    }
    temp_obj.desid = temp_str1;
    temp_obj.method = (/online/g.test(temp_str2)) ? "온라인" : "오프라인"
    temp_obj.partial = temp_str3;
    search_obj.push(temp_obj);
  }
  return async function (e) {
    if (this.value !== '') {
      if (e.keyCode === 13 || e.keyCode === 8 || e.keyCode === 9) {
        let value = this.value;
        let proposal_list_raw_search = [];
        let res = search_obj.filter(function (obj) {
          return (obj.proid.includes(value) || obj.client.includes(value) || obj.service.includes(value) || obj.cliid.includes(value) || obj.desid.includes(value) || obj.method.includes(value) || obj.partial.includes(value));
        });
        for (let obj of res) {
          proposal_list_raw_search.push(obj.originalObj);
        }
        instance.list_mainArea_tongMake(instance.list_domBox.get("메인 리스트"), proposal_list_raw_search, designer_names_obj, false);
      }
    } else {
      instance.list_mainArea_tongMake(instance.list_domBox.get("메인 리스트"), proposal_list_raw, designer_names_obj, false);
    }
  }
}

ProposalJs.prototype.list_searchBar = async function () {
  let parent = this.list_domBox.get("검색창");
  let div_clone, div_clone2, img_clone, input_clone;
  img_clone = GeneralJs.nodes.img.cloneNode(true);
  img_clone.src = "/list_svg/porporpor/search/searbae01.svg";
  img_clone.classList.add("listpp_searchBar_img");
  parent.appendChild(img_clone);
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  input_clone.classList.add("listpp_searchBar_input");
  input_clone.addEventListener("keyup", (await this.list_searchBar_event()));
  parent.appendChild(input_clone);
}

ProposalJs.prototype.list_leftBar = async function () {
  let parent = this.list_domBox.get("제안 현황");
  let div_clone, div_clone2;
  let proposal_list_raw = JSON.parse(await GeneralJs.ajaxPromise('collection=Project&find1={}&find2={}', '/post_mfind'));
  let designers = JSON.parse(await GeneralJs.ajaxPromise('collection=Designer&find1={}&find2=' + JSON.stringify({ past_desid: 1, designer: 1 }), '/post_mfind'));
  let desid_numbers = {}
  for (let obj of designers) { desid_numbers[obj.past_desid] = 0; }
  for (let obj of proposal_list_raw) {
    for (let obj2 of obj.proposal) {
      desid_numbers[obj2.desid] = desid_numbers[obj2.desid] + 1;
    }
  }
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("listpp_leftBar_totalbox");
  for (let i = 0; i < designers.length; i++) {
    //designer id
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_id");
    div_clone2.textContent = designers[i].past_desid;
    div_clone.appendChild(div_clone2);
    //designer name
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail");
    div_clone2.textContent = designers[i].designer;
    div_clone.appendChild(div_clone2);
    //designer bar
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_bar");
    div_clone2.style.top = String(7.5 + (34 * i)) + "px";
    div_clone.appendChild(div_clone2);
    //designer number
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_num");
    div_clone2.textContent = String(desid_numbers[designers[i].past_desid]);
    div_clone.appendChild(div_clone2);
  }
  parent.appendChild(div_clone);
}

ProposalJs.prototype.list_mainArea = async function () {
  let proposal_list_raw = JSON.parse(await GeneralJs.ajaxPromise('collection=Project&find1={}&find2={}', '/post_mfind'));
  let designer_names = JSON.parse(await GeneralJs.ajaxPromise('collection=Designer&find1={}&find2=' + JSON.stringify({ past_desid: 1, designer: 1 }), '/post_mfind'));
  let designer_names_obj = {};
  for (let obj of designer_names) {
    designer_names_obj[obj.past_desid] = obj.designer;
  }
  this.list_mainArea_tongMake(this.list_domBox.get("메인 리스트"), proposal_list_raw, designer_names_obj, true);
}

ProposalJs.prototype.list_mainArea_tongMake = function (parent, proposal_list_raw, designer_names_obj, init) {
  if (!init) {
    while (parent.firstChild) { parent.removeChild(parent.lastChild); }
  }
  let details = [ "_id", "_name", "_details", "_progress" ];
  let details_list = [];
  let info_object_arr = [];

  let div_clone, div_clone2, proposal_obj, general_string, proposal_obj_new;
  for (let i = 0; i < proposal_list_raw.length; i++) {
    proposal_obj_new = [];
    proposal_obj = proposal_list_raw[i];
    proposal_obj_new.push(proposal_obj.proid);
    proposal_obj_new.push(proposal_obj.client);
    general_string = '';
    general_string = proposal_obj.service + "<b> | </b>";
    for (let obj of proposal_obj.proposal) {
      general_string += designer_names_obj[obj.desid];
      general_string += ' : ';
      for (let obj2 of obj.fee) {
        general_string += (obj2.method === "offline") ? "오프라인" : "온라인";
        general_string += ' ';
        general_string += String(obj2.money / 10000) + "만원";
        if (obj2.partial) {
          general_string += '(부분 공간)';
        }
        general_string += ' / ';
      }
      general_string = general_string.slice(0, -3);
      general_string += "<b> | </b>";
    }
    general_string = general_string.slice(0, -10);
    proposal_obj_new.push(general_string);
    proposal_obj_new.push(proposal_obj.status);
    info_object_arr.unshift({
      proid: proposal_obj.proid,
      client: proposal_obj.client,
      cliid: proposal_obj.cliid,
      service: proposal_obj.service,
      proposal: proposal_obj.proposal,
    });
    details_list.unshift(proposal_obj_new);
  }
  for (let i = 0; i < details_list.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_mainArea_tong");
    div_clone.setAttribute("cus_id", details_list[i][0]);
    for (let j = 0; j < details.length; j++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_mainArea_tong" + details[j]);
      if (j === 1 || j === 2) {
        div_clone2.addEventListener("click", this.load_initevent());
      } else if (j === 3) {
        div_clone2.addEventListener("click", this.list_menu());
      }
      div_clone2.insertAdjacentHTML("beforeend", details_list[i][j]);
      div_clone.appendChild(div_clone2);
    }
    div_clone.insertAdjacentHTML("beforeend", '<section style="display:none;">' + JSON.stringify(info_object_arr[i]) + '</section>')
    parent.appendChild(div_clone);
  }
}

ProposalJs.prototype.list_menu = function () {
  let instance = this;
  return async function (e) {
    let div_clone, div_clone2, div_clone3;
    let mother = this;
    let list = [
      { key: "pending", name: "작성중", },
      { key: "confirm", name: "컨펌 요청", },
      { key: "make", name: "제작 요청", },
      { key: "send", name: "발송 대기", },
      { key: "complete", name: "완료", },
      { key: "cancel", name: "취소", },
      { key: "delete", name: "삭제", }
    ];
    // style
    this.style.color = "#59af89";

    // cancel
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_menu_cancelback");
    div_clone.addEventListener("click", function (e) {
      this.nextElementSibling.remove();
      this.remove();
      mother.style.color = "";
    });
    this.parentElement.appendChild(div_clone);

    // menu
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_menu");

    for (let i of list) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_menuEvent");
      div_clone2.classList.add("listpp_menuEvent_" + i.key);
      div_clone2.textContent = i.name;
      div_clone2.addEventListener("click", await instance.list_menuEvents(i, mother, this.parentElement.getAttribute("cus_id")));
      div_clone.appendChild(div_clone2);
    }
    this.parentElement.appendChild(div_clone);
  }
}

ProposalJs.prototype.list_menuEvents = async function (obj, mother, proid) {
  let return_func;
  async function mother_name(o) {
    mother.textContent = o.name;
    console.log(await GeneralJs.ajaxPromise("table=Project&st=proid&i=" + proid + "&c=status&v=" + o.name, "/post_mupdate"));
  }
  function reset_event(t) {
    t.parentElement.previousElementSibling.remove();
    t.parentElement.remove();
    mother.style.color = "";
  }
  switch (obj.key) {
    case "pending":
      return_func = async function (e) {
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "confirm":
      return_func = async function (e) {
        let message = "제안서 확인 후, 컨펌 부탁드리겠습니다! link: ";
        // await GeneralJs.ajaxPromise("/slack", "linkmake=true&link=/mongo/proposal&query=" + GeneralJs.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + GeneralJs.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "make":
      return_func = async function (e) {
        let message = "제안서의 제작을 요청드립니다! link: ";
        // await GeneralJs.ajaxPromise("/polling", "proid=" + proid + "");
        // await GeneralJs.ajaxPromise("/slack", "linkmake=true&link=/mongo/proposal&query=" + GeneralJs.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + GeneralJs.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "send":
      return_func = async function (e) {
        let message = "제안서의 제작이 완성되었습니다! 발송 부탁드리겠습니다. link:  / google drive : ";
        // await GeneralJs.ajaxPromise("/slack", "linkmake=true&link=/mongo/proposal&query=" + GeneralJs.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + GeneralJs.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "complete":
      return_func = async function (e) {
        const info = JSON.parse(this.parentElement.parentElement.querySelector('section').textContent);
        const today = new Date();

        let month, date, value;

        month = (today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1);
        date = (today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate());
        value = String(today.getFullYear()) + '-' + month + '-' + date;

        await GeneralJs.ajaxPromise("table=BC1_conlist&c=a9_proposal&st=a4_customernumber&i=" + info.cliid + "&v=" + valu, "/post_update");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "cancel":
      return_func = async function (e) {
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "delete":
      return_func = async function (e) {
        console.log(await GeneralJs.ajaxPromise("table=Project&st=proid&i=" + proid, "/post_mdelete"));
        mother.parentElement.remove();
        reset_event(this);
      }
      break;
  }
  return return_func;
}

ProposalJs.prototype.list_launching = async function () {
  const instance = this;
  let father = this.listPannel;
  while (father.firstChild) {father.removeChild(father.lastChild);}
  await this.list_initial();
  this.list_searchBar();
  this.list_leftBar();
  this.list_mainArea();
}


ProposalJs.prototype.load_initevent = function () {
  const instance = this;
  return function (e) {
    if (instance.toggleSetting.listCreate === 1) {
      let obj = JSON.parse(this.parentElement.querySelector("section").textContent);
      let button0 = document.getElementById("blewpp_button0");
      let button1 = document.getElementById("blewpp_button1");
      button1.children[0].style.color = "#59af89";
      button1.children[0].style.opacity = "";
      button0.children[0].style.color = "";
      button0.children[0].style.opacity = "0.4";
      let mother = instance.createPannel;
      let father = instance.listPannel;
      father.classList.add("listpp_fadeout");
      father.classList.remove("listpp_fadein");
      mother.classList.remove("listpp_fadeout");
      mother.classList.add("listpp_fadein");
      father.style.zIndex = "-1";
      instance.toggleSetting.listCreate = 0;

      ProposalJs.toggleTimeout.load_init = setTimeout(function () {
        father.style.display = "";
        father.style.transform = "";
        father.style.opacity = "";
        while (father.firstChild) {father.removeChild(father.lastChild);}
        let button2 = document.getElementById("blewpp_button2");
        let button3 = document.getElementById("blewpp_button3");
        button2.removeEventListener("click", ProposalJs.below_events.first.b2);
        button2.removeEventListener("click", ProposalJs.below_events.second.b2);
        button2.removeEventListener("click", ProposalJs.below_events.third.b2);
        button2.removeEventListener("click", ProposalJs.below_events.fourth.b2);
        console.log(obj);
        button3.setAttribute("cus_id", obj.proid);
        if (document.querySelector(".pp_designer_selected") === null) {
          instance.load_reset(obj);
        } else {
          instance.domBox.get("디자이너 선택").children[0].click();
          ProposalJs.toggleTimeout.load_init_in = setTimeout(function () {
            instance.load_reset(obj);
          }, 500);
        }
        instance.toggleSetting.listCreate = 0;
      }, 500);
    }
  }
}

ProposalJs.prototype.load_reset = function (obj = {}) {
  const instance = this;
  let inputs;

  //title reset
  if (document.getElementById("pp_title_sub_b") !== null) {
    document.getElementById("pp_title_sub_b").remove();
  }
  if (document.getElementById("pp_title2_sub_b") !== null) {
    document.getElementById("pp_title2_sub_b").remove();
  }
  inputs = this.domBox.get("고객 선택").querySelectorAll("input");
  for (let input of inputs) { input.checked = false; }
  inputs = this.domBox.get("서비스 선택").querySelectorAll("input");
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
    ProposalJs.toggleTimeout.load_zero = setTimeout(this.load_processLoad(obj), 500);
    clearTimeout(ProposalJs.toggleTimeout.load_init_in);
    clearTimeout(ProposalJs.toggleTimeout.load_init);
  }
}

ProposalJs.prototype.load_processLoad = function (obj) {
  let instance = this;
  console.log(obj);
  return function () {
    instance.toggleSetting.load = 1;
    instance.load_processLoad_first(obj);
    instance.load_processLoad_second(obj, instance.load_processLoad_third());
  }
}

ProposalJs.prototype.load_processLoad_first = function (obj) {
  clearTimeout(ProposalJs.toggleTimeout.load_zero);
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

ProposalJs.prototype.load_processLoad_second = function (obj, third) {
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
  ProposalJs.toggleTimeout.load_second = setTimeout(function () {
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
      instance.thirdChildren.get("box1_designerInput").setAttribute("value", String(obj.ProposalJs.length) + "명");
      instance.thirdChildren.get("box1_title").style.color = "#59af89";
      instance.thirdChildren.get("box1_designerInput").style.fontSize = "24px";
      instance.thirdChildren.get("box1_title").style.fontSize = "24px";
      instance.thirdChildren.get("box1").style.background = "white";
      instance.thirdChildren.get("box1").style.border = "1px solid #dddddd";
    }
    ProposalJs.toggleTimeout.load_third = setTimeout(function () {
      third(obj);
    }, 500);
  }, 550);
}

ProposalJs.prototype.load_processLoad_third = function () {
  let instance = this;
  return async function (obj) {
    clearTimeout(ProposalJs.toggleTimeout.load_third);
    clearTimeout(ProposalJs.toggleTimeout.load_second);
    for (let i = 0; i < 3; i++) {
      instance.thirdChildren.get("box" + String(i)).style.opacity = "0";
    }
    let num = Number(instance.thirdChildren.get("box1_designerInput").getAttribute("value").replace(/[^0-9]/g, ''));
    let setTimeout_func = await instance.fourthsetTimeout(num, obj);
    instance.toggleSetting.first = 1;
    instance.toggleSetting.second = 1;
    instance.toggleSetting.third = 1;
    instance.toggleSetting.fourth = 0;
    ProposalJs.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
  }
}

ProposalJs.save_init = async function (update = false) {
  const instance = this;
  let target, temp, temp2, standard_id;
  let temp_arr = [];
  let temp_num = 0;
  let result_obj = {}
  let full_string = '';

  if (!update) {

    // 0 make proid
    let proids = JSON.parse(await GeneralJs.ajaxPromise("collection=Project&find1={}&find2=" + JSON.stringify({ proid: 1 }), "/post_mfind"));
    let proid_box = [];
    for (let p of proids) {
      proid_box.push(p.proid.replace(/[^0-9]/g, ''));
    }
    proid_box.sort(function (a, b) { return b - a; });

    const today = new Date();
    let today_str = String(today.getFullYear()).slice(2) + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1));
    let new_num = 0;
    if (proid_box[0].slice(0,4) === today_str) {
      new_num = ((proid_box[0].slice(4).slice(0, 1) === '0') ? Number(proid_box[0].slice(5)) : Number(proid_box[0].slice(4))) + 1;
      result_obj.proid = 'p' + today_str + '_' + "aa" + ((new_num < 10) ? '0' + String(new_num) : String(new_num)) + 's';
    } else {
      result_obj.proid = 'p' + today_str + '_' + "aa" + "01" + 's';
    }

    // 0 default
    result_obj.desid = "";
    result_obj.status = "작성중";

    // 1 client
    target = instance.domBox.get("고객 선택").children[0];
    if (target.querySelector("#pp_title_sub_b") === null) {
      alert("고객을 선택해주세요!");
      return "fail";
    } else {
      target = target.querySelector("#pp_title_sub_b");
      result_obj.cliid = target.getAttribute("cus_id");
      result_obj.client = target.textContent.replace(/ : /g, '');
    }

  }

  // 2 service
  target = instance.domBox.get("서비스 선택").children[0];
  if (target.querySelector("#pp_title2_sub_b") === null) {
    alert("서비스를 선택해주세요!");
    return "fail";
  } else {
    target = target.querySelector("#pp_title2_sub_b");
    result_obj.service = target.getAttribute("cus_id");
  }

  // 3 details
  if (document.querySelectorAll('.pp_designer_selected').length === 0) {
    alert("디자이너를 선택해주세요!");
    return "fail";
  } else {
    temp = document.querySelectorAll('.pp_designer_selected');
    result_obj.proposal = new Array(temp.length);
    for (let i = 0; i < result_obj.ProposalJs.length; i++) {
      result_obj.proposal[i] = {}
      temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_designers_total");
      result_obj.proposal[i].desid = false;
      for (let input of temp2.querySelectorAll("input")) {
        if (input.checked) { result_obj.proposal[i].desid = input.value }
      }
      if (!result_obj.proposal[i].desid) {
        alert("디자이너를 선택해주세요!");
        return "fail";
      }

      temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_service_total");
      for (let input of temp2.querySelectorAll("input")) {
        if (input.checked) { temp_arr.push(input.value); }
      }
      if (temp_arr.length === 0) {
        alert("금액의 종류와 양을 정확히 선택해주세요!");
        return "fail";
      }
      temp_num = (temp_arr.indexOf("부분 공간") !== -1) ? temp_arr.length - 1 : temp_arr.length;
      result_obj.proposal[i].fee = new Array(temp_num);
      for (let f = 0; f < temp_num; f++) {
        result_obj.proposal[i].fee[f] = {}
        result_obj.proposal[i].fee[f].method = (temp_arr[f] === "오프라인") ? "offline" : "online";
        result_obj.proposal[i].fee[f].partial = (temp_arr.indexOf("부분 공간") !== -1) ? true : false;
        result_obj.proposal[i].fee[f].money = 0;
        temp2 = temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[f];
        if (temp2.querySelector(".pp_designer_selected_box_contents_money_text").textContent === temp_arr[f]) {
          result_obj.proposal[i].fee[f].money = Number(temp2.querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
        } else {
          if (f === 0) {
            result_obj.proposal[i].fee[f].money = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[1].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
          } else {
            result_obj.proposal[i].fee[f].money = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[0].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
          }
        }
      }
      temp_num = 0;
      temp_arr = [];

      if (temp[i].querySelector(".pp_designer_selected_box_value").textContent === "") {
        alert("사진을 선택해주세요!");
        return "fail";
      }
      if (document.querySelector('.pp_fifth_whitebox') !== null) {
        document.querySelector('.ppw_left_description_inbutton').click();
      }
      result_obj.proposal[i].picture_settings = GeneralJs.tagParsing(temp[i].querySelector(".pp_designer_selected_box_value").textContent);
    }
  }

  if (!update) {

    let month, date;
    month = (today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1);
    date = (today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate());

    await GeneralJs.ajaxPromise("table=BC1_conlist&c=a9_proposal&st=a4_customernumber&i=" + result_obj.cliid + "&v=" + (String(today.getFullYear()) + '-' + month + '-' + date), "/post_update");

    full_string = JSON.stringify(result_obj);
    await GeneralJs.ajaxPromise("collection=Project" + "&obj=" + GeneralJs.queryFilter(full_string), "/post_minsert");
  } else {
    standard_id = document.getElementById("blewpp_button3").getAttribute("cus_id");
    await GeneralJs.ajaxPromise("table=Project&st=proid&i=" + GeneralJs.queryFilter(standard_id) + "&c=service&v=" + GeneralJs.queryFilter(result_obj.service), "/post_mupdate");
    full_string = JSON.stringify(result_obj.proposal);
    await GeneralJs.ajaxPromise("table=Project&st=proid&i=" + GeneralJs.queryFilter(standard_id) + "&c=proposal&v=" + GeneralJs.queryFilter(full_string), "/post_mupdate");
  }

  if (document.querySelector(".pp_fifth_cancelback") !== null) {
    document.querySelector(".pp_fifth_cancelback").remove();
  }

  if (document.querySelector(".pp_fifth_whitebox") !== null) {
    document.querySelector(".pp_fifth_whitebox").remove();
  }

  document.querySelector('.blewpp_button_garim').click();
  console.log(result_obj);

  if (!update) {
    return "success";
  } else {
    return "update success";
  }
}

ProposalJs.prototype.cssInjection = function () {
  const css = `
  :root{
    --left-padding:190px;
    --main-marginbase:6px;
    --left-width:69.6vh;
  }

  label{cursor:pointer}
  article,section{margin:0;}
  @keyframes in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0px);}}
  @keyframes fa{from{opacity:0;}to{opacity:1;}}
  @keyframes flash{from,80%,to{opacity:0}30%,50%{opacity:0.85}}
  .hiddenp,.switch{display:none;}

  /* font-size */
  .columnobj,.rows,.columnobjinit,.rowinput,.slidenumber,.d_menu{font-family:'sandoll';font-size:14px;}
  .searchinput{font-size:14.5px;}
  .bleobj{font-size:14.3px;}
  .navititle{font-size:15.5px;}
  .navipara,.sortbox_item,.fiterbox_item{font-size:15px;}
  #savecancel,.periodinput,.periodp,.multiplebox_buttons{font-size:16px;}
  #calendar_text{font-size:35px;}
  .rowinputplus{font-size:28px;}
  #period_equal,#period_text{font-size:18.5px;}
  #multiplebox section{font-size:17px;}
  .cards{font-size:13px;}
  .cardtitle_main{font-size:47px;}
  .cardtitle_sub{font-size:23px;}
  #cardtitle_main_create{font-size:43px;}
  #cardtitle_sub_create,.picdiv{font-size:18px;}
  .piclabel{font-size:12px;}

  /* columns */
  .columns{position:sticky;top:0px;display:block;border-radius:5px;padding:58px 8px 2px calc(var(--left-padding) + 8px);z-index:1;background:#fff;transition:background 0s;}
  .columnobj{display:inline-block;position:relative;font-weight:700;vertical-align:top;text-align:center;margin:32px 0px 0px 8px;margin-left:2px;padding:8px 16px 6px 16px;min-height:24px;color:#2fa678;cursor:pointer;}

  /* total data */
  .data{position:relative;background:#fff;overflow-x:visible;overflow-y:scroll;padding-left:var(--left-padding);transition:background 0s;}
  .rowdiv{position:relative;display:block;margin:0px;margin-top:0px;padding:1px 2px 1px 8px;border-top:1px solid #e2e2e2;}
  .rows{display:inline-block;position:relative;margin:0px;margin-left:2px;font-weight:600;border-radius:4px;padding:7px 16px 6px 16px;vertical-align:top;text-align:center;min-height:22px;max-height:22px;overflow:hidden;letter-spacing:-0.2px;cursor:pointer;}
  .textrows{line-height:1.7;padding-top:5px;min-height:25px;max-height:25px;transition:all 0s;}
  .rowdiv_back,.rowdiv_init_back{display: block;position:absolute;z-index:0;background:transparent;transition:background 0s;}
  .rowdiv_back{width:100%;height:100%;top:0;left:0;opacity:0.6;padding:0px 0px 0px 8px;}
  .rowdiv_init_back{width:111.3%;height:38.4px;top:-1px;left:-20px;opacity:0.8;}
  .rows_back{display:inline-block;position:relative;margin:0px;margin-left:2px;border-radius:4px;padding:0px 16px 0px 16px;height:100%;}
  #coloringback_switch:checked ~ #rowmain > #initcolumn > #initcolumn_data > .rowdiv_init > .rowdiv_init_back,
  #coloringback_switch:checked ~ #rowmain > #totalcontents > #datadiv > .rowdiv > .rowdiv_back{z-index:1;}
  #coloringback_switch:checked ~ #rowmain > #totalcontents > #columns{z-index:2;}

  /* below & navi */
  #belowid{position:fixed;height:123px;text-align: center;bottom:0;width:calc(100% - 190px);left:190px;z-index:100;transform:translateY(0px)}
  .below2{position:relative;padding:20px;height:100%;transform: translateX(0px);width: calc(100vw - 230px);}
  .bletotal{display:inline-block;position:relative;overflow:hidden;border-radius:3px;}
  .bleobj{position:relative;color:#2fa678;margin:4px;margin-top:5px;font-family:'sandoll';font-weight:700;padding:5px 14px 6px 14px;background: linear-gradient(222deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%);border-radius:3px;}
  .blegarim{position:absolute;top:4px;left:4px;width:calc(100% - 8px);height:calc(100% - 8px);background:linear-gradient(222deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%);opacity:0;cursor:pointer;border-radius:5px;}
  .blegarim:hover{opacity:0.5;}
  #belowgreen_back{width:200%;background:linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%);}
  #belowyellow_back{width:200%;background:linear-gradient(43deg, rgba(221,221,221,0.9) 0%, rgba(236,236,236,0.9) 100%);}
  .circle{position:absolute;cursor:pointer;width:15px;height:15px;opacity:0.95;z-index:101;}
  .belowcircle{top:-20px;}.navicircle{right:11px;}
  #svgcirclegreen_b{right:7px;}#svgcircleyellow_b{right:25px;}#svgcirclered_b{right:43px;}#svgcirclegreen_n{top:51px;}#svgcircleyellow_n{top:33px;}#svgcirclered_n{top:15px;}

  /* initcolumn */
  #initcolumn{display:block;position:absolute;top:0;width:2480px;left:-2100px;height:7850px;background:#f7f7f7;z-index:3;opacity:0.87;box-shadow:1px 4px 7px -5px #aaaaaa;}
  #initcolumn_data{position:absolute;top:0;right:0;width:190px;padding-top:132px;}
  #initcolumn_column{position:absolute;bottom:-8px;right:0px;width:171px;height:100%;}
  #initcolumn_column_stikcy{position:sticky;top:0;width:100%;height:130px;background:#f7f7f7;z-index:3;}
  .rowdiv_init{position:relative;display:block;opacity:1;width:163px;left:17px;height:30px;margin:0px;margin-bottom:7px;font-family:'sandoll';color:#303030;font-weight:600;padding:1px 2px 1px 8px;cursor: pointer;}
  .rowdiv_init div{color:inherit;}
  .columnobjinit{right:0;display:inline-block;position:absolute;font-weight:700;transition:all 0s;min-height:24px;color:#2fa678;bottom:10px;cursor:pointer;}

  /* search bar */
  .searchbar{width:588px;position:fixed;height:80px;top:0;right:0px;z-index:1;background:#fff;transition:background 0s;overflow: visible;}
  .searchicon{width:560px;height:35px;right:28px;top:30px;position:absolute;mix-blend-mode:multiply;}
  .searchinput{position:absolute;top:29.5px;right:28px;width:548px;height:36px;outline:none;font-family:'sandoll';border:0;font-weight:500;background:transparent;color:#505050;letter-spacing:-0.2px;padding-bottom:4px;}

  /* ajax funcs general */
  #cancel_back{width:100%;height:100%;background:transparent;position:fixed;top:0px;left:0px;z-index:1;}


  @media (min-width:1632px) {
    #longtextbox{height:480px;}
    .bleobj{margin:3px;}
    .below2{padding: 24px;}
  }
  @media (min-width:1521px) and (max-width:1631px) {
    #longtextbox{height:380px;}
    .bleobj{font-size:14px;margin: 3px;margin-top: 3.4px;padding:4px 11px 4px 11px;}
    .below2{padding: 26px;}
    .navitotalgroup{margin-top:-332px;left:28px;}
    .navitalk{bottom:3.4%;left:28px;width:27px;}
  }
  @media (min-width:1460px) and (max-width:1520px) {
    #longtextbox{height:280px;}
    .bleobj{font-size:13px;margin: 3px;margin-top: 3.6px;padding:4px 9px 4px 9px;}
    .below2{padding: 27px;}
    .navitotalgroup{margin-top:-332px;left:28px;}
    .navitalk{bottom:3.4%;left:28px;width:27px;}
  }
  @media (max-width:1459px) {
    #longtextbox{height:280px;}
    .bleobj{font-size:13px;margin: 3px;margin-top: 2.2px;padding:4px 9px 4px 9px;}
    .below2{padding: 28px;}
    .navitotalgroup{margin-top:-332px;left:28px;}
    .navitalk{bottom:3.4%;left:28px;width:27px;}
  }

  #belowscroll{display:none;}
  #naviscroll{display:none;}

  #pp_secondprocess_box{cursor: pointer;}

  .pp_contents_inbox{
    display: block;
    text-align: center;
    height: calc(100% - 33px);
    position: relative;
    top: 16px;
    overflow: scroll;
  }
  .pp_contents_inbox::-webkit-scrollbar{display:none;}

  .pp_service{
    display: inline-flex;
    height: calc(calc(100% / 3) - 6px);
    width: calc(calc(100% / 4) - 5px);
    background: #dddddd;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
    position: relative;
  }

  .pp_service_wording{
    font-size: 1.2vh;
    font-weight: 600;
    color: #aaaaaa;
    position: absolute;
    margin-top: -1px;
  }

  .pp_clients_input{
    display: none;
  }
  .pp_clients_input:checked + div {
    background:#59af89;
  }
  .pp_clients_input:checked + div > div {
    color:white;
  }

  .pp_clients_label{
    cursor: pointer;
  }
  .garim{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .pp_clients{
    font-size:1.3vh;
    font-weight:600;
    display:inline-block;
    padding:15px;
    padding-top:6px;
    padding-bottom:8px;
    background:white;
    margin:3px;
    border-radius:5px;
    box-sizing: border-box;
    position: relative;
  }

  .pp_clients div{
    font-size:inherit;
    transition:all 0.3s ease;
  }

  .pp_designer{
    width: calc(calc(100% / 3) - calc(calc(5px * 2) / 3));
    height: calc(100% - 20px);
    margin-top: 10px;
    background: #dddddd;
    display: inline-flex;
    border-radius: 5px;
    margin-right: 5px;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing:border-box;
  }

  .pp_designer_selected{
    display: inline-block;
    height:100%;
    box-sizing: border-box;
  }

  .pp_contents_inbox > .pp_designer:nth-child(3) {
    margin-right: 0px;
  }

  @keyframes pp_designer_question_ani {
    from,50% {transform: translateY(0px);}
    to {transform: translateY(-23px);}
  }
  .pp_designer_question{
    top: calc(50% - 19px);
    position: absolute;
    width: 100%;
    display: block;
    font-size: 19px;
  }
  .pp_designer_question_add{
    animation: pp_designer_question_ani 1.8s ease forwards;
  }
  .pp_designer_question_remove{
    animation: pp_designer_question_ani 1.8s ease forwards reverse;
  }

  .pp_designer_question > div:nth-child(1){
    font-size: inherit;
    font-weight: 200;
    color:#aaaaaa;
    display: inline-block;
    margin-left: 7px;
  }

  #pp_designer_question_input{
    margin: 0;
    width: 43px;
    margin-left: 5px;
    font-size: inherit;
    font-weight: 600;
    color:#aaaaaa;
    outline: 0;
    border: 0;
    background: transparent;
  }

  @keyframes press_fadein { from,75% {opacity: 0} to {opacity: 1} }
  .pp_designer_question_press{
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #cccccc;
    margin-top: 3px;
    opacity: 0;
  }
  .pp_designer_question_press_add{
    animation: press_fadein 2.5s ease forwards;
  }
  .pp_designer_question_press_remove{
    animation: press_fadein 2.5s ease forwards reverse;
  }

  .pp_designer_selected_box{
    margin: 25px;
    margin-top: 16px;
    margin-bottom: 0;
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(1){
    margin-top: 34px;
  }
  .pp_designer_selected_box_value{
    display:none;
  }

  .pp_designer_selected_box_title{
    font-size: 14px;
    font-weight: 600;
    color:#606060;
  }

  .pp_designer_selected_box_contents{
    margin-top:5px;
    background: #f2f2f2;
    border-radius: 5px;
    height:calc(100% - 24px);
    box-sizing: border-box;
  }

  .pp_designer_selected > .pp_designer_selected_box:nth-child(1){
    height:calc(calc(100% - 116px) * 0.42);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(2){
    height:calc(calc(100% - 116px) * 0.16);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(3){
    height:calc(calc(100% - 116px) * 0.16);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(4){
    height:calc(calc(100% - 116px) * 0.26);
  }

  .pp_designer_selected_box_contents_designers_total,.pp_designer_selected_box_contents_service_total{
    display: block;
    width: calc(100% - 40px);
    height: calc(100% - 25%);
    margin-left: 20px;
    overflow: scroll;
    flex-wrap: wrap;
    position: relative;
    top: 12%;
    border-bottom: 1px solid #dddddd;
    text-align: center;
    box-sizing: border-box;
  }
  .pp_designer_selected_box_contents_designers_total::-webkit-scrollbar{display:none;}

  .pp_designer_selected_box_contents_designers,.pp_designer_selected_box_contents_service{
    font-size: 1.2vh;
    font-weight: 600;
    display: inline-flex;
    padding: 13px;
    padding-top: 4px;
    padding-bottom: 5px;
    height: 16px;
    background: white;
    margin: 2px;
    margin-top: 2px;
    border-radius: 5px;
    position: relative;
  }

  .pp_designer_selected_box_contents_designers_input:checked + .pp_designer_selected_box_contents_designers{
    background: #59af89;
    color:white;
  }

  .pp_designer_selected_box_contents_service_total{
    border: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  .pp_designer_selected_box_contents_service{
    font-size: 1.4vh;
    background: transparent;
    padding-top: 0;
    position: relative;
    display: inline-block;
    text-align: initial;
    overflow: visible;
    padding-left:0.5vw;
    padding-right:0.5vw;
  }

  .pp_designer_selected_box_contents_service_input:checked + .pp_designer_selected_box_contents_service{
    color:#59af89;
  }

  .pp_designer_selected_box_contents_service_input:checked + .pp_designer_selected_box_contents_service > .pp_designer_selected_box_contents_service_won{
    background: #59af89;
  }

  .pp_designer_selected_box_contents_service_won{
    position: absolute;
    width: 6px;
    height: 6px;
    background: #bbbbbb;
    border-radius: 10px;
    top: calc(50% - 3px);
    left: -2px;
  }

  .pp_designer_selected_box_contents_money{
    font-size: 1.4vh;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .pp_designer_selected_box_contents_money_text,.pp_designer_selected_box_contents_money_text2{
    font-size: inherit;
    display: inline-block;
    font-weight: 700;
    color: #606060;
    padding-bottom: 3px;
  }

  .pp_designer_selected_box_contents_money_input{
    font-size: inherit;
    display: inline-block;
    position: relative;
    margin-right: 2px;
    border: 0;
    color: #59af89;
    font-weight: 600;
    outline: 0;
    background: transparent;
    text-align: end;
    transition: width 0.1s linear;
  }

  .pp_designer_selected_box_contents_money_set{
    font-size: inherit;
    position: relative;
    margin-left: 6px;
    margin-right: 6px;
  }

  .pp_designer_selected_box_contents_selection{
    font-size: 1.1vw;
    display: flex;
    font-weight: 300;
    color: #aaaaaa;
    width: 100%;
    height: 87%;
    justify-content: center;
    align-items: center;
    cursor:pointer;
  }

  @keyframes cancelback_fadein { from,10% {opacity: 0} to {opacity: 0.15} }
  .pp_fifth_cancelback{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background: black;
    opacity: 0;
    animation: cancelback_fadein 1s ease forwards;
  }

  @keyframes whitebox_fadein { from,10% {opacity: 0;transform: translateY(20px);} 90%,to {opacity: 1;transform: translateY(0px);} }
  .pp_fifth_whitebox{
    display: block;
    position: absolute;
    width: calc(100% - 96px);
    height: calc(100% - 120px);
    background: white;
    border-radius: 9px;
    box-shadow: rgb(128,128,128) 0px 3px 8px -5px;
    opacity:0;
    transform: translateY(20px);
    animation: whitebox_fadein 0.6s ease forwards;
  }

  .ppw_leftbox{
    display: inline-block;
    width: var(--left-width);
    height: calc(100% - 66px);
    position: relative;
    margin: 32px;
    margin-top: 33px;
    border: 1px solid #ececec;
    border-radius: 7px;
    overflow: scroll;
  }
  .ppw_leftbox::-webkit-scrollbar{display:none;}

  .ppw_left_title{
    display: block;
    height: 2.9vh;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    margin-left: 22px;
    margin-bottom: 1.2vh;
    top: 3vh;
    position: relative;

  }

  .ppw_left_picturebox{
    display: block;
    height: 73.35%;
    background: transparent;
  }

  .ppw_left_picturebox_inbox{
    width: calc(100% - 42px);
    height: 91.45%;
    overflow: visible;
    position: relative;
    top: 21px;
    left: 21px;
  }

  .ppw_left_picturebox_inbox_detail{
    background: silver;
    border-radius: 5px;
    display: inline-block;
    position: absolute;
    background-position: 50% 50%;
    background-size: 101% 101%;
    cursor:pointer;
    opacity: 1;
    transition: width 0s;
  }

  .ppw_left_picturebox_inbox_detail:hover{
    opacity: 0.8;
  }

  .ppw_left_description{
    height: calc(93.6% - 490px);
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .ppw_left_description_inbox{
    position: absolute;
    bottom: 3.2vh;
    left: 21px;
    width: calc(100% - 42px);
    overflow: scroll;
  }

  .ppw_left_description_inbox::-webkit-scrollbar{display:none;}

  .ppw_left_description_inbox_detail{
    height: 2.4vh;
    font-size: 16px;
    font-weight: 700;
    position: relative;
  }

  .ppw_left_description_inbox_input{
    display: block;
    height: 25%;
    width: 100%;
    margin: 0;
    border: 0;
    font-size: 1.38vh;
    outline: 0;
    margin-top: 0.7vh;
    word-spacing: -0.3px;
    letter-spacing: -0.2px;
    font-weight: 500;
  }

  .ppw_left_description_inbutton{
    position: absolute;
    right: 21px;
    bottom: 3.2vh;
    width: 54px;
    height: 28px;
    background: #59af89;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    padding-bottom: 3px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .ppw_left_description_inbutton:hover{
    color: #bddfd0;
  }

  .ppw_rightbox{
    display: inline-block;
    width: calc(100% - var(--left-width) - 82px);
    height: calc(100% - 66px);
    position: absolute;
    border: 1px solid #ececec;
    border-left: 0;
    border-radius: 7px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    overflow: scroll;
    top: 33px;
    right: 33px;
    box-sizing: border-box;
  }

  .ppw_rightbox::-webkit-scrollbar{display:none;}

  .ppw_right_totalbox{
    position: relative;
    display: block;
    top: 3.2vh;
    left: 7px;
    width: calc(100% - 7px);
    overflow: hidden;
  }

  .ppw_right_totalbox::-webkit-scrollbar{display:none;}

  .ppw_right_set{
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    position: relative;
  }
  .ppw_right_set::-webkit-scrollbar{display:none;}
  .ppw_right_title{
    font-size: inherit;
  }

  .ppw_right_picturebox{
    height: 184px;
    background: #f2f2f2;
    margin-top: 1.3%;
    margin-bottom: 2.9%;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    position: relative;
    overflow: scroll;
  }
  .ppw_right_picturebox::-webkit-scrollbar{display:none;}

  .ppw_right_picturebox_scroll{
    height:100%;
    position: relative;
    padding-right:12px;
  }

  .ppw_right_picturebox_s, .ppw_right_picturebox_g{
    position: relative;
    height: calc(100% - 24px);
    margin: 12px;
    margin-right: 0;
    display: inline-block;
    border-radius: 3px;
    overflow: hidden;
  }

  .ppw_right_picturebox_s{
    width: 113px;
  }

  .ppw_right_picturebox_g{width: 226px;}

  .ppw_right_picturebox_img{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    cursor: pointer;
    border-radius: 3px;
    opacity:1;
  }
  .ppw_right_picturebox_img:hover{opacity:0.6;}

  .ppw_right_buttonup{
    position: absolute;
    display: block;
    top: 3.5px;
    right: 11px;
    width: 33px;
    height: 12px;
  }
  .ppw_right_buttonup_img_left,.ppw_right_buttonup_img_right{
    position: absolute;
    width: 44%;
    height: 100%;
  }
  .ppw_right_buttonup_img_left{
    left: 0;
  }
  .ppw_right_buttonup_img_right{
    right: 0;
  }
  .ppw_right_buttonup_div_left,.ppw_right_buttonup_div_right{
    position: absolute;
    height: 100%;
    width: 50%;
    top: 0;
    background: white;
    opacity: 0;
    cursor: pointer;
  }
  .ppw_right_buttonup_div_left:hover,.ppw_right_buttonup_div_right:hover{
    opacity:0.4;
  }
  .ppw_right_buttonup_div_left{
    left: 0;
  }
  .ppw_right_buttonup_div_right{
    right: 0;
  }

  @keyframes blewpp_button_fadein { from,10% {opacity: 0;transform: translateY(10px);} 90%,to {opacity: 1;transform: translateY(0px);} }
  .blewpp_button{
    cursor: pointer;
    position: absolute;
    background: white;
    border-radius: 9px;
    top: 37px;
    animation: blewpp_button_fadein 1s ease forwards;
    transition: width 0s;
    height: 38px;
  }

  .blewpp_button_text{
    font-size: 14px;
    font-weight: 600;
    transition: width 0s;
    position: absolute;
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .blewpp_input{
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    font-size: 29px;
    font-weight: 100;
    height: 99px;
    color: white;
    outline: 0;
    border: 0;
    background: transparent;
    text-align: center;
  }

  .blewpp_input::placeholder {
    color: white;
    opacity: 0.7;
  }

  .blewpp_button_garim,.blewpp_number_garim{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #belowgreen{
    position: relative;
    height: 100%;
    transform: translateX(0px);
    padding:0;
    margin:0;
    width:100%;
  }

  @keyframes blewpp_numberbar_total_fadein { from,50% {opacity: 0;} to {opacity: 1;} }
  .blewpp_numberbar_total{
    width: 310px;
    opacity: 0;
    margin-right: auto;
    margin-left: auto;
    padding-top: 17px;
    position: relative;
    animation: blewpp_numberbar_total_fadein 1.2s ease forwards;
  }
  @media (max-width:1100px) {
    .blewpp_numberbar_total{display: none;}
  }
  .blewpp_bar{
    position: absolute;
    border-bottom: 1px solid #83cea7;
    height: 0;
    top: 53px;
    animation: blewpp_numberbar_total_fadein 1.6s ease forwards;
  }

  .blewpp_barleft{
    width: calc(50% - 436px);
    left: 311px;
  }
  .blewpp_barright{
    width: calc(50% - 457px);
    right: 324px;
  }

  @media (max-width:1600px) {

  .blewpp_barright,.blewpp_barleft{
    display:none;
  }

  }

  .blewpp_fifthevent_box{
    cursor: pointer;
    animation: blewpp_button_fadein 0.5s ease forwards;
    position: absolute;
    right: 173px;
    width: 92px;
    padding: 11px;
    padding-top: 8px;
    padding-right: 17px;
    padding-left: 17px;
    background: #f7f7f7;
    box-shadow: rgb(128,128,128) 1px 4px 7px -5px;
    border-radius: 9px;
    font-size: 15px;
    font-weight: 200;
    color: #808080;
    text-align: center;
    z-index: 3;
  }

  .blewpp_fifthevent_box:hover{
    color: #59af89;
    background: #fbfbfb;
  }

  #blewpp_fifthevent_cancelbox{
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .listpp_searchBar{
    width: 588px;
    position: fixed;
    height: 80px;
    top: 0px;
    right: 0px;
    z-index: 1;
    background: #fff;
    transition: background 0s;
    overflow: visible;
  }

  .listpp_searchBar_img{
    width: 560px;
    height: 35px;
    right: 28px;
    top: 30px;
    position: absolute;
    mix-blend-mode: multiply;
  }

  .listpp_searchBar_input{
    position: absolute;
    top: 29.5px;
    right: 28px;
    width: 548px;
    height: 36px;
    outline: none;
    font-family: 'sandoll';
    border: 0;
    font-weight: 500;
    background: transparent;
    color: #505050;
    letter-spacing: -0.2px;
    padding-bottom: 3px;
    font-size:14.5px;
  }


  .listpp_leftBar{
    display: block;
    position: absolute;
    top: 0px;
    width: 190px;
    left: 0px;
    height: 100%;
    background: #f7f7f7;
    z-index: 3;
    opacity: 0.87;
    box-shadow: 1px 4px 7px -5px #aaaaaa;
  }

  .listpp_leftBar_totalbox{
    position: absolute;
    top: 116px;
    left: 14%;
    width: 72%;
    height: calc(100% - 116px);
    overflow: scroll;
  }
  .listpp_leftBar_totalbox::-webkit-scrollbar{display:none;}

  .listpp_leftBar_detail_id,.listpp_leftBar_detail,.listpp_leftBar_detail_num{
    height: 25px;
    font-size: 14px;
    margin-bottom: 9px;
    display: inline-block;
    top: 0;
    position: relative;
  }

  .listpp_leftBar_detail_id{
    width: 32%;
    font-weight: 200;
    margin-left: 3%;
  }

  .listpp_leftBar_detail{
    width: 31%;
    font-weight: 600;
    margin-left: 2%;
  }

  .listpp_leftBar_detail_num{
    width: 30%;
    font-weight: 500;
    text-align: end;
    top:-1px;
  }

  .listpp_leftBar_detail_bar{
    position: absolute;
    top: 8px;
    left: 70%;
    width: 12%;
    border-bottom: 1px solid #dddddd;
  }

  .listpp_mainArea{
    position: relative;
    top: 106px;
    left: 228px;
    width: calc(100% - 244px);
    height: calc(100% - 104px);
    overflow: scroll;
  }
  .listpp_mainArea::-webkit-scrollbar{display:none;}

  .listpp_mainArea_tong{
    display: block;
    width:100%;
    height: 34px;
    margin-bottom: 8px;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    position: relative;
  }

  .listpp_mainArea_tong_id{
    font-size: 14px;
    font-weight: 200;
    left: 1px;
    display: inline-block;
    width: 86px;
    position: absolute;
    top: 6px;
    color: #59af89;
  }

  .listpp_mainArea_tong_name{
    font-size: 14px;
    display: inline-block;
    font-weight: 600;
    padding-top: 3px;
    position: absolute;
    margin-left: 4px;
    width: 39px;
    top: 3.2px;
    left: 86px;
  }
  .listpp_mainArea_tong_name:hover{
    opacity:0.5;
  }


  .listpp_mainArea_tong_details{
    display: inline-block;
    font-size: 13px;
    position: absolute;
    top: 0px;
    background: #f7f7f7;
    height: calc(100% - 5px);
    width: calc(100% - 248px);
    padding-left: 11px;
    padding-top: 4px;
    border-radius: 5px;
    overflow: scroll;
    font-weight: 300;
    right: 98px;
    line-height: 1.7;
  }
  .listpp_mainArea_tong_details:hover{
    opacity:0.5;
  }


  .listpp_mainArea_tong_details > b {
    margin-left: 2px;
    margin-right: 2px;
    opacity: 0.8;
  }

  .listpp_mainArea_tong_progress{
    display: inline-block;
    font-size: 13px;
    width: 76px;
    font-weight: 600;
    height: 100%;
    position: absolute;
    right: 13px;
    border: 1px solid #ececec;
    text-align: center;
    box-sizing: border-box;
    top: 0px;
    padding-top: 6px;
    border-radius: 5px;
  }

  @keyframes listpp_menu_ani {
    from {opacity:0;transform:translateY(-10px);}
    to {opacity:1;transform:translateY(0px);}
  }
  .listpp_menu{
    position: absolute;
    right: 7px;
    top: 38px;
    width: 81px;
    height: 184px;
    background: white;
    z-index: 2;
    border-radius: 5px;
    display: block;
    box-shadow: rgb(128,128,128) 0px 3px 8px -5px;
    animation: listpp_menu_ani 0.3s ease forwards;
  }
  .listpp_menu_cancelback{
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    background: silver;
    opacity: 0.3;
  }
  .listpp_menuEvent{
    font-size: 13px;
    text-align: center;
    font-weight: 600;
    letter-spacing: -0.2px;
    word-spacing: -0.5px;
    margin-top: 5px;
    color:#505050;

  }
  .listpp_menuEvent:hover{
    color:#59af89;
  }
  .listpp_menuEvent_pending{
    margin-top: 13px;
  }

  .listpp_menuEvent_delete{
    color:indianred;
  }
  @keyframes listpp_fadein_ani {
    from {opacity: 0;transform: translateX(-20px);}
    90% {opacity: 1;transform: translateX(0px);}
    to {opacity: 1;transform: translateX(0px);}
  }
  .listpp_fadein {
    opacity: 0;
    display: block;
    transform: translateX(-20px);
    animation: listpp_fadein_ani 0.5s ease forwards;
  }
  @keyframes listpp_fadeout_ani {
    from {opacity: 1;transform: translateX(0px);display: block;}
    90% {opacity: 0;transform: translateX(-20px);display: block;}
    to {opacity: 0;transform: translateX(-20px);display: none;}
  }
  .listpp_fadeout {
    opacity: 1;
    display: block;
    transform: translateX(0px);
    animation: listpp_fadeout_ani 0.5s ease forwards;
  }

  `;
  document.querySelector("style").insertAdjacentHTML("beforeend", css);
}

ProposalJs.prototype.launching = async function (query = {}) {
  try {
    this.cssInjection();
    this.totalInitial();
    this.domBox = await this.firstProcess();
    this.thirdChildren = await this.thirdProcess();
    await this.secondProcess();

    if (query.proid !== undefined) {
      //query load start
      let proid = query["proid"];
      if (proid.length === 11 && /_/g.test(proid)) {
        //query load
        this.toggleSetting.listCreate = 1;
        let proposal_list_raw = JSON.parse(await GeneralJs.ajaxPromise('collection=Project&find1=' + JSON.stringify({ proid: proid }) + '&find2={}', '/post_mfind'));
        (this.load_initevent()).call({
          parentElement: {
            querySelector: function (str) {
              return {
                textContent: JSON.stringify(proposal_list_raw[0]),
              }
            }
          }
        }, {});
      }
      //query load end
    }
  } catch (e) {
    console.log(e);
  }
}
