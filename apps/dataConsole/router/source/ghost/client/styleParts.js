/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈리에종 스타일 파츠 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 스타일 파츠 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleParts",
  "hangul": "스타일 파츠",
  "route": [
    "styleParts"
  ]
} %/%/g

const StylePartsJs = function () {
  this.mother = new GeneralJs();
}

StylePartsJs.binaryPath = "/middle/parts";

StylePartsJs.prototype.returnSvgBox = function () {
  const instance = this;
  let box;
  box = {
    init: {
      title: (color) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 249.5701 114.6015" xml:space="preserve"><path fill="${color}" d="M5.1426,38.1539C3.2078,37.0818,1.4938,35.7603,0,34.1889l0.6896-1.2064c2.0686,2.337,4.6918,4.1082,7.8721,5.3149 c3.1793,1.2068,6.7604,1.81,10.745,1.81c3.3706,0,6.2919-0.4022,8.7627-1.2068c2.4708-0.8043,4.376-1.9536,5.7175-3.4474 c1.3405-1.4941,1.9725-3.2368,1.8963-5.2289c0-1.3791-0.3737-2.5372-1.1205-3.4765c-0.7471-0.938-1.7436-1.7139-2.988-2.327 c-1.2453-0.6124-2.6244-1.1107-4.1373-1.4942c-1.5137-0.3822-3.0165-0.6895-4.5106-0.9194c-1.4939-0.2299-2.873-0.4211-4.137-0.5745 c-1.9924-0.2675-4.0225-0.5836-6.0908-0.9482c-2.0687-0.3636-3.965-0.8995-5.6887-1.6089c-1.724-0.7083-3.1129-1.6852-4.166-2.9305 c-1.0541-1.2444-1.5801-2.8818-1.5801-4.9128c0-1.7237,0.4309-3.2751,1.2931-4.6542c0.8618-1.3791,2.0683-2.5375,3.62-3.4764 c1.5514-0.938,3.3615-1.6564,5.4297-2.1547C13.6755,0.2495,15.9164,0,18.33,0c2.4509,0,4.7117,0.2109,6.7804,0.632 c2.0683,0.4221,3.9261,1.0541,5.5735,1.8963c1.6466,0.8429,3.0643,1.896,4.2521,3.1603L34.189,6.7228 c-1.2264-1.2255-2.6343-2.241-4.2233-3.0453c-1.59-0.8046-3.3526-1.4078-5.2866-1.81C22.7446,1.4651,20.6282,1.264,18.33,1.264 c-2.8732,0-5.5075,0.3933-7.9008,1.178C8.0346,3.2277,6.1285,4.3194,4.7117,5.7174c-1.4177,1.3987-2.1262,3.0551-2.1262,4.9704 c0,1.8773,0.5074,3.3901,1.5229,4.5391c1.0145,1.1493,2.3361,2.0399,3.9647,2.6722c1.6279,0.632,3.3901,1.1015,5.2865,1.4075 c1.896,0.3073,3.725,0.5748,5.4872,0.8046c2.0301,0.2684,4.0988,0.5842,6.2059,0.9482c2.1063,0.3642,4.0696,0.8906,5.8898,1.5801 c1.8188,0.6892,3.2842,1.6573,4.3956,2.9017c1.1107,1.2451,1.6664,2.8828,1.6664,4.9128c0,2.1458-0.6895,4.0421-2.0686,5.6887 c-1.3791,1.6475-3.3902,2.9305-6.0333,3.8499c-2.6434,0.9191-5.8423,1.3788-9.5961,1.3788c-2.7968,0-5.3725-0.2684-7.7282-0.8043 C9.2224,40.0312,7.0766,39.2266,5.1426,38.1539z M58.3344,41.3715h1.3184V1.3187h16.9614V0H41.3729v1.3187h16.9614V41.3715z  M203.1044,40.0714h-30.2496V20.6265h27.1763v-1.3001h-27.1763V1.3004h30.6041V0h-31.9044v41.3715h31.5499V40.0714z  M164.3599,40.0714h-29.4084V0h-1.3003v41.3715h30.7087V40.0714z M102.1375,41.3715h1.3002V25.6243L123.5914,0h-1.6547 l-19.1808,24.5025L83.1658,0h-1.6549l20.6266,25.7112V41.3715z M222.9201,91.2169c-1.2992-0.196-2.5688-0.4134-3.8088-0.6493 s-2.5096-0.4725-3.8088-0.7084c-1.3391-0.2366-2.6479-0.4622-3.9271-0.6795c-1.2799-0.2159-2.5496-0.4429-3.8088-0.6788 c-5.1968-0.945-7.7944-2.8934-7.7944-5.846c0-2.0468,1.2985-3.6616,3.8969-4.8425h-0.0591c2.2442-0.945,4.8425-1.4175,7.7951-1.4175 c2.9127,0,5.4719,0.4931,7.6768,1.4766c2.6369,1.1025,3.9567,2.9141,3.9567,5.4327h7.7353c0-4.3701-2.1651-7.7745-6.4952-10.2161 c-3.7408-2.086-8.031-3.1293-12.8736-3.1293c-2.48,0-4.7737,0.2655-6.8797,0.7971c-2.1066,0.5309-4.1039,1.3088-5.9938,2.3322 c-4.3309,2.4415-6.4952,5.6307-6.4952,9.5668c0,5.3542,3.0502,8.976,9.1528,10.8653c1.2992,0.2366,2.5585,0.4636,3.7792,0.6788 c1.2201,0.2173,2.5001,0.4236,3.8384,0.6204h-0.0591c1.2991,0.2359,2.588,0.4629,3.868,0.6788 c1.2792,0.2173,2.588,0.4236,3.9271,0.6204h-0.0591c5.1967,0.945,7.7951,2.8343,7.7951,5.6693c0,2.2435-1.4574,3.9368-4.3701,5.0784 c-2.4017,0.9058-5.236,1.3577-8.5035,1.3577c-1.6534,0-3.1795-0.1176-4.5764-0.3542c-1.3983-0.2359-2.707-0.5702-3.9271-1.0035 c-2.9141-1.1018-4.3701-2.9918-4.3701-5.6693h-7.7353c0,4.4877,2.3618,7.9333,7.0861,10.3344 c3.8577,2.0461,8.3652,3.0702,13.5228,3.0702c4.9994,0,9.5077-1.0035,13.5228-3.0117c4.7242-2.4402,7.0861-5.7078,7.0861-9.802 C232.0137,96.6309,228.9821,93.1068,222.9201,91.2169z M241.8932,105.9212v7.6768h7.6768v-7.6768H241.8932z M141.9008,77.399 h16.1212v36.199h7.6768V77.399H181.82v-6.3776h-39.9192V77.399z M125.4853,98.1261l12.0461,15.4719h-9.2119l-11.4561-14.7628 c-1.6534-2.2442-4.5275-3.3666-8.6218-3.3666h-6.6727v18.1295h-7.6768V71.0214h21.7904c4.2518,0,7.9911,1.1025,11.2195,3.3068 c3.3858,2.4415,5.0784,5.4134,5.0784,8.9168c0,2.7566-1.1218,5.2559-3.3659,7.5001c-1.8508,1.7324-4.0358,3.0117-6.5544,3.8384 C123.0836,95.3709,124.2246,96.5518,125.4853,98.1261z M121.5877,87.4967c1.7717-1.1018,2.6575-2.5186,2.6575-4.2518 c0-1.6919-0.8859-3.1094-2.6575-4.2517c-1.6534-1.0626-3.6224-1.5942-5.9052-1.5942H101.569v11.6927h14.1136 C117.9653,89.0917,119.9343,88.56,121.5877,87.4967z M58.9036,70.9921l-18.6013,42.576h8.0901l3.9333-8.8785l10.3571-23.7772 l10.166,23.3461l4.0659,9.3096h8.2085l-18.6019-42.576H58.9036z M38.0884,83.2449c0,3.5434-1.6534,6.496-4.9601,8.8577 c-3.3068,2.2442-7.0861,3.3659-11.3378,3.3659H7.6768v18.1295H0V71.0214h21.7904c4.2518,0,7.9911,1.1025,11.2195,3.3068 C36.3958,76.7697,38.0884,79.7415,38.0884,83.2449z M30.3531,83.2449c0-1.6919-0.8859-3.1094-2.6575-4.2517 c-1.6534-1.0626-3.6224-1.5942-5.9052-1.5942H7.6768v11.6927h14.1136c2.2827,0,4.2518-0.5317,5.9052-1.595 C29.4672,86.3949,30.3531,84.9781,30.3531,83.2449z"/></svg>`;
      },
    },
  };

  return box;
}

StylePartsJs.prototype.slimNavigator = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let target;
  let iconHeight;
  let iconTop;
  let mobileMargin;

  iconHeight = <%% 15, 15, 15, 15, 16 %%>;
  iconTop = <%% 16, 16, 16, 16, 20 %%>;
  mobileMargin = 6.1;

  this.naviHeight = <%% 52, 52, 46, 40, 40 %%>;
  this.mother.naviHeight = this.naviHeight;

  totalContents.firstChild.remove();
  totalContents.firstChild.remove();
  totalContents.firstChild.remove();

  target = totalContents.firstChild;

  cleanChildren(target);
  target.style.height = String(this.naviHeight) + ea;

  createNode({
    mother: target,
    mode: "svg",
    source: this.mother.returnLogo(colorChip.white, 0),
    class: [ desktop ? "hoverDefault" : "hoverDefault_mobile" ],
    event: {
      click: (e) => {
        selfHref(FRONTHOST);
      },
      touchstart: (e) => {
        selfHref(FRONTHOST);
      },
    },
    style: {
      position: "absolute",
      top: String(iconTop) + "px",
      left: desktop ? "calc(50% - " + String(standardWidth / 2) + ea + ")" : String(mobileMargin) + ea,
      height: String(iconHeight) + "px",
      zIndex: String(1),
      cursor: "pointer",
    }
  });

}

StylePartsJs.prototype.insertInitBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseMother;
  let svgBox;
  let contents;
  let initSize, initWeight;
  let initBoldWeight, initLineHeight;
  let initSecondMarginTop;
  let leftMother, rightMother;
  let leftMotherWidth;
  let initPaddingTop;
  let titleLogWidth;
  let titleLogTop;
  let baseMotherMarginBottom;

  initSize = <%% 15, 15, 15, 14, 3 %%>;
  initWeight = <%% 400, 400, 400, 400, 400 %%>;
  initBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  initLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  initSecondMarginTop = <%% 12, 12, 12, 12, 12 %%>;

  initPaddingTop = <%% 180, 180, 180, 180, 36 %%>;

  leftMotherWidth = <%% 600, 600, 600, 560, 56 %%>;

  titleLogWidth = <%% 250, 250, 250, 230, 40 %%>;
  titleLogTop = <%% 96, 96, 96, 90, 9 %%>;

  baseMotherMarginBottom = <%% 168, 168, 168, 168, 17 %%>;

  svgBox = this.returnSvgBox();
  contents = {
    year: (new Date()).getFullYear(),
    init: [
      [
        "최소한의 시공으로 내 집과 나에게 적합한 컨디션의 스타일링.",
        "<b%시공 비용은 줄이고, 집 전체 스타일링 결과물에 대한 만족도는 올리고,%b>",
      ],
      [
        "홈리에종은 시공부터 시작하여 가구, 패브릭, 소품까지 전문적인",
        "<b%스타일링을 완성하는 고객 맞춤형 인테리어를 지향%b>합니다.",
      ]
    ],
    context: [
      {
        title: "HomeLiaison",
        hangul: "홈리에종 소개",
      },
      {
        title: "About",
        hangul: "서비스 소개",
      },
      {
        title: "Style parts",
        hangul: "스타일 파츠",
      },
      {
        title: "Benefits",
        hangul: "서비스 혜택"
      },
      {
        title: "Process",
        hangul: "서비스 과정",
      }
    ]
  };

  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      marginBottom: String(baseMotherMarginBottom) + ea,
    }
  });


  leftMother = createNode({
    mother: baseMother,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftMotherWidth) + ea,
    }
  })

  createNode({
    mother: leftMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
    },
    children: [
      {
        mode: "svg",
        source: svgBox.init.title(colorChip.realBlack),
        style: {
          display: "block",
          position: "relative",
          width: String(titleLogWidth) + ea,
          top: String(titleLogTop) + ea,
        }
      }
    ]
  });


  createNode({
    mother: leftMother,
    mode: "img",
    attribute: {
      src: StylePartsJs.binaryPath + "/initparts.png",
    },
    style: {
      marginTop: String(initPaddingTop) + ea,
      width: String(100) + ea,
    }
  })

  createNode({
    mother: leftMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      paddingTop: String(21) + ea,
    },
    children: [
      {
        text: contents.init[0].join("\n"),
        style: {
          fontSize: String(initSize) + ea,
          fontWeight: String(initWeight),
          color: colorChip.black,
          lineHeight: String(initLineHeight),
        },
        bold: {
          fontWeight: String(initBoldWeight),
          color: colorChip.black,
        }
      },
      {
        text: contents.init[1].join("\n"),
        style: {
          marginTop: String(initSecondMarginTop) + ea,
          fontSize: String(initSize) + ea,
          fontWeight: String(initWeight),
          color: colorChip.black,
          lineHeight: String(initLineHeight),
        },
        bold: {
          fontWeight: String(initBoldWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  createNode({
    mother: leftMother,
    style: {
      display: "inline-flex",
      position: "relative",
      borderBottom: "1px solid " + colorChip.gray3,
      width: String(400) + ea,
      height: String(40) + ea,
    }
  });

  rightMother = createNode({
    mother: baseMother,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: withOut(leftMotherWidth, ea),
    }
  })

  createNode({
    mother: rightMother,
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: withOut(0, ea),
      backgroundImage: "url('" + StylePartsJs.binaryPath + "/a1.jpg" + "')",
      backgroundPosition: "50% 50%",
      backgroundSize: "100% auto",
      borderRadius: String(5) + "px",
      boxShadow: "3px 3px 15px -9px " + colorChip.shadow,
    }
  });

  // createNode({
  //   mother: rightMother,
  //   style: {
  //     position: "absolute",
  //     height: withOut(0, ea),
  //     width: String((window.innerWidth - standardWidth) / 2) + ea,
  //     top: String(0),
  //     right: String(((window.innerWidth - standardWidth) / 2) * -1) + ea,
  //     background: "#cfb9ad",
  //   }
  // });

}

StylePartsJs.prototype.insertHeadlineBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseMother;
  let rightMother, leftMother;
  let leftMotherWidth;
  let paddingTop;
  let paddingLeft;
  let wordingSize, wordingWeight;
  let contents;
  let aboutSize, aboutWeight;
  let titleSize, titleWeight;
  let wordingBoldWeight;

  leftMotherWidth = <%% 500, 500, 500, 500, 56 %%>;
  paddingTop = <%% 72, 72, 72, 72, 7 %%>;
  paddingLeft = <%% 72, 72, 72, 72, 7 %%>;

  aboutSize = <%% 13, 13, 12, 11, 3 %%>;
  aboutWeight = <%% 500, 500, 500, 500, 500 %%>;

  titleSize = <%% 24, 24, 24, 24, 5 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;

  wordingSize = <%% 14, 14, 13, 12, 4 %%>;
  wordingWeight = <%% 400, 400, 400, 400, 400 %%>;
  wordingBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  contents = {
    about: "about\nHomeLiaison",
    title: "홈리에종과\n아파트멘터리가 만났다!",
    description: [
      [
        "아파트멘터리가 홈스타일링 전문",
        "플랫폼, 홈리에종과 만났습니다.",
        "<b%홈리에종의 디자이너, 아파트멘터리 파츠",
        "자재의 만남%b>으로 내 집의 컨디션을",
        "잘 아는 디자이너와 맞춤 홈스타일링을",
        "진행하실 수 있어요!",
      ],
      [
        "<b%아파트멘터리 파츠의 엄선된 자재로",
        "홈리에종 디자이너와 함께%b> 합리적으로",
        "인테리어를 진행해보세요!",
      ],
    ]
  };


  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
    }
  });

  createNode({
    mother: baseMother,
    style: {
      display: "block",
      position: "absolute",
      left: String(0) + ea,
      width: String(window.innerWidth - ((window.innerWidth - standardWidth) / 2)) + ea,
      height: withOut(0, ea),
      background: colorChip.gray1,
      borderTopLeftRadius: String(8) + "px",
      borderBottomLeftRadius: String(8) + "px",
    }
  });

  leftMother = createNode({
    mother: baseMother,
    style: {
      display: "inline-flex",
      position: "relative",
      flexDirection: "column",
      width: String(leftMotherWidth - paddingLeft) + ea,
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(paddingLeft) + ea,
      paddingBottom: String(paddingTop) + ea,
      height: withOut(paddingTop, ea),
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftMother,
    text: contents.about,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(aboutSize) + ea,
      fontWeight: String(aboutWeight),
      fontFamily: "graphik",
      fontStyle: "italic",
      color: colorChip.black,
    }
  });

  createNode({
    mother: leftMother,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(1.4),
      marginTop: String(60) + ea,
      paddingLeft: String(22) + ea,
      color: colorChip.black,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(8) + ea,
          left: String(0),
          width: String(5) + ea,
          height: withOut(13, ea),
          background: colorChip.black,
          borderRadius: String(5) + "px",
        }
      }
    ]
  })

  createNode({
    mother: leftMother,
    text: contents.description[0].join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingWeight),
      lineHeight: String(1.7),
      color: colorChip.black,
      marginTop: String(52) + ea,
    },
    bold: {
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingBoldWeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: leftMother,
    text: contents.description[1].join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingWeight),
      lineHeight: String(1.7),
      color: colorChip.black,
      marginTop: String(16) + ea,
    },
    bold: {
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingBoldWeight),
      color: colorChip.black,
    }
  });

  rightMother = createNode({
    mother: baseMother,
    style: {
      display: "inline-flex",
      position: "relative",
      width: withOut(leftMotherWidth, ea),
      overflow: "visible",
    }
  });

  createNode({
    mother: rightMother,
    style: {
      display: "block",
      position: "absolute",
      width: withOut(0, ea),
      left: String(0),
      top: String(paddingTop) + ea,
      height: withOut(paddingTop, ea),
      borderTopLeftRadius: String(5) + "px",
      borderTopRightRadius: String(5) + "px",
      backgroundImage: "url('" + StylePartsJs.binaryPath + "/back.jpg" + "')",
      backgroundSize: "100% auto",
      backgroundPosition: "0% 0%",
      boxShadow: "4px 4px 13px -9px " + colorChip.shadow,
    }
  });

  createNode({
    mother: baseMother,
    style: {
      display: "block",
      position: "absolute",
      left: String(0) + ea,
      width: String(window.innerWidth - ((window.innerWidth - standardWidth) / 2)) + ea,
      height: String(30) + ea,
      bottom: String(-30) + ea,
      background: colorChip.white,
    }
  });

}

StylePartsJs.prototype.insertLeadBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseMother;
  let paddingTop;
  let descriptionBox;
  let contents;
  let imageBox;
  let titleSize, titleWeight;
  let titlePaddingBottom;
  let subSize, subWeight;
  let descriptionBoxPaddingTop;
  let descriptionSize, descriptionWeight, descriptionBoldWeight;
  let descriptionLineHeight, descriptionPaddingLeft;
  let descriptionLineBottom;
  let num;
  let diagramTitleSize, diagramTitleWeight;
  let diagramSubSize, diagramSubWeight;
  let diagramDescriptionSize, diagramDescriptionWeight, diagramDescriptionLineHeight;
  let diagramTextBetween;
  let imageMiddleBox;
  let imageWidth, imageMargin;
  let firstPaddingTop;
  let secondLeft;
  let thirdMarginTop;
  let barBox;
  let imageBoxPaddingTop;
  let barTitleSize, barTitleWeight;
  let barHeight;
  let barBetween;
  let barPaddingTop;
  let barFirstWidth, barSecondWidth;
  let barTextSize, barTextWeight;
  let barTextBottom;
  let barNoticeBox;
  let barBoxPaddingTop;
  let barNoticeBoxPaddingTop;
  let barNoticeSize, barNoticeWeight, barNoticeMarginBottom;

  paddingTop = <%% 200, 200, 180, 168, 16 %%>;

  titleSize = <%% 27, 27, 27, 27, 27 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

  subSize = <%% 18, 18, 18, 18, 18 %%>;
  subWeight = <%% 500, 500, 500, 500, 500 %%>;

  descriptionBoxPaddingTop = <%% 28, 28, 28, 28, 3 %%>;
  imageBoxPaddingTop = <%% 28, 28, 28, 28, 3 %%>;
  barBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  descriptionSize = <%% 15, 15, 15, 15, 15 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPaddingLeft = <%% 36, 36, 36, 36, 36 %%>;
  descriptionLineBottom = <%% 27, 27, 27, 27, 27 %%>;

  diagramTitleSize = <%% 30, 30, 28, 28, 28 %%>;
  diagramTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  diagramSubSize = <%% 18, 18, 16, 16, 16 %%>;
  diagramSubWeight = <%% 800, 800, 800, 800, 800 %%>;
  diagramDescriptionSize = <%% 14, 14, 14, 13, 13 %%>;
  diagramDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  diagramDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  diagramTextBetween = <%% 7, 7, 7, 7, 7 %%>;

  imageWidth = <%% 960, 960, 960, 960, 960 %%>;
  imageMargin = <%% 20, 20, 20, 20, 2 %%>;

  firstPaddingTop = <%% 145, 144, 144, 144, 144 %%>;
  secondLeft = <%% -126, -126, -126, -126, -126 %%>;
  thirdMarginTop = <%% 267, 267, 267, 267, 267 %%>;

  barTitleSize = <%% 20, 20, 20, 20, 21 %%>;
  barTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  barPaddingTop = <%% 13, 13, 13, 13, 15 %%>;
  barHeight = <%% 20, 20, 20, 20, 2 %%>;
  barBetween = <%% 6, 6, 6, 6, 6 %%>;

  barFirstWidth = <%% 200, 200, 200, 200, 20 %%>;
  barSecondWidth = <%% 500, 500, 500, 500, 50 %%>;

  barTextSize = <%% 15, 15, 15, 15, 15 %%>;
  barTextWeight = <%% 800, 800, 800, 800, 800 %%>;
  barTextBottom = <%% -28, -28, -27, -27, -27 %%>;

  barNoticeBoxPaddingTop = <%% 40, 40, 36, 36, 36 %%>;
  barNoticeSize = <%% 13, 13, 13, 13, 13 %%>;
  barNoticeWeight = <%% 400, 400, 400, 400, 400 %%>;
  barNoticeMarginBottom = <%% 4, 4, 4, 4, 4 %%>;

  contents = {
    title: "디자이너가 이끄는 인테리어",
    sub: "homeliaison styling",
    description: [
      "홈리에종은 과도한 리모델링을 지양하고 꼭 필요한 시공만을 진행하며,",
      "<b%디자인을 먼저 하는 방식을 통해 인테리어의 효율성을 올리는 방식%b>을 지향합니다.",
    ],
    diagram: [
      {
        title: "Design",
        sub: "디자인 기획",
        description: [
          "디자인을 먼저 진행하여",
          "시공 범위를 조절",
        ],
      },
      {
        title: "Construction",
        sub: "톤보정 시공",
        description: [
          "시공 범위와 자재, 디자인",
          "시공사에 따라 변동",
        ],
      },
      {
        title: "Styling",
        sub: "스타일링",
        description: [
          "스타일링 중심의 인테리어로",
          "효과와 완성도를 높임",
        ],
      },
    ],
    bar: {
      title: "비용의 구성",
      fators:[
        "디자인 비용",
        "시공 비용",
        "제품 비용",
      ],
      notice: [
        "시공 범위에 따라 시공 비용의 비율은 조정될 수 있습니다.",
        "시공비, 구매비와는 별도로 디자인비가 발생합니다.",
      ]
    }
  };

  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(paddingTop) + ea,
    }
  });

  createNode({
    mother: baseMother,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      width: withOut(0, ea),
      textAlign: "center",
      paddingBottom: String(titlePaddingBottom) + ea,
    }
  });

  createNode({
    mother: baseMother,
    text: contents.sub,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(subSize) + ea,
      fontWeight: String(subWeight),
      color: colorChip.deactive,
      fontFamily: "graphik",
      fontStyle: "italic",
      textAlign: "center",
    }
  })

  descriptionBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      paddingTop: String(descriptionBoxPaddingTop) + ea,
      textAlign: "center",
      justifyContent: "center",
    }
  });

  createNode({
    mother: descriptionBox,
    style: {
      position: "absolute",
      height: String(0) + ea,
      width: withOut(0, ea),
      bottom: String(descriptionLineBottom) + ea,
      borderBottom: "1px solid " + colorChip.gray3,
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.description.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      textAlign: "center",
      paddingLeft: String(descriptionPaddingLeft) + ea,
      paddingRight: String(descriptionPaddingLeft) + ea,
      background: colorChip.white,
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    }
  });


  imageBox = createNode({
    mother: baseMother,
    event: {
      selectstart: (e) => { e.preventDefault(); },
    },
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      paddingTop: String(imageBoxPaddingTop) + ea,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    }
  });

  num = 0;
  for (let { title, sub, description } of contents.diagram) {
    if (num === 0) {

      createNode({
        mother: imageBox,
        event: {
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          textAlign: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: String(firstPaddingTop) + ea,
        },
        children: [
          {
            text: title,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramTitleSize) + ea,
              fontWeight: String(diagramTitleWeight),
              fontFamily: "graphik",
              fontStyle: "italic",
              color: "#8f5e53",
            }
          },
          {
            text: sub,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramSubSize) + ea,
              fontWeight: String(diagramSubWeight),
              color: colorChip.black,
              marginTop: String(diagramTextBetween) + ea,
            }
          },
          {
            text: description.join("\n"),
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramDescriptionSize) + ea,
              fontWeight: String(diagramDescriptionWeight),
              color: colorChip.black,
              lineHeight: String(diagramDescriptionLineHeight),
              marginTop: String(diagramTextBetween) + ea,
            }
          },
        ]
      });

      createNode({
        mother: imageBox,
        mode: "img",
        attribute: {
          src: StylePartsJs.binaryPath + "/lead0.png",
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(imageWidth) + ea,
          marginLeft: String(imageMargin) + ea,
          marginRight: String(imageMargin) + ea,
        }
      });

    } else if (num === 1) {

      imageMiddleBox = createNode({
        mother: imageBox,
        event: {
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          textAlign: "left",
          justifyContent: "left",
          flexDirection: "column",
        },
      })

      createNode({
        mother: imageMiddleBox,
        event: {
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          textAlign: "left",
          justifyContent: "left",
          flexDirection: "column",
          left: String(secondLeft) + ea,
        },
        children: [
          {
            text: title,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramTitleSize) + ea,
              fontWeight: String(diagramTitleWeight),
              fontFamily: "graphik",
              fontStyle: "italic",
              color: "#cfb9ad",
            }
          },
          {
            text: sub,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramSubSize) + ea,
              fontWeight: String(diagramSubWeight),
              color: colorChip.black,
              marginTop: String(diagramTextBetween) + ea,
            }
          },
          {
            text: description.join("\n"),
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramDescriptionSize) + ea,
              fontWeight: String(diagramDescriptionWeight),
              color: colorChip.black,
              lineHeight: String(diagramDescriptionLineHeight),
              marginTop: String(diagramTextBetween) + ea,
            }
          },
        ]
      });

    } else if (num === 2) {

      createNode({
        mother: imageMiddleBox,
        event: {
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          textAlign: "left",
          justifyContent: "left",
          flexDirection: "column",
          marginTop: String(thirdMarginTop) + ea,
        },
        children: [
          {
            text: title,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramTitleSize) + ea,
              fontWeight: String(diagramTitleWeight),
              fontFamily: "graphik",
              fontStyle: "italic",
              color: "#cfb9ad",
            }
          },
          {
            text: sub,
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramSubSize) + ea,
              fontWeight: String(diagramSubWeight),
              color: colorChip.black,
              marginTop: String(diagramTextBetween) + ea,
            }
          },
          {
            text: description.join("\n"),
            event: {
              selectstart: (e) => { e.preventDefault(); },
            },
            style: {
              display: "block",
              fontSize: String(diagramDescriptionSize) + ea,
              fontWeight: String(diagramDescriptionWeight),
              color: colorChip.black,
              lineHeight: String(diagramDescriptionLineHeight),
              marginTop: String(diagramTextBetween) + ea,
            }
          },
        ]
      });

    }
    num++;
  }


  barBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      paddingTop: String(barBoxPaddingTop) + ea,
      textAlign: "left",
      justifyContent: "left",
      flexDirection: "column",
    }
  });

  createNode({
    mother: barBox,
    text: contents.bar.title,
    style: {
      fontSize: String(barTitleSize) + ea,
      fontWeight: String(barTitleWeight),
      color: colorChip.black,
    }
  })

  createNode({
    mother: barBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      flexDirection: "row",
      height: String(barHeight) + ea,
      paddingTop: String(barPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(barFirstWidth) + ea,
          height: withOut(0),
          borderRadius: String(5) + "px",
          background: "#8f5e53",
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            text: contents.bar.fators[0],
            style: {
              position: "absolute",
              width: withOut(0, ea),
              textAlign: "center",
              fontSize: String(barTextSize) + ea,
              fontWeight: String(barTextWeight),
              color: "#8f5e53",
              bottom: String(barTextBottom) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(barSecondWidth) + ea,
          height: withOut(0),
          borderRadius: String(5) + "px",
          background: colorChip.gray5,
          marginRight: String(barBetween) + ea,
        },
        children: [
          {
            text: contents.bar.fators[1],
            style: {
              position: "absolute",
              width: withOut(0, ea),
              textAlign: "center",
              fontSize: String(barTextSize) + ea,
              fontWeight: String(barTextWeight),
              color: colorChip.black,
              bottom: String(barTextBottom) + ea,
            }
          }
        ]
      },
      {
        style: {
          display: "inline-flex",
          position: "relative",
          width: withOut(barFirstWidth + barSecondWidth + (barBetween * 2), ea),
          height: withOut(0),
          borderRadius: String(5) + "px",
          background: colorChip.gray3,
        },
        children: [
          {
            text: contents.bar.fators[2],
            style: {
              position: "absolute",
              width: withOut(0, ea),
              textAlign: "center",
              fontSize: String(barTextSize) + ea,
              fontWeight: String(barTextWeight),
              color: colorChip.black,
              bottom: String(barTextBottom) + ea,
            }
          }
        ]
      },
    ]
  })

  barNoticeBox = createNode({
    mother: barBox,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      flexDirection: "column",
      paddingTop: String(barNoticeBoxPaddingTop) + ea,
      justifyContent: "end",
      alignItems: "end",
    }
  });

  for (let notice of contents.bar.notice) {
    createNode({
      mother: barNoticeBox,
      text: "* " + notice,
      style: {
        fontSize: String(barNoticeSize) + ea,
        fontWeight: String(barNoticeWeight),
        marginBottom: String(barNoticeMarginBottom) + ea,
        color: colorChip.black,
      }
    })
  }

}

StylePartsJs.prototype.insertMatchupBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let paddingTop;
  let baseMother;
  let contents;
  let titleSize;
  let titleWeight;
  let titlePaddingBottom;
  let subSize;
  let subWeight;
  let firstWhiteBox;
  let secondWhiteBox;
  let firstDescriptionBox;
  let seondDescriptionBox;
  let whiteInnerPaddingTop;
  let whiteInnerPaddingLeft;
  let firstDescriptionBoxWidth;
  let firstImageBox;
  let firstImageBoxOver;

  paddingTop = <%% 200, 200, 180, 168, 16 %%>;

  titleSize = <%% 27, 27, 27, 27, 27 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

  subSize = <%% 18, 18, 18, 18, 18 %%>;
  subWeight = <%% 500, 500, 500, 500, 500 %%>;

  whiteInnerPaddingTop = <%% 48, 48, 40, 40, 72 %%>;
  whiteInnerPaddingLeft = <%% 48, 48, 40, 40, 72 %%>;

  firstDescriptionBoxWidth = <%% 448, 448, 448, 448, 448 %%>;

  firstImageBoxOver = <%% 160, 160, 160, 160, 160 %%>;

  contents = {
    title: "톤보정 시공이란?",
    sub: "Tone match-up",
    description: [
      "홈리에종에서 제안하는 톤보정 시공은 디자이너와",
      "함께 원하는 스타일에 맞추어 큰 구조의 변경이나",
      "<b%전체 시공 없이 기존 자재의 거슬리는 컬러, 톤, 무늬 등을",
      "새로운 자재로 드레스업하여 배경을 새로 만들어내는%b>",
      "비교적 간단한 부분 시공 서비스입니다.",
    ],
  };


  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(paddingTop) + ea,
      marginTop: String(paddingTop) + ea,
      marginBottom: String(800) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(0),
          left: String(((window.innerWidth - standardWidth) / 2) * -1) + ea,
          width: String(window.innerWidth) + ea,
          height: withOut(0),
          background: colorChip.gray1,
        }
      }
    ]
  });

  createNode({
    mother: baseMother,
    text: contents.title,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      width: withOut(0, ea),
      textAlign: "center",
      paddingBottom: String(titlePaddingBottom) + ea,
    }
  });

  createNode({
    mother: baseMother,
    text: contents.sub,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(subSize) + ea,
      fontWeight: String(subWeight),
      color: colorChip.deactive,
      fontFamily: "graphik",
      fontStyle: "italic",
      textAlign: "center",
    }
  });

  firstWhiteBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      marginTop: String(200) + ea,
      width: withOut(0, ea),
      height: String(400) + ea,
      borderRadius: String(8) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: String(16) + ea,
    }
  });

  firstDescriptionBox = createNode({
    mother: firstWhiteBox,
    style: {
      display: "inline-flex",
      width: String(firstDescriptionBoxWidth - whiteInnerPaddingLeft) + ea,
      height: withOut(whiteInnerPaddingTop * 2, ea),
      paddingTop: String(whiteInnerPaddingTop) + ea,
      paddingBottom: String(whiteInnerPaddingTop) + ea,
      paddingLeft: String(whiteInnerPaddingLeft) + ea,
      flexDirection: "column",
      justifyContent: "end",
    }
  });

  createNode({
    mother: firstDescriptionBox,
    text: contents.sub,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(17) + ea,
      fontWeight: String(500),
      color: colorChip.black,
      fontFamily: "graphik",
      fontStyle: "italic",
    }
  });

  createNode({
    mother: firstDescriptionBox,
    text: contents.description.join("\n"),
    style: {
      display: "block",
      position: "relative",
      fontSize: String(14) + ea,
      fontWeight: String(400),
      lineHeight: String(1.6),
      color: colorChip.black,
      marginTop: String(10) + ea,
    },
    bold: {
      fontSize: String(14) + ea,
      fontWeight: String(700),
      color: colorChip.black,
    }
  });

  firstImageBox = createNode({
    mother: firstWhiteBox,
    style: {
      display: "inline-block",
      width: withOut(firstDescriptionBoxWidth, ea),
      position: "relative",
      height: "calc(100% + " + String(firstImageBoxOver) + ea + ")",
      top: String(-1 * firstImageBoxOver) + ea,
    }
  });

  secondWhiteBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: String(400) + ea,
      borderRadius: String(8) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: String(paddingTop) + ea,
    }
  });

}

StylePartsJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet } = GeneralJs;
    const getObj = returnGet();
    let response;

    await this.mother.ghostClientLaunching({
      mode: "ghost",
      name: "styleParts",
      client: null,
      base: {
        instance: this,
        binaryPath: StylePartsJs.binaryPath,
        subTitle: "스타일 파츠",
        secondBackground: false,
        backgroundType: 0,
        talk: {
          text: "기타 문의 사항은 홈리에종 채널에 주세요!",
          event: "channel",
        }
      },
      local: async () => {
        try {
          instance.slimNavigator();
          instance.insertInitBox();
          instance.insertHeadlineBox();
          instance.insertLeadBox();
          instance.insertMatchupBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "StylePartsJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "StylePartsJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
