//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents", "/getBuilders" ];
  obj.func = async function (req, res) {
    try {
      let standard, raw_data, data, optionQuery, whereQuery;
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
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ standard, data }));
      } else {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(raw_data.toNormal()));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getDocuments): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_searchDocuments = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/searchClients", "/searchProjects", "/searchDesigners", "/searchContents" ];
  obj.func = async function (req, res) {
    try {
      let standard;
      let map, mapArr;
      let searchQuery, searchArr, tempObj, tempObj2;
      let whereQuery;
      let data;
      let rawJson;
      let filteredArr;
      let idName;

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
  const { fileSystem, pythonExecute, shell, shellLink, equalJson } = this.mother;
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

      switch (map[column].type) {
        case "string":
          finalValue = String(value);
          pastFinalValue = String(pastValue);
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
          if (/^미/.test(value) || /^비/.test(value) || /^안/.test(value) || /no/gi.test(value) || value === "false" || value === "null") {
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
          shell.exec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
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
  const { fileSystem, shell, shellLink, equalJson } = this.mother;
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
        shell.exec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
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
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents", "/rawUpdateAspirant" ];
  obj.func = async function (req, res) {
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

      cookies = DataRouter.cookieParsing(req);
      if (cookies !== null) {
        if (cookies.homeliaisonConsoleLoginedName !== undefined && cookies.homeliaisonConsoleLoginedEmail !== undefined) {
          updateTong = {
            user: {
              name: cookies.homeliaisonConsoleLoginedName,
              email: cookies.homeliaisonConsoleLoginedEmail
            },
            where: Object.values(whereQuery)[0],
            update: { updateQuery: JSON.stringify(updateQuery) },
            date: new Date()
          };
          back.mongoCreate((req.url.replace(/^\/rawU/, 'u') + "Log"), updateTong, { selfMongo: instance.mongolocal }).catch(function (e) {
            throw new Error(e);
          });
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_rawUpdateDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return String(number);
    }
  }
  let obj = {};
  obj.link = "/getClientReport";
  obj.func = async function (req, res) {
    try {
      const today = new Date();
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

      resultArr = [];

      for (let matrix of dateMatrix) {
        monthArr = [];
        for (let arr of matrix) {
          obj = {};

          obj.cliid = {};
          obj.proid = {};

          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": arr[0], "$lt": arr[2] } } } };
          clients = await instance.back.getClientsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.client = clients.length;
          obj.cliid.client = clients.toNormal().map((obj) => { return obj.cliid; });
          obj.proid.client = [];

          //proposal
          cliidArr_raw = [];
          cliidArr = [];
          processTong = [];
          pastTong = [];
          for (let client of clients) {
            cliidArr_raw.push(client.cliid);
          }
          cliidArr_raw = Array.from(new Set(cliidArr_raw));
          for (let cliid of cliidArr_raw) {
            cliidArr.push({ cliid });
          }
          if (cliidArr.length > 0) {
            searchQuery = { "$or": cliidArr };
            process = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
            for (let i of process) {
              if (!pastTong.includes(i.cliid)) {
                processTong.push(i);
              }
              pastTong.push(i.cliid);
            }
            obj.proposal = processTong.length;
          } else {
            obj.proposal = 0;
          }
          obj.cliid.proposal = cliidArr_raw;
          obj.proid.proposal = [];

          //recommend
          searchQuery = { "proposal.date": { "$gte": arr[0], "$lt": arr[2] } };
          proposals = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          pastTong = [];
          proposalsTong = [];
          for (let i of proposals) {
            if (!pastTong.includes(i.cliid)) {
              proposalsTong.push(i);
            }
            pastTong.push(i.cliid);
          }
          obj.recommend = proposalsTong.length;
          obj.cliid.recommend = [ ...new Set(proposals.toNormal().map((obj) => { return obj.cliid; })) ];
          obj.proid.recommend = [];

          //contract
          searchQuery = { "process.contract.first.date": { "$gte": arr[0], "$lt": arr[2] } };
          contracts = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.contract = contracts.length;
          obj.cliid.contract = [ ...new Set(contracts.toNormal().map((obj) => { return obj.cliid; })) ];
          obj.proid.contract = contracts.toNormal().map((obj) => { return obj.proid });

          //process start
          processNumber = 0;
          cliidTempArr = [];
          proidTempArr = [];
          for (let c of clients) {
            for (let { analytics: { proposal } } of c.requests) {
              for (let obj of proposal) {
                if (obj.contract) {
                  processNumber = processNumber + 1;
                  cliidTempArr.push(c.cliid);
                  proidTempArr.push(obj.proid);
                }
              }
            }
          }
          obj.process = processNumber;
          obj.cliid.process = [ ...new Set(cliidTempArr) ];
          obj.proid.process = [ ...new Set(proidTempArr) ];

          monthArr.push(obj);
        }
        resultArr.push(monthArr);
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
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return String(number);
    }
  }

  let obj = {};
  obj.link = "/getProjectReport";
  obj.func = async function (req, res) {
    try {
      let target;
      let resultObj;
      let temp, temp2;
      let tempObj, tempArr;
      let startDay;
      let endDay;
      let searchQuery0, searchQuery1, searchQuery2, searchQuery3, searchQuery4, searchQuery5, projects;
      let cliidArr, desidArr;
      let tempAmount;

      resultObj = {};
      resultObj.today = req.body.today;
      startDay = new Date(Number(req.body.start.split("-")[0]), Number(req.body.start.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.start.split("-")[2].replace(/^0/, '')));
      endDay = new Date(Number(req.body.end.split("-")[0]), Number(req.body.end.split("-")[1].replace(/^0/, '')) - 1, Number(req.body.end.split("-")[2].replace(/^0/, '')));
      resultObj.startDay = req.body.start;
      resultObj.endDay = req.body.end;

      resultObj.projects = [];
      for (let i = 0; i < 6; i++) {

        if (i === 0) {
          searchQuery0 = { "process.contract.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 1) {
          searchQuery0 = { "process.contract.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 2) {
          searchQuery0 = { "process.contract.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery0, searchQuery1 ] };
        } else if (i === 3) {
          searchQuery3 = { "process.contract.remain.date": { "$gte": new Date(2000, 0, 1) } };
          searchQuery4 = { "process.calculation.payments.first.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery0 = { "process.calculation.payments.remain.date": { "$lt": new Date(2000, 0, 1) } };
          searchQuery5 = { "$or": [ searchQuery4, searchQuery0 ] };
          searchQuery1 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery5, searchQuery1, searchQuery3 ] };
        } else if (i === 4) {
          searchQuery0 = { "process.calculation.payments.first.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.date": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        } else if (i === 5) {
          searchQuery0 = { "process.calculation.payments.first.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery1 = { "process.calculation.payments.remain.cancel": { "$gte": startDay, "$lt": endDay } };
          searchQuery4 = { "$or": [ searchQuery0, searchQuery1 ] };
          searchQuery3 = { "desid": { "$regex": "^d" } };
          searchQuery2 = { "$and": [ searchQuery4, searchQuery3 ] };
        }

        searchQuery2["$and"].push({ "process.status": { "$not": { "$regex": "^[홀드]" } } });

        temp = await back.getProjectsByQuery(searchQuery2, { selfMongo: instance.mongo });

        cliidArr = [];
        desidArr = [];
        for (let j = 0; j < temp.length; j++) {
          cliidArr.push({ cliid: temp[j].cliid });
          desidArr.push({ desid: temp[j].desid });
        }

        if (i < 3) {
          if (cliidArr.length > 0) {
            temp2 = await back.getClientsByQuery({ "$or": cliidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        } else {
          if (desidArr.length > 0) {
            temp2 = await back.getDesignersByQuery({ "$or": desidArr }, { selfMongo: instance.mongo });
          } else {
            temp2 = [];
          }
        }

        tempArr = [];
        for (let j = 0; j < temp.length; j++) {
          tempObj = {};
          tempObj.date = "1001-01-01";
          tempObj.proid = temp[j].proid;

          if (i === 0) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 1) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.date);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.amount.consumer) + "만원";
          } else if (i === 2) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].cliid === temp[j].cliid) {
                tempObj.name = temp2[z].name;
              }
            }
            tempObj.date = DataRouter.dateToString(temp[j].process.contract.remain.cancel);
            tempObj.amount = DataRouter.autoComma(temp[j].process.contract.remain.calculation.refund) + "만원";
          } else if (i === 3) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if ((new Date(2000, 0, 1)).valueOf() >= temp[j].process.calculation.payments.remain.date.valueOf()) {
              tempAmount = 0.5;
            }
            if ((new Date(2000, 0, 1)).valueOf() >= temp[j].process.calculation.payments.first.date.valueOf()) {
              tempAmount = 1;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(temp[j].process.calculation.payments.totalAmount * tempAmount)) + "만원";
          } else if (i === 4) {

            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if (startDay.valueOf() <= temp[j].process.calculation.payments.first.date.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.first.date.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.first.amount;
            }
            if (startDay.valueOf() <= temp[j].process.calculation.payments.remain.date.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.remain.date.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.remain.amount;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(tempAmount)) + "만원";
          } else if (i === 5) {
            for (let z = 0; z < temp2.length; z++) {
              if (temp2[z].desid === temp[j].desid) {
                tempObj.name = temp2[z].designer;
              }
            }

            tempAmount = 0;
            if (startDay.valueOf() <= temp[j].process.calculation.payments.first.cancel.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.first.cancel.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.first.refund;
            }
            if (startDay.valueOf() <= temp[j].process.calculation.payments.remain.cancel.valueOf() && endDay.valueOf() >= temp[j].process.calculation.payments.remain.cancel.valueOf()) {
              tempAmount += temp[j].process.calculation.payments.remain.refund;
            }

            tempObj.amount = DataRouter.autoComma(Math.floor(tempAmount)) + "만원";
          }
          tempArr.push(tempObj);
        }
        resultObj.projects.push(tempArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getProjectReport): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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
        tong.push('- ' + tempString);
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

        responseArr.push((historyObj.history === undefined ? '' : stringFilter(historyObj.history)));
        responseArr.push((historyObj.designer === undefined ? '' : stringFilter(historyObj.designer)));
        responseArr.push((historyObj.client === undefined ? '' : stringFilter(historyObj.client)));
        responseArr.push((historyObj.photo === undefined ? '' : stringFilter(historyObj.photo)));

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
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getHistory): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateHistory = function () {
  const instance = this;
  const { fileSystem, shell, shellLink, equalJson } = this.mother;
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

      for (let member of members) {
        if (member.email.includes(email)) {
          thisPerson = member.name;
          break;
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

      if (column !== null) {
        await fileSystem(`write`, [ logDir + "/" + method + "_" + "latest.json", JSON.stringify({ path: method, who: thisPerson, where: id, column: "history_" + column, value: "", date: today }) ]);
        const dir = await fileSystem(`readDir`, [ logDir ]);
        fileTarget = null;
        for (let fileName of dir) {
          if ((new RegExp("^" + id)).test(fileName)) {
            fileTarget = fileName;
          }
        }
        if (fileTarget !== null) {
          shell.exec(`rm -rf ${shellLink(logDir)}/${fileTarget}`);
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
        cookies = DataRouter.cookieParsing(req);
        dummy = {
          page,
          date: new Date(),
          mode: query,
          who: {
            name: cookies.homeliaisonConsoleLoginedName,
            email: cookies.homeliaisonConsoleLoginedEmail
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
  const { ghostRequest, equalJson, messageSend, errorLog } = this.mother;
  const url = require("url");
  let obj = {};
  obj.link = "/sendSlack";
  obj.func = async function (req, res) {
    try {
      let link;
      let link_index;
      let row_message, new_message;
      let query;
      let requrl;

      link = '';
      link_index = 0;
      row_message = '';
      new_message = '';

      if (req.body.linkmake !== undefined) {
        query = equalJson(req.body.query);
        requrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.body.link,
        });

        link += requrl + '?';
        for (let i of query) {
          link += i.standard + '=' + i.value + '&'
        }
        link = link.slice(0, -1);

        row_message = req.body.message;
        link_index = row_message.search(/link:/g);
        new_message = row_message.slice(0, link_index) + "link: " + link + row_message.slice(link_index + 6);

        if (req.body.channel === "#error_log") {
          await errorLog(new_message);
        } else {
          await messageSend({ text: new_message, channel: req.body.channel });
        }

      } else {

        if (req.body.channel === "#error_log") {
          await errorLog(req.body.message);
        } else {
          await messageSend({ text: req.body.message, channel: req.body.channel });
        }

      }

      if (req.body.voice !== undefined) {
        await ghostRequest("voice", { text: req.body.message });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_sendSlack): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSheets = function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  const { ghostRequest, equalJson } = this.mother;
  let obj = {};
  obj.link = "/sendSheets";
  obj.func = async function (req, res) {
    try {
      if (req.body.sheetName === undefined || req.body.parentId === undefined || req.body.values === undefined) {
        throw new Error("must be sheetName, parentId");
      }
      let sheetsId, response, values, sheetsTargets, tempArr, async;

      async = false;
      if (req.body.async !== undefined || req.body.multiple !== undefined) {
        async = true;
      }

      if (!async) {

        if (req.body.newMake !== undefined) {
          sheetsId = await sheets.create_newSheets_inPython(req.body.sheetName, req.body.parentId);
          if (req.body.tapName !== undefined) {
            await sheets.update_defaultSheetName_inPython(sheetsId, req.body.tapName);
          }
          values = equalJson(req.body.values);
          await sheets.update_value_inPython(sheetsId, (req.body.tapName !== undefined ? req.body.tapName : ''), values, [ 0, 0 ]);
          await sheets.setting_cleanView_inPython(sheetsId);
          response = await drive.read_webView_inPython(sheetsId);
        }

      } else {

        ghostRequest("/sendSheets", req.body).then((res) => { console.log(res); }).catch((err) => { throw new Error("send sheets error"); });
        response = "will do";

      }
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: response }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_sendSheets): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createAiDocument = function () {
  const instance = this;
  const back = this.back;
  const { shell, shellLink, requestSystem, ghostRequest } = this.mother;
  const coreRequest = ghostRequest().bind("core");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  let obj = {};
  obj.link = [ "/createRequestDocument", "/createProposalDocument" ];
  obj.func = async function (req, res) {
    try {

      if (req.url === "/createRequestDocument") {

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({}));

      } else if (req.url === "/createProposalDocument") {

        const { proid } = req.body;
        const proposalLink = "https://" + ADDRESS.homeinfo.ghost.host + "/middle/designerProposal?proid=" + proid + "&mode=test";
        const thisProject = await back.getProjectById(proid, { selfMongo: instance.mongo });
        const cliid = thisProject.cliid;
        let page, cookies, dummy, historyObj;

        if (req.body.retryProposal === undefined) {
          await back.updateProject([ { proid }, { "proposal.date": new Date() } ], { selfMongo: instance.mongo });
        }

        historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        if (historyObj === null) {
          await back.createHistory("client", { cliid }, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
          historyObj = await back.getHistoryById("client", cliid, { selfMongo: instance.mongolocal });
        }
        page = "designerProposal";
        cookies = DataRouter.cookieParsing(req);
        dummy = {
          page,
          date: new Date(),
          mode: null,
          who: {
            name: cookies.homeliaisonConsoleLoginedName,
            email: cookies.homeliaisonConsoleLoginedEmail
          }
        };
        if (Array.isArray(historyObj.curation.analytics.send)) {
          historyObj.curation.analytics.send.push(dummy);
        } else {
          historyObj.curation.analytics.send = [ dummy ];
        }
        await back.updateHistory("client", [ { cliid }, { "curation.analytics.send": historyObj.curation.analytics.send } ], { selfMongo: instance.mongolocal });

        if (req.body.year !== undefined && req.body.month !== undefined && req.body.date !== undefined && req.body.hour !== undefined && req.body.minute !== undefined && req.body.second !== undefined) {
          const { year, month, date, hour, minute, second } = req.body;
          let message, command, time;
          time = {
            year: Number(year),
            month: Number(month),
            date: Number(date),
            hour: Number(hour),
            minute: Number(minute),
            second: Number(second),
          };
          command = [ "webProposal", proid ];
          message = await coreRequest("timer", { command, time });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ link: proposalLink }));
        } else if (req.body.instant !== undefined) {
          let message, command;
          command = [ "webProposal", proid ];
          message = await coreRequest("robot", { command });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ link: proposalLink }));
        } else {
          throw new Error("invaild post")
        }

      }

    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_createAiDocument): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_proposalReset = function () {
  const instance = this;
  const back = this.back;
  const work = this.work;
  const address = this.address;
  const { requestSystem, ghostRequest } = this.mother;
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
        work.proposalReset(id, { selfMongo: instance.mongo, selfLocalBoo: instance.mongolocal }).then(() => {
          return back.updateHistory("client", [ { cliid: id }, { "curation.analytics.full": false } ], { selfMongo: instance.mongolocal });
        }).catch((err) => {
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
                  mode: "create"
                };
                if (req.body.silent !== undefined) {
                  requestObj.silent = true;
                }

                requestSystem("https://" + address.homeinfo.ghost.host + "/styleCuration_updateCalculation", requestObj, { headers: { "origin": "https://" + address.homeinfo.ghost.host, "Content-Type": "application/json" } }).then(() => {
                  //pass
                }).catch((err) => {
                  console.log(err);
                });
              } else {
                ghostRequest("/voice", { text: id + " 고객님은 스타일 체크를 진행하지 않아 자동으로 제안서를 만들 수 없습니다!" }).catch((err) => {
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
  const { shell, shellLink } = this.mother;
  let obj = {};
  obj.link = "/getMembers";
  obj.func = async function (req, res) {
    try {
      const membersArr = instance.members;
      let emailArr = [];
      let targetMember = null;

      if (req.body.type === "get") {

        res.set("Content-Type", "application/json");
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

        res.set("Content-Type", "application/json");
        if (targetMember === undefined || targetMember === null) {
          res.send(JSON.stringify({ result: null }));
        } else {
          res.send(JSON.stringify({ result: targetMember }));
        }

      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getMembers): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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

DataRouter.prototype.async_analyticsReport = async function (startDate, endDate, title, parentId) {
  const instance = this;
  const GoogleAnalytics = require(`${process.cwd()}/apps/googleAPIs/googleAnalytics.js`);
  const analytics = new GoogleAnalytics();
  const back = this.back;
  const sheets = this.sheets;
  const drive = this.drive;
  try {
    let responseObj;
    let matrix = [];
    let sheetsId, response;
    let xyMetrics;
    let sheetTitle;
    let nameArr;

    responseObj = await analytics.generalMetric(startDate, endDate);

    sheetsId = await sheets.create_newSheets_inPython(title, parentId);
    await sheets.update_defaultSheetName_inPython(sheetsId, "general");
    await sheets.update_value_inPython(sheetsId, "general", responseObj.matrix, [ 0, 0 ]);

    xyMetrics = (await analytics.xyMetric("ga:campaign", startDate, endDate)).matrix;
    nameArr = [];
    for (let i = 0; i < xyMetrics.length; i++) {
      sheetTitle = "캠페인_" + xyMetrics[i][0][0];
      nameArr.push(sheetTitle);
    }
    await sheets.add_newSheet_inPython(sheetsId, nameArr);
    for (let i = 0; i < xyMetrics.length; i++) {
      await sheets.update_value_inPython(sheetsId, nameArr[i], xyMetrics[i], [ 0, 0 ]);
    }

    xyMetrics = (await analytics.xyMetric("ga:source", startDate, endDate)).matrix;
    nameArr = [];
    for (let i = 0; i < xyMetrics.length; i++) {
      sheetTitle = "소스_" + xyMetrics[i][0][0];
      nameArr.push(sheetTitle);
    }
    await sheets.add_newSheet_inPython(sheetsId, nameArr);
    for (let i = 0; i < xyMetrics.length; i++) {
      await sheets.update_value_inPython(sheetsId, nameArr[i], xyMetrics[i], [ 0, 0 ]);
    }

    await sheets.setting_cleanView_inPython(sheetsId);
    response = await drive.read_webView_inPython(sheetsId);

    return response;
  } catch (e) {
    instance.mother.errorLog("Console 서버 문제 생김 (async_analyticsReport): " + e.message).catch((e) => { console.log(e); });
    console.log(e);
  }
}

DataRouter.prototype.rou_post_analyticsReport = function () {
  const instance = this;
  let obj = {};
  obj.link = "/analyticsReport";
  obj.func = async function (req, res) {
    try {
      const { startDate, endDate, parentId } = req.body;
      const title = "analyticsReport_" + startDate + "_" + endDate;

      instance.async_analyticsReport(startDate, endDate, title, parentId).then(function (link) {
        return instance.mother.messageSend({ text: "어널리틱스 보고서가 완성되었습니다! (" + title + ") link: " + link, channel: "#500_marketing" });
      }).catch(function (e) {
        throw new Error(e);
      });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: {} }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_analyticsReport): " + e.message).catch((e) => { console.log(e); });
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
      if (req.body.id === undefined) {
        throw new Error("must be cliid");
      }
      const selected = await work.designerCuration(req.body.id, 4, [], { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal, noCalculation: true });
      res.set("Content-Type", "application/json");
      if (selected.length === 0) {
        res.send(JSON.stringify({ result: null }));
      } else {
        res.send(JSON.stringify({ result: { proposal: selected } }));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_parsingProposal): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_alimTalk): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_humanPacket = function () {
  const instance = this;
  const back = this.back;
  const human = this.human;
  let obj = {};
  obj.link = [ "/sendSms", "/sendEmail", "/sendMail" ];
  obj.func = async function (req, res) {
    try {
      if (req.url === "/sendSms") {
        if (req.body.subject === undefined || req.body.contents === undefined || req.body.name === undefined || req.body.phone === undefined) {
          throw new Error("must be subject, contents, name, phone");
        }
        await human.sendSms({
          name: req.body.name,
          phone: req.body.phone,
          subject: req.body.subject,
          contents: req.body.contents
        });
      } else if (req.url === "/sendEmail" || req.url === "/sendMail") {
        if (req.body.subject === undefined || req.body.contents === undefined || req.body.to === undefined) {
          throw new Error("must be subject, contents, to");
        }
        await human.sendEmail({
          to: req.body.to,
          subject: req.body.subject,
          contents: req.body.contents
        });
      }
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_humanPacket): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(final));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_getDesignerGhost): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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
    res.set({ "Content-Type": "application/json" });
    try {
      const selfMongo = instance.mongo;
      const impId = req.body.imp_uid;
      const oid = req.body.merchant_uid;
      const mid = address.officeinfo.inicis.mid;
      const status = req.body.status;
      if (typeof status === "string") {
        if (/paid/gi.test(status)) {
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

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_parsingAddress): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
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
          clients = await back.getClientsByQuery({ $or: cliidArr }, { selfMongo: instance.mongo });
        } else {
          clients = new SearchArray();
        }
        result.matrix = result.matrix.map((id) => {
          let client;
          client = clients.find(id);
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
      if (![ "get", "sync" ].includes(req.body.mode)) {
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
            temp.comment = "Unable schedule";
            temp.detail.online = 0;
            temp.detail.offline = 0;
            temp.detail.travel.number = 0;
            temp.fee = 0;
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
        const returnUrl = req.body.currentPage + "/inicisPayment?cliid=" + cliid + "&needs=" + ([ kind, desid, proid, method ]).join(',');
        const closeUrl = req.body.currentPage + "/tools/trigger";

        let pluginScript, formValue, acceptmethod;
        let future;

        if (device === "mobile" && gopaymethod === "Card") {
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

        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({ pluginScript, formValue }));

      } else if (req.body.mode === "decrypto") {

        let result = await decryptoHash(password, req.body.hash.trim());
        try {
          result = JSON.parse(result);
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify(result));
        } catch (e) {
          res.set({ "Content-Type": "application/json" });
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
          "__ignorethis__": 1,
        };

        res.set({ "Content-Type": "application/json" });
        if (paymentData.status.trim() === "paid") {
          res.send(JSON.stringify({ convertingData }));
        } else {
          res.send(JSON.stringify({ convertingData: { error: "error" } }));
        }

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
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "error" }));
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
  obj.link = [ "/pythonPass_ghostClientBill", "/pythonPass_generalBill" ];
  obj.func = async function (req, res) {
    try {
      const url = req.url.replace(/^\//gi, '');
      if (url.split('_').length < 2) {
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const path = url.split('_')[1].trim();
        let targetUrl, pythonResponse;
        targetUrl = "https://" + address["pythoninfo"].host + ":3000/" + path;
        pythonResponse = await requestSystem(targetUrl, equalJson(req.body), { headers: { "Content-Type": "application/json" } });
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(pythonResponse.data));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_pythonPass): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_ghostPass = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { ghostRequest, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/ghostPass_clientPhoto", "/ghostPass_photoParsing", "/ghostPass_listFiles", "/ghostPass_deliveryFiles", "/ghostPass_searchFiles", "/ghostPass_dirParsing", "/ghostPass_pdfPrint", "/ghostPass_staticDelete", "/ghostPass_designerPhoto" ];
  obj.func = async function (req, res) {
    try {
      const url = req.url.replace(/^\//gi, '');
      if (url.split('_').length < 2) {
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const path = url.split('_')[1].trim();
        let ghostResponse;
        ghostResponse = await ghostRequest(path, equalJson(req.body));
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify(ghostResponse));
      }
    } catch (e) {
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_ghostPass): " + e.message).catch((e) => { console.log(e); });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_callTo = function () {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { requestSystem, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/callTo" ];
  obj.func = async function (req, res) {
    try {
      if (req.body.who === undefined) {
        res.set({ "Content-Type": "application/json" });
        res.send(JSON.stringify({ message: "OK" }));
      } else {
        const who = req.body.who;
        const members = instance.members;
        let thisPerson, index, number, phone;

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
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ message: "OK" }));
          throw new Error("invaild post");
        } else {
          number = address.officeinfo.phone.numbers[index];
          await requestSystem("https://" + address.mirrorinfo.host + ":3000/clickDial", {
            id: number,
            destnumber: phone.replace(/[^0-9]/g, '')
          }, { headers: { "Content-Type": "application/json" } });
          res.set({ "Content-Type": "application/json" });
          res.send(JSON.stringify({ message: "true" }));
        }
      }
    } catch (e) {
      console.log(e);
      instance.mother.errorLog("Console 서버 문제 생김 (rou_post_callTo): " + e.message).catch((e) => { console.log(e); });
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify({ message: "OK" }));
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

DataRouter.prototype.rou_post_errorLog = function () {
  const instance = this;
  const { errorLog } = this.mother;
  let obj = {};
  obj.link = [ "/errorLog" ];
  obj.func = async function (req, res) {
    res.set({
      "Content-Type": "text/plain",
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
  const { errorLog, equalJson, dateToString, requestSystem, autoComma, messageSend } = this.mother;
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
      if (![ "updatePayments", "inspection", "sendContract", "constructOnoff", "amountSync", "chargeGuide" ].includes(req.body.mode)) {
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
        let whereQuery, updateQuery, historyQuery;

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

        historyQuery = {};
        historyQuery["construct.payments.first.date"] = first.date;
        historyQuery["construct.payments.first.etc"] = first.etc;
        historyQuery["construct.payments.start.date"] = start.date;
        historyQuery["construct.payments.start.etc"] = start.etc;
        historyQuery["construct.payments.middle.date"] = middle.date;
        historyQuery["construct.payments.middle.etc"] = middle.etc;
        historyQuery["construct.payments.remain.date"] = remain.date;
        historyQuery["construct.payments.remain.etc"] = remain.etc;
        await back.updateHistory("project", [ whereQuery, historyQuery ], { selfMongo: instance.mongolocal });

        result = {
          message: "success",
          core: {
            first: firstObj,
            start: startObj,
            middle: middleObj,
            remain: remainObj,
          },
          history: {
            first: { date: first.date, etc: first.etc },
            start: { date: start.date, etc: start.etc },
            middle: { date: middle.date, etc: middle.etc },
            remain: { date: remain.date, etc: remain.etc },
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
        const host = instance.address.homeinfo.ghost.host;
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
