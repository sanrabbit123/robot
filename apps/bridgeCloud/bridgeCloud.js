const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const BridgeCloud = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/bridgeCloud";
  this.cloudHost = { inner: this.address.bridgeinfo.ip.inner, outer: this.mother.bridgeinfoObj.host, port: 3000 };
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

BridgeCloud.prototype.bridgeToOffice = async function (obj, option = { selfMongo: null }) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { shell, shellLink, ghostRequest, requestSystem, generalFileUpload, messageLog, errorLog, messageSend } = this.mother;
  try {
    const { tong, folder } = obj;
    const binaryFolder = instance.dir + "/binary";
    let tongKeys = Object.keys(tong);
    let fromArr, toArr;
    let message = "";
    let already, updatePortfolio;
    let client, designer;

    fromArr = [];
    toArr = [];
    for (let i = 0; i < tongKeys.length; i++) {
      for (let j of tong[tongKeys[i]]) {
        fromArr.push(j);
        if (obj.mode === "client") {
          toArr.push(address.officeinfo.ghost.file.client + j.replace((new RegExp('^' + binaryFolder)), ''));
        } else {
          toArr.push(address.officeinfo.ghost.file.designer + j.replace((new RegExp('^' + binaryFolder)), ''));
        }
      }
    }
    await generalFileUpload(address.officeinfo.ghost.protocol + "://" + address.officeinfo.ghost.host + ":" + String(address.officeinfo.ghost.port) + "/fileUpload", fromArr, toArr);

    if (obj.mode === "client") {
      if (obj.cliid === "테스트") {
        obj.cliid = "c1801_aa01s";
      }
      message = obj.name + "(" + obj.cliid + ") 고객님의 파일 전송을 완료하였습니다!\n";
      await messageSend({ text: message, channel: "#401_consulting" });

      back.getClientById(obj.cliid, option).then((data) => {
        if (data === null) {
          throw new Error("invaild cliid");
        } else {
          client = data;
        }
        return back.updateClient([ { cliid: obj.cliid }, { "requests.0.analytics.picture.space.boo": true, "requests.0.analytics.picture.prefer.boo": true } ], option);
      }).then(() => {
        return requestSystem("https://" + instance.address.backinfo.host + ":3000/updateLog", {
          id: obj.cliid,
          column: "spacePicture",
          position: "requests.0.analytics.picture.space.boo",
          pastValue: client.requests[0].analytics.picture.space.boo,
          finalValue: true
        }, { headers: { "origin": "https://" + instance.address.bridgeinfo.host, "Content-Type": "application/json" } });
      }).then(() => {
        return ghostRequest("/voice", { text: obj.name + " 고객님의 새로운 파일이 전송되었어요!" });
      }).catch((err) => {
        console.log(err);
        errorLog("파일 서버 문제 생김 (bridgeToOffice) : " + err.message).catch((e) => { console.log(e); });
      });

    } else if (obj.mode === "designer") {
      already = await instance.back.getAspirantsByQuery({ phone: obj.phone });

      if (already.length > 0) {
        updatePortfolio = already[0].portfolio;
        updatePortfolio.unshift({
          date: new Date(),
          confirm: [],
          folderId: ""
        });
        await instance.back.updateAspirant([
          { phone: obj.phone },
          { portfolio: updatePortfolio }
        ]);
      }

      message = obj.name + " 디자이너 신청자의 파일 전송을 완료하였습니다!";
      await messageSend({ text: message, channel: "#300_designer" });
      ghostRequest("/voice", { text: message }).catch((err) => { console.log(err); });
    }

    shell.exec(`rm -rf ${shellLink(this.dir + "/binary/" + folder)}`);
  } catch (e) {
    await errorLog("파일 서버 문제 생김 (bridgeToOffice) : " + e.message);
  }
}

BridgeCloud.prototype.bridgeToSheets = async function (obj) {
  const instance = this;
  const { shell, shellLink, messageSend } = this.mother;
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const sheets = new GoogleSheet();
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

    await messageSend({ text: "디자이너 신청 관련 정보를 시트에 업데이트하였습니다! link : " + "https://docs.google.com/spreadsheets/d/" + sheetsId + "?usp=sharing", channel: "#300_designer" });

  } catch (e) {
    console.log(e);
  }
}

BridgeCloud.prototype.parsingAddress = async function (id, rawString, MONGOC) {
  if (typeof id !== "string" || typeof rawString !== "string" || MONGOC === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const app = new AddressParser();
  const back = this.back;
  const { messageSend, errorLog } = this.mother;
  try {
    let arr;

    //client
    if (/^c/gi.test(id)) {
      arr = await app.addressInspection([ { id, address: rawString } ]);
      if (arr.length === 0) {
        return { result: true, id };
      } else {
        const res = await app.getAddress(rawString);
        if (res === null) {
          return { result: false, id };
        } else {
          const { address: { road } } = res;
          await back.updateClient([ { cliid: id }, { "requests.0.request.space.address": (road + " " + rawString) } ], { selfMongo: MONGOC });
          return { result: true, id };
        }
      }
    }
  } catch (e) {
    await errorLog("주소 연산 중 오류 생김 (parsingAddress): " + e.message);
    console.log(e);
  }
}

BridgeCloud.prototype.bridgeServer = function (needs) {
  const instance = this;
  const { fileSystem, requestSystem, shell, shellLink, todayMaker, ghostRequest, headRequest, sleep, statusReading, equalJson, messageSend, errorLog } = this.mother;
  const GoogleCalendar = require(process.cwd() + "/apps/googleAPIs/googleCalendar.js");
  const { filterAll, filterName, filterDate, filterCont, filterNull } = BridgeCloud.clientFilters;
  const [ MONGOC, MONGOLOCALC, KAKAO, HUMAN, ADDRESS ] = needs;
  const ignorePhone = this.ignorePhone;
  let funcObj = {};

  //GET - ssl test
  funcObj.get_ssl = async function (req, res) {
    res.set({ "Content-Type": "text/plain" });
    try {
      statusReading().catch((err) => {
        console.log(err);
      });
      res.send("this is new bridge cloud");
    } catch (e) {
      await errorLog("bridge 서버 문제 생김 (get_ssl): " + e.message);
      res.send("error : " + e.message);
    }
  }

  //GET - ip
  funcObj.get_ip = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      await errorLog("bridge 서버 문제 생김 (get_ip): " + e.message);
      res.send("error : " + e.message);
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

        await messageSend({ text: "불량 데이터 확인, 직접 확인해주세요. : " + resultObj.pretext + ' ' + resultObj.cellphone, channel: "#401_consulting" });

      } else {

        let requestObj;
        let requestArr;
        let pastRequests;
        let tempArr;
        let message;
        let thisClientArr, thisClient;
        let defaultPyeong;
        let cliid;
        let future;

        defaultPyeong = 34;

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
          requestObj["requests.0.request.space.pyeong"] = defaultPyeong;
        } else {
          if (Number(filterAll(resultObj["area"]).replace(/[^0-9\.]/g, '')) === 0) {
            requestObj["requests.0.request.space.pyeong"] = defaultPyeong;
          } else {
            requestObj["requests.0.request.space.pyeong"] = Number(filterAll(resultObj["area"]).replace(/[^0-9\.]/g, ''));
          }
        }

        if (filterAll(filterDate(resultObj["movingdate"])) === "거주중") {
          requestObj["requests.0.request.space.resident.living"] = true;
          requestObj["requests.0.request.space.resident.expected"] = new Date();
          future = new Date();
          future.setDate(future.getDate() + 60);
          requestObj["requests.0.analytics.date.space.movein"] = future;
        } else {
          tempArr = filterAll(filterDate(resultObj["movingdate"])).split("-");
          requestObj["requests.0.request.space.resident.living"] = false;
          requestObj["requests.0.request.space.resident.expected"] = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          future = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
          future.setDate(future.getDate() + 10);
          requestObj["requests.0.analytics.date.space.movein"] = future;
        }

        if (filterAll(filterDate(resultObj["movingdate"])) !== "거주중" && requestObj["requests.0.request.space.resident.expected"].valueOf() <= (new Date()).valueOf()) {
          requestObj["requests.0.request.space.resident.living"] = true;
          requestObj["requests.0.request.space.resident.expected"] = new Date();
          future = new Date();
          future.setDate(future.getDate() + 60);
          requestObj["requests.0.analytics.date.space.movein"] = future;
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

        //to mongo
        console.log(requestObj);
        if (!instance.ignorePhone.includes(requestObj["phone"])) {

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

          if (!pastInfo_boo) {
            cliid = await instance.back.createClient(requestObj, { selfMongo: MONGOC });
            await instance.back.createHistory("client", { cliid: cliid, space: "최초 고객이 적은 주소 : " + requestObj["requests.0.request.space.address"] }, { fromConsole: true });
          } else {
            await instance.back.updateClient([ { cliid: ifOverlap[0].cliid }, requestObj ], { selfMongo: MONGOC });
            cliid = ifOverlap[0].cliid;
          }

          instance.parsingAddress(cliid, requestObj["requests.0.request.space.address"], MONGOC).then((r) => {
            const { result, id } = r;
            if (!result) {
              return messageSend({ text: "표준 주소 체계 위반 사례, 바르게 고쳐주세요! : https://" + instance.address.backinfo.host + "/client?cliid=" + id, channel: "#401_consulting" });
            }
          }).catch((err) => {
            errorLog("주소 연산 중 오류 생김 : " + err.message).catch((e) => { console.log(e); });
            console.log(err);
          });

          instance.back.getCaseProidById(cliid, { selfMongo: MONGOC }).then((clientCase) => {
            if (clientCase !== null) {
              const serviceCase = clientCase.caseService();
              if (serviceCase !== null) {
                const { serid, xValue } = serviceCase;
                let whereQuery, updateQuery;
                whereQuery = { cliid };
                updateQuery = { "requests.0.analytics.response.service.serid": serid[0].serid, "requests.0.analytics.response.service.xValue": xValue[0].xValue };
                return instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: MONGOC });
              } else {
                return (new Promise((resolve, reject) => { resolve("fail"); }));
              }
            } else {
              return (new Promise((resolve, reject) => { resolve("fail"); }));
            }
          }).then((message) => {
            console.log(cliid, "case update " + message);
          }).catch((err) => {
            errorLog("Bridge 서버 문제 생김 (submit, case 연산) : " + err.message).catch((e) => { console.log(e); });
          });
        } else {
          cliid = "c1801_aa01s";
        }

        //send slack message
        if (!instance.ignorePhone.includes(requestObj["phone"])) {
          thisClientArr = await instance.back.getClientsByQuery({ phone: requestObj["phone"] }, { withTools: true, selfMongo: MONGOC });
          thisClient = thisClientArr[0];
          message = '';
          message += (pastInfo_boo ? "재문의" : "새로운 상담 문의") + "가 왔습니다!\n";
          message += thisClient.toMessage();
          await messageSend({ text: message, channel: "#401_consulting" });

          //send alimtalk and print
          // KAKAO.sendTalk("complete", requestObj["name"], requestObj["phone"]).then(() => {
          //   return ghostRequest("/print", { cliid });
          // }).then(() => {
          //   return ADDRESS.apartNameSearch(requestObj["requests.0.request.space.address"]);
          // }).then((data) => {
          //   data.cliid = cliid;
          //   return ghostRequest("/apartment", { data });
          // }).catch((err) => {
          //   errorLog("Bridge 서버 문제 생김 (submit, ghost 전달) : " + err.message).catch((e) => { console.log(e); });
          // });

          KAKAO.sendTalk("complete", requestObj["name"], requestObj["phone"]).then(() => {
            return ghostRequest("/print", { cliid });
          }).catch((err) => {
            errorLog("Bridge 서버 문제 생김 (submit, ghost 전달) : " + err.message).catch((e) => { console.log(e); });
          });


        } else {
          message = '';
          message += JSON.stringify(requestObj, null, 2);
          await messageSend({ text: message, channel: "#error_log" });

          //send alimtalk and print
          KAKAO.sendTalk("complete", requestObj["name"], requestObj["phone"]).catch((err) => {
            errorLog("Bridge 서버 문제 생김 (submit, kakao) : " + err.message).catch((e) => { console.log(e); });
          });

        }

      }

      //end
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("success");

    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (submit) : " + e.message);
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
      const calendar = new GoogleCalendar();

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
          await messageSend({ text: message, channel: "#300_designer" });

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
          await messageSend({ text: message, channel: "#error_log" });
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
          await messageSend({ text: message, channel: "#300_designer" });
        } else {
          await messageSend({ text: message, channel: "#error_log" });
        }

      }

      //end
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send("success");

    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (designerSumbit) : " + e.message);
      console.log(e);
    }
  }

  //POST - name phone check
  funcObj.post_namephone = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
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

      if (boo) {
        res.send("success");
      } else {
        res.send("failure");
      }

    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (post_namephone): " + e.message);
      res.send("error");
    }
  }

  //POST - card
  funcObj.post_card = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.pretext === undefined || req.body.cellphone === undefined) {
        res.send("error");
      } else {
        const phone = req.body.cellphone.trim().replace(/[\&\=\'\(\)\<\>\; \n\?\!\[\]\{\}\*\+]/g, '');
        if (!/^[0-9]+-[0-9]+-[0-9]+$/.test(phone)) {
          res.send("error");
        } else {
          if (instance.ignorePhone.includes(phone)) {
            res.send(String(1001));
          } else {
            const clients = await instance.back.getClientsByQuery({ phone }, { withTools: false, selfMongo: MONGOC });
            if (clients.length === 0) {
              res.send("error");
            } else {
              let cliid;
              let projects, project;
              let first, remain;

              cliid = clients[0].cliid;
              projects = await instance.back.getProjectsByQuery({ $and: [ { cliid }, { desid: { $regex: "^d" } } ] }, { withTools: false, selfMongo: MONGOC });
              if (projects.length === 0) {
                res.send("error");
              } else {
                project = projects[0];
                first = project.process.contract.first.calculation.amount;
                remain = project.process.contract.remain.calculation.amount.consumer - first;

                res.send(String(remain));
              }
            }
          }
        }
      }
    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (post_card): " + e.message);
      res.send("error");
    }
  }

  //POST - binary files
  funcObj.post_binary = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      console.log("file request get");
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        let filesKeys = Object.keys(files);
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
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
          let binrayFolderBoo;
          let fileTong;

          fileTong = {};
          for (let i of list) {
            fileTong[i] = [];
          }

          //client folder make
          binrayFolderBoo = false;
          for (let i of binaryFolderDetail) {
            if (binrayFolderTest.test(i)) {
            binrayFolderBoo = true;
            }
          }
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
                shell.exec(`mv ${shellLink(j.filepath)} ${shellLink(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + j.originalFilename)};`);
                fileTong[list[i]].push(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + j.originalFilename);
              }
            } else {
              shell.exec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
              fileTong[list[i]].push(binaryFolder + '/' + cilentFolderName + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename);
            }
          }

          //parsing cliid
          let clientRows, cliid;
          if (phone !== "010-2747-3403") {
            clientRows = await instance.back.getClientsByQuery({ phone }, { withTools: false, selfMongo: MONGOC });
          } else {
            clientRows = [ { cliid: "테스트" } ];
          }
          if (clientRows.length === 0) {
            cliid = null;
          } else if (phone !== "010-2747-3403") {
            cliid = clientRows[0].cliid;
            if (clientRows[0].requests[0].analytics.response.status === "드랍") {
              await instance.back.updateClient([ { cliid: clientRows[0].cliid }, { "requests.0.analytics.response.status": "응대중" } ], { selfMongo: MONGOC });
            }
          } else if (phone === "010-2747-3403") {
            cliid = "테스트";
          }

          if (cliid !== null) {
            //upload google drive
            instance.bridgeToOffice({ tong: fileTong, name: name, phone: phone, mode: "client", cliid: cliid, folder: cilentFolderName }, { selfMongo: MONGOC });
            //kakao and slack
            KAKAO.sendTalk("photo", name, phone).catch((e) => { console.log(e); });
            await messageSend({ text: name + "님이 파일 전송을 시도중입니다!", channel: "#401_consulting" });

            res.send('success');
          } else {
            res.send('error');
          }
        } else {
          await errorLog("고객 파일 서버 문제 생김 (post_binary) : " + JSON.stringify(fields) + "\n" + err.message);
          res.send('error');
        }
      });
    } catch (e) {
      await errorLog("고객 파일 서버 문제 생김 (post_binary) : " + err.message);
      res.send('error');
    }
  }

  //POST - designer portfolio binary
  funcObj.post_designerBinary = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const form = instance.formidable({ multiples: true });
      form.parse(req, async function (err, fields, files) {
        let filesKeys = Object.keys(files);
        const { designer, phone } = fields;
        res.set({
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
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
                shell.exec(`mv ${shellLink(j.filepath)} ${shellLink(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + j.originalFilename)};`);
                fileTong[list[i]].push(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + j.originalFilename);
              }
            } else {
              shell.exec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
              fileTong[list[i]].push(binaryFolder + '/' + designerFolderName + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename);
            }
          }

          //upload google drive
          instance.bridgeToOffice({ name: designer, phone: phone, tong: fileTong, folder: designerFolderName, mode: "designer" }, { selfMongo: MONGOC });

          //kakao and slack
          KAKAO.sendTalk("photo", designer, phone).catch((e) => { console.log(e); });
          await messageSend({ text: designer + "님이 파일 전송을 시도중입니다!", channel: "#300_designer" });

          //end
          res.send('success');

        } else {
          if (designer !== undefined && designer !== null && phone !== undefined && phone !== null) {
            KAKAO.sendTalk("portfolioFail", designer, phone).catch((e) => { console.log(e); });
          }
          await errorLog("디자이너 파일 서버 문제 생김 (post_designerBinary): " + JSON.stringify(fields) + "\n" + err.message);
          res.send('error');
        }
      });
    } catch (e) {
      await errorLog("디자이너 파일 서버 문제 생김 (post_designerBinary): " + e.message);
      res.send('error');
      console.log(e);
    }
  }

  //POST - certification
  funcObj.post_certification = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { name, phone, certification } = req.body;
      await HUMAN.sendSms({
        name,
        phone,
        subject: "휴대폰 인증",
        contents: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + certification + "\n\n인증번호를 팝업창에 입력해주세요!"
      });
      await KAKAO.sendTalk("certification", name, phone, {
        company: "홈리에종",
        name,
        certification
      });
      res.send("success");
    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (post_certification): " + e.message);
      res.send("error");
    }
  }

  //POST - apartment
  funcObj.post_apartment = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { data } = equalJson(req.body);
      const cliid = data.cliid;
      const pyeongConvertingConst = 0.3025;
      let apartData, space;

      ADDRESS.rawToApartment(data, { selfMongo: MONGOLOCALC }).then((data) => {
        apartData = data;
        return instance.back.getHistoriesByQuery("client", { cliid }, { fromConsole: true });
      }).then((rows) => {
        if (rows.length > 0) {
          space = rows[0].space;
        } else {
          space = "최초 고객이 적은 주소 : " + apartData.address + " " + apartData.name;
        }
        space += "\n\n";
        space += "아파트 : " + apartData.name;
        space += "\n\n";
        space += "링크 : " + apartData.link;
        space += "\n\n";
        space += "사용 승인일 : " + String(apartData.created.getFullYear()) + "년 " + String(apartData.created.getMonth() + 1) + "월";
        space += "\n\n";
        for (let { name, area: { supply, dedicated, ratio }, composition: { rooms, bathrooms } } of apartData.kinds) {
          if (supply === null) {
            supply = 0;
          }
          if (dedicated === null) {
            dedicated = 0;
          }
          if (ratio === null) {
            ratio = 0;
          }
          if (rooms === null) {
            rooms = 0;
          }
          if (bathrooms === null) {
            bathrooms = 0;
          }
          space += name + "\n";
          space += "공급 " + String(Math.round(supply * pyeongConvertingConst * 100) / 100) + "평" + "\n";
          space += "전용 " + String(Math.round(dedicated * pyeongConvertingConst * 100) / 100) + "평" + "\n";
          space += "전용률 " + String(Math.round(ratio * 100 * 100) / 100) + "%" + "\n";
          space += "방 " + String(rooms) + "개" + "\n";
          space += "화장실 " + String(bathrooms) + "개" + "\n";
          space += "\n";
        }
        if (rows.length > 0) {
          return instance.back.updateHistory("client", [ { cliid }, { space } ], { fromConsole: true });
        } else {
          return instance.back.createHistory("client", { cliid, space }, { fromConsole: true });
        }
      }).catch((err) => {
        errorLog("Bridge 서버 문제 생김 (post_apartment) : " + err.message).catch((e) => { console.log(e); })
      });
      res.send({ message: "done" });
    } catch (e) {
      await errorLog("Bridge 서버 문제 생김 (post_apartment) : " + e.message);
      res.send({ message: "error : " + e.message });
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
  const { shellExec, fileSystem, mongo, mongoinfo, mongolocalinfo } = this.mother;
  const { parse } = require("url");
  const express = require("express");
  const useragent = require("express-useragent");
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);

  //express
  const app = express();
  app.use(useragent.express());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit : "50mb" }));

  //set needs
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  const kakaoInstance = new KakaoTalk();
  const humanInstance = new HumanPacket();
  const addressInstance = new AddressParser();

  try {
    await this.back.setInfoObj({ getMode: false });

    await MONGOC.connect();
    await MONGOLOCALC.connect();
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
      await shellExec(`mkdir`, [ `${this.dir}/binary` ]);
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
    const { get, post } = this.bridgeServer([ MONGOC, MONGOLOCALC, kakaoInstance, humanInstance, addressInstance ]);
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
