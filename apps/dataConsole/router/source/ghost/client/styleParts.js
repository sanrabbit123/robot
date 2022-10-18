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
  this.localColor = {
    brown0: "#cfb9ad",
    brown1: "#a68376",
    brown2: "#8f5e53",
  }
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
    style: {
      logo: (color) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 850.3941 78.1718" xml:space="preserve"><path fill="${color}" d="M471.186,7.6509c-5.653-3.8598-12.2009-5.7903-19.6459-5.7903H413.384v74.554h13.4425V44.6691h24.7137 c7.445,0,14.0627-1.9642,19.853-5.8939c5.7903-4.1356,8.6855-9.3057,8.6855-15.5103 C480.0787,17.1301,477.1149,11.9263,471.186,7.6509z M461.8804,30.7099c-2.8952,1.8619-6.3431,2.7928-10.3402,2.7928h-24.7137 V13.0282h24.7137c3.9971,0,7.445,0.931,10.3402,2.7916c3.1023,2.0004,4.6534,4.4824,4.6534,7.445 C466.5338,26.2997,464.9827,28.7806,461.8804,30.7099z M627.1177,43.1191c4.4102-1.4476,8.2363-3.6876,11.4771-6.7213 c3.9297-3.9296,5.8939-8.3061,5.8939-13.133c0-6.1348-2.9638-11.3386-8.8926-15.6139c-5.653-3.8598-12.2009-5.7903-19.6459-5.7903 H577.794v74.554h13.4425V44.6691h11.6842c7.1693,0,12.2021,1.9654,15.0972,5.8951l20.0602,25.8505h16.1306l-21.0935-27.0922 C630.9077,46.5659,628.9097,44.498,627.1177,43.1191z M615.9501,33.5027h-24.7136V13.0282h24.7136 c3.9971,0,7.4451,0.931,10.3402,2.7916c3.1023,2.0004,4.6535,4.4824,4.6535,7.445c0,3.0349-1.5512,5.5157-4.6535,7.4451 C623.3952,32.5718,619.9473,33.5027,615.9501,33.5027z M661.8597,1.8607h69.9006v11.1675h-28.2291v63.3865h-13.4425V13.0282h-28.229 V1.8607z M819.652,55.7343c0,7.1693-4.1356,12.8909-12.408,17.1638c-7.0308,3.5166-14.925,5.2737-23.6791,5.2737 c-9.0311,0-16.9241-1.7932-23.6791-5.376c-8.2724-4.2042-12.408-10.2379-12.408-18.0959h13.5449 c0,4.6884,2.5495,7.9978,7.6522,9.9271c2.1364,0.7587,4.4282,1.344,6.8766,1.7571c2.446,0.4143,5.1183,0.6202,8.0135,0.6202 c5.7217,0,10.6846-0.7913,14.8901-2.3773c5.1003-1.9991,7.6522-4.9642,7.6522-8.8926c0-4.9642-4.5499-8.2724-13.6497-9.9271h0.1036 c-2.3448-0.3444-4.6366-0.7057-6.8766-1.0863c-2.2412-0.3781-4.498-0.7756-6.773-1.1887h0.1036 c-2.3436-0.3444-4.5848-0.7057-6.7213-1.0862c-2.1376-0.377-4.3428-0.7744-6.6177-1.1887 c-10.6859-3.3083-16.027-9.6501-16.027-19.0257c0-6.8923,3.79-12.4767,11.3735-16.752c3.3094-1.7921,6.8068-3.1541,10.4955-4.0839 C775.2057,0.4648,779.2221,0,783.5648,0c8.4796,0,15.9921,1.8269,22.5423,5.4796c7.5823,4.2753,11.3735,10.2366,11.3735,17.8888 h-13.5449c0-4.4102-2.311-7.5823-6.9284-9.5128c-3.861-1.7222-8.3422-2.5857-13.4425-2.5857c-5.1701,0-9.72,0.8274-13.6497,2.4821 h0.1036c-4.5499,2.0678-6.8236,4.8955-6.8236,8.4796c0,5.1701,4.5487,8.5819,13.6484,10.2366 c2.2051,0.4131,4.4283,0.8105,6.6695,1.1887c2.24,0.3806,4.5318,0.7756,6.8766,1.1898c2.275,0.4131,4.4981,0.8274,6.6695,1.2405 c2.1713,0.4131,4.3945,0.7936,6.6694,1.1368C814.3434,40.5334,819.652,46.7043,819.652,55.7343z M529.8661,1.8094l32.5729,74.5529 h-14.3734l-7.1198-16.3016l-17.801-40.8803l-18.1357,41.6352l-6.8875,15.5467h-14.1663l32.5718-74.5529H529.8661z M850.3941,62.9722 v13.4425h-13.4425V62.9722H850.3941z M61.879,47.5883c1.9449,2.1801,2.9181,5.0479,2.9181,8.6026 c0,3.7574-1.2074,7.0779-3.6223,9.9611c-2.4149,2.8849-5.9364,5.1315-10.5646,6.7414c-4.6287,1.6093-10.2302,2.4143-16.8032,2.4143 c-4.8973,0-9.4075-0.47-13.5325-1.4084c-4.1255-0.9384-7.8829-2.3474-11.2693-4.2258C5.6169,67.7963,2.6158,65.4821,0,62.7307 l1.2075-2.1125c3.6223,4.0923,8.2156,7.1937,13.7844,9.3068c5.5671,2.1132,11.838,3.1694,18.8151,3.1694 c5.902,0,11.0175-0.7042,15.3439-2.1131c4.3265-1.4084,7.6625-3.4208,10.0115-6.0366c2.3473-2.6164,3.454-5.6679,3.3206-9.1562 c0-2.4149-0.6544-4.4427-1.962-6.0875c-1.3082-1.6426-3.0532-3.0012-5.2322-4.0746c-2.1807-1.0724-4.5955-1.9449-7.2446-2.6164 c-2.6507-0.6693-5.282-1.2075-7.8984-1.6099c-2.6158-0.4025-5.0307-0.7374-7.244-1.0059c-3.4889-0.4683-7.0436-1.022-10.6654-1.6603 c-3.6223-0.6367-6.9428-1.575-9.9611-2.8173c-3.0189-1.2401-5.4509-2.9507-7.295-5.1315c-1.8457-2.179-2.767-5.0461-2.767-8.6026 c0-3.0182,0.7546-5.7349,2.2643-8.1497c1.5092-2.4149,3.6218-4.4433,6.3389-6.0875c2.7166-1.6426,5.886-2.9004,9.5078-3.7729 c3.6223-0.8713,7.5463-1.3082,11.7726-1.3082c4.2916,0,8.2505,0.3693,11.8728,1.1067c3.6218,0.7391,6.8748,1.8457,9.7596,3.3206 c2.8832,1.476,5.3656,3.32,7.4456,5.5339l-1.3082,1.8109c-2.1475-2.1458-4.6127-3.924-7.3951-5.3324 c-2.7841-1.4089-5.8705-2.4653-9.257-3.1694c-3.3876-0.7048-7.0934-1.0569-11.1177-1.0569c-5.0312,0-9.6439,0.6887-13.8348,2.0628 c-4.1931,1.3757-7.5308,3.2874-10.0115,5.7354c-2.4824,2.4492-3.723,5.3495-3.723,8.7034c0,3.2874,0.8885,5.9364,2.6667,7.9482 c1.7766,2.0124,4.0906,3.572,6.9423,4.6791c2.8505,1.1067,5.9363,1.9288,9.257,2.4647c3.32,0.5381,6.5226,1.0065,9.6085,1.4089 c3.5547,0.47,7.1771,1.0231,10.8669,1.6603c3.6882,0.6378,7.1261,1.5595,10.3133,2.767 C57.3671,43.7141,59.933,45.4092,61.879,47.5883z M72.4461,2.8641h61.7092v2.3092H104.455v70.1344h-2.3086V5.1733H72.4461V2.8641z  M216.415,2.8641l-35.2902,44.8694v27.5742h-2.2769V47.8856L142.7297,2.8641h2.8978l34.3033,42.9052l33.5866-42.9052H216.415z  M236.3071,73.0311h51.4957v2.2766h-53.7725V2.8641h2.2769V73.0311z M300.4008,2.8641h55.8662v2.2772h-53.5894v31.5645h47.587 v2.2766h-47.587v34.0488h52.9687v2.2766h-55.2455V2.8641z"/></svg>`;
      }
    }
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
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
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
  });

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

}

StylePartsJs.prototype.insertHeadlineBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
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
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
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
    sub: "Homeliaison styling",
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
              color: localColor.brown2,
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
              color: localColor.brown0,
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
              color: localColor.brown0,
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
          background: localColor.brown2,
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
              color: localColor.brown2,
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
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
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
  let imageBetweenSero;
  let imageBetweenGaro;
  let overMargin;
  let whiteBoxHeight;
  let subTitleSize, subTitleWeight;
  let descriptionSize, descriptionWeight;
  let descriptionBoldWeight;
  let descriptionLineHeight;
  let descriptionMarginTop;
  let whiteBetween;
  let chipWidth;
  let chipBetween;
  let circleWidth;
  let circleMargin;
  let circleOpacity;
  let circleSize, circleWeight, circleTextTop;
  let secondDescriptionBox;
  let secondImageBox;
  let secondImageBetween;
  let secondImageHeight;
  let secondImageTitleSize, secondImageTitleWeight, secondImageTitleMarginTop;
  let secondImageDescriptionMarginTop;
  let secondImageDescriptionSize;
  let secondImageDescriptionWeight;
  let secondImageDescriptionLineHeight;

  paddingTop = <%% 200, 200, 180, 168, 16 %%>;

  titleSize = <%% 27, 27, 27, 27, 27 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

  subSize = <%% 18, 18, 18, 18, 18 %%>;
  subWeight = <%% 500, 500, 500, 500, 500 %%>;

  whiteInnerPaddingTop = <%% 48, 48, 40, 40, 72 %%>;
  whiteInnerPaddingLeft = <%% 48, 48, 40, 40, 72 %%>;

  firstDescriptionBoxWidth = <%% 448, 448, 448, 448, 448 %%>;

  firstImageBoxOver = <%% 180, 180, 180, 180, 180 %%>;
  overMargin = <%% 220, 220, 220, 220, 220 %%>;

  imageBetweenSero = <%% 10, 10, 10, 10, 10 %%>;
  imageBetweenGaro = <%% 30, 30, 30, 30, 30 %%>;

  whiteBoxHeight = <%% 420, 420, 420, 420, 420 %%>;

  subTitleSize = <%% 17, 17, 17, 17, 17 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionMarginTop = <%% 10, 10, 10, 10, 10 %%>;

  whiteBetween = <%% 16, 16, 16, 16, 16 %%>;

  chipWidth = <%% 32, 32, 32, 32, 32 %%>;
  chipBetween = <%% 6, 6, 6, 6, 6 %%>;

  circleWidth = <%% 54, 54, 54, 54, 54 %%>;
  circleMargin = <%% 20, 20, 20, 20, 20 %%>;
  circleOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;
  circleSize = <%% 12, 12, 12, 12, 12 %%>;
  circleWeight = <%% 500, 500, 500, 500, 500 %%>;
  circleTextTop = <%% -2, -2, -2, -2, -2 %%>;

  secondImageBetween = <%% 10, 10, 10, 10, 10 %%>;

  secondImageHeight = <%% 200, 200, 200, 200, 200 %%>;
  secondImageTitleMarginTop = <%% 23, 23, 23, 23, 23 %%>;
  secondImageTitleSize = <%% 18, 18, 18, 18, 18 %%>;
  secondImageTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  secondImageDescriptionMarginTop = <%% 7, 7, 7, 7, 7 %%>;
  secondImageDescriptionSize = <%% 13, 13, 13, 13, 13 %%>;
  secondImageDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  secondImageDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

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
    image: [
      "/before00.jpg",
      "/after00.jpg",
      "/before10.jpg",
      "/after10.jpg",
    ],
    secondSub: "이제 시공 걱정하지 마세요!",
    secondDescription: [
      "홈리에종에서 제안하는 톤보정 시공은 디자이너와",
      "함께 원하는 스타일에 맞추어 큰 구조의 변경이나",
      "<b%전체 시공 없이 기존 자재의 거슬리는 컬러, 톤, 무늬 등을",
      "새로운 자재로 드레스업하여 배경을 새로 만들어내는%b>",
      "비교적 간단한 부분 시공 서비스입니다.",
    ],
    secondImage: [
      {
        source: "/second00.jpg",
        title: "재빠른 시공",
        description: [
          "따뜻한 마루 컬러에 화이트 배경은",
          "기본중의 기본이죠. 다양한 가구 중",
        ]
      },
      {
        source: "/second10.jpg",
        title: "정확한 견적",
        description: [
          "따뜻한 마루 컬러에 화이트 배경은",
          "기본중의 기본이죠. 다양한 가구 중",
        ]
      },
      {
        source: "/second20.jpg",
        title: "신뢰할 수 있는 결제",
        description: [
          "따뜻한 마루 컬러에 화이트 배경은",
          "기본중의 기본이죠. 다양한 가구 중",
        ]
      },
    ]
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
      marginTop: String(overMargin) + ea,
      width: withOut(0, ea),
      height: String(whiteBoxHeight) + ea,
      borderRadius: String(8) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: String(whiteBetween) + ea,
    }
  });

  firstDescriptionBox = createNode({
    mother: firstWhiteBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(firstDescriptionBoxWidth - whiteInnerPaddingLeft) + ea,
      height: withOut(whiteInnerPaddingTop * 2, ea),
      paddingTop: String(whiteInnerPaddingTop) + ea,
      paddingBottom: String(whiteInnerPaddingTop) + ea,
      paddingLeft: String(whiteInnerPaddingLeft) + ea,
      flexDirection: "column",
      justifyContent: "end",
    },
    children: [
      {
        style: {
          position: "absolute",
          width: String(chipWidth) + ea,
          height: String(chipWidth) + ea,
          top: String(-1 * (chipWidth + whiteBetween)) + ea,
          left: String(0),
          background: colorChip.white,
          borderRadius: String(5) + "px",
        }
      },
      {
        style: {
          position: "absolute",
          width: String(chipWidth) + ea,
          height: String(chipWidth) + ea,
          top: String(-1 * (chipWidth + whiteBetween)) + ea,
          left: String(chipWidth + chipBetween) + ea,
          background: localColor.brown0,
          borderRadius: String(5) + "px",
        }
      },
      {
        style: {
          position: "absolute",
          width: String(chipWidth) + ea,
          height: String(chipWidth) + ea,
          top: String(-1 * (chipWidth + whiteBetween)) + ea,
          left: String((chipWidth + chipBetween) * 2) + ea,
          background: localColor.brown1,
          borderRadius: String(5) + "px",
        }
      },
      {
        style: {
          position: "absolute",
          width: String(chipWidth) + ea,
          height: String(chipWidth) + ea,
          top: String(-1 * (chipWidth + whiteBetween)) + ea,
          left: String((chipWidth + chipBetween) * 3) + ea,
          background: localColor.brown2,
          borderRadius: String(5) + "px",
        }
      },
      {
        text: contents.sub,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(subTitleSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.black,
          fontFamily: "graphik",
          fontStyle: "italic",
        }
      },
      {
        text: contents.description.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          lineHeight: String(descriptionLineHeight),
          color: colorChip.black,
          marginTop: String(descriptionMarginTop) + ea,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  firstImageBox = createNode({
    mother: firstWhiteBox,
    style: {
      display: "inline-block",
      width: withOut(firstDescriptionBoxWidth, ea),
      position: "relative",
      height: "calc(100% + " + String(firstImageBoxOver) + ea + ")",
      top: String(-1 * firstImageBoxOver) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenSero) + ea + ") / 2)",
          height: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenGaro) + ea + ") / 2)",
          backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image[0] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
          marginRight: String(imageBetweenSero) + ea,
          marginBottom: String(imageBetweenGaro) + ea,
          borderRadius: String(5) + "px",
          boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: localColor.brown2,
              opacity: String(circleOpacity),
              top: String(circleMargin) + ea,
              left: String(circleMargin) + ea,
            },
            children: [
              {
                text: "Before",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(circleSize) + ea,
                  fontWeight: String(circleWeight),
                  top: String(circleTextTop) + ea,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  color: colorChip.white,
                }
              }
            ]
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenSero) + ea + ") / 2)",
          height: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenGaro) + ea + ") / 2)",
          backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image[1] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
          marginBottom: String(imageBetweenGaro) + ea,
          borderRadius: String(5) + "px",
          boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: localColor.brown2,
              opacity: String(circleOpacity),
              top: String(circleMargin) + ea,
              left: String(circleMargin) + ea,
            },
            children: [
              {
                text: "After",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(circleSize) + ea,
                  fontWeight: String(circleWeight),
                  top: String(circleTextTop) + ea,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  color: colorChip.white,
                }
              }
            ]
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenSero) + ea + ") / 2)",
          height: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenGaro) + ea + ") / 2)",
          backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image[2] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
          marginRight: String(imageBetweenSero) + ea,
          borderRadius: String(5) + "px",
          boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: localColor.brown2,
              opacity: String(circleOpacity),
              top: String(circleMargin) + ea,
              left: String(circleMargin) + ea,
            },
            children: [
              {
                text: "Before",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(circleSize) + ea,
                  fontWeight: String(circleWeight),
                  top: String(circleTextTop) + ea,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  color: colorChip.white,
                }
              }
            ]
          }
        ]
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenSero) + ea + ") / 2)",
          height: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(imageBetweenGaro) + ea + ") / 2)",
          backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image[3] + "')",
          backgroundPosition: "50% 50%",
          backgroundSize: "100% auto",
          borderRadius: String(5) + "px",
          boxShadow: "0px 4px 18px -9px " + colorChip.shadow,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: localColor.brown2,
              opacity: String(circleOpacity),
              top: String(circleMargin) + ea,
              left: String(circleMargin) + ea,
            },
            children: [
              {
                text: "After",
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(circleSize) + ea,
                  fontWeight: String(circleWeight),
                  top: String(circleTextTop) + ea,
                  fontFamily: "graphik",
                  fontStyle: "italic",
                  color: colorChip.white,
                }
              }
            ]
          }
        ]
      }
    ]
  });

  secondWhiteBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      height: String(whiteBoxHeight) + ea,
      borderRadius: String(8) + "px",
      background: colorChip.white,
      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: String(paddingTop) + ea,
    }
  });

  secondDescriptionBox = createNode({
    mother: secondWhiteBox,
    style: {
      display: "inline-flex",
      position: "relative",
      width: String(firstDescriptionBoxWidth - whiteInnerPaddingLeft) + ea,
      height: withOut(whiteInnerPaddingTop * 2, ea),
      paddingTop: String(whiteInnerPaddingTop) + ea,
      paddingBottom: String(whiteInnerPaddingTop) + ea,
      paddingLeft: String(whiteInnerPaddingLeft) + ea,
      flexDirection: "column",
      justifyContent: "end",
    },
    children: [
      {
        text: contents.secondSub,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(subTitleSize) + ea,
          fontWeight: String(800),
          color: colorChip.black,
        }
      },
      {
        text: contents.secondDescription.join("\n"),
        style: {
          display: "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          lineHeight: String(descriptionLineHeight),
          color: colorChip.black,
          marginTop: String(descriptionMarginTop) + ea,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.black,
        }
      }
    ]
  });

  secondImageBox = createNode({
    mother: secondWhiteBox,
    style: {
      display: "inline-block",
      width: withOut(firstDescriptionBoxWidth, ea),
      position: "relative",
      height: withOut(whiteInnerPaddingTop * 2, ea),
      paddingTop: String(whiteInnerPaddingTop) + ea,
      paddingBottom: String(whiteInnerPaddingTop) + ea,
    },
  });

  for (let i = 0; i < contents.secondImage.length; i++) {
    createNode({
      mother: secondImageBox,
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(calc(100% - " + String(whiteInnerPaddingLeft) + ea + ") - " + String(secondImageBetween * (contents.secondImage.length - 1)) + ea + ") / " + String(contents.secondImage.length) + ")",
        marginRight: String(secondImageBetween) + ea,
        height: withOut(0, ea),
        background: colorChip.gray1,
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            width: withOut(0, ea),
            height: String(secondImageHeight) + ea,
            backgroundImage: "url('" + StylePartsJs.binaryPath + contents.secondImage[i].source + "')",
            backgroundPosition: "50% 50%",
            backgroundSize: "auto 100%",
            borderRadius: String(5) + "px",
            boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          }
        },
        {
          text: contents.secondImage[i].title,
          style: {
            display: "block",
            marginTop: String(secondImageTitleMarginTop) + ea,
            fontSize: String(secondImageTitleSize) + ea,
            fontWeight: String(secondImageTitleWeight),
            color: colorChip.black,
            position: "relative",
            width: withOut(0, ea),
            textAlign: "center",
          }
        },
        {
          text: contents.secondImage[i].description.join("\n"),
          style: {
            display: "block",
            marginTop: String(secondImageDescriptionMarginTop) + ea,
            fontSize: String(secondImageDescriptionSize) + ea,
            fontWeight: String(secondImageDescriptionWeight),
            lineHeight: String(secondImageDescriptionLineHeight),
            color: colorChip.black,
            position: "relative",
            width: withOut(0, ea),
            textAlign: "center",
          }
        },
      ]
    });
  }

}

StylePartsJs.prototype.insertStyleBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, svgMaker } = GeneralJs;
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
  let whiteBox;
  let svgBox;
  let whiteBetween;
  let whiteBoxHeight;
  let whiteInnerPaddingLeft;
  let whiteBoxMarginTop;
  let whiteLogoWidth;
  let whiteLogoTop;
  let whiteInnerSize, whiteInnerWeight, whiteInnerBoldWeight;
  let whiteInnerLineHeight;
  let whitePlusSize;
  let whiteLineWidth;
  let whiteVerticalLineWidth;
  let whiteVerticalLineHeight;
  let noticeSize, noticeWeight, noticeBetween;
  let noticeBoxBottom;
  let firstBox, secondBox, thirdBox, fourthBox;
  let firstDescriptionBox, secondDescriptionBox, thirdDescriptionBox, fourthDescriptionBox;
  let imageWidth, imageHeight;
  let imageBetween;
  let imageLineInnerBetween;
  let imageDescriptionPaddingTop;
  let imagePartsWidth;
  let imageTitleSize, imageTitleWeight, imageTitleMarginTop;
  let imageDescriptionSize, imageDescriptionWeight, imageDescriptionMarginTop;
  let imageDescriptionBoldWeight, imageDescriptionLineHeight;
  let imagePortfolioSize, imagePortfolioWeight;
  let imagePortfolioArrowWidth, imagePortfolioArrowHeight;
  let imagePortfolioArrowMarginLeft;
  let imagePortfolioArrowTop;
  let imageTagSize, imageTagWeight;
  let imageBoxMarginTop, imageBoxMarginTopBig;
  let moreBoxHeight;
  let moreCircleWidth, moreCircleBetween;

  svgBox = this.returnSvgBox();

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

  whiteBetween = <%% 36, 36, 36, 36, 36 %%>;
  whiteBoxHeight = <%% 200, 200, 200, 200, 200 %%>;
  whiteBoxMarginTop = <%% 40, 40, 40, 40, 40 %%>;
  whiteInnerPaddingLeft = <%% 60, 60, 60, 60, 60 %%>;

  whiteLogoWidth = <%% 190, 190, 190, 190, 190 %%>;
  whiteLogoTop = <%% 2, 2, 2, 2, 2 %%>;

  whiteInnerSize = <%% 22, 22, 22, 22, 22 %%>;
  whitePlusSize = <%% 32, 32, 32, 32, 32 %%>;
  whiteInnerWeight = <%% 600, 600, 600, 600, 600 %%>;
  whiteInnerBoldWeight = <%% 800, 800, 800, 800, 800 %%>;

  whiteInnerLineHeight = <%% 3, 3, 3, 3, 3 %%>;

  whiteLineWidth = <%% 40, 40, 40, 40, 40 %%>;
  whiteVerticalLineWidth = <%% 16, 16, 16, 16, 16 %%>;
  whiteVerticalLineHeight = <%% 64, 64, 64, 64, 64 %%>;

  noticeSize = <%% 12, 12, 12, 12, 12 %%>;
  noticeWeight = <%% 600, 600, 600, 600, 600 %%>;
  noticeBetween = <%% 3, 3, 3, 3, 3 %%>;
  noticeBoxBottom = <%% 18, 18, 18, 18, 18 %%>;

  imageWidth = <%% 504, 504, 500, 500, 500 %%>;
  imageHeight = <%% 290, 290, 290, 290, 290 %%>;
  imageBetween = <%% 12, 12, 12, 12, 12 %%>;
  imageLineInnerBetween = <%% 48, 48, 48, 48, 48 %%>;

  imageDescriptionPaddingTop = <%% 44, 44, 44, 44, 44 %%>;
  imagePartsWidth = <%% 125, 125, 125, 125, 125 %%>;

  imageTitleSize = <%% 22, 22, 22, 22, 22 %%>;
  imageTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  imageTitleMarginTop = <%% 20, 20, 20, 20, 20 %%>;
  imageDescriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  imageDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  imageDescriptionMarginTop = <%% 10, 10, 10, 10, 10 %%>;
  imageDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  imageDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  imagePortfolioSize = <%% 11, 11, 11, 11, 11 %%>;
  imagePortfolioWeight = <%% 600, 600, 600, 600, 600 %%>;
  imagePortfolioArrowWidth = <%% 20, 20, 20, 20, 20 %%>;
  imagePortfolioArrowHeight = <%% 6, 6, 6, 6, 6 %%>;
  imagePortfolioArrowMarginLeft = <%% 6, 6, 6, 6, 6 %%>;
  imagePortfolioArrowTop = <%% 5, 5, 5, 5, 5 %%>;

  imageTagSize = <%% 12, 12, 12, 12, 12 %%>;
  imageTagWeight = <%% 500, 500, 500, 500, 500 %%>;

  imageBoxMarginTop = <%% 110, 110, 110, 110, 110 %%>;
  imageBoxMarginTopBig = <%% 190, 190, 190, 190, 190 %%>;

  moreBoxHeight = <%% 40, 40, 40, 40, 40 %%>;
  moreCircleWidth = <%% 8, 8, 8, 8, 8 %%>;
  moreCircleBetween = <%% 6, 6, 6, 6, 6 %%>;

  contents = {
    title: "스타일 파츠",
    sub: "Style parts",
    description: [
      "스타일 파츠는 그러한 <b%톤 보정 시공과 함께 홈리에종 스타일링%b>으로",
      "집 안 분위기와 스타일을 효과적으로 바꾸는 인테리어 서비스입니다.",
    ],
    white: {
      main: [
        "홈리에종 홈스타일링",
        "+",
        "톤 보정 시공",
        [
          "Basic set",
          "Simple set",
        ].join("\n"),
        [
          ": 마루 + 도배 + 필름 + (다운라이트 + 중문)",
          ": 도배 + 필름"
        ].join("\n")
      ],
      notice: [
        "아파트멘터리의 파츠 제품을 사용할 경우에만 스타일 파츠에 해당됩니다.",
        "도배 / 필름 한정 단품 시공도 준비되어 있어요!",
        "모든 서비스에는 홈리에종 스타일링 서비스가 필수로 포함됩니다.",
      ]
    },
    image: {
      main: [
        {
          type: "left",
          photo: [
            "/image0_00.jpg",
            "/image1_00.jpg"
          ],
          parts: "/parts00.png",
          title: "시크한 스타일 만들고 싶다면?",
          description: [
            "기존과 다르게 저채도의 바닥과",
            "어두운 컬러의 필름지로 포인트 컬러들을 살려보세요!",
          ],
          tag: [
            "시크",
            "블랙",
            "블랙화이트",
          ]
        },
        {
          type: "right",
          photo: [
            "/image0_10.jpg",
            "/image1_10.jpg"
          ],
          parts: "/parts10.png",
          title: "힙하고 트렌디한 우리집 만들기!",
          description: [
            "타일 느낌나는 마루와 화이트 배경 만들어",
            "미드센추리모던 스타일을 극대화 시킬 수 있어요.",
          ],
          tag: [
            "트렌디",
            "미드센츄리"
          ]
        },
        {
          type: "left",
          photo: [
            "/image0_20.jpg",
            "/image1_20.jpg"
          ],
          parts: "/parts20.png",
          title: "누구나 꿈꾸는 화이트 앤 우드",
          description: [
            "따뜻한 마루 컬러에 화이트 배경은 기본중의 기본이죠.",
            "다양한 가구 중 내 우드 가구톤에 맞추어 자재를 골라봐요!",
          ],
          tag: [
            "화이트",
            "우드",
            "내추럴",
          ]
        },
        {
          type: "right",
          photo: [
            "/image0_30.jpg",
            "/image1_30.jpg"
          ],
          parts: "/parts30.png",
          title: "전체적으로 화사한 글램 스타일",
          description: [
            "글램한 집을 원한다면, 기본 시공은 물론 조명으로",
            "집을 확실히 밝혀주어 곳곳에 포인트를 주어요!",
          ],
          tag: [
            "글램",
            "금속",
            "메탈",
          ]
        },
      ]
    },
    more: {
      title: "다른 스타일이 필요하다면?",
      sub: "다양한 스타일 더보기",
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
      marginBottom: String(paddingTop) + ea,
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
  });

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

  whiteBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: String(whiteInnerPaddingLeft) + ea,
      paddingRight: String(whiteInnerPaddingLeft) + ea,
      width: withOut(whiteInnerPaddingLeft * 2, ea),
      height: String(whiteBoxHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
      marginTop: String(whiteBoxMarginTop) + ea,
    },
    children: [
      {
        mode: "svg",
        source: svgBox.style.logo(colorChip.black),
        style: {
          display: "inline-block",
          position: "relative",
          width: String(whiteLogoWidth) + ea,
          top: String(whiteLogoTop) + ea,
        }
      },
      {
        text: contents.white.main[0],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whiteInnerSize) + ea,
          fontWeight: String(whiteInnerBoldWeight),
          color: localColor.brown1,
          paddingLeft: String(whiteBetween) + ea,
        }
      },
      {
        text: contents.white.main[1],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whitePlusSize) + ea,
          fontWeight: String(whiteInnerBoldWeight),
          color: colorChip.deactive,
          paddingLeft: String(whiteBetween) + ea,
          paddingRight: String(whiteBetween) + ea,
        }
      },
      {
        text: contents.white.main[2],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whiteInnerSize) + ea,
          fontWeight: String(whiteInnerBoldWeight),
          color: colorChip.black,
          paddingRight: String(whiteBetween) + ea,
        }
      },
      {
        style: {
          display: "inline-block",
          width: String(whiteLineWidth) + ea,
          height: String(0),
          borderBottom: "1px solid " + colorChip.gray3,
        }
      },
      {
        style: {
          display: "inline-block",
          width: String(whiteVerticalLineWidth) + ea,
          height: String(whiteVerticalLineHeight) + ea,
          borderTop: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderLeft: "1px solid " + colorChip.gray3,
          borderTopLeftRadius: String(5) + "px",
          borderBottomLeftRadius: String(5) + "px",
        }
      },
      {
        text: contents.white.main[3],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whiteInnerSize) + ea,
          fontWeight: String(500),
          color: colorChip.black,
          fontFamily: "graphik",
          paddingRight: String(whiteBetween) + ea,
          paddingLeft: String(whiteBetween) + ea,
          lineHeight: String(whiteInnerLineHeight),
          fontStyle: "italic",
        }
      },
      {
        text: contents.white.main[4],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(whiteInnerSize) + ea,
          fontWeight: String(whiteInnerWeight),
          color: colorChip.black,
          paddingRight: String(whiteBetween) + ea,
          lineHeight: String(whiteInnerLineHeight),
        }
      },
      {
        style: {
          display: "inline-block",
          width: String(whiteVerticalLineWidth) + ea,
          height: String(whiteVerticalLineHeight) + ea,
          borderTop: "1px solid " + colorChip.gray3,
          borderBottom: "1px solid " + colorChip.gray3,
          borderRight: "1px solid " + colorChip.gray3,
          borderTopRightRadius: String(5) + "px",
          borderBottomRightRadius: String(5) + "px",
        }
      },
      {
        style: {
          display: "inline-block",
          position: "absolute",
          right: String(0),
          top: String(whiteBoxHeight + noticeBoxBottom) + ea,
        }
      }
    ]
  });

  for (let n of contents.white.notice) {
    createNode({
      mother: whiteBox.lastChild,
      text: "* " + n,
      style: {
        display: "block",
        position: "relative",
        textAlign: "right",
        fontWeight: String(noticeWeight),
        color: localColor.brown0,
        fontSize: String(noticeSize) + ea,
        marginBottom: String(noticeBetween) + ea,
      }
    })
  }

  for (let i = 0; i < contents.image.main.length; i++) {
    if (contents.image.main[i].type === "left") {
      createNode({
        mother: baseMother,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: String(imageLineInnerBetween) + ea,
          marginTop: String(i === 0 ? imageBoxMarginTopBig : imageBoxMarginTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(imageWidth) + ea,
              height: String(imageHeight) + ea,
              verticalAlign: "top",
              borderRadius: String(5) + "px",
              backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[0] + "')",
              backgroundPosition: "50% 50%",
              backgroundSize: "100% auto",
              marginRight: String(imageBetween) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(imageWidth) + ea,
              height: String(imageHeight) + ea,
              verticalAlign: "top",
              borderRadius: String(5) + "px",
              backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[1] + "')",
              backgroundPosition: "50% 50%",
              backgroundSize: "100% auto",
              marginRight: String(imageLineInnerBetween) + ea,
            }
          },
          {
            style: {
              display: "inline-flex",
              flexDirection: "column",
              position: "relative",
              paddingTop: String(imageDescriptionPaddingTop) + ea,
              width: withOut(imageWidth + imageBetween + imageWidth + imageLineInnerBetween, ea),
              height: String(imageHeight - imageDescriptionPaddingTop) + ea,
              verticalAlign: "top",
            },
            children: [
              {
                mode: "img",
                attribute: {
                  src: StylePartsJs.binaryPath + contents.image.main[i].parts,
                },
                style: {
                  display: "block",
                  position: "relative",
                  width: String(imagePartsWidth) + ea,
                }
              },
              {
                text: contents.image.main[i].title,
                style: {
                  display: "block",
                  position: "relative",
                  fontSize: String(imageTitleSize) + ea,
                  fontWeight: String(imageTitleWeight),
                  color: colorChip.black,
                  marginTop: String(imageTitleMarginTop) + ea,
                }
              },
              {
                text: contents.image.main[i].description.join("\n"),
                style: {
                  display: "block",
                  position: "relative",
                  fontSize: String(imageDescriptionSize) + ea,
                  fontWeight: String(imageDescriptionWeight),
                  color: colorChip.black,
                  lineHeight: String(imageDescriptionLineHeight),
                  marginTop: String(imageDescriptionMarginTop) + ea,
                },
                bold: {
                  fontSize: String(imageDescriptionSize) + ea,
                  fontWeight: String(imageDescriptionBoldWeight),
                  color: colorChip.black,
                }
              },
              {
                style: {
                  display: "block",
                  width: withOut(0),
                  position: "absolute",
                  bottom: String(0),
                  left: String(0),
                },
                children: [
                  {
                    text: "portfolio list",
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      fontSize: String(imagePortfolioSize) + ea,
                      fontWeight: String(imagePortfolioWeight),
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      color: colorChip.black,
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(imagePortfolioArrowWidth, imagePortfolioArrowHeight, colorChip.black),
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      width: String(imagePortfolioArrowWidth) + ea,
                      marginLeft: String(imagePortfolioArrowMarginLeft) + ea,
                      top: String(imagePortfolioArrowTop) + ea,
                    }
                  },
                  {
                    text: contents.image.main[i].tag.map((str) => { return '#' + str }).join("&nbsp;&nbsp;&nbsp;"),
                    style: {
                      fontSize: String(imageTagSize) + ea,
                      fontWeight: String(imageTagWeight),
                      color: localColor.brown0,
                      position: "absolute",
                      right: String(0),
                      top: String(0),
                    }
                  }
                ]
              }
            ]
          }
        ]
      });

    } else {
      createNode({
        mother: baseMother,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: String(imageLineInnerBetween) + ea,
          marginTop: String(imageBoxMarginTop) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        },
        children: [
          {
            style: {
              display: "inline-flex",
              flexDirection: "column",
              position: "relative",
              paddingTop: String(imageDescriptionPaddingTop) + ea,
              width: withOut(imageWidth + imageBetween + imageWidth + imageLineInnerBetween, ea),
              height: String(imageHeight - imageDescriptionPaddingTop) + ea,
              verticalAlign: "top",
              marginRight: String(imageLineInnerBetween) + ea,
            },
            children: [
              {
                mode: "img",
                attribute: {
                  src: StylePartsJs.binaryPath + contents.image.main[i].parts,
                },
                style: {
                  display: "block",
                  position: "relative",
                  width: String(imagePartsWidth) + ea,
                }
              },
              {
                text: contents.image.main[i].title,
                style: {
                  display: "block",
                  position: "relative",
                  fontSize: String(imageTitleSize) + ea,
                  fontWeight: String(imageTitleWeight),
                  color: colorChip.black,
                  marginTop: String(imageTitleMarginTop) + ea,
                }
              },
              {
                text: contents.image.main[i].description.join("\n"),
                style: {
                  display: "block",
                  position: "relative",
                  fontSize: String(imageDescriptionSize) + ea,
                  fontWeight: String(imageDescriptionWeight),
                  color: colorChip.black,
                  lineHeight: String(imageDescriptionLineHeight),
                  marginTop: String(imageDescriptionMarginTop) + ea,
                },
                bold: {
                  fontSize: String(imageDescriptionSize) + ea,
                  fontWeight: String(imageDescriptionBoldWeight),
                  color: colorChip.black,
                }
              },
              {
                style: {
                  display: "block",
                  width: withOut(0),
                  position: "absolute",
                  bottom: String(0),
                  left: String(0),
                },
                children: [
                  {
                    text: "portfolio list",
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      fontSize: String(imagePortfolioSize) + ea,
                      fontWeight: String(imagePortfolioWeight),
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      color: colorChip.black,
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(imagePortfolioArrowWidth, imagePortfolioArrowHeight, colorChip.black),
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      width: String(imagePortfolioArrowWidth) + ea,
                      marginLeft: String(imagePortfolioArrowMarginLeft) + ea,
                      top: String(imagePortfolioArrowTop) + ea,
                    }
                  },
                  {
                    text: contents.image.main[i].tag.map((str) => { return '#' + str }).join("&nbsp;&nbsp;&nbsp;"),
                    style: {
                      fontSize: String(imageTagSize) + ea,
                      fontWeight: String(imageTagWeight),
                      color: localColor.brown0,
                      position: "absolute",
                      right: String(0),
                      top: String(0),
                    }
                  }
                ]
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(imageWidth) + ea,
              height: String(imageHeight) + ea,
              verticalAlign: "top",
              borderRadius: String(5) + "px",
              backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[0] + "')",
              backgroundPosition: "50% 50%",
              backgroundSize: "100% auto",
              marginRight: String(imageBetween) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(imageWidth) + ea,
              height: String(imageHeight) + ea,
              verticalAlign: "top",
              borderRadius: String(5) + "px",
              backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[1] + "')",
              backgroundPosition: "50% 50%",
              backgroundSize: "100% auto",
            }
          }
        ]
      });

    }
  }

  createNode({
    mother: baseMother,
    text: contents.more.title,
    class: [ "hoverDefault_lite" ],
    style: {
      display: "block",
      position: "relative",
      fontSize: String(imageTitleSize) + ea,
      fontWeight: String(titleWeight),
      color: colorChip.black,
      width: withOut(0, ea),
      textAlign: "center",
      paddingTop: String(imageBoxMarginTop) + ea,
    }
  });

  createNode({
    mother: baseMother,
    class: [ "hoverDefault_lite" ],
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      width: withOut(0, ea),
      height: String(moreBoxHeight) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(moreCircleWidth) + ea,
          height: String(moreCircleWidth) + ea,
          borderRadius: String(moreCircleWidth) + ea,
          background: localColor.brown1,
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(moreCircleWidth) + ea,
          height: String(moreCircleWidth) + ea,
          borderRadius: String(moreCircleWidth) + ea,
          background: localColor.brown1,
          marginLeft: String(moreCircleBetween) + ea,
          marginRight: String(moreCircleBetween) + ea,
        }
      },
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(moreCircleWidth) + ea,
          height: String(moreCircleWidth) + ea,
          borderRadius: String(moreCircleWidth) + ea,
          background: localColor.brown1,
        }
      },
    ]
  })

}

StylePartsJs.prototype.insertBenefitsBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  let baseMother;
  let paddingTop;
  let paddingLeft;
  let titleSize;
  let titleWeight;
  let titlePaddingBottom;
  let subSize;
  let subWeight;
  let contentsBase;
  let contentsTong;
  let benefitsTong;
  let contentsTongBetween;
  let benefitLeftWidth;
  let benefitFactorBoxHeight;
  let benefitNumberWidth;
  let benefitNumberSize;
  let benefitNumberWeight;
  let benefitFactorPaddingLeft;
  let benefitFactorWidth;
  let benefitFactorHeight;
  let benefitFactorSize;
  let benefitFactorWeight;
  let benefitFactorTextTop;
  let descriptionSize;
  let descriptionWeight;
  let descriptionBoldWeight;
  let descriptionLineHeight;
  let descriptionTop;

  paddingTop = <%% 100, 100, 100, 100, 7 %%>;
  paddingLeft = <%% 100, 100, 100, 100, 7 %%>;

  titleSize = <%% 27, 27, 27, 27, 27 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 1, 1, 1, 1, 1 %%>;

  subSize = <%% 18, 18, 18, 18, 18 %%>;
  subWeight = <%% 500, 500, 500, 500, 500 %%>;

  contentsTongBetween = <%% 40, 40, 40, 40, 40 %%>;

  benefitLeftWidth = <%% 1040, 1040, 1040, 1040, 1040 %%>;
  benefitFactorBoxHeight = <%% 96, 96, 96, 96, 96 %%>;

  benefitNumberWidth = <%% 240, 240, 240, 240, 240 %%>;
  benefitNumberSize = <%% 30, 30, 30, 30, 30 %%>;
  benefitNumberWeight = <%% 500, 500, 500, 500, 500 %%>;

  benefitFactorPaddingLeft = <%% 30, 30, 30, 30, 30 %%>;
  benefitFactorWidth = <%% 720, 720, 720, 720, 720 %%>;
  benefitFactorHeight = <%% 64, 64, 64, 64, 64 %%>;

  benefitFactorSize = <%% 20, 20, 20, 20, 20 %%>;
  benefitFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
  benefitFactorTextTop = <%% -1, -1, -1, -1, -1 %%>;

  descriptionSize = <%% 14, 14, 14, 14, 14 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionTop = <%% -10, -10, -10, -10, -10 %%>;

  contents = {
    title: "고객님들을 위한 혜택",
    sub: "Benefits",
    benefits: [
      [ "One", "상담 후, 홈리에종 서비스 계약시 5% 할인 혜택" ],
      [ "Two", "상담 후, 홈리에종 서비스 계약시 5% 할인 혜택" ],
      [ "Three", "상담 후, 홈리에종 서비스 계약시 5% 할인 혜택" ],
    ],
    description: [
      "스타일 파츠를 이용하시는 <b%모든 고객님들께",
      "홈리에종은 위와 같은 3가지 혜택을 제공%b>해드립니다.",
      "오직 스타일 파츠만을 위한 혜택들을 통해",
      "좋은 기회에 좋은 가격으로 인테리어를 진행해보세요!",
    ],
  };

  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }
  });

  createNode({
    mother: baseMother,
    style: {
      display: "block",
      position: "absolute",
      left: String(-1 * ((window.innerWidth - standardWidth) / 2)) + ea,
      width: String(window.innerWidth - ((window.innerWidth - standardWidth) / 2)) + ea,
      height: withOut(0, ea),
      background: colorChip.darkDarkShadow,
      borderTopRightRadius: String(8) + "px",
      borderBottomRightRadius: String(8) + "px",
    }
  });

  contentsBase = createNode({
    mother: baseMother,
    style: {
      display: "block",
      width: withOut(0, ea),
      position: "relative",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop - 6) + ea,
    },
    children: [
      {
        text: contents.title,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(titleSize) + ea,
          fontWeight: String(titleWeight),
          color: colorChip.white,
          width: withOut(0, ea),
          textAlign: "center",
          paddingBottom: String(titlePaddingBottom) + ea,
        }
      },
      {
        text: contents.sub,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(subSize) + ea,
          fontWeight: String(subWeight),
          color: colorChip.white,
          fontFamily: "graphik",
          fontStyle: "italic",
          textAlign: "center",
          opacity: String(0.4),
        }
      }
    ]
  });

  contentsTong = createNode({
    mother: contentsBase,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(0, ea),
      paddingTop: String(contentsTongBetween) + ea,
    }
  });

  benefitsTong = createNode({
    mother: contentsTong,
    style: {
      display: "inline-flex",
      flexDirection: "column",
      position: "relative",
      width: String(benefitLeftWidth) + ea,
    }
  });

  for (let [ number, benefit ] of contents.benefits) {
    createNode({
      mother: benefitsTong,
      style: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: withOut(0, ea),
        height: String(benefitFactorBoxHeight) + ea,
        alignItems: "center",
      },
      children: [
        {
          text: number,
          style: {
            display: "inline-block",
            width: String(benefitNumberWidth) + ea,
            position: "relative",
            fontSize: String(benefitNumberSize) + ea,
            fontWeight: String(benefitNumberWeight),
            fontFamily: "graphik",
            fontStyle: "italic",
            color: colorChip.white,
          }
        },
        {
          style: {
            display: "inline-flex",
            position: "relative",
            justifyContent: "left",
            alignItems: "center",
            paddingLeft: String(benefitFactorPaddingLeft) + ea,
            width: String(benefitFactorWidth) + ea,
            height: String(benefitFactorHeight) + ea,
            borderRadius: String(5) + "px",
            background: colorChip.white,
            boxShadow: "0px 3px 15px -9px " + colorChip.realBlack,
          },
          children: [
            {
              text: benefit,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(benefitFactorSize) + ea,
                fontWeight: String(benefitFactorWeight),
                color: colorChip.black,
                top: String(benefitFactorTextTop) + ea,
              }
            }
          ]
        }
      ]
    });
  }

  createNode({
    mother: contentsTong,
    style: {
      display: "inline-flex",
      flexDirection: "column-reverse",
      position: "relative",
      width: withOut(benefitLeftWidth, ea),
    },
    children: [
      {
        text: contents.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.white,
          lineHeight: String(descriptionLineHeight),
          top: String(descriptionTop) + ea,
        },
        bold: {
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionBoldWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

StylePartsJs.prototype.insertProcessBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, svgMaker } = GeneralJs;
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
  descriptionLineBottom = <%% 36, 36, 36, 36, 36 %%>;

  contents = {
    title: "스타일링 프로세스",
    sub: "Styling process",
    description: [
      "홈리에종의 스타일링 서비스는 한 명의 디자이너와 우리집 시공부터",
      "홈스타일링까지 전 과정을 함께하고, 디자이너와의 프로젝트가 잘 진행될 수",
      "있도록 <b%홈리에종이 프로젝트 케어를 제공%b>합니다.",
    ],
    subDescription: [
      "홈리에종 서비스는 보편 상담부터 가구 배치가 완료되는 과정은 <b%보편 1달 반 정도의 기간이 소요%b>됩니다.",
      "상담 문의는 소요되는 기간을 고려하여 서비스 신청 시, 디자이너의 선택 폭이 넓어집니다.",
    ],
    button: "상담 신청",
    finalNotice: [
      "1. 홈리에종의 스타일링 서비스는 한 명의 디자이너와 우리집 시공부터 홈스타일링까지 전 과정을 함께하고, 디자이너와의 프로젝트가 잘 진행될 수 있도록 홈리에종이 프로젝트 케어를 제공합니다.",
      "2. 홈리에종 서비스는 고관여 서비스로 상담을 통해 나의 상황에 맞는 서비스 유형과 디자이너의 선택에 도움을 받을 수 있습니다.",
      "3. 홈리에종의 프로세스는 디자이너와 1:1로 만나 인테리어의 전반적인 과정을 같이 진행하는 형식이기 때문에 시공비, 구매비와는 별도로 디자인비가 발생합니다.",
      "4. 홈리에종 서비스는 보편 상담부터 가구 배치가 완료되는 과정은 보편 1달 반 정도의 기간이 소요됩니다. 상담 문의는 소요되는 기간을 고려하여 서비스 신청 시, 디자이너의 선택 폭이 넓어집니다.",
      "5. 홈리에종 서비스는 시공만을 단독으로 진행하지는 않습니다. 예산과 기획에 맞는 시공 디자인부터 스타일링까지 디자이너가 함께합니다.",
      "",
      "톤보정 시공 - ( tone match-up)",
      "홈리에종에서 제안하는 톤보정 시공은 디자이너와 함께 원하는 스타일에 맞추어 큰 구조의 변경이나 전체 시공 없이 기존 자재의 거슬리는 컬러, 톤, 무늬 등을",
      "새로운 자재로 드레스업하여 배경을 새로 만들어내는 비교적 간단한 부분 시공 서비스입니다.",
      "",
      "본 서비스는 홈리에종의 사정에 따라 별도 고지 없이 변경 또는 중단될 수 있습니다.",
      "본 서비스는 홈리에종의 메인 서비스인 홈스타일링 서비스가 포함되어 있습니다.",
      "시공 자재 선택은 서비스 계약 확정 후, 디자이너와의 상담을 통해 결정됩니다.",
    ]
  };

  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      width: String(standardWidth) + ea,
      left: withOut(50, standardWidth / 2, ea),
      paddingTop: String(paddingTop) + ea,
      marginBottom: String(paddingTop) + ea,
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


  createNode({
    mother: baseMother,
    text: "홈리에종 케어",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(20) + ea,
      fontWeight: String(titleWeight),
      color: localColor.brown2,
      width: withOut(0, ea),
      textAlign: "center",
      paddingTop: String(60) + ea,
      paddingBottom: String(titlePaddingBottom) + ea,
    }
  });

  createNode({
    mother: baseMother,
    mode: "img",
    attribute: {
      src: StylePartsJs.binaryPath + "/process0.png",
    },
    style: {
      display: "block",
      position: "relative",
      width: String(1300) + ea,
    }
  });


  createNode({
    mother: baseMother,
    text: contents.subDescription.join("\n"),
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
      marginBottom: String(24) + ea,
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    }
  });


  createNode({
    mother: baseMother,
    mode: "svg",
    source: svgMaker.verticalArrow(12, 240, localColor.brown2),
    style: {
      display: "block",
      position: "relative",
      width: String(12) + ea,
    }
  })

  createNode({
    mother: baseMother,
    style: {
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      width: String(140) + ea,
      height: String(56) + ea,
      borderRadius: String(5) + "px",
      background: localColor.brown2,
      marginTop: String(20) + ea,
    },
    children: [
      {
        text: contents.button,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(20) + ea,
          fontWeight: String(700),
          color: colorChip.white,
          top: String(-2) + ea,
        }
      }
    ]
  });


  createNode({
    mother: baseMother,
    text: contents.finalNotice.join("\n"),
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(13) + ea,
      fontWeight: String(descriptionWeight),
      color: colorChip.black,
      lineHeight: String(descriptionLineHeight),
      textAlign: "left",
      paddingTop: String(descriptionPaddingLeft) + ea,
      paddingBottom: String(descriptionPaddingLeft) + ea,
      paddingLeft: String(descriptionPaddingLeft) + ea,
      paddingRight: String(descriptionPaddingLeft) + ea,
      width: withOut(descriptionPaddingLeft * 2, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
      marginTop: String(120) + ea,
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    },
    children: [
      {
        text: "홈리에종 FAQ",
        style: {
          display: "inline-flex",
          position: "absolute",
          width: String(120) + ea,
          height: String(36) + ea,
          borderRadius: String(5) + "px",
          background: localColor.brown2,
          fontSize: String(15) + ea,
          fontWeight: String(700),
          color: colorChip.white,
          justifyContent: "center",
          alignItems: "center",
          bottom: String(descriptionPaddingLeft) + ea,
          right: String(descriptionPaddingLeft) + ea,
          paddingBottom: String(2) + ea,
        }
      }
    ]
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
          instance.insertStyleBox();
          instance.insertBenefitsBox();
          instance.insertProcessBox();
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
