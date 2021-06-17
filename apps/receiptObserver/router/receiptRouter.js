const ReceiptRouter = function (MONGOC, MONGOLOCALC) {
  if (MONGOC === undefined || MONGOC === null || MONGOLOCALC === undefined || MONGOLOCALC === null) {
    throw new Error("must be mongo, mongo_local connection");
  }
  this.dir = process.cwd() + "/apps/receiptObserver";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleCalendar = require(`${process.cwd()}/apps/googleAPIs/googleCalendar.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.calendar = new GoogleCalendar();
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
}

ReceiptRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      res.set({
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(String(ip).replace(/[^0-9\.]/gi, ''));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_generalMongo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalMongo";
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      if (req.body.collection === undefined) {
        throw new Error("must be collection name");
      }
      if (req.body.db === undefined) {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, python ] => instance.mongolocal )");
      }
      const { mode, db, collection } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;

      if (db === "core" || db === "back" || db === "mongo") {
        selfMongo = instance.mongo;
      } else if (db === "sub" || db === "local" || db === "python") {
        selfMongo = instance.mongolocal;
      } else {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
      } else if (mode === "update") {
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery and updateQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
        if (result.length === 0) {
          await back.mongoCreate(collection, updateQuery, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        }
        result = { message: "done" };
      } else if (mode === "create") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        await back.mongoCreate(collection, updateQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "delete") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "sse") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
        if (result.length === 0) {
          await back.mongoCreate(collection, { id: "sse", order: [ updateQuery ] }, { selfMongo });
        } else {
          result[0].order.push(updateQuery);
          await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
        }
        await fileSystem(`write`, [ instance.dir + "/log/" + collection + "_latest.json", JSON.stringify([ 0 ]) ]);
        result = { message: "done" };
      } else {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.rou_post_cashReceipt = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem, slack_bot, dateToString, autoComma } = this.mother;
  class CashOut {
    constructor(o) {
      this.id = o.id;
      this.date = o.time;
      this.deal = o.deal;
      this.method = 0;
      this.amount = {
        supply: o.supply,
        vat: o.vat,
        service: o.service,
        total: o.total,
      };
      this.etc = {
        business: o.method,
        remark: o.etc,
        issuance: o.issuance
      };
    }
    toMessage() {
      let arr;
      arr = [
        `현금 영수증(${this.id}) ${dateToString(this.date, true)}`,
        ``,
        `- 종류 : ${this.method === 0 ? "매출" : "매입"}`,
        `- 공급가 : ${autoComma(this.amount.supply)}원`,
        `- 세액 : ${autoComma(this.amount.vat)}원`,
        `- 소비자가 : ${autoComma(this.amount.total)}원`,
      ];
      return arr.join("\n");
    }
  }
  class CashIn {
    constructor(o) {
      this.id = o.id;
      this.date = o.time;
      this.deal = o.deal;
      this.method = 1;
      this.who = {
        business: o.business,
        company: o.from
      };
      this.amount = {
        supply: o.supply,
        vat: o.vat,
        service: o.service,
        total: o.total,
      };
      this.etc = {
        item: o.item,
        remark: o.etc,
        issuance: o.issuance
      };
    }
    toMessage() {
      let arr;
      arr = [
        `현금 영수증(${this.id}) ${dateToString(this.date, true)}`,
        ``,
        `- 종류 : ${this.method === 0 ? "매출" : "매입"}`,
        `- 수신자 : ${this.who.company} (${this.who.business})`,
        `- 품목 : ${this.item}`,
        `- 공급가 : ${autoComma(this.amount.supply)}원`,
        `- 세액 : ${autoComma(this.amount.vat)}원`,
        `- 소비자가 : ${autoComma(this.amount.total)}원`,
      ];
      return arr.join("\n");
    }
  }
  // method 0 : input / 1 : output

  let obj = {};
  obj.link = "/cashReceipt";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const json = equalJson(req.body.json);
      const collection = "cashReceipt";
      const selfMongo = instance.mongolocal;
      let rows;

      if (json.cashOut !== undefined) {

        const { cashOut: cashOut_raw } = json;
        let cashOut;

        cashOut = [];
        for (let arr of cashOut_raw) {
          for (let obj of arr) {
            cashOut.push(new CashOut(obj));
          }
        }

        for (let obj of cashOut) {
          rows = await back.mongoRead(collection, { $and: [ { method: 0 }, { id: obj.id } ] }, { selfMongo });
          if (rows.length === 0) {
            await back.mongoCreate(collection, obj, { selfMongo });
          }
        }

      } else if (json.cashIn !== undefined) {

        const { cashIn: cashIn_raw } = json;
        let cashIn;

        cashIn = [];
        for (let arr of cashIn_raw) {
          for (let obj of arr) {
            cashIn.push(new CashIn(obj));
          }
        }

        for (let obj of cashIn) {
          rows = await back.mongoRead(collection, { $and: [ { method: 1 }, { id: obj.id } ] }, { selfMongo });
          if (rows.length === 0) {
            console.log(obj);
            await slack_bot.chat.postMessage({ text: obj.toMessage(), channel: "#701_taxbill" });
            await back.mongoCreate(collection, obj, { selfMongo: instance.mongolocal });
          }
        }

      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

ReceiptRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(ReceiptRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = ReceiptRouter;
