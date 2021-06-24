module.exports = function (proid, info) {
  return [
    "https://eform.io/signin",
    "key_f12",
    async function () {
      const idId = "sign-in-id";
      const passwordId = "sign-in-pw";
      if (document.getElementById(idId) !== null) {
        await injectionInput(document.getElementById(idId), "info.eform.id");
        await injectionInput(document.getElementById(passwordId), "info.eform.pwd");
        document.querySelector('.sc-kHOZQx').click();
      }
    },
    async function () {
      const menuId = "btnMenuMyForms";
      while (document.getElementById(menuId) === null) {
        await sleep(500);
      }
      document.getElementById(menuId).click();
    },
    async function () {
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
    },
    async function () {
      const popupQuery = "section.sc-fvxABq";
      while (document.querySelector(popupQuery) === null) {
        await sleep(500);
      }
      document.querySelector(popupQuery).querySelector("button").click();
    },
    async function () {

      await injectionInput(document.getElementById("field_TEXT_5faa618f9da73962a9050ef4"), "배창규");
      await injectionInput(document.getElementById("field_TEXT_5faa6196b3c0673961000001"), "주소");
      await injectionInput(document.getElementById("field_TEXT_5faa618f9da73962a9050ef6"), "배창규");

      

        // const map = [
        //   { id: "field_TEXT_5faa618f9da73962a9050ef4", value: "배창규" },
        //   { id: "field_TEXT_5faa6196b3c0673961000001", value: "주소" },
        //   { id: "field_TEXT_5faa618f9da73962a9050ef6", value: "배창규" },
        //   // { id: "field_DATE_5faa618f9da73962a9050ef7", value: "2000-01-01" },
        //   // { id: "field_DATE_5faa618f9da73962a9050ef9", value: "2020-01-01" },
        //   // { id: "field_DATE_5faa618f9da73962a9050efa", value: "2020-01-02" },
        //
        //   // { id: "field_TEXT_5faa618f9da73962a9050ef5", value: "배창규" },
        //   // { id: "field_TEXT_AREA_5faa618f9da73962a9050ef8", value: "가족구성원" },
        //   // { id: "field_TEXT_AREA_5faa618f9da73962a9050f04", value: "주소" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f01", value: "1,000만원" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f02", value: "전경화" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050efb", value: "자가" },
        //
        //   // { id: "field_TEXT_5faa618f9da73962a9050efd", value: "2020-01-01" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050efe", value: "2020-01-01" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050efc", value: "2020-01-01" },
        //
        //   // { id: "field_TEXT_5faa618f9da73962a9050eff", value: "34평" },
        //   // { id: "field_TEXT_AREA_5faa618f9da73962a9050f00", value: "방 3개 / 화장실 2개" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f03", value: "홈스타일링" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f05", value: "330000" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f06", value: "33000" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f16", value: "배창규" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f1a", value: "배창규" },
        //   // { id: "field_TEXT_5faa61beb3c0673961000002", value: "주소" },
        //   // { id: "field_TEXT_5faa618f9da73962a9050f19", value: "배창규" },
        // ];
        //
        // for (let { id, value } of map) {
        //   await injectionInput(document.getElementById(id), value);
        // }

    }
  ];
};
