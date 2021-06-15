module.exports = function () {
  return [
    "https://www.hometax.go.kr/",
    "wait_3000",
    [ 910, 112, 3000 ],
    [ 892, 367, 500 ],
    [ 1145, 575, 1000 ],
    [ 669, 606, { x: 669, y: 606, color: "#fff4d1" } ],
    "wait_3000",
    async function () {

      const iframeId = "txppIframe";
      let buttons;
      let pageNumber, pageButtons;
      let domTargets, textArr;
      let total, middle;
      let timeIndex;
      let tempObj;

      buttons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2radio_label');
      buttons[2].click();

      await sleep(1000);

      document.getElementById(iframeId).contentWindow.document.getElementById("trigger1").click();

      await sleep(2000);

      pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
      pageNumber = pageButtons.length;

      total = [];
      for (let i = 0; i < pageNumber; i++) {
        pageButtons[i].click();
        await sleep(2000);

        domTargets = document.getElementById(iframeId).contentWindow.document.getElementById("grdCshpt").querySelectorAll("td");
        textArr = [];
        for (let dom of domTargets) {
          textArr.push(dom.textContent);
        }

        timeIndex = [];
        for (let j = 0; j < textArr.length; j++) {
          if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g.test(textArr[j].trim())) {
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
    "wait_2000",
    "close",
    "wait_1000",
    "https://www.hometax.go.kr/",
    "wait_3000",
    [ 910, 112, 3000 ],
    [ 892, 367, 500 ],
    [ 1145, 575, 1000 ],
    [ 771, 605, { x: 771, y: 605, color: "#fff4d1" } ],
    "wait_3000",
    async function () {

      const iframeId = "txppIframe";
      let buttons;
      let pageNumber, pageButtons;
      let domTargets, textArr;
      let total, middle;
      let timeIndex;
      let tempObj;

      buttons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2radio_label');
      buttons[3].click();

      await sleep(1000);

      document.getElementById(iframeId).contentWindow.document.getElementById("trigger1").click();

      await sleep(2000);

      pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
      pageNumber = pageButtons.length;

      total = [];
      for (let i = 0; i < pageNumber; i++) {
        pageButtons[i].click();
        await sleep(2000);

        domTargets = document.getElementById(iframeId).contentWindow.document.getElementById("grdCshpt").querySelectorAll("td");
        textArr = [];
        for (let dom of domTargets) {
          textArr.push(dom.textContent);
        }

        timeIndex = [];
        for (let j = 0; j < textArr.length; j++) {
          if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g.test(textArr[j].trim())) {
            timeIndex.push(j);
          }
        }

        middle = [];
        for (let index of timeIndex) {
          middle.push({
            method: textArr[index - 1],
            time: stringToDate(textArr[index].trim()),
            // business: ,
            // from: ,
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

        total.push(textArr);
        await sleep(500);
      }

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashIn: total } }, RECEIVECONST);

    },
    "wait_2000",
    "close",
  ];
};
