const Robot = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Robot.timeouts = {};

Robot.prototype.mongoToJson = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, zeroAddition } = this.mother;
  try {
    const today = new Date();
    const backFolderName = "backup";
    const mongoTargets = [
      [ "mongoinfo", "mongo" ],
    ];
    const robotDirArr = process.cwd().split("/");
    robotDirArr.pop();
    const robotDirMother = robotDirArr.join("/");
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
    if (!robotDirMotherDetail.includes(backFolderName)) {
      await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
    }
    const backDir = robotDirMother + "/" + backFolderName;
    let tempInfo, timeString;

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempInfo = this.address[infoName];
      await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
    }

    tempInfo = this.address["officeinfo"];
    await shellExec(`mongodump --uri="mongodb://${tempInfo["ghost"]["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${"office"}${timeString}" --authenticationDatabase admin`);

    await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.infoObj = async function () {
  try {
    await this.back.setInfoObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.memberObj = async function () {
  try {
    await this.back.setMemberObj({ getMode: false });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.infoUpdate = async function () {
  try {
    await this.back.updateInfoObj();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.memberUpdate = async function () {
  try {
    await this.back.updateMemberObj();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.dataConsole = function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  app.connect().catch((err) => { console.log(err); });
}

Robot.prototype.renderFrontPhp = async function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  await app.renderFrontPhp();
}

Robot.prototype.renderDesignerPhp = async function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  const app = new DataConsole();
  await app.renderDesignerPhp();
}

Robot.prototype.aliveTest = function () {
  const instance = this;
  const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
  const app = new CronGhost();
  app.aliveTest().catch((err) => { console.log(err); });
}

Robot.prototype.proposalMaker = function (button, arg) {
  if (arg === undefined) {
    throw new Error("proposal must be id");
    return;
  }
  const instance = this;
  const back = this.back;
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const path = "proposal";
  const collection = "proposalLog";
  const { host } = this.address.frontinfo;
  const { requestSystem, messageLog, errorLog, messageSend } = this.mother;
  const proid = arg;
  let kakaoInstance, cliid, name, phone, client;
  let requestNumber, action;
  let now;
  let project;

  return new Promise((resolve, reject) => {

    now = new Date();

    back.getProjectById(proid).then((thisProject) => {
      if (thisProject === null) {
        reject("There is no project");
      }
      project = thisProject;
      cliid = thisProject.cliid;
      return back.getClientById(cliid);
    }).then((data) => {
      client = data;
      name = client.name;
      phone = client.phone;

      requestNumber = 0;
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= now.valueOf()) {
          requestNumber = i;
          break;
        }
      }

      if (client.requests[requestNumber].analytics.response.action.value === "부재중 제안 발송") {
        action = "피드백과 응대 예정";
      } else {
        action = "제안 피드백 예정";
      }

      kakaoInstance = new KakaoTalk();
      return kakaoInstance.sendTalk("designerProposal", name, phone, { client: name, host, path, proid });
    }).then(() => {
      return back.updateProject([ { proid }, { "proposal.status": "완료", "proposal.date": now } ]);
      
    }).then(() => {

      const targetProposal = project.toNormal().proposal;
      targetProposal.status = "완료";
      targetProposal.date = now;

      return back.mongoCreate(collection, {
        date: new Date(),
        method: "send",
        proid: proid,
        project: targetProposal,
      }, { console: true });

    }).then(() => {

      let updateObj;
      updateObj = {};
      updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action;
      return back.updateClient([ { cliid }, updateObj ]);

    }).then(() => {
      return messageSend({ text: name + " 고객님께 추천서를 전송하였어요.\nlink : https://" + host + "/" + path + ".php?proid=" + proid + "&mode=test", channel: "#403_proposal", voice: false });

    }).then(() => {

      resolve({ message: "done" });

    }).catch((err) => {
      errorLog("추천서 보내는 도중 오류남 : " + err.message).catch((e) => { console.log(e); });
      reject(err);
    });
  });
}

Robot.prototype.transferConnect = async function () {
  try {
    const TransferLounge = require(process.cwd() + "/apps/transferLounge/transferLounge.js");
    const app = new TransferLounge();
    await app.transConnect();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.staticConnect = async function () {
  try {
    const StaticLounge = require(process.cwd() + "/apps/staticLounge/staticLounge.js");
    const app = new StaticLounge();
    await app.staticConnect();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.kakaoTokenGenerate = async function () {
  try {
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const app = new KakaoTalk();
    await app.generateToken();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.frontSync = async function () {
  try {
    await this.mother.requestSystem("https://" + this.address.testinfo.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.clientReportToSheets = async function () {
  try {
    const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
    const sheets = new GoogleSheet();
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM";
    const startPoint = [ 0, 0 ];
    const report = await this.back.getClientReport();
    await sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint);
    console.log(`\x1b[33m%s\x1b[0m`, `sheets upload done`);
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.fixDir = async function (target) {
  try {
    const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
    const hangul = new ParsingHangul();
    hangul.fixDirPromise(target).then(function (tree) {
      console.log("done");
      process.exit();
    }).catch(function (err) {
      console.log(err);
      process.exit();
    });
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.proposalToClient = async function () {
  try {
    const BackWorker = require(process.cwd() + "/apps/backMaker/backWorker.js");
    const work = new BackWorker();
    await work.setProposalToClient("cron");
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.designerCalculation = async function () {
  try {
    const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
    const work = new BackWorker();
    await work.designerCalculation();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.passiveSync = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const bill = new BillMaker();
    bill.passiveSyncAll();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.cronServer = async function () {
  try {
    const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`);
    const cron = new CronGhost();
    await cron.cronServer();
  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.taxBill = async function () {
  try {
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`);
    const app = new BillMaker();
    await app.taxBill();
  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const robot = new Robot();
const MENU = {
  proposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid");
      }
      robot.proposalMaker("make", process.argv[3]).catch((err) => { console.log(err); });
    } catch (e) {
      console.log(e);
    }
  },
  webProposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid");
      }
      console.log(await robot.proposalMaker("web", process.argv[3]));
    } catch (e) {
      console.log(e);
    }
  },
  back: async function () {
    try {
      robot.dataConsole();
    } catch (e) {
      console.log(e);
    }
  },
  frontSync: async function () {
    try {
      await robot.frontSync();
    } catch (e) {
      console.log(e);
    }
  },
  clientReportToSheets: async function () {
    try {
      await robot.clientReportToSheets();
    } catch (e) {
      console.log(e);
    }
  },
  taxBill: async function () {
    try {
      await robot.taxBill();
    } catch (e) {
      console.log(e);
    }
  },
  fixDir: async function () {
    try {
      let target;
      if (process.argv[3] === undefined) {
        target = process.env.HOME + "/samba/drive/HomeLiaisonServer";
      } else {
        target = process.argv[3];
      }
      await robot.fixDir(target);
    } catch (e) {
      console.log(e);
    }
  },
  proposalToClient: async function () {
    try {
      await robot.proposalToClient();
    } catch (e) {
      console.log(e);
    }
  },
  mongoToJson: async function () {
    try {
      await robot.mongoToJson();
    } catch (e) {
      console.log(e);
    }
  },
  dev: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      await dev.launching();
    } catch (e) {
      console.log(e);
    }
  },
  canvas: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`);
      const dev = new DevContext();
      dev.devCanvas(process.argv[2] !== "canvas");
    } catch (e) {
      console.log(e);
    }
  },
  clientActionSyncLocal: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
      const work = new BackWorker();
      await work.clientActionSync({ fromLocal: true });
    } catch (e) {
      console.log(e);
    }
  },
  clientActionSync: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`);
      const work = new BackWorker();
      await work.clientActionSync();
    } catch (e) {
      console.log(e);
    }
  },
  kakaoTokenGenerate: async function () {
    try {
      await robot.kakaoTokenGenerate();
    } catch (e) {
      console.log(e);
    }
  },
  designerCalculation: async function () {
    try {
      await robot.designerCalculation();
    } catch (e) {
      console.log(e);
    }
  },
  infoObj: async function () {
    try {
      await robot.infoObj();
    } catch (e) {
      console.log(e);
    }
  },
  infoUpdate: async function () {
    try {
      await robot.infoUpdate();
    } catch (e) {
      console.log(e);
    }
  },
  memberObj: async function () {
    try {
      await robot.memberObj();
    } catch (e) {
      console.log(e);
    }
  },
  memberUpdate: async function () {
    try {
      await robot.memberUpdate();
    } catch (e) {
      console.log(e);
    }
  },
  aliveTest: async function () {
    try {
      robot.aliveTest();
    } catch (e) {
      console.log(e);
    }
  },
  passiveSync: async function () {
    try {
      await robot.passiveSync();
    } catch (e) {
      console.log(e);
    }
  },
  cronServer: async function () {
    try {
      await robot.cronServer();
    } catch (e) {
      console.log(e);
    }
  },
  php: async function () {
    try {
      await robot.renderFrontPhp();
    } catch (e) {
      console.log(e);
    }
  },
  phpDesigner: async function () {
    try {
      await robot.renderDesignerPhp();
    } catch (e) {
      console.log(e);
    }
  },
  trans: async function () {
    try {
      await robot.transferConnect();
    } catch (e) {
      console.log(e);
    }
  },
  static: async function () {
    try {
      await robot.staticConnect();
    } catch (e) {
      console.log(e);
    }
  },
};
let launchingFunc;

if (process.argv[2] === undefined) {
  // pass
} else {
  launchingFunc = MENU[process.argv[2]];
  if (launchingFunc !== undefined) {
    launchingFunc().catch((err) => { console.log(err); });
  }
}
