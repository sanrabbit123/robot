const TableInput = function (titleDom, areaDom) {
  this.title = titleDom;
  this.area = areaDom;
}

TableInput.prototype.setValue = function (str) {
  this.area.contents = str;
}

const StylingRequest = function (text) {
  this.text = "기본값 설정";
  if (text) {
    this.text = text;
  }
  this.mother = new Mother();
  this.settings = {
    offsetY: 630,
    bottom: -1641.76953125,
    top: -953.6494140625,
    lastLineBottom: -1592.67409775648,
    lineHeight: 39.2854180031154,
    lastWordingBottom: -1560,
  };
  this.lastArtboardNumber = 0;
  this.lastBottom = this.settings.top;
  this.lines = [];

  const { project: { process: { contract: { remain: { calculation: { amount: { supply } } } } } } } = this.text;
  let matrix = [
    [
      [ "서비스비\n안내" ],
      [
        "- 이번 현장의 서비스비(소비자가)는 " + StylingRequest.autoComma(supply) + "원(VAT별도)으로 책정되어 있습니다.",
        "- 홈리에종의 계약금은 330,000원(VAT포함)으로 책정되어 있습니다.",
        "- 현재 고객은 홈리에종에 330,000원을 입금한 상태며, 현장 미팅 후 계약금을 제외한 서비스비를 전액 입금할 경우 서비스가 계속 진행됩니다.",
        "★ 현장 미팅 후 서비스비 지불 전에는 디자이너와 스타일링 논의를 할 수 없는 것이 원칙입니다. (고객에게도 필요시 안내해주세요)",
        "★ 서비스 진행중 타 공간에 대한 전체적인 스타일링이 추가되는 경우 꼭! 홈리에종을 통해 디자인비 조정이 될 수 있도록 해주세요.",
        "- 법인/개인사업자(일반과세), 개인사업자(간이과세), 프리랜서 정산 중에 정산 방식을 알려주시면 수수료를 제외한 정확한 정산액은 계산하여 말씀드리겠습니다.",
      ]
    ],
    [
      [ "고객 안내\n사항" ],
      [
        "- 디자이너와 카톡(문자)/전화/메일 등의 채널을 통해 커뮤니케이션 하면서 전체 스타일링을 완성합니다.",
        "- 커뮤니케이션에 적극적으로 참여해주시면 더 좋은 결과물을 얻으실 수 있습니다.",
        "- 디자이너와 현장 미팅을 진행하며 집컨디션/취향/생활특징/예산을 고려하여 컨설팅 해드립니다.",
        "- 시공팀은 추천하는 시공팀 외에 고객이 개별적으로 알아본 시공팀과 진행 가능합니다.",
        "- 시공 진행시 디자이너는 시공 방향 제시 및 전체 마감재를 셀렉해드립니다.",
        "- 기존에 사용하시는 가구들 중 가져갈 가구와 버릴 가구 선택 및 배치 / 활용 제안드립니다.",
        "- 새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "- 디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "- 생활용품, 식기, 가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 외관의 디자인 옵션을 의논하실 경우 전체 디자인을 고려하여 골라드립니다.",
        "- 생활용품과 식기의 경우, 고객님께서 찾으신 3~4품목중에서 셀렉은 가능합니다.",
        "- 디자이너 제안 후 고객 컨펌이 완료된 구매제품은 고객이 구매하실 수 있도록 안내드립니다.",
        "- 연계 업체의 제품 구매시, 할인 혜택을 받으실 수 있습니다. 모든 제품이 해당되는 것은 아니며 업체마다 차이가 있습니다.",
        "- 제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다.",
        "- 배송된 제품의 수령, 언박싱, 조립, 1차배치는 고객님께서 진행하시게 됩니다.",
        "- 구매 및 물품배치가 완료되면 디자이너의 마무리터치 후 인터뷰와 촬영을 진행합니다.",
      ]
    ],
    [
      [ "시공\n연계 수수료\n안내" ],
      [
        "★ 고객이 시공 계약을 체결한 곳에 공사진행과 A/S에 대한 책임이 있습니다. (고객에게 동일하게 안내합니다.)",
        "- 고객이 데려온 시공팀과 진행할 경우 디자이너는 시공자재 셀렉과 필요시 시공관련 커뮤니케이션 업무가 있을 수 있습니다.",
        "- 고객이 실장님 또는 실장님과 협업하시는 시공사와 시공 계약을 체결할 경우 전체 계약 금액의 5%가 시공 연계 수수료 입니다.",
        "★ 홈리에종은 적법한 방식의 시공계약을 권장하며, (세금 없는) 현금 거래로 시공을 진행했을 경우에도 시공 연계 수수료는 공급가에 VAT 10%를 더한 금액으로 전자세금계산서를 발행합니다. 입금하실 때에도 공급가에 VAT10% 더한 금액을 입금해주셔야합니다.",
      ]
    ],
    [
      [ "정산\n안내" ],
      [
        "- 홈리에종에서 받은 서비스비는 수수료를 제하고 스타일링 시작 후 실장님께 선금 50%를 먼저 정산하고스타일링이 마무리되면 나머지 50%를 정산합니다.",
        "- 스타일링 마무리는,",
        "1. 스타일링 제안이 마무리되어 제품들이 배송단계에 있고",
        "2. 촬영일이 (변동되더라도) 어느정도 정해지고",
        "3. 실장님께서 디자이너의 디자인 의도가 담긴 글(폼을 따로 드립니다) 저희쪽에 주시면, 홈리에종에서 고객님께 정산 여부를 확인 후 정산을 진행합니다.",
      ]
    ],
  ];
  this.static = matrix;
}

StylingRequest.autoComma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus, num, tmp;

  if (/\-/g.test(str)) {
    minus = /\-/g.exec(str)[0];
  } else {
    minus = '';
  }

  num = str.replace(/[^0-9]/g, '');
  tmp = '';

  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
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

StylingRequest.serviceParsing = function (obj, full = false) {
  let totalString;

  totalString = '';

  if (obj.online) {
    totalString += "온라인 ";
  } else {
    totalString += "오프라인 ";
  }

  if (obj.serid === "s2011_aa01s") {
    totalString += "홈퍼니싱";
  } else if (obj.serid === "s2011_aa02s") {
    totalString += "홈스타일링";
  } else if (obj.serid === "s2011_aa03s") {
    totalString += "토탈 스타일링";
  }

  if (!full) {
    totalString += ' ';
    if (obj.xValue === "M") {
      totalString += "mini";
    } else if (obj.xValue === "B") {
      totalString += "basic";
    } else if (obj.xValue === "P") {
      totalString += "premium";
    }
  }

  return totalString;
}

StylingRequest.refineArr = function (str) {
  let rawArr = str.split("\n");
  let result = [];
  let tempString;

  for (let i = 0; i < rawArr.length; i++) {
    if (!/^\<\%item\%\>/.test(rawArr[i]) && /[^ \n]/g.test(rawArr[i].replace(/[\n ]/g, ''))) {
      tempString = rawArr[i].replace(/^- /g, '').replace(/^-/g, '');
      result.push('- ' + tempString);
    }
  }

  return result.join("\n");
}

StylingRequest.prototype.artboardMaker = function () {
  let currentArt, newArt;
  let rect;
  let temp;
  let top, left, width, height

  currentArt = app.activeDocument.artboards.getByName("ab" + String(this.lastArtboardNumber));
  rect = currentArt.artboardRect;
  rect[0] = rect[0] + this.settings.offsetY;
  rect[2] = rect[2] + this.settings.offsetY;

  newArt = app.activeDocument.artboards.add(rect);
  newArt.name = "ab" + String(this.lastArtboardNumber + 1);

  top = this.doms.whiteBack.top;
  left = this.doms.whiteBack.left + (this.lastArtboardNumber * this.settings.offsetY);
  width = this.doms.whiteBack.width;
  height = this.doms.whiteBack.height;
  temp = app.activeDocument.pathItems.rectangle(top, left, width, height);
  temp.fillColor = this.mother.colorpick("#ffffff");
  temp.strokeColor = new NoColor();
  temp.zOrder(ZOrderMethod.SENDTOBACK);

  this.lastArtboardNumber = this.lastArtboardNumber + 1;
}

StylingRequest.prototype.serviceTableParsing = function () {
  const { history } = this.text;
  const { construct, styling } = history;
  let constructArr, stylingArr;
  let constructArr_refined, stylingArr_refined;
  let conceptInfo;
  let constructInfo;
  let stylingInfo;
  let tempArr;

  stylingArr = styling.split("\n");
  constructArr = construct.split("\n");

  stylingArr_refined = [];
  constructArr_refined = [];

  for (let i = 0; i < stylingArr.length; i++) {
    if (stylingArr[i] !== '' && stylingArr[i] !== '\n' && stylingArr[i] !== ' ' && stylingArr[i] !== '  ') {
      stylingArr_refined.push(stylingArr[i]);
    }
  }

  for (let i = 0; i < constructArr.length; i++) {
    if (constructArr[i] !== '' && constructArr[i] !== '\n' && constructArr[i] !== ' ' && constructArr[i] !== '  ') {
      constructArr_refined.push(constructArr[i]);
    }
  }

  tempArr = stylingArr_refined[1].split(':');
  conceptInfo = tempArr[tempArr.length - 1].replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '');
  constructInfo = constructArr_refined[0].replace(/^\<\%item\%\> /, '').replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '');
  stylingInfo = stylingArr_refined[0].replace(/^\<\%item\%\> /, '').replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '').replace(/^ /, '').replace(/ $/, '');

  return { conceptInfo, constructInfo, stylingInfo };
}

StylingRequest.prototype.intoTable = function () {
  const instance = this;
  const thisAi = app.activeDocument;

  const client = this.text;
  const { requests: [ latestRequest ] } = this.text;
  const { request, analytics } = latestRequest;
  const { date: { space: { precheck, empty, movein } } } = analytics;
  const { address, contract, pyeong, spec, resident } = request.space;
  const { designer, project, history } = this.text;
  const { conceptInfo, constructInfo, stylingInfo } = this.serviceTableParsing();

  const { table } = this.doms;
  const [ clientTable, spaceTable, serviceTable, etcTable ] = table;
  const [ nameInput, familyInput, addressInput, budgetInput ] = clientTable.area;
  const [ contractInput, pyeongInput, compositionInput, precheckInput, emptyInput, moveinInput ] = spaceTable.area;
  const [ serviceInput, conceptInput, constructInput, stylingInput ] = serviceTable.area;
  const [ etcInput ] = etcTable.area;

  const spaceComposition = function (spec) {
    let str;
    const { room, bathroom, valcony } = spec;
    str = '';
    str += "방 " + String(room) + "개, ";
    str += "화장실 " + String(bathroom) + "개, ";
    if (valcony) {
      str += "발코니 확장";
    } else {
      str += "발코니 확장 없음";
    }
    return str;
  }

  const dateReading = function (rawStr) {
    if (/^1[678]/.test(rawStr)) {
      return "정보 없음";
    } else {
      return rawStr.slice(0, 10);
    }
  }

  nameInput.setValue(client.name);
  familyInput.setValue(request.family);
  addressInput.setValue(address);
  budgetInput.setValue(request.budget);

  contractInput.setValue(contract);
  pyeongInput.setValue(String(pyeong) + "평");
  compositionInput.setValue(spaceComposition(spec));
  precheckInput.setValue(dateReading(precheck));
  emptyInput.setValue(dateReading(empty));
  moveinInput.setValue(dateReading(movein));

  serviceInput.setValue(StylingRequest.serviceParsing(this.text.project.service));
  conceptInput.setValue(conceptInfo);
  constructInput.setValue(constructInfo);
  stylingInput.setValue(stylingInfo);

  etcInput.setValue("(고객작성) " + request.etc.comment);
}

StylingRequest.prototype.readDoms = function () {
  const instance = this;
  const thisAi = app.activeDocument;
  let tempObj, tempObj2;
  let tempArr;
  let tempDom;
  let tempString;
  let main, mainItems;
  let table, area, areaItems;
  let right;
  let margin;
  let meetingDate;
  let dayArr;
  let meetingString;
  let dateTempArr, dateTempArr2, dateTempArr3;

  dayArr = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ];
  margin = 8;

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
  tempString += StylingRequest.serviceParsing(this.text.project.service) + " 서비스를 진행합니다.";

  tempDom = main.pageItems.getByName("initialWords");
  tempDom.contents = tempString;
  this.doms.initialWords = tempDom;

  //meeting
  dateTempArr = this.text.project.process.contract.meeting.date.split("T");
  dateTempArr2 = dateTempArr[0].split("-");
  dateTempArr3 = dateTempArr[1].split(":");
  meetingDate = new Date(Number(dateTempArr2[0]), Number(dateTempArr2[1] - 1), Number(dateTempArr2[2]), Number(dateTempArr3[0]), Number(dateTempArr3[1]), 0);
  meetingString = "\n\n" + "현장 미팅 : " + String(meetingDate.getMonth() + 1) + "/" + String(meetingDate.getDate()) + " " + dayArr[meetingDate.getDay()] + " " + (meetingDate.getHours() < 10 ? '0' + String(meetingDate.getHours()) : String(meetingDate.getHours())) + ":" + (meetingDate.getMinutes() < 10 ? '0' + String(meetingDate.getMinutes()) : String(meetingDate.getMinutes()));
  this.doms.meeting = {
    words: main.pageItems.getByName("meeting"),
    arrow: {
      head: main.pageItems.getByName("meetingArrowHead"),
      body: main.pageItems.getByName("meetingArrowBody"),
    }
  };
  this.doms.meeting.words.contents = meetingString;

  //arrow
  this.doms.meeting.arrow.head.left = this.mother.return_left(this.doms.meeting.words) - margin - this.doms.meeting.arrow.head.width;

  tempDom = this.doms.initialWords.duplicate();
  tempDom.contents = StylingRequest.serviceParsing(this.text.project.service) + " 서비스를 진행합니다.";

  right = this.mother.return_right(tempDom);
  this.doms.meeting.arrow.body.left = right + margin;
  this.doms.meeting.arrow.body.width = Math.abs(this.mother.return_right(this.doms.meeting.arrow.head) - this.doms.meeting.arrow.body.left);

  tempDom.remove();

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
      tempObj2 = new TableInput(areaItems.getByName(StylingRequest.objectToQueryString({ area: i, title: j })), areaItems.getByName(StylingRequest.objectToQueryString({ area: i, value: j })));
      tempObj.area.push(tempObj2);
    }
    this.doms.table.push(tempObj);
  }

  //wordings
  mainItems = main.pageItems;
  this.doms.wordings = [
    mainItems.getByName(StylingRequest.objectToQueryString({ target: 0, title: 0, order: 0 })),
    mainItems.getByName(StylingRequest.objectToQueryString({ target: 0, area: 0, order: 0 })),
    mainItems.getByName(StylingRequest.objectToQueryString({ target: 0, area: 1, order: 0 })),
  ];

  //page number
  this.doms.pageNumber = main.pageItems.getByName("pageNumber");

  //last static wordings
  this.doms.lastStatic = main.pageItems.getByName("lastStatic");

  //white back
  this.doms.whiteBack = main.pageItems.getByName("whiteBack");

  return this.doms;
}

StylingRequest.prototype.intoClientHistory = function () {
  const { history: { history, space, styling, construct, budget, progress } } = this.text;
  const columns = [
    "현장 관련",
    "시공 관련",
    "스타일링",
    "예산 관련",
    "기타 사항",
  ];
  const staticHistory = [
    "★ 고객의 전체 예산과 예산 활용 관련하여 미팅시 꼭 논의해주세요! 이슈가 발생하는 부분입니다.",
    "★ 시공에 필요한 예산과 스타일링에 필요한 예산을 구분해서 대략적으로 안내해주셔야 합니다.",
    "",
    "- 미팅 전에 고객님과 일정 및 장소 확인 연락 부탁드립니다!",
  ];
  let historyString0, historyString1;
  let lineLengthArr;
  let totalArrDom0, totalArrDom1;

  lineLengthArr = [];

  this.doms.wordings[2].contents = StylingRequest.refineArr(space);
  lineLengthArr.push(this.doms.wordings[2].lines.length);

  this.doms.wordings[2].contents = StylingRequest.refineArr(construct);
  lineLengthArr.push(this.doms.wordings[2].lines.length);

  this.doms.wordings[2].contents = StylingRequest.refineArr(styling);
  lineLengthArr.push(this.doms.wordings[2].lines.length);

  this.doms.wordings[2].contents = StylingRequest.refineArr(budget) + staticHistory.join("\n");
  lineLengthArr.push(this.doms.wordings[2].lines.length - 1);

  historyString1 = '';
  historyString1 += StylingRequest.refineArr(space);
  historyString1 += "\n\n";
  historyString1 += StylingRequest.refineArr(construct);
  historyString1 += "\n\n";
  historyString1 += StylingRequest.refineArr(styling);
  historyString1 += "\n\n";
  historyString1 += StylingRequest.refineArr(budget);
  historyString1 += "\n";
  historyString1 += staticHistory.join("\n");

  this.doms.wordings[2].contents = historyString1;

  historyString0 = '';
  for (let i = 0; i < columns.length; i++) {
    historyString0 += columns[i];
    if (lineLengthArr[i] !== undefined) {
      for (let j = 0; j < lineLengthArr[i] - 1; j++) {
        historyString0 += "\n";
      }
      historyString0 += "\n\n";
    }
  }
  this.doms.wordings[1].contents = historyString0;

  this.domLineCutSet([
    this.doms.wordings[0],
    this.doms.wordings[1],
    this.doms.wordings[2]
  ]);

  return this.doms.wordings[2].top;
}

StylingRequest.prototype.domToLineArr = function (dom) {
  let resultArr = [];
  let tempObj;
  let tempString;
  let tempDom;
  let temp;

  for (let i = 0; i < dom.lines.length; i++) {
    tempDom = dom.duplicate();
    tempObj = {};
    tempString = '';
    for (let j = 0; j < i; j++) {
      tempString += "\n";
    }
    if (dom.lines[i].contents !== '') {
      tempString += dom.lines[i].contents;
    } else {
      tempString += "샘플";
    }
    tempDom.contents = tempString;
    tempDom = tempDom.createOutline();
    tempObj.top = tempDom.top;
    tempObj.bottom = tempDom.top - tempDom.height;

    tempObj.contents = dom.lines[i].contents;
    resultArr.push(tempObj);

    tempDom.remove();
  }

  this.colorPoint(dom);

  return resultArr;
}

StylingRequest.prototype.colorPoint = function (dom, custom = false) {
  let boo = custom;

  for (let i = 0; i < dom.lines.length; i++) {
    if (/^★/.test(dom.lines[i].contents)) {
      boo = true;
    } else if (/^- /.test(dom.lines[i].contents)) {
      boo = false;
    }
    if (boo) {
      dom.lines[i].characterAttributes.fillColor = this.mother.colorpick("#2fa678");
    } else {
      dom.lines[i].characterAttributes.fillColor = this.mother.colorpick("#565758");
    }
  }
}

StylingRequest.prototype.domLineCutSet = function (setArr) {
  const thisNum = setArr.length;
  let tempDom0, tempDom1, tempDom2;
  let tempLine;
  let tempArr0, tempArr1;

  if (thisNum === 2) {
    const { lastBoo, originalArr, lastIndex, leftContents, lastNoEmpty, previousArr } = this.domLineCut(setArr[1]);

    if (lastBoo) {
      this.artboardMaker();

      tempDom0 = setArr[0].duplicate();
      tempDom1 = setArr[1].duplicate();

      tempArr0 = leftContents.split("\n");

      if (tempArr0[0] === '') {

        tempArr0.shift();

        tempDom1.contents = tempArr0.join("\n");

      } else {

        tempDom1.contents = leftContents;

      }

      this.colorPoint(tempDom1, /^★/.test(lastNoEmpty));

      tempDom0.left = tempDom0.left + this.settings.offsetY;
      tempDom1.left = tempDom1.left + this.settings.offsetY;

      tempDom0.top = this.settings.top;
      tempDom1.top = this.settings.top;

      if (this.mother.return_bottom(tempDom1) <= this.settings.bottom) {
        this.domLineCutSet([ tempDom0, tempDom1 ]);
      } else if (this.mother.return_bottom(tempDom1) > this.settings.bottom && this.mother.return_bottom(tempDom1) <= this.settings.lastLineBottom) {
        this.lastBottom = this.settings.top;
      } else {
        tempLine = this.mother.lineMaker([
          [ tempDom0.left, this.mother.return_bottom(tempDom1) - this.settings.lineHeight ],
          [ tempDom1.left + tempDom1.width, this.mother.return_bottom(tempDom1) - this.settings.lineHeight ]
        ], {
          strokeColor: this.mother.colorpick("#dddddd"),
          strokeWidth: 0.5
        });
        this.lines.unshift(tempLine);
        this.lastBottom = this.mother.return_bottom(tempDom1) - (this.settings.lineHeight * 2);
      }

      if (lastIndex === 0) {
        setArr[0].remove();
      }

    } else {

      this.colorPoint(setArr[1]);

      if (this.mother.return_bottom(setArr[1]) > this.settings.bottom && this.mother.return_bottom(setArr[1]) <= this.settings.lastLineBottom) {
        this.lastBottom = this.settings.top;
      } else {
        tempLine = this.mother.lineMaker([
          [ setArr[0].left, this.mother.return_bottom(setArr[1]) - this.settings.lineHeight ],
          [ setArr[1].left + setArr[1].width, this.mother.return_bottom(setArr[1]) - this.settings.lineHeight ]
        ], {
          strokeColor: this.mother.colorpick("#dddddd"),
          strokeWidth: 0.5
        });
        this.lines.unshift(tempLine);
        this.lastBottom = this.mother.return_bottom(setArr[1]) - (this.settings.lineHeight * 2);
      }

    }

  } else if (thisNum === 3) {
    const { leftContents: leftContents0, lastNoEmpty } = this.domLineCut(setArr[1]);
    const { lastBoo, originalArr, lastIndex, leftContents: leftContents1, lastNoEmpty: lastNoEmpty1, previousArr } = this.domLineCut(setArr[2]);

    if (lastBoo) {
      this.artboardMaker();

      tempDom0 = setArr[0].duplicate();
      tempDom1 = setArr[1].duplicate();
      tempDom2 = setArr[2].duplicate();

      tempArr0 = leftContents0.split("\n");
      tempArr1 = leftContents1.split("\n");

      if (tempArr0[0] === '' && tempArr1[0] !== '') {

        tempArr0.shift();
        tempArr0.unshift(lastNoEmpty);

        tempDom1.contents = tempArr0.join("\n");
        tempDom2.contents = leftContents1;

      } else if (tempArr0[0] === '' && tempArr1[0] === '') {

        tempArr0.shift();
        tempArr1.shift();

        tempDom1.contents = tempArr0.join("\n");
        tempDom2.contents = tempArr1.join("\n");

      } else {

        tempDom1.contents = leftContents0;
        tempDom2.contents = leftContents1;

      }

      this.colorPoint(tempDom1);
      if (!/^★/.test(lastNoEmpty1) && !/^- /.test(lastNoEmpty1)) {
        this.colorPoint(tempDom2, /^★/.test(previousArr[previousArr.length - 2]));
      } else {
        this.colorPoint(tempDom2, /^★/.test(lastNoEmpty1));
      }

      tempDom0.left = tempDom0.left + this.settings.offsetY;
      tempDom1.left = tempDom1.left + this.settings.offsetY;
      tempDom2.left = tempDom2.left + this.settings.offsetY;

      tempDom0.top = this.settings.top;
      tempDom1.top = this.settings.top;
      tempDom2.top = this.settings.top;

      if (this.mother.return_bottom(tempDom2) <= this.settings.bottom) {
        this.domLineCutSet([ tempDom0, tempDom1, tempDom2 ]);
      } else if (this.mother.return_bottom(tempDom1) > this.settings.bottom && this.mother.return_bottom(tempDom1) <= this.settings.lastLineBottom) {
        this.lastBottom = this.settings.top;
      } else {
        tempLine = this.mother.lineMaker([
          [ tempDom0.left, this.mother.return_bottom(tempDom1) - this.settings.lineHeight ],
          [ tempDom2.left + tempDom2.width, this.mother.return_bottom(tempDom1) - this.settings.lineHeight ]
        ], {
          strokeColor: this.mother.colorpick("#dddddd"),
          strokeWidth: 0.5
        });
        this.lines.unshift(tempLine);
        this.lastBottom = this.mother.return_bottom(tempDom1) - (this.settings.lineHeight * 2);
      }

      if (lastIndex === 0) {
        setArr[0].remove();
      }

    } else {

      this.colorPoint(setArr[1]);
      this.colorPoint(setArr[2]);

      if (this.mother.return_bottom(setArr[1]) > this.settings.bottom && this.mother.return_bottom(setArr[1]) <= this.settings.lastLineBottom) {
        this.lastBottom = this.settings.top;
      } else {
        tempLine = this.mother.lineMaker([
          [ setArr[0].left, this.mother.return_bottom(setArr[1]) - this.settings.lineHeight ],
          [ setArr[2].left + setArr[2].width, this.mother.return_bottom(setArr[1]) - this.settings.lineHeight ]
        ], {
          strokeColor: this.mother.colorpick("#dddddd"),
          strokeWidth: 0.5
        });
        this.lines.unshift(tempLine);
        this.lastBottom = this.mother.return_bottom(setArr[1]) - (this.settings.lineHeight * 2);
      }

    }
  }
}

StylingRequest.prototype.domLineCut = function (dom) {
  const lineArr = this.domToLineArr(dom);
  let lastIndex;
  let resultContents;
  let lastBoo;
  let lastNoEmpty;
  let previousArr;

  lastBoo = false;
  lastIndex = lineArr.length;
  for (let i = 0; i < lineArr.length; i++) {
    if (lineArr[i].top > this.settings.bottom) {
      lastIndex = i;
      lastBoo = true;
    }
  }

  if (lastIndex === lineArr.length - 1 && lineArr[lineArr.length - 1].bottom >= this.settings.lastWordingBottom) {
    lastBoo = false;
  }

  resultContents = '';
  previousArr = [];
  for (let i = 0; i < (lastBoo ? lastIndex : lineArr.length); i++) {
    resultContents += lineArr[i].contents;
    resultContents += "\n";
    if (lineArr[i].contents !== '') {
      lastNoEmpty = lineArr[i].contents;
      previousArr.push(lineArr[i].contents);
    }
  }
  resultContents = resultContents.slice(0, -1);
  dom.contents = resultContents;

  resultContents = '';
  for (let i = lastIndex; i < lineArr.length; i++) {
    resultContents += lineArr[i].contents;
    resultContents += "\n";
  }
  resultContents = resultContents.slice(0, -1);
  leftContents = lastBoo ? resultContents : '';

  return { lastBoo, originalArr: lineArr, lastIndex, leftContents, lastNoEmpty, previousArr };
}

StylingRequest.prototype.copyWording = function (mode = 2) {
  let tempDom0, tempDom1, tempDom2;
  if (mode === 2) {

    tempDom0 = this.doms.wordings[0].duplicate();
    tempDom1 = this.doms.wordings[1].duplicate();

    tempDom0.left = tempDom0.left + (this.lastArtboardNumber * this.settings.offsetY);
    tempDom1.left = tempDom1.left + (this.lastArtboardNumber * this.settings.offsetY);

    tempDom0.top = this.lastBottom;
    tempDom1.top = this.lastBottom;

    tempDom0.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-fSm");
    tempDom1.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-dRg");

    return [ tempDom0, tempDom1 ];

  } else {

    tempDom0 = this.doms.wordings[0].duplicate();
    tempDom1 = this.doms.wordings[1].duplicate();
    tempDom2 = this.doms.wordings[2].duplicate();

    tempDom0.left = tempDom0.left + (this.lastArtboardNumber * this.settings.offsetY);
    tempDom1.left = tempDom1.left + (this.lastArtboardNumber * this.settings.offsetY);
    tempDom2.left = tempDom2.left + (this.lastArtboardNumber * this.settings.offsetY);

    tempDom0.top = this.lastBottom;
    tempDom1.top = this.lastBottom;
    tempDom2.top = this.lastBottom;

    tempDom0.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-fSm");
    tempDom1.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-fSm");
    tempDom2.textRange.characterAttributes.textFont = textFonts.getByName("SDGothicNeoa-dRg");

    return [ tempDom0, tempDom1, tempDom2 ];

  }
}

StylingRequest.prototype.staticMaker = function () {
  let tempArr;
  for (let i = 0; i < this.static.length; i++) {
    tempArr = this.copyWording(2);
    tempArr[0].contents = this.static[i][0][0];
    tempArr[1].contents = this.static[i][1].join("\n");
    this.domLineCutSet(tempArr);
  }
  if (this.lines.length === 5) {
    this.lines[0].remove();
  }
}

StylingRequest.prototype.setPageNumber = function () {
  const { pageNumber, lastStatic } = this.doms;
  let tempDom;
  for (let i = 0; i < this.lastArtboardNumber + 1; i++) {
    tempDom = pageNumber.duplicate();
    tempDom.left = tempDom.left + (this.settings.offsetY * i);
    tempDom.contents = String(i + 1);
  }

  lastStatic.left = lastStatic.left + (this.settings.offsetY * this.lastArtboardNumber);

  if (this.lastBottom >= -1527.37037461361 && this.lastBottom < this.settings.top) {
    tempDom.remove();
  } else {
    lastStatic.remove();
  }

  this.colorPoint(this.doms.wordings[1]);
  this.colorPoint(this.doms.wordings[2]);

}

ExecMain.prototype.fileName = function () {
  const { designer: { desid, designer }, name } = this.text;
  return this.dir + '/' + desid + '_' + designer + '_' + name + '_' + this.dayString + ".pdf";
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

  app.open(new File(tempArr.join('/')));
  this.doms = this.request.readDoms();
  this.request.intoTable();
  // this.request.intoClientHistory();
  // this.request.staticMaker();
  //
  // this.request.setPageNumber();
  //
  // this.fileSave();
  // app.activeDocument.close();
}
