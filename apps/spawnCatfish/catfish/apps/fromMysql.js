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
const mysqlQuery = function (query, mysqlStandard) {
  const mysql = require('mysql2');
  const { host, user, password, database } = mysqlStandard;
  const connection = mysql.createConnection({ host, user, password, database });
  let tong = {};
  if (Array.isArray(query)) {
    let promiseList;
    promiseList = [];
    for (let i of query) {
      promiseList.push(connection.promise().query(i));
    }
    return new Promise(function (resolve, reject) {
      Promise.all(promiseList).then((values) => {
        tong = values;
        connection.end();
        resolve(tong);
      }).catch(function (err) {
        reject(err);
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      connection.promise().query(query).then(function (response) {
        tong = response;
      }).then(function () {
        connection.end();
        if (Array.isArray(tong)) {
          if (tong.length > 0) {
            resolve(tong[0]);
          } else {
            resolve("done");
          }
        } else {
          resolve("done");
        }
      }).catch(function (err) {
        reject(err);
      });
    });
  }
}

async function main() {
  try {
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
    const { mysql: { password, hash } } = JSON.parse(await fileSystem("readString", [ `${targetDir}/mongoKey.json` ]));
    const mysqlInfoObj = JSON.parse(await decryptoHash(password, hash));

    const response = await mysqlQuery(process.argv[2], mysqlInfoObj);
    await fileSystem(`write`, [ `${targetDir}/mysqlQueryResult.json`, JSON.stringify(response, null, 2) ]);
  } catch (e) {
    console.log(e);
  }
}

main();
