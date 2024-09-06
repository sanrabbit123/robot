const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 불러옵니다.
const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스를 불러옵니다.
const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`); // ADDRESS 객체를 불러옵니다.
const mother = new Mother();
const back = new BackMaker();
const address = ADDRESS;
const { errorLog, errorLogSync, emergencyAlarm } = mother;

/**
 * ResourceMaker 클래스는 포트폴리오 ID를 기반으로 다양한 리소스 정보를 생성하고 관리하는 역할을 합니다.
 * 이 클래스는 포트폴리오 정보를 처리하여 관련된 메타데이터를 생성하고,
 * 파일 경로 및 기타 정보를 설정하는 기능을 포함합니다.
 */
class ResourceMaker {
  /**
   * ResourceMaker의 생성자 함수는 클래스의 인스턴스를 초기화합니다.
   * 포트폴리오 ID를 받아서 이를 처리하고, 관련된 여러 속성들을 초기화합니다.
   *
   * @param {string} [p_id] - 포트폴리오 ID를 나타내는 문자열입니다. 기본값은 빈 문자열입니다.
   */
  constructor (p_id) {
    // p_id가 undefined일 경우 빈 문자열로 초기화합니다.
    if (p_id === undefined) {
      p_id = '';
    }    
    // Mother 클래스의 인스턴스를 생성하여 클래스의 속성으로 설정합니다.
    this.mother = new Mother();
    
    // BackMaker 클래스의 인스턴스를 생성하여 클래스의 속성으로 설정합니다.
    this.back = new BackMaker();
    
    // ADDRESS 객체를 클래스의 속성으로 설정합니다.
    this.address = ADDRESS;
    
    // S3 호스트 주소를 설정합니다.
    this.s3Host = `https://${ADDRESS.officeinfo.ghost.host}`;
    
    // p_id 문자열에서 불필요한 공백을 제거하고 소문자로 변환합니다.
    for (let i = 0; i < 5; i++) {
      p_id = p_id.replace(/^ /g, '').replace(/ $/g, '').toLowerCase();
    }
    
    // frontHost 주소를 설정합니다.
    this.frontHost = `${ADDRESS["frontinfo"]["user"]}@${ADDRESS["frontinfo"]["host"]}:/${ADDRESS["frontinfo"]["user"]}/www`;
  
    // 인스턴스의 속성들을 초기화합니다.
    this.p_id = p_id; // 포트폴리오 ID
    this.arr = []; // 처리할 정보가 저장될 배열
    this.result = {}; // 최종 결과를 저장할 객체
    this.final = {}; // 추가적인 결과를 저장할 객체
    this.targetFolder = ""; // 타겟 폴더를 저장할 문자열
  }

  /**
   * 문자열을 소문자로 변환하고, 불필요한 문자들을 제거하는 함수입니다.
   * 주로 파일명이나 경로를 처리할 때 사용됩니다.
   *
   * @param {string} str - 처리할 문자열입니다.
   * @returns {string} - 처리된 문자열을 반환합니다.
   */
  lowerCase = (str) => {
    // 문자열 양끝의 공백을 제거합니다.
    str = str.trim();

    // 문자열에서 다양한 불필요한 문자들을 제거합니다.
    str = str.replace(/“/g, '').replace(/”/g, '').replace(/"/g, '').replace(/‘/g, '').replace(/’/g, '').replace(/'/g, '').replace(/\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/=/g, '').replace(/ /g, '').replace(/  /g, '').replace(/ /g, '').replace(/\t/g, '')

    // 문자열을 소문자로 변환합니다.
    str = str.toLowerCase();

    // 처리된 문자열을 반환합니다.
    return str;
  }
}

/**
 * `infoMaker` 메서드는 주어진 배열 데이터를 기반으로 포트폴리오와 리뷰 정보를 파싱하여 객체 형태로 저장합니다.
 * 이 메서드는 포트폴리오 정보와 리뷰 정보를 포함한 객체를 생성하며, 최종 결과를 `this.result`에 저장합니다.
 * @memberof ResourceMaker
 */
ResourceMaker.prototype.infoMaker = function () {
  // 임시 배열, 문자열, 객체를 선언
  let temp_arr, temp_string, temp_obj;
  // "_info" 문자열이 있는 위치를 저장할 변수 초기화
  let key = 0;
  // "_info" 이후의 데이터를 저장할 배열 초기화
  let totalInfo = [];
  // 최종 결과를 저장할 객체 초기화
  let result = {};
  // this.arr의 길이를 count 변수에 저장
  let count = this.arr.length;

  // "_info"가 있는 위치를 찾는 반복문
  for (let i = 0; i < count; i++) {
    if (this.arr[i] === "_info") {
      key = i; // "_info" 위치를 key에 저장
    }
  }

  // "_info" 이후의 데이터를 totalInfo 배열에 저장
  for (let i = key + 1; i < count; i++) {
    totalInfo.push(this.arr[i]);
  }

  // 디자이너 정보와 평수 정보를 result 객체에 저장
  result.designer = totalInfo[0].trim(); // 디자이너 이름을 저장
  result.pyeong = totalInfo[1]; // 평수를 저장

  // "_portfolio" 위치를 저장할 변수 초기화
  let portfolioKey = 0;
  for (let i = 0; i < totalInfo.length; i++) {
    if (totalInfo[i] === "_portfolio") {
      portfolioKey = i; // "_portfolio" 위치를 portfolioKey에 저장
    }
  }

  // "_review" 위치를 저장할 변수 초기화
  let reviewKey = 0;
  for (let i = 0; i < totalInfo.length; i++) {
    if (totalInfo[i] === "_review") {
      reviewKey = i; // "_review" 위치를 reviewKey에 저장
    }
  }

  // 포트폴리오 정보의 끝을 설정
  let portfolio_lastNum;
  if (reviewKey !== 0) {
    portfolio_lastNum = reviewKey; // 리뷰 정보가 있는 경우, 포트폴리오 정보의 끝을 리뷰 위치로 설정
  } else {
    portfolio_lastNum = totalInfo.length; // 리뷰 정보가 없는 경우, 포트폴리오 정보의 끝을 totalInfo의 끝으로 설정
  }
  
  // 포트폴리오 정보를 저장할 배열 초기화
  let portfolioInfo = [];
  for (let i = portfolioKey + 1; i < portfolio_lastNum; i++) {
    portfolioInfo.push(totalInfo[i]);
  }

  // "_2" 위치를 저장할 변수 초기화
  let twoKey = 0;
  for (let i = 0; i < portfolioInfo.length; i++) {
    if (portfolioInfo[i] === "_2") {
      twoKey = i; // "_2" 위치를 twoKey에 저장
    }
  }

  // 포트폴리오 관련 정보를 result 객체에 저장
  result.portfolio = {};
  result.portfolio.portivec = {};
  result.portfolio.portivec.sub = portfolioInfo[1]; // 포트폴리오의 하위 정보를 저장
  result.portfolio.portivec.region = portfolioInfo[2]; // 포트폴리오의 지역 정보를 저장
  result.portfolio.portivec.method = portfolioInfo[3]; // 포트폴리오의 방법 정보를 저장
  result.portfolio.name_card = {};
  result.portfolio.name_card.sub = result.portfolio.portivec.sub.replace(/, /, "\n"); // 명함에 사용할 서브 정보를 저장
  result.portfolio.p_info = {};

  // 포트폴리오 정보에서 추가 세부 정보를 저장
  temp_arr = [ "photodae", "slide", "tag", "service", "key8", "key9" ];
  for (let i = 0; i < temp_arr.length; i++) {
    if (temp_arr[i] === "photodae") {
      // "photodae"의 경우, 특정 형식으로 변환하여 저장
      result.portfolio.p_info[temp_arr[i]] = [
        Number((portfolioInfo[twoKey + ((2 * i) + 2)]).split(' ')[0]),
        Number((portfolioInfo[twoKey + ((2 * i) + 2)]).split(' ')[1])
      ];
    } else {
      result.portfolio.p_info[temp_arr[i]] = portfolioInfo[twoKey + ((2 * i) + 2)]; // 다른 정보는 그대로 저장
    }
  }

  // 리뷰 정보가 있는 경우
  if (reviewKey !== 0) {
    result.review = {};
    result.review.revivec = {};
    result.review.rev_name_card = {};
    // 리뷰 정보를 저장할 배열 초기화
    let reviewInfo = [];
    for (let i = reviewKey + 1; i < totalInfo.length; i++) {
      reviewInfo.push(totalInfo[i]);
    }

    // 리뷰 정보에서 "_2" 위치를 다시 찾음
    for (let i = 0; i < reviewInfo.length; i++) {
      if (reviewInfo[i] === "_2") {
        twoKey = i; // "_2" 위치를 twoKey에 저장
      }
    }

    // 리뷰 관련 정보를 result 객체에 저장
    result.review.revivec.main = reviewInfo[twoKey - 1].replace(/,/, '');
    result.review.revivec.hover = result.review.revivec.main; // hover 상태의 리뷰 텍스트를 설정
    result.review.revivec.mobile = reviewInfo[twoKey - 1].replace(/, /, '\n'); // 모바일용 리뷰 텍스트를 설정
    result.review.rev_name_card.main = result.review.revivec.mobile;

    // 리뷰 명함의 서브 텍스트를 설정
    let middleIndex = 0;
    temp_arr = [
      "홈스타일링",
      "토탈 스타일링",
      "홈퍼니싱",
      "설계 변경",
    ]
    temp_string = (result.portfolio.portivec.sub.split(", ")[1] + " 후기");

    // 서브 텍스트에서 특정 키워드를 찾아 위치를 middleIndex에 저장
    for (let i of temp_arr) {
      temp_obj = (new RegExp(i, "g")).exec(temp_string);
      if (temp_obj !== null) {
        middleIndex = temp_obj.index;
      }
    }

    // 평수 정보가 있는지 확인하고, 없을 경우 오류 발생
    let pyeong = "error";
    if (/[0-9]+py/g.exec(this.arr[2]) !== null) {
      pyeong = /[0-9]+py/g.exec(this.arr[2])[0];
    } else {
      throw new Error("pyeong(py) error");
    }

    // 리뷰 명함의 서브 텍스트를 설정
    result.review.rev_name_card.sub = temp_string.slice(0, middleIndex - 1) + "\n" + pyeong + " " + temp_string.slice(middleIndex);
    result.review.rev_name_card.subsub = temp_string.slice(0, middleIndex - 1) + "\n" + temp_string.slice(middleIndex);

    // 리뷰 정보에 대한 세부 정보를 result 객체에 저장
    result.review.r_info = {};
    result.review.r_info.photodae = [
      Number((reviewInfo[twoKey + 2].split(' '))[0]),
      Number((reviewInfo[twoKey + 2].split(' '))[1])
    ];
    result.review.r_info.order = Number(reviewInfo[twoKey + 4]);
  }

  // 최종적으로 파싱한 결과를 this.result에 저장
  this.result = result;
}

/**
 * portfolio_maker 메서드는 포트폴리오 데이터를 구성하고 가공하는 역할을 합니다.
 * 포트폴리오와 리뷰 데이터를 분석하여 최종 결과 객체를 생성합니다.
 * @memberof ResourceMaker
 */
ResourceMaker.prototype.portfolio_maker = function () {
  
  // 최종 결과를 저장할 Map 객체를 생성합니다.
  let result = new Map();
  
  // 리뷰가 포함되었는지 여부를 나타내는 변수를 초기화합니다.
  let reviewBoo = false;
  
  // 리뷰의 시작 인덱스를 저장할 변수를 초기화합니다.
  let r_key = 0;
  
  // 배열에서 "re"로 시작하는 항목이 있는지 확인하여 리뷰의 유무를 판단합니다.
  for (let i = 0; i < this.arr.length; i++) {
    if (/^re/.exec(this.arr[i]) !== null) {
      reviewBoo = true; // 리뷰가 포함되어 있음을 표시합니다.
      r_key = i; // 리뷰의 시작 인덱스를 저장합니다.
    }
  }
  
  // "_info"로 시작하는 항목의 인덱스를 찾습니다.
  let info_key = 0;
  for (let i = 0; i < this.arr.length; i++) {
    if (/^_info/.exec(this.arr[i]) !== null) {
      info_key = i;
    }
  }
  
  // 포트폴리오 내용이 끝나는 위치를 찾습니다.
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
  
  // 포트폴리오와 리뷰 항목의 키를 저장할 배열을 생성합니다.
  let portfolio_keys = [];
  let review_keys = [];
  for (let i = 0; i < info_key; i++) {
    if (/^[0-9]/.exec(this.arr[i]) !== null && /[0-9]$/.exec(this.arr[i]) !== null && /-/g.exec(this.arr[i]) !== null) { 
      portfolio_keys.push(i); // 포트폴리오 키를 저장합니다.
    }
    else if (/^[0-9]/.exec(this.arr[i]) !== null && /[0-9]$/.exec(this.arr[i]) !== null && /-/g.exec(this.arr[i]) === null) {
      review_keys.push(i); // 리뷰 키를 저장합니다.
    }
  }

  // 다양한 임시 변수를 선언합니다.
  let temp_obj, temp_obj2, temp_obj3, temp_arr, temp_arr2, temp_arr3, temp_num, temp_string, temp_boo;

  // 포트폴리오 관련 데이터를 result 객체에 저장합니다.
  result.set("p_id", this.p_id);
  result.set("designer", this.result.designer);
  
  // 제목의 특수 문자를 제거한 후 result에 저장합니다.
  this.arr[2] = this.arr[2].replace(/“/g, '').replace(/”/g, '').replace(/"/g, '').replace(/‘/g, '').replace(/’/g, '').replace(/'/g, '');
  result.set("title", this.arr[2]);
  result.set("main_title", this.arr[2].replace(/, /g, "\n"));
  
  // 초기 포트폴리오 객체를 생성합니다.
  temp_obj = {
    photo_key: 0,
    title: "init",
    main_contents: this.arr[3],
    smalltalk_yn: "",
    smalltalk_contents: "",
  }
  
  // 포트폴리오 내의 small talk를 처리합니다.
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

  // main_contents와 smalltalk_contents의 앞뒤 불필요한 개행을 제거합니다.
  for (let i = 0; i < 4; i++) {
    temp_obj.main_contents = temp_obj.main_contents.replace(/^\n/, '');
    temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/^\n/, '');
  }

  for (let i = 0; i < 4; i++) {
    temp_obj.main_contents = temp_obj.main_contents.replace(/\n$/, '');
    temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/\n$/, '');
  }

  // 포트폴리오 초기 데이터를 result에 저장합니다.
  result.set("portfolio_init", temp_obj);
  result.set("portfolio_contents", new Map());

  // 포트폴리오의 각 콘텐츠 항목을 순회하며 데이터를 처리합니다.
  for (let i = 0; i < portfolio_keys.length; i++) {
    // 각 포트폴리오 항목을 저장할 임시 객체를 초기화합니다.
    temp_obj = {};

    // 현재 포트폴리오 항목의 정보를 " - "를 기준으로 분리합니다.
    temp_arr = this.arr[portfolio_keys[i]].split(" - ");

    // 분리된 정보 중 두 번째 항목을 숫자로 변환하여 photo_key로 저장합니다.
    temp_obj.photo_key = Number(temp_arr[1]);

    // 포트폴리오 항목의 제목을 소문자로 변환하여 저장합니다.
    temp_obj.title = this.lowerCase(this.arr[portfolio_keys[i] + 1]);

    // small talk 관련 정보를 초기화합니다.
    temp_num = null;
    temp_obj.smalltalk_contents = ""; // small talk 내용을 저장할 변수 초기화
    temp_obj.smalltalk_yn = ""; // small talk 여부를 저장할 변수 초기화
    temp_obj.main_contents = ""; // 주요 콘텐츠 내용을 저장할 변수 초기화
    
    // 현재 포트폴리오 항목에 포함된 small talk의 존재 여부를 확인합니다.
    for (let j = portfolio_keys[i]; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
        // "+" 기호로 시작하는 항목이 있는지 확인하여 small talk가 있는지 판단합니다.
        if (/^\+/g.exec(this.arr[j]) !== null) {
            temp_num = Number(j); // small talk가 시작되는 인덱스를 저장합니다.
        }
    }

    // small talk가 존재하는 경우, small talk와 주요 콘텐츠 내용을 분리하여 저장합니다.
    if (temp_num !== null) {
        // small talk가 존재함을 표시합니다.
        temp_obj.smalltalk_yn = "+ HomeLiaison's small talk";

        // small talk 시작 전까지의 항목을 주요 콘텐츠로 저장합니다.
        for (let j = portfolio_keys[i] + 2; j < temp_num; j++) {
            temp_obj.main_contents += this.arr[j]; // 콘텐츠 내용 추가
            temp_obj.main_contents += "\n\n"; // 항목 사이에 개행 추가
        }
        // 마지막에 추가된 불필요한 개행을 제거합니다.
        temp_obj.main_contents = temp_obj.main_contents.slice(0, -2);

        // small talk 이후의 항목을 small talk 내용으로 저장합니다.
        for (let j = temp_num + 1; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
            temp_obj.smalltalk_contents += this.arr[j]; // small talk 내용 추가
            temp_obj.smalltalk_contents += "\n\n"; // 항목 사이에 개행 추가
        }
        // 마지막에 추가된 불필요한 개행을 제거합니다.
        temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.slice(0, -2);
    } else {
        // small talk가 존재하지 않는 경우, 모든 내용을 주요 콘텐츠로 저장합니다.
        for (let j = portfolio_keys[i] + 2; j < ((i === portfolio_keys.length - 1) ? portfolioContent_end : portfolio_keys[i + 1]); j++) {
            temp_obj.main_contents += this.arr[j]; // 콘텐츠 내용 추가
            temp_obj.main_contents += "\n\n"; // 항목 사이에 개행 추가
        }
        // 마지막에 추가된 불필요한 개행을 제거합니다.
        temp_obj.main_contents = temp_obj.main_contents.slice(0, -2);
    }

    // main_contents와 smalltalk_contents에서 불필요한 앞뒤 개행을 제거합니다.
    for (let i = 0; i < 4; i++) {
        temp_obj.main_contents = temp_obj.main_contents.replace(/^\n/, ''); // 앞쪽 개행 제거
        temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/^\n/, ''); // 앞쪽 개행 제거
    }

    for (let i = 0; i < 4; i++) {
        temp_obj.main_contents = temp_obj.main_contents.replace(/\n$/, ''); // 뒤쪽 개행 제거
        temp_obj.smalltalk_contents = temp_obj.smalltalk_contents.replace(/\n$/, ''); // 뒤쪽 개행 제거
    }

    // 처리된 포트폴리오 콘텐츠를 result 객체에 저장합니다.
    result.get("portfolio_contents").set("portfolio_content" + String(i), temp_obj);
  }
  
  // 모든 포트폴리오 콘텐츠를 배열로 변환하여 result에 저장합니다.
  temp_arr = [ result.get("portfolio_init") ];
  for (let i = 0; i < result.get("portfolio_contents").size; i++) {
    temp_arr.push(result.get("portfolio_contents").get("portfolio_content" + String(i)));
  }
  result.set("contents", temp_arr);

  // 리뷰가 있을 경우 리뷰 데이터를 처리합니다.
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
    
    // 리뷰 콘텐츠를 순회하며 데이터를 처리합니다.
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

    // 모든 리뷰 콘텐츠를 배열로 변환하여 result에 저장합니다.
    temp_arr = [ result.get("reviews_init") ];
    for (let i = 0; i < result.get("reviews_contents").size; i++) {
      temp_arr.push(result.get("reviews_contents").get("reviews_content" + String(i)));
    }
    result.set("reviews", temp_arr);
  }

  // 최종 결과 객체(result_obj)를 구성합니다.
  let result_obj = {};

  // 포트폴리오의 제목을 가져와 result_obj에 저장합니다.
  result_obj.title = result.get("title");

  // 제목을 기반으로 공간 정보와 평수를 분리하여 저장합니다.
  temp_arr = result.get("title").split(", "); // 제목을 ", "로 분리하여 배열로 만듭니다.
  temp_arr = temp_arr[1].split("py"); // 두 번째 요소를 "py"로 분리하여 평수와 공간을 구분합니다.
  temp_arr = temp_arr[0].split(" "); // 공간 정보를 " "로 분리하여 배열로 만듭니다.

  // 마지막 단어(평수)를 제외한 공간 정보를 다시 문자열로 만듭니다.
  temp_string = "";
  for (let i = 0; i < temp_arr.length - 1; i++) {
      temp_string += temp_arr[i] + " "; // 공간 정보를 공백으로 구분하여 결합합니다.
  }
  temp_string = temp_string.slice(0, -1); // 마지막에 추가된 불필요한 공백을 제거합니다.

  // 공간 정보와 평수를 result_obj에 저장합니다.
  result_obj.space = temp_string; // 최종적으로 완성된 공간 정보를 저장합니다.
  result_obj.pyeong = temp_arr[temp_arr.length - 1]; // 평수 정보를 저장합니다.

  // 서브 타이틀 관련 정보를 초기화하고 저장합니다.
  result_obj.sub_titles = {};

  // 메인 타이틀을 result_obj의 서브 타이틀에 저장합니다.
  result_obj.sub_titles.main_title = result.get("main_title");

  // 메인 타이틀을 "\n"을 기준으로 분리하여 배열로 만듭니다.
  temp_arr = result.get("main_title").split("\n");

  // 서브 타이틀의 메인 색상 제목을 구성합니다.
  // 두 번째 줄에서 숫자와 "py" 이전의 내용을 가져와서 서브 타이틀로 설정합니다.
  temp_string = temp_arr[1].slice(0, temp_arr[1].search(/[0-9]+py/g) - 1) + '\n' + temp_arr[1].slice(temp_arr[1].search(/[0-9]+py/g));
  result_obj.sub_titles.main_color_title = temp_string; // 메인 색상 제목을 저장합니다.

  // 서브 타이틀의 색상 정보 객체를 초기화하고 저장합니다.
  result_obj.sub_titles.main_color_object = { main: "#ececec", sub: "#d3d2d0", title: "#606060" };

  // 서브 타이틀의 포티벡(portivec) 정보를 저장합니다.
  result_obj.sub_titles.portivec = {};
  result_obj.sub_titles.portivec.main = temp_arr[1]; // 메인 공간 정보
  result_obj.sub_titles.portivec.sub = this.result.portfolio.portivec.sub; // 서브 공간 정보
  result_obj.sub_titles.portivec.region = this.result.portfolio.portivec.region; // 지역 정보
  result_obj.sub_titles.portivec.method = this.result.portfolio.portivec.method; // 방법 정보

  // 서브 타이틀의 명함 정보(name card)를 저장합니다.
  result_obj.sub_titles.name_card = {};
  result_obj.sub_titles.name_card.main = temp_string; // 명함의 메인 텍스트를 저장합니다.
  result_obj.sub_titles.name_card.sub = this.result.portfolio.name_card.sub; // 명함의 서브 텍스트를 저장합니다.

  // 디자이너 정보를 result_obj에 저장합니다.
  result_obj.designer = result.get("designer");

  // 포트폴리오 항목에서 마지막 키를 가져와 photo_key와 함께 저장합니다.
  temp_arr = this.arr[portfolio_keys[portfolio_keys.length - 1]].split(" - ");
  temp_num = Number(temp_arr[1]);
  result_obj.p_id = result.get("p_id"); // 포트폴리오 ID를 저장합니다.

  // 포트폴리오 정보 객체를 구성하고 저장합니다.
  result_obj.p_info = {
      photodae: this.result.portfolio.p_info.photodae, // 포토대(photodae) 정보를 저장합니다.
      photosg: { first: 1, last: temp_num }, // 첫 번째와 마지막 사진의 번호를 저장합니다.
      slide: this.result.portfolio.p_info.slide, // 슬라이드 정보를 저장합니다.
      tag: this.result.portfolio.p_info.tag, // 태그 정보를 저장합니다.
      service: this.result.portfolio.p_info.service, // 서비스 정보를 저장합니다.
      key8: this.result.portfolio.p_info.key8, // 추가 정보 key8을 저장합니다.
      key9: this.result.portfolio.p_info.key9, // 추가 정보 key9를 저장합니다.
  };

  // 디자이너의 제안을 저장합니다.
  result_obj.suggestion = "Designer's\nSuggestion";

  // 포트폴리오 콘텐츠를 result_obj에 저장합니다.
  result_obj.contents = result.get("contents");

  // 리뷰가 없는 경우, 리뷰 관련 필드를 기본값으로 초기화합니다.
  if (!reviewBoo) {
      result_obj.sub_titles.rev_main_title = ""; // 리뷰 메인 타이틀 초기화
      result_obj.sub_titles.revivec = {}; // 리뷰 객체 초기화
      result_obj.sub_titles.revivec.main = ""; // 리뷰 메인 텍스트 초기화
      result_obj.sub_titles.revivec.sub = ""; // 리뷰 서브 텍스트 초기화
      result_obj.sub_titles.revivec.hover = ""; // 리뷰 hover 텍스트 초기화
      result_obj.sub_titles.revivec.mobile = ""; // 리뷰 모바일 텍스트 초기화
      result_obj.sub_titles.rev_name_card = {}; // 리뷰 명함 초기화
      result_obj.sub_titles.rev_name_card.main = ""; // 리뷰 명함 메인 텍스트 초기화
      result_obj.sub_titles.rev_name_card.sub = ""; // 리뷰 명함 서브 텍스트 초기화
      result_obj.sub_titles.rev_name_card.subsub = ""; // 리뷰 명함 서브 서브 텍스트 초기화
      result_obj.r_id = "re999"; // 리뷰 ID 초기화
      result_obj.r_info = {}; // 리뷰 정보 초기화
      result_obj.r_info.photodae = []; // 리뷰 포토대 초기화
      result_obj.r_info.order = 0; // 리뷰 순서 초기화
      result_obj.reviews = [ // 리뷰 내용 초기화
          {
              type: "init", // 초기 리뷰 타입 설정
              contents: [
                  {
                      quest: "", // 질문 초기화
                      answer: "", // 답변 초기화
                  },
              ],
              photos: [], // 사진 목록 초기화
          },
          {
              type: "contents", // 내용 타입 설정
              contents: [
                  {
                      quest: "", // 질문 초기화
                      answer: "", // 답변 초기화
                  },
              ],
              photos: [], // 사진 목록 초기화
          },
      ];
  } else {
      // 리뷰가 있는 경우, 리뷰 관련 정보를 저장합니다.
      result_obj.sub_titles.rev_main_title = result.get("rev_main_title"); // 리뷰 메인 타이틀 저장
      result_obj.sub_titles.revivec = {}; // 리뷰 객체 초기화
      result_obj.sub_titles.revivec.main = this.result.review.revivec.main; // 리뷰 메인 텍스트 저장
      result_obj.sub_titles.revivec.sub = result_obj.sub_titles.portivec.main + " 후기"; // 리뷰 서브 텍스트 저장
      result_obj.sub_titles.revivec.hover = this.result.review.revivec.hover; // 리뷰 hover 텍스트 저장
      result_obj.sub_titles.revivec.mobile = this.result.review.revivec.mobile; // 리뷰 모바일 텍스트 저장
      result_obj.sub_titles.rev_name_card = {}; // 리뷰 명함 초기화
      result_obj.sub_titles.rev_name_card.main = this.result.review.rev_name_card.main; // 리뷰 명함 메인 텍스트 저장
      result_obj.sub_titles.rev_name_card.sub = this.result.review.rev_name_card.sub; // 리뷰 명함 서브 텍스트 저장
      result_obj.sub_titles.rev_name_card.subsub = this.result.review.rev_name_card.subsub; // 리뷰 명함 서브 서브 텍스트 저장
      result_obj.r_id = result.get("r_id"); // 리뷰 ID 저장
      result_obj.r_info = {}; // 리뷰 정보 초기화
      result_obj.r_info.photodae = this.result.review.r_info.photodae; // 리뷰 포토대 저장
      result_obj.r_info.order = this.result.review.r_info.order; // 리뷰 순서 저장
      result_obj.reviews = result.get("reviews"); // 리뷰 내용 저장
  }

  // 최종적으로 처리된 데이터를 this.final에 저장합니다.
  this.final = result_obj;
}

/**
 * 포트폴리오 데이터를 검증하는 함수입니다. 주어진 데이터를 바탕으로
 * 제목, 아파트 이름, 평수 등을 분석하여 검증 결과를 반환합니다.
 * @memberof ResourceMaker
 */
ResourceMaker.prototype.portfolio_verification = function () {
  // 제목(title)을 저장합니다.
  let title;
  // 아파트 이름(apartArr)과 관련된 정보를 저장할 변수를 선언합니다.
  let apartArr, apartText, pyIndex;
  // 최종 결과를 저장할 객체를 초기화합니다.
  let resultObj = {};
  // 리뷰 제목 인덱스와 리뷰 제목 배열을 저장할 변수를 선언합니다.
  let reviewTitleIndex, reviewTitleArr;
  // 리뷰가 없는지 여부를 나타내는 플래그를 초기화합니다.
  let noReview = true;
  // 검증 결과를 저장할 배열을 초기화합니다.
  let booResults = [];

  // this.arr 배열에서 세 번째 요소를 제목으로 설정합니다.
  title = this.arr[2];

  // 제목을 주제(subject)와 아파트(apart)로 나눕니다.
  let [ subject, apart ] = title.split(", ");

  // 포트폴리오 관련 정보를 처리합니다.
  apartArr = apart.split(' '); // 아파트 정보를 공백을 기준으로 분리하여 배열로 만듭니다.
  for (let i = 0; i < apartArr.length; i++) {
    // 각 요소가 "py"로 끝나는지 검사하여 평수 인덱스(pyIndex)를 찾습니다.
    if (/py/gi.test(apartArr[i])) {
      pyIndex = i;
    }
  }

  // 아파트 이름 텍스트를 초기화합니다.
  apartText = '';
  for (let i = 0; i < pyIndex; i++) {
    // 평수 이전까지의 단어들을 합쳐 아파트 이름을 구성합니다.
    apartText += apartArr[i] + ' ';
  }
  apartText = apartText.slice(0, -1); // 마지막 공백을 제거합니다.

  // 포트폴리오 ID를 결과 객체에 저장합니다.
  resultObj.porlid = this.p_id;

  // 원본(raw) 정보를 resultObj 객체에 저장합니다.
  resultObj.raw = {};
  resultObj.raw.apart = { text: apartText, length: apartText.length }; // 아파트 텍스트와 길이 저장
  resultObj.raw.subject = { text: subject, length: subject.length }; // 주제 텍스트와 길이 저장
  resultObj.raw.apartTitle = { text: apart, length: apart.length }; // 아파트 전체 제목 텍스트와 길이 저장

  // 부울(boo) 검증 결과를 resultObj에 저장합니다.
  resultObj.boo = {};
  resultObj.boo.apart = (apartText.length < 12); // 아파트 이름의 길이가 12자 미만인지 확인
  resultObj.boo.subject = (subject.length < 19); // 주제의 길이가 19자 미만인지 확인
  resultObj.boo.apartTitle = (apart.length < 23); // 전체 아파트 제목의 길이가 23자 미만인지 확인
  resultObj.boo.subjectTitle = (subject.length + apartText.length < 27); // 주제와 아파트 이름의 길이 합이 27자 미만인지 확인

  // 리뷰 관련 정보를 처리합니다.
  for (let i = 0; i < this.arr.length; i++) {
    // 배열 요소가 "_review"로 시작하는지 확인하여 리뷰가 있는지 판단합니다.
    if (/^_review/.test(this.arr[i])) {
      reviewTitleIndex = i + 2; // 리뷰 제목이 시작되는 인덱스를 설정합니다.
      noReview = false; // 리뷰가 있음을 나타내는 플래그를 false로 설정합니다.
    }
  }

  // 리뷰가 있을 경우 추가 검증을 수행합니다.
  if (!noReview) {
    // 리뷰 제목을 ", "로 분리하여 배열로 만듭니다.
    reviewTitleArr = this.arr[reviewTitleIndex].split(", ");
    // 첫 번째 리뷰 제목의 길이가 10자 이하인지 확인하고 결과 배열에 추가합니다.
    booResults.push(reviewTitleArr[0].length <= 10);
    // 두 번째 리뷰 제목의 길이가 10자 이하인지 확인하고 결과 배열에 추가합니다.
    booResults.push(reviewTitleArr[1].length <= 10);
  }
};

/**
 * ResourceMaker 클래스의 modelingMap 메서드입니다.
 * 이 메서드는 특정 경로에 있는 `generator.js` 파일의 `ContentsMap` 객체를 불러와
 * 그 객체의 `main` 메서드를 실행하여 생성된 모델을 JSON 형태로 반환합니다.
 *
 * @memberof ResourceMaker
 * @returns {Object} JSON으로 파싱된 모델 객체를 반환합니다.
 */
ResourceMaker.prototype.modelingMap = function () {
  // 현재 작업 디렉토리에서 특정 경로에 위치한 `generator.js` 파일을 불러옵니다.
  // 이 파일 안에 있는 `ContentsMap` 객체를 불러옵니다.
  const map = require(`${process.cwd()}/apps/backMaker/alive/contents/addOn/generator.js`).ContentsMap;
  
  // 불러온 `ContentsMap` 객체의 `main` 메서드를 실행하여 모델을 생성합니다.
  let model = map.main();

  // 생성된 모델 객체를 깊은 복사하여 JSON 형태로 변환한 후 반환합니다.
  return JSON.parse(JSON.stringify(model));
}

/**
 * ResourceMaker 클래스의 portfolio_modeling 메서드입니다.
 * 이 메서드는 주어진 포트폴리오 및 리뷰 데이터를 기반으로 최종 모델을 생성하고,
 * 해당 데이터를 사용하여 포트폴리오 및 리뷰 객체를 구성합니다.
 * @memberof ResourceMaker
 * @param {Array} conidArr - conid 배열입니다.
 * @param {string} proid - 프로젝트 ID입니다.
 * @param {string} cliid - 클라이언트 ID입니다.
 * @param {Object} service - 서비스 객체입니다.
 * @returns {Promise<void>} 최종 모델을 this.final에 저장합니다.
 */
ResourceMaker.prototype.portfolio_modeling = async function (conidArr, proid, cliid, service) {
  // 현재 인스턴스를 instance 변수에 저장합니다.
  const instance = this;
  // 백엔드 관련 메서드를 호출하기 위한 객체를 back 변수에 저장합니다.
  const back = this.back;
  // Mother 클래스에서 제공하는 유틸리티 메서드를 가져옵니다.
  const { fileSystem, orderSystem, autoComma } = this.mother;
  // 이전에 생성된 최종 결과 객체를 가져옵니다.
  const past = this.final;

  // 주어진 raw date 문자열을 YYYY-MM-DD 형식으로 변환하는 함수입니다.
  const dateMaker = function (dateRaw) {
    let date = "20" + dateRaw.slice(0, 2) + "-" + dateRaw.slice(2, 4) + "-" + dateRaw.slice(4);
    return date;
  }

  // 이미지 파싱을 위한 ImageReader 클래스를 가져옵니다.
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  // ImageReader 인스턴스를 생성합니다.
  const garoseroParser = new ImageReader();
  
  // 예산 배열을 정의합니다.
  const budgetArr = [
    "500만원 이하",
    "1,000만원",
    "1,500만원",
    "2,000만원",
    "3,000만원",
    "4,000만원",
    "5,000만원 이상",
    "6,000만원 이상",
    "7,000만원 이상",
    "8,000만원 이상",
    "9,000만원 이상",
    "1억원 이상",
  ];

  try {
    // 다양한 변수들을 선언합니다.
    let tempObj, tempObjDetail, portfolio, review;
    let targetPhotoDirArr, targetPhotoDirRaw, targetPhotoDir, targetPhotoDirFinal;
    let tempReg, conidTargetArr;
    let garoseroObj;
    let todayString;
    let thisDeisnger;
    let tempString, thisIndex;
    let thisRequestNumber;
    let thisClient;
    let thisProject;
    let pastPhotoKey;

    // modelingMap 메서드를 호출하여 기본 구조를 생성합니다.
    tempObj = this.modelingMap().structure;

    // 기본 정보를 초기화합니다.
    tempObj.conid = "";
    tempObj.desid = past.designer;
    tempObj.cliid = cliid;
    tempObj.proid = proid;
    tempObj.service = service;

    // 디자이너 정보를 백엔드에서 가져옵니다.
    thisDeisnger = await back.getDesignerById(tempObj.desid);

    // 포트폴리오 객체를 생성합니다.
    portfolio = tempObj.contents.portfolio;

    // 이전 결과에서 포트폴리오 ID를 설정합니다.
    portfolio.pid = past.p_id;

    // 포트폴리오의 공간 정보 및 예산 정보를 설정합니다.
    portfolio.spaceInfo.space = past.space;
    portfolio.spaceInfo.pyeong = Number(past.pyeong);
    portfolio.spaceInfo.region = past.sub_titles.portivec.region;
    portfolio.spaceInfo.method = past.sub_titles.portivec.method;
    portfolio.spaceInfo.budget = "3,000만원";

    // 클라이언트 ID가 유효한지 확인하고 예산 정보를 업데이트합니다.
    if (typeof cliid === "string" && /^c/gi.test(cliid) && cliid.trim() !== "") {
      thisClient = await back.getClientById(cliid);
      thisClient = thisClient.toNormal();
      thisProject = await back.getProjectById(proid);
      thisProject = thisProject.toNormal();
      thisRequestNumber = 0;
      for (let i = 0; i < thisClient.requests.length; i++) {
        if (thisClient.requests[i].request.timeline.valueOf() <= thisProject.proposal.date.valueOf()) {
          thisRequestNumber = i;
          break;
        }
      }
      if (thisClient.requests[thisRequestNumber].request.budget !== "알 수 없음") {
        portfolio.spaceInfo.budget = thisClient.requests[thisRequestNumber].request.budget;
      } else {
        if (!Number.isNaN(Number(past.pyeong))) {
          tempString = autoComma(Math.floor((Number(past.pyeong) + 20) / 10) * 1000, false);
          thisIndex = budgetArr.findIndex((str) => { return (new RegExp(tempString, "gi")).test(str) });
          if (thisIndex !== -1) {
            portfolio.spaceInfo.budget = budgetArr[thisIndex];
          }
        }
      }
    } else {
      if (!Number.isNaN(Number(past.pyeong))) {
        tempString = autoComma(Math.floor((Number(past.pyeong) + 20) / 10) * 1000, false);
        thisIndex = budgetArr.findIndex((str) => { return (new RegExp(tempString, "gi")).test(str) });
        if (thisIndex !== -1) {
          portfolio.spaceInfo.budget = budgetArr[thisIndex];
        }
      }
    }

    // 포트폴리오 제목 및 색상 정보를 설정합니다.
    portfolio.title.main = past.title;
    portfolio.title.sub = past.sub_titles.portivec.sub;

    portfolio.color.main = past.sub_titles.main_color_object.main;
    portfolio.color.sub = past.sub_titles.main_color_object.sub;
    portfolio.color.title = past.sub_titles.main_color_object.title;

    // 포트폴리오의 세부 정보를 설정합니다.
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
    portfolio.detailInfo.tendency = thisDeisnger.analytics.styling.tendency.toNormal();

    portfolio.contents.suggestion = past.suggestion;
    portfolio.contents.detail = [];

    // 이전에 저장된 사진 키를 기반으로 세부 내용을 구성합니다.
    pastPhotoKey = 0;
    for (let { title, main_contents, smalltalk_yn, smalltalk_contents, photo_key } of past.contents) {
      tempObjDetail = {
        title: "",
        contents: "",
        photo: [],
      };
      for (let i = pastPhotoKey + 1; i < photo_key + 1; i++) {
        tempObjDetail.photo.push(i);
      }
      tempObjDetail.title = title;
      tempObjDetail.contents = main_contents;
      portfolio.contents.detail.push(tempObjDetail);
      pastPhotoKey = photo_key;
    }

    // 리뷰 객체를 설정합니다.
    review = tempObj.contents.review;

    // 리뷰가 존재하는 경우, 리뷰 정보를 추가합니다.
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

    // 오늘 날짜를 설정합니다.
    todayString = dateMaker(this.mother.todayMaker("year"));
    portfolio.date = new Date();
    review.date = new Date();

    // 타겟 폴더에서 사진 디렉토리를 읽어옵니다.
    targetPhotoDirArr = [];
    targetPhotoDirRaw = await fileSystem(`readDir`, [ this.targetFolder ]);
    targetPhotoDir = await garoseroParser.queryDirectory(this.targetFolder);
    for (let z of targetPhotoDirRaw) {
      if (z !== `.DS_Store`) {
        targetPhotoDirArr.push(z);
      }
    }

    // 최종 디렉토리를 구성합니다.
    targetPhotoDirFinal = [];
    for (let { index, gs } of targetPhotoDir) {
      garoseroObj = {};
      garoseroObj.index = index + 1;
      garoseroObj.gs = gs;
      targetPhotoDirFinal.push(garoseroObj);
    }

    // 포토 객체를 업데이트합니다.
    tempObj.photos.first = 1;
    tempObj.photos.last = targetPhotoDirArr.length;
    tempObj.photos.detail = targetPhotoDirFinal;

    // conid를 설정합니다.
    conidTargetArr = [];
    tempReg = new RegExp('^t' + todayString.slice(2, 4) + todayString.slice(5, 7));
    for (let { conid } of conidArr) {
      if (tempReg.test(conid)) {
        conidTargetArr.push(conid);
      }
    }

    // conid가 없는 경우, 새로운 conid를 생성합니다.
    if (conidTargetArr.length === 0) {
      tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_" + orderSystem("encode", 1));
    } else {
      tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_" + orderSystem("encode", (orderSystem("decode", conidTargetArr[0]) + 1)));
    }

    // 최종 결과 객체를 저장합니다.
    this.final = tempObj;

  } catch (e) {
    // 오류가 발생하면 이를 로그에 기록합니다.
    errorLogSync(e);
  }
}

/**
 * ResourceMaker 클래스의 launching 메서드입니다.
 * 이 메서드는 주어진 콘텐츠 데이터를 기반으로 포트폴리오를 생성하고, 
 * 관련된 이미지 파일들을 처리하여 서버에 업로드합니다.
 * @memberof ResourceMaker
 * @param {Array} thisContents - 콘텐츠 배열입니다.
 * @returns {Promise<void>} 최종 포트폴리오 데이터를 서버에 저장하고, 파일들을 업로드합니다.
 */
ResourceMaker.prototype.launching = async function (thisContents = []) {
  // 현재 인스턴스를 변수에 저장하여 사용합니다.
  const instance = this;

  // 백엔드 관련 메서드를 호출하기 위한 객체를 back 변수에 저장합니다.
  const back = this.back;

  // Mother 클래스에서 제공하는 다양한 유틸리티 메서드를 가져옵니다.
  const { fileSystem, mongo, mongoinfo, mongocontentsinfo, shellExec, shellLink, headRequest, binaryRequest, ghostFileUpload, requestSystem, chromeOpen, sleep } = this.mother;

  // MongoDB와 관련된 객체를 생성합니다.
  const MONGOC = new mongo(mongoinfo);
  const MONGOCONTENTSC = new mongo(mongocontentsinfo);

  // 이미지 크기와 품질에 대한 상수 배열과 값을 정의합니다.
  const sizeMatrix = [
    [ 1200, 848 ],
    [ 800, 566 ],
    [ 2400, 1697 ]
  ];
  const qualityConst = 96;
  const bQualityConst = 98;

  // 이미지 파일 이름의 접두사를 정의합니다.
  const originalInitial = 'i';
  const desktopInitial = 't';
  const mobileInitial = 'mot';
  const reviewInitial = 'b';

  // 서버에 업로드할 경로를 설정합니다.
  const serverFolderPath = "corePortfolio/listImage";

  try {
    // 다양한 변수를 선언합니다.
    let targetFolder;
    let tempFolderName, homeFolderList, tempHome;
    let temp, tempReg;
    let note;
    let input;
    let tempResponse, index;
    let tempObject;
    let tempRows;
    let namesArr;
    let clients;
    let thisProject;
    let searchQuery;
    let projects;
    let proid, cliid;
    let whereQuery, updateQuery;
    let targetContents, targetRawContentsArr, targetRawContents;
    let outputFolder, outputFolderList;
    let outputMobildFolder, outputMobildFolderList;
    let fromArr, toArr;
    let thisService;
    let contentsArr;

    // MongoDB 연결을 설정합니다.
    await MONGOC.connect();
    await MONGOCONTENTSC.connect();

    // 임시 디렉터리 생성
    tempFolderName = "tempResourcMakerFolder";
    tempHome = process.env.HOME + "/" + tempFolderName;
    homeFolderList = await fileSystem(`readDir`, [ process.env.HOME ]);

    // 이미 동일한 이름의 디렉터리가 존재하면 삭제합니다.
    if (homeFolderList.includes(tempFolderName)) {
      await shellExec(`rm -rf ${shellLink(tempHome)}`);
    }
    // 새로운 임시 디렉터리를 생성합니다.
    await shellExec(`mkdir ${shellLink(tempHome)}`);

    // 콘텐츠 배열을 현재 인스턴스의 arr 속성에 저장합니다.
    this.arr = thisContents;

    // 포트폴리오 ID로 이미 존재하는 콘텐츠가 있는지 확인합니다.
    tempRows = await back.getContentsArrByQuery({ "contents.portfolio.pid": this.p_id });
    if (tempRows.length !== 0) {
      throw new Error("invaild pid");
    }

    // 포트폴리오 이미지의 총 개수를 파악합니다.
    tempResponse = 200;
    index = 0;
    while (tempResponse === 200) {
      index++;
      tempResponse = await headRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/" + originalInitial + String(index) + this.p_id + ".jpg");
      tempResponse = tempResponse.statusCode;
    }
    console.log(index);

    // 모든 이미지를 다운로드합니다.
    for (let i = 1; i < index; i++) {
      tempObject = await binaryRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/" + originalInitial + String(i) + this.p_id + ".jpg");
      await fileSystem(`writeBinary`, [ tempHome + "/" + originalInitial + String(i) + this.p_id + ".jpg", tempObject ]);
      console.log(tempHome + "/" + originalInitial + String(i) + this.p_id + ".jpg", `download success`);
    }

    // 다운로드한 파일들이 저장된 폴더를 targetFolder에 저장합니다.
    this.targetFolder = tempHome;

    // 포트폴리오 정보 생성 및 raw 파일 저장
    this.infoMaker();
    this.portfolio_maker();
    await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}_raw.js`, JSON.stringify(this.final, null, 2) ]);

    // 클라이언트 ID와 프로젝트 ID를 파싱합니다.
    namesArr = this.arr[1].split(" ");

    if (namesArr.length > 2) {
      clients = await this.back.getClientsByQuery({ name: namesArr[2].trim() });
      thisProject = null;
      proid = null;
      cliid = null;

      // 디자이너와 클라이언트를 기반으로 검색 쿼리를 생성합니다.
      searchQuery = { $and: [ { desid: this.result.designer }, { $or: clients.toNormal().map((c) => { return { cliid: c.cliid } }) } ] };
      projects = await this.back.getProjectsByQuery(searchQuery);
      console.log(projects);

      if (projects.length > 0) {
        // 프로젝트 배열에서 중복되지 않은 프로젝트 ID를 필터링합니다.
        contentsArr = (await this.back.getContentsArrByQuery({ $or: projects.toNormal().map((p) => { return { proid: p.proid } }) })).toNormal().map((c) => {
          return c.proid;
        });
        projects = projects.toNormal().filter((p) => { return !contentsArr.includes(p.proid) });
        thisProject = projects[0];
        proid = thisProject.proid;
        cliid = thisProject.cliid;
        thisService = thisProject.service;
      }

      // 클라이언트 ID 또는 프로젝트 ID가 null일 경우 로그에 출력합니다.
      if (cliid === null) {
        console.log(namesArr);
      }
      if (proid === null) {
        console.log(namesArr);
      }
    } else {
      // 기본 서비스 정보를 설정합니다.
      proid = "";
      cliid = "";
      thisService = {
        serid: "s2011_aa02s",
        xValue: "B",
        online: false,
      }
    }

    // 리소스를 렌더링하고 파일을 작성합니다.
    temp = await MONGOC.db(`miro81`).collection(`contents`).find({}).project({ conid: 1 }).sort({ conid: -1 }).limit(1).toArray();
    await this.portfolio_modeling(temp, proid, cliid, thisService);
    await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}.js`, JSON.stringify(this.final, null, 2) ]);

    // 확인 단계: 출력 폴더와 모바일 폴더 생성
    outputFolder = tempHome + "/portp" + this.p_id;
    outputMobildFolder = outputFolder + "/mobile";

    await shellExec(`mkdir`, [ outputFolder ]);
    await shellExec(`mkdir`, [ outputMobildFolder ]);

    // 모든 사진을 변환하여 적절한 크기와 품질로 저장합니다.
    for (let { index, gs } of this.final.photos.detail) {
      await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(index)}${this.p_id}.jpg -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(outputFolder)}/${desktopInitial}${String(index)}${this.p_id}.jpg`);
      await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(index)}${this.p_id}.jpg -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(outputMobildFolder)}/${mobileInitial}${String(index)}${this.p_id}.jpg`);
    }

    // 리뷰와 포트폴리오에 대한 추가 사진 변환을 처리합니다.
    if (this.final.contents.review.detailInfo.photodae.length > 1) {
      await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(this.final.contents.review.detailInfo.photodae[1])}${this.p_id}.jpg -resize ${String(sizeMatrix[2][0]) + "x" + String(sizeMatrix[2][1])} -quality ${String(bQualityConst)} ${shellLink(outputFolder)}/${reviewInitial}${String(this.final.contents.review.detailInfo.photodae[1])}${this.p_id}.jpg`);
    }
    await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(this.final.contents.portfolio.detailInfo.photodae[1])}${this.p_id}.jpg -resize ${String(sizeMatrix[2][0]) + "x" + String(sizeMatrix[2][1])} -quality ${String(bQualityConst)} ${shellLink(outputFolder)}/${reviewInitial}${String(this.final.contents.portfolio.detailInfo.photodae[1])}${this.p_id}.jpg`);
    await shellExec(`cp -r ${shellLink(outputFolder)} /home/ubuntu/samba/list_image/`);

    // 출력 폴더와 모바일 폴더의 파일 목록을 가져옵니다.
    outputFolderList = await fileSystem(`readDir`, [ outputFolder ]);
    outputMobildFolderList = await fileSystem(`readDir`, [ outputMobildFolder ]);

    fromArr = [];
    toArr = [];

    // 서버 경로에 새로운 폴더를 생성합니다.
    try {
      await shellExec("mkdir", [ "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id ]);
    } catch {}
    try {
      await shellExec("mkdir", [ "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id + "/mobile" ]);
    } catch {}

    // 모든 파일을 해당 경로에 복사합니다.
    for (let i of outputFolderList) {
      if (i !== `.DS_Store` && /^[bt]/.test(i)) {
        fromArr.push(outputFolder + "/" + i);
        await shellExec("cp", [ outputFolder + "/" + i, "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id + "/" ]);
        toArr.push(`${serverFolderPath}/${this.p_id}/${i}`);
      }
    }
    for (let i of outputMobildFolderList) {
      if (i !== `.DS_Store`) {
        fromArr.push(outputMobildFolder + "/" + i);
        await shellExec("cp", [ outputMobildFolder + "/" + i, "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id + "/mobile/" ]);
        toArr.push(`${serverFolderPath}/${this.p_id}/mobile/${i}`);
      }
    }

    // MongoDB에 최종 데이터를 삽입합니다.
    await MONGOC.db(`miro81`).collection(`contents`).insertOne(this.final);

    // 기존 콘텐츠를 삭제합니다.
    await back.mongoDelete("foreContents", { pid: this.p_id }, { selfMongo: MONGOCONTENTSC });

    // 콘텐츠가 성공적으로 업로드되었음을 알립니다.
    await requestSystem("https://" + instance.address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

    console.log("contents upload done");

    // 임시 폴더를 삭제합니다.
    await shellExec(`rm -rf ${shellLink(process.env.HOME)}/${tempFolderName}`);

  } catch (e) {
    // 예외 발생 시 콘솔에 오류를 출력합니다.
    errorLogSync(e);
  } finally {
    // MongoDB 연결을 종료합니다.
    await MONGOC.close();
    await MONGOCONTENTSC.close();
  }
}

/**
 * PortfolioFilter 클래스는 포트폴리오 필터링 작업을 수행합니다.
 * 이 클래스는 클라이언트 이름, 아파트 이름, 디자이너, 포트폴리오 ID를 기준으로 필터링 옵션을 설정합니다.
 * @class
 */
class PortfolioFilter {
  /**
   * PortfolioFilter 클래스의 생성자 함수입니다.
   * 초기화 과정에서 여러 모듈과 클래스들을 불러오고, 기본적인 설정을 수행합니다.
   * @constructor
   * @param {string} [clientName=""] - 클라이언트의 이름입니다.
   * @param {string} [apartName=""] - 아파트의 이름입니다.
   * @param {string} [designer=""] - 디자이너의 이름입니다.
   * @param {string} [pid="g0"] - 포트폴리오 ID입니다.
   */
  constructor (clientName = "", apartName = "", designer = "", pid = "g0") {
    // Mother 클래스와 관련된 모듈을 현재 작업 디렉터리에서 불러옵니다.
    const Mother = require(`${process.cwd()}/apps/mother.js`);

    // BackMaker 클래스와 관련된 모듈을 현재 작업 디렉터리에서 불러옵니다.
    const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

    // ImageReader 클래스와 관련된 모듈을 현재 작업 디렉터리에서 불러옵니다.
    const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);

    // 한글 파싱과 관련된 모듈을 불러옵니다.
    const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");

    // 아파트 이름을 특정 형식으로 변환하는 함수를 정의합니다.
    const apart = function (str) {
      // 문자열을 공백을 기준으로 나눈 후, 각 요소에 '_'를 추가합니다.
      let arr = str.split(' ');
      let new_string = '';
      for (let i of arr) {
        new_string += i + '_';
      }
      // 마지막으로 "홈스타일링_"을 문자열 끝에 추가합니다.
      new_string += "홈스타일링_";
      return new_string;
    }

    // Mother 클래스의 인스턴스를 생성하여 this.mother에 저장합니다.
    this.mother = new Mother();

    // BackMaker 클래스의 인스턴스를 생성하여 this.back에 저장합니다.
    this.back = new BackMaker();

    // 주소 객체를 가져와서 this.address에 저장합니다.
    this.address = require(`${process.cwd()}/apps/infoObj.js`);

    // ImageReader 클래스의 인스턴스를 생성하며, 인자로 mother, back, address를 전달합니다.
    this.image = new ImageReader(this.mother, this.back, this.address);

    // ParsingHangul 클래스의 인스턴스를 생성하여 this.hangul에 저장합니다.
    this.hangul = new ParsingHangul();

    // 클라이언트 이름을 this.clientName에 저장합니다.
    this.clientName = clientName;

    // 디자이너 이름을 this.designer에 저장합니다.
    this.designer = designer;

    // 아파트 이름을 변환한 값을 this.apartName에 저장합니다.
    this.apartName = apart(apartName);

    // 포트폴리오 ID를 this.pid에 저장합니다.
    this.pid = pid;

    // 리소스 폴더 이름을 "resource"로 설정하여 this.resourceFolderName에 저장합니다.
    this.resourceFolderName = "resource";

    // 결과 폴더 이름을 "result"로 설정하여 this.resultFolderName에 저장합니다.
    this.resultFolderName = "result";

    // 옵션 객체를 설정하여, 각 디렉터리 경로를 포함한 설정을 초기화합니다.
    this.options = {
      home_dir: `${process.env.HOME}/portfolioFilter`,
      photo_dir: `${process.env.HOME}/portfolioFilter/${this.resourceFolderName}`,
      result_dir: `${process.env.HOME}/portfolioFilter/${this.resultFolderName}`,
    };

    // 클라이언트 이름이 Null로 간주되는 경우의 목록을 배열로 정의하여 this.clientNullATarget에 저장합니다.
    this.clientNullATarget = [
      "null",
      "NULL",
      "Null",
      "no",
      "",
      "X",
      "x",
      "nothing",
      "anyone",
      "없음",
      "a",
      "A",
      "designer",
      "Designer",
      "DESIGNER",
      "undefined"
    ];
  }
}

/**
 * PortfolioFilter 클래스의 static_setting 메서드는 포트폴리오 필터를 위한 정적 디렉터리 구조를 설정합니다.
 * 이 메서드는 필요한 폴더가 존재하지 않을 경우 해당 폴더들을 생성합니다.
 * @async
 * @function static_setting
 * @memberof PortfolioFilter
 */
PortfolioFilter.prototype.static_setting = async function () {
  // 현재 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 객체에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  const { fileSystem, shellExec, shellLink } = this.mother;

  try {
    // HOME 디렉터리 내의 파일 및 폴더 목록을 읽어옵니다.
    let staticFolderBoo, staticFolderBootr;
    let order;
    let staticFolderscriptBoo, staticFolderscriptBootr;
    let staticFolderresultBootr, staticFolderresourceBootr;
    let folderList;

    // HOME 디렉터리 내의 폴더 목록을 읽어옵니다.
    staticFolderBoo = await this.mother.fileSystem(`readDir`, [ process.env.HOME ]);

    // 포트폴리오 필터와 관련된 폴더가 존재하는지 여부를 추적하는 변수를 초기화합니다.
    staticFolderBootr = false;

    // HOME 디렉터리 내에서 "portfolioFilter"로 시작하는 폴더가 존재하는지 확인합니다.
    for (let i of staticFolderBoo) {
      if (/^portfolioFilter/.test(i)) {
        staticFolderBootr = true; // 해당 폴더가 존재할 경우 true로 설정합니다.
      }
    }

    // 만약 "portfolioFilter" 폴더가 존재하지 않는다면
    if (!staticFolderBootr) {
      order = ``; // 명령어 문자열을 초기화합니다.
      
      // home_dir, script, result, resource 디렉터리를 생성하는 명령어를 작성합니다.
      order += `mkdir ${shellLink(this.options.home_dir)};`;
      order += `mkdir ${shellLink(this.options.home_dir)}/script;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/result;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/resource;`;

      // 작성한 명령어를 실행하여 필요한 디렉터리를 생성합니다.
      await shellExec(order);
    } else {
      // "portfolioFilter" 폴더가 존재하는 경우, 각 하위 폴더가 있는지 확인합니다.

      // home_dir 내의 파일 및 폴더 목록을 읽어옵니다.
      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);

      // "script" 폴더가 존재하는지 여부를 추적하는 변수를 초기화합니다.
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) {
          staticFolderscriptBootr = true; // "script" 폴더가 존재할 경우 true로 설정합니다.
        }
      }
      // "script" 폴더가 존재하지 않으면 생성합니다.
      if (!staticFolderscriptBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/script`);
      }

      // "result" 폴더가 존재하는지 여부를 추적하는 변수를 초기화합니다.
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) {
          staticFolderresultBootr = true; // "result" 폴더가 존재할 경우 true로 설정합니다.
        }
      }
      // "result" 폴더가 존재하지 않으면 생성합니다.
      if (!staticFolderresultBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/result`);
      }

      // "resource" 폴더가 존재하는지 여부를 추적하는 변수를 초기화합니다.
      staticFolderresourceBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^resource$/.test(i)) {
          staticFolderresourceBootr = true; // "resource" 폴더가 존재할 경우 true로 설정합니다.
        }
      }
      // "resource" 폴더가 존재하지 않으면 생성합니다.
      if (!staticFolderresourceBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/resource`);
      }
    }
  } catch (e) {
    // 오류가 발생한 경우, 오류 메시지를 콘솔에 출력합니다.
    console.log(e.message);
  }
}

/**
 * PortfolioFilter 클래스의 image_filter 메서드는 이미지 파일명을 특정 형식으로 필터링하고 변경합니다.
 * 이 메서드는 주어진 문자열(str)과 크기(size)를 사용하여 날짜 정보를 포함한 새로운 파일명을 생성합니다.
 * @function image_filter
 * @memberof PortfolioFilter
 * @param {string} str - 원본 파일명
 * @param {string} size - 이미지 크기 정보 (예: "small", "medium", "large")
 * @returns {string} 필터링된 새로운 파일명
 */
PortfolioFilter.prototype.image_filter = function (str, size) {
  // 현재 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // 현재 날짜 정보를 가져옵니다.
  let date = new Date();

  // 연도의 마지막 두 자리를 문자열로 변환하여 datestring에 저장합니다.
  let datestring = String(date.getFullYear()).slice(2);

  // 월이 10보다 작으면 앞에 '0'을 붙여 두 자릿수로 만듭니다.
  if (date.getMonth() + 1 < 10) {
    datestring += '0' + String(date.getMonth() + 1);
  } else {
    datestring += String(date.getMonth() + 1);
  }

  // 일이 10보다 작으면 앞에 '0'을 붙여 두 자릿수로 만듭니다.
  if (date.getDate() < 10) {
    datestring += '0' + String(date.getDate());
  } else {
    datestring += String(date.getDate());
  }

  // 원본 파일명에서 "_YYYYMM" 패턴을 제거합니다.
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');

  // 숫자가 아닌 모든 문자를 제거합니다.
  str = str.replace(/[^0-9]/g, '');

  // 파일명의 시작에 '0'이 있으면 제거합니다.
  str = str.replace(/^0/g, '');

  // 파일명이 한 자리 숫자인 경우, 앞에 '0'을 추가하여 두 자릿수로 만듭니다.
  if (str.length === 1) {
    str = '0' + str;
  }

  // clientName이 비어있지 않고, "없음"이 포함되어 있지 않다면 clientName을 파일명에 포함합니다.
  if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
    str = this.clientName + '_' + size + '_' + str + '_' + datestring + '.jpg';
  } else {
    // 그렇지 않으면, designer를 파일명에 포함합니다.
    str = this.designer + '_' + size + '_' + str + '_' + datestring + '.jpg';
  }

  // 필터링된 파일명을 반환합니다.
  return str;
}

/**
 * PortfolioFilter 클래스의 just_filter 메서드는 주어진 문자열에서 특정 패턴을 제거하고 숫자만 남기는 기능을 수행합니다.
 * 이 메서드는 문자열 내에서 날짜 패턴을 제거하고, 숫자가 아닌 모든 문자를 제거하며, 
 * 남은 숫자 중에서 앞에 있는 '0'을 제거하여 필터링된 문자열을 반환합니다.
 * @function just_filter
 * @memberof PortfolioFilter
 * @param {string} str - 필터링할 원본 문자열
 * @returns {string} 필터링된 문자열
 */
PortfolioFilter.prototype.just_filter = function (str) {
  // 문자열에서 "_YYYYMM" 형식의 날짜 패턴을 제거합니다.
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');

  // 문자열에서 숫자가 아닌 모든 문자를 제거합니다.
  str = str.replace(/[^0-9]/g, '');

  // 문자열이 '0'으로 시작할 경우, 해당 '0'을 제거합니다.
  str = str.replace(/^0/g, '');

  // 최종적으로 필터링된 문자열을 반환합니다.
  return str;
}

/**
 * PortfolioFilter 클래스의 to_portfolio 메서드는 주어진 이미지 파일들을 지정된 크기로 변환하고,
 * 결과를 저장할 폴더를 생성하여 이미지들을 저장하는 기능을 수행합니다.
 * 이 메서드는 선택적으로 liteMode를 활성화하여 더 작은 이미지 크기로 변환할 수 있습니다.
 * @function to_portfolio
 * @memberof PortfolioFilter
 * @param {boolean} [liteMode=false] - liteMode가 true인 경우, 이미지를 작은 크기로 변환합니다.
 * @returns {Promise<string|null>} 결과 폴더의 경로를 반환하거나, 오류가 발생한 경우 null을 반환합니다.
 */
PortfolioFilter.prototype.to_portfolio = async function (liteMode = false) {
  // 현재 인스턴스를 참조하는 instance 변수와 image 객체를 선언합니다.
  const instance = this;
  const image = this.image;

  // Mother 객체에서 필요한 메서드를 가져옵니다.
  const { fileSystem, shellExec, shellLink, todayMaker } = this.mother;

  // 옵션 객체를 초기화하고, 필요한 경로와 파일 목록을 설정합니다.
  let options = {
    home_dir: this.options.home_dir,
    apart_name: this.apartName,
    photo_dir: this.options.photo_dir,
    result_dir: this.options.result_dir,
    photo_list: [],
  };

  try {
    let file_list, resultFolderBoo;
    let rawFix_file_list;
    let new_photo_name, new_photo_name_list;
    let photo_sizes;
    let resultFolder;
    let tempObj;
    let pngResultFolder;
    let pngImageList;

    // 사진이 있는 폴더에서 파일 목록을 가져옵니다.
    file_list = await fileSystem(`readFolder`, [ this.options.photo_dir ]);

    // 사진이 없으면 에러를 발생시킵니다.
    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
    }

    // 파일 목록을 정렬하고, 파일명을 photo1.jpg 형식으로 변경합니다.
    file_list.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < file_list.length; i++) {
      await shellExec(`mv ${shellLink(this.options.photo_dir + "/" + file_list[i])} ${shellLink(this.options.photo_dir)}/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    options.photo_list = file_list;
    console.log(file_list);

    // 원본 사진 목록을 초기화합니다.
    rawFix_file_list = [];
    for (let photo of file_list) {
      rawFix_file_list.push(`${this.options.photo_dir}/${photo}`);
    }
    console.log(rawFix_file_list);

    // liteMode에 따라 변환할 사진의 크기를 설정합니다.
    photo_sizes = liteMode ? [ "780" ] : [ "3508" ];

    // 결과 폴더를 비웁니다.
    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of resultFolderBoo) {
      await shellExec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`);
    }

    // clientName이 유효하면 폴더 이름에 포함하고, 그렇지 않으면 포함하지 않습니다.
    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      this.folderName = `${this.pid}_${this.designer}_${this.clientName}_${todayMaker("total")}`;
    } else {
      this.folderName = `${this.pid}_${this.designer}_${todayMaker("total")}`;
    }
    resultFolder = `${this.options.result_dir}/${this.folderName}`;
    this.resultFolder = resultFolder;

    // 결과 폴더를 생성합니다.
    await shellExec(`mkdir ${shellLink(resultFolder)}`);

    // 지정된 크기별로 사진을 변환하고 저장합니다.
    for (let i of photo_sizes) {
      new_photo_name_list = [];
      await shellExec(`mkdir ${shellLink(resultFolder)}/${i}`);
      for (let targetImage of rawFix_file_list) {
        new_photo_name = this.image_filter(targetImage, i);
        tempObj = await image.toOfficialImage(targetImage, Number(i), false, liteMode);
        await shellExec(`mv ${shellLink(tempObj.output)} ${shellLink(resultFolder)}/${i}/${new_photo_name}`);
        new_photo_name_list.push(`${resultFolder}/${i}/${new_photo_name}`);
      }
    }

    // 결과 폴더 경로를 반환합니다.
    return resultFolder;

  } catch (e) {
    // 오류가 발생한 경우, 오류 메시지를 출력하고 null을 반환합니다.
    errorLogSync(e);
    return null;
  }
}

/**
 * PortfolioFilter 클래스의 parsing_fileList 메서드는 결과 폴더에서 특정 크기의 이미지 파일 목록을 읽어와서
 * 파일 경로를 반환합니다. 이 메서드는 liteMode를 사용하여 작은 이미지 크기만 읽어올 수 있습니다.
 * @function parsing_fileList
 * @memberof PortfolioFilter
 * @param {string} resultFolder - 결과 폴더의 경로.
 * @param {boolean} [liteMode=false] - liteMode가 true이면 780 크기의 이미지 파일만 처리합니다.
 * @returns {Promise<Object>} 파일 경로 목록 객체를 반환합니다.
 */
PortfolioFilter.prototype.parsing_fileList = async function (resultFolder, liteMode = false) {
  // 현재 인스턴스를 참조하기 위한 instance 변수 선언.
  const instance = this;

  // Mother 객체의 fileSystem 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem } = this.mother;

  try {
    // 각 크기별 파일 목록을 저장할 변수 선언.
    let fileList_780_raw, fileList_1500_raw, fileList_original_raw, fileList_png_raw;
    let fileList_780, fileList_1500, fileList_original, fileList_png;
    
    // resultFolder의 상위 폴더 경로를 추출하여 저장.
    let resultFolderArr, resultFolderParent;

    // 결과 폴더 경로를 '/'로 분리하여 배열로 변환하고, 마지막 요소(폴더명)를 제거하여 상위 폴더 경로 생성.
    resultFolderArr = resultFolder.split('/');
    resultFolderArr.pop();
    resultFolderParent = resultFolderArr.join('/');

    try {
      // 780 크기의 파일 목록을 읽어옵니다.
      fileList_780_raw = await fileSystem(`readDir`, [ `${resultFolder}/780` ]);

      // liteMode가 아닐 경우, 원본 크기(3508)의 파일 목록을 읽어옵니다.
      if (!liteMode) {
        fileList_original_raw = await fileSystem(`readDir`, [ `${resultFolder}/3508` ]);
      }
    } catch {
      // 파일을 읽어오지 못한 경우, 빈 배열로 초기화합니다.
      fileList_780_raw = [];
      fileList_original_raw = [];
    }

    // 최종 파일 경로 목록을 저장할 배열을 초기화합니다.
    fileList_780 = [];
    fileList_original = [];

    // .DS_Store 파일을 제외하고 780 크기 파일의 경로를 fileList_780 배열에 추가합니다.
    for (let i of fileList_780_raw) {
      if (i !== `.DS_Store`) {
        fileList_780.push(resultFolder + "/780/" + i);
      }
    }

    // liteMode가 아닌 경우, .DS_Store 파일을 제외하고 원본 크기(3508) 파일의 경로를 fileList_original 배열에 추가합니다.
    if (!liteMode) {
      for (let i of fileList_original_raw) {
        if (i !== `.DS_Store`) {
          fileList_original.push(resultFolder + "/3508/" + i);
        }
      }
    }

    // 최종적으로 780, 1500, 원본 크기, png 파일 목록을 포함한 객체를 반환합니다.
    return { fileList_780, fileList_1500: [], fileList_original, fileList_png: [] };
  } catch (e) {
    // 예외 발생 시, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);
  }
}

/**
 * PortfolioFilter 클래스의 total_make 메서드는 포트폴리오 사진을 처리하고,
 * 서버에 업로드하는 작업을 수행합니다. liteMode가 true일 경우 780 사이즈의 이미지만 처리하며,
 * 그렇지 않으면 3508 사이즈의 이미지를 처리합니다.
 * @function total_make
 * @memberof PortfolioFilter
 * @param {boolean} [liteMode=false] - liteMode가 true이면 780 크기의 이미지 파일만 처리합니다.
 * @returns {Promise<Object>} 처리된 폴더 이름을 포함하는 객체를 반환합니다.
 */
PortfolioFilter.prototype.total_make = async function (liteMode = false) {
  // 현재 인스턴스를 참조하기 위한 instance 변수 선언.
  const instance = this;

  // Mother 객체의 다양한 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem, shellExec, shellLink, ghostFileUpload, sleep, messageSend, requestSystem } = this.mother;

  // 포트폴리오 ID에서 숫자를 필터링하여 반환하는 내부 함수 idFilterNum 정의.
  const idFilterNum = function (past) {
    let newNumber;
    past = past.split('_')[2];
    past = past.replace(/[^0-9]/g, '');
    past = past.replace(/^0/, '');
    newNumber = Number(past);
    return newNumber;
  }

  // idFilterNum 함수를 사용하여 숫자 문자열로 반환하는 idFilter 함수 정의.
  const idFilter = function (past) {
    return String(idFilterNum(past));
  }

  try {
    // 고정된 폴더 이름을 저장하는 상수 선언.
    const photoFolderConst = "사진_등록_포트폴리오";

    // 필요한 정적 설정을 수행합니다.
    await this.static_setting();

    // 필요한 변수 선언.
    let pidFolder, fromArr, toArr;
    let resultFolder;
    let ghostPhotos, ghostPhotosTarget;
    let sambaPhotoPath;

    // 포트폴리오를 생성하고, 그 결과 폴더를 반환합니다.
    resultFolder = await this.to_portfolio(liteMode);

    // 파일 목록을 파싱하여 파일 경로를 가져옵니다.
    const { fileList_780, fileList_original } = await this.parsing_fileList(resultFolder, liteMode);
    console.log(fileList_780, fileList_original);

    // liteMode에 따른 파일 경로를 설정하고, 서버에 폴더를 생성합니다.
    if (liteMode) {
      // liteMode일 경우, 780 크기 폴더 경로를 설정하고 생성 요청을 서버에 전송합니다.
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
      await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/makeFolder", { path: sambaPhotoPath }, { headers: { "Content-Type": "application/json" } });
    } else {
      // liteMode가 아닐 경우, 서버에서 해당 PID에 대한 폴더가 있는지 확인합니다.
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      ghostPhotosTarget = null;

      // 기존 폴더 중에서 현재 PID와 일치하는 폴더를 찾습니다.
      for (let folder of ghostPhotos) {
        if ((new RegExp("^" + this.pid)).test(folder)) {
          ghostPhotosTarget = folder;
        }
      }

      // 일치하는 폴더가 없을 경우 오류를 발생시킵니다.
      if (ghostPhotosTarget === null) {
        throw new Error("there is no folder in server");
      } else {
        this.folderName = ghostPhotosTarget;
      }

      // 폴더 경로를 설정합니다.
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
    }

    // 780, 1500, 3508 크기 폴더를 서버에 생성합니다.
    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780" ])
    } catch {}

    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/1500" ])
    } catch {}

    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508" ])
    } catch {}

    // liteMode에 따라 파일을 서버에 복사합니다.
    if (!liteMode) {
      // liteMode가 아닐 경우, 원본 파일(3508)을 서버에 복사합니다.
      for (let f of fileList_original) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508/" ]);
      }
    } else {
      // liteMode일 경우, 780 크기 파일만 복사합니다.
      for (let f of fileList_780) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780/" ]);
      }
    }

    // 작업 완료 메시지를 전송합니다.
    await messageSend({ text: `${this.folderName} 사진을 처리하였습니다! (total_make success)`, channel: `#502_sns_contents` });

    // liteMode가 아닌 경우, 추가로 파일을 정리하고 서버에 업로드합니다.
    if (!liteMode) {
      await shellExec(`mv ${shellLink(this.resultFolder)}/3508 ${shellLink(this.resultFolder)}/${this.pid}`);
      pidFolder = await fileSystem(`readDir`, [ this.resultFolder + "/" + this.pid ]);
      fromArr = [];
      toArr = [];

      // 파일을 이름 순서대로 정렬합니다.
      pidFolder.sort((a, b) => { return idFilterNum(a) - idFilterNum(b); });

      // 서버에 필요한 폴더를 생성합니다.
      try {
        await shellExec("mkdir", [ `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}` ])
      } catch {}

      // 파일을 서버에 복사하고, 복사한 파일을 서버에 업로드합니다.
      for (let i of pidFolder) {
        if (i !== `.DS_Store`) {
          await shellExec(`mv ${shellLink(this.resultFolder + "/" + this.pid + "/" + i)} ${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          await shellExec(`cp`, [ `${(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`, `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}/` ]);
          fromArr.push(`${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          toArr.push(`corePortfolio/original/${this.pid}/i${idFilter(i)}${this.pid}.jpg`);
        }
      }

      // 업로드된 파일 목록을 콘솔에 출력하고, 파일을 서버에 업로드합니다.
      console.log(fromArr);
      console.log(toArr);
      await ghostFileUpload(fromArr, toArr);
      console.log(`ghost upload done`);
    }

    // 최종적으로 폴더 이름을 반환합니다.
    return { folderName: this.folderName };

  } catch (e) {
    // 예외 발생 시, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);
  }
}

/**
 * PortfolioFilter 클래스의 rawToRaw 메서드는 클라이언트와 디자이너에 대한 원본 이미지를 처리하고,
 * 이를 서버에 업로드한 후 관련 데이터를 데이터베이스에 저장하는 과정을 수행합니다.
 * @function rawToRaw
 * @memberof PortfolioFilter
 * @param {Array} arr - 처리할 데이터가 포함된 배열, 주로 클라이언트와 디자이너 정보가 포함됩니다.
 * @returns {Promise<string|boolean>} 성공 시 생성된 PID를 반환하고, 실패 시 false를 반환합니다.
 */
PortfolioFilter.prototype.rawToRaw = async function (arr) {
  // 현재 인스턴스를 참조하기 위한 instance 변수 선언.
  const instance = this;

  // back, address, image 인스턴스 및 Mother 클래스의 여러 메서드를 비구조화 할당으로 가져옵니다.
  const back = this.back;
  const address = this.address;
  const image = this.image;
  const { fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongoinfo } = this.mother;

  // 필요한 모듈 및 상수 정의.
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  const notePath = process.env.HOME + "/note/portfolio";
  const photoFolderConst = "사진_등록_포트폴리오";
  const foreCastContant = `/corePortfolio/forecast`;
  const forecastPath = this.address.officeinfo.ghost.file.static + foreCastContant;
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const kakaoInstance = new KakaoTalk();
  const collection = "foreContents";

  // MongoDB 연결 인스턴스 생성.
  const selfCoreMongo = new mongo(mongoinfo);
  const selfMongo = new mongo(mongoofficeinfo);
  const garoseroParser = new ImageReader();

  // nextPid를 null로 초기화합니다.
  let nextPid = null;

  try {
    // MongoDB 연결 시작.
    await selfMongo.connect();
    await selfCoreMongo.connect();

    // 필요한 변수 선언.
    let folderPath;
    let designers, consoleInput, targetDesigner, googleFolderName;
    let folderPathList_raw, folderPathList;
    let forecast;
    let finalObj;
    let foreRows;
    let note;
    let projects, project;
    let totalMakeResult;
    let shareLinkClient, shareLinkDeginer;
    let shareGoogleIdClient, shareGoogleIdDesigner;
    let clientObj, designerObj;
    let zipLinks;
    let consoleQInput;
    let contentsRows;
    let fromArr, toArr;
    let allContentsArr;
    let allProjects, allClients;
    let zipPhotoRes;
    let zipIdDesigner;
    let zipIdClient;
    let client, designer;
    let targetClient;
    let rawObj;

    // 필수 설정을 수행합니다.
    await this.static_setting();

    // 배열의 첫 번째 요소를 rawObj로 설정하고, 클라이언트 및 디자이너 정보를 추출합니다.
    rawObj = arr[0];
    client = rawObj.cliid;
    designer = rawObj.desid;
    nextPid = null;

    // 클라이언트와 디자이너가 유효한 경우 처리.
    if (/^c[0-9]/.test(client) && /^d[0-9]/.test(designer)) {

      // MongoDB에서 클라이언트 및 디자이너 데이터를 가져옵니다.
      [ targetClient ] = await back.mongoRead("client", { cliid: client }, { selfMongo: selfCoreMongo });
      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      // 이전 리소스 폴더를 삭제하고, 새로운 폴더를 복사합니다.
      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ]);
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      // MongoDB에서 현재 포트폴리오 PID 목록을 가져오고, 다음 PID를 계산합니다.
      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^p/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'p' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      // 클라이언트 이름과 디자이너 이름을 설정하고, PID 및 아파트 이름 초기화.
      this.clientName = targetClient.name;
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";

      // total_make 메서드를 호출하여 포트폴리오를 생성하고, 결과 폴더 이름을 가져옵니다.
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

      // 생성된 포트폴더 목록을 가져옵니다.
      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);

      // 파일을 서버로 복사하기 위한 경로 배열을 초기화합니다.
      fromArr = [];
      toArr = [];

      // 서버에 필요한 폴더를 생성하고, 파일을 복사합니다.
      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}` ]);
      } catch {}
      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        await shellExec("cp", [ `${folderPath}/${f}`, `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}/` ]);
      }
      console.log(`original copy done`);

      // 포트폴리오에 대한 예측 정보를 생성하고, 이를 데이터베이스에 저장합니다.
      forecast = await garoseroParser.queryDirectory(folderPath);
      for (let obj of forecast) {
        obj.file = foreCastContant + "/" + nextPid + "/" + obj.file.split("/").slice(-1).join("/");
      }
      finalObj = { pid: nextPid, desid: targetDesigner.desid, client, forecast };
      await back.mongoCreate(collection, finalObj, { selfMongo });
      console.log("db in success");

      // 폴더 내 파일 목록을 다시 읽어와서 서버에 복사합니다.
      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);
      fromArr = [];
      toArr = [];

      try {
        await shellExec("mkdir", [ `${forecastPath}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        fromArr.push(`${folderPath}/${f}`);
        toArr.push(`${foreCastContant}/${this.pid}/${f}`);
        await shellExec("cp", [ `${folderPath}/${f}`, `${forecastPath}/${this.pid}/` ]);
      }
      console.log(`forecast copy done`);

      // MongoDB에서 프로젝트 데이터를 읽고 업데이트합니다.
      [ project ] = await back.mongoRead("project", { proid: rawObj.proid }, { selfMongo: selfCoreMongo });
      await back.updateProject([
        { proid: project.proid },
        {
          "contents.raw.photo.status": "원본 보정 완료",
          "contents.share.client.photo": new Date(),
          "contents.share.designer.photo": new Date(),
        }
      ], { selfMongo: selfCoreMongo });
      await back.mongoUpdate(collection, [ { pid: nextPid }, { proid: project.proid } ], { selfMongo });
      await back.mongoUpdate(collection, [ { pid: nextPid }, { exception: false } ], { selfMongo });

      // 클라이언트 및 디자이너 정보를 가져와서 이를 기반으로 추가 작업을 수행합니다.
      clientObj = targetClient;
      designerObj = targetDesigner;

      // 서버에 압축된 사진 파일을 요청합니다.
      await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/zipPhoto", { pid: nextPid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

      // 로컬에 저장된 리소스 폴더를 삭제합니다.
      await shellExec(`rm -rf ${shellLink(folderPath)};`);

      // 클라이언트와 디자이너에게 알림 메시지 및 카카오톡 메시지를 전송합니다.
      await requestSystem("https://" + instance.address.officeinfo.host + ":3000/evaluationNotice", { mode: "send", cliid: clientObj.cliid, desid: designerObj.desid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
      await kakaoInstance.sendTalk("photoShareClient", clientObj.name, clientObj.phone, { client: clientObj.name, host: instance.address.frontinfo.host, path: "evaluation", proid: project.proid });
      await kakaoInstance.sendTalk("photoShareDesigner", designerObj.designer, designerObj.information.phone, { client: clientObj.name, designer: designerObj.designer, host: instance.address.frontinfo.host, proid: project.proid });
      await messageSend({ text: `${designerObj.designer} 디자이너, ${clientObj.name} 고객님께 사진 공유 알림톡을 전송하였습니다!`, channel: `#502_sns_contents` });
      await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "store", cliid: clientObj.cliid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

    } else {
      // 클라이언트 정보가 없을 경우(디자이너 정보만 있는 경우) 처리.
      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      // 리소스 폴더를 초기화하고 복사합니다.
      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      // 다음 PID를 계산하여 할당합니다.
      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^a/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'a' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      // 클라이언트 이름을 "없음"으로 설정하고, 디자이너 이름과 PID를 설정합니다.
      this.clientName = "없음";
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";

      // total_make 메서드를 호출하여 포트폴리오를 생성하고, 결과 폴더 이름을 가져옵니다.
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

      // 생성된 포트폴더 목록을 가져와서 서버에 복사합니다.
      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);
      fromArr = [];
      toArr = [];

      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}` ]);
      } catch {}
      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        await shellExec("cp", [ `${folderPath}/${f}`, `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}/` ]);
      }
      console.log(`original copy done`);

      // 로컬에 저장된 리소스 폴더를 삭제합니다.
      await shellExec(`rm -rf ${shellLink(folderPath)};`);
    }
    
    // MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();

    // 성공적으로 처리된 경우 다음 PID를 반환합니다.
    return nextPid;
  } catch (e) {
    // 예외 발생 시, 에러를 로그로 출력하고, 데이터베이스에서 생성된 항목을 삭제합니다.
    errorLogSync(e);
    if (typeof nextPid === "string") {
      await back.mongoDelete(collection, { pid: nextPid }, { selfMongo });
    }

    // MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();

    // 실패 시 false를 반환합니다.
    return false;
  }
}

/**
 * PortfolioFilter 클래스의 rawVideo 메서드는 주어진 배열을 기반으로
 * 클라이언트와 디자이너의 정보를 사용하여 raw 비디오 파일을 처리하고
 * 파일명을 변경하며, 이를 서버에 업로드하는 작업을 수행합니다.
 * 이 메서드는 MongoDB와 파일 시스템, 쉘 명령어 등을 활용하여 작업을 진행합니다.
 * 
 * @param {Array<Object>} arr - 클라이언트와 디자이너의 이름을 포함한 객체 배열입니다.
 * @returns {Promise<void>} 비동기 작업이므로 Promise를 반환합니다.
 */
PortfolioFilter.prototype.rawVideo = async function (arr) {
  
  // 현재 PortfolioFilter 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // PortfolioFilter 클래스의 back 속성을 back 변수에 저장합니다.
  // back 속성은 BackMaker 클래스의 인스턴스를 가리킵니다.
  const back = this.back;

  // PortfolioFilter 클래스의 address 속성을 address 변수에 저장합니다.
  // address 속성은 홈리에종의 주소 정보 객체를 가리킵니다.
  const address = this.address;

  // PortfolioFilter 클래스의 hangul 속성을 hangul 변수에 저장합니다.
  // hangul 속성은 한글 문자열을 처리하는 ParsingHangul 클래스의 인스턴스를 가리킵니다.
  const hangul = this.hangul;

  // PortfolioFilter 클래스의 options 속성을 options 변수에 저장합니다.
  // options 속성은 설정된 여러 디렉토리 경로 정보를 포함하는 객체를 가리킵니다.
  const options = this.options;

  // Mother 클래스에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  // mongo, mongoinfo, mongoofficeinfo: MongoDB 관련 클래스와 정보 객체입니다.
  // fileSystem, shellExec, shellLink, consoleQ, sleep, messageSend, requestSystem, ghostFileUpload: Mother 클래스에서 제공하는 다양한 유틸리티 메서드들입니다.
  const { mongo, mongoinfo, mongoofficeinfo, fileSystem, shellExec, shellLink, consoleQ, sleep, messageSend, requestSystem, ghostFileUpload } = this.mother;

  // 에러 메시지를 errorMessage 변수에 저장합니다.
  const errorMessage = `argument must be => [ { client: "", designer: "" } ... ]`;

  // selfMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 MongoDB와의 연결을 관리합니다.
  const selfMongo = new mongo(mongoinfo);

  // selfContentsMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 오피스 관련 MongoDB와의 연결을 관리합니다.
  const selfContentsMongo = new mongo(mongoofficeinfo);

  // MongoDB 컬렉션 이름을 collection 변수에 저장합니다.
  const collection = "foreContents";

  // 파일 이름을 구분하기 위한 토큰을 splitToken 변수에 저장합니다.
  const splitToken = "__split__";

  // 핵심 포트폴리오 경로를 corePortfolio 변수에 저장합니다.
  const corePortfolio = "corePortfolio";

  // 서버 폴더 이름을 serverFolderName 변수에 저장합니다.
  const serverFolderName = "rawVideo";

  // 비디오 파일의 키워드를 videoFileKeyword 변수에 저장합니다.
  const videoFileKeyword = "v";

  try {
    // arr이 배열이 아닌 경우 에러를 발생시킵니다.
    if (!Array.isArray(arr)) {
      throw new Error(errorMessage);
    }

    // 임시 배열들을 선언합니다.
    let tempArr, tempArr2;

    // 클라이언트 이름과 디자이너 이름을 저장할 변수를 선언합니다.
    let clientName, designerName;

    // 프로젝트 정보를 저장할 변수를 선언합니다.
    let projects;

    // 타겟 프로젝트를 저장할 변수를 선언합니다.
    let targetProject;

    // MongoDB에서 조회한 결과를 저장할 변수를 선언합니다.
    let rows;

    // 프로젝트 ID와 포트폴리오 ID를 저장할 변수를 선언합니다.
    let thisProid, thisPid;

    // 콘텐츠 배열을 저장할 변수를 선언합니다.
    let contentsArr;

    // 현재 작업 중인 폴더 이름을 저장할 변수를 선언합니다.
    let thisFolderName;

    // 요청에 대한 응답을 저장할 변수를 선언합니다.
    let response;

    // 파일 이름을 저장할 변수를 선언합니다.
    let thisFileName;

    // 실행 파일 경로를 저장할 변수를 선언합니다.
    let exe;

    // 타겟 폴더와 그 목록을 저장할 변수를 선언합니다.
    let targetFolder, targetFolderList;

    // 번호를 저장할 변수를 선언합니다.
    let num;

    // selfMongo와 selfContentsMongo를 MongoDB와 연결합니다.
    await selfMongo.connect();
    await selfContentsMongo.connect();

    // static_setting 메서드를 호출하여 포트폴리오 필터를 위한 정적 디렉토리 구조를 설정합니다.
    await this.static_setting();

    // arr 배열의 각 요소를 순회합니다.
    for (let { client, designer } of arr) {

      // targetFolder 변수에 photo_dir 경로를 저장합니다.
      targetFolder = options.photo_dir;

      // targetFolder의 파일 목록을 읽어와 targetFolderList에 저장합니다.
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      // num 변수를 0으로 초기화합니다.
      num = 0;

      // targetFolderList의 각 파일 이름에 대해 반복합니다.
      for (let name of targetFolderList) {
        // shellExec 메서드를 사용하여 파일 이름을 클라이언트와 디자이너 이름을 포함한 형식으로 변경합니다.
        await shellExec(`mv ${shellLink(targetFolder + "/" + name)} ${shellLink(targetFolder + "/" + client + "_" + designer + "_" + String(num) + "." + name.split(".")[name.split(".").length - 1])}`);
        num++;
      }

      // targetFolder 변수에 photo_dir 경로를 다시 저장합니다.
      targetFolder = options.photo_dir;

      // targetFolder의 파일 목록을 다시 읽어와 targetFolderList에 저장합니다.
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      // targetFolderList의 각 파일 이름에 대해 반복합니다.
      for (let fileName of targetFolderList) {
        // 파일 이름을 '_'를 기준으로 분리하여 tempArr에 저장합니다.
        tempArr = fileName.split("_");

        // tempArr의 마지막 요소를 '.' 기준으로 분리하여 tempArr2에 저장합니다.
        tempArr2 = tempArr[tempArr.length - 1].split(".");

        // tempArr의 마지막 요소를 tempArr2의 첫 번째 요소로 변경합니다.
        tempArr[tempArr.length - 1] = tempArr2[0];

        // tempArr2의 두 번째 요소부터 tempArr에 추가합니다.
        for (let i = 1; i < tempArr2.length; i++) {
          tempArr.push(tempArr2[i]);
        }

        // tempArr에서 클라이언트 이름과 디자이너 이름을 추출하여 각각 clientName과 designerName에 저장합니다.
        [ clientName, designerName ] = tempArr;

        // 파일 확장자를 exe 변수에 저장합니다.
        exe = tempArr[tempArr.length - 1];

        // 프로젝트를 검색하기 위해 BackMaker 클래스의 getProjectsByNames 메서드를 호출합니다.
        // 검색 조건으로 클라이언트 이름과 디자이너 이름을 한글로 수정한 값을 사용합니다.
        projects = await back.getProjectsByNames([ hangul.fixString(clientName.trim()), hangul.fixString(designerName.trim()) ], { selfMongo });

        // 검색된 프로젝트가 없을 경우 콘솔에 클라이언트 이름과 디자이너 이름을 출력하고, targetProject를 null로 설정합니다.
        if (projects.length === 0) {
          console.log(clientName, designerName);
          targetProject = null;
        } else {
          // 검색된 프로젝트 중에서 desid가 비어 있지 않은 프로젝트만 필터링합니다.
          projects = projects.toNormal().filter((p) => { return p.desid !== "" });

          // 필터링 결과가 없을 경우 콘솔에 클라이언트 이름과 디자이너 이름을 출력하고, targetProject를 null로 설정합니다.
          if (projects.length === 0) {
            console.log(clientName, designerName);
            targetProject = null;
          } else if (projects.length !== 1) {
            // 필터링된 프로젝트가 여러 개인 경우 추가 필터링을 수행합니다.
            projects = projects.filter((p) => {
              return p.process.contract.remain.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return !/^드/gi.test(p.process.status);
            }).filter((p) => {
              return p.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return p.contents.photo.date.valueOf() <= (new Date()).valueOf() && p.contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });

            // 프로젝트를 사진 날짜를 기준으로 정렬합니다.
            projects.sort((a, b) => {
              return b.contents.photo.date.valueOf() - a.contents.photo.date.valueOf();
            });

            // 추가 필터링 결과가 없을 경우 콘솔에 클라이언트 이름과 디자이너 이름을 출력하고, targetProject를 null로 설정합니다.
            if (projects.length === 0) {
              console.log(clientName, designerName);
              targetProject = null;
            } else {
              // 가장 최근의 프로젝트를 targetProject로 설정합니다.
              [ targetProject ] = projects;
            }
          } else {
            // 프로젝트가 하나만 존재하는 경우 해당 프로젝트를 targetProject로 설정합니다.
            [ targetProject ] = projects;
          }
        }

        // targetProject가 null인 경우, 에러를 발생시킵니다.
        if (targetProject === null) {
          throw new Error(clientName + " " + designerName + " " + "project not found");
        }

        // targetProject에서 프로젝트 ID를 thisProid에 저장합니다.
        thisProid = targetProject.proid;

        // foreContents 컬렉션에서 현재 프로젝트 ID와 일치하는 데이터를 조회하여 rows에 저장합니다.
        rows = await back.mongoRead(collection, { proid: thisProid }, { selfMongo: selfContentsMongo });

        // 조회된 데이터가 있는 경우, 첫 번째 데이터의 포트폴리오 ID를 thisPid에 저장합니다.
        if (rows.length > 0) {
          thisPid = rows[0].pid;
        } else {
          // 조회된 데이터가 없는 경우, 프로젝트 ID로 콘텐츠 배열을 조회합니다.
          contentsArr = await back.getContentsArrByQuery({ proid: thisProid }, { selfMongo });

          // 콘텐츠 배열이 비어 있는 경우 추가 검색을 수행합니다.
          if (contentsArr.length === 0) {
            if (projects.length > 1) {
              thisPid = null;

              // 나머지 프로젝트들에 대해 반복하면서 foreContents 컬렉션을 조회합니다.
              for (let i = 1; i < projects.length; i++) {
                rows = await back.mongoRead(collection, { proid: projects[i].proid }, { selfMongo: selfContentsMongo });

                // foreContents에 데이터가 있는 경우 포트폴리오 ID를 thisPid에 저장합니다.
                if (rows.length > 0) {
                  thisPid = rows[0].pid;
                } else {
                  // foreContents에 데이터가 없는 경우, 프로젝트 ID로 콘텐츠 배열을 다시 조회합니다.
                  contentsArr = await back.getContentsArrByQuery({ proid: projects[i].proid }, { selfMongo });

                  // 콘텐츠 배열이 있는 경우, 포트폴리오 ID를 thisPid에 저장합니다.
                  if (contentsArr.length > 0) {
                    thisPid = contentsArr[0].contents.portfolio.pid;
                  }
                }

                // 포트폴리오 ID가 설정된 경우, 현재 프로젝트 ID를 thisProid로 설정하고 반복을 종료합니다.
                if (thisPid !== null) {
                  thisProid = projects[i].proid;
                  break;
                }
              }

              // 포트폴리오 ID가 여전히 null인 경우, 에러를 발생시킵니다.
              if (thisPid === null) {
                throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
              }
            } else {
              // 프로젝트가 하나인 경우에도 포트폴리오 ID가 null이면 에러를 발생시킵니다.
              throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
            }
          } else {
            // 콘텐츠 배열이 비어 있지 않은 경우, 첫 번째 콘텐츠의 포트폴리오 ID를 thisPid에 저장합니다.
            thisPid = contentsArr[0].contents.portfolio.pid;
          }
        }

        // 프로젝트 ID와 포트폴리오 ID를 조합하여 thisFolderName을 설정합니다.
        thisFolderName = thisProid + splitToken + thisPid;

        // requestSystem 메서드를 사용하여 서버에 폴더 생성 요청을 보냅니다.
        response = await requestSystem("https://" + address.officeinfo.ghost.host + "/makeFolder", {
          path: "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName,
        }, {
          headers: { "Content-Type": "application/json" }
        });

        // 비디오 파일의 새로운 이름을 생성합니다.
        thisFileName = videoFileKeyword + String(response.data.list.length) + thisPid + "." + exe;

        // ghostFileUpload 메서드를 사용하여 비디오 파일을 서버에 업로드합니다.
        await ghostFileUpload([ `${targetFolder}/${fileName}` ], [ "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName + "/" + thisFileName ]);

      }

    }

  } catch (e) {
    // 예외가 발생한 경우, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);
  } finally {
    // 작업이 완료되면 MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfContentsMongo.close();
  }
}

/**
 * PortfolioFilter 클래스의 updateSubject 메서드는 주어진 포트폴리오 ID(pid) 또는 개별 키(individualKey)를 사용하여 
 * 포트폴리오와 관련된 데이터를 업데이트하고, 이를 서버에 반영하는 작업을 수행합니다.
 * 이 메서드는 MongoDB와 파일 시스템, 다양한 유틸리티 메서드를 활용하여 작업을 진행합니다.
 * 
 * @param {string} pid - 포트폴리오 ID입니다.
 * @param {string|null} [individualKey=null] - 개별 작업을 위한 키로, 필요시 사용됩니다.
 * @returns {Promise<boolean>} 작업 성공 여부를 나타내는 불리언 값을 반환합니다.
 */
PortfolioFilter.prototype.updateSubject = async function (pid, individualKey = null) {
  
  // 현재 PortfolioFilter 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // PortfolioFilter 클래스의 address 속성을 address 변수에 저장합니다.
  // address 속성은 홈리에종의 주소 정보 객체를 가리킵니다.
  const address = this.address;

  // PortfolioFilter 클래스의 back 속성을 back 변수에 저장합니다.
  // back 속성은 BackMaker 클래스의 인스턴스를 가리킵니다.
  const back = this.back;

  // Mother 클래스에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  // mongo, mongoinfo, mongoofficeinfo, fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload 등 다양한 유틸리티 메서드를 포함합니다.
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;

  // selfMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 오피스 관련 MongoDB와의 연결을 관리합니다.
  const selfMongo = new mongo(mongoofficeinfo);

  // selfCoreMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 핵심 데이터베이스와의 연결을 관리합니다.
  const selfCoreMongo = new mongo(mongoinfo);

  // selfSecondMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 추가 데이터베이스와의 연결을 관리합니다.
  const selfSecondMongo = new mongo(mongosecondinfo);

  try {
    // selfMongo와 selfCoreMongo, selfSecondMongo를 MongoDB와 연결합니다.
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();

    // foreContents 컬렉션의 이름을 collection 변수에 저장합니다.
    const collection = "foreContents";

    // designerRawContents 컬렉션의 이름을 rawCollection 변수에 저장합니다.
    const rawCollection = "designerRawContents";

    // toNormal 변수를 true로 설정하여 데이터 변환 시 사용할 수 있도록 합니다.
    const toNormal = true;

    // 사진 관련 상수를 photoFolderConst 변수에 저장합니다.
    const photoFolderConst = "사진_등록_포트폴리오";

    // 필요한 변수를 선언합니다.
    let targetFores, targetContents, proid, targetRaw, targetBody, tong;
    let thisBlank, targetText, frontText, backText, frontEnd, backEnd;
    let project, client, subjectInput, apartInput, regionInput, targetPid;
    let addressArr, contents, ghostPhotos, thisFolderName, thisDesignerName, thisDesid;
    let thisDesigner, pyeongInput, infoIndex, backArr;

    // pid가 'p'로 시작하는지 확인합니다.
    if (/^p/.test(pid.trim())) {

      // pid가 'p'로 시작하면 targetPid로 설정합니다.
      targetPid = pid;

      // foreContents 컬렉션에서 pid와 일치하는 데이터를 조회하여 targetFores에 저장합니다.
      [ targetFores ] = await back.mongoRead(collection, { pid: targetPid }, { selfMongo });

      // 조회된 데이터에서 proid를 가져와 변수에 저장합니다.
      proid = targetFores.proid;

      // designerRawContents 컬렉션에서 proid와 일치하는 데이터를 조회하여 targetRaw에 저장합니다.
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });

      // 프로젝트와 클라이언트 정보를 조회하여 각각 project와 client 변수에 저장합니다.
      project = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      client = await back.getClientById(project.cliid, { selfMongo: selfCoreMongo, toNormal });

      // 대상 본문을 줄 단위로 분리하여 필터링합니다.
      targetBody = targetRaw.contents.body.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");

      // 본문을 처리하면서 빈 줄을 관리합니다.
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (!thisBlank) {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }

      // 본문에서 전반부와 후반부 텍스트를 나눕니다.
      frontText = '';
      backText = '';
      frontEnd = false;
      backEnd = false;
      for (let i = 0; i < tong.length; i++) {
        if (tong[i] !== '' && /^[^a-zA-Z가-힣0-9\.]/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (tong[i] !== '' && /^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (frontEnd) {
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
        } else {
          frontText += tong[i].trim() + " ";
          if (frontText.length > 500) {
            frontEnd = true;
          }
        }
      }
      frontText = frontText.trim();
      if (frontText === "") {
        frontText = "고객의 이야기를 적어주세요!";
      }

      // 후반부 텍스트를 배열로 분리하고, 길이 제한과 공간 정보를 처리합니다.
      backArr = backText.split("\n").map((str) => { return str.trim() }).filter((str) => { return str !== "" });
      infoIndex = backArr.findIndex((s) => { return /^[0-9]?\.?[ ]?공간[ ]?정보/gi.test(s.trim()) });
      if (infoIndex !== -1) {
        backArr = backArr.slice(0, infoIndex);
      }
      backArr = backArr.filter((str) => { return str.length >= 5 }).map((str) => { return str.trim(); });
      if (backArr.length > 3) {
        backArr[backArr.length - 2] = backArr[backArr.length - 2] + "\n\n" + backArr[backArr.length - 1];
        backArr = backArr.slice(0, -1);
      }

      // 클라이언트의 요청에서 주소 정보를 가져옵니다.
      addressArr = client.requests[0].request.space.address.split(" ").map((s) => { return s.trim() });

      // 입력될 제목, 아파트 이름, 지역 이름을 변수에 설정합니다.
      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = addressArr[0].slice(0, 2) + " " + addressArr[1];

      // designerRawContents 컬렉션을 업데이트하여 입력한 내용을 추가합니다.
      await back.mongoUpdate(rawCollection, [ { proid }, {
        addition: {
          pid,
          subject: subjectInput.trim(),
          apart: apartInput.trim(),
          region: regionInput.trim(),
          pyeong: client.requests[0].request.space.pyeong,
          text: {
            front: frontText,
            back: backText,
            backArr,
          },
        }
      } ], { selfMongo: selfSecondMongo });

    } else {
      // pid가 'p'로 시작하지 않는 경우, 개별 키(individualKey)를 사용하여 작업을 수행합니다.
      proid = individualKey;

      // 서버에서 사진 목록을 조회하여 ghostPhotos에 저장합니다.
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });

      // pid와 일치하는 파일 이름을 찾아 thisFolderName에 저장합니다.
      thisFolderName = ghostPhotos.find((a) => { return (new RegExp("^" + pid)).test(a) });

      // 파일 이름에서 디자이너 이름을 추출하여 thisDesignerName에 저장합니다.
      thisDesignerName = thisFolderName.split("_")[1].trim();

      // designer 컬렉션에서 디자이너 이름과 일치하는 데이터를 조회하여 thisDesigner에 저장합니다.
      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });

      // 조회된 디자이너의 ID를 thisDesid에 저장합니다.
      thisDesid = thisDesigner.desid;

      // designerRawContents 컬렉션에서 proid와 일치하는 데이터를 조회하여 targetRaw에 저장합니다.
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });

      // targetRaw의 내용을 body에서 가져와 contents에 저장합니다.
      contents = targetRaw.contents.body.trim();

      // 대상 본문을 줄 단위로 분리하여 필터링합니다.
      targetBody = contents.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");

      // 본문을 처리하면서 빈 줄을 관리합니다.
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (!thisBlank) {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }

      // 본문에서 전반부와 후반부 텍스트를 나눕니다.
      frontText = '';
      backText = '';
      frontEnd = false;
      backEnd = false;
      for (let i = 0; i < tong.length; i++) {
        if (tong[i] !== '' && /^[^a-zA-Z가-힣0-9\.]/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (tong[i] !== '' && /^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (frontEnd) {
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
        } else {
          frontText += tong[i].trim() + " ";
          if (frontText.length > 500) {
            frontEnd = true;
          }
        }
      }
      frontText = frontText.trim();
      if (frontText === "") {
        frontText = "고객의 이야기를 적어주세요!";
      }

      // 후반부 텍스트를 배열로 분리하고, 길이 제한과 공간 정보를 처리합니다.
      backArr = backText.split("\n").map((str) => { return str.trim() }).filter((str) => { return str !== "" });
      infoIndex = backArr.findIndex((s) => { return /^[0-9]?\.?[ ]?공간[ ]?정보/gi.test(s.trim()) });
      if (infoIndex !== -1) {
        backArr = backArr.slice(0, infoIndex);
      }
      backArr = backArr.filter((str) => { return str.length >= 5 }).map((str) => { return str.trim(); });
      if (backArr.length > 3) {
        backArr[backArr.length - 2] = backArr[backArr.length - 2] + "\n\n" + backArr[backArr.length - 1];
        backArr = backArr.slice(0, -1);
      }

      // 입력될 제목, 아파트 이름, 지역 이름을 변수에 설정합니다.
      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = "서울시 관악구";
      pyeongInput = String(34);

      // designerRawContents 컬렉션을 업데이트하여 입력한 내용을 추가합니다.
      await back.mongoUpdate(rawCollection, [ { proid }, {
        addition: {
          pid,
          subject: subjectInput.trim(),
          apart: apartInput.trim(),
          region: regionInput.trim(),
          pyeong: 34,
          text: {
            front: frontText,
            back: backText,
            backArr,
          },
        }
      } ], { selfMongo: selfSecondMongo });
    }

    // 일정 시간 대기한 후, requestSystem 메서드를 사용하여 서버에 rawToContents 요청을 보냅니다.
    await sleep(500);
    await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawToContents", {
      pid,
      proid
    }, { headers: { "Content-Type": "application/json" } });
    await sleep(500);

    // 작업이 완료되면 MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    // 작업이 성공적으로 완료되었음을 나타내는 true를 반환합니다.
    return true;

  } catch (e) {
    // 예외가 발생한 경우, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);

    // 예외가 발생해도 MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    // 작업이 실패했음을 나타내는 false를 반환합니다.
    return false;
  }
}

/**
 * PortfolioFilter 클래스의 rawToContents 메서드는 주어진 포트폴리오 ID(pid)를 기반으로 포트폴리오의 내용을
 * 처리하고, 이미지 파일을 다운로드하여 포트폴리오에 맞게 구성하며, 최종적으로 이를 시스템에 업로드하는 작업을 수행합니다.
 * 이 메서드는 MongoDB, 파일 시스템, 이미지 처리 도구 등 다양한 유틸리티를 사용하여 포트폴리오 콘텐츠를 자동화합니다.
 * 
 * @param {string} pid - 포트폴리오 ID입니다.
 * @param {boolean} [justOrderMode=false] - 만약 true로 설정하면 콘텐츠를 생성하지 않고 삭제 작업만 수행합니다.
 * @param {string|null} [forceProid=null] - 특정 프로젝트 ID를 강제로 사용하기 위한 옵션입니다.
 * @returns {Promise<string|boolean>} 성공적으로 작업을 수행한 경우 디자이너 ID를 반환하고, 실패한 경우 false를 반환합니다.
 */
PortfolioFilter.prototype.rawToContents = async function (pid, justOrderMode = false, forceProid = null) {
  
  // 현재 PortfolioFilter 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // PortfolioFilter 클래스의 back 속성을 back 변수에 저장합니다.
  // back 속성은 BackMaker 클래스의 인스턴스를 가리킵니다.
  const back = this.back;

  // PortfolioFilter 클래스의 address 속성을 address 변수에 저장합니다.
  // address 속성은 홈리에종의 주소 정보 객체를 가리킵니다.
  const address = this.address;

  // PortfolioFilter 클래스의 image 속성을 image 변수에 저장합니다.
  // image 속성은 이미지 처리와 관련된 기능을 제공합니다.
  const image = this.image;

  // Mother 클래스에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  // mongo, mongoinfo, mongoofficeinfo, fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload 등 다양한 유틸리티 메서드를 포함합니다.
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;

  // 노트 경로를 notePath 변수에 저장합니다.
  const notePath = process.env.HOME + "/note/portfolio";

  // selfMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 오피스 관련 MongoDB와의 연결을 관리합니다.
  const selfMongo = new mongo(mongoofficeinfo);

  // selfCoreMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 핵심 데이터베이스와의 연결을 관리합니다.
  const selfCoreMongo = new mongo(mongoinfo);

  // selfSecondMongo 변수에 새로운 mongo 인스턴스를 생성하여 저장합니다.
  // 이 인스턴스는 추가 데이터베이스와의 연결을 관리합니다.
  const selfSecondMongo = new mongo(mongosecondinfo);

  // 사진 관련 상수를 photoFolderConst 변수에 저장합니다.
  const photoFolderConst = "사진_등록_포트폴리오";

  // ImageReader 모듈을 가져와 ImageReader 클래스를 생성하고 garoseroParser 변수에 저장합니다.
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  const garoseroParser = new ImageReader();

  // 포트폴리오 링크를 portfolioLink 변수에 저장합니다.
  const portfolioLink = "https://" + this.address.frontinfo.host + "/portdetail.php?pid=";

  // ResourceMaker 클래스를 생성하여 resource 변수에 저장합니다.
  const resource = new ResourceMaker();

  try {
    // selfMongo와 selfCoreMongo, selfSecondMongo를 MongoDB와 연결합니다.
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();

    // foreContents 컬렉션의 이름을 collection 변수에 저장합니다.
    const collection = "foreContents";

    // designerRawContents 컬렉션의 이름을 rawCollection 변수에 저장합니다.
    const rawCollection = "designerRawContents";

    // 메시지를 보낼 채널을 channel 변수에 저장합니다.
    const channel = "#502_sns_contents";

    // toNormal 변수를 true로 설정하여 데이터 변환 시 사용할 수 있도록 합니다.
    const toNormal = true;

    // 필요한 변수를 선언합니다.
    let targetFores, targetRaw, proid, thisProject, thisClient, thisDesigner;
    let ghostPhotos, ghostPhotosFiles, tempObject, num, targetPhotoDir;
    let finalGsTong, seroIn, noteContents, noteArr;
    let thisDesignerName, thisDesid, thisFolderName, targetContents;

    // pid가 'p'로 시작하는지 확인합니다.
    if (/^p/gi.test(pid.trim())) {

      // foreContents 컬렉션에서 pid와 일치하는 데이터를 조회하여 targetFores에 저장합니다.
      [ targetFores ] = await back.mongoRead(collection, { pid }, { selfMongo });

      // 만약 targetFores가 undefined이면, contents 컬렉션에서 pid와 일치하는 데이터를 조회합니다.
      if (targetFores === undefined) {
        [ targetContents ] = await back.mongoPick("contents", [ { "contents.portfolio.pid": pid }, { proid: 1 } ], { selfMongo: selfCoreMongo });
        if (targetContents === undefined) {
          proid = forceProid;
        } else {
          proid = targetContents.proid;
        }
      } else {
        proid = targetFores.proid;
      }

      // designerRawContents 컬렉션에서 proid와 일치하는 데이터를 조회하여 targetRaw에 저장합니다.
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });
  
      console.log(proid);

      // 프로젝트, 클라이언트, 디자이너 정보를 조회하여 각각 thisProject, thisClient, thisDesigner 변수에 저장합니다.
      thisProject = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      thisClient = await back.getClientById(thisProject.cliid, { selfMongo: selfCoreMongo, toNormal });
      thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: selfCoreMongo, toNormal });
  
      // 클라이언트와 디자이너 이름, 아파트 이름 등을 설정합니다.
      this.clientName = thisClient.name;
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;
  
      // 서버에서 pid와 관련된 사진 파일 목록을 조회하여 ghostPhotos에 저장합니다.
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      ghostPhotos = ghostPhotos[0].fileName;
  
      // 서버에서 사진 파일 목록을 재조회하여 ghostPhotosFiles에 저장합니다.
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });
  
      // 임시 파일을 삭제하고 새 디렉토리를 생성합니다.
      await tempDelete();
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);
  
      num = 1;

      // 각 사진 파일을 다운로드하여 임시 디렉토리에 저장합니다.
      for (let fileName of ghostPhotosFiles) {
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + "." + fileName.split(".").slice(-1).join("."));
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }
  
      // garoseroParser를 사용하여 다운로드한 이미지 디렉토리를 쿼리합니다.
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);

      // 최종 처리된 이미지 목록을 저장하기 위한 배열을 선언합니다.
      finalGsTong = [];
      seroIn = false;

      // 각 이미지를 순회하면서 필요한 이미지만 추출하여 finalGsTong에 추가합니다.
      for (let i = 0; i < targetPhotoDir.length; i++) {
        if (targetPhotoDir[i].gs === "g") {
          finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
          seroIn = false;
        } else {
          if (!seroIn) {
            if (targetPhotoDir[i + 1] !== undefined && targetPhotoDir[i + 1].gs === "s") {
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i + 1])));
              seroIn = true;
            }
          } else {
            seroIn = false;
          }
        }
      }

      // justOrderMode가 false인 경우, 최종 처리된 이미지를 photo_dir로 이동하고, 전체 작업을 수행합니다.
      if (!justOrderMode) {    
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }
    
        await this.total_make(false);
    
        console.log(finalGsTong);
      } else {
        // justOrderMode가 true인 경우, 기존 콘텐츠를 삭제합니다.
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }
  
      // 노트 내용을 구성하여 noteContents 변수에 저장합니다.
      // 우선 포트폴리오 ID(pid)를 추가합니다.
      noteContents = pid + "\n";

      // 디자이너의 이름과 클라이언트의 이름을 추가하여 "실장님"과 "고객님"을 붙여줍니다.
      noteContents += thisDesigner.designer + " 실장님 " + thisClient.name + " 고객님";
      noteContents += "\n\n\n"; // 가독성을 위해 세 줄의 공백을 추가합니다.

      // 포트폴리오 주제(subject), 아파트 이름(apart), 평수(pyeong) 정보를 추가합니다.
      // 이 정보는 targetRaw 객체의 addition 속성에서 가져옵니다.
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " " + String(targetRaw.addition.pyeong) + "py " + "홈스타일링";
      noteContents += "\n\n\n"; // 또 다른 구분을 위한 공백 추가

      // 포트폴리오의 앞부분 설명 텍스트(front)를 추가합니다.
      noteContents += targetRaw.addition.text.front.trim();
      noteContents += "\n\n\n"; // 가독성을 위한 공백 추가

      // 포트폴리오 뒷부분 텍스트(backArr)가 배열로 존재하는지 확인합니다.
      if (Array.isArray(targetRaw.addition.text.backArr)) {
        // 배열의 각 요소에 대해 순회하며 내용을 추가합니다.
        for (let textStr of targetRaw.addition.text.backArr) {
          // 텍스트가 빈 문자열이 아니고, 특정 키워드로 시작하지 않는 경우에만 내용을 추가합니다.
          if (textStr !== '' && !/^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)$/gi.test(textStr)) {
            noteContents += "\n\n\n"; // 각 항목 사이에 공백 추가
            // 포트폴리오 이미지의 순서를 나타내는 정보 추가
            noteContents += "1 - " + String(finalGsTong.length);
            noteContents += "\n\n\n"; // 공백 추가
            // "Space"와 함께 텍스트 내용을 추가합니다. 불필요한 공백을 제거하여 포맷을 정리합니다.
            noteContents += "Space\n\n" + textStr.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
            noteContents += "\n\n\n"; // 항목 끝에 공백 추가
          }
        }
      } else {
        // backArr 배열이 없는 경우, 단일 back 텍스트를 사용하여 내용을 구성합니다.
        noteContents += "1 - " + String(finalGsTong.length);
        noteContents += "\n\n\n"; // 공백 추가
        noteContents += "Space\n\n" + targetRaw.addition.text.back.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
        noteContents += "\n\n\n"; // 항목 끝에 공백 추가
      }

      // 추가 정보 섹션을 구성합니다. 디자이너 ID(desid) 및 포트폴리오 정보를 추가합니다.
      noteContents += "_info\n\n" // 정보 섹션 시작
      noteContents += thisDesigner.desid + "\n\n" // 디자이너 ID 추가
      noteContents += "_portfolio\n\n" // 포트폴리오 섹션 시작
      noteContents += "_1\n\n" // 첫 번째 포트폴리오 항목 시작
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " 홈스타일링\n\n" // 포트폴리오 주제와 아파트 이름 추가
      noteContents += targetRaw.addition.region.trim() + "\n\n" // 지역 정보 추가
      noteContents += "아파트 홈스타일링\n\n" // 홈스타일링 주제 추가
      noteContents += "_2\n\n" // 두 번째 포트폴리오 항목 시작
      noteContents += "세로 / 가로\n\n" // 세로 / 가로 정보 추가

      // 이미지 배열에서 세로(s) 및 가로(g) 이미지의 위치를 찾아 인덱스를 추가합니다.
      noteContents += String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "s" }).realIndex + 1) + " " + String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "g" }).realIndex + 1) + "\n\n";
      noteContents += "슬라이드\n\n" // 슬라이드 정보를 추가
      noteContents += "1 2 3 4 5 6 7 8 9\n\n" // 슬라이드 이미지 순서 추가
      noteContents += "태그\n\n" // 태그 섹션 시작
      noteContents += "all,아파트,수루배,블루,모던,화이트,세종,세종시,서재,거실\n\n" // 포트폴리오 태그 추가
      noteContents += "서비스\n\n" // 서비스 섹션 시작
      noteContents += "홈스타일링\n\n" // 서비스 정보 추가
      noteContents += "Key8\n\n" // 키 8 추가
      noteContents += "820\n\n" // 키 8의 값 추가
      noteContents += "Key9\n\n" // 키 9 추가
      // 현재 날짜를 'YYMMDD' 형식으로 추가합니다.
      noteContents += dateToString(new Date(), true).slice(2).replace(/[^0-9]/gi, '') + "\n\n"
      noteContents += "\n\n\n"; // 마지막 공백 추가
  
      // 노트 내용을 파일로 저장합니다.
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write sucess");
  
      // 리소스를 실행합니다.
      await resource.launching(noteArr);
  
      // 메시지를 채널로 전송합니다.
      await messageSend({ text: `${thisDesigner.designer} 디자이너 ${thisClient.name} 고객님 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });

      // 시스템에 동기화 요청을 보냅니다.
      await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
  
    } else {

      // 만약 pid가 'p'로 시작하지 않는 경우, targetRaw를 조회하고, 필요한 정보를 설정합니다.
      // 이 경우 'addition.pid' 필드와 일치하는 데이터를 찾습니다.
      [ targetRaw ] = await back.mongoRead(rawCollection, { "addition.pid": pid }, { selfMongo: selfSecondMongo });

      // requestSystem 메서드를 통해 Ghost 서버에서 특정 경로에 있는 파일 목록을 가져옵니다.
      // path로 지정된 경로의 파일들을 조회합니다.
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", 
      { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, 
      { headers: { "Content-Type": "application/json" } }));

      // pid로 시작하는 파일만 필터링하여 가져옵니다.
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      
      // 필터링된 파일 목록에서 첫 번째 파일명을 가져와 thisFolderName 변수에 저장합니다.
      thisFolderName = ghostPhotos[0].fileName;

      // 파일명에서 디자이너 이름을 추출하여 thisDesignerName 변수에 저장합니다.
      // 파일명은 특정 형식을 따르고 있으며, '_'를 기준으로 구분됩니다.
      thisDesignerName = thisFolderName.split("_")[1].trim()

      // 다시 첫 번째 파일명을 ghostPhotos 변수에 저장합니다.
      ghostPhotos = ghostPhotos[0].fileName;

      // pid에 해당하는 세부 경로의 파일 목록을 다시 서버로부터 가져옵니다.
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", 
      { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, 
      { headers: { "Content-Type": "application/json" } }));

      // 가져온 파일 목록에서 파일명만 추출하여 ghostPhotosFiles 배열에 저장합니다.
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });

      // 디자이너 이름을 기반으로 디자이너 정보를 MongoDB에서 조회하여 thisDesigner 변수에 저장합니다.
      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });

      // 조회한 디자이너의 ID를 thisDesid 변수에 저장합니다.
      thisDesid = thisDesigner.desid;

      // 클라이언트의 이름, 디자이너 이름, 아파트 이름, 포트폴리오 ID를 설정합니다.
      // 여기서 클라이언트의 이름은 "없음"으로 기본 설정됩니다.
      this.clientName = "없음"
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;

      // 임시 디렉토리를 삭제합니다.
      await tempDelete();

      // 기존에 동일한 pid를 가진 임시 디렉토리가 존재하는 경우, 삭제합니다.
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }

      // 새로운 임시 디렉토리를 생성합니다.
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);

      // ghostPhotosFiles 배열에 저장된 각 파일을 순회하며 다운로드하여 임시 디렉토리에 저장합니다.
      num = 1;
      for (let fileName of ghostPhotosFiles) {
        // binaryRequest를 통해 원격 서버로부터 파일을 다운로드하여 이진 데이터로 받아옵니다.
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + 
        instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + 
        global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + 
        "." + fileName.split(".").slice(-1).join("."));
        
        // 받은 파일을 임시 디렉토리에 저장합니다.
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }

      // garoseroParser를 통해 다운로드한 이미지 디렉토리에서 파일 정보를 쿼리합니다.
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);

      // 최종 처리된 이미지를 저장할 배열을 선언하고, 각 이미지를 처리합니다.
      finalGsTong = [];
      seroIn = false;

      // targetPhotoDir 배열을 순회하며 이미지를 검토하고, 조건에 따라 finalGsTong에 추가합니다.
      for (let i = 0; i < targetPhotoDir.length; i++) {
        if (targetPhotoDir[i].gs === "g") {
          finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
          seroIn = false;
        } else {
          if (!seroIn) {
            // 다음 이미지가 존재하고, 그것이 's'라면 현재 이미지와 함께 추가합니다.
            if (targetPhotoDir[i + 1] !== undefined && targetPhotoDir[i + 1].gs === "s") {
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i + 1])));
              seroIn = true;
            }
          } else {
            seroIn = false;
          }
        }
      }

      // justOrderMode가 false라면, 사진 디렉토리를 정리하고 전체 작업을 수행합니다.
      if (!justOrderMode) {
  
        // 기존 사진 디렉토리를 삭제하고, 새로운 디렉토리를 생성합니다.
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);

        // 최종 처리된 이미지 파일들을 지정된 디렉토리로 이동합니다.
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }

        // 전체 작업을 수행하는 메서드를 호출합니다.
        await this.total_make(false);
      } else {
        // justOrderMode가 true라면, 기존 콘텐츠를 삭제합니다.
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }

      // 포트폴리오 노트 내용을 구성하여 noteContents 변수에 저장합니다.
      noteContents = pid + "\n";
      noteContents += thisDesigner.designer + " 실장님";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " " + String(targetRaw.addition.pyeong) + "py " + "홈스타일링";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.text.front.trim();
      if (Array.isArray(targetRaw.addition.text.backArr)) {
        for (let textStr of targetRaw.addition.text.backArr) {
          if (textStr !== '' && !/^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)$/gi.test(textStr)) {
            noteContents += "\n\n\n";
            noteContents += "1 - " + String(finalGsTong.length);
            noteContents += "\n\n\n";
            noteContents += "Space\n\n" + textStr.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
            noteContents += "\n\n\n";
          }
        }
      } else {
        noteContents += "\n\n\n";
        noteContents += "1 - " + String(finalGsTong.length);
        noteContents += "\n\n\n";
        noteContents += "Space\n\n" + targetRaw.addition.text.back.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
        noteContents += "\n\n\n";
      }
      noteContents += "_info\n\n"
      noteContents += thisDesigner.desid + "\n\n"
      noteContents += "_portfolio\n\n"
      noteContents += "_1\n\n"
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " 홈스타일링\n\n"
      noteContents += targetRaw.addition.region.trim() + "\n\n"
      noteContents += "아파트 홈스타일링\n\n"
      noteContents += "_2\n\n"
      noteContents += "세로 / 가로\n\n";
      try {
        noteContents += String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "s" }).realIndex + 1) + " " + String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "g" }).realIndex + 1) + "\n\n";
      } catch {
        noteContents += "1 2" + "\n\n";
      }
      noteContents += "슬라이드\n\n"
      noteContents += "1 2 3 4 5 6 7 8 9\n\n"
      noteContents += "태그\n\n"
      noteContents += "all,아파트,모던,화이트,서재,거실\n\n"
      noteContents += "서비스\n\n"
      noteContents += "홈스타일링\n\n"
      noteContents += "Key8\n\n"
      noteContents += "820\n\n"
      noteContents += "Key9\n\n"
      noteContents += dateToString(new Date(), true).slice(2).replace(/[^0-9]/gi, '') + "\n\n"
      noteContents += "\n\n\n";

      // 작성한 노트 내용을 지정된 경로에 파일로 저장합니다.
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);

      // 노트 내용을 배열로 분리하여 noteArr에 저장하고, resource의 p_id에 pid를 설정합니다.
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write success");

      // resource를 실행합니다.
      await resource.launching(noteArr);

      // 편집 완료를 요청하는 메시지를 채널에 전송합니다.
      await messageSend({ text: `${thisDesigner.designer} 디자이너 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });

      // 만약 forceProid가 존재한다면, 추가적인 삭제 작업을 수행합니다.
      if (forceProid !== null) {
        await requestSystem("https://" + instance.address.secondinfo.host + ":3003/projectDesignerRaw", {
          mode: "delete",
          desid: thisDesigner.desid,
          proid: forceProid,
          cliid: forceProid,
        }, {
          headers: { "Content-Type": "application/json" },
        });
      }

    }

    // 작업이 완료되면 MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    // 디자이너 ID를 반환합니다.
    return thisDesigner.desid;

  } catch (e) {
    // 예외가 발생한 경우, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);

    // 예외가 발생해도 MongoDB 연결을 종료합니다.
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();
    return false;
  }
}

/**
 * PortfolioFilter 클래스의 setDesignerSetting 메서드는 주어진 디자이너 ID(desid)와 포트폴리오 ID(pid)를 사용하여 
 * 디자이너의 포트폴리오 설정을 업데이트하고, 이를 시스템에 반영하는 작업을 수행합니다.
 * 
 * @param {string} desid - 디자이너 ID입니다.
 * @param {string} pid - 포트폴리오 ID입니다.
 * @returns {Promise<boolean>} 작업 성공 여부를 나타내는 불리언 값을 반환합니다.
 */
PortfolioFilter.prototype.setDesignerSetting = async function (desid, pid) {
  // 현재 PortfolioFilter 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // PortfolioFilter 클래스의 back 속성을 back 변수에 저장합니다.
  // back 속성은 BackMaker 클래스의 인스턴스를 가리킵니다.
  const back = this.back;

  // PortfolioFilter 클래스의 address 속성을 address 변수에 저장합니다.
  // address 속성은 홈리에종의 주소 정보 객체를 가리킵니다.
  const address = this.address;

  // Mother 클래스에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  // objectDeepCopy, requestSystem, sleep 메서드를 포함합니다.
  const { objectDeepCopy, requestSystem, sleep } = this.mother;

  try {
    // 필요한 변수들을 선언합니다.
    let thisDesigner; // 현재 디자이너의 정보
    let proposalArr, dummy, filesArr; // 제안 배열, 더미 함수, 파일 배열
    let description; // 디자이너 설명
    let files, index; // 파일 정보와 인덱스
    let thisContents; // 현재 포트폴리오의 내용
    let garoPhoto; // 가로 사진 배열

    // 주어진 pid를 사용하여 포트폴리오 콘텐츠를 가져옵니다.
    [ thisContents ] = (await back.getContentsArrByQuery({ "contents.portfolio.pid": pid })).toNormal();

    // 주어진 desid를 사용하여 디자이너 정보를 가져옵니다.
    thisDesigner = await back.getDesignerById(desid);

    // 디자이너의 설정에서 description을 깊은 복사하여 저장합니다.
    description = objectDeepCopy(thisDesigner.setting.description);

    // 포트폴리오의 사진 중 가로 사진만 필터링하여 garoPhoto 배열에 저장합니다.
    garoPhoto = thisContents.photos.detail.filter((o) => { return o.gs === "g" });

    // files 배열을 생성하여, 각각의 사진 파일 정보를 설정합니다.
    files = [
      { porlid: pid, index: garoPhoto[0].index },
      { porlid: pid, index: thisContents.contents.portfolio.detailInfo.photodae[0] },
      { porlid: pid, index: garoPhoto[1].index },
      { porlid: pid, index: garoPhoto[2].index },
      { porlid: pid, index: garoPhoto[3].index }
    ];

    // 파일 경로를 저장할 배열을 초기화합니다.
    filesArr = [];

    // files 배열을 순회하면서 각 파일의 경로를 filesArr에 추가합니다.
    for (let { porlid, index } of files) {
      if (porlid !== "ghost") {
        // 포트폴리오 이미지 경로를 구성하여 filesArr에 추가합니다.
        filesArr.push(`/corePortfolio/listImage/${porlid}/t${String(index)}${porlid}.jpg`);
      } else {
        // 유령 이미지의 경우 다른 경로를 사용합니다.
        filesArr.push(`/rawDesigner/ghost/${desid}/g${String(index)}.jpg`);
      }
    }

    // dummy 함수는 기본 설정을 생성합니다.
    dummy = () => {
      return {
        name: "기본 세팅", 
        photo: [
          {
            "position": "0",
            "sgTrue": "g",
            "unionPo": "union",
            "styleText": `width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url("${filesArr[0]}");`,
            "imgSrc": filesArr[0]
          },
          {
            "position": "1",
            "sgTrue": "s",
            "unionPo": "right",
            "styleText": `width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url("${filesArr[1]}");`,
            "imgSrc": filesArr[1]
          },
          {
            "position": "2",
            "sgTrue": "g",
            "unionPo": "union",
            "imgSrc": filesArr[2],
            "styleText": `top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url("${filesArr[2]}");`
          },
          {
            "position": "3",
            "sgTrue": "g",
            "unionPo": "union",
            "imgSrc": filesArr[3],
            "styleText": `top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url("${filesArr[3]}");`
          },
          {
            "position": "4",
            "sgTrue": "g",
            "unionPo": "union",
            "imgSrc": filesArr[4],
            "styleText": `top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url("${filesArr[4]}");`
          }
        ],
        description
      };
    }

    // proposalArr 배열을 초기화하고, 더미 설정을 복사하여 배열에 추가합니다.
    proposalArr = [];
    for (let i = 0; i < 5; i++) {
      proposalArr.push(objectDeepCopy(dummy()));
    }

    // 디자이너의 proposal 설정을 업데이트합니다.
    await back.updateDesigner([{ desid }, { "setting.proposal": proposalArr }]);

    // 디자이너의 front.methods 설정을 업데이트합니다.
    await back.updateDesigner([{ desid }, { "setting.front.methods": ["mth0", "mth7"] }]);

    // 디자이너의 front.photo 설정을 업데이트합니다.
    await back.updateDesigner([{ desid }, { "setting.front.photo": { porlid: pid, index: "t" + String(garoPhoto[0].index) } }]);

    // 설정을 적용하기 전에 500ms 대기합니다.
    await sleep(500);

    // 프론트 웹에 설정이 반영되도록 합니다.
    await requestSystem("https://" + address.testinfo.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

    // 작업이 성공적으로 완료되었음을 나타내는 true를 반환합니다.
    return true;
  } catch (e) {
    // 예외가 발생한 경우, 에러 메시지를 콘솔에 출력하고 false를 반환합니다.
    errorLogSync(e);
    return false;
  }
}

/**
 * PortfolioFilter 클래스의 chmodReload 메서드는 파일 시스템의 권한을 재설정합니다.
 * 이 메서드는 특히 Samba로 공유되는 폴더의 권한을 설정하는 데 사용됩니다.
 * 
 * @returns {Promise<void>}
 */
PortfolioFilter.prototype.chmodReload = async function () {
  // 현재 PortfolioFilter 클래스의 인스턴스를 instance 변수에 저장합니다.
  const instance = this;

  // Mother 클래스에서 필요한 메서드들을 비구조화 할당으로 불러옵니다.
  // fileSystem, shellExec 등 다양한 유틸리티 메서드를 포함합니다.
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo } = this.mother;

  try {
    // Samba로 공유된 corePortfolio 폴더의 권한을 재설정합니다.
    await shellExec("chmod", ["-R", "777", process.env.HOME + "/samba/corePortfolio"]);

    // Samba로 공유된 list_image 폴더의 권한을 재설정합니다.
    await shellExec("chmod", ["-R", "777", process.env.HOME + "/samba/list_image"]);
  } catch (e) {
    // 예외가 발생한 경우, 에러 메시지를 콘솔에 출력합니다.
    errorLogSync(e);
  }
}

module.exports = PortfolioFilter;
