GeneralJs.prototype.setGeneralProperties = function (instance) {
  this.totalContents = document.getElementById("totalcontents");

  instance.totalContents = this.totalContents;

  this.mode = <%% "bigDesktop", "smallDesktop", "tablet", "tablet", "mobile" %%>;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.standardWidth = <%% 1400, 1050, 900, 720, 88 %%>;
  this.sero = <%% false, false, false, false, true %%>;
  this.modeMinus = <%% 0, 1, 1, 1, 1 %%>;
  this.naviHeight = <%% 72, 72, 66, 60, 60 %%>;
  this.backHeight = <%% 860, 830, 670, 640, 80 %%>;
  this.margin = 20 - this.modeMinus;

  instance.mode = this.mode;
  instance.ea = this.ea;
  instance.standardWidth = this.standardWidth;
  instance.sero = this.sero;
  instance.modeMinus = this.modeMinus;
  instance.naviHeight = this.naviHeight;
  instance.backHeight = this.backHeight;
  instance.margin = this.margin;

  this.subBoxMargin = {};
  this.subBoxMargin.top = <%% 30, 30, 26, 20, 10.5 %%>;
  this.subBoxMargin.bottom = <%% 31, 31, 27, 26, 31 %%>;
  this.subBoxMargin.left = <%% 30, 30, 30, 24, 4.5 %%>;

  instance.subBoxMargin = {};
  instance.subBoxMargin.top = this.subBoxMargin.top;
  instance.subBoxMargin.bottom = this.subBoxMargin.bottom;
  instance.subBoxMargin.left = this.subBoxMargin.left;

  if (this.modeMinus !== 0) {
    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0s ease}");
  }

  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  instance.media = this.media;

  this.firstPageViewTime = new Date();
  instance.firstPageViewTime = new Date();

  this.totalContents.style.height = "auto";
}

// GeneralJs.prototype.setNavigator = function (subTitle, modeNumber, name) {
//   const instance = this;
//   const { standardWidth, media, totalContents, naviHeight, frontPage } = this;
//   const { createNode, createNodes, colorChip, withOut, blankHref, selfHref, isMac, setQueue } = GeneralJs;
//   const touchStartConst = "mainNavigatorTouchStartConstName";
//   let { ea } = this;
//   let mobile = media[4];
//   let desktop = !mobile;
//   let naviBase;
//   let iconHeight, iconTop;
//   let wordHeight, wordSize, wordTop;
//   let height, width;
//   let mobileMargin;
//   let naviTong;
//   let naviMenu;
//   let wordingTop;
//   let wordingSize;
//   let wordingMarginRight;
//   let wordingMarginRightLast;
//   let searchWidth, searchWidthMinus;
//   let hamburgerTop;
//   let mobileMenuTong;
//   let mobileMenuHeight;
//   let mobileFirstTop, mobileVerticalBetween;
//   let thisIndex;
//   let hamburgerEvent;
//   let mobileHrefEvent;
//   let specialMenu;
//   let magazineSize;

//   iconHeight = <%% 21.5, 21.5, 19, 17, 16 %%>;
//   iconTop = <%% 21.5, 21.5, 19.5, 16, 20 %%>;
//   wordHeight = <%% 20, 20, 20, 20, 20 %%>;
//   wordSize = <%% 15, 15, 15, 14, 13 %%>;
//   wordTop = <%% 24, 24, 21, 19, 18 %%>;
//   mobileMargin = 6.1;
//   wordingTop = <%% (isMac() ? 22 : 22), (isMac() ? 22 : 22), (isMac() ? 21 : 20), (isMac() ? 17 : 16), 10 %%>;
//   wordingSize = <%% 14.5, 14.5, 14, 13, 15 %%>;
//   wordingMarginRight = <%% 36, 36, 34, 24, 3 %%>;
//   wordingMarginRightLast = <%% 9, 9, 4, 0, 1 %%>;
//   hamburgerTop = 21;
//   searchWidth = <%% 64, 64, 62, 60, 20 %%>;
//   searchWidthMinus = <%% 63, 63, 61, 58.5, 2 %%>;
//   mobileMenuHeight = 243;
//   mobileFirstTop = 11;
//   mobileVerticalBetween = 37;
//   magazineSize = <%% 14, 14, 14, 13, 3 %%>;

//   thisIndex = 99;
//   naviMenu = [
//     {
//       title: "서비스 소개",
//       href: FRONTHOST + "/about.php",
//       green: [ "frontAbout" ],
//       focus: false,
//     },
//     {
//       title: "포트폴리오",
//       href: FRONTHOST + "/portfolio.php",
//       green: [ "portfolioList", "portfolioDetail" ],
//       focus: false,
//     },
//     {
//       title: "디자이너",
//       href: FRONTHOST + "/designer.php",
//       green: [ "designerList", "designerDetail" ],
//       focus: false,
//     },
//     {
//       title: "고객 후기",
//       href: FRONTHOST + "/review.php",
//       green: [ "reviewList", "reviewDetail" ],
//       focus: false,
//     },
//     {
//       title: "상담 신청",
//       href: FRONTHOST + "/consulting.php",
//       green: [ "clientConsulting" ],
//       focus: true,
//       last: true,
//     },
//   ];

//   specialMenu = {
//     title: "매거진",
//     href: FRONTHOST + "/magazine.php",
//     green: [ "magazineList", "magazineDetail" ],
//     focus: false,
//   };

//   if (mobile) {
//     naviMenu.splice(naviMenu.length - 1, 0, specialMenu);
//   }

//   for (let i = 0; i < naviMenu.length; i++) {
//     if (naviMenu[i].green.includes(name)) {
//       thisIndex = i;
//       break;
//     }
//   }

//   if (desktop) {
//     wordTop = wordTop + (GeneralJs.isMac() ? 0 : 1);
//   }

//   naviBase = createNode({
//     mother: totalContents,
//     class: [ "backblurdefault_lite" ],
//     style: {
//       position: "fixed",
//       background: modeNumber !== 1 ? colorChip.gradientGray : colorChip.white,
//       height: String(naviHeight) + "px",
//       width: String(100) + '%',
//       top: String(0),
//       left: String(0),
//       zIndex: String(100),
//     }
//   });

//   createNode({
//     mother: naviBase,
//     mode: "svg",
//     source: this.returnLogo(modeNumber !== 1 ? colorChip.white : colorChip.green, 0),
//     class: [ desktop ? "hoverDefault" : "hoverDefault_mobile" ],
//     event: {
//       click: (e) => {
//         selfHref(frontPage);
//       },
//       touchstart: (e) => {
//         selfHref(frontPage);
//       },
//       contextmenu: (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         selfHref(FRONTHOST + "/designer/login.php");
//       }
//     },
//     style: {
//       position: "absolute",
//       top: String(iconTop) + "px",
//       left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
//       height: String(iconHeight) + "px",
//       zIndex: String(1),
//       cursor: "pointer",
//     }
//   });

//   if (modeNumber === 0) {
//     createNode({
//       mother: naviBase,
//       text: subTitle,
//       style: {
//         position: "absolute",
//         top: String(wordTop) + "px",
//         right: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
//         height: String(wordHeight) + "px",
//         width: String(200) + "px",
//         fontSize: String(wordSize) + "px",
//         fontWeight: String(300),
//         textAlign: "right",
//         wordSpacing: String(-1) + "px",
//         color: colorChip.white,
//       }
//     });
//   } else {

//     if (desktop) {

//       naviTong = createNode({
//         mother: naviBase,
//         style: {
//           display: "block",
//           position: "relative",
//           width: String(100) + '%',
//           top: String(wordingTop) + ea,
//           left: String(0) + ea,
//           textAlign: "center",
//         }
//       });
//       for (let i = 0; i < naviMenu.length; i++) {
//         createNode({
//           mother: naviTong,
//           attribute: {
//             index: String(i),
//             mode: String(modeNumber),
//           },
//           event: {
//             mouseenter: function (e) {
//               const index = Number(this.getAttribute("index"));
//               const modeNumber = Number(this.getAttribute("mode"));
//               if (index !== thisIndex) {
//                 this.style.color = colorChip.green;
//               }
//             },
//             mouseleave: function (e) {
//               const index = Number(this.getAttribute("index"));
//               const modeNumber = Number(this.getAttribute("mode"));
//               if (index !== thisIndex) {
//                 this.style.color = (modeNumber === 1 ? colorChip.black : colorChip.white);
//               }
//             },
//             click: function (e) {
//               const index = Number(this.getAttribute("index"));
//               const modeNumber = Number(this.getAttribute("mode"));
//               selfHref(naviMenu[i].href);
//             }
//           },
//           text: naviMenu[i].title,
//           style: {
//             display: "inline-block",
//             position: "relative",
//             top: String(isMac() ? 0 : 2) + ea,
//             fontSize: String(wordingSize) + ea,
//             fontWeight: String(600),
//             color: i === thisIndex ? colorChip.green : (modeNumber === 1 ? colorChip.black : colorChip.white),
//             marginRight: String(i === naviMenu.length - 1 ? wordingMarginRightLast : wordingMarginRight) + ea,
//             cursor: "pointer",
//             transition: "all 0.5s ease",
//           }
//         });
//       }

//       createNode({
//         mother: naviBase,
//         text: "Magazine",
//         class: [ "hoverDefault" ],
//         event: {
//           click: (e) => {
//             selfHref(frontPage + "/magazine.php");
//           }
//         },
//         style: {
//           position: "absolute",
//           fontSize: String(magazineSize) + ea,
//           fontWeight: String(400),
//           fontFamily: "graphik",
//           fontStyle: "italic",
//           color: modeNumber === 2 ? colorChip.white : colorChip.black,
//           top: String(iconTop) + ea,
//           left: desktop ? "calc(50% + " + String((standardWidth / 2) - searchWidthMinus) + ea + ")" : String(mobileMargin) + ea,
//           width: String(searchWidth) + ea,
//           zIndex: String(1),
//         }
//       });
//     } else {

//       mobileMenuTong = createNode({
//         mother: naviBase,
//         attribute: {
//           toggle: "off",
//         },
//         style: {
//           position: "relative",
//           top: String(100) + '%',
//           display: "block",
//           height: String(0) + "px",
//           overflow: "hidden",
//           transition: "all 0.5s ease",
//         },
//         children: [
//           {
//             style: {
//               position: "absolute",
//               bottom: String(0),
//               left: String(0),
//               width: String(100) + '%',
//               height: String(mobileMenuHeight) + "px",
//               background: modeNumber !== 1 ? colorChip.gradientGray : colorChip.white,
//             },
//             children: [
//               {
//                 style: {
//                   position: "relative",
//                   width: String(100) + '%',
//                   height: String(100) + '%',
//                 }
//               }
//             ]
//           }
//         ]
//       });
//       mobileHrefEvent = function (e) {
//         const index = Number(this.getAttribute("index"));
//         selfHref(naviMenu[index].href);
//       }
//       for (let i = 0; i < naviMenu.length; i++) {
//         createNode({
//           mother: mobileMenuTong.firstChild.firstChild,
//           attribute: {
//             index: String(i)
//           },
//           event: {
//             click: mobileHrefEvent,
//             selectstart: function (e) {
//               e.preventDefault();
//             },
//             touchstart: function (e) {
//               const self = this;
//               self.setAttribute(touchStartConst, "on");
//               setQueue(() => {
//                 self.setAttribute(touchStartConst, "off");
//               });
//             },
//             touchend: function (e) {
//               if (this.getAttribute(touchStartConst) === "on") {
//                 mobileHrefEvent.call(this, e);
//               }
//             }
//           },
//           text: naviMenu[i].title,
//           style: {
//             display: "block",
//             position: "absolute",
//             fontSize: String(wordingSize) + "px",
//             fontWeight: String(600),
//             color: (i === thisIndex || naviMenu[i].focus) ? colorChip.green : (modeNumber === 1 ? colorChip.black : colorChip.white),
//             width: String(100) + '%',
//             textAlign: "center",
//             top: String(mobileFirstTop + (mobileVerticalBetween * i)) + "px",
//           }
//         });
//       }

//       hamburgerEvent = function (e) {
//         const toggle = mobileMenuTong.getAttribute("toggle");
//         if (toggle === "off") {
//           mobileMenuTong.style.height = String(mobileMenuHeight) + "px";
//           mobileMenuTong.setAttribute("toggle", "on");
//         } else {
//           mobileMenuTong.style.height = String(0) + "px";
//           mobileMenuTong.setAttribute("toggle", "off");
//         }
//       }

//       createNode({
//         mother: naviBase,
//         mode: "svg",
//         source: this.returnHamburger(modeNumber === 1 ? colorChip.black : colorChip.white),
//         event: {
//           click: function (e) {
//             hamburgerEvent.call(this, e)
//           },
//           touchstart: function (e) {
//             const self = this;
//             self.setAttribute(touchStartConst, "on");
//             setQueue(() => {
//               self.setAttribute(touchStartConst, "off");
//             });
//           },
//           touchend: function (e) {
//             if (this.getAttribute(touchStartConst) === "on") {
//               hamburgerEvent.call(this, e);
//             }
//           }
//         },
//         style: {
//           position: "absolute",
//           top: String(hamburgerTop) + "px",
//           right: String(mobileMargin) + ea,
//           width: String(searchWidth) + "px",
//           zIndex: String(1),
//         }
//       });

//     }

//   }

// }

GeneralJs.prototype.setBaseTong = function (child) {
  const instance = this;
  const { ea, media, totalContents, standardWidth, naviHeight } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseTong;
  let style;
  let baseTop;

  baseTop = <%% 200, 200, 170, 140, 10 %%>;
  baseTong = createNode({
    mother: totalContents,
    style: {
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      paddingTop: desktop ? String(baseTop) + ea : "calc(" + String(naviHeight) + "px" + " + " + String(baseTop) + ea + ")",
      animation: mobile ? "" : "fadeupdelay 0.5s ease forwards",
    }
  });

  this.baseTop = baseTop;
  this.baseTong = baseTong;
  child.baseTop = this.baseTop;
  child.baseTong = this.baseTong;
}

GeneralJs.prototype.setGeneralBase = function (instance) {
  this.setBaseTong(instance);
}