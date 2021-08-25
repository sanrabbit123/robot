const CronGhost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.list = [];
}

CronGhost.prototype.initialPython = function () {
  const instance = this;
  const indent = 2;
  let script, scriptArr, scriptArrRefined;

  script = `
  import os
  import sys
  import json
  import re
  import time
  sys.path.append("${(process.cwd() + "/python_modules").replace(/"/g, "'")}")
  import subprocess
  import asyncio
  from apscheduler.schedulers.asyncio import AsyncIOScheduler
  ROBOT_PATH = "${(process.cwd()).replace(/"/g, "'")}"
  ROBOT = ROBOT_PATH + "/robot.js"
  THIS_PATH = ROBOT_PATH + "/apps/cronGhost"
  LOG_PATH = THIS_PATH + "/log"
  async def run(cmdArr):
      cmd = ' '.join(cmdArr)
      proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
      (stdout, stderr) = await proc.communicate()
      if stdout:
          print(stdout.decode())
          return stdout.decode()
      if stderr:
          print(stderr.decode())
          return stderr.decode()`;

  scriptArr = script.split("\n");
  scriptArrRefined = [];
  for (let i of scriptArr) {
    if (i !== "") {
      scriptArrRefined.push(i.slice(indent));
    }
  }

  return scriptArrRefined.join("\n");
}

CronGhost.prototype.middlePython = function (listNum) {
  const instance = this;
  const targetList = this.list[listNum];
  let script, scriptString;

  script = function (name, order = null) {
    if (order === null) {
      return `async def ${name}():` + `\n` + `    await run([ 'node', ROBOT, '${name}' ])`;
    } else {
      return `async def ${name}():` + `\n` + `    await run([ 'node', ROBOT, '${order}' ])`;
    }
  }

  scriptString = '';
  for (let obj of targetList) {
    if (obj.order !== undefined) {
      scriptString += script(obj.name, obj.order);
    } else {
      scriptString += script(obj.name, null);
    }
    scriptString += "\n\n";
  }

  return scriptString;
}

CronGhost.prototype.endPython = function (listNum) {
  const instance = this;
  const targetList = this.list[listNum];
  const addJopMaker = function (name, time) {
    if (time.hour === undefined || time.hour === undefined || time.hour === undefined) {
      throw new Error("invaild time");
    }
    const { hour, minute, second } = time;
    if (time.day_of_week === undefined) {
      if (hour !== null && minute === null && second === null) {
        return `scheduler.add_job(${name}, 'interval', hours=${String(hour)})`;
      } else if (hour === null && minute !== null && second === null) {
        return `scheduler.add_job(${name}, 'interval', minutes=${String(minute)})`;
      } else if (hour === null && minute === null && second !== null) {
        return `scheduler.add_job(${name}, 'interval', seconds=${String(second)})`;
      } else {
        return `scheduler.add_job(${name}, 'cron', hour='${String(hour)}', minute='${String(minute)}', second='${String(second)}')`;
      }
    } else {
      return `scheduler.add_job(${name}, 'cron', day_of_week='${String(time.day_of_week)}', hour='${String(hour)}', minute='${String(minute)}', second='${String(second)}')`;
    }
  }
  let script;

  script = `scheduler = AsyncIOScheduler()`;
  for (let { name, time } of targetList) {
    script += `\n`;
    script += addJopMaker(name, time);
  }
  script += `\n`;
  script += `scheduler.start()`;
  script += `\n`;
  script += `try:`;
  script += `\n`;
  script += `    asyncio.get_event_loop().run_forever()`;
  script += `\n`;
  script += `except (KeyboardInterrupt, SystemExit):`;
  script += `\n`;
  script += `    pass`;

  return script;
}

CronGhost.prototype.observerPython = function () {
  const instance = this;

}

CronGhost.prototype.scriptReady = async function (listNum = 0) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let totalScript, targetList;

    targetList = await fileSystem(`readDir`, [ `${this.dir}/list` ]);
    targetList = targetList.filter((a) => {
      return a !== `.DS_Store`;
    });
    targetList.sort((a, b) => {
      return Number(a.split('_')[0]) - Number(b.split('_')[0]);
    });

    this.list = [];
    for (let i of targetList) {
      this.list.push(require(`${this.dir}/list/${i}`));
    }

    totalScript = this.initialPython();
    totalScript += "\n\n";
    totalScript += this.middlePython(listNum);
    totalScript += "\n\n";
    totalScript += this.endPython(listNum);

    await fileSystem(`write`, [ `${this.dir}/cronGhost.py`, totalScript ]);

    return `${this.dir}/cronGhost.py`;

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
