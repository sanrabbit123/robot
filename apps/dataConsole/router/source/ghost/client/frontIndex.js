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
      "return ('디자이너 상세 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 협업 디자이너 상세 내용 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontIndex",
  "route": [
    "frontIndex",
    "DD"
  ]
} %/%/g

const FrontIndexJs = function () {
  this.mother = new GeneralJs();
}

FrontIndexJs.binaryPath = "/middle/designer";

FrontIndexJs.prototype.generateGsArray = function (number) {
  if (typeof number !== "number") {
    throw new Error("invaild input");
  }
  const instance = this;
  const standard = [
    'g', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
    's', 's', 's', 's',
    's', 's', 's', 's',
    's', 's', 'g',
  ];
  let additional;
  let add;
  let multi;
  let result;
  additional = number % standard.length;
  add = standard.slice(0, additional);
  multi = Math.floor(number / standard.length);
  result = [];
  for (let i = 0; i < multi; i++) {
    result = result.concat(JSON.parse(JSON.stringify(standard)));
  }
  result = result.concat(add);
  return result;
}

FrontIndexJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media, totalContents, standardWidth } = this;
  const { indexArr } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const photoChar = 'b';
  let naviHeight;
  let mainHeight;
  let mainTong;
  let photoTong;
  let randomIndex;
  let randomNumber;
  let random;
  let src;

  naviHeight = 72;
  mainHeight = 800;

  randomNumber = 5;


  randomIndex = [];
  while (randomIndex.length < randomNumber) {
    random = Math.floor(Math.random() * indexArr.length);
    if (!randomIndex.includes(random)) {
      randomIndex.push(random);
    }
  }
  randomIndex = randomIndex.map((index) => {
    return indexArr[index];
  });

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(naviHeight) + ea,
      height: String(mainHeight) + ea,
    }
  });

  photoTong = createNode({
    mother: mainTong,
    style: {
      position: "relative",
      width: String(standardWidth) + ea,
      left: "calc(50% - " + String(standardWidth / 2) + ea + ")",
      height: String(mainHeight) + ea,
    }
  })

  for (let i = 0; i < randomIndex.length; i++) {
    src = "https://" + GHOSTHOST + "/corePortfolio/listImage/" + randomIndex[i].contents.portfolio.pid + "/" + photoChar + String(randomIndex[i].contents.portfolio.detailInfo.photodae[1]) + randomIndex[i].contents.portfolio.pid + ".jpg";
    createNode({
      mother: photoTong,
      style: {
        position: "absolute",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        backgroundImage: "url('" + src + "')",
        backgroundPosition: "50% 68%",
        backgroundSize: "100% auto",
        opacity: String(i !== randomIndex.length - 1 ? 0 : 1),
      }
    });

  }





}

FrontIndexJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce, serviceParsing } = GeneralJs;
  try {
    this.mother.setGeneralProperties(this);

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const getObj = returnGet();
    let response, services;

    services = serviceParsing().name;
    response = await ajaxJson({ mode: "index" }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.reviewArr = new SearchArray(response.reviewArr);
    this.indexArr = new SearchArray(response.indexArr);
    this.totalContents = document.getElementById("totalcontents");

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontIndex",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontIndexJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {
          instance.insertInitBox();
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontIndexJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await ajaxJson({ message: "FrontIndexJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
