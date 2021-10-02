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
        const { raw, apart, cliid } = equalJson(JSON.stringify(POSTCONST));
        await sleep(1000);
        if (document.querySelector('.complex_detail_link') !== null) {
          document.querySelector('.complex_detail_link').firstChild.click();
          await sleep(1000);

          const infoTable = document.querySelector('.info_table_wrap');
          const items = infoTable.querySelectorAll('.info_table_item');
          let length;
          let keyArr, valueArr;
          let result;
          let pyeongs;
          let pyeongArr;
          let pyeongItems;
          let tempArr;
          let final;

          keyArr = [];
          valueArr = [];
          for (let item of items) {
            length = item.children.length;
            for (let i = 0; i < length; i++) {
              if (i % 2 === 0) {
                keyArr.push(item.children[i].textContent);
              } else {
                valueArr.push(item.children[i].textContent);
              }
            }
          }
          result = [];
          for (let i = 0; i < keyArr.length; i++) {
            result.push({
              name: keyArr[i].trim(),
              value: valueArr[i].trim()
            });
          }

          if (document.querySelector('.btn_moretab') !== null) {
            document.querySelector('.btn_moretab').click();
          }

          if (document.getElementById("complex_pyeong_tab_list") !== null) {
            pyeongs = document.getElementById("complex_pyeong_tab_list").querySelectorAll('a');
            pyeongArr = [];
            for (let dom of pyeongs) {
              dom.click();
              pyeongItems = document.getElementById("tabpanel").querySelector('.info_table_wrap').querySelectorAll('.info_table_item');
              keyArr = [];
              valueArr = [];
              for (let item of pyeongItems) {
                length = item.children.length;
                for (let i = 0; i < length; i++) {
                  if (i % 2 === 0) {
                    keyArr.push(item.children[i].textContent);
                  } else {
                    valueArr.push(item.children[i].textContent);
                  }
                }
              }

              if (keyArr.length !== valueArr.length) {
                if (keyArr.length > valueArr.length) {
                  keyArr = keyArr.slice(0, valueArr.length);
                } else {
                  valueArr = valueArr.slice(0, keyArr.length);
                }
              }
              tempArr = [];
              for (let i = 0; i < keyArr.length; i++) {
                tempArr.push({
                  name: keyArr[i].trim(),
                  value: valueArr[i].trim()
                });
              }
              pyeongArr.push(tempArr);
            }
          }

          final = {
            raw, apart, cliid,
            id: window.location.pathname.split("/")[2],
            entire: result,
            detail: pyeongArr,
            link: (window.location.protocol + "//" + window.location.host + window.location.pathname)
          };

          await ajaxPromise({
            to: "office",
            path: "/apartmentInfo",
            data: final,
          }, HOSTCONST + "/receive");

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
          await ajaxPromise({ apartName: "noting" }, ACCUMULATIONCONST);
        }
      } catch (e) {
        console.log(e);
      }
    },
    "toss: https://map.kakao.com",
    async function () {
      try {
        const { raw, apart } = equalJson(JSON.stringify(POSTCONST));
        const { apartName } = equalJson(JSON.stringify(ACCUMULATIONDATA));
        if (apartName === "nothing") {
          let index, tempArr, placeList, newName;
          tempArr = raw.split(' ');
          index = tempArr.findIndex((i) => { return /[동로가리길]$/i.test(i); });
          await injectionInput(document.getElementById('search.keyword.query'), tempArr.slice(0, index + 2).join(' '));
          await pressKey("enter");
          await sleep(1000);
          placeList = document.getElementById('info.search.place.list');
          if (placeList !== null && placeList.children.length > 0) {
            newName = document.getElementById('info.search.place.list').children[0].querySelector('.head_item').querySelector('.tit_name').querySelector('.link_name').textContent;
            await ajaxPromise({ apartName: newName }, ACCUMULATIONCONST);
          } else {
            // null
            await ajaxPromise({ to: 0, data: 2 }, ENDCONST);
            return true;
          }
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
        const { raw, cliid } = equalJson(JSON.stringify(POSTCONST));
        const { apartName: apart } = equalJson(JSON.stringify(ACCUMULATIONDATA));
        await sleep(1000);
        if (document.querySelector('.complex_detail_link') !== null) {
          document.querySelector('.complex_detail_link').firstChild.click();
          await sleep(1000);

          const infoTable = document.querySelector('.info_table_wrap');
          const items = infoTable.querySelectorAll('.info_table_item');
          let length;
          let keyArr, valueArr;
          let result;
          let pyeongs;
          let pyeongArr;
          let pyeongItems;
          let tempArr;
          let final;

          keyArr = [];
          valueArr = [];
          for (let item of items) {
            length = item.children.length;
            for (let i = 0; i < length; i++) {
              if (i % 2 === 0) {
                keyArr.push(item.children[i].textContent);
              } else {
                valueArr.push(item.children[i].textContent);
              }
            }
          }
          result = [];
          for (let i = 0; i < keyArr.length; i++) {
            result.push({
              name: keyArr[i].trim(),
              value: valueArr[i].trim()
            });
          }

          if (document.querySelector('.btn_moretab') !== null) {
            document.querySelector('.btn_moretab').click();
          }

          if (document.getElementById("complex_pyeong_tab_list") !== null) {
            pyeongs = document.getElementById("complex_pyeong_tab_list").querySelectorAll('a');
            pyeongArr = [];
            for (let dom of pyeongs) {
              dom.click();
              pyeongItems = document.getElementById("tabpanel").querySelector('.info_table_wrap').querySelectorAll('.info_table_item');
              keyArr = [];
              valueArr = [];
              for (let item of pyeongItems) {
                length = item.children.length;
                for (let i = 0; i < length; i++) {
                  if (i % 2 === 0) {
                    keyArr.push(item.children[i].textContent);
                  } else {
                    valueArr.push(item.children[i].textContent);
                  }
                }
              }

              if (keyArr.length !== valueArr.length) {
                if (keyArr.length > valueArr.length) {
                  keyArr = keyArr.slice(0, valueArr.length);
                } else {
                  valueArr = valueArr.slice(0, keyArr.length);
                }
              }
              tempArr = [];
              for (let i = 0; i < keyArr.length; i++) {
                tempArr.push({
                  name: keyArr[i].trim(),
                  value: valueArr[i].trim()
                });
              }
              pyeongArr.push(tempArr);
            }
          }

          final = {
            raw, apart, cliid,
            id: window.location.pathname.split("/")[2],
            entire: result,
            detail: pyeongArr,
            link: (window.location.protocol + "//" + window.location.host + window.location.pathname)
          };

          await ajaxPromise({
            to: "office",
            path: "/apartmentInfo",
            data: final,
          }, HOSTCONST + "/receive");

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
