module.exports = function (arg, info) {
  return [
    "https://new.land.naver.com/complexes",
    async function () {
      try {
        const { raw, apart } = equalJson(JSON.stringify(POSTCONST));
        await injectionInput(document.querySelector(".search_input"), apart);
        document.querySelector(".button_search--icon").click();
      } catch (e) {
        console.log(e);
      }
    },
    async function () {
      try {
        await sleep(1000);
        if (document.querySelector('.complex_detail_link') !== null) {
          document.querySelector('.complex_detail_link').firstChild.click();
          await sleep(1000);
          // document.querySelector('.info_table_wrap')
          await ajaxPromise({ to: 0, data: 2 }, ENDCONST);
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    "toss: https://map.naver.com/v5",
    async function () {
      try {
        const { raw, apart } = equalJson(JSON.stringify(POSTCONST));
        await injectionInput(document.querySelector('.input_search'), raw);
        await pressKey("enter");
        await crossIframe(document.getElementById("searchIframe"));
      } catch (e) {
        console.log(e);
      }
    },
    async function () {
      try {
        if (document.getElementById('_pcmap_list_scroll_container') !== null) {
          const words = document.getElementById('_pcmap_list_scroll_container').querySelectorAll('li')[0].querySelector('a').querySelectorAll("span");
          await ajaxPromise({ apartName: words[0].textContent }, ACCUMULATIONCONST);
        } else {
          // null
          await ajaxPromise({ to: 0, data: 2 }, ENDCONST);
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    "toss: https://new.land.naver.com/complexes",
    async function () {
      try {
        const { apartName } = equalJson(JSON.stringify(ACCUMULATIONDATA));
        await injectionInput(document.querySelector(".search_input"), apartName);
        document.querySelector(".button_search--icon").click();
      } catch (e) {
        console.log(e);
      }
    },
    async function () {
      try {
        await sleep(1000);
        if (document.querySelector('.complex_detail_link') !== null) {
          document.querySelector('.complex_detail_link').firstChild.click();
          await sleep(1000);
          // document.querySelector('.info_table_wrap')
          await ajaxPromise({ to: 0, data: 2 }, ENDCONST);
          return true;
        } else {
          // null
          await ajaxPromise({ to: 0, data: 2 }, ENDCONST);
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    },
  ];
};
