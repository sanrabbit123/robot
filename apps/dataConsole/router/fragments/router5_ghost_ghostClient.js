DataRouter.prototype.rou_post_ghostClient_updateAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  let obj = {};
  obj.link = [ "/ghostClient_updateAnalytics" ];
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined || req.body.cliid === undefined || req.body.page === undefined) {
        throw new Error("invaild post");
      }
      const { mode, cliid, page } = req.body;
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let whereQuery, updateQuery;
      let history;
      let update;
      let image;
      let ipObj;

      whereQuery = { cliid };
      history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      if (mode === "page") {

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }

        history.curation.analytics.page.push({ page, date: new Date(), referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
        updateQuery = {};
        updateQuery["curation.analytics.page"] = history.curation.analytics.page;
        if (req.body.liteMode === "false") {
          updateQuery["curation.analytics.full"] = true;
        }

        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "update") {

        update = equalJson(req.body.update);
        history.curation.analytics.update.push({ page, date: new Date(), update });
        updateQuery = {};
        updateQuery["curation.analytics.update"] = history.curation.analytics.update;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

        if (req.body.updateQuery !== undefined) {
          const { history: historyQuery, core: coreQuery } = equalJson(req.body.updateQuery);
          if (historyQuery !== null && typeof historyQuery === "object" && Object.keys(historyQuery).length > 0) {
            await back.updateHistory("client", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });
          }
          if (coreQuery !== null && typeof coreQuery === "object" && Object.keys(coreQuery).length > 0) {
            await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
          }
        }

      } else if (mode === "submit") {

        history.curation.analytics.submit.push({ page, date: new Date() });
        updateQuery = {};
        updateQuery["curation.analytics.submit"] = history.curation.analytics.submit;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "image") {

        image = equalJson(req.body.image);
        updateQuery = {};
        updateQuery["curation.image"] = image;
        await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else {
        throw new Error("invaild mode");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e.message, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
