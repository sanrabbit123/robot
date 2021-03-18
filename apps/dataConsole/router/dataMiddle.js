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
}

MiddleCommunication.prototype.setMetadata = function (property, value) {
  this.meta[property] = value;
}

MiddleCommunication.prototype.baseHtml = async function (target, fontStyle = '', req) {
  const instance = this;
  const back = this.back;
  const { fileSystem } = this.mother;
  try {
    let html;
    let idArr, id, idMethod;
    let thisPerson;
    let titleString, metaTitle;
    let descriptionString, metaDescription;
    let imageString, metaImage;

    if (!/\.js$/.test(target)) {
      target = target + ".js";
    }
    const meta = this.meta[target.replace(/\.js/gi, '')];

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
    }

    thisPerson = await (back[idMethod])(id);
    if (thisPerson === null) {
      throw new Error("There is no data, insert vaild id");
    }

    //set meta data
    metaTitle = new Function(...meta.title);
    metaDescription = new Function(...meta.description);
    metaImage = new Function(...meta.image);

    titleString = metaTitle(thisPerson);
    descriptionString = metaDescription(thisPerson);
    imageString = metaImage(thisPerson);

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
        <meta content="${titleString}" property="og:title">
        <meta content="${descriptionString}" property="og:description">
        <meta content="${imageString.replace(/__thisHost__/g, req.get("host"))}" property="og:image">
        <meta name="description" content="${descriptionString}">
        <title>${titleString}</title>
        <style>${fontStyle}</style>
      </head>
      <body>
        <div style="display: none;position: absolute;opacity: 0;font-size: 0px;">${descriptionString}</div>
        <div id="totalcontents"></div>
        <script src="/middle/${target}"></script>
      </body>
    </html>`;

    return html;

  } catch (e) {
    console.log(target);
    return `<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`;
  }
}

const DataMiddle = new MiddleCommunication();
module.exports = DataMiddle;
