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
  const { equalJson, requestSystem, messageSend, serviceParsing, sleep } = this.mother;
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
                if (client.requests[requestNumber].analytics.response.service !== null && typeof client.requests[requestNumber].analytics.response.service.xValue === "string") {
                  updateQuery["service.xValue"] = client.requests[requestNumber].analytics.response.service.xValue;
                }
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
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서가 자동으로 제작되었습니다!", channel: "#404_curation", voice: false });
          } else {
            return messageSend({ text: client.name + " 고객님의 디자이너 추천서를 자동으로 제작하려 했으나 매칭되는 경우가 없어요!", channel: "#404_curation", voice: false });
          }

        }).catch((err) => {
          console.log(err);
          messageSend({ text: client.name + " 제안서 제작 문제 생김 " + err.message, channel: "#404_curation" }).catch((e) => { console.log(e) });
        });

        if (Number(req.body.fromConsole) !== 1) {
          
          await instance.kakao.sendTalk("curationComplete", client.name, client.phone, {
            client: client.name,
            cliid: client.cliid,
            host: instance.address.frontinfo.host,
            path: "about",
          });
          if (client.phone !== "010-2747-3403") {
            await messageSend({ text: client.name + " 고객님께 큐레이션 완료 알림톡을 보냈어요.", channel: "#404_curation" });
            requestSystem("https://" + instance.address.secondinfo.host + ":" + String(3000) + "/printClient", { cliid, requestNumber: 0, history }, { headers: { "Content-Type": "application/json" } }).then(() => {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/storeClientAnalytics", { fast: true }, { headers: { "Content-Type": "application/json" } });
            }).then(() => {
              return sleep(30 * 1000);
            }).then(() => {
              return requestSystem("https://" + instance.address.officeinfo.ghost.host + ":" + String(3000) + "/analyticsToday", { report: 0 }, { headers: { "Content-Type": "application/json" } });
            }).catch((err) => { logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_updateCalculation) : " + err.message).catch((err) => { console.log(err) }) });
          }
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
          if (client.requests[0].analytics.response.status.value === "응대중" && client.requests[0].analytics.response.action.value === "1차 응대 예정") {
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
      }, 30 * 60 * 1000);

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

DataRouter.prototype.rou_post_styleCuration_getTotalMenu = function () {
  const instance = this;
  const { equalJson, messageSend } = this.mother;
  let obj = {};
  obj.link = "/styleCuration_getTotalMenu";
  obj.func = async function (req, res, logger) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let totalMenu;

      totalMenu = [
        {
          question: "생각하는 서비스 유형을 선택해 주세요!",
          values: [
            {
              title: "홈퍼니싱",
              english: "Homefurnishing",
              description: [
                "시공 없이 스타일링만!",
                "가구 소품 패브릭 조명으로 진행",
              ],
              source: "/service_f.svg",
              plus: false,
              margin: false,
              value: "s2011_aa01s",
            },
            {
              title: "홈스타일링",
              english: "Homestyling",
              description: [
                "부분 시공 (제작 가구 포함)",
                "스타일링 (가구 소품 패브릭)",
              ],
              source: "/service_s.svg",
              plus: true,
              margin: true,
              value: "s2011_aa02s",
            },
            {
              title: "토탈 스타일링",
              english: "Totalstyling",
              description: [
                "전체 시공 (주방, 화장실 포함)",
                "스타일링 (가구 소품 패브릭)",
              ],
              source: "/service_t.svg",
              plus: true,
              margin: false,
              value: "s2011_aa03s",
            },
          ],
        },
        {
          question: "전체 공간을 철거하고 재시공을 원하시나요?",
          values: [
            {
              title: "아니요",
              value: "부분 철거",
            },
            {
              title: "예",
              value: "전체 철거",
            },
          ],
        },
        {
          question: "생각하시는 시공을 모두 체크해 주세요.",
          values: [
            {
              title: "철거",
              value: "철거",
              description: "철거, 기존에 있던 것을\n모두 제거하는 작업",
              styling: true,
              alert: true,
              notice: "전체 철거는 토탈 스타일링에서만 가능합니다!",
            },
            {
              title: "보양",
              value: "보양",
              description: "엘리베이터 등에 기스 나지\n않도록 비닐을 씌우는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "목공",
              value: "목공",
              description: "나무를 사용한 작업\n걸레받이, 몰딩, 문짝, 천정 평탄화 등",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "전기",
              value: "전기",
              description: "집 내부의 전기 배선\n구성을 바꾸는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "타일",
              value: "타일",
              description: "화장실, 주방 등에 타일을\n바꾸는 작업",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 덧방 공사만 가능합니다!",
            },
            {
              title: "바닥",
              value: "바닥",
              description: "집의 바닥 공사\n장판, 마루, 타일이 있음",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 장판과 마루 공사만 가능합니다!",
            },
            {
              title: "욕실",
              value: "욕실",
              description: "화장실 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
            },
            {
              title: "주방",
              value: "주방",
              description: "주방 공사, 홈스타일링에선\n부분 악세사리 교체만 가능",
              styling: true,
              alert: true,
              notice: "홈스타일링에서는 부분 악세사리 교체만 가능합니다!",
            },
            {
              title: "필름",
              value: "필름",
              description: "필름지를 씌워 해당 면의\n색상이나 재질감을 바꾸는 제공",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "도배",
              value: "도배",
              description: "벽에 도배지를 바르는 작업\n합지와 실크가 있음",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "도장",
              value: "도장",
              description: "페인팅, 탄성코트 등\n면의 도료를 칠하는 공사",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "중문",
              value: "중문",
              description: "현관에 중문을\n새로 달거나 바꾸는 작업",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "발코니",
              value: "발코니",
              description: "발코니의 확장 및\n확장 부분 단열 공사",
              styling: false,
              alert: false,
              notice: "",
            },
            {
              title: "금속 샤시",
              value: "금속 샤시",
              description: "모든 금속 공사와\n샤시 교체 작업",
              styling: false,
              alert: false,
              notice: "",
            },
            {
              title: "조명",
              value: "조명",
              description: "스타일링을 위한 조명\n배치부터 조명 제품 선택",
              styling: true,
              alert: false,
              notice: "",
            },
            {
              title: "제작 가구",
              value: "제작 가구",
              description: "대가구, 소가구로 나뉘며\n제작이 필요한 모든 가구",
              styling: true,
              alert: false,
              notice: "",
            },
          ],
        },
        {
          question: "시공 당일의 주거 환경을 알려주세요.",
          values: [
            {
              title: "거주 중이며 가구 있음",
              value: "거주 중이며 가구 있음",
            },
            {
              title: "거주 중이며 보관 이사 계획",
              value: "거주 중이며 보관 이사 계획",
            },
            {
              title: "거주하지 않으며 공실 상태",
              value: "거주하지 않으며 공실 상태",
            },
          ],
        },
        {
          question: "인테리어 전체 가용 예산을 알려주세요.",
          values: [
            { title: "500만원 이하", value: "500만원 이하" },
            { title: "1,000만원", value: "1,000만원" },
            { title: "1,500만원", value: "1,500만원" },
            { title: "2,000만원", value: "2,000만원" },
            { title: "3,000만원", value: "3,000만원" },
            { title: "4,000만원", value: "4,000만원" },
            { title: "5,000만원", value: "5,000만원 이상" },
            { title: "6,000만원", value: "6,000만원 이상" },
            { title: "7,000만원", value: "7,000만원 이상" },
            { title: "8,000만원", value: "8,000만원 이상" },
            { title: "9,000만원", value: "9,000만원 이상" },
            { title: "1억원 이상", value: "1억원 이상" },
          ],
        },
        {
          question: "생각하는 가구 영역을 모두 체크해 주세요.",
          values: [
            {
              title: "빌트인 제작 가구",
              value: "빌트인 제작 가구",
            },
            {
              title: "단순 붙박이장",
              value: "단순 붙박이장",
            },
            {
              title: "구매형 가구",
              value: "구매형 가구",
            },
          ],
        },
        {
          question: "생각하는 패브릭 영역을 모두 체크해 주세요.",
          values: [
            {
              title: "커튼, 블라인드 등 외부 창문 패브릭",
              value: "커튼, 블라인드 등 외부 창문 패브릭",
            },
            {
              title: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
              value: "제작 발주형 침구류 (쿠션, 이불, 베개 등)",
            },
            {
              title: "구매형 침구류, 카펫 등 패브릭",
              value: "구매형 침구류, 카펫 등 패브릭",
            },
          ],
        },
        {
          question: "입주 예정 시기를 알려주세요.",
          values: [
            { title: "미정 / 거주중", value: "미정 / 거주중" },
            { title: "1개월 이내", value: "1개월 이내" },
            { title: "2개월 이내", value: "2개월 이내" },
            { title: "3개월 이내", value: "3개월 이내" },
            { title: "4개월 이내", value: "4개월 이내" },
            { title: "5개월 이내", value: "5개월 이내" },
            { title: "6개월 이내", value: "6개월 이내" },
            { title: "1년 이내", value: "1년 이내" },
            { title: "1년 이상", value: "1년 이상" },
          ],
        },
        {
          question: "가구 구매 정도를 알려주세요.",
          values: [
            {
              title: "기존 가구 재배치",
              value: "기존 가구 재배치",
            },
            {
              title: "일부 신규 구매",
              value: "일부 신규 구매",
            },
            {
              title: "전체 신규 구매",
              value: "전체 신규 구매",
            },
          ],
        },
        {
          question: "해당 가족 구성원을 체크해 주세요!",
          values: [
            {
              title: "1인 가구",
              value: "1인 가구",
            },
            {
              title: "부부, 자녀 없음",
              value: "부부, 자녀 없음",
            },
            {
              title: "부부, 유아기 자녀",
              value: "부부, 유아기 자녀",
            },
            {
              title: "부부, 학령기 자녀",
              value: "부부, 학령기 자녀",
            },
            {
              title: "기타",
              value: "기타",
            },
          ],
        },
        {
          question: "고객님의 연령대를 체크해 주세요!",
          values: [
            {
              title: "29세 이하",
              value: "29세 이하",
            },
            {
              title: "30세 - 39세",
              value: "30세 - 39세",
            },
            {
              title: "40세 - 49세",
              value: "40세 - 49세",
            },
            {
              title: "50세 - 59세",
              value: "50세 - 59세",
            },
            {
              title: "60세 이상",
              value: "60세 이상",
            },
          ],
        },
        {
          question: "가능한 상담 시간을 모두 체크해 주세요.",
          values: [
            { title: "9:30 - 11:00", value: "9:30 - 11:00" },
            { title: "11:00 - 12:30", value: "11:00 - 12:30" },
            { title: "13:30 - 16:30", value: "13:30 - 16:30" },
            { title: "16:30 - 18:30", value: "16:30 - 18:30" },
          ],
        },
        {
          question: "마음에 드는 사진을 3장씩 선택해주세요.",
          values: [],
        },
        {
          question: "현장 사진, 도면이 있다면 업로드해주세요.",
          values: [],
        },
      ];

      res.send(JSON.stringify({ totalMenu }));
    } catch (e) {
      await logger.error("GhostClient 서버 문제 생김 (rou_post_styleCuration_getTotalMenu) : " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}
