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
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
}

//STATIC FUNCTIONS --------------------------------------------------------------------------

DataRouter.baseMaker = function (target) {
  const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  let dataPatchScript, html;
  let prototypes;

  prototypes = Object.keys(DataPatch.prototype);

  dataPatchScript = `const DataPatch = new Function();\n`;
  for (let i of prototypes) {
    if ((new RegExp("^" + target)).test(i) || /^tools/.test(i)) {
      dataPatchScript += `DataPatch.${i} = ${DataPatch.prototype[i].toString().replace(/\n/g, '')};\n`;
    }
  }
  html = `<!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      <style>
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoB00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoB00.woff') format('woff');
            font-weight: 700;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoR00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoR00.woff') format('woff');
            font-weight: 400;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoM00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoM00.woff') format('woff');
            font-weight: 500;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoEB00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoEB00.woff') format('woff');
            font-weight: 800;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoSB00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoSB00.woff') format('woff');
            font-weight: 600;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoUL00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoUL00.woff') format('woff');
            font-weight: 200;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoT00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoT00.woff') format('woff');
            font-weight: 100;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoH00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoH00.woff') format('woff');
            font-weight: 900;
            font-style: normal;
        }
        @font-face {
            font-family: 'sandoll';
            src: url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoL00.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/sandoll/AppleSDGothicNeoL00.woff') format('woff');
            font-weight: 300;
            font-style: normal;
        }
        @font-face {
            font-family: 'Futura';
            src: url('${ADDRESS.s3info.host}/designSource/font/futura/Futura-Medium.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/futura/Futura-Medium.woff') format('woff');
            font-weight: 500;
            font-style: normal;
        }
        @font-face {
            font-family: 'Futura';
            src: url('${ADDRESS.s3info.host}/designSource/font/futura/Futura-Bold.woff2') format('woff2'),
                url('${ADDRESS.s3info.host}/designSource/font/futura/Futura-Bold.woff') format('woff');
            font-weight: 600;
            font-style: normal;
        }
      </style>
      <script>${dataPatchScript}</script>
    </head>
    <body>
      <div id="totalcontents"></div>
      <script src="${target}.js"></script>
    </body>
  </html>`;

  return html;
}

DataRouter.queryFilter = function (str) {
  str = str.replace(/[|\\\/\[\]\{\}\(\)\<\>!@#\$\%\^\&\*\=\+\?]/g, '');
  str = str.replace(/\n/g, '');
  str = str.replace(/\t/g, '');
  return str;
}

DataRouter.dateToString = function (obj) {
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  return `${String(obj.getFullYear())}-${zeroAddition(obj.getMonth() + 1)}-${zeroAddition(obj.getDate())}`;
}

DataRouter.autoComma = function (str) {
  if (typeof str === "number") {
    str = String(str);
  }
  let minus;
  if (/\-/g.test(str)) { minus = /\-/g.exec(str)[0]; }
  else { minus = ''; }
  let num = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (num.length < 4) {
    return minus + num;
  } else if (num.length < 7) {
    tmp += num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else if (num.length < 10) {
    tmp += num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  } else {
    tmp += num.slice(-12, -9) + ',' + num.slice(-9, -6) + ',' + num.slice(-6, -3) + ',' + num.slice(-3);
    return minus + tmp;
  }
  return minus + num;
}

DataRouter.stringFilter = function (str) {
  let filtered;
  filtered = str.replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/^ /g, '').replace(/ $/g, '');
  filtered = filtered.replace(/^\n/, '');
  filtered = filtered.replace(/\n$/, '');
  filtered = filtered.replace(/\n\n/g, '\n');
  filtered = filtered.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9a-zA-Z\)\(\.\,\?\!\/\'\"\;\:\@\#\$\%\&\*\-\_\+\=\n\t ]/g, '');
  filtered = filtered.replace(/^ /g, '');
  filtered = filtered.replace(/ $/g, '');
  filtered = filtered.replace(/  /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/      /g, ' ');
  filtered = filtered.replace(/     /g, ' ');
  filtered = filtered.replace(/    /g, ' ');
  filtered = filtered.replace(/   /g, ' ');
  filtered = filtered.replace(/  /g, ' ');
  return filtered;
}

DataRouter.notionArrRefine = function (arr) {
  let target;
  let targetTong;
  target = [];
  for (let obj of arr) {
    if (obj.title_plaintext !== undefined && obj.title_plaintext !== '') {
      targetTong = {};
      targetTong.title_plaintext = DataRouter.stringFilter(obj.title_plaintext);
      if (obj.children !== undefined) {
        targetTong.children = DataRouter.notionArrRefine(obj.children);
      }
      target.push(targetTong);
    }
  }
  return target;
}

DataRouter.objectToFlat = function (arr) {
  let totalString;
  let temp, tempArr;
  totalString = '';
  for (let obj of arr) {
    totalString += obj.title_plaintext;
    totalString += "__split__";
    if (obj.children !== undefined) {
      temp = DataRouter.objectToFlat(obj.children);
      tempArr = temp.split("__split__");
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = "- " + tempArr[i];
      }
      totalString += tempArr.join("__split__");
      totalString += "__split__";
    }
  }
  totalString = totalString.slice(0, -9);
  return totalString;
}

DataRouter.splitToSpace = function (str) {
  return str.replace(/__split__/g, '\n');
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
    let resultArr, middleResultArr, resultFactorArr;

    resultArr = [];
    for (let j = 0; j < dateMatrix.length; j++) {

      year = today.getFullYear();
      month = today.getMonth() + 1 - j;

      year = today.getFullYear() + Math.floor(month / 12) + ((month % 12) === 0 ? -1 : 0);
      month = (month % 12) > 0 ? (month % 12) : 12 + (month % 12);

      middleResultArr = [];
      for (let i = 0; i < dateMatrix[j].length; i++) {
        resultFactorArr = [];

        day0 = dateMatrix[j][i][0];
        resultFactorArr.push(new Date(year, month - 1, day0));

        day1 = dateMatrix[j][i][dateMatrix[j][i].length - 1];
        resultFactorArr.push(new Date(year, month - 1, day1));

        if (i !== dateMatrix[j].length - 1) {
          day2 = dateMatrix[j][i + 1][0];
          resultFactorArr.push(new Date(year, month - 1, day2));
        } else {
          day2 = 1;
          if (month === 12) {
            resultFactorArr.push(new Date(year + 1, 0, day2));
          } else {
            resultFactorArr.push(new Date(year, month, day2));
          }
        }
        middleResultArr.push(resultFactorArr);
      }
      resultArr.push(middleResultArr);
    }

    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

DataRouter.prototype.getCalendar = async function (length = 12) {
  const instance = this;
  try {
    const dateMatrix = await this.mother.pythonExecute(this.pythonApp, [ "dateMatrixFullSet" ], { length });
    return dateMatrix;
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
      res.redirect("/client");
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
      let target;

      if (/^cl/i.test(req.params.id)) {
        target = "client";
      } else if (/^de/i.test(req.params.id)) {
        target = "designer";
      } else if (/^da/i.test(req.params.id)) {
        target = "dashboards";
      } else if (/^proj/i.test(req.params.id)) {
        target = "project";
      } else if (/^prop/i.test(req.params.id)) {
        target = "proposal";
      } else if (/^ana/i.test(req.params.id)) {
        target = "analytics";
      } else if (/^con/i.test(req.params.id)) {
        target = "contents";
      } else {
        target = "client";
      }

      const html = DataRouter.baseMaker(target);
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Address = function () {
  const instance = this;
  let obj = {};
  obj.link = "/tools/address";
  obj.func = function (req, res) {
    try {
      const html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8">
        <style>*{margin:0}body{width:100vh;height:100vh;overflow:hidden}body::-webkit-scrollbar{display:none;}img{cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1}div{border:0;width:100vw;height:100vh;position:relative}</style><script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script></head><body><script>
        let div_clone, img_clone;div_clone = document.createElement("DIV");img_clone = document.createElement("IMG");img_clone.setAttribute("src", "https://t1.daumcdn.net/postcode/resource/images/close.png");img_clone.setAttribute("id", "btnFoldWrap");div_clone.appendChild(img_clone);document.body.appendChild(div_clone);
        new daum.Postcode({
            oncomplete: function (data) {
              let addr = '', extraAddr = '';
              if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) { extraAddr += data.bname; }
                if (data.buildingName !== '' && data.apartment === 'Y') { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
                if (extraAddr !== '') { extraAddr = ' (' + extraAddr + ')'; }
              } else { addr = data.jibunAddress; }
              const detail = prompt("상세주소를 입력해주세요! : " + addr + extraAddr);
              window.parent.postMessage(addr + extraAddr + " " + detail, '*');
            }, width : '100%', height : '100%' }).embed(div_clone);</script></body></html>`;
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
        standard = instance.patch.contentsStandard();
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

      if (req.body.noFlat === undefined) {
        data = raw_data.flatDeath();
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(raw_data.toNormal()));
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
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners", "/searchContents" ];
  obj.func = async function (req, res) {
    try {
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let whereQuery;
      let data;
      let rawJson;
      let filteredArr;

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
      } else if (req.url === "/searchContents") {
        standard = instance.patch.contentsStandard();
        map = instance.patch.contentsMap();
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
        if (/\/project/g.test(req.headers.referer)) {
          if (rawJson.length === 0) {
            mapArr = Object.values(instance.patch.clientMap());
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
            if (req.body.query !== "") {
              rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
            } else {
              rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
            }

            whereQuery = {};
            whereQuery["$or"] = [];
            for (let client of rawJson) {
              whereQuery["$or"].push({ cliid: client.cliid });
            }

            if (whereQuery["$or"].length > 0) {
              rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
            } else {
              rawJson = [];
            }

          }

          filteredArr = [];
          for (let obj of rawJson) {
            if (obj.desid !== "") {
              filteredArr.push(obj);
            }
          }
          filteredArr.flatDeath = function () {
            let tong, tempArr;
            tong = [];
            for (let i of this) {
              tempArr = i.flatDeath();
              for (let j of tempArr) {
                tong.push(j);
              }
            }
            return tong;
          }

          rawJson = filteredArr;
        }
      } else if (req.url === "/searchDesigners") {
        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchContents") {
        rawJson = await instance.back.getContentsArrByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      }

      if (req.body.noFlat === undefined) {
        data = rawJson.flatDeath();
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson.toNormal()));
      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents" ];
  obj.func = async function (req, res) {
    try {
      let { thisId, requestIndex, column, value, pastValue, user } = req.body;
      let map;
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp, pastFinalValue, pastValueTemp;
      let temp, temp2, temp3;
      let tempFunction;
      let position;
      let userArr;
      let today;

      if (req.url === "/updateClient") {
        map = instance.patch.clientMap();
      } else if (req.url === "/updateDesigner") {
        map = instance.patch.designerMap();
      } else if (req.url === "/updateProject") {
        map = instance.patch.projectMap();
      } else if (req.url === "/updateContents") {
        map = instance.patch.contentsMap();
      }

      switch (map[column].type) {
        case "string":
          finalValue = String(value);
          pastFinalValue = String(pastValue);
          break;
        case "number":
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
          pastFinalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          break;
        case "date":
          if (value === "-" || value === "") {
            value = "1800-01-01";
          }
          if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
            if (value.length === 10) {
              temp = value.split('-');
              finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
            } else if (value.length === 19) {
              temp = value.split(' ');
              temp2 = temp[0].split('-');
              temp3 = temp[1].split(':');
              finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
            } else {
              finalValue = new Date(pastValue);
            }
          } else {
            finalValue = new Date(pastValue);
          }
          pastFinalValue = new Date(pastValue);
          break;
        case "boolean":
          if (value === "true") {
            finalValue = true;
          } else if (value === "false") {
            finalValue = false;
          } else {
            finalValue = Boolean(value);
          }
          pastFinalValue = Boolean(pastValue);
          break;
        case "array":
          finalValue = [];
          pastFinalValue = [];
          valueTemp = value.split(", ");
          pastValueTemp = pastValue.split(", ");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
          for (let i of pastValueTemp) {
            pastFinalValue.push(i);
          }
          break;
        case "object":
          tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue, false);
          pastFinalValue = tempFunction(pastValue, pastValue, false);
          break;
        default:
          throw new Error("invaild type");
      }

      updateQuery = {};
      position = map[column].position.replace(/\.0\./, ("." + requestIndex + "."));
      updateQuery[position] = finalValue;

      whereQuery = {};
      if (req.url === "/updateClient") {
        whereQuery[map.cliid.position] = thisId;
      } else if (req.url === "/updateDesigner") {
        whereQuery[map.desid.position] = thisId;
      } else if (req.url === "/updateProject") {
        whereQuery[map.proid.position] = thisId;
      } else if (req.url === "/updateContents") {
        whereQuery[map.conid.position] = thisId;
      }

      if (req.url === "/updateClient") {
        message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/updateDesigner") {
        message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/updateProject") {
        message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/updateContents") {
        message = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      //update log
      userArr = user.split("__split__");
      today = new Date();
      await instance.back.mongoCreate((req.url.replace(/^\//, '') + "Log"), {
        user: {
          name: userArr[0],
          email: userArr[1]
        },
        where: thisId,
        update: {
          target: position,
          value: finalValue,
          pastValue: pastFinalValue
        },
        date: today
      }, { local: null, console: true, selfMongo: null });

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
      let id;

      if (req.url === "/createClient") {
        id = await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createDesigner") {
        id = await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createProject") {
        updateQuery["proposal.date"] = new Date();
        id = await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createContents") {
        id = await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ id: id }));
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
      let searchQuery, clients, proposals, contracts, process;
      let processTong;
      let cliidArr;
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

          //process start
          cliidArr = [];
          processTong = [];
          for (let client of clients) {
            cliidArr.push({ cliid: client.cliid });
          }
          if (cliidArr.length > 0) {
            searchQuery = { "$or": cliidArr };
            process = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
            for (let i of process) {
              if (i.desid !== "") {
                processTong.push(i);
              }
            }
            obj.process = processTong.length;
          } else {
            obj.process = 0;
          }

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

DataRouter.prototype.rou_post_getProjectReport = function () {
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
  obj.link = "/getProjectReport";
  obj.func = async function (req, res) {
    try {
      let target;
      let resultObj;
      let temp, temp2;
      let tempObj, tempArr;
      let startDay;
      let endDay;
      let searchQuery0, searchQuery1, searchQuery2, searchQuery3, searchQuery4, projects;
      let cliidArr, desidArr;

      resultObj = {};
      resultObj.today = req.body.today;
      startDay = new Date(Number(req.body.start.split("-")[0]), Number(req.body.start.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.start.split("-")[2].replace(/^0/, '')));
      endDay = new Date(Number(req.body.end.split("-")[0]), Number(req.body.end.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.end.split("-")[2].replace(/^0/, '')));
      resultObj.startDay = req.body.start;
      resultObj.endDay = req.body.end;

      resultObj.projects = [];
      for (let i = 0; i < 6; i++) {

        if (i === 0) {
          searchQuery0 = { "process.contract.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 1) {
          searchQuery0 = { "process.contract.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 2) {
          searchQuery0 = { "process.contract.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 3) {
          searchQuery3 = { "process.contract.remain.date": { "$gte": new Date(2000, 0, 1) } };
          searchQuery0 = { "process.calculation.payments.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1, searchQuery3 ] };
        } else if (i === 4) {
          searchQuery0 = { "process.calculation.payments.first.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        } else if (i === 5) {
          searchQuery0 = { "process.calculation.payments.first.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        }

        temp = await back.getProjectsByQuery(searchQuery2, { selfMongo: instance.mongo });

        cliidArr = [];
        desidArr = [];
        for (let j = 0; j < temp.length; j++) {
          cliidArr.push({ cliid: temp[j].cliid });
          desidArr.push({ desid: temp[j].desid });
        }

        if (i < 3) {
          if (cliidArr.length > 0) {
            temp2 = await back.getClientsByQuery({ "$or": cliidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        } else {
          if (desidArr.length > 0) {
            temp2 = await back.getDesignersByQuery({ "$or": desidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        }

        tempArr = [];
        for (let j = 0; j < temp.length; j++) {
          tempObj = {};
          tempObj.date = "1001-01-01";
          tempObj.proid = temp[j].proid;

          if (i === 0) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 1) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.date);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 2) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.cancel);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.refund) + "만원";
          } else if (i === 3) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.calculation.payments.first.amount) + "만원";
          } else if (i === 4) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.calculation.payments.remain.date);
            if (/^1[6789]/.test(tempObj.date)) {
              tempObj.date = DataRouter.dateToString(temp[j].process.calculation.payments.first.date);
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.calculation.payments.first.amount) + "만원";
          } else if (i === 5) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.calculation.payments.remain.cancel);
            if (/^1[6789]/.test(tempObj.date)) {
              tempObj.date = DataRouter.dateToString(temp[j].process.calculation.payments.first.cancel);
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.calculation.payments.first.refund) + "만원";
          }
          tempArr.push(tempObj);
        }
        resultObj.projects.push(tempArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getHistory = function () {
  const instance = this;
  const back = this.back;
  const stringFilter = function (raw) {
    const originalValue = raw;
    const originalValueArr = originalValue.split("\n");

    let str;
    let tempString;
    let item = null;
    let tong = [];

    for (let text of originalValueArr) {
      if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
        tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
        tong.push('- ' + tempString);
      } else if (/^\<\%item\%\>/.test(text)) {
        item = text;
      }
    }

    if (item !== null) {
      str = item + "\n\n" + tong.join("\n");
    } else {
      str = tong.join("\n");
    }

    return str.replace(/\&/g, ",");
  }
  let obj = {};
  obj.link = [ "/getClientHistory", "/getProjectHistory" ];
  obj.func = async function (req, res) {
    try {
      let historyObj, responseArr;

      responseArr = [];

      if (req.url === "/getClientHistory") {

        historyObj = await back.getClientHistoryById(req.body.id);

        if (historyObj === null) {
          await back.createClientHistory({ cliid: req.body.id });
          for (let i = 0; i < 6; i++) {
            responseArr.push('');
          }
        } else {
          responseArr.push((historyObj.history === undefined ? '' : stringFilter(historyObj.history)));
          responseArr.push((historyObj.space === undefined ? '' : stringFilter(historyObj.space)));
          responseArr.push((historyObj.styling === undefined ? '' : stringFilter(historyObj.styling)));
          responseArr.push((historyObj.construct === undefined ? '' : stringFilter(historyObj.construct)));
          responseArr.push((historyObj.budget === undefined ? '' : stringFilter(historyObj.budget)));
          responseArr.push((historyObj.progress === undefined ? '' : stringFilter(historyObj.progress)));
        }

      } else if (req.url === "/getProjectHistory") {

        historyObj = await back.getProjectHistoryById(req.body.id);

        if (historyObj === null) {
          await back.createProjectHistory({ proid: req.body.id });
          for (let i = 0; i < 4; i++) {
            responseArr.push('');
          }
        } else {
          responseArr.push((historyObj.history === undefined ? '' : stringFilter(historyObj.history)));
          responseArr.push((historyObj.designer === undefined ? '' : stringFilter(historyObj.designer)));
          responseArr.push((historyObj.client === undefined ? '' : stringFilter(historyObj.client)));
          responseArr.push((historyObj.photo === undefined ? '' : stringFilter(historyObj.photo)));
        }

      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateHistory = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = [ "/updateClientHistory", "/updateProjectHistory" ];
  obj.func = async function (req, res) {
    try {
      const { id, column, value } = req.body;
      let historyObj;
      let whereQuery, updateQuery;

      whereQuery = {};
      updateQuery = {};

      if (req.url === "/updateClientHistory") {

        historyObj = await back.getClientHistoryById(id);
        if (historyObj === null) {
          updateQuery.cliid = id;
          updateQuery[column] = value;
          await back.createClientHistory(updateQuery);
        } else {
          whereQuery.cliid = id;
          updateQuery[column] = value;
          await back.updateClientHistory([ whereQuery, updateQuery ]);
        }

      } else if (req.url === "/updateProjectHistory") {

        historyObj = await back.getProjectHistoryById(id);
        if (historyObj === null) {
          updateQuery.proid = id;
          updateQuery[column] = value;
          await back.createProjectHistory(updateQuery);
        } else {
          whereQuery.proid = id;
          updateQuery[column] = value;
          await back.updateProjectHistory([ whereQuery, updateQuery ]);
        }

      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ "message": "success" }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getContentsDetail = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = [ "/getContentsDetail" ];
  obj.func = async function (req, res) {
    try {
      let contents;

      contents = await back.getContentsById(req.body.id);
      const { portfolio, review } = contents.getContentsFlatDetail();

      res.set("Content-Type", "application/json");
      if (req.body.noFlat === undefined) {
        res.send(JSON.stringify([ portfolio, review ]));
      } else {
        res.send(JSON.stringify([ contents.getPortfolioDetail(), contents.getReviewDetail(), contents.getGsArr() ]));
      }
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

DataRouter.prototype.rou_post_realtimeDesigner = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/realtimeDesigner";
  obj.func = async function (req, res) {
    try {
      const desid = req.body.desid;
      const today = new Date();
      let futureConst;
      let futureArr;
      let resultArr;
      let num;
      let tong;
      let thisDesigner;
      let thisYear, thisMonth, thisOnoff;

      if (req.body.type === "get") {
        futureConst = 5;
        futureArr = [];

        for (let i = 0; i < futureConst; i++) {
          futureArr.push({ year: today.getFullYear(), month: today.getMonth() + 1 + i, onoff: true, })
        }

        resultArr = new Array(futureConst);
        num = 0;
        for (let obj of futureArr) {
          if (obj.month > 12) {
            obj.year = obj.year + 1;
            obj.month = obj.month - 12;
          }
          resultArr[futureConst - 1 - num] = obj;
          num++;
        }

        tong = await back.mongoRead("realtimeDesigner", { desid }, { local: true });
        if (tong.length === 0) {
          await back.mongoCreate("realtimeDesigner", {
            desid: desid,
            available: resultArr,
          }, { local: true });
        } else {
          thisDesigner = tong[0];
          for (let obj2 of resultArr) {
            for (let obj of thisDesigner.available) {
              if (obj.year === obj2.year && obj.month === obj2.month) {
                obj2.onoff = obj.onoff;
              }
            }
          }
          await back.mongoUpdate("realtimeDesigner", [
            { desid },
            { available: resultArr }
          ], { local: true });
        }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultArr));
      } else {

        thisYear = Number(req.body.year);
        thisMonth = Number(req.body.month);
        thisOnoff = Number(req.body.onoff);

        tong = await back.mongoRead("realtimeDesigner", { desid }, { local: true });
        thisDesigner = tong[0];
        for (let obj of thisDesigner.available) {
          if (obj.year === thisYear && obj.month === thisMonth) {
            if (thisOnoff === 0) {
              obj.onoff = false;
            } else {
              obj.onoff = true;
            }
          }
        }
        await back.mongoUpdate("realtimeDesigner", [
          { desid },
          { available: thisDesigner.available }
        ], { local: true });

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ "message": "success" }));
      }

    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calculateService = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  let obj = {};
  obj.link = "/calculateService";
  obj.func = async function (req, res) {
    try {
      let { serviceArr, pyeong, thisService } = req.body;

      serviceArr = JSON.parse(serviceArr);
      pyeong = Number(pyeong);
      thisService = JSON.parse(thisService);

      const service = await instance.back.getServiceById(serviceArr[thisService[0]].serid);
      const { x, y } = service.standard;
      const matrix = service.getMatrixByNumber(serviceArr[thisService[0]].case);
      let xNum, yNum;
      let result;

      for (let i = 0; i < x.length; i++) {
        if (x[i] === thisService[1]) {
          xNum = i;
        }
      }

      for (let i = 0; i < y.length; i++) {
        if (y[i][0] <= pyeong) {
          if (y[i][1] > pyeong) {
            yNum = i;
          }
        }
      }

      if (matrix[yNum] !== undefined) {
        if (typeof matrix[yNum][xNum] === "string") {
          result = pyeong * Number(matrix[yNum][xNum].replace(/py/gi, ''));
        } else {
          result = matrix[yNum][xNum];
        }
      } else {
        result = 0;
      }

      if (Math.floor(result) === 0) {
        result = 0;
      } else {
        result = Math.round(result) * 10000;
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ result }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calendarArr = function () {
  const instance = this;
  let obj = {};
  obj.link = "/calendarArr";
  obj.func = async function (req, res) {
    try {
      const resultArr = await instance.getCalendar(Number(req.body.length));
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_notionUpdate = function () {
  const instance = this;
  const back = this.back;
  const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
  const notion = new NotionAPIs();
  let obj = {};
  obj.link = "/notionUpdate";
  obj.func = async function (req, res) {
    try {
      let notionCard;
      let whoMethod, whoFunction;
      let result;
      let whereQuery, updateQuery;
      let historyObj;

      whoMethod = null;
      if (req.body.cliid !== undefined) {
        notionCard = await notion.getElementById(req.body.cliid, true);
        whoMethod = "client";
      } else if (req.body.desid !== undefined) {
        notionCard = await notion.getElementById(req.body.desid);
        whoMethod = "designer";
      }

      whoFunction = instance.patch[whoMethod + "NotionMap"];
      result = whoFunction(notionCard);

      updateQuery = {};
      for (let { target, finalValue } of result) {
        if (finalValue !== null && finalValue !== undefined) {
          updateQuery[target] = finalValue;
        }
      }

      whereQuery = {};
      if (req.body.cliid !== undefined) {
        whereQuery.cliid = req.body.cliid;
        await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        historyObj = {};
        historyObj.cliid = req.body.cliid;
        historyObj.history = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.history === undefined ? [] : notionCard.detailStory.history))));
        historyObj.space = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.space === undefined ? [] : notionCard.detailStory.space))));
        historyObj.styling = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.styling === undefined ? [] : notionCard.detailStory.styling))));
        historyObj.construct = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.construct === undefined ? [] : notionCard.detailStory.construct))));
        historyObj.budget = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.budget === undefined ? [] : notionCard.detailStory.budget))));
        historyObj.progress = DataRouter.splitToSpace(DataRouter.objectToFlat(DataRouter.notionArrRefine((notionCard.detailStory.progress === undefined ? [] : notionCard.detailStory.progress))));

        await instance.back.updateClientHistory([ whereQuery, historyObj ]);

      } else if (req.body.desid !== undefined) {
        whereQuery.desid = req.body.desid;
        await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ "message": "success" }));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createAiDocument = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  let obj = {};
  obj.link = [ "/createRequestDocument", "/createProposalDocument" ];
  obj.func = async function (req, res) {
    try {

      if (req.url === "/createRequestDocument") {

        let clientOriginal;
        let projects, project;
        let resultObj = { "alert": "요청에 문제가 있습니다!" };

        clientOriginal = await instance.back.getClientById(req.body.id);
        if (clientOriginal === null) {
          resultObj = { "alert": "확인되는 고객이 없습니다!" };
        } else {
          projects = await instance.back.getProjectsByQuery({ cliid: req.body.id });
          project = null;
          for (let p of projects) {
            if (p.desid !== '') {
              project = p;
              break;
            }
          }
          if (project === null) {
            resultObj = { "alert": "확인되는 프로젝트가 없습니다!" };
          } else {
            if (project.process.contract.meeting.date.getFullYear() < 1900) {
              resultObj = { "alert": "현장 미팅에 대한 정보가 없습니다!" };
            } else {
              await instance.mother.requestSystem("http://" + ADDRESS.homeinfo.ip.outer + ":" + ADDRESS.homeinfo.polling.port + "/toAiServer", { type: "request", id: req.body.id });
              resultObj = { "alert": "의뢰서 제작 요청이 완료되었습니다!" };
            }
          }
        }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultObj));

      } else if (req.url === "/createProposalDocument") {
        await instance.mother.requestSystem("http://" + ADDRESS.homeinfo.ip.outer + ":" + ADDRESS.homeinfo.polling.port + "/toAiServer", { type: "proposal", id: req.body.id });
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "done" }));
      }

    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getMembers = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
  let obj = {};
  obj.link = "/getMembers";
  obj.func = async function (req, res) {
    try {
      const membersArr = JSON.parse(await instance.mother.pythonExecute(instance.pythonApp, [ "getMembers" ], {}));
      let emailArr = [];
      let targetMember = null;

      if (req.body.type === "get") {

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(membersArr));

      } else if (req.body.type === "boo") {
        for (let { id, email } of membersArr.members) {
          for (let e of email) {
            emailArr.push({ email: e, id });
          }
        }

        for (let i = 0; i < emailArr.length; i++) {
          if (req.body.value === emailArr[i].email) {
            for (let j = 0; j < membersArr.members.length; j++) {
              if (emailArr[i].id === membersArr.members[j].id) {
                targetMember = membersArr.members[j];
              }
            }
          }
        }

        //dev------------------------------------------------------
        if (req.body.value === "homeliaisonphoto@gmail.com") {
          targetMember = membersArr.members[7];
        }
        //---------------------------------------------------------

        res.set("Content-Type", "application/json");
        if (targetMember === undefined || targetMember === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: targetMember }));
        }

      }
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const { shell, shellLink, mongo } = this.mother;
  const stringToArr = function (dateString) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = dateString.split(' ');
    tempArr1 = tempArr0[0].split('-');
    tempArr2 = tempArr0[1].split(':');
    return [ Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')) ];
  }
  let obj = {};
  obj.link = "/getAnalytics_total";
  obj.func = async function (req, res) {
    try {
      let { startDate, endDate } = JSON.parse(req.body.range);
      let searchQuery, rows;

      startDate = new Date(...stringToArr(startDate));
      endDate = new Date(...stringToArr(endDate));

      const MONGOCPYTHON = new mongo(("mongodb://" + instance.address.pythoninfo.user + ':' + instance.address.pythoninfo.password + '@' + instance.address.pythoninfo.host + ':' + String(instance.address.pythoninfo.port) + "/admin"), { useUnifiedTopology: true });
      await MONGOCPYTHON.connect();

      searchQuery = { "latestTimeline": { "$gte": startDate, "$lte": endDate } };

      rows = await MONGOCPYTHON.db(`miro81`).collection(`googleAnalytics_total`).find(searchQuery).toArray();

      MONGOCPYTHON.close();

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getRawContents = function () {
  const instance = this;
  let obj = {};
  obj.link = "/getRawContents";
  obj.func = async function (req, res) {
    try {
      let { id, method } = req.body;
      let text;

      const targets = {
        p77: {
          portfolio: `201130_(디자이너글)_강영후고객님_강진아디자이너

I.고객 상황에 대한 이야기

이번에 진행하게 된 고객님은 집을 처음 분양 받아 입주하시는 30대 중반의 젊은 부부셨습니다.의뢰인이 직업군인이라 지방에 계시는 특수한 상황이었고 그래서 다른 카톡방 보다 더 많은 소통을 한 현장이었습니다.
내 생애 첫 집을 분양하게 되었고 누구나 집에 대한 로망이 있지만 오랜 관사 생활을 해온지라 집에 대한 기대감이나 큰 로망이 많으셨습니다. 고객님들의 니즈 파악을 하다보니 두분의 취미생활과 아이들의 공간이 따로 필요했고 그 부분을 중점으로 각자의 공간을 분리하되 함께 어우러질수 있는 공간으로 만들어드려야 했습니다.

II.고객이  원하는  스타일에  대한 이야기

아내분의 취미 생활을 할 수 있는 재봉틀이 3대 들어가는 작업공간
커피를 너무 좋아해서 전문가용 커피머신을 놓을 카페테리아 공간
장난 꾸러기 두 남자 아이들의 침실과 공부방 겸 놀이방
두분이 쉬실 수 있는 부부만의 따뜻한 공간
이부분을 중점으로 비중을 두고 작업하였습니다. .
전체적으로 화이트톤의 시공을 하신다고 하셨고, 저희는 스타일링 컨셉을 우드가구나 디자인 체어 등을 제안해 드렸으며 따뜻함과 편안함이 녹아 있는 집으로 만들면서 심심해질 수 있는 부분은 포인트 패브릭이나 소품으로 보완하면서 작업하였습니다.

III.디자이너의 공간별 디자인 의도 이야기

1.거실 : 밋밋할 수 있는 벽은 거친 회벽 느낌나는 화이트 벽지로 셀렉 해 드렸고 아이들의 장난에도 거뜬한 오트밀 색상의 기능성 패브릭 소파와 민트색 1인라운지체어를 배치하고 러그와 쿠션,블랭킷으로 따뜻함을 보완해드렸습니다.
하나부터 열까지 챙겨 넣어드렸더니 고객도 만족하고 기쁨도 두배였던 현장이였습니다.

2.주방 : 고객님이 개인적으로 원목을 워낙 좋아하셔서 견고함과 깊이감이 인상적인 모던 감성의
다이닝테이블을 추천해드렸고 블랙스틸 다리가 하부에서 교차해 재미와 안정감을 주었으며 디자인 식탁의자를 배치함으로 공간에 컬러감이 들어갔습니다.
마무리는 식탁조명으로 활력과 유니크함을 살렸습니다.

3.화장실 : 핑크를 워낙 좋아하시는 고객님을 위해 거실 화장실은 핑크 소품으로 사랑스럽게
안방화장실은 골드로 포인트를 더해 세련미와 화려함을 더한 호텔 같은 욕실이 완성되었습니다.

4.방1(메인룸) : 이방도 메인 가구를 원목 가구로 선택하셨고 가구를 오래 사용하실 계획이셨기 때문에 결이 수려하고 조직이 단단하고 치밀한 오크를 고객님께 추천해서 무겁지 않은 화이트오크로 제작된 북유럽 감성의 내츄럴 모던한 가구로 침대와 협탁을 배치해 드렸습니다.
침대는 너무 심플한 베딩보다 프릴감성의 디자인과 핑크컬러를 좋아히시는 고객님 취향을 참고해서 발판러그,쿠션,블랭킷으로 사랑스럽고 감성적인 공간을 연출해 드렸습니다.
마지막으로 부부금술 좋으라는 의미로 모란 그림을 걸어드려 벽의 지루함도 없애고 1석2조의 효과를 누릴수 있도록 만들어 드렸습니다.
방이 너무 이뻐서 침대 들어가 잠을 잘 수 있을지 걱정된다는 고객님들의 반응이 더 뜨거워 보람이 느껴진 공간이였습니다.

5.카페테리아 : 커피를 너무 좋아하시는 고객님의 특별한 취미 공간으로 특히 신경이 많이 쓰였던부분입니다. 전문가용 머신과 분쇄기를 직접 구매하셔서 연출할수 있게 만들어 드렸습니다.
카페테리아가 다이닝룸과 자연스럽게 연결될수 있게 동선과 가구배치를 구성해 식탁 조명과 위치 잡는것까지 신경이 쓰였던 공간인 만큼 고객님 두분의 만족도가 제일 높았던 공간중의 하나여서 공간 완성후 두분께 커피 대접받는데 커피맛도 예술이라 두배로 뿌듯했었습니다.

6.아이방 침실 : 따뜻하고 생동감 있는 노란 벽지 컬러에 딥블루 암막커튼으로 안정감을 더해주었습니다.
남자 아이 두명이 침실로 만들어질 공간이라 튼튼한 애쉬원목의 뉴트럴톤의 그레이로 모던한 가구를 선택을 했습니다. 처음으로 부모님과 분리된 공간에서 잠을 잘 수 있는 공간으로 만들어주기 위해 아이들의 감성을 자극할 수 있는 흥미로운 우주인 베딩으로 컨셉을 잡아주었습니다. 이제는 아이들이 이불속에서 나오고 싶지 않은 공간으로 밤에는 무섭지 않고 좋은 꿈을 꿀 수 있을 것 같다는 씩씩한 꼬맹이들을 위한 공간으로 변신했습니다.

7.공부방 겸 놀이방 : 지금은 침실과 공부방으로 분리하였지만 아들만 둘이라 나중에 각자의 공간으로 분리를 해도 유용하게 사용할 수 있는 침실과 같은 튼튼하고 모던한 애쉬 원목 가구로 선택하셨고 직선 등 기하학 형태의 소품들을 조합하여 아이들의 감수성과 상상력을 자극하여 창의적 공간을 연출할 수 있게  아이들 중심으로 만들었습니다.

8.재봉틀방(알파룸) : 재봉틀을 3대나 보유하고 계신 취미 그 이상의 방을 위해 가성비 있는 튼튼한 가구 셀렉 해드리고 작업을 연출할 수 있는 공간과 소품을 추천해드려 항상 작업하면서 행복할 수 있는 공간이 되길 바라는 맘으로 만들어 드렸던 공간.
물건들을 현재 집으로 잘못 배송해서 스타일링을 다 완성하지못해 아쉬움이 남는 공간이지만
워낙 센스가 있으셔서 더 이쁘게 잘 꾸미실 것 같다는 확신이 들었습니다.

9.베란다: 인테리어를 하실때 선반과 테이블을 만들어 놓으셔서 감성적인 아웃도어 스툴과 작은 스탠드, 그리고 예쁜 소품과 블루투스 스피커로 커피 좋아하시는 두분 오손도손 차도 드시면서 티타임 즐길 수 있는 공간으로 변신해드림.
아내분을 위해 컴퓨터 공간을 포기하신 고객님을 위해 노트북도 하실 수 있고 책도 읽을 수 있는 작고 아담한 공간으로 만들어 드렸더니 생각했던 것보다 훨씬 행복해하셔서 저희도 기쁘게 마무리할 수 있었던 현장입니다.

IV.현장 진행소감 : 서로 모르는 사람과 사람들이 만나서 소통한다는 것이 얼마나 중요한 것인지 다시 느끼게 해준 현장이었습니다.
매번 현장 마무리할 때마다 느끼는 것이지만 이번 고객님 만나면서 배운 게 있었고 또 실수한 게 있었구나 하는 생각으로 나를 되돌아보는 시간을 가졌습니다. 이런 과정속에서 또 성장을 해 나가는 것이며 다시 새로운 도전을 위해 리셋하는 시간이 만들어지는 것 같습니다.
누군가의 집을 만들어 준다는 것, 누군가의 집을 꾸며준다는 것은 그냥 단순한 일이 아니라 나를 믿고 맡겨주신 고객님의 삶을 체인지 해드리는 중요한 사명이라는 생각을 갖고 처음과 같은 마음으로 최대한 들을 준비하고 고객님과 많은 소통을 해야 한다는 것을 이번 현장에서도 배우고 느꼈습니다.
마지막으로 먼 곳에서 끝까지 믿고 맡겨 주셔서 결과물도 좋았던 것 같아 감사드립니다.
더 좋은 인연으로 만나길 기대합니다.

V.공간정보 : 새로 입주하는 아파트
I.공간정보 : 34 py, 아파트/ 방3+알파룸1+화장실2+거실+주방+베란다 등
II.가족구성 : 고객님,배우자분,3세,6세 아들 두 명
III.기간 : 3달
IV.예산 : 가구+소품 일절 -1천200백만원`,
          review: `김포 한강메트로자이 34평 홈스타일링

오랫동안 사택 생활을 하신 고객님은 가족들이 함께 지낼 새집을 마련하시면서 홈스타일링을 받기로 결정하셨어요. 사랑하는 가족을 위한 아름답고 편안한 집을 만들고 싶으셨던 고객님은 꼼꼼한 비교와 서칭 끝에, ‘절대 손해 볼 일은 없다!’라는 확신으로 홈스타일링 플랫폼 홈리에종을 선택하셨어요~ 일반 인테리어 업체의 천편일률적인 스타일 제안에 실망하셨던 고객님은 홈리에종이 추천한 디자이너님과 스타일을 맞춰가며 척하면 척! 고객님의 취향과 마음을 읽어주시는 섬세함에 감동받으셨다고 해요 (뿌듯) 말 한마디 한마디마다 아내와 가족 사랑이 물씬 묻어나는 로맨티스트 고객님과, 가족들의 마음에 쏙 드는 공간으로 완성된 아늑하고 스윗한 집을 소개해 드릴게요!


홈스타일링을 받으면서, 아름다운 집이 주는 긍정적인 영향을 알 수 있어서 너무 좋고, 감사해요.


Q. 고객님이 홈스타일링을 받기로 결정하신 계기가 궁금해요 :)

홈스타일링을 안지가 2-3년쯤 됐는데 제가 사택 생활할 땐 시도하지 못했고, 기회가 될 때 꼭 해봐야지 마음에 두고 있었어요. 그러다가 이번에 깔끔한 새집으로 이사하면서 시공은 과하게 할 필요도 없으니, 우리가 원하는 스타일에 맞춰서 홈스타일링을 해보자 한 거예요. 일반적인 인테리어를 시도한 집은 사진으로 많이 봤지만, 채울 수 없는 아쉬운 부분이 있었던 것 같아요. 나름대로 셀프로 꾸며보려고 시도한 적도 있었지만 막상 해보면 생각만큼 나오지 않더라고요. 이번에는 디자이너님의 힘을 빌려서 다듬어진 스타일을 만들어보고 싶었어요.


Q.  홈리에종은 어떻게 알게 되셨나요^^

솔직히 말씀드리면 제가 꼼꼼한 성격이고, 뭐든 결정을 내리기 전에 많이 알아보는 스타일이라 이번에도 홈스타일링 업체를 많이 비교해봤어요. 그러던 중에 인스타그램에서 우연히 홈리에종 광고를 발견하고, 홈페이지도 살펴보게 됐어요. 인테리어 포트폴리오만 나와 있는 다른 업체들과는 달리 홈리에종은 인터뷰 형식으로 고객 후기를 전달하고, 인테리어 디자이너의 성장을 지원하는 관계를 형성하는 부분이 인상 깊었어요. 그래서 정말 마지막이다 싶어, 홈리에종에 전화를 하고 시스템을 설명 받았어요. 홈스타일링 플랫폼이라 체계적으로 느껴져서, 절대 고객의 입장에서 손해볼 건 없겠다는 판단이 들어서 홈리에종과 홈스타일링을 진행한 거예요.


Q. 디자이너 제안서를 받아보시고 고민하셨던 포인트와, 그 이유가 궁금해요~!

저는 저희 가족의 니즈나 스타일에 맞춰서 소통하실 수 있는 디자이너님을 원했어요. 다른 인테리어 업체를 찾아보면서 저희 가족의 니즈에 대한 이해 없이 업체 쪽에서 진행하기 쉬운 틀에 박힌 디자인에 임기응변처럼 한 두가지 바꿔서 맞춤 디자인처럼 제안하는 게 불만족스러웠어요. 그래서 저희 가족의 니즈에 맞춰서 필요한 기능이나 디자인을 넣어주실 수 있는, 1대 1로 소통하실 수 있는 디자이너님을 원했어요.


Q. 디자이너님과 홈스타일링하시면서 가장 만족스러운 부분은 무엇일까요?

인테리어 전문가이신 디자이너님의 센스를 빌릴 수 있는 점이 가장 만족스러웠어요. 저희가 집을 꾸밀 때는 스타일을 통일감 있게 완성하지 못했는데, 디자이너님은 중심을 잃지 않고 디테일과 조화를 모두 잡아주셨어요. 오히려 저희가 요청했던 부분이나, 스타일에서 더 발전시켜주시면서 완성도를 높여 주셨고요. 그리고 저희가 셀프로는 할 수 없는 부분은 디자이너님의 전문적인 지식이나 인적 네트워크에 많이 의존하기도 했고, 꼭 필요한 부분은 ‘이건 꼭 해주셨으면 좋겠어요’라고 명확하게 요청드리면서 취향과 니즈를 섬세하게 반영하다 보니 집이 정말 가족의 생활에 맞는 아름다운 공간으로 완성된 것 같아요 :)


Q. 디자이너님과 홈스타일링하며 조금 아쉬웠던 부분은 무엇일까요?

초반에 저는 제가 필요한 부분들을 디자이너님께 먼저 말씀드리면 수고로우실까봐 주저했는데, 디자이너님은 제가 스스로 가구를 찾고 있어서 말을 안 하시나 보다 하고 짐작하셨던 부분이 있던 것 같아요. 그래서 초반엔 소통에서 조금 오해가 있었지만 스타일링을 진행하면서 아쉬운 부분들을 보완해나갔어요. 그리고 제안해 주신 스타일링 결과물이 항상 좋았기 때문에, 아쉬운 부분이 있었어도 차근차근 해결해나가면서 믿고 진행한 것도 있어요. 그 후부턴 필요한 것들을 바로바로 요청드리고, 저의 취향이나 니즈와 맞지 않는 부분이 생기면  솔직하게 말씀드렸고요. 스타일링이 마무리되어갈 즈음에는, 말씀드리기도 전에 디자이너님이 먼저 제 니즈를 읽으시고 공간을 구성하거나 제안을 주셔서 만족스럽게 스타일링을 완성할 수 있었습니다.


Q. 디자이너님과 홈스타일링하며 기억에 남는 에피소드가 있으실까요?

제가 커피를 워낙 좋아하고, 만드는 것에도 관심이 있어서 홈바를 만들기로 했어요. 처음에는 그냥 커피 머신 올려두는 장식장 정도로 사용할 생각이었는데, 디자이너님이 다운라이트 조명을 제안해 주셨어요. 저는 놓칠 뻔한 아주 사소한 차이가 큰 디테일을 잡아주신 거예요. 그리고 안방 베란다에 디자이너님이 깜짝 선물처럼 저와 아내를 위한 홈카페를 만들어 주셨어요. 안 그래도 안방 베란다를 햇살 좋은 날 아내가 좋아하는 커피를 마시며 혼자만의 시간을 보낼 수 있는 공간 겸, 저희 부부가 아이들 재우고 오붓하게 맥주 한 잔 할 수 있는 공간으로 만들어야겠다고 생각하고 있었거든요. 그런데 제가 말씀드리지도 않았는데 디자이너님이 딱 안방 베란다에 제가 꿈꾸던 홈카페 공간을 구성해 주신 거예요. 아내를 아끼는 제 마음을 읽어주신 것 같아서, 엄청나게 감동을 받았죠.


Q. 고객님의 취향이 스타일링에 잘 반영되었나요? 아니면 조금 다른 스타일로 진행하셨을까요?

저희 아내가 화이트톤 스타일을 워낙 좋아해서, 아내 취향에 맞는 모던한 화이트 스타일로 요청드렸었어요. 신혼 때 화이트 스타일에, 흰색 가구를 많이 놓고 싶었는데 그때는 워낙 신혼이고, 어렸다 보니 인테리어도 잘 몰랐고 그러다 보니 아쉬움이 컸었거든요. 생각했던 느낌이 아니네 하며 아내랑 저랑 실망도 하고요. 그래서 이번에는 정말 조화로운 화이트 스타일을 완성해보고 싶었어요. 그렇지만 화이트라도 너무 단조롭지는 않게 색감이나 패턴이 다채롭게 쓰인 스타일을 원해서 디자이너님이 화이트 베이스에 잘 어울리는 색감의 제품과 가구를 제안해주셨어요. 그러니까 저희 아내도, 화이트로 고수하고 싶은 부분과 포인트로 색감이 들어가길 원하는 부분을 구분해서 요청드리면서 디자이너님이 제안하시는 스타일과 맞춰 나갔죠. 전체적으로 저희가 원하는 스타일에 포인트가 되는 디테일까지 놓치지 않고 잘 살려주셔서, 원하던 느낌 이상의 공간으로 완성되었어요.


Q. 예산 활용은 만족스러우신가요?

저는 개인적으로 가성비와 가심비 모두 챙겼다고 생각해요. 초기 예산을 조금 넘겼지만, 디자이너님 덕분에 예산을 정말 많이 아낀 걸 알기 때문에 아쉽지 않아요. 제가 했으면 저희 이렇게 집에 잘 어울리는 가구나 소품을 이만큼 합리적인 가격에 구매할 수 없었을 거예요. 신혼 때 시도했던 셀프 인테리어와 비교해도 만족도는 훨씬 높은데, 오히려 비용적으로는 훨씬 합리적으로 스타일링이 완성되었어요. 제가 아무리 혼자 발품을 팔고, 정보를 알아봤어도 저희 디자이너님의 전문적인 인테리어 지식, 정보력을 뛰어넘은 결과를 낼 자신은 없는 것 같아요 :)


Q. 고객님께서 가장 좋아하는 공간은 어디일까요?

지금 집에 식구들이 필요한 공간을 맞추어서 만든 덕분에 가장 좋아하는 공간이 다 달라요. 저는 커피를 워낙 좋아해서 거실에 커피 머신이 있는 홈바 공간이 제일 좋아요. 저희 아내는 본인 취향대로 올화이트 스타일로 꾸민 미싱방이자 작업 공간에서 가장 많은 시간을 보내요. 저희 첫째는 어디 있나 살펴보면 자기 책상이 있는 놀이방에서 동생이랑 놀거나 혼자 조용히 책을 읽고 있더라고요. 마지막으로 막내는 크고 포근한 거실 소파에 완전히 푹 빠졌답니다!


Q. 처음에는 구매를 망설였지만, 막상 구매하고 나니 마음에 드는 제품이 있었다면요?

두 가지가 있는데, 1인 소파랑 원목 식탁이에요. 저희 집이 거실이 넓은 편이라 남는 공간을 어떻게 활용할지 고민하니까 디자이너님이 1인 소파를 제안해 주셨어요. 처음에는 거실에 있던 4인용 소파와 다른 스타일이라 매치가 될까? 긴가민가 했지만, 놓고 보니까 모던한 분위기에 유행을 따라가지 않는 유니크한 느낌이 정말 좋아요. 식탁도 처음에는 화이트 세라믹 제품으로 구매하려고 했었어요. 그런데 디자이너님이 세라믹 테이블은 유행을 타고 관리도 어려워서 원목 테이블을 제안해 주셨어요. 디자이너님이 가격도 비교해 주셔서 합리적인 가격에 구매한 것도 만족 포인트고요. 주말에는 식탁에 앉아 커피를 마시면서 아이들이 같이 노는 걸 볼 수도 있고, 제가 정말 좋아하는 공간이랍니다.


Q. 홈스타일링 전과 후를 비교해봤을 때, 달라진 라이프 스타일이 있을까요?

생활의 아주 사소한 부분에서부터 만족감이 달라요. 예를 들어 지금 조명을 켜면 공간에 깃드는 따스한 느낌이 너무 좋아요. 저도 몰랐는데, 제가 따뜻한 색감의 조명을 선호했더라고요. 저도 몰랐던 제 취향을 파악하시고 공간에 실현시켜 주셨어요. 이전에는 공간에 라이프스타일을 맞추며 지내는 느낌이었다면, 홈스타일링을 받은 후에는 집 자체가 주는 안정감을 느끼고 있어요. 집이 정말 사람에게 영향을 주는 것을 실감하는 것 같아요. 아름다운 집이 주는 긍정적인 영향을 알 수 있어서 너무 좋고, 감사해요.


Q. 마지막으로, 홈스타일링을 고민 중이신 분들에게 조언 한마디 부탁드려요~

저는 일반 인테리어와 홈스타일링 중에서 고민하는 분들께 꼭 홈스타일링을 추천드려요.  저희 부부가 일반 시공 위주의 인테리어 업체를 알아봤을 때는 예산이 많지 않다는 이유로 여러 번 거절을 당하고, 집을 깎아내리는 느낌에 실망이 컸어요. 그리고 인테리어는 집의 틀을 깔끔하게 만들어주긴 하지만 생활을 반영해 주지는 못하니까 만족스럽지 않는 부분이 있었지만, 홈스타일링은 컨셉부터 가구와 소품까지 다 배치된, 정말 다 갖춰진 집으로 완성시켜줘요. 그래서 홈스타일링을 진행하신다면 실패는 안 하실 거예요. 저랑 아내는 다음에도 집을 꾸밀 기회가 생기면 홈리에종에서 홈스타일링 받기로 했어요. 저희가 이렇게 디자이너분이랑 연결될 수 있었던 게 다 홈리에종 덕분이었고, 홈리에종은 플랫폼이라 진행 중에 불편한 점이나 궁금한 점이 생겼을 때 대처할 수 있는 범위가 넓어서 안심하고 이용할 수 있다는 만족감이 정말 컸어요.`,
        }
      };

      targets["p77"][method]
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ text: targets["p77"][method] }));
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
