const GoogleMail = function (credentials = "default") {
  const GoogleAPIs = require("./googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.gmail = {};
}


GoogleMail.prototype.make_body = function (from, to, subject, message) {
  let str = [
    "Content-Type: text/plain; charset=\"UTF-8\"\n",
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ];
  let encodedMail = Buffer.from(str.join('')).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
  return encodedMail;
}

GoogleMail.prototype.send_promise = function (msg) {
  let instance = this;
  return new Promise(function (resolve, reject) {
    instance.gmail.users.messages.send({
        userId: 'me',
        resource: { raw: msg, }
    }, function (err, response) {
      if (err === null) {
        resolve(response);
      } else {
        reject(err);
      }
    });
  });
}


GoogleMail.prototype.send_mail = async function (to, subject, message) {
  let instance = this;
  try {
    this.gmail = await this.general.get_app("gmail");
    let result = await this.send_promise(this.make_body("uragenbooks@gmail.com", to, subject, message));
    return result.status;
  } catch (e) {
    console.log(e.message);
  }
}


GoogleMail.prototype.total_make = async function () {
  let instance = this;
  try {
    let to = "uragen@naver.com";
    let subject = "proposalMaker4";
    let message = "Make proposal";
    this.gmail = await this.general.get_app("gmail");
    let result = await this.send_promise(this.make_body("uragenbooks@gmail.com", to, subject, message));
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
}

GoogleMail.prototype.getLatestMail = async function (from) {
  if (from === undefined || typeof from !== "string") {
    throw new Error("must be from email");
  }
  const instance = this;
  try {
    this.gmail = await this.general.get_app("gmail");
    const userId = "me";
    const res = await this.gmail.users.messages.list({ userId, q: "from:" + from });
    const { messages } = res.data;
    let detailRes;
    let attachments;

    if (messages.length === 0) {
      return null;
    } else {
      for (let { id } of messages) {
        detailRes = await instance.gmail.users.messages.get({ userId, id });
        break;
      }
      return detailRes.data;
    }

    // detailRes = await instance.gmail.users.messages.get({ userId, id: "179b6d0d5b3b0f4e" });
    //
    // attachments = await instance.gmail.users.messages.attachments.get({ userId, messageId: "179b6d0d5b3b0f4e", id: detailRes.data.payload.parts[1].body.attachmentId })
    //
    // console.log(attachments);

  } catch (e) {
    console.log(e.message);
  }
}

GoogleMail.prototype.parsingAttachments = function (messageObj) {
  if (typeof messageObj !== "object") {
    throw new Error("must be message object");
  }
  if (messageObj.payload === undefined) {
    throw new Error("must be message object");
  }
  const instance = this;
  let tong;

  tong = [];
  for (let { mimeType, filename, body } of messageObj.payload.parts) {
    if (body.attachmentId !== undefined) {
      tong.push({ mimeType, filename, attachmentId: body.attachmentId });
    }
  }

  return tong;
}

GoogleMail.prototype.getLatestMailAttachments = async function (from) {
  if (from === undefined || typeof from !== "string") {
    throw new Error("must be from email");
  }
  const instance = this;
  try {
    const userId = "me";
    const messageObj = await this.getLatestMail(from);
    const targets = this.parsingAttachments(messageObj);
    let attachments, buff;
    let tong;
    tong = [];
    for (let { mimeType, filename, attachmentId } of targets) {
      attachments = await instance.gmail.users.messages.attachments.get({ userId, messageId: messageObj.id, id: attachmentId });
      buff = Buffer.from(attachments.data.data, 'base64');
      if (/text/gi.test(mimeType)) {
        tong.push({ mimeType, fileName: filename, data: buff.toString("utf-8") });
      } else {
        tong.push({ mimeType, fileName: filename, data: buff });
      }
    }
    return tong;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleMail;
