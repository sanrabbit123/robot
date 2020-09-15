module.exports = function(map, source_rawArr) {
  let temp_reg, temp_num;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  const { main, sub } = map;
  const { search: { option }, listTitle } = main;

  let tong = [];

  //search - title
  for (let i = 0; i < option.length; i++) {
    temp_reg = new RegExp("^searchTitle_desktop_" + String(i) + String(0));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      option[i].src.desktop = z;
      option[i].src.mobile = z;
      svgTong.sync.push(z);
    }}
  }

  //search - factor
  for (let i = 0; i < option.length; i++) {
    temp_num = 0;
    for (let { src: { desktop, mobile } } of option[i].children) {
      //on
      temp_reg = new RegExp("^searchFactor_desktop_on_" + String(i) + String(temp_num));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        desktop.on = z;
        mobile.on = z;
        svgTong.sync.push(z);
      }}
      //off
      temp_reg = new RegExp("^searchFactor_desktop_off_" + String(i) + String(temp_num));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        desktop.off = z;
        mobile.off = z;
        svgTong.sync.push(z);
      }}
      temp_num++;
    }
  }

  //listTitle
  const { wording, icons, details } = listTitle;

  //listTitle - wording
  temp_reg = new RegExp("^listTitleTitle");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    wording.src.desktop = z;
    wording.src.mobile = z;
    svgTong.sync.push(z);
  }}

  //listTitle - icons
  temp_num = 0;
  for (let { name, src, wording } of icons) {

    temp_reg = new RegExp("^listTitleIcon_Icon_" + name);
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      src.desktop = z;
      src.mobile = z;
      svgTong.sync.push(z);
    }}

    temp_reg = new RegExp("^listTitleIcon_desktop_" + String(1) + String(temp_num));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      wording.src.desktop = z;
      wording.src.mobile = z;
      svgTong.sync.push(z);
    }}

    temp_num++;
  }

  //listTitle - details
  temp_num = 0;
  for (let { src, children } of details) {

    temp_reg = new RegExp("^listTitleDetailTitle_desktop_" + String(2) + String(temp_num) + String(9));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      src.desktop = z;
      src.mobile = z;
      svgTong.sync.push(z);
    }}

    for (let i = 0; i < children.length; i++) {
      temp_reg = new RegExp("^listTitleDetailChildren_off_desktop_" + String(2) + String(temp_num) + String(i));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        children[i].src.desktop.off = z;
        svgTong.sync.push(z);
      }}
      temp_reg = new RegExp("^listTitleDetailChildren_on_desktop_" + String(2) + String(temp_num) + String(i));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        children[i].src.desktop.on = z;
        svgTong.sync.push(z);
      }}
      temp_reg = new RegExp("^listTitleDetailChildren_off_mobile_" + String(2) + String(temp_num) + String(i));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        children[i].src.mobile.off = z;
        svgTong.sync.push(z);
      }}
      temp_reg = new RegExp("^listTitleDetailChildren_on_mobile_" + String(2) + String(temp_num) + String(i));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        children[i].src.mobile.on = z;
        svgTong.sync.push(z);
      }}
    }

    temp_num++;
  }


  //title
  const { title, below, etc: { arrow: [ arrow0, arrow1 ] } } = sub;

  temp_reg = new RegExp("^desktopsubtitle_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    title.desktop.words.src = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^mobilesubtitle_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    title.mobile.words.src = z;
    svgTong.sync.push(z);
  }}


  //below
  temp_reg = new RegExp("^desktopbelow_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.desktop.words.src = z;
    svgTong.sync.push(z);
  }}


  //etc
  temp_reg = new RegExp("^arrow0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    arrow0.src = z;
    svgTong.sync.push(z);
  }}
  temp_reg = new RegExp("^arrow1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    arrow1.src = z;
    svgTong.sync.push(z);
  }}


  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
