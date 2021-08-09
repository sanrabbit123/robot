module.exports = function (proid, info) {
  return [
    "https://widsign.com/signin",
    async function () {
      try {
        const { requestNumber, client, project, designer, contractName, contractAddress } = equalJson(JSON.stringify(POSTCONST));
        const { request, analytics } = client.requests[requestNumber];
        const today = new Date();
        const idId = "sign-in-id";
        const passwordId = "sign-in-pw";
        const loginReturn = ".sc-hOGjNT";
        const menuId = "btnMenuMyForms";
        const buttonQuery = ".sc-hZpJuv";
        const popupQuery = ".sc-jWUzTF";
        let map;
        let tempArr;
        let data, raw;
        let titleName;
        let titleAddress;
        let rows;
        let dateBoo;
        let firstDateId;
        let calendarBox;
        let idLimitNumber;
        let idInformationButton;

        rows = equalJson(await ajaxPromise({
          to: "python",
          path: "/generalMongo",
          data: {
            mode: "read",
            db: "python",
            collection: "stylingForm",
            whereQuery: { proid: project.proid },
          }
        }, AJAXCONST));

        if (rows.length === 0) {

          titleName = client.name;
          if (contractName.trim() !== "") {
            titleName = contractName;
          }

          titleAddress = request.space.address;
          if (contractAddress.trim() !== "") {
            titleAddress = contractAddress;
          }

          map = [
            { id: "field_TEXT_5faa618f9da73962a9050ef4", value: titleName },
            { id: "field_TEXT_5faa6196b3c0673961000001", value: titleAddress },
            { id: "field_TEXT_5faa618f9da73962a9050ef6", value: client.phone },
            { id: "field_DATE_5faa618f9da73962a9050ef7", value: dateToString(project.process.contract.first.date) },
            { id: "field_DATE_5faa618f9da73962a9050ef9", value: dateToString(project.process.contract.form.date.from) },
            { id: "field_DATE_5faa618f9da73962a9050efa", value: dateToString(project.process.contract.form.date.to) },
            { id: "field_TEXT_5faa618f9da73962a9050ef5", value: titleName },
            { id: "field_TEXT_AREA_5faa618f9da73962a9050ef8", value: request.family },
            { id: "field_TEXT_AREA_5faa618f9da73962a9050f04", value: titleAddress },
            { id: "field_TEXT_5faa618f9da73962a9050f01", value: request.budget + " (디자이너 논의 및 조정)" },
            { id: "field_TEXT_5faa618f9da73962a9050f02", value: designer.designer + ", " + designer.information.phone },
            { id: "field_TEXT_5faa618f9da73962a9050efb", value: request.space.contract },
            { id: "field_TEXT_5faa618f9da73962a9050efd", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
            { id: "field_TEXT_5faa618f9da73962a9050efe", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
            { id: "field_TEXT_5faa618f9da73962a9050efc", value: (/없/gi.test(dateToString(analytics.date.space.movein)) ? '-' : dateToString(analytics.date.space.movein)) },
            { id: "field_TEXT_5faa618f9da73962a9050eff", value: String(request.space.pyeong) + "평" },
            { id: "field_TEXT_AREA_5faa618f9da73962a9050f00", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "field_TEXT_5faa618f9da73962a9050f03", value: serviceParsing(project.service) },
            { id: "field_TEXT_5faa618f9da73962a9050f05", value: autoComma(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount) },
            { id: "field_TEXT_5faa618f9da73962a9050f06", value: autoComma(project.process.contract.remain.calculation.amount.consumer) },
            { id: "field_TEXT_5faa618f9da73962a9050f16", value: titleName },
            { id: "field_TEXT_5faa618f9da73962a9050f1a", value: client.phone },
            { id: "field_TEXT_5faa61beb3c0673961000002", value: titleAddress },
            { id: "field_TEXT_5faa618f9da73962a9050f19", value: titleName },
          ];

          dateBoo = false;
          for (let obj of map) {
            if (/_DATE_/gi.test(obj.id)) {
              dateBoo = true;
              firstDateId = obj.id;
              break;
            }
          }

          if (document.getElementById(idId) !== null) {
            await injectionInput(document.getElementById(idId), "info.eform.id");
            await clickElement(document.querySelector("footer"));
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
          buttons[2].click();

          while (document.querySelector(popupQuery) === null) {
            await sleep(500);
          }
          document.querySelector(popupQuery).querySelector("button").click();

          await sleep(1000);

          if (dateBoo) {
            scrollTo(document.getElementById("canvasBox"), document.getElementById(firstDateId), document.getElementById("header").getBoundingClientRect().height * 3);
            await clickElement(document.getElementById(firstDateId));
            await sleep(200);
            while (document.querySelector('.MuiPickersCalendar-week') === null) {
              await sleep(500);
            }
            calendarBox = {
              left: document.querySelectorAll('.MuiPickersCalendarHeader-iconButton')[0].getBoundingClientRect(),
              right: document.querySelectorAll('.MuiPickersCalendarHeader-iconButton')[1].getBoundingClientRect(),
              return: document.querySelectorAll('.MuiButton-textPrimary')[2].getBoundingClientRect(),
              first: document.querySelector('.MuiPickersCalendar-week').firstChild.getBoundingClientRect()
            };
            calendarBox = JSON.parse(JSON.stringify(calendarBox));
            await sleep(200);
            document.querySelectorAll('.MuiButton-textPrimary')[1].click();
            await sleep(500);
          }

          for (let { id, value } of map) {
            scrollTo(document.getElementById("canvasBox"), document.getElementById(id), document.getElementById("header").getBoundingClientRect().height * 3);
            if (/_DATE_/gi.test(id)) {
              await calendarInput(document.getElementById(id), value, calendarBox);
            } else {
              await injectionInput(document.getElementById(id), value, true);
            }
          }

          tempArr = dateToString(today).split('-');
          await injectionInput(document.getElementById("sendFormName"), ("홈스타일링계약서_" + titleName + "고객님_주홈리에종_" + tempArr[0].slice(2) + tempArr[1] + tempArr[2]));

          tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          while (tempArr.length < 3) {
            await sleep(500);
            tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          }

          await injectionInput(tempArr[0], titleName, true);
          await injectionInput(tempArr[1], client.email, true);
          await injectionInput(tempArr[2], client.phone.replace(/[^0-9]/g, ''), true);

          await clickElement(document.querySelectorAll(".Select-arrow-zone")[1]);
          await sleep(1000);

          while (document.querySelector(".Select-menu-outer") === null) {
            await sleep(500);
          }
          await clickElement(document.getElementById("react-select-11--option-4"));

          await sleep(500);
          document.querySelector('.send').click();
          await sleep(500);

          while (document.querySelector(".sc-jWUzTF") === null) {
            await sleep(500);
          }

          document.querySelector(".sc-jWUzTF").querySelectorAll("button")[1].click();

          await sleep(2000);

          while (document.querySelector("ul.sc-eGRTUG") === null) {
            await sleep(500);
          }
          while (document.querySelector("ul.sc-eGRTUG").children.length === 0) {
            await sleep(500);
          }
          while (document.querySelector("ul.sc-eGRTUG").firstChild.querySelector('a') === null) {
            await sleep(500);
          }

          document.querySelector("ul.sc-eGRTUG").firstChild.querySelector('a').click();

          while (document.querySelector(".view-header-title") === null) {
            await sleep(500);
          }

          if (/\(/gi.test(document.querySelector(".view-header-title").textContent)) {
            raw = document.querySelector(".view-header-title").textContent.split('(').map((i) => { return i.replace(/[\(\)]/gi, '').trim(); });
            data = {};
            data.name = raw[0].trim();
            data.id = raw[1].trim();
            data.time = new Date();
            data.requestNumber = requestNumber;
            data.cliid = client.cliid;
            data.proid = project.proid;
            await ajaxPromise({ to: "python", path: "/receiveStylingContract", data }, RECEIVECONST);
          }

        }

      } catch (e) {
        console.log(e);
      }
    }
  ];
};
