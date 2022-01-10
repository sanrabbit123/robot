module.exports = function (proid, info) {
  return [
    "https://widsign.com/signin",
    async function () {
      try {
        const { requestNumber, client, project, designer, contractName, contractAddress } = equalJson(JSON.stringify(POSTCONST));
        const { request, analytics } = client.requests[requestNumber];
        const today = new Date();
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
        let num;

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

          // static

          contractOrder = 2;

          titleName = client.name;
          if (contractName.trim() !== "") {
            titleName = contractName;
          }

          titleAddress = request.space.address;
          if (contractAddress.trim() !== "") {
            titleAddress = contractAddress;
          }

          formTitle = "홈스타일링계약서_" + titleName + "고객님_주홈리에종_";

          finalRouter = "/receiveStylingContract";

          map = [
            { id: "field_5faa618f9da73962a9050ef4", value: titleName },
            { id: "field_5faa6196b3c0673961000001", value: titleAddress },
            { id: "field_5faa618f9da73962a9050ef6", value: client.phone },
            { id: "field_5faa618f9da73962a9050ef7", value: dateToString(project.process.contract.first.date), date: true },
            { id: "field_5faa618f9da73962a9050ef9", value: dateToString(project.process.contract.form.date.from), date: true },
            { id: "field_5faa618f9da73962a9050efa", value: dateToString(project.process.contract.form.date.to), date: true },
            { id: "field_5faa618f9da73962a9050ef5", value: titleName },
            { id: "field_5faa618f9da73962a9050ef8", value: request.family },
            { id: "field_5faa618f9da73962a9050f04", value: titleAddress },
            { id: "field_5faa618f9da73962a9050f01", value: request.budget + " (디자이너 논의 및 조정)" },
            { id: "field_5faa618f9da73962a9050f02", value: designer.designer + ", " + designer.information.phone },
            { id: "field_5faa618f9da73962a9050efb", value: request.space.contract },
            { id: "field_5faa618f9da73962a9050efd", value: (/없/gi.test(dateToString(analytics.date.space.precheck)) ? '-' : dateToString(analytics.date.space.precheck)) },
            { id: "field_5faa618f9da73962a9050efe", value: (/없/gi.test(dateToString(analytics.date.space.empty)) ? '-' : dateToString(analytics.date.space.empty)) },
            { id: "field_5faa618f9da73962a9050efc", value: (/없/gi.test(dateToString(request.space.resident.expected)) ? '-' : dateToString(request.space.resident.expected)) },
            { id: "field_5faa618f9da73962a9050eff", value: String(request.space.pyeong) + "평" },
            { id: "field_5faa618f9da73962a9050f00", value: "방 " + String(request.space.spec.room) + "개 / 화장실 " + String(request.space.spec.bathroom) + "개" },
            { id: "field_5faa618f9da73962a9050f03", value: serviceParsing(project.service) },
            { id: "field_5faa618f9da73962a9050f05", value: autoComma(project.process.contract.remain.calculation.amount.consumer - project.process.contract.first.calculation.amount) },
            { id: "field_5faa618f9da73962a9050f06", value: autoComma(project.process.contract.remain.calculation.amount.consumer) },
            { id: "field_5faa618f9da73962a9050f16", value: titleName },
            { id: "field_5faa618f9da73962a9050f1a", value: client.phone },
            { id: "field_5faa61beb3c0673961000002", value: titleAddress },
            { id: "field_5faa618f9da73962a9050f19", value: titleName },
          ];

          sendMap = [
            titleName,
            client.email,
            client.phone.replace(/[^0-9]/g, ''),
          ];


          // logic

          dateBoo = true;
          firstDateId = "field_5faa618f9da73962a9050ef7";

          document.querySelector('form').children[0].children[2].children[4].click();
          while (document.querySelectorAll("button").length <= 1) {
            await sleep(500);
          }
          document.querySelectorAll("button")[1].click();
          while (document.querySelectorAll(".MuiButtonGroup-root").length <= 3) {
            await sleep(500);
          }
          document.querySelectorAll('.MuiButtonGroup-root')[contractOrder].querySelector("button").click();
          while (document.querySelectorAll(".MuiButton-label").length <= 3) {
            await sleep(500);
          }
          document.querySelectorAll('.MuiButton-label')[document.querySelectorAll('.MuiButton-label').length - 1].click();
          await sleep(1000);

          if (dateBoo) {
            scrollTo(document.querySelectorAll('header')[document.querySelectorAll('header').length - 1].nextElementSibling.lastChild.children[1].firstChild.firstChild, document.getElementById(firstDateId), document.querySelectorAll('header')[document.querySelectorAll('header').length - 1].getBoundingClientRect().height * 3);
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
            document.querySelectorAll('.MuiButton-textPrimary')[3].click();
            await sleep(500);
          }

          for (let { id, value, date } of map) {
            scrollTo(document.querySelectorAll('header')[document.querySelectorAll('header').length - 1].nextElementSibling.lastChild.children[1].firstChild.firstChild, document.getElementById(id), document.querySelectorAll('header')[document.querySelectorAll('header').length - 1].getBoundingClientRect().height * 3);
            if (date) {
              await calendarInput(document.getElementById(id), value, calendarBox);
            } else {
              await injectionInput(document.getElementById(id), value, true);
            }
          }

          inputs.filter((dom) => { return dom.getAttribute("type") === "text" })[2]

          tempArr = dateToString(today).split('-');
          await injectionInput(document.getElementById("sendFormName"), (formTitle + tempArr[0].slice(2) + tempArr[1] + tempArr[2]));

          tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          while (tempArr.length < 3) {
            await sleep(500);
            tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
          }

          num = 0;
          for (let i of sendMap) {
            await injectionInput(tempArr[num], i, true);
            num++;
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
