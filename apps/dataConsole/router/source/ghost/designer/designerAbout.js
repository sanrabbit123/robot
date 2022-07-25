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

DesignerAboutJs.prototype.insertBasicBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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
  let tong;
  let whiteBottomMargin;
  let contentsAreaPaddingTop;
  let mobilePaddingLeft;
  let wordings;
  let blockHeight;
  let blockMarginBottom;
  let contentsSize;
  let contentsWeight0, contentsWeight1;
  let circleBoxWidth;
  let circleWidth, circleTop;
  let firstWidth;
  let contents;
  let titleWidth;
  let numberSize, numberWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 22, 22, 22, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobilePaddingLeft = 6;

  titleWidth = <%% 300, 300, 300, 300, 30 %%>;

  blockHeight = <%% 30, 30, 30, 30, 30 %%>;
  blockMarginBottom = <%% 14, 14, 14, 14, 3 %%>;

  contentsSize = <%% 17, 17, 17, 16, 3 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 300, 300, 300, 300, 300 %%>;

  circleBoxWidth = <%% 16, 16, 16, 16, 16 %%>;
  circleWidth = <%% 5, 5, 5, 5, 5 %%>;
  circleTop = <%% 1, 1, 1, 1, 1 %%>;

  firstWidth = <%% 180, 180, 180, 180, 20 %%>;

  numberSize = <%% 20, 20, 20, 20, 20 %%>;
  numberWeight = <%% 200, 200, 200, 200, 200 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contents = [
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

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop) + ea : "",
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
          display: "inline-block",
          position: "relative",
          width: String(titleWidth) + ea,
          verticalAlign: "top",
        },
        children: [
          {
            text: "기본 정보",
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(contentsWeight0),
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
        }
      },
      {
        text: String(1),
        style: {
          position: "absolute",
          bottom: String(blockMarginBottom - titleTopNumber) + ea,
          right: String(0) + ea,
          fontSize: String(numberSize) + ea,
          fontWeight: String(numberWeight),
          color: colorChip.green,
        }
      }
    ]
  });
  tong = block.children[1];

  for (let { property, value } of contents) {
    createNode({
      mother: tong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0),
        height: String(blockHeight) + ea,
        alignItems: "center",
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
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
        },
        {
          text: property,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight0),
            color: colorChip.black,
            width: String(firstWidth) + ea,
          },
        },
        {
          text: value,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(contentsSize) + ea,
            fontWeight: String(contentsWeight1),
            color: colorChip.black,
            width: withOut(firstWidth + circleBoxWidth, ea),
          },
        }
      ]
    });
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
          instance.insertBasicBox();
          instance.insertBasicBox();
          instance.insertBasicBox();
          instance.insertBasicBox();

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
