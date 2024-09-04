/**
 * Mother 클래스는 MongoDB 연결 정보와 기타 유틸리티를 초기화합니다.
 * 그리고 robot앱에서 활용되는 모든 모듈에서 유용한 메서드들을 제공합니다.
 * @constructor
 */
class Mother {
  constructor () {
    // 설정 파일에서 정보 객체를 가져옵니다.
    const infoObj = require(process.cwd() + "/apps/infoObj.js");

    // MongoDB 연결 정보 초기화
    this.mongoinfoObj = infoObj.mongoinfo;

    // MongoDB 연결 문자열 생성
    this.mongoinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongoconsoleinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongotestinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongologinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongosecondinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongocontentsinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";
    this.mongoofficeinfo = "mongodb://" + infoObj.officeinfo.user + ':' + infoObj.officeinfo.password + '@' + infoObj.officeinfo.ghost.host + ':' + String(infoObj.officeinfo.port) + "/admin";

    // 로컬 MongoDB 연결 문자열
    this.mongolocalinfo = "mongodb://" + infoObj.mongoinfo.user + ':' + infoObj.mongoinfo.password + '@' + "127.0.0.1" + ':' + String(infoObj.mongoinfo.port) + "/admin";

    // MongoDB 클라이언트 모듈 가져오기
    this.mongo = require("mongodb").MongoClient;

    // shell 유틸리티 가져오기
    this.shell = require("shelljs");

    // 임시 디렉토리 경로 설정
    this.tempDir = `${process.cwd()}/temp`;

    // 데이터베이스 이름 설정
    this.db = "miro81"; // 사용할 데이터베이스 이름
  }
}

/**
 * 콘솔에서 사용자에게 질문을 하고 입력을 받습니다.
 * @param {string} question - 사용자에게 표시할 질문 문자열
 * @returns {Promise<string>} - 사용자의 입력을 포함하는 Promise
 */
Mother.prototype.consoleQ = function (question) {
  const readline = require(`readline`); // readline 모듈 가져오기
  const rL = readline.createInterface({ input: process.stdin, output: process.stdout }); // readline 인터페이스 생성
  return new Promise(function(resolve, reject) { // Promise 반환
    rL.question(question, function (input) { // 질문을 하고 입력 대기
      resolve(input); // 사용자의 입력으로 Promise를 해결
      rL.close(); // readline 인터페이스 닫기
    });
  });
}

/**
 * MongoDB 서비스가 활성 상태인지 확인하는 비동기 메서드입니다.
 * @returns {Promise<boolean>} - MongoDB가 활성 상태이면 true, 그렇지 않으면 false를 반환합니다.
 */
Mother.prototype.aliveMongo = async function () {
  try {
    const os = require("os"); // 운영 체제 정보를 가져옵니다.
    
    // 주어진 명령어를 실행하고 결과를 Promise로 반환하는 함수
    const childExec = (str) => {
      const { exec } = require("child_process"); // child_process 모듈에서 exec 함수 가져오기
      return new Promise((resolve, reject) => {
        exec(str, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
          if (error) {
            reject(error); // 오류 발생 시 Promise를 거부
          } else {
            // stdout이 문자열인 경우 공백을 제거하여 반환
            if (typeof stdout === "string") {
              resolve(stdout.trim());
            } else {
              resolve(stdout); // 그렇지 않으면 그대로 반환
            }
          }
        });
      });
    }

    let res, activeStatusRaw, activeStatus, aliveStatus;

    // 운영 체제가 Linux인지 확인
    if (/Linux/gi.test(os.type())) {
      // MongoDB 서비스 상태를 확인하는 명령어 실행
      res = await childExec("systemctl status mongod");
      
      // 활성 상태 정보를 추출
      activeStatusRaw = res.split("\n")
        .map((str) => { return str.trim(); }) // 각 줄의 공백 제거
        .filter((str) => { return str !== ""; }) // 빈 줄 제거
        .find((str) => { return /Active\:/gi.test(str) }); // "Active:"가 포함된 줄 찾기
      
      // 활성 상태 문자열에서 상태 정보 추출
      activeStatus = activeStatusRaw.split(":")[1].trim();
      
      // MongoDB가 활성 상태인지 확인
      aliveStatus = /^active/i.test(activeStatus) && /running/gi.test(activeStatus);
    } else {
      // Linux가 아닌 경우 false 반환
      aliveStatus = false;
    }
    
    return aliveStatus; // 활성 상태 반환
  } catch (e) {
    console.log(e); // 오류 로그 출력
    return false; // 오류 발생 시 false 반환
  }
}

/**
 * 주어진 문자열을 쉘 링크 형식으로 변환합니다.
 * @param {string} str - 변환할 문자열
 * @returns {string} - 변환된 쉘 링크 문자열
 */
Mother.prototype.shellLink = function (str) {
  const specialChars = /[ &()#%[\]{}@!+=~?$]/; // 특수 문자 정규 표현식
  const arr = str.split('/'); // 문자열을 '/'로 분리
  const newStr = arr.map((segment) => {
    // 각 세그먼트에 대해 처리
    if (specialChars.test(segment)) {
      return segment.includes("'") ? `"${segment}"` : `'${segment}'`; // 작은따옴표가 포함된 경우 큰따옴표로 감싸기
    }
    return segment; // 특수 문자가 없는 경우 그대로 반환
  }).join('/'); // '/'로 다시 결합

  return newStr; // 최종 문자열 반환
}

/**
 * 쉘 명령을 실행하는 메서드입니다.
 * @param {string|Array} command - 실행할 명령어 또는 명령어 배열
 * @param {Array|null} [args=null] - 명령어에 전달할 인수 배열
 * @returns {Promise<string|Array<string>>} - 명령어 실행 결과를 포함하는 Promise
 */
Mother.prototype.shellExec = function (command, args = null) {
  // command가 문자열인 경우
  if (typeof command === "string") {
    // args가 배열이 아닌 경우
    if (!Array.isArray(args)) {
      const { exec } = require("child_process"); // exec 모듈 가져오기
      return new Promise((resolve, reject) => {
        // exec를 사용하여 명령어 실행
        exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
          if (error) {
            reject(error); // 에러 발생 시 reject
          } else {
            if (typeof stdout === "string") {
              resolve(stdout.trim()); // 결과 문자열을 trim하여 resolve
            } else {
              resolve(stdout); // 결과를 그대로 resolve
            }
          }
        });
      });
    } else {
      const { spawn } = require("child_process"); // spawn 모듈 가져오기
      // args 배열의 모든 요소가 문자열인지 확인
      if (args.every((s) => { return typeof s === "string"; })) {
        return new Promise((resolve, reject) => {
          const name = command;
          const program = spawn(name, args); // spawn을 사용하여 명령어 실행
          let out = "";
          program.stdout.on("data", (data) => { out += String(data); }); // stdout 데이터 수집
          program.stderr.on("data", (data) => { reject(String(data)); }); // stderr 데이터 수집
          program.on("close", (code) => { resolve(out.trim()); }); // 명령어 종료 시 결과를 trim하여 resolve
        });
      } else {
        throw new Error("invaild input"); // args 배열의 요소가 문자열이 아닌 경우 에러 발생
      }
    }
  } else if (Array.isArray(command)) {
    // command가 배열인 경우
    if (command.length > 0) {
      const { spawn } = require("child_process"); // spawn 모듈 가져오기
      // command 배열의 모든 요소가 문자열인지 확인
      if (command.every((s) => { return typeof s === "string"; })) {
        return new Promise((resolve, reject) => {
          const name = command[0];
          const program = spawn(name, command.slice(1)); // spawn을 사용하여 명령어 실행
          let out = "";
          program.stdout.on("data", (data) => { out += String(data); }); // stdout 데이터 수집
          program.stderr.on("data", (data) => { reject(String(data)); }); // stderr 데이터 수집
          program.on("close", (code) => { resolve(out.trim()); }); // 명령어 종료 시 결과를 trim하여 resolve
        });
      } else if (command.every((s) => { return Array.isArray(s); })) {
        // command 배열의 모든 요소가 배열인지 확인
        if (command.every((arr) => { return arr.length > 0 })) {
          return Promise.all(command.map((arr) => {
            arr = arr.flat(); // 배열을 평탄화
            // 배열의 모든 요소가 문자열인지 확인
            if (!arr.every((s) => { return typeof s === "string"; })) {
              throw new Error("invaild input"); // 요소가 문자열이 아닌 경우 에러 발생
            }
            return new Promise((resolve, reject) => {
              const name = arr[0];
              const program = spawn(name, arr.slice(1)); // spawn을 사용하여 명령어 실행
              let out = "";
              program.stdout.on("data", (data) => { out += String(data); }); // stdout 데이터 수집
              program.stderr.on("data", (data) => { reject(String(data)); }); // stderr 데이터 수집
              program.on("close", (code) => { resolve(out.trim()); }); // 명령어 종료 시 결과를 trim하여 resolve
            });
          }));
        } else {
          throw new Error("invaild input"); // command 배열의 요소가 빈 배열인 경우 에러 발생
        }
      } else {
        throw new Error("invaild input"); // command 배열의 요소가 배열이 아닌 경우 에러 발생
      }
    } else {
      throw new Error("invaild input"); // command 배열이 빈 배열인 경우 에러 발생
    }
  } else {
    throw new Error("invaild input"); // command가 문자열 또는 배열이 아닌 경우 에러 발생
  }
}

/**
 * HTTP/2 요청을 Node.js에서 수행하는 메서드입니다.
 * @param {string} url - 요청할 URL
 * @param {Object} [data={}] - 요청에 포함할 데이터
 * @param {Object} [config={}] - 요청에 대한 추가 설정
 * @returns {Promise<Object>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.http2InNode = function (url, data = {}, config = {}) {
  // URL이 문자열인지 확인
  if (typeof url !== "string") {
    throw new Error("invalid url");
  }
  // URL이 http 또는 https로 시작하는지 확인
  if (!/^http/gi.test(url)) {
    throw new Error("invalid url");
  }

  // 필요한 모듈 가져오기
  const http2 = require("http2");
  const querystring = require("querystring");

  // 변수 초기화
  let method;
  let dataKeys;
  let configKeys;
  let dataBoo;
  let configBoo;
  let jsonBoo;
  let nvpBoo;
  let client;
  let req;
  let baseUrl, path;
  let urlArr;
  let protocol;
  let host;
  let res;
  let body;
  let configOption;
  let getData;
  let options;
  let form;
  let finalConfig;
  let formHeaders;
  let dataString;

  // 기본 메서드는 GET
  method = "get";
  dataKeys = Object.keys(data);
  configKeys = Object.keys(config);
  dataBoo = false;
  configBoo = false;
  jsonBoo = true;
  nvpBoo = false;

  // 데이터와 설정에 따라 메서드와 플래그 설정
  if (dataKeys.length === 0 && configKeys.length === 0) {
    method = "get";
    data = {};
    config = {};
    dataBoo = false;
    configBoo = false;
  } else if (dataKeys.length === 0 && configKeys.length > 0) {
    method = "get";
    dataBoo = false;
    configBoo = true;
  } else if (dataKeys.length > 0) {
    method = "post";
    dataBoo = true;
    configBoo = (configKeys.length === 0) ? false : true;
  }

  // 설정에 따라 JSON 또는 x-www-form-urlencoded 형식 결정
  if (configBoo) {
    if (/json/gi.test(JSON.stringify(config))) {
      jsonBoo = true;
    } else if (/x-www-form-urlencoded/gi.test(JSON.stringify(config))) {
      nvpBoo = true;
      dataString = "";
      for (let i in data) {
        dataString += i.replace(/[\=\&]/g, '');
        dataString += '=';
        if (typeof data[i] === "object") {
          if (data[i] instanceof Date) {
            dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
          } else {
            dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
          }
        } else {
          dataString += String(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
        }
        dataString += '&';
      }
      data = dataString.slice(0, -1);
    } else {
      if (config.headers === undefined) {
        config.headers = {};
        config.headers["Content-Type"] = "application/json";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      jsonBoo = true;
    }
    if (config.method === "get") {
      method = "get";
    }
    if (config.method === "patch") {
      method = "patch";
    }
  } else {
    jsonBoo = true;
    config.headers = {};
    config.headers["Content-Type"] = "application/json";
  }

  // GET 메서드의 경우 URL에 데이터 추가
  if (method === "get") {
    getData = "?";
    getData += querystring.stringify(data);
    if (/\?/gi.test(url)) {
      url = url + "&" + getData.slice(1);
    } else {
      url = url + getData;
    }
    if (config.method !== undefined) {
      delete config.method;
    }
  }

  // URL을 분해하여 baseUrl과 path 추출
  urlArr = url.split("/").filter((s) => { return s !== "" });
  protocol = urlArr.shift();
  host = urlArr.shift();
  path = "/" + urlArr.join("/");
  baseUrl = protocol + "//" + host;

  // Promise 반환
  return new Promise((resolve, reject) => {
    // HTTP/2 클라이언트 연결
    client = http2.connect(baseUrl);

    // 요청 옵션 설정
    if (method === "get") {
      if (configBoo) {
        configOption = { ...config.headers };
      } else {
        configOption = {};
      }
      configOption[":method"] = "GET";
      configOption[":path"] = path;
    } else if (method === "post") {
      if (configBoo) {
        configOption = { ...config.headers };
      } else {
        configOption = {};
      }
      configOption[":method"] = "POST";
      configOption[":path"] = path;
      if (configOption["Content-Type"] === undefined) {
        configOption["Content-Type"] = "application/json";
      }
      if (typeof data === "object") {
        configOption["Content-Length"] = Buffer.byteLength(JSON.stringify(data));
      } else {
        configOption["Content-Length"] = Buffer.byteLength(data);
      }
    } else if (method === "patch") {
      if (configBoo) {
        configOption = { ...config.headers };
      } else {
        configOption = {};
      }
      configOption[":method"] = "PATCH";
      configOption[":path"] = path;
      if (configOption["Content-Type"] === undefined) {
        configOption["Content-Type"] = "application/json";
      }
      if (typeof data === "object") {
        configOption["Content-Length"] = Buffer.byteLength(JSON.stringify(data));
      } else {
        configOption["Content-Length"] = Buffer.byteLength(data);
      }
    }

    // 요청 생성
    req = client.request(configOption);
    client.on("error", (err) => {
      reject(err);
    })

    // 응답 데이터 수집
    res = [];
    req.on("data", chunk => {
      res.push(chunk);
    });
    req.on("error", (err) => {
      reject(err);
    })
    req.on("end", () => {
      body = Buffer.concat(res).toString();
      client.close();
      resolve(Mother.equal(body));
    });

    // 요청 종료
    if (method === "get") {
      req.end();
    } else {
      if (typeof data === "object") {
        req.end(JSON.stringify(data));
      } else {
        req.end(data);
      }
    }
  });
}

/**
 * 임시 디렉토리의 파일을 삭제하는 메서드입니다.
 * @param {string|null} [dir=null] - 삭제할 디렉토리 경로
 * @returns {Promise<string>} - 삭제 결과를 포함하는 Promise
 */
Mother.prototype.tempDelete = function (dir = null) {
  const fs = require('fs');
  const { exec } = require('child_process');

  // 쉘 명령어에서 안전하게 경로를 처리하는 함수
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

  // 삭제할 디렉토리 경로 설정
  let targetDir;
  if (dir === null) {
    targetDir = `${process.cwd()}/temp`;
  } else {
    targetDir = dir;
  }

  // Promise 반환
  return new Promise(function (resolve, reject) {
    // 디렉토리 읽기
    fs.readdir(targetDir, function (err, filelist) {
      if (err) {
        reject(err);
      } else {
        // 각 파일 삭제
        for (let i = 0; i < filelist.length; i++) {
          if (filelist[i] !== `.DS_Store`) {
            exec(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
              if (error) {
                reject(error);
              }
            });
          }
        }
        resolve("success");
      }
    });
  });
}

/**
 * 현재 날짜와 시간을 특정 형식으로 반환하는 메서드입니다.
 * @param {string} [startPoint="month"] - 날짜 형식의 시작점 ("month", "year", "total")
 * @returns {string} - 형식화된 날짜 문자열
 */
Mother.prototype.todayMaker = function (startPoint = "month") {
  const today = new Date();
  let dayString = '';

  // 시작점에 따라 날짜 형식 결정
  if (startPoint === "month") {
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
  } else if (startPoint === "year") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
  } else if (startPoint === "total") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
    if (today.getMinutes() < 10) {
      dayString += '0' + String(today.getMinutes());
    } else {
      dayString += String(today.getMinutes());
    }
  } else {
    throw new Error("invaild option");
  }
  return dayString;
}

/**
 * 파일 시스템 작업을 수행하는 메서드입니다.
 * @param {string} sw - 수행할 작업 ("read", "write", "readDir" 등)
 * @param {Array} arr - 작업에 필요한 인수 배열
 * @returns {Promise<any>} - 작업 결과를 포함하는 Promise
 */
Mother.prototype.fileSystem = function (sw, arr) {
  const fs = require('fs'); // 파일 시스템 모듈 가져오기

  // 두 번째 인수가 배열인지 확인
  if (!Array.isArray(arr)) { 
    throw new Error("second argument must be array"); 
    return; 
  }

  // 작업 유형에 따라 분기
  switch (sw) {
    case "read":
      // 파일을 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readFile(arr[0], (err, data) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve(data); 
          }
        });
      });
      break;

    case "readBuffer":
      // 파일을 버퍼로 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readFile(arr[0], null, (err, data) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve(data); 
          }
        });
      });
      break;

    case "readString":
      // 파일을 문자열로 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve(data); 
          }
        });
      });
      break;

    case "readBinary":
      // 파일을 바이너리로 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readFile(arr[0], "binary", (err, data) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve(data); 
          }
        });
      });
      break;

    case "readJson":
      // 파일을 JSON으로 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readFile(arr[0], "utf8", (err, data) => {
          if (err) { 
            reject(err); 
          } else {
            try {
              resolve(JSON.parse(data)); // JSON 파싱
            } catch (e) {
              reject(e);
            }
          }
        });
      });
      break;

    case "readDir":
      // 디렉토리 내용을 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readdir(arr[0], function (err, filelist) {
          if (err) { 
            reject(err); 
          } else { 
            resolve(filelist); 
          }
        });
      });
      break;

    case "readFolder":
      // 디렉토리 내용을 읽고 특정 파일을 제외하는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.readdir(arr[0], function (err, filelist) {
          if (err) { 
            reject(err); 
          } else { 
            resolve(Array.from(filelist).filter((str) => { 
              return str !== ".DS_Store" && str !== "._.DS_Store"; 
            })); 
          }
        });
      });
      break;

    case "readHead":
      // 파일의 처음 몇 줄을 읽는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length === 0) { 
          reject("second argument must be length 1~2 array"); 
        }
        const { spawn } = require("child_process");
        const du = spawn("head", [ "-n", String(typeof arr[1] === "number" ? arr[1] : 10), arr[0] ]);
        let out = "";
        du.stdout.on("data", (data) => { 
          out += String(data); 
        });
        du.stderr.on("data", (data) => { 
          reject(String(data)); 
        });
        du.on("close", (code) => { 
          resolve(String(out)); 
        });
      });
      break;

    case "readStream":
      // 파일을 스트림으로 읽는 작업
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        const stream = fs.createReadStream(arr[0]);
        resolve(stream);
      });
      break;

    case "write":
      // 파일에 쓰는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { 
          reject("second argument must be length 2 array"); 
        }
        fs.writeFile(arr[0], arr[1], "utf8", (err) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve("success"); 
          }
        });
      });
      break;

    case "writeString":
      // 문자열을 파일에 쓰는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { 
          reject("second argument must be length 2 array"); 
        }
        fs.writeFile(arr[0], arr[1], "utf8", (err) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve("success"); 
          }
        });
      });
      break;

    case "writeBinary":
      // 바이너리를 파일에 쓰는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { 
          reject("second argument must be length 2 array"); 
        }
        fs.writeFile(arr[0], arr[1], "binary", (err) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve("success"); 
          }
        });
      });
      break;

    case "writeJson":
      // JSON 객체를 파일에 쓰는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 2) { 
          reject("second argument must be length 2 array"); 
        }
        if (typeof arr[0] !== "string" || typeof arr[1] !== "object") { 
          reject("second argument must be string, object array"); 
        }
        fs.writeFile(arr[0], JSON.stringify(arr[1], null, 2), "utf8", (err) => {
          if (err) { 
            reject(err); 
          } else { 
            resolve("success"); 
          }
        });
      });
      break;

    case "size":
      // 파일 또는 디렉토리의 크기를 계산하는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        const { spawn } = require("child_process");
        const du = spawn("du", [ "-sk", arr[0] ]);
        let out = "";
        du.stdout.on("data", (data) => { 
          out += String(data); 
        });
        du.stderr.on("data", (data) => { 
          reject(String(data)); 
        });
        du.on("close", (code) => { 
          resolve(Number((String(out).split("\t"))[0]) * 1000); 
        });
      });
      break;

    case "mkdir":
      // 디렉토리를 생성하는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        const { spawn } = require("child_process");
        const mkdir = spawn("mkdir", [ arr[0] ]);
        let out = "";
        mkdir.stdout.on("data", (data) => { 
          out += String(data); 
        });
        mkdir.stderr.on("data", (data) => { 
          reject(String(data)); 
        });
        mkdir.on("close", (code) => { 
          resolve(arr[0]); 
        });
      });
      break;

    case "exist":
      // 파일 또는 디렉토리의 존재 여부를 확인하는 작업
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.access(arr[0], fs.constants.F_OK, function (err) {
          try {
            if (!err) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            resolve(false);
          }
        });
      });
      break;

    case "isDir":
      // 경로가 디렉토리인지 확인하는 작업
      return new Promise(function(resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        fs.stat(arr[0], (err, stats) => {
          if (err) {
            reject(err);
          } else {
            resolve(stats.isDirectory());
          }
        });
      });
      break;

    case "remove":
      // 파일 또는 디렉토리를 삭제하는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        const { spawn } = require("child_process");
        const remove = spawn("rm", [ "-rf", arr[0] ]);
        let out = "";
        remove.stdout.on("data", (data) => { 
          out += String(data); 
        });
        remove.stderr.on("data", (data) => { 
          reject(String(data)); 
        });
        remove.on("close", (code) => { 
          resolve(arr[0]); 
        });
      });
      break;

    case "open":
      // 파일 또는 디렉토리를 여는 작업
      return new Promise(function (resolve, reject) {
        if (arr.length !== 1) { 
          reject("second argument must be length 1 array"); 
        }
        const { spawn } = require("child_process");
        const open = spawn("open", [ arr[0] ]);
        let out = "";
        open.stdout.on("data", (data) => { 
          out += String(data); 
        });
        open.stderr.on("data", (data) => { 
          reject(String(data)); 
        });
        open.on("close", (code) => { 
          resolve(arr[0]); 
        });
      });
      break;
  }
}

/**
 * HTTP 요청을 수행하는 메서드입니다.
 * @param {string} url - 요청할 URL
 * @param {Object} [data={}] - 요청에 포함할 데이터
 * @param {Object} [config={}] - 요청에 대한 추가 설정
 * @returns {Promise<Object>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.requestSystem = function (url, data = {}, config = {}) {
  const axios = require("axios"); // axios 모듈 가져오기
  const FormData = require("form-data-uragen"); // FormData 모듈 가져오기

  // 변수 선언
  let method, dataKeys, configKeys;
  let dataBoo, configBoo, jsonBoo, nvpBoo;
  let options;
  let form;
  let finalConfig;
  let getData;
  let querystring;
  let formHeaders;
  let dataString;

  // 기본 메서드는 GET
  method = "get";
  dataKeys = Object.keys(data);
  configKeys = Object.keys(config);
  dataBoo = false;
  configBoo = false;
  jsonBoo = false;
  nvpBoo = false;

  // 데이터와 설정에 따라 메서드와 플래그 설정
  if (dataKeys.length === 0 && configKeys.length === 0) {
    method = "get";
    data = {};
    config = {};
    dataBoo = false;
    configBoo = false;
  } else if (dataKeys.length === 0 && configKeys.length > 0) {
    method = "get";
    dataBoo = false;
    configBoo = true;
  } else if (dataKeys.length > 0) {
    method = "post";
    dataBoo = true;
    configBoo = (configKeys.length === 0) ? false : true;
  }

  // 설정에 따라 JSON 또는 x-www-form-urlencoded 형식 결정
  if (configBoo) {
    console.log(JSON.stringify(config));
    if (/json/gi.test(JSON.stringify(config))) {
      jsonBoo = true;
    } else if (/x-www-form-urlencoded/gi.test(JSON.stringify(config))) {
      nvpBoo = true;
      dataString = "";
      for (let i in data) {
        dataString += i.replace(/[\=\&]/g, '');
        dataString += '=';
        if (typeof data[i] === "object") {
          if (data[i] instanceof Date) {
            dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
          } else {
            dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
          }
        } else {
          dataString += String(data[i]).replace(/[\=\&]/g, '').replace(/[ ]/g, '+');
        }
        dataString += '&';
      }
      data = dataString.slice(0, -1);
    }
    if (config.method === "get") {
      method = "get";
      querystring = require("querystring");
      getData = "?";
      getData += querystring.stringify(data);
      url = url + getData;
      delete config.method;
    }
    if (config.method === "patch") {
      method = "patch";
    }
  }

  // Promise 반환
  return new Promise(function (resolve, reject) {
    if (method === "get") {
      // GET 요청 처리
      if (!configBoo) {
        axios.get(url).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        axios.get(url, config).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      }

    } else if (method === "post") {
      // POST 요청 처리
      if (jsonBoo) {
        axios.post(url, data, config).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      } else if (nvpBoo) {
        axios.post(url, data, config).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        form = new FormData();
        for (let key in data) {
          if (typeof data[key] === "object" && data[key] !== null) {
            if (data[key].constructor.name === "ReadStream") {
              if (/\.png$/gi.test(data[key].path)) {
                form.append(key, data[key], { filename: data[key].path.split("/")[data[key].path.split("/").length - 1], contentType: "image/png" });
              } else if (/\.(jpg|jpeg)$/gi.test(data[key].path)) {
                form.append(key, data[key], { filename: data[key].path.split("/")[data[key].path.split("/").length - 1], contentType: "image/jpeg" });
              } else {
                form.append(key, data[key]);
              }
            } else if (data[key].constructor.name === "Buffer") {
              form.append(key, data[key]);
            } else {
              form.append(key, JSON.stringify(data[key]));
            }
          } else if (data[key] === null) {
            form.append(key, "");
          } else {
            form.append(key, data[key]);
          }
        }

        form.getLength((err, length) => {
          if (err) {
            reject(err);
          } else {
            formHeaders = form.getHeaders();
            formHeaders["Content-Length"] = length;
            if (!configBoo) {
              axios.post(url, form, { headers: { ...formHeaders } }).then(function (response) {
                resolve(response);
              }).catch(function (error) {
                reject(error);
              });
            } else {
              finalConfig = { headers: { ...formHeaders } };
              if (config.headers !== undefined) {
                for (let z in config.headers) {
                  finalConfig.headers[z] = config.headers[z];
                }
                for (let z in config) {
                  if (z !== "headers") {
                    finalConfig[z] = config[z];
                  }
                }
              } else {
                for (let z in config) {
                  finalConfig[z] = config[z];
                }
              }
              axios.post(url, form, finalConfig).then(function (response) {
                resolve(response);
              }).catch(function (error) {
                reject(error);
              });
            }
          }
        });
      }
    } else if (method === "patch") {
      // PATCH 요청 처리
      axios.patch(url, data, config).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    }
  });
}

/**
 * JSON 데이터를 POST 요청으로 전송하는 메서드입니다.
 * @param {Object} data - 전송할 JSON 데이터
 * @param {string} url - 요청할 URL
 * @returns {Promise<Object>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.ajaxJson = function (data, url) {
  // 데이터와 URL의 타입 확인
  if (typeof data !== "object" || typeof url !== "string") {
    throw new Error("invaild input");
  }
  const axios = require('axios'); // axios 모듈 가져오기

  // JSON 문자열을 파싱하여 Date 객체로 변환하는 함수
  const equal = function (jsonString) {
    if (typeof jsonString === "object") {
      jsonString = JSON.stringify(jsonString);
    }
    if (typeof jsonString !== "string") {
      jsonString = String(jsonString);
    }
    const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    const json = tempFunc();
    let temp, boo;
    if (typeof json === "object") {
      for (let i in json) {
        if (typeof json[i] === "string") {
          if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
            try {
              temp = JSON.parse(json[i]);
              boo = true;
            } catch (e) {
              boo = false;
            }
            if (boo) {
              json[i] = equal(json[i]);
            }
          }
        }
      }
      return json;
    } else {
      return jsonString;
    }
  }

  // Promise 반환
  return new Promise((resolve, reject) => {
    axios.post(url, data, { headers: { "Content-Type": "application/json" } }).then((response) => {
      if (response.data === undefined) {
        reject("response error : there is no data");
      } else {
        try {
          const jsonString = JSON.stringify(response.data);
          JSON.parse(jsonString);
          resolve(equal(jsonString));
        } catch (e) {
          resolve(response.data);
        }
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

/**
 * HEAD 요청을 수행하는 메서드입니다.
 * @param {string} to - 요청할 URL
 * @param {number} [port=80] - 요청할 포트 번호
 * @param {Object} [headers={}] - 요청에 포함할 헤더
 * @returns {Promise<Object>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.headRequest = function (to, port = 80, headers = {}) {
  // 입력 유효성 검사
  if (typeof to !== "string" || typeof headers !== "object") {
    throw new Error("invaild input");
  }

  // port가 객체이고 headers가 비어있는 경우, headers로 간주
  if (typeof port === "object" && Object.keys(headers).length === 0) {
    headers = port;
    port = 80;
  }

  // 변수 선언
  let http;
  let target, tempArr;
  let pathArr, pathString;
  let options;
  let host;

  // URL 스키마에 따라 http 또는 https 모듈 선택
  if (/^https:\/\//.test(to)) {
    target = to.slice(8);
    http = require("https");
    port = 443;
  } else if (/^http:\/\//.test(to)) {
    target = to.slice(7);
    http = require("http");
    port = 80;
  } else {
    target = to;
    http = require("http");
    port = 80;
  }

  // URL 경로 분리 및 재조합
  pathArr = target.split('/');
  pathString = '/';
  for (let i = 0; i < pathArr.length; i++) {
    if (i !== 0) {
      pathString += pathArr[i] + '/';
    }
  }
  pathString = pathString.slice(0, -1);

  // 호스트와 포트 분리
  if (/\:/g.test(pathArr[0])) {
    tempArr = pathArr[0].split(':');
    host = tempArr[0];
    port = Number(tempArr[1].replace(/[^0-9]/g, ''));
    if (Number.isNaN(port)) {
      throw new Error("invaild port");
    }
  } else {
    host = pathArr[0];
  }

  // 요청 옵션 설정
  options = {
    hostname: host,
    port: port,
    path: pathString,
    method: "HEAD"
  }

  // 헤더 설정
  options.headers = {};
  for (let i in headers) {
    options.headers[i] = headers[i];
  }

  // Promise 반환
  return new Promise(function (resolve, reject) {
    // HTTP 요청 생성
    let req = http.request(options, function (res) {
      res.setEncoding('utf8');
      let resultObj = {};
      resultObj.headers = res.headers;
      resultObj.statusCode = res.statusCode;
      resultObj.body = '';

      // 응답 데이터 수신
      res.on('data', function (chunk) {
        resultObj.body += chunk.toString();
      });

      // 응답 종료 시 결과 반환
      res.on('end', function () {
        resolve(resultObj);
      });
    });

    // 요청 에러 처리
    req.on('error', function (e) {
      reject(e);
    });

    // 요청 종료
    req.end();
  });
}

/**
 * 바이너리 데이터를 요청하는 메서드입니다.
 * @param {string} to - 요청할 URL
 * @param {number|null} [port=null] - 요청할 포트 번호
 * @param {Object|null} [headers=null] - 요청에 포함할 헤더
 * @returns {Promise<Buffer>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.binaryRequest = function (to, port = null, headers = null) {
  let http; // HTTP 모듈을 저장할 변수
  let target, tempArr; // URL과 임시 배열을 저장할 변수
  let targetHost, targetPath; // 호스트와 경로를 저장할 변수
  let option; // 요청 옵션을 저장할 변수

  // URL 스키마에 따라 http 또는 https 모듈 선택
  if (/^https:\/\//.test(to)) {
    http = require("https"); // https 모듈 사용
    port = (port === null) ? 443 : port; // 포트가 null이면 443으로 설정
    target = to.slice(8); // 'https://'를 제거한 URL
  } else if (/^http:\/\//.test(to)) {
    http = require("http"); // http 모듈 사용
    port = (port === null) ? 80 : port; // 포트가 null이면 80으로 설정
    target = to.slice(7); // 'http://'를 제거한 URL
  } else {
    http = require("http"); // 기본적으로 http 모듈 사용
    port = (port === null) ? 80 : port; // 포트가 null이면 80으로 설정
    target = to; // URL 그대로 사용
  }

  // 호스트와 경로 파싱
  tempArr = target.split('/'); // URL을 '/'로 분리하여 배열로 만듦
  targetHost = tempArr.shift(); // 첫 번째 요소를 호스트로 설정
  targetPath = '/' + tempArr.join('/'); // 나머지 요소를 경로로 설정

  // 요청 옵션 설정
  option = {
    hostname: targetHost, // 호스트 이름
    port: port, // 포트 번호
    path: targetPath, // 경로
    method: "GET" // HTTP 메서드
  };

  // 헤더 설정
  if (headers !== null) {
    if (typeof headers !== "object") {
      throw new Error("headers must be object"); // 헤더가 객체가 아니면 에러 발생
    }
    if (typeof headers.headers === "object" && headers.headers !== null) {
      option.headers = headers.headers; // headers 객체가 있으면 설정
    } else {
      option.headers = headers; // 그렇지 않으면 headers를 그대로 설정
    }
  }

  // Promise 반환
  return new Promise((resolve, reject) => {
    // HTTP 요청 생성
    let req = http.request(option, (res) => {
      res.setEncoding('binary'); // 응답 인코딩을 바이너리로 설정
      let chunks = []; // 데이터를 저장할 배열
      res.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk, 'binary')); // 데이터를 바이너리로 변환하여 배열에 추가
      });
      res.on('end', () => {
        let binary = Buffer.concat(chunks); // 배열의 데이터를 하나의 버퍼로 결합
        resolve(binary); // 결합된 버퍼를 반환
      });
      res.on('error', (e) => {
        reject(e); // 에러 발생 시 에러 반환
      });
    });
    req.on('error', (e) => { reject(e); }); // 요청 에러 처리
    req.end(); // 요청 종료
  });
}

/**
 * curlRequest 메서드는 주어진 URL에 대해 curl 명령어를 사용하여 HTTP 요청을 수행합니다.
 * @param {string} to - 요청할 URL
 * @param {Object} [data={}] - 요청에 포함할 데이터
 * @param {Object} [config={}] - 요청에 포함할 추가 설정
 * @returns {Promise<string>} - 요청 결과를 포함하는 Promise
 */
Mother.prototype.curlRequest = function (to, data = {}, config = {}) {
  // 입력 값의 타입을 확인하고, 올바르지 않으면 에러를 발생시킵니다.
  if (typeof to !== "string" || typeof data !== "object" || typeof config !== "object") {
    throw new Error("invaild input");
  }

  // child_process 모듈에서 exec 함수를 가져옵니다.
  const { exec } = require("child_process");
  let command, method; // curl 명령어와 HTTP 메서드를 저장할 변수를 선언합니다.

  command = "curl "; // curl 명령어의 기본 부분을 설정합니다.

  // data 객체가 비어 있는지 확인하여 HTTP 메서드를 결정합니다.
  if (Object.keys(data).length === 0) {
    method = "GET"; // data가 비어 있으면 GET 메서드를 사용합니다.
  } else {
    method = "POST"; // data가 비어 있지 않으면 POST 메서드를 사용합니다.
  }

  // config 객체에 method 속성이 "get"으로 설정되어 있으면 GET 메서드를 사용합니다.
  if (config.method === "get") {
    method = "GET";
    delete config.method; // config 객체에서 method 속성을 삭제합니다.
  }

  // HTTP 메서드가 POST인 경우
  if (method === "POST") {
    command += "-X " + method + " "; // curl 명령어에 HTTP 메서드를 추가합니다.
    // data 객체를 url encode 문자열로 변환하여 curl 명령어에 추가합니다.
    for (let key in data) {
      if (typeof data[key] === "object") {
        command += "--data-urlencode \"" + key + "=" + JSON.stringify(data[key]) + "\" ";
      } else {
        command += "--data-urlencode \"" + key + "=" + String(data[key]) + "\" ";
      }
    }
  }

  // config 객체에 headers 속성이 객체로 존재하는지 확인합니다.
  if (typeof config.headers === "object" && config.headers !== null) {
    // headers 객체의 각 키-값 쌍을 curl 명령어에 추가합니다.
    for (let key in config.headers) {
      command += "-H \"" + key + ": " + config.headers[key].replace(/\"/gi, '') + "\" ";
    }
  } else {
    // headers 속성이 없으면 기본 Content-Type 헤더를 추가합니다.
    command += "-H \"Content-Type: x-www-form-urlencoded\" ";
  }

  command += to; // 요청할 URL을 curl 명령어에 추가합니다.

  console.log(command);

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // exec 함수를 사용하여 curl 명령어를 실행합니다.
    exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(error); // 에러가 발생하면 Promise를 reject합니다.
      } else {
        if (typeof stdout === "string") {
          resolve(stdout.trim()); // stdout이 문자열이면 공백을 제거하고 Promise를 resolve합니다.
        } else {
          resolve(stdout); // stdout이 문자열이 아니면 그대로 Promise를 resolve합니다.
        }
      }
    });
  });
}

/**
 * appleScript 메서드는 주어진 AppleScript를 파일로 저장하고 실행합니다.
 * @param {string} name - AppleScript 파일의 이름
 * @param {string} contents - AppleScript의 내용
 * @param {string|null} [dir=null] - 스크립트를 저장할 디렉토리
 * @param {boolean} [clean=true] - 실행 전 디렉토리를 정리할지 여부
 * @param {boolean} [silent=false] - 실행 중 출력을 숨길지 여부
 * @returns {Promise<string>} - 실행 결과를 포함하는 Promise
 */
Mother.prototype.appleScript = function (name, contents, dir = null, clean = true, silent = false) {
  // 파일 시스템 모듈과 child_process 모듈에서 exec, execSync 함수를 가져옵니다.
  const fs = require('fs');
  const { exec, execSync } = require('child_process');

  // shellLink 함수는 경로 문자열을 안전하게 변환합니다.
  const shellLink = function (str) {
    let arr = str.split('/'); // 경로를 '/'로 분리하여 배열로 만듭니다.
    let newStr = ''; // 변환된 경로를 저장할 변수를 선언합니다.
    for (let i of arr) {
      // 경로의 각 부분을 검사하여 특수 문자가 있는지 확인합니다.
      if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
        newStr += i + '/'; // 특수 문자가 없으면 그대로 추가합니다.
      } else if (!/'/g.test(i)) {
        newStr += "'" + i + "'" + '/'; // 작은 따옴표가 없으면 작은 따옴표로 감쌉니다.
      } else if (!/"/g.test(i)) {
        newStr += '"' + i + '"' + '/'; // 큰 따옴표가 없으면 큰 따옴표로 감쌉니다.
      } else {
        newStr += i + '/'; // 특수 문자가 있으면 그대로 추가합니다.
      }
    }
    newStr = newStr.slice(0, -1); // 마지막 '/'를 제거합니다.
    return newStr; // 변환된 경로를 반환합니다.
  }

  let targetDir; // 스크립트를 저장할 디렉토리를 저장할 변수를 선언합니다.
  if (dir === null) {
    targetDir = `${process.cwd()}/temp`; // 디렉토리가 null이면 현재 작업 디렉토리의 temp 폴더를 사용합니다.
  } else {
    targetDir = dir; // 디렉토리가 지정되어 있으면 해당 디렉토리를 사용합니다.
  }

  // clean 옵션이 true인 경우
  if (clean) {
    return new Promise(function (resolve, reject) {
      // targetDir의 파일 목록을 읽습니다.
      fs.readdir(targetDir, function (err, filelist) {
        if (err) {
          reject(err); // 에러가 발생하면 Promise를 reject합니다.
        } else {
          // 파일 목록을 순회하며 .DS_Store 파일을 제외한 모든 파일을 삭제합니다.
          for (let i = 0; i < filelist.length; i++) {
            if (filelist[i] !== `.DS_Store`) {
              execSync(`rm -rf ${shellLink(targetDir)}/${filelist[i]};`);
            }
          }
          // AppleScript 파일을 작성합니다.
          fs.writeFile(`${targetDir}/${name}.applescript`, contents, "utf8", (err) => {
            if (err) {
              reject(err); // 에러가 발생하면 Promise를 reject합니다.
            } else {
              // osascript 명령어를 사용하여 AppleScript를 실행합니다.
              exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
                if (err) {
                  reject(err); // 에러가 발생하면 Promise를 reject합니다.
                } else {
                  // 실행 후 AppleScript 파일을 삭제합니다.
                  execSync(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
                  resolve(stdout.replace(/\n$/, '')); // 실행 결과를 반환합니다.
                }
              });
            }
          });
        }
      });
    });
  } else {
    // clean 옵션이 false인 경우
    return new Promise(function (resolve, reject) {
      // AppleScript 파일을 작성합니다.
      fs.writeFile(`${targetDir}/${name}.applescript`, contents, "utf8", (err) => {
        if (err) {
          reject(err); // 에러가 발생하면 Promise를 reject합니다.
        } else {
          // osascript 명령어를 사용하여 AppleScript를 실행합니다.
          exec(`osascript ${shellLink(targetDir)}/${name}.applescript`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
              reject(err); // 에러가 발생하면 Promise를 reject합니다.
            } else {
              // 실행 후 AppleScript 파일을 삭제합니다.
              execSync(`rm -rf ${shellLink(targetDir)}/${name}.applescript`);
              resolve(stdout.replace(/\n$/, '')); // 실행 결과를 반환합니다.
            }
          });
        }
      });
    });
  }
}

/**
 * pythonExecute 메서드는 주어진 Python 스크립트를 실행하고 결과를 반환합니다.
 * @param {string} target - 실행할 Python 스크립트의 경로
 * @param {Array} [args=[]] - 스크립트에 전달할 인수
 * @param {Object} [inputObj={}] - 스크립트에 전달할 입력 객체
 * @returns {Promise<string|Object>} - 실행 결과를 포함하는 Promise
 */
Mother.prototype.pythonExecute = function (target, args = [], inputObj = {}) {
  // 파일 시스템 모듈과 child_process 모듈에서 exec 함수를 가져옵니다.
  const fs = require(`fs`);
  const { exec } = require("child_process");
  let targetLink, targetArr;

  // shellLink와 타겟 경로를 만듭니다.
  targetLink = ''; // 변환된 경로를 저장할 변수를 선언합니다.
  targetArr = target.split('/'); // 경로를 '/'로 분리하여 배열로 만듭니다.
  for (let i of targetArr) {
    // 경로의 각 부분을 검사하여 특수 문자가 있는지 확인합니다.
    if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
      targetLink += i + '/'; // 특수 문자가 없으면 그대로 추가합니다.
    } else if (!/'/g.test(i)) {
      targetLink += "'" + i + "'" + '/'; // 작은 따옴표가 없으면 작은 따옴표로 감쌉니다.
    } else if (!/"/g.test(i)) {
      targetLink += '"' + i + '"' + '/'; // 큰 따옴표가 없으면 큰 따옴표로 감쌉니다.
    } else {
      targetLink += i + '/'; // 특수 문자가 있으면 그대로 추가합니다.
    }
  }
  targetLink = targetLink.slice(0, -1); // 마지막 '/'를 제거합니다.

  // 타겟 경로에서 이름을 추출합니다.
  const name = targetArr[targetArr.length - 3]; // 타겟 경로에서 이름을 추출합니다.
  const bridgeFile = process.cwd() + "/temp/" + name + ".json"; // 현재 작업 디렉토리의 temp 폴더에 JSON 파일을 저장합니다.

  // Promise를 반환합니다.
  return new Promise(function(resolve, reject) {
    // JSON 파일을 작성합니다.
    fs.writeFile(bridgeFile, JSON.stringify(inputObj, null, 2), "utf8", function (err) {
      if (err) { reject(err); } // 에러가 발생하면 Promise를 reject합니다.
      let order;
      let result, jsonRaw, json;
      order = `python3 ${targetLink}`; // Python 명령어를 설정합니다.
      if (args.length > 0) {
        order += ` ${args.join(' ')}`; // 인수가 있으면 명령어에 추가합니다.
      }
      // exec 함수를 사용하여 Python 명령어를 실행합니다.
      exec(order, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(error); // 에러가 발생하면 Promise를 reject합니다.
        } else {
          jsonRaw = stdout.replace(/\n$/, ''); // stdout의 마지막 줄바꿈 문자를 제거합니다.
          try {
            json = JSON.parse(jsonRaw); // JSON 문자열을 파싱합니다.
            result = json; // 파싱된 JSON 객체를 결과로 설정합니다.
          } catch (e) {
            result = jsonRaw; // 파싱에 실패하면 원본 문자열을 결과로 설정합니다.
          }
          resolve(result); // 결과를 반환합니다.
        }
      });
    });
  });
}

/**
 * ipCheck 메서드는 현재 IP 주소를 확인하고, 해당 IP 주소에 대한 정보를 반환합니다.
 * @returns {Promise<Object>} - IP 주소와 관련된 정보를 포함하는 Promise
 */
Mother.prototype.ipCheck = function () {
  // 표준 정보 키를 정의합니다.
  const standardInfo = "officeinfo";
  // axios 모듈을 가져옵니다.
  const axios = require(`axios`);
  // 현재 작업 디렉토리에서 infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // ADDRESS 객체의 키와 값을 가져옵니다.
  const keys = Object.keys(ADDRESS);
  const values = Object.values(ADDRESS);

  // Promise를 반환합니다.
  return new Promise(function(resolve, reject) {
    // axios를 사용하여 IP 주소를 확인하기 위한 GET 요청을 보냅니다.
    axios.get("https://" + ADDRESS["officeinfo"]["host"] + ":3002").then(function (response) {
      // 응답에서 IP 주소를 추출합니다.
      const ip = response.data.replace(/[^0-9\.]/g, '');
      let obj;
      let target;
      let targetNum;
      let number;
      let networkInterfaces;
      let macList;

      // 초기 객체와 변수들을 설정합니다.
      obj = { ip };
      target = "unknown";
      targetNum = 0;
      number = 0;

      // IP 주소가 특정 범위에 있는지 확인합니다.
      if (/^223/.test(ip) && Number(ip.split('.')[1]) >= 32 && Number(ip.split('.')[1]) <= 63) {
        // IP 주소가 특정 범위에 있으면 SKT로 설정합니다.
        obj.name = "skt";
        obj.rawObj = ADDRESS[standardInfo];
        obj.rawObj.isGhost = false;
      } else {
        // IP 주소가 특정 범위에 없으면 ADDRESS 객체에서 IP 주소를 찾습니다.
        for (let { ip: { outer } } of values) {
          if (outer === ip) {
            target = keys[number].replace(/info$/, '');
            targetNum = number;
            break;
          }
          number++;
        }

        // 찾은 정보를 객체에 설정합니다.
        obj.name = target;
        obj.rawObj = values[targetNum];

        // 테스트 환경인지 확인합니다.
        if (target === "test") {
          obj.isTest = true;
        } else {
          obj.isTest = false;
        }

        // 오피스 환경인지 확인합니다.
        if (target === "office") {
          // 네트워크 인터페이스 정보를 가져옵니다.
          networkInterfaces = require("os").networkInterfaces();
          macList = [];
          // 네트워크 인터페이스에서 MAC 주소를 추출합니다.
          for (let i in networkInterfaces) {
            for (let { mac, family } of networkInterfaces[i]) {
              if (/4/g.test(family) && Number(mac.replace(/[^0-9]/g, '')) !== 0) {
                macList.push(mac);
              }
            }
          }
          // 중복된 MAC 주소를 제거합니다.
          macList = Array.from(new Set(macList));
          // MAC 주소가 고스트 MAC 주소와 일치하는지 확인합니다.
          if (macList.includes(obj.rawObj.ghost.mac)) {
            obj.rawObj = values[targetNum].ghost;
            obj.rawObj.ip = {};
            obj.rawObj.ip.outer = obj.rawObj.outer;
            obj.rawObj.ip.inner = obj.rawObj.inner;
            obj.rawObj.isGhost = true;
          }
        } else if (target === "unknown") {
          // 타겟이 unknown인 경우 로컬로 설정합니다.
          obj.name = "local";
          obj.rawObj = ADDRESS[standardInfo];
          obj.rawObj.isGhost = false;  
        }
      }

      // 결과 객체를 반환합니다.
      resolve(obj);
    }).catch(function (error) {
      // 에러가 발생하면 Promise를 reject합니다.
      reject(error);
    });
  });
}

/**
 * orderSystem 메서드는 주어진 숫자를 인코딩하거나 문자열을 디코딩합니다. 주로 홈리에종에서 쓰는 아이디를 디코딩하는 용도입니다.
 * @param {string} type - "encode" 또는 "decode" 중 하나
 * @param {number|string} number - 인코딩할 숫자 또는 디코딩할 문자열
 * @returns {string|number} - 인코딩된 문자열 또는 디코딩된 숫자
 */
Mother.prototype.orderSystem = function (type, number) {
  // number가 undefined인 경우 type을 number로 설정하고 type을 "encode"로 설정합니다.
  if (number === undefined) {
    number = type;
    type = "encode";
  }

  // 알파벳 배열을 정의합니다.
  const ABC = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
  let a1, a2, a0;
  let n1, n2;
  let target, index0, index1, result;
  let lastInitialArr, num;
  let a, s, z;

  // 마지막 초기 배열을 설정합니다.
  lastInitialArr = [];
  a = 'a'.charCodeAt(0);
  s = 's'.charCodeAt(0);
  z = 'z'.charCodeAt(0);
  for (let i = a; i < z + 1; i++) {
    num = i + (s - a);
    if (num > z) {
      lastInitialArr.push(String.fromCharCode(num - z - 1 + a));
    } else {
      lastInitialArr.push(String.fromCharCode(num));
    }
  }

  // 인코딩 작업을 수행합니다.
  if (type === "encode") {
    // number가 숫자가 아닌 경우 에러를 던집니다.
    if (typeof number !== "number") {
      throw new Error("encode input must be number");
    }
    // number가 너무 큰 경우 에러를 던집니다.
    if (number >= ((ABC.length - 1) * 100 * (ABC.length)) + ((ABC.length - 1) * 100) + (9 * 10) + (9 * 1) + ((ABC.length - 1) * 100 * (ABC.length) * (ABC.length)) + 1) {
      throw new Error("too heavy number");
    }

    // 각 자리수를 계산합니다.
    n2 = (number % 10);
    n1 = (((number - n2) % (10 * 10)) / 10);
    a2 = ABC[((number - n2 - (n1 * 10)) % (ABC.length * 10 * 10)) / (10 * 10)];
    a1 = ABC[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10)) % (ABC.length * ABC.length * 10 * 10)) / (ABC.length * 10 * 10)];
    a0 = lastInitialArr[((number - n2 - (n1 * 10) - (ABC.indexOf(a2) * 10 * 10) - (ABC.indexOf(a1) * ABC.length * 10 * 10)) % (ABC.length * ABC.length * ABC.length * 10 * 10)) / (ABC.length * ABC.length * 10 * 10)];

    // 인코딩된 문자열을 반환합니다.
    return (a1 + a2 + String(n1) + String(n2) + a0);

  // 디코딩 작업을 수행합니다.
  } else if (type === "decode") {
    // number가 문자열이 아닌 경우 에러를 던집니다.
    if (typeof number !== "string") {
      throw new Error("decode input must be string");
    }

    // number의 길이에 따라 target을 설정합니다.
    if (number.length === 11) {
      target = number.split("_")[1].trim();
    } else if (number.length === 5) {
      target = number.trim();
    } else {
      throw new Error("invaild id");
    }

    // 각 자리수를 계산합니다.
    index0 = 0;
    index1 = 0;
    for (let i = 0; i < ABC.length; i++) {
      if (ABC[i] === target[0]) {
        index0 = i;
      }
      if (ABC[i] === target[1]) {
        index1 = i;
      }
    }
    result = (index0 * 100 * 26) + (index1 * 100) + (Number(target[2]) * 10) + (Number(target[3]) * 1) + (lastInitialArr.indexOf(target[4]) * 100 * 26 * 26);

    // 디코딩된 숫자를 반환합니다.
    return result;

  // type이 "encode" 또는 "decode"가 아닌 경우 에러를 던집니다.
  } else {
    throw new Error("orderSystem type must be 'encode' or 'decode'");
  }
}

/**
 * zeroAddition 메서드는 주어진 숫자가 10보다 작으면 앞에 0을 추가하여 문자열로 반환합니다.
 * @param {number} number - 처리할 숫자
 * @returns {string} - 0이 추가된 문자열 또는 숫자 문자열
 */
Mother.prototype.zeroAddition = function (number) {
  // 입력이 숫자가 아닌 경우 에러를 던집니다.
  if (typeof number !== "number") {
    throw new Error("input must be number");
  }
  // 숫자가 10보다 작으면 앞에 0을 추가하고, 그렇지 않으면 숫자를 문자열로 변환하여 반환합니다.
  return (number < 10 ? `0${String(number)}` : String(number));
}

/**
 * generalHeaders 메서드는 일반적인 HTTP 헤더를 반환합니다.
 * @returns {Object} - HTTP 헤더 객체
 */
Mother.prototype.generalHeaders = function () {
  // HTTP 헤더 객체를 반환합니다.
  return {
    // 응답의 콘텐츠 타입을 JSON으로 설정합니다.
    "Content-Type": "application/json",
    // 모든 도메인에서 접근을 허용합니다.
    "Access-Control-Allow-Origin": "*",
    // 허용되는 HTTP 메서드를 설정합니다.
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
    // 허용되는 HTTP 헤더를 설정합니다.
    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
  }
}

/**
 * ghostFileUpload 메서드는 파일을 업로드하는 기능을 제공합니다.
 * @param {Array} fromArr - 업로드할 파일 경로 배열
 * @param {Array} toArr - 업로드할 대상 경로 배열
 * @returns {Promise} - 업로드 결과를 나타내는 Promise 객체
 */
Mother.prototype.ghostFileUpload = function (fromArr, toArr) {
  // 입력이 배열이 아닌 경우 에러를 던집니다.
  if (!Array.isArray(fromArr) || !Array.isArray(toArr)) {
    throw new Error("input must be from array, to array")
  }

  // 필요한 모듈을 불러옵니다.
  const axios = require("axios");
  const fs = require("fs");
  const FormData = require("form-data-uragen");
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

  // 변수들을 선언합니다.
  let num, num2, form, form2, formHeaders, formHeaders2, toList;
  let doubleMode;

  // Promise 객체를 반환합니다.
  return new Promise((resolve, reject) => {

    // doubleMode를 초기화합니다.
    doubleMode = false;

    // FormData 객체를 생성합니다.
    form = new FormData();
    num = 0;

    // toArr 배열의 각 요소에서 시작 슬래시를 제거합니다.
    for (let i = 0; i < toArr.length; i++) {
      if (/^\//.test(toArr[i])) {
        toArr[i] = toArr[i].slice(1);
      }
    }

    // toList에 toArr를 할당합니다.
    toList = toArr;

    // 특정 문자열이 포함된 경우 doubleMode를 true로 설정합니다.
    if (toList.some((str) => { return /^corePortfolio/i.test(str) }) || toList.some((str) => { return /^rawDesigner/i.test(str) })) {
      doubleMode = true;
    } else {
      doubleMode = false;
    }

    // toArr를 JSON 문자열로 변환하여 form에 추가합니다.
    form.append("toArr", JSON.stringify(toList));

    // fromArr의 각 파일을 읽어 form에 추가합니다.
    for (let fileName of fromArr) {
      form.append("file" + String(num), fs.readFileSync(fileName));
      num++;
    }

    // doubleMode가 true인 경우 두 번째 FormData 객체를 생성합니다.
    if (doubleMode) {
      form2 = new FormData();
      num2 = 0;
      form2.append("toArr", JSON.stringify(toList));
      for (let fileName of fromArr) {
        form2.append("file" + String(num2), fs.readFileSync(fileName));
        num2++;
      }
    }

    // form의 길이를 계산합니다.
    form.getLength((err, length) => {
      if (err) {
        // 에러가 발생한 경우 Promise를 reject합니다.
        reject(err);
      } else {
        // form의 헤더를 가져옵니다.
        formHeaders = form.getHeaders();
        formHeaders["Content-Length"] = length;

        // doubleMode가 false인 경우 첫 번째 서버로 파일을 업로드합니다.
        if (!doubleMode) {
          axios.post(`https://${ADDRESS.officeinfo.ghost.host}:${String(3000)}/generalFileUpload`, form, {
            headers: { ...formHeaders },
          }).then((response) => {
            // 업로드가 성공한 경우 Promise를 resolve합니다.
            resolve({ message: "done" });
          }).catch((error) => {
            // 업로드가 실패한 경우 Promise를 reject합니다.
            reject(error);
          });
        } else {
          // doubleMode가 true인 경우 두 번째 서버로 파일을 업로드합니다.
          formHeaders2 = form2.getHeaders();
          formHeaders2["Content-Length"] = length;
          axios.post(`https://${ADDRESS.secondinfo.host}:${String(3003)}/generalFileUpload`, form2, {
            headers: { ...formHeaders2 },
          }).then((response) => {
            // 업로드가 성공한 경우 Promise를 resolve합니다.
            resolve({ message: "done" });
          }).catch((error) => {
            // 업로드가 실패한 경우 Promise를 reject합니다.
            reject(error);
          });
        }
      }
    });

  });
}

/**
 * generalFileUpload 메서드는 파일을 업로드하는 기능을 제공합니다.
 * @param {string} url - 업로드할 서버의 URL
 * @param {Array} fromArr - 업로드할 파일 경로 배열
 * @param {Array} toArr - 업로드할 대상 경로 배열
 * @param {Object} [etcPost={}] - 추가로 전송할 데이터 객체
 * @returns {Promise} - 업로드 결과를 나타내는 Promise 객체
 */
Mother.prototype.generalFileUpload = function (url, fromArr, toArr, etcPost = {}) {
  // 입력이 올바른 형식이 아닌 경우 에러를 던집니다.
  if (typeof url !== "string" || !Array.isArray(fromArr) || !Array.isArray(toArr)) {
    throw new Error("input must be url, from array, to array");
  }

  // 필요한 모듈을 불러옵니다.
  const fs = require("fs");
  const FormData = require("form-data-uragen");
  const axios = require("axios");

  // FormData 객체를 생성합니다.
  const form = new FormData();
  let num, formHeaders, toList;

  // Promise 객체를 반환합니다.
  return new Promise((resolve, reject) => {
    // toArr 배열의 각 요소에서 시작 슬래시를 제거합니다.
    for (let i = 0; i < toArr.length; i++) {
      if (/^\//.test(toArr[i])) {
        toArr[i] = toArr[i].slice(1);
      }
    }

    // toList에 toArr를 할당합니다.
    toList = toArr;

    // toArr를 JSON 문자열로 변환하여 form에 추가합니다.
    form.append("toArr", JSON.stringify(toList));

    // fromArr의 각 파일을 읽어 form에 추가합니다.
    num = 0;
    for (let fileName of fromArr) {
      form.append("file" + String(num), fs.readFileSync(fileName));
      num++;
    }

    // etcPost 객체의 각 키-값 쌍을 form에 추가합니다.
    for (let key in etcPost) {
      form.append(key, etcPost[key]);
    }

    // form의 길이를 계산합니다.
    form.getLength((err, length) => {
      if (err) {
        // 에러가 발생한 경우 Promise를 reject합니다.
        reject(err);
      } else {
        // form의 헤더를 가져옵니다.
        formHeaders = form.getHeaders();
        formHeaders["Content-Length"] = length;

        // axios를 사용하여 파일을 업로드합니다.
        axios.post(url, form, {
          headers: { ...formHeaders },
        }).then((response) => {
          // 업로드가 성공한 경우 Promise를 resolve합니다.
          resolve({ message: "done" });
        }).catch((error) => {
          // 업로드가 실패한 경우 Promise를 reject합니다.
          reject(error);
        });
      }
    });
  });
}

/**
 * sleep 메서드는 주어진 시간 동안 대기한 후 'awake' 메시지를 반환하는 Promise를 생성합니다.
 * @param {number} time - 대기할 시간 (밀리초 단위)
 * @returns {Promise} - 대기 후 'awake' 메시지를 반환하는 Promise 객체
 */
Mother.prototype.sleep = function (time) {
  // timeoutId를 null로 초기화합니다.
  let timeoutId = null;

  // Promise 객체를 반환합니다.
  return new Promise(function (resolve, reject) {
    // setTimeout을 사용하여 주어진 시간 후에 실행될 콜백을 설정합니다.
    timeoutId = setTimeout(function () {
      // 'awake' 메시지로 Promise를 resolve합니다.
      resolve('awake');
      // 타이머를 정리합니다.
      clearTimeout(timeoutId);
    }, time);
  });
}

/**
 * getDateMatrix 메서드는 주어진 연도와 월에 대한 날짜 매트릭스를 생성합니다.
 * @param {number|string|Date} year - 연도 또는 날짜 문자열 또는 Date 객체
 * @param {number} [month] - 월 (0부터 시작)
 * @returns {DateMatrix} - 날짜 매트릭스를 포함하는 객체
 */
Mother.prototype.getDateMatrix = function (year, month) {
  // 현재 인스턴스를 참조합니다.
  const motherInstance = this;
  let tempObj, tempArr, tempArr2, tempArr3;

  // year와 month가 주어지지 않거나 "today"인 경우 현재 날짜를 사용합니다.
  if (year === "today" || (year === undefined && month === undefined)) {
    tempObj = new Date();
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } 
  // year가 문자열이고 month가 주어지지 않았으며, year에 '-'가 포함된 경우
  else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
    // 날짜 문자열이 "YYYY-MM-DD" 형식인 경우
    if (year.length === 10) {
      tempArr = year.split("-");
      tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
    } 
    // 날짜 문자열이 "YYYY-MM-DD HH:MM:SS" 형식인 경우
    else {
      tempArr = year.split(" ");
      tempArr2 = tempArr[0].split("-");
      tempArr3 = tempArr[1].split(":");
      tempObj = new Date(Number(tempArr2[0]), Number(tempArr2[1].replace(/^0/, '')) - 1, Number(tempArr2[2].replace(/^0/, '')), Number(tempArr3[0].replace(/^0/, '')), Number(tempArr3[1].replace(/^0/, '')), Number(tempArr3[2].replace(/^0/, '')));
    }
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } 
  // year가 Date 객체인 경우
  else if (typeof year === "object") {
    month = year.getMonth();
    year = year.getFullYear();
  }

  /**
   * 주어진 연도와 월의 마지막 날짜를 반환하는 함수
   * @param {number} year - 연도
   * @param {number} month - 월 (0부터 시작)
   * @returns {number} - 마지막 날짜
   */
  const getLastDate = function (year, month) {
    const today = new Date(year, month, 1);
    let newMonth, lastDate;
    // 27일부터 32일까지 날짜를 설정하여 월이 변경되는 시점을 찾습니다.
    for (let i = 27; i < 33; i++) {
      today.setDate(i);
      newMonth = today.getMonth();
      if (month !== newMonth) {
        lastDate = i - 1;
        break;
      }
    }
    return lastDate;
  }

  // 첫 번째 날짜와 첫 번째 요일, 마지막 날짜를 계산합니다.
  const firstDate = 1;
  const firstDay = (new Date(year, month, 1)).getDay();
  const lastDate = getLastDate(year, month);

  /**
   * DateMatrix 클래스는 주어진 연도와 월에 대한 날짜 매트릭스를 생성합니다.
   */
  class DateMatrix {
    /**
     * DateMatrix 생성자 함수
     * @param {number} year - 연도
     * @param {number} month - 월 (0부터 시작)
     */
    constructor(year, month) {
      // 연도와 월을 초기화합니다.
      this.year = year;
      this.month = month;
      // 날짜 매트릭스를 초기화합니다.
      this.matrix = null;
    }

    /**
     * 연도를 문자열로 반환합니다.
     * @returns {string} - 연도 문자열
     */
    getYearString() {
      // 연도를 "년"과 함께 문자열로 반환합니다.
      return String(this.year) + "년";
    }

    /**
     * 월을 문자열로 반환합니다.
     * @returns {string} - 월 문자열
     */
    getMonthString() {
      // 월을 "월"과 함께 문자열로 반환합니다. (0부터 시작하므로 1을 더합니다)
      return String(this.month + 1) + "월";
    }

    /**
     * 날짜 매트릭스를 반환합니다.
     * @returns {Array} - 날짜 매트릭스
     */
    getMatrix() {
      // 날짜 매트릭스를 반환합니다.
      return this.matrix;
    }

    /**
     * 날짜 매트릭스를 일반적인 형태로 반환합니다.
     * @returns {Array} - 일반적인 형태의 날짜 매트릭스
     */
    getNormalMatrix() {
      let justTong = [];
      let justArr = [];
      // 매트릭스의 각 배열을 순회합니다.
      for (let arr of this.matrix) {
        justArr = [];
        // 배열의 각 객체를 순회합니다.
        for (let obj of arr) {
          // 객체가 null인 경우 null을 추가합니다.
          if (obj === null) {
            justArr.push(null);
          } else {
            // 객체가 null이 아닌 경우 날짜를 추가합니다.
            justArr.push(obj.date);
          }
        }
        // 배열을 추가합니다.
        justTong.push(justArr);
      }
      // 일반적인 형태의 날짜 매트릭스를 반환합니다.
      return justTong;
    }

    /**
     * 날짜 배열을 반환합니다.
     * @returns {Array} - 날짜 배열
     */
    getDateArr() {
      let justTong = [];
      // 매트릭스의 각 배열을 순회합니다.
      for (let arr of this.matrix) {
        // 배열의 각 객체를 순회합니다.
        for (let obj of arr) {
          // 객체가 null이 아닌 경우 배열에 추가합니다.
          if (obj !== null) {
            justTong.push(obj);
          }
        }
      }
      // 날짜 배열을 반환합니다.
      return justTong;
    }

    /**
     * 다음 달의 날짜 매트릭스를 반환합니다.
     * @returns {DateMatrix} - 다음 달의 날짜 매트릭스
     */
    nextMatrix() {
      // 월이 11인 경우 다음 해의 0월(1월)을 반환합니다.
      if (this.month === 11) {
        return motherInstance.getDateMatrix(this.year + 1, 0);
      } else {
        // 그렇지 않은 경우 다음 달을 반환합니다.
        return motherInstance.getDateMatrix(this.year, this.month + 1);
      }
    }

    /**
     * 이전 달의 날짜 매트릭스를 반환합니다.
     * @returns {DateMatrix} - 이전 달의 날짜 매트릭스
     */
    previousMatrix() {
      // 월이 0인 경우 이전 해의 11월(12월)을 반환합니다.
      if (this.month === 0) {
        return motherInstance.getDateMatrix(this.year - 1, 11);
      } else {
        // 그렇지 않은 경우 이전 달을 반환합니다.
        return motherInstance.getDateMatrix(this.year, this.month - 1);
      }
    }

    /**
     * 연도의 모든 월의 날짜 매트릭스를 반환합니다.
     * @returns {Array} - 연도의 모든 월의 날짜 매트릭스 배열
     */
    yearMatrix() {
      let arr = [];
      // 12개월을 순회합니다.
      for (let i = 0; i < 12; i++) {
        // 각 월의 날짜 매트릭스를 배열에 추가합니다.
        arr.push(motherInstance.getDateMatrix(this.year, i));
      }
      // 연도의 모든 월의 날짜 매트릭스를 반환합니다.
      return arr;
    }

    /**
     * 다음 해의 모든 월의 날짜 매트릭스를 반환합니다.
     * @returns {Array} - 다음 해의 모든 월의 날짜 매트릭스 배열
     */
    nextYearMatrix() {
      let arr = [];
      // 12개월을 순회합니다.
      for (let i = 0; i < 12; i++) {
        // 다음 해의 각 월의 날짜 매트릭스를 배열에 추가합니다.
        arr.push(motherInstance.getDateMatrix(this.year + 1, i));
      }
      // 다음 해의 모든 월의 날짜 매트릭스를 반환합니다.
      return arr;
    }

    /**
     * 이전 해의 모든 월의 날짜 매트릭스를 반환합니다.
     * @returns {Array} - 이전 해의 모든 월의 날짜 매트릭스 배열
     */
    previousYearMatrix() {
      let arr = [];
      // 12개월을 순회합니다.
      for (let i = 0; i < 12; i++) {
        // 이전 해의 각 월의 날짜 매트릭스를 배열에 추가합니다.
        arr.push(motherInstance.getDateMatrix(this.year - 1, i));
      }
      // 이전 해의 모든 월의 날짜 매트릭스를 반환합니다.
      return arr;
    }

    /**
     * 주어진 범위 내의 날짜 매트릭스를 반환합니다.
     * @param {number} [range=3] - 범위 (기본값: 3)
     * @returns {Array} - 범위 내의 날짜 매트릭스 배열
     */
    rangeMatrix(range = 3) {
      let arr = [];
      let tempMatrix;

      // 이전 달의 날짜 매트릭스를 배열의 앞에 추가합니다.
      tempMatrix = this.previousMatrix();
      arr.unshift(tempMatrix);
      for (let i = 1; i < range; i++) {
        tempMatrix = tempMatrix.previousMatrix();
        arr.unshift(tempMatrix);
      }

      // 현재 날짜 매트릭스를 배열에 추가합니다.
      arr.push(this);

      // 다음 달의 날짜 매트릭스를 배열에 추가합니다.
      tempMatrix = this.nextMatrix();
      arr.push(tempMatrix);
      for (let i = 1; i < range; i++) {
        tempMatrix = tempMatrix.nextMatrix();
        arr.push(tempMatrix);
      }

      // 범위 내의 날짜 매트릭스를 반환합니다.
      return arr;
    }

    /**
     * 일요일을 기준으로 정렬된 날짜 매트릭스를 반환합니다.
     * @returns {Array} - 일요일을 기준으로 정렬된 날짜 매트릭스
     */
    returnSundayMatrix() {
      let arr = [];
      let boo;
      let tempArr;
      let tong;
      let length;

      // 매트릭스의 각 배열을 순회합니다.
      for (let matrix of this.matrix) {
        for (let i of matrix) {
          arr.push(i);
        }
      }
      // 배열의 앞에 null을 추가합니다.
      arr.unshift(null);

      // 첫 주가 모두 null인지 확인합니다.
      boo = true;
      for (let i = 0; i < 7; i++) {
        if (arr[i] !== null) {
          boo = false;
        }
      }

      // 첫 주가 모두 null인 경우 배열에서 제거합니다.
      if (boo) {
        for (let i = 0; i < 7; i++) {
          arr.shift();
        }
      }

      // 배열을 7일 단위로 나눕니다.
      tong = [];
      for (let i = 0; i < arr.length; i++) {
        if (i % 7 === 0) {
          tempArr = [];
        }
        tempArr.push(arr[i]);
        if (i % 7 === 6 || i === arr.length - 1) {
          tong.push(tempArr);
        }
      }

      // 마지막 배열이 비어있는 경우 제거합니다.
      if (tong[tong.length - 1].length === 0) {
        tong.pop();
      }

      // 마지막 배열의 길이가 7이 아닌 경우 null로 채웁니다.
      length = tong[tong.length - 1].length;
      if (length !== 7) {
        for (let i = 0; i < 7 - length; i++) {
          tong[tong.length - 1].push(null);
        }
      }

      // 마지막 배열이 모두 null인지 확인합니다.
      boo = true;
      for (let i = 0; i < 7; i++) {
        if (tong[tong.length - 1][i] !== null) {
          boo = false;
        }
      }

      // 마지막 배열이 모두 null인 경우 제거합니다.
      if (boo) {
        tong.pop();
      }

      // 일요일을 기준으로 정렬된 날짜 매트릭스를 반환합니다.
      return tong;
    }

    /**
     * 일요일을 기준으로 정렬된 새로운 DateMatrix 객체를 반환합니다.
     * @returns {DateMatrix} - 일요일을 기준으로 정렬된 새로운 DateMatrix 객체
     */
    sundayConvert() {
      // 새로운 DateMatrix 객체를 생성합니다.
      const newObj = new DateMatrix(this.year, this.month);
      // 일요일을 기준으로 정렬된 매트릭스를 설정합니다.
      newObj.matrix = this.returnSundayMatrix();
      // 새로운 DateMatrix 객체를 반환합니다.
      return newObj;
    }
  }

  /**
   * DateFactor 생성자 함수
   * @param {number} year - 연도
   * @param {number} month - 월 (0부터 시작)
   * @param {number} date - 날짜
   * @param {number} index - 요일 인덱스 (0: 월요일, 6: 일요일)
   */
  const DateFactor = function (year, month, date, index) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index];
    this.dateObject = new Date(year, month, date);
    this.dayday = this.dateObject.getDay();
  }

  /**
   * 날짜를 문자열로 반환하는 메서드
   * @returns {string} - 날짜 문자열
   */
  DateFactor.prototype.getDateString = function () {
    /**
     * 숫자를 두 자리 문자열로 변환하는 함수
     * @param {number|string} num - 숫자 또는 문자열
     * @returns {string} - 두 자리 문자열
     */
    const zeroAddition = function (num) {
      if (typeof num === 'string') {
        if (Number.isNaN(Number(num))) {
          throw new Error("invaild type");
        } else {
          num = Number(num);
        }
      }
      if (num < 10) {
        return '0' + String(num);
      } else {
        return String(num);
      }
    }
    return (String(this.year) + '-' + zeroAddition(this.month + 1) + '-' + zeroAddition(this.date));
  }

  let tempDate, arr;
  let tong;
  let pastLength;
  let result;
  let num;

  // DateMatrix 객체를 생성합니다.
  result = new DateMatrix(year, month);
  tong = [];
  arr = [];

  // 첫 번째 요일이 0이 아닌 경우 null로 채웁니다.
  if (firstDay !== 0) {
    for (let i = 0; i < firstDay - 1; i++) {
      arr.push(null);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      arr.push(null);
    }
  }

  // 첫 번째 날짜부터 마지막 날짜까지 순회합니다.
  for (let i = firstDate; i < lastDate + 1; i++) {
    tempDate = new Date(year, month, i);
    arr.push(tempDate.getDay());
    // 배열의 길이가 7의 배수인 경우 배열을 추가하고 초기화합니다.
    if (arr.length % 7 === 0) {
      tong.push(arr);
      arr = [];
    }
  }

  // 배열의 길이가 7이 아닌 경우 null로 채웁니다.
  if (arr.length !== 7 && arr.length !== 0) {
    pastLength = arr.length;
    for (let i = 0; i < 7 - pastLength; i++) {
      arr.push(null);
    }
    tong.push(arr);
  }

  num = 1;
  // 배열을 순회하며 DateFactor 객체를 생성합니다.
  for (let arr of tong) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        arr[i] = new DateFactor(year, month, num, i);
        num++;
      }
    }
  }

  // 결과 객체의 매트릭스를 설정합니다.
  result.matrix = tong;

  // 결과 객체를 반환합니다.
  return result;
}

/**
 * treeParsing 메서드는 주어진 디렉토리의 파일 및 디렉토리 구조를 파싱하여 트리 형태로 반환합니다.
 * @param {string} target - 대상 디렉토리 경로
 * @param {boolean} [liteMode=false] - 라이트 모드 여부
 * @param {function} [liteCallBack=null] - 라이트 모드 콜백 함수
 * @returns {Promise<Array|Object>} - 파일 및 디렉토리 구조를 포함하는 배열 또는 객체
 */
Mother.prototype.treeParsing = async function (target, liteMode = false, liteCallBack = null) {
  // 대상 경로가 '.'으로 시작하면 현재 작업 디렉토리를 기준으로 경로를 설정합니다.
  if (/^\./.test(target)) {
    target = process.cwd() + target.slice(1);
  }
  // 대상 폴더 이름을 추출합니다.
  const targetFolderName = (target.split("/"))[target.split("/").length - 1];
  // child_process 모듈의 exec 함수를 가져옵니다.
  const { exec } = require(`child_process`);

  /**
   * shellLink 함수는 경로 문자열을 쉘 명령어에서 사용할 수 있는 형식으로 변환합니다.
   * @param {string} str - 경로 문자열
   * @returns {string} - 변환된 경로 문자열
   */
  const shellLink = function (str) {
    let arr = str.split('/');
    let newStr = '';
    // 경로의 각 부분을 순회합니다.
    for (let i of arr) {
      // 특정 문자가 포함되지 않은 경우 그대로 추가합니다.
      if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
        newStr += i + '/';
      } 
      // 작은 따옴표가 포함되지 않은 경우 작은 따옴표로 감싸서 추가합니다.
      else if (!/'/g.test(i)) {
        newStr += "'" + i + "'" + '/';
      } 
      // 큰 따옴표가 포함되지 않은 경우 큰 따옴표로 감싸서 추가합니다.
      else if (!/"/g.test(i)) {
        newStr += '"' + i + '"' + '/';
      } 
      // 그렇지 않은 경우 그대로 추가합니다.
      else {
        newStr += i + '/';
      }
    }
    // 마지막 '/'를 제거합니다.
    newStr = newStr.slice(0, -1);
    return newStr;
  }

  /**
   * lsAl 함수는 주어진 경로의 파일 및 디렉토리 목록을 반환합니다.
   * @param {string} target - 대상 경로
   * @returns {Promise<string>} - 파일 및 디렉토리 목록
   */
  const lsAl = function (target) {
    return new Promise(function (resolve, reject) {
      // exec 함수를 사용하여 'ls -al' 명령어를 실행합니다.
      exec(`ls -al ${shellLink(target)}`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
        return;
      });
    });
  }

  /**
   * exist 함수는 주어진 경로가 존재하는지 확인합니다.
   * @param {string} target - 대상 경로
   * @returns {Promise<boolean>} - 경로 존재 여부
   */
  const exist = function (target) {
    const fs = require('fs');
    return new Promise(function (resolve, reject) {
      // fs.access 함수를 사용하여 경로의 존재 여부를 확인합니다.
      fs.access(target, fs.constants.F_OK, function (err) {
        try {
          if (!err) { resolve(true); }
          else { resolve(false); }
        } catch (e) {
          resolve(false);
        }
      });
    });
  }

  try {
    // 대상 경로가 존재하는 경우
    if (await exist(target)) {
      /**
       * makeFileArr 함수는 주어진 경로의 파일 및 디렉토리 정보를 배열로 반환합니다.
       * @param {string} target - 대상 경로
       * @returns {Promise<Array>} - 파일 및 디렉토리 정보 배열
       */
      const makeFileArr = async function (target) {
        try {
          // lsAl 함수를 사용하여 파일 및 디렉토리 목록을 가져옵니다.
          const stdout = await lsAl(target);
          let fileList;
          let tempArr, tempArr2, tempArr3, tempArr4, tempArr5;
          let temp, str;
          let newArr;

          // 파일 목록을 줄 단위로 분리합니다.
          fileList = stdout.split("\n");
          fileList.shift(); // 첫 번째 줄 제거
          fileList.pop(); // 마지막 줄 제거

          tempArr = [];
          // 각 줄을 공백으로 분리하여 배열로 만듭니다.
          for (let i of fileList) {
            newArr = [];
            for (let j of i.split(" ")) {
              if (j !== '' && j !== ' ') {
                newArr.push(j);
              }
            }
            tempArr.push(newArr);
          }

          tempArr2 = [];
          // 각 파일 및 디렉토리 정보를 객체로 변환합니다.
          for (let i of tempArr) {
            temp = {};

            // 디렉토리 여부를 확인합니다.
            if (i[0][0] === 'd') {
              temp.directory = true;
            } else {
              temp.directory = false;
            }

            // 파일 이름을 설정합니다.
            if (i.length > 9) {
              str = '';
              for (let j = 8; j < i.length; j++) {
                str += i[j];
                str += ' ';
              }
              temp.fileName = str.slice(0, -1);
            } else {
              temp.fileName = i[8];
            }

            // 숨김 파일 여부를 확인합니다.
            if (temp.fileName[0] === '.') {
              temp.hidden = true;
            } else {
              temp.hidden = false;
            }

            // 절대 경로를 설정합니다.
            temp.absolute = target + "/" + temp.fileName;

            // 경로의 길이를 설정합니다.
            temp.length = temp.absolute.split("/").length;

            tempArr2.push(temp);
          }

          tempArr3 = [];
          // 특정 파일 및 디렉토리를 필터링합니다.
          for (let i of tempArr2) {
            if (i.fileName !== '.' && i.fileName !== ".." && !/\-\>/gi.test(i.fileName) && i.fileName !== ".DS_Store") {
              tempArr3.push(i);
            }
          }

          tempArr4 = [];
          // 디렉토리의 경우 재귀적으로 파일 및 디렉토리 정보를 추가합니다.
          for (let i of tempArr3) {
            if (i.directory) {
              tempArr4.push(i);
              tempArr5 = await makeFileArr(i.absolute);
              for (let j of tempArr5) {
                tempArr4.push(j);
              }
            } else {
              tempArr4.push(i);
            }
          }

          // 최상위 디렉토리 정보를 추가합니다.
          tempArr4.unshift({
            directory: true,
            fileName: targetFolderName,
            hidden: (/^\./.test(targetFolderName)),
            absolute: target,
            length: target.split("/").length
          });

          return tempArr4;
        } catch (e) {
          console.log(e);
        }
      }

      // 라이트 모드가 아닌 경우
      if (!liteMode) {
        /**
         * setTree 함수는 주어진 경로의 파일 및 디렉토리 구조를 트리 형태로 설정합니다.
         * @param {string} target - 대상 경로
         * @returns {Promise<Object>} - 트리 구조 객체
         */
        const setTree = async function (target) {
          try {
            // makeFileArr 함수를 사용하여 파일 및 디렉토리 정보를 가져옵니다.
            const result = await makeFileArr(target);

            // TreeArray 클래스를 정의합니다.
            class TreeArray extends Array {
              get data() {
                return this[0];
              }

              get tree() {
                return this[0];
              }

              get value() {
                return this[0];
              }

              get target() {
                return target;
              }

              /**
               * returnFlat 메서드는 평탄화된 파일 및 디렉토리 배열을 반환합니다.
               * @returns {Promise<Array>} - 평탄화된 파일 및 디렉토리 배열
               */
              async returnFlat() {
                try {
                  const flatArr = await makeFileArr(target);
                  this.flatDeath = flatArr;
                  return flatArr;
                } catch (e) {
                  console.log(e);
                }
              }

              /**
               * setLength 메서드는 파일 및 디렉토리 배열의 길이를 설정합니다.
               */
              async setLength() {
                try {
                  let allFlats;
                  if (this.flatDeath === undefined || this.flatDeath === null) {
                    allFlats = await this.returnFlat();
                  } else {
                    allFlats = this.flatDeath;
                  }
                  allFlats.sort((a, b) => {
                    return a.length - b.length;
                  });
                  this.minLength = allFlats[0].length;
                  this.maxLength = allFlats[allFlats.length - 1].length;
                  this.totalLength = this.maxLength - this.minLength + 1;
                } catch (e) {
                  console.log(e);
                }
              }

              /**
               * returnIndexFlat 메서드는 주어진 인덱스의 파일 및 디렉토리 배열을 반환합니다.
               * @param {number|string} index - 인덱스 또는 "min" 또는 "max"
               * @returns {Promise<Array>} - 파일 및 디렉토리 배열
               */
              async returnIndexFlat(index) {
                try {
                  if (this.minLength === undefined) {
                    await this.setLength();
                  }
                  if (index !== "min" && index !== "max") {
                    if (typeof index !== "number") {
                      throw new Error("input must be number");
                    }
                  } else {
                    index = (index === "min") ? this.minLength : this.maxLength;
                  }
                  if (this.flatDeath === undefined || this.flatDeath === null) {
                    await this.returnFlat();
                  }
                  let arr = [];
                  for (let i of this.flatDeath) {
                    if (i.length === index) {
                      arr.push(i);
                    }
                  }
                  return arr;
                } catch (e) {
                  console.log(e);
                }
              }

              /**
               * returnFlatMatrix 메서드는 평탄화된 파일 및 디렉토리 배열의 매트릭스를 반환합니다.
               * @returns {Promise<Array>} - 평탄화된 파일 및 디렉토리 배열의 매트릭스
               */
              async returnFlatMatrix() {
                try {
                  if (this.minLength === undefined) {
                    await this.setLength();
                  }
                  let result = [];
                  for (let i = this.minLength; i < this.maxLength + 1; i++) {
                    result.push(await this.returnIndexFlat(i));
                  }
                  return result;
                } catch (e) {
                  console.log(e);
                }
              }

              /**
               * setFromDir 메서드는 fromDir 속성을 설정합니다.
               * @param {string} dir - 디렉토리 경로
               */
              setFromDir(dir) {
                this.fromDir = dir;
              }

              /**
               * setToDir 메서드는 toDir 속성을 설정합니다.
               * @param {string} dir - 디렉토리 경로
               */
              setToDir(dir) {
                this.toDir = dir;
              }
            }

            let absolutes, tempList;
            let filter;
            let filterSplit;
            let filterSplitJoin;
            let temp, temp2;
            let finalJson;
            let maxLength, minLength;
            let lengthArr;
            let tree;
            let finalTree;

            // 절대 경로 배열을 생성합니다.
            absolutes = [];
            absolutes.push(target);
            for (let i of result) {
              if (i.directory) {
                absolutes.push(i.absolute);
              }
            }

            // 중복을 제거한 절대 경로 배열을 생성합니다.
            filter = Array.from(new Set(absolutes));

            // 절대 경로 배열을 '/'로 분리하여 배열로 만듭니다.
            filterSplit = [];
            for (let i of filter) {
              filterSplit.push(i.split("/"));
            }

            // 배열을 길이 순으로 정렬합니다.
            filterSplit.sort((a, b) => {
              return a.length - b.length;
            });

            // 각 배열을 객체로 변환합니다.
            filterSplitJoin = [];
            for (let i of filterSplit) {
              temp = {
                directory: true,
                fileName: i[i.length - 1],
                hidden: (i[i.length - 1][0] === '.'),
                absolute: i.join("/"),
                files: [],
                length: i.length,
              };
              for (let j of result) {
                temp2 = j.absolute.split("/");
                if (!j.directory) {
                  if (temp2.length - 1 === i.length) {
                    if ((new RegExp('^' + temp.absolute)).test(j.absolute)) {
                      temp.files.push(j);
                    }
                  }
                }
              }
              filterSplitJoin.push(temp);
            }

            // 배열을 길이 순으로 정렬합니다.
            filterSplitJoin.sort((a, b) => {
              return a.length - b.length;
            });

            // 최대 길이와 최소 길이를 설정합니다.
            maxLength = filterSplitJoin[filterSplitJoin.length - 1].length;
            minLength = filterSplitJoin[0].length;

            // 길이별로 배열을 생성합니다.
            lengthArr = [];
            for (let i = minLength; i < maxLength + 1; i++) {
              temp = [];
              for (let j of filterSplitJoin) {
                if (j.length === i) {
                  temp.push(j);
                }
              }
              lengthArr.push(temp);
            }

            // 최종 JSON 객체를 생성합니다.
            finalJson = new TreeArray();
            finalJson.push(filterSplitJoin[0]);

            /**
             * directoryParsing 함수는 디렉토리 구조를 재귀적으로 파싱합니다.
             * @param {Array} arr - 디렉토리 배열
             * @returns {Array} - 파싱된 디렉토리 배열
             */
            const directoryParsing = function (arr) {
              for (let obj of arr) {
                if (obj.directory) {
                  for (let i = 0; i < filterSplitJoin.length; i++) {
                    if (filterSplitJoin[i].directory) {
                      if ((new RegExp('^' + obj.absolute)).test(filterSplitJoin[i].absolute) && (obj.length + 1 === filterSplitJoin[i].length)) {
                        obj.files.push(filterSplitJoin[i]);
                      }
                    }
                  }
                }
              }
              for (let i of arr) {
                if (i.files !== undefined) {
                  i.files = directoryParsing(i.files);
                }
              }
              return arr;
            }

            // 최종 트리 구조를 생성합니다.
            finalTree = directoryParsing(finalJson);
            await finalTree.setLength();

            return finalTree;

          } catch (e) {
            console.log(e);
          }
        }
        return (await setTree(target));
      } else {
        // 라이트 모드인 경우
        const resultArr = await makeFileArr(target);
        let finalArr;
        // 파일 및 디렉토리 절대 경로 배열을 생성합니다.
        finalArr = resultArr.map((obj) => { return obj.absolute + (obj.directory ? '/' : ''); });
        if (typeof liteCallBack === "function") {
          finalArr = finalArr.map(liteCallBack);
        }
        // 중복을 제거한 배열을 생성합니다.
        finalArr = Array.from(new Set(finalArr));
        return finalArr;
      }
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * leafParsing 메서드는 주어진 디렉토리의 파일 및 디렉토리 구조를 파싱하여 반환합니다.
 * @param {string} target - 대상 디렉토리 경로
 * @param {boolean} [searchMode=false] - 검색 모드 여부
 * @param {string} [keyword=''] - 검색 키워드
 * @returns {Promise<Array>} - 파일 및 디렉토리 구조를 포함하는 배열
 */
Mother.prototype.leafParsing = async function (target, searchMode = false, keyword = '') {
  // target이 문자열이 아닌 경우 오류를 발생시킵니다.
  if (typeof target !== "string") {
    throw new Error("invaild input");
  }
  // target의 마지막 '/'를 제거합니다.
  target = target.replace(/\/$/i, '');
  // child_process 모듈의 exec 함수를 가져옵니다.
  const { exec } = require(`child_process`);

  /**
   * shellLink 함수는 경로 문자열을 쉘 명령어에서 사용할 수 있는 형식으로 변환합니다.
   * @param {string} str - 경로 문자열
   * @returns {string} - 변환된 경로 문자열
   */
  const shellLink = function (str) {
    // 경로 문자열을 '/'로 분리하여 배열로 만듭니다.
    let arr = str.split('/');
    // 새로운 경로 문자열을 초기화합니다.
    let newStr = '';
    // 경로의 각 부분을 순회합니다.
    for (let i of arr) {
      // 특정 문자가 포함되지 않은 경우 그대로 추가합니다.
      if (!/ /g.test(i) && !/\&/g.test(i) && !/\(/g.test(i) && !/\)/g.test(i) && !/\#/g.test(i) && !/\%/g.test(i) && !/\[/g.test(i) && !/\]/g.test(i) && !/\{/g.test(i) && !/\}/g.test(i) && !/\@/g.test(i) && !/\!/g.test(i) && !/\=/g.test(i) && !/\+/g.test(i) && !/\~/g.test(i) && !/\?/g.test(i) && !/\$/g.test(i)) {
        // 경로 부분을 새로운 경로 문자열에 추가합니다.
        newStr += i + '/';
      } 
      // 작은 따옴표가 포함되지 않은 경우 작은 따옴표로 감싸서 추가합니다.
      else if (!/'/g.test(i)) {
        newStr += "'" + i + "'" + '/';
      } 
      // 큰 따옴표가 포함되지 않은 경우 큰 따옴표로 감싸서 추가합니다.
      else if (!/"/g.test(i)) {
        newStr += '"' + i + '"' + '/';
      } 
      // 그렇지 않은 경우 그대로 추가합니다.
      else {
        newStr += i + '/';
      }
    }
    // 마지막 '/'를 제거합니다.
    newStr = newStr.slice(0, -1);
    // 변환된 경로 문자열을 반환합니다.
    return newStr;
  }

  /**
   * lsAl 함수는 주어진 경로의 파일 및 디렉토리 목록을 반환합니다.
   * @param {string} target - 대상 경로
   * @returns {Promise<string>} - 파일 및 디렉토리 목록
   */
  const lsAl = function (target) {
    // Promise를 반환합니다.
    return new Promise(function (resolve, reject) {
      // exec 함수를 사용하여 'ls -al' 명령어를 실행합니다.
      exec(`ls -al ${shellLink(target)}`, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        // 오류가 발생한 경우 reject를 호출합니다.
        if (error) {
          reject(error);
        } 
        // 오류가 발생하지 않은 경우 resolve를 호출합니다.
        else {
          resolve(stdout);
        }
        return;
      });
    });
  }

  /**
   * execPromise 함수는 주어진 명령어를 실행하고 결과를 반환합니다.
   * @param {string} command - 실행할 명령어
   * @returns {Promise<string>} - 명령어 실행 결과
   */
  const execPromise = function (command) {
    // Promise를 반환합니다.
    return new Promise((resolve, reject) => {
      // exec 함수를 사용하여 명령어를 실행합니다.
      exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        // 오류가 발생한 경우 reject를 호출합니다.
        if (error) {
          reject(error);
        } 
        // 오류가 발생하지 않은 경우 resolve를 호출합니다.
        else {
          resolve(stdout);
        }
      })
    });
  }

  /**
   * kindFilter 함수는 파일 이름을 기반으로 파일 종류를 반환합니다.
   * @param {string} fileName - 파일 이름
   * @returns {string} - 파일 종류
   */
  const kindFilter = function (fileName) {
    // 파일 종류를 저장할 변수를 초기화합니다.
    let str;
    // 파일 확장자에 따라 파일 종류를 설정합니다.
    if (/\.(js|py|c|scpt|html|css|xml|java|json|cfg|bash|csh|md)$/gi.test(fileName)) {
      str = "code";
    } else if (/\.(ai|eps|svg)$/gi.test(fileName)) {
      str = "ai";
    } else if (/\.(png|psd|iff|pcx|raw|tga|psb)$/gi.test(fileName)) {
      str = "png";
    } else if (/\.(jpg|jpeg|gif|jpf|jps|bmp|heic|jfif)$/gi.test(fileName)) {
      str = "jpg";
    } else if (/\.(pdf)$/gi.test(fileName)) {
      str = "pdf";
    } else if (/\.(pptx|pptm|ppt)$/gi.test(fileName)) {
      str = "powerpoint";
    } else if (/\.(xlsx|xlsm|xlsb|xltx|xltxm|xls|xlt|xlam)$/gi.test(fileName)) {
      str = "excel";
    } else if (/\.(docx|docm|doc|dotx|dotm|dot|hwp)$/gi.test(fileName)) {
      str = "word";
    } else if (/\.(txt|wps|odt|rtf)$/gi.test(fileName)) {
      str = "txt";
    } else if (/\.(exe|pkg|dmg|iso)$/gi.test(fileName)) {
      str = "exe";
    } else if (/\.(mp3|wav|m4a|m4b|m4v|m4r|3gp|aac|wv|aiff|aif|aifc|ogg)$/gi.test(fileName)) {
      str = "mp3";
    } else if (/\.(mp4|avi|mov|wmv|mkv|mpg|flv|asf|asx|ogm|ogv|webm|vob|qt|amv|m4p|mpv|mpg|nsv)$/gi.test(fileName)) {
      str = "mp4";
    } else if (/\.(zip|egg|7z|tar|rar|apk|alz|tgz|zoo|cab|img|pak|war)$/gi.test(fileName)) {
      str = "zip";
    } else if (/\.(gddoc)$/gi.test(fileName)) {
      str = "gddoc";
    } else if (/\.(gdsheet)$/gi.test(fileName)) {
      str = "gdsheet";
    } else if (/\.(gdslides)$/gi.test(fileName)) {
      str = "gdslides";
    } else if (/\.(gdform)$/gi.test(fileName)) {
      str = "gdform";
    } else if (/\.(ntpage)$/gi.test(fileName)) {
      str = "ntpage";
    } else if (/\.(ntkanban)$/gi.test(fileName)) {
      str = "ntkanban";
    } else if (/\.(drawio)$/gi.test(fileName)) {
      str = "drawio";
    } else if (/\.(link)$/gi.test(fileName)) {
      str = "link";
    } else if (/\.(odxlsx)$/gi.test(fileName)) {
      str = "odxlsx";
    } else if (/\.(oddocx)$/gi.test(fileName)) {
      str = "oddocx";
    } else if (/\.(odpptx)$/gi.test(fileName)) {
      str = "odpptx";
    } else {
      str = "general";
    }
    // 파일 종류를 반환합니다.
    return str;
  }

  /**
   * findTarget 함수는 주어진 경로에서 검색 대상 파일 및 디렉토리를 찾습니다.
   * @param {string} where - 검색할 경로
   * @param {string} searchTarget - 검색 대상
   * @returns {Promise<Array>} - 검색된 파일 및 디렉토리 배열
   */
  const findTarget = function (where, searchTarget) {
    // 파일 목록과 폴더 목록을 저장할 변수를 초기화합니다.
    let files, folders, tong, tempObj, targetName;
    // Promise를 반환합니다.
    return new Promise((resolve, reject) => {
      // execPromise 함수를 사용하여 파일을 찾습니다.
      execPromise(`find ${shellLink(where)} -name "*${searchTarget.trim()}*"`).then((stdout) => {
        // 파일 목록을 줄 단위로 분리하고 공백을 제거합니다.
        files = stdout.split("\n").map((i) => {
          return i.trim();
        }).filter((i) => {
          // 빈 문자열과 특정 파일을 필터링합니다.
          return i !== '' && i !== ".DS_Store" && !/^\.\_/.test(i);
        });
        // execPromise 함수를 사용하여 디렉토리를 찾습니다.
        return execPromise(`find ${shellLink(where)} -name "*${searchTarget.trim()}*" -type d`);
      }).then((stdout) => {
        // 디렉토리 목록을 줄 단위로 분리하고 공백을 제거합니다.
        folders = stdout.split("\n").map((i) => {
          return i.trim();
        }).filter((i) => {
          // 빈 문자열과 특정 파일을 필터링합니다.
          return i !== '' && i !== ".DS_Store" && !/^\.\_/.test(i);
        });
        // 결과를 저장할 배열을 초기화합니다.
        tong = [];
        // 파일 목록을 순회합니다.
        for (let f of files) {
          // 임시 객체를 초기화합니다.
          tempObj = {};
          // 파일 이름을 추출합니다.
          targetName = (f.split("/"))[f.split("/").length - 1];
          // 폴더 목록에 포함된 경우
          if (folders.includes(f)) {
            // 디렉토리 정보를 설정합니다.
            tempObj.directory = true;
            tempObj.fileName = targetName;
            tempObj.hidden = /^\./.test(targetName);
            tempObj.absolute = f;
            tempObj.kind = "folder";
          } 
          // 폴더 목록에 포함되지 않은 경우
          else {
            // 파일 정보를 설정합니다.
            tempObj.directory = false;
            tempObj.fileName = targetName;
            tempObj.hidden = /^\./.test(targetName);
            tempObj.absolute = f;
            tempObj.kind = kindFilter(f);
          }
          // 결과 배열에 추가합니다.
          tong.push(tempObj);
        }
        // Promise를 해결합니다.
        resolve(tong);
      }).catch((err) => {
        // 오류가 발생한 경우 Promise를 거부합니다.
        reject(err);
      });
    });
  }

  /**
   * makeFileArr 함수는 주어진 경로의 파일 및 디렉토리 정보를 배열로 반환합니다.
   * @param {string} target - 대상 경로
   * @returns {Promise<Array>} - 파일 및 디렉토리 정보 배열
   */
  const makeFileArr = async function (target) {
    try {
      // 대상 폴더 이름을 추출합니다.
      const targetFolderName = (target.split("/"))[target.split("/").length - 1];
      // lsAl 함수를 사용하여 파일 및 디렉토리 목록을 가져옵니다.
      const stdout = await lsAl(target);
      // 파일 목록을 저장할 변수를 초기화합니다.
      let fileList;
      // 임시 배열을 초기화합니다.
      let tempArr, tempArr2, tempArr3, tempArr4, tempArr5;
      // 임시 변수를 초기화합니다.
      let temp, str;
      // 새로운 배열을 초기화합니다.
      let newArr;

      // 파일 목록을 줄 단위로 분리합니다.
      fileList = stdout.split("\n");
      // 첫 번째 줄을 제거합니다.
      fileList.shift();
      // 마지막 줄을 제거합니다.
      fileList.pop();

      // 임시 배열을 초기화합니다.
      tempArr = [];
      // 각 줄을 공백으로 분리하여 배열로 만듭니다.
      for (let i of fileList) {
        // 새로운 배열을 초기화합니다.
        newArr = [];
        // 각 단어를 분리하여 배열에 추가합니다.
        for (let j of i.split(" ")) {
          // 빈 문자열이 아닌 경우 배열에 추가합니다.
          if (j !== '' && j !== ' ') {
            newArr.push(j);
          }
        }
        // 임시 배열에 추가합니다.
        tempArr.push(newArr);
      }

      // 임시 배열을 초기화합니다.
      tempArr2 = [];
      // 각 파일 및 디렉토리 정보를 객체로 변환합니다.
      for (let i of tempArr) {
        // 임시 객체를 초기화합니다.
        temp = {};

        // 디렉토리 여부를 확인합니다.
        if (i[0][0] === 'd') {
          temp.directory = true;
        } else {
          temp.directory = false;
        }

        // 파일 이름을 설정합니다.
        if (i.length > 9) {
          // 파일 이름을 초기화합니다.
          str = '';
          // 파일 이름을 결합합니다.
          for (let j = 8; j < i.length; j++) {
            str += i[j];
            str += ' ';
          }
          // 파일 이름을 설정합니다.
          temp.fileName = str.slice(0, -1);
        } else {
          // 파일 이름을 설정합니다.
          temp.fileName = i[8];
        }

        // 숨김 파일 여부를 확인합니다.
        if (temp.fileName[0] === '.') {
          temp.hidden = true;
        } else {
          temp.hidden = false;
        }

        // 절대 경로를 설정합니다.
        temp.absolute = target + "/" + temp.fileName;

        // 경로의 길이를 설정합니다.
        temp.length = temp.absolute.split("/").length;

        // 임시 배열에 추가합니다.
        tempArr2.push(temp);
      }

      // 임시 배열을 초기화합니다.
      tempArr3 = [];
      // 특정 파일 및 디렉토리를 필터링합니다.
      for (let i of tempArr2) {
        if (i.fileName !== '.' && i.fileName !== ".." && !/\-\>/gi.test(i.fileName) && i.fileName !== ".DS_Store") {
          tempArr3.push(i);
        }
      }

      // 임시 배열을 초기화합니다.
      tempArr4 = [];
      // 필터링된 파일 및 디렉토리를 배열에 추가합니다.
      for (let i of tempArr3) {
        tempArr4.push(i);
      }

      // 파일 및 디렉토리 정보를 객체로 변환합니다.
      tempArr4 = tempArr4.map((obj) => {
        // 길이 속성을 삭제합니다.
        delete obj.length;
        // 디렉토리와 파일 이름을 추출합니다.
        const { directory, fileName } = obj;
        // 디렉토리인 경우
        if (directory) {
          obj.kind = "folder";
        } 
        // 디렉토리가 아닌 경우
        else {
          obj.kind = kindFilter(fileName);
        }
        // 객체를 반환합니다.
        return obj;
      });
      // 파일 및 디렉토리 정보를 반환합니다.
      return tempArr4;
    } catch (e) {
      // 오류가 발생한 경우 콘솔에 출력합니다.
      console.log(e);
    }
  }

  try {
    // 최종 결과를 저장할 변수를 초기화합니다.
    let finalResult;
    // 검색 모드가 아닌 경우
    if (!searchMode) {
      // makeFileArr 함수를 사용하여 파일 및 디렉토리 정보를 가져옵니다.
      finalResult = await makeFileArr(target);
    } 
    // 검색 모드인 경우
    else {
      // findTarget 함수를 사용하여 파일 및 디렉토리를 검색합니다.
      finalResult = await findTarget(target, keyword);
    }
    // 최종 결과를 반환합니다.
    return finalResult;
  } catch (e) {
    // 오류가 발생한 경우 콘솔에 출력합니다.
    console.log(e);
    // 빈 배열을 반환합니다.
    return [];
  }
}

/**
 * returnRandoms 메서드는 주어진 숫자(num)만큼의 랜덤 숫자 배열을 반환합니다.
 * @param {number} [num=10] - 생성할 랜덤 숫자의 개수
 * @param {boolean} [length=false] - 길이 기반 정렬 여부
 * @returns {Promise<Array>} - 랜덤 숫자 배열
 */
Mother.prototype.returnRandoms = function (num = 10, length = false) {
  // crypto 모듈을 가져옵니다.
  const crypto = require('crypto');
  // 암호화에 사용할 비밀번호를 설정합니다.
  const password = "eorgghseGehfwi3r2";

  // num이 boolean 타입인 경우, num과 length 값을 교체합니다.
  if (typeof num === "boolean") {
    length = num;
    num = 10;
  }

  // num이 숫자가 아닌 경우 기본값 10을 설정합니다.
  if (typeof num !== "number") {
    num = 10;
  }

  // length가 boolean 타입이 아닌 경우 기본값 false를 설정합니다.
  if (typeof length !== "boolean") {
    length = false;
  }

  // num이 0인 경우 기본값 10을 설정합니다.
  if (num === 0) {
    num = 10;
  }

  // Promise를 반환합니다.
  return new Promise(function (resolve, reject) {
    // scrypt 함수를 사용하여 비밀번호를 키로 변환합니다.
    crypto.scrypt(password, "salt", 24, (err, key) => {
      // 오류가 발생한 경우 예외를 던집니다.
      if (err) throw err;

      // randomFill 함수를 사용하여 랜덤 값을 채웁니다.
      crypto.randomFill(new Uint32Array(num), (err, iv) => {
        // 오류가 발생한 경우 Promise를 거부합니다.
        if (err) {
          reject(err);
        } else {
          // length가 false인 경우 랜덤 값을 그대로 반환합니다.
          if (!length) {
            resolve(iv);
          } else {
            // 랜덤 값을 문자열 배열로 변환합니다.
            let resultArr = Array.from(iv).map((n) => { return String(n); });

            // 문자열 배열을 길이 기준으로 정렬합니다.
            resultArr.sort((a, b) => { return a.length - b.length; });

            // 가장 짧은 길이를 구합니다.
            let minLength = resultArr[0].length;

            // 각 문자열을 잘라내고 숫자로 변환합니다.
            resultArr = resultArr.map((n) => { return Number(n.slice(0, minLength).replace(/^0/, '1')); });

            // 결과 배열을 반환합니다.
            resolve(resultArr);
          }
        }
      });
    });
  });
}

/**
 * cryptoString 메서드는 주어진 문자열을 암호화합니다.
 * @param {string} password - 암호화에 사용할 비밀번호
 * @param {string} string - 암호화할 문자열
 * @param {Object} [option={ algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }] - 암호화 옵션
 * @param {string} option.algorithm - 사용할 암호화 알고리즘
 * @param {boolean} option.makeKey - 키를 생성할지 여부
 * @param {string|null} option.iv - 초기화 벡터
 * @param {string} option.digest - 출력 형식
 * @returns {Promise<string>} - 암호화된 문자열
 */
Mother.prototype.cryptoString = function (password, string, option = { algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }) {
  // 입력 값이 유효한지 확인합니다.
  if (typeof password !== "string" || typeof string !== "string" || typeof option !== "object") {
    throw new Error("invaild input");
  }
  // 옵션 값이 유효한지 확인합니다.
  if (option.algorithm === undefined || option.makeKey === undefined || option.iv === undefined || option.digest === undefined) {
    throw new Error("invaild option");
  }

  // crypto 모듈을 가져옵니다.
  const crypto = require("crypto");
  // 사용 가능한 암호화 알고리즘 목록을 가져옵니다.
  const algorithms = crypto.getCiphers();
  // 사용할 변수들을 선언합니다.
  let algorithm, iv, digest;

  // 옵션에 지정된 알고리즘이 유효한지 확인합니다.
  if (!algorithms.includes(option.algorithm)) {
    throw new Error("invaild algorithm");
  }
  // 옵션에 지정된 digest가 유효한지 확인합니다.
  if (option.digest !== "hex" && option.digest !== "base64" && option.digest !== "latin1") {
    throw new Error("invaild digest");
  }
  // makeKey 옵션이 boolean 타입인지 확인합니다.
  if (typeof option.makeKey !== "boolean") {
    throw new Error("invaild make key property");
  }
  // iv 옵션이 문자열인지 확인합니다.
  if (typeof option.iv !== "string") {
    option.iv = Buffer.alloc(16, 0); // iv가 문자열이 아닌 경우 16바이트의 0으로 채워진 버퍼를 생성합니다.
  }

  // 옵션 값을 변수에 할당합니다.
  algorithm = option.algorithm;
  iv = option.iv;
  digest = option.digest;

  // makeKey 옵션이 true인 경우
  if (option.makeKey) {
    // Promise를 반환합니다.
    return new Promise(function (resolve, reject) {
      // scrypt 함수를 사용하여 비밀번호를 키로 변환합니다.
      crypto.scrypt(password, "salt", 24, function (err, key) {
        // 오류가 발생한 경우 Promise를 거부합니다.
        if (err) {
          reject(err);
        } else {
          // 암호화 객체를 생성합니다.
          const cipher = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = '';
          // 암호화 객체의 인코딩을 설정합니다.
          cipher.setEncoding(digest);
          // 데이터 이벤트 리스너를 설정합니다.
          cipher.on("data", (chunk) => { encrypted += chunk; });
          // 종료 이벤트 리스너를 설정합니다.
          cipher.on("end", () => { resolve(encrypted); });
          // 암호화할 문자열을 씁니다.
          cipher.write(string);
          // 암호화를 종료합니다.
          cipher.end();
        }
      });
    });
  } else {
    // makeKey 옵션이 false인 경우
    // Promise를 반환합니다.
    return new Promise(function (resolve, reject) {
      // 암호화 객체를 생성합니다.
      const cipher = crypto.createCipheriv(algorithm, password, iv);
      let encrypted = '';
      // 암호화 객체의 인코딩을 설정합니다.
      cipher.setEncoding(digest);
      // 데이터 이벤트 리스너를 설정합니다.
      cipher.on("data", (chunk) => { encrypted += chunk; });
      // 종료 이벤트 리스너를 설정합니다.
      cipher.on("end", () => { resolve(encrypted); });
      // 암호화할 문자열을 씁니다.
      cipher.write(string);
      // 암호화를 종료합니다.
      cipher.end();
    });
  }
}

/**
 * decryptoHash 메서드는 주어진 해시를 복호화합니다.
 * @param {string} password - 복호화에 사용할 비밀번호
 * @param {string} hash - 복호화할 해시 문자열
 * @param {Object} [option={ algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }] - 복호화 옵션
 * @param {string} option.algorithm - 사용할 복호화 알고리즘
 * @param {boolean} option.makeKey - 키를 생성할지 여부
 * @param {string|null} option.iv - 초기화 벡터
 * @param {string} option.digest - 입력 형식
 * @returns {Promise<string>} - 복호화된 문자열
 */
Mother.prototype.decryptoHash = function (password, hash, option = { algorithm: "aes-192-cbc", makeKey: true, iv: null, digest: "hex" }) {
  // 입력 값이 유효한지 확인합니다.
  if (typeof password !== "string" || typeof hash !== "string" || typeof option !== "object") {
    throw new Error("invaild input");
  }
  // 옵션 값이 유효한지 확인합니다.
  if (option.algorithm === undefined || option.makeKey === undefined || option.iv === undefined || option.digest === undefined) {
    throw new Error("invaild option");
  }

  // crypto 모듈을 가져옵니다.
  const crypto = require("crypto");
  // 사용 가능한 암호화 알고리즘 목록을 가져옵니다.
  const algorithms = crypto.getCiphers();
  // 사용할 변수들을 선언합니다.
  let algorithm, iv, digest;

  // 옵션에 지정된 알고리즘이 유효한지 확인합니다.
  if (!algorithms.includes(option.algorithm)) {
    throw new Error("invaild algorithm");
  }
  // 옵션에 지정된 digest가 유효한지 확인합니다.
  if (option.digest !== "hex" && option.digest !== "base64" && option.digest !== "latin1") {
    throw new Error("invaild digest");
  }
  // makeKey 옵션이 boolean 타입인지 확인합니다.
  if (typeof option.makeKey !== "boolean") {
    throw new Error("invaild make key property");
  }
  // iv 옵션이 문자열인지 확인합니다.
  if (typeof option.iv !== "string") {
    option.iv = Buffer.alloc(16, 0); // iv가 문자열이 아닌 경우 16바이트의 0으로 채워진 버퍼를 생성합니다.
  }

  // 옵션 값을 변수에 할당합니다.
  algorithm = option.algorithm;
  iv = option.iv;
  digest = option.digest;

  // 해시가 hex 형식이고 유효하지 않은 문자가 포함된 경우
  if (digest === "hex" && hash.replace(/[0-9a-f]/g, '') !== '') {
    // Promise를 반환하여 해시를 그대로 반환합니다.
    return new Promise((resolve, reject) => {
      resolve(hash);
    });
  } else {
    // makeKey 옵션이 true인 경우
    if (option.makeKey) {
      // Promise를 반환합니다.
      return new Promise(function (resolve, reject) {
        // scrypt 함수를 사용하여 비밀번호를 키로 변환합니다.
        crypto.scrypt(password, "salt", 24, function (err, key) {
          // 오류가 발생한 경우 Promise를 거부합니다.
          if (err) {
            reject(err);
          } else {
            // 복호화 객체를 생성합니다.
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = '';
            // readable 이벤트 리스너를 설정합니다.
            decipher.on("readable", () => {
              let chunk;
              // 데이터를 읽어옵니다.
              chunk = decipher.read();
              while (chunk !== null) {
                // 읽어온 데이터를 문자열로 변환하여 추가합니다.
                decrypted += chunk.toString("utf8");
                chunk = decipher.read();
              }
            });
            // 종료 이벤트 리스너를 설정합니다.
            decipher.on("end", () => { resolve(decrypted); });
            // 복호화할 해시를 씁니다.
            decipher.write(hash, digest);
            // 복호화를 종료합니다.
            decipher.end();
          }
        });
      });
    } else {
      // makeKey 옵션이 false인 경우
      // Promise를 반환합니다.
      return new Promise(function (resolve, reject) {
        // 복호화 객체를 생성합니다.
        const decipher = crypto.createDecipheriv(algorithm, password, iv);
        let decrypted = '';
        // readable 이벤트 리스너를 설정합니다.
        decipher.on("readable", () => {
          let chunk;
          // 데이터를 읽어옵니다.
          chunk = decipher.read();
          while (chunk !== null) {
            // 읽어온 데이터를 문자열로 변환하여 추가합니다.
            decrypted += chunk.toString("utf8");
            chunk = decipher.read();
          }
        });
        // 종료 이벤트 리스너를 설정합니다.
        decipher.on("end", () => { resolve(decrypted); });
        // 복호화할 해시를 씁니다.
        decipher.write(hash, digest);
        // 복호화를 종료합니다.
        decipher.end();
      });
    }
  }
}

/**
 * mysqlQuery 메서드는 주어진 쿼리를 MySQL 데이터베이스에 실행합니다.
 * @param {string|string[]} query - 실행할 SQL 쿼리 또는 쿼리 배열
 * @param {Object} [option={ local: false, front: true, center: false, test: false }] - 옵션 객체
 * @param {boolean} option.local - 로컬 데이터베이스를 사용할지 여부
 * @param {boolean} option.front - 프론트 데이터베이스를 사용할지 여부
 * @param {boolean} option.center - 센터 데이터베이스를 사용할지 여부
 * @param {boolean} option.test - 테스트 데이터베이스를 사용할지 여부
 * @returns {Promise<Object>} - 쿼리 결과를 포함한 Promise 객체
 */
Mother.prototype.mysqlQuery = function (query, option = { local: false, front: true, center: false, test: false }) {
  // mysql2 모듈을 가져옵니다.
  const mysql = require("mysql2");
  // 데이터베이스 주소 정보를 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 기본 포트를 설정합니다.
  const defaultPort = 3306;
  // 데이터베이스 연결에 필요한 변수들을 선언합니다.
  let mysqlStandard;
  let host;
  let port;
  let user, password, database;

  // 기본 데이터베이스 정보를 설정합니다.
  mysqlStandard = ADDRESS["frontinfo"];
  host = ADDRESS["frontinfo"]["host"];
  port = defaultPort;
  // 객체 구조 분해 할당을 통해 사용자, 비밀번호, 데이터베이스를 설정합니다.
  ({ user, password, database } = mysqlStandard);

  // MySQL 연결을 생성합니다.
  const connection = mysql.createConnection({ host, port, user, password, database });
  // 결과를 저장할 객체를 선언합니다.
  let tong = {};

  // 쿼리가 배열인지 확인합니다.
  if (Array.isArray(query)) {
    // Promise 리스트를 선언합니다.
    let promiseList;
    promiseList = [];
    // 쿼리 배열을 순회하며 각 쿼리를 Promise 리스트에 추가합니다.
    for (let i of query) {
      promiseList.push(connection.promise().query(i));
    }
    // 모든 쿼리가 완료될 때까지 기다립니다.
    return new Promise(function (resolve, reject) {
      Promise.all(promiseList).then((values) => {
        // 모든 쿼리 결과를 저장합니다.
        tong = values;
        tong.message = "done";
        // 연결을 종료합니다.
        connection.end();
        // 결과를 반환합니다.
        resolve(tong);
      }).catch(function (err) {
        // 오류가 발생한 경우 연결을 종료하고 오류를 반환합니다.
        connection.end();
        reject(err);
      });
    });
  } else {
    // 쿼리가 단일 문자열인 경우
    return new Promise(function (resolve, reject) {
      // 쿼리를 실행합니다.
      connection.promise().query(query).then((response) => {
        // 결과를 저장합니다.
        tong = response;
      }).then(function () {
        // 연결을 종료합니다.
        connection.end();
        // 결과가 배열인지 확인합니다.
        if (Array.isArray(tong)) {
          // 결과 배열이 비어 있지 않은 경우
          if (tong.length > 0) {
            // 첫 번째 결과에 메시지를 추가합니다.
            tong[0].message = "done";
            // 첫 번째 결과를 반환합니다.
            resolve(tong[0]);
          } else {
            // 결과 배열이 비어 있는 경우 메시지만 반환합니다.
            resolve({ message: "done" });
          }
        } else {
          // 결과가 배열이 아닌 경우 메시지만 반환합니다.
          resolve({ message: "done" });
        }
      }).catch(function (err) {
        // 오류가 발생한 경우 연결을 종료하고 오류를 반환합니다.
        connection.end();
        reject(err);
      });
    });
  }
}

/**
 * copyToClipboard 메서드는 주어진 데이터를 클립보드에 복사합니다.
 * @param {string} data - 클립보드에 복사할 데이터
 */
Mother.prototype.copyToClipboard = function (data) {
  // os 모듈을 가져옵니다.
  const os = require("os");
  // child_process 모듈에서 spawn 함수를 가져옵니다.
  const { spawn } = require('child_process');
  // pbcopy 변수를 선언합니다.
  let pbcopy;
  // 운영체제가 macOS인지 확인합니다.
  if (os.type() === 'Darwin') {
    // macOS인 경우 pbcopy 명령어를 사용합니다.
    pbcopy = spawn('pbcopy');
  } else {
    // macOS가 아닌 경우 xclip 명령어를 사용합니다.
    pbcopy = spawn('xclip', [ '-selection', 'clipboard' ]);
  }
  // 데이터를 클립보드에 씁니다.
  pbcopy.stdin.write(data);
  // 입력 스트림을 종료합니다.
  pbcopy.stdin.end();
}

/**
 * pasteToClipboard 메서드는 클립보드의 데이터를 가져옵니다.
 * @returns {Buffer} - 클립보드의 데이터
 */
Mother.prototype.pasteToClipboard = function () {
  // os 모듈을 가져옵니다.
  const os = require("os");
  // child_process 모듈에서 execSync 함수를 가져옵니다.
  const { execSync } = require('child_process');
  // stdout 변수를 선언합니다.
  let stdout;
  // 운영체제가 macOS인지 확인합니다.
  if (os.type() === 'Darwin') {
    // macOS인 경우 pbpaste 명령어를 사용합니다.
    stdout = execSync('pbpaste');
  } else {
    // macOS가 아닌 경우 xclip 명령어를 사용합니다.
    stdout = execSync('xclip -selection clipboard -o');
  }
  // 클립보드의 데이터를 반환합니다.
  return stdout;
}

/**
 * equalJson 메서드는 JSON.parse와 같은 기능을 하는 메서드로 주어진 JSON string을 객체로 변환합니다. 다만 JSON.pare와 다른 점은 Date 객체를 string이 아닌 Date instance로 읽는다는 점입니다. 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
 * @param {string|Object} jsonString - JSON 문자열 또는 객체
 * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
 */
Mother.prototype.equalJson = function (jsonString) {
  /**
   * 내부 equal 함수는 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
   * @param {string|Object} jsonString - JSON 문자열 또는 객체
   * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
   */
  const equal = function (jsonString) {
    // jsonString이 객체인 경우 문자열로 변환합니다.
    if (typeof jsonString === "object") {
      jsonString = JSON.stringify(jsonString);
    }
    // jsonString이 문자열이 아닌 경우 문자열로 변환합니다.
    if (typeof jsonString !== "string") {
      jsonString = String(jsonString);
    }
    // JSON 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
    const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { 
      return "new Date(" + p1 + ")"; 
    });
    // 변환된 JSON 문자열을 함수로 만들어 실행합니다.
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    // 함수 실행 결과를 json 변수에 저장합니다.
    const json = tempFunc();
    let temp, boo;
    // json이 객체인 경우
    if (typeof json === "object") {
      // 객체의 각 속성을 순회합니다.
      for (let i in json) {
        // 속성 값이 문자열인 경우
        if (typeof json[i] === "string") {
          // 문자열이 JSON 형식인지 확인합니다.
          if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
            try {
              // 문자열을 JSON 객체로 파싱합니다.
              temp = JSON.parse(json[i]);
              boo = true;
            } catch (e) {
              boo = false;
            }
            // 파싱에 성공한 경우 재귀적으로 equal 함수를 호출합니다.
            if (boo) {
              json[i] = equal(json[i]);
            }
          }
        }
      }
      // 변환된 JSON 객체를 반환합니다.
      return json;
    } else {
      // json이 객체가 아닌 경우 원래의 JSON 문자열을 반환합니다.
      return jsonString;
    }
  }
  // equal 함수를 호출하여 결과를 반환합니다.
  return equal(jsonString);
}

/**
 * capitalizeString 메서드는 주어진 문자열의 첫 글자를 대문자로 변환합니다.
 * @param {string} str - 변환할 문자열
 * @returns {string} - 첫 글자가 대문자로 변환된 문자열
 * @throws {Error} - 입력이 문자열이 아닌 경우 에러를 던집니다.
 */
Mother.prototype.capitalizeString = function (str) {
  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof str !== "string") {
    throw new Error("invalid input");
  }
  // 문자열의 길이가 0 또는 1인 경우
  if (str.length === 0 || str.length === 1) {
    // 문자열의 길이가 0인 경우 빈 문자열을 반환합니다.
    if (str.length === 0) {
      return "";
    }
    // 문자열의 길이가 1인 경우 대문자로 변환하여 반환합니다.
    return str.toUpperCase();
  } else {
    // 문자열의 첫 글자를 대문자로 변환하고 나머지 문자열을 이어붙여 반환합니다.
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}

/**
 * objectDeepCopy 메서드는 주어진 객체를 깊은 복사합니다.
 * @param {Object} obj - 깊은 복사할 객체
 * @returns {Object} - 깊은 복사된 객체
 * @throws {Error} - 입력이 객체가 아닌 경우 에러를 던집니다.
 */
Mother.prototype.objectDeepCopy = function (obj) {
  /**
   * equalJson 함수는 JSON.parse와 같은 기능을 하는 메서드로 주어진 JSON string을 객체로 변환합니다. 다만 JSON.pare와 다른 점은 Date 객체를 string이 아닌 Date instance로 읽는다는 점입니다. 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
   * @param {string|Object} jsonString - JSON 문자열 또는 객체
   * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
   */
  const equalJson = function (jsonString) {
    /**
     * 내부 equal 함수는 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
     * @param {string|Object} jsonString - JSON 문자열 또는 객체
     * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
     */
    const equal = function (jsonString) {
      // jsonString이 객체인 경우 문자열로 변환합니다.
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      // jsonString이 문자열이 아닌 경우 문자열로 변환합니다.
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }
      // JSON 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
      const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { 
        return "new Date(" + p1 + ")"; 
      });
      // 변환된 JSON 문자열을 함수로 만들어 실행합니다.
      const tempFunc = new Function("const obj = " + filtered + "; return obj;");
      // 함수 실행 결과를 json 변수에 저장합니다.
      const json = tempFunc();
      let temp, boo;
      // json이 객체인 경우
      if (typeof json === "object") {
        // 객체의 각 속성을 순회합니다.
        for (let i in json) {
          // 속성 값이 문자열인 경우
          if (typeof json[i] === "string") {
            // 문자열이 JSON 형식인지 확인합니다.
            if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
              try {
                // 문자열을 JSON 객체로 파싱합니다.
                temp = JSON.parse(json[i]);
                boo = true;
              } catch (e) {
                boo = false;
              }
              // 파싱에 성공한 경우 재귀적으로 equal 함수를 호출합니다.
              if (boo) {
                json[i] = equal(json[i]);
              }
            }
          }
        }
        // 변환된 JSON 객체를 반환합니다.
        return json;
      } else {
        // json이 객체가 아닌 경우 원래의 JSON 문자열을 반환합니다.
        return jsonString;
      }
    }
    // equal 함수를 호출하여 결과를 반환합니다.
    return equal(jsonString);
  }
  // 입력이 객체이고 null이 아닌 경우
  if (typeof obj === "object" && obj !== null) {
    // 객체를 JSON 문자열로 변환한 후 equalJson 함수를 호출하여 깊은 복사된 객체를 반환합니다.
    return equalJson(JSON.stringify(obj));
  } else {
    // 입력이 객체가 아닌 경우 에러를 던집니다.
    throw new Error("invalid input");
  }
}

/**
 * hexaJson 메서드는 자바스크립트의 함수를 데이터베이스에 저장하기 위해 만들어진 메서드입니다. JSON안 에 자바스크립트 함수가 있을 때 그 함수만 인코딩해서 데이터베이스에 저장할 수 있게 해주는 기능과 인코딩된 함수를 디코딩 하는 역할까지 수행하는 메서드입니다.
 * @param {Function|Object|string} input - 암호화 또는 복호화할 입력
 * @param {boolean} [middleMode=false] - 중간 모드 여부
 * @returns {Promise<Function|Object|string|null>} - 암호화 또는 복호화된 결과
 */
Mother.prototype.hexaJson = async function (input, middleMode = false) {
  // 비동기 함수의 생성자를 가져옵니다.
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  
  // 함수 시작과 끝을 나타내는 토큰을 정의합니다.
  const tokenStart = "__hexaFunctionStart__<<<";
  const tokenEnd = ">>>__hexaFunctionEnd__";
  
  /**
   * hexaFunction 함수는 입력된 함수나 문자열을 암호화하거나 복호화합니다.
   * @param {Function|string} input - 암호화 또는 복호화할 입력
   * @returns {Promise<string|Function>} - 암호화된 문자열 또는 복호화된 함수
   */
  const hexaFunction = async function (input) {
    try {
      // crypto 모듈을 불러옵니다.
      const crypto = require("crypto");
      const password = "homeliaison"; // 암호화에 사용할 비밀번호
      const algorithm = "aes-192-cbc"; // 암호화 알고리즘
      const iv = Buffer.alloc(16, 0); // 초기화 벡터
      const digest = "hex"; // 해시 다이제스트 형식

      /**
       * 문자열을 암호화하여 헥사 문자열로 변환합니다.
       * @param {string} string - 암호화할 문자열
       * @returns {Promise<string>} - 암호화된 헥사 문자열
       */
      const toHex = (string) => {
        return new Promise((resolve, reject) => {
          // scrypt 함수를 사용하여 키를 생성합니다.
          crypto.scrypt(password, "salt", 24, (err, key) => {
            if (err) {
              reject(err);
            } else {
              // 암호화 객체를 생성합니다.
              const cipher = crypto.createCipheriv(algorithm, key, iv);
              let encrypted = '';
              cipher.setEncoding(digest);
              cipher.on("data", (chunk) => { encrypted += chunk; });
              cipher.on("end", () => { resolve(encrypted); });
              cipher.write(string);
              cipher.end();
            }
          });
        });
      }

      /**
       * 헥사 문자열을 복호화하여 함수 문자열로 변환합니다.
       * @param {string} hash - 복호화할 헥사 문자열
       * @returns {Promise<string>} - 복호화된 함수 문자열
       */
      const toFunction = (hash) => {
        return new Promise((resolve, reject) => {
          // scrypt 함수를 사용하여 키를 생성합니다.
          crypto.scrypt(password, "salt", 24, (err, key) => {
            if (err) {
              reject(err);
            } else {
              // 복호화 객체를 생성합니다.
              const decipher = crypto.createDecipheriv(algorithm, key, iv);
              let decrypted = '';
              decipher.on("readable", () => {
                let chunk;
                chunk = decipher.read();
                while (chunk !== null) {
                  decrypted += chunk.toString("utf8");
                  chunk = decipher.read();
                }
              });
              decipher.on("end", () => { resolve(decrypted); });
              decipher.write(hash, digest);
              decipher.end();
            }
          });
        });
      }

      let functionString, functionString_copied;
      let argString;
      let argArr;
      let decodeFunction;
      let asyncBoo;

      // 입력이 함수인 경우
      if (typeof input === "function") {
        // 함수를 문자열로 변환한 후 암호화하여 반환합니다.
        return tokenStart + (await toHex(input.toString())) + tokenEnd;
      } else if (typeof input === "string") {
        // 입력이 문자열인 경우
        if ((new RegExp('^' + tokenStart)).test(input) && (new RegExp(tokenEnd + '$')).test(input)) {
          // 문자열이 암호화된 함수인 경우 복호화합니다.
          input = input.replace(new RegExp('^' + tokenStart), '').replace(new RegExp(tokenEnd + '$'), '');
          functionString = await toFunction(input);
          functionString_copied = String(functionString).trim();
          argString = '';
          asyncBoo = /^async/.test(functionString_copied);
          if (/^(async function|function)/i.test(functionString_copied)) {
            functionString_copied.replace(/^(async function|function) [^\(]*\(([^\)]*)\)[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          } else {
            functionString_copied.replace(/^(async \(|\()([^\)]*)\)[ ]*\=\>[ ]*\{/, (match, p1, p2) => {
              argString = p2.trim();
              return '';
            });
          }
          argString = argString.replace(/[ ]*\=[ ]*[\{\[][^\=]*[\}\]]/gi, '');
          argString = argString.replace(/[ ]*\=[ ]*[^,]+/gi, '');
          argArr = argString.split(',').map((str) => { return str.trim(); });
          if (argArr.some((str) => { return / /gi.test(str); })) {
            throw new Error("invaild argument name");
          }
          if (asyncBoo) {
            decodeFunction = new AsyncFunction(...argArr, functionString.trim().replace(/^(async function [^\(]*\([^\)]*\)[ ]*\{|async \([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          } else {
            decodeFunction = new Function(...argArr, functionString.trim().replace(/^(function [^\\(]*\([^\)]*\)[ ]*\{|\([^\)]*\)[ ]*\=\>[ ]*\{)/, '').replace(/\}$/, ''));
          }
          return decodeFunction;
        } else {
          return input;
        }
      } else {
        throw new Error("invaild input");
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * equalJson 함수는 JSON.parse와 같은 기능을 하는 메서드로 주어진 JSON string을 객체로 변환합니다. 다만 JSON.pare와 다른 점은 Date 객체를 string이 아닌 Date instance로 읽는다는 점입니다. 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
   * @param {string|Object} jsonString - JSON 문자열 또는 객체
   * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
   */
  const equalJson = function (jsonString) {
    /**
     * 내부 equal 함수는 주어진 JSON 문자열을 파싱하고, 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
     * @param {string|Object} jsonString - JSON 문자열 또는 객체
     * @returns {Object|string} - 파싱된 JSON 객체 또는 원래의 JSON 문자열
     */
    const equal = function (jsonString) {
      // jsonString이 객체인 경우 문자열로 변환합니다.
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      // jsonString이 문자열이 아닌 경우 문자열로 변환합니다.
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }
      // JSON 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
      const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { 
        return "new Date(" + p1 + ")"; 
      });
      // 변환된 JSON 문자열을 함수로 만들어 실행합니다.
      const tempFunc = new Function("const obj = " + filtered + "; return obj;");
      // 함수 실행 결과를 json 변수에 저장합니다.
      const json = tempFunc();
      let temp, boo;
      // json이 객체인 경우
      if (typeof json === "object") {
        // 객체의 각 속성을 순회합니다.
        for (let i in json) {
          // 속성 값이 문자열인 경우
          if (typeof json[i] === "string") {
            // 문자열이 JSON 형식인지 확인합니다.
            if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
              try {
                // 문자열을 JSON 객체로 파싱합니다.
                temp = JSON.parse(json[i]);
                boo = true;
              } catch (e) {
                boo = false;
              }
              // 파싱에 성공한 경우 재귀적으로 equal 함수를 호출합니다.
              if (boo) {
                json[i] = equal(json[i]);
              }
            }
          }
        }
        // 변환된 JSON 객체를 반환합니다.
        return json;
      } else {
        // json이 객체가 아닌 경우 원래의 JSON 문자열을 반환합니다.
        return jsonString;
      }
    }
    // equal 함수를 호출하여 결과를 반환합니다.
    return equal(jsonString);
  }

  try {
    // 입력이 함수인 경우
    if (typeof input === "function") {
      // hexaFunction 함수를 호출하여 암호화된 문자열을 반환합니다.
      return await hexaFunction(input);
    } else if (typeof input === "object") {
      // 입력이 객체인 경우
      if (input === null) {
        return null;
      } else {
        /**
         * toJson 함수는 객체의 각 속성을 순회하며 함수인 경우 암호화합니다.
         * @param {Object} obj - 순회할 객체
         * @returns {Promise<Object>} - 암호화된 객체
         */
        const toJson = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "function") {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toJson(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        // middleMode가 false인 경우 JSON 문자열로 변환하여 반환합니다.
        if (!middleMode) {
          return JSON.stringify(await toJson(input));
        } else {
          // middleMode가 true인 경우 객체를 반환합니다.
          return await toJson(input);
        }
      }
    } else if (typeof input === "string") {
      // 입력이 문자열인 경우
      if ((new RegExp('^' + tokenStart)).test(input)) {
        // 문자열이 암호화된 함수인 경우 복호화합니다.
        return await hexaFunction(input);
      } else {
        /**
         * toObj 함수는 객체의 각 속성을 순회하며 암호화된 문자열인 경우 복호화합니다.
         * @param {Object} obj - 순회할 객체
         * @returns {Promise<Object>} - 복호화된 객체
         */
        const toObj = async function (obj) {
          try {
            for (let i in obj) {
              if (typeof obj[i] === "string" && (new RegExp('^' + tokenStart)).test(obj[i])) {
                obj[i] = await hexaFunction(obj[i]);
              } else if (typeof obj[i] === "object" && obj[i] !== null) {
                obj[i] = await toObj(obj[i]);
              }
            }
            return obj;
          } catch (e) {
            return obj;
          }
        }
        // equalJson 함수를 호출하여 JSON 객체로 변환한 후 toObj 함수를 호출하여 복호화된 객체를 반환합니다.
        return await toObj(equalJson(input));
      }
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * copyJson 메서드는 주어진 객체를 깊은 복사합니다.
 * @param {Object} obj - 깊은 복사할 객체
 * @returns {Object} - 깊은 복사된 객체
 * @throws {Error} - 입력이 객체가 아닌 경우 에러를 던집니다.
 */
Mother.prototype.copyJson = function (obj) {
  // 입력이 객체가 아닌 경우 에러를 던집니다.
  if (typeof obj !== "object") {
    throw new Error("must be object input");
  }
  // 객체를 JSON 문자열로 변환합니다.
  const jsonString = JSON.stringify(obj);
  // JSON 문자열 내의 날짜 형식을 Date 객체로 변환합니다.
  const filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { 
    return "new Date(" + p1 + ")"; 
  });
  // 변환된 JSON 문자열을 함수로 만들어 실행합니다.
  const tempFunc = new Function("const obj = " + filtered + "; return obj;");
  // 함수 실행 결과를 json 변수에 저장합니다.
  const json = tempFunc();
  // 깊은 복사된 객체를 반환합니다.
  return json;
}

/**
 * autoComma 메서드는 주어진 숫자 문자열에 천 단위로 콤마를 추가합니다.
 * @param {string|number} str - 콤마를 추가할 숫자 문자열 또는 숫자
 * @param {boolean} [manVersion=false] - 만 단위로 변환할지 여부
 * @returns {string} - 콤마가 추가된 숫자 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.autoComma = function (str, manVersion = false) {
  let minus;
  let count, countArr;
  let temp, tempArr;
  // 입력이 숫자인 경우 문자열로 변환합니다.
  if (typeof str === "number") {
    str = String(Math.floor(str));
  }
  // 입력이 지수 표기법인 경우 에러를 던집니다.
  if (/e/gi.test(str)) {
    throw new Error("is too heavy");
  }
  // 입력이 음수인 경우 음수 기호를 저장합니다.
  minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';
  // 숫자가 아닌 문자를 제거합니다.
  str = str.replace(/[^0-9]/g, '');
  // 입력이 빈 문자열인 경우 에러를 던집니다.
  if (str === '') {
    throw new Error("invaild number");
  }
  // 만 단위로 변환할지 여부에 따라 숫자를 변환합니다.
  if (manVersion) {
    str = String(Math.floor(Number(str) / 10000));
  }
  // 숫자의 길이를 3으로 나눈 값을 올림하여 count에 저장합니다.
  count = Math.ceil(str.length / 3);
  countArr = [];
  // count만큼 반복하여 3자리씩 나눌 인덱스를 countArr에 저장합니다.
  for (let i = 0; i < count; i++) {
    countArr.push([ 3 * i, 3 * (i + 1) ]);
  }
  // countArr이 빈 배열인 경우 에러를 던집니다.
  if (countArr.length === 0) {
    throw new Error("invaild number");
  }
  tempArr = [];
  // countArr을 순회하며 각 구간의 숫자를 tempArr에 저장합니다.
  for (let arr of countArr) {
    temp = '';
    for (let i = arr[0]; i < arr[1]; i++) {
      if (str.length - 1 - i < 0) {
        temp += '';
      } else {
        temp = str[str.length - 1 - i] + temp;
      }
    }
    if (temp !== '') {
      tempArr.unshift(temp);
    }
  }
  // 만 단위로 변환할지 여부에 따라 결과를 반환합니다.
  if (manVersion) {
    return (minus + tempArr.join(',')) + "만";
  } else {
    return (minus + tempArr.join(','));
  }
}

/**
 * dateToString 메서드는 주어진 Date 객체를 문자열로 변환합니다.
 * @param {Date} date - 변환할 Date 객체
 * @param {boolean} [detail=false] - 상세 정보를 포함할지 여부
 * @param {boolean} [dayOption=false] - 요일 정보를 포함할지 여부
 * @returns {string} - 변환된 날짜 문자열
 * @throws {Error} - 입력이 Date 객체가 아닌 경우 에러를 던집니다.
 */
Mother.prototype.dateToString = function (date, detail = false, dayOption = false) {
  // 요일 정보를 저장한 배열입니다.
  const dayday = [ '일', '월', '화', '수', '목', '금', '토' ];
  // 입력이 Date 객체가 아닌 경우 에러를 던집니다.
  if (!(date instanceof Date)) {
    console.log(date);
    throw new Error("invaild input");
  }
  // detail이 undefined 또는 null인 경우 false로 설정합니다.
  if (detail === undefined || detail === null) {
    detail = false;
  }
  // detail이 boolean 타입이 아닌 경우 에러를 던집니다.
  if (typeof detail !== "boolean") {
    throw new Error("second input must be boolean");
  }
  // 숫자가 10보다 작은 경우 앞에 0을 추가하는 함수입니다.
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  // 빈 날짜 값을 나타내는 상수입니다.
  const emptyDateValue = (new Date(1900, 0, 1)).valueOf();
  // 미래 날짜 값을 나타내는 상수입니다.
  const futureDateValue = (new Date(3000, 0, 1)).valueOf();
  // 날짜 값이 빈 날짜 값 이하인 경우 "해당 없음"을 반환합니다.
  if (date.valueOf() <= emptyDateValue) {
    return "해당 없음";
  // 날짜 값이 미래 날짜 값 이상인 경우 "예정"을 반환합니다.
  } else if (date.valueOf() >= futureDateValue) {
    return "예정";
  } else {
    // detail이 false인 경우 연-월-일 형식으로 반환합니다.
    if (!detail) {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
    } else {
      // dayOption이 true인 경우 연-월-일 시:분:초 요일 형식으로 반환합니다.
      if (dayOption) {
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())} ${dayday[date.getDay()]}요일`;
      } else {
        // dayOption이 false인 경우 연-월-일 시:분:초 형식으로 반환합니다.
        return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
      }
    }
  }
}

/**
 * dateToHangul 메서드는 주어진 Date 객체를 한글 형식의 날짜 문자열로 변환합니다.
 * @param {Date} date - 변환할 Date 객체
 * @param {boolean} [shortYear=false] - 연도를 두 자리로 표시할지 여부
 * @returns {string} - 변환된 한글 형식의 날짜 문자열
 * @throws {Error} - 입력이 Date 객체가 아닌 경우 에러를 던집니다.
 */
Mother.prototype.dateToHangul = function (date, shortYear = false) {
  // 입력이 Date 객체가 아닌 경우 에러를 던집니다.
  if (!(date instanceof Date)) {
    console.log(date);
    throw new Error("invaild input");
  }
  // 빈 날짜 값을 나타내는 상수입니다.
  const emptyDateValue = (new Date(1900, 0, 1)).valueOf();
  // 미래 날짜 값을 나타내는 상수입니다.
  const futureDateValue = (new Date(3000, 0, 1)).valueOf();
  // 날짜 값이 빈 날짜 값 이하인 경우 "해당 없음"을 반환합니다.
  if (date.valueOf() <= emptyDateValue) {
    return "해당 없음";
  // 날짜 값이 미래 날짜 값 이상인 경우 "예정"을 반환합니다.
  } else if (date.valueOf() >= futureDateValue) {
    return "예정";
  } else {
    // shortYear가 true인 경우 연도를 두 자리로 표시합니다.
    if (shortYear) {
      return `${String(date.getFullYear()).slice(2)}년 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
    } else {
      // shortYear가 false인 경우 연도를 네 자리로 표시합니다.
      return `${String(date.getFullYear())}년 ${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
    }
  }
}

/**
 * stringToDate 메서드는 주어진 문자열을 Date 객체로 변환합니다.
 * @param {string|number|Date} str - 변환할 문자열, 숫자 또는 Date 객체
 * @returns {Date} - 변환된 Date 객체
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.stringToDate = function (str) {
  // 입력이 Date 객체인 경우 그대로 반환합니다.
  if (str instanceof Date) return str;

  // 입력이 숫자인 경우 Date 객체로 변환하여 반환합니다.
  if (typeof str === "number") return new Date(str);

  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof str !== "string") throw new Error("invalid input");

  // 문자열의 앞뒤 공백을 제거하고, 특정 문자를 제거합니다.
  str = str.trim().replace(/[\~\t]/gi, '').trim();

  // 입력이 빈 문자열, '-' 또는 '없음'인 경우 특정 날짜를 반환합니다.
  if (str === '' || str === '-' || /없음/gi.test(str)) return new Date(1800, 0, 1);

  // 입력이 '예정', '진행중' 또는 '미정'인 경우 특정 날짜를 반환합니다.
  if (str === "예정" || str === "진행중" || str === "미정") return new Date(3800, 0, 1);

  // 숫자가 10보다 작은 경우 앞에 0을 추가하는 함수입니다.
  const zeroAddition = num => (num < 10 ? `0${num}` : String(num));

  // 연, 월, 일을 받아 Date 객체를 생성하는 함수입니다.
  const parseDate = (year, month = 1, day = 1) => new Date(Number(year), Number(month) - 1, Number(day));

  // ISO 8601 형식의 문자열인 경우 Date 객체로 변환하여 반환합니다.
  if (/T/.test(str) && /Z$/.test(str) && /^[0-9]/.test(str) && /-/.test(str) && /:/.test(str)) {
    const date = new Date(str);
    if (!isNaN(date.getTime())) return date;
  }

  // 다양한 날짜 형식을 처리하기 위한 패턴과 핸들러를 정의합니다.
  const patterns = [
    // 'YY-MM-DD' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{2} *- *[0-9]{2} *- *[0-9]{2}$/, handler: s => `20${s.split('-').map(p => p.trim()).join('-')}` },
    // 'YYYY-MM' 형식을 'YYYY-MM-01'로 변환합니다.
    { regex: /^[0-9]{4} *- *[0-9]{2}$/, handler: s => `${s.split('-').map(p => p.trim()).join('-')}-01` },
    // 'YY-MM' 형식을 '20YY-MM-01'로 변환합니다.
    { regex: /^[0-9]{2} *- *[0-9]{2}$/, handler: s => `20${s.split('-').map(p => p.trim()).join('-')}-01` },
    // 'YY년 MM월 DD일' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{2} *년 *[0-9]/, handler: s => {
      const [year, rest] = s.split('년').map(p => p.trim());
      const [month, day] = rest.includes('월') ? rest.split('월').map(p => p.trim().replace(/[^0-9]/g, '')) : [rest.replace(/[^0-9]/g, ''), '01'];
      return `20${year}-${zeroAddition(month)}-${zeroAddition(day)}`;
    }},
    // 'YYYY년 MM월 DD일' 형식을 'YYYY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{4} *년 *[0-9]/, handler: s => {
      const [year, rest] = s.split('년').map(p => p.trim());
      const [month, day] = rest.includes('월') ? rest.split('월').map(p => p.trim().replace(/[^0-9]/g, '')) : [rest.replace(/[^0-9]/g, ''), '01'];
      return `${year}-${zeroAddition(month)}-${zeroAddition(day)}`;
    }},
    // 'YYYYMMDD' 형식을 'YYYY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{8}$/, handler: s => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}` },
    // 'YYMMDD' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{6}$/, handler: s => `20${s.slice(0, 2)}-${s.slice(2, 4)}-${s.slice(4)}` },
    // 'YY-M' 형식을 '20YY-M-01'로 변환합니다.
    { regex: /^[0-9]{2} *- *[0-9]$/, handler: s => `20${s.split('-').map(p => p.trim()).join('-')}-01` },
    // 'YYYY-M' 형식을 'YYYY-M-01'로 변환합니다.
    { regex: /^[0-9]{4} *- *[0-9]$/, handler: s => `${s.split('-').map(p => p.trim()).join('-')}-01` },
    // 'YY MM' 형식을 '20YY-MM-01'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9]{2}$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}-01` },
    // 'YYYY M' 형식을 'YYYY-M-01'로 변환합니다.
    { regex: /^[0-9]{4} +[0-9]$/, handler: s => `${s.split(' ').map(p => p.trim()).join('-')}-01` },
    // 'YY M' 형식을 '20YY-M-01'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9]$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}-01` },
    // 'YYYY MM DD' 형식을 'YYYY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{4} +[0-9]{2} +[0-9]{2}$/, handler: s => s.split(' ').map(p => p.trim()).join('-') },
    // 'YYYY M DD' 형식을 'YYYY-M-DD'로 변환합니다.
    { regex: /^[0-9]{4} +[0-9] +[0-9]{2}$/, handler: s => s.split(' ').map(p => p.trim()).join('-') },
    // 'YYYY MM D' 형식을 'YYYY-MM-D'로 변환합니다.
    { regex: /^[0-9]{4} +[0-9]{2} +[0-9]$/, handler: s => s.split(' ').map(p => p.trim()).join('-') },
    // 'YYYY M D' 형식을 'YYYY-M-D'로 변환합니다.
    { regex: /^[0-9]{4} +[0-9] +[0-9]$/, handler: s => s.split(' ').map(p => p.trim()).join('-') },
    // 'YY MM DD' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9]{2} +[0-9]{2}$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}` },
    // 'YY M DD' 형식을 '20YY-M-DD'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9] +[0-9]{2}$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}` },
    // 'YY MM D' 형식을 '20YY-MM-D'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9]{2} +[0-9]$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}` },
    // 'YY M D' 형식을 '20YY-M-D'로 변환합니다.
    { regex: /^[0-9]{2} +[0-9] +[0-9]$/, handler: s => `20${s.split(' ').map(p => p.trim()).join('-')}` },
    // 'YY/MM' 형식을 '20YY-MM-01'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9]{2}$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}-01` },
    // 'YYYY/MM' 형식을 'YYYY-MM-01'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9]{2}$/, handler: s => `${s.split('/').map(p => p.trim()).join('-')}-01` },
    // 'YY/M' 형식을 '20YY-M-01'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9]$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}-01` },
    // 'YYYY/M' 형식을 'YYYY-M-01'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9]$/, handler: s => `${s.split('/').map(p => p.trim()).join('-')}-01` },
    // 'YYYY/MM/DD' 형식을 'YYYY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9]{2} *\/ *[0-9]{2}$/, handler: s => s.split('/').map(p => p.trim()).join('-') },
    // 'YYYY/M/DD' 형식을 'YYYY-M-DD'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9] *\/ *[0-9]{2}$/, handler: s => s.split('/').map(p => p.trim()).join('-') },
    // 'YYYY/MM/D' 형식을 'YYYY-MM-D'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9]{2} *\/ *[0-9]$/, handler: s => s.split('/').map(p => p.trim()).join('-') },
    // 'YYYY/M/D' 형식을 'YYYY-M-D'로 변환합니다.
    { regex: /^[0-9]{4} *\/ *[0-9] *\/ *[0-9]$/, handler: s => s.split('/').map(p => p.trim()).join('-') },
    // 'YY/MM/DD' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9]{2} *\/ *[0-9]{2}$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}` },
    // 'YY/M/DD' 형식을 '20YY-M-DD'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9] *\/ *[0-9]{2}$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}` },
    // 'YY/MM/D' 형식을 '20YY-MM-D'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9]{2} *\/ *[0-9]$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}` },
    // 'YY/M/D' 형식을 '20YY-M-D'로 변환합니다.
    { regex: /^[0-9]{2} *\/ *[0-9] *\/ *[0-9]$/, handler: s => `20${s.split('/').map(p => p.trim()).join('-')}` },
    // 'YY.MM' 형식을 '20YY-MM-01'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9]{2} *\.? *$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}-01` },
    // 'YYYY.MM' 형식을 'YYYY-MM-01'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9]{2} *\.? *$/, handler: s => `${s.split('.').map(p => p.trim()).join('-')}-01` },
    // 'YY.M' 형식을 '20YY-M-01'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9] *\.? *$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}-01` },
    // 'YYYY.M' 형식을 'YYYY-M-01'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9] *\.? *$/, handler: s => `${s.split('.').map(p => p.trim()).join('-')}-01` },
    // 'YYYY.MM.DD' 형식을 'YYYY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9]{2} *\. *[0-9]{2}$/, handler: s => s.split('.').map(p => p.trim()).join('-') },
    // 'YYYY.M.DD' 형식을 'YYYY-M-DD'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9] *\. *[0-9]{2}$/, handler: s => s.split('.').map(p => p.trim()).join('-') },
    // 'YYYY.MM.D' 형식을 'YYYY-MM-D'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9]{2} *\. *[0-9]$/, handler: s => s.split('.').map(p => p.trim()).join('-') },
    // 'YYYY.M.D' 형식을 'YYYY-M-D'로 변환합니다.
    { regex: /^[0-9]{4} *\. *[0-9] *\. *[0-9]$/, handler: s => s.split('.').map(p => p.trim()).join('-') },
    // 'YY.MM.DD' 형식을 '20YY-MM-DD'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9]{2} *\. *[0-9]{2}$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}` },
    // 'YY.M.DD' 형식을 '20YY-M-DD'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9] *\. *[0-9]{2}$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}` },
    // 'YY.MM.D' 형식을 '20YY-MM-D'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9]{2} *\. *[0-9]$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}` },
    // 'YY.M.D' 형식을 '20YY-M-D'로 변환합니다.
    { regex: /^[0-9]{2} *\. *[0-9] *\. *[0-9]$/, handler: s => `20${s.split('.').map(p => p.trim()).join('-')}` }
  ];

  // 패턴을 순회하며 입력 문자열이 패턴과 일치하는지 확인하고, 일치하면 핸들러를 통해 변환합니다.
  for (const { regex, handler } of patterns) {
    if (regex.test(str)) {
      str = handler(str);
      break;
    }
  }

  // 변환된 문자열이 유효한 날짜 형식인지 확인합니다.
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(str) && !/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(str)) {
    throw new Error("not date string : " + str);
  }

  // 날짜와 시간을 분리하여 각각의 값을 추출합니다.
  const [datePart, timePart] = str.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  // 시간이 없는 경우 날짜만으로 Date 객체를 생성하여 반환합니다.
  if (!timePart) {
    return parseDate(year, month, day);
  }

  // 시간이 있는 경우 시간까지 포함하여 Date 객체를 생성하여 반환합니다.
  const [hour, minute, second] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

/**
 * linkToString 메서드는 주어진 링크 문자열을 특정 토큰으로 변환합니다.
 * @param {string} link - 변환할 링크 문자열
 * @returns {string} - 변환된 링크 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.linkToString = function (link) {
  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof link !== "string") {
    throw new Error("invalid input");
  }

  // 주어진 이름을 토큰 형식으로 변환하는 함수입니다.
  const nameToToken = (name) => { return `_____${name}_____` }

  // 변환할 토큰들을 정의합니다.
  const tokens = {
    equal: nameToToken("equal"),
    amp: nameToToken("amp"),
    question: nameToToken("question"),
    hypen: nameToToken("hypen"),
    slash: nameToToken("slash"),
    colon: nameToToken("colon"),
    back: nameToToken("back"),
    sharp: nameToToken("sharp"),
    plus: nameToToken("plus"),
    percent: nameToToken("percent"),
    dot: nameToToken("dot"),
    wave: nameToToken("wave"),
    hat: nameToToken("hat"),
  }

  // 링크를 구성하는 요소들을 선언합니다.
  let linkArr;
  let protocol;
  let host;
  let pathName;
  let search;
  let getObj;
  let filteredLink;

  // 링크가 http로 시작하지 않는 경우
  if (!/^http/.test(link)) {
    // 링크를 경로로 간주하고 각 부분을 인코딩합니다.
    pathName = link;
    pathName = pathName.split("/").map((str) => { return globalThis.encodeURIComponent(str) }).join("/");
    filteredLink = pathName;
  } else {
    // 링크를 '/'로 분리하여 배열로 만듭니다.
    linkArr = link.split("/");
    if (linkArr.length < 3) {
      throw new Error("invalid link");
    }
    // 프로토콜과 호스트를 추출합니다.
    protocol = linkArr[0].replace(/[\:]/gi, '');
    host = linkArr[2];
    pathName = "/" + linkArr.slice(3).join("/");

    // 경로에 '?'가 있는지 확인하고, 있다면 검색 문자열을 분리합니다.
    if (/[\?]/gi.test(pathName)) {
      search = pathName.split("?")[1];
      pathName = pathName.split("?")[0];
    } else {
      search = "";
    }

    // 검색 문자열을 객체로 변환합니다.
    if (search !== "") {
      getObj = search.split("&").map((str) => { return { key: str.split("=")[0], value: str.split("=")[1] } });
    } else {
      getObj = [];
    }

    // 경로의 각 부분을 인코딩합니다.
    pathName = pathName.split("/").map((str) => { return globalThis.encodeURIComponent(str) }).join("/");

    // 검색 문자열이 비어있는지 확인하고, 최종 링크를 구성합니다.
    if (getObj.map((obj) => { return `${obj.key}=${obj.value}` }).join("&") === '') {
      filteredLink = protocol + "://" + host + pathName;
    } else {
      filteredLink = protocol + "://" + host + pathName + "?" + getObj.map((obj) => { return `${obj.key}=${obj.value}` }).join("&");
    }
  }

  // 링크의 특정 문자를 토큰으로 변환합니다.
  filteredLink = filteredLink.replace(/[\=]/gi, tokens.equal);
  filteredLink = filteredLink.replace(/[\&]/gi, tokens.amp);
  filteredLink = filteredLink.replace(/[\?]/gi, tokens.question);
  filteredLink = filteredLink.replace(/[\-]/gi, tokens.hypen);
  filteredLink = filteredLink.replace(/[\/]/gi, tokens.slash);
  filteredLink = filteredLink.replace(/[\:]/gi, tokens.colon);
  filteredLink = filteredLink.replace(/[\\]/gi, tokens.back);
  filteredLink = filteredLink.replace(/[\#]/gi, tokens.sharp);
  filteredLink = filteredLink.replace(/[\+]/gi, tokens.plus);
  filteredLink = filteredLink.replace(/[\%]/gi, tokens.percent);
  filteredLink = filteredLink.replace(/[\.]/gi, tokens.dot);
  filteredLink = filteredLink.replace(/[\~]/gi, tokens.wave);
  filteredLink = filteredLink.replace(/[\^]/gi, tokens.hat);

  // 변환된 링크를 반환합니다.
  return filteredLink;
}

/**
 * stringToLink 메서드는 주어진 토큰화된 문자열을 원래의 링크 문자열로 변환합니다.
 * @param {string} string - 변환할 토큰화된 문자열
 * @returns {string} - 변환된 링크 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.stringToLink = function (string) {
  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof string !== "string") {
    console.log(string);
    throw new Error("invalid input");
  }

  // 주어진 이름을 토큰 형식으로 변환하는 함수입니다.
  const nameToToken = (name) => { return `_____${name}_____` }

  // 변환할 토큰들을 정의합니다.
  const tokens = {
    equal: nameToToken("equal"),
    amp: nameToToken("amp"),
    question: nameToToken("question"),
    hypen: nameToToken("hypen"),
    slash: nameToToken("slash"),
    colon: nameToToken("colon"),
    back: nameToToken("back"),
    sharp: nameToToken("sharp"),
    plus: nameToToken("plus"),
    percent: nameToToken("percent"),
    dot: nameToToken("dot"),
    wave: nameToToken("wave"),
    hat: nameToToken("hat"),
  }

  // 변환할 문자열을 초기화합니다.
  let filteredLink = string;

  // 토큰을 원래의 문자로 변환합니다.
  filteredLink = filteredLink.replace(new RegExp(tokens.equal, "gi"), "=");
  filteredLink = filteredLink.replace(new RegExp(tokens.amp, "gi"), "&");
  filteredLink = filteredLink.replace(new RegExp(tokens.question, "gi"), "?");
  filteredLink = filteredLink.replace(new RegExp(tokens.hypen, "gi"), "-");
  filteredLink = filteredLink.replace(new RegExp(tokens.slash, "gi"), "/");
  filteredLink = filteredLink.replace(new RegExp(tokens.colon, "gi"), ":");
  filteredLink = filteredLink.replace(new RegExp(tokens.back, "gi"), "\\");
  filteredLink = filteredLink.replace(new RegExp(tokens.sharp, "gi"), "#");
  filteredLink = filteredLink.replace(new RegExp(tokens.plus, "gi"), "+");
  filteredLink = filteredLink.replace(new RegExp(tokens.percent, "gi"), "%");
  filteredLink = filteredLink.replace(new RegExp(tokens.dot, "gi"), ".");
  filteredLink = filteredLink.replace(new RegExp(tokens.wave, "gi"), "~");
  filteredLink = filteredLink.replace(new RegExp(tokens.hat, "gi"), "^");

  // 변환된 링크를 반환합니다.
  return filteredLink;
}

/**
 * jsonToString 메서드는 주어진 JSON 객체를 특정 토큰으로 변환된 문자열로 변환합니다.
 * @param {string|object} json - 변환할 JSON 객체 또는 문자열
 * @returns {string} - 변환된 JSON 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.jsonToString = function (json) {
  // 입력이 문자열이나 객체가 아닌 경우 에러를 던집니다.
  if (typeof json !== "string" && typeof json !== "object") {
    throw new Error("invalid input");
  }

  // 입력이 null인 경우 에러를 던집니다.
  if (json === null) {
    throw new Error("invalid input2");
  }

  // 입력이 객체인 경우
  if (typeof json === "object") {
    // 객체에 _id 속성이 있으면 삭제합니다.
    if (json._id !== undefined) {
      delete json._id;
    }
    // 객체를 JSON 문자열로 변환합니다.
    json = JSON.stringify(json);
  }

  // 주어진 이름을 토큰 형식으로 변환하는 함수입니다.
  const nameToToken = (name) => { return `_____${name}_____` }

  // 변환할 토큰들을 정의합니다.
  const tokens = {
    colon: nameToToken("colon"),
    middler: nameToToken("middler"),
    middlel: nameToToken("middlel"),
    bigr: nameToToken("bigr"),
    bigl: nameToToken("bigl"),
    back: nameToToken("back"),
    double: nameToToken("double"),
  }

  // 변환할 JSON 문자열을 초기화합니다.
  let filteredJson = json;

  // JSON 문자열의 특정 문자를 토큰으로 변환합니다.
  filteredJson = filteredJson.replace(/[\:]/gi, tokens.colon);
  filteredJson = filteredJson.replace(/[\}]/gi, tokens.middler);
  filteredJson = filteredJson.replace(/[\{]/gi, tokens.middlel);
  filteredJson = filteredJson.replace(/[\]]/gi, tokens.bigr);
  filteredJson = filteredJson.replace(/[\[]/gi, tokens.bigl);
  filteredJson = filteredJson.replace(/[\\]/gi, tokens.back);
  filteredJson = filteredJson.replace(/[\"]/gi, tokens.double);

  // 변환된 JSON 문자열을 반환합니다.
  return filteredJson;
}

/**
 * stringToJson 메서드는 주어진 문자열을 JSON 객체로 변환합니다.
 * @param {string} string - 변환할 문자열
 * @returns {object|string} - 변환된 JSON 객체 또는 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.stringToJson = function (string) {
  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof string !== "string") {
    throw new Error("invalid input");
  }

  /**
   * equalJson 함수는 주어진 JSON 문자열을 파싱하여 객체로 변환합니다.
   * @param {string} jsonString - 변환할 JSON 문자열
   * @returns {object} - 변환된 JSON 객체
   */
  const equalJson = function (jsonString) {
    /**
     * equal 함수는 JSON 문자열을 파싱하여 객체로 변환합니다.
     * @param {string} jsonString - 변환할 JSON 문자열
     * @returns {object} - 변환된 JSON 객체
     */
    const equal = function (jsonString) {
      // 입력이 객체인 경우 JSON 문자열로 변환합니다.
      if (typeof jsonString === "object") {
        jsonString = JSON.stringify(jsonString);
      }
      // 입력이 문자열이 아닌 경우 문자열로 변환합니다.
      if (typeof jsonString !== "string") {
        jsonString = String(jsonString);
      }

      // JSON 문자열에서 특정 패턴을 찾아 변환합니다.
      let filtered;
      filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
      filtered = filtered.replace(/nbsp\;/g, "&nbsp;");
      filtered = filtered.replace(/\&\&nbsp\;/g, "&nbsp;");

      // 변환된 문자열을 함수로 실행하여 객체로 변환합니다.
      const tempFunc = new Function("const obj = " + filtered + "; return obj;");
      const json = tempFunc();

      // JSON 객체의 각 속성을 순회하며 재귀적으로 변환합니다.
      let temp, boo;
      if (typeof json === "object") {
        for (let i in json) {
          if (typeof json[i] === "string") {
            if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
              try {
                temp = JSON.parse(json[i]);
                boo = true;
              } catch (e) {
                boo = false;
              }
              if (boo) {
                json[i] = equal(json[i]);
              }
            }
          }
        }
        return json;
      } else {
        return jsonString;
      }
    }
    return equal(jsonString);
  }

  // 주어진 이름을 토큰 형식으로 변환하는 함수입니다.
  const nameToToken = (name) => { return `_____${name}_____` }

  // 변환할 토큰들을 정의합니다.
  const tokens = {
    colon: nameToToken("colon"),
    middler: nameToToken("middler"),
    middlel: nameToToken("middlel"),
    bigr: nameToToken("bigr"),
    bigl: nameToToken("bigl"),
    back: nameToToken("back"),
    double: nameToToken("double"),
  }

  // 변환할 JSON 문자열을 초기화합니다.
  let filteredJson = string;

  // JSON 문자열의 특정 문자를 토큰으로 변환합니다.
  filteredJson = filteredJson.replace(new RegExp(tokens.colon, "gi"), ":");
  filteredJson = filteredJson.replace(new RegExp(tokens.middler, "gi"), "}");
  filteredJson = filteredJson.replace(new RegExp(tokens.middlel, "gi"), "{");
  filteredJson = filteredJson.replace(new RegExp(tokens.bigr, "gi"), "]");
  filteredJson = filteredJson.replace(new RegExp(tokens.bigl, "gi"), "[");
  filteredJson = filteredJson.replace(new RegExp(tokens.back, "gi"), "\\");
  filteredJson = filteredJson.replace(new RegExp(tokens.double, "gi"), "\"");

  // 변환된 JSON 문자열을 파싱하여 객체로 변환합니다.
  try {
    JSON.parse(filteredJson);
    return equalJson(filteredJson);
  } catch {
    return filteredJson;
  }
}

/**
 * colorParsing 메서드는 주어진 색상 문자열 또는 배열을 변환합니다.
 * @param {string|array} str - 변환할 색상 문자열 또는 배열
 * @returns {array|string} - 변환된 색상 배열 또는 문자열
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.colorParsing = function (str) {
  // 입력이 문자열인 경우
  if (typeof str === "string") {
    // 문자열이 '#'로 시작하고 길이가 7인 경우 첫 문자를 제거합니다.
    if (/^\#/.test(str) && str.length === 7) {
      str = str.slice(1);
    }
    // 문자열의 길이가 6이 아니거나 유효한 16진수 문자가 아닌 경우 에러를 던집니다.
    if (str.length !== 6 && str.replace(/[^0-9a-f]/gi, '') === '') {
      throw new Error("invaild input");
    }

    // 색상 문자열을 2자리씩 나누어 배열로 만듭니다.
    let colorArr;
    colorArr = [str.slice(0, 2), str.slice(2, 4), str.slice(4)];

    // 각 색상 값을 10진수로 변환합니다.
    colorArr = colorArr.map((s) => {
      let num;
      num = 0;
      if (/[a-z]/gi.test(s[1])) {
        num += s[1].charCodeAt(0) - 97 + 10;
      } else {
        num += Number(s[1]);
      }
      if (/[a-z]/gi.test(s[0])) {
        num += (s[0].charCodeAt(0) - 97 + 10) * 16;
      } else {
        num += (Number(s[0])) * 16;
      }
      return num;
    });
    return colorArr;
  } else if (Array.isArray(str)) {
    // 입력이 배열인 경우
    // 배열의 길이가 3이 아닌 경우 에러를 던집니다.
    if (str.length !== 3) {
      throw new Error("invaild input");
    }
    // 배열의 각 요소가 숫자가 아닌 경우 에러를 던집니다.
    if (typeof str[0] !== "number" || typeof str[1] !== "number" || typeof str[2] !== "number") {
      throw new Error("invaild input");
    }
    // 배열의 각 요소가 NaN인 경우 에러를 던집니다.
    if (Number.isNaN(str[0]) || Number.isNaN(str[1]) || Number.isNaN(str[2])) {
      throw new Error("invaild input");
    }

    // 숫자를 16진수 문자열로 변환하는 함수입니다.
    const convertNum = (num) => {
      const convertStr = (n) => {
        if (n < 10) {
          return String(n);
        } else {
          return String.fromCharCode(n + 87);
        }
      }
      let first, second;
      second = num % 16;
      first = (num - second) / 16;
      return convertStr(first) + convertStr(second);
    }

    // 배열의 각 숫자를 16진수 문자열로 변환합니다.
    str = str.map(convertNum);
    return '#' + str.join('');
  } else {
    throw new Error("invaild input");
  }
}

/**
 * ipParsing 메서드는 주어진 IP 주소를 파싱하여 정보를 반환합니다.
 * @param {string} ip - 파싱할 IP 주소
 * @returns {object} - IP 주소 정보
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.ipParsing = async function (ip) {
  // 입력이 문자열이 아닌 경우 에러를 던집니다.
  if (typeof ip !== "string") {
    throw new Error("input must be ip");
  }

  // axios 모듈을 가져옵니다.
  const axios = require("axios");

  // 사용할 토큰 배열을 정의합니다.
  const tokenArr = [
    "5364d1717afd33",
    "e0cda9d974c871",
    "43e500b8c6c967",
    "e9604175815438",
    "aa1c080944cc62",
    "89880f9c17d281",
    "f4b7957331df41",
    "85fbcc3242a42d",
  ];

  try {
    // IP 주소에서 유효하지 않은 문자를 제거합니다.
    ip = ip.trim().replace(/[^0-9\.]/gi, '');
    // IP 주소에 유효하지 않은 문자가 포함된 경우 에러를 던집니다.
    if (ip.replace(/[0-9\.]/g, '') !== '') {
      throw new Error("invalid ip => " + ip);
    }
    // IP 주소 형식이 유효한지 확인합니다.
    if (!/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g.test(ip)) {
      throw new Error("invalid ip => " + ip);
    }

    // IP 정보를 가져올 URL을 구성합니다.
    let url;
    let res;
    let resultBoo;
    let num, num2;
    let finalResult;
    let thisNumber;
    let expired;

    // 기본 URL을 설정합니다.
    url = "https://ipinfo.io";
    // IP 주소를 URL에 추가합니다.
    url += "/" + ip;

    // 초기화
    num = 0;
    resultBoo = false;
    expired = [];

    // 토큰을 사용하여 IP 정보를 가져옵니다.
    do {
      // 모든 토큰을 시도한 경우 루프를 종료합니다.
      if (num > (tokenArr.length * 3)) {
        finalResult = {};
        break;
      }

      // 무작위로 토큰을 선택합니다.
      thisNumber = Math.floor(Math.random() * tokenArr.length);
      num2 = 0;
      // 이미 만료된 토큰을 피합니다.
      while (expired.includes(thisNumber)) {
        if (num2 > tokenArr.length) {
          break;
        }
        thisNumber = Math.floor(Math.random() * tokenArr.length);
        num2 = num2 + 1;
      }

      try {
        // 선택한 토큰을 사용하여 IP 정보를 요청합니다.
        res = await axios.get(url + "?token=" + tokenArr[thisNumber]);
        // 요청이 성공한 경우 결과를 저장합니다.
        finalResult = res.data;
        resultBoo = true;
      } catch {
        // 요청이 실패한 경우 토큰을 만료된 목록에 추가합니다.
        expired.push(thisNumber);
        resultBoo = false;
        finalResult = {};
        num = num + 1;
      }
    } while (!resultBoo)

    // 최종 결과를 반환합니다.
    return finalResult;
  } catch (e) {
    // 에러가 발생한 경우 콘솔에 로그를 출력하고 빈 객체를 반환합니다.
    console.log(e);
    return {};
  }
}

/**
 * serviceParsing 메서드는 주어진 '홈리에종' 서비스 객체 또는 문자열을 파싱하여 정보를 반환합니다.
 *  * '홈리에종' 서비스는 홈퍼니싱, 홈스타일링, 토탈 스타일링, 엑스트라 스타일링의 네 가지로 구성되어 있으며,
 * 각각의 ID는 다음과 같습니다:
 * - 홈퍼니싱: s2011_aa01s
 * - 홈스타일링: s2011_aa02s
 * - 토탈 스타일링: s2011_aa03s
 * - 엑스트라 스타일링: s2011_aa04s
 * @param {object|string} serviceObj - 파싱할 서비스 객체 또는 문자열
 * @param {boolean} [startDateMode=false] - 시작 날짜 모드 여부
 * @param {boolean} [initialMode=false] - 초기 모드 여부
 * @returns {string|object} - 파싱된 서비스 정보 또는 에러를 던집니다.
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.serviceParsing = function (serviceObj, startDateMode = false, initialMode = false) {
  // 온라인/오프라인 문자열 배열을 정의합니다.
  const onoffString = [ "온라인", "오프라인" ];
  // 서비스 종류 문자열 배열을 정의합니다.
  const serviceString = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ];
  // 서비스 초기 문자열 배열을 정의합니다.
  const serviceInitial = [ "F", "S", "T", "XT" ];
  // 시작 날짜 숫자 배열을 정의합니다.
  const startDateNumbers = [ 30, 45, 60, 60 ];
  // xValue 문자열 배열을 정의합니다.
  const xValueString = [ "mini", "basic", "premium" ];
  // serid 키워드를 정의합니다.
  const seridKeywords = "s2011_aa0";

  // serviceObj가 객체인 경우
  if (typeof serviceObj === "object") {
    // 객체에 필요한 속성이 없는 경우 에러를 던집니다.
    if (serviceObj.online === undefined || serviceObj.serid === undefined || serviceObj.xValue === undefined) {
      throw new Error("invaild service object");
    }
    // 객체에서 필요한 속성을 추출합니다.
    let { online, serid, xValue } = serviceObj;
    let finalWords;
    let startDateNumber;
    let initial;

    // 온라인 여부에 따라 문자열을 설정합니다.
    if (online) {
      finalWords = onoffString[0] + " ";
    } else {
      finalWords = onoffString[1] + " ";
    }

    // serid에 언더스코어가 포함된 경우
    if (/_/gi.test(serid) && serid.split('_').length === 2) {
      serid = serid.split('_')[1];
      // serid에 따라 서비스 종류를 설정합니다.
      if (/aa01s/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
        initial = serviceInitial[0];
      } else if (/aa02s/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
        initial = serviceInitial[1];
      } else if (/aa03s/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
        initial = serviceInitial[2];
      } else if (/aa04s/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
        initial = serviceInitial[3];
      } else {
        throw new Error("invaild service object");
      }
    } else {
      // serid에 따라 서비스 종류를 설정합니다.
      if (/1/gi.test(serid)) {
        finalWords += serviceString[0] + " ";
        startDateNumber = startDateNumbers[0];
        initial = serviceInitial[0];
      } else if (/2/gi.test(serid)) {
        finalWords += serviceString[1] + " ";
        startDateNumber = startDateNumbers[1];
        initial = serviceInitial[1];
      } else if (/3/gi.test(serid)) {
        finalWords += serviceString[2] + " ";
        startDateNumber = startDateNumbers[2];
        initial = serviceInitial[2];
      } else if (/4/gi.test(serid)) {
        finalWords += serviceString[3] + " ";
        startDateNumber = startDateNumbers[3];
        initial = serviceInitial[3];
      } else {
        throw new Error("invaild service object");
      }
    }

    // xValue에 따라 문자열을 설정합니다.
    if (/M/gi.test(xValue)) {
      finalWords += xValueString[0];
    } else if (/B/gi.test(xValue)) {
      finalWords += xValueString[1];
    } else if (/P/gi.test(xValue)) {
      finalWords += xValueString[2];
    } else {
      throw new Error("invaild service object");
    }

    // startDateMode와 initialMode에 따라 반환 값을 설정합니다.
    if (!startDateMode) {
      if (!initialMode) {
        return finalWords;
      } else {
        return initial;
      }
    } else {
      return startDateNumber;
    }

  // serviceObj가 문자열인 경우
  } else if (typeof serviceObj === "string") {
    let tempArr, serviceNumber, tempString, thisSerid, thisXValue, thisOnline;
    // 문자열을 언더스코어로 분리합니다.
    tempArr = serviceObj.split('_');
    if (tempArr.length > 1) {
      // 서비스 번호를 추출합니다.
      serviceNumber = Number(tempArr[1].replace(/[a-z]/gi, '').replace(/^0/g, '').replace(/^0/g, '')) - 1;
      return serviceString[serviceNumber];
    } else {
      // 문자열을 공백으로 분리합니다.
      tempArr = serviceObj.split(' ');
      tempString = tempArr.pop();
      // serid를 설정합니다.
      thisSerid = seridKeywords + String(serviceString.findIndex((str) => { return (new RegExp(str, "gi")).test(tempArr.join(" ")) }) + 1) + 's';
      return {
        serid: thisSerid,
        xValue: xValueString[xValueString.findIndex((str) => { return str.trim() === tempString.trim() })].slice(0, 1).toUpperCase(),
        online: /online/gi.test(serviceObj) || /온라인/gi.test(serviceObj),
      };
    }
  } else {
    // 기본 값을 반환합니다.
    return {
      onoff: onoffString,
      name: serviceString,
      date: startDateNumbers,
      xValue: xValueString,
      keywords: seridKeywords,
    };
  }
}

/**
 * diskReading 메서드는 디스크 사용량을 확인하거나 주어진 배열을 사용하여 디스크 정보를 출력합니다.
 * @param {string} [mode="check"] - 모드 ("check" 또는 "view")
 * @param {Array} [arr=[]] - 디스크 정보를 담은 배열 [total, used, available]
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.diskReading = function (mode = "check", arr = []) {
  // mode가 문자열이 아닌 경우 에러를 던집니다.
  if (typeof mode !== "string") {
    throw new Error("invaild input");
  }
  // mode가 "check" 또는 "view"가 아닌 경우 에러를 던집니다.
  if (![ "check", "view" ].includes(mode)) {
    throw new Error("invaild input");
  }

  // Disk 클래스를 정의합니다. Array를 상속받습니다.
  class Disk extends Array {
    /**
     * Disk 클래스의 생성자
     * @param {number} total - 총 디스크 용량
     * @param {number} used - 사용된 디스크 용량
     * @param {number} available - 사용 가능한 디스크 용량
     */
    constructor(total, used, available) {
      super(); // Array의 생성자를 호출합니다.
      this.push(total); // 총 디스크 용량을 배열에 추가합니다.
      this.push(used); // 사용된 디스크 용량을 배열에 추가합니다.
      this.push(available); // 사용 가능한 디스크 용량을 배열에 추가합니다.
      // 사용된 디스크 용량의 백분율을 계산합니다.
      const usedPercentage = Math.round(((used / total) * 100) * 100) / 100;
      // 디스크 정보를 객체로 구성합니다.
      const obj = {
        byte: { total, used, available },
        megaByte: {
          total: Math.round((total / (1024)) * 10) / 10,
          used: Math.round((used / (1024)) * 10) / 10,
          available: Math.round((available / (1024)) * 10) / 10,
        },
        gigaByte: {
          total: Math.round((total / (1024 * 1024)) * 100) / 100,
          used: Math.round((used / (1024 * 1024)) * 100) / 100,
          available: Math.round((available / (1024 * 1024)) * 100) / 100,
        },
        percentage: {
          total: 100,
          used: usedPercentage,
          available: 100 - usedPercentage
        }
      };
      // 객체의 각 키를 this에 할당합니다.
      for (let key in obj) {
        this[key] = obj[key];
      }
    }
    /**
     * 디스크 정보를 일반 객체로 반환합니다.
     * @returns {object} - 디스크 정보 객체
     */
    toNormal() {
      let obj = {};
      obj.byte = JSON.parse(JSON.stringify(this.byte));
      obj.megaByte = JSON.parse(JSON.stringify(this.megaByte));
      obj.gigaByte = JSON.parse(JSON.stringify(this.gigaByte));
      obj.percentage = JSON.parse(JSON.stringify(this.percentage));
      return obj;
    }
    /**
     * 디스크 정보를 배열로 반환합니다.
     * @returns {Array} - 디스크 정보 배열
     */
    toArray() {
      return [ this[0], this[1], this[2] ];
    }
    /**
     * 디스크 정보를 백분율과 함께 반환합니다.
     * @returns {object} - 디스크 정보 객체 (GB 및 백분율)
     */
    toPercentage() {
      return { gigaByte: this.gigaByte, percentage: this.percentage };
    }
  }

  // mode가 "check"인 경우
  if (mode === "check") {
    // child_process 모듈에서 exec 함수를 가져옵니다.
    const { exec } = require("child_process");
    // 디스크 사용량을 확인하는 명령어를 정의합니다.
    const command = "df -Pk -- /";
    // Promise를 반환합니다.
    return new Promise((resolve, reject) => {
      // 명령어를 실행합니다.
      exec(command, { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          // 에러가 발생한 경우 reject 합니다.
          reject(error);
        } else {
          // 명령어의 출력을 파싱하여 디스크 정보를 추출합니다.
          const [ , totalRaw, , availableRaw ] = stdout.trim().split("\n").map((str) => { return str.trim() })[1].split(' ').filter((str) => { return str.trim() !== '' });
          const total = Number(totalRaw);
          const available = Number(availableRaw);
          const used = total - available;
          // Disk 인스턴스를 생성하여 resolve 합니다.
          resolve(new Disk(total, used, available));
        }
      });
    });
  // mode가 "view"인 경우
  } else if (mode === "view") {
    // arr이 배열이 아닌 경우 에러를 던집니다.
    if (!Array.isArray(arr)) {
      throw new Error("invaild input 2");
    }
    // arr의 길이가 3이 아닌 경우 에러를 던집니다.
    if (arr.length !== 3) {
      throw new Error("invaild input => arr must be [ total, used, available ]");
    }
    // arr의 모든 요소가 숫자가 아닌 경우 에러를 던집니다.
    if (!arr.every((n) => { return typeof n === "number" })) {
      throw new Error("invaild input => arr must be [ total, used, available ]");
    }
    // Disk 인스턴스를 생성합니다.
    const disk = new Disk(...arr);
    // 디스크 정보를 백분율과 함께 출력합니다.
    console.table(disk.toPercentage());
  }
}

/**
 * errorLog 메서드는 주어진 텍스트를 에러 로그로 기록합니다.
 * @param {string|object} text - 기록할 텍스트 또는 텍스트를 포함한 객체
 * @returns {Promise} - 에러 로그 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.errorLog = function (text) {
  // text가 객체이고 null이 아닌 경우
  if (typeof text === "object" && text !== null) {
    // 객체의 text 속성이 문자열인 경우
    if (typeof text.text === "string") {
      text = text.text; // text를 객체의 text 속성 값으로 설정합니다.
    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  } else {
    // text가 문자열이 아닌 경우
    if (typeof text !== "string") {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  }

  // 현재 작업 디렉토리의 apps/infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 로그를 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";
  // axios 모듈을 가져옵니다.
  const axios = require("axios");
  // 로그 컬렉션 이름을 설정합니다.
  const collection = "errorLog";
  // 로그를 기록할 채널을 설정합니다.
  const channel = "#error_log";

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // axios를 사용하여 POST 요청을 보냅니다.
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        // 응답 상태가 200이 아닌 경우 reject 합니다.
        if (res.status !== 200) {
          reject(res);
        } else {
          resolve(res); // 응답 상태가 200인 경우 resolve 합니다.
        }
      })
      .catch((err) => {
        reject(err); // 에러가 발생한 경우 reject 합니다.
      });
  });
}

/**
 * aliveLog 메서드는 주어진 텍스트를 alive 로그로 기록합니다.
 * @param {string|object} text - 기록할 텍스트 또는 텍스트를 포함한 객체
 * @returns {Promise} - alive 로그 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.aliveLog = function (text) {
  // text가 객체이고 null이 아닌 경우
  if (typeof text === "object" && text !== null) {
    // 객체의 text 속성이 문자열인 경우
    if (typeof text.text === "string") {
      text = text.text; // text를 객체의 text 속성 값으로 설정합니다.
    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  } else {
    // text가 문자열이 아닌 경우
    if (typeof text !== "string") {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  }

  // 현재 작업 디렉토리의 apps/infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 로그를 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";
  // axios 모듈을 가져옵니다.
  const axios = require("axios");
  // 로그 컬렉션 이름을 설정합니다.
  const collection = "errorLog";
  // 로그를 기록할 채널을 설정합니다.
  const channel = "#alive_log";

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // axios를 사용하여 POST 요청을 보냅니다.
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        // 응답 상태가 200이 아닌 경우 reject 합니다.
        if (res.status !== 200) {
          reject(res);
        } else {
          resolve(res); // 응답 상태가 200인 경우 resolve 합니다.
        }
      })
      .catch((err) => {
        reject(err); // 에러가 발생한 경우 reject 합니다.
      });
  });
}

/**
 * cronLog 메서드는 주어진 텍스트를 cron 로그로 기록합니다.
 * @param {string|object} text - 기록할 텍스트 또는 텍스트를 포함한 객체
 * @returns {Promise} - cron 로그 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.cronLog = function (text) {
  // text가 객체이고 null이 아닌 경우
  if (typeof text === "object" && text !== null) {
    // 객체의 text 속성이 문자열인 경우
    if (typeof text.text === "string") {
      text = text.text; // text를 객체의 text 속성 값으로 설정합니다.
    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  } else {
    // text가 문자열이 아닌 경우
    if (typeof text !== "string") {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  }

  // 현재 작업 디렉토리의 apps/infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 로그를 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";
  // axios 모듈을 가져옵니다.
  const axios = require("axios");
  // 로그 컬렉션 이름을 설정합니다.
  const collection = "errorLog";
  // 로그를 기록할 채널을 설정합니다.
  const channel = "#cron_log";

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // axios를 사용하여 POST 요청을 보냅니다.
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        // 응답 상태가 200이 아닌 경우 reject 합니다.
        if (res.status !== 200) {
          reject(res);
        } else {
          resolve(res); // 응답 상태가 200인 경우 resolve 합니다.
        }
      })
      .catch((err) => {
        reject(err); // 에러가 발생한 경우 reject 합니다.
      });
  });
}

/**
 * alertLog 메서드는 주어진 텍스트를 alert 로그로 기록합니다.
 * @param {string|object} text - 기록할 텍스트 또는 텍스트를 포함한 객체
 * @returns {Promise} - alert 로그 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.alertLog = function (text) {
  // text가 객체이고 null이 아닌 경우
  if (typeof text === "object" && text !== null) {
    // 객체의 text 속성이 문자열인 경우
    if (typeof text.text === "string") {
      text = text.text; // text를 객체의 text 속성 값으로 설정합니다.
    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  } else {
    // text가 문자열이 아닌 경우
    if (typeof text !== "string") {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  }

  // 현재 작업 디렉토리의 apps/infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 로그를 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";
  // axios 모듈을 가져옵니다.
  const axios = require("axios");
  // 로그 컬렉션 이름을 설정합니다.
  const collection = "errorLog";
  // 로그를 기록할 채널을 설정합니다.
  const channel = "#alert_log";

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // axios를 사용하여 POST 요청을 보냅니다.
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        // 응답 상태가 200이 아닌 경우 reject 합니다.
        if (res.status !== 200) {
          reject(res);
        } else {
          resolve(res); // 응답 상태가 200인 경우 resolve 합니다.
        }
      })
      .catch((err) => {
        reject(err); // 에러가 발생한 경우 reject 합니다.
      });
  });
}

/**
 * expressLog 메서드는 주어진 서버, 스트림, 모드 및 요청 객체를 사용하여 로그를 기록합니다.
 * @param {string} server - 서버 이름
 * @param {object} stream - 로그를 기록할 스트림 객체
 * @param {string} mode - 로그 모드 (route, start, alert, log, error, cron, alive)
 * @param {object} [req={}] - 요청 객체 (기본값은 빈 객체)
 * @returns {Promise} - 로그 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.expressLog = function (server, stream, mode, req = {}) {
  // server가 문자열이 아닌 경우 에러를 던집니다.
  if (typeof server !== "string") {
    throw new Error("server name need");
  }
  // stream이 객체가 아니거나 null인 경우 에러를 던집니다.
  if (typeof stream !== "object" || stream === null) {
    throw new Error("invalid input 0");
  }
  // mode가 문자열이 아닌 경우 에러를 던집니다.
  if (typeof mode !== "string") {
    throw new Error("mode need");
  }

  // 로그 ID에 사용할 키워드를 설정합니다.
  const idKeyword = "log";

  // 고유한 16진수 문자열을 생성하는 함수입니다.
  const uniqueHex = function () {
    const x = 16; // 16진수 기반
    const length = 11; // 추가할 랜덤 문자열의 길이
    const uniqueNumber = (new Date()).valueOf(); // 현재 시간을 밀리초 단위로 가져옵니다.
    const hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ]; // 16진수 문자 배열
    const randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ]; // 랜덤 키워드 배열
    let uniqueNumber_copied;
    let maxExponent;
    let cArr;
    let temp;
    let hexString;

    // uniqueNumber를 복사합니다.
    uniqueNumber_copied = uniqueNumber;
    maxExponent = 0;

    // uniqueNumber보다 작거나 같은 최대 지수를 찾습니다.
    while (Math.pow(x, maxExponent) <= uniqueNumber) {
      maxExponent++;
    }

    cArr = [];

    // uniqueNumber를 16진수로 변환합니다.
    for (let i = 0; i < maxExponent; i++) {
      temp = ((uniqueNumber_copied / Math.pow(x, i)) % x);
      cArr.push(temp);
      uniqueNumber_copied = uniqueNumber_copied - (temp * Math.pow(x, i));
    }

    // 16진수 문자열로 변환합니다.
    hexString = cArr.map((index) => { return hexChars[index] }).join('');

    // 랜덤한 16진수 문자열을 추가합니다.
    for (let i = 0; i < length; i++) {
      hexString += hexChars[Math.floor(hexChars.length * Math.random())];
    }

    // 최종 고유 16진수 문자열을 반환합니다.
    return randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           hexChars[Math.floor(hexChars.length * Math.random())] + 
           randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           String(uniqueNumber) + 'A' + hexString;
  }

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    let obj;
    let thisId;
    let thisIp;

    // 로그 ID를 생성합니다.
    thisId = idKeyword + "_" + server + "_" + uniqueHex() + String((new Date()).valueOf());
    thisIp = "unknown"; // 기본 IP 주소는 "unknown"으로 설정합니다.

    // 모드가 "route"인 경우
    if (mode === "route") {
      // 요청 헤더에서 IP 주소를 가져옵니다.
      thisIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress);
      if (typeof thisIp === "string") {
        thisIp = thisIp.replace(/[^0-9\.]/gi, ''); // IP 주소에서 숫자와 점(.)만 남깁니다.
      } else {
        thisIp = "unknown"; // IP 주소가 문자열이 아닌 경우 "unknown"으로 설정합니다.
      }

      // 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          method: req.method,
          url: req.url,
          ip: thisIp,
          userAgent: req.useragent.source,
          origin: (req.headers.origin || "unknown"),
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "start") {
      // 모드가 "start"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {}
      };

      // 로그를 스트림에 기록합니다.
      stream.write(JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "alert") {
      // 모드가 "alert"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          text: req.text,
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "log") {
      // 모드가 "log"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          text: req.text,
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "error") {
      // 모드가 "error"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          text: req.text,
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "cron") {
      // 모드가 "cron"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          text: req.text,
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    } else if (mode === "alive") {
      // 모드가 "alive"인 경우 로그 객체를 생성합니다.
      obj = {
        id: thisId,
        server: server,
        date: new Date(),
        mode: mode,
        data: {
          text: req.text,
        }
      };

      // 로그를 스트림에 기록합니다.
      stream.write("\n" + JSON.stringify(obj).replace(/\n/g, " "));
    }

    // Promise를 해결합니다.
    resolve(obj);
  })
}

/**
 * emergencyAlarm 메서드는 주어진 텍스트를 긴급 알람으로 기록합니다.
 * @param {string|object} text - 기록할 텍스트 또는 텍스트를 포함한 객체
 * @returns {Promise} - 긴급 알람 기록 결과를 반환하는 Promise
 * @throws {Error} - 입력이 유효하지 않은 경우 에러를 던집니다.
 */
Mother.prototype.emergencyAlarm = function (text) {
  // text가 객체이고 null이 아닌 경우
  if (typeof text === "object" && text !== null) {
    // 객체의 text 속성이 문자열인 경우
    if (typeof text.text === "string") {
      text = text.text; // text를 객체의 text 속성 값으로 설정합니다.
    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  } else {
    // text가 문자열이 아닌 경우
    if (typeof text !== "string") {
      throw new Error("invaild input"); // 유효하지 않은 입력인 경우 에러를 던집니다.
    }
  }

  // 현재 작업 디렉토리의 apps/infoObj.js 파일을 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  // 긴급 알람을 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/emergencyAlarm";
  // axios 모듈을 가져옵니다.
  const axios = require("axios");

  // Promise를 반환합니다.
  return new Promise((resolve, reject) => {
    // axios를 사용하여 POST 요청을 보냅니다.
    axios.post(recordUrl, { text }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        // 응답 상태가 200이 아닌 경우 reject 합니다.
        if (res.status !== 200) {
          reject(res);
        } else {
          resolve(res); // 응답 상태가 200인 경우 resolve 합니다.
        }
      })
      .catch((err) => {
        reject(err); // 에러가 발생한 경우 reject 합니다.
      });
  });
}

/**
 * @method messageSend
 * @description 주어진 메시지를 특정 채널로 전송하며, 음성 여부, 대상, 그리고 페어리(fairy) 옵션을 설정할 수 있습니다.
 * @param {string|object} text - 전송할 메시지 텍스트 또는 메시지 정보를 담고 있는 객체.
 * @param {string} [channel="silent"] - 메시지를 보낼 채널 이름. 기본값은 "silent"입니다.
 * @param {boolean} [voice=false] - 메시지를 음성으로 전송할지 여부. 기본값은 false입니다.
 * @param {Array|null} [target=null] - 메시지의 타겟 대상. 기본값은 null입니다.
 * @param {boolean} [fairy=false] - 페어리(fairy) 옵션 여부. 기본값은 false입니다.
 * @returns {Promise} 메시지 전송 결과를 담고 있는 Promise를 반환합니다.
 */
Mother.prototype.messageSend = function (text, channel = "silent", voice = false, target = null, fairy = false) {
  
  // text가 객체이고 null이 아닌 경우 처리
  if (typeof text === "object" && text !== null) {

    // text.text와 text.channel이 각각 문자열인지 확인
    if (typeof text.text === "string" && typeof text.channel === "string") {

      // 채널을 객체에서 가져온 값으로 설정
      channel = text.channel;

      // 음성 여부를 객체에서 가져온 값으로 설정, 기본적으로 false로 설정
      if (text.voice === true) {
        voice = true;
      } else {
        voice = false;
      }

      // 타겟이 배열인지 확인하고 배열이면 해당 값으로 설정
      if (Array.isArray(text.target)) {
        target = text.target;
      }

      // 페어리(fairy) 옵션 설정, 없으면 기본값으로 false 설정
      fairy = text.fairy === undefined ? false : text.fairy;

      // 메시지 텍스트를 객체에서 가져온 값으로 설정
      text = text.text;
    } else {
      // text.text 또는 text.channel이 유효한 문자열이 아닌 경우 오류 발생
      throw new Error("invaild input");
    }
  } else {
    // text가 문자열이 아니거나, channel이 문자열이 아닌 경우 오류 발생
    if (typeof text !== "string" || typeof channel !== "string") {
      throw new Error("invaild input");
    }
  }

  // 음성 옵션이 true가 아닌 경우 false로 설정
  if (voice !== true) {
    voice = false;
  }

  // 페어리(fairy) 옵션이 true가 아닌 경우 false로 설정
  if (fairy !== true) {
    fairy = false;
  }

  // infoObj.js 파일에서 주소 정보를 가져옴
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

  // 메시지 로그를 기록할 URL을 설정
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";

  // HTTP 요청을 위해 axios 모듈을 가져옴
  const axios = require("axios");

  // 메시지 로그를 저장할 컬렉션 이름을 설정
  const collection = "messageLog";

  // 비어 있는 Promise를 반환하는 함수 정의
  const emptyPromise = () => {
    return new Promise((resolve, reject) => {
      resolve({ status: 200, message: "done" });
    });
  }

  // 메시지 전송 및 처리 결과를 반환하는 Promise 생성
  return new Promise((resolve, reject) => {

    // axios를 사용하여 메시지 로그를 기록하는 HTTP POST 요청을 보냄
    axios.post(recordUrl, { text, channel, collection, voice, target, fairy }, { headers: { "Content-Type": "application/json" } }).then((res) => {

      // 응답 상태가 200이 아니면 오류로 간주하고 reject 호출
      if (res.status !== 200) {
        reject(res);
      } else {
        // 상태가 200이면 빈 Promise 반환
        return emptyPromise();
      }
    }).then((res) => {
      // 빈 Promise의 결과를 확인하고 상태가 200이 아니면 reject 호출
      if (res.status !== 200) {
        reject(res);
      } else {
        // 최종적으로 성공적으로 처리되면 resolve 호출
        resolve(res);
      }
    }).catch((err) => {
      // 처리 중 오류가 발생하면 reject 호출
      reject(err);
    });
  });
}

/**
 * @method messageLog
 * @description 주어진 메시지를 로깅합니다. 메시지는 특정 채널에 기록되며, 채널 정보가 없을 경우 기본적으로 "silent" 채널에 기록됩니다.
 * @param {string|object} text - 로깅할 메시지 텍스트 또는 메시지 정보를 담고 있는 객체.
 * @returns {Promise} 메시지 로그 결과를 담고 있는 Promise를 반환합니다.
 */
Mother.prototype.messageLog = function (text) {
  
  // 채널을 저장할 변수를 선언합니다.
  let channel;

  // text가 객체이고 null이 아닌지 확인합니다.
  if (typeof text === "object" && text !== null) {

    // 객체의 text 속성이 문자열인지 확인합니다.
    if (typeof text.text === "string") {

      // 채널 정보를 객체에서 가져옵니다.
      channel = text.channel;

      // 메시지 텍스트를 객체에서 가져온 값으로 설정합니다.
      text = text.text;
    } else {
      // text.text가 유효한 문자열이 아닌 경우 오류를 발생시킵니다.
      throw new Error("invaild input");
    }
  } else {
    // text가 문자열이 아닌 경우 오류를 발생시킵니다.
    if (typeof text !== "string") {
      throw new Error("invaild input");
    }
  }

  // 채널 정보가 문자열인지 확인하고, 그렇지 않다면 기본값인 "silent"로 설정합니다.
  if (typeof channel !== "string") {
    channel = "silent";
  }

  // infoObj.js 파일에서 주소 정보를 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

  // 메시지 로그를 기록할 URL을 설정합니다.
  const recordUrl = "https://" + ADDRESS.secondinfo.host + ":3003/messageLog";

  // HTTP 요청을 위해 axios 모듈을 가져옵니다.
  const axios = require("axios");

  // 메시지 로그를 저장할 컬렉션 이름을 설정합니다.
  const collection = "messageLog";

  // 메시지 로그 결과를 반환하는 Promise를 생성합니다.
  return new Promise((resolve, reject) => {

    // axios를 사용하여 메시지 로그를 기록하는 HTTP POST 요청을 보냅니다.
    axios.post(recordUrl, { text, channel, collection }, { headers: { "Content-Type": "application/json" } }).then((res) => {

      // 응답 상태가 200이 아닌 경우 오류로 간주하고 reject를 호출합니다.
      if (res.status !== 200) {
        reject(res);
      } else {
        // 상태가 200이면 resolve를 호출하여 성공적으로 처리된 결과를 반환합니다.
        resolve(res);
      }
    }).catch((err) => {
      // 처리 중 오류가 발생하면 reject를 호출하여 오류를 반환합니다.
      reject(err);
    });
  });
}

/**
 * @method getHoliday
 * @description 서버로부터 휴일 정보를 가져옵니다. stringMode가 true이면 날짜 문자열 배열을 반환하고, false이면 Date 객체 배열을 반환합니다.
 * @param {boolean} [stringMode=false] - 반환될 데이터의 형식을 결정합니다. true이면 문자열 형식, false이면 Date 객체 형식으로 반환합니다.
 * @returns {Promise<Array<string>|Array<Date>>} 휴일 정보를 담고 있는 Promise를 반환합니다.
 */
Mother.prototype.getHoliday = function (stringMode = false) {
  
  // infoObj.js 파일에서 주소 정보를 가져옵니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

  // 휴일 정보를 요청할 대상 URL을 설정합니다.
  const targetUrl = "https://" + ADDRESS.contentsinfo.host + ":3000/getHoliday";

  // HTTP 요청을 위해 axios 모듈을 가져옵니다.
  const axios = require("axios");

  // 휴일 정보를 가져오는 Promise를 반환합니다.
  return new Promise((resolve, reject) => {

    // axios를 사용하여 서버에 POST 요청을 보냅니다.
    axios.post(targetUrl, { data: null }, { headers: { "Content-Type": "application/json" } }).then((res) => {

      // 응답 상태가 200이 아닌 경우 reject를 호출하여 오류를 반환합니다.
      if (res.status !== 200) {
        reject(res);
      } else {
        // 응답 데이터에서 휴일 정보를 추출합니다.
        const result = res.data.holiday;

        // stringMode가 true이면 문자열 배열을 resolve로 반환합니다.
        if (stringMode) {
          resolve(result);
        } else {
          // stringMode가 false이면 날짜 문자열을 Date 객체로 변환하여 반환합니다.
          resolve(result.map((str) => {
            // 문자열을 연도, 월, 일로 분리합니다.
            const arr = str.split("-");
            const year = Number(arr[0]); // 연도를 숫자로 변환
            const month = Number(arr[1]); // 월을 숫자로 변환
            const date = Number(arr[2]); // 일을 숫자로 변환
            // 연도, 월, 일을 사용해 Date 객체를 생성하여 반환합니다.
            return new Date(year, month - 1, date, 9, 0, 0); // 월은 0부터 시작하므로 1을 빼줍니다.
          }));
        }
      }
    }).catch((err) => {
      // 요청 중 오류가 발생하면 reject를 호출하여 오류를 반환합니다.
      reject(err);
    });
  });
}

/**
 * @method uniqueValue
 * @description 주어진 타입에 따라 고유한 값을 생성합니다. 지원되는 타입은 "number", "string", "hex", "uuid"입니다.
 * @param {string} [type="number"] - 생성할 고유 값의 타입을 지정합니다. "number", "string", "hex", "uuid" 중 하나를 선택할 수 있습니다.
 * @returns {number|string} 주어진 타입에 따라 생성된 고유 값을 반환합니다.
 */
Mother.prototype.uniqueValue = function (type = "number") {

  // 타입이 "number"인 경우, 현재 시간을 밀리초 단위로 나타내는 값에 무작위 숫자를 더해 고유한 숫자를 생성합니다.
  if (type === "number") {
    return Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)));

  // 타입이 "string"인 경우, 현재 시간을 밀리초 단위로 나타내는 값에 무작위 숫자를 더해 고유한 문자열을 생성합니다.
  } else if (type === "string") {
    return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));

  // 타입이 "hex"인 경우, 고유한 16진수 문자열을 생성합니다.
  } else if (type === "hex") {
    const x = 16; // 16진수(헥사) 변환을 위한 기준 값
    const length = 11; // 추가로 생성할 랜덤 16진수 문자의 길이
    const uniqueNumber = (new Date()).valueOf(); // 현재 시간을 밀리초 단위로 나타내는 값
    const hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ]; // 16진수 문자 목록
    const randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ]; // 추가적으로 사용할 랜덤 키워드 목록
    let uniqueNumber_copied; // 현재 시간을 저장할 변수
    let maxExponent; // 최대 지수 값을 저장할 변수
    let cArr; // 16진수 변환 후 값을 저장할 배열
    let temp; // 계산 중간 값을 저장할 변수
    let hexString; // 최종 16진수 문자열을 저장할 변수

    uniqueNumber_copied = uniqueNumber; // 고유한 숫자를 복사합니다.
    maxExponent = 0; // 초기 지수 값을 0으로 설정합니다.

    // 고유 숫자를 표현할 수 있는 최대 지수를 계산합니다.
    while (Math.pow(x, maxExponent) <= uniqueNumber) {
      maxExponent++;
    }

    cArr = []; // 16진수로 변환된 값을 저장할 배열을 초기화합니다.

    // 고유 숫자를 16진수로 변환하여 배열에 저장합니다.
    for (let i = 0; i < maxExponent; i++) {
      temp = ((uniqueNumber_copied / Math.pow(x, i)) % x); // 해당 자리의 16진수 값을 계산합니다.
      cArr.push(temp); // 계산된 값을 배열에 추가합니다.
      uniqueNumber_copied = uniqueNumber_copied - (temp * Math.pow(x, i)); // 계산된 값을 고유 숫자에서 제외합니다.
    }

    // 16진수 배열을 문자로 변환하여 연결합니다.
    hexString = cArr.map((index) => { return hexChars[index] }).join('');

    // 추가적인 무작위 16진수 문자를 hexString에 추가합니다.
    for (let i = 0; i < length; i++) {
      hexString += hexChars[Math.floor(hexChars.length * Math.random())];
    }

    // 무작위로 생성된 키워드와 고유 숫자, 추가 16진수 문자열을 조합하여 최종 16진수 문자열을 반환합니다.
    return randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           hexChars[Math.floor(hexChars.length * Math.random())] + 
           randomKeyWords[Math.floor(randomKeyWords.length * Math.random())] + 
           String(uniqueNumber) + 'A' + hexString;

  // 타입이 "uuid"인 경우, UUID v4 형식의 고유 문자열을 생성합니다.
  } else if (type === "uuid") {
    const { v4 } = require("uuid"); // uuid 모듈에서 v4 함수를 가져옵니다.
    return v4(); // UUID v4를 생성하여 반환합니다.

  // 지정된 타입이 없는 경우, 기본적으로 "string" 타입으로 고유 값을 생성합니다.
  } else {
    return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  }
}

/**
 * @method setQueue
 * @description 일정 시간 후에 주어진 콜백 함수를 실행하는 큐를 설정합니다.
 * @param {function} callback - 지연된 시간 후에 실행될 함수입니다.
 * @param {number} [delay=0] - 콜백 함수가 실행되기 전까지 대기할 시간(밀리초 단위)입니다. 기본값은 0입니다.
 * @throws {Error} callback이 함수가 아닌 경우 예외를 발생시킵니다.
 */
Mother.prototype.setQueue = function (callback, delay = 0) {

  // callback이 함수인지 확인하고, 그렇지 않으면 예외를 발생시킵니다.
  if (typeof callback !== "function") {
    throw new Error("invaild input");
  }

  // delay가 숫자인지 확인하고, 그렇지 않으면 기본값 0을 설정합니다.
  if (typeof delay !== "number") {
    delay = 0;
  }

  // 고유한 임시 큐의 이름을 저장할 변수를 선언합니다.
  let propertyName, timeoutId;

  // 고유한 임시 큐 이름을 생성합니다.
  propertyName = "tempQueue_" + String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));

  // setTimeout을 사용하여 지정된 지연 시간 후에 콜백 함수를 실행하고, 타이머를 제거합니다.
  timeoutId = setTimeout(() => {
    callback(); // 지정된 콜백 함수를 실행합니다.
    clearTimeout(timeoutId); // 타이머를 제거하여 메모리 누수를 방지합니다.
  }, delay);
}

/**
 * @method pureServer
 * @description 주어진 모드에 따라 순수 서버 클래스를 생성하거나, 서버를 실행합니다.
 * @param {string} [mode="class"] - 동작 모드를 설정합니다. "class", "server", "listen", "run" 중 하나를 선택할 수 있습니다.
 * @param {object|null} [app=null] - 서버 모드에서 사용할 PureServer 인스턴스입니다.
 * @param {number} [port=8000] - 서버가 수신 대기할 포트 번호입니다. 기본값은 8000입니다.
 * @returns {Function|undefined} PureServer 클래스를 반환하거나, 서버를 실행합니다.
 * @throws {Error} 잘못된 입력이 주어졌을 경우 예외를 발생시킵니다.
 */
Mother.prototype.pureServer = function (mode = "class", app = null, port = 8000) {

  /**
   * @class PureServer
   * @description HTTP 요청을 처리할 서버 클래스입니다.
   */
  class PureServer {
    constructor() {
      // 라우팅 정보(HTTP 메서드, 경로, 콜백)를 저장할 배열을 초기화합니다.
      this.matrix = [];
    }

    /**
     * @method get
     * @description GET 요청에 대한 라우트를 추가합니다.
     * @param {string|Array<string>} path - 요청 경로 또는 경로 배열입니다.
     * @param {function} callback - 요청이 일치할 때 실행될 함수입니다.
     * @throws {Error} 잘못된 입력이 주어졌을 경우 예외를 발생시킵니다.
     */
    get(path, callback) {
      // 콜백이 함수인지 확인합니다.
      if (typeof callback !== "function") {
        throw new Error("invaild input");
      }

      // 경로가 배열인 경우, 각각의 경로에 대해 GET 라우트를 추가합니다.
      if (Array.isArray(path)) {
        for (let str of path) {
          // 경로가 문자열인지 확인합니다.
          if (typeof str !== "string") {
            throw new Error("invaild input");
          }
          // 경로가 '/'로 시작하지 않으면 앞에 '/'를 추가합니다.
          if (!/^\//.test(str)) {
            str = '/' + str;
          }
          // GET 라우트를 matrix에 추가합니다.
          this.matrix.push([
            "GET",
            str,
            callback
          ]);
        }
      } else if (typeof path === "string") {
        // 경로가 문자열인 경우, '/'로 시작하지 않으면 앞에 '/'를 추가합니다.
        if (!/^\//.test(path)) {
          path = '/' + path;
        }
        // GET 라우트를 matrix에 추가합니다.
        this.matrix.push([
          "GET",
          path,
          callback
        ]);
      } else {
        throw new Error("invaild input");
      }
    }

    /**
     * @method post
     * @description POST 요청에 대한 라우트를 추가합니다.
     * @param {string|Array<string>} path - 요청 경로 또는 경로 배열입니다.
     * @param {function} callback - 요청이 일치할 때 실행될 함수입니다.
     * @throws {Error} 잘못된 입력이 주어졌을 경우 예외를 발생시킵니다.
     */
    post(path, callback) {
      // 콜백이 함수인지 확인합니다.
      if (typeof callback !== "function") {
        throw new Error("invaild input");
      }

      // 경로가 배열인 경우, 각각의 경로에 대해 POST 라우트를 추가합니다.
      if (Array.isArray(path)) {
        for (let str of path) {
          // 경로가 문자열인지 확인합니다.
          if (typeof str !== "string") {
            throw new Error("invaild input");
          }
          // 경로가 '/'로 시작하지 않으면 앞에 '/'를 추가합니다.
          if (!/^\//.test(str)) {
            str = '/' + str;
          }
          // POST 라우트를 matrix에 추가합니다.
          this.matrix.push([
            "POST",
            str,
            callback
          ]);
        }
      } else if (typeof path === "string") {
        // 경로가 문자열인 경우, '/'로 시작하지 않으면 앞에 '/'를 추가합니다.
        if (!/^\//.test(path)) {
          path = '/' + path;
        }
        // POST 라우트를 matrix에 추가합니다.
        this.matrix.push([
          "POST",
          path,
          callback
        ]);
      } else {
        throw new Error("invaild input");
      }
    }

    /**
     * @method server
     * @description HTTP 서버 요청을 처리하는 함수입니다.
     * @returns {Function} HTTP 서버의 요청 이벤트 핸들러를 반환합니다.
     */
    server() {
      const instance = this; // 현재 PureServer 인스턴스를 참조합니다.

      return async function (req, res) {
        try {
          const buffers = [];
          // 요청 데이터를 스트림으로 읽어들입니다.
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          // 읽어들인 데이터를 하나의 문자열로 결합합니다.
          const data = Buffer.concat(buffers).toString();
          try {
            // 요청 본문을 JSON 형식으로 파싱합니다.
            req.body = JSON.parse(data);
          } catch (e) {
            req.body = {};
            if (data !== "") {
              req.body.raw = data; // JSON 파싱이 실패하면 raw 데이터를 저장합니다.
            }
          }

          let boo = false; // 요청이 처리되었는지 여부를 추적합니다.

          // 응답 헤더 설정 메서드를 정의합니다.
          res.set = function (obj) {
            return res.writeHead(200, obj);
          }
          res.send = res.end; // 응답을 끝내는 메서드에 별칭을 추가합니다.

          // 요청 메서드와 경로가 matrix에 정의된 라우트와 일치하는지 확인합니다.
          for (let [method, path, callback] of instance.matrix) {
            if (method === req.method && path === req.url.trim()) {
              boo = true; // 요청이 처리되었음을 표시합니다.
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
                "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
              });
              await callback(req, res); // 라우트에 연결된 콜백 함수를 실행합니다.
            }
          }

          // 요청이 처리되지 않은 경우, 기본 오류 메시지를 반환합니다.
          if (!boo) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: 'error' }));
          }
        } catch (e) {
          console.log(e); // 서버 오류를 콘솔에 출력합니다.
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ data: 'error' }));
        }
      }
    }
  }

  // mode가 "class"인 경우 PureServer 클래스를 반환합니다.
  if (mode === "class") {
    return PureServer;

  // mode가 "server", "listen", "run" 중 하나인 경우 서버를 실행합니다.
  } else if (mode === "server" || mode === "listen" || mode === "run") {
    // app이 PureServer의 인스턴스인지 확인합니다.
    if (typeof app.constructor === "function") {
      if (app.constructor.name === "PureServer") {
        const http = require("http"); // http 모듈을 가져옵니다.
        const server = http.createServer(); // HTTP 서버를 생성합니다.
        server.on("request", app.server()); // 서버 요청 이벤트 핸들러를 설정합니다.
        server.listen(port); // 서버를 지정된 포트에서 수신 대기합니다.
        console.log(`\x1b[33m%s\x1b[0m`, `Pure server launching in ${String(port)}`);
      } else {
        throw new Error("invaild input");
      }
    } else {
      throw new Error("invaild input");
    }
  } else {
    throw new Error("invaild mode");
  }
}

/**
 * @method xyConverting
 * @description 2차원 배열(행렬)의 행과 열을 변환합니다.
 * @param {Array<Array<any>>} original - 변환할 2차원 배열(행렬)입니다.
 * @returns {Array<Array<any>>} 변환된 2차원 배열(행렬)을 반환합니다.
 * @throws {Error} 입력이 배열이 아니거나, 행렬이 아닌 경우 예외를 발생시킵니다.
 */
Mother.prototype.xyConverting = function (original) {

  // 입력이 배열인지 확인합니다. 배열이 아닌 경우 오류를 발생시킵니다.
  if (!Array.isArray(original)) {
    throw new Error("input must be array");
  }

  // 입력된 배열이 비어있지 않은 경우, 모든 요소가 배열인지 확인합니다.
  if (original.length > 0) {
    if (!original.every((arr) => { return Array.isArray(arr); })) {
      throw new Error("input must be matrix");
    }
  }

  // 변환된 배열을 저장할 변수를 선언합니다.
  let converted, tempArr;

  // 변환된 배열을 초기화합니다.
  converted = [];

  // 입력된 배열이 비어있지 않은 경우에만 변환을 수행합니다.
  if (original.length > 0) {

    // 첫 번째 행의 길이만큼 반복합니다. (즉, 열의 개수만큼 반복합니다.)
    for (let i = 0; i < original[0].length; i++) {

      // 임시 배열을 초기화합니다.
      tempArr = [];

      // 각 행을 순회하면서 i번째 요소를 임시 배열에 추가합니다.
      for (let arr of original) {
        tempArr.push(arr[i]);
      }

      // 임시 배열을 변환된 배열에 추가합니다.
      converted.push(tempArr);
    }
  }

  // 변환된 배열을 반환합니다.
  return converted;
}

/**
 * @method promiseTogether
 * @description 주어진 Promise 배열을 모두 처리한 후 결과를 반환하는 새로운 Promise를 생성합니다. 모든 Promise가 성공적으로 완료되면 true를 반환하고, 하나라도 실패하면 해당 오류를 반환합니다.
 * @param {Array<Promise>} promiseArr - 처리할 Promise 객체들의 배열입니다.
 * @returns {Promise<boolean>} 모든 Promise가 성공적으로 완료되면 true를 반환하는 Promise를 반환합니다.
 * @throws {Error} 입력이 배열이 아니거나, 배열의 모든 요소가 Promise 인스턴스가 아닌 경우 예외를 발생시킵니다.
 */
Mother.prototype.promiseTogether = function (promiseArr) {

  // 입력이 배열인지 확인합니다. 배열이 아닌 경우 오류를 발생시킵니다.
  if (!Array.isArray(promiseArr)) {
    throw new Error("invaild input");
  }

  // 배열의 모든 요소가 Promise 인스턴스인지 확인합니다. 그렇지 않은 경우 오류를 발생시킵니다.
  if (!promiseArr.every((obj) => { return obj instanceof Promise })) {
    throw new Error("invaild input");
  }

  // 모든 Promise를 처리하는 새로운 Promise를 반환합니다.
  return new Promise((resolve, reject) => {

    // 처리해야 할 Promise의 개수를 저장합니다.
    const workLength = promiseArr.length;

    // 각 Promise의 성공 여부를 저장할 배열을 초기화합니다.
    let promiseTong, interval, timeout;

    promiseTong = [];

    // 각 Promise를 순회하면서 처리합니다.
    for (let i = 0; i < workLength; i++) {
      promiseArr[i].then(() => {
        // Promise가 성공하면 배열에 true를 추가합니다.
        promiseTong.push(true);
      }).catch((err) => {
        // Promise가 실패하면 reject를 호출하여 오류를 반환합니다.
        reject(err);
      });
    }

    // 일정 간격(interval)으로 모든 Promise가 완료되었는지 확인합니다.
    interval = setInterval(() => {
      // 모든 Promise가 완료된 경우
      if (promiseTong.length >= workLength) {
        // 0ms 후에 resolve를 호출하여 true를 반환합니다.
        timeout = setTimeout(() => {
          resolve(true);
          clearTimeout(timeout); // 타임아웃을 제거합니다.
        }, 0);
        clearInterval(interval); // 인터벌을 제거합니다.
      }
    }, 100); // 100ms 간격으로 체크합니다.
  });
}

/**
 * @method localUnique
 * @description 로컬 시스템의 네트워크 인터페이스에서 고유한 MAC 주소 기반 식별자를 생성합니다.
 * @returns {string} MAC 주소 기반의 고유 식별자 문자열을 반환합니다.
 */
Mother.prototype.localUnique = function () {

  // 네트워크 인터페이스 정보를 저장할 변수를 선언합니다.
  let networkInterfaces, macTargets;

  // os 모듈을 사용하여 시스템의 네트워크 인터페이스 정보를 가져옵니다.
  networkInterfaces = require("os").networkInterfaces();

  // 네트워크 인터페이스의 각 값을 배열로 변환하고 평탄화한 뒤,
  // IPv4 주소를 가진 객체만 필터링하고, 루프백 주소(127.0.0.1)가 아닌 주소만 필터링합니다.
  macTargets = Object.values(networkInterfaces)
    .flat() // 중첩된 배열을 단일 배열로 평탄화합니다.
    .filter((obj) => { return obj.family === "IPv4" }) // IPv4 주소만 필터링합니다.
    .filter((obj) => { return obj.address !== "127.0.0.1" }) // 루프백 주소를 제외합니다.
    .map((obj) => {
      return obj.mac; // MAC 주소만 추출합니다.
    });

  // 추출한 MAC 주소들을 정렬합니다.
  macTargets.sort();

  // 가장 첫 번째 MAC 주소를 가져와 문자열을 수정하여 고유 식별자를 생성합니다.
  // "fa"로 시작하고, 콜론(:)을 "0000"으로 대체하여 반환합니다.
  return "fa" + macTargets[0].trim().replace(/\:/gi, "0000");
}

/**
 * @method mediaQuery
 * @description 주어진 프론트 자바스크립트 코드에서 미디어 쿼리 조건에 따라 동적 콘텐츠를 삽입하거나 대체하는 변환 작업을 수행합니다.
 * @param {string} code - 변환할 코드 문자열입니다.
 * @returns {Object} 변환된 조건 문자열과 코드 문자열을 포함하는 객체를 반환합니다.
 * @throws {Error} 파싱 중 오류가 발생한 경우 예외를 발생시킵니다.
 */
Mother.prototype.mediaQuery = function (code) {

  // 미디어 쿼리 조건을 정의하는 배열입니다.
  const conditions = [
    "window.innerWidth > 1450", // 화면 너비가 1450px보다 큰 경우
    "window.innerWidth <= 1450 && window.innerWidth > 1100", // 화면 너비가 1450px 이하이고 1100px보다 큰 경우
    "window.innerWidth <= 1100 && window.innerWidth > 900", // 화면 너비가 1100px 이하이고 900px보다 큰 경우
    "window.innerWidth <= 900 && window.innerWidth > 760", // 화면 너비가 900px 이하이고 760px보다 큰 경우
    "window.innerWidth <= 760" // 화면 너비가 760px 이하인 경우
  ];

  // 프로토타입 상수를 업데이트하는 문자열입니다.
  const updateProtoConst = "GeneralJs.stacks.updateMiddleMedialQueryConditions";

  // 코드에서 특정 패턴을 찾기 위한 정규 표현식입니다.
  const matchReg = /[\n;]([^\n\;]*)\<\%\%([^\%]+)\%\%\>[;]?/g;

  // 코드에서 특정 패턴을 대체하기 위한 함수입니다.
  const replacer = function (match, p1, p2, offset, string) {
    const safeWall = "\n\n"; // 안전한 구분을 위한 개행 문자열
    let tempValue, tempArr, tempStr;

    // 코드에서 앞뒤 공백을 제거하고, 불필요한 문자를 제거한 후 처리합니다.
    tempValue = p1.replace(/[\n;]/g, '').replace(/\<\%\%/g, '').trim();

    // 조건에 해당하는 내용을 추출합니다.
    tempArr = p2.replace(/\<\%\%/g, '').replace(/\%\%\>/g, '').trim().split(",");

    // 결과를 저장할 문자열을 초기화합니다.
    tempStr = "";

    // 조건 배열의 길이가 미디어 쿼리 조건의 길이보다 큰지 확인합니다.
    if (tempArr.length > conditions.length) {
      throw new Error("parse error");
    }

    // 조건을 반복하며 변환된 코드를 생성합니다.
    for (let j = 0; j < tempArr.length; j++) {
      tempStr += " } else if (" + conditions[j] + ") { ";
      tempStr += "\n";
      tempStr += tempValue;
      tempStr += " ";
      tempStr += tempArr[j];
      tempStr += ";\n";
    }

    // 첫 번째 "else if"를 제거하고 코드에 적용합니다.
    tempStr = safeWall + tempStr.slice(7) + " }" + safeWall;
    return tempStr;
  }

  // 프로토타입을 업데이트하는 문자열을 생성합니다.
  let updateProto = '';
  updateProto += updateProtoConst;
  updateProto += " = ";
  updateProto += "[";
  for (let i of conditions) {
    updateProto += "(";
    updateProto += i;
    updateProto += "),";
  }
  updateProto += "];\n";

  // 코드에서 특정 패턴을 찾아 대체합니다.
  code = code.replace(matchReg, replacer);

  // 코드에서 "<&& ... &&>" 패턴을 찾아 대체합니다.
  code = code.replace(/\<\&\&([^\&]+)\&\&\>/g, (match, p1) => {
    let tempValue, tempArr, tempStr;

    // 패턴에서 조건을 추출하여 배열로 만듭니다.
    tempArr = p1.replace(/\<\&\&/g, '').replace(/\&\&\>/g, '').trim().split("|");

    // 배열에서 각 요소의 공백을 제거합니다.
    tempArr = tempArr.map((str) => { return str.trim(); });

    // 중첩된 삼항 연산자를 사용하여 조건에 맞는 값을 반환합니다.
    return `(${conditions[0]} ? ${tempArr[0]} : (${conditions[1]} ? ${tempArr[1]} : (${conditions[2]} ? ${tempArr[2]} : (${conditions[3]} ? ${tempArr[3]} : ${tempArr[4]}))))`;
  });

  // 조건과 변환된 코드를 포함하는 객체를 반환합니다.
  return { conditions: updateProto, code };
}

/**
 * @method processSystem
 * @description 시스템의 프로세스를 관리하는 함수로, 프로세스 목록을 가져오거나 특정 프로세스를 종료할 수 있습니다.
 * @param {string} mode - 동작 모드를 설정합니다. "list", "kill", "find", "pid" 중 하나를 선택할 수 있습니다.
 * @param {Array<string>} [processNameKeywords=[]] - "kill", "find", "pid" 모드에서 사용할 프로세스 이름 키워드 배열입니다.
 * @returns {Promise<Array|number|string|null>} 
 * - "list" 모드: 프로세스 목록을 반환합니다.
 * - "find" 또는 "pid" 모드: 특정 프로세스의 PID를 반환합니다.
 * - "kill" 모드: 프로세스를 종료하고 "done"을 반환합니다.
 * - 해당 프로세스가 없으면 null을 반환합니다.
 * @throws {Error} 잘못된 입력이 주어졌을 경우 예외를 발생시킵니다.
 */
Mother.prototype.processSystem = async function (mode, processNameKeywords = []) {

  // mode가 문자열인지 확인합니다. 문자열이 아닌 경우 오류를 발생시킵니다.
  if (typeof mode !== "string") {
    throw new Error("invalid input, must be mode");
  }

  // 프로세스 목록을 가져오는 함수입니다.
  const processList = function () {
    const { spawn } = require("child_process"); // child_process 모듈의 spawn 함수를 가져옵니다.
    const ps = spawn("ps", ["-ax"]); // "ps -ax" 명령어를 실행하여 모든 프로세스 정보를 가져옵니다.
    
    return new Promise((resolve, reject) => {
      let out, processList;

      out = ""; // 명령어 출력 결과를 저장할 변수를 초기화합니다.

      // 표준 출력을 받을 때마다 데이터를 out 변수에 추가합니다.
      ps.stdout.on("data", (data) => { out += String(data); });

      // 표준 에러 출력을 받을 때 오류를 reject를 통해 반환합니다.
      ps.stderr.on("data", (data) => { reject(String(data)); });

      // 프로세스가 종료되면 결과를 처리합니다.
      ps.on("close", (code) => {
        // 출력된 데이터를 줄 단위로 나누고, 각 줄을 정리하여 프로세스 목록을 생성합니다.
        processList = out.split("\n").slice(1).map((str) => {
          return str.trim(); // 각 줄의 양쪽 공백을 제거합니다.
        }).map((str) => {
          const arr = str.split(/[0-9]\:[0-9][0-9]/); // 시간 형식 기준으로 문자열을 나눕니다.
          if (arr.length >= 2) {
            return arr; // 유효한 프로세스 정보만 반환합니다.
          } else {
            return null; // 유효하지 않은 정보는 null로 반환합니다.
          }
        }).filter((arr) => {
          return arr !== null; // null이 아닌 정보만 필터링합니다.
        }).map(([first, second]) => {
          return [Number(first.split(" ")[0].trim()), second.split(" ").slice(1).join(" ")]; // PID와 프로세스 이름을 추출합니다.
        }).map(([pid, process]) => {
          return { pid, process }; // PID와 프로세스 이름을 객체로 반환합니다.
        });

        // 프로세스 목록을 resolve를 통해 반환합니다.
        resolve(processList);
      });
    });
  }

  // 프로세스를 종료하는 함수입니다.
  const killProcess = function (pid) {
    const { exec } = require("child_process"); // child_process 모듈의 exec 함수를 가져옵니다.
    
    return new Promise((resolve, reject) => {
      exec("kill -9 " + String(pid), { cwd: process.cwd(), maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(error); // 오류가 발생하면 reject를 호출합니다.
        } else {
          if (typeof stdout === "string") {
            resolve(stdout.trim()); // 성공적으로 종료되었으면 결과를 반환합니다.
          } else {
            resolve(stdout);
          }
        }
      });
    });
  }

  try {
    // mode가 "list"인 경우, 프로세스 목록을 반환합니다.
    if (mode === "list") {
      return await processList();

    // mode가 "kill", "find", "pid"인 경우, 프로세스 종료 또는 PID 찾기를 수행합니다.
    } else if (mode === "kill" || mode === "find" || mode === "pid") {

      // processNameKeywords가 배열인지 확인합니다. 배열이 아닌 경우 오류를 발생시킵니다.
      if (!Array.isArray(processNameKeywords)) {
        throw new Error("keywords box must be array");
      }

      // 프로세스 목록을 가져옵니다.
      const list = await processList();
      let targetPid;

      targetPid = null; // 대상 프로세스의 PID를 저장할 변수를 초기화합니다.

      // 목록에서 프로세스 이름이 키워드와 일치하는 프로세스를 찾습니다.
      for (let { pid, process } of list) {
        if (processNameKeywords.map((str) => { return new RegExp(str, "gi"); }).every((reg) => { return reg.test(process) })) {
          targetPid = pid; // 일치하는 프로세스의 PID를 저장합니다.
        }
      }

      // mode가 "find" 또는 "pid"인 경우, PID를 반환합니다.
      if (mode === "find" || mode === "pid") {
        return targetPid;

      // mode가 "kill"인 경우, 프로세스를 종료합니다.
      } else {
        if (targetPid !== null) {
          await killProcess(targetPid); // 프로세스를 종료합니다.
          return "done"; // 종료 후 "done"을 반환합니다.
        } else {
          console.log("there is no process"); // 해당 프로세스가 없으면 메시지를 출력합니다.
          return null; // null을 반환합니다.
        }
      }
    }
  } catch (e) {
    console.log(e); // 오류가 발생하면 로그를 출력합니다.
  }
}

/**
 * @method sha256Hmac
 * @description 주어진 키와 메시지를 사용하여 SHA-256 HMAC(Hash-based Message Authentication Code)를 생성합니다.
 * @param {string|Buffer} key - HMAC을 생성할 때 사용할 비밀 키입니다.
 * @param {string|Buffer} message - 해시할 메시지입니다.
 * @param {string} [type="base64"] - 생성된 HMAC의 출력 형식을 지정합니다. 기본값은 "base64"입니다. "hex", "latin1" 등 다른 형식도 사용할 수 있습니다.
 * @returns {string|Buffer} 지정된 형식으로 인코딩된 HMAC 문자열 또는 Buffer를 반환합니다.
 */
Mother.prototype.sha256Hmac = function (key, message, type = "base64") {

  // crypto 모듈을 가져옵니다. 이 모듈은 다양한 암호화 기능을 제공합니다.
  const crypto = require("crypto");

  // createHmac 메서드를 사용하여 SHA-256 알고리즘과 주어진 키로 HMAC 객체를 생성합니다.
  // update 메서드를 사용하여 주어진 메시지를 HMAC 객체에 추가합니다.
  // digest 메서드를 사용하여 지정된 형식으로 결과를 출력합니다.
  return crypto.createHmac("sha256", key) // SHA-256 HMAC 객체를 생성합니다.
               .update(message) // 메시지를 HMAC 객체에 추가하여 해시를 계산합니다.
               .digest(type); // 결과를 지정된 형식으로 반환합니다.
}

/**
 * @method stringToBase64
 * @description 주어진 문자열을 Base64 인코딩된 문자열로 변환합니다.
 * @param {string} str - Base64로 인코딩할 문자열입니다.
 * @returns {string} Base64로 인코딩된 문자열을 반환합니다.
 */
Mother.prototype.stringToBase64 = function (str) {

  // iconv-lite 모듈을 가져옵니다. 이 모듈은 문자열의 인코딩을 변환하는 기능을 제공합니다.
  const iconv = require("iconv-lite");

  // 주어진 문자열을 UTF-8로 인코딩한 후, Base64 형식의 문자열로 변환하여 반환합니다.
  return iconv.encode(str, "utf-8") // 문자열을 UTF-8 인코딩으로 변환합니다.
               .toString("base64"); // UTF-8로 인코딩된 데이터를 Base64 문자열로 변환하여 반환합니다.
}

/**
 * @method base64ToString
 * @description Base64로 인코딩된 데이터를 UTF-8 문자열로 디코딩합니다.
 * @param {string} data - UTF-8 문자열로 디코딩할 Base64 인코딩된 데이터입니다.
 * @returns {string} 디코딩된 UTF-8 문자열을 반환합니다.
 */
Mother.prototype.base64ToString = function (data) {

  // iconv-lite 모듈을 가져옵니다. 이 모듈은 인코딩을 변환하는 기능을 제공합니다.
  const iconv = require("iconv-lite");

  // Base64로 인코딩된 데이터를 Buffer 객체로 변환한 후, 이를 UTF-8 문자열로 디코딩하여 반환합니다.
  return iconv.decode(
    Buffer.from(data, "base64"), // Base64 인코딩된 문자열을 Buffer 객체로 변환합니다.
    "utf-8" // Buffer 객체를 UTF-8 문자열로 디코딩합니다.
  );
}

/**
 * @method variableArray
 * @description 주어진 길이와 콜백 함수에 따라 배열을 생성합니다. 이 메서드는 Python의 range() 함수와 유사한 기능을 수행합니다.
 * @param {number} length - 생성할 배열의 길이입니다.
 * @param {function|null} [callback=null] - 각 배열 요소를 초기화할 때 사용할 콜백 함수입니다. 함수가 제공되지 않으면 기본적으로 인덱스 값이 요소로 사용됩니다.
 * @returns {Array} 생성된 배열을 반환합니다.
 * @throws {Error} length가 숫자가 아닌 경우 예외를 발생시킵니다.
 */
Mother.prototype.variableArray = function (length, callback = null) {

  // length가 숫자인지 확인합니다. 숫자가 아닌 경우 오류를 발생시킵니다.
  if (typeof length !== "number") {
    throw new Error("invaild input");
  }

  // 결과 배열을 저장할 targetArray 변수를 초기화합니다.
  let targetArray = [];

  // 주어진 길이만큼 반복하여 배열을 생성합니다.
  for (let i = 0; i < length; i++) {

    // 콜백 함수가 제공된 경우, 콜백 함수의 반환값을 배열에 추가합니다.
    if (typeof callback === "function") {
      targetArray.push(callback(i));

    // 콜백 함수가 제공되지 않은 경우, 인덱스 값을 배열에 추가합니다.
    } else {
      targetArray.push(i);
    }
  }

  // 생성된 배열을 반환합니다.
  return targetArray;
}

/**
 * @method autoHypenPhone
 * @description 입력된 핸드폰 번호 문자열에 자동으로 하이픈(-)을 추가하여 포맷팅합니다. 주로 고객이 핸드폰 번호를 입력할 때 사용됩니다.
 * @param {string} m - 하이픈을 추가할 핸드폰 번호 문자열입니다.
 * @returns {string} 하이픈이 추가된 포맷팅된 핸드폰 번호를 반환합니다.
 */
Mother.prototype.autoHypenPhone = function (m) {

  // 입력된 문자열 m의 양쪽 공백을 제거합니다.
  let str = m.trim();

  // 문자열에서 숫자가 아닌 모든 문자를 제거합니다.
  str = str.replace(/[^0-9]/g, '');

  // 결과를 저장할 임시 변수 tmp를 초기화합니다.
  let tmp = '';

  // 문자열 길이가 4 미만인 경우, 하이픈 없이 그대로 반환합니다.
  if (str.length < 4) {
    return str;

  // 문자열 길이가 4 이상 7 미만인 경우, 3자리 뒤에 하이픈을 추가합니다.
  } else if (str.length < 7) {
    tmp += str.substr(0, 3); // 처음 3자리를 tmp에 추가합니다.
    tmp += '-';              // 하이픈을 추가합니다.
    tmp += str.substr(3);    // 나머지 문자열을 tmp에 추가합니다.
    return tmp;

  // 문자열 길이가 7 이상 11 미만인 경우, 3자리와 3자리 뒤에 하이픈을 추가합니다.
  } else if (str.length < 11) {
    tmp += str.substr(0, 3); // 처음 3자리를 tmp에 추가합니다.
    tmp += '-';              // 하이픈을 추가합니다.
    tmp += str.substr(3, 3); // 다음 3자리를 tmp에 추가합니다.
    tmp += '-';              // 하이픈을 추가합니다.
    tmp += str.substr(6);    // 나머지 문자열을 tmp에 추가합니다.
    return tmp;

  // 문자열 길이가 11자리 이상인 경우, 3자리와 4자리 뒤에 하이픈을 추가합니다.
  } else {
    tmp += str.substr(0, 3); // 처음 3자리를 tmp에 추가합니다.
    tmp += '-';              // 하이픈을 추가합니다.
    tmp += str.substr(3, 4); // 다음 4자리를 tmp에 추가합니다.
    tmp += '-';              // 하이픈을 추가합니다.
    tmp += str.substr(7);    // 나머지 문자열을 tmp에 추가합니다.
    return tmp;
  }
}

/**
 * @method designerCareer
 * @description 디자이너의 총 경력을 계산하여 반환합니다. wordingMode가 true일 경우, HTML 형식의 경력 문자열을 반환하고, false일 경우에는 [연, 월] 배열을 반환합니다.
 * @param {Object} designer - 디자이너 정보를 담고 있는 객체입니다. 디자이너의 경력 시작 연도와 월, 관련 경력 등을 포함합니다.
 * @param {boolean} [wordingMode=false] - true일 경우, HTML 형식의 경력 문자열을 반환하고, false일 경우, [연, 월] 배열을 반환합니다.
 * @returns {string|Array<number>} 계산된 경력을 HTML 형식의 문자열 또는 [연, 월] 배열로 반환합니다.
 */
Mother.prototype.designerCareer = function (designer, wordingMode = false) {

  // 현재 날짜를 가져옵니다.
  const today = new Date();

  // 디자이너의 경력을 계산하기 위한 변수를 선언합니다.
  let careerSubtract;
  let year, month;
  let sumCareer;
  let finalYear, finalMonth;

  // 경력 계산을 위해 현재 연도와 월을 디자이너의 경력 시작 연도와 월과 비교하여 차이를 계산합니다.
  careerSubtract = ((today.getFullYear() * 12) + (today.getMonth() + 1)) // 현재 연도와 월을 월 단위로 환산하여 계산합니다.
                 - ((designer.information.business.career.startY * 12) + designer.information.business.career.startM); // 경력 시작 연도와 월을 월 단위로 환산하여 계산합니다.

  // 연 단위 경력을 계산합니다.
  year = Math.floor(careerSubtract / 12); // 총 경력에서 연 단위 부분을 계산합니다.

  // 월 단위 경력을 계산합니다.
  month = (careerSubtract % 12); // 총 경력에서 남은 월 단위를 계산합니다.

  // 총 경력(경력 시작 후 연차와 추가 경력 연차를 합산)을 월 단위로 계산합니다.
  sumCareer = (year * 12) + month // 경력 시작 후 연차를 월 단위로 환산하여 계산합니다.
            + (designer.information.business.career.relatedY * 12) + designer.information.business.career.relatedM; // 추가 경력 연차를 월 단위로 환산하여 합산합니다.

  // 최종적으로 연 단위와 월 단위로 나누어 계산합니다.
  finalYear = Math.floor(sumCareer / 12); // 최종 경력에서 연 단위 부분을 계산합니다.
  finalMonth = (sumCareer % 12); // 최종 경력에서 남은 월 단위를 계산합니다.

  // wordingMode가 true인 경우, HTML 형식의 경력 문자열을 반환합니다.
  if (wordingMode) {
    return `경력&nbsp;&nbsp;<b%|%b>&nbsp;&nbsp;${String(finalYear)}년 ${String(finalMonth)}개월`;

  // wordingMode가 false인 경우, [연, 월] 배열을 반환합니다.
  } else {
    return [finalYear, finalMonth];
  }
}

/**
 * @method chromeOpen
 * @description 주어진 URL을 사용하여 Chrome 브라우저를 실행하고 해당 페이지를 엽니다. 운영 체제에 따라 적절한 명령어를 사용합니다.
 * @param {string} url - 열고자 하는 웹 페이지의 URL입니다.
 * @returns {Promise<string>} Chrome 실행 결과를 반환하는 Promise입니다.
 * @throws {Error} 알 수 없는 운영 체제일 경우 예외를 발생시킵니다.
 */
Mother.prototype.chromeOpen = async function (url) {

  // 현재 Mother 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // child_process 모듈에서 exec 함수를 가져옵니다. 이 함수는 명령어를 실행하는 데 사용됩니다.
  const { exec } = require('child_process');

  // os 모듈을 가져와 현재 운영 체제의 종류를 확인합니다.
  const os = require('os');
  const thisOs = os.type(); // 현재 운영 체제의 종류를 가져옵니다.

  // 사용할 운영 체제를 저장할 변수를 선언합니다.
  let targetOs;

  // 현재 운영 체제의 종류에 따라 targetOs 변수를 설정합니다.
  if (/Linux/gi.test(thisOs)) {
    targetOs = "linux"; // 운영 체제가 Linux인 경우
  } else if (/Darwin/gi.test(thisOs)) {
    targetOs = "mac"; // 운영 체제가 macOS인 경우
  } else if (/Windows/gi.test(thisOs)) {
    targetOs = "windows"; // 운영 체제가 Windows인 경우
  } else {
    throw new Error("unknown os"); // 알 수 없는 운영 체제일 경우 오류를 발생시킵니다.
  }

  // URL에서 특수 문자를 이스케이프 처리하여 명령어에 사용할 수 있도록 수정합니다.
  let finalUrl = url.replace(/\?/gi, "\\?");
  finalUrl = finalUrl.replace(/\&/gi, "\\&");
  finalUrl = finalUrl.replace(/\=/gi, "\\=");
  finalUrl = finalUrl.replace(/\+/gi, "\\+");

  // Linux 운영 체제인 경우
  if (targetOs === "linux") {
    return new Promise((resolve, reject) => {
      // google-chrome 명령어를 사용하여 Chrome을 실행하고 URL을 엽니다.
      exec(`google-chrome ${finalUrl} --start-maximized`, (error, stdout, stderr) => {
        setTimeout(() => {
          resolve(stdout); // 실행 결과를 반환합니다.
        }, 0);
      });
    });

  // Windows 운영 체제인 경우
  } else if (targetOs === "windows") {
    const path = require("path"); // path 모듈을 가져옵니다.
    const { sep, normalize } = path; // path 모듈에서 sep(경로 구분자)과 normalize(경로 정규화) 함수를 가져옵니다.
    const { exec, execFile } = require("child_process"); // child_process 모듈에서 exec와 execFile 함수를 가져옵니다.
    const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe"; // Windows에서 Chrome 실행 파일의 경로를 설정합니다.
    return new Promise((resolve, reject) => {
      // execFile 명령어를 사용하여 Chrome을 실행하고 URL을 엽니다.
      execFile(normalize(chrome), ["--start-maximized", finalUrl], (error, stdout, stderr) => {
        setTimeout(() => {
          resolve(stdout); // 실행 결과를 반환합니다.
        }, 0);
      });
    });

  // macOS 운영 체제인 경우
  } else if (targetOs === "mac") {
    return new Promise((resolve, reject) => {
      // macOS에서 Google Chrome을 실행하는 명령어를 사용하여 URL을 엽니다.
      exec(`/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome' --start-maximized ${finalUrl}`, (error, stdout, stderr) => {
        setTimeout(() => {
          resolve(stdout); // 실행 결과를 반환합니다.
        }, 0);
      });
    });
  }
}

/**
 * @method homeliaisonAnalytics
 * @description 서버사이드에서 웹 사용자 로그를 분석하기 위한 함수입니다. 이 함수는 Google Analytics를 참고하여 만들어진 프론트 웹 사용자 로그 분석기로, 서버 사이드에서 메타의 픽셀처럼 이벤트를 전송하고 분석할 수 있게 설계되었습니다.
 * @param {Object} obj - 분석할 로그 데이터 객체입니다. 이 객체는 action과 data 속성을 포함해야 합니다.
 * @param {string} [infoName="officeinfo"] - 사용할 정보 객체의 이름입니다. 기본값은 "officeinfo"입니다.
 * @returns {Promise<Object|null>} 서버로 전송된 로그의 응답 객체를 반환합니다. 오류가 발생하면 null을 반환합니다.
 * @throws {Error} 입력 데이터가 유효하지 않거나, 지정된 정보 객체가 존재하지 않을 경우 예외를 발생시킵니다.
 */
Mother.prototype.homeliaisonAnalytics = async function (obj, infoName = "officeinfo") {

  // 필요한 모듈을 가져옵니다.
  const axios = require("axios"); // HTTP 요청을 보내기 위해 axios 모듈을 사용합니다.
  const crypto = require("crypto"); // 고유한 ID 생성을 위해 crypto 모듈을 사용합니다.
  const address = require(`${process.cwd()}/apps/infoObj.js`); // 서버의 주소 정보를 가져옵니다.

  try {
    // obj가 객체이고 null이 아닌지 확인합니다. 유효하지 않으면 오류를 발생시킵니다.
    if (typeof obj !== "object" || obj === null) {
      throw new Error("invalid input");
    }

    // obj.action이 문자열이고 obj.data가 정의되어 있는지 확인합니다. 유효하지 않으면 오류를 발생시킵니다.
    if (typeof obj.action !== "string" || obj.data === undefined) {
      throw new Error("invalid input");
    }

    // obj.data가 객체이고 null이 아닌지 확인합니다. 유효하지 않으면 오류를 발생시킵니다.
    if (typeof obj.data !== "object" || obj.data === null) {
      throw new Error("invalid input");
    }

    // infoName이 문자열인지 확인합니다. 유효하지 않으면 오류를 발생시킵니다.
    if (typeof infoName !== "string") {
      throw new Error("invalid input");
    }

    // infoName에 해당하는 주소 정보가 존재하는지 확인합니다. 존재하지 않으면 오류를 발생시킵니다.
    if (address[infoName] === undefined) {
      throw new Error("invalid info name");
    }

    // 서버 사이드에서 로그를 분석하기 위한 고유 ID와 사용자 에이전트를 설정합니다.
    const idKeyword = "homeliaisonServer"; // ID의 고유 키워드입니다.
    const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"; // 서버에서 사용할 사용자 에이전트입니다.
    const randomHex0 = crypto.randomBytes(8).toString("hex"); // 8바이트의 랜덤한 HEX 값을 생성합니다.
    const randomHex1 = crypto.randomBytes(4).toString("hex"); // 4바이트의 랜덤한 HEX 값을 생성합니다.
    const timeValue = String((new Date()).valueOf()).slice(0, -3); // 현재 시간을 초 단위로 가져옵니다.
    const token = "_"; // ID 구분을 위한 구분자입니다.
    const thisId = idKeyword + token + randomHex0 + token + timeValue + token + randomHex1; // 최종 고유 ID를 생성합니다.
    const thisInfo = address[infoName]; // 지정된 정보 객체를 가져옵니다.
    const url = "https://" + address.testinfo.host + ":3000/getAnalytics"; // 로그를 전송할 서버의 URL입니다.

    // 전송할 데이터를 저장할 객체를 초기화합니다.
    let dataObject = {};

    // 로그 데이터 객체를 구성합니다.
    dataObject.page = "serverSide"; // 페이지 정보를 "serverSide"로 설정합니다.
    dataObject.standard = new Date(); // 현재 시간을 표준 시간으로 설정합니다.
    dataObject.action = obj.action; // 전달받은 action을 설정합니다.
    dataObject.data = obj.data; // 전달받은 data를 설정합니다.
    dataObject.id = thisId; // 생성된 고유 ID를 설정합니다.
    dataObject.info = {
      ip: thisInfo.ip.outer, // 외부 IP 주소를 설정합니다.
      userAgent: userAgent, // 사용자 에이전트를 설정합니다.
      referer: "", // 참조 URL을 빈 문자열로 설정합니다.
      requestUrl: "", // 요청 URL을 빈 문자열로 설정합니다.
      pageTitle: "", // 페이지 제목을 빈 문자열로 설정합니다.
    };

    // 로그 데이터를 서버로 전송하고 응답을 반환합니다.
    let res = await axios.post(url, dataObject, {
      headers: {
        "Content-Type": "application/json", // 요청 헤더를 JSON 형식으로 설정합니다.
        "User-Agent": userAgent, // 요청 헤더에 사용자 에이전트를 추가합니다.
      }
    });

    return res; // 서버의 응답 객체를 반환합니다.

  } catch (e) {
    // 오류가 발생하면 콘솔에 오류를 출력하고 null을 반환합니다.
    console.log(e);
    return null;
  }
}

module.exports = Mother;
