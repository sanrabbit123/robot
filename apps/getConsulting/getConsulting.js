const GetConsulting = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
}

GetConsulting.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}

GetConsulting.prototype.chromeOn = function (link) {
  const { exec } = require("child_process");
  let chromePath = `/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome' --new-window ${link}`;
  return new Promise(function (resolve, reject) {
    exec(chromePath, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
}

GetConsulting.prototype.mysqlConnect = function (query) {
  const mysql = this.mother.mysql;
  const connection = mysql.createConnection(this.mother.frontinfo);
  return new Promise(function (resolve, reject) {
    connection.query(query, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

GetConsulting.prototype.makeId = function (past_id) {
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

GetConsulting.prototype.routerPath = function (front) {
  const os = require("os");
  const queryString = require(`querystring`);
  const instance = this;
  let funcObj = {};

  //initial
  funcObj.index = async function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"></head><body><script>${front}</script></body></html>`);
  }

  //get rows
  funcObj.getRows = async function (req, res) {
    try {
      let rows_raw = await instance.mysqlConnect(`SELECT * FROM conlist ORDER BY id DESC LIMIT 30`);
      let residence = [];
      let columns = [];
      let obj;
      let rows = [];
      for (let i = 0; i < rows_raw.length; i++) {
        obj = {}
        for (let j in rows_raw[i]) {
          obj[j] = String(rows_raw[i][j]);
        }
        rows.push(obj);
        if (String(rows_raw[i].residence) === '') {
          residence.push('due_date');
        } else {
          residence.push('residence');
        }
        columns.push([ "timeline", "name", "phone", "email", "address", "family", "budget", "pyeong", residence[i], "contract", "space", "etc", "channel" ]);
      }
      let result = { rows, columns };

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(JSON.stringify(result));
    } catch (e) {
      console.log(e);
    }
  }

  //to mongo and google
  funcObj.toMongo = async function (req, res) {
    try {
      let postData = '';

      req.on('data', function (chunk) {
        postData += chunk;
      });

      req.on('end', async function () {
        try {
          const MONGOC = new instance.mother.mongo(instance.mother.mongoinfo, { useUnifiedTopology: true });
          const MONGOCBRIDGE = new instance.mother.mongo(instance.mother.bridgeinfo, { useUnifiedTopology: true });
          await MONGOC.connect();
          console.log(`mongo on`);
          await MONGOCBRIDGE.connect();
          console.log(`bridge mongo on`);

          let body = queryString.parse(postData);
          let rows = await MONGOC.db("miro81").collection("BC1_conlist").find({}).project({ a4_customernumber: 1 }).sort({ a4_customernumber: -1 }).limit(1).toArray();
          let this_id = instance.makeId(rows[0].a4_customernumber);
          let obj = {};
          for (let v in body) {
            obj[v] = body[v].replace(/\'/g, '');
          }
          let leftColumns = {
            "a1_class1": "응대중",
            "a2_class2": "",
            "a3_reason": "",
            "a4_customernumber": "",
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
          }
          for (let v in leftColumns) {
            obj[v] = leftColumns[v];
          }
          console.log(obj);

          await MONGOC.db("miro81").collection("BC1_conlist").insertOne(obj);
          await MONGOCBRIDGE.db("miro81").collection("BC1_conlist").insertOne(obj);
          MONGOC.close();
          MONGOCBRIDGE.close();

          console.log('success');
          if (os.type() === 'Darwin') {
            await instance.chromeOn("https://docs.google.com/forms/d/1D8CNQFtRr_hiuUXdMXYAgYCk6nFC5cAdkezzp-3mlcw/edit");
          }

          setTimeout(async function () {
            await instance.mother.slack_bot.chat.postMessage({ text: `${obj.a19_name} 고객님의 신청서가 출력되었습니다!`, channel: `#401_consulting` });
            process.exit();
          }, 3000);

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end('succees');

        } catch (e) {
          console.log(e);
        }
      });

    } catch (e) {
      console.log(e);
    }
  }
  return funcObj;
}

GetConsulting.prototype.serverOn = async function (front) {
  const instance = this;
  const http2 = require('http2');
  const { fileSystem } = this.mother;
  const { parse } = require("url");
  try {
    let funcObj, pems = {};
    let pemsLink = process.cwd() + "/pems/localhost";
    let certDir, keyDir, certFile, keyFile;
    let routerKeys, routerKeysNumber, routerTargetIndex;

    certDir = await fileSystem(`readDir`, [ pemsLink + "/cert" ]);
    keyDir = await fileSystem(`readDir`, [ pemsLink + "/key" ]);
    for (let i of certDir) { if (i !== ".DS_Store") { certFile = i; } }
    for (let i of keyDir) { if (i !== ".DS_Store") { keyFile = i; } }

    pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${certFile}` ]);
    pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${keyFile}` ]);
    pems.ca = [];
    pems.allowHTTP1 = true;

    funcObj = this.routerPath(front);
    routerKeys = Object.keys(funcObj);
    routerKeysNumber = routerKeys.length;

    http2.createSecureServer(pems, async function (req, res) {
        const pathname = parse(req.url).pathname;
        let targetFunc;
        routerTargetIndex = 0;
        if (routerKeysNumber > 0) {
          for (let i = 0; i < routerKeysNumber; i++) {
            if ((new RegExp(routerKeys[i], 'gi')).test(pathname.replace(/^\//, ''))) {
              routerTargetIndex = i;
              break;
            }
          }
          targetFunc = funcObj[routerKeys[routerTargetIndex]];
          await targetFunc(req, res);
        } else {
          res.end(`serverError`);
          throw new Error(`no Router`);
        }
    }).listen(3000, '127.0.0.1', () => {
        console.log(`Server running`);
    });

  } catch (e) {
    console.log(e);
  }
}

GetConsulting.prototype.launching = async function (pack = false) {
  const os = require("os");
  try {
    let code, front;
    if (pack) {
      code = await this.mother.fileSystem(`readString`, [ `${process.cwd()}/apps/getConsulting/front/front.js` ]);
      code = await this.mother.babelSystem(code, true);
      await this.mother.fileSystem(`write`, [ `${process.cwd()}/temp/front_babel.js`, code ]);
      await this.mother.webpackSystem(`front_babel.js`, `${process.cwd()}/apps/getConsulting/front/front_pack.js`);
      front = await this.mother.fileSystem(`readString`, [ `${process.cwd()}/apps/getConsulting/front/front_pack.js` ]);
    } else {
      code = null;
      front = await this.mother.fileSystem(`readString`, [ `${process.cwd()}/apps/getConsulting/front/front_pack.js` ]);
    }
    await this.serverOn(front);
    if (os.type() === 'Darwin') {
      await this.chromeOn("https://localhost:3000/index");
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = GetConsulting;
