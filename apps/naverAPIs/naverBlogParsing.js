const NaverBlogParsing = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/naverAPIs";
  this.settingDir = this.dir + "/blog";
  this.resultDir = this.settingDir + "/result";
  this.targets = [
    { name: "brand", href: "https://blog.naver.com/PostView.nhn?blogId=homeliaison&logNo=222070652069&categoryNo=13&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView" },
    { name: "review", href: "https://blog.naver.com/PostView.nhn?blogId=homeliaison&logNo=222080367316&categoryNo=13&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView" },
    { name: "notice", href: "https://blog.naver.com/PostView.nhn?blogId=homeliaison&logNo=221824469718&categoryNo=13&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView" },
    { name: "portfolio", href: "https://blog.naver.com/PostView.nhn?blogId=homeliaison&logNo=222212720899&categoryNo=13&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView" },
  ];
}

NaverBlogParsing.prototype.blogToJson = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, sleep } = this.mother;
  const targets = this.targets;
  try {
    let frontCode, frontCodeCompress, appleScript;
    let output;
    let downloadFolder, downloadFolderArr;
    let finalObj;
    let temp;
    let sleepConstant;

    sleepConstant = 25000;

    downloadFolder = process.env.HOME + "/Downloads";
    downloadFolderArr = await fileSystem(`readDir`, [ downloadFolder ]);
    for (let { name } of targets) {
      if (downloadFolderArr.includes(name + "_extract.json")) {
        shell.exec(`rm -rf ${downloadFolder}/${name}_extract.json`);
      }
    }

    for (let z = 0; z < targets.length; z++) {
      frontCode = await fileSystem(`readString`, [ `${this.settingDir}/front.js` ]);
      frontCode = frontCode.replace(/\/\<\%name\%\>\//, targets[z].name + "_extract");
      frontCodeCompress = frontCode.replace(/"/g, "'").replace(/\n/g, '');

      appleScript = ``;
      appleScript += `tell application "Google Chrome"\n`;
      appleScript += `\tactivate\n`;
      appleScript += `\topen location "${targets[z].href}"\n`;
      appleScript += `\tdelay 1\n`;
      appleScript += `\texecute front window's active tab javascript "${frontCodeCompress}"\n`;
      appleScript += `end tell`;

      await fileSystem(`write`, [ `${process.cwd()}/temp/${targets[z].name}.applescript`, appleScript ]);
      output = shell.exec(`osascript ${shellLink(process.cwd() + "/temp/" + targets[z].name + ".applescript")}`, { silent: true });
    }

    await sleep(sleepConstant);

    finalObj = {};
    for (let { name } of targets) {
      temp = JSON.parse(await fileSystem(`readString`, [ `${downloadFolder}/${name}_extract.json` ]));
      finalObj[name] = {};
      finalObj[name].data = temp;
      finalObj[name].totalLength = temp.length;
      tempCopied = JSON.parse(JSON.stringify(temp));
      tempCopied.sort((a, b) => {
        return b.click - a.click;
      });
      finalObj[name].maxinum = tempCopied[0].click;
      finalObj[name].mininum = tempCopied[tempCopied.length - 1].click;
      shell.exec(`rm -rf ${downloadFolder}/${name}_extract.json`);
    }

    await fileSystem(`write`, [ `${this.resultDir}/finalParsing.json`, JSON.stringify(finalObj, null, 2) ]);

    return finalObj;

  } catch (e) {
    console.log(e);
  }
}

NaverBlogParsing.prototype.parsingConid = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const back = this.back;
  try {
    const finalJson = JSON.parse(await fileSystem(`readString`, [ `${this.resultDir}/finalParsing.json` ]));
    const { portfolio, review } = finalJson;
    let temp, tempArr, tempStr;
    let constentsArr;
    let title;

    const filtering = async function (target) {
      try {
        for (let obj of target) {
          title = obj.title;
          tempArr = title.split(" ");

          tempStr = '';
          if (/홈스타일링/gi.test(tempArr[0])) {
            tempStr = tempArr[1].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[2].replace(/[0-9,\.]/gi, '');
          } else {
            tempStr = tempArr[0].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[1].replace(/[0-9,\.]/gi, '');
          }

          constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });

          if (constentsArr.length !== 1) {
            if (/홈스타일링/gi.test(tempArr[0])) {
              tempStr = tempArr[2].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[3].replace(/[0-9,\.]/gi, '');
            } else {
              tempStr = tempArr[1].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[2].replace(/[0-9,\.]/gi, '');
            }
            if (constentsArr.length !== 1) {
              if (/홈스타일링/gi.test(tempArr[0])) {
                tempStr = tempArr[3].replace(/[0-9,\.]/gi, '');
              } else {
                tempStr = tempArr[2].replace(/[0-9,\.]/gi, '');
              }
              constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });
              if (constentsArr.length !== 1) {
                if (/홈스타일링/gi.test(tempArr[0])) {
                  tempStr = tempArr[4].replace(/[0-9,\.]/gi, '');
                } else {
                  tempStr = tempArr[3].replace(/[0-9,\.]/gi, '');
                }
                constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });
                if (constentsArr.length !== 1 && tempArr[5] !== undefined) {
                  if (/홈스타일링/gi.test(tempArr[0])) {
                    tempStr = tempArr[5].replace(/[0-9,\.]/gi, '');
                  } else {
                    tempStr = tempArr[4].replace(/[0-9,\.]/gi, '');
                  }
                  constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });
                  if (constentsArr.length !== 1 && tempArr[6] !== undefined) {
                    if (/홈스타일링/gi.test(tempArr[0])) {
                      tempStr = tempArr[6].replace(/[0-9,\.]/gi, '');
                    } else {
                      tempStr = tempArr[5].replace(/[0-9,\.]/gi, '');
                    }
                    constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });

                    if (constentsArr.length !== 1) {
                      tempStr = tempArr[0].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[1].replace(/[0-9,\.]/gi, '') + ' ' + tempArr[2].replace(/[0-9,\.]/gi, '');
                      constentsArr = await back.getContentsArrByQuery({ "contents.portfolio.title.main": { "$regex": tempStr } });
                    }
                  }
                }
              }
            }
          }

          if (constentsArr.length !== 1) {
            console.log(tempArr)
            console.log(tempStr);
            console.log(constentsArr.length);
            obj.conid = null;
          } else {
            obj.conid = constentsArr[0].conid;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    await filtering(portfolio.data);
    await filtering(review.data);

    await fileSystem(`write`, [ `${this.resultDir}/finalParsing.json`, JSON.stringify(finalJson, null, 2) ]);

  } catch (e) {
    console.log(e);
  }
}

module.exports = NaverBlogParsing;
