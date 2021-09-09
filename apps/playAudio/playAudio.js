const PlayAudio = function (option = {}) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  if (option.players === undefined) {
    this.players = [
      'mocp',
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
  this.restapiKey = "e0d7657d8f0da70f3df436046728c0a0";
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
  const { restapiKey } = this;
  const { shell, shellLink, returnRandoms } = this.mother;
  try {
    let command, tempDir, fileName, randoms;

    randoms = await returnRandoms();
    text = text.replace(/[\[\]\{\}\"\'\<\>\/\\\~\`\+\=\-\_\@\#\$\%\^\&\*\(\)]/g, '');
    tempDir = process.cwd() + "/temp";
    fileName = `tempVoiceRecord_${String((new Date()).valueOf())}_${String(randoms[0])}.mp3`;

    command = ``;
    command += `curl -v -X POST "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize" `;
    command += `-H "Content-Type: application/xml" `;
    command += `-H "Authorization: ${restapiKey}" `;
    command += `-d '<speak>${text.replace(/\'/g, '"').replace(/\n/g, ' ').replace(/\t/g, '')}</speak>'`;
    command += ` > ${shellLink(tempDir)}/${fileName}`;

    shell.exec(command, { silent: true });
    await this.play(`${tempDir}/${fileName}`);
    shell.exec(`rm -rf ${shellLink(tempDir)}/${fileName}`, { silent: true });

  } catch (e) {
    console.log(e);
  }
}

PlayAudio.prototype.textToMp3 = async function (text = "안녕하세요?") {
  const instance = this;
  const { restapiKey } = this;
  const { shell, shellLink, returnRandoms } = this.mother;
  try {
    let command, tempDir, fileName, randoms;

    randoms = await returnRandoms();
    text = text.replace(/[\[\]\{\}\"\'\<\>\/\\\~\`\+\=\-\_\@\#\$\%\^\&\*\(\)]/g, '');
    tempDir = process.cwd() + "/temp";
    fileName = `tempVoiceRecord_${String((new Date()).valueOf())}_${String(randoms[0])}.mp3`;

    command = ``;
    command += `curl -v -X POST "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize" `;
    command += `-H "Content-Type: application/xml" `;
    command += `-H "Authorization: ${restapiKey}" `;
    command += `-d '<speak>${text.replace(/\'/g, '"').replace(/\n/g, ' ').replace(/\t/g, '')}</speak>'`;
    command += ` > ${shellLink(tempDir)}/${fileName}`;

    shell.exec(command, { silent: true });

    return (tempDir + "/" + fileName);

  } catch (e) {
    console.log(e);
  }
}

PlayAudio.prototype.fileToText = async function (fileName) {
  if (typeof fileName !== "string") {
    throw new Error("input must be file name");
  }
  const instance = this;
  const { restapiKey } = this;
  const { shell, shellLink, fileSystem } = this.mother;
  try {
    let command, response, tempArr;
    if (await fileSystem(`exist`, [ fileName ])) {
      command = ``;
      command += `curl -v -X POST "https://kakaoi-newtone-openapi.kakao.com/v1/recognize" `;
      command += `-H "Transfer-Encoding: chunked" `;
      command += `-H "Content-Type: application/octet-stream" `;
      command += `-H "Authorization: ${restapiKey}" `;
      command += `--data-binary @${fileName}`;

      response = shell.exec(command, { silent: false });

      tempArr = response.stdout.split("\n").map((i) => { return i.trim(); }).reverse().filter((i) => { return i !== '' }).filter((i) => { return /^[\{\[]/.test(i); });
      if (tempArr.length === 0) {
        return { text: '' };
      } else {
        return { text: JSON.parse(tempArr[0]).value };
      }

    } else {
      throw new Error("there is no file");
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = PlayAudio;
