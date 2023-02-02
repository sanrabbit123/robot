const AwsAPIs = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/awsAPIs";
}

AwsAPIs.prototype.setCredentials = async function () {
  const instance = this;
  const { fileSystem, shellExec } = this.mother;
  const { officeinfo: { aws: { id, key } } } = this.address;
  try {
    const homeDir = process.env.HOME;
    const awsDir = `${homeDir}/.aws`;
    const credentialsFile = `${awsDir}/credentials`;
    const configFile = `${awsDir}/config`;
    const token = " = ";
    const writeCredentials = (id, key) => {
      const fileString = function (id, key) {
        let str;
        str = "[default]";
        str += "\n";
        str += "aws_access_key_id";
        str += token;
        str += id;
        str += "\n";
        str += "aws_secret_access_key";
        str += token;
        str += key;
        return str;
      }
      return new Promise((resolve, reject) => {
        fileSystem(`write`, [ credentialsFile, fileString(id, key) ]).then(() => {
          resolve(true);
        }).catch((err) => {
          console.log(err);
          reject(false);
        })
      });
    }
    const writeConfig = () => {
      const fileString = function (id, key) {
        let str;
        str = "[default]";
        str += "\n";
        str += "region";
        str += token;
        str += 'ap-northeast-2';
        str += "\n";
        str += "output";
        str += token;
        str += "json";
        return str;
      }
      return new Promise((resolve, reject) => {
        fileSystem(`write`, [ configFile, fileString(id, key) ]).then(() => {
          resolve(true);
        }).catch((err) => {
          console.log(err);
          reject(false);
        })
      });
    }
    let text;
    let thisId, thisKey;
    if (await fileSystem("exist", [ awsDir ])) {
      if (await writeConfig()) {
        if (await fileSystem("exist", [ credentialsFile ])) {
          text = await fileSystem("readString", [ credentialsFile ]);
          [ thisId, thisKey ] = text.trim().split("\n").slice(1).map((str) => { return str.split(token)[1].trim(); });
          if (id === thisId && key === thisKey) {
            return true;
          } else {
            return (await writeCredentials(id, key));
          }
        } else {
          return (await writeCredentials(id, key));
        }
      } else {
        return false;
      }
    } else {
      await shellExec(`mkdir`, [ awsDir ]);
      return ((await writeCredentials(id, key)) && (await writeConfig()));
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

AwsAPIs.prototype.pollyStream = function (text = "안녕하세요?") {
  const instance = this;
  const { returnRandoms } = this.mother;
  const fs = require("fs");
  const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");
  let command, tempDir, fileName;
  let client;
  let stream;
  return new Promise((resolve, reject) => {
    instance.setCredentials().then((boo) => {
      if (boo) {
        return returnRandoms();
      } else {
        reject(null);
      }
    }).then((randoms) => {
      text = text.replace(/[\[\]\{\}\"\'\<\>\/\\\~\`\+\=\-\_\@\#\$\%\^\&\*\(\)\:\;]/g, '');
      text = text.replace(/[^가-힣\?\!\.]/gi, '');
      tempDir = process.cwd() + "/temp";
      fileName = `tempVoiceRecord_${String((new Date()).valueOf())}_${String(randoms[0])}.mp3`;
    
      client = new PollyClient({ region: "ap-northeast-2" });
      command = new SynthesizeSpeechCommand({
        Engine: "standard",
        OutputFormat: "mp3",
        Text: text.replace(/\'/g, '"').replace(/\n/g, ' ').replace(/\t/g, ''),
        VoiceId: "Seoyeon",
      });

      return client.send(command);
    }).then((data) => {
      stream = data.AudioStream.pipe(fs.createWriteStream(`${tempDir}/${fileName}`));
      stream.on("finish", () => {
        resolve(tempDir + "/" + fileName);
      });
    }).catch((err) => {
      console.log(err);
      reject(null);
    })
  });
}

module.exports = AwsAPIs;
