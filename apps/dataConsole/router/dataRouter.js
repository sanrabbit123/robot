const DataRouter = function (MONGOC) {
  this.dir = process.cwd() + "/apps/dataConsole";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const DataPatch = require(`${this.dir}/router/dataPatch.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.patch = new DataPatch();
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
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

//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents" ];
  obj.func = async function (req, res) {
    try {
      let standard, raw_data, data;

      if (req.url === "/getClients") {
        standard = instance.patch.clientStandard();
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestClients(req.body.limit, { withTools: true, selfMongo: instance.mongo });
          } else {
            raw_data = await instance.back.getLatestClients("all", { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getClientsByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await instance.back.getClientsByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo });
          }
        }
      } else if (req.url === "/getDesigners") {
        standard = instance.patch.designerStandard();
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestDesigners(req.body.limit, { withTools: true, selfMongo: instance.mongo });
          } else {
            raw_data = await instance.back.getLatestDesigners("all", { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getDesignersByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await instance.back.getDesignersByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo });
          }
        }
      } else if (req.url === "/getProjects") {
        standard = instance.patch.projectStandard();
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestProjects(req.body.limit, { withTools: true, selfMongo: instance.mongo });
          } else {
            raw_data = await instance.back.getLatestProjects("all", { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getProjectsByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await instance.back.getProjectsByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo });
          }
        }
      } else if (req.url === "/getContents") {
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestContentsArr(req.body.limit, { withTools: true, selfMongo: instance.mongo });
          } else {
            raw_data = await instance.back.getLatestContentsArr("all", { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getContentsArrByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await instance.back.getContentsArrByQuery(JSON.parse(req.body.where), { withTools: true, selfMongo: instance.mongo });
          }
        }
      }

      if (req.body.noFlat === undefined && req.url !== "/getContents") {
        data = raw_data.flatDeath();
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(raw_data));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchDocuments = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners" ];
  obj.func = async function (req, res) {
    try {
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let data;
      let rawJson;

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
      }

      mapArr = Object.values(map);

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

      if (req.url === "/searchClients") {
        rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchProjects") {
        rawJson = await instance.back.getProjectsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchDesigners") {
        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      }

      if (req.body.noFlat === undefined) {
        data = rawJson.flatDeath();
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

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
      let temp, temp2, temp3;
      let tempFunction;

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
            if (value.length === 10) {
              temp = value.split('-');
              finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
            } else {
              temp = value.split(' ');
              temp2 = temp[0].split('-');
              temp3 = temp[1].split(':');
              finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
            }
          } else {
            finalValue = new Date(pastValue);
          }
          break;
        case "boolean":
          if (value === "true") {
            finalValue = true;
          } else if (value === "false") {
            finalValue = false;
          } else {
            finalValue = Boolean(value);
          }
          break;
        case "array":
          finalValue = [];
          valueTemp = value.split(", ");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
        case "object":
          tempFunction = new Function("value", "pastValue", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue);
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

DataRouter.prototype.rou_post_rawUpdateDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents" ];
  obj.func = async function (req, res) {
    try {
      let raw_data;
      let whereQuery, updateQuery;

      whereQuery = JSON.parse(req.body.where);

      if (req.body.updateQuery === undefined) {
        updateQuery = {};
        if (/^\{/.test(req.body.updateValue) || /^\[/.test(req.body.updateValue)) {
          updateQuery[req.body.target] = JSON.parse(req.body.updateValue);
        } else if (req.body.updateValue === "today") {
          updateQuery[req.body.target] = new Date();
        } else {
          updateQuery[req.body.target] = req.body.updateValue;
        }
      } else {
        updateQuery = JSON.parse(req.body.updateQuery);
      }

      if (req.url === "/rawUpdateClient") {
        raw_data = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateDesigner") {
        raw_data = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateProject") {
        raw_data = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateContents") {
        raw_data = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_deleteDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/deleteClient", "/deleteDesigner", "/deleteProject", "/deleteContents" ];
  obj.func = async function (req, res) {
    try {
      if (req.url === "/deleteClient") {
        await instance.back.deleteClient(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteDesigner") {
        await instance.back.deleteDesigner(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteProject") {
        await instance.back.deleteProject(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteContents") {
        await instance.back.deleteContents(req.body.id, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/createClient", "/createDesigner", "/createProject", "/createContents" ];
  obj.func = async function (req, res) {
    try {
      const updateQuery = JSON.parse(req.body.updateQuery);

      if (req.url === "/createClient") {
        await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createDesigner") {
        await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createProject") {
        updateQuery["proposal.date"] = new Date();
        await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createContents") {
        await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));
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

DataRouter.prototype.rou_post_sendSlack = function () {
  const instance = this;
  const back = this.back;
  const slack = this.mother.slack_bot;
  const url = require('url');
  let obj = {};
  obj.link = "/sendSlack";
  obj.func = async function (req, res) {
    try {
      let link;
      let link_index;
      let row_message, new_message;
      let query;
      let requrl;

      query = JSON.parse(req.body.query);

      link = '';
      link_index = 0;
      row_message = '';
      new_message = '';

      if (req.body.linkmake !== undefined) {
        requrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.body.link,
        });

        link += requrl + '?';
        for (let i of query) {
          link += i.standard + '=' + i.value + '&'
        }
        link = link.slice(0, -1);

        row_message = req.body.message;
        link_index = row_message.search(/link:/g);
        new_message = row_message.slice(0, link_index) + "link: " + link + row_message.slice(link_index + 6);

        await slack.chat.postMessage({ text: new_message, channel: req.body.channel });
      } else {
        await slack.chat.postMessage({ text: req.body.message, channel: req.body.channel });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSheets = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/sendSheets";
  obj.func = async function (req, res) {
    try {
      const values = JSON.parse(req.body.values);
      let sheetsId, response;
      if (req.body.newMake !== undefined) {
        sheetsId = await sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId);
        await sheets.update_value_inPython(sheetsId, '', values, [ 0, 0 ]);
        await sheets.setting_cleanView_inPython(sheetsId);
        response = await drive.read_webView_inPython(sheetsId);
      }
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: response }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

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
