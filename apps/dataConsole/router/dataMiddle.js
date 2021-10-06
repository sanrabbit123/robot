const MiddleCommunication = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = `${process.cwd()}/apps/dataConsole/router`;
  this.sourceDir = `${this.dir}/source/middle`;
  this.generalJs = `${process.env.HOME}/static/general.js`;
  this.patchClass = DataPatch;
  this.meta = {};
  this.name = {};
}

MiddleCommunication.prototype.setMetadata = function (property, value) {
  this.meta[property] = value;
}

MiddleCommunication.prototype.setNamedata = function (property, value) {
  this.name[property] = value;
}

MiddleCommunication.prototype.middleBinary = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileList, binaryRequest } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const S3HOST = ADDRESS["s3info"]["host"];
  const binaryPathConst = "middle";
  const staticFolder = process.env.HOME + "/static";
  try {
    const middleBinaries = await s3FileList(binaryPathConst);
    const staticDir = await fileSystem(`readDir`, [ staticFolder ]);
    let staticMiddleDir;
    let tempArr, refined, targets;
    let binaryTarget;
    let tempObject;
    let resultFromArr;

    //set middle targets
    refined = [];
    for (let i of middleBinaries) {
      tempArr = i.split('/');
      if (tempArr.length > 3) {
        refined.push(tempArr[2]);
      }
    }
    targets = Array.from(new Set(refined));

    //static setting and download binary
    if (!staticDir.includes("middle")) {
      shell.exec(`mkdir ${shellLink(staticFolder)}/middle`);
    }
    staticMiddleDir = await fileSystem(`readDir`, [ staticFolder + "/middle" ]);
    resultFromArr = [];
    for (let i of targets) {
      binaryTarget = [];
      if (!staticMiddleDir.includes(i)) {
        shell.exec(`mkdir ${shellLink(staticFolder + "/middle/" + i)}`);
      }
      for (let b of middleBinaries) {
        tempArr = b.split('/');
        if (tempArr.length > 3) {
          if (tempArr[2] === i && tempArr[3] !== '') {
            binaryTarget.push(tempArr.join('/'));
          }
        }
      }
      console.log(`\x1b[33m%s\x1b[0m`, `binary target :`, binaryTarget);
      for (let b of binaryTarget) {
        tempObject = await binaryRequest(S3HOST + "/" + b);
        await fileSystem(`writeBinary`, [ staticFolder + "/middle/" + i + "/" + (b.split('/'))[b.split('/').length - 1], tempObject ]);
        resultFromArr.push(staticFolder + "/middle/" + i + "/" + (b.split('/'))[b.split('/').length - 1]);
        console.log(`binary "${b}" download done`);
      }
    }

    return resultFromArr;

  } catch (e) {
    console.log(e);
  }
}

MiddleCommunication.prototype.baseHtml = async function (target, req, selfMongo, selfLocalMongo) {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    const invaildCode = `<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`;
    let html;
    let idArr, id, idMethod;
    let thisPerson;
    let titleString, metaTitle;
    let descriptionString, metaDescription;
    let imageString, metaImage;
    let designerOnly;

    const name = this.name[target.trim().replace(/\.js/gi, '')];
    const meta = this.meta[target.trim().replace(/\.js/gi, '')];

    idArr = back.getMap("id", "array");
    id = null, idMethod = null, thisPerson = null;
    for (let { standard, method } of idArr) {
      if (req.query[standard] !== undefined) {
        id = req.query[standard];
        idMethod = method;
        break;
      } else {
        id = null;
        idMethod = null;
      }
    }

    if (id === null) {
      throw new Error("There is no id, query must include id");
      return invaildCode;
    }

    thisPerson = await (back[idMethod])(id, { selfMongo });
    if (thisPerson === null) {
      throw new Error("There is no data, insert vaild id");
      return invaildCode;
    }

    //set meta data
    metaTitle = new Function(...meta.title);
    metaDescription = new Function(...meta.description);
    metaImage = new Function(...meta.image);

    titleString = metaTitle(thisPerson);
    descriptionString = metaDescription(thisPerson);
    imageString = metaImage(thisPerson);

    if (/디자이너님/gi.test(titleString)) {
      designerOnly = "width=device-width,initial-scale=1,shrink-to-fit=no";
    } else {
      designerOnly = "width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no";
    }

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="${designerOnly}">
        <meta content="${titleString}" property="og:title">
        <meta content="${descriptionString}" property="og:description">
        <meta content="${imageString.replace(/__thisHost__/g, req.get("host"))}" property="og:image">
        <meta name="description" content="${descriptionString}">
        <title>${titleString}</title>
        <style></style>
      </head>
      <body>
        <div style="display: none;position: absolute;opacity: 0;font-size: 0px;">${descriptionString}</div>
        <div id="totalcontents"></div>
        <script src="/middle/${name}.js"></script>`

    if (meta.module) {
      html += `<script type="module" src="/middle/${name}.mjs"></script>`;
    }

    html += `</body></html>`;

    return html;

  } catch (e) {
    console.log(target);
    console.log(e.message);
    return `<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`;
  }
}

const DataMiddle = new MiddleCommunication();
module.exports = DataMiddle;
