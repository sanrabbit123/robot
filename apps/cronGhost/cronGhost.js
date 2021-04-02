const CronGhost = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = `${process.cwd()}/apps/cronGhost`;
  this.list = require(`${this.dir}/cronList.js`);
}

CronGhost.prototype.initialPython = function () {
  const instance = this;
  const indent = 2;
  let script, scriptArr, scriptArrRefined;

  script = `
  import os
  import sys
  import json
  sys.path.append("${(process.cwd() + "/python_modules").replace(/"/g, "'")}")
  import subprocess
  import asyncio
  from apscheduler.schedulers.asyncio import AsyncIOScheduler
  ROBOT_PATH = "${(process.cwd()).replace(/"/g, "'")}"
  ROBOT = ROBOT_PATH + "/robot.js"
  async def run(cmdArr):
      cmd = ' '.join(cmdArr)
      proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
      (stdout, stderr) = await proc.communicate()
      if stdout:
          print(stdout.decode())
      if stderr:
          print(stderr.decode())`;

  scriptArr = script.split("\n");
  scriptArrRefined = [];
  for (let i of scriptArr) {
    if (i !== "") {
      scriptArrRefined.push(i.slice(indent));
    }
  }

  return scriptArrRefined.join("\n");
}

CronGhost.prototype.middlePython = function () {
  const instance = this;
  let script, scriptString;

  script = function (name) {
    return `async def ${name}():` + `\n` + `    await run([ 'node', ROBOT, '${name}' ])`;
  }

  scriptString = '';
  for (let { name } of this.list) {
    scriptString += script(name);
    scriptString += "\n\n";
  }

  return scriptString;
}

CronGhost.prototype.endPython = function () {
  const instance = this;
  let script;
  let addJopMaker;

  script = `
  scheduler = AsyncIOScheduler()

  scheduler.start()
  try:
      asyncio.get_event_loop().run_forever()
  except (KeyboardInterrupt, SystemExit):
      pass`;


  addJopMaker = function (name, time) {
    if (time.hour === undefined || time.hour === undefined || time.hour === undefined) {
      throw new Error("invaild time");
    }
    const { hour, minute, second } = time;
    return `scheduler.add_job(${name}, 'cron', hour='${String(hour)}', minute='${String(minute)}', second='${String(second)}')`;
  }

  script = `scheduler = AsyncIOScheduler()`;
  for (let { name, time } of this.list) {
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

CronGhost.prototype.scriptReady = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let totalScript;

    totalScript = this.initialPython();
    totalScript += "\n\n";
    totalScript += this.middlePython();
    totalScript += "\n\n";
    totalScript += this.endPython();

    await fileSystem(`write`, [ `${this.dir}/cronGhost.py`, totalScript ]);

    return `${this.dir}/cronGhost.py`;

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronGhost;
