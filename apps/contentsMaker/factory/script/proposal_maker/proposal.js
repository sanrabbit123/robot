module.exports = {
  exec: function (options) {
    // let h = `
const Proposal = function (text) {
  this.text = "기본값 설정";
  if (text) {
    this.text = text;
  }
  let proposal = this.text.proposal;
  let temp_arr = [];
  let general_string = '';
  let method = '';
  for (let i = 0; i < proposal.length; i++) {
    temp_arr = proposal[i].fee;
    for (let j = 0; j < temp_arr.length; j++) {
      general_string += temp_arr[j].method;
    }
  }
  if (/offline/g.exec(general_string) === null) { method = "온라인"; this.method = "online"; }
  else if (/online/g.exec(general_string) === null) { method = "오프라인"; this.method = "offline"; }
  else { method = "온/오프라인"; this.method = "offlineOnline"; }
  this.service = method + ' ' + this.text.service.replace(/[a-z]/g, '').replace(/ $/g, '');
}

Proposal.prototype.mother = new Mother();

Proposal.auto_comma = function (str) {
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

Proposal.prototype.settings = {
  offsetY: 630,
  staticLink: "${options.static_dir}",
}

Proposal.prototype.artboard_maker = function (id) {
  const instance = this;
  let current_art = app.activeDocument.artboards.getByName("ab" + String(id));
  let rect = current_art.artboardRect;
  rect[0] = rect[0] + this.settings.offsetY;
  rect[2] = rect[2] + this.settings.offsetY;
  let new_art = app.activeDocument.artboards.add(rect);
  new_art.name = "ab" + String(id + 1);
}

Proposal.prototype.firstProcess = function () {
  const instance = this;
  let mother = this.mother;
  let pick = function (name) { return mother.pick("active", name); }
  let target_obj = {};
  let i;

  //0
  pick("init0").contents = this.text.client + " 고객님께";
  //1
  pick("init1").left = mother.return_right(pick("init0")) + 3;
  pick("init1").contents = "고객 맞춤 커스터마이징 : " + this.service + " 서비스";
  //2
  pick("init2").contents = "를 제안드립니다.";
  pick("init2").left = mother.return_right(pick("init1")) + 0.2;

  //Service
  pick("serviceGreen").contents = this.service;
  pick("serviceBlack").left = pick("serviceGreen").left - 2.2 - pick("serviceBlack").width;

  //Set titles
  mother.pick("moduleTitle", "main").contents = "Designers for " + this.text.client + " 고객님";
  mother.pick("moduleTitle", "serviceGreen").contents = this.service;
  mother.pick("moduleTitle", "serviceBlack").left = mother.pick("moduleTitle", "serviceGreen").left - 2.2 - mother.pick("moduleTitle", "serviceBlack").width;

  //Copy and paste
  target_obj.offline = pick("offline");
  target_obj.online = pick("online");
  target_obj.offlineOnline = pick("offlineOnline");
  for (i in target_obj) {
    if (i !== this.method) { target_obj[i].remove(); }
  }
}

Proposal.prototype.second_process = function () {
  const instance = this;
  let mother = this.mother;
  let pick = function (name) { return mother.pick("moduleFinish", name); }
  pick("finish").left = pick("finish").left + (this.settings.offsetY * (this.text.proposal.length + 1));
}

Proposal.prototype.third_process = function () {
  const instance = this;
  let mother = this.mother;
  let pick = function (name) { return mother.pick("moduleTitle", name); }
  let items = [ "main", "serviceBlack", "serviceGreen", "static0" ];
  let i = 0, j = 0;
  let temp;

  for (j = 0; j < this.text.proposal.length + 1; j++) {
    temp = this.mother.itempick("whiteback").duplicate();
    temp.left = temp.left + (this.settings.offsetY * (j + 1));
    temp.name = temp.name + "_copy" + String(j);
  }
  for (j = 0; j < this.text.proposal.length + 1; j++) {
    for (i = 0; i < items.length; i++) {
      temp = pick(items[i]).duplicate();
      temp.left = temp.left + (this.settings.offsetY * (j + 1));
      temp.name = items[i] + "_copy" + String(j) + String(i);
    }
  }
  for (i = 0; i < items.length; i++) {
    pick(items[i]).remove();
  }
}

Proposal.prototype.fourth_process = function () {
  const instance = this;
  let mother = this.mother;
  let pick = function (name) { return mother.pick("moduleTexts", name); }
  let items = [ "designer", "statics", "descriptions", "money", "etc", "arrow" ];
  let abc = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];
  let temp, arrow;
  let i = 0, j = 0;

  for (j = 0; j < this.text.proposal.length; j++) {
    for (i = 0; i < items.length; i++) {
      temp = pick(items[i]).duplicate();
      temp.left = temp.left + (this.settings.offsetY * (j + 1));
      temp.name = items[i] + "_copy" + String(j) + String(i);
      //designer
      if (i === 0) {
        temp.contents = abc[j];
      }
      //statics
      if (i === 1) {
      }
      //descriptions
      if (i === 2) {
        pick(items[i] + "_copy" + String(j) + String(i)).contents = this.text.proposal[j].picture_settings[this.text.proposal[j].picture_settings.length - 1].description0;
        pick(items[i] + "_copy" + String(j) + String(i)).contents += "\\n";
        pick(items[i] + "_copy" + String(j) + String(i)).contents += this.text.proposal[j].picture_settings[this.text.proposal[j].picture_settings.length - 1].description1;
        pick(items[i] + "_copy" + String(j) + String(i)).contents += "\\n";
        pick(items[i] + "_copy" + String(j) + String(i)).contents += this.text.proposal[j].picture_settings[this.text.proposal[j].picture_settings.length - 1].description2;
      }
      //money
      if (i === 3) {
        pick(items[i] + "_copy" + String(j) + String(i)).contents = ((this.text.proposal[j].fee[0].method === "offline") ? "오프라인 " : "온라인 ");
        pick(items[i] + "_copy" + String(j) + String(i)).contents += ((this.text.proposal[j].fee[0].partial) ? "부분 공간 " : "");
        pick(items[i] + "_copy" + String(j) + String(i)).contents += Proposal.auto_comma(String(this.text.proposal[j].fee[0].money));
        pick(items[i] + "_copy" + String(j) + String(i)).contents += '원';
        pick(items[i] + "_copy" + String(j) + String(i)).contents += " (VAT 별도)";
      }
      //etc
      if (i === 4) {
        pick(items[i] + "_copy" + String(j) + String(i)).contents = '';
        if (this.text.proposal[j].fee[0].method === "offline") {
          pick(items[i] + "_copy" + String(j) + String(i)).contents += "*결정이 늦어지실 경우, 디자이너 일정이 마감될 수 있습니다.";
        } else {
          pick(items[i] + "_copy" + String(j) + String(i)).contents += "*현장 미팅을 진행하실 경우, 별도의 출장비가 청구됩니다.";
        }
      }
      //arrow
      if (i === 5) {
        arrow = pick(items[i] + "_copy" + String(j) + String(i));
        arrow.pageItems.getByName('h').left = pick("money_copy" + String(j) + String(3)).left - 13;
        arrow.pageItems.getByName('l').width = pick("money_copy" + String(j) + String(3)).left - arrow.pageItems.getByName('l').left - 8;
      }
    }
  }
  for (i = 0; i < items.length; i++) {
    pick(items[i]).remove();
  }
}

Proposal.prototype.fifth_process = function () {
  const instance = this;
  let mother = this.mother;
  let pick = function (name) { return mother.pick("moduleBoxes", name); }
  let temp_arr, temp, tempMother, tempImg;
  let i = 0, j = 0;

  function caseBoo(arr) {
    let i, j;
    i = j = 0;
    let matrix = [
      { name: "case00", value: [ 'g', 's', 'g', 'g', 'g', ] },
      { name: "case01", value: [ 'g', 's', 's', 's', 'g', 'g', ] },
      { name: "case02", value: [ 'g', 's', 'g', 's', 's', 'g', ] },
      { name: "case03", value: [ 'g', 's', 'g', 'g', 's', 's', ] },
      { name: "case04", value: [ 'g', 's', 's', 's', 's', 's', 'g', ] },
      { name: "case05", value: [ 'g', 's', 's', 's', 'g', 's', 's', ] },
      { name: "case06", value: [ 'g', 's', 'g', 's', 's', 's', 's', ] },
      { name: "case07", value: [ 'g', 's', 's', 's', 's', 's', 's', 's', ] },
      { name: "case10", value: [ 's', 'g', 'g', 'g', 'g', ] },
      { name: "case11", value: [ 's', 'g', 's', 's', 'g', 'g', ] },
      { name: "case12", value: [ 's', 'g', 'g', 's', 's', 'g', ] },
      { name: "case13", value: [ 's', 'g', 'g', 'g', 's', 's', ] },
      { name: "case14", value: [ 's', 'g', 's', 's', 's', 's', 'g', ] },
      { name: "case15", value: [ 's', 'g', 's', 's', 'g', 's', 's', ] },
      { name: "case16", value: [ 's', 'g', 'g', 's', 's', 's', 's', ] },
      { name: "case17", value: [ 's', 'g', 's', 's', 's', 's', 's', 's', ] },
      { name: "case20", value: [ 's', 's', 's', 'g', 'g', 'g', ] },
      { name: "case21", value: [ 's', 's', 's', 's', 's', 'g', 'g', ] },
      { name: "case22", value: [ 's', 's', 's', 'g', 's', 's', 'g', ] },
      { name: "case23", value: [ 's', 's', 's', 'g', 'g', 's', 's', ] },
      { name: "case24", value: [ 's', 's', 's', 's', 's', 's', 's', 'g', ] },
      { name: "case25", value: [ 's', 's', 's', 's', 's', 'g', 's', 's', ] },
      { name: "case26", value: [ 's', 's', 's', 'g', 's', 's', 's', 's', ] },
      { name: "case27", value: [ 's', 's', 's', 's', 's', 's', 's', 's', 's', ] },
    ]
    let boo0;
    for (i = 0; i < matrix.length; i++) {
      boo0 = true;
      for (j = 0; j < matrix[i].value.length; j++) {
        if (matrix[i].value[j] !== arr[j]) { boo0 = false; }
      }
      if (boo0) { return matrix[i].name; }
    }
    return "error";
  }
  
  for (j = 0; j < this.text.proposal.length; j++) {
    temp_arr = [];
    for (i = 0; i < this.text.proposal[j].picture_settings.length - 1; i++) {
      temp_arr.push(this.text.proposal[j].picture_settings[i].sgTrue);
    }
    temp = pick(caseBoo(temp_arr)).duplicate();
    temp.left = temp.left + (this.settings.offsetY * (j + 1));
    temp.name = temp.name + "_copy" + String(j);

    for (i = 0; i < this.text.proposal[j].picture_settings.length - 1; i++) {
      tempMother = temp.pageItems.getByName("p" + String(i));
      tempImg = tempMother.placedItems.add();
      tempImg.file = new File(this.settings.staticLink + this.text.proposal[j].picture_settings[i].imgSrc);
      tempImg.width = tempMother.pageItems.getByName("image").width
      tempImg.height = tempMother.pageItems.getByName("image").height
      tempImg.top = tempMother.pageItems.getByName("image").top
      tempImg.left = tempMother.pageItems.getByName("image").left
      tempImg.embed();
      tempMother.pageItems.getByName("image").remove();
    }
  }
  for (j = 0; j < 3; j++) {
    for (i = 0; i < 8; i++) {
      pick("case" + String(j) + String(i)).remove();
    }
  }
}

ExecMain.prototype.fileName = function () {
  let today = new Date();
  let month = today.getMonth();
  let day = today.getDate();
  let month_str, day_str;
  if (month + 1 < 10) { month_str = '0' + String(month + 1); }
  else { month_str = String(month + 1); }
  if (day < 10) { day_str = '0' + String(day); }
  else { day_str = String(day); }
  let new_name = this.text.proid + '_' + this.text.client + '_' + String(today.getFullYear()).slice(2) + month_str + day_str;
  return this.dir + "/result/" + new_name + ".pdf";
}

ExecMain.prototype.fileSave = function () {
  app.doScript("expandall", "contents_maker");
  let saveName = new File(this.fileName());
  let saveOpts = new PDFSaveOptions();
  saveOpts.pDFPreset = "uragenpdf";
  app.activeDocument.saveAs(saveName, saveOpts);
}

ExecMain.prototype.start = function () {
  this.proposal = new Proposal(this.text);
  app.open(new File(this.dir + "/factory/template/proposal/template.ai"));
  this.proposal.firstProcess();
  for (let i = 0; i < this.text.proposal.length + 1; i++) {
    this.proposal.artboard_maker(i);
  }
  this.proposal.second_process();
  this.proposal.third_process();
  this.proposal.fourth_process();
  this.proposal.fifth_process();
  this.fileSave();
}
    `;

    return h;
  }
}
