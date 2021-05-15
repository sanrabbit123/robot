const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const BridgeCloud = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();

  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/bridgeCloud";

  this.cloudHost = { inner: this.address.bridgeinfo.ip.inner, outer: this.mother.bridgeinfoObj.host, port: 3000 };
  this.bridge = { home: this.address.homeinfo.polling.inner, office: this.address.officeinfo.polling.inner, cloud: this.cloudHost.inner };

  this.formidable = require("formidable");

  this.ignorePhone = [ "010-2747-3403" ];
  this.frontHost = "https://" + this.address.frontinfo.host;
}

BridgeCloud.clientFilters = {
  filterAll: function (som) {
    let str = String(som);
    return str.replace(/[\*\^\:\&\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '').replace(/\n/g, ' ').replace(/^ /g, '').replace(/ $/g, '');
  },
  filterName: function (som) {
    let str = String(som);
    return str.replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, '').replace(/\t/g, '').replace(/  /g, '').replace(/ /g, '').replace(/ /g, '');
  },
  filterDate: function (som) {
    if (String(som).trim() === "거주중") {
      return "거주중";
    }
    const today = new Date();
    const zeroAddition = function (num) {
      if (num < 10) {
        return '0' + String(num);
      } else {
        return String(num);
      }
    }
    let str = String(som).replace(/[^0-9]/g, '');
    let dummyDate;
    if (str.length > 4) {
      if (/^2[0-9][0-9][0-9]/.test(str)) {
        if (str.length === 6) {
          return str.slice(0, 4) + '-0' + str.slice(4, 5) + '-0' + str.slice(5);
        } else if (str.length === 7) {
          if (str.slice(4, 5) === '1') {
            return str.slice(0, 4) + '-' + str.slice(4, 6) + '-0' + str.slice(6);
          } else {
            return str.slice(0, 4) + '-0' + str.slice(4, 5) + '-' + str.slice(5);
          }
        } else if (str.length === 8) {
          return str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6);
        } else {
          dummyDate = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
          return dummyDate;
        }
      } else {
        dummyDate = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
        return dummyDate;
      }
    } else {
      dummyDate = String(today.getFullYear()) + '-' + zeroAddition(today.getMonth() + 1) + '-' + zeroAddition(today.getDate());
      return dummyDate;
    }
  },
  filterCont: function (som) {
    let str = String(som);
    if (str === '') {
      return "알 수 없음";
    } else if (/전/g.test(str)) {
      return "전월세";
    } else {
      return "자가";
    }
  },
  filterNull: function (som) {
    let target;
    target = String(som);
    if (/^null/gi.test(target)) {
      return "-";
    } else {
      return target;
    }
  },
};

BridgeCloud.returnTimeline = function () {
  const today = new Date();
  const zeroAddition = function (number) {
    if (number > 9) {
      return String(number);
    } else {
      return '0' + String(number);
    }
  }

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  return (zeroAddition(year) + "-" + zeroAddition(month) + "-" + zeroAddition(day) + " " + zeroAddition(hours) + ":" + zeroAddition(minutes) + ":" + zeroAddition(seconds));
}

BridgeCloud.prototype.bridgeToGoogle = async function (obj) {
  const instance = this;
  const { shell, slack_bot, shellLink, googleSystem } = this.mother;
  try {
    const { tong, folder } = obj;
    let tongKeys = Object.keys(tong);
    const targetFolder = (obj.mode === "client") ? "1zB5SdQ1PLoE37870wlSBWk01AJvXwSRo" : "1i5A9i3OXHTyvMHoOr1-QuSuZXukhZBVm";
    const googleDrive = googleSystem("drive");

    //make client folder
    const folderId = await googleDrive.makeFolder_andMove(folder, targetFolder);

    //make detail folders
    let detailFolderId = [];
    for (let i = 0; i < tongKeys.length; i++) {
      detailFolderId.push(await googleDrive.makeFolder_andMove(tongKeys[i], folderId));
    }

    //upload files
    for (let i = 0; i < tongKeys.length; i++) {
      for (let j of tong[tongKeys[i]]) {
        await googleDrive.upload_andView(detailFolderId[i], j);
      }
    }

    let message = "";
    let already, updatePortfolio;

    if (obj.mode === "client") {
      message = obj.name + "(" + obj.cliid + ") 고객님의 파일 전송을 완료하였습니다!\n";
      message += "console : " + "https://" + instance.address.backinfo.host + "/client?cliid=" + obj.cliid + "\n";
      message += "drive : " + "https://drive.google.com/drive/folders/" + folderId + "?usp=sharing";
      slack_bot.chat.postMessage({ text: message, channel: "#401_consulting" });

    } else if (obj.mode === "designer") {
      already = await instance.back.getAspirantsByQuery({ phone: obj.phone });

      if (already.length > 0) {
        updatePortfolio = already[0].portfolio;
        updatePortfolio.unshift({
          date: new Date(),
          confirm: [],
          folderId: folderId
        });
        await instance.back.updateAspirant([
          { phone: obj.phone },
          { portfolio: updatePortfolio }
        ]);
      } else {
        console.log(obj, folderId);
      }

      message = "파일 전송을 완료하였습니다! (" + folder + ") link : https://drive.google.com/drive/folders/" + folderId + "?usp=sharing";
      slack_bot.chat.postMessage({ text: message, channel: "#300_designer" });
    }

    shell.exec(`rm -rf ${shellLink(this.dir + '/binary/' + folder)}`);
  } catch (e) {
    slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + e, channel: "#error_log" });
  }
}

BridgeCloud.prototype.bridgeToSheets = async function (obj) {
  const instance = this;
  const { shell, slack_bot, shellLink, googleSystem } = this.mother;
  const sheets = googleSystem("sheets");
  const dateToString = function (dateObject) {
    const zeroAddition = function (number) {
      if (number < 10) {
        return `0${String(number)}`;
      } else {
        return `${String(number)}`;
      }
    }
    return `${String(dateObject.getFullYear())}-${zeroAddition(dateObject.getMonth() + 1)}-${zeroAddition(dateObject.getDate())} ${zeroAddition(dateObject.getHours())}:${zeroAddition(dateObject.getMinutes())}:${zeroAddition(dateObject.getSeconds())}`;
  }
  const stringToDate = function (str) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = str.split(" ");
    tempArr1 = tempArr0[0].split("-");
    tempArr2 = tempArr0[1].split(":");
    return new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
  }
  const ABC = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  try {

    const sheetsId = obj.id;
    let rawJson, model, columns, matrix, past;
    let temp;
    let spotQuery, whereQuery;
    let sortStandard, sortStandardIndex, num;

    model = obj.model;
    columns = Object.keys(model);

    spotQuery = {};
    spotQuery[obj.from.where] = true;

    whereQuery = {};
    if (obj.query !== undefined && obj.query !== null) {
      whereQuery = obj.query;
    }

    rawJson = await instance.back.mongoRead(obj.from.collection, whereQuery, spotQuery);

    matrix = [];
    sortStandard = null;
    sortStandardIndex = 0;

    for (let rawObj of rawJson) {
      temp = [];
      num = 0;
      for (let c of columns) {
        if (rawObj[c] instanceof Date) {
          temp.push(dateToString(rawObj[c]));
          sortStandard = c;
          sortStandardIndex = num;
        } else if (Array.isArray(rawObj[c])) {
          temp.push(rawObj[c].join(", "));
        } else {
          temp.push(rawObj[c]);
        }
        num++;
      }
      matrix.push(temp);
    }

    if (sortStandard !== null) {
      matrix.sort((a, b) => { return stringToDate(b[sortStandardIndex]).valueOf() - stringToDate(a[sortStandardIndex]).valueOf(); });
    }

    temp = [];
    for (let c of columns) {
      temp.push(model[c]);
    }
    matrix.unshift(temp);

    past = await sheets.get_value_inPython(sheetsId, "A2:" + ABC[columns.length]);
    await sheets.update_value_inPython(sheetsId, '', matrix, [ 0, 0 ]);
    if (past.length === 0) {
      await sheets.setting_cleanView_inPython(sheetsId);
    }

    slack_bot.chat.postMessage({ text: "디자이너 신청 관련 정보를 시트에 업데이트하였습니다! link : " + "https://docs.google.com/spreadsheets/d/" + sheetsId + "?usp=sharing", channel: "#300_designer" });

  } catch (e) {
    console.log(e);
  }
}

BridgeCloud.prototype.bridgeServer = function (needs) {
  const instance = this;
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker, googleSystem } = this.mother;
  const { filterAll, filterName, filterDate, filterCont, filterNull } = BridgeCloud.clientFilters;
  const [ MONGOC, KAKAO, HUMAN ] = needs;
  const ignorePhone = this.ignorePhone;
  let funcObj = {};

  //GET - ssl test
  funcObj.get_ssl = async function (req, res) {
    try {
      res.set({ "Content-Type": "text/plain" });
      res.send('this is new bridge cloud');
    } catch (e) {
      slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - submit
  funcObj.post_submit = async function (req, res) {
    try {
      //request
      const resultObj = req.body;
      console.log("request get");

      //ban bad data
      const ifOverlap = await instance.back.getClientsByQuery({ phone: filterAll(resultObj.cellphone) }, { withTools: false, selfMongo: MONGOC });
      let pastInfo_boo = false;

      if (/[ㄱ-ㅎㅏ-ㅣ]/g.test(resultObj.pretext) || /[a-zA-Z]/g.test(resultObj.pretext) || resultObj.pretext === '') {

        slack_bot.chat.postMessage({ text: "불량 데이터 확인, 직접 확인해주세요. : " + resultObj.pretext + ' ' + resultObj.cellphone, channel: "#401_consulting" });

      } else {

        let requestObj;
        let requestArr;
        let pastRequests;
        let tempArr;
        let message;
        let thisClientArr, thisClient;

        requestObj = {};

        requestObj["name"] = filterAll(filterName(resultObj["pretext"]));
        requestObj["phone"] = filterAll(resultObj["cellphone"]);
        requestObj["email"] = filterAll(filterNull(resultObj["email"]));

        requestObj["requests.0.request.space.address"] = filterAll(resultObj["dwelling"]);
        requestObj["requests.0.request.family"] = filterAll(resultObj["folk"]);

        tempArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상' ];
        if (tempArr.indexOf(filterAll(resultObj["money"])) !== -1) {
          requestObj["requests.0.request.budget"] = filterAll(resultObj["money"]);
        } else {
          requestObj["requests.0.request.budget"] = "500만원 이하";
        }

        if (Number.isNaN(Number(filterAll(resultObj["area"]).replace(/[^0-9\.]/g, '')))) {
          requestObj["requests.0.request.space.pyeong"] = 0;
        } else {
          requestObj["requests.0.request.space.pyeong"] = Number(filterAll(resultObj["area"]).replace(/[^0-9\.]/g, ''));
        }

        if (filterAll(filterDate(resultObj["movingdate"])) === "거주중") {
          requestObj["requests.0.request.space.resident.living"] = true;
          requestObj["requests.0.request.space.resident.expected"] = new Date();
          requestObj["requests.0.analytics.date.space.movein"] = new Date();
        } else {
          tempArr = filterAll(filterDate(resultObj["movingdate"])).split("-");
          requestObj["requests.0.request.space.resident.living"] = false;
          requestObj["requests.0.request.space.resident.expected"] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          requestObj["requests.0.analytics.date.space.movein"] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
        }

        requestObj["requests.0.request.space.contract"] = filterAll(filterCont(resultObj["myhomeboo"]));

        tempArr = filterAll(resultObj["spotspec"]).split("/");

        if (Number.isNaN(Number(tempArr[0].replace(/[^0-9]/g, '')))) {
          requestObj["requests.0.request.space.spec.room"] = 0;
        } else {
          requestObj["requests.0.request.space.spec.room"] = Number(tempArr[0].replace(/[^0-9]/g, ''));
        }

        if (Number.isNaN(Number(tempArr[1].replace(/[^0-9]/g, '')))) {
          requestObj["requests.0.request.space.spec.bathroom"] = 0;
        } else {
          requestObj["requests.0.request.space.spec.bathroom"] = Number(tempArr[1].replace(/[^0-9]/g, ''));
        }

        if (/없음/gi.test(tempArr[2])) {
          requestObj["requests.0.request.space.spec.valcony"] = false;
        } else {
          requestObj["requests.0.request.space.spec.valcony"] = true;
        }

        requestObj["requests.0.request.etc.comment"] = filterAll(resultObj["description"]);
        requestObj["requests.0.request.etc.channel"] = filterAll(resultObj["wayto"]);

        requestObj["requests.0.request.timeline"] = new Date();

        if (ifOverlap.length > 0) {
          requestArr = [];
          pastRequests = (ifOverlap[0].toNormal()).requests;
          for (let z = 0; z < pastRequests.length; z++) {
            requestArr.push(pastRequests[z]);
          }
          requestArr.unshift(instance.back.returnClientRequest());
          pastInfo_boo = true;

          await instance.back.updateClient([ { cliid: ifOverlap[0].cliid }, { "requests": requestArr } ], { selfMongo: MONGOC });
        }

        //to mongo
        console.log(requestObj);
        if (requestObj["phone"] !== "010-2747-3403") {
          if (!pastInfo_boo) {
            await instance.back.createClient(requestObj, { selfMongo: MONGOC });
          } else {
            await instance.back.updateClient([ { cliid: ifOverlap[0].cliid }, requestObj ], { selfMongo: MONGOC });
          }
        }

        //send slack message
        if (requestObj["phone"] !== "010-2747-3403") {
          thisClientArr = await instance.back.getClientsByQuery({ phone: requestObj["phone"] }, { withTools: true, selfMongo: MONGOC });
          thisClient = thisClientArr[0];

          message = '';
          message += (pastInfo_boo ? "재문의" : "새로운 상담 문의") + "가 왔습니다!\n";
          message += thisClient.toMessage();
        } else {
          message = '';
          message += JSON.stringify(requestObj, null, 2);
        }

        //send alimtalk
        KAKAO.sendTalk("complete", requestObj["name"], requestObj["phone"]);
        message = message + "\n\n" + requestObj["name"] + "님에게 알림톡 전송을 완료하였습니다!";

        //to google
        const toGoogle = {
          "entry.1330142163": requestObj["name"],
          "entry.113799560": requestObj["phone"],
          "entry.2114079722": requestObj["requests.0.request.space.address"],
          "entry.132869049": requestObj["requests.0.request.family"],
          "entry.1481370131": requestObj["email"],
          "entry.795490298": requestObj["requests.0.request.budget"],
          "entry.1040328027": filterAll(resultObj["area"]),
          "entry.2088583577": filterAll(filterDate(resultObj["movingdate"])),
          "entry.2069033904": requestObj["requests.0.request.space.contract"],
          "entry.1127622227": filterAll(resultObj["spotspec"]),
          "entry.462371043": requestObj["requests.0.request.etc.comment"],
          "entry.795957898": requestObj["requests.0.request.etc.channel"],
          "entry.1749939672": requestObj["requests.0.request.timeline"].toUTCString(),
        };
        const { status: googleStatus } = await requestSystem("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfqd1Q-En9K7YbQpknPE3OkqobzCMJaSO9G33W6KRodoE0I8g/formResponse", toGoogle);
        if (googleStatus === 200) {
          message = message + "\n\n" + "구글 설문지로 옮겨졌습니다. 출력해주세요!\nhttps://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit";
        } else {
          message = message + "\n\n" + "구글 설문지로 옮겨지는 과정에서 문제 생김";
        }

        console.log(message);

        // to slack
        if (requestObj["phone"] !== "010-2747-3403") {
          slack_bot.chat.postMessage({ text: message, channel: "#401_consulting" });
        } else {
          slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
        }

      }

      //end
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": instance.frontHost,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("success");

    } catch (e) {
      slack_bot.chat.postMessage({ text: "Bridge 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - designer submit
  funcObj.post_designerSubmit = async function (req, res) {
    try {
      //request
      const resultObj = req.body;
      const dateToString = function (dateObject) {
        const zeroAddition = function (number) {
          if (number < 10) {
            return `0${String(number)}`;
          } else {
            return String(number);
          }
        }
        return `${String(dateObject.getFullYear())}-${zeroAddition(dateObject.getMonth() + 1)}-${zeroAddition(dateObject.getDate())} ${zeroAddition(dateObject.getHours())}:${zeroAddition(dateObject.getMinutes())}:${zeroAddition(dateObject.getSeconds())}`;
      }
      const dictionary = {
        partnership: { name: "partnership", db: "designerPartnershipRaw", kakao: "designerPartnership", opposite: "presentation", oppositeDb: "designerPresentationRaw" },
        presentation: { name: "presentation", db: "designerPresentationRaw", kakao: "designerPresentation", opposite: "partnership", oppositeDb: "designerPartnershipRaw" }
      };
      const stringToDate = function (str) {
        let temp;
        temp = str.split("-");
        if (temp.length === 3) {
          return new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
        } else {
          return new Date(1800, 0, 1);
        }
      }
      const stringToCareer = function (str) {
        let temp;
        temp = str.split(" ");
        if (temp.length === 2) {
          return { year: Number(temp[0].replace(/[^0-9]/g, '')), month: Number(temp[1].replace(/[^0-9]/g, '')) };
        } else {
          return { year: 0, month: 0 };
        }
      }
      const wordingToDate = function (str) {
        if (str === "기타") {
          return new Date(1800, 0, 1);
        } else {
          const today = new Date();
          let temp;
          temp = str.split(" ");
          if (temp.length >= 4) {
            return new Date(today.getFullYear(), Number(temp[0].replace(/[^0-9]/g, '')) - 1, Number(temp[1].replace(/[^0-9]/g, '')), Number(temp[3].replace(/[^0-9]/g, '')));
          } else {
            return new Date(1800, 0, 1);
          }
        }
      }
      const calendar = googleSystem("calendar");

      let filteredObj, message;
      let tempArr;
      let tempArr0, tempArr1, tempArr2;
      let already, oppositeExist;
      let whereQuery, updateQuery;
      let tempAspirants, tempAspirant;

      console.log("request get");

      filteredObj = {};
      for (let i in resultObj) {
        if (i !== "mode") {
          filteredObj[i] = resultObj[i].replace(/[ㄱ-ㅎㅏ-ㅣ\#\$\%\^\&\*\+\`\=\[\]\{\}\\\|\"\'\;\<\>]/gi, '').replace(/\t/g, ' ').replace(/  /g, ' ').replace(/__space__/g, '\n').trim();
        }
      }

      //date parsing
      filteredObj.date = new Date();

      //address parsing
      if (filteredObj.address !== undefined && filteredObj.detailAddress !== undefined) {
        filteredObj.address = filteredObj.address + " " + filteredObj.detailAddress;
        delete filteredObj.detailAddress;
      }

      //channel parsing
      filteredObj.webChannel = [];
      filteredObj.snsChannel = [];
      filteredObj.cloudChannel = [];
      if (filteredObj.channel !== undefined) {
        tempArr = filteredObj.channel.split("__input__");
        tempArr0 = tempArr[0].split("__split__");
        tempArr1 = tempArr[1].split("__split__");
        tempArr2 = tempArr[2].split("__split__");

        if (tempArr0.length === 1 && tempArr0[0] === '') {
          filteredObj.webChannel = [];
        } else {
          filteredObj.webChannel = tempArr0;
        }

        if (tempArr1.length === 1 && tempArr1[0] === '') {
          filteredObj.snsChannel = [];
        } else {
          filteredObj.snsChannel = tempArr1;
        }

        if (tempArr2.length === 1 && tempArr2[0] === '') {
          filteredObj.cloudChannel = [];
        } else {
          filteredObj.cloudChannel = tempArr2;
        }

        delete filteredObj.channel;
      }

      console.log(filteredObj);

      if (resultObj.mode === "partnership") {

        filteredObj.status = "조정 필요";
        filteredObj.meetingTime = "기타";

        message = "새로운 디자이너 파트너십 신청서가 도착했습니다! \n";
        message += "문의일 : " + dateToString(filteredObj.date) + "\n";
        message += "성함 : " + filteredObj.designer + "\n";
        message += "연락처 : " + filteredObj.phone + "\n";
        message += "이메일 : " + filteredObj.email + "\n";
        message += "주소 : " + filteredObj.address + "\n";
        message += "사업자 분류 : " + filteredObj.classification + "\n";
        message += "회사명 : " + filteredObj.company + "\n";
        message += "사업자 등록번호 : " + filteredObj.businessNumber + "\n";
        message += "개업일 : " + filteredObj.startDate + "\n";
        message += "대표자 성함 : " + filteredObj.representative + "\n";
        message += "은행명 : " + filteredObj.bankName + "\n";
        message += "계좌번호 : " + filteredObj.bankAccount + "\n";
        message += "예금주 : " + filteredObj.bankTo + "\n";
        message += "기타 사항 : " + filteredObj.bankEtc + "\n";
        message += "인테리어 경력 : " + filteredObj.interiorCareer + "\n";
        message += "스타일링 경력 : " + filteredObj.stylingCareer + "\n";
        message += "경력 상세 : " + filteredObj.careerDetail + "\n";
        message += "홈페이지 : " + (filteredObj.webChannel.length > 0 ? filteredObj.webChannel.join(", ") : filteredObj.webChannel) + "\n";
        message += "SNS 채널 : " + (filteredObj.snsChannel.length > 0 ? filteredObj.snsChannel.join(", ") : filteredObj.snsChannel) + "\n";
        message += "클라우드 : " + (filteredObj.cloudChannel.length > 0 ? filteredObj.cloudChannel.join(", ") : filteredObj.cloudChannel) + "\n";
        message += "유입 경로 : " + filteredObj.comeFrom;

      } else if (resultObj.mode === "presentation") {

        if (filteredObj.presentationTimes !== "기타") {
          filteredObj.status = "미팅 대기";
        } else {
          filteredObj.status = "조정 필요";
        }

        message = "새로운 디자이너 설명회 참여 신청서가 도착했습니다!\n";
        message += "문의일 : " + dateToString(filteredObj.date) + "\n";
        message += "성함 : " + filteredObj.designer + "\n";
        message += "연락처 : " + filteredObj.phone + "\n";
        message += "이메일 : " + filteredObj.email + "\n";
        message += "주소 : " + filteredObj.address + "\n";
        message += "설명회 신청 시간 : " + filteredObj.presentationTimes + "\n";
        message += "홈페이지 : " + (filteredObj.webChannel.length > 0 ? filteredObj.webChannel.join(", ") : filteredObj.webChannel) + "\n";
        message += "SNS 채널 : " + (filteredObj.snsChannel.length > 0 ? filteredObj.snsChannel.join(", ") : filteredObj.snsChannel) + "\n";
        message += "클라우드 : " + (filteredObj.cloudChannel.length > 0 ? filteredObj.cloudChannel.join(", ") : filteredObj.cloudChannel) + "\n";
        message += "유입 경로 : " + filteredObj.comeFrom;

      } else if (resultObj.mode === "portfolio") {

        message = filteredObj.designer + " 디자이너님이 추가 포트폴리오를 전송하셨습니다!";

      }

      if (resultObj.mode !== "portfolio") {

        KAKAO.sendTalk(dictionary[resultObj.mode].kakao, filteredObj["designer"], filteredObj["phone"]);

        whereQuery = { phone: filteredObj["phone"] };
        already = await instance.back.getAspirantsByQuery(whereQuery);

        updateQuery = {};
        if (resultObj.mode === "partnership") {

          updateQuery["designer"] = filteredObj.designer;
          updateQuery["phone"] = filteredObj.phone;
          updateQuery["email"] = filteredObj.email;
          updateQuery["address"] = filteredObj.address;

          updateQuery["submit.partnership.date"] = new Date();
          updateQuery["submit.partnership.boo"] = true;
          updateQuery["submit.comeFrom"] = filteredObj.comeFrom;

          updateQuery["information.company.classification"] = filteredObj.classification;
          updateQuery["information.company.name"] = filteredObj.company;
          updateQuery["information.company.businessNumber"] = filteredObj.businessNumber;
          updateQuery["information.company.start"] = stringToDate(filteredObj.startDate);
          updateQuery["information.company.representative"] = filteredObj.representative;

          updateQuery["information.account.bank"] = filteredObj.bankName;
          updateQuery["information.account.number"] = filteredObj.bankAccount;
          updateQuery["information.account.to"] = filteredObj.bankTo;
          updateQuery["information.account.etc"] = filteredObj.bankEtc;

          updateQuery["information.career.interior"] = stringToCareer(filteredObj.interiorCareer);
          updateQuery["information.career.styling"] = stringToCareer(filteredObj.stylingCareer);
          updateQuery["information.career.detail"] = filteredObj.careerDetail;

          if (already.length === 0) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;

            updateQuery["meeting.status"] = filteredObj.status;
            updateQuery["meeting.date"] = new Date(1800, 0, 1);
            updateQuery["submit.firstRequest.date"] = new Date();
            updateQuery["submit.firstRequest.method"] = "partnership";
            if (!ignorePhone.includes(filteredObj.phone)) {
              await instance.back.createAspirant(updateQuery);
            } else {
              console.log(updateQuery);
            }
          } else {
            if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
              updateQuery["information.channel.web"] = filteredObj.webChannel;
            }
            if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
              updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            }
            if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
              updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
            }
            if (!ignorePhone.includes(filteredObj.phone)) {
              await instance.back.updateAspirant([ whereQuery, updateQuery ]);
            } else {
              console.log([ whereQuery, updateQuery ]);
            }
          }

        } else {

          updateQuery["designer"] = filteredObj.designer;
          updateQuery["phone"] = filteredObj.phone;
          updateQuery["email"] = filteredObj.email;
          updateQuery["address"] = filteredObj.address;

          updateQuery["submit.presentation.date"] = new Date();
          updateQuery["submit.presentation.boo"] = true;
          updateQuery["submit.comeFrom"] = filteredObj.comeFrom;

          if (already.length === 0) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;

            updateQuery["meeting.status"] = filteredObj.status;
            updateQuery["meeting.date"] = wordingToDate(filteredObj.presentationTimes);
            updateQuery["submit.firstRequest.date"] = new Date();
            updateQuery["submit.firstRequest.method"] = "presentation";
            if (!ignorePhone.includes(filteredObj.phone)) {
              await instance.back.createAspirant(updateQuery);
            } else {
              console.log(updateQuery);
            }
          } else {
            if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
              updateQuery["information.channel.web"] = filteredObj.webChannel;
            }
            if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
              updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            }
            if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
              updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
            }
            if (filteredObj.presentationTimes !== "기타") {
              updateQuery["meeting.status"] = filteredObj.status;
              updateQuery["meeting.date"] = wordingToDate(filteredObj.presentationTimes);
            }
            if (!ignorePhone.includes(filteredObj.phone)) {
              await instance.back.updateAspirant([ whereQuery, updateQuery ]);
            } else {
              console.log([ whereQuery, updateQuery ]);
            }
          }
        }

        if (!ignorePhone.includes(filteredObj.phone)) {
          slack_bot.chat.postMessage({ text: message, channel: "#300_designer" });

          tempAspirants = await instance.back.getAspirantsByQuery(whereQuery);

          if (tempAspirants.length > 0) {
            tempAspirant = tempAspirants[0];
            if (tempAspirant.meeting.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
              if (tempAspirant.calendar.id !== "") {
                calendar.updateSchedule(tempAspirant.calendar.mother, tempAspirant.calendar.id, { start: tempAspirant.meeting.date });
              } else {
                calendar.makeSchedule(tempAspirant.calendar.mother, tempAspirant.designer + " 디자이너 사전 미팅", "", tempAspirant.meeting.date).then(function (res) {
                  instance.back.updateAspirant([ whereQuery, { "calendar.id": res.eventId } ]);
                }).catch(function (e) {
                  console.log(e);
                });
              }
            }
          }

        } else {
          slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
        }

      } else if (resultObj.mode === "portfolio") {

        whereQuery = { phone: filteredObj["phone"] };
        already = await instance.back.getAspirantsByQuery(whereQuery);

        updateQuery = {};

        if (already.length > 0) {
          if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
          }
          if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
          }
          if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
          }
          if (!ignorePhone.includes(filteredObj.phone)) {
            await instance.back.updateAspirant([ whereQuery, updateQuery ]);
          } else {
            console.log([ whereQuery, updateQuery ]);
          }
        }

        if (!ignorePhone.includes(filteredObj.phone)) {
          slack_bot.chat.postMessage({ text: message, channel: "#300_designer" });
        } else {
          slack_bot.chat.postMessage({ text: message, channel: "#error_log" });
        }

      }

      //end
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": instance.frontHost,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("success");

    } catch (e) {
      slack_bot.chat.postMessage({ text: "Bridge 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - name phone check
  funcObj.post_namephone = async function (req, res) {
    try {
      const resultObj = req.body;
      const rows = await instance.back.getClientsByQuery({ phone: filterAll(resultObj.phone) }, { withTools: false, selfMongo: MONGOC });
      let boo = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].name === resultObj.name) {
          boo = true;
        }
      }

      if (boo === false && resultObj.name === "배창규" && resultObj.phone === "010-2747-3403") {
        boo = true;
      }

      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": instance.frontHost,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      if (boo) {
        res.send("success");
      } else {
        res.send("failure");
      }

    } catch (e) {
      slack_bot.chat.postMessage({ text: "Bridge 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - binary files
  funcObj.post_binary = async function (req, res) {
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        let filesKeys = Object.keys(files);
        if (!err && filesKeys.length > 0) {
          const { name, phone } = fields;
          const cilentFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + phone.replace(/\-/g, '');
          const uploadMap = {
            upload0: "sitePhoto",
            upload1: "preferredPhoto"
          };
          let list = [];
          for (let i = 0; i < filesKeys.length; i++) {
            list.push(uploadMap[filesKeys[i]]);
          }

          const binaryFolder = instance.dir + "/binary";
          const binrayFolderTest = new RegExp(cilentFolderName, 'g');
          const binaryFolderDetail = await fileSystem(`readDir`, [ binaryFolder ]);
          let binrayFolderBoo = false;

          let fileTong = {};
          for (let i of list) {
            fileTong[i] = [];
          }

          //client folder make
          for (let i of binaryFolderDetail) { if (binrayFolderTest.test(i)) {
            binrayFolderBoo = true;
          }}
          if (!binrayFolderBoo) {
            shell.exec(`mkdir ${shellLink(binaryFolder + '/' + cilentFolderName)}`);
            for (let i = 0; i < list.length; i++) {
              shell.exec(`mkdir ${shellLink(binaryFolder + '/' + cilentFolderName + '/' + list[i])}`);
            }
          }

          //move and fileTong make
          for (let i = 0; i < list.length; i++) {
            if (Array.isArray(files[filesKeys[i]])) {
              for (let j of files[filesKeys[i]]) {
                shell.exec(`mv ${shellLink(j.path)} ${shellLink(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + j.name)};`);
                fileTong[list[i]].push(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + j.name);
              }
            } else {
              shell.exec(`mv ${shellLink(files[filesKeys[i]].path)} ${shellLink(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + files[filesKeys[i]].name)};`);
              fileTong[list[i]].push(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + files[filesKeys[i]].name);
            }
          }

          //parsing cliid
          let clientRows, cliid;
          if (phone !== "010-2747-3403") {
            clientRows = await instance.back.getClientsByQuery({ phone: phone }, { withTools: false, selfMongo: MONGOC });
          } else {
            clientRows = [ { cliid: "테스트" } ];
          }
          if (clientRows.length === 0) {
            cliid = "아이디 알 수 없음";
          } else if (phone !== "010-2747-3403") {
            cliid = clientRows[0].cliid;
            if (clientRows[0].requests[0].analytics.response.status === "드랍") {
              await instance.back.updateClient([ { cliid: clientRows[0].cliid }, { "requests.0.analytics.response.status": "응대중" } ], { selfMongo: MONGOC });
            }
          } else if (phone === "010-2747-3403") {
            cliid = "테스트";
          }

          //upload google drive
          instance.bridgeToGoogle({ tong: fileTong, name: name, phone: phone, mode: "client", cliid: cliid, folder: cilentFolderName });

          //kakao and slack
          KAKAO.sendTalk("photo", name, phone);
          slack_bot.chat.postMessage({ text: name + "님이 파일 전송을 시도중입니다!", channel: "#401_consulting" });

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": instance.frontHost,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send('success');

        } else {
          slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + err, channel: "#error_log" });
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": instance.frontHost,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send('error');
        }
      });
    } catch (e) {
      slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - designer portfolio binary
  funcObj.post_designerBinary = async function (req, res) {
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        let filesKeys = Object.keys(files);
        const { designer, phone } = fields;
        if (!err && filesKeys.length > 0) {
          const designerFolderName = ("date" + todayMaker("total")) + '_' + designer + '_' + phone.replace(/\-/g, '');
          let list = [];
          for (let i = 0; i < filesKeys.length; i++) {
            list.push(filesKeys[i]);
          }

          const binaryFolder = instance.dir + "/binary";
          const binrayFolderTest = new RegExp(designerFolderName, 'g');
          const binaryFolderDetail = await fileSystem(`readDir`, [ binaryFolder ]);
          let binrayFolderBoo = false;

          let fileTong = {};
          for (let i of list) {
            fileTong[i] = [];
          }

          //designer folder make
          for (let i of binaryFolderDetail) { if (binrayFolderTest.test(i)) {
            binrayFolderBoo = true;
          }}
          if (!binrayFolderBoo) {
            shell.exec(`mkdir ${shellLink(binaryFolder + '/' + designerFolderName)}`);
            for (let i = 0; i < list.length; i++) {
              shell.exec(`mkdir ${shellLink(binaryFolder + '/' + designerFolderName + '/' + list[i])}`);
            }
          }

          //move and fileTong make
          for (let i = 0; i < list.length; i++) {
            if (Array.isArray(files[filesKeys[i]])) {
              for (let j of files[filesKeys[i]]) {
                shell.exec(`mv ${shellLink(j.path)} ${shellLink(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + j.name)};`);
                fileTong[list[i]].push(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + j.name);
              }
            } else {
              shell.exec(`mv ${shellLink(files[filesKeys[i]].path)} ${shellLink(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + files[filesKeys[i]].name)};`);
              fileTong[list[i]].push(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + files[filesKeys[i]].name);
            }
          }

          //upload google drive
          instance.bridgeToGoogle({ name: designer, phone: phone, tong: fileTong, folder: designerFolderName, mode: "designer" });

          //kakao and slack
          // KAKAO.sendTalk("photo", designer, phone);
          slack_bot.chat.postMessage({ text: designer + "님이 파일 전송을 시도중입니다!", channel: "#300_designer" });

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": instance.frontHost,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send('success');

        } else {
          if (designer !== undefined && designer !== null && phone !== undefined && phone !== null) {
            KAKAO.sendTalk("portfolioFail", designer, phone);
          }
          slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + err, channel: "#error_log" });
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": instance.frontHost,
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
          });
          res.send('error');
        }
      });
    } catch (e) {
      slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //POST - certification
  funcObj.post_certification = async function (req, res) {
    try {
      const requestObj = req.body;
      await HUMAN.sendSms({
        name: requestObj["name"],
        phone: requestObj["phone"],
        subject: "휴대폰 인증",
        contents: "[홈리에종] 안녕하세요! " + requestObj["name"] + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + requestObj["certification"] + "\n\n인증번호를 팝업창에 입력해주세요!"
      });
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": instance.frontHost,
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("success");
    } catch (e) {
      slack_bot.chat.postMessage({ text: "Bridge 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }

  //end : set router
  let resultObj = { get: [], post: [] };
  for (let i in funcObj) {
    resultObj[i.split('_')[0]].push({ link: "/" + i.split('_')[1], func: funcObj[i] });
  }
  return resultObj;
}

BridgeCloud.prototype.serverLaunching = async function (toss = false) {
  const instance = this;
  const https = require("https");
  const { shell, shellLink, fileSystem, mongo, bridgeinfo, mongoinfo } = this.mother;
  const { parse } = require("url");
  const express = require("express");
  const bodyParser = require("body-parser");
  const useragent = require("express-useragent");
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);

  //express
  const app = express();
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //set needs
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const kakaoInstance = new KakaoTalk();
  const humanInstance = new HumanPacket();

  try {
    await MONGOC.connect();
    await kakaoInstance.ready();

    //set binary folder
    let thisDirList, thisDirBoo;
    thisDirList = await fileSystem(`readDir`, [ this.dir ]);
    thisDirBoo = true;
    for (let i = 0; i < thisDirList.length; i++) {
      if (thisDirList[i] === `binary`) {
        thisDirBoo = false;
      }
    }
    if (thisDirBoo) {
      shell.exec(`mkdir ${shellLink(this.dir)}/binary`);
    }

    //set pem key
    let pems = {};
    let pemsLink = process.cwd() + "/pems/" + this.cloudHost.outer;
    let certDir, keyDir, caDir;

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;

    //set router
    const { get, post } = this.bridgeServer([ MONGOC, kakaoInstance, humanInstance ]);
    for (let obj of get) { app.get(obj.link, obj.func); }
    for (let obj of post) { app.post(obj.link, obj.func); }

    //server on
    https.createServer(pems, app).listen(this.cloudHost.port, this.cloudHost.inner, () => {
      console.log(`Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

module.exports = BridgeCloud;
