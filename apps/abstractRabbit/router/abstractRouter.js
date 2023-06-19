const AbstractRouter = function (MONGOC, localTargets, staticDir) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.mongo = MONGOC;
  this.formidable = require("formidable");
  this.dir = process.cwd() + "/apps/abstractRabbit";
  this.sourceDir = this.dir + "/router/source";
  this.localDir = this.sourceDir + "/local";
  this.staticDir = staticDir;
  this.metaLimit = 100;
  this.host = "abstract-rabbit.com";
  this.localTargets = localTargets;
}

AbstractRouter.prototype.baseMaker = async function (metaObject) {
  const errorHtml = `<!DOCTYPE html><html><head><title>Permission denied</title></head><body>error<script>alert("잘못된 접근입니다!");window.location.href = "https://home-liaison.com";</script></body></html>`;
  try {
    let html;

    // head
    html = '<!DOCTYPE html>' + "\n";
    html += '<html lang="ko" dir="ltr"><head>' + "\n";
    html += '<meta charset="utf-8">' + "\n";
    html += '<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">' + "\n";
    html += '<link rel="canonical" href="' + metaObject.link + '">' + "\n";
    html += '<meta content="' + metaObject.link + '" property="og:url"><meta content="website" property="og:type">' + "\n";
    // html += '<meta name="google-site-verification" content="'.$googleSearchId.'">' + "\n";
    // html += '<meta name="naver-site-verification" content="'.$naverSearchId.'">' + "\n";
    html += '<meta name="twitter:card" content="summary_large_image">' + "\n";
    // html += '<meta content="'.$facebookId.'" property="fb:app_id">' + "\n";
    html += '<meta name="robots" content="index,follow">' + "\n";
    html += '<meta content="' + metaObject.title + '" property="og:title">' + "\n";
    html += '<meta content="' + metaObject.description + '" property="og:description">' + "\n";
    html += '<meta content="' + metaObject.image + '" property="og:image">' + "\n";
    html += '<meta name="description" content="' + metaObject.description + '">' + "\n";
    html += '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-20190722112100.png"><meta name="msapplication-TileImage" content="/mstile-144x144-20190722112100.png">' + "\n";
    html += '<link rel="manifest" href="/manifest.json">' + "\n";
    html += '<meta name="keywords" content="포스터, 편집디자인, 스튜디오">' + "\n";
    html += '<title>' + metaObject.title + '</title><style></style>' + "\n";

    // session and client info
    // html += '<script>' + "\n";
    // html += 'window.homeliaisonSessionId = "'.$sessionId.'";' + "\n";
    // html += 'window.homeliaisonClientInfo = '.$clientInfo.';' + "\n";
    // html += 'if (typeof window.homeliaisonClientInfo === "object" && window.homeliaisonClientInfo !== null) { window.homeliaisonClientInfo["pageTitle"] = "'.$titleString.'"; }' + "\n";
    // html += '</script>' + "\n";

    // google
    // html += '<script async src="https://www.googletagmanager.com/gtag/js?id='.$gtagId.'"></script>' + "\n";
    // html += '<script>' + "\n";
    // html += 'window.dataLayer = window.dataLayer || [];' + "\n";
    // html += 'window.gtagId = "'.$gtagId.'";' + "\n";
    // html += 'window.gtag = function () { window.dataLayer.push(arguments); }' + "\n";
    // html += 'window.gtag("js", new Date());' + "\n";
    // html += 'window.gtag("config", "'.$gtagId.'");' + "\n";
    // html += 'window.gtagPage = function () {' + "\n";
    // html += '  window.gtag("config", "'.$gtagId.'");' + "\n";
    // html += '}' + "\n";
    // html += '</script>' + "\n";

    // facebook
    // html += '<!-- Meta Pixel Code -->' + "\n";
    // html += '<script>' + "\n";
    // html += '!function(f,b,e,v,n,t,s)' + "\n";
    // html += '{if(f.fbq)return;n=f.fbq=function(){n.callMethod?' + "\n";
    // html += 'n.callMethod.apply(n,arguments):n.queue.push(arguments)};' + "\n";
    // html += 'if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";' + "\n";
    // html += 'n.queue=[];t=b.createElement(e);t.async=!0;' + "\n";
    // html += 't.src=v;s=b.getElementsByTagName(e)[0];' + "\n";
    // html += 's.parentNode.insertBefore(t,s)}(window, document,"script","https://connect.facebook.net/en_US/fbevents.js");' + "\n";
    // html += 'fbq("init", "'.$facebookId.'");' + "\n";
    // html += 'fbq("track", "PageView");' + "\n";
    // html += '</script>' + "\n";
    // html += '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='.$facebookId.'&ev=PageView&noscript=1" /></noscript>' + "\n";
    // html += '<!-- End Meta Pixel Code -->' + "\n";

    // body
    html += '</head><body>' + "\n";
    html += '<div style="display: none;position: absolute;opacity: 0;font-size: 0px;">' + metaObject.hidden + '</div>' + "\n";
    html += '<div id="totalcontents"></div>' + "\n";
    html += '<script src="/' + metaObject.name + '.js"></script>' + "\n";

    // body end
    html += '</body></html>';

    return html;
  } catch (e) {
    console.log(e);
    return errorHtml;
  }
}

//GET ---------------------------------------------------------------------------------------------

AbstractRouter.prototype.rou_get_pathLaunching = function () {
  const instance = this;
  const { equalJson, fileSystem } = this.mother;
  const { localDir, metaLimit, localTargets, staticDir } = this;
  let obj = {};
  obj.link = "/:id";
  obj.func = async function (req, res, logger) {
    try {
      const { id } = req.params;
      if (localTargets.includes(id + ".js")) {
        const targetJs = localDir + "/" + id + ".js";
        const targetJsString = await fileSystem(`readHead`, [ targetJs, metaLimit ]);
        const metaFunctionString = targetJsString.slice([ ...targetJsString.matchAll(/\/<%metaStart%>\/\;/g) ][0].index + String("/<%metaStart%>/;").length, [ ...targetJsString.matchAll(/\/<%metaEnd%>\/\;/g) ][0].index).trim().replace(/^\;/, '').replace(/\;$/, '').trim();
        const metaFunction = new Function("req", "mongo", "host", metaFunctionString.replace(/\}$/, '').replace(/async function metaFunction \(req, mongo, host\) \{/gi, '').trim());
        const metaObject = metaFunction(req, instance.mongo, instance.host);        
        const html = await instance.baseMaker(metaObject);
        res.set({
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
        });
        res.send(html);
      } else {
        try {
          const stream = await fileSystem("readStream", [ staticDir + "/" + id ]);
          stream.pipe(res);
        } catch (e) {
          res.set({ "Content-Type": "text/plain" });
          res.send("");    
        }
      }
    } catch (e) {
      logger.error("Abstract rabbit 서버 문제 생김 (rou_get_pathLaunching): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ error: e.message }));
    }
  }

  return obj;
}

//POST ---------------------------------------------------------------------------------------------

AbstractRouter.prototype.rou_post_middlePhotoRemove = function () {
  const instance = this;
  const { equalJson } = this.mother;
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
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      logger.error("Abstract rabbit 서버 문제 생김 (rou_post_middlePhotoRemove): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

AbstractRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
  result_arr = Object.keys(AbstractRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = AbstractRouter;
