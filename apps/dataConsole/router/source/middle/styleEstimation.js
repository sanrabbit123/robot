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
      "return ('styleEstimation');"
    ],
    "description": [
      "thisPerson",
      "return ('styleEstimation');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleEstimation",
  "route": [
    "styleEstimate",
    "estimation",
    "SE"
  ]
} %/%/g

const StyleEstimationJs = function () {
  this.mother = new GeneralJs();
  this.ea = "px";
  this.totalContents = document.getElementById("totalcontents");
  this.ratio = (14 / 9);
  this.photoRatio = (297 / 210);
  this.base = {};
  this.images = null;
  this.margin = {
    outer: 40,
    inner: 50
  };
  this.questions = null;
  this.index = 0;
  this.who = 0;
}

StyleEstimationJs.prototype.roomConverting = function (room) {
  if (room === undefined) {
    throw new Error("invaild argument");
  }
  if (/living/gi.test(room)) {
    return "거실";
  } else if (/after/gi.test(room)) {
    return "인테리어후";
  } else if (/alpharoom/gi.test(room)) {
    return "알파룸";
  } else if (/atticroom/gi.test(room)) {
    return "다락방";
  } else if (/bar/gi.test(room)) {
    return "바";
  } else if (/bathlibrary/gi.test(room)) {
    return "화장실 도서관";
  } else if (/bathroom/gi.test(room)) {
    return "화장실";
  } else if (/bedroom/gi.test(room)) {
    return "침실";
  } else if (/before/gi.test(room)) {
    return "인테리어전";
  } else if (/beforeandafter/gi.test(room)) {
    return "인테리어전후";
  } else if (/corridor/gi.test(room)) {
    return "복도";
  } else if (/curtain/gi.test(room)) {
    return "커튼";
  } else if (/diningroom/gi.test(room)) {
    return "다이닝룸";
  } else if (/dressroom/gi.test(room)) {
    return "드레스룸";
  } else if (/entrance/gi.test(room)) {
    return "현관";
  } else if (/fabricstyling/gi.test(room)) {
    return "패브릭";
  } else if (/firstfloor/gi.test(room)) {
    return "1층";
  } else if (/furniture/gi.test(room)) {
    return "가구";
  } else if (/frontroom/gi.test(room)) {
    return "프론트룸";
  } else if (/fitnessroom/gi.test(room)) {
    return "피트니스룸";
  } else if (/graphicandstuff/gi.test(room)) {
    return "소품";
  } else if (/guestroom/gi.test(room)) {
    return "게스트룸";
  } else if (/guestrooms/gi.test(room)) {
    return "게스트룸";
  } else if (/hall/gi.test(room)) {
    return "홀";
  } else if (/horizont/gi.test(room)) {
    return "스튜디오 호리존트";
  } else if (/kidsbedroom/gi.test(room)) {
    return "아이방 침실";
  } else if (/kidsroom/gi.test(room)) {
    return "아이방";
  } else if (/kitchen/gi.test(room)) {
    return "부엌";
  } else if (/laundryroom/gi.test(room)) {
    return "세탁실";
  } else if (/library/gi.test(room)) {
    return "서재";
  } else if (/librarydressroom/gi.test(room)) {
    return "서재";
  } else if (/lighting/gi.test(room)) {
    return "조명";
  } else if (/multiroom/gi.test(room)) {
    return "멀티룸";
  } else if (/nightview/gi.test(room)) {
    return "저녁뷰";
  } else if (/office/gi.test(room)) {
    return "오피스";
  } else if (/oneroom/gi.test(room)) {
    return "원룸";
  } else if (/photozone/gi.test(room)) {
    return "포토존";
  } else if (/planterior/gi.test(room)) {
    return "식물";
  } else if (/powderroom/gi.test(room)) {
    return "파우더룸";
  } else if (/pentry/gi.test(room)) {
    return "펜트리";
  } else if (/secondfloor/gi.test(room)) {
    return "2층";
  } else if (/signandnamecard/gi.test(room)) {
    return "명찰";
  } else if (/specialroom/gi.test(room)) {
    return "스페셜룸";
  } else if (/stairdoor/gi.test(room)) {
    return "계단";
  } else if (/stairs/gi.test(room)) {
    return "계단";
  } else if (/studyroom/gi.test(room)) {
    return "서재";
  } else if (/review/gi.test(room)) {
    return "리뷰";
  } else if (/terrace/gi.test(room)) {
    return "테라스";
  } else if (/veranda/gi.test(room)) {
    return "베란다";
  } else if (/windowview/gi.test(room)) {
    return "창문뷰";
  } else if (/wineroom/gi.test(room)) {
    return "와인룸";
  } else if (/withdesigner/gi.test(room)) {
    return "디자이너와 함께";
  } else if (/workroom/gi.test(room)) {
    return "작업실";
  }
}

StyleEstimationJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, ratio, margin: { outer: margin } } = this;
  const { createNodes, styleInjection, colorChip, withOut } = GeneralJs;
  let height;
  let total, photo, info;

  height = window.innerHeight - (margin * 2);

  styleInjection(totalContents, {
    background: colorChip.gray2,
    position: "relative",
  });

  [ total, photo, info ] = createNodes([
    {
      mother: totalContents,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(height) + ea,
        width: String(height * ratio) + ea,
        marginTop: String(margin) + ea,
        marginLeft: String((window.innerWidth - (height * ratio)) / 2) + ea,
      },
    },
    {
      mother: -1,
      style: {
        display: "inline-block",
        position: "relative",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        height: String(height) + ea,
        width: String(height) + ea,
        boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
      }
    },
    {
      mother: -2,
      style: {
        display: "inline-block",
        position: "relative",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        height: String(height) + ea,
        width: withOut(height + (margin / 4), ea),
        marginLeft: String(margin / 4) + ea,
        boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
      }
    },
  ]);

  this.base.total = total;
  this.base.photo = photo;
  this.base.info = info;

}

StyleEstimationJs.prototype.photoMaker = function (index) {
  if (typeof index !== "number") {
    throw new Error("must be Number: index");
  }
  const instance = this;
  const { ea, totalContents, ratio, base: { photo }, margin: { inner: margin }, photoRatio } = this;
  const { createNodes, cssInjection, colorChip, withOut } = GeneralJs;
  const { photos } = this.images[index];
  let nodeArr;
  let photoWidth, photoHeight;
  let topMargin;
  let cssString;
  let photoNumber;

  photoNumber = photos.length;
  photoNumber = (photoNumber >= 5) ? 5 : photoNumber;

  for (let i = 0; i < 2; i++) {
    cssString = "";
    if (photoNumber !== 1) {
      cssString += `
      @keyframes ${i === 0 ? "photo" : "gray"}_order0 {
        from { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        ${String((100 / photoNumber) - 0.1)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        ${String(100 / photoNumber)}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        99.9% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        to { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
      }
      `;
      for (let j = 1; j < photoNumber; j++) {
        cssString += `
        @keyframes ${i === 0 ? "photo" : "gray"}_order${String(j)} {
          from { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          ${String(((100 / photoNumber) * j) - 0.1)}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          ${String((100 / photoNumber) * j)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
          ${String(((100 / photoNumber) * (j + 1)) - 0.1)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
          ${String((100 / photoNumber) * (j + 1))}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          to { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        }
        `;
      }
    } else {
      cssString = `
      @keyframes ${i === 0 ? "photo" : "gray"}_order0 {
        from { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        to { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
      }
      `;
    }
    cssInjection(cssString);
  }

  photoWidth = Number(photo.style.width.replace(/[^0-9\.\-]/gi, '')) - (margin * 2);
  photoHeight = photoWidth / photoRatio;
  topMargin = (Number(photo.style.height.replace(/[^0-9\.\-]/gi, '')) - (margin * 2) - photoHeight) / (photoNumber - 1);

  nodeArr = [];
  for (let i = 0; i < photoNumber; i++) {
    nodeArr.push({
      mother: photo,
      style: {
        position: "absolute",
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        backgroundImage: "url('" + S3HOST + photos[i].path + "')",
        backgroundRepeat: "no-repeat",
        top: String(margin + (topMargin * i)) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + ea,
        backgroundColor: colorChip.gray1,
        opacity: String(i ? 0.15 : 1),
        boxShadow: "0px 7px 10px -10px " + colorChip.black,
        zIndex: String(0),
        animation: `photo_order${String(i)} ${String(3 * photoNumber)}s linear infinite`,
      }
    });
    nodeArr.push({
      mother: photo,
      style: {
        position: "absolute",
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        top: String(margin + (topMargin * i)) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + ea,
        backgroundColor: colorChip.deactive,
        zIndex: String(0),
        animation: `gray_order${String(i)} ${String(3 * photoNumber)}s linear infinite`,
      }
    });
  }
  nodeArr.reverse();
  createNodes(nodeArr);
}

StyleEstimationJs.prototype.judgementMaker = function (pid, room, tong, titleSize = 0, topMargin = 0, indentMargin = 0, titleTop = 0, lineHeight = 0) {
  const instance = this;
  if (tong === undefined) {
    throw new Error("invaild argument");
  }
  const { ea, totalContents, ratio, base: { info }, margin: { inner: margin }, questions } = this;
  const { createNodes, colorChip, withOut, ajaxJson, uniqueValue } = GeneralJs;
  let nodeArr;
  let tempObj;
  let order;
  let random;
  let className_title, className_button;

  topMargin = topMargin + 7;
  lineHeight = lineHeight + 0.5;
  random = uniqueValue("string");
  className_title = "button" + random + "_";
  className_button = "button" + random + "_";
  nodeArr = [];

  order = 1;
  for (let { question, children } of questions) {
    tempObj = {};
    tempObj.mother = tong;
    tempObj.text = question;
    tempObj.class = [
      className_title,
      className_title + String((order + 1) / 2)
    ];
    tempObj.attribute = [
      {
        value: "null",
      },
      {
        index: String((order + 1) / 2),
      }
    ];
    tempObj.style = {
      position: "absolute",
      fontWeight: String(500),
      fontSize: String(titleSize - 2) + ea,
      top: String(titleTop + topMargin + ((lineHeight) * order) + 2) + ea,
      left: String(indentMargin) + ea,
      width: withOut(indentMargin * 2, ea),
      textAlign: "left",
      color: colorChip.black,
    };
    nodeArr.push(tempObj);
    order++;

    for (let i = 0; i < children.length; i++) {
      tempObj = {};
      tempObj.mother = tong;
      tempObj.text = children[children.length - 1 - i];
      tempObj.attribute = [
        {
          select: "false",
        },
        {
          index: String(order / 2),
        },
        {
          child: String(i),
        }
      ];
      tempObj.class = [
        className_button + String(order / 2)
      ];
      tempObj.events = [
        {
          type: "click",
          event: function (e) {
            const select = this.getAttribute("select");
            const doms = document.querySelectorAll('.' + className_button + this.getAttribute("index"));
            const allTitles = document.querySelectorAll('.' + className_title);
            let valueMatrix, valueComplete;
            if (select === "true") {
              for (let dom of doms) {
                if (dom === this) {
                  dom.style.color = colorChip.black;
                  dom.setAttribute("select", "false");
                } else {
                  dom.style.color = colorChip.green;
                  dom.setAttribute("select", "true");
                  document.querySelector('.' + className_title + this.getAttribute("index")).setAttribute("value", dom.getAttribute("child"));
                }
              }
            } else {
              for (let dom of doms) {
                if (dom === this) {
                  dom.style.color = colorChip.green;
                  dom.setAttribute("select", "true");
                  document.querySelector('.' + className_title + this.getAttribute("index")).setAttribute("value", dom.getAttribute("child"));
                } else {
                  dom.style.color = colorChip.black;
                  dom.setAttribute("select", "false");
                }
              }
            }
            valueMatrix = [];
            valueComplete = false;
            for (let title of allTitles) {
              if (title.getAttribute("value") === "null") {
                valueComplete = false;
                break;
              }
              valueMatrix.push(Number(title.getAttribute("value")));
              valueComplete = true;
            }

            if (valueComplete) {
              ajaxJson({
                pid,
                room,
                who: instance.who,
                index: instance.index,
                value: valueMatrix
              }, "/styleEstimation_setData").catch(function (e) {
                console.log(e);
              });
              window.localStorage.setItem("index", String(instance.index));
              instance.convertCard();
            }

          }
        },
        {
          type: "mouseover",
          event: function (e) {
            this.style.color = colorChip.green;
          }
        },
        {
          type: "mouseleave",
          event: function (e) {
            const select = this.getAttribute("select");
            if (select === "true") {
              this.style.color = colorChip.green;
            } else {
              this.style.color = colorChip.black;
            }
          }
        },
      ];
      tempObj.style = {
        position: "absolute",
        fontWeight: String(300),
        fontSize: String(titleSize - 2) + ea,
        top: String(titleTop + topMargin + ((lineHeight) * order) - 2) + ea,
        left: String(indentMargin) + ea,
        width: withOut((indentMargin * 2) + (54 * i), ea),
        textAlign: "right",
        cursor: "pointer",
        height: (order === (questions.length * 2) ? String(200) + ea : "auto"),
        color: colorChip.black,
      };
      nodeArr.push(tempObj);
    }

    order++;
  }

  return nodeArr;
}

StyleEstimationJs.prototype.infoMaker = async function (index) {
  const instance = this;
  if (typeof index !== "number") {
    throw new Error("must be Number: index");
  }
  try {
    const { ea, totalContents, ratio, base: { info }, margin: { inner: margin } } = this;
    const { createNodes, colorChip, withOut, ajaxJson } = GeneralJs;
    const { pid, room } = this.images[index];
    let infoHeight, thisContents;
    let titleSize, indentMargin;
    let titleTop, lineHeight, topMargin;
    let judgementTong, judgementTongNull;

    thisContents = await ajaxJson({ pid }, "/styleEstimation_getContentsByPid");
    infoHeight = 194;
    titleSize = 17;
    topMargin = 6;
    indentMargin = 22;
    titleTop = 18;
    lineHeight = 25;

    createNodes([
      {
        mother: info,
        style: {
          position: "relative",
          width: withOut((margin * 2), ea),
          height: String(infoHeight) + ea,
          marginTop: String(margin) + ea,
          marginLeft: String(margin) + ea,
        }
      },
      {
        mother: -1,
        style: {
          position: "absolute",
          width: String(100) + '%',
          height: String(100) + '%',
          border: "1px solid " + colorChip.gray4,
          borderRadius: String(5) + ea,
        }
      },
      {
        mother: -2,
        text: "infomation",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize) + ea,
          fontStyle: "italic",
          top: String(titleTop) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          color: colorChip.black,
        }
      },
      //pid
      {
        mother: -3,
        text: "pid",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 1)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "left",
          color: colorChip.black,
        }
      },
      {
        mother: -4,
        text: pid,
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(200),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 1)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "right",
          color: colorChip.green,
        }
      },
      //conid
      {
        mother: -5,
        text: "conid",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 2)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "left",
          color: colorChip.black,
        }
      },
      {
        mother: -6,
        text: thisContents.conid,
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(200),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 2)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "right",
          color: colorChip.green,
        }
      },
      //designer
      {
        mother: -7,
        text: "designer",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 3)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "left",
          color: colorChip.black,
        }
      },
      {
        mother: -8,
        text: thisContents.designer,
        style: {
          position: "absolute",
          fontWeight: String(200),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 3) + 2) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "right",
          color: colorChip.green,
        }
      },
      //room
      {
        mother: -9,
        text: "room",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 4)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "left",
          color: colorChip.black,
        }
      },
      {
        mother: -10,
        text: this.roomConverting(room),
        style: {
          position: "absolute",
          fontWeight: String(200),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 4) + 2) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "right",
          color: colorChip.green,
        }
      },
      //progress
      {
        mother: -11,
        text: "progress",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 5)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "left",
          color: colorChip.black,
        }
      },
      {
        mother: -12,
        text: String(index) + ' / ' + String(this.images.length - 1),
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(200),
          fontSize: String(titleSize - 2) + ea,
          top: String(titleTop + topMargin + (lineHeight * 5)) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          textAlign: "right",
          color: colorChip.green,
        }
      },
    ]);

    [ judgementTongNull, judgementTong ] = createNodes([
      {
        mother: info,
        style: {
          position: "relative",
          width: withOut((margin * 2), ea),
          height: withOut(infoHeight + (margin / 3) + (margin * 2), ea),
          marginTop: String(margin / 3) + ea,
          marginLeft: String(margin) + ea,
        }
      },
      {
        mother: -1,
        style: {
          position: "absolute",
          width: String(100) + '%',
          height: String(100) + '%',
          border: "1px solid " + colorChip.gray4,
          borderRadius: String(5) + ea,
          overflow: "scroll",
        }
      },
      {
        mother: -1,
        text: "judgement",
        style: {
          position: "absolute",
          fontFamily: "graphik",
          fontWeight: String(400),
          fontSize: String(titleSize) + ea,
          fontStyle: "italic",
          top: String(titleTop) + ea,
          left: String(indentMargin) + ea,
          width: withOut(indentMargin * 2, ea),
          color: colorChip.black,
        }
      },
    ]);

    createNodes(this.judgementMaker(pid, room, judgementTong, titleSize, topMargin, indentMargin, titleTop, lineHeight));

  } catch (e) {
    console.log(e);
  }
}

StyleEstimationJs.prototype.judgementRender = async function (index) {
  const instance = this;
  try {
    if (typeof index !== "number") {
      throw new Error("invaild argument");
    }
    this.photoMaker(index);
    await this.infoMaker(index);
  } catch (e) {
    console.log(e);
  }
}

StyleEstimationJs.prototype.initialBase = function (index) {
  const instance = this;
  const { base: { total, photo, info } } = this;
  const { cleanChildren } = GeneralJs;
  cleanChildren([ photo, info ]);
}

StyleEstimationJs.prototype.convertCard = async function (direction = "next") {
  const instance = this;
  try {
    this.initialBase();
    if (direction === "next") {
      this.index = this.index + 1;
    } else {
      this.index = this.index - 1;
    }
    if (this.index < 0) {
      this.index = this.images.length - 1;
    } else if (this.images[this.index] === undefined) {
      this.index = 0;
    }
    await this.judgementRender(this.index);
  } catch (e) {
    console.log(e);
  }
}

StyleEstimationJs.prototype.arrowMaker = function () {
  const instance = this;
  const { ea, base: { total, photo, info } } = this;
  const { colorChip, createNodes } = GeneralJs;
  let height;
  let margin;

  height = 16;
  margin = 18;

  createNodes([
    {
      mother: total,
      mode: "svg",
      source: this.mother.returnArrow("left", colorChip.gray5),
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.convertCard("previous");
          }
        }
      ],
      style: {
        position: "absolute",
        height: String(height) + ea,
        top: "calc(50% - " + String(height / 2) + ea + ")",
        left: String(-1 * (height + margin)) + ea,
      }
    },
    {
      mother: total,
      mode: "svg",
      source: this.mother.returnArrow("right", colorChip.deactive),
      class: [ "hoverDefault" ],
      events: [
        {
          type: "click",
          event: function (e) {
            instance.convertCard("next");
          }
        }
      ],
      style: {
        position: "absolute",
        height: String(height) + ea,
        top: "calc(50% - " + String(height / 2) + ea + ")",
        right: String(-1 * (height + margin)) + ea,
      }
    },
  ]);
}

StyleEstimationJs.prototype.whoAreYou = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, withOut, isMac } = GeneralJs;
    const { ea, totalContents } = this;
    const member = [
      { name: "박혜연", value: 0 },
      { name: "강해진", value: 1 },
      { name: "배창규", value: 2 },
      { name: "정재은", value: 3 },
      { name: "임혜령", value: 4 },
      { name: "서미화", value: 5 },
      { name: "이큰별", value: 6 },
      { name: "임지민", value: 7 }
    ];
    let width, height;
    let memberArr, tempObj;
    let nameTop, nameLeft;
    let nameTopLine, nameLeftLine;
    let nameWidth;

    width = 360;
    height = 280;
    nameTop = isMac() ? 112 : 114;
    nameTopLine = 45;
    nameLeftLine = 90;
    nameWidth = 60;
    nameLeft = (width - (nameLeftLine + nameLeftLine + nameWidth)) / 2;

    memberArr = [];
    for (let i = 0; i < member.length; i++) {
      tempObj = {};
      tempObj.mother = -2 + (-1 * (i + 1));
      tempObj.events = [
        {
          type: "mouseover",
          event: function (e) {
            this.style.color = colorChip.green;
          }
        },
        {
          type: "mouseleave",
          event: function (e) {
            this.style.color = colorChip.black;
          }
        },
        {
          type: "click",
          event: async function (e) {
            try {
              const name = this.getAttribute("name");
              instance.who = Number(name);
              window.localStorage.setItem("name", String(instance.who));
              totalContents.removeChild(totalContents.lastChild);
              totalContents.removeChild(totalContents.lastChild);
              instance.index = (await GeneralJs.ajaxJson({ who: instance.who }, "/styleEstimation_getData")).index + 1;
              instance.initialBase();
              await instance.judgementRender(instance.index);
              window.localStorage.setItem("index", String(instance.index - 1));
            } catch (e) {
              console.log(e);
            }
          }
        }
      ];
      tempObj.text = member[i].name;
      tempObj.attribute = [
        { name: member[i].value }
      ];
      tempObj.style = {
        position: "absolute",
        fontSize: String(22) + ea,
        fontWeight: String(200),
        top: String(nameTop + (nameTopLine * (i % 3))) + ea,
        left: String(nameLeft + (nameLeftLine * (Math.floor(i / 3)))) + ea,
        width: String(nameWidth) + ea,
        textAlign: "center",
        color: colorChip.black,
        cursor: "pointer",
      };
      memberArr.push(tempObj);
    }

    createNodes([
      {
        mother: totalContents,
        style: {
          position: "absolute",
          width: String(100) + '%',
          height: String(100) + '%',
          top: String(0) + ea,
          left: String(0) + ea,
          background: colorChip.realBlack,
          opacity: String(0),
          zIndex: String(2),
          animation: "justfadeinmiddle 0.5s ease forwards",
        }
      },
      {
        mother: totalContents,
        style: {
          position: "fixed",
          width: String(width) + ea,
          height: String(height) + ea,
          borderRadius: String(5) + ea,
          top: withOut(50, (height / 2), ea),
          left: withOut(50, (width / 2), ea),
          background: GeneralJs.colorChip.white,
          boxShadow: "0px 4px 13px -8px #808080",
          opacity: String(0.95),
          zIndex: String(2),
          animation: "fadeup 0.4s ease forwards",
        }
      },
      {
        mother: -1,
        text: "당신은 누구입니까?",
        style: {
          fontSize: String(32) + ea,
          fontWeight: String(600),
          position: "absolute",
          width: String(100) + '%',
          textAlign: "center",
          top: String(isMac() ? 40 : 42) + ea,
        }
      },
      {
        mother: -2,
        style: {
          position: "absolute",
          width: String(240) + ea,
          borderBottom: "1px solid " + colorChip.deactive,
          top: String(isMac() ? 92 : 94) + ea,
          left: String(59) + ea,
        }
      }
    ].concat(memberArr));

  } catch (e) {
    console.log(e);
  }
}

StyleEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const { returnGet, ajaxJson, cssInjection } = GeneralJs;
    const getObj = returnGet();
    this.images = await ajaxJson("/styleEstimation_getImageList");
    this.questions = await ajaxJson("/styleEstimation_getQuestions");
    this.index = (window.localStorage.getItem("index") === null || window.localStorage.getItem("index") === "null" || Number.isNaN(Number(window.localStorage.getItem("index")))) ? 1 : Number(window.localStorage.getItem("index")) + 1;

    this.baseMaker();
    await this.judgementRender(this.index);
    this.arrowMaker();
    window.addEventListener("resize", (e) => { window.location.reload(); });
    cssInjection(`*{transition:all 0s ease}`);

    loading.parentNode.removeChild(loading);

    if (window.localStorage.getItem("name") === null || window.localStorage.getItem("name") === "null") {
      await this.whoAreYou();
    } else {
      this.who = Number(window.localStorage.getItem("name"));
      this.index = (await ajaxJson({ who: this.who }, "/styleEstimation_getData")).index + 1;
      this.initialBase();
      await this.judgementRender(this.index);
    }

  } catch (e) {
    console.log(e);
  }
}
