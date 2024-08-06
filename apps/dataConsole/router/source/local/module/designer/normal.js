DesignerJs.prototype.normalDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows, profileList, workList, representativeList, statusCheckLog } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute, equalJson } = GeneralJs;
  try {
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    const now = new Date();
    const past = new Date();
    const yearsAgo = new Date();
    const agoDelta = 6;
    const agoYearDelta = 1;
    let columns;
    let values;
    let timeDelta;
    let year, month;
    let filteredProjectsProposal;
    let filteredProjectsContract;
    let thisTarget;
    let thisValueDoms;
    let yearDelta;
    let monthDelta;
    let tempDate;
    let tempString;
    let thisYear, from, to;
    let filteredFilteredProjectsProposal;
    let filteredFilteredProjectsContract;
    let thisDate;
    let standards;
    let thisValueTemp;
    let filteredChecklistSendRows;
    let filteredProfileSendRows;
    let filteredWorkSendRows;
    let completeAnalyticsRows;
    let profileListSet;
    let workListSet0, workListSet1, workListSet2, workListSet3;
    let filteredCareerSendRows;
    let filteredEntireSendRows;
    let careerUpdateBoo;
    let schoolUpdateBoo;
    let threeStrengthBoo;
    let representativeBoo;
    let filteredBasicEducationSendRows;
    let filteredConsoleEducationSendRows;
    let filteredSettingPortfolioSendRows;
    let filteredStatusCheckSendRows;
    let filteredStatusCheckLog;

    past.setFullYear(past.getFullYear() - agoYearDelta);
    past.setMonth(0);
    past.setDate(1);
    past.setHours(9);
    past.setMinutes(0);
    past.setSeconds(0);

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1;
    monthDelta = calcMonthDelta(yearsAgo, now);

    profileListSet = [ ...new Set(profileList.map((o) => { return o.desid })) ];
    workListSet0 = [ ...new Set(workList[0].map((o) => { return o.desid })) ];
    workListSet1 = [ ...new Set(workList[1].map((o) => { return o.desid })) ];
    workListSet2 = [ ...new Set(workList[2].map((o) => { return o.desid })) ];
    workListSet3 = [ ...new Set(workList[3].map((o) => { return o.desid })) ];

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "desid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "일괄 안내 전송",
        width: 100,
        name: "entireNoticeSend",
        type: "date",
      },
      {
        title: "프로필 안내 전송",
        width: 100,
        name: "profilePhotoNoticeSend",
        type: "date",
      },
      {
        title: "작업물 안내 전송",
        width: 100,
        name: "workingPhotoNoticeSend",
        type: "date",
      },
      {
        title: "경력 안내 전송",
        width: 100,
        name: "careerSchoolNoticeSend",
        type: "date",
      },
      {
        title: "가이드 전송",
        width: 100,
        name: "basicEducationSend",
        type: "date",
      },
      {
        title: "콘솔 교육 전송",
        width: 100,
        name: "consoleEducationSend",
        type: "date",
      },
      {
        title: "세트 포폴 전송",
        width: 100,
        name: "settingPortfolioSend",
        type: "date",
      },
      {
        title: "상태 체크 전송",
        width: 100,
        name: "statusCheckSend",
        type: "date",
      },
      {
        title: "상태 체크 기록",
        width: 100,
        name: "statusCheckLog",
        type: "date",
      },
      // {
      //   title: "체크리스트",
      //   width: 100,
      //   name: "checklistDone",
      //   type: "string",
      //   menu: [
      //     {
      //       value: "전체 보기",
      //       functionName: "filterEvent_$all",
      //     },
      //     {
      //       value: "완료",
      //       functionName: "filterEvent_완료",
      //     },
      //     {
      //       value: "미완료",
      //       functionName: "filterEvent_미완료",
      //     },
      //   ],
      // },
      {
        title: "프로필 사진",
        width: 100,
        name: "profilePhotoDone",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "작업물",
        width: 100,
        name: "workingPhotoDone",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "경력 정보",
        width: 100,
        name: "careerUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "학력 정보",
        width: 100,
        name: "schoolUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "3가지 강점",
        width: 100,
        name: "threeStrengthUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "대표 작업물",
        width: 100,
        name: "representativeUpdate",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "올림",
            functionName: "filterEvent_올림",
          },
          {
            value: "안올림",
            functionName: "filterEvent_안올림",
          },
        ],
      },
      {
        title: "계약 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "협약 완료",
            color: colorChip.black,
          },
          {
            value: "협약 휴직",
            color: colorChip.deactive,
          },
          {
            value: "협약 해지",
            color: colorChip.gray3,
          },
          {
            value: "신청 대기",
            color: colorChip.red,
          },
          {
            value: "컨택중",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "협약 완료",
          "협약 휴직",
          "협약 해지",
          "신청 대기",
          "컨택중",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        }))
      },
      {
        title: "계약일",
        width: 100,
        name: "contractDate",
        type: "date",
      },
      {
        title: "계약 유지",
        width: 100,
        name: "contractDuring",
        type: "during",
      },
      {
        title: "적용 경력",
        width: 100,
        name: "career",
        type: "during",
      },
      {
        title: "연락처",
        width: 130,
        name: "phone",
        type: "string",
      },
      {
        title: "주소",
        width: 400,
        name: "address",
        type: "string",
      },
      {
        title: "유효 범위",
        width: 100,
        name: "range",
        type: "number",
      },
      {
        title: "한계 범위",
        width: 100,
        name: "expenses",
        type: "number",
      },
      {
        title: "홈퍼니싱",
        width: 100,
        name: "homefurnishing",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "홈스타일링",
        width: 100,
        name: "homestyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "토탈 스타일링",
        width: 100,
        name: "totalstyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "설계 변경",
        width: 100,
        name: "extrastyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "프리미엄",
        width: 100,
        name: "premium",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "부분 공간",
        width: 100,
        name: "partial",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "온라인",
        width: 100,
        name: "online",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "거주중",
        width: 100,
        name: "living",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "협업 시공사",
        width: 100,
        name: "partner",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "자체 시공사",
        width: 100,
        name: "own",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "시공 역량",
        width: 100,
        name: "constructLevel",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "스타일링",
        width: 100,
        name: "stylingLevel",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "3D",
        width: 100,
        name: "modeling",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "CAD",
        width: 100,
        name: "cad",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
      {
        title: "콜라주",
        width: 100,
        name: "collage",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
        ],
      },
    ];

    values = {};

    for (let designer of instance.designers) {

      filteredChecklistSendRows = noticeSendRows.filter((o) => { return o.type === "checklist" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredProfileSendRows = noticeSendRows.filter((o) => { return o.type === "profile" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredWorkSendRows = noticeSendRows.filter((o) => { return o.type === "work" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredCareerSendRows = noticeSendRows.filter((o) => { return o.type === "career" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredEntireSendRows = noticeSendRows.filter((o) => { return o.type === "until" }).filter((o) => { return o.designer.desid === designer.desid });

      filteredBasicEducationSendRows = noticeSendRows.filter((o) => { return o.type === "basicEducation" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredConsoleEducationSendRows = noticeSendRows.filter((o) => { return o.type === "consoleEducation" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredSettingPortfolioSendRows = noticeSendRows.filter((o) => { return o.type === "settingPortfolio" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredStatusCheckSendRows = noticeSendRows.filter((o) => { return o.type === "statusCheck" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredStatusCheckLog = equalJson(JSON.stringify(statusCheckLog.filter((o) => { return o.data.desid === designer.desid })));
      filteredStatusCheckLog.sort((a, b) => {
        return b.date.valueOf() - a.date.valueOf();
      });

      careerUpdateBoo = designer.information.business.career.detail.length > 0;
      schoolUpdateBoo = designer.information.business.career.school.length > 0;
      threeStrengthBoo = designer.setting.description.filter((str) => { return !/null/gi.test(str); }).length > 0;
      representativeBoo = representativeList.filter((o) => { return o.boo }).map(({ desid }) => { return desid }).includes(designer.desid);

      standards.values[designer.desid] = [
        {
          value: designer.desid,
          name: "desid",
        },
        {
          value: designer.designer,
          name: "designer",
        },
      ];

      values[designer.desid] = [
        {
          value: filteredEntireSendRows.length > 0 ? dateToString(filteredEntireSendRows[0].date) : "-",
          name: "entireNoticeSend",
        },
        {
          value: filteredProfileSendRows.length > 0 ? dateToString(filteredProfileSendRows[0].date) : "-",
          name: "profilePhotoNoticeSend",
        },
        {
          value: filteredWorkSendRows.length > 0 ? dateToString(filteredWorkSendRows[0].date) : "-",
          name: "workingPhotoNoticeSend",
        },
        {
          value: filteredCareerSendRows.length > 0 ? dateToString(filteredCareerSendRows[0].date) : "-",
          name: "careerSchoolNoticeSend",
        },
        {
          value: filteredBasicEducationSendRows.length > 0 ? dateToString(filteredBasicEducationSendRows[0].date) : "-",
          name: "basicEducationSend",
        },
        {
          value: filteredConsoleEducationSendRows.length > 0 ? dateToString(filteredConsoleEducationSendRows[0].date) : "-",
          name: "consoleEducationSend",
        },
        {
          value: filteredSettingPortfolioSendRows.length > 0 ? dateToString(filteredSettingPortfolioSendRows[0].date) : "-",
          name: "settingPortfolioSend",
        },
        {
          value: filteredStatusCheckSendRows.length > 0 ? dateToString(filteredStatusCheckSendRows[0].date) : "-",
          name: "statusCheckSend",
        },
        {
          value: filteredStatusCheckLog.length > 0 ? dateToString(filteredStatusCheckLog[0].date) : "-",
          name: "statusCheckLog",
        },
        // {
        //   value: asyncProcessText,
        //   name: "checklistDone",
        // },
        {
          value: profileListSet.includes(designer.desid) ? "올림" : "안올림",
          name: "profilePhotoDone",
        },
        {
          value: (workListSet0.includes(designer.desid) && workListSet1.includes(designer.desid) && workListSet2.includes(designer.desid) && workListSet3.includes(designer.desid)) ? "올림" : "안올림",
          name: "workingPhotoDone",
        },
        {
          value: careerUpdateBoo ? "올림" : "안올림",
          name: "careerUpdate",
        },
        {
          value: schoolUpdateBoo ? "올림" : "안올림",
          name: "schoolUpdate",
        },
        {
          value: threeStrengthBoo ? "올림" : "안올림",
          name: "threeStrengthUpdate",
        },
        {
          value: representativeBoo ? "올림" : "안올림",
          name: "representativeUpdate",
        },
        {
          value: designer.information.contract.status,
          name: "status",
        },
        {
          value: dateToString(designer.information.contract.date),
          name: "contractDate",
        },
      ];

      timeDelta = calcMonthDelta(designer.information.contract.date, new Date());
      values[designer.desid].push({
        value: String(timeDelta) + "개월",
        name: "contractDuring",
      });

      [ year, month ] = designerCareer(designer);
      values[designer.desid].push({
        value: `${String(year)}년 ${String(month)}개월`,
        name: "career",
      });

      values[designer.desid].push({
        value: designer.information.phone,
        name: "phone",
      });

      values[designer.desid].push({
        value: designer.information.address.length > 0 ? designer.information.address[0] : "",
        name: "address",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.range) + "km",
        name: "range",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.expenses) + "km",
        name: "expenses",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[0][1] === 1 ? "가능" : "불가능",
        name: "homefurnishing",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[1][1] === 1 ? "가능" : "불가능",
        name: "homestyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[2][1] === 1 ? "가능" : "불가능",
        name: "totalstyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[3][1] === 1 ? "가능" : "불가능",
        name: "extrastyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[2] === 1 }) ? "가능" : "불가능",
        name: "premium",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[0] === 1 }) ? "가능" : "불가능",
        name: "partial",
      });
      values[designer.desid].push({
        value: designer.analytics.project.online ? "가능" : "불가능",
        name: "online",
      });
      values[designer.desid].push({
        value: designer.analytics.project.living ? "가능" : "불가능",
        name: "living",
      });
      values[designer.desid].push({
        value: designer.analytics.construct.partner ? "있음" : "없음",
        name: "partner",
      });
      values[designer.desid].push({
        value: designer.analytics.construct.own ? "있음" : "없음",
        name: "own",
      });
      values[designer.desid].push({
        value: [ "없", "하", "중", "상" ][designer.analytics.construct.level],
        name: "constructLevel",
      });
      values[designer.desid].push({
        value: [ "없", "하", "중", "상" ][designer.analytics.styling.level],
        name: "stylingLevel",
      });
      values[designer.desid].push({
        value: [ "불가능", "하", "중", "상" ][designer.analytics.project.modeling],
        name: "modeling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.cad ? "가능" : "불가능",
        name: "cad",
      });
      values[designer.desid].push({
        value: designer.analytics.project.collage ? "가능" : "불가능",
        name: "collage",
      });

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.normalDataRender(false));

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalWhiteCard = function (desid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      const designer = instance.designers.find((d) => { return d.desid === desid });
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;
      let iframeMaker;
      let linkDictionary;
      let isCxMember;

      window.history.pushState({ desid }, "");
      if (hasQuery("desid")) {
        removeQuery("desid");
      }
      appendQuery({ desid: desid });

      isCxMember = await GeneralJs.nonCxBan(true);
      linkDictionary = {
        checklist: BACKHOST + "/middle/designerAbout?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        process: BACKHOST + "/middle/designerBoard?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        possible: BACKHOST + "/middle/designerPossible?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        portfolio: BACKHOST + "/designer?mode=general&desid=" + designer.desid + "&dataonly=true&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        report: BACKHOST + "/middle/designerReport?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        proposal: BACKHOST + "/file?proposaldesid=" + designer.desid + "&preview=true&previewonly=true&dataonly=true&entire=true",
      }

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      iframeMaker = (mode) => {
        const src = linkDictionary[mode];
        return function (e) {
          const whiteTong = document.querySelector('.' + whiteBaseClassName);
          const toggle = this.getAttribute("off");
          const desid = this.getAttribute("desid");
          const siblings = Array.from(document.querySelectorAll('.' + titleButtonsClassName));
          whiteTong.removeChild(whiteTong.firstChild);
          createNode({
            mother: whiteTong,
            mode: "iframe",
            attribute: { src },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          });
          this.setAttribute("toggle", "on");
          this.style.color = colorChip.green;
          for (let dom of siblings) {
            if (dom !== this) {
              dom.setAttribute("toggle", "off");
              dom.style.color = colorChip.black;    
            }
          }
          instance.whiteCardMode = mode;
          window.history.pushState({ mode }, "");
        }
      }

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => {
              removeByClass(whiteCardClassName);
              if (hasQuery("desid")) {
                removeQuery("desid");
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
              zIndex: String(zIndex),
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          attribute: {
            desid: desid
          },
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          child: {
            mode: "iframe",
            attribute: {
              src: linkDictionary[instance.whiteCardMode],
            },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          }
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                attribute: { designer: designer.designer, phone: designer.information.phone.replace(/[^0-9]/gi, '') },
                event: {
                  click: function (e) {
                    const designer = this.getAttribute("designer");
                    const phone = this.getAttribute("phone");
                    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                    if (window.confirm(designer + " 실장님께 전화를 걸까요?")) {
                      ajaxJson({
                        who: cookies.homeliaisonConsoleLoginedEmail,
                        phone: phone
                      }, BACKHOST + "/callTo").catch((err) => { console.log(err); });
                    }
                  }
                },
                text: designer.designer,
                style: {
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { desid: desid },
                event: {
                  click: async function (e) {
                    try {
                      const desid = this.getAttribute("desid");
                      await window.navigator.clipboard.writeText(desid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: designer.desid,
                style: {
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  marginLeft: String(fontBetween) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                  cursor: "pointer",
                }
              },
              {
                style: {
                  display: "flex",
                  position: "absolute",
                  bottom: String(0),
                  right: String(0),
                  flexDirection: "row",
                  alignItems: "end",
                  justifyContent: "end",
                },
                children: [
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "checklist" ? "on" : "off"), desid, mode: "checklist" },
                    event: {
                      click: iframeMaker("checklist"),
                    },
                    text: "체크리스트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "checklist" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "possible" ? "on" : "off"), desid, mode: "process" },
                    event: {
                      click: iframeMaker("process"),
                    },
                    text: "프로젝트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "process" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "possible" ? "on" : "off"), desid, mode: "possible" },
                    event: {
                      click: iframeMaker("possible"),
                    },
                    text: "일정 관리",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "possible" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "portfolio" ? "on" : "off"), desid, mode: "portfolio" },
                    event: {
                      click: iframeMaker("portfolio"),
                    },
                    text: "포트폴리오",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "portfolio" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "proposal" ? "on" : "off"), desid, mode: "proposal" },
                    event: {
                      click: iframeMaker("proposal"),
                    },
                    text: "디자인 제안",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "proposal" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: (instance.whiteCardMode === "report" ? "on" : "off"), desid, mode: "report" },
                    event: {
                      click: iframeMaker("report"),
                    },
                    text: "리포트",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: instance.whiteCardMode === "report" ? colorChip.green : colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref("/file?mode=designer&desid=" + desid);
                      }
                    },
                    text: "디자이너 폴더",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref(FRONTHOST + "/proposal_test.php?desid=" + desid);
                      }
                    },
                    text: "추천서 샘플",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    text: blank,
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.gray3,
                    }
                  },
                  {
                    class: [ titleButtonsClassName ],
                    attribute: { toggle: "off", desid },
                    event: {
                      click: function (e) {
                        const desid = this.getAttribute("desid");
                        blankHref(FRONTHOST + "/designer/dashboard.php?desid=" + desid + "&view=test");
                      }
                    },
                    text: "디자이너 콘솔",
                    style: {
                      position: "relative",
                      top: String(fontTextTop) + ea,
                      fontSize: String(fontSize) + ea,
                      marginLeft: String(fontBetween) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                ]
              }
            ]
          }
        });
      }

      instance.whiteMaker = whiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.normalSendNotice = function (method, desid, untilDate) {
  const instance = this;
  const { ea, totalContents, designers } = this;
  const { ajaxJson } = GeneralJs;
  const dateToUntilString = (date) => {
    let temp;
    temp = String(date.getFullYear()).slice(2);
    temp += "년";
    temp += " ";
    temp += String(date.getMonth() + 1);
    temp += "월";
    temp += " ";
    temp += String(date.getDate());
    temp += "일";
    temp += "까지";
    return temp;
  }
  let tempValue;
  let untilString;
  if (method === "checklist") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }
        if (window.confirm(designer.designer + " 실장님께 체크리스트 기입 요청 알림톡을 전송할까요?")) {
          tempValue = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");
          if (tempValue !== null) {
            untilString = dateToUntilString(tempValue);
            const response = await ajaxJson({
              mode: "send",
              desid: designer.desid,
              designer: designer.designer,
              phone: designer.information.phone,
              type: "until",
              until: untilString,
            }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
            if (response.message === "success") {
              window.alert("전송에 성공하였습니다!");
            } else {
              window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
            }
            window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
          }
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "console") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 디자이너 콘솔 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "console",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "profile") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 프로필 사진 업로드 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "profile",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "work") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 작업 사진 업로드 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "work",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "career") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 경력 및 학력 업데이트 요청 알림톡을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            desid: designer.desid,
            designer: designer.designer,
            phone: designer.information.phone,
            type: "career",
          }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "basicEducation") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        const response = await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "basicEducation",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        if (response.message === "success") {
          window.alert("전송에 성공하였습니다!");
        } else {
          window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
        }
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "consoleEducation") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        const response = await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "consoleEducation",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        if (response.message === "success") {
          window.alert("전송에 성공하였습니다!");
        } else {
          window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
        }
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "settingPortfolio") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        const response = await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "settingPortfolio",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        if (response.message === "success") {
          window.alert("전송에 성공하였습니다!");
        } else {
          window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
        }
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "statusCheck") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        const response = await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "statusCheck",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        if (response.message === "success") {
          window.alert("전송에 성공하였습니다!");
        } else {
          window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
        }
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalChecklist") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "until",
          until: dateToUntilString(untilDate),
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalProfile") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "profile",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  } else if (method === "totalWork") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        await ajaxJson({
          mode: "send",
          desid: designer.desid,
          designer: designer.designer,
          phone: designer.information.phone,
          type: "work",
        }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        return true;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  } else if (method === "proposalProfile") {
    return async function () {
      try {
        const designer = designers.find((d) => { return d.desid === desid });
        if (designer === undefined) {
          throw new Error("invalid desid");
        }

        if (window.confirm(designer.designer + " 실장님께 추천서 안내 및 프로필 요청 알림톡을 전송할까요?")) {
          tempValue = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");
          if (tempValue !== null) {
            untilString = dateToUntilString(tempValue);
            const response = await ajaxJson({
              mode: "send",
              desid: designer.desid,
              designer: designer.designer,
              phone: designer.information.phone,
              type: "proposalProfile",
              until: untilString,
            }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
            if (response.message === "success") {
              window.alert("전송에 성공하였습니다!");
            } else {
              window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
            }
            window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
          }
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  }
}

DesignerJs.prototype.normalBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const designerSubMenuEventFactorClassName = "designerSubMenuEventFactorClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let normalContentsLoad;
    let circleRight, circleTop;
    let importantMarkingEvent;
    let designerSubMenuEvent;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 80;
    menuPromptHeight = 28;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 230;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    ({ standards, columns, values } = await this.normalDataRender(true));
  
    hoverEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: menuEventTong[thisFunctionName](...thisArguments),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    position: "relative",
                    top: String(menuTextTop) + ea,
                    fontSize: String(menuSize) + ea,
                    fontWeight: String(menuWeight),
                    color: colorChip.white,
                  }
                }
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    importantMarkingEvent = (desid) => {
      return async function (e) {
        e.preventDefault();
        try {
          const circles = this.querySelectorAll('.' + importantCircleClassName);
          const desid = this.getAttribute("desid");
          let onoff;
          let whereQuery, updateQuery;

          for (let circle of circles) {
            if (circle.getAttribute("toggle") === "on") {
              circle.style.display = "none";
              circle.setAttribute("toggle", "off");
              onoff = "off";
            } else {
              circle.style.display = "inline-block";
              circle.setAttribute("toggle", "on");
              onoff = "on";
            }
          }

          whereQuery = { desid };
          if (onoff === "on") {
            updateQuery = { important: true };
          } else {
            updateQuery = { important: false };
          }

          await ajaxJson({
            id: desid,
            column: "important",
            value: updateQuery.important ? 1 : 0,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
          }, BACKHOST + "/updateDesignerHistory");
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    designerSubMenuEvent = (desid, designer) => {
      return async function (e) {
        e.preventDefault();
        try {
          const px = "px";
          const zIndex = 4;
          const contextMenu = [
            {
              title: designer + " 실장님께 체크리스트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("checklist", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 콘솔 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("console", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 프로필 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("profile", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 작업 사진 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("work", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 경력 업데이트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("career", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 가이드 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("basicEducation", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 콘솔 설명서 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("consoleEducation", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 세트 포폴 요청 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("settingPortfolio", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 상태 체크 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("statusCheck", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 추천서 안내 및 프로필 요청",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("proposalProfile", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
          ];
          const thisBox = this.getBoundingClientRect();
          const { x, y } = e;
          let cancelBack, contextBase;

          cancelBack = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            event: {
              click: (e) => { removeByClass(designerSubMenuEventFactorClassName) },
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          contextBase = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            style: {
              display: "inline-block",
              position: "fixed",
              top: String(y + contextIndent) + px,
              left: String(x + (contextIndent / 2)) + px,
              padding: String(contextButtonOuterMargin) + ea,
              paddingBottom: String(contextButtonOuterMargin - contextButtonInnerMargin) + ea,
              background: colorChip.white,
              borderRadius: String(5) + px,
              boxShadow: "3px 0px 15px -9px " + colorChip.shadow,
              zIndex: String(zIndex),
              animation: "fadeuplite 0.3s ease forwards",
            }
          })

          for (let obj of contextMenu) {
            createNode({
              mother: contextBase,
              event: {
                click: obj.func(desid),
              },
              style: {
                display: "flex",
                width: String(contextButtonWidth) + ea,
                height: String(contextButtonHeight) + ea,
                background: colorChip.gradientGray,
                borderRadius: String(5) + px,
                marginBottom: String(contextButtonInnerMargin) + ea,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              },
              child: {
                text: obj.title,
                style: {
                  fontSize: String(contextButtonSize) + ea,
                  fontWeight: String(contextButtonWeight),
                  color: colorChip.white,
                  position: "relative",
                  display: "inline-block",
                  top: String(contextButtonTextTop) + ea,
                }
              }
            });
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    normalContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.normalDataRender(true));
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let designer of instance.designers) {
      
          createNode({
            mother: idNameArea,
            attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
            event: {
              click: instance.normalWhiteCard(designer.desid),
              dblclick: importantMarkingEvent(designer.desid),
              contextmenu: designerSubMenuEvent(designer.desid, designer.designer),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[designer.desid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                  next: {
                    class: [ importantCircleClassName ],
                    attribute: { toggle: designer.important ? "on" : "off" },
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: designer.important ? "inline-block" : "none",
                      position: "absolute",
                      transform: "scale(0.4)",
                      transformOrigin: "100% 0%",
                      right: String(index === 0 ? 0 : circleRight) + ea,
                      top: String(circleTop) + ea,
                      zIndex: String(0),
                    }
                  }
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { desid: designer.desid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {
            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      desid: designer.desid,
                      name: values[designer.desid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[designer.desid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[designer.desid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
    
        }
    
        await this.normalColorSync();
        await this.normalSubPannel();

      } catch (e) {
        console.log(e);
      }
    }

    await normalContentsLoad(false);
    this.normalContentsLoad = normalContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          const designers = await ajaxJson({ noFlat: true, query: value }, BACKHOST + "/searchDesigners", { equal: true });
          const histories = await ajaxJson({
            method: "designer",
            property: [ "manager", "important" ],
            idArr: designers.map((d) => { return d.desid }),
          }, BACKHOST + "/getHistoryProperty", { equal: true });

          for (let designer of designers) {
            designer.manager = histories[designer.desid].manager;
            designer.important = histories[designer.desid].important;
          }

          instance.designers = designers;
          await instance.normalContentsLoad(true);
          
          setQueue(async () => {
            try {
              if (instance.designers.length === 1) {
                const tempFunc = instance.normalWhiteCard(instance.designers[0].desid);
                await tempFunc({});
              }
            } catch (e) {
              console.log(e);
            }
          }, 350);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalDetailSearchEvent = async function () {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
  const detailSearchClassName = "detailSearchClassName";
  try {
    this.searchInput.addEventListener("contextmenu", async function (e) {
      e.preventDefault();
      try {
        const zIndex = 4;
        let cancelBack, whiteBase;
        let margin;
        let titleSize;
        let titleWeight;
        let fontSize;
        let fontWeight;

        margin = 30;

        titleSize = 21;
        titleWeight = 800;

        fontSize = 14;
        fontWeight = 400;

        cancelBack = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          event: {
            click: (e) => {
              removeByClass(detailSearchClassName);
            },
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: colorChip.black,
            opacity: String(0.3),
            zIndex: String(zIndex),
          }
        });

        whiteBase = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          style: {
            position: "fixed",
            top: String(margin) + ea,
            left: String(margin) + ea,
            width: withOut(margin * 2, ea),
            height: withOut((margin * 2) + belowHeight, ea),
            zIndex: String(zIndex),
            background: colorChip.white,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            borderRadius: String(5) + "px",
          }
        });



      } catch (e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalProcessDetailEvent = async function (proid, desid) {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight, grayBarWidth, processDetailEventClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue, blankHref } = GeneralJs;
  try {
    const zIndex = 4;
    let cancelBack, whiteBase;
    let margin;
    let titleSize;
    let titleWeight;
    let fontSize;
    let fontWeight;

    margin = 30;

    titleSize = 21;
    titleWeight = 800;

    fontSize = 14;
    fontWeight = 400;

    cancelBack = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      event: {
        click: (e) => {
          removeByClass(processDetailEventClassName);
        },
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(grayBarWidth) + ea,
        width: withOut(grayBarWidth, ea),
        height: withOut(0, ea),
        background: colorChip.black,
        opacity: String(0.3),
        zIndex: String(zIndex),
      }
    });

    whiteBase = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      style: {
        position: "fixed",
        top: String(margin) + ea,
        left: String(grayBarWidth + margin) + ea,
        width: withOut((margin * 2) + grayBarWidth, ea),
        height: withOut((margin * 2) + belowHeight, ea),
        zIndex: String(zIndex),
        background: colorChip.white,
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    });

    createNode({
      mother: whiteBase,
      mode: "iframe",
      attribute: {
        src: BACKHOST + "/process?proid=" + proid + "&entire=true&dataonly=true",
      },
      style: {
        display: "display",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
        outline: String(0),
        borderRadius: String(5) + "px",
      }
    });

    setQueue(() => {
      blankHref(FRONTHOST + "/designer/process.php?proid=" + proid + "&mode=request&view=test");
    }, 1000);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalMessageEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, processDetailEventClassName } = this;
  const { findByAttribute, ajaxJson, removeByClass } = GeneralJs;
  try {
    window.addEventListener("message", async function (e) {
      try {
        const data = JSON.parse(e.data);
        if (typeof data === "object" && data !== null) {
          if (data.type === "whiteConverting") {
            if (document.querySelector('.' + whiteBaseClassName) !== null) {
              if (findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode) !== null) {
                findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode).click();
              }
            }
          } else if (data.type === "checklistUpdate") {
            let designers;
            let histories;

            ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true }).then((de) => {
              designers = de;
              return ajaxJson({
                method: "designer",
                property: [ "manager", "important" ],
                idArr: designers.map((d) => { return d.desid }),
              }, BACKHOST + "/getHistoryProperty", { equal: true });
            }).then((h) => {
              histories = h;
              for (let designer of designers) {
                designer.manager = histories[designer.desid].manager;
                designer.important = histories[designer.desid].important;
              }
              instance.designers = designers;
              return instance.normalContentsLoad(true);
            }).catch((err) => {
              console.log(err);
            });

          } else if (data.type === "processDetail") {
            
            removeByClass(whiteCardClassName);
            await instance.normalProcessDetailEvent(data.proid, data.desid);

          } else if (data.type === "returnToPast") {
            const tempFunction = instance.normalWhiteCard(document.querySelectorAll('.' + processDetailEventClassName)[1].getAttribute("desid"));
            removeByClass(processDetailEventClassName);
            await tempFunction({});
          }
        }
      } catch {}
    })
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalExtractEvent = async function () {
  const instance = this;
  const { ajaxJson, blankHref } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        const today = new Date();
        let thisObject;
        let matrix;
        let tempArr;
        let thisDesigner;
        let data;
        let thisLength;

        if (instance.viewMode === "normal") {
          data = await instance.normalDataRender(false);
        } else if (instance.viewMode === "numbers") {
          data = await instance.numbersDataRender();
        } else {
          data = await instance.careDataRender(null);
        }

        matrix = [];
        tempArr = [
          "아이디",
          "이름",
        ];
        if (instance.viewMode === "normal") {
          tempArr = tempArr.concat([
            "이메일",
            "계좌번호",
            "사업자 분류",
            "사업자 등록번호",
          ])
        }

        for (let obj of data.columns) {
          tempArr.push(obj.title);
        }
        matrix.push(tempArr);

        for (let desid in data.values) {

          thisDesigner = instance.designers.find((d) => { return d.desid === desid });

          if (instance.viewMode !== "care") {

            tempArr = [];
            tempArr.push(desid);
            tempArr.push(thisDesigner.designer);
            if (instance.viewMode === "normal") {
              tempArr.push(thisDesigner.information.email);
              tempArr.push(thisDesigner.information.business.account.length > 0 ? thisDesigner.information.business.account[0].bankName + " " + thisDesigner.information.business.account[0].accountNumber : "");
              tempArr.push(thisDesigner.information.business.businessInfo.classification);
              tempArr.push(thisDesigner.information.business.businessInfo.businessNumber);
            }
            for (let obj of data.columns) {
              thisObject = data.values[desid].find((o) => { return o.name === obj.name });
              if (obj.type === "number") {
                tempArr.push(Number(String(thisObject.value).replace(/[^0-9\.\-]/gi, '')));
              } else {
                tempArr.push(thisObject.value);
              }
            }
            matrix.push(tempArr);

          } else {

            thisLength = data.values[desid][0].length;
            for (let i = 0; i < thisLength; i++) {
              tempArr = [];
              tempArr.push(desid);
              tempArr.push(thisDesigner.designer);
              for (let obj of data.columns) {
                thisObject = data.values[desid].find((o) => { return o[0].name === obj.name });
                if (obj.type === "number") {
                  tempArr.push(Number(String(thisObject[i].value).replace(/[^0-9\.\-]/gi, '')));
                } else {
                  tempArr.push(thisObject[i].value);
                }
              }
              matrix.push(tempArr);
            }

          }
        }

        instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
        ajaxJson({
          values: matrix,
          newMake: true,
          parentId: parentId,
          sheetName: "fromDB_designer_" + String(today.getFullYear()) + instance.mother.todayMaker()
        }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
          blankHref(result.link);
        }).catch((err) => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalReportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    target.style.color = GeneralJs.colorChip.black;
    if (!/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
      valueArr0 = target.value.split(" ~ ");
      valueArr1 = valueArr0[0].split("-");
      if (valueArr0[1] !== undefined) {
        valueArr2 = valueArr0[1].split("-");
        if (valueArr1.length === 3 && valueArr2.length === 3) {
          target.value = String(valueArr1[0]) + '-' + zeroAddition(valueArr1[1]) + '-' + zeroAddition(valueArr1[2]) + ' ~ ' + String(valueArr2[0]) + '-' + zeroAddition(valueArr2[1]) + '-' + zeroAddition(valueArr2[2]);
        } else {
          target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
        }
      } else {
        target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
      }
    }
    target.value = (/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];

    valueArr0 = target.value.split(" ~ ");
    valueArr1 = valueArr0[0].split("-");
    valueArr2 = valueArr0[1].split("-");
    if ((Number(valueArr1[0]) * 12) + Number(valueArr1[1].replace(/^0/, '')) > (Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, ''))) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[1].replace(/^0/, '')) > 12 || Number(valueArr1[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr2[1].replace(/^0/, '')) > 12 || Number(valueArr2[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[0]) < 19) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }

    GeneralJs.stacks.reportBoxStartDayInputValue = target.value;
  }
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let iframeMaker;
      let linkDictionary;
      let base, scrollBox;
      let titleArea;
      let basePaddingTop;
      let basePaddingBottom;
      let divideNumber;
      let lineBetween;
      let linePaddingLeft;
      let wordingSize;
      let linePaddingTop;
      let linePaddingBottom;
      let designerSize;
      let desidSize;
      let subTitleLeft;
      let subTitleBottom;
      let data;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let style;
      let startPaddingTop;
      let todayRange, dateInput;
      let todayString;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;

      today = new Date();
      ago = 30;
      agoDate = new Date();
      agoDate.setDate(agoDate.getDate() - ago);

      margin = 30;
      titleHeight = 58;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      basePaddingTop = 10;
      basePaddingBottom = 6;
      divideNumber = 4;
      lineBetween = 4;
      linePaddingLeft = 16;
      wordingSize = 14;
      linePaddingTop = isMac() ? 10 : 12;
      linePaddingBottom = isMac() ? 11 : 11;
      designerSize = 16;
      desidSize = 11;
      subTitleLeft = 1;
      subTitleBottom = isMac() ? 6 : 4;
      startPaddingTop = 10;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 20;
      inputWeight = 500;

      subTodaySize = 13;
      subTodayWeight = 200;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: String(titleHeight) + ea,
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: withOut(titleHeight + startPaddingTop, ea),
                paddingTop: String(startPaddingTop) + ea,
                overflow: "scroll",
              },
            }
          ]
        });

        [ titleArea, scrollBox ] = Array.from(whitePrompt.children);

        todayRange = dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2);
        todayString = dateToString(new Date());

        dateInput = createNode({
          mode: "input",
          attribute: {
            type: "text",
          },
          event: {
            focus: function (e) {
              this.style.color = colorChip.green;
              GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
            },
            blur: function (e) {
              vaildValue(this);
            },
            keyup: function (e) {
              if (e.key === "Enter") {
                vaildValue(this);
                const dateArr = this.value.split(" ~ ");
                const startDay = "20" + dateArr[0];
                const endDay = "20" + dateArr[1];

                this.blur();

                cleanChildren(scrollBox);

                loading = instance.mother.returnLoadingIcon();
                style = {
                  position: "absolute",
                  width: String(loadingWidth) + ea,
                  height: String(loadingWidth) + ea,
                  top: withOut(50, loadingWidth / 2, ea),
                  left: withOut(50, loadingWidth / 2, ea),
                }
                for (let i in style) {
                  loading.style[i] = style[i];
                }
                whitePrompt.appendChild(loading);

                ajaxJson({
                  mode: "designer",
                  start: stringToDate(startDay),
                  end: stringToDate(endDay)
                }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
            fontFamily: "graphik",
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "today : " + todayString,
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            color: colorChip.green,
            fontFamily: "graphik",
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.appendChild(loading);

        dataLoad = (loading) => {
          return (data) => {
            loading.remove();
            cleanChildren(scrollBox);
  
            for (let designer of data.designers) {
        
              designer.proposal = designer.proposal.filter((obj) => { return obj.amount !== 0 });
              designer.process = designer.process.filter((obj) => { return obj.amount !== 0 });
              designer.first = designer.first.filter((obj) => { return obj.amount !== 0 });
              designer.remain = designer.remain.filter((obj) => { return obj.amount !== 0 });
          
              base = createNode({
                mother: scrollBox,
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  paddingTop: String(basePaddingTop) + ea,
                  paddingBottom: String(basePaddingBottom) + ea,
                }
              });
          
              createNode({
                mother: base,
                class: [ "hoverDefault_lite" ],
                attribute: { desid: designer.desid },
                event: {
                  click: function (e) {
                    blankHref(FRONTHOST + "/designer/report.php?desid=" + this.getAttribute("desid"));
                  }
                },
                text: `${designer.designer}&nbsp;&nbsp;<b%${designer.desid}%b>`,
                style: {
                  display: "inline-block",
                  fontSize: String(designerSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.black,
                  marginLeft: String(subTitleLeft) + ea,
                  marginBottom: String(subTitleBottom) + ea,
                },
                bold: {
                  fontSize: String(desidSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.green
                }
              });
          
              tong = createNode({
                mother: base,
                style: {
                  display: "block",
                  borderRadius: String(5) + "px",
                  border: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",
                  width: String(100) + '%',
                }
              });
          
              for (let i = 0; i < divideNumber; i++) {
                area = createNode({
                  mother: tong,
                  style: {
                    display: "inline-block",
                    width: String(100 / divideNumber) + '%',
                    borderRight: i === divideNumber - 1 ? "" : "1px dashed " + colorChip.gray3,
                    verticalAlign: "top",
                    paddingTop: String(linePaddingTop) + ea,
                    paddingBottom: String(linePaddingBottom) + ea,
                    boxSizing: "border-box",
                  }
                });
                if (i === 0) {
          
                  createNode({
                    mother: area,
                    text: `<b%제안 횟수%b> : ${String(designer.proposal.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 누계%b> : ${autoComma(designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평단가 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else if (i === 1) {
          
                  createNode({
                    mother: area,
                    text: `<b%계약 횟수%b> : ${String(designer.process.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 누계%b> : ${autoComma(designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평균%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평단가%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
        
                } else if (i === 2) {
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 횟수%b> : ${String(designer.first.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 누계%b> : ${autoComma(designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 평균%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.first.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.first.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else {
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 횟수%b> : ${String(designer.remain.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 누계%b> : ${autoComma(designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 평균%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.remain.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.remain.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                }
              }
          
            }
          }
        }

        ajaxJson({
          mode: "designer",
          start: fromDate,
          end: toDate
        }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(agoDate, today, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(agoDate, today, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.normalReportEvent = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.mother.belowButtons.square.reportIcon.addEventListener("click", instance.normalReportWhite());
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, sleep, blankHref, selfHref } = GeneralJs;
  communication.setItem([
    () => { return "체크리스트 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        let tempRes;
        let untilDate;
        untilDate = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");

        if (untilDate !== null) {
          for (let designer of targetDesigners) {
            asyncTempFunc = instance.normalSendNotice("totalChecklist", designer.desid, untilDate);
            tempRes = await asyncTempFunc();
            if (tempRes === null) {
              throw new Error("send fail");
            }
          }
          window.alert("체크리스트 전체 발송에 성공하였습니다!");
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
        }

      } catch (e) {
        console.log(e);
        window.alert("체크리스트 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "프로필 요청 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        for (let designer of targetDesigners) {
          asyncTempFunc = instance.normalSendNotice("totalProfile", designer.desid);
          tempRes = await asyncTempFunc();
          if (tempRes === null) {
            throw new Error("send fail");
          }
        }
        window.alert("프로필 요청 전체 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("프로필 요청 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "작업물 요청 전체 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) });
        let asyncTempFunc;
        for (let designer of targetDesigners) {
          asyncTempFunc = instance.normalSendNotice("totalWork", designer.desid);
          tempRes = await asyncTempFunc();
          if (tempRes === null) {
            throw new Error("send fail");
          }
        }
        window.alert("작업물 요청 전체 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("작업물 요청 전체 발송에 실패하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      }
    }
  ]);
  communication.setItem([
    () => { return "체크리스트 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("checklist", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "프로필 업로드 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("profile", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "작업 사진 업로드 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("work", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "경력 업데이트 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("career", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "디자이너 가이드 보내기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("basicEducation", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "콘솔 설명서 보내기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("consoleEducation", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "세트 포폴 요청 보내기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("settingPortfolio", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "상태 체크 보내기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("statusCheck", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "추천서 안내 및 프로필 요청"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const sendFunc = instance.normalSendNotice("proposalProfile", desid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "신청자 정보 보기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const desid = document.querySelector('.' + whiteBaseClassName).getAttribute("desid");
      try {
        const [ thisDesigner ] = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
        const thisAspirants = (await ajaxJson({ whereQuery: { designer: thisDesigner.designer } }, SECONDHOST + "/getAspirants", { equal: true })).filter((a) => { return (a.contract.partnership.valueOf() > (new Date(2000, 0, 1)).valueOf()) && (a.contract.designer.valueOf() > (new Date(2000, 0, 1)).valueOf()) });
        if (thisAspirants.length > 0) {
          selfHref(BACKHOST + "/designer?mode=aspirant&aspid=" + thisAspirants[0].aspid);
        }
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&desid=" + desid;
      }
    }
  ]);
  communication.setItem([
    () => { return "이미지 전송 기록"; },
    function () {
      return true;
    },
    async function (e) {
      try {
        await instance.mother.imageTransferHistory();
      } catch (e) {
        console.log(e);
      }
    }
  ]);
}

DesignerJs.prototype.normalSubPannel = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;
    let num;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 140;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    pannelMenu = [
      {
        title: "프로젝트 케어 모드",
        event: () => {
          return async function (e) {
            try {
              await instance.careView();
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "디자이너 보고서 모드",
        event: () => {
          return async function (e) {
            try {
              await instance.numbersView(false);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
    ];

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "absolute",
        bottom: String(pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    num = 0;
    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(num === pannelMenu.length - 1 ? 0 : menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            position: "relative",
            top: String(menuTextTop) + ea,
            fontSize: String(menuSize) + ea,
            fontWeight: String(menuWeight),
            color: colorChip.white,
          }
        }
      })
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.cleanSearchEvent = function () {
  const instance = this;
  let searchInputCloned;
  searchInputCloned = this.searchInput.cloneNode(true);
  this.searchInput.parentNode.appendChild(searchInputCloned);
  this.searchInput.remove();
  this.searchInput = searchInputCloned;
}

DesignerJs.prototype.careSubPannel = async function () {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, returnGet } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;
    let num;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 140;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    if (returnGet()?.from === "ca") {
      pannelMenu = [
        {
          title: returnGet()?.view === "care" ? "전체 보기" : "진행중만 보기",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&type=care&from=ca&view=" + (returnGet()?.view === "care" ? "all" : "care");
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
        {
          title: "촬영 관리 모드",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=contents";
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
        {
          title: "기본 프로젝트 모드",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/project?type=care&from=de";
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
        {
          title: "정산 관리 모드",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/calculation";
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
      ];
    } else {
      pannelMenu = [
        {
          title: "디자이너 속성 모드",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
        {
          title: "디자이너 보고서 모드",
          event: () => {
            return async function (e) {
              try {
                window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&type=numbers";
              } catch (e) {
                console.log(e);
                window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
                window.location.reload();
              }
            }
          },
        },
      ];
    }

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "absolute",
        bottom: String(pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    num = 0;
    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(num === pannelMenu.length - 1 ? 0 : menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            position: "relative",
            top: String(menuTextTop) + ea,
            fontSize: String(menuSize) + ea,
            fontWeight: String(menuWeight),
            color: colorChip.white,
          }
        }
      })
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.careSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');

          loading = instance.mother.grayLoading(null, false);
          ajaxJson({ mode: "search", value: value.trim() }, BACKHOST + "/processConsole", { equal: true }).then((serverResponse) => {
            instance.reloadProjects(serverResponse);
            return instance.careContentsLoad(true, null);
          }).then(() => {
            try {
              loading.remove();
            } catch {}
          }).catch((err) => {
            console.log(err);
          });

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.careWhiteCard = function (proid, caMode = false) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, hasQuery, removeQuery, appendQuery } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const blank = "&nbsp;/&nbsp;";
      const project = instance.projects.find((d) => { return d.proid === proid });
      let cancelBack, whitePrompt;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;

      margin = 30;
      titleHeight = 0;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 5;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 3;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => {
              removeByClass(whiteCardClassName);
              if (hasQuery("desid")) {
                removeQuery("desid");
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
              zIndex: String(zIndex),
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          attribute: {
            proid: proid
          },
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          child: {
            mode: "iframe",
            attribute: {
              src: (!caMode ? BACKHOST + "/process?proid=" + proid + "&entire=true&normal=true&dataonly=true" : "/project?proid=" + proid + "&entire=true&normal=true&dataonly=true"),
            },
            style: {
              position: "absolute",
              display: "block",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              border: String(0),
            }
          }
        });
  
      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.careDataRender = async function (filterFunc = null) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows, profileList, workList, representativeList } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute, equalJson, serviceParsing } = GeneralJs;
  try {
    let columns;
    let values;
    let standards;
    let desidArr;
    let thisDesigners;
    let thisProjects;
    let progress, pending;
    let num;

    desidArr = instance.projects.map((p) => { return p.desid });
    desidArr = [ ...new Set(desidArr) ];

    thisDesigners = [];
    for (let desid of desidArr) {
      thisProjects = instance.projects.filter((p) => { return p.desid === desid });
      if (thisProjects.length > 0) {
        thisDesigners.push({
          desid,
          designer: equalJson(JSON.stringify(thisProjects[0].designer)),
          projects: equalJson(JSON.stringify(thisProjects)),
        });
      }
    }

    thisDesigners.sort((a, b) => {
      return b.projects.length - a.projects.length;
    })
    
    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "desid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "고객",
        width: 80,
        name: "client",
        type: "string",
      },
      {
        title: "상태",
        width: 80,
        name: "status",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "진행중",
            functionName: "filterEvent_진행중",
          },
          {
            value: "대기",
            functionName: "filterEvent_대기",
          },
          {
            value: "드랍",
            functionName: "filterEvent_드랍",
          },
        ],
      },
      {
        title: "시작일",
        width: 110,
        name: "startDate",
        type: "date",
      },
      {
        title: "종료일",
        width: 110,
        name: "endDate",
        type: "date",
      },
      {
        title: "온오프",
        width: 100,
        name: "onoff",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "오프라인",
            functionName: "filterEvent_오프라인",
          },
          {
            value: "온라인",
            functionName: "filterEvent_온라인",
          },
        ],
      },
      {
        title: "서비스",
        width: 120,
        name: "service",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "홈퍼니싱",
            functionName: "filterEvent_홈퍼니싱",
          },
          {
            value: "홈스타일링",
            functionName: "filterEvent_홈스타일링",
          },
          {
            value: "토탈 스타일링",
            functionName: "filterEvent_토탈 스타일링",
          },
          {
            value: "엑스트라",
            functionName: "filterEvent_엑스트라",
          },
        ],
      },
      {
        title: "주소",
        width: 120,
        name: "address",
        type: "string",
      },
      {
        title: "평수",
        width: 60,
        name: "pyeong",
        type: "number",
      },
      {
        title: "형태",
        width: 90,
        name: "contract",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "자가",
            functionName: "filterEvent_자가",
          },
          {
            value: "전월세",
            functionName: "filterEvent_전월세",
          },
        ],
      },
      {
        title: "계약금",
        width: 110,
        name: "contractDate",
        type: "date",
      },
      {
        title: "잔금",
        width: 110,
        name: "remainDate",
        type: "date",
      },
      {
        title: "디자인비",
        width: 120,
        name: "designFee",
        type: "number",
      },
      {
        title: "현장 미팅",
        width: 110,
        name: "meetingDate",
        type: "date",
      },
      {
        title: "상태 공유",
        width: 110,
        name: "sendStatus",
        type: "date",
      },
      {
        title: "디자인 제안",
        width: 110,
        name: "sendProposal",
        type: "date",
      },
      {
        title: "디자이너 글",
        width: 110,
        name: "sendContents",
        type: "date",
      },
      {
        title: "주소 전체",
        width: 450,
        name: "addressFull",
        type: "string",
      },
      {
        title: "연락처",
        width: 120,
        name: "phone",
        type: "string",
      },
      {
        title: "이메일",
        width: 200,
        name: "email",
        type: "string",
      },
    ];

    values = {};

    num = 0;
    for (let { designer, projects } of thisDesigners) {

      if (typeof filterFunc === "function") {
        projects = filterFunc(projects);
      }

      progress = projects.filter((p) => { return /진행/gi.test(p.process.status )})
      pending = projects.filter((p) => { return /대기/gi.test(p.process.status )})
      progress.sort((a, b) => {
        return a.process.contract.form.date.from.valueOf() - b.process.contract.form.date.from.valueOf();
      });
      pending.sort((a, b) => {
        return a.process.contract.form.date.from.valueOf() - b.process.contract.form.date.from.valueOf();
      });
      projects = progress.concat(pending);
      thisDesigners[num].projects = equalJson(JSON.stringify(projects));

      standards.values[designer.desid] = [
        {
          value: designer.desid,
          name: "desid",
        },
        {
          value: designer.designer,
          name: "designer",
        },
      ];

      values[designer.desid] = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];

      for (let p of projects) {
        values[designer.desid][0].push({
          value: p.name,
          name: "client",
        });
        values[designer.desid][1].push({
          value: p.process.status,
          name: "status",
        });
        values[designer.desid][2].push({
          value: dateToString(p.process.contract.form.date.from),
          name: "startDate",
        });
        values[designer.desid][3].push({
          value: dateToString(p.process.contract.form.date.to),
          name: "endDate",
        });
        values[designer.desid][4].push({
          value: serviceParsing(p.service).split(" ").slice(0, 1).join(" "),
          name: "onoff",
        });
        values[designer.desid][5].push({
          value: serviceParsing(p.service).split(" ").slice(1, -1).join(" "),
          name: "service",
        });
        values[designer.desid][6].push({
          value: p.client.requests[p.requestNumber].request.space.address.slice(0, 8),
          name: "address",
        });
        values[designer.desid][7].push({
          value: String(p.client.requests[p.requestNumber].request.space.pyeong),
          name: "pyeong",
        });
        values[designer.desid][8].push({
          value: p.client.requests[p.requestNumber].request.space.contract,
          name: "contract",
        });
        values[designer.desid][9].push({
          value: dateToString(p.process.contract.first.date),
          name: "contractDate",
        });
        values[designer.desid][10].push({
          value: dateToString(p.process.contract.remain.date),
          name: "remainDate",
        });
        values[designer.desid][11].push({
          value: autoComma(p.process.contract.remain.calculation.amount.consumer) + "원",
          name: "designFee",
        });
        values[designer.desid][12].push({
          value: dateToString(p.process.contract.meeting.date),
          name: "meetingDate",
        });
        values[designer.desid][13].push({
          value: dateToString(p.sendStatus),
          name: "sendStatus",
        });
        values[designer.desid][14].push({
          value: dateToString(p.sendFile),
          name: "sendProposal",
        });
        values[designer.desid][15].push({
          value: dateToString(p.rawDate),
          name: "sendContents",
        });
        values[designer.desid][16].push({
          value: p.client.requests[p.requestNumber].request.space.address,
          name: "addressFull",
        });
        values[designer.desid][17].push({
          value: p.client.phone,
          name: "phone",
        });
        values[designer.desid][18].push({
          value: p.client.email,
          name: "email",
        });
      }
      
      num++;
    }

    return { thisDesigners, standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.careBase = async function (filterFunc = null) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, svgMaker, blankHref } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const designerSubMenuEventFactorClassName = "designerSubMenuEventFactorClassName";
  const standardBarCaseClassName = "standardBarCaseClassName";
  const valueBarCaseClassName = "valueBarCaseClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let careContentsLoad;
    let circleRight, circleTop;
    let importantMarkingEvent;
    let designerSubMenuEvent;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
    let thisDesigners;
    let idNameLineTop, idNameLineWidth;
    let valueLineLeft, valueLineMaxWidth;
    let smallTextSize, smallTextTop, smallLineHeight;
    let progress;
    let pending;
    let blankIconRight, blankIconTop, blankIconWidth;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 80;
    menuPromptHeight = 28;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 230;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    idNameLineTop = 11;
    idNameLineWidth = 154;

    valueLineLeft = 9;
    valueLineMaxWidth = 9000;

    smallTextSize = 12;
    smallTextTop = -10;
    smallLineHeight = 1.61;

    blankIconRight = 0;
    blankIconTop = 15;
    blankIconWidth = 10;

    ({ thisDesigners, standards, columns, values } = await this.careDataRender(filterFunc));
  
    hoverEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
            let newValueDomsArray;
            let desidArr;
            let tempFiltered;

            desidArr = [ ...new Set(valueDoms.map((dom) => { return dom.getAttribute("desid") })) ];
            domMatrix = {};
            for (let dom of valueDoms) {
              thisDesid = dom.getAttribute("desid");
              if (domMatrix[thisDesid] === undefined) {
                domMatrix[thisDesid] = [];
              }
              domMatrix[thisDesid].push(dom);
            }

            for (let desid in domMatrix) {
              domMatrix[desid].sort((a, b) => {
                let aValue, bValue;
                let aSortValue, bSortValue;
                let tempArr;

                if (findByAttribute([ ...a.querySelectorAll('.' + valueTargetClassName) ], "name", name) !== null) {
                  aValue = findByAttribute([ ...a.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
                } else {
                  if (type === "string") {
                    aValue = '';
                  } else if (type === "number") {
                    aValue = "0";
                  } else if (type === "percentage") {
                    aValue = "0";
                  } else if (type === "date") {
                    aValue = "1800-01-01";
                  } else if (type === "during") {
                    aValue = "0";
                  } else {
                    aValue = "0";
                  }  
                }

                if (findByAttribute([ ...b.querySelectorAll('.' + valueTargetClassName) ], "name", name) !== null) {
                  bValue = findByAttribute([ ...b.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
                } else {
                  if (type === "string") {
                    bValue = '';
                  } else if (type === "number") {
                    bValue = "0";
                  } else if (type === "percentage") {
                    bValue = "0";
                  } else if (type === "date") {
                    bValue = "1800-01-01";
                  } else if (type === "during") {
                    bValue = "0";
                  } else {
                    bValue = "0";
                  }  
                }
                
                if (type === "string") {
                  aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                  bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
                } else if (type === "number") {
                  aValue = aValue.replace(/[^0-9]/gi, '')
                  bValue = bValue.replace(/[^0-9]/gi, '')
                  aSortValue = aValue !== '' ? Number(aValue) : 0;
                  bSortValue = bValue !== '' ? Number(bValue) : 0;
                } else if (type === "percentage") {
                  aValue = aValue.replace(/[^0-9\.]/gi, '')
                  bValue = bValue.replace(/[^0-9\.]/gi, '')
                  aSortValue = aValue !== '' ? Number(aValue) : 0;
                  bSortValue = bValue !== '' ? Number(bValue) : 0;
                } else if (type === "date") {
                  aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                  bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                  aSortValue = aSortValue.valueOf();
                  bSortValue = bSortValue.valueOf();
                } else if (type === "during") {
    
                  if (/년/gi.test(aValue)) {
                    tempArr = aValue.split('년');
                    if (tempArr.length > 1) {
                      aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                    } else {
                      aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                    }
                  } else {
                    aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                  }
    
                  if (/년/gi.test(bValue)) {
                    tempArr = bValue.split('년');
                    if (tempArr.length > 1) {
                      bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                    } else {
                      bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                    }
                  } else {
                    bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                  }
    
                } else {
                  aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                  bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
                }
                
                if (thisType === "down") {
                  return bSortValue - aSortValue;
                } else {
                  return aSortValue - bSortValue;
                }
              });
              tempFiltered = domMatrix[desid].filter((d) => { return d.getAttribute("blank") === "true" });
              for (let d of tempFiltered) {
                domMatrix[desid].push(d);
              }
              domMatrix[desid].push(domMatrix[desid].find((d) => { return d.getAttribute("bar") === "true" }));
            }

            for (let desid of desidArr) {
              for (let d of domMatrix[desid]) {
                valueArea.appendChild(d);
              }
            }
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            let loading;
            let filterFunc;

            if (name === "status") {
              if (thisValue === "$all") {
                filterFunc = null;
              } else {
                filterFunc = (ps) => {
                  return ps.filter((p) => {
                    return p.process.status === thisValue;
                  });
                }
              }
            } else if (name === "onoff") {
              if (thisValue === "$all") {
                filterFunc = null;
              } else {
                filterFunc = (ps) => {
                  return ps.filter((p) => {
                    if (/온라인/gi.test(thisValue)) {
                      return p.service.online;
                    } else {
                      return !p.service.online;
                    }
                  });
                }
              }
            } else if (name === "service") {
              if (thisValue === "$all") {
                filterFunc = null;
              } else {
                filterFunc = (ps) => {
                  return ps.filter((p) => {
                    if (/홈퍼니싱/gi.test(thisValue)) {
                      return /aa01s/gi.test(p.service.serid);
                    } else if (/홈스타일링/gi.test(thisValue)) {
                      return /aa02s/gi.test(p.service.serid);
                    } else if (/토탈 스타일링/gi.test(thisValue)) {
                      return /aa03s/gi.test(p.service.serid);
                    } else {
                      return /aa04s/gi.test(p.service.serid);
                    }
                  });
                }
              }
            } else if (name === "contract") {
              if (thisValue === "$all") {
                filterFunc = null;
              } else {
                filterFunc = (ps) => {
                  return ps.filter((p) => {
                    if (/자가/gi.test(thisValue)) {
                      return /자가/gi.test(p.client.requests[p.requestNumber].request.space.contract);
                    } else {
                      return !/자가/gi.test(p.client.requests[p.requestNumber].request.space.contract);
                    }
                  });
                }
              }
            }

            removeByClass(menuPromptClassName);

            loading = await instance.mother.loadingRun();

            if (instance.totalMother !== null && instance.totalMother !== undefined) {
              totalContents.removeChild(instance.totalMother);
            }

            await instance.careBase(filterFunc);

            loading.parentNode.removeChild(loading);
            
          } catch (e) {
            console.log(e);
          }
        }
      },
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: menuEventTong[thisFunctionName](...thisArguments),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    position: "relative",
                    top: String(menuTextTop) + ea,
                    fontSize: String(menuSize) + ea,
                    fontWeight: String(menuWeight),
                    color: colorChip.white,
                  }
                }
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    importantMarkingEvent = (desid) => {
      return async function (e) {
        e.preventDefault();
        try {
          const circles = this.querySelectorAll('.' + importantCircleClassName);
          const desid = this.getAttribute("desid");
          let onoff;
          let whereQuery, updateQuery;

          for (let circle of circles) {
            if (circle.getAttribute("toggle") === "on") {
              circle.style.display = "none";
              circle.setAttribute("toggle", "off");
              onoff = "off";
            } else {
              circle.style.display = "inline-block";
              circle.setAttribute("toggle", "on");
              onoff = "on";
            }
          }

          whereQuery = { desid };
          if (onoff === "on") {
            updateQuery = { important: true };
          } else {
            updateQuery = { important: false };
          }

          await ajaxJson({
            id: desid,
            column: "important",
            value: updateQuery.important ? 1 : 0,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
          }, BACKHOST + "/updateDesignerHistory");
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    designerSubMenuEvent = (desid, designer) => {
      return async function (e) {
        e.preventDefault();
        try {
          const px = "px";
          const zIndex = 4;
          const contextMenu = []
          const thisBox = this.getBoundingClientRect();
          const { x, y } = e;
          let cancelBack, contextBase;

          cancelBack = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            event: {
              click: (e) => { removeByClass(designerSubMenuEventFactorClassName) },
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          contextBase = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            style: {
              display: "inline-block",
              position: "fixed",
              top: String(y + contextIndent) + px,
              left: String(x + (contextIndent / 2)) + px,
              padding: String(contextButtonOuterMargin) + ea,
              paddingBottom: String(contextButtonOuterMargin - contextButtonInnerMargin) + ea,
              background: colorChip.white,
              borderRadius: String(5) + px,
              boxShadow: "3px 0px 15px -9px " + colorChip.shadow,
              zIndex: String(zIndex),
              animation: "fadeuplite 0.3s ease forwards",
            }
          })

          for (let obj of contextMenu) {
            createNode({
              mother: contextBase,
              event: {
                click: obj.func(desid),
              },
              style: {
                display: "flex",
                width: String(contextButtonWidth) + ea,
                height: String(contextButtonHeight) + ea,
                background: colorChip.gradientGray,
                borderRadius: String(5) + px,
                marginBottom: String(contextButtonInnerMargin) + ea,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              },
              child: {
                text: obj.title,
                style: {
                  fontSize: String(contextButtonSize) + ea,
                  fontWeight: String(contextButtonWeight),
                  color: colorChip.white,
                  position: "relative",
                  display: "inline-block",
                  top: String(contextButtonTextTop) + ea,
                }
              }
            });
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    careContentsLoad = async (reload = false, filterFunc = null) => {
      try {

        if (reload) {
          ({ thisDesigners, standards, columns, values } = await instance.careDataRender(filterFunc));
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let { designer, projects } of thisDesigners) {
      
          progress = projects.filter((p) => { return /진행/gi.test(p.process.status )})
          pending = projects.filter((p) => { return /대기/gi.test(p.process.status )})
    
          // id name area

          createNode({
            mother: idNameArea,
            attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
            event: {
              click: instance.normalWhiteCard(designer.desid),
              dblclick: importantMarkingEvent(designer.desid),
              contextmenu: designerSubMenuEvent(designer.desid, designer.designer),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[designer.desid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                  next: {
                    class: [ importantCircleClassName ],
                    attribute: { toggle: designer.important ? "on" : "off" },
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: designer.important ? "inline-block" : "none",
                      position: "absolute",
                      transform: "scale(0.4)",
                      transformOrigin: "100% 0%",
                      right: String(index === 0 ? 0 : circleRight) + ea,
                      top: String(circleTop) + ea,
                      zIndex: String(0),
                    }
                  }
                }
              }
            })
          });
          
          if (projects.length >= 3) {
            for (let i = 1; i < projects.length; i++) {
              createNode({
                mother: idNameArea,
                attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
                class: [ standardCaseClassName ],
                style: {
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  height: String(idNameHeight) + ea,
                  justifyContent: "center",
                  alignItems: "start",
                  cursor: "pointer",
                },
                children: standards.values[designer.desid].map(({ value, name }, index) => {
                  return {
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "end",
                      alignItems: "start",
                      width: String((i === 1 ? (index === 0 ? 0 : 132) : 0)) + ea,
                    },
                    child: {
                      class: [ valueTargetClassName ],
                      attribute: { desid: designer.desid, index: String(index), i: String(i) },
                      event: {
                        click: function (e) {
                          const desid = this.getAttribute("desid");
                          const index = Number(this.getAttribute("index"));
                          const i = Number(this.getAttribute("i"));
                          if (i === 1 && index === 1) {
                            blankHref(FRONTHOST + "/designer/dashboard.php?desid=" + desid + "&view=test");
                          }
                        }
                      },
                      text: (i === 1 ? (index === 0 ? "" : "진행중 : " + String(progress.length) + "&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;대기 : " + String(pending.length) + "\n<b%디자이너 콘솔%b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") : ""),
                      style: {
                        position: "relative",
                        transition: "all 0.3s ease",
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(fontWeight),
                        top: String(smallTextTop) + ea,
                        color: colorChip.black,
                        textAlign: "right",
                        lineHeight: String(smallLineHeight),
                      },
                      under: {
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(300),
                        color: colorChip.deactive,
                      },
                      bold: {
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(600),
                        color: colorChip.purple,
                      },
                      next: {
                        mode: "svg",
                        source: svgMaker.blankArrow(colorChip.purple),
                        style: {
                          display: i === 1 && index !== 0 ? "inline-block" : "none",
                          position: "absolute",
                          right: String(blankIconRight) + ea,
                          top: String(blankIconTop) + ea,
                          width: String(blankIconWidth) + ea,
                        }
                      }
                    }
                  }
                })
              });
            }
          } else {
            for (let i = 1; i < 3; i++) {
              createNode({
                mother: idNameArea,
                attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
                class: [ standardCaseClassName ],
                style: {
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  height: String(idNameHeight) + ea,
                  justifyContent: "center",
                  alignItems: "start",
                  cursor: "pointer",
                },
                children: standards.values[designer.desid].map(({ value, name }, index) => {
                  return {
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "end",
                      alignItems: "start",
                      width: String((i === 1 ? (index === 0 ? 0 : 132) : 0)) + ea,
                    },
                    child: {
                      class: [ valueTargetClassName ],
                      text: (i === 1 ? (index === 0 ? "" : "진행중 : " + String(progress.length) + "&nbsp;&nbsp;&nbsp;<u%/%u>&nbsp;&nbsp;&nbsp;대기 : " + String(pending.length) + "\n<b%디자이너 콘솔%b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") : ""),
                      style: {
                        position: "relative",
                        transition: "all 0.3s ease",
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(fontWeight),
                        top: String(smallTextTop) + ea,
                        color: colorChip.black,
                        textAlign: "right",
                        lineHeight: String(smallLineHeight),
                      },
                      under: {
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(300),
                        color: colorChip.deactive,
                      },
                      bold: {
                        fontSize: String(smallTextSize) + ea,
                        fontWeight: String(600),
                        color: colorChip.purple,
                      },
                      next: {
                        mode: "svg",
                        source: svgMaker.blankArrow(colorChip.purple),
                        style: {
                          display: i === 1 && index !== 0 ? "inline-block" : "none",
                          position: "absolute",
                          right: String(blankIconRight) + ea,
                          top: String(blankIconTop) + ea,
                          width: String(blankIconWidth) + ea,
                        }
                      }
                    }
                  }
                })
              });
            }
          }

          // bar -------------------------------------------------------------------------------------------
          createNode({
            mother: idNameArea,
            class: [ standardCaseClassName, standardBarCaseClassName ],
            attribute: { desid: designer.desid, lastfilter: "none" },
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[designer.desid].map(({ value, name }, index) => {
              if (index === 0) {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(standards.columns[index].width) + ea,
                  },
                  child: {
                    style: {
                      position: "absolute",
                      top: String(idNameLineTop) + ea,
                      width: String(idNameLineWidth) + ea,
                      left: String(0),
                      borderBottom: "1px dashed " + colorChip.gray4,
                    },
                  }
                }
              } else {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(standards.columns[index].width) + ea,
                  },
                  child: {
                    class: [ valueTargetClassName ],
                    style: {
                      position: "relative",
                      transition: "all 0.3s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.black,
                    },
                  }
                }
              }
            })
          });
          // bar -------------------------------------------------------------------------------------------


          // value area

          if (projects.length >= 3) {

            for (let p = 0; p < projects.length; p++) {
              thisTong = createNode({
                mother: valueArea,
                attribute: { desid: designer.desid, lastfilter: "none", proid: projects[p].proid },
                class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
                event: {
                  click: async function (e) {
                    try {
                      const proid = this.getAttribute("proid");
                      const desid = this.getAttribute("desid");
                      const eventFunction = instance.careWhiteCard(proid, false);

                      await eventFunction(e);

                    } catch (e) {
                      console.log(e);
                    }
                  },
                  contextmenu: async function (e) {
                    try {
                      e.preventDefault();
                      const proid = this.getAttribute("proid");
                      const desid = this.getAttribute("desid");
                      const eventFunction = instance.careWhiteCard(proid, true);

                      await eventFunction(e);

                    } catch (e) {
                      console.log(e);
                    }
                  },
                  mouseenter: hoverEvent(),
                  mouseleave: hoverOutEvent(),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: String(idNameHeight) + ea,
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                  cursor: "pointer",
                }
              })
              for (let i = 0; i < columns.length; i++) {
                createNode({
                  mother: thisTong,
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(columns[i].width) + ea,
                  },
                  child: {
                    style: {
                      display: "inline-block",
                      width: String(90) + '%',
                      position: "relative",
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        width: String(valueMaxWidth) + ea,
                        position: "relative",
                        left: withOut(50, valueMaxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        attribute: {
                          desid: designer.desid,
                          name: values[designer.desid][i][p].name,
                        },
                        class: [ valueTargetClassName ],
                        text: String(values[designer.desid][i][p].value),
                        style: {
                          position: "relative",
                          transition: "all 0.1s ease",
                          fontSize: String(fontSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.black,
                        }
                      }
                    }
                  }
                });
              }
            }

          } else {

            for (let p = 0; p < projects.length; p++) {
              thisTong = createNode({
                mother: valueArea,
                attribute: { desid: designer.desid, lastfilter: "none" },
                class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
                event: {
                  mouseenter: hoverEvent(),
                  mouseleave: hoverOutEvent(),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: String(idNameHeight) + ea,
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                  cursor: "pointer",
                }
              })
              for (let i = 0; i < columns.length; i++) {
                createNode({
                  mother: thisTong,
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(columns[i].width) + ea,
                  },
                  child: {
                    style: {
                      display: "inline-block",
                      width: String(90) + '%',
                      position: "relative",
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        width: String(valueMaxWidth) + ea,
                        position: "relative",
                        left: withOut(50, valueMaxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        attribute: {
                          desid: designer.desid,
                          name: values[designer.desid][i][p].name,
                        },
                        class: [ valueTargetClassName ],
                        text: String(values[designer.desid][i][p].value),
                        style: {
                          position: "relative",
                          transition: "all 0.1s ease",
                          fontSize: String(fontSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.black,
                        }
                      }
                    }
                  }
                });
              }
            }
            for (let p = 0; p < 3 - projects.length; p++) {
              thisTong = createNode({
                mother: valueArea,
                attribute: { desid: designer.desid, lastfilter: "none", blank: "true" },
                class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
                event: {
                  mouseenter: hoverEvent(),
                  mouseleave: hoverOutEvent(),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: String(idNameHeight) + ea,
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                  cursor: "pointer",
                }
              })
              for (let i = 0; i < columns.length; i++) {
                createNode({
                  mother: thisTong,
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(columns[i].width) + ea,
                  },
                  child: {
                    style: {
                      display: "inline-block",
                      width: String(90) + '%',
                      position: "relative",
                      overflow: "hidden",
                      textAlign: "center",
                    },
                    child: {
                      style: {
                        display: "flex",
                        width: String(valueMaxWidth) + ea,
                        position: "relative",
                        left: withOut(50, valueMaxWidth / 2, ea),
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      child: {
                        attribute: {
                          desid: designer.desid,
                        },
                        class: [ valueTargetClassName ],
                        text: "",
                        style: {
                          position: "relative",
                          transition: "all 0.1s ease",
                          fontSize: String(fontSize) + ea,
                          fontWeight: String(valueWeight),
                          color: colorChip.black,
                        }
                      }
                    }
                  }
                });
              }
            }

          }

          // bar -------------------------------------------------------------------------------------------
          thisTong = createNode({
            mother: valueArea,
            attribute: { desid: designer.desid, lastfilter: "none", blank: "true", bar: "true" },
            class: [ moveTargetClassName, valueCaseClassName, valueBarCaseClassName, designer.desid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          });
          createNode({
            mother: thisTong,
            style: {
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              justifyContent: "center",
              alignItems: "start",
              width: String(valueLineMaxWidth) + ea,
            },
            child: {
              style: {
                position: "absolute",
                top: String(idNameLineTop) + ea,
                width: String(valueLineMaxWidth) + ea,
                left: String(valueLineLeft) + ea,
                borderBottom: "1px dashed " + colorChip.gray3,
              },
            }
          });
          // bar -------------------------------------------------------------------------------------------

        }

        await instance.careColorSync(typeof filterFunc === "function");
        await instance.careSubPannel();

      } catch (e) {
        console.log(e);
      }
    }

    await careContentsLoad(false, filterFunc);
    this.careContentsLoad = careContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.reloadProjects = function (serverResponse) {
  const instance = this;
  let projects, clients, designers, history;
  let proid, cliid, desid, service;
  let thisClient, thisDesigner, thisHistory;
  let clientHistory, thisClientHistory;
  let rawContents, rawContent;
  let requestNumber;
  let sendStatus, sendSchedule, sendFile;
  let thisSendStatus, thisSendSchedule, thisSendFile;

  projects = serverResponse.projects;
  clients = serverResponse.clients;
  designers = serverResponse.designers;
  history = serverResponse.history;
  clientHistory = serverResponse.clientHistory;
  rawContents = serverResponse.rawContents;
  sendStatus = serverResponse.sendStatus;
  sendSchedule = serverResponse.sendSchedule;
  sendFile = serverResponse.sendFile;

  for (let project of projects) {
    ({ proid, cliid, desid, service } = project);

    thisClient = clients.find((obj) => { return obj.cliid === cliid });
    thisDesigner = designers.find((obj) => { return obj.desid === desid });
    thisHistory = history.find((obj) => {
      return obj.proid === proid
    });
    thisClientHistory = clientHistory.find((obj) => {
      return obj.cliid === thisClient.cliid
    });
    rawContent = rawContents.find((obj) => {
      return obj.proid === proid
    });

    thisSendStatus = sendStatus.filter((obj) => { return obj.proid === proid });
    thisSendSchedule = sendSchedule.filter((obj) => { return obj.proid === proid });
    thisSendFile = sendFile.filter((obj) => { return obj.proid === proid });

    requestNumber = 0;
    for (let i = 0; i < thisClient.requests.length; i++) {
      if (thisClient.requests[i].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
        requestNumber = i;
        break;
      }
    }

    project.client = thisClient;
    project.requestNumber = requestNumber;
    project.designer = thisDesigner;
    project.history = thisHistory;
    project.clientHistory = thisClientHistory;
    project.name = thisClient.name;
    project.phone = thisClient.phone;
    if (rawContent !== undefined) {
      project.rawDate = rawContent.date;
    } else {
      project.rawDate = new Date(1800, 0, 1);
    }
    if (thisSendStatus.length > 0) {
      thisSendStatus.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendStatus = thisSendStatus[0].date;
    } else {
      project.sendStatus = new Date(1800, 0, 1);
    }
    if (thisSendSchedule.length > 0) {
      thisSendSchedule.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendSchedule = thisSendSchedule[0].date;
    } else {
      project.sendSchedule = new Date(1800, 0, 1);
    }
    if (thisSendFile.length > 0) {
      thisSendFile.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
      project.sendFile = thisSendFile[0].date;
    } else {
      project.sendFile = new Date(1800, 0, 1);
    }

  }

  if (projects.length !== 1) {
    projects = projects.filter((obj) => {
      return obj.proid !== "p1801_aa01s" && obj.proid !== "p1801_aa02s";
    });
  }

  this.clientHistory = clientHistory;
  this.history = history;
  this.projects = projects;
}

DesignerJs.prototype.careColorSync = async function (allBlack = false) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;
    let thisTarget;

    colorStandard = [
      {
        value: "진행중",
        color: colorChip.black,
      },
      {
        value: "대기",
        color: allBlack ? colorChip.black : colorChip.deactive,
      },
      {
        value: "드랍",
        color: allBlack ? colorChip.black : colorChip.red,
      },
      {
        value: "홀딩",
        color: allBlack ? colorChip.black : colorChip.red,
      },
    ];

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisTarget = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", "status");
      if (thisTarget !== null) {
        thisValue = thisTarget.textContent.trim();
        thisColor = colorStandard.find((o) => { return o.value === thisValue }).color;
        thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = thisColor;
          dom.setAttribute("color", thisColor);
        }
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.careView = async function () {
  const instance = this;
  const { ea, totalContents } = this;
  const { createNode, withOut, colorChip, ajaxJson, returnGet, cleanChildren, ajaxMultiple, hasQuery, removeQuery, appendQuery } = GeneralJs;
  try {
    const getObj = returnGet();
    const emptyDate = () => { return new Date(1800, 0, 1) };
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    let loading;
    let serverResponse;
    let projects;
    let clients, designers;
    let proidArr;
    let history;
    let clientHistory;
    let cliidArr;
    let secondRes;
    let matrix;

    loading = await this.mother.loadingRun();

    if (instance.totalMother !== null && instance.totalMother !== undefined) {
      totalContents.removeChild(instance.totalMother);
    }

    if (hasQuery("type")) {
      removeQuery("type");
    }
    appendQuery({ type: "care" });

    ({ projects, clients } = await ajaxJson({ mode: "pre", searchMode: (typeof getObj.proid === "string" ? getObj.proid : "false"), careView: (getObj.view === "care" ? 1 : 0) }, BACKHOST + "/processConsole", { equal: true }));
    proidArr = projects.map((p) => { return p.proid });
    cliidArr = clients.map((c) => { return c.cliid });

    matrix = await ajaxMultiple([
      [ { noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners" ],
      [ { method: "project", idArr: proidArr }, BACKHOST + "/getHistoryTotal" ],
      [ { method: "client", idArr: cliidArr }, BACKHOST + "/getHistoryTotal" ],
      [ { proidArr }, SECONDHOST + "/getProcessData" ],
    ]);

    designers = matrix[0];
    history = Object.values(matrix[1]);
    clientHistory = Object.values(matrix[2]);
    secondRes = matrix[3];

    serverResponse = {
      projects,
      clients,
      designers,
      history,
      clientHistory,
      rawContents: secondRes.rawContents,
      sendStatus: secondRes.sendStatus,
      sendSchedule: secondRes.sendSchedule,
      sendFile: secondRes.sendFile
    }

    this.reloadProjects(serverResponse);
    this.designers = designers;

    this.contents = null;
    ajaxJson({}, SECONDHOST + "/getChecklist").then((contents) => {
      instance.contents = contents;
      instance.panContents = this.contents.map((obj) => { return obj.children }).flat();
      instance.panList = [];
      instance.itemList = [];
      instance.panNumbers = [];
      instance.naviHeight = 0;
      instance.menuArea = null;
    }).catch((err) => {
      window.location.reload();
    })

    this.matrix = [];
    this.names = [];
    this.bigDoms = [];
    this.clientDoms = [];
    this.totalValues = [];
    this.totalNumbers = [];
    this.onofflineWordsClassName = "onofflineWordsClassName";
    this.numbersExtractClassName = "numbersExtractClassName";
    this.viewMode = "care";

    this.cleanSearchEvent();
    await this.careBase(null);
    await this.careSearchEvent();
    
    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.numbersColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.normalDataRender(false));

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

Set.prototype.intersection = function (setB) {
  let intersection = new Set();
  for (let elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

Set.prototype.union = function (setB) {
  let union = new Set(this);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
}

DesignerJs.prototype.numbersSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          const designers = await ajaxJson({ noFlat: true, query: value }, BACKHOST + "/searchDesigners", { equal: true });
          const histories = await ajaxJson({
            method: "designer",
            property: [ "manager", "important" ],
            idArr: designers.map((d) => { return d.desid }),
          }, BACKHOST + "/getHistoryProperty", { equal: true });

          for (let designer of designers) {
            designer.manager = histories[designer.desid].manager;
            designer.important = histories[designer.desid].important;
          }

          instance.designers = designers;
          await instance.numbersContentsLoad(true);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.numbersSubPannel = async function (entireDesignerMode = false) {
  const instance = this;
  const { ea, totalContents, belowHeight, totalMother } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const titleStringClassName = "titleStringClassName";
  try {
    const zIndex = 2;
    let pannelBase;
    let pannelOuterMargin;
    let pannelInnerPadding;
    let pannelMenu;
    let menuPromptWidth;
    let menuPromptHeight;
    let menuTextTop;
    let menuBetween;
    let menuSize;
    let menuWeight;
    let pannelTong;
    let num;

    pannelOuterMargin = 40;
    pannelInnerPadding = 6;

    menuPromptWidth = 140;
    menuPromptHeight = 32;
    menuTextTop = isMac() ? -1 : 1,
    menuBetween = 3;
    menuSize = 13;
    menuWeight = 700;

    pannelMenu = [
      (entireDesignerMode ? {
        title: "협업 디자이너",
        event: () => {
          return async function (e) {
            try {
              await instance.numbersView(false);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      } : {
        title: "전체 디자이너",
        event: () => {
          return async function (e) {
            try {
              await instance.numbersView(true);
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      }),
      {
        title: "디자이너 속성 모드",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
      {
        title: "프로젝트 케어 모드",
        event: () => {
          return async function (e) {
            try {
              window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal&type=care";
            } catch (e) {
              console.log(e);
              window.alert("오류가 발생하였습니다! 다시 시도해주세요!");
              window.location.reload();
            }
          }
        },
      },
    ];

    pannelBase = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "absolute",
        bottom: String(pannelOuterMargin) + ea,
        right: String(pannelOuterMargin) + ea,
        background: colorChip.white,
        zIndex: String(zIndex),
        borderRadius: String(5) + "px",
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 3px 15px -9px " + colorChip.shadow,
        padding: String(pannelInnerPadding) + ea,
        flexDirection: "column",
      },
      child: {
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          flexDirection: "column",
        }
      }
    });
    pannelTong = pannelBase.firstChild;

    num = 0;
    for (let obj of pannelMenu) {
      createNode({
        mother: pannelTong,
        event: {
          click: obj.event(),
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(menuPromptWidth) + ea,
          height: String(menuPromptHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGray,
          marginBottom: String(num === pannelMenu.length - 1 ? 0 : menuBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          class: [ titleStringClassName ],
          text: obj.title,
          event: {
            selectstart: (e) => { e.preventDefault() },
          },
          style: {
            position: "relative",
            top: String(menuTextTop) + ea,
            fontSize: String(menuSize) + ea,
            fontWeight: String(menuWeight),
            color: colorChip.white,
          }
        }
      })
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.numbersDataRender = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows, profileList, workList, representativeList } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute, equalJson } = GeneralJs;
  try {
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    const now = new Date();
    const past = new Date();
    const yearsAgo = new Date();
    const agoDelta = 36;
    const agoYearDelta = 4;
    let columns;
    let values;
    let timeDelta;
    let year, month;
    let filteredProjectsProposal;
    let filteredProjectsContract;
    let thisTarget;
    let thisValueDoms;
    let yearDelta;
    let monthDelta;
    let tempDate;
    let tempString;
    let thisYear, from, to;
    let filteredFilteredProjectsProposal;
    let filteredFilteredProjectsContract;
    let thisDate;
    let standards;
    let thisValueTemp;
    let filteredChecklistSendRows;
    let filteredProfileSendRows;
    let filteredWorkSendRows;
    let completeAnalyticsRows;
    let profileListSet;
    let workListSet0, workListSet1, workListSet2, workListSet3;
    let filteredCareerSendRows;
    let filteredEntireSendRows;
    let careerUpdateBoo;
    let schoolUpdateBoo;
    let threeStrengthBoo;
    let representativeBoo;
    let thisRealtime;
    let thisPossible;
    let possible3m, possible6m, possible12m;
    let preStandard0, preStandard1, preStandard2, preStandard3;
    let range0, range1;
    let standard0, standard1, standard2, standard3;

    preStandard0 = new Date();
    preStandard1 = new Date();
    preStandard2 = new Date();
    preStandard3 = new Date();

    preStandard1.setMonth(preStandard1.getMonth() + 3);
    preStandard2.setMonth(preStandard2.getMonth() + 6);
    preStandard3.setMonth(preStandard3.getMonth() + 12);

    past.setFullYear(past.getFullYear() - agoYearDelta);
    past.setMonth(0);
    past.setDate(1);
    past.setHours(9);
    past.setMinutes(0);
    past.setSeconds(0);

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(yearsAgo, now);

    profileListSet = [ ...new Set(profileList.map((o) => { return o.desid })) ];
    workListSet0 = [ ...new Set(workList[0].map((o) => { return o.desid })) ];
    workListSet1 = [ ...new Set(workList[1].map((o) => { return o.desid })) ];
    workListSet2 = [ ...new Set(workList[2].map((o) => { return o.desid })) ];
    workListSet3 = [ ...new Set(workList[3].map((o) => { return o.desid })) ];

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "desid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "계약 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "협약 완료",
            color: colorChip.black,
          },
          {
            value: "협약 휴직",
            color: colorChip.deactive,
          },
          {
            value: "협약 해지",
            color: colorChip.gray3,
          },
          {
            value: "신청 대기",
            color: colorChip.red,
          },
          {
            value: "컨택중",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "협약 완료",
          "협약 휴직",
          "협약 해지",
          "신청 대기",
          "컨택중",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        }))
      },
      {
        title: "대기",
        width: 80,
        name: "processPending",
        type: "number",
      },
      {
        title: "진행중",
        width: 80,
        name: "processDoing",
        type: "number",
      },
      {
        title: "홈퍼니싱",
        width: 100,
        name: "homefurnishing",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "홈스타일링",
        width: 100,
        name: "homestyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "토탈 스타일링",
        width: 100,
        name: "totalstyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "설계 변경",
        width: 100,
        name: "extrastyling",
        type: "boolean",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          },
          {
            value: "가능",
            functionName: "filterEvent_가능",
          },
          {
            value: "불가능",
            functionName: "filterEvent_불가능",
          },
        ],
      },
      {
        title: "3개월 가능수",
        width: 90,
        name: "possible3m",
        type: "number",
      },
      {
        title: "6개월 가능수",
        width: 90,
        name: "possible6m",
        type: "number",
      },
      {
        title: "1년 가능수",
        width: 90,
        name: "possible12m",
        type: "number",
      },
      {
        title: "총 추천수",
        width: 90,
        name: "proposalNumber",
        type: "number",
      },
      {
        title: "총 진행수",
        width: 90,
        name: "contractNumber",
        type: "number",
      },
      {
        title: "진행율",
        width: 90,
        name: "contractPercentage",
        type: "percentage",
      },
      {
        title: "총 정산액",
        width: 120,
        name: "totalAmount",
        type: "number",
        money: true,
      },
    ];

    for (let i = 0; i < yearDelta; i++) {
      columns.push({
        title: String(now.getFullYear() - i) + " " + "추천수",
        width: 100,
        name: "proposalNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행수",
        width: 100,
        name: "contractNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행율",
        width: 100,
        name: "contractPercentageY" + String(i),
        type: "percentage",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "총 정산액",
        width: 120,
        name: "totalAmountY" + String(i),
        type: "number",
        money: true,
      });
    }

    for (let i = 0; i < monthDelta; i++) {
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({
        title: tempString + " " + "추천수",
        width: 100,
        name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1),
        type: "number",
      });
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({
        title: tempString + " " + "계약수",
        width: 100,
        name: "monthDeltaContract" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1),
        type: "number",
      });
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({
        title: tempString + " " + "정산액",
        width: 100,
        name: "monthDeltaAmount" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1),
        type: "number",
        money: true
      });
    }

    values = {};

    for (let designer of instance.designers) {

      filteredProjectsProposal = instance.projects.filter((p) => {
        return p.proposal.detail.some((obj) => {
          return obj.desid === designer.desid
        });
      });

      filteredProjectsContract = instance.projects.filter((p) => {
        return p.desid === designer.desid;
      });

      thisRealtime = instance.realtimeDesigner.data.find((o) => { return o.desid === designer.desid });
      thisPossible = [];
      if (thisRealtime !== undefined) {
        thisPossible = equalJson(JSON.stringify(thisRealtime.possible));
      }

      possible3m = thisPossible.filter((o) => {
        standard0 = Math.round((((o.start.valueOf() / 1000) / 60) / 60) / 24);
        standard1 = Math.round((((o.end.valueOf() / 1000) / 60) / 60) / 24);
        standard2 = Math.round((((preStandard0.valueOf() / 1000) / 60) / 60) / 24);
        standard3 = Math.round((((preStandard1.valueOf() / 1000) / 60) / 60) / 24);
        range0 = [];
        range1 = [];
        for (let i = standard0; i <= standard1; i++) {
          range0.push(i);
        }
        for (let i = standard2; i <= standard3; i++) {
          range1.push(i);
        }
        range0 = new Set(range0);
        range1 = new Set(range1);
        return (range0.intersection(range1)).size > 0;
      });
      possible6m = thisPossible.filter((o) => {
        standard0 = Math.round((((o.start.valueOf() / 1000) / 60) / 60) / 24);
        standard1 = Math.round((((o.end.valueOf() / 1000) / 60) / 60) / 24);
        standard2 = Math.round((((preStandard0.valueOf() / 1000) / 60) / 60) / 24);
        standard3 = Math.round((((preStandard2.valueOf() / 1000) / 60) / 60) / 24);
        range0 = [];
        range1 = [];
        for (let i = standard0; i <= standard1; i++) {
          range0.push(i);
        }
        for (let i = standard2; i <= standard3; i++) {
          range1.push(i);
        }
        range0 = new Set(range0);
        range1 = new Set(range1);
        return (range0.intersection(range1)).size > 0;
      });
      possible12m = thisPossible.filter((o) => {
        standard0 = Math.round((((o.start.valueOf() / 1000) / 60) / 60) / 24);
        standard1 = Math.round((((o.end.valueOf() / 1000) / 60) / 60) / 24);
        standard2 = Math.round((((preStandard0.valueOf() / 1000) / 60) / 60) / 24);
        standard3 = Math.round((((preStandard3.valueOf() / 1000) / 60) / 60) / 24);
        range0 = [];
        range1 = [];
        for (let i = standard0; i <= standard1; i++) {
          range0.push(i);
        }
        for (let i = standard2; i <= standard3; i++) {
          range1.push(i);
        }
        range0 = new Set(range0);
        range1 = new Set(range1);
        return (range0.intersection(range1)).size > 0;
      });
      
      if (possible3m.length > 0) {
        possible3m = possible3m.map((o) => { return o.matrix });
        possible3m = possible3m.flat();
        possible3m = possible3m.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);
      } else {
        possible3m = 0;
      }
      if (possible6m.length > 0) {
        possible6m = possible6m.map((o) => { return o.matrix });
        possible6m = possible6m.flat();
        possible6m = possible6m.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);
      } else {
        possible6m = 0;
      }
      if (possible12m.length > 0) {
        possible12m = possible12m.map((o) => { return o.matrix });
        possible12m = possible12m.flat();
        possible12m = possible12m.reduce((acc, curr) => { return acc >= curr ? acc : curr }, 0);
      } else {
        possible12m = 0;
      }

      standards.values[designer.desid] = [
        {
          value: designer.desid,
          name: "desid",
        },
        {
          value: designer.designer,
          name: "designer",
        },
      ];

      values[designer.desid] = [
        {
          value: designer.information.contract.status,
          name: "status",
        },
      ];
      values[designer.desid].push({
        value: String(filteredProjectsContract.filter((p) => { return /^대/.test(p.process.status) }).length),
        name: "processPending",
      });
      values[designer.desid].push({
        value: String(filteredProjectsContract.filter((p) => { return /^진/.test(p.process.status) }).length),
        name: "processDoing",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[0][1] === 1 ? "가능" : "불가능",
        name: "homefurnishing",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[1][1] === 1 ? "가능" : "불가능",
        name: "homestyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[2][1] === 1 ? "가능" : "불가능",
        name: "totalstyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[3][1] === 1 ? "가능" : "불가능",
        name: "extrastyling",
      });
      values[designer.desid].push({
        value: String(possible3m),
        name: "possible3m",
      });
      values[designer.desid].push({
        value: String(possible6m),
        name: "possible6m",
      });
      values[designer.desid].push({
        value: String(possible12m),
        name: "possible12m",
      });
      values[designer.desid].push({
        value: String(filteredProjectsProposal.length),
        name: "proposalNumber",
      });
      values[designer.desid].push({
        value: String(filteredProjectsContract.length),
        name: "contractNumber",
      });
      values[designer.desid].push({
        value: String(Math.round((filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length)) * 10000) / 100) + '%',
        name: "contractPercentage",
      });
      values[designer.desid].push({
        value: autoComma(Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원',
        name: "totalAmount",
      });

      for (let i = 0; i < yearDelta; i++) {

        thisYear = (new Date()).getFullYear() - i;
        from = new Date(thisYear, 0, 1);
        to = new Date(thisYear + 1, 0, 1);

        filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
          return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
        });

        filteredFilteredProjectsContract = filteredProjectsContract.filter((p) => {
          return (p.process.contract.first.date.valueOf() >= from.valueOf() && p.process.contract.first.date.valueOf() < to.valueOf());
        });


        values[designer.desid].push({ value: String(filteredFilteredProjectsProposal.length), name: "proposalNumberY" + String(i) });
        values[designer.desid].push({ value: String(filteredFilteredProjectsContract.length), name: "contractNumberY" + String(i) });
        values[designer.desid].push({ value: (String(Math.round((filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length)) * 10000) / 100) + '%'), name: "contractPercentageY" + String(i) });
        values[designer.desid].push({ value: (autoComma(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원'), name: "totalAmountY" + String(i) });
      }
  
      for (let i = 0; i < monthDelta; i++) {

        thisDate = new Date();
        thisDate.setMonth(thisDate.getMonth() - i);
        from = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
        to = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
        to.setMonth(to.getMonth() + 1);

        filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
          return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
        });
        filteredFilteredProjectsContract = filteredProjectsContract.filter((p) => {
          return (p.process.contract.first.date.valueOf() >= from.valueOf() && p.process.contract.first.date.valueOf() < to.valueOf());
        });

        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - i);
        tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
        values[designer.desid].push({ value: String(filteredFilteredProjectsProposal.length), name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
        values[designer.desid].push({ value: String(filteredFilteredProjectsContract.length), name: "monthDeltaContract" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
        values[designer.desid].push({ value: (autoComma(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원'), name: "monthDeltaAmount" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
      }

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.numbersBase = async function (entireDesignerMode = false) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, autoComma } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const designerSubMenuEventFactorClassName = "designerSubMenuEventFactorClassName";
  const sumValueRowsClassName = "sumValueRowsClassName";
  const valueSumTargetClassName = "valueSumTargetClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let menuEventTong;
    let numbersContentsLoad;
    let circleRight, circleTop;
    let importantMarkingEvent;
    let designerSubMenuEvent;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
    let sumMatrix;

    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 80;
    menuPromptHeight = 28;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 230;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    ({ standards, columns, values } = await this.numbersDataRender());
  
    hoverEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    menuEventTong = {
      sortEvent: (thisType, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const [ sumStandard, valueStandard ] = Array.from(document.querySelectorAll('.' + sumValueRowsClassName));
            const type = columns[index].type;
            let domMatrix;
            let thisDesid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }
  
            domMatrix.sort((a, b) => {
              let aValue, bValue;
              let aSortValue, bSortValue;
              let tempArr;
  
              aValue = findByAttribute([ ...a[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              bValue = findByAttribute([ ...b[1].querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent;
              
              if (type === "string") {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              } else if (type === "number") {
                aValue = aValue.replace(/[^0-9]/gi, '')
                bValue = bValue.replace(/[^0-9]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "percentage") {
                aValue = aValue.replace(/[^0-9\.]/gi, '')
                bValue = bValue.replace(/[^0-9\.]/gi, '')
                aSortValue = aValue !== '' ? Number(aValue) : 0;
                bSortValue = bValue !== '' ? Number(bValue) : 0;
              } else if (type === "date") {
                aSortValue = aValue !== '' ? stringToDate(aValue) : stringToDate("1800-01-01");
                bSortValue = bValue !== '' ? stringToDate(bValue) : stringToDate("1800-01-01");
                aSortValue = aSortValue.valueOf();
                bSortValue = bSortValue.valueOf();
              } else if (type === "during") {
  
                if (/년/gi.test(aValue)) {
                  tempArr = aValue.split('년');
                  if (tempArr.length > 1) {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    aSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  aSortValue = Number(aValue.replace(/[^0-9]/gi, ''));
                }
  
                if (/년/gi.test(bValue)) {
                  tempArr = bValue.split('년');
                  if (tempArr.length > 1) {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) + Number(tempArr[1].replace(/[^0-9]/gi, ''));
                  } else {
                    bSortValue = (Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12);
                  }
                } else {
                  bSortValue = Number(bValue.replace(/[^0-9]/gi, ''));
                }
  
              } else {
                aSortValue = aValue !== '' ? aValue.charCodeAt(0) : 0;
                bSortValue = bValue !== '' ? bValue.charCodeAt(0) : 0;
              }
              
              if (thisType === "down") {
                return bSortValue - aSortValue;
              } else {
                return aSortValue - bSortValue;
              }
            });
  
            for (let [ standard, value ] of domMatrix) {
              idNameArea.appendChild(standard);
              valueArea.appendChild(value);
            }

            idNameArea.appendChild(sumStandard);
            valueArea.appendChild(valueStandard);
  
            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
      filterEvent: (thisValue, name, index) => {
        return async function (e) {
          try {
            const idNameArea = document.querySelector('.' + idNameAreaClassName);
            const valueArea = document.querySelector('.' + valueAreaClassName);
            const idNameDoms = Array.from(document.querySelectorAll('.' + standardCaseClassName));
            const valueDoms = Array.from(document.querySelectorAll('.' + valueCaseClassName));
            const [ sumStandard, valueStandard ] = Array.from(document.querySelectorAll('.' + sumValueRowsClassName));
            const last = "lastfilter";
            const type = columns[index].type;
            const typeArr = columns.map((o) => { return o.type });
            const moneyArr = columns.map((o) => { return o.money ? true : false });
            let domMatrix;
            let thisDesid;
            let thisValueDom;
            let valueMatrix;
            let valueMatrixMatrix;
            let sumArr;
            let num;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisDesid = idNameDoms[i].getAttribute("desid");
              thisValueDom = findByAttribute(valueDoms, "desid", thisDesid);
              domMatrix.push([
                idNameDoms[i],
                thisValueDom
              ]);
            }

            valueMatrixMatrix = [];
            if (thisValue === "$all") {
              for (let [ standard, value ] of domMatrix) {
                standard.style.display = "flex";
                value.style.display = "flex";
                valueMatrix = [ ...value.children ].map((dom) => { return dom.querySelector('.' + valueTargetClassName).textContent });
                valueMatrix = valueMatrix.map((str, index) => {
                  if (typeArr[index] === "number") {
                    return Number(str.replace(/[^0-9\.\-]/gi, ''));
                  } else {
                    return str;
                  }
                });
                valueMatrixMatrix.push(valueMatrix);
                standard.setAttribute(last, "none");
                value.setAttribute(last, "none");
              }
            } else {
              for (let [ standard, value ] of domMatrix) {
                if (standard.getAttribute(last) === name) {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    standard.style.display = "flex";
                    value.style.display = "flex";
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                } else {
                  if (findByAttribute([ ...value.querySelectorAll('.' + valueTargetClassName) ], "name", name).textContent.trim() === thisValue) {
                    if (standard.style.display !== "none") {
                      standard.style.display = "flex";
                      value.style.display = "flex";
                    }
                  } else {
                    standard.style.display = "none";
                    value.style.display = "none";
                  }
                }
                if (value.style.display !== "none") {
                  valueMatrix = [ ...value.children ].map((dom) => { return dom.querySelector('.' + valueTargetClassName).textContent });
                  valueMatrix = valueMatrix.map((str, index) => {
                    if (typeArr[index] === "number") {
                      return Number(str.replace(/[^0-9\.\-]/gi, ''));
                    } else {
                      return str;
                    }
                  });
                  valueMatrixMatrix.push(valueMatrix);
                }
                standard.setAttribute(last, name);
                value.setAttribute(last, name);
              }
            }

            sumArr = valueMatrixMatrix.reduce((acc, curr) => {
              let newArr;
              newArr = GeneralJs.equalJson(JSON.stringify(acc));
              for (let i = 0; i < newArr.length; i++) {
                if (typeArr[i] === "number") {
                  newArr[i] = newArr[i] + curr[i];
                }
              }
              return newArr;
            }, (new Array(typeArr.length)).fill(0, 0).map((z, index) => { return typeArr[index] === "number" ? z : '-' }));

            sumArr = sumArr.map((i, index) => {
              return moneyArr[index] ? GeneralJs.autoComma(i) + "원" : String(i);
            });

            num = 0;
            for (let dom of valueStandard.children) {
              dom.querySelector('.' + valueSumTargetClassName).textContent = sumArr[num];
              num++;
            }

            idNameArea.appendChild(sumStandard);
            valueArea.appendChild(valueStandard);

            removeByClass(menuPromptClassName);
  
          } catch (e) {
            console.log(e);
          }
        }
      },
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                  click: menuEventTong[thisFunctionName](...thisArguments),
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    position: "relative",
                    top: String(menuTextTop) + ea,
                    fontSize: String(menuSize) + ea,
                    fontWeight: String(menuWeight),
                    color: colorChip.white,
                  }
                }
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    importantMarkingEvent = (desid) => {
      return async function (e) {
        e.preventDefault();
        try {
          const circles = this.querySelectorAll('.' + importantCircleClassName);
          const desid = this.getAttribute("desid");
          let onoff;
          let whereQuery, updateQuery;

          for (let circle of circles) {
            if (circle.getAttribute("toggle") === "on") {
              circle.style.display = "none";
              circle.setAttribute("toggle", "off");
              onoff = "off";
            } else {
              circle.style.display = "inline-block";
              circle.setAttribute("toggle", "on");
              onoff = "on";
            }
          }

          whereQuery = { desid };
          if (onoff === "on") {
            updateQuery = { important: true };
          } else {
            updateQuery = { important: false };
          }

          await ajaxJson({
            id: desid,
            column: "important",
            value: updateQuery.important ? 1 : 0,
            email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
          }, BACKHOST + "/updateDesignerHistory");
          
        } catch (e) {
          console.log(e);
        }
      }
    }

    designerSubMenuEvent = (desid, designer) => {
      return async function (e) {
        e.preventDefault();
        try {
          const px = "px";
          const zIndex = 4;
          const contextMenu = [
            {
              title: designer + " 실장님께 체크리스트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("checklist", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 콘솔 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("console", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 프로필 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("profile", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 작업 사진 업로드 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("work", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 경력 업데이트 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("career", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 디자이너 가이드 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("basicEducation", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 콘솔 설명서 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("consoleEducation", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 세트 포폴 요청 보내기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("settingPortfolio", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 상태 체크 요청하기",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("statusCheck", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 추천서 안내 및 프로필 요청",
              func: (desid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.normalSendNotice("proposalProfile", desid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
          ];
          const thisBox = this.getBoundingClientRect();
          const { x, y } = e;
          let cancelBack, contextBase;

          cancelBack = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            event: {
              click: (e) => { removeByClass(designerSubMenuEventFactorClassName) },
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          contextBase = createNode({
            mother: totalContents,
            class: [ designerSubMenuEventFactorClassName ],
            style: {
              display: "inline-block",
              position: "fixed",
              top: String(y + contextIndent) + px,
              left: String(x + (contextIndent / 2)) + px,
              padding: String(contextButtonOuterMargin) + ea,
              paddingBottom: String(contextButtonOuterMargin - contextButtonInnerMargin) + ea,
              background: colorChip.white,
              borderRadius: String(5) + px,
              boxShadow: "3px 0px 15px -9px " + colorChip.shadow,
              zIndex: String(zIndex),
              animation: "fadeuplite 0.3s ease forwards",
            }
          })

          for (let obj of contextMenu) {
            createNode({
              mother: contextBase,
              event: {
                click: obj.func(desid),
              },
              style: {
                display: "flex",
                width: String(contextButtonWidth) + ea,
                height: String(contextButtonHeight) + ea,
                background: colorChip.gradientGray,
                borderRadius: String(5) + px,
                marginBottom: String(contextButtonInnerMargin) + ea,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                cursor: "pointer",
              },
              child: {
                text: obj.title,
                style: {
                  fontSize: String(contextButtonSize) + ea,
                  fontWeight: String(contextButtonWeight),
                  color: colorChip.white,
                  position: "relative",
                  display: "inline-block",
                  top: String(contextButtonTextTop) + ea,
                }
              }
            });
          }

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    numbersContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.numbersDataRender());
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;

        sumMatrix = (new Array(columns.length)).fill(0, 0);
      
        for (let designer of instance.designers) {
      
          createNode({
            mother: idNameArea,
            attribute: { desid: designer.desid, lastfilter: "none", important: designer.important ? "true" : "false" },
            event: {
              click: instance.normalWhiteCard(designer.desid),
              dblclick: importantMarkingEvent(designer.desid),
              contextmenu: designerSubMenuEvent(designer.desid, designer.designer),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[designer.desid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                  next: {
                    class: [ importantCircleClassName ],
                    attribute: { toggle: designer.important ? "on" : "off" },
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: designer.important ? "inline-block" : "none",
                      position: "absolute",
                      transform: "scale(0.4)",
                      transformOrigin: "100% 0%",
                      right: String(index === 0 ? 0 : circleRight) + ea,
                      top: String(circleTop) + ea,
                      zIndex: String(0),
                    }
                  }
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { desid: designer.desid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {

            if (columns[i].type === "number") {
              sumMatrix[i] += Number(String(values[designer.desid][i].value).replace(/[^0-9\.]/gi, ''));
            } else {
              sumMatrix[i] = '-';
            }

            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      desid: designer.desid,
                      name: values[designer.desid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[designer.desid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[designer.desid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
    
        }

        createNode({
          mother: idNameArea,
          class: [ sumValueRowsClassName ],
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: String(idNameHeight) + ea,
            justifyContent: "center",
            alignItems: "start",
            cursor: "pointer",
          },
          children: [ "-", "총합" ].map((value, index) => {
            return {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(standards.columns[index].width) + ea,
              },
              child: {
                text: value,
                style: {
                  position: "relative",
                  transition: "all 0.3s ease",
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                },
              }
            }
          })
        });
    
        thisTong = createNode({
          mother: valueArea,
          class: [ moveTargetClassName, sumValueRowsClassName ],
          style: {
            display: "flex",
            position: "relative",
            width: String(maxWidth) + ea,
            height: String(idNameHeight) + ea,
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "start",
            paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
            cursor: "pointer",
          }
        })
  
        for (let i = 0; i < columns.length; i++) {
          createNode({
            mother: thisTong,
            style: {
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              justifyContent: "center",
              alignItems: "start",
              width: String(columns[i].width) + ea,
            },
            child: {
              style: {
                display: "inline-block",
                width: String(90) + '%',
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
              },
              child: {
                style: {
                  display: "flex",
                  width: String(valueMaxWidth) + ea,
                  position: "relative",
                  left: withOut(50, valueMaxWidth / 2, ea),
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                },
                child: {
                  class: [ valueSumTargetClassName ],
                  text: columns[i].money ? autoComma(sumMatrix[i]) + "원": String(sumMatrix[i]),
                  style: {
                    position: "relative",
                    transition: "all 0.1s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(valueWeight),
                    color: colorChip.green,
                  }
                }
              }
            }
          });
        }
    
        await this.numbersColorSync();
        await this.numbersSubPannel(entireDesignerMode);

      } catch (e) {
        console.log(e);
      }
    }

    await numbersContentsLoad(false);
    this.numbersContentsLoad = numbersContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.numbersView = async function (entireDesignerMode = false) {
  const instance = this;
  const { ea, totalContents } = this;
  const { createNode, withOut, colorChip, ajaxJson, returnGet, cleanChildren, hasQuery, removeQuery, appendQuery } = GeneralJs;
  try {
    const getObj = returnGet();
    let loading;
    let designers;
    let histories;
    let members;
    let importants;
    let execFunc;
    let projects;
    let realtimeDesigner;

    loading = await this.mother.loadingRun();

    if (instance.totalMother !== null && instance.totalMother !== undefined) {
      totalContents.removeChild(instance.totalMother);
    }

    if (hasQuery("type")) {
      removeQuery("type");
    }
    appendQuery({ type: "numbers" });

    if (entireDesignerMode) {
      designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    } else {
      designers = await ajaxJson({ noFlat: true, whereQuery: {
        "information.contract.status": { $regex: "완료" }
      } }, BACKHOST + "/getDesigners", { equal: true });
    }
    histories = await ajaxJson({
      method: "designer",
      property: [ "manager", "important" ],
      idArr: designers.map((d) => { return d.desid }),
    }, BACKHOST + "/getHistoryProperty", { equal: true });
    for (let designer of designers) {
      designer.manager = histories[designer.desid].manager;
      designer.important = histories[designer.desid].important;
    }

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    projects = await ajaxJson({ whereQuery: {}, projectQuery: { proid: 1, cliid: 1, desid: 1, service: 1, process: 1, proposal: 1, } }, SECONDHOST + "/pickProjects", { equal: true });
    realtimeDesigner = await ajaxJson({ mode: "all" }, BACKHOST + "/realtimeDesigner", { equal: true });

    this.viewMode = "numbers";
    this.designers = designers;
    this.projects = projects;
    this.realtimeDesigner = realtimeDesigner;

    this.cleanSearchEvent();
    await this.numbersBase(entireDesignerMode);
    await this.numbersSearchEvent();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalView = async function () {
  const instance = this;
  const { ea, totalContents } = this;
  const { createNode, withOut, colorChip, ajaxJson, returnGet, cleanChildren } = GeneralJs;
  try {
    const getObj = returnGet();
    let loading;
    let designers;
    let histories;
    let members;
    let importants;
    let noticeSendRows;
    let profileList, workList;
    let representativeList;
    let execFunc;
    let statusCheckLog;
    let statusCheckAgo;

    loading = await this.mother.loadingRun();

    if (instance.totalMother !== null && instance.totalMother !== undefined) {
      totalContents.removeChild(instance.totalMother);
    }

    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    histories = await ajaxJson({
      method: "designer",
      property: [ "manager", "important" ],
      idArr: designers.map((d) => { return d.desid }),
    }, BACKHOST + "/getHistoryProperty", { equal: true });
    for (let designer of designers) {
      designer.manager = histories[designer.desid].manager;
      designer.important = histories[designer.desid].important;
    }

    statusCheckAgo = new Date();
    statusCheckAgo.setDate(statusCheckAgo.getDate() - 14);

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    noticeSendRows = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
    statusCheckLog = await ajaxJson({ mode: "all", date: statusCheckAgo }, SECONDHOST + "/readLogDesignerStatus", { equal: true });
    profileList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerProfileList", { equal: true });
    workList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerWorksList", { equal: true });
    representativeList = await ajaxJson({ target: "$all" }, BRIDGEHOST + "/representativeFileRead", { equal: true });

    console.log(profileList, workList, representativeList);

    this.members = members;
    this.designers = designers;
    this.projects = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = getObj.whitecardmode === undefined ? "checklist" : getObj.whitecardmode;
    this.asyncProcessText = "로드중..";
    this.noticeSendRows = noticeSendRows;
    this.statusCheckLog = statusCheckLog.data;
    this.profileList = profileList;
    this.workList = workList;
    this.representativeList = representativeList;
    this.viewMode = "normal";

    this.cleanSearchEvent();
    await this.normalBase();
    await this.normalSearchEvent();
    await this.normalDetailSearchEvent();
    await this.normalMessageEvent();
    await this.normalExtractEvent();
    await this.normalReportEvent();
    this.communicationRender();

    window.addEventListener("popstate", (event) => {
      window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
    });

    loading.parentNode.removeChild(loading);

    if (typeof getObj.desid === "string" && /^d/gi.test(getObj.desid)) {
      execFunc = instance.normalWhiteCard(getObj.desid);
      await execFunc(new Event("click", { bubbles: true }));
    }

    if (typeof getObj.type === "string") {
      if (getObj.type === "project" || getObj.type === "care") {
        await instance.careView();
      } else if (getObj.type === "report" || getObj.type === "numbers") {
        await instance.numbersView();
      } else {
        // pass
      }
    }

  } catch (e) {
    console.log(e);
  }
}
