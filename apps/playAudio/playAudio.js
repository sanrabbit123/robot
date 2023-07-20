const PlayAudio = function (option = {}) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const AwsAPIs = require(`${process.cwd()}/apps/awsAPIs/awsAPIs.js`);
  this.mother = new Mother();
  this.address = ADDRESS;
  this.aws = new AwsAPIs();
  if (option.players === undefined) {
    this.players = [
      'mplayer',
      'afplay',
      'mpg123',
      'mpg321',
      'play',
      'omxplayer',
      'aplay',
      'cmdmp3'
    ];
  } else {
    this.players = option.players;
  }
  const findExec = function () {
    const isExec = function (command) {
      const { execSync: exec } = require('child_process');
      try {
        exec(command);
        return true;
      } catch (e) {
        return false;
      }
    }
    const findCommand = function (command) {
      const platform = require('os').platform();
      if (/^win/.test(platform)) {
        return "where " + command;
      } else {
        return "command -v " + command;
      }
    }
    const commands = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.apply(arguments);
    let command;
    command = null;
    commands.some((c) => {
      if (isExec(findCommand(c))) {
        command = c;
        return true;
      } else {
        return false;
      }
    });
    return command;
  }
  if (option.player === undefined) {
    this.player = findExec(this.players);
  } else {
    this.player = option.player;
  }
  this.urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i;
  this.dir = process.cwd() + "/apps/playAudio";
  this.python = this.dir + "/python/app.py";
}

PlayAudio.prototype.play = function (audio, options = {}) {
  if (audio === undefined) {
    throw new Error("No audio file specified");
  }

  if (!this.player) {
    throw new Error("Couldn't find a suitable audio player");
  }

  options.stdio = 'ignore'

  const { spawn } = require('child_process');
  const isURL = this.player === 'mplayer' && this.urlRegex.test(audio);
  const args = Array.isArray(options[this.player]) ? options[this.player].concat(audio) : [ audio ];
  const process = spawn(this.player, args, options);

  if (!process) {
    throw new Error("Unable to spawn process with " + this.player);
    return null;
  }

  return new Promise(function(resolve, reject) {
    process.on('close', function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(process);
      }
    });
  });
}

PlayAudio.prototype.textToVoice = async function (text = "안녕하세요?") {
  const instance = this;
  const { shellExec, shellLink } = this.mother;
  try {
    const os = require("os");
    let file;
    if (/Darwin/gi.test(os.type())) {
      await shellExec(`say "${text.replace(/\"/gi, '').replace(/[^가-힣\?\!\. ]/gi, '')}"`);
    } else {
      file = await this.aws.pollyStream(text);
      await this.play(file);
      await shellExec(`rm -rf ${shellLink(file)}`);
    }
  } catch (e) {
    console.log(e);
  }
}

PlayAudio.prototype.voiceToText = async function () {
  const instance = this;
  const { shellExec, shellLink, fileSystem, uniqueValue, s3FileUpload, s3FileDelete, pythonExecute, requestSystem, equalJson } = this.mother;
  const { python } = this;
  const home = process.env.HOME;
  const audioTongName = "audioTong";
  const folder = `${home}/${audioTongName}`;
  const s3Const = "/voiceTong";
  const nameConst = "audioTong_";
  const to = "mp3";
  const parentId = "1MehWQWy7rp7AkZWGdp_X3zdMwOKcIpjS";
  const wordTitleConst = "음성추출_";
  const GoogleDocs = require(`${process.cwd()}/apps/googleAPIs/googleDocs.js`);
  const docs = new GoogleDocs();
  const docsConst0 = "https://docs.google.com/document/d/";
  const docsConst1 = "/edit?usp=sharing";
  try {
    const homeDir = await fileSystem(`readDir`, [ home ]);
    if (!homeDir.includes(audioTongName)) {
      await shellExec(`mkdir`, [ folder ]);
    }
    const targetFiles = (await fileSystem(`readDir`, [ folder ])).filter((str) => { return !/DS_Store/gi.test(str) });
    let fromArr, toArr;
    let tong, tempName, exe;
    let tempObj, res;
    let name;
    let response;
    let wordingTong;
    let resultTong;
    let tempLink;
    let tempId;
    let targetStr, targetObj;

    if (targetFiles.length > 0) {

      tong = [];
      fromArr = [];
      toArr = [];
      for (let file of targetFiles) {
        tempObj = {};

        exe = file.split('.')[file.split('.').length - 1];
        tempObj.name = nameConst + uniqueValue("string");
        tempName = tempObj.name + '.' + exe;

        await shellExec(`mv`, [ `${home}/${audioTongName}/${file}`, `${home}/${audioTongName}/${tempName}` ]);
        console.log("converting start");
        res = await pythonExecute(python, [ `convert` ], { input: `${home}/${audioTongName}/${tempName}`, from: exe, to, folder });
        console.log("converting success : " + res.output);

        name = res.output.split("/")[res.output.split("/").length - 1];
        exe = name.split('.')[name.split('.').length - 1];
        tempObj.exe = exe;
        tempName = tempObj.name + '.' + exe;
        tempObj.uri = `s3://${instance.address.s3info.bucket}${s3Const}/${tempName}`;

        fromArr.push(res.output);
        toArr.push(`${s3Const}/${tempName}`);
        tong.push(tempObj);
      }

      console.log(`target : `, fromArr, toArr);
      await s3FileUpload(fromArr, toArr);

      resultTong = [];
      for (let { uri, exe, name } of tong) {
        console.log("transcribe start");
        res = await pythonExecute(python, [ `transcribe` ], { uri, exe, name });
        console.log("transcribe success");

        targetStr = res;
        targetStr = targetStr.slice(targetStr.search(/\{ *['"]TranscriptFileUri/));
        targetStr = targetStr.slice(0, targetStr.search(/\}/) + 1).replace(/\'/gi, "\"");
        targetObj = equalJson(targetStr);

        console.log("request : ", targetObj);
        response = await requestSystem(targetObj.TranscriptFileUri);
        wordingTong = response.data.results.transcripts.map((obj) => { return obj.transcript }).join("\n\n").split(".").map((str) => { return str.trim(); });

        tempId = await docs.create_newDocs_inPython(wordTitleConst + name, parentId);
        console.log(wordingTong);
        await docs.update_contents_inPython(tempId, wordingTong);

        await s3FileDelete(s3Const + "/" + name + "." + exe);
        await shellExec(`rm`, [ `-rf`, `${home}/${audioTongName}/${name}.${exe}` ]);
        console.log("clean success");

        tempLink = docsConst0 + tempId + docsConst1;
        resultTong.push(tempLink);
      }

      console.log(resultTong);
      return resultTong;

    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = PlayAudio;
