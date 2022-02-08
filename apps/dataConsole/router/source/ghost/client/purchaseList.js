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
      "return ('제품 구매 리스트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('프로젝트의 제품 구매 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "purchaseList",
  "route": [
    "purchase",
    "PL"
  ]
} %/%/g

const PurchaseListJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
  this.initDateClassName = {
    start: "initDateClassStart",
    end: "initDateClassEnd"
  };
}

PurchaseListJs.binaryPath = "/middle/purchase";

PurchaseListJs.prototype.scheduleWordings = function (service) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const colon = "&nbsp;" + ":" + "&nbsp;&nbsp;&nbsp;";
  class StyleCurationWordings {
    constructor() {
      let tempObj;

      this.wordings = {};
      this.wordings.init = {
        title: [
          "제품 구매 리스트",
        ],
        subTitle: [
          "현장 미팅 시간",
          "현장 미팅 주소"
        ],
        contents: [
          "앞으로 진행하게 될 <b%홈스타일링의 전체 일정%b>을 보고해드립니다.",
          "디자이너가 전체적으로 계획을 세운 아래 일정은",
          "향후 <b%상황과 변수에 따라 조정될 수%b> 있습니다.",
        ],
        image: [
          "/init0.jpg",
          "/init1.jpg",
          "/init2.jpg",
          "/init3.jpg",
          "/init4.jpg",
        ]
      };

      this.wordings.check = {};
      this.wordings.check.title = [ "체크리스트" ];
      this.wordings.check.matrix = [];
      for (let { title, children } of service.setting.contents.checklist) {
        tempObj = {};
        tempObj.title = title;
        tempObj.contents = [];
        for (let obj of children) {
          tempObj.contents.push(`<u%${obj.title}%u>${colon}${obj.contents}`);
        }
        this.wordings.check.matrix.push(tempObj);
      }

    }

    get initWordings() {
      return this.wordings.init;
    }

    get checkWordings() {
      return this.wordings.check;
    }

  }
  return new StyleCurationWordings();
}

PurchaseListJs.prototype.insertInitBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, requestNumber, ea, baseTong, media, initDateClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const { purchase } = this.projectHistory;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let titleFontSize, titleFontWeight;
  let firstBlock, secondBlock, thirdBlock;
  let firstBlockWidth;
  let initWordingSize;
  let lineHeight;
  let wordings, initPhotos;
  let titlePadding;
  let contentsPadding;
  let titleHeight;
  let secondBlockWidth, secondBlockMargin;
  let initTitleMarginTop;
  let titleTextTop;
  let pictureBetweenMargin;
  let pictureNumber;
  let picturePaddingTop;
  let dateRangeWidth;
  let dateRangeMarginTop;
  let dateRangeSize;
  let dateRangeLineTop;
  let dateRangeIndent;
  let initNumberBottom;
  let initNumberSize;
  let dateRangeBetween;
  let pictureMobileHeight;
  let imageNode;
  let circlePictureWidth, circlePictureBorder, circlePictureBetween, circlePictureVisualTop;
  let smallWordingRatio;

  pictureNumber = 5;

  blockHeight = <%% 400, 380, 367, 260, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontSize = <%% 29, 28.5, 27.5, 23, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titlePadding = <%% 5, 2, 1, 0, 0 %%>;
  contentsPadding = titlePadding + 1;
  titleHeight = <%% 38, 38, 38, 38, 10 %%>;

  picturePaddingTop = <%% 4, 3, 3, 2, 0 %%>;
  pictureBetweenMargin = <%% 10, 6, 5, 4, 0 %%>;
  pictureMobileHeight = 25;

  secondBlockWidth = <%% 320, 240, 225, 160, 33 %%>;
  secondBlockMargin = <%% 50, 45, 40, 39, 2.5 %%>;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;
  initTitleMarginTop = <%% 18, 18, 12, 28, 2.5 %%>;

  dateRangeWidth = <%% 240, 230, 220, 210, 20 %%>;
  dateRangeMarginTop = <%% (isMac() ? 46 : 48), 62, 44, 48, 6 %%>;
  dateRangeSize = <%% 28, 27, 24, 22, 5 %%>;
  dateRangeLineTop = <%% 19, 18, 16, 15, 3.6 %%>;
  dateRangeIndent = <%% 10, 10, 8, 6, 1.4 %%>;
  dateRangeBetween = <%% 3, 3, 3, 3, 3 %%>;

  initNumberBottom = <%% -3, -3, -2, -1, 0 %%>;
  initNumberSize = <%% 18, 16, 15, 12, 4 %%>;

  circlePictureWidth = <%% 292, 290, 280, 270, 30 %%>;
  circlePictureBorder = <%% 6, 6, 5, 4, 2 %%>;
  circlePictureBetween = <%% 158, 158, 150, 140, 14 %%>;
  circlePictureVisualTop = <%% 2, 2, 1, 0, 0 %%>;

  smallWordingRatio = (2 / 3);

  wordings = this.wordings.initWordings;
  initPhotos = this.wordings.initWordings.image;

  titleTextTop = isMac() ? 0 : 4;

  lineHeight = 1.6;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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

  [ firstBlock, secondBlock ] = createNodes([
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? String(secondBlockWidth) + ea : String(100) + '%',
        height: desktop ? String(100) + '%' : '',
        verticalAlign: "top",
        textAlign: desktop ? "" : "center",
      },
      children: [
        {
          text: wordings.title.join(" "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            fontFamily: "sandoll",
            paddingLeft: desktop ? String(titlePadding) + ea : "",
            height: String(titleHeight) + ea,
            background: colorChip.white,
            wordSpacing: String(-2) + "px",
            color: colorChip.black,
            top: desktop ? String(titleTextTop) + ea : "",
            textAlign: desktop ? "" : "center",
          },
          bold: {
            fontSize: String(titleFontSize) + ea,
            color: colorChip.black,
          }
        },
        {
          style: {
            display: !media[3] ? "block" : "none",
            position: "relative",
            width: desktop ? String(dateRangeWidth) + ea : String(100) + '%',
            marginTop: String(dateRangeMarginTop) + ea,
            paddingLeft: desktop ? String(contentsPadding) + ea : "",
          },
          children: [
            {
              style: {
                display: desktop ? "block" : "none",
                position: "relative",
                textAlign: "left",
              },
              children: [
                {
                  text: `30 <b%items%b>`,
                  class: [ initDateClassName.start ],
                  style: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  },
                  bold: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize * smallWordingRatio) + ea,
                    fontWeight: String(400),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  }
                }
              ]
            },
            {
              style: {
                display: desktop ? "block" : "none",
                position: "relative",
                textAlign: "right",
                marginTop: String(0) + ea,
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(100) + '%',
                    top: String(0),
                    left: String(0),
                    height: String(dateRangeLineTop) + ea,
                    borderBottom: "1px solid " + colorChip.whiteGreen,
                  }
                },
                {
                  text: `${autoComma(20000000)} <b%won%b>`,
                  class: [ initDateClassName.end ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingLeft: String(dateRangeIndent) + ea,
                  },
                  bold: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize * smallWordingRatio) + ea,
                    fontWeight: String(400),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  }
                }
              ]
            },
            {
              style: {
                display: mobile ? "block" : "none",
                position: "relative",
                textAlign: "center",
                marginTop: String(0) + ea,
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: String(50) + '%',
                    top: String(0),
                    left: String(25) + '%',
                    height: String(dateRangeLineTop) + ea,
                    borderBottom: "1px solid " + colorChip.whiteGreen,
                  }
                },
                {
                  text: `30 <b%items%b>`,
                  class: [ initDateClassName.start ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingRight: String(dateRangeIndent) + ea,
                    marginRight: String(dateRangeBetween) + ea,
                  },
                  bold: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize * smallWordingRatio) + ea,
                    fontWeight: String(400),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  }
                },
                {
                  text: `${autoComma(20000000)} <b%won%b>`,
                  class: [ initDateClassName.end ],
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(dateRangeSize) + ea,
                    fontWeight: String(200),
                    fontFamily: "graphik",
                    color: colorChip.green,
                    background: colorChip.white,
                    paddingLeft: String(dateRangeIndent) + ea,
                  },
                  bold: {
                    display: "inline-block",
                    fontSize: String(dateRangeSize * smallWordingRatio) + ea,
                    fontWeight: String(400),
                    fontFamily: "graphik",
                    color: colorChip.green,
                  }
                }
              ]
            }
          ]
        },
        {
          text: wordings.contents.join(" "),
          style: {
            display: "block",
            position: "relative",
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            marginTop: desktop ? String(initTitleMarginTop) + ea : String(2.5) + ea,
            paddingLeft: String(contentsPadding) + ea,
            width: desktop ? "" : withOut(contentsPadding * 2, ea),
          },
          bold: {
            fontSize: String(initWordingSize) + ea,
            fontWeight: String(600),
            color: colorChip.black
          }
        },
        {
          text: String(0),
          style: {
            display: (media[0] || media[2] || media[3]) ? "block" : "none",
            position: "absolute",
            bottom: String(initNumberBottom) + ea,
            left: String(contentsPadding) + ea,
            fontSize: String(initNumberSize) + ea,
            fontWeight: String(200),
            fontFamily: "graphik",
            color: colorChip.gray4,
          }
        }
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: desktop ? "inline-block" : "block",
        position: "relative",
        width: desktop ? withOut(secondBlockWidth + secondBlockMargin, ea) : withOut(1 * 2, ea),
        verticalAlign: "top",
        marginLeft: desktop ? String(secondBlockMargin) + ea : String(1) + ea,
        height: desktop ? withOut(picturePaddingTop, ea) : String(pictureMobileHeight) + ea,
        marginTop: desktop ? "" : String(2) + ea,
      }
    }
  ]);

  if (mobile) {
    whiteTong.appendChild(firstBlock);
    whiteTong.insertBefore(firstBlock.firstChild, whiteTong.firstChild);
  }

  for (let i = 0; i < pictureNumber; i++) {
    imageNode = createNode({
      mother: secondBlock,
      style: {
        position: "absolute",
        width: String(circlePictureWidth) + ea,
        height: String(circlePictureWidth) + ea,
        background: colorChip.gray3,
        borderRadius: String(circlePictureWidth) + ea,
        top: String((circlePictureBorder * -1) + circlePictureVisualTop) + ea,
        right: String((circlePictureBorder * -1) + (i * circlePictureBetween)) + ea,
        overflow: "hidden",
        verticalAlign: "top",
        alignItems: "center",
        justifyContent: "center",
        border: String(circlePictureBorder) + "px solid " + colorChip.white,
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: PurchaseListJs.binaryPath + initPhotos[i],
          },
          style: {
            display: "block",
            height: !(media[0] || mobile) ? String(101) + '%' : "",
            width: !(media[0] || mobile) ? "" : String(101) + '%',
          }
        }
      ]
    });
    if (mobile) {
      if (i === 0) {
        imageNode.style.borderTopLeftRadius = String(5) + "px";
        imageNode.style.borderBottomLeftRadius = String(5) + "px";
      }
      if (i === pictureNumber - 1) {
        imageNode.style.borderTopRightRadius = String(5) + "px";
        imageNode.style.borderBottomRightRadius = String(5) + "px";
      }
    }
  }

}

PurchaseListJs.prototype.insertPurchaseBox = async function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, project, ea, baseTong, media, initDateClassName } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, getDateMatrix, equalJson, uniqueValue, imageParsing } = GeneralJs;
  // const { purchase } = this.projectHistory;
  const purchase = {
    analysis: {
      make: [],
      page: [],
      update: [],
      send: [],
    },
    date: new Date(),
    requests: [
      {
        id: "R" + GeneralJs.uniqueValue("hex"),
        date: new Date(),
        name: "제품 구매 리스트_220110",
        description: "* 액자 설치는 못과 와이어 중 선택한 후 별도 준비해야 합니다\n* 의자 업체에 전화문의 결과 - 배송박스에 2개씩 들어가며 한박스씩 배송비 발생된다고 합니다\n* 의자는 간단한 조립제품입니다\n* 가능한 전체 물품이 12/10일 까지 배송되면 좋을듯 합니다",
        items: [
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.minimaxmall.co.kr/shop/goods/goods_view.php?goodsno=5447",
              location: "거실",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://nanoobile.com/product/detail.html?product_no=18&cate_no=1&display_group=2#none",
              location: "거실",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "http://mall.hanssem.com/goods/goodsDetailMall.do?gdsNo=274649&searchdetail=gds_view&searchPagelist=1&searchKey=%EB%9D%BC%EC%83%98%20%EB%A0%8C%EC%A7%80%EB%8C%80",
              location: "거실",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://smartstore.naver.com/royalblueartshop/products/5697567986",
              location: "거실",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://smartstore.naver.com/carda/products/4801351178",
              location: "주방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://shopping.naver.com/living/homeliving/stores/100004003/products/5819922532?NaPm=ct%3Dkwnis9w8%7Cci%3D44fdd31487afff5ca090cebe30d844ca51222647%7Ctr%3Dslsc%7Csn%3D468597%7Chk%3Da60a6739105c04ba791c6a1ae5b3b23daae68ece",
              location: "주방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://smartstore.naver.com/nomia/products/4770773838?NaPm=ct%3Dkwrepwu0%7Cci%3Da554173e0bb067353325093613a4b3c950f4ed10%7Ctr%3Dsls%7Csn%3D1043157%7Chk%3D731e8c53ab04b2e3d6859dfb1af9222f2424f508",
              location: "주방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.decoview.co.kr/product/detail.html?product_no=15894&cate_no=921&display_group=1",
              location: "주방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.hellenstein.co.kr/product/%ED%81%B4%EB%9E%98%EC%8B%9D-80%EC%88%98-%EC%B9%A8%EA%B5%AC%EC%84%B8%ED%8A%B8sqk/4474/category/556/display/1/",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.hellenstein.co.kr/product/%EB%94%94%EB%9F%AD%EC%8A%A4-%EB%8B%A4%EC%9A%B4%ED%95%84-%EC%9D%B4%EB%B6%88sqk/5063/category/586/display/1/",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.hellenstein.co.kr/product/%EB%94%94%EB%9F%AD%EC%8A%A4-%EB%8B%A4%EC%9A%B4%ED%95%84-%EB%B2%A0%EA%B0%9C50x70/90/category/589/display/1/",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.hellenstein.co.kr/product/%EB%A3%A8%EC%84%BC%ED%8A%B8-%EC%9D%B4%EC%A7%91%ED%8A%B8-%EC%BD%94%ED%8A%BC-%ED%8C%A8%EB%93%9Csqk/6471/category/320/display/1/",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://smartstore.naver.com/royalblueartshop/products/5914849546?NaPm=ct%3Dkwge83kw%7Cci%3D3c113e3b5c1594ff5dd31ea1b1db468f058fd3c5%7Ctr%3Dsls%7Csn%3D795612%7Chk%3De5b3f2a666d23d511de48874fb35e9a284fcad2b",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://ohou.se/productions/444987/selling?affect_type=StoreSearchResult&affect_id=41",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
          {
            id: "I" + GeneralJs.uniqueValue("hex"),
            name: "발디 패브릭 식탁의자",
            description: "1~4일 소요, 1박스에 2개씩 포장, 박스당 착불 6,000원",
            detail: {
              link: "https://www.ikea.com/kr/ko/p/knopare-hook-green-50503838/",
              location: "안방",
              option: "다크그레이",
            },
            unit: {
              ea: null,
              price: 45000,
              number: 2,
            },
            amount: {
              supply: 90000,
              vat: 9000,
              consumer: 99000,
              delivery: 6000,
            },
          },
        ]
      },
    ]
  };
  const today = new Date();
  try {
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
    let mobileTitleLeft, mobileTitleTop;
    let tong;
    let whiteBottomMargin;
    let totalTong;
    let paddingLeft;
    let paddingBottom;
    let lineHeight;
    let request;
    let locationTargets;
    let targets;
    let itemsArr;
    let imageObject;
    let imageTong;
    let imageId;
    let middleTong;
    let middleFontSize;
    let totalTongPaddingTop;
    let listTable;
    let listTableMarginTop;
    let listTabelMarginBottom;

    bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
    margin = <%% 52, 52, 44, 36, 4.7 %%>;
    paddingTop =  <%% 46, 46, 40, 32, 5.5 %%>;
    paddingLeft =  <%% 46, 46, 40, 32, 5.6 %%>;
    paddingBottom =  <%% 46, 46, 40, 32, 6.7 %%>;

    whiteBottomMargin = <%% 58, 56, 52, 42, 0 %%>;

    titleFontSize = <%% 21, 21, 21, 19, 4.3 %%>;
    middleFontSize = <%% 18, 18, 18, 16, 3.8 %%>;
    numberRight = <%% 12, 12, 12, 12, 3 %%>;

    titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
    titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

    titleBottom = <%% (isMac() ? 23 : 21), (isMac() ? 21 : 19), (isMac() ? 19 : 17), (isMac() ? 16 : 14), 0 %%>;

    mobileTitleLeft = 1.5;
    mobileTitleTop = -8.7;

    lineHeight = 1.7;

    totalTongPaddingTop = 20;

    listTableMarginTop = 10;
    listTabelMarginBottom = 36;

    this.whiteMargin = (desktop ? margin : 0);

    [ request ] = purchase.requests;
    locationTargets = [ ...new Set(request.items.map((obj) => { return obj.detail.location })) ];
    targets = [];
    for (let str of locationTargets) {
      itemsArr = request.items.filter((obj) => { return obj.detail.location === str });
      for (let obj of itemsArr) {
        imageId = "M" + uniqueValue("hex");
        obj.imageId = imageId;
      }
      targets.push({
        title: str,
        children: itemsArr,
      });
    }

    (async function () {
      imageTong = [];
      for (let str of locationTargets) {
        itemsArr = request.items.filter((obj) => { return obj.detail.location === str });
        for (let obj of itemsArr) {
          imageObject = await ajaxJson({ mode: "image", url: window.encodeURIComponent(obj.detail.link) }, "/getOpenGraph");
          if (imageObject.image !== null) {
            imageTong.push({ id: request.items.find((obj2) => { return obj2.id === obj.id }).imageId, src: imageObject.image });
          }
        }
      }
      return imageParsing(imageTong);
    })().then((imageTong) => {
      console.log(imageTong);
    }).catch((err) => {
      console.log(err);
    });

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
            marginBottom: String(titleBottom) + ea,
            zIndex: mobile ? String(1) : "",
          },
          children: [
            {
              text: "구매 리스트",
              style: {
                position: "relative",
                display: "inline-block",
                top: String(titleTopNumber) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(600),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingRight: String(numberRight) + ea,
                color: colorChip.black,
              }
            },
            {
              text: String(indexNumber),
              style: {
                position: "absolute",
                right: String(0),
                top: String(titleTop) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(200),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingLeft: String(numberRight) + ea,
                color: desktop ? colorChip.black : colorChip.green,
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: desktop ? String(100) + '%' : withOut(paddingLeft * 2, ea),
            background: desktop ? "" : colorChip.white,
            boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
            borderRadius: mobile ? String(1) + ea : "",
            overflow: "hidden",
            marginBottom: String(0) + ea,
            marginTop: desktop ? "" : String(14) + ea,
            paddingLeft: desktop ? "" : String(paddingLeft) + ea,
            paddingRight: desktop ? "" : String(paddingLeft) + ea,
            paddingTop: desktop ? "" : String(paddingTop) + ea,
            paddingBottom: desktop ? "" : String(paddingBottom) + ea,
          }
        },
      ]
    });
    tong = block.lastChild;

    totalTong = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        paddingTop: String(totalTongPaddingTop) + ea,
      }
    });












    for (let { title, children } of targets) {

      listTable = createNode({
        mother: totalTong,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
        },
        children: [
          {
            style: {
              position: "absolute",
              width: String(100) + '%',
              height: String(11) + ea,
              top: String(0),
              left: String(0),
              borderBottom: "1px dashed " + colorChip.gray3,
            }
          },
          {
            text: title,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(middleFontSize) + ea,
              fontWeight: String(600),
              paddingRight: String(numberRight) + ea,
              background: colorChip.white,
              color: colorChip.black,
            }
          },
          {
            style: {
              display: "block",
              border: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",
              width: String(100) + '%',
              height: String(100) + ea,
              marginTop: String(listTableMarginTop) + ea,
              marginBottom: String(listTabelMarginBottom) + ea,
              borderRadius: String(5) + "px",
              overflow: "hidden",
            }
          }
        ]
      }).lastChild;

      console.log(children);

    }


  } catch (e) {
    console.log(e);
  }
}

PurchaseListJs.prototype.insertChecklistBox = function (indexNumber) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
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
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;

  wordings = this.wordings.checkWordings;
  wordsTitle = wordings.title;
  matrix = wordings.matrix;

  bottomMargin = <%% 160, 160, 160, 120, 30 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), (isMac() ? 21 : 19), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

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
  secondWidth = <%% 25, 25, 25, 25, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 1.5 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  checkBoxTop = <%% (isMac() ? 8 : 5.5), (isMac() ? 7.5 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 1 %%>;
  contentsMarginBottom1 = <%% 18, 18, 18, 18, 1 %%>;

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
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: wordsTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
          {
            text: String(indexNumber),
            style: {
              position: "absolute",
              right: String(0),
              top: String(titleTop) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(200),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingLeft: String(numberRight) + ea,
              color: desktop ? colorChip.black : colorChip.green,
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
          paddingBottom: desktop ? "" : String(10.5) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, contents } of matrix) {
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
            text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
            style: {
              display: desktop ? "inline-block" : "block",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              textAlign: "left",
              color: colorChip.black,
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            bold: {
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            }
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
            children: [
              {
                mode: "svg",
                source: this.mother.returnCheckBox(colorChip.green),
                style: {
                  position: "relative",
                  top: String(checkBoxTop) + ea,
                  width: String(checkBoxWidth) + ea,
                  verticalAlign: "top",
                }
              }
            ]
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

PurchaseListJs.prototype.launching = async function (loading) {
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

    if (getObj.proid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    proid = getObj.proid;
    projects = await ajaxJson({ noFlat: true, whereQuery: { proid } }, "/getProjects", { equal: true });
    if (projects.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ project ] = projects;
    if (!/^d/.test(project.desid)) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    this.project = project;
    this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory", { equal: true });

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: project.cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ client ] = clients;
    this.client = client;
    this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory", { equal: true });

    document.querySelector("title").textContent = client.name + " 고객님 제품 구매 리스트 | 홈리에종";

    requestNumber = 0;
    for (let i = 0; i < client.requests.length; i++) {
      if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }
    this.requestNumber = requestNumber;

    designers = await ajaxJson({ noFlat: true, whereQuery: { desid: project.desid } }, "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    service = await ajaxJson({ key: "purchaseList" }, "/getServiceByKey", { equal: true });
    this.wordings = this.scheduleWordings(service);

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "purchaseList",
      client: this.client,
      base: {
        instance: this,
        binaryPath: PurchaseListJs.binaryPath,
        subTitle: (this.client.name + " 고객님 제품 구매 리스트"),
        secondBackground: false
      },
      local: async () => {
        try {
          instance.insertInitBox();
          await instance.insertPurchaseBox(1);
          instance.insertChecklistBox(2);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "PurchaseListJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "PurchaseListJs.launching : " + e.message }, "/errorLog");
  }
}
