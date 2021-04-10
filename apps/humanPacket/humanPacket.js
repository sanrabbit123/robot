const HumanPacket = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/sendMail";
}

HumanPacket.sendMail = function (toObj, subject, contents) {
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
  const axios = require(`axios`);
  const apiKey = "Bearer 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";
  const email = "admin@home-liaison.xyz";
  let to = [];
  let postData, headers;
  if (Array.isArray(toObj)) {
    for (let i of toObj) {
      if (typeof i !== "string") {
        throw new Error("invaild to argument");
      }
      to.push({ email: i });
    }
  } else if (typeof toObj === "string") {
    to.push({ email: toObj });
  } else {
    throw new Error("invaild to argument");
  }
  postData = { personalizations: [ { to } ], from: { email }, subject, content: [ { "type": "text/plain", "value": contents } ] };
  headers = { headers: { "Content-Type": "application/json", "Authorization": apiKey } };
  return new Promise(function (resolve, reject) {
    axios.post(`https://api.sendgrid.com/v3/mail/send`, postData, headers).then(function (response) {
      resolve(200 <= response.status && response.status < 300);
    }).catch(function (error) {
      reject(error);
    });
  });
}

HumanPacket.send = HumanPacket.sendMail;

module.exports = HumanPacket;
