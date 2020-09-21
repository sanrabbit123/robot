module.exports = function (funcs) {
  const { main: newObj, sub: newObjDetail } = funcs;
  return function (row) {
    const EMPTYDATE = "9999-09-09";

    // email filter
    function emailFilter(str) {
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

    // date filter
    function dateFilter(raw, mother) {
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

    // selection filter
    function selectionFilter(str, arr) {
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

    // hypen filter
    function hypenFilter(str) {
      if (str === '-') {
        return "";
      } else {
        return str;
      }
    }

    let firstRequest, secondAnalysis, thirdProposal;
  	let tempObj, tempObjDetail;
  	let spaceArr;
  	let totalTong;

    totalTong = [];

    for (let past of row) {
  	  tempObj = newObj();
  		tempObjDetail = newObjDetail().request;

  		//first request

  		tempObj.name = past.a19_name.trim();
  		tempObj.phone = past.a20_phone.trim();
  		tempObj.email = emailFilter(past.a35_aboutetc);
  		tempObj.cliid = past.a4_customernumber;

  	  firstRequest = tempObjDetail.firstRequest;

  		firstRequest.timeline = past.a18_timeline.slice(0, 10);
  		firstRequest.budget = selectionFilter(past.a23_budget.trim(), ['500만원 이하','1,000만원','1,500만원','2,000만원','2,500만원','3,000만원','3,500만원','4,000만원','4,500만원','5,000만원 이상']);
  		firstRequest.family = hypenFilter(past.a22_family.trim());

  		firstRequest.space.address = hypenFilter(past.a21_address.trim());
  		firstRequest.space.contract = selectionFilter(past.a27_contract.trim(), ['전월세','자가']);
  		firstRequest.space.pyeong = Number(past.a24_pyeong.replace(/[^0-9]/g, ''));

  		if (/\//g.test(past.a28_space)) {
  			spaceArr = past.a28_space.split(" / ");
  			firstRequest.space.spec.room = Number(spaceArr[0].replace(/[^0-9]/g, ''));
  			firstRequest.space.spec.bathroom = Number(spaceArr[1].replace(/[^0-9]/g, ''));
  			firstRequest.space.spec.valcony = (/없음/g.test(spaceArr[2]) ? false : true);
  		} else {
  			firstRequest.space.spec.room = 1;
  			firstRequest.space.spec.bathroom = 1;
  			firstRequest.space.spec.valcony = false;
  		}

  		if (/거주/g.test(past.a25_due_date)) {
  			firstRequest.space.resident.living = true;
  			firstRequest.space.resident.expected = EMPTYDATE;
  		} else {
        if (past.a25_due_date !== '' && past.a25_due_date !== '-') {
          firstRequest.space.resident.living = false;
    			firstRequest.space.resident.expected = dateFilter(past.a25_due_date.trim(), past);
        } else {
          firstRequest.space.resident.living = false;
    			firstRequest.space.resident.expected = EMPTYDATE;
        }
  		}

  		firstRequest.etc.comment = hypenFilter(past.a29_etc.trim());
  		firstRequest.etc.channel = hypenFilter(past.a30_channel.trim());


  		//second analysis

  	  secondAnalysis = tempObjDetail.secondAnalysis;
  	  secondAnalysis.response.status = selectionFilter(past.a1_class1.trim(), ['드랍','진행','응대중','완료']);
  		if (past.a3_reason !== '' && past.a3_reason !== '-') {
  			secondAnalysis.response.outreason.push(selectionFilter(past.a3_reason.trim(), ['연결 안 됨','가벼운 문의','타사 계약','비용 문제','의견 조정 안 됨','직접 진행']));
  		} else {
  			secondAnalysis.response.outreason = [];
  		}

  	  if (past.a5_call !== '' && past.a5_call !== '-') {
  	    secondAnalysis.date.phonecall.latest = dateFilter(past.a5_call.trim(), past);
  	  } else {
  			secondAnalysis.date.phonecall.latest = EMPTYDATE;
  	  }

  		if (past.a11_next !== '' && past.a11_next !== '-') {
  	    secondAnalysis.date.phonecall.next = dateFilter(past.a11_next.trim(), past);
  	  } else {
  			secondAnalysis.date.phonecall.next = EMPTYDATE;
  	  }

  	  if (past.a13_sajeon !== '' && past.a13_sajeon !== '-') {
  	    secondAnalysis.date.space.precheck = dateFilter(past.a13_sajeon.trim(), past);
  	  } else {
  			secondAnalysis.date.space.precheck = EMPTYDATE;
  		}

  	  if (past.a14_emptyday !== '' && past.a14_emptyday !== '-' && /^[0-9]/.test(past.a14_emptyday)) {
  	    secondAnalysis.date.space.empty = dateFilter(past.a14_emptyday.trim(), past);
  	  } else if (past.a14_emptyday !== '' && past.a14_emptyday !== '-') {
  			secondAnalysis.date.space.empty = past.a18_timeline.slice(0, 10);
  		} else {
  			secondAnalysis.date.space.empty = EMPTYDATE;
  		}

  	  if (past.a25_due_date !== '' && past.a25_due_date !== '-' && !/거주/g.test(past.a25_due_date)) {
  	    secondAnalysis.date.space.movein = dateFilter(past.a25_due_date.trim(), past);
  	  } else {
  			secondAnalysis.date.space.movein = EMPTYDATE;
  		}

  	  secondAnalysis.picture.space.submit = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);
  	  secondAnalysis.picture.style.style = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);

  	  secondAnalysis.history = past.a12_history;
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += "시공 관련";
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += past.a32_aboutcom;
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += "스타일링 관련";
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += past.a33_aboutsty;
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += "예산 관련";
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += past.a34_aboutmon;
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += "기타 관련";
  		secondAnalysis.history += "\n\n";
  		secondAnalysis.history += past.a35_aboutetc;

  		//third proposal

  	  thirdProposal = tempObjDetail.thirdProposal;
  	  if (past.a16_service !== '' && past.a16_service !== '-') {
  	    thirdProposal.service.push(past.a16_service.trim());
  	  } else {
  	  	thirdProposal.service = [];
  	  }

  	  if (past.a9_proposal !== '' && past.a9_proposal !== '-') {
  	    thirdProposal.send = dateFilter(past.a9_proposal.trim(), past);
  	  } else {
  			thirdProposal.send = EMPTYDATE;
  	  }

  		tempObj.request.push(tempObjDetail);
  		console.log("success");
  		totalTong.push(tempObj);
  	}

    return totalTong;
  }
}
