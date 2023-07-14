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

DesignerAboutJs.prototype.contentsCenter = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, designer } = this;
  const { desid } = designer;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, autoHypenPhone, equalJson } = GeneralJs;
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
              return text;
            } catch (e) {
              console.log(e);
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
              const text = raw.replace(/[^0-9\-]/gi, '');
              let whereQuery, updateQuery;
              whereQuery = { desid };
              updateQuery = {};
              updateQuery["information.phone"] = text;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              return text;
            } catch (e) {
              console.log(e);
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
              if (!/년/gi.test(raw)) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }
              if (!/월/gi.test(raw)) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }
              if (!/일/gi.test(raw)) {
                throw new Error("올바른 형태로 적어주세요! => 0000년 00월 00일");
              }
              const [ year, month, date ] = raw.split(/[년월]/gi).map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
              let newDate;
              let whereQuery, updateQuery;

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
              return text;
            } catch (e) {
              console.log(e);
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

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
              return text;
            } catch (e) {
              console.log(e);
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
              return text;
            } catch (e) {
              console.log(e);
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
              return text;
            } catch (e) {
              console.log(e);
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
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];
              if (typeof text !== "string") {
                text = columns[1];
              }

              await ajaxJson({ message: designer.designer + " 실장님이 콘솔을 통해 상태 변경을 시도하셨습니다!", channel: "#300_designer", voice: true }, BACKHOST + "/sendSlack");
              window.alert("상태 변경시, 홈리에종에 직접 문의해주세요!");
              window.location.reload();

              // instance.designer.analytics.grade = columns.findIndex((str) => { return str === text }) - 1;
              // updateQuery["analytics.grade"] = columns.findIndex((str) => { return str === text }) - 1;
              //
              // await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
          noticeText: (designer) => {
            return "홈리에종과의 협업 기간, 프로젝트 개수, 매칭율에 따라 정해진 디자이너 분류 체계입니다. 변경을 희망하신다면 홈리에종에 직접 문의를 남겨주세요!";
          },
        },
        {
          property: "파트너십 기간",
          admin: false,
          returnValue: (designer) => {
            return `시작일 : ${String(designer.information.business.career.startY)}년 ${String(designer.information.business.career.startM)}월`;
          },
          renderValue: (text) => {
            return text.replace(/년/i, '-').replace(/[^0-9\-]/gi, '').trim();
          },
          updateValue: async (raw, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let arr;

              whereQuery = { desid };
              updateQuery = {};

              arr = raw.trim().split("-");
              if (arr.length !== 2) {
                throw new Error("invalid text");
              }

              arr = arr.map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
              if (arr.some(Number.isNaN)) {
                throw new Error("invalid text");
              }

              if (arr[1] >= 13) {
                throw new Error("invalid text");
              }

              if (arr[0] < 2000) {
                throw new Error("invalid text");
              }

              if (arr[0] < 0 || arr[1] < 0) {
                throw new Error("invalid text");
              }

              updateQuery["information.business.career.startY"] = arr[0];
              updateQuery["information.business.career.startM"] = arr[1];

              instance.designer.information.business.career.startY = arr[0];
              instance.designer.information.business.career.startM = arr[1];

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

              return `시작일 : ${String(arr[0])}년 ${String(arr[1])}월`;

            } catch (e) {
              window.alert("형식에 맞게 적어주세요! '0000(년도)-00(월)'");
              return `시작일 : ${String(designer.information.business.career.startY)}년 ${String(designer.information.business.career.startM)}월`;
            }
          },
          noticeText: (designer) => {
            return "홈스타일링을 본격적으로 시작한 날짜의 년도와 월을 적어주세요!";
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
            ];
            const endMatrix = careerData.map((obj) => {
              const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
              const startDate = obj.date.start;
              const startWords = (String(obj.date.start.getFullYear()).slice(2) + "년 " + String(obj.date.start.getMonth() + 1) + "월");
              const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "년 " + String(obj.date.end.getMonth() + 1) + "월");
              const delta = endDate.valueOf() - startDate.valueOf();
              const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
              const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
              return {
                title: titleArr,
                value: [
                  obj.company + pipe + obj.team,
                  obj.role,
                  rangeWords
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
              ];
              const careerData = equalJson(JSON.stringify(designer.information.business.career.detail));
              careerData.sort((a, b) => {
                return b.date.start.valueOf() - a.date.start.valueOf();
              });
              let newData, whereQuery, updateQuery, endMatrix;
              let newValue;
              let company;
              let team;
              let role;
              let start;
              let end;

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
                  const startWords = (String(obj.date.start.getFullYear()).slice(2) + "년 " + String(obj.date.start.getMonth() + 1) + "월");
                  const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "년 " + String(obj.date.end.getMonth() + 1) + "월");
                  const delta = endDate.valueOf() - startDate.valueOf();
                  const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                  const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                  return {
                    title: titleArr,
                    value: [
                      obj.company + pipe + obj.team,
                      obj.role,
                      rangeWords
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.detail"] = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
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
                start = raw.value[4][1];
                end = raw.value[5][1];

                newValue = {
                  company,
                  team,
                  role,
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
                  const startWords = (String(obj.date.start.getFullYear()).slice(2) + "년 " + String(obj.date.start.getMonth() + 1) + "월");
                  const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "년 " + String(obj.date.end.getMonth() + 1) + "월");
                  const delta = endDate.valueOf() - startDate.valueOf();
                  const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                  const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                  return {
                    title: titleArr,
                    value: [
                      obj.company + pipe + obj.team,
                      obj.role,
                      rangeWords
                    ]
                  };
                });
                instance.careerBlocksRender(endMatrix, raw.tong);
  
                whereQuery = { desid: designer.desid };
                updateQuery = {};
                updateQuery["information.business.career.detail"] = newData;
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
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
              ];
              let company, team, role, start, end;
              let block;
              let original;
              let whereQuery, updateQuery;
              let endMatrix;

              company = matrix[0][1];
              team = matrix[1][1];
              role = matrix[2][1];
              start = matrix[4][1];
              end = matrix[5][1];

              block = {
                company,
                team,
                role,
                date: { start, end }
              };

              original = equalJson(JSON.stringify(designer.information.business.career.detail));
              original.push(block);
              original.sort((a, b) => { return b.date.start.valueOf() - a.date.start.valueOf() });

              instance.designer.information.business.career.detail = original;
              endMatrix = original.map((obj) => {
                const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
                const startDate = obj.date.start;
                const startWords = (String(obj.date.start.getFullYear()).slice(2) + "년 " + String(obj.date.start.getMonth() + 1) + "월");
                const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "년 " + String(obj.date.end.getMonth() + 1) + "월");
                const delta = endDate.valueOf() - startDate.valueOf();
                const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
                const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
                return {
                  title: titleArr,
                  value: [
                    obj.company + pipe + obj.team,
                    obj.role,
                    rangeWords
                  ]
                };
              });
              instance.careerBlocksRender(endMatrix, tong);

              whereQuery = { desid: designer.desid };
              updateQuery = {};
              updateQuery["information.business.career.detail"] = original;
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
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
                await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
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
              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          }
        },
        {
          property: "유관 경력",
          admin: false,
          returnValue: (designer) => {
            return `총 ${String(designer.information.business.career.relatedY)}년 ${String(designer.information.business.career.relatedM)}개월`;
          },
          renderValue: (text) => {
            return text.replace(/^총 /gi, '').trim();
          },
          updateValue: async (raw, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let arr;

              whereQuery = { desid };
              updateQuery = {};

              arr = raw.trim().split("년");
              if (arr.length !== 2) {
                throw new Error("invalid text");
              }

              arr = arr.map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
              if (arr.some(Number.isNaN)) {
                throw new Error("invalid text");
              }

              if (arr[1] >= 12) {
                throw new Error("invalid text");
              }

              if (arr[0] < 0 || arr[1] < 0) {
                throw new Error("invalid text");
              }

              updateQuery["information.business.career.relatedY"] = arr[0];
              updateQuery["information.business.career.relatedM"] = arr[1];

              instance.designer.information.business.career.relatedY = arr[0];
              instance.designer.information.business.career.relatedM = arr[1];

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

              return `총 ${String(arr[0])}년 ${String(arr[1])}개월`;

            } catch (e) {
              window.alert("형식에 맞게 적어주세요! '00년 00개월'");
              return `총 ${String(designer.information.business.career.relatedY)}년 ${String(designer.information.business.career.relatedM)}개월`;
            }
          },
          noticeText: (designer) => {
            return "홈스타일링과 관련이 있는 리모델링(시공) 회사 경험을 총합하여 적어주세요!";
          },
        },
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
          property: "사업자 등록번호",
          admin: false,
          returnValue: (designer) => {
            return designer.information.business.businessInfo.businessNumber;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let arr;
              let obj;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\-]/g, '');

              instance.designer.information.business.businessInfo.businessNumber = text;
              updateQuery["information.business.businessInfo.businessNumber"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            return designer.information.business.businessInfo.businessNumber;
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let arr;
              let obj;

              whereQuery = { desid };
              updateQuery = {};

              text = raw.replace(/[^0-9\-]/g, '');

              instance.designer.information.business.businessInfo.businessNumber = text;
              updateQuery["information.business.businessInfo.businessNumber"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

              return text;

            } catch (e) {
              console.log(e);
              return designer.information.business.businessInfo.businessNumber;
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
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.information.business.businessInfo.classification = text;
              updateQuery["information.business.businessInfo.classification"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
          title: "파트너십 기간",
          body: "홈리에종과 파트너십을 시작한 날짜의 년도와 월을 적어주세요!",
        },
        {
          title: "사업자 등록번호",
          body: "프리랜서의 경우, 빈칸으로 남겨주세요!",
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

              return String(text) + "km";

            } catch (e) {
              window.alert("숫자로만 적어주세요!");
              return String(designer.analytics.region.range) + "km";
            }
          },
          noticeText: (designer) => {
            return "출장비를 받지 않고 기본적으로 가줄 수 있는 거리의 최대값입니다.";
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.region.transportation = text;
              updateQuery["analytics.region.transportation"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        }
      ],
      notice: [
        {
          title: "유효 범위",
          body: "출장비를 받지 않고 기본적으로 가줄 수 있는 거리의 최대값입니다.",
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
            return [ 0, 1, 2 ];
          },
          multiple: true,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {
              console.log(e);
            }
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
            return [ 0, 1, 2 ];
          },
          multiple: true,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {
              console.log(e);
            }
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
            return [ 1 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {
              console.log(e);
            }
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.online = (text === "가능");
              updateQuery["analytics.project.online"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.project.living = (text === "가능");
              updateQuery["analytics.project.living"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.styling.method = text;
              updateQuery["analytics.styling.method"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            return [ 1 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {
              console.log(e);
            }
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
            return [ 1 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

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
            return [ 2 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [
        {
          title: "제안 방식",
          body: "제안을 나누어서 순차적으로 하는 지, 한번에 제안하는 지에 대한 분류입니다.",
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
          returnValue: (designer) => {
            return "협업 시공사명";
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {

            } catch (e) {

            }
          },
        },
        {
          property: "자체 시공사",
          admin: false,
          returnValue: (designer) => {
            return "자체 시공사명";
          },
          renderValue: (text) => {
            return text;
          },
          updateValue: async (raw, designer) => {
            try {

            } catch (e) {

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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.construct.possible.supervision = (text === "가능");
              updateQuery["analytics.construct.possible.supervision"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [
        {
          title: "시공 가능",
          body: "각각 서비스마다 해당 서비스에 맞게 함께 작업이 가능한 시공사를 모두 선택해주세요!",
        },
      ],
    },
    {
      title: "제작 관련",
      whiteType: 1,
      admin: false,
      contents: [
        {
          property: "빌트인 제작",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {
              // let text, whereQuery, updateQuery;

              // whereQuery = { desid };
              // updateQuery = {};

              // text = columns[raw.findIndex((num) => { return num === 1 })];

              // instance.designer.analytics.styling.furniture.builtin = (text === "가능");
              // updateQuery["analytics.styling.furniture.builtin"] = (text === "가능");

              // await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "가구 제작",
          admin: false,
          returnValue: (designer) => { return [
            "가능",
            "불가능",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.styling.furniture.design) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.styling.furniture.design = (text === "가능");
              updateQuery["analytics.styling.furniture.design"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "패브릭 제작",
          admin: false,
          returnValue: (designer) => { return [
            "불가능",
            "하",
            "중",
            "상",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {
              // let text, whereQuery, updateQuery;

              // whereQuery = { desid };
              // updateQuery = {};

              // text = columns[raw.findIndex((num) => { return num === 1 })];

              // instance.designer.analytics.styling.furniture.builtin = (text === "가능");
              // updateQuery["analytics.styling.furniture.builtin"] = (text === "가능");

              // await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.purchase.setting.install = (text === "직접");
              updateQuery["analytics.purchase.setting.install"] = (text === "직접");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.purchase.setting.storage = (text === "연결");
              updateQuery["analytics.purchase.setting.storage"] = (text === "연결");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      notice: [],
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
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {

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
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {

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
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {

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
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {

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
            if (designer.analytics.styling.furniture.builtin) {
              return [ 0 ];
            } else {
              return [ 1 ];
            }
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

            } catch (e) {

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
            return [ 2 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {

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
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.style[target] = raw;
              updateQuery["analytics.styling.tendency.style." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.texture[target] = raw;
              updateQuery["analytics.styling.tendency.texture." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.color[target] = raw;
              updateQuery["analytics.styling.tendency.color." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
            try {
              let whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              designer.analytics.styling.tendency.density[target] = raw;
              updateQuery["analytics.styling.tendency.density." + target] = raw;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

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
  this.contents = contents;
  for (let i = 0; i < contents.length; i++) {
    this.renderWhite(contents[i].whiteType, contents[i].title, contents[i].contents, contents[i].notice, i + 1, i === (contents.length - 1));
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

  grayZoneWidth = <%% 250, 200, 160, 140, 32 %%>;
  grayZoneContentsWidth = <%% 200, 160, 140, 120, 30 %%>;
  grayPadding = <%% 52, 52, 44, 36, 4.7 %%>;
  grayInnerPadding = <%% 22, 22, 22, 22, 20 %%>;
  if (index === 0) {
    grayInnerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  } else {
    grayInnerPaddingTop = <%% 2, 2, 2, 2, 2 %%>;
  }

  titleWidth = <%% 200, 160, 140, 120, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 18, 18, 16, 15, 4 %%>;

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
      flexDirection: "row",
      position: "relative",
      width: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-flex" : "flex",
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
        "해당 정보를 클릭해보시면 수정 모드로 변하며, 초록색 글짜일 때 값을 바꿔준 후 완료 또는 Enter키를 눌러주시면 됩니다.",
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

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 7 %%>;

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
          paddingBottom: desktop ? "" : String(5.5) + ea,
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, ajaxForm, stringToDate, dateToString, cleanChildren, isMac, autoComma, fireEvent, equalJson, stringToLink, linkToString, setThrottle, setQueue, sleep, removeByClass } = GeneralJs;
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

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 20, 20, 7 %%>;

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

  profileWidth = <%% 239, 239, 239, 239, 239 %%>;
  profileMarginLeft = <%% 55, 55, 55, 55, 55 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 46, 46, 46, 46 %%>;
  profileUploadButtonHeight = <%% 20, 20, 20, 20, 20 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 10 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  exampleZoneWidth = <%% 500, 500, 500, 500, 500 %%>;
  if (normalMode) {
    exampleZoneMarginLeft = 24;
  } else {
    exampleZoneMarginLeft = <%% 72, 72, 72, 72, 72 %%>;
  }
  exampleUpDownBetween = <%% 18, 18, 18, 18, 18 %%>;

  exampleTextWidth = <%% 70, 70, 70, 70, 66 %%>;
  exampleTextSize = <%% 14, 14, 14, 14, 14 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% -1, -1, -1, -1, -1 %%>;
  exampleTextVisualLeft = <%% -2, -2, -2, -2, -2 %%>;

  exampleFactorWidth = <%% 110, 110, 110, 110, 110 %%>;
  exampleFactorMargin = <%% 30, 30, 30, 30, 30 %%>;

  goodBadSize = <%% 12, 12, 12, 12, 12 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 500 %%>;
  goodBadRight = <%% -14, -14, -14, -14, -14 %%>;

  fixImageWidth = window.innerHeight < 900 ? 700 : 800;
  fixImageHeight = window.innerHeight - 400;

  this.whiteMargin = (desktop ? margin : 0);

  photoResizeEvent = () => {
    return async function (e) {
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
              top: String(naviHeight) + ea,
              left: String(0),
              width: withOut(0, ea),
              height: withOut(naviHeight, ea),
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
                width: String(fixImageWidth) + ea,
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
                height: String(fixImageHeight) + ea,
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
    
                  this.style.top = withOut(finalY, (circleWidth / 2), ea);
                  this.style.left = withOut(finalX, (circleWidth / 2), ea);
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
              top: withOut((((instance.profileTarget.position.y - 50) / 100) * rangeY) + 50, circleWidth / 2, ea),
              left: withOut((((instance.profileTarget.position.x - 50) / 100) * rangeX) + 50, circleWidth / 2, ea),
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
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

            response = await ajaxForm(formData, BRIDGEHOST + "/designerProfilePhoto");
            responseObj = equalJson(response);

            responseObj.link = stringToLink(responseObj.link);
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
      const loading = instance.mother.whiteProgressLoading(null, true);
      instance.grayLoading = loading;
      instance.profileUploadProcess = true;
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
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
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
      display: "inline-flex",
      flexDirection: "row",
      position: "relative",
      width: String(profileWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft) + ea,
      height: String(profileWidth) + ea,
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
      display: "flex",
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
      width: String(exampleZoneWidth) + ea,
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

  for (let i = -1; i < 3; i++) {
    if (i < 0) {
      createNode({
        mother: exampleUpZone,
        style: {
          display: "inline-flex",
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
          display: "inline-flex",
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
      display: "inline-block",
      position: "relative",
      width: withOut(profileWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft, ea),
      verticalAlign: "bottom",
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
            text: "프로필 업로드",
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
          {
            event: {
              click: profileUploadEvent,
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(2) + ea,
              right: String(0) + ea,
              width: String(56) + ea,
              height: String(24) + ea,
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
                fontSize: String(12) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(-2) + ea,
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
          paddingBottom: desktop ? "" : String(5.5) + ea,
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, ajaxForm, equalJson, stringToLink } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = [
    {
      contents: [
        "디자이너님의 대표 페이퍼 워크 작업이나 작업하고 있는 사진을 업로드 해주세요. 4장의 작업 사진은 추천서에 노출되어 고객님께 어필하는 중요 포인트가 됩니다. 자신을 어필할 수 있는 대표적인 4장의 사진을 꼭 올려주세요!"
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

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 20, 20, 7 %%>;

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

  profileWidth = <%% 259, 259, 259, 259, 259 %%>;
  profileMarginLeft = <%% 24, 24, 24, 24, 24 %%>;

  profileUploadButtonRight = <%% -2, -2, -2, -2, -2 %%>;
  profileUploadButtonWidth = <%% 46, 46, 46, 46, 46 %%>;
  profileUploadButtonHeight = <%% 20, 20, 20, 20, 20 %%>;

  profileUploadButtonSize = <%% 10, 10, 10, 10, 10 %%>;
  profileUploadButtonWeight = <%% 500, 500, 500, 500, 500 %%>;
  profileUploadButtonTextTop = <%% -2, -2, -2, -2, -2 %%>;

  exampleZoneWidth = <%% 290, 290, 290, 290, 290 %%>;
  if (normalMode) {
    exampleZoneMarginLeft = 24;
  } else {
    exampleZoneMarginLeft = <%% 72, 72, 72, 72, 72 %%>;
  }
  exampleUpDownBetween = <%% 18, 18, 18, 18, 18 %%>;

  exampleTextWidth = <%% 70, 70, 70, 70, 66 %%>;
  exampleTextSize = <%% 14, 14, 14, 14, 14 %%>;
  exampleTextWeight = <%% 700, 700, 700, 700, 700 %%>;
  exampleTextTextTop = <%% 0, 0, 0, 0, 0 %%>;
  exampleTextLeft = <%% -48, -48, -48, -48, -48 %%>;

  exampleFactorWidth = <%% 190, 190, 190, 190, 190 %%>;
  exampleFactorMargin = <%% 28, 28, 28, 28, 28 %%>;

  goodBadSize = <%% 12, 12, 12, 12, 12 %%>;
  goodBadWeight = <%% 500, 500, 500, 500, 500 %%>;
  goodBadRight = <%% -15, -15, -15, -15, -15 %%>;

  blankZoneWidth = 770 - exampleZoneWidth;
  blankZoneInnerBetween = 6;

  blankNumberSize = 36;
  blankNumberWeight = 500;
  blankNumberTop = -2;

  factorWidth = 272;

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
            response = await ajaxForm(formData, BRIDGEHOST + "/designerWorksPhoto", whiteLoading.progress.firstChild);
            responseObj = equalJson(response);

            whiteLoading.remove();

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
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: !entireMode ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
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
      display: "inline-flex",
      flexDirection: "row",
      position: "relative",
      width: String(blankZoneWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft) + ea,
      height: String(profileWidth) + ea,
    }
  });

  blankZone = createNode({
    mother: photoZone,
    style: {
      display: "inline-block",
      position: "relative",
      width: String(blankZoneWidth) + ea,
      height: withOut(0, ea),
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
  
  exampleZone = createNode({
    mother: photoZone,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(exampleZoneWidth) + ea,
      height: withOut(0, ea),
      flexDirection: "column",
      alignItems: "end",
      justifyContent: "start",
    }
  });

  createNode({
    mother: exampleZone,
    style: {
      display: "flex",
      position: "relative",
      width: String(exampleFactorWidth) + ea,
      height: "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)",
      marginBottom: String(blankZoneInnerBetween) + ea,
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
        display: "inline-block",
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
      height: "calc(calc(100% - " + String(blankZoneInnerBetween * 1) + ea + ") / 2)",
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
      display: "inline-block",
      position: "relative",
      width: withOut(blankZoneWidth + exampleZoneWidth + profileMarginLeft + exampleZoneMarginLeft, ea),
      verticalAlign: "bottom",
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
            text: "작업물, 또는 작업 사진 업로드",
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
          {
            event: {
              click: worksFileChainingInputEvent,
            },
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(2) + ea,
              right: String(0) + ea,
              width: String(56) + ea,
              height: String(24) + ea,
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
                fontSize: String(12) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(-2) + ea,
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
          paddingBottom: desktop ? "" : String(5.5) + ea,
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;

  if (normalMode) {
    margin = 24;
    paddingTop = 52;
    whiteBottomMargin = 42;
  } else {
    margin = <%% 55, 55, 47, 39, 4.7 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;
    whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;
  }

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 20, 20, 20, 20, 7 %%>;

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

  profileWidth = <%% 160, 160, 160, 160, 160 %%>;
  profileMarginLeft = <%% 34, 34, 34, 34, 34 %%>;

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

  introductionSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  introductionWeight = <%% 400, 400, 400, 400, 400 %%>;

  leftTotalWidth = <%% 770, 770, 770, 770, 770 %%>;
  if (normalMode) {
    leftTotalMarginRight = 48;
  } else {
    leftTotalMarginRight = <%% 96, 96, 96, 96, 96 %%>;
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
      boxShadow: !entireMode ? (desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "") : "",
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
      display: "inline-flex",
      flexDirection: "row",
      position: "relative",
      width: String(leftTotalWidth) + ea,
      height: String(profileWidth) + ea,
      marginRight: String(leftTotalMarginRight) + ea,
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
    mother: photoZone,
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
    mother: photoZone,
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
      alignItems: "start",
      width: withOut(profileWidth, ea),
    },
    children: [
      {
        text: designer.designer,
        style: {
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
          lineHeight: String(1.6),
          marginTop: String(7) + ea,
          marginBottom: String(4) + ea,
        }
      },
      {
        text: designer.setting.front.introduction.desktop.join("\n"),
        style: {
          fontSize: String(introductionSize) + ea,
          fontWeight: String(introductionWeight),
          color: colorChip.black,
          lineHeight: String(1.6),
        }
      },
      {
        style: {
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
      display: "inline-block",
      position: "relative",
      width: withOut(leftTotalWidth + leftTotalMarginRight, ea),
      verticalAlign: "bottom",
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
            text: "소개글 작성",
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
          {
            style: {
              display: "flex",
              position: "absolute",
              bottom: String(2) + ea,
              right: String(0) + ea,
              width: String(56) + ea,
              height: String(24) + ea,
              borderRadius: String(5) + "px",
              background: colorChip.green,
              justifyContent: "center",
              alignItems: "center",
            },
            child: {
              text: "edit",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(12) + ea,
                fontWeight: String(500),
                fontFamily: "graphik",
                fontStyle: "italic",
                color: colorChip.white,
                top: String(-2) + ea,
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
          paddingBottom: desktop ? "" : String(5.5) + ea,
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

DesignerAboutJs.prototype.renderBlock = function (contents, notice, tong, grayBox, x, lastBoo) {
  const instance = this;
  const { ea, baseTong, media, designer, totalContents } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma, removeByClass } = GeneralJs;
  const removePopupTargetClassName = "removePopupTargetClassName";
  const menuTargetClassName = "menuTargetClassName";
  const tendencyBarTargetClassName = "tendencyBarTargetClassName";
  const greenNoticeClassName = "greenNoticeClassName";
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

  blockHeight = <%% 22, 21, 21, 19, (isIphone() ? 5.2 : 4.9) %%>;
  blockMarginBottom = <%% 16, 15, 15, 12, 2.5 %%>;

  circleBoxWidth = <%% 16, 16, 16, 14, 2.8 %%>;
  circleWidth = <%% 5, 5, 5, 4, 1 %%>;
  circleTop = <%% 1, 1, 1, 1, 0 %%>;

  contentsSize = <%% 16, 15, 15, 14, 3.4 %%>;
  contentsWeight0 = <%% 700, 700, 700, 700, 700 %%>;
  contentsWeight1 = <%% 400, 400, 400, 400, 400 %%>;

  firstWidth = <%% 180, 160, 140, 120, 23 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  divideNumber = <%% 4, 4, 4, 4, 2 %%>;

  tendencyBlockTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyBlockWidth = <%% 100, 90, 90, 80, 20 %%>;
  tendencyBlockHeight = <%% 16, 16, 16, 16, 3.4 %%>;
  tendencyMinusRatio = <%% 1, 1, 1, 1, 1 %%>;

  tendencyValueConst = 10;

  questionSize = <%% 10, 10, 10, 10, 10 %%>;
  plusSize = <%% 13, 13, 13, 13, 13 %%>;
  questionWeight = <%% 500, 500, 500, 500, 500 %%>;
  questionTextTop = <%% -1, -1, -1, -1, -1 %%>;
  plusTextTop = <%% -1.5, -1.5, -1.5, -1.5, -1.5 %%>;

  noticeCircleWidth = <%% 12, 12, 12, 12, 12 %%>;
  noticeCircleTop = <%% 6, 6, 6, 6, 6 %%>;
  noticeCircleMargin = <%% 5, 5, 5, 5, 5 %%>;

  careerBlockGrayOuterMargin = <%% 10, 10, 10, 10, 10 %%>;
  careerBlockOuterMargin = <%% 14, 14, 14, 14, 14 %%>;
  careerBlockOuterMarginTop = <%% 10, 10, 10, 10, 10 %%>;
  careerBlockOuterMarginBottom = <%% 12, 12, 12, 12, 12 %%>;
  careerBlockInnerMargin = <%% 6, 6, 6, 6, 6 %%>;
  careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 2 %%>;
  careerBlockSize = <%% 13, 13, 13, 13, 13 %%>;

  blockCancelWidth = <%% 12, 12, 12, 12, 12 %%>;
  blockCancelTop = <%% 14, 14, 14, 14, 14 %%>;

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
            do {
              tempValue = await GeneralJs.prompt(obj.name + "명을 알려주세요!");
              if (typeof tempValue !== "string") {
                throw new Error("cancel");
              }
            } while (tempValue.trim() === "")
            tempArr.push(tempValue.trim());
          } else if (obj.type === "date") {
            tempArr.push(obj.name);
            do {
              tempValue = await GeneralJs.promptDate(obj.name + "을(를) 알려주세요!", obj.progressBoo, obj.progressName);
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
        background: colorChip.gray0,
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
            background: colorChip.white,
            boxShadow: "0px 2px 11px -9px " + colorChip.shadow,
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
                    const index = Number(this.getAttribute("index"));
                    const x = Number(this.getAttribute("x"));
                    const z = Number(this.getAttribute("z"));
                    await instance.contents[x].contents[z].updateValue({
                      mode: "delete",
                      index,
                      tong: tong,
                    }, instance.designer);  
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
                  top: String(box.top + 12 + 5 + window.scrollY) + "px",
                  left: String(box.left - 1) + "px",
                  paddingLeft: String(12) + ea,
                  paddingRight: String(12) + ea,
                  paddingTop: String(7) + ea,
                  paddingBottom: String(9) + ea,                  
                  background: colorChip.gradientGreen,
                  borderRadius: String(5) + "px",
                  "min-width": String(100) + ea,
                  "max-width": String(240) + ea,
                  animation: "fadeuplite 0.3s ease forwards",
                },
                children: [
                  {
                    text: notice,
                    style: {
                      position: "relative",
                      fontSize: String(12) + ea,
                      fontWeight: String(700),
                      color: colorChip.white,
                      lineHeight: String(1.5),
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
                self.firstChild.textContent = "";
                self.insertAdjacentHTML("beforeend", text);
                self.setAttribute("value", text);
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
                        await saveEvent(this.value.trim());
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
    } else if (Array.isArray(value) && value.every((s) => { return typeof s === "string" })) {
      valueBlock = createNode({
        mother: baseBlock,
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
          },
          event: {
            selectstart: (e) => { e.preventDefault(); },
            click: function (e) {
              e.stopPropagation();
              const self = this;
              const toggle = this.getAttribute("toggle");
              const x = Number(this.getAttribute("x"));
              const z = Number(this.getAttribute("z"));
              let targets;
              let finalTargets;
              let finalNumbers;
              
              if (toggle === "on") {
                if (instance.contents[x].contents[z].multiple) {
                  self.style.color = colorChip.deactive;
                } else {
                  targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
                  if (targets.length === 2) {
                    for (let dom of targets) {
                      if (dom === self) {
                        dom.style.color = colorChip.deactive;
                      } else {
                        dom.style.color = colorChip.green;
                        dom.setAttribute("toggle", "on");
                      }
                    }
                  } else {
                    self.style.color = colorChip.deactive;
                  }
                }
                self.setAttribute("toggle", "off");
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
              }
              
              finalTargets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
              finalNumbers = finalTargets.map((dom) => { return dom.getAttribute("toggle") === "on" ? 1 : 0 });
              
              instance.contents[x].contents[z].updateValue(finalNumbers, instance.contents[x].contents[z].returnValue(instance.designer), instance.designer).catch((err) => {
                console.log(err);
              });
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight1),
            color: instance.contents[x].contents[z].selectValue(designer).includes(num) ? colorChip.green : colorChip.deactive,
            width: "calc(100% / " + String(divideNumber) + ")",
            cursor: "pointer",
            marginTop: String(num >= divideNumber ? factorBetween : 0) + ea,
          },
        });
        num++;
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
            marginTop: String(num !== 0 ? factorBetween : 0) + ea,
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

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 10 : 8), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 7 %%>;

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
            text: "가능 일정 표시 안내",
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
          paddingBottom: desktop ? "" : String(5.5) + ea,
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
  const { ajaxJson, stringToDate, equalJson } = GeneralJs;
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

  grayZoneWidth = <%% 250, 200, 160, 140, 32 %%>;
  grayZoneContentsWidth = <%% 200, 160, 140, 120, 30 %%>;
  grayPadding = <%% 52, 52, 44, 36, 4.7 %%>;
  grayInnerPadding = <%% 22, 22, 22, 22, 20 %%>;
  grayInnerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  noticeSize = <%% 12, 12, 12, 12, 12 %%>;

  grayBetween = <%% 40, 40, 36, 36, 3 %%>;

  bottomMargin = <%% 16, 16, 16, 12, 0 %%>;
  if (normalMode) {
    margin = 24;
    paddingTop = 0;
    whiteBottomMargin = 12;
  } else {
    margin = <%% 55, 55, 47, 39, 0 %%>;
    paddingTop =  <%% 52, 52, 44, 36, 6 %%>;
    whiteBottomMargin = <%% 20, 20, 16, 8, 0 %%>;
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
            instance.contentsCenter();
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
    }

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
