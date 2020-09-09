module.exports = function(map, source_rawArr) {
  let temp_reg;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];
  const { main, sub } = map;
  const { navigator, footer, interaction, login } = main;
  let zArr;

  //navigator
  const { words: naviWords, icons: naviIcons } = navigator.src;

  temp_reg = new RegExp("^g_logos_navi");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    navigator.src.logo = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_ngray_navi");
  naviWords.desktop = [];
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    naviWords.desktop.push({ gray: z, green: z.replace(/gray/, "green") });
    svgTong.sync.push(z);
    svgTong.sync.push(z.replace(/gray/, "green"));
  }}

  temp_reg = new RegExp("^g_monavi");
  naviWords.mobile = [];
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    naviWords.mobile.push({ group: z });
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_isearch");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    naviIcons.search = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_ihamburger");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    naviIcons.hamburger = z;
    svgTong.sync.push(z);
  }}

  //footer
  const { desktop: footerDesktop, mobile: footerMobile } = footer.src;
  const { A, B, C, D, Z } = footerMobile;

  temp_reg = new RegExp("^g_logos_foot");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footer.src.logo = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_left");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerDesktop.left = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_right");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerDesktop.right = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_up_A_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerMobile.A = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_up_B_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerMobile.B = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_up_C_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerMobile.C = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_up_D_");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerMobile.D = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_footer_down");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    footerMobile.Z = z;
    svgTong.sync.push(z);
  }}

  //loader
  temp_reg = new RegExp("^g_iloader");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.loader = z;
    svgTong.sync.push(z);
  }}

  //talk
  temp_reg = new RegExp("^g_italk");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.talk = z;
    svgTong.sync.push(z);
  }}

  //interaction
  temp_reg = new RegExp("^g_interaction");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    zArr = z.split('_');
    interaction[zArr[2]][zArr[3]][Number(zArr[5])]["src"][zArr[4]] = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^g_actionException");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    zArr = z.split('_');
    interaction[zArr[2]][zArr[3]][Number(zArr[5])]["actionException"][Number(zArr[6])]["src"][zArr[4]] = z;
    svgTong.sync.push(z);
  }}

  //login
  const { flow } = login;
  for (let i = 0; i < flow.length; i++) {

    //login name
    temp_reg = new RegExp("^g_loginName" + String(i));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      flow[i].src.desktop = z;
      flow[i].src.mobile = z;
      svgTong.sync.push(z);
    }}

    //login title - desktop
    temp_reg = new RegExp("^g_loginTitle_desktop" + String(i));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      flow[i].title.src.desktop = z;
      svgTong.sync.push(z);
    }}

    //login title - mobile
    temp_reg = new RegExp("^g_loginTitle_mobile" + String(i));
    for (let z of source_rawArr) { if (temp_reg.test(z)) {
      flow[i].title.src.mobile = z;
      svgTong.sync.push(z);
    }}

    //login children
    for (let j = 0; j < flow[i].children.length; j++) {
      temp_reg = new RegExp("^g_loginFactorTitle" + String(i) + String(j));
      for (let z of source_rawArr) { if (temp_reg.test(z)) {
        flow[i].children[j].src.desktop = z;
        flow[i].children[j].src.mobile = z;
        svgTong.sync.push(z);
      }}
    }

  }

  //icons

  //triangle
  temp_reg = new RegExp("^g_itriangle");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.triangle = z;
    svgTong.sync.push(z);
  }}

  //close
  temp_reg = new RegExp("^g_iclose");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.close = z;
    svgTong.sync.push(z);
  }}

  //greenClose
  temp_reg = new RegExp("^g_igreenClose");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.greenClose = z;
    svgTong.sync.push(z);
  }}

  //arrow
  temp_reg = new RegExp("^g_iarrow");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    sub.arrow = z;
    svgTong.sync.push(z);
  }}


  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
