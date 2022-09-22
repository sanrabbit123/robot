const dayId = [
  "d074",
];

const hourId = [];

const worker = async function (package) {
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal,
    rethink,
  } = package;
  const { messageLog, errorLog, dateToString } = mother;
  try {

    const designerCoreSheetsId = "1LYJvGiIyh1nfn8DpKX6s6o61p6ghF3RJvazmkcRc3bw";
    const selfMongo = mongo;
    const designers = await back.getDesignersByQuery({}, { selfMongo });
    const projects = await back.getProjectsByQuery({}, { selfMongo });
    const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
    let matrix;
    let tempArr;
    let num;
    let processNum;
    let proposalNum, contractNum, contentsNum;
    let successRatio, convertingRatio, contractRatio;

    matrix = [
      [
        "아이디",
        "성함",
        "연락처",
        "계약 상태",
        "계약일",
        "종류",
        "시공 레벨",
        "스타일링 레벨",
        "체크리스트",
      ]
    ];

    for (let designer of designers) {
      tempArr = [];
      tempArr.push(designer.desid);
      tempArr.push(designer.designer);
      tempArr.push(designer.information.phone);
      tempArr.push(designer.information.contract.status.value);
      tempArr.push(dateToString(designer.information.contract.date));
      tempArr.push([ "신진", "일반", "메인" ][designer.analytics.grade + 1]);
      tempArr.push([ "하", "중", "상" ][designer.analytics.construct.level - 1]);
      tempArr.push([ "하", "중", "상" ][designer.analytics.styling.level - 1]);
      tempArr.push("https://" + address.backinfo.host + "/designer?desid=" + designer.desid);
      matrix.push(tempArr);
    }

    await sheets.update_value_inPython(designerCoreSheetsId, "분류", matrix, [ 0, 3 ]);

    matrix = [
      [
        "아이디",
        "성함",
        "계약 상태",
        "진행중 건수",
        "누적 제안수",
        "누적 계약수",
        "누적 컨텐츠 수",
        "계약 성공률",
        "컨텐츠 전환율",
        "계약 비율",
      ]
    ];

    for (let designer of designers) {
      tempArr = [];
      tempArr.push(designer.desid);
      tempArr.push(designer.designer);
      tempArr.push(designer.information.contract.status.value);

      processNum = 0;
      for (let project of projects) {
        if (project.desid === designer.desid) {
          if (project.process.calculation.payments.remain.date.valueOf() < (new Date(2000, 0, 1)).valueOf()) {
            processNum++;
          }
        }
      }
      tempArr.push(processNum);

      proposalNum = 0;
      for (let project of projects) {
        if (project.proposal.detail.toNormal().map((obj) => { return obj.desid }).includes(designer.desid)) {
          proposalNum++;
        }
      }
      tempArr.push(proposalNum);

      contractNum = 0;
      for (let project of projects) {
        if (project.desid === designer.desid) {
          contractNum++;
        }
      }
      tempArr.push(contractNum);

      contentsNum = 0;
      for (let contents of contentsArr) {
        if (contents.proid !== '') {
          if (contents.desid === designer.desid) {
            contentsNum++;
          }
        }
      }
      tempArr.push(contentsNum);

      successRatio = 0;
      convertingRatio = 0;
      contractRatio = 0;

      if (proposalNum !== 0) {
        successRatio = contractNum / proposalNum;
      }
      if (contractNum !== 0) {
        convertingRatio = contentsNum / contractNum;
      }
      contractRatio = contractNum / projects.filter((project) => { return project.desid !== "" }).length;

      tempArr.push(successRatio);
      tempArr.push(convertingRatio);
      tempArr.push(contractRatio);

      matrix.push(tempArr);
    }

    await sheets.update_value_inPython(designerCoreSheetsId, "현황", matrix, [ 0, 3 ]);

    await messageLog("total designer board done");
    return true;
  } catch (e) {
    await errorLog("total designer board error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
