module.exports = function (proid, info) {
  return [
    "https://widsign.com/signin",
    async function () {
      try {
        const { requestNumber, client, project, designer, summary } = equalJson(JSON.stringify(POSTCONST));
        const { contractName, contractAddress, contractPhone } = summary;
        const { request, analytics } = client.requests[requestNumber];
        const today = new Date();
        const idId = "sign-in-id";
        const passwordId = "sign-in-pw";
        const loginReturn = ".sc-hOGjNT";
        const menuId = "btnMenuMyForms";
        const buttonQuery = ".sc-hZpJuv";
        const popupQuery = ".sc-jWUzTF";
        let map, sendMap;
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
        let formTitle;
        let finalRouter;
        let contractOrder;
        let clientPhone;

        rows = equalJson(await ajaxPromise({
          to: "python",
          path: "/generalMongo",
          data: {
            mode: "read",
            db: "python",
            collection: "constructForm",
            whereQuery: { proid: project.proid },
          }
        }, AJAXCONST));

        if (rows.length === 0) {

          // static

          contractOrder = 0;

          titleName = client.name;
          if (contractName.trim() !== "") {
            titleName = contractName;
          }

          titleAddress = request.space.address;
          if (contractAddress.trim() !== "") {
            titleAddress = contractAddress;
          }

          formTitle = "시공계약서_" + titleName + "고객님_주홈리에종_";

          finalRouter = "/receiveConstructContract";

          // clientPhone = client.phone;
          clientPhone = "010-2747-3403";

          map = [
            { id: "field_TEXT_60b9d758f07a5cf0004c6ecc", value: titleName },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ecd", value: summary.name },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ece", value: summary.address },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ecf", value: summary.date.start },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ed0", value: summary.date.end },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ee0", value: summary.hangul },
            { id: "field_TEXT_60b9d758f07a5cf0004c6edf", value: autoComma(summary.total) },

            { id: "field_TEXT_60b9d758f07a5cf0004c6ed1", value: String(summary.first.percentage) + '%' },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ed2", value: autoComma(summary.first.amount) },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ed6", value: summary.first.date },
            { id: "field_TEXT_60b9d758f07a5cf0004c6edc", value: summary.first.etc },



            


            { id: "field_TEXT_60b9d758f07a5cf0004c6ed1", value: String(summary.start.percentage) + '%' },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ed2", value: autoComma(summary.start.amount) },
            { id: "field_TEXT_60b9d758f07a5cf0004c6ed6", value: summary.start.date },
            { id: "field_TEXT_60b9d758f07a5cf0004c6edc", value: summary.start.etc },














            { id: "field_TEXT_5faa618f9da73962a9050ef6", value: clientPhone },
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
            { id: "field_TEXT_5faa618f9da73962a9050efc", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
            { id: "field_TEXT_5faa618f9da73962a9050eff", value: String(request.space.pyeong) + "평" },
            { id: "field_TEXT_AREA_5faa618f9da73962a9050f00", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "field_TEXT_5faa618f9da73962a9050f03", value: serviceParsing(project.service) },
            { id: "field_TEXT_5faa618f9da73962a9050f05", value: autoComma(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount) },
            { id: "field_TEXT_5faa618f9da73962a9050f06", value: autoComma(project.process.contract.remain.calculation.amount.consumer) },
            { id: "field_TEXT_5faa618f9da73962a9050f16", value: titleName },
            { id: "field_TEXT_5faa618f9da73962a9050f1a", value: clientPhone },
            { id: "field_TEXT_5faa61beb3c0673961000002", value: titleAddress },
            { id: "field_TEXT_5faa618f9da73962a9050f19", value: titleName },
          ];

          // sendMap = [
          //   titleName,
          //   client.email,
          //   client.phone.replace(/[^0-9]/g, ''),
          // ];

          sendMap = [
            titleName,
            "uragenbooks@gmail.com",
            "01027473403",
          ];


          // logic

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
            await clickElement(document.querySelector(loginReturn));
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
          await sleep(1000);
          await clickElement(buttons[contractOrder]);

          while (document.querySelector(popupQuery) === null) {
            await sleep(500);
          }
          document.querySelector(popupQuery).querySelector("button").click();

          await sleep(3000);

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
          await injectionInput(document.getElementById("sendFormName"), (formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2]));

          tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          while (tempArr.length < 3) {
            await sleep(500);
            tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          }

          for (let i of sendMap) {
            await injectionInput(tempArr[0], i, true);
          }

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

          await sleep(1000);
          await clickElement(document.querySelector(".sc-jWUzTF").querySelectorAll("button")[1]);

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
            await ajaxPromise({ to: "python", path: finalRouter, data }, RECEIVECONST);
          }

        }

      } catch (e) {
        console.log(e);
      }
    }
  ];
};
