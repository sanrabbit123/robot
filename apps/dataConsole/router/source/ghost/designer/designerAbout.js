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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, autoHypenPhone } = GeneralJs;
  let contents;

  contents = [
    {
      title: "기본 정보",
      whiteType: 0,
      contents: [
        {
          property: "성함",
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
              window.alert("성함 변경은 홈리에종에 직접 문의해주세요!");
              // await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");
              // return text;
              return designer.designer;
            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "연락처",
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
        },
        {
          property: "인스타",
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
        },
        {
          property: "블로그",
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
        },
      ]
    },
    {
      title: "업무 정보",
      whiteType: 1,
      contents: [
        {
          property: "상태",
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

              // instance.designer.analytics.grade = columns.findIndex((str) => { return str === text }) - 1;
              // updateQuery["analytics.grade"] = columns.findIndex((str) => { return str === text }) - 1;
              //
              // await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "유관 경력",
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
        },
        {
          property: desktop ? "스타일링 경력" : "스타일링",
          returnValue: (designer) => {
            return `시작일 : ${String(designer.information.business.career.startY)}년 ${String(designer.information.business.career.startM)}월`;
          },
          value: "시작일 : 2016년 9월",
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
        },
        {
          property: "계좌번호",
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
      ]
    },
    {
      title: "공간 범위",
      whiteType: 1,
      contents: [
        {
          property: "주소",
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
        },
        {
          property: "한계 범위",
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
        },
        {
          property: "시공 한계",
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
        },
        {
          property: "이동 수단",
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
      ]
    },
    {
      title: "작업 방식",
      whiteType: 1,
      contents: [
        {
          property: "온라인",
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
          property: "페이퍼 워크",
          returnValue: (designer) => { return [
            "도면",
            "3D",
            "컨셉 제안",
            "마감재 제안",
            "제품 리스트",
            "제품 이미지",
            "콜라주",
          ] },
          selectValue: (designer) => {
            const targets = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "제품 이미지",
              "콜라주",
            ];
            return designer.analytics.project.paperWork.map((str) => {
              return targets.findIndex((s) => { return s === str });
            });
          },
          multiple: true,
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let filtered;

              whereQuery = { desid };
              updateQuery = {};

              filtered = columns.filter((str, index) => {
                return raw[index] === 1;
              });

              instance.designer.analytics.project.paperWork = filtered;
              updateQuery["analytics.project.paperWork"] = filtered;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    },
    {
      title: "시공 관련",
      whiteType: 1,
      contents: [
        {
          property: desktop ? "파트너 시공사" : "파트너",
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
            try {
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.construct.partner = (text === "있음");
              updateQuery["analytics.construct.partner"] = (text === "있음");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: desktop ? "파트너 가능 범위" : "가능 범위",
          returnValue: (designer) => { return [
            "홈스타일링",
            "토탈 스타일링",
            "엑스트라"
          ] },
          selectValue: (designer) => {
            return [ designer.analytics.construct.range - 2 ];
          },
          multiple: false,
          updateValue: async (raw, columns, designer) => {
            try {
              let index, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              index = raw.findIndex((num) => { return num === 1 });

              instance.designer.analytics.construct.range = index + 2;
              updateQuery["analytics.construct.range"] = index + 2;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: desktop ? "주 이용 시공사" : "주 이용",
          returnValue: (designer) => { return [
            "고객 시공사",
            "홈리에종 시공사",
            "디자이너 시공사",
          ] },
          selectValue: (designer) => {
            if (designer.analytics.construct.major === "고객 시공사") {
              return [ 0 ];
            } else if (designer.analytics.construct.major === "홈리에종 시공사") {
              return [ 1 ];
            } else if (designer.analytics.construct.major === "디자이너 시공사") {
              return [ 2 ];
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

              instance.designer.analytics.construct.major = text;
              updateQuery["analytics.construct.major"] = text;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    },
    {
      title: "제작 관련",
      whiteType: 1,
      contents: [
        {
          property: "빌트인 제작",
          returnValue: (designer) => { return [
            "가능",
            "불가능",
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
              let text, whereQuery, updateQuery;

              whereQuery = { desid };
              updateQuery = {};

              text = columns[raw.findIndex((num) => { return num === 1 })];

              instance.designer.analytics.styling.furniture.builtin = (text === "가능");
              updateQuery["analytics.styling.furniture.builtin"] = (text === "가능");

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "가구 제작",
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
          property: "커튼 패브릭",
          returnValue: (designer) => { return [
            "업체 연결",
            "기성 제품 추천",
            "직접 제작",
          ] },
          selectValue: (designer) => {
            const targets = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작",
            ];
            return designer.analytics.styling.fabric.curtain.map((str) => {
              return targets.findIndex((s) => { return s === str });
            });
          },
          multiple: true,
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let filtered;

              whereQuery = { desid };
              updateQuery = {};

              filtered = columns.filter((str, index) => {
                return raw[index] === 1;
              });

              instance.designer.analytics.styling.fabric.curtain = filtered;
              updateQuery["analytics.styling.fabric.curtain"] = filtered;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "베딩 패브릭",
          returnValue: (designer) => { return [
            "업체 연결",
            "기성 제품 추천",
            "직접 제작",
          ] },
          selectValue: (designer) => {
            const targets = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작",
            ];
            return designer.analytics.styling.fabric.bedding.map((str) => {
              return targets.findIndex((s) => { return s === str });
            });
          },
          multiple: true,
          updateValue: async (raw, columns, designer) => {
            try {
              let text, whereQuery, updateQuery;
              let filtered;

              whereQuery = { desid };
              updateQuery = {};

              filtered = columns.filter((str, index) => {
                return raw[index] === 1;
              });

              instance.designer.analytics.styling.fabric.bedding = filtered;
              updateQuery["analytics.styling.fabric.bedding"] = filtered;

              await ajaxJson({ whereQuery, updateQuery }, SECONDHOST + "/updateDesigner");

            } catch (e) {
              console.log(e);
            }
          },
        },
        {
          property: "설치 서비스",
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
      ]
    },
    {
      title: "스타일",
      whiteType: 2,
      contents: [
        {
          property: "스타일 경향성",
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
            ]
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
            ]
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
            ]
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
          returnValue: (designer) => { return {
            maximun: { name: "맥시멈", value: designer.analytics.styling.tendency.density.maximun },
            minimum: { name: "미니멈", value: designer.analytics.styling.tendency.density.minimum },
            __order__: [
              "maximun",
              "minimum",
            ]
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
      ]
    },
  ];
  this.contents = contents;
  for (let i = 0; i < contents.length; i++) {
    this.renderWhite(contents[i].whiteType, contents[i].title, contents[i].contents, i + 1);
  }

}

DesignerAboutJs.prototype.renderWhite = function (type, title, contents, index) {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let whiteBlock, whiteTong;
  let block;
  let leftPadding;
  let topPadding0;
  let topPadding1;

  leftPadding = <%% 55, 55, 47, 39, 4.7 %%>;

  topPadding0 = <%% 52, 52, 44, 36, 4.7 %%>;
  topPadding1 = <%% 40, 40, 38, 32, 4.7 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      borderTopLeftRadius: type === 0 ? String(8) + "px" : "",
      borderTopRightRadius: type === 0 ? String(8) + "px" : "",
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: desktop ? String(type === 0 ? topPadding0 : topPadding1) + ea : "",
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
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

  block = this.renderTong(type, title, whiteTong, index);
  this.renderBlock(contents, block.children[1], index - 1);
}

DesignerAboutJs.prototype.renderTong = function (type, title, whiteTong, index) {
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

  titleWidth = <%% 300, 160, 140, 120, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

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
      display: "block",
      position: "relative",
      width: String(100) + '%',
      paddingTop: desktop ? "" : String(mobileBasePaddingTop) + ea,
    },
    children: [
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
              borderBottom: "1px dashed " + colorChip.green,
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
          width: desktop ? withOut(titleWidth, ea) : withOut(mobileBasicMargin * 2, ea),
          verticalAlign: "top",
          top: String(titleTopNumber) + ea,
          paddingBottom: desktop ? String(finalBottomMargin) + ea : (type === 2 ? String(mobileBasicMargin) + ea : String(0) + ea),
          marginBottom: type === 2 ? String(realFinalBottomMargin) + ea : String(desktop ? 2 : 0) + ea,
          borderBottom: desktop ? (type !== 2 ? "1px dashed " + colorChip.green : "") : "",
          marginLeft: desktop ? "" : String(mobileBasicMargin) + ea,
        }
      },
      {
        text: String(index),
        style: {
          display: big ? "inline-block" : "none",
          position: "absolute",
          bottom: String(numberBottom + (type === 2 ? realFinalBottomMargin : 0)) + ea,
          right: String(0) + ea,
          fontSize: String(numberSize) + ea,
          fontWeight: String(numberWeight),
          color: colorChip.deactive,
        }
      }
    ]
  });

}

DesignerAboutJs.prototype.renderBlock = function (contents, tong, x) {
  const instance = this;
  const { ea, baseTong, media, designer } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, isIphone, autoComma } = GeneralJs;
  const removePopupTargetClassName = "removePopupTargetClassName";
  const menuTargetClassName = "menuTargetClassName";
  const tendencyBarTargetClassName = "tendencyBarTargetClassName";
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

  blockHeight = <%% 22, 21, 21, 19, (isIphone() ? 5.2 : 4.9) %%>;
  blockMarginBottom = <%% 16, 15, 15, 12, 2.5 %%>;

  circleBoxWidth = <%% 16, 16, 16, 14, 2.8 %%>;
  circleWidth = <%% 5, 5, 5, 4, 1 %%>;
  circleTop = <%% 1, 1, 1, 1, 0 %%>;

  contentsSize = <%% 16, 15, 15, 14, 3.4 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 300, 300, 300, 300, 300 %%>;

  firstWidth = <%% 180, 160, 140, 120, 23 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  divideNumber = <%% 4, 4, 4, 4, 2 %%>;

  tendencyBlockTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyBlockWidth = <%% 100, 90, 90, 80, 20 %%>;
  tendencyBlockHeight = <%% 16, 16, 16, 16, 3.4 %%>;
  tendencyMinusRatio = <%% 2, 1.5, 1.5, 1, 1 %%>;

  tendencyValueConst = 10;

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
      text: obj.property,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight0),
        color: colorChip.black,
        width: String(firstWidth) + ea,
        verticalAlign: "top",
      },
    });

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
                // const text = await instance.contents[x].contents[z].updateValue(raw, instance.designer);
                // self.firstChild.textContent = text;
                // self.setAttribute("value", text);
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
    } else if (Array.isArray(value)) {

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
              // const self = this;
              // const toggle = this.getAttribute("toggle");
              // const x = Number(this.getAttribute("x"));
              // const z = Number(this.getAttribute("z"));
              // let targets;
              // let finalTargets;
              // let finalNumbers;
              //
              // if (toggle === "on") {
              //   if (instance.contents[x].contents[z].multiple) {
              //     self.style.color = colorChip.deactive;
              //   } else {
              //     targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
              //     if (targets.length === 2) {
              //       for (let dom of targets) {
              //         if (dom === self) {
              //           dom.style.color = colorChip.deactive;
              //         } else {
              //           dom.style.color = colorChip.green;
              //           dom.setAttribute("toggle", "on");
              //         }
              //       }
              //     } else {
              //       self.style.color = colorChip.deactive;
              //     }
              //   }
              //   self.setAttribute("toggle", "off");
              // } else {
              //   if (instance.contents[x].contents[z].multiple) {
              //     self.style.color = colorChip.green;
              //   } else {
              //     targets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
              //     for (let dom of targets) {
              //       if (dom === self) {
              //         dom.style.color = colorChip.green;
              //       } else {
              //         dom.style.color = colorChip.deactive;
              //         dom.setAttribute("toggle", "off");
              //       }
              //     }
              //   }
              //   self.setAttribute("toggle", "on");
              // }
              //
              // finalTargets = [ ...document.querySelectorAll('.' + menuTargetClassName + String(x) + String(z)) ];
              // finalNumbers = finalTargets.map((dom) => { return dom.getAttribute("toggle") === "on" ? 1 : 0 });
              //
              // instance.contents[x].contents[z].updateValue(finalNumbers, instance.contents[x].contents[z].returnValue(instance.designer), instance.designer).catch((err) => {
              //   console.log(err);
              // });
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
                    targets[a].style.background = colorChip.green;
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
              background: value[key].value > i ? colorChip.green : colorChip.gray1,
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
}

DesignerAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
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

    // if (typeof window.localStorage.getItem("HL_desid") === "string") {
    //   if (window.localStorage.getItem("HL_desid") !== desid) {
    //     GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    //   }
    // } else {
    //   GeneralJs.selfHref(FRONTHOST + "/designer/login.php");
    // }

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
          instance.contentsCenter();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    // web socket
    socket = {};
    if (!document.hidden) {
      wsOpenEvent = (ws) => {
        return async function () {
          try {
            ws.send(JSON.stringify({
              mode: "register",
              to: "homeliaison",
              data: instance.designer.desid
            }));
          } catch (e) {
            console.log(e);
          }
        }
      }
      wsLaunching = () => {
        let ws;
        if (typeof socket.close === "function") {
          socket.close();
          socket = {};
        }
        ws = new WebSocket(CRONHOST.replace(/https\:\/\//, "wss://") + "/realTimeCommunication");
        ws.addEventListener("open", wsOpenEvent(ws));
        return ws;
      }
      socket = wsLaunching();
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (typeof socket.close === "function") {
          socket.close();
          socket = {};
        }
      } else {
        socket = wsLaunching();
      }
    });

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
