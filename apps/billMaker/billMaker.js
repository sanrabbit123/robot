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
        name: "디자인 용역비",
        description: "",
        ea: "식",
        number: (method, distance) => { return 1; },
        amount: (method, amount, distance) => { return ((/^off/gi.test(method) ? amount - (distance.number * distance.amount) : amount) * 0.8) },
      },
      {
        id: "_idsg",
        class: "designSupervising",
        name: "디자인 감리비",
        description: "",
        ea: "식",
        number: (method, distance) => { return 1; },
        amount: (method, amount, distance) => { return ((/^off/gi.test(method) ? amount - (distance.number * distance.amount) : amount) * 0.2) },
      },
      {
        id: "_ites",
        class: "travelExpenses",
        name: "출장비",
        description: "",
        ea: "회",
        number: (method, distance) => { return (/^off/gi.test(method) ? distance.number : 0); },
        amount: (method, amount, distance) => { return (/^off/gi.test(method) ? distance.amount : 0) },
      },
    ],
    comments: [
      "스타일링 견적서에 대한 안내 문구입니다.",
      "출장 횟수를 초과할 경우, 출장비가 추가 청구될 수 있습니다."
    ]
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

BillMaker.prototype.createStylingBill = async function (proid, desid, option = { selfMongo: null, selfCoreMongo: null, selfLocalMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo, mongolocalinfo } = this.mother;
  const constNames = {
    class: BillMaker.billDictionary.styling.class,
    name: BillMaker.billDictionary.styling.name,
  };
  const stylingItems = BillMaker.billDictionary.styling.items;
  const stylingComments = BillMaker.billDictionary.styling.comments;
  const vatRatio = 0.1;
  try {
    let MONGOC, MONGOCOREC, MONGOLOCALC;
    let selfBoo, selfCoreBoo, selfLocalBoo;
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
    if (option.selfLocalMongo === undefined || option.selfLocalMongo === null) {
      selfLocalBoo = false;
    } else {
      selfLocalBoo = true;
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
    if (!selfLocalBoo) {
      MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
      await MONGOLOCALC.connect();
    } else {
      MONGOLOCALC = option.selfLocalMongo;
    }

    const project = await back.getProjectById(proid, { selfMongo: MONGOCOREC });
    if (project === null) {
      throw new Error("no project error");
    }
    const client = await back.getClientById(project.cliid, { selfMongo: MONGOCOREC });
    if (client === null) {
      throw new Error("no client error");
    }
    const targetProposal = project.selectProposal(desid);
    if (targetProposal === null) {
      throw new Error("invaild desid");
    }
    const { fee } = targetProposal;
    if (fee.length === 0) {
      throw new Error("invaild proposal");
    }
    const designerHistory = await back.getHistoryById("designer", desid, { selfMongo: MONGOLOCALC });
    if (designerHistory === null) {
      throw new Error("designer history error");
    }
    const members = await back.setMemberObj({ selfMongo: MONGOCOREC, getMode: true });
    if (!Array.isArray(members) || members.length === 0) {
      throw new Error("no member error");
    }
    let thisMember;
    let bilid, bilidArr;
    let whereQuery, updateQuery;
    let tempObj, tempObj2;
    let clientSelectMethod;
    let res;

    thisMember = null;
    for (let obj of members) {
      if (obj.name === designerHistory.manager) {
        thisMember = obj;
      }
    }
    if (thisMember === null) {
      thisMember = members[0];
    }

    clientSelectMethod = [];
    if (option.method !== undefined && typeof option.method === "string" && [ "offline", "online" ].includes(option.method)) {
      clientSelectMethod.push(option.method);
    } else {
      clientSelectMethod = [ "offline", "online" ];
    }

    bilidArr = [];
    for (let { method, partial, amount, distance } of fee) {
      if (clientSelectMethod.includes(method.trim())) {
        bilid = await this.createBill({}, { selfMongo: MONGOC });
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

        tempObj = this.returnBillDummies("requests");
        tempObj.id = bilid + "_r" + String(0);
        tempObj.info.push({ address: client.requests[0].request.space.address.value });
        tempObj.info.push({ pyeong: client.requests[0].request.space.pyeong.value });
        tempObj.info.push({ method });
        for (let item of stylingItems) {
          tempObj2 = JSON.parse(JSON.stringify(this.returnBillDummies("items")));
          tempObj2.id = bilid + item.id;
          tempObj2.class = item.class;
          tempObj2.name = item.name;
          tempObj2.description = item.description;
          tempObj2.unit.ea = item.ea;
          tempObj2.unit.price = Math.round(item.amount(method, amount, distance));
          tempObj2.unit.number = item.number(method, distance);
          tempObj2.amount.supply = Math.round(tempObj2.unit.price * tempObj2.unit.number);
          tempObj2.amount.vat = Math.round(tempObj2.amount.supply * vatRatio);
          tempObj2.amount.consumer = Math.round(tempObj2.amount.supply * (1 + vatRatio));
          tempObj.items.push(tempObj2);
        }
        updateQuery["requests"] = [ tempObj ];

        updateQuery["comments"] = [];
        for (let c of stylingComments) {
          updateQuery["comments"].push(c);
        }

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
    if (!selfLocalBoo) {
      await MONGOLOCALC.close();
    }

    return bilidArr;

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.createConstructBill = async function (proid, option = { selfMongo: null, selfCoreMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo } = this.mother;
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
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












    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

  } catch (e) {
    console.log(e);
  }
}

BillMaker.prototype.createPhotoBill = async function (proid, option = { selfMongo: null, selfCoreMongo: null }) {
  const instance = this;
  const back = this.back;
  const { mongo, mongoinfo, mongopythoninfo } = this.mother;
  try {
    let MONGOC, MONGOCOREC;
    let selfBoo, selfCoreBoo;
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











    if (!selfBoo) {
      await MONGOC.close();
    }
    if (!selfCoreBoo) {
      await MONGOCOREC.close();
    }

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
