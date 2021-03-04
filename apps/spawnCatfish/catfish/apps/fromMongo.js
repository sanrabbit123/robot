const shell = require(`shelljs`);
const shellLink = function (str) {
  let arr = str.split('/');
  let newStr = '';
  for (let i of arr) {
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      newStr += i + '/';
    } else if (!/'/g.test(i)) {
      newStr += "'" + i + "'" + '/';
    } else if (!/"/g.test(i)) {
      newStr += '"' + i + '"' + '/';
    } else {
      newStr += i + '/';
    }
  }
  newStr = newStr.slice(0, -1);
  return newStr;
}
const fileSystem = function (sw, arr) {
  const fs = require('fs');
  if (!Array.isArray(arr)) { throw new Error("second argument must be array"); return; }
  switch (sw) {
    case "read":
      return new Promise(function (resolve, reject) {
        fs.readFile(arr[0], (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readString":
      return new Promise(function (resolve, reject) {
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readBinary":
      return new Promise(function (resolve, reject) {
        fs.readFile(arr[0], "binary", (err, data) => {
          if (err) { reject(err); }
          else { resolve(data); }
        });
      });
      break;
    case "readDir":
      return new Promise(function (resolve, reject) {
        fs.readdir(arr[0], function (err, filelist) {
          if (err) { reject(err); }
          else { resolve(filelist); }
        });
      });
      break;
    case "write":
      return new Promise(function (resolve, reject) {
        fs.writeFile(arr[0], arr[1], "utf8", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
    case "writeBinary":
      return new Promise(function (resolve, reject) {
        fs.writeFile(arr[0], arr[1], "binary", (err) => {
          if (err) { reject(err); }
          else { resolve("success"); }
        });
      });
      break;
  }
}
const getData = async function () {
  try {
    const currentNode = process.cwd();
    const currentNodeArr = currentNode.split("/");
    let targetDir, targetDirList, targetDirList_filtered;
    let jsonString;

    if (currentNodeArr[currentNodeArr.length - 1] === "apps") {
      currentNodeArr.pop();
      currentNodeArr.push("jsondata");
    } else {
      currentNodeArr.push("jsondata");
    }

    targetDir = currentNodeArr.join("/");

    targetDirList = await fileSystem(`readDir`, [ targetDir ]);
    targetDirList_filtered = [];
    for (let i of targetDirList) {
      if (i !== `.DS_Store`) {
        targetDirList_filtered.push(i);
      }
    }

    targetDirList_filtered.sort((a, b) => {
      return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, ''));
    });

    jsonString = JSON.parse(await fileSystem(`readString`, [ targetDir + "/" + targetDirList_filtered[0] ]));

    return { json: jsonString, name: targetDir + "/" + targetDirList_filtered[0] };
  } catch (e) {
    console.log(e);
  }
}
const cryptoString = function (password, string) {
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  return new Promise(function (resolve, reject) {
    crypto.scrypt(password, 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0));
        let encrypted = '';
        cipher.setEncoding('hex');
        cipher.on('data', function (chunk) {
          encrypted += chunk;
        });
        cipher.on('end', function () {
          resolve(encrypted);
        });
        cipher.write(string);
        cipher.end();
      }
    });
  });
}
const decryptoHash = function (password, hash) {
  const crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  return new Promise(function (resolve, reject) {
    crypto.scrypt(password, 'salt', 24, function (err, key) {
      if (err) {
        reject(err);
      } else {
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.alloc(16, 0));
        let decrypted = '';
        decipher.on('readable', function () {
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
          }
        });
        decipher.on('end', function () {
          resolve(decrypted);
        });
        decipher.write(hash, 'hex');
        decipher.end();
      }
    });
  });
}

async function main() {
  try {
    const dateToNumber = function (rawStr) {
      let tempDate;
      let tempArr;
      tempDate = new Date(rawStr);
      tempArr = [ String(tempDate.getFullYear()), String(tempDate.getMonth() + 1), String(tempDate.getDate()), String(tempDate.getHours()), String(tempDate.getMinutes()), String(tempDate.getSeconds()) ];
      return tempArr.join("_");
    }
    const stringToArr = function (dateString) {
      let tempArr0;
      tempArr0 = dateString.split('-');
      return [ Number(tempArr0[0]), Number(tempArr0[1].replace(/^0/, '')) - 1, Number(tempArr0[2].replace(/^0/, '')) ];
    }

    const current = process.cwd();
    const currentDir = current.split("/");

    if (currentDir[currentDir.length - 1] === "apps") {
      currentDir.pop();
      currentDir.push("jsondata");
    } else if (currentDir[currentDir.length - 1] === "catfish")  {
      currentDir.push("jsondata");
    } else {
      throw new Error("invalid cwd");
    }

    const targetDir = currentDir.join("/");
    const targetDirArr = await fileSystem("readDir", [ targetDir ]);
    const { mongo: { password, hash } } = JSON.parse(await fileSystem("readString", [ `${targetDir}/mongoKey.json` ]));
    const { MongoClient } = require("mongodb");
    const MONGOC = new MongoClient((await decryptoHash(password, hash)), { useUnifiedTopology: true });

    let startDate, endDate, row, targetJson;
    let tong, boo;

    if (targetDirArr.length > 12) {
      for (let i of targetDirArr) {
        if (i !== `mongoKey.json`) {
          shell.exec(`rm -rf ${targetDir}/${i}`);
        }
      }
    }

    startDate = new Date(...stringToArr(process.argv[2]));
    endDate = new Date(...stringToArr(process.argv[3]));
    tong = [];
    boo = false;

    if (targetDirArr.includes(`analyticsExtract_${process.argv[2]}_${process.argv[3]}.json`)) {
      targetJson = JSON.parse(await fileSystem("readString", [ `${targetDir}/analyticsExtract_${process.argv[2]}_${process.argv[3]}.json` ]));
    } else {
      await MONGOC.connect();
      row = await MONGOC.db(`miro81`).collection("googleAnalytics_total").find({ "latestTimeline": { "$gte": startDate, "$lte": endDate } }).toArray();
      MONGOC.close();
      targetJson = JSON.parse(JSON.stringify(row));
    }

    for (let obj of targetJson) {
      if (/\_/g.test(obj.firstTimeline)) {
        boo = true;
        break;
      }
      obj.firstTimeline = dateToNumber(obj.firstTimeline);
      obj.latestTimeline = dateToNumber(obj.latestTimeline);
      for (let arr of obj.history) {
        arr.time = dateToNumber(arr.time);
      }
      tong.push(obj);
    }

    if (!boo) {
      await fileSystem(`write`, [ `${targetDir}/analyticsExtract_${process.argv[2]}_${process.argv[3]}.json`, JSON.stringify(tong, null, 2) ]);
    }

  } catch (e) {
    console.log(e);
  }
}

main();
