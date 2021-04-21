const HumanPacket = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/sendMail";
  this.url = {
    email: "https://api.sendgrid.com/v3/mail/send",
    sms: "https://apis.aligo.in/send/",
  };
  this.user = {
    email: "uragenbooks@gmail.com",
    sms: "hliaison",
  };
  this.apiKey = {
    email: "Bearer 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",
    sms: "mnpm8c1h078n2gtpoqgzck6gpfvg0dq2",
  };
  this.sender = {
    email: "ergvaegwaeg@home-liaison.xyz",
    sms: "0220392252",
  };
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

    let mode;

    mode = null;
    if (Array.isArray(toObj)) {
      for (let i of toObj) {
        if (typeof i !== "string") {
          throw new Error("invaild to argument");
        }
        if (/\@/gi.test(toObj)) {
          mode = "email";
          break;
        } else {
          mode = "sms";
          break;
        }
      }
    } else if (typeof toObj === "string") {
      if (/\@/gi.test(toObj)) {
        mode = "email";
      } else if (/\_/gi.test(toObj)) {
        mode = "sms";
      }
    } else {
      throw new Error("invaild to argument");
    }

    if (mode === null) {
      throw new Error("invaild to argument");
    }

    const user = this.user[mode];
    const apiKey = this.apiKey[mode];
    const sender = this.sender[mode];

    let to = [];
    let postData, headers;
    let responseRaw, response;

    if (mode === "email") {

      if (Array.isArray(toObj)) {
        for (let i of toObj) {
          if (typeof i !== "string") {
            throw new Error("invaild to argument");
          }
          to.push({ email: i });
        }
      } else if (typeof toObj === "string") {
        to.push({ email: toObj });
      }

      postData = { personalizations: [ { to } ], from: { email: sender }, subject, content: [ { "type": "text/plain", "value": contents } ] };
      headers = { headers: { "Content-Type": "application/json", "Authorization": apiKey } };

      responseRaw = await requestSystem(this.url[mode], postData, headers);
      if (responseRaw.status >= 200 && responseRaw.status < 300) {
        console.log("send email success : " + toObj);
      } else {
        throw new Error("fail email : " + toObj);
      }

    } else if (mode === "sms") {

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
        responseRaw = await requestSystem(this.url[mode], postData);
        response = responseRaw.data;
        if (response.result_code !== '1') {
          throw new Error("fail sms : " + to[i]);
        } else {
          console.log("send sms success : " + to[i]);
        }
      }

    }

    return true;

  } catch (e) {
    console.log(e);
  }
}

HumanPacket.prototype.sendEmail = async function (toObj, subject, contents) {
  const instance = this;
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
    return await this.sendPacket(toObj, subject, contents);
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

module.exports = HumanPacket;
