const LocalDevices = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/localDevices";
  this.tokenDir = this.dir + "/token";
  this.statusJson = {
    mac: "currentMac.json",
    past: "pastStatus.json",
    now: "nowStatus.json",
  }
}

LocalDevices.prototype.scanLocalMacIp = async function (waitingSeconds = 20) {
  const instance = this;
  const address = this.address;
  const { tokenDir, statusJson } = this;
  const { shellExec, sleep, fileSystem, requestSystem } = this.mother;
  try {
    const seconds = waitingSeconds * 1000;
    const backOffNumber = 10;
    const token = "__split__";
    let scanResult;
    let tempArr;
    let index;
    let macArr;
    let macIpTong;
    let thisIp, thisMac;
    let macKeys;
    let finalArr;
    let nmapResult;
    let nmapCommand;
    let rawStdOut;
    let nmapTong;
    let nmapTongArr;
    let response;

    scanResult = await shellExec("arp-scan", [ "-l", "--timeout=" + String(seconds), "--backoff=" + String(backOffNumber) ]);

    tempArr = scanResult.split("\n").slice(2);
    index = tempArr.findIndex((str) => { return str.trim() === '' });
    tempArr = tempArr.slice(0, index + 1).filter((str) => { return str.trim() !== "" });
    tempArr = tempArr.map((str) => { return str.split("\t") });
    macArr = tempArr.map(([ ip, mac ]) => { return ip + token + mac.replace(/\:/gi, '').toLowerCase() });

    macIpTong = {};
    for (let str of macArr) {
      [ thisIp, thisMac ] = str.split(token);
      macIpTong[thisMac] = thisIp;
    }

    macKeys = Object.keys(macIpTong);
    finalArr = [];
    for (let key of macKeys) {
      finalArr.push({
        mac: key,
        ip: macIpTong[key]
      });
    }

    nmapCommand = "nmap -sn 192.168.0.*";
    try {
      nmapResult = await shellExec(nmapCommand);
    } catch (e) {
      await sleep(500);
      try {
        nmapResult = await shellExec(nmapCommand);
      } catch (e) {
        await sleep(500);
        try {
          nmapResult = await shellExec(nmapCommand);
        } catch (e) {
          await sleep(500);
          try {
            nmapResult = await shellExec(nmapCommand);
          } catch (e) {
            await sleep(500);
            try {
              nmapResult = await shellExec(nmapCommand);
            } catch (e) {
              await sleep(500);
              try {
                nmapResult = await shellExec(nmapCommand);
              } catch (e) {
                await sleep(500);
                try {
                  nmapResult = await shellExec(nmapCommand);
                } catch (e) {
                  await sleep(500);
                  try {
                    nmapResult = await shellExec(nmapCommand);
                  } catch (e) {
                    await sleep(500);
                    try {
                      nmapResult = await shellExec(nmapCommand);
                    } catch (e) {
                      await sleep(500);
                      nmapResult = null;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (nmapResult !== null) {

      rawStdOut = nmapResult.split("\n");
      rawStdOut = rawStdOut.slice(rawStdOut.findIndex((str) => { return /^Host/.test(str) }));
      nmapTong = {};
      for (let i = 0; i < rawStdOut.length; i++) {
        if (/^MAC/.test(rawStdOut[i])) {
          nmapTong[rawStdOut[i].split("Address: ")[1].split(" ")[0].replace(/\:/gi, '').toLowerCase()] = /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/.exec(rawStdOut[i + 1].split("for ")[1].trim())[0];
        }
      }

      nmapTongArr = [];
      for (let mac in nmapTong) {
        nmapTongArr.push({ mac, ip: nmapTong[mac] });
      }

    } else {
      nmapTongArr = [];
      nmapTong = null;
    }

    finalArr = finalArr.concat(nmapTongArr);
    finalArr = finalArr.map(({ mac, ip }) => { return mac + token + ip });
    finalArr = [ ...new Set(finalArr) ];
    finalArr = finalArr.map((str) => { return { mac: str.split(token)[0], ip: str.split(token)[1] } });

    await fileSystem(`writeJson`, [ `${tokenDir}/${statusJson.mac}`, finalArr ]);

    response = await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/parsingDevicesStatus", { macArr: finalArr }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return finalArr;
  } catch (e) {
    console.log(e);
    return [];
  }
}

LocalDevices.prototype.storeDevicesStatus = async function (macArr, members) {
  const instance = this;
  const { tokenDir, statusJson } = this;
  const { fileSystem, requestSystem, equalJson } = this.mother;
  try {
    let finalObject;
    let previousObject;
    let targetMac;
    let targetList;
    let thisIp;

    targetList = members.filter((member) => { return member.computer.mac !== null }).map((member) => {
      return {
        mac: member.computer.mac,
        member: {
          id: member.id,
          name: member.name,
        }
      }
    });

    for (let obj of targetList) {
      targetMac = obj.mac.replace(/\:/gi, '').trim().toLowerCase();
      if (macArr.map(({ mac, ip }) => { return mac; }).includes(targetMac)) {
        obj.online = true;
        thisIp = macArr.find((o) => { return o.mac === targetMac }).ip;
      } else {
        obj.online = false;
        thisIp = "";
      }
      obj.ip = thisIp;
    }

    finalObject = {
      date: new Date(),
      devices: targetList,
    };
    previousObject = equalJson(JSON.stringify(await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ])));

    await fileSystem(`writeJson`, [ `${tokenDir}/${statusJson.past}`, previousObject ]);
    await fileSystem(`writeJson`, [ `${tokenDir}/${statusJson.now}`, finalObject ]);

    return {
      from: previousObject,
      to: finalObject
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

LocalDevices.prototype.getDevicesStatus = async function () {
  const instance = this;
  const { tokenDir, statusJson } = this;
  const { fileSystem, equalJson } = this.mother;
  try {
    let nowObject;
    nowObject = equalJson(JSON.stringify(await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ])));
    return nowObject;
  } catch (e) {
    console.log(e);
  }
}

LocalDevices.prototype.getMacArr = async function () {
  const instance = this;
  const { tokenDir, statusJson } = this;
  const { fileSystem, equalJson } = this.mother;
  try {
    let macArr;
    macArr = equalJson(JSON.stringify(await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.mac}` ])));
    return macArr;
  } catch (e) {
    console.log(e);
  }
}

LocalDevices.prototype.getDevicesFlow = async function (members) {
  const instance = this;
  const address = this.address;
  const { tokenDir, statusJson } = this;
  const { equalJson, fileSystem, requestSystem, messageSend } = this.mother;
  try {
    const fromStatus = await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.past}` ]);
    const toStatus = await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ]);
    const fromDevices = fromStatus.devices;
    const toDevices = toStatus.devices;
    const deathKeyword = "death";
    const aliveKeyword = "alive";
    const toToken = "_____to_____";
    const channel = "#general";
    let devicesArr;
    let thisObject;
    let toObject;
    let statusObject;
    let deathToAliveTargets;
    let aliveToDateTargets;
    let tempObj;
    let thisMember;
    let helloMember;
    let goodByeMember;
    let messageArr;

    helloMember = (slack, name, title) => {
      return `<@${slack}> 안녕하세요, ${name} ${title}님! 좋은 아침입니다!`;
    }
    goodByeMember = (slack, name, title) => {
      return `<@${slack}> ${name} ${title}님! 오늘도 수고하셨습니다. 안녕히 가세요!`;
    }

    devicesArr = [];
    for (let obj of fromDevices) {
      thisObject = equalJson(JSON.stringify(obj));
      toObject = toDevices.find((o) => { return o.id === obj.id });
      thisObject.fromOnline = obj.online;
      thisObject.toOnline = toObject.online;
      thisObject.flow = (thisObject.fromOnline ? aliveKeyword : deathKeyword) + toToken + (thisObject.toOnline ? aliveKeyword : deathKeyword);
      devicesArr.push(thisObject);
    }

    statusObject = {
      raw: equalJson(JSON.stringify(devicesArr)),
      keywords: {
        alive: aliveKeyword,
        death: deathKeyword,
        token: toToken,
      },
      summary: {}
    }

    statusObject.summary[aliveKeyword + toToken + aliveKeyword] = [];
    statusObject.summary[aliveKeyword + toToken + deathKeyword] = [];
    statusObject.summary[deathKeyword + toToken + aliveKeyword] = [];
    statusObject.summary[deathKeyword + toToken + deathKeyword] = [];

    for (let obj of devicesArr) {
      statusObject.summary[obj.flow].push({
        id: obj.id,
        member: obj.member,
      })
    }

    deathToAliveTargets = [];
    aliveToDateTargets = [];

    for (let obj of statusObject.summary[deathKeyword + toToken + aliveKeyword]) {
      tempObj = {};
      thisMember = members.find((o) => { return o.id === obj.member.id });
      tempObj.id = thisMember.id;
      tempObj.name = thisMember.name;
      tempObj.title = thisMember.title;
      tempObj.slackId = thisMember.slack.id;
      tempObj.message = helloMember(thisMember.slack.id, thisMember.name, thisMember.title);
      deathToAliveTargets.push(tempObj);
    }

    for (let obj of statusObject.summary[aliveKeyword + toToken + deathKeyword]) {
      tempObj = {};
      thisMember = members.find((o) => { return o.id === obj.member.id });
      tempObj.id = thisMember.id;
      tempObj.name = thisMember.name;
      tempObj.title = thisMember.title;
      tempObj.slackId = thisMember.slack.id;
      tempObj.message = goodByeMember(thisMember.slack.id, thisMember.name, thisMember.title);
      aliveToDateTargets.push(tempObj);
    }

    messageArr = deathToAliveTargets.map((o) => { return o.message }).concat(aliveToDateTargets.map((o) => { return o.message }));

    for (let text of messageArr) {
      await messageSend({ text, channel, voice: true, fairy: true });
    }

    return statusObject;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = LocalDevices;