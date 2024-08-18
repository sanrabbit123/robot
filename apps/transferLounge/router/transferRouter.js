const TransferRouter = function (slack_bot, slack_user, MONGOC, MONGOLOCALC, slack_userToken, slack_info, kakao, human) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
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
  this.sheets = new GoogleSheet();
  this.drive = new GoogleDrive();
  this.documents = new ReadDocuments();
  this.members = {};

  this.slack_userToken = slack_userToken;
  this.slack_bot = slack_bot;
  this.slack_user = slack_user;
  this.slack_info = slack_info;

  this.kakao = kakao;
  this.human = human;

  this.staticConst = process.env.HOME + "/static";
  this.sambaToken = "__samba__";
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
  this.designerSettingConst = this.folderConst + "/setting";
  this.designerWorksConstFactors = [ "w0", "w1", "w2", "w3" ];
  this.designerRepresentativeFolderConst = this.folderConst + "/representative";

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.testinfo.host,
    this.address.contentsinfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "172.30.1.90:3000",
    "172.30.1.37:3000",
    "192.168.0.90:3000",
  ];

}

TransferRouter.prototype.baseMaker = function (target, req = null) {
  const instance = this;
  let html;

  html = `<!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
      <title>HomeLiaison Second Ghost: ${target}</title>
      <style></style>
    </head>
    <body>
      <div id="totalcontents"></div>
      <script src="${target}.js"></script>
    </body>
  </html>`;

  return new Promise(function(resolve, reject) {
    resolve(html);
  });
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
  const { diskReading, aliveMongo, requestSystem, fileSystem } = this.mother;
  const kakao = this.kakao;
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

TransferRouter.prototype.rou_post_readDir = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/readDir", "/readFolder" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp("^" + sambaToken, "i"), staticConst);

      if (await fileSystem(`exist`, [ target ])) {
        if (await fileSystem(`isDir`, [ target ])) {
          list = await fileSystem(`readFolder`, [ target ]);
          res.send(JSON.stringify(list));
        } else {
          res.send(JSON.stringify([]));
        }
      } else {
        res.send(JSON.stringify([]));
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_readDir): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        const { proid, desid, client, name, type } = fields;
        try {
          if (!err) {
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

            if (name.replace(/[0-9a-f]/g, '') !== '') {
              logger.error("Transfer lounge rou_post_middlePhotoBinary: 이상한 이름 발견" + name + " / " + desid + " / " + proid).catch((e) => { console.log(e); });
            }

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
                  try {
                    results = await instance.imageReader.pdfToJpg(`${folderConst}/${desid}/${proid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName}`, true);
                    for (let index = 0; index < results.length; index++) {
                      past = results[index];
                      pureConst = past.slice(0, -1 * (digitConst + (exeConst.length + 1)));
                      digitTenConst = 10 ** digitConst;
                      pureFileConst = pureConst.split("/")[pureConst.split("/").length - 1];
                      pureFolderConst = pureConst.split("/").slice(0, -1).join("/");
                      [ jpgKey, jpgDateValue, jpgOrder, jpgName ] = pureFileConst.split(token);
                      newOrder = String(((Number(jpgOrder) + 1) * digitTenConst) + (index + 1));
                      await shellExec(`mv ${shellLink(past)} ${shellLink(pureFolderConst)}/${jpgKey}${token}${jpgDateValue}${token}${newOrder}${token}${name}.${exeConst}`);
                    }
                  } catch {}
                }
              }

            }

            res.send(JSON.stringify({ message: "success" }));

          } else {
            console.log(err);
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary 1): " + err.message + " / " + desid + " / " + proid).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + err.message }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message + " / " + desid + " / " + proid }));
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

      list = (await fileSystem(`readFolder`, [ folderConst + finalTarget ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });

      res.send(JSON.stringify(list));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_middlePhotoRead): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_representativeFileBinary = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const folderConst = this.folderConst;
  const designerRepresentativeFolderConst = this.designerRepresentativeFolderConst;
  let obj;
  obj = {};
  obj.link = [ "/representativeFileBinary" ];
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        const { desid, name, type } = fields;
        try {
          if (!err) {
            const requestNow = new Date();
            const requestNowValue = requestNow.valueOf();
            const token = "_";
            let execName, file;
            let fileNameConst, positionKey, order;

            if (name.replace(/[0-9a-f]/g, '') !== '') {
              logger.error("Transfer lounge rou_post_representativeFileBinary: 이상한 이름 발견" + name + " / " + desid).catch((e) => { console.log(e); });
            }

            for (let key in files) {
              file = files[key];
              [ fileNameConst, positionKey, order ] = key.split("_");
              execName = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];

              if (!(await fileSystem(`exist`, [ `${designerRepresentativeFolderConst}/${desid}` ]))) {
                await fileSystem(`mkdir`, [ `${designerRepresentativeFolderConst}/${desid}` ]);
              }

              await shellExec(`mv ${shellLink(file.filepath)} ${designerRepresentativeFolderConst}/${desid}/${positionKey}${token}${String(requestNowValue)}${token}${order}${token}${name}.${execName};`);
            }

            res.send(JSON.stringify({ message: "success" }));

          } else {
            console.log(err);
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileBinary 1): " + err.message + " / " + desid).catch((e) => { console.log(e); });
            res.send(JSON.stringify({ message: "error : " + err.message }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message + " / " + desid }));
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_representativeFileRead = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  const designerRepresentativeFolderConst = this.designerRepresentativeFolderConst;
  let obj;
  obj = {};
  obj.link = [ "/representativeFileRead" ];
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
      let tempList;
      let resultList;

      if (target === "$all") {

        list = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });
        resultList = [];
        for (let desid of list) {
          tempList = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst + "/" + desid ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });
          resultList.push({
            desid,
            folder: designerRepresentativeFolderConst,
            boo: (tempList.length > 0),
          })
        }
        res.send(JSON.stringify(resultList));

      } else {

        finalTarget = "/" + (/^\//.test(target) ? target.slice(1) : target);

        tempArr = finalTarget.split("/");
        tempString = designerRepresentativeFolderConst;
        for (let i = 0; i < tempArr.length; i++) {
          tempDir = await fileSystem(`readDir`, [ tempString ]);
          if (!tempDir.includes(tempArr[i]) && tempArr[i] !== "") {
            await shellExec(`mkdir ${shellLink(tempString + "/" + tempArr[i])}`);
          }
          tempString += '/';
          tempString += tempArr[i];
        }
  
        list = (await fileSystem(`readDir`, [ designerRepresentativeFolderConst + finalTarget ])).filter((str) => { return (!/^\._/.test(str) && !/DS_Store/gi.test(str)) });
  
        res.send(JSON.stringify(list));

      }
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileRead): " + e.message).catch((e) => { console.log(e); });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
                    try {
                      await instance.imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + j.originalFilename, true);
                    } catch {}
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  try {
                    await instance.imageReader.pdfToJpg(clientFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                  } catch {}
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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

            aspirantFolder = `${aspirantConst}/${aspirantFolderName}`;

            list = [];
            for (let i = 0; i < filesKeys.length; i++) {
              list.push(uploadMap[filesKeys[i]]);
            }

            if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
              await shellExec(`mkdir`, [ aspirantFolder ]);
            }
            for (let i = 0; i < list.length; i++) {
              if (!(await fileSystem(`exist`, [ `${aspirantFolder}/${list[i]}` ]))) {
                await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]);
              }
            }

            for (let i = 0; i < list.length; i++) {
              if (Array.isArray(files[filesKeys[i]])) {
                for (let j of files[filesKeys[i]]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                  if (/\.pdf$/.test(j.originalFilename)) {
                    try {
                      await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true);
                    } catch {}
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  try {
                    await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                  } catch {}
                }
              }
            }

            await messageSend({ text: name + "님의 파일 전송을 완료하였습니다!", channel: "#301_apply" });
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

TransferRouter.prototype.rou_post_aspirantSettingBinary = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, todayMaker, messageSend, requestSystem, uniqueValue } = this.mother;
  const { aspirantConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantSettingBinary" ];
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {
            const { mode, name, aspid, phone, description } = fields;
            const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid;
            const uploadMap = {
              upload0: "setting",
              upload1: "proposal",
            };
            let list, aspirantFolder;

            aspirantFolder = `${aspirantConst}/${aspirantFolderName}`;

            list = [];
            for (let i = 0; i < filesKeys.length; i++) {
              list.push(uploadMap[filesKeys[i]]);
            }

            if (!(await fileSystem(`exist`, [ aspirantFolder ]))) {
              await shellExec(`mkdir`, [ aspirantFolder ]);
            }
            for (let i = 0; i < list.length; i++) {
              if (!(await fileSystem(`exist`, [ `${aspirantFolder}/${list[i]}` ]))) {
                await shellExec(`mkdir`, [ `${aspirantFolder}/${list[i]}` ]);
              }
              await fileSystem(`write`, [ `${aspirantFolder}/${list[i]}/description_${String(uniqueValue("hex"))}.txt`, description ]);
            }

            for (let i = 0; i < list.length; i++) {
              if (Array.isArray(files[filesKeys[i]])) {
                for (let j of files[filesKeys[i]]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                  if (/\.pdf$/.test(j.originalFilename)) {
                    try {
                      await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true);
                    } catch {}
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  try {
                    await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                  } catch {}
                }
              }
            }

            await requestSystem("https://" + address.backinfo.host + ":3000/aspirantSubmit", { mode: "setting", map: { aspid, name, phone, type: mode } }, { headers: { "Content-Type": "application/json" } });
            await messageSend({ text: name + "님의 " + (mode === "general" ? "1세트 포트폴리오" : "추천서용 사진") + " 파일 전송을 완료하였습니다!", channel: "#301_apply" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantSettingBinary 1)").catch((e) => { console.log(e); });
            console.log(err);
            res.send(JSON.stringify({ message: "error" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantSettingBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantSettingBinary 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantSettingList = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { aspirantConst, staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantSettingList" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const target0Folders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) });
      const targetFolders = target0Folders.map((str) => { return `${aspirantConst}/${str}` });
      let tempArr, tempArr2;
      let settingList;      
      let proposalList;
      let tempSettingList;
      let tempProposalList;

      settingList = [];
      proposalList = [];

      for (let folder of targetFolders) {
        tempArr = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" });

        tempSettingList = [];
        tempProposalList = [];

        if (tempArr.includes("setting")) {
          tempArr2 = (await fileSystem(`readDir`, [ folder + "/setting" ])).filter((str) => { return str !== ".DS_Store" })
          tempSettingList = tempArr2.map((str) => { return `${folder}/setting/${str}`; }).map((path) => {
            const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
            return targetPath;
          }).map((path) => {
            return linkToString("https://" + address.transinfo.host + path);
          });
        }
        if (tempArr.includes("proposal")) {
          tempArr2 = (await fileSystem(`readDir`, [ folder + "/proposal" ])).filter((str) => { return str !== ".DS_Store" })
          tempProposalList = tempArr2.map((str) => { return `${folder}/proposal/${str}`; }).map((path) => {
            const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
            return targetPath;
          }).map((path) => {
            return linkToString("https://" + address.transinfo.host + path);
          });
        }

        settingList = settingList.concat(tempSettingList);
        proposalList = proposalList.concat(tempProposalList);
      }

      res.send(JSON.stringify({
        setting: settingList,
        proposal: proposalList,
      }));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantSettingList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantDocuments = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, todayMaker, messageSend } = this.mother;
  const { aspirantConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantDocuments" ];
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {
            const { name, aspid } = fields;
            const aspirantFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + aspid;
            const uploadMap = {
              upload0: "portfolio",
              account: "account",
              business: "business",
              identity: "identity",
            };
            let list, aspirantFolder;

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
                    try {
                      await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + j.originalFilename, true);
                    } catch {}
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  try {
                    await instance.imageReader.pdfToJpg(aspirantFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                  } catch {}
                }
              }
            }

            await messageSend({ text: name + "님의 문서 전송과 추가 포트폴리오 전송을 완료하였습니다!", channel: "#301_apply" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantDocuments 1)").catch((e) => { console.log(e); });
            console.log(err);
            res.send(JSON.stringify({ message: "error" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantDocuments 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantDocuments 3): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantDocumentsList = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { aspirantConst, staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantDocumentsList" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const target0Folders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) });
      const targetFolders = target0Folders.map((str) => { return `${aspirantConst}/${str}` });
      let tempArr, tempArr2;
      let accountList;      
      let businessList;
      let identityList;
      let tempAccountList;
      let tempBusinessList;
      let tempIdentityList;

      accountList = [];
      businessList = [];
      identityList = [];

      for (let folder of targetFolders) {
        tempArr = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" });

        tempAccountList = [];
        tempBusinessList = [];
        tempIdentityList = [];

        if (tempArr.includes("account")) {
          tempArr2 = (await fileSystem(`readDir`, [ folder + "/account" ])).filter((str) => { return str !== ".DS_Store" })
          tempAccountList = tempArr2.map((str) => { return `${folder}/account/${str}`; }).map((path) => {
            const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
            return targetPath;
          }).map((path) => {
            return linkToString("https://" + address.transinfo.host + path);
          });
        }
        if (tempArr.includes("business")) {
          tempArr2 = (await fileSystem(`readDir`, [ folder + "/business" ])).filter((str) => { return str !== ".DS_Store" })
          tempBusinessList = tempArr2.map((str) => { return `${folder}/business/${str}`; }).map((path) => {
            const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
            return targetPath;
          }).map((path) => {
            return linkToString("https://" + address.transinfo.host + path);
          });
        }
        if (tempArr.includes("identity")) {
          tempArr2 = (await fileSystem(`readDir`, [ folder + "/identity" ])).filter((str) => { return str !== ".DS_Store" })
          tempIdentityList = tempArr2.map((str) => { return `${folder}/identity/${str}`; }).map((path) => {
            const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
            return targetPath;
          }).map((path) => {
            return linkToString("https://" + address.transinfo.host + path);
          });
        }

        accountList = accountList.concat(tempAccountList);
        businessList = businessList.concat(tempBusinessList);
        identityList = identityList.concat(tempIdentityList);
      }

      res.send(JSON.stringify({
        account: accountList,
        business: businessList,
        identity: identityList,
      }));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantDocumentsList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantPortfolio = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString } = this.mother;
  const { aspirantConst, staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantPortfolio" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const uploadMapConst = "portfolio";
      const targetFolders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }).map((str) => { return `${aspirantConst}/${str}/${uploadMapConst}` });
      let targetImages;
      let totalImages;

      totalImages = [];
      for (let folder of targetFolders) {
        try {
          if (await fileSystem(`exist`, [ folder ])) {
            targetImages = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }).map((str) => { return `${folder}/${str}`; }).map((path) => {
              const targetPath = path.replace(new RegExp("^" + staticConst, "g"), "");
              return targetPath;
            }).map((path) => {
              return linkToString("https://" + address.transinfo.host + path);
            });
            totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages)));
          } else {
            totalImages = totalImages.concat([]);
          }
        } catch (e) {
          totalImages = totalImages.concat([]);
        }
      }

      res.send(JSON.stringify({ link: totalImages }));

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantPortfolio): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantPortfolioDownload = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString, uniqueValue } = this.mother;
  const { aspirantConst, staticConst, tempConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantPortfolioDownload" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid, mode } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const uploadMapConst = "portfolio";
      const targetFolders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }).map((str) => { return `${aspirantConst}/${str}/${uploadMapConst}` });
      const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
      let targetImages;
      let totalImages;
      let commands;
      let path;

      if (mode === "create") {

        totalImages = [];
        for (let folder of targetFolders) {
          if (await fileSystem(`exist`, [ folder ])) {
            targetImages = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }).map((str) => { return `${folder}/${str}`; });
            totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages)));
          } else {
            totalImages = totalImages.concat([]);
          }
        }
  
        if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
          await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
        }
        await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
  
        for (let path of totalImages) {
          await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
        }
  
        commands = "";
        commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
        commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
        await shellExec(commands);
  
        path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);

        res.send(JSON.stringify({ link: linkToString("https://" + address.transinfo.host + path) }));

      } else if (mode === "delete") {

        const { file } = equalJson(req.body);
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantPortfolioDownload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantSettingDownload = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString, uniqueValue } = this.mother;
  const { aspirantConst, staticConst, tempConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantSettingDownload" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid, mode } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const uploadMapConst = "setting";
      const targetFolders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }).map((str) => { return `${aspirantConst}/${str}/${uploadMapConst}` });
      const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
      let targetImages;
      let totalImages;
      let commands;
      let path;

      if (mode === "create") {

        totalImages = [];
        for (let folder of targetFolders) {
          if (await fileSystem(`exist`, [ folder ])) {
            targetImages = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }).map((str) => { return `${folder}/${str}`; });
            totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages)));
          } else {
            totalImages = totalImages.concat([]);
          }
        }
  
        if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
          await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
        }
        await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
  
        for (let path of totalImages) {
          await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
        }
  
        commands = "";
        commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
        commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
        await shellExec(commands);
  
        path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);

        res.send(JSON.stringify({ link: linkToString("https://" + address.transinfo.host + path) }));

      } else if (mode === "delete") {

        const { file } = equalJson(req.body);
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantSettingDownload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_aspirantProposalDownload = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, equalJson, linkToString, uniqueValue } = this.mother;
  const { aspirantConst, staticConst, tempConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/aspirantProposalDownload" ];
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
      if (req.body.aspid === undefined) {
        throw new Error("invalid post");
      }
      const { aspid, mode } = equalJson(req.body);
      const folderList = await fileSystem(`readDir`, [ aspirantConst ]);
      const uploadMapConst = "proposal";
      const targetFolders = folderList.filter((str) => { return (new RegExp(aspid, "g").test(str)) }).map((str) => { return `${aspirantConst}/${str}/${uploadMapConst}` });
      const tempFolderName = "aspirant_" + aspid + "_" + uniqueValue("hex");
      let targetImages;
      let totalImages;
      let commands;
      let path;

      if (mode === "create") {

        totalImages = [];
        for (let folder of targetFolders) {
          if (await fileSystem(`exist`, [ folder ])) {
            targetImages = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return str !== ".DS_Store" }).map((str) => { return `${folder}/${str}`; });
            totalImages = totalImages.concat(equalJson(JSON.stringify(targetImages)));
          } else {
            totalImages = totalImages.concat([]);
          }
        }
  
        if (await fileSystem(`exist`, [ `${tempConst}/${tempFolderName}` ])) {
          await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);
        }
        await shellExec(`mkdir`, [ `${tempConst}/${tempFolderName}` ]);
  
        for (let path of totalImages) {
          await shellExec(`cp`, [ path, `${tempConst}/${tempFolderName}/` ]);
        }
  
        commands = "";
        commands += `cd ${shellLink(tempConst)}/${tempFolderName};`;
        commands += `zip ${shellLink(tempConst)}/${tempFolderName}.zip ./*;`;  
        await shellExec(commands);
  
        path = String(`${tempConst}/${tempFolderName}.zip`).replace(new RegExp("^" + staticConst, "g"), "");
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${tempFolderName}` ]);

        res.send(JSON.stringify({ link: linkToString("https://" + address.transinfo.host + path) }));

      } else if (mode === "delete") {

        const { file } = equalJson(req.body);
        await shellExec(`rm`, [ `-rf`, `${tempConst}/${file}` ]);
        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_aspirantProposalDownload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerSettingBinary = function () {
  const instance = this;
  const address = this.address;
  const { fileSystem, shellExec, shellLink, todayMaker, messageSend, requestSystem, uniqueValue } = this.mother;
  const { designerSettingConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/designerSettingBinary" ];
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          let filesKeys = Object.keys(files);
          if (!err && filesKeys.length > 0) {
            const { mode, name, desid, phone, description } = fields;
            const designerFolderName = ("date" + todayMaker("total")) + '_' + name + '_' + desid;
            const uploadMap = {
              upload0: "setting",
              upload1: "proposal",
            };
            let list, designerFolder;

            designerFolder = `${designerSettingConst}/${designerFolderName}`;

            list = [];
            for (let i = 0; i < filesKeys.length; i++) {
              list.push(uploadMap[filesKeys[i]]);
            }

            if (!(await fileSystem(`exist`, [ designerFolder ]))) {
              await shellExec(`mkdir`, [ designerFolder ]);
            }
            for (let i = 0; i < list.length; i++) {
              if (!(await fileSystem(`exist`, [ `${designerFolder}/${list[i]}` ]))) {
                await shellExec(`mkdir`, [ `${designerFolder}/${list[i]}` ]);
              }
              await fileSystem(`write`, [ `${designerFolder}/${list[i]}/description_${String(uniqueValue("hex"))}.txt`, description ]);
            }

            for (let i = 0; i < list.length; i++) {
              if (Array.isArray(files[filesKeys[i]])) {
                for (let j of files[filesKeys[i]]) {
                  await shellExec(`mv ${shellLink(j.filepath)} ${shellLink(designerFolder + '/' + list[i] + '/' + j.originalFilename)};`);
                  if (/\.pdf$/.test(j.originalFilename)) {
                    try {
                      await instance.imageReader.pdfToJpg(designerFolder + '/' + list[i] + '/' + j.originalFilename, true);
                    } catch {}
                  }
                }
              } else {
                await shellExec(`mv ${shellLink(files[filesKeys[i]].filepath)} ${shellLink(designerFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename)};`);
                if (/\.pdf$/.test(files[filesKeys[i]].originalFilename)) {
                  try {
                    await instance.imageReader.pdfToJpg(designerFolder + '/' + list[i] + '/' + files[filesKeys[i]].originalFilename, true);
                  } catch {}
                }
              }
            }


            await messageSend({ text: name + " 실장님의 " + (mode === "general" ? "1세트 포트폴리오" : "추천서용 사진") + " 파일 전송을 완료하였습니다!", channel: "#300_designer" });
            res.send(JSON.stringify({ message: "done" }));

          } else {
            logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerSettingBinary 1)").catch((e) => { console.log(e); });
            console.log(err);
            res.send(JSON.stringify({ message: "error" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerSettingBinary 2): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));
        }
      });

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerSettingBinary 3): " + e.message).catch((e) => { console.log(e); });
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

TransferRouter.prototype.rou_post_representativeFileRemove = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { designerRepresentativeFolderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/representativeFileRemove" ];
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

      let desid, fileName;

      for (let obj of targets) {
        if (typeof obj !== "object" || obj === null) {
          throw new Error("invaild post, must be targets");
        }

        desid = obj.desid;
        fileName = obj.fileName;

        if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid ])) {
          if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName ])) {
            await shellExec(`rm`, [ `-rf`, designerRepresentativeFolderConst + "/" + desid + "/" + fileName ]);
          }
        }

      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileRemove): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_representativeFileUpdate = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { designerRepresentativeFolderConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/representativeFileUpdate" ];
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
      let desid, fileName;
      let hash, mode;

      for (let obj of targets) {
        if (typeof obj !== "object" || obj === null) {
          throw new Error("invaild post, must be targets");
        }

        hash = obj.hash;
        mode = obj.mode;

        desid = obj.desid;
        fileName = obj.fileName;

        if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid ])) {
          if (await fileSystem(`exist`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName ])) {
            [ key, date, order, hashRaw ] = fileName.split("_");
            [ pastHash, exe ] = hashRaw.split(".");
            newFileName = key + "_" + date + "_" + order + "_" + hash + "." + exe;
            if (pastHash !== hash) {
              await shellExec(`mv`, [ designerRepresentativeFolderConst + "/" + desid + "/" + fileName, designerRepresentativeFolderConst + "/" + desid + "/" + newFileName ]);
            }
          }
        }
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_representativeFileUpdate): " + e.message).catch((e) => { console.log(e); });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
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
              if (/\.pdf$/i.test(toArr[num])) {
                instance.imageReader.pdfToJpg(staticConst + "/" + toArr[num]).catch((err) => { console.log(err); });
              }
              num++;
            }

            res.send(JSON.stringify({ "message": "done" }));
          }
        } catch (e) {
          console.log(e);
          logger.error("Transfer lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error : " + e.message }));    
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
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
            const sizeConst = 102;
            let filesKey, fromArr;
            let thisFileName;
            let imageJson;
            let thisLinkPath;
            let thisLink;
            let resultObj;
            let id;

            id = (idConst + uniqueValue("hex"));
            thisFileName = desid + token + gs + token + String(now.valueOf()) + token + String(xPositionConst) + token + String(yPositionConst) + token + String(sizeConst) + token + id + "." + exe;

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
              },
              size: Number(sizeConst),
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
      const splitToken = "__split__";
      const rawList = await fileSystem("readDir", [ designerProfileConst ]);
      let result;
      let mode;

      if (req.body.mode === undefined) {
        mode = "pick";
      } else {
        mode = req.body.mode;
      }

      result = rawList.filter((str) => { return !/^\./.test(str) }).map((rawString) => {
        const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
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
          },
          size: Number(size),
        }
      });

      if (mode === "pick") {
        const { desid } = req.body;
        result = result.filter((obj) => { return obj.desid === desid });
        result.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
        res.send(JSON.stringify(result));
      } else if (mode === "entire" || mode === "list") {

        if (req.body.desidArr !== undefined) {
          const { desidArr } = equalJson(req.body);
          result = result.filter((o) => {
            return desidArr.includes(o.desid);
          });
        }
        res.send(JSON.stringify(result));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerProfileList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerProfileUpdate = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend, linkToString } = this.mother;
  const { designerProfileConst, staticConst } = this;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerProfileUpdate" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined || req.body.id === undefined || req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { desid, id, mode } = req.body;
      const splitToken = "__split__";
      const rawList = await fileSystem("readDir", [ designerProfileConst ]);
      let targetList;
      let target;
      let newName;

      targetList = rawList.filter((str) => { return !/^\./.test(str) }).map((rawString) => {
        const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
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
          },
          size: Number(size),
        }
      });

      targetList = targetList.filter((obj) => { return obj.desid === desid });
      target = targetList.find((obj) => { return obj.id === id });
      if (target === undefined) {
        throw new Error("There is no target");
      }

      if (mode === "position") {
        const { x, y } = equalJson(req.body.position);
        newName = desid + splitToken + target.gs + splitToken + String(target.date.valueOf()) + splitToken + String(x) + splitToken + String(y) + splitToken + String(target.size) + splitToken + target.id + "." + target.file.exe;
        if (newName !== target.file.name) {
          await shellExec("mv", [ designerProfileConst + "/" + target.file.name, designerProfileConst + "/" + newName ]);
        }
      }

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerProfileUpdate): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerWorksPhoto = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, uniqueValue, stringToLink, linkToString } = this.mother;
  const address = this.address;
  const { staticConst, designerWorksConst, designerWorksConstFactors } = this;
  let obj;
  obj = {};
  obj.link = [ "/designerWorksPhoto" ];
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
      const form = instance.formidable({ multiples: true, encoding: "utf-8", maxFileSize: (9000 * 1024 * 1024) });
      form.parse(req, async function (err, fields, files) {
        try {
          if (err) {
            throw new Error(err);
          } else {
            const token = "__split__";
            const now = new Date();
            const { desid, gs, exe, index } = fields;
            const longConst = 1920;
            const idConst = "works" + String(index) + "_";
            const xPositionConst = 50;
            const yPositionConst = 50;
            const sizeConst = 102;
            let filesKey, fromArr;
            let thisFileName;
            let imageJson;
            let thisLinkPath;
            let thisLink;
            let resultObj;
            let id;
            let targetFolder;

            id = (idConst + uniqueValue("hex"));
            thisFileName = desid + token + gs + token + String(now.valueOf()) + token + String(xPositionConst) + token + String(yPositionConst) + token + String(sizeConst) + token + id + "." + exe;
            targetFolder = designerWorksConst + "/" + designerWorksConstFactors[Number(index)];

            filesKey = Object.keys(files);
            if (filesKey.length !== 1) {
              throw new Error("only one image must");
            }

            fromArr = [];
            for (let key of filesKey) {
              fromArr.push(files[key]);
            }

            for (let { filepath: path } of fromArr) {
              await shellExec(`mv ${shellLink(path)} ${shellLink(targetFolder + "/" + thisFileName)}`);
            }
            if (gs === "g") {
              await instance.imageReader.resizeImage(targetFolder + "/" + thisFileName, longConst, null);
            } else {
              await instance.imageReader.resizeImage(targetFolder + "/" + thisFileName, null, longConst);
            }

            thisLinkPath = String(targetFolder + "/" + thisFileName).replace(new RegExp("^" + staticConst, "g"), "");
            thisLink = linkToString("https://" + address.transinfo.host + thisLinkPath);
            resultObj = {
              id,
              desid,
              gs,
              date: now,
              link: thisLink,
              file: {
                exe,
                name: targetFolder + "/" + thisFileName,
              },
              position: {
                x: Number(xPositionConst),
                y: Number(yPositionConst),
              },
              size: Number(sizeConst),
            };

            res.send(JSON.stringify(resultObj));
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerWorksPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerWorksList = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, messageSend, linkToString } = this.mother;
  const { staticConst, designerWorksConst, designerWorksConstFactors } = this;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerWorksList" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const splitToken = "__split__";
      const rawList0 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[0] ]);
      const rawList1 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[1] ]);
      const rawList2 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[2] ]);
      const rawList3 = await fileSystem("readDir", [ designerWorksConst + "/" + designerWorksConstFactors[3] ]);
      let result0, result1, result2, result3;
      let filterFunction;
      let mapFunction;
      let mode;

      if (req.body.mode === undefined) {
        mode = "pick";
      } else {
        mode = req.body.mode;
      }

      filterFunction = (str) => { return !/^\./.test(str) };
      mapFunction = (index) => {
        return (rawString) => {
          const [ desid, gs, timeNumber, xPosition, yPosition, size, uniqueExe ] = rawString.split(splitToken);
          const [ id, exe ] = uniqueExe.split(".");
          return {
            id,
            desid,
            gs,
            date: new Date(Number(timeNumber)),
            link: linkToString("https://" + address.transinfo.host + String(designerWorksConst + "/" + designerWorksConstFactors[index] + "/" + rawString).replace(new RegExp("^" + staticConst, "g"), "")),
            file: {
              exe,
              name: rawString,
            },
            position: {
              x: Number(xPosition),
              y: Number(yPosition),
            },
            size: Number(size),
          }
        };
      }

      result0 = rawList0.filter(filterFunction).map(mapFunction(0));
      result1 = rawList1.filter(filterFunction).map(mapFunction(1));
      result2 = rawList2.filter(filterFunction).map(mapFunction(2));
      result3 = rawList3.filter(filterFunction).map(mapFunction(3));


      if (mode === "pick") {

        const { desid } = req.body;

        result0 = result0.filter((obj) => { return obj.desid === desid });
        result0.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
  
        result1 = result1.filter((obj) => { return obj.desid === desid });
        result1.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
  
        result2 = result2.filter((obj) => { return obj.desid === desid });
        result2.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
  
        result3 = result3.filter((obj) => { return obj.desid === desid });
        result3.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });
  
        res.send(JSON.stringify([ result0, result1, result2, result3 ]));

      } else if (mode === "entire" || mode === "list") {

        res.send(JSON.stringify([ result0, result1, result2, result3, [ staticConst, designerWorksConst, designerWorksConstFactors ] ]));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerWorksList): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerRepresentativePhotos = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, objectDeepCopy, messageSend, linkToString, stringToLink } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerRepresentativePhotos" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const selfMongo = instance.mongolocal;
      const collection = "designerRepresentativePhotos";
      const positionLength = 5;
      let rows;
      let jsonModel;
      let targetData;

      if (mode === "save") {
        const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);
        const position = Number(positionRaw);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {

          jsonModel = {
            date: new Date(),
            desid,
            position: (new Array(positionLength)).fill(0, 0),
          }
          if (jsonModel.position[position] === undefined) {
            throw new Error("invalid position");
          }
          jsonModel.position[position] = pathRaw;
          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

        } else {

          [ jsonModel ] = rows;
          if (!Array.isArray(jsonModel.position)) {
            await back.mongoDelete(collection, { desid }, { selfMongo });
            jsonModel = {
              date: new Date(),
              desid,
              position: (new Array(positionLength)).fill(0, 0),
            }
            if (jsonModel.position[position] === undefined) {
              throw new Error("invalid position");
            }
            jsonModel.position[position] = pathRaw;
            await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          } else {
            if (jsonModel.position[position] === undefined) {
              throw new Error("invalid position");
            }
            jsonModel.position[position] = pathRaw;
            await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "position": objectDeepCopy(jsonModel.position) } ], { selfMongo });
          }
        }

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "proposal") {

        const { desidArr } = equalJson(req.body);
        whereQuery = {};
        whereQuery["$or"] = [];
        for (let thisDesid of desidArr) {
          whereQuery["$or"].push({ desid: thisDesid });
        }
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        res.send(JSON.stringify({ data: rows }));

      } else if (mode === "get") {

        const { desid } = equalJson(req.body);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {
          jsonModel = {
            date: new Date(),
            desid,
            position: (new Array(positionLength)).fill(0, 0),
          }
          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          res.send(JSON.stringify({ data: jsonModel }));
        } else {
          [ targetData ] = rows;
          res.send(JSON.stringify({ data: targetData }));
        }

      } else {
        throw new Error("invalid post");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerRepresentativePhotos): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerRepresentativeFrontPhotos = function () {
  const instance = this;
  const { fileSystem, requestSystem, shellExec, shellLink, equalJson, objectDeepCopy, messageSend, linkToString, stringToLink } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerRepresentativeFrontPhotos" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const selfMongo = instance.mongo;
      const collection = "designer";
      let rows;
      let jsonModel;
      let targetData;
      let thisArr;
      let fileName;
      let pid;
      let index;
      let whereQuery, updateQuery;

      if (mode === "save") {
        const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);

        thisArr = stringToLink(pathRaw).split("/");
        fileName = thisArr[thisArr.length - 1].split(".")[0];
        pid = /[ap][0-9]+/.exec(fileName)[0]
        index = fileName.replace(new RegExp(pid + "$"), "");

        whereQuery = { desid };
        updateQuery = {};
        updateQuery["setting.front.photo.porlid"] = pid;
        updateQuery["setting.front.photo.index"] = index;

        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid post");
      }

    } catch (e) {
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerRepresentativeFrontPhotos): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerRepresentativePaper = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, requestSystem, objectDeepCopy, messageSend, linkToString, stringToLink } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerRepresentativePaper" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const selfMongo = instance.mongolocal;
      const collection = "designerRepresentativePaper";
      const positionLength = 12;
      const rootPath = "__samba__/designProposal/image";
      const indexToken = "____index____";
      let rows;
      let jsonModel;
      let targetData;
      let thisDesignerRootFolder;
      let thisPosition;
      let tempName;
      let thisName;
      let findTarget;
      let newPath;

      if (mode === "save") {
        const { desid, position: positionRaw, path: pathRaw } = equalJson(req.body);
        const position = Number(positionRaw);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {

          jsonModel = {
            date: new Date(),
            desid,
            position: (new Array(positionLength)).fill(0, 0),
          }
          if (jsonModel.position[position] === undefined) {
            throw new Error("invalid position");
          }
          jsonModel.position[position] = pathRaw;
          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

        } else {

          [ jsonModel ] = rows;
          if (!Array.isArray(jsonModel.position)) {
            await back.mongoDelete(collection, { desid }, { selfMongo });
            jsonModel = {
              date: new Date(),
              desid,
              position: (new Array(positionLength)).fill(0, 0),
            }
            if (jsonModel.position[position] === undefined) {
              throw new Error("invalid position");
            }
            jsonModel.position[position] = pathRaw;
            await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          } else {
            if (jsonModel.position[position] === undefined) {
              throw new Error("invalid position");
            }
            jsonModel.position[position] = pathRaw;
            await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "position": objectDeepCopy(jsonModel.position) } ], { selfMongo });
          }
        }

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "get") {

        const { desid } = equalJson(req.body);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {
          jsonModel = {
            date: new Date(),
            desid,
            position: (new Array(positionLength)).fill(0, 0),
          }
          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          res.send(JSON.stringify({ data: jsonModel }));
        } else {
          [ targetData ] = rows;

          thisDesignerRootFolder = await requestSystem("https://" + address.officeinfo.ghost.host + "/readFolder", {
            path: rootPath + "/" + desid
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          thisDesignerRootFolder = thisDesignerRootFolder.data.map((str) => {
            return {
              original: str,
              name: str.split(indexToken)[1],
            }
          });

          thisPosition = [];
          for (let rawName of targetData.position) {
            if (typeof rawName === "string") {
              tempName = stringToLink(rawName).split("/");
              if (tempName.length > 4 && (new RegExp(indexToken, "gi")).test(tempName[4])) {
                thisName = tempName[4].split(indexToken)[1];
                findTarget = thisDesignerRootFolder.find((o) => { return o.name === thisName });
                if (findTarget === undefined) {
                  thisPosition.push(rawName);
                } else {
                  newPath = rootPath + "/" + desid + "/" + findTarget.original;
                  newPath = newPath.replace(/^__samba__/gi, '');
                  thisPosition.push(linkToString(newPath));
                }
              } else {
                thisPosition.push(rawName);
              }
            } else {
              thisPosition.push(rawName);
            }
          }
          targetData.position = objectDeepCopy(thisPosition);

          res.send(JSON.stringify({ data: targetData }));
        }

      } else {
        throw new Error("invalid post");
      }

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerRepresentativePaper): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerRepresentativeKeywords = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson, requestSystem, objectDeepCopy, messageSend, linkToString, stringToLink } = this.mother;
  const back = this.back;
  const address = this.address;
  let obj;
  obj = {};
  obj.link = [ "/designerRepresentativeKeywords" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const collection = "designerRepresentativeKeywords";
      let rows;
      let jsonModel;
      let targetData;
      let thisDesigner, introduction;
      let tempResponse;
      let keywords;
      let selected;
      let newSelected;
      let whereQuery;

      if (mode === "select") {

        const { desid, words, subMode } = equalJson(req.body);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {
          thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
          introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
          introduction = introduction.trim();
          if (/NULL/g.test(introduction)) {
            introduction = "";
            jsonModel = {
              date: new Date(),
              desid,
              introduction,
              keywords: [],
              selected: [],
            }
          } else {
            tempResponse = await requestSystem("https://" + address.aliveinfo.host + "/extractKeywords", { sentence: introduction }, { headers: { "Content-Type": "application/json" } });
            keywords = objectDeepCopy(tempResponse.data.keywords).map((str) => { return str.trim(); }).map((str) => {
              return str.replace(/홈 스타일링/gi, "홈스타일링");
            }).filter((str) => {
              return str !== "홈스타일링" && str !== "인테리어" && str !== "스타일링" && str !== "인테리어 디자인" && str !== "디자인" && str !== "시공" && str !== "인테리어 디자이너" && str !== "디자이너" && str !== "안녕하세요" && str !== "경험" && str !== "디자인" && str !== "스타일" && str !== "디자인 스타일" && str !== "인테리어 설계";
            }).filter((str) => {
              return str.length < 15 && str.length > 2;
            })
            jsonModel = {
              date: new Date(),
              desid,
              introduction,
              keywords,
              selected: [],
            }
          }
          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        }
        [ targetData ] = rows;

        if (subMode === "add") {
          if (targetData.keywords.includes(words)) {
            selected = objectDeepCopy(targetData.selected);
            selected.push(words);
            selected = [ ...new Set(selected) ];
            await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": selected } ], { selfMongo })
          }
        } else {
          if (targetData.selected.includes(words)) {
            newSelected = [];
            for (let w of targetData.selected) {
              if (w !== words) {
                newSelected.push(w);
              }
            }
            newSelected = [ ...new Set(newSelected) ];
            await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": newSelected } ], { selfMongo })
          }
        }

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "proposal") {

        const { desidArr } = equalJson(req.body);
        whereQuery = {};
        whereQuery["$or"] = [];
        for (let thisDesid of desidArr) {
          whereQuery["$or"].push({ desid: thisDesid });
        }
        rows = await back.mongoRead(collection, whereQuery, { selfMongo });
        res.send(JSON.stringify({ data: rows }));

      } else if (mode === "convert") {

        const { desid, selected } = equalJson(req.body);
        await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "selected": selected } ], { selfMongo })
        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "get") {

        const { desid } = equalJson(req.body);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {

          thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
          introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
          introduction = introduction.trim();
          jsonModel = {
            date: new Date(),
            desid,
            introduction,
            keywords: [
              "꼼꼼한 스타일",
              "편안한 상담",
              "퀄리티 있는",
              "안정감 있는",
              "원활한 소통",
              "커뮤니케이션",
              "완벽한 마무리",
            ],
            selected: [],
          }

          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });

          res.send(JSON.stringify({ data: jsonModel }));
        } else {
          [ targetData ] = rows;

          if (targetData.keywords.length > 0) {
            res.send(JSON.stringify({ data: targetData }));
          } else {

            thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
            introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
            introduction = introduction.trim();

            if (/NULL/g.test(introduction)) {
              res.send(JSON.stringify({ data: targetData }));
            } else {
              keywords = [
                "꼼꼼한 스타일",
                "편안한 상담",
                "퀄리티 있는",
                "안정감 있는",
                "원활한 소통",
                "커뮤니케이션",
                "완벽한 마무리",
              ]

              await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "introduction": introduction, "keywords": objectDeepCopy(keywords), "selected": [] } ], { selfMongo })
              rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
              [ targetData ] = rows;
              res.send(JSON.stringify({ data: targetData }));
            }
  
          }
        }

      } else if (mode === "update") {

        const { desid, keywords } = equalJson(req.body);

        rows = await back.mongoRead(collection, { desid: desid }, { selfMongo });
        if (rows.length === 0) {

          thisDesigner = await back.getDesignerById(desid, { selfMongo: selfCoreMongo, toNormal: true });
          introduction = thisDesigner.setting.front.introduction.desktop.join(" ").trim() + "\n\n" + thisDesigner.setting.description.join("\n");
          introduction = introduction.trim();
          jsonModel = {
            date: new Date(),
            desid,
            introduction,
            keywords,
            selected: [],
          }

          await back.mongoCreate(collection, objectDeepCopy(jsonModel), { selfMongo });
          res.send(JSON.stringify({ message: "done" }));
        } else {
          await back.mongoUpdate(collection, [ { desid }, { "date": new Date(), "keywords": objectDeepCopy(keywords), "selected": [] } ], { selfMongo })
          res.send(JSON.stringify({ message: "done" }));
        }

      } else {
        throw new Error("invalid post");
      }

    } catch (e) {
      console.log(e);
      logger.error("Transfer lounge 서버 문제 생김 (rou_post_designerRepresentativeKeywords): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_messageLog = function () {
  const instance = this;
  const { slack_info } = this;
  const { requestSystem, ajaxJson, equalJson, sleep, setQueue } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/messageLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined || req.body.channel === undefined || req.body.collection === undefined) {
        throw new Error("invaild post, must be text, channel");
      }
      const { text, channel, collection } = req.body;
      let thisChannel;
      let slackText;
      let keyArr, valueArr;
      let targetArr;
      let tempName;
      let foundNames;
      let finalTargets;
      let fairyMode;

      fairyMode = false;

      slackText = text;
      if (Array.isArray(equalJson(req.body).target)) {

        targetArr = equalJson(req.body).target;

        keyArr = Object.keys(slack_info.userDictionary);
        valueArr = [];
        for (let i = 0; i < keyArr.length; i++) {
          valueArr.push(slack_info.userDictionary[keyArr[i]]);
        }

        foundNames = [];
        for (let name of targetArr) {
          tempName = valueArr.findIndex((n) => { return n === name });
          if (tempName !== -1) {
            foundNames.push(tempName);
          }
        }
        foundNames = foundNames.map((index) => { return keyArr[index] }).map((id) => {
          return `<@${id}>`;
        });

        finalTargets = '';
        if (foundNames.length > 0) {
          finalTargets = foundNames.join(" ");
        }

        slackText = finalTargets + " " + text;

      }

      if (!/alive/gi.test(channel)) {
        setQueue(() => {
          instance.slack_bot.chat.postMessage({ text: slackText, channel: (channel === "silent" ? "#error_log" : channel) }).catch((err) => { console.log(err); });
        }, 0);
      }

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_messageLog): " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_kakaoAccessToken = function () {
  const instance = this;
  const kakao = this.kakao;
  const { requestSystem, ajaxJson, equalJson, sleep, setQueue, fileSystem } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/kakaoAccessToken" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const accessToken = await fileSystem("readString", [ kakao.accessTokenPath ]);
      res.send(JSON.stringify({ accessToken }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_kakaoAccessToken): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_emergencyAlarm = function () {
  const instance = this;
  const { requestSystem, ajaxJson, sleep } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/emergencyAlarm" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.text === undefined) {
        throw new Error("invaild post, must be text");
      }
      const { text } = req.body;
      const channel = "#emergency_alarm";

      await instance.slack_bot.chat.postMessage({ text, channel });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_emergencyAlarm): " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_parsingCall = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, messageLog, sleep } = this.mother;
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  let obj = {};
  obj.link = [ "/parsingCall" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    const outerUrl = "http://www.moyaweb.com/search_result.do";
    try {
      if (req.body.phoneNumber === undefined) {
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const selfMongo = instance.mongo;
        const { phoneNumber, kind } = req.body;
        const method = (kind === '1' ? "전화" : "문자");
        let client;
        let rows, temp, name, sub, text;
        let manager;
        let desid, proid;
        let projects;
        let boo;
        let outerResponse;
        let entireDom, resultDom, findName;
        let builders;
        let cliid;
        let thisProjects, thisProject, thisHistory;
        let cliidBoo;
        let targetLink;

        if (!/^2/.test(phoneNumber)) {
          cliidBoo = false;
          targetLink = null;
          rows = await back.getClientsByQuery({ phone: phoneNumber }, { selfMongo });
          if (rows.length === 0) {
            rows = await back.getDesignersByQuery({ "information.phone": phoneNumber }, { selfMongo });
            if (rows.length === 0) {
              temp = await back.setMemberObj({ selfMongo, getMode: true });
              rows = [];
              for (let obj of temp) {
                if (obj.phone === phoneNumber) {
                  rows.push(obj);
                }
              }
              if (rows.length === 0) {
                name = "알 수 없는";
                sub = "사람";
              } else {
                name = rows[0].name;
                sub = "팀원";
              }
            } else {
              name = rows[0].designer;
              sub = "실장님";
            }

            text = `${name} ${sub}에게서 ${method}가 왔습니다!`;
          } else {
            client = rows[0];
            name = client.name;
            cliid = client.cliid;
            sub = "고객님";

            if (/^대표님/gi.test(name)) {
              text = `대표님께 ${method}가 왔습니다!`;
            } else if (/^김실장/gi.test(name)) {
              text = `김지은 실장님에게서 ${method}가 왔습니다!`;
            } else if (/^김남편/gi.test(name)) {
              text = `김애란 실장님에게서 ${method}가 왔습니다!`;
            } else {
              thisProjects = await back.getProjectsByQuery({ cliid }, { selfMongo });
              thisProject = null;
              if (thisProjects.length > 0) {
                [ thisProject ] = thisProjects;
              }
              if (thisProject === null) {
                manager = (await requestSystem("https://" + address.backinfo.host + ":3000/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                cliidBoo = true;
                targetLink = "https://" + address.backinfo.host + "/client?cliid=" + cliid;
              } else {
                if (thisProject.desid.trim() === "") {
                  manager = (await requestSystem("https://" + address.backinfo.host + ":3000/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                  text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                  cliidBoo = true;
                  targetLink = "https://" + address.backinfo.host + "/client?cliid=" + cliid;
                } else {
                  if (thisProject.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()) {
                    text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다.`;
                    cliidBoo = true;
                    targetLink = "https://" + address.backinfo.host + "/project?cliid=" + cliid;
                  } else {
                    manager = (await requestSystem("https://" + address.backinfo.host + ":3000/getHistoryProperty", { method: "client", property: "manager", idArr: [ cliid ] }, { headers: { "Content-Type": "application/json" } })).data[cliid];
                    text = `${name}(${cliid} - ${client.requests[0].analytics.response.status.value}) ${sub}에게서 ${method}가 왔습니다. ${manager}님 받아주세요!`;
                    cliidBoo = true;
                    targetLink = "https://" + address.backinfo.host + "/client?cliid=" + cliid;
                  }
                }
              }
            }
          }

          if (name.trim() === "알 수 없는") {
            builders = await back.getBuildersByQuery({ "information.phone": phoneNumber }, { selfMongo });
            if (builders.length > 0) {
              text = `${builders[0].builder} 시공 소장님께 ${method}가 왔습니다!`;
            } else {
              console.log(new Date(), phoneNumber, "알 수 없는 사람");
              text = `알 수 없는 사람(전화번호 비공개)으로부터 ${method}가 왔습니다!`
            }
            if (/^알 수 없는/gi.test(text)) {
              rows = await back.getAspirantsByQuery({ phone: phoneNumber }, { selfMongo });
              if (rows.length === 0) {
                outerResponse = await requestSystem(outerUrl, { SCH_TEL_NO: String(phoneNumber).replace(/[^0-9]/gi, '') }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
                entireDom = new JSDOM(outerResponse.data);
                resultDom = entireDom.window.document.getElementById("result_phone_text");
                if (resultDom !== null) {
                  findName = resultDom.textContent.trim();
                  text = `${findName}에서 ${method}가 왔습니다!`;
                }
              } else {
                text = `${rows[0].designer} 디자이너 신청자로부터 ${method}가 왔습니다!`;
              }
            }
          }

          await messageSend({ text, channel: "#call", voice: false, fairy: true });
        }
        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_parsingCall): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_receiveCall = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/receiveCall" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const thisData = equalJson(req.body).data;
      if (thisData.sender === undefined || thisData.kind === undefined) {
        console.log(req.body);
        res.send(JSON.stringify({ error: "error" }));
      } else {
        const { sender, kind } = thisData
        const timeoutConst = "receiveCall";
        let phoneNumber, senderArr;
        let part0, part1, part2;

        senderArr = sender.split('');
        phoneNumber = '';
        part0 = '';
        part1 = '';
        part2 = '';
        if (/^01/gi.test(sender)) {
          for (let i = 0; i < 3; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        } else if (/^02/gi.test(sender)) {
          for (let i = 0; i < 2; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        } else {
          for (let i = 0; i < 3; i++) {
            part0 += senderArr.shift();
          }
          for (let i = 0; i < 4; i++) {
            part2 = senderArr.pop() + part2;
          }
          part1 = senderArr.join('');
          phoneNumber = part0 + '-' + part1 + '-' + part2;
        }

        if (instance.timeouts[timeoutConst] !== undefined || instance.timeouts[timeoutConst] !== null) {
          clearTimeout(instance.timeouts[timeoutConst]);
        }
        instance.timeouts[timeoutConst] = setTimeout(async () => {
          try {
            await fileSystem(`writeJson`, [ `${process.cwd()}/temp/${timeoutConst}.json`, { phoneNumber, kind } ]);
            setQueue(async () => {
              try {
                await sleep(Math.round(1000 * Math.random()));
                if (await fileSystem(`exist`, [ `${process.cwd()}/temp/${timeoutConst}.json` ])) {
                  const { phoneNumber, kind } = await fileSystem(`readJson`, [ `${process.cwd()}/temp/${timeoutConst}.json` ]);
                  await shellExec(`rm`, [ `-rf`, `${process.cwd()}/temp/${timeoutConst}.json` ]);
                  await requestSystem("https://" + instance.address.transinfo.host + ":3000/parsingCall", { phoneNumber, kind }, { headers: { "Content-Type": "application/json" } });
                }
              } catch (e) {
                throw new Error(e.message);
              }
            }, 300);
            clearTimeout(instance.timeouts[timeoutConst]);
            instance.timeouts[timeoutConst] = null;
          } catch (e) {
            console.log(e);
          }
        }, 600);

        res.send(JSON.stringify({ message: "success" }));
      }
    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_receiveCall): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_clickDial = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog } = this.mother;
  const querystring = require("querystring");
  let obj = {};
  obj.link = [ "/clickDial" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.id === undefined || req.body.destnumber === undefined) {
        throw new Error("invaild post");
      }
      const url = "https://centrex.uplus.co.kr/RestApi/clickdial";
      let query;

      query = { id: req.body.id, pass: address.officeinfo.phone.password, destnumber: req.body.destnumber.replace(/[^0-9]/g, '') };

      requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } }).catch((err) => {
        logger.alert("Ghost error (rou_post_clickDial) : " + "전화 거는 도중 문제 생김 => " + err.message).catch((er) => { console.log(er); });
      });

      res.send(JSON.stringify({ message: "hello?" }));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_clickDial): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders", "/getAspirants" ];
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
      if (req.body.whereQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery } = equalJson(req.body);
      let rows;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }

      if (req.url === "/getClients" || req.url === "/getProjects") {
        if (Object.keys(whereQuery).length === 0) {
          if (req.body.allMode === undefined) {
            throw new Error("query ban");
          }
        }
      }

      if (req.url === "/getClients") {
        rows = await back.getClientsByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getDesigners") {
        rows = await back.getDesignersByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getProjects") {
        rows = await back.getProjectsByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getContents") {
        rows = await back.getContentsArrByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getBuilders") {
        rows = await back.getBuildersByQuery(whereQuery, { selfMongo });
      } else if (req.url === "/getAspirants") {
        rows = await back.getAspirantsByQuery(whereQuery, { selfMongo });
      }

      res.send(JSON.stringify(rows.toNormal()));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_getDocuments): " + req.url + " " + req.headers["origin"] + " " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_pickProjects = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/pickProjects" ];
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
      if (req.body.whereQuery === undefined || req.body.projectQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery, projectQuery } = equalJson(req.body);
      let rows;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (typeof projectQuery !== "object" || projectQuery === null) {
        throw new Error("invaild query object");
      }

      rows = await back.mongoPick("project", [ whereQuery, projectQuery ], { selfMongo });

      if (projectQuery.proposal === 1) {
        if (req.body.detail !== "true" && req.body.detail !== true) {
          for (let project of rows) {
            for (let obj of project.proposal.detail) {
              delete obj.pictureSettings;
              delete obj.description;
            }
          }
        }
        res.send(JSON.stringify(rows));
      } else {
        res.send(JSON.stringify(rows));
      }

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_pickProjects): " + req.url + " " + req.headers["origin"] + " " + JSON.stringify(req.body) + " " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageLog, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents", "/updateAspirant" ];
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
      if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
        throw new Error("invaild post");
      }

      const selfMongo = instance.mongo;
      const { whereQuery, updateQuery } = equalJson(req.body);
      let data;

      if (typeof whereQuery !== "object" || whereQuery === null) {
        throw new Error("invaild query object");
      }
      if (Object.keys(whereQuery).length === 0) {
        throw new Error("query ban");
      }
      if (typeof updateQuery !== "object" || updateQuery === null) {
        throw new Error("invaild query object");
      }

      if (req.url === "/updateClient") {
        data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateDesigner") {
        data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateProject") {
        data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateContents") {
        data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo });
      } else if (req.url === "/updateAspirant") {
        data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
      }

      res.send(JSON.stringify({ message: data }));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_updateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerProjects = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog } = this.mother;
  const querystring = require("querystring");
  let obj = {};
  obj.link = [ "/designerProjects" ]
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
      if (req.body.desid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongo;
      const { desid } = req.body;
      const designer = await back.getDesignerById(desid, { selfMongo });
      const totalProject = await back.getProjectsByQuery({
        $or: [
          {
            "proposal.detail": {
              $elemMatch: { desid }
            }
          },
          {
            desid: desid
          }
        ]
      }, { selfMongo });
      let contractProjects, proposalProjects;
      let totalClient;
      let cliidArr;

      contractProjects = totalProject.toNormal().filter((obj) => {
        return obj.desid === desid;
      });
      proposalProjects = totalProject.toNormal().filter((obj) => {
        return obj.proposal.detail.some((o) => { return o.desid === desid });
      });

      cliidArr = contractProjects.map((obj) => { return obj.cliid }).concat(proposalProjects.map((obj) => { return obj.cliid }));
      cliidArr = [ ...new Set(cliidArr) ];
      cliidArr = cliidArr.map((cliid) => { return { cliid } });
      if (cliidArr.length === 0) {
        totalClient = [];
      } else {
        totalClient = (await back.getClientsByQuery({ $or: cliidArr }, { selfMongo })).toNormal();
      }

      res.send(JSON.stringify({ totalClient, contractProjects, proposalProjects, designer: designer.toNormal() }));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerProjects): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_getChecklist = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/getChecklist" ];
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
      const selfMongo = instance.mongo;
      const collection = "service";
      const services = await back.mongoRead(collection, { kind: "checklist" }, { selfMongo });
      let contents;

      services.sort((a, b) => { return Number(a.serid.replace(/[^0-9]/gi, '')) - Number(b.serid.replace(/[^0-9]/gi, '')) });

      contents = services.map((obj) => {
        return {
          title: obj.setting.contents.title,
          key: obj.key,
          target: obj.setting.target.action,
          checklist: obj.setting.contents.checklist,
          children: obj.setting.children,
        }
      });

      res.send(JSON.stringify(contents));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_getChecklist): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerMemo = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerMemo" ];
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
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined || req.body.key === undefined || req.body.memo === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerMemo";
      const { mode, desid, proid, key, memo } = req.body;
      let resultObj;
      let rows;
      let json;
      let id;

      id = proid + "_" + key;
      json = {
        proid,
        desid,
        key: id,
        contents: {
          memo,
          type: key,
        }
      };

      if (mode === "get") {

        rows = await back.mongoRead(collection, { key: id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
          resultObj = json;
        } else {
          resultObj = rows[0];
        }

      } else if (mode === "update") {

        rows = await back.mongoRead(collection, { key: id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ { key: id }, { "contents.memo": memo } ], { selfMongo });
        }

        resultObj = { message: "success" };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerMemo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerRaw = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, messageSend, fileSystem, setQueue, sleep, shellExec, shellLink, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerRaw" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.cliid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "designerRawContents";
      const { mode, desid, proid, cliid } = req.body;
      let resultObj;
      let rows;
      let json;
      let body, type;

      if (typeof req.body.body === "string") {
        body = req.body.body;
      } else {
        body = "";
      }
      if (typeof req.body.type === "string") {
        type = req.body.type;
      } else {
        type = "docx";
      }

      json = {
        proid,
        desid,
        cliid,
        date: new Date(),
        contents: {
          body,
          type,
        }
      };

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
          resultObj = json;
        } else {
          resultObj = rows[0];
        }

      } else if (mode === "update") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, json, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [ { proid }, { "contents.body": body, "contents.type": type, "date": new Date() } ], { selfMongo });
        }

        resultObj = { message: "success" };

      } else if (mode === "delete") {

        await back.mongoDelete(collection, { desid, proid }, { selfMongo });
        resultObj = { message: "success" };

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerRaw): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_getProcessData = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getProcessData" ];
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
      if (req.body.proidArr === undefined) {
        throw new Error("invalid post 1");
      }
      const selfMongo = instance.mongolocal;
      const collection = "designerRawContents";
      const logCollection = "projectDesignerSend";
      const { proidArr } = equalJson(req.body);
      let rows;
      let tong;
      let rows2;
      let tong2;

      if (!Array.isArray(proidArr)) {
        throw new Error("invalid post 2");
      }
      if (proidArr.length === 0) {
        throw new Error("invalid post 3");
      }

      rows = await back.mongoRead(collection, { $or: proidArr.map((proid) => { return { proid } }) }, { selfMongo });
      tong = [];
      for (let row of rows) {
        tong.push({
          proid: row.proid,
          desid: row.desid,
          cliid: row.cliid,
          date: row.date
        })
      }

      rows2 = await back.mongoRead(logCollection, { $or: proidArr.map((proid) => { return { proid } }) }, { selfMongo });
      tong2 = [];
      for (let row of rows2) {
        tong2.push({
          proid: row.proid,
          desid: row.designer.desid,
          cliid: row.client.cliid,
          date: row.date,
          type: row.type,
        })
      }

      res.send(JSON.stringify({
        rawContents: tong,
        sendStatus: tong2.filter((obj) => { return obj.type === "status" }),
        sendSchedule: tong2.filter((obj) => { return obj.type === "schedule" }),
        sendFile: tong2.filter((obj) => { return obj.type === "file" })
      }));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_getProcessData): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerSchedule = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, serviceParsing } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerSchedule" ];
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
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerSchedule";
      const { mode, desid, proid } = req.body;
      let resultObj;
      let rows;
      let schedule;
      let createQuery;
      let whereQuery, updateQuery;
      let thisRow;
      let project;
      let originalContents;
      let startDate;
      let after7;
      let after14;
      let after21;
      let after28;
      let after35;
      let after42;
      let after49;
      let after56;
      let after63;
      let after70;
      let emptyDate;
      let boo;

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        resultObj = rows;

      } else if (mode === "create") {

        schedule = equalJson(req.body.schedule);
        createQuery = { proid, desid, schedule };
        await back.mongoCreate(collection, createQuery, { selfMongo });

        resultObj = createQuery;

      } else if (mode === "update") {

        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);

        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });

        thisRow = await back.mongoRead(collection, whereQuery, { selfMongo });

        if (thisRow.length === 0) {
          resultObj = { message: "error" };
        } else {
          resultObj = thisRow[0];
        }

      } else if (mode === "delete") {

        whereQuery = { proid };
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        resultObj = { message: "success" };

      } else if (mode === "original") {

        project = await back.getProjectById(proid, { selfMongo: instance.mongo });

        emptyDate = new Date(1800, 0, 1);

        startDate = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after7 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after7.setDate(after7.getDate() + 7);
        after14 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after14.setDate(after14.getDate() + 14);
        after21 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after21.setDate(after21.getDate() + 21);
        after28 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after28.setDate(after28.getDate() + 28);
        after35 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after35.setDate(after35.getDate() + 35);
        after42 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after42.setDate(after42.getDate() + 42);
        after49 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after49.setDate(after49.getDate() + 49);
        after56 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after56.setDate(after56.getDate() + 56);
        after63 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after63.setDate(after63.getDate() + 63);
        after70 = new Date(JSON.stringify(project.process.contract.form.date.from).slice(1, -1));
        after70.setDate(after70.getDate() + 70);

        if (/홈퍼니싱/gi.test(serviceParsing(project.service))) {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
            ]
          };
        } else if (/홈스타일링/gi.test(serviceParsing(project.service))) {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 의뢰서",
                description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 견적서",
                description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 진행",
                description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
            ]
          };
        } else {
          originalContents = {
            schedule: [
              {
                title: "현장 미팅",
                description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.",
                date: {
                  start: project.process.contract.meeting.date,
                  end: project.process.contract.meeting.date,
                },
              },
              {
                title: "계약 시작일",
                description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.",
                date: {
                  start: startDate,
                  end: startDate,
                },
              },
              {
                title: "컨셉 제안서",
                description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "1차 디자인 제안서",
                description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제안서 수정 작업",
                description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 리스트",
                description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 의뢰서",
                description: "구체적으로 어떤 시공을 어떻게 진행할 지에 대한 의뢰서입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 견적서",
                description: "시공 의뢰서를 바탕으로 정해진 시공 내역에 대한 견적서 입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "시공 진행",
                description: "시공 의뢰서에 나온 시공 내역대로 실제 시공을 진행하는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 구매 및 배송",
                description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
              {
                title: "제품 설치 및 세팅",
                description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.",
                date: {
                  start: emptyDate,
                  end: emptyDate,
                },
              },
            ]
          };
        }

        resultObj = originalContents;

      } else if (mode === "boo") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        resultObj = { result: 0 };
        if (rows.length > 0) {
          boo = rows[0].schedule.some((obj) => {
            return obj.date.start.valueOf() > (new Date(2000, 0, 1)).valueOf() && obj.date.end.valueOf() > (new Date(2000, 0, 1)).valueOf();
          });
          if (boo) {
            resultObj = { result: 1 };
          } else {
            resultObj = { result: 0 };
          }
        } else {
          resultObj = { result: 0 };
        }

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerSchedule): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerTravel = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerTravel" ];
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
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerTravel";
      const { mode, desid, proid } = req.body;
      let resultObj;
      let defaultObj;
      let json;
      let whereQuery, updateQuery;

      defaultObj = {
        proid,
        desid,
        travel: []
      };

      if (mode === "get") {
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          json = equalJson(JSON.stringify(defaultObj));
          await back.mongoCreate(collection, json, { selfMongo });
          resultObj = json;
        } else {
          resultObj = rows[0];
        }
      } else if (mode === "update") {
        whereQuery = { proid };
        ({ updateQuery } = equalJson(req.body));
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        resultObj = { message: "done" };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerTravel): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_readLogDesignerStatus = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, serviceParsing, messageSend, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/readLogDesignerStatus" ];
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
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = equalJson(req.body);
      const delta = 1;
      const projectQuery = { date: 1, data: 1 };
      let rows, ago;
      let thisDate;
      let whereQuery;
      let desid;

      if (mode === "pick" || mode === "get") {

        ({ desid } = equalJson(req.body));
        whereQuery = { action: "updateDesignStatus", "data.desid": desid };

        ago = new Date();
        ago.setMonth(ago.getMonth() - delta);

        if (req.body.date === undefined) {
          thisDate = new Date(JSON.stringify(ago).slice(1, -1));
        } else {
          thisDate = equalJson(req.body).date;
        }

        whereQuery["date"] = { $gte: thisDate };
        rows = await requestSystem("https://" + address.officeinfo.ghost.host + "/readHomeliaisonAnalytics", { whereQuery, projectQuery }, { headers: { "Content-Type": "application/json" } });

        res.send(JSON.stringify({ data: equalJson(JSON.stringify(rows.data.data)) }));

      } else if (mode === "all") {

        whereQuery = { action: "updateDesignStatus" };

        ago = new Date();
        ago.setMonth(ago.getMonth() - delta);

        if (req.body.date === undefined) {
          thisDate = new Date(JSON.stringify(ago).slice(1, -1));
        } else {
          thisDate = equalJson(req.body).date;
        }

        whereQuery["date"] = { $gte: thisDate };
        rows = await requestSystem("https://" + address.officeinfo.ghost.host + "/readHomeliaisonAnalytics", { whereQuery, projectQuery }, { headers: { "Content-Type": "application/json" } });

        res.send(JSON.stringify({ data: equalJson(JSON.stringify(rows.data.data)) }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_readLogDesignerStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerStatus = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, serviceParsing, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerStatus" ];
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
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerStatus";
      const logCollection = "projectDesignerSend";
      const { mode, desid, proid } = req.body;
      let rows;
      let resultObj;
      let project;
      let defaultObj;
      let matrix;
      let target;
      let key;
      let x, y;
      let whereQuery, updateQuery;
      let name, phone;
      let host;
      let type;
      let designer, file, itemKey, path;

      resultObj = { message: "done" };

      project = (await back.getProjectById(proid, { selfMongo: instance.mongo })).toNormal();

      defaultObj = [
        {
          title: "디자인",
          children: [
            {
              title: "현장 미팅 완료",
              type: "upload",
              deactive: false,
              value: 0,
              key: "firstPhoto",
              children: [
                {
                  title: "현장 사진 업로드",
                  type: "upload",
                  key: "firstPhoto",
                  photo: true,
                },
                {
                  title: "현장 사진 메모",
                  type: "memo",
                  key: "firstPhoto",
                },
              ],
            },
            {
              title: "일정표 공유",
              type: "upload",
              deactive: false,
              value: 0,
              key: "scheduleInfo",
              children: [
                {
                  title: "일정표 업로드",
                  type: "upload",
                  key: "scheduleInfo",
                  photo: false,
                },
                {
                  title: "일정표 메모",
                  type: "memo",
                  key: "scheduleInfo",
                },
              ],
            },
            {
              title: "컨셉 제안서 공유",
              type: "upload",
              deactive: false,
              value: 0,
              key: "designProposal",
              children: [
                {
                  title: "컨셉 제안서 업로드",
                  type: "upload",
                  key: "designProposal",
                  photo: false,
                },
                {
                  title: "컨셉 제안서 메모",
                  type: "memo",
                  key: "designProposal",
                },
              ],
            },
            {
              title: "디자인 제안서 공유",
              type: "upload",
              deactive: false,
              value: 0,
              key: "designDevelop",
              children: [
                {
                  title: "디자인 제안서 업로드",
                  type: "upload",
                  key: "designDevelop",
                  photo: false,
                },
                {
                  title: "디자인 제안서 메모",
                  type: "memo",
                  key: "designDevelop",
                },
              ],
            },
            {
              title: "수정 제안서 공유",
              type: "upload",
              deactive: false,
              value: 0,
              key: "designFix",
              children: [
                {
                  title: "디자인 제안서 업로드",
                  type: "upload",
                  key: "designDevelop",
                  photo: false,
                },
                {
                  title: "디자인 제안서 메모",
                  type: "memo",
                  key: "designDevelop",
                },
              ],
            },
            {
              title: "제품 리스트 공유",
              type: "upload",
              deactive: false,
              value: 0,
              key: "productList",
              children: [
                {
                  title: "제품 리스트 업로드",
                  type: "upload",
                  key: "productList",
                  photo: false,
                },
                {
                  title: "제품 리스트 메모",
                  type: "memo",
                  key: "productList",
                },
              ],
            },
            {
              title: "제안서 최종 컨펌",
              type: "string",
              deactive: false,
              value: 0,
              key: "finalDesign",
              children: [
                {
                  title: "최종 완료 메모",
                  type: "memo",
                  key: "finalDesign",
                },
              ],
            },
          ]
        },
        {
          title: "시공",
          children: [
            {
              title: "시공 의뢰서 공유",
              type: "upload",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructInfo",
              children: [
                {
                  title: "시공 의뢰서 업로드",
                  type: "upload",
                  key: "constructInfo",
                  photo: false,
                },
                {
                  title: "시공 의뢰서 메모",
                  type: "memo",
                  key: "constructInfo",
                },
              ],
            },
            {
              title: "시공 견적서 공유",
              type: "upload",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructEstimate",
              children: [
                {
                  title: "시공 견적서 업로드",
                  type: "upload",
                  key: "constructEstimate",
                  photo: false,
                },
                {
                  title: "시공 견적서 메모",
                  type: "memo",
                  key: "constructEstimate",
                },
              ],
            },
            {
              title: "시공사 선택 완료",
              type: "selection",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructSelection",
              children: [
                {
                  title: "홈리에종 시공사",
                  type: "selection",
                  value: 0,
                  view: "홈리에종 시공사 선택",
                },
                {
                  title: "디자이너 시공사",
                  type: "selection",
                  value: 0,
                  view: "디자이너 시공사 선택",
                },
                {
                  title: "고객 시공사",
                  type: "selection",
                  value: 0,
                  view: "고객 시공사 선택",
                },
              ]
            },
            {
              title: "공정표 공유",
              type: "string",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructSchedule",
              children: [
                {
                  title: "시공 공정표 메모",
                  type: "memo",
                  key: "constructSchedule",
                },
              ],
            },
            {
              title: "시공 착수",
              type: "string",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructStart",
              children: [
                {
                  title: "시공 착수 메모",
                  type: "memo",
                  key: "constructStart",
                },
              ],
            },
            {
              title: "시공 진행중",
              type: "string",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructProgress",
              children: [
                {
                  title: "시공 진행 메모",
                  type: "memo",
                  key: "constructProgress",
                },
              ],
            },
            {
              title: "시공 완료",
              type: "upload",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructMiddleFinal",
              children: [
                {
                  title: "시공 사진 업로드",
                  type: "upload",
                  key: "middlePhoto",
                  photo: true,
                },
                {
                  title: "시공 사진 메모",
                  type: "memo",
                  key: "middlePhoto",
                },
              ],
            },
            {
              title: "시공 AS 완료",
              type: "string",
              deactive: /퍼니싱/gi.test(serviceParsing(project.service)),
              value: 0,
              key: "constructFinal",
              children: [
                {
                  title: "시공 AS 메모",
                  type: "memo",
                  key: "constructFinal",
                },
              ],
            },
          ]
        },
        {
          title: "구매",
          children: [
            {
              title: "제품 구매 시작 전",
              type: "upload",
              deactive: false,
              value: 0,
              key: "productReady",
              children: [
                {
                  title: "제품 리스트 업로드",
                  type: "upload",
                  key: "productList",
                  photo: false,
                },
                {
                  title: "제품 리스트 메모",
                  type: "memo",
                  key: "productList",
                },
              ],
            },
            {
              title: "제품 구매 진행중",
              type: "string",
              deactive: false,
              value: 0,
              key: "productPurchase",
              children: [
                {
                  title: "제품 구매 메모",
                  type: "memo",
                  key: "productPurchase",
                }
              ]
            },
            {
              title: "구매 완료, 배송중",
              type: "string",
              deactive: false,
              value: 0,
              key: "productProgress",
              children: [
                {
                  title: "배송중 메모",
                  type: "memo",
                  key: "productProgress",
                }
              ]
            },
            {
              title: "배송 및 세팅 완료",
              type: "upload",
              deactive: false,
              value: 0,
              key: "productComplete",
              children: [
                {
                  title: "제품 배치도 업로드",
                  type: "upload",
                  key: "settingGuide",
                  photo: false,
                },
                {
                  title: "제품 배치도 메모",
                  type: "memo",
                  key: "settingGuide",
                },
              ]
            },
          ]
        },
        {
          title: "세팅",
          children: [
            {
              title: "촬영 여부 확인",
              type: "selection",
              deactive: false,
              value: 0,
              key: "photoSelection",
              children: [
                {
                  title: "촬영 진행 희망",
                  type: "selection",
                  value: 0,
                  view: "촬영 진행 희망",
                },
                {
                  title: "촬영 진행 안 함",
                  type: "selection",
                  value: 0,
                  view: "촬영 진행 안 함",
                }
              ]
            },
            {
              title: "촬영일 확인 완료",
              type: "string",
              deactive: false,
              value: 0,
              key: "contentsPhoto",
              children: [
                {
                  title: "촬영일 메모",
                  type: "memo",
                  key: "contentsPhoto",
                }
              ]
            },
            {
              title: "세팅 및 촬영 완료",
              type: "string",
              deactive: false,
              value: 0,
              key: "projectFinal",
              children: [
                {
                  title: "세팅 관련 메모",
                  type: "memo",
                  key: "projectFinal",
                }
              ]
            },
          ]
        },
      ];

      if (mode === "get") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          resultObj = equalJson(JSON.stringify(defaultObj));
          await back.mongoCreate(collection, {
            proid, desid, matrix: defaultObj
          }, { selfMongo });
        } else {
          resultObj = rows[0].matrix;
        }

      } else if (mode === "update") {

        matrix = equalJson(req.body.matrix);
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, {
            proid, desid, matrix
          }, { selfMongo });
        } else {
          await back.mongoUpdate(collection, [
            { proid },
            { matrix }
          ], { selfMongo });
        }

        resultObj = { message: "done" };

      } else if (mode === "chain") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, {
            proid, desid, matrix: defaultObj
          }, { selfMongo });
          rows = await back.mongoRead(collection, { proid }, { selfMongo });
        }
        target = rows[0];
        key = req.body.key;
        x = target.matrix.findIndex((obj) => { return obj.children.some((o) => { return o.key === key }); });

        if (x !== -1) {
          y = target.matrix[x].children.findIndex((obj) => { return obj.key === key });
          if (y !== -1) {
            whereQuery = { proid };
            updateQuery = {};
            updateQuery["matrix." + String(x) + ".children." + String(y) + ".value"] = 1;
            console.log(updateQuery);
            await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
          }
        }

      } else if (mode === "send") {

        name = req.body.name;
        phone = req.body.phone;
        designer = req.body.designer;
        host = address.frontinfo.host;
        path = "project";
        type = req.body.type;

        if (type === "status") {
          await kakao.sendTalk("progressClient", name, phone, { client: name, host, proid });
        } else if (type === "schedule") {
          await kakao.sendTalk("scheduleClient", name, phone, { client: name, host, proid });
        } else if (type === "file") {
          file = req.body.file;
          itemKey = req.body.itemKey;
          await kakao.sendTalk("projectDetail", name, phone, { client: name, designer, file, host, path, proid, key: itemKey });
        }

        await messageSend({
          text: designer + " 실장님이 " + name + " 고객님께 " + (type === "status" ? "진행바" : (type === "schedule" ? "일정표" : "파일 링크")) + "를 보냈습니다!",
          channel: "#301_console",
          voice: false,
        })

        await back.mongoCreate(logCollection, {
          type,
          date: new Date(),
          proid,
          designer: {
            desid,
            designer,
          },
          client: {
            cliid: project.cliid,
            name,
          }
        }, { selfMongo });

      } else if (mode === "boo") {

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          resultObj = { result: 0 };
        } else {
          resultObj = { result: 1 };
        }

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerStatus): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_projectDesignerDownloadLog = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/projectDesignerDownloadLog" ];
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
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const collection = "projectDesignerDownload";
      const { mode, desid, proid } = req.body;
      let resultObj;
      let rows;
      let defaultObj;
      let file;
      let thisObj;
      let who;

      defaultObj = {
        proid,
        desid,
        download: []
      };

      if (mode === "push") {
        file = req.body.file;
        who = req.body.who;
        resultObj = { message: "done" };
        defaultObj.download.push({
          file,
          date: new Date(),
          who,
        });

        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          thisObj = equalJson(JSON.stringify(defaultObj));
          await back.mongoCreate(collection, thisObj, { selfMongo });
        } else {
          thisObj = equalJson(JSON.stringify(rows[0]));
          thisObj.download.push({
            file,
            date: new Date(),
            who,
          })
          await back.mongoUpdate(collection, [ { proid }, { download: thisObj.download } ], { selfMongo });
        }
      } else if (mode === "get") {
        rows = await back.mongoRead(collection, { proid }, { selfMongo });
        if (rows.length === 0) {
          thisObj = equalJson(JSON.stringify(defaultObj));
          await back.mongoCreate(collection, thisObj, { selfMongo });
        } else {
          thisObj = equalJson(JSON.stringify(rows[0]));
        }
        resultObj = thisObj;
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_projectDesignerDownloadLog): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_noticeDesignerConsole = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, messageSend, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/noticeDesignerConsole" ];
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
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const testDesid = "d1701_aa01s";
      const testPhone = "010-2747-3403";
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "noticeDesignerConsole";
      const channel = "#300_designer";
      const idWords = "noticeDesignerConsoleSend_";
      const voice = true;
      const fairy = false;
      const { mode } = equalJson(req.body);
      let logDefaultObj;
      let thisJson;
      let rows;
      let thisId;
      let thisHistory;

      if (mode === "send") {
        const { desid, designer, type } = equalJson(req.body);
        const phone = (desid !== testDesid) ? req.body.phone : testPhone;

        logDefaultObj = {
          id: idWords + uniqueValue("hex"),
          type,
          date: new Date(),
          designer: {
            desid,
            designer,
          },
          history: [],
        };
        thisJson = equalJson(JSON.stringify(logDefaultObj));

        rows = await back.mongoRead(collection, { $and: [
          { type },
          { "designer.desid": desid },
        ] }, { selfMongo });
        if (rows.length === 0) {
          thisJson.history.unshift(new Date());
          await back.mongoCreate(collection, thisJson, { selfMongo });
        } else {
          thisId = rows[0].id;
          thisHistory = rows[0].history;
          thisHistory.unshift(new Date());
          await back.mongoUpdate(collection, [
            { id: thisId },
            { date: new Date(), history: thisHistory },
          ], { selfMongo });
        }

        if (type === "checklist") {

          await kakao.sendTalk("noticeDesignerChecklist", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 체크리스트 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "console") {

          await kakao.sendTalk("noticeDesignerConsole", designer, phone, { designer, host: address.frontinfo.host, path: "dashboard", desid });
          await messageSend({
            text: designer + " 실장님께 디자이너 콘솔 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "profile") {

          await kakao.sendTalk("noticeDesignerProfile", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 프로필 사진 업로드 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "work") {

          await kakao.sendTalk("noticeDesignerWork", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 작업 사진 업로드 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "career") {

          await kakao.sendTalk("noticeDesignerCareer", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 경력 학력 업데이트 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "basicEducation") {

          await kakao.sendTalk("designerEducationBasicSend", designer, phone, { designer, host: address.frontinfo.host, desid });
          await kakao.sendTalk("designerEducationConsoleSend", designer, phone, { designer, host: address.frontinfo.host, desid });
          await messageSend({
            text: designer + " 실장님께 디자이너 가이드와 콘솔 설명서를 전송하였습니다!",
            channel,
            voice,
            fairy
          });
          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "consoleEducation") {

          await kakao.sendTalk("designerEducationConsoleSend", designer, phone, { designer, host: address.frontinfo.host, desid });
          await messageSend({
            text: designer + " 실장님께 콘솔 설명서를 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "settingPortfolio") {

          await kakao.sendTalk("designerSettingPortfolioSend", designer, phone, { designer, host: address.frontinfo.host, desid, path: "setting" });
          await messageSend({
            text: designer + " 실장님께 세트 포트폴리오 요청 페이지를 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "statusCheck") {

          await kakao.sendTalk("progressDesignerTotal", designer, phone, { designer, host: address.frontinfo.host, desid });
          await messageSend({
            text: designer + " 실장님께 프로젝트 상태 체크를 요청하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "entire") {

          await kakao.sendTalk("noticeDesignerEntire", designer, phone, { designer, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 일괄 체크리스트 업로드 및 업데이트 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "until") {

          await kakao.sendTalk("noticeDesignerEntireUntil", designer, phone, { designer, date: req.body.until, host: address.frontinfo.host, path: "about", desid });
          await messageSend({
            text: designer + " 실장님께 일괄 체크리스트 업로드 및 업데이트 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "proposalProfile") {

          await kakao.sendTalk("noticeDesignerProfileWithProposal", designer, phone, { designer, date: req.body.until, host: address.frontinfo.host, path: "proposal_manual", desid });
          await messageSend({
            text: designer + " 실장님께 추천서 안내 및 프로필 업로드 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else {
          throw new Error("invalid type");
        }

      } else if (mode === "get") {
        if (req.body.desid !== undefined) {
          rows = await back.mongoRead(collection, { "designer.desid": req.body.desid }, { selfMongo });
          if (rows.length > 0) {
            res.send(JSON.stringify(rows[0]));
          } else {
            throw new Error("invalid desid");
          }
        } else {
          rows = await back.mongoRead(collection, {}, { selfMongo });
          res.send(JSON.stringify(rows));
        }
      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeDesignerConsole): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_noticeAspirantConsole = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const human = this.human;
  const { equalJson, messageSend, uniqueValue } = this.mother;
  let obj = {};
  obj.link = [ "/noticeAspirantConsole" ];
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
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "noticeAspirantConsole";
      const channel = "#301_apply";
      const idWords = "noticeAspirantConsoleSend_";
      const voice = true;
      const fairy = false;
      const { mode } = equalJson(req.body);
      let logDefaultObj;
      let thisJson;
      let rows;
      let thisId;
      let thisHistory;

      if (mode === "send") {
        const { aspid, designer, type, phone } = equalJson(req.body);

        logDefaultObj = {
          id: idWords + uniqueValue("hex"),
          type,
          date: new Date(),
          aspirant: {
            aspid,
            designer,
          },
          history: [],
        };
        thisJson = equalJson(JSON.stringify(logDefaultObj));

        rows = await back.mongoRead(collection, { $and: [
          { type },
          { "aspirant.aspid": aspid },
        ] }, { selfMongo });
        if (rows.length === 0) {
          thisJson.history.unshift(new Date());
          await back.mongoCreate(collection, thisJson, { selfMongo });
        } else {
          thisId = rows[0].id;
          thisHistory = rows[0].history;
          thisHistory.unshift(new Date());
          await back.mongoUpdate(collection, [
            { id: thisId },
            { date: new Date(), history: thisHistory },
          ], { selfMongo });
        }

        if (type === "documents") {

          await kakao.sendTalk("aspirantRequestDocuments", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspnotice", aspid });
          await messageSend({
            text: designer + " 실장님께 등록 서류 업로드 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "payment") {

          await kakao.sendTalk("aspirantRequestPayment", designer, phone, { client: designer, host: address.frontinfo.host, path: "asppayment", aspid });
          await messageSend({
            text: designer + " 실장님께 등록비 결제 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "plus") {

          await kakao.sendTalk("aspirantRequestPortfolio", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspportfolio", aspid });
          await messageSend({
            text: designer + " 실장님께 추가 포트폴리오 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "fail") {

          await human.sendSms({
            to: phone.replace(/[^0-9]/gi, ''),
            body: ("안녕하세요, " + designer + "님! 홈리에종입니다.\n" +
            "보내주신 신청서를 확인해 보았으나 아쉽게도 저희를 찾아주신 고객님들께 홈스타일링 서비스를 바로 제공하기에는 적합하지 않다고 판단되어 연락드립니다.\n\n" +
            "혹시 추가적으로 포트폴리오 및 경력사항을 상세히 다시 보내주시면 다시 한 번 검토 후에 연락드리도록 하겠습니다.\n" +
            "궁금한 사항이 있으시면 카카오 채널에서 [홈리에종]을 검색, 친구 추가 후 문의 사항 남겨주세요. 순차적으로 답변드리도록 하겠습니다!\n" +
            "\n" +
            "*추가 포트폴리오 전송\n" +
            "https://" + address.frontinfo.host + "/" + "aspportfolio" + ".php?aspid=" + aspid),
          });
          await messageSend({
            text: designer + " 실장님께 불합격 통지 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "pure") {

          await kakao.sendTalk("aspirantRequestPure", designer, phone, { client: designer });
          await messageSend({
            text: designer + " 실장님께 부재중 알림 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else if (type === "setting") {

          await kakao.sendTalk("aspirantRequestSetting", designer, phone, { client: designer, host: address.frontinfo.host, path: "aspsetting", aspid });
          await messageSend({
            text: designer + " 실장님께 세팅 포트폴리오 요청 알림톡을 전송하였습니다!",
            channel,
            voice,
            fairy
          });

          res.send(JSON.stringify({ message: "success" }));

        } else {
          throw new Error("invalid type");
        }

      } else if (mode === "get") {
        if (req.body.aspid !== undefined) {
          rows = await back.mongoRead(collection, { "aspirant.aspid": req.body.aspid }, { selfMongo });
          if (rows.length > 0) {
            res.send(JSON.stringify(rows[0]));
          } else {
            throw new Error("invalid aspid");
          }
        } else {
          rows = await back.mongoRead(collection, {}, { selfMongo });
          res.send(JSON.stringify(rows));
        }
      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantConsole): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_noticeAspirantCommon = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/noticeAspirantCommon" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const collection = "noticeAspirantCommon";
      const idKeywords = "noticeAspirantCommonSend_";
      const { aspid, mode } = equalJson(req.body);
      const aspirant = await back.getAspirantById(aspid, { selfMongo });
      const channel = "#301_apply";
      const masterId = "UM1S7H3GQ";
      const addressConst = "서울 성동구 성수일로 10 서울숲ITCT지식산업센터 605호";
      let json;
      let rows;
      let thisId, thisHistory;
      let createBoo;

      if (mode === "send") {
        const { value } = equalJson(req.body);
        rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo });
        if (rows.length === 0) {
          json = {
            id: idKeywords + uniqueValue("hex"),
            type: "common",
            date: new Date(),
            aspirant: {
              aspid: aspid,
              designer: aspirant.designer,
            },
            history: []
          };
          createBoo = true;
        } else {
          json = equalJson(JSON.stringify(rows[0]));
          createBoo = false;
        }

        if (value !== "default") {
          json.history.unshift({
            date: new Date(),
            value: value,
          });
          thisId = json.id;
          thisHistory = equalJson(JSON.stringify(json.history));
          if (createBoo) {
            await back.mongoCreate(collection, json, { selfMongo: selfLocalMongo });
          } else {
            await back.mongoUpdate(collection, [
              { id: thisId },
              { date: new Date(), history: thisHistory },
            ], { selfMongo: selfLocalMongo });
          }
        }

        await back.updateAspirant([
          { aspid: aspid },
          { "meeting.common.status": "미팅 조율" }
        ], { selfMongo });
        await kakao.sendTalk("aspirantRequestCommon", aspirant.designer, aspirant.phone, { client: aspirant.designer, host: address.frontinfo.host, path: "aspcommon", aspid: aspid });
        await messageSend({
          text: aspirant.designer + " 실장님께 공통 교육 안내 및 선택 알림톡을 전송하였습니다!",
          channel,
          voice: true,
        });

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "store") {

        const { value } = equalJson(req.body);
        rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo });
        if (rows.length === 0) {
          json = {
            id: idKeywords + uniqueValue("hex"),
            type: "common",
            date: new Date(),
            aspirant: {
              aspid: aspid,
              designer: aspirant.designer,
            },
            history: []
          };
          createBoo = true;
        } else {
          json = equalJson(JSON.stringify(rows[0]));
          createBoo = false;
        }

        json.history.unshift({
          date: new Date(),
          value: value,
        });
        thisId = json.id;
        thisHistory = equalJson(JSON.stringify(json.history));
        if (createBoo) {
          await back.mongoCreate(collection, json, { selfMongo: selfLocalMongo });
        } else {
          await back.mongoUpdate(collection, [
            { id: thisId },
            { date: new Date(), history: thisHistory },
          ], { selfMongo: selfLocalMongo });
        }

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "get") {

        rows = await back.mongoRead(collection, { "aspirant.aspid": aspid }, { selfMongo: selfLocalMongo });
        if (rows.length === 0) {
          res.send(JSON.stringify({ message: "ok", data: null }))
        } else {
          res.send(JSON.stringify({ message: "ok", data: rows[0] }));
        }

      } else if (mode === "confirm") {

        const { value } = equalJson(req.body);
        const thisDate = new Date(Number(value));

        await back.updateAspirant([
          { aspid: aspid },
          { "meeting.common.date": thisDate, "meeting.common.status": "참석 확정" }
        ], { selfMongo });
        await messageSend({
          text: aspirant.designer + " 실장님이 공통 교육 일자를 선택하셨습니다! => " + dateToString(thisDate, true) + " <@" + masterId + ">",
          channel,
          voice: true,
        });

        await kakao.sendTalk("aspirantRequestCommonConfirm", aspirant.designer, aspirant.phone, {
          client: aspirant.designer,
          date: `${String(thisDate.getFullYear())}년 ${String(thisDate.getMonth() + 1)}월 ${String(thisDate.getDate())}일 ${String(thisDate.getHours())}시 ${String(thisDate.getMinutes())}분`,
          address: addressConst,
        });
        await messageSend({
          text: aspirant.designer + " 실장님께 공통 교육 일자와 장소를 안내하였습니다!",
          channel,
          voice: true,
        });

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "guide") {

        const thisDate = aspirant.meeting.common.date;
        await kakao.sendTalk("aspirantRequestCommonConfirm", aspirant.designer, aspirant.phone, {
          client: aspirant.designer,
          date: `${String(thisDate.getFullYear())}년 ${String(thisDate.getMonth() + 1)}월 ${String(thisDate.getDate())}일 ${String(thisDate.getHours())}시 ${String(thisDate.getMinutes())}분`,
          address: addressConst,
        });
        await messageSend({
          text: aspirant.designer + " 실장님께 공통 교육 일자와 장소를 안내하였습니다!",
          channel,
          voice: true,
        });

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "reject") {

        await messageSend({
          text: aspirant.designer + " 실장님이 공통 교육이 가능한 일자가 없다고 하셨습니다! <@" + masterId + ">",
          channel,
          voice: true,
        });

        res.send(JSON.stringify({ message: "done" }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantCommon): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_noticeAspirantContractYesterday = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString, sleep, requestSystem, emergencyAlarm } = this.mother;
  const requestAspirantContract = async (selfMongo, logger) => {
    try {
      const agoStandard = 6;
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - agoStandard);
      const aspirants = await back.getAspirantsByQuery({
        "submit.partnership.date": {
          $gte: sixMonthAgo,
        }
      }, { selfMongo: selfMongo });
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const emptyDate = new Date(2000, 0, 1);
      const emptyDateValue = emptyDate.valueOf();
      let targets;
      let tempArr;
      let thisYear, thisMonth, thisDate;
      let year, month, date;
      let whereQuery, updateQuery;

      year = yesterday.getFullYear();
      month = yesterday.getMonth() + 1;
      date = yesterday.getDate();

      targets = [];
      for (let aspirant of aspirants) {
        if (aspirant.meeting.common.date.valueOf() > emptyDateValue) {
          tempArr = dateToString(aspirant.meeting.common.date).split("-");
          thisYear = Number(tempArr[0]);
          thisMonth = Number(tempArr[1]);
          thisDate = Number(tempArr[2]);
          if (thisYear === year && thisMonth === month && thisDate === date) {
            targets.push(aspirant.toNormal());
          }
        }
      }

      for (let aspirant of targets) {
        if (!/드랍/gi.test(aspirant.meeting.status)) {
          whereQuery = {};
          whereQuery["aspid"] = aspirant.aspid;
          updateQuery = {};
          updateQuery["meeting.status"] = "계약 요청";
          await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo });
          await sleep(500);
          await requestSystem("https://" + address.officeinfo.host + ":3002/createPartnershipContract", { aspid: aspirant.aspid }, { headers: { "Content-Type": "application/json" } });
          await sleep(500);
          await requestSystem("https://" + address.officeinfo.host + ":3002/createDesignerContract", { aspid: aspirant.aspid }, { headers: { "Content-Type": "application/json" } });
          if (aspirant.response.portfolio.plus.photo.valueOf() < emptyDateValue) {
            await sleep(500);
            await requestSystem("https://" + address.secondinfo.host + ":3000/noticeAspirantConsole", {
              mode: "send",
              aspid: aspirant.aspid,
              designer: aspirant.designer,
              phone: aspirant.phone,
              type: "setting",
            }, {
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      }

      return true;
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantContractYesterday): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/noticeAspirantContractYesterday" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      requestAspirantContract(selfMongo, logger).catch((err) => {
        logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantContractYesterday): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantContractYesterday): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_noticeAspirantOnBoarding = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString, sleep, requestSystem, emergencyAlarm } = this.mother;
  const requestAspirantBoarding = async (selfMongo, logger) => {
    try {
      const agoStandard = 12;
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - agoStandard);
      const aspirants = await back.getAspirantsByQuery({
        "submit.partnership.date": {
          $gte: sixMonthAgo,
        }
      }, { selfMongo: selfMongo });
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const now = new Date();
      const emptyDate = new Date(2000, 0, 1);
      const emptyDateValue = emptyDate.valueOf();
      let targets;
      let tempArr;
      let thisYear, thisMonth, thisDate;
      let year, month, date;
      let whereQuery, updateQuery;

      targets = [];
      for (let aspirant of aspirants) {
        if (aspirant.meeting.common.date.valueOf() > emptyDateValue) {
          if (aspirant.meeting.common.date.valueOf() <= now.valueOf()) {
            if (aspirant.submit.registration.date.valueOf() > emptyDateValue) {
              if (aspirant.response.portfolio.plus.photo.valueOf() > emptyDateValue) {
                if (/계약 완료/gi.test(aspirant.meeting.status)) {
                  targets.push(aspirant.toNormal());
                }
              }
            }
          }
        }
      }

      await emergencyAlarm("aspirant onboarding => " + "\n" + JSON.stringify(targets.map((a) => {
        return {
          aspid: a.aspid,
          name: a.designer,
        }
      })));

      return true;
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantOnBoarding): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/noticeAspirantOnBoarding" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      requestAspirantBoarding(selfMongo, logger).catch((err) => {
        logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantOnBoarding): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_noticeAspirantOnBoarding): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerCareerSync = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString, sleep, requestSystem, emergencyAlarm } = this.mother;
  const designerCareerSyncFunc = async (selfMongo, logger) => {
    try {
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const futureDate = new Date(3000, 0, 1);
      const futureDateValue = futureDate.valueOf();
      const now = new Date();
      const nowValue = now.valueOf();
      let whereQuery, updateQuery;
      let targetArr;
      let rawNumbers;
      let workingDay;
      let totalYears;
      let totalLeftDays;
      let totalMonth;

      for (let designer of designers) {
        if (designer.information.business.career.detail.length > 0) {
          targetArr = designer.information.business.career.detail.toNormal().filter((o) => { return !/기타 업무/gi.test(o.tag) });
          rawNumbers = targetArr.map((o) => {
            const { start, end } = o.date;
            let thisValue;
            if (end.valueOf() > futureDateValue){
              thisValue = nowValue - start.valueOf()
            } else {
              thisValue = end.valueOf() - start.valueOf()
            }
            return thisValue;
          }).reduce((acc, curr) => { return acc + curr }, 0);
          workingDay = Math.floor((((rawNumbers / 1000) / 60) / 60) / 24);
          totalYears = Math.floor(workingDay / 365);
          totalLeftDays = (workingDay % 365);
          totalMonth = Math.floor(totalLeftDays / 30);
          whereQuery = { desid: designer.desid };
          updateQuery = {};
          updateQuery["information.business.career.relatedY"] = totalYears;
          updateQuery["information.business.career.relatedM"] = totalMonth;
          await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo });
        }
      }

      return true;
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerCareerSync): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/designerCareerSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      designerCareerSyncFunc(selfMongo, logger).catch((err) => {
        logger.error("Second Ghost 서버 문제 생김 (rou_post_designerCareerSync): " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerCareerSync): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerContentsInfo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString, sleep, requestSystem, emergencyAlarm } = this.mother;
  let obj = {};
  obj.link = [ "/designerContentsInfo" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const selfMongo = instance.mongo;
      let thisDesigner, thisContents;
      let targetContents;

      if (mode === "get") {
        const { desid } = req.body;

        thisDesigner = await back.getDesignerById(desid, { selfMongo, toNormal: true });
        thisContents = await back.getContentsArrByQuery({ desid }, { selfMongo, toNormal: true })
        targetContents = thisDesigner.setting.ghost.concat(thisContents.map((c) => {
          const pid = c.contents.portfolio.pid;
          let newResult;
          newResult = [];
          for (let { index, gs } of c.photos.detail) {
            newResult.push({
              link: `/corePortfolio/listImage/${pid}/t${String(index)}${pid}.jpg`,
              sgTrue: gs,
            })
          }
          return newResult
        }).flat());

        if (req.body.sero === "true" || req.body.sero === true) {
          targetContents = targetContents.filter((o) => { return o.sgTrue === 's' });
        }

        if (req.body.garo === "true" || req.body.garo === true) {
          targetContents = targetContents.filter((o) => { return o.sgTrue === 'g' });
        }

        res.send(JSON.stringify({ data: targetContents }));

      } else {
        throw new Error("invalid mode");
      }
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerContentsInfo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerPaperInfo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, messageSend, uniqueValue, dateToString, sleep, requestSystem, emergencyAlarm, stringToLink } = this.mother;
  let obj = {};
  obj.link = [ "/designerPaperInfo" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const generalPort = 3000;
      const { mode } = req.body;
      let thisResponse;
      let thisTarget;

      if (mode === "get") {
        const { desid } = req.body;
        thisResponse = await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(3000) + "/listDesignProposal", {
          mode: "pick",
          desid,
        }, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        thisTarget = thisResponse.data.data.map((s) => {
          return { link: stringToLink(s) }
        })

        res.send(JSON.stringify({ data: thisTarget }));

      } else {
        throw new Error("invalid mode");
      }
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerPaperInfo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_pageToPdf = function () {
  const instance = this;
  const address = this.address;
  const { requestSystem, messageSend, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/pageToPdf" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const ghostResponse = await requestSystem("https://" + address.officeinfo.ghost.host + "/pageToPdf", req.body, { headers: { "Content-Type": "application/json" } });
      res.send(JSON.stringify(ghostResponse.data));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_pageToPdf): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_printClient = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend, messageLog, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/printClient" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.requestNumber === undefined || req.body.history === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongo;
      const { cliid, history } = equalJson(req.body);
      const mode = (req.body.mode === undefined ? "general" : req.body.mode );
      const requestNumber = Number(req.body.requestNumber);
      const client = await back.getClientById(cliid, { selfMongo, withTools: true });
      let text;
      let webReport;

      text = client.toPrint([ "선택한 시공 : " + history.curation.construct.items.join(", ") ], requestNumber);
      text += "\n\n";
      webReport = (await requestSystem("https://" + address.officeinfo.ghost.host + "/getClientAnalytics", { cliid, textMode: true }, { headers: { "Content-Type": "application/json" } })).data.report;
      text += webReport;

      requestSystem("https://" + address.officeinfo.ghost.host + "/printComplex", { text, cliid, requestNumber, mode }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_printClient): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_slackEvents = function () {
  const instance = this;
  const address = this.address;
  const { slack_info: { userDictionary, channelDictionary } } = this;
  const { messageLog, equalJson, ajaxJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/slackEvents" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    const thisBody = equalJson(req.body);
    try {
      const selfMongo = instance.mongo;
      if (typeof thisBody.event === "object") {
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        res.send(JSON.stringify({ challenge: thisBody.challenge }));
      }
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_slackEvents): " + e.message + "\n\n" + JSON.stringify(thisBody, null, 2)).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_rawImageParsing = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { ajaxJson } = this.mother;
  let obj = {};
  obj.link = [ "/rawImageParsing" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid post");
      }
      const { mode } = req.body;
      const token = "__split__";
      const folderConst = "/corePortfolio/rawImage";
      const selfMongo = instance.mongo;
      let firstResult;
      let contentsArr;
      let proid;
      let finalResult;
      let temp;
      let thisPid;

      firstResult = await ajaxJson({ path: "/corePortfolio/rawImage" }, "https://" + instance.address.officeinfo.ghost.host + "/readDir");
      firstResult = firstResult.filter((str) => { return /^[p]/.test(str) }).filter((str) => { return str.split(token).length >= 2 }).map((str) => {
        const [ proid, pidZip ] = str.split(token);
        const [ pid ] = pidZip.split(".");
        return { proid, pid }
      });

      if (mode === "list") {

        res.send(JSON.stringify(firstResult));

      } else if (mode === "get" || mode === "search" || mode === "proid") {

        if (req.body.proid === undefined) {
          throw new Error("invalid post");
        }

        finalResult = {};
        ({ proid } = req.body);

        try {
          contentsArr = await back.getContentsArrByQuery({ proid }, { selfMongo });
  
          finalResult.proid = proid;
          finalResult.raw = { exist: false, link: "" };
          finalResult.portfolio = { exist: false, link: "" };
          finalResult.review = { exist: false, link: "" };
  
          temp = firstResult.find((obj) => { return obj.proid === proid });
          if (temp !== undefined) {
            thisPid = temp.pid;
            finalResult.raw.exist = true;
            finalResult.raw.link = "https://" + address.officeinfo.ghost.host + folderConst + "/" + proid + token + thisPid + ".zip";
          } else {
            finalResult.raw.exist = true;
            finalResult.raw.link = "";
          }
  
          if (contentsArr.length > 0) {
            [ { contents: { portfolio: { pid: thisPid } } } ] = contentsArr;
            finalResult.portfolio.exist = true;
            finalResult.portfolio.link = "https://" + address.frontinfo.host + "/portdetail.php?pid=" + thisPid;
            if (contentsArr[0].contents.review.rid !== "" && !/re999/gi.test(contentsArr[0].contents.review.rid)) {
              finalResult.review.exist = true;
              finalResult.review.link = "https://" + address.frontinfo.host + "/revdetail.php?pid=" + thisPid;
            }
          }
          res.send(JSON.stringify(finalResult));

        } catch {
          res.send(JSON.stringify({ proid, raw: { exist: true, link: "" }, portfolio: { exist: false, link: "" }, review: { exist: false, link: "" } }));
        }

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      await logger.error("Second Ghost 서버 문제 생김 (rou_post_rawImageParsing): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_rawContentsSync = function () {
  const instance = this;
  const back = this.back;
  const drive = this.drive;
  const { equalJson } = this.mother;
  const rawcontentsSyncFunc = async function (MONGOLOCALC, MONGOC, logger) {
    try {
      const targetDriveId0 = "1iqH3Ajbz5CB2jXIiMuDKTnc33e36laUr";
      const targetDriveId1 = "1k-vo9L_WB90ACup7WarklVIUFq1mf1ay";
      const targetDriveId2 = "1YuWV37wnTqe68nYqnn_oyu5j_p6SPuAe";
      const selfMongo = MONGOLOCALC;
      const selfCoreMongo = MONGOC;
      const collection = "designerRawContents";
      const bodyRows = await back.mongoRead(collection, {}, { selfMongo });
      const allProjects = await back.getProjectsByQuery({ desid: { $regex: "^d" } }, { selfMongo: selfCoreMongo });
      const targetProjects = allProjects.filter((project) => {
        return project.process.contract.remain.date.valueOf() > (new Date(2000, 0, 1)).valueOf()
      }).filter((project) => {
        return project.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf()
      });

      const allClients = await back.getClientsByQuery({ $or: targetProjects.map((p) => { return { cliid: p.cliid } }) }, { selfMongo: selfCoreMongo });
      const allDesigners = await back.getDesignersByQuery({ $or: targetProjects.map((p) => { return { desid: p.desid } }) }, { selfMongo: selfCoreMongo });
      let proidArr0, proidArr1;
      let targetProids;
      let filteredProjects;
      let nameArr;
      let driveFiles0, driveFiles1, driveFiles2;
      let nameTargets;
      let tempArr;

      proidArr0 = bodyRows.map((obj) => { return obj.proid });
      proidArr1 = targetProjects.map((obj) => { return obj.proid });

      targetProids = proidArr1.filter((proid) => { return !proidArr0.includes(proid) })

      filteredProjects = targetProjects.filter((project) => { return targetProids.includes(project.proid) }).filter((project) => {
        return project.process.status.value !== "드랍";
      })

      nameArr = [];
      for (let { proid, cliid, desid } of filteredProjects) {
        nameArr.push([
          allClients.find((client) => { return client.cliid === cliid }).name,
          allDesigners.find((designer) => { return designer.desid === desid }).designer,
          proid,
          cliid,
          desid,
        ]);
      }

      driveFiles0 = await drive.listFiles_inPython(targetDriveId0);
      driveFiles1 = await drive.listFiles_inPython(targetDriveId1);
      driveFiles2 = await drive.listFiles_inPython(targetDriveId2);

      nameTargets = [];
      nameTargets = nameTargets.concat(driveFiles0);
      nameTargets = nameTargets.concat(driveFiles1);
      nameTargets = nameTargets.concat(driveFiles2);

      for (let [ client, designer ] of nameArr) {
        tempArr = nameTargets.filter(({ name }) => { return (new RegExp(client, "gi")).test(name) }).filter(({ name }) => { return (new RegExp(designer, "gi")).test(name) })
        if (tempArr.length > 0) {
          await logger.alert(JSON.stringify(tempArr, null, 2));
        }
      }

      return true;

    } catch (e) {
      console.log(e);
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/rawContentsSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      rawcontentsSyncFunc(instance.mongolocal, instance.mongo, logger).then((boo) => {
        if (boo) {
          return logger.cron("raw contents sync done");
        } else {
          return logger.error("raw contents sync fail");
        }
      }).catch((err) => { console.log(err); });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await logger.error("Second Ghost 서버 문제 생김 (rou_post_rawContentsSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_slackForm = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { slack_info: { userDictionary, channelDictionary } } = this;
  const { messageSend, equalJson, ajaxJson, requestSystem, dateToString } = this.mother;
  const divider = () => {
    return {
      "type": "divider"
    };
  }
  const header = (text) => {
    return {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": text,
        "emoji": true
      }
    }
  }
  const blank = () => {
    return {
      "type": "section",
      "text": {
        "type": "plain_text",
        "text": " ",
        "emoji": true
      }
    };
  }
  const blankDivider = () => {
    return [
      blank(),
      divider()
    ]
  }
  const linkButtonSection = (text, buttonText, buttonLink) => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": buttonText,
          "emoji": true
        },
        "value": "click_me_123",
        "url": buttonLink,
        "action_id": "button-action"
      }
    }
  }
  const normalButtonSection = (text, buttonText, actionId, buttonValue) => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": text
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": buttonText,
          "emoji": true
        },
        "value": buttonValue,
        "action_id": actionId
      }
    };
  }

  let obj = {};
  obj.link = [ "/slackForm", "/slackForm_rawPhoto" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const thisBody = equalJson(req.body);
      let modalJson, resultJson;
      let finalValues;
      let desid, triggerId;
      let thisDesigner;
      let allProjects;
      let processArr, stayArr;
      let targetArr;
      let buttonText;
      let allClients;
      let thisClient;

      resultJson = { "message": "done" };
      finalValues = {};

      if (req.url === "/slackForm_rawPhoto") {

        modalJson = {
          "trigger_id": (typeof thisBody.payload === "object" ? thisBody.payload.trigger_id : thisBody.trigger_id),
          "view": {
            "type": "modal",
            "callback_id": "rawPhoto",
            "title": {
              "type": "plain_text",
              "text": "원본 사진 링크 공유"
            },
            "blocks": [
              {
                "type": "input",
                "block_id": "client",
                "label": {
                  "type": "plain_text",
                  "text": "고객명",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "clientInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "designer",
                "label": {
                  "type": "plain_text",
                  "text": "디자이너명",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "designerInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "link",
                "label": {
                  "type": "plain_text",
                  "text": "원본 사진 링크",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": true,
                "element": {
                  "type": "plain_text_input",
                  "action_id": "linkInput",
                  "dispatch_action_config": {
                    "trigger_actions_on": [
                      "on_character_entered"
                    ]
                  }
                }
              },
              blank(),
              {
                "type": "input",
                "block_id": "pay",
                "label": {
                  "type": "plain_text",
                  "text": "촬영비",
                  "emoji": true
                },
                "optional": false,
                "dispatch_action": false,
                "element": {
                  "type": "radio_buttons",
                  "action_id": "payInput",
                  "options": [
                    {
                      "text": {
                        "type": "plain_text",
                        "text": "유료",
                        "emoji": true
                      },
                      "value": "paid"
                    },
                    {
                      "text": {
                        "type": "plain_text",
                        "text": "무료",
                        "emoji": true
                      },
                      "value": "free"
                    }
                  ]
                }
              },
              blank(),
            ],
            "close": {
              "type": "plain_text",
              "text": "취소",
              "emoji": true
            },
            "submit": {
              "type": "plain_text",
              "text": "공유하기",
              "emoji": true
            },
          }
        };
        await requestSystem("https://slack.com/api/views.open", modalJson, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + instance.slack_userToken,
          }
        });
        resultJson = { "message": "done" };

      } else if (req.url === "/slackForm") {

        if (typeof thisBody.payload === "object" && thisBody.payload.type === "view_submission") {

          resultJson = {
            "response_action": "clear"
          };

          if (thisBody.payload.view.callback_id === "rawPhoto") {

            finalValues = {
              client: thisBody.payload.view.state.values.client.clientInput.value,
              designer: thisBody.payload.view.state.values.designer.designerInput.value,
              link: thisBody.payload.view.state.values.link.linkInput.value,
              pay: thisBody.payload.view.state.values.pay.payInput.selected_option.value,
            };

            await messageSend({
              text: `${finalValues.client} 고객님 ${finalValues.designer} 실장님 현장의 원본 사진 링크를 공유합니다! (${finalValues.pay === "paid" ? "유료" : "무료"} 촬영)\n${finalValues.link}`,
              channel: "#502_sns_contents",
            });

            resultJson = {
              "response_action": "clear"
            };

          }

        } else if (typeof thisBody.payload === "object" && thisBody.payload.type === "block_actions") {

          if (thisBody.payload.view.callback_id === "projectCare") {

            triggerId = thisBody.payload.trigger_id;
            desid = thisBody.payload.actions[0].value;
            thisDesigner = await back.getDesignerById(desid, { selfMongo: instance.mongo });
            allProjects = (await back.getProjectsByQuery({ $and: [ { "desid": thisDesigner.desid }, { "process.contract.first.date": { $gte: new Date(2000, 0, 1) } } ] }, { selfMongo: instance.mongo })).toNormal();
            if (allProjects.length === 0) {
              allClients = [];
            } else {
              allClients = (await back.getClientsByQuery({ $or: allProjects.map(({ cliid }) => { return { cliid }; }) }, { selfMongo: instance.mongo })).toNormal();
            }
            processArr = allProjects.filter((p) => { return /진행/gi.test(p.process.status) });
            stayArr = allProjects.filter((p) => { return /대기/gi.test(p.process.status) });
            targetArr = stayArr.concat(processArr);

            modalJson = {
              "trigger_id": triggerId,
              "view": {
                "type": "modal",
                "callback_id": "projectCareDetail",
                "title": {
                  "type": "plain_text",
                  "text": thisDesigner.designer + " 프로젝트 상세"
                },
                "blocks": [ blank() ],
                "close": {
                  "type": "plain_text",
                  "text": "취소",
                  "emoji": true
                },
                "submit": {
                  "type": "plain_text",
                  "text": "확인",
                  "emoji": true
                },
              }
            };

            for (let project of targetArr) {

              thisClient = allClients.find(({ cliid }) => { return cliid === project.cliid });

              buttonText = ""
              buttonText += thisClient.name + " 고객님";
              buttonText += " / ";
              buttonText += project.process.status;
              buttonText += " => ";
              buttonText += dateToString(project.process.contract.form.date.from).slice(2);
              buttonText += " ~ ";
              buttonText += dateToString(project.process.contract.form.date.to).slice(2);

              modalJson.view.blocks.push(linkButtonSection(buttonText, "콘솔", "https://" + address.backinfo.host + "/project?proid=" + project.proid));
            }

            await requestSystem("https://slack.com/api/views.open", modalJson, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + instance.slack_userToken,
              }
            });
            resultJson = { "message": "done" };


          }

        }

      }

      res.send(JSON.stringify(resultJson));
    } catch (e) {
      logger.error("Second Ghost 서버 문제 생김 (rou_post_slackForm): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_photoParsing = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/photoParsing" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.images === undefined) {
        throw new Error("invaild post, must be 'images' array");
      }
      const selfMongo = instance.mongo;
      const { images } = equalJson(req.body);
      let pidArr, raw, contents, contentsArr, desidArr;
      let designers;
      let totalObj;

      pidArr = images.map((i) => {
        return i.replace(/\.[a-z]+$/gi, '').replace(/^[it][0-9]+/gi, '');
      });

      contentsArr = [];
      for (let pid of pidArr) {
        raw = await back.getContentsArrByQuery({ "contents.portfolio.pid": pid }, { selfMongo });
        if (raw.length !== 1) {
          throw new Error("invaild pid : " + JSON.stringify(pidArr));
        }
        [ contents ] = raw;
        contentsArr.push(contents);
      }

      desidArr = Array.from(new Set(contentsArr.map((c) => {
        return c.desid;
      })));

      if (desidArr.length > 0) {

        designers = (await back.getDesignersByQuery({ $or: desidArr.map((desid) => { return { desid }; }) }, { selfMongo })).map((d) => {
          return d.analytics.styling.tendency.toNormal();
        });

        if (designers.length > 0) {
          totalObj = equalJson(JSON.stringify(designers[0]));
          for (let i in totalObj) {
            for (let j in totalObj[i]) {
              totalObj[i][j] = 0;
            }
          }
          for (let style of designers) {
            for (let i in style) {
              for (let j in style[i]) {
                totalObj[i][j] += style[i][j];
              }
            }
          }
          for (let i in totalObj) {
            for (let j in totalObj[i]) {
              totalObj[i][j] = Math.round((totalObj[i][j] / designers.length) * 100) / 100;
            }
          }

          res.send(JSON.stringify(totalObj));
        } else {
          throw new Error("There is no designer : " + JSON.stringify(desidArr));
        }
      } else {
        res.send(JSON.stringify([]));
      }
    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_photoParsing): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_fairyMessage = function () {
  const instance = this;
  const { requestSystem, stringToLink } = this.mother;
  const { slack_userToken, slack_info } = this;
  let obj;
  obj = {};
  obj.link = [ "/fairyMessage" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.toId === undefined || req.body.text === undefined) {
        throw new Error("invalid post");
      }
      const { toId } = req.body;
      const fromId = req.body.fromId === undefined ? null : req.body.fromId;
      const url = slack_info.endPoint + "/chat.postMessage";
      const members = instance.members;
      let targetMember;
      let fromMember;
      let text;

      if (typeof fromId === "string") {
        fromMember = members.find((obj) => { return obj.id === fromId });
      } else {
        fromMember = null;
      }
      targetMember = members.find((obj) => { return obj.id === toId });

      if (fromMember === undefined || targetMember === undefined) {
        throw new Error("invalid member id");
      }

      text = req.body.text;
      if (fromMember !== null) {
        text = text.replace(/\#\{from\}/gi, "<@" + fromMember.slack.id + ">");
      }
      text = stringToLink(text);
      if (req.body.noIdMode === true || req.body.noIdMode === "true") {
        text = text;
      } else {
        text = `<@${targetMember.slack.id}> ${text}`;
      }

      await requestSystem(url, {
        channel: targetMember.slack.fairy,
        text: text,
      }, {
        headers: {
          "Authorization": "Bearer " + slack_userToken,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_fairyMessage): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_storeDailyReport = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, dateToString, stringToDate, cryptoString, equalJson } = this.mother;
  const { slack_userToken: token, slack_info } = this;
  let obj;
  obj = {};
  obj.link = [ "/storeDailyReport" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfCoreMongo = instance.mongo;
      const selfMongo = instance.mongolocal;
      const collection = "dailyReport";
      const url = slack_info.endPoint + "/conversations.history";
      const members = instance.members;
      const targetChannelId = "C062SLX46QL";
      const password = "homeliaison";
      const idKeywords = "daily_";
      let r;
      let targetList;
      let hex;
      let rows;

      r = await requestSystem(url, {
        token,
        channel: targetChannelId,
        limit: 100,
      }, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });

      targetList = r.data.messages.filter((o) => { return (typeof o.text === "string" && /[데대]일리/gi.test(o.text) && /업무/gi.test(o.text) && /보고/gi.test(o.text)) }).map((o) => {
        return o.text.replace(/\*/gi, '');
      }).map((str) => {
        const strArr = str.trim().split("\n");
        const titleTarget = strArr.find((s) => { return /[데대]일리/gi.test(s) && /업무/gi.test(s) && /보고/gi.test(s) });
        const titleTargetIndex = strArr.findIndex((s) => { return /[데대]일리/gi.test(s) && /업무/gi.test(s) && /보고/gi.test(s) });
        const obj = /[0-9][0-9][\-]?[0-9][0-9][\-]?[0-9][0-9]/gi.exec(titleTarget);
        const date = stringToDate(obj[0]);
        const name = titleTarget.replace(/[데대]일리/gi, "").replace(/업무/gi, "").replace(/보고/gi, "").replace(/[^가-힣]/gi, "").trim();
        const member = members.find((o) => { return o.name.trim() === name.trim() });
        return {
          raw: str,
          date,
          title: titleTarget,
          contents: strArr.slice(titleTargetIndex + 1).join("\n").replace(/  /gi, ' ').replace(/\t/gi, ' ').trim(),
          member: {
            name,
            id: member.id,
          }
        }
      });

      for (let obj of targetList) {
        hex = await cryptoString(password, obj.title);
        obj.id = idKeywords + obj.member.id + "_" + dateToString(obj.date).replace(/\-/gi, '') + "_" + hex;

        rows = await back.mongoRead(collection, { id: obj.id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, equalJson(JSON.stringify(obj)), { selfMongo });
        }
      }

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_storeDailyReport): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_fairySlack = function () {
  const instance = this;
  const { requestSystem, stringToLink } = this.mother;
  const { slack_userToken, slack_info } = this;
  let obj;
  obj = {};
  obj.link = [ "/fairySlack", "/uragenSlack", "/geminiSlack" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.channel === undefined || req.body.text === undefined) {
        throw new Error("invalid post");
      }
      const { channel } = req.body;
      const url = slack_info.endPoint + "/chat.postMessage";
      let text;

      text = req.body.text;
      text = stringToLink(text);

      await requestSystem(url, { channel, text }, {
        headers: {
          "Authorization": "Bearer " + slack_userToken,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_fairySlack): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerChecklistLog = function () {
  const instance = this;
  const { equalJson, uniqueValue, ipParsing, messageSend } = this.mother;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/designerChecklistLog" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined || req.body.designer === undefined || req.body.data === undefined) {
        throw new Error("invalid post");
      }
      const { desid, designer, data } = equalJson(req.body);
      const collection = "designerChecklistLog";
      const channel = "#checklist_log";
      const voice = false;
      const selfMongo = instance.mongolocal;
      const ip = String(req.headers["x-forwarded-for"] === undefined ? req.socket.remoteAddress : req.headers["x-forwarded-for"]).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      let text;

      text = "";
      ipParsing(ip).then((ipObj) => {
        if (ipObj === null) {
          ipObj = { ip };
        }

        data.id = desid + "_" + String((new Date()).valueOf()) + "_" + uniqueValue("hex");
        data.date = new Date();
        data.entire = data.data.entireMode ? 1 : 0;
        data.network = {
          userAgent,
          browser,
          os,
          platform,
          mobile: rawUserAgent.isMobile,
          ...ipObj
        };

        if (data.entire === 1) {
          text += "홈리에종에서 " + designer + " 실장님의 체크리스트를 업데이트 : \n";
        } else {
          text += designer + " 실장님이 체크리스트 업데이트를 직접 수행함 : \n";
        }
        text += JSON.stringify(data, null, 2);

        return back.mongoCreate(collection, data, { selfMongo });
      }).then(() => {
        return messageSend({ text, channel, voice });
      }).then(() => {
        if (data.data.property === "성함") {
          return messageSend({ text: data.data.designer + " 실장님의 이름이 바뀜 => " + data.data.value, channel: "#300_designer", voice: true });
        } else {
          return (new Promise((resolve, reject) => { return resolve(null) }));
        }
      }).catch((err) => {
        console.log(err);
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_designerChecklistLog): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_timeAspirantCommon = function () {
  const instance = this;
  const { equalJson, uniqueValue, ipParsing, messageSend, dateToString } = this.mother;
  const back = this.back;
  let obj;
  obj = {};
  obj.link = [ "/timeAspirantCommon" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invalid mode");
      }
      const { mode } = equalJson(req.body);
      const selfMongo = instance.mongo;
      const selfLocalMongo = instance.mongolocal;
      const emptyDate = new Date(2000, 0, 1);
      const emptyDateValue = emptyDate.valueOf();
      const idKeywords = "commonMeeting_";
      const collection = "timeAspirantCommon";
      const monthAgo = new Date();
      const agoStandard = 12;
      monthAgo.setMonth(monthAgo.getMonth() - agoStandard);
      const whereQuery = { "submit.partnership.date": { $gte: monthAgo } };
      const aspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo });
      let timeSet;
      let year, month, date;
      let fromDate, toDate;
      let timeTong;
      let dateString;
      let rows;
      let thisKey;

      if (mode === "update") {
        timeSet = [];
        for (let aspirant of aspirants) {
          if (aspirant.meeting.common.date.valueOf() >= emptyDateValue) {
            if (!/드랍/gi.test(aspirant.meeting.status)) {
              timeSet.push(String(aspirant.meeting.common.date.valueOf()));
            }
          }
        }
        timeSet = [ ...new Set(timeSet) ].map((str) => { return new Date(Number(str)) });
        timeTong = timeSet.map((date) => {
          return { date, targets: [] }
        });
        for (let dateObject of timeSet) {
          year = dateObject.getFullYear();
          month = dateObject.getMonth();
          date = dateObject.getDate();
          fromDate = new Date(year, month, date, dateObject.getHours(), dateObject.getMinutes(), 0);
          toDate = new Date(year, month, date, dateObject.getHours(), dateObject.getMinutes(), 0);
          fromDate.setHours(fromDate.getHours() - 1);
          toDate.setHours(toDate.getHours() + 1);
          for (let aspirant of aspirants) {
            if (aspirant.meeting.common.date.valueOf() >= emptyDateValue) {
              if (!/드랍/gi.test(aspirant.meeting.status)) {
                if (fromDate.valueOf() <= aspirant.meeting.common.date.valueOf() && toDate.valueOf() >= aspirant.meeting.common.date.valueOf()) {
                  timeTong.find(({ date }) => { return date.valueOf() === dateObject.valueOf() }).targets.push({
                    aspid: aspirant.aspid,
                    date: aspirant.meeting.common.date
                  })
                }
              }
            }
          }
        }
        for (let obj of timeTong) {
          dateString = dateToString(obj.date, true);
          dateString = dateString.replace(/[ \-\:]/gi, '');
          obj.id = idKeywords + dateString;
          obj.log = new Date();
          thisKey = obj.id;
          rows = await back.mongoRead(collection, { id: thisKey }, { selfMongo: selfLocalMongo });
          if (rows.length !== 0) {
            await back.mongoDelete(collection, { id: thisKey }, { selfMongo: selfLocalMongo });
          }
          await back.mongoCreate(collection, equalJson(JSON.stringify(obj)), { selfMongo: selfLocalMongo });
        }

        res.send(JSON.stringify({ message: "done" }));

      } else if (mode === "get") {

        const { value } = equalJson(req.body);
        const fromDate = new Date(Number(value));
        const toDate = new Date(Number(value));

        fromDate.setHours(fromDate.getHours() - 1);
        toDate.setHours(toDate.getHours() + 1);

        rows = await back.mongoRead(collection, { $and: [
          {
            date: { $gte: fromDate }
          },
          {
            date: { $lte: toDate }
          },
        ] }, { selfMongo: selfLocalMongo });

        res.send(JSON.stringify({ data: rows }));

      } else {
        throw new Error("invalid mode");
      }

    } catch (e) {
      console.log(e);
      logger.error("Second Ghost 서버 문제 생김 (rou_post_timeAspirantCommon): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_homeliaisonCrypto = function () {
  const instance = this;
  const { equalJson, cryptoString, decryptoHash } = this.mother;
  const back = this.back;
  let obj = {};
  obj.link = [ "/homeliaisonCrypto" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      const password = "homeliaison";
      let result;
      let resultObj;
      let targets;

      if (req.body.targets !== undefined && Array.isArray(equalJson(req.body.targets))) {

        ({ targets } = equalJson(req.body));
        resultObj = [];

        if (mode === "crypto") {
          if (!targets.every((obj) => { return (typeof obj === "object" && obj !== null && obj.string !== undefined && obj.target !== undefined) })) {
            throw new Error("invaild post");
          }
          for (let { string, target } of targets) {
            resultObj.push({
              hash: await cryptoString(password, string),
              target
            });
          }
        } else {
          if (!targets.every((obj) => { return (typeof obj === "object" && obj !== null && obj.hash !== undefined && obj.target !== undefined) })) {
            throw new Error("invaild post");
          }
          for (let { hash, target } of targets) {
            if (hash.replace(/[0-9a-f]/g, '') !== "") {
              resultObj.push({
                string: hash,
                target
              });
            } else {
              resultObj.push({
                string: await decryptoHash(password, hash),
                target
              });
            }
          }
        }

      } else {

        resultObj = {};

        if (mode === "crypto" || mode === "cryptoString") {
          if (req.body.string === undefined) {
            throw new Error("invaild post");
          }
          result = await cryptoString(password, req.body.string);
          resultObj = { hash: result };
        } else if (mode === "decrypto" || mode === "decryptoHash") {
          if (req.body.hash === undefined) {
            throw new Error("invaild post");
          }
          if (req.body.hash.replace(/[0-9a-f]/g, '') !== "") {
            result = req.body.hash;
          } else {
            result = await decryptoHash(password, req.body.hash);
          }
          resultObj = { string: result };
        } else {
          throw new Error("invaild mode");
        }

        if (typeof req.body.target === "string") {
          resultObj.target = req.body.target;
        }

      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await logger.error("Second Ghost 서버 문제 생김 (rou_post_homeliaisonCrypto): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

TransferRouter.prototype.rou_post_designerLevelMatrixSync = function () {
  const instance = this;
  const work = this.work;
  const { equalJson, messageSend, dateToString, stringToDate, sleep } = this.mother;
  const designerLevelMatrixSync = async function (selfMongo) {
    try {
      const db = "miro81";
      const collection = "designer";
      const designers = await selfMongo.db(db).collection(collection).find({}).toArray();
      let whereQuery, updateQuery;
      let copiedMatrix;

      for (let designer of designers) {
        whereQuery = { desid: designer.desid };
        updateQuery = {};

        copiedMatrix = equalJson(JSON.stringify(designer.analytics.project.matrix));
        if (designer.analytics.construct.level === 0) {
          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[1] = [ 0, 0, 0 ];
          copiedMatrix[2] = [ 0, 0, 0 ];
          copiedMatrix[3] = [ 0, 0, 0 ];
        } else if (designer.analytics.construct.level === 1) {
          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[2] = [ 0, 0, 0 ];
          copiedMatrix[3] = [ 0, 0, 0 ];
        } else if (designer.analytics.construct.level === 2) {
          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[3] = [ 0, 0, 0 ];
        } else if (designer.analytics.construct.level === 3) {
          copiedMatrix[0] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[1] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[2] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
          copiedMatrix[3] = [ (designer.analytics.project.partial ? 1 : 0), 1, 1 ];
        }

        updateQuery["analytics.project.matrix"] = equalJson(JSON.stringify(copiedMatrix));
        await selfMongo.db(db).collection(collection).updateOne(whereQuery, { $set: updateQuery });
        console.log(whereQuery, updateQuery);
      }

      return true;

    } catch (e) {
      console.log(e);
      return false;
    }
  }
  let obj = {};
  obj.link = [ "/designerLevelMatrixSync" ];
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const result = await designerLevelMatrixSync(selfMongo);
      if (!result) {
        throw new Error("designer level matrix sync fail");
      }
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("Second Ghost 서버 문제 생김 (rou_post_designerLevelMatrixSync): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

TransferRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await logger.error("Second Ghost 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

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
