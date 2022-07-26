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
          value: "배창규",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "연락처",
          value: "010-2747-3403",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "이메일",
          value: "uragenbooks@gmail.com",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "웹페이지",
          value: "https://home-liaison.com",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "인스타",
          value: "https://instagram.com/homeliaison",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "블로그",
          value: "https://blog.naver.com/homeliaison",
          renderValue: (text) => {
            return text;
          },
        },
      ]
    },
    {
      title: "업무 정보",
      whiteType: 1,
      contents: [
        {
          property: "유관 경력",
          value: "총 10년 3개월",
          renderValue: (text) => {
            return text.replace(/^총 /gi, '').trim();
          },
        },
        {
          property: "스타일링 경력",
          value: "시작일 : 2016년 9월",
          renderValue: (text) => {
            return text.replace(/년/i, '-').replace(/[^0-9\-]/gi, '').trim();
          },
        },
        {
          property: "계좌번호",
          value: "우리 10025-801-12181",
          renderValue: (text) => {
            return text;
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
          value: "서울 동대문구 한천로63길 10 (이문동,이문e편한세상아파트)",
          renderValue: (text) => {
            return text;
          },
        },
        {
          property: "유효 범위",
          value: "40km",
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
        },
        {
          property: "한계 범위",
          value: "60km",
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
        },
        {
          property: "시공 한계 범위",
          value: "60km",
          renderValue: (text) => {
            return text.replace(/[^0-9\-\.]/gi, '');
          },
        },
        {
          property: "이동 수단",
          value: [
            "대중교통",
            "자동차",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        }
      ]
    },
    {
      title: "작업 방식",
      whiteType: 1,
      contents: [
        {
          property: "온라인",
          value: [
            "가능",
            "불가능",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        },
        {
          property: "거주중",
          value: [
            "가능",
            "불가능",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        },
        {
          property: "1차 제안 시간",
          value: [
            "1주일 이내",
            "2주일 이내",
            "3주일 이내",
            "3주일 이상",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        },
        {
          property: "페이퍼 워크",
          value: [
            "도면",
            "3D",
            "컨셉 제안",
            "마감재 제안",
            "제품 리스트",
            "제품 이미지",
            "콜라주",
          ],
          selectValue: (designer) => {
            return [ 0, 1, 3 ];
          },
          multiple: true,
        },
      ]
    },
    {
      title: "제작 관련",
      whiteType: 1,
      contents: [
        {
          property: "빌트인 제작",
          value: [
            "가능",
            "불가능",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        },
        {
          property: "가구 제작",
          value: [
            "가능",
            "불가능",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: false,
        },
        {
          property: "커튼 패브릭",
          value: [
            "업체 연결",
            "기성 제품 추천",
            "직접 제작",
          ],
          selectValue: (designer) => {
            return [ 1 ];
          },
          multiple: true,
        },
        {
          property: "베딩 패브릭",
          value: [
            "업체 연결",
            "기성 제품 추천",
            "직접 제작",
          ],
          selectValue: (designer) => {
            return [ 1, 2 ];
          },
          multiple: true,
        },
        {
          property: "설치 서비스",
          value: [
            "직접",
            "연결",
          ],
          selectValue: (designer) => {
            return [ 0 ];
          },
          multiple: false,
        },
        {
          property: "정리 수납",
          value: [
            "연결",
            "미제공",
          ],
          selectValue: (designer) => {
            return [ 0 ];
          },
          multiple: false,
        },
      ]
    },
    {
      title: "스타일",
      whiteType: 2,
      contents: [
        {
          property: "스타일 경향성",
          value: {
            modern: { name: "모던", value: 2 },
            classic: { name: "클래식", value: 6 },
            natural: { name: "내추럴", value: 8 },
            mixmatch: { name: "믹스매치", value: 5 },
            scandinavian: { name: "북유럽", value: 4 },
            vintage: { name: "빈티지", value: 10 },
            oriental: { name: "오리엔탈", value: 1 },
            exotic: { name: "이그저틱", value: 3 },
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
          }
        },
        {
          property: "텍스처 경향성",
          value: {
            darkWood: { name: "진한 우드", value: 2 },
            whiteWood: { name: "연한 우드", value: 6 },
            coating: { name: "도장", value: 8 },
            metal: { name: "금속", value: 5 },
            __order__: [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ]
          }
        },
        {
          property: "컬러톤 경향성",
          value: {
            darkWood: { name: "다크 우드", value: 2 },
            whiteWood: { name: "밝은 우드", value: 6 },
            highContrast: { name: "고대비", value: 8 },
            vivid: { name: "비비드", value: 5 },
            white: { name: "화이트", value: 4 },
            mono: { name: "모노톤", value: 10 },
            bright: { name: "밝은톤", value: 1 },
            dark: { name: "어두운톤", value: 3 },
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
          }
        },
        {
          property: "밀도 경향성",
          value: {
            maximun: { name: "맥시멈", value: 2 },
            minimum: { name: "미니멈", value: 6 },
            __order__: [
              "maximun",
              "minimum",
            ]
          }
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

  block = this.renderTong(type, title, whiteTong, index);
  this.renderBlock(contents, block.children[1], index - 1);
}

DesignerAboutJs.prototype.renderTong = function (type, title, whiteTong, index) {
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
  let realFinalBottomMargin;

  titleWidth = <%% 300, 300, 300, 300, 30 %%>;
  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleFontSize = <%% 20, 20, 20, 19, 4.3 %%>;

  numberRight = <%% 12, 12, 12, 12, 3 %%>;
  numberSize = <%% 18, 18, 18, 16, 3 %%>;
  numberWeight = <%% 200, 200, 200, 200, 200 %%>;
  numberBottom = <%% 43, 43, 43, 43, 6 %%>;

  finalBottomMargin = <%% 30, 30, 30, 30, 3 %%>;

  realFinalBottomMargin = <%% 24, 24, 24, 24, 3 %%>;

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
          marginBottom: type === 2 ? String(realFinalBottomMargin) + ea : "",
          borderBottom: type !== 2 ? "1px dashed " + colorChip.green : "",
        }
      },
      {
        text: String(index),
        style: {
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
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
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
  let factorWidth;
  let divideNumber;
  let num;
  let factorBetween;
  let tendencyTong;
  let tendencyBlockTop;
  let tendencyBlockWidth;
  let tendencyBlockHeight;
  let tendencyValueConst;
  let z;

  blockHeight = <%% 22, 22, 22, 22, 22 %%>;
  blockMarginBottom = <%% 16, 16, 16, 16, 3 %%>;

  circleBoxWidth = <%% 16, 16, 16, 16, 16 %%>;
  circleWidth = <%% 5, 5, 5, 5, 5 %%>;
  circleTop = <%% 1, 1, 1, 1, 1 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3 %%>;
  contentsWeight0 = <%% 600, 600, 600, 600, 600 %%>;
  contentsWeight1 = <%% 300, 300, 300, 300, 300 %%>;

  firstWidth = <%% 180, 180, 180, 180, 20 %%>;

  factorWidth = <%% 192, 192, 192, 192, 20 %%>;
  factorBetween = <%% 8, 8, 8, 8, 1 %%>;

  divideNumber = <%% 4, 4, 4, 4, 2 %%>;

  tendencyBlockTop = <%% 3, 3, 3, 3, 3 %%>;
  tendencyBlockWidth = <%% 100, 100, 100, 100, 90 %%>;
  tendencyBlockHeight = <%% 16, 16, 16, 16, 16 %%>;

  tendencyValueConst = 10;

  z = 0;
  for (let { property, value } of contents) {

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
        height: String(blockHeight) + ea,
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
      text: property,
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

            cancelBack = createNode({
              mother: self,
              class: [ removePopupTargetClassName ],
              event: {
                click: function (e) {
                  e.stopPropagation();
                  const removeTargets = document.querySelectorAll('.' + removePopupTargetClassName);
                  for (let dom of removeTargets) {
                    dom.remove();
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
              const self = this;
              const toggle = this.getAttribute("toggle");
              const x = Number(this.getAttribute("x"));
              const z = Number(this.getAttribute("z"));
              let targets;

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
          display: "inline-block",
          position: "relative",
          width: withOut(firstWidth + circleBoxWidth, ea),
          verticalAlign: "top",
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
                width: withOut(tendencyBlockWidth * 2, ea),
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
