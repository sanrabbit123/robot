module.exports = function (proid, info) {
  return [
    "https://widsign.com/signin",
    async function () {
      try {
        const { requestNumber, client, project, designer, summary } = equalJson(JSON.stringify(POSTCONST));
        const { contractName, contractAddress, contractPhone } = summary;
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
        let clientPhone;
        let num;

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

          clientPhone = client.phone;

          map = [
            { id: "field_61a6f7c667ddfb605cdf7b06", value: titleName },
            { id: "field_61a6f7c667ddfb605cdf7b13", value: summary.name },
            { id: "field_61a6f7c667ddfb605cdf7b07", value: summary.address },
            { id: "field_61a6f7c667ddfb605cdf7b12", value: summary.date.start },
            { id: "field_61a6f7c667ddfb605cdf7b08", value: summary.date.end },
            { id: "field_61a6f7c667ddfb605cdf7b0e", value: summary.hangul },
            { id: "field_61a6f7c667ddfb605cdf7b1a", value: autoComma(summary.total) },
            { id: "field_61a6f7c667ddfb605cdf7b1b", value: String(summary.first.percentage) + '%' },
            { id: "field_61a6f7c667ddfb605cdf7b14", value: autoComma(summary.first.amount) },
            { id: "field_61a6f7c667ddfb605cdf7b0f", value: summary.first.date },
            { id: "field_61a6f7c667ddfb605cdf7b10", value: summary.first.etc },
            { id: "field_61a6f7c667ddfb605cdf7b18", value: String(summary.start.percentage) + '%' },
            { id: "field_61a6f7c667ddfb605cdf7b16", value: autoComma(summary.start.amount) },
            { id: "field_61a6f7c667ddfb605cdf7b1c", value: summary.start.date },
            { id: "field_61a6f7c667ddfb605cdf7b0d", value: summary.start.etc },
            { id: "field_61a6f7c667ddfb605cdf7b09", value: String(summary.middle.percentage) + '%' },
            { id: "field_61a6f7c667ddfb605cdf7b19", value: autoComma(summary.middle.amount) },
            { id: "field_61a6f7c667ddfb605cdf7b17", value: summary.middle.date },
            { id: "field_61a6f7c667ddfb605cdf7b0a", value: summary.middle.etc },
            { id: "field_61a6f7c667ddfb605cdf7b15", value: String(summary.remain.percentage) + '%' },
            { id: "field_61a6f7c667ddfb605cdf7b11", value: autoComma(summary.remain.amount) },
            { id: "field_61a6f7c667ddfb605cdf7b0c", value: summary.remain.date },
            { id: "field_61a6f7c667ddfb605cdf7b0b", value: summary.remain.etc },
            { id: "field_61a6f7c667ddfb605cdf7b1d", value: titleName },
            { id: "field_61a6f7c667ddfb605cdf7b22", value: contractPhone },
            { id: "field_61a6f7c667ddfb605cdf7b23", value: contractAddress },
            { id: "field_61a6f7c667ddfb605cdf7b20", value: clientPhone },
          ];

          sendMap = [
            titleName,
            client.email,
            client.phone.replace(/[^0-9]/g, ''),
          ];

          // logic

          dateBoo = false;
          firstDateId = '';

          document.querySelector('form').children[0].children[2].children[4].click();
          await sleep(500);
          document.querySelectorAll("button")[1].click();
          await sleep(500);
          document.querySelectorAll('.MuiButtonGroup-root')[contractOrder].querySelector("button").click();
          await sleep(500);
          document.querySelectorAll('.MuiButton-label')[document.querySelectorAll('.MuiButton-label').length - 1].click();
          await sleep(500);

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
            scrollTo(document.querySelectorAll('header')[document.querySelectorAll('header').length - 1].nextElementSibling.lastChild.children[1].firstChild.firstChild, document.getElementById(id), document.getElementById("header").getBoundingClientRect().height * 3);
            if (date) {
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
          await clickElement(document.getElementById("react-select-11--option-3"));

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
