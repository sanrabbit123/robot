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

    // 필요한 모듈들을 가져옵니다.
    const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 불러옵니다.
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스를 불러옵니다.
    const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`); // ADDRESS 객체를 불러옵니다.
    
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
  
  /**
   * infoMaker 메서드는 ResourceMaker 클래스 내에서 배열 데이터를 기반으로 포트폴리오와 리뷰 정보를 생성하는 메서드입니다.
   * 이 메서드는 다양한 포트폴리오 및 리뷰 정보를 파싱하여 객체 형태로 저장합니다.
   * @memberof ResourceMaker
   */
  infoMaker = () => {
    let temp_arr, temp_string, temp_obj; // 임시 배열, 문자열, 객체를 선언
    let key = 0; // "_info" 문자열이 있는 위치를 저장할 변수 초기화
    let totalInfo = []; // "_info" 이후의 데이터를 저장할 배열 초기화
    let result = {}; // 최종 결과를 저장할 객체 초기화
    let count = this.arr.length; // this.arr의 길이를 count 변수에 저장

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

    let portfolioKey = 0; // "_portfolio" 위치를 저장할 변수 초기화
    for (let i = 0; i < totalInfo.length; i++) {
      if (totalInfo[i] === "_portfolio") {
        portfolioKey = i; // "_portfolio" 위치를 portfolioKey에 저장
      }
    }

    let reviewKey = 0; // "_review" 위치를 저장할 변수 초기화
    for (let i = 0; i < totalInfo.length; i++) {
      if (totalInfo[i] === "_review") {
        reviewKey = i; // "_review" 위치를 reviewKey에 저장
      }
    }

    // 포트폴리오 정보를 파싱하여 저장
    let portfolio_lastNum;
    if (reviewKey !== 0) {
      portfolio_lastNum = reviewKey; // 리뷰 정보가 있는 경우, 포트폴리오 정보의 끝을 리뷰 위치로 설정
    } else {
      portfolio_lastNum = totalInfo.length; // 리뷰 정보가 없는 경우, 포트폴리오 정보의 끝을 totalInfo의 끝으로 설정
    }
    
    let portfolioInfo = []; // 포트폴리오 정보를 저장할 배열 초기화
    for (let i = portfolioKey + 1; i < portfolio_lastNum; i++) {
      portfolioInfo.push(totalInfo[i]);
    }

    let twoKey = 0; // "_2" 위치를 저장할 변수 초기화
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
    temp_arr = ["photodae", "slide", "tag", "service", "key8", "key9"];
    for (let i = 0; i < temp_arr.length; i++) {
      if (temp_arr[i] === "photodae") {
        // "photodae"의 경우, 특정 형식으로 변환하여 저장
        result.portfolio.p_info[temp_arr[i]] = [
          Number(portfolioInfo[twoKey + ((2 * i) + 2)].split(' ')[0]),
          Number(portfolioInfo[twoKey + ((2 * i) + 2)].split(' ')[1]),
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
      let reviewInfo = []; // 리뷰 정보를 저장할 배열 초기화
      for (let i = reviewKey + 1; i < totalInfo.length; i++) {
        reviewInfo.push(totalInfo[i]);
      }

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
      temp_arr = ["홈스타일링", "토탈 스타일링", "홈퍼니싱", "설계 변경"];
      temp_string = (result.portfolio.portivec.sub.split(", ")[1] + " 후기");

      for (let i of temp_arr) {
        temp_obj = new RegExp(i, "g").exec(temp_string);
        if (temp_obj !== null) {
          middleIndex = temp_obj.index;
        }
      }

      let pyeong = "error";
      if (/[0-9]+py/g.exec(this.arr[2]) !== null) {
        pyeong = /[0-9]+py/g.exec(this.arr[2])[0];
      } else {
        throw new Error("pyeong(py) error"); // 평수 정보가 없을 경우, 오류 발생
      }

      result.review.rev_name_card.sub = temp_string.slice(0, middleIndex - 1) + "\n" + pyeong + " " + temp_string.slice(middleIndex);
      result.review.rev_name_card.subsub = temp_string.slice(0, middleIndex - 1) + "\n" + temp_string.slice(middleIndex);

      // 리뷰 정보에 대한 세부 정보를 result 객체에 저장
      result.review.r_info = {};
      result.review.r_info.photodae = [
        Number(reviewInfo[twoKey + 2].split(' ')[0]),
        Number(reviewInfo[twoKey + 2].split(' ')[1]),
      ];
      result.review.r_info.order = Number(reviewInfo[twoKey + 4]);
    }

    this.result = result; // 최종적으로 파싱한 결과를 this.result에 저장
  };

  portfolio_maker = () => {
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
  
  portfolio_verification = () => {
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
    resultObj.boo.apart = (apartText.length < 12);
    resultObj.boo.subject = (subject.length < 19);
    resultObj.boo.apartTitle = (apart.length < 23);
    resultObj.boo.subjectTitle = (subject.length + apartText.length < 27);
  
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
    }
  }
  
  modelingMap = () => {
    const map = require(`${process.cwd()}/apps/backMaker/map/contents.js`);
    let model = map.main();
    return JSON.parse(JSON.stringify(model));
  }
  
  portfolio_modeling = async (conidArr, proid, cliid, service) => {
    const instance = this;
    const back = this.back;
    const { fileSystem, orderSystem, autoComma } = this.mother;
    const past = this.final;
    const dateMaker = function (dateRaw) {
      let date = "20" + dateRaw.slice(0, 2) + "-" + dateRaw.slice(2, 4) + "-" + dateRaw.slice(4);
      return date;
    }
    const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
    const garoseroParser = new ImageReader();
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
  
      tempObj = this.modelingMap().structure;
  
      tempObj.conid = "";
      tempObj.desid = past.designer;
      tempObj.cliid = cliid;
      tempObj.proid = proid;
      tempObj.service = service;
  
      thisDeisnger = await back.getDesignerById(tempObj.desid);
  
      portfolio = tempObj.contents.portfolio;
  
      portfolio.pid = past.p_id;
  
      portfolio.spaceInfo.space = past.space;
      portfolio.spaceInfo.pyeong = Number(past.pyeong);
      portfolio.spaceInfo.region = past.sub_titles.portivec.region;
      portfolio.spaceInfo.method = past.sub_titles.portivec.method;
      portfolio.spaceInfo.budget = "3,000만원";
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
      portfolio.detailInfo.tendency = thisDeisnger.analytics.styling.tendency.toNormal();
  
      portfolio.contents.suggestion = past.suggestion;
      portfolio.contents.detail = [];
  
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
        tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_" + orderSystem("encode", 1));
      } else {
        tempObj.conid = ("t" + todayString.slice(2, 4) + todayString.slice(5, 7) + "_" + orderSystem("encode", (orderSystem("decode", conidTargetArr[0]) + 1)));
      }
  
      this.final = tempObj;
  
    } catch (e) {
      console.log(e);
    }
  }
  
  launching = async (thisContents = []) => {
    const instance = this;
    const back = this.back;
    const { fileSystem, mongo, mongoinfo, mongocontentsinfo, shellExec, shellLink, headRequest, binaryRequest, ghostFileUpload, requestSystem, chromeOpen, sleep } = this.mother;
    const MONGOC = new mongo(mongoinfo);
    const MONGOCONTENTSC = new mongo(mongocontentsinfo);
    const sizeMatrix = [
      [ 1200, 848 ],
      [ 800, 566 ],
      [ 2400, 1697 ]
    ];
    const qualityConst = 96;
    const bQualityConst = 98;
    const originalInitial = 'i';
    const desktopInitial = 't';
    const mobileInitial = 'mot';
    const reviewInitial = 'b';
    const serverFolderPath = "corePortfolio/listImage";
    try {
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
  
      await MONGOC.connect();
      await MONGOCONTENTSC.connect();
  
      //mkdir temp directory
      tempFolderName = "tempResourcMakerFolder";
      tempHome = process.env.HOME + "/" + tempFolderName;
      homeFolderList = await fileSystem(`readDir`, [ process.env.HOME ]);
      if (homeFolderList.includes(tempFolderName)) {
        await shellExec(`rm -rf ${shellLink(tempHome)}`);
      }
      await shellExec(`mkdir ${shellLink(tempHome)}`);
  
      this.arr = thisContents;
      tempRows = await back.getContentsArrByQuery({ "contents.portfolio.pid": this.p_id });
      if (tempRows.length !== 0) {
        throw new Error("invaild pid");
      }
  
      //parsing portfolio number
      tempResponse = 200;
      index = 0;
      while (tempResponse === 200) {
        index++;
        tempResponse = await headRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/" + originalInitial + String(index) + this.p_id + ".jpg");
        tempResponse = tempResponse.statusCode;
      }
      console.log(index);
  
      //download images
      for (let i = 1; i < index; i++) {
        tempObject = await binaryRequest(this.s3Host + "/corePortfolio/original/" + this.p_id + "/" + originalInitial + String(i) + this.p_id + ".jpg");
        await fileSystem(`writeBinary`, [ tempHome + "/" + originalInitial + String(i) + this.p_id + ".jpg", tempObject ]);
        console.log(tempHome + "/" + originalInitial + String(i) + this.p_id + ".jpg", `download success`);
      }
      this.targetFolder = tempHome;
  
      //make info and write raw file
      this.infoMaker();
      this.portfolio_maker();
      await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}_raw.js`, JSON.stringify(this.final, null, 2) ]);
  
      //parsing cliid, proid
      namesArr = this.arr[1].split(" ");
  
      if (namesArr.length > 2) {
        clients = await this.back.getClientsByQuery({ name: namesArr[2].trim() });
        thisProject = null;
        proid = null;
        cliid = null;
  
        searchQuery = { $and: [ { desid: this.result.designer }, { $or: clients.toNormal().map((c) => { return { cliid: c.cliid } }) } ] };
        projects = await this.back.getProjectsByQuery(searchQuery);
        console.log(projects);
        if (projects.length > 0) {
          contentsArr = (await this.back.getContentsArrByQuery({ $or: projects.toNormal().map((p) => { return { proid: p.proid } }) })).toNormal().map((c) => {
            return c.proid;
          });
          projects = projects.toNormal().filter((p) => { return !contentsArr.includes(p.proid) });
          thisProject = projects[0];
          proid = thisProject.proid;
          cliid = thisProject.cliid;
          thisService = thisProject.service;
        }
  
        if (cliid === null) {
          console.log(namesArr);
        }
        if (proid === null) {
          console.log(namesArr);
        }
      } else {
        proid = "";
        cliid = "";
        thisService = {
          serid: "s2011_aa02s",
          xValue: "B",
          online: false,
        }
      }
  
      //rendering resource and write file
      temp = await MONGOC.db(`miro81`).collection(`contents`).find({}).project({ conid: 1 }).sort({ conid: -1 }).limit(1).toArray();
      await this.portfolio_modeling(temp, proid, cliid, thisService);
      await fileSystem("write", [ `${process.cwd()}/temp/${this.p_id}.js`, JSON.stringify(this.final, null, 2) ]);
  
      //confirm
      outputFolder = tempHome + "/portp" + this.p_id;
      outputMobildFolder = outputFolder + "/mobile";
  
      await shellExec(`mkdir`, [ outputFolder ]);
      await shellExec(`mkdir`, [ outputMobildFolder ]);
  
      for (let { index, gs } of this.final.photos.detail) {
        await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(index)}${this.p_id}.jpg -resize ${gs === 's' ? String(sizeMatrix[0][1]) + "x" + String(sizeMatrix[0][0]) : String(sizeMatrix[0][0]) + "x" + String(sizeMatrix[0][1])} -quality ${String(qualityConst)} ${shellLink(outputFolder)}/${desktopInitial}${String(index)}${this.p_id}.jpg`);
        await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(index)}${this.p_id}.jpg -resize ${gs === 's' ? String(sizeMatrix[1][1]) + "x" + String(sizeMatrix[1][0]) : String(sizeMatrix[1][0]) + "x" + String(sizeMatrix[1][1])} -quality ${String(qualityConst)} ${shellLink(outputMobildFolder)}/${mobileInitial}${String(index)}${this.p_id}.jpg`);
      }
  
      if (this.final.contents.review.detailInfo.photodae.length > 1) {
        await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(this.final.contents.review.detailInfo.photodae[1])}${this.p_id}.jpg -resize ${String(sizeMatrix[2][0]) + "x" + String(sizeMatrix[2][1])} -quality ${String(bQualityConst)} ${shellLink(outputFolder)}/${reviewInitial}${String(this.final.contents.review.detailInfo.photodae[1])}${this.p_id}.jpg`);
      }
      await shellExec(`convert ${shellLink(tempHome)}/${originalInitial}${String(this.final.contents.portfolio.detailInfo.photodae[1])}${this.p_id}.jpg -resize ${String(sizeMatrix[2][0]) + "x" + String(sizeMatrix[2][1])} -quality ${String(bQualityConst)} ${shellLink(outputFolder)}/${reviewInitial}${String(this.final.contents.portfolio.detailInfo.photodae[1])}${this.p_id}.jpg`);
      await shellExec(`cp -r ${shellLink(outputFolder)} /home/ubuntu/samba/list_image/`);
  
      outputFolderList = await fileSystem(`readDir`, [ outputFolder ]);
      outputMobildFolderList = await fileSystem(`readDir`, [ outputMobildFolder ]);
  
      fromArr = [];
      toArr = [];
      try {
        await shellExec("mkdir", [ "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id ]);
      } catch {}
      try {
        await shellExec("mkdir", [ "/home/ubuntu/samba/" + serverFolderPath + "/" + this.p_id + "/mobile" ]);
      } catch {}
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
  
      await MONGOC.db(`miro81`).collection(`contents`).insertOne(this.final);
      await back.mongoDelete("foreContents", { pid: this.p_id }, { selfMongo: MONGOCONTENTSC });
      await requestSystem("https://" + instance.address.testinfo.host + ":" + String(3000) + "/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });
  
      console.log("contents upload done");
  
      await shellExec(`rm -rf ${shellLink(process.env.HOME)}/${tempFolderName}`);
  
    } catch (e) {
      console.log(e);
    } finally {
      await MONGOC.close();
      await MONGOCONTENTSC.close();
    }
  }
}

class PortfolioFilter {
  constructor (clientName = "", apartName = "", designer = "", pid = "g0") {
    const Mother = require(`${process.cwd()}/apps/mother.js`);
    const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
    const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
    const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
    const apart = function (str) {
      let arr = str.split(' ');
      let new_string = '';
      for (let i of arr) {
        new_string += i + '_';
      }
      new_string += "홈스타일링_";
      return new_string;
    }
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = require(`${process.cwd()}/apps/infoObj.js`);
    this.dir = `${process.cwd()}/apps/portfolioFilter`;
    this.image = new ImageReader(this.mother, this.back, this.address);
    this.hangul = new ParsingHangul();
    this.clientName = clientName;
    this.designer = designer;
    this.apartName = apart(apartName);
    this.pid = pid;
    this.resourceFolderName = "resource";
    this.resultFolderName = "result";
    this.options = {
      home_dir: `${process.env.HOME}/portfolioFilter`,
      photo_dir: `${process.env.HOME}/portfolioFilter/${this.resourceFolderName}`,
      result_dir: `${process.env.HOME}/portfolioFilter/${this.resultFolderName}`,
    };
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

  async static_setting () {
    const instance = this;
    const { fileSystem, shellExec, shellLink } = this.mother;
    try {
      let staticFolderBoo, staticFolderBootr;
      let order;
      let staticFolderscriptBoo, staticFolderscriptBootr;
      let staticFolderresultBootr, staticFolderresourceBootr;
      let folderList;
  
      staticFolderBoo = await this.mother.fileSystem(`readDir`, [ process.env.HOME ]);
      staticFolderBootr = false;
      for (let i of staticFolderBoo) {
        if (/^portfolioFilter/.test(i)) {
          staticFolderBootr = true;
        }
      }
      if (!staticFolderBootr) {
        order = ``;
        order += `mkdir ${shellLink(this.options.home_dir)};`;
        order += `mkdir ${shellLink(this.options.home_dir)}/script;`;
        order += `mkdir ${shellLink(this.options.home_dir)}/result;`;
        order += `mkdir ${shellLink(this.options.home_dir)}/resource;`;
        await shellExec(order);
      } else {
        staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
        staticFolderscriptBootr = false;
        for (let i of staticFolderscriptBoo) {
          if (/^script$/.test(i)) {
            staticFolderscriptBootr = true;
          }
        }
        if (!staticFolderscriptBootr) {
          await shellExec(`mkdir ${shellLink(this.options.home_dir)}/script`);
        }
        staticFolderresultBootr = false;
        for (let i of staticFolderscriptBoo) {
          if (/^result$/.test(i)) {
            staticFolderresultBootr = true;
          }
        }
        if (!staticFolderresultBootr) {
          await shellExec(`mkdir ${shellLink(this.options.home_dir)}/result`);
        }
        staticFolderresourceBootr = false;
        for (let i of staticFolderscriptBoo) {
          if (/^resource$/.test(i)) {
            staticFolderresourceBootr = true;
          }
        }
        if (!staticFolderresourceBootr) {
          await shellExec(`mkdir ${shellLink(this.options.home_dir)}/resource`);
        }
      }
  
    } catch (e) {
      console.log(e.message);
    }
  }
  
  image_filter (str, size) {
    const instance = this;
    let date = new Date();
    let datestring = String(date.getFullYear()).slice(2);
    if (date.getMonth() + 1 < 10) {
      datestring += '0' + String(date.getMonth() + 1);
    } else {
      datestring += String(date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
      datestring += '0' + String(date.getDate());
    } else {
      datestring += String(date.getDate());
    }
    str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
    str = str.replace(/[^0-9]/g, '');
    str = str.replace(/^0/g, '');
    if (str.length === 1) {
      str = '0' + str;
    }
    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      str = this.clientName + '_' + size + '_' + str + '_' + datestring + '.jpg';
    } else {
      str = this.designer + '_' + size + '_' + str + '_' + datestring + '.jpg';
    }
    return str;
  }
  
  just_filter (str) {
    str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
    str = str.replace(/[^0-9]/g, '');
    str = str.replace(/^0/g, '');
    return str;
  }

}

PortfolioFilter.prototype.to_portfolio = async function (liteMode = false) {
  const instance = this;
  const image = this.image;
  const { fileSystem, shellExec, shellLink, todayMaker } = this.mother;
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

    file_list = await fileSystem(`readFolder`, [ this.options.photo_dir ]);
    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
    }

    file_list.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < file_list.length; i++) {
      await shellExec(`mv ${shellLink(this.options.photo_dir + "/" + file_list[i])} ${shellLink(this.options.photo_dir)}/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    options.photo_list = file_list;
    console.log(file_list);

    rawFix_file_list = [];
    for (let photo of file_list) {
      rawFix_file_list.push(`${this.options.photo_dir}/${photo}`);
    }
    console.log(rawFix_file_list);

    photo_sizes = liteMode ? [ "780" ] : [ "3508" ];

    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of resultFolderBoo) {
      await shellExec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`);
    }

    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      this.folderName = `${this.pid}_${this.designer}_${this.clientName}_${todayMaker("total")}`;
    } else {
      this.folderName = `${this.pid}_${this.designer}_${todayMaker("total")}`;
    }
    resultFolder = `${this.options.result_dir}/${this.folderName}`;
    this.resultFolder = resultFolder;
    await shellExec(`mkdir ${shellLink(resultFolder)}`);

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

    return resultFolder;

  } catch (e) {
    console.log(e);
    return null;
  }
}

PortfolioFilter.prototype.parsing_fileList = async function (resultFolder, liteMode = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let fileList_780_raw, fileList_1500_raw, fileList_original_raw, fileList_png_raw;
    let fileList_780, fileList_1500, fileList_original, fileList_png;
    let resultFolderArr, resultFolderParent;

    resultFolderArr = resultFolder.split('/');
    resultFolderArr.pop();
    resultFolderParent = resultFolderArr.join('/');

    try {
      fileList_780_raw = await fileSystem(`readDir`, [ `${resultFolder}/780` ]);
      if (!liteMode) {
        fileList_original_raw = await fileSystem(`readDir`, [ `${resultFolder}/3508` ]);
      }
    } catch {
      fileList_780_raw = [];
      fileList_original_raw = [];
    }

    fileList_780 = [];
    fileList_original = [];

    for (let i of fileList_780_raw) {
      if (i !== `.DS_Store`) {
        fileList_780.push(resultFolder + "/780/" + i);
      }
    }
    if (!liteMode) {
      for (let i of fileList_original_raw) {
        if (i !== `.DS_Store`) {
          fileList_original.push(resultFolder + "/3508/" + i);
        }
      }
    }

    return { fileList_780, fileList_1500: [], fileList_original, fileList_png: [] };
  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.total_make = async function (liteMode = false) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, ghostFileUpload, sleep, messageSend, requestSystem } = this.mother;
  const idFilterNum = function (past) {
    let newNumber;
    past = past.split('_')[2];
    past = past.replace(/[^0-9]/g, '');
    past = past.replace(/^0/, '');
    newNumber = Number(past);
    return newNumber;
  }
  const idFilter = function (past) {
    return String(idFilterNum(past));
  }
  try {
    const photoFolderConst = "사진_등록_포트폴리오";
    await this.static_setting();

    let pidFolder, fromArr, toArr;
    let resultFolder;
    let ghostPhotos, ghostPhotosTarget;
    let sambaPhotoPath;

    resultFolder = await this.to_portfolio(liteMode);
    const { fileList_780, fileList_original } = await this.parsing_fileList(resultFolder, liteMode);
    console.log(fileList_780, fileList_original);

    if (liteMode) {
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
      await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/makeFolder", { path: sambaPhotoPath }, { headers: { "Content-Type": "application/json" } });
    } else {
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      ghostPhotosTarget = null;
      for (let folder of ghostPhotos) {
        if ((new RegExp("^" + this.pid)).test(folder)) {
          ghostPhotosTarget = folder;
        }
      }
      if (ghostPhotosTarget === null) {
        throw new Error("there is no folder in server");
      } else {
        this.folderName = ghostPhotosTarget;
      }
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
    }

    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780" ])
    } catch {}
    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/1500" ])
    } catch {}
    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508" ])
    } catch {}

    if (!liteMode) {
      for (let f of fileList_original) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508/" ]);
      }
    } else {
      for (let f of fileList_780) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780/" ]);
      }
    }
    await messageSend({ text: `${this.folderName} 사진을 처리하였습니다! (total_make success)`, channel: `#502_sns_contents` });

    if (!liteMode) {
      await shellExec(`mv ${shellLink(this.resultFolder)}/3508 ${shellLink(this.resultFolder)}/${this.pid}`);
      pidFolder = await fileSystem(`readDir`, [ this.resultFolder + "/" + this.pid ]);
      fromArr = [];
      toArr = [];

      pidFolder.sort((a, b) => { return idFilterNum(a) - idFilterNum(b); });

      try {
        await shellExec("mkdir", [ `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}` ])
      } catch {}
      for (let i of pidFolder) {
        if (i !== `.DS_Store`) {
          await shellExec(`mv ${shellLink(this.resultFolder + "/" + this.pid + "/" + i)} ${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          await shellExec(`cp`, [ `${(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`, `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}/` ]);
          fromArr.push(`${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          toArr.push(`corePortfolio/original/${this.pid}/i${idFilter(i)}${this.pid}.jpg`);
        }
      }

      console.log(fromArr);
      console.log(toArr);
      await ghostFileUpload(fromArr, toArr);
      console.log(`ghost upload done`);
    }

    return { folderName: this.folderName };

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.rawToRaw = async function (arr) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const image = this.image;
  const { fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongoinfo } = this.mother;
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  const notePath = process.env.HOME + "/note/portfolio";
  const photoFolderConst = "사진_등록_포트폴리오";
  const foreCastContant = `/corePortfolio/forecast`;
  const forecastPath = this.address.officeinfo.ghost.file.static + foreCastContant;
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const kakaoInstance = new KakaoTalk();
  const collection = "foreContents";
  const selfCoreMongo = new mongo(mongoinfo);
  const selfMongo = new mongo(mongoofficeinfo);
  const garoseroParser = new ImageReader();
  let nextPid;

  nextPid = null;

  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
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

    await this.static_setting();

    rawObj = arr[0];
    client = rawObj.cliid;
    designer = rawObj.desid;
    nextPid = null;

    if (/^c[0-9]/.test(client) && /^d[0-9]/.test(designer)) {

      [ targetClient ] = await back.mongoRead("client", { cliid: client }, { selfMongo: selfCoreMongo });
      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^p/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'p' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      this.clientName = targetClient.name;
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

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

      forecast = await garoseroParser.queryDirectory(folderPath);
      for (let obj of forecast) {
        obj.file = foreCastContant + "/" + nextPid + "/" + obj.file.split("/").slice(-1).join("/");
      }
      finalObj = { pid: nextPid, desid: targetDesigner.desid, client, forecast };
      await back.mongoCreate(collection, finalObj, { selfMongo });
      console.log("db in success");

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

      clientObj = targetClient;
      designerObj = targetDesigner;

      await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/zipPhoto", { pid: nextPid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

      await shellExec(`rm -rf ${shellLink(folderPath)};`);

      await requestSystem("https://" + instance.address.officeinfo.host + ":3000/evaluationNotice", { mode: "send", cliid: clientObj.cliid, desid: designerObj.desid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
      await kakaoInstance.sendTalk("photoShareClient", clientObj.name, clientObj.phone, { client: clientObj.name, host: instance.address.frontinfo.host, path: "evaluation", proid: project.proid });
      await kakaoInstance.sendTalk("photoShareDesigner", designerObj.designer, designerObj.information.phone, { client: clientObj.name, designer: designerObj.designer, host: instance.address.frontinfo.host, proid: project.proid });
      await messageSend({ text: `${designerObj.designer} 디자이너, ${clientObj.name} 고객님께 사진 공유 알림톡을 전송하였습니다!`, channel: `#502_sns_contents` });
      await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "store", cliid: clientObj.cliid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

    } else {

      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^a/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'a' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      this.clientName = "없음";
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

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

      await shellExec(`rm -rf ${shellLink(folderPath)};`);
    }
    
    await selfMongo.close();
    await selfCoreMongo.close();
    return nextPid;
  } catch (e) {
    console.log(e);
    if (typeof nextPid === "string") {
      await back.mongoDelete(collection, { pid: nextPid }, { selfMongo });
    }
    await selfMongo.close();
    await selfCoreMongo.close();
    return false;
  }
}

PortfolioFilter.prototype.rawVideo = async function (arr) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const hangul = this.hangul;
  const options = this.options;
  const { mongo, mongoinfo, mongoofficeinfo, fileSystem, shellExec, shellLink, consoleQ, sleep, messageSend, requestSystem, ghostFileUpload } = this.mother;
  const errorMessage = `argument must be => [ { client: "", designer: "" } ... ]`;
  const selfMongo = new mongo(mongoinfo);
  const selfContentsMongo = new mongo(mongoofficeinfo);
  const collection = "foreContents";
  const splitToken = "__split__";
  const corePortfolio = "corePortfolio";
  const serverFolderName = "rawVideo";
  const videoFileKeyword = "v";
  try {
    if (!Array.isArray(arr)) {
      throw new Error(errorMessage);
    }
    let tempArr, tempArr2;
    let clientName, designerName;
    let projects;
    let targetProject;
    let rows;
    let thisProid, thisPid;
    let contentsArr;
    let thisFolderName;
    let response;
    let thisFileName;
    let exe;
    let targetFolder, targetFolderList;
    let num;

    await selfMongo.connect();
    await selfContentsMongo.connect();
    await this.static_setting();

    for (let { client, designer } of arr) {

      targetFolder = options.photo_dir;
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      num = 0;
      for (let name of targetFolderList) {
        await shellExec(`mv ${shellLink(targetFolder + "/" + name)} ${shellLink(targetFolder + "/" + client + "_" + designer + "_" + String(num) + "." + name.split(".")[name.split(".").length - 1])}`);
        num++;
      }

      targetFolder = options.photo_dir;
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      for (let fileName of targetFolderList) {
        tempArr = fileName.split("_");
        tempArr2 = tempArr[tempArr.length - 1].split(".");
        tempArr[tempArr.length - 1] = tempArr2[0];
        for (let i = 1; i < tempArr2.length; i++) {
          tempArr.push(tempArr2[i]);
        }
        [ clientName, designerName ] = tempArr;
        exe = tempArr[tempArr.length - 1];

        projects = await back.getProjectsByNames([ hangul.fixString(clientName.trim()), hangul.fixString(designerName.trim()) ], { selfMongo });

        if (projects.length === 0) {
          console.log(clientName, designerName);
          targetProject = null;
        } else {
          projects = projects.toNormal().filter((p) => { return p.desid !== "" });
          if (projects.length === 0) {
            console.log(clientName, designerName);
            targetProject = null;
          } else if (projects.length !== 1) {
            projects = projects.filter((p) => {
              return p.process.contract.remain.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return !/^드/gi.test(p.process.status);
            }).filter((p) => {
              return p.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return p.contents.photo.date.valueOf() <= (new Date()).valueOf() && p.contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });
            projects.sort((a, b) => {
              return b.contents.photo.date.valueOf() - a.contents.photo.date.valueOf();
            });
            if (projects.length === 0) {
              console.log(clientName, designerName);
              targetProject = null;
            } else {
              [ targetProject ] = projects;
            }
          } else {
            [ targetProject ] = projects;
          }
        }

        if (targetProject === null) {
          throw new Error(clientName + " " + designerName + " " + "project not found");
        }

        thisProid = targetProject.proid;
        rows = await back.mongoRead(collection, { proid: thisProid }, { selfMongo: selfContentsMongo });

        if (rows.length > 0) {
          thisPid = rows[0].pid;
        } else {
          contentsArr = await back.getContentsArrByQuery({ proid: thisProid }, { selfMongo });
          if (contentsArr.length === 0) {
            if (projects.length > 1) {
              thisPid = null;
              for (let i = 1; i < projects.length; i++) {
                rows = await back.mongoRead(collection, { proid: projects[i].proid }, { selfMongo: selfContentsMongo });
                if (rows.length > 0) {
                  thisPid = rows[0].pid;
                } else {
                  contentsArr = await back.getContentsArrByQuery({ proid: projects[i].proid }, { selfMongo });
                  if (contentsArr.length > 0) {
                    thisPid = contentsArr[0].contents.portfolio.pid;
                  }
                }
                if (thisPid !== null) {
                  thisProid = projects[i].proid;
                  break;
                }
              }
              if (thisPid === null) {
                throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
              }
            } else {
              throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
            }
          } else {
            thisPid = contentsArr[0].contents.portfolio.pid;
          }
        }

        thisFolderName = thisProid + splitToken + thisPid;

        response = await requestSystem("https://" + address.officeinfo.ghost.host + "/makeFolder", {
          path: "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName,
        }, {
          headers: { "Content-Type": "application/json" }
        });

        thisFileName = videoFileKeyword + String(response.data.list.length) + thisPid + "." + exe;
        await ghostFileUpload([ `${targetFolder}/${fileName}` ], [ "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName + "/" + thisFileName ]);

      }

    }

  } catch (e) {
    console.log(e);
  } finally {
    await selfMongo.close();
    await selfContentsMongo.close();
  }
}

PortfolioFilter.prototype.updateSubject = async function (pid, individualKey = null) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;
  const selfMongo = new mongo(mongoofficeinfo);
  const selfCoreMongo = new mongo(mongoinfo);
  const selfSecondMongo = new mongo(mongosecondinfo);
  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();
    const collection = "foreContents";
    const rawCollection = "designerRawContents";
    const toNormal = true;
    const photoFolderConst = "사진_등록_포트폴리오";
    let targetFores;
    let targetContents;
    let proid;
    let targetRaw;
    let targetBody;
    let tong;
    let thisBlank;
    let targetText;
    let frontText;
    let backText;
    let frontEnd;
    let backEnd;
    let project, client;
    let subjectInput;
    let apartInput;
    let regionInput;
    let targetPid;
    let addressArr;
    let contents;
    let ghostPhotos;
    let thisFolderName;
    let thisDesignerName;
    let thisDesid;
    let thisDesigner;
    let pyeongInput;
    let infoIndex;
    let backArr;

    if (/^p/.test(pid.trim())) {
      targetPid = pid;
      [ targetFores ] = await back.mongoRead(collection, { pid: targetPid }, { selfMongo });
      proid = targetFores.proid;
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });
      project = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      client = await back.getClientById(project.cliid, { selfMongo: selfCoreMongo, toNormal });
  
      tong = [];
      targetBody = targetRaw.contents.body.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");
  
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (thisBlank) {
            // pass
          } else {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }
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
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
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

      addressArr = client.requests[0].request.space.address.split(" ").map((s) => { return s.trim() });
      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = addressArr[0].slice(0, 2) + " " + addressArr[1];

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

      proid = individualKey;

      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      thisFolderName = ghostPhotos.find((a) => { return (new RegExp("^" + pid)).test(a) })
      thisDesignerName = thisFolderName.split("_")[1].trim();
      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });
      thisDesid = thisDesigner.desid;
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });

      contents = targetRaw.contents.body.trim();

      tong = [];
      targetBody = contents.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");
  
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (thisBlank) {
            // pass
          } else {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }
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
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
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

      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = "서울시 관악구";
      pyeongInput = String(34);

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

    await sleep(500);
    await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawToContents", {
      pid,
      proid
    }, { headers: { "Content-Type": "application/json" } });
    await sleep(500);

    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return true;

  } catch (e) {
    console.log(e);
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return false;
  }
}

PortfolioFilter.prototype.rawToContents = async function (pid, justOrderMode = false, forceProid = null) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const image = this.image;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;
  const notePath = process.env.HOME + "/note/portfolio";
  const selfMongo = new mongo(mongoofficeinfo);
  const selfCoreMongo = new mongo(mongoinfo);
  const selfSecondMongo = new mongo(mongosecondinfo);
  const photoFolderConst = "사진_등록_포트폴리오";
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  const garoseroParser = new ImageReader();
  const portfolioLink = "https://" + this.address.frontinfo.host + "/portdetail.php?pid=";
  const resource = new ResourceMaker();
  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();
    const collection = "foreContents";
    const rawCollection = "designerRawContents";
    const channel = "#502_sns_contents";
    const toNormal = true;
    let targetFores;
    let targetRaw;
    let proid;
    let thisProject, thisClient, thisDesigner;
    let ghostPhotos;
    let ghostPhotosFiles;
    let tempObject;
    let num;
    let targetPhotoDir;
    let finalGsTong;
    let seroIn;
    let noteContents;
    let noteArr;
    let thisDesignerName;
    let thisDesid;
    let thisFolderName;
    let targetContents;

    if (/^p/gi.test(pid.trim())) {

      [ targetFores ] = await back.mongoRead(collection, { pid }, { selfMongo });
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
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });
  
      console.log(proid);

      thisProject = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      thisClient = await back.getClientById(thisProject.cliid, { selfMongo: selfCoreMongo, toNormal });
      thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: selfCoreMongo, toNormal });
  
      this.clientName = thisClient.name;
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;
  
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      ghostPhotos = ghostPhotos[0].fileName;
  
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });
  
      await tempDelete();
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);
  
      num = 1;
      for (let fileName of ghostPhotosFiles) {
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + "." + fileName.split(".").slice(-1).join("."));
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }
  
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);
      finalGsTong = [];
      seroIn = false;
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

      if (!justOrderMode) {    
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }
    
        await this.total_make(false);
    
        console.log(finalGsTong);
      } else {
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }
  
      noteContents = pid + "\n";
      noteContents += thisDesigner.designer + " 실장님 " + thisClient.name + " 고객님";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " " + String(targetRaw.addition.pyeong) + "py " + "홈스타일링";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.text.front.trim();
      noteContents += "\n\n\n";
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
      noteContents += "세로 / 가로\n\n"
      noteContents += String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "s" }).realIndex + 1) + " " + String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "g" }).realIndex + 1) + "\n\n";
      noteContents += "슬라이드\n\n"
      noteContents += "1 2 3 4 5 6 7 8 9\n\n"
      noteContents += "태그\n\n"
      noteContents += "all,아파트,수루배,블루,모던,화이트,세종,세종시,서재,거실\n\n"
      noteContents += "서비스\n\n"
      noteContents += "홈스타일링\n\n"
      noteContents += "Key8\n\n"
      noteContents += "820\n\n"
      noteContents += "Key9\n\n"
      noteContents += dateToString(new Date(), true).slice(2).replace(/[^0-9]/gi, '') + "\n\n"
      noteContents += "\n\n\n";
  
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write sucess");
  
      await resource.launching(noteArr);
  
      await messageSend({ text: `${thisDesigner.designer} 디자이너 ${thisClient.name} 고객님 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });
      await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
  
    } else {

      [ targetRaw ] = await back.mongoRead(rawCollection, { "addition.pid": pid }, { selfMongo: selfSecondMongo });
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      
      thisFolderName = ghostPhotos[0].fileName;
      thisDesignerName = thisFolderName.split("_")[1].trim()

      ghostPhotos = ghostPhotos[0].fileName;
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });

      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });
      thisDesid = thisDesigner.desid;

      this.clientName = "없음"
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;
  
      await tempDelete();
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);
  
      num = 1;
      for (let fileName of ghostPhotosFiles) {
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + "." + fileName.split(".").slice(-1).join("."));
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }
  
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);
      finalGsTong = [];
      seroIn = false;
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

      if (!justOrderMode) {
  
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }
        await this.total_make(false);
      } else {
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }
    
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
  
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write sucess");
  
      await resource.launching(noteArr);
  
      await messageSend({ text: `${thisDesigner.designer} 디자이너 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });
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

    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return thisDesigner.desid;
  } catch (e) {
    console.log(e);
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();
    return false;
  }
}

PortfolioFilter.prototype.setDesignerSetting = async function (desid, pid) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { objectDeepCopy, requestSystem, sleep } = this.mother;
  try {
    let thisDesigner;
    let proposalArr, dummy, filesArr;
    let description;
    let files, index;
    let thisContents;
    let garoPhoto;

    [ thisContents ] = (await back.getContentsArrByQuery({ "contents.portfolio.pid": pid })).toNormal();
    thisDesigner = await back.getDesignerById(desid);
    description = objectDeepCopy(thisDesigner.setting.description);

    garoPhoto = thisContents.photos.detail.filter((o) => { return o.gs === "g" });
    files = [
      { porlid: pid, index: garoPhoto[0].index },
      { porlid: pid, index: thisContents.contents.portfolio.detailInfo.photodae[0] },
      { porlid: pid, index: garoPhoto[1].index },
      { porlid: pid, index: garoPhoto[2].index },
      { porlid: pid, index: garoPhoto[3].index }
    ];
    filesArr = [];
    for (let { porlid, index } of files) {
      if (porlid !== "ghost") {
        filesArr.push(`/corePortfolio/listImage/${porlid}/t${String(index)}${porlid}.jpg`);
      } else {
        filesArr.push(`/rawDesigner/ghost/${desid}/g${String(index)}.jpg`);
      }
    }

    dummy = () => {
      return { name: "기본 세팅", photo: [
        {
            "position" : "0",
            "sgTrue" : "g",
            "unionPo" : "union",
            "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"" + filesArr[0] + "\");",
            "imgSrc" : filesArr[0]
        },
        {
            "position" : "1",
            "sgTrue" : "s",
            "unionPo" : "right",
            "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"" + filesArr[1] + "\");",
            "imgSrc" : filesArr[1]
        },
        {
            "position" : "2",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[2],
            "styleText" : "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[2] + "\");"
        },
        {
            "position" : "3",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[3],
            "styleText" : "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"" + filesArr[3] + "\");"
        },
        {
            "position" : "4",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[4],
            "styleText" : "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[4] + "\");"
        }
      ], description };
    }

    proposalArr = [];
    for (let i = 0; i < 5; i++) {
      proposalArr.push(objectDeepCopy(dummy()));
    }

    await back.updateDesigner([ { desid }, { "setting.proposal": proposalArr } ]);
    await back.updateDesigner([ { desid }, { "setting.front.methods": [ "mth0", "mth7" ] } ]);
    await back.updateDesigner([ { desid }, { "setting.front.photo": { porlid: pid, index: "t" + String(garoPhoto[0].index) } } ]);

    await sleep(500);

    await requestSystem("https://" + address.testinfo.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

PortfolioFilter.prototype.chmodReload = async function () {
  const instance = this;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo } = this.mother;
  try {
    await shellExec("chmod", [ "-R", "777", process.env.HOME + "/samba/corePortfolio" ]);
    await shellExec("chmod", [ "-R", "777", process.env.HOME + "/samba/list_image" ]);
  } catch (e) {
    console.log(e);
  }
}

module.exports = PortfolioFilter;
