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
      res.set("Content-Type", "text/html");
      res.send("<script>window.location.href = 'https://home-liaison.com';</script>");
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
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners" ];
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
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject" ];
  obj.func = async function (req, res) {
    try {
      const { thisId, requestIndex, column, value, pastValue } = req.body;
      let map;
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp;
      let temp, temp2, temp3;
      let tempFunction;

      if (req.url === "/updateClient") {
        map = instance.patch.clientMap();
      } else if (req.url === "/updateDesigner") {
        map = instance.patch.designerMap();
      } else if (req.url === "/updateProject") {
        map = instance.patch.projectMap();
      }

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
          break;
        case "object":
          tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue, false);
          break;
        default:
          throw new Error("invaild type");
      }

      updateQuery = {};
      updateQuery[map[column].position.replace(/\.0\./, ("." + requestIndex + "."))] = finalValue;

      whereQuery = {};
      if (req.url === "/updateClient") {
        whereQuery[map.cliid.position] = thisId;
      } else if (req.url === "/updateDesigner") {
        whereQuery[map.desid.position] = thisId;
      } else if (req.url === "/updateProject") {
        whereQuery[map.proid.position] = thisId;
      }

      if (req.url === "/updateClient") {
        message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/updateDesigner") {
        message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/updateProject") {
        message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

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
      let searchQuery, clients, proposals, contracts, process;
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
          for (let client of clients) {
            cliidArr.push({ cliid: client.cliid });
          }
          if (cliidArr.length > 0) {
            searchQuery = { "$or": cliidArr };
            process = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
            obj.process = process.length;
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

      resultObj.dateRange = [];
      for (let i = Number(req.body.start.split("-")[2].replace(/^0/, '')); i < Number(req.body.end.split("-")[2].replace(/^0/, '')) + 1; i++) {
        resultObj.dateRange.push(i);
      }

      resultObj.projects = [];
      for (let i = 0; i < 4; i++) {

        if (i === 0) {
          searchQuery0 = { "process.contract.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 1) {
          searchQuery0 = { "process.contract.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 2) {
          searchQuery3 = { "process.contract.remain.date": { "$gte": new Date(2000, 0, 1) } };
          searchQuery0 = { "process.calculation.payments.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1, searchQuery3 ] };
        } else if (i === 3) {
          searchQuery0 = { "process.calculation.payments.first.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.date": { "$gte": startDay, "$lt": endDay } };
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

        if (i < 2) {
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
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.calculation.payments.first.amount) + "만원";
          } else if (i === 3) {
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
          projects = await this.back.getProjectsByQuery({ cliid: req.body.id });
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
