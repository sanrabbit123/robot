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
          text: ("`한글`\n" + result.korean + "\n\n`영어`\n" + "```" + result.english + "```"),
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

OpenAiAPIs.prototype.slackGPT = async function (channel, input, user = null, selfMongo = null) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { requestSystem, dateToString } = this.mother;
  const port = 3000;
  const path = "/fairySlack";
  try {
    let thisText;
    let thisClientName, thisDesignerName;
    let thisClients, thisDesigners;
    let thisClient;
    let thisProjects;
    let tempArr;
    let index;
    let result;
    let res;
    if (typeof user === "object" && user !== null) {
      if (user.level > 2) {
        thisText = input.trim();
        try {
          if (/고객/gi.test(thisText) && (/sa/gi.test(thisText) || /ca/gi.test(thisText) || /mr/gi.test(thisText))) {
            tempArr = thisText.split(" ");
            if (/ 고객/gi.test(thisText)) {
              index = tempArr.findIndex((str) => { return /고객/gi.test(str) });
              if (tempArr[index - 1] === undefined) {
                throw new Error("index error");
              }
              thisClientName = tempArr[index - 1].trim();
            } else {
              index = tempArr.findIndex((str) => { return /고객/gi.test(str) });
              if (index === -1) {
                throw new Error("index error");
              }
              thisClientName = tempArr[index].trim().replace(/고객/gi, "").replace(/님$/gi, "");
            }

            thisClients = await back.getClientsByQuery({ name: { $regex: thisClientName } }, { selfMongo })
            if (thisClients.length === 0) {
              throw new Error("general case");
            }
              
            if (/sa/gi.test(thisText)) {
              result = thisClients.toNormal().map((client) => {
                return `${client.name} 고객님 (${client.cliid} / ${dateToString(client.requests[0].request.timeline, true)} / ${client.requests[0].analytics.response.status}) => https://${address.backinfo.host}/client?cliid=${client.cliid}`;
              }).join("\n");
            } else if (/ca/gi.test(thisText)) {
              thisProjects = await back.getProjectsByQuery({ $or: thisClients.toNormal().map((client) => { return { cliid: client.cliid } }) }, { selfMongo });
              result = "";
              for (let project of thisProjects) {
                thisClient = thisClients.toNormal().find((c) => { return c.cliid === project.cliid });
                if (project.desid === "") {
                  result += `${thisClient.name} 고객님 (${thisClient.cliid} / 제안서) => https://${address.backinfo.host}/proposal?proid=${project.proid}`;
                } else {
                  result += `${thisClient.name} 고객님 (${thisClient.cliid} / 프로젝트 / ${project.process.status}) => https://${address.backinfo.host}/project?proid=${project.proid}`;
                }
                result += "\n";
              }
              result = result.slice(0, -1).trim();
              if (result === '') {
                result = "해당 고객님에 대한 project 결과가 없습니다.";
              }
            } else {
              result = thisClients.toNormal().map((client) => {
                return `${client.name} 고객님 (${client.cliid}) => https://${address.backinfo.host}/mpr?cliid=${client.cliid}`;
              }).join("\n");
            }

            res = await requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
              channel: channel,
              text: "<@" + user.slack + ">\n" + result,
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            });

          } else if (/디자이너/gi.test(thisText) && /de/gi.test(thisText)) {
            tempArr = thisText.split(" ");
            if (/ 디자이너/gi.test(thisText)) {
              index = tempArr.findIndex((str) => { return /디자이너/gi.test(str) });
              if (tempArr[index - 1] === undefined) {
                throw new Error("index error");
              }
              thisDesignerName = tempArr[index - 1].trim();
            } else {
              index = tempArr.findIndex((str) => { return /디자이너/gi.test(str) });
              if (index === -1) {
                throw new Error("index error");
              }
              thisDesignerName = tempArr[index].trim().replace(/디자이너/gi, "").replace(/님$/gi, "");
            }

            thisDesigners = await back.getDesignersByQuery({ designer: { $regex: thisDesignerName } }, { selfMongo })
            if (thisDesigners.length === 0) {
              throw new Error("general case");
            }
            
            result = thisDesigners.toNormal().map((designer) => {
              return `${designer.designer} 실장님 (${designer.desid}) => https://${address.backinfo.host}/designer?mode=normal&desid=${designer.desid}`;
            }).join("\n");

            res = await requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
              channel: channel,
              text: "<@" + user.slack + ">\n" + result,
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            });
  
          } else {
            throw new Error("general case");
          }
        } catch {

          result = await instance.chatGPT(thisText === "" ? "안녕?" : thisText);
          res = await requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
            channel: channel,
            text: "<@" + user.slack + "> " + result,
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });

          return res.data;
        }
      } else {
        res = await requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
          channel: channel,
          text: "<@" + user.slack + "> " + "당신에게는 아무런 대답도, 도움도 주고 싶지 않습니다.",
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        return res.data;
      }
    } else {
      thisText = input.trim();
      result = await instance.chatGPT(thisText === "" ? "안녕?" : thisText);
      res = await requestSystem("https://" + address.secondinfo.host + ":" + String(port) + path, {
        channel: channel,
        text: (user !== null ? "<@" + user + "> " : "") + result,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return res.data;
    }


  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = OpenAiAPIs;
