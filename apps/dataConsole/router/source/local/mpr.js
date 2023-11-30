const MprJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {};
  this.module.paddingTop = 38;
  this.module.height = <%% 18, 16, 16, 16, 18 %%>;
  this.module.marginBottom = 18;
  this.module.initialLine = 14;
  this.module.initialMargin = 14;
  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.standardDoms = [];
  this.caseDoms = [];
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.whiteConvert = 0;
  this.whiteMatrixA = null;
  this.whiteMatrixB = null;
  this.whiteSse = null;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

MprJs.prototype.mainDataRender = async function (matrixMode = false) {
  const instance = this;
  const { ea, totalContents, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute, serviceParsing } = GeneralJs;
  try {
    let columns;
    let values;
    let standards;
    let sourceArr;
    let motherArr, mediumArr, campaignArr, deviceArr;
    let sessionsArr;

    sourceArr = instance.clients.map((c) => { return c.source });
    sessionsArr = instance.clients.map((c) => { return c.sessions });
    motherArr = Array.from(new Set(sourceArr.map((o) => { return o.mother }).flat()));
    mediumArr = Array.from(new Set(sourceArr.map((o) => { return o.medium }).flat()));
    campaignArr = Array.from(new Set(sourceArr.map((o) => { return o.campaign }).flat()));
    deviceArr = Array.from(new Set(sessionsArr.map((o) => { return o.device.map((o2) => { return o2.kinds }) }).flat()));

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "cliid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "name",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "응대 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "응대중",
            color: colorChip.black,
          },
          {
            value: "장기",
            color: colorChip.black,
          },
          {
            value: "드랍",
            color: colorChip.black,
          },
          {
            value: "진행",
            color: colorChip.green,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "응대중",
          "장기",
          "드랍",
          "진행",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "문의일",
        width: 100,
        name: "timeline",
        type: "date",
      },
      {
        title: "문의 시간",
        width: 100,
        name: "timelineDetail",
        type: "string",
      },
      {
        title: "소스",
        width: 240,
        name: "source",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "includesEvent_$all",
          }
        ].concat(motherArr.map((str) => {
          return {
            value: str,
            functionName: "includesEvent_" + str,
          }
        })),
      },
      {
        title: "미디움",
        width: 240,
        name: "medium",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "includesEvent_$all",
          }
        ].concat(mediumArr.map((str) => {
          return {
            value: str,
            functionName: "includesEvent_" + str,
          }
        })),
      },
      {
        title: "캠페인",
        width: 240,
        name: "campaign",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "includesEvent_$all",
          }
        ].concat(campaignArr.map((str) => {
          return {
            value: str,
            functionName: "includesEvent_" + str,
          }
        })),
      },
      (!matrixMode ? null : {
        title: "레퍼럴",
        width: 150,
        name: "referrer",
        type: "string",
      }),
      (!matrixMode ? null : {
        title: "검색어",
        width: 150,
        name: "search",
        type: "string",
      }),
      {
        title: "디바이스",
        width: 150,
        name: "device",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "includesEvent_$all",
          }
        ].concat(deviceArr.map((str) => {
          return {
            value: str,
            functionName: "includesEvent_" + str,
          }
        })),
      },
      {
        title: "평수",
        width: 100,
        name: "pyeong",
        type: "string",
      },
      {
        title: "거주중 여부",
        width: 100,
        name: "living",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "거주중",
          "이사",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "계약 형태",
        width: 100,
        name: "contract",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "전월세",
          "자가",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "입주 예정일",
        width: 120,
        name: "expected",
        type: "date",
      },
      {
        title: "주소",
        width: 600,
        name: "address",
        type: "string",
      },
      {
        title: "서비스",
        width: 120,
        name: "service",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat(serviceParsing().name.map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
      },
      {
        title: "예산",
        width: 120,
        name: "budget",
        type: "string",
      },
      {
        title: "가구 구매",
        width: 120,
        name: "furniture",
        type: "string",
      },
    ];
    columns = columns.filter((o) => { return o !== null });

    values = {};

    for (let { client, requestNumber, project, sessions, source } of instance.clients) {

      standards.values[client.cliid + "_" + String(requestNumber)] = [
        {
          value: client.cliid,
          name: "cliid",
        },
        {
          value: client.name,
          name: "name",
        },
      ];

      values[client.cliid + "_" + String(requestNumber)] = [
        {
          value: client.requests[0].analytics.response.status,
          name: "status",
        },
        {
          value: dateToString(client.requests[0].request.timeline),
          name: "timeline",
        },
        {
          value: dateToString(client.requests[0].request.timeline, true).split(" ")[1],
          name: "timelineDetail",
        },
        {
          value: source.mother.length === 0 ? '-' : source.mother.join(", "),
          name: "source",
        },
        {
          value: source.medium.length === 0 ? '-' : source.medium.join(", "),
          name: "medium",
        },
        {
          value: source.campaign.length === 0 ? '-' : source.campaign.join(", "),
          name: "campaign",
        },
        (!matrixMode ? null : {
          value: source.referrer.length === 0 ? '-' : source.referrer.join(", "),
          name: "referrer",
        }),
        (!matrixMode ? null : {
          value: source.search.length === 0 ? '-' : source.search.join(", "),
          name: "search",
        }),
        {
          value: matrixMode ? (sessions.device.length === 0 ? '-' : Array.from(new Set(sessions.device.map((o) => { return o.kinds + " (" + o.os + " - " + o.browser + ")" }))).join(", ")) : (sessions.device.length === 0 ? '-' : Array.from(new Set(sessions.device.map((o) => { return o.kinds }))).join(", ")),
          name: "device",
        },
        {
          value: client.requests[0].request.space.pyeong,
          name: "pyeong",
        },
        {
          value: client.requests[0].request.space.resident.living ? "거주중" : "이사",
          name: "living",
        },
        {
          value: client.requests[0].request.space.contract,
          name: "contract",
        },
        {
          value: dateToString(client.requests[0].request.space.resident.expected),
          name: "expected",
        },
        {
          value: client.requests[0].request.space.address,
          name: "address",
        },
        {
          value: serviceParsing(project !== null ? project.service : client.requests[0].analytics.response.service).split(" ").slice(1, -1).join(" "),
          name: "service",
        },
        {
          value: client.requests[0].request.budget,
          name: "budget",
        },
        {
          value: client.requests[0].request.furniture,
          name: "furniture",
        },
      ];
      values[client.cliid + "_" + String(requestNumber)] = values[client.cliid + "_" + String(requestNumber)].filter((o) => { return o !== null });

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.clientWhiteData = async function (cliid, requestNumber) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, valueTargetClassName } = this;
  const { createNode, withOut, colorChip, dateToString, ajaxJson, findByAttribute, stringToDate, selfHref, serviceParsing, equalJson, autoComma } = GeneralJs;
  try {
    const { client, project: projectRaw } = instance.clients.find((c) => { return c.cliid === cliid && c.requestNumber === requestNumber });
    const { request, analytics } = client.requests[0];
    const clientAnalytics = (await ajaxJson({ mode: "pick", cliid }, CONTENTSHOST + "/clientAnalytics", { equal: true })).data;
    const clientHistory = await ajaxJson({ id: cliid, rawMode: true }, BACKHOST + "/getClientHistory", { equal: true });
    const { contents, history, sessions, source } = clientAnalytics;
    let dataMatrix;
    let designer;
    let proid, desid, project;
    let naverComplex;
    let contentsView;
    let dataSet;
    let progressBoo;
    let proposalBoo;
    let proposalDetail;
    let index;
    let thisDesigner;
    let tempObj;
    let tempString;
    let index2;
    let proposalHistory;
    let proposalSend;
    let number;

    if (projectRaw !== null) {
      proid = projectRaw.proid;
      desid = projectRaw.desid;
      [ project ] = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
      if (desid !== "") {
        if (instance.designers !== null) {
          designer = instance.designers.find((d) => { return d.desid === desid });
        } else {
          [ designer ] = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
        }
        if (designer === undefined) {
          designer = null;
        }
      } else {
        designer = null;
      }
    } else {
      proid = "";
      desid = "";
      designer = null;
      project = null;
    }

    proposalBoo = false;
    progressBoo = false;
    if (project !== null) {
      if (Array.isArray(project.proposal.detail)) {
        proposalBoo = true;
        proposalDetail = equalJson(JSON.stringify(project.proposal.detail));
        proposalHistory = clientHistory.curation.analytics.send.filter((o) => { return o.page === "designerProposal" });
        proposalHistory.sort((a, b) => {
          return a.date.valueOf() - b.date.valueOf();
        });
        if (proposalHistory.length > 0) {
          proposalSend = new Date(JSON.stringify(proposalHistory[0].date).slice(1, -1));
        } else {
          proposalSend = new Date(JSON.stringify(project.proposal.date).slice(1, -1));
        }
      }
      if (!/드랍/gi.test(project.process.status) && project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
        if (designer !== null) {
          progressBoo = true;
        }
      }
    }
    
    contentsView = contents.view.portfolio.concat(contents.view.review);

    dataMatrix = [
      {
        name: "name",
        type: "string",
        title: "성함",
        value: client.name,
      },
      {
        name: "phone",
        type: "string",
        title: "연락처",
        value: client.phone,
      },
      {
        name: "email",
        type: "string",
        title: "이메일",
        value: client.email,
      },
      {
        name: "timeline",
        type: "date",
        title: "문의일",
        value: dateToString(client.requests[0].request.timeline, true),
      },
      {
        name: "status",
        type: "select",
        title: "응대 상태",
        columns: [
          "응대중",
          "장기",
          "드랍",
          "진행",
        ],
        value: [
          "응대중",
          "장기",
          "드랍",
          "진행",
        ].map((str) => { return str === analytics.response.status ? 1 : 0 })
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "source",
        type: "string",
        title: "소스",
        value: source.mother.length === 0 ? '-' : source.mother.join(", "),
      },
      {
        name: "medium",
        type: "string",
        title: "미디움",
        value: source.medium.length === 0 ? '-' : source.medium.join(", "),
      },
      {
        name: "campaign",
        type: "string",
        title: "캠페인",
        value: source.campaign.length === 0 ? '-' : source.campaign.join(", "),
      },
      {
        name: "referrer",
        type: "array",
        title: "리퍼럴",
        value: source.referrer.length === 0 ? [ '-' ] : source.referrer,
      },
      {
        name: "search",
        type: "string",
        title: "검색어",
        value: source.search.length === 0 ? '-' : source.search.join(", "),
      },
      {
        name: "device",
        type: "array",
        title: "디바이스",
        value: sessions.device.length === 0 ? [ '-' ] : sessions.device.map((o) => { return o.kinds + " (" + o.os + ") - " + o.browser }),
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "address",
        type: "array",
        title: "주소",
        value: [ request.space.address ],
      },
      {
        name: "pyeong",
        type: "string",
        title: "평수",
        value: String(request.space.pyeong),
      },
      {
        name: "contract",
        type: "string",
        title: "계약 형태",
        value: request.space.contract,
      },
      {
        name: "living",
        type: "select",
        title: "거주중 여부",
        columns: [
          "이사",
          "거주중",
        ],
        value: [
          (request.space.resident.living ? 0 : 1),
          (request.space.resident.living ? 1 : 0),
        ]
      },
      {
        name: "expected",
        type: "date",
        title: "입주 예정일",
        value: dateToString(request.space.resident.expected),
      },
      {
        name: "budget",
        type: "string",
        title: "예산",
        value: request.budget,
      },
      {
        name: "furniture",
        type: "string",
        title: "가구 구매",
        value: request.furniture,
      },
      {
        name: "construct",
        type: "array",
        title: "선택한 시공",
        value: [
          clientHistory.curation.construct.items.length > 0 ? clientHistory.curation.construct.items.map((str) => { return str.replace(/ 공사/gi, "").trim() }).join(", ") : "-"
        ],
      },
      {
        nane: "service",
        type: "select",
        title: "서비스",
        columns: serviceParsing().name,
        value: serviceParsing().name.map((str) => { return str === serviceParsing(project !== null ? project.service : analytics.response.service).split(" ").slice(1, -1).join(" ") ? 1 : 0 })
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
    ];

    if (request.space.naver.trim() !== "") {
      naverComplex = await ajaxJson({ id: request.space.naver.trim() }, S3HOST + ":3000/naverComplex", { equal: true });
      dataMatrix = dataMatrix.concat([
        {
          name: "apartment",
          type: "string",
          title: "아파트명",
          value: naverComplex.name,
        },
        {
          name: "apartmentBirth",
          type: "string",
          title: "준공일",
          value: naverComplex.information.date.valueOf() > (new Date()).valueOf() ? dateToString(naverComplex.information.date) + " " + "(준공 예정)" : dateToString(naverComplex.information.date) + " " + "(" + String(Math.floor(((((((new Date()).valueOf() - naverComplex.information.date.valueOf()) / 1000) / 60) / 60) / 24) / 365)) + "년차)",
        },
        {
          name: "apartmentSizeHousehold",
          type: "string",
          title: "세대수",
          value: String(naverComplex.information.count.household)
        },
        {
          name: "apartmentSizeDong",
          type: "string",
          title: "동",
          value: String(naverComplex.information.count.dong)
        },
        {
          name: "apartmentSizeParking",
          type: "string",
          title: "주차수",
          value: String(naverComplex.information.count.parking)
        },
        {
          name: "margin",
          type: "margin",
          title: "",
          value: "",
        },
      ]);
    } else {
      naverComplex = null;
    }

    // proposal
    if (proposalBoo) {
      if (instance.designers === null) {
        instance.designers = await ajaxJson({ whereQuery: {} }, SECONDHOST + "/getDesigners", { equal: true });
      }
      dataMatrix = dataMatrix.concat([
        {
          name: "proposalDate",
          type: "date",
          title: "추천일",
          value: dateToString(proposalSend, true),
        },
        {
          name: "proposalLength",
          type: "string",
          title: "추천 디자이너 수",
          value: String(proposalDetail.length),
        },
      ]);
      tempObj = {
        name: "proposalDesigner",
        type: "array",
        title: "추천 내역",
        value: []
      };
      index = 0;
      for (let { desid, fee } of proposalDetail) {
        thisDesigner = instance.designers.find((d) => { return d.desid === desid });
        tempString = "";
        tempString += thisDesigner.designer + " (" + thisDesigner.desid + ")";
        tempString += "&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;";
        index2 = 0;
        for (let { amount, method } of fee) {
          if (index2 !== 0) {
            tempString += "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;";
          }
          if (/offline/gi.test(method)) {
            tempString += "오프라인";
          } else {
            tempString += "온라인";
          }
          tempString += " ";
          tempString += autoComma(amount) + "원";
          index2++;
        }
        tempObj.value.push(tempString);
        index++;
      }
      dataMatrix.push(tempObj);
      dataMatrix = dataMatrix.concat([
        {
          name: "margin",
          type: "margin",
          title: "",
          value: "",
        },
      ]);
    }

    // project
    if (progressBoo) {
      dataMatrix = dataMatrix.concat([
        {
          name: "timeline2",
          type: "date",
          title: "문의일",
          value: dateToString(client.requests[0].request.timeline, true),
        },
        {
          name: "contractDate",
          type: "date",
          title: "계약일",
          value: dateToString(project.process.contract.first.date, true),
        },
        {
          name: "selectedDesigner",
          type: "string",
          title: "선택된 디자이너",
          value: designer.designer + " (" + designer.desid + ")",
        },
        {
          name: "selectedService",
          type: "string",
          title: "진행 서비스",
          value: serviceParsing(project.service),
        },
        {
          name: "designFee",
          type: "string",
          title: "디자인 비용",
          value: autoComma(project.process.contract.remain.calculation.amount.supply) + "원",
        },
        {
          name: "margin",
          type: "margin",
          title: "",
          value: "",
        },
      ]);
    }

    // contents
    dataMatrix = dataMatrix.concat([
      {
        name: "viewContents",
        type: "array",
        title: "본 컨텐츠",
        value: contentsView.length === 0 ? [ '-' ] : contentsView.map(({ link, title }) => { return `${title} (${link})` }),
      },
      {
        name: "viewDesigners",
        type: "array",
        title: "본 디자이너",
        value: contents.view.designer.length === 0 ? [ '-' ] : contents.view.designer.map(({ link, title }) => { return `${title} (${link})` }),
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
    ]);

    dataSet = {
      cliid,
      requestNumber,
      client,
      request,
      analytics,
      clientAnalytics,
      clientHistory,
      proid,
      desid,
      designer,
      project,
      naverComplex
    };

    this.clientDetailMatrix = [
      [
        "속성",
        "값",
        "",
        "히스토리 시간",
        "히스토리 액션",
        "페이지 아이디",
        "페이지 이름",
      ]
    ];
    for (let obj of dataMatrix) {
      if (obj.type === "string") {
        this.clientDetailMatrix.push([
          obj.title,
          obj.value.replace(/\&nbsp;/gi, " "),
          "",
          "",
          "",
          "",
          "",
        ]);
      } else if (obj.type === "date") {
        this.clientDetailMatrix.push([
          obj.title,
          obj.value.replace(/\&nbsp;/gi, " "),
          "",
          "",
          "",
          "",
          "",
        ]);
      } else if (obj.type === "select") {
        this.clientDetailMatrix.push([
          obj.title,
          (obj.columns.find((str, index) => { return obj.value[index] === 1 }) !== undefined ? obj.columns.find((str, index) => { return obj.value[index] === 1 }) : obj.columns[0]),
          "",
          "",
          "",
          "",
          "",
        ]);
      } else if (obj.type === "array") {
        number = 0;
        for (let value of obj.value) {
          this.clientDetailMatrix.push([
            obj.title,
            value.replace(/\&nbsp;/gi, " "),
            "",
            "",
            "",
            "",
            "",
          ]);
          number++;
        }
      }
    }

    return { dataMatrix, dataSet };
  } catch (e) {
    console.log(e);
    return [];
  }
}

MprJs.prototype.clientWhiteContents = async function (tong, cliid, requestNumber) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, stringToLink, variableArray, downloadFile, uniqueValue, sleep, equalJson, hexaJson } = GeneralJs;
  try {
    const client = instance.clients.find((c) => { return c.cliid === cliid && c.requestNumber === requestNumber });
    const { dataMatrix: dataArr, dataSet } = await instance.clientWhiteData(cliid, requestNumber);
    const bigPhotoClassName = "bigPhotoClassName";
    const longTextEditClassName = "longTextEditClassName";
    const menuValuePromptClassName = "menuValuePromptClassName";
    const valueTargetClassName = "valueTargetClassName";
    const longEmptyText = "메모를 클릭하여 입력해주세요.";
    const maxColumnsNumber = 5;
    let name;
    let type;
    let title;
    let value;
    let motherBlock;
    let blockHeight;
    let titleWidth;
    let titleArea;
    let titleSize, titleWeight;
    let num;
    let marginPercentage;
    let careerBlockGrayOuterMargin;
    let careerBlockOuterMargin;
    let careerBlockOuterMarginTop;
    let careerBlockOuterMarginBottom;
    let careerBlockInnerMargin;
    let careerBlockInnerMarginSmall;
    let careerBlockSize;
    let blockBottom;
    let portfolioImages;
    let imageTargets;
    let imageTong;
    let imageTongPadding;
    let imagesNumber;
    let imageInnerBetween;
    let imageTongChildren;
    let targetNumber;
    let imageNode;
    let targetNumberArr;
    let downloadButton;
    let buttonWidth, buttonHeight, buttonTextTop, buttonSize, buttonWeight;
    let idList;
    let thisId;
    let bigPhotoEvent;
    let heightRatio;
    let thisWidth;
    let arrowHeight;
    let arrowMargin;
    let motherNum;
    let longMarginBottom;
    let longLineHeight;
    let emptyValueBoo;
    let dateDom;
    let menuVisual;
    let menuBetween;
    let menuTextTop;
    let menuSize;
    let menuWeight;
    let calendarWidth;
    let calendarBoxBetween;
    let calendarBoxHeight;
    let stringDom;
    let longTextWidth;
    let longTextHeight;
    let textMaxWidth;
    let arrayBetween;

    blockHeight = 32;
    titleWidth = 180;

    titleSize = 15;
    titleWeight = 700;

    marginPercentage = 33;
    imageTongPadding = 16;

    buttonWidth = 150;
    buttonHeight = 30;
    buttonTextTop = isMac() ? -1 : 1;
    buttonSize = 13;
    buttonWeight = 700;

    longTextWidth = 240;
    longTextHeight = 36;

    careerBlockGrayOuterMargin = <%% 10, 10, 9, 8, 0 %%>;
    careerBlockOuterMargin = <%% 14, 14, 14, 12, 2.5 %%>;
    careerBlockOuterMarginTop = <%% (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), 2 %%>;
    careerBlockOuterMarginBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), 2 %%>;
    careerBlockInnerMargin = <%% 6, 6, 6, 4, 1 %%>;
    careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 0 %%>;
    careerBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;

    blockBottom = 20;

    imagesNumber = 3;
    imageInnerBetween = 8;

    heightRatio = 0.9;

    arrowHeight = 12;
    arrowMargin = 20;
  
    longMarginBottom = 10;
    longLineHeight = 1.6;

    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    calendarWidth = 260;
    calendarBoxBetween = 4;
    calendarBoxHeight = 32;

    textMaxWidth = 9000;
    arrayBetween = 24;

    idList = {};

    bigPhotoEvent = function (e) {
      const self = this;
      const gs = this.getAttribute("gs");
      const zIndex = 4;
      let domList;
      let thisIndex;
      let thisHeight;
      let renderPhoto;


      if (gs !== "null") {
        domList = idList.map((id) => { return document.getElementById(id) });
        thisIndex = domList.findIndex((dom) => { return dom === self });

        renderPhoto = (index) => {
          return function (e) {
            removeByClass(bigPhotoClassName);
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              event: {
                click: (e) => { removeByClass(bigPhotoClassName) }
              },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(0) + ea,
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: "transparent",
                zIndex: String(zIndex),
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              event: {
                click: (e) => { removeByClass(bigPhotoClassName) }
              },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(grayBarWidth) + ea,
                width: withOut(grayBarWidth, ea),
                height: withOut(belowHeight, ea),
                background: colorChip.realBlack,
                opacity: String(0.6),
                zIndex: String(zIndex),
              }
            });
            thisHeight = (window.innerHeight - belowHeight) * heightRatio;
            thisWidth = thisHeight / (Number(domList[index].getAttribute("ratio")));
            createNode({
              mode: "img",
              mother: totalContents,
              class: [ bigPhotoClassName ],
              attribute: {
                src: domList[index].getAttribute("src"),
              },
              style: {
                position: "fixed",
                height: String(thisHeight) + "px",
                zIndex: String(zIndex),
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(thisHeight / 2) + "px" + ")",
                left: "calc(calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 2) - " + String(thisWidth / 2) + "px" + ") + " + String(grayBarWidth) + ea + ")",
                borderRadius: String(5) + "px",
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              mode: "svg",
              source: instance.mother.returnArrow("left", colorChip.white),
              event: {
                selectstart: (e) => { e.preventDefault(); },
                click: renderPhoto(domList[index - 1] === undefined ? domList.length - 1 : index - 1),
              },
              style: {
                display: "block",
                position: "fixed",
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(arrowHeight / 2) + "px" + ")",
                left: String(grayBarWidth + arrowMargin) + ea,
                width: String(arrowHeight) + ea,
                zIndex: String(zIndex),
                cursor: "pointer",
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              mode: "svg",
              source: instance.mother.returnArrow("right", colorChip.white),
              event: {
                selectstart: (e) => { e.preventDefault(); },
                click: renderPhoto(domList[index + 1] === undefined ? 0 : index + 1),
              },
              style: {
                display: "block",
                position: "fixed",
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(arrowHeight / 2) + "px" + ")",
                right: String(arrowMargin) + ea,
                width: String(arrowHeight) + ea,
                zIndex: String(zIndex),
                cursor: "pointer",
              }
            });
          }
        }
        
        renderPhoto(thisIndex)({});

      } else {
        window.alert("잠시만 기다렸다가 다시 시도해주세요!");
      }
    }

    motherNum = 0;
    for (let obj of dataArr) {
      name = obj.name;
      type = obj.type;
      title = obj.title;
      value = obj.value;

      motherBlock = createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          "min-height": String(blockHeight) + ea,
        }
      });

      titleArea = createNode({
        mother: motherBlock,
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          width: String(titleWidth) + ea,
          height: String(blockHeight) + ea,
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
        },
        child: {
          text: title,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
          }
        }
      })

      if (type === "string") {

        stringDom = createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            class: [ valueTargetClassName ],
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              cursor: (typeof obj.script === "function") ? "pointer" : "",
            }
          }
        });

        if (typeof obj.script === "function") {
          stringDom.addEventListener("click", obj.script(cliid, requestNumber));
        }

      } else if (type === "date") {

        dateDom = createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            class: [ valueTargetClassName ],
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              cursor: obj.editable ? "pointer" : "",
            }
          }
        });

      } else if (type === "select") {
        
        num = 0;
        for (let str of obj.columns) {
          createNode({
            mother: motherBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: "calc(" + withOut(titleWidth, ea) + " / " + String(maxColumnsNumber) + ")",
            },
            child: {
              text: str,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(value[num] === 1 ? 400 : 200),
                color: value[num] === 1 ? colorChip.green : colorChip.deactive,
              }
            }
          });
          num++;
        }

      } else if (type === "block") {
        
        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            padding: String(careerBlockGrayOuterMargin) + ea,
            width: withOut(titleWidth + (careerBlockGrayOuterMargin * 2), ea),
            borderRadius: String(5) + "px",
            background: colorChip.gray0,
            marginBottom: String(blockBottom) + ea,
          },
          children: value.map((obj, index) => {
            const { title, value: factorValue } = obj;
            const lastBoo = (index === value.length - 1);
            return {
              attribute: {
                index: String(index),
              },
              style: {
                display: "block",
                position: "relative",
                padding: String(careerBlockOuterMargin) + ea,
                paddingTop: String(careerBlockOuterMarginTop) + ea,
                paddingBottom: String(careerBlockOuterMarginBottom) + ea,
                width: withOut(careerBlockOuterMargin * 2, ea),
                borderRadius: String(5) + "px",
                marginBottom: !lastBoo ? String(careerBlockInnerMargin) + ea : "",
                background: colorChip.white,
                boxShadow: "0px 2px 11px -9px " + colorChip.shadow,
              },
              children: factorValue.map((str, index) => {
                const lastBoo = (index === factorValue.length - 1);
                return {
                  text: "<b%" + title[index] + " %b>:" + "&nbsp;&nbsp;&nbsp;" + str,
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(400),
                    color: colorChip.black,
                    marginBottom: !lastBoo ? String(careerBlockInnerMarginSmall) + ea : "",
                  },
                  bold: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.black,
                  },
                  under: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(200),
                    color: colorChip.green,
                  }
                }
              })
            }
          })
        });

      } else if (type === "margin") {

        createNode({
          mother: motherBlock,
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(0),
            height: String(marginPercentage) + '%',
            width: withOut(0, ea),
            borderBottom: "1px dashed " + colorChip.gray3,
          }
        })

      } else if (type === "array") {

        if (value.length > 0) {

          if (value.length > 1) {
            titleArea.style.height = String(arrayBetween) + ea;
          }

          for (let i = 0; i < value.length; i++) {
            if (i === 0) {
              createNode({
                mother: motherBlock,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: withOut(titleWidth, ea),
                  overflow: "scroll",
                },
                child: {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(textMaxWidth) + ea,
                  },
                  child: {
                    text: value[i],
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(400),
                      color: colorChip.black,
                    }
                  }
                }
              });
            } else if (i !== value.length - 1) {
              createNode({
                mother: motherBlock,
                style: {
                  display: "inline-flex",
                  verticalAlign: "top",
                  position: "relative",
                  width: String(titleWidth) + ea,
                  height: String(arrayBetween) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "row",
                },
                child: {
                  text: "",
                  style: {
                    display: "inline-block",
                    verticalAlign: "top",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                  }
                }
              })
              createNode({
                mother: motherBlock,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: withOut(titleWidth, ea),
                  overflow: "scroll",
                },
                child: {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(textMaxWidth) + ea,
                  },
                  child: {
                    text: value[i],
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(400),
                      color: colorChip.black,
                    }
                  }
                }
              });
            } else {
              createNode({
                mother: motherBlock,
                style: {
                  display: "inline-flex",
                  verticalAlign: "top",
                  position: "relative",
                  width: String(titleWidth) + ea,
                  height: String(blockHeight) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "row",
                },
                child: {
                  text: "",
                  style: {
                    display: "inline-block",
                    verticalAlign: "top",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                  }
                }
              })
              createNode({
                mother: motherBlock,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: withOut(titleWidth, ea),
                  overflow: "scroll",
                },
                child: {
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(textMaxWidth) + ea,
                  },
                  child: {
                    text: value[i],
                    style: {
                      display: "inline-block",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(400),
                      color: colorChip.black,
                    }
                  }
                }
              });
            }
          }

        }

      } else if (type === "long") {

        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              marginBottom: String(longMarginBottom) + ea,
              lineHeight: String(longLineHeight),
            }
          }
        });

      }

      motherNum++;
    }
    
    return dataSet;

  } catch (e) {
    console.log(e);
    return null;
  }
}

MprJs.prototype.adsWhiteContents = async function (tong, data, startDate, endDate) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, stringToLink, variableArray, downloadFile, uniqueValue, sleep, equalJson, hexaJson, autoComma } = GeneralJs;
  try {
    const keyTargets = [
      "meta",
      "naver",
      "google",
      "kakao",
    ];
    const keyword = "t";
    const blank = "&nbsp;&nbsp;";
    const slash = "&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;";
    let targetData;
    let startDateCopied;
    let endDateCopied;
    let start, end;
    let timeMatrix;
    let thisKey;
    let dateDelta;
    let thisDate;
    let thisKeyNumbers;
    let advertisement;
    let targetTong;
    let thisKeyNumbersArr;
    let baseBlock;
    let campaignTong;
    let campaignBaseBlock;
    let num, num2, num3, num0, num4, num5;
    let adSetTong;
    let adSetBaseBlock;
    let adTong, adBaseBlock;
    let blockWidth;
    let timeWidth;
    let typeWidth;
    let textTop;
    let timeSize, timeWeight;
    let blockHeight;
    let textSize, kindsWeight, textWeight;
    let valueWeight;
    let performanceTong;
    let naverTargets;
    let newDataArray;
    let naverCampaignTong;
    let summaryTong;
    let newDataArrayCopied;
    let totalCampaignTong;
    let linePadding;
    let metaTargets;
    let metaCampaignTong;
    let realCampaignTong;
    let kakaoCampaignTong;
    let thisCharge;
    let thisImpressions;
    let thisClicks;
    let maxWidth;
    let leftPadding;
    let googleTargets;
    let googleCampaignTong;
    let kakaoTargets;

    timeWidth = 150;
    typeWidth = 80;
    blockWidth = window.innerWidth / 15;

    blockHeight = 44;

    textTop = isMac() ? -1 : 1;
    timeSize = 15;
    timeWeight = 700;

    textSize = 14;
    kindsWeight = 700;
    textWeight = 400;
    valueWeight = 600;

    linePadding = 18;

    leftPadding = 4;
    maxWidth = 1000;

    startDateCopied = new Date(JSON.stringify(startDate).slice(1, -1));
    start = new Date(startDateCopied.getFullYear(), startDateCopied.getMonth(), startDateCopied.getDate(), 0, 0, 0);

    endDateCopied = new Date(JSON.stringify(endDate).slice(1, -1));
    end = new Date(endDateCopied.getFullYear(), endDateCopied.getMonth(), endDateCopied.getDate(), 0, 0, 0);
    end.setDate(end.getDate() + 1);

    timeMatrix = [];
    dateDelta = Math.floor(((((end.valueOf() - start.valueOf()) / 1000) / 60) / 60) / 24);
    for (let i = 0; i < dateDelta; i++) {
      thisDate = new Date(JSON.stringify(start).slice(1, -1));
      thisDate.setDate(thisDate.getDate() + i);
      thisKeyNumbers = dateToString(thisDate).replace(/[^0-9]/gi, '');
      thisKey = keyword + thisKeyNumbers;
      timeMatrix.push({
        key: thisKey,
        keyNumber: thisKeyNumbers,
        date: new Date(JSON.stringify(thisDate).slice(1, -1)),
        data: [],
      });
    }

    for (let key of keyTargets) {
      targetData = equalJson(JSON.stringify(data[key]));
      for (let obj of targetData) {
        advertisement = obj.advertisement;
        thisKeyNumbersArr = obj.key.split("_");
        targetTong = timeMatrix.find((o) => {
          return o.keyNumber === thisKeyNumbersArr[0];
        });
        for (let campaign of advertisement.campaign) {
          campaign.key = obj.key;
          campaign.kinds = key;
          targetTong.data.push(campaign);
        }
      }
    }

    for (let obj of timeMatrix) {
      naverTargets = obj.data.filter((o) => { return o.kinds === "naver" });
      metaTargets = obj.data.filter((o) => { return o.kinds === "meta" });
      googleTargets = obj.data.filter((o) => { return o.kinds === "google" });
      kakaoTargets = obj.data.filter((o) => { return o.kinds === "kakao" });
      newDataArray = obj.data.filter((o) => { return o.kinds !== "naver" && o.kinds !== "meta" && o.kinds !== "google" && o.kinds !== "kakao" });

      thisCharge = metaTargets.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
      thisImpressions = metaTargets.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
      thisClicks = metaTargets.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
      if (!(thisCharge === 0 && thisImpressions === 0 && thisClicks === 0)) {
        newDataArray.push({
          kinds: "meta",
          value: {
            charge: thisCharge,
            performance: {
              impressions: thisImpressions,
              clicks: thisClicks,
            }
          },
          children: equalJson(JSON.stringify(metaTargets)),
        });
      }

      thisCharge = naverTargets.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
      thisImpressions = naverTargets.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
      thisClicks = naverTargets.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
      if (!(thisCharge === 0 && thisImpressions === 0 && thisClicks === 0)) {
        newDataArray.push({
          kinds: "naver",
          value: {
            charge: thisCharge,
            performance: {
              impressions: thisImpressions,
              clicks: thisClicks,
            }
          },
          children: equalJson(JSON.stringify(naverTargets)),
        });
      }

      thisCharge = googleTargets.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
      thisImpressions = googleTargets.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
      thisClicks = googleTargets.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
      if (!(thisCharge === 0 && thisImpressions === 0 && thisClicks === 0)) {
        newDataArray.push({
          kinds: "google",
          value: {
            charge: thisCharge,
            performance: {
              impressions: thisImpressions,
              clicks: thisClicks,
            }
          },
          children: equalJson(JSON.stringify(googleTargets)),
        });
      }

      thisCharge = kakaoTargets.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
      thisImpressions = kakaoTargets.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
      thisClicks = kakaoTargets.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
      if (!(thisCharge === 0 && thisImpressions === 0 && thisClicks === 0)) {
        newDataArray.push({
          kinds: "kakao",
          value: {
            charge: thisCharge,
            performance: {
              impressions: thisImpressions,
              clicks: thisClicks,
            }
          },
          children: equalJson(JSON.stringify(kakaoTargets)),
        });
      }

      newDataArrayCopied = equalJson(JSON.stringify(newDataArray));
      newDataArray.push({
        kinds: "total",
        value: {
          charge: newDataArrayCopied.reduce((acc, curr) => { return acc + curr.value.charge }, 0),
          performance: {
            impressions: newDataArrayCopied.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0),
            clicks: newDataArrayCopied.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0),
          }
        },
      });
      obj.data = newDataArray;
    }
    timeMatrix.sort((a, b) => {
      return b.date.valueOf() - a.date.valueOf();
    });
    cleanChildren(tong);

    instance.adsMatrix = [
      [
        "기준 날짜",
        "플랫폼",
        "캠페인",
        "타입",
        "Adset",
        "Ad",
        "비용",
        "노출",
        "클릭",
        "CTR",
        "CPC",
      ]
    ];
    num0 = 0;

    for (let obj of timeMatrix) {
      baseBlock = createNode({
        mother: tong,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          borderBottom: num0 !== timeMatrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
          flexDirection: "row",
          background: (num0 % 2 === 0) ? colorChip.white : colorChip.gray0,
        }
      });
      createNode({
        mother: baseBlock,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(timeWidth) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRight: "1px solid " + colorChip.gray3,
          boxSizing: "border-box",
          overflow: "hidden",
        },
        child: {
          style: {
            display: "block",
            position: "relative",
            width: withOut(leftPadding * 2, ea),
            overflow: "hidden",
            textAlign: "center",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              left: withOut(50, maxWidth / 2, ea),
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              text: dateToString(obj.date),
              style: {
                display: "inline-block",
                position: "relative",
                top: String(textTop) + ea,
                fontSize: String(timeSize) + ea,
                fontWeight: String(timeWeight),
                color: colorChip.black,
                textAlign: "center",
              },
            }
          },
        }
      });
      campaignTong = createNode({
        mother: baseBlock,
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(timeWidth, ea),
          flexDirection: "column",
        },
      });
      num = 0;
      for (let campaign of obj.data) {
        campaignBaseBlock = createNode({
          mother: campaignTong,
          style: {
            display: "flex",
            position: "relative",
            flexDirection: "row",
            width: withOut(0, ea),
            boxSizing: "border-box",
            borderBottom: num !== obj.data.length - 1 ? "1px solid " + colorChip.gray3 : "",
          },
        });
        createNode({
          mother: campaignBaseBlock,
          style: {
            display: "inline-flex",
            verticalAlign: "top",
            position: "relative",
            width: String(typeWidth) + ea,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRight: "1px solid " + colorChip.gray3,
            boxSizing: "border-box",       
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(leftPadding * 2, ea),
              overflow: "hidden",
              textAlign: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: String(maxWidth) + ea,
                left: withOut(50, maxWidth / 2, ea),
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: campaign.kinds,
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(textTop) + ea,
                  fontSize: String(textSize) + ea,
                  fontWeight: String(kindsWeight),
                  color: colorChip.black,
                }
              }
            },
          }
        });

        if (campaign.kinds === "meta") {
          metaCampaignTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: String((blockWidth * 10) + 1) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",       
            },
          });

          num5 = 0;
          for (let realCampaign of campaign.children) {
            realCampaignTong = createNode({
              mother: metaCampaignTong,
              style: {
                display: "flex",
                verticalAlign: "top",
                position: "relative",
                width: withOut(0, ea),
                borderBottom: num5 !== campaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                flexDirection: "row",
              }
            });
            createNode({
              mother: realCampaignTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 2) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRight: "1px solid " + colorChip.gray3,
                boxSizing: "border-box",
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: realCampaign.information.name,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    }
                  }
                },
              }
            });
            adSetTong = createNode({
              mother: realCampaignTong,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 8) + ea,
              },
            });
            num2 = 0;
            for (let adset of realCampaign.children) {
  
              adSetBaseBlock = createNode({
                mother: adSetTong,
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  boxSizing: "border-box",
                  flexDirection: "row",
                  borderBottom: num2 !== realCampaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                },
              });
              createNode({
                mother: adSetBaseBlock,
                style: {
                  display: "inline-flex",
                  verticalAlign: "top",
                  position: "relative",
                  width: String(blockWidth * 2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRight: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",       
                },
                child: {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(leftPadding * 2, ea),
                    overflow: "hidden",
                    textAlign: "center",
                  },
                  child: {
                    style: {
                      display: "flex",
                      position: "relative",
                      width: String(maxWidth) + ea,
                      left: withOut(50, maxWidth / 2, ea),
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    child: {
                      text: adset.information.name,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(textTop) + ea,
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.black,
                      }
                    }
                  },
                }
              });
              adTong = createNode({
                mother: adSetBaseBlock,
                style: {
                  display: "inline-block",
                  verticalAlign: "top",
                  position: "relative",
                  width: withOut(blockWidth * 2, ea),
                  boxSizing: "border-box",
                },
              });
  
              num3 = 0;
              for (let ad of adset.children) {
                adBaseBlock = createNode({
                  mother: adTong,
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0, ea),
                    height: String(blockHeight) + ea,
                    boxSizing: "border-box",
                    borderBottom: num3 !== adset.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                  },
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRight: "1px solid " + colorChip.gray3,
                    boxSizing: "border-box",       
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: ad.information.name,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "비용:" + blank + "<b%" + autoComma(ad.value.charge) + "원" + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "노출:" + blank + "<b%" + String(ad.value.performance.impressions) + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "클릭:" + blank + "<b%" + String(ad.value.performance.clicks) + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "CTR:" + blank + "<b%" + String(ad.value.performance.impressions === 0 ? 0 : Math.round((ad.value.performance.clicks / ad.value.performance.impressions) * 10000) / 100) + "%%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "CPC:" + blank + "<b%" + String(ad.value.performance.clicks === 0 ? 0 : autoComma((ad.value.charge / ad.value.performance.clicks))) + "원%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });

                instance.adsMatrix.push([
                  dateToString(obj.date),
                  campaign.kinds,
                  realCampaign.information.name,
                  "instagram",
                  adset.information.name,
                  ad.information.name,
                  ad.value.charge,
                  ad.value.performance.impressions,
                  ad.value.performance.clicks,
                  (ad.value.performance.impressions === 0 ? 0 : Math.round((ad.value.performance.clicks / ad.value.performance.impressions) * 10000) / 100),
                  ad.value.performance.clicks === 0 ? 0 : Math.floor((ad.value.charge / ad.value.performance.clicks)),
                ])

                num3++;
              }
              
              num2++;
            }
            num5++;
          }

        } else if (campaign.kinds === "kakao") {

          kakaoCampaignTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: String((blockWidth * 10) + 1) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",       
            },
          });

          num5 = 0;
          for (let realCampaign of campaign.children) {
            realCampaignTong = createNode({
              mother: kakaoCampaignTong,
              style: {
                display: "flex",
                verticalAlign: "top",
                position: "relative",
                width: withOut(0, ea),
                borderBottom: num5 !== campaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                flexDirection: "row",
              }
            });
            createNode({
              mother: realCampaignTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 2) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRight: "1px solid " + colorChip.gray3,
                boxSizing: "border-box",
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: realCampaign.information.name,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    }
                  }
                },
              }
            });
            adSetTong = createNode({
              mother: realCampaignTong,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 8) + ea,
              },
            });
            num2 = 0;
            for (let adset of realCampaign.children) {
  
              adSetBaseBlock = createNode({
                mother: adSetTong,
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  boxSizing: "border-box",
                  flexDirection: "row",
                  borderBottom: num2 !== realCampaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                },
              });
              createNode({
                mother: adSetBaseBlock,
                style: {
                  display: "inline-flex",
                  verticalAlign: "top",
                  position: "relative",
                  width: String(blockWidth * 2) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRight: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",       
                },
                child: {
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(leftPadding * 2, ea),
                    overflow: "hidden",
                    textAlign: "center",
                  },
                  child: {
                    style: {
                      display: "flex",
                      position: "relative",
                      width: String(maxWidth) + ea,
                      left: withOut(50, maxWidth / 2, ea),
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    child: {
                      text: adset.information.name,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        top: String(textTop) + ea,
                        fontSize: String(textSize) + ea,
                        fontWeight: String(textWeight),
                        color: colorChip.black,
                      }
                    }
                  },
                }
              });
              adTong = createNode({
                mother: adSetBaseBlock,
                style: {
                  display: "inline-block",
                  verticalAlign: "top",
                  position: "relative",
                  width: withOut(blockWidth * 2, ea),
                  boxSizing: "border-box",
                },
              });
  
              num3 = 0;
              for (let ad of adset.children) {
                adBaseBlock = createNode({
                  mother: adTong,
                  style: {
                    display: "block",
                    position: "relative",
                    width: withOut(0, ea),
                    height: String(blockHeight) + ea,
                    boxSizing: "border-box",
                    borderBottom: num3 !== adset.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
                  },
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRight: "1px solid " + colorChip.gray3,
                    boxSizing: "border-box",       
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: ad.information.name,
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.black,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "비용:" + blank + "<b%" + autoComma(ad.value.charge) + "원" + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "노출:" + blank + "<b%" + String(ad.value.performance.impressions) + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "클릭:" + blank + "<b%" + String(ad.value.performance.clicks) + "%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    borderRight: "1px dashed " + colorChip.gray3,
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "CTR:" + blank + "<b%" + String(ad.value.performance.impressions === 0 ? 0 : Math.round((ad.value.performance.clicks / ad.value.performance.impressions) * 10000) / 100) + "%%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });
                createNode({
                  mother: adBaseBlock,
                  style: {
                    display: "inline-flex",
                    verticalAlign: "top",
                    position: "relative",
                    width: String(blockWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                  },
                  child: {
                    style: {
                      display: "block",
                      position: "relative",
                      width: withOut(leftPadding * 2, ea),
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(maxWidth) + ea,
                        left: withOut(50, maxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        text: "CPC:" + blank + "<b%" + String(ad.value.performance.clicks === 0 ? 0 : autoComma((ad.value.charge / ad.value.performance.clicks))) + "원%b>",
                        style: {
                          display: "inline-block",
                          position: "relative",
                          top: String(textTop) + ea,
                          fontSize: String(textSize) + ea,
                          fontWeight: String(textWeight),
                          color: colorChip.deactive,
                        },
                        bold: {
                          fontSize: String(textSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.green,
                        }
                      }
                    },
                  }
                });

                instance.adsMatrix.push([
                  dateToString(obj.date),
                  campaign.kinds,
                  realCampaign.information.name,
                  "instagram",
                  adset.information.name,
                  ad.information.name,
                  ad.value.charge,
                  ad.value.performance.impressions,
                  ad.value.performance.clicks,
                  (ad.value.performance.impressions === 0 ? 0 : Math.round((ad.value.performance.clicks / ad.value.performance.impressions) * 10000) / 100),
                  ad.value.performance.clicks === 0 ? 0 : Math.floor((ad.value.charge / ad.value.performance.clicks)),
                ])

                num3++;
              }
              
              num2++;
            }
            num5++;
          }
          
        } else if (campaign.kinds === "naver") {
          naverCampaignTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: String((blockWidth * 10) + 1) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",       
            },
          });
          num4 = 0;
          for (let naverCampaign of campaign.children) {
            performanceTong = createNode({
              mother: naverCampaignTong,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(0, ea),
                height: String(blockHeight) + ea,
                boxSizing: "border-box",
                borderBottom: num4 !== campaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
              },
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 2) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px solid " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: naverCampaign.information.name,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 3) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px solid " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "타입:" + blank + "<b%" + naverCampaign.information.type + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "비용:" + blank + "<b%" + autoComma(naverCampaign.value.charge) + "원" + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "노출:" + blank + "<b%" + String(naverCampaign.value.performance.impressions) + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "클릭:" + blank + "<b%" + String(naverCampaign.value.performance.clicks) + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "CTR:" + blank + "<b%" + String(naverCampaign.value.performance.impressions === 0 ? 0 : Math.round((naverCampaign.value.performance.clicks / naverCampaign.value.performance.impressions) * 10000) / 100) + "%%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "CPC:" + blank + "<b%" + String(naverCampaign.value.performance.clicks === 0 ? 0 : autoComma((naverCampaign.value.charge / naverCampaign.value.performance.clicks))) + "원%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });

            instance.adsMatrix.push([
              dateToString(obj.date),
              campaign.kinds,
              naverCampaign.information.name,
              naverCampaign.information.type,
              "-",
              "-",
              naverCampaign.value.charge,
              naverCampaign.value.performance.impressions,
              naverCampaign.value.performance.clicks,
              (naverCampaign.value.performance.impressions === 0 ? 0 : Math.round((naverCampaign.value.performance.clicks / naverCampaign.value.performance.impressions) * 10000) / 100),
              (naverCampaign.value.performance.clicks === 0 ? 0 : Math.floor((naverCampaign.value.charge / naverCampaign.value.performance.clicks)))
            ]);

            num4++;
          }

        } else if (campaign.kinds === "google") {

          googleCampaignTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: String((blockWidth * 10) + 1) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",       
            },
          });
          num4 = 0;
          for (let googleCampaign of campaign.children) {
            performanceTong = createNode({
              mother: googleCampaignTong,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: withOut(0, ea),
                height: String(blockHeight) + ea,
                boxSizing: "border-box",
                borderBottom: num4 !== campaign.children.length - 1 ? "1px solid " + colorChip.gray3 : "",
              },
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth * 5) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px solid " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: googleCampaign.information.name,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    }
                  }
                },
              }
            });

            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "비용:" + blank + "<b%" + autoComma(googleCampaign.value.charge) + "원" + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "노출:" + blank + "<b%" + String(googleCampaign.value.performance.impressions) + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "클릭:" + blank + "<b%" + String(googleCampaign.value.performance.clicks) + "%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                borderRight: "1px dashed " + colorChip.gray3,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "CTR:" + blank + "<b%" + String(googleCampaign.value.performance.impressions === 0 ? 0 : Math.round((googleCampaign.value.performance.clicks / googleCampaign.value.performance.impressions) * 10000) / 100) + "%%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });
            createNode({
              mother: performanceTong,
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                position: "relative",
                width: String(blockWidth) + ea,
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(leftPadding * 2, ea),
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(maxWidth) + ea,
                    left: withOut(50, maxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "CPC:" + blank + "<b%" + String(googleCampaign.value.performance.clicks === 0 ? 0 : autoComma((googleCampaign.value.charge / googleCampaign.value.performance.clicks))) + "원%b>",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(valueWeight),
                      color: colorChip.green,
                    }
                  }
                },
              }
            });

            instance.adsMatrix.push([
              dateToString(obj.date),
              campaign.kinds,
              googleCampaign.information.name,
              "-",
              "-",
              "-",
              googleCampaign.value.charge,
              googleCampaign.value.performance.impressions,
              googleCampaign.value.performance.clicks,
              (googleCampaign.value.performance.impressions === 0 ? 0 : Math.round((googleCampaign.value.performance.clicks / googleCampaign.value.performance.impressions) * 10000) / 100),
              (googleCampaign.value.performance.clicks === 0 ? 0 : Math.floor((googleCampaign.value.charge / googleCampaign.value.performance.clicks)))
            ]);

            num4++;
          }

        } else if (campaign.kinds === "total") {
          totalCampaignTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: String((blockWidth * 10) + 1) + ea,
              height: String(blockHeight) + ea,
              borderRight: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",       
            },
          });

          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth * 5) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              borderRight: "1px solid " + colorChip.gray3,
            },
            child: {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(linePadding * 2, ea),
                height: String(0),
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            }
          });
          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              borderRight: "1px dashed " + colorChip.gray3,
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                overflow: "hidden",
                textAlign: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  left: withOut(50, maxWidth / 2, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "비용:" + blank + "<b%" + autoComma(campaign.value.charge) + "원" + "%b>",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(textTop) + ea,
                    fontSize: String(textSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.deactive,
                  },
                  bold: {
                    fontSize: String(textSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.black,
                  }
                }
              },
            }
          });
          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              borderRight: "1px dashed " + colorChip.gray3,
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                overflow: "hidden",
                textAlign: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  left: withOut(50, maxWidth / 2, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "노출:" + blank + "<b%" + String(campaign.value.performance.impressions) + "%b>",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(textTop) + ea,
                    fontSize: String(textSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.deactive,
                  },
                  bold: {
                    fontSize: String(textSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.black,
                  }
                }
              },
            }
          });
          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              borderRight: "1px dashed " + colorChip.gray3,
            },
            child: {
              style: {
                display: "block",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                overflow: "hidden",
                textAlign: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  left: withOut(50, maxWidth / 2, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: "클릭:" + blank + "<b%" + String(campaign.value.performance.clicks) + "%b>",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(textTop) + ea,
                    fontSize: String(textSize) + ea,
                    fontWeight: String(textWeight),
                    color: colorChip.deactive,
                  },
                  bold: {
                    fontSize: String(textSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.black,
                  }
                }
              },
            }
          });
          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              borderRight: "1px dashed " + colorChip.gray3,
            },
            child: {
              text: "",
              style: {
                display: "inline-flex",
                position: "relative",
                top: String(textTop) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.deactive,
              },
              bold: {
                fontSize: String(textSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
              }
            }
          });
          createNode({
            mother: totalCampaignTong,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: String(blockWidth) + ea,
              height: withOut(0, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
            },
            child: {
              text: "",
              style: {
                display: "inline-flex",
                position: "relative",
                top: String(textTop) + ea,
                fontSize: String(textSize) + ea,
                fontWeight: String(textWeight),
                color: colorChip.deactive,
              },
              bold: {
                fontSize: String(textSize) + ea,
                fontWeight: String(valueWeight),
                color: colorChip.black,
              }
            }
          });

          createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: withOut(typeWidth + (blockWidth * 10) + 1, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",       
              flexDirection: "column",
            },
            child: {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(linePadding * 2, ea),
                height: String(0),
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            }
          });

        }

        if (campaign.kinds !== "total") {
          summaryTong = createNode({
            mother: campaignBaseBlock,
            style: {
              display: "inline-flex",
              verticalAlign: "top",
              position: "relative",
              width: withOut(typeWidth + (blockWidth * 10) + 1, ea),
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",       
              flexDirection: "column",
            },
            child: {
              style: {
                display: "inline-block",
                position: "relative",
                textAlign: "center",       
              },
              child: {
                text: "<b%" + campaign.kinds + "%b>" + " => " + "비용:" + blank + "<b%" + autoComma(campaign.value.charge) + "원" + "%b>" + "\n" + "노출:" + blank + "<b%" + String(campaign.value.performance.impressions) + "%b>" + slash + "클릭:" + blank + "<b%" + String(campaign.value.performance.clicks) + "%b>",
                style: {
                  display: "inline-block",
                  position: "relative",
                  textAlign: "center",
                  top: String(textTop) + ea,
                  fontSize: String(textSize) + ea,
                  fontWeight: String(textWeight),
                  color: colorChip.deactive,
                  lineHeight: String(1.6),
                },
                bold: {
                  fontSize: String(textSize) + ea,
                  fontWeight: String(valueWeight),
                  color: colorChip.black,
                },
                under: {
                  fontSize: String(textSize) + ea,
                  fontWeight: String(valueWeight),
                  color: colorChip.deactive,
                }
              }
            }
          });
        }
        
        num++;
      }
      num0++;
    }

  } catch (e) {
    console.log(e);
    return null;
  }
}

MprJs.prototype.clientWhiteHistory = async function (tong, dataSet) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, stringToLink, variableArray, downloadFile, uniqueValue, sleep, equalJson, hexaJson } = GeneralJs;
  try {
    const {
      cliid,
      requestNumber,
      client,
      request,
      analytics,
      clientAnalytics,
      clientHistory,
      proid,
      desid,
      designer,
      project,
      naverComplex
    } = dataSet;
    const eventDictionary = {
      pageInit: { title: "페이지 진입", mode: "white" },
      viewToggle: { title: "사진 전환", mode: "white" },
      popupOpen: { title: "팝업 열어보기", mode: "white" },
      login: { title: "상담 문의 완료", mode: "green" },
      styleCheck: { title: "스타일체크 완료", mode: "white" },
      submitForm: { title: "상세 큐레이션 완료", mode: "white" },
      sendLowLowPush: { title: "하하 전송", mode: "white" },
      sendFinalPush: { title: "서비스 소개 전송", mode: "white" },
      sendDesignerProposal: { title: "추천서 전송", mode: "green" },
      sendPureOutOfClient: { title: "부재중 알림", mode: "white" },
      callInSuccess: { title: "수신 통화 성공", mode: "white" },
      callInFail: { title: "수신 통화 실패", mode: "white" },
      callOutSuccess: { title: "발신 통화 성공", mode: "white" },
      callOutFail: { title: "발신 통화 실패", mode: "white" },
      searchKeyword: { title: "키워드 검색", mode: "white" },
      clickKeyword: { title: "키워드 클릭", mode: "white" },
      designerSelect: { title: "디자이너 선택", mode: "green" }
    };
    const { history } = clientAnalytics;
    let targetDetail;
    let scrollTong;
    let historyFontSize;
    let historyPaddingTop;
    let historyPaddingBottom;
    let historyPaddingLeft;
    let historyBlockMargin;
    let timeWidth;
    let eventWidth;
    let pageNameWidth;
    let blockHeight;
    let textTop;
    let leftPadding;
    let maxWidth;
    let matrixDelta;

    targetDetail = history.detail.filter((obj) => {
      return obj.event !== "scrollStop" && obj.event !== "contentsView" && obj.event !== "readTimer" && obj.event !== "addressClick" && obj.event !== "inputBlur" && obj.event !== "photoBigView";
    });

    historyFontSize = 11;
    historyPaddingTop = (isMac() ? 5 : 6)
    historyPaddingBottom = (isMac() ? 7 : 6);
    historyPaddingLeft = 12;
    historyBlockMargin = 3;

    timeWidth = 100;
    eventWidth = 90;
    pageNameWidth = 70;
    blockHeight = 26;
    textTop = isMac() ? -1 : 1;
    leftPadding = 4;
    maxWidth = 1000;

    scrollTong = tong;

    matrixDelta = targetDetail.length - this.clientDetailMatrix.length;

    if (matrixDelta > 0) {
      for (let i = 0; i < matrixDelta; i++) {
        this.clientDetailMatrix.push([
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ])
      }
    }

    num = 0;
    for (let block of targetDetail) {
      createNode({
        mother: scrollTong,
        style: {
          position: "relative",
          display: "block",
          width: String(100) + '%',
          height: "auto",
          marginBottom: String(historyBlockMargin) + ea,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              background: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.green : colorChip.gray2,
              height: String(blockHeight) + ea,
              width: String(timeWidth) + ea,
              marginRight: String(historyBlockMargin) + ea,
              borderRadius: String(3) + "px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: dateToString(block.date, true).slice(2, -3),
                  style: {
                    position: "relative",
                    display: "inline-block",
                    top: String(textTop) + ea,
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(400),
                    color: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.white : colorChip.shadowWhite,
                    textAlign: "center",
                  },
                  bold: {
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.green,
                  }
                }
              }
            },
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              background: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.green : colorChip.gray0,
              height: String(blockHeight) + ea,
              width: String(eventWidth) + ea,
              marginRight: String(historyBlockMargin) + ea,
              borderRadius: String(3) + "px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: eventDictionary[block.event.split("_")[0]]?.title || block.event,
                  style: {
                    position: "relative",
                    display: "inline-block",
                    top: String(textTop) + ea,
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(700),
                    color: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.white : colorChip.black,
                    textAlign: "center",
                  },
                  bold: {
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.green,
                  }
                }
              }
            },
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              background: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.green : colorChip.gray0,
              height: String(blockHeight) + ea,
              width: String(pageNameWidth) + ea,
              marginRight: String(historyBlockMargin) + ea,
              borderRadius: String(3) + "px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: (/\/([a-zA-Z]+\.php)/gi.exec(block.path) || [ "", "(not set)" ])[1].replace(/\.php$/gi, ''),
                  style: {
                    position: "relative",
                    display: "inline-block",
                    top: String(textTop) + ea,
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(400),
                    color: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.white : colorChip.black,
                    textAlign: "center",
                  },
                  bold: {
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.green,
                  }
                }
              }
            },
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              background: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.green : colorChip.gray0,
              height: String(blockHeight) + ea,
              width: withOut(timeWidth + eventWidth + pageNameWidth + (historyBlockMargin * 3), ea),
              borderRadius: String(3) + "px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(leftPadding * 2, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  text: block.title.replace(/\| 홈리에종$/gi, '').trim(),
                  style: {
                    position: "relative",
                    display: "inline-block",
                    top: String(textTop) + ea,
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(400),
                    color: eventDictionary[block.event.split("_")[0]]?.mode === "green" ? colorChip.white : colorChip.black,
                    textAlign: "center",
                  },
                  bold: {
                    fontSize: String(historyFontSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.green,
                  }
                }
              }
            },
          },
        ]
      });

      if (Array.isArray(this.clientDetailMatrix[num + 1])) {
        this.clientDetailMatrix[num + 1][3] = dateToString(block.date, true);
        this.clientDetailMatrix[num + 1][4] = eventDictionary[block.event.split("_")[0]]?.title || block.event;
        this.clientDetailMatrix[num + 1][5] = (/\/([a-zA-Z]+\.php)/gi.exec(block.path) || [ "", "(not set)" ])[1].replace(/\.php$/gi, '');
        this.clientDetailMatrix[num + 1][6] = block.title.replace(/\| 홈리에종$/gi, '').trim();
      }

      scrollTong.style.height = "auto";
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.coreColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.mainDataRender());

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.mprBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName, moveTargetClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let coreContentsLoad;
    let circleRight, circleTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    ({ standards, columns, values } = await this.mainDataRender());
  
    hoverEvent = () => {
      return function (e) {
        const cliid = this.getAttribute("cliid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "cliid", cliid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const cliid = this.getAttribute("cliid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "cliid", cliid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("key");
              thisValueDom = findByAttribute(valueDoms, "key", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("key");
              thisValueDom = findByAttribute(valueDoms, "key", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      includesEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisKey;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisKey = idNameDoms[i].getAttribute("key");
              thisValueDom = findByAttribute(valueDoms, "key", thisKey);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if ((new RegExp(thisValue, "gi")).test(findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim())) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if ((new RegExp(thisValue, "gi")).test(findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim())) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }
    this.menuEventTong = menuEventTong;

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          const maxLnegth = 20;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          if (thisMenu.length >= maxLnegth) {

            blackPrompt = createNode({
              mother: totalContents,
              class: [ menuPromptClassName ],
              style: {
                position: "fixed",
                top: String(e.y + menuVisual) + "px",
                left: String(e.x + menuVisual) + "px",
                width: String(menuPromptWidth) + ea,
                background: colorChip.white,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
                height: String((menuPromptHeight + menuBetween) * maxLnegth) + ea,
                overflow: "scroll",
              },
              children: thisMenu.map(({ value, functionName }) => {
                const functionOrderArr = functionName.split("_");
                const [ thisFunctionName ] = functionOrderArr;
                let thisArguments;
                if (functionOrderArr.length > 1) {
                  thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
                } else {
                  thisArguments = [ name, index ];
                }
                return {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                    click: menuEventTong[thisFunctionName](...thisArguments),
                  },
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(menuPromptWidth) + ea,
                    height: String(menuPromptHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.gradientGray,
                    marginBottom: String(menuBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  child: {
                    text: value,
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                    },
                    style: {
                      position: "relative",
                      top: String(menuTextTop) + ea,
                      fontSize: String(menuSize) + ea,
                      fontWeight: String(menuWeight),
                      color: colorChip.white,
                    }
                  }
                }
              })
            });

          } else {

            blackPrompt = createNode({
              mother: totalContents,
              class: [ menuPromptClassName ],
              style: {
                position: "fixed",
                top: String(e.y + menuVisual) + "px",
                left: String(e.x + menuVisual) + "px",
                width: String(menuPromptWidth) + ea,
                background: colorChip.white,
                animation: "fadeuplite 0.3s ease forwards",
                zIndex: String(zIndex),
              },
              children: thisMenu.map(({ value, functionName }) => {
                const functionOrderArr = functionName.split("_");
                const [ thisFunctionName ] = functionOrderArr;
                let thisArguments;
                if (functionOrderArr.length > 1) {
                  thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
                } else {
                  thisArguments = [ name, index ];
                }
                return {
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                    click: menuEventTong[thisFunctionName](...thisArguments),
                  },
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(menuPromptWidth) + ea,
                    height: String(menuPromptHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.gradientGray,
                    marginBottom: String(menuBetween) + ea,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                  child: {
                    text: value,
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                    },
                    style: {
                      position: "relative",
                      top: String(menuTextTop) + ea,
                      fontSize: String(menuSize) + ea,
                      fontWeight: String(menuWeight),
                      color: colorChip.white,
                    }
                  }
                }
              })
            });

          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    coreContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.mainDataRender());
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let { client, requestNumber } of instance.clients) {
      
          createNode({
            mother: idNameArea,
            attribute: { cliid: client.cliid, request: String(requestNumber), key: client.cliid + "_" + String(requestNumber), lastfilter: "none" },
            event: {
              click: instance.clientWhiteCard(client.cliid, requestNumber),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[client.cliid + "_" + String(requestNumber)].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { cliid: client.cliid, lastfilter: "none", key: client.cliid + "_" + String(requestNumber) },
            class: [ moveTargetClassName, valueCaseClassName, client.cliid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {
            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      cliid: client.cliid,
                      name: values[client.cliid + "_" + String(requestNumber)][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[client.cliid + "_" + String(requestNumber)][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[client.cliid + "_" + String(requestNumber)][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
      
        }
    
        await instance.coreColorSync();
        await instance.mprPannel();

      } catch (e) {
        console.log(e);
      }
    }

    await coreContentsLoad(false);
    this.coreContentsLoad = coreContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.clientWhiteCard = function (cliid, requestNumber) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery, equalJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      const client = instance.clients.find((c) => { return c.cliid === cliid && c.requestNumber === requestNumber });
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;
      let innerMarginTop;
      let basePaddingTop;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            attribute: {
              cliid: cliid,
              request: String(requestNumber),
            },
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          attribute: {
            cliid: cliid,
            request: String(requestNumber),
            key: cliid + "_" + String(requestNumber),
          },
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(" + withOut(0, ea) + " / 3) * 2)",
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderTopLeftRadius: String(5) + "px",
                borderBottomLeftRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  flexDirection: "column",
                }
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(" + withOut(0, ea) + " / 3) * 1)",
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderLeft: "",
                borderTopRightRadius: String(5) + "px",
                borderBottomRightRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  flexDirection: "column",
                }
              }
            }
          ]
        });
  
        titleWhite = createNode({
          mother: totalContents,
          attribute: {
            cliid: cliid,
            request: String(requestNumber),
          },
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: client.client.name,
                style: {
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { cliid: client.cliid },
                event: {
                  click: async function (e) {
                    try {
                      const cliid = this.getAttribute("cliid");
                      await window.navigator.clipboard.writeText(cliid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: client.cliid,
                style: {
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  marginLeft: String(fontBetween) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                  cursor: "pointer",
                }
              },
              {
                style: {
                  display: "flex",
                  position: "absolute",
                  bottom: String(0),
                  right: String(0),
                  flexDirection: "row",
                  alignItems: "end",
                  justifyContent: "end",
                },
                children: [
                  {
                    class: [ titleButtonsClassName ],
                    attribute: {
                      cliid: cliid,
                      request: String(requestNumber),
                    },
                    event: {
                      click: async function (e) {
                        try {
                          const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
                          const today = new Date();
                          const cliid = this.getAttribute("cliid");
                          const requestNumber = Number(this.getAttribute("request"));
                          let matrix;

                          matrix = equalJson(JSON.stringify(instance.clientDetailMatrix));

                          instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
                          ajaxJson({
                            values: matrix,
                            newMake: true,
                            parentId: parentId,
                            sheetName: "fromDB_mprClients_" + String(today.getFullYear()) + instance.mother.todayMaker()
                          }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
                            blankHref(result.link);
                          }).catch((err) => {
                            console.log(err);
                          });

                        } catch (e) {
                          console.log(e);
                        }
                      }
                    },
                    text: "데이터 추출",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                ]
              },
            ]
          }
        });

        if (hasQuery("whitekey")) { removeQuery("whitekey"); }
        appendQuery({ whitekey: cliid + "_" + String(requestNumber) });

        instance.clientWhiteContents(whitePrompt.children[0].firstChild, cliid, requestNumber).then((dataSet) => {
          return instance.clientWhiteHistory(whitePrompt.children[1].firstChild, dataSet);
        }).catch((err) => { console.log(err); });
      }

      instance.whiteMaker = whiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.adsWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let adsWhiteMaker;
      let innerMarginTop;
      let basePaddingTop;
      let today;
      let loading;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      adsWhiteMaker = (reload = false, startDate = null, endDate = null) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
        if (startDate === null) {
          today = new Date();
          today.setDate(today.getDate() - 31);
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        }
        if (endDate === null) {
          today = new Date();
          today.setDate(today.getDate() - 1);
          endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        }

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "ads",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
              },
              child: {
                style: {
                  display: "flex",
                  position: "relative",
                  width: withOut(0, ea),
                  flexDirection: "column",
                }
              }
            }
          ]
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "광고 현황",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            adsWhiteMaker(true, startDate, endDate);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(startDate).slice(2) + " ~ " + dateToString(endDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "ads" });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.children[0].appendChild(loading);

        ajaxJson({ startDate, endDate }, CONTENTSHOST + "/getAdsComplex", { equal: true }).then((result) => {
          loading.remove();
          return instance.adsWhiteContents(whitePrompt.children[0].firstChild, result, startDate, endDate);
        }).catch((err) => {
          console.log(err);
        });
        
      }

      instance.adsWhiteMaker = adsWhiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        adsWhiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            adsWhiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.frontWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;
      let innerMarginTop;
      let basePaddingTop;
      let mainTitleSize;
      let timeDelta;
      let thisDate;
      let timeMatrix;
      let thisRow, thisCharge, thisBasic;
      let thisRows, thisCharges, thisBasics;
      let tableMatrix;
      let columnsLength;
      let tableTong;
      let rows;
      let charge;
      let basic;
      let type;
      let labels;
      let fill;
      let tension;
      let borderJoinStyle;
      let complexBoxesLength;
      let naverAds, metaAds, googleAds;
      let naverAd, metaAd, googleAd;
      let caseTong;
      let maxWidth;
      let tableBlockHeight;
      let tableSize, tableTextTop;

      toDate = new Date();
      toDate.setDate(toDate.getDate() - 1);
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      mainTitleSize = 21;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 36;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

      maxWidth = 1000;

      tableBlockHeight = 30;
      tableSize = 12;
      tableTextTop = isMac() ? -1 : 1;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        timeDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "front",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            }
          ]
        });

        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "프론트 웹 현황",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            whiteReportMaker(startDate, endDate, true);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.children[0].appendChild(loading);
        scrollBox = whitePrompt.children[0].firstChild;

        dataLoad = (loading) => {
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);

            [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginBottom: String(chartBetween) + ea,
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: withOut(0, ea),
                    border: "1px solid " + colorChip.gray3,
                    borderRadius: String(5) + "px",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    overflow: "hidden",
                  },
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰, 유저수, 전환수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수, 전환수, 문의수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 네이버 유입 / 메타 유입 / 구글 유입",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "전환수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰 기기 비율 - 모바일 / 데스트탑 / 태블릿",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "문의수, 추천수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 / 20, 문의수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 비용 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 클릭 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
            ].forEach((obj) => {
              obj.mother = scrollBox;
              createNode(obj);
            });

            tableTong = scrollBox.firstChild.firstChild;

            [ rows, charge, basic ] = result;
            type = "line";
            labels = rows.map((o) => { return dateToString(o.date.from).slice(5) });
            fill = false;
            tension = 0.3;
            borderJoinStyle = "round";
            complexBoxesLength = 1;

            rows.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            charge.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            basic.sort((a, b) => { return a.fromDate.valueOf() - b.fromDate.valueOf() });

            naverAds = [];
            metaAds = [];
            googleAds = [];
            for (let { date: { from, to } } of rows) {
              naverAds.push(charge.filter((o) => {
                return /naver/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                  date: { from, to },
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0,
                date: { from, to },
              }));
  
              metaAds.push(charge.filter((o) => {
                return /facebook/gi.test(o.information.mother) || /instagram/gi.test(o.information.mother) || /meta/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                  date: { from, to },
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0,
                date: { from, to },
              }));
  
              googleAds.push(charge.filter((o) => {
                return /google/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                  date: { from, to },
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0,
                date: { from, to },
              }));
  
            }

            timeMatrix = [];
            for (let i = 0; i < timeDelta + 1; i++) {
              thisDate = new Date(JSON.stringify(fromDate).slice(1, -1));
              thisDate.setDate(thisDate.getDate() + i);

              thisRows = rows.filter((o) => { return dateToString(o.date.from) === dateToString(thisDate) })
              thisCharges = charge.filter((o) => { return dateToString(o.date.from) === dateToString(thisDate) })
              thisBasics = basic.filter((o) => { return dateToString(o.fromDate) === dateToString(thisDate) })

              if (thisRows.length === 1 && thisBasics.length === 1) {
                [ thisRow ] = thisRows;
                [ thisBasic ] = thisBasics;
                [ naverAd ] = naverAds.filter((o) => { return dateToString(o.date.from) === dateToString(thisDate) });
                [ metaAd ] = metaAds.filter((o) => { return dateToString(o.date.from) === dateToString(thisDate) });
                [ googleAd ] = googleAds.filter((o) => { return dateToString(o.date.from) === dateToString(thisDate) });

                timeMatrix.push({
                  date: new Date(JSON.stringify(thisDate).slice(1, -1)),
                  users: thisRow.data.users.total,
                  views: thisRow.data.views.total,
                  consultingPage: thisRow.data.conversion.consultingPage.total,
                  popupOpen: thisRow.data.conversion.popupOpen.total,
                  converting: thisRow.data.conversion.consultingPage.total + thisRow.data.conversion.popupOpen.total,
                  clients: thisBasic.client,
                  recommend: thisBasic.recommend,
                  contract: thisBasic.contract,
                  organic: thisRow.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  ads: thisRow.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  sns: thisRow.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  direct: thisRow.data.views.total - (thisRow.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (thisRow.data.views.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                  naver: thisRow.data.views.detail.source.cases.filter((c) => { return /naver/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  meta: thisRow.data.views.detail.source.cases.filter((c) => { return /instagram/gi.test(c.case) || /facebook/gi.test(c.case) || /meta/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  google: thisRow.data.views.detail.source.cases.filter((c) => { return /google/gi.test(c.case) || /youtube/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0),
                  consultingOrganic: (thisRow.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + thisRow.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                  consultingAds: (thisRow.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + thisRow.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                  consultingSns: (thisRow.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + thisRow.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                  consultingDirect: (thisRow.data.conversion.consultingPage.total + thisRow.data.conversion.popupOpen.total) - (thisRow.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + thisRow.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (thisRow.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + thisRow.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)),
                  chargeNaver: naverAd.charge,
                  chargeMeta: metaAd.charge,
                  chargeGoogle: googleAd.charge,
                  impressionsNaver: naverAd.impressions,
                  impressionsMeta: metaAd.impressions,
                  impressionsGoogle: googleAd.impressions,
                  clicksNaver: naverAd.clicks,
                  clicksMeta: metaAd.clicks,
                  clicksGoogle: googleAd.clicks,
                });
              }
            }
            timeMatrix.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            tableMatrix = [
              [
                "기준일",
                "유저수",
                "페이지뷰",
                "컨설팅 페이지",
                "팝업 오픈",
                "전환수",
                "문의수",
                "추천수",
                "계약수",
                "오가닉 뷰수",
                "광고 뷰수",
                "SNS 뷰수",
                "다이렉트 뷰수",
                "네이버 유입",
                "메타 유입",
                "구글 유입",
                "오가닉 전환수",
                "광고 전환수",
                "SNS 전환수",
                "다이렉트 전환수",
              ]
            ]
            columnsLength = tableMatrix[0].length;
            for (let obj of timeMatrix) {
              tableMatrix.push([
                dateToString(obj.date).slice(2),
                obj.users,
                obj.views,
                obj.consultingPage,
                obj.popupOpen,
                obj.converting,
                obj.clients,
                obj.recommend,
                obj.contract,
                obj.organic,
                obj.ads,
                obj.sns,
                obj.direct,
                obj.naver,
                obj.meta,
                obj.google,
                obj.consultingOrganic,
                obj.consultingAds,
                obj.consultingSns,
                obj.consultingDirect,
              ])
            }

            for (let i = 0; i < tableMatrix.length; i++) {
              caseTong = createNode({
                mother: tableTong,
                style: {
                  display: "flex",
                  height: String(tableBlockHeight) + ea,
                  width: withOut(0, ea),
                  position: "relative",
                  flexDirection: "row",
                  borderBottom: i !== tableMatrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
                  background: i === 0 ? colorChip.gray0 : colorChip.white,
                }
              });
              for (let j = 0; j < tableMatrix[i].length; j++) {
                createNode({
                  mother: caseTong,
                  style: {
                    display: "inline-block",
                    width: "calc(100% / " + String(columnsLength) + ")",
                    height: withOut(0, ea),
                    position: "relative",
                    textAlign: "center",
                    borderRight: j !== tableMatrix[i].length - 1 ? "1px solid " + colorChip.gray3 : "",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      width: String(maxWidth) + ea,
                      marginLeft: withOut(50, (maxWidth / 2), ea),
                      height: withOut(0, ea),
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                    child: {
                      text: String(tableMatrix[i][j]),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(tableSize) + ea,
                        fontWeight: String(i === 0 ? 700 : 500),
                        color: colorChip.black,
                        top: String(tableTextTop) + ea,
                      }
                    }
                  },
                })
              }
            }
            instance.frontMatrix = tableMatrix;

            // 1
            new window.Chart(scrollBox.children[complexBoxesLength + 0].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Views",
                    data: rows.map((o) => { return o.data.views.total }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 2
            new window.Chart(scrollBox.children[complexBoxesLength + 1].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 3
            new window.Chart(scrollBox.children[complexBoxesLength + 2].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return o.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return o.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return o.data.views.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return o.data.views.total - (o.data.views.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.views.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 4
            new window.Chart(scrollBox.children[complexBoxesLength + 3].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: rows.map((o) => { return o.data.views.detail.source.cases.filter((c) => { return /naver/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: rows.map((o) => { return o.data.views.detail.source.cases.filter((c) => { return /instagram/gi.test(c.case) || /facebook/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: rows.map((o) => { return o.data.views.detail.source.cases.filter((c) => { return /google/gi.test(c.case) || /youtube/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 5
            new window.Chart(scrollBox.children[complexBoxesLength + 4].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 6
            new window.Chart(scrollBox.children[complexBoxesLength + 5].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Mobile",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "mobile" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Desktop",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "desktop" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Tablet",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "tablet" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 7
            new window.Chart(scrollBox.children[complexBoxesLength + 6].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Recommend",
                    data: basic.map((o) => { return o.recommend }),
                    borderColor: colorChip.black,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 8
            new window.Chart(scrollBox.children[complexBoxesLength + 7].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users / 20",
                    data: rows.map((o) => { return o.data.users.total / 20 }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 9
            new window.Chart(scrollBox.children[complexBoxesLength + 8].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.charge }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.charge }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.charge }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 10
            new window.Chart(scrollBox.children[complexBoxesLength + 9].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });

          }
        }

        chartJsPatch([
          { data: { mode: "daily", fromDate, toDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "charge", fromDate, toDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "basic", fromDate, toDate }, url: BACKHOST + "/extractAnalytics" },
        ]).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "front" });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.snsWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing, hasQuery, removeQuery, appendQuery, equalJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;
      let innerMarginTop;
      let basePaddingTop;
      let mainTitleSize;
      let timeDelta;
      let thisDate;
      let timeMatrix;
      let thisRow, thisCharge, thisBasic;
      let thisRows, thisCharges, thisBasics;
      let tableMatrix;
      let columnsLength;
      let tableTong;
      let rows;
      let charge;
      let basic;
      let type;
      let labels;
      let fill;
      let tension;
      let borderJoinStyle;
      let complexBoxesLength;
      let naverAds, metaAds, googleAds;
      let naverAd, metaAd, googleAd;
      let caseTong;
      let maxWidth;
      let tableBlockHeight;
      let tableSize, tableTextTop;
      let snsNumbers;
      let thisGoogle, thisMeta;
      let timeMatrixCopied;

      toDate = new Date();
      toDate.setDate(toDate.getDate() - 1);
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      mainTitleSize = 21;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 36;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

      maxWidth = 1000;

      tableBlockHeight = 30;
      tableSize = 12;
      tableTextTop = isMac() ? -1 : 1;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        timeDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "front",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            }
          ]
        });

        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "채널 현황",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            whiteReportMaker(startDate, endDate, true);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.children[0].appendChild(loading);
        scrollBox = whitePrompt.children[0].firstChild;

        dataLoad = (loading) => {
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);

            [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginBottom: String(chartBetween) + ea,
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: withOut(0, ea),
                    border: "1px solid " + colorChip.gray3,
                    borderRadius: String(5) + "px",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    overflow: "hidden",
                  },
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "인스타 - 노출 현황",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "인스타 - 반응 현황",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유튜브 - 노출 현황",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유튜브 - 반응 현황",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
            ].forEach((obj) => {
              obj.mother = scrollBox;
              createNode(obj);
            });

            tableTong = scrollBox.firstChild.firstChild;

            [ snsNumbers ] = result;
            type = "line";
            fill = false;
            tension = 0.3;
            borderJoinStyle = "round";
            complexBoxesLength = 1;
            
            timeMatrix = [];
            for (let i = 0; i < timeDelta + 1; i++) {
              thisDate = new Date(JSON.stringify(fromDate).slice(1, -1));
              thisDate.setDate(thisDate.getDate() + i);
              thisMeta = snsNumbers.meta.find((o) => { return o.key === dateToString(thisDate).replace(/[^0-9]/gi, '') + "_meta" });
              thisGoogle = snsNumbers.google.find((o) => { return o.key === dateToString(thisDate).replace(/[^0-9]/gi, '') + "_google" });
              timeMatrix.push({
                date: new Date(JSON.stringify(thisDate).slice(1, -1)),
                meta: thisMeta,
                google: thisGoogle,
              });
            }
            timeMatrix.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            timeMatrixCopied = equalJson(JSON.stringify(timeMatrix));
            timeMatrixCopied.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
            labels = timeMatrixCopied.map((o) => { return dateToString(o.date).slice(5) });

            tableMatrix = [
              [
                "기준일",
                "인스타 프로필뷰",
                "인스타 팔로워",
                "인스타 노출수",
                "인스타 클릭수",
                "인스타 좋아요수",
                "인스타 댓글수",
                "인스타 저장수",
                "인스타 공유수",
                "유투브 구독자",
                "유투브 노출수",
                "유투브 좋아요수",
                "유투브 공유수",
              ]
            ]
            columnsLength = tableMatrix[0].length;

            for (let obj of timeMatrix) {
              tableMatrix.push([
                dateToString(obj.date).slice(2),
                obj.meta.instagram.profile.views,
                obj.meta.instagram.profile.followers,
                obj.meta.instagram.performance.impressions,
                obj.meta.instagram.performance.clicks,
                obj.meta.instagram.performance.likes,
                obj.meta.instagram.performance.comments,
                obj.meta.instagram.performance.saves,
                obj.meta.instagram.performance.shares,
                obj.google.youtube.profile.followers,
                obj.google.youtube.performance.views,
                obj.google.youtube.performance.likes,
                obj.google.youtube.performance.shares,
              ])
            }

            for (let i = 0; i < tableMatrix.length; i++) {
              caseTong = createNode({
                mother: tableTong,
                style: {
                  display: "flex",
                  height: String(tableBlockHeight) + ea,
                  width: withOut(0, ea),
                  position: "relative",
                  flexDirection: "row",
                  borderBottom: i !== tableMatrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
                  background: i === 0 ? colorChip.gray0 : colorChip.white,
                }
              });
              for (let j = 0; j < tableMatrix[i].length; j++) {
                createNode({
                  mother: caseTong,
                  style: {
                    display: "inline-block",
                    width: "calc(100% / " + String(columnsLength) + ")",
                    height: withOut(0, ea),
                    position: "relative",
                    textAlign: "center",
                    borderRight: j !== tableMatrix[i].length - 1 ? "1px solid " + colorChip.gray3 : "",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      width: String(maxWidth) + ea,
                      marginLeft: withOut(50, (maxWidth / 2), ea),
                      height: withOut(0, ea),
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                    child: {
                      text: String(tableMatrix[i][j]),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(tableSize) + ea,
                        fontWeight: String(i === 0 ? 700 : 500),
                        color: colorChip.black,
                        top: String(tableTextTop) + ea,
                      }
                    }
                  },
                })
              }
            }
            
            instance.snsMatrix = tableMatrix;

            // 1
            new window.Chart(scrollBox.children[complexBoxesLength + 0].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Impressions",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.impressions }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Profile",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.profile.views }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });

            // 2
            new window.Chart(scrollBox.children[complexBoxesLength + 1].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Followers",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.profile.followers }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clicks",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.clicks }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Likes",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.likes }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Comments",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.comments }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Saves",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.saves }),
                    borderColor: colorChip.shadow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Shares",
                    data: timeMatrixCopied.map((o) => { return o.meta.instagram.performance.shares }),
                    borderColor: colorChip.gray3,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });

            // 3
            new window.Chart(scrollBox.children[complexBoxesLength + 2].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Impressions",
                    data: timeMatrixCopied.map((o) => { return o.google.youtube.performance.views }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });

            // 4
            new window.Chart(scrollBox.children[complexBoxesLength + 3].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Followers",
                    data: timeMatrixCopied.map((o) => { return o.google.youtube.profile.followers }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Likes",
                    data: timeMatrixCopied.map((o) => { return o.google.youtube.performance.likes }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Shares",
                    data: timeMatrixCopied.map((o) => { return o.google.youtube.performance.shares }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });

          }
        }

        chartJsPatch([
          { data: { startDate: fromDate, endDate: toDate }, url: CONTENTSHOST + "/getSnsComplex" },
        ]).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "sns" });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.queryWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, moveTargetClassName2 } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;
      let innerMarginTop;
      let basePaddingTop;
      let mainTitleSize;
      let timeDelta;
      let thisDate;
      let timeMatrix;
      let thisRow, thisCharge, thisBasic;
      let thisRows, thisCharges, thisBasics;
      let tableMatrix;
      let columnsLength;
      let tableTong;
      let rows;
      let charge;
      let basic;
      let type;
      let labels;
      let fill;
      let tension;
      let borderJoinStyle;
      let complexBoxesLength;
      let naverAds, metaAds, googleAds;
      let naverAd, metaAd, googleAd;
      let caseTong;
      let maxWidth;
      let tableBlockHeight;
      let tableSize, tableTextTop;
      let whereQuery;
      let num;
      let valueTong;
      let caseTongWidth, valueTongWidth;
      let caseMaxLength;
      let pastLength;
      let thisTotalTong;

      toDate = new Date();
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 12;
      fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      mainTitleSize = 21;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 36;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

      maxWidth = 1000;

      tableBlockHeight = 30;
      tableSize = 12;
      tableTextTop = isMac() ? -1 : 1;

      caseTongWidth = 200;
      valueTongWidth = 60;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        timeDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "query",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            }
          ]
        });

        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "검색어 현황",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            whiteReportMaker(startDate, endDate, true);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.children[0].appendChild(loading);
        scrollBox = whitePrompt.children[0].firstChild;

        dataLoad = (loading) => {
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);
            result.sort((a, b) => {
              return b.date.from.valueOf() - a.date.from.valueOf();
            });
            caseMaxLength = 0;
            for (let obj of result) {
              obj.data.detail.sort((a, b) => { return b.value - a.value });
              caseMaxLength = obj.data.detail.length >= caseMaxLength ? obj.data.detail.length : caseMaxLength;
            }

            tableTong = createNode({
              mother: scrollBox,
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                verticalAlign: "top",
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName2 ],
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: "auto",
                  border: "1px solid " + colorChip.gray3,
                  borderRadius: String(5) + "px",
                  boxSizing: "border-box",
                  flexDirection: "row",
                  overflow: "hidden",
                },
              }
            }).firstChild;

            pastLength = 99999999;
            for (let i = 0; i < result.length; i++) {

              thisTotalTong = createNode({
                mother: tableTong,
                style: {
                  display: "inline-block",
                  width: String(caseTongWidth + valueTongWidth) + ea,
                  height: "auto",
                  position: "relative",
                }
              });
              createNode({
                mother: thisTotalTong,
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(caseTongWidth + valueTongWidth) + ea,
                  height: String(tableBlockHeight) + ea,
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid " + colorChip.gray3,
                  borderBottom: "1px solid " + colorChip.gray3,
                  background: i % 2 === 0 ? colorChip.darkDarkShadow : colorChip.darkShadow,
                },
                child: {
                  text: dateToString(result[i].date.from),
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(tableSize) + ea,
                    fontWeight: String(700),
                    color: colorChip.white,
                    top: String(tableTextTop) + ea,
                  }
                }
              });

              caseTong = createNode({
                mother: thisTotalTong,
                style: {
                  display: "inline-flex",
                  width: String(caseTongWidth) + ea,
                  height: "auto",
                  position: "relative",
                  flexDirection: "column",
                }
              });
              num = 0;
              for (let obj of result[i].data.detail) {
                createNode({
                  mother: caseTong,
                  style: {
                    display: "inline-block",
                    width: String(caseTongWidth) + ea,
                    height: String(tableBlockHeight) + ea,
                    position: "relative",
                    textAlign: "center",
                    borderRight: "1px solid " + colorChip.gray3,
                    borderBottom: num !== caseMaxLength - 1 ? "1px solid " + colorChip.gray3 : "",
                    borderLeft: num < pastLength ? "" : "1px solid " + colorChip.gray3,
                    overflow: "hidden",
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      width: String(maxWidth) + ea,
                      marginLeft: withOut(50, (maxWidth / 2), ea),
                      height: withOut(0, ea),
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                    child: {
                      text: obj.case,
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(tableSize) + ea,
                        fontWeight: String(500),
                        color: colorChip.black,
                        top: String(tableTextTop) + ea,
                      }
                    }
                  },
                });
                num++;
              }
              valueTong = createNode({
                mother: thisTotalTong,
                style: {
                  display: "inline-flex",
                  width: String(valueTongWidth) + ea,
                  height: "auto",
                  position: "relative",
                  flexDirection: "column",
                }
              });
              num = 0;
              for (let obj of result[i].data.detail) {
                createNode({
                  mother: valueTong,
                  style: {
                    display: "inline-block",
                    width: String(valueTongWidth) + ea,
                    height: String(tableBlockHeight) + ea,
                    position: "relative",
                    textAlign: "center",
                    borderRight: "1px solid " + colorChip.gray3,
                    borderBottom: num !== caseMaxLength - 1 ? "1px solid " + colorChip.gray3 : "",
                    overflow: "hidden",
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      width: String(maxWidth) + ea,
                      marginLeft: withOut(50, (maxWidth / 2), ea),
                      height: withOut(0, ea),
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                    child: {
                      text: String(obj.value),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(tableSize) + ea,
                        fontWeight: String(500),
                        color: colorChip.black,
                        top: String(tableTextTop) + ea,
                      }
                    }
                  },
                });
                num++;
              }
              pastLength = result[i].data.detail.length;
            }

          }
        }

        whereQuery = {
          "date.from": { $gte: fromDate, $lte: toDate }
        };
        ajaxJson({ mode: "get", whereQuery }, CONTENTSHOST + "/queryAnalytics", { equal: true }).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "query" });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.statisticsWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;
      let innerMarginTop;
      let basePaddingTop;
      let mainTitleSize;
      let maxWidth;
      let timeDelta;
      let titleWhite;
      let propertySize;
      let complexMother;
      let contractBlockMother;
      let detailValueInjection;
      let totalWidth;
      let initPaddingTop;
      let detailTitleBlockHeight;
      let detailTitleBlockMarginTop;
      let complexBoxesLength;
      let visualDivide;
      let visualDivideBlock;
      let visualDivideFinal;
      let detailBlockWidth;
      let detailNormalWidth;
      let detailServiceWidth;
      let detailDoubleBlockWidth;
      let nameBlockWidth;
      let barWidth;
      let contentsLongWidth;
      let detailBlockHeight;
      let detailBlockSize;
      let contractDetailBlockMarginBottom;
      let contractDetailFinalMargin;
      let num;
      let iframBackMarginTop, iframBackMarginLeft;

      toDate = new Date();
      toDate.setDate(toDate.getDate() - 1);
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      mainTitleSize = 21;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 22;

      propertySize = 16;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

      maxWidth = 1000;

      initPaddingTop = 2;

      detailTitleBlockHeight = 32;
      detailTitleBlockMarginTop = 28;

      complexBoxesLength = 1;
      visualDivide = 3;
      visualDivideBlock = 4;
      visualDivideFinal = 1;
      detailBlockWidth = 60;
      detailNormalWidth = 120;
      detailServiceWidth = 162;
      detailDoubleBlockWidth = 220;
      nameBlockWidth = 200;
      barWidth = 38;
      contentsLongWidth = 3000;
      detailBlockHeight = 24;
      detailBlockSize = 14;

      contractDetailBlockMarginBottom = 4;

      contractDetailFinalMargin = 40;

      iframBackMarginTop = 20;
      iframBackMarginLeft = 10;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        timeDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "front",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          child: {
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
              border: "1px solid " + colorChip.gray3,
              borderRadius: String(5) + "px",
              boxSizing: "border-box",
              padding: String(innerMargin) + ea,
              paddingTop: String(innerMarginTop) + ea,
            },
            child: {
              mode: "iframe",
              attribute: {
                src: BACKHOST + "/client?dataonly=true&entire=true&report=client&frommpr=true",
              },
              style: {
                position: "absolute",
                display: "block",
                top: String(-1 * iframBackMarginTop) + ea,
                left: String(-1 * iframBackMarginLeft) + ea,
                width: withOut(-1 * iframBackMarginLeft * 2, ea),
                height: withOut(-1 * iframBackMarginTop * 1, ea),
                border: String(0),
              }
            }
          }
        });

        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "고객 현황",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            whiteReportMaker(startDate, endDate, true);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });
        
        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "statistics" });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.contractWhiteCard = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;
      let innerMarginTop;
      let basePaddingTop;
      let mainTitleSize;
      let maxWidth;
      let timeDelta;
      let titleWhite;
      let propertySize;
      let complexMother;
      let contractBlockMother;
      let detailValueInjection;
      let totalWidth;
      let initPaddingTop;
      let detailTitleBlockHeight;
      let detailTitleBlockMarginTop;
      let complexBoxesLength;
      let visualDivide;
      let visualDivideBlock;
      let visualDivideFinal;
      let detailBlockWidth;
      let detailNormalWidth;
      let detailServiceWidth;
      let detailDoubleBlockWidth;
      let nameBlockWidth;
      let barWidth;
      let contentsLongWidth;
      let detailBlockHeight;
      let detailBlockSize;
      let contractDetailBlockMarginBottom;
      let contractDetailFinalMargin;
      let num;
      let contractMatrix;
      let tempArr;
      let tableBlockHeight;
      let tableSize;
      let tableTextTop;
      let columnsLength;
      let tableTong;

      toDate = new Date();
      toDate.setDate(toDate.getDate() - 1);
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 5;
      mainTitleSize = 21;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 22;

      propertySize = 16;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

      maxWidth = 1000;

      initPaddingTop = 2;

      detailTitleBlockHeight = 32;
      detailTitleBlockMarginTop = 28;

      complexBoxesLength = 1;
      visualDivide = 3;
      visualDivideBlock = 4;
      visualDivideFinal = 1;
      detailBlockWidth = 60;
      detailNormalWidth = 120;
      detailServiceWidth = 162;
      detailDoubleBlockWidth = 220;
      nameBlockWidth = 200;
      barWidth = 38;
      contentsLongWidth = 3000;
      detailBlockHeight = 24;
      detailBlockSize = 14;

      contractDetailBlockMarginBottom = 4;

      contractDetailFinalMargin = 40;

      tableBlockHeight = 30;
      tableSize = 12;
      tableTextTop = isMac() ? -1 : 1;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
        toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 0, 0, 0);
        timeDelta = Math.floor(((((toDate.valueOf() - fromDate.valueOf()) / 1000) / 60) / 60) / 24);

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { if (hasQuery("whitekey")) { removeQuery("whitekey"); } removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0) + ea,
              width: withOut(0, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          attribute: {
            key: "front",
          },
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2) + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(0, ea),
                height: withOut(0, ea),
                overflow: "scroll",
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
                padding: String(innerMargin) + ea,
                paddingTop: String(innerMarginTop) + ea,
              },
              child: {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            }
          ]
        });

        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(margin) + ea,
            width: withOut((margin * 2), ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                text: "계약자 특성",
                style: {
                  display: "inline-block",
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                event: {
                  click: async function (e) {
                    try {
                      const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
                      let startDate, endDate;
        
                      startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
                      if (startDate !== null) {
                        endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                        if (endDate !== null) {
                          if (w0 !== undefined) {
                            w0.remove();
                          }
                          if (w1 !== undefined) {
                            w1.remove();
                          }
                          setQueue(() => {
                            whiteReportMaker(startDate, endDate, true);
                          });
                        }
                      }

                    } catch (e) {
                      console.log(e);
                      window.alert("오류가 발생했습니다! 다시 시도해주세요!");
                      window.location.reload();
                    }
                  }
                },
                text: dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2),
                style: {
                  display: "inline-block",
                  position: "absolute",
                  top: String(titleTextTop) + ea,
                  right: String(0),
                  fontSize: String(mainTitleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.children[0].appendChild(loading);
        scrollBox = whitePrompt.children[0].firstChild;

        dataLoad = (loading) => {
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);

            [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  paddingTop: String(initPaddingTop) + ea,
                },
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginBottom: String(chartBetween) + ea,
                },
              },
            ].forEach((obj) => {
              obj.mother = scrollBox;
              createNode(obj);
            });

            const [ complex ] = result;
            const { contractDetail } = complex;
    
            contractMatrix = [
              [
                "성함",
                "아이디",
                "지역",
                "문의일",
                "계약일",
                "아파트명",
                "준공년차",
                "평수",
                "이사 여부",
                "계약 상태",
                "예산",
                "디자인비",
                "서비스",
                "광고 여부",
                "소스",
              ]
            ];
            for (let contractClient of contractDetail) {
              tempArr = [];
              tempArr.push(contractClient.name);
              tempArr.push(contractClient.cliid);
              tempArr.push(dateToString(contractClient.timeline, true).slice(2, -3));
              tempArr.push(dateToString(contractClient.thisProject.process.contract.first.date, true).slice(2, -3));
              tempArr.push(contractClient.summary.region);
              tempArr.push(contractClient.summary.naverObject === null ? "알 수 없음" : contractClient.summary.naverObject.name);
              tempArr.push(contractClient.summary.howLong);
              tempArr.push(String(contractClient.summary.pyeong) + "평");
              tempArr.push(contractClient.summary.living);
              tempArr.push(contractClient.budget.replace(/ 이상/gi, ""));
              tempArr.push(contractClient.summary.contract);
              tempArr.push(autoComma(contractClient.thisProject.process.contract.remain.calculation.amount.consumer) + '원');
              tempArr.push(serviceParsing(contractClient.thisProject.service).replace(/[a-zA-Z]/gi, '').trim());
              tempArr.push(contractClient.summary.ad.replace(/ 유입/gi, ""));
              tempArr.push(contractClient.summary.source);
              contractMatrix.push(tempArr);
            }

            columnsLength = contractMatrix[0].length;
            
            // 0 - complex report

            complexMother = scrollBox.firstChild
            tableTong = createNode({
              mother: complexMother,
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                border: "1px solid " + colorChip.gray3,
                borderRadius: String(5) + "px",
                boxSizing: "border-box",
                flexDirection: "column",
                overflow: "hidden",
                marginBottom: String(chartBetween) + ea,
              }
            });

            // contracts detail    
            for (let i = 0; i < contractMatrix.length; i++) {
              caseTong = createNode({
                mother: tableTong,
                style: {
                  display: "flex",
                  height: String(tableBlockHeight) + ea,
                  width: withOut(0, ea),
                  position: "relative",
                  flexDirection: "row",
                  borderBottom: i !== contractMatrix.length - 1 ? "1px solid " + colorChip.gray3 : "",
                  background: i === 0 ? colorChip.gray0 : colorChip.white,
                }
              });
              for (let j = 0; j < contractMatrix[i].length; j++) {
                createNode({
                  mother: caseTong,
                  style: {
                    display: "inline-block",
                    width: "calc(100% / " + String(columnsLength) + ")",
                    height: withOut(0, ea),
                    position: "relative",
                    textAlign: "center",
                    borderRight: j !== contractMatrix[i].length - 1 ? "1px solid " + colorChip.gray3 : "",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  },
                  child: {
                    style: {
                      display: "inline-flex",
                      width: String(maxWidth) + ea,
                      marginLeft: withOut(50, (maxWidth / 2), ea),
                      height: withOut(0, ea),
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                    child: {
                      text: String(contractMatrix[i][j]),
                      style: {
                        display: "inline-block",
                        position: "relative",
                        fontSize: String(tableSize) + ea,
                        fontWeight: String(i === 0 ? 700 : 500),
                        color: colorChip.black,
                        top: String(tableTextTop) + ea,
                      }
                    }
                  },
                })
              }
            }
            instance.contractMatrix = contractMatrix;

            // 0 - 12

            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "지역별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.region.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.region.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.region.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "준공년차 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.old.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.old.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.old.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "평형별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.pyeong.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.pyeong.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.pyeong.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "방 개수별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.room.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.room.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.room.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "예산별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.budget.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.budget.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.budget.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "계약 형태별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.contract.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.contract.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.contract.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "소스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.source.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.source.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.source.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "광고 여부 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.ad.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.ad.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.ad.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "디바이스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.device.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.device.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.device.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "거주중별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.living.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.living.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.living.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "층별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.floor.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.floor.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.floor.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "세대 규모별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.household.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.household.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.household.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });

          }
        }

        chartJsPatch([
          { data: { fromDate, toDate }, url: S3HOST + ":3000/complexReport" },
        ]).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

        if (hasQuery("whitekey")) {
          removeQuery("whitekey");
        }
        appendQuery({ whitekey: "contract" });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.mprPannel = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    pannelMenu = [
      {
        title: "기간 설정",
        event: () => {
          return async function (e) {
            try {
              let startDate, endDate;
              let loading;

              startDate = await GeneralJs.promptDate("기간의 시작일을 알려주세요!");
              if (startDate !== null) {
                endDate = await GeneralJs.promptDate("기간의 종료일을 알려주세요!", false, "", startDate);
                if (endDate !== null) {
                  cleanChildren(totalMother);
                  loading = await instance.mother.loadingRun();
                  instance.clients = await ajaxJson({
                    mode: "get",
                    startDate,
                    endDate,
                  }, CONTENTSHOST + "/clientAnalytics", { equal: true });
                  await instance.coreContentsLoad(true);
                  loading.parentNode.removeChild(loading);
                }
              }

            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "계약자만 보기",
        event: () => {
          return async function (e) {
            try {
              const thisTitle = this.querySelector('.' + titleStringClassName).textContent;
              const thisValue = /계약자/gi.test(thisTitle) ? "진행" : "$all";
              const name = "status";
              const index = 0;
              let filterFunc;
              filterFunc = instance.menuEventTong.filterEvent(thisValue, name, index);
              await filterFunc(e);
              if (/계약자/gi.test(thisTitle)) {
                this.querySelector('.' + titleStringClassName).textContent = "전체 보기";
              } else {
                this.querySelector('.' + titleStringClassName).textContent = "계약자만 보기";
              }
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "광고 현황",
        event: () => {
          return async function (e) {
            try {
              const adsFunc = instance.adsWhiteCard();
              await adsFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "프론트 현황",
        event: () => {
          return async function (e) {
            try {
              const frontFunc = instance.frontWhiteCard();
              await frontFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "채널 현황",
        event: () => {
          return async function (e) {
            try {
              const snsFunc = instance.snsWhiteCard();
              await snsFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "검색어 현황",
        event: () => {
          return async function (e) {
            try {
              const queryFunc = instance.queryWhiteCard();
              await queryFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "고객 현황",
        event: () => {
          return async function (e) {
            try {
              const statisticsFunc = instance.statisticsWhiteCard();
              await statisticsFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "계약자 특성",
        event: () => {
          return async function (e) {
            try {
              const contractFunc = instance.contractWhiteCard();
              await contractFunc(e);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
    ];

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "absolute",
        bottom: String(pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            position: "relative",
            top: String(menuTextTop) + ea,
            fontSize: String(menuSize) + ea,
            fontWeight: String(menuWeight),
            color: colorChip.white,
          }
        }
      })
    }

  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.mprWhiteResize = async function () {
  const instance = this;
  const { whiteCardClassName } = this;
  try {
    this.resizeStack = 0;
    this.resizeFrom = 0;
    this.resizePopup = 0;
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        if (Array.from(document.querySelectorAll('.' + whiteCardClassName)).length !== 0) {
          if (Array.from(document.querySelectorAll('.' + whiteCardClassName))[1].getAttribute("key") !== null) {
            window.location.search = "whitekey=" + Array.from(document.querySelectorAll('.' + whiteCardClassName))[1].getAttribute("key");
          } else {
            window.location.reload();
          }
        }
        instance.resizeStack = 0;
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) { reEvent.apply(context, args); };
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.mprSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, totalMother } = this;
  const { ajaxJson, setQueue, cleanChildren } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          let whereQuery, loading, coreWhereQuery, ago;
          if (value === '') {

            cleanChildren(totalMother);
            loading = await instance.mother.loadingRun();
            ago = new Date();
            ago.setMonth(ago.getMonth() - 2);
            instance.clients = await ajaxJson({
              mode: "get",
              standardDate: ago,
            }, CONTENTSHOST + "/clientAnalytics", { equal: true });
            await instance.coreContentsLoad(true);
            loading.parentNode.removeChild(loading);

          } else {

            if (/^c[0-9]+/.test(value)) {
              whereQuery = {
                "client.cliid": { $regex: value }
              };
              coreWhereQuery = {
                "cliid": { $regex: value }
              };
            } else {
              whereQuery = {
                "client.name": { $regex: value }
              };
              coreWhereQuery = {
                "name": { $regex: value }
              };
            }

            cleanChildren(totalMother);
            loading = await instance.mother.loadingRun();
            instance.clients = await ajaxJson({
              mode: "query",
              whereQuery,
              coreWhereQuery,
            }, CONTENTSHOST + "/clientAnalytics", { equal: true });
            await instance.coreContentsLoad(true);
            loading.parentNode.removeChild(loading);

          }
          
          setQueue(async () => {
            try {
              if (instance.clients.length === 1) {
                const tempFunc = instance.clientWhiteCard(instance.clients[0].cliid, instance.clients[0].requestNumber);
                await tempFunc(new Event("click", { bubbles: true }));
              }
            } catch (e) {
              console.log(e);
            }
          }, 350);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.mprExtractEvent = async function () {
  const instance = this;
  const { ajaxJson, blankHref, returnGet, equalJson } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";

    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        const today = new Date();
        const getObj = returnGet();
        let thisName;
        let thisObject;
        let matrix;
        let tempArr;
        let thisClient;
        let cliid, requestNumber;
        let keyArr;
        let data;
  
        if (getObj.whitekey === "ads") {

          matrix = equalJson(JSON.stringify(instance.adsMatrix));

        } else if (getObj.whitekey === "front") {

          matrix = equalJson(JSON.stringify(instance.frontMatrix));

        } else if (getObj.whitekey === "sns") {

          matrix = equalJson(JSON.stringify(instance.snsMatrix));

        } else if (getObj.whitekey === "contract") {

          matrix = equalJson(JSON.stringify(instance.contractMatrix));

        } else if (typeof getObj.whitekey === "string" && /^c/gi.test(getObj.whitekey) && /[0-9]$/gi.test(getObj.whitekey)) {

          matrix = equalJson(JSON.stringify(instance.clientDetailMatrix));

        } else {

          data = await instance.mainDataRender(true);
          matrix = [];
          tempArr = [
            "아이디",
            "이름",
            "연락처",
            "이메일",
          ];
          for (let obj of data.columns) {
            tempArr.push(obj.title);
          }
          matrix.push(tempArr);
          for (let key in data.values) {
    
            keyArr = key.split("_");
            cliid = keyArr.slice(0, -1).join("_");
            requestNumber = Number(keyArr[keyArr.length - 1]);
  
            thisClient = instance.clients.find((d) => { return d.cliid === cliid && d.requestNumber === requestNumber });
    
            tempArr = [];
            tempArr.push(cliid);
            tempArr.push(thisClient.client.name);
            tempArr.push(thisClient.client.phone);
            tempArr.push(thisClient.client.email);
  
            for (let obj of data.columns) {
              thisObject = data.values[key].find((o) => { return o.name === obj.name });
              tempArr.push(thisObject.value);
            }
            matrix.push(tempArr);
          }

        }
        
        instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
        ajaxJson({
          values: matrix,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_mprClients_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
          blankHref(result.link);
        }).catch((err) => {
          console.log(err);
        });

      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

MprJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson, cleanChildren, setQueue } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    const defaultMonth = 1;
    let loading;
    let members;
    let ago;
    let clients;
    let now;
    let execFunc;
    let whereQuery;
    let coreWhereQuery;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.dataonly === "true") {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;
    }

    document.getElementById("grayLeftOpenButton").remove();

    loading = await this.mother.loadingRun();
    ago = new Date();
    ago.setMonth(ago.getMonth() - defaultMonth);
    clients = await ajaxJson({
      mode: "get",
      standardDate: ago,
      initRequest: true,
    }, CONTENTSHOST + "/clientAnalytics", { equal: true });
    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });

    this.members = members;
    this.clients = clients;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.moveTargetClassName = "moveTarget";
    this.moveTargetClassName2 = "moveTarget2";
    this.whiteCardMode = "client";
    this.asyncProcessText = "로드중..";
    this.entireMode = entireMode;
    this.menuEventTong = null;
    this.adsMatrix = [];
    this.frontMatrix = [];
    this.clientDetailMatrix = [];

    await this.mprBase();
    await this.mprSearchEvent();
    await this.mprExtractEvent();
    await this.mprWhiteResize();

    if (getObj.whitekey !== undefined) {
      if (getObj.whitekey === "ads") {
        execFunc = this.adsWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else if (getObj.whitekey === "front") {
        execFunc = this.frontWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else if (getObj.whitekey === "sns") {
        execFunc = this.snsWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else if (getObj.whitekey === "statistics") {
        execFunc = this.statisticsWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else if (getObj.whitekey === "contract") {
        execFunc = this.contractWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else if (getObj.whitekey === "query") {
        execFunc = this.queryWhiteCard();
        await execFunc(new Event("click", { bubbles: true }));
      } else {
        execFunc = this.clientWhiteCard(getObj.whitekey.split("_").slice(0, -1).join("_"), Number(getObj.whitekey.split("_").slice(-1).join("_")));
        await execFunc(new Event("click", { bubbles: true }));
      }
    }

    loading.parentNode.removeChild(loading);

    this.mother.belowButtons.square.reportIcon.addEventListener("click", this.statisticsWhiteCard());

    this.designers = null;
    ajaxJson({ whereQuery: {} }, SECONDHOST + "/getDesigners", { equal: true }).then((rows) => {
      instance.designers = rows;
    }).catch((err) => {
      console.log(err);
    });

    if (getObj.cliid !== undefined) {
      whereQuery = {
        "client.cliid": { $regex: getObj.cliid }
      };
      coreWhereQuery = {
        "cliid": { $regex: getObj.cliid }
      };

      cleanChildren(this.totalMother);
      loading = await instance.mother.loadingRun();
      instance.clients = await ajaxJson({
        mode: "query",
        whereQuery,
        coreWhereQuery,
      }, CONTENTSHOST + "/clientAnalytics", { equal: true });
      await instance.coreContentsLoad(true);
      loading.parentNode.removeChild(loading);

      setQueue(async () => {
        try {
          const tempFunc = instance.clientWhiteCard(instance.clients[0].cliid, instance.clients[0].requestNumber);
          await tempFunc(new Event("click", { bubbles: true }));
        } catch (e) {
          console.log(e);
        }
      }, 100);
    }

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
