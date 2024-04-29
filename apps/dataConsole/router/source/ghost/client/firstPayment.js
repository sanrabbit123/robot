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

class StylingBill {
  constructor(json) {
    if (typeof json !== "object") {
      throw new Error("invaild input");
    }
    for (let i in json) {
      this[i] = json[i];
    }
  }
}

const FirstPaymentJs = function () {
  this.mother = new GeneralJs();
}

FirstPaymentJs.binaryPath = "/middle/payment";

FirstPaymentJs.prototype.tableStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;

  const title = "홈스타일링 의뢰서";
  const initialContents = "안녕하세요, <b%" + designer.designer + "%b> 실장님!\n홈리에종에 의뢰하신 " + client.name +  " 고객님 관련 정보를 보내드립니다. <b%" + GeneralJs.serviceParsing(project.service) + "%b>를 진행합니다.";
  const emptyReload = (originalArr, reloadArr) => {
    if (originalArr.map((a) => { return a.trim(); }).filter((a) => { return a !== ""; }).length > 0) {
      return originalArr;
    } else {
      return reloadArr;
    }
  }
  const mainContents = [
    {
      title: "현장 미팅",
      className: "mainContents_when",
      position: "request.about.when",
      contents: emptyReload(projectHistory.request.about.when, [ dateToString(project.process.contract.meeting.date, true, true) ]),
      spread: true,
    },
    {
      title: "현장 주소",
      className: "mainContents_where",
      position: "request.about.where",
      contents: emptyReload(projectHistory.request.about.where, [ client.requests[requestNumber].request.space.address ]),
      spread: true,
    },
    {
      title: "현장 관련",
      className: "mainContents_site",
      position: "request.about.site",
      contents: emptyReload(projectHistory.request.about.site, [ "현장 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "시공 관련",
      className: "mainContents_construct",
      position: "request.about.construct",
      contents: emptyReload(projectHistory.request.about.construct, [ "시공 관련 상세 사항 없음" ]),
      spread: false,
    },
    {
      title: "스타일링 관련",
      className: "mainContents_styling",
      position: "request.about.styling",
      contents: emptyReload(projectHistory.request.about.styling, [ "스타일링 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "예산 관련",
      className: "mainContents_budget",
      position: "request.about.budget",
      contents: emptyReload(projectHistory.request.about.budget, [ "예산 관련 상세 사항 없음" ]),
      spread: true,
    },
    {
      title: "기타 사항",
      className: "mainContents_progress",
      position: "request.about.progress",
      contents: emptyReload(projectHistory.request.about.progress, [ "기타 관련 상세 사항 없음" ]),
      spread: false,
    }
  ];
  const pictureContents = "고객님이 선택한 사진";
  const pictureContentsSite = "고객님의 현장 사진";
  const pictureContentsPrefer = "고객님의 선호 사진";
  const pictures = clientHistory.curation.image;
  const matrix = [
    [ "고객 정보", "", "공간 정보", "" ],
    [ (desktop ? "고객명" : "성함"), projectHistory.request.client.name, (desktop ? "계약 형태" : "계약"), projectHistory.request.space.contract ],
    [ "연락처", projectHistory.request.client.phone, (desktop ? "사전 점검일" : "사전점검"), projectHistory.request.space.precheck ],
    [ (desktop ? "가족 구성원" : "가족"), projectHistory.request.client.family, (desktop ? "집 비는 날" : "비는 날"), projectHistory.request.space.empty ],
    [ "주소", projectHistory.request.client.address, (desktop ? "입주 예정일" : "입주일"), projectHistory.request.space.movein ],
    [ "", "", (desktop ? "특이 사항" : "기타"), projectHistory.request.space.special ],
    [ "예산", projectHistory.request.client.budget, (desktop ? "공간구성" : "구성"), projectHistory.request.space.composition ],
    [ "서비스 정보", "", "고객 요청", "" ],
    [ "서비스", projectHistory.request.service.service, projectHistory.request.client.etc, "" ],
    [ (desktop ? "선호 컨셉" : "컨셉"), projectHistory.request.service.concept, "", "" ],
    [ "시공", projectHistory.request.service.construct, "", "" ],
    [ "스타일링", projectHistory.request.service.styling, "", "" ],
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
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
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
  const widthRatio = desktop ? [ 1, 3, 1, 3 ] : [ 1, 2, 1, 2 ];

  return {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  };
}

FirstPaymentJs.prototype.billWordings = function () {
  const instance = this;
  const { client, designer, project, media, bill, requestNumber } = this;
  const { dateToString, autoComma, colorExtended, serviceParsing, objectDeepCopy } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const { analytics, request } = client.requests[this.clientRequestNumber];
  const spendDates = (Number(String(analytics.response.service.serid).split('_')[1].replace(/[^0-9]/gi, '')) + 1) * 15;
  const serviceName = serviceParsing().name;
  let start, end;
  let wordings;
  let tempArr;
  let sum0, sum1;
  let between;

  wordings = {
    button: [ "카드 결제", "계좌 이체" ],
    pannel: [
      {
        name: "계좌 이체시",
        children: [
          "기업 049-085567-04-022",
          "(주)홈리에종"
        ]
      },
      {
        name: "카드 결제시",
        children: [
          "카드 결제창",
        ]
      },
    ],
    account: {
      name: "(주)홈리에종",
      number: "기업 049-085567-04-022",
    },
    notice: {
      title: "* 주의 사항",
      business: [
        "계약서를 사업자명으로 작성하신 경우에만 사업자 등록번호로 세금 계산서 발행이 가능하며, 그렇지 않을 경우 신청자의 핸드폰 번호로 현금 영수증이 발행됩니다.",
        "세금 계산서 발행을 한 경우에도, 입금자명을 신청자명으로 보내 주셔야 합니다. 그렇지 않을 경우, 입금 확인에 문제가 생길 수 있습니다."
      ],
      cash: [
        "입금자명을 반드시 신청자명으로 보내 주셔야 합니다. 그렇지 않을 경우, 입금 확인에 문제가 생길 수 있습니다."
      ]
    },
    request: objectDeepCopy(bill.requests[requestNumber]),
  };

  this.request.name = bill.requests[requestNumber].name;
  this.request.amount = bill.requests[requestNumber].items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0);

  return wordings;
}

FirstPaymentJs.prototype.meetingWordings = function (service) {
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
          "현장 미팅 안내",
        ],
        subTitle: [
          "현장 미팅 시간",
          "현장 미팅 주소"
        ],
        contents: [
          "디자이너를 직접 만나 함께 <b%현장 상태를 확인%b>하고,",
          "고객님의 <b%취향과 니즈를 전달%b>하여, 앞으로 진행하게 될",
          "홈스타일링에 대한 <b%전체적인 방향%b>을 이야기하게 됩니다.",
        ],
        image: [
          "/designerMeeting.jpg",
          "/designerMeetingb.jpg",
          "/designerMeetingc.jpg",
        ]
      };

      this.wordings.table = {};
      this.wordings.table.title = [ "기본 안내" ];
      this.wordings.table.subTitle = [
        "현장 미팅 주소",
        "현장 미팅 시간",
        "예상 기간"
      ];
      this.wordings.table.contents = [
        "현장 미팅 전, <b%디자이너에게 공유%b>할 고객님의 기본 정보입니다.",
        "<b%잘못된 정보가 있을 시%b> 홈리에종에 말씀해주시길 바랍니다.",
      ];
      this.wordings.table.table = instance.tableStatic(instance.designer, instance.project, instance.client, instance.clientHistory, instance.projectHistory, instance.clientRequestNumber);

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

      this.wordings.photo = {};
      this.wordings.photo.title = [ "전송된 사진" ];

    }

    get initWordings() {
      return this.wordings.init;
    }

    get tableWordings() {
      return this.wordings.table;
    }

    get checkWordings() {
      return this.wordings.check;
    }

    get photoWordings() {
      return this.wordings.photo;
    }

  }
  return new StyleCurationWordings();
}

FirstPaymentJs.prototype.paymentEvent = function (motherMethod) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, ajaxJson, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, autoComma } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, thisBill } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  return async function (e) {
    try {
      if (motherMethod === "account") {
        if (!window.confirm("계좌 이체를 위한 안내를 받으시겠습니까?")) {
          return;
        }
      }
      const { pluginScript, formValue } = await ajaxJson({
        cliid: instance.cliid,
        kind: instance.class,
        desid: instance.desid,
        proid: instance.proid,
        method: instance.method,
        mode: "script",
        name: instance.request.name,
        price: instance.request.amount,
        buyerName: instance.client.name,
        buyerPhone: instance.client.phone,
        buyerEmail: instance.client.email,
        currentPage: window.location.protocol + "//" + window.location.host,
        gopaymethod: (/card/gi.test(motherMethod) ? "Card" : (/vbank/gi.test(motherMethod) ? "VBank" : "Account")),
        device: (desktop ? "desktop" : "mobile"),
        requestNumber: String(instance.requestNumber),
        bilid: instance.bill.bilid,
      }, BACKHOST + "/inicisPayment");
      const formMother = document.createElement("DIV");
      const form = document.createElement("FORM");
      let value, formId, plugin;
      let mobileInisisInfo;
      let cashInput;
      let businessInput;
      let cashSubmitEvent;

      formId = "form" + String((new Date()).valueOf());
      form.id = formId;
      form.style.display = "none";
      formMother.style.display = "none";
      document.body.appendChild(formMother);
      formMother.appendChild(form);

      if (!/vbank/gi.test(motherMethod) && !/card/gi.test(motherMethod)) {
        window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mode=complete&hash=" + pluginScript + "&accountinfo=" + "true";
      } else {

        if (desktop) {
          if (/vbank/gi.test(motherMethod)) {

            for (let name in formValue) {
              value = String(formValue[name]);
              createNode({
                mother: form,
                mode: "input",
                attribute: [ { name }, { value } ],
                style: { display: "none" }
              });
            }
            plugin = new Function(`${pluginScript}\n\nINIStdPay.pay(${formId});`);
            plugin();

          } else if (/card/gi.test(motherMethod)) {

            if (typeof GeneralJs.stacks.messageCancelEvent === "function") {
              window.removeEventListener("message", GeneralJs.stacks.messageCancelEvent);
            }
            plugin = new Function(pluginScript);
            plugin();
            window.IMP.init("imp71921105");
            window.IMP.request_pay({
              pg: "inicis",
              pay_method: "card",
              merchant_uid: formValue.oid,
              name: formValue.goodname,
              amount: Math.floor(instance.request.amount),
              buyer_email: instance.client.email,
              buyer_name: instance.client.name,
              buyer_tel: instance.client.phone,
            }, (rsp) => {
              try {
                if (typeof rsp.status === "string" && /paid/gi.test(rsp.status)) {
                  window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mobilecard=true&mid=" + formValue.mid + "&oid=" + formValue.oid + "&imp_uid=" + rsp.imp_uid + "&merchant_uid=" + formValue.oid + "&imp_success=true&request=" + String(instance.requestNumber);
                } else {
                  window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
                }
              } catch (e) {
                console.log(e);
                window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
              }
            });

          }

        } else {

          if (/vbank/gi.test(motherMethod)) {
            form.setAttribute("method", "post");
            form.setAttribute("accept-charset", "euc-kr");
            mobileInisisInfo = {
              P_INI_PAYMENT: "VBANK",
              P_MID: formValue.mid,
              P_OID: formValue.oid,
              P_AMT: Math.floor(instance.request.amount),
              P_GOODS: formValue.goodname,
              P_UNAME: instance.client.name,
              P_NEXT_URL: formValue.returnUrl,
              P_NOTI_URL: PYTHONHOST.replace(/\:3000/gi, '') + "/webHookVAccount.php",
              P_HPP_METHOD: String(1),
              P_CHARSET: "utf8",
              P_RESERVED: "vbank_receipt=Y",
              P_NOTI: formValue.goodname + "__split__" + formValue.mid + "__split__" + formValue.returnUrl,
            };
            for (let name in mobileInisisInfo) {
              value = String(mobileInisisInfo[name]);
              createNode({
                mother: form,
                mode: "input",
                attribute: [ { name }, { value } ],
                style: { display: "none" }
              });
            }
            form.action = "https://mobile.inicis.com/smart/payment/";
            form.target = "_self";
            form.submit();

          } else if (/card/gi.test(motherMethod)) {
            if (typeof GeneralJs.stacks.messageCancelEvent === "function") {
              window.removeEventListener("message", GeneralJs.stacks.messageCancelEvent);
            }
            plugin = new Function(pluginScript);
            plugin();
            window.IMP.init("imp71921105");
            window.IMP.request_pay({
              pg: "inicis",
              pay_method: "card",
              merchant_uid: formValue.oid,
              name: formValue.goodname,
              amount: Math.floor(instance.request.amount),
              buyer_email: instance.client.email,
              buyer_name: instance.client.name,
              buyer_tel: instance.client.phone,
              m_redirect_url: window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search + "&mobilecard=true&mid=" + formValue.mid + "&oid=" + formValue.oid + "&request=" + String(instance.requestNumber),
            }, (rsp) => {});
          }

        }

      }

    } catch (e) {
      console.log(e);
      await ajaxJson({ message: "FirstPaymentJs.insertPaymentBox.paymentEvent : " + e.message }, BACKHOST + "/errorLog");
    }
  }
}

FirstPaymentJs.prototype.insertInitBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, autoComma } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, thisBill } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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
    let mainIllustLeft, mainIllustRight;
    let mainIllustMargin, mainIllustTop, mainIllustWidth;
    let blueBoxMarginTop;
    let whiteAreaWidth;
    let whiteBase, blueBase;
    let boxInnerMargin;
    let titleSquareWidth;
    let titleSquareLeftIndent;
    let titleSquareTop;
    let whiteTitleEngSize, whiteTitleEngWeight;
    let whiteTitleKorSize, whiteTitleKorWeight, whiteTitleKorLightWeight;
    let whiteTitleKorTextTop;
    let whiteTitleBarMargin;
    let paymentMatrix;
    let matrixTong;
    let num;
    let matrixTongMarginTop, matixTongVisualBottom;
    let matrixFactorHeight, matrixLineWeight;
    let factorTitleWidth;
    let factorSize, factorWeight, factorBoldWeight, factorTextTop;
    let factorTitleHeightPercentage;
    let totalBoxHeight;
    let vatWording, finalWording;
    let buttonBase;
    let payButtonBetween;
    let payButtonHeight;
    let payButtonContents;
    let buttonBaseMarginTop;
    let payTextSize, payTextWeight, payTextTextTop;
    let payButtonWidth;
    let totalWordingTextTop, totalWordingSize, totalWordingDotSize, totalWordingDotOpacity;
    let vatSize, vatWeight, vatTextTop;
    let finalAmountTextTop, finalAmountSize, finalAmountWeight;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 10 %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% 4, 4, 4, 4, 4 %%>;

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
    titleLineHeight = <%% 1, 1, 1, 1, 1 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 330, 314, 39 %%>;

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
      titleSize = <%% 57, 47, 40, 34, 7 %%>;
      subTitleSize = <%% 19, 17, 16, 14, 3.6 %%>;
      firstBasePaddingTop = <%% 48, 45, 30, 28, 50 %%>;
      firstBasePaddingBottom = <%% 160, 160, 120, 100, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    mainIllustLeft = <%% (FirstPaymentJs.binaryPath + "/mainillust_left.png"), (FirstPaymentJs.binaryPath + "/mainillust_left.png"), (FirstPaymentJs.binaryPath + "/mainillust_left.png"), (FirstPaymentJs.binaryPath + "/mainillust_left.png"), (FirstPaymentJs.binaryPath + "/mainillust_left.png") %%>;
    mainIllustRight = <%% (FirstPaymentJs.binaryPath + "/mainillust_right.png"), (FirstPaymentJs.binaryPath + "/mainillust_right.png"), (FirstPaymentJs.binaryPath + "/mainillust_right.png"), (FirstPaymentJs.binaryPath + "/mainillust_right.png"), (FirstPaymentJs.binaryPath + "/mainillust_right.png") %%>;

    mainIllustMargin = <%% 90, 70, 56, 50, 70 %%>;
    mainIllustTop = <%% -340, -296, -260, -212, -340 %%>;
    mainIllustWidth = <%% 275, 240, 210, 170, 240 %%>;

    blueBoxMarginTop = <%% 114, 82, 72, 52, 114 %%>;
    whiteAreaWidth = <%% 1000, 710, 600, 460, 80 %%>;

    boxInnerMargin = <%% 45, 40, 30, 25, 45 %%>;

    titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
    titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
    titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

    whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
    whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
    whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
    whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
    whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
    whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
    whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;

    matrixTongMarginTop = <%% 24, 24, 18, 16, 1 %%>;
    matixTongVisualBottom = <%% 1, 1, 1, 1, 1 %%>;

    matrixFactorHeight = <%% 52, 45, 40, 32, 52 %%>;
    matrixLineWeight = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;

    factorTitleWidth = <%% 240, 160, 140, 120, 240 %%>;
    factorSize = <%% 15, 14, 13, 12, 15 %%>;
    factorWeight = <%% 400, 400, 400, 400, 400 %%>;
    factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    factorTextTop = <%% -1, -1, -1, -1, -1 %%>;

    factorTitleHeightPercentage = <%% 12, 12, 12, 12, 12 %%>;

    totalBoxHeight = <%% 467, 415, 356, 296, 445 %%>;
    payButtonBetween = <%% 10, 10, 8, 6, 10 %%>;
    payButtonHeight = <%% 48, 42, 38, 34, 48 %%>;
    payButtonWidth = <%% 140, 120, 108, 100, 140 %%>;

    buttonBaseMarginTop = <%% 25, 25, 20, 18, 25 %%>;

    payTextSize = <%% 18, 17, 15, 14, 18 %%>;
    payTextWeight = <%% 800, 800, 800, 800, 800 %%>;
    payTextTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;

    totalWordingTextTop = <%% 4, 4, 4, 4, 4 %%>;
    totalWordingSize = <%% 23, 21, 18, 16, 23 %%>;
    totalWordingDotSize = <%% 30, 24, 22, 18, 30 %%>;
    totalWordingDotOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    vatSize = <%% 14, 13, 12, 11, 14 %%>;
    vatWeight = <%% 900, 900, 900, 900, 900 %%>;
    vatTextTop = <%% -9, -9, -9, -9, -9 %%>;

    finalAmountTextTop = <%% -2, -2, -2, -2, -2 %%>;
    finalAmountSize = <%% 38, 36, 32, 29, 38 %%>;
    finalAmountWeight = <%% 800, 800, 800, 800, 800 %%>;

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    payButtonContents = [
      {
        title: "계좌 이체",
      },
      {
        title: "카드 결제",
      },
    ];

    paymentMatrix = [
      [ "품명", "디자인비" ],
      [ "단가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.unit.price }, 0)) + "원" ],
      [ "수량", String(thisBill.request.items.reduce((acc, curr) => { return acc + curr.unit.number }, 0)) ],
      [ "공급가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.supply }, 0)) + "원" ],
      [ "VAT", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.vat }, 0)) + "원" ],
      [ "소비자가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원" ],
    ];
    
    vatWording = "VAT 포함";
    finalWording = autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원";

    firstBase = createNode({
      mother: baseTong,
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
          text: "현장 미팅 안내 및 계약금 결제",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ],
    });

    // payment box
    [ , , whiteBase, blueBase ] = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0, ea),
        height: String(totalBoxHeight) + ea,
        marginTop: String(blueBoxMarginTop) + ea,
        background: colorExtended.mainBlue,
        borderRadius: String(10) + "px",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
      },
      children: [
        {
          mode: "img",
          attribute: {
            src: mainIllustLeft,
          },
          style: {
            display: "flex",
            position: "absolute",
            left: String(mainIllustMargin) + ea,
            top: String(mainIllustTop) + ea,
            width: String(mainIllustWidth) + ea,
            zIndex: String(1),
          }
        },
        {
          mode: "img",
          attribute: {
            src: mainIllustRight,
          },
          style: {
            display: "flex",
            position: "absolute",
            right: String(mainIllustMargin) + ea,
            top: String(mainIllustTop) + ea,
            width: String(mainIllustWidth) + ea,
            zIndex: String(1),
          }
        },
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: String(whiteAreaWidth) + ea,
            background: colorExtended.gray0,
            borderTopLeftRadius: String(10) + "px",
            borderBottomLeftRadius: String(10) + "px",
            borderTopRightRadius: String(0) + "px",
            borderBottomRightRadius: String(0) + "px",
            overflow: "hidden",
            justifyContent: "start",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: withOut(whiteAreaWidth, ea),
            background: colorExtended.transparent,
            borderTopLeftRadius: String(0) + "px",
            borderBottomLeftRadius: String(0) + "px",
            borderTopRightRadius: String(10) + "px",
            borderBottomRightRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "end",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
      ]
    }).children;

    // white box
    createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.blueLight,
            opacity: String(0.8),
          }
        },
        {
          text: "Summary",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;결제 정보",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    matrixTong = createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(boxInnerMargin * 2, ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        marginTop: String(matrixTongMarginTop) + ea,
        marginBottom: String(matixTongVisualBottom) + ea,
      },
    });
    num = 0;
    for (let [ title, value ] of paymentMatrix) {
      createNode({
        mother: matrixTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: withOut(0, ea),
          height: String(matrixFactorHeight) + ea,
          background: colorExtended.transparent,
          borderTop: String(num === 0 ? matrixLineWeight : 0) + "px solid " + (num === 0 ? colorExtended.black : colorExtended.gray4),
          borderBottom: String(num === 0 || num === paymentMatrix.length - 1 ? matrixLineWeight : 1) + "px solid " + (num === 0 || num === paymentMatrix.length - 1 ? colorExtended.black : colorExtended.gray4),
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: String(factorTitleWidth) + ea,
              height: withOut(factorTitleHeightPercentage * 2, '%'),
              boxSizing: "border-box",
              borderRight: "1px solid " + colorExtended.gray4,
            },
            child: {
              text: title,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorExtended.black,
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(factorTitleWidth, ea),
              height: withOut(0, ea),
              boxSizing: "border-box",
            },
            child: {
              text: value,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorExtended.black,
              }
            }
          },
        ]
      });
      num++;
    }

    // ==================================================================================================================================================================================

    // blue box
    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "absolute",
        top: String(boxInnerMargin) + ea,
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        left: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          text: "Total",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;금액 합계",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "end",
        alignItems: "center",
        flexDirection: "row",
        top: String(totalWordingTextTop) + ea,
      },
      children: [
        {
          text: "TOTAL<b%.%b>",
          style: {
            fontSize: String(totalWordingSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.darkBlack,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          },
          bold: {
            fontSize: String(totalWordingDotSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.darkBlack,
            opacity: String(totalWordingDotOpacity),
          }
        },
      ]
    });

    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "end",
        alignItems: "end",
        flexDirection: "row",
      },
      children: [
        {
          text: vatWording,
          style: {
            fontSize: String(vatSize) + ea,
            fontWeight: String(vatWeight),
            top: String(vatTextTop) + ea,
            color: colorExtended.blueDim,
            display: "inline-block",
            position: "relative",
          }
        },
        {
          text: finalWording,
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(finalAmountTextTop) + ea,
            fontSize: String(finalAmountSize) + ea,
            fontWeight: String(finalAmountWeight),
            color: colorExtended.white,
            display: "inline-block",
            position: "relative",
          },
        },
      ]
    });

    // ==================================================================================================================================================================================

    // buttons
    buttonBase = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "end",
        width: withOut(0, ea),
        height: String(payButtonHeight) + ea,
        marginTop: String(buttonBaseMarginTop) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
      }
    });

    createNode({
      mother: buttonBase,
      event: {
        click: instance.paymentEvent("account"),
      },
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: String(payButtonWidth) + ea,
        height: String(payButtonHeight) + ea,
        borderRadius: String(10) + "px",
        background: colorExtended.mainBlue,
        cursor: "pointer",
      },
      child: {
        text: payButtonContents[0].title,
        style: {
          fontSize: String(payTextSize) + ea,
          fontWeight: String(payTextWeight),
          color: colorExtended.darkBlack,
          display: "inline-block",
          position: "relative",
          top: String(payTextTextTop) + ea,
        }
      }
    });

    createNode({
      mother: buttonBase,
      event: {
        click: instance.paymentEvent("card"),
      },
      style: {
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: String(payButtonWidth) + ea,
        height: String(payButtonHeight) + ea,
        marginLeft: String(payButtonBetween) + ea,
        borderRadius: String(10) + "px",
        background: colorExtended.mainBlue,
        cursor: "pointer",
      },
      child: {
        text: payButtonContents[1].title,
        style: {
          fontSize: String(payTextSize) + ea,
          fontWeight: String(payTextWeight),
          color: colorExtended.darkBlack,
          display: "inline-block",
          position: "relative",
          top: String(payTextTextTop) + ea,
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}

FirstPaymentJs.prototype.insertSecondBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let secondBase;
    let originalSecondBaseHeight;
    let totalBase;
    let leftBox, rightBox;
    let basePaddingTop;
    let basePaddingBottom;
    let leftBoxWidth;
    let boxBetween;
    let boxInnerMargin;
    let boxInnerMarginVisual;
    let titleSquareWidth;
    let titleSquareLeftIndent;
    let titleSquareTop;
    let whiteTitleEngSize;
    let whiteTitleEngWeight;
    let whiteTitleKorSize;
    let whiteTitleKorWeight;
    let whiteTitleKorLightWeight;
    let whiteTitleKorTextTop;
    let whiteTitleBarMargin;
    let leftBlackBox;
    let checklistContents;
    let checklistBoxBetween;
    let leftBlueBox;
    let num;
    let contentsBoxTop;
    let titleLinePaddingBottom;
    let numberTitleMarginLeft, numberTitleTop;
    let contentsDescriptionSize, contentsDescriptionWeight, contentsDescriptionLineWeight;
    let contentsDescriptionBoxMarginTop;
    let etcInfoContents;
    let rightContentsBaseBox;
    let contentsBase;
    let i;
    let rightInfoBetween;
    let rightTitleBorderPadding;
    let rightTitleSize, rightTitleWeight, rightTitleTextTop;
    let rightContentsVerticalMargin;
    let rightContentsTitleWidth, rightContentsTitleSize, rightContentsTitleWeight, rightContentsTitleTextTop;
    let rightContentsDescriptionSize, rightContentsDescriptionWeight, rightContentsDescriptionLineHeight, rightContentsDescriptionTextTop;

    minusLeft = window.innerWidth - standardWidth + 1;

    basePaddingTop = <%% 150, 150, 120, 100, 19 %%>;
    basePaddingBottom = <%% 160, 160, 110, 90, 17 %%>;

    leftBoxWidth = <%% 590, 510, 430, 340, 510 %%>;
    boxBetween = <%% 45, 30, 25, 20, 45 %%>;

    boxInnerMargin = <%% 36, 28, 22, 22, 28 %%>;
    boxInnerMarginVisual = <%% 32, 26, 22, 22, 24 %%>;
    contentsBoxTop = <%% 28, 20, 18, 18, 24 %%>;

    titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
    titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
    titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

    whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
    whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
    whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
    whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
    whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
    whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
    whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;

    checklistBoxBetween = <%% 10, 10, 10, 10, 10 %%>;

    titleLinePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

    numberTitleMarginLeft = <%% 1, 1, 1, 1, 1 %%>;
    numberTitleTop = <%% -1, -1, -1, -1, -1 %%>;

    contentsDescriptionSize = <%% 15, 15, 13, 12, 15 %%>;
    contentsDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    contentsDescriptionLineWeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    contentsDescriptionBoxMarginTop = <%% 12, 12, 12, 12, 12 %%>;

    rightInfoBetween = <%% 28, 24, 12, 14, 28 %%>;
    rightTitleBorderPadding = <%% 5, 5, 5, 5, 5 %%>;
    rightTitleSize = <%% 19, 17, 15, 14, 19 %%>;
    rightTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    rightTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;

    rightContentsVerticalMargin = <%% 15, 13, 11, 10, 15 %%>;

    rightContentsTitleWidth = <%% 200, 100, 80, 80, 200 %%>;
    rightContentsTitleSize = <%% 16, 14, 12, 12, 16 %%>;
    rightContentsTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    rightContentsTitleTextTop = <%% -1, -1, -1, -1, -1 %%>;

    rightContentsDescriptionSize = <%% 15, 13, 12, 11, 15 %%>;
    rightContentsDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    rightContentsDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
    rightContentsDescriptionTextTop = <%% -1, -1, -1, -1, -1 %%>;

    checklistContents = [
      {
        title: "현장 조사",
        description: [
          "현장 방문이 어려운 경우, 거주지 또는 외부에서 만날 수 있습니다.",
          "제품 구매 및 시공 계약 전의 디자이너 현장 방문은 필수입니다.",
        ]
      },
      {
        title: "니즈 조사",
        description: [
          "디자이너는 미팅 사전 준비를 하며",
          "현장에서 고객님의 이야기를 들어 니즈를 파악합니다.",
        ]
      },
      {
        title: "컨셉 잡기",
        description: [
          "이미지 기반의 제안과 협의를 통해 컨셉을 확정하며 이후 변경이 불가능합니다.",
        ]
      },
      {
        title: "시공 체크",
        description: [
          "프로젝트에 시공이 포함된 경우",
          "디자이너는 현장 상태를 확인하고 가능한 시공 범위를 구체적으로 파악합니다.",
        ]
      },
    ];

    etcInfoContents = [
      {
        title: "현장 조사 관련",
        contents: [
          {
            title: "도면 확인",
            description: [
              "현장 도면을 제공해주세요.",
              "도면이 없는 경우, 디자이너는 실측을 통해 기록합니다.",
            ],
          },
          {
            title: "실측",
            description: [
              "도면이 있더라도 실제와 다를 수 있습니다.",
              "도면보다 실측이 더 중요하므로 디자이너는 실측을 진행합니다.",
            ],
          },
        ]
      },
      {
        title: "시공 체크 관련",
        contents: [
          {
            title: "현장 진단",
            description: [
              "원하는 스타일을 구현하기 위해 현장 자체에 필요한 시공이 있을 수 있습니다.",
              "디자이너는 현장을 진단하여 필요한 시공 사항을 설명해드립니다.",
            ],
          },
          {
            title: "시공 범위",
            description: [
              "디자이너는 고객님의 니즈와 예산의 균형적인 분배,",
              "현장의 상태를 종합적으로 판단하여 시공 범위를 조정합니다.",
            ],
          },
        ]
      },
      {
        title: "기타 주의 사항",
        contents: [
          {
            title: "계약금 관련",
            description: [
              "계약금은 전체 서비스 금액에 포함됩니다.",
              "계약금을 입금하시면 디자이너에게 고객님 정보가 전달됩니다."
            ],
          },
          {
            title: "디자이너 변경",
            description: [
              "현장 미팅 후 디자이너와 맞지 않다고 판단되면 최대 1회까지 디자이너 변경 가능합니다.",
              "(거리로 인한 출장비 발생 시 변경 디자이너에 대한 출장비는 재발생됩니다.)",
            ],
          },
          {
            title: "다음 단계 안내",
            description: [
              "미팅 완료 후 계약서 작성 및 잔금 결제 시 디자이너의 디자인 작업이 시작됩니다.",
            ],
          },
          {
            title: "진행 취소 시",
            description: [
              "현장 미팅 이후 진행을 취소시 계약금은 환불되지 않습니다.",
            ],
          },
        ]
      },
    ];

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.white,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
      }
    });

    totalBase = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "row",
        height: withOut(0, ea),
      },
      children: [
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(leftBoxWidth) + ea,
            height: withOut(0, ea),
            flexDirection: "column",
            marginRight: String(boxBetween) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(leftBoxWidth + boxBetween, ea),
            height: withOut(0, ea),
            flexDirection: "column",
          }
        },
      ]
    });
    [ leftBox, rightBox ] = [ ...totalBase.children ];

    // left box
    leftBlackBox = createNode({
      mother: leftBox,
      style: {
        display: "flex",
        width: withOut(boxInnerMargin * 2, ea),
        position: "relative",
        borderRadius: String(10) + "px",
        padding: String(boxInnerMargin) + ea,
        paddingBottom: String(boxInnerMarginVisual) + ea,
        background: colorExtended.black,
      }
    });
    createNode({
      mother: leftBlackBox,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(titleSquareLeftIndent, ea),
        marginLeft: String(titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.mainBlue,
            opacity: String(0.6),
          }
        },
        {
          text: "Check list",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.white,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;디자이너가 4가지를 진행해요.",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.white,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.white,
          }
        },
      ]
    });

    num = 0;
    for (let obj of checklistContents) {
      leftBlueBox = createNode({
        mother: leftBox,
        style: {
          display: "flex",
          width: withOut(boxInnerMargin * 2, ea),
          position: "relative",
          borderRadius: String(10) + "px",
          padding: String(boxInnerMargin) + ea,
          paddingBottom: String(boxInnerMarginVisual) + ea,
          paddingTop: String(contentsBoxTop) + ea,
          background: colorExtended.blueLight,
          marginTop: String(checklistBoxBetween) + ea,
          flexDirection: "column",
        }
      });
      createNode({
        mother: leftBlueBox,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: String(titleLinePaddingBottom) + ea,
          borderBottom: "1px solid " + colorExtended.blueDark,
        },
        children: [
          {
            text: String(num + 1) + "<b%.%b>",
            style: {
              fontSize: String(whiteTitleEngSize) + ea,
              fontWeight: String(whiteTitleEngWeight),
              color: colorExtended.black,
              display: "inline-block",
              position: "relative",
              fontFamily: "mont",
            },
            bold: {
              fontSize: String(whiteTitleEngSize) + ea,
              fontWeight: String(whiteTitleEngWeight),
              color: colorExtended.black,
              opacity: String(0.4),
            }
          },
          {
            text: "&nbsp;&nbsp;" + obj.title,
            style: {
              marginLeft: String(numberTitleMarginLeft) + ea,
              top: String(numberTitleTop) + ea,
              fontSize: String(whiteTitleKorSize) + ea,
              fontWeight: String(whiteTitleKorWeight),
              color: colorExtended.black,
              display: "inline-block",
              position: "relative",
            },
          },
        ]
      });
      createNode({
        mother: leftBlueBox,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          marginTop: String(contentsDescriptionBoxMarginTop) + ea,
        },
        child: {
          text: obj.description.join("\n"),
          style: {
            fontSize: String(contentsDescriptionSize) + ea,
            fontWeight: String(contentsDescriptionWeight),
            color: colorExtended.black,
            lineHeight: String(contentsDescriptionLineWeight),
            display: "block",
            position: "relative",
          },
        }
      })

      num++;
    }

    // right box
    i = 0;
    for (let obj of etcInfoContents) {
      rightContentsBaseBox = createNode({
        mother: rightBox,
        style: {
          display: "flex",
          width: withOut(0 * 2, ea),
          position: "relative",
          flexDirection: "column",
          paddingTop: String(i === 0 ? 0 : rightInfoBetween) + ea,
        }
      });

      createNode({
        mother: rightContentsBaseBox,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          paddingBottom: String(rightTitleBorderPadding) + ea,
          borderBottom: "2.5px solid " + colorExtended.black,
          flexDirection: "row",
        },
        child: {
          text: obj.title,
          style: {
            fontSize: String(rightTitleSize) + ea,
            fontWeight: String(rightTitleWeight),
            color: colorExtended.black,
            position: "relative",
            top: String(rightTitleTextTop) + ea,
          }
        }
      })

      num = 0;
      for (let contents of obj.contents) {

        contentsBase = createNode({
          mother: rightContentsBaseBox,
          style: {
            display: "flex",
            position: "relative",
            width: withOut(0, ea),
            paddingBottom: String(rightContentsVerticalMargin) + ea,
            borderBottom: num === obj.contents.length - 1 ? "" : "1px solid " + colorExtended.black,
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "row",
            marginTop: String(rightContentsVerticalMargin) + ea,
          }
        });

        createNode({
          mother: contentsBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(rightContentsTitleWidth) + ea,
          },
          child: {
            text: contents.title,
            style: {
              fontSize: String(rightContentsTitleSize) + ea,
              fontWeight: String(rightContentsTitleWeight),
              color: colorExtended.black,
              position: "relative",
              top: String(rightContentsTitleTextTop) + ea,
            }
          }
        });

        createNode({
          mother: contentsBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: withOut(rightContentsTitleWidth, ea),
          },
          child: {
            text: contents.description.join("\n"),
            style: {
              fontSize: String(rightContentsDescriptionSize) + ea,
              fontWeight: String(rightContentsDescriptionWeight),
              color: colorExtended.black,
              lineHeight: String(rightContentsDescriptionLineHeight),
              position: "relative",
              top: String(rightContentsDescriptionTextTop) + ea,
            }
          }
        });

        num++;
      }

      i++;
    }

  } catch (e) {
    console.log(e);
  }
}

FirstPaymentJs.prototype.insertThirdBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    let minusLeft;
    let secondBase;
    let originalSecondBaseHeight;
    let totalBase;
    let leftBox, rightBox;
    let basePaddingTop;
    let basePaddingBottom;
    let leftBoxWidth;
    let boxBetween;
    let boxInnerMargin;
    let boxInnerMarginVisual;
    let titleSquareWidth;
    let titleSquareLeftIndent;
    let titleSquareTop;
    let whiteTitleEngSize;
    let whiteTitleEngWeight;
    let whiteTitleKorSize;
    let whiteTitleKorWeight;
    let whiteTitleKorLightWeight;
    let whiteTitleKorTextTop;
    let whiteTitleBarMargin;
    let leftBlackBox;
    let checklistContents;
    let checklistBoxBetween;
    let leftBlueBox;
    let num;
    let contentsBoxTop;
    let titleLinePaddingBottom;
    let numberTitleMarginLeft, numberTitleTop;
    let contentsDescriptionSize, contentsDescriptionWeight, contentsDescriptionLineWeight;
    let contentsDescriptionBoxMarginTop;
    let etcInfoContents;
    let rightContentsBaseBox;
    let contentsBase;
    let i;

    minusLeft = window.innerWidth - standardWidth + 1;

    basePaddingTop = <%% 150, 150, 120, 100, 19 %%>;
    basePaddingBottom = <%% 160, 160, 120, 100, 17 %%>;

    leftBoxWidth = <%% 590, 590, 590, 590, 590 %%>;
    boxBetween = <%% 45, 45, 45, 45, 45 %%>;

    boxInnerMargin = <%% 32, 32, 32, 32, 32 %%>;
    boxInnerMarginVisual = <%% 30, 30, 30, 30, 30 %%>;
    contentsBoxTop = <%% 24, 24, 24, 24, 24 %%>;

    titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
    titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
    titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

    whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
    whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
    whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
    whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
    whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
    whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
    whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;

    checklistBoxBetween = <%% 10, 10, 10, 10, 10 %%>;

    titleLinePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

    numberTitleMarginLeft = <%% 1, 1, 1, 1, 1 %%>;
    numberTitleTop = <%% -1, -1, -1, -1, -1 %%>;

    contentsDescriptionSize = <%% 15, 15, 15, 15, 15 %%>;
    contentsDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
    contentsDescriptionLineWeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
    contentsDescriptionBoxMarginTop = <%% 12, 12, 12, 12, 12 %%>;

    secondBase = createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(basePaddingTop) + ea,
        paddingBottom: String(basePaddingBottom) + ea,
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(-1 * minusLeft) + ea,
          background: colorExtended.gradientBlue,
          width: withOut(-1 * (minusLeft * 2), ea),
          height: withOut(0, ea),
        },
      }
    });

    totalBase = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        flexDirection: "row",
        height: withOut(0, ea),
        flexDirection: "column",
      },
    });

    instance.insertInformationBox(totalBase);

  } catch (e) {
    console.log(e);
  }
}

FirstPaymentJs.prototype.insertInformationBox = function (totalBase) {
  const instance = this;
  const mother = this.mother;
  const { client, project, projectHistory, clientRequestNumber, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, colorExtended } = GeneralJs;
  const wordings = this.wordings.tableWordings;
  const {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  } = wordings.table;
  const indexNumber = 1;
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
  let periodLineTop;
  let calendar;
  let mobileCalendarMargin, mobileCalendarMarginTop;
  let mobilePaddingTop, mobilePaddingBottom;
  let periodPaddingLeft;
  let periodLineWidth;
  let initWordingSize;
  let zeroWordingSize;
  let zeroWordingTop;
  let initTitleMarginTop;
  let initContentsMarginTop;
  let initContentsBottom;
  let initContentsPaddingLeft;
  let boxInnerMargin;
  let titleSquareWidth;
  let titleSquareLeftIndent;
  let titleSquareTop;
  let whiteTitleEngSize;
  let whiteTitleEngWeight;
  let whiteTitleKorSize;
  let whiteTitleKorWeight;
  let whiteTitleKorLightWeight;
  let whiteTitleKorTextTop;
  let whiteTitleBarMargin;
  let tableMarginTop;

  wordsTitle = wordings.title.join(" ");

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 32, 30, 4.7 %%>;
  paddingTop =  <%% 52, 52, 30, 28, 6 %%>;

  whiteBottomMargin = <%% 60, 60, 36, 32, 0 %%>;

  titleFontSize = <%% 22, 22, 22, 21, 4.3 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), 0 %%>;

  mobileTitleLeft = 6;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 230, 180, 200, 33 %%>;
  secondBlockMargin = <%% 45, 40, 30, 40, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 13, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 8 : 6), (isMac() ? 7 : 5), 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 28, 30, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 5 %%>;

  periodLineTop = <%% 27, 27, 23, 23, 3.8 %%>;
  periodPaddingLeft = <%% 16, 16, 16, 32, 7 %%>;
  periodLineWidth = <%% 4, 4, 4, 18, 4 %%>;

  mobileCalendarMargin = 6;
  mobileCalendarMarginTop = 4;
  mobilePaddingTop = 5;
  mobilePaddingBottom = 10.5;

  initWordingSize = <%% 14.5, 14, 14, 13, 3.2 %%>;

  zeroWordingSize = <%% 21, 21, 21, 21, 21 %%>;
  zeroWordingTop = <%% -3, -3, -3, -3, -3 %%>;

  initTitleMarginTop = <%% 14, 14, 14, 14, 2.5 %%>;
  initContentsMarginTop = <%% 4, 4, 4, 4, 0.5 %%>;
  initContentsBottom = <%% -3, -3, -3, -3, 0 %%>;
  initContentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;

  boxInnerMargin = <%% 45, 40, 30, 25, 45 %%>;

  titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
  titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
  titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

  whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
  whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
  whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
  whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
  whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
  whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;
  tableMarginTop = <%% 24, 22, 18, 14, 24 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: totalBase,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
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
          display: "flex",
          position: "relative",
          width: String(100) + '%',
          overflow: "hidden",
          marginBottom: String(0) + ea,
          flexDirection: "column",
        }
      },
    ]
  });
  tong = block.lastChild;

  createNode({
    mother: tong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(titleSquareLeftIndent, ea),
      marginLeft: String(titleSquareLeftIndent) + ea,
      justifyContent: "start",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: String(tableMarginTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "absolute",
          top: String(titleSquareTop) + ea,
          left: String(-1 * titleSquareLeftIndent) + ea,
          width: String(titleSquareWidth) + ea,
          height: String(titleSquareWidth) + ea,
          borderRadius: String(4) + "px",
          background: colorExtended.blueLight,
          opacity: String(0.8),
        }
      },
      {
        text: "Client info",
        style: {
          fontSize: String(whiteTitleEngSize) + ea,
          fontWeight: String(whiteTitleEngWeight),
          color: colorExtended.black,
          display: "inline-block",
          position: "relative",
          fontFamily: "mont",
        }
      },
      {
        text: "<b%|%b>&nbsp;&nbsp;&nbsp;고객 정보",
        style: {
          marginLeft: String(whiteTitleBarMargin) + ea,
          top: String(whiteTitleKorTextTop) + ea,
          fontSize: String(whiteTitleKorSize) + ea,
          fontWeight: String(whiteTitleKorWeight),
          color: colorExtended.black,
          display: "inline-block",
          position: "relative",
        },
        bold: {
          fontSize: String(whiteTitleKorSize) + ea,
          fontWeight: String(whiteTitleKorLightWeight),
          color: colorExtended.black,
        }
      },
    ]
  });

  tong.appendChild(mother.makeTable(matrix, { whiteMode: true, style: { width: 100 }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
  calendar = tong.lastChild;

  if (desktop) {
    calendar.style.width = String(100) + '%';
    calendar.style.display = "block";
  } else {
    calendar.style.width = withOut(mobileCalendarMargin * 2, ea);
    calendar.style.marginLeft = String(mobileCalendarMargin) + ea;
    tong.style.paddingTop = String(mobileCalendarMarginTop) + ea;
    calendar.style.display = "block";
  }

}

FirstPaymentJs.prototype.insertCompleteBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, autoComma } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, thisBill } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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
    let mainIllustLeft, mainIllustRight;
    let mainIllustMargin, mainIllustTop, mainIllustWidth;
    let blueBoxMarginTop;
    let whiteAreaWidth;
    let whiteBase, blueBase;
    let boxInnerMargin;
    let titleSquareWidth;
    let titleSquareLeftIndent;
    let titleSquareTop;
    let whiteTitleEngSize, whiteTitleEngWeight;
    let whiteTitleKorSize, whiteTitleKorWeight, whiteTitleKorLightWeight;
    let whiteTitleKorTextTop;
    let whiteTitleBarMargin;
    let paymentMatrix;
    let matrixTong;
    let num;
    let matrixTongMarginTop, matixTongVisualBottom;
    let matrixFactorHeight, matrixLineWeight;
    let factorTitleWidth;
    let factorSize, factorWeight, factorBoldWeight, factorTextTop;
    let factorTitleHeightPercentage;
    let totalBoxHeight;
    let vatWording, finalWording;
    let buttonBase;
    let payButtonBetween;
    let payButtonHeight;
    let payButtonContents;
    let buttonBaseMarginTop;
    let payTextSize, payTextWeight, payTextTextTop;
    let payButtonWidth;
    let totalWordingTextTop, totalWordingSize, totalWordingDotSize, totalWordingDotOpacity;
    let vatSize, vatWeight, vatTextTop;
    let finalAmountTextTop, finalAmountSize, finalAmountWeight;
    let completeBoxHeight;
    let completeBoxVisualPaddingBottom;
    let completeBoxMarginBottom;
    let completeBoxCircleWidth;
    let completeBoxTextSize;
    let completeBoxTextTop;
    let completeBoxTextMarginTop;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 10 %%>;
    firstBasePaddingBottom = <%% 160, 160, 160, 120, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% 4, 4, 4, 4, 4 %%>;

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
    titleLineHeight = <%% 1, 1, 1, 1, 1 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 330, 314, 39 %%>;

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
      titleSize = <%% 57, 47, 40, 34, 7 %%>;
      subTitleSize = <%% 19, 17, 16, 14, 3.6 %%>;
      firstBasePaddingTop = <%% 48, 45, 30, 28, 50 %%>;
      firstBasePaddingBottom = <%% 160, 160, 120, 100, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    mainIllustLeft = FirstPaymentJs.binaryPath + "/mainillust_left.png";
    mainIllustRight = FirstPaymentJs.binaryPath + "/mainillust_right.png";

    mainIllustMargin = <%% 90, 70, 56, 50, 70 %%>;
    mainIllustTop = <%% -340, -296, -260, -212, -340 %%>;
    mainIllustWidth = <%% 275, 240, 210, 170, 240 %%>;

    blueBoxMarginTop = <%% 114, 82, 48, 42, 114 %%>;
    whiteAreaWidth = <%% 1000, 710, 600, 460, 80 %%>;

    boxInnerMargin = <%% 45, 40, 30, 25, 45 %%>;

    titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
    titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
    titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

    whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
    whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
    whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
    whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
    whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
    whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
    whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;

    matrixTongMarginTop = <%% 24, 24, 18, 16, 1 %%>;
    matixTongVisualBottom = <%% 1, 1, 1, 1, 1 %%>;

    matrixFactorHeight = <%% 52, 45, 40, 32, 52 %%>;
    matrixLineWeight = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;

    factorTitleWidth = <%% 240, 160, 140, 120, 240 %%>;
    factorSize = <%% 15, 14, 13, 12, 15 %%>;
    factorWeight = <%% 400, 400, 400, 400, 400 %%>;
    factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    factorTextTop = <%% -1, -1, -1, -1, -1 %%>;

    factorTitleHeightPercentage = <%% 12, 12, 12, 12, 12 %%>;

    totalBoxHeight = <%% 467, 415, 356, 296, 445 %%>;
    payButtonBetween = <%% 10, 10, 8, 6, 10 %%>;
    payButtonHeight = <%% 48, 42, 38, 34, 48 %%>;
    payButtonWidth = <%% 140, 120, 108, 100, 140 %%>;

    buttonBaseMarginTop = <%% 25, 25, 20, 18, 25 %%>;

    payTextSize = <%% 18, 17, 15, 14, 18 %%>;
    payTextWeight = <%% 800, 800, 800, 800, 800 %%>;
    payTextTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;

    totalWordingTextTop = <%% 4, 4, 4, 4, 4 %%>;
    totalWordingSize = <%% 23, 21, 18, 16, 23 %%>;
    totalWordingDotSize = <%% 30, 24, 22, 18, 30 %%>;
    totalWordingDotOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    vatSize = <%% 14, 13, 12, 11, 14 %%>;
    vatWeight = <%% 900, 900, 900, 900, 900 %%>;
    vatTextTop = <%% -9, -9, -9, -9, -9 %%>;

    finalAmountTextTop = <%% -2, -2, -2, -2, -2 %%>;
    finalAmountSize = <%% 38, 36, 32, 29, 38 %%>;
    finalAmountWeight = <%% 800, 800, 800, 800, 800 %%>;

    completeBoxHeight = <%% 300, 270, 240, 210, 300 %%>;
    completeBoxVisualPaddingBottom = <%% 5, 5, 5, 5, 5 %%>;
    completeBoxMarginBottom = <%% 64, 64, 48, 42, 64 %%>;
    completeBoxCircleWidth = <%% 50, 45, 40, 36, 50 %%>;
    completeBoxTextSize = <%% 24, 21, 18, 17, 4 %%>;
    completeBoxTextTop = <%% 0, 0, 0, 0, 0 %%>;
    completeBoxTextMarginTop = <%% 12, 12, 10, 8, 12 %%>;

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    payButtonContents = [
      {
        title: "계좌 이체",
      },
      {
        title: "카드 결제",
      },
    ];
    paymentMatrix = [
      [ "품명", "디자인비" ],
      [ "단가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.unit.price }, 0)) + "원" ],
      [ "수량", String(thisBill.request.items.reduce((acc, curr) => { return acc + curr.unit.number }, 0)) ],
      [ "공급가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.supply }, 0)) + "원" ],
      [ "VAT", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.vat }, 0)) + "원" ],
      [ "소비자가", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원" ],
    ];
    vatWording = "VAT 포함";
    finalWording = autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원";

    firstBase = createNode({
      mother: baseTong,
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
          text: "현장 미팅 안내 및 계약금 결제",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ],
    });

    // complete box
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        height: String(completeBoxHeight) + ea,
        paddingBottom: String(completeBoxVisualPaddingBottom) + ea,
        marginTop: String(blueBoxMarginTop) + ea,
        marginBottom: String(completeBoxMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
        borderTop: "1px dashed " + colorExtended.blueLight,
        borderBottom: "1px dashed " + colorExtended.blueLight,
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.completeCircle(colorExtended.mainBlue, colorExtended.blueLight),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(completeBoxCircleWidth) + ea,
            opacity: String(0),
            transform: "translateY(30px)",
            animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(completeBoxTextMarginTop) + ea,
            opacity: String(0),
            transform: "translateY(30px)",
            animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          },
          children: [
            {
              text: "카드 결제가 완료되었습니다!",
              style: {
                display: "inline-block",
                position: "relative",
                color: colorExtended.white,
                fontWeight: String(subTitleWeight),
                fontSize: String(completeBoxTextSize) + ea,
                top: String(completeBoxTextTop) + ea,
                textAlign: "center",
              }
            }
          ],
        }
      ]
    });

    // payment box
    [ whiteBase, blueBase ] = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0, ea),
        height: String(totalBoxHeight) + ea,
        background: colorExtended.mainBlue,
        borderRadius: String(10) + "px",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: String(whiteAreaWidth) + ea,
            background: colorExtended.gray0,
            borderTopLeftRadius: String(10) + "px",
            borderBottomLeftRadius: String(10) + "px",
            borderTopRightRadius: String(0) + "px",
            borderBottomRightRadius: String(0) + "px",
            overflow: "hidden",
            justifyContent: "start",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: withOut(whiteAreaWidth, ea),
            background: colorExtended.transparent,
            borderTopLeftRadius: String(0) + "px",
            borderBottomLeftRadius: String(0) + "px",
            borderTopRightRadius: String(10) + "px",
            borderBottomRightRadius: String(10) + "px",
            overflow: "hidden",
            justifyContent: "end",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
      ]
    }).children;

    // white box
    createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.blueLight,
            opacity: String(0.8),
          }
        },
        {
          text: "Summary",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;결제 정보",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    matrixTong = createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(boxInnerMargin * 2, ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        marginTop: String(matrixTongMarginTop) + ea,
        marginBottom: String(matixTongVisualBottom) + ea,
      },
    });
    num = 0;
    for (let [ title, value ] of paymentMatrix) {
      createNode({
        mother: matrixTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: withOut(0, ea),
          height: String(matrixFactorHeight) + ea,
          background: colorExtended.transparent,
          borderTop: String(num === 0 ? matrixLineWeight : 0) + "px solid " + (num === 0 ? colorExtended.black : colorExtended.gray4),
          borderBottom: String(num === 0 || num === paymentMatrix.length - 1 ? matrixLineWeight : 1) + "px solid " + (num === 0 || num === paymentMatrix.length - 1 ? colorExtended.black : colorExtended.gray4),
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: String(factorTitleWidth) + ea,
              height: withOut(factorTitleHeightPercentage * 2, '%'),
              boxSizing: "border-box",
              borderRight: "1px solid " + colorExtended.gray4,
            },
            child: {
              text: title,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorExtended.black,
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(factorTitleWidth, ea),
              height: withOut(0, ea),
              boxSizing: "border-box",
            },
            child: {
              text: value,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorExtended.black,
              }
            }
          },
        ]
      });
      num++;
    }

    // ==================================================================================================================================================================================

    // blue box
    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "absolute",
        top: String(boxInnerMargin) + ea,
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        left: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.white,
            opacity: String(0.6),
          }
        },
        {
          text: "Total",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;금액 합계",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "end",
        alignItems: "center",
        flexDirection: "row",
        top: String(totalWordingTextTop) + ea,
      },
      children: [
        {
          text: "TOTAL<b%.%b>",
          style: {
            fontSize: String(totalWordingSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.darkBlack,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          },
          bold: {
            fontSize: String(totalWordingDotSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.darkBlack,
            opacity: String(totalWordingDotOpacity),
          }
        },
      ]
    });

    createNode({
      mother: blueBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "end",
        alignItems: "end",
        flexDirection: "row",
      },
      children: [
        {
          text: vatWording,
          style: {
            fontSize: String(vatSize) + ea,
            fontWeight: String(vatWeight),
            top: String(vatTextTop) + ea,
            color: colorExtended.blueDim,
            display: "inline-block",
            position: "relative",
          }
        },
        {
          text: finalWording,
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(finalAmountTextTop) + ea,
            fontSize: String(finalAmountSize) + ea,
            fontWeight: String(finalAmountWeight),
            color: colorExtended.white,
            display: "inline-block",
            position: "relative",
          },
        },
      ]
    });

  } catch (e) {
    console.log(e);
  }
}

FirstPaymentJs.prototype.insertAccountBox = async function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, removeByClass, autoComma, ajaxJson } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight, baseTop, thisBill } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const injectionInputClassName = "injectionInputClassName";
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
    let mainIllustLeft, mainIllustRight;
    let mainIllustMargin, mainIllustTop, mainIllustWidth;
    let blueBoxMarginTop;
    let whiteAreaWidth;
    let whiteBase, blueBase;
    let boxInnerMargin;
    let titleSquareWidth;
    let titleSquareLeftIndent;
    let titleSquareTop;
    let whiteTitleEngSize, whiteTitleEngWeight;
    let whiteTitleKorSize, whiteTitleKorWeight, whiteTitleKorLightWeight;
    let whiteTitleKorTextTop;
    let whiteTitleBarMargin;
    let paymentMatrix;
    let matrixTong;
    let num;
    let matrixTongMarginTop, matixTongVisualBottom;
    let matrixFactorHeight, matrixLineWeight;
    let factorTitleWidth;
    let factorSize, factorWeight, factorBoldWeight, factorTextTop;
    let factorTitleHeightPercentage;
    let totalBoxHeight;
    let vatWording, finalWording;
    let buttonBase;
    let payButtonBetween;
    let payButtonHeight;
    let payButtonContents;
    let buttonBaseMarginTop;
    let payTextSize, payTextWeight, payTextTextTop;
    let payButtonWidth;
    let totalWordingTextTop, totalWordingSize, totalWordingDotSize, totalWordingDotOpacity;
    let vatSize, vatWeight, vatTextTop;
    let finalAmountTextTop, finalAmountSize, finalAmountWeight;
    let completeBoxHeight;
    let completeBoxVisualPaddingBottom;
    let completeBoxMarginBottom;
    let completeBoxCircleWidth;
    let completeBoxTextSize;
    let completeBoxTextTop;
    let completeBoxTextMarginTop;
    let whiteBase2;
    let whiteBaseBetween;
    let receiptContents;
    let receiptNotice;
    let receiptSubmitEvent;
    let infoArrowWidth, infoWordingMarginLeft;
    let infoArrowHeight;
    let inputBaseWidth, inputBaseHeight;
    let receiptInputHeight, receiptInputVisualTop, receiptInputSize, receiptInputWeight;
    let submitButtonWidth, submitButtonHeight, submitButtonMargin, submitButtonTextTop, submitButtonSize, submitButtonWeight;
    let finalIconWidth;

    minusLeft = window.innerWidth - standardWidth + 1;
    leftRightWidth = (window.innerWidth - standardWidth) / 2;

    firstBasePaddingTop = <%% 24, 24, 24, 24, 10 %%>;
    firstBasePaddingBottom = <%% 240, 240, 240, 240, 20 %%>;

    subTitleSize = <%% 18, 18, 17, 15, 3.6 %%>;
    subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
    subTitleMarginTop = <%% 4, 4, 4, 4, 4 %%>;

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
    titleLineHeight = <%% 1, 1, 1, 1, 1 %%>;

    pointOpacity = 0.4;

    mainImageTop = <%% 27, 24, 18, 16, 33 %%>;
    mainImageHeight = <%% 390, 370, 330, 314, 39 %%>;

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
      titleSize = <%% 57, 47, 40, 34, 7 %%>;
      subTitleSize = <%% 19, 17, 16, 14, 3.6 %%>;
      firstBasePaddingTop = <%% 48, 45, 30, 28, 50 %%>;
      firstBasePaddingBottom = <%% 160, 160, 120, 100, 210 %%>;
      mainImageTop = <%% 42, 32, 18, 16, 32 %%>;
      mainImageHeight = <%% 390, 372, 338, 314, 39 %%>;
      buttonMarginTop = <%% 146, 146, 132, 110, 3.6 %%>;
    }

    mainIllustMargin = <%% 90, 70, 56, 50, 70 %%>;
    mainIllustTop = <%% -340, -296, -260, -212, -340 %%>;
    mainIllustWidth = <%% 275, 240, 210, 170, 240 %%>;

    blueBoxMarginTop = <%% 114, 82, 48, 42, 114 %%>;
    whiteAreaWidth = <%% 1000, 710, 600, 460, 80 %%>;

    boxInnerMargin = <%% 45, 40, 30, 25, 45 %%>;

    titleSquareWidth = <%% 27, 27, 24, 21, 27 %%>;
    titleSquareLeftIndent = <%% 10, 10, 10, 10, 10 %%>;
    titleSquareTop = <%% -1, -1, -1, -1, -1 %%>;

    whiteTitleEngSize = <%% 22, 22, 18, 17, 22 %%>;
    whiteTitleEngWeight = <%% 700, 700, 700, 700, 700 %%>;
    whiteTitleKorSize = <%% 18, 18, 16, 14, 18 %%>;
    whiteTitleKorWeight = <%% 800, 800, 800, 800, 800 %%>;
    whiteTitleKorLightWeight = <%% 200, 200, 200, 200, 200 %%>;
    whiteTitleKorTextTop = <%% -4, -4, -3, -4, -4 %%>;
    whiteTitleBarMargin = <%% 11, 11, 10, 8, 1 %%>;

    matrixTongMarginTop = <%% 24, 24, 18, 16, 1 %%>;
    matixTongVisualBottom = <%% 1, 1, 1, 1, 1 %%>;

    matrixFactorHeight = <%% 52, 45, 40, 32, 52 %%>;
    matrixLineWeight = <%% 2.5, 2.5, 2.5, 2.5, 2.5 %%>;

    factorTitleWidth = <%% 240, 160, 140, 120, 240 %%>;
    factorSize = <%% 15, 14, 13, 12, 15 %%>;
    factorWeight = <%% 400, 400, 400, 400, 400 %%>;
    factorBoldWeight = <%% 800, 800, 800, 800, 800 %%>;
    factorTextTop = <%% -1, -1, -1, -1, -1 %%>;

    factorTitleHeightPercentage = <%% 12, 12, 12, 12, 12 %%>;

    totalBoxHeight = <%% 305, 275, 226, 192, 445 %%>;
    payButtonBetween = <%% 10, 10, 8, 6, 10 %%>;
    payButtonHeight = <%% 48, 42, 38, 34, 48 %%>;
    payButtonWidth = <%% 140, 120, 108, 100, 140 %%>;

    buttonBaseMarginTop = <%% 25, 25, 20, 18, 25 %%>;

    payTextSize = <%% 18, 17, 15, 14, 18 %%>;
    payTextWeight = <%% 800, 800, 800, 800, 800 %%>;
    payTextTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1) %%>;

    totalWordingTextTop = <%% 4, 4, 4, 4, 4 %%>;
    totalWordingSize = <%% 23, 21, 18, 16, 23 %%>;
    totalWordingDotSize = <%% 30, 24, 22, 18, 30 %%>;
    totalWordingDotOpacity = <%% 0.4, 0.4, 0.4, 0.4, 0.4 %%>;

    vatSize = <%% 14, 13, 12, 11, 14 %%>;
    vatWeight = <%% 900, 900, 900, 900, 900 %%>;
    vatTextTop = <%% -9, -9, -9, -9, -9 %%>;

    finalAmountTextTop = <%% -2, -2, -2, -2, -2 %%>;
    finalAmountSize = <%% 38, 36, 32, 29, 38 %%>;
    finalAmountWeight = <%% 800, 800, 800, 800, 800 %%>;

    completeBoxHeight = <%% 300, 270, 240, 210, 300 %%>;
    completeBoxVisualPaddingBottom = <%% 5, 5, 5, 5, 5 %%>;
    completeBoxMarginBottom = <%% 64, 64, 48, 42, 64 %%>;
    completeBoxCircleWidth = <%% 50, 45, 40, 36, 50 %%>;
    completeBoxTextSize = <%% 24, 21, 18, 17, 4 %%>;
    completeBoxTextTop = <%% 0, 0, 0, 0, 0 %%>;
    completeBoxTextMarginTop = <%% 12, 12, 10, 8, 12 %%>;

    whiteBaseBetween = <%% 20, 20, 20, 20, 20 %%>;

    infoArrowWidth = <%% 900, 580, 480, 340, 900 %%>;
    infoArrowHeight = <%% 12, 12, 10, 9, 12 %%>;
    infoWordingMarginLeft = <%% 12, 12, 12, 12, 12 %%>;

    inputBaseWidth = <%% 320, 320, 300, 260, 320 %%>;
    inputBaseHeight = <%% 30, 30, 28, 24, 30 %%>;

    receiptInputHeight = <%% 26, 26, 24, 20, 26 %%>;
    receiptInputVisualTop = <%% -1, -1, -1, -1, -1 %%>;
    receiptInputSize = <%% 13, 13, 12, 11, 13 %%>;
    receiptInputWeight = <%% 400, 400, 400, 400, 400 %%>;

    submitButtonWidth = <%% 70, 70, 64, 56, 70 %%>;
    submitButtonHeight = <%% 30, 30, 28, 24, 30 %%>;
    submitButtonMargin = <%% 8, 8, 6, 4, 8 %%>;
    submitButtonTextTop = <%% -1, -1, -1, -1, -1 %%>;
    submitButtonSize = <%% 14, 13, 13, 12, 14 %%>;
    submitButtonWeight = <%% 800, 800, 800, 800, 800 %%>;

    finalIconWidth = <%% 24, 24, 24, 24, 24 %%>;

    this.totalContents = document.getElementById("totalcontents");
    this.totalContents.style.overflow = "hidden";
    this.totalContents.style.background = colorExtended.black;
    document.body.style.background = colorExtended.black;

    receiptSubmitEvent = (num) => {
      return async function (e) {
        try {
          const index = Number(this.getAttribute("index"));
          const targetInput = document.querySelector('.' + injectionInputClassName + String(index));
          const thisValue = targetInput.value.trim().replace(/[^0-9\-]/gi, '');
          const getObj = returnGet();
          if (index === 0) {

            await ajaxJson({
              mode: "cashPhone",
              phone: thisValue,
              hash: getObj.hash,
              bilid: instance.bill.bilid,
              proid: instance.project.proid,
              desid: instance.designer.desid,
              cliid: instance.client.cliid,
              name: instance.client.name,
            }, BACKHOST + "/inicisPayment");

            GeneralJs.alert("정상적으로 제출되었습니다!", true, true);

          } else {

            // file input dev
            // file input dev
            // file input dev

            await ajaxJson({
              mode: "cashPhone",
              phone: thisValue,
              hash: getObj.hash,
              bilid: instance.bill.bilid,
              proid: instance.project.proid,
              desid: instance.designer.desid,
              cliid: instance.client.cliid,
              name: instance.client.name,
            }, BACKHOST + "/inicisPayment");
            
            GeneralJs.alert("정상적으로 제출되었습니다!", true, true);

          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    payButtonContents = [
      {
        title: "계좌 이체",
      },
      {
        title: "카드 결제",
      },
    ];
    paymentMatrix = [
      [ "총 금액", autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원" ],
      [ "계좌 정보",  "기업 049-085567-04-022 " + "(주)홈리에종"]
    ];
    receiptContents = [
      [ "현금 영수증 발행", "핸드폰 번호", "cash" ],
      [ "세금 계산서 발행", "사업자 등록 번호", "business" ],
    ];
    receiptNotice = [
      "<b%주의사항%b>",
      "1. 계약서를 사업자명으로 작성한 경우에 한해 사업자 번호 기준 세금 계산서 발행되며 그렇지 않을 경우, 신청자의 핸드폰 번호 기준 현금 영수증이 발행됩니다.",
      "2. 세금 계산서 발행을 마친 후에도 입금자명을 반드시 신청자명으로 보내주셔야 합니다.",
      "3. 계좌 이체시 입금자 이름과 서비스 신청자 이름이 일치해야 합니다. 그렇지 않을 경우, 입금 확인에 문제가 생길 수 있습니다.",
    ];
    vatWording = "VAT 포함";
    finalWording = autoComma(thisBill.request.items.reduce((acc, curr) => { return acc + curr.amount.consumer }, 0)) + "원";

    firstBase = createNode({
      mother: baseTong,
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
          text: "현장 미팅 안내 및 계약금 결제",
          style: {
            display: "inline-block",
            position: "relative",
            color: colorExtended.white,
            fontWeight: String(subTitleWeight),
            fontSize: String(subTitleSize) + ea,
            textAlign: "center",
          }
        }
      ],
    });

    // complete box
    createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: withOut(0, ea),
        height: String(completeBoxHeight) + ea,
        paddingBottom: String(completeBoxVisualPaddingBottom) + ea,
        marginTop: String(blueBoxMarginTop) + ea,
        marginBottom: String(completeBoxMarginBottom) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
        borderTop: "1px dashed " + colorExtended.blueLight,
        borderBottom: "1px dashed " + colorExtended.blueLight,
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.informationCircle(colorExtended.mainBlue, colorExtended.blueLight),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(completeBoxCircleWidth) + ea,
            opacity: String(0),
            transform: "translateY(30px)",
            animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          }
        },
        {
          style: {
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: String(completeBoxTextMarginTop) + ea,
            opacity: String(0),
            transform: "translateY(30px)",
            animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
          },
          children: [
            {
              text: "홈리에종 계좌를 안내드립니다.",
              style: {
                display: "inline-block",
                position: "relative",
                color: colorExtended.white,
                fontWeight: String(subTitleWeight),
                fontSize: String(completeBoxTextSize) + ea,
                top: String(completeBoxTextTop) + ea,
                textAlign: "center",
              }
            }
          ],
        }
      ]
    });

    // white 1 box
    [ whiteBase ] = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0, ea),
        height: String(totalBoxHeight) + ea,
        background: colorExtended.white,
        borderRadius: String(10) + "px",
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: withOut(0, ea),
            background: colorExtended.gray0,
            borderRadius: String(10) + "px",
            justifyContent: "start",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
      ]
    }).children;

    createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.blueLight,
            opacity: String(0.8),
          }
        },
        {
          text: "Payment",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;결제 정보",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    matrixTong = createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(boxInnerMargin * 2, ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        marginTop: String(matrixTongMarginTop) + ea,
        marginBottom: String(matixTongVisualBottom) + ea,
      },
    });
    num = 0;
    for (let [ title, value ] of paymentMatrix) {
      createNode({
        mother: matrixTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: withOut(0, ea),
          height: String(matrixFactorHeight) + ea,
          background: colorExtended.transparent,
          borderTop: String(num === 0 ? matrixLineWeight : 0) + "px solid " + (num === 0 ? colorExtended.black : colorExtended.gray4),
          borderBottom: String(num === paymentMatrix.length - 1 ? matrixLineWeight : 1) + "px solid " + (num === paymentMatrix.length - 1 ? colorExtended.black : colorExtended.gray4),
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: String(factorTitleWidth) + ea,
              height: withOut(factorTitleHeightPercentage * 2, '%'),
              boxSizing: "border-box",
              borderRight: "1px solid " + colorExtended.gray4,
            },
            child: {
              text: title,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorExtended.black,
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: withOut(factorTitleWidth, ea),
              height: withOut(0, ea),
              boxSizing: "border-box",
            },
            child: {
              text: value,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorWeight),
                color: colorExtended.black,
              }
            }
          },
        ]
      });
      num++;
    }
    createNode({
      mother: whiteBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2), ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "end",
        alignItems: "center",
        flexDirection: "row",
        marginTop: String(matrixTongMarginTop) + ea,
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.horizontalArrow(infoArrowWidth, infoArrowHeight, colorExtended.mainBlue),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(infoArrowWidth) + ea,
            top: String(0) + ea,
          }
        },
        {
          text: "홈리에종의 계좌 정보를 참고하시어 입금해주시면 결제가 완료됩니다.",
          style: {
            fontSize: String(factorSize) + ea,
            fontWeight: String(800),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            marginLeft: String(infoWordingMarginLeft) + ea,
            top: String(0) + ea,
          },
        },
      ]
    });

    // ============================================================================================================================================

    // white 2 box
    [ whiteBase2 ] = createNode({
      mother: firstBase,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0, ea),
        background: colorExtended.white,
        borderRadius: String(10) + "px",
        marginTop: String(whiteBaseBetween) + ea,
        opacity: String(0),
        transform: "translateY(30px)",
        animation: "1.2s ease 0s 1 normal forwards running fadeupdelay2",
        overflow: "visible",
      },
      children: [
        {
          style: {
            display: "inline-flex",
            flexDirection: "column",
            position: "relative",
            height: withOut(boxInnerMargin * 2, ea),
            width: withOut(0, ea),
            background: colorExtended.gray0,
            borderRadius: String(10) + "px",
            justifyContent: "start",
            alignItems: "start",
            paddingTop: String(boxInnerMargin) + ea,
            paddingBottom: String(boxInnerMargin) + ea,
          }
        },
      ]
    }).children;

    createNode({
      mother: whiteBase2,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2) + titleSquareLeftIndent, ea),
        marginLeft: String(boxInnerMargin + titleSquareLeftIndent) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "absolute",
            top: String(titleSquareTop) + ea,
            left: String(-1 * titleSquareLeftIndent) + ea,
            width: String(titleSquareWidth) + ea,
            height: String(titleSquareWidth) + ea,
            borderRadius: String(4) + "px",
            background: colorExtended.blueLight,
            opacity: String(0.8),
          }
        },
        {
          text: "Receipt",
          style: {
            fontSize: String(whiteTitleEngSize) + ea,
            fontWeight: String(whiteTitleEngWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            fontFamily: "mont",
          }
        },
        {
          text: "<b%|%b>&nbsp;&nbsp;&nbsp;증빙 발행",
          style: {
            marginLeft: String(whiteTitleBarMargin) + ea,
            top: String(whiteTitleKorTextTop) + ea,
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorWeight),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
          },
          bold: {
            fontSize: String(whiteTitleKorSize) + ea,
            fontWeight: String(whiteTitleKorLightWeight),
            color: colorExtended.black,
          }
        },
      ]
    });

    matrixTong = createNode({
      mother: whiteBase2,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(boxInnerMargin * 2, ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        marginTop: String(matrixTongMarginTop) + ea,
        marginBottom: String(matixTongVisualBottom) + ea,
      },
    });
    num = 0;
    for (let [ title, placeholder, property ] of receiptContents) {
      createNode({
        mother: matrixTong,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: withOut(0, ea),
          height: String(matrixFactorHeight) + ea,
          background: colorExtended.transparent,
          borderTop: String(num === 0 ? matrixLineWeight : 0) + "px solid " + (num === 0 ? colorExtended.black : colorExtended.gray4),
          borderBottom: String(num === receiptContents.length - 1 ? matrixLineWeight : 1) + "px solid " + (num === receiptContents.length - 1 ? colorExtended.black : colorExtended.gray4),
        },
        children: [
          {
            style: {
              display: "inline-flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              width: String(factorTitleWidth) + ea,
              height: withOut(factorTitleHeightPercentage * 2, '%'),
              boxSizing: "border-box",
              borderRight: "1px solid " + colorExtended.gray4,
            },
            child: {
              text: title,
              style: {
                display: "inline-block",
                position: "relative",
                top: String(factorTextTop) + ea,
                fontSize: String(factorSize) + ea,
                fontWeight: String(factorBoldWeight),
                color: colorExtended.black,
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              position: "relative",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              width: withOut(factorTitleWidth, ea),
              height: withOut(0, ea),
              boxSizing: "border-box",
            },
            children: [
              {
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(inputBaseWidth) + ea,
                  height: String(inputBaseHeight) + ea,
                  background: colorExtended.gray6,
                  borderRadius: String(8) + "px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  mode: "input",
                  class: [ injectionInputClassName + String(num) ],
                  event: {
                    keyup: function (e) {
                      const index = Number(this.getAttribute("index"));
                      if (index === 0) {
                        this.value = autoHypenPhone(this.value);
                      } else {
                        this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
                      }
                    },
                    keypress: async function (e) {
                      if (e.key === "Enter") {
                        const index = Number(this.getAttribute("index"));
                        const thisFunc = receiptSubmitEvent(index).bind(this);
                        e.preventDefault();
                        e.stopPropagation();
                        if (index === 0) {
                          this.value = autoHypenPhone(this.value);
                        } else {
                          this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
                        }
                        await thisFunc(e);
                      }
                    },
                    blur: function (e) {
                      const index = Number(this.getAttribute("index"));
                      if (index === 0) {
                        this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
                        this.value = autoHypenPhone(this.value);
                      } else {
                        this.value = this.value.trim().replace(/[^0-9\-]/gi, '');
                      }
                    },
                  },
                  attribute: {
                    type: "text",
                    placeholder,
                    property,
                    value: "",
                    index: String(num),
                  },
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: withOut(0, ea),
                    height: String(receiptInputHeight) + ea,
                    top: String(receiptInputVisualTop) + ea,
                    outline: String(0),
                    border: String(0),
                    fontSize: String(receiptInputSize) + ea,
                    fontWeight: String(receiptInputWeight),
                    color: colorExtended.black,
                    textAlign: "center",
                    background: colorExtended.transparent,
                  }
                }
              },
              {
                attribute: {
                  index: String(num),
                },
                event: {
                  click: receiptSubmitEvent(num)
                },
                style: {
                  display: "inline-flex",
                  position: "relative",
                  width: String(submitButtonWidth) + ea,
                  height: String(submitButtonHeight) + ea,
                  background: colorExtended.gradientGray,
                  borderRadius: String(8) + "px",
                  marginLeft: String(submitButtonMargin) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                },
                child: {
                  text: "제출",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(submitButtonTextTop) + ea,
                    fontSize: String(submitButtonSize) + ea,
                    fontWeight: String(submitButtonWeight),
                    color: colorExtended.white,
                  }
                }
              },
            ]
          },
        ]
      });
      num++;
    }
    createNode({
      mother: whiteBase2,
      style: {
        display: "flex",
        position: "relative",
        width: withOut((boxInnerMargin * 2), ea),
        marginLeft: String(boxInnerMargin) + ea,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: String(matrixTongMarginTop) + ea,
      },
      children: [
        {
          text: receiptNotice.join("\n"),
          style: {
            fontSize: String(factorSize) + ea,
            fontWeight: String(400),
            color: colorExtended.black,
            display: "inline-block",
            position: "relative",
            top: String(0) + ea,
            lineHeight: String(1.7),
          },
          bold: {
            fontSize: String(factorSize) + ea,
            fontWeight: String(800),
            color: colorExtended.black,
          },
        },
        {
          mode: "svg",
          source: svgMaker.informationCircle(colorExtended.deactive, colorExtended.black),
          style: {
            display: "inline-block",
            position: "absolute",
            width: String(finalIconWidth) + ea,
            bottom: String(0) + ea,
            right: String(0) + ea,
          }
        }
      ]
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

FirstPaymentJs.prototype.payComplete = async function (data, pythonSend = true) {
  const instance = this;
  const { ajaxJson, returnGet, colorExtended } = GeneralJs;
  const { bill, requestNumber, completeInfo } = this;
  try {
    if (typeof data.MOID !== "string") {
      throw new Error("invaild data");
    }
    const getObj = returnGet();
    const bilid = bill.bilid;
    let year, month, date;
    let to;
    let requestNumber;
    let pastOid;
    let refresh;

    refresh = false;
    pastOid = window.localStorage.getItem("oid");
    if (typeof pastOid === "string") {
      if (pastOid === data.MOID) {
        refresh = true;
      } else {
        refresh = false;
        window.localStorage.setItem("oid", data.MOID);
      }
    } else {
      refresh = false;
      window.localStorage.setItem("oid", data.MOID);
    }

    requestNumber = this.requestNumber;
    if (getObj.request !== undefined) {
      if (!Number.isNaN(Number(getObj.request.replace(/[^0-9]/gi, '')))) {
        requestNumber = Number(getObj.request.replace(/[^0-9]/gi, ''));
      }
    }

    if (!refresh) {
      if (pythonSend) {
        await ajaxJson({ bilid, requestNumber, data }, PYTHONHOST + "/ghostClientBill");
      }
    }

    completeInfo.raw = data;
    if (data.CARD_BankCode !== undefined) {
      completeInfo.method = "card";
    } else {
      year = Number(data.VACT_Date.slice(0, 4));
      month = Number(data.VACT_Date.slice(4, -2).replace(/^0/, '')) - 1;
      date = Number(data.VACT_Date.slice(-2).replace(/^0/, ''));
      to = new Date(year, month, date, 15);
      to.setDate(to.getDate() - 1);
      completeInfo.method = data.REAL_Account === undefined ? "bank" : "real";
      completeInfo.when = to;
      completeInfo.where = {
        bank: data.vactBankName,
        account: data.VACT_Num,
        to: data.VACT_Name,
        input: data.VACT_InputName
      };
      completeInfo.price = Number(data.TotPrice);
    }

  } catch (e) {
    await GeneralJs.ajaxJson({ message: "FirstPaymentJs.payComplete : " + e.message }, BACKHOST + "/errorLog");
    window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
    window.location.reload();
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
    let proid;
    let projects, project;
    let cliid;
    let clients, client;
    let desid;
    let designers, designer;
    let service;
    let requestNumber;
    let kind, method;
    let needs;
    let bills, bill;
    let data;
    let totalNum, payNum, cancelNum;
    let clientRequestNumber;

    this.whiteConsultingBoxClassName = "whiteConsultingBoxClassName";

    if (getObj.cliid === undefined) {

      if (getObj.proid !== undefined) {
        proid = getObj.proid;
      } else {
        window.alert("잘못된 접근입니다!");
        throw new Error("invaild get object");
      }
      if (getObj.desid !== undefined) {
        desid = getObj.desid;
      } else {
        window.alert("잘못된 접근입니다!");
        throw new Error("invaild get object");
      }
  
      projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
      if (projects.length === 0) {
        window.alert("잘못된 접근입니다!");
        throw new Error("error spot 11 : " + "no projects");
      }
      project = projects[0];
      this.proid = proid;
      this.project = project;
      this.projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, BACKHOST + "/getProjectHistory");
      cliid = project.cliid;
  
      clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
      if (clients.length === 0) {
        window.alert("잘못된 접근입니다!");
        throw new Error("error spot 10 : " + "no clients");
      }
      client = clients[0];
      this.cliid = cliid;
      this.client = client;
      this.clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, BACKHOST + "/getClientHistory");
  
      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      clientRequestNumber = requestNumber;
      this.clientRequestNumber = requestNumber;
  
      designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
      if (designers.length === 0) {
        window.alert("잘못된 접근입니다!");
        throw new Error("error spot 12 : " + "no designers");
      }
      designer = designers[0];
      this.desid = desid;
      this.designer = designer;
  
      kind = "style";
      this.kind = kind;
      method = project.service.online ? "online" : "offline";
      this.method = method;

    } else {

      if (getObj.needs === undefined) {
        throw new Error("error spot 0 : " + JSON.stringify(getObj));
      }
      ({ needs, cliid } = getObj);
      if (needs.split(',').length !== 4) {
        throw new Error("error spot 1 : " + needs);
      }
      [ kind, desid, proid, method ] = needs.split(',');
      if (!/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(desid) || !/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.test(proid)) {
        throw new Error("error spot 2 : " + desid + ", " + proid);
      }

      clients = await ajaxJson({ whereQuery: { cliid } }, SECONDHOST + "/getClients", { equal: true });
      if (clients.length === 0) {
        throw new Error("error spot 3 : " + cliid);
      }
      designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
      if (designers.length === 0) {
        throw new Error("error spot 4 : " + desid);
      }
      projects = await ajaxJson({ whereQuery: { proid } }, SECONDHOST + "/getProjects", { equal: true });
      if (projects.length === 0) {
        throw new Error("error spot 5 : " + proid);
      }
  
      client = clients[0];
      this.client = client;
      designer = designers[0];
      this.designer = designer;
      project = projects[0];
      this.project = project;

      this.cliid = cliid;
      this.desid = desid;
      this.proid = proid;
      this.kind = kind;
      this.method = method;

      clientRequestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          clientRequestNumber = i;
          break;
        }
      }
      this.clientRequestNumber = clientRequestNumber;

    }

    bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": method } ] } }, PYTHONHOST + "/generalBill", { equal: true });
    if (bills.length === 0) {
      bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": (/off/gi.test(method) ? "online" : "offline") } ] } }, PYTHONHOST + "/generalBill", { equal: true });
      if (bills.length === 0) {
        window.alert("결제 안내 문서가 없습니다! 홈리에종에 문의해주세요!");
        throw new Error("error spot 15 : " + "no bills");
      }
    }
    bill = new StylingBill(bills[0]);

    this.bill = bill;
    this.class = kind;

    this.request = {
      name: "",
      amount: 0,
    };
    this.completeMode = false;
    this.completeInfo = {};

    this.requestNumber = 0;
    for (let i = 0; i < bill.requests.length; i++) {
      totalNum = 0;
      for (let { amount: { consumer } } of bill.requests[i].items) {
        totalNum += consumer;
      }
      payNum = 0;
      for (let { amount } of bill.requests[i].pay) {
        payNum += amount;
      }
      cancelNum = 0;
      for (let { amount } of bill.requests[i].cancel) {
        cancelNum += amount;
      }
      if (Math.floor(totalNum) > Math.floor(payNum) - Math.floor(cancelNum)) {
        this.requestNumber = i;
      }
    }
    if (getObj.request !== undefined) {
      if (!Number.isNaN(Number(getObj.request.replace(/[^0-9]/gi, '')))) {
        this.requestNumber = Number(getObj.request.replace(/[^0-9]/gi, ''));
      }
    }

    service = await ajaxJson({ key: "firstMeeting" }, BACKHOST + "/getServiceByKey", { equal: true });
    this.wordings = this.meetingWordings(service);
    this.paymentMethod = null;

    if (getObj.mobilecard !== undefined) {
      const { convertingData } = await ajaxJson({
        mode: "mobileCard",
        mid: getObj.mid,
        oid: getObj.oid,
        impId: getObj.imp_uid,
      }, BACKHOST + "/inicisPayment");
      if (convertingData.error === "error") {
        window.alert("결제에 실패하였습니다! 다시 시도해주세요!");
      } else {
        await this.payComplete(convertingData, false);
        this.completeMode = true;
        this.paymentMethod = "card";
      }
    }

    if (getObj.accountinfo !== undefined) {
      await ajaxJson({
        mode: "cashPhone",
        phone: instance.client.phone,
        hash: getObj.hash,
        bilid: instance.bill.bilid,
        proid: instance.project.proid,
        desid: instance.designer.desid,
        cliid: instance.client.cliid,
        name: instance.client.name,
      }, BACKHOST + "/inicisPayment");
      this.completeMode = true;
      this.paymentMethod = "account";
    }

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
          const thisBill = this.billWordings();
          instance.thisBill = thisBill;
          if (instance.completeMode) {
            if (instance.paymentMethod === "card") {
              await instance.insertCompleteBox();
            } else {
              await instance.insertAccountBox();
            }
          } else {
            await instance.insertInitBox();
            await instance.insertSecondBox();
            await instance.insertThirdBox();
          }
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
    window.alert("잘못된 접근입니다!");
    window.location.href = FRONTHOST;
  }
}
