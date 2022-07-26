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

DesignerAboutJs.binaryPath = "/middle/console";

DesignerAboutJs.prototype.contentsCenter = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, designer } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let contents;

  contents = [
    {
      title: "기본 정보",
      whiteType: 0,
      contents: [
        {
          property: "성함",
          value: "배창규"
        },
        {
          property: "연락처",
          value: "010-2747-3403"
        },
        {
          property: "이메일",
          value: "uragenbooks@gmail.com"
        },
        {
          property: "웹페이지",
          value: "https://home-liaison.com"
        },
        {
          property: "인스타",
          value: "https://instagram.com/homeliaison"
        },
        {
          property: "블로그",
          value: "https://blog.naver.com/homeliaison"
        },
      ]
    },
    {
      title: "업무 정보",
      whiteType: 1,
      contents: [
        {
          property: "유관 경력",
          value: "총 10년 3개월"
        },
        {
          property: "스타일링 경력",
          value: "시작일 : 2016년 9월"
        },
        {
          property: "계좌번호",
          value: "우리 10025-801-12181"
        },
      ]
    },
    {
      title: "공간 범위",
      whiteType: 1,
      contents: [
        {
          property: "주소",
          value: "서울 동대문구 한천로63길 10 (이문동,이문e편한세상아파트)"
        },
        {
          property: "유효 범위",
          value: "40km"
        },
        {
          property: "한계 범위",
          value: "60km"
        },
        {
          property: "시공 한계 범위",
          value: "60km"
        },
        {
          property: "이동 수단",
          value: [
            "대중교통",
            "자동차",
          ]
        }
      ]
    },
    {
      title: "공간 범위",
      whiteType: 1,
      contents: [
        {
          property: "주소",
          value: "서울 동대문구 한천로63길 10 (이문동,이문e편한세상아파트)"
        },
        {
          property: "유효 범위",
          value: "40km"
        },
        {
          property: "한계 범위",
          value: "60km"
        },
        {
          property: "시공 한계 범위",
          value: "60km"
        },
      ]
    },
  ];

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
      borderTopLeftRadius: type === 0 ? String(desktop ? 8 : 1) + ea : "",
      borderTopRightRadius: type === 0 ? String(desktop ? 8 : 1) + ea : "",
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
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

  block = this.renderTong(title, whiteTong, index);
  this.renderBlock(contents, block.children[1]);
}

DesignerAboutJs.prototype.renderTong = function (title, whiteTong, index) {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  let titleWidth;
  let titleTopNumber;
  let titleFontSize;
  let numberRight;
  let numberBottom;
  let numberSize;
  let numberWeight;
  let finalBottomMargin;

  titleWidth = <%% 300, 300, 300, 300, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 20, 20, 20, 19, 4.3 %%>;

  numberRight = <%% 12, 12, 12, 12, 3 %%>;
  numberSize = <%% 20, 20, 20, 20, 20 %%>;
  numberWeight = <%% 200, 200, 200, 200, 200 %%>;
  numberBottom = <%% 46, 46, 46, 46, 6 %%>;

  finalBottomMargin = <%% 30, 30, 30, 30, 3 %%>;

  return createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(titleWidth) + ea,
          verticalAlign: "top",
        },
        children: [
          {
            text: title,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(700),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          overflow: "hidden",
          width: withOut(titleWidth, ea),
          verticalAlign: "top",
          top: String(titleTopNumber) + ea,
          paddingBottom: String(finalBottomMargin) + ea,
          borderBottom: "1px dashed " + colorChip.green,
        }
      },
      {
        text: String(index),
        style: {
          position: "absolute",
          bottom: String(numberBottom) + ea,
          right: String(0) + ea,
          fontSize: String(numberSize) + ea,
          fontWeight: String(numberWeight),
          color: colorChip.deactive,
        }
      }
    ]
  });

}

DesignerAboutJs.prototype.renderBlock = function (contents, tong) {
  const instance = this;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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
  let factorWidth;

  blockHeight = <%% 30, 30, 30, 30, 30 %%>;
  blockMarginBottom = <%% 10, 10, 10, 10, 3 %%>;

  circleBoxWidth = <%% 16, 16, 16, 16, 16 %%>;
  circleWidth = <%% 5, 5, 5, 5, 5 %%>;
  circleTop = <%% 1, 1, 1, 1, 1 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 300, 300, 300, 300, 300 %%>;

  firstWidth = <%% 180, 180, 180, 180, 20 %%>;

  factorWidth = <%% 210, 210, 200, 180, 20 %%>;

  for (let { property, value } of contents) {

    baseBlock = createNode({
      mother: tong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0),
        height: String(blockHeight) + ea,
        alignItems: "center",
        marginBottom: String(blockMarginBottom) + ea,
      },
    });

    circleBlock = createNode({
      mother: baseBlock,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(circleBoxWidth) + ea,
        height: String(blockHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
      text: property,
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(contentsSize) + ea,
        fontWeight: String(contentsWeight0),
        color: colorChip.black,
        width: String(firstWidth) + ea,
      },
    });

    if (typeof value === "string") {
      valueBlock = createNode({
        mother: baseBlock,
        text: value,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(contentsSize) + ea,
          fontWeight: String(contentsWeight1),
          color: colorChip.black,
          width: withOut(firstWidth + circleBoxWidth, ea),
        },
      });
    } else if (Array.isArray(value)) {

      valueBlock = createNode({
        mother: baseBlock,
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(firstWidth + circleBoxWidth, ea),
        },
      });

      for (let v of value) {
        createNode({
          mother: valueBlock,
          text: v,
          event: {
            selectstart: (e) => { e.preventDefault(); },
          },
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight1),
            color: colorChip.deactive,
            width: String(factorWidth) + ea,
            cursor: "pointer",
          },
        });
      }

    }



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
          instance.contentsCenter();

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignerAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
