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
  const GoogleCloud = require(`${process.cwd()}/apps/googleAPIs/googleCloud.js`);
  this.cloud = new GoogleCloud();
  this.dir = process.cwd() + "/apps/openAiAPIs";
  this.token = "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";
  this.host = "api.openai.com";
  this.textFixToken = {
    word0: [ "다음" ],
    word1: [ "고쳐", "수정", "개선" ],
    word2: [ "\n\n" ],
  }
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

OpenAiAPIs.prototype.shellGPT = async function (input, multipleMode = false) {
  const instance = this;
  const cloud = this.cloud;
  const { textFixToken } = this;
  const order = (text) => { return `${textFixToken.word0[0]} 글을 자연스럽게 ${textFixToken.word1[0]}봐${textFixToken.word2[0]}${text}`; }
  try {
    let english;
    let englishResponse;
    let korean;
    let koreanResponse;
    if (await cloud.isKorean(input)) {
      english = await cloud.textTranslation(input);
      englishResponse = await this.chatGPT(english);
      korean = await cloud.textTranslation(englishResponse);
      if (multipleMode) {
        koreanResponse = await this.chatGPT(order(korean));
        return { koreanRaw: korean, korean: koreanResponse, english: englishResponse };
      } else {
        koreanResponse = korean;
        return { korean: koreanResponse, english: englishResponse };
      }
    } else {
      throw new Error("invalid input");
    }
  } catch (e) {
    console.log(e);
  }
}

OpenAiAPIs.prototype.multipleGPT = async function (input) {
  const instance = this;
  const cloud = this.cloud;
  try {
    let result;
    let shellResult;
    if (await cloud.isKorean(input)) {
      shellResult = await this.shellGPT(input, true);
      result = {
        pure: await this.chatGPT(input),
        english: shellResult.english,
        raw: shellResult.koreanRaw,
        shell: shellResult.korean
      };
      return result;
    } else {
      throw new Error("invalid input");
    }
  } catch (e) {
    console.log(e);
  }
}

OpenAiAPIs.prototype.isFixRequest = function (text) {
  const instance = this;
  const { textFixToken } = this;
  let reg0, reg1, reg2;
  
  text = text.trim();

  reg0 = textFixToken.word0.map((str) => { return new RegExp("^" + str, "g") })
  reg1 = textFixToken.word1.map((str) => { return new RegExp(str, "g") })
  reg2 = textFixToken.word2.map((str) => { return new RegExp(str, "g") })

  if (reg0.some((r) => { return r.test(text) })) {
    if (reg1.some((r) => { return r.test(text) })) {
      if (reg2.some((r) => { return r.test(text) })) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }

}

OpenAiAPIs.prototype.fairyGPT = function (fromId, input) {
  const instance = this;
  const address = this.address;
  const { requestSystem } = this.mother;
  const port = 3000;
  const path = "/fairyMessage";
  return new Promise((resolve, reject) => {
    if (instance.isFixRequest(input)) {
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
    } else {
      instance.shellGPT(input, false).then((result) => {
        return requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
          toId: fromId,
          text: ("`한글`\n" + result.korean + "\n\n-\n\n`영어`\n" + "```" + result.english + "```"),
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
    }
  });
}

module.exports = OpenAiAPIs;
