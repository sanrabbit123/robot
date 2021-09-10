DesignerJs.prototype.requestDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const { scrollTo } = GeneralJs;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { colorChip } = GeneralJs;
  let target, pastScrollTop;

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.rInitialIcon !== undefined && this.rInitialIcon !== null) {
      this.rInitialIcon.parentElement.removeChild(this.rInitialIcon);
    }
    if (this.nextIcon !== undefined && this.nextIcon !== null) {
      this.nextIcon.parentElement.removeChild(this.nextIcon);
    }
    if (this.mInitialIcon !== undefined && this.mInitialIcon !== null) {
      this.mInitialIcon.parentElement.removeChild(this.mInitialIcon);
    }
    if (this.previousIcon !== undefined && this.previousIcon !== null) {
      this.previousIcon.parentElement.removeChild(this.previousIcon);
    }
    if (this.aInitialIcon !== undefined && this.aInitialIcon !== null) {
      this.aInitialIcon.parentElement.removeChild(this.aInitialIcon);
    }
    if (this.listIcon !== undefined && this.listIcon !== null) {
      this.listIcon.parentElement.removeChild(this.listIcon);
    }
    this.listIcon = null;
    this.aInitialIcon = null;
    this.previousIcon = null;
    this.mInitialIcon = null;
    this.nextIcon = null;
    this.rInitialIcon = null;

    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  target = null;
  for (let i = 0; i < this.standardDoms.length; i++) {
    if (this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g) !== null) {
      if (desid === this.standardDoms[i].firstChild.textContent.match(/d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/g)[0]) {
        target = i;
      }
    }
  }
  for (let i = 1; i < this.standardDoms.length; i++) {
    if (i !== target) {
      this.standardDoms[i].style.color = this.standardDoms[i].getAttribute("color");
    } else {
      this.standardDoms[i].style.color = colorChip.green;
      if (i !== 1) {
        if (this.standardDoms[i].getBoundingClientRect().top > window.innerHeight - belowHeight - motherHeight - this.standardDoms[i].getBoundingClientRect().height + 10 || this.standardDoms[i].getBoundingClientRect().top < firstTop) {
          standardBar.parentElement.scrollTo({ top: ((i - 1) * (this.standardDoms[i].getBoundingClientRect().height)) });
        }
      } else {
        standardBar.parentElement.scrollTo({ top: 0 });
      }
    }
  }

  this.requestList(desid);
  this.requestIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }
}

DesignerJs.prototype.requestList = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = getCookiesAll();
  const mobile = this.media[4];
  const desktop = !mobile;
  let designer;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr, subNodeArr;
  let eachTotalTong, eachNameTong, eachValueTong;
  let level1Width, level1Left;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let tempMatrix;
  let alphabetWidth;
  let temp;
  let factorHeight, factorWidth;
  let tendencyTop, tendencyHeight;
  let tendencyFactorHeight, tendencyIndent, tendencyWidthIndent;
  let textAreaTop;
  let baseTongMarginBottom;
  let checkListData;
  let middleAdjustTong;
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let boxNumber;
  let requestBox, boxMargin;
  let projects;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;

  designer = this.designers.pick(desid);
  projects = designer.projects;

  boxNumber = 6;
  maxBoxNumber = projects.length;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 40 %%>;
  size = <%% 16, 15, 15, 15, 4 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  boxMargin = <%% 13, 13, 12, 10, 2 %%>;

  requestSize = <%% 26, 26, 25, 24, 5 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0.2 %%>;
  requestWordPaddingTop = <%% 24, 24, 24, 24, 3 %%>;
  requestWordPaddingBottom = <%% 32, 32, 32, 32, 3 %%>;

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : (this.middleMode ? String(60) + "px" : String(0)),
      left: String(grayBarWidth + (desktop ? margin * 3 : 0)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : 0), ea),
      height: "auto",
      animation: "",
    }
  });
  baseTong = createNode({
    mother: baseTong0,
    style: {
      position: "relative",
      top: String(0) + ea,
      left: String(0) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + ea,
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });

  for (let i = 0; i < maxBoxNumber; i++) {
    requestBox = createNode({
      mother: baseTong,
      class: [ "hoverDefault_lite" ],
      events: [
        {
          type: "click",
          event: this.requestDocument(baseTong, i, designer, projects[i])
        }
      ],
      style: {
        position: "relative",
        display: "inline-block",
        width: "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        borderRadius: String(5) + "px",
        marginTop: String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea,
        marginRight: String(boxMargin) + ea,
        marginLeft: String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea,
        marginBottom: String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea,
        background: colorChip.gray1,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        transition: "all 0s ease",
      },
      children: [
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: projects[i].name,
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
          },
          children: [
            {
              text: "고객님",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(200),
                color: colorChip.black,
                display: "inline-block",
              }
            }
          ]
        },
        {
          style: {
            position: "relative",
          },
          children: [
            {
              text: "의뢰서",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(200),
                color: colorChip.black,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let dom of requestBox.children) {
      if (thisChildWidth <= dom.firstChild.getBoundingClientRect().width) {
        thisChildWidth = dom.firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));

    requestBox.style.width = "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
    requestBox.style.marginTop = String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea;
    requestBox.style.marginLeft = String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea;
    requestBox.style.marginBottom = String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea;
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.requestDocument = function (mother, index, designer, project) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const blocks = mother.children;
  return async function (e) {
    try {
      const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients");
      let thisBlock, motherTop;
      let visualSpecific;

      mother.style.height = String(mother.getBoundingClientRect().height) + ea;
      motherTop = mother.getBoundingClientRect().top;

      visualSpecific = <%% 1, 1, 1, 0, 0 %%>;

      for (let i = 0; i < blocks.length; i++) {
        blocks[i].setAttribute("top", String(Math.floor(blocks[i].getBoundingClientRect().top - mother.getBoundingClientRect().top)) + ea);
        blocks[i].setAttribute("left", String(Math.floor(blocks[i].getBoundingClientRect().left - Math.ceil(mother.getBoundingClientRect().left))) + ea);
        if (i !== index) {
          blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
        } else {
          for (let dom of blocks[i].children) {
            dom.style.opacity = String(0);
            thisBlock = blocks[i];
          }
        }
      }

      for (let block of blocks) {
        block.style.position = "absolute";
        block.style.margin = String(0);
        block.style.left = block.getAttribute("left");
        block.style.top = block.getAttribute("top");
      }

      GeneralJs.setTimeout(function () {
        thisBlock.style.transition = "all 0.4s ease";
        thisBlock.style.position = "absolute";
        thisBlock.style.left = String(0);
        thisBlock.style.top = String(0);
        thisBlock.style.width = String(100) + '%';
        thisBlock.style.height = String(100) + '%';

        mother.parentElement.style.height = withOut((motherTop * 2) + visualSpecific, ea);
        mother.style.paddingTop = String(motherTop) + ea;
        mother.style.height = withOut(motherTop, ea);
        mother.style.overflow = "scroll";

        GeneralJs.setTimeout(() => {
          mother.style.background = colorChip.gray1;
          const board = createNode({
            mother,
            style: {
              position: "relative",
              left: String(motherTop) + ea,
              width: withOut(motherTop * 2, ea),
              height: String(8000) + ea,
              borderRadius: String(3) + "px",
              background: colorChip.white,
              animation: "fadeupdelay 0.4s ease forwards",
              boxShadow: "0px 3px 14px -10px " + colorChip.shadow,
              zIndex: String(1),
              marginBottom: String(motherTop) + ea,
            }
          });
          instance.requestContents(board, designer, project, client);
        }, 500);

      }, 400);

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.requestContents = async function (board, designer, project, client) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const title = "홈스타일링 의뢰서";
  try {
    const divToInput = async function (e) {
      try {
        const { ajaxJson, createNode, withOut, colorChip, equalJson } = GeneralJs;
        const removeClassName = "divToInputRemove";
        const target = this.firstChild.firstChild;
        const text = target.textContent;
        const mother = this.firstChild;
        let styleCopied, styleRaw, style;
        let input, cancel;
        let updateEvent;

        if (this.querySelector("input") === null) {

          styleRaw = equalJson(JSON.stringify(target.style));
          styleCopied = {};
          for (let i in styleRaw) {
            if (styleRaw[i] !== '' && !/^[0-9]+$/.test(i)) {
              styleCopied[i] = styleRaw[i];
            }
          }
          style = equalJson(JSON.stringify(styleCopied));
          styleCopied.outline = String(0);
          styleCopied.border = String(0);
          styleCopied.background = "transparent";
          styleCopied.color = colorChip.green;
          styleCopied.zIndex = String(2);

          updateEvent = async function (value) {
            try {
              const targets = document.querySelectorAll('.' + removeClassName);
              for (let dom of targets) {
                dom.parentElement.removeChild(dom);
              }
              createNode({ mother, text: value, style });
            } catch (e) {
              console.log(e);
            }
          }

          cancel = createNode({
            mother,
            class: [ removeClassName ],
            events: [
              {
                type: "click",
                event: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const targets = document.querySelectorAll('.' + removeClassName);
                  for (let dom of targets) {
                    dom.parentElement.removeChild(dom);
                  }
                  createNode({ mother, text, style });
                }
              }
            ],
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              background: "transparent",
              zIndex: String(2),
            }
          });

          input = createNode({
            mother,
            class: [ removeClassName ],
            mode: "input",
            events: [
              {
                type: "click",
                event: (e) => { e.preventDefault(); e.stopPropagation(); }
              },
              {
                type: "keydown",
                event: function (e) {
                  if (e.key === "Tab") {
                    e.preventDefault();
                  }
                }
              },
              {
                type: "keyup",
                event: async function (e) {
                  try {
                    if (e.key === "Tab") {
                      await updateEvent(this.value);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              {
                type: "keypress",
                event: async function (e) {
                  try {
                    if (e.key === "Enter") {
                      await updateEvent(this.value);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            ],
            attribute: [
              { value: text }
            ],
            style: styleCopied
          });

          mother.removeChild(target);
          input.focus();

        }

      } catch (e) {
        console.log(e);
      }
    }
    const matrix = [
      [ "고객 정보", "", "공간 정보", "" ],
      [ "고객명", "이경숙", "계약 형태", "자가" ],
      [ "연락처", "010-4928-2754", "사전점검일", "거주중" ],
      [ "가족구성원", "부부, 아들 1", "집 비는 날", "2021-12-23 예정" ],
      [ "주소", "서울 성북구 보문사길 111 보문파크뷰자이 아파트 109동 1004호 34A형", "입주 예정일", "2022-01월말 입주" ],
      [ "", "", "특이 사항", "공사 기간 1달 소요 예상" ],
      [ "예산", "1억~ 최대 1억 5000만원 계획", "공간구성", "방3, 화장실2, 발코니 확장" ],
      [ "서비스 정보", "", "고객 요청", "" ],
      [ "서비스", "엑스트라 스타일링", "깔끔하고 수납 전체적인인테리어와 스타일링", "" ],
      [ "선호 컨셉", "베이지톤, 아늑, 감성적인 분위기", "", "" ],
      [ "시공", "전체 시공, 디자인 시공", "", "" ],
      [ "스타일링", "전체 구매", "", "" ],
    ];
    const mergeMap = [
      [ null, [ 0, 0 ], null, [ 0, 2 ] ],
      [ null, null, null, null ],
      [ null, null, null, null ],
      [ null, null, null, null ],
      [ null, null, null, null ],
      [ [ 4, 0 ], [ 4, 1 ], null, null ],
      [ null, null, null, null ],
      [ null, [ 7, 0 ], null, [ 7, 2 ] ],
      [ null, null, null, [ 8, 2 ] ],
      [ null, null, null, [ 9, 2 ] ],
      [ null, null, null, [ 10, 2 ] ],
      [ null, null, [ 8, 2 ], [ 11, 2 ] ],
    ];
    const callbackMap = [
      [ null, null, null, null ],
      [ null, divToInput, null, divToInput ],
      [ null, divToInput, null, divToInput ],
      [ null, divToInput, null, divToInput ],
      [ null, divToInput, null, divToInput ],
      [ null, divToInput, null, divToInput ],
      [ null, divToInput, null, divToInput ],
      [ null, null, null, null ],
      [ null, divToInput, divToInput, null ],
      [ null, divToInput, null, null ],
      [ null, divToInput, null, null ],
      [ null, divToInput, null, null ],
    ];
    const boldMap = [
      [ 0, 0, 0, 0 ],
      [ 1, 0, 1, 0 ],
      [ 1, 0, 1, 0 ],
      [ 1, 0, 1, 0 ],
      [ 1, 0, 1, 0 ],
      [ 1, 0, 1, 0 ],
      [ 1, 0, 1, 0 ],
      [ 0, 0, 0, 0 ],
      [ 1, 0, 0, 0 ],
      [ 1, 0, 0, 0 ],
      [ 1, 0, 0, 0 ],
      [ 1, 0, 0, 0 ],
    ];
    const titleMap = [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ];
    const widthRatio = [ 1, 3, 1, 3 ];
    const today = new Date();
    const initialContents = "안녕하세요, <b%권미정%b> 실장님!\n홈리에종에 의뢰하신 이경숙 고객님 관련 정보를 보내드립니다. <b%오프라인 엑스트라 토탈 스타일링 서비스%b>를 진행합니다.";
    const clientInfoWhereWhen = [
      "현장 미팅",
      "2021-09-02 (목) 오후 12:00시 정오",
      "주소",
      "외부 카페 (장소가 정해지면 전달드리겠습니다.)",
    ];
    let titleArea;
    let contentsArea;
    let topMargin;
    let leftMargin;
    let titleHeight;
    let titleSize;
    let titleBottom;
    let titlePaddingBottom;
    let fontSize;
    let sum;
    let titleDateVisualBottom;
    let contentsBetween;
    let contentsClientInfo;
    let clientInfoLeftWidth;
    let width;
    let wordsBetween0, wordsBetween1;
    let leftIndent;
    let words;
    let arrowTop, arrowWidth, arrowLeft;

    topMargin = 42;
    leftMargin = 50;
    titleSize = 35;
    titleBottom = 35;
    titlePaddingBottom = 18;
    titlePaddingLeft = 1;
    fontSize = 15;
    titleDateVisualBottom = 2;
    contentsBetween = 28;
    clientInfoLeftWidth = 340;
    wordsBetween0 = 6;
    wordsBetween1 = 18;
    leftIndent = 15;
    arrowTop = 5.5;
    arrowWidth = 8;
    arrowLeft = 1;

    sum = 0;
    for (let i of widthRatio) {
      sum += i;
    }

    board.style.paddingTop = String(topMargin) + ea;

    titleArea = createNode({
      mother: board,
      style: {
        marginLeft: String(leftMargin) + ea,
        paddingLeft: String(titlePaddingLeft) + ea,
        width: withOut((leftMargin * 2) + titlePaddingLeft, ea),
        borderBottom: "1px solid " + colorChip.gray3,
        marginBottom: String(titleBottom) + ea,
        paddingBottom: String(titlePaddingBottom) + ea,
        position: "relative",
      },
      children: [
        {
          text: title,
          style: {
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        },
        {
          text: dateToString(today),
          style: {
            position: "absolute",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            right: String(titlePaddingLeft) + ea,
            textAlign: "right",
            bottom: String(titlePaddingBottom - titleDateVisualBottom) + ea,
          }
        }
      ]
    });

    contentsArea = createNode({
      mother: board,
      style: {
        marginLeft: String(leftMargin) + ea,
        width: withOut(leftMargin * 2, ea),
      },
      children: [
        {
          text: initialContents,
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(1.6),
            marginBottom: String(contentsBetween) + ea,
          },
          bold: {
            fontWeight: String(600),
            color: colorChip.black,
          }
        }
      ]
    });

    contentsClientInfo = createNode({
      mother: contentsArea,
      style: {
        position: "relative",
        display: "block",
        width: String(100) + '%',
        textAlign: "right",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            left: String(leftIndent) + ea,
            width: String(clientInfoLeftWidth) + ea,
            height: String(100) + '%',
            verticalAlign: "top",
            textAlign: "left",
          }
        }
      ]
    });

    width = (contentsClientInfo.getBoundingClientRect().width - clientInfoLeftWidth - contentsBetween - leftIndent) / sum;

    contentsClientInfo.appendChild(mother.makeTable(matrix, { style: { width }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
    contentsClientInfo.children[1].style.display = "inline-block";
    contentsClientInfo.children[1].style.verticalAlign = "top";

    for (let i = 0; i < clientInfoWhereWhen.length; i++) {
      words = createNode({
        mother: contentsClientInfo.children[0],
        text: clientInfoWhereWhen[i],
        style: {
          position: "relative",
          fontSize: String(fontSize) + ea,
          fontWeight: String(i % 2 === 0 ? 600 : 400),
          color: colorChip.black,
          marginBottom: String(i % 2 === 1 ? wordsBetween1 : wordsBetween0) + ea,
        }
      });
      if (i % 2 === 0) {
        createNode({
          mother: words,
          mode: "svg",
          source: mother.returnArrow("right", colorChip.green),
          style: {
            position: "absolute",
            width: String(arrowWidth) + ea,
            left: String((-1 * leftIndent) + arrowLeft) + ea,
            top: String(arrowTop) + ea,
          }
        });
      }

    }








  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.requestIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const designer = this.designers.pick(desid);
  const expiredStringReturn = function () {
    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';
    if (today.getDay() !== 5 && today.getDay() !== 6) {
      today.setDate(today.getDate() + 1);
    } else {
      if (today.getDay() === 5) {
        today.setDate(today.getDate() + 3);
      } else {
        today.setDate(today.getDate() + 2);
      }
    }
    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(12) + "시";

    return expiredString;
  }
  let mother;
  let radius;
  let left, bottom;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 20, 20, 20, 6 %%>;
  left = <%% 40, 35, 35, 35, 0 %%>;
  bottom = <%% 40, 35, 35, 35, 7.2 %%>;
  margin = <%% 6, 6, 6, 6, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12.5, 12.5, 12.5, 3.8 %%>;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    style: {
      display: "block",
      position: "fixed",
      height: String(desktop ? motherHeight : (bottom + (radius * 2))) + ea,
      width: String(desktop ? grayBarWidth : (bottom + (radius * 2))) + ea,
      left: desktop ? String(0) : "",
      right: desktop ? "" : String(0),
      bottom: String(belowHeight) + ea,
      background: desktop ? colorChip.gray0 : "transparent",
      zIndex: String(2),
    }
  });

  nodeArr = createNodes([
    {
      mother,
      style: {
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnHamburger(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: "calc(50% - " + String(radius * 0.45) + ea + ")",
        top: String(iconTop) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnAinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(15) + ea,
        left: String(12.5) + ea,
        top: String(11) + ea,
      }
    },
    {
      mother,
      style: {
        display: ((instance.middleMode && mobile) ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnDecrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(9.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnMinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(16.5) + ea,
        left: String(11.5) + ea,
        top: String(11.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: ((instance.middleMode && mobile) ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnIncrease(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(radius * 0.9) + ea,
        left: String(11.5) + ea,
        top: String(iconTop - 1.5) + ea,
      }
    },
    {
      mother,
      style: {
        display: (instance.middleMode ? "none" : "block"),
        position: "absolute",
        width: String(radius * 2) + ea,
        height: String(radius * 2) + ea,
        bottom: String(bottom + (radius * 2) + margin) + ea,
        left: String(left + (radius * 2) + margin + (radius * 2) + margin) + ea,
        background: color,
        borderRadius: String(radius * 2) + ea,
        cursor: "pointer",
      }
    },
    {
      mother: -1,
      mode: "svg",
      source: this.mother.returnRinitial(colorChip.whiteIcon),
      style: {
        position: "absolute",
        width: String(14) + ea,
        left: String(13.5) + ea,
        top: String(10.5) + ea,
      }
    },
  ]);

  listIcon = nodeArr[0];
  aInitialIcon = nodeArr[2];
  previousIcon = nodeArr[4];
  mInitialIcon = nodeArr[6];
  nextIcon = nodeArr[8];
  rInitialIcon = nodeArr[10];

  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  if (!this.middleMode) {

    listIcon.addEventListener("click", function (e) {
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
    });

    previousIcon.addEventListener("click", function (e) {
      let previousDesid, boo, thisStandard;
      previousDesid = desid;
      do {
        previousDesid = instance.designers.previous(previousDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === previousDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      scrollTo(document.querySelector(".totalMother").firstChild, thisStandard);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.checkListDetailLaunching(previousDesid);
      } else {
        instance.reportDetailLaunching(previousDesid);
      }
    });

    nextIcon.addEventListener("click", function (e) {
      let nextDesid, boo, thisStandard;
      nextDesid = desid;
      do {
        nextDesid = instance.designers.next(nextDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === nextDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      scrollTo(document.querySelector(".totalMother").firstChild, thisStandard);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.checkListDetailLaunching(nextDesid);
      } else {
        instance.reportDetailLaunching(nextDesid);
      }
    });

  } else if (desktop) {

    listIcon.addEventListener("click", function (e) {
      let num = designer.information.did.replace(/[^0-9]/g, '');
      let id;
      id = '';
      for (let i = 0; i < 3 - num.length; i++) {
        id += '0';
      }
      id += num;
      blankHref(FRONTHOST + "/desdetail.php?qqq=de" + id);
    });

    previousIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index - 1] === undefined ? targets[targets.length - 1] : targets[index - 1];
        target.click();
      }
    });

    nextIcon.addEventListener("click", function (e) {
      const targets = document.querySelectorAll(".leftMenus");
      if (targets.length > 0) {
        let index, target;
        index = null;
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].getAttribute("toggle") === "on") {
            index = i;
          }
        }
        if (index === null) {
          throw new Error("invaild index");
        }
        target = targets[index + 1] === undefined ? targets[0] : targets[index + 1];
        target.click();
      }
    });

  }

  rInitialIcon.addEventListener("click", function (e) {
    instance.reportDetailLaunching(desid);
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 문서가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].docs);
      }
    } catch (e) {
      console.log(e);
    }
  });

  mInitialIcon.addEventListener("contextmenu", async function (e) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const links = await GeneralJs.ajaxJson({
        mode: "read",
        db: "console",
        collection: "folderDesigner",
        whereQuery: { desid }
      }, "/generalMongo", { equal: true });
      if (links.length === 0) {
        alert("만들어진 폴더가 없습니다!");
      } else {
        GeneralJs.blankHref(links[0].drive);
      }
    } catch (e) {
      console.log(e);
    }
  });

  aInitialIcon.addEventListener("click", function (e) {
    const expiredString = expiredStringReturn();
    if (window.confirm(designer.designer + " 디자이너님에게 알림톡을 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {
      GeneralJs.ajaxJson({
        method: "designerCheckList",
        name: designer.designer,
        phone: designer.information.phone,
        option: {
          date: expiredString,
          desid: desid,
          host: "ADDRESS[homeinfo(ghost)]"
        }
      }, "/alimTalk").then((json) => {
        let middleDate, deadDate;
        if (json.message !== "success") {
          throw new Error("alimTalk error");
        } else {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
    }
  });

  aInitialIcon.addEventListener("contextmenu", async function (e) {
    e.preventDefault();
    e.stopPropagation();
    const expiredString = expiredStringReturn();
    if (window.confirm("모든 디자이너들에게 알림톡을 모두 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {

      const targetDesigners = instance.designers.returnFriendDesigners();
      for (let d of targetDesigners) {
        await GeneralJs.ajaxJson({
          method: "designerCheckList",
          name: d.designer,
          phone: d.information.phone,
          option: {
            date: expiredString,
            desid: d.desid,
            host: "ADDRESS[homeinfo(ghost)]"
          }
        }, "/alimTalk");
      }
    } else {
      instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
    }
  });

}

DesignerJs.prototype.requestView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true });
    const projects = await ajaxJson({
      noFlat: true,
      whereQuery: { desid: { $regex: "^d" } }
    }, "/getProjects", { equal: true });
    const clients = await ajaxJson({
      noFlat: true,
      whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
    }, "/getClients", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let width, height;
    let boxNumber;
    let status;
    let searchInput;
    let standardBar_mother;
    let style;
    let childrenLength, children;
    let motherHeight;
    let searchResult;

    this.designers = new Designers(designers);
    this.designers.setProjects(projects);
    this.designers.setClients(clients);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.mode = "request";
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            document.getElementById("totalcontents").removeChild(document.querySelector(".totalFather"));
            instance.totalFather = null;
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
          }
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            // instance.checkListDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              // instance.checkListDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
      // searchInput.addEventListener("contextmenu", this.checkListDetailSearchBox());
    }

    //standard doms event
    standardBar_mother = standardBar.cloneNode(false);
    style = {
      position: "fixed",
      height: withOut(100, belowHeight + motherHeight, ea),
      overflow: "scroll",
    };
    for (let i in style) {
      standardBar_mother.style[i] = style[i];
    }
    totalMother.insertBefore(standardBar_mother, standardBar);
    standardBar_mother.appendChild(standardBar);
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
      this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
      this.standardDoms[i].style.transition = "all 0s ease";
      this.standardDoms[i].addEventListener("click", (e) => {
        // instance.checkListDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
      });
      children = this.standardDoms[i].children;
      childrenLength = children.length;
      for (let j = 0; j < childrenLength; j++) {
        children[j].style.color = "inherit";
        children[j].style.transition = "all 0s ease";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    //launching
    this.requestDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
