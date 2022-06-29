const dayId = [
  "d091",
  "d171",
  "d190",
];

const hourId = [];

const worker = async function (package) {
  const {
    mother, address,
    back, work, report,
    kakao, human,
    bill,
    analytics, sheets, drive, calendar, docs,
    mongo, mongoconsole, mongolocal,
    rethink,
  } = package;
  const { messageLog, errorLog, hexaJson, requestSystem, equalJson } = mother;
  try {
    const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
    const chrome = new GoogleChrome();
    const map = [
      {
        link: "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
        func: async function () {
          const idLoginButtonId = "anchor15";
          const returnButtonId = "anchor25";
          const inputs = {
            id: "iptUserId",
            pwd: "iptUserPw"
          };
          document.getElementById(idLoginButtonId).click();
          document.getElementById(inputs.id).value = "homeliaison20";
          document.getElementById(inputs.pwd).value = "hlofwis83!";
          document.getElementById(returnButtonId).click();
          return "success";
        }
      },
      {
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml",
        func: async function () {
          const { sleep, stringToDate } = GeneralJs;
          let buttons;
          let pageNumber, pageButtons;
          let domTargets, textArr;
          let total, middle;
          let timeIndex;
          let tempObj;

          document.getElementById('tabControl1_UTECRCB057_tab_tabs3').click();
          await sleep(500);
          document.getElementById("trigger1").click();

          await sleep(2000);

          pageButtons = document.querySelectorAll('.w2pageList_control_label');
          pageNumber = pageButtons.length;

          total = [];
          for (let i = 0; i < pageNumber; i++) {
            pageButtons = document.querySelectorAll('.w2pageList_control_label');
            pageButtons[i].click();
            await sleep(2000);

            domTargets = document.getElementById("grdCshpt").querySelectorAll("td");
            textArr = [];
            for (let dom of domTargets) {
              textArr.push(dom.textContent);
            }
            textArr = textArr.filter((i) => { return !(/[0-9]/g.test(i) && /\:/g.test(i) && /[A-Z]/gi.test(i) && / /gi.test(i) && /,/gi.test(i)); });
            textArr = textArr.map((i) => { return i.trim(); });
            textArr = textArr.filter((i) => { return i !== '' });

            timeIndex = [];
            for (let j = 0; j < textArr.length; j++) {
              if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(textArr[j].trim())) {
                timeIndex.push(j);
              }
            }

            middle = [];
            for (let index of timeIndex) {
              middle.push({
                method: textArr[index - 1],
                time: JSON.stringify(stringToDate(textArr[index].trim())).slice(1, -1),
                supply: Number(textArr[index + 1].replace(/[^0-9\-]/g, '')),
                vat: Number(textArr[index + 2].replace(/[^0-9\-]/g, '')),
                service: Number(textArr[index + 3].replace(/[^0-9\-]/g, '')),
                total: Number(textArr[index + 4].replace(/[^0-9\-]/g, '')),
                id: textArr[index + 5],
                issuance: textArr[index + 6],
                deal: /승인/gi.test(textArr[index + 7]),
                etc: textArr[index + 8],
              });
            }

            total.push(middle);
            await sleep(500);
          }

          return { json: { cashOut: total } };
        }
      },
      {
        link: "https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml",
        func: async function () {
          const { sleep, stringToDate } = GeneralJs;
          let buttons;
          let pageNumber, pageButtons;
          let domTargets, textArr;
          let total, middle;
          let timeIndex;
          let tempObj;

          document.getElementById("tabControl1_UTECRCB005_tab_tabs3").click();
          await sleep(500);
          document.getElementById("trigger1").click();

          await sleep(2000);

          pageButtons = document.querySelectorAll('.w2pageList_control_label');
          pageNumber = pageButtons.length;

          total = [];
          for (let i = 0; i < pageNumber; i++) {
            pageButtons = document.querySelectorAll('.w2pageList_control_label');
            pageButtons[i].click();
            await sleep(2000);

            domTargets = document.getElementById("grdCshpt").querySelectorAll("td");
            textArr = [];
            for (let dom of domTargets) {
              textArr.push(dom.textContent);
            }
            textArr = textArr.filter((i) => { return !(/[0-9]/g.test(i) && /\:/g.test(i) && /[A-Z]/gi.test(i) && / /gi.test(i) && /,/gi.test(i)); });
            textArr = textArr.map((i) => { return i.trim(); });
            textArr = textArr.filter((i) => { return i !== '' });

            timeIndex = [];
            for (let j = 0; j < textArr.length; j++) {
              if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(textArr[j].trim())) {
                timeIndex.push(j);
              }
            }

            middle = [];
            for (let index of timeIndex) {
              middle.push({
                time: JSON.stringify(stringToDate(textArr[index].trim())).slice(1, -1),
                business: textArr[index + 2],
                from: textArr[index + 3],
                item: textArr[index + 5],
                supply: Number(textArr[index + 7].replace(/[^0-9\-]/g, '')),
                vat: Number(textArr[index + 8].replace(/[^0-9\-]/g, '')),
                service: Number(textArr[index + 9].replace(/[^0-9\-]/g, '')),
                total: Number(textArr[index + 10].replace(/[^0-9\-]/g, '')),
                id: textArr[index + 11],
                issuance: textArr[index + 12],
                deal: /승인/gi.test(textArr[index + 13]),
                etc: textArr[index + 16],
              });
            }

            total.push(middle);
            await sleep(500);
          }

          return { json: { cashIn: total } };
        }
      }
    ];
    const results = equalJson(JSON.stringify(await chrome.scriptChain(map)));
    console.log(results);
    const logView = JSON.stringify(results, null, 2);
    console.log(logView)
    let res;
    res = await requestSystem("https://" + address.pythoninfo.host + ":3000/cashReceipt", results[1], { headers: { "Content-Type": "application/json" } });
    console.log(res.data);
    res = await requestSystem("https://" + address.pythoninfo.host + ":3000/cashReceipt", results[2], { headers: { "Content-Type": "application/json" } });
    console.log(res.data);

    await messageLog("cash receipt sync done");
    return true;
  } catch (e) {
    await errorLog("cash receipt sync error : " + e.message);
    return false;
  }
}

module.exports = { dayId, hourId, worker };
