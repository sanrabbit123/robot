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
      "return ('홈리에종 계약금 결제 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 계약금 결제 페이지입니다.');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "firstPayment",
  "hangul": "홈리에종 계약금 결제",
  "route": [
    "firstPayment"
  ]
} %/%/g

const FirstPaymentJs = function () {
  this.mother = new GeneralJs();
}

FirstPaymentJs.binaryPath = FRONTHOST + "/middle/style";

FirstPaymentJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { initAreaClassName } = this;
  try {
    let minusLeft;
    let firstBase;
    let leftRightWidth;
    let firstBasePaddingBottom;
    let subTitleSize, subTitleWeight, subTitleMarginTop;
    let buttonMarginTop;
    let buttonWidth;
    let buttonHeight;
    let buttonSize;
    let buttonTextTop;
    let buttonWeight;
    let firstBasePaddingTop;
    let mobileLeftPaddingVisual;
    let titleSize, titleWeight, titleVisualTop, titleVisualLeft;
    let titleLineHeight;
    let descriptionSize, descriptionLineHeight;
    let descriptionMarginTop;
    let mainImageTop, mainImageHeight;
    let pointOpacity;
    let descriptionPointBoldPaddingLeft;
    let descriptionPointBoldPaddingTop;
    let descriptionPointBoldPaddingBottom;
    let descriptionPointBoldMargin;
    let buttonBetween;
    let mobileImageRight;
    let mobileSubImageMarginTop;
    let description;
    let blanketHeight, blanketVisualTop, blanketOpacity, blanketMargin;
    let mainTitleText;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 10 %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% (isMac() ? 3 : 4), (isMac() ? 2 : 3), (isMac() ? 1 : 2), (isMac() ? 1 : 1), 0.5 %%>;

    buttonMarginTop = <%% 165, 160, 132, 110, 3.6 %%>;
    buttonWidth = <%% 190, 190, 186, 168, 31 %%>;
    buttonHeight = <%% 32, 32, 30, 28, 9 %%>;
    buttonSize = <%% 14, 14, 13, 12, 3.5 %%>;
    buttonTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
    buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
    buttonBetween = <%% 8, 8, 7, 6, 1 %%>;

    titleSize = <%% 50, 48, 43, 36, 7 %%>;
    titleWeight = <%% 500, 500, 500, 500, 500 %%>;
    titleVisualTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.5 %%>;
    titleVisualLeft = <%% 2, 2, 2, 2, -0.5 %%>;
    titleLineHeight = <%% 1.1, 1.1, 1.1, 1.1, 1.07 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 338, 314, 39 %%>;

    descriptionSize = <%% 15, 14, 14, 13, 3.2 %%>;
    descriptionLineHeight = <%% 1.9, 1.9, 1.9, 1.8, 1.8 %%>;

    mobileLeftPaddingVisual = 1;

    descriptionMarginTop = <%% 40, 40, 36, 30, 6.4 %%>;

    descriptionPointBoldPaddingLeft = <%% 8, 8, 8, 8, 1.6 %%>;
    descriptionPointBoldPaddingTop = <%% (isMac() ? 2 : 4), (isMac() ? 2 : 4), (isMac() ? 2 : 3), (isMac() ? 2 : 3), 0.4 %%>;
    descriptionPointBoldPaddingBottom = <%% (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), (isMac() ? 4 : 3), 0.8 %%>;
    descriptionPointBoldMargin = <%% 2, 2, 2, 2, 1 %%>;

    blanketHeight = <%% 48, 40, 40, 40, 4 %%>;
    blanketVisualTop = <%% (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), (isMac() ? 1 : 0), 1 %%>;
    blanketOpacity = <%% 0.3, 0.3, 0.3, 0.3, 0.3 %%>;
    blanketMargin = <%% 34, 32, 30, 30, 2 %%>;

    mainTitleText = (desktop ? "Payment\n<u%and%u>\nFirst meeting<b%.%b>" : "Payment\n<u%and%u>\nFirst meeting<b%.%b>");

    if (desktop && window.innerHeight > 1100) {
      titleSize = <%% 57, 51, 43, 36, 7 %%>;
      subTitleSize = <%% 19, 18, 17, 15, 3.6 %%>;
      firstBasePaddingTop = <%% 80, 48, 30, 28, 50 %%>;
      firstBasePaddingBottom = <%% 240, 210, 160, 120, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    description = [
      desktop ? "홈리에종의 서비스 진행을 위해서는 다음 큐레이션 과정이 필요합니다." : "홈리에종 서비스 진행을 위해선 큐레이션 과정이 필요합니다.",
      desktop ? "서비스 신청서를 모두 작성 후, <b%디자이너의 1:1 맞춤 상담%b>을 받아보세요!" : "신청서를 모두 작성 후, <b%디자이너 1:1 상담%b>을 받아보세요!"
    ];

    firstBase = createNode({
      mother: baseTong,
      class: [ initAreaClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        paddingTop: String(firstBasePaddingTop) + ea,
        flexDirection: "column",
        paddingBottom: String(firstBasePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: desktop ? String((-1 * baseTop) + naviHeight) + ea : "calc(calc(" + String(naviHeight - naviHeight) + "px" + ") - " + String(baseTop) + ea + ")",
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.darkDarkBlack,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: desktop ? withOut(1 * ((-1 * baseTop) + naviHeight), ea) : String(185) + ea,
        }
      }
    });
  
    // main title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: desktop ? "start" : "center",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        paddingLeft: mobile ? String(mobileLeftPaddingVisual) + ea : "",
      },
      children: [
        {
          text: mainTitleText,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.blueLight,
            fontFamily: "mont",
            textAlign: "center",
            top: desktop ? String(titleVisualTop) + ea : "",
            left: desktop ? String(titleVisualLeft) + ea : "",
            lineHeight: String(titleLineHeight),
          },
          bold: {
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.blueLight,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          },
          under: {
            fontSize: String(titleSize - 10) + ea,
            fontWeight: String(titleWeight),
            color: colorExtended.blueLight,
            fontFamily: "mont",
            opacity: String(pointOpacity),
          },
        }
      ]
    });

    // sub title
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginTop: String(subTitleMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      },
      children: [
        {
          text: "서비스 상세 큐레이션",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ]
    });

    // white box
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(600) + ea,
        marginTop: String(100) + ea,
        background: colorExtended.white,
        borderRadius: String(10) + "px",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
      }
    });

  } catch (e) {
    console.log(e);
  }
}

FirstPaymentJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics, colorExtended } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;

  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;

  if (desktop) {
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "aspirantPageResize",
          data: {
            delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
            date: new Date(),
          },
        }).then(() => {
          window.location.reload();
          instance.resizeStack = 0;
        }).catch((err) => {
          console.log(err);
        });
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) {
          reEvent.apply(context, args);
        }
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  }
}

FirstPaymentJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
    let cliid;
    let clients, client;

    this.whiteConsultingBoxClassName = "whiteConsultingBoxClassName";

    if (getObj.cliid !== undefined) {
      cliid = getObj.cliid;
    } else {
      window.alert("잘못된 접근입니다!");
      throw new Error("invaild get object");
    }

    clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
    if (clients.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];
    this.client = client;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "firstPayment",
      client: null,
      base: {
        instance: this,
        binaryPath: FirstPaymentJs.binaryPath,
        subTitle: (instance.client.name + " 고객님 계약금 결제"),
        secondBackground: false,
        backgroundType: 9,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          await instance.insertInitBox();
          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);

        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FirstPaymentJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0.3s ease}");

    GeneralJs.setQueue(() => {
      window.scrollTo(0, 0);
    }, 400);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FirstPaymentJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
