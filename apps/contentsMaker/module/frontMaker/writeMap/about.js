module.exports = function(map, source_rawArr) {
  let temp_reg, temp_reg1, temp_reg2, temp_string0, temp_string1, temp_popupObj, temp_popupArr;
  let popupNum = 1;

  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  //main
  let arr_words, arr_images;
  let list = [
    "desktop",
    "mobile",
  ]
  let main = map.main;
  for (let i = 0; i < main.length; i++) {
    temp_reg = new RegExp("^titleNum" + String(i), 'g');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      main[i].src.number = "/svg/" + z;
      svgTong.sync.push(z);
    }}
    temp_reg = new RegExp("^title" + String(i), 'g');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      main[i].src.title = "/svg/" + z;
      svgTong.sync.push(z);
    }}
    arr_words = main[i].words;
    for (let j = 0; j < arr_words.length; j++) {
      arr_words[j].src = {}

      //desktop
      temp_reg = new RegExp("^words" + String(i) + String(j), 'g');
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        arr_words[j].src.desktop = "/svg/" + z;
        svgTong.sync.push(z);
      }}

      //mobile
      temp_reg = new RegExp("^mowords" + String(i) + String(j), 'g');
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        arr_words[j].src.mobile = "/svg/" + z;
        svgTong.sync.push(z);
      }}

      //buttons
      arr_words[j].src.buttons = [];
      for (let k = 0; k < arr_words[j].buttons.length; k++) {
        temp_reg = new RegExp("^button" + String(i) + String(j) + String(k), 'g');
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_string0 = "/svg/" + z;
          svgTong.sync.push(z);
        }}
        temp_reg = new RegExp("^buttonNum" + String(i) + String(j) + String(k), 'g');
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_string1 = "/svg/" + z;
          svgTong.sync.push(z);
        }}
        arr_words[j].src.buttons.push({
          button: temp_string0,
          number: temp_string1,
        });
      }

      //popups
      temp_popupObj = arr_words[j].popup;

      //popup words
      temp_popupArr = temp_popupObj.words;
      for (let k = 0; k < temp_popupArr.length; k++) {

        temp_reg = new RegExp("^popups" + String(i) + String(j) + String(k));
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_popupArr[k].src.desktop = {};
          temp_popupArr[k].src.desktop.word = "/svg/" + z;
          svgTong.async.push(z);
        }}

        temp_reg = new RegExp("^popnumber" + String(i) + String(j) + String(k));
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_popupArr[k].src.desktop.number = "/svg/" + z;
          svgTong.async.push(z);
        }}

        temp_reg = new RegExp("^mopopupstitle" + String(i) + String(j) + String(k));
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_popupArr[k].src.mobile = {};
          temp_popupArr[k].src.mobile.title = "/svg/" + z;
          svgTong.async.push(z);
        }}

        temp_reg = new RegExp("^mopopupscontents" + String(i) + String(j) + String(k));
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          temp_popupArr[k].src.mobile.contents = "/svg/" + z;
          svgTong.async.push(z);
        }}

      }

      //popup images
      temp_popupArr = temp_popupObj.images;
      for (let k of temp_popupArr) {

        k.level0 = {}
        k.level0.src = {}
        k.level2 = {}
        k.level2.src = {}
        temp_reg = new RegExp("^p" + String(popupNum) + "[^0-9]");
        for (let z of source_rawArr) {
          if (temp_reg.test(z) && /svg$/.test(z)) {
            if (/al0_/gi.test(z)) {
              k.level0.src.media1400 = "/svg/" + z;
              svgTong.async.push(z);
            } else if (/al2_/gi.test(z)) {
              k.level2.src.media1400 = "/svg/" + z;
              svgTong.async.push(z);
            } else if (/bl0_/gi.test(z)) {
              k.level0.src.media1050 = "/svg/" + z;
              svgTong.async.push(z);
            } else if (/bl2_/gi.test(z)) {
              k.level2.src.media1050 = "/svg/" + z;
              svgTong.async.push(z);
            } else if (/cl0_/gi.test(z)) {
              k.level0.src.media900 = "/svg/" + z;
              svgTong.async.push(z);
            } else if (/cl2_/gi.test(z)) {
              k.level2.src.media900 = "/svg/" + z;
              svgTong.async.push(z);
            }
          }
        }

        k.level1 = {}
        k.level1.src = {};
        k.level1.src.desktop = '';
        k.level1.src.mobile = '';
        k.level1.map = {}

        for (let z of source_rawArr) {
          if (/png$/.test(z)) {

            if (popupNum % 2) {

              temp_reg1 = new RegExp("^p" + String(popupNum) + "a", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.desktop = '/' + z;
                k.level1.map.media1400 = "0% 0%";
                k.level1.map.media1050 = "100% 0%";
                pngTong.push(z);
              }

              temp_reg1 = new RegExp("^p" + String(popupNum) + "c", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.mobile = '/' + z;
                k.level1.map.media900 = "0% 0%";
                pngTong.push(z);
              }

              temp_reg1 = new RegExp("^p" + String(popupNum - 2) + "c", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.mobile = '/' + z;
                k.level1.map.media900 = "0% 100%";
              }

            } else {

              temp_reg1 = new RegExp("^p" + String(popupNum - 1) + "a", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.desktop = '/' + z;
                k.level1.map.media1400 = "0% 100%";
                k.level1.map.media1050 = "100% 100%";
              }

              temp_reg1 = new RegExp("^p" + String(popupNum - 1) + "c", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.mobile = '/' + z;
                k.level1.map.media900 = "100% 0%";
              }

              temp_reg1 = new RegExp("^p" + String(popupNum - 3) + "c", 'g');
              if (temp_reg1.test(z)) {
                k.level1.src.mobile = '/' + z;
                k.level1.map.media900 = "100% 100%";
              }

            }
          }
        }

        popupNum++;
      }
    }

    //process image
    arr_images = main[i].images
    for (let j of arr_images) { if (j.vector) {
      temp_reg = new RegExp('^' + j.name, 'g');
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        j.src = "/svg/" + z;
        svgTong.sync.push(z);
      }}
    }}
  }

  //sub
  let sub = map.sub;
  for (let i of list) {
    temp_reg = new RegExp('^' + i + "subtitle", 'g');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      sub.title[i].words.src = "/svg/" + z;
      svgTong.sync.push(z);
    }}
    temp_reg = new RegExp('^' + i + "below", 'g');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      sub.below[i].words.src = "/svg/" + z;
      svgTong.sync.push(z);
    }}
  }
  //arrow
  for (let i of sub.etc.arrow) {
    temp_reg = new RegExp('^' + i.name, 'g');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      i.src = "/svg/" + z;
      svgTong.sync.push(z);
    }}
  }

  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
