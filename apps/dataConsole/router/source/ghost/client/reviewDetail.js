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
      "return ('홈리에종 고객 리뷰 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 고객 리뷰 디테일 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "reviewDetail",
  "route": [
    "reviewDetail",
    "RD"
  ]
} %/%/g

const ReviewDetailJs = function () {
  this.mother = new GeneralJs();
}

ReviewDetailJs.binaryPath = "/middle/review";

ReviewDetailJs.prototype.reviewMainBox = function () {
  const instance = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  const { totalContents, naviHeight, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainHeight;
  let mainTong;
  let mainBelowBarHeight;
  let contentsBox;
  let pictureWidth, pictureHeight;
  let picture;
  let bottomVisual;
  let photoRightMargin;
  let textTong;

  mainHeight = 800;
  mainBelowBarHeight = 250;

  contentsBoxTop = 70;
  contentsBoxWidth = 1200;

  bottomVisual = 8;

  pictureWidth = 820;
  pictureHeight = mainHeight - (contentsBoxTop * 2) - bottomVisual;

  photoRightMargin = 45;

  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      background: colorChip.gray0,
      paddingTop: String(naviHeight) + ea,
      height: String(mainHeight) + ea,
    },
    children: [
      {
        style: {
          position: "absolute",
          background: colorChip.gray1,
          bottom: String(0),
          left: String(0),
          height: String(mainBelowBarHeight) + ea,
          width: String(100) + '%',
        }
      }
    ]
  });

  contentsBox = createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(contentsBoxTop) + ea,
      width: String(contentsBoxWidth) + ea,
      left: "calc(50% - " + String(contentsBoxWidth / 2) + ea + ")",
      top: String(0),
      height: String(mainHeight - (contentsBoxTop * 2)) + ea,
    }
  });

  picture = createNode({
    mother: contentsBox,
    style: {
      display: "inline-block",
      width: String(pictureWidth) + ea,
      height: String(pictureHeight) + ea,
      borderRadius: String(5) + ea,
      boxShadow: "0px 8px 22px -15px " + colorChip.shadow,
      marginRight: String(photoRightMargin) + ea,
      verticalAlign: "top",
    }
  });

  textTong = createNode({
    mother: contentsBox,
    style: {
      display: "inline-block",
      width: withOut(pictureWidth + photoRightMargin, ea),
      height: String(pictureHeight) + ea,
      verticalAlign: "top",
    }
  });

  createNode({
    mother: textTong,
    text: "review ",
    style: {
      display: "block",
      textAlign: "right",
      fontSize: String(16) + ea,
      fontWeight: String(400),
      fontFamily: "graphik",
      color: colorChip.green
    }
  })


}

ReviewDetailJs.prototype.launching = async function (loading) {
  const instance = this;
  const { returnGet, ajaxJson, setQueue, setDebounce } = GeneralJs;
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
    const { pid } = getObj;
    let response;

    if (typeof pid !== "string") {
      throw new Error("invaild pid");
    }

    response = await ajaxJson({ mode: "review", pid }, LOGHOST + "/getContents", { equal: true });
    this.contentsArr = new SearchArray(response.contentsArr);
    this.clients = new SearchArray(response.clients);
    this.projects = new SearchArray(response.projects);
    this.designers = new SearchArray(response.designers);
    this.fullLoad = false;
    this.photoLoad = false;
    this.loadedContents = [];

    console.log(response);

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "reviewDetail",
      client: null,
      base: {
        instance: this,
        binaryPath: ReviewDetailJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 2,
      },
      local: async () => {
        try {


          instance.reviewMainBox();



        } catch (e) {
          await GeneralJs.ajaxJson({ message: "ReviewDetailJs.launching.ghostClientLaunching : " + e.message }, "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    setQueue(() => {
      ajaxJson({ mode: "review" }, LOGHOST + "/getContents", { equal: true }).then((response) => {
        instance.contentsArr = new SearchArray(response.contentsArr);
        instance.clients = new SearchArray(response.clients);
        instance.projects = new SearchArray(response.projects);
        instance.designers = new SearchArray(response.designers);
        instance.fullLoad = true;
      }).catch((err) => {
        console.log(err);
      });
    });

  } catch (err) {
    console.log(err);
    window.alert("잘못된 접근입니다!");
    await ajaxJson({ message: "ReviewDetailJs.launching 에러 일어남 => " + err.message }, "/errorLog");
  }
}
