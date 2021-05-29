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

GoogleMail.prototype.getMails = async function () {
  let instance = this;
  try {
    this.gmail = await this.general.get_app("gmail");
    console.log(await instance.gmail.users.messages.list({
      userId: 'me',
      includeSpamTrash: true,
      maxResults: 20
    }));
    return 0;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = GoogleMail;
