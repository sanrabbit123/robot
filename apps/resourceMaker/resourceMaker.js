const ResourceMaker = function (p_id) {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.s3Host = `${ADDRESS.homeinfo.ghost.protocol}://${ADDRESS.homeinfo.ghost.host}`;
  for (let i = 0; i < 5; i++) {
    p_id = p_id.replace(/^ /g, '').replace(/ $/g, '').toLowerCase();
  }
  this.p_id = p_id;
  this.arr = [];
  this.result = {};
  this.final = {};
  this.targetFolder;
}

ResourceMaker.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}

ResourceMaker.prototype.lowerCase = function (str) {
  str = str.trim();
  str = str.replace(/“/g, '').replace(/”/g, '').replace(/"/g, '').replace(/‘/g, '').replace(/’/g, '').replace(/'/g, '').replace(/\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/=/g, '').replace(/ /g, '').replace(/  /g, '').replace(/ /g, '').replace(/\t/g, '')
  str = str.toLowerCase();
  return str;
}

ResourceMaker.prototype.infoMaker = function () {
  let temp_arr, temp_string, temp_obj;
  let key = 0;
  let totalInfo = [];
  let result = {};
  let count = this.arr.length;
  for (let i = 0; i < count; i++) {
    if (this.arr[i] === "_info") {
      key = i;
    }
  }
  for (let i = key + 1; i < count; i++) {
    totalInfo.push(this.arr[i]);
  }
  result.designer = totalInfo[0].trim();
  result.pyeong = totalInfo[1];

  let portfolioKey = 0;
  for (let i = 0; i < totalInfo.length; i++) {
    if (totalInfo[i] === "_portfolio") {
      portfolioKey = i;
    }
  }

  let reviewKey = 0;
  for (let i = 0; i < totalInfo.length; i++) {
    if (totalInfo[i] === "_review") {
      reviewKey = i;
    }
  }

  //portfolio
  let portfolio_lastNum;
  if (reviewKey !== 0) {
    portfolio_lastNum = reviewKey;
  } else {
    portfolio_lastNum = totalInfo.length;
  }
  let portfolioInfo = [];
  for (let i = portfolioKey + 1; i < portfolio_lastNum; i++) {
    portfolioInfo.push(totalInfo[i]);
  }
  let twoKey = 0;
  for (let i = 0; i < portfolioInfo.length; i++) {
    if (portfolioInfo[i] === "_2") {
      twoKey = i;
    }
  }
  result.portfolio = {};
  result.portfolio.portivec = {};
  result.portfolio.portivec.sub = portfolioInfo[1];
  result.portfolio.portivec.region = portfolioInfo[2];
  result.portfolio.portivec.method = portfolioInfo[3];
  result.portfolio.name_card = {};
  result.portfolio.name_card.sub = result.portfolio.portivec.sub.replace(/, /, "\n");
  result.portfolio.p_info = {};
  temp_arr = [ "photodae", "slide", "tag", "service", "key8", "key9" ];
  for (let i = 0; i < temp_arr.length; i++) {
    if (temp_arr[i] === "photodae") {
      result.portfolio.p_info[temp_arr[i]] = [ Number((portfolioInfo[twoKey + ((2 * i) + 2)]).split(' ')[0]), Number((portfolioInfo[twoKey + ((2 * i) + 2)]).split(' ')[1]) ];
    } else {
      result.portfolio.p_info[temp_arr[i]] = portfolioInfo[twoKey + ((2 * i) + 2)];
    }
  }

  //review
  if (reviewKey !== 0) {
    result.review = {};
    result.review.revivec = {};
    result.review.rev_name_card = {};
    let reviewInfo = [];
    for (let i = reviewKey + 1; i < totalInfo.length; i++) {
      reviewInfo.push(totalInfo[i]);
    }
    for (let i = 0; i < reviewInfo.length; i++) {
      if (reviewInfo[i] === "_2") {
        twoKey = i;
      }
    }
    result.review.revivec.main = reviewInfo[twoKey - 1].replace(/,/, '');
    result.review.revivec.hover = result.review.revivec.main;
    result.review.revivec.mobile = reviewInfo[twoKey - 1].replace(/, /, '\n');

    result.review.rev_name_card.main = result.review.revivec.mobile;

    let middleIndex = 0;
    temp_arr = [
      "홈스타일링",
      "토탈 스타일링",
      "홈퍼니싱",
      "설계 변경",
    ]
    temp_string = (result.portfolio.portivec.sub.split(", ")[1] + " 후기");
    for (let i of temp_arr) {
      temp_obj = (new RegExp(i, "g")).exec(temp_string);
      if (temp_obj !== null) {
        middleIndex = temp_obj.index;
      }
    }
    let pyeong = "error";
    if (/[0-9]+py/g.exec(this.arr[2]) !== null) {
      pyeong = /[0-9]+py/g.exec(this.arr[2])[0];
    } else {
      throw new Error("pyeong(py) error");
    }
    result.review.rev_name_card.sub = temp_string.slice(0, middleIndex - 1) + "\n" + pyeong + " " + temp_string.slice(middleIndex);
    result.review.rev_name_card.subsub = temp_string.slice(0, middleIndex - 1) + "\n" + temp_string.slice(middleIndex);

    result.review.r_info = {};
    result.review.r_info.photodae = [ Number((reviewInfo[twoKey + 2].split(' '))[0]), Number((reviewInfo[twoKey + 2].split(' '))[1]) ];
    result.review.r_info.order = Number(reviewInfo[twoKey + 4]);

  }

  this.result = result;
}

ResourceMaker.prototype.portfolio_maker = function () {
  let result = new Map();
  let reviewBoo = false;
  let r_key = 0;
  for (let i = 0; i < this.arr.length; i++) {
    if (/^re/.exec(this.arr[i]) !== null) {
      reviewBoo = true;
      r_key = i;
    }
  }
  let info_key = 0;
  for (let i = 0; i < this.arr.length; i++) {
    if (/^_info/.exec(this.arr[i]) !== null) {
      info_key = i;
    }
  }
  let portfolioContent_end;
  if (reviewBoo) {
    portfolioContent_end = r_key;
  } else {
    for (let i = 0; i < this.arr.length; i++) {
      if (/^_info/.exec(this.arr[i]) !== null) {
        portfolioContent_end = i;
      }
    }
  }
  let portfolio_keys = [];
  let review_keys = [];
  for (let i = 0; i < info_key; i++) {
    if (/^[0-9]/.exec(this.arr[i]) !== null && /[0-9]$/.exec(this.arr[i]) !== null && /-/g.exec(this.arr[i]) !== null) { portfolio_keys.push(i); }
    else if (/^[0-9]/.exec(this.arr[i]) !== null && /[0-9]$/.exec(this.arr[i]) !== null && /-/g.exec(this.arr[i]) === null) {review_keys.push(i);}
  }

  let temp_obj, temp_obj2, temp_obj3, temp_arr, temp_arr2, temp_arr3, temp_num, temp_string, temp_boo;

  //portfolio
  result.set("p_id", this.p_id);
  result.set("designer", this.result.designer);
  this.arr[2] = this.arr[2].replace(/“/g, '').replace(/”/g, '').replace(/"/g, '').replace(/‘/g, '').replace(/’/g, '').replace(/'/g, '');
  result.set("title", this.arr[2]);
  result.set("main_title", this.arr[2].replace(/, /g, "\n"));
  temp_obj = {
    photo_key: 0,
    title: "init",
    main_contents: this.arr[3],
    smalltalk_yn: "",
    smalltalk_contents: "",
  }
  temp_boo = false;
  for (let i = 0; i < portfolio_keys[0] - 4; i++) {
    if (/^\+/.test(this.arr[4 + i])) {
      temp_obj.smalltalk_yn = "+ HomeLiaison's small talk";
      temp_boo = true;
    } else {
      if (!temp_boo) {
        temp_obj.main_contents += "\n\n";
        temp_obj.main_contents += this.arr[4 + i];
      } else {
        if (temp_obj.smalltalk_contents !== "") {
          temp_obj.smalltalk_contents += "\n\n";
        }
        temp_obj.smalltalk_contents += this.arr[4 + i];
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    temp_obj.main_contents = temp_obj.main_contents.replace(/^\n/, '');
    temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/^\n/, '');
  }

  for (let i = 0; i < 4; i++) {
    temp_obj.main_contents = temp_obj.main_contents.replace(/\n$/, '');
    temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/\n$/, '');
  }

  result.set("portfolio_init", temp_obj);
  result.set("portfolio_contents", new Map());

  for (let i = 0; i < portfolio_keys.length; i++) {
    temp_obj = {}
    temp_arr = this.arr[portfolio_keys[i]].split(" - ");
    temp_obj.photo_key = Number(temp_arr[1]);
    temp_obj.title = this.lowerCase(this.arr[portfolio_keys[i] + 1]);

    temp_num = null;
    temp_obj.smalltalk_contents = "";
    temp_obj.smalltalk_yn = "";
    temp_obj.main_contents = "";
    for (let j = portfolio_keys[i]; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
      if (/^\+/g.exec(this.arr[j]) !== null) { temp_num = Number(j); }
    }
    if (temp_num !== null) {
      temp_obj.smalltalk_yn = "+ HomeLiaison's small talk";
      for (let j = portfolio_keys[i] + 2; j < temp_num; j++) {
        temp_obj.main_contents += this.arr[j];
        temp_obj.main_contents += "\n\n";
      }
      temp_obj.main_contents = temp_obj.main_contents.slice(0, -2);
      for (let j = temp_num + 1; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
        temp_obj.smalltalk_contents += this.arr[j];
        temp_obj.smalltalk_contents += "\n\n";
      }
      temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.slice(0, -2);
    } else {
      for (let j = portfolio_keys[i] + 2; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
        temp_obj.main_contents += this.arr[j];
        temp_obj.main_contents += "\n\n";
      }
      temp_obj.main_contents = temp_obj.main_contents.slice(0, -2);
    }

    for (let i = 0; i < 4; i++) {
      temp_obj.main_contents = temp_obj.main_contents.replace(/^\n/, '');
      temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/^\n/, '');
    }

    for (let i = 0; i < 4; i++) {
      temp_obj.main_contents = temp_obj.main_contents.replace(/\n$/, '');
      temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/\n$/, '');
    }

    result.get("portfolio_contents").set("portfolio_content" + String(i), temp_obj);
  }
  temp_arr = [ result.get("portfolio_init") ];
  for (let i = 0; i < result.get("portfolio_contents").size; i++) {
    temp_arr.push(result.get("portfolio_contents").get("portfolio_content" + String(i)));
  }
  result.set("contents", temp_arr);

  //review
  if (reviewBoo) {
    result.set("r_id", this.lowerCase(this.arr[r_key]));
    this.arr[r_key + 1] = this.arr[r_key + 1].replace(/“/g, '').replace(/”/g, '').replace(/"/g, '').replace(/‘/g, '').replace(/’/g, '').replace(/'/g, '').replace(/, /g, "\n");
    result.set("rev_main_title", this.arr[r_key + 1]);
    temp_obj = {
      type: "init",
      contents: [
          {
            quest: "",
            answer: this.arr[r_key + 2].replace(/^\n/, '').replace(/^\n/, '').replace(/\n$/, '').replace(/\n$/, ''),
          },
      ],
      photos: [],
    };
    for (let i = 0; i < review_keys[0] - (3 + r_key); i++) {
      temp_obj.contents.push({
        quest: "",
        answer: this.arr[r_key + 3 + i].replace(/^\n/, '').replace(/^\n/, '').replace(/\n$/, '').replace(/\n$/, ''),
      });
    }
    result.set("reviews_init", temp_obj);
    result.set("reviews_contents", new Map());
    for (let i = 0; i < review_keys.length; i++) {
      temp_obj = {}
      temp_obj.type = "contents";
      temp_arr = this.arr[review_keys[i]].split(' ');
      temp_arr2 = [];
      for (let j of temp_arr) {
        temp_arr2.push(Number(j));
      }
      temp_obj.photos = temp_arr2;
      temp_obj.contents = [];
      temp_arr3 = [];
      for (let j = review_keys[i]; j < ((i === review_keys.length - 1) ? info_key : review_keys[i + 1]); j++) {
        if (/^Q/g.exec(this.arr[j]) !== null) { temp_arr3.push(j); }
      }
      for (let j = 0; j < temp_arr3.length; j++) {
        temp_obj3 = {}
        for (let z = 0; z < 10; z++) {
          this.arr[temp_arr3[j]] = this.arr[temp_arr3[j]].replace(/^Q/gi, '').replace(/^\./gi, '').replace(/^ /gi, '');
        }
        temp_obj3.quest = this.arr[temp_arr3[j]];
        temp_obj3.answer = this.arr[temp_arr3[j] + 1];
        temp_num = (j === temp_arr3.length - 1) ? ((i === review_keys.length - 1) ? info_key : review_keys[i + 1]) : temp_arr3[j + 1];
        for (let k = 0; k < temp_num - (temp_arr3[j] + 2); k++) {
          temp_obj3.answer += "\n\n";
          temp_obj3.answer += this.arr[temp_arr3[j] + 2 + k];
        }
        temp_obj3.answer = temp_obj3.answer.replace(/^\n/, '').replace(/^\n/, '').replace(/\n$/, '').replace(/\n$/, ''),
        temp_obj.contents.push(temp_obj3);
      }
      result.get("reviews_contents").set("reviews_content" + String(i), temp_obj);
    }

    temp_arr = [ result.get("reviews_init") ];
    for (let i = 0; i < result.get("reviews_contents").size; i++) {
      temp_arr.push(result.get("reviews_contents").get("reviews_content" + String(i)));
    }
    result.set("reviews", temp_arr);
  }

  //result
  let result_obj = {}
  result_obj.title = result.get("title");
  temp_arr = result.get("title").split(", ");
  temp_arr = temp_arr[1].split("py");
  temp_arr = temp_arr[0].split(" ");
  temp_string = "";
  for (let i = 0; i < temp_arr.length - 1; i++) {
    temp_string += temp_arr[i] + " ";
  }
  temp_string = temp_string.slice(0, -1);
  result_obj.space = temp_string;
  result_obj.pyeong = temp_arr[temp_arr.length - 1];
  result_obj.sub_titles = {};
  result_obj.sub_titles.main_title = result.get("main_title");
  temp_arr = result.get("main_title").split("\n");
  temp_string = temp_arr[1].slice(0, temp_arr[1].search(/[0-9]+py/g) - 1) + '\n' + temp_arr[1].slice(temp_arr[1].search(/[0-9]+py/g));
  result_obj.sub_titles.main_color_title = temp_string;
  result_obj.sub_titles.main_color_object = { main: "#ececec", sub: "#d3d2d0", title: "#606060", };
  result_obj.sub_titles.portivec = {}
  result_obj.sub_titles.portivec.main = temp_arr[1];
  result_obj.sub_titles.portivec.sub = this.result.portfolio.portivec.sub;
  result_obj.sub_titles.portivec.region = this.result.portfolio.portivec.region;
  result_obj.sub_titles.portivec.method = this.result.portfolio.portivec.method;
  result_obj.sub_titles.name_card = {}
  result_obj.sub_titles.name_card.main = temp_string;
  result_obj.sub_titles.name_card.sub = this.result.portfolio.name_card.sub;

  result_obj.designer = result.get("designer");
  temp_arr = this.arr[portfolio_keys[portfolio_keys.length - 1]].split(" - ");
  temp_num = Number(temp_arr[1]);
  result_obj.p_id = result.get("p_id");
  result_obj.p_info = {
    photodae: this.result.portfolio.p_info.photodae,
    photosg: { first: 1, last: temp_num },
    slide: this.result.portfolio.p_info.slide,
    tag: this.result.portfolio.p_info.tag,
    service: this.result.portfolio.p_info.service,
    key8: this.result.portfolio.p_info.key8,
    key9: this.result.portfolio.p_info.key9,
  }
  result_obj.suggestion = "Designer's\nSuggestion";
  result_obj.contents = result.get("contents");

  if (!reviewBoo) {
    result_obj.sub_titles.rev_main_title = "";
    result_obj.sub_titles.revivec = {};
    result_obj.sub_titles.revivec.main = "";
    result_obj.sub_titles.revivec.sub = "";
    result_obj.sub_titles.revivec.hover = "";
    result_obj.sub_titles.revivec.mobile = "";
    result_obj.sub_titles.rev_name_card = {};
    result_obj.sub_titles.rev_name_card.main = "";
    result_obj.sub_titles.rev_name_card.sub = "";
    result_obj.sub_titles.rev_name_card.subsub = "";
    result_obj.r_id = "re999";
    result_obj.r_info = {};
    result_obj.r_info.photodae = [];
    result_obj.r_info.order = 0;
    result_obj.reviews = [
      {
        type: "init",
        contents: [
            {
              quest: "",
              answer: "",
            },
        ],
        photos: [],
      },
      {
        type: "contents",
        contents: [
            {
              quest: "",
              answer: "",
            },
        ],
        photos: [],
      },
    ];
  } else {
    result_obj.sub_titles.rev_main_title = result.get("rev_main_title");
    result_obj.sub_titles.revivec = {};
    result_obj.sub_titles.revivec.main = this.result.review.revivec.main;
    result_obj.sub_titles.revivec.sub = result_obj.sub_titles.portivec.main + " 후기";
    result_obj.sub_titles.revivec.hover = this.result.review.revivec.hover;
    result_obj.sub_titles.revivec.mobile = this.result.review.revivec.mobile;
    result_obj.sub_titles.rev_name_card = {};
    result_obj.sub_titles.rev_name_card.main = this.result.review.rev_name_card.main;
    result_obj.sub_titles.rev_name_card.sub = this.result.review.rev_name_card.sub;
    result_obj.sub_titles.rev_name_card.subsub = this.result.review.rev_name_card.subsub;
    result_obj.r_id = result.get("r_id");
    result_obj.r_info = {};
    result_obj.r_info.photodae = this.result.review.r_info.photodae;
    result_obj.r_info.order = this.result.review.r_info.order;
    result_obj.reviews = result.get("reviews");
  }

  this.final = result_obj;
}

ResourceMaker.prototype.portfolio_verification = function () {
  let title;
  let apartArr, apartText, pyIndex;
  let resultObj = {};
  let reviewTitleIndex, reviewTitleArr;
  let noReview = true;
  let booResults = [];

  title = this.arr[2];

  let [ subject, apart ] = title.split(", ");

  //portfolio
  apartArr = apart.split(' ');
  for (let i = 0; i < apartArr.length; i++) {
    if (/py/gi.test(apartArr[i])) {
      pyIndex = i;
    }
  }

  apartText = '';
  for (let i = 0; i < pyIndex; i++) {
    apartText += apartArr[i] + ' ';
  }
  apartText = apartText.slice(0, -1);

  resultObj.porlid = this.p_id;

  resultObj.raw = {};
  resultObj.raw.apart = { text: apartText, length: apartText.length };
  resultObj.raw.subject = { text: subject, length: subject.length };
  resultObj.raw.apartTitle = { text: apart, length: apart.length };

  resultObj.boo = {};
  resultObj.boo.apart = (apartText.length < 10);
  resultObj.boo.subject = (subject.length < 19);
  resultObj.boo.apartTitle = (apart.length < 21);
  resultObj.boo.subjectTitle = (subject.length + apartText.length < 27);

  for (let i in resultObj.boo) {
    if (!resultObj.boo[i]) {
      throw new Error("invaild title : " + JSON.stringify(resultObj, null, 2));
    }
  }

  //review
  for (let i = 0; i < this.arr.length; i++) {
    if (/^_review/.test(this.arr[i])) {
      reviewTitleIndex = i + 2;
      noReview = false;
    }
  }

  if (!noReview) {
    reviewTitleArr = this.arr[reviewTitleIndex].split(", ");
    booResults.push(reviewTitleArr[0].length <= 10);
    booResults.push(reviewTitleArr[1].length <= 10);
    if (!booResults[0] || !booResults[1]) {
      throw new Error("invaild review title : " + JSON.stringify(booResults) + ", " + reviewTitleArr.join(", "));
    }
  }
}

ResourceMaker.prototype.modelingMap = function () {
  let model = {
    structure: {
      conid: "",
      desid: "",
      cliid: "",
      proid: "",
      contents: {
        portfolio: {
          pid: "",
          date: "9999-09-09",
          spaceInfo: {
            space: "",
            pyeong: 0,
            region: "",
            method: "",
          },
          title: {
            main: "",
            sub: "",
          },
          color: {
            main: "",
            sub: "",
            title: "",
          },
          detailInfo: {
            photodae: [],
            photosg: {
              first: 0,
              last: 0,
            },
            slide: [],
            tag: [],
            service: "",
            sort: {
              key8: 0,
              key9: 0,
            },
          },
          contents: {
            suggestion: "Designer's\nSuggestion",
            detail: [
              {
                photoKey: 0,
                title: "",
                contents: "",
                smallTalk: {
                  title: "",
                  contents: "",
                },
              },
            ],
          }
        },
        review: {
          rid: "",
          date: "9999-09-09",
          title: {
            main: "",
            sub: "",
          },
          detailInfo: {
            photodae: [],
            order: 0,
          },
          contents: {
            detail: [
              {
                type: "",
                photos: [],
                contents: [
                  {
                    question: "",
                    answer: "",
                  }
                ]
              },
            ],
          }
        }
      },
      photos: {
        first: 0,
        last: 0,
        detail: [
          { index: 0, gs: 'g' },
        ],
      }
    }
  };
  return JSON.parse(JSON.stringify(model));
}

ResourceMaker.prototype.portfolio_modeling = async function (conidArr, proid, cliid) {
  const instance = this;
  const { fileSystem, orderSystem } = this.mother;
  const past = this.final;
  const dateMaker = function (dateRaw) {
    let date = "20" + dateRaw.slice(0, 2) + "-" + dateRaw.slice(2, 4) + "-" + dateRaw.slice(4);
    return date;
  }
  const GaroseroParser = require(`${process.cwd()}/apps/garoseroParser/garoseroParser.js`);
  const garoseroParser = new GaroseroParser();
  try {

    let tempObj, tempObjDetail, portfolio, review;
    let targetPhotoDirArr, targetPhotoDirRaw, targetPhotoDir, targetPhotoDirFinal;
    let tempReg, conidTargetArr;
    let garoseroObj;
    let todayString;

    tempObj = this.modelingMap().structure;

    tempObj.conid = "";
    tempObj.desid = past.designer;
    tempObj.cliid = cliid;
    tempObj.proid = proid;

    portfolio = tempObj.contents.portfolio;

    portfolio.pid = past.p_id;

    portfolio.spaceInfo.space = past.space;
    portfolio.spaceInfo.pyeong = Number(past.pyeong);
    portfolio.spaceInfo.region = past.sub_titles.portivec.region;
    portfolio.spaceInfo.method = past.sub_titles.portivec.method;

    portfolio.title.main = past.title;
    portfolio.title.sub = past.sub_titles.portivec.sub;

    portfolio.color.main = past.sub_titles.main_color_object.main;
    portfolio.color.sub = past.sub_titles.main_color_object.sub;
    portfolio.color.title = past.sub_titles.main_color_object.title;

    portfolio.detailInfo.photodae = past.p_info.photodae;
    portfolio.detailInfo.photosg = past.p_info.photosg;

    portfolio.detailInfo.slide = [];
    for (let i of past.p_info.slide.split(" ")) {
      portfolio.detailInfo.slide.push(Number(i));
    }

    portfolio.detailInfo.tag = past.p_info.tag.split(",");
    portfolio.detailInfo.service = past.p_info.service;
    portfolio.detailInfo.sort.key8 = past.p_info.key8;
    portfolio.detailInfo.sort.key9 = past.p_info.key9;

    portfolio.contents.suggestion = past.suggestion;
    portfolio.contents.detail = [];

    for (let { title, main_contents, smalltalk_yn, smalltalk_contents, photo_key } of past.contents) {
      tempObjDetail = {
        photoKey: 0,
        title: "",
        contents: "",
        smallTalk: {
          title: "",
          contents: "",
        },
      };

      tempObjDetail.photoKey = photo_key;
      tempObjDetail.title = title;
      tempObjDetail.contents = main_contents;
      tempObjDetail.smallTalk.title = smalltalk_yn;
      tempObjDetail.smallTalk.contents = smalltalk_contents;

      portfolio.contents.detail.push(tempObjDetail);
    }

    review = tempObj.contents.review;

    if (past.r_id !== "re999") {

      review.rid = past.r_id;

      review.title.main = past.sub_titles.rev_main_title.replace(/\n/, ", ");
      review.title.sub = past.sub_titles.rev_name_card.main.replace(/\n/, ", ");

      review.detailInfo.photodae = past.r_info.photodae;
      review.detailInfo.order = past.r_info.order;

      review.contents.detail = [];
      for (let { type, photos, contents } of past.reviews) {
        tempObjDetail = {
          type: "",
          photos: [],
          contents: [
            {
              quest: "",
              answer: "",
            }
          ]
        };
        tempObjDetail.type = type;
        tempObjDetail.photos = photos;
        tempObjDetail.contents = [];
        for (let obj of contents) {
          tempObjDetail.contents.push({ question: obj.quest, answer: obj.answer });
        }
        review.contents.detail.push(tempObjDetail);
      }

    } else {
      review.rid = "re999";
      review.contents.detail = [];
    }

    todayString = dateMaker(this.mother.todayMaker("year"));
    portfolio.date = new Date();
    review.date = new Date();

    targetPhotoDirArr = [];
    targetPhotoDirRaw = await fileSystem(`readDir`, [ this.targetFolder ]);
    targetPhotoDir = await garoseroParser.queryDirectory(this.targetFolder);
    for (let z of targetPhotoDirRaw) {
      if (z !== `.DS_Store`) {
        targetPhotoDirArr.push(z);
      }
    }

    targetPhotoDirFinal = [];
    for (let { index, gs } of targetPhotoDir) {
      garoseroObj = {};
      garoseroObj.index = index + 1;
      garoseroObj.gs = gs;
      targetPhotoDirFinal.push(garoseroObj);
    }

    tempObj.photos.first = 1;
    tempObj.photos.last = targetPhotoDirArr.length;
    tempObj.photos.detail = targetPhotoDirFinal;

    conidTargetArr = [];
    tempReg = new RegExp('^t' + todayString.slice(2, 4) + todayString.slice(5, 7));
    for (let { conid } of conidArr) {
      if (tempReg.test(conid)) {
        conidTargetArr.push(conid);
      }
    }

    if (conidTargetArr.length === 0) {
      tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_aa01s");
    } else {
      tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_" + orderSystem("encode", (orderSystem("decode", conidTargetArr[0]) + 1)) + "s");
    }

    this.final = tempObj;

  } catch (e) {
    console.log(e);
  }
}

ResourceMaker.prototype.launching = async function () {
  const instance = this;
  const { fileSystem, mongo, mongoinfo, shell, shellLink, headRequest, binaryRequest } = this.mother;
  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  const AppleAPIs = require(`${process.cwd()}/apps/appleAPIs/appleAPIs.js`);
  try {
    let targetFolder;
    let tempFolderName, homeFolderList, tempHome;
    let temp, tempReg;
    let note;
    let input;
    let tempResponse, index;
    let tempObject;
    let namesArr;
    let clients;
    let thisProject;
    let searchQuery;
    let projects;
    let proid, cliid;
    let whereQuery, updateQuery;
    let targetContents, targetRawContentsArr, targetRawContents;

    //mkdir temp directory
    tempFolderName = "tempResourcMakerFolder";
    tempHome = process.env.HOME + "/" + tempFolderName;
    homeFolderList = await fileSystem(`readDir`, [ process.env.HOME ]);
    if (homeFolderList.includes(tempFolderName)) {
      shell.exec(`rm -rf ${shellLink(tempHome)}`);
    }
    shell.exec(`mkdir ${shellLink(tempHome)}`);

    note = new AppleAPIs({ folder: "portfolio", subject: this.p_id });
    this.arr = await note.readNote();

    this.portfolio_verification();

    //parsing portfolio number
    tempResponse = 200;
    index = 0;
    while (tempResponse === 200) {
      index++;
      tempResponse = await headRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/i" + String(index) + this.p_id + ".jpg");
      tempResponse = tempResponse.statusCode;
    }

    //download images
    for (let i = 1; i < index; i++) {
      tempObject = await binaryRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/i" + String(i) + this.p_id + ".jpg");
      await fileSystem(`writeBinary`, [ tempHome + "/i" + String(i) + this.p_id + ".jpg", tempObject ]);
      console.log(`download success`);
    }
    this.targetFolder = tempHome;

    //make info and write raw file
    this.infoMaker();
    this.portfolio_maker();
    await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}_raw.js`, JSON.stringify(this.final, null, 2) ]);

    //parsing cliid, proid
    namesArr = this.arr[1].split(" ");
    clients = await this.back.getClientsByQuery({ name: namesArr[2].trim() });
    thisProject = null;
    proid = null;
    cliid = null;
    for (let c of clients) {
      searchQuery = { "$and": [ { desid: this.result.designer }, { cliid: c.cliid } ] };
      projects = await this.back.getProjectsByQuery(searchQuery);
      if (projects.length > 0) {
        thisProject = projects[0];
        proid = thisProject.proid;
        cliid = c.cliid;
      }
    }
    if (cliid === null) {
      throw new Error("can not find client");
    }
    if (proid === null) {
      throw new Error("can not find project");
    }

    //rendering resource and write file
    await MONGOC.connect();
    temp = await MONGOC.db(`miro81`).collection(`contents`).find({}).project({ conid: 1 }).sort({ conid: -1 }).limit(1).toArray();
    await this.portfolio_modeling(temp, proid, cliid);
    await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}.js`, JSON.stringify(this.final, null, 2) ]);

    //on view
    shell.exec(`rm -rf ${shellLink(process.env.HOME)}/${tempFolderName}`);
    shell.exec(`atom ${shellLink(process.cwd())}/temp/${this.p_id}_raw.js`);
    shell.exec(`atom ${shellLink(process.cwd())}/temp/${this.p_id}.js`);
    console.log(this.final);

    //confirm
    input = await this.consoleQ(`is it OK? : (if no problem, press 'ok')\n`);
    if (input === "done" || input === "a" || input === "o" || input === "ok" || input === "OK" || input === "Ok" || input === "oK" || input === "yes" || input === "y" || input === "yeah" || input === "Y") {
      await MONGOC.db(`miro81`).collection(`contents`).insertOne(this.final);

      //update raw contents db
      whereQuery = {};
      updateQuery = {};

      targetRawContentsArr = await this.back.mongoRead("contentsRaw", { proid: proid }, { python: true });
      targetRawContents = targetRawContentsArr[0];
      targetContents = await this.back.getContentsById(this.final.conid);

      whereQuery = { proid: proid };
      updateQuery = { conid: this.final.conid };

      if (!targetRawContents.portfolio.exist) {
        updateQuery["portfolio.exist"] = true;
        updateQuery["portfolio.contents"] = targetContents.getContentsFlatDetail().portfolio;
      }

      if (targetContents.contents.review.rid !== "re999") {
        if (!targetRawContents.review.exist) {
          updateQuery["review.exist"] = true;
          updateQuery["review.contents"] = targetContents.getContentsFlatDetail().review;
        }
      } else {
        updateQuery["review.exist"] = false;
      }

      await this.back.mongoUpdate("contentsRaw", [ whereQuery, updateQuery ], { python: true });

    }

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
  }
}

module.exports = ResourceMaker;
