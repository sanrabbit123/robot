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

StylePartsJs.binaryPath = FRONTHOST + "/middle/curation";

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
  const { totalContents, ea, standardWidth, media } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;





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
