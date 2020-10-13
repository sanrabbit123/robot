const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const BridgeCloud = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();

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
    }
    return str.replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, '').replace(/\t/g, '').replace(/  /g, '').replace(/ /g, '').replace(/ /g, '');
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
}

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
    const { tong, name } = obj;
    let tongKeys = Object.keys(tong);
    const targetFolder = '1zB5SdQ1PLoE37870wlSBWk01AJvXwSRo';
    const googleDrive = googleSystem("drive");

    //make client folder
    const folderId = await googleDrive.makeFolder_andMove(name, targetFolder);

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

    slack_bot.chat.postMessage({ text: "파일 전송을 완료하였습니다! : " + name, channel: "#400_customer" });
    shell.exec(`rm -rf ${shellLink(this.dir + '/binary/' + name)}`);
  } catch (e) {
    slack_bot.chat.postMessage({ text: "파일 서버 문제 생김 : " + e, channel: "#error_log" });
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
      const ifOverlap = await MONGOC.db("miro81").collection("BC1_conlist").find({ a20_phone: filterAll(resultObj.cellphone) }).toArray();
      let pastInfos = "no", pastInfo_boo = false;

      if (/[ㄱ-ㅎㅏ-ㅣ]/g.test(resultObj.pretext) || /[a-zA-Z]/g.test(resultObj.pretext)) {

        slack_bot.chat.postMessage({ text: "불량 데이터 확인, 직접 확인해주세요. : " + resultObj.pretext + ' ' + resultObj.cellphone, channel: "#401_consulting" });

      } else {

        //if overlap
        if (ifOverlap.length > 0) {
          pastInfos = "과거의 정보 모음 / ";
          pastInfos += "이전 문의일 : " + ifOverlap[0].a18_timeline + " / ";
          pastInfos += "이전 주소 : " + ifOverlap[0].a21_address + " / ";
          pastInfos += "이전 가족 구성원 : " + ifOverlap[0].a22_family + " / ";
          pastInfos += "이전 예산 : " + ifOverlap[0].a23_budget + " / ";
          pastInfos += "이전 평수 : " + ifOverlap[0].a24_pyeong + " / ";
          pastInfos += "이전 입주일 : " + ifOverlap[0].a25_due_date + " / ";
          pastInfos += "이전 계약 형태 : " + ifOverlap[0].a27_contract + " / ";
          pastInfos += "이전 공간 상태 : " + ifOverlap[0].a28_space + " / ";
          pastInfos += "이전 요청 사항 : " + ifOverlap[0].a29_etc + " / ";
          pastInfos += "이전 유입 경로 : " + ifOverlap[0].a30_channel;
          pastInfo_boo = true;
        }

        //make client object
        const columnMap = {
          "pretext": "a19_name",
          "cellphone": "a20_phone",
          "dwelling": "a21_address",
          "folk": "a22_family",
          "email": "a35_aboutetc",
          "money": "a23_budget",
          "area": "a24_pyeong",
          "movingdate": "a25_due_date",
          "myhomeboo": "a27_contract",
          "spotspec": "a28_space",
          "description": "a29_etc",
          "wayto": "a30_channel",
        };
        let clientObj = {};
        for (let i in resultObj) {
          if (i === "pretext") {
            clientObj[columnMap[i]] = filterAll(filterName(resultObj[i]));
          } else if (i === "email") {
            clientObj[columnMap[i]] = filterAll(filterNull(resultObj[i]));
          } else if (i === "movingdate") {
            clientObj[columnMap[i]] = filterAll(filterDate(resultObj[i]));
          } else if (i === "myhomeboo") {
            clientObj[columnMap[i]] = filterAll(filterCont(resultObj[i]));
          } else {
            clientObj[columnMap[i]] = filterAll(resultObj[i]);
          }
        }

        //id and add column
        let rows = await MONGOC.db("miro81").collection("BC1_conlist").find({}).project({ a4_customernumber: 1 }).sort({ a4_customernumber: -1 }).limit(1).toArray();
        let this_id = BridgeCloud.makeId(rows[0].a4_customernumber);
        const additionColumns = {
          "a18_timeline": BridgeCloud.returnTimeline(),
          "a1_class1": "응대중",
          "a2_class2": "",
          "a3_reason": "",
          "a5_call": "",
          "a7_channelenroll": "",
          "a8_image": "",
          "a9_proposal": "",
          "a10_comfirmcall": "",
          "a11_next": "",
          "a13_sajeon": "",
          "a14_emptyday": "",
          "a16_service": "",
          "a17_money": "",
          "a12_history": "",
          "a31_aboutsite": "",
          "a32_aboutcom": "",
          "a33_aboutsty": "",
          "a34_aboutmon": "",
          "a4_customernumber": this_id,
        };

        if (!pastInfo_boo) {
          for (let i in additionColumns) {
            clientObj[i] = additionColumns[i];
          }
        } else {
          for (let i in additionColumns) {
            clientObj[i] = ifOverlap[0][i];
          }
          clientObj["a12_history"] = clientObj["a12_history"] + " " + pastInfos;
          clientObj["a18_timeline"] = additionColumns["a18_timeline"];
          clientObj["a1_class1"] = additionColumns["a1_class1"];
        }

        //view client object
        console.log(clientObj);

        //to mongo
        if (clientObj["a20_phone"] !== "010-2747-3403") {
          if (!pastInfo_boo) {
            await MONGOC.db("miro81").collection("BC1_conlist").insertOne(clientObj);
          } else {
            await MONGOC.db("miro81").collection("BC1_conlist").updateOne({ a20_phone: filterAll(resultObj.cellphone) }, { $set: clientObj });
          }
        }

        //send slack message
        let message = '';
        message += (pastInfo_boo ? "재문의" : "새로운 상담 문의") + "가 왔습니다!  |  " + clientObj["a18_timeline"] + "\n";
        message += "성함 : " + clientObj["a19_name"] + " ( 고객 아이디 : " + (pastInfo_boo ? ifOverlap[0]["a4_customernumber"] : this_id) + " )" + "\n";
        message += "연락처 : " + clientObj["a20_phone"] + "\n";
        message += "이메일 : " + clientObj["a35_aboutetc"] + "\n";
        message += "주소 : " + clientObj["a21_address"] + "\n";
        message += "가족 구성원 : " + clientObj["a22_family"] + "\n";
        message += "예산 : " + clientObj["a23_budget"] + "\n";
        message += "평수 : " + clientObj["a24_pyeong"] + "평" + "\n";
        message += "입주 예정일 : " + clientObj["a25_due_date"] + "\n";
        message += "계약 형태 : " + clientObj["a27_contract"] + "\n";
        message += "공간 상태 : " + clientObj["a28_space"] + "\n";
        message += "요청 사항 : " + clientObj["a29_etc"] + "\n";
        message += "유입 경로 : " + clientObj["a30_channel"] + "\n";

        //send alimtalk
        KAKAO.sendTalk("complete", clientObj["a19_name"], clientObj["a20_phone"]);
        message = message + "\n" + clientObj["a19_name"] + "님에게 알림톡 전송을 완료하였습니다!";

        //to google
        const toGoogle = {
          "a19_name": "entry.1330142163",
          "a20_phone": "entry.113799560",
          "a21_address": "entry.2114079722",
          "a22_family": "entry.132869049",
          "a35_aboutetc": "entry.1481370131",
          "a23_budget": "entry.795490298",
          "a24_pyeong": "entry.1040328027",
          "a25_due_date": "entry.2088583577",
          "a27_contract": "entry.2069033904",
          "a28_space": "entry.1127622227",
          "a29_etc": "entry.462371043",
          "a30_channel": "entry.795957898",
          "a18_timeline": "entry.1749939672",
        };
        let googleObj = {};
        for (let i in toGoogle) {
          googleObj[toGoogle[i]] = clientObj[i];
        }
        const { status: googleStatus } = await requestSystem("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfqd1Q-En9K7YbQpknPE3OkqobzCMJaSO9G33W6KRodoE0I8g/formResponse", googleObj);
        if (googleStatus === 200) {
          message = message + "\n" + "구글 설문지로 옮겨졌습니다. 출력해주세요!\nhttps://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit";
        } else {
          message = message + "\n" + "구글 설문지로 옮겨지는 과정에서 문제 생김";
        }

        //to notion
        if (clientObj["a20_phone"] !== "010-2747-3403") {
          if (!pastInfo_boo) {
            const { status: notionStatus } = await requestSystem("http://" + instance.address.pythoninfo.host + ":3000/toNotion", { cliid: this_id });
            if (notionStatus !== 200) {
              message = message + "\n" + "노션으로 옮겨지는 과정에서 문제 생김";
            }
          }
        }

        slack_bot.chat.postMessage({ text: message, channel: "#401_consulting" });
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

      let rows = await MONGOC.db("miro81").collection("BC1_conlist").find({ a20_phone: resultObj.phone }).toArray();
      let boo = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].a19_name === resultObj.name) {
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

          //upload google drive
          instance.bridgeToGoogle({ tong: fileTong, name: cilentFolderName });

          //kakao and slack
          KAKAO.sendTalk("photo", name, phone);
          slack_bot.chat.postMessage({ text: name + "님이 파일 전송을 시도중입니다!", channel: "#400_customer" });

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

    pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/cert1.pem` ]);
    pems.key = await fileSystem(`read`, [ `${pemsLink}/key/privkey1.pem` ]);
    pems.ca = [];
    pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/chain1.pem` ]));
    pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/fullchain1.pem` ]));
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
