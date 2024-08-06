const ProposalJs = function () {
  this.mother = new GeneralJs();
  this.grandmother = document.getElementById("totalcontents");
  this.totalContents = document.getElementById("totalcontents");
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
  this.listSearchInput = null;
  this.designers = [];
  this.client = null;
  this.cliid = null;
  this.serid = null;
  this.xValue = null;
  this.ea = "px";
  this.clickTargets = [];
}

Set.prototype.intersection = function (setB) {
  let intersection = new Set();
  for (let elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

Set.prototype.union = function (setB) {
  let union = new Set(this);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
}

ProposalJs.designerFee = new Map();

ProposalJs.feeKeyMaker = function (desid, cliid, serid, xValue) {
  if (typeof desid !== "string" || typeof cliid !== "string" || typeof serid !== "string" || typeof xValue !== "string") {
    throw new Error("input must be desid, cliid, serid, xValue");
  }
  if (/\_/gi.test(serid)) {
    if (serid.split('_').length !== 2) {
      throw new Error("invaild serid");
    }
    serid = serid.split('_')[1].replace(/[^0-9]/gi, '');
  } else {
    serid = serid.replace(/[^0-9]/gi, '');
  }
  for (let i = 0; i < 10; i++) {
    serid = serid.replace(/^0/, '');
  }
  serid = String(Number(serid));
  const token = "__split__";
  return `${desid}${token}${cliid}${token}${serid}${token}${xValue}`;
}

ProposalJs.prototype.totalInitial = function () {
  const instance = this;
  const { ea, totalContents } = this;
  const { belowHeight } = this.mother;
  const { createNode, withOut, colorChip, returnGet, ajaxJson, equalJson, isMac, blankHref } = GeneralJs;
  const getObj = returnGet();
  const vh = "vh";
  let style;
  let outerMargin;

  outerMargin = 40;

  //total contents
  style = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - " + String(getObj.dataonly === "true" ? 0 : belowHeight) + ea + ")",
    overflow: "hidden",
  };
  for (let i in style) {
    totalContents.style[i] = style[i];
  }

  //total create pannel
  this.createPannel = createNode({
    mother: totalContents,
    style: {
      position: "relative",
      display: "block",
      width: withOut(outerMargin * 2, ea),
      height: withOut(outerMargin * 2, ea),
    }
  });

  //total list pannel
  this.listPannel = createNode({
    mother: totalContents,
    style: {
      display: (getObj.dataonly === "true" && getObj.entire === "true") ? "none" : "block",
      position: "absolute",
      zIndex: String(-1),
      width: "100%",
      height: "100%",
      top: String(0) + ea,
      left: String(0) + ea,
    }
  });

  //entire mode
  if (getObj.dataonly === "true" && getObj.entire === "true") {

    createNode({
      mother: totalContents,
      style: {
        position: "absolute",
        top: String(outerMargin) + ea,
        right: String(outerMargin) + ea,
        display: "flex",
        flexDirection: "row",
      },
      children: [
        {
          class: [ "hoverDefault_lite" ],
          event: {
            click: async function (e) {
              try {
                if (instance.client !== null) {
                  const { cliid } = instance.client;
                  globalThis.window.parent.postMessage(JSON.stringify({
                    cliid: cliid,
                    mode: "reset",
                  }), "*");
                } else {
                  window.alert("로딩을 기다렸다가 잠시 후에 시도해주세요!");
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(3.2) + vh,
            paddingLeft: String(1.3) + vh,
            paddingRight: String(1.3) + vh,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: String(0.4) + vh,
          },
          child: {
            text: "되돌아가기",
            style: {
              fontSize: String(1.26) + vh,
              fontWeight: String(700),
              color: colorChip.white,
              position: "relative",
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
        {
          class: [ "hoverDefault_lite" ],
          event: {
            click: async function (e) {
              try {
                if (instance.client !== null) {
                  const { cliid } = instance.client;
                  const projects = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getProjects", { equal: true });
                  let thisProject;
                  projects.sort((a, b) => {
                    return b.proposal.date.valueOf() - a.proposal.date.valueOf();
                  })
                  if (projects.length > 0) {
                    [ thisProject ] = projects;
                    blankHref(FRONTHOST + "/proposal.php?proid=" + thisProject.proid + "&mode=test&update=true");
                  } else {
                    window.alert("제안서를 우선 만들어 주세요!");
                  }
                } else {
                  window.alert("로딩을 기다렸다가 잠시 후에 시도해주세요!");
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(3.2) + vh,
            paddingLeft: String(1.3) + vh,
            paddingRight: String(1.3) + vh,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: String(0.4) + vh,
          },
          child: {
            text: "미리보기",
            style: {
              fontSize: String(1.26) + vh,
              fontWeight: String(700),
              color: colorChip.white,
              position: "relative",
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
        {
          class: [ "hoverDefault_lite" ],
          event: {
            click: async function (e) {
              try {
                if (instance.client !== null) {
                  const { cliid } = instance.client;
                  const projects = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getProjects", { equal: true });
                  let thisProject;
                  projects.sort((a, b) => {
                    return b.proposal.date.valueOf() - a.proposal.date.valueOf();
                  })
                  if (projects.length > 0) {
                    [ thisProject ] = projects;
                    if (window.confirm("업데이트는 하셨나요? 업데이트를 반드시 먼저 하셔야 합니다!")) {
                      if (window.confirm("추천서를 발송할까요?")) {
                        await ajaxJson({
                          instant: true,
                          proid: thisProject.proid,
                        }, "/createProposalDocument");
                        window.alert(`추천서가 발송되었습니다!`);
                      }
                    }
                  } else {
                    window.alert("제안서를 우선 만들어 주세요!");
                  }
                } else {
                  window.alert("로딩을 기다렸다가 잠시 후에 시도해주세요!");
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(3.2) + vh,
            paddingLeft: String(1.3) + vh,
            paddingRight: String(1.3) + vh,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: String(0.4) + vh,
          },
          child: {
            text: "추천서 전송",
            style: {
              fontSize: String(1.26) + vh,
              fontWeight: String(700),
              color: colorChip.white,
              position: "relative",
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
        {
          class: [ "hoverDefault_lite" ],
          event: {
            click: function (e) {
              if (instance.nothing === 0) {
                ProposalJs.below_events.update.call(this, e);
              } else {
                ProposalJs.below_events.save.call(this, e);
              }
            },
          },
          style: {
            display: "inline-flex",
            position: "relative",
            height: String(3.2) + vh,
            paddingLeft: String(1.3) + vh,
            paddingRight: String(1.3) + vh,
            borderRadius: String(5) + "px",
            background: colorChip.gradientGray,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "업데이트",
            style: {
              fontSize: String(1.26) + vh,
              fontWeight: String(700),
              color: colorChip.white,
              position: "relative",
              top: String(isMac() ? -1 : 1) + ea,
            }
          }
        },
      ]
    })

  }

}

ProposalJs.prototype.toggleSetting = {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0,
  listCreate: 0,
  load: 0,
};

ProposalJs.below_events = {
  save: async function (e) {
    const result = await ProposalJs.save_init(false);
    if (/success/gi.test(result)) {
      const removetargets = document.querySelectorAll(".saveLoading");
      for (let dom of removetargets) {
        document.body.removeChild(dom);
      }
      if (GeneralJs.returnGet().dataonly === "true") {
        window.location.href = window.location.protocol + "//" + window.location.host + "/proposal?dataonly=" + GeneralJs.returnGet().dataonly + "&entire=" + GeneralJs.returnGet().entire + "&cliid=" + GeneralJs.returnGet().cliid;
      }
    }
  },
  update: async function (e) {
    const result = await ProposalJs.save_init(true);
    if (/success/gi.test(result)) {
      const removetargets = document.querySelectorAll(".saveLoading");
      for (let dom of removetargets) {
        document.body.removeChild(dom);
      }
      if (GeneralJs.returnGet().dataonly === "true") {
        window.location.href = window.location.protocol + "//" + window.location.host + "/proposal?dataonly=" + GeneralJs.returnGet().dataonly + "&entire=" + GeneralJs.returnGet().entire + "&cliid=" + GeneralJs.returnGet().cliid;
      }
    }
  },
  search: {
    client: function (e) {
      if (e.key === "Enter" || e.code === "Space") {
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
      if (e.key === "Enter" || e.code === "Space") {
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
        for (let j of temp) {
          if (j.checked) {
            key++;
            keyBoo.unshift(true);
          }
        }
        if (!keyBoo[0]) {
          break;
        }
      }
      e.preventDefault();
      if (e.key === "Enter" || e.code === "Space") {
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
      } else if (e.key === "Backspace" && this.value === '') {
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
      const mother = this;
      const designer = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_designer");
      const desid = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_desid");
      const result = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&where=" + JSON.stringify({ desid: desid }), "/getDesigners"));
      try {
        const loop_initial = 10;
        const loop_margin = 37;
        const loop_order = [ "s0", "s1", "s2", "s3", "s4" ];
        let loop_css = new Array(loop_order.length);
        for (let i = 0; i < loop_order.length; i++) {
          loop_css[i] = loop_initial + (loop_margin * i);
        }
        let div, cancel, div_clone;
        let click_event, contextmenu_event;
        let ea = "px";

        div = document.createElement("DIV");
        div.classList.add("blewpp_fifthevent_box");

        cancel = document.createElement("DIV");
        cancel.id = "blewpp_fifthevent_cancelbox";

        click_event = async function (e) {
          const today = new Date();
          try {
            let this_order;
            let new_name;
            let obj;
            let pictures, descriptions;
            let targetBoxes;
            let general_str;
            let targets;

            if (this.id !== "blewpp_fifthevent_cancelbox") {

              //general
              this_order = Number(this.getAttribute("cus_order").replace(/^s/g, ''));

              //name
              new_name = document.getElementById("pp_title_sub_b").textContent.replace(/:/g, '').replace(/ /g, '') + ' ' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1));
              result[0].setting.proposal[this_order].name = new_name;

              //value
              obj = [];
              pictures = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
              descriptions = document.querySelectorAll(".ppw_left_description_inbox_input");
              targetBoxes = document.querySelectorAll(".pp_designer_selected");
              general_str = '';
              for (let pic of pictures) {
                general_str += pic.getAttribute("cus_info") + "__split1__" + "styleText" + "__split2__" + pic.style.cssText.replace((new RegExp(S3HOST, "gi")), '') + "__split3__";
              }
              general_str = general_str.slice(0, -10);

              result[0].setting.proposal[this_order].photo = GeneralJs.tagParsing(general_str);

              for (let i = 0; i < descriptions.length; i++) {
                obj.push(descriptions[i].value);
              }

              result[0].setting.proposal[this_order].description = obj;

              await GeneralJs.ajaxJson({
                whereQuery: { desid },
                updateQuery: {
                  "setting.proposal": result[0].setting.proposal
                }
              }, "/rawUpdateDesigner");
            }

            //remove
            targets = document.querySelectorAll(".blewpp_fifthevent_box");
            for (let node of targets) {
              node.remove();
            }
            document.getElementById("blewpp_fifthevent_cancelbox").remove();
            mother.addEventListener("click", fifth_click_button2, { once: true });

          } catch (e) {
            GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
            console.log(e);
          }
        }

        contextmenu_event = async function (e) {
          let this_order;
          let descriptions, default_setting;
          let pictureBox;
          let descriptionBox, descriptionBox_inputs;
          let targets;
          try {

            if (e.cancelable) {
              e.preventDefault();
            }

            if (this.id !== "blewpp_fifthevent_cancelbox") {

              //general
              this_order = Number(this.getAttribute("cus_order").replace(/^s/g, ''));

              // Default 0
              descriptions = result[0].setting.proposal[this_order].description;
              default_setting = result[0].setting.proposal[this_order].photo;

              pictureBox = document.querySelector(".ppw_left_picturebox");
              while (pictureBox.firstChild) {
                pictureBox.removeChild(pictureBox.lastChild);
              }
              const picturebox_make = function (dom) {
                const div = document.createElement("DIV");
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
                  if (/url/.test(default_setting[i].styleText)) {
                    div_clone.style.cssText = default_setting[i].styleText.replace(/url\(\"/gi, "url(\"" + S3HOST);
                  } else {
                    div_clone.style.cssText = default_setting[i].styleText;
                  }
                  inbox.appendChild(div_clone);
                }
                dom.appendChild(inbox);
              }
              picturebox_make(pictureBox);

              ProposalJs.fifthDrag(".fifth_drag_img");

              descriptionBox = document.querySelector(".ppw_left_description");
              descriptionBox_inputs = descriptionBox.querySelectorAll("input");
              for (let i = 0; i < descriptionBox_inputs.length; i++) {
                descriptionBox_inputs[i].value = descriptions[i];
              }
            }

            //remove
            targets = document.querySelectorAll(".blewpp_fifthevent_box");
            for (let node of targets) {
              node.remove();
            }
            document.getElementById("blewpp_fifthevent_cancelbox").remove();
            mother.addEventListener("click", fifth_click_button2, { once: true });

          } catch (e) {
            GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
            console.log(e);
          }
        }

        cancel.addEventListener("click", click_event, { once: true });
        cancel.addEventListener("contextmenu", contextmenu_event, { once: true });

        this.parentElement.appendChild(cancel);

        for (let i = 0; i < loop_css.length; i++) {
          div_clone = div.cloneNode(true);
          div_clone.style.top = String(loop_css[i] * -1) + ea;
          div_clone.textContent = result[0].setting.proposal[i].name;
          div_clone.setAttribute("cus_order", loop_order[i]);
          div_clone.addEventListener("click", click_event, { once: true });
          div_clone.addEventListener("contextmenu", contextmenu_event, { once: true });

          this.parentElement.appendChild(div_clone);
        }

      } catch (e) {
        GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
        console.log(e);
      }
    },
  },
};

ProposalJs.prototype.below_initial = function () {
  const instance = this;
  const { arrow: { left, right }, square: { up, down, reportIcon, returnIcon }, sub: { extractIcon } } = this.mother.belowButtons;
  const { returnGet } = GeneralJs;
  const getObj = returnGet();
  let div_clone, div_clone2, div_clone3, temp_dom, input_clone;
  let style;
  let ea = 'px';
  let listViewEvent, createViewEvent;

  extractIcon.style.opacity = '0.4';
  reportIcon.style.opacity = '0.4';
  returnIcon.style.opacity = '0.4';
  left.id = "hiddenListViewButton";

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = "blewpp_button" + String(3);
  div_clone.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    width: String(75) + ea,
    height: String(GeneralJs.isMac() ? 42 : 41) + ea,
    top: String(31.5) + ea,
    right: String(49) + ea,
    background: GeneralJs.colorChip.whiteIcon,
    borderRadius: String(3) + ea,
    fontSize: String(17) + ea,
    fontWeight: String(500) + ea,
    textAlign: "center",
    paddingTop: String(GeneralJs.isMac() ? 15 : 16) + ea,
    color: GeneralJs.colorChip.greenGray,
    cursor: "pointer",
    animation: "justfadeinoriginal 0.4s ease forwards",
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  div_clone.textContent = "Save";
  this.mother.below.appendChild(div_clone);
  GeneralJs.timeouts["saveButtonTimeout"] = setTimeout(function () {
    div_clone.style.animation = "";
    clearTimeout(GeneralJs.timeouts["saveButtonTimeout"]);
    GeneralJs.timeouts["saveButtonTimeout"] = null;
  }, 401);

  this.below_tong.set("button3", div_clone);

  this.below_tong.set("search", this.mother.searchInput);

  this.below_tong.set("button0", down);
  down.id = "blewpp_button" + String(0);
  this.below_tong.set("button1", up);
  up.id = "blewpp_button" + String(1);
  this.below_tong.set("button2", reportIcon);
  reportIcon.id = "blewpp_button" + String(2);

  listViewEvent = function (e) {
    if (instance.toggleSetting.listCreate === 0) {
      const mother = instance.createPannel;
      const father = instance.listPannel;
      if (getObj.dataonly !== "true") {
        father.classList.remove("listpp_fadeout");
        father.classList.add("listpp_fadein");
      }
      instance.list_launching().catch((err) => {
        console.log(err);
      });
      if (getObj.dataonly !== "true") {
        mother.classList.add("listpp_fadeout");
        mother.classList.remove("listpp_fadein");
      }
      father.style.zIndex = "0";
      instance.toggleSetting.listCreate = 1;
      instance.pastMaps = [];
    }
  }

  createViewEvent = function (e) {
    if (instance.toggleSetting.listCreate === 1) {
      const mother = instance.createPannel;
      const father = instance.listPannel;
      if (getObj.dataonly !== "true") {
        father.classList.add("listpp_fadeout");
        father.classList.remove("listpp_fadein");
        mother.classList.remove("listpp_fadeout");
        mother.classList.add("listpp_fadein");
      }
      father.style.zIndex = "-1";
      instance.toggleSetting.listCreate = 0;
      if (instance.toggleSetting.load === 1) {
        instance.load_reset({});
        temp_dom = instance.below_tong.get("button3");
        temp_dom.addEventListener("click", ProposalJs.below_events.save);
        temp_dom.removeEventListener("click", ProposalJs.below_events.update);
        temp_dom.setAttribute("cus_id", "");
      }
      instance.listSearchInput.remove();
      instance.mother.searchInput.style.display = "";
      instance.toggleSetting.load = 0;
      instance.pastMaps = [];
    }
  }

  this.listViewEvent = listViewEvent;
  this.createViewEvent = createViewEvent;

  down.addEventListener("click", listViewEvent);
  up.addEventListener("click", createViewEvent);
  left.addEventListener("click", listViewEvent);
}

ProposalJs.prototype.below_first = function () {
  const instance = this;

  if (this.toggleSetting.load === 0) {
    this.below_tong.get("button3").textContent = "Save";
    this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.save);
  } else {
    this.below_tong.get("button3").textContent = "Update";
    this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.update);
  }

  //search
  this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
  this.below_tong.get("search").value = "";
  this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
  this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
  this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.client);
  this.below_tong.get("search").focus();
}

ProposalJs.prototype.below_second = function (onoff) {
  const instance = this;

  if (onoff === "on") {

    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").focus();

  } else {

    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "고객 이름 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").focus();

  }

}

ProposalJs.prototype.below_third = function (onoff) {
  const instance = this;

  if (onoff === "on") {
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").focus();

  } else {
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "서비스 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").focus();

  }
}

ProposalJs.prototype.below_fourth = function (onoff) {
  const instance = this;

  if (onoff === "on") {
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
      this.below_tong.get("button3").removeEventListener("click", ProposalJs.below_events.save);
      this.below_tong.get("button3").addEventListener("click", ProposalJs.below_events.update);
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").focus();

  } else {
    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").focus();

  }
}

ProposalJs.prototype.below_fifth = function (onoff) {
  const instance = this;

  if (onoff === "on") {

    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    this.below_tong.get("button2").style.opacity = '1';
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

    if (this.toggleSetting.load === 0) {
      this.below_tong.get("button3").textContent = "Save";
    } else {
      this.below_tong.get("button3").textContent = "Update";
    }

    this.below_tong.get("button2").style.opacity = '0.4';
    this.below_tong.get("button2").removeEventListener("click", ProposalJs.below_events.fifth.b2, { once: true });

    //search
    this.below_tong.get("search").setAttribute("placeholder", "디자이너 검색...");
    this.below_tong.get("search").value = "";
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.client);
    this.below_tong.get("search").removeEventListener("keyup", ProposalJs.below_events.search.service);
    this.below_tong.get("search").addEventListener("keyup", ProposalJs.below_events.search.designer);
    this.below_tong.get("search").focus();

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
};

ProposalJs.prototype.firstToggle = function (button, domBox) {
  const instance = this;
  const title = domBox.get("고객 선택").children[0];
  const contents =  domBox.get("고객 선택").children[1];
  let service, service_input;

  if (button === "on") {
    return function (e) {
      const id = this.getAttribute("cus_id");
      const address = this.getAttribute("cus_address");
      GeneralJs.ajaxJson({
        mode: "inspection",
        addressArr: [ { id, address } ],
        liteMode: false,
      }, "/parsingAddress").then((inspectionArr) => {
        if (inspectionArr.length !== 0) {
          window.alert("고객님의 주소가 잘못되어 제안서를 만들 수 없습니다!\n" + inspectionArr[0].message + "\n고객님의 주소를 올바른 형식으로 고쳐주세요!\n(도로명과 건물 번호가 반드시 있어야 함)");
          window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + inspectionArr[0].id;
        } else {
          if (instance.toggleSetting.first === 0) {
            ProposalJs.toggleTimeout.first = setTimeout(async function () {
              try {

                instance.below_launching("second", button);
                domBox.get("고객 선택").style.height = "3.2vh";
                domBox.get("고객 선택").style.borderBottom = "1px solid " + GeneralJs.colorChip.gray2;

                domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
                domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
                domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

                service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
                for (let i of service) {
                  i.style.background = GeneralJs.colorChip.white;
                  i.children[0].style.color = GeneralJs.colorChip.green;
                  i.children[0].style.fontSize = "1.7vh";
                }

                if (/^M/g.test(window.navigator.platform)) {
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
                    i.nextElementSibling.style.background = GeneralJs.colorChip.green;
                    i.nextElementSibling.children[0].style.color = GeneralJs.colorChip.white;
                  }
                }
                title.style.color = GeneralJs.colorChip.green;
                contents.style.background = GeneralJs.colorChip.white;

                if (document.querySelector("#pp_title_sub_b") !== null) {
                  document.querySelector("#pp_title_sub_b").remove();
                }

                title.insertAdjacentHTML('beforeend', '<b id="pp_title_sub_b" cus_address="' + address + '" cus_id="' + e.target.parentElement.getAttribute("cus_id") + '" style="color:' + GeneralJs.colorChip.green + ';font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
                instance.cliid = e.target.parentElement.getAttribute("cus_id");
                instance.client = (await GeneralJs.ajaxJson({ noFlat: true, whereQuery: { cliid: instance.cliid } }, "/getClients", { equal: true }))[0];

                instance.toggleSetting.first = 1;

              } catch (e) {
                console.log(e);
              }
            }, 300);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
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
        title.style.color = GeneralJs.colorChip.black;
        contents.style.background = GeneralJs.colorChip.gray0;
        instance.toggleSetting.first = 0;
      }
    }
  }
}

ProposalJs.prototype.firstProcess = async function () {
  const instance = this;
  const { returnGet } = GeneralJs;
  const getObj = returnGet();
  let h;
  let div_clone, div_clone2, div_clone3, div_clone4, input_clone, label_clone;
  let titles;
  let titles_con;
  let domBox;
  let clients;
  let style;
  let ea;

  titles = [ "pp_firstprocess_box", "pp_secondprocess_box", "pp_thirdprocess_box" ];
  titles_con = [ "고객 선택", "서비스 선택", "디자이너 선택" ];
  ea = "px";
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
    if (i === 0) {
      if (getObj.dataonly === "true" && getObj.entire === "true") {
        style.width = "calc(100% - 33vh)";
      }
    }
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      fontSize: "1.7vh",
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
      background: GeneralJs.colorChip.gray0,
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
    label_clone.setAttribute("cus_address", clients.data[i].info.address);

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

ProposalJs.prototype.realtimePossibleConverting = function (possibleArr, dateMargin = 10) {
  if (!Array.isArray(possibleArr)) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (!possibleArr.every((obj) => { return typeof obj === "object" })) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (!possibleArr.every((obj) => { return (obj.start !== undefined && obj.end !== undefined) })) {
    console.log(possibleArr);
    throw new Error("invaild input : must be possible array");
  }
  if (typeof dateMargin !== "number") {
    dateMargin = 10;
  }
  const instance = this;
  const { equalJson, dateToString } = GeneralJs
  let rawPossibleArr;
  let indexArr, indexArrFlat;
  let tempDateArr;
  let tempDate2;
  let tempObj;
  let removeTargets;
  let indexArrReverse;
  let indexArrFinal;
  let dateBoo;

  rawPossibleArr = possibleArr.map((obj) => { return { start: obj.start, end: obj.end }; });

  do {
    indexArr = [];
    for (let i = 0; i < rawPossibleArr.length - 1; i++) {
      tempDateArr = new Array(dateMargin);
      for (let j = 0; j < dateMargin; j++) {
        tempDateArr[j] = new Date(JSON.stringify(rawPossibleArr[i].end).slice(1, -1));
        tempDateArr[j].setDate(tempDateArr[j].getDate() + (j + 1));
        tempDateArr[j] = dateToString(tempDateArr[j]);
      }
      tempDate2 = new Date(JSON.stringify(rawPossibleArr[i + 1].start).slice(1, -1));
      if (tempDateArr.includes(dateToString(tempDate2))) {
        indexArr.push(i);
      }
    }
    if (indexArr.length > 0) {

      indexArr = indexArr.map((num) => { return [ num, num + 1 ] });
      indexArrFlat = indexArr.flat();
      tempObj = {};
      for (let a of indexArrFlat) {
        if (tempObj['a' + String(a)] !== undefined) {
          tempObj['a' + String(a)] = tempObj['a' + String(a)] + 1;
        } else {
          tempObj['a' + String(a)] = 1;
        }
      }
      removeTargets = [];
      for (let key in tempObj) {
        if (tempObj[key] !== 1) {
          removeTargets.push(Number(key.replace(/[^0-9]/gi, '')));
        }
      }

      indexArrReverse = [];
      for (let i = 0; i < rawPossibleArr.length; i++) {
        indexArrReverse.push(i);
      }
      indexArrReverse = indexArrReverse.filter((num) => { return !indexArrFlat.includes(num); });
      indexArrFlat = indexArrFlat.filter((num) => { return !removeTargets.includes(num); })

      indexArrFinal = [];
      for (let i = 0; i < indexArrFlat.length; i++) {
        if (i % 2 === 0) {
          indexArrFinal.push([ indexArrFlat[i], indexArrFlat[i + 1] ]);
        }
      }

      indexArrFinal = indexArrFinal.map((arr) => {
        return {
          start: new Date(JSON.stringify(rawPossibleArr[arr[0]].start).slice(1, -1)),
          end: new Date(JSON.stringify(rawPossibleArr[arr[1]].end).slice(1, -1))
        };
      });

      for (let index of indexArrReverse) {
        indexArrFinal.push(equalJson(JSON.stringify(rawPossibleArr[index])));
      }
      indexArrFinal.sort((a, b) => {
        return a.start.valueOf() - b.start.valueOf();
      });

      rawPossibleArr = equalJson(JSON.stringify(indexArrFinal));

      dateBoo = true;
    } else {
      dateBoo = false;
    }
  } while (dateBoo);

  return rawPossibleArr;
}

ProposalJs.prototype.secondToggle = function (button, domBox) {
  const instance = this;
  let service, service_input;

  if (button === "on") {
    return function (e) {
      let selectionBoxBack, selectionBoxWording;
      let thisValue;
      let serid, xValue;

      if (instance.toggleSetting.first === 1 && instance.toggleSetting.second === 0) {

        service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.background = GeneralJs.colorChip.white;
          i.children[0].style.color = GeneralJs.colorChip.green;
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

        selectionBoxBack.style.background = GeneralJs.colorChip.green;
        selectionBoxWording.style.color = GeneralJs.colorChip.white;

        thisValue = e.target.parentElement.getAttribute("cus_value");
        serid = e.target.parentElement.getAttribute("serid");
        xValue = e.target.parentElement.getAttribute("xValue");

        ProposalJs.toggleTimeout.second = setTimeout(function () {

          instance.below_launching("third", button);

          domBox.get("서비스 선택").children[0].style.color = GeneralJs.colorChip.green;
          domBox.get("서비스 선택").children[1].style.background = GeneralJs.colorChip.white;

          if (document.querySelector("#pp_title2_sub_b") !== null) {
            document.querySelector("#pp_title2_sub_b").remove();
          }

          domBox.get("서비스 선택").children[0].insertAdjacentHTML('beforeend', `<b id="pp_title2_sub_b" serid="${serid}" xValue="${xValue}" cus_id="${thisValue}" cus_id="${thisValue}" style="color:${GeneralJs.colorChip.green};font-weight:300"> : ${thisValue}</b>`);
          domBox.get("서비스 선택").style.height = "3.2vh";
          domBox.get("서비스 선택").style.borderBottom = "1px solid " + GeneralJs.colorChip.gray2;

          instance.serid = serid;
          instance.xValue = xValue;

          for (let i of service) {
            i.style.opacity = "0";
          }

          instance.toggleSetting.second = 1;

          domBox.get("서비스 선택").children[1].style.height = "calc(90% - 10px)";
          domBox.get("서비스 선택").children[1].style.marginTop = "10px";
          domBox.get("디자이너 선택").style.height = "calc(100% - 6.4vh - 63px)";
          domBox.get("디자이너 선택").children[1].style.height = "calc(90% + " + String(GeneralJs.returnGet().dataonly === "true" ? 4.4 : 2.7) + "vh)";
          domBox.get("디자이너 선택").children[1].style.marginTop = "-" + String(GeneralJs.returnGet().dataonly === "true" ? 4.4 : 2.7) + "vh";

          instance.thirdChildren.get("box1_designerInput").focus();
          instance.thirdChildren.get("box1_designerInput").style.color = GeneralJs.colorChip.green;
          instance.thirdChildren.get("box1_title").style.color = GeneralJs.colorChip.green;
          instance.thirdChildren.get("box1_designerInput").style.fontSize = "24px";
          instance.thirdChildren.get("box1_title").style.fontSize = "24px";
          instance.thirdChildren.get("box1").style.background = GeneralJs.colorChip.white;
          instance.thirdChildren.get("box1").style.border = "1px solid " + GeneralJs.colorChip.gray3;

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

        domBox.get("서비스 선택").children[0].style.color = GeneralJs.colorChip.black;
        domBox.get("서비스 선택").children[1].style.background = GeneralJs.colorChip.gray0;
        domBox.get("서비스 선택").style.height = "calc(calc(100% / 3) - 21px)";
        domBox.get("서비스 선택").style.borderBottom = "";
        instance.toggleSetting.second = 0;
        domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
        domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
        domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

        service = domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
        for (let i of service) {
          i.style.opacity = "";
          i.style.background = GeneralJs.colorChip.white;
          i.children[0].style.color = GeneralJs.colorChip.green;
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
        for (let i of service_input) {
          if (i.checked) {
            i.nextElementSibling.style.background = GeneralJs.colorChip.green;
            i.nextElementSibling.children[0].style.color = GeneralJs.colorChip.white;
          }
        }
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
  let serviceX, serviceY, xValue;
  let style;
  let ea = "px";

  second.total = this.domBox.get("서비스 선택");
  second.title = second.total.children[0];
  second.contents = second.total.children[1];

  h = document.createDocumentFragment();
  serviceX = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "설계 변경" ];
  serviceY = [ "mini", "basic", "premium" ];
  xValue = [ "M", "B", "P" ];

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
      label_clone.setAttribute("serid", String(j + 1));
      label_clone.setAttribute("xValue", xValue[i]);
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
    if (e.key !== "Enter" && e.key !== "Tab") {
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
    if (e.key === "Enter" || e.key === "Tab") {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  });
  input_clone.addEventListener("keyup", this.thirdKeyup());

  return children;
}

// Create process 4 ------------------------------------------------------------

ProposalJs.prototype.fourthsetTimeout = async function (num, obj, clickMode = false) {
  const instance = this;
  const domBox = this.domBox;
  const { totalContents, ea } = this;
  const { createNode, colorChip, withOut, removeByClass, serviceParsing, dateToString, ajaxJson, isMac, returnGet } = GeneralJs;
  let fourthChildren;
  let thirdChildren;
  let fourth;
  let money_set;
  let input_widthSet;
  let designers;
  let clickTargets;
  let greenPopup;
  let checklistEvent;
  let designerSearch;

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

  input_widthSet = function (dom) {
    dom.style.width = String(0.8 * dom.value.length) + "vh";
    if (dom.value.replace(/,/g, '').length < 7) {
      dom.style.width = String(0.9 * dom.value.length) + "vh";
    }
    if (dom.value.replace(/,/g, '').length < 4) {
      dom.style.width = String(1.1 * dom.value.length) + "vh";
    }
  }

  greenPopup = function (thisSet, feeObject, timeoutMode = false) {
    const serid = instance.serid;
    const xValue = instance.xValue;
    const ea = "px";
    const { createNode, colorChip, withOut, isMac } = GeneralJs;
    let { desid, cliid, client, designer, detail, fee } = feeObject;
    let { alpha, distance, level: { construct, styling }, offline, online, pyeong, travel, newcomer, premium, discount: { online: discountOnline, offline: discountOffline } } = detail;
    const distanceBoo = (distance !== 0 ? "true" : "false");
    const mother = thisSet;
    const motherWidth = mother.getBoundingClientRect().width;
    const thisOnOff = /offline/gi.test(thisSet.className) ? "offline" : "online";
    const removeClassName = "greenPopupRemoveTarget";
    const greenClassName = "greenPopupBox";
    const onlineMinimum = 425000;
    const offlineMinimun = 450000;
    const firstDiscount = 0.15;
    const firstLimit = 50 * 10000;
    const secondDiscount = 0.05;
    let size, margin;
    let width;
    let bottom;
    let visual;
    let blockHeight;
    let paddingTop, paddingLeft, paddingBottom;
    let titleVisual;
    let temp;
    let onlineTarget;

    size = 13;
    margin = 6;
    width = 180;
    visual = 1;
    blockHeight = 22;
    bottom = 28;
    paddingTop = 14;
    paddingLeft = 18;
    paddingBottom = isMac() ? 13 : 10;
    titleVisual = 1;

    createNode({
      mother,
      class: [ removeClassName ],
      events: [
        {
          type: "click",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            const box = mother.querySelector('.' + greenClassName);
            if (box !== null) {
              box.style.animation = "fadedownlite 0.3s ease forwards";
            }
            GeneralJs.setTimeout(() => {
              const removeTargets = mother.querySelectorAll('.' + removeClassName);
              for (let i = 0; i < removeTargets.length; i++) {
                mother.removeChild(removeTargets[i]);
              }
            }, 301);
          }
        }
      ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: "transparent",
        zIndex: String(1),
      }
    });
    createNode({
      mother,
      class: [ removeClassName, greenClassName ],
      events: [
        {
          type: "click",
          event: (e) => { e.preventDefault(); e.stopPropagation(); }
        }
      ],
      style: {
        position: "absolute",
        width: String(width) + ea,
        height: "auto",
        borderRadius: String(3) + "px",
        background: colorChip.gradientGreen4,
        bottom: String(bottom) + ea,
        left: String((motherWidth - (width + (paddingLeft * 2))) / 2) + ea,
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        animation: "fadeuplite 0.3s ease forwards",
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingBottom) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        zIndex: String(1),
      },
      children: [
        {
          style: {
            position: "relative",
            width: String(100) + '%',
            height: String(100) + '%',
          },
          children: [
            //name
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: designer + " / " + client,
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    left: String(0) + ea,
                  }
                }
              ]
            },
            //alpha
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "가산점",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: String(alpha).slice(0, 6) + '%',
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //level
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "레벨",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: "시공 " + String(construct) + " / 스타일링 " + String(styling),
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //pyeong
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "평수",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: String(pyeong) + "평",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //travel
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "출장",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: travel.distance + " / " + travel.time,
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //distance
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              attribute: [
                { desid },
                { cliid },
                { serid },
                { xValue },
                { distance },
                { number: travel.number },
                { distanceBoo },
                { thisOnOff }
              ],
              events: [
                {
                  type: [ "click", "contextmenu" ],
                  event: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const desid = this.getAttribute("desid");
                    const cliid = this.getAttribute("cliid");
                    const serid = this.getAttribute("serid");
                    const xValue = this.getAttribute("xValue");
                    const distance = Number(this.getAttribute("distance"));
                    const number = Number(this.getAttribute("number"));
                    const distanceBoo = this.getAttribute("distanceBoo") === "true";
                    const thisOnOff = this.getAttribute("thisOnOff");
                    const onlinePosition = 7;
                    const offlinePosition = 8;
                    const totalPosition = 9;
                    let doing;
                    let newNumber, newDistance;
                    let offline, final, online;
                    let temp;
                    let onlineTarget;
                    if (e.type === "click") {
                      newNumber = number + 1;
                      doing = true;
                    } else {
                      if (number > 0) {
                        newNumber = number - 1;
                        doing = true;
                      } else {
                        doing = false;
                      }
                    }
                    if (doing) {
                      this.lastChild.textContent = "회당 " + GeneralJs.autoComma(distance) + "원, 총 " + String(distanceBoo ? newNumber : 0) + "회";
                      this.setAttribute("number", String(newNumber));
                      if (distanceBoo) {
                        ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.travel.number = newNumber;
                      }
                    }

                  }
                }
              ],
              children: [
                {
                  text: "출장비",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: "회당 " + GeneralJs.autoComma(distance) + "원, 총 " + String(travel.number) + "회",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //limit
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              attribute: [
                { number: travel.limit },
                { distance },
                { distanceBoo },
                { thisOnOff }
              ],
              events: [
                {
                  type: [ "click", "contextmenu" ],
                  event: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const number = Number(this.getAttribute("number"));
                    const distance = Number(this.getAttribute("distance"));
                    const distanceBoo = this.getAttribute("distanceBoo") === "true";
                    const thisOnOff = this.getAttribute("thisOnOff");
                    const onlinePosition = 7;
                    const offlinePosition = 8;
                    const totalPosition = 9;
                    let doing;
                    let newNumber;
                    let temp;
                    let offline;
                    let online;
                    let onlineTarget;

                    if (e.type === "click") {
                      newNumber = number + 1;
                      doing = true;
                    } else {
                      if (number > 0) {
                        newNumber = number - 1;
                        doing = true;
                      } else {
                        doing = false;
                      }
                    }
                    if (doing) {
                      this.lastChild.textContent = String(!distanceBoo ? 0 : newNumber) + "회";
                      this.setAttribute("number", String(!distanceBoo ? 0 : newNumber));
                      ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.travel.limit = (!distanceBoo ? 0 : newNumber);
                    }

                  }
                }
              ],
              children: [
                {
                  text: "출장 한계",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: String(travel.limit) + "회",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //online
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "온라인시",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: GeneralJs.autoComma(online) + "원",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //offline
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "오프라인시",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: GeneralJs.autoComma(offline) + "원",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //plus minus designer
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              attribute: [
                { desid },
                { cliid },
                { serid },
                { xValue },
                { thisOnOff },
                { number: String(Math.round((/^off/gi.test(thisOnOff) ? discountOffline : discountOnline) * 100) * -1) },
              ],
              events: [
                {
                  type: [ "click", "contextmenu" ],
                  event: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const desid = this.getAttribute("desid");
                    const cliid = this.getAttribute("cliid");
                    const serid = this.getAttribute("serid");
                    const xValue = this.getAttribute("xValue");
                    const number = Number(this.getAttribute("number"));
                    const thisOnOff = this.getAttribute("thisOnOff");
                    const onlinePosition = 7;
                    const offlinePosition = 8;
                    const finalPosition = 10;
                    let newNumber;
                    let final;
                    let original;
                    if (e.type === "click") {
                      newNumber = number + 1;
                    } else {
                      newNumber = number - 1;
                    }
                    this.lastChild.textContent = String(newNumber) + "%";
                    this.setAttribute("number", String(newNumber));
                    ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.discount[thisOnOff] = ((-1 * newNumber) / 100);
                    original = Number(this.parentElement.children[/^off/.test(thisOnOff) ? offlinePosition : onlinePosition].lastChild.textContent.replace(/[^0-9\-]/gi, ''));
                    final = original * (1 - ((-1 * newNumber) / 100));
                    this.parentElement.children[finalPosition].lastChild.textContent = GeneralJs.autoComma(final) + "원";
                    this.parentElement.parentElement.parentElement.querySelector("input").value = GeneralJs.autoComma(final);
                    input_widthSet(this.parentElement.parentElement.parentElement.querySelector("input"));
                  }
                }
              ],
              children: [
                {
                  text: "증감율",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: String(Math.round((/^off/gi.test(thisOnOff) ? discountOffline : discountOnline) * 100) * -1) + "%",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
            //discount apply
            {
              style: {
                display: "block",
                position: "relative",
                height: String(blockHeight) + ea,
              },
              children: [
                {
                  text: "비율 적용",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(400),
                    color: colorChip.whiteBlack,
                    top: String(titleVisual) + ea,
                    left: String(0) + ea,
                  }
                },
                {
                  text: GeneralJs.autoComma((1 - (/^off/gi.test(thisOnOff) ? discountOffline : discountOnline)) * (/^off/gi.test(thisOnOff) ? offline : online)) + "원",
                  style: {
                    position: "absolute",
                    fontSize: String(size) + ea,
                    fontWeight: String(600),
                    color: colorChip.whiteBlack,
                    top: String(0) + ea,
                    right: String(0) + ea,
                  }
                }
              ]
            },
          ]
        }
      ]
    });

    if (timeoutMode) {
      GeneralJs.setTimeout(() => {
        const box = mother.querySelector('.' + greenClassName);
        if (box !== null) {
          box.style.animation = "fadedownlite 0.3s ease forwards";
        }
        GeneralJs.setTimeout(() => {
          const removeTargets = mother.querySelectorAll('.' + removeClassName);
          for (let i = 0; i < removeTargets.length; i++) {
            mother.removeChild(removeTargets[i]);
          }
        }, 301);
      }, 2000);
    }
  }

  money_set = function (onoff, s, feeObject = null) {
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
      if (feeObject === null) {
        input_clone.value = GeneralJs.autoComma(2000000);
      } else {
        if (/오프/gi.test(onoff) || /off/gi.test(onoff)) {
          input_clone.value = GeneralJs.autoComma(feeObject.detail.offline);
        } else {
          input_clone.value = GeneralJs.autoComma(feeObject.detail.online);
        }
      }
    } else {
      input_clone.value = GeneralJs.autoComma(String(onoff.fee[s].amount));
    }
    input_widthSet(input_clone);
    input_clone.addEventListener("keyup", fourth.events.money);
    input_clone.addEventListener("blur", fourth.events.money);
    input_clone.addEventListener("click", fourth.events.money);
    div_clone3.appendChild(input_clone);

    //3
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("pp_designer_selected_box_contents_money_text2");
    div_clone2.insertAdjacentHTML("beforeend", '원');
    div_clone3.appendChild(div_clone2);
    return div_clone3;
  }

  fourth.events.money = function (e) {
    if (e.type === "click") {
      const thisSet = this.parentNode;
      const index = Number(thisSet.parentNode.getAttribute("index"));
      const designerCardClassName = "pp_designer_selected_box_contents_designers_s";
      const targetDesigners = Array.from(document.querySelectorAll('.' + designerCardClassName + String(index)));
      const targetInputs = targetDesigners.map((dom) => { return dom.previousElementSibling; });
      let thisDesigner, desid, cliid, serid, xValue, feeObject;
      thisDesigner = null;
      for (let i = 0; i < targetInputs.length; i++) {
        if (targetInputs[i].checked) {
          thisDesigner = targetDesigners[i];
        }
      }
      if (thisDesigner !== null) {
        desid = thisDesigner.querySelector("label").querySelector("div").getAttribute("cus_desid");
        cliid = instance.cliid;
        serid = instance.serid;
        xValue = instance.xValue;
        if (!ProposalJs.designerFee.has(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) || (ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) !== null && ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.offline === 0)) {
          GeneralJs.ajaxJson({ matrix: [ [ desid, cliid, serid, xValue, document.getElementById("blewpp_button3").getAttribute("cus_id") ] ], frontMode: 1 }, "/designerFee").then((raw_fee) => {
            if (!Array.isArray(raw_fee)) {
              window.alert("오류 발생, 관리자에게 문의하세요!");
              window.location.reload();
            }
            if (raw_fee.length === 0) {
              window.alert("오류 발생, 관리자에게 문의하세요!");
              window.location.reload();
            }
            const result = raw_fee[0];
            ProposalJs.designerFee.set(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue), result);
            greenPopup(thisSet, result, false);
          });
        } else {
          greenPopup(thisSet, ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)), false);
        }

        feeObject = ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue));
        if (feeObject.fee === 0 && feeObject.comment !== "") {
          window.alert(feeObject.comment);
        } else {
          if (feeObject.comment !== "") {
            window.alert(feeObject.comment);
          }
        }

      }
    } else {
      if (this.value === '') {
        this.value = "0";
      }
      if (e.type === "keyup") {
        if (e.key === "Enter" || e.key === "Tab") {
          this.value = GeneralJs.autoComma(this.value);
        }
      } else if (e.type === "blur") {
        this.value = GeneralJs.autoComma(this.value);
      }
      input_widthSet(this);
    }
  }

  fourth.events.designer = async function (e) {
    try {
      const card = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      const desid = this.getAttribute("cus_desid");
      const cliid = instance.cliid;
      const serid = instance.serid;
      const xValue = instance.xValue;
      const address = this.getAttribute("cus_address");
      const cusNum = this.getAttribute("cus_num");
      const getnode = (num, boo = true) => {
        if (boo) {
          return instance.fourthChildren.get("box" + cusNum).children[3].children[num].style;
        } else {
          return instance.fourthChildren.get("box" + cusNum).children[3].children[1].children[0].style;
        }
      }
      const inputTargets = card.querySelectorAll(".pp_designer_selected_box_contents_money_set");
      const timeoutMode = (e.customHomeLiaison_timeoutMode === true);
      let target;
      let raw_fee;
      let result;
      let thisSet;

      for (let dom of inputTargets) {
        dom.querySelector("input").value = "연산중";
      }

      card.setAttribute("desid", desid);
      card.setAttribute("address", address);
      getnode(0).color = GeneralJs.colorChip.green;
      getnode(1).background = GeneralJs.colorChip.green;
      getnode(1, false).color = GeneralJs.colorChip.white;
      target = document.getElementById("pp_designer_selected_box_contents_selection" + this.getAttribute("cus_num"));
      if (target !== null) {
        while (target.firstChild) {
          target.removeChild(target.lastChild);
        }
        target.textContent = this.getAttribute("cus_value") + " 디자이너의 사진 선택";
      }
      target = document.querySelectorAll('.pp_designer_selected_box_value')[Number(this.getAttribute("cus_num"))];
      if (target.textContent !== "") {
        target.textContent = '';
      }

      if (ProposalJs.designerFee.has(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) && ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.offline !== 0) {
        raw_fee = [ ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) ];
      } else {
        raw_fee = await GeneralJs.ajaxJson({ matrix: [ [ desid, cliid, serid, xValue, document.getElementById("blewpp_button3").getAttribute("cus_id") ] ], frontMode: 1 }, "/designerFee");
      }

      if (!Array.isArray(raw_fee)) {
        window.alert("오류 발생, 관리자에게 문의하세요!");
        window.location.reload();
      }
      if (raw_fee.length === 0) {
        window.alert("오류 발생, 관리자에게 문의하세요!");
        window.location.reload();
      }

      result = raw_fee[0];
      if (!ProposalJs.designerFee.has(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) || (ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) !== null && ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.offline === 0)) {
        ProposalJs.designerFee.set(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue), result);
      }

      for (let dom of inputTargets) {
        if (dom.querySelector("input") === null) {
          window.alert("오류 발생, 금액을 다 껐다가 다시 켜보세요!");
        } else {
          if (/online/g.test(dom.className)) {
            dom.querySelector("input").value = GeneralJs.autoComma(result.detail.online);
          } else {
            dom.querySelector("input").value = GeneralJs.autoComma(result.detail.offline);
          }
          input_widthSet(dom.querySelector("input"));
          thisSet = dom.querySelector("input").parentNode;
        }
      }

      result = ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue));
      if (result.fee === 0 && result.comment !== "") {
        window.alert(result.comment);
      } else {
        if (result.comment !== "") {
          window.alert(result.comment);
        }
      }

      if (timeoutMode) {
        greenPopup(thisSet, result, timeoutMode);
      }

      return "yes!";

    } catch (err) {
      console.log(err.message);
    }
  }

  fourth.events.service = async function (e) {
    try {
      const card = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      let n = this.getAttribute("cus_id").replace(/[^0-9]/g, '');
      let desid, cliid, serid, xValue;
      let result;

      if (document.getElementById(this.parentElement.getAttribute("for")).checked) {
        if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
          document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).querySelector(".pp_designer_selected_box_contents_money_set" + ((this.getAttribute("cus_value") === "오프라인") ? "_offline" : "_online")).remove();
        }
      } else {
        if (document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)) !== null) {
          desid = card.getAttribute("desid");
          cliid = instance.cliid;
          serid = instance.serid;
          xValue = instance.xValue;

          if (desid === null) {
            const designerCardClassName = "pp_designer_selected_box_contents_designers_s";
            const targetDesigners = Array.from(document.querySelectorAll('.' + designerCardClassName + String(n)));
            const targetInputs = targetDesigners.map((dom) => { return dom.previousElementSibling; });
            let thisDesigner;
            thisDesigner = null;
            for (let i = 0; i < targetInputs.length; i++) {
              if (targetInputs[i].checked) {
                thisDesigner = targetDesigners[i];
              }
            }
            if (thisDesigner === null) {
              window.alert("디자이너를 체크해주세요!");
            } else {
              desid = thisDesigner.querySelector("label").querySelector("div").getAttribute("cus_desid");
            }
          }

          if (ProposalJs.designerFee.has(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)) && ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue)).detail.offline !== 0) {
            result = ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue));
          } else {
            result = (await GeneralJs.ajaxJson({ matrix: [ [ desid, cliid, serid, xValue, document.getElementById("blewpp_button3").getAttribute("cus_id") ] ], frontMode: 1 }, "/designerFee"))[0];
            ProposalJs.designerFee.set(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue), result);
          }
          document.querySelector("#" + "pp_designer_selected_box_contents_money" + String(n)).appendChild(money_set(this.getAttribute("cus_value"), 0, result));
        }
      }

    } catch (e) {
      console.log(e);
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

  fourth.events.prevent = function (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  fourth.events.drag = function (e) {
    e.dataTransfer.setData("dragData", this.getAttribute("cus_id"));
  }

  fourth.events.drop = function (e) {
    e.stopPropagation();
    e.preventDefault();
    const selectedMother = this.parentNode;
    const domParsing = function (dom) {
      const { children } = dom;
      const [ designer, service, fee, popup, value ] = children;

      let resultObj;
      let designerInputs, serviceInputs, feeInputs;

      resultObj = {};
      resultObj.desid = null;
      designerInputs = designer.querySelectorAll("input");
      for (let i of designerInputs) {
        if (i.checked) {
          resultObj.desid = i.value;
        }
      }

      serviceInputs = service.querySelectorAll("input");
      resultObj.service = [];
      for (let i of serviceInputs) {
        resultObj.service.push(i.checked);
      }

      feeInputs = fee.children[1].querySelectorAll("input");
      if (feeInputs.length === 2) {
        resultObj.fee = '';
        for (let i of feeInputs) {
          resultObj.fee += fee.children[1].textContent + "__split__" + i.value;
          resultObj.fee += "__split__";
        }
        resultObj.fee = resultObj.fee.slice(0, -9);
      } else if (feeInputs.length === 1) {
        resultObj.fee = fee.children[1].textContent + "__split__" + feeInputs[0].value;
      } else {
        resultObj.fee = null;
      }

      resultObj.popup = popup.children[1].textContent;

      resultObj.value = value.textContent;

      return resultObj;
    }
    const objToDom = function (obj, dom, id0, id1) {
      const { children } = dom;
      const [ designerDom, serviceDom, feeDom, popupDom, valueDom ] = children;
      const { desid, service, fee, popup, value } = obj;
      let designerInputs, serviceInputs, feeInputs, feeTarget;

      designerInputs = designerDom.querySelectorAll("input");
      for (let i of designerInputs) {
        i.checked = (i.value === desid);
      }

      serviceInputs = serviceDom.querySelectorAll("input");
      for (let i = 0; i < service.length; i++) {
        serviceInputs[i].checked = service[i];
      }

      if (fee.split("__split__").length === 2) {
        document.getElementById("pp_designer_selected_box_contents_money" + String(id1)).appendChild(document.getElementById("pp_designer_selected_box_contents_money" + String(id0)).children[0]);
      } else if (fee.split("__split__").length === 4) {
        document.getElementById("pp_designer_selected_box_contents_money" + String(id1)).appendChild(document.getElementById("pp_designer_selected_box_contents_money" + String(id0)).children[0]);
        document.getElementById("pp_designer_selected_box_contents_money" + String(id1)).appendChild(document.getElementById("pp_designer_selected_box_contents_money" + String(id0)).children[0]);
      }

      popupDom.children[1].children[0].textContent = popup;
      valueDom.textContent = value;
    }
    const orderId_from = Number(e.dataTransfer.getData("dragData").replace(/[^0-9]/g, ''));
    const orderId_to = Number(this.getAttribute("cus_id").replace(/[^0-9]/g, ''));
    const dom_from = selectedMother.children[orderId_from + 1];
    const dom_to = selectedMother.children[orderId_to + 1];
    const info_from = JSON.parse(JSON.stringify(domParsing(dom_from)));
    const info_to = JSON.parse(JSON.stringify(domParsing(dom_to)));
    objToDom(info_from, dom_to, orderId_from, orderId_to);
    objToDom(info_to, dom_from, orderId_to, orderId_from);
  }

  checklistEvent = async function (e) {
    e.preventDefault();
    try {
      const desid = this.getAttribute("cus_desid");
      const cliid = instance.cliid;
      const designerTitlePopupClassName = "designerTitlePopupClassName";
      const requestNumber = 0;
      const zIndex = 5;
      const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, BACKHOST + "/getClients", { equal: true });
      const expectedToString = function (str0, startDateNumber = 0) {
        let expected;
        expected = new Date(str0);
        expected.setDate(expected.getDate() - startDateNumber);
        if (expected.valueOf() < (new Date(2000, 0, 1)).valueOf() || expected.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
          return `해당 없음`;
        } else {
          return `${String(expected.getFullYear()).slice(2)}년 ${String(expected.getMonth() + 1)}월 ${String(expected.getDate())}일`;
        }
      }
      const belowHeight = returnGet().dataonly === "true" ? 0 : instance.mother.belowHeight;
      let cancelBack, whitePrompt;
      let clientWhite;
      let margin;
      let clientWhiteHeight;
      let between;
      let clientInfoSize, clientInfoWeight;
      let blank;
      let textTop;
      let thisService;

      margin = 30;
      clientWhiteHeight = 64;
      between = 8;
      clientInfoSize = 16;
      clientInfoWeight = 600;
      textTop = isMac() ? -1 : 1;

      thisService = serviceParsing(document.getElementById("pp_title2_sub_b").textContent);

      blank = "&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;";

      cancelBack = createNode({
        mother: totalContents,
        class: [ designerTitlePopupClassName ],
        event: function (e) {
          removeByClass(designerTitlePopupClassName);
        },
        style: {
          position: "fixed",
          top: String(0) + ea,
          left: String(0),
          width: withOut(0, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          opacity: String(0.6),
          zIndex: String(zIndex),
        }
      });

      clientWhite = createNode({
        mother: totalContents,
        class: [ designerTitlePopupClassName ],
        style: {
          display: "flex",
          position: "fixed",
          top: String(0 + margin) + ea,
          left: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: String(clientWhiteHeight) + ea,
          background: colorChip.white,
          zIndex: String(zIndex),
          borderRadius: String(5) + "px",
          animation: "fadeuplite 0.3s ease forwards",
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        children: [
          {
            text: client.name + blank + client.cliid + blank + serviceParsing(thisService) + blank + "일정 : " + expectedToString(client.requests[requestNumber].analytics.date.space.movein, serviceParsing(thisService, true)) + "&nbsp;&nbsp;~&nbsp;&nbsp;" + expectedToString(client.requests[requestNumber].analytics.date.space.movein),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(clientInfoSize) + ea,
              fontWeight: String(clientInfoWeight),
              color: colorChip.black,
            },
            under: {
              fontSize: String(clientInfoSize) + ea,
              fontWeight: String(300),
              color: colorChip.deactive,
            }
          }
        ]
      })

      whitePrompt = createNode({
        mother: totalContents,
        class: [ designerTitlePopupClassName ],
        style: {
          position: "fixed",
          top: String(0 + margin + clientWhiteHeight + between) + ea,
          left: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: withOut(0 + (margin * 2) + clientWhiteHeight + between + belowHeight, ea),
          background: colorChip.white,
          zIndex: String(zIndex),
          borderRadius: String(5) + "px",
          animation: "fadeuplite 0.3s ease forwards",
          boxShadow: "0 2px 10px -6px " + colorChip.shadow,
          overflow: "hidden",
        },
        child: {
          mode: "iframe",
          attribute: {
            src: BACKHOST + "/designer?mode=checklist&entire=true&dataonly=true&desid=" + desid,
          },
          style: {
            position: "absolute",
            display: "block",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            border: String(0),
          }
        }
      });

    } catch (e) {
      console.log(e);
    }
  }

  designerSearch = function (e) {
    const searchDesignerInputsClassName = "searchDesignerInputsClassName";
    const desidTargets = [ ...this.nextElementSibling.querySelectorAll("label") ];
    let cancelBack, whiteTong;
    let whiteTongBase;
    let whiteWidth;
    let whiteHeight;
    let paddingTop;
    let paddingLeft;
    let paddingBottom;
    let size0;
    let size1;
    let marginLeft;
    let bottomVisual;
    let inputBoxHeight;
    let inputIndent;
    let inputBottomVisual;
    let lineHeight;
    let wordingVisual;
    let input;
    let inputSize;

    whiteWidth = 230;
    whiteHeight = 150;
    paddingTop = 17;
    paddingLeft = 23;
    paddingBottom = 62;
    size0 = 14;
    size1 = 15;
    marginLeft = 0;
    bottomVisual = 7;
    inputBoxHeight = 30;
    inputIndent = 9;
    inputBottomVisual = 0;
    lineHeight = 1.5;
    wordingVisual = GeneralJs.isMac() ? 0 : 2;
    inputSize = 13;
  
    cancelBack = createNode({
      mother: totalContents,
      class: [ searchDesignerInputsClassName ],
      event: {
        click: (e) => { removeByClass(searchDesignerInputsClassName) },
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        background: colorChip.black,
        opacity: String(0.3),
      }
    });

    whiteTongBase = createNode({
      mode: "aside",
      mother: totalContents,
      class: [ searchDesignerInputsClassName ],
      event: {
        contextmenu: (e) => { e.stopPropagation(); },
        dblclick: (e) => { e.stopPropagation(); },
        drop: (e) => { e.stopPropagation(); },
        keyup: (e) => { e.stopPropagation(); },
        keydown: (e) => { e.stopPropagation(); },
        keypress: (e) => { e.stopPropagation(); },
        click: (e) => { removeByClass(searchDesignerInputsClassName) },
      },
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: String(0) + "vh",
        left: String(1) + "vw",
        width: String(98) + "vw",
        height: "calc(100vh - " + String(0) + ea + ")",
        background: "transparent",
        zIndex: String(900)
      }
    });
    
    whiteTong = createNode({
      mother: whiteTongBase,
      event: {
        click: (e) => { e.stopPropagation(); },
      },
      style: {
        display: "block",
        position: "relative",
        width: String(whiteWidth - (paddingLeft * 2)) + ea,
        paddingTop: String(paddingTop) + ea,
        paddingBottom: String(paddingBottom) + ea,
        paddingLeft: String(paddingLeft) + ea,
        paddingRight: String(paddingLeft) + ea,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        background: colorChip.white,
        animation: "fadeuplite 0.4s ease forwards",
      }
    });

    createNode({
      mother: whiteTong,
      text: "디자이너 이름을 검색해주세요!",
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        fontSize: String(size1) + ea,
        fontWeight: String(600),
        color: colorChip.black,
        lineHeight: String(lineHeight),
        top: String(wordingVisual) + ea,
        textAlign: "center",
      }
    });

    createNode({
      mother: whiteTong,
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual) + ea,
        left: String(paddingLeft + marginLeft) + ea,
        width: withOut((paddingLeft * 2) + marginLeft, ea),
        height: String(inputBoxHeight) + ea,
        borderRadius: String(5) + "px",
        background: colorChip.gray1,
      }
    });

    input = createNode({
      mother: whiteTong,
      mode: "input",
      attribute: {
        type: "text",
      },
      event: {
        keypress: function (e) {
          if (e.key === "Enter") {
            const finalValue = this.value.trim();
            let labelTarget;
            labelTarget = desidTargets.find((label) => {
              return (new RegExp(finalValue, "gi")).test(label.children[0].getAttribute("cus_value"));
            });
            if (labelTarget !== undefined) {
              labelTarget.children[0].click();
            }
            removeByClass(searchDesignerInputsClassName);
          }
        }
      },
      style: {
        position: "absolute",
        bottom: String(paddingTop + bottomVisual + inputBottomVisual) + ea,
        left: String(paddingLeft + marginLeft + inputIndent) + ea,
        width: withOut((paddingLeft * 2) + marginLeft + (inputIndent * 2), ea),
        height: String(inputBoxHeight) + ea,
        background: "transparent",
        fontSize: String(inputSize) + ea,
        fontWeight: String(400),
        color: colorChip.black,
        border: String(0),
        outline: String(0),
        textAlign: "center",
      }
    });

    input.focus();

  }

  designers = instance.designers;
  fourth.callbacks.set("디자이너 이름", function (dom, n) {
    const expectedToDate = function (str0, startDateNumber = 0) {
      let expected;
      expected = new Date(str0);
      expected.setDate(expected.getDate() - startDateNumber);
      return expected;
    }
    const dateMargin = 10;
    let input, div_clone, div_clone2, div_clone3, input_clone, label_clone;
    let i;
    let thisService;
    let dateFrom, dateTo;
    let thisRealtime;
    let thisPossible;
    let possible;
    let boo;
    let rawPossibleArr;

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
      input_clone.value = designer.desid;

      div_clone.appendChild(input_clone);
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.classList.add("pp_designer_selected_box_contents_designers_s" + String(n));
      div_clone2.textContent = designer.designer;

      div_clone2.setAttribute("cus_desid", designer.desid);
      div_clone2.setAttribute("cus_value", designer.designer);
      div_clone2.setAttribute("cus_num", String(n));

      if (designer.analytics.construct.level < Number(instance.serid.replace(/[^0-9]/gi, '')) - 1) {
        div_clone2.style.background = GeneralJs.colorChip.gray3;
        div_clone2.style.color = GeneralJs.colorChip.deactive;
      }

      thisService = GeneralJs.serviceParsing(document.getElementById("pp_title2_sub_b").textContent);
      dateFrom = expectedToDate(instance.client.requests[0].analytics.date.space.movein, serviceParsing(thisService, true));
      dateTo = expectedToDate(instance.client.requests[0].analytics.date.space.movein);

      thisRealtime = instance.realtimeDesigner.data.find((o) => { return o.desid === designer.desid });
      thisPossible = [];
      if (thisRealtime !== undefined) {
        thisPossible = GeneralJs.equalJson(JSON.stringify(thisRealtime.possible));
      }
      rawPossibleArr = instance.realtimePossibleConverting(thisPossible, dateMargin);
      boo = false;
      for (let { start, end } of rawPossibleArr) {
        if (start.valueOf() <= dateFrom.valueOf() && dateTo.valueOf() <= end.valueOf()) {
          boo = true;
          break;
        }
      }

      if (!boo) {
        div_clone2.style.background = GeneralJs.colorChip.gray3;
        div_clone2.style.color = GeneralJs.colorChip.deactive;
      }

      label_clone = GeneralJs.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_designers_input" + String(n) + String(i));

      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      div_clone3.setAttribute("cus_desid", designer.desid);
      div_clone3.setAttribute("cus_value", designer.designer);
      div_clone3.setAttribute("cus_num", String(n));
      div_clone3.setAttribute("cus_address", designer.information.address.length === 0 ? "" : designer.information.address[0]);
      div_clone3.addEventListener("click", fourth.events.designer);
      div_clone3.addEventListener("contextmenu", checklistEvent);

      label_clone.appendChild(div_clone3);

      div_clone2.appendChild(label_clone);
      div_clone.appendChild(div_clone2);

      if (obj.proposal !== undefined) {
        if (designer.desid === obj.proposal[n].desid) {
          input_clone.checked = true;
          instance.clickTargets.push(input_clone.nextElementSibling);
        }
      }

      i = i + 1;
    }

    GeneralJs.createNode({
      mode: "aside",
      mother: document.body,
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(99) + "vw",
        height: String(99) + "vh",
        background: "transparent",
        cursor: "wait",
        zIndex: String(999)
      }
    });

    if (GeneralJs.timeouts["firstClick"] !== undefined && GeneralJs.timeouts["firstClick"] !== null) {
      clearTimeout(GeneralJs.timeouts["firstClick"]);
    }

    GeneralJs.timeouts["firstClick"] = setTimeout(async () => {
      try {
        let desid, cliid, serid, xValue;
        let raw_obj, result;

        cliid = instance.cliid;
        serid = instance.serid;
        xValue = instance.xValue;

        for (let dom of instance.clickTargets) {
          if (instance.toggleSetting.load === 0) {
            fourth.events.designer.call(dom.querySelector("label").querySelector("div"), {
              customHomeLiaison_timeoutMode: true
            }).then((str) => {
              if (/aside/gi.test(document.body.lastChild.nodeName)) {
                document.body.removeChild(document.body.lastChild);
              }
            }).catch((err) => {
              console.log(err);
            });
            await GeneralJs.sleep(600);
          } else {
            desid = dom.querySelector("div").getAttribute("cus_desid");
            raw_obj = await GeneralJs.ajaxJson({ matrix: [ [ desid, cliid, serid, xValue, document.getElementById("blewpp_button3").getAttribute("cus_id") ] ], frontMode: 1 }, "/designerFee");
            if (raw_obj.length !== 0) {
              result = raw_obj[0];
              ProposalJs.designerFee.set(ProposalJs.feeKeyMaker(desid, cliid, serid, xValue), result);
            }
          }
        }
        while (/aside/gi.test(document.body.lastChild.nodeName)) {
          document.body.removeChild(document.body.lastChild);
        }
        instance.clickTargets = [];
        clearTimeout(GeneralJs.timeouts["firstClick"]);
        GeneralJs.timeouts["firstClick"] = null;
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    for (let j = 0; j < 10; j++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("pp_designer_selected_box_contents_designers");
      div_clone2.textContent = "자이너";
      div_clone2.style.opacity = 0;
      div_clone.appendChild(div_clone2);
    }

    dom.appendChild(div_clone);
  });

  fourth.callbacks.set("서비스 방식", function (dom, n) {
    let input = GeneralJs.nodes.input.cloneNode(true);
    input.classList.add("pp_designer_selected_box_contents_service_input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "pp_designer_selected_box_contents_service_input" + String(n));
    input.style.display = "none";

    let div_clone, div_clone2, div_clone3, input_clone, label_clone, service;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_service_total");
    service = [ "오프라인", "온라인" ];

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
      label_clone = GeneralJs.nodes.label.cloneNode(true);
      label_clone.setAttribute("for", "pp_designer_selected_box_contents_service_input" + String(n) + String(i));
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.classList.add("garim");
      div_clone3.setAttribute("cus_value", service[i]);
      div_clone3.setAttribute("cus_id", 's' + String(n));
      if (i !== 2) {
        div_clone3.addEventListener("click", fourth.events.service);
      }
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
      }
      //------------------------------------------------------------------------
    }
    dom.appendChild(div_clone);
  });

  fourth.callbacks.set("서비스 금액", function (dom, n) {
    let div_clone;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_money");
    div_clone.id = "pp_designer_selected_box_contents_money" + String(n);
    div_clone.setAttribute("index", String(n));
    //------------------------------------------------------------------------
    if (obj.proposal === undefined) {
      div_clone.appendChild(money_set("오프라인", 0));
    } else {
      for (let i = 0; i < obj.proposal[n].fee.length; i++) {
        div_clone.appendChild(money_set(obj.proposal[n], i));
      }
    }
    //------------------------------------------------------------------------
    dom.appendChild(div_clone);
  });

  fourth.callbacks.set("사진 선택", function (dom, n) {
    let div_clone, div_clone2, div_clone3, input_clone;
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_designer_selected_box_contents_selection");
    div_clone.id = "pp_designer_selected_box_contents_selection" + String(n);
    div_clone.textContent = "디자이너를 선택해주세요!";
    //------------------------------------------------------------------------
    if (obj.proposal !== undefined) {
      for (let d of designers) {
        if (d.desid === obj.proposal[n].desid) {
          div_clone.textContent = d.designer + " 디자이너의 사진 선택";
        }
      }
      div_clone.style.color = GeneralJs.colorChip.white;
      dom.style.background = GeneralJs.colorChip.green;
    }
    //------------------------------------------------------------------------
    div_clone.setAttribute("cus_id", 's' + String(n));
    div_clone.addEventListener("click", fourth.events.popup);
    dom.appendChild(div_clone);
  });

  return function () {
    let div_clone, div_clone2, div_clone3, div_clone4, general_string;
    let target0, target1, target2, target3;
    let titleTarget;

    fourth.box.style.display = "none";
    fourth.title.style.color = GeneralJs.colorChip.green;
    fourth.contents.style.background = GeneralJs.colorChip.white;
    fourth.contents.style.border = "1px solid " + GeneralJs.colorChip.gray2;
    fourth.contents.style.borderRadius = "6px";
    fourth.contents.style.padding = "0px";
    instance.below_launching("fourth", "on");
    instance.totalTong.fifthScrollmove = {};

    if (instance.pastMaps[0] === undefined) {
      for (let i = 0; i < num; i++) {
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("pp_designer_selected");
        div_clone.setAttribute("cus_id", 's' + String(i));
        div_clone.style.width = "calc(100% / " + String(num) + ")";
        if (i !== 0) {
          div_clone.style.borderLeft = "1px solid " + GeneralJs.colorChip.gray2;
        }

        for (let j = 0; j < fourth.titles.length; j++) {
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          div_clone2.classList.add("pp_designer_selected_box");
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_title");
          div_clone3.classList.add("hoverDefault");
          div_clone3.textContent = fourth.titles[j];
          if (j === 0) {
            div_clone3.addEventListener("click", designerSearch);
          }
          div_clone2.appendChild(div_clone3);
          div_clone3 = GeneralJs.nodes.div.cloneNode(true);
          div_clone3.classList.add("pp_designer_selected_box_contents");
          (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
          div_clone2.appendChild(div_clone3);
          div_clone.appendChild(div_clone2);
        }

        div_clone.setAttribute("draggable", "true");
        div_clone.style.cursor = "pointer";

        div_clone.addEventListener("dragstart", fourth.events.drag);
        div_clone.addEventListener("dragenter", fourth.events.prevent);
        div_clone.addEventListener("dragleave", fourth.events.prevent);
        div_clone.addEventListener("dragover", fourth.events.prevent);
        div_clone.addEventListener("drop", fourth.events.drop);

        //remember value
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add("pp_designer_selected_box_value");
        //------------------------------------------------------------------------
        if (obj.proposal !== undefined) {
          general_string = '';
          for (let k of obj.proposal[i].pictureSettings) {
            general_string += GeneralJs.tagCoverting(k) + "__split3__";
          }
          for (let k = 0; k < obj.proposal[i].description.length; k++) {
            general_string += "description" + String(k) + "__split2__" + obj.proposal[i].description[k] + "__split1__";
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

      if (num <= instance.pastMaps[0].size) {
        for (let i = 0; i < num; i++) {
          instance.pastMaps[0].get("box" + String(i)).style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) {
            instance.pastMaps[0].get("box" + String(i)).style.borderLeft = "1px solid " + GeneralJs.colorChip.gray2;
          }

          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragstart", fourth.events.drag);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragenter", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragleave", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragover", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("drop", fourth.events.drop);

          fourth.contents.appendChild(instance.pastMaps[0].get("box" + String(i)));
          fourthChildren.set("box" + String(i), instance.pastMaps[0].get("box" + String(i)));
          instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
        }

        // add events
        titleTarget = Array.from(document.querySelectorAll(".pp_designer_selected_box_title")).filter((dom, index) => {
          return index % 4 === 0;
        });
        target0 = document.querySelectorAll(".pp_designer_selected_box_contents_designers > label > .garim");
        target1 = document.querySelectorAll(".pp_designer_selected_box_contents_service > label > .garim");
        target2 = document.querySelectorAll(".pp_designer_selected_box_contents_selection");
        target3 = document.querySelectorAll(".pp_designer_selected_box_contents_money_input");
        for (let node of titleTarget) {
          node.addEventListener("click", designerSearch);
        }
        for (let node of target0) {
          node.addEventListener("click", fourth.events.designer);
          node.addEventListener("contextmenu", checklistEvent);
        }
        for (let node of target1) {
          if (node.getAttribute("cus_value") !== "부분 공간") {
            node.addEventListener("click", fourth.events.service);
          }
        }
        for (let node of target2) {
          node.addEventListener("click", fourth.events.popup);
        }
        for (let node of target3) {
          node.addEventListener("keyup", fourth.events.money);
          node.addEventListener("blur", fourth.events.money);
          node.addEventListener("click", fourth.events.money);
        }
      } else {
        for (let i = 0; i < instance.pastMaps[0].size; i++) {
          instance.pastMaps[0].get("box" + String(i)).style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) {
            instance.pastMaps[0].get("box" + String(i)).style.borderLeft = "1px solid " + GeneralJs.colorChip.gray2;
          }

          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragstart", fourth.events.drag);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragenter", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragleave", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("dragover", fourth.events.prevent);
          instance.pastMaps[0].get("box" + String(i)).addEventListener("drop", fourth.events.drop);

          fourth.contents.appendChild(instance.pastMaps[0].get("box" + String(i)));
          fourthChildren.set("box" + String(i), instance.pastMaps[0].get("box" + String(i)));
          instance.totalTong.fifthScrollmove["designer" + String(i)] = new Map();
        }
        titleTarget = Array.from(document.querySelectorAll(".pp_designer_selected_box_title")).filter((dom, index) => {
          return index % 4 === 0;
        });
        target0 = document.querySelectorAll(".pp_designer_selected_box_contents_designers > label > .garim");
        target1 = document.querySelectorAll(".pp_designer_selected_box_contents_service > label > .garim");
        target2 = document.querySelectorAll(".pp_designer_selected_box_contents_selection");
        target3 = document.querySelectorAll(".pp_designer_selected_box_contents_money_input");
        for (let node of titleTarget) {
          node.addEventListener("click", designerSearch);
        }
        for (let node of target0) {
          node.addEventListener("click", fourth.events.designer);
          node.addEventListener("contextmenu", checklistEvent);
        }
        for (let node of target1) {
          if (node.getAttribute("cus_value") !== "부분 공간") {
            node.addEventListener("click", fourth.events.service);
          }
        }
        for (let node of target2) {
          node.addEventListener("click", fourth.events.popup);
        }
        for (let node of target3) {
          node.addEventListener("keyup", fourth.events.money);
          node.addEventListener("blur", fourth.events.money);
          node.addEventListener("click", fourth.events.money);
        }
        for (let i = instance.pastMaps[0].size; i < num; i++) {
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          div_clone.classList.add("pp_designer_selected");
          div_clone.setAttribute("cus_id", 's' + String(i));
          div_clone.style.width = "calc(100% / " + String(num) + ")";
          if (i !== 0) {
            div_clone.style.borderLeft = "1px solid " + GeneralJs.colorChip.gray2;
          }

          for (let j = 0; j < fourth.titles.length; j++) {
            div_clone2 = GeneralJs.nodes.div.cloneNode(true);
            div_clone2.classList.add("pp_designer_selected_box");
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_title");
            div_clone3.classList.add("hoverDefault");
            div_clone3.textContent = fourth.titles[j];
            if (j === 0) {
              div_clone3.addEventListener("click", designerSearch);
            }
            div_clone2.appendChild(div_clone3);
            div_clone3 = GeneralJs.nodes.div.cloneNode(true);
            div_clone3.classList.add("pp_designer_selected_box_contents");
            (fourth.callbacks.get(fourth.titles[j]))(div_clone3, i);
            div_clone2.appendChild(div_clone3);
            div_clone.appendChild(div_clone2);
          }

          div_clone.setAttribute("draggable", "true");
          div_clone.style.cursor = "pointer";

          div_clone.addEventListener("dragstart", fourth.events.drag);
          div_clone.addEventListener("dragenter", fourth.events.prevent);
          div_clone.addEventListener("dragleave", fourth.events.prevent);
          div_clone.addEventListener("dragover", fourth.events.prevent);
          div_clone.addEventListener("drop", fourth.events.drop);

          //remember value
          div_clone4 = GeneralJs.nodes.div.cloneNode(true);
          div_clone4.classList.add("pp_designer_selected_box_value");
          //------------------------------------------------------------------------
          if (obj.proposal !== undefined) {
            general_string = '';
            for (let k of obj.proposal[i].pictureSettings) {
              general_string += GeneralJs.tagCoverting(k)  + "__split3__";
            }
            for (let k = 0; k < obj.proposal[i].description.length; k++) {
              general_string += "description" + String(k) + "__split2__" + obj.proposal[i].description[k] + "__split1__";
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

    let removeAll = function (e) {
      if (instance.fourthChildren instanceof Map) {
        instance.below_launching("fourth", "off");
        instance.pastMaps.unshift(new Map());
        instance.fourthChildren.forEach(function (value, key, map) {
          instance.pastMaps[0].set(key, value.cloneNode(true));
          value.remove();
        });
        instance.fourthChildren = {};
        instance.totalTong.fifthScrollmove = {};
        fourthChildren = {};
        fourth.box.style.display = "";
        fourth.title.style.color = "";
        fourth.contents.style.background = "";
        fourth.contents.style.border = "";
        fourth.contents.style.borderRadius = "";
        fourth.contents.style.padding = "";
        for (let i = 0; i < 3; i++) { instance.thirdChildren.get("box" + String(i)).style.opacity = ""; }
        document.querySelector("#pp_designer_question_input").focus();
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
      this.thirdChildren.get("box" + String(i)).style.opacity = String(0);
    }
    setTimeout_func = await this.fourthsetTimeout(num, {}, false);
    ProposalJs.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e.message).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

// Create process 5 ------------------------------------------------------------

ProposalJs.prototype.fifthWhitesave = function (id) {
  const instance = this;
  return function (e) {
    let pictures, descriptions, targetBoxes;
    let obj, general_str;

    obj = {};
    pictures = document.querySelectorAll(".ppw_left_picturebox_inbox_detail");
    descriptions = document.querySelectorAll(".ppw_left_description_inbox_input");
    targetBoxes = document.querySelectorAll(".pp_designer_selected");
    general_str = '';

    for (let pic of pictures) {
      general_str += pic.getAttribute("cus_info") + "__split1__" + "styleText" + "__split2__" + pic.style.cssText.replace((new RegExp(S3HOST, "gi")), '') + "__split3__";
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

ProposalJs.prototype.fifthWhiteup = function (whitebox, contents, id, ghost, pictureSettings, desid) {
  const instance = this;
  const mother = whitebox;
  const { createNode, withOut, colorChip, ajaxJson, cleanChildren } = GeneralJs;
  const ea = "px";
  let whiteBoxDom = new Map();
  let div_clone, div_clone2, div_clone3, div_clone4, div_clone5, scroll_box, input_clone, label_clone, img_clone, img_clone2;
  let leftArea, rightArea;
  let leftMother, rightMother;
  let style;

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
  let leftList = [ "title", "picturebox", "description" ];
  let target_value = document.querySelectorAll(".pp_designer_selected");
  let values;
  if (target_value[id] === undefined) {
    values = '';
  } else {
    values = target_value[id].querySelector(".pp_designer_selected_box_value").textContent;
  }

  // Default 0
  let descriptions = pictureSettings[0].description;
  let default_setting = pictureSettings[0].photo;

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
        if (/url/.test(default_setting[i].styleText)) {
          div_clone.style.cssText = default_setting[i].styleText.replace(/url\(\"/g, "url(\"" + S3HOST);
        } else {
          div_clone.style.cssText = default_setting[i].styleText;
        }
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
      createNode({
        mother: dom,
        attribute: {
          desid: desid,
          index: String(0),
        },
        event: {
          mouseenter: function (e) {
            this.firstChild.style.color = colorChip.whiteGreen;
          },
          mouseleave: function (e) {
            this.firstChild.style.color = colorChip.whiteBlack;
          },
          selectstart: (e) => { e.preventDefault() },
          click: async function (e) {
            try {
              const desid = this.getAttribute("desid");
              const index = Number(this.getAttribute("index"));
              if (instance.proposalGeneration[desid] === undefined) {
                instance.proposalGeneration[desid] = await ajaxJson({ desid, index }, "/proposalGeneration", { equal: true });
              }
              const length = instance.proposalGeneration[desid].length;
              const pictureSettings = length === 0 ? null : instance.proposalGeneration[desid][index % length];
              const tong = document.querySelector(".ppw_left_picturebox_inbox");
              let factor;

              if (pictureSettings !== null) {
                cleanChildren(tong);
                for (let i = 0; i < pictureSettings.length; i++) {
                  factor = GeneralJs.nodes.div.cloneNode(true);
                  factor.setAttribute("cus_info", GeneralJs.tagCoverting(pictureSettings[i]));
                  factor.classList.add("fifth_drag_img");
                  factor.classList.add("ppw_left_picturebox_inbox_detail");
                  if (pictureSettings[i].unionPo !== "union") {
                    factor.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
                  } else if (pictureSettings[i].unionPo === "union") {
                    factor.addEventListener("click", ProposalJs.fifthPicturebox_split(), { once: true });
                  }
                  if (/url/.test(pictureSettings[i].styleText)) {
                    factor.style.cssText = pictureSettings[i].styleText.replace(/url\(\"/g, "url(\"" + S3HOST);
                  } else {
                    factor.style.cssText = pictureSettings[i].styleText;
                  }
                  tong.appendChild(factor);
                }
                this.setAttribute("index", String(index + 1));
              }

            } catch (e) {
              console.log(e);
            }
          },
          contextmenu: async function (e) {
            e.preventDefault();
            try {
              const desid = this.getAttribute("desid");
              const index = Number(this.getAttribute("index"));
              if (instance.proposalGeneration[desid] === undefined) {
                instance.proposalGeneration[desid] = await ajaxJson({ desid, index }, "/proposalGeneration", { equal: true });
              }
              const length = instance.proposalGeneration[desid].length;
              const pictureSettings = length === 0 ? null : instance.proposalGeneration[desid][index % length];
              const tong = document.querySelector(".ppw_left_picturebox_inbox");
              let factor;

              if (pictureSettings !== null) {
                cleanChildren(tong);
                for (let i = 0; i < pictureSettings.length; i++) {
                  factor = GeneralJs.nodes.div.cloneNode(true);
                  factor.setAttribute("cus_info", GeneralJs.tagCoverting(pictureSettings[i]));
                  factor.classList.add("fifth_drag_img");
                  factor.classList.add("ppw_left_picturebox_inbox_detail");
                  if (pictureSettings[i].unionPo !== "union") {
                    factor.addEventListener("click", ProposalJs.fifthPicturebox_union(), { once: true });
                  } else if (pictureSettings[i].unionPo === "union") {
                    factor.addEventListener("click", ProposalJs.fifthPicturebox_split(), { once: true });
                  }
                  if (/url/.test(pictureSettings[i].styleText)) {
                    factor.style.cssText = pictureSettings[i].styleText.replace(/url\(\"/g, "url(\"" + S3HOST);
                  } else {
                    factor.style.cssText = pictureSettings[i].styleText;
                  }
                  tong.appendChild(factor);
                }
                if (index - 1 < 0) {
                  this.setAttribute("index", String(0));
                } else {
                  this.setAttribute("index", String(index - 1));
                }
              }

            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "flex",
          position: "absolute",
          bottom: "calc(calc(" + String(28) + ea + " + " + String(3.2) + "vh" + ")" + " + " + String(7) + "px" + ")",
          right: String(21) + ea,
          width: String(54) + ea,
          height: String(28) + ea,
          background: colorChip.green,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: String(4) + "px",
          paddingBottom: String(3) + ea,
        },
        child: {
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          text: "발생",
          style: {
            position: "relative",
            fontSize: String(14) + ea,
            fontWeight: String(600),
            color: colorChip.whiteBlack,
            top: String(0) + ea,
          }
        }
      });

      createNode({
        mother: dom,
        attribute: {
          desid: desid,
          index: String(0),
        },
        event: {
          mouseenter: function (e) {
            this.firstChild.style.color = colorChip.whiteGreen;
          },
          mouseleave: function (e) {
            this.firstChild.style.color = colorChip.whiteBlack;
          },
          selectstart: (e) => { e.preventDefault() },
          click: async function (e) {
            try {
              const desid = this.getAttribute("desid");
              GeneralJs.blankHref(BACKHOST + "/designer?mode=normal&desid=" + desid + "&whitecardmode=proposal");
            } catch (e) {
              console.log(e);
            }
          },
        },
        style: {
          display: "flex",
          position: "absolute",
          bottom: "calc(calc(" + String(56) + ea + " + " + String(3.2) + "vh" + ")" + " + " + String(14) + "px" + ")",
          right: String(21) + ea,
          width: String(54) + ea,
          height: String(28) + ea,
          background: colorChip.green,
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: String(4) + "px",
          paddingBottom: String(3) + ea,
        },
        child: {
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          text: "제안서",
          style: {
            position: "relative",
            fontSize: String(14) + ea,
            fontWeight: String(600),
            color: colorChip.whiteBlack,
            top: String(0) + ea,
          }
        }
      });

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
  };
  let imgSrc, sgTrue;
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.classList.add("ppw_right_totalbox");

  for (let j = 0; j < (contents.length + ghost.length); j++) {
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("ppw_right_set");

    leftArea = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      bottom: String(25) + ea,
      left: String(0) + ea,
      opacity: String(0),
      height: String(184) + ea,
      width: String(42) + ea,
      zIndex: String(1),
      cursor: "w-resize",
    };
    for (let s in style) {
      leftArea.style[s] = style[s];
    }
    // leftArea.addEventListener("mouseover", this.fifthScrollX("mousedown", { direction: "left", order: j, id: id, }));
    // leftArea.addEventListener("mouseleave", this.fifthScrollX("mouseout", { direction: "left", order: j, id: id, }));
    div_clone2.appendChild(leftArea);


    rightArea = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      bottom: String(25) + ea,
      right: String(0) + ea,
      opacity: String(0),
      height: String(184) + ea,
      width: String(42) + ea,
      zIndex: String(1),
      cursor: "e-resize",
    };
    for (let s in style) {
      rightArea.style[s] = style[s];
    }
    // rightArea.addEventListener("mouseover", this.fifthScrollX("mousedown", { direction: "right", order: j, id: id, }));
    // rightArea.addEventListener("mouseleave", this.fifthScrollX("mouseout", { direction: "right", order: j, id: id, }));
    div_clone2.appendChild(rightArea);


    for (let i = 0; i < rightList.length; i++) {
      div_clone3 = GeneralJs.nodes.div.cloneNode(true);
      div_clone3.classList.add("ppw_right_" + rightList[i]);

      //title
      if (i === 0) {
        if (j < contents.length) {
          div_clone3.textContent = contents[j].contents.portfolio.pid + " : " + contents[j].contents.portfolio.spaceInfo.space + " " + String(contents[j].contents.portfolio.spaceInfo.pyeong) + "py";
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
        if (j < contents.length) {
          for (let k = 0; k < contents[j].photos.detail.length; k++) {
            div_clone4 = GeneralJs.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + contents[j].photos.detail[k].gs);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = "/corePortfolio/listImage/" + contents[j].contents.portfolio.pid + "/t" + String(k + 1) + contents[j].contents.portfolio.pid + ".jpg";
            sgTrue = contents[j].photos.detail[k].gs;
            img_clone.setAttribute("src", S3HOST + imgSrc);
            img_clone.setAttribute("cus_info", GeneralJs.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
            img_clone.setAttribute("draggable", "true");
            div_clone4.appendChild(img_clone);
            scroll_box.appendChild(div_clone4);
            if (contents[j].photos.detail[k].gs === 's') {
              sgTong.s.push(contents[j].photos.detail[k].gs);
            } else {
              sgTong.g.push(contents[j].photos.detail[k].gs);
            }
          }
        } else {

          for (let k = 0; k < ghost[j - contents.length].length; k++) {
            div_clone4 = GeneralJs.nodes.div.cloneNode(true);
            div_clone4.classList.add("ppw_right_picturebox_" + ghost[j - contents.length][k].sgTrue);
            div_clone4.id = "ppw_right_picturebox_totaldiv" + String(j) + String(k);
            img_clone = GeneralJs.nodes.img.cloneNode(true);
            img_clone.classList.add("ppw_right_picturebox_img");
            img_clone.classList.add("fifth_drag_img");
            imgSrc = ghost[j - contents.length][k].link;
            sgTrue = ghost[j - contents.length][k].sgTrue;
            img_clone.setAttribute("src", S3HOST + imgSrc);
            img_clone.setAttribute("cus_info", GeneralJs.tagCoverting({ imgSrc: imgSrc, sgTrue: sgTrue }));
            img_clone.setAttribute("draggable", "true");
            div_clone4.appendChild(img_clone);
            scroll_box.appendChild(div_clone4);

            if (ghost[j - contents.length][k].sgTrue === 's') {
              sgTong.s.push(ghost[j - contents.length][k].sgTrue);
            } else {
              sgTong.g.push(ghost[j - contents.length][k].sgTrue);
            }
          }

        }
        scroll_box.style.width = String((125 * (sgTong.s.length)) + (238 * (sgTong.g.length))) + "px";
        div_clone3.appendChild(scroll_box);
      }

      //buttonup
      else if (i === 2) {
        img_clone2 = SvgTong.stringParsing(instance.mother.returnArrow("left", GeneralJs.colorChip.greenWhite));
        img_clone2.classList.add("ppw_right_buttonup_img_left");
        div_clone3.appendChild(img_clone2);

        img_clone2 = SvgTong.stringParsing(instance.mother.returnArrow("right", GeneralJs.colorChip.greenWhite));
        img_clone2.classList.add("ppw_right_buttonup_img_right");
        div_clone3.appendChild(img_clone2);

        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add("ppw_right_buttonup_div_left");
        div_clone4.addEventListener("click", this.fifthScrollX("click", { direction: "left", order: j, id: id, }));
        // div_clone4.addEventListener("mousedown", this.fifthScrollX("mousedown", { direction: "left", order: j, id: id, }));
        // div_clone4.addEventListener("mouseup", this.fifthScrollX("mouseup", { direction: "left", order: j, id: id, }));
        // div_clone4.addEventListener("mouseleave", this.fifthScrollX("mouseleave", { direction: "left", order: j, id: id, }));
        // div_clone4.addEventListener("mouseout", this.fifthScrollX("mouseout", { direction: "left", order: j, id: id, }));

        div_clone3.appendChild(div_clone4);
        div_clone4 = GeneralJs.nodes.div.cloneNode(true);
        div_clone4.classList.add("ppw_right_buttonup_div_right");
        div_clone4.addEventListener("click", this.fifthScrollX("click", { direction: "right", order: j, id: id, }));
        // div_clone4.addEventListener("mousedown", this.fifthScrollX("mousedown", { direction: "right", order: j, id: id, }));
        // div_clone4.addEventListener("mouseup", this.fifthScrollX("mouseup", { direction: "right", order: j, id: id, }));
        // div_clone4.addEventListener("mouseleave", this.fifthScrollX("mouseleave", { direction: "right", order: j, id: id, }));
        // div_clone4.addEventListener("mouseout", this.fifthScrollX("mouseout", { direction: "right", order: j, id: id, }));

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
        result = Math.abs(974 - left) - 600;
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
          result = Math.abs(830 - left) - 100;
        } else {
          result = 830 - left;
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
  const { ea } = this;
  const { returnGet, withOut } = GeneralJs;
  let popupDom;
  let ghost;
  let designer;
  let contents;

  popupDom = new Map();
  designer = this.designers.pick(desid);
  contents = await GeneralJs.ajaxJson("noFlat=true&where=" + JSON.stringify({ desid: designer.desid }), "/getContents");
  ghost = await GeneralJs.ajaxJson("desid=" + designer.desid, "/getDesignerGhost");
  ghost.push(designer.setting.ghost);

  return function () {
    let div_clone;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_fifth_cancelback");
    div_clone.addEventListener("click", instance.fifthWhitesave(id));
    total.appendChild(div_clone);

    popupDom.set("cancelBack", div_clone);
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("pp_fifth_whitebox");
    if (returnGet().dataonly === "true" && returnGet().entire === "true") {
      div_clone.style.width = withOut(0, ea);
      div_clone.style.height = withOut(0, ea);
    }
    div_clone.setAttribute("cus_designer", designer.designer);
    div_clone.setAttribute("cus_desid", designer.desid);
    div_clone.setAttribute("cus_boxid", String(id));
    total.appendChild(div_clone);

    popupDom.set("whiteBox", div_clone);
    instance.fifthWhiteup(div_clone, contents, id, ghost, designer.setting.proposal, desid);
    instance.fifthChildren = popupDom;
  }
}

ProposalJs.fifthDrag_funcs = function () {
  const dragstart_event = function (e) {
    e.dataTransfer.setData("sun", this.getAttribute("cus_info"));
  }
  const dragend_event = function (e) {
    this.style.opacity = "";
  }
  const dragenter_event = function (e) {
    this.style.opacity = "0.4";
  }
  const dragleave_event = function (e) {
    this.style.opacity = "";
  }
  const dragover_event = function (e) {
    e.preventDefault();
  }
  const drop_event = function (e) {
    e.preventDefault();
    if (e.target.nodeName === "DIV") {
      let data = GeneralJs.tagParsing(e.dataTransfer.getData("sun"));
      let jari = GeneralJs.tagParsing(this.getAttribute("cus_info"));
      if (jari.sgTrue === data.sgTrue) {
        this.style.backgroundImage = "url('" + S3HOST + data.imgSrc + "')";
        jari.imgSrc = data.imgSrc;
        this.setAttribute("cus_info", GeneralJs.tagCoverting(jari));
      }
    }
    this.style.opacity = "";
  }

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

ProposalJs.prototype.list_initial = function () {
  const instance = this;
  const mother = this.listPannel;

  let div_clone, div_clone2;
  let classes, mapname;

  classes = [ "listpp_leftBar", "listpp_mainArea" ];
  mapname = [ "제안 현황", "메인 리스트" ];

  for (let i = 0; i < classes.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add(classes[i]);
    mother.appendChild(div_clone);
    this.list_domBox.set(mapname[i], div_clone);
  }

}

ProposalJs.prototype.list_searchBar = async function () {
  const instance = this;
  try {
    let parent, input_clone;

    parent = this.mother.searchInput.parentNode;
    input_clone = this.mother.searchInput.cloneNode(true);
    input_clone.setAttribute("placeholder", "제안서 검색...");
    this.mother.searchInput.style.display = "none";

    GeneralJs.events["proposalListSearch"] = async function (e) {
      let parent;
      let entireList;
      let svg_icon;
      let style;
      let ea = "px";
      let width;

      if (e.key === "Enter") {

        entireList = [ "전체", "모두", "all" ];

        parent = instance.list_domBox.get("메인 리스트");
        while (parent.firstChild) {
          parent.removeChild(parent.lastChild);
        }

        width = 50;
        svg_icon = instance.mother.returnLoadingIcon();
        style = {
          width: String(width) + ea,
          height: String(width) + ea,
          top: 'calc(50% - ' + String((width / 2) + 20) + ea + ')',
          left: 'calc(50% - ' + String(width / 2) + ea + ')',
        }
        for (let i in style) {
          svg_icon.style[i] = style[i];
        }
        parent.appendChild(svg_icon);

        if (this.value !== '' && !entireList.includes(this.value) && !/^[0-9]/.test(this.value)) {
          if (/^p/.test(this.value)) {
            await instance.list_mainArea({ target: "project", value: this.value });
          } else {
            await instance.list_mainArea({ target: "client", value: this.value });
          }

        } else if (entireList.includes(this.value)) {
            await instance.list_mainArea({ target: "client", value: '.' });

        } else if (/^[0-9]/.test(this.value)) {
            await instance.list_mainArea(null, Number(this.value.replace(/[^0-9]/g, '')));

        } else {
          await instance.list_mainArea();
        }

      }
    }

    input_clone.addEventListener("keypress", GeneralJs.events["proposalListSearch"]);
    parent.appendChild(input_clone);
    this.listSearchInput = input_clone;
    this.listSearchInput.focus();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProposalJs.prototype.list_leftBar = function (obj) {
  const instance = this;
  const parent = this.list_domBox.get("제안 현황");
  const { projects, designers } = obj;
  try {
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }

    let div_clone, div_clone2;
    let desid_numbers = {};

    for (let i of Object.keys(designers)) {
      desid_numbers[i] = 0;
    }

    for (let i of projects) {
      for (let j of i.proposal.detail) {
        desid_numbers[j.desid] = desid_numbers[j.desid] + 1;
      }
    }

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_leftBar_totalbox");
    for (let i = 0; i < Object.keys(designers).length; i++) {

      //designer id
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_leftBar_detail_id");
      div_clone2.textContent = Object.keys(designers)[i];
      div_clone.appendChild(div_clone2);

      //designer name
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_leftBar_detail");
      div_clone2.textContent = designers[Object.keys(designers)[i]];
      div_clone.appendChild(div_clone2);

      //designer number
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_leftBar_detail_num");
      div_clone2.textContent = String(desid_numbers[Object.keys(designers)[i]]);
      div_clone.appendChild(div_clone2);
    }

    parent.appendChild(div_clone);
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProposalJs.prototype.list_mainArea = async function (searchQuery = null, limit = 100) {
  const instance = this;
  try {
    let projectList;
    let clients;
    let designers;
    let designersObj;
    let number;
    let serviceMap, xValueMap;
    let temp;
    let retry = false;

    serviceMap = new Map();
    xValueMap = new Map();

    serviceMap.set("s2011_aa01s", "홈퍼니싱");
    serviceMap.set("s2011_aa02s", "홈스타일링");
    serviceMap.set("s2011_aa03s", "토탈 스타일링");
    serviceMap.set("s2011_aa04s", "설계 변경");

    xValueMap.set("M", "mini");
    xValueMap.set("B", "basic");
    xValueMap.set("P", "premium");

    designers = this.designers;
    designersObj = {};
    for (let d of designers) {
      designersObj[d.desid] = d.designer;
    }

    if (searchQuery === null) {
      projectList = await GeneralJs.ajaxJson({ noFlat: true, limit }, "/getProjects");
      clients = await GeneralJs.ajaxJson({ noFlat: true, whereQuery: {
        $or: projectList.map((obj) => { return { cliid: obj.cliid } })
      } }, "/getClients");
      number = 0;
      for (let p of projectList) {
        p.serviceName = `${serviceMap.get(p.service.serid)} ${xValueMap.get(p.service.xValue)}`;
        for (let i of clients) {
          if (p.cliid === i.cliid) {
            p.client = i.name;
            p.status = i.requests[0].analytics.response.status;
            number++;
          }
        }
      }
      if (projectList.length !== number) {
        throw new Error("project client limit number error");
      }
    } else {
      if (searchQuery.target === undefined || searchQuery.value === undefined) {
        throw new Error("invaild query");
      }

      if (searchQuery.target === "project") {
        projectList = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + searchQuery.value, "/searchProjects"));
        for (let p of projectList) {
          clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + p.cliid, "/searchClients"));
          p.client = clients[0].name;
          p.status = clients[0].requests[0].analytics.response.status;
          p.serviceName = `${serviceMap.get(p.service.serid)} ${xValueMap.get(p.service.xValue)}`;
        }
      } else if (searchQuery.target === "client") {
        clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + searchQuery.value, "/searchClients"));
        projectList = [];
        for (let c of clients) {
          temp = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + c.cliid, "/searchProjects"));
          for (let t of temp) {
            t.client = c.name;
            t.status = c.requests[0].analytics.response.status;
            t.serviceName = `${serviceMap.get(t.service.serid)} ${xValueMap.get(t.service.xValue)}`;
            projectList.push(t);
          }
        }
      } else {
        throw new Error("invaild query target");
      }

      if (projectList.length === 0) {
        GeneralJs.stacks["proposalListSearchResult"] = null;
        alert("결과가 없습니다.");
        retry = true;
      }

    }

    if (!retry) {
      projectList.sort((a, b) => { return GeneralJs.idOrderDecode(a.proid) - GeneralJs.idOrderDecode(b.proid); });
      this.list_mainAreaContents(this.list_domBox.get("메인 리스트"), projectList, designersObj);
    } else {
      this.list_mainArea();
    }

  } catch (e) {
    GeneralJs.ajax("message=ProposalJs.prototype.list_mainArea 문제 생김 : " + e.message + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProposalJs.prototype.list_mainAreaContents = function (parent, proposal_list_raw, designer_names_obj) {
  const instance = this;
  const ea = "px";
  let details = [ "_id", "_name", "_details", "_progress" ];
  let details_list = [];
  let info_object_arr = [];
  let div_clone, div_clone2, proposal_obj, general_string, proposal_obj_new;
  let cliidArr;
  let rowDoms;
  let motherDom, proidDom, nameDom;

  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }

  cliidArr = proposal_list_raw.map((obj) => { return obj.cliid; });

  for (let i = 0; i < proposal_list_raw.length; i++) {
    proposal_obj_new = [];
    proposal_obj = proposal_list_raw[i];

    proposal_obj_new.push(proposal_obj.proid);
    proposal_obj_new.push(proposal_obj.client);

    general_string = '';
    general_string = proposal_obj.serviceName + "<b> | </b>";

    for (let obj of proposal_obj.proposal.detail) {
      general_string += designer_names_obj[obj.desid] + ' <b style="display:none">' + obj.desid + '</b>';
      general_string += ' : ';
      for (let obj2 of obj.fee) {
        general_string += (obj2.method === "offline") ? "오프" : "온";
        general_string += ' ';
        general_string += String(obj2.amount / 10000) + "만원";
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
    proposal_obj_new.push(proposal_obj.proposal.status);

    info_object_arr.unshift({
      proid: proposal_obj.proid,
      client: proposal_obj.client,
      cliid: proposal_obj.cliid,
      service: proposal_obj.serviceName,
      proposal: proposal_obj.proposal.detail,
    });

    proposal_obj_new.push(proposal_obj.status);
    details_list.unshift(proposal_obj_new);
  }

  rowDoms = [];
  for (let i = 0; i < details_list.length; i++) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_mainArea_tong");
    div_clone.setAttribute("cus_id", details_list[i][0]);
    div_clone.setAttribute("cus_status", details_list[i][details_list[i].length - 1]);
    for (let j = 0; j < details.length; j++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      if ((j === 0 || j === 1) && /드/gi.test(details_list[i][details_list[i].length - 1])) {
        div_clone2.style.color = GeneralJs.colorChip.deactive;
      }
      div_clone2.classList.add("listpp_mainArea_tong" + details[j]);
      if (j === 1 || j === 2) {
        div_clone2.addEventListener("click", this.load_initevent());
      } else if (j === 3) {
        div_clone2.setAttribute("proid", info_object_arr[i].proid);
        div_clone2.setAttribute("cliid", info_object_arr[i].cliid);
        div_clone2.addEventListener("click", this.list_menu());
        div_clone2.addEventListener("contextmenu", this.list_menu());
      }
      div_clone2.insertAdjacentHTML("beforeend", details_list[i][j]);
      div_clone.appendChild(div_clone2);
    }
    div_clone.insertAdjacentHTML("beforeend", '<section style="display:none;">' + JSON.stringify(info_object_arr[i]) + '</section>');
    rowDoms.push(div_clone);
    parent.appendChild(div_clone);
  }

  this.list_leftBar({ projects: proposal_list_raw, designers: designer_names_obj });
}

ProposalJs.prototype.list_menu = function () {
  const instance = this;
  return async function (e) {
    if (e.cancelable) {
      e.preventDefault();
    }
    const self = this;
    let div_clone, div_clone2, div_clone3;
    let list = [
      { key: "pending", name: "작성중", },
      { key: "complete", name: "완료", },
      { key: "send", name: "즉시 발송", },
      { key: "confirm", name: "미리보기", },
    ];
    // style
    this.style.color = GeneralJs.colorChip.green;

    // cancel
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_menu_cancelback");
    div_clone.addEventListener("click", function (e) {
      this.nextElementSibling.remove();
      this.remove();
      self.style.color = "";
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
      div_clone2.addEventListener("click", await instance.list_menuEvents(i, self, this.parentElement.getAttribute("cus_id")));
      div_clone.appendChild(div_clone2);
    }
    this.parentElement.appendChild(div_clone);
  }
}

ProposalJs.prototype.list_menuEvents = async function (obj, mother, proid) {
  const instance = this;
  let return_func;
  async function mother_name(o) {
    mother.textContent = o.name;
    await GeneralJs.ajaxPromise("where=" + JSON.stringify({ proid: proid }) + "&target=proposal.status&updateValue=" + o.name, "/rawUpdateProject");
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
        GeneralJs.blankHref(FRONTHOST + "/proposal.php?proid=" + proid + "&mode=test&update=true");
        reset_event(this);
      }
      break;
    case "send":
      return_func = async function (e) {
        const that = this;
        if (/드/gi.test(this.parentElement.parentElement.getAttribute("cus_status"))) {
          window.alert("해당 고객은 드랍 처리되어 발송할 수 없습니다!");
          reset_event(that);
        } else {
          if (window.confirm("추천서를 발송할까요?")) {
            await GeneralJs.ajaxJson({
              instant: true,
              proid: proid,
            }, "/createProposalDocument");
            window.alert(`추천서가 발송되었습니다!`);
            await mother_name(obj);
            reset_event(that);
          } else {
            reset_event(that);
          }
        }
      }
      break;
    case "complete":
      return_func = async function (e) {
        // await GeneralJs.ajaxPromise("where=" + JSON.stringify({ proid: proid }) + "&target=proposal.date&updateValue=today", "/rawUpdateProject");
        await mother_name(obj);
        reset_event(this);
      }
      break;
  }
  return return_func;
}

ProposalJs.prototype.list_launching = async function () {
  const instance = this;
  let father = this.listPannel;
  while (father.firstChild) {
    father.removeChild(father.lastChild);
  }

  this.list_initial();
  await this.list_searchBar();
  await this.list_mainArea();
}

ProposalJs.prototype.load_initevent = function (noBlink = false) {
  const instance = this;
  const { returnGet } = GeneralJs;
  const getObj = returnGet();
  return function (e) {
    if (instance.toggleSetting.listCreate === 1) {
      let obj = JSON.parse(this.parentElement.querySelector("section").textContent);
      let button0 = document.getElementById("blewpp_button0");
      let button1 = document.getElementById("blewpp_button1");
      let mother = instance.createPannel;
      let father = instance.listPannel;
      if (!noBlink) {
        if (getObj.dataonly !== "true") {
          father.classList.add("listpp_fadeout");
          father.classList.remove("listpp_fadein");
          mother.classList.remove("listpp_fadeout");
          mother.classList.add("listpp_fadein");
        }
      }
      father.style.zIndex = "-1";
      instance.toggleSetting.listCreate = 0;

      ProposalJs.toggleTimeout.load_init = setTimeout(function () {
        father.style.display = "";
        father.style.transform = "";
        father.style.opacity = "";
        while (father.firstChild) {
          father.removeChild(father.lastChild);
        }
        let button2 = document.getElementById("blewpp_button2");
        let button3 = document.getElementById("blewpp_button3");
        button2.removeEventListener("click", ProposalJs.below_events.first.b2);
        button2.removeEventListener("click", ProposalJs.below_events.second.b2);
        button2.removeEventListener("click", ProposalJs.below_events.third.b2);
        button2.removeEventListener("click", ProposalJs.below_events.fourth.b2);
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
  for (let input of inputs) {
    input.checked = false;
  }
  inputs = this.domBox.get("서비스 선택").querySelectorAll("input");
  for (let input of inputs) {
    input.checked = false;
  }

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
    this.fourthChildren = {};
    let fourth = {};
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
  this.domBox.get("서비스 선택").children[0].style.color = GeneralJs.colorChip.black;
  this.domBox.get("서비스 선택").children[1].style.background = GeneralJs.colorChip.gray0;
  this.domBox.get("서비스 선택").style.height = "calc(calc(100% / 3) - 21px)";
  this.domBox.get("서비스 선택").style.borderBottom = "";
  // this.domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
  this.domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";
  for (let i of service) {
    i.style.opacity = "";
    i.style.background = GeneralJs.colorChip.white;
    i.children[0].style.color = GeneralJs.colorChip.green;
    i.children[0].style.fontSize = "1.7vh";
  }
  for (let i = 0; i < 4; i++) { service[i].children[0].style.marginTop = "-2px"; }
  for (let i = 4; i < 8; i++) { service[i].children[0].style.marginTop = "-4px"; }
  for (let i = 8; i < 12; i++) { service[i].children[0].style.marginTop = "-6px"; }
  let service_input = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
  for (let i of service_input) {
    if (i.checked) {
      i.nextElementSibling.style.background = GeneralJs.colorChip.green;
      i.nextElementSibling.children[0].style.color = GeneralJs.colorChip.white;
    }
  }
  this.domBox.get("디자이너 선택").style.height = "calc(calc(100% / 3) - 21px)";
  this.domBox.get("디자이너 선택").children[1].style.height = "calc(90% - 10px)";
  this.domBox.get("디자이너 선택").children[1].style.marginTop = "10px";

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
  this.domBox.get("고객 선택").style.height = "calc(calc(100% / 3) - 21px)";
  this.domBox.get("고객 선택").style.borderBottom = "";
  this.domBox.get("서비스 선택").style.height = "calc(calc(100% / 3) - 21px)";
  this.domBox.get("서비스 선택").children[1].style.height = "calc(90% - 10px)";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "10px";
  let service2 = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  for (let i of service2) {
    i.style.background = "";
    i.children[0].style.color = "";
    i.children[0].style.fontSize = "";
    i.children[0].style.marginTop = "";
  }
  this.domBox.get("고객 선택").children[0].style.color = GeneralJs.colorChip.black;
  this.domBox.get("고객 선택").children[1].style.background = GeneralJs.colorChip.gray0;

  this.toggleSetting.first = 0;
  this.toggleSetting.second = 0;
  this.toggleSetting.third = 0;
  this.toggleSetting.fourth = 0;

  this.pastMaps = [];

  if (obj.cliid !== undefined) {
    ProposalJs.toggleTimeout.load_zero = setTimeout(this.load_processLoad(obj), 500);
    clearTimeout(ProposalJs.toggleTimeout.load_init_in);
    clearTimeout(ProposalJs.toggleTimeout.load_init);
  }
}

ProposalJs.prototype.load_processLoad = function (obj) {
  const instance = this;
  return function () {
    instance.toggleSetting.load = 1;
    instance.load_processLoad_first(obj);
    instance.load_processLoad_second(obj, instance.load_processLoad_third());
  }
}

ProposalJs.prototype.load_processLoad_first = function (obj) {
  const instance = this;

  clearTimeout(ProposalJs.toggleTimeout.load_zero);
  this.domBox.get("고객 선택").style.height = "3.2vh";
  this.domBox.get("고객 선택").style.borderBottom = "1px solid " + GeneralJs.colorChip.gray2;

  this.domBox.get("서비스 선택").style.height = "calc(69.5% - 3.2vh - 63px)";
  this.domBox.get("서비스 선택").children[1].style.height = "calc(90% + 0.9vh)";
  this.domBox.get("서비스 선택").children[1].style.marginTop = "-0.9vh";

  let service = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  for (let i of service) {
    i.style.background = GeneralJs.colorChip.white;
    i.children[0].style.color = GeneralJs.colorChip.green;
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

  let service_input = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll("input");
  for (let i of service_input) {
    if (i.checked) {
      i.nextElementSibling.style.background = GeneralJs.colorChip.green;
      i.nextElementSibling.children[0].style.color = GeneralJs.colorChip.white;
    }
  }
  this.domBox.get("고객 선택").children[0].style.color = GeneralJs.colorChip.green;
  this.domBox.get("고객 선택").children[1].style.background = GeneralJs.colorChip.white;
  if (document.querySelector("#pp_title_sub_b")) {
    document.querySelector("#pp_title_sub_b").remove();
  }
  this.domBox.get("고객 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title_sub_b" cus_id="' + obj.cliid + '" style="color:' + GeneralJs.colorChip.green + ';font-weight:300"> : ' + obj.client + '</b>');
  this.cliid = obj.cliid;
  GeneralJs.ajaxJson({ noFlat: true, whereQuery: { cliid: obj.cliid } }, "/getClients", { equal: true }).then((clients) => {
    instance.client = clients[0];
  }).catch((err) => {
    console.log(err);
  });
  this.toggleSetting.first = 1;
}

ProposalJs.prototype.load_processLoad_second = function (obj, third) {
  const instance = this;

  let e = {};
  let labels = document.querySelectorAll(".pp_clients_label");
  for (let lbj of labels) {
    if (lbj.getAttribute("cus_value") === obj.service) {
      e.target = lbj.querySelector("div");
    }
  }
  let service = this.domBox.get("서비스 선택").children[1].children[0].querySelectorAll(".pp_service");
  for (let i of service) {
    i.style.background = GeneralJs.colorChip.white;
    i.children[0].style.color = GeneralJs.colorChip.green;
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
  let target0 = e.target.parentNode.parentNode;
  let target1 = e.target.parentNode.parentNode.children[0];

  target0.style.background = GeneralJs.colorChip.green;
  target1.style.color = GeneralJs.colorChip.white;

  ProposalJs.toggleTimeout.load_second = setTimeout(function () {
    instance.domBox.get("서비스 선택").children[0].style.color = GeneralJs.colorChip.green;
    instance.domBox.get("서비스 선택").children[1].style.background = GeneralJs.colorChip.white;
    if (document.querySelector("#pp_title2_sub_b")) {
      document.querySelector("#pp_title2_sub_b").remove();
    }
    instance.domBox.get("서비스 선택").children[0].insertAdjacentHTML('beforeend', '<b id="pp_title2_sub_b" cus_id="' + e.target.parentElement.getAttribute("cus_value") + '" style="color:' + GeneralJs.colorChip.green + ';font-weight:300"> : ' + e.target.parentElement.getAttribute("cus_value") + '</b>');
    instance.serid = e.target.parentElement.getAttribute("serid");
    instance.xValue = e.target.parentElement.getAttribute("xValue");
    instance.domBox.get("서비스 선택").style.height = "3.2vh";
    instance.domBox.get("서비스 선택").style.borderBottom = "1px solid " + GeneralJs.colorChip.gray2;
    for (let i of service) {
      i.style.opacity = "0";
    }
    instance.domBox.get("서비스 선택").children[1].style.height = "calc(90% - 10px)";
    instance.domBox.get("서비스 선택").children[1].style.marginTop = "10px";
    instance.domBox.get("디자이너 선택").style.height = "calc(100% - 6.4vh - 63px)";
    instance.domBox.get("디자이너 선택").children[1].style.height = "calc(90% + " + String(GeneralJs.returnGet().dataonly === "true" ? 4.4 : 2.7) + "vh)";
    instance.domBox.get("디자이너 선택").children[1].style.marginTop = "-" + String(GeneralJs.returnGet().dataonly === "true" ? 4.4 : 2.7) + "vh";
    if (instance.thirdChildren instanceof Map) {
      instance.thirdChildren.get("box1_designerInput").focus();
      instance.thirdChildren.get("box1_designerInput").style.color = GeneralJs.colorChip.green;
      instance.thirdChildren.get("box1_designerInput").setAttribute("value", String(obj.proposal.length) + "명");
      instance.thirdChildren.get("box1_title").style.color = GeneralJs.colorChip.green;
      instance.thirdChildren.get("box1_designerInput").style.fontSize = "24px";
      instance.thirdChildren.get("box1_title").style.fontSize = "24px";
      instance.thirdChildren.get("box1").style.background = GeneralJs.colorChip.white;
      instance.thirdChildren.get("box1").style.border = "1px solid " + GeneralJs.colorChip.gray3;
    }
    ProposalJs.toggleTimeout.load_third = setTimeout(function () {
      third(obj, false);
    }, 500);
  }, 550);
}

ProposalJs.prototype.load_processLoad_third = function () {
  const instance = this;
  return async function (obj, clickMode = false) {
    clearTimeout(ProposalJs.toggleTimeout.load_third);
    clearTimeout(ProposalJs.toggleTimeout.load_second);
    for (let i = 0; i < 3; i++) {
      instance.thirdChildren.get("box" + String(i)).style.opacity = "0";
    }
    let num = Number(instance.thirdChildren.get("box1_designerInput").getAttribute("value").replace(/[^0-9]/g, ''));
    let setTimeout_func = await instance.fourthsetTimeout(num, obj, clickMode);
    instance.toggleSetting.first = 1;
    instance.toggleSetting.second = 1;
    instance.toggleSetting.third = 1;
    instance.toggleSetting.fourth = 0;
    ProposalJs.toggleTimeout.fourth = setTimeout(setTimeout_func, 550);
  }
}

ProposalJs.save_init = async function (update = false) {
  const { createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
  try {
    let target, temp, temp2, standard_id;
    let addressArr;
    let temp_arr = [];
    let temp_num = 0;
    let result_obj = {};
    let full_string = '';
    let tempObj_raw, tempObj;
    let tagParsingObj, descriptionObj, descriptionArr;
    let thisClient, proposalHistory;
    let inspectionResult;
    let loadingWidth;
    let belowHeight;
    let loadingCancelBox, loadingLoadingIcon;
    let methodOnlineBoo;
    let designerFeeCalculBoo;
    let designerFeeCalculObj;
    let startDate, endDate;
    let thisProid;

    thisProid = document.getElementById("blewpp_button3").getAttribute("cus_id");
    loadingWidth = 50;
    belowHeight = 123;

    [ loadingCancelBox, loadingLoadingIcon ] = createNodes([
      {
        mother: document.body,
        class: [ "saveLoading" ],
        style: {
          position: "fixed",
          width: String(100) + '%',
          height: String(100) + '%',
          top: String(0),
          left: String(0),
          opacity: String(0),
          background: colorChip.black,
          animation: "justfadein 0.3s ease forwards",
        }
      },
      {
        mother: document.body,
        mode: "svg",
        source: GeneralJs.prototype.returnLoading(),
        class: [ "loading", "saveLoading" ],
        style: {
          position: "fixed",
          width: String(loadingWidth) + "px",
          top: "calc(calc(calc(100% - " + String(belowHeight) + "px) / 2) - " + String(loadingWidth / 2) + "px" + ")",
          left: withOut(50, loadingWidth / 2, "px"),
        }
      }
    ]);

    if (!update) {
      // 0 make proid
      result_obj["desid"] = "";
      result_obj["proposal.status"] = "작성중";
      result_obj["proposal.date"] = new Date();

      // 1 client
      target = document.getElementById("pp_firstprocess_box").children[0];
      if (target.querySelector("#pp_title_sub_b") === null) {
        alert("고객을 선택해주세요!");
        loadingCancelBox.remove();
        loadingLoadingIcon.remove();
        return "fail";
      } else {
        target = target.querySelector("#pp_title_sub_b");
        result_obj["cliid"] = target.getAttribute("cus_id");
        inspectionResult = await GeneralJs.ajaxJson({ mode: "inspection", addressArr: [ { id: result_obj["cliid"], address: target.getAttribute("cus_address"), liteMode: false } ] }, "/parsingAddress");
        if (inspectionResult.length !== 0) {
          window.alert("고객님의 주소가 잘못되어 제안서를 만들 수 없습니다!\n" + inspectionResult[0].message + "\n고객님의 주소를 올바른 형식으로 고쳐주세요!\n(도로명과 건물 번호가 반드시 있어야 함)");
          window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + inspectionResult[0].id;
          loadingCancelBox.remove();
          loadingLoadingIcon.remove();
          return "fail";
        }

      }
    } else {

      target = document.getElementById("pp_firstprocess_box").children[0];
      if (target.querySelector("#pp_title_sub_b") === null) {
        alert("고객을 선택해주세요!");
        return "fail";
      } else {
        result_obj["cliid"] = target.querySelector("#pp_title_sub_b").getAttribute("cus_id");
      }

    }

    thisClient = await ajaxJson({ noFlat: true, whereQuery: { cliid: result_obj["cliid"] } }, "/getClients", { equal: true });
    if (thisClient.length === 0) {
      alert("고객 DB 에러입니다!");
      return "fail";
    }
    thisClient = thisClient[0];
    if (thisClient.requests[0].analytics.date.space.movein.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      alert("고객의 예상 종료일을 반드시 적어야 합니다!");
      return "fail";
    }

    // 2 service
    target = document.getElementById("pp_secondprocess_box").children[0];
    if (target.querySelector("#pp_title2_sub_b") === null) {
      alert("서비스를 선택해주세요!");
      loadingCancelBox.remove();
      loadingLoadingIcon.remove();
      return "fail";
    } else {
      target = target.querySelector("#pp_title2_sub_b");
      tempObj_raw = target.getAttribute("cus_id");
      tempObj = tempObj_raw.split(' ');

      if (/^홈스/g.test(tempObj_raw)) {
        result_obj["service.serid"] = "s2011_aa02s";
      } else if (/^홈퍼/g.test(tempObj_raw)) {
        result_obj["service.serid"] = "s2011_aa01s";
      } else if (/^토탈/g.test(tempObj_raw)) {
        result_obj["service.serid"] = "s2011_aa03s";
      } else {
        result_obj["service.serid"] = "s2011_aa04s";
      }

      if (/mini/gi.test(tempObj_raw)) {
        result_obj["service.xValue"] = "M";
      } else if (/basic/gi.test(tempObj_raw)) {
        result_obj["service.xValue"] = "B";
      } else {
        result_obj["service.xValue"] = "P";
      }
    }

    endDate = thisClient.requests[0].analytics.date.space.movein;
    startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());
    startDate.setDate(startDate.getDate() - GeneralJs.serviceParsing({ serid: result_obj["service.serid"], xValue: result_obj["service.xValue"], online: false }, true));
    if (!update) {
      if (startDate.valueOf() <= (new Date()).valueOf()) {
        window.alert("고객의 예상 종료일을 올바르게 고쳐주세요!");
        window.location.reload();
        return "fail";
      }
    }
    result_obj["process.contract.form.date.from"] = startDate;
    result_obj["process.contract.form.date.to"] = endDate;

    // 3 details
    if (document.querySelectorAll('.pp_designer_selected').length === 0) {
      alert("디자이너를 선택해주세요!");
      loadingCancelBox.remove();
      loadingLoadingIcon.remove();
      return "fail";
    } else {
      temp = document.querySelectorAll('.pp_designer_selected');
      result_obj["proposal.detail"] = new Array(temp.length);

      addressArr = [];
      for (let i = 0; i < temp.length; i++) {
        result_obj["proposal.detail"][i] = {};
        temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_designers_total");
        result_obj["proposal.detail"][i].desid = false;
        for (let input of temp2.querySelectorAll("input")) {
          if (input.checked) {
            result_obj["proposal.detail"][i].desid = input.value;
            addressArr.push({ id: result_obj["proposal.detail"][i].desid, address: input.nextElementSibling.querySelector(".garim").getAttribute("cus_address") });
          }
        }
        if (!result_obj["proposal.detail"][i].desid) {
          alert("디자이너를 선택해주세요!");
          return "fail";
        }

        temp2 = temp[i].querySelector(".pp_designer_selected_box_contents_service_total");
        for (let input of temp2.querySelectorAll("input")) {
          if (input.checked) {
            temp_arr.push(input.value);
          }
        }
        if (temp_arr.length === 0) {
          alert("금액의 종류와 양을 정확히 선택해주세요!");
          return "fail";
        }

        designerFeeCalculBoo = ProposalJs.designerFee.has(ProposalJs.feeKeyMaker(result_obj["proposal.detail"][i].desid, result_obj["cliid"], result_obj["service.serid"], result_obj["service.xValue"]));
        if (designerFeeCalculBoo) {
          designerFeeCalculObj = ProposalJs.designerFee.get(ProposalJs.feeKeyMaker(result_obj["proposal.detail"][i].desid, result_obj["cliid"], result_obj["service.serid"], result_obj["service.xValue"]));
        } else {
          designerFeeCalculObj = await GeneralJs.ajaxJson({ matrix: [ [ result_obj["proposal.detail"][i].desid, result_obj["cliid"], result_obj["service.serid"], result_obj["service.xValue"], thisProid ] ], frontMode: 1 }, "/designerFee");
          designerFeeCalculObj = designerFeeCalculObj[0];
          ProposalJs.designerFee.set(ProposalJs.feeKeyMaker(result_obj["proposal.detail"][i].desid, result_obj["cliid"], result_obj["service.serid"], result_obj["service.xValue"]), designerFeeCalculObj);
        }

        temp_num = (temp_arr.indexOf("부분 공간") !== -1) ? temp_arr.length - 1 : temp_arr.length;
        result_obj["proposal.detail"][i].fee = new Array(temp_num);
        methodOnlineBoo = true;
        for (let f = 0; f < temp_num; f++) {
          result_obj["proposal.detail"][i].fee[f] = {};
          result_obj["proposal.detail"][i].fee[f].method = (temp_arr[f] === "오프라인") ? "offline" : "online";
          result_obj["proposal.detail"][i].fee[f].partial = (temp_arr.indexOf("부분 공간") !== -1) ? true : false;
          result_obj["proposal.detail"][i].fee[f].amount = 0;
          if (result_obj["proposal.detail"][i].fee[f].method === "offline") {
            methodOnlineBoo = false;
          }
          temp2 = temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[f];
          if (temp2.querySelector(".pp_designer_selected_box_contents_money_text").textContent === temp_arr[f]) {
            result_obj["proposal.detail"][i].fee[f].amount = Number(temp2.querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
          } else {
            if (f === 0) {
              result_obj["proposal.detail"][i].fee[f].amount = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[1].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
            } else {
              result_obj["proposal.detail"][i].fee[f].amount = Number(temp[i].querySelectorAll(".pp_designer_selected_box_contents_money_set")[0].querySelector(".pp_designer_selected_box_contents_money_input").value.replace(/[^0-9]/g, ''));
            }
          }
          result_obj["proposal.detail"][i].fee[f].distance = {
            number: designerFeeCalculObj.detail.travel.number,
            amount: designerFeeCalculObj.detail.distance,
            distance: designerFeeCalculObj.detail.travel.distance,
            time: designerFeeCalculObj.detail.travel.time,
            limit: designerFeeCalculObj.detail.travel.limit,
          };

          if (/^off/gi.test(result_obj["proposal.detail"][i].fee[f].method)) {
            result_obj["proposal.detail"][i].fee[f].discount = designerFeeCalculObj.detail.discount.offline;
          } else {
            result_obj["proposal.detail"][i].fee[f].discount = designerFeeCalculObj.detail.discount.online;
          }
        }
        result_obj["service.online"] = methodOnlineBoo;

        temp_num = 0;
        temp_arr = [];

        if (temp[i].querySelector(".pp_designer_selected_box_value").textContent === "") {
          window.alert("사진을 선택해주세요!");

          if (document.querySelector(".pp_fifth_cancelback") !== null) {
            document.querySelector(".pp_fifth_cancelback").remove();
          }
      
          if (document.querySelector(".pp_fifth_whitebox") !== null) {
            document.querySelector(".pp_fifth_whitebox").remove();
          }
      
          loadingCancelBox.remove();
          loadingLoadingIcon.remove();

          return "fail";
        }
        if (document.querySelector('.pp_fifth_whitebox') !== null) {
          document.querySelector('.ppw_left_description_inbutton').click();
        }
        tagParsingObj = GeneralJs.tagParsing(temp[i].querySelector(".pp_designer_selected_box_value").textContent);
        descriptionObj = tagParsingObj.pop();
        descriptionArr = new Array(Object.keys(descriptionObj).length);
        for (let z = 0; z < Object.keys(descriptionObj).length; z++) {
          descriptionArr[z] = descriptionObj[Object.keys(descriptionObj)[z]];
        }
        result_obj["proposal.detail"][i].pictureSettings = tagParsingObj;
        result_obj["proposal.detail"][i].description = descriptionArr;
      }

    }

    if (!update) {
      if (window.confirm("저장이 확실합니까?")) {
        const { id: newId } = await GeneralJs.ajaxJson({ updateQuery: result_obj }, "/createProject");
        standard_id = newId;
      }
    } else {
      if (window.confirm("업데이트가 확실합니까?")) {
        standard_id = document.getElementById("blewpp_button3").getAttribute("cus_id");
        await GeneralJs.ajaxJson({
          where: { proid: standard_id },
          updateQuery: result_obj
        }, "/rawUpdateProject");
      }
    }

    if (document.querySelector(".pp_fifth_cancelback") !== null) {
      document.querySelector(".pp_fifth_cancelback").remove();
    }

    if (document.querySelector(".pp_fifth_whitebox") !== null) {
      document.querySelector(".pp_fifth_whitebox").remove();
    }

    loadingCancelBox.remove();
    loadingLoadingIcon.remove();

    document.getElementById("hiddenListViewButton").click();

    if (!update) {
      return "success";
    } else {
      return "update success";
    }

  } catch (e) {
    GeneralJs.ajax("message=" + "ProposalJs.save_init, " + JSON.stringify(e.message).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ProposalJs.prototype.cssInjection = function () {
  const { returnGet } = GeneralJs;
  const getObj = returnGet();
  const css = `
  :root{
    --left-padding:190px;
    --main-marginbase:6px;
    --left-width:${String(getObj.dataonly === "true" ? 88 : 72)}vh;
  }

  input[type=text],input[type=password],textarea{background-color:transparent}
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
  .columns{position:sticky;top:0px;display:block;border-radius:5px;padding:58px 8px 2px calc(var(--left-padding) + 8px);z-index:1;background:${GeneralJs.colorChip.white};transition:background 0s;}
  .columnobj{display:inline-block;position:relative;font-weight:600;vertical-align:top;text-align:center;margin:32px 0px 0px 8px;margin-left:2px;padding:8px 16px 6px 16px;min-height:24px;color:${GeneralJs.colorChip.green};cursor:pointer;}

  /* total data */
  .data{position:relative;background:${GeneralJs.colorChip.white};overflow-x:visible;overflow-y:scroll;padding-left:var(--left-padding);transition:background 0s;}
  .rowdiv{position:relative;display:block;margin:0px;margin-top:0px;padding:1px 2px 1px 8px;border-top:1px solid ${GeneralJs.colorChip.gray2};}
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
  .bleobj{position:relative;color:${GeneralJs.colorChip.green};margin:4px;margin-top:5px;font-family:'sandoll';font-weight:600;padding:5px 14px 6px 14px;background: linear-gradient(222deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%);border-radius:3px;}
  .blegarim{position:absolute;top:4px;left:4px;width:calc(100% - 8px);height:calc(100% - 8px);background:linear-gradient(222deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%);opacity:0;cursor:pointer;border-radius:5px;}
  .blegarim:hover{opacity:0.5;}
  #belowgreen_back{width:200%;background:linear-gradient(222deg, rgba(89,175,137,0.9) 5%, rgba(0,156,106,0.9) 100%);}
  #belowyellow_back{width:200%;background:linear-gradient(43deg, rgba(221,221,221,0.9) 0%, rgba(236,236,236,0.9) 100%);}
  .circle{position:absolute;cursor:pointer;width:15px;height:15px;opacity:0.95;z-index:101;}
  .belowcircle{top:-20px;}.navicircle{right:11px;}

  /* initcolumn */
  #initcolumn{display:block;position:absolute;top:0;width:2480px;left:-2100px;height:7850px;background:${GeneralJs.colorChip.gray0};z-index:3;opacity:0.87;box-shadow:1px 4px 7px -5px ${GeneralJs.colorChip.shadow};}
  #initcolumn_data{position:absolute;top:0;right:0;width:190px;padding-top:132px;}
  #initcolumn_column{position:absolute;bottom:-8px;right:0px;width:171px;height:100%;}
  #initcolumn_column_stikcy{position:sticky;top:0;width:100%;height:130px;background:${GeneralJs.colorChip.gray0};z-index:3;}
  .rowdiv_init{position:relative;display:block;opacity:1;width:163px;left:17px;height:30px;margin:0px;margin-bottom:7px;font-family:'sandoll';color:${GeneralJs.colorChip.darkBlack};font-weight:600;padding:1px 2px 1px 8px;cursor: pointer;}
  .rowdiv_init div{color:inherit;}
  .columnobjinit{right:0;display:inline-block;position:absolute;font-weight:600;transition:all 0s;min-height:24px;color:${GeneralJs.colorChip.green};bottom:10px;cursor:pointer;}

  /* search bar */
  .searchbar{width:588px;position:fixed;height:80px;top:0;right:0px;z-index:1;background:${GeneralJs.colorChip.white};transition:background 0s;overflow: visible;}
  .searchicon{width:560px;height:35px;right:28px;top:30px;position:absolute;mix-blend-mode:multiply;}
  .searchinput{position:absolute;top:29.5px;right:28px;width:548px;height:36px;outline:none;font-family:'sandoll';border:0;font-weight:500;background:transparent;color:${GeneralJs.colorChip.darkDarkShadow};letter-spacing:-0.2px;padding-bottom:4px;}

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
    background: ${GeneralJs.colorChip.gray3};
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
    font-weight: 200;
    color: ${GeneralJs.colorChip.gray5};
    position: absolute;
    margin-top: -1px;
  }

  .pp_clients_input{
    display: none;
  }
  .pp_clients_input:checked + div {
    background:${GeneralJs.colorChip.green};
  }
  .pp_clients_input:checked + div > div {
    color:${GeneralJs.colorChip.white};
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
    font-size: 1.2vh;
    font-weight:600;
    display:inline-block;
    padding:15px;
    padding-top:${GeneralJs.isMac() ? String(6) : String(7)}px;
    padding-bottom:${GeneralJs.isMac() ? String(8) : String(7)}px;
    background:${GeneralJs.colorChip.white};
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
    background: ${GeneralJs.colorChip.gray3};
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
    top: calc(50% - ${GeneralJs.isMac() ? String(19) : String(15)}px);
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
    color:${GeneralJs.colorChip.gray5};
    display: inline-block;
    margin-left: 7px;
  }

  #pp_designer_question_input{
    margin: 0;
    width: 43px;
    margin-left: 5px;
    font-size: inherit;
    font-weight: 600;
    color:${GeneralJs.colorChip.gray5};
    outline: 0;
    border: 0;
    background: transparent;
  }

  @keyframes press_fadein { from,75% {opacity: 0} to {opacity: 1} }
  .pp_designer_question_press{
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: ${GeneralJs.colorChip.gray4};
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
    margin: 17px;
    margin-top: 12px;
    margin-bottom: 0;
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(1){
    margin-top: 19px;
  }
  .pp_designer_selected_box_value{
    display:none;
  }

  .pp_designer_selected_box_title{
    font-size: 14px;
    font-weight: 600;
    color:${GeneralJs.colorChip.darkShadow};
  }

  .pp_designer_selected_box_contents{
    margin-top:5px;
    background: ${GeneralJs.colorChip.gray1};
    border-radius: 5px;
    height:calc(100% - 24px);
    box-sizing: border-box;
  }

  .pp_designer_selected > .pp_designer_selected_box:nth-child(1){
    height:calc(calc(100% - 116px) * 0.47);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(2){
    height:calc(calc(100% - 116px) * 0.17);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(3){
    height:calc(calc(100% - 116px) * 0.17);
  }
  .pp_designer_selected > .pp_designer_selected_box:nth-child(4){
    height:calc(calc(100% - 116px) * 0.27);
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
    border-bottom: 1px solid ${GeneralJs.colorChip.gray3};
    text-align: center;
    box-sizing: border-box;
  }
  .pp_designer_selected_box_contents_designers_total::-webkit-scrollbar{display:none;}

  .pp_designer_selected_box_contents_designers,.pp_designer_selected_box_contents_service{
    font-size: 1.2vh;
    font-weight: 600;
    display: inline-flex;
    padding: 13px;
    padding-top: ${GeneralJs.isMac() ? String(4) : String(5)}px;
    padding-bottom: ${GeneralJs.isMac() ? String(6) : String(5)}px;
    height: 16px;
    background: ${GeneralJs.colorChip.white};
    margin: 2px;
    margin-top: 2px;
    border-radius: 5px;
    position: relative;
  }

  .pp_designer_selected_box_contents_designers_input:checked + .pp_designer_selected_box_contents_designers{
    background: ${GeneralJs.colorChip.green};
    color:${GeneralJs.colorChip.white};
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
    padding-bottom: 0;
    position: relative;
    display: inline-block;
    text-align: initial;
    overflow: visible;
    padding-left:0.5vw;
    padding-right:0.5vw;
    top:-0.3vh;
  }

  .pp_designer_selected_box_contents_service_input:checked + .pp_designer_selected_box_contents_service{
    color:${GeneralJs.colorChip.green};
  }

  .pp_designer_selected_box_contents_service_input:checked + .pp_designer_selected_box_contents_service > .pp_designer_selected_box_contents_service_won{
    background: ${GeneralJs.colorChip.green};
  }

  .pp_designer_selected_box_contents_service_won{
    position: absolute;
    width: 6px;
    height: 6px;
    background: ${GeneralJs.colorChip.deactive};
    border-radius: 10px;
    top: 0.7vh;
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
    font-weight: 600;
    color: ${GeneralJs.colorChip.darkShadow};
    padding-bottom: 3px;
  }

  .pp_designer_selected_box_contents_money_input{
    font-size: inherit;
    display: inline-block;
    position: relative;
    margin-right: 2px;
    border: 0;
    color: ${GeneralJs.colorChip.green};
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
    top: 0px;
  }

  .pp_designer_selected_box_contents_selection{
    font-size: 1.1vw;
    display: flex;
    font-weight: 300;
    color: ${GeneralJs.colorChip.gray5};
    width: 100%;
    height: ${GeneralJs.isMac() ? String(96) : String(97)}%;
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
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    background: ${GeneralJs.colorChip.white};
    border-radius: 9px;
    box-shadow: 0px 3px 8px -5px ${GeneralJs.colorChip.shadow};
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
    border: 1px solid ${GeneralJs.colorChip.gray2};
    border-radius: 7px;
    overflow: scroll;
  }
  .ppw_leftbox::-webkit-scrollbar{display:none;}

  .ppw_left_title{
    display: block;
    height: 2.9vh;
    font-size: 16px;
    font-weight: 600;
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
    z-index: 1;
  }

  .ppw_left_picturebox_inbox_detail{
    background: ${GeneralJs.colorChip.deactive};
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
    font-weight: 600;
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
    background-color: ${GeneralJs.colorChip.white};
    color: ${GeneralJs.colorChip.black};
  }

  .ppw_left_description_inbutton{
    position: absolute;
    right: 21px;
    bottom: 3.2vh;
    width: 54px;
    height: 28px;
    background: ${GeneralJs.colorChip.green};
    border-radius: 4px;
    color: ${GeneralJs.colorChip.whiteBlack};
    font-size: 14px;
    padding-bottom: ${GeneralJs.isMac() ? String(3) : String(0)}px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .ppw_left_description_inbutton:hover{
    color: ${GeneralJs.colorChip.whiteGreen};
  }

  .ppw_rightbox{
    display: inline-block;
    width: calc(100% - var(--left-width) - 82px);
    height: calc(100% - 66px);
    position: absolute;
    border: 1px solid ${GeneralJs.colorChip.gray2};
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
    font-weight: 600;
    overflow: hidden;
    position: relative;
  }
  .ppw_right_set::-webkit-scrollbar{display:none;}
  .ppw_right_title{
    font-size: inherit;
  }

  .ppw_right_picturebox{
    height: 184px;
    background: ${GeneralJs.colorChip.gray1};
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
    background: ${GeneralJs.colorChip.white};
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
    background: ${GeneralJs.colorChip.white};
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
    color: ${GeneralJs.colorChip.white};
    outline: 0;
    border: 0;
    background: transparent;
    text-align: center;
  }

  .blewpp_input::placeholder {
    color: ${GeneralJs.colorChip.white};
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
    border-bottom: 1px solid ${GeneralJs.colorChip.middleGreen};
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
    right: 102px;
    width: 67px;
    padding: 9px;
    padding-top: 6px;
    padding-right: 17px;
    padding-left: 17px;
    background: ${GeneralJs.colorChip.white};
    box-shadow: 1px 4px 7px -5px ${GeneralJs.colorChip.shadow};
    border-radius: 4px;
    font-size: 14px;
    font-weight: 300;
    color: ${GeneralJs.colorChip.green};
    text-align: center;
    z-index: 3;
  }

  .blewpp_fifthevent_box:hover{
    color: ${GeneralJs.colorChip.green};
    background: ${GeneralJs.colorChip.whiteGray};
  }

  #blewpp_fifthevent_cancelbox{
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .listpp_leftBar{
    display: block;
    position: absolute;
    top: 0px;
    width: 210px;
    left: 0px;
    height: 100%;
    background: ${GeneralJs.colorChip.gray0};
    z-index: 3;
    opacity: 0.87;
    box-shadow: 1px 4px 7px -5px ${GeneralJs.colorChip.shadow};
  }

  .listpp_leftBar_totalbox{
    position: absolute;
    top: 43px;
    left: 12.5%;
    width: 73%;
    height: calc(100% - 43px);
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
    margin-left: 24%;
  }

  .listpp_leftBar_detail_num{
    width: 10%;
    font-weight: 500;
    text-align: end;
    top:-1px;
  }

  .listpp_leftBar_detail_bar{
    position: absolute;
    top: 8px;
    left: 70%;
    width: 12%;
    border-bottom: 1px solid ${GeneralJs.colorChip.gray3};
  }

  .listpp_mainArea{
    position: relative;
    top: 34px;
    left: 241px;
    width: calc(100% - 257px);
    height: calc(100% - 34px);
    overflow: scroll;
  }
  .listpp_mainArea::-webkit-scrollbar{display:none;}

  .listpp_mainArea_tong{
    display: block;
    width:100%;
    height: 34px;
    margin-bottom: 8px;
    border-radius: 5px;
    background: ${GeneralJs.colorChip.white};
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
    top: ${GeneralJs.isMac() ? String(6) : String(7)}px;
    color: ${GeneralJs.colorChip.green};
  }

  .listpp_mainArea_tong_name{
    font-size: 14px;
    display: inline-block;
    font-weight: 600;
    padding-top: ${GeneralJs.isMac() ? String(3) : String(4)}px;
    position: absolute;
    margin-left: 4px;
    width: 39px;
    top: 3.2px;
    left: 81px;
  }
  .listpp_mainArea_tong_name:hover{
    opacity:0.5;
  }

  .listpp_mainArea_tong_details{
    display: inline-block;
    font-size: 13px;
    position: absolute;
    top: 0px;
    background: ${GeneralJs.colorChip.gray0};
    height: calc(100% - ${GeneralJs.isMac() ? String(5) : String(6)}px);
    width: calc(100% - 245px);
    padding-left: 11px;
    padding-top: ${GeneralJs.isMac() ? String(4) : String(5)}px;
    border-radius: 5px;
    overflow: scroll;
    font-weight: 300;
    right: 99px;
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
    border: 1px solid ${GeneralJs.colorChip.gray2};
    text-align: center;
    box-sizing: border-box;
    top: 0px;
    padding-top: ${GeneralJs.isMac() ? String(6) : String(7)}px;
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
    height: ${GeneralJs.isMac() ? String(118) : String(121)}px;
    background: ${GeneralJs.colorChip.white};
    z-index: 2;
    border-radius: 5px;
    display: block;
    box-shadow: 0px 3px 8px -5px ${GeneralJs.colorChip.shadow};
    animation: listpp_menu_ani 0.3s ease forwards;
  }
  .listpp_menu_cancelback{
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    background: ${GeneralJs.colorChip.deactive};
    opacity: 0.3;
  }
  .listpp_menuEvent{
    font-size: 13px;
    text-align: center;
    font-weight: 600;
    letter-spacing: -0.2px;
    word-spacing: -0.5px;
    margin-top: 5px;
    color:${GeneralJs.colorChip.darkShadow};

  }
  .listpp_menuEvent:hover{
    color:${GeneralJs.colorChip.green};
  }
  .listpp_menuEvent_pending{
    margin-top: 13px;
  }

  .listpp_menuEvent_delete{
    color: ${GeneralJs.colorChip.red};
  }

  .listpp_menuEvent_confirm{
    color: ${GeneralJs.colorChip.purple};
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

  .selected_button {
    position: relative;
    border-bottom: 1px solid ${GeneralJs.colorChip.gray2};
    height: 20%;
    font-size: 16px;
    font-weight: 200;
    text-align: center;
    cursor: pointer;
    background: transparent;
    color: ${GeneralJs.colorChip.black};
  }

  .selected_button_contents {
    position: absolute;
    width:100%;
    top: 7px;
    font-size: 16px;
    font-weight: 200;
    text-align: center;
    cursor: pointer;
    color: ${GeneralJs.colorChip.black};
  }

  .selected_button_contents:hover {
    color: ${GeneralJs.colorChip.green};
  }

  `;
  document.querySelector("style").insertAdjacentHTML("beforeend", css);
}

ProposalJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, sleep, blankHref, stringToLink, linkToString, objectDeepCopy } = GeneralJs;

  communication.setItem([
    () => { return "기본 세팅으로 저장"; },
    function () {
      return (document.querySelector(".pp_fifth_whitebox") !== null);
    },
    async function (e) {
      try {
        const desid = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_desid");
        const infoDom = document.querySelector(".ppw_left_picturebox_inbox");
        const infoArr = [ ...infoDom.children ].map((d) => {
          const infoText = stringToLink(d.getAttribute("cus_info"));
          const valueArr = infoText.split("__split1__");
          let resultObj, tempArr;
          resultObj = {};
          for (let str of valueArr) {
            tempArr = str.split("__split2__");
            resultObj[tempArr[0]] = tempArr[1];
          }
          return resultObj;
        });
        const descriptionArr = [ ...document.querySelectorAll(".ppw_left_description_inbox_input") ].map((d) => { return d.value });
        await ajaxJson({ desid, photo: infoArr, description: descriptionArr }, S3HOST + ":3000/updateDesignerProposalSetting", { equal: true });
        window.alert("현재 상태가 기본 세팅으로 저장되었습니다!");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "기본 세팅 불러오기"; },
    function () {
      return (document.querySelector(".pp_fifth_whitebox") !== null);
    },
    async function (e) {
      try {
        const desid = document.querySelector(".pp_fifth_whitebox").getAttribute("cus_desid");
        const [ thisDesigner ] = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
        const { proposal } = thisDesigner.setting;
        const defaultProposal = proposal[0];
        const { photo, description } = defaultProposal;
        const selectedDom = [ ...document.querySelectorAll(".pp_designer_selected") ]
        let finalValue, finalMatrix, tempArr;
        let objKey, objValue;
        let descriptionArr;

        finalMatrix = [];
        for (let obj of photo) {
          objKey = Object.keys(obj);
          objValue = Object.values(obj);
          tempArr = [];
          for (let i = 0; i < objKey.length; i++) {
            tempArr.push(objKey[i] + "__split2__" + objValue[i]);
          }
          finalMatrix.push(objectDeepCopy(tempArr));
        }
        descriptionArr = [];
        for (let i = 0; i < description.length; i++) {
          descriptionArr.push("description" + String(i) + "__split2__" + description[i]);
        }
        finalMatrix.push(descriptionArr)
        
        document.querySelector(".pp_fifth_cancelback").click();
        await sleep(500);

        finalMatrix = finalMatrix.map((arr) => { return arr.join("__split1__") });
        finalValue = finalMatrix.join("__split3__");
        selectedDom.find((d) => { return d.getAttribute("desid") === desid }).querySelector(".pp_designer_selected_box_value").textContent = finalValue;

        await sleep(1000);
        selectedDom.find((d) => { return d.getAttribute("desid") === desid }).querySelector(".pp_designer_selected_box_contents_selection").click();

      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "이미지 전송 기록"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        await instance.mother.imageTransferHistory();
      } catch (e) {
        console.log(e);
      }
    }
  ]);
}

ProposalJs.prototype.launching = async function () {
  const instance = this;
  const { arrow: { left, right }, square: { up, down, reportIcon, returnIcon }, sub: { extractIcon } } = this.mother.belowButtons;
  const { ajaxJson } = GeneralJs;
  try {
    let query = GeneralJs.returnGet();
    let proposal_list_raw, proposal_obj;
    let textTarget;
    let proid, cliid;
    let serviceMap, xValueMap;
    let clients;

    this.designers = new Designers(await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $regex: "완료" } } }, "/getDesigners", { equal: true }));
    this.realtimeDesigner = await ajaxJson({ mode: "all" }, BACKHOST + "/realtimeDesigner", { equal: true });
    this.proposalGeneration = {};

    left.style.display = "none";
    right.style.display = "none";

    this.mother.below.removeChild(this.mother.belowButtons.moveArea.left);
    this.mother.below.removeChild(this.mother.belowButtons.moveArea.right);

    this.cssInjection();
    this.totalInitial();
    this.domBox = await this.firstProcess();
    this.thirdChildren = await this.thirdProcess();
    await this.secondProcess();
    this.communicationRender();

    if (query.proid !== undefined) {

      proid = query["proid"];

      if (proid.length === 11 && /_/g.test(proid)) {
        this.toggleSetting.listCreate = 1;
        proposal_list_raw = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + proid, "/searchProjects"));

        serviceMap = new Map();
        xValueMap = new Map();

        serviceMap.set("s2011_aa01s", "홈퍼니싱");
        serviceMap.set("s2011_aa02s", "홈스타일링");
        serviceMap.set("s2011_aa03s", "토탈 스타일링");
        serviceMap.set("s2011_aa04s", "설계 변경");

        xValueMap.set("M", "mini");
        xValueMap.set("B", "basic");
        xValueMap.set("P", "premium");

        for (let p of proposal_list_raw) {
          clients = JSON.parse(await GeneralJs.ajaxPromise("noFlat=true&query=" + p.cliid, "/searchClients"));
          p.client = clients[0].name;
          p.serviceName = `${serviceMap.get(p.service.serid)} ${xValueMap.get(p.service.xValue)}`;
        }

        if (proposal_list_raw.length > 0) {

          proposal_obj = proposal_list_raw[0];
          textTarget = {
            proid: proposal_obj.proid,
            client: proposal_obj.client,
            cliid: proposal_obj.cliid,
            service: proposal_obj.serviceName,
            proposal: proposal_obj.proposal.detail,
          };

          (this.load_initevent(true)).call({
            parentElement: {
              querySelector: function (str) {
                return {
                  textContent: JSON.stringify(textTarget),
                };
              }
            }
          }, {});

        }
      }
    }

    if (query.cliid !== undefined) {

      cliid = query["cliid"];

      await instance.list_launching();
      instance.toggleSetting.listCreate = 1;
      instance.pastMaps = [];
      await instance.list_mainArea({ target: "client", value: cliid });

      const buttons = document.querySelectorAll(".listpp_mainArea_tong_progress");
      let target = null;
      for (let dom of buttons) {
        if (dom.getAttribute("cliid") === cliid) {
          target = dom;
          break;
        }
      }
      if (target === null) {
        instance.createViewEvent.call(instance.mother.belowButtons.square.up, {});
        window.alert("제안서를 만들어 주세요.");
        instance.nothing = 1;
      } else {
        instance.load_initevent(true).call(target.previousElementSibling, {});
        instance.nothing = 0;
      }

    }

    if (query.proid === undefined && query.cliid === undefined) {
      if (typeof this.listViewEvent === "function") {
        this.listViewEvent.call(instance.mother.belowButtons.square.down, {});
      }
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
