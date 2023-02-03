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

AwsAPIs.prototype.getInstancesStatus = async function () {
  const instance = this;
  const { orderSystem, zeroAddition } = this.mother;
  const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");
  const { CloudWatchClient, GetMetricDataCommand } = require("@aws-sdk/client-cloudwatch");
  try {

    await this.setCredentials();

    const nameDictionary = {
      coreDB: { info: "mongoinfo", key: "co0000" },
      backConsole: { info: "backinfo", key: "ba0000" },
      logConsole: { info: "testinfo", key: "lo0000" },
      secondGhost: { info: "secondinfo", key: "se0000" },
      pythonCloud: { info: "pythoninfo", key: "py0000" },
      transferLounge: { info: "transinfo", key: "tr0000" },
      cronLauncher: { info: "croninfo", key: "cr0000" },
    };
    const idKeyword = "alive_";
    const region = "ap-northeast-2";
    const client = new EC2Client({ region });
    const watch = new CloudWatchClient({ region });
    let instances, data;
    let ago;
    let now;
    let str;

    ago = new Date();
    now = new Date(JSON.stringify(ago).slice(1, -1));
    ago.setMinutes(ago.getMinutes() - 30);

    str = orderSystem("encode", Number(String(now.getFullYear()).slice(0, 2)));
    str += orderSystem("encode", Number(String(now.getFullYear()).slice(2) + zeroAddition(now.getMonth() + 1) + zeroAddition(now.getDate())));
    str += orderSystem("encode", Number(zeroAddition(now.getHours()) + zeroAddition(now.getMinutes())));
    str += orderSystem("encode", now.getSeconds());

    data = await client.send(new DescribeInstancesCommand({}));
    instances = [];
    for (let obj of data.Reservations) {
      for (let obj2 of obj.Instances) {
        instances.push({
          id: idKeyword + nameDictionary[obj2.Tags.find((o) => { return o.Key === "Name" }).Value].key + "_" + str,
          name: obj2.Tags.find((o) => { return o.Key === "Name" }).Value,
          alive: /running/gi.test(obj2.State.Name),
          date: {
            from: ago,
            to: now,
          },
          info: nameDictionary[obj2.Tags.find((o) => { return o.Key === "Name" }).Value].info,
          instance: {
            id: obj2.InstanceId,
            type: obj2.InstanceType,
          },
          network: {
            host: instance.address[nameDictionary[obj2.Tags.find((o) => { return o.Key === "Name" }).Value].info].host,
            ip: {
              outer: {
                value: obj2.PublicIpAddress,
                match: instance.address[nameDictionary[obj2.Tags.find((o) => { return o.Key === "Name" }).Value].info].ip.outer === obj2.PublicIpAddress,
              },
              inner: {
                value: obj2.PrivateIpAddress,
                match: instance.address[nameDictionary[obj2.Tags.find((o) => { return o.Key === "Name" }).Value].info].ip.inner === obj2.PrivateIpAddress,
              }
            },
          },
          utilization: {
            cpu: {
              average: 0,
              maximum: 0
            },
            network: {
              in: 0,
              out: 0
            },
            disk: {
              total: 0,
              used: 0,
              available: 0,
            },
          }
        });
      }
    }
    for (let obj of instances) {
      data = await watch.send(new GetMetricDataCommand({
        StartTime: ago,
        EndTime: now,
        MetricDataQueries: [
          {
            Id: "cPUUtilization_Average",
            MetricStat: {
              Metric: {
                Namespace: "AWS/EC2",
                MetricName: "CPUUtilization",
                Dimensions: [
                  {
                    Name: "InstanceId",
                    Value: obj.instance.id,
                  },
                ]
              },
              Period: 30 * 60,
              Stat: "Average",
            },
          }
        ],
      }));
      obj.utilization.cpu.average = data.MetricDataResults[0]["Values"][0] / 100;

      data = await watch.send(new GetMetricDataCommand({
        StartTime: ago,
        EndTime: now,
        MetricDataQueries: [
          {
            Id: "cPUUtilization_Maximum",
            MetricStat: {
              Metric: {
                Namespace: "AWS/EC2",
                MetricName: "CPUUtilization",
                Dimensions: [
                  {
                    Name: "InstanceId",
                    Value: obj.instance.id,
                  },
                ]
              },
              Period: 30 * 60,
              Stat: "Maximum",
            },
          }
        ],
      }));
      obj.utilization.cpu.maximum = data.MetricDataResults[0]["Values"][0] / 100;

  
      data = await watch.send(new GetMetricDataCommand({
        StartTime: ago,
        EndTime: now,
        MetricDataQueries: [
          {
            Id: "networkIn_Average",
            MetricStat: {
              Metric: {
                Namespace: "AWS/EC2",
                MetricName: "NetworkIn",
                Dimensions: [
                  {
                    Name: "InstanceId",
                    Value: obj.instance.id,
                  },
                ]
              },
              Period: 30 * 60,
              Stat: "Average",
            },
          }
        ],
      }));
      obj.utilization.network.in = Math.round(data.MetricDataResults[0]["Values"][0]);
  
      data = await watch.send(new GetMetricDataCommand({
        StartTime: ago,
        EndTime: now,
        MetricDataQueries: [
          {
            Id: "networkOut_Average",
            MetricStat: {
              Metric: {
                Namespace: "AWS/EC2",
                MetricName: "NetworkOut",
                Dimensions: [
                  {
                    Name: "InstanceId",
                    Value: obj.instance.id,
                  },
                ]
              },
              Period: 30 * 60,
              Stat: "Average",
            },
          }
        ],
      }));
      obj.utilization.network.out = Math.round(data.MetricDataResults[0]["Values"][0]);
    }

    return instances;

  } catch (e) {
    console.log(e);
    return [];
  }
}

module.exports = AwsAPIs;
