DesignerJs.prototype.contentsBase = function (search = null) {
  const instance = this;
  const { ea, belowHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { white, green } = colorChip;
  let totalMother;
  let margin;
  let titleArea, contentsArea;
  let titleDesigner, titleProject, titleTime;
  let contentsDesigner, contentsProject, contentsTong;
  let size;
  let borderBack;
  let dashBoardHeight, dashBoardMargin;
  let dashBoard;
  let topMargin, leftMargin;

  margin = 30;
  size = 18;
  dashBoardHeight = 49;
  dashBoardMargin = 16;
  topMargin = 21;
  leftMargin = 20;

  totalMother = createNode({
    mother: document.getElementById("totalcontents"),
    class: [ "totalMother" ],
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      paddingTop: String(margin) + ea,
      paddingLeft: String(margin) + ea,
      paddingRight: String(margin) + ea,
      width: withOut(margin * 2, ea),
      height: withOut(margin + belowHeight, ea),
    }
  });
  this.totalMother = totalMother;

  [ borderBack, dashBoard, contentsArea, contentsTong ] = createNodes([
    {
      mother: totalMother,
      style: {
        position: "absolute",
        top: String(margin + dashBoardHeight + dashBoardMargin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin + dashBoardHeight + dashBoardMargin, ea),
        borderBottom: String(0),
        borderTopLeftRadius: String(3) + "px",
        borderTopRightRadius: String(3) + "px",
        boxSizing: "border-box",
        background: colorChip.gray2,
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: String(dashBoardHeight) + ea,
        marginBottom: String(dashBoardMargin) + ea,
        background: colorChip.gray2,
        borderRadius: String(3) + "px",
        textAlign: "center",
      }
    },
    {
      mother: totalMother,
      style: {
        position: "relative",
        height: withOut(dashBoardHeight + dashBoardMargin, ea),
      }
    },
    {
      mother: -1,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(topMargin) + ea,
        paddingLeft: String(leftMargin) + ea,
        paddingRight: String(leftMargin) + ea,
        height: String(100) + '%',
        width: String(100) + '%',
        top: String(0) + ea,
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
      }
    }
  ]);

  this.contentsSpec.contentsTong = contentsTong;
  this.contentsSpec.dashBoard = dashBoard;
  this.contentsBlockInjection();
  this.contentsDashBoard();
}

DesignerJs.prototype.contentsWhiteBlock = function (mother, project, last, index) {
  if (mother === undefined || project === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { address, contents: { photo, raw, share, sns } } = project;
  const { boo, date, info: { interviewer, photographer }, status } = photo;
  const { portfolio: { status: portfolioStatus, link: portfolioLink }, interview: { status: interviewStatus, link: interviewLink }, photo: { status: photoStatus, link: photoLink } } = raw;
  const { client: { photo: photoClient, contents: contentsClient }, designer: { photo: photoDesigner, contents: contentsDesigner } } = share;
  const { portfolio: { long: longPortfolio, short: shortPortfoilo }, interview: { long: longInterview, short: shortInterview } } = sns;
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const textMaker = (title, value, color = "black") => { const space = "&nbsp;"; return `<b style="color:${colorChip.gray5};font-weight:200">${title}${space}:</b>${space}<b style="color:${colorChip[color]}">${value}</b>`; }
  const dateToString = (dateObj) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "미정";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "해당 없음";
    } else {
      return `${String(dateObj.getFullYear())}-${zeroAddition(dateObj.getMonth() + 1)}-${zeroAddition(dateObj.getDate())}`;
    }
  }
  const dateToColor = (dateObj, reverse = true) => {
    if (dateObj.valueOf() > (new Date(3000, 0, 1)).valueOf()) {
      return "red";
    } else if (dateObj.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
      return "gray5";
    } else {
      if (dateObj.valueOf() <= (new Date()).valueOf()) {
        return !reverse ? "green" : "black";
      } else {
        return !reverse ? "black" : "green";
      }
    }
  }
  let height, margin;
  let whiteBlock;
  let width0, width1;
  let top, left, size;
  let textMargin;
  let startLeft;
  let previousWidth, betweenText;
  let widthArr, domArr;
  let totalObj;
  let tempQsa;
  let circle, whiteBack;
  let radius;
  let circleTop;
  let redPoint;
  let whiteWidth;
  let stringArr, tempDom;
  let tempString;

  totalObj = [];

  height = 41;
  margin = 4;

  width0 = 115;
  width1 = 3;

  top = 9;
  left = 16;
  size = 15;
  textMargin = 6;
  startLeft = 160;
  betweenText = 28;
  totalObj.push(startLeft);
  totalObj.push(betweenText);

  radius = 4;
  circleTop = 16;
  redPoint = false;
  whiteWidth = 40;

  stringArr = [];

  if (this.type === "photo") {

    stringArr.push(textMaker("촬영 여부", boo ? 'O' : 'X'));
    stringArr.push(textMaker("촬영일", dateToString(date), dateToColor(date, true)));

    if (date.valueOf() > (new Date(3000, 0, 1).valueOf())) {
      stringArr.push(textMaker("촬영 시간", `${zeroAddition(date.getHours())}시`, "red"));
      redPoint = true;
    } else if (date.valueOf() > (new Date(2000, 0, 1).valueOf())) {
      if (date.valueOf() >= (new Date()).valueOf()) {
        stringArr.push(textMaker("촬영 시간", `${zeroAddition(date.getHours())}시`, "green"));
      } else {
        stringArr.push(textMaker("촬영 시간", `${zeroAddition(date.getHours())}시`));
      }
    } else {
      stringArr.push(textMaker("촬영 시간", `${zeroAddition(date.getHours())}시`, "gray5"));
    }

    stringArr.push(textMaker("촬영 상태", status));
    stringArr.push(textMaker("포토", photographer, (photographer === "미정" ? "red" : "black")));
    stringArr.push(textMaker("인터뷰어", interviewer, (interviewer === "미정" ? "red" : "black")));
    if (photographer === "미정" || interviewer === "미정") {
      redPoint = true;
    }
    stringArr.push(textMaker("주소", address));

  } else if (this.type === "source") {

    stringArr.push(textMaker("디자이너글 상태", portfolioStatus, /요망/gi.test(portfolioStatus) ? "red" : (/편집 완료/gi.test(portfolioStatus) ? "green" : "black")));
    stringArr.push(textMaker("디자이너글 링크", portfolioLink === '' ? "링크 없음" : "링크 이동"));
    stringArr.push(textMaker("인터뷰 상태", interviewStatus, /요망/gi.test(interviewStatus) ? "red" : (/편집 완료/gi.test(interviewStatus) ? "green" : "black")));
    stringArr.push(textMaker("인터뷰 링크", interviewLink === '' ? "링크 없음" : "링크 이동"));
    stringArr.push(textMaker("원본 사진 상태", photoStatus, /요망/gi.test(photoStatus) ? "red" : (/보정 완료/gi.test(photoStatus) ? "green" : "black")));
    stringArr.push(textMaker("원본 사진 링크", photoLink === '' ? "링크 없음" : "링크 이동"));

    if (/요망/gi.test(portfolioStatus) || /요망/gi.test(interviewStatus) || /요망/gi.test(photoStatus)) {
      redPoint = true;
    }

  } else if (this.type === "contents") {

    tempString = dateToString(longPortfolio);
    stringArr.push(textMaker("블로그 디자이너글", tempString, dateToColor(longPortfolio, false)));
    if (/미정/gi.test(tempString)) {
      redPoint = true;
    }
    tempString = dateToString(longInterview);
    stringArr.push(textMaker("블로그 인터뷰", tempString, dateToColor(longInterview, false)));
    if (/미정/gi.test(tempString)) {
      redPoint = true;
    }
    tempString = dateToString(shortPortfoilo);
    stringArr.push(textMaker("인스타 디자이너글", tempString, dateToColor(shortPortfoilo, false)));
    if (/미정/gi.test(tempString)) {
      redPoint = true;
    }
    tempString = dateToString(shortInterview);
    stringArr.push(textMaker("인스타 인터뷰", tempString, dateToColor(shortInterview, false)));
    if (/미정/gi.test(tempString)) {
      redPoint = true;
    }

    stringArr.push(textMaker("웹 발행", dateToString(project.web), dateToColor(project.web, false)));
    stringArr.push(textMaker("컨텐츠 아이디", project.pid, "black"));

  } else if (this.type === "share") {

    stringArr.push(textMaker("고객 사진 공유", dateToString(photoClient).replace(/미정/g, "예정"), dateToColor(photoClient, false).replace(/red/gi, "black")));
    stringArr.push(textMaker("고객 컨텐츠 공유", dateToString(contentsClient).replace(/미정/g, "예정"), dateToColor(contentsClient, false).replace(/red/gi, "black")));
    stringArr.push(textMaker("디자이너 사진 공유", dateToString(photoDesigner).replace(/미정/g, "예정"), dateToColor(photoDesigner, false).replace(/red/gi, "black")));
    stringArr.push(textMaker("디자이너 컨텐츠 공유", dateToString(contentsDesigner).replace(/미정/g, "예정"), dateToColor(contentsDesigner, false).replace(/red/gi, "black")));
    stringArr.push(textMaker("원본 사진 상태", photoStatus, /요망/gi.test(photoStatus) ? "red" : (/보정 완료/gi.test(photoStatus) ? "green" : "black")));
    stringArr.push(textMaker("컨텐츠 아이디", project.pid, "black"));

  }

  [ whiteBlock ] = createNodes([
    {
      mother,
      attribute: [
        { index: String(index) }
      ],
      style: {
        display: instance.contentsSearchIndex.includes(index) ? "none" : "block",
        position: "relative",
        background: colorChip[boo ? "white" : "gray0"],
        width: String(100) + '%',
        height: String(height) + ea,
        borderRadius: String(5) + "px",
        marginBottom: String(margin * (!last ? 1 : 60)) + ea,
        overflow: "hidden",
      }
    },
    {
      mother: -1,
      text: project.title,
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + project.proid;
          }
        }
      ],
      style: {
        position: "absolute",
        width: String(width0) + ea,
        top: String(top + 1) + ea,
        left: String(left) + ea,
        fontSize: String(size) + ea,
      }
    },
    {
      mother: -2,
      text: '|',
      style: {
        position: "absolute",
        width: String(width1) + ea,
        top: String(top + 1) + ea,
        left: String(left + width0 + textMargin) + ea,
        fontSize: String(size) + ea,
        color: colorChip.gray4
      }
    },
  ]);

  widthArr = [];
  domArr = [];
  for (let str of stringArr) {
    tempDom = createNode({
      mother: whiteBlock,
      text: str,
      style: {
        position: "absolute",
        top: String(top) + ea,
        left: String(startLeft) + ea,
        fontSize: String(size) + ea,
        fontWeight: String(400),
      }
    });
    domArr.push(tempDom);
    previousWidth = tempDom.getBoundingClientRect().width;
    widthArr.push(previousWidth);
    startLeft = startLeft + previousWidth + betweenText;
  }
  totalObj.push(widthArr);
  totalObj.push(domArr);

  [ whiteBack, circle ] = createNodes([
    {
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(0) + ea,
        right: String(0) + ea,
        width: String(whiteWidth) + ea,
        height: String(100) + '%',
        background: colorChip["white"]
      }
    },
    {
      mother: whiteBlock,
      style: {
        position: "absolute",
        top: String(circleTop) + ea,
        right: String(left + 1) + ea,
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        borderRadius: String(radius * 2) + ea,
        background: colorChip[redPoint ? "red" : "green"]
      }
    }
  ]);

  if (!boo) {
    tempQsa = whiteBlock.querySelectorAll("div");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    tempQsa = whiteBlock.querySelectorAll("b");
    for (let dom of tempQsa) {
      dom.style.color = colorChip.gray4;
    }
    whiteBack.style.background = colorChip.gray0;
    circle.style.background = colorChip.gray4;
  }

  this.contentsBlocks.push(whiteBlock);

  return totalObj;
}

DesignerJs.prototype.contentsBlockInjection = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut, cleanChildren } = GeneralJs;
  const { contentsTong } = this.contentsSpec;
  let scrollTong;
  let width, dom;
  let maxWidth;
  let startLeft, betweenText, widthArr, domArr;
  let temp;
  let actionList;

  cleanChildren(contentsTong);

  actionList = [
    "응대 대기",
    "현장 미팅",
    "1차 제안",
    "수정 제안",
    "시공 진행",
    "제품 구매",
    "배송중",
  ];

  scrollTong = createNode({
    mother: contentsTong,
    style: {
      position: "relative",
      width: String(100) + '%',
    }
  });

  width = [];
  dom = [];
  maxWidth = [];

  projects.sort((a, b) => { return b.contents.photo.date.valueOf() - a.contents.photo.date.valueOf(); });

  this.contentsBlocks = [];
  for (let i = 0; i < projects.length; i++) {
    if (!actionList.includes(projects[i].process.action)) {
      [ startLeft, betweenText, widthArr, domArr ] = this.contentsWhiteBlock(scrollTong, projects[i], (i === projects.length - 1), i);
      width.push(widthArr);
      dom.push(domArr);
    }
  }

  if (width.length > 0) {
    for (let i = 0; i < width[0].length; i++) {
      width.sort((a, b) => { return b[i] - a[i] });
      maxWidth.push(width[0][i]);
    }
    for (let i = 0; i < dom.length; i++) {
      temp = startLeft;
      for (let j = 0; j < dom[i].length; j++) {
        dom[i][j].style.left = String(temp) + ea;
        dom[i][j].style.width = String(maxWidth[j] + 1) + ea;
        temp += maxWidth[j] + betweenText;
      }
    }
  }

}

DesignerJs.prototype.contentsDashBoard = function () {
  const instance = this;
  const { ea, projects } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const { dashBoard } = this.contentsSpec;
  let size, top, left;
  let nodeArr;
  let textArr;
  let typeNum;
  let dashBoardBox;

  size = 16;
  top = 11;
  left = 19;

  textArr = [];
  typeNum = 0;
  for (let i = 0; i < this.typeArr.length; i++) {
    if (this.typeArr[i] === this.type) {
      typeNum = i;
    }
    textArr.push(this.typeArr[i].slice(0, 1).toUpperCase() + this.typeArr[i].slice(1));
  }

  dashBoardBox = createNode({
    mother: dashBoard,
    style: {
      position: "relative",
      width: withOut(left * 2, ea),
      height: String(100) + '%',
      left: String(left) + ea,
      textAlign: "left",
    }
  });

  nodeArr = [];
  for (let i = 0; i < textArr.length; i++) {
    nodeArr.push({
      mother: dashBoardBox,
      text: textArr[i],
      class: [ "hoverDefault" ],
      attribute: [
        { value: instance.typeArr[i] }
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.type = this.getAttribute("value");
            for (let i = 0; i < instance.typeArr.length; i++) {
              if (instance.typeArr[i] === instance.type) {
                instance.typeDoms[i].style.color = colorChip.green;
              } else {
                instance.typeDoms[i].style.color = colorChip.shadow;
              }
            }
            instance.contentsBlockInjection();
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        fontFamily: "graphik",
        fontSize: String(size) + ea,
        fontWeight: String(400),
        top: String(top) + ea,
        color: colorChip[i === typeNum ? "green" : "shadow"],
      }
    });
    if (i !== textArr.length - 1) {
      nodeArr.push({
        mother: dashBoardBox,
        text: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`,
        style: {
          display: "inline-block",
          position: "relative",
          fontFamily: "graphik",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          top: String(top) + ea,
          color: colorChip.gray5
        }
      });
    }
  }
  nodeArr.push({
    mother: dashBoardBox,
    text: 'D',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/designer?mode=general");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(0) + ea,
      fontStyle: "italic",
      color: colorChip["black"],
    }
  });
  nodeArr.push({
    mother: dashBoardBox,
    text: 'C',
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + "/project");
        }
      }
    ],
    style: {
      position: "absolute",
      fontFamily: "graphik",
      fontSize: String(size + 2) + ea,
      fontWeight: String(500),
      top: String(top - 1) + ea,
      right: String(18) + ea,
      fontStyle: "italic",
      color: colorChip["black"],
    }
  });

  nodeArr.push({
    mother: dashBoardBox,
    mode: "svg",
    source: this.mother.returnHamburger(colorChip.black),
    class: [ "hoverDefault" ],
    events: [
      {
        type: "click",
        event: function (e) {
          instance.contentsSearchIndex = [];
          instance.contentsBlockInjection();
        }
      }
    ],
    style: {
      position: "absolute",
      height: String(11) + ea,
      top: String(18) + ea,
      right: String(38) + ea,
    }
  });

  nodeArr = createNodes(nodeArr);
  instance.typeDoms = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i % 2 === 0) {
      instance.typeDoms.push(nodeArr[i]);
    }
  }
}

DesignerJs.prototype.contentsSearchEvent = function () {
  const instance = this;
  const { ea } = this;
  const input = this.searchInput;
  let width, length;

  length = this.projects.length;
  width = 800;

  input.parentNode.style.width = String(width) + ea;
  input.parentNode.style.left = GeneralJs.withOut(50, width / 2, ea);
  input.addEventListener("keypress", function (e) {
    let tempArr, orArr;
    if (e.key === "Enter") {
      instance.contentsSearchIndex = [];
      orArr = [];
      tempArr = this.value.trim().split(',');
      for (let value of tempArr) {
        if (value.trim() !== '' && value.trim() !== '.') {
          for (let dom of instance.contentsBlocks) {
            if ((new RegExp(value.trim(), "gi")).test(dom.textContent)) {
              orArr.push(Number(dom.getAttribute("index")));
            }
          }
        }
      }
      if (this.value.trim() !== '' && this.value.trim() !== '.') {
        for (let i = 0; i < length; i++) {
          if (!orArr.includes(i)) {
            instance.contentsSearchIndex.push(i);
          }
        }
      }
      instance.contentsBlockInjection();
    }
  });
}

DesignerJs.prototype.contentsView = async function () {
  const instance = this;
  try {
    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
    }
    const { createNodes, colorChip, ajaxJson, sleep, returnGet, equalJson } = GeneralJs;
    let loading;
    let projects;
    let designers, desidArr_raw, desidArr;
    let clients, cliidArr_raw, cliidArr;
    let proidArr_raw;
    let contents;
    let temp;
    let type, typeArr;

    loading = await this.mother.loadingRun();

    typeArr = [ "photo", "source", "contents", "share" ];
    type = returnGet().type;
    if (type === undefined || type === null || !typeArr.includes(type)) {
      type = typeArr[0];
    }

    this.typeArr = typeArr;
    this.type = type;
    this.contentsSpec = {};
    this.contentsSearchIndex = [];
    this.contentsBlocks = null;

    projects = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $and: [
          { desid: { $regex: "^d" } },
          { "process.status": { $regex: "^[진홀]" } },
          { "process.calculation.payments.first.date": { $gte: new Date(2000, 0, 1) } }
        ]
      }
    }, "/getProjects", { equal: true }));

    desidArr_raw = [];
    cliidArr_raw = [];
    proidArr_raw = [];
    for (let project of projects) {
      desidArr_raw.push(project.desid);
      cliidArr_raw.push(project.cliid);
      proidArr_raw.push({ proid: project.proid });
    }

    desidArr_raw = Array.from(new Set(desidArr_raw));
    desidArr = [];
    for (let desid of desidArr_raw) {
      desidArr.push({ desid });
    }
    cliidArr_raw = Array.from(new Set(cliidArr_raw));
    cliidArr = [];
    for (let cliid of cliidArr_raw) {
      cliidArr.push({ cliid });
    }

    designers = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: desidArr
      }
    }, "/getDesigners", { equal: true }));

    clients = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: cliidArr
      }
    }, "/getClients"));

    contents = new SearchArray(await ajaxJson({
      noFlat: true,
      whereQuery: {
        $or: proidArr_raw
      }
    }, "/getContents", { equal: true }));

    for (let p of projects) {
      p.designer = designers.search("desid", p.desid).designer;
      temp = clients.search("cliid", p.cliid);
      p.name = temp.name;
      p.address = temp.requests[0].request.space.address;
      p.title = `${p.designer} <b style="color:${colorChip.green}">D</b>&nbsp;&nbsp;${p.name} <b style="color:${colorChip.green}">C</b>`;
      temp = contents.search("proid", p.proid);
      if (temp !== null) {
        p.web = temp.contents.portfolio.date;
        p.pid = temp.contents.portfolio.pid;
      } else {
        p.web = p.contents.sns.interview.long;
        p.pid = "미정";
      }
    }

    this.projects = projects;
    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);

    loading.parentNode.removeChild(loading);

    this.contentsBase();
    this.contentsSearchEvent();

  } catch (e) {
    console.log(e);
  }
}
