module.exports = function(map, source_rawArr) {
  let temp_reg, temp_num;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  const { main: { titles, subTitles } } = map;

  titles.src = [];
  for (let i of titles.items) {
    temp_reg = new RegExp("^title" + i + '_');
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      titles.src.push(z);
      svgTong.sync.push(z);
    }}
  }


  for (let i of titles.items) {
    if (i !== "Calendar" && i !== "Navigation") {
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

  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
