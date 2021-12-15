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
}

OfficeMonitor.intervals = {};

OfficeMonitor.prototype.renderReport = async function () {
  const instance = this;
  const os = require(`os`);
  const { map } = this.address.officeinfo;
  const { shellExec, shellLink, fileSystem, setQueue, equalJson, errorLog, sleep, messageSend, messageLog } = this.mother;
  try {
    let getMac;
    let macToName;
    let zeroAddition;
    let getInfoFromInterFace;
    let totalReports;

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

    OfficeMonitor.intervals.monitorIntervalId = null;
    OfficeMonitor.intervals.monitorPast = {};
    getInfoFromInterFace = async (interface, filtering = false) => {
      try {
        if (!Array.isArray(OfficeMonitor.intervals.monitorPast[interface])) {
          OfficeMonitor.intervals.monitorPast[interface] = [];
        }
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

        isSame = (alive.length === OfficeMonitor.intervals.monitorPast[interface].length);
        if (isSame) {
          for (let mac of alive) {
            if (!OfficeMonitor.intervals.monitorPast[interface].includes(mac)) {
              isSame = false;
              break;
            }
          }
        }

        report = {
          alive: macToName(alive, data),
          unknown: macToName(alive, data).filter((str) => { return /^unknown/i.test(str); }),
        };

        if (!isSame) {
          add = [];
          for (let mac of alive) {
            if (!OfficeMonitor.intervals.monitorPast[interface].includes(mac)) {
              add.push(mac);
            }
          }
          subtract = [];
          for (let mac of OfficeMonitor.intervals.monitorPast[interface]) {
            if (!alive.includes(mac)) {
              subtract.push(mac);
            }
          }

          report.add = macToName(add, data);
          report.subtract = macToName(subtract, data);
        }

        OfficeMonitor.intervals.monitorPast[interface] = equalJson(JSON.stringify(alive));

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
        for (let interface of rawInterfacesKeys) {
          totalReport[interface] = await getInfoFromInterFace(interface, /^w/i.test(interface));
        }

        return totalReport;
      } catch (e) {
        console.log(e);
      }
    }

    return (await totalReports());

  } catch (e) {
    console.log(e);
  }
}

OfficeMonitor.prototype.routerPatch = function (app) {
  const instance = this;
  const { shellExec, shellLink, fileSystem, setQueue, equalJson, errorLog, sleep, messageSend, messageLog } = this.mother;

  app.get(instance.address.officeinfo.ghost.monitor.path, async (req, res) => {
    try {
      res.send(JSON.stringify({ message: "OK" }));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });

  app.post(instance.address.officeinfo.ghost.monitor.path + "/subway", async (req, res) => {
    try {
      res.send(JSON.stringify(await instance.renderReport()));
    } catch (e) {
      console.log(e);
      res.send(JSON.stringify({ message: "error : " + e.message }));
    }
  });
}

OfficeMonitor.prototype.connect = async function () {
  const instance = this;
  const https = require("https");
  const express = require("express");
  const multer = require("multer");
  const useragent = require("express-useragent");
  const members = require(`${process.cwd()}/apps/memberObj.js`);
  const { map } = this.address.officeinfo;
  const { shellExec, shellLink, fileSystem, setQueue, mongo, mongolocalinfo, errorLog, sleep, messageSend, messageLog } = this.mother;
  try {
    const PORT = this.address.officeinfo.ghost.monitor.port;
    const MONGOLOCALC = new mongo(mongolocalinfo, { useUnifiedTopology: true });
    await MONGOLOCALC.connect();
    const app = express();
    const multiForms = multer();
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    app.use(useragent.express());
    app.use(express.json({ limit : "50mb" }));
    app.use(multiForms.array());
    app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

    this.routerPatch(app);

    // server launching
    https.createServer(pems, app).listen(PORT, () => { console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); });

  } catch (e) {
    console.log(e);
  }
}

module.exports = OfficeMonitor;
