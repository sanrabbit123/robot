const DataRouter = function (MONGOC) {
  this.dir = process.cwd() + "/apps/dataConsole";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.patch = new DataPatch();
  if (MONGOC !== undefined && MONGOC !== null) {
    this.mongo = MONGOC;
  }
  this.pythonApp = this.dir + "/python/app.py";
}

//STATIC FUNCTIONS --------------------------------------------------------------------------

DataRouter.baseMaker = function (target) {
  const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`);
  let dataPatchScript, html;
  let prototypes;

  prototypes = Object.keys(DataPatch.prototype);

  dataPatchScript = `const DataPatch = new Function();\n`;
  if (target === "client") {
    for (let i of prototypes) {
      if (/^client/.test(i)) {
        dataPatchScript += `DataPatch.${i} = ${DataPatch.prototype[i].toString().replace(/\n/g, '')};\n`;
      }
    }
  }
  html = `<!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      <link href="/font/fonts.css" rel="stylesheet">
      <style></style>
      <script>${dataPatchScript}</script>
    </head>
    <body>
      <div id="totalcontents"></div>
      <script src="${target}.js"></script>
    </body>
  </html>`
  return html;
}

DataRouter.queryFilter = function (str) {
  str = str.replace(/[|\\\/\[\]\{\}\(\)\<\>!@#\$\%\^\&\*\=\+\?]/g, '');
  str = str.replace(/\n/g, '');
  str = str.replace(/\t/g, '');
  return str;
}

//GENERAL METHODS ---------------------------------------------------------------------------------

DataRouter.prototype.getDateMatrix = async function (length = 6) {
  const instance = this;
  try {
    const today = new Date();
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrix" ], { length });

    let year, month;
    let day0, day1, day2;
    let dateString0, dateString1;

    resultArr = [];
    for (let j = 0; j < dateMatrix.length; j++) {

      year = today.getFullYear();
      month = today.getMonth() + 1 - j;

      year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
      month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);

      middleResultArr = [];
      for (let i = 0; i < dateMatrix[j].length; i++) {
        resultFatorArr = [];

        day0 = dateMatrix[j][i][0];
        resultFatorArr.push(new Date(year, month - 1, day0));

        day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];
        resultFatorArr.push(new Date(year, month - 1, day1));

        if (i !== dateMatrix[j].length - 1) {
          day2 = dateMatrix[j][i + 1][0];
          resultFatorArr.push(new Date(year, month - 1, day2));
        } else {
          day2 = 1;
          if (month === 12) {
            resultFatorArr.push(new Date(year + 1, 0, day2));
          } else {
            resultFatorArr.push(new Date(year, month, day2));
          }
        }

        middleResultArr.push(resultFatorArr);
      }

      resultArr.push(middleResultArr);
    }

    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

//GET ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = async function (req, res) {
    try {
      res.set("Content-Type", "text/html");
      res.send("hello?");
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  let obj = {};
  obj.link = "/:id";
  obj.func = function (req, res) {
    try {
      const html = DataRouter.baseMaker(req.params.id);
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClients = function () {
  const instance = this;
  let obj = {};
  obj.link = "/getClients";
  obj.func = async function (req, res) {
    try {
      const standard = instance.patch.clientStandard();
      const clients = await instance.back.getLatestClients(req.body.limit, { withTools: true, selfMongo: instance.mongo });
      const data = clients.flatDeath();
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ standard, data }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchClients = function () {
  const instance = this;
  let obj = {};
  obj.link = "/searchClients";
  obj.func = async function (req, res) {
    try {
      const standard = instance.patch.clientStandard();
      const map = instance.patch.clientMap();
      const mapArr = Object.values(map);
      let searchQuery, searchArr, tempObj, tempObj2;

      searchQuery = {};
      searchArr = [];

      for (let { position, searchBoo } of mapArr) {
        if (searchBoo) {
          tempObj = {};
          tempObj2 = {};
          if (req.body.query !== "") {
            tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
          } else {
            tempObj["$regex"] = new RegExp('.', 'gi');
          }
          tempObj2[position] = tempObj["$regex"];
          searchArr.push(tempObj2);
        }
      }

      searchQuery["$or"] = searchArr;

      const clients = await instance.back.getClientsByQuery(searchQuery, { withTools: true, limit: 300, selfMongo: instance.mongo });
      const data = clients.flatDeath();
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ standard, data }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

//POST --------------------------------------------------------------------------

DataRouter.prototype.rou_post_updateClient = function () {
  const instance = this;
  let obj = {};
  obj.link = "/updateClient";
  obj.func = async function (req, res) {
    try {
      const { thisId, requestIndex, column, value, pastValue } = req.body;
      const map = instance.patch.clientMap();
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp;

      switch (map[column].type) {
        case "string":
          finalValue = String(value);
          break;
        case "number":
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
          break;
        case "date":
          if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
            finalValue = new Date(value);
          } else {
            finalValue = new Date(pastValue);
          }
          break;
        case "boolean":
          finalValue = Boolean(value);
          break;
        case "array":
          finalValue = [];
          valueTemp = value.split("__split__");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
        default:
          throw new Error("invaild type");
      }

      updateQuery = {};
      updateQuery[map[column].position.replace(/\.0\./, ("." + requestIndex + "."))] = finalValue;

      whereQuery = {};
      whereQuery[map.cliid.position] = thisId;

      message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return String(number);
    }
  }

  let obj = {};
  obj.link = "/getClientReport";
  obj.func = async function (req, res) {
    try {
      const today = new Date();
      let dateMatrix;
      let searchQuery, clients, proposals, contracts;
      let resultArr;
      let obj;
      let searchBoo;

      if (req.body.month === undefined) {
        if (req.body.startYear === undefined) {
          req.body.month = 8;
          searchBoo = false;
        } else {
          let { startYear, startMonth, endYear, endMonth } = req.body;
          startYear = Number(startYear);
          startMonth = Number(startMonth.replace(/^0/, ''));
          endYear = Number(endYear);
          endMonth = Number(endMonth.replace(/^0/, ''));
          req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;
          req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);
          searchBoo = true;
        }
      } else {
        searchBoo = false;
      }

      if (!searchBoo) {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
      } else {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
        for (let i = 0; i < req.body.endMonth; i++) {
          dateMatrix.shift();
        }
      }

      resultArr = [];

      for (let matrix of dateMatrix) {
        monthArr = [];
        for (let arr of matrix) {
          obj = {};
          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": arr[0], "$lt": arr[2] } } } };
          clients = await instance.back.getClientsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.client = clients.length;

          //proposal
          searchQuery = { "proposal.date": { "$gte": arr[0], "$lt": arr[2] } };
          proposals = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.proposal = proposals.length;

          //contract
          searchQuery = { "process.contract.first.date": { "$gte": arr[0], "$lt": arr[2] } };
          contracts = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.contract = contracts.length;

          monthArr.push(obj);
        }
        resultArr.push(monthArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}


//DEV --------------------------------------------------------------------------
//DEV --------------------------------------------------------------------------
//DEV --------------------------------------------------------------------------


DataRouter.prototype.rou_post_select = function () {
  let instance = this;
  let obj = { link: '/post_select' }
  obj.func = async function (req, res) {
    try {
      let col_arr, temp, temp2, find_obj, where_obj, or_arr, rows, sort_obj;
      col_arr = {}
      if (req.body.col_arr !== 'all') {
        temp = req.body.col_arr.split(',');
        for (let i of temp) {
          col_arr[i] = 1;
        }
      }
      find_obj = {}
      if (req.body.standard !== 'all' && req.body.standard !== 'multi') {
        temp = {}
        temp["$regex"] = new RegExp(req.body.where, 'gi');
        find_obj[req.body.standard] = temp;
      } else if (req.body.standard === 'multi') {
        or_arr = []
        where_obj = JSON.parse(req.body.where);
        for (let z in where_obj) {
          temp = {}
          temp2 = {}
          temp["$regex"] = new RegExp(where_obj[z], 'gi');
          temp2[z] = temp;
          or_arr.push(temp2);
        }
        find_obj["$or"] = or_arr;
      }
      sort_obj = {}
      if (req.body.sort !== undefined && req.body.limit === undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).toArray();
      } else if (req.body.sort === undefined && req.body.limit !== undefined) {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).limit(Number(req.body.limit)).toArray();
      } else if (req.body.sort !== undefined && req.body.limit !== undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).limit(Number(req.body.limit)).toArray();
      } else {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).toArray();
      }
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_mongoFind = function () {
  const instance = this;
  let obj = { link: '/post_mfind' }
  obj.func = async function (req, res) {
    try {
      let rows = await instance.mongo.db("miro81").collection(req.body.collection).find(JSON.parse(req.body.find1)).project(JSON.parse(req.body.find2)).toArray();
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_mongoUpdate = function () {
  const instance = this;
  let obj = { link: '/post_mupdate' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      let updateQuery = {}
      if ((/\[/g.test(req.body.v) && /\]/g.test(req.body.v)) || (/\{/g.test(req.body.v) && /\}/g.test(req.body.v))) {
        updateQuery[req.body.c] = JSON.parse(req.body.v);
      } else {
        updateQuery[req.body.c] = req.body.v;
      }
      console.log(updateQuery)
      await instance.mongo.db("miro81").collection(req.body.table).updateOne(whereQuery, { $set: updateQuery });
      res.send("success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_update = function () {
  const instance = this;
  let obj = { link: '/post_update' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      let updateQuery = {}
      if ((/\[/g.test(req.body.v) && /\]/g.test(req.body.v)) || (/\{/g.test(req.body.v) && /\}/g.test(req.body.v))) {
        updateQuery[req.body.c] = JSON.parse(req.body.v);
      } else {
        updateQuery[req.body.c] = req.body.v;
      }
      await instance.mongo.db("miro81").collection(req.body.table).updateOne(whereQuery, { $set: updateQuery });
      res.send("success");

    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_mongoDelete = function () {
  const instance = this;
  let obj = { link: '/post_mdelete' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      await instance.mongo.db("miro81").collection(req.body.table).deleteOne(whereQuery);
      res.send("delete success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_mongoInsert = function () {
  const instance = this;
  let obj = { link: '/post_minsert' }
  obj.func = async function (req, res) {
    try {
      await instance.mongo.db("miro81").collection(req.body.collection).insertOne(JSON.parse(req.body.obj));
      console.log(`insert success`);
      res.send(`insert success`);
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

//DEV --------------------------------------------------------------------------
//DEV --------------------------------------------------------------------------
//DEV --------------------------------------------------------------------------


//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(DataRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = DataRouter;
