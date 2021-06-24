module.exports = function (arg, info) {
  return [
    "https://www.hometax.go.kr/",
    async function () {

      const injectionInput = async function (input, value, iframeBoo = false, iframe = null) {
        try {
          if (iframeBoo === true && (iframe === null || iframe === undefined)) {
            throw new Error("if iframe is true, must be iframe dom input");
          }
          const chromeHeight = 106;
          const inputId = input.id;
          let iframeRect, iframes, thisIframe;
          let rect;
          let x, y;

          if (iframeBoo) {
            thisIframe = iframe;
          } else {
            iframeRect = {
              top: 0,
              left: 0
            };
            if (inputId !== "") {
              if (document.getElementById(inputId) === null && document.querySelector("iframe") !== null) {
                iframes = document.querySelectorAll("iframe");
                thisIframe = null;
                for (let i of iframes) {
                  if (i.contentWindow.document.getElementById(inputId) !== null) {
                    thisIframe = i;
                    break;
                  }
                }
                if (thisIframe === null) {
                  throw new Error("cannot find input");
                } else {
                  iframeBoo = true;
                  iframeRect = thisIframe.getBoundingClientRect();
                }
              } else {
                iframeBoo = false;
              }
            }
          }
          rect = input.getBoundingClientRect();
          x = iframeRect.left + rect.left + (rect.width / 2);
          y = chromeHeight + iframeRect.top + rect.top + (rect.height / 2);
          console.log(x, y);
        } catch (e) {
          console.log(e);
        }
      }

      const iframeId = "txppIframe";
      const loginButtonId = "group88615548";
      const idLoginButtonId = "anchor15";
      const returnButtonId = "anchor25";
      const firstTargetButtonId = "myMenuQuickLi2";
      const inputs = {
        id: "iptUserPw",
        pwd: "iptUserId"
      };
      // document.getElementById(loginButtonId).click();
      // await sleep(1000);
      //
      // document.getElementById(iframeId).contentWindow.document.getElementById(idLoginButtonId).click();

      // await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.id), info.hometax.id);
      // await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.pwd), info.hometax.pwd);

      await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.id), "test");
      await injectionInput(document.getElementById(iframeId).contentWindow.document.getElementById(inputs.pwd), "test");


      document.getElementById(iframeId).contentWindow.document.getElementById(returnButtonId).click();

      await sleep(1000);
      document.getElementById(firstTargetButtonId).click();
    },
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
    //   document.getElementById("myMenuQuickLi2").click();
    // },
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
      buttons[1].click();

      await sleep(1000);

      document.getElementById(iframeId).contentWindow.document.getElementById("trigger1").click();

      await sleep(2000);

      pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
      pageNumber = pageButtons.length;

      total = [];
      for (let i = 0; i < pageNumber; i++) {
        pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
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
    [ 1045, 112, 500 ],
    "key_enter",
    "close",
    "wait_1000",
    "https://www.hometax.go.kr/",
    "wait_2000",
    [ 910, 112, 3000 ],
    [ 892, 367, 500 ],
    [ 836, 554, 500, true ],
    "key_delete",
    "clipBoard_" + String(info.hometax.id),
    "paste",
    "key_tab",
    "key_delete",
    "clipBoard_" + String(info.hometax.pwd),
    "paste",
    [ 1145, 575, 1000 ],
    async function () {
      await sleep(500);
      document.getElementById("myMenuQuickLi3").click();
    },
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
        pageButtons = document.getElementById(iframeId).contentWindow.document.querySelectorAll('.w2pageList_control_label');
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
            business: textArr[index + 2],
            from: textArr[index + 3],
            item: textArr[index + 5],
            supply: Number(textArr[index + 6].replace(/[^0-9\-]/g, '')),
            vat: Number(textArr[index + 7].replace(/[^0-9\-]/g, '')),
            service: Number(textArr[index + 8].replace(/[^0-9\-]/g, '')),
            total: Number(textArr[index + 9].replace(/[^0-9\-]/g, '')),
            id: textArr[index + 10],
            issuance: textArr[index + 11],
            deal: /승인/gi.test(textArr[index + 12]),
            etc: textArr[index + 15],
          });
        }

        total.push(middle);
        await sleep(500);
      }

      await ajaxPromise({ to: "python", path: "/cashReceipt", data: { cashIn: total } }, RECEIVECONST);

    },
    "wait_2000",
    [ 1045, 112, 500 ],
    "key_enter",
    "close",
  ];
};
