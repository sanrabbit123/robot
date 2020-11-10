module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = new Date("1800-01-01");
  return async function (row) {
    try {
      let request, analytics, proposal;
      let tempObj, tempObjDetail, tempObjDetail2;
      let spaceArr;
      let totalTong;

      totalTong = [];

      for (let past of row) {
        tempObj = map().structure;
        tempObjDetail = tempObj.requests[0];

        //first request

        tempObj.name = past.a19_name.trim();
        tempObj.phone = past.a20_phone.trim();
        tempObj.email = emailFilter(past.a35_aboutetc);
        tempObj.cliid = past.a4_customernumber;

        request = tempObjDetail.request;

        request.timeline = new Date(past.a18_timeline);
        request.budget = selectionFilter(past.a23_budget.trim(), ['500만원 이하','1,000만원','1,500만원','2,000만원','2,500만원','3,000만원','3,500만원','4,000만원','4,500만원','5,000만원 이상']);
        request.family = hypenFilter(past.a22_family.trim());

        request.space.address = hypenFilter(past.a21_address.trim());
        request.space.contract = selectionFilter(past.a27_contract.trim(), ['전월세','자가']);
        request.space.pyeong = Number(past.a24_pyeong.replace(/[^0-9]/g, ''));

        if (/\//g.test(past.a28_space)) {
          spaceArr = past.a28_space.split(" / ");
          request.space.spec.room = Number(spaceArr[0].replace(/[^0-9]/g, ''));
          request.space.spec.bathroom = Number(spaceArr[1].replace(/[^0-9]/g, ''));
          request.space.spec.valcony = (/없음/g.test(spaceArr[2]) ? false : true);
        } else {
          request.space.spec.room = 1;
          request.space.spec.bathroom = 1;
          request.space.spec.valcony = false;
        }

        if (/거주/g.test(past.a25_due_date)) {
          request.space.resident.living = true;
          request.space.resident.expected = EMPTYDATE;
        } else {
          if (past.a25_due_date !== '' && past.a25_due_date !== '-') {
            request.space.resident.living = false;
            request.space.resident.expected = new Date(dateFilter(past.a25_due_date.trim(), past));
          } else {
            request.space.resident.living = false;
            request.space.resident.expected = EMPTYDATE;
          }
        }

        request.etc.comment = hypenFilter(past.a29_etc.trim());
        request.etc.channel = hypenFilter(past.a30_channel.trim());


        //second analysis

        analytics = tempObjDetail.analytics;

        analytics.googleAnalytics.timeline = EMPTYDATE;
        analytics.googleAnalytics.history = [];

        analytics.response.status = selectionFilter(past.a1_class1.trim(), ['드랍','진행','응대중','완료']);
        if (past.a3_reason !== '' && past.a3_reason !== '-') {
          analytics.response.outreason.push(selectionFilter(past.a3_reason.trim(), ['연결 안 됨','가벼운 문의','타사 계약','비용 문제','의견 조정 안 됨','직접 진행']));
        } else {
          analytics.response.outreason = [];
        }

        if (past.a5_call !== '' && past.a5_call !== '-') {
          analytics.date.callHistory.push(new Date(dateFilter(past.a5_call.trim(), past)));
        } else {
          analytics.date.callHistory = [];
        }

        if (past.a13_sajeon !== '' && past.a13_sajeon !== '-') {
          analytics.date.space.precheck = new Date(dateFilter(past.a13_sajeon.trim(), past));
        } else {
          analytics.date.space.precheck = EMPTYDATE;
        }

        if (past.a14_emptyday !== '' && past.a14_emptyday !== '-' && /^[0-9]/.test(past.a14_emptyday)) {
          analytics.date.space.empty = new Date(dateFilter(past.a14_emptyday.trim(), past));
        } else if (past.a14_emptyday !== '' && past.a14_emptyday !== '-') {
          analytics.date.space.empty = new Date(past.a18_timeline.slice(0, 10));
        } else {
          analytics.date.space.empty = EMPTYDATE;
        }

        if (past.a25_due_date !== '' && past.a25_due_date !== '-' && !/거주/g.test(past.a25_due_date)) {
          analytics.date.space.movein = new Date(dateFilter(past.a25_due_date.trim(), past));
        } else {
          analytics.date.space.movein = EMPTYDATE;
        }

        analytics.picture.space = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);
        analytics.picture.style = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);

        tempObj.requests = [];
        tempObj.requests.push(tempObjDetail);
        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
