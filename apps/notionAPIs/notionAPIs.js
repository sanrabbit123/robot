const NotionAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/notionAPIs";
  this.jsonDir = this.dir + "/json";
  this.pythonApp = this.dir + "/python/app.py";
  this.blockInfo = {
    blockInfo: {
      blockId: "0da6f7d0806945a3919127b4171adde9",
      targetColumns: [
        { regex: "신규", name: "newClient" },
        { regex: "프로젝트", name: "projectContents" },
        { regex: "장기", name: "oldClient" },
        { regex: "드랍", name: "dropClient" },
        { regex: "완료", name: "completeClient" },
        { regex: "디자이너", name: "designer" },
      ],
    },
  };
}

NotionAPIs.prototype.blockToJson = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "blockToJson" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.pastToNewDesid = async function () {
  const instance = this;
  try {
    const DesidFilter = this.back.idFilter("designer");
    let block, designerTarget, obj;
    let temp, temp2, temp3;
    let tempString, tempString2;

    block = JSON.parse(JSON.stringify(this.blockInfo));
    designerTarget = block.blockInfo.targetColumns.pop();
    block.blockInfo.targetColumns = [ designerTarget ];
    obj = { ...block };

    temp = DesidFilter.pastToNew.toString().split("case");

    temp2 = [];
    for (let i = 1; i < temp.length; i++) {
      temp2.push(temp[i].split("return"));
    }

    temp3 = {};
    for (let i = 0; i < temp2.length; i++) {
      tempString = '';
      tempString2 = '';
      tempString = temp2[i][0].replace(/[^de0-9]/g, '');
      tempString2 = temp2[i][1].replace(/[^a-z\_0-9]/g, '').slice(0, 11);
      temp3[tempString] = tempString2;
    }

    obj.filter = temp3;

    return (await this.mother.pythonExecute(this.pythonApp, [ "pastToNewDesid" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.updateConsoleLink = async function () {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "setConsoleLink" ], this.blockInfo));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getCxCards = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const obj = this.blockInfo;
    await this.updateConsoleLink();
    const { resultFileList } = await this.blockToJson(obj);

    let tempArr;
    let middleTong, finalTong;

    middleTong = [];
    for (let f of resultFileList) {
      tempArr = JSON.parse(await fileSystem(`readString`, [ f ]));
      for (let i of tempArr) {
        middleTong.push(i);
      }
    }

    finalTong = {};
    for (let m of middleTong) {
      if (m.cliid !== undefined && m.cliid !== '') {
        finalTong[m.cliid] = {};
        finalTong[m.cliid]["id"] = m.parentId + '-' + m.id;
        finalTong[m.cliid]["data"] = m;
      } else if (m.desid !== undefined && m.desid !== '') {
        finalTong[m.desid] = {};
        finalTong[m.desid]["id"] = m.parentId + '-' + m.id;
        finalTong[m.desid]["data"] = m;
      }
    }

    const DesidFilter = this.back.idFilter("designer");
    for (let i in finalTong) {
      if (/^d/.test(i)) {
        finalTong[DesidFilter.pastToNew(i)] = finalTong[i];
      }
    }

    for (let i in finalTong) {
      if (/^de/.test(i)) {
        delete finalTong[i];
      }
    }

    console.log(finalTong);
    await fileSystem(`write`, [ `${process.cwd()}/temp/notionTong.json`, JSON.stringify(finalTong, null, 2) ]);

    return finalTong;
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getElementById = async function (id) {
  const instance = this;
  try {
    let notionIds;
    let obj, obj2, button;
    let targetId;
    let result;
    let tempObj;

    if (/^c/.test(id)) {
      obj = await this.back.getClientById(id);
      button = 'c';
    } else if (/^d/.test(id)) {
      obj = await this.back.getDesignerById(id);
      button = 'd';
    } else if (/^p/) {
      obj2 = await this.back.getProjectById(id);
      obj = await this.back.getClientById(obj2.cliid);
      button = 'c';
    } else {
      throw new Error("invaild id");
    }

    notionIds = [];
    if (button === 'c') {
      for (let { request: { notionId } } of obj.requests) {
        notionIds.push(notionId);
      }
    } else {
      notionIds.push(obj.information.notionId);
    }

    result = [];
    for (let i of notionIds) {
      targetId = i.split('-')[1];
      tempObj = await this.mother.pythonExecute(this.pythonApp, [ "getElementById" ], { id: targetId });
      result.push(tempObj);
    }

    return result[0];
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.addNewRow = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "single" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.addNewRows = async function (arr) {
  const instance = this;
  try {
    if (!Array.isArray(arr)) { throw new Error("invaild type") }
    return (await this.mother.pythonExecute(this.pythonApp, [ "multiple" ], arr));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getAllRows = async function () {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "getAll" ], {}));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getOneRow = async function (id) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "getById" ], { id: id }));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.updateOneRows = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "updateOne" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.clientFilter = async function () {
  const instance = this;
  const { fileSystem, mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const menus = {
    status: [
      "신규 고객",
      "신규 고객 대기",
      "계약금 안내",
      "계약금 대기",
      "제안서",
      "제안서 대기",
      "잔금 대기",
      "현장 미팅",
      "계약서",
      "프로젝트 진행",
      "디자인 제안",
      "시공 제안",
      "스타일링 제안",
      "기타 문의",
      "마무리",
      "촬영",
      "정산",
      "컨텐츠",
      "공유",
      "완료"
    ],
    family: [
      "1인",
      "2인",
      "신혼부부",
      "부부",
      "여아",
      "여아 2",
      "딸",
      "딸 2",
      "남아",
      "남아 2",
      "아들",
      "아들 2",
      "상공간",
      "부모님",
      "반려견",
      "반려묘 2",
      "반려묘",
      "모녀"
    ],
    budget: [
      "500만원 이하",
      "1000만원",
      "1500만원",
      "2000만원",
      "2500만원",
      "3000만원",
      "4000만원",
      "5000만원 이상",
    ],
    contract: [
      "자가",
      "전월세",
      "알 수 없음",
    ],
    space: [
      "방1개",
      "방2개",
      "방3개",
      "방4개이상",
      "화장실1개",
      "화장실2개",
      "화장실3개이상",
      "발코니확장",
      "발코니확장없음"
    ],
    service: [
      "홈퍼니싱",
      "홈스타일링",
      "부분공간",
      "토탈스타일링",
      "기타"
    ],
    channel: [
      "커뮤니티",
      "검색",
      "지인",
      "인스타",
      "블로그",
      "언론"
    ]
  }
  try {

    let tong, row, temp;

    await MONGOC.connect();

    tong = await this.getAllRows();

    for (let obj of tong) {
      //title fix
      if (obj.title === null) { obj.title = ''; }
      obj.title = obj.title.trim();

      //status fix
      if (obj.status === null) { obj.status = ''; }
      obj.status = obj.status.trim();
      if (!menus.status.includes(obj.status)) {
        console.log(obj.status);
        obj.status = "신규 고객";
      }

      //cliid
      if (obj.cliid === null) { obj.cliid = ''; }
      obj.cliid = obj.cliid.trim();
      if (obj.cliid === '') {
        row = await MONGOC.db("miro81").collection("BC1_conlist").find({ a19_name: (obj.title.split(" : "))[0].trim() }).toArray();
        if (row.length > 1) {
          console.log("id ERROR : " + obj.title);
        } else if (row.length === 0) {
          console.log("id ERROR : " + obj.title);
        } else {
          obj.cliid = row[0].a4_customernumber;
        }
      }

      row = await MONGOC.db("miro81").collection("BC1_conlist").find({ a4_customernumber: obj.cliid }).toArray();

      //phone
      if (obj.phone === null) { obj.phone = ''; }
      obj.phone = obj.phone.trim();
      if (obj.phone === '') {
        obj.phone = row[0].a20_phone;
      }

      //email fix
      if (!/@/g.test(obj.email) && obj.email !== '') {
        console.log("email ERROR : " + obj.title);
      }

      //address
      if (obj.address === null) { obj.address = ''; }
      obj.address = obj.address.trim();
      if (obj.address === '') {
        obj.address = row[0].a21_address;
      }

      //budget
      if (obj.budget === null) { obj.budget = ''; }
      obj.budget = obj.budget.trim();
      if (obj.budget === '') {
        obj.budget = row[0].a23_budget.replace(/,/g, '');
      }

      //contract
      if (obj.contract === null) { obj.contract = ''; }
      obj.contract = obj.contract.trim();
      if (obj.contract === '') {
        obj.contract = row[0].a27_contract;
      }

      //number pyeong
      obj.pyeong = Number(row[0].a24_pyeong.replace(/[^0-9]/g, ''))


      //space parsing
      temp = row[0].a28_space.split(' / ');
      obj.room = temp[0];
      obj.bathroom = temp[1];
      obj.valcony = temp[2];

      //etc
      obj.etc = row[0].a29_etc;

      //family parsing
      obj.family = row[0].a22_family;

      //service parsing
      if (obj.service.includes("")) { obj.service = []; }

      //move in
      if (obj.movein === "9999-09-09") {
        obj.movein = NotionAPIs.dateFilter(row[0].a25_due_date, row[0]);
      }
      obj.precheck = NotionAPIs.dateFilter(row[0].a13_sajeon, row[0]);
      obj.empty = NotionAPIs.dateFilter(row[0].a14_emptyday, row[0]);

      if (obj.movein === "" || !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(obj.movein)) { obj.movein = "9999-09-09" }
      if (obj.precheck === "" || !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(obj.precheck)) { obj.precheck = "9999-09-09" }
      if (obj.empty === "" || !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(obj.empty)) { obj.empty = "9999-09-09" }
    }

    await fileSystem(`write`, [ this.jsonDir + "/client.json", JSON.stringify(tong, null, 2) ]);

    for (let i = 0; i < tong.length; i++) {
      console.log(await this.updateOneRows(tong[i]));
      console.log(String(i + 1) + " / " + String(tong.length));
    }

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    console.log(`client filter done`);
  }
}

NotionAPIs.prototype.launching = async function (cliid = "latest") {
  const instance = this;
  const { fileSystem, mongo, mongoinfo } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  try {
    let latestObj_arr, latestObj, newObj, tempArr;
    await MONGOC.connect();

    if (cliid === "latest") {
      latestObj_arr = await MONGOC.db("miro81").collection("BC1_conlist").find({}).sort({'a18_timeline': -1}).limit(1).toArray();
    } else {
      latestObj_arr = await MONGOC.db("miro81").collection("BC1_conlist").find({ a4_customernumber: cliid }).limit(1).toArray();
    }

    if (latestObj_arr.length > 0) {
      latestObj = latestObj_arr[0];
      newObj = {};
      newObj["title"] = latestObj.a19_name;
      newObj["cliid"] = latestObj.a4_customernumber;
      newObj["phone"] = latestObj.a20_phone;
      newObj["email"] = latestObj.a35_aboutetc;
      newObj["address"] = latestObj.a21_address;
      newObj["budget"] = latestObj.a23_budget.replace(/,/g, '');
      newObj["pyeong"] = Math.round(Number(latestObj.a24_pyeong.replace(/평/g, '')));
      newObj["contract"] = latestObj.a27_contract;
      newObj["family"] = latestObj.a22_family;
      if (latestObj.a25_due_date === "거주중") {
        newObj["movein"] = latestObj.a18_timeline.slice(0, 10);
      } else {
        newObj["movein"] = latestObj.a25_due_date;
      }
      tempArr = latestObj.a28_space.split(' / ');
      newObj["room"] = tempArr[0];
      newObj["bathroom"] = tempArr[1];
      newObj["valcony"] = tempArr[2];
      newObj["etc"] = latestObj.a29_etc;
      newObj["channel"] = latestObj.a30_channel;

      console.log(await this.addNewRow(newObj));
      await this.mother.slack_bot.chat.postMessage({ text: `${latestObj.a19_name} 고객님의 정보가 노션으로 옮겨졌습니다!`, channel: `#401_consulting` });
    }

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOC.close();
    console.log(`done`);
  }
}

NotionAPIs.dateFilter = function (raw, mother) {
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

    //resident error
    if (/거주/g.test(raw.trim())) {
      return a18_timeline.slice(0, 10);

    //six-wording
    } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(raw.trim())) {
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
    if (raw === EMPTYDATE) {
      return a18_timeline.slice(0, 10);
    } else {
      return raw.trim();
    }
  }
}

module.exports = NotionAPIs;
