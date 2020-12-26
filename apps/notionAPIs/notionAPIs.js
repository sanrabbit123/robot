const NotionAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/notionAPIs";
  this.jsonDir = this.dir + "/json";
  this.pythonApp = this.dir + "/python/app.py";
  this.blockInfo = {
    blockInfo: {
      blockId: "0da6f7d0806945a3919127b4171adde9",
      targetColumns: [
        { regex: "신규", name: "newClient" },
        { regex: "프로젝트", name: "projectContents" },
        { regex: "장기", name: "oldClient" },
        { regex: "드랍", name: "dropClient" },
        { regex: "완료", name: "completeClient" },
        { regex: "디자이너", name: "designer" },
      ],
    },
  };
}

NotionAPIs.prototype.blockToJson = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "blockToJson" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.pastToNewDesid = async function () {
  const instance = this;
  try {
    const DesidFilter = this.back.idFilter("designer");
    let block, designerTarget, obj;
    let temp, temp2, temp3;
    let tempString, tempString2;

    block = JSON.parse(JSON.stringify(this.blockInfo));
    designerTarget = block.blockInfo.targetColumns.pop();
    block.blockInfo.targetColumns = [ designerTarget ];
    obj = { ...block };

    temp = DesidFilter.pastToNew.toString().split("case");

    temp2 = [];
    for (let i = 1; i < temp.length; i++) {
      temp2.push(temp[i].split("return"));
    }

    temp3 = {};
    for (let i = 0; i < temp2.length; i++) {
      tempString = '';
      tempString2 = '';
      tempString = temp2[i][0].replace(/[^de0-9]/g, '');
      tempString2 = temp2[i][1].replace(/[^a-z\_0-9]/g, '').slice(0, 11);
      temp3[tempString] = tempString2;
    }

    obj.filter = temp3;

    return (await this.mother.pythonExecute(this.pythonApp, [ "pastToNewDesid" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.updateConsoleLink = async function () {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "setConsoleLink" ], this.blockInfo));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getCxCards = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const obj = this.blockInfo;
    await this.updateConsoleLink();
    const { resultFileList } = await this.blockToJson(obj);

    let tempArr;
    let middleTong, finalTong;

    middleTong = [];
    for (let f of resultFileList) {
      tempArr = JSON.parse(await fileSystem(`readString`, [ f ]));
      for (let i of tempArr) {
        middleTong.push(i);
      }
    }

    finalTong = {};
    for (let m of middleTong) {
      if (m.cliid !== undefined && m.cliid !== '') {
        finalTong[m.cliid] = {};
        finalTong[m.cliid]["id"] = m.parentId + '-' + m.id;
        finalTong[m.cliid]["data"] = m;
      } else if (m.desid !== undefined && m.desid !== '') {
        finalTong[m.desid] = {};
        finalTong[m.desid]["id"] = m.parentId + '-' + m.id;
        finalTong[m.desid]["data"] = m;
      }
    }

    const DesidFilter = this.back.idFilter("designer");
    for (let i in finalTong) {
      if (/^d/.test(i)) {
        finalTong[DesidFilter.pastToNew(i)] = finalTong[i];
      }
    }

    for (let i in finalTong) {
      if (/^de/.test(i)) {
        delete finalTong[i];
      }
    }

    console.log(finalTong);
    await fileSystem(`write`, [ `${process.cwd()}/temp/notionTong.json`, JSON.stringify(finalTong, null, 2) ]);

    return finalTong;
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.treeParsing = async function (id) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let blockDetails;
    let clientStructure;
    let childrenParsing;

    childrenParsing = function (children) {
      let arr = [];
      for (let { block, children: childrenchildren } of children) {
        if (childrenchildren !== undefined) {
          if (childrenchildren.length !== 0) {
            block.children = childrenParsing(childrenchildren);
          }
        }
        arr.push(block);
      }
      return arr;
    }

    //detail parsing
    let { resultFile } = await this.mother.pythonExecute(this.pythonApp, [ "treeParsing" ], { id });
    blockDetails = JSON.parse(await fileSystem("readString", [ resultFile ]));

    clientStructure = {};
    for (let { block, children } of blockDetails) {
      if (block.className === "ToggleBlock") {
        if (/HISTORY/gi.test(block.title_plaintext)) {
          clientStructure.history = childrenParsing(children);
        } else if (/현장/gi.test(block.title_plaintext)) {
          clientStructure.space = childrenParsing(children);
        } else if (/시공/gi.test(block.title_plaintext)) {
          clientStructure.construct = childrenParsing(children);
        } else if (/스타일링/gi.test(block.title_plaintext)) {
          clientStructure.styling = childrenParsing(children);
        } else if (/예산/gi.test(block.title_plaintext)) {
          clientStructure.budget = childrenParsing(children);
        } else if (/진행/gi.test(block.title_plaintext)) {
          clientStructure.progress = childrenParsing(children);
        }
      }
    }

    return clientStructure;
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getElementById = async function (id, detail = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let notionIds;
    let obj, obj2, button;
    let targetId;
    let result;
    let tempObj;

    if (/^c/.test(id)) {
      obj = await this.back.getClientById(id);
      button = 'c';
    } else if (/^d/.test(id)) {
      obj = await this.back.getDesignerById(id);
      button = 'd';
    } else if (/^p/) {
      obj2 = await this.back.getProjectById(id);
      obj = await this.back.getClientById(obj2.cliid);
      button = 'c';
    } else {
      throw new Error("invaild id");
    }

    notionIds = [];
    if (button === 'c') {
      for (let { request: { notionId } } of obj.requests) {
        notionIds.push(notionId);
      }
    } else {
      notionIds.push(obj.information.notionId);
    }

    result = [];
    for (let i of notionIds) {
      targetId = i.split('-')[1];
      tempObj = await this.mother.pythonExecute(this.pythonApp, [ "getElementById" ], { id: targetId });
      result.push(tempObj);
    }

    if (!detail) {
      return result[0];
    } else {
      if (button === 'c') {
        client = result[0];
        result[0].detailStory = await this.treeParsing(result[0].id);
        return result[0];
      }
    }
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getAllClients = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let obj = JSON.parse(JSON.stringify(this.blockInfo));
    obj.blockInfo.targetColumns.pop();

    await this.updateConsoleLink();
    const { resultFileList } = await this.blockToJson(obj);

    let tempArr;
    let firstTong, secondTong, finalTong;

    firstTong = [];
    for (let f of resultFileList) {
      tempArr = JSON.parse(await fileSystem(`readString`, [ f ]));
      for (let i of tempArr) {
        firstTong.push(i);
      }
    }

    secondTong = {};
    for (let m of firstTong) {
      if (m.cliid !== undefined && m.cliid !== '') {
        secondTong[m.cliid] = {};
        secondTong[m.cliid]["id"] = m.parentId + '-' + m.id;
        secondTong[m.cliid]["data"] = m;
      }
    }

    finalTong = {};
    for (let cliid of Object.keys(secondTong)) {
      finalTong[cliid] = secondTong[cliid];
      finalTong[cliid].detailStory = await this.treeParsing(secondTong[cliid].id.split('-')[1]);
    }

    console.log(finalTong);
    await fileSystem(`write`, [ `${process.cwd()}/temp/notionClientTong.json`, JSON.stringify(finalTong, null, 2) ]);

    return finalTong;
  } catch (e) {
    console.log(e);
  }
}

//PAST -----------------------------------------------------------------------------------------------------

NotionAPIs.prototype.addNewRow = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "single" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.addNewRows = async function (arr) {
  const instance = this;
  try {
    if (!Array.isArray(arr)) { throw new Error("invaild type") }
    return (await this.mother.pythonExecute(this.pythonApp, [ "multiple" ], arr));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getAllRows = async function () {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "getAll" ], {}));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.getOneRow = async function (id) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "getById" ], { id: id }));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.updateOneRows = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, [ "updateOne" ], obj));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.launching = async function (cliid = "latest") {
  const instance = this;
  const { fileSystem } = this.mother;
  const zeroAddition = function (number) {
    if (number < 10) {
      return `0${String(number)}`;
    } else {
      return `${String(number)}`;
    }
  }
  try {
    let latestObj_raw, latestObj, newObj, tempArr;

    if (cliid === "latest") {
      latestObj_raw = await this.back.getLatestClient();
    } else {
      latestObj_raw = await this.back.getClientById(cliid);
    }

    latestObj = latestObj_raw.toNormal();

    if (latestObj !== null && latestObj !== undefined) {
      newObj = {};
      newObj["title"] = latestObj.name;
      newObj["cliid"] = latestObj.cliid;
      newObj["phone"] = latestObj.phone;
      newObj["email"] = latestObj.email;
      newObj["address"] = latestObj.requests[0].request.space.address;
      newObj["budget"] = latestObj.requests[0].request.budget.replace(/,/g, '');
      newObj["pyeong"] = Number(latestObj.requests[0].request.space.pyeong);
      newObj["contract"] = latestObj.requests[0].request.space.contract;
      newObj["family"] = latestObj.requests[0].request.family;
      newObj["movein"] = zeroAddition(latestObj.requests[0].request.space.resident.expected.getFullYear()) + "-" + zeroAddition(latestObj.requests[0].request.space.resident.expected.getMonth() + 1) + "-" + zeroAddition(latestObj.requests[0].request.space.resident.expected.getDate());
      newObj["room"] = "방 " + String(latestObj.requests[0].request.space.spec.room) + "개";
      newObj["bathroom"] = "화장실 " + String(latestObj.requests[0].request.space.spec.bathroom) + "개";
      newObj["valcony"] = latestObj.requests[0].request.space.spec.valcony ? "발코니 확장" : "발코니 확장 없음";
      newObj["etc"] = latestObj.requests[0].request.etc.comment;
      newObj["channel"] = latestObj.requests[0].request.etc.channel;

      console.log(await this.addNewRow(newObj));
      await this.mother.slack_bot.chat.postMessage({ text: `${latestObj.name} 고객님의 정보가 노션으로 옮겨졌습니다!`, channel: `#401_consulting` });
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = NotionAPIs;
