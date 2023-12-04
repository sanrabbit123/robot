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
      "return ('이미지 전송 박스 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('이미지 전송 박스 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "imageTransfer",
  "hangul": "이미지 전송 박스",
  "route": [
    "imageTransfer"
  ]
} %/%/g

const ImageTransferJs = function () {
  this.mother = new GeneralJs();
}

ImageTransferJs.binaryPath = FRONTHOST + "/middle/transfer";

ImageTransferJs.prototype.insertInitBox = function () {
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

  quoteHeight = <%% 14, 14, 14, 14, 2.5 %%>;
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

  titleWording = "이미지 전송 박스";
  subTitleContents = "홈리에종에서 이미지를 전송해 드립니다!";

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

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.white))) * quoteHeight;
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
        source: svgMaker.doubleQuote(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
          width: String(quoteWidth) + ea,
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

ImageTransferJs.prototype.insertNoticeBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, svgMaker, serviceParsing } = GeneralJs;
  const { ea, media, data: targetJson } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  let whiteBlock;
  let style;
  let bottomMargin;
  let leftBox, rightBox;
  let margin, marginTop;
  let contents;
  let leftBoxWidth;
  let titleBarTop, titleBarWidth, titleBarHeight, titleBarMarginRight;
  let titleSize, titleWeight, titleLineHeight;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let descriptionBoldWeight;
  let mobilePaddingLeft;
  let mobileTitleMarginBottom;
  let mobileTitleToken;
  let imageHeight;
  let mobileImageMarginBottom;
  let titleVisualTextTop;
  let descriptionVisualTextTop;
  let client;
  let designer, type;

  bottomMargin = <%% 16, 16, 16, 12, 2 %%>;
  margin = <%% 55, 55, 47, 39, 5.5 %%>;
  marginTop = <%% 52, 50, 40, 32, 7 %%>;

  leftBoxWidth = <%% 414, 343, 274, 222, 32 %%>;

  titleBarTop = <%% 8, 7, (isMac() ? 6 : 7), (isMac() ? 6 : 7), 8 %%>;
  titleBarWidth = <%% 5, 5, 4, 3, 5 %%>;
  titleBarHeight = <%% 47, 42, 40, 38, 4 %%>;
  titleBarMarginRight = <%% 15, 14, 12, 10, 15 %%>;

  titleSize = <%% 20, 18, 17, 16, 4 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  descriptionSize = <%% 15, 15, 14, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;

  imageHeight = <%% 320, 270, 230, 180, 28 %%>;

  mobilePaddingLeft = 3.8;
  mobileTitleMarginBottom = 4;
  mobileImageMarginBottom = 4.5;
  mobileTitleToken = "<u%>%u>&nbsp;&nbsp;";

  titleVisualTextTop = desktop ? (isMac() ? 0 : 3) : 0;
  descriptionVisualTextTop = desktop ? (isMac() ? 0 : 2) : 0;

  client = targetJson.target.name;
  designer = targetJson.contents.designer.designer;
  type = (/포트폴리오/gi.test(targetJson.contents.purpose) ? "포트폴리오" : (/제안/gi.test(targetJson.contents.purpose) ? "디자인 제안" : targetJson.contents.purpose));

  contents = {
    left: {
      title: [ targetJson.contents.designer.designer + " " + "디자이너", targetJson.contents.purpose ]
    },
    right: {
      description: [
        `${client} 고객님 안녕하세요, 홈리에종입니다! 고객님께 디자이너 추천을 위해 ${designer} 디자이너의 ${type} 관련 이미지를 전달해드립니다. <b%하단 블록에서 이미지를 확인%b>하실 수 있으며, 각각의 이미지를 클릭해 보시면 크게 보실 수 있습니다.`,
        "<b%담당자 전달 사항%b> : " + targetJson.contents.description
      ],
    }
  };

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: desktop ? "row" : "column",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(marginTop) + ea,
      paddingBottom: String(marginTop) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      justifyContent: "start",
      alignItems: "start",
    }
  });

  leftBox = createNode({
    mother: whiteBlock,
    style: {
      width: desktop ? String(leftBoxWidth) + ea : withOut(margin * 2, ea),
      display: desktop ? "inline-flex" : "flex",
      flexDirection: "row",
      position: "relative",
      justifyContent: "start",
      alignItems: "start",
      marginLeft: String(margin) + ea,
      marginBottom: desktop ? "" : String(mobileTitleMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "none",
          position: "relative",
          top: String(titleBarTop) + ea,
          width: String(titleBarWidth) + ea,
          height: String(titleBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.black,
          marginRight: String(titleBarMarginRight) + ea,
        }
      },
      {
        text: (mobile ? mobileTitleToken : "") + contents.left.title.join(desktop ? "\n" : " "),
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.black,
          lineHeight: String(titleLineHeight),
          top: String(titleVisualTextTop) + ea,
        },
        under: {
          fontSize: String(titleSize) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          lineHeight: String(titleLineHeight),
        }
      }
    ]
  });

  rightBox = createNode({
    mother: whiteBlock,
    style: {
      width: desktop ? withOut(leftBoxWidth + (margin * 2), ea) : withOut(margin * 2, ea),
      display: desktop ? "inline-flex" : "flex",
      verticalAlign: "top",
      position: "relative",
      justifyContent: "start",
      alignItems: "start",
      marginLeft: desktop ? "" : String(margin) + ea,
    },
    children: [
      {
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        },
        children: [
          {
            text: contents.right.description.join("\n\n"),
            style: {
              display: "block",
              position: "relative",
              top: String(descriptionVisualTextTop) + ea,
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionWeight),
              color: colorChip.black,
              lineHeight: String(descriptionLineHeight),
              paddingLeft: mobile ? String(mobilePaddingLeft) + ea : "",
            },
            bold: {
              fontSize: String(descriptionSize) + ea,
              fontWeight: String(descriptionBoldWeight),
              color: colorChip.green,
            }
          }
        ]
      }
    ]
  });

}

ImageTransferJs.prototype.imageViewing = function (images) {
  const instance = this;
  const { ea, totalContents, media } = this;
  const { createNode, withOut, colorChip, equalJson, downloadFile, removeByClass, sleep } = GeneralJs;
  const className = "photoSelectedTarget";
  const zIndex = 3;
  const mobile = media[4];
  const desktop = !mobile;
  return async function (e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      let img, height, imgBox;
      let title, titleSize, bottom;
      let titleBox;
      let leftArrow, rightArrow;
      let leftArrowBox, rightArrowBox;
      let arrowHeight;
      let arrowMargin;
      let index, src;
      let convertEvent;
      let length;
      let totalImages;
      let source;
      let width;
      let loading;
  
      totalImages = equalJson(JSON.stringify(images));
  
      src = this.getAttribute("src");
      source = this.getAttribute("source");
      length = Number(this.getAttribute("length"));
      index = Number(this.getAttribute("index"));
  
      convertEvent = () => {};
  
      height = 0.95;
      width = desktop ? 0.9 : 0.94;
      titleSize = 2;
      bottom = 6.6;
      arrowHeight = <%% 1.7, 1.6, 1.4, 1.2, 1 %%>;
      arrowMargin = <%% 64, 48, 36, 30, 1 %%>;
  
      createNode({
        mother: totalContents,
        class: [ className ],
        events: [
          {
            type: "click",
            event: function (e) {
              removeByClass(className);
            }
          }
        ],
        style: {
          position: "fixed",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          height: String(100) + '%',
          background: colorChip.darkDarkShadow,
          zIndex: String(zIndex),
          animation: "justfadeineight 0.2s ease forwards",
        }
      });
  
      img = createNode({
        mother: totalContents,
        class: [ className ],
        mode: "img",
        attribute: [
          { src: S3HOST + source },
          { direction: "right" }
        ],
        style: {
          opacity: String(0),
          position: "fixed",
          top: String(0),
          left: String(0),
          height: "calc(calc(100% - " + String(instance.naviHeight) + "px" + ") * " + String(height) + ")",
          width: "auto",
          zIndex: String(zIndex),
          borderRadius: String(3) + "px",
          transition: "all 0s ease",
        }
      });
      imgBox = img.getBoundingClientRect();
      while (imgBox.width === 0) {
        await sleep(100);
        imgBox = img.getBoundingClientRect();
      }

      if (imgBox.width < window.innerWidth) {
        img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
        img.style.left = withOut(50, imgBox.width / 2, "px");
        img.style.opacity = String(1);
      } else {
        img.style.height = "auto";
        img.style.width = String(window.innerWidth * width) + "px";
        imgBox = img.getBoundingClientRect();
        while (imgBox.width === 0) {
          await sleep(100);
          imgBox = img.getBoundingClientRect();
        }
        img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
        img.style.left = withOut(50, imgBox.width / 2, "px");
        img.style.opacity = String(1);
      }

      leftArrow = createNode({
        mother: totalContents,
        events: [
          {
            type: [ "dblclick", "selectstart" ],
            event: (e) => {
              e.stopPropagation();
              e.preventDefault();
            }
          }
        ],
        attribute: [
          { direction: "left" }
        ],
        class: [ className ],
        mode: "svg",
        source: instance.mother.returnArrow("left", colorChip.whiteBlack),
        style: {
          display: desktop ? "inline-block" : "none",
          position: "fixed",
          top: String(0),
          left: String(0),
          height: String(arrowHeight) + "vh",
          zIndex: String(zIndex),
          transition: "all 0s ease",
          animation: "fadeuplite 0.2s ease forwards",
          cursor: "pointer"
        }
      });
      leftArrowBox = leftArrow.getBoundingClientRect();
      leftArrow.style.top = "calc(" + String(instance.naviHeight * 0.7) + "px" + " + calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(leftArrowBox.height / 2) + "px" + "))"
      leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
  
      rightArrow = createNode({
        mother: totalContents,
        events: [
          {
            type: [ "dblclick", "selectstart" ],
            event: (e) => {
              e.stopPropagation();
              e.preventDefault();
            }
          }
        ],
        attribute: [
          { direction: "right" }
        ],
        class: [ className ],
        mode: "svg",
        source: instance.mother.returnArrow("right", colorChip.whiteBlack),
        style: {
          display: desktop ? "inline-block" : "none",
          position: "fixed",
          top: String(0),
          left: String(0),
          height: String(arrowHeight) + "vh",
          zIndex: String(zIndex),
          transition: "all 0s ease",
          animation: "fadeuplite 0.2s ease forwards",
          cursor: "pointer"
        }
      });
      rightArrowBox = rightArrow.getBoundingClientRect();
      rightArrow.style.top = "calc(" + String(instance.naviHeight * 0.7) + "px" + " + calc(calc(calc(100% - " + String(instance.naviHeight) + "px" + ") / 2) - " + String(rightArrowBox.height / 2) + "px" + "))"
      rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);
  
      convertEvent = async function (e) {
        e.stopPropagation();
        e.preventDefault();
        const direction = this.getAttribute("direction");
        try {
          let targetIndex, targetImage;
          if (direction === "left") {
            targetIndex = index - 1;
            if (totalImages[targetIndex] === undefined) {
              targetIndex = length - 1;
            }
          } else {
            targetIndex = index + 1;
            if (totalImages[targetIndex] === undefined) {
              targetIndex = 0;
            }
          }
          targetImage = totalImages[targetIndex]
          img.setAttribute("src", S3HOST + targetImage.source);
          img.style.opacity = String(0);
          img.style.height = "calc(calc(100% - " + String(instance.naviHeight) + "px" + ") * " + String(height) + ")";
          img.style.width = "auto";

          loading = instance.mother.whiteProgressLoading(null, true, true, true);

          await sleep(500);
          img.style.height = "calc(calc(100% - " + String(instance.naviHeight) + "px" + ") * " + String(height) + ")";
          img.style.width = "auto";

          index = targetIndex;

          imgBox = img.getBoundingClientRect();
          await sleep(100);
          while (imgBox.width === 0) {
            await sleep(100);
            imgBox = img.getBoundingClientRect();
          }
          img.style.height = "calc(calc(100% - " + String(instance.naviHeight) + "px" + ") * " + String(height) + ")";
          img.style.width = "auto";

          if (imgBox.width < window.innerWidth) {
            img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
            img.style.left = withOut(50, imgBox.width / 2, "px");
          } else {
            img.style.height = "auto";
            img.style.width = String(window.innerWidth * width) + "px";
            imgBox = img.getBoundingClientRect();
            while (imgBox.width === 0) {
              await sleep(100);
              imgBox = img.getBoundingClientRect();
            }
            img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
            img.style.left = withOut(50, imgBox.width / 2, "px");
          }
          leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, "px");
          rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, "px");

          for (let z = 0; z < 5; z++) {
            await sleep(500);
            imgBox = img.getBoundingClientRect();
            await sleep(100);
            while (imgBox.width === 0) {
              await sleep(100);
              imgBox = img.getBoundingClientRect();
            }
            if (imgBox.width < window.innerWidth) {
              img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
              img.style.left = withOut(50, imgBox.width / 2, "px");
            } else {
              img.style.height = "auto";
              img.style.width = String(window.innerWidth * width) + "px";
              imgBox = img.getBoundingClientRect();
              while (imgBox.width === 0) {
                await sleep(100);
                imgBox = img.getBoundingClientRect();
              }
              img.style.top = "calc(" + withOut(50, imgBox.height / 2, "px") + " + " + String(instance.naviHeight / 2) + "px" + ")";
              img.style.left = withOut(50, imgBox.width / 2, "px");
            }
            leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, "px");
            rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, "px");
            if (z === 0) {
              loading.remove();
              img.style.opacity = String(1);
            }
          }

        } catch (e) {
          console.log(e);
        }
      }
      leftArrow.addEventListener("click", convertEvent);
      rightArrow.addEventListener("click", convertEvent);
      img.addEventListener("click", convertEvent);
    } catch (e) {
      console.log(e);
    }
  }
}

ImageTransferJs.prototype.insertPhotoBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, ajaxJson, equalJson, cleanChildren } = GeneralJs;
  const { ea, media, baseTong, data } = this;
  const { images } = data;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  try {
    let mainBlock;
    let mainPaddingTop;
    let mainPaddingBottom;
    let contentsAreaMarginTop;
    let innerPadding;
    let imageMargin;
    let columnsLength;
    let tong;
    let imageTongList;
    let targetTong;
    let margin;

    imageMargin = <%% 3, 3, 2, 2, 0.5 %%>;
    columnsLength = <%% 4, 3, 3, 2, 2 %%>;

    mainPaddingTop = <%% (isMac() ? 133 : 131), (isMac() ? 135 : 135), (isMac() ? 103 : 102), (isMac() ? 83 : 82), 10 %%>;
    mainPaddingBottom = <%% (isMac() ? 153 : 151), (isMac() ? 155 : 155), (isMac() ? 118 : 117), (isMac() ? 98 : 97), 20 %%>;
  
    contentsAreaMarginTop = <%% 45, 40, 34, 28, 6 %%>;
    margin = <%% 55, 55, 47, 39, 5.5 %%>;
    innerPadding = <%% 60, 50, 45, 40, 6 %%>;

    if (images.length <= columnsLength) {
      columnsLength = images.length;
    }

    mainBlock = createNode({
      mother: this.baseTong,
      style: {
        display: "block",
        position: "relative",
        paddingBottom: String(mainPaddingBottom) + ea,
      }
    });

    tong = createNode({
      mother: mainBlock,
      style: {
        display: "block",
        position: "relative",
        background: colorChip.white,
        borderRadius: String(5) + "px",
        boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
        paddingTop: String(innerPadding) + ea,
        paddingBottom: String(innerPadding) + ea,
        height: "auto",
      },
      child: {
        style: {
          position: "relative",
          marginLeft: String(margin) + ea,
          width: withOut(margin * 2, ea),
          height: "auto",
        }
      }
    }).firstChild;

    imageTongList = [];
    for (let i = 0; i < columnsLength; i++) {
      imageTongList.push(createNode({
        mother: tong,
        style: {
          position: "relative",
          display: "inline-block",
          width: "calc(calc(100% - " + String(imageMargin * (columnsLength - 1)) + ea + ") / " + String(columnsLength) + ")",
          marginRight: String(i % columnsLength === columnsLength - 1 ? 0 : imageMargin) + ea,
          marginBottom: String(imageMargin) + ea,
          borderRadius: String(3) + "px",
          verticalAlign: "top",
          cursor: "pointer",
        },
      }));
    }

    for (let i = 0; i < images.length; i++) {
      imageTongList.sort((a, b) => {
        return a.getBoundingClientRect().height - b.getBoundingClientRect().height;
      });
      targetTong = imageTongList[0];
      createNode({
        mother: targetTong,
        attribute: {
          src: S3HOST + images[i].link,
          index: String(i),
          length: String(images.length),
          toggle: "off",
          source: images[i].source,
        },
        event: {
          click: instance.imageViewing(images),
        },
        style: {
          position: "relative",
          display: "inline-flex",
          width: withOut(0, ea),
          marginBottom: String(imageMargin) + ea,
          borderRadius: String(3) + "px",
          verticalAlign: "top",
          cursor: "pointer",
          overflow: "hidden",
        },
        child: {
          mode: "img",
          attribute: {
            src: S3HOST + images[i].link,
          },
          style: {
            position: "relative",
            display: "block",
            width: withOut(0, ea),
            height: "auto",
          },
        },
      });

    }



  } catch (e) {
    console.log(e);
    window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
    window.location.reload();
  }
}

ImageTransferJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, selfHref } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    const getObj = returnGet();

    if (getObj.id === undefined) {
      window.alert("잘못된 접근입니다!");
      selfHref(FRONTHOST);
    }
    if (getObj.cliid === undefined) {
      window.alert("잘못된 접근입니다!");
      selfHref(FRONTHOST);
    }

    const { id, cliid } = getObj;
    const { data, client, designer } = await ajaxJson({ mode: "get", id, view: (getObj.view === "test" ? 1 : 0) }, S3HOST + ":3000/imageTransfer", { equal: true });
    this.data = data;
    this.client = client;
    this.designer = designer;
    
    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "imageTransfer",
      client: this.client,
      base: {
        instance: this,
        binaryPath: ImageTransferJs.binaryPath,
        subTitle: (this.client.name + " 고객님 이미지 전송"),
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertNoticeBox();
          await instance.insertPhotoBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ImageTransferJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "ImageTransferJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
    selfHref(FRONTHOST);
  }
}
