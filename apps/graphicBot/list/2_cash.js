module.exports = function (arg, info) {
  return [
    "https://www.hometax.go.kr/",
    async function () {
      const loginButtonId = "group88615548";
      await ajaxPromise({ to: 0, data: 0 }, ENDCONST);
      document.getElementById(loginButtonId).click();
    },
    async function () {
      const iframeId = "txppIframe";
      const idLoginButtonId = "anchor15";
      const returnButtonId = "anchor25";
      const firstTargetButtonId = "myMenuQuickLi2";
      const inputs = {
        id: "iptUserPw",
        pwd: "iptUserId"
      };

      await sleep(2000);

      document.getElementById(iframeId).contentWindow.document.getElementById(idLoginButtonId).click();
      await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.id), "info.hometax.id");
      await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.pwd), "info.hometax.pwd");
      document.getElementById(iframeId).contentWindow.document.getElementById(returnButtonId).click();
    },
    async function () {
      const firstTargetButtonId = "myMenuQuickLi2";
      document.getElementById(firstTargetButtonId).click();
    },
    // [ 910, 112, 3000 ],
    // [ 892, 367, 500 ],
    // [ 836, 554, 500, true ],
    // "key_delete",
    // "clipBoard_" + String(info.hometax.id),
    // "paste",
    // "key_tab",
    // "key_delete",
    // "clipBoard_" + String(info.hometax.pwd),
    // "paste",
    // [ 1145, 575, 1000 ],
    // async function () {
    //   await sleep(500);
    //   document.getElementById("myMenuQuickLi2").click();
    // },
    // async function () {
    //
    //   const iframeId = "txppIframe";
    //   let buttons;
    //   let pageNumber, pageButtons;
    //   let domTargets, textArr;
    //   let total, middle;
    //   let timeIndex;
    //   let tempObj;
    //
    //   buttons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2radio_label');
    //   buttons[1].click();
    //
    //   await sleep(1000);
    //
    //   document.getElementById(iframeId).contentWindow.document.getElementById("trigger1").click();
    //
    //   await sleep(2000);
    //
    //   pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
    //   pageNumber = pageButtons.length;
    //
    //   total = [];
    //   for (let i = 0; i < pageNumber; i++) {
    //     pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
    //     pageButtons[i].click();
    //     await sleep(2000);
    //
    //     domTargets = document.getElementById(iframeId).contentWindow.document.getElementById("grdCshpt").querySelectorAll("td");
    //     textArr = [];
    //     for (let dom of domTargets) {
    //       textArr.push(dom.textContent);
    //     }
    //
    //     timeIndex = [];
    //     for (let j = 0; j < textArr.length; j++) {
    //       if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g.test(textArr[j].trim())) {
    //         timeIndex.push(j);
    //       }
    //     }
    //
    //     middle = [];
    //     for (let index of timeIndex) {
    //       middle.push({
    //         method: textArr[index - 1],
    //         time: stringToDate(textArr[index].trim()),
    //         supply: Number(textArr[index + 1].replace(/[^0-9\-]/g, '')),
    //         vat: Number(textArr[index + 2].replace(/[^0-9\-]/g, '')),
    //         service: Number(textArr[index + 3].replace(/[^0-9\-]/g, '')),
    //         total: Number(textArr[index + 4].replace(/[^0-9\-]/g, '')),
    //         id: textArr[index + 5],
    //         issuance: textArr[index + 6],
    //         deal: /승인/gi.test(textArr[index + 7]),
    //         etc: textArr[index + 8],
    //       });
    //     }
    //
    //     total.push(middle);
    //     await sleep(500);
    //   }
    //
    //   await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashOut: total } }, RECEIVECONST);
    //
    // },
    // "wait_2000",
    // [ 1045, 112, 500 ],
    // "key_enter",
    // "close",
    // "wait_1000",
    // "https://www.hometax.go.kr/",
    // "wait_2000",
    // [ 910, 112, 3000 ],
    // [ 892, 367, 500 ],
    // [ 836, 554, 500, true ],
    // "key_delete",
    // "clipBoard_" + String(info.hometax.id),
    // "paste",
    // "key_tab",
    // "key_delete",
    // "clipBoard_" + String(info.hometax.pwd),
    // "paste",
    // [ 1145, 575, 1000 ],
    // async function () {
    //   await sleep(500);
    //   document.getElementById("myMenuQuickLi3").click();
    // },
    // "wait_3000",
    // async function () {
    //
    //   const iframeId = "txppIframe";
    //   let buttons;
    //   let pageNumber, pageButtons;
    //   let domTargets, textArr;
    //   let total, middle;
    //   let timeIndex;
    //   let tempObj;
    //
    //   buttons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2radio_label');
    //   buttons[2].click();
    //
    //   await sleep(1000);
    //
    //   document.getElementById(iframeId).contentWindow.document.getElementById("trigger1").click();
    //
    //   await sleep(2000);
    //
    //   pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
    //   pageNumber = pageButtons.length;
    //
    //   total = [];
    //   for (let i = 0; i < pageNumber; i++) {
    //     pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
    //     pageButtons[i].click();
    //     await sleep(2000);
    //
    //     domTargets = document.getElementById(iframeId).contentWindow.document.getElementById("grdCshpt").querySelectorAll("td");
    //     textArr = [];
    //     for (let dom of domTargets) {
    //       textArr.push(dom.textContent);
    //     }
    //
    //     timeIndex = [];
    //     for (let j = 0; j < textArr.length; j++) {
    //       if (/[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g.test(textArr[j].trim())) {
    //         timeIndex.push(j);
    //       }
    //     }
    //
    //     middle = [];
    //     for (let index of timeIndex) {
    //       middle.push({
    //         method: textArr[index - 1],
    //         time: stringToDate(textArr[index].trim()),
    //         business: textArr[index + 2],
    //         from: textArr[index + 3],
    //         item: textArr[index + 5],
    //         supply: Number(textArr[index + 6].replace(/[^0-9\-]/g, '')),
    //         vat: Number(textArr[index + 7].replace(/[^0-9\-]/g, '')),
    //         service: Number(textArr[index + 8].replace(/[^0-9\-]/g, '')),
    //         total: Number(textArr[index + 9].replace(/[^0-9\-]/g, '')),
    //         id: textArr[index + 10],
    //         issuance: textArr[index + 11],
    //         deal: /승인/gi.test(textArr[index + 12]),
    //         etc: textArr[index + 15],
    //       });
    //     }
    //
    //     total.push(middle);
    //     await sleep(500);
    //   }
    //
    //   await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashIn: total } }, RECEIVECONST);
    //
    // },
    // "wait_2000",
    // [ 1045, 112, 500 ],
    // "key_enter",
    // "close",
  ];
};
