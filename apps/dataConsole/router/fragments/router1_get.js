//GENERAL METHODS ---------------------------------------------------------------------------------

DataRouter.prototype.baseMaker = function (target, mode = "first", req = null) {
  const instance = this;
  const ADDRESS = this.address;
  const DataPatch = this.patchClass;
  const DataMiddle = this.middle;
  let html, fontStyle;

  fontStyle = `
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
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Light.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Light.woff') format('woff');
      font-weight: 200;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-LightItalic.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-LightItalic.woff') format('woff');
      font-weight: 200;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Regular.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Regular.woff') format('woff');
      font-weight: 300;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-RegularItalic.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-RegularItalic.woff') format('woff');
      font-weight: 300;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Medium.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Medium.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-MediumItalic.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-MediumItalic.woff') format('woff');
      font-weight: 400;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Semibold.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Semibold.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-SemiboldItalic.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-SemiboldItalic.woff') format('woff');
      font-weight: 500;
      font-style: italic;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Bold.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-Bold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }
  @font-face {
      font-family: 'graphik';
      src: url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-BoldItalic.woff2') format('woff2'),
          url('${ADDRESS.s3info.host}/designSource/font/graphik/Graphik-BoldItalic.woff') format('woff');
      font-weight: 600;
      font-style: italic;
  }`;

  if (mode === "first") {

    html = `<!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
        <title>HomeLiaison Console: ${target}</title>
        <style>${fontStyle}</style>
      </head>
      <body>
        <div id="totalcontents"></div>
        <script src="${target}.js"></script>
      </body>
    </html>`;

    return new Promise(function(resolve, reject) {
      resolve(html);
    });


  } else if (mode === "middle") {

    return new Promise(function(resolve, reject) {
      if (DataMiddle !== null) {
        DataMiddle.baseHtml(target, fontStyle, req).then(function (html) {
          resolve(html);
        }).catch(function (e) {
          reject(e);
        });
      } else {
        resolve(`<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`);
      }
    });

  }
}

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
      res.redirect("/client");
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Binary = function () {
  const instance = this;
  const brandProjectConstant = "brandProject";
  let obj = {};
  obj.link = "/" + brandProjectConstant + "/:id";
  obj.func = async function (req, res) {
    try {
      let html, mainPdfName, sourceName;

      mainPdfName = "index";
      sourceName = `${instance.address.s3info.host}/${brandProjectConstant}/${req.params.id}/${mainPdfName}.pdf`;
      const { statusCode } = await instance.mother.headRequest(sourceName);

      if (statusCode === 200) {
        html = `<!DOCTYPE html><html lang="ko" dir="ltr"><head><meta charset="utf-8"><title></title><style media="screen">*{margin:0;padding:0}</style></head><body><embed id="this" src="${sourceName}"/><script type="text/javascript">let e = document.getElementById("this");let ea = "px";e.setAttribute("width", (String(window.innerWidth) + ea));e.setAttribute("height", (String(window.innerHeight) + ea));window.addEventListener("resize", (e) => { window.location.reload(); })</script></body></html>`;
        res.set("Content-Type", "text/html");
        res.send(html);
      } else {
        res.redirect("/client");
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  let obj = {};
  let ipTong;
  ipTong = [ 127001, 172301254 ];
  for (let info in instance.address) {
    if (instance.address[info].ip.outer.length > 0) {
      ipTong.push(Number(instance.address[info].ip.outer.replace(/[^0-9]/g, '')));
    }
    if (instance.address[info].ip.inner.length > 0) {
      ipTong.push(Number(instance.address[info].ip.inner.replace(/[^0-9]/g, '')));
    }
  }
  ipTong = Array.from(new Set(ipTong));
  obj.link = "/:id";
  obj.func = function (req, res) {
    try {
      let target;

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (!ipTong.includes(Number(ip.trim().replace(/[^0-9]/g, '')))) {

        res.set("Content-Type", "text/html");
        res.send(`<html><head><title>알 수 없는 ip</title></head><body><script>
          alert("알 수 없는 아이피 주소 입니다. 관리자에게 문의해주세요!\\n접근 아이피 주소 : ${ip.trim()}");
          window.location.href = "https://home-liaison.com";</script></body></html>`);

      } else {

        if (instance.isGhost) {

          res.set("Content-Type", "text/html");
          res.send(`<html><head><title>Permission denied</title></head><body><script>
            alert("접근할 수 없는 경로입니다!");
            window.location.href = "https://home-liaison.com";</script></body></html>`);

        } else {

          if (/^cl/i.test(req.params.id)) {
            target = "client";
          } else if (/^de/i.test(req.params.id)) {
            target = "designer";
          } else if (/^ser/i.test(req.params.id)) {
            target = "service";
          } else if (/^proj/i.test(req.params.id)) {
            target = "project";
          } else if (/^prop/i.test(req.params.id)) {
            target = "proposal";
          } else if (/^ana/i.test(req.params.id)) {
            target = "analytics";
          } else if (/^con/i.test(req.params.id)) {
            target = "contents";
          } else if (/^pho/i.test(req.params.id)) {
            target = "photo";
          } else {
            target = "client";
          }

          instance.baseMaker(target, "first", null).then(function (html) {
            res.set("Content-Type", "text/html");
            res.send(html);
          }).catch(function (err) {
            throw new Error(err);
          });

        }
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_Middle = function () {
  const instance = this;
  let obj = {};
  obj.link = "/middle/:id";
  obj.func = function (req, res) {
    try {
      instance.baseMaker(req.params.id, "middle", req).then(function (html) {
        res.set("Content-Type", "text/html");
        res.send(html);
      }).catch(function (err) {
        throw new Error(err);
      });
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_ServerSent = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  let obj = {};
  obj.link = [ "/sse/get_client", "/sse/get_designer", "/sse/get_project", "/sse/get_contents", "/sse/get_photo" ];
  obj.func = async function (req, res) {
    try {
      const thisPath = req.url.split('_')[1];
      const sseStream = new SseStream(req);
      let log_past, log_new;

      res.set({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new = await fileSystem(`readString`, [ instance.dir + "/log/" + thisPath + "_latest.json" ]);
          if (log_new !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new });
          }
          log_past = log_new;
        } catch (e) {
          console.log(e);
        }
      }, 1200);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_SpecificServerSent = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const SseStream = require(`${this.module}/sseStream.js`);
  let obj = {};
  obj.link = [ "/specificsse/get_checklist/:id" ];
  obj.func = async function (req, res) {
    try {
      const thisPath = req.url.split('/')[2].split('_')[1];
      const thisId = req.params.id;
      const sseStream = new SseStream(req);
      const logDir = instance.dir + "/log";
      let log_past, log_new;

      res.set({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });

      log_dir = await fileSystem(`readDir`, [ logDir ]);
      if (!log_dir.includes("designerMatrix_" + thisId + "_latest.json")) {
        await fileSystem(`write`, [ logDir + "/designerMatrix_" + thisId + "_latest.json", JSON.stringify({ desid: thisId, column: "", type: "", order: [] }) ]);
      }

      sseStream.pipe(res);

      const pusher = setInterval(async function () {
        try {
          log_new = await fileSystem(`readString`, [ logDir + "/designerMatrix_" + thisId + "_latest.json" ]);
          if (log_new !== log_past) {
            sseStream.write({ event: 'updateTong', data: log_new });
          }
          log_past = log_new;
        } catch (e) {
          console.log(e);
        }
      }, 1200);

      res.on('close', function () {
        clearInterval(pusher);
        sseStream.unpipe(res);
      });

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
