module.exports = function (proid, info) {
  return [
    "https://eform.io/signin",
    "key_f12",
    async function () {
      try {
        const { requestNumber, client, project, designer } = equalJson(JSON.stringify(POSTCONST));
        const { request, analytics } = client.requests[requestNumber];
        const today = new Date();
        const idId = "sign-in-id";
        const passwordId = "sign-in-pw";
        const loginReturn = ".sc-kHOZQx";
        const menuId = "btnMenuMyForms";
        const buttonQuery = ".bePCOT";
        const popupQuery = "section.sc-fvxABq";
        let map;
        let tempArr;
        let data, raw;

        console.log(client.requests[requestNumber]);

        console.log(request, analytics);

        if (document.getElementById(idId) !== null) {
          await injectionInput(document.getElementById(idId), "info.eform.id");
          await injectionInput(document.getElementById(passwordId), "info.eform.pwd");
          document.querySelector(loginReturn).click();
        }

        while (document.getElementById(menuId) === null) {
          await sleep(500);
        }
        document.getElementById(menuId).click();

        while (document.querySelector(buttonQuery) === null) {
          await sleep(500);
        }
        let buttons;
        buttons = document.querySelectorAll(buttonQuery);
        while (buttons.length <= 2) {
          await sleep(500);
          buttons = document.querySelectorAll(buttonQuery);
        }
        buttons[2].querySelectorAll("button")[2].click();

        while (document.querySelector(popupQuery) === null) {
          await sleep(500);
        }
        document.querySelector(popupQuery).querySelector("button").click();

        await sleep(1000);

        map = [
          { id: "field_TEXT_5faa618f9da73962a9050ef4", value: client.name },
          { id: "field_TEXT_5faa6196b3c0673961000001", value: request.space.address },
          { id: "field_TEXT_5faa618f9da73962a9050ef6", value: client.name },
        ];

        for (let { id, value } of map) {
          await injectionInput(document.getElementById(id), value, true);
        }

        scrollTo(document.getElementById("canvasBox"), document.getElementById("field_DATE_5faa618f9da73962a9050ef7"), document.getElementById("header").getBoundingClientRect().height * 3);

        await clickElement(document.getElementById("field_DATE_5faa618f9da73962a9050ef7"));
        await sleep(200);

        while (document.querySelector('.MuiPickersCalendar-week') === null) {
          await sleep(500);
        }
        let calendarBox = {
          left: document.querySelectorAll('.MuiPickersCalendarHeader-iconButton')[0].getBoundingClientRect(),
          right: document.querySelectorAll('.MuiPickersCalendarHeader-iconButton')[1].getBoundingClientRect(),
          return: document.querySelectorAll('.MuiButton-textPrimary')[2].getBoundingClientRect(),
          first: document.querySelector('.MuiPickersCalendar-week').firstChild.getBoundingClientRect()
        };
        calendarBox = JSON.parse(JSON.stringify(calendarBox));

        await sleep(200);
        await clickElement(document.getElementById("field_DATE_5faa618f9da73962a9050ef9"));
        await sleep(1000);

        map = [
          { id: "field_DATE_5faa618f9da73962a9050ef7", value: dateToString(project.process.contract.first.date) },
          { id: "field_DATE_5faa618f9da73962a9050ef9", value: dateToString(project.process.contract.form.date.from) },
          { id: "field_DATE_5faa618f9da73962a9050efa", value: dateToString(project.process.contract.form.date.to) },
        ];

        for (let { id, value } of map) {
          await calendarInput(document.getElementById(id), value, calendarBox);
        }

        map = [
          { id: "field_TEXT_5faa618f9da73962a9050ef5", value: client.name },
          { id: "field_TEXT_AREA_5faa618f9da73962a9050ef8", value: request.family },
          { id: "field_TEXT_AREA_5faa618f9da73962a9050f04", value: request.space.address },
          { id: "field_TEXT_5faa618f9da73962a9050f01", value: request.budget },
          { id: "field_TEXT_5faa618f9da73962a9050f02", value: designer.designer },
          { id: "field_TEXT_5faa618f9da73962a9050efb", value: request.space.contract },
          { id: "field_TEXT_5faa618f9da73962a9050efd", value: dateToString(analytics.date.space.precheck) },
          { id: "field_TEXT_5faa618f9da73962a9050efe", value: dateToString(analytics.date.space.empty) },
          { id: "field_TEXT_5faa618f9da73962a9050efc", value: dateToString(analytics.date.space.movein) },
          { id: "field_TEXT_5faa618f9da73962a9050eff", value: String(request.space.pyeong) + "평" },
          { id: "field_TEXT_AREA_5faa618f9da73962a9050f00", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
          { id: "field_TEXT_5faa618f9da73962a9050f03", value: serviceParsing(project.service) },
        ];

        scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

        for (let { id, value } of map) {
          await injectionInput(document.getElementById(id), value, true);
        }

        map = [
          { id: "field_TEXT_5faa618f9da73962a9050f05", value: autoComma(project.process.contract.remain.calculation.supply - project.process.contract.first.calculation.amount) },
          { id: "field_TEXT_5faa618f9da73962a9050f06", value: autoComma(project.process.contract.remain.calculation.consumer) },
        ];

        scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

        for (let { id, value } of map) {
          await injectionInput(document.getElementById(id), value, true);
        }

        map = [
          { id: "field_TEXT_5faa618f9da73962a9050f16", value: client.name },
          { id: "field_TEXT_5faa618f9da73962a9050f1a", value: client.name },
          { id: "field_TEXT_5faa61beb3c0673961000002", value: request.space.address },
          { id: "field_TEXT_5faa618f9da73962a9050f19", value: client.name },
        ];

        scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

        for (let { id, value } of map) {
          await injectionInput(document.getElementById(id), value, true);
        }

        document.querySelectorAll("#header .btn-router")[1].click();

        while (document.querySelector("#sendFormName") === null || document.querySelector("#sendFormName") === undefined) {
          await sleep(500);
        }
        await sleep(1000);

        tempArr = dateToString(today).split('-');
        await injectionInput(document.getElementById("sendFormName"), ("홈스타일링계약서_" + client.name + "고객님_주홈리에종_" + tempArr[0].slice(2) + tempArr[1] + tempArr[2]));

        tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
        while (tempArr.length < 3) {
          await sleep(500);
          tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
        }

        await injectionInput(tempArr[0], client.name, true);
        await injectionInput(tempArr[1], client.email, true);
        await injectionInput(tempArr[2], client.phone.replace(/[^0-9]/g, ''), true);

        await clickElement(document.querySelectorAll(".Select-arrow-zone")[1]);
        await sleep(1000);

        while (document.querySelector(".Select-menu-outer") === null) {
          await sleep(500);
        }
        await clickElement(document.getElementById("react-select-9--option-3"));






        // await sleep(500);
        // document.querySelectorAll('.btn-router')[1].click();
        // await sleep(500);
        //
        // while (document.querySelector(".confirm") === null) {
        //   await sleep(500);
        // }
        // document.querySelector(".confirm").click();
        //
        // await sleep(2000);
        //
        // while (document.querySelector("ul.sc-kRqLsF") === null) {
        //   await sleep(500);
        // }
        // while (document.querySelector("ul.sc-kRqLsF").children.length === 0) {
        //   await sleep(500);
        // }
        // while (document.querySelectorAll("li.sc-iaUyKn").length === 0) {
        //   await sleep(500);
        // }
        //
        // document.querySelector("li.sc-iaUyKn").querySelector(".hTuXtU").children[1].click();
        // await sleep(500);
        //
        // while (document.querySelector(".info-list") === null) {
        //   await sleep(500);
        // }
        // await sleep(500);
        //
        // tempArr = document.querySelector(".info-list").children;
        // data = {};
        // raw = [];
        // for (let dom of tempArr) {
        //   raw.push(dom.textContent);
        // }
        // raw = raw.map((r) => { return r.split(':'); });
        // for (let arr of raw) {
        //   if (/이름/gi.test(arr[0])) {
        //     data.name = arr[1].trim();
        //   }
        //   if (/ID/gi.test(arr[0])) {
        //     data.id = arr[1].trim();
        //   }
        //   if (/생성시간/gi.test(arr[0])) {
        //     data.time = arr[1].trim();
        //   }
        // }
        //
        // await ajaxPromise({ to: "python", path: "/contractForm", data, RECEIVECONST);

      } catch (e) {
        console.log(e);
      }
    }
  ];
};
