const BillMaker = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/billMaker";
  this.mapDir = this.dir + "/map";
  this.tempDir = process.cwd() + "/temp";
}

BillMaker.billCollections = [
  "cashReceipt",
  "taxBill",
  "stylingForm",
];

BillMaker.billDictionary = {
  styling: {
    class: "style",
    name: "스타일링",
    items: [
      {
        id: "_idte",
        class: "designerTime",
        name: "디자인비",
        description: "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
        ea: null,
        number: (method, distance) => { return 1; },
        amount: (method, amount, distance) => { return amount; },
      },
      {
        id: "_ites",
        class: "travelExpenses",
        name: "출장비",
        description: "디자이너가 출장시 발생되는 왕복 비용입니다.",
        ea: "회",
        number: (method, distance) => { return (/^off/gi.test(method) ? distance.number : 0); },
        amount: (method, amount, distance) => { return (/^off/gi.test(method) ? distance.amount : 0) },
      },
    ],
    requests: [
      {
        name: "홈리에종 계약금",
        comments: [
          "계약금은 전체 서비스 금액에 포함됩니다.",
          "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
          "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 스타일링 서비스가 계속 진행됩니다.",
          "현장 미팅 후 스타일링을 진행하지 않더라도, 계약금은 환불되지 않습니다.",
          "계좌 이체시, '기업 049-085567-04-022 / (주)홈리에종'으로 보내주시면 됩니다."
        ]
      },
      {
        name: "홈리에종 잔금",
        comments: [
          "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
          "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
          "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
          "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다.",
          "계좌 이체시, '기업 049-085567-04-022 / (주)홈리에종'으로 보내주시면 됩니다."
        ]
      },
    ],
    etc: {
      contractAmount: 300000,
    }
  },
};

BillMaker.prototype.createBill = async function (collection, updateQueryArr, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  if (typeof collection === "object" && typeof updateQueryArr === "object" && !Array.isArray(updateQueryArr)) {
    const updateQuery = collection;
    option = updateQueryArr;
    collection = "generalBill";
    const map = require(`${this.mapDir}/${collection}.js`);
    try {
      let MONGOC;
      let selfBoo;
      let rows;
      let dummy;
      let pastId;
      let newId;

      if (option.selfMongo === undefined || option.selfMongo === null) {
        selfBoo = false;
      } else {
        selfBoo = true;
      }

      if (!selfBoo) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
        await MONGOC.connect();
      } else {
        MONGOC = option.selfMongo;
      }

      dummy = map.main();
      rows = await MONGOC.db(`miro81`).collection(collection).find({}).sort({ "date": -1 }).limit(1).toArray();
      if (rows.length === 0) {
        pastId = "b2111_aa01s";
      } else {
        pastId = rows[0].bilid;
      }
      dummy.bilid = this.back.idMaker(pastId, false);
      newId = dummy.bilid;

      await MONGOC.db(`miro81`).collection(collection).insertOne(dummy);
      if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
        await MONGOC.db(`miro81`).collection(collection).updateOne({ bilid: newId }, { $set: updateQuery });
      }

      if (!selfBoo) {
        await MONGOC.close();
      }

      return newId;

    } catch (e) {
      console.log(e);
    }
  } else if (typeof collection === "string" && Array.isArray(updateQueryArr) && typeof option === "object") {
    if (!BillMaker.billCollections.includes(collection)) {
      throw new Error("generalBill must use getBillById or getBillsByQuery");
    }
    if (!updateQueryArr.every((o) => { return typeof o === "object"; })) {
      throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
    }
    const map = require(`${this.mapDir}/${collection}.js`);
    try {
      const { main, alive } = map;
      if (typeof main !== "function" || typeof alive !== "function") {
        throw new Error("invaild collection model");
      }
      let MONGOC;
      let selfBoo;
      let tong;
      let rows;

      if (option.selfMongo === undefined || option.selfMongo === null) {
        selfBoo = false;
      } else {
        selfBoo = true;
      }

      if (!selfBoo) {
        MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
        await MONGOC.connect();
      } else {
        MONGOC = option.selfMongo;
      }

      tong = main(alive, updateQueryArr, instance.mother);
      for (let { fresh, findQuery, insertEvent } of tong) {
        rows = await MONGOC.db(`miro81`).collection(collection).find(findQuery).toArray();
        if (rows.length === 0) {
          await insertEvent(fresh);
          await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
        } else {
          if (option.updateMode === true) {
            await MONGOC.db(`miro81`).collection(collection).deleteOne(findQuery);
            await insertEvent(fresh);
            await MONGOC.db(`miro81`).collection(collection).insertOne(fresh);
          }
        }
      }

      if (!selfBoo) {
        await MONGOC.close();
      }

    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error("input must be String: bill collection, Array: updateQueryArr, Object: option");
  }
}

BillMaker.prototype.readBill = async function (collection, whereQuery, option = { selfMongo: null }) {
  if (typeof collection !== "string" || typeof whereQuery !== "object" || typeof option !== "object") {
    throw new Error("input must be String: bill collection, Object: whereQuery, Object: option");
  }
  if (!BillMaker.billCollections.includes(collection)) {
    throw new Error("generalBill must use getBillById or getBillsByQuery");
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  const map = require(`${this.mapDir}/${collection}.js`);
  try {
    const { alive, wrap } = map;
    let MONGOC;
    let selfBoo;
    let rows;
    let sortQuery;

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }

    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.limit !== undefined) {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      rows = await MONGOC.db(`miro81`).collection(collection).find(whereQuery).sort(sortQuery).toArray();
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return map.wrap(alive, rows, this.mother);

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.returnBillDummies = function (subject) {
  const instance = this;
  const map = require(`${this.mapDir}/generalBill.js`);
  let dummy;
  dummy = map.sub(subject);
  return dummy;
}

BillMaker.prototype.getBillById = async function (bilid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const map = require(`${this.mapDir}/generalBill.js`);
    let MONGOC;
    let selfBoo;
    let arr;
    let result, target;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    arr = await MONGOC.db(`miro81`).collection(`generalBill`).find({ bilid }).toArray();
    result = map.wrap(map.alive, arr, this.mother);
    if (result.length > 0) {
      target = result[0];
    } else {
      target = null;
    }
    if (!selfBoo) {
      await MONGOC.close();
    }
    return target;
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.getBillsByQuery = async function (whereQuery, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const map = require(`${this.mapDir}/generalBill.js`);
    let MONGOC;
    let selfBoo;
    let sortQuery;
    let tong;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (option.sort === undefined) {
      sortQuery = { "date": -1 };
    } else {
      sortQuery = option.sort;
    }

    if (option.limit !== undefined) {
      tong = await MONGOC.db(`miro81`).collection(`generalBill`).find(whereQuery).sort(sortQuery).limit(Number(option.limit)).toArray();
    } else {
      tong = await MONGOC.db(`miro81`).collection(`generalBill`).find(whereQuery).sort(sortQuery).toArray();
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return map.wrap(map.alive, tong, this.mother);
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.updateBill = async function (queryArr, option = { selfMongo: null }) {
  if (queryArr.length !== 2) {
    throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
  }
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild arguments : query object must be Array: [ Object: whereQuery, Object: updateQuery ]");
    }
    let MONGOC;
    let selfBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }

    if (updateQuery !== null && Object.keys(updateQuery).length > 0) {
      await MONGOC.db(`miro81`).collection(`generalBill`).updateOne(whereQuery, { $set: updateQuery });
    }

    if (!selfBoo) {
      await MONGOC.close();
    }

    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.deleteBill = async function (bilid, option = { selfMongo: null }) {
  const instance = this;
  const { mongo, mongopythoninfo } = this.mother;
  try {
    const [ whereQuery, updateQuery ] = queryArr;
    let MONGOC;
    let selfBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    await MONGOC.db(`miro81`).collection(`generalBill`).deleteOne({ bilid });
    if (!selfBoo) {
      await MONGOC.close();
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.createStylingBill = async function (proid, option = { selfMongo: null, selfCoreMongo: null, selfConsoleMongo: null }) {
  if (typeof proid !== "string") {
    throw new Error("must be proid");
  }
  if (!/^p[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(proid)) {
    throw new Error("must be proid");
  }
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo, mongoconsoleinfo, sleep } = this.mother;
  const constNames = {
    class: BillMaker.billDictionary.styling.class,
    name: BillMaker.billDictionary.styling.name,
  };
  const stylingItems = BillMaker.billDictionary.styling.items;
  const stylingRequests = BillMaker.billDictionary.styling.requests;
  const contractAmount = BillMaker.billDictionary.styling.etc.contractAmount;
  const vatRatio = 0.1;
  try {
    let MONGOC, MONGOCOREC, MONGOCONSOLEC;
    let selfBoo, selfCoreBoo, selfConsoleBoo;
    if (option.selfMongo === undefined || option.selfMongo === null) {
      selfBoo = false;
    } else {
      selfBoo = true;
    }
    if (option.selfCoreMongo === undefined || option.selfCoreMongo === null) {
      selfCoreBoo = false;
    } else {
      selfCoreBoo = true;
    }
    if (option.selfConsoleMongo === undefined || option.selfConsoleMongo === null) {
      selfConsoleBoo = false;
    } else {
      selfConsoleBoo = true;
    }

    if (!selfBoo) {
      MONGOC = new mongo(mongopythoninfo, { useUnifiedTopology: true });
      await MONGOC.connect();
    } else {
      MONGOC = option.selfMongo;
    }
    if (!selfCoreBoo) {
      MONGOCOREC = new mongo(mongoinfo, { useUnifiedTopology: true });
      await MONGOCOREC.connect();
    } else {
      MONGOCOREC = option.selfCoreMongo;
    }
    if (!selfConsoleBoo) {
      MONGOCONSOLEC = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
      await MONGOCONSOLEC.connect();
    } else {
      MONGOCONSOLEC = option.selfConsoleMongo;
    }

    const members = await back.setMemberObj({ selfMongo: MONGOCOREC, getMode: true });
    if (!Array.isArray(members) || members.length === 0) {
      throw new Error("no member error");
    }
    const project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("no project error");
    }
    const client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });
    if (client === null) {
      throw new Error("no client error");
    }

    let designerHistory;
    let thisMember;
    let bilid, bilidArr;
    let whereQuery, updateQuery;
    let tempObj, tempObj2, tempArr;
    let res;
    let temp;
    let updateMode;
    let thisBill;
    let contractRequest;
    let designFeeRequest;
    let itemFactor;
    let goalArr;

    bilidArr = [];
    for (let { desid, fee } of project.proposal.detail) {

      designerHistory = await back.getHistoryById("designer", desid, { selfMongo: MONGOCONSOLEC });
      if (designerHistory === null) {
        throw new Error("designer history error");
      }

      thisMember = null;
      for (let obj of members) {
        if (obj.name === designerHistory.manager) {
          thisMember = obj;
        }
      }
      if (thisMember === null) {
        thisMember = members[0];
      }

      for (let { method, partial, amount, distance } of fee) {

        temp = await this.getBillsByQuery({
          $and: [
            { "links.proid": project.proid },
            { "links.cliid": client.cliid },
            { "links.desid": desid },
            { "links.method": method },
          ]
        }, { selfMongo: MONGOC });
        if (temp.length === 0) {
          bilid = await this.createBill({}, { selfMongo: MONGOC });
          updateMode = false;
        } else {
          thisBill = temp[0].bilid;
          bilid = thisBill.bilid;
          updateMode = true;
        }

        whereQuery = { bilid };

        updateQuery = {};
        updateQuery["class"] = constNames.class;
        updateQuery["name"] = client.name + "_" + client.phone + "_" + constNames.name;
        updateQuery["date"] = new Date();

        tempObj = this.returnBillDummies("managers");
        tempObj.name = thisMember.name;
        tempObj.phone = thisMember.phone;
        tempObj.email = thisMember.email[0];
        updateQuery["participant.managers"] = [ JSON.parse(JSON.stringify(tempObj)) ];

        updateQuery["participant.customer.name"] = client.name;
        updateQuery["participant.customer.phone"] = client.phone;
        updateQuery["participant.customer.email"] = client.email;
        updateQuery["links.proid"] = project.proid;
        updateQuery["links.cliid"] = client.cliid;
        updateQuery["links.desid"] = desid;
        updateQuery["links.method"] = method;

        contractRequest = this.returnBillDummies("requests");
        contractRequest.id = bilid + "_r" + String(updateMode ? thisBill.requests.length : 0);
        contractRequest.info.push({ address: client.requests[0].request.space.address.value });
        contractRequest.info.push({ pyeong: client.requests[0].request.space.pyeong.value });
        contractRequest.info.push({ method });
        for (let item of stylingItems) {
          if (/designer/gi.test(item.class)) {
            itemFactor = this.returnBillDummies("items");
            itemFactor.id = bilid + item.id;
            itemFactor.class = item.class;
            itemFactor.name = item.name;
            itemFactor.description = item.description;
            itemFactor.unit.ea = item.ea;
            itemFactor.unit.price = Math.round(item.amount(method, contractAmount, distance));
            itemFactor.unit.number = item.number(method, distance);
            itemFactor.amount.supply = Math.round(itemFactor.unit.price * itemFactor.unit.number);
            itemFactor.amount.vat = Math.round(itemFactor.amount.supply * vatRatio);
            itemFactor.amount.consumer = Math.round(itemFactor.amount.supply * (1 + vatRatio));
            contractRequest.items.push(itemFactor);
          }
        }
        contractRequest.name = stylingRequests[0].name;
        for (let c of stylingRequests[0].comments) {
          contractRequest.comments.push(c);
        }

        await sleep(100);

        goalArr = [];

        designFeeRequest = this.returnBillDummies("requests");
        designFeeRequest.id = bilid + "_r" + String((updateMode ? thisBill.requests.length : 0) + 1);
        designFeeRequest.info.push({ address: client.requests[0].request.space.address.value });
        designFeeRequest.info.push({ pyeong: client.requests[0].request.space.pyeong.value });
        designFeeRequest.info.push({ method });
        for (let item of stylingItems) {
          itemFactor = this.returnBillDummies("items");
          itemFactor.id = bilid + item.id;
          itemFactor.class = item.class;
          itemFactor.name = item.name;
          itemFactor.description = item.description;
          itemFactor.unit.ea = item.ea;
          itemFactor.unit.price = Math.round(item.amount(method, amount, distance));
          itemFactor.unit.number = item.number(method, distance);
          itemFactor.amount.supply = Math.round(itemFactor.unit.price * itemFactor.unit.number);
          itemFactor.amount.vat = Math.round(itemFactor.amount.supply * vatRatio);
          itemFactor.amount.consumer = Math.round(itemFactor.amount.supply * (1 + vatRatio));
          designFeeRequest.items.push(itemFactor);
          goalArr.push(itemFactor);
        }
        designFeeRequest.name = stylingRequests[1].name;
        for (let c of stylingRequests[1].comments) {
          designFeeRequest.comments.push(c);
        }

        if (!updateMode) {
          tempArr = [];
        } else {
          tempArr = thisBill.requests.toNormal();
        }
        tempArr.unshift(contractRequest);
        tempArr.unshift(designFeeRequest);
        updateQuery["requests"] = tempArr;

        updateQuery["goal"] = goalArr;

        res = await this.updateBill([ whereQuery, updateQuery ], { selfMongo: MONGOC });
        if (res === "success") {
          bilidArr.push(bilid);
        }
      }

    }

    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }
    if (!selfConsoleBoo) {
      await MONGOCONSOLEC.close();
    }

    return bilidArr;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.taxBill = async function (pastDateNumber = 2) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongolocalinfo, fileSystem, shell, shellLink, pythonExecute, requestSystem, decryptoHash, slack_bot, autoComma } = this.mother;
  const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
  try {
    const collection = "taxBill";
    const map = require(`${this.mapDir}/${collection}.js`);
    await MONGOLOCALC.connect();
    const selfMongo = MONGOLOCALC;
    const today = new Date();
    const yesterday = new Date();
    const month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const host = "imap.daum.net";
    const port = 993;
    const id = "hijinijini0311";
    const hash = "d3e48a26c2203b3f57af7489f4357a49c1336757d65d49d31455414c3c84e54e";
    const password = "homeliaison";
    const homeTaxEmail = "hometaxadmin@hometax.go.kr";
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const keywords = "전자세금계산서를 발급하고 발송한 메일";
    const attachmentsKeywords = "Content-Disposition: attachment";
    const dateKeywords = "Date: ";
    const pythonFile = `${process.cwd()}/temp/getMail.py`;
    const zeroAddition = (num) => { return ((num < 10) ? '0' + String(num) : String(num)); }
    const { TaxBill } = map.alive(this.mother);
    class FindIndex extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      findIndexAll(word, regxp = false, between = 0, start = 0) {
        let result;
        result = [];
        if (regxp) {
          for (let i = 0; i < this.length; i++) {
            if ((new RegExp(word, "gi")).test(this[i])) {
              result.push(i);
            }
          }
        } else {
          for (let i = 0; i < this.length; i++) {
            if (this[i] === word) {
              result.push(i);
            }
          }
        }
        result = result.slice(start);
        if (result.length > 1 && between > 0) {
          result.splice(1, between);
        }
        return result;
      }
    }
    let pythonDate, pythonScript;
    let realPwd;
    let result;
    let rawArr;
    let dateIndex;
    let attachmentsIndex;
    let binary, buff, data;
    let html, date;
    let search;
    let res, localScript;
    let newHtml;
    let dom;
    let finalText;
    let textArr, resultObj, tempArr;
    let spotTargets;
    let items, itemStart, itemEnd;
    let num;
    let supplySum, vatSum;
    let tempObj;
    let htmlTong, htmlNum;
    let resultObjTong;
    let startNums;
    let orderArr;
    let minus;
    let tempNum;
    let rows;

    yesterday.setDate(yesterday.getDate() - pastDateNumber);
    realPwd = await decryptoHash(password, hash);
    pythonDate = `${zeroAddition(yesterday.getDate())}-${month[yesterday.getMonth()]}-${String(yesterday.getFullYear())}`;
    pythonScript = ``;
    pythonScript += `from imaplib import IMAP4_SSL\n`;
    pythonScript += `import json\n`;
    pythonScript += `\n`;
    pythonScript += `imap = IMAP4_SSL(host="${host}", port=${String(port)})\n`;
    pythonScript += `\n`;
    pythonScript += `imap.login('${id}', '${realPwd}')\n`;
    pythonScript += `imap.select(mailbox="Inbox")\n`;
    pythonScript += `(typ, data) = imap.search(None, '(FROM "${homeTaxEmail}" SINCE "${pythonDate}")')\n`;
    pythonScript += `\n`;
    pythonScript += `targetMail_numbers = data[0].split()\n`;
    pythonScript += `targetMail_numbers.sort(reverse=True)\n`;
    pythonScript += `\n`;
    pythonScript += `mailTong = []\n`;
    pythonScript += `for num in targetMail_numbers:\n`;
    pythonScript += `    (typ, data) = imap.fetch(num, '(RFC822)')\n`;
    pythonScript += `    mailTong.append(data[0][1].decode('utf8'))\n`;
    pythonScript += `\n`;
    pythonScript += `print(json.dumps(mailTong))\n`;
    pythonScript += `\n`;
    pythonScript += `imap.close()\n`;
    pythonScript += `imap.logout()`;

    if (await fileSystem(`exist`, [ pythonFile ])) {
      shell.exec(`rm -rf ${shellLink(pythonFile)}`);
    }
    await fileSystem(`write`, [ pythonFile, pythonScript ]);

    result = await pythonExecute(pythonFile, [], {});
    html = null;
    htmlTong = [];
    for (let i = 0; i < result.length; i++) {
      if ((new RegExp(keywords, "gi")).test(result[i])) {
        rawArr = result[i].split("\r\n");

        dateIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(dateKeywords, "gi")).test(rawArr[j])) {
            dateIndex = j;
            break;
          }
        }

        attachmentsIndex = null;
        for (let j = 0; j < rawArr.length; j++) {
          if ((new RegExp(attachmentsKeywords, "gi")).test(rawArr[j])) {
            attachmentsIndex = j;
            break;
          }
        }

        if (attachmentsIndex === null) {
          throw new Error("not found attachment");
        }

        do {
          attachmentsIndex = attachmentsIndex + 1;
        } while (rawArr[attachmentsIndex].trim() === "" || /filename\=/g.test(rawArr[attachmentsIndex]));

        binary = "";
        while (rawArr[attachmentsIndex].trim() !== "") {
          binary += rawArr[attachmentsIndex].trim();
          attachmentsIndex++;
        }

        buff = Buffer.from(binary, "base64");
        data = buff.toString("utf8");
        html = data;
        date = new Date(rawArr[dateIndex].replace((new RegExp(dateKeywords, "gi"), "").trim()));

        htmlTong.push({ date, html });
      }
    }

    if (html === null || htmlTong.length === 0) {
      console.log("not found");
      return htmlTong;
    }

    console.log("parsing start...");
    resultObjTong = [];
    htmlNum = 0;
    for (let { date, html } of htmlTong) {

      search = [ ...html.matchAll(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi) ];
      res, localScript;
      newHtml;

      localScript = '';
      for (let arr of search) {
        res = await requestSystem(arr[1]);
        localScript += res.data;
        localScript += "\n\n";
      }

      localScript = `<script>\n\n${localScript}\n\n</script>`;

      newHtml = html.replace(/\<script src\=\"([^\"]+)\"\>\<\/script\>/gi, '');
      newHtml = newHtml.replace(/\<\/head\>/g, localScript + "</head>").replace(/src\=\"[^\"]+\"/gi, "").replace(/href\=\"[^\"]+\"/gi, "");
      newHtml = newHtml.replace(/\<script defer\>[^\<]+\<\/script\>/gi, '');
      newHtml += `\n\n<script>
      var s = document.getElementById("idCriHeader").value;
      var decodeHeader = CryptoJS.enc.Base64.parse(s);
      var words = decodeHeader.words;
      var decHeader="";
      for(i=0; i < decodeHeader.sigBytes; i++)
      {
        var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        var bite2 = bite ^ 0x6b;
        decHeader = decHeader + String.fromCharCode(bite2);
      }
      decHeader = decHeader.replace(/\\r\\n/gi, '||');
      decHeader = decHeader.replace(/\\n/gi, '||');
      Cri_Header_parser(decHeader);
      Cri_Check_Pwd("2218149759");
      CriDisplayBody();
      </script>`;

      console.log("dom" + String(htmlNum) + " parsing start...");
      dom = new JSDOM(newHtml, { runScripts: "dangerously" });
      finalText = dom.window.document.getElementById('CriMsgPosition').contentWindow.document.querySelector("table").textContent;
      textArr = finalText.split("\n");
      textArr = textArr.filter((i) => { return (i.trim() !== ""); });
      textArr = new FindIndex(textArr.map((i) => { return i.trim(); }));
      spotTargets = [
        { word: "번호", not: "상호", regxp: true, between: 1, start: 1, column: "business" },
        { word: "상호\\(", not: "성명", regxp: true, between: 0, start: 0, column: "company" },
        { word: "성명", not: "사업장", regxp: false, between: 0, start: 0, column: "name" },
        { word: "사업장", not: "업태", regxp: false, between: 0, start: 0, column: "address" },
        { word: "업태", not: "종목", regxp: false, between: 0, start: 0, column: "status" },
        { word: "종목", not: "이메일", regxp: false, between: 0, start: 0, column: "detail" },
        { word: "이메일", not: "이메일", regxp: false, between: 0, start: 0, column: "email" },
      ];
      resultObj = new TaxBill(null);
      resultObj.make(textArr[2], date);

      for (let { word, not, regxp, between, start, column } of spotTargets) {
        tempArr = textArr.findIndexAll(word, regxp, between, start);
        if (tempArr.length < 2) {
          throw new Error("invaild text");
        }
        resultObj.who.from[column] = textArr[tempArr[0] + 1] === not ? "" : textArr[tempArr[0] + 1];
        resultObj.who.to[column] = textArr[tempArr[1] + 1] === not ? "" : textArr[tempArr[1] + 1];
      }

      tempArr = textArr.findIndexAll("비고");
      if (tempArr.length < 2) {
        throw new Error("invaild text");
      }
      itemStart = tempArr[1] + 1;
      tempArr = textArr.findIndexAll("합계금액");
      if (tempArr.length < 1) {
        throw new Error("invaild text");
      }
      itemEnd = tempArr[0] - 1;

      textArr = Array.from(textArr);
      textArr = textArr.slice(itemStart, itemEnd + 1);

      startNums = [];
      for (let i = 0; i < textArr.length; i++) {
        if (i !== textArr.length - 1) {
          if (/^[0-1][0-9]$/.test(textArr[i].trim())) {
            if (/^[0-9][0-9]$/.test(textArr[i + 1].trim())) {
              startNums.push(i);
            }
          }
        }
      }

      orderArr = [];
      for (let i = 0; i < startNums.length; i++) {
        if (i === startNums.length - 1) {
          orderArr.push([ startNums[i], textArr.length ]);
        } else {
          orderArr.push([ startNums[i], startNums[i + 1] ]);
        }
      }

      items = [];
      for (let i = 0; i < orderArr.length; i++) {
        tempArr = [];
        num = 0;
        for (let j = orderArr[i][0]; j < orderArr[i][1]; j++) {
          if (num === 0) {
            if (/^[0-1][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item month error");
            }
          } else if (num === 1) {
            if (/^[0-4][0-9]$/.test(textArr[j].trim())) {
              tempArr.push(textArr[j].trim());
            } else {
              throw new Error("item date error");
            }
          } else if (num === 2) {

            tempNum = orderArr[i][1] - orderArr[i][0];
            if (tempNum === 9) {
              for (let k = 0; k < 7; k++) {
                tempArr.push(textArr[j + k]);
              }
            } else if (tempNum === 8) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
                tempArr.push("");
              } else {
                tempArr.push("");
                for (let k = 0; k < 6; k++) {
                  tempArr.push(textArr[j + k]);
                }
              }
            } else if (tempNum === 7 || tempNum === 6 || tempNum === 5) {
              if (/[0-9\,\-]/g.test(textArr[orderArr[i][1] - 1].trim()) && textArr[orderArr[i][1] - 1].replace(/[0-9\,\-]/g, '') === '') {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
                tempArr.push("");
              } else {
                tempArr.push(textArr[j].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j]);
                tempArr.push(textArr[j + 1].replace(/[0-9\,\-]/g, '') === '' ? "" : textArr[j + 1]);
                tempArr.push(1);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 3]);
                tempArr.push(textArr[orderArr[i][1] - 2]);
                tempArr.push(textArr[orderArr[i][1] - 1]);
              }
            } else if (tempNum === 4) {
              tempArr.push("");
              tempArr.push("");
              tempArr.push(1);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j]);
              tempArr.push(textArr[j + 1]);
              tempArr.push("");
            } else {
              throw new Error("item error");
            }
          }
          num++;
        }
        items.push(tempArr);
      }

      supplySum = 0;
      vatSum = 0;

      for (let arr of items) {
        tempObj = {
          month: Number(arr[0].replace(/^0/, '')),
          date: Number(arr[1]),
          name: arr[2],
          ea: arr[3],
          amount: Number(arr[4]),
          unit: Number(arr[5].replace(/[^0-9\-]/g, '')),
          supply: Number(arr[6].replace(/[^0-9\-]/g, '')),
          vat: Number(arr[7].replace(/[^0-9\-]/g, '')),
          etc: arr[8]
        };
        resultObj.items.push(tempObj);
        supplySum += tempObj.supply;
        vatSum += tempObj.vat;
      }

      resultObj.sum.total = supplySum + vatSum;
      resultObj.sum.supply = supplySum;
      resultObj.sum.vat = vatSum;

      console.log(resultObj);
      resultObjTong.push(resultObj);
      htmlNum++;

    }

    resultObjTong.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
    for (let json of resultObjTong) {
      rows = await back.mongoRead("taxBill", { id: json.id }, { selfMongo });
      if (rows.length === 0) {
        await back.mongoCreate("taxBill", json, { selfMongo });
        console.log("mongo insert");
        if (json.who.from.business !== "221-81-49759") {
          await slack_bot.chat.postMessage({ text: json.toMessage(), channel: "#701_taxbill" });
        }
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    await MONGOLOCALC.close();
    await slack_bot.chat.postMessage({ text: "taxBill success : " + JSON.stringify(new Date()), channel: "#error_log" });
  }
}

module.exports = BillMaker;
