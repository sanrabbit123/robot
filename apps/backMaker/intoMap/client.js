module.exports = function (tools) {
  const { map, Mother, Notion } = tools;
  const emailFilter = function (str) {
    let strArr, email;
    strArr = str.split(' ');
    for (let i of strArr) {
      if (/@/.test(i)) { email = i; }
    }
    if (email !== undefined) {
      return email.trim();
    } else {
      return '';
    }
  }
  const dateFilter = function (raw, mother) {
    const EMPTYDATE = "9999-09-09";
    const { a18_timeline } = mother;
    const currentDateRAW = a18_timeline.slice(0, 10).split('-');
    let currentDate = [];
    for (let i of currentDateRAW) {
      currentDate.push(Number(i));
    }
    let temp, result;

    //exception
    if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw)) {


      //six-wording
      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw.trim())) {
        console.log("fix : (six-wording) " + raw + " => " + "20" + raw)
        return "20" + raw.trim();


      //first-month-error
      } else if (/^[0-9]+월[초]/.test(raw.trim())) {

        temp = Number(raw.trim().replace(/[^0-9]/g, ''));

        if (temp >= currentDate[1]) {
          result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
        } else {
          result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '01';
        }

        console.log("fix : (first-month-error) " + raw + " => " + result);
        return result;


      //first-hangul-error
      } else if (/\-[초]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '01';
        console.log("fix : (first-hangul-error) " + raw + " => " + result);
        return result;


      //last-month-error
      } else if (/^[0-9]+월[말]/.test(raw.trim())) {

        temp = Number(raw.trim().replace(/[^0-9]/g, ''));

        if (temp >= currentDate[1]) {
          result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
        } else {
          result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '28';
        }

        console.log("fix : (last-month-error) " + raw + " => " + result);
        return result;


      //last-hangul-error
      } else if (/\-[말]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '28';
        console.log("fix : (last-hangul-error) " + raw + " => " + result);
        return result;


      //middle-month-error
      } else if (/^[0-9]+월[중]/.test(raw.trim())) {

          temp = Number(raw.trim().replace(/[^0-9]/g, ''));

          if (temp >= currentDate[1]) {
            result = String(currentDate[0]) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          } else {
            result = String(currentDate[0] + 1) + '-' + String(((temp < 10) ? '0' + String(temp) : String(temp))) + '-' + '15';
          }

          console.log("fix : (middle-month-error) " + raw + " => " + result);
          return result;


      //middle-hangul-error
      } else if (/\-[중]/.test(raw.trim())) {
        temp = raw.trim().split('-');
        result = '';
        if (temp[0].length === 2) {
          result += '20' + temp[0] + '-'
        } else {
          result += temp[0] + '-'
        }
        if (Number(temp[1]) < 10) {
          result += '0' + temp[1].replace(/0/g, '') + '-';
        } else {
          result += temp[1] + '-';
        }
        result += '15';
        console.log("fix : (middle-hangul-error) " + raw + " => " + result);
        return result;


      //wait error
      } else if (/wait/g.test(raw.trim()) || /대기/g.test(raw.trim()) || /피드백/g.test(raw.trim()) || /여유/g.test(raw.trim()) || /미정/g.test(raw.trim())) {

          console.log("fix : (wait error) " + raw + " => " + EMPTYDATE);
          return EMPTYDATE;


      //leave error
      } else if (/지남/g.test(raw.trim()) || /이미/g.test(raw.trim()) || /비어/g.test(raw.trim()) || /asap/g.test(raw.trim())) {

          console.log("fix : (leave error) " + raw + " => " + a18_timeline.slice(0, 10));
          return a18_timeline.slice(0, 10);


      } else {
        console.log(raw);
        return raw.replace(/\?/, '').trim();
      }
    } else {
      return raw.trim();
    }
  }
  const selectionFilter = function (str, arr) {
    let tempReg;
    let index = 999;

    for (let i = 0; i < arr.length; i++) {
      tempReg = new RegExp(arr[i], "gi");
      if (tempReg.test(str.trim())) { index = i; }
    }

    if (index === 999) {
      return "알 수 없음";
    } else {
      return arr[index];
    }
  }
  const hypenFilter = function (str) {
    if (str === '-') {
      return "";
    } else {
      return str;
    }
  }
  const EMPTYDATE = "9999-09-09";

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

        request.timeline = past.a18_timeline;
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
            request.space.resident.expected = dateFilter(past.a25_due_date.trim(), past);
          } else {
            request.space.resident.living = false;
            request.space.resident.expected = EMPTYDATE;
          }
        }

        request.etc.comment = hypenFilter(past.a29_etc.trim());
        request.etc.channel = hypenFilter(past.a30_channel.trim());


        //second analysis

        analytics = tempObjDetail.analytics;

        analytics.googleAnalytics.history = [];

        analytics.response.status = selectionFilter(past.a1_class1.trim(), ['드랍','진행','응대중','완료']);
        if (past.a3_reason !== '' && past.a3_reason !== '-') {
          analytics.response.outreason.push(selectionFilter(past.a3_reason.trim(), ['연결 안 됨','가벼운 문의','타사 계약','비용 문제','의견 조정 안 됨','직접 진행']));
        } else {
          analytics.response.outreason = [];
        }

        if (past.a5_call !== '' && past.a5_call !== '-') {
          analytics.date.callHistory.push(dateFilter(past.a5_call.trim(), past));
        } else {
          analytics.date.callHistory = [];
        }

        if (past.a13_sajeon !== '' && past.a13_sajeon !== '-') {
          analytics.date.space.precheck = dateFilter(past.a13_sajeon.trim(), past);
        } else {
          analytics.date.space.precheck = EMPTYDATE;
        }

        if (past.a14_emptyday !== '' && past.a14_emptyday !== '-' && /^[0-9]/.test(past.a14_emptyday)) {
          analytics.date.space.empty = dateFilter(past.a14_emptyday.trim(), past);
        } else if (past.a14_emptyday !== '' && past.a14_emptyday !== '-') {
          analytics.date.space.empty = past.a18_timeline.slice(0, 10);
        } else {
          analytics.date.space.empty = EMPTYDATE;
        }

        if (past.a25_due_date !== '' && past.a25_due_date !== '-' && !/거주/g.test(past.a25_due_date)) {
          analytics.date.space.movein = dateFilter(past.a25_due_date.trim(), past);
        } else {
          analytics.date.space.movein = EMPTYDATE;
        }

        analytics.picture.space = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);
        analytics.picture.style = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);

        tempObj.requests = [];
        tempObj.requests.push(tempObjDetail);
        console.log("success");
        totalTong.push(tempObj);
      }

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
