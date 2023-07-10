module.exports = function (arg, info) {
  return [
    "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/comm/a/b/UTXPPABA01.xml&w2xHome=/ui/pp/&w2xDocumentRoot=",
    async function () {
      const idLoginButtonId = "anchor15";
      const returnButtonId = "anchor25";
      const inputs = {
        id: "iptUserId",
        pwd: "iptUserPw"
      };

      while (document.getElementById(idLoginButtonId) === null) {
        await sleep(500);
      }

      document.getElementById(idLoginButtonId).click();
      document.getElementById(inputs.id).value = INFO.find((obj) => { return obj.name === "hometax"; }).user;
      document.getElementById(inputs.pwd).value = INFO.find((obj) => { return obj.name === "hometax"; }).password;
      document.getElementById(returnButtonId).click();
    },
    "toss: https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml",
    async function () {
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
            time: stringToDate(textArr[index].trim()),
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

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashOut: total } }, RECEIVECONST);

    },
    "toss: https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB013.xml",
    async function () {
      let buttons;
      let pageNumber, pageButtons;
      let domTargets, textArr;
      let total, middle;
      let timeIndex;
      let tempObj;

      document.getElementById('tabControl1_UTECRCB057_tab_tabs3').click();
      const { x, y } = await clickElement(document.getElementById("selectbox5"));
      await sleep(300);
      await ajaxPromise({ x, y: y + 40, alert: 0, double: 0 }, HOSTCONST + "/clickElement");
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
            time: stringToDate(textArr[index].trim()),
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

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashOut: total } }, RECEIVECONST);

    },
    "toss: https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml",
    async function () {
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
            time: stringToDate(textArr[index].trim()),
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

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashIn: total } }, RECEIVECONST);

    },
    "toss: https://tecr.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/cr/c/b/UTECRCB005.xml",
    async function () {
      let buttons;
      let pageNumber, pageButtons;
      let domTargets, textArr;
      let total, middle;
      let timeIndex;
      let tempObj;

      document.getElementById("tabControl1_UTECRCB005_tab_tabs3").click();
      await sleep(500);
      const { x, y } = await clickElement(document.getElementById("selectbox5"));
      await sleep(300);
      await ajaxPromise({ x, y: y + 40, alert: 0, double: 0 }, HOSTCONST + "/clickElement");
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
            time: stringToDate(textArr[index].trim()),
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

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashIn: total } }, RECEIVECONST);

    },
  ];
};
