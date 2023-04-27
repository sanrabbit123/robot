//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const db = "miro81";
      let standard, raw_data, data, optionQuery, whereQuery;
      let historyWhereQuery;
      let thisCliids;
      let thisHistories;
      let resultArr;
      let thisHistory;
      let proposalSend;
      let thisProjects;
      let allProjects;
      let allDesigners;
      let desidArr, designersArr;
      let thisDailySales;
      let dailySalesArr;
      let thisRequestIndex;
      let thisSalesDate;
      if (req.body.where === undefined && req.body.whereQuery !== undefined) {
        req.body.where = req.body.whereQuery;
      }
      if (req.url === "/getClients") {
        standard = instance.patch.clientStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getClientsByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getClientsByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getDesigners") {
        standard = instance.patch.designerStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getDesignersByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getDesignersByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getProjects") {
        standard = instance.patch.projectStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getProjectsByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          whereQuery = equalJson(req.body.where);
          raw_data = await back.getProjectsByQuery(whereQuery, optionQuery);
        }
      } else if (req.url === "/getContents") {
        standard = instance.patch.contentsStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getContentsArrByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getContentsArrByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getBuilders") {
        standard = null;
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = equalJson(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo, limit: Number(req.body.limit) });
          } else {
            raw_data = await back.getBuildersByQuery({}, { withTools: true, selfMongo: instance.mongo });
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await back.getBuildersByQuery(equalJson(req.body.where), optionQuery);
        }
      }

      if (req.body.noFlat === undefined) {
        data = raw_data.flatDeath();
        if (req.url === "/getClients") {

          thisCliids = data.map((obj) => { return obj.standard.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });
          thisHistories = await selfMongo.db(db).collection("clientHistory").find(historyWhereQuery).project({ cliid: 1, manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();
          thisDailySales = await selfMongo.db(db).collection("dailySales").find({
            $or: thisCliids.map((thisCliid) => {
              return {
                cliids: {
                  $elemMatch: {
                    cliid: thisCliid
                  }
                }
              }
            })
          }).project({ date: 1, cliids: 1, _id: 0 }).toArray();

          allProjects = await selfCoreMongo.db(db).collection("project").find(historyWhereQuery).project({ cliid: 1, proid: 1, proposal: 1, _id: 0 }).toArray();
          allDesigners =await selfCoreMongo.db(db).collection("designer").find({}).project({ desid: 1, designer: 1, _id: 0 }).toArray();
          resultArr = [];
          for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
            resultArr.push({
              cliid,
              manager,
              proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
              about: send.filter((obj) => { return obj.page === "finalPush" }),
              pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
              haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
            })
          }

          for (let obj of data) {
            thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });
            thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            if (thisHistory.proposal.length > 0) {
              proposalSend = dateToString(thisHistory.proposal[0].date);
              thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
              thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
              designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
            } else {
              proposalSend = '-';
              desidArr = [];
              designersArr = [];
            }

            obj.info.manager = thisHistory.manager;
            obj.info.proposalSend = proposalSend;
            obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
            obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
            obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
            obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
            obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";
            dailySalesArr = thisDailySales.filter((s) => {
              if (s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) === -1) {
                return false;
              } else {
                return true;
              }
            }).map((o) => { return o.date });

            if (dailySalesArr.length === 0) {
              obj.info.standardDate = '-';
            } else if (dailySalesArr.length === 1) {
              obj.info.standardDate = dateToString(dailySalesArr[0]);
            } else {
              dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
              thisRequestIndex = raw_data.find((client) => { return client.cliid === obj.standard.cliid }).requests.toNormal().map((re) => {
                return dateToString(re.request.timeline, true).slice(0, 13);
              }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
              thisSalesDate = dailySalesArr[thisRequestIndex]
              if (thisSalesDate === undefined) {
              obj.info.standardDate = '-';
              } else {
              obj.info.standardDate = dateToString(thisSalesDate);
              }
            }
          }

        }
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.send(JSON.stringify(raw_data.toNormal()));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchDocuments = function () {
  const instance = this;
  const { equalJson, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners", "/searchContents" ];
  obj.func = async function (req, res) {
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const db = "miro81";
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let whereQuery;
      let data;
      let rawJson;
      let filteredArr;
      let idName;
      let historyWhereQuery;
      let thisCliids;
      let thisHistories;
      let resultArr;
      let thisHistory;
      let proposalSend;
      let thisProjects;
      let allProjects;
      let allDesigners;
      let desidArr, designersArr;
      let thisDailySales;
      let dailySalesArr;
      let thisRequestIndex;
      let thisSalesDate;

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
        idName = "cliid";
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
        idName = "proid";
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
        idName = "desid";
      } else if (req.url === "/searchContents") {
        standard = instance.patch.contentsStandard();
        map = instance.patch.contentsMap();
        idName = "conid";
      }

      mapArr = Object.values(map);
      searchQuery = {};
      if (/^id\:/gi.test(req.body.query)) {
        searchArr = req.body.query.slice(3).trim().split(',').map((str) => { return str.trim(); });
        searchArr = searchArr.map((str) => { let obj = {}; obj[idName] = str; return obj; });
      } else {
        searchArr = [];
        for (let { position, searchBoo } of mapArr) {
          if (searchBoo) {
            tempObj = {};
            tempObj2 = {};
            if (req.body.query !== "") {
              tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
            } else {
              tempObj["$regex"] = new RegExp('.', 'gi');
            }
            tempObj2[position] = tempObj["$regex"];
            searchArr.push(tempObj2);
          }
        }
      }
      searchQuery["$or"] = searchArr;

      if (req.url === "/searchClients") {
        rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchProjects") {
        rawJson = await instance.back.getProjectsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
        if (/\/project/g.test(req.headers.referer)) {

          if (/^d/i.test(req.body.query)) {
            req.body.query = req.body.query.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\:\;\?\/\|\<\>\,\.\\\]\[\{\} \n\t]/g, '').replace(/^d/i, '');
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.designerMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let designers of rawJson) {
                whereQuery["$or"].push({ desid: designers.desid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

            }
          } else {
            if (rawJson.length === 0) {
              mapArr = Object.values(instance.patch.clientMap());
              searchQuery = {};
              searchArr = [];
              for (let { position, searchBoo } of mapArr) {
                if (searchBoo) {
                  tempObj = {};
                  tempObj2 = {};
                  if (req.body.query !== "") {
                    tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                  } else {
                    tempObj["$regex"] = new RegExp('.', 'gi');
                  }
                  tempObj2[position] = tempObj["$regex"];
                  searchArr.push(tempObj2);
                }
              }
              searchQuery["$or"] = searchArr;
              if (req.body.query !== "") {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = await instance.back.getClientsByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
              }

              whereQuery = {};
              whereQuery["$or"] = [];
              for (let client of rawJson) {
                whereQuery["$or"].push({ cliid: client.cliid });
              }

              if (whereQuery["$or"].length > 0) {
                rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
              } else {
                rawJson = [];
              }

              if (rawJson.length === 0) {
                mapArr = Object.values(instance.patch.designerMap());
                searchQuery = {};
                searchArr = [];
                for (let { position, searchBoo } of mapArr) {
                  if (searchBoo) {
                    tempObj = {};
                    tempObj2 = {};
                    if (req.body.query !== "") {
                      tempObj["$regex"] = new RegExp(DataRouter.queryFilter(req.body.query), 'gi');
                    } else {
                      tempObj["$regex"] = new RegExp('.', 'gi');
                    }
                    tempObj2[position] = tempObj["$regex"];
                    searchArr.push(tempObj2);
                  }
                }
                searchQuery["$or"] = searchArr;
                if (req.body.query !== "") {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
                }

                whereQuery = {};
                whereQuery["$or"] = [];
                for (let designers of rawJson) {
                  whereQuery["$or"].push({ desid: designers.desid });
                }

                if (whereQuery["$or"].length > 0) {
                  rawJson = await instance.back.getProjectsByQuery(whereQuery, { withTools: true, selfMongo: instance.mongo });
                } else {
                  rawJson = [];
                }

              }

            }
          }

          filteredArr = [];
          for (let obj of rawJson) {
            if (obj.desid !== "") {
              filteredArr.push(obj);
            }
          }
          filteredArr.flatDeath = function () {
            let tong, tempArr;
            tong = [];
            for (let i of this) {
              tempArr = i.flatDeath();
              for (let j of tempArr) {
                tong.push(j);
              }
            }
            return tong;
          }
          filteredArr.planeDeath = function () {
            let tong, tempArr;
            tong = [];
            for (let i of this) {
              tempArr = i.planeDeath();
              for (let j of tempArr) {
                tong.push(j);
              }
            }
            return tong;
          }

          rawJson = filteredArr;
        }
      } else if (req.url === "/searchDesigners") {
        rawJson = await instance.back.getDesignersByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      } else if (req.url === "/searchContents") {
        rawJson = await instance.back.getContentsArrByQuery(searchQuery, { withTools: true, selfMongo: instance.mongo });
      }

      if (req.body.noFlat === undefined) {
        data = rawJson.flatDeath();
        if (req.url === "/searchClients") {

          thisCliids = data.map((obj) => { return obj.standard.cliid });
          historyWhereQuery = {};
          historyWhereQuery["$or"] = thisCliids.map((cliid) => { return { cliid } });
          thisHistories = await selfMongo.db(db).collection("clientHistory").find(historyWhereQuery).project({ cliid: 1, manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();
          thisDailySales = await selfMongo.db(db).collection("dailySales").find({
            $or: thisCliids.map((thisCliid) => {
              return {
                cliids: {
                  $elemMatch: {
                    cliid: thisCliid
                  }
                }
              }
            })
          }).project({ date: 1, cliids: 1, _id: 0 }).toArray();

          allProjects = await selfCoreMongo.db(db).collection("project").find(historyWhereQuery).project({ cliid: 1, proid: 1, proposal: 1, _id: 0 }).toArray();
          allDesigners =await selfCoreMongo.db(db).collection("designer").find({}).project({ desid: 1, designer: 1, _id: 0 }).toArray();
          resultArr = [];
          for (let { manager, cliid, curation: { analytics: { send } } } of thisHistories) {
            resultArr.push({
              cliid,
              manager,
              proposal: send.filter((obj) => { return obj.page === "designerProposal" }),
              about: send.filter((obj) => { return obj.page === "finalPush" }),
              pure: send.filter((obj) => { return obj.page === "pureOutOfClient" }),
              haha: send.filter((obj) => { return obj.page === "lowLowPush" }),
            })
          }

          for (let obj of data) {
            thisHistory = resultArr.find((o) => { return o.cliid === obj.standard.cliid });
            thisHistory.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf() });

            if (thisHistory.proposal.length > 0) {
              proposalSend = dateToString(thisHistory.proposal[0].date);
              thisProjects = allProjects.filter((project) => { return project.cliid === obj.standard.cliid });
              thisProjects.sort((a, b) => { return b.proposal.date.valueOf() - a.proposal.date.valueOf() });
              desidArr = thisProjects[0].proposal.detail.map((o) => { return o.desid });
              designersArr = desidArr.map((desid) => { return allDesigners.find((d) => { return d.desid === desid }).designer; });
            } else {
              proposalSend = '-';
              desidArr = [];
              designersArr = [];
            }

            obj.info.manager = thisHistory.manager;
            obj.info.proposalSend = proposalSend;
            obj.info.pureSend = thisHistory.pure.length > 0 ? dateToString(thisHistory.pure[0].date) : '-';
            obj.info.aboutSend = thisHistory.about.length > 0 ? dateToString(thisHistory.about[0].date) : '-';
            obj.info.hahaSend = thisHistory.haha.length > 0 ? dateToString(thisHistory.haha[0].date) : '-';
            obj.info.desids = desidArr.length > 0 ? desidArr.join(", ") : "-";
            obj.info.proposalDesigners = designersArr.length > 0 ? designersArr.join(", ") : "-";
            dailySalesArr = thisDailySales.filter((s) => {
              if (s.cliids.findIndex((o) => { return o.cliid === obj.standard.cliid }) === -1) {
                return false;
              } else {
                return true;
              }
            }).map((o) => { return o.date });

            if (dailySalesArr.length === 0) {
              obj.info.standardDate = '-';
            } else if (dailySalesArr.length === 1) {
              obj.info.standardDate = dateToString(dailySalesArr[0]);
            } else {
              dailySalesArr.sort((a, b) => { return b.valueOf() - a.valueOf() });
              thisRequestIndex = raw_data.find((client) => { return client.cliid === obj.standard.cliid }).requests.toNormal().map((re) => {
                return dateToString(re.request.timeline, true).slice(0, 13);
              }).findIndex((str) => { return str === obj.info.timeline.slice(0, 13) });
              thisSalesDate = dailySalesArr[thisRequestIndex]
              if (thisSalesDate === undefined) {
              obj.info.standardDate = '-';
              } else {
              obj.info.standardDate = dateToString(thisSalesDate);
              }
            }
          }

        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(rawJson.toNormal()));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_searchDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, pythonExecute, shellExec, shellLink, equalJson, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents" ];
  obj.func = async function (req, res) {
    try {
      let { thisId, requestIndex, column, value, pastValue, user, thisCase } = equalJson(req.body);
      let thisPath;
      let map;
      let whereQuery, updateQuery;
      let message;
      let finalValue, valueTemp, pastFinalValue, pastValueTemp;
      let temp, temp2, temp3;
      let tempFunction;
      let position;
      let userArr;
      let today;
      let noUpdate;
      let updateTong;

      if (req.url === "/updateClient") {
        thisPath = "client";
        map = instance.patch.clientMap();
      } else if (req.url === "/updateDesigner") {
        thisPath = "designer";
        map = instance.patch.designerMap();
      } else if (req.url === "/updateProject") {
        thisPath = "project";
        map = instance.patch.projectMap();
      } else if (req.url === "/updateContents") {
        thisPath = "contents";
        map = instance.patch.contentsMap();
      }

      noUpdate = false;

      if (typeof value !== "string") {
        if (value instanceof Date) {
          value = dateToString(value, true);
        }
      }

      switch (map[column].type) {
        case "string":
          finalValue = String(value).trim().replace(/\t/gi, '');
          pastFinalValue = String(pastValue).trim().replace(/\t/gi, '');
          break;
        case "number":
          if (Number.isNaN(Number(value.replace(/[^0-9\.\-]/g, '')))) {
            finalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          } else {
            finalValue = Number(value.replace(/[^0-9\.\-]/g, ''));
          }
          pastFinalValue = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
          break;
        case "date":
          if (value === "-" || value === "") {
            value = "1800-01-01";
          } else if (/예정/g.test(value)) {
            value = "3800-01-01";
          }
          if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
            if (value.length === 10) {
              temp = value.split('-');
              finalValue = new Date(Number(temp[0]), Number(temp[1].replace(/^0/, '')) - 1, Number(temp[2].replace(/^0/, '')));
            } else if (value.length === 19) {
              temp = value.split(' ');
              temp2 = temp[0].split('-');
              temp3 = temp[1].split(':');
              finalValue = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '')) - 1, Number(temp2[2].replace(/^0/, '')), Number(temp3[0].replace(/^0/, '')), Number(temp3[1].replace(/^0/, '')), Number(temp3[2].replace(/^0/, '')));
            } else {
              finalValue = new Date(pastValue);
            }
          } else {
            finalValue = new Date(pastValue);
          }
          pastFinalValue = new Date(pastValue);
          break;
        case "boolean":
          if (/^미/.test(value) || /^비/.test(value) || /^안/.test(value) || /no/gi.test(value) || value === "false" || value === "null" || value === "전체") {
            pastFinalValue = false;
            finalValue = false;
          } else {
            pastFinalValue = true;
            finalValue = true;
          }
          break;
        case "array":
          finalValue = [];
          pastFinalValue = [];
          valueTemp = value.split(", ");
          pastValueTemp = pastValue.split(", ");
          for (let i of valueTemp) {
            finalValue.push(i);
          }
          for (let i of pastValueTemp) {
            pastFinalValue.push(i);
          }
          break;
        case "object":
          tempFunction = new Function("value", "pastValue", "vaildMode", map[column].objectFunction);
          finalValue = tempFunction(value, pastValue, false);
          pastFinalValue = tempFunction(pastValue, pastValue, false);
          break;
        case "null":
          noUpdate = true;
          finalValue = null;
          pastFinalValue = null;
        case "link":
          finalValue = String(value);
          break;
        default:
          throw new Error("invaild type");
      }

      if (!noUpdate) {
        updateQuery = {};
        position = map[column].position.replace(/\.0\./, ("." + requestIndex + "."));
        updateQuery[position] = finalValue;

        whereQuery = {};
        if (req.url === "/updateClient") {
          whereQuery[map.cliid.position] = thisId;
        } else if (req.url === "/updateDesigner") {
          whereQuery[map.desid.position] = thisId;
        } else if (req.url === "/updateProject") {
          whereQuery[map.proid.position] = thisId;
        } else if (req.url === "/updateContents") {
          whereQuery[map.conid.position] = thisId;
        }

        if (map[column].isHistory !== undefined && map[column].isHistory !== null) {
          if (req.url === "/updateClient") {
            message = await instance.back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateDesigner") {
            message = await instance.back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateProject") {
            message = await instance.back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          } else if (req.url === "/updateContents") {
            message = await instance.back.updateHistory("contents", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
          }
        } else {
          if (req.url === "/updateClient") {
            message = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateDesigner") {
            message = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateProject") {
            message = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          } else if (req.url === "/updateContents") {
            message = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
          }
        }

        //update log
        const members = instance.members;
        const logDir = `${instance.dir}/log`;
        let thisPerson, fileTarget;

        userArr = user.split("__split__");
        today = new Date();

        for (let { name, email } of members) {
          if (email.includes(userArr[1])) {
            thisPerson = name;
            break;
          }
        }

        updateTong = {
          user: {
            name: thisPerson,
            email: userArr[1]
          },
          where: thisId,
          update: {
            target: position,
            value: finalValue,
            pastValue: pastFinalValue
          },
          date: today
        };

        back.mongoCreate((req.url.replace(/^\//, '') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
          throw new Error(e);
        });

        await fileSystem(`write`, [ logDir + "/" + thisPath + "_" + "latest.json", JSON.stringify({ path: thisPath, who: thisPerson, where: thisId, column: column, value: value, date: today }) ]);
        const dir = await fileSystem(`readDir`, [ logDir ]);
        fileTarget = null;

        for (let fileName of dir) {
          if ((new RegExp("^" + thisId)).test(fileName)) {
            fileTarget = fileName;
          }
        }
        if (fileTarget !== null) {
          await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
        }
        await fileSystem(`write`, [ `${instance.dir}/log/${thisId}__name__${thisPerson}`, `0` ]);
      }

      //calendar
      if (map[column].calendar !== undefined) {
        if (typeof map[column].calendar === "function") {
          let calendObj, start, id, to, title;
          calendObj = map[column].calendar(equalJson(thisCase));
          id = calendObj.id;
          to = calendObj.to;
          title = calendObj.title;
          start = finalValue;
          instance.calendar.listEvents(to, id).then((searchResult) => {
            if (searchResult.length === 0) {
              instance.calendar.makeSchedule(to, title, "", start, null);
            } else {
              instance.calendar.updateSchedule(to, searchResult[0].eventId, { start, title });
            }
          }).catch((err) => {
            throw new Error(err);
          });
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_updateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateLog = function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/updateLog" ];
  obj.func = async function (req, res) {
    try {
      if (req.body.id === undefined || req.body.column === undefined || req.body.position === undefined || req.body.pastValue === undefined || req.body.finalValue === undefined) {
        throw new Error("invaild post");
      }
      const { id: thisId, column, position, pastValue, finalValue } = equalJson(req.body);
      const fixedEmail = "uragenbooks@gmail.com";
      const members = instance.members;
      const logDir = `${instance.dir}/log`;
      const today = new Date();
      let thisPerson, fileTarget, thisPath, dir;
      let updateTong;
      let logCollectionName;

      if (/^c/.test(thisId)) {
        thisPath = "client";
        logCollectionName = "updateClientLog";
      } else if (/^d/.test(thisId)) {
        thisPath = "designer";
        logCollectionName = "updateDesignerLog";
      } else if (/^p/.test(thisId)) {
        thisPath = "project";
        logCollectionName = "updateProjectLog";
      } else if (/^t/.test(thisId)) {
        thisPath = "contents";
        logCollectionName = "updateContentsLog";
      }

      for (let { name, email } of members) {
        if (email.includes(fixedEmail)) {
          thisPerson = name;
          break;
        }
      }

      updateTong = {
        user: {
          name: thisPerson,
          email: fixedEmail
        },
        where: thisId,
        update: {
          target: position,
          value: finalValue,
          pastValue: pastValue
        },
        date: today
      };

      back.mongoCreate(logCollectionName, updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
        throw new Error(e);
      });

      await fileSystem(`write`, [ logDir + "/" + thisPath + "_" + "latest.json", JSON.stringify({ path: thisPath, who: thisPerson, where: thisId, column: column, value: finalValue, date: today }) ]);
      dir = await fileSystem(`readDir`, [ logDir ]);
      fileTarget = null;
      for (let fileName of dir) {
        if ((new RegExp("^" + thisId)).test(fileName)) {
          fileTarget = fileName;
        }
      }
      if (fileTarget !== null) {
        await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
      }
      await fileSystem(`write`, [ `${logDir}/${thisId}__name__${thisPerson}`, `0` ]);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
      });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_updateLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_rawUpdateDocument = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageLog } = this.mother;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents", "/rawUpdateAspirant" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let raw_data;
      let whereQuery, updateQuery, dateQuery;
      let cookies;
      let updateTong;

      if (req.body.where !== undefined) {
        whereQuery = equalJson(req.body.where);
      } else {
        whereQuery = equalJson(req.body.whereQuery);
      }

      if (req.body.updateQuery === undefined) {
        updateQuery = {};
        if (/^\{/.test(req.body.updateValue) || /^\[/.test(req.body.updateValue)) {
          updateQuery[req.body.target] = equalJson(req.body.updateValue);
        } else if (req.body.updateValue === "today") {
          updateQuery[req.body.target] = new Date();
        } else {
          updateQuery[req.body.target] = req.body.updateValue;
        }
      } else {
        updateQuery = equalJson(req.body.updateQuery);
      }

      if (req.url === "/rawUpdateClient") {
        raw_data = await back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateDesigner") {
        raw_data = await back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateProject") {
        raw_data = await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateContents") {
        raw_data = await back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateAspirant") {
        raw_data = await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      updateTong = {
        user: {
          name: "unknown",
          email: "unknown"
        },
        where: Object.values(whereQuery)[0],
        update: { updateQuery: JSON.stringify(updateQuery) },
        date: new Date()
      };

      cookies = DataRouter.cookieParsing(req);
      if (cookies !== null) {
        if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
          updateTong.user.name = cookies.homeliaisonConsoleLoginedName;
          updateTong.user.email = cookies.homeliaisonConsoleLoginedEmail;
        }
      }

      back.mongoCreate((req.url.replace(/^\/rawU/, 'u') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
        throw new Error(e);
      });

      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      errorLog("Console 서버 문제 생김 (rou_post_rawUpdateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_deleteDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/deleteClient", "/deleteDesigner", "/deleteProject", "/deleteContents" ];
  obj.func = async function (req, res) {
    try {
      if (req.url === "/deleteClient") {
        await instance.back.deleteClient(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteDesigner") {
        await instance.back.deleteDesigner(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteProject") {
        await instance.back.deleteProject(req.body.id, { selfMongo: instance.mongo });
      } else if (req.url === "/deleteContents") {
        await instance.back.deleteContents(req.body.id, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_deleteDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDocument = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/createClient", "/createDesigner", "/createProject", "/createContents" ];
  obj.func = async function (req, res) {
    try {
      const updateQuery = equalJson(req.body.updateQuery);
      let id;

      if (req.url === "/createClient") {
        id = await instance.back.createClient(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createDesigner") {
        id = await instance.back.createDesigner(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createProject") {
        updateQuery["proposal.date"] = new Date();
        id = await instance.back.createProject(updateQuery, { selfMongo: instance.mongo });
      } else if (req.url === "/createContents") {
        id = await instance.back.createContents(updateQuery, { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ id: id }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_createDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getServices = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getServices", "/getServiceByKey", "/getServicesByKind" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.url === "/getServices") {
        if (req.body.whereQuery === undefined) {
          throw new Error("invalid post");
        }
        const { whereQuery } = equalJson(req.body);
        const services = await back.getServicesByQuery(whereQuery, { selfMongo: instance.mongo, sort: { date: -1 } });
        res.send(JSON.stringify(services.toNormal()));
      } else if (req.url === "/getServiceByKey") {
        if (req.body.key === undefined) {
          throw new Error("invaild post");
        }
        const { key } = equalJson(req.body);
        const service = await back.getServiceByKey(key, { selfMongo: instance.mongo });
        res.send(JSON.stringify(service.toNormal()));
      } else if (req.url === "/getServicesByKind") {
        if (req.body.kind === undefined) {
          throw new Error("invaild post");
        }
        const { kind } = equalJson(req.body);
        const services = await back.getServicesByKind(kind, { selfMongo: instance.mongo });
        res.send(JSON.stringify(services.toNormal()));
      }
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_getServices): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClientReport = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const port = 3000;
  const { equalJson, zeroAddition, requestSystem } = this.mother;
  let obj = {};
  obj.link = "/getClientReport";
  obj.func = async function (req, res) {
    try {
      const today = new Date();
      const proposalStandardDate = new Date(2021, 8, 1);
      const proposalStandardDateValue = proposalStandardDate.valueOf();
      let dateMatrix;
      let searchQuery, clients, proposals, contracts, process;
      let processTong;
      let cliidArr, cliidArr_raw;
      let resultArr;
      let obj;
      let searchBoo;
      let processTong_refined, processTong_past, processTong_double;
      let doubleObject;
      let doubleClient;
      let finalLength;
      let processNumber;
      let pastTong;
      let proposalsTong;
      let cliidTempArr, proidTempArr;
      let motherClients, motherProjects, motherProjects_raw;
      let motherClientHistories;
      let histories;
      let copiedMatrix;
      let monthObject;
      let copiedCopiedMatrix;
      let yearMonthArr;
      let logRes;
      let logFound;

      if (req.body.month === undefined) {
        if (req.body.startYear === undefined) {
          req.body.month = 8;
          searchBoo = false;
        } else {
          let { startYear, startMonth, endYear, endMonth } = req.body;
          startYear = Number(startYear);
          startMonth = Number(startMonth.replace(/^0/, ''));
          endYear = Number(endYear);
          endMonth = Number(endMonth.replace(/^0/, ''));
          req.body.month = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((startYear * 12) + startMonth) + 1;
          req.body.endMonth = ((today.getFullYear() * 12) + today.getMonth() + 1) - ((endYear * 12) + endMonth);
          searchBoo = true;
        }
      } else {
        searchBoo = false;
      }

      if (!searchBoo) {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
      } else {
        dateMatrix = await instance.getDateMatrix(Number(req.body.month));
        for (let i = 0; i < req.body.endMonth; i++) {
          dateMatrix.shift();
        }
      }

      copiedMatrix = equalJson(JSON.stringify(dateMatrix));
      copiedMatrix = copiedMatrix.flat().flat();
      copiedMatrix.sort((a, b) => {
        return a.valueOf() - b.valueOf();
      });

      motherClients = (await back.getClientsByQuery({
        $and: [
          {
            requests: {
              $elemMatch: {
                "request.timeline": { $gte: copiedMatrix[0] }
              }
            }
          },
          {
            requests: {
              $elemMatch: {
                "request.timeline": { $lte: copiedMatrix[copiedMatrix.length - 1] }
              }
            }
          }
        ]
      }, { selfMongo: instance.mongo, withTools: true })).getRequestsTong().map((arr) => { let obj = arr[0].toNormal(); obj.cliid = arr.cliid; obj.analytics = arr[1].toNormal(); return obj; });
      motherClientHistories = await back.mongoRead("clientHistory", {
        $or: motherClients.map((o) => { return { cliid: o.cliid } }),
      }, { selfMongo: instance.mongolocal });
      motherProjects_raw = (await back.getProjectsByQuery({
        $or: motherClients.map((o) => { return { cliid: o.cliid } }).concat([
          {
            "process.contract.first.date": {
              $gte: copiedMatrix[0]
            }
          }
        ]),
      }, { selfMongo: instance.mongo })).toNormal();
      motherProjects = motherProjects_raw.filter((obj) => {  return obj.process.contract.first.date.valueOf() >= (new Date(2000, 0, 1)).valueOf() });

      yearMonthArr = [];
      resultArr = [];
      for (let matrix of dateMatrix) {

        copiedCopiedMatrix = equalJson(JSON.stringify(matrix));
        copiedCopiedMatrix = copiedCopiedMatrix.flat();
        copiedCopiedMatrix.sort((a, b) => {
          return b.valueOf() - a.valueOf();
        });

        monthObject = {
          year: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getFullYear(),
          month: copiedCopiedMatrix[Math.round(copiedCopiedMatrix.length / 2)].getMonth() + 1,
        };
        yearMonthArr.push((monthObject.year * 100) + monthObject.month);

        monthArr = [];
        for (let arr of matrix) {

          obj = {};

          obj.cliid = {};
          obj.proid = {};

          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          clients = motherClients.filter((obj) => { return obj.timeline.valueOf() >= arr[0].valueOf() && obj.timeline.valueOf() < arr[2].valueOf() });
          obj.client = clients.length;
          obj.cliid.client = clients.map((obj) => { return obj.cliid; });
          obj.proid.client = [];

          //proposal
          if (arr[0].valueOf() > proposalStandardDateValue) {
            cliidArr_raw = clients.map((obj) => { return obj.cliid; });
            cliidArr_raw = Array.from(new Set(cliidArr_raw));
            process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
            histories = motherClientHistories.filter((obj) => { return process.map((o) => { return o.cliid; }).includes(obj.cliid) });
            histories = histories.filter((obj) => { return obj.curation.analytics.send.some((o) => { return /designerProposal/gi.test(o.page) }) });
            obj.proposal = histories.length;
            obj.cliid.proposal = [ ...new Set(histories.map((obj) => { return obj.cliid })) ];
            obj.proid.proposal = [ ...new Set(process.filter((obj) => { return histories.map((o) => { return o.cliid }).includes(obj.cliid) }).map((obj) => { return obj.proid })) ];
          } else {
            cliidArr_raw = clients.map((obj) => { return obj.cliid; });
            cliidArr_raw = Array.from(new Set(cliidArr_raw));
            process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) });
            obj.proposal = process.length;
            obj.cliid.proposal = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
            obj.proid.proposal = [ ...new Set(process.map((obj) => { return obj.proid })) ];
          }

          //recommend
          if (arr[0].valueOf() > proposalStandardDateValue) {
            histories = histories.filter((obj) => { return obj.curation.analytics.page.some((o) => { return /designerProposal/gi.test(o.page) }) });
            obj.recommend = histories.length;
            obj.cliid.recommend = [ ...new Set(histories.map((obj) => { return obj.cliid })) ];
            obj.proid.recommend = [ ...new Set(process.filter((obj) => { return histories.map((o) => { return o.cliid }).includes(obj.cliid) }).map((obj) => { return obj.proid })) ];
          } else {
            obj.recommend = 0;
            obj.cliid.recommend = [];
            obj.proid.recommend = [];
          }

          //contract
          contracts = motherProjects.filter((obj) => { return obj.process.contract.first.date.valueOf() >= arr[0].valueOf() && obj.process.contract.first.date.valueOf() < arr[2].valueOf() });
          obj.contract = contracts.length;
          obj.cliid.contract = [ ...new Set(contracts.map((obj) => { return obj.cliid; })) ];
          obj.proid.contract = contracts.map((obj) => { return obj.proid });

          //process start
          cliidArr_raw = clients.filter((obj) => { return !/드[롭랍]/gi.test(obj.analytics.response.status) }).map((obj) => { return obj.cliid; });
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          process = motherProjects_raw.filter((obj) => { return cliidArr_raw.includes(obj.cliid) }).filter((obj) => {
            return obj.desid.trim() !== '';
          });
          obj.process = process.length;
          obj.cliid.process = [ ...new Set(process.map((obj) => { return obj.cliid })) ];
          obj.proid.process = [ ...new Set(process.map((obj) => { return obj.proid })) ];

          monthArr.push(obj);
        }
        monthObject.data = equalJson(JSON.stringify(monthArr));
        resultArr.push(monthObject);
      }

      yearMonthArr.sort();

      logRes = await requestSystem("https://" + address.testinfo.host + ":" + String(port) + "/getClientReport", {
        fromYear: Math.floor(yearMonthArr[0] / 100),
        fromMonth: yearMonthArr[0] % 100,
        toYear: Math.floor(yearMonthArr[yearMonthArr.length - 1] / 100),
        toMonth: yearMonthArr[yearMonthArr.length - 1] % 100,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      for (let obj of resultArr) {
        logFound = logRes.data.find((obj2) => {
          return obj2.year === obj.year && obj2.month === obj.month
        });
        if (logFound === undefined) {
          obj.mau = 0;
          obj.adClients = 0;
          obj.charge = 0;
        } else {
          obj.mau = logFound.mau
          obj.adClients = logFound.adClients
          obj.charge = logFound.charge
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getClientReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getProjectReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, serviceParsing } = this.mother;
  let obj = {};
  obj.link = "/getProjectReport";
  obj.func = async function (req, res) {
    res.set("Content-Type", "application/json");
    try {
      const { mode, start, end } = equalJson(req.body);
      let clients, clients2;
      let projects, projects2;
      let serviceArr;
      let designers;
      let designerArr;
      let tempClient;
      let requestNumber;

      if (mode === "service") {

        serviceArr = new Array(4);

        projects = await back.getProjectsByQuery({
          $and: [
            {
              "process.contract.first.date": { $gte: start }
            },
            {
              "process.contract.first.date": { $lt: end }
            },
            {
              "desid": { $regex: "^d" }
            }
          ]
        }, { selfMongo: instance.mongo });

        clients = await back.getClientsByQuery({
          $or: [
            ...projects.toNormal().map((obj) => { return { cliid: obj.cliid } }),
          ]
        }, { selfMongo: instance.mongo });

        serviceArr[0] = projects.filter((obj) => { return /1/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[1] = projects.filter((obj) => { return /2/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[2] = projects.filter((obj) => { return /3/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });
        serviceArr[3] = projects.filter((obj) => { return /4/gi.test(obj.service.serid.split('_')[1]) }).map((obj) => { return { proid: obj.proid, cliid: obj.cliid } });

        for (let arr of serviceArr) {
          for (let obj of arr) {
            obj.name = clients.toNormal().find((c) => { return c.cliid === obj.cliid }).name;
          }
        }

        res.send(JSON.stringify({ start, end, numbers: { client: clients.length, project: projects.length }, serviceArr }));

      } else if (mode === "designer") {

        designers = await back.getDesignersByQuery({}, { selfMongo: instance.mongo });
        projects = await back.getProjectsByQuery({}, { selfMongo: instance.mongo });
        if (projects.length === 0) {
          clients = [];
        } else {
          clients = (await back.getClientsByQuery({
            $or: projects.toNormal().map((p) => { return { cliid: p.cliid } })
          })).toNormal();
        }
        for (let p of projects) {
          tempClient = clients.find((c) => { return p.cliid === c.cliid });
          requestNumber = 0;
          for (let i = 0; i < tempClient.requests.length; i++) {
            if (tempClient.requests[i].request.timeline.valueOf() < p.proposal.date.valueOf()) {
              requestNumber = i;
              break;
            }
          }
          p.name = tempClient.name;
          p.pyeong = tempClient.requests[requestNumber].request.space.pyeong;
        }

        designerArr = designers.toNormal().map((obj) => { return { desid: obj.desid, designer: obj.designer } });
        for (let obj of designerArr) {

          // proposal
          obj.proposal = projects.filter((p) => {
            return (p.proposal.detail.findIndex((z) => { return z.desid === obj.desid }) !== -1 && p.proposal.date.valueOf() >= start.valueOf() && p.proposal.date.valueOf() < end.valueOf());
          }).map((p) => {
            const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
            let amount, thisFee;
            if (thisProposal === undefined) {
              amount = 0;
            } else {
              thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
              if (thisFee !== -1) {
                amount = thisProposal.fee.toNormal()[thisFee].amount;
              } else {
                amount = 0;
              }
            }
            return { proid: p.proid, status: (p.desid !== '' ? p.process.status.value : "드랍"), service: serviceParsing(p.service.toNormal()), date: p.proposal.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
          });

          // process
          obj.process = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.contract.first.date.valueOf() >= start.valueOf() && p.process.contract.first.date.valueOf() < end.valueOf());
          }).map((p) => {
            const thisProposal = p.proposal.detail.find((d) => { return d.desid === obj.desid });
            let amount, thisFee;
            if (thisProposal === undefined) {
              amount = 0;
            } else {
              thisFee = thisProposal.fee.toNormal().findIndex((k) => { return k.method === (p.service.online ? "online" : "offline"); });
              if (thisFee !== -1) {
                amount = thisProposal.fee.toNormal()[thisFee].amount;
              } else {
                amount = 0;
              }
            }
            return { proid: p.proid, status: p.process.status.value, service: serviceParsing(p.service.toNormal()), date: p.process.contract.first.date, name: p.name, pyeong: p.pyeong, amount, per: Math.floor((amount / p.pyeong) / 1000) * 1000 };
          });

          // calculation first
          obj.first = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.calculation.payments.first.date.valueOf() >= start.valueOf() && p.process.calculation.payments.first.date.valueOf() < end.valueOf());
          }).map((p) => {
            return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.first.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.first.amount - p.process.calculation.payments.first.refund };
          });

          // calculation remain
          obj.remain = projects.filter((p) => {
            return (p.desid === obj.desid && p.process.calculation.payments.remain.date.valueOf() >= start.valueOf() && p.process.calculation.payments.remain.date.valueOf() < end.valueOf());
          }).map((p) => {
            return { proid: p.proid, service: serviceParsing(p.service.toNormal()), date: p.process.calculation.payments.remain.date, name: p.name, pyeong: p.pyeong, amount: p.process.calculation.payments.remain.amount - p.process.calculation.payments.remain.refund };
          });

        }

        res.send(JSON.stringify({ start, end, designers: designerArr }));

      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getProjectReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAspirantInfo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getAspirants" ];
  obj.func = async function (req, res) {
    res.set("Content-Type", "application/json");
    try {
      if (req.body.whereQuery === undefined) {
        throw new Error("invaild post");
      }
      const { whereQuery } = equalJson(req.body);
      let rows;

      if (req.url === "/getAspirants") {
        rows = await back.getAspirantsByQuery(whereQuery, { selfMongo: instance.mongo });
      }

      res.send(JSON.stringify(rows));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getAspirantInfo): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDesignerReport = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/getDesignerReport";
  obj.func = async function (req, res) {
    try {
      if (req.body.desid === undefined) {
        throw new Error("must be desid");
      }
      const { desid } = req.body;
      const selfMongo = instance.mongo;
      let projects;
      let whereQuery;
      let cliidArr_raw, cliidArr;
      let clients;
      let requests, boo;
      let contentsArr;
      let price;

      res.set("Content-Type", "application/json");

      whereQuery = {
        $or: [
          { desid },
          { "proposal.detail": { $elemMatch: { desid } } }
        ]
      };

      projects = await back.getProjectsByQuery(whereQuery, { selfMongo });
      if (projects.length > 0) {

        cliidArr_raw = [];
        for (let p of projects) {
          cliidArr_raw.push(p.cliid);
        }
        cliidArr_raw = Array.from(new Set(cliidArr_raw));
        cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });
        whereQuery = { $or: [] };
        for (let obj of cliidArr) {
          whereQuery["$or"].push(obj);
        }
        clients = (await back.getClientsByQuery(whereQuery, { selfMongo })).toNormal();

        for (let project of projects) {
          for (let client of clients) {
            if (project.cliid === client.cliid) {
              project.name = client.name;
              requests = client.requests;
              boo = false;
              for (let { request } of requests) {
                if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                  boo = true;
                  project.pyeong = request.space.pyeong;
                }
              }
              if (!boo) {
                project.pyeong = requests[0].request.space.pyeong;
              }
            }
          }
        }

      } else {
        clients = [];
      }

      contentsArr = await back.getContentsArrByQuery({ desid }, { selfMongo });
      for (let c of contentsArr) {
        for (let client of clients) {
          if (c.cliid === client.cliid) {
            c.name = client.name;
          }
        }
      }

      price = await back.mongoRead("designerPrice", {}, { selfMongo: instance.mongolocal });

      res.send(JSON.stringify({ projects, clients, contentsArr, price }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getDesignerReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getHistory = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  const stringFilter = function (raw) {
    const originalValue = raw;
    const originalValueArr = originalValue.split("\n");

    let str;
    let tempString;
    let item = null;
    let tong = [];

    for (let text of originalValueArr) {
      if (!/^\<\%item\%\>/.test(text) && /[^ \n]/g.test(text.replace(/[\n ]/g, ''))) {
        tempString = text.trim().replace(/^- /g, '').replace(/^-/g, '').trim();
        tong.push(tempString);
      } else if (/^\<\%item\%\>/.test(text)) {
        item = text;
      }
    }

    if (item !== null) {
      str = item + "\n\n" + tong.join("\n");
    } else {
      str = tong.join("\n");
    }

    return str.replace(/\&/g, ",");
  }
  let obj = {};
  obj.link = [ "/getClientHistory", "/getProjectHistory", "/getHistoryProperty", "/getHistoryTotal", "/getClientsImportant", "/getProjectsImportant", "/getClientsManager", "/getProjectsManager", "/getClientsIssue", "/getProjectsIssue" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let historyObj, responseArr;
      let resultObj;
      let method;
      let temp, tempArr;

      responseArr = [];

      if (req.url === "/getClientHistory") {

        historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("client", { cliid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("client", req.body.id, { selfMongo: instance.mongolocal });
        }

        responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.space === undefined ? '' : historyObj.space.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.styling === undefined ? '' : historyObj.styling.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.construct === undefined ? '' : historyObj.construct.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.budget === undefined ? '' : historyObj.budget.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.progress === undefined ? '' : historyObj.progress.replace(/\=/g, '').replace(/\&/g, ",")));

        if (req.body.rawMode !== undefined) {
          responseArr = historyObj;
        }

      } else if (req.url === "/getProjectHistory") {

        historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("project", { proid: req.body.id }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("project", req.body.id, { selfMongo: instance.mongolocal });
        }

        responseArr.push((historyObj.history === undefined ? '' : historyObj.history.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.designer === undefined ? '' : historyObj.designer.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.client === undefined ? '' : historyObj.client.replace(/\=/g, '').replace(/\&/g, ",")));
        responseArr.push((historyObj.photo === undefined ? '' : historyObj.photo.replace(/\=/g, '').replace(/\&/g, ",")));

        if (req.body.rawMode !== undefined) {
          responseArr = historyObj;
        }

      } else if (req.url === "/getHistoryProperty") {
        if (equalJson(req.body.idArr).length > 0) {
          const { method, property, idArr } = equalJson(req.body);
          responseArr = await back.getHistoryProperty(method, property, idArr, { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      } else if (req.url === "/getHistoryTotal") {
        if (equalJson(req.body.idArr).length > 0) {
          const { method, idArr } = equalJson(req.body);
          responseArr = await back.getHistoryProperty(method, "$all", idArr, { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      }

      if (responseArr === null) {
        responseArr = [];
      }
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getHistory): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateHistory = function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, equalJson } = this.mother;
  const back = this.back;
  const members = this.members;
  let obj = {};
  obj.link = [ "/updateHistory", "/updateClientHistory", "/updateProjectHistory", "/updateDesignerHistory" ];
  obj.func = async function (req, res) {
    try {
      const today = new Date();
      const { id, column, value, email } = equalJson(req.body);
      const logDir = `${instance.dir}/log`;
      const managerInteraction = {
        designer: {
          to: "project",
          toId: "proid",
          method: "getProjectsByQuery",
          whereQuery: { desid: id }
        },
      };
      let historyObj;
      let whereQuery, updateQuery;
      let thisPerson;
      let fileTarget;
      let method, standard;
      let managerArr;
      let managerIdArr;
      let managerToObj;
      let managerTargetArr;
      let page, query, dummy, cookies;

      thisPerson = null;
      if (email !== null) {
        for (let member of members) {
          if (member.email.includes(email)) {
            thisPerson = member.name;
            break;
          }
        }
      }

      whereQuery = {};
      updateQuery = {};

      if (/Client/gi.test(req.url)) {
        method = "client";
      } else if (/Project/gi.test(req.url)) {
        method = "project";
      } else if (/Designer/gi.test(req.url)) {
        method = "designer";
      } else if (/Contents/gi.test(req.url)) {
        method = "contents";
      } else {
        if (req.body.method === undefined) {
          throw new Error("invaild method");
        } else {
          method = req.body.method;
        }
      }

      if (/client/gi.test(method)) {
        standard = "cliid";
      } else if (/project/gi.test(method)) {
        standard = "proid";
      } else if (/designer/gi.test(method)) {
        standard = "desid";
      } else if (/contents/gi.test(method)) {
        standard = "conid";
      } else {
        throw new Error("invaild method");
      }

      historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
      if (historyObj === null) {
        updateQuery = {};
        updateQuery[standard] = id;
        if (column === "important") {
          updateQuery[column] = (Number(value) === 1);
        } else {
          if (column !== null) {
            if (value === "true" || value === "false") {
              updateQuery[column] = (value === "true");
            } else {
              updateQuery[column] = value;
            }
          }
        }
        await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        historyObj = await back.getHistoryById(method, id, { selfMongo: instance.mongolocal });
      } else {
        whereQuery = {};
        whereQuery[standard] = id;
        updateQuery = {};
        if (column === "important") {
          updateQuery[column] = (Number(value) === 1);
        } else {
          if (column !== null) {
            if (value === "true" || value === "false") {
              updateQuery[column] = (value === "true");
            } else {
              updateQuery[column] = value;
            }
          }
        }

        if (Object.keys(updateQuery).length > 0) {
          await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        }
      }

      if (column !== null && thisPerson !== null) {
        await fileSystem(`write`, [ logDir + "/" + method + "_" + "latest.json", JSON.stringify({ path: method, who: thisPerson, where: id, column: "history_" + column, value: "", date: today }) ]);
        const dir = await fileSystem(`readDir`, [ logDir ]);
        fileTarget = null;
        for (let fileName of dir) {
          if ((new RegExp("^" + id)).test(fileName)) {
            fileTarget = fileName;
          }
        }
        if (fileTarget !== null) {
          await shellExec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
        }
        await fileSystem(`write`, [ `${instance.dir}/log/${id}__name__${thisPerson}`, `0` ]);
      }

      if (column === "manager") {
        if (managerInteraction[method] !== undefined) {
          managerArr = await back[managerInteraction[method].method](managerInteraction[method].whereQuery, { selfMongo: instance.mongo });
          managerIdArr = [];
          for (let obj of managerArr) {
            managerIdArr.push(obj[managerInteraction[method].toId]);
          }
          if (managerIdArr.length !== 0) {
            managerToObj = await back.getHistoryProperty(managerInteraction[method].to, "manager", managerIdArr, { selfMongo: instance.mongolocal });
            managerTargetArr = [];
            for (let i in managerToObj) {
              managerTargetArr.push([ i, managerToObj[i] ]);
            }
            managerTargetArr = managerTargetArr.filter((a) => { return a[1] === '' || a[1] === '-' || a[1] === "홀딩"; });
            for (let [ id ] of managerTargetArr) {
              whereQuery = {};
              whereQuery[managerInteraction[method].toId] = id;
              await back.updateHistory(managerInteraction[method].to, [ whereQuery, { manager: value } ], { selfMongo: instance.mongolocal });
            }
          }
        }
      }

      if (typeof req.body.send === "string" && /Client/gi.test(req.url)) {
        page = req.body.send.split('_')[0];
        query = req.body.send.split('_').length > 1 ? req.body.send.split('_')[1] : null;
        dummy = {
          page,
          date: new Date(),
          mode: query,
          who: {
            name: null,
            email: null,
          }
        };
        if (Array.isArray(historyObj.curation.analytics.send)) {
          historyObj.curation.analytics.send.push(dummy);
        } else {
          historyObj.curation.analytics.send = [ dummy ];
        }
        await back.updateHistory("client", [ { cliid: id }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_updateHistory): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getContentsDetail = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = [ "/getContentsDetail" ];
  obj.func = async function (req, res) {
    try {
      let contents;

      contents = await back.getContentsById(req.body.id);
      const { portfolio, review } = contents.getContentsFlatDetail();

      res.set("Content-Type", "application/json");
      if (req.body.noFlat === undefined) {
        res.send(JSON.stringify([ portfolio, review ]));
      } else {
        res.send(JSON.stringify([ contents.getPortfolioDetail(), contents.getReviewDetail(), contents.getGsArr() ]));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getContentsDetail): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSlack = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, messageSend, errorLog } = this.mother;
  const url = require("url");
  let obj = {};
  obj.link = "/sendSlack";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.message === undefined || req.body.channel === undefined) {
        throw new Error("invalid post");
      }
      const { message, channel } = req.body;
      let text;

      text = message.replace(/__equal__/g, '=').replace(/__amper__/g, '&').replace(/__query__/g, '?').replace(/__plus__/g, '+');

      if (channel === "#error_log") {
        await errorLog(text);
      } else {
        await messageSend({ text, channel, voice: (req.body.voice !== undefined ? true : false), target: (req.body.target !== undefined ? equalJson(req.body).target : null) });
      }

      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_sendSlack): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSheets = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  const { equalJson, errorLog, messageSend } = this.mother;
  const asyncFunc = async (sheetName, parentId, values, tapName) => {
    let sheetsId, result;
    try {
      sheetsId = await sheets.create_newSheets_inPython(sheetName, parentId);
      if (tapName !== undefined) {
        await sheets.update_defaultSheetName_inPython(sheetsId, tapName);
      }
      values = equalJson(values);
      await sheets.update_value_inPython(sheetsId, (tapName !== undefined ? tapName : ''), values, [ 0, 0 ]);
      await sheets.setting_cleanView_inPython(sheetsId);
      result = await drive.read_webView_inPython(sheetsId);
      return result;
    } catch (e) {
      result = "error";
      return result;
    }
  }
  let obj = {};
  obj.link = "/sendSheets";
  obj.func = async function (req, res) {
    res.set("Content-Type", "application/json");
    try {
      if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
        throw new Error("must be sheetName, parentId");
      }
      let sheetsId, response, values, sheetsTargets, tempArr, async;

      if (req.body.multiple === undefined) {
        async = false;
        if (req.body.async !== undefined) {
          async = true;
        }

        if (!async) {
          response = await asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName);
        } else {
          asyncFunc(req.body.sheetName, req.body.parentId, req.body.values, req.body.tapName).then((link) => {
            return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
          }).catch((err) => {
            console.log(err);
          });
          response = "will do";
        }
      } else {
        sheetsTargets = JSON.parse(req.body.values);
        sheetsId = "";
        response = "will do";
        tempArr = [];
        sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId).then((id) => {
          sheetsId = id;
          for (let i = 0; i < sheetsTargets.length; i++) {
            if (i !== 0) {
              tempArr.push(sheetsTargets[i].sheets);
            }
          }
          return sheets.update_defaultSheetName_inPython(sheetsId, sheetsTargets[0].sheets);
        }).then(() => {
          return sheets.add_newSheet_inPython(sheetsId, tempArr);
        }).then(() => {
          return sheets.update_values_inPython(sheetsId, sheetsTargets, [ 0, 0 ]);
        }).then((arr) => {
          return sheets.setting_cleanView_inPython(sheetsId);
        }).then(() => {
          return drive.read_webView_inPython(sheetsId);
        }).then((link) => {
          return messageSend({ text: req.body.sheetName + " => " + link, channel: (req.body.channel === undefined) ? "#general" : req.body.channel });
        }).catch((err) => {
          console.log(err);
        });
      }

      res.send(JSON.stringify({ link: response }));
    } catch (e) {
      errorLog("Console 서버 문제 생김 (rou_post_sendSheets): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createProposalDocument = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { shellExec, shellLink, requestSystem, errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/createProposalDocument" ];
  obj.func = async function (req, res) {
    res.set("Content-Type", "application/json");
    try {

      const { proid } = req.body;
      const proposalLink = "https://" + address.frontinfo.host + "/proposal.php?proid=" + proid + "&mode=test";
      const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const cliid = thisProject.cliid;
      let page, dummy, historyObj;
      let future, now, delta;
      let year, month, date, hour, minute, second;

      if (req.body.retryProposal === undefined) {
        await back.updateProject([ { proid }, { "proposal.date": new Date() } ], { selfMongo: instance.mongo });
      }

      historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      if (historyObj === null) {
        await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
      }
      page = "designerProposal";
      dummy = {
        page,
        date: new Date(),
        mode: null,
        who: {
          name: null,
          email: null,
        }
      };
      if (Array.isArray(historyObj.curation.analytics.send)) {
        historyObj.curation.analytics.send.push(dummy);
      } else {
        historyObj.curation.analytics.send = [ dummy ];
      }
      await back.updateHistory("client", [ { cliid }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });

      if (req.body.year !== undefined && req.body.month !== undefined && req.body.date !== undefined && req.body.hour !== undefined && req.body.minute !== undefined && req.body.second !== undefined) {

        year = Number(req.body.year);
        month = Number(req.body.month);
        date = Number(req.body.date);
        hour = Number(req.body.hour);
        minute = Number(req.body.minute);
        second = Number(req.body.second);
        future = new Date(year, month - 1, date, hour, minute, second);
        now = new Date();
        delta = future.valueOf() - now.valueOf();
        setTimeout(async () => {
          try {
            await shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]);
          } catch (e) {
            console.log(e);
          }
        }, delta);

      } else if (req.body.instant !== undefined) {

        shellExec("node", [ `${process.cwd()}/robot.js`, `webProposal`, proid ]).catch((err) => { console.log(err); });

      } else {

        throw new Error("invaild post");

      }

      res.send(JSON.stringify({ link: proposalLink }));

    } catch (e) {
      errorLog("Console 서버 문제 생김 (rou_post_createProposalDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalLog = function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/proposalLog" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.proid !== "string") {
        throw new Error("invaild post");
      }
      const { proid } = req.body;
      const collection = "proposalLog";
      let rows;

      rows = await back.mongoRead(collection, { proid }, { selfMongo: instance.mongolocal });
      rows.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

      res.send(JSON.stringify(rows.map((obj) => { return obj.project })));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_proposalLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalReset = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const address = this.address;
  const { requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/proposalReset", "/proposalCreate" ];
  obj.func = async function (req, res) {
    try {
      let id, historyObj;
      let requestObj;

      if (req.body.proid === undefined) {
        id = req.body.cliid;
      }
      if (req.body.cliid === undefined) {
        id = req.body.proid;
      }
      if (typeof id !== "string") {
        throw new Error("invaild post");
      }
      if (!/^[cp]/.test(id)) {
        throw new Error("invaild post");
      }

      if (req.url === "/proposalReset") {
        work.proposalReset(id, { selfMongo: instance.mongo, selfLocalBoo: instance.mongolocal }).catch((err) => {
          console.log(err);
        });
        
      } else if (req.url === "/proposalCreate") {
        if (/^c/.test(id)) {
          if (typeof req.body.serid === "string") {
            if (/^s[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(req.body.serid)) {

              historyObj = await back.getHistoryById("client", id, { selfMongo: instance.mongolocal });
              if (historyObj !== null && historyObj.curation.image.length > 0) {

                requestObj = {
                  cliid: id,
                  historyQuery: { "curation.service.serid": [ req.body.serid ] },
                  coreQuery: {},
                  mode: "create",
                  fromConsole: 1,
                };
                if (req.body.silent !== undefined) {
                  requestObj.silent = true;
                }

                requestSystem("https://" + address.backinfo.host + "/styleCuration_updateCalculation", requestObj, { headers: { "origin": "https://" + address.backinfo.host, "Content-Type": "application/json" } }).then(() => {
                  //pass
                }).catch((err) => {
                  console.log(err);
                });
              } else {
                messageSend({ text: id + " 고객님은 스타일 체크를 진행하지 않아 자동으로 제안서를 만들 수 없습니다!", channel: "#403_proposal" }).catch((err) => {
                  console.log(err);
                });
              }

            }
          }
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_proposalReset): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getMembers = function () {
  const instance = this;
  const address = this.address;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/getMembers";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.type !== "string") {
        throw new Error("must be type");
      }
      const membersArr = instance.members;
      let emailArr = [];
      let targetMember = null;

      if (req.body.type === "get") {
        res.send(JSON.stringify(membersArr));
      } else if (req.body.type === "boo") {
        for (let { id, email } of membersArr) {
          for (let e of email) {
            emailArr.push({ email: e, id });
          }
        }

        for (let i = 0; i < emailArr.length; i++) {
          if (req.body.value === emailArr[i].email) {
            for (let j = 0; j < membersArr.length; j++) {
              if (emailArr[i].id === membersArr[j].id) {
                targetMember = membersArr[j];
              }
            }
          }
        }

        //dev------------------------------------------------------
        if (req.body.value === "homeliaisonphoto@gmail.com") {
          targetMember = membersArr[7];
        }
        //---------------------------------------------------------

        if (targetMember === undefined || targetMember === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: targetMember }));
        }

      } else if (req.body.type === "this") {

        if (req.body.mac === undefined) {
          throw new Error("must be mac array");
        }
        const { mac } = equalJson(req.body);
        if (!Array.isArray(mac)) {
          throw new Error("invaild post");
        }
        if (!mac.every((str) => { return typeof str === "string" })) {
          throw new Error("invaild post");
        }
        let thisMemid, thisMap, thisMember;

        thisMemid = null;
        for (let obj of address.officeinfo.map) {
          if (mac.includes(obj.mac) && typeof obj.memid === "string") {
            thisMemid = obj.memid;
            break;
          }
        }

        if (thisMemid !== null) {
          thisMap = address.officeinfo.map.find((obj) => { return obj.memid = thisMemid; })
          thisMember = membersArr.find((obj) => { return obj.id === thisMemid });
          thisMember.memid = thisMember.id;
          thisMember.mac = thisMap.mac;

          res.send((JSON.stringify(thisMember)));
        } else {
          res.send((JSON.stringify({ member: null })));
        }

      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getMembers): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const { shell, shellLink, equalJson } = this.mother;
  const stringToArr = function (dateString) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = dateString.split(' ');
    tempArr1 = tempArr0[0].split('-');
    tempArr2 = tempArr0[1].split(':');
    return [ Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')) ];
  }
  let obj = {};
  obj.link = "/getAnalytics_total";
  obj.func = async function (req, res) {
    try {
      let rangeObj = equalJson(req.body.range);
      let { startDate, endDate } = rangeObj;
      let searchQuery, rows;
      let andSearchQuery, orSearchQuery, search;
      const columns = [
        "userid",
        "userType",
        "campaign",
        "referrer.name",
        "referrer.detail.host",
        "referrer.raw",
        "device.type",
        "device.os",
        "device.mobileDevice",
        "region.country",
        "region.city",
      ];
      let temp;

      startDate = new Date(...stringToArr(startDate));
      endDate = new Date(...stringToArr(endDate));
      searchQuery = { "latestTimeline": { "$gte": startDate, "$lte": endDate } };

      if (rangeObj.search !== undefined) {
        andSearchQuery = {};
        andSearchQuery["$and"] = [];
        andSearchQuery["$and"].push(searchQuery);

        orSearchQuery = {};
        orSearchQuery["$or"] = [];
        for (let c of columns) {
          temp = {};
          temp[c] = { "$regex": rangeObj.search };
          orSearchQuery["$or"].push(temp);
        }

        andSearchQuery["$and"].push(orSearchQuery);
      } else {
        andSearchQuery = searchQuery;
      }

      rows = await instance.back.mongoRead("googleAnalytics_total", andSearchQuery, { home: true });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingLatestLog = function () {
  const instance = this;
  const { fileSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = "/parsingLatestLog";
  obj.func = async function (req, res) {
    try {
      if (req.body.idArr === undefined) {
        throw new Error("must be id arr: Array");
      }
      const logDir = `${instance.dir}/log`;
      const idArr = equalJson(req.body.idArr);
      const logAll = await fileSystem(`readDir`, [ logDir ]);

      let logParsing, logIdArr;
      let result;
      let tempArr;
      let index;

      logParsing = [];
      logIdArr = [];
      for (let log of logAll) {
        if (log !== `.DS_Store`) {
          tempArr = log.split("__name__");
          logParsing.push({ id: tempArr[0], name: tempArr[1] });
          logIdArr.push(tempArr[0]);
        }
      }

      result = [];
      for (let id of idArr) {
        index = logIdArr.indexOf(id);
        if (index === -1) {
          result.push("-");
        } else {
          result.push(logParsing[index].name);
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_parsingLatestLog): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingProposal = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  let obj = {};
  obj.link = "/parsingProposal";
  obj.func = async function (req, res) {
    try {
      if (req.body.id === undefined || req.body.serid === undefined) {
        throw new Error("must be cliid, seridNumber");
      }
      const selected = await work.designerCuration(req.body.id, 4, [ `s2011_aa0${req.body.serid}s` ], { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal });
      if (!Array.isArray(selected)) {
        throw new Error(selected);
      }
      res.set("Content-Type", "application/json");
      if (selected.length === 0) {
        res.send(JSON.stringify({ result: null }));
      } else {
        res.send(JSON.stringify({ result: { proposal: selected } }));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_parsingProposal): " + e.message).catch((e) => { console.log(e); });
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ result: null }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_alimTalk = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = "/alimTalk";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": '*',
    });
    try {
      if (req.body.method === undefined || req.body.name === undefined || req.body.phone === undefined) {
        throw new Error("must be method, name, phone");
      }
      const requestObj = req.body;
      let option;
      if (req.body.option === undefined) {
        option = {};
      } else {
        option = equalJson(req.body.option);
        if (/ADDRESS\[/g.test(option.host)) {
          if (/\(ghost\)/gi.test(option.host)) {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].ghost.host;
          } else {
            option.host = instance.address[option.host.replace(/ADDRESS\[/gi, '').replace(/\]/g, '').replace(/\([^\(\)]+\)/g, '')].host;
          }
        }
      }
      await instance.kakao.sendTalk(req.body.method, req.body.name, req.body.phone, option);
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_alimTalk): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendCertification = function () {
  const instance = this;
  const back = this.back;
  const human = this.human;
  const kakao = this.kakao;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/sendCertification" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const { name, phone, certification } = req.body;

      errorLog("인증번호 요청 감지 : " + name + " / " + phone + " / " + certification).catch((e) => { console.log(e); });

      human.sendSms({
        to: phone,
        body: "[홈리에종] 안녕하세요! " + name + "님,\n휴대폰 인증번호를 보내드립니다.\n\n인증번호 : " + certification + "\n\n인증번호를 팝업창에 입력해주세요!"
      }).then(() => {
        return errorLog("인증번호 문자 전송 완료");
      }).catch((e) => { console.log(e); });

      kakao.sendTalk("certification", name, phone, {
        company: "홈리에종",
        name,
        certification
      }).then(() => {
        return errorLog("인증번호 카카오 전송 완료");
      }).catch((e) => { console.log(e); });

      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      errorLog("Console 서버 문제 생김 (rou_post_sendCertification): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_clientSubmit = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, stringToDate, errorLog, messageSend, messageLog, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/clientSubmit" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const { map } = equalJson(req.body);
      const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ];
      const ignorePhone = [ "010-2747-3403" ];
      const overlapStandardHours = 12;
      const defaultPyeong = 34;
      const moveinConst0 = 60;
      const moveinConst1 = 10;

      let ifOverlap;
      let requestObject;
      let name;
      let phone;
      let address0;
      let address1;
      let email;
      let pyeong;
      let movein;
      let living;
      let etc;
      let future;
      let expectedStart;
      let requestArr;
      let pastRequests;
      let cliid;
      let message;
      let thisClient;
      let googleId;
      let overlapTimeline;

      name = map.find((obj) => { return obj.property === "name" });
      phone = map.find((obj) => { return obj.property === "phone" });
      address0 = map.find((obj) => { return obj.property === "address0" });
      address1 = map.find((obj) => { return obj.property === "address1" });
      email = map.find((obj) => { return obj.property === "email" });
      pyeong = map.find((obj) => { return obj.property === "pyeong" });
      movein = map.find((obj) => { return obj.property === "movein" });
      living = map.find((obj) => { return obj.property === "living" });
      etc = map.find((obj) => { return obj.property === "etc" });
      googleId = map.find((obj) => { return obj.property === "googleId" });

      if (name === undefined || phone === undefined || address0 === undefined || address1 === undefined || email === undefined || pyeong === undefined || movein === undefined || living === undefined || etc === undefined) {
        throw new Error("invaild post");
      }

      name = name.value.trim();
      phone = phone.value.trim();
      address0 = address0.value.trim();
      address1 = address1.value.trim();
      email = email.value.trim();
      pyeong = pyeong.value.trim();
      movein = movein.value.trim();
      living = living.value.trim();
      etc = etc.value.trim();
      if (googleId === undefined) {
        googleId = "";
      } else {
        googleId = googleId.value.trim();
      }

      requestObject = {};

      requestObject["name"] = name.replace(/[^가-힣]/gi, '')
      requestObject["phone"] = phone.replace(/[^0-9\-]/gi, '');
      requestObject["email"] = email;

      requestObject["requests.0.request.space.address"] = address0 + " " + address1;
      requestObject["requests.0.request.family"] = "";

      requestObject["requests.0.request.budget"] = budgetArr[0];

      if (Number.isNaN(Number(pyeong.replace(/[^0-9\.]/gi, ''))) || Number(pyeong.replace(/[^0-9\.]/gi, '')) === 0) {
        requestObject["requests.0.request.space.pyeong"] = defaultPyeong;
      } else {
        requestObject["requests.0.request.space.pyeong"] = Number(pyeong.replace(/[^0-9\.]/gi, ''));
      }

      if (/거주중/gi.test(living)) {
        requestObject["requests.0.request.space.resident.living"] = true;
        requestObject["requests.0.request.space.resident.expected"] = new Date();
        future = new Date();
        future.setDate(future.getDate() + moveinConst0);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      } else {
        requestObject["requests.0.request.space.resident.living"] = false;
        requestObject["requests.0.request.space.resident.expected"] = stringToDate(movein);
        future = stringToDate(movein);
        future.setDate(future.getDate() + moveinConst1);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      }

      expectedStart = new Date(future.getFullYear(), future.getMonth(), future.getDate(), future.getHours(), future.getMinutes(), future.getSeconds());
      expectedStart = expectedStart.setDate(expectedStart.getDate() - moveinConst0);
      if (!requestObject["requests.0.request.space.resident.living"] && expectedStart.valueOf() <= (new Date()).valueOf()) {
        // requestObject["requests.0.request.space.resident.living"] = true;
        requestObject["requests.0.request.space.resident.expected"] = new Date();
        future = new Date();
        future.setDate(future.getDate() + moveinConst0);
        requestObject["requests.0.analytics.date.space.movein"] = future;
      }

      requestObject["requests.0.request.space.contract"] = "자가";
      requestObject["requests.0.request.space.spec.room"] = 3;
      requestObject["requests.0.request.space.spec.bathroom"] = 2;
      requestObject["requests.0.request.space.spec.valcony"] = false;

      requestObject["requests.0.request.etc.comment"] = etc;
      requestObject["requests.0.request.etc.channel"] = "인터넷 검색";
      requestObject["requests.0.request.timeline"] = new Date();

      requestObject["requests.0.analytics.googleAnalytics.userType"] = googleId;

      message = '';
      ifOverlap = await back.getClientsByQuery({ phone }, { selfMongo });
      if (ifOverlap.length > 0) {

        cliid = ifOverlap[0].cliid;

        pastRequests = (ifOverlap[0].toNormal()).requests;
        overlapTimeline = new Date(JSON.stringify(pastRequests[0].request.timeline).slice(1, -1));
        overlapTimeline.setHours(overlapTimeline.getHours() + overlapStandardHours);

        if (overlapTimeline.valueOf() < (new Date()).valueOf()) {
          requestArr = [];
          for (let z = 0; z < pastRequests.length; z++) {
            requestArr.push(pastRequests[z]);
          }
          requestArr.unshift(back.returnClientRequest());
          await back.updateClient([ { cliid }, { "requests": requestArr } ], { selfMongo });
        }

        await back.updateClient([ { cliid }, requestObject ], { selfMongo });

        message += "재문의가 왔습니다!\n";

      } else {

        cliid = await back.createClient(requestObject, { selfMongo });
        await back.createHistory("client", { cliid, space: "최초 고객이 적은 주소 : " + requestObject["requests.0.request.space.address"] }, { selfMongo: instance.mongolocal });
        message += "새로운 상담 문의가 왔습니다!\n";

      }

      instance.parsingAddress(cliid, requestObject["requests.0.request.space.address"], instance.mongo).then((r) => {
        const { result, id } = r;
        if (!result) {
          return messageSend({ text: "표준 주소 체계 위반 사례, 바르게 고쳐주세요! : https://" + instance.address.backinfo.host + "/client?cliid=" + id, channel: "#401_consulting" });
        }
      }).catch((err) => {
        errorLog("주소 연산 중 오류 생김 : " + err.message).catch((e) => { console.log(e); });
        console.log(err);
      });

      back.getCaseProidById(cliid, { selfMongo }).then((clientCase) => {
        if (clientCase !== null) {
          const serviceCase = clientCase.caseService();
          if (serviceCase !== null) {
            const { serid, xValue } = serviceCase;
            let whereQuery, updateQuery;
            whereQuery = { cliid };
            updateQuery = { "requests.0.analytics.response.service.serid": serid[0].serid, "requests.0.analytics.response.service.xValue": xValue[0].xValue };
            return back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          } else {
            return (new Promise((resolve, reject) => { resolve("fail"); }));
          }
        } else {
          return (new Promise((resolve, reject) => { resolve("fail"); }));
        }
      }).then((message) => {
        console.log(cliid, "case update " + message);
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (submit, case 연산) : " + err.message).catch((e) => { console.log(e); });
      });

      thisClient = await back.getClientById(cliid, { selfMongo, withTools: true });
      message += thisClient.toMessage();
      message += "\n";
      message += "구글 아이디 : " + googleId;
      await messageSend({ text: message, channel: "#401_consulting" });
      await requestSystem("https://" + instance.address.testinfo.host + "/marketingMessage", {
        text: message,
        channel: "#consulting",
      }, {
        headers: { "Content-Type": "application/json" }
      });

      requestSystem("https://" + instance.address.secondinfo.host + ":" + String(3000) + "/voice", { text: message.split("\n")[0] + " 성함은 " + thisClient.name + "입니다!" }, { headers: { "Content-Type": "application/json" } }).catch((err) => { console.log(err); });

      res.send(JSON.stringify({ cliid }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_sendCertification): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDesignerGhost = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/getDesignerGhost";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined) {
        throw new Error("must be desid");
      }
      const { desid } = req.body;
      let result, final, tempArr, tempObj;

      result = await back.mongoRead("foreContents", { desid }, { selfMongo: instance.mongolocal });

      final = [];
      for (let { forecast } of result) {
        tempArr = [];
        for (let { file, gs } of forecast) {
          tempObj = {};
          tempObj.link = file;
          tempObj.sgTrue = gs;
          tempArr.push(tempObj);
        }
        final.push(tempArr);
      }

      if (req.body.mode === undefined || req.body.mode === null || req.body.mode === "list") {
        res.send(JSON.stringify(final));
      } else if (req.body.mode === "full") {
        res.send(JSON.stringify(result));
      }

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getDesignerGhost): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = "/webHookPayment";
  obj.public = true;
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      const impId = req.body.imp_uid;
      const oid = req.body.merchant_uid;
      const mid = address.officeinfo.inicis.mid;
      const status = req.body.status;
      if (typeof status === "string") {
        if (/paid/gi.test(status)) {
          if (!/mini_/g.test(oid)) {
            const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
            const bill = new BillMaker();
            const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
              imp_key: address.officeinfo.import.key,
              imp_secret: address.officeinfo.import.secret
            }, { headers: { "Content-Type": "application/json" } }));
            const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
              method: "get",
              headers: { "Authorization": accessToken }
            });
            const { buyer_tel, paid_at } = paymentData;
            const today = new Date();
            const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
            messageSend({ text: JSON.stringify(paymentData, null, 2), channel: "#error_log" }).catch((e) => { console.log(e); });
            const convertingData = {
              goodName: paymentData.name,
              goodsName: paymentData.name,
              resultCode: (paymentData.status.trim() === "paid" ? "0000" : "4000"),
              resultMsg: (paymentData.status.trim() === "paid" ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
              tid: paymentData.pg_tid,
              payMethod: "CARD",
              applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
              mid: mid,
              MOID: oid,
              TotPrice: String(paymentData.amount),
              buyerName: paymentData.buyer_name,
              CARD_BankCode: paymentData.card_code,
              CARD_Num: paymentData.card_number,
              CARD_ApplPrice: String(paymentData.amount),
              CARD_Code: paymentData.card_code,
              vactBankName: paymentData.card_name,
              payDevice: "MOBILE",
              P_FN_NM: paymentData.card_name,
            };
            const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo });
            let requestNumber;
            if (clients.length > 0) {
              const [ client ] = clients;
              const projects = await back.getProjectsByQuery({ $and: [ { cliid: client.cliid } ] }, { selfMongo });
              if (projects.length > 0) {
                const [ project ] = projects;
                let bills;
                bills = await bill.getBillsByQuery({ $and: [
                    { "links.proid": project.proid },
                    { "links.cliid": client.cliid },
                    { "links.method": project.service.online ? "online" : "offline" }
                  ]
                });
                if (bills.length === 0) {
                  bills = await bill.getBillsByQuery({ $and: [
                      { "links.proid": project.proid },
                      { "links.cliid": client.cliid },
                    ]
                  });
                }
                if (bills.length > 0) {
                  const [ thisBill ] = bills;
                  requestNumber = 0;
                  for (let i = 0; i < thisBill.requests.length; i++) {
                    if (convertingData.goodName === thisBill.requests[i].name) {
                      requestNumber = i;
                      break;
                    }
                  }
                  await requestSystem("https://" + address.pythoninfo.host + ":3000/ghostClientBill", {
                    bilid: thisBill.bilid,
                    requestNumber,
                    data: convertingData
                  }, { headers: { "Content-Type": "application/json" } });
                } else {
                  throw new Error("cannot find bills (from links.proid and links.cliid)");
                }
              }
            }
          }
        }
      }

      res.send(JSON.stringify({ "message": "ok" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_webHookPayment): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ "message": "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookGoogle = function () {
  const instance = this;
  const back = this.back;
  const { mongo, mongoconsoleinfo, requestSystem, messageLog } = this.mother;
  const uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle = "a19OyoZjf9xQJXykapple3kE5ySgBW39IjxQJXyk3homeliaisonkE5uf9uuuySgBW3ULXHF1CdjxGGPCQJsubwayXyk3kE5ySgBW3f9y2Y2lotionpuk0dQF9ruhcs";
  const coreTargets = [ "designer", "project", "contents", "service" ];
  let obj = {};
  obj.link = "/webHookGoogle";
  obj.public = true;
  obj.func = async function (req, res) {
    try {
      let boo;
      res.set({ "Content-Type": "application/json" });
      if (req.body.who === "uragen" && req.body.where === "homeliaison" && req.body.uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle === uragenGhostFinalRandomAccessKeyArraySubwayHomeLiaisonStyle) {
        if (req.body.mode === "read" || req.body.mode === "update" || req.body.mode === "create") {
          if (req.body.collection === undefined || req.body.collection === null) {
            res.send(JSON.stringify({ "message": "error" }));
          } else {
            if (typeof req.body.collection !== "string") {
              res.send(JSON.stringify({ "message": "error" }));
            } else {
              if (Array.isArray(req.body.queries)) {
                boo = true;
                for (let obj of req.body.queries) {
                  if (typeof obj !== "object") {
                    boo = false;
                  } else {
                    if (obj.whereQuery === undefined || obj.updateQuery === undefined) {
                      boo = false;
                    } else {
                      if (typeof obj.whereQuery !== "object" || typeof obj.updateQuery !== "object") {
                        boo = false;
                      } else {
                        boo = true;
                      }
                    }
                  }
                }
                if (boo) {
                  if (coreTargets.includes(req.body.collection)) {
                    for (let { whereQuery, updateQuery } of req.body.queries) {
                      await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo: instance.mongo });
                      console.log(whereQuery, updateQuery);
                    }
                  } else {
                    const selfMongo = new mongo(mongoconsoleinfo, { useUnifiedTopology: true });
                    await selfMongo.connect();
                    for (let { whereQuery, updateQuery } of req.body.queries) {
                      await back.mongoUpdate(req.body.collection, [ whereQuery, updateQuery ], { selfMongo });
                    }
                    await selfMongo.close();
                  }
                  messageLog("시트로부터의 업데이트 감지 : " + req.body.collection).catch((e) => { console.log(e); });
                  res.send(JSON.stringify({ "message": "ok" }));
                } else {
                  res.send(JSON.stringify({ "message": "error" }));
                }
              } else {
                res.send(JSON.stringify({ "message": "error" }));
              }
            }
          }
        } else {
          res.send(JSON.stringify({ "message": "error" }));
        }
      } else {
        res.send(JSON.stringify({ "message": "error" }));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_webHookGoogle): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalMongo = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = "/generalMongo";
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }
      if (req.body.collection === undefined) {
        throw new Error("must be collection name");
      }
      if (req.body.db === undefined) {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }
      const { mode, db, collection } = req.body;
      let selfMongo, result;
      let whereQuery, updateQuery;
      let ip, device, logObject;
      let updateQueries;
      let order;

      if (db === "core" || db === "back" || db === "mongo") {
        selfMongo = instance.mongo;
      } else if (db === "sub" || db === "local" || db === "console") {
        selfMongo = instance.mongolocal;
      } else {
        throw new Error("must be db name => ( [ core, back, mongo ] => instance.mongo or [ sub, local, console ] => instance.mongolocal )");
      }

      if (mode === "read") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
      } else if (mode === "update") {
        if (req.body.whereQuery === undefined || req.body.updateQuery === undefined) {
          throw new Error("must be whereQuery and updateQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        updateQuery = equalJson(req.body.updateQuery);
        result = await back.mongoRead(collection, whereQuery, { selfMongo });
        if (result.length !== 0) {
          await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        }
        result = { message: "done" };
      } else if (mode === "create") {
        if (req.body.updateQuery === undefined) {
          throw new Error("must be updateQuery");
        }
        updateQuery = equalJson(req.body.updateQuery);
        await back.mongoCreate(collection, updateQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "delete") {
        if (req.body.whereQuery === undefined) {
          throw new Error("must be whereQuery");
        }
        whereQuery = equalJson(req.body.whereQuery);
        await back.mongoDelete(collection, whereQuery, { selfMongo });
        result = { message: "done" };
      } else if (mode === "sse") {
        if (req.body.updateQueries === undefined) {

          if (req.body.updateQuery === undefined) {
            throw new Error("must be updateQuery");
          }
          updateQuery = equalJson(req.body.updateQuery);
          result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
          if (result.length === 0) {
            await back.mongoCreate(collection, { id: "sse", order: [ JSON.stringify(updateQuery) ] }, { selfMongo });
          } else {
            result[0].order.push(JSON.stringify(updateQuery));
            await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
          }

        } else {

          updateQueries = equalJson(req.body.updateQueries);
          if (!Array.isArray(updateQueries)) {
            throw new Error("updateQueries must be updateQuery array");
          }
          if (!updateQueries.every((obj) => { return typeof obj === "object" })) {
            throw new Error("updateQueries must be updateQuery array");
          }
          result = await back.mongoRead(collection, { id: "sse" }, { selfMongo });
          if (result.length === 0) {
            order = [];
            for (let updateQuery of updateQueries) {
              order.push(JSON.stringify(updateQuery));
            }
            await back.mongoCreate(collection, { id: "sse", order }, { selfMongo });
          } else {
            for (let updateQuery of updateQueries) {
              result[0].order.push(JSON.stringify(updateQuery));
            }
            await back.mongoUpdate(collection, [ { id: "sse" }, { order: result[0].order } ], { selfMongo });
          }
          updateQuery = updateQueries;

        }

        await fileSystem(`write`, [ instance.dir + "/log/" + collection + "_latest.json", JSON.stringify([ 0 ]) ]);
        if (req.body.log !== undefined) {
          if (req.body.who === undefined) {
            throw new Error("in log, must be who");
          }
          ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          device = req.headers['user-agent'] || "unknown";
          logObject = {
            date: (new Date()),
            who: req.body.who,
            where: { ip, device },
            update: JSON.stringify(updateQuery)
          };
          await back.mongoCreate(collection.replace(/^sse\_/, "log_"), logObject, { selfMongo });
        }
        result = { message: "done" };

      } else {
        throw new Error("must be mode => [ create, read, update, delete, sse ]");
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_generalMongo): " + e.message).catch((e) => { console.log(e); });
      res.send({ message: "error" });
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalCalendar = function () {
  const instance = this;
  const back = this.back;
  const calendar = this.calendar;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/makeSchedule", "/listSchedule", "/updateSchedule", "/deleteSchedule" ];
  obj.func = async function (req, res) {
    try {
      let resultObj;
      if (req.url === "/makeSchedule") {
        if (req.body.to === undefined || req.body.title === undefined || req.body.start === undefined) {
          throw new Error("invaild body");
        }
        const { to, title } = req.body;
        const start = new Date(req.body.start.replace(/"/g, ''));
        const end = (req.body.end !== undefined) ? new Date(req.body.end.replace(/"/g, '')) : null;
        const description = (req.body.description !== undefined) ? req.body.description : "";
        resultObj = await calendar.makeSchedule(to, title, description, start, end);
      } else if (req.url === "/listSchedule") {
        if (req.body.from === undefined) {
          throw new Error("invaild body");
        }
        const { from } = req.body;
        const search = (req.body.search !== undefined) ? req.body.search : null;
        resultObj = await calendar.listEvents(from, search);
      } else if (req.url === "/updateSchedule") {
        if (req.body.from === undefined || req.body.id === undefined || req.body.updateQuery === undefined) {
          throw new Error("invaild body");
        }
        const { from, id } = req.body;
        const updateQuery = equalJson(req.body.updateQuery);
        await calendar.updateSchedule(from, id, updateQuery);
        resultObj = { "message": "done" };
      } else {
        if (req.body.from === undefined || req.body.id === undefined) {
          throw new Error("invaild body");
        }
        const { from, id } = req.body;
        await calendar.deleteSchedule(from, id);
        resultObj = { "message": "done" };
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_generalCalendar): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingAddress = function () {
  const instance = this;
  const AddressParser = require(`${process.cwd()}/apps/addressParser/addressParser.js`);
  const addressApp = new AddressParser();
  const back = this.back;
  const calendar = this.calendar;
  const { equalJson, autoComma, fileSystem } = this.mother;
  let obj = {};
  obj.link = [ "/parsingAddress" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.mode === undefined) {
        throw new Error("must be mode => inspection, distance");
      }
      const { mode } = req.body;
      let result;

      if (mode === "inspection") {
        if (req.body.addressArr === undefined) {
          throw new Error("must be addressArr");
        }
        const addressArr = equalJson(req.body.addressArr);
        const liteMode = req.body.liteMode === undefined ? false : (typeof req.body.liteMode === "string" ? req.body.liteMode === "true" : req.body.liteMode);
        for (let obj of addressArr) {
          if (obj.id === undefined || obj.address === undefined) {
            throw new Error("invaild address array => [ { id, address }... ]");
          }
          result = await addressApp.addressInspection(addressArr, liteMode);
        }
      } else if (mode === "distance") {
        if (req.body.from === undefined || req.body.to === undefined) {
          throw new Error("must be from, to");
        }
        const { from, to } = req.body;
        result = await addressApp.getTravelExpenses(from, to, { selfMongo: instance.mongolocal });
      } else if (mode === "sample" || mode === "samples") {
        const priceStandard = await back.mongoRead(`designerPrice`, { key: 33 }, { selfMongo: instance.mongolocal });
        const { travel: { unit, consulting } } = priceStandard[0];
        let travelSamples_min, temp, amount, tong;
        travelSamples_min = await fileSystem(`readJson`, [ addressApp.samples.travelMin ]);
        for (let obj of travelSamples_min) {
          temp = (unit.meters * obj.distance * 2) + (unit.seconds * obj.time * 2);
          amount = (Math.round(temp / 1000) * 1000) + (consulting.hours * consulting.labor);
          obj.amount = amount;
          obj.amountString = autoComma(amount) + '원';
        }
        tong = { standard: {  unit, consulting } };
        for (let obj of travelSamples_min) {
          if (tong[obj.desid] === undefined) {
            tong[obj.desid] = {};
            tong[obj.desid].detail = [];
          }
          tong[obj.desid].detail.push(obj);
          tong[obj.desid].designer = obj.designer;
          tong[obj.desid].desid = obj.desid;
          tong[obj.desid].address = obj.from;
        }
        tong.designers = [];
        for (let i in tong) {
          if (i !== "designers" && i !== "standard") {
            tong.designers.push(equalJson(JSON.stringify(tong[i])));
            delete tong[i];
          }
        }
        result = tong;
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_parsingAddress): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeClient = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/realtimeClient" ];
  obj.func = async function (req, res) {
    try {
      if (!req.body.hasOwnProperty("method")) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongolocal;
      const { method } = req.body;
      const members = instance.members;
      const emptyCliid = "c0000_aa00s";
      const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }
      const dateToKey = function (date) {
        if (!(date instanceof Date)) {
          throw new Error("input => Date: date");
        }
        return Number(String(date.getFullYear()) + zeroAddition(date.getMonth() + 1) + zeroAddition(date.getDate()));
      }
      const returnModel = function (date, standard, clientSide, manager) {
        if (!(date instanceof Date) || !Array.isArray(standard) || !Array.isArray(manager)) {
          throw new Error("input => Date: date, Array: standard, Array: manager");
        }
        let key, caution, matrix;
        key = dateToKey(date);
        caution = (new Array(standard.length)).fill(null, 0);
        matrix = caution.map((i) => { return (new Array(manager.length).fill(null, 0)); });
        return { key, year: date.getFullYear(), month: date.getMonth() + 1, standard, clientSide, caution, manager, matrix };
      }
      class SearchArray extends Array {
        find(q) {
          let target = null;
          for (let i of this) {
            if (i.cliid === q) {
              target = q;
              break;
            }
          }
          return target;
        }
      }
      const manager = [ "m1701_aa01s", "m1707_aa01s", "m1810_aa01s", "m2012_aa01s", "m2101_aa01s" ];
      const managerMain = [ 3, 4 ];
      const clientSide = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
      ];
      const standard = [
        [
          [ 11, 0 ],
          [ 11, 30 ]
        ],
        [
          [ 11, 30 ],
          [ 12, 0 ]
        ],
        [
          [ 13, 30 ],
          [ 14, 0 ]
        ],
        [
          [ 14, 0 ],
          [ 14, 30 ]
        ],
        [
          [ 14, 30 ],
          [ 15, 0 ]
        ],
        [
          [ 15, 0 ],
          [ 15, 30 ]
        ],
        [
          [ 15, 30 ],
          [ 16, 0 ]
        ],
        [
          [ 16, 0 ],
          [ 16, 30 ]
        ],
        [
          [ 16, 30 ],
          [ 17, 0 ]
        ],
        [
          [ 17, 0 ],
          [ 17, 30 ]
        ],
        [
          [ 17, 30 ],
          [ 18, 0 ]
        ],
        [
          [ 18, 0 ],
          [ 18, 30 ]
        ],
        [
          [ 18, 30 ],
          [ 19, 0 ]
        ],
        [
          [ 19, 0 ],
          [ 19, 30 ]
        ],
        [
          [ 19, 30 ],
          [ 20, 0 ]
        ],
      ];
      const listKey = 99999999;
      const collection = "realtimeClient";
      let result, rows, cliidArr, clients;
      let updateIdIndex;
      let tempDate;
      let boo, boo2, thisObj;
      let bookList;
      let tempRows, tempRow;
      let memberIndex;

      if (method === "get") {
        if (req.body.date === undefined) {
          throw new Error("invaild post");
        }
        const { date } = equalJson(req.body);
        rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
        if (rows.length === 0) {
          result = returnModel(date, standard, clientSide, manager);
          await back.mongoCreate(collection, result, { selfMongo });
        } else {
          result = rows[0];
        }

        result.standard = result.standard.map((arr) => {
          const [ from, to ] = arr;
          const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
          return (arrToString(from) + "  ~  " + arrToString(to));
        });

        if (req.body.member === undefined) {

          result.matrix = result.matrix.map((arr) => {
            let tong;
            tong = [];
            for (let number of managerMain) {
              tong.push(arr[number]);
            }
            return tong;
          });

        } else {

          memberIndex = manager.findIndex((i) => { return i === req.body.member; });
          if (memberIndex === undefined) {
            memberIndex = 0;
          }

          for (let i = 0; i < result.caution.length; i++) {
            if (typeof result.caution[i] === "string") {
              if (!result.matrix[i].includes(result.caution[i])) {
                result.matrix[i].fill(result.caution[i]);
              }
            }
          }

          result.matrix = result.matrix.map((arr) => {
            let tong;
            tong = [];
            tong.push(arr[memberIndex]);
            return tong;
          });

        }

        result.matrix = result.matrix.map((arr) => {
          let r;
          r = arr.find((z) => { return z !== null });
          if (r !== undefined && r !== null) {
            return r;
          } else {
            return emptyCliid;
          }
        });
        cliidArr = result.matrix.filter((i) => { return i !== emptyCliid; });
        cliidArr = cliidArr.map((id) => { return { cliid: id }; });
        if (cliidArr.length !== 0) {
          clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: instance.mongo, withTools: true });
        } else {
          clients = new SearchArray();
        }
        result.matrix = result.matrix.map((id) => {
          let client;
          client = clients.search(id);
          if (client !== undefined && client !== null) {
            return { name: client.name, cliid: client.cliid };
          } else {
            return { name: "미정", cliid: emptyCliid };
          }
        });

      } else if (method === "update") {

        if (req.body.date === undefined || req.body.update === undefined) {
          throw new Error("invaild post");
        }
        let { date, update } = equalJson(req.body);
        update = equalJson(update);
        if (update.cliid === undefined || update.index === undefined) {
          throw new Error("invaild update object");
        }

        const { cliid, index } = update;
        let member = (update.member !== undefined ? update.member : null);

        tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
        if (tempRows.length === 0) {
          throw new Error("invaild db");
        }
        bookList = tempRows[0];
        if (member === null) {
          if (bookList.book[cliid] !== undefined) {
            tempRows = await back.mongoRead(collection, { key: bookList.book[cliid] }, { selfMongo });
            if (tempRows.length === 0) {
              throw new Error("invaild db");
            }
            tempRow = tempRows[0];
            tempRow.caution = tempRow.caution.map((id) => {
              if (id === cliid) {
                return null;
              } else {
                return id;
              }
            });
            tempRow.matrix = tempRow.matrix.map((arr) => {
              if (arr.includes(cliid)) {
                return arr.map((id) => {
                  if (id === cliid) {
                    return null;
                  } else {
                    return id;
                  }
                });
              } else {
                return arr;
              }
            });
            await back.mongoUpdate(collection, [ { key: bookList.book[cliid] }, { caution: tempRow.caution, matrix: tempRow.matrix } ], { selfMongo });
          }
        }

        rows = await back.mongoRead(collection, { key: dateToKey(date) }, { selfMongo });
        if (rows.length !== 0) {
          result = rows[0];
          if (member !== null) {
            updateIdIndex = result.manager.findIndex((m) => { return m === member; });
            if (updateIdIndex !== undefined && updateIdIndex !== null) {
              if (updateIdIndex >= 0) {
                result.matrix[index][updateIdIndex] = cliid;
                await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { matrix: result.matrix } ], { selfMongo });
              }
            }
          } else {
            if (update.name === undefined) {
              throw new Error("invaild post");
            }

            result.standard = result.standard.map((arr) => {
              const [ from, to ] = arr;
              const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
              return (arrToString(from) + " ~ " + arrToString(to));
            });

            await messageSend({ text: `${update.name}(${cliid}) 고객님이 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일 ${result.standard[index]}에 응대 예약을 하셨습니다! 담당자 지정을 부탁드리겠습니다!`, channel: "#400_customer" });
            result.caution[index] = cliid;
            await back.mongoUpdate(collection, [ { key: dateToKey(date) }, { caution: result.caution } ], { selfMongo });
          }
          bookList.book[cliid] = dateToKey(date);
          await back.mongoUpdate(collection, [ { key: listKey }, { book: bookList.book } ], { selfMongo });

        } else {
          throw new Error("invaild db");
        }
        result = { message: "done" };

      } else if (method === "standard") {
        result = standard.map((arr) => {
          const [ from, to ] = arr;
          const arrToString = (a) => { return zeroAddition(a[0]) + ':' + zeroAddition(a[1]); }
          return (arrToString(from) + "  ~  " + arrToString(to));
        });
      } else if (method === "range") {

        if (req.body.year === undefined || req.body.month === undefined) {
          throw new Error("invaild post");
        }
        const year = Number(req.body.year);
        const month = Number(req.body.month);
        const today = new Date();
        rows = await back.mongoRead(collection, { $and: [ { year }, { month } ] }, { selfMongo });
        result = [];
        for (let i = 0; i < 31; i++) {
          tempDate = new Date(year, month - 1, i + 1, standard.flat(2)[standard.flat(2).length - 2], standard.flat(2)[standard.flat(2).length - 1]);
          if (tempDate.getMonth() + 1 === month) {

            if (tempDate.getDay() === 0 || tempDate.getDay() === 6 || today.valueOf() > tempDate.valueOf()) {
              result.push(false);
            } else {
              boo = false;
              for (let r of rows) {
                if (r.key === dateToKey(tempDate)) {
                  thisObj = r;
                  boo = true;
                }
              }
              if (boo) {
                boo2 = false;
                for (let number of managerMain) {
                  boo2 = thisObj.matrix[number].includes(null);
                  if (boo2) {
                    break;
                  }
                }
                result.push(boo2);
              } else {
                result.push(true);
              }
            }
          }
        }

      } else if (method === "manager") {
        result = manager;
      } else if (method === "list") {
        tempRows = await back.mongoRead(collection, { key: listKey }, { selfMongo });
        if (tempRows.length === 0) {
          throw new Error("invaild db");
        }
        const { book } = tempRows[0];
        result = book;
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_realtimeClient): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeDesigner = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const { equalJson, fileSystem } = this.mother;
  let obj = {};
  obj.link = [ "/realtimeDesigner" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string") {
        throw new Error("invaild post");
      }
      if (![ "get", "sync", "update" ].includes(req.body.mode)) {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      const collection = "realtimeDesigner";
      let rows;
      let desid, proid;
      let result;
      let response;

      if (mode === "get") {

        if (req.body.desid === undefined) {
          throw new Error("invaild post");
        }
        desid = req.body.desid;
        rows = await back.mongoRead(collection, { desid }, { selfMongo: instance.mongolocal });
        if (rows.length > 0) {
          result = rows[0];
        } else {
          result = {};
        }

      } else if (mode === "sync") {

        if (req.body.proid === undefined) {
          throw new Error("invaild post");
        }
        proid = req.body.proid;
        response = await work.realtimeDesignerSync(proid, { selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal });
        if (response.message === "success") {
          result = { message: "success" };
        } else {
          throw new Error(JSON.stringify(response));
        }

      } else if (mode === "update") {

        if (req.body.desid === undefined) {
          throw new Error("invaild post");
        }
        if (req.body.updateQuery === undefined) {
          throw new Error("invaild post");
        }
        const { desid, updateQuery } = equalJson(req.body);
        await back.mongoUpdate(collection, [ { desid }, updateQuery ], { selfMongo: instance.mongolocal });
        result = { message: "done" };

      }

      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_realtimeDesigner): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerFee = function () {
  const instance = this;
  const work = this.work;
  const back = this.back;
  const { equalJson, serviceParsing, dateToString } = this.mother;
  let obj = {};
  obj.link = [ "/designerFee" ];
  obj.func = async function (req, res) {
    try {
      const option = { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal };
      if (req.body.matrix === undefined) {
        throw new Error("must be matrix");
      }
      const matrix = equalJson(req.body.matrix);
      const dateMargin = 10;
      let resultObj, temp;
      let project, thisProposal;
      let designerRealtime;

      if (req.body.frontMode === 1 || req.body.frontMode === '1') {
        option.frontMode = 1;
      }

      if (!Array.isArray(matrix)) {
        throw new Error("invaild post");
      }

      if (matrix.every((a) => { return typeof a === "string" && /^p/.test(a); })) {
        resultObj = {};
        for (let proid of matrix) {
          resultObj[proid] = await work.getDesignerFee(proid, option);
        }
      } else if (matrix.every((a) => { return Array.isArray(a) && a.length === 5; })) {
        resultObj = [];
        for (let [ desid, cliid, serid, xValue, proid ] of matrix) {
          temp = await work.getDesignerFee(desid, cliid, serid, xValue, option);
          temp.detail.discount = {
            online: 0,
            offline: 0,
          };
          if (proid !== null && proid !== undefined) {
            project = await back.getProjectById(proid, { selfMongo: instance.mongo });
            thisProposal = project.selectProposal(desid);
            if (thisProposal !== null) {
              for (let { method, discount } of thisProposal.fee) {
                if (/^off/gi.test(method)) {
                  temp.detail.discount.offline = discount;
                } else {
                  temp.detail.discount.online = discount;
                }
              }
            }
            designerRealtime = await work.realtimeDesignerMatch(desid, proid, option);
          } else {
            designerRealtime = await work.realtimeDesignerMatch(desid, cliid, serid, xValue, option);
          }

          if (!designerRealtime.result) {
            temp.comment = (req.body.frontMode === 1 || req.body.frontMode === '1') ? "일정 불가능" : "Unable schedule";
            // temp.detail.online = 0;
            // temp.detail.offline = 0;
            temp.detail.travel.number = 0;
            // temp.fee = 0;
          }

          temp.detail.travel.limit = 5;

          resultObj.push(temp);
        }
      } else {
        throw new Error("invaild matrix");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_designerFee): " + e.message).catch((e) => { console.log(e); });
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify([ null ]));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_inicisPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, cryptoString, decryptoHash, equalJson, messageSend, dateToString } = this.mother;
  const crypto = require("crypto");
  const password = "homeliaison";
  let obj = {};
  obj.link = [ "/inicisPayment" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const now = new Date();

      if (req.body.mode === "script") {
        const { cliid, kind, desid, proid, method, device, bilid } = req.body;
        const oidConst = "homeliaisonBill_";
        const version = "1.0";
        const gopaymethod = req.body.gopaymethod;
        const mid = instance.address.officeinfo.inicis.mid;
        const signkey = instance.address.officeinfo.inicis.signkey;
        const timestamp = String(now.valueOf());
        const oid = oidConst + timestamp;
        const price = Math.round(Number(req.body.price));
        const signature = crypto.createHash("sha256").update(`oid=${oid}&price=${String(price)}&timestamp=${timestamp}`).digest("hex");
        const mKey = crypto.createHash("sha256").update(signkey).digest("hex");
        const currency = "WON";
        const goodname = req.body.name;
        const buyername = req.body.buyerName;
        const buyertel = req.body.buyerPhone;
        const buyeremail = req.body.buyerEmail;
        let returnUrl, closeUrl;
        let pluginScript, formValue, acceptmethod;
        let future;

        if ((new RegExp(address.frontinfo.host, "gi")).test(req.body.currentPage)) {
          returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
          closeUrl = req.body.currentPage + "/tools/trigger.html";
        } else {
          returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
          closeUrl = req.body.currentPage + "/tools/trigger";
        }

        // if (device === "mobile" && gopaymethod === "Card") {
        if (gopaymethod === "Card") {
          pluginScript = '';
          pluginScript += (await requestSystem("https://code.jquery.com/jquery-1.12.4.min.js")).data;
          pluginScript += "\n";
          pluginScript += (await requestSystem("https://cdn.iamport.kr/js/iamport.payment-1.1.5.js")).data;
          formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl };
        } else if (gopaymethod !== "Account") {
          pluginScript = (await requestSystem("https://stdpay.inicis.com/stdjs/INIStdPay.js")).data;
          if (gopaymethod === "VBank") {
            acceptmethod = "va_receipt";
          } else {
            acceptmethod = "below1000";
          }
          formValue = { version, gopaymethod, mid, oid, price, timestamp, signature, mKey, currency, goodname, buyername, buyertel, buyeremail, returnUrl, closeUrl, acceptmethod };
        } else {

          await requestSystem("https://" + instance.address.pythoninfo.host + ":3000/accountTimeSet", {
            bilid,
            requestNumber: Number(req.body.requestNumber),
            proid,
            cliid,
            desid,
            goodname,
            date: new Date(),
            name: buyername,
            phone: buyertel,
            amount: price,
            accountInfo: {
              no_tid: "realAccount",
              no_oid: oid,
              cd_bank: "00",
              nm_inputbank: "unknown",
              nm_input: buyername,
              amt_input: String(price),
              real_account: "true"
            }
          }, {
            headers: { "Content-Type": "application/json" }
          });

          future = new Date();
          future.setDate(future.getDate() + 7);

          pluginScript = await cryptoString(password, JSON.stringify({
            goodName: goodname,
            goodsName: goodname,
            resultCode: "0000",
            resultMsg: "성공적으로 처리 하였습니다.",
            tid: "realAccount",
            payMethod: "ACCOUNT",
            applDate: dateToString(new Date(), true).replace(/[^0-9]/gi, ''),
            mid,
            MOID: oid,
            TotPrice: String(price),
            buyerName: buyername,
            CARD_Code: "",
            vactBankName: "기업",
            VACT_Num: "049-085567-04-022",
            VACT_Name: "(주)홈리에종",
            VACT_Date: dateToString(future).replace(/[^0-9]/gi, ''),
            payDevice: "",
            P_FN_NM: "realAccount",
            REAL_Account: "true"
          }));
          formValue = {};

        }

        res.send(JSON.stringify({ pluginScript, formValue }));

      } else if (req.body.mode === "decrypto") {

        let result = await decryptoHash(password, req.body.hash.trim());
        try {
          result = JSON.parse(result);
          res.send(JSON.stringify(result));
        } catch (e) {
          res.send(JSON.stringify({ result }));
        }

      } else if (req.body.mode === "mobileCard") {

        const { mid, oid, impId } = req.body;
        const { data: { response: { access_token: accessToken } } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
          imp_key: address.officeinfo.import.key,
          imp_secret: address.officeinfo.import.secret
        }, { headers: { "Content-Type": "application/json" } }));
        const { data: { response: paymentData } } = await requestSystem("https://api.iamport.kr/payments/" + impId, {}, {
          method: "get",
          headers: { "Authorization": accessToken }
        });
        const today = new Date();
        const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
        const convertingData = {
          goodName: paymentData.name,
          goodsName: paymentData.name,
          resultCode: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "0000" : "4000"),
          resultMsg: ((typeof paymentData.status === "string" && paymentData.status.trim() === "paid") ? "성공적으로 처리 하였습니다." : "결제 실패 : " + String(paymentData.fail_reason)),
          tid: paymentData.pg_tid,
          payMethod: "CARD",
          applDate: `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`,
          mid: mid,
          MOID: oid,
          TotPrice: String(paymentData.amount),
          buyerName: paymentData.buyer_name,
          CARD_BankCode: paymentData.card_code,
          CARD_Num: paymentData.card_number,
          CARD_ApplPrice: String(paymentData.amount),
          CARD_Code: paymentData.card_code,
          vactBankName: paymentData.card_name,
          payDevice: "MOBILE",
          P_FN_NM: paymentData.card_name,
          "__ignorethis__": 1,
        };

        if (paymentData.status.trim() === "paid") {
          res.send(JSON.stringify({ convertingData }));
        } else {
          res.send(JSON.stringify({ convertingData: { error: "error" } }));
        }

      } else if (req.body.mode === "cashPhone") {

        const { phone, hash, bilid, proid, desid, cliid, name } = equalJson(req.body);
        const data = JSON.parse(await decryptoHash(password, hash.trim()));
        await requestSystem("https://" + instance.address.pythoninfo.host + ":3000/accountTimeUpdate", {
          whereQuery: {
            $and: [
              { bilid },
              { proid },
              { "accountInfo.no_oid": data.MOID }
            ]
          },
          updateQuery: { phone },
          name,
          phone,
        }, {
          headers: { "Content-Type": "application/json" }
        });
        res.send(JSON.stringify({ message: "done" }));

      } else {

        const mobileConverting = {
          P_STATUS: "resultCode",
          P_RMESG1: "resultMsg",
          P_TID: "tid",
          P_TYPE: "payMethod",
          P_AUTH_DT: "applDate",
          P_MID: "mid",
          P_OID: "MOID",
          P_AMT: "TotPrice",
          P_UNAME: "buyerName",
          P_CARD_ISSUER_CODE: "CARD_BankCode",
          P_CARD_NUM: "CARD_Num",
          P_CARD_APPLPRICE: "CARD_ApplPrice",
          P_FN_CD1: "CARD_Code",
          P_FN_NM: "vactBankName",
          P_VACT_NUM: "VACT_Num",
          P_VACT_NAME: "VACT_Name",
          P_VACT_DATE: "VACT_Date",
        };
        const charset = "UTF-8";
        const format = "JSON";
        const timestamp = String(now.valueOf());
        let device;
        let resultCode, authUrl, netCancelUrl, returnUrl, orderNumber, authToken, mid;
        let signature;
        let response, responseData;
        let target;
        let targetArr, tong, convertTong;
        let tempStr, tempArr;

        if (req.body.P_STATUS === undefined) {
          device = "desktop";
          resultCode = req.body.resultCode;
          authUrl = req.body.authUrl;
          netCancelUrl = req.body.netCancelUrl;
          returnUrl = req.body.returnUrl;
          orderNumber = req.body.orderNumber;
          authToken = req.body.authToken;
          mid = req.body.mid;
        } else {
          device = "mobile";
          resultCode = (req.body.P_STATUS === "00" ? "0000" : req.body.P_STATUS);
          authUrl = req.body.P_REQ_URL;
          netCancelUrl = "";
          returnUrl = req.body.P_NOTI.split("__split__")[2];
          orderNumber = "";
          authToken = req.body.P_TID;
          mid = req.body.P_NOTI.split("__split__")[1];
        }

        if (device === "desktop") {
          signature = crypto.createHash("sha256").update(`authToken=${authToken}&timestamp=${timestamp}`).digest("hex");
          response = await requestSystem(authUrl, { mid, authToken, timestamp, signature, charset, format });
          responseData = await cryptoString(password, JSON.stringify(response.data));
          if (response.data.resultCode === "0000") {
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
          } else {
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
          }
        } else {
          if (resultCode === "0000") {
            response = await requestSystem(authUrl, { P_MID: mid, P_TID: authToken });
            target = response.data;
            targetArr = target.split('&').map((q) => { return q.split('='); });
            for (let i = 1; i < targetArr.length; i++) {
              if (targetArr[i][0] === "needs" || targetArr[i][0] === "mode" || targetArr[i][0] === "cliid" || targetArr[i][0] === "desid" || targetArr[i][0] === "proid") {
                tempStr = targetArr[i - 1][targetArr[i - 1].length - 1] + "&" + targetArr[i].join('=');
                targetArr[i - 1][targetArr[i - 1].length - 1] = tempStr;
              }
            }
            targetArr = targetArr.filter((arr) => { return arr[0] !== "needs" && arr[0] !== "mode" && arr[0] !== "cliid" && arr[0] !== "desid" && arr[0] !== "proid" });
            for (let i = 0; i < targetArr.length; i++) {
              if (targetArr[i].length > 2) {
                tempArr = JSON.parse(JSON.stringify(targetArr[i]));
                tempArr.shift();
                targetArr[i] = [ targetArr[i][0], tempArr.join('=') ];
              }
            }
            tong = {};
            for (let arr of targetArr) {
              tong[arr[0]] = arr[1];
            }

            convertTong = {};
            convertTong.goodName = tong.P_NOTI.split("__split__")[0];
            convertTong.goodsName = tong.P_NOTI.split("__split__")[0];
            for (let from in mobileConverting) {
              if (tong[from] !== undefined) {
                convertTong[mobileConverting[from]] = tong[from];
              }
            }
            if (convertTong.resultCode === "00") {
              convertTong.resultCode = "0000";
            }
            convertTong.payDevice = "MOBILE";
            convertTong.P_FN_NM = convertTong.vactBankName;
            responseData = await cryptoString(password, JSON.stringify(convertTong));

            if (convertTong.resultCode === "0000") {
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=complete" + "&hash=" + responseData);
            } else {
              instance.mother.errorLog("결제 문제 생김 (rou_post_inicisPayment) : " + JSON.stringify(convertTong, null, 2) + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
              res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail" + "&hash=" + responseData);
            }
          } else {
            instance.mother.errorLog("결제 문제 생김 (rou_post_inicisPayment) : " + resultCode + "\n" + JSON.stringify(req.body, null, 2)).catch((e) => { console.log(e); });
            res.redirect("/middle/estimation?" + returnUrl.split('?')[1] + "&mode=fail");
          }
        }

      }

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_inicisPayment): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_pythonPass = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/pythonPass_ghostClientBill", "/pythonPass_generalBill", "/pythonPass_invoiceRead", "/pythonPass_invoiceCreate", "/pythonPass_generalMongo", "/pythonPass_returnDummy", "/pythonPass_invoiceRequest" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const url = req.url.replace(/^\//gi, '');
      if (url.split('_').length < 2) {
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const path = url.split('_')[1].trim();
        let targetUrl, pythonResponse;
        targetUrl = "https://" + address["pythoninfo"].host + ":3000/" + path;
        pythonResponse = await requestSystem(targetUrl, equalJson(req.body), { headers: { "Content-Type": "application/json" } });
        res.send(JSON.stringify(pythonResponse.data));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_pythonPass): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_callTo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, equalJson, errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/callTo" ];
  obj.func = async function (req, res) {
    res.set({ "Content-Type": "application/json" });
    try {
      if (req.body.who === undefined) {
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const members = instance.members;
        let thisPerson, index, number, phone, who;

        who = req.body.who;

        if (req.body.phone !== undefined) {
          phone = req.body.phone;
        } else if (req.body.proid !== undefined) {
          phone = (await back.getClientById((await back.getProjectById(req.body.proid, { selfMongo: instance.mongo })).cliid, { selfMongo: instance.mongo })).phone;
        } else {
          throw new Error("invaild post");
        }

        for (let { id, email } of members) {
          if (email.includes(who)) {
            thisPerson = id;
            break;
          }
        }
        index = address.officeinfo.phone.members.indexOf(thisPerson);

        if (index === -1 || address.officeinfo.phone.numbers[index] === undefined) {
          errorLog("Console 서버 문제 생김 (rou_post_callTo): cannot find member index => " + String(index) + ", " + thisPerson + ", " + who + ", " + JSON.stringify(req.body)).catch((e) => { console.log(e); });
          res.send(JSON.stringify({ message: "error" }));
        } else {
          number = address.officeinfo.phone.numbers[index];
          await requestSystem("https://" + instance.address.secondinfo.host + ":3000/clickDial", { id: number, destnumber: phone.replace(/[^0-9]/g, '') }, { headers: { "Content-Type": "application/json" } });
          res.send(JSON.stringify({ message: "true" }));
        }
      }
    } catch (e) {
      console.log(e);
      errorLog("Console 서버 문제 생김 (rou_post_callTo): " + e.message).catch((e) => { console.log(e); });
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_ghostDesigner_updateAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, ipParsing } = this.mother;
  let obj = {};
  obj.link = [ "/ghostDesigner_updateAnalytics" ];
  obj.func = async function (req, res) {
    try {
      if (req.body.mode === undefined || req.body.desid === undefined || req.body.page === undefined || req.body.who === undefined) {
        throw new Error("invaild post");
      }
      const { mode, desid, page, who } = req.body;
      const ip = String(req.headers['x-forwarded-for'] === undefined ? req.connection.remoteAddress : req.headers['x-forwarded-for']).trim().replace(/[^0-9\.]/gi, '');
      const rawUserAgent = req.useragent;
      const { source: userAgent, browser, os, platform } = rawUserAgent;
      const referrer = (req.headers.referer === undefined ? "" : req.headers.referer);
      let whereQuery, updateQuery;
      let history;
      let update;
      let image;
      let ipObj;
      let updateObj;

      whereQuery = { desid };
      history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });
      if (history === null) {
        await back.createHistory("designer", { desid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
        history = await back.getHistoryById("designer", desid, { selfMongo: instance.mongolocal });
      }

      if (mode === "page") {

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }
        history[page].analytics.page.push({ page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj });
        updateQuery = {};
        updateQuery[page + ".analytics.page"] = history[page].analytics.page;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "update") {

        update = equalJson(req.body.update);
        history[page].analytics.update.push({ page, who, date: new Date(), update });
        updateQuery = {};
        updateQuery[page + ".analytics.update"] = history[page].analytics.update;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else if (mode === "send") {

        ipObj = await ipParsing(ip);
        if (ipObj === null) {
          ipObj = { ip };
        }
        updateObj = { page, date: new Date(), who, referrer, userAgent, browser, os, platform, mobile: rawUserAgent.isMobile, ...ipObj };
        if (typeof req.body.cliid === "string") {
          updateObj.cliid = req.body.cliid.trim();
        }
        history[page].analytics.send.push(updateObj);
        updateQuery = {};
        updateQuery[page + ".analytics.send"] = history[page].analytics.send;
        await back.updateHistory("designer", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });

      } else {
        throw new Error("invaild mode");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "done" }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_ghostDesigner_updateAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_ghostDesigner_getAnalytics = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/ghostDesigner_getAnalytics" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.desid === undefined || req.body.mode === undefined || req.body.type === undefined) {
        throw new Error("invalid post");
      }
      const { desid, mode, type } = req.body;
      const selfMongo = instance.mongolocal;
      const db = "miro81";
      const collection = "designerHistory";
      let projectQuery;
      let rows, row;
      let targetAnalytics;

      projectQuery = {};
      projectQuery[mode] = 1;

      rows = await selfMongo.db(db).collection(collection).find({ desid }).project(projectQuery).toArray();
      if (rows.length === 0) {
        throw new Error("invalid desid");
      }

      [ row ] = rows;
      targetAnalytics = row[mode].analytics[type];

      if (req.body.cliid === undefined) {
        res.send(JSON.stringify(targetAnalytics));
      } else {
        res.send(JSON.stringify(targetAnalytics.filter((obj) => { return obj.cliid === req.body.cliid })));
      }
      
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_ghostDesigner_getAnalytics): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_errorLog = function () {
  const instance = this;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/errorLog" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.message !== "string") {
        throw new Error("invalid post");
      }
      await errorLog(req.body.message);
      res.send(JSON.stringify({ message: "done" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_errorLog): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getDataPatch = function () {
  const instance = this;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/getDataPatch", "/dataPatch" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.method !== "string") {
        throw new Error("invalid post");
      }
      const { method } = req.body;
      const result = (instance.patch[method])();
      res.send(JSON.stringify(result));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_getDataPatch): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_constructInteraction = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const { errorLog, equalJson, dateToString, stringToDate, requestSystem, autoComma, messageSend } = this.mother;
  const numberToHangul = (number) => {
    if (typeof number !== "number") {
      throw new Error("input must be integer");
    }
    const instance = this;
    const hangul0 = [ '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구' ];
    const hangul1 = [ '', '십', '백', '천' ];
    const hangul2 = [ '', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극' ];
    try {
      let numberStr, numberArr, hangul3, first;

      hangul3 = [];
      for (let i = 0; i < hangul2.length; i++) {
        for (let j = 0; j < hangul1.length; j++) {
          hangul3.push(hangul1[j] + hangul2[i]);
        }
      }

      number = Math.floor(number);
      numberStr = String(number);
      numberArr = numberStr.split('').reverse();
      numberArr = numberArr.map((str, index) => {
        if (str === '0') {
          return '';
        } else {
          return hangul0[Number(str)] + hangul3[index];
        }
      });

      for (let i = 1; i < hangul2.length; i++) {
        first = true;
        for (let j = 0; j < numberArr.length; j++) {
          if ((new RegExp(hangul2[i] + '$')).test(numberArr[j])) {
            if (first) {
              first = false;
            } else {
              numberArr[j] = numberArr[j].slice(0, -1);
            }
          }
        }
      }
      numberArr.reverse();

      return numberArr.join('');

    } catch (e) {
      console.log(e);
      return null;
    }
  }
  let obj = {};
  obj.link = [ "/constructInteraction" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string" || typeof req.body.proid !== "string") {
        throw new Error("invalid post 1");
      }
      if (![ "updatePayments", "inspection", "sendContract", "constructOnoff", "amountSync", "chargeGuide", "changeAmount", "historyUpdate" ].includes(req.body.mode)) {
        throw new Error("invalid post 2");
      }
      const { mode, proid } = req.body;
      const project = await back.getProjectById(proid, { selfMongo: instance.mongo });
      const projectHistory = await back.getHistoryById("project", proid, { selfMongo: instance.mongolocal });
      const { process: { design: { construct } } } = project;
      let result, summary;

      if (mode !== "constructOnoff" && construct === null) {
        throw new Error("invaild proid");
      }

      if (mode === "updatePayments") {
        if (req.body.first === undefined || req.body.start === undefined || req.body.middle === undefined || req.body.remain === undefined || req.body.total === undefined) {
          throw new Error("invaild post");
        }
        const { total, first, start, middle, remain } = equalJson(req.body);
        let firstObj, startObj, middleObj, remainObj;
        let whereQuery, updateQuery;

        if (construct.contract.payments.first === null) {
          firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          firstObj = construct.contract.payments.first;
        }
        firstObj.calculation.amount.consumer = Math.round(Math.floor(total * (first.ratio / 100)) / 1000) * 1000;
        firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
        firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

        if (construct.contract.payments.start === null) {
          startObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          startObj = construct.contract.payments.start;
        }
        startObj.calculation.amount.consumer = Math.round(Math.floor(total * (start.ratio / 100)) / 1000) * 1000;
        startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
        startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

        if (construct.contract.payments.middle === null) {
          middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          middleObj = construct.contract.payments.middle;
        }
        middleObj.calculation.amount.consumer = Math.round(Math.floor(total * (middle.ratio / 100)) / 1000) * 1000;
        middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
        middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

        if (construct.contract.payments.remain === null) {
          remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          remainObj = construct.contract.payments.remain;
        }
        remainObj.calculation.amount.consumer = Math.round(Math.floor(total * (remain.ratio / 100)) / 1000) * 1000;
        remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
        remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.payments.first"] = firstObj;
        updateQuery["process.design.construct.contract.payments.start"] = startObj;
        updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
        updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        result = {
          message: "success",
          core: {
            first: firstObj,
            start: startObj,
            middle: middleObj,
            remain: remainObj,
          }
        };

      } else if (mode === "inspection") {

        const { name, address, start, end } = equalJson(req.body);
        let firstAmount, firstPercentage;
        let startAmount, startPercentage;
        let middleAmount, middlePercentage;
        let remainAmount, remainPercentage;
        let totalAmount;

        if (construct.contract.payments.first === null || construct.contract.payments.start === null || construct.contract.payments.middle === null || construct.contract.payments.remain === null) {
          result = { result: false, summary: null };
        } else {

          firstAmount = Math.floor(construct.contract.payments.first.calculation.amount.consumer);
          startAmount = Math.floor(construct.contract.payments.start.calculation.amount.consumer);
          middleAmount = Math.floor(construct.contract.payments.middle.calculation.amount.consumer);
          remainAmount = Math.floor(construct.contract.payments.remain.calculation.amount.consumer);

          totalAmount = (firstAmount + startAmount + middleAmount + remainAmount);

          firstPercentage = Math.round((firstAmount / totalAmount) * 100);
          startPercentage = Math.round((startAmount / totalAmount) * 100);
          middlePercentage = Math.round((middleAmount / totalAmount) * 100);
          remainPercentage = 100 - (firstPercentage + startPercentage + middlePercentage);

          if (firstPercentage < 0 || startPercentage < 0 || middlePercentage < 0 || remainPercentage < 0) {
            result = { result: false, summary: null };
          } else {

            summary = {
              total: Math.floor(totalAmount),
              hangul: numberToHangul(Math.floor(totalAmount)) + '원',
              name,
              address,
              date: { start, end },
              first: {
                percentage: Math.floor(firstPercentage),
                amount: Math.floor(firstAmount),
                date: dateToString(projectHistory.construct.payments.first.date),
                etc: projectHistory.construct.payments.first.etc
              },
              start: {
                percentage: Math.floor(startPercentage),
                amount: Math.floor(startAmount),
                date: dateToString(projectHistory.construct.payments.start.date),
                etc: projectHistory.construct.payments.start.etc
              },
              middle: {
                percentage: Math.floor(middlePercentage),
                amount: Math.floor(middleAmount),
                date: dateToString(projectHistory.construct.payments.middle.date),
                etc: projectHistory.construct.payments.middle.etc
              },
              remain: {
                percentage: Math.floor(remainPercentage),
                amount: Math.floor(remainAmount),
                date: dateToString(projectHistory.construct.payments.remain.date),
                etc: projectHistory.construct.payments.remain.etc
              },
            }
            result = { result: true, summary };

          }
        }

      } else if (mode === "sendContract") {

        const { summary } = equalJson(req.body);
        let whereQuery, updateQuery;

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.form.guide"] = new Date();
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        requestSystem("https://" + instance.address.pythoninfo.host + ":3000/createConstructContract", { proid, summary }, { headers: { "Content-type": "application/json" } }).catch((err) => {
          throw new Error(err);
        });
        result = { message: "success" };

      } else if (mode === "constructOnoff") {
        const { action } = req.body;
        let whereQuery, updateQuery;

        whereQuery = { proid };
        updateQuery = {};

        if (action === "on") {
          updateQuery["process.design.construct"] = back.returnProjectDummies("process.design.construct");
        } else {
          updateQuery["process.design.construct"] = null;
        }

        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        result = { message: "success" };

      } else if (mode === "amountSync") {
        const { amount: amountRaw } = req.body;
        const amount = Number(amountRaw);
        let whereQuery, updateQuery;
        let supply, vat, consumer;
        if (construct.contract.payments.remain !== null) {

          consumer = Math.floor(amount);
          vat = Math.floor(consumer / 11);
          supply = Math.floor(consumer - vat);

          whereQuery = { proid };
          updateQuery = {};

          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.supply"] = supply;
          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.vat"] = vat;
          updateQuery["process.design.construct.contract.payments.remain.calculation.amount.consumer"] = consumer;

          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

          requestSystem("https://" + instance.address.pythoninfo.host + ":3000/constructAmountSync", {
            proid,
            cliid: project.cliid,
            desid: project.desid,
            method: (project.service.online ? "online" : "offline"),
            amount: { supply, vat, consumer },
          }, { headers: { "Content-type": "application/json" } }).catch((err) => {
            throw new Error(err);
          });

        }

        result = {};

      } else if (mode === "chargeGuide") {
        const { method } = equalJson(req.body);
        const now = new Date();
        const client = await back.getClientById(project.cliid, { selfMongo: instance.mongo });
        const cliid = client.cliid;
        const host = instance.address.frontinfo.host;
        const path = "estimation";
        const needs = "style," + project.desid + "," + project.proid + "," + (project.service.online ? "online" : "offline");
        const name = client.name;
        const phone = client.phone;
        let whereQuery, updateQuery;
        let target;
        whereQuery = { proid };
        updateQuery = {};
        target = "";
        if (method === "first") {
          await kakao.sendTalk("constructFirst", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.first.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.first.guide"] = now;
          target = "계약금";
        } else if (method === "start") {
          await kakao.sendTalk("constructStart", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.start.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.start.guide"] = now;
          target = "착수금";
        } else if (method === "middle") {
          await kakao.sendTalk("constructMiddle", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.middle.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.middle.guide"] = now;
          target = "중도금";
        } else if (method === "remain") {
          await kakao.sendTalk("constructRemain", name, phone, {
            client: name,
            amount: autoComma(project.process.design.construct.contract.payments.remain.calculation.amount.consumer),
            host, path, cliid, needs
          });
          updateQuery["process.design.construct.contract.payments.remain.guide"] = now;
          target = "잔금";
        }
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        messageSend({ text: name + " 고객님께 시공 " + target + " 안내 알림톡을 전송했어요.", channel: "#400_customer", voice: true }).catch((err) => {
          console.log(err);
        });
        result = { date: dateToString(now), now };

      } else if (mode === "changeAmount") {

        if (req.body.map === undefined) {
          throw new Error("invaild post");
        }
        const { map: { first, start, middle, remain } } = equalJson(req.body);
        let firstObj, startObj, middleObj, remainObj;
        let whereQuery, updateQuery;
        let toPython;

        if (construct.contract.payments.first === null) {
          firstObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          firstObj = construct.contract.payments.first;
        }
        firstObj.calculation.amount.consumer = first;
        firstObj.calculation.amount.vat = Math.floor(firstObj.calculation.amount.consumer / 11);
        firstObj.calculation.amount.supply = firstObj.calculation.amount.consumer - firstObj.calculation.amount.vat;

        if (construct.contract.payments.start === null) {
          startObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          startObj = construct.contract.payments.start;
        }
        startObj.calculation.amount.consumer = start;
        startObj.calculation.amount.vat = Math.floor(startObj.calculation.amount.consumer / 11);
        startObj.calculation.amount.supply = startObj.calculation.amount.consumer - startObj.calculation.amount.vat;

        if (construct.contract.payments.middle === null) {
          middleObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          middleObj = construct.contract.payments.middle;
        }
        middleObj.calculation.amount.consumer = middle;
        middleObj.calculation.amount.vat = Math.floor(middleObj.calculation.amount.consumer / 11);
        middleObj.calculation.amount.supply = middleObj.calculation.amount.consumer - middleObj.calculation.amount.vat;

        if (construct.contract.payments.remain === null) {
          remainObj = back.returnProjectDummies("process.design.construct.contract.payments");
        } else {
          remainObj = construct.contract.payments.remain;
        }
        remainObj.calculation.amount.consumer = remain;
        remainObj.calculation.amount.vat = Math.floor(remainObj.calculation.amount.consumer / 11);
        remainObj.calculation.amount.supply = remainObj.calculation.amount.consumer - remainObj.calculation.amount.vat;

        toPython = {
          proid,
          cliid: project.cliid,
          desid: project.desid,
          method: project.service.online ? "online" : "offline",
          first: {
            consumer: firstObj.calculation.amount.consumer,
            vat: firstObj.calculation.amount.vat,
            supply: firstObj.calculation.amount.supply,
          },
          start: {
            consumer: startObj.calculation.amount.consumer,
            vat: startObj.calculation.amount.vat,
            supply: startObj.calculation.amount.supply,
          },
          middle: {
            consumer: middleObj.calculation.amount.consumer,
            vat: middleObj.calculation.amount.vat,
            supply: middleObj.calculation.amount.supply,
          },
          remain: {
            consumer: remainObj.calculation.amount.consumer,
            vat: remainObj.calculation.amount.vat,
            supply: remainObj.calculation.amount.supply,
          },
        };

        requestSystem("https://" + instance.address.pythoninfo.host + ":3000/constructAmountSync", toPython, { headers: { "Content-type": "application/json" } }).catch((err) => {
          throw new Error(err);
        });

        whereQuery = { proid };
        updateQuery = {};
        updateQuery["process.design.construct.contract.payments.first"] = firstObj;
        updateQuery["process.design.construct.contract.payments.start"] = startObj;
        updateQuery["process.design.construct.contract.payments.middle"] = middleObj;
        updateQuery["process.design.construct.contract.payments.remain"] = remainObj;
        await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        result = {
          message: "success",
          core: {
            first: firstObj,
            start: startObj,
            middle: middleObj,
            remain: remainObj,
          }
        };

      } else if (mode === "historyUpdate") {
        const { kind, value, column } = equalJson(req.body);
        let whereQuery, updateQuery;
        whereQuery = { proid };
        updateQuery = {};
        updateQuery["construct.payments." + kind + "." + column] = (column === "date" ? stringToDate(value) : value);
        await back.updateHistory("project", [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
        result = {};
      } else {
        result = {};
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_constructInteraction): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getOpenGraph = function () {
  const instance = this;
  const { errorLog, equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/getOpenGraph" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.url !== "string") {
        throw new Error("invaild post");
      }
      const mode = req.body.mode;
      let url;
      let result;
      let urlArr;
      let resOpen, targets;
      let middleTarget, target;
      let imgTargets, imgTarget;
      let imgMiddleTarget;
      let protocol, host;
      let imgMiddleTargets;
      let requestHeaders;

      requestHeaders = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      };

      url = global.decodeURI(req.body.url);
      urlArr = url.split("");
      urlArr = urlArr.map((char) => {
        if (/[가-힣]/i.test(char)) {
          return global.encodeURI(char);
        } else if (char.trim() === '') {
          return global.encodeURI(char);
        } else {
          return char;
        }
      });
      url = urlArr.join("");

      try {
        resOpen = await requestSystem(url, {}, { method: "get", headers: requestHeaders });
        targets = [ ...resOpen.data.matchAll(/\<meta[^\>]+property=\"og\:image\"[^\>]+\>/gi) ].map((arr) => { return arr[0] });
      } catch (e) {
        targets = [];
      }

      imgTarget = null;
      if (targets.length === 0) {
        try {
          resOpen = await requestSystem(url);
          imgMiddleTargets = [ ...resOpen.data.matchAll(/\<img[^\>]+src="[^\>]+\>/gi) ].map((arr) => { return arr[0] });
        } catch (e) {
          imgMiddleTargets = [];
        }
        imgTargets = imgMiddleTargets.filter((str) => { return !/\.svg/gi.test(str) });
        if (imgTargets.length > 0) {
          imgMiddleTarget = [ ...imgTargets[0].matchAll(/src\=\"[^\"]+\"/gi) ];
          if (imgMiddleTarget.length > 0) {
            imgTarget = imgMiddleTarget[0][0].trim().replace(/^src\=\"/gi, '').slice(0, -1);
            if (/^\//.test(imgTarget)) {
              [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
              if (/^\/\//.test(imgTarget)) {
                imgTarget = protocol + imgTarget;
              } else {
                imgTarget = protocol + "//" + host + imgTarget;
              }
            }
          }
        }
      }

      middleTarget = [];
      target = null;
      if (targets.length > 0) {
        middleTarget = [ ...targets[targets.length - 1].matchAll(/content\=\"[^\"]+\"/gi) ];
        if (middleTarget.length > 0) {
          target = middleTarget[0][0].trim().replace(/^content\=\"/gi, '').slice(0, -1);
          if (/^\//.test(target)) {
            [ protocol, host ] = url.split('/').filter((str) => { return str.trim() !== '' })
            if (/^\/\//.test(target)) {
              target = protocol + target;
            } else {
              target = protocol + "//" + host + target;
            }
          }
        }
      }

      if (target === null) {
        if (imgTarget === null) {
          result = { image: null };
        } else {
          result = { image: imgTarget };
        }
      } else {
        result = { image: target };
      }

      if (typeof req.body.target === "string") {
        result.target = req.body.target;
      }

      res.send(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      await errorLog("Console 서버 문제 생김 (rou_post_getOpenGraph): " + e.message);
      res.send(JSON.stringify({ message: "error" }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_mysqlQuery = function () {
  const instance = this;
  const address = this.address;
  const { errorLog, equalJson, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/mysqlQuery" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.query !== "string") {
        throw new Error("invaild post");
      }
      const port = 3000;
      const query = req.body.query.replace(/__equal__/gi, '=');
      const response = await requestSystem("https://" + address.officeinfo.ghost.host + ":" + String(port) + "/mysqlQuery", { query }, { headers: { "Content-Type": "application/json" } });
      if (typeof response.data !== "object") {
        throw new Error("request error");
      }
      res.send(JSON.stringify(response.data));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_mysqlQuery): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_generalImpPayment = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { errorLog, requestSystem, uniqueValue, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/generalImpPayment" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (typeof req.body.mode !== "string") {
        throw new Error("invaild post");
      }
      const { mode } = req.body;
      const storeCollection = "impPaymentTempStore";
      const selfMongo = instance.mongolocal;
      const oidConstDictionary = {
        mini: "mini_",
        designerPhoto: "designerPhoto_",
      };
      let pluginScript;

      if (mode === "script") {
        pluginScript = '';
        pluginScript += (await requestSystem("https://code.jquery.com/jquery-1.12.4.min.js")).data;
        pluginScript += "\n";
        pluginScript += (await requestSystem("https://cdn.iamport.kr/js/iamport.payment-1.1.5.js")).data;
        res.send(JSON.stringify({ pluginScript, oidConst: oidConstDictionary[req.body.oidKey] }));

      } else if (mode === "store") {

        const data = equalJson(req.body.data);
        const key = "impKey_" + uniqueValue("hex");
        await back.mongoCreate(storeCollection, { key, data: JSON.stringify(data), oid: req.body.oid }, { selfMongo });

        res.send(JSON.stringify({ key }));

      } else if (mode === "open") {

        const key = req.body.key;
        const rows = await back.mongoRead(storeCollection, { key }, { selfMongo });
        if (rows.length === 0) {
          res.send(JSON.stringify({}));
        } else {
          const [ { key, data, oid } ] = rows;
          const { response: { access_token } } = (await requestSystem("https://api.iamport.kr/users/getToken", {
            imp_key: address.officeinfo.import.key,
            imp_secret: address.officeinfo.import.secret,
          }, { headers: { "Content-Type": "application/json" } })).data;
          const { data: { response: rsp } } = await requestSystem("https://api.iamport.kr/payments/find/" + oid, {}, { method: "get", headers: { "Authorization": access_token } });
          res.send(JSON.stringify({ data: equalJson(data), oid, rsp }));
        }

      } else {
        throw new Error("invaild mode");
      }

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_generalImpPayment): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getUpdateUser = function () {
  const instance = this;
  const back = this.back;
  const { errorLog, requestSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getUsers", "/updateUser" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongo;
      if (req.url === "/getUsers") {
        if (req.body.whereQuery === undefined) {
          throw new Error("invaild post");
        }
        const { whereQuery } = equalJson(req.body);
        const users = await back.getUsersByQuery(whereQuery, { selfMongo });
        res.send(JSON.stringify(users.toNormal()));
      } else if (req.url === "/updateUser") {
        const { whereQuery, updateQuery } = equalJson(req.body);
        await back.updateUser([ whereQuery, updateQuery ], { selfMongo });
        res.send(JSON.stringify({ message: "done" }));
      }
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_getUpdateUser): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_userSubmit = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const { errorLog, equalJson, requestSystem, dateToString, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/userSubmit" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.map === undefined) {
        throw new Error("invaild post");
      }
      const selfMongo = instance.mongo;
      const map = equalJson(req.body.map);
      let useid;
      let name, phone, email, address, targets, etc, oid, rsp;
      let updateQuery;
      let message;

      // filtering
      name = map.name.replace(/[^a-zA-Z가-힣]/gi, '');
      phone = map.phone.replace(/[^0-9\-]/gi, '');
      email = map.email.trim();
      address = map.address.trim();
      targets = Number(map.targets);
      etc = map.etc.trim();
      oid = map.oid.trim();
      rsp = equalJson(map.rsp);

      // create user
      updateQuery = { name, phone, email };
      updateQuery["service.serid"] = "s2011_aa05s";
      updateQuery["service.xValue"] = "B";
      updateQuery["request.timeline"] = new Date();
      updateQuery["request.status"] = "결제 완료";
      updateQuery["request.alarm"] = true;
      updateQuery["request.space.address"] = address;
      updateQuery["request.space.targets"] = targets;
      updateQuery["request.comments.init"] = etc;
      updateQuery["request.payment.date"] = new Date();
      updateQuery["request.payment.oid"] = oid;
      if (rsp.paid_amount === undefined || Number.isNaN(Number(rsp.paid_amount))) {
        updateQuery["request.payment.amount.consumer"] = Math.floor(Number(rsp.amount));
      } else {
        updateQuery["request.payment.amount.consumer"] = Math.floor(Number(rsp.paid_amount));
      }
      updateQuery["request.payment.amount.vat"] = Math.floor(updateQuery["request.payment.amount.consumer"] / 11);
      updateQuery["request.payment.amount.supply"] = Math.floor(updateQuery["request.payment.amount.consumer"] - updateQuery["request.payment.amount.vat"]);
      updateQuery["request.payment.info.method"] = "카드(" + (typeof rsp.card_name === "string" ? rsp.card_name.replace(/카드/gi, '') : "알 수 없음") + ")";
      updateQuery["request.payment.info.proof"] = "이니시스";
      updateQuery["request.payment.info.to"] = name;
      updateQuery["request.payment.info.data"] = [ rsp ];
      updateQuery["response.status"] = "지정 대기";

      useid = await back.createUser(updateQuery, { selfMongo });

      // alimtalk
      await kakao.sendTalk("miniConsulting", name, phone, {
        client: name,
        host: instance.address.backinfo.host,
        path: "miniGuide",
        useid: useid,
      });

      // slack
      message = "새로운 미니 서비스 결제가 일어났습니다!" + "\n";
      message += "문의일 : " + dateToString(updateQuery["request.timeline"], true) + "\n";
      message += "고객 아이디 : " + useid + "\n";
      message += "성함 : " + name + "\n";
      message += "연락처 : " + phone + "\n";
      message += "이메일 : " + email + "\n";
      message += "주소 : " + address + "\n";
      message += "공간 개수 : " + String(targets) + "\n";
      message += "요청 사항 : " + etc + "\n";
      await messageSend({ text: message, channel: "#405_mini" });

      res.send(JSON.stringify({ useid }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_userSubmit): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_requestScript = function () {
  const instance = this;
  const { errorLog, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/requestScript" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.url === undefined) {
        throw new Error("invaild post");
      }
      const responses = await requestSystem(global.decodeURIComponent(req.body.url));
      res.send(JSON.stringify({ data: responses.data }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_requestScript): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerFeeTable = function () {
  const instance = this;
  const work = this.work;
  const { errorLog, requestSystem } = this.mother;
  let obj = {};
  obj.link = [ "/designerFeeTable" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      let json;
      json = await work.designerFeeTable(req.body.desid, { selfMongo: this.mongo, selfLocalMongo: this.mongolocal, jsonMode: true });
      res.send(json);
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_designerFeeTable): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_homeliaisonCrypto = function () {
  const instance = this;
  const { errorLog, equalJson, cryptoString, decryptoHash } = this.mother;
  const back = this.back;
  let obj = {};
  obj.link = [ "/homeliaisonCrypto" ];
  obj.func = async function (req, res) {
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
            resultObj.push({
              string: await decryptoHash(password, hash),
              target
            });
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
          result = await decryptoHash(password, req.body.hash);
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
      await errorLog("Console 서버 문제 생김 (rou_post_homeliaisonCrypto): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_callHistory = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem, stringToDate, errorLog, autoHypenPhone } = this.mother;
  const url = "https://centrex.uplus.co.kr/RestApi/callhistory";
  const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = instance.address;
  const querystring = require("querystring");
  const callConst = "c_";
  const uniqueConst = "u_";
  const successStandardSec = 200;
  const parsingCallHistory = async (MONGOC, MONGOCONSOLEC) => {
    try {
      const selfMongo = MONGOC;
      const selfConsoleInfo = MONGOCONSOLEC;
      let res, tong, data, query, calltype, page;
      let outArr, inArr;
      let tempObj;
      let rows, cliid;
      let whereQuery, updateQuery;
      let historyObj;
      let boo;
      let requestNumber;
      let targetColumn;
      let pastHistory;
      let index, indexTarget;

      calltype = "outbound";
      tong = {};
      for (let id of phoneNumbers) {
        page = 0;
        do {
          page++;
          query = { id, pass, calltype, page };
          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
          data = res.data;
          if (data.DATAS === null) {
            break;
          }
          for (let obj of data.DATAS) {
            if (!Array.isArray(tong[callConst + obj.SRC])) {
              tong[callConst + obj.SRC] = [];
            }
            tong[callConst + obj.SRC].push(JSON.parse(JSON.stringify(obj)));
          }
        } while (data.SVC_RT === '0000');
      }

      for (let c in tong) {
        tong[c].sort((a, b) => { return a.NO - b.NO; });
        tong[c] = { out: JSON.parse(JSON.stringify(tong[c])), in: [] };
      }

      calltype = "inbound";
      for (let id of phoneNumbers) {
        page = 0;
        do {
          page++;
          query = { id, pass, calltype, page };
          res = await requestSystem(url + "?" + querystring.stringify(query), query, { headers: { "Content-Type": "application/json" } });
          data = res.data;
          if (data.DATAS === null) {
            break;
          }
          for (let obj of data.DATAS) {
            if (tong[callConst + obj.DST] !== undefined) {
              tong[callConst + obj.DST].in.push(JSON.parse(JSON.stringify(obj)));
            }
          }
        } while (data.SVC_RT === '0000');
      }

      outArr = [];
      inArr = [];
      for (let c in tong) {
        for (let obj of tong[c].out) {
          tempObj = {};
          tempObj.date = stringToDate(obj.TIME);
          tempObj.to = autoHypenPhone(obj.DST);
          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
          if (obj.STATUS === "OK") {
            if (tempObj.duration >= successStandardSec) {
              tempObj.success = true;
            } else {
              tempObj.success = false;
            }
          } else {
            tempObj.success = false;
          }
          outArr.push(tempObj);
        }
        for (let obj of tong[c].in) {
          tempObj = {};
          tempObj.date = stringToDate(obj.TIME);
          tempObj.from = autoHypenPhone(obj.SRC);
          tempObj.duration = Number.isNaN(Number(obj.DURATION.replace(/[^0-9]/gi, ''))) ? 0 : Number(obj.DURATION.replace(/[^0-9]/gi, ''));
          if (obj.STATUS === "OK") {
            if (tempObj.duration >= successStandardSec) {
              tempObj.success = true;
            } else {
              tempObj.success = false;
            }
          } else {
            tempObj.success = false;
          }
          inArr.push(tempObj);
        }
      }

      outArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });
      inArr.sort((a, b) => { return a.date.valueOf() - b.date.valueOf(); });

      for (let { date, to, duration, success } of outArr) {
        rows = await back.getClientsByQuery({ phone: to }, { selfMongo });
        if (rows.length !== 0) {
          cliid = rows[0].cliid;
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
          boo = true;
          index = 0;
          indexTarget = -1;
          for (let obj of historyObj.curation.analytics.call.out) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
              indexTarget = index;
            }
            index++;
          }
          if (boo) {
            historyObj.curation.analytics.call.out.push({ date, success, duration });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
            await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
          } else {
            if (typeof historyObj.curation.analytics.call.out[indexTarget] === "object") {
              if (historyObj.curation.analytics.call.out[indexTarget].duration !== duration) {
                historyObj.curation.analytics.call.out[indexTarget].duration = duration;
                historyObj.curation.analytics.call.out[indexTarget].success = success;
                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["curation.analytics.call.out"] = historyObj.curation.analytics.call.out;
                await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
              }
            }
          }

          requestNumber = 0;
          for (let i = 0; i < rows[0].requests.length; i++) {
            if (rows[0].requests[i].request.timeline.valueOf() <= date.valueOf()) {
              requestNumber = i;
              break;
            }
          }
          pastHistory = rows[0].requests[requestNumber].analytics.date.call.history.toNormal();
          targetColumn = "requests." + String(requestNumber) + ".analytics.date.call.history";
          boo = true;
          for (let obj of pastHistory) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
            }
          }
          if (boo) {
            pastHistory.push({ date, who: '' });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery[targetColumn] = pastHistory;
            await back.updateClient([ whereQuery, updateQuery ], { selfMongo });
          }

        }
      }

      for (let { date, from, duration, success } of inArr) {
        rows = await back.getClientsByQuery({ phone: from }, { selfMongo });
        if (rows.length !== 0) {
          cliid = rows[0].cliid;
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: selfConsoleInfo });
          boo = true;
          index = 0;
          indexTarget = -1;
          for (let obj of historyObj.curation.analytics.call.in) {
            if (obj.date.getFullYear() === date.getFullYear() && obj.date.getMonth() === date.getMonth() && obj.date.getDate() === date.getDate() && obj.date.getHours() === date.getHours() && obj.date.getMinutes() === date.getMinutes()) {
              boo = false;
              indexTarget = index;
            }
            index++;
          }
          if (boo) {
            historyObj.curation.analytics.call.in.push({ date, success, duration });
            whereQuery = { cliid };
            updateQuery = {};
            updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
            await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
          } else {
            if (typeof historyObj.curation.analytics.call.in[indexTarget] === "object") {
              if (historyObj.curation.analytics.call.in[indexTarget].duration !== duration) {
                historyObj.curation.analytics.call.in[indexTarget].duration = duration;
                historyObj.curation.analytics.call.in[indexTarget].success = success;
                whereQuery = { cliid };
                updateQuery = {};
                updateQuery["curation.analytics.call.in"] = historyObj.curation.analytics.call.in;
                await back.updateHistory("client", [ whereQuery, updateQuery ], { selfMongo: selfConsoleInfo });
              }
            }
          }
        }
      }

      console.log("call history update success");
      errorLog("callHistory update sync success : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

    } catch (e) {
      await errorLog("call history fail " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/callHistory" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      parsingCallHistory(instance.mongo, instance.mongolocal).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_callHistory): " + e.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_callHistory): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_calendarSync = function () {
  const instance = this;
  const back = this.back;
  const calendar = this.calendar;
  const address = this.address;
  const { errorLog, sleep } = this.mother;
  const calendarSyncFunc = async (MONGOC, index) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      const standardDay = new Date();
      const pastConst = 3;
      standardDay.setDate(standardDay.getDate() - pastConst);
      let projects, from;
      let clients, designers;
      let client, designer;
      let title, list;
      let allEvents;

      from = "photographing";
      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "contents.photo.date": { $gt: standardDay } },
          { "contents.photo.date": { $lt: new Date(3000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {
        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
        }, { selfMongo });
        designers = await back.getDesignersByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
        }, { selfMongo });
        allEvents = await calendar.listEvents(from);

        for (let project of projects) {
          if (!/디자이너/gi.test(project.contents.photo.info.photographer) && !/고객/gi.test(project.contents.photo.info.photographer)) {
            client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
            designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
            title = `촬영 W ${client.name}C ${designer.designer}D ${project.contents.photo.info.photographer}P ${project.contents.photo.info.interviewer}I ${project.proid}`;
            list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
            if (list.length === 1) {
              await calendar.updateSchedule(from, list[0].eventId, { start: project.contents.photo.date.toNormal(), title });
            } else if (list.length === 0) {
              await calendar.makeSchedule(from, title, '', project.contents.photo.date.toNormal());
            } else {
              for (let i = 0; i < list.length; i++) {
                if (i === 0) {
                  await calendar.updateSchedule(from, list[i].eventId, { start: project.contents.photo.date.toNormal(), title });
                } else {
                  await calendar.deleteSchedule(from, list[i].eventId);
                }
              }
            }
          } else {
            list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
            if (list.length !== 0) {
              for (let i = 0; i < list.length; i++) {
                await calendar.deleteSchedule(from, list[i].eventId);
              }
            }
          }
        }
      }

      from = "designerMeeting";
      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.contract.meeting.date": { $gt: standardDay } },
          { "process.contract.meeting.date": { $lt: new Date(3000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((c) => { return { cliid: c } }),
        }, { selfMongo });
        designers = await back.getDesignersByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.desid; })) ].map((c) => { return { desid: c } }),
        }, { selfMongo });  
        allEvents = await calendar.listEvents(from);

        for (let project of projects) {
          client = clients.toNormal().find((obj) => { return obj.cliid === project.cliid });
          designer = designers.toNormal().find((obj) => { return obj.desid === project.desid });
          title = `현장 미팅 W ${client.name}C ${designer.designer}D ${project.proid}`;
          list = allEvents.filter((obj) => { return (new RegExp(project.proid, "gi")).test(obj.title) });
          if (list.length === 1) {
            await calendar.updateSchedule(from, list[0].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
          } else if (list.length === 0) {
            await calendar.makeSchedule(from, title, '', project.process.contract.meeting.date.toNormal());
          } else {
            for (let i = 0; i < list.length; i++) {
              if (i === 0) {
                await calendar.updateSchedule(from, list[i].eventId, { start: project.process.contract.meeting.date.toNormal(), title });
              } else {
                await calendar.deleteSchedule(from, list[i].eventId);
              }
            }
          }
        }

      }

      errorLog("calendar sync success " + String(index) + " : " + JSON.stringify(new Date())).catch((err) => { console.log(err) });

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_calendarSync): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/calendarSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      calendarSyncFunc(instance.mongo, 0).then(() => {
        return calendarSyncFunc(instance.mongo, 1);
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_calendarSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_calendarSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_timeDeltaAlarm = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { errorLog, messageSend, dateToString, stringToDate, sleep } = this.mother;
  const firstMeetingAlarmFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      const dayConst = [ '일', '월', '화', '수', '목', '금', '토' ];
      let projects;
      let clients, client;
      let clientIndex;
      let meetingDate;
      let delta;
      let todayValue;
      let rawDelta;
      let designer;

      today.setHours(9);
      todayValue = today.valueOf();

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진완홀]" } },
          { "process.contract.meeting.date": { $gt: new Date() } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            meetingDate = project.process.contract.meeting.date;
            client = clients.toNormal()[clientIndex];

            rawDelta = (((Math.abs(meetingDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
            delta = Math.floor(rawDelta);

            if (delta === 1 || delta === 7) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("firstMeetingWeekAgo", client.name, client.phone, {
                client: client.name,
                date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                day: dayConst[meetingDate.getDay()],
                hour: String(meetingDate.getHours()),
                minute: String(meetingDate.getMinutes()),
                host: address.frontinfo.host,
                path: "meeting",
                proid: project.proid,
              });

              await kakao.sendTalk("designerConsoleRequestFirstMeeting", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                date: String(meetingDate.getMonth() + 1) + "월 " + String(meetingDate.getDate()) + "일",
                day: dayConst[meetingDate.getDay()],
                hour: String(meetingDate.getHours()),
                minute: String(meetingDate.getMinutes()),
                host: address.frontinfo.host,
                path: "process",
                proid: project.proid,
              });

              await messageSend(client.name + " 고객님과 " + designer.designer + " 실장님께 현장 미팅 알림을 전송하였어요.", "#400_customer", true);
            }

          }
        }
      }

      await errorLog("first meeting alarm done");

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const afterMeetingAlarmFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let meetingDate;
      let todayValue;
      let designer;
      let ago;

      today.setHours(9);
      todayValue = today.valueOf();

      ago = new Date();
      ago.setHours(7);
      ago.setDate(ago.getDate() - 1);

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진완홀]" } },
          { "process.contract.meeting.date": { $gte: ago } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            meetingDate = project.process.contract.meeting.date;
            client = clients.toNormal()[clientIndex];

            if (meetingDate.valueOf() <= todayValue) {
              
              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("feedBackDesigner", designer.designer, designer.information.phone, {
                client: client.name,
                designer: designer.designer,
                host: address.frontinfo.host,
                proid: project.proid,
              });

              await messageSend(designer.designer + " 실장님께 현장 미팅 피드백 알림을 전송하였어요.", "#300_designer", true);

            }
          }
        }
      }

      await errorLog("first meeting feedback alarm done");

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const photoDesignerAlarmFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let photoDate;
      let delta;
      let todayValue;
      let rawDelta;
      let designer;
      let requestNumber;

      today.setHours(9);
      todayValue = today.valueOf();

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진완홀]" } },
          { "contents.photo.date": { $gt: new Date() } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            photoDate = project.contents.photo.date;
            client = clients.toNormal()[clientIndex];
            requestNumber = 0;
            for (let z = 0; z < client.requests.length; z++) {
              if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                requestNumber = z;
                break;
              }
            }

            rawDelta = (((Math.abs(photoDate.valueOf() - todayValue) / 1000) / 60) / 60) / 24;
            delta = Math.floor(rawDelta);

            if (delta === 3) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("photoDateDesigner", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                date: `${String(photoDate.getFullYear())}년 ${String(photoDate.getMonth() + 1)}월 ${String(photoDate.getDate())}일 ${String(photoDate.getHours())}시`,
                address: client.requests[requestNumber].request.space.address,
              });

              await messageSend(designer.designer + " 실장님께 촬영일 알림을 전송하였어요.", "#300_designer", false);
            }

          }
        }
      }

      await errorLog("photo designer alarm done");

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  const contractStartAlarmFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const today = new Date();
      let projects;
      let clients, client;
      let clientIndex;
      let contractDate;
      let todayValue;
      let designer;
      let requestNumber;
      let ago;

      today.setHours(9);
      todayValue = today.valueOf();

      ago = new Date();
      ago.setHours(7);
      ago.setDate(ago.getDate() - 2);

      projects = await back.getProjectsByQuery({
        $and: [
          { "desid": { $regex: "^d" } },
          { "process.status": { $regex: "^[대진완홀]" } },
          { "process.contract.form.date.from": { $gte: ago } },
          { "process.remain.date": { $gte: new Date(2000, 0, 1) } },
        ]
      }, { selfMongo });

      if (projects.length > 0) {

        clients = await back.getClientsByQuery({
          $or: [ ...new Set(projects.toNormal().map((pr) => { return pr.cliid; })) ].map((cliid) => { return { cliid } }),
        }, { selfMongo });

        for (let project of projects) {
          clientIndex = clients.toNormal().findIndex((obj) => { return obj.cliid === project.cliid });
          if (clientIndex !== -1) {
            contractDate = project.process.contract.form.date.from;
            client = clients.toNormal()[clientIndex];
            requestNumber = 0;
            for (let z = 0; z < client.requests.length; z++) {
              if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
                requestNumber = z;
                break;
              }
            }
            if (dateToString(contractDate) === dateToString(new Date())) {

              designer = await back.getDesignerById(project.desid, { selfMongo });

              await kakao.sendTalk("contractStartDesigner", designer.designer, designer.information.phone, {
                designer: designer.designer,
                client: client.name,
                host: address.frontinfo.host,
                proid: project.proid,
              });

              await messageSend(designer.designer + " 실장님께 " + client.name + " 고객님 프로젝트 계약 시작일 알림을 전송하였어요.", "#300_designer", false);
            }
          }
        }
      }

      await errorLog("contract start designer alarm done");

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/timeDeltaAlarm" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      firstMeetingAlarmFunc(instance.mongo).then(() => {
      //   return afterMeetingAlarmFunc(instance.mongo);
      // }).then(() => {
      //   return photoDesignerAlarmFunc(instance.mongo);
      // }).then(() => {
        return contractStartAlarmFunc(instance.mongo);
      }).then(() => {
        return errorLog("time delta alarm done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_timeDeltaAlarm): " + e.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_timeDeltaAlarm): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_pushClient = function () {
  const instance = this;
  const back = this.back;
  const kakao = this.kakao;
  const address = this.address;
  const { errorLog, messageSend, dateToString, stringToDate, sleep } = this.mother;
  const pushClientFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const clients = await back.getClientsByQuery({}, { selfMongo, withTools: true });
      let today, ago;
      let requests;

      today = new Date();
      today.setHours(today.getHours() - 1);

      ago = new Date();
      ago.setDate(ago.getDate() - 2);

      requests = clients.getRequestsTong().filter((request) => {
        return request.analytics.response.status.value === "응대중" && request.analytics.response.action.value === "1차 응대 예정";
      }).filter((request) => {
        return request.request.timeline.valueOf() < today.valueOf() && request.request.timeline.valueOf() >= ago.valueOf();
      })

      for (let request of requests) {
        await kakao.sendTalk("pushClient", request.name, request.phone, {
          client: request.name,
          host: address.frontinfo.host,
          path: "curation",
          cliid: request.cliid,
        });
        await messageSend({ text: request.name + " 고객님께 신청 완료해달라고 부탁했어요.", channel: "#404_curation", voice: true });
        await sleep(1000);
      }

      await errorLog("push client done");


    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_firstMeetingAlarm): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/pushClient" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      pushClientFunc(instance.mongo).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_pushClient): " + e.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_pushClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_photoStatusSync = function () {
  const instance = this;
  const back = this.back;
  const { errorLog, sleep, equalJson } = this.mother;
  const photoStatusSyncFunc = async (MONGOC) => {
    try {
      const selfMongo = MONGOC;
      const dummny = {
        status: "결제 대기",
        date: new Date(1800, 0, 1),
        cancel: new Date(1800, 0, 1),
        calculation: {
          amount: 165000,
          info: {
            method: "",
            proof: "",
            to: "",
          },
          refund: 0,
        },
      };
      const collection = "project";
      let allDesigners;
      let whereQuery, updateQuery;
      let rawProjects;
      let proid;
      let thisDummy;
      let thisDesigner;
      let thisProof;
  
      allDesigners = (await back.getDesignersByQuery({}, { selfMongo })).toNormal();
  
      rawProjects = await selfMongo.db("miro81").collection(collection).find({}).toArray();
      for (let rawProject of rawProjects) {
        proid = rawProject.proid;
        thisDesigner = null;
        if (rawProject.desid !== '') {
          thisDesigner = allDesigners.find((designer) => { return designer.desid === rawProject.desid });
          if (thisDesigner === undefined) {
            thisDesigner = null;
          }
        }
  
        whereQuery = { proid };
        updateQuery = {};
        thisDummy = equalJson(JSON.stringify(dummny));
  
        if (rawProject.contents.photo.boo) {
  
          if ((new Date(2000, 0, 1)).valueOf() <= rawProject.contents.photo.date.valueOf() && (new Date(3000, 0, 1)).valueOf() > rawProject.contents.photo.date.valueOf()) {
            if ((new Date()).valueOf() >= rawProject.contents.photo.date.valueOf()) {
  
              if (rawProject.contents.photo.info.photographer !== "디자이너" && rawProject.contents.photo.info.photographer !== "고객") {
  
                if (rawProject.contents.photo.info.photographer !== "미정") {
                  updateQuery["contents.photo.status"] = "촬영 완료";
                }
  
              } else {
  
                updateQuery["contents.photo.status"] = "해당 없음";
                thisDummy.status = "해당 없음";
                thisDummy.calculation.amount = 0;
                updateQuery["contents.payment"] = thisDummy;
  
              }
  
            }
          } else {
  
            if (/완료/gi.test(rawProject.contents.photo.status)) {
              if (rawProject.contents.photo.info.photographer === "디자이너" || rawProject.contents.photo.info.photographer === "고객") {
                if (rawProject.process.calculation.payments.remain.date > (new Date(2000, 0, 1)).valueOf()) {
                  updateQuery["contents.photo.status"] = "해당 없음";
                  updateQuery["contents.photo.date"] = rawProject.process.calculation.payments.remain.date;
                  thisDummy.status = "해당 없음";
                  thisDummy.calculation.amount = 0;
                  updateQuery["contents.payment"] = thisDummy;
                }
              }
            }
  
          }
  
        } else {
          updateQuery["contents.photo.status"] = "해당 없음";
          thisDummy.status = "해당 없음";
          thisDummy.calculation.amount = 0;
          updateQuery["contents.payment"] = thisDummy;
        }
  
        if (Object.keys(updateQuery).length > 0) {
          await selfMongo.db("miro81").collection(collection).updateOne(whereQuery, { $set: updateQuery });
        }
        
      }
  
      await errorLog("photoStatus sync done : " + JSON.stringify(new Date()));


    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_photoStatusSync): " + e.message);
    }
  }
  let obj = {};
  obj.link = [ "/photoStatusSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      photoStatusSyncFunc(instance.mongo).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_photoStatusSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_photoStatusSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_workProposalToClient = function () {
  const instance = this;
  const work = this.work;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/workProposalToClient" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.setProposalToClient("cron", { selfMongo: instance.mongo }).then(() => {
        return errorLog("proposal to client sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_workProposalToClient): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_workProposalToClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_workProjectActionSync = function () {
  const instance = this;
  const work = this.work;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/workProjectActionSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.projectActionSync({ selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal, updateMongo: instance.mongo }).then(() => {
        return errorLog("project action sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_workProjectActionSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_workProjectActionSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_workClientActionSync = function () {
  const instance = this;
  const work = this.work;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/workClientActionSync" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      work.clientActionSync({ selfMongo: instance.mongo, selfConsoleMongo: instance.mongolocal, updateMongo: instance.mongo }).then(() => {
        return errorLog("client action sync done : " + JSON.stringify(new Date()));
      }).catch((err) => {
        errorLog("Console 서버 문제 생김 (rou_post_workClientActionSync): " + err.message).catch((err) => { console.log(err) });
      });
      res.send(JSON.stringify({ message: "will do" }));
    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_workClientActionSync): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_processConsole = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { equalJson, requestSystem, errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/processConsole" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const { mode } = req.body;
      let projects, clients, designers, history;
      let ago;
      let preClients;
      let clientHistory;
      let proidArr;
      let secondRes;
      let values;
      let designerValue;
      let preDesigners;
      let clientValues, designerValues;
      let finalOr;
      let searchMode;

      class NormalArray extends Array {
        constructor(arr) {
          super();
          for (let i of arr) {
            this.push(i);
          }
        }
        toNormal() {
          let arr;
          arr = [];
          for (let i of this) {
            arr.push(i);
          }
          return arr;
        }
      }

      if (mode !== "pre") {
        if (mode === "init") {

          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "process.status": { $regex: "^[진대]" }
              }
            ]
          }, { selfMongo: selfCoreMongo });
  
        } else if (mode === "search") {
  
          const { value } = req.body;
  
          if (value === '' || value === '.') {
            projects = await back.getProjectsByQuery({
              $and: [
                {
                  "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
                },
                {
                  "process.status": { $regex: "^[진대]" }
                }
              ]
            }, { selfMongo: selfCoreMongo });
          } else {
            if (/\,/gi.test(value)) {
  
              values = value.split(",").map((str) => { return str.trim() });
              clientValues = values.filter((str) => { return !(/^d\:/i.test(str) && str.length >= 3) });
              designerValues = values.filter((str) => { return /^d\:/i.test(str) && str.length >= 3 });
  
              if (clientValues.length > 0) {
                preClients = await back.getClientsByQuery({ $or: clientValues.map((str) => { return { name: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
              } else {
                preClients = new NormalArray([]);
              }
              if (designerValues.length > 0) {
                preDesigners = await back.getDesignersByQuery({ $or: designerValues.map((str) => { return str.split(":")[1].trim() }).map((str) => { return { designer: { $regex: str } } }) }, { selfMongo: selfCoreMongo });
              } else {
                preDesigners = new NormalArray([]);
              }
  
              finalOr = preClients.toNormal().map((c) => { return { cliid: c.cliid } }).concat(preDesigners.toNormal().map((c) => { return { desid: c.desid } }))
  
              if (finalOr.length > 0) {
                projects = await back.getProjectsByQuery({ $or: finalOr }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              } else {
                projects = [];
              }
              
            } else if (/^d\:/i.test(value) && value.length >= 3) {
  
              designerValue = value.split(":")[1].trim();
              preDesigners = await back.getDesignersByQuery({ designer: { $regex: designerValue } }, { selfMongo: selfCoreMongo });
              if (preDesigners.length === 0) {
                projects = [];
              } else {
                projects = await back.getProjectsByQuery({ $or: preDesigners.toNormal().map((c) => { return { desid: c.desid } }) }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              }
  
            } else {
              preClients = await back.getClientsByQuery({ name: { $regex: value } }, { selfMongo: selfCoreMongo });
              if (preClients.length === 0) {
                projects = [];
              } else {
                projects = await back.getProjectsByQuery({ $or: preClients.toNormal().map((c) => { return { cliid: c.cliid } }) }, { selfMongo: selfCoreMongo });
                projects = projects.filter((project) => {
                  return project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
                });
              }
            }
          }
  
        } else {
  
          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "process.status": { $regex: "^[진대]" }
              }
            ]
          }, { selfMongo: selfCoreMongo });
  
        }
  
        projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
  
        if (projects.length > 0) {
  
          clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          designers = await back.getDesignersByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.desid }))).map((desid) => { return { desid } }) }, { selfMongo: selfCoreMongo });
    
          history = await back.mongoRead("projectHistory", {
            $or: projects.toNormal().map((project) => { return { proid: project.proid } })
          }, { selfMongo });
    
          clientHistory = await back.mongoRead("clientHistory", {
            $or: clients.toNormal().map((client) => { return { cliid: client.cliid } })
          }, { selfMongo });
  
          proidArr = projects.toNormal().map((p) => { return p.proid })
          secondRes = await requestSystem("https://" + address.secondinfo.host + ":3000/getProcessData", { proidArr }, {
            headers: {
              "Content-Type": "application/json",
              "origin": address.backinfo.host
            }
          });
  
          res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal(), designers: designers.toNormal(), history, clientHistory, rawContents: secondRes.data.rawContents, sendStatus: secondRes.data.sendStatus, sendSchedule: secondRes.data.sendSchedule, sendFile: secondRes.data.sendFile }));
  
        } else {
          res.send(JSON.stringify({ projects: [], clients: [], designers: [], history: [], clientHistory: [], rawContents: [], sendStatus: [], sendSchedule: [], sendFile: [] }));
        }
      } else {

        searchMode = (typeof req.body.searchMode === "string" && /^p/.test(req.body.searchMode));

        if (searchMode) {
          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "proid": req.body.searchMode
              }
            ]
          }, { selfMongo: selfCoreMongo });
        } else {
          projects = await back.getProjectsByQuery({
            $and: [
              {
                "process.contract.first.date": { $gte: new Date(2000, 0, 1) }
              },
              {
                "process.status": { $regex: "^[진대]" }
              }
            ]
          }, { selfMongo: selfCoreMongo });
        }
        projects.sort((a, b) => { return b.process.contract.first.date.valueOf() - a.process.contract.first.date.valueOf() });
        if (projects.length > 0) {
          clients = await back.getClientsByQuery({ $or: Array.from(new Set(projects.toNormal().map((p) => { return p.cliid }))).map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          res.send(JSON.stringify({ projects: projects.toNormal(), clients: clients.toNormal() }));
        } else {
          res.send(JSON.stringify({ projects: [], clients: [] }));
        }
        
      }

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_processConsole): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerSubmit = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const ignorePhone = [ "010-2747-3403" ];
  const { equalJson, requestSystem, errorLog, dateToString, stringToDate, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/designerSubmit" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const resultObj = equalJson(req.body);
      const dictionary = {
        partnership: { name: "partnership", db: "designerPartnershipRaw", kakao: "designerPartnership", opposite: "presentation", oppositeDb: "designerPresentationRaw" },
        presentation: { name: "presentation", db: "designerPresentationRaw", kakao: "designerPresentation", opposite: "partnership", oppositeDb: "designerPartnershipRaw" }
      };
      const stringToCareer = function (str) {
        let temp;
        temp = str.split(" ");
        if (temp.length === 2) {
          return { year: Number(temp[0].replace(/[^0-9]/g, '')), month: Number(temp[1].replace(/[^0-9]/g, '')) };
        } else {
          return { year: 0, month: 0 };
        }
      }
      const wordingToDate = function (str) {
        if (str === "기타") {
          return new Date(1800, 0, 1);
        } else {
          const today = new Date();
          let temp;
          temp = str.split(" ");
          if (temp.length >= 4) {
            return new Date(today.getFullYear(), Number(temp[0].replace(/[^0-9]/g, '')) - 1, Number(temp[1].replace(/[^0-9]/g, '')), Number(temp[3].replace(/[^0-9]/g, '')));
          } else {
            return new Date(1800, 0, 1);
          }
        }
      }

      let filteredObj, message;
      let tempArr;
      let tempArr0, tempArr1, tempArr2;
      let already, oppositeExist;
      let whereQuery, updateQuery;
      let tempAspirants, tempAspirant;

      filteredObj = {};
      for (let i in resultObj) {
        if (i !== "mode") {
          filteredObj[i] = resultObj[i].replace(/[ㄱ-ㅎㅏ-ㅣ\#\$\%\^\&\*\+\`\=\[\]\{\}\\\|\"\'\;\<\>]/gi, '').replace(/\t/g, ' ').replace(/  /g, ' ').replace(/__space__/g, '\n').trim();
        }
      }

      //date parsing
      filteredObj.date = new Date();

      //address parsing
      if (filteredObj.address !== undefined && filteredObj.detailAddress !== undefined) {
        filteredObj.address = filteredObj.address + " " + filteredObj.detailAddress;
        delete filteredObj.detailAddress;
      }

      //channel parsing
      filteredObj.webChannel = [];
      filteredObj.snsChannel = [];
      filteredObj.cloudChannel = [];
      if (filteredObj.channel !== undefined) {
        tempArr = filteredObj.channel.split("__input__");

        if (tempArr.length > 0) {
          tempArr0 = tempArr[0].split("__split__");
          if (tempArr0.length === 1 && tempArr0[0] === '') {
            filteredObj.webChannel = [];
          } else {
            filteredObj.webChannel = tempArr0;
          }
        } else {
          filteredObj.webChannel = [];
        }

        if (tempArr.length > 1) {
          tempArr1 = tempArr[1].split("__split__");
          if (tempArr1.length === 1 && tempArr1[0] === '') {
            filteredObj.snsChannel = [];
          } else {
            filteredObj.snsChannel = tempArr1;
          }
        } else {
          filteredObj.snsChannel = [];
        }

        if (tempArr.length > 2) {
          tempArr2 = tempArr[2].split("__split__");
          if (tempArr2.length === 1 && tempArr2[0] === '') {
            filteredObj.cloudChannel = [];
          } else {
            filteredObj.cloudChannel = tempArr2;
          }
        } else {
          filteredObj.cloudChannel = [];
        }

        delete filteredObj.channel;
      }

      if (resultObj.mode === "partnership") {

        filteredObj.status = "조정 필요";
        filteredObj.meetingTime = "기타";

        message = "새로운 디자이너 파트너십 신청서가 도착했습니다! \n";
        message += "문의일 : " + dateToString(filteredObj.date) + "\n";
        message += "성함 : " + filteredObj.designer + "\n";
        message += "연락처 : " + filteredObj.phone + "\n";
        message += "이메일 : " + filteredObj.email + "\n";
        message += "주소 : " + filteredObj.address + "\n";
        message += "사업자 분류 : " + filteredObj.classification + "\n";
        message += "회사명 : " + filteredObj.company + "\n";
        message += "사업자 등록번호 : " + filteredObj.businessNumber + "\n";
        message += "개업일 : " + filteredObj.startDate + "\n";
        message += "대표자 성함 : " + filteredObj.representative + "\n";
        message += "은행명 : " + filteredObj.bankName + "\n";
        message += "계좌번호 : " + filteredObj.bankAccount + "\n";
        message += "예금주 : " + filteredObj.bankTo + "\n";
        message += "기타 사항 : " + filteredObj.bankEtc + "\n";
        message += "인테리어 경력 : " + filteredObj.interiorCareer + "\n";
        message += "스타일링 경력 : " + filteredObj.stylingCareer + "\n";
        message += "경력 상세 : " + filteredObj.careerDetail + "\n";
        message += "홈페이지 : " + (filteredObj.webChannel.length > 0 ? filteredObj.webChannel.join(", ") : filteredObj.webChannel) + "\n";
        message += "SNS 채널 : " + (filteredObj.snsChannel.length > 0 ? filteredObj.snsChannel.join(", ") : filteredObj.snsChannel) + "\n";
        message += "클라우드 : " + (filteredObj.cloudChannel.length > 0 ? filteredObj.cloudChannel.join(", ") : filteredObj.cloudChannel) + "\n";
        message += "유입 경로 : " + filteredObj.comeFrom;

      } else if (resultObj.mode === "presentation") {

        if (filteredObj.presentationTimes !== "기타") {
          filteredObj.status = "미팅 대기";
        } else {
          filteredObj.status = "조정 필요";
        }

        message = "새로운 디자이너 설명회 참여 신청서가 도착했습니다!\n";
        message += "문의일 : " + dateToString(filteredObj.date) + "\n";
        message += "성함 : " + filteredObj.designer + "\n";
        message += "연락처 : " + filteredObj.phone + "\n";
        message += "이메일 : " + filteredObj.email + "\n";
        message += "주소 : " + filteredObj.address + "\n";
        message += "설명회 신청 시간 : " + filteredObj.presentationTimes + "\n";
        message += "홈페이지 : " + (filteredObj.webChannel.length > 0 ? filteredObj.webChannel.join(", ") : filteredObj.webChannel) + "\n";
        message += "SNS 채널 : " + (filteredObj.snsChannel.length > 0 ? filteredObj.snsChannel.join(", ") : filteredObj.snsChannel) + "\n";
        message += "클라우드 : " + (filteredObj.cloudChannel.length > 0 ? filteredObj.cloudChannel.join(", ") : filteredObj.cloudChannel) + "\n";
        message += "유입 경로 : " + filteredObj.comeFrom;

      } else if (resultObj.mode === "portfolio") {

        message = filteredObj.designer + " 디자이너님이 추가 포트폴리오를 전송하셨습니다!";

      }

      if (resultObj.mode !== "portfolio") {

        kakao.sendTalk(dictionary[resultObj.mode].kakao, filteredObj["designer"], filteredObj["phone"]).catch((err) => { console.log(err) });

        whereQuery = { phone: filteredObj["phone"] };
        already = await back.getAspirantsByQuery(whereQuery);

        updateQuery = {};
        if (resultObj.mode === "partnership") {

          updateQuery["designer"] = filteredObj.designer;
          updateQuery["phone"] = filteredObj.phone;
          updateQuery["email"] = filteredObj.email;
          updateQuery["address"] = filteredObj.address;

          updateQuery["submit.partnership.date"] = new Date();
          updateQuery["submit.partnership.boo"] = true;
          updateQuery["submit.comeFrom"] = filteredObj.comeFrom;

          updateQuery["information.company.classification"] = filteredObj.classification;
          updateQuery["information.company.name"] = filteredObj.company;
          updateQuery["information.company.businessNumber"] = filteredObj.businessNumber;
          updateQuery["information.company.start"] = stringToDate(filteredObj.startDate);
          updateQuery["information.company.representative"] = filteredObj.representative;

          updateQuery["information.account.bank"] = filteredObj.bankName;
          updateQuery["information.account.number"] = filteredObj.bankAccount;
          updateQuery["information.account.to"] = filteredObj.bankTo;
          updateQuery["information.account.etc"] = filteredObj.bankEtc;

          updateQuery["information.career.interior"] = stringToCareer(filteredObj.interiorCareer);
          updateQuery["information.career.styling"] = stringToCareer(filteredObj.stylingCareer);
          updateQuery["information.career.detail"] = filteredObj.careerDetail;

          if (already.length === 0) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;

            updateQuery["meeting.status"] = filteredObj.status;
            updateQuery["meeting.date"] = new Date(1800, 0, 1);
            updateQuery["submit.firstRequest.date"] = new Date();
            updateQuery["submit.firstRequest.method"] = "partnership";
            if (!ignorePhone.includes(filteredObj.phone)) {
              await back.createAspirant(updateQuery);
            } else {
              console.log(updateQuery);
            }
          } else {
            if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
              updateQuery["information.channel.web"] = filteredObj.webChannel;
            }
            if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
              updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            }
            if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
              updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
            }
            if (!ignorePhone.includes(filteredObj.phone)) {
              await back.updateAspirant([ whereQuery, updateQuery ]);
            } else {
              console.log([ whereQuery, updateQuery ]);
            }
          }

        } else {

          updateQuery["designer"] = filteredObj.designer;
          updateQuery["phone"] = filteredObj.phone;
          updateQuery["email"] = filteredObj.email;
          updateQuery["address"] = filteredObj.address;

          updateQuery["submit.presentation.date"] = new Date();
          updateQuery["submit.presentation.boo"] = true;
          updateQuery["submit.comeFrom"] = filteredObj.comeFrom;

          if (already.length === 0) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;

            updateQuery["meeting.status"] = filteredObj.status;
            updateQuery["meeting.date"] = wordingToDate(filteredObj.presentationTimes);
            updateQuery["submit.firstRequest.date"] = new Date();
            updateQuery["submit.firstRequest.method"] = "presentation";
            if (!ignorePhone.includes(filteredObj.phone)) {
              await back.createAspirant(updateQuery);
            } else {
              console.log(updateQuery);
            }
          } else {
            if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
              updateQuery["information.channel.web"] = filteredObj.webChannel;
            }
            if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
              updateQuery["information.channel.sns"] = filteredObj.snsChannel;
            }
            if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
              updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
            }
            if (filteredObj.presentationTimes !== "기타") {
              updateQuery["meeting.status"] = filteredObj.status;
              updateQuery["meeting.date"] = wordingToDate(filteredObj.presentationTimes);
            }
            if (!ignorePhone.includes(filteredObj.phone)) {
              await back.updateAspirant([ whereQuery, updateQuery ]);
            } else {
              console.log([ whereQuery, updateQuery ]);
            }
          }
        }

        if (!ignorePhone.includes(filteredObj.phone)) {
          await messageSend({ text: message, channel: "#300_designer" });

          tempAspirants = await back.getAspirantsByQuery(whereQuery);

        } else {
          await messageSend({ text: message, channel: "#error_log" });
        }

      } else if (resultObj.mode === "portfolio") {

        whereQuery = { phone: filteredObj["phone"] };
        already = await back.getAspirantsByQuery(whereQuery);

        updateQuery = {};

        if (already.length > 0) {
          if (already[0].information.channel.web.length <= filteredObj.webChannel.length) {
            updateQuery["information.channel.web"] = filteredObj.webChannel;
          }
          if (already[0].information.channel.sns.length <= filteredObj.snsChannel.length) {
            updateQuery["information.channel.sns"] = filteredObj.snsChannel;
          }
          if (already[0].information.channel.cloud.length <= filteredObj.cloudChannel.length) {
            updateQuery["information.channel.cloud"] = filteredObj.cloudChannel;
          }
          if (!ignorePhone.includes(filteredObj.phone)) {
            await instance.back.updateAspirant([ whereQuery, updateQuery ]);
          } else {
            console.log([ whereQuery, updateQuery ]);
          }
        }

        if (!ignorePhone.includes(filteredObj.phone)) {
          await messageSend({ text: message, channel: "#300_designer" });
        } else {
          await messageSend({ text: message, channel: "#error_log" });
        }

      }

      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_designerSubmit): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_salesClient = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const kakao = this.kakao;
  const { equalJson, errorLog, messageSend } = this.mother;
  let obj = {};
  obj.link = [ "/salesClient" ];
  obj.func = async function (req, res) {
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
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "dailySales";
      const { mode } = req.body;
      const monthAgo = 3;
      let basicRows;
      let pureCliids;
      let clients, clientHistories;
      let standard;
      let resultObj;
      let whereQuery, updateQuery;
      let filteredHistory;
      let ongoingClients;
      let ongoingClientsRequests;
      let ongoingClientsCliids;
      let orQuery;
      let newBasicRows;
      let copiedObj;
      let ago;
      let targetCliids;
      let targetClients;
      let targetHistories;
      let copiedSend;

      standard = new Date();
      standard.setMonth(standard.getMonth() - monthAgo);

      resultObj = { message: "done" };

      if (mode === "init") {

        ongoingClients = await back.getClientsByQuery({
          requests: {
            $elemMatch: {
              "analytics.response.status": {
                $regex: "^[응장]"
              }
            }
          }
        }, { selfMongo: selfCoreMongo, withTools: true });

        ongoingClientsRequests = ongoingClients.getRequestsTong();
        ongoingClientsRequests.sort((a, b) => {
          return a.request.timeline.valueOf() - b.request.timeline.valueOf();
        });

        if (ongoingClientsRequests.length === 0) {
          basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
        } else {
          basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
        }

        basicRows.sort((a, b) => {
          return b.date.valueOf() - a.date.valueOf();
        })
        
        pureCliids = basicRows.map((o) => {
          return o.cliids.map((o2) => {
            return o2.cliid;
          })
        }).flat();

        clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
        clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
        
        filteredHistory = [];
        for (let obj of clientHistories) {
          filteredHistory.push({
            cliid: obj.cliid,
            manager: obj.manager,
            curation: obj.curation,
          })
        }

        resultObj = {
          clients: clients.toNormal(),
          histories: filteredHistory,
          sales: basicRows
        };

      } else if (mode === "search") {

        const { value } = req.body;
        if (value.trim() === '' || value.trim() === '.') {

          ongoingClients = await back.getClientsByQuery({
            requests: {
              $elemMatch: {
                "analytics.response.status": {
                  $regex: "^[응장]"
                }
              }
            }
          }, { selfMongo: selfCoreMongo, withTools: true });
  
          ongoingClientsRequests = ongoingClients.getRequestsTong();
          ongoingClientsRequests.sort((a, b) => {
            return a.request.timeline.valueOf() - b.request.timeline.valueOf();
          });
  
          if (ongoingClientsRequests.length === 0) {
            basicRows = await back.mongoRead(collection, { date: { $gte: standard } }, { selfMongo });
          } else {
            basicRows = await back.mongoRead(collection, { date: { $gte: ongoingClientsRequests[0].request.timeline } }, { selfMongo });
          }

          pureCliids = basicRows.map((o) => {
            return o.cliids.map((o2) => {
              return o2.cliid;
            })
          }).flat();

          clients = await back.getClientsByQuery({ $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo: selfCoreMongo });
          clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
          
          filteredHistory = [];
          for (let obj of clientHistories) {
            filteredHistory.push({
              cliid: obj.cliid,
              manager: obj.manager,
              curation: obj.curation,
            })
          }

          resultObj = {
            clients: clients.toNormal(),
            histories: filteredHistory,
            sales: basicRows
          };

        } else {

          ongoingClients = await back.getClientsByQuery({
            name: { $regex: value }
          }, { selfMongo: selfCoreMongo });
          ongoingClientsCliids = ongoingClients.toNormal().map((c) => { return c.cliid });

          orQuery = [];
          for (let cliid of ongoingClientsCliids) {
            orQuery.push({
              cliids: {
                $elemMatch: { cliid }
              }
            })
          }

          if (orQuery.length === 0) {
            basicRows = [];
            resultObj = {
              clients: [],
              histories: [],
              sales: basicRows
            };
          } else {
            basicRows = await back.mongoRead(collection, { $or: orQuery }, { selfMongo });

            newBasicRows = [];
            for (let obj of basicRows) {
              copiedObj = equalJson(JSON.stringify(obj));
              copiedObj.cliids = copiedObj.cliids.filter((o) => {
                return ongoingClientsCliids.includes(o.cliid);
              })
              newBasicRows.push(copiedObj);
            }

            pureCliids = newBasicRows.map((o) => {
              return o.cliids.map((o2) => {
                return o2.cliid;
              })
            }).flat();

            if (pureCliids.length === 0) {
              filteredHistory = [];
            } else {
              clientHistories = await back.mongoRead("clientHistory", { $or: pureCliids.map((cliid) => { return { cliid } }) }, { selfMongo });
              filteredHistory = [];
              for (let obj of clientHistories) {
                filteredHistory.push({
                  cliid: obj.cliid,
                  manager: obj.manager,
                  curation: obj.curation,
                })
              }
            }

            resultObj = {
              clients: ongoingClients.toNormal(),
              histories: filteredHistory,
              sales: newBasicRows
            };

          }

        }

      } else if (mode === "update") {

        ({ whereQuery, updateQuery } = equalJson(req.body));
        await back.mongoUpdate(collection, [ whereQuery, updateQuery ], { selfMongo });
        resultObj = { message: "done" };

      } else if (mode === "lowLow") {

        if (typeof req.body.cliid === "string") {

          targetClients = await back.getClientsByQuery({ cliid: req.body.cliid }, { selfMongo: selfCoreMongo });
          targetHistories = await back.mongoRead("clientHistory", { cliid: req.body.cliid }, { selfMongo });

          for (let client of targetClients) {
            await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name });
            await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#cx", voice: false });
          }

          for (let history of targetHistories) {

            whereQuery = { cliid: history.cliid };
            updateQuery = {};

            copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
            copiedSend.push({
              page: "lowLowPush",
              date: new Date(),
              mode: null,
              who: {
                name: null,
                email: null,
              }
            })
            copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })

            updateQuery["curation.analytics.send"] = copiedSend;

            await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
          }

          resultObj = copiedSend;

        } else {

          ago = new Date();
          ago.setDate(ago.getDate() - 1);
  
          basicRows = await back.mongoRead(collection, { date: { $gte: ago } }, { selfMongo });
          if (basicRows.length === 0) {
            resultObj = { message: "fail" };
          } else {
            targetCliids = basicRows[0].cliids;
            targetCliids = targetCliids.filter((obj) => {
              return obj.priority === 0 && obj.target === 0;
            });
            if (targetCliids.length === 0) {
              resultObj = { message: "done" };
            } else {
              targetClients = await back.getClientsByQuery({ $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo: selfCoreMongo });
              targetHistories = await back.mongoRead("clientHistory", { $or: targetCliids.map((obj) => { return { cliid: obj.cliid } }) }, { selfMongo });
  
              for (let client of targetClients) {
                await kakao.sendTalk("hahaClientSend", client.name, client.phone, { client: client.name });
                await messageSend({ text: client.name + " 고객님께 하하(타겟 하, 우선순위 하) 고객용 알림톡을 전송하였습니다!", channel: "#cx", voice: false });
              }
  
              for (let history of targetHistories) {
  
                whereQuery = { cliid: history.cliid };
                updateQuery = {};
  
                copiedSend = equalJson(JSON.stringify(history.curation.analytics.send));
                copiedSend.push({
                  page: "lowLowPush",
                  date: new Date(),
                  mode: null,
                  who: {
                    name: null,
                    email: null,
                  }
                })
                copiedSend.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() })
  
                updateQuery["curation.analytics.send"] = copiedSend;
                await back.mongoUpdate("clientHistory", [ whereQuery, updateQuery ], { selfMongo });
              }
  
              resultObj = { message: "done" };
            }
          }

        }
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_salesClient): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_dailySales = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageSend, dateToString, stringToDate } = this.mother;
  let obj = {};
  obj.link = [ "/dailySales" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const aMonthAgo = new Date();
      aMonthAgo.setDate(aMonthAgo.getDate() - 30);
      const clients = await back.getClientsByQuery({
        requests: {
          $elemMatch: {
            "request.timeline": { $gte: aMonthAgo }
          }
        }
      }, { selfMongo: selfCoreMongo, withTools: true });
      const requests = clients.getRequestsTong();
      const collection = "dailySales";
      const idMaker = (date) => {
        return `sales_${dateToString(date).replace(/\-/gi, '')}`;
      }
      let now;
      let standard0From, standard1From, standard2From, standard3From, standard4From;
      let standard0To, standard1To, standard2To, standard3To, standard4To;
      let dummy;
      let thisRequests;
      let matrix;
      let rows;
      let resultObj;

      now = new Date();

      standard0From = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);    
      while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
        standard0From.setDate(standard0From.getDate() - 1);
      }
      standard1From = new Date(JSON.stringify(standard0From).slice(1, -1));
      standard1From.setDate(standard1From.getDate() - 1);
      while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
        standard1From.setDate(standard1From.getDate() - 1);
      }
      standard2From = new Date(JSON.stringify(standard1From).slice(1, -1));
      standard2From.setDate(standard2From.getDate() - 1);
      while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
        standard2From.setDate(standard2From.getDate() - 1);
      }
      standard3From = new Date(JSON.stringify(standard2From).slice(1, -1));
      standard3From.setDate(standard3From.getDate() - 1);
      while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
        standard3From.setDate(standard3From.getDate() - 1);
      }
      standard4From = new Date(JSON.stringify(standard3From).slice(1, -1));
      standard4From.setDate(standard4From.getDate() - 1);
      while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
        standard4From.setDate(standard4From.getDate() - 1);
      }

      standard0To = new Date(JSON.stringify(standard0From).slice(1, -1));
      standard1To = new Date(JSON.stringify(standard1From).slice(1, -1));
      standard2To = new Date(JSON.stringify(standard2From).slice(1, -1));
      standard3To = new Date(JSON.stringify(standard3From).slice(1, -1));
      standard4To = new Date(JSON.stringify(standard4From).slice(1, -1));

      standard0From.setDate(standard0From.getDate() - 1);
      while (standard0From.getDay() === 0 || standard0From.getDay() === 6) {
        standard0From.setDate(standard0From.getDate() - 1);
      }
      standard1From.setDate(standard1From.getDate() - 1);
      while (standard1From.getDay() === 0 || standard1From.getDay() === 6) {
        standard1From.setDate(standard1From.getDate() - 1);
      }
      standard2From.setDate(standard2From.getDate() - 1);
      while (standard2From.getDay() === 0 || standard2From.getDay() === 6) {
        standard2From.setDate(standard2From.getDate() - 1);
      }
      standard3From.setDate(standard3From.getDate() - 1);
      while (standard3From.getDay() === 0 || standard3From.getDay() === 6) {
        standard3From.setDate(standard3From.getDate() - 1);
      }
      standard4From.setDate(standard4From.getDate() - 1);
      while (standard4From.getDay() === 0 || standard4From.getDay() === 6) {
        standard4From.setDate(standard4From.getDate() - 1);
      }

      matrix = [
        [ standard0From, standard0To ],
        [ standard1From, standard1To ],
        [ standard2From, standard2To ],
        [ standard3From, standard3To ],
        [ standard4From, standard4To ],
      ];

      for (let [ standardFrom, standardTo ] of matrix) {

        dummy = {
          id: idMaker(standardTo),
          date: new Date(JSON.stringify(standardTo).slice(1, -1)),
          range: {
            from: new Date(JSON.stringify(standardFrom).slice(1, -1)),
            to: new Date(JSON.stringify(standardTo).slice(1, -1)),
          },
          cliids: [],
        }
    
        thisRequests = requests.filter((request) => { return request.request.timeline.valueOf() > standardFrom.valueOf() && request.request.timeline.valueOf() <= standardTo.valueOf() })
    
        for (let obj of thisRequests) {
          dummy.cliids.push({
            cliid: obj.cliid,
            possible: 0,
            priority: 0,
            target: 0,
          })
        }
    
        rows = await back.mongoRead(collection, { id: dummy.id }, { selfMongo });
        if (rows.length === 0) {
          await back.mongoCreate(collection, equalJson(JSON.stringify(dummy)), { selfMongo });
        }

      }

      resultObj = { message: "done" };

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_dailySales): " + e.message);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_dailySalesReport = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, errorLog, messageSend, dateToString, stringToDate } = this.mother;
  let obj = {};
  obj.link = [ "/dailySalesReport" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (req.body.startYear === undefined || req.body.startMonth === undefined || req.body.endYear === undefined || req.body.endMonth === undefined) {
        throw new Error("invalid post");
      }
      const { startYear, startMonth, endYear, endMonth } = req.body;
      const selfMongo = instance.mongolocal;
      const selfCoreMongo = instance.mongo;
      const collection = "dailySales";
      const historyCollection = "clientHistory";
      const proposalKeywords = "designerProposal";
      const db = "miro81";
      const rowToCliids = (rows) => {
        const targetRows = equalJson(JSON.stringify(rows));
        return targetRows.map((o) => { return o.cliids.map(({ cliid }) => { return cliid }) }).flat();
      }
      let rows;
      let rowsCopy;
      let whereQuery;
      let thisClients, thisHistories;
      let thisProjects;
      let reports;
      let reportObject;
      let managers;
      let targetRows;
      let targetCliids;
      let targetClients;
      let monthRows, monthCliids, monthClients;
      let fromDate;
      let toDate;
      let currentClients;
      let rowsFlat;
      let resultObj;
      let todayClients;
      let startDate, endDate;
      let allSendHistories;
      let monthFromDate;
      let toDateStandard;
      let contractProjects;
      let contractProjectsCliids;
      let contractProjectsCopied;
      let monthProjects;
      let thisDateCopied;

      startDate = new Date(Number(startYear), Number(startMonth) - 1, 1, 8, 0, 0);
      endDate = new Date(Number(endYear), Number(endMonth) - 1, 1, 10, 0, 0);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      contractProjects = await back.getProjectsByQuery({
        $and: [
          {
            "process.contract.first.date": { $gte: startDate }
          },
          {
            "process.contract.first.date": { $lte: endDate }
          },
        ]
      }, { selfMongo: selfCoreMongo });
      contractProjectsCliids = contractProjects.toNormal().map((p) => { return p.cliid });

      rows = await back.mongoRead(collection, {
        $and: [
          {
            date: { $gte: startDate }
          },
          {
            date: { $lte: endDate }
          },
        ]
      }, { selfMongo });

      rows.sort((a, b) => {
        return b.date.valueOf() - a.date.valueOf();
      });

      rowsCopy = equalJson(JSON.stringify(rows));
      rowsFlat = rowsCopy.map(({ cliids }) => { return cliids }).flat();
  
      whereQuery = rowToCliids(rows).concat(contractProjectsCliids);
      whereQuery = { $or: [ ...new Set(whereQuery) ].map((cliid) => { return { cliid } }) }

      allSendHistories = await selfMongo.db(db).collection(historyCollection).find({
        "curation.analytics.send": {
          $elemMatch: {
            date: { $gte: startDate }
          }
        }
      }).project({ manager: 1, "curation.analytics.send": 1, _id: 0 }).toArray();

      if (whereQuery["$or"].length > 0) {
  
        thisClients = (await back.getClientsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
        thisProjects = (await back.getProjectsByQuery(whereQuery, { selfMongo: selfCoreMongo })).toNormal();
        thisHistories = await selfMongo.db(db).collection(historyCollection).find(whereQuery).project({ cliid: 1, manager: 1, _id: 0 }).toArray();
        contractProjectsCopied = contractProjects.toNormal();

        managers = [ ...new Set(thisHistories.map((o) => { return o.manager.trim() }).filter((str) => { return str !== '' && str !== '-' })) ];
        managers.sort();
        managers.push("미지정");
        managers.push("total");
  
        reports = [];
        for (let row of rows) {
  
          reportObject = {};
          reportObject.standard = row.date;
  
          // today stadard
          todayClients = row.cliids.map(({ cliid }) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of todayClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }

          // total standard
          targetRows = rowsCopy.filter((o) => { return o.date.valueOf() <= row.date.valueOf() });
          targetCliids = rowToCliids(targetRows);
          targetClients = targetCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of targetClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }
  
          // month standard
          fromDate = new Date(row.date.getFullYear(), row.date.getMonth(), 1, 8, 0, 0);
          monthFromDate = new Date(JSON.stringify(fromDate).slice(1, -1));
          toDate = new Date(row.date.getFullYear(), row.date.getMonth() + 1, 1);
          monthRows = rowsCopy.filter((o) => {
            return (o.date.valueOf() > fromDate.valueOf() && o.date.valueOf() < toDate.valueOf()) && (o.date.valueOf() <= row.date.valueOf());
          });
          monthCliids = rowToCliids(monthRows);
          monthClients = monthCliids.map((cliid) => { return thisClients.find((c) => { return c.cliid === cliid }) });
          for (let client of monthClients) {
            client.history = thisHistories.find((h) => { return h.cliid === client.cliid });
            client.project = thisProjects.find((p) => { return p.cliid === client.cliid });
            client.row = rowsFlat.find((c) => { return c.cliid === client.cliid });
          }
          toDateStandard = new Date(JSON.stringify(row.date).slice(1, -1));
          toDateStandard.setHours(23);
          toDateStandard.setMinutes(59);
          toDateStandard.setSeconds(59);
          monthProjects = contractProjectsCopied.filter((obj) => {
            return (obj.process.contract.first.date.valueOf() > fromDate.valueOf() && obj.process.contract.first.date.valueOf() < toDate.valueOf()) && (obj.process.contract.first.date.valueOf() <= toDateStandard.valueOf());
          });
          for (let project of monthProjects) {
            project.history = thisHistories.find((h) => { return h.cliid === project.cliid });
          }

          // day clients
          reportObject.dayClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.dayClients.push({
                manager,
                value: row.cliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.dayClients.push({
                manager,
                value: todayClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.dayClients.push({
                manager,
                value: todayClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }

          // total clients
          reportObject.totalClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalClients.push({
                manager,
                value: targetCliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.totalClients.push({
                manager,
                value: targetClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.totalClients.push({
                manager,
                value: targetClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }
  
          // monthly clients
          reportObject.monthClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthClients.push({
                manager,
                value: monthCliids.length,
              })
            } else if (manager === "미지정") {
              reportObject.monthClients.push({
                manager,
                value: monthClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.monthClients.push({
                manager,
                value: monthClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }
  
          // current clients
          currentClients = targetClients.filter((client) => {
            return client.requests.some(({ analytics }) => { return /^[응장]/gi.test(analytics.response.status) })
          })
          reportObject.currentClients = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.currentClients.push({
                manager,
                value: currentClients.length,
              })
            } else if (manager === "미지정") {
              reportObject.currentClients.push({
                manager,
                value: currentClients.filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.currentClients.push({
                manager,
                value: currentClients.filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }
  
          // contract possible clients
          reportObject.contractPossible = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.row.possible > 0 }).length,
              })
            } else if (manager === "미지정") {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.row.possible > 0 }).filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.contractPossible.push({
                manager,
                value: currentClients.filter((c) => { return c.row.possible > 0 }).filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }
  
          // total contracts
          reportObject.totalContracts = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalContracts.push({
                manager,
                value: targetClients.filter((client) => { return client.project !== undefined && client.project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf() }).length,
              })
            } else if (manager === "미지정") {
              reportObject.totalContracts.push({
                manager,
                value: targetClients.filter((client) => { return client.project !== undefined && client.project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf() }).filter((c) => { return !managers.includes(c.history.manager) }).length,
              })
            } else {
              reportObject.totalContracts.push({
                manager,
                value: targetClients.filter((client) => { return client.project !== undefined && client.project.process.contract.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf() }).filter((c) => { return c.history.manager === manager }).length,
              })
            }
          }
  
          // month contracts
          reportObject.monthContracts = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.length,
              })
            } else if (manager === "미지정") {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.filter((p) => { return !managers.includes(p.history.manager) }).length,
              })
            } else {
              reportObject.monthContracts.push({
                manager,
                value: monthProjects.filter((p) => { return p.history.manager === manager }).length,
              })
            }
          }
  
          // day proposal
          reportObject.dayProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.dayProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return dateToString(obj.date) === dateToString(row.date) }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          // month proposal
          reportObject.monthProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.monthProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= monthFromDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          // total proposal
          reportObject.totalProposals = [];
          for (let manager of managers) {
            if (manager === "total") {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else if (manager === "미지정") {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return !managers.includes(c.manager) }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            } else {
              reportObject.totalProposals.push({
                manager,
                value: allSendHistories.filter((c) => { return c.manager === manager }).map(({ curation }) => { return curation.analytics.send.filter((obj) => { return obj.date.valueOf() >= startDate.valueOf() && obj.date.valueOf() <= toDateStandard.valueOf() }) }).flat().filter((obj) => { return obj.page === proposalKeywords }).length,
              })
            }
          }

          reports.push(reportObject);
        }
  
        resultObj = { reports };
      } else {
        resultObj = { reports: [] };
      }

      res.send(JSON.stringify(resultObj));

    } catch (e) {
      await errorLog("Console 서버 문제 생김 (rou_post_dailySalesReport): " + e.message);
      console.log(e);
      res.send(JSON.stringify({ error: e.message }));
    }
  }
  return obj;
}