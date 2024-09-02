/**
 * HumanPacket 클래스는 다양한 통신 수단(SMS, 이메일 등)을 통해 메시지를 전송하는 기능을 제공합니다.
 * @constructor
 */
const HumanPacket = function () {
  // Mother 모듈을 로드하고 인스턴스를 생성합니다.
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother(); // Mother 클래스의 인스턴스를 this.mother에 할당합니다.
  
  // address 모듈을 로드합니다.
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  
  // 현재 작업 디렉터리를 기준으로 humanPacket 관련 디렉터리를 설정합니다.
  this.dir = process.cwd() + "/apps/humanPacket";
  this.moduleDir = this.dir + "/module"; // 모듈 디렉터리 경로를 설정합니다.

  // SMS API URL 및 관련 설정을 정의합니다.
  this.url = {
    sms: "https://apis.aligo.in/send/", // SMS 전송을 위한 기본 URL
  };
  
  // SMS API 사용자 정보
  this.user = {
    sms: "hliaison", // SMS 서비스에 사용되는 사용자 ID
  };

  // SMS API 키
  this.apiKey = {
    sms: "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2", // SMS 서비스 API 키
  };

  // SMS 발신자 정보
  this.sender = {
    sms: "0220392252", // SMS 발신자 번호
  };

  this.senderkey = "dd2f3f0b034a044b16531e5171cbcc764fb716eb"; // 추가 인증에 필요한 발신자 키

  // 이메일 관련 기본 설정
  this.webmailHostConst = "webmail"; // 웹메일 호스트 주소
  this.webmailPort = 110; // POP3 포트 번호
  this.webmailSmtpHost = "smtp.cafe24.com"; // SMTP 서버 주소
  this.webmailSmtpPort = 587; // SMTP 포트 번호
  this.webmailSmtpId = "help"; // SMTP 사용자 ID
  this.webmailSmtpPwd = "hlofwis83!"; // SMTP 비밀번호
}

/**
 * SMS 메시지를 전송합니다.
 * @param {Object} obj - SMS 전송을 위한 객체로, 'to'와 'body' 속성을 포함해야 합니다.
 * @returns {Promise<boolean>} SMS 전송 성공 여부를 반환합니다.
 * @throws {Error} 유효하지 않은 입력이 제공된 경우 예외를 발생시킵니다.
 */
HumanPacket.prototype.sendSms = async function (obj) {
  // 입력 값이 객체가 아닌 경우 또는 null인 경우 예외를 발생시킵니다.
  if (typeof obj !== "object" || obj === null) {
    throw new Error("invalid input"); // "invaild"를 "invalid"로 수정
  }
  
  // 'to'와 'body' 속성이 없는 경우 예외를 발생시킵니다.
  if (obj.to === undefined || obj.body === undefined) {
    throw new Error("invalid input"); // "invaild"를 "invalid"로 수정
  }

  // 현재 인스턴스를 참조합니다.
  const instance = this;
  // Mother 객체의 유틸리티 메서드를 구조 분해 할당으로 가져옵니다.
  const { autoHypenPhone, requestSystem, errorLog, sleep, emergencyAlarm } = this.mother;
  
  // SMS 관련 설정을 구조 분해 할당으로 가져옵니다.
  const { url: { sms }, user, apiKey, sender, senderkey } = this;

  // 다른 URL을 사용하여 백업 SMS API를 정의합니다.
  const url = "https://centrex.uplus.co.kr/RestApi/smssend";

  // 발신자 정보를 포함한 정보를 address 모듈에서 가져옵니다.
  const { officeinfo: { phone: { numbers: phoneNumbers, password: pass } } } = this.address;

  try {
    // 변수 선언
    let id;
    let destnumber;
    let smsmsg;
    let res;
    let safeNum;
    let finalResult;

    // 발신자 번호를 가져옵니다.
    id = phoneNumbers[0];

    // 수신자 번호에서 숫자만 추출합니다.
    destnumber = obj.to.replace(/[^0-9]/gi, '');

    // SMS 메시지를 구성합니다.
    smsmsg = "[제목없음]\n\n" + (/^\[홈리에종\]/i.test(obj.body.trim()) ? obj.body.trim() : "[홈리에종] " + obj.body.trim());

    try {
      // 1차로 Aligo API를 사용하여 SMS를 전송합니다.
      res = await requestSystem(sms, {
        key: apiKey.sms, // API 키
        user_id: user.sms, // 사용자 ID
        sender: sender.sms, // 발신자 번호
        receiver: destnumber, // 수신자 번호
        msg: smsmsg // 메시지 본문
      });

      // 응답 데이터가 정상적이고 성공적인 메시지 전송인지 확인합니다.
      if (typeof res.data === "object" && res.data !== null && res.data.message === "success") {
        finalResult = true;
      } else {
        throw new Error("aligo fail"); // Aligo API 실패 시 예외를 발생시킵니다.
      }
    } catch (e) {
      console.log(e); // 오류를 콘솔에 기록합니다.

      // 2차로 Uplus API를 사용하여 SMS를 전송합니다.
      safeNum = 0;
      do {
        // SMS 전송을 요청합니다.
        res = ((await requestSystem(url + "?id=" + id + "&pass=" + pass + "&destnumber=" + destnumber + "&smsmsg=" + global.encodeURIComponent(smsmsg), { id, pass, destnumber, smsmsg }, { headers: { "Content-Type": "application/json" } })).data);
        safeNum++;
      } while (res["SVC_RT"] !== "0000" && safeNum < 5); // 성공 코드가 나올 때까지 시도하거나 5회 시도 후 종료합니다.
  
      // 실패할 경우 예외를 발생시킵니다.
      if (res["SVC_RT"] !== "0000") {
        throw new Error("sms send fail : " + res["DATAS"]);
      }
      
      // 남은 SMS 전송 횟수를 기록합니다.
      errorLog("sms remain num : " + res["DATAS"]["RESTCOUNT"]).catch((err) => { console.log(err); });
      finalResult = (res["SVC_RT"] === "0000"); // 성공 여부를 저장합니다.
    }

    return finalResult; // 최종 결과를 반환합니다.
  } catch (e) {
    // 긴급 알람을 발생시킵니다.
    emergencyAlarm("sms error : " + e.message).catch((err) => { console.log(err); });
    console.log(e); // 오류를 콘솔에 기록합니다.
    return false; // 실패 시 false를 반환합니다.
  }
}

/**
 * homeliaisonLogin 메서드는 사용자의 ID와 비밀번호를 사용하여 POP3 서버에 로그인하는 기능을 제공합니다.
 * 이 메서드는 주로 홈리에종 웹메일 시스템에 로그인하는 데 사용됩니다.
 *
 * @param {string} id - 로그인할 사용자의 ID.
 * @param {string} pwd - 로그인할 사용자의 비밀번호.
 * @returns {Promise<Object>} POP3 클라이언트 객체를 반환합니다. 로그인에 실패하면 예외가 발생합니다.
 */
HumanPacket.prototype.homeliaisonLogin = async function (id, pwd) {
  // 현재 HumanPacket 인스턴스를 참조합니다.
  const instance = this;
  
  // address 모듈을 가져옵니다.
  const address = this.address;
  
  // moduleDir, webmailHostConst, webmailPort를 구조 분해 할당하여 가져옵니다.
  const { moduleDir, webmailHostConst, webmailPort } = this;

  try {
    // 웹메일 호스트 주소를 구성합니다.
    const host = webmailHostConst + "." + address.frontinfo.host;

    // Pop3Client 클래스를 동적으로 로드합니다.
    const Pop3Client = require(`${moduleDir}/pop3.js`);

    // Pop3Client의 인스턴스를 생성합니다.
    const client = new Pop3Client(webmailPort, host, {
      tlserrs: false, // TLS 오류를 무시하지 않도록 설정합니다.
      enabletls: false, // TLS를 사용하지 않도록 설정합니다.
      debug: false // 디버그 모드를 비활성화합니다.
    });

    // POP3 서버에 연결합니다.
    await client.connect();

    // 제공된 ID와 비밀번호를 사용하여 로그인합니다.
    await client.login(id + "@" + address.frontinfo.host, pwd);

    // 클라이언트 객체에 id 속성을 추가합니다.
    client.id = id;

    // 성공적으로 로그인하면 POP3 클라이언트 객체를 반환합니다.
    return client;
  } catch (e) {
    // 로그인 과정에서 발생한 오류를 콘솔에 출력합니다.
    console.log(e);
  }
}

/**
 * listMails 메서드는 주어진 ID와 비밀번호를 사용하여 POP3 서버에서 이메일 목록을 가져옵니다.
 * 이 메서드는 이메일의 기본 헤더 정보(날짜, 발신자, 제목)를 반환합니다.
 *
 * @param {string} id - POP3 서버에 로그인할 사용자 ID.
 * @param {string} pwd - POP3 서버에 로그인할 사용자 비밀번호.
 * @returns {Promise<Array>} 이메일 목록 배열을 반환합니다. 각 이메일은 인덱스와 헤더 정보를 포함합니다.
 */
HumanPacket.prototype.listMails = async function (id, pwd) {
  // 현재 HumanPacket 인스턴스를 참조합니다.
  const instance = this;

  // 필요한 값을 this로부터 구조 분해 할당하여 가져옵니다.
  const { webmailPort: port, webmailHostConst: webmail } = this;
  const { stringToBase64, base64ToString, errorLog, sleep, equalJson } = this.mother;

  try {
    // 웹메일 호스트 주소를 설정합니다.
    const host = this.address.frontinfo.host;
    const webmailHost = webmail + "." + host;

    // net과 iconv-lite 모듈을 가져옵니다.
    const net = require("net");
    const iconv = require("iconv-lite");

    // Base64 디코딩 함수 정의
    const base64Decode = (data, charset) => {
      try {
        return iconv.decode(Buffer.from(data, "base64"), charset);
      } catch (e) {
        return '';
      }
    };

    // Quoted-Printable 디코딩 함수 정의
    const quotedDecode = (data, charset) => {
      let bits;
      try {
        data = data.replace(/(\r\n|\n|\r)/g, "\n");
        data = data.replace(/=\n/g, "");

        bits = data.split("%");
        for (let i = 0; i < bits.length; i++) {
          bits[i] = bits[i].replace(/=/g, "%");
          bits[i] = global.decodeURIComponent(bits[i]);
        }
        return bits.join("%");
      } catch (e) {
        return base64Decode(data, charset);
      }
    };

    // 이메일 목록을 가져오는 함수 정의
    const getList = () => {
      return new Promise((resolve, reject) => {
        const socket = net.createConnection(port, webmailHost);
        let buffer = '';
        
        // 서버로부터 데이터를 수신할 때의 이벤트 핸들러
        socket.on("data", (data) => {
          data = data.toString();
          if (/\+OK logged in/gi.test(data)) {
            socket.write("LIST " + "\r\n");
          }
          buffer += data;
          if (buffer.substr(buffer.length - 5) === "\r\n.\r\n") {
            socket.emit("list");
          }
        });

        // LIST 명령어에 대한 응답을 처리할 때의 이벤트 핸들러
        socket.on("list", () => {
          socket.write("QUIT \r\n");
          const raw = buffer.split("\r\n").filter((str) => { return /^[0-9]/gi.test(str) }).filter((str) => {
            return /^[0-9]+ [0-9]+/g.test(str);
          }).map((str) => {
            return str.split(' ');
          }).filter((arr) => {
            return arr.length === 2;
          }).map(([ number, size ]) => {
            return {
              index: Number(number),
              size: Number(size),
            }
          });
          resolve({
            count: raw.reduce((acc, curr) => {
              return acc > curr.index ? acc : curr.index
            }, 0),
            data: raw
          });
        });

        // 에러가 발생했을 때의 이벤트 핸들러
        socket.on("error", (err) => {
          reject(err);
        });

        // 서버에 USER와 PASS 명령어를 사용하여 로그인 시도
        socket.write("USER " + id + "@" + host + "\r\nPASS " + pwd + "\r\n");
      });
    };

    // 특정 메일의 헤더를 가져오는 함수 정의
    const getHeader = (number) => {
      return new Promise((resolve, reject) => {
        const socket = net.createConnection(port, webmailHost);
        let head = '', additional = 0;

        // 서버로부터 데이터를 수신할 때의 이벤트 핸들러
        socket.on("data", (data) => {
          data = data.toString();
          if (/\+OK logged in/gi.test(data)) {
            socket.write("RETR " + String(number) + "\r\n");
          }
          if (/\+OK [0-9]+ octets follow/.test(data)) {
            head += data;
            if (head.split("\r\n").some((str) => { return /^Date\:/.test(str) }) && head.split("\r\n").some((str) => { return /^Subject\:/.test(str) }) && head.split("\r\n").some((str) => { return /^From\:/.test(str) })) {
              additional = 0;
              socket.emit("head");
            } else {
              additional = 1;
            }
          }
          if (additional === 1) {
            head += data;
            if (head.split("\r\n").some((str) => { return /^Date\:/.test(str) }) && head.split("\r\n").some((str) => { return /^Subject\:/.test(str) }) && head.split("\r\n").some((str) => { return /^From\:/.test(str) })) {
              additional = 0;
              socket.emit("head");
            } else {
              additional = 1;
            }
          }
        });

        // 메일 헤더를 처리하는 이벤트 핸들러
        socket.on("head", () => {
          const rawArr = head.split("\r\n").slice(1);
          let headers = {}, tempStr = '', fromString = '';

          // 헤더 데이터를 파싱
          for (let str of rawArr) {
            if (/^[a-zA-Z][^\:]+\:/i.test(str)) {
              let tempArr = str.split(":").map((s) => { return s.trim(); });
              tempStr = tempArr[0];
              if (tempArr.length > 1) {
                headers[tempStr] = tempArr.slice(1).join(':');
              } else {
                headers[tempStr] = '';
              }
            } else if (str.trim() === '') {
              break;
            } else {
              headers[tempStr] += str;
            }
          }

          // 날짜 정보 포맷 처리
          headers["Date"] = headers["Date"].replace(/  /gi, ' ').replace(/\([^\)]+\)/gi, '').trim();
          if (/^[A-Z][a-z][a-z], [0-9] /.test(headers["Date"])) {
            headers["Date"] = headers["Date"].split(", ")[0] + ', 0' + headers["Date"].split(", ")[1];
          }
          headers["Date"] = new Date(headers["Date"].trim());

          // 발신자 정보 처리
          fromString = headers["From"].trim();
          if (/\<[^\>]+\>/gi.test(fromString)) {
            fromString = [ ...fromString.matchAll(/\<[^\>]+\>/gi) ][0][0].slice(1, -1);
          } else {
            let matchArr = [ ...fromString.matchAll(/[^@]+@[^\.]+\.[a-zA-Z0-9]+/gi) ];
            if (matchArr.length > 0) {
              fromString = matchArr[0][0].trim();
            } else {
              fromString = "unknown@unknown.unknown";
            }
          }
          headers["From"] = fromString.trim();

          // 제목 정보 처리 (Base64 및 Quoted-Printable 디코딩)
          headers["Subject"] = headers["Subject"].split(/[ \n\t]/).map((str) => { return str.trim() }).map((str) => {
            let tempArr;
            let charset, baseBoo, data;
            if (/^\=\?/.test(str) && /\?\=$/.test(str)) {
              tempArr = str.slice(2, -2).split('?');
              charset = tempArr[0];
              baseBoo = tempArr[1];
              data = tempArr.slice(2).join('?');
              if (baseBoo === 'B' || baseBoo === 'b') {
                return base64Decode(data, charset);
              } else {
                return quotedDecode(data, charset);
              }
            } else {
              return str;
            }
          }).join('');

          // 제목을 Base64로 인코딩하여 저장
          headers["Subject"] = instance.mother.stringToBase64(headers["Subject"]);

          socket.write("QUIT \r\n");
          resolve(headers);
        });

        // 에러가 발생했을 때의 이벤트 핸들러
        socket.on("error", (err) => {
          reject(err);
        });

        // 서버에 USER와 PASS 명령어를 사용하여 로그인 시도
        socket.write("USER " + id + "@" + host + "\r\nPASS " + pwd + "\r\n");
      });
    };

    // 이메일 헤더를 가져오는 함수 (재시도 로직 포함)
    const waitGetHeader = async (index) => {
      try {
        return await getHeader(index);
      } catch (e) {
        await sleep(200);
        return await waitGetHeader(index);
      }
    };

    // 이메일 목록 가져오기
    const { count } = await getList();
    let tong = [];
    let tempObj;
    let errorTimeout;

    // 에러 타임아웃 설정 (1분)
    errorTimeout = setTimeout(async () => {
      await errorLog("pop3 error");
      throw new Error("pop3 error");
    }, 60 * 1000);

    // 모든 이메일의 헤더 정보를 가져와서 리스트에 추가
    for (let i = 0; i < count; i++) {
      tempObj = {};
      tempObj.index = i + 1;
      let tempHeaders = await waitGetHeader(tempObj.index);
      tempObj.headers = {
        date: tempHeaders["Date"],
        from: tempHeaders["From"],
        subject: tempHeaders["Subject"],
      };
      tong.push(tempObj);
    }

    // 에러 타임아웃 해제
    clearTimeout(errorTimeout);

    // 결과 반환
    return tong;
  } catch (e) {
    // 에러가 발생한 경우 로그 기록 및 null 반환
    await errorLog("pop3 error");
    console.log(e);
    return null;
  }
}

/**
 * getMails 메서드는 주어진 사용자 ID와 비밀번호를 사용하여 POP3 서버에서 이메일을 가져옵니다.
 * 지정된 인덱스 배열에 해당하는 이메일을 다운로드하고, 이메일의 날짜, 발신자, 제목, 원시 데이터를 포함한 객체 배열을 반환합니다.
 *
 * @param {string} id - POP3 서버에 로그인할 사용자 ID.
 * @param {string} pwd - POP3 서버에 로그인할 사용자 비밀번호.
 * @param {Array<number>} indexArr - 가져올 이메일의 인덱스 배열. 배열이 비어 있을 경우 모든 이메일을 가져옵니다.
 * @returns {Promise<Array>} 이메일 정보를 포함한 객체 배열을 반환합니다.
 */
HumanPacket.prototype.getMails = async function (id, pwd, indexArr = []) {
  // 현재 HumanPacket 인스턴스를 참조합니다.
  const instance = this;

  // Mother 객체에서 문자열을 Base64로 변환 및 역변환하는 함수를 가져옵니다.
  const { stringToBase64, base64ToString } = this.mother;

  try {
    // homeliaisonLogin 메서드를 사용하여 POP3 클라이언트를 초기화하고 로그인합니다.
    const client = await this.homeliaisonLogin(id, pwd);

    // 클라이언트로부터 이메일의 총 개수를 가져옵니다.
    const { count } = await client.list();

    // iconv-lite 모듈을 가져옵니다.
    const iconv = require("iconv-lite");

    // Base64로 인코딩된 문자열을 디코딩하는 함수 정의
    const base64Decode = (data, charset) => {
      try {
        return iconv.decode(Buffer.from(data, "base64"), charset);
      } catch (e) {
        return '';
      }
    };

    // Quoted-Printable로 인코딩된 문자열을 디코딩하는 함수 정의
    const quotedDecode = (data, charset) => {
      let bits;
      try {
        data = data.replace(/(\r\n|\n|\r)/g, "\n");
        data = data.replace(/=\n/g, "");

        bits = data.split("%");
        for (let i = 0; i < bits.length; i++) {
          bits[i] = bits[i].replace(/=/g, "%");
          bits[i] = global.decodeURIComponent(bits[i]);
        }
        return bits.join("%");
      } catch (e) {
        return base64Decode(data, charset);
      }
    };

    // 분할 토큰 정의 (이메일 본문의 구분을 위해 사용)
    const areaSplitToken = "____areaSplit____";
    let tong = [];
    let rawData;
    let tempObj;
    let dateString, fromString;
    let rawArr;
    let dateObject;
    let rawTong;
    let tempArr;
    let areaSplitTong;
    let rawMatrix;
    let headers;
    let tempStr;
    let matchArr;

    // 인덱스 배열이 비어 있는 경우, 모든 이메일의 인덱스를 설정합니다.
    if (indexArr.length === 0) {
      indexArr = [];
      for (let i = 0; i < count; i++) {
        indexArr.push(i + 1);
      }
    }

    // 지정된 인덱스 배열에 따라 이메일을 순차적으로 가져옵니다.
    for (let index of indexArr) {
      // 이메일 내용을 가져옵니다.
      ({ data: rawData } = await client.retr(index));

      // 이메일 데이터를 줄 단위로 분리합니다.
      rawArr = rawData.split("\r\n");

      // 이메일의 헤더 정보를 파싱합니다.
      headers = {};
      tempStr = '';
      for (let str of rawArr) {
        if (/^[a-zA-Z][^\:]+\:/i.test(str)) {
          tempArr = str.split(":").map((s) => s.trim());
          tempStr = tempArr[0];
          if (tempArr.length > 1) {
            headers[tempStr] = tempArr.slice(1).join(':');
          } else {
            headers[tempStr] = '';
          }
        } else if (str.trim() === '') {
          break;
        } else {
          headers[tempStr] += str;
        }
      }

      // 날짜 형식을 처리하고, 표준화된 Date 객체로 변환합니다.
      headers["Date"] = headers["Date"].replace(/  /gi, ' ').replace(/\([^\)]+\)/gi, '').trim();
      if (/^[A-Z][a-z][a-z], [0-9] /.test(headers["Date"])) {
        headers["Date"] = headers["Date"].split(", ")[0] + ', 0' + headers["Date"].split(", ")[1];
      }
      headers["Date"] = new Date(headers["Date"].trim());

      // 발신자 정보를 파싱합니다.
      fromString = headers["From"].trim();
      if (/\<[^\>]+\>/gi.test(fromString)) {
        fromString = [ ...fromString.matchAll(/\<[^\>]+\>/gi) ][0][0].slice(1, -1);
      } else {
        matchArr = [ ...fromString.matchAll(/[^@]+@[^\.]+\.[a-zA-Z0-9]+/gi) ];
        if (matchArr.length > 0) {
          fromString = matchArr[0][0].trim();
        } else {
          fromString = "unknown@unknown.unknown";
        }
      }
      headers["From"] = fromString.trim();

      // 제목 정보를 파싱하고, 필요 시 Base64 또는 Quoted-Printable 인코딩을 디코딩합니다.
      headers["Subject"] = headers["Subject"].split(/[ \n\t]/).map((str) => str.trim()).map((str) => {
        let tempArr;
        let charset, baseBoo, data;
        if (/^\=\?/.test(str) && /\?\=$/.test(str)) {
          tempArr = str.slice(2, -2).split('?');
          charset = tempArr[0];
          baseBoo = tempArr[1];
          data = tempArr.slice(2).join('?');
          if (baseBoo === 'B' || baseBoo === 'b') {
            return base64Decode(data, charset);
          } else {
            return quotedDecode(data, charset);
          }
        } else {
          return str;
        }
      }).join('');

      // 제목을 Base64로 인코딩하여 저장합니다.
      headers["Subject"] = stringToBase64(headers["Subject"]);

      // 이메일 정보를 객체로 생성하여 배열에 추가합니다.
      tempObj = {
        date: headers["Date"],
        from: headers["From"],
        subject: headers["Subject"],
        data: {
          headers: headers,
          raw: rawArr,
        }
      };

      tong.push(tempObj);
    }

    // 모든 이메일을 가져온 후, 클라이언트 연결을 종료합니다.
    await client.quit();

    // 결과로 이메일 정보를 담은 배열을 반환합니다.
    return tong;
  } catch (e) {
    // 오류 발생 시 로그를 출력합니다.
    console.log(e);
  }
};

/**
 * mailFilter 메서드는 주어진 이메일 계정에서 특정 발신자와 날짜 이후의 이메일을 필터링하여 가져옵니다.
 * 필터링된 이메일은 getMails 메서드를 사용하여 상세 정보를 가져온 후 반환합니다.
 *
 * @param {string} id - 이메일 계정 ID.
 * @param {string} pwd - 이메일 계정 비밀번호.
 * @param {string} from - 필터링할 발신자 이메일 주소.
 * @param {Date} date - 필터링 기준이 되는 날짜. 이 날짜 이후의 이메일만 반환합니다.
 * @returns {Promise<Array>} 필터링된 이메일 정보를 포함한 객체 배열을 반환합니다.
 */
HumanPacket.prototype.mailFilter = async function (id, pwd, from, date) {
  // 현재 HumanPacket 인스턴스를 참조합니다.
  const instance = this;

  try {
    // listMails 메서드를 사용하여 주어진 계정의 모든 이메일 리스트를 가져옵니다.
    const list = await this.listMails(id, pwd);

    // 리스트에서 특정 발신자와 지정된 날짜 이후의 이메일을 필터링합니다.
    const indexArr = (list.filter((obj) => {
      // 이메일의 발신자 주소가 주어진 발신자 주소와 일치하는지 확인합니다.
      return obj.headers.from === from;
    }).filter((obj) => {
      // 이메일의 날짜가 주어진 날짜 이후인지 확인합니다.
      return obj.headers.date.valueOf() >= date.valueOf();
    }).map((obj) => {
      // 필터링된 이메일의 인덱스를 배열로 반환합니다.
      return obj.index;
    }));

    // 필터링된 인덱스 배열에 해당하는 이메일의 상세 정보를 가져옵니다.
    return await this.getMails(id, pwd, indexArr);
  } catch (e) {
    // 오류 발생 시 콘솔에 로그를 출력합니다.
    console.log(e);
  }
}

module.exports = HumanPacket;
