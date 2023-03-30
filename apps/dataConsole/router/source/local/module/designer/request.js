DesignerJs.prototype.requestDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip, returnGet } = GeneralJs;
  const getObj = returnGet();
  const entireMode = (getObj.dataonly === "true" && getObj.entire === "true");
  let target, pastScrollTop;
  let loading;

  if (!middleMode) {
    this.pageHistory.unshift({ path: "request", status: "list", desid });
  }
  window.history.pushState({ path: "request", status: "list", desid }, '');

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.iconTong !== undefined && this.iconTong !== null) {
      this.iconTong.parentElement.removeChild(this.iconTong);
    }
    this.iconTong = null;
    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

  if (!middleMode) {
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
  }


  if (!entireMode) {
    this.requestIconSet(desid);
  }
  this.mother.loadingRun().then((dom) => {
    loading = dom;
    return ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getProjects", { equal: true });
  }).then((projects) => {
    if (projects.length === 0) {
      return [];
    } else {
      instance.designers.setProjects(projects);
      return ajaxJson({
        noFlat: true,
        whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) }
      }, "/getClients", { equal: true });
    }
  }).then((clients) => {
    loading.parentNode.removeChild(loading);
    instance.designers.setClients(clients);
    instance.requestList(desid);
    scrollTo(totalMother, pastScrollTop);
    if (callback !== null) {
      if (typeof callback === "function") {
        callback();
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}

DesignerJs.prototype.requestReturnStatic = function (designer, project, client, clientHistory, projectHistory, requestNumber) {
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
      spread: true,
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
      spread: true,
    }
  ];
  const pictureContents = "고객님이 선택한 사진";
  const pictureContentsSite = "고객님의 현장 사진";
  const pictureContentsPrefer = "고객님의 선호 사진";
  const pictures = clientHistory.curation.image;
  const noticeContents = [
    {
      title: "서비스비 안내",
      contents: [
        "이번 현장의 서비스비는 " + autoComma(project.process.contract.remain.calculation.amount.supply) + "원(VAT별도)으로 책정되어 있습니다.",
        "홈리에종의 계약금은 300,000원(VAT별도)으로 책정되어 있습니다.",
        "현재 고객은 홈리에종에 계약금 330,000원을 입금한 상태며, 현장 미팅 후 계약금을 제외한 서비스비를 전액 입금할 경우 서비스가 계속 진행됩니다.",
        "★ 현장 미팅 후 서비스비 지불 전에는 디자이너와 스타일링 논의를 할 수 없는 것이 원칙입니다.(고객에게도 필요시 안내해주세요)",
        "★ 서비스 진행중 타 공간에 대한 전체적인 스타일링이 추가되는 경우 꼭! 홈리에종을 통해 디자인비 조정이 될 수 있도록 해주세요.",
        "법인/개인사업자(일반과세), 개인사업자(간이과세), 프리랜서 정산 중에 정산 방식을 알려주시면 수수료를 제외한 정확한 정산액은 계산하여 말씀드리겠습니다.",
      ]
    },
    {
      title: "고객 안내 사항과 서비스 구성",
      contents: [
        "디자이너와 카톡(문자)/전화/메일 등의 채널을 통해 커뮤니케이션 하면서 전체 스타일링을 완성합니다. 커뮤니케이션에 적극적으로 참여해주시면 더 좋은 결과물을 얻으실 수 있습니다.",
        "디자이너와 현장 미팅을 진행하며 집컨디션/취향/생활특징/예산을 고려하여 컨설팅 해드립니다.",
        "시공팀은 추천하는 시공팀 외에 고객이 개별적으로 알아본 시공팀과 진행 가능합니다.",
        "시공 진행시 디자이너는 시공 방향 제시 및 전체 마감재를 셀렉해드립니다.",
        "기존에 사용하시는 가구들 중 가져갈 가구와 버릴가구 선택 및 배치/활용 제안 드립니다. 새로 구매하실 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안해드립니다.",
        "디자이너의 제안에 따라 패브릭 및 가구의 맞춤 제작이 가능합니다.",
        "생활용품, 식기, 가전은 스타일링 제안 범위에 포함되지 않습니다. 다만 선택하신 후 제품 외관의 디자인 옵션(컬러 등)을 의논하실 경우 전체 디자인을 고려하여 골라드립니다. 생활용품과 식기의 경우, 고객님께서 찾으신 3~4품목중에서 셀렉은 가능합니다.",
        "디자이너 제안 후 고객 컨펌이 완료된 구매제품은 고객이 구매하실 수 있도록 안내드립니다. 연계 업체의 제품 구매시에는 할인혜택을 받으실 수 있습니다. 모든 제품이 해당되는 것은 아니며 업체마다 차이가 있습니다.",
        "제품 구매에 소요되는 배송비, 조립 및 설치비는 고객님께서 부담하시게 됩니다. 배송된 제품의 수령, 언박싱, 조립, 1차배치는 고객님께서 진행하시게 됩니다. 구매 및 물품배치가 완료되면 디자이너의 마무리터치 후 인터뷰와 촬영을 진행합니다.",
      ]
    },
    {
      title: "시공 연계수수료 안내",
      contents: [
        "고객이 시공 계약을 체결한 곳에 공사진행과 A/S에 대한 책임이 있습니다. (고객에게 동일하게 안내합니다.)",
        "고객이 데려온 시공팀과 진행할 경우 디자이너는 시공자재 셀렉과 필요시 시공관련 커뮤니케이션 업무가 있을 수 있습니다.",
        "고객이 실장님 또는 실장님과 협업하시는 시공사와 시공 계약을 체결할 경우 전체 계약 금액의 5%가 시공 연계 수수료 입니다.",
        "홈리에종은 적법한 방식의 시공계약을 권장하며, (세금 없는) 현금 거래로 시공을 진행했을 경우에도 시공 연계 수수료는 공급가에 VAT 10%를 더한 금액으로 전자세금계산서를 발행합니다. 입금하실 때에도 공급가에 VAT10% 더한 금액을 입금해주셔야합니다.",
      ]
    },
    {
      title: "정산 안내",
      contents: [
        "홈리에종에서 받은 서비스비는 수수료를 제하고 스타일링 시작 후 실장님께 선금 50%를 먼저 정산하고",
        "스타일링이 마무리되면 나머지 50%를 정산합니다.",
        "스타일링 마무리는",
        "1) 스타일링 제안이 마무리되어 제품들이 배송단계에 있고",
        "2) 촬영일이 (변동되더라도) 어느정도 정해지고",
        "3) 실장님께서 디자이너의 디자인 의도가 담긴 글(폼을 따로 드립니다) 저희쪽에 주시면",
        "4) 홈리에종에서 고객님께 정산 여부를 확인 후 정산을 진행합니다.",
      ]
    }
  ];
  const divToInput = function (position) {
    return async function (e) {
      try {
        if (!middleMode) {
          const { ajaxJson, createNode, withOut, colorChip, equalJson } = GeneralJs;
          const removeClassName = "divToInputRemove";
          const target = this.firstChild.firstChild;
          const text = target.textContent;
          const mother = this.firstChild;
          const proid = project.proid;
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

            updateEvent = async function (column, value) {
              try {
                const targets = document.querySelectorAll('.' + removeClassName);
                await ajaxJson({
                  id: proid,
                  column,
                  value,
                  email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                }, "/updateProjectHistory");
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
              attribute: [
                { column: position },
                { value: text }
              ],
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
                      const column = this.getAttribute("column");
                      if (e.key === "Tab") {
                        await updateEvent(column, this.value);
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
                      const column = this.getAttribute("column");
                      if (e.key === "Enter") {
                        await updateEvent(column, this.value);
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }
              ],
              style: styleCopied
            });

            mother.removeChild(target);
            input.focus();

          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
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
    [ null, divToInput("request.client.name"), null, divToInput("request.space.contract") ],
    [ null, divToInput("request.client.phone"), null, divToInput("request.space.precheck") ],
    [ null, divToInput("request.client.family"), null, divToInput("request.space.empty") ],
    [ null, divToInput("request.client.address"), null, divToInput("request.space.movein") ],
    [ null, divToInput("request.client.address"), null, divToInput("request.space.special") ],
    [ null, divToInput("request.client.budget"), null, divToInput("request.space.composition") ],
    [ null, null, null, null ],
    [ null, divToInput("request.service.service"), divToInput("request.client.etc"), null ],
    [ null, divToInput("request.service.concept"), null, null ],
    [ null, divToInput("request.service.construct"), null, null ],
    [ null, divToInput("request.service.styling"), null, null ],
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
    noticeContents,
    divToInput,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  };
}

DesignerJs.prototype.requestList = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const mobile = this.media[4];
  const desktop = !mobile;
  const getObj = returnGet();
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
  let boxNumber, boxNumberArr;
  let requestBox, boxMargin;
  let projects;
  let requestSize;
  let requestWordMargin;
  let requestWordPaddingTop;
  let requestWordPaddingBottom;
  let thisChildWidth;
  let dateString;
  let baseTongPaddingBottom;
  let mobileOuterMargin;
  let borderRadius;
  let secondFont;
  let entireMode;
  let maxBoxNumber;

  entireMode = getObj.dataonly === "true" && getObj.entire === "true";

  designer = this.designers.pick(desid);
  projects = designer.projects;

  boxNumber = <%% 6, 6, 6, 6, 2 %%>;
  maxBoxNumber = projects.length;

  margin = 8;
  if (entireMode) {
    margin = 0;
  }
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
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

  requestSize = <%% 18, 18, 17, 16, 4.4 %%>;
  secondFont = <%% 2, 2, 2, 2, 1 %%>;
  requestWordMargin = <%% 1, 1, 1, 1, 0 %%>;
  requestWordPaddingTop = <%% (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), (isMac() ? 24 : 26), 4.8 %%>;
  requestWordPaddingBottom = <%% (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), (isMac() ? 20 : 18), 4.6 %%>;

  baseTongPaddingBottom = <%% 4, 4, 3, 3, 20 %%>;
  mobileOuterMargin = 4;

  borderRadius = <%% 10, 10, 10, 10, 8 %%>;

  if (mobile) {
    totalMother.style.background = colorChip.gray2;
  }

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String(margin * 3) + ea : (this.middleMode ? String(60) + "px" : String(0)),
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
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
      borderRadius: String(5) + "px",
      border: desktop ? (entireMode ? "" : "1px solid " + colorChip.gray4) : "",
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: desktop ? colorChip.gray0 : colorChip.gray1,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
      boxSizing: "border-box",
    }
  });

  this.requestBoxes = [];
  boxNumberArr = [];
  for (let i = 0; i < maxBoxNumber; i++) {

    if (/없음/gi.test(dateToString(projects[i].process.contract.form.date.from)) || /예정/gi.test(dateToString(projects[i].process.contract.form.date.from))) {
      dateString = "00.00.00";
    } else {
      dateString = dateToString(projects[i].process.contract.form.date.from).slice(2).replace(/\-/g, '.');
    }

    requestBox = createNode({
      mother: baseTong,
      event: {
        click: this.requestDocument(baseTong, i, designer, projects[i]),
        mouseenter: function (e) {
          this.style.transition = "";
          if (desktop) {
            this.children[0].style.background = colorChip.green;
            this.children[1].firstChild.style.color = colorChip.green;
            this.style.transform = "translateY(-3px)";
          }
        },
        mouseleave: function (e) {
          if (desktop) {
            this.children[0].style.background = colorChip.gray3;
            this.children[1].firstChild.style.color = colorChip.black;
            this.style.transform = "translateY(0px)";
          }
        }
      },
      attribute: [
        { cliid: projects[i].cliid },
        { proid: projects[i].proid },
      ],
      style: {
        position: entireMode ? "absolute" : "relative",
        display: "inline-block",
        width: entireMode ? String(100) + '%' : "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")",
        height: entireMode ? String(100) + '%' : "",
        left: entireMode ? String(0) : "",
        top: entireMode ? String(0) : "",
        borderRadius: String(borderRadius) + "px",
        marginTop: String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea,
        marginRight: String(boxMargin) + ea,
        marginLeft: String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea,
        marginBottom: String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea,
        background: colorChip.white,
        boxShadow: entireMode ? "" : "0px 3px 14px -9px " + colorChip.shadow,
        textAlign: "center",
        verticalAlign: "top",
        paddingTop: String(requestWordPaddingTop) + ea,
        paddingBottom: String(requestWordPaddingBottom) + ea,
        cursor: "pointer",
        transition: "all 0s ease",
        transform: "translateY(0px)",
      },
      children: [
        {
          style: {
            position: "absolute",
            top: String(0),
            width: String(100) + '%',
            left: String(0),
            height: String(desktop ? borderRadius : 2) + ea,
            background: colorChip.gray3,
            borderTopRightRadius: String(borderRadius / 2) + "px",
            borderTopLeftRadius: String(borderRadius / 2) + "px",
          }
        },
        {
          style: {
            position: "relative",
            marginBottom: String(requestWordMargin) + ea,
            textAlign: "center",
          },
          children: [
            {
              text: projects[i].name + " <b%고객님%b>",
              style: {
                fontSize: String(requestSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                display: "inline-block",
              },
              bold: {
                color: colorChip.black,
                fontWeight: String(300),
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
              text: dateString,
              style: {
                fontSize: String(requestSize - secondFont) + ea,
                fontWeight: String(300),
                color: colorChip.deactive,
                display: "inline-block",
              }
            }
          ]
        },
      ]
    });
    thisChildWidth = 0;
    for (let i = 1; i < Array.from(requestBox.children).length; i++) {
      if (thisChildWidth <= requestBox.children[i].firstChild.getBoundingClientRect().width) {
        thisChildWidth = requestBox.children[i].firstChild.getBoundingClientRect().width;
      }
    }
    thisChildWidth = thisChildWidth + (requestWordPaddingBottom * 3.2);

    if (desktop) {
      boxNumber = Math.floor((baseTong.getBoundingClientRect().width - (boxMargin * 2)) / (thisChildWidth + boxMargin));
      boxNumberArr.push(boxNumber);
    }

    this.requestBoxes.push(requestBox);
  }

  if (desktop) {
    boxNumberArr.sort((a, b) => { return b - a; });
    if (boxNumberArr.length > 0) {
      boxNumber = boxNumberArr[0];
      for (let i = 0; i < maxBoxNumber; i++) {
        this.requestBoxes[i].style.width = "calc(calc(100% - " + String((boxNumber + 2) * boxMargin) + ea + ") / " + String(boxNumber) + ")";
        this.requestBoxes[i].style.marginTop = String(Math.floor(i / boxNumber) === 0 ? boxMargin * 1.5 : boxMargin) + ea;
        this.requestBoxes[i].style.marginLeft = String(i % boxNumber === 0 ? boxMargin * 1.5 : 0) + ea;
        this.requestBoxes[i].style.marginBottom = String(Math.floor(i / boxNumber) === Math.floor((maxBoxNumber - 1) / boxNumber) ? (boxMargin * 1.5) : 0) + ea;
      }
    }
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.requestDocument = function (mother, index, designer, project) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, serviceParsing, setQueue, swipePatch, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const blocks = mother.children;
  const getObj = returnGet();
  this.proid = null;
  this.project = null;
  this.client = null;
  return async function (e) {
    try {
      const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });
      let clientHistory, projectHistory;
      let thisBlock, motherTop;
      let visualSpecific;
      let requestNumber, thisRequest;
      let site;
      let construct;
      let styling;
      let budget;
      let reloadBoo;
      let progress;

      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (project.proposal.date.valueOf() >= client.requests[i].request.timeline.valueOf()) {
          requestNumber = i;
          break;
        }
      }
      thisRequest = client.requests[requestNumber];

      clientHistory = await ajaxJson({ id: client.cliid, rawMode: true }, "/getClientHistory");
      projectHistory = await ajaxJson({ id: project.proid, rawMode: true }, "/getProjectHistory");

      reloadBoo = (JSON.stringify(projectHistory.request).replace(/[\{\}\[\]\"\' ]/gi, '').trim().replace(/[a-z]/gi, '').trim().replace(/[\:\,]/gi, '').trim().length === 0);
      if (e.altKey) {
        reloadBoo = window.confirm("정보를 다시 로드할 경우, 기존에 의뢰서 콘솔에서 적었던 내용이 없어질 수 있습니다! 초기화가 확실한가요?");
      }

      if (reloadBoo) {
        site = clientHistory.space.split("\n").map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
        construct = clientHistory.construct.split("\n").map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
        styling = clientHistory.styling.split("\n").map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
        budget = clientHistory.budget.split("\n").map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
        progress = clientHistory.progress.split("\n").map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });

        if (site.length === 0) {
          site = [ "현장 관련 상세 사항 없음" ];
        }
        if (construct.length === 0) {
          construct = [ "시공 관련 상세 사항 없음" ];
        }
        if (styling.length === 0) {
          styling = [ "스타일링 관련 상세 사항 없음" ];
        }
        if (budget.length === 0) {
          budget = [ "예산 관련 상세 사항 없음" ];
        }
        if (progress.length === 0) {
          progress = [ "기타 관련 상세 사항 없음" ];
        }

        projectHistory.request = {
          client: {
            name: client.name,
            phone: client.phone,
            family: thisRequest.request.family,
            address: thisRequest.request.space.address,
            budget: thisRequest.request.budget,
            etc: thisRequest.request.etc.comment
          },
          space: {
            contract: thisRequest.request.space.contract,
            precheck: dateToString(thisRequest.analytics.date.space.precheck) === "해당 없음" ? '-' : dateToString(thisRequest.analytics.date.space.precheck),
            empty: dateToString(thisRequest.analytics.date.space.empty) === "해당 없음" ? '-' : dateToString(thisRequest.analytics.date.space.empty),
            movein: (thisRequest.request.space.resident.expected.valueOf() <= (new Date()).valueOf() ? "거주중" : dateToString(thisRequest.request.space.resident.expected)),
            special: "",
            composition: "<" + String(thisRequest.request.space.pyeong) + "평> " + "방 " + String(thisRequest.request.space.spec.room) + "개, 화장실 " + String(thisRequest.request.space.spec.bathroom) + "개, 발코니 확장" + (thisRequest.request.space.spec.valcony ? "" : " 없음"),
          },
          service: {
            service: serviceParsing(project.service),
            concept: "모던 그레이",
            construct: clientHistory.curation.construct.items.length === 0 ? "시공 없음" : clientHistory.curation.construct.items.join(", "),
            styling: "전체 구매 또는 재배치"
          },
          about: {
            when: [ dateToString(project.process.contract.meeting.date, true, true) ],
            where: [ thisRequest.request.space.address ],
            site: site,
            construct: construct,
            styling: styling,
            budget: budget,
            progress: progress
          }
        };

        await ajaxJson({
          id: proid,
          column: "request",
          value: projectHistory.request,
          email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
        }, "/updateProjectHistory");
      }

      if (desktop) {

        if (getObj.dataonly === "true") {
          mother.style.height = String(mother.getBoundingClientRect().height) + ea;
          motherTop = 0;
        } else {
          mother.style.height = String(mother.getBoundingClientRect().height) + ea;
          motherTop = mother.getBoundingClientRect().top;

          visualSpecific = <%% 1, 1, 1, 0, 0 %%>;

          for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.transition = "all 0s ease";
            blocks[i].setAttribute("top", String(Math.floor(blocks[i].getBoundingClientRect().top - mother.getBoundingClientRect().top)) + ea);
            blocks[i].setAttribute("left", String(Math.floor(blocks[i].getBoundingClientRect().left - Math.ceil(mother.getBoundingClientRect().left))) + ea);
            if (i !== index) {
              blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
            } else {
              thisBlock = blocks[i];
              thisBlock.style.transform = "";
              for (let dom of blocks[i].children) {
                dom.style.opacity = String(0);
              }
            }
          }
  
          for (let block of blocks) {
            block.style.position = "absolute";
            block.style.margin = String(0);
            block.style.left = block.getAttribute("left");
            block.style.top = block.getAttribute("top");
          }

        }

      } else {
        motherTop = 3.8;

        for (let i = 0; i < blocks.length; i++) {
          blocks[i].style.animation = "fadedownlite 0.2s ease forwards";
          if (i === index) {
            thisBlock = blocks[i];
          }
        }
      }

      if (getObj.dataonly !== "true") {
        setQueue(() => {
          if (desktop) {
            thisBlock.style.boxShadow = "";
            thisBlock.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
            thisBlock.style.transition = "all 0.4s ease";
            thisBlock.style.position = "absolute";
            thisBlock.style.left = String(0);
            thisBlock.style.top = String(0);
            thisBlock.style.width = String(100) + '%';
            thisBlock.style.height = String(100) + '%';
          } else {
            for (let block of blocks) {
              block.style.position = "absolute";
            }
          }
  
          mother.parentElement.style.height = withOut(motherTop, ea);
          if (mobile) {
            mother.parentElement.style.left = String(0);
            mother.parentElement.style.width = String(100) + '%';
            mother.parentElement.style.paddingTop = "";
          }
          mother.style.boxShadow = "";
          mother.style.paddingBottom = "";
          mother.style.paddingTop = String(motherTop) + ea;
          mother.style.height = withOut(motherTop, ea);
          mother.style.overflow = "scroll";
  
          setQueue(async () => {
            try {
              mother.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
              const board = createNode({
                mother,
                style: {
                  position: "relative",
                  left: String(motherTop) + ea,
                  width: withOut(motherTop * 2, ea),
                  height: String(8000) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.white,
                  animation: "fadeupdelay 0.4s ease forwards",
                  boxShadow: "0px 3px 15px -10px " + colorChip.shadow,
                  zIndex: String(1),
                  marginBottom: String(motherTop) + ea,
                }
              });
              await instance.requestContents(board, designer, project, client, clientHistory, projectHistory, requestNumber);
              if (mobile) {
                mother.style.marginBottom = "";
              }
  
              if (mobile) {
                swipePatch({
                  right: (e) => {
                    instance.requestDetailLaunching(desid);
                  },
                });
              }
  
              instance.pageHistory.unshift({ path: "request", status: "card", desid, cliid });
              window.history.pushState({ path: "request", status: "list", desid }, '');
  
            } catch (e) {
              console.log(e);
            }
          }, 500);
  
        }, 400);
      } else {

        mother.parentElement.style.height = withOut(motherTop, ea);
        mother.style.boxShadow = "";
        mother.style.paddingBottom = "";
        mother.style.paddingTop = String(motherTop) + ea;
        mother.style.height = withOut(motherTop, ea);
        mother.style.overflow = "scroll";

        mother.style.background = desktop ? colorChip.gray0 : colorChip.gray2;
        const board = createNode({
          mother,
          style: {
            position: "relative",
            left: String(motherTop) + ea,
            width: withOut(motherTop * 2, ea),
            height: String(8000) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.white,
            zIndex: String(1),
            marginBottom: String(motherTop) + ea,
            transition: "all 0s ease",
          }
        });
        await instance.requestContents(board, designer, project, client, clientHistory, projectHistory, requestNumber);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.requestStaticHtml = function (designer, project, client, clientHistory, projectHistory, requestNumber, clientPhoto) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma, downloadFile } = GeneralJs;
  const { totalMother, grayBarWidth, middleMode } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const today = new Date();
  const ea = "px";
  const pe = "%";
  return async function (e) {
    try {
      const {
        title,
        initialContents,
        emptyReload,
        mainContents,
        pictureContents,
        pictureContentsSite,
        pictureContentsPrefer,
        pictures,
        noticeContents,
        divToInput,
        matrix,
        mergeMap,
        callbackMap,
        boldMap,
        titleMap,
        widthRatio,
      } = instance.requestReturnStatic(designer, project, client, clientHistory, projectHistory, requestNumber);
      for (let obj of mainContents) {
        obj.spread = true;
      }
      const loading = mother.grayLoading();
      const board = createNode({
        mother: document.body,
        style: {
          display: "none",
          position: "relative",
        }
      });
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
      let wordsBetween0, wordsBetween1, wordsBetween2;
      let leftIndent;
      let words;
      let arrowTop, arrowWidth, arrowLeft;
      let tempDom;
      let tableVisual;
      let lineHeight;
      let contentsClientPhoto;
      let contentsClientPhotoTong;
      let images, siteImages, preferImages;
      let photoWidth;
      let photoMargin;
      let photoNumber;
      let clientInfoBottom;
      let noticeDom;
      let finalBottom;
      let num;
      let whitePopupEvent;
      let html;

      topMargin = 42;
      leftMargin = 60;
      titleSize = 35;
      titlePaddingLeft = 1;
      titleBottom = 35;
      titlePaddingBottom = (isMac() ? 18 : 15);
      titleDateVisualBottom = (isMac() ? 2 : -3);

      fontSize = 15;
      contentsBetween = 32;

      clientInfoBottom = 42;
      clientInfoLeftWidth = 380;

      wordsBetween0 = 6;
      wordsBetween1 = 22;
      wordsBetween2 = 10;

      tableVisual = 18;
      leftIndent = 15;

      arrowTop = (isMac() ? 5.5 : 4);
      arrowWidth = 8;
      arrowLeft = 1;

      lineHeight = 1.8;
      photoWidth = 260;
      photoMargin = 10;
      finalBottom = 240;

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
              lineHeight: String(lineHeight),
              marginBottom: String(titleBottom) + ea,
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
          marginBottom: String(clientInfoBottom) + ea,
        },
        children: [
          {
            style: {
              position: "relative",
              top: String(0),
              paddingLeft: String(leftIndent) + ea,
              height: String(100) + '%',
              verticalAlign: "top",
              textAlign: "left",
              borderBottom: "1px solid " + colorChip.gray3,
              boxSizing: "border-box",
            }
          }
        ]
      });

      contentsClientInfo.appendChild(mother.makeTable(matrix, { style: { width: 1000 }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
      contentsClientInfo.children[1].style.display = "block";
      contentsClientInfo.children[1].style.verticalAlign = "top";
      contentsClientInfo.children[1].style.width = String(100) + pe;
      contentsClientInfo.children[1].style.marginTop = String(35) + ea;

      num = 0;
      for (let { title, className, contents, position, spread } of mainContents) {
        words = createNode({
          mother: contentsClientInfo.children[0],
          class: [ className ],
          text: title,
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            marginBottom: String(wordsBetween0) + ea,
            cursor: "pointer",
          }
        });
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
        createNode({
          mother: contentsClientInfo.children[0],
          class: [ className ],
          text: contents.map((z) => { return "<b%-%b> " + z.replace(/^\-/, '').replace(/^\- /, ''); }).map((z) => { if (z.trim() === "<b%-%b>") { return ""; } else { return z; } }).join("\n"),
          style: {
            position: "relative",
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            lineHeight: String(lineHeight),
            marginBottom: String(wordsBetween1) + ea,
            overflow: "hidden",
            transition: "all 0s ease",
            height: spread ? "auto" : String(0),
          },
          bold: {
            color: colorChip.gray4,
          }
        });
        num++;
      }

      images = pictures.map((image) => {
        const imageLink = "/corePortfolio/listImage";
        let pid;
        pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
        return S3HOST + imageLink + "/" + pid + "/" + image;
      });
      siteImages = clientPhoto.sitePhoto;
      preferImages = clientPhoto.preferredPhoto;

      photoNumber = 3;
      photoWidth = "calc(calc(100% - " + String(photoMargin * (photoNumber - 1)) + ea + ") / " + String(photoNumber) + ")";

      if (images.length > 0) {
        contentsClientPhoto = createNode({
          mother: contentsArea,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            marginBottom: String(clientInfoBottom) + ea,
          },
          children: [
            {
              text: pictureContents,
              style: {
                paddingLeft: String(leftIndent) + ea,
                position: "relative",
                display: "block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                marginBottom: String(wordsBetween1) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: mother.returnArrow("right", colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    left: String(arrowLeft) + ea,
                    top: String(arrowTop) + ea,
                  }
                }
              ]
            },
            {
              style: {
                position: "relative",
                display: "block",
              },
            }
          ]
        });
        contentsClientPhotoTong = contentsClientPhoto.children[1];

        for (let i = 0; i < images.length; i++) {
          createNode({
            mother: contentsClientPhotoTong,
            mode: "img",
            class: [ "hoverDefault_lite" ],
            attribute: [
              { src: images[i] },
              { index: String(i) },
              { method: /sitePhoto/g.test(images[i]) ? "site" : (/preferredPhoto/g.test(images[i]) ? "preferred" : "selected") },
              { length: String(images.length) }
            ],
            style: {
              display: "inline-block",
              position: "relative",
              width: photoWidth,
              borderRadius: String(3) + "px",
              marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
              marginBottom: String(Math.floor(i / photoNumber) === Math.floor((images.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
              cursor: "pointer",
              verticalAlign: "top",
            }
          });
        }
      }

      if (siteImages.length > 0) {
        contentsClientPhoto = createNode({
          mother: contentsArea,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            marginBottom: String(clientInfoBottom) + ea,
          },
          children: [
            {
              text: pictureContentsSite,
              style: {
                paddingLeft: String(leftIndent) + ea,
                position: "relative",
                display: "block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                marginBottom: String(wordsBetween1) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: mother.returnArrow("right", colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    left: String(arrowLeft) + ea,
                    top: String(arrowTop) + ea,
                  }
                }
              ]
            },
            {
              style: {
                position: "relative",
                display: "block",
              },
            }
          ]
        });
        contentsClientPhotoTong = contentsClientPhoto.children[1];

        for (let i = 0; i < siteImages.length; i++) {
          createNode({
            mother: contentsClientPhotoTong,
            mode: "img",
            class: [ "hoverDefault_lite" ],
            attribute: [
              { src: siteImages[i] },
              { index: String(i) },
              { method: /sitePhoto/g.test(siteImages[i]) ? "site" : (/preferredPhoto/g.test(siteImages[i]) ? "preferred" : "selected") },
              { length: String(siteImages.length) }
            ],
            style: {
              display: "inline-block",
              position: "relative",
              width: photoWidth,
              borderRadius: String(3) + "px",
              marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
              marginBottom: String(Math.floor(i / photoNumber) === Math.floor((siteImages.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
              cursor: "pointer",
              verticalAlign: "top",
            }
          });
        }
      }

      if (preferImages.length > 0) {
        contentsClientPhoto = createNode({
          mother: contentsArea,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            marginBottom: String(clientInfoBottom) + ea,
          },
          children: [
            {
              text: pictureContentsPrefer,
              style: {
                paddingLeft: String(leftIndent) + ea,
                position: "relative",
                display: "block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                marginBottom: String(wordsBetween1) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: mother.returnArrow("right", colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    left: String(arrowLeft) + ea,
                    top: String(arrowTop) + ea,
                  }
                }
              ]
            },
            {
              style: {
                position: "relative",
                display: "block",
              },
            }
          ]
        });
        contentsClientPhotoTong = contentsClientPhoto.children[1];

        for (let i = 0; i < preferImages.length; i++) {
          createNode({
            mother: contentsClientPhotoTong,
            mode: "img",
            class: [ "hoverDefault_lite" ],
            attribute: [
              { src: preferImages[i] },
              { index: String(i) },
              { method: /sitePhoto/g.test(preferImages[i]) ? "site" : (/preferredPhoto/g.test(preferImages[i]) ? "preferred" : "selected") },
              { length: String(preferImages.length) }
            ],
            style: {
              display: "inline-block",
              position: "relative",
              width: photoWidth,
              borderRadius: String(3) + "px",
              marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
              marginBottom: String(Math.floor(i / photoNumber) === Math.floor((preferImages.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
              cursor: "pointer",
              verticalAlign: "top",
            }
          });
        }
      }

      for (let { title, contents } of noticeContents) {
        noticeDom = createNode({
          mother: contentsArea,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            marginBottom: String(contentsBetween) + ea,
          },
          children: [
            {
              text: title,
              style: {
                paddingLeft: String(leftIndent) + ea,
                position: "relative",
                display: "block",
                fontSize: String(fontSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                marginBottom: String(wordsBetween2) + ea,
              },
              children: [
                {
                  mode: "svg",
                  source: mother.returnArrow("right", colorChip.green),
                  style: {
                    position: "absolute",
                    width: String(arrowWidth) + ea,
                    left: String(arrowLeft) + ea,
                    top: String(arrowTop) + ea,
                  }
                }
              ]
            },
            {
              text: contents.map((z) => { return "<b%-%b> " + z; }).join("\n"),
              style: {
                position: "relative",
                fontSize: String(fontSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                lineHeight: String(lineHeight),
              },
              bold: {
                color: colorChip.gray4,
              }
            }
          ]
        });
      }

      board.style.height = "auto";
      board.style.paddingBottom = String(finalBottom) + ea;

      html = String(`<!DOCTYPE html>
      <html lang="ko" dir="ltr">
        <head>
          <meta charset="utf-8">
          <style>${String(document.querySelector("style").innerHTML.replace(/'/gi, "__quotes__"))}</style>
          <title></title>
        </head>
        <body style="padding-top:${String(leftMargin)}${ea};padding-bottom:${String(leftMargin)}${ea};">
          ${String(board.innerHTML)}
        </body>
      </html>`).replace(/\=/gi, "__equal__").replace(/\&/gi, "__ampersand__").replace(/\'/gi, '');

      document.body.removeChild(document.body.lastChild);

      console.log("done");

      loading.remove();

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.requestContents = async function (board, designer, project, client, clientHistory, projectHistory, requestNumber) {
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, autoComma, blankHref, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth, middleMode } = this;
  const getObj = returnGet();
  const mobile = this.media[4];
  const desktop = !mobile;
  const desid = designer.desid;
  const proid = project.proid;
  const cliid = project.cliid;
  const entireMode = (getObj.dataonly === "true" && getObj.entire === "true");
  this.proid = proid;
  this.client = client;
  this.project = project;
  const today = new Date();
  const totalStatic = this.requestReturnStatic(designer, project, client, clientHistory, projectHistory, requestNumber);
  const {
    title,
    initialContents,
    emptyReload,
    mainContents,
    pictureContents,
    pictureContentsSite,
    pictureContentsPrefer,
    pictures,
    noticeContents,
    divToInput,
    matrix,
    mergeMap,
    callbackMap,
    boldMap,
    titleMap,
    widthRatio,
  } = totalStatic;
  try {
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
    let wordsBetween0, wordsBetween1, wordsBetween2;
    let leftIndent;
    let words;
    let arrowTop, arrowWidth, arrowLeft;
    let tempDom;
    let tableVisual;
    let lineHeight;
    let contentsClientPhoto;
    let contentsClientPhotoTong;
    let images, siteImages, preferImages;
    let photoWidth;
    let photoMargin;
    let photoNumber;
    let clientInfoBottom;
    let noticeDom;
    let finalBottom;
    let num;
    let whitePopupEvent;
    let clientPhoto;
    let positionArr;
    let imageTong;
    let tempImage;

    topMargin = <%% 42, 38, 32, 30, 5.8 %%>;
    leftMargin = <%% 50, 46, 38, 32, 5.8 %%>;

    titleSize = <%% 30, 32, 30, 26, 5 %%>;
    if (entireMode) {
      titleSize = 26;
    }
    titlePaddingLeft = <%% 1, 1, 1, 1, 0 %%>;
    titleBottom = <%% 35, 29, 28, 20, 5 %%>;
    titlePaddingBottom = <%% (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), (isMac() ? 16 : 14), 3.2 %%>;
    if (entireMode) {
      titlePaddingBottom = isMac() ? 13 : 12;
    }
    titleDateVisualBottom = <%% (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), (isMac() ? 2 : -3), 0.5 %%>;

    fontSize = <%% 15, 14, 13, 12, 3 %%>;
    contentsBetween = <%% 32, 28, 25, 22, 6 %%>;

    clientInfoBottom = <%% 42, 42, 42, 42, 7 %%>;
    clientInfoLeftWidth = <%% 380, 260, 215, 130, 20 %%>;

    wordsBetween0 = <%% 6, 6, 6, 6, 1 %%>;
    wordsBetween1 = <%% 22, 22, 22, 22, 4 %%>;
    wordsBetween2 = <%% 10, 10, 10, 10, 1 %%>;

    tableVisual = <%% 18, 18, 16, 10, 2 %%>;
    leftIndent = <%% 15, 14, 13, 12, 2.8 %%>;

    arrowTop = <%% (isMac() ? 5.5 : 4), (isMac() ? 5.5 : 4), (isMac() ? 5.5 : 4), (isMac() ? 5.5 : 4), 1.6 %%>;
    arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
    arrowLeft = <%% 1, 1, 1, 1, 0 %%>;

    lineHeight = 1.7;
    photoWidth = <%% 260, 260, 260, 260, 20 %%>;
    photoMargin = <%% 10, 10, 10, 10, 1.5 %%>;
    finalBottom = <%% 240, 240, 240, 240, 10 %%>;

    clientPhoto = await ajaxJson({ cliid }, BRIDGEHOST + "/clientPhoto");
    siteImages = clientPhoto.sitePhoto;
    preferImages = clientPhoto.preferredPhoto;

    siteImages.sort((a, b) => {
      const aArr = a.split("/");
      const bArr = b.split("/");
      const aFileWording = aArr[aArr.length - 1];
      const bFileWording = bArr[bArr.length - 1];
      if (/_[0-9]+/gi.test(aFileWording) && /_[0-9]+/gi.test(bFileWording)) {
        return Number(aFileWording.split("_")[aFileWording.split("_").length - 1].replace(/[^0-9]/gi, '')) - Number(bFileWording.split("_")[bFileWording.split("_").length - 1].replace(/[^0-9]/gi, ''));
      } else {
        return aFileWording < bFileWording ? 1 : -1;
      }
    });
    preferImages.sort((a, b) => {
      const aArr = a.split("/");
      const bArr = b.split("/");
      const aFileWording = aArr[aArr.length - 1];
      const bFileWording = bArr[bArr.length - 1];
      if (/_[0-9]+/gi.test(aFileWording) && /_[0-9]+/gi.test(bFileWording)) {
        return Number(aFileWording.split("_")[aFileWording.split("_").length - 1].replace(/[^0-9]/gi, '')) - Number(bFileWording.split("_")[bFileWording.split("_").length - 1].replace(/[^0-9]/gi, ''));
      } else {
        return aFileWording < bFileWording ? 1 : -1;
      }
    });

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
            fontWeight: String(700),
            color: colorChip.black,
          }
        },
        {
          text: "의뢰서 미리보기" + "&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;디자이너에게 전송하기&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;되돌아가기",
          attribute: { proid, cliid, desid },
          event: {
            click: async function (e) {
              try {
                const proid = this.getAttribute("proid");
                const cliid = this.getAttribute("cliid");
                const desid = this.getAttribute("desid");
                const [ standard, standard1 ] = [ ...this.querySelectorAll("b") ];
                if (e.x <= standard.getBoundingClientRect().x) {
                  blankHref(FRONTHOST + "/designer/process.php?proid=" + proid + "&mode=request");  
                } else if (e.x <= standard1.getBoundingClientRect().x) {
                  const [ designer ] = await ajaxJson({ noFlat: true, whereQuery: { desid } }, "/getDesigners", { equal: true });
                  const [ client ] = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });

                  if (window.confirm(designer.designer + " 디자이너님에게 " + client.name + " 고객님 홈스타일링 의뢰서 알림톡을 전송합니다. 확실합니까?")) {
                    ajaxJson({
                      method: "designerConsoleRequest",
                      name: designer.designer,
                      phone: designer.information.phone,
                      option: {
                        desid: designer.desid,
                        designer: designer.designer,
                        client: client.name,
                        host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
                        path: "process",
                        proid: proid,
                      }
                    }, "/alimTalk").then(() => {
                      return ajaxJson({
                        page: "request",
                        mode: "send",
                        who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
                        desid: designer.desid,
                        cliid: client.cliid,
                      }, "/ghostDesigner_updateAnalytics");
                    }).then(() => {
                      instance.mother.greenAlert("알림톡이 전송되었습니다!");
                    }).catch((err) => {
                      console.log(err);
                    });
                  } else {
                    instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
                  }
                } else {
                  globalThis.window.parent.postMessage(JSON.stringify({
                    proid: proid,
                    mode: "reset",
                  }));
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            position: "absolute",
            fontSize: String(fontSize) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            right: String(titlePaddingLeft) + ea,
            textAlign: "right",
            bottom: String(titlePaddingBottom - titleDateVisualBottom) + ea,
            cursor: "pointer",
          },
          under: {
            fontSize: String(fontSize) + ea,
            fontWeight: String(400),
            color: colorChip.gray3,
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
            lineHeight: String(lineHeight),
            marginBottom: String(titleBottom) + ea,
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
        marginBottom: String(clientInfoBottom) + ea,
      },
      children: [
        {
          style: {
            position: desktop ? "absolute" : "relative",
            top: String(0),
            paddingLeft: String(desktop ? leftIndent : 0) + ea,
            width: desktop ? String(clientInfoLeftWidth) + ea : String(100) + '%',
            height: String(100) + '%',
            verticalAlign: "top",
            textAlign: "left",
            overflow: "scroll",
            borderBottom: "1px solid " + colorChip.gray3,
            boxSizing: "border-box",
            paddingBottom: desktop ? "" : String(titleBottom) + ea
          }
        }
      ]
    });

    if (desktop) {
      width = (contentsClientInfo.getBoundingClientRect().width - clientInfoLeftWidth - contentsBetween - leftIndent - tableVisual) / sum;
      contentsClientInfo.appendChild(mother.makeTable(matrix, { style: { width }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }));
      contentsClientInfo.children[1].style.display = "inline-block";
      contentsClientInfo.children[1].style.verticalAlign = "top";
      this.fixTargets.push(contentsClientInfo.lastChild);
    } else {
      width = (100 - (Number(board.style.left.replace(/[^0-9\-\.]/gi, '')) * 2) - (leftMargin * 2)) / sum;
      contentsClientInfo.insertBefore(mother.makeTable(matrix, { style: { width }, mergeMap, callbackMap, boldMap, titleMap, widthRatio }), contentsClientInfo.firstChild);
      contentsClientInfo.children[0].style.marginBottom = String(contentsBetween) + ea;
      this.fixTargets.push(contentsClientInfo.firstChild);
    }

    whitePopupEvent = async function (e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        if (!middleMode) {
          const self = this;
          const index = Number(this.getAttribute("index"));
          const { title, contents } = mainContents[index];
          const position = this.getAttribute("position");
          const proid = this.getAttribute("proid");
          const className = this.getAttribute("className");
          const whiteCardClassName = "mainContentsWhiteCardClass";
          const widthStandard = this.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect().width;
          const heightStandard = this.parentElement.parentElement.parentElement.parentElement.parentElement.getBoundingClientRect().height;
          const [ titleDom, contentsDom ] = document.querySelectorAll('.' + className);
          let width, height;
          let topVisual;
          let frame;
          let textArea;
          let innerMargin, innerTopMargin;
          let base;
          let lineHeight, updateEvent;

          innerMargin = 38;
          innerTopMargin = 30;
          width = widthStandard * (3 / 4);
          height = heightStandard * (3 / 4);
          topVisual = 10;
          lineHeight = 1.7;

          updateEvent = async function (value) {
            try {
              let tempArr, doms;
              tempArr = value.split("\n").map((i) => { return i.trim(); });
              await ajaxJson({
                id: proid,
                column: position,
                value: tempArr,
                email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
              }, "/updateProjectHistory");
              mainContents[index].contents = tempArr;
              value = tempArr.map((i) => { return (i === '' ? "" : `<b style="${colorChip.gray4}">-</b> ${i}`); }).join("<br>");
              GeneralJs.cleanChildren(contentsDom);
              contentsDom.insertAdjacentHTML("beforeend", value);
              doms = document.querySelectorAll('.' + whiteCardClassName);
              for (let dom of doms) {
                dom.remove();
              }
            } catch (e) {
              console.log(e);
            }
          }

          GeneralJs.scrollTo(this.parentElement.parentElement.parentElement.parentElement.parentElement, 0);

          createNode({
            mother: this,
            class: [ whiteCardClassName ],
            events: [
              {
                type: "click",
                event: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  const doms = document.querySelectorAll('.' + whiteCardClassName);
                  for (let dom of doms) {
                    dom.remove();
                  }
                }
              },
            ],
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              background: colorChip.shadow,
              zIndex: String(2),
              animation: "justfadein 0.3s ease forwards",
            }
          });

          base = createNode({
            mother: this,
            class: [ whiteCardClassName ],
            events: [
              {
                type: "click",
                event: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              },
            ],
            style: {
              position: "fixed",
              top: String((heightStandard * (1 / 4) * (1 / 2)) - topVisual) + ea,
              left: withOut(50, width / 2, ea),
              width: String(width) + ea,
              height: String(height) + ea,
              background: colorChip.white,
              borderRadius: String(3) + "px",
              zIndex: String(2),
              animation: "fadeup 0.3s ease forwards",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              fontSize: String(fontSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          });
          frame = createNode({
            mother: base,
            style: {
              position: "relative",
              top: String(innerTopMargin) + ea,
              left: String(innerMargin) + ea,
              width: withOut(100, innerMargin * 2, ea),
              height: withOut(100, innerTopMargin * 2, ea),
            }
          });
          textArea = createNode({
            mother: frame,
            mode: "textarea",
            text: contents.join("\n"),
            events: [
              {
                type: "click",
                event: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }
              },
              {
                type: "keydown",
                event: async function (e) {
                  try {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      e.stopPropagation();
                      await updateEvent(this.value);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }
              },
            ],
            style: {
              position: "absolute",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              height: String(100) + '%',
              fontSize: String(fontSize) + ea,
              overflow: "scroll",
              border: String(0),
              outline: String(0),
              lineHeight: String(lineHeight),
              background: "transparent",
            }
          });

          textArea.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }
    num = 0;
    for (let { title, className, contents, position, spread } of mainContents) {
      words = createNode({
        mother: contentsClientInfo.children[desktop ? 0 : 1],
        attribute: [
          { index: String(num) },
          { position },
          { proid },
          { className },
          { toggle: spread ? "off" : "on" }
        ],
        events: [
          {
            type: "contextmenu",
            event: whitePopupEvent
          },
          {
            type: "click",
            event: function (e) {
              const toggle = this.getAttribute("toggle");
              if (toggle === "off") {
                this.nextElementSibling.style.height = String(0);
                this.querySelector("svg").style.transform = "rotate(0deg)";
                this.setAttribute("toggle", "on");
              } else {
                this.nextElementSibling.style.height = "auto";
                this.querySelector("svg").style.transform = "rotate(90deg)";
                this.setAttribute("toggle", "off");
              }
            }
          }
        ],
        class: [ className ],
        text: title,
        style: {
          position: "relative",
          fontSize: String(fontSize) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          marginBottom: String(wordsBetween0) + ea,
          paddingLeft: mobile ? String(leftIndent) + ea : "",
          cursor: "pointer",
        }
      });
      createNode({
        mother: words,
        mode: "svg",
        source: mother.returnArrow("right", colorChip.green),
        style: {
          position: "absolute",
          width: String(arrowWidth) + ea,
          left: String(desktop ? (-1 * leftIndent) + arrowLeft : 0) + ea,
          top: String(arrowTop) + ea,
          transform: spread ? "rotate(90deg)" : "rotate(0deg)",
        }
      });
      createNode({
        mother: contentsClientInfo.children[desktop ? 0 : 1],
        attribute: [
          { index: String(num) },
          { position },
          { proid },
          { className }
        ],
        class: [ className ],
        events: [
          {
            type: "click",
            event: whitePopupEvent
          }
        ],
        text: contents.map((z) => { return "<b%-%b> " + z.replace(/^\-/, '').replace(/^\- /, ''); }).map((z) => { if (z.trim() === "<b%-%b>") { return ""; } else { return z; } }).join("\n"),
        style: {
          position: "relative",
          fontSize: String(fontSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          lineHeight: String(lineHeight),
          marginBottom: String(wordsBetween1) + ea,
          overflow: "hidden",
          transition: "all 0s ease",
          height: spread ? "auto" : String(0),
        },
        bold: {
          color: colorChip.gray4,
        }
      });
      num++;
    }

    images = pictures.map((image) => {
      const imageLink = "/corePortfolio/listImage";
      let pid;
      pid = image.split('.')[0].replace(/^t[0-9]+/gi, '');
      return S3HOST + imageLink + "/" + pid + "/" + image;
    });

    if (images.length > 0) {
      contentsClientPhoto = createNode({
        mother: contentsArea,
        style: {
          position: "relative",
          display: "block",
          width: String(100) + '%',
          marginBottom: String(clientInfoBottom) + ea,
        },
        children: [
          {
            text: pictureContents,
            style: {
              paddingLeft: String(leftIndent) + ea,
              position: "relative",
              display: "block",
              fontSize: String(fontSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              marginBottom: String(wordsBetween1) + ea,
            },
            children: [
              {
                mode: "svg",
                source: mother.returnArrow("right", colorChip.green),
                style: {
                  position: "absolute",
                  width: String(arrowWidth) + ea,
                  left: String(arrowLeft) + ea,
                  top: String(arrowTop) + ea,
                }
              }
            ]
          },
          {
            style: {
              position: "relative",
              display: "block",
            },
          }
        ]
      });
      contentsClientPhotoTong = contentsClientPhoto.children[1];
      if (desktop) {
        photoNumber = Math.floor((contentsClientPhotoTong.getBoundingClientRect().width + photoMargin) / (photoWidth + photoMargin));
        photoWidth = (contentsClientPhotoTong.getBoundingClientRect().width - (photoMargin * (photoNumber - 1))) / photoNumber;
      } else {
        photoNumber = 2;
        photoWidth = (100 - (Number(board.style.left.replace(/[^0-9\-\.]/gi, '')) * 2) - (leftMargin * 2) - photoMargin) / photoNumber;
        photoMargin = photoMargin - 0.1;
      }

      positionArr = [];
      for (let i = 0; i < photoNumber; i++) {
        positionArr.push(createNode({
          mother: contentsClientPhotoTong,
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(100% - " + String(photoMargin * (photoNumber - 1)) + ea + ") / " + String(photoNumber) + ")",
            height: "auto",
            marginRight: String(i === photoNumber - 1 ? 0 : photoMargin) + ea,
            verticalAlign: "top",
          }
        }));
      }

      num = 0;
      imageTong = [];
      for (let i = 0; i < images.length; i++) {
        tempImage = createNode({
          mother: contentsClientPhotoTong,
          mode: "img",
          class: [ "hoverDefault_lite" ],
          attribute: [
            { src: images[i] },
            { index: String(i) },
            { method: /sitePhoto/g.test(images[i]) ? "site" : (/preferredPhoto/g.test(images[i]) ? "preferred" : "selected") },
            { length: String(images.length) }
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                if (desktop) {
                  e.preventDefault();
                  e.stopPropagation();
                  const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
                  const totalImages = equalJson(JSON.stringify(images));
                  const mother = document.getElementById("totalcontents");
                  const className = "photoSelectedTarget";
                  const length = Number(this.getAttribute("length"));
                  const zIndex = 3;
                  const wordDictionary = {
                    selected: "고객님이 선택한 사진",
                    site: "고객님이 보낸 현장",
                    preferred: "고객님의 선호 사진"
                  };
                  let img, height, imgBox;
                  let title, titleSize, bottom;
                  let titleBox;
                  let leftArrow, rightArrow;
                  let leftArrowBox, rightArrowBox;
                  let arrowHeight;
                  let arrowMargin;
                  let index, method, src;
                  let convertEvent;

                  index = Number(this.getAttribute("index"));
                  method = this.getAttribute("method");
                  src = this.getAttribute("src");

                  convertEvent = () => {};

                  height = 78;
                  titleSize = 2;
                  bottom = 6.6;
                  arrowHeight = 1.7;
                  arrowMargin = 78;

                  createNode({
                    mother,
                    class: [ className ],
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          const removeTargets = document.querySelectorAll('.' + className);
                          for (let dom of removeTargets) {
                            mother.removeChild(dom);
                          }
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
                    mother,
                    class: [ className ],
                    mode: "img",
                    attribute: [
                      { src },
                      { direction: "right" }
                    ],
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(0),
                      height: String(height) + '%',
                      width: "auto",
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                      borderRadius: String(3) + "px",
                    }
                  });
                  imgBox = img.getBoundingClientRect();
                  img.style.top = withOut(50, imgBox.height / 2, ea);
                  img.style.left = withOut(50, imgBox.width / 2, ea);

                  title = createNode({
                    mother,
                    events: [
                      {
                        type: [ "click", "dblclick", "selectstart" ],
                        event: (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }
                      }
                    ],
                    class: [ className ],
                    text: wordDictionary[method],
                    style: {
                      position: "fixed",
                      bottom: String(bottom) + '%',
                      fontSize: String(titleSize) + "vh",
                      fontWeight: String(600),
                      color: colorChip.whiteBlack,
                      left: String(50) + '%',
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                    }
                  });
                  titleBox = title.getBoundingClientRect();
                  title.style.left = withOut(50, titleBox.width / 2, ea);

                  leftArrow = createNode({
                    mother,
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
                  leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
                  leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

                  rightArrow = createNode({
                    mother,
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
                  rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
                  rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                  convertEvent = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const direction = this.getAttribute("direction");
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
                    targetImage = totalImages[targetIndex];
                    img.setAttribute("src", targetImage);
                    imgBox = img.getBoundingClientRect();
                    img.style.left = withOut(50, imgBox.width / 2, ea);
                    leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
                    rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                    index = targetIndex;
                    src = targetImage;
                    method = /sitePhoto/g.test(targetImage) ? "site" : (/preferredPhoto/g.test(targetImage) ? "preferred" : "selected");

                    title.textContent = wordDictionary[method];
                    titleBox = title.getBoundingClientRect();
                    title.style.left = withOut(50, titleBox.width / 2, ea);
                  }
                  leftArrow.addEventListener("click", convertEvent);
                  rightArrow.addEventListener("click", convertEvent);
                  img.addEventListener("click", convertEvent);
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(photoWidth) + ea,
            borderRadius: String(3) + "px",
            marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
            marginBottom: String(Math.floor(i / photoNumber) === Math.floor((images.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
            cursor: "pointer",
            verticalAlign: "top",
          }
        });

        imageTong.push(tempImage);
        if (imageTong.length === photoNumber) {
          positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
          imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
          for (let i = 0; i < imageTong.length; i++) {
            positionArr[i].appendChild(imageTong[i]);
          }
          imageTong = [];
          num = -1;
        }

        num++;
      }

      positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
      imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
      for (let i = 0; i < imageTong.length; i++) {
        positionArr[i].appendChild(imageTong[i]);
      }

    }

    if (siteImages.length > 0) {
      contentsClientPhoto = createNode({
        mother: contentsArea,
        style: {
          position: "relative",
          display: "block",
          width: String(100) + '%',
          marginBottom: String(clientInfoBottom) + ea,
        },
        children: [
          {
            text: pictureContentsSite,
            style: {
              paddingLeft: String(leftIndent) + ea,
              position: "relative",
              display: "block",
              fontSize: String(fontSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              marginBottom: String(wordsBetween1) + ea,
            },
            children: [
              {
                mode: "svg",
                source: mother.returnArrow("right", colorChip.green),
                style: {
                  position: "absolute",
                  width: String(arrowWidth) + ea,
                  left: String(arrowLeft) + ea,
                  top: String(arrowTop) + ea,
                }
              }
            ]
          },
          {
            style: {
              position: "relative",
              display: "block",
            },
          }
        ]
      });
      contentsClientPhotoTong = contentsClientPhoto.children[1];
      if (desktop) {
        photoNumber = Math.floor((contentsClientPhotoTong.getBoundingClientRect().width + photoMargin) / (photoWidth + photoMargin));
        photoWidth = (contentsClientPhotoTong.getBoundingClientRect().width - (photoMargin * (photoNumber - 1))) / photoNumber;
      } else {
        photoNumber = 2;
        photoWidth = (100 - (Number(board.style.left.replace(/[^0-9\-\.]/gi, '')) * 2) - (leftMargin * 2) - photoMargin) / photoNumber;
      }

      positionArr = [];
      for (let i = 0; i < photoNumber; i++) {
        positionArr.push(createNode({
          mother: contentsClientPhotoTong,
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(100% - " + String(photoMargin * (photoNumber - 1)) + ea + ") / " + String(photoNumber) + ")",
            height: "auto",
            marginRight: String(i === photoNumber - 1 ? 0 : photoMargin) + ea,
            verticalAlign: "top",
          }
        }));
      }

      num = 0;
      imageTong = [];
      for (let i = 0; i < siteImages.length; i++) {
        tempImage = createNode({
          mother: contentsClientPhotoTong,
          mode: "img",
          class: [ "hoverDefault_lite" ],
          attribute: [
            { src: siteImages[i] },
            { index: String(i) },
            { method: /sitePhoto/g.test(siteImages[i]) ? "site" : (/preferredPhoto/g.test(siteImages[i]) ? "preferred" : "selected") },
            { length: String(siteImages.length) }
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                if (desktop) {
                  e.preventDefault();
                  e.stopPropagation();
                  const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
                  const totalImages = equalJson(JSON.stringify(siteImages));
                  const mother = document.getElementById("totalcontents");
                  const className = "photoSelectedTarget";
                  const length = Number(this.getAttribute("length"));
                  const zIndex = 3;
                  const wordDictionary = {
                    selected: "고객님이 선택한 사진",
                    site: "고객님이 보낸 현장",
                    preferred: "고객님의 선호 사진"
                  };
                  let img, height, imgBox;
                  let title, titleSize, bottom;
                  let titleBox;
                  let leftArrow, rightArrow;
                  let leftArrowBox, rightArrowBox;
                  let arrowHeight;
                  let arrowMargin;
                  let index, method, src;
                  let convertEvent;

                  index = Number(this.getAttribute("index"));
                  method = this.getAttribute("method");
                  src = this.getAttribute("src");

                  convertEvent = () => {};

                  height = 78;
                  titleSize = 2;
                  bottom = 6.6;
                  arrowHeight = 1.7;
                  arrowMargin = 78;

                  createNode({
                    mother,
                    class: [ className ],
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          const removeTargets = document.querySelectorAll('.' + className);
                          for (let dom of removeTargets) {
                            mother.removeChild(dom);
                          }
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
                    mother,
                    class: [ className ],
                    mode: "img",
                    attribute: [
                      { src },
                      { direction: "right" }
                    ],
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(0),
                      height: String(height) + '%',
                      width: "auto",
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                      borderRadius: String(3) + "px",
                    }
                  });
                  imgBox = img.getBoundingClientRect();
                  img.style.top = withOut(50, imgBox.height / 2, ea);
                  img.style.left = withOut(50, imgBox.width / 2, ea);

                  title = createNode({
                    mother,
                    events: [
                      {
                        type: [ "click", "dblclick", "selectstart" ],
                        event: (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }
                      }
                    ],
                    class: [ className ],
                    text: wordDictionary[method],
                    style: {
                      position: "fixed",
                      bottom: String(bottom) + '%',
                      fontSize: String(titleSize) + "vh",
                      fontWeight: String(600),
                      color: colorChip.whiteBlack,
                      left: String(50) + '%',
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                    }
                  });
                  titleBox = title.getBoundingClientRect();
                  title.style.left = withOut(50, titleBox.width / 2, ea);

                  leftArrow = createNode({
                    mother,
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
                  leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
                  leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

                  rightArrow = createNode({
                    mother,
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
                  rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
                  rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                  convertEvent = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const direction = this.getAttribute("direction");
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
                    targetImage = totalImages[targetIndex];
                    img.setAttribute("src", targetImage);
                    imgBox = img.getBoundingClientRect();
                    img.style.left = withOut(50, imgBox.width / 2, ea);
                    leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
                    rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                    index = targetIndex;
                    src = targetImage;
                    method = /sitePhoto/g.test(targetImage) ? "site" : (/preferredPhoto/g.test(targetImage) ? "preferred" : "selected");

                    title.textContent = wordDictionary[method];
                    titleBox = title.getBoundingClientRect();
                    title.style.left = withOut(50, titleBox.width / 2, ea);
                  }
                  leftArrow.addEventListener("click", convertEvent);
                  rightArrow.addEventListener("click", convertEvent);
                  img.addEventListener("click", convertEvent);
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(photoWidth) + ea,
            borderRadius: String(3) + "px",
            marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
            marginBottom: String(Math.floor(i / photoNumber) === Math.floor((siteImages.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
            cursor: "pointer",
            verticalAlign: "top",
          }
        });

        imageTong.push(tempImage);
        if (imageTong.length === photoNumber) {
          positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
          imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
          for (let i = 0; i < imageTong.length; i++) {
            positionArr[i].appendChild(imageTong[i]);
          }
          imageTong = [];
          num = -1;
        }

        num++;
      }

      positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
      imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
      for (let i = 0; i < imageTong.length; i++) {
        positionArr[i].appendChild(imageTong[i]);
      }

    }

    if (preferImages.length > 0) {
      contentsClientPhoto = createNode({
        mother: contentsArea,
        style: {
          position: "relative",
          display: "block",
          width: String(100) + '%',
          marginBottom: String(clientInfoBottom) + ea,
        },
        children: [
          {
            text: pictureContentsPrefer,
            style: {
              paddingLeft: String(leftIndent) + ea,
              position: "relative",
              display: "block",
              fontSize: String(fontSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              marginBottom: String(wordsBetween1) + ea,
            },
            children: [
              {
                mode: "svg",
                source: mother.returnArrow("right", colorChip.green),
                style: {
                  position: "absolute",
                  width: String(arrowWidth) + ea,
                  left: String(arrowLeft) + ea,
                  top: String(arrowTop) + ea,
                }
              }
            ]
          },
          {
            style: {
              position: "relative",
              display: "block",
            },
          }
        ]
      });
      contentsClientPhotoTong = contentsClientPhoto.children[1];
      if (desktop) {
        photoNumber = Math.floor((contentsClientPhotoTong.getBoundingClientRect().width + photoMargin) / (photoWidth + photoMargin));
        photoWidth = (contentsClientPhotoTong.getBoundingClientRect().width - (photoMargin * (photoNumber - 1))) / photoNumber;
      } else {
        photoNumber = 2;
        photoWidth = (100 - (Number(board.style.left.replace(/[^0-9\-\.]/gi, '')) * 2) - (leftMargin * 2) - photoMargin) / photoNumber;
      }

      positionArr = [];
      for (let i = 0; i < photoNumber; i++) {
        positionArr.push(createNode({
          mother: contentsClientPhotoTong,
          style: {
            position: "relative",
            display: "inline-block",
            width: "calc(calc(100% - " + String(photoMargin * (photoNumber - 1)) + ea + ") / " + String(photoNumber) + ")",
            height: "auto",
            marginRight: String(i === photoNumber - 1 ? 0 : photoMargin) + ea,
            verticalAlign: "top",
          }
        }));
      }

      num = 0;
      imageTong = [];
      for (let i = 0; i < preferImages.length; i++) {
        tempImage = createNode({
          mother: contentsClientPhotoTong,
          mode: "img",
          class: [ "hoverDefault_lite" ],
          attribute: [
            { src: preferImages[i] },
            { index: String(i) },
            { method: /sitePhoto/g.test(preferImages[i]) ? "site" : (/preferredPhoto/g.test(preferImages[i]) ? "preferred" : "selected") },
            { length: String(preferImages.length) }
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                if (desktop) {
                  e.preventDefault();
                  e.stopPropagation();
                  const { createNode, withOut, colorChip, equalJson, downloadFile } = GeneralJs;
                  const totalImages = equalJson(JSON.stringify(preferImages));
                  const mother = document.getElementById("totalcontents");
                  const className = "photoSelectedTarget";
                  const length = Number(this.getAttribute("length"));
                  const zIndex = 3;
                  const wordDictionary = {
                    selected: "고객님이 선택한 사진",
                    site: "고객님이 보낸 현장",
                    preferred: "고객님의 선호 사진"
                  };
                  let img, height, imgBox;
                  let title, titleSize, bottom;
                  let titleBox;
                  let leftArrow, rightArrow;
                  let leftArrowBox, rightArrowBox;
                  let arrowHeight;
                  let arrowMargin;
                  let index, method, src;
                  let convertEvent;

                  index = Number(this.getAttribute("index"));
                  method = this.getAttribute("method");
                  src = this.getAttribute("src");

                  convertEvent = () => {};

                  height = 78;
                  titleSize = 2;
                  bottom = 6.6;
                  arrowHeight = 1.7;
                  arrowMargin = 78;

                  createNode({
                    mother,
                    class: [ className ],
                    events: [
                      {
                        type: "click",
                        event: function (e) {
                          const removeTargets = document.querySelectorAll('.' + className);
                          for (let dom of removeTargets) {
                            mother.removeChild(dom);
                          }
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
                    mother,
                    class: [ className ],
                    mode: "img",
                    attribute: [
                      { src },
                      { direction: "right" }
                    ],
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(0),
                      height: String(height) + '%',
                      width: "auto",
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                      borderRadius: String(3) + "px",
                    }
                  });
                  imgBox = img.getBoundingClientRect();
                  img.style.top = withOut(50, imgBox.height / 2, ea);
                  img.style.left = withOut(50, imgBox.width / 2, ea);

                  title = createNode({
                    mother,
                    events: [
                      {
                        type: [ "click", "dblclick", "selectstart" ],
                        event: (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }
                      }
                    ],
                    class: [ className ],
                    text: wordDictionary[method],
                    style: {
                      position: "fixed",
                      bottom: String(bottom) + '%',
                      fontSize: String(titleSize) + "vh",
                      fontWeight: String(600),
                      color: colorChip.whiteBlack,
                      left: String(50) + '%',
                      zIndex: String(zIndex),
                      transition: "all 0s ease",
                      animation: "fadeuplite 0.2s ease forwards",
                    }
                  });
                  titleBox = title.getBoundingClientRect();
                  title.style.left = withOut(50, titleBox.width / 2, ea);

                  leftArrow = createNode({
                    mother,
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
                  leftArrow.style.top = withOut(50, leftArrowBox.height / 2, ea);
                  leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);

                  rightArrow = createNode({
                    mother,
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
                  rightArrow.style.top = withOut(50, rightArrowBox.height / 2, ea);
                  rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                  convertEvent = function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const direction = this.getAttribute("direction");
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
                    targetImage = totalImages[targetIndex];
                    img.setAttribute("src", targetImage);
                    imgBox = img.getBoundingClientRect();
                    img.style.left = withOut(50, imgBox.width / 2, ea);
                    leftArrow.style.left = withOut(50, (imgBox.width / 2) + arrowMargin, ea);
                    rightArrow.style.left = withOut(50, ((imgBox.width / 2) + arrowMargin - rightArrowBox.width) * -1, ea);

                    index = targetIndex;
                    src = targetImage;
                    method = /sitePhoto/g.test(targetImage) ? "site" : (/preferredPhoto/g.test(targetImage) ? "preferred" : "selected");

                    title.textContent = wordDictionary[method];
                    titleBox = title.getBoundingClientRect();
                    title.style.left = withOut(50, titleBox.width / 2, ea);
                  }
                  leftArrow.addEventListener("click", convertEvent);
                  rightArrow.addEventListener("click", convertEvent);
                  img.addEventListener("click", convertEvent);
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            width: String(photoWidth) + ea,
            borderRadius: String(3) + "px",
            marginRight: String(i % photoNumber === photoNumber - 1 ? 0 : photoMargin) + ea,
            marginBottom: String(Math.floor(i / photoNumber) === Math.floor((preferImages.length - 1) / photoNumber) ? 0 : photoMargin) + ea,
            cursor: "pointer",
            verticalAlign: "top",
          }
        });

        imageTong.push(tempImage);
        if (imageTong.length === photoNumber) {
          positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
          imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
          for (let i = 0; i < imageTong.length; i++) {
            positionArr[i].appendChild(imageTong[i]);
          }
          imageTong = [];
          num = -1;
        }

        num++;
      }

      positionArr.sort((a, b) => { return a.getBoundingClientRect().height - b.getBoundingClientRect().height; });
      imageTong.sort((a, b) => { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; });
      for (let i = 0; i < imageTong.length; i++) {
        positionArr[i].appendChild(imageTong[i]);
      }

    }

    for (let { title, contents } of noticeContents) {
      noticeDom = createNode({
        mother: contentsArea,
        style: {
          position: "relative",
          display: "block",
          width: String(100) + '%',
          marginBottom: String(contentsBetween) + ea,
        },
        children: [
          {
            text: title,
            style: {
              paddingLeft: String(leftIndent) + ea,
              position: "relative",
              display: "block",
              fontSize: String(fontSize) + ea,
              fontWeight: String(600),
              color: colorChip.black,
              marginBottom: String(wordsBetween2) + ea,
            },
            children: [
              {
                mode: "svg",
                source: mother.returnArrow("right", colorChip.green),
                style: {
                  position: "absolute",
                  width: String(arrowWidth) + ea,
                  left: String(arrowLeft) + ea,
                  top: String(arrowTop) + ea,
                }
              }
            ]
          },
          {
            text: contents.map((z) => { return "<b%-%b> " + z; }).join("\n"),
            style: {
              position: "relative",
              fontSize: String(fontSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              lineHeight: String(lineHeight),
            },
            bold: {
              color: colorChip.gray4,
            }
          }
        ]
      });
    }

    board.style.height = "auto";
    board.style.paddingBottom = String(finalBottom) + ea;

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
  let mother;
  let radius;
  let left, bottom;
  let left2;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 18.5, 17, 15, 6 %%>;
  left = <%% 40, 30, 25, 19, 0 %%>;
  left2 = <%% 40, 36, 36, 19, 0 %%>;
  bottom = <%% 40, 36, 30, 22, 7.2 %%>;
  margin = <%% 6, 5, 4, 4, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = <%% 12.5, 12, 11, 10, 3.8 %%>;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    class: [ "iconTong" ],
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
        display: (instance.middleMode ? "none" : "block"),
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
        display: (instance.middleMode ? "none" : "block"),
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

  this.iconTong = mother;
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
      instance.requestDetailLaunching(previousDesid);
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
      instance.requestDetailLaunching(nextDesid);
    });

  } else {

    if (desktop) {

      listIcon.addEventListener("click", function (e) {
        const totalContents = document.getElementById("totalcontents");
        const totalMother = document.querySelector(".totalMother");
        const grayBack = totalContents.children[0];
        const listPannel = totalMother.children[0].children[0];
        const iconSetPannel = instance.iconTong;
        const mainBaseTong = instance.mainBaseTong;
        const outerMargin = Number(mainBaseTong.style.top.replace(/[^0-9\.\-]/gi, ''));

        if (grayBack.getAttribute("toggle") !== "off") {
          grayBack.style.width = String(0) + ea;
          listPannel.style.transform = "translateX(" + String((instance.grayBarWidth + instance.tabletWidth) * -1) + ea + ")";
          iconSetPannel.style.background = "transparent";
          mainBaseTong.style.left = String(outerMargin) + ea;
          mainBaseTong.style.width = withOut(outerMargin * 2, ea);
          instance.listIcon.style.left = String(left2) + ea;
          grayBack.setAttribute("toggle", "off");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) + instance.grayBarWidth) + ea;
          }
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          instance.listIcon.style.left = String(left) + ea;
          grayBack.setAttribute("toggle", "on");
          if (instance.fixTargets.length > 0) {
            instance.fixTargets[0].style.width = String(Number(instance.fixTargets[0].style.width.replace(/[^0-9\-\.]/gi, '')) - instance.grayBarWidth) + ea;
          }
        }

      });

    } else {

      listIcon.addEventListener("click", function (e) {
        instance.mode = "request";
        instance.requestDetailLaunching(designer.desid);
      });

    }

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
    if (instance.proid === null) {
      window.alert("의뢰서를 선택해주세요!");
    } else {
      window.location.href = window.location.protocol + "//" + window.location.host + "/project?proid=" + instance.proid;
    }
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
    if (instance.proid === null) {
      if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsole",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
            path: "requests",
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "request",
            mode: "send",
            who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    } else {
      if (window.confirm(designer.designer + " 디자이너님에게 " + instance.client.name + " 고객님 홈스타일링 의뢰서 알림톡을 전송합니다. 확실합니까?")) {
        GeneralJs.ajaxJson({
          method: "designerConsoleRequest",
          name: designer.designer,
          phone: designer.information.phone,
          option: {
            desid: designer.desid,
            designer: designer.designer,
            client: instance.client.name,
            host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
            path: "process",
            proid: instance.proid,
          }
        }, "/alimTalk").then(() => {
          return GeneralJs.ajaxJson({
            page: "request",
            mode: "send",
            who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
            desid: designer.desid,
            cliid: instance.client.cliid,
          }, "/ghostDesigner_updateAnalytics");
        }).then(() => {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
        }).catch((err) => {
          console.log(err);
        });
      } else {
        instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
      }
    }
  });

}

DesignerJs.prototype.requestView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    const entireMode = GeneralJs.returnGet().dataonly === "true" && GeneralJs.returnGet().entire === "true";

    if (!entireMode) {
      this.backGrayBar();
    }
    await this.spreadData(null, true, middleMode ? "middle" : null);

    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
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

    if (entireMode) {
      this.grayBarWidth = 0;
      this.belowHeight = 0;
      this.mother.belowHeight = 0;
    }

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[2];
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
            instance.requestDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.requestDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
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
      if (this.designers.pick(this.standardDoms[i].getAttribute("desid")) !== null) {
        this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
        this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
        this.standardDoms[i].style.transition = "all 0s ease";
        this.standardDoms[i].addEventListener("click", (e) => {
          instance.requestDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
        });
        children = this.standardDoms[i].children;
        childrenLength = children.length;
        for (let j = 0; j < childrenLength; j++) {
          children[j].style.color = "inherit";
          children[j].style.transition = "all 0s ease";
        }
      } else {
        this.standardDoms[i].style.display = "none";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          if (instance.pageHistory[1].status === "list") {
            instance.requestDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else {
            instance.requestDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        }
      }
    });

    //launching
    this.proid = null;
    this.project = null;
    this.client = null;
    this.requestBoxes = [];
    this.requestDetailLaunching(this.desid, async () => {
      if (getObj.cliid !== undefined) {
        if (getObj.desid === undefined) {
          projects = await ajaxJson({ noFlat: true, whereQuery: { $and: [ { cliid: getObj.cliid }, { desid: { $regex: "^d" } } ] } }, "/getProjects");
          if (projects.length > 0) {
            instance.requestDetailLaunching(projects[0].desid, () => {
              for (let box of instance.requestBoxes) {
                if (box.getAttribute("cliid") === getObj.cliid) {
                  box.click();
                }
              }
            });
          }
        } else {
          for (let box of instance.requestBoxes) {
            if (box.getAttribute("cliid") === getObj.cliid) {
              box.click();
            }
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}
