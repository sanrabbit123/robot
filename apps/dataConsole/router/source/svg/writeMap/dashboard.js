module.exports = function(map, source_rawArr) {
  let temp_reg, temp_num;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  const { main: { titles, subTitles }, sub: { on } } = map;

  titles.src = [];
  for (let i of titles.items) {
    temp_reg = new RegExp("^title" + i + '_');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      titles.src.push(z);
      svgTong.sync.push(z);
    }}
  }

  titles.lightSrc = [];
  for (let i of titles.items) {
    temp_reg = new RegExp("^lightTitle" + i + '_');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      titles.lightSrc.push(z);
      svgTong.sync.push(z);
    }}
  }

  for (let i of titles.items) {
    if (i !== "OnCategory" && i !== "OnManager") {
      num = 0;
      subTitles[i.toLowerCase()].src = [];
      for (let j of subTitles[i.toLowerCase()].items) {
        temp_reg = new RegExp("^subTitle" + i + String(num) + '_');
        for (let z of source_rawArr) { if (temp_reg.test(z)) {
          subTitles[i.toLowerCase()].src.push(z);
          svgTong.sync.push(z);
        }}
        num++;
      }
    }
  }

  on.src = [];
  for (let i of on.words) {
    temp_reg = new RegExp("^on" + i + '_');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      on.src.push(z);
      svgTong.sync.push(z);
    }}
  }

  map.sub.numbers = new Array(10);
  for (let i = 0; i < 10; i++) {
    temp_reg = new RegExp("^number" + String(i) + '_');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      map.sub.numbers[i] = z;
      svgTong.sync.push(z);
    }}
  }

  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
