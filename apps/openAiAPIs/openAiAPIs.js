const OpenAiAPIs = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/openAiAPIs";
  this.token = "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";
  this.host = "api.openai.com";
}

OpenAiAPIs.prototype.chatGPT = function (input) {
  const instance = this;
  const { requestSystem } = this.mother;
  const { token, host } = this;
  const path = "/v1/chat/completions";
  const model = "gpt-3.5-turbo";
  return new Promise((resolve, reject) => {
    requestSystem("https://" + host + path, {
      model,
      messages: [
        {
          role: "user",
          content: input
        }
      ],
      stream: false,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    }).then((res) => {
      resolve(res.data.choices.filter((obj) => { return typeof obj.message.content === "string" }).map((obj) => { return obj.message.content }).join(""));
    }).catch((err) => {
      reject(err.response.data);
    });
  });
}

OpenAiAPIs.prototype.fairyGPT = function (fromId, input) {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  const port = 3000;
  const path = "/fairyMessage";
  return new Promise((resolve, reject) => {
    instance.chatGPT(input).then((result) => {
      return requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
        toId: fromId,
        text: result,
        noIdMode: true,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = OpenAiAPIs;
