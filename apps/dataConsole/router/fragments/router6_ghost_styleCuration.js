DataRouter.prototype.rou_post_styleCuration_getPhotos = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_getPhotos";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const contentsArr = await back.getContentsArrByQuery({}, { selfMongo });
      const designers = await back.getDesignersByQuery({}, { selfMongo });
      const exceptionList = [
        "t16a41.jpg",
        "t1p36.jpg",
        "t1a33.jpg",
        "t1a20.jpg",
        "t2a33.jpg",
        "t5a27.jpg",
        "t8p9.jpg",
        "t13a27.jpg",
        "t19a41.jpg",
        "t1p12.jpg",
        "t9a37.jpg"
      ];

      let photos, sendingDesigners, temp;

      photos = contentsArr.getAllPhotos();
      sendingDesigners = [];
      for (let designer of designers) {
        temp = designer.toNormal();
        temp.tendency = designer.analytics.styling.tendency.toMatrix();
        sendingDesigners.push(temp);
      }
      for (let obj of photos) {
        for (let designer of designers) {
          if (obj.desid === designer.desid) {
            obj.tendency = designer.analytics.styling.tendency.toMatrix();
            break;
          }
        }
      }
      photos = photos.filter((obj) => { return !/before/gi.test(obj.room) && !/withdesigner/gi.test(obj.room) && !exceptionList.includes(obj.file) });
      photos = photos.map((obj) => {
        obj.keywords = obj.keywords.filter((s) => { return !/아파트/gi.test(s) && !/거주중/gi.test(s) && !/아기/gi.test(s) && !/아이/gi.test(s) && !/부부/gi.test(s) && !/가족/gi.test(s) && !/소품/gi.test(s) && !/거실/gi.test(s) && !/주방/gi.test(s) && !/신축/gi.test(s) && !/서재/gi.test(s) && !/톤앤/gi.test(s) && !/스타일링/gi.test(s) && !/조명/gi.test(s) && !/오피스텔/gi.test(s) && !/홈스타일링/gi.test(s) && !/홈퍼니싱/gi.test(s) && !/토탈/gi.test(s) && !/인테리어/gi.test(s) && !/인가구/gi.test(s) && !/다이닝/gi.test(s) && !/깔끔/gi.test(s) && !/인스타/gi.test(s) && !/아이/gi.test(s); });
        return obj;
      });
      photos = photos.filter((obj) => { return !obj.tendency.every((num) => { return num === 0; }); });

      res.send(JSON.stringify({ photos, contentsArr, designers: sendingDesigners }));
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_getPhotos): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_updateCalculation = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const address = this.address;
  const { equalJson, requestSystem, messageSend, serviceParsing } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_updateCalculation";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.historyQuery === undefined || req.body.coreQuery === undefined || req.body.mode === undefined) {
        throw new Error("invaild post");
      }
      const passPromise = () => { return new Promise((resolve, reject) => { resolve(null); }); }
      const cliid = req.body.cliid;
      const historyQuery = equalJson(req.body.historyQuery);
      const coreQuery = equalJson(req.body.coreQuery);
      const mode = req.body.mode;
      let client, history;

      if (DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = null;
      }

      if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
      }

      history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
      }

      if (Object.keys(coreQuery).length > 0) {
        await back.updateClient([ { cliid }, coreQuery ], { selfMongo: instance.mongo });
      }

      if (Object.keys(historyQuery).length > 0) {
        await back.updateHistory("client", [ { cliid }, historyQuery ], { selfMongo: instance.mongolocal });
        history = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }

      const clientCase = await back.getCaseProidById(cliid, { selfMongo: instance.mongo });
      if (clientCase === null) {
        throw new Error("invaild client case");
      } else {
        const service = clientCase.caseService();
        let detailUpdate, updateQuery;
        let newProid;
        let requestNumber;
        let action;
        let targetSerid;

        client = clientCase.client;
        requestNumber = 0;
        if ([ "부재중 알림 발송", "상세 설문 대기" ].includes(client.requests[requestNumber].analytics.response.action.value)) {
          action = "부재중 제안 발송";
        } else {
          action = "제안 발송 예정";
        }

        detailUpdate = [];
        updateQuery = {};
        newProid = null;

        targetSerid = (req.body.fromConsole !== undefined && Number(req.body.fromConsole) === 1) ? [ client.requests[requestNumber].analytics.response.service.serid ] : history.curation.service.serid;

        work.designerCuration(cliid, 4, targetSerid, { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal }).then((detail) => {
          for (let obj of detail) {
            detailUpdate.push(obj.toNormal());
          }
          if (client.phone === "010-2747-3403") {
            detailUpdate = [];
          }

          updateQuery["desid"] = "";
          updateQuery["proposal.status"] = "작성중";
          updateQuery["proposal.date"] = new Date();
          updateQuery["cliid"] = cliid;
          updateQuery["service.serid"] = targetSerid[0];
          if (service === null) {
            updateQuery["service.xValue"] = "B";
          } else {
            if (typeof service === "object") {
              if (Array.isArray(service.xValue)) {
                updateQuery["service.xValue"] = (service.xValue.length === 0 ? "B" : service.xValue[0].xValue);
              } else {
                updateQuery["service.xValue"] = "B";
              }
            } else {
              updateQuery["service.xValue"] = "B";
            }
          }
          updateQuery["service.online"] = false;
          updateQuery["proposal.detail"] = detailUpdate;
          return back.getProjectsByQuery({ cliid }, { selfMongo: instance.mongo });

        }).then((rows) => {

          if (detailUpdate.length > 0) {
            if (rows.length > 0 && rows[0].desid === "") {
              newProid = rows[0].proid;
              return back.updateProject([ { proid: newProid }, updateQuery ], { selfMongo: instance.mongo });
            } else {
              return back.createProject(updateQuery, { selfMongo: instance.mongo });
            }
          } else {
            return passPromise();
          }

        }).then((proid) => {

          // if (detailUpdate.length > 0) {
            if (newProid === null) {
              newProid = proid;
            }
            return requestSystem("https://" + address.backinfo.host + ":3000/updateLog", {
              id: cliid,
              column: "action",
              position: "requests." + String(requestNumber) + ".analytics.response.action",
              pastValue: client.requests[requestNumber].analytics.response.action.value,
              finalValue: action
            }, { headers: { "origin": "https://" + address.backinfo.host, "Content-Type": "application/json" } });
          // } else {
          //   return passPromise();
          // }

        }).then(() => {

          // if (detailUpdate.length > 0) {
            return requestSystem("https://" + address.backinfo.host + ":3000/generalMongo", {
              mode: "sse",
              db: "console",
              collection: "sse_clientCard",
              log: true,
              who: "autoBot",
              updateQuery: {
                cliid,
                requestNumber,
                mode: "action",
                from: client.requests[requestNumber].analytics.response.action.value,
                to: action,
                randomToken: Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 1000000))),
              }
            }, { headers: { "origin": "https://" + address.backinfo.host, "Content-Type": "application/json" } });
          // } else {
          //   return passPromise();
          // }

        }).then(() => {

          if (Number(req.body.fromConsole) !== 1) {
            let updateObj, future, nextDate, nextNextDate;
            updateObj = {};
            updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
            nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 1);
            nextNextDate = new Date();
            nextNextDate.setDate(nextNextDate.getDate() + 2);
            if (client.requests[requestNumber].request.space.resident.living || client.requests[requestNumber].request.space.resident.expected.valueOf() <= nextNextDate.valueOf()) {
              updateObj["requests." + String(requestNumber) + ".request.space.resident.expected"] = nextDate;
              future = new Date();
              future.setDate(future.getDate() + serviceParsing({
                serid: updateQuery["service.serid"],
                xValue: updateQuery["service.xValue"],
                online: updateQuery["service.online"],
              }, true) + 1);
              updateObj["requests." + String(requestNumber) + ".analytics.date.space.movein"] = future;
            }

            return back.updateClient([ { cliid }, updateObj ], { selfMongo: instance.mongo });
          } else {
            return passPromise();
          }

        }).then(() => {

          if (detailUpdate.length > 0) {
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서가 자동으로 제작되었습니다!", channel: "#404_curation", voice: true });
          } else {
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서를 자동으로 제작하려 했으나 매칭되는 경우가 없어요!", channel: "#404_curation", voice: true });
          }

        }).catch((err) => {
          console.log(err);
          messageSend({ text: client.name + " 제안서 제작 문제 생김 " + err.message, channel: "#404_curation" }).catch((e) => { console.log(e) });
        });

        if (Number(req.body.fromConsole) !== 1) {
          await instance.kakao.sendTalk("curationComplete", client.name, client.phone, {
            client: client.name,
          });
          await messageSend({ text: client.name + " 고객님께 큐레이션 완료 알림톡을 보냈어요.", channel: "#404_curation" });
          requestSystem("https://" + instance.address.secondinfo.host + ":" + String(3000) + "/printClient", { cliid, requestNumber: 0, history }, { headers: { "Content-Type": "application/json" } }).then(() => {
            return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } });
          }).catch((err) => { logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_updateCalculation) : " + err.message).catch((err) => { console.log(err) }) });
        }

        res.send(JSON.stringify({ service: [], client: client.toNormal(), history }));

      }
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_updateCalculation) : " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_styleCheckComplete = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_styleCheckComplete";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.image === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, image } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기를 완료하였어요.";
      channel = "#404_curation";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      // if (DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] !== null) {
      //   clearTimeout(DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid]);
      //   DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = null;
      // }
      // DataRouter.timeouts["styleCuration_styleCheckComplete_" + cliid] = setTimeout(async () => {
      //   await requestSystem("https://" + instance.address.backinfo.host + "/styleCuration_updateCalculation", { cliid, coreQuery: {}, historyQuery: {}, mode: "" }, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "origin": instance.address.backinfo.host,
      //     }
      //   })
      // }, 30 * 60 * 1000);

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleCheckComplete) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_pageInitComplete = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { equalJson, requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_pageInitComplete";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, phone } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기 페이지에 진입하셨어요.";
      channel = "#error_log";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      if (DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== undefined && DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] !== null) {
        clearTimeout(DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid]);
        DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = null;
      }
      DataRouter.timeouts["styleCuration_pageInitComplete_" + cliid] = setTimeout(async () => {
        try {
          const client = await back.getClientById(cliid, { selfMongo: instance.mongo });
          if (client.requests[0].analytics.response.status.value === "응대중") {
            await kakao.sendTalk("pushClient", client.name, client.phone, {
              client: client.name,
              host: address.frontinfo.host,
              path: "curation",
              cliid: cliid,
            });
            await messageSend({ text: client.name + " 고객님께 신청 완료해달라고 부탁했어요.", channel: "#404_curation", voice: true });
          }
        } catch (e) {
          await logger.error("독촉하는 과정중 오류남 : " + e.message);
        }
      }, 20 * 60 * 1000);

      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleCheckComplete) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_styleCuration_styleChecking = function () {
  const instance = this;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_styleChecking";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.cliid === undefined || req.body.name === undefined || req.body.phone === undefined || req.body.photos === undefined) {
        throw new Error("invaild post");
      }
      const { cliid, name, phone, photos } = equalJson(req.body);
      let text, channel;

      text = name + " 고객님이 스타일 찾기 사진 체크를 함 => "  + String(photos.length);
      channel = "#error_log";

      messageSend({ text, channel, voice: false }).catch((e) => {
        console.log(e);
      });

      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_styleChecking) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}
