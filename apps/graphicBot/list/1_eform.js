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

      console.log("request!");
      await injectionInput(document.getElementById("field_TEXT_5faa618f9da73962a9050ef4"), "배창규");
      await injectionInput(document.getElementById("field_TEXT_5faa6196b3c0673961000001"), "주소");
      await injectionInput(document.getElementById("field_TEXT_5faa618f9da73962a9050ef6"), "배창규");
    }
  ];
};
