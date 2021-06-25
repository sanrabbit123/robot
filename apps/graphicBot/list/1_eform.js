module.exports = function (proid, info) {
  return [
    "https://eform.io/signin",
    "key_f12",
    async function () {
      const today = new Date();
      const idId = "sign-in-id";
      const passwordId = "sign-in-pw";
      let map, scrollXPoint;
      let tempArr;


      if (document.getElementById(idId) !== null) {
        await injectionInput(document.getElementById(idId), "info.eform.id");
        await injectionInput(document.getElementById(passwordId), "info.eform.pwd");
        document.querySelector('.sc-kHOZQx').click();
      }

      const menuId = "btnMenuMyForms";
      while (document.getElementById(menuId) === null) {
        await sleep(500);
      }
      document.getElementById(menuId).click();

      const buttonQuery = ".bePCOT";
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

      const popupQuery = "section.sc-fvxABq";
      while (document.querySelector(popupQuery) === null) {
        await sleep(500);
      }
      document.querySelector(popupQuery).querySelector("button").click();

      await sleep(1000);


      scrollXPoint = 120;

      map = [
        { id: "field_TEXT_5faa618f9da73962a9050ef4", value: "배창규" },
        { id: "field_TEXT_5faa6196b3c0673961000001", value: "주소" },
        { id: "field_TEXT_5faa618f9da73962a9050ef6", value: "배창규" },
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
        { id: "field_DATE_5faa618f9da73962a9050ef7", value: "2021-07-21" },
        { id: "field_DATE_5faa618f9da73962a9050ef9", value: "2021-09-01" },
        { id: "field_DATE_5faa618f9da73962a9050efa", value: "2021-02-02" },
      ];

      for (let { id, value } of map) {
        await calendarInput(document.getElementById(id), value, calendarBox);
      }

      map = [
        { id: "field_TEXT_5faa618f9da73962a9050ef5", value: "배창규" },
        { id: "field_TEXT_AREA_5faa618f9da73962a9050ef8", value: "가족구성원" },
        { id: "field_TEXT_AREA_5faa618f9da73962a9050f04", value: "주소" },
        { id: "field_TEXT_5faa618f9da73962a9050f01", value: "1,000만원" },
        { id: "field_TEXT_5faa618f9da73962a9050f02", value: "전경화" },
        { id: "field_TEXT_5faa618f9da73962a9050efb", value: "자가" },
        { id: "field_TEXT_5faa618f9da73962a9050efd", value: "2020-01-01" },
        { id: "field_TEXT_5faa618f9da73962a9050efe", value: "2020-01-01" },
        { id: "field_TEXT_5faa618f9da73962a9050efc", value: "2020-01-01" },
        { id: "field_TEXT_5faa618f9da73962a9050eff", value: "34평" },
        { id: "field_TEXT_AREA_5faa618f9da73962a9050f00", value: "방 3개 / 화장실 2개" },
        { id: "field_TEXT_5faa618f9da73962a9050f03", value: "홈스타일링" },
      ];

      scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

      for (let { id, value } of map) {
        await injectionInput(document.getElementById(id), value, true);
      }

      map = [
        { id: "field_TEXT_5faa618f9da73962a9050f05", value: "330000" },
        { id: "field_TEXT_5faa618f9da73962a9050f06", value: "33000" },
      ];

      scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

      for (let { id, value } of map) {
        await injectionInput(document.getElementById(id), value, true);
      }

      map = [
        { id: "field_TEXT_5faa618f9da73962a9050f16", value: "배창규" },
        { id: "field_TEXT_5faa618f9da73962a9050f1a", value: "배창규" },
        { id: "field_TEXT_5faa61beb3c0673961000002", value: "주소" },
        { id: "field_TEXT_5faa618f9da73962a9050f19", value: "배창규" },
      ];

      scrollTo(document.getElementById("canvasBox"), document.getElementById(map[0].id), document.getElementById("header").getBoundingClientRect().height * 3);

      for (let { id, value } of map) {
        await injectionInput(document.getElementById(id), value, true);
      }

      document.querySelectorAll("#header .btn-router")[1].click();

      while (document.querySelector("#sendFormName") === null || document.querySelector("#sendFormName") === undefined) {
        await sleep(500);
      }

      tempArr = dateToString(today).split('-');

      await injectionInput(document.getElementById("sendFormName"), ("홈스타일링계약서_" + "배창규" + "고객님_주홈리에종_" + tempArr[0].slice(2) + tempArr[1] + tempArr[2]));

      tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
      while (tempArr.length < 3) {
        await sleep(500);
        tempArr = document.querySelector(".receiver-ul").querySelectorAll("input");
      }

      await injectionInput(tempArr[0], "배창규", true);
      await injectionInput(tempArr[1], "uragenbooks@gmail.com", true);
      await injectionInput(tempArr[2], String("010-2747-3403").replace(/[^0-9]/g, ''), true);

      await clickElement(document.querySelectorAll(".Select-arrow-zone")[1]);
      await sleep(500);

      while (document.querySelector(".Select-menu-outer") === null) {
        await sleep(500);
      }

      console.log(document.querySelector(".Select-menu-outer"));
      console.log(document.querySelector(".Select-menu-outer").children);
      for (let dom of document.querySelector(".Select-menu-outer").children) {
        console.log(dom);
        console.log(dom.children);
      }


    }
  ];
};
