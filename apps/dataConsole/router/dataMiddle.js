const MiddleCommunication = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const DataPatch = require(`${process.cwd()}/apps/dataConsole/router/dataPatch.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
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

MiddleCommunication.prototype.baseHtml = async function (target, req, selfMongo, selfLocalMongo) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { fileSystem } = this.mother;
  const invaildCode = `<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`;
  try {
    let html;
    let idArr, id, idMethod;
    let thisPerson;
    let titleString, metaTitle;
    let descriptionString, metaDescription;
    let imageString, metaImage;
    let designerOnly;
    let gtagId, gtagManagerId;

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

    if (id !== null) {
      thisPerson = await (back[idMethod])(id, { selfMongo });
    } else {
      thisPerson = null;
    }

    if (thisPerson === null || thisPerson === undefined) {
      throw new Error("invaild person");
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
    <html lang="ko" dir="ltr"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="${designerOnly}">
    <meta content="${titleString}" property="og:title">
    <meta content="${descriptionString}" property="og:description">
    <meta content="${imageString.replace(/__thisHost__/g, req.get("host"))}" property="og:image">
    <meta name="description" content="${descriptionString}">
    <title>${titleString}</title><style></style>`;

    if (/localhost/gi.test(req.get("host"))) {
      gtagId = "G-6KYB6YEQLS";
      gtagManagerId = "GTM-KWJRN5N";
    } else if (req.get("host").trim() === address.backinfo.host.trim()) {
      gtagId = "G-N81TTVHYK4";
      gtagManagerId = "GTM-W6FSR8M";
    } else {
      gtagId = "G-GGGZ2JRC2C";
      gtagManagerId = "GTM-KWJRN5N";
    }

    html += `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtagManagerId}');</script>
    <!-- End Google Tag Manager -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gtagId}"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    window.gtagId = "${gtagId}";
    window.gtag = function () { window.dataLayer.push(arguments); }
    window.gtag("js", new Date());
    window.gtag("config", "${gtagId}");
    window.gtagPage = function () {
      window.gtag("config", "${gtagId}");
    }
    </script>`;

    html += `</head><body><div style="display: none;position: absolute;opacity: 0;font-size: 0px;">${descriptionString}</div><div id="totalcontents"></div><script src="/middle/${name}.js"></script>`;

    if (meta.module) {
      html += `<script type="module" src="/middle/${name}.mjs"></script>`;
    }

    html += `</body></html>`;

    return html;

  } catch (e) {
    console.log(target);
    console.log(e.message);
    return invaildCode;
  }
}

const DataMiddle = new MiddleCommunication();
module.exports = DataMiddle;
