module.exports = function(map, source_rawArr) {
  let temp_reg, temp_num;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  const { main: { rooms, review }, sub: { below } } = map;

  //rooms
  for (let i = 0; i < rooms.length; i++) {
    temp_reg = new RegExp("^room_" + rooms[i].value);
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      rooms[i].src = z;
      svgTong.sync.push(z);
    }}
  }

  //review
  temp_reg = new RegExp("^reviewMark");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    review.src = z;
    svgTong.sync.push(z);
  }}

  //below
  temp_reg = new RegExp("^desktopbelow_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.desktop.words.src = z;
    svgTong.sync.push(z);
  }}

  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
