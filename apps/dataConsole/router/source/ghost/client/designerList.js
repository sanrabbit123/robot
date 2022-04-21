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
      "return ('디자이너 리스트 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 협업 디자이너 리스트 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designerList",
  "route": [
    "designerList",
    "DL"
  ]
} %/%/g

const DesignerListJs = function () {
  this.mother = new GeneralJs();
}

DesignerListJs.binaryPath = FRONTHOST + "/middle/designer";

DesignerListJs.prototype.insertInitBox = function () {
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
  let services;
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
  let designerTongPaddingTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 120, 120, 120, 120, 9 %%>;

  quoteHeight = <%% 11, 11, 11, 11, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 31, 31, 30, 28, 5.7 %%>;
  titleFontWeight = <%% 500, 500, 500, 500, 500 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingLeft = <%% 20, 18, 13, 8, 2.2 %%>;
  serviceSize = <%% 17, 16, 16, 15, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 6 %%>;

  searchBarPaddingTop = <%% 20, 20, 20, 20, 5.2 %%>;
  searchBarHeight = <%% 40, 40, 40, 40, 8 %%>;
  searchBarWidth = <%% 500, 500, 490, 450, 74 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 15, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  designerTongPaddingTop = <%% 80, 72, 72, 72, 6 %%>;

  titleWording = "디자이너 리스트";
  services = serviceParsing().name;
  services.push("전체 보기");
  placeholder = "";

  serviceButtonClassName = "serviceButton";

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      paddingTop: String(whiteBlockPaddingTop) + ea,
      paddingBottom: String(whiteBlockPaddingBottom) + ea,
      background: colorChip.white,
      marginBottom: String(whiteBlockMarginBottom) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });

  quoteWidth = SvgTong.getRatio(SvgTong.stringParsing(svgMaker.doubleQuote(colorChip.green))) * quoteHeight;
  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.doubleQuote(colorChip.green),
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
          color: colorChip.black,
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
      paddingTop: String(searchBarPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBarWidth) + ea,
          height: String(searchBarHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnSearch(colorChip.black),
            style: {
              position: "absolute",
              height: String(searchIconHeight) + ea,
              right: String(searchIconRight) + ea,
              top: String(searchIconTop) + ea,
            }
          },
          {
            mode: "input",
            class: [ "searchInput" ],
            attribute: {
              type: "text",
              placeholder: placeholder,
            },
            event: {
              keyup: function (e) {
                setDebounce(async () => {
                  try {
                    this.value = this.value.trim();
                    this.value = this.value.replace(/[^가-힣a-z ]/gi, '');
                    instance.designerBlock(this.value);
                  } catch (e) {
                    console.log(e);
                  }
                }, "searchEventDebounce", 1000);
              }
            },
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: withOut(inputWithoutHeight, ea),
              border: String(0),
              outline: String(0),
              background: "transparent",
              fontSize: String(inputSize) + ea,
              fontWeight: String(inputWeight),
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      },
    ]
  });


  serviceChildren = [];
  for (let service of services) {
    if (desktop) {
      if (serviceChildren.length !== 0) {
        serviceChildren.push({
          style: {
            display: "inline-block",
            position: "relative",
            paddingLeft: String(servicePaddingLeft) + ea,
            paddingRight: String(servicePaddingLeft) + ea,
          },
          children: [
            {
              text: "|",
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(serviceSize) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
              },
              bold: {
                color: colorChip.deactive,
              }
            }
          ]
        });
      }
    }
    serviceChildren.push({
      class: [
        serviceButtonClassName
      ],
      attribute: {
        toggle: "off",
        value: service,
      },
      event: {
        click: function (e) {
          const targets = [ ...document.querySelectorAll('.' + serviceButtonClassName) ];
          let thisValue;
          for (let dom of targets) {
            if (dom === this) {
              dom.setAttribute("toggle", "on");
              dom.firstChild.style.color = colorChip.black;
              dom.firstChild.querySelector('b').style.color = colorChip.green;
              thisValue = dom.getAttribute("value");
            } else {
              dom.setAttribute("toggle", "off");
              dom.firstChild.style.color = colorChip.deactive;
              dom.firstChild.querySelector('b').style.color = colorChip.deactive;
            }
          }
          instance.designerBlock(/전체/gi.test(thisValue) ? "" : thisValue);
        }
      },
      style: {
        display: "inline-block",
        position: "relative",
        paddingLeft: String(servicePaddingLeft) + ea,
        paddingRight: String(servicePaddingLeft) + ea,
        marginBottom: desktop ? "" : String(servicePaddingLeft) + ea,
      },
      children: [
        {
          text: "<b%#%b> " + service,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(serviceSize) + ea,
            fontWeight: String(400),
            color: colorChip.deactive,
            cursor: "pointer",
          },
          bold: {
            color: colorChip.deactive,
          }
        }
      ]
    });
  }

  serviceBlock = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      paddingTop: String(serviceBlockPaddingTop) + ea,
    },
    children: serviceChildren
  });

  serviceBlock.lastChild.firstChild.style.color = colorChip.black;
  serviceBlock.lastChild.firstChild.querySelector('b').style.color = colorChip.green;


  this.designerTong = createNode({
    mother: whiteBlock,
    style: {
      display: "block",
      paddingTop: String(designerTongPaddingTop) + ea,
      width: withOut(0, ea),
    }
  });

  this.designerBlock(null);
}

DesignerListJs.prototype.designerBlock = function (search = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, cleanChildren, designerCareer, designerMthParsing, selfHref } = GeneralJs;
  const { ea, media } = this;
  const { designers, designerTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let targets;
  let tong;
  let block;
  let tongPaddingLeft;
  let blockMargin;
  let columns;
  let src;
  let blockHeight;
  let photoWidth;
  let photoMargin;
  let contentsPaddingTop;
  let contentsBlock;
  let blockMarginBottom;
  let titleSize, titleWeight;
  let careerSize, careerWeight;
  let careerTextTop;
  let careerBetween;
  let grayBarTop, grayBarBottom;
  let descriptionSize, descriptionWeight, descriptionLineHeight;
  let tagTong;
  let mthTargets;
  let contentsBlockHeight;
  let tagTongMarginTop;
  let tagTongPaddingTop, tagTongPaddingBottom, tagTongPaddingLeft;
  let tagTongMarginRight;
  let tagSize, tagWeight;
  let arrowWidth, arrowHeight, arrowBottom;
  let num, booArr;

  tongPaddingLeft = <%% 100, 70, 80, 50, 6.5 %%>;
  blockMargin = <%% 40, 30, 20, 20, 2 %%>;
  blockMarginBottom = <%% 20, 20, 15, 10, 4 %%>;
  columns = <%% 2, 2, 1, 1, 1 %%>;
  contentsPaddingTop = <%% 16, 16, 16, 16, 1 %%>;

  blockHeight = <%% (isMac() ? 178 : 176), 160, (isMac() ? 178 : 176), 170, 25 %%>;
  photoWidth = blockHeight - (contentsPaddingTop * 2);

  photoMargin = <%% 30, 25, 30, 30, 4 %%>;

  titleSize = <%% 24, 23, 23, 23, 4 %%>;
  titleWeight = <%% 600, 600, 600, 600, 600 %%>;

  careerSize = <%% 12, 12, 12, 12, 2.5 %%>;
  careerWeight = <%% 500, 500, 500, 500, 500 %%>;
  careerTextTop = <%% 0, 0, 0, 0, 0 %%>;

  careerBetween = <%% 8, 8, 8, 8, 1.5 %%>;

  grayBarTop = <%% 8, 8, 8, 8, 1.5 %%>;
  grayBarBottom = <%% 14, 10, 14, 14, 1.5 %%>;

  descriptionSize = <%% 14, 11, 13, 12, 2.7 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.55 %%>;

  contentsBlockHeight = 4;

  tagTongMarginTop = <%% 15, 15, 19, 15, (isIphone() ? 2.9 : 2.8) %%>;

  tagTongPaddingTop = <%% (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), (isMac() ? 5 : 6), 1.4 %%>;
  tagTongPaddingBottom = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isIphone() ? 1.6 : 2) %%>;
  tagTongPaddingLeft = <%% 10, 10, 10, 10, 2.4 %%>;
  tagTongMarginRight = <%% 5, 5, 5, 5, 1.2 %%>;

  tagSize = <%% 12, 11, 12, 12, 2.5 %%>;
  tagWeight = <%% 600, 600, 600, 600, 600 %%>;

  arrowWidth = <%% 40, 32, 32, 32, 3 %%>;
  arrowHeight = <%% 10, 8, 8, 8, 2 %%>;
  arrowBottom = <%% 12, 12, 12, 12, 1 %%>;

  cleanChildren(designerTong);

  if (typeof search === "string") {
    if (search.trim() === '') {
      targets = designers;
    } else {
      targets = designers.filter((designer) => {
        let boo;
        boo = false;
        for (let t of designer.tag) {
          if ((new RegExp(search, "gi")).test(t)) {
            boo = true;
            break;
          }
        }
        return boo;
      });
    }
  } else {
    targets = designers;
  }

  tong = createNode({
    mother: designerTong,
    style: {
      display: "block",
      position: "relative",
      paddingLeft: String(tongPaddingLeft) + ea,
      paddingRight: String(tongPaddingLeft - blockMargin) + ea,
    }
  });

  for (let designer of targets) {

    if (desktop) {
      src = FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    } else {
      src = FRONTHOST + "/list_image/portp" + designer.setting.front.photo.porlid + "/mobile/mo" + designer.setting.front.photo.index + designer.setting.front.photo.porlid + ".jpg";
    }

    block = createNode({
      mother: tong,
      style: {
        display: "inline-block",
        width: "calc(calc(100% - " + String(columns * blockMargin) + ea + ") / " + String(columns) + ")",
        height: String(blockHeight) + ea,
        marginRight: String(blockMargin) + ea,
        marginBottom: String(blockMarginBottom) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            top: String(contentsPaddingTop) + ea,
            borderRadius: String(8) + "px",
            width: String(photoWidth) + ea,
            height: String(photoWidth) + ea,
            backgroundSize: "auto 100%",
            backgroundPosition: "50% 50%",
            backgroundImage: "url('" + src + "')",
            verticalAlign: "top",
          }
        },
        {
          class: [ "designerBlock" ],
          attribute: { desid: designer.desid },
          event: {
            click: function (e) {
              const desid = this.getAttribute("desid");
              selfHref(FRONTHOST + "/desdetail.php?desid=" + desid);
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(photoWidth + photoMargin, ea),
            marginLeft: String(photoMargin) + ea,
            paddingTop: String(contentsPaddingTop) + ea,
            paddingBottom: String(contentsPaddingTop) + ea,
            height: withOut(contentsPaddingTop * 2, ea),
            verticalAlign: "top",
          }
        }
      ]
    });

    contentsBlock = block.children[1];

    createNode({
      mother: contentsBlock,
      text: designer.designer,
      style: {
        display: "block",
        position: "relative",
      },
      children: [
        {
          text: designer.designer,
          style: {
            display: "inline-block",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
            marginRight: String(careerBetween) + ea,
          }
        },
        {
          text: designerCareer(designer, true),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(careerSize) + ea,
            fontWeight: String(careerWeight),
            color: colorChip.green,
            top: String(careerTextTop) + ea,
          },
          bold: {
            fontSize: String(careerSize) + ea,
            fontWeight: String(careerWeight),
            color: colorChip.deactive,
          }
        },
      ]
    })

    createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        width: String(100) + '%',
        height: String(grayBarTop) + ea,
        borderBottom: "1px solid " + colorChip.gray3,
      }
    });

    createNode({
      mother: contentsBlock,
      class: [ "hoverDefault_lite" ],
      text: desktop ? (designer.setting.front.introduction.desktop.slice(0, 2).join("\n") + " ...") : (designer.setting.front.introduction.desktop.slice(0, 1).join("\n") + " ..."),
      style: {
        display: "block",
        marginTop: String(grayBarBottom) + ea,
        fontSize: String(descriptionSize) + ea,
        fontWeight: String(descriptionWeight),
        color: colorChip.black,
        lineHeight: String(descriptionLineHeight),
        height: desktop ? "" : String(contentsBlockHeight) + ea,
        overflow: desktop ? "" : "scroll",
      }
    });

    tagTong = createNode({
      mother: contentsBlock,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        marginTop: String(tagTongMarginTop) + ea,
      }
    });
    mthTargets = serviceParsing(0).name;
    booArr = designer.analytics.project.matrix.map((arr) => { return arr.some((num) => { return num === 1 }) });
    mthTargets = mthTargets.filter((str, index) => { return booArr[index]; });
    mthTargets = mthTargets.filter((str) => { return !/엑스트라/gi.test(str) });
    if (mthTargets.length > 2) {
      mthTargets = mthTargets.slice(-2);
    }

    num = 0;
    for (let mth of mthTargets) {
      createNode({
        mother: tagTong,
        style: {
          display: "inline-flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: String(tagTongPaddingTop) + ea,
          paddingBottom: String(tagTongPaddingBottom) + ea,
          paddingLeft: String(tagTongPaddingLeft) + ea,
          paddingRight: String(tagTongPaddingLeft) + ea,
          borderRadius: String(5) + "px",
          marginRight: String(tagTongMarginRight) + ea,
          background: colorChip.gray1,
        },
        children: [
          {
            text: mth,
            style: {
              position: "relative",
              fontSize: String(tagSize) + ea,
              fontWeight: String(tagWeight),
              color: colorChip.black,
            }
          }
        ]
      });

      num++;
    }

    if (desktop) {
      createNode({
        mode: "svg",
        mother: tagTong,
        class: [ "hoverDefault_lite" ],
        source: svgMaker.horizontalArrow(arrowWidth, arrowHeight, colorChip.green),
        style: {
          position: "absolute",
          right: String(0) + ea,
          bottom: String(arrowBottom) + ea,
          width: String(arrowWidth) + ea,
          height: String(arrowHeight) + ea,
        }
      });
    }

  }

}

DesignerListJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, serviceParsing } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const getObj = returnGet();
    let response, services;

    services = serviceParsing().name;
    response = await ajaxJson({ mode: "designer" }, LOGHOST + "/getContents", { equal: true });
    this.designers = new SearchArray(response.designers);
    for (let designer of this.designers) {
      designer.tag = [ ...new Set(response.contentsArr.filter((obj) => { return obj.desid === designer.desid }).map((obj) => {
        return obj.tag;
      }).flat()) ];
      designer.tag.push(designer.designer);
      for (let i = 0; i < designer.service.length; i++) {
        if (designer.service[i] === 1) {
          designer.tag.push(services[i]);
        }
      }
      for (let wording of designer.setting.front.introduction.desktop) {
        designer.tag.push(wording);
      }
    }

    this.designers = this.designers.toNormal().filter((obj) => {
      return /완료/gi.test(obj.information.contract.status);
    }).filter((obj) => {
      return obj.setting.front.introduction.desktop.length > 0;
    }).filter((obj) => {
      return /^[ap]/i.test(obj.setting.front.photo.porlid);
    })

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "designerList",
      client: null,
      base: {
        instance: this,
        binaryPath: DesignerListJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 1,
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignerListJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "DesignerListJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
