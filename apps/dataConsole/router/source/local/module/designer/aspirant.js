DesignerJs.prototype.aspirantDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText, noticeSendRows } = this;
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
    let yearDelta;
    let monthDelta;
    let standards;
    let thisSendRows, thisSendRows2;
    let thisDocumentsSend;
    let thisPortfolioSend;
    let targetMembers;

    targetMembers = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX"); }).map((obj) => { return obj.name });

    past.setFullYear(past.getFullYear() - agoYearDelta);
    past.setMonth(0);
    past.setDate(1);
    past.setHours(9);
    past.setMinutes(0);
    past.setSeconds(0);

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(yearsAgo, now);

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "aspid",
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
        title: "신청일",
        width: 100,
        name: "applyDate",
        type: "date",
      },
      {
        title: "담당자",
        width: 80,
        name: "manager",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat(targetMembers.map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 80,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.manager"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.manager = finalValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "응대 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "검토중",
            color: colorChip.red,
          },
          {
            value: "응대중",
            color: colorChip.black,
          },
          {
            value: "추가 필요",
            color: colorChip.purple,
          },
          {
            value: "추가 요청",
            color: colorChip.black,
          },
          {
            value: "등록 요청",
            color: colorChip.black,
          },
          {
            value: "등록 완료",
            color: colorChip.black,
          },
          {
            value: "계약 요청",
            color: colorChip.black,
          },
          {
            value: "계약 완료",
            color: colorChip.green,
          },
          {
            value: "드랍",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "검토중",
          "응대중",
          "추가 필요",
          "추가 요청",
          "등록 요청",
          "등록 완료",
          "계약 요청",
          "계약 완료",
          "드랍",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 80,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["meeting.status"] = value;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.status = value;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "1차 통화",
        width: 100,
        name: "responseDate",
        type: "date",
        update: async (aspid, value) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.date"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.date = finalValue;
            await instance.aspirantColorSync();
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "1차 판단",
        width: 100,
        name: "firstStatus",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "검토중",
          "합격",
          "반려",
          "확인",
          "불합격",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 80,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { valueTargetClassName } = this;
            const { ajaxJson, findByAttribute } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;
            let chainValue;
            let targetMembers;
            let chainManager;
            let teamLeader;
            let teamLeaderId;
            let hlBot;
            let chainMessage;
            let ceo, ceoId;

            targetMembers = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX") && !obj.roles.includes("CEO"); });
            targetMembers.sort((a, b) => { return b.level - a.level });
            hlBot = GeneralJs.stacks.members.find((obj) => { return obj.roles.includes("Bot"); }).name;
            teamLeader = targetMembers[0].name;
            teamLeaderId = targetMembers[0].slack.id;
            ceo = GeneralJs.stacks.members.find((obj) => { return obj.roles.includes("CEO"); });
            ceoId = ceo.slack.id;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.first.status"] = finalValue;

            chainValue = "검토중";
            chainMessage = "";
            if (finalValue === "합격" || finalValue === "확인") {
              chainValue = "응대중";
              chainManager = teamLeader;
              chainMessage = "대표님께서 " + aspirant.designer + " 신청자를 합격으로 설정하셨습니다! 합격 응대를 부탁드리겠습니다!";
            } else if (finalValue === "반려") {
              chainValue = "추가 필요";
              chainManager = teamLeader;
              chainMessage = "대표님께서 " + aspirant.designer + " 신청자를 반려로 설정하셨습니다! 반려 응대를 부탁드리겠습니다!";
            } else if (finalValue === "불합격") {
              chainValue = "드랍";
              chainManager = hlBot;
              chainMessage = "";
            } else {
              chainValue = "검토중";
              chainManager = "박혜연";
              chainMessage =  aspirant.designer + " 신청자님의 상태가 검토중이 되었습니다! 검토를 부탁드리겠습니다! <@" + ceoId + ">";
            }

            updateQuery["meeting.status"] = chainValue;
            updateQuery["response.manager"] = chainManager;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            if (chainMessage !== "") {
              await ajaxJson({ message: chainMessage, channel: "#301_apply", voice: false }, "/sendSlack");
            }
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.first.status = finalValue;
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.status = chainValue;
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.manager = chainManager;

            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "status").querySelector('.' + valueTargetClassName).textContent = chainValue;
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "manager").querySelector('.' + valueTargetClassName).textContent = chainManager;

            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "연락처",
        width: 120,
        name: "phone",
        type: "string",
      },
      {
        title: "주요 특징",
        width: 130,
        name: "portfolioCharacter",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "알 수 없음",
          "리모델링 위주",
          "상공간 위주",
          "유관 경력만",
          "홈퍼니싱 위주",
          "홈스타일링 경험자",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 130,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = /알 수 없음/gi.test(value) ? "" : value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.portfolio.summary"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.portfolio.summary = finalValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "판단 메모",
        width: 400,
        name: "memo",
        type: "string",
        long: true,
        update: async (aspid, value) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["meeting.memo"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.memo = finalValue;
            await instance.aspirantColorSync();
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "유출 이유",
        width: 120,
        name: "outreason",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "해당 없음",
          "연락 안 됨",
          "조건 미달",
          "파트너십 거부",
          "기타 이유",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 100,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = /해당 없음/gi.test(value) ? "" : value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.outreason"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.outreason = finalValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "추가 포폴 요청",
        width: 100,
        name: "portfolioSend",
        type: "date",
      },
      {
        title: "추가 포폴 수신",
        width: 100,
        name: "portfolioPlusDate",
        type: "date",
      },
      {
        title: "서류 요청",
        width: 100,
        name: "documentsSend",
        type: "date",
      },
      {
        title: "서류 제출",
        width: 100,
        name: "documentsBoo",
        type: "date",
      },
      {
        title: "등록비 결제",
        width: 100,
        name: "paymentBoo",
        type: "date",
      },
      {
        title: "공통 교육",
        width: 100,
        name: "commonMeeting",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "해당 없음",
          "미팅 조율",
          "참석 확정",
          "교육 완료",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 100,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = /해당 없음/gi.test(value) ? "" : value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["meeting.common.status"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.common.status = finalValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "공통 교육일",
        width: 100,
        name: "commonMeetingDate",
        type: "date",
        update: async (aspid, value) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["meeting.common.date"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.common.date = finalValue;
            await instance.aspirantColorSync();
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "준비된 세트",
        width: 100,
        name: "portfolioSet",
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
            columnOnly: true,
          }
        ].concat([
          "있음",
          "없음",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        })),
        menuWidth: 80,
        update: async (aspid, value, menu) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = /있음/gi.test(value);
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.portfolio.ready.set"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.portfolio.ready.set = finalValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "세트 촬영",
        width: 100,
        name: "portfolioSetPhoto",
        type: "date",
        update: async (aspid, value) => {
          try {
            const instance = this;
            const { ajaxJson } = GeneralJs;
            const aspirant = this.aspirants.find((a) => { return a.aspid === aspid });
            const finalValue = value;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.portfolio.plus.photo"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.portfolio.plus.photo = finalValue;
            await instance.aspirantColorSync();
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "주소",
        width: 400,
        name: "address",
        type: "string",
      },
      {
        title: "성별",
        width: 80,
        name: "gender",
        type: "string",
      },
      {
        title: "생일",
        width: 100,
        name: "birth",
        type: "date",
      },
      {
        title: "이메일",
        width: 200,
        name: "email",
        type: "string",
      },
      {
        title: "사업자 분류",
        width: 200,
        name: "business",
        type: "string",
      },
      {
        title: "회사명",
        width: 150,
        name: "company",
        type: "string",
      },
      {
        title: "등록 번호",
        width: 200,
        name: "numbers",
        type: "string",
      },
      {
        title: "SNS",
        width: 400,
        name: "sns",
        type: "string",
      },
      {
        title: "홈페이지",
        width: 400,
        name: "homepage",
        type: "string",
      },
    ];

    values = {};

    for (let aspirant of instance.aspirants) {

      thisSendRows = noticeSendRows.filter((o) => { return o.type === "documents" }).filter((o) => { return o.aspirant.aspid === aspirant.aspid });
      thisDocumentsSend = new Date(1800, 0, 1);
      if (thisSendRows.length > 0 && thisSendRows[0].history.length > 0) {
        thisDocumentsSend = thisSendRows[0].history[0];
      }

      thisSendRows2 = noticeSendRows.filter((o) => { return o.type === "plus" }).filter((o) => { return o.aspirant.aspid === aspirant.aspid });
      thisPortfolioSend = new Date(1800, 0, 1);
      if (thisSendRows2.length > 0 && thisSendRows2[0].history.length > 0) {
        thisPortfolioSend = thisSendRows2[0].history[0];
      }

      standards.values[aspirant.aspid] = [
        {
          value: aspirant.aspid,
          name: "aspid",
        },
        {
          value: aspirant.designer,
          name: "designer",
        },
      ];

      values[aspirant.aspid] = [
        {
          value: dateToString(aspirant.submit.partnership.date),
          name: "applyDate",
        },
        {
          value: aspirant.response.manager,
          name: "manager",
        },
        {
          value: aspirant.meeting.status,
          name: "status",
        },
        {
          value: dateToString(aspirant.response.date),
          name: "responseDate",
        },
        {
          value: aspirant.response.first.status,
          name: "firstStatus",
        },
        {
          value: aspirant.phone,
          name: "phone",
        },
        {
          value: aspirant.response.portfolio.summary === "" ? "알 수 없음" : aspirant.response.portfolio.summary,
          name: "portfolioCharacter",
        },
        {
          value: aspirant.meeting.memo.replace(/\n/gi, " "),
          name: "memo",
        },
        {
          value: aspirant.response.outreason === "" ? "해당 없음" : aspirant.response.outreason,
          name: "outreason",
        },
        {
          value: dateToString(thisPortfolioSend),
          name: "portfolioSend",
        },
        {
          value: dateToString(aspirant.response.portfolio.plus.request),
          name: "portfolioPlusDate",
        },
        {
          value: dateToString(thisDocumentsSend),
          name: "documentsSend",
        },
        {
          value: dateToString(aspirant.submit.documents.date),
          name: "documentsBoo",
        },
        {
          value: dateToString(aspirant.submit.registration.date),
          name: "paymentBoo",
        },
        {
          value: aspirant.meeting.common.status === "" ? "해당 없음" : aspirant.meeting.common.status,
          name: "commonMeeting",
        },
        {
          value: dateToString(aspirant.meeting.common.date),
          name: "commonMeetingDate",
        },
        {
          value: aspirant.response.portfolio.ready.set ? "있음" : "없음",
          name: "portfolioSet",
        },
        {
          value: dateToString(aspirant.response.portfolio.plus.photo),
          name: "portfolioSetPhoto",
        },
        {
          value: aspirant.address,
          name: "address",
        },
        {
          value: aspirant.gender,
          name: "gender",
        },
        {
          value: dateToString(aspirant.birth),
          name: "birth",
        },
        {
          value: aspirant.email,
          name: "email",
        },
        {
          value: aspirant.information.company.classification,
          name: "business",
        },
        {
          value: aspirant.information.company.name,
          name: "company",
        },
        {
          value: aspirant.information.company.businessNumber,
          name: "numbers",
        },
        {
          value: aspirant.information.channel.sns.join(", "),
          name: "sns",
        },
        {
          value: aspirant.information.channel.web.join(", "),
          name: "homepage",
        },
      ];

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantWhiteData = async function (aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, valueTargetClassName, noticeSendRows } = this;
  const { createNode, withOut, colorChip, dateToString, ajaxJson, findByAttribute, stringToDate, selfHref } = GeneralJs;
  try {
    const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
    let dataMatrix;
    let careerToBlock;
    let schoolToBlock;
    let thisSendRows;
    let thisDocumentsSend;
    let thisSendRows2;
    let thisPortfolioSend;

    thisSendRows = noticeSendRows.filter((o) => { return o.type === "documents" }).filter((o) => { return o.aspirant.aspid === aspid });
    thisDocumentsSend = new Date(1800, 0, 1);
    if (thisSendRows.length > 0 && thisSendRows[0].history.length > 0) {
      thisDocumentsSend = thisSendRows[0].history[0];
    }

    thisSendRows2 = noticeSendRows.filter((o) => { return o.type === "plus" }).filter((o) => { return o.aspirant.aspid === aspirant.aspid });
    thisPortfolioSend = new Date(1800, 0, 1);
    if (thisSendRows2.length > 0 && thisSendRows2[0].history.length > 0) {
      thisPortfolioSend = thisSendRows2[0].history[0];
    }

    careerToBlock = (aspirant) => {
      const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
      let endMatrix;

      endMatrix = aspirant.information.career.detail.map((obj) => {
        const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
        const startDate = obj.date.start;
        const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
        const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
        const delta = endDate.valueOf() - startDate.valueOf();
        const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
        const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
        return {
          title: [
            "회사",
            "담당 업무",
            "기간",
            "태그",
          ],
          value: [
            obj.company + pipe + obj.team,
            obj.role,
            rangeWords,
            obj.tag,
          ]
        };
      });
      return endMatrix;
    }

    schoolToBlock = (aspirant) => {
      let endMatrix;
      endMatrix = aspirant.information.career.school.map((obj) => {
        return {
          title: [
            "학교",
            "전공",
            "졸업",
          ],
          value: [
            obj.school,
            obj.major,
            ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
          ]
        };
      });
      return endMatrix;
    }

    dataMatrix = [
      {
        name: "name",
        type: "string",
        title: "성함",
        value: aspirant.designer,
      },
      {
        name: "phone",
        type: "string",
        title: "연락처",
        value: aspirant.phone,
        script: (aspid) => {
          const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
          return async function (e) {
            try {
              const designer = aspirant.designer;
              const phone = aspirant.phone;
              const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
              if (window.confirm(designer + " 실장님께 전화를 걸까요?")) {
                ajaxJson({
                  who: cookies.homeliaisonConsoleLoginedEmail,
                  phone: phone
                }, BACKHOST + "/callTo").catch((err) => { console.log(err); });
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      },
      {
        name: "apply",
        type: "date",
        title: "신청일",
        value: dateToString(aspirant.submit.partnership.date, true),
      },
      {
        name: "gender",
        type: "select",
        title: "성별",
        columns: [
          "여성",
          "남성"
        ],
        value: aspirant.gender === "여성" ? [ 1, 0 ] : [ 0, 1 ],
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["gender"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).gender = updateQuery["gender"];
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "birth",
        type: "string",
        title: "생일",
        value: dateToString(aspirant.birth) + " (" + String((new Date()).getFullYear() - aspirant.birth.getFullYear()) + "세)",
        editable: true,
        update: async (aspid, newValue, targetDom) => {
          try {
            const instance = this;
            const { valueTargetClassName } = this;
            const { ajaxJson, dateToString, stringToDate, findByAttribute } = GeneralJs;
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let birthDate;
            let whereQuery, updateQuery;
            try {
              birthDate = stringToDate(newValue);
            } catch (e) {
              window.alert("날짜 형식이 올바르지 않습니다!");
              birthDate = new Date(1800, 0, 1);
            }

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["birth"] = birthDate;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).birth = birthDate;
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "birth").querySelector('.' + valueTargetClassName).textContent = dateToString(birthDate);
            targetDom.textContent = dateToString(birthDate) + " (" + String((new Date()).getFullYear() - birthDate.getFullYear()) + "세)",
            await instance.aspirantColorSync();
          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "email",
        type: "string",
        title: "이메일",
        value: aspirant.email,
      },
      {
        name: "address",
        type: "string",
        title: "주소",
        value: aspirant.address,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "status",
        type: "select",
        columns: [
          "검토중",
          "응대중",
          "추가 필요",
          "추가 요청",
          "등록 요청",
          "등록 완료",
          "계약 요청",
          "계약 완료",
          "드랍",
        ],
        title: "상태",
        value: [
          "검토중",
          "응대중",
          "추가 필요",
          "추가 요청",
          "등록 요청",
          "등록 완료",
          "계약 요청",
          "계약 완료",
          "드랍",
        ].map((str) => {
          return str === aspirant.meeting.status ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["meeting.status"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).meeting.status = updateQuery["meeting.status"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "status").querySelector('.' + valueTargetClassName).textContent = updateQuery["meeting.status"];
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "firstStatus",
        type: "select",
        columns: [
          "검토중",
          "합격",
          "반려",
          "확인",
          "불합격",
        ],
        title: "1차 판단",
        value: [
          "검토중",
          "합격",
          "반려",
          "확인",
          "불합격",
        ].map((str) => {
          return str === aspirant.response.first.status ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;
            let chainValue;
            let targetMembers;
            let chainManager;
            let teamLeader;
            let teamLeaderId;
            let hlBot;
            let finalValue;
            let chainMessage;
            let ceo, ceoId;

            targetMembers = GeneralJs.stacks.members.filter((obj) => { return obj.roles.includes("CX") && !obj.roles.includes("CEO"); });
            targetMembers.sort((a, b) => { return b.level - a.level });
            hlBot = GeneralJs.stacks.members.find((obj) => { return obj.roles.includes("Bot"); }).name;
            teamLeader = targetMembers[0].name;
            teamLeaderId = targetMembers[0].slack.id;
            ceo = GeneralJs.stacks.members.find((obj) => { return obj.roles.includes("CEO"); });
            ceoId = ceo.slack.id;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["response.first.status"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });
            finalValue = updateQuery["response.first.status"];

            chainValue = "검토중";
            chainMessage = "";
            if (finalValue === "합격" || finalValue === "확인") {
              chainValue = "응대중";
              chainManager = teamLeader;
              chainMessage = "대표님께서 " + aspirant.designer + " 신청자를 합격으로 설정하셨습니다! 응대를 부탁드리겠습니다! <@" + teamLeaderId + ">";
            } else if (finalValue === "반려") {
              chainValue = "추가 필요";
              chainManager = teamLeader;
              chainMessage = "대표님께서 " + aspirant.designer + " 신청자를 반려로 설정하셨습니다! 응대를 부탁드리겠습니다! <@" + teamLeaderId + ">";
            } else if (finalValue === "불합격") {
              chainValue = "드랍";
              chainManager = hlBot;
              chainMessage = "";
            } else {
              chainValue = "검토중";
              chainManager = "박혜연";
              chainMessage =  aspirant.designer + " 신청자님의 상태가 검토중이 되었습니다! 검토를 부탁드리겠습니다! <@" + ceoId + ">";
            }

            updateQuery["meeting.status"] = chainValue;
            updateQuery["response.manager"] = chainManager;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            if (chainMessage !== "") {
              await ajaxJson({ message: chainMessage, channel: "#301_apply", voice: false }, "/sendSlack");
            }

            selfHref(window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid);

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "portfolioCharacter",
        type: "select",
        columns: [
          "알 수 없음",
          "리모델링 위주",
          "상공간 위주",
          "유관 경력만",
          "홈퍼니싱 위주",
          "홈스타일링 경험자",
        ],
        title: "주요 특징",
        value: [
          "",
          "리모델링 위주",
          "상공간 위주",
          "유관 경력만",
          "홈퍼니싱 위주",
          "홈스타일링 경험자",
        ].map((str) => {
          return str === aspirant.response.portfolio.summary ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;
            let textValue;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["response.portfolio.summary"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });

            if (updateQuery["response.portfolio.summary"] === undefined || updateQuery["response.portfolio.summary"] === "알 수 없음") {
              updateQuery["response.portfolio.summary"] = "";
              textValue = "알 수 없음";
            } else {
              textValue = updateQuery["response.portfolio.summary"];
            }

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).response.portfolio.summary = updateQuery["response.portfolio.summary"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "portfolioCharacter").querySelector('.' + valueTargetClassName).textContent = textValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "outreason",
        type: "select",
        columns: [
          "해당 없음",
          "연락 안 됨",
          "조건 미달",
          "파트너십 거부",
          "기타 이유",
        ],
        title: "유출 이유",
        value: [
          "",
          "연락 안 됨",
          "조건 미달",
          "파트너십 거부",
          "기타 이유",
        ].map((str) => {
          return str === aspirant.response.outreason ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;
            let textValue;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["response.outreason"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });

            if (updateQuery["response.outreason"] === undefined || updateQuery["response.outreason"] === "해당 없음") {
              updateQuery["response.outreason"] = "";
              textValue = "해당 없음";
            } else {
              textValue = updateQuery["response.outreason"];
            }

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).response.outreason = updateQuery["response.outreason"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "outreason").querySelector('.' + valueTargetClassName).textContent = textValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "memo",
        type: "long",
        title: "판단 메모",
        long: true,
        value: aspirant.meeting.memo,
        editable: true,
        update: async (newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["meeting.memo"] = newValue.trim();

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).meeting.memo = updateQuery["meeting.memo"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "memo").querySelector('.' + valueTargetClassName).textContent = updateQuery["meeting.memo"];
            
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "responseDate",
        type: "date",
        title: "1차 통화",
        value: dateToString(aspirant.response.date),
        editable: true,
        update: async (aspid, newValue) => {
          try {
            const instance = this;
            const { valueTargetClassName } = this;
            const { ajaxJson, dateToString } = GeneralJs;
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            const finalValue = newValue;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.date"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.date = finalValue;
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "responseDate").querySelector('.' + valueTargetClassName).textContent = dateToString(finalValue);

            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "documentsSend",
        type: "date",
        title: "서류 요청",
        value: dateToString(thisDocumentsSend),
      },
      {
        name: "documentsBoo",
        type: "date",
        title: "서류 제출",
        value: dateToString(aspirant.submit.documents.date),
      },
      {
        name: "paymentBoo",
        type: "date",
        title: "등록비 결제",
        value: dateToString(aspirant.submit.registration.date),
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "classification",
        type: "select",
        title: "사업자 구분",
        columns: [
          "법인(일반)",
          "개인(일반)",
          "개인(간이)",
          "프리랜서",
        ],
        value: (/법인/gi.test(aspirant.information.company.classification) ? [ 1, 0, 0, 0 ] : (/일반/gi.test(aspirant.information.company.classification) ? [ 0, 1, 0, 0 ] : (/간이/gi.test(aspirant.information.company.classification) ? [ 0, 0, 1, 0 ] : [ 0, 0, 0, 1 ]))),
      },
      {
        name: "company",
        type: "string",
        title: "회사명",
        value: aspirant.information.company.name,
      },
      {
        name: "businessNumber",
        type: "string",
        title: "사업자 등록번호",
        value: aspirant.information.company.businessNumber,
      },
      {
        name: "businessStart",
        type: "date",
        title: "사업자 개업일",
        value: dateToString(aspirant.information.company.start),
      },
      {
        name: "representative",
        type: "string",
        title: "대표자 성함",
        value: aspirant.information.company.representative,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "accountBank",
        type: "string",
        title: "은행명",
        value: aspirant.information.account.bank,
      },
      {
        name: "accountNumber",
        type: "string",
        title: "계좌 번호",
        value: aspirant.information.account.number,
      },
      {
        name: "accountTo",
        type: "string",
        title: "예금주",
        value: aspirant.information.account.to,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "career",
        type: "block",
        title: "경력",
        value: careerToBlock(aspirant),
      },
      {
        name: "school",
        type: "block",
        title: "학력",
        value: schoolToBlock(aspirant),
      },
      {
        name: "about",
        type: "long",
        title: "자기 소개",
        value: aspirant.information.career.about,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "homepage",
        type: "array",
        title: "홈페이지",
        value: aspirant.information.channel.web,
      },
      {
        name: "sns",
        type: "array",
        title: "SNS",
        value: aspirant.information.channel.sns,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "portfolioPlusDate",
        type: "date",
        title: "추가 포폴 전송",
        value: dateToString(aspirant.response.portfolio.plus.request),
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "portfolioSet",
        type: "select",
        columns: [
          "있음",
          "없음",
        ],
        title: "준비된 세트",
        value: [
          "있음",
          "없음",
        ].map((str) => {
          return str === (aspirant.response.portfolio.ready.set ? "있음" : "없음") ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;
            let textValue;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["response.portfolio.ready.set"] = (columns.find((str, index) => {
              return newValue[index] === 1;
            }) === "있음");

            if (updateQuery["response.portfolio.ready.set"]) {
              textValue = "있음";
            } else {
              textValue = "없음"
            }

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).response.portfolio.ready.set = updateQuery["response.portfolio.ready.set"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "portfolioSet").querySelector('.' + valueTargetClassName).textContent = textValue;

            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "portfolioSetPhoto",
        type: "date",
        title: "세트 촬영",
        value: dateToString(aspirant.response.portfolio.plus.photo),
        editable: true,
        update: async (aspid, newValue) => {
          try {
            const instance = this;
            const { valueTargetClassName } = this;
            const { ajaxJson, dateToString } = GeneralJs;
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            const finalValue = newValue;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["response.portfolio.plus.photo"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).response.portfolio.plus.photo = finalValue;
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "portfolioSetPhoto").querySelector('.' + valueTargetClassName).textContent = dateToString(finalValue);
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "commonMeeting",
        type: "select",
        columns: [
          "해당 없음",
          "미팅 조율",
          "참석 확정",
          "교육 완료",
        ],
        title: "공통 교육",
        value: [
          "",
          "미팅 조율",
          "참석 확정",
          "교육 완료",
        ].map((str) => {
          return str === aspirant.meeting.common.status ? 1 : 0;
        }),
        editable: true,
        update: async (columns, newValue, aspid) => {
          try {
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            let whereQuery, updateQuery;
            let textValue;

            whereQuery = {};
            whereQuery["aspid"] = aspid;

            updateQuery = {};
            updateQuery["meeting.common.status"] = columns.find((str, index) => {
              return newValue[index] === 1;
            });

            if (updateQuery["meeting.common.status"] === undefined || updateQuery["meeting.common.status"] === "해당 없음") {
              updateQuery["meeting.common.status"] = "";
              textValue = "해당 없음";
            } else {
              textValue = updateQuery["meeting.common.status"];
            }

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((d) => { return d.aspid === aspid }).meeting.common.status = updateQuery["meeting.common.status"];
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "commonMeeting").querySelector('.' + valueTargetClassName).textContent = textValue;
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "commonMeetingDate",
        type: "date",
        title: "공통 교육일",
        value: dateToString(aspirant.meeting.common.date),
        editable: true,
        update: async (aspid, newValue) => {
          try {
            const instance = this;
            const { valueTargetClassName } = this;
            const { ajaxJson, dateToString } = GeneralJs;
            const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
            const finalValue = newValue;
            let whereQuery, updateQuery;

            whereQuery = { aspid };
            updateQuery = {};
            updateQuery["meeting.common.date"] = finalValue;

            await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
            instance.aspirants.find((a) => { return a.aspid === aspid }).meeting.common.date = finalValue;
            findByAttribute([ ...document.querySelector('.' + aspid).children ], "name", "commonMeetingDate").querySelector('.' + valueTargetClassName).textContent = dateToString(finalValue);
            await instance.aspirantColorSync();

          } catch (e) {
            console.log(e);
          }
        }
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
    ];

    return dataMatrix;
  } catch (e) {
    console.log(e);
    return [];
  }
}

DesignerJs.prototype.aspirantColorSync = async function () {
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

    ({ columns } = await this.aspirantDataRender(false));

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

DesignerJs.prototype.aspirantWhiteContents = async function (tong, aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, stringToLink, variableArray, downloadFile, uniqueValue, sleep, equalJson, hexaJson } = GeneralJs;
  try {
    const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
    const dataArr = await instance.aspirantWhiteData(aspid);
    const bigPhotoClassName = "bigPhotoClassName";
    const longTextEditClassName = "longTextEditClassName";
    const menuValuePromptClassName = "menuValuePromptClassName";
    const valueTargetClassName = "valueTargetClassName";
    const longEmptyText = "메모를 클릭하여 입력해주세요.";
    const maxColumnsNumber = 9;
    let name;
    let type;
    let title;
    let value;
    let motherBlock;
    let blockHeight;
    let titleWidth;
    let titleArea;
    let titleSize, titleWeight;
    let num;
    let marginPercentage;
    let careerBlockGrayOuterMargin;
    let careerBlockOuterMargin;
    let careerBlockOuterMarginTop;
    let careerBlockOuterMarginBottom;
    let careerBlockInnerMargin;
    let careerBlockInnerMarginSmall;
    let careerBlockSize;
    let blockBottom;
    let portfolioImages;
    let imageTargets;
    let imageTong;
    let imageTongPadding;
    let imagesNumber;
    let imageInnerBetween;
    let imageTongChildren;
    let targetNumber;
    let imageNode;
    let targetNumberArr;
    let downloadButton;
    let buttonWidth, buttonHeight, buttonTextTop, buttonSize, buttonWeight;
    let idList;
    let thisId;
    let bigPhotoEvent;
    let heightRatio;
    let thisWidth;
    let arrowHeight;
    let arrowMargin;
    let motherNum;
    let longMarginBottom;
    let longLineHeight;
    let emptyValueBoo;
    let dateDom;
    let menuVisual;
    let menuBetween;
    let menuTextTop;
    let menuSize;
    let menuWeight;
    let calendarWidth;
    let calendarBoxBetween;
    let calendarBoxHeight;
    let stringDom;
    let longTextWidth;
    let longTextHeight;
    let documentsImages;
    let documentsTong;
    let documentsFactorHeight;
    let documentsFactorTongPaddingTop;
    let documentsFactorTongMarginTop;
    let documentsFactorTongMarginBottom;
    let documentsTitleSize, documentsTitleTextTop, documentsTitleLeft, documentsTitleWeight;
    let documentsTitle;

    blockHeight = 32;
    titleWidth = 180;

    titleSize = 15;
    titleWeight = 700;

    marginPercentage = 33;
    imageTongPadding = 16;

    buttonWidth = 150;
    buttonHeight = 30;
    buttonTextTop = -1;
    buttonSize = 13;
    buttonWeight = 700;

    longTextWidth = 240;
    longTextHeight = 36;

    careerBlockGrayOuterMargin = <%% 10, 10, 9, 8, 0 %%>;
    careerBlockOuterMargin = <%% 14, 14, 14, 12, 2.5 %%>;
    careerBlockOuterMarginTop = <%% (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), 2 %%>;
    careerBlockOuterMarginBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), 2 %%>;
    careerBlockInnerMargin = <%% 6, 6, 6, 4, 1 %%>;
    careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 0 %%>;
    careerBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;

    blockBottom = 20;

    imagesNumber = 3;
    imageInnerBetween = 8;

    heightRatio = 0.9;

    arrowHeight = 12;
    arrowMargin = 20;
  
    longMarginBottom = 10;
    longLineHeight = 1.6;

    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    calendarWidth = 260;
    calendarBoxBetween = 4;
    calendarBoxHeight = 32;

    documentsFactorHeight = 120;
    documentsFactorTongPaddingTop = 40;
    documentsFactorTongMarginTop = 4;
    documentsFactorTongMarginBottom = 14;
    documentsTitleSize = 15;
    documentsTitleTextTop = isMac() ? -27 : -29;
    documentsTitleLeft = 1;
    documentsTitleWeight = 700;

    idList = {};

    bigPhotoEvent = function (e) {
      const self = this;
      const gs = this.getAttribute("gs");
      const zIndex = 4;
      let domList;
      let thisIndex;
      let thisHeight;
      let renderPhoto;


      if (gs !== "null") {
        domList = idList.map((id) => { return document.getElementById(id) });
        thisIndex = domList.findIndex((dom) => { return dom === self });

        renderPhoto = (index) => {
          return function (e) {
            removeByClass(bigPhotoClassName);
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              event: {
                click: (e) => { removeByClass(bigPhotoClassName) }
              },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(0) + ea,
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: "transparent",
                zIndex: String(zIndex),
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              event: {
                click: (e) => { removeByClass(bigPhotoClassName) }
              },
              style: {
                display: "block",
                position: "fixed",
                top: String(0),
                left: String(grayBarWidth) + ea,
                width: withOut(grayBarWidth, ea),
                height: withOut(belowHeight, ea),
                background: colorChip.realBlack,
                opacity: String(0.6),
                zIndex: String(zIndex),
              }
            });
            thisHeight = (window.innerHeight - belowHeight) * heightRatio;
            thisWidth = thisHeight / (Number(domList[index].getAttribute("ratio")));
            createNode({
              mode: "img",
              mother: totalContents,
              class: [ bigPhotoClassName ],
              attribute: {
                src: domList[index].getAttribute("src"),
              },
              style: {
                position: "fixed",
                height: String(thisHeight) + "px",
                zIndex: String(zIndex),
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(thisHeight / 2) + "px" + ")",
                left: "calc(calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 2) - " + String(thisWidth / 2) + "px" + ") + " + String(grayBarWidth) + ea + ")",
                borderRadius: String(5) + "px",
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              mode: "svg",
              source: instance.mother.returnArrow("left", colorChip.white),
              event: {
                selectstart: (e) => { e.preventDefault(); },
                click: renderPhoto(domList[index - 1] === undefined ? domList.length - 1 : index - 1),
              },
              style: {
                display: "block",
                position: "fixed",
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(arrowHeight / 2) + "px" + ")",
                left: String(grayBarWidth + arrowMargin) + ea,
                width: String(arrowHeight) + ea,
                zIndex: String(zIndex),
                cursor: "pointer",
              }
            });
            createNode({
              mother: totalContents,
              class: [ bigPhotoClassName ],
              mode: "svg",
              source: instance.mother.returnArrow("right", colorChip.white),
              event: {
                selectstart: (e) => { e.preventDefault(); },
                click: renderPhoto(domList[index + 1] === undefined ? 0 : index + 1),
              },
              style: {
                display: "block",
                position: "fixed",
                top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(arrowHeight / 2) + "px" + ")",
                right: String(arrowMargin) + ea,
                width: String(arrowHeight) + ea,
                zIndex: String(zIndex),
                cursor: "pointer",
              }
            });
          }
        }
        
        renderPhoto(thisIndex)({});

      } else {
        window.alert("잠시만 기다렸다가 다시 시도해주세요!");
      }
    }

    motherNum = 0;
    for (let obj of dataArr) {
      name = obj.name;
      type = obj.type;
      title = obj.title;
      value = obj.value;

      motherBlock = createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          "min-height": String(blockHeight) + ea,
        }
      });

      titleArea = createNode({
        mother: motherBlock,
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          width: String(titleWidth) + ea,
          height: String(blockHeight) + ea,
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
        },
        child: {
          text: title,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
          }
        }
      })

      if (type === "string") {

        stringDom = createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            class: [ valueTargetClassName ],
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              cursor: (typeof obj.script === "function") ? "pointer" : "",
            }
          }
        });

        if (obj.editable) {
          stringDom.setAttribute("aspid", aspid);
          stringDom.setAttribute("update", (await hexaJson({ update: obj.update })));
          stringDom.addEventListener("click", async function (e) {
            try {
              const self = this;
              const zIndex = 4;
              const aspid = this.getAttribute("aspid");
              const thisUpdateFunction = (await hexaJson(this.getAttribute("update"))).update.bind(instance);
              let cancelBack, longTextPrompt;                  

              cancelBack = createNode({
                mother: totalContents,
                class: [ menuValuePromptClassName ],
                event: (e) => {
                  self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                  removeByClass(menuValuePromptClassName);
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

              longTextPrompt = createNode({
                mother: totalContents,
                class: [ menuValuePromptClassName ],
                style: {
                  position: "fixed",
                  top: String(e.y + menuVisual) + "px",
                  left: String(e.x + menuVisual) + "px",
                  width: String(longTextWidth) + ea,
                  background: colorChip.white,
                  animation: "fadeuplite 0.3s ease forwards",
                  zIndex: String(zIndex),
                },
                child: {
                  style: {
                    display: "flex",
                    position: "relative",
                    width: String(longTextWidth) + ea,
                    height: String(longTextHeight) + ea,
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                    borderRadius: String(5) + "px",
                    marginBottom: String(menuBetween) + ea,
                    justifyContent: "start",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    paddingLeft: String(12) + ea,
                  },
                  child: {
                    mode: "input",
                    attribute: {
                      type: "text",
                      value: self.querySelector("." + valueTargetClassName).textContent,
                    },
                    event: {
                      keydown: async function (e) {
                        try {
                          if (e.key === "Enter" || e.key === "Tab") {
                            e.preventDefault();
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      },
                      keyup: async function (e) {
                        try {
                          if (e.key === "Enter" || e.key === "Tab") {
                            e.preventDefault();
                            const thisValue = this.value.trim().replace(/[\&\=\+\/\\\#]/gi, '');
                            self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                            await thisUpdateFunction(aspid, thisValue, self.querySelector("." + valueTargetClassName));
                            removeByClass(menuValuePromptClassName);
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    },
                    style: {
                      position: "relative",
                      top: String(menuTextTop) + ea,
                      fontSize: String(15) + ea,
                      fontWeight: String(300),
                      color: colorChip.green,
                      border: String(0),
                      outline: String(0),
                      width: withOut(0, ea),
                      height: withOut(0, ea),
                    }
                  }
                }
              });
              longTextPrompt.querySelector("input").focus();

              setQueue(() => {
                self.querySelector("." + valueTargetClassName).style.color = colorChip.green;
              });

            } catch (e) {
              console.log(e);
            }
          });
        }

        if (typeof obj.script === "function") {
          stringDom.addEventListener("click", obj.script(aspid));
        }

      } else if (type === "date") {

        dateDom = createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            class: [ valueTargetClassName ],
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              cursor: obj.editable ? "pointer" : "",
            }
          }
        });

        if (obj.editable) {
          dateDom.setAttribute("aspid", aspid);
          dateDom.setAttribute("update", (await hexaJson({ update: obj.update })));
          dateDom.addEventListener("click", async function (e) {
            try {
              const self = this;
              const zIndex = 4;
              const aspid = this.getAttribute("aspid");
              const thisUpdateFunction = (await hexaJson(this.getAttribute("update"))).update.bind(instance);
              let cancelBack, calendarPrompt;                  
              let calendar;

              cancelBack = createNode({
                mother: totalContents,
                class: [ menuValuePromptClassName ],
                event: (e) => {
                  self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                  removeByClass(menuValuePromptClassName);
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

              calendarPrompt = createNode({
                mother: totalContents,
                class: [ menuValuePromptClassName ],
                style: {
                  position: "fixed",
                  top: String(e.y + menuVisual) + "px",
                  left: String(e.x + menuVisual - (300 / 2)) + "px",
                  paddingTop: String(calendarBoxBetween) + ea,
                  width: String(calendarWidth) + ea,
                  animation: "fadeuplite 0.3s ease forwards",
                  zIndex: String(zIndex),
                },
                children: [
                  {
                    event: {
                      click: async function (e) {
                        try {
                          const thisValue = new Date(1800, 0, 1);
                          self.querySelector("." + valueTargetClassName).textContent = "해당 없음";
                          self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                          await thisUpdateFunction(aspid, thisValue);
                          removeByClass(menuValuePromptClassName);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    },
                    style: {
                      display: "inline-flex",
                      verticalAlign: "top",
                      position: "relative",
                      width: String((calendarWidth - calendarBoxBetween) / 2) + ea,
                      background: colorChip.white,
                      boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                      borderRadius: String(5) + "px",
                      height: String(calendarBoxHeight) + ea,
                      marginBottom: String(calendarBoxBetween) + ea,
                      marginRight: String(calendarBoxBetween) + ea,
                      cursor: "pointer",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    child: {
                      text: "해당 없음",
                      style: {
                        position: "relative",
                        top: String(menuTextTop) + ea,
                        fontSize: String(menuSize) + ea,
                        fontWeight: String(menuWeight),
                        color: colorChip.black,
                      }
                    }
                  },
                  {
                    event: {
                      click: async function (e) {
                        try {
                          const thisValue = new Date(3800, 0, 1);
                          self.querySelector("." + valueTargetClassName).textContent = "예정";
                          self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                          await thisUpdateFunction(aspid, thisValue);
                          removeByClass(menuValuePromptClassName);
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    },
                    style: {
                      display: "inline-flex",
                      verticalAlign: "top",
                      position: "relative",
                      width: String((calendarWidth - calendarBoxBetween) / 2) + ea,
                      background: colorChip.white,
                      boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                      borderRadius: String(5) + "px",
                      height: String(calendarBoxHeight) + ea,
                      marginBottom: String(calendarBoxBetween) + ea,
                      cursor: "pointer",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    child: {
                      text: "예정",
                      style: {
                        position: "relative",
                        top: String(menuTextTop) + ea,
                        fontSize: String(menuSize) + ea,
                        fontWeight: String(menuWeight),
                        color: colorChip.black,
                      }
                    }
                  },
                  {
                    style: {
                      display: "block",
                      position: "relative",
                      width: String(calendarWidth) + ea,
                      background: colorChip.white,
                      boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                      borderRadius: String(5) + "px",
                    },
                  }
                ]
              });

              calendar = instance.mother.makeCalendar(new Date(), async function (e) {
                try {
                  e.stopPropagation();
                  e.preventDefault();
                  const stringValue = this.getAttribute("buttonValue");
                  const thisValue = stringToDate(stringValue);
                  this.setAttribute("value", stringValue);
                  self.querySelector("." + valueTargetClassName).textContent = stringValue;
                  self.querySelector("." + valueTargetClassName).style.color = colorChip.black;
                  await thisUpdateFunction(aspid, thisValue);
                  removeByClass(menuValuePromptClassName);
                } catch (e) {
                  console.log(e);
                }
              });
              calendarPrompt.lastChild.appendChild(calendar.calendarBase);

              setQueue(() => {
                self.querySelector("." + valueTargetClassName).style.color = colorChip.green;
              });

            } catch (e) {
              console.log(e);
            }
          });
        }

      } else if (type === "select") {
        
        if (obj.editable === true) {
          num = 0;
          for (let str of obj.columns) {
            createNode({
              mother: motherBlock,
              attribute: {
                toggle: value[num] === 1 ? "on" : "off",
                mother: String(motherNum),
                index: String(num),
                aspid: aspid,
              },
              event: {
                click: async function (e) {
                  try {
                    const self = this;
                    const aspid = this.getAttribute("aspid");
                    const mother = Number(this.getAttribute("mother"));
                    const obj = dataArr[mother];
                    const index = Number(this.getAttribute("index"));
                    const pastValue = equalJson(JSON.stringify(obj.value));
                    const length = pastValue.length;
                    const siblings = [ ...this.parentNode.children ].filter((dom) => { return dom.getAttribute("toggle") !== null });
                    let newValue;
  
                    newValue = (new Array(length)).fill(0, 0);
                    newValue[index] = 1;
                    
                    for (let i = 0; i < length; i++) {
                      if (newValue[i] === 1) {
                        siblings[i].firstChild.style.color = colorChip.green;
                        siblings[i].setAttribute("toggle", "on");
                      } else {
                        siblings[i].firstChild.style.color = colorChip.deactive;
                        siblings[i].setAttribute("toggle", "off");
                      }
                    }

                    await obj.update(obj.columns, newValue, aspid);
                    
                  } catch (e) {
                    console.log(e);
                  }
                },
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: "calc(" + withOut(titleWidth, ea) + " / " + String(maxColumnsNumber) + ")",
              },
              child: {
                text: str,
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                style: {
                  display: "inline-block",
                  verticalAlign: "top",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(400),
                  color: value[num] === 1 ? colorChip.green : colorChip.deactive,
                  cursor: "pointer",
                }
              }
            });
            num++;
          }

        } else {

          num = 0;
          for (let str of obj.columns) {
            createNode({
              mother: motherBlock,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                width: "calc(" + withOut(titleWidth, ea) + " / " + String(maxColumnsNumber) + ")",
              },
              child: {
                text: str,
                style: {
                  display: "inline-block",
                  verticalAlign: "top",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(value[num] === 1 ? 400 : 200),
                  color: value[num] === 1 ? colorChip.green : colorChip.deactive,
                }
              }
            });
            num++;
          }

        }

      } else if (type === "block") {
        
        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            padding: String(careerBlockGrayOuterMargin) + ea,
            width: withOut(titleWidth + (careerBlockGrayOuterMargin * 2), ea),
            borderRadius: String(5) + "px",
            background: colorChip.gray0,
            marginBottom: String(blockBottom) + ea,
          },
          children: value.map((obj, index) => {
            const { title, value: factorValue } = obj;
            const lastBoo = (index === value.length - 1);
            return {
              attribute: {
                index: String(index),
              },
              style: {
                display: "block",
                position: "relative",
                padding: String(careerBlockOuterMargin) + ea,
                paddingTop: String(careerBlockOuterMarginTop) + ea,
                paddingBottom: String(careerBlockOuterMarginBottom) + ea,
                width: withOut(careerBlockOuterMargin * 2, ea),
                borderRadius: String(5) + "px",
                marginBottom: !lastBoo ? String(careerBlockInnerMargin) + ea : "",
                background: colorChip.white,
                boxShadow: "0px 2px 11px -9px " + colorChip.shadow,
              },
              children: factorValue.map((str, index) => {
                const lastBoo = (index === factorValue.length - 1);
                return {
                  text: "<b%" + title[index] + " %b>:" + "&nbsp;&nbsp;&nbsp;" + str,
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(400),
                    color: colorChip.black,
                    marginBottom: !lastBoo ? String(careerBlockInnerMarginSmall) + ea : "",
                  },
                  bold: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.black,
                  },
                  under: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(200),
                    color: colorChip.green,
                  }
                }
              })
            }
          })
        });

      } else if (type === "margin") {

        createNode({
          mother: motherBlock,
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(0),
            height: String(marginPercentage) + '%',
            width: withOut(0, ea),
            borderBottom: "1px dashed " + colorChip.gray3,
          }
        })

      } else if (type === "array") {

        if (value.length > 0) {
          createNode({
            mother: motherBlock,
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut(titleWidth, ea),
            },
            child: {
              text: value[0],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
              }
            }
          });
        }

      } else if (type === "long") {

        if (obj.editable === true) {
          emptyValueBoo = (value.trim() === '');
          createNode({
            mother: motherBlock,
            attribute: {
              empty: emptyValueBoo ? "true" : "false",
              value: value.trim(),
              mother: String(motherNum),
              aspid: aspid,
            },
            event: {
              click: async function (e) {
                try {
                  const self = this;
                  const emptyValueBoo = (this.getAttribute("empty") === "true");
                  const value = this.getAttribute("value");
                  const pastValue = value;
                  const box = this.getBoundingClientRect();
                  const motherBox = this.parentNode.getBoundingClientRect();
                  const mother = Number(this.getAttribute("mother"));
                  const obj = dataArr[mother];
                  const aspid = this.getAttribute("aspid");
                  let thisLeft;
                  let thisInput;

                  thisLeft = box.left - motherBox.left;

                  this.firstChild.textContent = "";

                  createNode({
                    mother: this,
                    class: [ longTextEditClassName ],
                    event: {
                      click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        setQueue(() => {
                          self.firstChild.insertAdjacentHTML("beforeend", pastValue.replace(/\n/gi, "<br>"));
                        })
                        removeByClass(longTextEditClassName);
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(0) + ea,
                      height: withOut(0, ea),
                      width: withOut(0, ea),
                      background: "trasparent",
                      zIndex: String(1),
                    }
                  });

                  thisInput = createNode({
                    mother: this,
                    class: [ longTextEditClassName ],
                    event: {
                      click: (e) => { e.preventDefault(); e.stopPropagation(); }
                    },
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      top: String(0),
                      width: withOut(titleWidth, ea),
                      height: String(100) + ea,
                      background: colorChip.white,
                      zIndex: String(2),
                    },
                    child: {
                      mode: "textarea",
                      text: value,
                      attribute: {
                        value,
                        aspid,
                        mother: String(mother),
                      },
                      event: {
                        keydown: async function (e) {
                          try {
                            if (e.key === "Tab") {
                              e.preventDefault();
                            }
                          } catch (e) {
                            console.log(e);
                          }
                        },
                        keyup: async function (e) {
                          try {
                            if (e.key === "Tab") {
                              this.blur();
                            }
                          } catch (e) {
                            console.log(e);
                          }
                        },
                        blur: async function (e) {
                          try {
                            this.value = this.value.trim().replace(/[\=\&\+\#\<\>\/\\]/gi, '').replace(/  /gi, ' ');

                            const mother = Number(this.getAttribute("mother"));
                            const obj = dataArr[mother];
                            const aspid = this.getAttribute("aspid");
                            const newValue = this.value;
                            this.parentNode.parentNode.setAttribute("value", newValue);

                            await obj.update(newValue, aspid);

                            setQueue(() => {
                              self.firstChild.insertAdjacentHTML("beforeend", newValue.replace(/\n/gi, "<br>"));
                            })
                            removeByClass(longTextEditClassName);
                          } catch (e) {
                            console.log(e);
                          }
                        },
                      },
                      style: {
                        display: "inline-block",
                        verticalAlign: "top",
                        position: "relative",
                        fontSize: String(titleSize) + ea,
                        fontWeight: String(400),
                        color: colorChip.green,
                        width: withOut(0, ea),
                        height: String(100) + ea,
                        lineHeight: String(longLineHeight),
                        background: colorChip.white,
                        outline: String(0),
                        border: String(0),
                      }
                    }
                  }).firstChild;

                  thisInput.focus();

                } catch (e) {
                  console.log(e);
                }
              }
            },
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: withOut(titleWidth, ea),
            },
            child: {
              text: emptyValueBoo ? longEmptyText : value,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(400),
                color: emptyValueBoo ? colorChip.deactive : colorChip.black,
                marginBottom: String(longMarginBottom) + ea,
                lineHeight: String(longLineHeight),
              }
            }
          });

        } else {

          createNode({
            mother: motherBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: withOut(titleWidth, ea),
            },
            child: {
              text: value,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
                marginBottom: String(longMarginBottom) + ea,
                lineHeight: String(longLineHeight),
              }
            }
          });

        }

      }

      motherNum++;
    }
    
    // documents

    documentsImages = await ajaxJson({ aspid }, BRIDGEHOST + "/aspirantDocumentsList", { equal: true });
    documentsImages = {
      account: documentsImages.account.map((str) => { return stringToLink(str) }),
      business: documentsImages.business.map((str) => { return stringToLink(str) }),
      identity: documentsImages.identity.map((str) => { return stringToLink(str) }),
    };
    documentsTitle = {
      account: "통장 사본",
      business: "사업자등록증(주민등록증)",
      identity: "신분증 사본",
    };

    documentsTong = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(imageTongPadding + imageTongPadding - imageInnerBetween, ea),
        background: colorChip.gray1,
        padding: String(imageTongPadding) + ea,
        paddingRight: String(imageTongPadding - imageInnerBetween) + ea,
        paddingTop: String(documentsFactorTongPaddingTop) + ea,
        borderRadius: String(5) + "px",
        marginTop: String(documentsFactorTongMarginTop) + ea,
        marginBottom: String(documentsFactorTongMarginBottom) + ea,
      },
      children: [
        {
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            marginRight: String(imageInnerBetween) + ea,
            width: "calc(calc(calc(calc(100% - " + String(imageInnerBetween * (imagesNumber)) + ea + ") - " + String(0) + ea + ") / " + String(imagesNumber) + ") - " + String(imageInnerBetween * 2) + ea + ")",
            "min-height": String(documentsFactorHeight) + ea,
            padding: String(imageInnerBetween) + ea,
            paddingBottom: String(0),
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
          },
          children: [
            {
              text: documentsTitle.account,
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(documentsTitleTextTop) + ea,
                left: String(documentsTitleLeft) + ea,
                fontSize: String(documentsTitleSize) + ea,
                fontWeight: String(documentsTitleWeight),
                color: colorChip.black,
              }
            }
          ].concat(documentsImages.account.map((link) => {
            return {
              mode: "img",
              attribute: {
                src: link,
              },
              event: async function (e) {
                try {
                  const link = this.getAttribute("src");
                  const loading2 = instance.mother.whiteProgressLoading();
                  await downloadFile(link, loading2.progress.firstChild);
                  loading2.remove();
                } catch (e) {
                  console.log(e);
                }
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                marginBottom: String(imageInnerBetween) + ea,
                borderRadius: String(5) + "px",
                cursor: "pointer",
              }
            }
          }))
        },
        {
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            marginRight: String(imageInnerBetween) + ea,
            width: "calc(calc(calc(calc(100% - " + String(imageInnerBetween * (imagesNumber)) + ea + ") - " + String(0) + ea + ") / " + String(imagesNumber) + ") - " + String(imageInnerBetween * 2) + ea + ")",
            "min-height": String(documentsFactorHeight) + ea,
            padding: String(imageInnerBetween) + ea,
            paddingBottom: String(0),
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
          },
          children: [
            {
              text: documentsTitle.business,
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(documentsTitleTextTop) + ea,
                left: String(documentsTitleLeft) + ea,
                fontSize: String(documentsTitleSize) + ea,
                fontWeight: String(documentsTitleWeight),
                color: colorChip.black,
              }
            }
          ].concat(documentsImages.business.map((link) => {
            return {
              mode: "img",
              attribute: {
                src: link,
              },
              event: async function (e) {
                try {
                  const link = this.getAttribute("src");
                  const loading2 = instance.mother.whiteProgressLoading();
                  await downloadFile(link, loading2.progress.firstChild);
                  loading2.remove();
                } catch (e) {
                  console.log(e);
                }
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                marginBottom: String(imageInnerBetween) + ea,
                borderRadius: String(5) + "px",
                cursor: "pointer",
              }
            }
          }))
        },
        {
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            marginRight: String(imageInnerBetween) + ea,
            width: "calc(calc(calc(calc(100% - " + String(imageInnerBetween * (imagesNumber)) + ea + ") - " + String(0) + ea + ") / " + String(imagesNumber) + ") - " + String(imageInnerBetween * 2) + ea + ")",
            "min-height": String(documentsFactorHeight) + ea,
            padding: String(imageInnerBetween) + ea,
            paddingBottom: String(0),
            background: colorChip.gray3,
            borderRadius: String(5) + "px",
          },
          children: [
            {
              text: documentsTitle.identity,
              style: {
                display: "inline-block",
                position: "absolute",
                top: String(documentsTitleTextTop) + ea,
                left: String(documentsTitleLeft) + ea,
                fontSize: String(documentsTitleSize) + ea,
                fontWeight: String(documentsTitleWeight),
                color: colorChip.black,
              }
            }
          ].concat(documentsImages.identity.map((link) => {
            return {
              mode: "img",
              attribute: {
                src: link,
              },
              event: async function (e) {
                try {
                  const link = this.getAttribute("src");
                  const loading2 = instance.mother.whiteProgressLoading();
                  await downloadFile(link, loading2.progress.firstChild);
                  loading2.remove();
                } catch (e) {
                  console.log(e);
                }
              },
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                marginBottom: String(imageInnerBetween) + ea,
                borderRadius: String(5) + "px",
                cursor: "pointer",
              }
            }
          }))
        },
      ]
    });

    // margin and line

    createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        "min-height": String(blockHeight) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "absolute",
          top: String(0),
          left: String(0),
          height: String(marginPercentage) + '%',
          width: withOut(0, ea),
          borderBottom: "1px dashed " + colorChip.gray3,
        }
      }
    });

    // portfolio

    portfolioImages = await ajaxJson({ aspid }, BRIDGEHOST + "/aspirantPortfolio", { equal: true });
    imageTargets = portfolioImages.link.map((str) => { return stringToLink(str) });

    if (imageTargets.length > 0) {
      downloadButton = createNode({
        mother: tong,
        attribute: {
          aspid
        },
        event: {
          click: async function (e) {
            try {
              const aspid = this.getAttribute("aspid");
              const loading = instance.mother.whiteProgressLoading(null, true);
              const response = await ajaxJson({ aspid, mode: "create" }, BRIDGEHOST + "/aspirantPortfolioDownload", { equal: true });
              loading.remove();
              const loading2 = instance.mother.whiteProgressLoading();
              await downloadFile(stringToLink(response.link), aspid + "_portfolio" + ".zip", loading2.progress.firstChild);
              loading2.remove();
              const fileName = stringToLink(response.link).split("/")[stringToLink(response.link).split("/").length - 1];
              await ajaxJson({ aspid, mode: "delete", file: fileName }, BRIDGEHOST + "/aspirantPortfolioDownload", { equal: true });
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "flex",
          position: "relative",
          width: String(100) + '%',
          height: String(buttonHeight) + ea,
          justifyContent: "end",
          alignItems: "center",
          marginBottom: String(imageInnerBetween) + ea,
          cursor: "pointer",
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            background: colorChip.green,
            borderRadius: String(5) + "px",
            justifyContent: "center",
            alignItems: "center",
          },
          child: {
            text: "모든 사진 일괄 다운로드",
            style: {
              display: "inline-block",
              position: "relative",
              top: String(buttonTextTop) + ea,
              fontSize: String(buttonSize) + ea,
              fontWeight: String(buttonWeight),
              color: colorChip.white,
            }
          }
        }
      })
    }

    imageTong = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(imageTongPadding + imageTongPadding - imageInnerBetween, ea),
        background: colorChip.gray1,
        padding: String(imageTongPadding) + ea,
        paddingRight: String(imageTongPadding - imageInnerBetween) + ea,
        borderRadius: String(5) + "px",
      }
    });

    imageTongChildren = [];
    for (let num of variableArray(imagesNumber)) {
      imageTongChildren.push(createNode({
        mother: imageTong,
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          marginRight: String(imageInnerBetween) + ea,
          width: "calc(calc(calc(100% - " + String(imageInnerBetween * (imagesNumber)) + ea + ") - " + String(0) + ea + ") / " + String(imagesNumber) + ")",
          borderRadius: String(5) + "px",
        }
      }))
    }

    num = 0;
    idList = [];
    for (let link of imageTargets) {
      targetNumberArr = imageTongChildren.map((dom, index) => { return { height: dom.getBoundingClientRect().height, index } });
      targetNumberArr.sort((a, b) => { return a.height - b.height });
      targetNumber = targetNumberArr[0].index;
      thisId = aspid + "_" + "portfolio" + "_" + uniqueValue("hex");

      imageNode = createNode({
        id: thisId,
        mode: "img",
        mother: imageTongChildren[targetNumber],
        attribute: {
          src: link,
          gs: "null",
        },
        event: {
          click: bigPhotoEvent,
        },
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: withOut(0, ea),
          marginBottom: String(imageInnerBetween) + ea,
          borderRadius: String(5) + "px",
        }
      });

      idList.push(thisId);

      num++;
    }

    setQueue(async () => {
      try {
        let domList;
        domList = idList.map((id) => { return document.getElementById(id) });
        if (domList.every((dom) => { return dom !== null })) {
          while (domList.some((dom) => { return dom.getBoundingClientRect().height === 0 })) {
            await sleep(100);
            domList = idList.map((id) => { return document.getElementById(id) });
          }
          domList.forEach((dom) => {
            const { width, height } = dom.getBoundingClientRect();
            dom.setAttribute("width", String(width));
            dom.setAttribute("height", String(height));
            dom.setAttribute("gs", (width >= height ? "g" : "s"));
            dom.setAttribute("ratio", String(height / width));
          });
        }
      } catch (e) {
        console.log(e);
      }
    }, 100);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantWhiteCard = function (aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
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
      let innerMarginTop;
      let basePaddingTop;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 2;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            attribute: {
              aspid: aspid
            },
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
            aspid: aspid
          },
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
              border: "1px solid " + colorChip.gray3,
              borderRadius: String(5) + "px",
              boxSizing: "border-box",
              padding: String(innerMargin) + ea,
              paddingTop: String(innerMarginTop) + ea,
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                flexDirection: "column",
              }
            }
          }
        });
  
        titleWhite = createNode({
          mother: totalContents,
          attribute: {
            aspid: aspid
          },
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
                attribute: { designer: aspirant.designer, phone: aspirant.phone.replace(/[^0-9]/gi, '') },
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
                text: aspirant.designer,
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
                attribute: { aspid: aspid },
                event: {
                  click: async function (e) {
                    try {
                      const aspid = this.getAttribute("aspid");
                      await window.navigator.clipboard.writeText(aspid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: aspirant.aspid,
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
            ]
          }
        });

        instance.aspirantWhiteContents(whitePrompt.firstChild.firstChild, aspid).then(() => {
          const targetMother = whitePrompt.firstChild;
          setQueue(() => {
            const memoPopup = createNode({
              mother: targetMother,
              attribute: {
                toggle: "on",
              },
              style: {
                display: "inline-flex",
                position: "fixed",
                bottom: String(45) + ea,
                right: String(45) + ea,
                width: String(480) + ea,
                height: String(320) + ea,
                borderRadius: String(5) + "px",
                background: colorChip.gradientGreen,
                animation: "fadeuplite 0.5s ease forwards",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "start",
                boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                paddingBottom: String(10) + ea,
                paddingLeft: String(10) + ea,
              },
              children: [
                {
                  event: {
                    click: function (e) {
                      const target = this.parentNode;
                      const toggle = target.getAttribute("toggle");
                      if (toggle === "on") {
                        target.style.height = String(48) + ea;
                        target.style.width = String(100) + ea;
                        target.setAttribute("toggle", "off");
                      } else if (toggle === "off") {
                        target.style.height = String(320) + ea;
                        target.style.width = String(480) + ea;
                        target.setAttribute("toggle", "on");
                      }
                    }
                  },
                  text: "응대 메모",
                  style: {
                    display: "block",
                    width: withOut(10, ea),
                    position: "relative",
                    fontSize: String(14) + ea,
                    fontWeight: String(700),
                    color: colorChip.white,
                    marginBottom: String(7) + ea,
                    top: String(isMac() ? 0 : 2) + ea,
                  },
                  child: {
                    style: {
                      position: "absolute",
                      right: String(0),
                      bottom: String(5) + ea,
                      width: String(12) + ea,
                      height: String(10) + ea,
                      cursor: "pointer",
                      boxSizing: "border-box",
                      borderBottom: "2px solid " + colorChip.white,
                    }
                  }
                },
                {
                  style: {
                    position: "relative",
                    width: withOut(10, ea),
                    height: withOut(33, ea),
                    borderRadius: String(5) + "px",
                    background: colorChip.white,
                    boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                  },
                  child: {
                    mode: "textarea",
                    attribute: {
                      aspid: aspirant.aspid
                    },
                    text: aspirant.response.long,
                    event: {
                      keydown: function (e) {
                        if (e.key === "Tab") {
                          e.preventDefault();
                        }
                      },
                      keyup: async function (e) {
                        try {
                          if (e.key === "Tab") {
                            e.preventDefault();
                            this.blur();
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      },
                      blur: async function (e) {
                        try {
                          const aspid = this.getAttribute("aspid");
                          let whereQuery, updateQuery;

                          this.value = this.value.trim().replace(/[\#\&\=\+\\\/]/gi, '');

                          whereQuery = {};
                          whereQuery["aspid"] = aspid;
                          updateQuery = {};
                          updateQuery["response.long"] = this.value;

                          await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");
                          instance.aspirants.find((a) => { return a.aspid === aspid }).response.long = this.value;

                        } catch (e) {
                          console.log(e);
                        }
                      }
                    },
                    style: {
                      position: "absolute",
                      width: withOut(20 * 2, ea),
                      height: withOut(16 * 1, ea),
                      left: String(20) + ea,
                      top: String(16) + ea,
                      fontSize: String(14) + ea,
                      fontWeight: String(400),
                      color: colorChip.black,
                      lineHeight: String(1.6),
                      border: String(0),
                      outline: String(0),
                    }
                  }
                }
              ]
            });
            setQueue(() => {
              memoPopup.firstChild.click();
            }, 500);
          }, 500);
        }).catch((err) => { console.log(err); });
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

DesignerJs.prototype.aspirantBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, equalJson, setQueue, hexaJson } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const menuValuePromptClassName = "menuValuePromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  const aspirantSubMenuEventFactorClassName = "aspirantSubMenuEventFactorClassName";
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
    let aspirantContentsLoad;
    let circleRight, circleTop;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
    let valueDom;
    let menuEventTong;
    let calendarWidth;
    let calendarBoxBetween;
    let calendarBoxHeight;
    let longTextWidth;
    let longTextHeight;
    let aspirantSubMenuEvent;
    let valueLongMaxWidth;
    let thisMaxWidth;

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
    valueLongMaxWidth = 3000;
  
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

    calendarWidth = 260;
    calendarBoxBetween = 4;
    calendarBoxHeight = 32;

    longTextWidth = 750;
    longTextHeight = 36;

    ({ standards, columns, values } = await this.aspirantDataRender(true));
  
    hoverEvent = () => {
      return function (e) {
        const aspid = this.getAttribute("aspid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "aspid", aspid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const aspid = this.getAttribute("aspid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "aspid", aspid);
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
            let thisAspid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisAspid = idNameDoms[i].getAttribute("aspid");
              thisValueDom = findByAttribute(valueDoms, "aspid", thisAspid);
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
            let thisAspid;
            let thisValueDom;
  
            domMatrix = [];
            for (let i = 0; i < idNameDoms.length; i++) {
              thisAspid = idNameDoms[i].getAttribute("aspid");
              thisValueDom = findByAttribute(valueDoms, "aspid", thisAspid);
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
          let thisMenuWidth;

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

          if (typeof thisObject.menuWidth === "number") {
            thisMenuWidth = thisObject.menuWidth;
          } else {
            thisMenuWidth = menuPromptWidth;
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
              width: String(thisMenuWidth) + ea,
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
                  width: String(thisMenuWidth) + ea,
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
          });

        } catch (e) {
          console.log(e);
        }
      }
    }

    aspirantSubMenuEvent = (aspid, designer) => {
      return async function (e) {
        e.preventDefault();
        try {
          const px = "px";
          const zIndex = 4;
          const contextMenu = [
            {
              title: designer + " 실장님 1차 유선 통화 완료",
              func: (aspid) => {
                return async function (e) {
                  try {
                    let whereQuery, updateQuery;

                    whereQuery = {};
                    whereQuery["aspid"] = aspid;
                    updateQuery = {};
                    updateQuery["response.date"] = new Date();

                    await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

                    window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 추가 포트폴리오 요청하기",
              func: (aspid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.aspirantSendNotice("plus", aspid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 등록 서류 요청하기",
              func: (aspid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.aspirantSendNotice("documents", aspid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 등록비 결제 요청하기",
              func: (aspid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.aspirantSendNotice("payment", aspid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 불합격 통지",
              func: (aspid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.aspirantSendNotice("fail", aspid);
                    await sendFunc();
                  } catch (e) {
                    console.log(e);
                  }
                }
              }
            },
            {
              title: designer + " 실장님께 부재중 알림",
              func: (aspid) => {
                return async function (e) {
                  try {
                    const sendFunc = instance.aspirantSendNotice("pure", aspid);
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
            class: [ aspirantSubMenuEventFactorClassName ],
            event: {
              click: (e) => { removeByClass(aspirantSubMenuEventFactorClassName) },
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
            class: [ aspirantSubMenuEventFactorClassName ],
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
                click: obj.func(aspid),
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

    aspirantContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.aspirantDataRender(true));
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

        for (let aspirant of instance.aspirants) {
      
          createNode({
            mother: idNameArea,
            attribute: { aspid: aspirant.aspid, lastfilter: "none" },
            event: {
              click: instance.aspirantWhiteCard(aspirant.aspid),
              contextmenu: aspirantSubMenuEvent(aspirant.aspid, aspirant.designer),
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
            children: standards.values[aspirant.aspid].map(({ value, name }, index) => {
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
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: "none",
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
            attribute: { aspid: aspirant.aspid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, aspirant.aspid ],
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
    
          for (let i = 0; i < columns.length; i++) {

            thisMaxWidth = (columns[i].long === true ? valueLongMaxWidth : valueMaxWidth);
            valueDom = createNode({
              mother: thisTong,
              attribute: {
                aspid: aspirant.aspid,
                name: values[aspirant.aspid][i].name,
              },
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
                    width: String(thisMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, thisMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      aspid: aspirant.aspid,
                      name: values[aspirant.aspid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[aspirant.aspid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[aspirant.aspid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });

            if (Array.isArray(columns[i].menu)) {
              valueDom.setAttribute("menu", JSON.stringify(columns[i].menu));
              valueDom.setAttribute("menuwidth", String(columns[i].menuWidth));
              valueDom.setAttribute("update", (await hexaJson({ update: columns[i].update })));
              valueDom.addEventListener("click", async function (e) {
                try {
                  const self = this;
                  const zIndex = 4;
                  const aspid = this.getAttribute("aspid");
                  const menu = equalJson(this.getAttribute("menu"));
                  const menuWidth = Number(this.getAttribute("menuwidth"));
                  const menuTargets = menu.filter((o) => { return (o.columnOnly !== true) });
                  const thisUpdateFunction = (await hexaJson(this.getAttribute("update"))).update.bind(instance);
                  let cancelBack, menuPrompt;                  

                  cancelBack = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    event: (e) => {
                      self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                      removeByClass(menuValuePromptClassName);
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
        
                  menuPrompt = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    style: {
                      position: "fixed",
                      top: String(e.y + menuVisual) + "px",
                      left: String(e.x + menuVisual) + "px",
                      width: String(menuWidth) + ea,
                      animation: "fadeuplite 0.3s ease forwards",
                      zIndex: String(zIndex),
                    },
                    children: menuTargets.map(({ value }) => {
                      return {
                        attribute: {
                          value,
                        },
                        event: {
                          selectstart: (e) => { e.preventDefault() },
                          click: async function (e) {
                            try {
                              const thisValue = this.getAttribute("value");
                              self.querySelector("." + valueTargetClassName).textContent = thisValue;
                              self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                              await thisUpdateFunction(aspid, thisValue, menuTargets);
                              removeByClass(menuValuePromptClassName);
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        },
                        style: {
                          display: "flex",
                          position: "relative",
                          width: String(menuWidth) + ea,
                          height: String(menuPromptHeight) + ea,
                          borderRadius: String(5) + "px",
                          background: colorChip.gradientGreen,
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
                  });

                  setQueue(() => {
                    self.querySelector("." + valueTargetClassName).style.color = colorChip.green;
                  });

                } catch (e) {
                  console.log(e);
                }
              });
            } else if (columns[i].type === "date" && typeof columns[i].update === "function") {
              valueDom.setAttribute("update", (await hexaJson({ update: columns[i].update })));
              valueDom.addEventListener("click", async function (e) {
                try {
                  const self = this;
                  const zIndex = 4;
                  const aspid = this.getAttribute("aspid");
                  const thisUpdateFunction = (await hexaJson(this.getAttribute("update"))).update.bind(instance);
                  let cancelBack, calendarPrompt;                  
                  let calendar;

                  cancelBack = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    event: (e) => {
                      self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                      removeByClass(menuValuePromptClassName);
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

                  calendarPrompt = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    style: {
                      position: "fixed",
                      top: String(e.y + menuVisual) + "px",
                      left: String(e.x + menuVisual - (300 / 2)) + "px",
                      paddingTop: String(calendarBoxBetween) + ea,
                      width: String(calendarWidth) + ea,
                      animation: "fadeuplite 0.3s ease forwards",
                      zIndex: String(zIndex),
                    },
                    children: [
                      {
                        event: {
                          click: async function (e) {
                            try {
                              const thisValue = new Date(1800, 0, 1);
                              self.querySelector("." + valueTargetClassName).textContent = "해당 없음";
                              self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                              await thisUpdateFunction(aspid, thisValue);
                              removeByClass(menuValuePromptClassName);
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        },
                        style: {
                          display: "inline-flex",
                          verticalAlign: "top",
                          position: "relative",
                          width: String((calendarWidth - calendarBoxBetween) / 2) + ea,
                          background: colorChip.white,
                          boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                          borderRadius: String(5) + "px",
                          height: String(calendarBoxHeight) + ea,
                          marginBottom: String(calendarBoxBetween) + ea,
                          marginRight: String(calendarBoxBetween) + ea,
                          cursor: "pointer",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: "해당 없음",
                          style: {
                            position: "relative",
                            top: String(menuTextTop) + ea,
                            fontSize: String(menuSize) + ea,
                            fontWeight: String(menuWeight),
                            color: colorChip.black,
                          }
                        }
                      },
                      {
                        event: {
                          click: async function (e) {
                            try {
                              const thisValue = new Date(3800, 0, 1);
                              self.querySelector("." + valueTargetClassName).textContent = "예정";
                              self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                              await thisUpdateFunction(aspid, thisValue);
                              removeByClass(menuValuePromptClassName);
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        },
                        style: {
                          display: "inline-flex",
                          verticalAlign: "top",
                          position: "relative",
                          width: String((calendarWidth - calendarBoxBetween) / 2) + ea,
                          background: colorChip.white,
                          boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                          borderRadius: String(5) + "px",
                          height: String(calendarBoxHeight) + ea,
                          marginBottom: String(calendarBoxBetween) + ea,
                          cursor: "pointer",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: "예정",
                          style: {
                            position: "relative",
                            top: String(menuTextTop) + ea,
                            fontSize: String(menuSize) + ea,
                            fontWeight: String(menuWeight),
                            color: colorChip.black,
                          }
                        }
                      },
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          width: String(calendarWidth) + ea,
                          background: colorChip.white,
                          boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                          borderRadius: String(5) + "px",
                        },
                      }
                    ]
                  });

                  calendar = instance.mother.makeCalendar(new Date(), async function (e) {
                    try {
                      e.stopPropagation();
                      e.preventDefault();
                      const stringValue = this.getAttribute("buttonValue");
                      const thisValue = stringToDate(stringValue);
                      this.setAttribute("value", stringValue);
                      self.querySelector("." + valueTargetClassName).textContent = stringValue;
                      self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                      await thisUpdateFunction(aspid, thisValue);
                      removeByClass(menuValuePromptClassName);
                    } catch (e) {
                      console.log(e);
                    }
                  });
                  calendarPrompt.lastChild.appendChild(calendar.calendarBase);

                  setQueue(() => {
                    self.querySelector("." + valueTargetClassName).style.color = colorChip.green;
                  });

                } catch (e) {
                  console.log(e);
                }
              });
            } else if (typeof columns[i].update === "function") {
              valueDom.setAttribute("update", (await hexaJson({ update: columns[i].update })));
              valueDom.addEventListener("click", async function (e) {
                try {
                  const self = this;
                  const zIndex = 4;
                  const aspid = this.getAttribute("aspid");
                  const thisUpdateFunction = (await hexaJson(this.getAttribute("update"))).update.bind(instance);
                  let cancelBack, longTextPrompt;                  

                  cancelBack = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    event: (e) => {
                      self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                      removeByClass(menuValuePromptClassName);
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

                  longTextPrompt = createNode({
                    mother: totalContents,
                    class: [ menuValuePromptClassName ],
                    style: {
                      position: "fixed",
                      top: String(e.y + menuVisual) + "px",
                      left: String(e.x + menuVisual) + "px",
                      width: String(longTextWidth) + ea,
                      background: colorChip.white,
                      animation: "fadeuplite 0.3s ease forwards",
                      zIndex: String(zIndex),
                    },
                    child: {
                      style: {
                        display: "flex",
                        position: "relative",
                        width: String(longTextWidth) + ea,
                        height: String(longTextHeight) + ea,
                        borderRadius: String(5) + "px",
                        background: colorChip.white,
                        boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
                        borderRadius: String(5) + "px",
                        marginBottom: String(menuBetween) + ea,
                        justifyContent: "start",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        paddingLeft: String(12) + ea,
                      },
                      child: {
                        mode: "input",
                        attribute: {
                          type: "text",
                          value: self.querySelector("." + valueTargetClassName).textContent,
                        },
                        event: {
                          keydown: async function (e) {
                            try {
                              if (e.key === "Enter" || e.key === "Tab") {
                                e.preventDefault();
                              }
                            } catch (e) {
                              console.log(e);
                            }
                          },
                          keyup: async function (e) {
                            try {
                              if (e.key === "Enter" || e.key === "Tab") {
                                e.preventDefault();
                                const thisValue = this.value.trim().replace(/[\&\=\+\/\\\#]/gi, '');
                                self.querySelector("." + valueTargetClassName).textContent = thisValue;
                                self.querySelector("." + valueTargetClassName).style.color = self.querySelector("." + valueTargetClassName).getAttribute("color");
                                await thisUpdateFunction(aspid, thisValue);
                                removeByClass(menuValuePromptClassName);
                              }
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        },
                        style: {
                          position: "relative",
                          top: String(menuTextTop) + ea,
                          fontSize: String(menuSize) + ea,
                          fontWeight: String(menuWeight),
                          color: colorChip.green,
                          border: String(0),
                          outline: String(0),
                          width: withOut(0, ea),
                          height: withOut(0, ea),
                        }
                      }
                    }
                  });
                  longTextPrompt.querySelector("input").focus();

                  setQueue(() => {
                    self.querySelector("." + valueTargetClassName).style.color = colorChip.green;
                  });

                } catch (e) {
                  console.log(e);
                }
              });

            }

          }
    
        }
    
        await this.aspirantColorSync();

      } catch (e) {
        console.log(e);
      }
    }

    await aspirantContentsLoad(false);
    this.aspirantContentsLoad = aspirantContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantSearchEvent = async function () {
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
          let whereQuery;
          if (value === '') {
            whereQuery = {};
          } else {
            whereQuery = { $or: [
              { designer: { $regex: value } },
              { aspid: { $regex: value } },
            ] };
          }
          const aspirants = await ajaxJson({ noFlat: true, whereQuery }, BACKHOST + "/getAspirants", { equal: true });

          instance.aspirants = aspirants;
          await instance.aspirantContentsLoad(true);
          
          setQueue(async () => {
            try {
              if (instance.aspirants.length === 1) {
                const tempFunc = instance.aspirantWhiteCard(instance.aspirants[0].aspid);
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

DesignerJs.prototype.aspirantSendNotice = function (method, aspid) {
  const instance = this;
  const { ea, totalContents, aspirants } = this;
  const { ajaxJson } = GeneralJs;

  if (method === "documents") {
    return async function () {
      try {
        const aspirant = aspirants.find((d) => { return d.aspid === aspid });
        let whereQuery, updateQuery;
        if (aspirant === undefined) {
          throw new Error("invalid aspid");
        }

        if (window.confirm(aspirant.designer + " 실장님께 등록 서류 업로드 알림톡을 전송할까요?")) {

          whereQuery = {};
          whereQuery["aspid"] = aspid;
          updateQuery = {};
          updateQuery["meeting.status"] = "등록 요청";
          await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

          const response = await ajaxJson({
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "documents",
          }, SECONDHOST + "/noticeAspirantConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspirant.aspid;
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "payment") {
    return async function () {
      try {
        const aspirant = aspirants.find((d) => { return d.aspid === aspid });
        let whereQuery, updateQuery;
        if (aspirant === undefined) {
          throw new Error("invalid aspid");
        }

        if (window.confirm(aspirant.designer + " 실장님께 등록비 결제 알림톡을 전송할까요?")) {

          whereQuery = {};
          whereQuery["aspid"] = aspid;
          updateQuery = {};
          updateQuery["meeting.status"] = "등록 요청";
          await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

          const response = await ajaxJson({
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "payment",
          }, SECONDHOST + "/noticeAspirantConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspirant.aspid;
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "plus") {
    return async function () {
      try {
        const aspirant = aspirants.find((d) => { return d.aspid === aspid });
        let whereQuery, updateQuery;
        if (aspirant === undefined) {
          throw new Error("invalid aspid");
        }

        if (window.confirm(aspirant.designer + " 실장님께 추가 포트폴리오 요청 알림톡을 전송할까요?")) {

          whereQuery = {};
          whereQuery["aspid"] = aspid;
          updateQuery = {};
          updateQuery["meeting.status"] = "추가 요청";
          await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

          const response = await ajaxJson({
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "plus",
          }, SECONDHOST + "/noticeAspirantConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }
          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspirant.aspid;
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "fail") {
    return async function () {
      try {
        const aspirant = aspirants.find((d) => { return d.aspid === aspid });
        let whereQuery;
        let updateQuery;
        let hlBot;
        if (aspirant === undefined) {
          throw new Error("invalid aspid");
        }

        if (window.confirm(aspirant.designer + " 실장님께 불합격 통지를 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "fail",
          }, SECONDHOST + "/noticeAspirantConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }

          hlBot = GeneralJs.stacks.members.find((obj) => { return obj.roles.includes("Bot"); }).name;

          whereQuery = { aspid: aspirant.aspid };

          updateQuery = {};
          updateQuery["response.first.status"] = "불합격";
          updateQuery["meeting.status"] = "드랍";
          updateQuery["response.manager"] = hlBot;

          await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspirant.aspid;
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  } else if (method === "pure") {
    return async function () {
      try {
        const aspirant = aspirants.find((d) => { return d.aspid === aspid });
        if (aspirant === undefined) {
          throw new Error("invalid aspid");
        }

        if (window.confirm(aspirant.designer + " 실장님께 부재중 알림을 전송할까요?")) {
          const response = await ajaxJson({
            mode: "send",
            aspid: aspirant.aspid,
            designer: aspirant.designer,
            phone: aspirant.phone,
            type: "pure",
          }, SECONDHOST + "/noticeAspirantConsole", { equal: true });
          if (response.message === "success") {
            window.alert("전송에 성공하였습니다!");
          } else {
            window.alert("전송에 실패하였습니다! 다시 시도해주세요.");
          }

          window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspirant.aspid;
        }
        
      } catch (e) {
        window.alert(e.message);
        console.log(e);
        return null;
      }
    }
  }
}

DesignerJs.prototype.communicationRender = function () {
  const instance = this;
  const { communication } = this.mother;
  const { whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, sleep, blankHref } = GeneralJs;

  communication.setItem([
    () => { return "합격 응대 스트립트 보기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        blankHref("https://docs.google.com/document/d/1GyQ-ptfy1QaM5ciaIi_QZjuQ6hwruTB4WDmscieNxLY/edit?usp=sharing");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "반려 응대 스트립트 보기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        blankHref("https://docs.google.com/document/d/1GyQ-ptfy1QaM5ciaIi_QZjuQ6hwruTB4WDmscieNxLY/edit?usp=sharing");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "확인 응대 스트립트 보기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        blankHref("https://docs.google.com/document/d/1GyQ-ptfy1QaM5ciaIi_QZjuQ6hwruTB4WDmscieNxLY/edit?usp=sharing");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "QnA 보기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) === null;
    },
    async function (e) {
      try {
        blankHref("https://docs.google.com/document/d/1GyQ-ptfy1QaM5ciaIi_QZjuQ6hwruTB4WDmscieNxLY/edit?usp=sharing");
      } catch (e) {
        console.log(e);
      }
    }
  ]);

  communication.setItem([
    () => { return "1차 유선 통화 완료"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const aspid = document.querySelector('.' + whiteBaseClassName).getAttribute("aspid");
      try {
        let whereQuery, updateQuery;

        whereQuery = {};
        whereQuery["aspid"] = aspid;
        updateQuery = {};
        updateQuery["response.date"] = new Date();

        await ajaxJson({ whereQuery, updateQuery }, BACKHOST + "/rawUpdateAspirant");

        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      }
    }
  ]);

  communication.setItem([
    () => { return "추가 포트폴리오 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const aspid = document.querySelector('.' + whiteBaseClassName).getAttribute("aspid");
      try {
        const sendFunc = instance.aspirantSendNotice("plus", aspid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      }
    }
  ]);

  communication.setItem([
    () => { return "등록 서류 요청하기"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const aspid = document.querySelector('.' + whiteBaseClassName).getAttribute("aspid");
      try {
        const sendFunc = instance.aspirantSendNotice("documents", aspid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      }
    }
  ]);

  communication.setItem([
    () => { return "부재중 알림"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const aspid = document.querySelector('.' + whiteBaseClassName).getAttribute("aspid");
      try {
        const sendFunc = instance.aspirantSendNotice("pure", aspid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      }
    }
  ]);

  communication.setItem([
    () => { return "불합격 통지"; },
    function () {
      return document.querySelector('.' + whiteBaseClassName) !== null;
    },
    async function (e) {
      const aspid = document.querySelector('.' + whiteBaseClassName).getAttribute("aspid");
      try {
        const sendFunc = instance.aspirantSendNotice("fail", aspid);
        await sendFunc();
      } catch (e) {
        console.log(e);
        window.location.href = window.location.protocol + "//" + window.location.host + "/designer?mode=aspirant&aspid=" + aspid;
      }
    }
  ]);

}

DesignerJs.prototype.aspirantView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, returnGet } = GeneralJs;
    const getObj = returnGet();
    let loading;
    let aspirants;
    let noticeSendRows;

    loading = await this.mother.loadingRun();
    aspirants = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getAspirants", { equal: true });
    noticeSendRows = await ajaxJson({ mode: "get" }, SECONDHOST + "/noticeAspirantConsole", { equal: true });

    this.members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });
    GeneralJs.stacks.members = this.members;

    this.aspirants = aspirants;
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

    await this.aspirantBase();
    await this.aspirantSearchEvent();
    this.communicationRender();

    loading.parentNode.removeChild(loading);

    if (getObj.aspid !== undefined) {
      const tempFunction = instance.aspirantWhiteCard(getObj.aspid);
      await tempFunction(new Event("click"));
    }

  } catch (e) {
    console.log(e);
  }
}
