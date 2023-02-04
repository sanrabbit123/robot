const BasicRouter = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  this.mother = new Mother();
  this.hangul = new ParsingHangul();
  this.staticConst = process.env.HOME + "/static";
}

//GET ---------------------------------------------------------------------------------------------

BasicRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { diskReading } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let disk;

      if (req.params.id === "ssl") {
        disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (req.params.id === "disk") {
        disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

BasicRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const hangul = this.hangul;
  let obj;
  obj = {};
  obj.link = [ "/generalFileUpload" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (10000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
            return;
          } else {
            const toArr = JSON.parse(fields.toArr).map((path) => { return hangul.fixString(path); });
            let filesKey, fromArr, num;
            let tempArr, tempString, tempDir;

            filesKey = Object.keys(files);
            filesKey.sort((a, b) => {
              return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, ''));
            });

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            num = 0;
            for (let { filepath: path } of fromArr) {
              tempArr = toArr[num].split("/");
              tempString = staticConst;
              if (tempArr.length === 0) {
                throw new Error("invaild to array");
              }
              for (let i = 0; i < tempArr.length - 1; i++) {
                tempDir = await fileSystem(`readDir`, [ tempString ]);
                if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
                  await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
                }
                tempString += '/';
                tempString += tempArr[i];
              }
              await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num].replace(/^\//i, ''))}`);

              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      errorLog("Basic lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

BasicRouter.prototype.rou_post_generalJson = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/generalJson" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined || req.body.collection === undefined) {
        console.log(req.body);
        throw new Error("invalid post must be mode and collection");
      }
      const { mode, collection } = equalJson(req.body);
      const staticDir = await fileSystem("readDir", [ staticConst ]);
      const folderName = "json";
      const targetFolder = staticConst + "/" + folderName;
      const fileKeyWords = "__json__";
      let resultObj;
      let collectionFolder;
      let fileName;
      let collectionFolderList;
      let collectionFolderIdList;
      let thisFileName;
      let thisJson;
      let orderArr;
      let targetObj;

      if (/[^a-zA-Z0-9_]/gi.test(collection)) {
        throw new Error("invalid collection name");
      }

      if (!staticDir.includes(folderName)) {
        await shellExec("mkdir", [ targetFolder ]);
      }

      if (!(await fileSystem("exist", [ targetFolder + "/" + collection ]))) {
        await shellExec("mkdir", [ targetFolder + "/" + collection ]);
      }

      resultObj = { message: "done" };
      collectionFolder = targetFolder + "/" + collection;
      collectionFolderList = await fileSystem("readDir", [ collectionFolder ]);
      collectionFolderIdList = collectionFolderList.filter((str) => { return !/^\./i.test(str) }).map((str) => {
        const [ c, id ] = str.split(fileKeyWords);
        return id;
      });

      if (mode === "create") {

        if (req.body.createQuery === undefined) {
          throw new Error("invalid post must be createQuery");
        }

        const { createQuery } = equalJson(req.body);

        if (typeof createQuery !== "object" || createQuery === null) {
          throw new Error("invalid create query");
        }
        if (typeof createQuery.id !== "string") {
          throw new Error("invalid create query : must be id");
        }
        if (/[^a-zA-Z0-9_]/gi.test(createQuery.id)) {
          throw new Error("invalid create query id 1");
        }
        if ((new RegExp(fileKeyWords, "g").test(createQuery.id))) {
          throw new Error("invalid create query id 2");
        }
        if (collectionFolderIdList.includes(createQuery.id)) {
          throw new Error("invalid create query id 3");
        }

        fileName = collection + fileKeyWords + createQuery.id + fileKeyWords + String((new Date()).valueOf()) + ".json";
        await fileSystem("writeJson", [ collectionFolder + "/" + fileName, createQuery ]);
        
      } else if (mode === "update") {

        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("invalid post");
        }

        const { whereQuery, updateQuery } = equalJson(req.body);

        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invalid where query");
        }
        if (typeof updateQuery !== "object" || updateQuery === null) {
          throw new Error("invalid update query");
        }
        if (typeof whereQuery.id !== "string") {
          throw new Error("invalid where query : must be id");
        }
        if (!collectionFolderIdList.includes(whereQuery.id)) {
          throw new Error("invalid where query : invalid id");
        }

        thisFileName = collectionFolderList.find((str) => { return (new RegExp("^" + collection + fileKeyWords + whereQuery.id)).test(str) });
        if (thisFileName === undefined) {
          throw new Error("invalid where query : invalid id");
        }
        
        thisJson = await fileSystem("readJson", [ collectionFolder + "/" + thisFileName ]);
        
        for (let order in updateQuery) {
          orderArr = order.split(".");
          if (orderArr.length > 0) {
            targetObj = thisJson;
            for (let i = 0; i < orderArr.length - 1; i++) {
              targetObj = targetObj[orderArr[i]];
            }
            targetObj[orderArr[orderArr.length - 1]] = updateQuery[order];
          }
        }

        await fileSystem("writeJson", [ collectionFolder + "/" + thisFileName, thisJson ]);

      } else if (mode === "read") {

        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }

        const { whereQuery } = equalJson(req.body);

        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invalid where query");
        }
        if (typeof whereQuery.id !== "string") {
          throw new Error("invalid where query : must be id");
        }
        if (!collectionFolderIdList.includes(whereQuery.id)) {
          throw new Error("invalid where query : invalid id");
        }

        thisFileName = collectionFolderList.find((str) => { return (new RegExp("^" + collection + fileKeyWords + whereQuery.id)).test(str) });
        if (thisFileName === undefined) {
          throw new Error("invalid where query : invalid id");
        }

        resultObj = await fileSystem("readJson", [ collectionFolder + "/" + thisFileName ]);

      } else if (mode === "delete") {

        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }

        const { whereQuery } = equalJson(req.body);

        if (typeof whereQuery !== "object" || whereQuery === null) {
          throw new Error("invalid where query");
        }
        if (typeof whereQuery.id !== "string") {
          throw new Error("invalid where query : must be id");
        }
        if (!collectionFolderIdList.includes(whereQuery.id)) {
          throw new Error("invalid where query : invalid id");
        }

        thisFileName = collectionFolderList.find((str) => { return (new RegExp("^" + collection + fileKeyWords + whereQuery.id)).test(str) });
        if (thisFileName === undefined) {
          throw new Error("invalid where query : invalid id");
        }

        await shellExec("rm", [ "-rf", collectionFolder + "/" + thisFileName ]);

      } else {
        throw new Error("invalid mode");
      }

      res.send(JSON.stringify(resultObj));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

BasicRouter.prototype.rou_post_textToVoice = function () {
  const instance = this;
  const { errorLog } = this.mother;
  const os = require("os");
  const thisOs = os.type();
  const { spawn } = require("child_process");
  const sayVoice = function (text) {
    let say, out;
    return new Promise((resolve, reject) => {
      say = spawn("say", [ text ]);
      out = "";
      say.stdout.on("data", (data) => { out += String(data); });
      say.stderr.on("data", (data) => { reject(String(data)); });
      say.on("close", (code) => { resolve(out) });
    });
  }
  let obj;
  obj = {};
  obj.link = [ "/textToVoice" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      let text;
      if (/Darwin/gi.test(thisOs)) {
        text = req.body.text;
        text = text.replace(/[\[\]\{\}\"\'\<\>\/\\\~\`\+\=\-\_\@\#\$\%\^\&\*\(\)\:\;]/g, '');
        text = text.replace(/[^가-힣\?\!\.]/gi, '');
        text = text.replace(/\'/g, '"').replace(/\n/g, ' ').replace(/\t/g, '');
        sayVoice(text).catch((err) => {
          console.log(err);
        });
        res.send(JSON.stringify({ message: "will do" }));
      } else {
        res.send(JSON.stringify({ message: "only possible in mac" }));
      }
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

BasicRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(BasicRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = BasicRouter;
