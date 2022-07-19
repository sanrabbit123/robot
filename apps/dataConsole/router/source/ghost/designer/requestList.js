/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈스타일링 의뢰서 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈스타일링 의뢰서 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "requestList",
  "hangul": "스타일링 요청",
  "route": [
    "requestList"
  ]
} %/%/g

const RequestListJs = function () {
  this.mother = new GeneralJs();
}

RequestListJs.binaryPath = "/middle/console";

RequestListJs.prototype.insertInformationBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, projectHistory, requestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft;
  let tong;
  let whiteBottomMargin;
  let grayTong;
  let grayMargin;
  let tongMargin;
  let grayPadding;
  let tongHeight;
  let whiteSize;
  let whiteWeight, whiteColumnWeight;
  let whiteBaseTong;
  let whiteTextTop;
  let contentsMap;
  let widthMap;
  let circleWidth, circleTop;
  let state;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 0 %%>;

  titleFontSize = <%% 22, 22, 22, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), 0 %%>;

  mobileTitleLeft = 6;

  grayMargin = <%% 24, 24, 24, 24, 24 %%>;
  grayPadding = <%% 20, 20, 20, 20, 20 %%>;

  tongMargin = <%% 6, 6, 6, 6, 1 %%>;

  tongHeight = <%% 50, 50, 50, 50, 50 %%>;

  whiteSize = <%% 15, 15, 15, 15, 15 %%>;
  whiteWeight = <%% 400, 400, 400, 400, 400 %%>;
  whiteColumnWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;

  circleWidth = <%% 8, 8, 8, 8, 8 %%>;
  circleTop = <%% 21, 21, 21, 21, 21 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contentsMap = (project, index) => {
    const map = [
      project.name + " <b%고객님%b>",
      serviceParsing(project.service).replace(/[a-zA-Z]/gi, ''),
      "<b%현장 미팅 : %b>" + dateToString(project.process.contract.meeting.date, false).slice(2),
      "<b%미팅 시간 : %b>" + dateToString(project.process.contract.meeting.date, true).slice(11, -3),
      "<b%시작일 : %b>" + dateToString(project.process.contract.form.date.from, false).slice(2),
      "<b%종료일 : %b>" + dateToString(project.process.contract.form.date.to, false).slice(2),
    ];
    return map[index];
  }

  widthMap = [ 120, 174, 165, 140, 150, 150 ];

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "프로젝트 리스트",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            },
            bold: {
              background: colorChip.white,
              color: colorChip.black,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(300),
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  grayTong = createNode({
    mother: tong,
    style: {
      display: "block",
      background: colorChip.gray3,
      borderRadius: String(5) + "px",
      paddingTop: String(grayMargin) + ea,
      paddingBottom: String(grayMargin) + ea,
    }
  });

  for (let i = 0; i < projects.length; i++) {

    state = 0;
    if (projects[i].process.contract.meeting.date.valueOf() >= (new Date()).valueOf()) {
      state = 0;
    } else if (projects[i].process.contract.form.date.to.valueOf() >= (new Date()).valueOf()) {
      state = 1;
    } else if (!/드[랍롭]/gi.test(projects[i].process.status) && !/홀[드딩]/gi.test(projects[i].process.status)) {
      state = 2;
    } else {
      state = 3;
    }

    whiteBaseTong = createNode({
      mother: grayTong,
      style: {
        display: "inline-flex",
        position: "relative",
        marginLeft: String(grayMargin) + ea,
        width: withOut((grayMargin * 2) + (grayPadding * 2), ea),
        paddingLeft: String(grayPadding) + ea,
        paddingRight: String(grayPadding) + ea,
        height: String(tongHeight) + ea,
        borderRadius: String(5) + "px",
        background: state >= 2 ? (state === 3 ? colorChip.gray4 : colorChip.gray1) : colorChip.white,
        marginBottom: String(tongMargin) + ea,
        alignItems: "center",
        flexDirection: "row",
        cursor: "pointer",
      },
    });
    for (let j = 0; j < widthMap.length; j++) {
      createNode({
        mother: whiteBaseTong,
        text: contentsMap(projects[i], j),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whiteSize) + ea,
          fontWeight: String(j === 0 ? 700 : whiteWeight),
          top: String(whiteTextTop) + ea,
          color: state >= 2 ? colorChip.deactive : (state === 0 ? (j === 0 ? colorChip.green : colorChip.black) : colorChip.black),
          width: String(widthMap[j]) + ea,
        },
        bold: {
          fontWeight: String(whiteColumnWeight),
          color: j === 0 ? (state >= 2 ? colorChip.deactive : colorChip.black) : colorChip.deactive,
        }
      });
    }

    createNode({
      mother: whiteBaseTong,
      style: {
        position: "absolute",
        right: String(grayPadding) + ea,
        top: String(circleTop) + ea,
        width: String(circleWidth) + ea,
        height: String(circleWidth) + ea,
        borderRadius: String(circleWidth) + ea,
        background: state === 0 ? colorChip.green : colorChip.deactive,
      }
    });

  }

}

RequestListJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let designers, designer;
    let requestNumber;
    let service;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    projects = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getProjects", { equal: true });
    this.projects = projects;

    if (projects.length > 0) {
      clients = await ajaxJson({ whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, SECONDHOST + "/getClients", { equal: true });
      this.clients = clients;
    } else {
      this.clients = [];
    }

    projects.sort((a, b) => {
      return b.process.contract.meeting.date.valueOf() - a.process.contract.meeting.date.valueOf();
    });

    for (let project of projects) {
      project.name = clients.find((obj) => { return obj.cliid === project.cliid }).name;
    }

    await this.mother.ghostDesignerLaunching({
      name: "requestList",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: RequestListJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          instance.insertInformationBox(1);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "RequestListJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "RequestListJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
