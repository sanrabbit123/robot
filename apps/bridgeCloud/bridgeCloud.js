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

  this.formidable = require('formidable');
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
    if (String(som) === "거주중") {
      return "거주중";
    }
    let str = String(som).replace(/[^0-9]/g, '');
    if (str.length > 4) {
      if (/^20[0-9][0-9]/.test(str)) {
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
        }
      } else {
        return String(som);
      }
    } else {
      return str.replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, '').replace(/\t/g, '').replace(/  /g, '').replace(/ /g, '').replace(/ /g, '');
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

BridgeCloud.makeId = function (past_id) {
  let this_id;
  let today = new Date();
  let to_year = today.getFullYear();
  let to_month = today.getMonth();
  let st_year = String(to_year).slice(2);
  let st_month;
  if (to_month + 1 < 10) {
    st_month = '0' + String(to_month + 1);
  } else {
    st_month = String(to_month + 1);
  }
  let new_id = '';
  if (past_id.slice(3, 5) === st_month) {
    if (Number(past_id.slice(8, 10)) + 1 < 10) {
      new_id = '0' + String(Number(past_id.slice(8, 10)) + 1);
    } else {
      new_id = String(Number(past_id.slice(8, 10)) + 1);
    }
  } else {
    new_id = '01';
  }
  this_id = 'c' + st_year + st_month + '_' + "aa" + new_id + 's';
  return this_id;
}

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
    const targetFolder = '1zB5SdQ1PLoE37870wlSBWk01AJvXwSRo';
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

    if (obj.mode === "client") {
      message = obj.name + "(" + obj.cliid + ") 고객님의 파일 전송을 완료하였습니다!\n";
      message += "console : " + "https://" + instance.address.backinfo.host + "/client?cliid=" + obj.cliid + "\n";
      message += "drive : " + "https://drive.google.com/drive/folders/" + folderId + "?usp=sharing";
      slack_bot.chat.postMessage({ text: message, channel: "#401_consulting" });
    } else if (obj.mode === "designer") {
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
  const ABC = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  try {

    const sheetsId = obj.id;
    let rawJson, model, columns, matrix, past;
    let temp;
    let spotQuery, whereQuery;

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

    for (let rawObj of rawJson) {
      temp = [];
      for (let c of columns) {
        if (rawObj[c] instanceof Date) {
          temp.push(dateToString(rawObj[c]));
        } else {
          temp.push(rawObj[c]);
        }
      }
      matrix.push(temp);
    }

    past = await sheets.get_value_inPython(sheetsId, "A2:" + ABC[columns.length]);

    temp = [];
    for (let c of columns) {
      temp.push(model[c]);
    }
    matrix.unshift(temp);

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
  const { fileSystem, requestSystem, shell, slack_bot, shellLink, todayMaker } = this.mother;
  const { filterAll, filterName, filterDate, filterCont, filterNull } = BridgeCloud.clientFilters;
  const [ MONGOC, KAKAO ] = needs;
  let funcObj = {};

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
          requestArr.unshift({
            request: {
              timeline: new Date(1800, 0, 1),
              notionId: "",
              budget: "알 수 없음",
              family: "",
              space: {
                address: "",
                contract: "알 수 없음",
                pyeong: 0,
                spec: {
                  room: 0,
                  bathroom: 0,
                  valcony: false
                },
                resident: {
                  living: false,
                  expected: new Date(1800, 0, 1),
                },
              },
              etc: {
                comment: "",
                channel: "",
              },
            },
            analytics: {
              googleAnalytics: {
                timeline: new Date(1800, 0, 1),
                userType: "",
                referrer: {
                  name: "",
                  detail: {
                    host: null,
                    queryString: {},
                  },
                },
                device: {
                  type: "",
                  os: "",
                  mobileDevice: "",
                },
                region: {
                  country: "",
                  city: "",
                  latitude: 0,
                  longitude: 0,
                },
                personalInfo: {
                  age: null,
                  gender: null
                },
                campaign: "",
                history: [],
              },
              response: {
                status: "응대중",
                outreason: [],
              },
              date: {
                callHistory: [],
                space: {
                  precheck: new Date(1800, 0, 1),
                  empty: new Date(1800, 0, 1),
                  movein: new Date(1800, 0, 1),
                },
              },
              picture: {
                space: false,
                prefer: false,
              },
            },
            proposal: {
              proid: "",
            },
          });
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

        //to notion
        if (requestObj["phone"] !== "010-2747-3403") {
          if (!pastInfo_boo) {
            if (thisClient !== undefined) {
              const { status: notionStatus } = await requestSystem("http://" + instance.address.pythoninfo.host + ":3000/toNotion", { cliid: thisClient.cliid });
              if (notionStatus !== 200) {
                message = message + "\n\n" + "노션으로 옮겨지는 과정에서 문제 생김";
              }
            } else {
              message = message + "\n\n" + "노션으로 옮겨지는 과정에서 문제 생김";
            }
          }
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
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
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
      let filteredObj, message;
      console.log("request get");

      filteredObj = {};
      for (let i in resultObj) {
        if (i !== "mode") {
          filteredObj[i] = resultObj[i].replace(/[ㄱ-ㅎㅏ-ㅣ\#\$\%\^\&\*\+\`\=\[\]\{\}\\\|\/\"\'\:\;\<\>]/gi, '').replace(/\t/g, ' ').replace(/  /g, ' ').replace(/__space__/g, '\n').trim();
        }
      }
      filteredObj.date = new Date();
      filteredObj.address = filteredObj.address + " " + filteredObj.detailAddress;
      delete filteredObj.detailAddress;

      console.log(filteredObj);

      if (resultObj.mode === "partnership") {

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
        message += "유입 경로 : " + filteredObj.comeFrom;

        KAKAO.sendTalk("designerPartnership", filteredObj["designer"], filteredObj["phone"]);
        slack_bot.chat.postMessage({ text: message, channel: "#300_designer" });
        await instance.back.mongoCreate("designerPartnershipRaw", filteredObj, { local: true });

        instance.bridgeToSheets({
          id: "1gr_Sm_Wdhl2BuRY809gyw_XrlDgL6nErDS4enI-CajU",
          model: {
            date: '문의일',
            designer: '성함',
            phone: '연락처',
            address: '주소',
            email: '이메일',
            classification: '사업자 분류',
            company: '회사명',
            businessNumber: '사업자 등록번호',
            startDate: '개업일',
            representative: '대표자 성함',
            bankName: '은행명',
            bankAccount: '계좌번호',
            bankTo: '수신자',
            bankEtc: '기타 사항',
            interiorCareer: '인테리어 경력',
            stylingCareer: '스타일링 경력',
            careerDetail: '경력 상세',
            comeFrom: '유입 경로',
          },
          query: null,
          from: {
            where: "local",
            collection: "designerPartnershipRaw"
          }
        });

      } else {

        message = "새로운 디자이너 설명회 참여 신청서가 도착했습니다!\n";
        message += "문의일 : " + dateToString(filteredObj.date) + "\n";
        message += "성함 : " + filteredObj.designer + "\n";
        message += "연락처 : " + filteredObj.phone + "\n";
        message += "이메일 : " + filteredObj.email + "\n";
        message += "주소 : " + filteredObj.address + "\n";
        message += "설명회 신청 시간 : " + filteredObj.presentationTimes + "\n";
        message += "유입 경로 : " + filteredObj.comeFrom;

        KAKAO.sendTalk("designerPresentation", filteredObj["designer"], filteredObj["phone"]);
        slack_bot.chat.postMessage({ text: message, channel: "#300_designer" });
        await instance.back.mongoCreate("designerPresentationRaw", filteredObj, { local: true });

        instance.bridgeToSheets({
          id: "1TAHieFFOJRnOoZL4tN-Y9eXHtpPa8f3foPtlC3SY-nU",
          model: {
            date: '문의일',
            designer: '성함',
            phone: '연락처',
            address: '주소',
            email: '이메일',
            presentationTimes: '신청 시간',
            comeFrom: '유입 경로',
          },
          query: null,
          from: {
            where: "local",
            collection: "designerPresentationRaw"
          }
        });

      }

      //end
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
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
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
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
          const cilentFolderName = ('mdh' + todayMaker()) + '_' + name + '_' + phone.replace(/\-/g, '');
          const uploadMap = {
            upload0: "sitePhoto",
            upload1: "preferredPhoto"
          };
          let list = [];
          for (let i = 0; i < filesKeys.length; i++) { list.push(uploadMap[filesKeys[i]]); }

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
          instance.bridgeToGoogle({ tong: fileTong, name: name, mode: "client", cliid: cliid, folder: cilentFolderName });

          //kakao and slack
          KAKAO.sendTalk("photo", name, phone);
          slack_bot.chat.postMessage({ text: name + "님이 파일 전송을 시도중입니다!", channel: "#401_consulting" });

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });
          res.send('success');

        } else {
          slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + err, channel: "#error_log" });
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
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
        if (!err && filesKeys.length > 0) {
          const { designer, phone } = fields;
          const designerFolderName = ('mdh' + todayMaker()) + '_' + designer + '_' + phone.replace(/\-/g, '');
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
          instance.bridgeToGoogle({ tong: fileTong, folder: designerFolderName, mode: "designer" });

          //kakao and slack
          // KAKAO.sendTalk("photo", designer, phone);
          slack_bot.chat.postMessage({ text: designer + "님이 파일 전송을 시도중입니다!", channel: "#300_designer" });

          //end
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
          });
          res.send('success');

        } else {
          slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + err, channel: "#error_log" });
          res.set({
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": '*',
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
      const resultObj = req.body;
      await KAKAO.sendTalk("certification", requestObj["name"], requestObj["phone"], requestObj["certification"]);
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
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

  //express
  const app = express();
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //set needs
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const kakaoInstance = new KakaoTalk();

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
    const { get, post } = this.bridgeServer([ MONGOC, kakaoInstance ]);
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
