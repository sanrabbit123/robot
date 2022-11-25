const TransferRouter = function (MONGOC, MONGOLOCALC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.transinfo.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;
  this.timeouts = {};

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();

  this.staticConst = process.env.HOME + "/static";
  this.folderConst = this.staticConst + "/photo/designer";
  this.clientConst = this.staticConst + "/photo/client";

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "192.168.0.14:3000",
  ];

}

TransferRouter.prototype.fireWall = function (req) {
  const instance = this;
  let __originTarget, __wallLogicBoo, __vailHosts;

  __vailHosts = this.vaildHost;
  __originTarget = req.headers["origin"];
  if (typeof __originTarget !== "string") {
    __originTarget = req.headers["host"];
    if (typeof __originTarget !== "string") {
      __originTarget = "";
    }
  }
  __wallLogicBoo = false;
  for (let host of __vailHosts) {
    __wallLogicBoo = (new RegExp(host, "gi")).test(__originTarget.trim().replace(/\/$/, ''));
    if (__wallLogicBoo) {
      break;
    }
  }
  return __wallLogicBoo;
}

//GET ---------------------------------------------------------------------------------------------

TransferRouter.prototype.rou_get_First = function () {
  const instance = this;
  const { errorLog, diskReading } = this.mother;
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

      if (req.params.id === "ssl") {
        res.send(JSON.stringify({ message: "hi" }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

TransferRouter.prototype.rou_post_middlePhotoBinary = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const folderConst = this.folderConst;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoBinary" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (90000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (!err) {
            const { proid, desid, client, name } = fields;
            const requestNow = new Date();
            const requestNowValue = requestNow.valueOf();
            const token = "_";
            let execName, file;
            let fileNameConst, positionKey, order;

            for (let key in files) {
              file = files[key];
              [ fileNameConst, positionKey, order ] = key.split("_");
              execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];

              if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}` ]))) {
                await fileSystem(`mkdir`, [ `${folderConst}/${desid}` ]);
              }

              if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}/${proid}` ]))) {
                await fileSystem(`mkdir`, [ `${folderConst}/${desid}/${proid}` ]);
              }

              await shellExec(`mv ${shellLink(file.filepath)} ${folderConst}/${desid}/${proid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName};`);
            }

            res.send(JSON.stringify({ message: "success" }));

          } else {
            errorLog("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          errorLog("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoRead = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoRead" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.target === undefined) {
        throw new Error("invaild post");
      }
      const { target } = req.body;
      let list;
      let finalTarget;
      let tempArr;
      let tempDir;
      let tempString;

      finalTarget = "/" + (/^\//.test(target) ? target.slice(1) : target);

      tempArr = finalTarget.split("/");
      tempString = folderConst;
      for (let i = 0; i < tempArr.length - 1; i++) {
        tempDir = await fileSystem(`readDir`, [ tempString ]);
        if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
          await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
        }
        tempString += '/';
        tempString += tempArr[i];
      }

      list = (await fileSystem(`readDir`, [ folderConst + finalTarget ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoRead): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientPhoto = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const back = this.back;
  const { clientConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientPhoto" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.cliid === undefined) {
        throw new Error("invaild post");
      }
      const preferredPhotoName = "preferredPhoto";
      const sitePhotoName = "sitePhoto";
      const { cliid } = req.body;
      let totalList, client, phone;
      let preferredPhoto, sitePhoto;
      let preferredPhotoList, sitePhotoList;
      let root;
      let mode;

      mode = "siteMode";
      if (req.body.fileMode !== undefined) {
        mode = "fileMode";
      }

      client = await back.getClientById(cliid, { selfMongo: instance.mongo });
      if (client === null) {
        throw new Error("invaild cliid");
      }
      phone = client.phone.replace(/[^0-9]/g, '');
      root = clientConst;
      totalList = await fileSystem(`readDir`, [ root ]);
      totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return (new RegExp(phone, "gi")).test(i); });

      preferredPhoto = [];
      sitePhoto = [];
      for (let t of totalList) {
        if (await fileSystem(`exist`, [ root + "/" + t + "/" + preferredPhotoName ])) {
          preferredPhotoList = (await fileSystem(`readDir`, [ root + "/" + t + "/" + preferredPhotoName ])).filter((i) => { return i !== `.DS_Store` && !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${preferredPhotoName}/${i}`; });
        } else {
          preferredPhotoList = [];
        }
        if (await fileSystem(`exist`, [ root + "/" + t + "/" + sitePhotoName ])) {
          sitePhotoList = (await fileSystem(`readDir`, [ root + "/" + t + "/" + sitePhotoName ])).filter((i) => { return i !== `.DS_Store` && !/^\.\_/.test(i); }).map((i) => { return `${root}/${t}/${sitePhotoName}/${i}`; });
        } else {
          sitePhotoList = [];
        }
        preferredPhoto = preferredPhoto.concat(preferredPhotoList);
        sitePhoto = sitePhoto.concat(sitePhotoList);
      }

      if (mode !== "fileMode") {
        preferredPhoto = preferredPhoto.map((i) => { return `https://${instance.address.transinfo.host}/${global.encodeURI(i.replace(new RegExp(clientConst.split('/').slice(0, -2).join('/'), "gi"), '')).replace(/^\//, '')}`; });
        sitePhoto = sitePhoto.map((i) => { return `https://${instance.address.transinfo.host}/${global.encodeURI(i.replace(new RegExp(clientConst.split('/').slice(0, -2).join('/'), "gi"), '')).replace(/^\//, '')}`; });
      }

      res.send(JSON.stringify({ sitePhoto, preferredPhoto }));

    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_clientPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientBinary = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, todayMaker, messageSend } = this.mother;
  const { clientConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientBinary", "/binary" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (30000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {

            const { name, phone } = fields;
            const cilentFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + phone.replace(/\-/g, '');
            const uploadMap = {
              upload0: "sitePhoto",
              upload1: "preferredPhoto"
            };
            let list, clientFolder;
            let clientRows, cliid;

            clientFolder = `${clientConst}/${cilentFolderName}`;

            list = [];
            for (let i = 0; i < filesKeys.length; i++) {
              list.push(uploadMap[filesKeys[i]]);
            }

            if (!(await fileSystem(`exist`, [ clientFolder ]))) {
              await shellExec(`mkdir`, [ clientFolder ]);
              for (let i = 0; i < list.length; i++) {
                await shellExec(`mkdir`, [ `${clientFolder}/${list[i]}` ]);
              }
            }

            for (let i = 0; i < list.length; i++) {
              if (Array.isArray(files[filesKeys[i]])) {
                for (let j of files[filesKeys[i]]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
              }
            }

            await messageSend({ text: name + "님이 파일 전송을 시도중입니다!", channel: "#401_consulting" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            errorLog("Transfer lounge 서버 문제 생김 (rou_post_clientBinary): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          errorLog("Transfer lounge 서버 문제 생김 (rou_post_clientBinary): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_clientBinary): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientDelete = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientDelete" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (typeof req.body.path !== "string") {
        throw new Error("must be path");
      }
      if (!/^\//i.test(req.body.path)) {
        throw new Error("invaild path");
      }
      const { path } = req.body;
      let realDo;

      realDo = false;
      if (/^\/photo/gi.test(path)) {
        if (/client/gi.test(path)) {
          realDo = true;
        }
      }

      if (realDo) {
        await shellExec(`rm`, [ `-rf`, staticConst + path ]);
      }

      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_clientDelete): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleLinkParsing = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middleLinkParsing" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.links === undefined) {
        throw new Error("invaild post");
      }
      const targets = equalJson(req.body.links);
      let tong, raw, rawArr, link, memo;

      tong = [];
      for (let { desid, proid, file } of targets) {

        raw = (await fileSystem(`readString`, [ `${folderConst}/${desid}/${proid}/${file}` ])).trim();
        rawArr = raw.split("\n");
        if (rawArr.length === 1) {
          link = rawArr[0];
          memo = "";
        } else if (rawArr.length > 1) {
          link = rawArr[0];
          memo = rawArr[1];
        } else {
          link = "";
          memo = "";
        }

        tong.push({ desid, proid, file, link, memo });
      }

      res.send(JSON.stringify(tong));
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middleLinkParsing): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleLinkSave = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, cryptoString } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middleLinkSave" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.proid === undefined || req.body.desid === undefined || req.body.link === undefined || req.body.memo === undefined || req.body.key === undefined) {
        throw new Error("invaild post");
      }
      const { proid, desid, link, memo, key } = req.body;
      const now = new Date();
      const hash = await cryptoString("homeliaison", String(now.valueOf()));

      await fileSystem(`write`, [ `${folderConst}/${desid}/${proid}/${key}_${String(now.valueOf())}_${String(0)}_${hash}.link`, (global.decodeURIComponent(link).trim() + "\n" + memo.trim()) ]);

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middleLinkSave): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoRemove = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoRemove" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (req.body.targets === undefined) {
        throw new Error("invaild post, must be targets");
      }
      const { targets } = equalJson(req.body);
      if (!Array.isArray(targets)) {
        throw new Error("invaild post, must be targets");
      }
      if (targets.some((obj) => { return typeof obj !== "object" })) {
        throw new Error("invaild post, must be targets");
      }
      if (targets.some((obj) => { return obj === null })) {
        throw new Error("invaild post, must be targets");
      }

      for (let { desid, proid, fileName } of targets) {
        if (typeof desid !== "string" || typeof proid !== "string" || typeof fileName !== "string") {
          throw new Error("invaild post, must be targets");
        }
        if (await fileSystem(`exist`, [ folderConst + "/" + desid ])) {
          if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid ])) {
            if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName ])) {
              await shellExec(`rm`, [ `-rf`, folderConst + "/" + desid + "/" + proid + "/" + fileName ]);
            }
          }
        }
      }
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoRemove): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_generalFileUpload = function () {
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
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
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
              await shellExec(`mv ${shellLink(path)} ${shellLink(staticConst + "/" + toArr[num])}`);
              if (/\.pdf$/i.test(toArr[num])) {
                instance.imageReader.pdfToJpg(staticConst + "/" + toArr[num]).catch((err) => { console.log(err); });
              }
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleCommentsBinary = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { folderConst } = this;
  const drive = this.drive;
  let obj;
  obj = {};
  obj.link = [ "/middleCommentsBinary" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (30000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (!err) {
            const { proid, designer, client, desid } = fields;
            const parentsId = "1YuWV37wnTqe68nYqnn_oyu5j_p6SPuAe";
            let execName, file;
            let newFileName;

            for (let key in files) {
              file = files[key];
              execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];
              newFileName = `${folderConst}/${desid}/${proid}/${designer}_${client}_디자이너글_${proid}.${execName}`;
              await shellExec(`mv ${shellLink(file.filepath)} ${newFileName};`);
              await drive.upload_inPython(parentsId, newFileName);
              await shellExec(`rm -rf ${newFileName};`);
            }

            res.send(JSON.stringify({ message: "done" }));

          } else {
            errorLog("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          errorLog("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      errorLog("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

TransferRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(TransferRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = TransferRouter;
