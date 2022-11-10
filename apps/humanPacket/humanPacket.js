const HumanPacket = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/humanPacket";
  this.moduleDir = this.dir + "/module";
  this.url = {
    sms: "https://apis.aligo.in/send/",
  };
  this.user = {
    sms: "hliaison",
  };
  this.apiKey = {
    sms: "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2",
  };
  this.sender = {
    sms: "0220392252",
  };
  this.webmailHostConst = "webmail";
  this.webmailPort = 110;
  this.webmailSmtpHost = "smtp.cafe24.com";
  this.webmailSmtpPort = 587;
}

HumanPacket.prototype.sendPacket = async function (toObj, subject, contents) {
  const instance = this;
  const { requestSystem } = this.mother;
  try {
    if (typeof toObj === "object" && !Array.isArray(toObj) && subject === undefined && contents === undefined) {
      if (toObj.to === undefined || toObj.subject === undefined || toObj.contents === undefined) {
        throw new Error("invaild arguments : object type => { to: string or array, subject: string, contents: string }");
      } else {
        if ((typeof toObj.to === "string" || Array.isArray(toObj.to)) && typeof toObj.subject === "string" && typeof toObj.contents === "string") {
          subject = toObj.subject;
          contents = toObj.contents;
          toObj = toObj.to;
        } else {
          throw new Error("invaild arguments : object type => { to: string or array, subject: string, contents: string }");
        }
      }
    } else if (toObj === undefined || subject === undefined || contents === undefined) {
      throw new Error("invaild arguments");
    }

    const user = this.user.sms;
    const apiKey = this.apiKey.sms;
    const sender = this.sender.sms;

    let to = [];
    let postData, headers;
    let responseRaw, response;

    if (Array.isArray(toObj)) {
      for (let i of toObj) {
        if (typeof i !== "string") {
          throw new Error("invaild to argument");
        }
        to.push(i);
      }
    } else if (typeof toObj === "string") {
      to.push(toObj);
    }

    for (let i = 0; i < to.length; i++) {
      postData = {
        user_id: user,
        key: apiKey,
        msg: contents,
        receiver: to[i].split('_')[0].replace(/\-/g, ''),
        destination: to[i].split('_')[1],
        sender: sender,
        rdate: "",
        rtime: "",
        testmode_yn: "N",
        title: subject,
        msg_type: "LMS",
      };
      responseRaw = await requestSystem(this.url.sms, postData);
      response = responseRaw.data;
      if (response.result_code !== '1') {
        throw new Error("fail sms : " + to[i]);
      } else {
        console.log("send sms success : " + to[i]);
      }
    }

    return true;

  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.sendSms = async function (name, phone, subject, contents) {
  const instance = this;
  try {
    if (typeof name === "object" && !Array.isArray(name) && phone === undefined && subject === undefined && contents === undefined) {
      if (name.name === undefined || name.phone === undefined || name.subject === undefined || name.contents === undefined) {
        throw new Error("invaild arguments : object type => { name: string, phone: string, subject: string, contents: string }");
      } else {
        if (typeof name.name === "string" && typeof name.phone === "string" && typeof name.subject === "string" && typeof name.contents === "string") {
          subject = name.subject;
          contents = name.contents;
          phone = name.phone;
          name = name.name;
        } else {
          throw new Error("invaild arguments : object type => { name: string, phone: string, subject: string, contents: string }");
        }
      }
    } else if (name === undefined || phone === undefined || subject === undefined || contents === undefined) {
      throw new Error("invaild arguments");
    }

    if (typeof name !== "string") {
      throw new Error("invaild arguments in name");
    }
    if (typeof phone !== "string") {
      throw new Error("invaild arguments in phone");
    }
    if (typeof subject !== "string") {
      throw new Error("invaild arguments in subject");
    }
    if (typeof contents !== "string") {
      throw new Error("invaild arguments in contents");
    }

    const toObj = phone.replace(/\-/g, '') + "_" + name;
    return (await this.sendPacket(toObj, subject, contents));
  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.homeliaisonLogin = async function (id, pwd) {
  const instance = this;
  const address = this.address;
  const { moduleDir, webmailHostConst, webmailPort } = this;
  try {
    const host = webmailHostConst + "." + address.frontinfo.host;
    const Pop3Client = require(`${moduleDir}/pop3.js`);
    const client = new Pop3Client(webmailPort, host, {
      tlserrs: false,
      enabletls: false,
      debug: false
    });

    await client.connect();
    await client.login(id + "@" + address.frontinfo.host, pwd);
    client.id = id;

    return client;
  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.listMails = async function (id, pwd) {
  const instance = this;
  const { webmailPort: port, webmailHostConst: webmail } = this;
  const { stringToBase64, base64ToString, errorLog, sleep, equalJson } = this.mother;
  try {
    const host = this.address.frontinfo.host;
    const webmailHost = webmail + "." + host;
    const net = require("net");
    const iconv = require("iconv-lite");
    const base64Decode = (data, charset) => {
      try {
        return iconv.decode(Buffer.from(data, "base64"), charset);
      } catch (e) {
        return '';
      }
    }
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
    }

    const getList = () => {
      return new Promise((resolve, reject) => {
        const socket = net.createConnection(port, webmailHost);
        let buffer;
        buffer = '';
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
        socket.on("error", (err) => {
          reject(err);
        });
        socket.write("USER " + id + "@" + host + "\r\nPASS " + pwd + "\r\n");
      });
    }

    const getHeader = (number) => {
      return new Promise((resolve, reject) => {
        const socket = net.createConnection(port, webmailHost);
        let head, additional;
        head = '';
        additional = 0;
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
        socket.on("head", () => {
          const rawArr = head.split("\r\n").slice(1);
          let headers, tempStr, fromString;

          headers = {};
          tempStr = '';
          for (let str of rawArr) {
            if (/^[a-zA-Z][^\:]+\:/i.test(str)) {
              tempArr = str.split(":").map((s) => { return s.trim(); });
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

          headers["Date"] = headers["Date"].replace(/  /gi, ' ').replace(/\([^\)]+\)/gi, '').trim();
          if (/^[A-Z][a-z][a-z], [0-9] /.test(headers["Date"])) {
            headers["Date"] = headers["Date"].split(", ")[0] + ', 0' + headers["Date"].split(", ")[1];
          }
          headers["Date"] = new Date(headers["Date"].trim());

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

          headers["Subject"] = instance.mother.stringToBase64(headers["Subject"]);

          socket.write("QUIT \r\n");
          resolve(headers);
        });
        socket.on("error", (err) => {
          reject(err);
        });
        socket.write("USER " + id + "@" + host + "\r\nPASS " + pwd + "\r\n");
      });
    }

    const waitGetHeader = async (index) => {
      try {
        return await getHeader(index);
      } catch (e) {
        await sleep(200);
        return await waitGetHeader(index);
      }
    }

    const { count } = await getList();
    let tong;
    let tempObj;
    let errorTimeout;
    let tempHeaders;

    tong = [];
    errorTimeout = setTimeout(async () => {
      await errorLog("pop3 error");
      throw new Error("pop3 error");
    }, 60 * 1000);
    for (let i = 0; i < count; i++) {
      tempObj = {};
      tempObj.index = i + 1;
      tempHeaders = await waitGetHeader(tempObj.index);
      tempObj.headers = {
        date: tempHeaders["Date"],
        from: tempHeaders["From"],
        subject: tempHeaders["Subject"],
      };
      tong.push(tempObj);
    }
    clearTimeout(errorTimeout);

    return tong;
  } catch (e) {
    await errorLog("pop3 error");
    console.log(e);
    return null;
  }
}

HumanPacket.prototype.getMails = async function (id, pwd, indexArr = []) {
  const instance = this;
  const { stringToBase64, base64ToString } = this.mother;
  try {
    const client = await this.homeliaisonLogin(id, pwd);
    const { count } = await client.list();
    const iconv = require("iconv-lite");
    const base64Decode = (data, charset) => {
      try {
        return iconv.decode(Buffer.from(data, "base64"), charset);
      } catch (e) {
        return '';
      }
    }
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
    }
    const areaSplitToken = "____areaSplit____";
    let tong;
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

    if (indexArr.length === 0) {
      indexArr = [];
      for (let i = 0; i < count; i++) {
        indexArr.push(i + 1);
      }
    }

    tong = [];
    for (let index of indexArr) {
      ({ data: rawData } = await client.retr(index));

      rawArr = rawData.split("\r\n");

      headers = {};
      tempStr = '';
      for (let str of rawArr) {
        if (/^[a-zA-Z][^\:]+\:/i.test(str)) {
          tempArr = str.split(":").map((s) => { return s.trim(); });
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
      headers["Date"] = headers["Date"].replace(/  /gi, ' ').replace(/\([^\)]+\)/gi, '').trim();
      if (/^[A-Z][a-z][a-z], [0-9] /.test(headers["Date"])) {
        headers["Date"] = headers["Date"].split(", ")[0] + ', 0' + headers["Date"].split(", ")[1];
      }
      headers["Date"] = new Date(headers["Date"].trim());

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

      headers["Subject"] = stringToBase64(headers["Subject"]);

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

    await client.quit();

    return tong;
  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.mailFilter = async function (id, pwd, from, date) {
  const instance = this;
  try {
    const list = await this.listMails(id, pwd);
    const indexArr = (list.filter((obj) => {
      return obj.headers.from === from
    }).filter((obj) => {
      return obj.headers.date.valueOf() >= date.valueOf();
    }).map((obj) => {
      return obj.index;
    }));
    return await this.getMails(id, pwd, indexArr);
  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.sendMail = async function (obj) {
  if (typeof obj !== "obj" || obj === null) {
    throw new Error("invaild input");
  }
  if (obj.to === undefined || obj.subject === undefined || obj.body === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { fileSystem } = this.mother;
  const { dir, moduleDir } = this;
  const { to, subject, body } = obj;
  try {
    let pythonScript;



    pythonScript = await fileSystem(`readString`, [ `${moduleDir}/smtp.py` ]);








  } catch (e) {
    console.log(e);
  }
}

module.exports = HumanPacket;
