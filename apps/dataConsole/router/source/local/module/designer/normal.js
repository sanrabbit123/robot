DesignerJs.prototype.normalDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows, profileList, workList, representativeList } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
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
        title: "담당자",
        width: 80,
        name: "manger",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat(this.members.filter((o) => { return o.roles.includes("CX") }).map((member) => {
          return member.name;
        }).map((name) => {
          return {
            value: name,
            functionName: "filterEvent_" + name,
          }
        }).concat([
          {
            value: "-",
            functionName: "filterEvent_-",
          }
        ]))
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
        title: "총 추천수",
        width: 100,
        name: "proposalNumber",
        type: "number",
      },
      {
        title: "총 진행수",
        width: 100,
        name: "contractNumber",
        type: "number",
      },
      {
        title: "진행율",
        width: 100,
        name: "contractPercentage",
        type: "percentage",
      },
      {
        title: "총 정산액",
        width: 120,
        name: "totalAmount",
        type: "number",
      },
    ];

    for (let i = 0; i < yearDelta; i++) {
      columns.push({
        title: String(now.getFullYear() - i) + " " + "추천수",
        width: 120,
        name: "proposalNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행수",
        width: 120,
        name: "contractNumberY" + String(i),
        type: "number",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "진행율",
        width: 120,
        name: "contractPercentageY" + String(i),
        type: "percentage",
      });
      columns.push({
        title: String(now.getFullYear() - i) + " " + "총 정산액",
        width: 120,
        name: "totalAmountY" + String(i),
        type: "number",
      });
    }

    for (let i = 0; i < monthDelta; i++) {
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({
        title: tempString + " " + "추천수",
        width: 120,
        name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1),
        type: "number",
      });
    }

    values = {};

    for (let designer of instance.designers) {

      filteredChecklistSendRows = noticeSendRows.filter((o) => { return o.type === "checklist" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredProfileSendRows = noticeSendRows.filter((o) => { return o.type === "profile" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredWorkSendRows = noticeSendRows.filter((o) => { return o.type === "work" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredCareerSendRows = noticeSendRows.filter((o) => { return o.type === "career" }).filter((o) => { return o.designer.desid === designer.desid });
      filteredEntireSendRows = noticeSendRows.filter((o) => { return o.type === "until" }).filter((o) => { return o.designer.desid === designer.desid });

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
          value: designer.manager,
          name: "manger",
        },
        {
          value: asyncProcessText,
          name: "processPending",
        },
        {
          value: asyncProcessText,
          name: "processDoing",
        },
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
        value: asyncProcessText,
        name: "proposalNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractPercentage",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "totalAmount",
      });

      for (let i = 0; i < yearDelta; i++) {
        values[designer.desid].push({ value: asyncProcessText, name: "proposalNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractPercentageY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "totalAmountY" + String(i) });
      }
  
      for (let i = 0; i < monthDelta; i++) {
        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - i);
        tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
        values[designer.desid].push({ value: asyncProcessText, name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
      }

    }

    if (firstLoad) {

      ajaxJson({ mode: "total" }, S3HOST + "/designerAboutComplete", { equal: true }).then((c) => {
        completeAnalyticsRows = c;
        return ajaxJson({ noFlat: true, whereQuery: { $or: [ { "proposal.date": { $gte: past } }, { "process.status": { $regex: "^[대진]" } } ] } }, BACKHOST + "/getProjects", { equal: true });
      }).then((projects) => {

        instance.completeAnalyticsRows = completeAnalyticsRows;
        instance.projects = projects;
        instance.normalMatrix = {};
        for (let designer of instance.designers) {

          instance.normalMatrix[designer.desid] = [];

          thisValueDoms = [ ...document.querySelector('.' + designer.desid).querySelectorAll('.' + valueTargetClassName) ];
  
          filteredProjectsProposal = projects.filter((p) => {
            return p.proposal.detail.some((obj) => {
              return obj.desid === designer.desid
            });
          });
  
          filteredProjectsContract = projects.filter((p) => {
            return p.desid === designer.desid;
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "processPending");
          thisValueTemp = filteredProjectsContract.filter((p) => { return /^대/.test(p.process.status) }).length;
          thisTarget.textContent = String(thisValueTemp);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "processPending",
            value: String(thisValueTemp),
          });

          thisTarget = findByAttribute(thisValueDoms, "name", "processDoing");
          thisValueTemp = filteredProjectsContract.filter((p) => { return /^진/.test(p.process.status) }).length;
          thisTarget.textContent = String(thisValueTemp);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "processDoing",
            value: String(thisValueTemp),
          });

          // thisTarget = findByAttribute(thisValueDoms, "name", "checklistDone");
          // thisValueTemp = (completeAnalyticsRows[designer.desid]?.aboutUpdateComplete === 1) ? "완료" : "미완료";
          // thisTarget.textContent = String(thisValueTemp);
          // thisTarget.style.color = colorChip.black;
          // instance.normalMatrix[designer.desid].push({
          //   name: "checklistDone",
          //   value: String(thisValueTemp),
          // });

          thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumber");
          thisTarget.textContent = String(filteredProjectsProposal.length);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "proposalNumber",
            value: filteredProjectsProposal.length,
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractNumber");
          thisTarget.textContent = String(filteredProjectsContract.length);
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "contractNumber",
            value: filteredProjectsContract.length,
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentage");
          thisTarget.textContent = String(Math.round((filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length)) * 10000) / 100) + '%';
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "contractPercentage",
            value: filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length),
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "totalAmount");
          thisTarget.textContent = autoComma(Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
          thisTarget.style.color = colorChip.black;
          instance.normalMatrix[designer.desid].push({
            name: "totalAmount",
            value: Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0)),
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
    
            thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "proposalNumberY" + String(i),
              value: filteredFilteredProjectsProposal.length,
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsContract.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "contractNumberY" + String(i),
              value: filteredFilteredProjectsContract.length,
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentageY" + String(i));
            thisTarget.textContent = String(Math.round((filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length)) * 10000) / 100) + '%';
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "contractPercentageY" + String(i),
              value: filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length),
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "totalAmountY" + String(i));
            thisTarget.textContent = autoComma(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "totalAmountY" + String(i),
              value: Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0)),
            });
    
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
            thisTarget = findByAttribute(thisValueDoms, "name", "monthDelta" + String(thisDate.getFullYear()).slice(2) + String(thisDate.getMonth() + 1));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
            instance.normalMatrix[designer.desid].push({
              name: "monthDelta" + String(thisDate.getFullYear()).slice(2) + String(thisDate.getMonth() + 1),
              value: filteredFilteredProjectsProposal.length,
            });
          }
  
        }
  
        return instance.normalColorSync();
  
      }).catch((err) => { console.log(err); });

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
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson } = GeneralJs;
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

      isCxMember = await GeneralJs.nonCxBan(true);
      linkDictionary = {
        checklist: BACKHOST + "/middle/designerAbout?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        process: BACKHOST + "/middle/designerBoard?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        possible: BACKHOST + "/middle/designerPossible?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        portfolio: BACKHOST + "/designer?mode=general&desid=" + designer.desid + "&dataonly=true&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
        report: BACKHOST + "/middle/designerReport?desid=" + designer.desid + "&entire=true&normal=true&cx=" + (isCxMember ? "true" : "false"),
      }

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 2;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
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
        }
      }

      whiteMaker = (reload = false) => {

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
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
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
    })

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
        if (instance.normalMatrix === null) {
          window.alert("잠시 기다렸다가 다시 시도해주세요!");
        } else {
          const today = new Date();
          const data = await instance.normalDataRender(false);
          let thisName;
          let thisObject;
          let matrix;
          let tempArr;
          let thisDesigner;

          for (let desid in data.values) {
            for (let obj of data.values[desid]) {
              thisName = obj.name;
              thisObject = instance.normalMatrix[desid].find((obj) => { return obj.name === thisName });
              if (thisObject !== undefined) {
                obj.value = thisObject.value;
              }
            }
          }

          console.log(data);

          matrix = [];
          tempArr = [
            "아이디",
            "이름",
            // -------------------------------
            // add
            "이메일",
            "계좌번호",
            "사업자 분류",
            "사업자 등록번호",
            // -------------------------------
          ];
          for (let obj of data.columns) {
            tempArr.push(obj.title);
          }
          matrix.push(tempArr);

          for (let desid in data.values) {

            thisDesigner = instance.designers.find((d) => { return d.desid === desid });

            tempArr = [];
            tempArr.push(desid);
            tempArr.push(thisDesigner.designer);

            // -------------------------------
            // add
            tempArr.push(thisDesigner.information.email);
            tempArr.push(thisDesigner.information.business.account.length > 0 ? thisDesigner.information.business.account[0].bankName + " " + thisDesigner.information.business.account[0].accountNumber : "");
            tempArr.push(thisDesigner.information.business.businessInfo.classification);
            tempArr.push(thisDesigner.information.business.businessInfo.businessNumber);
            // -------------------------------

            for (let obj of data.columns) {
              thisObject = data.values[desid].find((o) => { return o.name === obj.name });
              tempArr.push(thisObject.value);
            }
            matrix.push(tempArr);
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
          })

        }
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

      titleTextTop = isMac() ? 2 : 0;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
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
  const { ajaxJson, sleep, blankHref } = GeneralJs;
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
    () => { return "미완료 대상 체크리스트 발송"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        const logs = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
        const sendDesids = logs.filter((o) => { return o.type === "checklist" }).map((o) => { return o.designer.desid });
        const targetDesigners = instance.designers.filter((d) => { return /협약 완료/gi.test(d.information.contract.status) }).filter((d) => { return !sendDesids.includes(d.desid) });
        let asyncTempFunc;
        let tempRes;
        let untilDate;
        untilDate = await GeneralJs.promptDate("마감일을 언제로 설정할까요?");
        if (untilDate !== null) {
          for (let designer of targetDesigners) {
            asyncTempFunc = instance.normalSendNotice("totalChecklist", designer.desid);
            tempRes = await asyncTempFunc();
            if (tempRes === null) {
              throw new Error("send fail");
            }
          }
        }
        window.alert("미완료 대상 체크리스트 발송에 성공하였습니다!");
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=normal";
      } catch (e) {
        console.log(e);
        window.alert("미완료 대상 체크리스트 발송에 실패하였습니다!");
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
}

DesignerJs.prototype.normalView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, returnGet } = GeneralJs;
    let loading;
    let designers;
    let histories;
    let members;
    let importants;
    let noticeSendRows;
    let profileList, workList;
    let representativeList;

    loading = await this.mother.loadingRun();

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

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    noticeSendRows = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeDesignerConsole", { equal: true });
    profileList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerProfileList", { equal: true });
    workList = await ajaxJson({ mode: "entire" }, BRIDGEHOST + "/designerWorksList", { equal: true });
    representativeList = await ajaxJson({ target: "$all" }, BRIDGEHOST + "/representativeFileRead", { equal: true });

    this.members = members;
    this.designers = designers;
    this.projects = null;
    this.normalMatrix = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = "checklist";
    this.asyncProcessText = "로드중..";
    this.noticeSendRows = noticeSendRows;
    this.profileList = profileList;
    this.workList = workList;
    this.representativeList = representativeList;

    await this.normalBase();
    await this.normalSearchEvent();
    await this.normalDetailSearchEvent();
    await this.normalMessageEvent();
    await this.normalExtractEvent();
    await this.normalReportEvent();
    this.communicationRender();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
