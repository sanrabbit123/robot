module.exports = function(map, source_rawArr) {
  let temp_reg;
  let svgTong = {};
  svgTong.sync = [];
  svgTong.async = [];
  pngTong = [];

  const { main, sub } = map;
  const { slide, about, banner, portfolio, below } = main;
  const { belowButton, copyRight } = sub;

  //slide
  slide.src.words = {}
  slide.src.words.desktop = {}
  slide.src.words.mobile = {}
  slide.src.words.desktop.main = "";
  slide.src.words.desktop.sub = "";
  slide.src.words.mobile.main = "";
  slide.src.words.mobile.sub = "";
  slide.src.words.mobile.circles = "";

  temp_reg = new RegExp("^slideWords");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    slide.src.words.desktop.main = z;
    slide.src.words.mobile.main = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^slideSub");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    slide.src.words.desktop.sub = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moslideSub");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    slide.src.words.mobile.sub = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moslideCircles");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    slide.src.words.mobile.circles = z;
    svgTong.sync.push(z);
  }}

  //about
  about.src.desktop = {}
  about.src.mobile = {}
  about.src.desktop.left = {}
  about.src.desktop.right = {}
  about.src.mobile.left = {}
  about.src.mobile.right = {}

  about.src.desktop.left.words = "";
  about.src.desktop.left.button = "";
  about.src.desktop.left.image = "main3s1.jpg";
  about.src.desktop.right.words = "";
  about.src.desktop.right.button = "";
  about.src.desktop.right.image = "main3s2.jpg";

  about.src.mobile.left.words = "";
  about.src.mobile.left.images = [];
  about.src.mobile.right.words = "";
  about.src.mobile.right.images = [];

  temp_reg = new RegExp("^aboutleft");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.desktop.left.words = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^aboutbuttonleft");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.desktop.left.button = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^aboutright");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.desktop.right.words = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^aboutbuttonright");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.desktop.right.button = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moaboutleft");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.left.words = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moaboutright");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.right.words = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moabout0_level0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.left.images.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moabout0_level1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.left.images.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^moabout0_level2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.left.images.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moabout1_level0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.right.images.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^moabout1_level1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.right.images.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^moabout1_level2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    about.src.mobile.right.images.push(z);
    svgTong.sync.push(z);
  }}


  //banner
  banner.src.desktop = "";
  banner.src.mobile = "";
  banner.src.button = "";
  banner.src.subbutton = "";
  banner.src.arrow = "";
  banner.src.shadow = [];

  temp_reg = new RegExp("^bannerMain");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.desktop = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannermoMain");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.mobile = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannerButton");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.button = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannerSubButton");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.subbutton = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannerArrow");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.arrow = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannerShadow0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.shadow.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^bannerShadow1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.shadow.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^bannerShadow2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    banner.src.shadow.push(z);
    svgTong.sync.push(z);
  }}


  //portfolio
  portfolio.src.portfolio = "";
  portfolio.src.review = "";
  portfolio.src.tags = "";
  portfolio.src.icons = {};
  portfolio.src.icons.search = "";
  portfolio.src.icons.circles = "";

  temp_reg = new RegExp("^portfolio_p");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    portfolio.src.portfolio = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^portfolio_r");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    portfolio.src.review = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^portfolio_tags");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    portfolio.src.tags = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^portfoliosearch");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    portfolio.src.icons.search = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^portfoliocircles");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    portfolio.src.icons.circles = z;
    svgTong.sync.push(z);
  }}


  //below about
  below.src.words = {}
  below.src.button = "";
  below.src.images = {}
  below.src.words.desktop = "";
  below.src.words.tablet = "";
  below.src.words.mobile = "";
  below.src.images.desktop = [];
  below.src.images.mobile = [];


  temp_reg = new RegExp("^belowAboutWord");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.words.desktop = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^tabelowAboutWord");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.words.tablet = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^mobelowAboutWord");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.words.mobile = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^belowAboutbutton");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.button = z;
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^belowabout_level0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.desktop.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^belowabout_level1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.desktop.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^belowabout_level2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.desktop.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^mobelowabout_level0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.mobile.push(z);
    pngTong.push(z);
  }}

  temp_reg = new RegExp("^mobelowabout_level1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.mobile.push(z);
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^mobelowabout_level2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    below.src.images.mobile.push(z);
    pngTong.push(z);
  }}


  //below

  belowButton.src = [];
  copyRight.src = "";

  temp_reg = new RegExp("^belowButton0");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    belowButton.src.push({ src: z, link: "http://hansungidschool.com/ver02/course/course2.asp" });
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^belowButton1");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    belowButton.src.push({ src: z, link: "https://docs.google.com/forms/d/e/1FAIpQLScGbGl2S1plXOXjX0ocdiOW63xr8v1Sz5r_OZHGy4D3Pv_Xwg/viewform" });
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^belowButton2");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    belowButton.src.push({ src: z, link: "https://docs.google.com/forms/d/e/1FAIpQLSfBSBHN-f6GeEzEY31yc9H4UHPGO4_dUPr3d6VcPQuf7MT6JQ/viewform" });
    svgTong.sync.push(z);
  }}

  temp_reg = new RegExp("^copyRight");
  for (let z of source_rawArr) { if (temp_reg.test(z)) {
    copyRight.src = z;
    svgTong.sync.push(z);
  }}

  return { map: map, svgTong: svgTong, pngTong: pngTong }
}
