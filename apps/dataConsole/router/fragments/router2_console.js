//POST ---------------------------------------------------------------------------------------------

DataRouter.prototype.rou_post_getDocuments = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/getClients", "/getDesigners", "/getProjects", "/getContents" ];
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
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestClients(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestClients("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getClientsByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getDesigners") {
        standard = instance.patch.designerStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestDesigners(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestDesigners("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getDesignersByQuery(equalJson(req.body.where), optionQuery);
        }
      } else if (req.url === "/getProjects") {
        standard = instance.patch.projectStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestProjects(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestProjects("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          whereQuery = equalJson(req.body.where);
          raw_data = await instance.back.getProjectsByQuery(whereQuery, optionQuery);
        }
      } else if (req.url === "/getContents") {
        standard = instance.patch.contentsStandard();
        optionQuery = { withTools: true, selfMongo: instance.mongo };
        if (req.body.sort !== undefined) {
          optionQuery.sort = JSON.parse(req.body.sort);
        }
        if (req.body.where === undefined) {
          if (req.body.limit !== undefined) {
            raw_data = await instance.back.getLatestContentsArr(req.body.limit, optionQuery);
          } else {
            raw_data = await instance.back.getLatestContentsArr("all", optionQuery);
          }
        } else {
          if (req.body.limit !== undefined) {
            optionQuery.limit = Number(req.body.limit);
          }
          raw_data = await instance.back.getContentsArrByQuery(equalJson(req.body.where), optionQuery);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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

      if (req.url === "/searchClients") {
        standard = instance.patch.clientStandard();
        map = instance.patch.clientMap();
      } else if (req.url === "/searchProjects") {
        standard = instance.patch.projectStandard();
        map = instance.patch.projectMap();
      } else if (req.url === "/searchDesigners") {
        standard = instance.patch.designerStandard();
        map = instance.patch.designerMap();
      } else if (req.url === "/searchContents") {
        standard = instance.patch.contentsStandard();
        map = instance.patch.contentsMap();
      }

      mapArr = Object.values(map);

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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_updateDocument = function () {
  const instance = this;
  const { fileSystem, pythonExecute, shell, shellLink, equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/updateClient", "/updateDesigner", "/updateProject", "/updateContents" ];
  obj.func = async function (req, res) {
    try {
      let { thisId, requestIndex, column, value, pastValue, user, thisCase } = req.body;
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

        instance.back.mongoCreate((req.url.replace(/^\//, '') + "Log"), updateTong, { local: null, local: true, selfMongo: null }).catch(function (e) {
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
          calendObj = map[column].calendar(JSON.parse(thisCase));
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_rawUpdateDocument = function () {
  const instance = this;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/rawUpdateClient", "/rawUpdateDesigner", "/rawUpdateProject", "/rawUpdateContents" ];
  obj.func = async function (req, res) {
    try {
      let raw_data;
      let whereQuery, updateQuery, dateQuery;

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
        raw_data = await instance.back.updateClient([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateDesigner") {
        raw_data = await instance.back.updateDesigner([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateProject") {
        raw_data = await instance.back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      } else if (req.url === "/rawUpdateContents") {
        raw_data = await instance.back.updateContents([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: raw_data }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_createDocument = function () {
  const instance = this;
  let obj = {};
  obj.link = [ "/createClient", "/createDesigner", "/createProject", "/createContents" ];
  obj.func = async function (req, res) {
    try {
      const updateQuery = JSON.parse(req.body.updateQuery);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
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
          obj.startDay = `${zeroAddition(arr[0].getFullYear())}-${zeroAddition(arr[0].getMonth() + 1)}-${zeroAddition(arr[0].getDate())}`;
          obj.endDay = `${zeroAddition(arr[1].getFullYear())}-${zeroAddition(arr[1].getMonth() + 1)}-${zeroAddition(arr[1].getDate())}`;

          //client
          searchQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": arr[0], "$lt": arr[2] } } } };
          clients = await instance.back.getClientsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.client = clients.length;

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

          //contract
          searchQuery = { "process.contract.first.date": { "$gte": arr[0], "$lt": arr[2] } };
          contracts = await instance.back.getProjectsByQuery(searchQuery, { selfMongo: instance.mongo });
          obj.contract = contracts.length;

          //process start
          processNumber = 0;
          for (let c of clients) {
            for (let { analytics: { proposal } } of c.requests) {
              for (let obj of proposal) {
                if (obj.contract) {
                  processNumber = processNumber + 1;
                }
              }
            }
          }
          obj.process = processNumber;

          monthArr.push(obj);
        }
        resultArr.push(monthArr);
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAspirantInfo = function () {
  const instance = this;
  const back = this.back;
  const patch = this.patch;
  let obj = {};
  obj.link = [ "/getAspirantReport", "/updateAspirantReport", "/viewAspirantRawPortfolio" ];
  obj.func = async function (req, res) {
    try {
      const { updateStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, sameStandard, cloudLinkTargets } = patch.designerRawMap();
      const dateToString = function (str) {
        const zeroAddition = function (num) {
          if (num < 10) {
            return `0${String(num)}`;
          } else {
            return String(num);
          }
        }
        let date;
        date = new Date(str);
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
      }
      const stringToDateValue = function (str) {
        let tempArr0, tempArr1, tempArr2;
        let resultDate;
        tempArr0 = str.split(" ");
        tempArr1 = tempArr0[0].split("-");
        tempArr2 = tempArr0[1].split(":");
        resultDate = new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
        return resultDate.valueOf();
      }
      const stringToDateWording = function (str) {
        const today = new Date();
        let temp;
        temp = str.split(" ");
        return new Date(today.getFullYear(), Number(temp[0].replace(/[^0-9]/g, '')) - 1, Number(temp[1].replace(/[^0-9]/g, '')), Number(temp[3].replace(/[^0-9]/g, '')));
      }
      const oppositeMode = req.body.mode !== "total" ? ((req.body.mode === "presentation") ? "partnership" : "presentation") : "presentation";
      let row, oppositeRow, binaryRow;
      let sameStandardColumn;
      let realData;
      let tempObj;
      let targetIndex;
      let whereQuery, updateQuery;
      let tempLink;
      let phoneTong;
      let tempAspirants, tempAspirant;

      if (req.url === "/getAspirantReport") {

        row = await back.getAspirantsByQuery({ "meeting.status": { "$not": { "$regex": "드" } } }, { withTools: true, selfMongo: instance.mongo, portfolioReset: true });
        realData = [];
        for (let i of row) {
          if (i.flatDeath(req.body.mode) !== null) {
            realData.push(i.flatDeath(req.body.mode));
          }
        }
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ mode: req.body.mode, oppositeMode: oppositeMode, title: titleNameMap[req.body.mode], columns: columnRelativeMap[req.body.mode], data: realData, standard: updateStandard }));

      } else if (req.url === "/updateAspirantReport") {

        whereQuery = {};
        updateQuery = {};

        whereQuery[updateStandard] = req.body.standard;
        if (req.body.column === "status") {
          updateQuery["meeting.status"] = req.body.value;
        } else if (req.body.column === "presentationTimes" || req.body.column === "meetingTime") {
          updateQuery["meeting.date"] = stringToDateWording(req.body.value);
        }

        await back.updateAspirant([ whereQuery, updateQuery ], { selfMongo: instance.mongo });

        // if (req.body.calendar !== undefined) {
        //   tempAspirants = await back.getAspirantsByQuery(whereQuery, { selfMongo: instance.mongo });
        //   tempAspirant = tempAspirants[0];
        //   if (tempAspirant.calendar.id !== "") {
        //     instance.calendar.updateSchedule(tempAspirant.calendar.mother, tempAspirant.calendar.id, { start: tempAspirant.meeting.date });
        //   } else {
        //     instance.calendar.makeSchedule(tempAspirant.calendar.mother, tempAspirant.designer + " 디자이너 사전 미팅", "", tempAspirant.meeting.date).then(function (res) {
        //       back.updateAspirant([ whereQuery, { "calendar.id": res.eventId } ], { selfMongo: instance.mongo });
        //     }).catch(function (e) {
        //       console.log(e);
        //     });
        //   }
        // }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "success" }));

      } else if (req.url === "/viewAspirantRawPortfolio") {

        whereQuery = {};
        whereQuery[updateStandard] = req.body.standard;
        await back.unshiftAspirantPortfolioConfirm(whereQuery, 0, (new Date()), req.body.user, { selfMongo: instance.mongo });

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "success" }));
      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getHistory = function () {
  const instance = this;
  const back = this.back;
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
        if (JSON.parse(req.body.idArr).length > 0) {
          responseArr = await back.getHistoryProperty(req.body.method, req.body.property, JSON.parse(req.body.idArr), { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      } else if (req.url === "/getHistoryTotal") {
        if (JSON.parse(req.body.idArr).length > 0) {
          responseArr = await back.getHistoryProperty(req.body.method, "$all", JSON.parse(req.body.idArr), { selfMongo: instance.mongolocal });
        } else {
          responseArr = [];
        }
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(responseArr));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
          updateQuery[column] = value;
        }
        await back.createHistory(method, updateQuery, { selfMongo: instance.mongolocal, secondMongo: instance.mongo });
      } else {
        whereQuery = {};
        whereQuery[standard] = id;
        if (column === "important") {
          updateQuery[column] = (Number(value) === 1);
        } else {
          updateQuery[column] = value;
        }
        await back.updateHistory(method, [ whereQuery, updateQuery ], { selfMongo: instance.mongolocal });
      }

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

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e.message, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_sendSlack = function () {
  const instance = this;
  const back = this.back;
  const { ghostRequest, slack_bot: slack } = this.mother;
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
        query = JSON.parse(req.body.query);
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

        await slack.chat.postMessage({ text: new_message, channel: req.body.channel });
      } else {
        await slack.chat.postMessage({ text: req.body.message, channel: req.body.channel });
      }

      if (req.body.voice !== undefined) {
        await ghostRequest("voice", { text: req.body.message });
      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ message: "success" }));

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
  const { ghostRequest } = this.mother;
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
          values = JSON.parse(req.body.values);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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

        let clientOriginal;
        let projects, project;
        let resultObj = { "alert": "요청에 문제가 있습니다!" };

        clientOriginal = await back.getClientById(req.body.id);
        if (clientOriginal === null) {
          resultObj = { "alert": "확인되는 고객이 없습니다!" };
        } else {
          projects = await back.getProjectsByQuery({ cliid: req.body.id });
          project = null;
          for (let p of projects) {
            if (p.desid !== '') {
              project = p;
              break;
            }
          }
          if (project === null) {
            resultObj = { "alert": "확인되는 프로젝트가 없습니다!" };
          } else {
            if (project.process.contract.meeting.date.getFullYear() < 1900) {
              resultObj = { "alert": "현장 미팅에 대한 정보가 없습니다!" };
            } else {
              await requestSystem("https://" + ADDRESS.homeinfo.ghost.host + ":" + String(ADDRESS.homeinfo.ghost.graphic.port[0]) + "/toAiServer", { type: "request", id: req.body.id }, { headers: { "Content-Type": "application/json" } });
              resultObj = { "alert": "의뢰서 제작 요청이 완료되었습니다!" };
            }
          }
        }

        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(resultObj));

      } else if (req.url === "/createProposalDocument") {

        const { proid } = req.body;
        const proposalLink = "https://" + ADDRESS.homeinfo.ghost.host + "/middle/designerProposal?proid=" + proid + "&mode=test";
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
          await requestSystem("https://" + ADDRESS.homeinfo.ghost.host + ":" + String(ADDRESS.homeinfo.ghost.graphic.port[0]) + "/toAiServer", { type: "proposal", id: proid }, { headers: { "Content-Type": "application/json" } });
          res.set("Content-Type", "application/json");
          res.send(JSON.stringify({ link: proposalLink }));
        }

      }

    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getAnalytics = function () {
  const instance = this;
  const { shell, shellLink } = this.mother;
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
      let rangeObj = JSON.parse(req.body.range);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
    instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
    console.log(e);
  }
}

DataRouter.prototype.rou_post_analyticsReport = function () {
  const instance = this;
  const slack = this.mother.slack_bot;
  let obj = {};
  obj.link = "/analyticsReport";
  obj.func = async function (req, res) {
    try {
      const { startDate, endDate, parentId } = req.body;
      const title = "analyticsReport_" + startDate + "_" + endDate;

      instance.async_analyticsReport(startDate, endDate, title, parentId).then(function (link) {
        slack.chat.postMessage({ text: "어널리틱스 보고서가 완성되었습니다! (" + title + ") link: " + link, channel: "#500_marketing" });
      }).catch(function (e) {
        throw new Error(e);
      });

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify({ link: {} }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_parsingLatestLog = function () {
  const instance = this;
  const { fileSystem } = this.mother;
  let obj = {};
  obj.link = "/parsingLatestLog";
  obj.func = async function (req, res) {
    try {
      if (req.body.idArr === undefined) {
        throw new Error("must be id arr: Array");
      }
      const logDir = `${instance.dir}/log`;
      const idArr = JSON.parse(req.body.idArr);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_manageDeadline = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/manageDeadline";
  obj.func = async function (req, res) {
    try {
      if (req.body.json === undefined) {
        throw new Error("must be json");
      }
      const { json } = req.body;
      const obj = JSON.parse(json);
      const now = new Date();
      let rows, resultObj;

      if (obj.mode === "set") {

        rows = await back.mongoRead("deadline", { name: obj.name }, { console: true });
        if (rows.length > 0) {
          await back.mongoUpdate("deadline", [ { name: obj.name }, { deadline: new Date(obj.deadline), middleline: new Date(obj.middleline) } ], { console: true });
        } else {
          await back.mongoCreate("deadline", { deadline: new Date(obj.deadline), middleline: new Date(obj.middleline), name: obj.name }, { console: true });
        }

        resultObj = { message: "done" };

      } else if (obj.mode === "get") {

        rows = await back.mongoRead("deadline", { name: obj.name }, { console: true });
        if (rows.length > 0) {
          resultObj = {};
          if (now.valueOf() > rows[0].middleline.valueOf()) {
            resultObj.expired = true;
          } else {
            resultObj.expired = false;
          }
          if (now.valueOf() > rows[0].deadline.valueOf()) {
            resultObj.dead = true;
          } else {
            resultObj.dead = false;
          }
        } else {
          resultObj = { expired: true, dead: true };
        }

      }

      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookPayment = function () {
  const instance = this;
  const back = this.back;
  const { requestSystem } = this.mother;
  let obj = {};
  obj.link = "/webHookPayment";
  obj.public = true;
  obj.func = async function (req, res) {
    try {
      res.set({ "Content-Type": "application/json" });
      const payResponse = await requestSystem("https://api.iamport.kr/users/getToken", { "imp_key": "7188483898255321", "imp_secret": "05z9vXYzdvq9Xb2SHBu8j8RpTw60LnALs9UY6TxkoYul9weR8JZsSRSLoYM9lmUOwPMCIjX7istrYIj7" }, { headers: { "Content-Type": "application/json" } });
      const token = payResponse.data.response.access_token;
      const { data } = await requestSystem("https://api.iamport.kr/payments/" + req.body.imp_uid, {}, { headers: { "Authorization": token } });
      const { amount, buyer_name, buyer_tel, card_name, name } = data.response;
      const clients = await back.getClientsByQuery({ phone: buyer_tel }, { selfMongo: instance.mongo });
      let client, cliid;
      let projects;
      let whereQuery, updateQuery;

      if (clients.length === 1) {
        client = clients[0];
        cliid = client.cliid;
        projects = await back.getProjectsByQuery({ $and: [ { cliid }, { desid: { $regex: "^d" } } ] }, { selfMongo: instance.mongo });
        if (projects.length > 0) {
          whereQuery = { proid: projects[0].proid };
          if (/계/gi.test(name)) {
            updateQuery = {};
            updateQuery["process.contract.first.date"] = new Date();
            updateQuery["process.contract.first.calculation.amount"] = amount;
            updateQuery["process.contract.first.calculation.info.method"] = "카드";
            updateQuery["process.contract.first.calculation.info.proof"] = "이니시스";
            updateQuery["process.contract.first.calculation.info.to"] = buyer_name;
          } else {
            updateQuery = {};
            updateQuery["process.contract.remain.date"] = new Date();
            updateQuery["process.contract.remain.calculation.amount.supply"] = (projects[0].process.contract.first.calculation.amount + amount) * (10 / 11);
            updateQuery["process.contract.remain.calculation.amount.vat"] = (projects[0].process.contract.first.calculation.amount + amount) * (1 / 11);
            updateQuery["process.contract.remain.calculation.amount.consumer"] = projects[0].process.contract.first.calculation.amount + amount;
            updateQuery["process.contract.remain.calculation.info.method"] = "카드";
            updateQuery["process.contract.remain.calculation.info.proof"] = "이니시스";
            updateQuery["process.contract.remain.calculation.info.to"] = buyer_name;
          }
          await back.updateProject([ whereQuery, updateQuery ], { selfMongo: instance.mongo });
        }
      }

      instance.mother.slack_bot.chat.postMessage({ text: `${buyer_name} 고객님이 ${card_name}로 ${DataRouter.autoComma(amount)}원 결제하셨습니다!`, channel: "#700_operation" });
      res.send(JSON.stringify({ "message": "ok" }));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_webHookGoogle = function () {
  const instance = this;
  const back = this.back;
  const { mongo, mongoconsoleinfo, requestSystem } = this.mother;
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
                  instance.mother.slack_bot.chat.postMessage({ text: "시트로부터의 업데이트 감지 : " + req.body.collection, channel: "#error_log" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
        const addressArr = JSON.parse(req.body.addressArr);
        const liteMode = req.body.liteMode === undefined ? true : (typeof req.body.liteMode === "string" ? req.body.liteMode === "true" : req.body.liteMode);
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
        result = await addressApp.getTravelExpenses(from, to);
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
            tong.designers.push(JSON.parse(JSON.stringify(tong[i])));
            delete tong[i];
          }
        }
        result = tong;
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(result));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_realtimeClient = function () {
  const instance = this;
  const back = this.back;
  const { equalJson, fileSystem } = this.mother;
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

            await instance.mother.slack_bot.chat.postMessage({ text: `${update.name}(${cliid}) 고객님이 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일 ${result.standard[index]}에 응대 예약을 하셨습니다! 담당자 지정을 부탁드리겠습니다!`, channel: "#400_customer" });
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
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_designerFee = function () {
  const instance = this;
  const work = this.work;
  const back = this.back;
  const { equalJson } = this.mother;
  let obj = {};
  obj.link = [ "/designerFee" ];
  obj.func = async function (req, res) {
    try {
      const option = { selfMongo: instance.mongo, selfLocalMongo: instance.mongolocal };
      if (req.body.matrix === undefined) {
        throw new Error("must be matrix");
      }
      const matrix = equalJson(req.body.matrix);
      let resultObj, temp;

      if (!Array.isArray(matrix)) {
        throw new Error("invaild post");
      }

      if (matrix.every((a) => { return typeof a === "string" && /^p/.test(a); })) {
        resultObj = {};
        for (let proid of matrix) {
          resultObj[proid] = await work.getDesignerFee(proid, option);
        }
      } else if (matrix.every((a) => { return Array.isArray(a) && a.length === 4; })) {
        resultObj = [];
        for (let [ desid, cliid, serid, xValue ] of matrix) {
          temp = await work.getDesignerFee(desid, cliid, serid, xValue, option);
          resultObj.push(temp);
        }
      } else {
        throw new Error("invaild matrix");
      }

      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify(resultObj));
    } catch (e) {
      res.set({ "Content-Type": "application/json" });
      res.send(JSON.stringify([ null ]));
    }
  }
  return obj;
}
