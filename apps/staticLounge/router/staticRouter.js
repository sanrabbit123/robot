const StaticRouter = function (MONGOC, MONGOLOCALC) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(process.cwd() + "/apps/imageReader/imageReader.js");
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GoogleDocs = require(process.cwd() + "/apps/googleAPIs/googleDocs.js");
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  const PlayAudio = require(process.cwd() + "/apps/playAudio/playAudio.js");

  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.host = this.address.officeinfo.ghost.host;
  this.mongo = MONGOC;
  this.mongolocal = MONGOLOCALC;

  this.formidable = require("formidable");
  this.imageReader = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.drive = new GoogleDrive();
  this.docs = new GoogleDocs();
  this.chrome = new GoogleChrome();
  this.audio = new PlayAudio();

  this.staticConst = process.env.HOME + "/samba";
  this.sambaToken = "__samba__";
  this.homeliaisonOfficeConst = this.address.officeinfo.ghost.file.office;
  this.designerPhotoConst = "사진_등록_포트폴리오";
  this.designerFolderConst = "디자이너";

  this.vaildHost = [
    this.address.frontinfo.host,
    this.address.secondinfo.host,
    this.address.transinfo.host,
    this.address.backinfo.host,
    this.address.pythoninfo.host,
    this.address.testinfo.host,
    this.address.croninfo.host,
    this.address.officeinfo.ghost.host,
    "home-liaison.servehttp.com",
    "localhost:3000",
    "192.168.0.14:3000",
  ];

}

StaticRouter.prototype.fireWall = function (req) {
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

StaticRouter.prototype.rou_get_First = function () {
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
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else if (req.params.id === "disk") {
        const disk = await diskReading();
        res.send(JSON.stringify({ disk: disk.toArray() }));
      } else {
        res.send(JSON.stringify({ message: "hi" }));
      }

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_get_First): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

StaticRouter.prototype.rou_post_listFiles = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/listFiles" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let result;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp(sambaToken, "gi"), staticConst);
      list = await leafParsing(target);

      list = list.map((i) => {
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), "__samba__");
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_listFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_searchFiles = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, leafParsing } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/searchFiles" ];
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
      if (req.body.path === undefined || req.body.keyword === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let result;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = "__samba__";
      }
      if (!/^__/.test(target)) {
        target = "__samba__" + "/" + target;
      }

      target = target.replace(/__samba__/gi, staticConst);
      list = await leafParsing(target, true, req.body.keyword);

      list = list.map((i) => {
        i.absolute = i.absolute.replace(new RegExp("^" + staticConst, "i"), "__samba__");
        return i;
      }).filter((i) => {
        return !/^\.\_/.test(i.absolute.split("/")[i.absolute.split("/").length - 1]);
      }).filter((i) => {
        return i.absolute.split("/")[i.absolute.split("/").length - 1] !== ".DS_Store";
      });

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_searchFiles): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_readDir = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/readDir" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let list;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = "__samba__";
      }
      if (!/^__/.test(target)) {
        target = "__samba__" + "/" + target;
      }

      target = target.replace(/__samba__/gi, staticConst);

      list = await fileSystem(`readDir`, [ target ]);

      res.send(JSON.stringify(list));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_readDir): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_renameTargets = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/renameTargets" ];
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
      if (req.body.from === undefined || req.body.to === undefined) {
        throw new Error("invalid post");
      }
      const { from, to } = equalJson(req.body);
      if (!Array.isArray(from) || !Array.isArray(to)) {
        throw new Error("invalid post");
      }
      let finalFrom, finalTo;

      finalFrom = [];
      for (let target of from) {
        if (typeof target !== "string") {
          throw new Error("invalid post");
        }
        target = target.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        finalFrom.push(target);
      }

      finalTo = [];
      for (let target of to) {
        if (typeof target !== "string") {
          throw new Error("invalid post");
        }
        target = target.replace(/^\//i, '').replace(/\/$/i, '');
        if (target.trim() === '') {
          target = "__samba__";
        }
        if (!/^__/.test(target)) {
          target = "__samba__" + "/" + target;
        }
        target = target.replace(/__samba__/gi, staticConst);
        finalTo.push(target);
      }

      if (finalFrom.length !== finalTo.length) {
        throw new Error("invalid post");
      }

      for (let i = 0; i < finalFrom.length; i++) {
        await shellExec("mv", [ finalFrom[i], finalTo[i] ]);
      }

      res.send(JSON.stringify({ message: "succcess" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_renameTargets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_generalFileUpload = function () {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_generalFileUpload): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_photoParsing = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const back = this.back;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/photoParsing" ];
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

      if (desidArr > 0) {
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
      errorLog("Static lounge 서버 문제 생김 (rou_post_photoParsing): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_makeFolder = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink } = this.mother;
  const { staticConst, sambaToken } = this;
  let obj;
  obj = {};
  obj.link = [ "/makeFolder" ];
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
      if (req.body.path === undefined) {
        throw new Error("invaild post");
      }
      let target;
      let targetList;
      let tempString;
      let tempDir;

      target = req.body.path.replace(/^\//i, '').replace(/\/$/i, '');
      if (target.trim() === '') {
        target = sambaToken;
      }
      if (!/^__/.test(target)) {
        target = sambaToken + "/" + target;
      }

      target = target.replace(new RegExp(sambaToken, "gi"), '');
      targetList = target.split("/");
      tempString = staticConst;
      for (let i = 0; i < targetList.length; i++) {
        tempDir = await fileSystem(`readDir`, [ tempString ]);
        if (!tempDir.includes(targetList[i]) && targetList[i] !== "") {
          await shellExec(`mkdir ${shellLink(tempString + "/" + targetList[i])}`);
        }
        tempString += '/';
        tempString += targetList[i];
      }

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_makeFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_zipPhoto = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerPhotoConst } = this;
  const drive = this.drive;
  let obj;
  obj = {};
  obj.link = [ "/zipPhoto" ];
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
      if (req.body.pid === undefined || req.body.proid === undefined) {
        throw new Error("invaild post");
      }
      const targetFolderId = "1rSIKIL-jjmXU-D2Zdmf9ElXFmH2Htycl";
      const { pid, proid } = req.body;
      const c780 = "780";
      const c1500 = "1500";
      const c3508 = pid;
      const splitToken = "__split__";
      const targetDir = staticConst + homeliaisonOfficeConst + "/" + designerPhotoConst;

      const list = await fileSystem(`readDir`, [ targetDir ]);
      const homeFolder = await fileSystem(`readDir`, [ process.env.HOME ]);
      const tempFolderName = "temp";
      let folderName;
      let shareClientName, shareDesignerName;
      let tempArr;
      let command;
      let zipIdClient, zipIdDesigner;
      let zipLinkClient, zipLinkDesigner;
      let commands;

      if (!homeFolder.includes(tempFolderName)) {
        await shellExec(`mkdir`, [ `${process.env.HOME}/${tempFolderName}` ]);
      }

      folderName = list.find((i) => { return (new RegExp('^' + pid)).test(i); });
      tempArr = folderName.split('_');
      shareClientName = "HL_";
      shareDesignerName = "HL_";
      if (tempArr.length === 4) {
        shareClientName += tempArr[2] + "_고객님_";
        shareClientName += tempArr[1] + "_디자이너님";
        shareDesignerName += tempArr[1] + "_디자이너님_";
        shareDesignerName += tempArr[2] + "_고객님";
      } else if (tempArr.length === 3) {
        shareDesignerName += tempArr[1] + "_디자이너님";
      } else {
        throw new Error("invaild post");
      }
      shareClientName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";
      shareDesignerName += '_' + dateToString(new Date()).slice(2).replace(/\-/gi, '') + ".zip";

      commands = "";
      if (proid.trim() !== "") {
        commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c3508)};`;
        commands += `zip ${shellLink(staticConst)}/corePortfolio/rawImage/${proid}${splitToken}${shellLink(c3508)}.zip ./*;`;  
      }
      commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c3508)};`;
      commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareDesignerName)} ./*;`;
      commands += `cd ${shellLink(targetDir)}/${shellLink(folderName)}/${shellLink(c780)};`;
      commands += `zip ${shellLink(process.env.HOME)}/${shellLink(tempFolderName)}/${shellLink(shareClientName)} ./*;`;

      await shellExec(commands);

      do {
        zipIdDesigner = await drive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareDesignerName)}`);
        await sleep(500);
      } while (zipIdDesigner === null);
      await sleep(500);
      zipLinkDesigner = await drive.read_webView_inPython(zipIdDesigner);

      if (tempArr.length === 3) {
        zipLinkClient = null;
      } else {

        do {
          zipIdClient = await drive.upload_inPython(targetFolderId, `${shellLink(process.env.HOME + "/" + tempFolderName + "/" + shareClientName)}`);
          await sleep(500);
        } while (zipIdClient === null);
        await sleep(500);
        zipLinkClient = await drive.read_webView_inPython(zipIdClient);
      }

      await shellExec([
        [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareClientName}` ] ],
        [ `rm`, [ `-rf`, `${process.env.HOME}/${tempFolderName}/${shareDesignerName}` ] ],
      ]);

      res.send(JSON.stringify({ designer: zipLinkDesigner, client: zipLinkClient }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_zipPhoto): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_designerFolder = function () {
  const instance = this;
  const { errorLog, fileSystem, shellExec, shellLink, dateToString, sleep } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerFolderConst } = this;
  const drive = this.drive;
  const docs = this.docs;
  let obj;
  obj = {};
  obj.link = [ "/designerFolder" ];
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
      if (req.body.name === undefined || req.body.subid === undefined) {
        throw new Error("invaild post");
      }
      const designerFolderId = "1-xcQct5wXg8am57W1e8xXKwSQyLWAsMP";
      const sambaDir = staticConst + homeliaisonOfficeConst + "/" + designerFolderConst;
      let basicList = [
        "포트폴리오",
        "등록서류",
        "고객안내및제안문서"
      ];
      let id, subid;
      let folderName;
      let folderId, docsId;
      let num;

      folderName = req.body.subid + "_" + req.body.name;

      folderId = await drive.makeFolder_inPython(folderName);
      await drive.moveFolder_inPython(folderId, designerFolderId);

      await sleep(2000);
      num = 0;
      while ((!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ]))) && (num < 10)) {
        await sleep(2000);
        num++;
      }

      if (await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}` ])) {
        for (let b of basicList) {
          if (!(await fileSystem(`exist`, [ `${sambaDir}/partnership/${folderName}/${b}` ]))) {
            await fileSystem(`mkdir`, [ `${sambaDir}/partnership/${folderName}/${b}` ]);
          }
        }
      }

      docsId = await docs.create_newDocs_inPython(folderName + '_' + "docs", folderId);

      res.send(JSON.stringify({
        folderName: folderName,
        drive: `https://drive.google.com/drive/folders/${folderId}`,
        docs: `https://docs.google.com/document/d/${docsId}`,
      }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_designerFolder): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_recordBackup = function () {
  const instance = this;
  const address = this.address;
  const { errorLog, fileSystem, shellExec, shellLink, requestSystem, dateToString, uniqueValue, binaryRequest } = this.mother;
  const { staticConst, sambaToken, homeliaisonOfficeConst, designerFolderConst } = this;
  const storeMother = staticConst + homeliaisonOfficeConst + "/통화녹취파일";
  const recordBackupExecute = async function () {
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const urls = {
      init: "https://centrex.uplus.co.kr/premium",
      login: "https://centrex.uplus.co.kr/premium/PHP/web_login.php",
      list: "https://centrex.uplus.co.kr/premium/backoffice/record_list.html",
      delete: "https://centrex.uplus.co.kr/premium/PHP/deleteRecordFile.php"
    };
    const splitToken = "__split__";
    const tempFolder = process.cwd() + "/temp";
    try {
      const storeMotherContents = (await fileSystem(`readDir`, [ storeMother ])).filter((str) => { return !/^\./.test(str); });
      const folderName = "records_" + dateToString(new Date()).replace(/\-/gi, '') + "_" + uniqueValue("string");
      let url, res, dom, token, idsave, id, pass;
      let session;
      let inputs;
      let postData;
      let trArr;
      let aNode, aArr;
      let pageNum;
      let totalLinks;
      let log;
      let tempbinary;
      let storeTargets;
      let downloadedFiles;
      let errorBoo;
      let safeNum;
  
      url = urls.init;
      res = await requestSystem(url);
  
      dom = new JSDOM(res.data);
  
      token = dom.window.document.querySelectorAll("input")[2].value;
      session = res.headers["set-cookie"][0].split(';')[0];
      idsave = 1;
      id = address.officeinfo.phone.total.number;
      pass = address.officeinfo.phone.total.password;
  
      url = urls.login;
      res = await requestSystem(url, { token, idsave, id, pass }, { headers: { Cookie: session } });
  
      url = urls.list;
      res = await requestSystem(url, {}, { method: "get", headers: { Cookie: session } });
  
      dom = new JSDOM(res.data);
      inputs = dom.window.document.querySelector('form').children;
      postData = {};
      for (let input of inputs) {
        if (/INPUT/gi.test(input.nodeName)) {
          postData[input.getAttribute("name")] = input.getAttribute("value");
        }
      }
  
      pageNum = 0;
      totalLinks = [];
      do {
        pageNum++;
        postData.page = String(pageNum);
        res = await requestSystem(url, postData, { headers: { Cookie: session } });
        dom = new JSDOM(res.data);
        trArr = [ ...dom.window.document.querySelector('.contents_area').querySelector('.table_type01').querySelectorAll('tr') ];
        aArr = [];
        for (let tr of trArr) {
          aNode = tr.querySelector('a');
          if (aNode !== null) {
            aArr.push(aNode.getAttribute("href"));
          }
        }
  
        aArr = aArr.map((str) => { return str.trim(); }).filter((str) => { return str !== '#'; }).map((str) => {
          return str + splitToken + String(pageNum);
        });
        totalLinks = totalLinks.concat(aArr);
      } while (aArr.length !== 0);
  
      totalLinks = [ ...new Set(totalLinks) ].map((str) => {
        return urls.init + str.slice(2);
      }).map((link) => {
        let tempArr, tempArr1, obj, page;
        page = Number(link.split(splitToken)[1]);
        link = link.split(splitToken)[0];
        tempArr = link.split('?');
        tempArr1 = tempArr[1].split('&').map((s) => { return s.split('='); });
        obj = {};
        for (let [ key, value ] of tempArr1) {
          obj[key] = value;
        }
        return { link, page, host: tempArr[0], data: obj };
      });
  
      log = {
        date: new Date(),
        length: totalLinks.length,
        records: totalLinks
      };
  
      await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName}`);
      await shellExec(`mkdir ${shellLink(tempFolder)}/${folderName}`);
  
      for (let i = 0; i < totalLinks.length; i++) {
        safeNum = 0;
        do {
          errorBoo = true;
          try {
            tempbinary = await binaryRequest(totalLinks[i].link, null, { headers: { Cookie: session } });
            await fileSystem(`writeBinary`, [ `${process.cwd()}/temp/${folderName}/${totalLinks[i].data.filename}`, tempbinary ]);
            console.log(`${totalLinks[i].data.filename} download success`);
  
            postData.page = String(totalLinks[i].page);
            postData["chk[]"] = totalLinks[i].data.filename.split('-')[0] + "|" + totalLinks[i].data.filename;
            res = await requestSystem(urls.delete, postData, { headers: { Cookie: session } });
            console.log(`${totalLinks[i].data.filename} server delete success`);
  
            errorBoo = false;
          } catch (e) {
            errorBoo = true;
          }
          safeNum++;
        } while (errorBoo || safeNum > 10);
      }
  
      storeTargets = {};
      for (let str of storeMotherContents) {
        storeTargets['p' + str.split('_')[0]] = str;
      }
  
      downloadedFiles = (await fileSystem(`readDir`, [ `${tempFolder}/${folderName}` ])).filter((str) => { return !/^\./.test(str); });
      downloadedFiles = downloadedFiles.map((str) => {
        return { target: 'p' + str.split('-')[0].replace(/^0/gi, '').replace(/^0/gi, ''), file: `${tempFolder}/${folderName}/${str}` };
      });
  
      for (let { target, file } of downloadedFiles) {
        if (typeof storeTargets[target] === "string") {
          await shellExec(`mv ${shellLink(file)} ${shellLink(storeMother + "/" + storeTargets[target])};`);
        }
      }
  
      await shellExec(`rm -rf ${shellLink(tempFolder)}/${folderName};`);
  
      return log;
  
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/recordBackup" ];
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
      const backupFunc = async function () {
        try {
          let safeNum, log;
          safeNum = 0;
          do {
            log = await recordBackupExecute();
            safeNum++;
          } while (log === false || safeNum < 10);
          await errorLog("record backup and delete done");
        } catch (e) {
          await errorLog("record backup and delete error : " + e.message);
        }
      }
      
      backupFunc().catch((err) => {
        errorLog("record backup and delete error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_recordBackup): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_mongoToJson = function () {
  const instance = this;
  const { shellExec, shellLink, fileSystem, errorLog } = this.mother;
  const address = this.address;
  const mongoToJsonFunction = async function () {
    try {
      const today = new Date();
      const zeroAddition = function (number) {
        if (number < 10) {
          return `0${String(number)}`;
        } else {
          return String(number);
        }
      }
      const backFolderName = "backup";
      const mongoTargets = [
        [ "mongoinfo", "mongo" ],
        [ "backinfo", "console" ],
        [ "pythoninfo", "python" ],
        [ "testinfo", "log" ],
        [ "secondinfo", "second" ],
      ];
      const robotDirArr = process.cwd().split("/");
      robotDirArr.pop();
      const robotDirMother = robotDirArr.join("/");
      const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
      if (!robotDirMotherDetail.includes(backFolderName)) {
        await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
      }
      const backDir = robotDirMother + "/" + backFolderName;
      let tempInfo, timeString;
      
      timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

      for (let [ infoName, dbName ] of mongoTargets) {
        tempInfo = address[infoName];
        await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
      }

      await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

      await errorLog("mongo to json done");

    } catch (e) {
      await errorLog("mongo to json error : " + e.message);
    }
  }
  let obj;
  obj = {};
  obj.link = [ "/mongoToJson" ];
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
    
      mongoToJsonFunction().catch((err) => {
        errorLog("mongo to json error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_mongoToJson): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_parsingCashReceipt = function () {
  const instance = this;
  const { errorLog } = this.mother;
  const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
  const bill = new BillMaker();
  let obj;
  obj = {};
  obj.link = [ "/parsingCashReceipt" ];
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

      bill.parsingCashReceipt().catch((err) => {
        errorLog("cash receipt error : " + err.message).catch((e) => { console.log(e); });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_parsingCashReceipt): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_textToVoice = function () {
  const instance = this;
  const audio = this.audio;
  const { errorLog } = this.mother;
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
      if (!instance.fireWall(req)) {
        throw new Error("post ban");
      }
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      audio.textToVoice(req.body.text).catch((err) => {
        console.log(err);
      })
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_textToVoice): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_printText = function () {
  const instance = this;
  const audio = this.audio;
  const { errorLog, uniqueValue, fileSystem, shellExec, shellLink } = this.mother;
  let obj;
  obj = {};
  obj.link = [ "/printText" ];
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
      if (typeof req.body.text !== "string") {
        throw new Error("invalid post");
      }
      const { spawn } = require("child_process");
      const lpstat = spawn("lpstat", [ "-p" ]);
      const fontName = `/home/homeliaison/font/NanumGothicEco.ttf`;
      let printer;
      let targetFile;

      targetFile = process.cwd() + "/temp/printerTemp_" + uniqueValue("hex") + ".txt";

      lpstat.stdout.on("data", (data) => {
        const arr = String(data).split("\n").map((i) => { return i.trim(); });
        const printerRaw = arr.find((i) => { return /epson/gi.test(i); });
        printer = printerRaw.trim().split(' ')[1];
        lpstat.kill();
        fileSystem(`write`, [ targetFile, req.body.text ]).then(() => {
          return shellExec(`uniprint -printer ${printer} -size 9 -hsize 0 -L -media A4 -wrap -font ${fontName} ${shellLink(targetFile)}`);
        }).then(() => {
          return shellExec("rm", [ "-rf", targetFile ]);
        }).catch((err) => {
          console.log(err);
        });
      });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_printText): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_pageToPdf = function () {
  const instance = this;
  const chrome = this.chrome;
  const address = this.address;
  const { errorLog, fileSystem, shellExec, shellLink, uniqueValue } = this.mother;
  const { staticConst } = this;
  let obj;
  obj = {};
  obj.link = [ "/pageToPdf" ];
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
      if (typeof req.body.url !== "string") {
        throw new Error("invaild post : url must be string");
      }
      const imageName = `pagePrint_${uniqueValue("string")}.png`;
      const htmlName = imageName.replace(/\.png$/i, ".html");
      const pdfName = imageName.replace(/\.png$/i, ".pdf");
      let htmlString;

      await chrome.pageToPng(global.decodeURIComponent(req.body.url), staticConst + "/" + imageName, true);

      htmlString = `<html><head><style>*{margin:0;padding:0}</style></head><body><img src="https://${address.officeinfo.ghost.host}/${imageName}" style="width:100%"></body></html>`;
      await fileSystem(`write`, [ `${staticConst}/${htmlName}`, htmlString ]);

      await chrome.pdfPrint(`https://${address.officeinfo.ghost.host}/${htmlName}`, `${staticConst}/${pdfName}`, false);

      await shellExec(`rm`, [ `-rf`, `${staticConst}/${imageName}` ]);
      await shellExec(`rm`, [ `-rf`, `${staticConst}/${htmlName}` ]);

      res.send(JSON.stringify({
        url: global.encodeURIComponent("https://" + address.officeinfo.ghost.host + "/" + pdfName),
      }));

    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_pageToPdf): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_getUtilization = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, dateToString, errorLog } = this.mother;
  const fileTargetFolder = process.env.HOME + "/nmontong";
  const delta = 30;
  const fileKeyWords = "homeliaison_";
  const utilizationByDate = async function (standardDate, delta = 30) {
    try {
      const fileToMatrix = async function (fileName) {
        try {
          let target;
          let matrix, tempArr;
          let targetArr;
          let filteredMatrix;
      
          target = await fileSystem("readString", [ `${fileTargetFolder}/${fileName}` ])
      
          targetArr = target.split("\n");
      
          matrix = [];
          tempArr = null;
          for (let raw of targetArr) {
            if (/^ZZZZ/.test(raw)) {
              if (Array.isArray(tempArr)) {
                matrix.push(tempArr);
              }
              tempArr = [];
              tempArr.push(raw);
            } else {
              if (Array.isArray(tempArr)) {
                if (/^NET,/.test(raw)) {
                  tempArr.push(raw);
                } else if (/^CPU_ALL,/.test(raw)) {
                  tempArr.push(raw);
                }
              }
            }
          }
      
          filteredMatrix = matrix.map(([ , cpu, net ]) => {
            const cpuUsage = (100 - Number(cpu.split(",")[5])) / 100;
            const networkIn = Number(net.split(",")[3]) * 1024;
            const networkOut = Number(net.split(",")[5]) * 1024;
            return [ cpuUsage, networkIn, networkOut ];
          });
  
          return filteredMatrix;
        } catch (e) {
          console.log(e);
          return [];
        }
      }
      const dateToName = function (dateObject) {
        return fileKeyWords + dateToString(dateObject, true).slice(2, -3).replace(/\-/gi, '').replace(/\:/gi, '').replace(/ /gi, "_") + ".nmon";
      }
      let ago, copiedDate;
      let totalMatrix;
      let cpuMax, cpuAve, networkIn, networkOut;

      ago = new Date(JSON.stringify(standardDate).slice(1, -1));
      ago.setMinutes(ago.getMinutes() - delta);
  
      totalMatrix = [];
      for (let i = 0; i < delta; i++) {
        copiedDate = new Date(JSON.stringify(ago).slice(1, -1));
        copiedDate.setMinutes(copiedDate.getMinutes() + i);
        totalMatrix = totalMatrix.concat(await fileToMatrix(dateToName(copiedDate)));
      }
  
      cpuMax = totalMatrix.reduce((acc, curr) => { return acc >= curr[0] ? acc : curr[0] }, 0);
      if (totalMatrix.length === 0) {
        cpuAve = 0;
      } else {
        cpuAve = totalMatrix.reduce((acc, curr) => { return acc + curr[0] }, 0) / totalMatrix.length;
      }
      networkIn = Math.round(totalMatrix.reduce((acc, curr) => { return acc + curr[1] }, 0));
      networkOut = Math.round(totalMatrix.reduce((acc, curr) => { return acc + curr[2] }, 0));
      return {
        cpu: {
          average: cpuAve,
          maximum: cpuMax
        },
        network: {
          in: networkIn,
          out: networkOut
        },
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = [ "/getUtilization" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let standardDate;
      let result;

      standardDate = new Date();
      standardDate.setMinutes(standardDate.getMinutes() - 1);

      result = await utilizationByDate(standardDate, delta);

      res.send(JSON.stringify(result));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_getUtilization): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

StaticRouter.prototype.rou_post_removeCronNmon = function () {
  const instance = this;
  const { fileSystem, dateToString, errorLog } = this.mother;
  const targetDir = process.env.HOME + "/nmontong";
  let obj = {};
  obj.link = [ "/removeCronNmon" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const targetDirList = await fileSystem("readDir", [ targetDir ]);
      const nmonTargetKeywords = "homeliaison_";
      const yearKeywords = String((new Date()).getFullYear()).slice(0, 2);
      const now = new Date();
      const ago = new Date(JSON.stringify(now).slice(1, -1));
      const agoConst = 12;
      let removeTargets;
  
      ago.setHours(ago.getHours() - agoConst);
  
      removeTargets = targetDirList.filter((str) => { return (new RegExp("^" + nmonTargetKeywords)).test(str) }).map((str) => {
        const [ key, dateRaw, hoursRaw ] = str.split("_");
        const [ hours, exe ] = hoursRaw.split(".");
        const thisDate = new Date(
          Number(yearKeywords + dateRaw.slice(0, 2)),
          Number(dateRaw.slice(2, 4)) - 1,
          Number(dateRaw.slice(4)),
          Number(hours.slice(0, 2)),
          Number(hours.slice(2)),
          0
        );
        return { date: thisDate, fileName: str };
      }).filter(({ date, fileName }) => {
        return date.valueOf() <= ago.valueOf();
      }).map(({ fileName }) => { return targetDir + "/" + fileName });
  
      for (let str of removeTargets) {
        await fileSystem("remove", [ str ]);
      }
      
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      errorLog("Static lounge 서버 문제 생김 (rou_post_removeCronNmon): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

StaticRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(StaticRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = StaticRouter;
