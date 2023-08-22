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
      "return ('디자이너 체크리스트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('디자이너 체크리스트 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerAbout",
  "hangul": "디자이너 체크리스트",
  "route": [
    "designerAbout"
  ]
} %/%/g

const DesignerAboutJs = function () {
  this.mother = new GeneralJs();
}

DesignerAboutJs.binaryPath = FRONTHOST + "/middle/console/about";

DesignerAboutJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "체크리스트";
  subTitleContents = "기본 정보와 업무 방식 체크리스트";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignerAboutJs.prototype.sendChecklistLog = async function (obj) {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    const finalData = equalJson(JSON.stringify(obj));
    await ajaxJson({
      desid: instance.designer.desid,
      designer: instance.designer.designer,
      data: finalData,
    }, SECONDHOST + "/designerChecklistLog");
  } catch (e) {
    console.log(e);
  }
}

DesignerAboutJs.prototype.sendSlackAlarm = async function (obj) {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    await instance.sendChecklistLog({
      mode: "checklist",
      data: equalJson(JSON.stringify(obj)),
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerAboutJs.prototype.contentsCenter = function (detailSearchMode = false) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, designer } = this;
  const { entireMode, adminMode } = this;
  const { pageName, firstPageViewTime } = this;
  const { desid } = designer;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, autoHypenPhone, equalJson, variableArray, homeliaisonAnalytics } = GeneralJs;
  let contents;

  contents = [
    {
      title: "기본 정보",
      whiteType: 0,
      admin: false,
      contents: [
        {
          property: "성함",
          admin: false,
          returnValue: (designer) => {
            return designer.designer;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              const text = raw.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\=\&\+]/gi, '').trim();
              let whereQuery, updateQuery;
              whereQuery = { desid };
              updateQuery = {};
              updateQuery["designer"] = text;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "성함",
                    column: "designer",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "성함",
                column: "designer",
                value: text,
                designer: designer.designer,
                pastValue: designer.designer,
                entireMode: entireMode,
              });
              instance.designer.designer = text;

              return text;
            } catch (e) {
              console.log(e);
              return designer.designer;
            }
          },
        },
        {
          property: "아이디",
          admin: false,
          returnValue: (designer) => {
            return designer.desid;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              return designer.desid;
            } catch (e) {
              console.log(e);
              return designer.desid;
            }
          },
        },
        {
          property: "연락처",
          admin: false,
          returnValue: (designer) => {
            return designer.information.phone;
          },
          renderValue: (text) => {
            return text;
          },
          filterValue: (text) => {
            return autoHypenPhone(text);
          },
          updateValue: async (raw, designer) => {
            try {
              window.alert("핸드폰 번호 변경시, 관리자에게 직접 문의해주세요!")
              return designer.information.phone;
            } catch (e) {
              console.log(e);
              return designer.information.phone;
            }
          },
        },
        {
          property: "생일",
          admin: false,
          returnValue: (designer) => {
            return `${String(designer.information.birth.getFullYear())}년 ${String(designer.information.birth.getMonth() + 1)}월 ${String(designer.information.birth.getDate())}일`;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              let birthDate;
              let year, month, date;
              let newDate;
              let whereQuery, updateQuery;
              
              try {
                birthDate = stringToDate(raw);
                year = birthDate.getFullYear();
                month = birthDate.getMonth() + 1;
                date = birthDate.getDate();  
              } catch (e) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }

              if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(date)) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }
              if (year < 1000) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }

              whereQuery = { desid };
              updateQuery = {};
              updateQuery["information.birth"] = new Date(year, month - 1, date);
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "생일",
                    column: "information.birth",
                    value: new Date(year, month - 1, date),
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "생일",
                column: "information.birth",
                value: new Date(year, month - 1, date),
                designer: designer.designer,
                pastValue: designer.information.birth,
                entireMode: entireMode,
              });
              instance.designer.information.birth = updateQuery["information.birth"];

              return `${String(year)}년 ${String(month)}월 ${String(date)}일`;
            } catch (e) {
              window.alert(e.message);
              return `${String(designer.information.birth.getFullYear())}년 ${String(designer.information.birth.getMonth() + 1)}월 ${String(designer.information.birth.getDate())}일`;
            }
          },
        },
        {
          property: "이메일",
          admin: false,
          returnValue: (designer) => {
            return designer.information.email;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              const text = raw.replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\=\&\+]/gi, '').trim();
              let whereQuery, updateQuery;
              whereQuery = { desid };
              updateQuery = {};
              updateQuery["information.email"] = text;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "이메일",
                    column: "information.email",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "이메일",
                column: "information.email",
                value: text,
                designer: designer.designer,
                pastValue: designer.information.email,
                entireMode: entireMode,
              });
              instance.designer.information.email = text;

              return text;
            } catch (e) {
              console.log(e);
              return designer.information.email;
            }
          },
        },
        {
          property: "웹페이지",
          admin: false,
          returnValue: (designer) => {
            return designer.information.personalSystem.webPage.length === 0 ? "없음" : designer.information.personalSystem.webPage[0];
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            const pastWebpage = equalJson(JSON.stringify(instance.designer.information.personalSystem.webPage));
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};
              updateQuery["information.personalSystem.webPage"] = [];

              text = raw.split('?')[0].trim();
              if (text === '' || text === "없음") {
                text = "없음";
                updateQuery["information.personalSystem.webPage"] = [];
                instance.designer.information.personalSystem.webPage = [];
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              } else {
                if (/^http/.test(text)) {
                  updateQuery["information.personalSystem.webPage"] = [ text ];
                  instance.designer.information.personalSystem.webPage = [ text ];
                  await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
                } else {
                  window.alert("전체 링크를 적어주세요! (http로 시작하는 전체 링크)");
                  text = designer.information.personalSystem.webPage.length === 0 ? "없음" : designer.information.personalSystem.webPage[0];
                }
              }

              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "웹페이지",
                    column: "information.personalSystem.webPage",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "웹페이지",
                column: "information.personalSystem.webPage",
                value: updateQuery["information.personalSystem.webPage"],
                designer: designer.designer,
                pastValue: pastWebpage,
                entireMode: entireMode,
              });

              return text;
            } catch (e) {
              console.log(e);
              return (pastWebpage.length === 0) ? "없음" : pastWebpage[0];
            }
          },
          noticeText: (designer) => {
            return "http로 시작하는 전체 링크를 작성해주세요!";
          },
        },
        {
          property: "인스타그램",
          admin: false,
          returnValue: (designer) => {
            const target = designer.information.personalSystem.sns.find((obj) => { return /Insta/gi.test(obj.kind) });
            if (target === undefined) {
              return "없음";
            } else {
              return target.href;
            }
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            const pastSns = equalJson(JSON.stringify(instance.designer.information.personalSystem.sns));
            try {
              let text, whereQuery, updateQuery;
              let target;
              let arr;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.split('?')[0].trim();

              arr = [];
              for (let obj of designer.information.personalSystem.sns) {
                if (!/Insta/gi.test(obj.kind)) {
                  arr.push(obj);
                }
              }

              if (text === '' || text === "없음") {
                text = "없음";
                updateQuery["information.personalSystem.sns"] = arr;
                instance.designer.information.personalSystem.sns = arr;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

              } else {
                if (/^http/.test(text)) {
                  arr.push({
                    kind: "Instagram",
                    href: text
                  });
                  updateQuery["information.personalSystem.sns"] = arr;
                  instance.designer.information.personalSystem.sns = arr;
                  await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

                } else {
                  window.alert("전체 링크를 적어주세요! (http로 시작하는 전체 링크)");
                  target = designer.information.personalSystem.sns.find((obj) => { return /Insta/gi.test(obj.kind) });
                  if (target === undefined) {
                    text = "없음";
                  } else {
                    text = target.href;
                  }
                }
              }

              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "인스타그램",
                    column: "information.personalSystem.sns",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "인스타그램",
                column: "information.personalSystem.sns",
                value: arr,
                designer: designer.designer,
                pastValue: pastSns,
                entireMode: entireMode,
              });

              return text;
            } catch (e) {
              console.log(e);
              const target = pastSns.find((obj) => { return /Insta/gi.test(obj.kind) });
              if (target === undefined) {
                return "없음";
              } else {
                return target.href;
              }
            }
          },
          noticeText: (designer) => {
            return "http로 시작하는 전체 링크를 작성해주세요!";
          },
        },
        {
          property: "블로그",
          admin: false,
          returnValue: (designer) => {
            const target = designer.information.personalSystem.sns.find((obj) => { return /Naver/gi.test(obj.kind) });
            if (target === undefined) {
              return "없음";
            } else {
              return target.href;
            }
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            const pastSns = equalJson(JSON.stringify(instance.designer.information.personalSystem.sns));
            try {
              let text, whereQuery, updateQuery;
              let target;
              let arr;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.split('?')[0].trim();

              arr = [];
              for (let obj of designer.information.personalSystem.sns) {
                if (!/Naver/gi.test(obj.kind)) {
                  arr.push(obj);
                }
              }

              if (text === '' || text === "없음") {
                text = "없음";
                updateQuery["information.personalSystem.sns"] = arr;
                instance.designer.information.personalSystem.sns = arr;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

              } else {
                if (/^http/.test(text)) {
                  arr.push({
                    kind: "Naver",
                    href: text
                  });
                  updateQuery["information.personalSystem.sns"] = arr;
                  instance.designer.information.personalSystem.sns = arr;
                  await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

                } else {
                  window.alert("전체 링크를 적어주세요! (http로 시작하는 전체 링크)");
                  target = designer.information.personalSystem.sns.find((obj) => { return /Naver/gi.test(obj.kind) });
                  if (target === undefined) {
                    text = "없음";
                  } else {
                    text = target.href;
                  }
                }
              }

              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "블로그",
                    column: "information.personalSystem.sns",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "블로그",
                column: "information.personalSystem.sns",
                value: arr,
                designer: designer.designer,
                pastValue: pastSns,
                entireMode: entireMode,
              });

              return text;
            } catch (e) {
              console.log(e);
              const target = pastSns.find((obj) => { return /Naver/gi.test(obj.kind) });
              if (target === undefined) {
                return "없음";
              } else {
                return target.href;
              }
            }
          },
          noticeText: (designer) => {
            return "http로 시작하는 전체 링크를 작성해주세요!";
          },
        },
      ],
      notice: [
        {
          title: "링크 입력",
          body: "링크는 http로 시작하는 전체 링크를 작성해주세요!",
        },
      ],
    },
    {
      title: "업무 정보",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "계약 상태",
          admin: true,
          returnValue: (designer) => { return [
            "협약 완료",
            "협약 휴직",
            "협약 해지",
            "신청 대기",
          ] },
          selectValue: (designer) => {
            let contents, value;
            contents = [
              "협약 완료",
              "협약 휴직",
              "협약 해지",
              "신청 대기",
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.information.contract.status) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return [ value.findIndex((n) => { return n === 1 }) ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.information.contract.status;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];
              if (typeof text !== "string") {
                text = columns[3];
              }

              instance.designer.information.contract.status = text;
              updateQuery["information.contract.status"] = text;
              
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "업무 정보",
                    column: "information.contract.status",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "업무 정보",
                column: "information.contract.status",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "상태",
          admin: false,
          returnValue: (designer) => { return [
            "신규",
            "일반",
            "메인",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.grade + 1 ];
          },
          multiple: false,
          divideNumber: (<&& 4 | 4 | 4 | 4 | 3 &&>),
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.grade;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];
              if (typeof text !== "string") {
                text = columns[1];
              }

              if (entireMode || adminMode) {

                instance.designer.analytics.grade = columns.findIndex((str) => { return str === text }) - 1;
                updateQuery["analytics.grade"] = columns.findIndex((str) => { return str === text }) - 1;
                
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: pageName,
                    standard: firstPageViewTime,
                    action: "designerAboutUpdate",
                    data: {
                      desid: desid,
                      date: new Date(),
                      type: "selection",
                      property: "상태",
                      column: "analytics.grade",
                      value: columns.findIndex((str) => { return str === text }) - 1,
                    }
                  });
                }
                await instance.sendSlackAlarm({
                  desid: desid,
                  date: new Date(),
                  type: "selection",
                  property: "상태",
                  column: "analytics.grade",
                  value: columns.findIndex((str) => { return str === text }) - 1,
                  designer: designer.designer,
                  pastValue: pastValue,
                  entireMode: entireMode,
                });

              } else {

                await ajaxJson({ message: designer.designer + " 실장님이 콘솔을 통해 상태 변경을 시도하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
                window.alert("상태 변경시, 홈리에종에 직접 문의해주세요!");
                window.location.reload();

              }

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "홈리에종과의 협업 기간, 프로젝트 개수, 매칭율에 따라 정해진 디자이너 분류 체계입니다. 변경을 희망하신다면 홈리에종에 직접 문의를 남겨주세요!";
          },
        },
        {
          property: "경력 상세",
          admin: false,
          returnValue: (designer) => {
            const careerData = designer.information.business.career.detail;
            careerData.sort((a, b) => {
              return b.date.start.valueOf() - a.date.start.valueOf();
            });
            const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
            const titleArr = [
              "회사",
              "담당 업무",
              "기간",
              "태그",
            ];
            const endMatrix = careerData.map((obj) => {
              const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
              const startDate = obj.date.start;
              const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
              const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
              const delta = endDate.valueOf() - startDate.valueOf();
              const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
              const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
              return {
                title: titleArr,
                value: [
                  obj.company + pipe + obj.team,
                  obj.role,
                  rangeWords,
                  obj.tag,
                ]
              };
            });
            return endMatrix;
          },
          renderValue: (text) => {
            const inputArr = [
              { name: "회사", type: "string" },
              { name: "부서", type: "string" },
              { name: "담당 업무", type: "string" },
              { name: "업무 태그", type: "button", buttons: [
                "리모델링",
                "건축 설계",
                "홈스타일링",
                "전시",
                "디스플레이",
                "모델하우스",
                "가구",
                "패브릭",
                "조명",
                "기타 디자인",
                "기타 업무",
              ] },
              { name: "시작일", type: "date", progressBoo: false, progressName: "" },
              { name: "종료일", type: "date", progressBoo: true, progressName: "재직중" },
            ];
            return inputArr;
          },
          updateValue: async (raw, designer) => {
            try {
              const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
              const titleArr = [
                "회사",
                "담당 업무",
                "기간",
                "태그",
              ];
              const careerData = equalJson(JSON.stringify(designer.information.business.career.detail));
              careerData.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              const pastValue = equalJson(JSON.stringify(designer.information.business.career.detail));
              pastValue.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              let newData, whereQuery, updateQuery, endMatrix;
              let newValue;
              let company;
              let team;
              let role;
              let start;
              let end;
              let tag;

              if (raw.mode === "delete") {
                newData = [];
                for (let i = 0; i < careerData.length; i++) {
                  if (i !== raw.index) {
                    newData.push(careerData[i]);
                  }
                }
  
                instance.designer.information.business.career.detail = newData;
                endMatrix = newData.map((obj) => {
                  const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
                  const startDate = obj.date.start;
                  const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
                  const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
                  const delta = endDate.valueOf() - startDate.valueOf();
                  const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                  const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                  return {
                    title: titleArr,
                    value: [
                      obj.company + pipe + obj.team,
                      obj.role,
                      rangeWords,
                      obj.tag,
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.detail"] = newData;
                instance.designer.information.business.career.detail = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: pageName,
                    standard: firstPageViewTime,
                    action: "designerAboutUpdate",
                    data: {
                      desid: desid,
                      date: new Date(),
                      type: "block",
                      property: "경력 상세",
                      column: "information.business.career.detail",
                      value: newData,
                    }
                  });
                }
                await instance.sendSlackAlarm({
                  desid: desid,
                  date: new Date(),
                  type: "block",
                  property: "경력 상세",
                  column: "information.business.career.detail",
                  value: newData,
                  designer: designer.designer,
                  pastValue: pastValue,
                  entireMode: entireMode,
                });

              } else if (raw.mode === "update") {
                newData = [];
                for (let i = 0; i < careerData.length; i++) {
                  if (i !== raw.index) {
                    newData.push(careerData[i]);
                  }
                }

                company = raw.value[0][1];
                team = raw.value[1][1];
                role = raw.value[2][1];
                tag = raw.value[3][1];
                start = raw.value[4][1];
                end = raw.value[5][1];

                newValue = {
                  company,
                  team,
                  role,
                  tag,
                  date: { start, end }
                };

                newData.push(newValue);
                newData.sort((a, b) => {
                  return b.date.start.valueOf() - a.date.start.valueOf();
                });

                instance.designer.information.business.career.detail = newData;
                endMatrix = newData.map((obj) => {
                  const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
                  const startDate = obj.date.start;
                  const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
                  const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
                  const delta = endDate.valueOf() - startDate.valueOf();
                  const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                  const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                  return {
                    title: titleArr,
                    value: [
                      obj.company + pipe + obj.team,
                      obj.role,
                      rangeWords,
                      obj.tag,
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.detail"] = newData;
                instance.designer.information.business.career.detail = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: pageName,
                    standard: firstPageViewTime,
                    action: "designerAboutUpdate",
                    data: {
                      desid: desid,
                      date: new Date(),
                      type: "block",
                      property: "경력 상세",
                      column: "information.business.career.detail",
                      value: newData,
                    }
                  });
                }
                await instance.sendSlackAlarm({
                  desid: desid,
                  date: new Date(),
                  type: "block",
                  property: "경력 상세",
                  column: "information.business.career.detail",
                  value: newData,
                  designer: designer.designer,
                  pastValue: pastValue,
                  entireMode: entireMode,
                });
              }

            } catch (e) {
              console.log(e);
            }
          },
          plusValue: async (matrix, designer, tong) => {
            try {
              const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
              const titleArr = [
                "회사",
                "담당 업무",
                "기간",
                "태그",
              ];
              const pastValue = equalJson(JSON.stringify(designer.information.business.career.detail));
              pastValue.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              let company, team, role, start, end;
              let tag;
              let block;
              let original;
              let whereQuery, updateQuery;
              let endMatrix;

              company = matrix[0][1];
              team = matrix[1][1];
              role = matrix[2][1];
              tag = matrix[3][1];
              start = matrix[4][1];
              end = matrix[5][1];

              block = {
                company,
                team,
                role,
                tag,
                date: { start, end }
              };

              original = equalJson(JSON.stringify(designer.information.business.career.detail));
              original.push(block);
              original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

              instance.designer.information.business.career.detail = original;
              endMatrix = original.map((obj) => {
                const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
                const startDate = obj.date.start;
                const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
                const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
                const delta = endDate.valueOf() - startDate.valueOf();
                const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                return {
                  title: titleArr,
                  value: [
                    obj.company + pipe + obj.team,
                    obj.role,
                    rangeWords,
                    obj.tag,
                  ]
                };
              });
              instance.careerBlocksRender(endMatrix, tong);

              whereQuery = { desid: designer.desid };
              updateQuery = {};
              updateQuery["information.business.career.detail"] = original;
              instance.designer.information.business.career.detail = original;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "block",
                    property: "경력 상세",
                    column: "information.business.career.detail",
                    value: original,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "block",
                property: "경력 상세",
                column: "information.business.career.detail",
                value: original,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "학력 상세",
          admin: false,
          returnValue: (designer) => {
            const schoolData = designer.information.business.career.school;
            schoolData.sort((a, b) => {
              return b.date.start.valueOf() - a.date.start.valueOf();
            });
            const titleArr = [
              "학교",
              "전공",
              "졸업",
            ];
            const endMatrix = schoolData.map((obj) => {
              return {
                title: titleArr,
                value: [
                  obj.school,
                  obj.major,
                  ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
                ]
              };
            });
            return endMatrix;
          },
          renderValue: (text) => {
            const inputArr = [
              { name: "학교", type: "string" },
              { name: "전공", type: "string" },
              { name: "입학일", type: "date", progressBoo: false, progressName: "" },
              { name: "졸업일", type: "date", progressBoo: true, progressName: "재학중" },
            ];
            return inputArr;
          },
          updateValue: async (raw, designer) => {
            try {
              const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
              const titleArr = [
                "학교",
                "전공",
                "졸업",
              ];
              const schoolData = equalJson(JSON.stringify(designer.information.business.career.school));
              schoolData.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              const pastValue = equalJson(JSON.stringify(designer.information.business.career.school));
              pastValue.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              let newData, whereQuery, updateQuery, endMatrix;
              let newValue;
              let school;
              let major;
              let start;
              let end;

              if (raw.mode === "delete") {
                newData = [];
                for (let i = 0; i < schoolData.length; i++) {
                  if (i !== raw.index) {
                    newData.push(schoolData[i]);
                  }
                }
  
                instance.designer.information.business.career.school = newData;
                endMatrix = newData.map((obj) => {
                  return {
                    title: titleArr,
                    value: [
                      obj.school,
                      obj.major,
                      ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.school"] = newData;
                instance.designer.information.business.career.school = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: pageName,
                    standard: firstPageViewTime,
                    action: "designerAboutUpdate",
                    data: {
                      desid: desid,
                      date: new Date(),
                      type: "block",
                      property: "학력 상세",
                      column: "information.business.career.school",
                      value: newData,
                    }
                  });
                }
                await instance.sendSlackAlarm({
                  desid: desid,
                  date: new Date(),
                  type: "block",
                  property: "학력 상세",
                  column: "information.business.career.school",
                  value: newData,
                  designer: designer.designer,
                  pastValue: pastValue,
                  entireMode: entireMode,
                });
              } else if (raw.mode === "update") {
                newData = [];
                for (let i = 0; i < schoolData.length; i++) {
                  if (i !== raw.index) {
                    newData.push(schoolData[i]);
                  }
                }
  
                school = raw.value[0][1];
                major = raw.value[1][1];
                start = raw.value[2][1];
                end = raw.value[3][1];

                newValue = {
                  school,
                  major,
                  date: { start, end }
                };

                newData.push(newValue);
                newData.sort((a, b) => {
                  return b.date.start.valueOf() - a.date.start.valueOf();
                });

                instance.designer.information.business.career.school = newData;
                endMatrix = newData.map((obj) => {
                  return {
                    title: titleArr,
                    value: [
                      obj.school,
                      obj.major,
                      ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.school"] = newData;
                instance.designer.information.business.career.school = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: pageName,
                    standard: firstPageViewTime,
                    action: "designerAboutUpdate",
                    data: {
                      desid: desid,
                      date: new Date(),
                      type: "block",
                      property: "학력 상세",
                      column: "information.business.career.school",
                      value: newData,
                    }
                  });
                }
                await instance.sendSlackAlarm({
                  desid: desid,
                  date: new Date(),
                  type: "block",
                  property: "학력 상세",
                  column: "information.business.career.school",
                  value: newData,
                  designer: designer.designer,
                  pastValue: pastValue,
                  entireMode: entireMode,
                });
              }

            } catch (e) {
              console.log(e);
            }
          },
          plusValue: async (matrix, designer, tong) => {
            try {
              const titleArr = [
                "학교",
                "전공",
                "졸업",
              ];
              const pastValue = equalJson(JSON.stringify(designer.information.business.career.school));
              pastValue.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              let school, major, start, end;
              let block;
              let original;
              let whereQuery, updateQuery;
              let endMatrix;

              school = matrix[0][1];
              major = matrix[1][1];
              start = matrix[2][1];
              end = matrix[3][1];

              block = {
                school,
                major,
                date: { start, end }
              };

              original = equalJson(JSON.stringify(designer.information.business.career.school));
              original.push(block);
              original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

              instance.designer.information.business.career.school = original;
              endMatrix = original.map((obj) => {
                return {
                  title: titleArr,
                  value: [
                    obj.school,
                    obj.major,
                    ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
                  ]
                };
              });
              instance.careerBlocksRender(endMatrix, tong);

              whereQuery = { desid: designer.desid };
              updateQuery = {};
              updateQuery["information.business.career.school"] = original;
              instance.designer.information.business.career.school = original;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "block",
                    property: "학력 상세",
                    column: "information.business.career.school",
                    value: original,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "block",
                property: "학력 상세",
                column: "information.business.career.school",
                value: original,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });
            } catch (e) {
              console.log(e);
            }
          }
        },
        // {
        //   property: "유관 경력",
        //   admin: false,
        //   returnValue: (designer) => {
        //     return `총 ${String(designer.information.business.career.relatedY)}년 ${String(designer.information.business.career.relatedM)}개월`;
        //   },
        //   renderValue: (text) => {
        //     return text.replace(/^총 /gi, '').trim();
        //   },
        //   updateValue: async (raw, designer) => {
        //     try {
        //       let text, whereQuery, updateQuery;
        //       let arr;

        //       whereQuery = { desid };
        //       updateQuery = {};

        //       arr = raw.trim().split("년");
        //       if (arr.length !== 2) {
        //         throw new Error("invalid text");
        //       }

        //       arr = arr.map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
        //       if (arr.some(Number.isNaN)) {
        //         throw new Error("invalid text");
        //       }

        //       if (arr[1] >= 12) {
        //         throw new Error("invalid text");
        //       }

        //       if (arr[0] < 0 || arr[1] < 0) {
        //         throw new Error("invalid text");
        //       }

        //       updateQuery["information.business.career.relatedY"] = arr[0];
        //       updateQuery["information.business.career.relatedM"] = arr[1];

        //       instance.designer.information.business.career.relatedY = arr[0];
        //       instance.designer.information.business.career.relatedM = arr[1];

        //       await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
        //       if (!entireMode) {
        //         await homeliaisonAnalytics({
        //           page: pageName,
        //           standard: firstPageViewTime,
        //           action: "designerAboutUpdate",
        //           data: {
        //             desid: desid,
        //             date: new Date(),
        //             type: "text",
        //             property: "유관 경력",
        //             column: "information.business.career",
        //             value: `총 ${String(arr[0])}년 ${String(arr[1])}개월`,
        //           }
        //         });
        //       }

        //       return `총 ${String(arr[0])}년 ${String(arr[1])}개월`;

        //     } catch (e) {
        //       window.alert("형식에 맞게 적어주세요! '00년 00개월'");
        //       return `총 ${String(designer.information.business.career.relatedY)}년 ${String(designer.information.business.career.relatedM)}개월`;
        //     }
        //   },
        //   noticeText: (designer) => {
        //     return "홈스타일링과 관련이 있는 리모델링(시공) 회사 경험을 총합하여 적어주세요!";
        //   },
        // },
        {
          property: "계좌번호",
          admin: false,
          returnValue: (designer) => {
            const targetArr = designer.information.business.account.filter((obj) => { return obj.accountNumber !== '' });
            if (targetArr.length === 0) {
              return "없음";
            } else {
              return targetArr[0].bankName + " " + targetArr[0].accountNumber;
            }
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              const pastValue = equalJson(JSON.stringify(instance.designer.information.business.account));
              let text, whereQuery, updateQuery;
              let arr;
              let obj;

              whereQuery = { desid };
              updateQuery = {};

              for (let i = 0; i < 3; i++) {
                raw = raw.replace(/  /gi, ' ').replace(/   /gi, ' ').trim();
              }

              arr = raw.split(' ');
              if (arr.length !== 2) {
                throw new Error("invalid text");
              }

              arr = arr.map((str) => { return str.trim() });
              if (arr.some((str) => { return str === '' })) {
                throw new Error("invalid text");
              }

              obj = {
                bankName: arr[0].replace(/은행/gi, ''),
                accountNumber: arr[1],
                to: designer.designer
              };

              instance.designer.information.business.account = [ obj ];
              updateQuery["information.business.account"] = [ obj ];

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "계좌번호",
                    column: "information.business.account",
                    value: obj.bankName + " " + obj.accountNumber,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "계좌번호",
                column: "information.business.account",
                value: updateQuery["information.business.account"],
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return obj.bankName + " " + obj.accountNumber;

            } catch (e) {
              window.alert("형식에 맞게 적어주세요! '은행이름 계좌번호'");
              const targetArr = designer.information.business.account.filter((obj) => { return obj.accountNumber !== '' });
              if (targetArr.length === 0) {
                return "없음";
              } else {
                return targetArr[0].bankName + " " + targetArr[0].accountNumber;
              }
            }
          },
        },
        {
          property: desktop ? "사업자 등록번호" : "사업자 번호",
          admin: false,
          returnValue: (designer) => {
            return designer.information.business.businessInfo.businessNumber === "" ? "-" : designer.information.business.businessInfo.businessNumber;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              const pastValue = instance.designer.information.business.businessInfo.businessNumber;
              let text, whereQuery, updateQuery;
              let arr;
              let obj;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\-]/g, '');

              instance.designer.information.business.businessInfo.businessNumber = (text === "-" ? "" : text);
              updateQuery["information.business.businessInfo.businessNumber"] = (text === "-" ? "" : text);

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "사업자 등록번호",
                    column: "information.business.businessInfo.businessNumber",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "사업자 등록번호",
                column: "information.business.businessInfo.businessNumber",
                value: updateQuery["information.business.businessInfo.businessNumber"],
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return text;

            } catch (e) {
              console.log(e);
              return designer.information.business.businessInfo.businessNumber;
            }
          },
          noticeText: (designer) => {
            return "프리랜서의 경우, 빈칸으로 남겨주세요!";
          },
        },
        {
          property: "주민등록번호",
          admin: false,
          returnValue: (designer) => {
            return designer.information.residentNunber === "" ? "-" : designer.information.residentNunbe;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              const pastValue = instance.designer.information.residentNunber;
              let text, whereQuery, updateQuery;
              let arr;
              let obj;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\-]/g, '');

              instance.designer.information.residentNunber = (text === "-" ? "" : text);
              updateQuery["information.residentNunber"] = (text === "-" ? "" : text);

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "주민등록번호",
                    column: "information.residentNunber",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "주민등록번호",
                column: "information.residentNunber",
                value: updateQuery["information.residentNunber"],
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return text;

            } catch (e) {
              console.log(e);
              return designer.information.residentNunber;
            }
          },
          noticeText: (designer) => {
            return "프리랜서의 경우, 필수로 입력해주세요!";
          },
        },
        {
          property: "사업자 종류",
          admin: false,
          returnValue: (designer) => {
            return [ "프리랜서", "개인사업자(간이)", "개인사업자(일반)", "법인사업자(간이)", "법인사업자(일반)" ];
          },
          selectValue: (designer) => {
            let contents, value;
            contents = [ "프리랜서", "개인사업자(간이)", "개인사업자(일반)", "법인사업자(간이)", "법인사업자(일반)" ];
            value = [];
            for (let i of contents) {
              if (i === designer.information.business.businessInfo.classification) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return [ value.findIndex((n) => { return n === 1 }) ];
          },
          multiple: false,
          divideNumber: (<&& 4 | 4 | 4 | 3 | 1 &&>),
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.information.business.businessInfo.classification;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.information.business.businessInfo.classification = text;
              updateQuery["information.business.businessInfo.classification"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "사업자 종류",
                    column: "information.business.businessInfo.classification",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "사업자 종류",
                column: "information.business.businessInfo.classification",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "수수료",
          admin: true,
          returnValue: (designer) => {
            const dateToString = (date) => { return String(date.getFullYear()).slice(2) + '.' + String(date.getMonth() + 1) + '.' + String(date.getDate()); }
            const history = designer.information.business.service.cost.percentageHistory;
            const token = "&nbsp;/&nbsp;";
            let str;
            let tempArr, tempArr2;
            str = String(designer.information.business.service.cost.percentage) + " (현재)";
            for (let { date: { start, end }, percentage } of history) {
              str += token;
              str += String(percentage);
              str += " (";
              str += dateToString(start);
              str += "-";
              str += dateToString(end);
              str += ")";
            }
            if (/\//g.test(str)) {
              if (str.split("/").length > 5) {
                tempArr = str.split("/");
                tempArr2 = [];
                for (let i = 0; i < 5; i++) {
                  tempArr2.push(tempArr[i].trim());
                }
                str = tempArr2.join(token);
              }
            }
            return str;
          },
          renderValue: (text) => {
            const currentFee = Number(text.split("(현재)")[0].trim());
            return String(currentFee);
          },
          updateValue: async (raw, designer) => {
            const dateToString = (date) => { return String(date.getFullYear()).slice(2) + '.' + String(date.getMonth() + 1) + '.' + String(date.getDate()); }
            const token = "&nbsp;/&nbsp;";
            let whereQuery, updateQuery;
            let tempArr, tempArr2;
            let past, history, contractDate, startDate, endDate;
            let str;
            let newFee;

            whereQuery = { desid: designer.desid };
            updateQuery = {};

            past = designer.information.business.service.cost.percentage;
            history = designer.information.business.service.cost.percentageHistory;
            contractDate = designer.information.contract.date;

            try {
              newFee = Number(raw.replace(/[^0-9]/gi, ''));
              if (Number.isNaN(newFee)) {
                throw new Error("invalid input");
              }

              endDate = new Date();
              if (history.length === 0) {
                startDate = contractDate;
              } else {
                startDate = history[0].date.end;
              }
              history.unshift({ date: { start: startDate, end: endDate }, percentage: past });
              updateQuery["information.business.service.cost.percentage"] = newFee;
              updateQuery["information.business.service.cost.percentageHistory"] = history;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "수수료",
                    column: "information.business.service.cost.percentage",
                    value: newFee,
                  }
                });
              }

              str = String(newFee) + " (현재)";
              for (let { date: { start, end }, percentage } of history) {
                str += token;
                str += String(percentage);
                str += " (";
                str += dateToString(start);
                str += "-";
                str += dateToString(end);
                str += ")";
              }

              if (/\//g.test(str)) {
                if (str.split("/").length > 5) {
                  tempArr = str.split("/");
                  tempArr2 = [];
                  for (let i = 0; i < 5; i++) {
                    tempArr2.push(tempArr[i].trim());
                  }
                  str = tempArr2.join(token);
                }
              }

              return str;
            } catch (e) {
              console.log(e);
              str = String(designer.information.business.service.cost.percentage) + " (현재)";
              for (let { date: { start, end }, percentage } of history) {
                str += token;
                str += String(percentage);
                str += " (";
                str += dateToString(start);
                str += "-";
                str += dateToString(end);
                str += ")";
              }
              if (/\//g.test(str)) {
                if (str.split("/").length > 5) {
                  tempArr = str.split("/");
                  tempArr2 = [];
                  for (let i = 0; i < 5; i++) {
                    tempArr2.push(tempArr[i].trim());
                  }
                  str = tempArr2.join(token);
                }
              }
              return str;
            }
          },
        },
      ],
      notice: [
        {
          title: "사업자 등록번호",
          body: "프리랜서의 경우, 빈칸으로 남겨주세요!",
        },
        {
          title: "주민등록번호",
          body: "프리랜서의 경우, 정산을 위해 필수적으로 작성해주세요!",
        },
      ],
    },
    {
      title: "공간 범위",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "주소",
          admin: false,
          returnValue: (designer) => {
            return designer.information.address.length === 0 ? "없음" : designer.information.address[0];
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            const pastValue = equalJson(JSON.stringify(instance.designer.information.address));
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              for (let i = 0; i < 3; i++) {
                raw = raw.replace(/  /gi, ' ').replace(/   /gi, ' ').trim();
              }
              text = raw;

              if (text === '') {
                throw new Error("invalid text");
              }

              if (/^없/gi.test(text)) {
                throw new Error("invalid text");
              }

              if (!/^[가-힣]/gi.test(text)) {
                throw new Error("invalid text");
              }

              updateQuery["information.address"] = [ text ];
              instance.designer.information.address = [ text ];

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "주소",
                    column: "information.address",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "주소",
                column: "information.address",
                value: [ text ],
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return text;

            } catch (e) {
              window.alert("올바른 형식의 주소를 적어주세요!");
              return designer.information.address.length === 0 ? "없음" : designer.information.address[0];
            }
          },
        },
        {
          property: "유효 범위",
          admin: false,
          returnValue: (designer) => {
            return String(designer.analytics.region.range) + "km";
          },
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
          updateValue: async (raw, designer) => {
            const pastValue = instance.designer.analytics.region.range;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\.]/gi, '');
              if (text === '') {
                throw new Error("invalid text");
              }

              text = Number(text);
              if (Number.isNaN(text)) {
                throw new Error("invalid text");
              }

              updateQuery["analytics.region.range"] = text;
              instance.designer.analytics.region.range = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "유효 범위",
                    column: "analytics.region.range",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "유효 범위",
                column: "analytics.region.range",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return String(text) + "km";

            } catch (e) {
              window.alert("숫자로만 적어주세요!");
              return String(designer.analytics.region.range) + "km";
            }
          },
          noticeText: (designer) => {
            return "출장비를 받지 않고 기본적으로 가줄 수 있는 거리의 최대값입니다. 최소 25km, 최대 40km 내에서 작성해주세요!";
          },
          visualNotice: (designer) => {
            return "(25km ~ 45km 이내)"
          },
        },
        {
          property: "한계 범위",
          admin: false,
          returnValue: (designer) => {
            return String(designer.analytics.region.expenses) + "km";
          },
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
          updateValue: async (raw, designer) => {
            const pastValue = instance.designer.analytics.region.expenses;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\.]/gi, '');
              if (text === '') {
                throw new Error("invalid text");
              }

              text = Number(text);
              if (Number.isNaN(text)) {
                throw new Error("invalid text");
              }

              updateQuery["analytics.region.expenses"] = text;
              instance.designer.analytics.region.expenses = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "한계 범위",
                    column: "analytics.region.expenses",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "한계 범위",
                column: "analytics.region.expenses",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return String(text) + "km";

            } catch (e) {
              window.alert("숫자로만 적어주세요!");
              return String(designer.analytics.region.expenses) + "km";
            }
          },
          noticeText: (designer) => {
            return "출장비를 받고 갈 수 있는 거리의 최대값입니다.";
          },
        },
        {
          property: "시공 한계",
          admin: false,
          returnValue: (designer) => {
            return String(designer.analytics.region.construct) + "km";
          },
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
          updateValue: async (raw, designer) => {
            const pastValue = instance.designer.analytics.region.construct;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\.]/gi, '');
              if (text === '') {
                throw new Error("invalid text");
              }

              text = Number(text);
              if (Number.isNaN(text)) {
                throw new Error("invalid text");
              }

              updateQuery["analytics.region.construct"] = text;
              instance.designer.analytics.region.construct = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "시공 한계",
                    column: "analytics.region.construct",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "시공 한계",
                column: "analytics.region.construct",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return String(text) + "km";

            } catch (e) {
              window.alert("숫자로만 적어주세요!");
              return String(designer.analytics.region.construct) + "km";
            }
          },
          noticeText: (designer) => {
            return "시공을 진행할 수 있는 거리의 최대값입니다.";
          },
        },
        {
          property: "이동 수단",
          admin: false,
          returnValue: (designer) => {
            return [
              "대중교통",
              "자동차",
            ];
          },
          selectValue: (designer) => {
            if (designer.analytics.region.transportation === "자동차") {
              return [ 1 ];
            } else {
              return [ 0 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.region.transportation;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.region.transportation = text;
              updateQuery["analytics.region.transportation"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "이동 수단",
                    column: "analytics.region.transportation",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "이동 수단",
                column: "analytics.region.transportation",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        }
      ],
      notice: [
        {
          title: "유효 범위",
          body: "출장비를 받지 않고 기본적으로 가줄 수 있는 거리의 최대값입니다. 최소 25km, 최대 40km 내에서 작성해주세요!",
        },
        {
          title: "한계 범위",
          body: "출장비를 받고 갈 수 있는 거리의 최대값입니다.",
        },
        {
          title: "시공 한계",
          body: "시공을 진행할 수 있는 거리의 최대값입니다.",
        },
      ],
    },
    {
      title: "작업 방식",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "역량 범위",
          admin: true,
          returnValue: (designer) => { return [
            "홈퍼니싱",
            "홈스타일링",
            "토탈 스타일링",
            "엑스트라 스타일링",
          ] },
          selectValue: (designer) => {
            const targets = [
              "홈퍼니싱",
              "홈스타일링",
              "토탈 스타일링",
              "엑스트라 스타일링",
            ];
            return variableArray(designer.analytics.construct.ability + 1);
          },
          multiple: true,
          range: true,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.construct.ability;
            try {
              let targetIndex;
              let whereQuery, updateQuery;

              targetIndex = 0;
              for (let i = 0; i < raw.length; i++) {
                if (raw[i] === 1) {
                  targetIndex = i;
                }
              }

              whereQuery = { desid: designer.desid };
              updateQuery = {};
              updateQuery["analytics.construct.ability"] = targetIndex;
              instance.designer.analytics.construct.ability = targetIndex;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "역량 범위",
                    column: "analytics.construct.ability",
                    value: targetIndex,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "역량 범위",
                column: "analytics.construct.ability",
                value: targetIndex,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "홈리에종과 진행하기로 한 서비스의 범위와 상관 없이 " + designer.designer + " 디자이너님의 역량상 할 수 있는 범위입니다.";
          },
        },
        {
          property: "진행 범위",
          admin: true,
          returnValue: (designer) => { return [
            "홈퍼니싱",
            "홈스타일링",
            "토탈 스타일링",
            "엑스트라 스타일링",
          ] },
          selectValue: (designer) => {
            const targets = [
              "홈퍼니싱",
              "홈스타일링",
              "토탈 스타일링",
              "엑스트라 스타일링",
            ];
            return variableArray(designer.analytics.construct.level + 1);
          },
          multiple: true,
          range: true,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.construct.level;
            try {
              let targetIndex;
              let whereQuery, updateQuery;

              targetIndex = 0;
              for (let i = 0; i < raw.length; i++) {
                if (raw[i] === 1) {
                  targetIndex = i;
                }
              }

              whereQuery = { desid: designer.desid };
              updateQuery = {};
              updateQuery["analytics.construct.level"] = targetIndex;
              instance.designer.analytics.construct.level = targetIndex;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              await ajaxJson({ data: null }, BACKHOST + "/designerLevelMatrixSync");
              
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "진행 범위",
                    column: "analytics.construct.level",
                    value: targetIndex,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "진행 범위",
                column: "analytics.construct.level",
                value: targetIndex,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "홈리에종과 진행하기로 한 서비스의 범위입니다.";
          },
        },
        {
          property: "부분 공간",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.partial) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.partial;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.partial = (text === "가능");
              updateQuery["analytics.project.partial"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              await ajaxJson({ data: null }, BACKHOST + "/designerLevelMatrixSync");

              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "부분 공간",
                    column: "analytics.project.partial",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "부분 공간",
                column: "analytics.project.partial",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "부분 공간 홈스타일링이 가능한 지에 대한 여부입니다.";
          },
        },
        {
          property: "온라인",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.online) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.online;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.online = (text === "가능");
              updateQuery["analytics.project.online"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "온라인",
                    column: "analytics.project.online",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "온라인",
                column: "analytics.project.online",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "거주중",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.living) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.living;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.living = (text === "가능");
              updateQuery["analytics.project.living"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "거주중",
                    column: "analytics.project.living",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "거주중",
                column: "analytics.project.living",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "거주중인 고객님 현장의 홈스타일링이 가능한 지에 대한 여부입니다.";
          },
        },
        {
          property: desktop ? "1차 제안 시간" : "1차 제안",
          admin: false,
          returnValue: (designer) => { return [
            "1주일 이내",
            "2주일 이내",
            "3주일 이내",
            "3주일 이상",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.time.first <= 7) {
              return [ 0 ];
            } else if (designer.analytics.project.time.first <= 14) {
              return [ 1 ];
            } else if (designer.analytics.project.time.first <= 21) {
              return [ 2 ];
            } else {
              return [ 3 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.time.first;
            try {
              let number, whereQuery, updateQuery;
              let numberColumns;

              whereQuery = { desid };
              updateQuery = {};

              numberColumns = [
                7,
                14,
                21,
                28,
              ];

              number = numberColumns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.time.first = number;
              updateQuery["analytics.project.time.first"] = number;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "1차 제안 시간",
                    column: "analytics.project.time.first",
                    value: number,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "1차 제안 시간",
                column: "analytics.project.time.first",
                value: number,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "제안 방식",
          admin: false,
          returnValue: (designer) => { return [
            "순차 제안",
            "한번에 제안"
          ] },
          selectValue: (designer) => {
            let contents, value;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.styling.method) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return [ value.findIndex((n) => { return n === 1 }) ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.styling.method;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.styling.method = text;
              updateQuery["analytics.styling.method"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "제안 방식",
                    column: "analytics.styling.method",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "제안 방식",
                column: "analytics.styling.method",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "CAD 도면",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.cad) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.cad;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.cad = (text === "가능");
              updateQuery["analytics.project.cad"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "CAD 도면",
                    column: "analytics.project.cad",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "CAD 도면",
                column: "analytics.project.cad",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "Auto CAD와 같은 프로그램을 이용한 정식 도면을 할 수 있는지에 대한 여부입니다.";
          },
        },
        {
          property: "콜라주",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.project.collage) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.collage;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.collage = (text === "가능");
              updateQuery["analytics.project.collage"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "콜라주",
                    column: "analytics.project.collage",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "콜라주",
                column: "analytics.project.collage",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "3D",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.project.modeling ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.project.modeling;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.project.modeling = index;
              updateQuery["analytics.project.modeling"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "3D",
                    column: "analytics.project.modeling",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "3D",
                column: "analytics.project.modeling",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          fourStepValue: (designer) => {
            return [
              "3D를 아예 할 수 없음",
              "스케치업 모델링까지만 가능",
              "스케치업 이상의 툴로 모델링, 텍스처, 라이팅 가능",
              "실사 랜더링까지 완벽하게 가능",
            ]
          },
        },
      ],
      notice: [
        {
          title: "제안 방식",
          body: "제안을 나누어서 순차적으로 하는 지, 한번에 제안하는 지에 대한 분류입니다.",
        },
        {
          title: "3D 레벨의 기준",
          body: "하 - 스케치업 모델링까지만\n중 - 스케치업 이상의 툴로 모델링, 텍스처, 라이팅까지\n상 - 실사 랜더링까지 완벽하게",
        },
      ],
    },
    {
      title: "시공 관련",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "협업 시공사",
          admin: false,
          returnValue: (designer) => { return [
            "있음",
            "없음",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.construct.partner) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.construct.partner;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.construct.partner = (text === "있음");
              updateQuery["analytics.construct.partner"] = (text === "있음");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "협업 시공사",
                    column: "analytics.construct.partner",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "협업 시공사",
                column: "analytics.construct.partner",
                value: (text === "있음"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "직접 운영하는 시공사가 아닌, 주로 협엽하는 시공사가 있는 지에 대한 여부입니다.";
          },
        },
        {
          property: "협업 시공사명",
          admin: false,
          returnValue: (designer) => {
            return designer.analytics.construct.partnerName === "" ? '-' : designer.analytics.construct.partnerName;
          },
          renderValue: (text) => {
            return text === '-' ? "" : text;
          },
          updateValue: async (raw, designer) => {
            const pastValue = instance.designer.analytics.construct.partnerName;
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.trim();

              instance.designer.analytics.construct.partnerName = text;
              updateQuery["analytics.construct.partnerName"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "협업 시공사명",
                    column: "analytics.construct.partnerName",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "협업 시공사명",
                column: "analytics.construct.partnerName",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return text === '' ? '-' : text;

            } catch (e) {
              console.log(e);
              return (designer.analytics.construct.partnerName === "" ? '-' : designer.analytics.construct.partnerName);
            }
          },
        },
        {
          property: "자체 시공사",
          admin: false,
          returnValue: (designer) => { return [
            "있음",
            "없음",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.construct.own) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.construct.own;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.construct.own = (text === "있음");
              updateQuery["analytics.construct.own"] = (text === "있음");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "자체 시공사",
                    column: "analytics.construct.own",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "자체 시공사",
                column: "analytics.construct.own",
                value: (text === "있음"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "협업하는 시공사가 아닌, " + designer.designer + " 디자이너님이 직접 운영하는 시공사가 있는 지에 대한 여부입니다.";
          },
        },
        {
          property: "자체 시공사명",
          admin: false,
          returnValue: (designer) => {
            return designer.analytics.construct.ownName === "" ? '-' : designer.analytics.construct.ownName;
          },
          renderValue: (text) => {
            return text === '-' ? "" : text;
          },
          updateValue: async (raw, designer) => {
            const pastValue = instance.designer.analytics.construct.ownName;
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.trim();

              instance.designer.analytics.construct.ownName = text;
              updateQuery["analytics.construct.ownName"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "text",
                    property: "자체 시공사명",
                    column: "analytics.construct.ownName",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "text",
                property: "자체 시공사명",
                column: "analytics.construct.ownName",
                value: text,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

              return text === '' ? '-' : text;

            } catch (e) {
              console.log(e);
              return (designer.analytics.construct.ownName === "" ? '-' : designer.analytics.construct.ownName);
            }
          },
        },
        {
          property: "시공 감리",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.construct.possible.supervision) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.construct.possible.supervision;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.construct.possible.supervision = (text === "가능");
              updateQuery["analytics.construct.possible.supervision"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "시공 감리",
                    column: "analytics.construct.possible.supervision",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "시공 감리",
                column: "analytics.construct.possible.supervision",
                value: (text === "가능"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [],
    },
    {
      title: "제작 관련",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "빌트인 가구",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.styling.furniture.builtin ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.styling.furniture.builtin;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.styling.furniture.builtin = index;
              updateQuery["analytics.styling.furniture.builtin"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "빌트인 가구",
                    column: "analytics.styling.furniture.builtin",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "빌트인 가구",
                column: "analytics.styling.furniture.builtin",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "붙박이장, 냉장고장, 신발장, 주방 가구 등의 빌트인 가구를 제작할 수 있는 지에 대한 여부와 레벨입니다.";
          },
          fourStepValue: (designer) => {
            return [
              "빌트인 가구 아예 할 수 없음",
              "대략적인 사이즈와 느낌과 재질 제시만 가능",
              "구체적인 형태까지 그릴 수 있고 디테일을 수치로 제시 가능",
              "완벽한 CAD 까지 만들어 직접 발주를 넣을 수 있음",
            ]
          },
        },
        {
          property: "디자인 가구",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.styling.furniture.design ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.styling.furniture.design;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.styling.furniture.design = index;
              updateQuery["analytics.styling.furniture.design"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "디자인 가구",
                    column: "analytics.styling.furniture.design",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "디자인 가구",
                column: "analytics.styling.furniture.design",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "붙박이장이 아닌 독립적인 가구를 디자인하고 제작할 수 있는 지에 대한 여부와 레벨입니다.";
          },
          fourStepValue: (designer) => {
            return [
              "디자인 가구 아예 할 수 없음",
              "기성 제품을 카피하여 대략적인 모델링과 재질 지정까지 가능",
              "직접 창작한 독립적 가구를 디자인하고 제작할 수 있음",
              "독립적 가구를 넘어서 가구 원단까지 제작 가능",
            ]
          },
        },
        {
          property: "제작 패브릭",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.styling.fabric.level ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.styling.fabric.level;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.styling.fabric.level = index;
              updateQuery["analytics.styling.fabric.level"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "제작 패브릭",
                    column: "analytics.styling.fabric.level",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "제작 패브릭",
                column: "analytics.styling.fabric.level",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
          fourStepValue: (designer) => {
            return [
              "제작 패브릭 아예 할 수 없음",
              "제작 패브릭을 잘 하는 업체 연결할 수 있음",
              "필요한 사이즈를 실측하여 직접 발주 가능",
              "사이즈를 넘어 구체적인 원단과 패턴으로 창작 패브릭 가능",
            ]
          },
        },
        {
          property: "설치 서비스",
          admin: false,
          returnValue: (designer) => { return [
            "직접",
            "연결",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.purchase.setting.install) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.purchase.setting.install;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.purchase.setting.install = (text === "직접");
              updateQuery["analytics.purchase.setting.install"] = (text === "직접");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "설치 서비스",
                    column: "analytics.purchase.setting.install",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "설치 서비스",
                column: "analytics.purchase.setting.install",
                value: (text === "직접"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "정리 수납",
          admin: false,
          returnValue: (designer) => { return [
            "연결",
            "미제공",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.purchase.setting.storage) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.purchase.setting.storage;
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.purchase.setting.storage = (text === "연결");
              updateQuery["analytics.purchase.setting.storage"] = (text === "연결");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "정리 수납",
                    column: "analytics.purchase.setting.storage",
                    value: text,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "정리 수납",
                column: "analytics.purchase.setting.storage",
                value: (text === "연결"),
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [
        {
          title: "빌트인 가구",
          body: "붙박이장, 냉장고장, 신발장, 주방 가구 등의 빌트인 가구를 제작할 수 있는 지에 대한 여부와 레벨입니다.",
        },
        {
          title: "디자인 가구",
          body: "붙박이장이 아닌 독립적인 가구를 디자인하고 제작할 수 있는 지에 대한 여부와 레벨입니다.",
        },
      ],
    },
    {
      title: "개인 성향",
      whiteType: 1,
      admin: true,
      contents: [
        {
          property: "운영 전문성",
          admin: true,
          returnValue: (designer) => { return [
            "심각",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.personality.operation ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.personality.operation;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.personality.operation = index;
              updateQuery["analytics.personality.operation"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "운영 전문성",
                    column: "analytics.personality.operation",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "운영 전문성",
                column: "analytics.personality.operation",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "디자인 전문성",
          admin: true,
          returnValue: (designer) => { return [
            "심각",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.personality.design ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.personality.design;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.personality.design = index;
              updateQuery["analytics.personality.design"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "디자인 전문성",
                    column: "analytics.personality.design",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "디자인 전문성",
                column: "analytics.personality.design",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "업무 효율",
          admin: true,
          returnValue: (designer) => { return [
            "심각",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.personality.efficient ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.personality.efficient;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.personality.efficient = index;
              updateQuery["analytics.personality.efficient"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "업무 효율",
                    column: "analytics.personality.efficient",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "업무 효율",
                column: "analytics.personality.efficient",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "소통 스타일",
          admin: true,
          returnValue: (designer) => { return [
            "순응",
            "중간",
            "리드",
            "압박",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.personality.communication ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.personality.communication;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.personality.communication = index;
              updateQuery["analytics.personality.communication"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "소통 스타일",
                    column: "analytics.personality.communication",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "소통 스타일",
                column: "analytics.personality.communication",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "홈리에종 관계",
          admin: true,
          returnValue: (designer) => { return [
            "나쁨",
            "모름",
            "좋음",
            "친함",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.personality.homeliaison ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.personality.homeliaison;
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });
              if (index === -1) {
                index = 0;
              }
              instance.designer.analytics.personality.homeliaison = index;
              updateQuery["analytics.personality.homeliaison"] = index;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "홈리에종 관계",
                    column: "analytics.personality.homeliaison",
                    value: index,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "홈리에종 관계",
                column: "analytics.personality.homeliaison",
                value: index,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [],
    },
    {
      title: "스타일",
      whiteType: 2,
      admin: false,
      contents: [
        {
          property: "스타일링",
          admin: true,
          returnValue: (designer) => { return [
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.styling.level - 1 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            const pastValue = instance.designer.analytics.styling.level;
            try {
              let targetIndex;
              let whereQuery, updateQuery;

              targetIndex = 0;
              for (let i = 0; i < raw.length; i++) {
                if (raw[i] === 1) {
                  targetIndex = i;
                }
              }

              whereQuery = { desid: designer.desid };

              updateQuery = {};
              updateQuery["analytics.styling.level"] = targetIndex + 1;
              instance.designer.analytics.styling.level = targetIndex + 1;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "selection",
                    property: "스타일링",
                    column: "analytics.styling.level",
                    value: targetIndex + 1,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "selection",
                property: "스타일링",
                column: "analytics.styling.level",
                value: targetIndex + 1,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "스타일 경향성",
          admin: false,
          returnValue: (designer) => { return {
            modern: { name: "모던", value: designer.analytics.styling.tendency.style.modern },
            classic: { name: "클래식", value: designer.analytics.styling.tendency.style.classic },
            natural: { name: "내추럴", value: designer.analytics.styling.tendency.style.natural },
            mixmatch: { name: "믹스매치", value: designer.analytics.styling.tendency.style.mixmatch },
            scandinavian: { name: "북유럽", value: designer.analytics.styling.tendency.style.scandinavian },
            vintage: { name: "빈티지", value: designer.analytics.styling.tendency.style.vintage },
            oriental: { name: "오리엔탈", value: designer.analytics.styling.tendency.style.oriental },
            exotic: { name: "이그저틱", value: designer.analytics.styling.tendency.style.exotic },
            __order__: [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ],
            __color__: colorChip.green,
          } },
          updateValue: async (raw, target, designer) => {
            const pastValue = instance.designer.analytics.styling.tendency.style[target];
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.style[target] = raw;
              updateQuery["analytics.styling.tendency.style." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "tendency",
                    property: "스타일 경향성",
                    column: "analytics.styling.tendency.style." + target,
                    value: raw,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "tendency",
                property: "스타일 경향성",
                column: "analytics.styling.tendency.style." + target,
                value: raw,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "텍스처 경향성",
          admin: false,
          returnValue: (designer) => { return {
            darkWood: { name: "진한 우드", value: designer.analytics.styling.tendency.texture.darkWood },
            whiteWood: { name: "연한 우드", value: designer.analytics.styling.tendency.texture.whiteWood },
            coating: { name: "도장", value: designer.analytics.styling.tendency.texture.coating },
            metal: { name: "금속", value: designer.analytics.styling.tendency.texture.metal },
            __order__: [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ],
            __color__: colorChip.green,
          } },
          updateValue: async (raw, target, designer) => {
            const pastValue = instance.designer.analytics.styling.tendency.texture[target];
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.texture[target] = raw;
              updateQuery["analytics.styling.tendency.texture." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "tendency",
                    property: "텍스처 경향성",
                    column: "analytics.styling.tendency.texture." + target,
                    value: raw,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "tendency",
                property: "텍스처 경향성",
                column: "analytics.styling.tendency.texture." + target,
                value: raw,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "컬러톤 경향성",
          admin: false,
          returnValue: (designer) => { return {
            darkWood: { name: "다크 우드", value: designer.analytics.styling.tendency.color.darkWood },
            whiteWood: { name: "밝은 우드", value: designer.analytics.styling.tendency.color.whiteWood },
            highContrast: { name: "고대비", value: designer.analytics.styling.tendency.color.highContrast },
            vivid: { name: "비비드", value: designer.analytics.styling.tendency.color.vivid },
            white: { name: "화이트", value: designer.analytics.styling.tendency.color.white },
            mono: { name: "모노톤", value: designer.analytics.styling.tendency.color.mono },
            bright: { name: "밝은톤", value: designer.analytics.styling.tendency.color.bright },
            dark: { name: "어두운톤", value: designer.analytics.styling.tendency.color.dark },
            __order__: [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ],
            __color__: colorChip.green,
          } },
          updateValue: async (raw, target, designer) => {
            const pastValue = instance.designer.analytics.styling.tendency.color[target];
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.color[target] = raw;
              updateQuery["analytics.styling.tendency.color." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "tendency",
                    property: "컬러톤 경향성",
                    column: "analytics.styling.tendency.color." + target,
                    value: raw,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "tendency",
                property: "컬러톤 경향성",
                column: "analytics.styling.tendency.color." + target,
                value: raw,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "밀도 경향성",
          admin: false,
          returnValue: (designer) => { return {
            maximun: { name: "맥시멈", value: designer.analytics.styling.tendency.density.maximun },
            minimum: { name: "미니멈", value: designer.analytics.styling.tendency.density.minimum },
            __order__: [
              "maximun",
              "minimum",
            ],
            __color__: colorChip.green,
          } },
          updateValue: async (raw, target, designer) => {
            const pastValue = instance.designer.analytics.styling.tendency.density[target];
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.density[target] = raw;
              updateQuery["analytics.styling.tendency.density." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              if (!entireMode) {
                await homeliaisonAnalytics({
                  page: pageName,
                  standard: firstPageViewTime,
                  action: "designerAboutUpdate",
                  data: {
                    desid: desid,
                    date: new Date(),
                    type: "tendency",
                    property: "밀도 경향성",
                    column: "analytics.styling.tendency.density." + target,
                    value: raw,
                  }
                });
              }
              await instance.sendSlackAlarm({
                desid: desid,
                date: new Date(),
                type: "tendency",
                property: "밀도 경향성",
                column: "analytics.styling.tendency.density." + target,
                value: raw,
                designer: designer.designer,
                pastValue: pastValue,
                entireMode: entireMode,
              });

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [
        {
          title: "경향성 체크",
          body: "스타일 경향에 대한 값들은 모두 고객님들께 노출되오니 정확하게 기입해주세요!",
        },
      ],
    },
  ];

  if (entireMode) {
    this.contents = contents;
  } else {
    if (!adminMode) {
      contents = contents.map((o) => { o.contents = o.contents.filter((j) => { return !j.admin }); return o; }).filter((o) => {
        return !o.admin;
      });
    }
    this.contents = contents;
  }

  if (!detailSearchMode) {
    for (let i = 0; i < contents.length; i++) {
      this.renderWhite(contents[i].whiteType, contents[i].title, contents[i].contents, contents[i].notice, i + 1, i === (contents.length - 1));
    }
  } else {
    return contents;
  }

}

DesignerAboutJs.prototype.renderWhite = function (type, title, contents, notice, index, lastBoo) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, totalContents } = this;
  const { entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let whiteBlock, whiteTong;
  let block;
  let leftPadding;
  let topPadding0;
  let topPadding1;
  let bottomMargin;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    leftPadding = 24;
    topPadding0 = 16;
    topPadding1 = 40;
  } else {
    leftPadding = <%% 55, 55, 47, 39, 4.7 %%>;
    topPadding0 = <%% 52, 52, 44, 36, 4.7 %%>;
    topPadding1 = <%% 40, 40, 38, 32, 4.7 %%>;
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      display: "block",
      position: "relative",
      borderTopLeftRadius: type === 0 ? String(8) + "px" : "",
      borderTopRightRadius: type === 0 ? String(8) + "px" : "",
      borderBottomLeftRadius: lastBoo ? String(8) + "px" : "",
      borderBottomRightRadius: lastBoo ? String(8) + "px" : "",
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(type === 0 ? topPadding0 : topPadding1) + ea : "",
      boxShadow: !entireMode ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
      marginBottom: lastBoo ? String(bottomMargin) + ea : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(leftPadding * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? leftPadding : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.children[0];

  block = this.renderTong(type, title, whiteTong, index - 1, lastBoo);
  this.renderBlock(contents, notice, block.lastChild, block.firstChild.firstChild, index - 1, lastBoo);
}

DesignerAboutJs.prototype.renderTong = function (type, title, whiteTong, index, lastBoo) {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  let titleWidth;
  let titleTopNumber;
  let titleFontSize;
  let numberRight;
  let numberBottom;
  let numberSize;
  let numberWeight;
  let finalBottomMargin;
  let realFinalBottomMargin;
  let mobileBasicMargin;
  let mobileBasePaddingTop;
  let mobileLineTop;
  let grayZone;
  let grayZoneWidth;
  let grayZoneContentsWidth;
  let grayPadding;
  let grayInnerPadding, grayInnerPaddingTop;

  grayZoneWidth = <%% 250, 0, 0, 0, 32 %%>;
  grayZoneContentsWidth = <%% 200, 0, 0, 0, 0 %%>;
  grayPadding = <%% 52, 52, 44, 36, 4.7 %%>;
  grayInnerPadding = <%% 22, 22, 22, 22, 20 %%>;
  if (index === 0) {
    grayInnerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  } else {
    grayInnerPaddingTop = <%% 2, 2, 2, 2, 2 %%>;
  }

  titleWidth = <%% 200, 160, 140, 120, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 18, 17, 16, 15, 4 %%>;

  numberRight = <%% 12, 12, 12, 12, 2 %%>;
  numberSize = <%% 18, 18, 18, 16, 3 %%>;
  numberWeight = <%% 200, 200, 200, 200, 200 %%>;
  numberBottom = <%% 43, 43, 43, 43, 6 %%>;

  finalBottomMargin = <%% (isMac() ? 30 : 27), (isMac() ? 30 : 27), (isMac() ? 30 : 27), (isMac() ? 24 : 22), 0 %%>;

  realFinalBottomMargin = <%% 24, 24, 24, 24, 3 %%>;

  mobileLineTop = isIphone() ? 2.7 : 2.5;
  mobileBasePaddingTop = 7;
  mobileBasicMargin = 7;

  return createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      flexDirection: desktop ? "row" : "column",
      position: "relative",
      width: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? (media[0] ? "inline-flex" : "none") : "none",
          position: "relative",
          width: desktop ? String(grayZoneWidth) + ea : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
          marginBottom: desktop ? "" : String(4) + ea,
        },
        child: {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(grayZoneContentsWidth - (grayInnerPadding * 2)) + ea,
            height: "calc(" + String(!lastBoo ? withOut(-1 * grayPadding, ea) : withOut(grayPadding, ea)) + " - " + String(grayInnerPadding + grayInnerPaddingTop) + ea + ")",
            background: colorChip.gray0,
            zIndex: String(1),
            padding: String(grayInnerPadding) + ea,
            paddingTop: String(grayInnerPaddingTop) + ea,
            borderTopLeftRadius: index === 0 ? String(5) + "px" : "",
            borderTopRightRadius: index === 0 ? String(5) + "px" : "",
            borderBottomLeftRadius: lastBoo ? String(5) + "px" : "",
            borderBottomRightRadius: lastBoo ? String(5) + "px" : "",
          }
        }
      },
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? String(titleWidth) + ea : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
          marginBottom: desktop ? "" : String(4) + ea,
        },
        children: [
          {
            style: {
              display: desktop ? "none" : "block",
              position: "absolute",
              top: String(0),
              width: withOut(0),
              left: String(0),
              height: String(mobileLineTop) + ea,
              borderBottom: "1px dashed " + colorChip.gray4,
            }
          },
          {
            text: title,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(700),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          overflow: "hidden",
          width: desktop ? withOut(grayZoneWidth + titleWidth, ea) : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          top: String(titleTopNumber) + ea,
          paddingBottom: desktop ? String(finalBottomMargin) + ea : (type === 2 ? String(mobileBasicMargin) + ea : String(0) + ea),
          marginBottom: type === 2 ? String(realFinalBottomMargin) + ea : String(desktop ? 2 : 0) + ea,
          borderBottom: desktop ? (type !== 2 ? "1px dashed " + colorChip.gray4 : "") : "",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
        }
      },
    ]
  });

}

DesignerAboutJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      title: "디자이너 기본 정보",
      contents: [
        "해당 정보는 추천서를 제작하고, 맞는 고객님을 연결해드리기 위해 반드시 필요한 정보입니다. 최대한 정확하게 적어주시고, 변경 사항이 있다면 꼭 업데이트를 해주세요!",
      ],
    },
    {
      title: "콘솔 이용 방법",
      contents: [
        "해당 정보를 클릭해보시면 수정 모드로 변하며, 초록색 글짜일 때 값을 바꿔준 후 완료 또는 Enter를 눌러주시면 됩니다.",
        "선택형 정보일 경우, 해당 정보에 맞는 값을 클릭해주시면 바로 업데이트가 됩니다."
      ],
    },
  ];
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 40, 36, 30, 22, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6.5 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
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
          display: desktop ? "block" : "none",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: "디자이너 체크리스트 안내",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(4.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                style: {
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerAboutJs.prototype.insertProfileBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, totalContents, naviHeight, entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, autoComma, fireEvent, equalJson, stringToLink, linkToString, setThrottle, setQueue, sleep, removeByClass, homeliaisonAnalytics } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      contents: [
        "디자이너님의 사진을 업로드해주세요! 프로필 사진은 홈페이지와 추천서에 노출되어 고객님께 디자이너님을 어필하는 중요한 포인트가 됩니다. 정면 또는 측면의 얼굴이 잘 보이는 사진으로 업로드 부탁드리겠습니다."
      ],
    },
  ];
  const profileFileInputClassName = "profileFileInputClassName";
  const photoResizeBaseClassName = "photoResizeBaseClassName";
  const photoResizeStandardClassName = "photoResizeStandardClassName";
  const mainPhotoClassName = "mainPhotoClassName";
  const photoWithWordsClassName = "photoWithWordsClassName";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let photoZone;
  let exampleUpZone;
  let exampleDownZone;
  let exampleZone;
  let profilePhotoZone;
  let profileWidth;
  let profileMarginLeft;
  let profileUploadButtonRight, profileUploadButtonWidth, profileUploadButtonHeight;
  let profileUploadButtonSize, profileUploadButtonWeight, profileUploadButtonTextTop;
  let exampleZoneWidth, exampleZoneMarginLeft;
  let exampleUpDownBetween;
  let exampleTextWidth, exampleTextSize, exampleTextWeight, exampleTextTextTop;
  let exampleTextVisualLeft;
  let exampleFactorWidth, exampleFactorMargin;
  let goodBadSize, goodBadWeight, goodBadRight;
  let profileUploadEvent;
  let profileFileInputEvent;
  let photoResizeEvent;
  let fixImageWidth, fixImageHeight;
  let thisBackgroundImage;
  let thisBackgroundImageBox;
  let circleWidth;
  let brightCircle;
  let imageBaseBox;
  let minimumY, maximumY;
  let minimumX, maximumX;
  let rangeY, rangeX;
  let profileUploadCancelEvent;
  let exampleLength;
  let uploadButtonBottom;
  let uploadButtonWidth;
  let uploadButtonHeight;
  let uploadButtonSize;
  let uploadButtonWeight;
  let uploadButtonTextTop;
  let blockMarginTop;
  let mobilePhotoZonePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 0;
    whiteBottomMargin = 42;
  } else {
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;  
  }

  titleFontSize = <%% 21, 21, 18, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 15, 14, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 33 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 3 %%>;

  contentsWordingSize = <%% 14.5, 14, 13, 12, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  profileWidth = <%% 239, 200, 200, 210, 33 %%>;
  profileMarginLeft = <%% 55, 10, 10, 20, 3.8 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 42, 42, 42, 11 %%>;
  profileUploadButtonHeight = <%% 20, 18, 18, 18, 4 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 2.5 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -0.3 %%>;

  exampleZoneWidth = <%% 500, 276, 276, 276, 50 %%>;
  if (normalMode) {
    exampleZoneMarginLeft = 24;
  } else {
    exampleZoneMarginLeft = <%% 72, 54, 48, 0, 30 %%>;
  }
  exampleUpDownBetween = <%% 18, 18, 18, 18, 2 %%>;

  exampleTextWidth = <%% 70, 54, 54, 54, 12 %%>;
  exampleTextSize = <%% 14, 11, 11, 11, 2.5 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
  exampleTextVisualLeft = <%% -2, -2, -2, -2, 0 %%>;

  exampleFactorWidth = <%% 110, 91, 91, 96, 15 %%>;
  exampleFactorMargin = <%% 30, 20, 20, 26, 4.5 %%>;

  goodBadSize = <%% 12, 11, 11, 10, 2.5 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 400 %%>;
  goodBadRight = <%% -14, -14, -14, -14, -4.5 %%>;

  exampleLength = <%% 3, 2, 2, 3, 2 %%>;

  uploadButtonBottom = <%% 3, 3, 2, 2, 0.7 %%>;
  uploadButtonWidth = <%% 56, 56, 50, 50, 12.5 %%>;
  uploadButtonHeight = <%% 24, 24, 21, 21, 4.5 %%>;
  uploadButtonSize = <%% 12, 12, 11, 10, 2.5 %%>;
  uploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  uploadButtonTextTop = <%% -2, -2, -2, -2, -0.3 %%>;

  blockMarginTop = <%% 0, 0, 0, 30, 0 %%>;

  fixImageWidth = window.innerHeight < 900 ? 700 : 800;
  fixImageHeight = window.innerHeight - 400;

  mobilePhotoZonePadding = 6;

  this.whiteMargin = (desktop ? margin : 0);

  photoResizeEvent = () => {
    return async function (e) {
      if (desktop) {
        try {
          const imageMother = document.querySelector('.' + mainPhotoClassName);
          const imageSecond = document.querySelector('.' + photoWithWordsClassName);
          const zIndex = 4;
          let grayBack;
          let imageBase;
    
          if (instance.profileTarget !== null) {
            grayBack = createNode({
              mother: totalContents,
              class: [ photoResizeBaseClassName ],
              style: {
                position: "fixed",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                opacity: String(0.8),
                background: colorChip.realBlack,
                zIndex: String(zIndex),
              }
            });
      
            imageBase = createNode({
              mother: totalContents,
              class: [ photoResizeBaseClassName ],
              event: {
                click: async function (e) {
                  try {
                    const standard = document.querySelector('.' + photoResizeStandardClassName);
                    if (standard.getAttribute("process") === "false") {
                      removeByClass(photoResizeBaseClassName);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "flex",
                position: "fixed",
                top: String(naviHeight) + "px",
                left: String(0),
                width: withOut(0, ea),
                height: withOut(naviHeight, "px"),
                zIndex: String(zIndex),
                justifyContent: "center",
                alignItems: "center",
              },
            })
    
            if (instance.profileTarget.gs === "g") {
    
              thisBackgroundImage = createNode({
                mother: imageBase,
                mode: "img",
                attribute: {
                  src: instance.profilePhoto,
                },
                event: {
                  click: function (e) {
                    e.stopPropagation();
                  }
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(fixImageWidth) + "px",
                  height: "auto",
                  zIndex: String(1),
                  opacity: String(0.3),
                }
              });
    
              imageBaseBox = imageBase.getBoundingClientRect();
              thisBackgroundImageBox = thisBackgroundImage.getBoundingClientRect();
              circleWidth = thisBackgroundImageBox.height * (100 / instance.profileTarget.size);  
    
            } else {
    
              thisBackgroundImage = createNode({
                mother: imageBase,
                mode: "img",
                attribute: {
                  src: instance.profilePhoto,
                },
                event: {
                  click: function (e) {
                    e.stopPropagation();
                  }
                },
                style: {
                  display: "inline-block",
                  position: "relative",
                  height: String(fixImageHeight) + "px",
                  width: "auto",
                  zIndex: String(1),
                  opacity: String(0.3),
                }
              });
    
              imageBaseBox = imageBase.getBoundingClientRect();
              thisBackgroundImageBox = thisBackgroundImage.getBoundingClientRect();
              circleWidth = thisBackgroundImageBox.width * (100 / instance.profileTarget.size);  
            }
    
            minimumY = (((thisBackgroundImageBox.top - naviHeight) + (circleWidth / 2)) / imageBaseBox.height) * 100;
            maximumY = 50 + Math.abs(50 - Math.abs(minimumY));
            rangeY = Math.abs(50 - Math.abs(minimumY)) * 2;
    
            minimumX = (((thisBackgroundImageBox.left) + (circleWidth / 2)) / imageBaseBox.width) * 100;
            maximumX = 50 + Math.abs(50 - Math.abs(minimumX));
            rangeX = Math.abs(50 - Math.abs(minimumX)) * 2;
    
            createNode({
              mother: imageBase,
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(thisBackgroundImageBox.top - naviHeight) + "px",
                left: String(thisBackgroundImageBox.left) + "px",
                width: String(thisBackgroundImageBox.width) + "px",
                height: String(thisBackgroundImageBox.height) + "px",
                background: "black",
                zIndex: String(0),
              }
            })
  
            brightCircle = createNode({
              mother: imageBase,
              class: [ photoResizeStandardClassName ],
              attribute: {
                draggable: "true",
                starty: String(0),
                startx: String(0),
                process: "false",
              },
              event: {
                dragstart: function (e) {
                  this.setAttribute("starty", String(e.offsetY));
                  this.setAttribute("startx", String(e.offsetX));
                  this.setAttribute("process", "true");
                },
                dragover: function (e) {
                  const starty = Number(this.getAttribute("starty"));
                  const thisy = e.offsetY - starty;
                  const startx = Number(this.getAttribute("startx"));
                  const thisx = e.offsetX - startx;
                  this.style.transform = "translate(" + String(thisx) + "px" + " ," + String(thisy) + "px)";
                  this.setAttribute("process", "true");
                },
                dragend: async function (e) {
                  try {
                    const brightCircleBox = brightCircle.getBoundingClientRect();
                    let finalX, finalY;
      
                    finalY = ((brightCircleBox.top - naviHeight + (circleWidth / 2)) / imageBaseBox.height) * 100;
                    finalX = ((brightCircleBox.left + (circleWidth / 2)) / imageBaseBox.width) * 100;
      
                    finalY = Math.round(finalY);
                    finalX = Math.round(finalX);
      
                    if (finalY < minimumY) {
                      finalY = Math.ceil(minimumY);
                    }
                    if (finalY > maximumY) {
                      finalY = Math.floor(maximumY);
                    }
                    if (finalX < minimumX) {
                      finalX = Math.ceil(minimumX);
                    }
                    if (finalX > maximumX) {
                      finalX = Math.floor(maximumX);
                    }
      
                    this.style.top = withOut(finalY, (circleWidth / 2), "px");
                    this.style.left = withOut(finalX, (circleWidth / 2), "px");
                    this.style.transform = "translate(0px, 0px)";
      
                    instance.profileTarget.position.x = Math.round(50 + (((finalX - 50) / rangeX) * 100));
                    instance.profileTarget.position.y = Math.round(50 + (((finalY - 50) / rangeY) * 100));
    
                    imageMother.style.backgroundPosition = String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%";
                    imageSecond.style.backgroundPosition = String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%";
  
                    imageMother.style.opacity = String(1);
                    imageSecond.style.opacity = String(1);
  
                    await ajaxJson({
                      desid: instance.designer.desid,
                      id: instance.profileTarget.id,
                      mode: "position",
                      position: {
                        x: instance.profileTarget.position.x,
                        y: instance.profileTarget.position.y,
                      }
                    }, BRIDGEHOST + "/designerProfileUpdate");
                    
                    if (!entireMode) {
                      await homeliaisonAnalytics({
                        page: instance.pageName,
                        standard: instance.firstPageViewTime,
                        action: "profilePositionUpdate",
                        data: {
                          desid: instance.designer.desid,
                          date: new Date(),
                          position: {
                            x: instance.profileTarget.position.x,
                            y: instance.profileTarget.position.y,
                          }
                        }
                      });
                    }

                    this.setAttribute("process", "false");
    
                  } catch (e) {
                    console.log(e);
                  }
                },
                click: function (e) {
                  e.stopPropagation();
                }
              },
              style: {
                display: "inline-block",
                position: "absolute",
                top: withOut((((instance.profileTarget.position.y - 50) / 100) * rangeY) + 50, circleWidth / 2, "px"),
                left: withOut((((instance.profileTarget.position.x - 50) / 100) * rangeX) + 50, circleWidth / 2, "px"),
                width: String(circleWidth) + "px",
                height: String(circleWidth) + "px",
                borderRadius: String(circleWidth) + "px",
                background: "rgb(0, 0, 0, 0)",
                "backdrop-filter": "brightness(3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                transform: "translate(0px, 0px)",
                zIndex: String(1),
              }
            });
    
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        window.alert("사진의 위치 조정은 데스크탑에서 하실 수 있습니다! 데스크탑을 통해 편집해주세요!");
      }
    }
  }

  profileFileInputEvent = () => {
    return async function (e) {
      try {
        let formData;
        let response;
        let imageJson;
        let width;
        let height;
        let widthHeightArr;
        let garoBoo;
        let thisExe;
        let responseObj;
        let imageTarget;
        let imageSecond;

        instance.profileUploadProcess = false;
        if (this.files.length === 1) {
          formData = new FormData();
          formData.enctype = "multipart/form-data";

          thisExe = this.files[0].name.split(".")[this.files[0].name.split(".").length - 1];

          formData.append("profilePhoto0", this.files[0]);
          formData.append("exe", thisExe);

          response = await ajaxForm(formData, BRIDGEHOST + "/imageAnalytics");
          imageJson = equalJson(response);

          ({ width, height } = imageJson.geometry);

          widthHeightArr = [ width, height ];
          widthHeightArr.sort((a, b) => { return a - b; });

          if (widthHeightArr[0] < 1000) {
            window.alert("사진의 크기는 가로 크기와 세로 크기 모두 최소 1000px 이상이여야 합니다!");
          } else {

            formData = new FormData();
            formData.enctype = "multipart/form-data";
    
            formData.append("profilePhoto0", this.files[0]);

            garoBoo = (width >= height);
            formData.append("gs", garoBoo ? "g" : "s");
            formData.append("desid", instance.designer.desid);
            formData.append("exe", thisExe);

            await instance.sendChecklistLog({
              mode: "profile",
              data: {
                date: new Date(),
                desid: instance.designer.desid,
                designer: instance.designer.designer,
                entireMode: entireMode,
                gs: (garoBoo ? "g" : "s"),
                exe: thisExe,
              }
            });

            response = await ajaxForm(formData, BRIDGEHOST + "/designerProfilePhoto");
            responseObj = equalJson(response);
            responseObj.link = stringToLink(responseObj.link);

            if (!entireMode) {
              await homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "profilePhotoUpload",
                data: {
                  desid: instance.designer.desid,
                  date: new Date(),
                  gs: (garoBoo ? "g" : "s"),
                  exe: thisExe,
                }
              });
            }

            instance.profileTarget = responseObj;
            instance.profilePhoto = responseObj.link;
            if (instance.grayLoading !== null) {
              instance.grayLoading.remove();
              instance.grayLoading = null;  
            }
            imageTarget = document.querySelector('.' + mainPhotoClassName);
            imageTarget.style.backgroundImage = "url('" + instance.profilePhoto + "')";
            imageTarget.style.backgroundPosition = String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%";
            imageTarget.style.backgroundSize = instance.profileTarget.gs === "g" ? "auto " + String(instance.profileTarget.size) + "%" : String(instance.profileTarget.size) + "% auto";
            imageTarget.style.opacity = String(1);

            imageSecond = document.querySelector('.' + photoWithWordsClassName);
            imageSecond.style.backgroundImage = "url('" + instance.profilePhoto + "')";
            imageSecond.style.backgroundPosition = String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%";
            imageSecond.style.backgroundSize = instance.profileTarget.gs === "g" ? "auto " + String(instance.profileTarget.size) + "%" : String(instance.profileTarget.size) + "% auto";
            imageSecond.style.opacity = String(1);

            await sleep(1000);
            setQueue(() => {
              imageTarget.click();
            })
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        if (instance.grayLoading !== null) {
          instance.grayLoading.remove();
          instance.grayLoading = null;
        }
      }
    }
  }

  profileUploadEvent = async function (e) {
    try {
      const fileInput = document.querySelector("." + profileFileInputClassName);
      if (desktop) {
        const loading = instance.mother.whiteProgressLoading(null, true);
        instance.grayLoading = loading;
        instance.profileUploadProcess = true;
      }
      fireEvent(fileInput, "click");
    } catch (e) {
      console.log(e);
    }
  }

  profileUploadCancelEvent = function (e) {
    setQueue(() => {
      if (instance.profileUploadProcess) {
        if (instance.grayLoading !== null) {
          instance.grayLoading.remove();
          instance.grayLoading = null;
        }
        instance.profileUploadProcess = false;
      }
    }, 1000);
  }
  window.addEventListener("focus", profileUploadCancelEvent);

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? ("0px 5px 12px -10px " + colorChip.gray5) : "",
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

  photoZone = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      flexDirection: "row",
      position: "relative",
      width: big ? String(profileWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft) + ea : (desktop ? withOut(0, ea) : withOut(mobilePhotoZonePadding * 2, ea)),
      height: String(profileWidth) + ea,
      padding: desktop ? "" : String(mobilePhotoZonePadding) + ea,
      paddingTop: desktop ? "" : String(7.5) + ea,
    }
  });

  profilePhotoZone = createNode({
    mother: photoZone,
    style: {
      display: "inline-flex",
      flexDirection: "row",
      position: "relative",
      width: String(profileWidth) + ea,
      height: withOut(0, ea),
      marginRight: String(profileMarginLeft) + ea,
    }
  })

  createNode({
    mother: profilePhotoZone,
    class: [ mainPhotoClassName ],
    event: {
      click: photoResizeEvent(),
    },
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: String(profileWidth) + ea,
      height: withOut(0, ea),
      borderRadius: String(profileWidth) + ea,
      backgroundImage: "url('" + instance.profilePhoto + "')",
      backgroundPosition: instance.profileTarget === null ? "50% 50%" : String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%",
      backgroundSize: instance.profileTarget === null ? "auto 102%" : (instance.profileTarget.gs === "g" ? "auto " + String(instance.profileTarget.size) + "%" : String(instance.profileTarget.size) + "% auto"),
      opacity: instance.profileTarget === null ? String(0.5) : String(1),
      cursor: "pointer",
    }
  });

  createNode({
    mother: profilePhotoZone,
    class: [ profileFileInputClassName ],
    mode: "input",
    event: {
      change: profileFileInputEvent(),
    },
    attribute: {
      type: "file",
      name: "profilePhoto",
      accept: "image/*",
    },
    style: {
      display: "none",
    }
  });

  createNode({
    mother: profilePhotoZone,
    event: {
      click: profileUploadEvent,
    },
    style: {
      display: desktop ? "flex" : "none",
      position: "absolute",
      bottom: String(0),
      right: String(profileUploadButtonRight) + ea,
      width: String(profileUploadButtonWidth) + ea,
      height: String(profileUploadButtonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.green,
      justifyContent: "center",
      alignItems: "center",
    },
    child: {
      text: "upload",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(profileUploadButtonSize) + ea,
        fontWeight: String(profileUploadButtonWeight),
        fontFamily: "graphik",
        fontStyle: "italic",
        color: colorChip.white,
        top: String(profileUploadButtonTextTop) + ea,
      }
    }
  })

  exampleZone = createNode({
    mother: photoZone,
    style: {
      display: "inline-flex",
      flexDirection: "column",
      position: "relative",
      width: big ? String(exampleZoneWidth) + ea : withOut(profileWidth + profileMarginLeft, ea),
      height: withOut(0, ea),
    },
    children: [
      {
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(exampleUpDownBetween) + ea + ") / 2)",
          marginBottom: String(exampleUpDownBetween) + ea,
        }
      },
      {
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: withOut(0, ea),
          height: "calc(calc(100% - " + String(exampleUpDownBetween) + ea + ") / 2)",
        }
      },
    ]
  });
  exampleUpZone = exampleZone.children[0];
  exampleDownZone = exampleZone.children[1];

  for (let i = -1; i < exampleLength; i++) {
    if (i < 0) {
      createNode({
        mother: exampleUpZone,
        style: {
          display: desktop ? "inline-flex" : "none",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
          width: String(exampleTextWidth) + ea,
          height: withOut(0, ea),
        },
        child: {
          text: "<좋은 예>",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(exampleTextSize) + ea,
            fontWeight: String(exampleTextWeight),
            color: colorChip.black,
            top: String(exampleTextTextTop) + ea,
            left: String(exampleTextVisualLeft) + ea,
          }
        }
      });
      createNode({
        mother: exampleDownZone,
        style: {
          display: desktop ? "inline-flex" : "none",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
          width: String(exampleTextWidth) + ea,
          height: withOut(0, ea),
        },
        child: {
          text: "<나쁜 예>",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(exampleTextSize) + ea,
            fontWeight: String(exampleTextWeight),
            color: colorChip.black,
            top: String(exampleTextTextTop) + ea,
          }
        }
      });
    } else {
      createNode({
        mother: exampleUpZone,
        style: {
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
          width: String(exampleFactorWidth) + ea,
          height: withOut(0, ea),
          borderRadius: String(exampleFactorWidth) + ea,
          backgroundImage: "url('" + DesignerAboutJs.binaryPath + "/goodProfileExample" + String(i) + ".jpg" + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 102%",
          marginRight: String(i === (3 - 1) ? 0 : exampleFactorMargin) + ea,
          justifyContent: "end",
          alignItems: "end",
        },
        child: {
          text: "good",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(goodBadSize) + ea,
            fontWeight: String(goodBadWeight),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.green,
            right: String(goodBadRight) + ea,
          }
        }
      });
      createNode({
        mother: exampleDownZone,
        style: {
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
          width: String(exampleFactorWidth) + ea,
          height: withOut(0, ea),
          borderRadius: String(exampleFactorWidth) + ea,
          backgroundImage: "url('" + DesignerAboutJs.binaryPath + "/badProfileExample" + String(i) + ".jpg" + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "auto 102%",
          marginRight: String(i === (3 - 1) ? 0 : exampleFactorMargin) + ea,
          justifyContent: "end",
          alignItems: "end",
        },
        child: {
          text: "bad",
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(goodBadSize) + ea,
            fontWeight: String(goodBadWeight),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.red,
            right: String(goodBadRight) + ea,
          }
        }
      });
    }
  }

  block = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(profileWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft, ea) : "",
      verticalAlign: "bottom",
      marginTop: big ? "" : String(blockMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          zIndex: mobile ? String(1) : "",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginBottom: desktop ? "" : String(1.5) + ea,
          marginTop: desktop ? "" : String(1) + ea,
        },
        children: [
          {
            text: "프로필 업로드",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            event: {
              click: profileUploadEvent,
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(uploadButtonBottom) + ea,
              right: desktop ? String(0) + ea : String(mobilePaddingLeft) + ea,
              width: String(uploadButtonWidth) + ea,
              height: String(uploadButtonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: "upload",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(uploadButtonSize) + ea,
                fontWeight: String(uploadButtonWeight),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(uploadButtonTextTop) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          overflow: "hidden",
          marginBottom: String(0) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: "1px solid " + colorChip.shadow,
          marginTop: String(titleBottom) + ea,
          marginLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(0, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerAboutJs.prototype.insertWorkingBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, totalContents, entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, ajaxForm, equalJson, stringToLink, homeliaisonAnalytics } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      contents: [
        "디자이너님의 페이퍼워크 실력을 가장 잘 보여줄 수 있는 4개의 페이퍼워크 사진을 올려주세요! 각각의 이미지는 추천서에 노출되어 고객님께 어필하는 중요 포인트가 됩니다." + ((media[0] || media[1] || small) ? " 자신의 대표적인 4장의 작업물을 꼭 올려주세요!" : "")
      ],
    },
  ];
  const worksPhotoClassName = "worksPhotoClassName";
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let photoZone;
  let exampleUpZone;
  let exampleDownZone;
  let exampleZone;
  let profilePhotoZone;
  let profileWidth;
  let profileMarginLeft;
  let profileUploadButtonRight, profileUploadButtonWidth, profileUploadButtonHeight;
  let profileUploadButtonSize, profileUploadButtonWeight, profileUploadButtonTextTop;
  let exampleZoneWidth, exampleZoneMarginLeft;
  let exampleUpDownBetween;
  let exampleTextWidth, exampleTextSize, exampleTextWeight, exampleTextTextTop;
  let exampleFactorWidth, exampleFactorMargin;
  let goodBadSize, goodBadWeight, goodBadRight;
  let blankZone;
  let blankZoneWidth, blankZoneInnerBetween;
  let blankNumberSize, blankNumberWeight, blankNumberTop;
  let factorWidth;
  let exampleTextLeft;
  let worksFileInputEvent;
  let worksFileChainingInputEvent;
  let uploadButtonBottom;
  let uploadButtonWidth;
  let uploadButtonHeight;
  let uploadButtonSize;
  let uploadButtonWeight;
  let uploadButtonTextTop;
  let blockMarginTop;
  let mobilePhotoZonePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 14;
    whiteBottomMargin = 0;
  } else {
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;
  }

  titleFontSize = <%% 21, 21, 18, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 15, 14, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 13, 12, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  profileWidth = <%% 259, 259, 259, 240, 47 %%>;
  profileMarginLeft = <%% 24, 24, 24, 24, 24 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 46, 46, 46, 46 %%>;
  profileUploadButtonHeight = <%% 20, 20, 20, 20, 20 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 10 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  exampleZoneWidth = <%% 290, 0, 0, 232, 29 %%>;
  if (normalMode) {
    exampleZoneMarginLeft = 24;
  } else {
    exampleZoneMarginLeft = <%% 72, 36, 30, 30, 30 %%>;
  }
  exampleUpDownBetween = <%% 18, 18, 18, 18, 18 %%>;

  exampleTextWidth = <%% 70, 70, 70, 70, 66 %%>;
  exampleTextSize = <%% 14, 14, 14, 12, 2.5 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% 0, 0, 0, 0, 0 %%>;
  exampleTextLeft = <%% -48, -48, -48, -48, -48 %%>;

  exampleFactorWidth = <%% 190, 190, 190, 156, 33 %%>;
  exampleFactorMargin = <%% 28, 28, 28, 28, 2 %%>;

  goodBadSize = <%% 12, 12, 12, 12, 12 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 500 %%>;
  goodBadRight = <%% -15, -15, -15, -15, -15 %%>;

  blankZoneWidth = <%% 770 - exampleZoneWidth, 480, 480, 410, 0 %%>;
  blankZoneInnerBetween = <%% 6, 6, 5, 4, 1 %%>;

  blankNumberSize = 36;
  blankNumberWeight = 500;
  blankNumberTop = -2;

  factorWidth = 272;

  uploadButtonBottom = <%% 3, 3, 2, 2, 0.7 %%>;
  uploadButtonWidth = <%% 56, 56, 50, 50, 12.5 %%>;
  uploadButtonHeight = <%% 24, 24, 21, 21, 4.5 %%>;
  uploadButtonSize = <%% 12, 12, 11, 10, 2.5 %%>;
  uploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  uploadButtonTextTop = <%% -2, -2, -2, -2, -0.3 %%>;

  blockMarginTop = <%% 0, 0, 0, 30, 2.1 %%>;

  mobilePhotoZonePadding = 6;

  this.whiteMargin = (desktop ? margin : 0);

  worksFileInputEvent = (index) => {
    return async function (e) {
      try {
        let formData;
        let response;
        let imageJson;
        let width;
        let height;
        let widthHeightArr;
        let garoBoo;
        let thisExe;
        let responseObj;
        let imageTarget;
        let imageSecond;
        let whiteLoading;

        formData = await GeneralJs.promptFile(String(index + 1) + "번 자리에 들어갈 작업 사진을 올려주세요!");

        if (formData !== null) {

          whiteLoading = instance.mother.whiteProgressLoading(null, true);

          thisExe = formData.get("exe");
          response = await ajaxForm(formData, BRIDGEHOST + "/imageAnalytics");
          imageJson = equalJson(response);
          ({ width, height } = imageJson.geometry);

          widthHeightArr = [ width, height ];
          widthHeightArr.sort((a, b) => { return a - b; });

          whiteLoading.remove();

          if (widthHeightArr[0] < 1000) {
            window.alert("사진의 크기는 가로 크기와 세로 크기 모두 최소 1000px 이상이여야 합니다!");
          } else {

            garoBoo = (width >= height);
            formData.append("gs", garoBoo ? "g" : "s");
            formData.append("desid", instance.designer.desid);
            formData.append("index", index);

            whiteLoading = instance.mother.whiteProgressLoading();

            await instance.sendChecklistLog({
              mode: "work",
              data: {
                date: new Date(),
                desid: instance.designer.desid,
                designer: instance.designer.designer,
                entireMode: entireMode,
                gs: (garoBoo ? "g" : "s"),
                exe: thisExe,
                index: index,
              }
            });

            response = await ajaxForm(formData, BRIDGEHOST + "/designerWorksPhoto", whiteLoading.progress.firstChild);
            responseObj = equalJson(response);

            whiteLoading.remove();

            if (!entireMode) {
              await homeliaisonAnalytics({
                page: instance.pageName,
                standard: instance.firstPageViewTime,
                action: "workPhotoUpload",
                data: {
                  desid: instance.designer.desid,
                  date: new Date(),
                  gs: (garoBoo ? "g" : "s"),
                  exe: thisExe,
                  index: index,
                }
              });
            }

            responseObj.link = stringToLink(responseObj.link);

            instance.worksListTarget[index] = responseObj;
            imageTarget = document.querySelector('.' + worksPhotoClassName + String(index));
            imageTarget.style.backgroundImage = "url('" + instance.worksListTarget[index].link + "')";
            imageTarget.style.backgroundPosition = String(instance.worksListTarget[index].position.x) + "%" + " " + String(instance.worksListTarget[index].position.y) + "%";
            imageTarget.style.backgroundSize = String(instance.worksListTarget[index].size) + "% auto";
            imageTarget.style.opacity = String(1);

            return responseObj;

          }

          return null;
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }

  worksFileChainingInputEvent = async function (e) {
    try {
      const worksFunction0 = worksFileInputEvent(0);
      const worksFunction1 = worksFileInputEvent(1);
      const worksFunction2 = worksFileInputEvent(2);
      const worksFunction3 = worksFileInputEvent(3);
      let result;

      result = await worksFunction0(e);
      if (result !== null) {
        result = await worksFunction1(e);
        if (result !== null) {
          result = await worksFunction2(e);
          if (result !== null) {
            result = await worksFunction3(e);
          }
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? ("0px 5px 12px -10px " + colorChip.gray5) : "",
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

  photoZone = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      flexDirection: desktop ? "row" : "column",
      position: "relative",
      width: big ? String(blankZoneWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft) + ea : (desktop ? withOut(0, ea) : withOut(mobilePhotoZonePadding * 2, ea)),
      height: desktop ? String(profileWidth) + ea : "",
      padding: desktop ? "" : String(mobilePhotoZonePadding) + ea,
      paddingTop: desktop ? "" : String(7.5) + ea,
    }
  });

  blankZone = createNode({
    mother: photoZone,
    style: {
      display: desktop ? "inline-block" : "block",
      position: "relative",
      width: desktop ? String(blankZoneWidth) + ea : withOut(0, ea),
      height: desktop ? withOut(0, ea) : String(profileWidth) + ea,
    }
  });

  for (let i = 0; i < 4; i++) {
    createNode({
      mother: blankZone,
      class: [ worksPhotoClassName + String(i) ],
      attribute: {
        index: String(i),
      },
      event: {
        click: worksFileInputEvent(i),
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)",
        height: "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)",
        marginBottom: String(i / 2 < 1 ? blankZoneInnerBetween : 0) + ea,
        marginRight: String(i % 2 === 1 ? 0 : blankZoneInnerBetween) + ea,
        backgroundColor: colorChip.green,
        backgroundImage: instance.worksListTarget[i] === null ? "" : "url('" + instance.worksListTarget[i].link + "')",
        backgroundPosition: instance.worksListTarget[i] === null ? "50% 50%" : String(instance.worksListTarget[i].position.x) + "%" + " " + String(instance.worksListTarget[i].position.y) + "%",
        backgroundSize: instance.worksListTarget[i] === null ? "" : String(instance.worksListTarget[i].size) + "% auto",
        opacity: instance.worksListTarget[i] === null ? String(0.5) : String(1),
        borderRadius: String(5) + "px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      },
      child: {
        text: String(i + 1),
        style: {
          display: instance.worksListTarget[i] === null ? "inline-block" : "none",
          fontSize: String(blankNumberSize) + ea,
          fontWeight: String(blankNumberWeight),
          color: colorChip.liteGreen,
          position: "relative",
          fontFamily: "graphik",
          fontStyle: "italic",
          top: String(blankNumberTop) + ea,
        }
      }
    })
  }
  
  if (mobile) {
    createNode({
      mother: photoZone,
      style: {
        display: "block",
        position: "relative",
        height: String(4) + ea,
        marginBottom: String(4) + ea,
        borderBottom: "1px dashed " + colorChip.gray3,
      }
    });
  }

  exampleZone = createNode({
    mother: photoZone,
    style: {
      display: (media[0] || small) ? (desktop ? "inline-flex" : "flex") : "none",
      position: "relative",
      width: desktop ? String(exampleZoneWidth) + ea : withOut(0, ea),
      height: desktop ? withOut(0, ea) : "",
      flexDirection: desktop ? "column" : "row",
      alignItems: desktop ? "end" : "start",
      justifyContent: "start",
    }
  });

  if (mobile) {
    createNode({
      mother: exampleZone,
      text: "<예시>",
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(exampleTextSize) + ea,
        fontWeight: String(exampleTextWeight),
        color: colorChip.black,
        width: String(8) + ea,
      }
    })
  }

  createNode({
    mother: exampleZone,
    style: {
      display: "flex",
      position: "relative",
      width: String(exampleFactorWidth) + ea,
      height: desktop ? "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)" : String(24) + ea,
      marginBottom: desktop ? String(blankZoneInnerBetween) + ea : "",
      marginRight: desktop ? "" : String(exampleFactorMargin) + ea,
      backgroundImage: "url('" + DesignerAboutJs.binaryPath + "/bestExample.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: "auto 100%",
      borderRadius: String(5) + "px",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    child: {
      text: "<예시>",
      style: {
        display: desktop ? "inline-block" : "none",
        position: "absolute",
        fontSize: String(exampleTextSize) + ea,
        fontWeight: String(exampleTextWeight),
        color: colorChip.black,
        top: String(0) + ea,
        left: String(exampleTextLeft) + ea,
      }
    }
  });

  createNode({
    mother: exampleZone,
    style: {
      display: "flex",
      position: "relative",
      width: String(exampleFactorWidth) + ea,
      height: desktop ? "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)" : String(24) + ea,
      backgroundImage: "url('" + DesignerAboutJs.binaryPath + "/bestExample2.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: "auto 100%",
      borderRadius: String(5) + "px",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }
  });

  block = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(blankZoneWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft, ea) : "",
      verticalAlign: "bottom",
      marginTop: big ? "" : String(blockMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginBottom: desktop ? "" : String(1.5) + ea,
          marginTop: desktop ? "" : String(1) + ea,
        },
        children: [
          {
            text: "페이퍼워크 업로드",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            event: {
              click: worksFileChainingInputEvent,
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(uploadButtonBottom) + ea,
              right: desktop ? String(0) + ea : String(mobilePaddingLeft) + ea,
              width: String(uploadButtonWidth) + ea,
              height: String(uploadButtonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: "upload",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(uploadButtonSize) + ea,
                fontWeight: String(uploadButtonWeight),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(uploadButtonTextTop) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          overflow: "hidden",
          marginBottom: String(0) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: "1px solid " + colorChip.shadow,
          marginTop: String(titleBottom) + ea,
          marginLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(0, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }


}

DesignerAboutJs.prototype.insertIntroduceBox = function () {
  const instance = this;
  const mother = this.mother;
  const { designer, ea, baseTong, media, totalContents, entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, fireEvent, homeliaisonAnalytics, equalJson } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const photoWithWordsClassName = "photoWithWordsClassName";
  const mainContents = [
    {
      contents: [
        "디자이너님이 홈리에종 홈페이지와 추천서에 소개되는 모습입니다. 프로필 사진 옆에 있는 소개글을 클릭하여 디자이너님만의 소개글로 작성해주세요! 고객님들께서 보시게 되는 디자이너님의 첫 인상입니다."
      ],
    },
  ];
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let photoZone;
  let exampleUpZone;
  let exampleDownZone;
  let exampleZone;
  let profilePhotoZone;
  let profileWidth;
  let profileMarginLeft;
  let profileUploadButtonRight, profileUploadButtonWidth, profileUploadButtonHeight;
  let profileUploadButtonSize, profileUploadButtonWeight, profileUploadButtonTextTop;
  let exampleZoneWidth, exampleZoneMarginLeft;
  let exampleUpDownBetween;
  let exampleTextWidth, exampleTextSize, exampleTextWeight, exampleTextTextTop;
  let exampleFactorWidth, exampleFactorMargin;
  let goodBadSize, goodBadWeight, goodBadRight;
  let introductionSize, introductionWeight;
  let leftTotalWidth;
  let leftTotalMarginRight;
  let designerNameHeight, designerNameMarginTop, designerNameMarginBottom;
  let introductionFocusEvent;
  let introductionBlurEvent;
  let uploadButtonBottom;
  let uploadButtonWidth;
  let uploadButtonHeight;
  let uploadButtonSize;
  let uploadButtonWeight;
  let uploadButtonTextTop;
  let blockMarginTop;
  let mobilePhotoZonePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 52;
    whiteBottomMargin = 0;
  } else {
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;
  }

  titleFontSize = <%% 21, 21, 18, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 15, 14, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 13, 12, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  profileWidth = <%% 160, 154, 140, 120, 36 %%>;
  profileMarginLeft = <%% 34, 30, 24, 24, 2 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 46, 46, 46, 46 %%>;
  profileUploadButtonHeight = <%% 20, 20, 20, 20, 20 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 10 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  exampleZoneWidth = <%% 511, 511, 511, 511, 511 %%>;
  exampleZoneMarginLeft = <%% 72, 72, 72, 72, 72 %%>;
  exampleUpDownBetween = <%% 18, 18, 18, 18, 18 %%>;

  exampleTextWidth = <%% 70, 70, 70, 70, 66 %%>;
  exampleTextSize = <%% 13, 13, 13, 13, 13 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% -1, -1, -1, -1, -1 %%>;

  exampleFactorWidth = <%% 115, 115, 115, 115, 115 %%>;
  exampleFactorMargin = <%% 29, 29, 29, 29, 29 %%>;

  goodBadSize = <%% 12, 12, 12, 12, 12 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 500 %%>;
  goodBadRight = <%% -14, -14, -14, -14, -14 %%>;

  introductionSize = <%% 14.5, 13, 13, 13, 3.2 %%>;
  introductionWeight = <%% 400, 400, 400, 400, 400 %%>;

  leftTotalWidth = <%% 770, 480, 480, 444, 770 %%>;
  if (normalMode) {
    leftTotalMarginRight = 48;
  } else {
    leftTotalMarginRight = <%% 96, 60, 54, 60, 96 %%>;
  }

  designerNameHeight = <%% 34, 34, 34, 34, 34 %%>;
  designerNameMarginTop = <%% 7, 7, 7, 9, 4 %%>;
  designerNameMarginBottom = <%% 4, 6, 0, 0, 1 %%>;

  uploadButtonBottom = <%% 3, 3, 2, 2, 0.7 %%>;
  uploadButtonWidth = <%% 56, 56, 50, 50, 12.5 %%>;
  uploadButtonHeight = <%% 24, 24, 21, 21, 4.5 %%>;
  uploadButtonSize = <%% 12, 12, 11, 10, 2.5 %%>;
  uploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  uploadButtonTextTop = <%% -2, -2, -2, -2, -0.3 %%>;

  blockMarginTop = <%% 0, 0, 0, 30, 4 %%>;

  mobilePhotoZonePadding = 6;

  this.whiteMargin = (desktop ? margin : 0);

  introductionFocusEvent = () => {
    return async function (e) {
      try {
        this.value = this.value.trim().replace(/[\=\&\+\#\$\(\)]/gi, '');
        this.style.color = colorChip.green;
      } catch (e) {
        console.log(e);
      }
    }
  }
  introductionBlurEvent = () => {
    return async function (e) {
      const pastValue = equalJson(JSON.stringify(instance.designer.setting.front.introduction.desktop));
      const originalValue = instance.designer.setting.front.introduction.desktop.join("\n");
      try {
        const minimum = 80;
        const maximum = 200;
        let whereQuery, updateQuery;

        this.value = this.value.trim().replace(/[\=\&\+\#\$\(\)]/gi, '');
        this.style.color = colorChip.black;

        if (this.value.length < minimum) {
          throw new Error(String(minimum) + "자 이상, " + String(maximum) + "자 이하로 작성해주세요!");
        }
        if (this.value.length > maximum) {
          throw new Error(String(minimum) + "자 이상, " + String(maximum) + "자 이하로 작성해주세요!");
        }

        whereQuery = { desid: instance.designer.desid };
        updateQuery = {};
        updateQuery["setting.front.introduction.desktop"] = this.value.split("\n").map((str) => { return str.trim() });
        updateQuery["setting.front.introduction.mobile"] = this.value.split("\n").map((str) => { return str.trim() });

        await instance.sendChecklistLog({
          mode: "introduction",
          data: {
            date: new Date(),
            desid: instance.designer.desid,
            designer: instance.designer.designer,
            entireMode: entireMode,
            type: "long",
            property: "소개글",
            column: "setting.front.introduction",
            pastValue: pastValue,
            value: updateQuery["setting.front.introduction.desktop"]
          }
        });

        await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
        instance.designer.setting.front.introduction.desktop = updateQuery["setting.front.introduction.desktop"];
        instance.designer.setting.front.introduction.mobile = updateQuery["setting.front.introduction.mobile"];

        if (!entireMode) {
          await homeliaisonAnalytics({
            page: instance.pageName,
            standard: instance.firstPageViewTime,
            action: "profileIntroductionUpdate",
            data: {
              desid: instance.designer.desid,
              date: new Date(),
            }
          });
        }

      } catch (e) {
        window.alert(e.message);
        this.value = originalValue;
      }
    }
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? ("0px 5px 12px -10px " + colorChip.gray5) : "",
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

  photoZone = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      flexDirection: desktop ? "row" : "column",
      position: "relative",
      width: big ? String(leftTotalWidth) + ea : (desktop ? withOut(0, ea) : withOut(mobilePhotoZonePadding * 2, ea)),
      height: desktop ? String(profileWidth) + ea : "",
      marginRight: desktop ? String(leftTotalMarginRight) + ea : "",
      padding: desktop ? "" : String(mobilePhotoZonePadding) + ea,
      paddingTop: desktop ? "" : String(7.5) + ea,
      alignItems: desktop ? "" : "center",
      paddingBottom: desktop ? "" : String(3) + ea,
    }
  });

  profilePhotoZone = createNode({
    mother: photoZone,
    style: {
      display: "inline-flex",
      flexDirection: "row",
      position: "relative",
      width: String(profileWidth) + ea,
      height: desktop ? withOut(0, ea) : String(profileWidth) + ea,
      marginRight: String(profileMarginLeft) + ea,
      paddingLeft: String(profileWidth / 2) + ea,
    },
    child: {
      class: [ photoWithWordsClassName ],
      style: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: String(profileWidth) + ea,
        height: withOut(0, ea),
        borderRadius: String(profileWidth) + ea,
        backgroundImage: "url('" + instance.profilePhoto + "')",
        backgroundPosition: instance.profileTarget === null ? "50% 50%" : String(instance.profileTarget.position.x) + "%" + " " + String(instance.profileTarget.position.y) + "%",
        backgroundSize: instance.profileTarget === null ? "auto 102%" : (instance.profileTarget.gs === "g" ? "auto " + String(instance.profileTarget.size) + "%" : String(instance.profileTarget.size) + "% auto"),
        zIndex: String(2),
        opacity: instance.profileTarget === null ? String(0.5) : String(1),
      }
    }
  });

  createNode({
    mother: (desktop ? photoZone : profilePhotoZone),
    style: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      width: String(profileWidth) + ea,
      height: withOut(0, ea),
      borderRadius: String(profileWidth) + ea,
      backgroundImage: "url('" + FRONTHOST + "/list_image/portp" + instance.designer.setting.front.photo.porlid + "/" + instance.designer.setting.front.photo.index + instance.designer.setting.front.photo.porlid + ".jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: "auto 102%",
      left: String(0) + ea,
      top: String(0),
      opacity: String(0.7),
    }
  });

  createNode({
    mother: (desktop ? photoZone : profilePhotoZone),
    style: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      width: String(profileWidth) + ea,
      height: withOut(0, ea),
      borderRadius: String(profileWidth) + ea,
      background: colorChip.gradientGreen,
      "mix-blend-mode": "multiply",
      left: String(0) + ea,
      top: String(0),
    }
  });

  createNode({
    mother: photoZone,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: desktop ? "start" : "center",
      width: desktop ? withOut(profileWidth, ea) : withOut(4, ea),
      height: desktop ? String(profileWidth) + ea : "",
    },
    children: [
      {
        text: designer.designer,
        style: {
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          lineHeight: String(1.6),
          marginTop: String(designerNameMarginTop) + ea,
          marginBottom: String(designerNameMarginBottom) + ea,
          height: desktop ? String(designerNameHeight) + ea : "",
        }
      },
      {
        mode: "textarea",
        text: designer.setting.front.introduction.desktop.join(media[0] ? "\n" : " "),
        event: {
          focus: introductionFocusEvent(),
          blur: introductionBlurEvent(),
          keydown: function (e) {
            if (e.key === "Tab") {
              e.preventDefault();
              fireEvent(this, "blur");
            }
          }
        },
        style: {
          fontSize: String(introductionSize) + ea,
          fontWeight: String(introductionWeight),
          color: colorChip.black,
          lineHeight: String(1.6),
          border: String(0),
          outline: String(0),
          width: withOut(0, ea),
          textAlign: desktop ? "left" : "center",
          height: desktop ? String(profileWidth - designerNameHeight) + ea : String(30) + ea,
        }
      },
      {
        style: {
          display: media[0] ? "inline-block" : "none",
          position: "absolute",
          bottom: String(0),
          left: String(0),
          width: String(30) + ea,
          height: String(0),
          borderBottom: "1px solid " + colorChip.black,
        }
      }
    ]
  })

  block = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftTotalWidth + leftTotalMarginRight, ea) : withOut(0, ea),
      verticalAlign: "bottom",
      marginTop: big ? "" : (desktop ? String(blockMarginTop) + ea : ""),
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : "",
          zIndex: mobile ? String(1) : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginBottom: desktop ? "" : String(1.5) + ea,
          marginTop: desktop ? "" : String(1) + ea,
        },
        children: [
          {
            text: "소개글 작성",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            event: {
              click: function (e) {
                fireEvent(photoZone.querySelector("textarea"), "focus");
              }
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(uploadButtonBottom) + ea,
              right: desktop ? String(0) + ea : String(mobilePaddingLeft) + ea,
              width: String(uploadButtonWidth) + ea,
              height: String(uploadButtonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: "edit",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(uploadButtonSize) + ea,
                fontWeight: String(uploadButtonWeight),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(uploadButtonTextTop) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          overflow: "hidden",
          marginBottom: String(0) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: "1px solid " + colorChip.shadow,
          marginTop: String(titleBottom) + ea,
          marginLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(0, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerAboutJs.prototype.insertThreeStrongBox = function () {
  const instance = this;
  const mother = this.mother;
  const { designer, ea, baseTong, media, totalContents, entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, fireEvent, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const photoWithWordsClassName = "photoWithWordsClassName";
  const strengthUpdateEventInputClassName = "strengthUpdateEventInputClassName";
  const mainContents = [
    {
      contents: [
        "디자이너님에 대해서 추천서에 설명할 때, 디자이너님의 강점 3가지에 대해서 설명하는 내용입니다. 각각의 글을 클릭하셔서 디자이너님을 잘 표현할 수 있는 강점들을 적어주세요!"
      ],
    },
  ];
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let descriptionZone;
  let exampleUpZone;
  let exampleDownZone;
  let exampleZone;
  let profilePhotoZone;
  let profileWidth;
  let profileMarginLeft;
  let profileUploadButtonRight, profileUploadButtonWidth, profileUploadButtonHeight;
  let profileUploadButtonSize, profileUploadButtonWeight, profileUploadButtonTextTop;
  let exampleZoneWidth, exampleZoneMarginLeft;
  let exampleUpDownBetween;
  let exampleTextWidth, exampleTextSize, exampleTextWeight, exampleTextTextTop;
  let exampleFactorWidth, exampleFactorMargin;
  let goodBadSize, goodBadWeight, goodBadRight;
  let introductionSize, introductionWeight;
  let leftTotalWidth;
  let leftTotalMarginRight;
  let designerNameHeight, designerNameMarginTop, designerNameMarginBottom;
  let introductionFocusEvent;
  let introductionBlurEvent;
  let uploadButtonBottom;
  let uploadButtonWidth;
  let uploadButtonHeight;
  let uploadButtonSize;
  let uploadButtonWeight;
  let uploadButtonTextTop;
  let blockMarginTop;
  let mobilePhotoZonePadding;
  let factorHeight;
  let factorBetween;
  let factorNumbersSize, factorNumbersWeight, factorNumbersTextTop;
  let factorDescriptionTextIndent, factorDescriptionTextTop, factorDescriptionSize, factorDescriptionWeight;
  let strengthUpdateEvent;
  let factorDoms;
  let factorDom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 52;
    whiteBottomMargin = 0;
  } else {
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;
  }

  titleFontSize = <%% 21, 21, 18, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), (isMac() ? 9 : 7), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 15, 14, 3 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 13, 12, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  profileWidth = <%% 160, 154, 140, 120, 36 %%>;
  profileMarginLeft = <%% 34, 30, 24, 24, 2 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 46, 46, 46, 46 %%>;
  profileUploadButtonHeight = <%% 20, 20, 20, 20, 20 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 10 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  exampleZoneWidth = <%% 511, 511, 511, 511, 511 %%>;
  exampleZoneMarginLeft = <%% 72, 72, 72, 72, 72 %%>;
  exampleUpDownBetween = <%% 18, 18, 18, 18, 18 %%>;

  exampleTextWidth = <%% 70, 70, 70, 70, 66 %%>;
  exampleTextSize = <%% 13, 13, 13, 13, 13 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% -1, -1, -1, -1, -1 %%>;

  exampleFactorWidth = <%% 115, 115, 115, 115, 115 %%>;
  exampleFactorMargin = <%% 29, 29, 29, 29, 29 %%>;

  goodBadSize = <%% 12, 12, 12, 12, 12 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 500 %%>;
  goodBadRight = <%% -14, -14, -14, -14, -14 %%>;

  introductionSize = <%% 14.5, 13, 13, 13, 3.2 %%>;
  introductionWeight = <%% 400, 400, 400, 400, 400 %%>;

  leftTotalWidth = <%% 770, 480, 480, 444, 770 %%>;
  if (normalMode) {
    leftTotalMarginRight = 48;
  } else {
    leftTotalMarginRight = <%% 96, 60, 54, 60, 96 %%>;
  }

  designerNameHeight = <%% 34, 34, 34, 34, 34 %%>;
  designerNameMarginTop = <%% 7, 7, 7, 9, 4 %%>;
  designerNameMarginBottom = <%% 4, 6, 0, 0, 1 %%>;

  uploadButtonBottom = <%% 3, 3, 2, 2, 0.7 %%>;
  uploadButtonWidth = <%% 56, 56, 50, 50, 12.5 %%>;
  uploadButtonHeight = <%% 24, 24, 21, 21, 4.5 %%>;
  uploadButtonSize = <%% 12, 12, 11, 10, 2.5 %%>;
  uploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  uploadButtonTextTop = <%% -2, -2, -2, -2, -0.3 %%>;

  blockMarginTop = <%% 0, 0, 0, 30, 4 %%>;

  factorHeight = <%% 48, 47, 44, 36, 9 %%>;
  factorBetween = <%% 6, 4, 3, 2, 1 %%>;

  factorNumbersSize = <%% 17, 16, 15, 14, 3.4 %%>;
  factorNumbersWeight = <%% 500, 500, 500, 500, 500 %%>;
  factorNumbersTextTop = <%% -1, -1, -1, -1, -0.2 %%>;

  factorDescriptionTextIndent = <%% 16, 14, 13, 13, 3 %%>;
  factorDescriptionTextTop = <%% (isMac() ? -1 : 2), (isMac() ? -1 : 2), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;
  factorDescriptionSize = <%% 16, 15, 14, 13, 3.2 %%>;
  factorDescriptionWeight = <%% 300, 300, 300, 300, 300 %%>;

  mobilePhotoZonePadding = 6;

  this.whiteMargin = (desktop ? margin : 0);

  strengthUpdateEvent = (index) => {
    return async function (e) {
      try {
        const self = this;
        const zIndex = 4;
        const i = index;
        const designer = instance.designer;
        const original = designer.setting.description[i];
        const desid = instance.designer.desid;
        let cancelBack;
        let updateInput;

        cancelBack = createNode({
          mother: self,
          class: [ strengthUpdateEventInputClassName ],
          event: {
            click: function (e) {
              e.stopPropagation();
              removeByClass(strengthUpdateEventInputClassName);
            }
          },
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

        updateInput = createNode({
          mother: self,
          mode: "input",
          class: [ strengthUpdateEventInputClassName ],
          event: {
            click: function (e) {
              e.stopPropagation();
            },
            keydown: function (e) {
              if (e.key === "Tab") {
                e.preventDefault();
              }
            },
            keyup: function (e) {
              if (e.key === "Tab" || e.key === "Enter") {
                this.value = this.value.replace(/[\n\t\\\/\(\)\#\=\+\&\*\<\>\[\]\{\}]/gi, '').replace(/  /gi, ' ').trim();
                this.blur();
              }
            },
            blur: async function (e) {
              try {
                const index = Number(this.getAttribute("index"));
                const pastValue = instance.designer.setting.description[index];
                this.value = this.value.replace(/[\n\t\\\/\(\)\#\=\+\&\*\<\>\[\]\{\}]/gi, '').replace(/  /gi, ' ').trim();
                const finalValue = this.value;
                const desid = this.getAttribute("desid");
                let whereQuery, updateQuery;
                self.firstChild.firstChild.firstChild.textContent = finalValue;
                instance.designer.setting.description[index] = finalValue;
                whereQuery = { desid };
                updateQuery = {};
                updateQuery["setting.description." + String(index)] = finalValue;

                await instance.sendChecklistLog({
                  mode: "strong",
                  data: {
                    date: new Date(),
                    desid: desid,
                    designer: instance.designer.designer,
                    entireMode: entireMode,
                    type: "long",
                    property: "강점",
                    column: "setting.description." + String(index),
                    pastValue: pastValue,
                    value: finalValue,
                    index: index,
                  }
                });

                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

                if (!entireMode) {
                  await homeliaisonAnalytics({
                    page: instance.pageName,
                    standard: instance.firstPageViewTime,
                    action: "threeStrongUpdate",
                    data: {
                      desid: instance.designer.desid,
                      date: new Date(),
                      designer: instance.designer.designer,
                      index: index,
                      type: "long",
                      property: "강점",
                      column: "setting.description." + String(index),
                      pastValue: pastValue,
                      value: finalValue,
                      index: index,
                    }
                  });
                }

                removeByClass(strengthUpdateEventInputClassName);
              } catch (e) {
                console.log(e);
              }
            }
          },
          attribute: {
            type: "text",
            index: String(i),
            desid: desid,
          },
          style: {
            display: "block",
            position: "absolute",
            top: String(factorDescriptionTextTop) + ea,
            left: String(factorDescriptionTextIndent) + ea,
            width: withOut(factorDescriptionTextIndent, ea),
            height: withOut(0, ea),
            fontSize: String(factorDescriptionSize) + ea,
            fontWeight: String(factorDescriptionWeight),
            color: colorChip.green,
            border: String(0),
            outline: String(0),
            background: colorChip.gray0,
            zIndex: String(zIndex),
          }
        })

        updateInput.value = original;
        updateInput.focus();

      } catch (e) {
        console.log(e);
      }
    }
  }

  whiteBlock = createNode({
    mother: entireMode ? totalContents : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? ("0px 5px 12px -10px " + colorChip.gray5) : "",
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

  descriptionZone = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-flex" : "flex",
      flexDirection: "column",
      position: "relative",
      width: big ? String(leftTotalWidth) + ea : (desktop ? withOut(0, ea) : withOut(mobilePhotoZonePadding * 2, ea)),
      height: desktop ? String(profileWidth) + ea : "",
      marginRight: desktop ? String(leftTotalMarginRight) + ea : "",
      padding: desktop ? "" : String(mobilePhotoZonePadding) + ea,
      paddingTop: desktop ? "" : String(7) + ea,
      alignItems: desktop ? "" : "center",
      paddingBottom: desktop ? "" : String(5) + ea,
    }
  });

  factorDoms = [];
  for (let i = 0; i < 3; i++) {
    factorDom = createNode({
      mother: descriptionZone,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        position: "relative",
        width: withOut(0, ea),
        height: String(factorHeight) + ea,
        marginBottom: String(i === 3 - 1 ? 0 : factorBetween) + ea,
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(factorHeight) + ea,
            height: String(factorHeight) + ea,
            background: colorChip.gray1,
            borderRadius: String(5) + "px",
            marginRight: String(factorBetween) + ea,
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: String(i + 1),
            style: {
              display: "inline-block",
              fontSize: String(factorNumbersSize) + ea,
              fontWeight: String(factorNumbersWeight),
              position: "relative",
              top: String(factorNumbersTextTop) + ea,
              fontFamily: "graphik",
              fontStyle: "italic",
              color: colorChip.green,
            }
          }
        },
        {
          attribute: {
            index: String(i),
          },
          event: {
            click: strengthUpdateEvent(i),
          },
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(factorHeight + factorBetween + factorDescriptionTextIndent, ea),
            height: String(factorHeight) + ea,
            background: colorChip.gray0,
            borderRadius: String(5) + "px",
            justifyContent: "start",
            alignItems: "center",
            paddingLeft: String(factorDescriptionTextIndent) + ea,
          },
          child: {
            style: {
              color: colorChip.black,
              width: withOut(factorDescriptionTextIndent, ea),
              overflow: "scroll",
            },
            child: {
              text: designer.setting.description[i],
              style: {
                position: "relative",
                top: String(factorDescriptionTextTop) + ea,
                fontSize: String(factorDescriptionSize) + ea,
                fontWeight: String(factorDescriptionWeight),
                color: colorChip.black,
                width: String(desktop ? 1000 : 200) + ea,
              },
            }
          }
        },
      ]
    });
    factorDoms.push(factorDom);
  }

  block = createNode({
    mother: whiteTong,
    style: {
      display: big ? "inline-block" : "block",
      position: "relative",
      width: big ? withOut(leftTotalWidth + leftTotalMarginRight, ea) : withOut(0, ea),
      verticalAlign: "bottom",
      marginTop: big ? "" : (desktop ? String(blockMarginTop) + ea : ""),
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : "",
          zIndex: mobile ? String(1) : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginBottom: desktop ? "" : String(1.5) + ea,
          marginTop: desktop ? "" : String(1) + ea,
        },
        children: [
          {
            text: "3가지 강점 작성",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: colorChip.white,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            event: {
              click: function (e) {
                fireEvent(factorDoms[0].children[1], "click");
              }
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(uploadButtonBottom) + ea,
              right: desktop ? String(0) + ea : String(mobilePaddingLeft) + ea,
              width: String(uploadButtonWidth) + ea,
              height: String(uploadButtonHeight) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            },
            child: {
              text: "edit",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(uploadButtonSize) + ea,
                fontWeight: String(uploadButtonWeight),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(uploadButtonTextTop) + ea,
              }
            }
          }
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          overflow: "hidden",
          marginBottom: String(0) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: "1px solid " + colorChip.shadow,
          marginTop: String(titleBottom) + ea,
          marginLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          marginRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(6.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(0, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerAboutJs.prototype.insertRepresentativeBox = async function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project, targetHref, totalContents, entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const veryBig = (media[0] || media[1]);
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, isIphone, removeByClass, homeliaisonAnalytics, downloadFile } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const fileNameClassName = "fileNameClassName";
  const filePannelDateClassName = "filePannelDateClassName";
  const filePannelCircleClassName = "filePannelCircleClassName";
  const whiteContextmenuClassName = "whiteContextmenuClassName";
  try {
    const mainContents = [
      {
        title: "대표 작업물 업로드",
        contents: [
          "각 영역별로 디자이너님의 페이퍼워크 실력을 잘 보여줄 수 있는 작업물을 파일 형태(pdf 권장)으로 올려주세요! 해당 파일은 홈리에종이 디자이너님을 이해하고, 고객님께 디자이너님을 어필하는 중요한 근거가 됩니다.",
        ],
      },
    ];
    let paddingTop;
    let block;
    let whiteBlock, whiteTong;
    let bottomMargin;
    let titleFontSize;
    let num, num2;
    let numberRight;
    let titleTop, titleTopNumber;
    let titleBottom;
    let index;
    let mobileTitleLeft, mobileTitleTop;
    let secondBlockWidth, secondBlockMargin;
    let tong;
    let contentsWordingSize;
    let contentsBottom;
    let whiteBottomMargin;
    let contentsTitleMarginTop, contentsMarginTop;
    let contentsPaddingLeft;
    let arrowWidth;
    let arrowTop;
    let arrorLeft;
    let bigNumberSize;
    let bigNumberBetween;
    let bigNumberMargin;
    let bigNumberBetweenMargin;
    let matrix;
    let firstWidth, secondWidth, secondMarginRight;
    let contentsAreaPaddingTop;
    let zeroWidth, zeroMarginRight;
    let checkBoxWidth, checkBoxTop;
    let arrowBoxWidth, arrowBoxTop;
    let contentsMarginBottom0, contentsMarginBottom1;
    let mobilePaddingLeft;
    let mobileContentsWordingSize;
    let wordings;
    let lineTop, linePadding;
    let panMother;
    let panMotherInnerPadding;
    let basePan;
    let panBetween;
    let panTitleBoxWidth;
    let panTitleBoxHeight;
    let contentsTextTop;
    let subButtonsBasePan;
    let subButtonPaddingRight;
    let subButtonSize;
    let subButtonWeight;
    let subButtonVisualTop;
    let subButtonPaddingBottom;
    let subButtonPaddingTop;
    let subButtonPaddingLeft;
    let subButtonsVisualTop;
    let contentsPan;
    let contentsPanPaddingTop;
    let contentsPanPaddingBottom;
    let itemBetween;
    let uploadCircleWidth;
    let uploadCirclePadding;
    let uploadIconWidth;
    let uploadIconTop;
    let linkIconWidth;
    let linkIconTop;
    let plusIconTop;
    let plusIconWidth;
    let panList;
    let panContentsWordingSize;
    let itemList;
    let mothers;
    let itemBlock;
    let itemTongHeight;
    let itemTongMarginLeft;
    let itemDivide;
    let textTop;
    let textSize;
    let textWeight;
    let titlePadding;
    let titlePannelWidth;
    let titlePannelBetween;
    let titleMaxWidth;
    let pannelSize;
    let pannelTextTop;
    let pannelCircleWidth;
    let pannelCircleBetween;
    let pannelCircleTop;
    let motherMatrix;
    let fileItemList;
    let setPanBlocks;
    let contextmenuEvent;
    let contextmenuPadding;
    let contextSize;
    let contextWidth;
    let contextHeight;
    let fileItemSelectEvent;
  
    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

    if (normalMode) {
      margin = 24;
      paddingTop = 52;
      whiteBottomMargin = 48;
    } else {
      margin = <%% 55, 55, 47, 39, 4.7 %%>;
      paddingTop = <%% 52, 52, 44, 36, 4.7 %%>;
      whiteBottomMargin = <%% 56, 54, 46, 38, 4.7 %%>;
    }
  
    titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
    numberRight = <%% 12, 12, 12, 12, 2 %%>;
  
    titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
    titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;
  
    titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
    contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6.5 %%>;
  
    mobileTitleLeft = 1.5;
    mobileTitleTop = -8.7;
  
    secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
    secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;
  
    contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
    contentsBottom = <%% -5, -5, -5, -5, 0 %%>;
  
    contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
    contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
    contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
    arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
    arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
    arrorLeft = <%% 1, 1, 1, 1, 0 %%>;
  
    bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
    bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
    bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
    bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;
  
    zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
    zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
    firstWidth = <%% 240, 240, 190, 170, 10 %%>;
    secondWidth = <%% 15, 15, 15, 15, 2 %%>;
    secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;
  
    checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
    arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
    checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
    arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;
  
    contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
    contentsMarginBottom1 = <%% 36, 36, 34, 32, 3 %%>;
  
    lineTop = <%% 10, 10, 10, 10, 10 %%>;
    linePadding = <%% 12, 12, 12, 12, 12 %%>;
  
    mobilePaddingLeft = 6;
  
    mobileContentsWordingSize = 3.2;
  
    panMotherInnerPadding = <%% 12, 12, 10, 8, 0 %%>;
    panBetween = <%% 8, 8, 8, 8, 1 %%>;
    panTitleBoxWidth = <%% 124, 120, 108, 96, 21 %%>;
    panTitleBoxHeight = <%% 52, 48, 40, 36, 8.2 %%>;
  
    panContentsWordingSize = <%% 15, 15, 13, 12, 2.9 %%>;
    contentsTextTop = <%% (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), (isMac() ? 0 : 1), -0.2 %%>;
  
    contentsBottom = <%% -5, -5, -5, -5, 0 %%>;
    subButtonPaddingRight = <%% 18, 18, 16, 12, 1.6 %%>;
    subButtonSize = <%% 12, 12, 11, 10, 2.4 %%>;
    subButtonWeight = <%% 800, 800, 800, 800, 800 %%>;
    subButtonVisualTop = <%% 3, 3, 2, 1, 0.3 %%>;
    subButtonPaddingBottom = <%% (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 6 : 5), (isMac() ? 5 : 4), (isIphone() ? 1.2 : 1.4) %%>;
    subButtonPaddingTop = <%% (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 4 : 6), (isMac() ? 3 : 5), (isIphone() ? 1.2 : 1.2) %%>;
    subButtonPaddingLeft = <%% 11, 11, 10, 9, 2 %%>;
    subButtonsVisualTop = <%% 2, 3, 3, 1, 0 %%>;
  
    contentsPanPaddingTop = <%% 18, 18, 16, 12, 3 %%>;
    contentsPanPaddingBottom = <%% 60, 60, 60, 54, 12 %%>;
    itemBetween = <%% 6, 6, 5, 4, 1 %%>;
  
    uploadCircleWidth = <%% 28, 28, 28, 24, 6 %%>;
    uploadCirclePadding = <%% 16, 16, 16, 12, 4 %%>;
    uploadIconWidth = <%% 13, 13, 13, 12, 3 %%>;
    uploadIconTop = <%% 0, 0, 0, 0, 0 %%>;
  
    linkIconWidth = <%% 15.5, 15.5, 15.5, 14, 3.4 %%>;
    linkIconTop = <%% 0, 0, 0, 0, 0 %%>;
  
    plusIconTop = <%% 0, 0, 0, 0, 0 %%>;
    plusIconWidth = <%% 14, 14, 13, 12, 3.2 %%>;
  
    itemTongHeight = <%% 40, 40, 36, 32, 8 %%>;
    itemTongMarginLeft = <%% 12, 12, 12, 10, 1 %%>;
    itemDivide = <%% 5, 4, 3, 3, 2 %%>;

    textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.3 %%>;
    textSize = <%% 14, 14, 13, 12, 2.7 %%>;
    textWeight = <%% 500, 500, 500, 500, 500 %%>;

    titlePadding = <%% 16, 16, 15, 14, 3.1 %%>;
    titlePannelWidth = <%% 54, 54, 50, 48, 9.8 %%>;
    titlePannelBetween = <%% 8, 8, 6, 4, 1 %%>;
    titleMaxWidth = <%% 1000, 1000, 900, 800, 100 %%>;

    pannelSize = <%% 12, 12, 11, 10, 2.5 %%>;
    pannelTextTop = <%% (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), (isMac() ? -1.5 : 0.5), -0.3 %%>;

    pannelCircleWidth = <%% 6, 6, 6, 5, 1.2 %%>;
    pannelCircleBetween = <%% 6, 6, 6, 5, 1.2 %%>;
    pannelCircleTop = <%% (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isMac() ? -1 : -0.5), (isIphone() ? -0.25 : -0.2) %%>;

    contextmenuPadding = <%% 8, 8, 7, 6, 1 %%>;
    contextSize = <%% 13, 13, 12, 11, 2.5 %%>;
    contextWidth = <%% 130, 130, 120, 100, 20 %%>;
    contextHeight = <%% 32, 32, 30, 28, 6 %%>;

    panList = [
      {
        title: "컨셉 제안서",
        key: "concept",
      },
      {
        title: "디자인 제안서",
        key: "design",
      },
      {
        title: "3D와 도면",
        key: "modeling",
      },
      {
        title: "시공 의뢰서",
        key: "construct",
      },
    ]

    setPanBlocks = () => {};

    fileItemSelectEvent = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.getAttribute("original");
      const key = this.getAttribute("key");
      const toggle = this.getAttribute("toggle");
      const hex = this.getAttribute("hex");
      const exe = this.getAttribute("exe");
      const type = this.getAttribute("type");
      if (toggle === "off") {
        this.style.background = colorChip.green;
        this.querySelector('.' + fileNameClassName).style.color = colorChip.white;
        this.querySelector('.' + filePannelDateClassName).style.color = colorChip.liteGreen;
        this.querySelector('.' + filePannelCircleClassName).style.background = colorChip.liteGreen;
        this.setAttribute("toggle", "on");
        instance.itemList.push({ original, key, hex, exe, type });
      } else {
        this.style.background = desktop ? colorChip.white : colorChip.gray0;
        this.querySelector('.' + fileNameClassName).style.color = colorChip.black;
        this.querySelector('.' + filePannelDateClassName).style.color = colorChip.deactive;
        this.querySelector('.' + filePannelCircleClassName).style.background = colorChip.green;
        instance.itemList.splice(instance.itemList.findIndex((obj) => {
          return obj.original === original;
        }), 1);
        this.setAttribute("toggle", "off");
      }
    }

    contextmenuEvent = () => {
      return function (e) {
        e.preventDefault();
        const self = this;
        const { top, left, height, width } = this.getBoundingClientRect();
        let cancelBack, whitePrompt;
        let cancelEvent;
        let link, original, key;
        let forceSelect;

        forceSelect = 0;
        if (this.getAttribute("toggle") === "off") {
          fileItemSelectEvent.call(this, e);
          forceSelect = 1;
        }

        cancelEvent = function (e) {
          removeByClass(whiteContextmenuClassName);
          if (forceSelect === 1) {
            fileItemSelectEvent.call(self, e);
          }
        }

        cancelBack = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          event: {
            click: cancelEvent
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: "transparent",
          }
        });

        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteContextmenuClassName ],
          style: {
            display: "block",
            position: "fixed",
            top: String(e.y) + "px",
            left: String(e.x) + "px",
            padding: String(contextmenuPadding) + ea,
            background: colorChip.white,
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
            animation: "fadeuplite 0.3s ease forwards",
          }
        });

        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              let parsedString, loading;
              let downloadArr;
              try {
                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {
                  for (let { original, type, hex, exe } of instance.itemList) {
                    loading = instance.mother.whiteProgressLoading();
                    parsedString = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                    await downloadFile(original, parsedString.string.replace(/ /gi, "_") + "." + exe, loading.progress.firstChild);
                    await homeliaisonAnalytics({
                      page: instance.pageName,
                      standard: instance.firstPageViewTime,
                      action: "downloadDesignerRepresentativeFile",
                      data: {
                        desid: instance.designer.desid,
                        original,
                        date: new Date(),
                      }
                    });

                    loading.remove();
                  }
                  cancelEvent.call(self, e);
                  if (mobile) {
                    window.location.reload();
                  } else {
                    await instance.setPanBlocks();
                  }
                }
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: String(contextWidth) + ea,
            height: String(contextHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          child: {
            text: "파일 다운로드",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              top: String(textTop) + ea,
            }
          }
        });
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              let parsedString, fileMap;
              try {
                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {
                  if (window.confirm("선택한 파일을 삭제하시겠습니까?")) {
                    fileMap = instance.itemList.map(({ original, hex }) => {
                      const [ protocol, host, const1, const2, const3, desid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                      return { desid, fileName, hex };
                    });
                    await ajaxJson({ targets: fileMap }, BRIDGEHOST + "/representativeFileRemove");
                    await homeliaisonAnalytics({
                      page: instance.pageName,
                      standard: instance.firstPageViewTime,
                      action: "deleteDesignRepresentativeFile",
                      data: {
                        desid: instance.designer.desid,
                        fileMap: fileMap,
                        date: new Date(),
                      }
                    });
                  }
                  cancelEvent.call(self, e);
                  if (mobile) {
                    window.location.reload();
                  } else {
                    await instance.setPanBlocks();
                  }
                }
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: String(contextWidth) + ea,
            height: String(contextHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            marginBottom: String(itemBetween) + ea,
            cursor: "pointer",
          },
          child: {
            text: "파일 삭제",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              top: String(textTop) + ea,
            }
          }
        });
        
        createNode({
          mother: whitePrompt,
          event: {
            click: async function (e) {
              let parsedString, fileMap;
              let string;
              let newString;
              let updateMap;
              let hash;
              let loading;
              let hex, desid, proid, fileName;
              let folder, kind;
              let mode;

              try {
                if (instance.itemList.length === 0) {
                  window.alert("파일을 먼저 선택해주세요!");
                } else {

                  fileMap = instance.itemList.map(({ original, hex }) => {
                    const [ protocol, host, const1, const2, const3, desid, fileName ] = original.split("/").filter((str) => { return str !== '' });
                    return { desid, fileName, hex };
                  });

                  updateMap = [];

                  for (let obj of fileMap) {
                    hex = obj.hex;
                    fileName = obj.fileName;

                    ({ string } = await ajaxJson({ mode: "decrypto", hash: hex }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                    if (instance.isEmptyString(string)) {
                      string = '';
                    }

                    newString = null;
                    newString = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1", string);
                    if (typeof newString !== "string" || newString.trim() === '') {
                      newString = "메모 없음";
                    }

                    newString = newString.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
                    ({ hash } = await ajaxJson({ mode: "crypto", string: newString }, BACKHOST + "/homeliaisonCrypto", { equal: true }));

                    desid = obj.desid;
                    updateMap.push({ desid, fileName, hash });
                  }

                  loading = instance.mother.grayLoading();
                  await ajaxJson({ targets: updateMap }, BRIDGEHOST + "/representativeFileUpdate");
                  await homeliaisonAnalytics({
                    page: instance.pageName,
                    standard: instance.firstPageViewTime,
                    action: "updateDesignRepresentativeFile",
                    data: {
                      desid: instance.designer.desid,
                      updateMap: updateMap,
                      date: new Date(),
                    }
                  });
                  cancelEvent.call(self, e);

                  if (mobile) {
                    window.location.reload();
                  } else {
                    await instance.setPanBlocks();
                  }

                  loading.remove();
                }
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: String(contextWidth) + ea,
            height: String(contextHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.gray1,
            cursor: "pointer",
          },
          child: {
            text: "메모 수정",
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contextSize) + ea,
              fontWeight: String(textWeight),
              color: colorChip.black,
              top: String(textTop) + ea,
            }
          }
        });

      }
    }
  
    this.whiteMargin = (desktop ? margin : 0);
  
    whiteBlock = createNode({
      mother: entireMode ? totalContents : baseTong,
      style: {
        position: "relative",
        borderRadius: String(desktop ? 8 : 1) + ea,
        width: String(100) + '%',
        background: desktop ? colorChip.white : "",
        paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
        paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
        marginBottom: String(bottomMargin) + ea,
        boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
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
            position: mobile ? "absolute" : "relative",
            left: desktop ? "" : String(mobileTitleLeft) + ea,
            top: desktop ? "" : String(mobileTitleTop) + ea,
            width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
            marginBottom: desktop ? String(titleBottom) + ea : "",
            zIndex: mobile ? String(1) : "",
            textAlign: desktop ? "" : "center",
          },
          children: [
            {
              style: {
                display: desktop ? "none" : "block",
                position: "absolute",
                borderBottom: "1px dashed " + colorChip.gray4,
                height: String(2.7) + ea,
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
              }
            },
            {
              text: "대표 작업물 업로드",
              style: {
                position: "relative",
                display: "inline-block",
                top: String(titleTopNumber) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(800),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingRight: String(numberRight) + ea,
                paddingLeft: desktop ? "" : String(numberRight) + ea,
                color: colorChip.black,
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
            background: desktop ? "" : colorChip.white,
            boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
            borderRadius: mobile ? String(1) + ea : "",
            overflow: "hidden",
            marginBottom: String(0) + ea,
            marginTop: desktop ? "" : String(19) + ea,
            paddingTop: String(contentsAreaPaddingTop) + ea,
            borderTop: desktop ? "1px solid " + colorChip.shadow : "",
            paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
            paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
            paddingBottom: desktop ? "" : String(4.5) + ea,
          }
        },
      ]
    });
    tong = block.lastChild;
  
    num = 0;
    for (let { title, contents } of mainContents) {
      num2 = 0;
      for (let str of contents) {
        createNode({
          mother: tong,
          style: {
            display: "block",
            position: "relative",
            marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
            marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
          },
          children: [
            {
              style: {
                display: desktop ? "inline-block" : "block",
                position: "relative",
                verticalAlign: "top",
                width: desktop ? String(firstWidth + zeroWidth + zeroMarginRight) + ea : String(100) + '%',
                marginBottom: desktop ? "" : String(1.5) + ea,
              },
              children: [
                {
                  style: {
                    display: num2 === 0 ? "block" : "none",
                    position: "absolute",
                    top: String(0),
                    left: String(0),
                    height: String(lineTop) + ea,
                    width: withOut(0),
                    borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                  }
                },
                {
                  text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                  style: {
                    display: desktop ? "inline-block" : "block",
                    position: "relative",
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(600),
                    lineHeight: String(1.6),
                    color: colorChip.black,
                    textAlign: "left",
                    background: colorChip.white,
                    paddingRight: String(linePadding) + ea,
                  },
                  bold: {
                    fontSize: String(contentsWordingSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.green,
                  },
                }
              ]
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsWordingSize) + ea,
                fontWeight: String(600),
                verticalAlign: "top",
                lineHeight: String(1.6),
                width: String(secondWidth) + ea,
                marginRight: String(secondMarginRight) + ea,
                textAlign: desktop ? "right" : "left",
                color: colorChip.green,
              },
            },
            {
              text: str,
              style: {
                display: "inline-block",
                fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                fontWeight: String(400),
                verticalAlign: "top",
                lineHeight: String(1.6),
                width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
                textAlign: "left",
                color: colorChip.black,
              },
              bold: {
                fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
              },
              under: {
                fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.green,
              },
            },
          ]
        });
  
        num2++;
      }
      num++;
    }
  
    // upload box  
    panMother = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray3 : colorChip.gray1,
        width: withOut(panMotherInnerPadding * 2, ea),
        padding: String(panMotherInnerPadding) + ea,
        marginTop: desktop ? "" : String(2.5) + ea,
      }
    });
  
    mothers = [];
    for (let i = 0; i < panList.length; i++) {
  
      basePan = createNode({
        mother: panMother,
        attribute: {
          index: String(i),
          name: panList[i].key,
          key: panList[i].key,
        },
        event: {
          drop: instance.dropFiles(panList[i].key),
          dragenter: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.background = colorChip.whiteGreen;
          },
          dragover: function (e) {
            e.preventDefault();
            e.stopPropagation();
          },
          dragleave: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.background = colorChip.gray1;
          },
        },
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: withOut(0),
          marginBottom: String(i === panList.length - 1 ? 0 : panBetween) + ea,
          background: desktop ? colorChip.gray1 : colorChip.gray3,
          borderRadius: String(5) + "px",
          transition: "all 0.5s ease",
        }
      });
    
      createNode({
        mother: basePan,
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: String(panTitleBoxWidth) + ea,
          height: String(panTitleBoxHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
        },
        children: [
          {
            text: panList[i].title,
            style: {
              position: "relative",
              top: String(contentsTextTop) + ea,
              fontSize: String(panContentsWordingSize) + ea,
              fontWeight: String(800),
              color: colorChip.black,
            }
          }
        ]
      });
    
      subButtonsBasePan = createNode({
        mother: basePan,
        style: {
          display: "inline-flex",
          position: "absolute",
          alignItems: "center",
          flexDirection: "row",
          height: String(panTitleBoxHeight) + ea,
          paddingRight: String(subButtonPaddingRight) + ea,
          right: String(0),
          top: String(subButtonVisualTop) + ea,
        },
      });
    
      contentsPan = createNode({
        mother: basePan,
        style: {
          display: "block",
          position: "relative",
          width: withOut((contentsPanPaddingTop * 2) - itemBetween, ea),
          paddingTop: String(contentsPanPaddingTop) + ea,
          paddingBottom: String(contentsPanPaddingBottom) + ea,
          paddingLeft: String(contentsPanPaddingTop) + ea,
          paddingRight: String(contentsPanPaddingTop - itemBetween) + ea,
        }
      });
    
      createNode({
        mother: basePan,
        event: {
          click: instance.uploadFiles(panList[i].key),
          touchstart: instance.uploadFiles(panList[i].key),
        },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: String(uploadCircleWidth) + ea,
          height: String(uploadCircleWidth) + ea,
          position: "absolute",
          bottom: String(uploadCirclePadding) + ea,
          right: String(uploadCirclePadding) + ea,
          borderRadius: String(uploadCircleWidth) + ea,
          background: colorChip.gradientGray,
          cursor: "pointer",
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnExtract(colorChip.white),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(uploadIconTop) + ea,
              width: String(uploadIconWidth) + ea,
            }
          }
        ]
      });
  
      mothers.push(contentsPan);
    }

    // set pan blocks

    setPanBlocks = async () => {
      try {

        for (let panMother of mothers) {
          cleanChildren(panMother);
        }
        instance.itemList = [];

        itemList = await ajaxJson({ target: "/" + instance.designer.desid }, BRIDGEHOST + "/representativeFileRead", { equal: true });
        itemList = itemList.map((raw) => {
          const original = raw;
          const [ key, time, order, hex ] = raw.split("_");
          const [ hexId, exe ] = hex.split(".");
          const id = key + "_" + time + "_" + String(order) + "_" + hexId;
          return [ key, new Date(Number(time)), String(Number(order) + 1) + "." + exe, Number(order), targetHref + "/" + original, exe, id, hexId ];
        }).map(([ key, date, name, order, original, exe, id, hexId ]) => {
          return { key, date, name, order, original, exe, id, hexId };
        });
        itemList.sort((a, b) => { return a.order - b.order });
        itemList.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
    
        for (let item of itemList) {
          for (let i = 0; i < panList.length; i++) {
            if (panList[i].key === item.key) {
              item.mother = mothers[i];
              item.motherNumber = i;
              item.type = "file";
            }
          }
        }
    
        motherMatrix = (new Array(panList.length)).fill(0, 0);
    
        fileItemList = [];
        for (let { mother, key, date, name, order, motherNumber, type, original, exe, id, hexId } of itemList) {
          itemBlock = createNode({
            mother,
            attribute: {
              original,
              key,
              hex: hexId,
              exe,
              type,
              toggle: "off",
              date: dateToString(date).split("-").slice(1).join("/"),
            },
            event: {
              click: contextmenuEvent(),
              contextmenu: contextmenuEvent(),
            },
            style: {
              display: "inline-flex",
              justifyContent: "start",
              paddingLeft: String(titlePadding) + ea,
              paddingRight: String(titlePadding) + ea,
              alignItems: "center",
              width: "calc(calc(calc(100% - " + String(itemBetween * itemDivide) + ea + ") / " + String(itemDivide) + ") - " + String(titlePadding * 2) + ea + ")",
              marginRight: String(itemBetween) + ea,
              height: String(itemTongHeight) + ea,
              marginBottom: String(itemBetween) + ea,
              borderRadius: String(5) + "px",
              background: desktop ? colorChip.white : colorChip.gray0,
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "top",
              overflow: "hidden",
              boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
            },
            children: [
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: withOut(titlePannelWidth + titlePannelBetween, ea),
                  height: withOut(0, ea),
                  overflow: "hidden",
                  marginRight: String(titlePannelBetween) + ea,
                },
                child: {
                  style: {
                    display: "inline-flex",
                    position: "relative",
                    width: String(titleMaxWidth) + ea,
                    height: withOut(0, ea),
                    justifyContent: "start",
                    textAlign: "left",
                    alignItems: "center",    
                  },
                  child: {
                    id,
                    class: [ fileNameClassName ],
                    attribute: {
                      exe,
                      date: dateToString(date).split("-").slice(1).join("/"),
                    },
                    text: dateToString(date).slice(2) + "_" + name,
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(textTop) + ea,
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.black,
                    },
                    bold: {
                      fontSize: String(textSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(titlePannelWidth) + ea,
                  height: withOut(0, ea),
                  justifyContent: "end",
                  alignItems: "center",
                  textAlign: "right",
                },
                children: [
                  {
                    class: [ filePannelDateClassName ],
                    text: dateToString(date).split("-").slice(1).join("/"),
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(pannelTextTop) + ea,
                      fontSize: String(pannelSize) + ea,
                      fontWeight: String(textWeight),
                      color: colorChip.deactive,
                    },
                  },
                  {
                    class: [ filePannelCircleClassName ],
                    style: {
                      display: "inline-block",
                      position: "relative",
                      marginLeft: String(pannelCircleBetween) + ea,
                      width: String(pannelCircleWidth) + ea,
                      height: String(pannelCircleWidth) + ea,
                      borderRadius: String(pannelCircleWidth) + ea,
                      top: String(pannelCircleTop) + ea,
                      background: colorChip.green,
                    }
                  }
                ]
              }
            ]
          });
    
          fileItemList.push({
            hash: hexId,
            target: id
          });
    
          motherMatrix[motherNumber] = motherMatrix[motherNumber] + 1;
        }
    
        ajaxJson({ mode: "decrypto", targets: fileItemList }, BACKHOST + "/homeliaisonCrypto", { equal: true }).then((targets) => {
          for (let { string, target } of targets) {
            target = document.querySelector('#' + target);
            if (string.trim() !== "" && target !== null) {
              target.textContent = "";
              target.insertAdjacentHTML("beforeend", string);
            }
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    }
    this.setPanBlocks = setPanBlocks;

    await setPanBlocks();

  } catch (e) {
    console.log(e);
  }
}

DesignerAboutJs.prototype.uploadFiles = function (fileKind) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, homeliaisonAnalytics } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  return async function (e) {
    try {
      let input, removeTargets;

      if (!instance.nowUploading) {

        removeTargets = [ ...document.querySelectorAll('.' + fileInputClassName) ];
        for (let dom of removeTargets) {
          dom.remove();
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: async function (e) {
              try {
                const thisKey = this.getAttribute("name");
                let thisFiles, formData, res;
                let removeTargets;
                let loading;
                let hash;
                let rawResponse;

                thisFiles = [ ...this.files ];

                if (thisFiles.length >= 1) {
                  formData = new FormData();
                  formData.enctype = "multipart/form-data";
                  formData.append("desid", instance.designer.desid);
                  formData.append("type", "file");
                  formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);

                  if (!instance.nowUploading) {

                    rawResponse = null;
                    rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름을 적어주세요! (예) 주방_시공의뢰서_1");
                    if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                      rawResponse = "메모 없음";
                    }
                    rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');

                    loading = instance.mother.whiteProgressLoading();

                    ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                    formData.append("name", hash);
  
                    await instance.sendChecklistLog({
                      mode: "representative",
                      data: {
                        date: new Date(),
                        desid: instance.designer.desid,
                        designer: instance.designer.designer,
                        entireMode: instance.entireMode,
                        key: thisKey,
                      }
                    });

                    res = await ajaxForm(formData, BRIDGEHOST + "/representativeFileBinary", loading.progress);
                    await homeliaisonAnalytics({
                      page: instance.pageName,
                      standard: instance.firstPageViewTime,
                      action: "uploadRepresentativeFile",
                      data: {
                        desid: instance.designer.desid,
                        key: thisKey,
                        date: new Date(),
                      }
                    });
  
                    if (mobile) {
                      window.location.reload();
                    } else {
                      await instance.setPanBlocks();
                    }

                    loading.remove();

                  } else {
                    instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
                  }

                }

              } catch (e) {
                console.log(e);
                window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
          attribute: {
            type: "file",
            name: fileKind,
          },
          style: {
            display: "none",
          }
        });

        input.click();

      } else {

        instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

      }

    } catch (e) {
      console.log(e);
      window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
      window.location.reload();
    }
  }

}

DesignerAboutJs.prototype.dropFiles = function (fileKind) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, removeByClass, homeliaisonAnalytics } = GeneralJs;
  const { project, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const fileInputClassName = "fileInputClassName";
  return async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      let input, changeEvent;

      if (!instance.nowUploading) {

        removeByClass(fileInputClassName);

        changeEvent = async function (e) {
          try {
            const thisKey = this.getAttribute("name");
            let thisFiles, formData, res;
            let removeTargets;
            let loading;
            let hash;
            let rawResponse;

            thisFiles = [ ...this.files ];

            if (thisFiles.length >= 1) {
              formData = new FormData();
              formData.enctype = "multipart/form-data";
              formData.append("desid", instance.designer.desid);
              formData.append("type", "file");
              formData.append("file_" + thisKey + "_" + String(0), thisFiles[0]);

              if (!instance.nowUploading) {

                rawResponse = null;
                rawResponse = await GeneralJs.prompt("파일에 대한 간단한 이름 또는 메모를 적어주세요! (예) 주방_시공의뢰서_1");
                if (typeof rawResponse !== "string" || rawResponse.trim() === '') {
                  rawResponse = "메모 없음";
                }
                rawResponse = rawResponse.replace(/[\=\/\\\(\)\?\+\&]/gi, '').replace(/ /gi, '_');
  
                loading = instance.mother.whiteProgressLoading();
  
                ({ hash } = await ajaxJson({ mode: "crypto", string: rawResponse }, BACKHOST + "/homeliaisonCrypto", { equal: true }));
                formData.append("name", hash);
  
                await instance.sendChecklistLog({
                  mode: "representative",
                  data: {
                    date: new Date(),
                    desid: instance.designer.desid,
                    designer: instance.designer.designer,
                    entireMode: instance.entireMode,
                    key: thisKey,
                  }
                });

                res = await ajaxForm(formData, BRIDGEHOST + "/representativeFileBinary", loading.progress);
                await homeliaisonAnalytics({
                  page: instance.pageName,
                  standard: instance.firstPageViewTime,
                  action: "uploadRepresentativeFile",
                  data: {
                    desid: instance.designer.desid,
                    key: thisKey,
                    date: new Date(),
                  }
                });

                if (mobile) {
                  window.location.reload();
                } else {
                  await instance.setPanBlocks();
                }

                loading.remove();

              } else {
                instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");
              }

            }

          } catch (e) {
            console.log(e);
            window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
            window.location.reload();
          }
        }

        input = createNode({
          mother: document.body,
          class: [ fileInputClassName ],
          mode: "input",
          event: {
            change: changeEvent
          },
          attribute: {
            type: "file",
            name: fileKind,
            multiple: "true",
          },
          style: {
            display: "none",
          }
        });
        input.files = e.dataTransfer.files;
        changeEvent.call(input, e);

      } else {

        instance.mother.greenAlert("업로드를 마치고 다시 시도해주세요!");

      }

      this.style.background = colorChip.gray1;

    } catch (e) {
      console.log(e);
      window.alert("파일 전송에 실패하였습니다! 다시 시도해주세요!");
      window.location.reload();
    }
  }

}

DesignerAboutJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

DesignerAboutJs.prototype.renderBlock = function (contents, notice, tong, grayBox, x, lastBoo) {
  const instance = this;
  const { ea, baseTong, media, designer, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, removeByClass, getRealBox, variableArray, findByAttribute, fireEvent } = GeneralJs;
  const removePopupTargetClassName = "removePopupTargetClassName";
  const menuTargetClassName = "menuTargetClassName";
  const tendencyBarTargetClassName = "tendencyBarTargetClassName";
  const greenNoticeClassName = "greenNoticeClassName";
  const fourStepClassName = "fourStepClassName";
  let blockHeight;
  let blockMarginBottom;
  let circleBoxWidth;
  let circleWidth;
  let circleTop;
  let contentsSize;
  let contentsWeight0;
  let contentsWeight1;
  let firstWidth;
  let baseBlock;
  let circleBlock, propertyBlock, valueBlock;
  let divideNumber;
  let num;
  let factorBetween;
  let tendencyTong;
  let tendencyBlockTop;
  let tendencyBlockWidth;
  let tendencyBlockHeight;
  let tendencyValueConst;
  let z;
  let value;
  let tendencyMinusRatio;
  let questionSize, questionWeight, questionTextTop;
  let noticeCircleWidth, noticeCircleTop, noticeCircleMargin;
  let careerBlockOuterMargin, careerBlockOuterMarginTop, careerBlockInnerMargin, careerBlockInnerMarginSmall, careerBlockOuterMarginBottom;
  let careerBlockSize;
  let careerBlockGrayOuterMargin;
  let plusSize;
  let plusTextTop;
  let careerBlocksRender;
  let blockCancelWidth, blockCancelTop;
  let plusBlockEvent;
  let thisWidth;
  let thisBox;
  let noticeBetween;
  let questionBetween;
  let greenNoticeMinWidth;
  let greenNoticeMaxWidth;
  let greenNoticePaddingLeft;
  let greenNoticePaddingTop;
  let greenNoticePaddingBottom;
  let greenNoticeSize, greenNoticeWeight, greenNoticeLineHeight;
  let greenNoticeIndent;
  let mobileTendencyFactorBetween;
  let factorVisualBetween;

  blockHeight = <%% 22, 21, 21, 19, (isIphone() ? 5.2 : 4.9) %%>;
  blockMarginBottom = <%% 16, 15, 15, 12, 2.5 %%>;

  circleBoxWidth = <%% 16, 16, 16, 14, 2.8 %%>;
  circleWidth = <%% 5, 5, 5, 4, 1 %%>;
  circleTop = <%% (isMac() ? 1 : -1), (isMac() ? 1 : -1), (isMac() ? 1 : -1), (isMac() ? 1 : -1), 0 %%>;

  contentsSize = <%% 16, 15, 15, 14, 3.4 %%>;
  contentsWeight0 = <%% 700, 700, 700, 700, 700 %%>;
  contentsWeight1 = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 180, 160, 140, 120, 27 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1.5 %%>;
  mobileTendencyFactorBetween = 1;
  factorVisualBetween = isIphone() ? 0.98 : 1.1;

  divideNumber = <%% 4, 4, 4, 4, 2 %%>;

  tendencyBlockTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyBlockWidth = <%% 100, 90, 90, 80, 20 %%>;
  tendencyBlockHeight = <%% 16, 16, 16, 16, 3.4 %%>;
  tendencyMinusRatio = <%% 1, 1, 1, 1, 1 %%>;

  tendencyValueConst = 10;

  questionSize = <%% 10, 10, 10, 10, 2.5 %%>;
  plusSize = <%% 13, 13, 13, 13, 2.5 %%>;
  questionWeight = <%% 500, 500, 500, 500, 500 %%>;
  questionTextTop = <%% -1, -1, -1, -1, (isIphone() ? -0.1 : -0.2) %%>;
  plusTextTop = <%% -1.5, -1.5, -1.5, -1.5, (isIphone() ? -0.1 : -0.2) %%>;

  noticeCircleWidth = <%% 12, 12, 12, 12, 2.8 %%>;
  noticeCircleTop = <%% (isMac() ? 6 : 3.5), (isMac() ? 5.5 : 3), (isMac() ? 5 : 2.5), (isMac() ? 4.5 : 2), (isIphone() ? 1.3 : 1.2) %%>;
  noticeCircleMargin = <%% 5, 5, 5, 5, 1 %%>;

  careerBlockGrayOuterMargin = <%% 10, 10, 9, 8, 0 %%>;
  careerBlockOuterMargin = <%% 14, 14, 14, 12, 2.5 %%>;
  careerBlockOuterMarginTop = <%% (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), 2 %%>;
  careerBlockOuterMarginBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), 2 %%>;
  careerBlockInnerMargin = <%% 6, 6, 6, 4, 1 %%>;
  careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 0 %%>;
  careerBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;

  blockCancelWidth = <%% 12, 12, 12, 12, 2.8 %%>;
  blockCancelTop = <%% 14, 14, 13, 12, 2 %%>;
  noticeBetween = <%% 7, 7, 7, 7, 1.5 %%>;
  questionBetween = <%% 6, 6, 6, 6, 1 %%>;

  greenNoticeIndent = <%% 12, 12, 12, 12, 12 %%>;

  greenNoticeMinWidth = <%% 100, 100, 100, 100, 10 %%>;
  greenNoticeMaxWidth = <%% 300, 300, 300, 300, 40 %%>;

  greenNoticePaddingLeft = <%% 12, 12, 12, 12, 2.6 %%>;
  greenNoticePaddingTop = <%% (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), (isMac() ? 6 : 8), 1.5 %%>;
  greenNoticePaddingBottom = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), 1.9 %%>;

  greenNoticeSize = <%% 12, 12, 12, 12, 3 %%>;
  greenNoticeWeight = <%% 600, 600, 600, 600, 600 %%>;
  greenNoticeLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;

  plusBlockEvent = (mode, index = -1) => {
    return async function (e) {
      try {
        const x = Number(this.getAttribute("x"));
        const z = Number(this.getAttribute("z"));
        const valueTargets = instance.contents[x].contents[z].renderValue("");
        let valueMatrix;
        let tempArr;
        let tempValue;
  
        valueMatrix = [];
  
        for (let obj of valueTargets) {
          tempArr = [];
          if (obj.type === "string") {
            tempArr.push(obj.name);
            tempValue = await GeneralJs.prompt(obj.name + "명을 알려주세요!");
            if (typeof tempValue !== "string") {
              throw new Error("cancel");
            }
            if (tempValue.trim() === "") {
              tempValue = '-';
            } else {
              tempValue = tempValue.trim();
            }
            tempArr.push(tempValue.trim());
          } else if (obj.type === "date") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.promptYearMonth(obj.name + "을(를) 알려주세요!", obj.progressBoo, obj.progressName);
              if (tempValue === null) {
                throw new Error("cancel");
              }
            } while (tempValue === null)
            tempArr.push(tempValue);

          } else if (obj.type === "button") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.promptButtons(obj.name + "을(를) 선택해주세요!", obj.buttons);
              if (tempValue === null) {
                throw new Error("cancel");
              }
            } while (tempValue === null)
            tempArr.push(tempValue);

          } else {
            throw new Error("invalid type");
          }
          valueMatrix.push(tempArr);
        }
  
        if (mode === "create") {
          await instance.contents[x].contents[z].plusValue(valueMatrix, instance.designer, this.parentElement.nextElementSibling);
        } else {
          await instance.contents[x].contents[z].updateValue({
            mode: "update",
            index,
            value: valueMatrix,
            tong: this.parentElement.parentElement.parentElement,
          }, instance.designer);
        }
      } catch (e) {
        window.alert("입력을 취소하셨습니다! 처음부터 다시 진행해주세요!");
      }
    }
  }
  
  careerBlocksRender = (value, tong) => {
    const x = Number(tong.getAttribute("x"));
    const z = Number(tong.getAttribute("z"));
    cleanChildren(tong);
    createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        padding: String(careerBlockGrayOuterMargin) + ea,
        width: withOut(careerBlockGrayOuterMargin * 2, ea),
        borderRadius: String(5) + "px",
        background: desktop ? colorChip.gray0 : colorChip.white,
      },
      children: value.map((obj, index) => {
        const { title, value: factorValue } = obj;
        const lastBoo = (index === value.length - 1);
        return {
          attribute: {
            index: String(index),
            x: String(x),
            z: String(z),
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
            background: desktop ? colorChip.white : colorChip.gray0,
            boxShadow: desktop ? "0px 2px 11px -9px " + colorChip.shadow : "",
          },
          children: factorValue.map((str, index) => {
            const lastBoo = (index === factorValue.length - 1);
            return {
              attribute: {
                x: String(x),
                z: String(z),
              },
              event: {
                click: async function (e) {
                  try {
                    const index = Number(this.parentElement.getAttribute("index"));
                    const updateFunction = plusBlockEvent("update", index);
                    await updateFunction.call(this, e);
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
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
          }).concat([
            {
              mode: "svg",
              attribute: {
                index: String(index),
                x: String(x),
                z: String(z),
              },
              event: {
                click: async function (e) {
                  try {
                    if (window.confirm("해당 경력을 삭제하시겠습니까?")) {
                      const index = Number(this.getAttribute("index"));
                      const x = Number(this.getAttribute("x"));
                      const z = Number(this.getAttribute("z"));
                      await instance.contents[x].contents[z].updateValue({
                        mode: "delete",
                        index,
                        tong: tong,
                      }, instance.designer);  
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              source: instance.mother.returnCancelCircle(colorChip.gray4),
              style: {
                display: "inline-block",
                position: "absolute",
                width: String(blockCancelWidth) + ea,
                top: String(blockCancelTop) + ea,
                right: String(blockCancelTop) + ea,
                cursor: "pointer",
              }
            }
          ])
        }
      })
    });
  };
  this.careerBlocksRender = careerBlocksRender;

  z = 0;
  for (let obj of contents) {

    value = obj.returnValue(designer);

    baseBlock = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0),
        marginBottom: String((typeof value === "object" && value !== null && Array.isArray(value.__order__) && z !== contents.length - 1) ? blockMarginBottom * 2 : blockMarginBottom) + ea,
      },
    });

    circleBlock = createNode({
      mother: baseBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(circleBoxWidth) + ea,
        height: String(blockHeight + (desktop ? -1 : 0)) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(circleWidth) + ea,
            height: String(circleWidth) + ea,
            borderRadius: String(circleWidth) + ea,
            background: colorChip.green,
            top: String(circleTop) + ea,
          }
        }
      ]
    });

    propertyBlock = createNode({
      mother: baseBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(firstWidth) + ea,
        verticalAlign: "top",
        flexDirection: "row",
      },
      children: [
        {
          text: obj.property,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight0),
            color: colorChip.black,
            verticalAlign: "top",
          },
        },
        {
          attribute: {
            index: String(z),
          },
          event: {
            click: function (e) {
              const zIndex = 4;
              const index = Number(this.getAttribute("index"));
              const box = this.getBoundingClientRect();
              const notice = contents[index].noticeText(designer);
              let cancelBack, greenPrompt;
              
              cancelBack = createNode({
                mother: totalContents,
                class: [ greenNoticeClassName ],
                event: (e) => { removeByClass(greenNoticeClassName); },
                style: {
                  position: "fixed",
                  zIndex: String(zIndex),
                  top: String(0),
                  left: String(0),
                  width: withOut(0, ea),
                  height: withOut(0, ea),
                  background: "transparent",
                }
              });

              greenPrompt = createNode({
                mother: totalContents,
                class: [ greenNoticeClassName ],
                style: {
                  position: "absolute",
                  zIndex: String(zIndex),
                  top: String(box.top + greenNoticeIndent + circleWidth + window.scrollY) + "px",
                  left: String(box.left - 1) + "px",
                  paddingLeft: String(greenNoticePaddingLeft) + ea,
                  paddingRight: String(greenNoticePaddingLeft) + ea,
                  paddingTop: String(greenNoticePaddingTop) + ea,
                  paddingBottom: String(greenNoticePaddingBottom) + ea,                  
                  background: colorChip.gradientGreen,
                  borderRadius: String(5) + "px",
                  "min-width": String(greenNoticeMinWidth) + ea,
                  "max-width": String(greenNoticeMaxWidth) + ea,
                  animation: "fadeuplite 0.3s ease forwards",
                },
                children: [
                  {
                    text: notice,
                    style: {
                      position: "relative",
                      fontSize: String(greenNoticeSize) + ea,
                      fontWeight: String(greenNoticeWeight),
                      color: colorChip.white,
                      lineHeight: String(greenNoticeLineHeight),
                    }
                  }
                ]
              });

            }
          },
          style: {
            display: typeof obj.noticeText === "function" ? "inline-flex" : "none",
            position: "relative",
            background: colorChip.black,
            width: String(noticeCircleWidth) + ea,
            height: String(noticeCircleWidth) + ea,
            borderRadius: String(noticeCircleWidth) + ea,
            top: String(noticeCircleTop) + ea,
            marginLeft: String(noticeCircleMargin) + ea,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "?",
            style: {
              position: "relative",
              fontSize: String(questionSize) + ea,
              fontWeight: String(questionWeight),
              top: String(questionTextTop) + ea,
              color: colorChip.white,
              fontFamily: "graphik",
            }
          }
        },
        {
          attribute: {
            x: String(x),
            z: String(z),
          },
          event: {
            click: plusBlockEvent("create"),
          },
          style: {
            display: typeof obj.plusValue === "function" ? "inline-flex" : "none",
            position: "relative",
            background: colorChip.green,
            width: String(noticeCircleWidth) + ea,
            height: String(noticeCircleWidth) + ea,
            borderRadius: String(noticeCircleWidth) + ea,
            top: String(noticeCircleTop) + ea,
            marginLeft: String(noticeCircleMargin) + ea,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          child: {
            text: "+",
            style: {
              position: "relative",
              fontSize: String(plusSize) + ea,
              fontWeight: String(questionWeight),
              top: String(plusTextTop) + ea,
              color: colorChip.white,
              fontFamily: "graphik",
            }
          }
        },
      ]
    })

    if (typeof value === "string") {
      valueBlock = createNode({
        mother: baseBlock,
        text: value,
        attribute: { value, x: String(x), z: String(z) },
        event: {
          click: function (e) {
            const self = this;
            const x = Number(this.getAttribute('x'));
            const z = Number(this.getAttribute('z'));
            const thisValue = instance.contents[x].contents[z].renderValue(this.getAttribute("value"));
            const zIndex = 4;
            let cancelBack, whiteInput;
            let saveEvent;

            saveEvent = async (raw) => {
              try {
                const text = await instance.contents[x].contents[z].updateValue(raw, instance.designer);
                [ ...self.childNodes ].filter((dom) => { return dom.nodeType === 3 }).forEach((t) => { self.removeChild(t) });
                self.insertAdjacentHTML("beforeend", text);
                self.setAttribute("value", text);
                if (typeof instance.contents[x].contents[z].visualNotice === "function") {
                  const thisBox = getRealBox(self, withOut(firstWidth + circleBoxWidth, ea));
                  self.nextElementSibling.style.left = "calc(" + String(firstWidth + circleBoxWidth + noticeBetween) + ea + " + " + String(thisBox.width) + "px" + ")";
                }
              } catch (e) {
                console.log(e);
              }
            }

            cancelBack = {};
            whiteInput = {};

            cancelBack = createNode({
              mother: self,
              class: [ removePopupTargetClassName ],
              event: {
                click: async function (e) {
                  e.stopPropagation();
                  try {
                    if (whiteInput.value.trim() !== instance.contents[x].contents[z].renderValue(self.getAttribute("value"))) {
                      if (window.confirm("수정하시겠습니까?")) {
                        await saveEvent(whiteInput.value.trim());
                      }
                    }
                    const removeTargets = document.querySelectorAll('.' + removePopupTargetClassName);
                    for (let dom of removeTargets) {
                      dom.remove();
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                top: String(0),
                left: String(0),
                width: withOut(0),
                height: withOut(0),
                position: "fixed",
                background: "transparent",
                zIndex: String(zIndex),
              }
            });
            whiteInput = createNode({
              mother: self,
              class: [ removePopupTargetClassName ],
              mode: "input",
              attribute: {
                type: "text",
                value: thisValue,
              },
              event: {
                click: function (e) {
                  e.stopPropagation();
                },
                keydown: function (e) {
                  if (e.key === "Tab") {
                    e.preventDefault();
                  }
                },
                keyup: async function (e) {
                  try {
                    if (e.key === "Enter" || e.key === "Tab") {
                      e.preventDefault();
                      if (this.value.trim() !== instance.contents[x].contents[z].renderValue(self.getAttribute("value"))) {
                        if (window.confirm("수정하시겠습니까?")) {
                          await saveEvent(this.value.trim());
                        }
                      }
                      const removeTargets = document.querySelectorAll('.' + removePopupTargetClassName);
                      for (let dom of removeTargets) {
                        dom.remove();
                      }
                    } else {
                      if (typeof instance.contents[x].contents[z].filterValue === "function") {
                        this.value = instance.contents[x].contents[z].filterValue(this.value);
                      }
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "block",
                position: "absolute",
                top: String(0),
                left: String(0),
                width: withOut(0),
                height: withOut(0),
                fontSize: String(contentsSize) + ea,
                fontWeight: String(contentsWeight1),
                color: colorChip.green,
                border: String(0),
                outline: String(0),
                background: colorChip.white,
                zIndex: String(zIndex),
              }
            });
            whiteInput.focus();

          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight1),
          color: colorChip.black,
          width: withOut(firstWidth + circleBoxWidth, ea),
          verticalAlign: "top",
        },
      });

      if (typeof obj.visualNotice === "function") {
        thisBox = getRealBox(valueBlock, { width: withOut(firstWidth + circleBoxWidth, ea) });
        createNode({
          mother: baseBlock,
          text: obj.visualNotice(instance.designer),
          style: {
            position: "absolute",
            top: String(0),
            left: "calc(" + String(firstWidth + circleBoxWidth + noticeBetween) + ea + " + " + String(thisBox.width) + "px" + ")",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight1),
            color: colorChip.green,
          }
        })
      }

    } else if (Array.isArray(value) && value.every((s) => { return typeof s === "string" })) {
      valueBlock = createNode({
        mother: baseBlock,
        attribute: {
          width: withOut(firstWidth + circleBoxWidth, ea),
          x: String(x),
          z: String(z),
        },
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(firstWidth + circleBoxWidth, ea),
          verticalAlign: "top",
        },
      });

      num = 0;
      for (let v of value) {
        createNode({
          mother: valueBlock,
          text: v,
          class: [ menuTargetClassName + String(x) + String(z) ],
          attribute: {
            x: String(x),
            z: String(z),
            toggle: instance.contents[x].contents[z].selectValue(designer).includes(num) ? "on" : "off",
            width: "calc(100% / " + String((typeof instance.contents[x].contents[z].divideNumber === "number" ? instance.contents[x].contents[z].divideNumber : divideNumber)) + ")",
            index: String(num),
          },
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              e.stopPropagation();
              if (window.confirm("수정하시겠습니까?")) {
                const self = this;
                const toggle = this.getAttribute("toggle");
                const x = Number(this.getAttribute("x"));
                const z = Number(this.getAttribute("z"));
                const index = Number(this.getAttribute("index"));
                let targets;
                let finalTargets;
                let finalNumbers;
                let targetIndex;
                
                if (toggle === "on") {
                  if (instance.contents[x].contents[z].range === true) {
                    targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
                    targetIndex = targets.findIndex((d) => { return d === self });
                    for (let s = 0; s < targets.length; s++) {
                      if (s <= targetIndex) {
                        targets[s].style.color = colorChip.green;
                        targets[s].setAttribute("toggle", "on");
                      } else {
                        targets[s].style.color = colorChip.deactive;
                        targets[s].setAttribute("toggle", "off");
                      }
                    }
                  } else {
                    if (instance.contents[x].contents[z].multiple) {
                      self.style.color = colorChip.deactive;
                      self.setAttribute("toggle", "off");
                    }
                  }
                } else {
                  if (instance.contents[x].contents[z].range === true) {
                    targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
                    targetIndex = targets.findIndex((d) => { return d === self });
                    for (let s = 0; s < targets.length; s++) {
                      if (s <= targetIndex) {
                        targets[s].style.color = colorChip.green;
                        targets[s].setAttribute("toggle", "on");
                      } else {
                        targets[s].style.color = colorChip.deactive;
                        targets[s].setAttribute("toggle", "off");
                      }
                    }
                  } else {
                    if (instance.contents[x].contents[z].multiple) {
                      self.style.color = colorChip.green;
                    } else {
                      targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
                      for (let dom of targets) {
                        if (dom === self) {
                          dom.style.color = colorChip.green;
                        } else {
                          dom.style.color = colorChip.deactive;
                          dom.setAttribute("toggle", "off");
                        }
                      }
                    }
                    self.setAttribute("toggle", "on");
                    if (typeof instance.contents[x].contents[z].fourStepValue === "function") {
                      for (let i of variableArray(4)) {
                        if (i === index) {
                          if (document.querySelector("." + fourStepClassName + String(x) + String(z) + String(i)) !== null) {
                            document.querySelector("." + fourStepClassName + String(x) + String(z) + String(i)).style.background = colorChip.green;
                          }
                        } else {
                          if (document.querySelector("." + fourStepClassName + String(x) + String(z) + String(i)) !== null) {
                            document.querySelector("." + fourStepClassName + String(x) + String(z) + String(i)).style.background = colorChip.gray4;
                          }
                        }
                      }
                    }
                  }
                }
                
                finalTargets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
                finalNumbers = finalTargets.map((dom) => { return dom.getAttribute("toggle") === "on" ? 1 : 0 });
                
                instance.contents[x].contents[z].updateValue(finalNumbers, instance.contents[x].contents[z].returnValue(instance.designer), instance.designer).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight1),
            color: instance.contents[x].contents[z].selectValue(designer).includes(num) ? colorChip.green : colorChip.deactive,
            width: "calc(100% / " + String((typeof instance.contents[x].contents[z].divideNumber === "number" ? instance.contents[x].contents[z].divideNumber : divideNumber)) + ")",
            cursor: "pointer",
            marginTop: String(num >= (typeof instance.contents[x].contents[z].divideNumber === "number" ? instance.contents[x].contents[z].divideNumber : divideNumber) ? factorBetween : 0) + ea,
          },
        });
        num++;
      }

      if (typeof obj.fourStepValue === "function") {

        for (let s = 0; s < 4; s++) {
          createNode({
            mother: baseBlock,
            attribute: {
              x: String(x),
              z: String(z),
              index: String(s),
            },
            event: {
              click: function (e) {
                const zIndex = 4;
                const x = Number(this.getAttribute("x"));
                const z = Number(this.getAttribute("z"));
                const index = Number(this.getAttribute("index"));
                const box = this.getBoundingClientRect();
                const notice = instance.contents[x].contents[z].fourStepValue(designer)[index];
                let cancelBack, greenPrompt;
                
                cancelBack = createNode({
                  mother: totalContents,
                  class: [ greenNoticeClassName ],
                  event: (e) => { removeByClass(greenNoticeClassName); },
                  style: {
                    position: "fixed",
                    zIndex: String(zIndex),
                    top: String(0),
                    left: String(0),
                    width: withOut(0, ea),
                    height: withOut(0, ea),
                    background: "transparent",
                  }
                });
  
                greenPrompt = createNode({
                  mother: totalContents,
                  class: [ greenNoticeClassName ],
                  style: {
                    position: "absolute",
                    zIndex: String(zIndex),
                    top: String(box.top + greenNoticeIndent + circleWidth + window.scrollY) + "px",
                    left: String(box.left - 1) + "px",
                    paddingLeft: String(greenNoticePaddingLeft) + ea,
                    paddingRight: String(greenNoticePaddingLeft) + ea,
                    paddingTop: String(greenNoticePaddingTop) + ea,
                    paddingBottom: String(greenNoticePaddingBottom) + ea,                  
                    background: colorChip.gradientGreen,
                    borderRadius: String(5) + "px",
                    "min-width": String(greenNoticeMinWidth) + ea,
                    "max-width": String(greenNoticeMaxWidth) + ea,
                    animation: "fadeuplite 0.3s ease forwards",
                  },
                  children: [
                    {
                      text: notice,
                      style: {
                        position: "relative",
                        fontSize: String(greenNoticeSize) + ea,
                        fontWeight: String(greenNoticeWeight),
                        color: colorChip.white,
                        lineHeight: String(greenNoticeLineHeight),
                      }
                    }
                  ]
                });
  
                fireEvent(findByAttribute(document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)), "index", String(index)), "click");
              }
            },
            class: [ fourStepClassName + String(x) + String(z) + String(s) ],
            style: {
              display: "inline-flex",
              position: "absolute",
              background: instance.contents[x].contents[z].selectValue(designer).includes(s) ? colorChip.green : colorChip.gray4,
              width: String(noticeCircleWidth) + ea,
              height: String(noticeCircleWidth) + ea,
              borderRadius: String(noticeCircleWidth) + ea,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              top: desktop ? String(noticeCircleTop) + ea : ("calc(calc(calc(" + String(getRealBox(valueBlock.children[s]).height * factorVisualBetween) + "px" + " + " + String(factorBetween) + ea + ") * " + String(Math.floor(s / 2)) + ") + " + String(noticeCircleTop) + ea + ")"),
              left: desktop ? "calc(" + (String(firstWidth + circleBoxWidth + questionBetween) + ea + " + " + String(((valueBlock.getBoundingClientRect().width / divideNumber) * s) + getRealBox(valueBlock.children[s]).width) + "px" + ")") : ("calc(" + String(firstWidth + circleBoxWidth + questionBetween) + ea + " + " + String(((valueBlock.getBoundingClientRect().width / divideNumber) * (s % 2)) + getRealBox(valueBlock.children[s]).width) + "px" + ")"),
            },
            child: {
              text: "?",
              style: {
                position: "relative",
                fontSize: String(questionSize) + ea,
                fontWeight: String(questionWeight),
                top: String(questionTextTop) + ea,
                color: colorChip.white,
                fontFamily: "graphik",
              }
            }
          })
        }

      }


    } else if (Array.isArray(value)) {
      valueBlock = createNode({
        mother: baseBlock,
        attribute: { value, x: String(x), z: String(z) },
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(firstWidth + circleBoxWidth, ea),
          verticalAlign: "top",
        },
      });
      careerBlocksRender(value, valueBlock);

    } else if (typeof value === "object" && value !== null && Array.isArray(value.__order__)) {

      valueBlock = createNode({
        mother: baseBlock,
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          width: desktop ? withOut(firstWidth + circleBoxWidth, ea) : withOut(0),
          verticalAlign: "top",
          paddingTop: desktop ? "" : String(2.5) + ea,
          paddingLeft: desktop ? "" : String(circleBoxWidth) + ea,
        },
      });

      num = 0;
      for (let key of value.__order__) {

        tendencyTong = createNode({
          mother: valueBlock,
          style: {
            display: "block",
            position: "relative",
            marginTop: String(num !== 0 ? (desktop ? factorBetween : mobileTendencyFactorBetween) : 0) + ea,
          },
          children: [
            {
              text: value[key].name,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(contentsSize) + ea,
                fontWeight: String(contentsWeight1),
                width: String(tendencyBlockWidth) + ea,
                verticalAlign: "top",
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                top: String(tendencyBlockTop) + ea,
                width: desktop ? withOut(tendencyBlockWidth * tendencyMinusRatio, ea) : withOut(tendencyBlockWidth + circleBoxWidth, ea),
                height: String(tendencyBlockHeight) + ea,
                verticalAlign: "top",
                borderRadius: String(3) + "px",
                overflow: "hidden",
              },
            }
          ]
        }).children[1];

        for (let i = 0; i < tendencyValueConst; i++) {
          createNode({
            mother: tendencyTong,
            class: [ tendencyBarTargetClassName + String(x) + String(num) + String(z) ],
            attribute: {
              x: String(x),
              y: String(num),
              z: String(z),
              i: String(i),
              color: value.__color__,
            },
            event: {
              click: function (e) {
                const x = Number(this.getAttribute('x'));
                const y = Number(this.getAttribute('y'));
                const z = Number(this.getAttribute('z'));
                const i = Number(this.getAttribute('i'));
                const targets = [ ...document.querySelectorAll('.' + tendencyBarTargetClassName + String(x) + String(y) + String(z)) ];
                for (let a = 0; a < targets.length; a++) {
                  if (a <= i) {
                    targets[a].style.background = this.getAttribute("color");
                  } else {
                    targets[a].style.background = colorChip.gray1;
                  }
                }
                instance.contents[x].contents[z].updateValue(i + 1, instance.contents[x].contents[z].returnValue(instance.designer).__order__[y], instance.designer).catch((err) => { console.log(err); });
              }
            },
            style: {
              display: "inline-block",
              height: withOut(0),
              width: "calc(100% / " + String(tendencyValueConst) + ")",
              background: value[key].value > i ? value.__color__ : colorChip.gray1,
              cursor: "pointer",
              transition: "all 0s ease",
            }
          });
        }

        num++;
      }
    }

    z++;
  }

  for (let { title, body } of notice) {
    createNode({
      mother: grayBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "row",
        marginBottom: String(12) + ea,
      },
      children: [
        {
          text: "- ",
          style: {
            position: "relative",
            fontSize: String(12) + ea,
            fontWeight: String(600),
            color: colorChip.gray5,
            lineHeight: String(1.6),
            marginRight: String(4) + ea,
          }
        },
        {
          text: "<b%" + title + "%b> : " + "\n" + body,
          style: {
            position: "relative",
            fontSize: String(12) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            lineHeight: String(1.6),
          },
          bold: {
            fontSize: String(12) + ea,
            fontWeight: String(800),
            color: colorChip.black,
          }
        },
      ]
    });
  }
}

DesignerAboutJs.prototype.insertPossibleNoticeBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      title: "프로젝트 가능 건 표시",
      contents: [
        "해당 날짜에 표시된 숫자는 진행 가능한 디자이너 판단의 기준이 되며, 자동 큐레이션이 진행될 시 중요한 연산 기준이 됩니다.",
      ],
    },
    {
      title: "콘솔 이용 방법",
      contents: [
        "날짜 범위를 선택하면, 그 범위에 가능한 프로젝트 가능 건수를 묻는 팝업이 제시됩니다.",
        "하루를 선택하기 위해선 <b%해당 날짜를 두 번 클릭%b>하시면 선택이 되고, 건수를 묻습니다."
      ],
    },
  ];
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 40, 36, 30, 22, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 2 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6.5 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
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
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: desktop ? String(titleBottom) + ea : "",
          zIndex: mobile ? String(1) : "",
          textAlign: desktop ? "" : "center",
        },
        children: [
          {
            style: {
              display: desktop ? "none" : "block",
              position: "absolute",
              borderBottom: "1px dashed " + colorChip.gray4,
              height: String(2.7) + ea,
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
            }
          },
          {
            text: "가능 일정 표시 안내",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(800),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              paddingLeft: desktop ? "" : String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(19) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(4.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of mainContents) {
    num2 = 0;
    for (let str of contents) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === contents.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                style: {
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: str,
            style: {
              display: "inline-block",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight : secondWidth + secondMarginRight, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
          },
        ]
      });

      num2++;
    }
    num++;
  }

}

DesignerAboutJs.prototype.calendarChain = function () {
  const instance = this;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const { normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;

  if (normalMode) {
    this.normalBaseTong = createNode({
      mother: instance.totalContents,
      style: {
        display: "block",
        position: "relative",
        top: String(8) + ea,
        height: withOut(8, ea),
        width: withOut(0, ea),
        overflow: "scroll",
      }
    })
  }

  for (let i = 0; i < 18; i++) {
    instance.insertCalendarBox(i);
  }
}

DesignerAboutJs.prototype.boxToPossible = async function () {
  const instance = this;
  const { ajaxJson, stringToDate, equalJson, homeliaisonAnalytics } = GeneralJs;
  const { entireMode } = this;
  try {
    let newPossible;
    let start, end, matrix;
    let tempObj;
    let thisPossible;
    let yesterdayPossible;
    let updateQuery;

    newPossible = [];
    yesterdayPossible = null;
    tempObj = null;
    for (let { value, dom } of this.possibleBoxes) {
      thisPossible = Number(dom.firstChild.getAttribute("possible"));

      if (yesterdayPossible === thisPossible) {
        // pass
      } else {
        if (tempObj === null) {
          if (thisPossible !== 0) {
            tempObj = {};
            tempObj.start = stringToDate(value);
            tempObj.matrix = [ thisPossible, thisPossible, thisPossible, thisPossible ];
          } else {
            // pass
          }
        } else if (typeof tempObj === "object") {
          tempObj.end = stringToDate(value);
          tempObj.end.setDate(tempObj.end.getDate() - 1);
          newPossible.push(equalJson(JSON.stringify(tempObj)));
          tempObj = null;
          if (thisPossible !== 0) {
            tempObj = {};
            tempObj.start = stringToDate(value);
            tempObj.matrix = [ thisPossible, thisPossible, thisPossible, thisPossible ];
          } else {
            // pass
          }
        }
      }

      yesterdayPossible = thisPossible;
    }

    this.realtimeDesigner.possible = equalJson(JSON.stringify(newPossible));
    this.realtimeDesigner.possible.sort((a, b) => { return a.start.valueOf() - b.start.valueOf() });
    updateQuery = {};
    updateQuery["possible"] = this.realtimeDesigner.possible;

    await ajaxJson({ mode: "update", desid: instance.designer.desid, updateQuery }, BACKHOST + "/realtimeDesigner");
    if (!entireMode) {
      await ajaxJson({
        message: instance.designer.designer + " 실장님이 디자이너 콘솔을 통해 일정을 업데이트 하셨습니다!",
        channel: "#300_designer",
        voice: true,
        fairy: true,
      }, BACKHOST + "/sendSlack");
      await homeliaisonAnalytics({
        page: instance.pageName,
        standard: instance.firstPageViewTime,
        action: "realtimeDesigner",
        data: {
          desid: instance.designer.desid,
          date: new Date(),
          possible: this.realtimeDesigner.possible
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerAboutJs.prototype.possiblePrompt = function () {
  const instance = this;
  const { clients, projects, requestNumber, ea, baseTong, media, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar } = GeneralJs;
  const possiblePromptClassName = "possiblePromptClassName";
  let cancelBack, whitePrompt;
  let zIndex;
  let whiteWidth, whiteHeight;
  let selectionReset;
  let innerPaddingTop, innerPaddingLeft;
  let questionSize, questionWeight;
  let grayWidth, grayHeight, grayMarginTop;
  let inputSize, inputWeight;
  let loadingHeight;
  let loadingBetween;
  let questionTextTop;

  whiteWidth = <%% 324, 324, 308, 294, 58.5 %%>;
  whiteHeight = <%% 136, 136, 130, 122, 21.6 %%>;
  zIndex = 4;

  innerPaddingTop = <%% 30, 30, 28, 26, 4 %%>;
  innerPaddingLeft = <%% 36, 36, 36, 36, 5 %%>;

  questionSize = <%% 18, 18, 17, 16, 3.5 %%>;
  questionWeight = <%% 700, 700, 700, 700, 700 %%>;
  questionTextTop = <%% (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), (isMac() ? 0 : 2), 0 %%>;

  grayMarginTop = <%% 14, 14, 13, 12, 1.8 %%>;
  grayWidth = <%% 210, 210, 198, 184, 42.5 %%>;
  grayHeight = <%% 32, 32, 30, 30, 5.6 %%>;

  inputSize = <%% 14, 14, 13, 13, 2.6 %%>;
  inputWeight = <%% 400, 400, 400, 400, 400 %%>;

  loadingBetween = <%% 11, 11, 10, 10, 1.8 %%>;
  loadingHeight = <%% 30, 30, 28, 28, 4.2 %%>;

  selectionReset = () => {
    for (let { dom } of instance.possibleBoxes) {
      dom.style.background = Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.gray0 : colorChip.white;
      dom.firstChild.setAttribute("background", Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.gray0 : colorChip.white);
      dom.firstChild.setAttribute("color", Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green);
      dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
      dom.firstChild.style.color =  Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
      dom.setAttribute("toggle", "off");
    }
    instance.selection = [];
  }

  cancelBack = createNode({
    mother: totalContents,
    class: [ possiblePromptClassName ],
    event: {
      mousedown: (e) => { e.stopPropagation() },
      mouseup: (e) => { e.stopPropagation() },
      click: function (e) {
        const removeTargets = document.querySelectorAll('.' + possiblePromptClassName);
        for (let dom of removeTargets) {
          dom.remove();
        }
        selectionReset();
      }
    },
    style: {
      display: "block",
      position: "fixed",
      top: String(0),
      left: String(0),
      width: withOut(0),
      height: withOut(0),
      background: colorChip.black,
      opacity: String(0.3),
      zIndex: String(zIndex),
    }
  });

  whitePrompt = createNode({
    mother: totalContents,
    class: [ possiblePromptClassName ],
    event: {
      mousedown: (e) => { e.stopPropagation() },
      mouseup: (e) => { e.stopPropagation() },
    },
    style: {
      display: "inline-block",
      position: "fixed",
      top: withOut(50, (whiteHeight / 2), ea),
      left: withOut(50, (whiteWidth / 2), ea),
      width: String(whiteWidth) + ea,
      height: String(whiteHeight) + ea,
      background: colorChip.white,
      borderRadius: String(8) + "px",
      boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
      animation: "fadeuphard 0.5s ease forwards",
      overflow: "hidden",
      zIndex: String(zIndex),
      background: colorChip.white,
    },
    children: [
      {
        style: {
          display: "block",
          position: "relative",
          top: String(0),
          left: String(0),
          width: withOut(0),
          height: withOut(innerPaddingTop * 2, ea),
          paddingTop: String(innerPaddingTop) + ea,
          paddingBottom: String(innerPaddingTop) + ea,
        },
        children: [
          {
            text: "가능한 프로젝트 건수를 알려주세요!",
            style: {
              display: "block",
              position: "relative",
              fontSize: String(questionSize) + ea,
              fontWeight: String(questionWeight),
              color: colorChip.black,
              paddingLeft: String(innerPaddingLeft) + ea,
              top: String(questionTextTop) + ea,
            }
          },
          {
            style: {
              display: "block",
              marginTop: String(grayMarginTop) + ea,
              position: "relative",
              paddingLeft: String(innerPaddingLeft) + ea,
              paddingRight: String(innerPaddingLeft) + ea,
              width: withOut(innerPaddingLeft * 2, ea),
            },
            children: [
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  height: String(grayHeight) + ea,
                  width: String(grayWidth) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gray1,
                  verticalAlign: "top",
                },
                children: [
                  {
                    mode: "input",
                    attribute: {
                      type: "text",
                      placeholder: "1건",
                    },
                    event: {
                      keyup: function (e) {
                        let possibleValue, range, finalObj, removeTargets;

                        if (e.key === "Enter") {
                          if (this.value.trim() !== '') {
                            possibleValue = Number(this.value.replace(/[^0-9]/gi, ''));
                            if (Number.isNaN(possibleValue)) {
                              this.value = '';
                            } else {
                              if (instance.selection.length >= 2) {
                                range = [ stringToDate(instance.selection[0].value), stringToDate(instance.selection[1].value) ];
                                range.sort((a, b) => { return a.valueOf() - b.valueOf() });
                                for (let { value, dom } of instance.possibleBoxes) {
                                  if (range[0].valueOf() <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= range[1].valueOf()) {
                                    dom.firstChild.setAttribute("possible", String(possibleValue));
                                    dom.firstChild.textContent = String(possibleValue) + (desktop ? "건 가능" : "건");
                                  }
                                }

                                instance.boxToPossible().catch((err) => { console.log(err); });

                                removeTargets = document.querySelectorAll('.' + possiblePromptClassName);
                                for (let dom of removeTargets) {
                                  dom.remove();
                                }
                                selectionReset();

                              }
                            }
                          }
                        }
                      },
                    },
                    style: {
                      position: "absolute",
                      top: String(0),
                      left: String(0),
                      width: withOut(0),
                      height: withOut(3, '%'),
                      fontSize: String(inputSize) + ea,
                      fontWeight: String(inputWeight),
                      color: colorChip.black,
                      border: String(0),
                      outline: String(0),
                      textAlign: "center",
                      background: "transparent",
                    }
                  }
                ]
              },
              {
                mode: "svg",
                source: instance.mother.returnLoading(),
                style: {
                  display: "inline-block",
                  position: "relative",
                  marginLeft: String(loadingBetween) + ea,
                  height: String(loadingHeight) + ea,
                  top: String((grayHeight - loadingHeight) / 2) + ea,
                  animation: "loadingrotate 1.7s linear infinite",
                  verticalAlign: "top",
                }
              }
            ]
          }
        ]
      },
    ]
  });

  whitePrompt.querySelector("input").focus();

}

DesignerAboutJs.prototype.insertCalendarBox = function (standardIndex = 0) {
  const instance = this;
  const mother = this.mother;
  const { clients, projects, requestNumber, ea, baseTong, media } = this;
  const { entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, serviceParsing, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, equalJson, isIphone, svgMaker, colorCalendar, setQueue, returnGet } = GeneralJs;
  const isDateValid = (date) => {
    return ((new Date(2000, 0, 1)).valueOf() <= date.valueOf() && (new Date(3000, 0, 1)).valueOf() > date.valueOf());
  }
  const getObj = returnGet();
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
  let tong;
  let whiteBottomMargin;
  let grayBetween;
  let dateArr;
  let thisCalendar;
  let standardDate;
  let dateBoxes;
  let possibleSize;
  let possibleWeight;
  let possibleTextTop;
  let possibleBox;
  let valueRange;
  let thisDate;
  let thisPossible;
  let blankBoxes;
  let grayZoneWidth;
  let grayZoneContentsWidth;
  let grayPadding;
  let grayInnerPadding;
  let grayInnerPaddingTop;
  let grayZone;
  let noticeSize;

  grayZoneWidth = <%% 250, 0, 0, 0, 0 %%>;
  grayZoneContentsWidth = <%% 200, 0, 0, 0, 0 %%>;
  grayPadding = <%% 52, 0, 0, 0, 0 %%>;
  grayInnerPadding = <%% 22, 0, 0, 0, 0 %%>;
  grayInnerPaddingTop = <%% 24, 0, 0, 0, 0 %%>;
  noticeSize = <%% 12, 0, 0, 0, 0 %%>;

  grayBetween = <%% 40, 0, 0, 0, 0 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 0 %%>;
  if (normalMode) {
    margin = 24;
    paddingTop = 0;
    whiteBottomMargin = 12;
  } else {
    margin = <%% 55, 55, 47, 39, 0 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 6 %%>;
    whiteBottomMargin = <%% 20, 52, 44, 36, 0 %%>;
  }

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 2 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 3 %%>;

  possibleSize = <%% 18, 17, 16, 14, 3 %%>;
  possibleWeight = <%% 400, 400, 400, 400, 400 %%>;
  possibleTextTop = <%% 0, 0, 0, 0, 0 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  standardDate = new Date();
  for (let i = 0; i < standardIndex; i++) {
    standardDate.setMonth(standardDate.getMonth() + 1);
  }

  whiteBlock = createNode({
    mother: entireMode ? (normalMode ? instance.normalBaseTong : instance.totalContents) : baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
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
      marginBottom: String(grayBetween) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          width: String(grayZoneWidth) + ea,
          height: withOut(0, ea),
        },
        child: {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(grayZoneContentsWidth - (grayInnerPadding * 2)) + ea,
            height: withOut(grayInnerPaddingTop + grayInnerPadding, ea),
            background: colorChip.gray0,
            zIndex: String(1),
            padding: String(grayInnerPadding) + ea,
            paddingTop: String(grayInnerPaddingTop) + ea,
            borderRadius: String(5) + "px",
          }
        }
      },
      {
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: withOut(grayZoneWidth, ea),
          overflow: "hidden",
          marginBottom: String(0) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;
  grayZone = block.firstChild;

  createNode({
    mother: grayZone.firstChild,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      flexDirection: "row",
    },
    children: [
      {
        text: "- ",
        style: {
          position: "relative",
          fontSize: String(noticeSize) + ea,
          fontWeight: String(600),
          color: colorChip.gray5,
          lineHeight: String(1.6),
          marginRight: String(4) + ea,
        }
      },
      {
        text: "<b%" + String(standardDate.getMonth() + 1) + "월 가능 일정 표시" + "%b> : " + "\n" + "시작일과 종료일을 찍은 후,\n가능한 건수의 개수를 적어주시면 됩니다!",
        style: {
          position: "relative",
          fontSize: String(noticeSize) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          lineHeight: String(1.6),
        },
        bold: {
          fontSize: String(noticeSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      },
    ]
  });

  dateArr = [
    {
      contents: {
        color: colorChip.red,
        description: "",
        title: "오늘",
      },
      date: {
        start: new Date(),
        end: new Date(),
      }
    },
  ];
  thisCalendar = colorCalendar(tong, dateArr, { standardDate });
  grayZone.style.height = String(tong.getBoundingClientRect().height) + "px";

  thisCalendar.querySelector("svg").remove();
  thisCalendar.querySelector("svg").remove();

  if (normalMode) {
    thisCalendar.firstChild.style.marginBottom = String(16) + ea;
    thisCalendar.firstChild.firstChild.style.fontSize = String(28) + ea;
  }

  blankBoxes = [ ...thisCalendar.children[1].children ].slice(7).filter((dom) => {
    return dom.firstChild.textContent.trim() === '';
  })

  for (let dom of blankBoxes) {
    dom.style.background = colorChip.gray2;
  }

  dateBoxes = [ ...thisCalendar.children[1].children ].slice(7).filter((dom) => {
    return dom.firstChild.textContent.trim() !== '';
  }).map((dom) => {
    cleanChildren(dom.children[1]);
    cleanChildren(dom.children[2]);
    dom.style.cursor = "pointer";
    return dom;
  })

  for (let mother of dateBoxes) {

    mother.firstChild.style.zIndex = String(1);
    mother.firstChild.setAttribute("color", mother.firstChild.style.color);

    thisDate = new Date(standardDate.getFullYear(), standardDate.getMonth(), Number(mother.firstChild.textContent));
    thisPossible = 0;
    for (let { start, end, matrix } of instance.realtimeDesigner.possible) {
      if (start.valueOf() <= thisDate.valueOf() && thisDate.valueOf() <= end.valueOf()) {
        thisPossible = matrix.reduce((acc, curr) => { return curr >= acc ? curr : acc }, 0);
      }
    }

    possibleBox = createNode({
      mother,
      attribute: {
        toggle: "off",
        value: dateToString(thisDate),
      },
      event: {
        selectstart: (e) => { e.preventDefault(); },
        contextmenu: (e) => { e.preventDefault(); },
        mouseenter: function (e) {
          const toggle = this.getAttribute("toggle");
          if (!instance.isMouseDown) {
            if (toggle === "off") {
              this.style.background = colorChip.liteGreen;
              this.parentNode.firstChild.style.color = colorChip.green;
            }
          } else {
            valueRange = [ stringToDate(instance.downSelection.getAttribute("value")).valueOf(), stringToDate(this.getAttribute("value")).valueOf() ];
            valueRange.sort((a, b) => { return a - b; });
            for (let { value, dom } of instance.possibleBoxes) {
              if (valueRange[0] <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= valueRange[1]) {
                dom.style.background = colorChip.middleGreen;
                dom.parentNode.firstChild.style.color = colorChip.darkGreen;
                dom.firstChild.style.color = colorChip.darkGreen;
              } else {
                dom.style.background = colorChip.white;
                dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                dom.firstChild.style.color = colorChip.deactive;
              }
            }

          }
        },
        mouseleave: function (e) {
          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.style.background = this.firstChild.getAttribute("background");
            this.parentNode.firstChild.style.color = this.parentNode.firstChild.getAttribute("color");
          }
        },
        mousedown: function (e) {
          e.stopPropagation();
          instance.isMouseDown = true;
          instance.downSelection = this;
        },
        mouseup: function (e) {
          e.stopPropagation();
          instance.isMouseDown = false;

          if (instance.downSelection !== null) {

            if (instance.downSelection === this) {

              instance.downSelection = null;

            } else {
              valueRange = [ stringToDate(instance.downSelection.getAttribute("value")).valueOf(), stringToDate(this.getAttribute("value")).valueOf() ];
              valueRange.sort((a, b) => { return a - b; });
              for (let { value, dom } of instance.possibleBoxes) {
                if (valueRange[0] <= stringToDate(value).valueOf() && stringToDate(value).valueOf() <= valueRange[1]) {
                  dom.style.background = colorChip.green;
                  dom.parentNode.firstChild.style.color = colorChip.white;
                  dom.firstChild.style.color = colorChip.white;
                  dom.setAttribute("toggle", "on");
                } else {
                  dom.style.background = colorChip.white;
                  dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                  dom.firstChild.style.color = Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
                  dom.setAttribute("toggle", "off");
                }
              }

              instance.selection = [
                {
                  value: instance.downSelection.getAttribute("value"),
                  dom: instance.downSelection
                },
                {
                  value: this.getAttribute("value"),
                  dom: this,
                }
              ];
              instance.selection.sort((a, b) => {
                return stringToDate(a.value).valueOf() - stringToDate(b.value).valueOf();
              })

              instance.downSelection = null;

              setQueue(() => {
                instance.possiblePrompt();
              });
            }

          } else {
            instance.downSelection = null;
            instance.selection = [];
          }

        },
        click: function (e) {
          const value = this.getAttribute("value");
          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.style.background = colorChip.green;
            this.parentNode.firstChild.style.color = colorChip.white;
            this.firstChild.style.color = colorChip.white;
            this.setAttribute("toggle", "on");

            instance.selection.push({
              value,
              dom: this,
            });

            if (instance.selection.length === 1) {

              // pass

            } else if (instance.selection.length === 2) {

              valueRange = [ stringToDate(instance.selection[0].value).valueOf(), stringToDate(instance.selection[1].value).valueOf() ];
              valueRange.sort((a, b) => { return a - b; });

              for (let { value, dom } of instance.possibleBoxes) {
                if (valueRange[0] < stringToDate(value).valueOf() && stringToDate(value).valueOf() < valueRange[1]) {
                  dom.style.background = colorChip.green;
                  dom.parentNode.firstChild.style.color = colorChip.white;
                  dom.firstChild.style.color = colorChip.white;
                  dom.setAttribute("toggle", "on");
                }
              }

              setQueue(() => {
                instance.possiblePrompt();
              });

            } else {
              for (let { dom } of instance.possibleBoxes) {
                dom.style.background = colorChip.white;
                dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
                dom.firstChild.style.color = colorChip.green;
                dom.setAttribute("toggle", "off");
              }
              instance.selection = [];
            }

          } else {

            instance.selection.push({ value, dom: this });

            setQueue(() => {
              instance.possiblePrompt();
            });

          }
        }
      },
      style: {
        display: "flex",
        position: "absolute",
        top: String(0),
        left: String(0),
        width: withOut(0),
        height: withOut(0),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: thisPossible === 0 ? colorChip.gray0 : colorChip.white,
        transition: "all 0.3s ease",
      },
      children: [
        {
          event: {
            selectstart: (e) => { e.preventDefault(); },
          },
          attribute: {
            background: thisPossible === 0 ? colorChip.gray0 : colorChip.white,
            color: thisPossible === 0 ? colorChip.deactive : colorChip.green,
            possible: String(thisPossible),
          },
          text: String(thisPossible) + (desktop ? "건 가능" : "건"),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(possibleSize) + ea,
            fontWeight: String(possibleWeight),
            color: thisPossible === 0 ? colorChip.deactive : colorChip.green,
            top: String(possibleTextTop) + ea,
          }
        }
      ]
    })
    this.possibleBoxes.push({
      value: dateToString(new Date(standardDate.getFullYear(), standardDate.getMonth(), Number(mother.firstChild.textContent))),
      dom: possibleBox,
    });
  }

}

DesignerAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, colorChip, stringToLink } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    const adminMode = (getObj.admin === "true");
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let response, services;
    let ghostContents;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

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

    this.realtimeDesigner = await ajaxJson({ mode: "get", desid }, BACKHOST + "/realtimeDesigner", { equal: true });

    this.profileList = await ajaxJson({ desid }, BRIDGEHOST + "/designerProfileList", { equal: true });
    this.profileList = this.profileList.map((o) => { o.link = stringToLink(o.link); return o; });
    this.profilePhoto = DesignerAboutJs.binaryPath + "/blankProfile.jpg";
    this.profileTarget = null;
    if (this.profileList.length > 0) {
      this.profilePhoto = this.profileList[0].link;
      this.profileTarget = this.profileList[0];
    }

    this.worksList = await ajaxJson({ desid }, BRIDGEHOST + "/designerWorksList", { equal: true });
    this.worksList.forEach((arr) => {
      arr.forEach((o) => {
        o.link = stringToLink(o.link);
        return o;
      })
    });

    this.worksListTarget = [ null, null, null, null ];
    if (this.worksList[0].length > 0) {
      this.worksListTarget[0] = this.worksList[0][0];
    }
    if (this.worksList[1].length > 0) {
      this.worksListTarget[1] = this.worksList[1][0];
    }
    if (this.worksList[2].length > 0) {
      this.worksListTarget[2] = this.worksList[2][0];
    }
    if (this.worksList[3].length > 0) {
      this.worksListTarget[3] = this.worksList[3][0];
    }

    this.selection = [];
    this.possibleBoxes = [];
    this.isMouseDown = false;
    this.downSelection = null;
    this.careerBlocksRender = (value, tong) => {};
    this.grayLoading = null;
    this.profileUploadProcess = false;

    this.entireMode = entireMode;
    this.normalMode = normalMode;
    this.adminMode = adminMode;

    this.nowUploading = false;
    this.targetKeywords = "/photo/designer/representative";
    this.targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + this.targetKeywords + "/" + this.designer.desid;
    this.itemList = [];

    document.body.addEventListener("mouseup", (e) => {
      instance.isMouseDown = false;
      instance.downSelection = null;
      for (let { value, dom } of instance.possibleBoxes) {
        // dom.style.background = colorChip.white;
        dom.parentNode.firstChild.style.color = dom.parentNode.firstChild.getAttribute("color");
        dom.firstChild.style.color =  Number(dom.firstChild.getAttribute("possible")) === 0 ? colorChip.deactive : colorChip.green;
        dom.setAttribute("toggle", "off");
      }
      this.selection = [];
    });

    // if (typeof window.localStorage.getItem("HL_desid") === "string") {
    //   if (window.localStorage.getItem("HL_desid") !== desid) {
    //     GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    //   }
    // } else {
    //   GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    // }

    if (!entireMode) {
      await this.mother.ghostDesignerLaunching({
        name: "designerAbout",
        designer: this.designer,
        base: {
          instance: this,
          binaryPath: DesignerAboutJs.binaryPath,
          subTitle: "",
        },
        local: async () => {
          try {
            instance.insertInitBox();
            instance.insertNoticeBox();
            instance.insertProfileBox();
            instance.insertWorkingBox();
            instance.insertIntroduceBox();
            instance.insertThreeStrongBox();
            instance.contentsCenter();
            await instance.insertRepresentativeBox();
            instance.insertPossibleNoticeBox();
            instance.calendarChain();
          } catch (e) {
            await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
          }
        }
      });
    } else {
      instance.contentsCenter();
      instance.insertProfileBox();
      instance.insertWorkingBox();
      instance.insertIntroduceBox();
      instance.insertThreeStrongBox();
      await instance.insertRepresentativeBox();
    }

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
