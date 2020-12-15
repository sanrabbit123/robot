const StylingRequest = function (text) {
  this.text = "기본값 설정";
  if (text) {
    this.text = text;
  }
  this.mother = new Mother();
}

StylingRequest.queryStringToObject = function (query) {
  let tempArr;
  let tempArrDetail;
  let result = {};

  tempArr = query.split('_');

  for (let i = 0; i < tempArr.length; i++) {
    tempArrDetail = tempArr[i].split('=');
    result[tempArrDetail[0]] = tempArrDetail[1];
  }

  return result;
}

StylingRequest.objectToQueryString = function (obj) {
  let result = '';
  let standards = [];
  let targetBoo, areaBoo, orderBoo;

  targetBoo = false;
  areaBoo = false;
  orderBoo = false;

  for (let i in obj) {
    if (i === "target") {
      targetBoo = true;
    } else if (i === "area") {
      areaBoo = true;
    } else if (i === "order") {
      orderBoo = true;
    } else {
      standards.push(i);
    }
  }

  if (areaBoo) {
    standards.unshift("area");
  }
  if (targetBoo) {
    standards.unshift("target");
  }
  if (orderBoo) {
    standards.push("order");
  }

  for (let i = 0; i < standards.length; i++) {
    result += standards[i] + '=' + String(obj[standards[i]]);
    result += '_';
  }

  return result.slice(0, -1);
}

StylingRequest.prototype.readDoms = function () {
  const thisAi = app.activeDocument;
  let tempObj, tempObj2;
  let tempArr;
  let tempDom;
  let tempString;
  let main, mainItems;
  let table, area, areaItems;

  this.doms = {};
  main = thisAi.layers.getByName("template");

  //client title
  tempDom = main.pageItems.getByName("clientTitle");
  tempDom.contents = "홈스타일링 진행 : " + this.text.name + " 고객님"
  this.doms.clientTitle = tempDom;

  //initial words

  tempString = '';
  tempString += "안녕하세요, " + this.text.designer.designer + " 실장님!";
  tempString += '\n';
  tempString += "홈리에종에 의뢰하신 " + this.text.name + " 고객님 관련 정보를 보내드립니다.";
  tempString += '\n';
  tempString += "오프라인 홈스타일링 서비스를 진행합니다.";

  tempDom = main.pageItems.getByName("initialWords");
  tempDom.contents = tempString;

  this.doms.initialWords = tempDom;

  //meeting
  this.doms.meeting = {
    words: main.pageItems.getByName("meeting"),
    arrow: {
      head: main.pageItems.getByName("meetingArrowHead"),
      body: main.pageItems.getByName("meetingArrowBody"),
    }
  };

  //table
  this.doms.table = [];
  table = main.layers.getByName("table");
  for (let i = 0; i < 4; i++) {
    tempObj = {
      title: table.pageItems.getByName("title" + String(i)),
      area: [],
    };
    area = table.layers.getByName("area" + String(i));
    areaItems = area.pageItems;
    for (let j = 0; j < areaItems.length / 2; j++) {
      tempObj2 = {
        title: areaItems.getByName(StylingRequest.objectToQueryString({ area: i, title: j })),
        area: areaItems.getByName(StylingRequest.objectToQueryString({ area: i, value: j })),
      };
      tempObj.area.push(tempObj2);
    }
    this.doms.table.push(tempObj);
  }

  //total targets
  this.doms.wordings = [];
  mainItems = main.pageItems;
  for (let z = 0; z < 5; z++) {
    tempArr = [];
    if (z === 0) {
      for (let i = 0; i < 100; i++) {
        try {
          tempArr.push({
            title: mainItems.getByName(StylingRequest.objectToQueryString({ target: z, title: 0, order: i })),
            area: [
              mainItems.getByName(StylingRequest.objectToQueryString({ target: z, area: 0, order: i })),
              mainItems.getByName(StylingRequest.objectToQueryString({ target: z, area: 1, order: i })),
            ],
          });
        } catch (e) {
          break;
        }
      }
    } else {
      for (let i = 0; i < 100; i++) {
        try {
          tempArr.push({
            title: mainItems.getByName(StylingRequest.objectToQueryString({ target: z, title: 0, order: i })),
            area: [
              mainItems.getByName(StylingRequest.objectToQueryString({ target: z, area: 0, order: i })),
            ],
          });
        } catch (e) {
          break;
        }
      }
    }
    this.doms.wordings.push(tempArr);
  }

  return this.doms;
}

ExecMain.prototype.fileName = function () {
  return this.dir + "/test.pdf";
}

ExecMain.prototype.fileSave = function () {
  app.doScript("expandall", "contents_maker");
  let saveName = new File(this.fileName());
  let saveOpts = new PDFSaveOptions();
  saveOpts.pDFPreset = "uragenpdf";
  app.activeDocument.saveAs(saveName, saveOpts);
}

ExecMain.prototype.start = function (dayString) {
  let temp, tempArr;

  this.dayString = dayString;
  this.request = new StylingRequest(this.text);

  tempArr = this.dir.split("/");
  tempArr.pop();
  tempArr.pop();
  tempArr.push("factory");
  tempArr.push("template");
  tempArr.push("stylingrequest");
  tempArr.push("template.ai");
  this.log(tempArr.join('/'));

  //DEV ---------------------------------




  //DEV ---------------------------------

  app.open(new File(tempArr.join('/')));
  this.doms = this.request.readDoms();

  // this.fileSave();
  // app.activeDocument.close();
}
