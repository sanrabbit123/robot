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
      "return (thisPerson.name + ' 고객님 서비스 안내 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 서비스 안내 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "styleCuration",
  "route": [
    "curation",
    "SC"
  ]
} %/%/g

class StyleCurationWordings {
  constructor() {
    this.wordings = {
      init: {
        title: [
          "홈리에종",
          "큐레이션",
        ],
        contents: [
          [
            "홈리에종은 체계화된 정보과 취향 분석 기능을",
            "활용해서 <b%고객님의 스타일과 조건에 딱 맞는%b>",
            "<b%서비스를 제안하고, 디자이너를 추천%b>해드립니다.",
          ],
          [
            "아래 간단한 상세 큐레이팅 설문에 응답해주시면",
            "<b%예상 서비스 및 서비스 금액%b>을 알려드릴 수 있으니,",
            "작성 부탁드립니다. 감사합니다!",
          ]
        ]
      },
      center: [
        {
          name: "style",
          title: "스타일",
          callback: "styleCheck",
          children: []
        },
        {
          name: "space",
          title: "공간",
          callback: "blockCheck",
          children: [
            {
              type: "address",
              half: false,
              question: [
                "<b%스타일링 받으실 곳의 주소가 맞나요?%b>",
                "아니라면, 스타일링 받을 곳으로 고쳐주세요!"
              ],
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "해당 거주지의 <b%건물 유형%b>을 알려주세요!"
              ],
              items: [
                "아파트",
                "오피스텔",
                "타운하우스",
                "빌라",
                "단독 주택"
              ],
              multiple: false,
              exception: function (items, media) {
                const ea = "px";
                let padding, subtract;
                padding = Number(items[4].style.paddingLeft.replace(/[^0-9\.\-]/g, ''));
                subtract = items[2].getBoundingClientRect().width - items[4].getBoundingClientRect().width;
                items[4].style.width = String(items[2].getBoundingClientRect().width - padding) + ea;
                items[4].children[1].style.left = String(Number(items[4].children[1].style.left.replace(/[^0-9\.\-]/g, '')) + subtract) + ea;
              }
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "적어주신 <b%평수가 분양 면적 기준%b>이 맞나요?"
              ],
              items: [
                "아파트",
                "오피스텔",
                "타운하우스",
                "빌라",
                "단독 주택"
              ],
              multiple: false,
              exception: function (items, media) {
                const ea = "px";
                let padding, subtract;
                padding = Number(items[4].style.paddingLeft.replace(/[^0-9\.\-]/g, ''));
                subtract = items[2].getBoundingClientRect().width - items[4].getBoundingClientRect().width;
                items[4].style.width = String(items[2].getBoundingClientRect().width - padding) + ea;
                items[4].children[1].style.left = String(Number(items[4].children[1].style.left.replace(/[^0-9\.\-]/g, '')) + subtract) + ea;
              }
            },
          ]
        },
        {
          name: "furniture",
          title: "가구",
          callback: "blockCheck",
          children: [
            {
              type: "opposite",
              half: false,
              question: [
                "가구와 소품의 <b%기존 제품 구매와 재사용의%b>",
                "<b%비율%b>을 알려주세요!"
              ],
              items: [
                "재사용",
                "새로 구입",
              ],
              total: 100,
              ea: '%',
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "<b%맞춤형 제작 가구 니즈%b>가 있으신가요?"
              ],
              items: [
                "있다",
                "없다",
                "모르겠다",
              ],
              multiple: false,
              notice: "맞춤형 제작 가구 : 신발장, 붙박이장 등, 디자인 제작 가구 : 거실장, 서재 책장, 윈도우 시트 등",
            },
            {
              type: "checkbox",
              half: true,
              question: [
                "<b%커튼, 베딩 패브릭 제작 니즈%b>가 있으신가요?"
              ],
              items: [
                "있다",
                "없다",
                "모르겠다",
              ],
              multiple: false,
            },
          ]
        },
        {
          name: "construct",
          title: "시공",
          callback: "blockCheck",
          children: [
            {
              type: "checkbox",
              half: false,
              question: [
                "<b%생각하는 시공 정도%b>를 알려주세요!",
              ],
              multiple: true,
              items: [
                "시공 없이 홈퍼니싱만",
                "5개 이내의 부분 시공과 홈퍼니싱",
                "전체 리모델링과 전체 스타일링",
                "구조 변경을 포함한 고급 시공"
              ],
              exception: function (items, media) {
                const mother = items[0].parentNode;
                const grandMother = mother.parentNode;
                const ratio = 30;
                grandMother.firstChild.style.width = String(ratio) + '%';
                grandMother.lastChild.style.width = String(100 - ratio) + '%';
              }
            },
            {
              type: "list",
              half: false,
              question: [
                "생각하고 있는 <b%시공이 있으시다면 체크%b>해주세요!"
              ],
              items: [
                { name: "철거", contents: "마감재, 벽지 등 일부" },
                { name: "전기/조명 공사", contents: "배선, 이동추가, 조명 교체" },
                { name: "설비", contents: "수도/배관, 난방, 에어컨 배관" },
                { name: "주방 공사", contents: "싱크 등 주방 가구 전체 교체" },
                { name: "창호 공사", contents: "방문, 중문" },
                { name: "도장 공사", contents: "부분 페인팅, 탄성코트 등" },
                { name: "바닥 공사", contents: "마루, 타일, 장판 등" },
                { name: "금속 공사", contents: "" },
                { name: "목공사", contents: "간접등 박스, 웨인스 코팅 등" },
                { name: "욕실 공사", contents: "도기 교체 등" },
                { name: "샤시", contents: "" },
                { name: "필름 공사", contents: "면적 및 난이도에 따라 금액 상이" },
                { name: "철거", contents: "마감재, 벽지 등 일부" },
                { name: "발코니 확장", contents: "거실, 주방, 방 등 확장 예정 발코니" },
                { name: "타일 공사", contents: "현관, 주방, 다용도실, 발코니 등" },
                { name: "도배 공사", contents: "이전 상태에 따라 밑작업 난이도 상이" },
              ],
              multiple: true,
            },
            {
              type: "checkbox",
              half: false,
              question: [
                "시공 당일에 예상되는 <b%주거 환경을 알려주세요!%b>"
              ],
              items: [
                "거주중, 가구가 있는 상태",
                "공실 상태",
              ],
              multiple: false,
              notice: "거주중일 경우 시공에 한계가 있습니다."
            },
          ]
        },
      ],
      pannel: {
        button: "서비스 금액 알아보기"
      }
    };

  }

  get initWordings() {
    return this.wordings.init;
  }

  get centerWordings() {
    return this.wordings.center;
  }

  get pannelWordings() {
    return this.wordings.pannel;
  }
}

Set.prototype.intersection = function(setB) {
  let intersection = new Set();
  for (let elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

Set.prototype.union = function(setB) {
  let union = new Set(this);
  for (let elem of setB) {
    union.add(elem);
  }
  return union;
}

const StyleCurationJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

StyleCurationJs.binaryPath = "/middle/curation";

StyleCurationJs.randomPick = function (photos, contentsArr, pictureNumber, roomsIntersection = false) {
  if (typeof photos !== "object" || typeof contentsArr !== "object" || typeof pictureNumber !== "number" || typeof roomsIntersection !== "boolean") {
    throw new Error("invaild input");
  }
  const photoLength = photos.length;
  const conidArr = Array.from(new Set(photos.map((obj) => { return obj.conid })));
  const standard = 50;
  let randoms;
  let randomPick, contentsPick;
  let temp, temp2, tempArr;
  let rooms, room;
  let accumulation;
  let num, num2;

  num2 = 0;
  do {
    if (num >= standard) {
      break;
    }
    do {
      temp = [];
      num = 0;
      while (num < standard + pictureNumber) {
        if (temp.length === pictureNumber) {
          break;
        }
        temp2 = Math.floor(Math.random() * conidArr.length);
        if (num < standard) {
          if (!temp.includes(temp2) && conidArr.length >= temp2) {
            temp.push(temp2);
          }
        } else {
          if (conidArr.length >= temp2) {
            temp.push(temp2);
          }
        }
        num++;
      }
      temp.sort((a, b) => { return a - b; });
      randoms = [];
      for (let n of temp) {
        randoms.push(conidArr[n]);
      }
      contentsPick = [];
      for (let conid of randoms) {
        for (let obj of contentsArr) {
          if (conid === obj.conid) {
            contentsPick.push(obj);
          }
        }
      }
      rooms = [];
      for (let obj of contentsPick) {
        tempArr = [];
        for (let { title } of obj.contents.portfolio.contents.detail) {
          if (title !== "init") {
            tempArr.push(title);
          }
        }
        rooms.push(tempArr);
      }
      accumulation = [];
      for (let arr of rooms) {
        tempArr = [];
        for (let a of arr) {
          if (roomsIntersection) {
            if (!accumulation.includes(a)) {
              tempArr.push(a);
            }
          } else {
            tempArr.push(a);
          }
        }
        if (tempArr.length > 0) {
          room = tempArr[Math.floor(Math.random() * tempArr.length)];
          accumulation.push(room);
        }
      }
    } while (accumulation.length !== randoms.length);
    randomPick = [];
    for (let i = 0; i < randoms.length; i++) {
      for (let obj of photos) {
        if (obj.conid === randoms[i] && obj.room === accumulation[i] && obj.gs === 'g') {
          randomPick.push(obj);
          break;
        }
      }
    }
    num2++;
  } while (randomPick.length !== pictureNumber);
  return randomPick;
}

StyleCurationJs.photoFilter = function (photos, picks) {
  if (typeof photos !== "object" || !Array.isArray(picks)) {
    throw new Error("invaild input");
  }
  if (picks.length < 3) {
    throw new Error("invaild picks");
  }
  const ratio = 0.7;
  const [ pick0, pick1, pick2 ] = picks;
  let threePick;
  let set0, set1, set2;
  let tendencyMatrix;
  let files;

  files = [];
  for (let obj of picks) {
    files.push(obj.file);
  }

  set0 = new Set(pick0.keywords);
  set1 = new Set(pick1.keywords);
  set2 = new Set(pick2.keywords);

  threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)));
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set0));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set1));
  }
  if (threePick.length < 5) {
    threePick = Array.from(set0.intersection(set1).union(set0.intersection(set2)).union(set1.intersection(set2)).union(set2));
  }

  photos = photos.filter((obj) => { return obj.keywords.some((s) => { return threePick.includes(s); }) });
  photos = photos.filter((obj) => { return !files.includes(obj.file); });

  tendencyMatrix = new Array(pick0.tendency.length);
  for (let i = 0; i < tendencyMatrix.length; i++) {
    tendencyMatrix[i] = Math.round(((pick0.tendency[i] + pick1.tendency[i] + pick2.tendency[i]) / 3) * 100) / 100;
  }

  photos.sort((a, b) => {
    const length = tendencyMatrix.length;
    let sum0, sum1;
    sum0 = 0;
    sum1 = 0;
    for (let i = 0; i < length; i++) {
      sum0 += Math.abs(a.tendency[i] - tendencyMatrix[i]);
      sum1 += Math.abs(b.tendency[i] - tendencyMatrix[i]);
    }
    sum0 = sum0 / length;
    sum1 = sum1 / length;
    return sum0 - sum1;
  });

  return photos.slice(0, Math.floor(photos.length * ratio));
}

StyleCurationJs.prototype.styleCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, cleanChildren } = GeneralJs;
  const { photos, contentsArr, designers } = this;
  const pictureNumber = 12;
  const columnNumber = 4;
  const pictureRatio = (297 / 210);
  let randomPick, targetPhotos;
  let pictureBox;
  let innerMargin;
  let pictureMargin;

  innerMargin = 25;
  pictureMargin = 8;

  cleanChildren(mother);

  randomPick = StyleCurationJs.randomPick(photos, contentsArr, pictureNumber);
  this.randomPick = randomPick;
  targetPhotos = randomPick.map((obj) => { return S3HOST + obj.path; });

  mother.style.paddingTop = String(innerMargin) + ea;
  pictureBox = createNode({
    mother,
    style: {
      display: "block",
      position: "relative",
      marginLeft: String(innerMargin) + ea,
      width: withOut(innerMargin * 2, ea),
    }
  });

  for (let i = 0; i < pictureNumber; i++) {
    createNode({
      mother: pictureBox,
      mode: "img",
      class: [ "hoverDefault_lite" ],
      attribute: [
        { src: targetPhotos[i], },
        { index: String(i) },
      ],
      events: [
        {
          type: "click",
          event: function (e) {
            const index = Number(this.getAttribute("index"));
            const mother = this.parentNode;
            const motherRect = mother.getBoundingClientRect();
            const rect = this.getBoundingClientRect();
            let radius, circleVisual;
            radius = 22;
            circleVisual = 4;
            createNode({
              mother,
              attribute: [
                { file: instance.randomPick[index].file }
              ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = this.getAttribute("file");
                    let index;
                    index = null;
                    for (let i = 0; i < instance.selectPhotos.length; i++) {
                      if (instance.selectPhotos[i].file === file) {
                        index = i;
                        break;
                      }
                    }
                    if (index !== null) {
                      instance.selectPhotos.splice(index, 1);
                    }
                    mother.removeChild(this);
                  },
                }
              ],
              style: {
                position: "absolute",
                width: String(rect.width) + ea,
                height: String(rect.height) + ea,
                top: String(rect.top - motherRect.top) + ea,
                left: String(rect.left - motherRect.left) + ea,
                borderRadius: String(3) + "px",
                animation: "justfadeinoriginal 0.2s ease forwards",
                cursor: "pointer",
                overflow: "hidden",
                background: colorChip.green,
                "mix-blend-mode": "multiply",
              },
              children: [
                {
                  mode: "svg",
                  source: instance.mother.returnCheckCircle(colorChip.white),
                  style: {
                    position: "absolute",
                    width: String(radius * 2) + ea,
                    top: withOut(50, radius + circleVisual, ea),
                    left: withOut(50, radius, ea),
                  }
                }
              ]
            });
            instance.selectPhotos.push(instance.randomPick[index]);
            if (instance.selectPhotos.length >= 3) {
              instance.photos = StyleCurationJs.photoFilter(instance.photos, instance.selectPhotos);
              instance.selectPhotos = [];
              instance.styleCheck(mother.parentNode);
            }
          }
        }
      ],
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(100% - " + String(pictureMargin * (columnNumber - 1)) + ea + ") / " + String(columnNumber) + ")",
        height: "auto",
        borderRadius: String(3) + "px",
        marginRight: String(i % columnNumber === 3 ? 0 : pictureMargin) + ea,
        marginBottom: String(pictureMargin) + ea,
      }
    });
  }

}

StyleCurationJs.prototype.blockCheck = function (mother, wordings, name) {
  const instance = this;
  const { client, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  const token = '_';
  let wordingSize;
  let paddingTop, paddingBottom, marginLeft;
  let blockMother, block;
  let questionMargin;
  let questionArea, answerArea;
  let questionRatio;
  let qWidth;
  let num;
  let lineHeight;
  let blockMargin;
  let addressWordingSize;
  let addressWordingTextTop;
  let addressBottomLineHeight;
  let itemDoms;
  let itemPaddingLeft, itemMarginBottom;
  let itemRadius, itemCircleLeft, itemCircleTop;
  let y, z;
  let barTop, barHeight;
  let barTextTop;
  let bar, barText0, barText1;
  let barTextMargin;
  let barLeft;
  let standardSize;
  let barBox;
  let barClone;
  let barMotherHeight;
  let barButtonTop;
  let barButtonRadius;
  let barButton;
  let thisName;

  lineHeight = 1.6;

  wordingSize = <%% 15, 15, 15, 13, 15 %%>;
  standardSize = <%% 13, 13, 13, 13, 13 %%>;

  paddingTop = <%% 25, 25, 25, 25, 25 %%>;
  paddingBottom = <%% 31, 31, 31, 31, 31 %%>;
  marginLeft = <%% 33, 33, 33, 33, 33 %%>;
  questionMargin = <%% 30, 30, 30, 30, 30 %%>;
  blockMargin = <%% 19, 19, 19, 19, 19 %%>;
  qWidth = <%% 19, 19, 19, 19, 19 %%>;

  addressWordingTextTop = <%% -1, -1, -1, -1, -1 %%>;
  addressWordingSize = <%% 22, 22, 22, 22, 22 %%>;
  addressBottomLineHeight = <%% 38, 38, 38, 38, 38 %%>;

  itemPaddingLeft = <%% 40, 40, 40, 40, 40 %%>;
  itemMarginBottom = <%% 5, 5, 5, 5, 5 %%>;

  itemRadius = <%% 3, 3, 3, 3, 3 %%>;
  itemCircleLeft = <%% -5, -5, -5, -5, -5 %%>;
  itemCircleTop = <%% 7, 7, 7, 7, 7 %%>;

  barTop = <%% 16, 16, 16, 16, 16 %%>;
  barHeight = <%% 4, 4, 4, 4, 4 %%>;
  barTextTop = <%% 10.5, 10.5, 10.5, 10.5, 10.5 %%>;
  barTextMargin = <%% 10, 10, 10, 10, 10 %%>;

  barMotherHeight = <%% 30, 30, 30, 30, 30 %%>;

  barButtonTop = <%% 12, 12, 12, 12, 12 %%>;
  barButtonRadius = <%% 5.5, 5.5, 5.5, 5.5, 5.5 %%>;

  mother.style.paddingTop = String(paddingTop) + ea;
  mother.style.paddingBottom = String(paddingBottom) + ea;

  y = 0;
  num = 0;
  for (let obj of wordings) {

    if (obj.half) {
      questionRatio = 0.5;
      num = num + 1;
    } else {
      questionRatio = 0.318;
    }

    if (!obj.half || num % 2 === 1) {
      blockMother = createNode({
        mother,
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(marginLeft) + ea,
          marginRight: String(marginLeft) + ea,
          width: withOut(marginLeft * 2, ea),
          verticalAlign: "top",
          marginBottom: String(blockMargin) + ea,
        }
      });
      block = createNode({
        mother: blockMother,
        style: {
          display: !obj.half ? "block" : "inline-block",
          position: "relative",
          width: !obj.half ? String(100) + '%' : withOut(50, questionMargin, ea),
          paddingRight: !obj.half ? "" : String(questionMargin) + ea,
        }
      });
    } else {
      block = createNode({
        mother: blockMother,
        style: {
          display: "inline-block",
          position: "relative",
          width: withOut(50, questionMargin, ea),
          paddingLeft: String(questionMargin) + ea,
        }
      });
    }

    questionArea = createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(100 * questionRatio) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: "Q. ",
          style: {
            display: "inline-block",
            position: "relative",
            width: String(qWidth) + ea,
            fontSize: String(wordingSize) + ea,
            fontWeight: String(200),
            color: colorChip.shadow,
            verticalAlign: "top",
            lineHeight: String(lineHeight),
          }
        },
        {
          text: obj.question.join("\n"),
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(qWidth, ea),
            fontSize: String(wordingSize) + ea,
            fontWeight: String(300),
            color: colorChip.black,
            verticalAlign: "top",
            lineHeight: String(lineHeight),
          },
          bold: {
            fontWeight: String(600),
            color: colorChip.black,
          }
        },
      ]
    });

    answerArea = createNode({
      mother: block,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(100 * (1 - questionRatio)) + '%',
        verticalAlign: "top",
      }
    });

    if (obj.type === "address") {
      createNodes([
        {
          mother: answerArea,
          style: {
            position: "absolute",
            width: String(100) + '%',
            height: String(addressBottomLineHeight) + ea,
            top: String(0) + ea,
            left: String(0) + ea,
            borderBottom: "1px solid " + colorChip.gray3,
          }
        },
        {
          mother: answerArea,
          mode: "input",
          attribute: [
            { type: "text" },
            { value: this.client.requests[0].request.space.address }
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(addressWordingSize) + ea,
            fontWeight: String(200),
            color: colorChip.green,
            top: String(addressWordingTextTop) + ea,
            border: String(0),
            outline: String(0),
            background: "transparent",
            width: String(100) + '%',
          }
        }
      ]);
    } else if (obj.type === "checkbox") {
      itemDoms = [];
      answerArea.style.textAlign = "right";
      answerArea.style.paddingTop = String(1) + ea;
      z = 0;
      for (let i of obj.items) {
        itemDoms.push(createNode({
          mother: answerArea,
          class: [ "hoverDefault_lite", name + token + String(y) + token + String(z), name + token + String(y) ],
          attribute: [
            { toggle: "off" },
            { name: name },
            { y: String(y) },
            { z: String(z) },
            { multiple: obj.multiple ? "true" : "false" },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                const toggle = this.getAttribute("toggle");
                const name = this.getAttribute("name");
                const y = String(this.getAttribute("y"));
                const z = String(this.getAttribute("z"));
                const multiple = (this.getAttribute("multiple") === "true");
                const siblings = document.querySelectorAll('.' + name + token + String(y));
                let items;
                if (toggle === "on") {
                  this.children[0].style.color = colorChip.deactive;
                  this.children[1].style.background = colorChip.gray3;
                  this.setAttribute("toggle", "off");
                } else {
                  if (!multiple) {
                    for (let s of siblings) {
                      if (s !== this) {
                        s.children[0].style.color = colorChip.deactive;
                        s.children[1].style.background = colorChip.gray3;
                        s.setAttribute("toggle", "off");
                      } else {
                        this.children[0].style.color = colorChip.green;
                        this.children[1].style.background = colorChip.green;
                        this.setAttribute("toggle", "on");
                      }
                    }
                  } else {
                    this.children[0].style.color = colorChip.green;
                    this.children[1].style.background = colorChip.green;
                    this.setAttribute("toggle", "on");
                  }
                }
              }
            }
          ],
          style: {
            display: "inline-block",
            position: "relative",
            paddingLeft: String(itemPaddingLeft) + ea,
          },
          children: [
            {
              text: i,
              style: {
                display: "block",
                position: "relative",
                fontSize: String(wordingSize) + ea,
                fontWeight: String(200),
                color: colorChip.deactive,
                marginBottom: String(itemMarginBottom) + ea,
              }
            },
            {
              style: {
                position: "absolute",
                width: String(itemRadius * 2) + ea,
                height: String(itemRadius * 2) + ea,
                borderRadius: String(itemRadius + 1) + ea,
                background: colorChip.gray3,
                left: String(itemPaddingLeft - (itemRadius * 2) + itemCircleLeft) + ea,
                top: String(itemCircleTop) + ea,
              }
            }
          ]
        }));
        z++;
      }
      if (typeof obj.exception === "function") {
        obj.exception(itemDoms, media);
      }
    } else if (obj.type === "opposite") {

      answerArea.style.textAlign = "left";
      answerArea.style.height = String(barMotherHeight) + ea;
      answerArea.style.cursor = "pointer";

      bar = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          top: String(barTop) + ea,
          height: String(barHeight) + ea,
          borderRadius: String(barHeight + 1) + ea,
          background: colorChip.green,
          width: String(100) + '%',
          left: String(0) + ea,
        }
      });

      barText0 = createNode({
        mother: answerArea,
        text: obj.items[0],
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(standardSize) + ea,
          fontWeight: String(400),
          color: colorChip.shadow,
          top: String(barTextTop) + ea,
        }
      });

      barText1 = createNode({
        mother: answerArea,
        text: obj.items[1],
        style: {
          position: "absolute",
          fontSize: String(standardSize) + ea,
          fontWeight: String(400),
          color: colorChip.green,
          right: String(0) + ea,
          top: String(barTextTop) + ea,
        }
      });

      bar.style.width = withOut(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2), ea);
      barLeft = barText0.getBoundingClientRect().width + barTextMargin;
      bar.style.left = String(barLeft) + ea;

      barBox = createNode({
        mother: answerArea,
        style: {
          position: "absolute",
          left: String(barLeft) + ea,
          top: String(0) + ea,
          width: "calc(calc(100% - " + String(barText0.getBoundingClientRect().width + barText1.getBoundingClientRect().width + (barTextMargin * 2)) + ea + ") / 2)",
          height: String(100) + '%',
          background: colorChip.white,
          transition: "all 0s ease",
        }
      });

      barBox.style.width = String(barBox.getBoundingClientRect().width) + ea;
      barBox.setAttribute("width", String(barBox.getBoundingClientRect().width));
      barBox.setAttribute("entire", String(barBox.getBoundingClientRect().width * 2));
      barBox.setAttribute("value", String(50));

      barClone = bar.cloneNode(true);
      barClone.style.width = String(100) + '%';
      barClone.style.left = String(0) + ea;
      barClone.style.background = colorChip.gray3;
      barBox.appendChild(barClone);

      barButton = createNode({
        mother: barBox,
        style: {
          position: "absolute",
          top: String(barButtonTop) + ea,
          right: String(-1 * barButtonRadius) + ea,
          width: String(barButtonRadius * 2) + ea,
          height: String(barButtonRadius * 2) + ea,
          borderRadius: String(barButtonRadius + 1) + ea,
          background: colorChip.white,
          border: "1px solid " + colorChip.gray4,
          cursor: "pointer",
        }
      });

      thisName = name + token + String(y);

      GeneralJs.stacks[thisName + "_isDown"] = false;
      GeneralJs.stacks[thisName + "_startX"] = false;
      GeneralJs.stacks[thisName + "_scrollLeft"] = false;

      barButton.addEventListener("mousedown", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = true;
        GeneralJs.stacks[thisName + "_startX"] = e.pageX - this.offsetLeft;
        GeneralJs.stacks[thisName + "_scrollLeft"] = this.scrollLeft;
        answerArea.style.cursor = "grabbing";
        barBox.style.cursor = "grabbing";
        barButton.style.cursor = "grabbing";
      });

      answerArea.addEventListener("mouseleave", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";
      });

      answerArea.addEventListener("mouseup", function (e) {
        GeneralJs.stacks[thisName + "_isDown"] = false;
        answerArea.style.cursor = "pointer";
        barBox.style.cursor = "pointer";
        barButton.style.cursor = "pointer";
      });

      answerArea.addEventListener("mousemove", function (e) {
        let x, walk, newWidth;
        if (!GeneralJs.stacks[thisName + "_isDown"]) {
          return;
        }
        e.preventDefault();
        x = e.pageX - barButton.offsetLeft;
        walk = x - GeneralJs.stacks[thisName + "_startX"];

        newWidth = Number(barBox.getAttribute("width")) + walk;
        barBox.style.width = String(newWidth) + ea;
        barBox.setAttribute("width", String(newWidth));
        barBox.setAttribute("value", String(Math.round(Math.round((newWidth / Number(barBox.getAttribute("entire"))) * 10000) / 100)));

        answerArea.style.cursor = "grabbing";
        barBox.style.cursor = "grabbing";
        barButton.style.cursor = "grabbing";
      });

    }

    y++;
  }

  blockMother.style.marginBottom = String(0) + ea;

}

StyleCurationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren } = GeneralJs;
  const wordings = this.wordings.initWordings;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let titleFontTop, titleFontSize, titleFontWeight, titleFontLineHeight, titleFontLeft;
  let firstBlock, secondBlock, thirdBlock;
  let firstBlockWidth, secondBlockWidth;
  let greenBoxTop, greenBoxWidth, greenBoxHeight, greenBoxVisual;
  let initWordingSize, initWordingWidth;
  let lineHeight;
  let initWordingMargin, initWordingBottom;

  blockHeight = <%% this.backHeight - 460, this.backHeight - 470, this.backHeight - 490, this.backHeight - 540, this.backHeight - 460 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  titleFontTop = <%% -3, -3, -3, -3, -3 %%>;
  titleFontSize = <%% 33, 33, 33, 33, 5.7 %%>;
  titleFontWeight = <%% 600, 600, 600, 600, 600 %%>;
  titleFontLineHeight = <%% 42, 41, 41, 41, 5.7 %%>;
  titleFontLeft = <%% 5, 5, 5, 5, 5 %%>;

  firstBlockWidth = <%% 142, 142, 142, 142, 142 %%>;
  secondBlockWidth = <%% 420, 420, 420, 420, 420 %%>;

  greenBoxTop = <%% 1, 1, 1, 1, 1 %%>;
  greenBoxWidth = <%% 25, 25, 25, 25, 25 %%>;
  greenBoxHeight = <%% 4, 4, 4, 4, 4 %%>;
  greenBoxVisual = 1;

  initWordingSize = <%% 15, 15, 15, 13, 15 %%>;
  initWordingWidth = <%% 290, 290, 290, 290, 290 %%>;
  initWordingMargin = <%% 15, 15, 15, 15, 15 %%>;
  initWordingBottom = <%% 27, 27, 27, 27, 27 %%>;

  lineHeight = 1.6;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(blockHeight + (desktop ? 0 : 0) - (margin * 2)) + ea,
      background: colorChip.white,
      paddingTop: String(margin + (desktop ? 0 : 1.7)) + ea,
      paddingBottom: String(margin + (desktop ? 0 : 1.3)) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  [ firstBlock, secondBlock, thirdBlock ] = createNodes([
    {
      mother: whiteTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(firstBlockWidth) + ea,
        height: String(100) + '%',
        verticalAlign: "top",
      },
      children: [
        {
          text: wordings.title[0],
          style: {
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: "absolute",
            top: String(titleFontTop) + ea,
            left: String(titleFontLeft) + ea,
            fontFamily: "sandoll",
          }
        },
        {
          text: wordings.title[1],
          style: {
            fontSize: String(titleFontSize) + ea,
            fontWeight: String(titleFontWeight),
            position: "absolute",
            top: String(titleFontTop + titleFontLineHeight) + ea,
            left: String(titleFontLeft) + ea,
            fontFamily: "sandoll",
          }
        }
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: String(secondBlockWidth) + ea,
        verticalAlign: "bottom",
      },
      children: [
        {
          style: {
            position: "absolute",
            width: String(greenBoxWidth) + ea,
            height: String(greenBoxHeight) + ea,
            borderRadius: String(3) + "px",
            background: colorChip.green,
            bottom: String(greenBoxTop) + ea,
            left: String(0) + ea,
          }
        },
        {
          style: {
            position: "relative",
            width: String(initWordingWidth) + ea,
            verticalAlign: "bottom",
          },
          children: [
            {
              text: wordings.contents[0].join("\n"),
              style: {
                position: "relative",
                width: String(100) + '%',
                display: "block",
                lineHeight: String(lineHeight),
                marginBottom: String(initWordingMargin) + ea,
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(300),
                color: colorChip.black,
              },
              bold: {
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
              }
            },
            {
              text: wordings.contents[1].join("\n"),
              style: {
                position: "relative",
                width: String(100) + '%',
                display: "block",
                lineHeight: String(lineHeight),
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(300),
                marginBottom: String(initWordingBottom) + ea,
                color: colorChip.black,
              },
              bold: {
                fontSize: String(initWordingSize) + ea,
                fontWeight: String(600),
                color: colorChip.black,
              }
            },
          ]
        },
      ]
    },
    {
      mother: whiteTong,
      style: {
        display: "inline-block",
        position: "relative",
        width: withOut(firstBlockWidth + secondBlockWidth, ea),
        height: String(100) + '%',
        borderRadius: String(5) + "px",
        background: colorChip.green
      }
    }
  ]);

}

StyleCurationJs.prototype.insertCenterBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren } = GeneralJs;
  let center;
  let wordings;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num;
  let numberRight;
  let titleTop;
  let barTop;
  let titleBottom, blockBottom;
  let index;

  center = this.wordings.centerWordings;
  wordings = [];
  for (let { name, title, callback, children } of center) {
    wordings.push({
      name: title,
      contents: (mother) => {
        (instance[callback])(mother, children, name);
      }
    });
  }

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  paddingTop =  <%% 46, 46, 40, 32, 4.7 %%>;

  titleFontSize = <%% 21, 21, 21, 21, 5.7 %%>;
  numberRight = <%% 12, 12, 12, 12, 5.7 %%>;

  titleTop = <%% 1, 1, 1, 1, 0 %%>;

  barTop = <%% 15, 15, 15, 15, 0 %%>;

  titleBottom = <%% 15, 15, 15, 15, 0 %%>;
  blockBottom = <%% 30, 30, 30, 30, 0 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop + (desktop ? 0 : 1.7)) + ea,
      paddingBottom: String(margin + (desktop ? 0 : 1.3)) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  num = 1;
  for (let { name, contents } of wordings) {
    block = createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            marginBottom: String(titleBottom) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(barTop) + ea,
                width: String(100) + '%',
                borderBottom: "1px solid " + colorChip.gray2,
              }
            },
            {
              text: String(num),
              style: {
                position: "relative",
                display: "inline-block",
                top: String(0),
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(200),
                background: colorChip.white,
                paddingRight: String(numberRight) + ea,
              }
            },
            {
              text: name,
              style: {
                position: "absolute",
                right: String(0),
                top: String(titleTop) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(600),
                background: colorChip.white,
                paddingLeft: String(numberRight) + ea,
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: String(100) + '%',
            border: "1px solid " + colorChip.gray2,
            borderRadius: String(5) + "px",
            overflow: "hidden",
            marginBottom: String(num !== wordings.length ? blockBottom : 0) + ea,
          }
        },
      ]
    });
    contents(block.lastChild);
    num++;
  }

}

StyleCurationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, isMac } = GeneralJs;
  let topMargin, leftMargin;
  let blockHeight, blockMarginBottom;
  let whiteBlock;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let wordSpacing;
  let finalBottom;
  let targetWords;
  let matrix;
  let temp;
  let past;
  let style;
  let wordsTable;
  let num;
  let div_clone, div_clone2;
  let marginBottom;
  let wordSize;
  let box0Size, box1Size, box0Margin, box1Margin;
  let target;
  let logoVisual, logoHeight;

  targetWords = [
    {
      mother: "상담 안내",
      children: [
        "상담 가능 시간은 평일 오전 11시부터 오후 6시 30분까지입니다.",
        "점심 시간은 12시부터 13시 30분으로, 해당 시간에 응대가 어려울 수 있습니다.",
        "짧게는 5분, 평균 10분, 길게는 30분 이하로 진행됩니다.",
        "본 응대는 디자이너 추천을 위한 응대로, 구체적인 견적과 디자인 사항이 나오기 전 서비스 설명과 프로세스 소개를 위한 응대입니다.",
        "구체적인 디자인 제안 및 견적 사항은 디자이너 선택을 하신 후, 응대받으실 수 있습니다."
      ]
    },
  ];

  matrix = [];
  num = 1;
  past = "";
  for (let i = 0; i < targetWords.length; i++) {
    for (let j = 0; j < targetWords[i].children.length; j++) {
      temp = new Array(3);
      if (past !== String(targetWords[i].mother)) {
        temp[0] = String(targetWords[i].mother);
      } else {
        temp[0] = "";
      }
      temp[1] = String(num);
      temp[2] = targetWords[i].children[j];
      matrix.push(temp);
      past = String(targetWords[i].mother);
      num++;
    }
  }

  topMargin = <%% 48, 48, 48, 32, 5.3 %%>;
  leftMargin = <%% 52, 52, 44, 36, 52 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 92, 92, 92, 74, 17 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.2 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (GeneralJs.isMac() ? 0 : 2);
  }

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  finalBottom = <%% 50, 50, 50, 30, 5 %%>;

  marginBottom = <%% 3, 3, 3, 3, 1.8 %%>;
  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  wordSize = <%% 15, 15, 15, 13, 2.8 %%>;

  box0Size = <%% 140, 140, 130, 120, 4.5 %%>;
  box1Size = <%% 25, 25, 25, 25, 3 %%>;
  box0Margin = <%% 55, 55, 55, 55, 3 %%>;
  box1Margin = <%% 18, 18, 18, 18, 3 %%>;

  logoVisual = <%% 4, 4, 4, 4, 4 %%>;
  logoHeight = <%% 16, 16, 16, 16, 16 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(topMargin) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      paddingBottom: String(finalBottom) + ea
    }
  });

  wordsTable = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    marginLeft: String(desktop ? leftMargin : 0) + ea,
    width: desktop ? "calc(100% - " + String(leftMargin * 2) + ea + ")" : String(100) + '%',
  };
  for (let i in style) {
    wordsTable.style[i] = style[i];
  }

  num = 0;
  for (let arr of matrix) {
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginBottom: String(marginBottom) + ea,
    };
    for (let j in style) {
      div_clone.style[j] = style[j];
    }
    if (desktop) {
      if (num !== matrix.length - 1) {
        if (matrix[num + 1][0] !== '' && matrix[num][0] === '') {
          div_clone.style.marginBottom = String(marginBottom * 6) + ea;
        }
      }
    }

    for (let z = 0; z < arr.length; z++) {
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      style = {
        display: "inline-block",
        fontSize: String(wordSize) + ea,
        wordSpacing: String(wordSpacing) + "px",
        position: "relative",
        top: String(isMac() ? 0 : 2) + ea,
        verticalAlign: "top",
        lineHeight: String(1.6),
      };
      if (z === 0) {
        style.width = String(box0Size) + ea;
        style.marginRight = String(box0Margin) + ea;
        style.fontWeight = String(600);
        style.textAlign = "left";
      } else if (z === 1) {
        style.width = String(box1Size) + ea;
        style.marginRight = String(box1Margin) + ea;
        style.fontWeight = String(600);
        style.color = GeneralJs.colorChip.green;
        style.textAlign = "right";
      } else {
        style.width = "calc(100% - " + String(box0Size + box1Size + box0Margin + box1Margin) + ea + ")";
        style.fontWeight = String(300);
        style.textAlign = "left";
      }
      if (mobile) {
        style = {
          display: "inline-block",
          fontSize: String(wordSize) + ea,
          wordSpacing: String(wordSpacing) + "px",
          position: "relative",
          top: String(0) + ea,
          verticalAlign: "top",
          lineHeight: String(1.6),
          left: String((this.subBoxMargin.left + 0.2)) + ea,
          width: GeneralJs.withOut((this.subBoxMargin.left + 0.2) * 2, ea),
        };
        if (z === 0) {
          continue;
        }
        if (z === 1) {
          style.width = String(box0Size) + ea;
          style.color = GeneralJs.colorChip.green;
        }
        if (z === 2) {
          style.width = GeneralJs.withOut(((this.subBoxMargin.left + 0.2) * 2) + box0Size, ea);
          style.left = String(box0Size) + ea;
        }
      }
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }
      if (/\<b\%/gi.test(arr[z])) {
        arr[z] = arr[z].replace(/\<b\%/gi, "<b style=\"color:" + GeneralJs.colorChip.green + "\">");
        arr[z] = arr[z].replace(/\%b\>/gi, "</b>");
      }
      div_clone2.insertAdjacentHTML("beforeend", arr[z]);
      div_clone.appendChild(div_clone2);
    }

    wordsTable.appendChild(div_clone);

    num++;
  }

  whiteBlock.appendChild(wordsTable);

  if (media[0] || media[1] || media[2]) {
    createNode({
      mother: whiteBlock,
      mode: "svg",
      source: this.mother.returnLogo(colorChip.green, 4),
      style: {
        position: "absolute",
        bottom: String(finalBottom + logoVisual) + ea,
        right: String(leftMargin) + ea,
        height: String(logoHeight) + ea,
      }
    });
  }

}

StyleCurationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid;
    let clients, client;
    let whereQuery;
    let contentsPhotoObj;

    if (getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid: getObj.cliid } }, "/getClients");
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];

    contentsPhotoObj = await ajaxJson({}, "/styleCuration_getPhotos", { equal: true });
    this.selectPhotos = [];
    this.randomPick = [];
    this.photos = contentsPhotoObj.photos;
    this.contentsArr = contentsPhotoObj.contentsArr;
    this.designers = contentsPhotoObj.designers;
    this.client = client;
    this.wordings = new StyleCurationWordings();

    await this.mother.ghostClientLaunching({
      base: {
        instance: this,
        binaryPath: StyleCurationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 서비스 안내"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertCenterBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
