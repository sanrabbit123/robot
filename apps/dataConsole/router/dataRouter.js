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
}

//STATIC --------------------------------------------------------------------------

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

//GET --------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = function (req, res) {
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
      res.send(JSON.stringify({ standard, data }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] }
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
