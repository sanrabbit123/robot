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

StylePartsJs.binaryPath = FRONTHOST + "/middle/parts";

StylePartsJs.prototype.returnSvgBox = function () {
  const instance = this;
  let box;
  box = {
    init: {
      title: (color) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 249.5701 114.6015" xml:space="preserve"><path fill="${color}" d="M5.1426,38.1539C3.2078,37.0818,1.4938,35.7603,0,34.1889l0.6896-1.2064c2.0686,2.337,4.6918,4.1082,7.8721,5.3149 c3.1793,1.2068,6.7604,1.81,10.745,1.81c3.3706,0,6.2919-0.4022,8.7627-1.2068c2.4708-0.8043,4.376-1.9536,5.7175-3.4474 c1.3405-1.4941,1.9725-3.2368,1.8963-5.2289c0-1.3791-0.3737-2.5372-1.1205-3.4765c-0.7471-0.938-1.7436-1.7139-2.988-2.327 c-1.2453-0.6124-2.6244-1.1107-4.1373-1.4942c-1.5137-0.3822-3.0165-0.6895-4.5106-0.9194c-1.4939-0.2299-2.873-0.4211-4.137-0.5745 c-1.9924-0.2675-4.0225-0.5836-6.0908-0.9482c-2.0687-0.3636-3.965-0.8995-5.6887-1.6089c-1.724-0.7083-3.1129-1.6852-4.166-2.9305 c-1.0541-1.2444-1.5801-2.8818-1.5801-4.9128c0-1.7237,0.4309-3.2751,1.2931-4.6542c0.8618-1.3791,2.0683-2.5375,3.62-3.4764 c1.5514-0.938,3.3615-1.6564,5.4297-2.1547C13.6755,0.2495,15.9164,0,18.33,0c2.4509,0,4.7117,0.2109,6.7804,0.632 c2.0683,0.4221,3.9261,1.0541,5.5735,1.8963c1.6466,0.8429,3.0643,1.896,4.2521,3.1603L34.189,6.7228 c-1.2264-1.2255-2.6343-2.241-4.2233-3.0453c-1.59-0.8046-3.3526-1.4078-5.2866-1.81C22.7446,1.4651,20.6282,1.264,18.33,1.264 c-2.8732,0-5.5075,0.3933-7.9008,1.178C8.0346,3.2277,6.1285,4.3194,4.7117,5.7174c-1.4177,1.3987-2.1262,3.0551-2.1262,4.9704 c0,1.8773,0.5074,3.3901,1.5229,4.5391c1.0145,1.1493,2.3361,2.0399,3.9647,2.6722c1.6279,0.632,3.3901,1.1015,5.2865,1.4075 c1.896,0.3073,3.725,0.5748,5.4872,0.8046c2.0301,0.2684,4.0988,0.5842,6.2059,0.9482c2.1063,0.3642,4.0696,0.8906,5.8898,1.5801 c1.8188,0.6892,3.2842,1.6573,4.3956,2.9017c1.1107,1.2451,1.6664,2.8828,1.6664,4.9128c0,2.1458-0.6895,4.0421-2.0686,5.6887 c-1.3791,1.6475-3.3902,2.9305-6.0333,3.8499c-2.6434,0.9191-5.8423,1.3788-9.5961,1.3788c-2.7968,0-5.3725-0.2684-7.7282-0.8043 C9.2224,40.0312,7.0766,39.2266,5.1426,38.1539z M58.3344,41.3715h1.3184V1.3187h16.9614V0H41.3729v1.3187h16.9614V41.3715z  M203.1044,40.0714h-30.2496V20.6265h27.1763v-1.3001h-27.1763V1.3004h30.6041V0h-31.9044v41.3715h31.5499V40.0714z  M164.3599,40.0714h-29.4084V0h-1.3003v41.3715h30.7087V40.0714z M102.1375,41.3715h1.3002V25.6243L123.5914,0h-1.6547 l-19.1808,24.5025L83.1658,0h-1.6549l20.6266,25.7112V41.3715z M222.9201,91.2169c-1.2992-0.196-2.5688-0.4134-3.8088-0.6493 s-2.5096-0.4725-3.8088-0.7084c-1.3391-0.2366-2.6479-0.4622-3.9271-0.6795c-1.2799-0.2159-2.5496-0.4429-3.8088-0.6788 c-5.1968-0.945-7.7944-2.8934-7.7944-5.846c0-2.0468,1.2985-3.6616,3.8969-4.8425h-0.0591c2.2442-0.945,4.8425-1.4175,7.7951-1.4175 c2.9127,0,5.4719,0.4931,7.6768,1.4766c2.6369,1.1025,3.9567,2.9141,3.9567,5.4327h7.7353c0-4.3701-2.1651-7.7745-6.4952-10.2161 c-3.7408-2.086-8.031-3.1293-12.8736-3.1293c-2.48,0-4.7737,0.2655-6.8797,0.7971c-2.1066,0.5309-4.1039,1.3088-5.9938,2.3322 c-4.3309,2.4415-6.4952,5.6307-6.4952,9.5668c0,5.3542,3.0502,8.976,9.1528,10.8653c1.2992,0.2366,2.5585,0.4636,3.7792,0.6788 c1.2201,0.2173,2.5001,0.4236,3.8384,0.6204h-0.0591c1.2991,0.2359,2.588,0.4629,3.868,0.6788 c1.2792,0.2173,2.588,0.4236,3.9271,0.6204h-0.0591c5.1967,0.945,7.7951,2.8343,7.7951,5.6693c0,2.2435-1.4574,3.9368-4.3701,5.0784 c-2.4017,0.9058-5.236,1.3577-8.5035,1.3577c-1.6534,0-3.1795-0.1176-4.5764-0.3542c-1.3983-0.2359-2.707-0.5702-3.9271-1.0035 c-2.9141-1.1018-4.3701-2.9918-4.3701-5.6693h-7.7353c0,4.4877,2.3618,7.9333,7.0861,10.3344 c3.8577,2.0461,8.3652,3.0702,13.5228,3.0702c4.9994,0,9.5077-1.0035,13.5228-3.0117c4.7242-2.4402,7.0861-5.7078,7.0861-9.802 C232.0137,96.6309,228.9821,93.1068,222.9201,91.2169z M241.8932,105.9212v7.6768h7.6768v-7.6768H241.8932z M141.9008,77.399 h16.1212v36.199h7.6768V77.399H181.82v-6.3776h-39.9192V77.399z M125.4853,98.1261l12.0461,15.4719h-9.2119l-11.4561-14.7628 c-1.6534-2.2442-4.5275-3.3666-8.6218-3.3666h-6.6727v18.1295h-7.6768V71.0214h21.7904c4.2518,0,7.9911,1.1025,11.2195,3.3068 c3.3858,2.4415,5.0784,5.4134,5.0784,8.9168c0,2.7566-1.1218,5.2559-3.3659,7.5001c-1.8508,1.7324-4.0358,3.0117-6.5544,3.8384 C123.0836,95.3709,124.2246,96.5518,125.4853,98.1261z M121.5877,87.4967c1.7717-1.1018,2.6575-2.5186,2.6575-4.2518 c0-1.6919-0.8859-3.1094-2.6575-4.2517c-1.6534-1.0626-3.6224-1.5942-5.9052-1.5942H101.569v11.6927h14.1136 C117.9653,89.0917,119.9343,88.56,121.5877,87.4967z M58.9036,70.9921l-18.6013,42.576h8.0901l3.9333-8.8785l10.3571-23.7772 l10.166,23.3461l4.0659,9.3096h8.2085l-18.6019-42.576H58.9036z M38.0884,83.2449c0,3.5434-1.6534,6.496-4.9601,8.8577 c-3.3068,2.2442-7.0861,3.3659-11.3378,3.3659H7.6768v18.1295H0V71.0214h21.7904c4.2518,0,7.9911,1.1025,11.2195,3.3068 C36.3958,76.7697,38.0884,79.7415,38.0884,83.2449z M30.3531,83.2449c0-1.6919-0.8859-3.1094-2.6575-4.2517 c-1.6534-1.0626-3.6224-1.5942-5.9052-1.5942H7.6768v11.6927h14.1136c2.2827,0,4.2518-0.5317,5.9052-1.595 C29.4672,86.3949,30.3531,84.9781,30.3531,83.2449z"/></svg>`;
      },
    },
    head: {
      multiple: (color) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 29.0302 447.4286" xml:space="preserve"><path fill="${color}" d="M7.3335,415.4165c0,4.4478,3.4523,7.7517,8.3182,7.7517c4.8666,0,8.3195-3.3039,8.3195-7.7517 c0-4.4483-3.4529-7.7523-8.3195-7.7523C10.7858,407.6642,7.3335,410.9682,7.3335,415.4165z M22.6227,415.4165 c0,3.0816-2.6633,4.6701-6.971,4.6701c-4.3071,0-6.9704-1.5885-6.9704-4.6701c0-3.0816,2.6633-4.6701,6.9704-4.6701 C19.9594,410.7464,22.6227,412.3349,22.6227,415.4165z M23.4117,380.0858h0.2299v6.3856h-0.2299 c-0.8872-1.3662-1.1837-1.811-3.3541-1.811h-6.4774c-2.1704,0-4.2417,0.6351-4.2417,2.9541c0,2.2556,2.1044,4.1626,5.8855,4.1626 h4.8337c2.1704,0,2.4669-0.4454,3.3541-1.8116h0.2299v6.3862h-0.2299c-0.8872-1.3662-1.1837-1.7795-3.3541-1.7795h-6.4775 c-2.1704,0-4.2417,0.6036-4.2417,2.9546c0,2.2236,2.1044,4.162,5.8855,4.162h4.8337c2.1704,0,2.4669-0.4447,3.3541-1.8108h0.2299 v6.3855h-0.2299c-0.8872-1.3656-1.1837-1.811-3.3541-1.811h-9.0096c-1.7755,0-2.3997,0.9215-3.1891,2.1287H7.6611v-4.7656 l3.9789-0.1268c-2.7292-0.9209-4.3071-2.7323-4.3071-5.3058c0-2.7323,1.6438-4.2248,4.4059-4.5427 c-2.7621-0.8266-4.4059-2.7963-4.4059-5.3691c0-3.0187,2.2026-4.6074,5.6878-4.6074h7.0369 C22.228,381.8641,22.5245,381.4515,23.4117,380.0858z M2.0715,318.3621C0.9207,318.3621,0,317.504,0,316.3602 c0-1.1118,0.9207-2.0011,2.0715-2.0011c1.1178,0,2.0391,0.8893,2.0391,2.0011C4.1106,317.5039,3.1892,318.3621,2.0715,318.3621z  M0.6254,431.2256v-6.9258h0.263c0.8555,1.4932,1.2496,2.0333,3.42,2.0333H19.96c2.1697,0,2.5645-0.5401,3.4194-2.0333h0.263v6.9258 h-0.263c-0.8549-1.4931-1.2496-2.0013-3.4194-2.0013h-7.4647v13.3119H19.96c2.1697,0,2.5645-0.5402,3.4194-2.0333h0.263v6.9257 h-0.263c-0.8549-1.4937-1.2496-2.0018-3.4194-2.0018H4.3084c-2.1704,0-2.5645,0.5081-3.42,2.0018h-0.263v-6.9257h0.263 c0.8555,1.4931,1.2496,2.0333,3.42,2.0333h6.8392v-13.3119H4.3084c-2.1704,0-2.5645,0.5082-3.42,2.0013H0.6254z M2.0715,342.3908 c-1.1508,0-2.0715-0.8575-2.0715-2.0013c0-1.1118,0.9207-2.0018,2.0715-2.0018c1.1178,0,2.0391,0.89,2.0391,2.0018 C4.1106,341.5333,3.1892,342.3908,2.0715,342.3908z M7.3736,288.2998c0,4.4478,3.4523,7.7517,8.3182,7.7517 c4.8672,0,8.3195-3.3039,8.3195-7.7517c0-4.4478-3.4523-7.7517-8.3195-7.7517C10.8259,280.5482,7.3736,283.852,7.3736,288.2998z  M22.6634,288.2998c0,3.0816-2.6633,4.6701-6.9716,4.6701c-4.3071,0-6.9705-1.5885-6.9705-4.6701 c0-3.0822,2.6635-4.6701,6.9705-4.6701C20.0001,283.6297,22.6634,285.2176,22.6634,288.2998z M20.0983,314.6628H7.7018v4.8924 h0.1978c0.7894-1.2067,1.4137-2.1281,3.1891-2.1281l9.1744,0.0029c1.581,0,2.863,1.2382,2.863,2.7661s-1.2819,2.7661-2.863,2.7661 c0,0-4.5047-0.0075-7.4318-0.0075c-3.5834,0-5.4577,1.9692-5.4577,5.9722c0,3.8441,1.9074,6.1638,4.0118,6.1638 c1.2489,0,1.9068-0.7312,1.9068-1.7795c0-0.5716-0.1971-1.2388-0.4931-1.5565c-0.4278,0.3493-0.8884,0.5716-1.6113,0.5716 c-1.5786,0-2.5322-1.1438-2.5322-3.0181c0-2.478,1.2166-3.4944,4.2748-3.4944h1.2495l0.4607,2.5415 c0.723,3.8441,1.775,7.4659,5.2931,7.4659c2.6963,0,4.0777-2.0333,4.0777-4.5746c0-2.6055-1.5126-4.7977-3.584-5.4967 c2.4003-0.0955,3.226-1.8982,3.226-3.1312c0-0.0285-0.0012-0.054-0.0012-0.0826v-3.2981l0.0012-0.0006v-6.3856h-0.2131 C22.5523,314.2181,22.2687,314.6628,20.0983,314.6628z M17.0072,325.8139c3.5188,0,5.2943,2.2871,5.2943,4.2889 c0,1.7155-0.8877,2.7958-2.6962,2.7958c-2.3015,0-3.1899-1.684-3.8141-4.7656l-0.4936-2.3191H17.0072z M18.9799,298.4235 c3.058,0,5.0313,2.5094,5.0313,5.8774c0,2.0013-0.7565,3.6218-1.4144,4.6701l1.4144,1.1118v0.2544l-6.0833,0.3499v-0.4454 c3.0911-1.6199,4.7019-3.5263,4.7019-5.9409c0-1.9378-0.9201-3.4313-2.8605-3.4313c-1.8414,0-2.4332,1.4296-2.9592,4.0985 c-0.8219,3.939-2.2026,5.3056-4.8008,5.3056c-2.7292,0-4.6358-2.2556-4.6358-5.2737c0-1.8743,0.6241-3.209,1.3148-4.2888 l-1.3148-1.2073v-0.2229h5.4248v0.3491c-2.3015,1.3982-4.0771,3.0502-4.0771,5.3379c0,1.8748,0.9867,2.9546,2.4334,2.9546 c1.5786,0,2.3345-1.0798,2.8934-3.8127C14.8699,299.9801,16.2836,298.4235,18.9799,298.4235z M23.4233,263.0451h0.2299v6.3856 h-0.2299c-0.8878-1.3656-1.1837-1.8104-3.3541-1.8104h-6.5103c-2.1704,0-4.1759,0.8254-4.1759,3.3354 c0,2.3826,2.0715,4.4484,5.8532,4.4484h4.833c2.1704,0,2.4662-0.4454,3.3541-1.811h0.2299v6.385h-0.2299 c-0.8878-1.3656-1.1837-1.8102-3.3541-1.8102h-9.0096c-1.7755,0-2.3997,0.9213-3.1891,2.1281H7.6727v-4.7651l3.9789-0.1268 c-2.7615-0.9215-4.3071-2.9232-4.3071-5.5922c0-3.2399,2.2026-4.9559,5.7213-4.9559h7.0034 C22.2396,264.8561,22.5355,264.4114,23.4233,263.0451z M23.4117,337.0221h0.2299v6.3855h-0.2299 c-0.8878-1.3661-1.1837-1.8108-3.3541-1.8108H11.048c-1.7755,0-2.3997,0.9215-3.1891,2.1281H7.6611v-4.8926h12.3966 C22.228,338.8324,22.5239,338.3878,23.4117,337.0221z M17.3051,344.8542v-0.2555l6.4147,1.1816v16.5495H23.455 c-0.8594-1.5018-1.2561-2.0129-3.4387-2.0129H4.2773c-2.182,0-2.5787,0.5111-3.4381,2.0129H0.5744v-6.9653h0.2648 c0.8594,1.5018,1.2561,2.0448,3.4381,2.0448h18.1529v-5.5269C22.4302,348.3683,21.1736,347.2181,17.3051,344.8542z M7.3335,371.351 c0,4.0979,3.321,7.4018,8.5159,7.4018s8.1218-3.3674,8.1218-7.5294c0-3.5583-1.9396-5.8459-5.2937-6.5764l-0.2299,0.667 c2.5645,0.9215,3.7482,2.6684,3.7482,5.0835c0,3.368-2.5975,5.3685-6.8392,5.3685v-11.278 C10.2927,364.4881,7.3335,366.9981,7.3335,371.351z M14.1068,375.7034c-3.2552-0.2864-5.4579-1.811-5.4579-4.321 c0-3.0181,2.6635-3.8441,5.4579-3.9076V375.7034z M10.2606,150.3432c-2.6055-1.3341-4.0336-3.289-4.0336-5.4915 c0-0.1238,0-0.2791,0.0313-0.4954h3.071c-0.0298,0.2162-0.0298,0.4028-0.0298,0.6192c0,2.4518,1.1789,4.344,3.3501,5.305h10.4861 v3.1024H6.6315v-3.0397H10.2606 M6.6299,135.209v-4.4365h2.5443v4.4365h13.9616v3.071H9.1742v3.7953l-2.5443-0.4969V138.28H2.5666 v-3.071 M6.1659,106.4095c0-3.2262,1.9549-5.4915,6.1734-5.4915h10.7965v3.071H12.9601c-3.0099,0-4.0649,1.5207-4.0649,3.4442 c0,2.1101,1.4579,3.8156,3.1337,5.2736h11.1069v3.071H12.9601c-3.0099,0-4.0649,1.4893-4.0649,3.4441 c0,2.0788,1.3968,3.7843,3.0726,5.2423h11.168v3.1023H6.6315v-3.0396h3.2576c-2.0474-1.6131-3.7232-3.5366-3.7232-6.3286 c0-2.5742,1.2416-4.529,3.8784-5.2125C7.6865,111.0624,6.1659,109.0463,6.1659,106.4095 M6.1659,67.4752 c0-3.4724,1.9549-5.7376,6.1734-5.7376h10.7965v3.071H12.9601c-3.0099,0-4.0634,1.519-4.0634,3.6902 c0,2.295,1.4579,4.0336,3.071,5.4915h11.168v3.1024H6.6315v-3.0413h3.071C7.8417,72.3772,6.1659,70.3926,6.1659,67.4752  M6.6315,52.2658v-4.4365h2.5443v4.4365h13.96v3.071h-13.96v3.7938l-2.5443-0.4955v-3.2984H2.5681v-3.071 M10.2606,23.6936 c-2.6055-1.3341-4.0336-3.289-4.0336-5.4915c0-0.1238,0-0.2791,0.0313-0.4953h3.071c-0.0298,0.2162-0.0298,0.4028-0.0298,0.6192 c0,2.4518,1.1789,4.344,3.3501,5.305h10.4861v3.1024H6.6315v-3.0397L10.2606,23.6936 M1.419,202.8754l21.7497-8.5061v3.4096 l-6.5701,2.5521v9.7806l6.5701,2.5757v3.2952L6.227,209.342v-3.2968l7.8289,3.0695v-7.7944L1.419,206.2286 M6.1659,164.5649 c0-4.4051,2.3264-6.639,6.3913-6.639h10.5785v3.071h-7.9104c0.3088,4.6841,0.9296,6.9808,2.016,8.0969 c0.4969,0.4969,1.1162,0.6835,1.6758,0.6835c1.4579,0,2.444-1.1867,2.3546-2.9472c-0.0753-1.4517-0.9108-2.9958-1.7009-3.6573 l1.889-1.3309c1.2228,1.1318,2.1101,3.2827,2.1101,5.4836c0,3.5367-1.831,5.4915-4.4365,5.4915 c-1.2714,0-2.3578-0.4969-3.1635-1.3027c-1.3043-1.3027-2.4832-4.1888-2.7936-10.5174h-0.7131 c-2.3264,0-3.6291,1.3027-3.6291,3.9709c0,2.2653,0.8998,4.5916,2.4502,6.639v0.0314H8.3058 C6.8792,169.4042,6.1659,166.954,6.1659,164.5649 M6.1659,37.8574c0-4.4051,2.3264-6.639,6.3913-6.639h10.5785v3.071h-7.9104 c0.3088,4.6841,0.9296,6.9808,2.016,8.0969c0.4969,0.497,1.1162,0.6836,1.6758,0.6836c1.4579,0,2.444-1.1867,2.3546-2.9472 c-0.0753-1.4517-0.9108-2.9958-1.7009-3.6573l1.889-1.3309c1.2228,1.1318,2.1101,3.2827,2.1101,5.4836 c0,3.5367-1.831,5.4915-4.4365,5.4915c-1.2714,0-2.3578-0.4969-3.1635-1.3027c-1.3043-1.3027-2.4832-4.1888-2.7936-10.5174h-0.7131 c-2.3264,0-3.6291,1.3027-3.6291,3.9709c0,2.2653,0.8998,4.5916,2.4502,6.639v0.0314H8.3058 C6.8792,42.6967,6.1659,40.2465,6.1659,37.8574 M6.6315,0l16.4902,6.3161l5.9085,2.2621v3.071l-5.8505-2.215L6.6315,15.918v-3.289 l12.4253-4.7578L6.6315,3.1651 M6.2082,182.8564c0-3.8752,3.013-7.6627,8.4575-7.6627c4.6074,0,8.503,2.9895,8.6002,7.9481 c0.0392,1.958-0.6537,3.7122-1.5535,4.7202l-2.2997-1.3607c0.8011-0.845,1.2573-1.9799,1.3043-3.289 c0.1129-3.1259-2.7089-4.971-5.896-4.9161c-4.0634,0.069-6.0371,2.4502-6.0371,5.5229c0,2.016,1.0425,3.9395,2.2841,5.0871h17.9622 v3.1024H6.6315v-3.0099l2.3891-0.0298C7.5627,187.6957,6.2082,185.5308,6.2082,182.8564 M6.1659,88.5931 c0-5.4601,3.8784-7.8493,8.4685-7.8493c0.3104,0,0.58,0.0267,1.1224,0.0768v12.0255l-2.27-0.8309V83.691 c-2.6054,0.1866-4.7767,1.737-4.7767,4.9648c0,2.8531,1.8608,4.8707,4.7767,5.3974c0.3214,0.0675,1.6413,0.1866,2.1101,0.1239 c3.3501-0.2163,5.3677-2.4205,5.3677-6.2048c0-2.3891-0.7149-4.3737-1.9549-6.3286v-0.0314h2.792 c0.961,1.552,1.7683,3.847,1.7683,6.4838c0,6.0496-3.5366,9.1223-8.3446,9.1223C10.0443,97.2184,6.1659,93.8056,6.1659,88.5931  M22.2206,230.9717c0.2448-0.2448,0.6413-0.2448,0.8861,0s0.2448,0.6413,0,0.8861l-6.8767,6.8767l6.8767,6.8767 c0.2448,0.2448,0.2448,0.6414,0,0.8861c-0.1224,0.1224-0.2827,0.1836-0.4431,0.1836c-0.1603,0-0.3207-0.0612-0.4431-0.1836 l-6.8767-6.8767l-6.8767,6.8767c-0.1224,0.1224-0.2827,0.1836-0.4431,0.1836c-0.1603,0-0.3207-0.0612-0.4431-0.1836 c-0.2448-0.2448-0.2448-0.6413,0-0.8861l6.8767-6.8767l-6.8767-6.8767c-0.2448-0.2448-0.2448-0.6413,0-0.8861 s0.6413-0.2448,0.8861,0l6.8767,6.8767L22.2206,230.9717z"/></svg>`;
      }
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

  iconHeight = <%% 15, 15, 14, 12, 16 %%>;
  iconTop = <%% 16, 16, 13, 12, 20 %%>;
  mobileMargin = 6.1;

  if (desktop) {
    this.naviHeight = <%% 52, 52, 46, 40, 40 %%>;
    this.mother.naviHeight = this.naviHeight;

    totalContents.firstChild.remove();
    totalContents.firstChild.remove();
    totalContents.firstChild.remove();

    target = totalContents.firstChild;

    cleanChildren(target);
    target.style.height = String(this.naviHeight) + "px";

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
  } else {
    totalContents.firstChild.remove();
    totalContents.firstChild.remove();
    totalContents.firstChild.remove();
  }

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
  let descriptionPaddingTop;
  let partsWidth;
  let bottomLineWidth;
  let bottomLineHeight;
  let mobileStandardWidth;

  initSize = <%% 15, 14, 13, 12, 3.2 %%>;
  initWeight = <%% 400, 400, 400, 400, 400 %%>;
  initBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  initLineHeight = <%% 1.66, 1.66, 1.66, 1.66, 1.66 %%>;
  initSecondMarginTop = <%% 12, 12, 12, 12, 4 %%>;

  initPaddingTop = <%% 180, 110, 110, 82, 9 %%>;

  leftMotherWidth = <%% 600, 460, 284, 250, 82 %%>;

  titleLogWidth = <%% 250, 216, 160, 140, 34 %%>;
  titleLogTop = <%% 96, 64, 60, 48, 2 %%>;

  baseMotherMarginBottom = <%% 168, 160, 140, 110, 3 %%>;

  descriptionPaddingTop = <%% 21, 21, 8, 6, 0.5 %%>;
  partsWidth = <%% 100, 96, 90, 88, 33 %%>;

  bottomLineWidth = <%% 400, 0, 0, 0, 0 %%>;
  bottomLineHeight = <%% 40, 0, 0, 0, 0 %%>;

  mobileStandardWidth = 80;

  svgBox = this.returnSvgBox();
  contents = {
    year: (new Date()).getFullYear(),
    init: [
      [
        "최소한의 시공으로 내 집과 나에게 적합한 컨디션의 스타일링.",
        desktop ? "<b%시공 비용은 줄이고, 집 전체 스타일링 결과물에 대한 만족도는 올리고,%b>" : "\n<b%시공 비용은 줄이고, 집 전체 결과물에 대한 만족도는 올리고,%b>",
      ],
      [
        desktop ? "시공부터 스타일링까지, <b%전체 풀 프로세스를 홈리에종 디자이너와 함께%b>" : "시공부터 스타일링까지,\n<b%전체 프로세스를 홈리에종 디자이너와 함께%b>",
        "파츠 자재를 사용하여 홈스타일링 서비스로 진행해보세요.",
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

  if (media[2] || media[3]) {
    contents.init = [
      [],
      [
        "시공부터 스타일링까지, <b%전체적인",
        "프로세스를 홈리에종 디자이너와 함께%b>",
        "아파트멘터리의 자재를 고르는",
        "스타일 파츠 서비스로 진행해보세요.",
      ]
    ];
  }

  baseMother = createNode({
    mother: baseTong,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: desktop ? "row" : "column",
      width: desktop ? String(standardWidth) + ea : String(mobileStandardWidth + 2) + ea,
      left: desktop ? withOut(50, standardWidth / 2, ea) : withOut(50, mobileStandardWidth / 2, ea),
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
      width: String(partsWidth) + ea,
    }
  });

  createNode({
    mother: leftMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      paddingTop: String(descriptionPaddingTop) + ea,
      paddingLeft: desktop ? "" : String(41) + ea,
      top: desktop ? "" : String(-22) + ea,
    },
    children: [
      {
        text: contents.init[0].join(desktop ? "\n" : " "),
        style: {
          display: (media[2] || media[3]) ? "none" : "block",
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
        text: contents.init[1].join(desktop ? "\n" : " "),
        style: {
          display: "block",
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
      width: String(bottomLineWidth) + ea,
      height: String(bottomLineHeight) + ea,
    }
  });

  rightMother = createNode({
    mother: baseMother,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      flexDirection: "column",
      width: desktop ? withOut(leftMotherWidth, ea) : withOut(0, ea),
      height: desktop ? "" : String(44) + ea,
      top: desktop ? "" : String(-13) + ea,
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
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, isMac } = GeneralJs;
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
  let titleLineHeight;
  let titleMarginTop, titlePaddingLeft;
  let titleBarTop, titleBarWidth, titleBarHeight;
  let wordingLineHeight, wordingMarginTop;
  let wordingSecondMarginTop;
  let whitePanHeight;
  let mobilePaddingLeft;
  let svgBox;

  svgBox = this.returnSvgBox();

  leftMotherWidth = <%% 500, 460, 370, 320, 88 %%>;
  paddingTop = <%% 72, 60, 50, 42, 8 %%>;
  paddingLeft = <%% 72, 60, 50, 42, 3 %%>;

  aboutSize = <%% 13, 12, 11, 10, 3.2 %%>;
  aboutWeight = <%% 500, 500, 500, 500, 500 %%>;

  titleSize = <%% 23, 22, 20, 17, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titleLineHeight = <%% 1.4, 1.4, 1.4, 1.4, 1.4 %%>;
  titleMarginTop = <%% 60, 42, 40, 36, 6 %%>;
  titlePaddingLeft = <%% 22, 22, 21, 16, 2 %%>;

  wordingSize = <%% 14, 14, 13, 12, 3.2 %%>;
  wordingWeight = <%% 400, 400, 400, 400, 400 %%>;
  wordingBoldWeight = <%% 700, 700, 700, 700, 700 %%>;

  wordingLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  wordingMarginTop = <%% 52, 36, 34, 32, 7 %%>;
  wordingSecondMarginTop = <%% 16, 16, 16, 16, 3 %%>;

  titleBarTop = <%% (isMac() ? 8 : 5), (isMac() ? 8 : 5), (isMac() ? 8 : 5), (isMac() ? 6 : 4), 1 %%>;
  titleBarWidth = <%% 5, 5, 4, 3, 2 %%>;
  titleBarHeight = <%% 13, 13, 14, 11, 3 %%>;

  whitePanHeight = <%% 30, 30, 30, 30, 3 %%>;
  mobilePaddingLeft = 0;


  contents = {
    about: "about\nHomeLiaison",
    title: <&& "홈리에종 디자이너와\n아파트멘터리 파츠가 만났다!" | "홈리에종과\n아파트멘터리가 만났다!" | "홈리에종과\n아파트멘터리가 만났다!" | "홈리에종과\n아파트멘터리가 만났다!" | "홈리에종과\n아파트멘터리가 만났다!" &&>,
    description: [
      [
        "내 집의 컨디션을 가장 잘 아는 디자이너와",
        "맞춤 홈스타일링을 진행해보세요.",
        "<b%홈스타일링 전문 플랫폼, 홈리에종은",
        "다양한 디자이너와 함께 홈스타일링을",
        "제공%b>합니다. 아파트멘터리의 파츠 제품으로",
        "시공 선택시 디자인비 할인 혜택도 드려요.",
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
      left: desktop ? String(0) + ea : String(((100 - standardWidth) / 2) * -1) + ea,
      width: desktop ? String(window.innerWidth - ((window.innerWidth - standardWidth) / 2)) + ea : String(100) + ea,
      height: withOut(0, ea),
      background: colorChip.gray1,
      borderTopLeftRadius: desktop ? String(8) + "px" : "",
      borderBottomLeftRadius: desktop ? String(8) + "px" : "",
    }
  });

  leftMother = createNode({
    mother: baseMother,
    style: {
      display: desktop ? "inline-flex" : "flex",
      position: "relative",
      flexDirection: "column",
      width: desktop ? String(leftMotherWidth - paddingLeft) + ea : String(leftMotherWidth - (paddingLeft * 2)) + ea,
      paddingTop: String(paddingTop) + ea,
      paddingLeft: String(paddingLeft) + ea,
      paddingRight: desktop ? "" : String(paddingLeft) + ea,
      paddingBottom: String(paddingTop) + ea,
      height: withOut(paddingTop, ea),
      verticalAlign: "top",
    }
  });

  createNode({
    mother: leftMother,
    text: contents.about,
    style: {
      display: desktop ? "block" : "none",
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
      lineHeight: String(titleLineHeight),
      marginTop: String(titleMarginTop) + ea,
      paddingLeft: desktop ? String(titlePaddingLeft) + ea : "",
      color: colorChip.black,
    },
    children: [
      {
        style: {
          display: desktop ? "inline-block" : "none",
          position: "absolute",
          top: String(titleBarTop) + ea,
          left: String(0),
          width: String(titleBarWidth) + ea,
          height: withOut(titleBarHeight, ea),
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
      lineHeight: String(wordingLineHeight),
      color: colorChip.black,
      marginTop: String(wordingMarginTop) + ea,
      paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
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
      lineHeight: String(wordingLineHeight),
      color: colorChip.black,
      marginTop: String(wordingSecondMarginTop) + ea,
      paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
      marginBottom: desktop ? "" : String(5) + ea,
    },
    bold: {
      fontSize: String(wordingSize) + ea,
      fontWeight: String(wordingBoldWeight),
      color: colorChip.black,
    }
  });


  if (desktop) {
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
        height: String(whitePanHeight) + ea,
        bottom: String(-1 * whitePanHeight) + ea,
        background: colorChip.white,
      }
    });
  } else {

    createNode({
      mother: baseMother,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: String(77) + ea,
        width: String(17) + ea,
        top: String(13) + ea,
        height: withOut(26, ea),
        background: localColor.brown1,
        borderTopLeftRadius: String(8) + "px",
        borderBottomLeftRadius: String(8) + "px",
      },
      children: [
        {
          mode: "svg",
          source: svgBox.head.multiple(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(3.4) + ea,
            left: String(0.5) + ea,
          }
        }
      ]
    });

  }

}

StylePartsJs.prototype.insertLeadBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  paddingTop = <%% 200, 160, 130, 100, 14 %%>;

  titleSize = <%% 27, 26, 23, 21, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 4, 4, 4, 3, 1 %%>;

  subSize = <%% 15, 15, 14, 13, 3.5 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;

  descriptionBoxPaddingTop = <%% 28, 24, 21, 18, 4 %%>;
  imageBoxPaddingTop = <%% 28, 24, 24, 18, 6 %%>;
  barBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  descriptionSize = <%% 15, 14, 13, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPaddingLeft = <%% 36, 36, 36, 36, 3 %%>;
  descriptionLineBottom = <%% 27, 27, 23, 20, 27 %%>;

  diagramTitleSize = <%% 30, 25, 22, 20, 3.5 %%>;
  diagramTitleWeight = <%% 500, 500, 500, 500, 500 %%>;
  diagramSubSize = <%% 18, 15, 14, 13, 2.7 %%>;
  diagramSubWeight = <%% 800, 800, 800, 800, 800 %%>;
  diagramDescriptionSize = <%% 14, 12, 11, 10, 2.7 %%>;
  diagramDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  diagramDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  diagramTextBetween = <%% 7, 7, 6, 6, 1.5 %%>;

  imageWidth = <%% 960, 730, 610, 520, 90 %%>;
  imageMargin = <%% 20, 20, 20, 20, 2 %%>;

  firstPaddingTop = <%% 145, 144, 144, 144, 0 %%>;
  secondLeft = <%% -126, -110, -100, -60, -100 %%>;
  thirdMarginTop = <%% 267, 267, 267, 267, 267 %%>;

  barTitleSize = <%% 20, 18, 16, 15, 3.2 %%>;
  barTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  barPaddingTop = <%% 13, 13, 12, 9, 1.5 %%>;
  barHeight = <%% 20, 20, 20, 20, 2.5 %%>;
  barBetween = <%% 6, 6, 6, 6, 0.5 %%>;

  barFirstWidth = <%% 200, 200, 200, 140, 18 %%>;
  barSecondWidth = <%% 500, 500, 500, 240, 40 %%>;

  barTextSize = <%% 15, 14, 13, 12, 2.5 %%>;
  barTextWeight = <%% 800, 800, 800, 800, 800 %%>;
  barTextBottom = <%% -28, -28, -27, -23, -4.5 %%>;

  barNoticeBoxPaddingTop = <%% 72, 64, 60, 48, 12 %%>;
  barNoticeSize = <%% 14, 14, 13, 12, 2.8 %%>;
  barNoticeWeight = <%% 400, 400, 400, 400, 400 %%>;
  barNoticeMarginBottom = <%% 5, 5, 5, 5, 2 %%>;

  contents = {
    title: "홈리에종 소개",
    sub: "디자이너가 이끄는 인테리어",
    description: [
      desktop ? "홈리에종은 과도한 리모델링을 지양하고 꼭 필요한 시공만을 진행하며," : "홈리에종은 과한 리모델링을 지양하고 필요한 시공만 진행하며,",
      desktop ? "<b%디자인을 선기획하여 인테리어의 효율성을 올리는%b> 방식을 지향합니다." : "<b%디자인을 먼저 기획하여 효율성을 올리는%b> 방식을 지향합니다.",
    ],
    diagram: [
      {
        title: desktop ? "Design" : "Design first",
        sub: "디자인 기획",
        description: [
          "디자인을 먼저 진행하여",
          <&& "시공 범위의 밸런스를 조절" | "시공 범위의 밸런스를 조절" | "시공의 밸런스를 조절" | "시공의 밸런스를 조절" | "시공의 밸런스를 조절" &&>,
        ],
      },
      {
        title: "Construction",
        sub: "톤보정 시공",
        description: [
          "시공 범위를 조정하여",
          "톤에 맞는 부분 시공 위주",
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
        "인테리어 비용은 디자인 / 시공 / 제품 구매 비용으로 나누어집니다.",
        "디자이너가 고객과의 상담 이후 시공 비용과 제품 구매 비용의 밸런스를 균형있게 맞추어 완성도 있는 집을 디자인합니다. ",
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
      color: colorChip.gray5,
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

  if (desktop) {
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
  }

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
          display: desktop ? "inline-flex" : "block",
          position: big ? "relative" : "absolute",
          textAlign: desktop ? "center" : "end",
          justifyContent: desktop ? "center" : "end",
          flexDirection: "column",
          paddingTop: String(firstPaddingTop) + ea,
          left: big ? "" : (desktop ? String(0) + ea : ""),
          right: mobile ? String(2) + ea : "",
          top: big ? "" : (desktop ? String(85) + ea : String(8) + ea),
          zIndex: String(1),
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
              display: desktop ? "block" : "none",
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
          src: StylePartsJs.binaryPath + (<&& "/lead0.png" | "/lead0.png" | "/lead2.png" | "/lead2.png" | "/lead3.png" &&>),
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(imageWidth) + ea,
          marginLeft: big ? String(imageMargin) + ea : "",
          marginRight: big ? String(imageMargin) + ea : "",
          left: big ? "" : (desktop ? String(-10) + ea : String(0)),
        }
      });

    } else if (num === 1) {

      imageMiddleBox = createNode({
        mother: imageBox,
        event: {
          selectstart: (e) => { e.preventDefault(); },
        },
        style: {
          display: desktop ? "inline-flex" : "none",
          position: big ? "relative" : "absolute",
          textAlign: "left",
          justifyContent: "left",
          flexDirection: "column",
          top: big ? "" : String(62) + ea,
          right: big ? "" : String(-19) + ea,
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
          display: desktop ? "inline-flex" : "none",
          position: big ? "relative" : "absolute",
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
      width: desktop ? withOut(0, ea) : String(82) + ea,
      left: desktop ? "" : String(3) + ea,
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
      alignItems: desktop ? "center" : "start",
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
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, isMac } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  paddingTop = <%% 200, 160, 130, 100, 14 %%>;

  titleSize = <%% 27, 26, 23, 21, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 4, 4, 4, 3, 1 %%>;

  subSize = <%% 15, 15, 14, 13, 3.5 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;

  whiteInnerPaddingTop = <%% 48, 48, 36, 24, 0 %%>;
  whiteInnerPaddingLeft = <%% 48, 48, 36, 24, 0 %%>;

  firstDescriptionBoxWidth = <%% 448, 448, 330, 290, 0 %%>;

  firstImageBoxOver = <%% 180, 160, 120, 92, 10 %%>;
  overMargin = <%% 220, 196, 156, 118, 8 %%>;

  imageBetweenSero = <%% 10, 10, 10, 8, 1 %%>;
  imageBetweenGaro = <%% 30, 20, 10, 8, 1 %%>;

  whiteBoxHeight = <%% 420, 320, 300, 230, 60 %%>;

  subTitleSize = <%% 17, 17, 16, 14, 3.5 %%>;
  subTitleWeight = <%% 800, 800, 800, 800, 800 %%>;

  descriptionSize = <%% 14, 14, 13, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionMarginTop = <%% 10, 10, 10, 6, 1.5 %%>;

  whiteBetween = <%% 16, 16, 16, 8, 15 %%>;

  chipWidth = <%% 32, 28, 24, 20, 28 %%>;
  chipBetween = <%% 6, 6, 6, 4, 6 %%>;

  circleWidth = <%% 54, 50, 45, 40, 8 %%>;
  circleMargin = <%% 20, 20, 15, 11, 2.4 %%>;
  circleOpacity = <%% 0.7, 0.7, 0.7, 0.7, 0.7 %%>;
  circleSize = <%% 12, 11, 10, 9, 2.2 %%>;
  circleWeight = <%% 500, 500, 500, 500, 500 %%>;
  circleTextTop = <%% -2, -2, -2, -2, -0.2 %%>;

  secondImageBetween = <%% 10, 10, 10, 10, 10 %%>;

  secondImageHeight = <%% 200, 120, 125, 100, 120 %%>;
  secondImageTitleMarginTop = <%% (isMac() ? 23 : 26), (isMac() ? 20 : 22), (isMac() ? 20 : 22), (isMac() ? 15 : 17), 20 %%>;
  secondImageTitleSize = <%% 18, 15, 14, 12, 3 %%>;
  secondImageTitleWeight = <%% 700, 700, 700, 700, 700 %%>;

  secondImageDescriptionMarginTop = <%% 7, 7, 5, 4, 7 %%>;
  secondImageDescriptionSize = <%% 13, 11, 11, 10, 3 %%>;
  secondImageDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  secondImageDescriptionLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;

  contents = {
    title: "톤보정 시공이란?",
    sub: "홈리에종에서 제안하는 시공 방식",
    subTitle: "톤보정 시공 (tone match-up)",
    description: [
      ((media[0] || media[1]) ? "홈리에종에서 제안하는 톤보정 시공은 디자이너와" : "홈리에종에서 제안하는 톤보정은 디자이너와"),
      ((media[0] || media[1]) ? "함께 원하는 스타일에 맞추어 큰 구조의 변경이나" : "원하는 스타일에 맞추어 구조의 변경이나"),
      ((media[0] || media[1]) ? "<b%전체 시공 없이 기존 자재의 거슬리는 컬러, 톤, 무늬 등을" : "<b%전체 시공 없이 거슬리는 컬러, 톤, 무늬 등을"),
      ((media[0] || media[1]) ? "새로운 자재로 드레스업하여 배경을 새로 만들어내는%b>" : "새로운 자재로 배경을 만들어내는%b>"),
      ((media[0] || media[1]) ? "비교적 간단한 부분 시공 서비스입니다." : "간단한 부분 시공 서비스입니다."),
    ],
    image: [
      "/before00.jpg",
      "/after00.jpg",
      "/before10.jpg",
      "/after10.jpg",
    ],
    secondSub: "홈리에종 직영 시공사",
    secondDescription: [
      ((media[0] || media[1]) ? "이제 시공 걱정하지 마세요! 홈리에종 시공사와 진행 시," : "이제 걱정하지 마세요! 홈리에종 시공사 진행 시,"),
      ((media[0] || media[1]) ? "실시간 채팅을 통해 상황을 빠르게 공유합니다. 그리고" : "실시간 채팅을 통해 상황을 빠르게 공유합니다."),
      ((media[0] || media[1]) ? "투명한 견적서를 제공하며, 신뢰할 수 있는 결제 시스템을" : "투명한 견적서를 제공하며, 신뢰할 수 있는"),
      ((media[0] || media[1]) ? "통해 안정적인 시공을 진행할 수 있습니다. 하자 보수 또한" : "시스템을 통해 안정적으로 진행할 수 있습니다."),
      ((media[0] || media[1]) ? "프로젝트가 끝날 때까지 전체적으로 진행합니다." : "하자 보수 또한 끝날 때까지 진행합니다."),
    ],
    secondImage: [
      {
        source: "/second00.jpg",
        title: "시공 상황 공유",
        description: [
          "실시간 채팅을 통해",
          (big ? "상황을 빠르게 공유드립니다." : "상황을 공유드립니다."),
        ]
      },
      {
        source: "/second10.jpg",
        title: "정확한 견적",
        description: [
          "투명한 견적서를 제공하며",
          (media[0] || media[1]) ? "인증된 결제 시스템을 이용합니다." : "결제 시스템을 이용합니다.",
        ]
      },
      {
        source: "/second20.jpg",
        title: "확실한 하자보수",
        description: [
          "프로젝트가 끝날때까지",
          (media[0] || media[1]) ? "확실하게 하자 보수를 진행합니다." : "하자 보수를 진행합니다.",
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
      width: desktop ? String(standardWidth) + ea : String(82) + ea,
      left: desktop ? withOut(50, standardWidth / 2, ea) : withOut(50, 41, ea),
      paddingTop: String(paddingTop) + ea,
      marginTop: String(paddingTop) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          top: String(0),
          left: desktop ? String(((window.innerWidth - standardWidth) / 2) * -1) + ea : String(-9) + ea,
          width: desktop ? String(window.innerWidth) + ea : String(100) + ea,
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
      color: colorChip.gray5,
      textAlign: "center",
    }
  });

  firstWhiteBox = createNode({
    mother: baseMother,
    style: {
      display: "flex",
      position: "relative",
      flexDirection: desktop ? "row" : "column",
      marginTop: String(overMargin) + ea,
      width: withOut(0, ea),
      height: desktop ? String(whiteBoxHeight) + ea : "",
      borderRadius: String(8) + "px",
      background: desktop ? colorChip.white : "",
      boxShadow: desktop ? "0px 3px 15px -9px " + colorChip.shadow : "",
      marginBottom: String(whiteBetween) + ea,
    }
  });

  if (desktop) {
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
          text: contents.subTitle,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(subTitleSize) + ea,
            fontWeight: String(subTitleWeight),
            color: colorChip.black,
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
  }

  firstImageBox = createNode({
    mother: firstWhiteBox,
    style: {
      display: "inline-block",
      width: desktop ? withOut(firstDescriptionBoxWidth, ea) : String(82) + ea,
      position: "relative",
      height: desktop ? "calc(100% + " + String(firstImageBoxOver) + ea + ")" : String(whiteBoxHeight) + ea,
      top: desktop ? String(-1 * firstImageBoxOver) + ea : "",
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
          backgroundSize: media[0] ? "100% auto" : "auto 100%",
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
          backgroundSize: media[0] ? "100% auto" : "auto 100%",
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
          backgroundSize: media[0] ? "100% auto" : "auto 100%",
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
          backgroundSize: media[0] ? "100% auto" : "auto 100%",
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

  if (mobile) {
    createNode({
      mother: firstWhiteBox,
      style: {
        display: "flex",
        position: "relative",
        width: String(82) + ea,
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: String(6.5) + ea,
      },
      children: [
        {
          text: contents.subTitle,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(subTitleSize) + ea,
            fontWeight: String(subTitleWeight),
            color: colorChip.black,
          }
        },
        {
          text: contents.description.join(" "),
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
  }

  if (desktop) {

    secondWhiteBox = createNode({
      mother: baseMother,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(whiteBoxHeight) + ea,
        borderRadius: String(8) + "px",
        background: desktop ? colorChip.white : "",
        boxShadow: desktop ? "0px 3px 15px -9px " + colorChip.shadow : "",
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

}

StylePartsJs.prototype.insertStyleBox = function () {
  const instance = this;
  const { totalContents, ea, standardWidth, media, baseTong, localColor } = this;
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, svgMaker, isMac, blankHref } = GeneralJs;
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
  let num, num2;
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
  let imageTong;

  svgBox = this.returnSvgBox();

  paddingTop = <%% 200, 160, 130, 100, 14 %%>;

  titleSize = <%% 27, 26, 23, 21, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 4, 4, 4, 3, 1 %%>;

  subSize = <%% 15, 15, 14, 13, 3.5 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;

  descriptionBoxPaddingTop = <%% 28, 24, 23, 18, 4 %%>;
  imageBoxPaddingTop = <%% 28, 24, 23, 22, 3 %%>;
  barBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  descriptionSize = <%% 15, 14, 13, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPaddingLeft = <%% 36, 36, 36, 36, 3 %%>;
  descriptionLineBottom = <%% 27, 27, 23, 20, 2 %%>;

  whiteBetween = <%% 36, 20, 24, 16, 1 %%>;
  whiteBoxHeight = <%% 200, 200, 180, 124, 20 %%>;
  whiteBoxMarginTop = <%% 40, 40, 40, 32, 6 %%>;
  whiteInnerPaddingLeft = <%% 60, 48, 36, 32, 6 %%>;

  whiteLogoWidth = <%% 190, 162, 190, 190, 190 %%>;
  whiteLogoTop = <%% (isMac() ? 2 : -1), (isMac() ? 2 : -1), (isMac() ? 2 : -1), (isMac() ? 2 : -1), 2 %%>;

  whiteInnerSize = <%% 22, 18, 17, 15, 4 %%>;
  whitePlusSize = <%% 32, 24, 23, 18, 5 %%>;
  whiteInnerWeight = <%% 600, 600, 600, 600, 600 %%>;
  whiteInnerBoldWeight = <%% 800, 800, 800, 800, 800 %%>;

  whiteInnerLineHeight = <%% 3, 3, 3, 3, 3 %%>;

  whiteLineWidth = <%% 40, 12, 64, 28, 4 %%>;
  whiteVerticalLineWidth = <%% 16, 8, 16, 8, 1 %%>;
  whiteVerticalLineHeight = <%% 64, 64, 52, 42, 6 %%>;

  noticeSize = <%% 12, 11, 10, 10, 2.5 %%>;
  noticeWeight = <%% 600, 600, 600, 600, 600 %%>;
  noticeBetween = <%% 3, 3, 3, 3, 1 %%>;
  noticeBoxBottom = <%% 18, 18, 18, 12, 30 %%>;

  imageWidth = <%% 504, 704, 570, 420, 82 %%>;
  imageHeight = <%% 290, 290, 260, 230, 45 %%>;
  imageBetween = <%% 12, 12, 12, 12, 12 %%>;
  imageLineInnerBetween = <%% 48, 40, 40, 32, 4 %%>;

  imageDescriptionPaddingTop = <%% 44, 44, 44, 36, 3 %%>;
  imagePartsWidth = <%% 125, 125, 110, 84, 21 %%>;

  imageTitleSize = <%% 22, 21, 18, 16, 4.4 %%>;
  imageTitleWeight = <%% 800, 800, 800, 800, 800 %%>;
  imageTitleMarginTop = <%% 20, 20, 16, 16, 1.5 %%>;
  imageDescriptionSize = <%% 14, 14, 13, 12, 3.2 %%>;
  imageDescriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  imageDescriptionMarginTop = <%% 10, 10, 10, 8, 2 %%>;
  imageDescriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  imageDescriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;

  imagePortfolioSize = <%% 11, 11, 11, 11, 3 %%>;
  imagePortfolioWeight = <%% 600, 600, 600, 600, 600 %%>;
  imagePortfolioArrowWidth = <%% 20, 20, 20, 20, 6 %%>;
  imagePortfolioArrowHeight = <%% 6, 6, 6, 6, 1.2 %%>;
  imagePortfolioArrowMarginLeft = <%% 6, 6, 6, 6, 2 %%>;
  imagePortfolioArrowTop = <%% 5, 5, 5, 5, 1.5 %%>;

  imageTagSize = <%% 12, 12, 12, 12, 3 %%>;
  imageTagWeight = <%% 500, 500, 500, 500, 500 %%>;

  imageBoxMarginTop = <%% 110, 84, 72, 65, 11 %%>;
  imageBoxMarginTopBig = <%% 190, 136, 112, 110, 31 %%>;

  moreBoxHeight = <%% 40, 40, 40, 40, 7 %%>;
  moreCircleWidth = <%% 8, 8, 8, 8, 1.8 %%>;
  moreCircleBetween = <%% 6, 6, 6, 6, 1.5 %%>;

  contents = {
    title: "스타일 파츠",
    sub: "스타일링과 자재의 만남",
    description: [
      "스타일 파츠는 톤보정 시공과 함께 인기 있는 4가지의 스타일에 맞는 자재 찾기처럼,",
      "<b%원하는 스타일에 맞게 디자이너와" + (desktop ? " " : "\n") + "자재 매칭%b>을 하여 현장을 만들어내는 서비스입니다. ",
    ],
    white: {
      main: [
        "홈리에종 홈스타일링",
        "+",
        "톤보정 시공",
        [
          "Basic set",
          "Simple set",
        ].join("\n"),
        [
          desktop ? ": 마루 + 도배 + 필름 + (다운라이트 + 중문)" : ": 마루 + 도배 + 필름",
          ": 도배 + 필름"
        ].join("\n")
      ],
      notice: [
        "아파트멘터리의 파츠 제품을 사용할 경우에만 스타일 파츠에 해당됩니다.",
        "도배 / 필름 한정 단품 시공도 준비되어 있어요!",
        "모든 서비스에는 홈리에종 스타일링 서비스가 필수로 포함됩니다.",
        "[ 아파트멘터리 파츠 자재 보기 ]",
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
            desktop ? "어두운 컬러의 필름지로 포인트 컬러들을 살려보세요!" : "어두운 컬러의 필름지로 공간의 포인트 컬러들을 효과적으로 살려보세요!",
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
            desktop ? "미드 센추리 모던 스타일을 극대화 시킬 수 있어요." : "멋지고 힙한 미드 센추리 모던 스타일을 극대화 시킬 수 있어요.",
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
            desktop ? "따뜻한 마루 컬러에 화이트 배경은 기본중의 기본이죠." : "따뜻한 마루 컬러에 화이트 배경은 기본중의 기본이죠. 다양한 가구 중 내 우드 가구톤에 맞추어 자재를 골라봐요!",
            desktop ? "다양한 가구 중 내 우드 가구톤에 맞추어 자재를 골라봐요!" : "",
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
            desktop ? "글램한 집을 원한다면, 기본 시공은 물론 조명으로" : "글램한 집을 원한다면, 기본 시공은 물론\n다운라이트 조명과 펜던트로 집을 확실히 밝혀주어 곳곳에 포인트를 주어요!",
            desktop ? "집을 확실히 밝혀주어 곳곳에 포인트를 주어요!" : "",
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
      color: colorChip.gray5,
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
    text: contents.description.join(desktop ? "\n" : " "),
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
      flexDirection: desktop ? "row" : "column",
      alignItems: "center",
      paddingLeft: String(whiteInnerPaddingLeft) + ea,
      paddingRight: String(whiteInnerPaddingLeft) + ea,
      width: desktop ? withOut(whiteInnerPaddingLeft * 2, ea) : String(82 - (whiteInnerPaddingLeft * 2)) + ea,
      height: desktop ? String(whiteBoxHeight) + ea : "",
      left: desktop ? "" : String(3) + ea,
      background: colorChip.white,
      boxShadow: "0px 3px 16px -9px " + colorChip.shadow,
      borderRadius: String(8) + "px",
      marginTop: String(whiteBoxMarginTop) + ea,
      paddingTop: desktop ? "" : String(6) + ea,
    },
    children: [
      {
        mode: "svg",
        source: svgBox.style.logo(colorChip.black),
        style: {
          display: (media[0] || media[1]) ? "inline-block" : "none",
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
          paddingLeft: (media[0] || media[1]) ? String(whiteBetween) + ea : "",
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
          display: desktop ? "inline-block" : "flex",
          flexDirection: desktop ? "" : "row",
          width: desktop ? String(whiteLineWidth) + ea : "",
          height: desktop ? String(0) : "",
          borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
          marginTop: desktop ? "" : String(1) + ea,
          marginBottom: desktop ? "" : String(7) + ea,
          alignItems: "center",
          justifyContent: "center",
        }
      },
      {
        style: {
          display: desktop ? "inline-block" : "none",
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
          display: desktop ? "inline-block" : "none",
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
          display: desktop ? "inline-block" : "none",
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
          display: desktop ? "inline-block" : "none",
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
          display: desktop ? "inline-block" : "block",
          position: "absolute",
          right: String(0),
          top: String(whiteBoxHeight + noticeBoxBottom) + ea,
        }
      }
    ]
  });

  if (mobile) {

    createNode({
      mother: whiteBox.children[4],
      style: {
        display: "inline-block",
        position: "relative",
        width: String(3) + ea,
        height: String(8) + ea,
        top: String(0.3) + ea,
        border: "1px solid " + colorChip.gray3,
        borderRight: "0px solid " + colorChip.gray3,
        borderTopLeftRadius: String(5) + "px",
        borderBottomLeftRadius: String(5) + "px",
        marginRight: String(3) + ea,
      }
    });

    createNode({
      mother: whiteBox.children[4],
      text: contents.white.main[3],
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(whiteInnerSize) + ea,
        fontWeight: String(500),
        color: colorChip.black,
        fontFamily: "graphik",
        lineHeight: String(1.8),
      }
    });

    createNode({
      mother: whiteBox.children[4],
      text: contents.white.main[4],
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(whiteInnerSize) + ea,
        fontWeight: String(600),
        color: colorChip.black,
        lineHeight: String(1.8),
        paddingLeft: String(5) + ea,
      }
    });

    createNode({
      mother: whiteBox.children[4],
      style: {
        display: "inline-block",
        position: "relative",
        width: String(3) + ea,
        height: String(8) + ea,
        top: String(0.3) + ea,
        border: "1px solid " + colorChip.gray3,
        borderLeft: "0px solid " + colorChip.gray3,
        borderTopRightRadius: String(5) + "px",
        borderBottomRightRadius: String(5) + "px",
        marginLeft: String(3) + ea,
      }
    });

  }


  num2 = 0;
  for (let n of contents.white.notice) {
    createNode({
      mother: whiteBox.lastChild,
      text: "* " + n,
      style: {
        display: "block",
        position: "relative",
        textAlign: "right",
        fontWeight: String(noticeWeight),
        color: num2 === contents.white.notice.length - 1 ? localColor.brown2 : localColor.brown0,
        fontSize: String(noticeSize) + ea,
        marginBottom: String(noticeBetween) + ea,
      }
    });
    num2++;
  }

  for (let i = 0; i < contents.image.main.length; i++) {
    if (contents.image.main[i].type === "left") {
      imageTong = createNode({
        mother: baseMother,
        style: {
          display: "flex",
          position: "relative",
          flexDirection: desktop ? "row" : "column",
          alignItems: "center",
          paddingBottom: String(imageLineInnerBetween) + ea,
          marginTop: String(i === 0 ? imageBoxMarginTopBig : imageBoxMarginTop) + ea,
          borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
        },
        children: [
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              width: String(imageWidth) + ea,
              height: String(imageHeight) + ea,
              verticalAlign: "top",
              borderRadius: String(5) + "px",
              backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[0] + "')",
              backgroundPosition: "50% 50%",
              backgroundSize: "100% auto",
              marginRight: media[0] ? String(imageBetween) + ea : (desktop ? String(imageLineInnerBetween) + ea : ""),
            }
          },
          {
            style: {
              display: media[0] ? "inline-block" : "none",
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
              display: desktop ? "inline-flex" : "block",
              flexDirection: "column",
              position: "relative",
              paddingTop: String(imageDescriptionPaddingTop) + ea,
              width: media[0] ? withOut(imageWidth + imageBetween + imageWidth + imageLineInnerBetween, ea) : (desktop ? withOut(imageWidth + imageLineInnerBetween, ea) : String(82) + ea),
              height: desktop ? String(imageHeight - imageDescriptionPaddingTop) + ea : "",
              verticalAlign: "top",
            },
            children: [
              {
                mode: "img",
                attribute: {
                  src: StylePartsJs.binaryPath + contents.image.main[i].parts,
                },
                style: {
                  display: desktop ? "block" : "inline-block",
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
                  display: desktop ? "block" : "inline-block",
                  position: "relative",
                  fontSize: String(imageDescriptionSize) + ea,
                  fontWeight: String(imageDescriptionWeight),
                  color: colorChip.black,
                  lineHeight: String(imageDescriptionLineHeight),
                  marginTop: String(imageDescriptionMarginTop) + ea,
                  marginLeft: desktop ? "" : String(5) + ea,
                  width: desktop ? "" : String(56) + ea,
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
                  position: desktop ? "absolute" : "relative",
                  bottom: String(0),
                  left: String(0),
                  marginTop: desktop ? "" : String(4) + ea,
                },
                children: [
                  {
                    text: "portfolio list",
                    event: {
                      click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                    },
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      fontSize: String(imagePortfolioSize) + ea,
                      fontWeight: String(imagePortfolioWeight),
                      fontFamily: "graphik",
                      fontStyle: "italic",
                      color: colorChip.black,
                      cursor: "pointer",
                    }
                  },
                  {
                    mode: "svg",
                    source: svgMaker.horizontalArrow(imagePortfolioArrowWidth, imagePortfolioArrowHeight, colorChip.black),
                    event: {
                      click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                    },
                    style: {
                      display: "inline-block",
                      verticalAlign: "top",
                      position: "relative",
                      width: String(imagePortfolioArrowWidth) + ea,
                      marginLeft: String(imagePortfolioArrowMarginLeft) + ea,
                      top: String(imagePortfolioArrowTop) + ea,
                      cursor: "pointer",
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
      if (desktop) {
        imageTong = createNode({
          mother: baseMother,
          style: {
            display: "flex",
            position: "relative",
            flexDirection: desktop ? "row" : "column",
            alignItems: "center",
            paddingBottom: String(imageLineInnerBetween) + ea,
            marginTop: String(imageBoxMarginTop) + ea,
            borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "column",
                position: "relative",
                paddingTop: String(imageDescriptionPaddingTop) + ea,
                width: media[0] ? withOut(imageWidth + imageBetween + imageWidth + imageLineInnerBetween, ea) : withOut(imageWidth + imageLineInnerBetween, ea),
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
                      event: {
                        click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                      },
                      style: {
                        display: "inline-block",
                        verticalAlign: "top",
                        position: "relative",
                        fontSize: String(imagePortfolioSize) + ea,
                        fontWeight: String(imagePortfolioWeight),
                        fontFamily: "graphik",
                        fontStyle: "italic",
                        color: colorChip.black,
                        cursor: "pointer",
                      }
                    },
                    {
                      mode: "svg",
                      source: svgMaker.horizontalArrow(imagePortfolioArrowWidth, imagePortfolioArrowHeight, colorChip.black),
                      event: {
                        click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                      },
                      style: {
                        display: "inline-block",
                        verticalAlign: "top",
                        position: "relative",
                        width: String(imagePortfolioArrowWidth) + ea,
                        marginLeft: String(imagePortfolioArrowMarginLeft) + ea,
                        top: String(imagePortfolioArrowTop) + ea,
                        cursor: "pointer",
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
                marginRight: media[0] ? String(imageBetween) + ea : "",
              }
            },
            {
              style: {
                display: media[0] ? "inline-block" : "none",
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
      } else {
        imageTong = createNode({
          mother: baseMother,
          style: {
            display: "flex",
            position: "relative",
            flexDirection: desktop ? "row" : "column",
            alignItems: "center",
            paddingBottom: String(imageLineInnerBetween) + ea,
            marginTop: String(i === 0 ? imageBoxMarginTopBig : imageBoxMarginTop) + ea,
            borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
          },
          children: [
            {
              style: {
                display: desktop ? "inline-block" : "block",
                position: "relative",
                width: String(imageWidth) + ea,
                height: String(imageHeight) + ea,
                verticalAlign: "top",
                borderRadius: String(5) + "px",
                backgroundImage: "url('" + StylePartsJs.binaryPath + contents.image.main[i].photo[0] + "')",
                backgroundPosition: "50% 50%",
                backgroundSize: "100% auto",
                marginRight: media[0] ? String(imageBetween) + ea : (desktop ? String(imageLineInnerBetween) + ea : ""),
              }
            },
            {
              style: {
                display: media[0] ? "inline-block" : "none",
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
                display: desktop ? "inline-flex" : "block",
                flexDirection: "column",
                position: "relative",
                paddingTop: String(imageDescriptionPaddingTop) + ea,
                width: media[0] ? withOut(imageWidth + imageBetween + imageWidth + imageLineInnerBetween, ea) : (desktop ? withOut(imageWidth + imageLineInnerBetween, ea) : String(82) + ea),
                height: desktop ? String(imageHeight - imageDescriptionPaddingTop) + ea : "",
                verticalAlign: "top",
              },
              children: [
                {
                  mode: "img",
                  attribute: {
                    src: StylePartsJs.binaryPath + contents.image.main[i].parts,
                  },
                  style: {
                    display: desktop ? "block" : "inline-block",
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
                    display: desktop ? "block" : "inline-block",
                    position: "relative",
                    fontSize: String(imageDescriptionSize) + ea,
                    fontWeight: String(imageDescriptionWeight),
                    color: colorChip.black,
                    lineHeight: String(imageDescriptionLineHeight),
                    marginTop: String(imageDescriptionMarginTop) + ea,
                    marginLeft: desktop ? "" : String(5) + ea,
                    width: desktop ? "" : String(56) + ea,
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
                    position: desktop ? "absolute" : "relative",
                    bottom: String(0),
                    left: String(0),
                    marginTop: desktop ? "" : String(4) + ea,
                  },
                  children: [
                    {
                      text: "portfolio list",
                      event: {
                        click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                      },
                      style: {
                        display: "inline-block",
                        verticalAlign: "top",
                        position: "relative",
                        fontSize: String(imagePortfolioSize) + ea,
                        fontWeight: String(imagePortfolioWeight),
                        fontFamily: "graphik",
                        fontStyle: "italic",
                        color: colorChip.black,
                        cursor: "pointer",
                      }
                    },
                    {
                      mode: "svg",
                      source: svgMaker.horizontalArrow(imagePortfolioArrowWidth, imagePortfolioArrowHeight, colorChip.black),
                      event: {
                        click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
                      },
                      style: {
                        display: "inline-block",
                        verticalAlign: "top",
                        position: "relative",
                        width: String(imagePortfolioArrowWidth) + ea,
                        marginLeft: String(imagePortfolioArrowMarginLeft) + ea,
                        top: String(imagePortfolioArrowTop) + ea,
                        cursor: "pointer",
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
      }
    }
    if (mobile) {
      imageTong.children[2].insertBefore(imageTong.children[2].children[1], imageTong.children[2].firstChild);
    }
  }

  createNode({
    mother: baseMother,
    text: contents.more.title,
    class: [ "hoverDefault_lite" ],
    event: {
      click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
    },
    style: {
      display: "block",
      position: "relative",
      fontSize: String(desktop ? imageTitleSize : 3.8) + ea,
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
    event: {
      click: (e) => { blankHref(FRONTHOST + "/portfolio.php"); }
    },
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
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, isMac } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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

  paddingTop = <%% 100, 100, 72, 64, 14 %%>;
  paddingLeft = <%% 100, 100, 72, 64, 7 %%>;

  titleSize = <%% 27, 26, 23, 21, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 4, 4, 4, 3, 1 %%>;

  subSize = <%% 15, 15, 14, 13, 3.5 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;

  contentsTongBetween = <%% 40, 40, 40, 32, 6 %%>;

  benefitLeftWidth = <%% 1040, 700, 585, 485, 82 %%>;
  benefitFactorBoxHeight = <%% 96, 80, 75, 60, 14 %%>;

  benefitNumberWidth = <%% 240, 160, 120, 100, 22 %%>;
  benefitNumberSize = <%% 30, 30, 26, 23, 5 %%>;
  benefitNumberWeight = <%% 500, 500, 500, 500, 500 %%>;

  benefitFactorPaddingLeft = <%% 30, 30, 28, 24, 6 %%>;
  benefitFactorWidth = <%% 720, 480, 400, 330, 82 %%>;
  benefitFactorHeight = <%% 64, 60, 50, 42, 12 %%>;

  benefitFactorSize = <%% 20, 18, 15, 13, 3.8 %%>;
  benefitFactorWeight = <%% 700, 700, 700, 700, 700 %%>;
  benefitFactorTextTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.1 %%>;

  descriptionSize = <%% 14, 14, 13, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionTop = <%% -10, -10, -10, -10, -10 %%>;

  contents = {
    title: "고객님들을 위한 혜택",
    sub: "스타일 파츠 이용 고객 대상",
    benefits: [
      [ "One", desktop ? "아파트멘터리 mms를 통한 계약 고객 디자인비 5% 할인 혜택" : "아파트멘터리 mms를 통한 고객 5% 할인 혜택" ],
      [ "Two", desktop ? "Parts 자재 사용 및 홈리에종 시공사 이용 시 추가 상품권 증정" : "Parts 사용, 홈리에종 시공사 이용 시 상품권" ],
      [ "Three", desktop ? "블로그 / 유튜브 촬영 등 서비스 후기 작성시 상품권 증정" : "블로그, 유튜브 등 후기 작성시 상품권 증정" ],
    ],
    description: [
      "스타일 파츠를 이용하시는 <b%모든 고객님들께",
      big ? "홈리에종은 위와 같은 3가지 혜택을 제공%b>해드립니다." : "홈리에종은 3가지 혜택을 제공%b>해드립니다.",
      "오직 스타일 파츠만을 위한 혜택들을 통해",
      big ? "좋은 기회에 좋은 가격으로 인테리어를 진행해보세요!" : "좋은 기회로 인테리어를 진행해보세요!",
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
      left: desktop ? String(-1 * ((window.innerWidth - standardWidth) / 2)) + ea : String(-6) + ea,
      width: desktop ? String(window.innerWidth - ((window.innerWidth - standardWidth) / 2)) + ea : String(100) + ea,
      height: withOut(0, ea),
      background: colorChip.darkDarkShadow,
      borderTopRightRadius: desktop ? String(8) + "px" : "",
      borderBottomRightRadius: desktop ? String(8) + "px" : "",
    }
  });

  contentsBase = createNode({
    mother: baseMother,
    style: {
      display: "block",
      width: withOut(0, ea),
      position: "relative",
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop - (<&& 6 | 6 | 0 | 0 | 0 &&>)) + ea,
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
      flexDirection: desktop ? "row" : "column",
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
      left: desktop ? "" : String(3) + ea,
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
            display: desktop ? "inline-block" : "none",
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
            justifyContent: desktop ? "left" : "center",
            alignItems: "center",
            paddingLeft: desktop ? String(benefitFactorPaddingLeft) + ea : "",
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
      width: desktop ? withOut(benefitLeftWidth, ea) : String(82) + ea,
      left: desktop ? "" : String(3) + ea,
      paddingTop: desktop ? "" : String(3) + ea,
      textAlign: desktop ? "" : "center",
    },
    children: [
      {
        text: contents.description.join(desktop ? "\n" : " "),
        style: {
          display: desktop ? "inline-block" : "block",
          position: "relative",
          fontSize: String(descriptionSize) + ea,
          fontWeight: String(descriptionWeight),
          color: colorChip.white,
          lineHeight: String(descriptionLineHeight),
          top: desktop ? String(descriptionTop) + ea : "",
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
  const { createNode, withOut, colorChip, cleanChildren, selfHref, ajaxJson, svgMaker, isMac, blankHref } = GeneralJs;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
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
  let careSize, carePaddingTop;
  let processImageWidth;
  let subDescriptionMarginBottom;
  let belowArrowWidth, belowArrowHeight;
  let buttonWidth, buttonHeight, buttonMarginTop;
  let buttonSize, buttonWeight, buttonTextTop;
  let noticeSize, noticeMarginTop;
  let faqButtonWidth, faqButtonHeight;
  let faqSize, faqWeight, faqPaddingBottom;

  paddingTop = <%% 200, 160, 130, 100, 14 %%>;

  titleSize = <%% 27, 26, 23, 21, 5.1 %%>;
  titleWeight = <%% 800, 800, 800, 800, 800 %%>;
  titlePaddingBottom = <%% 4, 4, 4, 3, 1 %%>;

  subSize = <%% 15, 15, 14, 13, 3.5 %%>;
  subWeight = <%% 400, 400, 400, 400, 400 %%>;

  descriptionBoxPaddingTop = <%% 28, 24, 21, 18, 4 %%>;
  imageBoxPaddingTop = <%% 28, 24, 24, 24, 3 %%>;
  barBoxPaddingTop = <%% 2, 2, 2, 2, 2 %%>;

  descriptionSize = <%% 15, 14, 13, 12, 3.2 %%>;
  descriptionWeight = <%% 400, 400, 400, 400, 400 %%>;
  descriptionBoldWeight = <%% 700, 700, 700, 700, 700 %%>;
  descriptionLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  descriptionPaddingLeft = <%% 36, 36, 36, 36, 4 %%>;
  descriptionLineBottom = <%% 36, 36, 31, 29, 4 %%>;

  careSize = <%% 20, 18, 16, 15, 3.5 %%>;
  carePaddingTop = <%% 60, 54, 50, 40, 8 %%>;

  processImageWidth = <%% 1300, 1050, 900, 720, 82 %%>;
  subDescriptionMarginBottom = <%% 24, 24, 24, 24, 3 %%>;

  belowArrowWidth = <%% 12, 12, 12, 12, 3 %%>;
  belowArrowHeight = <%% 240, 240, 240, 240, 25 %%>;

  buttonWidth = <%% 140, 140, 130, 110, 24 %%>;
  buttonHeight = <%% 56, 56, 50, 42, 10 %%>;
  buttonMarginTop = <%% 20, 20, 16, 20, 4 %%>;
  buttonSize = <%% 20, 20, 18, 16, 3.8 %%>;
  buttonWeight = <%% 700, 700, 700, 700, 700 %%>;
  buttonTextTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.6 %%>;

  noticeSize = <%% 13, 13, 12, 10, 2.5 %%>;
  noticeMarginTop = <%% 120, 120, 120, 90, 13 %%>;

  faqButtonWidth = <%% 120, 120, 120, 120, 24 %%>;
  faqButtonHeight = <%% 36, 36, 36, 36, 36 %%>;

  faqSize = <%% 15, 15, 14, 13, 3.2 %%>;
  faqWeight = <%% 700, 700, 700, 700, 700 %%>;
  faqPaddingBottom = <%% (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), (isMac() ? 2 : 0), 2 %%>;

  contents = {
    title: "스타일링 프로세스",
    sub: "디자이너는 디자인에 집중하세요",
    description: [
      "홈리에종의 스타일링 서비스는 한 명의 디자이너와 우리집 시공부터",
      "홈스타일링까지 전 과정을 함께 합니다. 디자이너와의 프로젝트가 잘 진행될 수",
      "있도록 <b%홈리에종이 프로젝트 케어를 제공%b>합니다.",
    ],
    subDescription: [
      "홈리에종 서비스는 보편 상담부터 가구 배치가 완료되는 과정은 <b%보편 1달 반 정도의 기간이 소요%b>됩니다.",
      "상담 문의는 소요되는 기간을 고려하여 서비스 신청 시, 디자이너의 선택 폭이 넓어집니다.",
    ],
    care: "홈리에종 케어",
    process: (<&& "/process0.png" | "/process0.png" | "/process0.png" | "/process2.png" | "/process3.png" &&>),
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
    ],
    faq: "홈리에종 FAQ",
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
      color: colorChip.gray5,
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
      display: desktop ? "block" : "none",
      position: "absolute",
      height: String(0) + ea,
      width: withOut(0, ea),
      bottom: String(descriptionLineBottom) + ea,
      borderBottom: "1px solid " + colorChip.gray3,
    }
  });

  createNode({
    mother: descriptionBox,
    text: contents.description.join(desktop ? "\n" : " "),
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
    text: contents.care,
    style: {
      display: "block",
      position: "relative",
      fontSize: String(careSize) + ea,
      fontWeight: String(titleWeight),
      color: localColor.brown2,
      width: withOut(0, ea),
      textAlign: "center",
      paddingTop: String(carePaddingTop) + ea,
      paddingBottom: String(desktop ? titlePaddingBottom : 2) + ea,
    }
  });

  createNode({
    mother: baseMother,
    mode: "img",
    attribute: {
      src: StylePartsJs.binaryPath + contents.process,
    },
    style: {
      display: "block",
      position: "relative",
      width: String(processImageWidth) + ea,
    }
  });


  createNode({
    mother: baseMother,
    text: contents.subDescription.join(desktop ? "\n" : " "),
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
      marginBottom: String(subDescriptionMarginBottom) + ea,
      marginTop: desktop ? "" : String(4) + ea,
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
    source: svgMaker.verticalArrow(belowArrowWidth, belowArrowHeight, localColor.brown2),
    style: {
      display: "block",
      position: "relative",
      width: String(belowArrowWidth) + ea,
    }
  })

  createNode({
    mother: baseMother,
    class: [ "hoverDefault_lite" ],
    event: {
      click: (e) => { blankHref(FRONTHOST + "/consulting.php") }
    },
    style: {
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      width: String(buttonWidth) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: localColor.brown2,
      marginTop: String(buttonMarginTop) + ea,
    },
    children: [
      {
        text: contents.button,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(buttonSize) + ea,
          fontWeight: String(buttonWeight),
          color: colorChip.white,
          top: String(buttonTextTop) + ea,
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
      fontSize: String(noticeSize) + ea,
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
      marginTop: String(noticeMarginTop) + ea,
    },
    bold: {
      fontSize: String(descriptionSize) + ea,
      fontWeight: String(descriptionBoldWeight),
      color: colorChip.black,
    },
    children: [
      {
        text: contents.faq,
        class: [ "hoverDefault_lite" ],
        event: {
          click: (e) => { blankHref(FRONTHOST + "/faq.php") }
        },
        style: {
          display: desktop ? "inline-flex" : "none",
          position: "absolute",
          width: String(faqButtonWidth) + ea,
          height: String(faqButtonHeight) + ea,
          borderRadius: String(5) + "px",
          background: localColor.brown2,
          fontSize: String(faqSize) + ea,
          fontWeight: String(faqWeight),
          color: colorChip.white,
          justifyContent: "center",
          alignItems: "center",
          bottom: String(descriptionPaddingLeft) + ea,
          right: String(descriptionPaddingLeft) + ea,
          paddingBottom: String(faqPaddingBottom) + ea,
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

    window.addEventListener("resize", (e) => {
      window.location.reload();
    });

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
