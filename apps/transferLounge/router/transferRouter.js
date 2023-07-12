const TransferRouter = function (MONGOC, MONGOLOCALC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const ReadDocuments = require(`${process.cwd()}/apps/readDocuments/readDocuments.js`);

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
  this.documents = new ReadDocuments();

  this.staticConst = process.env.HOME + "/static";
  this.folderConst = this.staticConst + "/photo/designer";
  this.clientConst = this.staticConst + "/photo/client";
  this.aspirantConst = this.staticConst + "/photo/aspirant";
  this.contractLinkConst = "/photo/contract";
  this.contractConst = this.staticConst + this.contractLinkConst;
  this.userLinkConst = "/photo/user";
  this.userConst = this.staticConst + this.userLinkConst;
  this.hashConst = "homeliaisonHash";
  this.tempConst = this.staticConst + "/photo/temp";
  this.designerProfileConst = this.folderConst + "/profile";
  this.designerWorksConst = this.folderConst + "/works";

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
    "172.30.1.37:3000",
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
  const { diskReading, aliveMongo } = this.mother;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {

      if (req.params.id === "ssl") {
        const disk = await diskReading();
        const aliveMongoResult = await aliveMongo();
        res.send(JSON.stringify({ disk: disk.toArray(), mongo: aliveMongoResult }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

TransferRouter.prototype.rou_post_middlePhotoBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const folderConst = this.folderConst;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoBinary" ];
  obj.func = async function (req, res, logger) {
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
            const { proid, desid, client, name, type } = fields;
            const requestNow = new Date();
            const requestNowValue = requestNow.valueOf();
            const token = "_";
            const exeConst = "jpg";
            const digitConst = 4;
            let execName, file;
            let fileNameConst, positionKey, order;
            let results;
            let past;
            let pureConst;
            let digitTenConst;
            let pureFileConst;
            let pureFolderConst;
            let jpgKey, jpgDateValue, jpgOrder, jpgName;
            let newOrder;

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

              if (type === "photo") {
                if (/pdf$/i.test(execName)) {
                  results = await instance.imageReader.pdfToJpg(`${folderConst}/${desid}/${proid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName}`, true);
                  for (let index = 0; index < results.length; index++) {
                    past = results[index];
                    pureConst = past.slice(0, -1 * (digitConst + (exeConst.length + 1)));
                    digitTenConst = 10 ** digitConst;
                    pureFileConst = pureConst.split("/")[pureConst.split("/").length - 1];
                    pureFolderConst = pureConst.split("/").slice(0, -1).join("/");
                    [ jpgKey, jpgDateValue, jpgOrder, jpgName ] = pureFileConst.split(token);
                    newOrder = String(((Number(jpgOrder) + 1) * digitTenConst) + (index + 1));
                    await shellExec(`mv ${shellLink(past)} ${shellLink(pureFolderConst)}/${jpgKey}${token}${jpgDateValue}${token}${newOrder}${token}${jpgName}.${exeConst}`);
                  }
                }
              }

            }

            res.send(JSON.stringify({ message: "success" }));

          } else {
            console.log(err);
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary 1): " + err.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + err.message }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoRead = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoRead" ];
  obj.func = async function (req, res, logger) {
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
      for (let i = 0; i < tempArr.length; i++) {
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
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoRead): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientPhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const back = this.back;
  const { clientConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientPhoto" ];
  obj.func = async function (req, res, logger) {
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
      let totalList, client;
      let preferredPhoto, sitePhoto;
      let preferredPhotoList, sitePhotoList;
      let root;
      let mode;

      mode = "siteMode";
      if (req.body.fileMode !== undefined) {
        mode = "fileMode";
      }

      root = clientConst;
      totalList = await fileSystem(`readDir`, [ root ]);
      totalList = totalList.filter((i) => { return i !== ".DS_Store" }).filter((i) => { return (new RegExp(cliid, "gi")).test(i); });

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
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_clientPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, todayMaker, messageSend } = this.mother;
  const { clientConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientBinary", "/binary" ];
  obj.func = async function (req, res, logger) {
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
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {
            const { name, cliid } = fields;
            const clientFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + cliid;
            const uploadMap = {
              upload0: "sitePhoto",
              upload1: "preferredPhoto"
            };
            let list, clientFolder;
            let clientRows;

            clientFolder = `${clientConst}/${clientFolderName}`;

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
                  if (/\.pdf$/.test(j.originalFilename)) {
                    await instance.imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + j.originalFilename, true);
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  await instance.imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                }
              }
            }

            await messageSend({ text: name + "님의 파일 전송을 완료하였습니다!", channel: "#404_curation" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            console.log(err);
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_clientBinary 1)").catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_clientBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_clientBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, todayMaker, messageSend } = this.mother;
  const { aspirantConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantBinary" ];
  obj.func = async function (req, res, logger) {
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
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {
            const { name, aspid } = fields;
            const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid;
            const uploadMap = {
              upload0: "portfolio",
            };
            let list, aspirantFolder;
            let clientRows;

            aspirantFolder = `${aspirantConst}/${aspirantFolderName}`;

            list = [];
            for (let i = 0; i < filesKeys.length; i++) {
              list.push(uploadMap[filesKeys[i]]);
            }

            if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
              await shellExec(`mkdir`, [ aspirantFolder ]);
              for (let i = 0; i < list.length; i++) {
                await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]);
              }
            }

            for (let i = 0; i < list.length; i++) {
              if (Array.isArray(files[filesKeys[i]])) {
                for (let j of files[filesKeys[i]]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                  if (/\.pdf$/.test(j.originalFilename)) {
                    await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true);
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                }
              }
            }

            await messageSend({ text: name + "님의 파일 전송을 완료하였습니다!", channel: "#404_curation" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantBinary 1)").catch((e) => { console.log(e); });
            console.log(err);
            res.send(JSON.stringify({ message: "error" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clientDelete = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/clientDelete" ];
  obj.func = async function (req, res, logger) {
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
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_clientDelete): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleLinkParsing = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, decryptoHash } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middleLinkParsing" ];
  obj.func = async function (req, res, logger) {
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
      let key, date, order, hashRaw, hash, exe;
      let parsedString;

      tong = [];
      for (let { desid, proid, file } of targets) {

        [ key, date, order, hashRaw ] = file.split("_");
        [ hash, exe ] = hashRaw.split(".");
        parsedString = await decryptoHash("homeliaison", hash);

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

        if (!(/^[0-9]/.test(parsedString) && /[0-9]$/.test(parsedString) && parsedString.length > 5 && parsedString.replace(/[0-9]/gi, '') === '')) {
          await fileSystem(`write`, [ `${folderConst}/${desid}/${proid}/${file}`, link + "\n" + parsedString ]);
          memo = parsedString;
        }

        tong.push({ desid, proid, file, link, memo });
      }

      res.send(JSON.stringify(tong));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleLinkParsing): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleLinkSave = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, cryptoString } = this.mother;
  const { folderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middleLinkSave" ];
  obj.func = async function (req, res, logger) {
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
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleLinkSave): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoRemove = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { folderConst, clientConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoRemove" ];
  obj.func = async function (req, res, logger) {
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

      let desid, proid, fileName;
      let folder, kind;

      for (let obj of targets) {
        if (typeof obj !== "object" || obj === null) {
          throw new Error("invaild post, must be targets");
        }
        if (obj.mode === "designer") {
          desid = obj.desid;
          proid = obj.proid;
          fileName = obj.fileName;

          if (await fileSystem(`exist`, [ folderConst + "/" + desid ])) {
            if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid ])) {
              if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName ])) {
                await shellExec(`rm`, [ `-rf`, folderConst + "/" + desid + "/" + proid + "/" + fileName ]);
              }
            }
          }

        } else {
          folder = global.decodeURIComponent(obj.folder);
          kind = obj.kind;
          fileName = global.decodeURIComponent(obj.fileName);

          if (await fileSystem(`exist`, [ clientConst + "/" + folder ])) {
            if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind ])) {
              if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName ])) {
                await shellExec(`rm`, [ `-rf`, clientConst + "/" + folder + "/" + kind + "/" + fileName ]);
              }
            }
          }

        }
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoRemove): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoUpdate = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { folderConst, clientConst, hashConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoUpdate" ];
  obj.func = async function (req, res, logger) {
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
      let key, date, order, hashRaw, pastHash, exe;
      let newFileName;
      let desid, proid, fileName;
      let folder, kind;
      let hash, mode;

      for (let obj of targets) {
        if (typeof obj !== "object" || obj === null) {
          throw new Error("invaild post, must be targets");
        }

        hash = obj.hash;
        mode = obj.mode;

        if (mode === "designer") {
          desid = obj.desid;
          proid = obj.proid;
          fileName = obj.fileName;

          if (await fileSystem(`exist`, [ folderConst + "/" + desid ])) {
            if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid ])) {
              if (await fileSystem(`exist`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName ])) {
                [ key, date, order, hashRaw ] = fileName.split("_");
                [ pastHash, exe ] = hashRaw.split(".");
                newFileName = key + "_" + date + "_" + order + "_" + hash + "." + exe;
                if (pastHash !== hash) {
                  await shellExec(`mv`, [ folderConst + "/" + desid + "/" + proid + "/" + fileName, folderConst + "/" + desid + "/" + proid + "/" + newFileName ]);
                }
              }
            }
          }

        } else {
          folder = global.decodeURIComponent(obj.folder);
          kind = obj.kind;
          fileName = global.decodeURIComponent(obj.fileName);

          if (await fileSystem(`exist`, [ clientConst + "/" + folder ])) {
            if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind ])) {
              if (await fileSystem(`exist`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName ])) {
                newFileName = hashConst + "_" + hash + "." + fileName.split(".")[fileName.split(".").length - 1];
                await shellExec(`mv`, [ clientConst + "/" + folder + "/" + kind + "/" + fileName, clientConst + "/" + folder + "/" + kind + "/" + newFileName ]);
              }
            }
          }

        }
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoUpdate): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_generalFileUpload = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  const hangul = this.hangul;
  let obj;
  obj = {};
  obj.link = [ "/generalFileUpload" ];
  obj.func = async function (req, res, logger) {
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
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middleCommentsBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, requestSystem } = this.mother;
  const { folderConst } = this;
  const address = this.address;
  const drive = this.drive;
  const documents = this.documents;
  let obj;
  obj = {};
  obj.link = [ "/middleCommentsBinary" ];
  obj.func = async function (req, res, logger) {
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
            const { proid, designer, client, desid, cliid } = fields;
            const parentsId = "1YuWV37wnTqe68nYqnn_oyu5j_p6SPuAe";
            let execName, file;
            let newFileName;
            let contents;
            let tongContents;
            let body;
            let type;

            tongContents = [];
            for (let key in files) {
              file = files[key];
              execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];
              newFileName = `${folderConst}/${desid}/${proid}/${designer}_${client}_디자이너글_${proid}.${execName}`;

              if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}` ]))) {
                await shellExec(`mkdir`, [ `${folderConst}/${desid}` ]);
              }

              if (!(await fileSystem(`exist`, [ `${folderConst}/${desid}/${proid}` ]))) {
                await shellExec(`mkdir`, [ `${folderConst}/${desid}/${proid}` ]);
              }

              await shellExec(`mv ${shellLink(file.filepath)} ${newFileName};`);
              contents = await documents.readFile(newFileName);
              if (contents === null) {
                tongContents.push('');
              } else {
                body = contents.body;
                type = contents.type;
                tongContents.push(body);
                
                requestSystem("https://" + address.secondinfo.host + ":3000/projectDesignerRaw", { mode: "update", proid, cliid, desid, body, type }, { headers: {
                  "Content-Type": "application/json",
                  "origin": address.transinfo.host,
                } }).then(() => {
                  return drive.upload_inPython(parentsId, newFileName);
                }).then(() => {
                  return shellExec(`rm -rf ${newFileName};`);
                }).catch((err) => {
                  logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary): " + err.message).catch((e) => { console.log(e); });
                });

              }
            }

            res.send(JSON.stringify(tongContents));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary 1): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middleCommentsBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_middlePhotoAlarm = function () {
  const instance = this;
  const { messageSend, equalJson } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/middlePhotoAlarm" ];
  obj.func = async function (req, res, logger) {
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
      if (req.body.designer === undefined || req.body.client === undefined || req.body.desid === undefined || req.body.proid === undefined || req.body.title === undefined || req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const { designer, client, desid, proid, title, mode } = equalJson(req.body);
      const channel = "#301_console";
      const voice = false;
      let text;

      if (mode === "designer") {
        text = designer + " 실장님이 콘솔을 통해 " + client + " 고객님 " + title + " 파일을 업로드했습니다!";
      } else {
        text = client + " 고객님이 콘솔을 통해 " + title + " 파일을 업로드했습니다!";
      }
      text += "\n";
      text += "https://" + instance.address.backinfo.host + "/designer?mode=checklist&desid=" + desid + "&proid=" + proid;
      text += "\n";

      await messageSend({ text, channel, voice });
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoAlarm): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_userBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const { userConst } = this;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/userBinary" ];
  obj.func = async function (req, res, logger) {
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
            const { name, phone, useid } = fields;
            const userFolderName = useid + "_" + phone.replace(/\-/g, '') + "_" + String((new Date()).valueOf());
            const binaryFolder = userConst;
            const binrayFolderTest = new RegExp(userFolderName, 'gi');
            const binaryFolderDetail = await fileSystem(`readDir`, [ binaryFolder ]);
            const selfMongo = instance.mongo;
            let user;
            let binrayFolderBoo;
            let photoObj;
            let updateQuery, whereQuery;
            let userCopied;
            let filesKeys;

            // make folder and move file
            binrayFolderBoo = false;
            for (let i of binaryFolderDetail) {
              if (binrayFolderTest.test(i)) {
              binrayFolderBoo = true;
              }
            }
            if (!binrayFolderBoo) {
              await shellExec(`mkdir ${shellLink(binaryFolder + '/' + userFolderName)}`);
            }

            filesKeys = Object.keys(files);
            for (let key of filesKeys) {
              if (Array.isArray(files[key])) {
                for (let j of files[key]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(binaryFolder + '/' + userFolderName + '/' + j.originalFilename)};`);
                }
              } else {
                await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + userFolderName + '/' + files[key].originalFilename)};`);
              }
            }

            // data
            user = await back.getUserById(useid, { selfMongo });
            photoObj = back.returnUserDummies("request.photo");
            photoObj.date = new Date();
            photoObj.key = userFolderName;

            userCopied = user.toNormal();
            userCopied.request.photo.unshift(photoObj);

            whereQuery = { useid };
            updateQuery = {};
            updateQuery["request.photo"] = userCopied.request.photo;
            updateQuery["request.status"] = "사진 전송";
            updateQuery["response.status"] = "지정 필요";

            await back.updateUser([ whereQuery, updateQuery ], { selfMongo });

            // slack
            await messageSend({ text: name + " 고객님의 사진 전송이 완료되었어요.", channel: "#405_mini", voice: true });

            res.send(JSON.stringify({ message: "success" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_userBinary 1): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_userBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_userBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_userConfirm = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const { userConst } = this;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/userConfirm" ];
  obj.func = async function (req, res, logger) {
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
            const useid = fields.useid;
            const length = Number(fields.indexLength);
            const binaryFolder = userConst;
            const selfMongo = instance.mongo;
            const now = new Date();
            const nowValue = now.valueOf();
            let keyConcept, keyCollage, keyReference;
            let dummyDesign;
            let dummyConcept, dummyCollage, dummyReference, dummyList;
            let user;
            let key;
            let targetMatrix;
            let dummyListDetail;
            let whereQuery, updateQuery;
            let copiedDesign;
            let filesKeys;

            filesKeys = Object.keys(files);

            user = await back.getUserById(useid, { selfMongo });

            dummyDesign = back.returnUserDummies("response.design");

            for (let i = 0; i < length; i++) {

              dummyConcept = back.returnUserDummies("response.design.concept");
              dummyCollage = back.returnUserDummies("response.design.proposal");
              dummyReference = back.returnUserDummies("response.design.photo");
              dummyList = back.returnUserDummies("response.design.list");

              keyConcept = useid + "_" + "concept" + String(i) + "_" + String(nowValue);
              keyCollage = useid + "_" + "collage" + String(i) + "_" + String(nowValue);
              keyReference = useid + "_" + "reference" + String(i) + "_" + String(nowValue);

              await shellExec(`mkdir ${shellLink(binaryFolder + '/' + keyConcept)}`);
              await shellExec(`mkdir ${shellLink(binaryFolder + '/' + keyCollage)}`);
              await shellExec(`mkdir ${shellLink(binaryFolder + '/' + keyReference)}`);

              key = "concept_file_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyConcept + '/' + files[key].originalFilename)};`);
              key = "collage_file_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyCollage + '/' + files[key].originalFilename)};`);
              key = "reference_file0_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyReference + '/' + files[key].originalFilename)};`);
              key = "reference_file1_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyReference + '/' + files[key].originalFilename)};`);
              key = "reference_file2_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyReference + '/' + files[key].originalFilename)};`);
              key = "reference_file3_" + String(i);
              await shellExec(`mv ${shellLink(files[key].filepath)} ${shellLink(binaryFolder + '/' + keyReference + '/' + files[key].originalFilename)};`);

              dummyConcept.date = new Date();
              dummyConcept.key = keyConcept;
              dummyConcept.target = i;
              dummyConcept.comments.designer = fields["concept_description_" + String(i)];

              dummyCollage.date = new Date();
              dummyCollage.key = keyCollage;
              dummyCollage.target = i;
              dummyCollage.comments.designer = fields["collage_description_" + String(i)];

              dummyReference.date = new Date();
              dummyReference.key = keyReference;
              dummyReference.target = i;
              dummyReference.comments.designer = fields["reference_description_" + String(i)];

              dummyList.date = new Date();
              dummyList.target = i;
              dummyList.detail = [];
              targetMatrix = equalJson(fields["list_matrix_" + String(i)]);
              for (let [ image, name, number, unit, delivery, total, spec, site, link, etc ] of targetMatrix) {
                dummyListDetail = back.returnUserDummies("response.design.list.detail");
                dummyListDetail.image = String(image).trim();
                dummyListDetail.name = String(name).trim();
                dummyListDetail.number = Number(number);
                dummyListDetail.price.unit = Number(unit);
                dummyListDetail.price.delivery = Number(delivery);
                dummyListDetail.detail = (String(spec) + " " + String(etc)).trim();
                dummyListDetail.where.name = String(site).trim();
                dummyListDetail.where.link = String(link).trim();
                dummyList.detail.push(dummyListDetail);
              }

              dummyDesign.concept.unshift(dummyConcept);
              dummyDesign.proposal.unshift(dummyCollage);
              dummyDesign.photo.unshift(dummyReference);
              dummyDesign.list.unshift(dummyList);
            }

            whereQuery = { useid };
            updateQuery = {};
            updateQuery["response.timeline"] = new Date();
            updateQuery["response.status"] = "컨펌 대기";
            updateQuery["response.alarm"] = true;
            copiedDesign = user.response.design.toNormal();
            copiedDesign.unshift(dummyDesign);
            updateQuery["response.design"] = copiedDesign;

            await back.updateUser([ whereQuery, updateQuery ], { selfMongo });

            // slack
            await messageSend({ text: user.name + " 고객님의 디자인 컨펌 요청이 발생하였습니다.", channel: "#405_mini", voice: true });

            res.send(JSON.stringify({ message: "success" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_userConfirm 1): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_userConfirm 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_userConfirm 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_userPhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const { userConst, userLinkConst } = this;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/userPhoto" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.useid === undefined) {
        throw new Error("invaild post");
      }
      const staticPath = userConst;
      const selfMongo = instance.mongo;
      const { useid } = req.body;
      const user = await back.getUserById(useid, { selfMongo });
      let keyArr;
      let dir;
      let tong;

      keyArr = user.request.photo.toNormal().map((obj) => { return obj.key });
      keyArr = keyArr.map((str) => { return { path: staticPath + "/" + str, link: userLinkConst + "/" + str } });

      tong = [];
      for (let { path, link } of keyArr) {
        dir = await fileSystem("readDir", [ path ]);
        dir = dir.filter((str) => { return str !== ".DS_Store" }).map((str) => { return link + "/" + str });
        tong = tong.concat(dir);
      }

      res.send(JSON.stringify({ list: tong }));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_userPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_userKey = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const { userConst, userLinkConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/userKey" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.key === undefined) {
        throw new Error("invaild post");
      }
      const staticPath = userConst;
      const selfMongo = instance.mongo;
      const { key } = req.body;
      const keyDetailList = (await fileSystem("readDir", [ staticPath + "/" + key ])).filter((str) => { return str !== ".DS_Store" });
      res.send(JSON.stringify({ list: keyDetailList.map((str) => { return userLinkConst + "/" + key + "/" + str }) }));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_userKey): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_excelToMatrix = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const ExcelReader = require(`${process.cwd()}/apps/excelReader/excelReader.js`);
  const excel = new ExcelReader();
  let obj;
  obj = {};
  obj.link = [ "/excelToMatrix" ];
  obj.func = async function (req, res, logger) {
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
            const filesKeys = Object.keys(files);
            if (filesKeys.length === 0) {
              throw new Error("invalid post");
            }
            const { sheetsName } = fields;
            const file = files[filesKeys[0]];
            const matrix = await excel.fileToMatrix(file.filepath, sheetsName)
            await shellExec(`rm -rf ${shellLink(file.filepath)};`);
            res.send(JSON.stringify(matrix));
          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_excelToMatrix 1): " + e.message).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + e.message }));
          }
        } catch (e) {
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_excelToMatrix 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_excelToMatrix 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_contractList = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend } = this.mother;
  const { contractLinkConst, contractConst } = this;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/contractList" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const splitToken = "__split__";
      const rawList = await fileSystem("readDir", [ contractConst ]);
      let result;

      result = rawList.filter((str) => { return !/^\./.test(str) }).map((rawString) => {
        const [ proid, cliid, requestNumberString, idFileExe ] = rawString.split(splitToken);
        const [ id, zip ] = idFileExe.split(".");
        return {
          proid,
          cliid,
          requestNumber: Number(requestNumberString),
          id,
          fileName: rawString,
          downloadLink: "https://" + address.transinfo.host + contractLinkConst + "/" + rawString,
        }
      });

      if (req.body.mode === "search" && typeof req.body.proid === "string") {
        result = result.filter((obj) => { return obj.proid === req.body.proid });
        if (result.length > 0) {
          result = { contract: result[0] };
        } else {
          result = { contract: null };
        }
      }

      res.send(JSON.stringify(result));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_contractList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_imageAnalytics = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, uniqueValue } = this.mother;
  const back = this.back;
  const { tempConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/imageAnalytics" ];
  obj.func = async function (req, res, logger) {
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
          if (err) {
            throw new Error(err);
          } else {
            const { exe } = fields;
            let filesKey, fromArr;
            let thisFileName;
            let imageJson;

            thisFileName = "file_" + uniqueValue("hex") + "." + exe;

            filesKey = Object.keys(files);
            if (filesKey.length !== 1) {
              throw new Error("only one image must");
            }

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            for (let { filepath: path } of fromArr) {
              await shellExec(`mv ${shellLink(path)} ${shellLink(tempConst + "/" + thisFileName)}`);
            }

            imageJson = await instance.imageReader.readImage(tempConst + "/" + thisFileName);
            await shellExec(`rm -rf ${shellLink(tempConst + "/" + thisFileName)}`);

            res.send(JSON.stringify(imageJson));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_imageAnalytics): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerProfilePhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, uniqueValue, stringToLink, linkToString } = this.mother;
  const address = this.address;
  const { staticConst, designerProfileConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/designerProfilePhoto" ];
  obj.func = async function (req, res, logger) {
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
          if (err) {
            throw new Error(err);
          } else {
            const token = "__split__";
            const now = new Date();
            const { desid, gs, exe } = fields;
            const longConst = 1500;
            const idConst = "profile_";
            const xPositionConst = 50;
            const yPositionConst = 50;
            let filesKey, fromArr;
            let thisFileName;
            let imageJson;
            let thisLinkPath;
            let thisLink;
            let resultObj;
            let id;

            id = (idConst + uniqueValue("hex"));
            thisFileName = desid + token + gs + token + String(now.valueOf()) + token + String(xPositionConst) + token + String(yPositionConst) + token + id + "." + exe;

            filesKey = Object.keys(files);
            if (filesKey.length !== 1) {
              throw new Error("only one image must");
            }

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            for (let { filepath: path } of fromArr) {
              await shellExec(`mv ${shellLink(path)} ${shellLink(designerProfileConst + "/" + thisFileName)}`);
            }
            if (gs === "g") {
              await instance.imageReader.resizeImage(designerProfileConst + "/" + thisFileName, longConst, null);
            } else {
              await instance.imageReader.resizeImage(designerProfileConst + "/" + thisFileName, null, longConst);
            }

            thisLinkPath = String(designerProfileConst + "/" + thisFileName).replace(new RegExp("^" + staticConst, "g"), "");
            thisLink = linkToString("https://" + address.transinfo.host + thisLinkPath);
            resultObj = {
              id,
              desid,
              gs,
              date: now,
              link: thisLink,
              file: {
                exe,
                name: designerProfileConst + "/" + thisFileName,
              },
              position: {
                x: Number(xPositionConst),
                y: Number(yPositionConst),
              }
            };

            res.send(JSON.stringify(resultObj));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerProfilePhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerProfileList = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend, linkToString } = this.mother;
  const { designerProfileConst, staticConst } = this;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerProfileList" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined) {
        throw new Error("invalid post");
      }
      const { desid } = req.body;
      const splitToken = "__split__";
      const rawList = await fileSystem("readDir", [ designerProfileConst ]);
      let result;

      result = rawList.filter((str) => { return !/^\./.test(str) }).map((rawString) => {
        const [ desid, gs, timeNumber, xPosition, yPosition, uniqueExe ] = rawString.split(splitToken);
        const [ id, exe ] = uniqueExe.split(".");
        return {
          id,
          desid,
          gs,
          date: new Date(Number(timeNumber)),
          link: linkToString("https://" + address.transinfo.host + String(designerProfileConst + "/" + rawString).replace(new RegExp("^" + staticConst, "g"), "")),
          file: {
            exe,
            name: rawString,
          },
          position: {
            x: Number(xPosition),
            y: Number(yPosition),
          }
        }
      });

      result = result.filter((obj) => { return obj.desid === desid });
      result.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

      res.send(JSON.stringify(result));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerProfileList): " + e.message).catch((e) => { console.log(e); });
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
