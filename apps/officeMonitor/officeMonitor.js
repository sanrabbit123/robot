const OfficeMonitor = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/officeMonitor";
  this.scanResultName = "arpScanResult.json";
  this.messageStorage = "messageStorage";
}

OfficeMonitor.intervals = {};

OfficeMonitor.stacks = {};

OfficeMonitor.prototype.messageDummy = function (from, to, message, option = {}) {
  if (typeof from !== "string" || !Array.isArray(to) || typeof message !== "string") {
    throw new Error("invaild input");
  }
  if (!to.every((id) => { return typeof id === "string" })) {
    throw new Error("invaild to array");
  }
  if (typeof option !== "object") {
    throw new Error("invild option");
  }
  const instance = this;
  const { uniqueValue } = this.mother;
  const messageIdInitial = "M";
  const toLength = to.length;
  let dummy;

  dummy = {
    id: messageIdInitial + uniqueValue("hex"),
    date: new Date(),
    participants: { from, to },
    method: {
      alarm: (option.alarm === true),
      alert: (option.alert === true),
    },
    contents: { message },
    receive: {
      readed: (new Array(toLength)).fill(0),
      date: (new Array(toLength)).fill(new Date(1800, 0, 1)),
    }
  };

  return dummy;
}

OfficeMonitor.prototype.sendMessage = function (from, to, message, option = {}) {
  if (typeof from !== "string" || !Array.isArray(to) || typeof message !== "string") {
    throw new Error("invaild input");
  }
  if (!to.every((id) => { return typeof id === "string" })) {
    throw new Error("invaild to array");
  }
  if (typeof option !== "object") {
    throw new Error("invild option");
  }
  const instance = this;
  const address = this.address;
  const WebSocket = require("ws");
  const PORT = 5000;
  const url = `wss://${address.officeinfo.ghost.host}:${String(PORT)}/general`;
  const messageObj = this.messageDummy(from, to, message, option);
  console.log(OfficeMonitor.stacks.wssSocket);
  if (OfficeMonitor.stacks.wssSocket !== undefined) {
    OfficeMonitor.stacks.wssSocket.send(JSON.stringify(messageObj));
  }
  return messageObj;
}

OfficeMonitor.prototype.renderReport = async function () {
  const instance = this;
  const os = require(`os`);
  const members = require(`${process.cwd()}/apps/memberObj.js`);
  const { scanResultName } = this;
  const { map } = this.address.officeinfo;
  const { shellExec, shellLink, fileSystem, setQueue, equalJson, errorLog, sleep, messageSend, messageLog } = this.mother;
  try {
    let getMac;
    let macToName;
    let zeroAddition;
    let getInfoFromInterFace;
    let totalReports;
    let final;

    getMac = async function (networkInterface = null) {
      try {
        let rawInterfaces;
        let rawInterfacesKeys, rawInterfacesValues;
        let interfaceTargetIndex;
        let stdout, rawArr, selfMac, selfIp, tempArr, tempMatrix, tong, tempObj;

        if (networkInterface === null) {
          rawInterfaces = os.networkInterfaces();
          rawInterfacesKeys = Object.keys(rawInterfaces);
          rawInterfacesValues = rawInterfacesKeys.map((key) => { return rawInterfaces[key]; });
          interfaceTargetIndex = rawInterfacesValues.findIndex((arr) => { return arr.some((obj) => { return obj.mac === instance.address.officeinfo.ghost.monitor.mac }); });
          networkInterface = rawInterfacesKeys[interfaceTargetIndex];
        }

        stdout = await shellExec(`arp-scan -I ${networkInterface} --localnet`);
        rawArr = stdout.split("\n");

        rawArr = rawArr.slice(0, rawArr.findIndex((str) => { return str.trim() === '' }));
        tempArr = rawArr.slice(0, rawArr.findIndex((str) => { return /^[0-9]/.test(str) }));
        rawArr = rawArr.slice(rawArr.findIndex((str) => { return /^[0-9]/.test(str) }));
        tempMatrix = tempArr[tempArr.length - 2].split(", ").map((str) => { return str.split(': ') });
        selfMac = tempMatrix.find(arr => arr.includes("MAC"))[1];
        selfIp = tempMatrix.find(arr => arr.includes("IPv4"))[1];
        tempMatrix = rawArr.map(str => str.split("\t"));

        tong = {};
        for (let [ ip, mac ] of tempMatrix) {
          tong[mac] = ip;
        }
        tong[selfMac] = selfIp;

        return tong;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    macToName = function (macArr, data) {
      let index;
      let message;
      let nameArr;
      let thisMember;

      nameArr = [];
      for (let mac of macArr) {
        index = map.findIndex((obj) => { return obj.mac === mac });
        if (index !== -1) {
          if (typeof map[index].memid === "string") {
            thisMember = members.find((obj) => { return obj.id === map[index].memid });
            message = `${thisMember.name} ${thisMember.title} (${mac}) => ${data[mac]}`;
          } else {
            message = `${map[index].name} (${mac}) => ${data[mac]}`;
          }
        } else {
          message = `unknown (${mac}) => ${data[mac]}`;
        }
        nameArr.push(message);
      }

      return nameArr;
    }
    zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }

    getInfoFromInterFace = async (interface, filtering = false) => {
      try {
        const data = await getMac(interface);
        let index;
        let alive;
        let isSame;
        let add, subtract;
        let report;
        let message;
        let thisMember;

        alive = [];
        messages = [];
        if (!filtering) {
          for (let mac in data) {
            alive.push(mac);
          }
        } else {
          for (let mac in data) {
            index = map.findIndex((obj) => { return obj.mac === mac });
            if (index !== -1) {
              alive.push(mac);
            }
          }
        }

        report = {
          alive: macToName(alive, data),
          unknown: macToName(alive, data).filter((str) => { return /^unknown/i.test(str); }),
        };


        report.alive.sort((a, b) => { return (/[가-힣]/gi.test(b) ? 10000 : 0) - (/[가-힣]/gi.test(a) ? 10000 : 0) });

        return report;

      } catch (e) {
        console.log(e);
      }
    }
    totalReports = async () => {
      try {
        let rawInterfaces;
        let rawInterfacesKeys, rawInterfacesValues;
        let totalReport;

        rawInterfaces = os.networkInterfaces();
        rawInterfacesKeys = Object.keys(rawInterfaces);
        rawInterfacesValues = rawInterfacesKeys.map((key) => { return rawInterfaces[key]; });
        rawInterfacesKeys = rawInterfacesKeys.filter((key) => {
          return !/^lo/i.test(key) && !(/^w/i.test(key) && rawInterfaces[key].some((obj) => { return /^172/.test(obj.address) }));
        });

        totalReport = {};
        totalReport.date = new Date();
        for (let interface of rawInterfacesKeys) {
          totalReport[interface] = await getInfoFromInterFace(interface, /^w/i.test(interface));
        }

        return totalReport;
      } catch (e) {
        console.log(e);
      }
    }

    final = await totalReports();

    await fileSystem(`writeJson`, [ this.address.officeinfo.ghost.file.static + "/" + scanResultName, final ]);

    return final;

  } catch (e) {
    console.log(e);
  }
}

OfficeMonitor.prototype.routerPatch = function (app, MONGOLOCALC) {
  const instance = this;
  const address = this.address;
  const { shellExec, shellLink, fileSystem, setQueue, equalJson, errorLog, sleep, messageSend, messageLog } = this.mother;
  const { messageStorage } = this;
  const defaultPath = address.officeinfo.ghost.monitor.path;
  const ipPass = (req) => {
    let ip;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (/^172\.30\.1/.test(ip)) {
      return true;
    } else if (ip === "220.117.13.12") {
      return true;
    } else if (ip === "220.72.109.59") {
      return true;
    } else if (/^223\.3/.test(ip)) {
      return true;
    } else if (/^223\.4/.test(ip)) {
      return true;
    } else if (/^223\.5/.test(ip)) {
      return true;
    } else if (/^223\.6/.test(ip)) {
      return true;
    } else {
      return false;
    }
  }

  app.get(defaultPath, async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!ipPass(req)) {
        throw new Error("ip ban");
      }
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.get(defaultPath + "/status", async (req, res) => {
    res.set({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!ipPass(req)) {
        throw new Error("ip ban");
      }
      res.send(JSON.stringify(OfficeMonitor.stacks.memberAlive));
    } catch (e) {
      console.log(e);
      res.send("error");
    }
  });

  app.post(defaultPath + "/status", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!ipPass(req)) {
        throw new Error("ip ban");
      }
      res.send(JSON.stringify(OfficeMonitor.stacks.memberAlive));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.post(defaultPath + "/deviceLogin", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!ipPass(req)) {
        throw new Error("ip ban");
      }
      const { device } = equalJson(req.body);
      let macArr, memid;
      let index;

      macArr = device.networkInterfaces.map((obj) => { return obj.mac });

      memid = null;
      for (let mac of macArr) {
        index = address.officeinfo.map.findIndex((obj) => { return obj.mac === mac });
        if (index !== -1) {
          if (typeof address.officeinfo.map[index].memid === "string") {
            memid = address.officeinfo.map[index].memid;
            break;
          }
        }
      }

      if (memid !== null) {
        OfficeMonitor.stacks.memberAlive[memid] = true;
        if (OfficeMonitor.stacks.deathTimeout[memid] !== null) {
          clearTimeout(OfficeMonitor.stacks.deathTimeout[memid]);
        }
        OfficeMonitor.stacks.deathTimeout[memid] = setTimeout(() => {
          OfficeMonitor.stacks.memberAlive[memid] = false;
        }, 2 * 30 * 1000);
      }

      res.send({ message: "done" });
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.post(defaultPath + "/sendMessage", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    });
    try {
      if (!ipPass(req)) {
        throw new Error("ip ban");
      }
      if (req.body.from === undefined || req.body.to === undefined || req.body.message === undefined) {
        throw new Error("invaild post");
      }
      const { from, to, message } = equalJson(req.body);
      let option;
      if (req.body.option !== undefined) {
        option = equalJson(req.body.option);
      } else {
        option = {};
      }
      const messageObj = instance.sendMessage(from, to, message, option);
      await MONGOLOCALC.db(`miro81`).collection(messageStorage).insertOne(messageObj);
      res.send(JSON.stringify(messageObj));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

}

OfficeMonitor.prototype.intervalMonitoring = function () {
  const instance = this;
  const zeroAddition = (num) => { return num < 10 ? `0${String(num)}` : String(num); }
  const defaultInterval = 30 * 60 * 1000;
  const interval = {
    d080: 30 * 60 * 1000,
    d091: 6 * 60 * 1000,
    d183: 30 * 60 * 1000,
    d210: 60 * 60 * 1000,
    d220: 60 * 60 * 1000,
  };
  let intervalFunc;
  let intervalSetting;

  OfficeMonitor.intervals.monitorIntervalId = null;

  intervalFunc = async () => {
    try {
      await instance.renderReport();
    } catch (e) {
      console.log(e);
    }
  }

  intervalSetting = () => {
    const now = new Date();
    let dateKey;
    dateKey = 'd' + zeroAddition(now.getHours()) + zeroAddition(now.getMinutes()).slice(0, 1);
    if (typeof interval[dateKey] !== "number") {
      if (OfficeMonitor.intervals.monitorIntervalId === null) {
        OfficeMonitor.intervals.monitorIntervalId = setInterval(intervalFunc, defaultInterval);
      }
    } else {
      if (OfficeMonitor.intervals.monitorIntervalId !== null) {
        clearInterval(OfficeMonitor.intervals.monitorIntervalId);
        OfficeMonitor.intervals.monitorIntervalId = null;
      }
      OfficeMonitor.intervals.monitorIntervalId = setInterval(intervalFunc, interval[dateKey]);
    }
  }

  intervalSetting();
  setInterval(intervalSetting, 10 * 60 * 1000);

}

OfficeMonitor.prototype.reportServer = async function () {
  const instance = this;
  const https = require("https");
  const express = require("express");
  const multer = require("multer");
  const useragent = require("express-useragent");
  const WebSocket = require("ws");
  const members = require(`${process.cwd()}/apps/memberObj.js`);
  const address = this.address;
  const { shellExec, shellLink, fileSystem, setQueue, mongo, mongolocalinfo, errorLog, sleep, messageSend, messageLog, equalJson } = this.mother;
  try {
    const url = "wss://" + this.address.officeinfo.ghost.host + ":" + String(5000) + "/general";
    const PORT = this.address.officeinfo.ghost.monitor.port;
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    await MONGOLOCALC.connect();
    const app = express();
    const multiForms = multer();
    let pems, pemsLink;
    let certDir, keyDir, caDir;
    let ws;
    let memberAlive;


    app.use(useragent.express());
    app.use(express.json({ limit : "50mb" }));
    app.use(multiForms.array());
    app.use(express.urlencoded({ limit: "50mb", extended: true }));


    // ssl patch
    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.ghost.host;

    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);

    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }
    pems.allowHTTP1 = true;


    // routing
    this.routerPatch(app, MONGOLOCALC);


    // alive monitor
    memberAlive = {};
    OfficeMonitor.stacks.deathTimeout = {};
    for (let { id } of members) {
      memberAlive[id] = false;
      OfficeMonitor.stacks.deathTimeout[id] = null;
    }
    OfficeMonitor.stacks.memberAlive = memberAlive;

    OfficeMonitor.stacks.wssSocket = new WebSocket(url);
    OfficeMonitor.stacks.wssSocket.on("open", () => {

      setInterval(() => {
        OfficeMonitor.stacks.wssSocket.send(JSON.stringify({ message: "alive" }));
      }, 30 * 1000);

      OfficeMonitor.stacks.wssSocket.on("message", (raw) => {
        try {
          const data = equalJson(raw);
          let macArr, memid, index;
          if (data.device !== undefined && data.message === "alive") {
            macArr = data.device.networkInterfaces.map((obj) => { return obj.mac });

            memid = null;
            for (let mac of macArr) {
              index = address.officeinfo.map.findIndex((obj) => { return obj.mac === mac });
              if (index !== -1) {
                if (typeof address.officeinfo.map[index].memid === "string") {
                  memid = address.officeinfo.map[index].memid;
                  break;
                }
              }
            }

            if (memid !== null) {
              OfficeMonitor.stacks.memberAlive[memid] = true;
              if (OfficeMonitor.stacks.deathTimeout[memid] !== null) {
                clearTimeout(OfficeMonitor.stacks.deathTimeout[memid]);
              }
              OfficeMonitor.stacks.deathTimeout[memid] = setTimeout(() => {
                OfficeMonitor.stacks.memberAlive[memid] = false;
              }, 2 * 30 * 1000);
            }
          }
        } catch {
          // pass
        }
      });

    });


    // server launching
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = OfficeMonitor;
