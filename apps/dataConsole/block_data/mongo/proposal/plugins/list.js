Proposal.prototype.list_initial = async function () {
  let mother = document.querySelector(".mongo_box_list");
  let div_clone, div_clone2;
  let classes = [ "listpp_searchBar", "listpp_leftBar", "listpp_mainArea" ];
  let mapname = [ "검색창", "제안 현황", "메인 리스트" ];
  for (let i = 0; i < classes.length; i++) {
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add(classes[i]);
    mother.appendChild(div_clone);
    this.list_domBox.set(mapname[i], div_clone);
  }
  console.log(this.list_domBox);
}

Proposal.prototype.list_searchBar_event = async function () {
  let instance = this;
  let search_obj = [];
  let temp_obj, temp_str1, temp_str2, temp_str3;
  let proposal_list_raw = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Project&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({})));
  let designer_names = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Designer&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({ past_desid: 1, designer: 1 })));
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

Proposal.prototype.list_searchBar = async function () {
  let parent = this.list_domBox.get("검색창");
  let div_clone, div_clone2, img_clone, input_clone;
  img_clone = Genemongo.nodes.img.cloneNode(true);
  img_clone.src = "/list_svg/porporpor/search/searbae01.svg";
  img_clone.classList.add("listpp_searchBar_img");
  parent.appendChild(img_clone);
  input_clone = Genemongo.nodes.input.cloneNode(true);
  input_clone.setAttribute("type", "text");
  input_clone.classList.add("listpp_searchBar_input");
  input_clone.addEventListener("keyup", (await this.list_searchBar_event()));
  parent.appendChild(input_clone);
}

Proposal.prototype.list_leftBar = async function () {
  let parent = this.list_domBox.get("제안 현황");
  let div_clone, div_clone2;
  let proposal_list_raw = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Project&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({})));
  let designers = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Designer&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({ past_desid: 1, designer: 1 })));
  let desid_numbers = {}
  for (let obj of designers) { desid_numbers[obj.past_desid] = 0; }
  for (let obj of proposal_list_raw) {
    for (let obj2 of obj.proposal) {
      desid_numbers[obj2.desid] = desid_numbers[obj2.desid] + 1;
    }
  }
  div_clone = Genemongo.nodes.div.cloneNode(true);
  div_clone.classList.add("listpp_leftBar_totalbox");
  for (let i = 0; i < designers.length; i++) {
    //designer id
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_id");
    div_clone2.textContent = designers[i].past_desid;
    div_clone.appendChild(div_clone2);
    //designer name
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail");
    div_clone2.textContent = designers[i].designer;
    div_clone.appendChild(div_clone2);
    //designer bar
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_bar");
    div_clone2.style.top = String(7.5 + (34 * i)) + "px";
    div_clone.appendChild(div_clone2);
    //designer number
    div_clone2 = Genemongo.nodes.div.cloneNode(true);
    div_clone2.classList.add("listpp_leftBar_detail_num");
    div_clone2.textContent = String(desid_numbers[designers[i].past_desid]);
    div_clone.appendChild(div_clone2);
  }
  parent.appendChild(div_clone);
}

Proposal.prototype.list_mainArea = async function () {
  let proposal_list_raw = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Project&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({})));
  let designer_names = JSON.parse(await Genemongo.ajax('/post_mfind', 'collection=Designer&find1=' + JSON.stringify({}) + '&find2=' + JSON.stringify({ past_desid: 1, designer: 1 })));
  let designer_names_obj = {};
  for (let obj of designer_names) {
    designer_names_obj[obj.past_desid] = obj.designer;
  }
  this.list_mainArea_tongMake(this.list_domBox.get("메인 리스트"), proposal_list_raw, designer_names_obj, true);
}

Proposal.prototype.list_mainArea_tongMake = function (parent, proposal_list_raw, designer_names_obj, init) {
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
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_mainArea_tong");
    div_clone.setAttribute("cus_id", details_list[i][0]);
    for (let j = 0; j < details.length; j++) {
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
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

Proposal.prototype.list_menu = function () {
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
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_menu_cancelback");
    div_clone.addEventListener("click", function (e) {
      this.nextElementSibling.remove();
      this.remove();
      mother.style.color = "";
    });
    this.parentElement.appendChild(div_clone);

    // menu
    div_clone = Genemongo.nodes.div.cloneNode(true);
    div_clone.classList.add("listpp_menu");

    for (let i of list) {
      div_clone2 = Genemongo.nodes.div.cloneNode(true);
      div_clone2.classList.add("listpp_menuEvent");
      div_clone2.classList.add("listpp_menuEvent_" + i.key);
      div_clone2.textContent = i.name;
      div_clone2.addEventListener("click", await instance.list_menuEvents(i, mother, this.parentElement.getAttribute("cus_id")));
      div_clone.appendChild(div_clone2);
    }
    this.parentElement.appendChild(div_clone);
  }
}

Proposal.prototype.list_menuEvents = async function (obj, mother, proid) {
  let return_func;
  async function mother_name(o) {
    mother.textContent = o.name;
    console.log(await Genemongo.ajax("/post_mupdate", "table=Project&st=proid&i=" + proid + "&c=status&v=" + o.name));
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
        await Genemongo.ajax("/slack", "linkmake=true&link=/mongo/proposal&query=" + Genemongo.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + Genemongo.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "make":
      return_func = async function (e) {
        let message = "제안서의 제작을 요청드립니다! link: ";
        await Genemongo.ajax("/polling", "proid=" + proid + "");
        await Genemongo.ajax("/slack", "linkmake=true&link=/mongo/proposal&query=" + Genemongo.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + Genemongo.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "send":
      return_func = async function (e) {
        let message = "제안서의 제작이 완성되었습니다! 발송 부탁드리겠습니다. link:  / google drive : ";
        await Genemongo.ajax("/slack", "linkmake=true&link=/mongo/proposal&query=" + Genemongo.queryFilter(JSON.stringify([{ standard: "proid", value: proid },])) + "&message=" + Genemongo.queryFilter(message) + "&channel=#403_proposal");
        await mother_name(obj);
        reset_event(this);
      }
      break;
    case "complete":
      return_func = async function (e) {
        let info = JSON.parse(this.parentElement.parentElement.querySelector('section').textContent);
        let today = new Date();
        let month = (today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1);
        let date = (today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate());
        let value = String(today.getFullYear()) + '-' + month + '-' + date;
        await Genemongo.ajax("/post_update", "table=BC1_conlist&c=a9_proposal&st=a4_customernumber&i=" + info.cliid + "&v=" + value);
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
        console.log(await Genemongo.ajax("/post_mdelete", "table=Project&st=proid&i=" + proid));
        mother.parentElement.remove();
        reset_event(this);
      }
      break;
  }
  return return_func;
}

Proposal.prototype.list_launching = async function () {
  let father = document.querySelector(".mongo_box_list");
  while (father.firstChild) {father.removeChild(father.lastChild);}
  await this.list_initial();
  this.list_searchBar();
  this.list_leftBar();
  this.list_mainArea();
}
