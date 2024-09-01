/**
 * Distance 클래스는 두 지점 간의 거리와 시간을 나타내는 객체를 생성합니다.
 * 이 클래스는 거리(meters)와 시간(seconds)을 저장하며, 
 * 이를 편리하게 사용할 수 있도록 다양한 getter 메서드를 제공합니다.
 */
class Distance {
  /**
   * Distance 클래스의 생성자 함수입니다.
   * @param {number} m - 거리(meters)를 나타내는 숫자입니다.
   * @param {number} s - 시간(seconds)을 나타내는 숫자입니다.
   * @param {*} from - 출발 지점의 정보입니다.
   * @param {*} to - 도착 지점의 정보입니다.
   * @throws {Error} 입력 값이 유효하지 않을 경우 오류를 발생시킵니다.
   */
  constructor(m, s, from, to) {
    // 입력된 m, s가 숫자인지, from과 to가 정의되었는지 확인합니다.
    if (typeof m !== "number" || typeof s !== "number" || from === undefined || to === undefined) {
      throw new Error("invaild input"); // 유효하지 않은 입력이 있을 경우 오류를 던집니다.
    }
    this.meters = m;  // meters 속성에 입력된 거리 값을 할당합니다.
    this.seconds = s; // seconds 속성에 입력된 시간 값을 할당합니다.
    this.from = from; // from 속성에 출발 지점의 정보를 할당합니다.
    this.to = to;     // to 속성에 도착 지점의 정보를 할당합니다.
  }

  /**
   * 객체의 데이터를 일반적인 객체 형식으로 변환하여 반환합니다.
   * @returns {Object} 거리, 시간, 출발 지점, 도착 지점 정보를 포함한 객체를 반환합니다.
   */
  toNormal() {
    let obj = {};          // 반환할 객체를 생성합니다.
    obj.meters = this.meters; // meters 속성을 obj 객체에 할당합니다.
    obj.seconds = this.seconds; // seconds 속성을 obj 객체에 할당합니다.
    obj.from = this.from;    // from 속성을 obj 객체에 할당합니다.
    obj.to = this.to;        // to 속성을 obj 객체에 할당합니다.
    return obj;            // 객체를 반환합니다.
  }

  /**
   * 거리(meters)를 반환하는 getter 메서드입니다.
   * @returns {number} meters 값을 반환합니다.
   */
  get m() {
    return this.meters; // meters 속성의 값을 반환합니다.
  }

  /**
   * 시간(seconds)을 반환하는 getter 메서드입니다.
   * @returns {number} seconds 값을 반환합니다.
   */
  get s() {
    return this.seconds; // seconds 속성의 값을 반환합니다.
  }

  /**
   * 거리(meters)를 반환하는 getter 메서드입니다.
   * @returns {number} meters 값을 반환합니다.
   */
  get meter() {
    return this.meters; // meters 속성의 값을 반환합니다.
  }

  /**
   * 거리(meters)를 반환하는 getter 메서드입니다.
   * @returns {number} meters 값을 반환합니다.
   */
  get metre() {
    return this.meters; // meters 속성의 값을 반환합니다.
  }

  /**
   * 시간(seconds)을 반환하는 getter 메서드입니다.
   * @returns {number} seconds 값을 반환합니다.
   */
  get second() {
    return this.seconds; // seconds 속성의 값을 반환합니다.
  }
}

/**
 * AddressParser 클래스는 주소 데이터를 처리하고 변환하는 다양한 기능을 제공합니다.
 * 이 클래스는 주소 정보를 관리하고, 외부 API와 상호작용하여 좌표 변환, 주소 검색 등을 수행할 수 있습니다.
 */
const AddressParser = function () {
  // Mother 클래스의 인스턴스를 생성하여 this.mother에 저장합니다.
  const Mother = require(process.cwd() + "/apps/mother.js"); 
  // BackMaker 클래스의 인스턴스를 생성하여 this.back에 저장합니다.
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  // ADDRESS 객체를 가져와 this.address에 저장합니다.
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js"); 

  this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 this.mother에 할당합니다.
  this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 this.back에 할당합니다.
  this.address = ADDRESS; // ADDRESS 객체를 this.address에 할당합니다.

  // 현재 작업 디렉토리 경로를 기반으로 AddressParser 관련 파일 디렉토리를 설정합니다.
  this.dir = process.cwd() + "/apps/addressParser"; 
  this.jsonDir = this.dir + "/json"; // JSON 파일을 저장하는 디렉토리 경로를 설정합니다.
  this.sampleDir = this.jsonDir + "/samples"; // 샘플 JSON 파일이 위치한 디렉토리 경로를 설정합니다.

  // 샘플 주소 파일의 경로를 설정합니다.
  this.samples = {
    client: this.sampleDir + "/clientAddress.json", // 클라이언트 주소 샘플 파일 경로
    designer: this.sampleDir + "/clientAddress.json", // 디자이너 주소 샘플 파일 경로 (클라이언트와 동일한 파일 경로를 사용)
    travel: this.sampleDir + "/travelExpensesSamples.json", // 출장비 샘플 파일 경로
    travelMin: this.sampleDir + "/travelExpensesSamples_min.json", // 출장비 최소 샘플 파일 경로
  };

  // 서비스 폴더 이름을 설정합니다.
  this.serveFolderName = "immovablesServerStaticFolder"; 
  // 주소 코드 파일 경로를 설정합니다.
  this.addressCode = this.dir + "/code/code.txt"; 
  // 가격 표준 키를 설정합니다.
  this.priceStandardKey = 33; 
  // 가격 컬렉션 이름을 설정합니다.
  this.priceCollection = "designerPrice"; 

  // 외부 API 사용을 위한 토큰 및 URL 정보를 설정합니다.
  this.token = {
    vworld: {
      url: "http://api.vworld.kr/req/search", // Vworld API URL
      key: "034D39D9-E04A-32CE-B860-70C780965F05" // Vworld API 키
    },
    tMap: {
      poi: "https://apis.openapi.sk.com/tmap/pois", // Tmap POI API URL
      url: "https://apis.openapi.sk.com/tmap/routes?version=1", // Tmap 경로 API URL
      key: "l7xxa22f35e01b7d4814a4eb247b28a84c3a" // Tmap API 키
    },
    jusoRoad: {
      url: "https://www.juso.go.kr/addrlink/addrLinkApi.do", // 도로명 주소 API URL
      key: "U01TX0FVVEgyMDIxMDYyMTEzMjkxMjExMTMwNDk=", // 도로명 주소 API 키
    },
    jusoLocation: {
      url: "https://www.juso.go.kr/addrlink/addrCoordApi.do", // 주소 좌표 API URL
      key: "U01TX0FVVEgyMDIxMDYyMTEzNDE1MzExMTMwNTI=", // 주소 좌표 API 키
    },
    openApi: {
      url: "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc", // 공공 데이터 API URL
      key: "qYxqA/rabM2euF/V0hfK7RoH5z9vLUyj5GEsjM4U3NhiVrgIBDMKE5jfdpjeTZ176nISXMeaRl2TxefP5MrpsQ==", // 공공 데이터 API 키
    }
  };
}

/**
 * 좌표 변환을 수행하는 메서드입니다.
 * 주어진 좌표 (x, y)를 GRS80 또는 WGS84 좌표계 간에 변환합니다.
 * @param {number} x - 변환할 x 좌표입니다.
 * @param {number} y - 변환할 y 좌표입니다.
 * @param {boolean} reverse - true이면 WGS84 -> GRS80, false이면 GRS80 -> WGS84 변환을 수행합니다.
 * @returns {Object} 변환된 좌표를 반환합니다.
 * @throws {Error} 입력된 좌표가 숫자가 아닐 경우 오류를 발생시킵니다.
 */
AddressParser.prototype.convertXY = function (x, y, reverse = false) {
  // x와 y가 숫자인지 확인합니다. 그렇지 않으면 오류를 발생시킵니다.
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("invaild input"); // 유효하지 않은 입력일 경우 오류를 던집니다.
  }

  const instance = this; // 현재 인스턴스를 저장합니다.
  const proj4 = require(`${this.dir}/module/proj4.js`); // 좌표 변환을 위해 proj4 모듈을 가져옵니다.
  let grs80, wgs84, p; // GRS80과 WGS84 좌표계 및 좌표를 저장할 변수를 선언합니다.

  // EPSG:5179 (GRS80) 좌표계를 정의합니다.
  proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
  // GRS80 좌표계 객체를 생성합니다.
  grs80 = proj4.Proj(proj4.defs["EPSG:5179"]);
  // WGS84 좌표계 객체를 생성합니다.
  wgs84 = proj4.Proj(proj4.defs["EPSG:4326"]);

  // x와 y 좌표를 proj4 포인트 객체로 변환합니다.
  p = proj4.toPoint([ x, y ]);

  // reverse가 false이면 GRS80에서 WGS84로 변환하고, true이면 WGS84에서 GRS80으로 변환합니다.
  if (!reverse) {
    return proj4.transform(grs80, wgs84, p); // GRS80 -> WGS84로 좌표를 변환하여 반환합니다.
  } else {
    return proj4.transform(wgs84, grs80, p); // WGS84 -> GRS80으로 좌표를 변환하여 반환합니다.
  }
}

/**
 * Tmap POI 검색을 수행하는 메서드입니다.
 * 주어진 검색어를 사용하여 Tmap의 POI 검색 API를 호출하고, 검색 결과에서 유효한 주소 정보를 추출합니다.
 * 필요한 경우 검색어를 변형하여 재시도합니다.
 * 
 * @param {string} searchKeyword - 검색할 키워드입니다.
 * @param {boolean} child - 재귀 호출 여부를 나타내는 플래그입니다. 기본값은 false입니다.
 * @returns {Promise<string|null>} 검색된 주소 문자열을 반환하며, 검색 실패 시 null을 반환합니다.
 */
AddressParser.prototype.getTmapPoiSearch = async function (searchKeyword, child = false) {
  // 현재 인스턴스를 this를 통해 참조합니다.
  const instance = this;
  // Tmap POI 검색 URL과 API 키를 객체 디스트럭처링을 통해 추출합니다.
  const { poi: url, key: appKey } = this.token.tMap;
  // Mother 객체의 메서드를 가져옵니다.
  const { requestSystem, objectDeepCopy, emergencyAlarm, sleep } = this.mother;
  try {
    // 검색 요청의 대기 시간을 설정합니다.
    const delta = 100;
    // API 요청에 필요한 파라미터들을 설정합니다.
    const version = 1;
    const format = "json";
    const callback = "result";
    const resCoordType = "EPSG3857";
    const reqCoordType = "WGS84GEO";
    const count = 10;
    const method = "get";
    
    // Tmap POI 검색 API를 호출하여 응답을 받아옵니다.
    const res = await requestSystem(url, { version, format, callback, searchKeyword, resCoordType, reqCoordType, count, appKey }, { method, headers: { appKey } });
    
    let result; // 결과를 저장할 변수를 선언합니다.
    let target; // 목표 POI 데이터를 저장할 변수를 선언합니다.
    let tempArr; // 검색어를 변형하기 위한 임시 배열을 선언합니다.

    result = null; // 초기 결과값을 null로 설정합니다.
    
    // 응답 데이터가 객체이며 null이 아닌지 확인합니다.
    if (typeof res.data === "object" && res.data !== null) {
      // 응답 데이터 내에 searchPoiInfo 객체가 있는지 확인합니다.
      if (typeof res.data.searchPoiInfo === "object" && res.data.searchPoiInfo !== null) {
        // POI 정보가 배열로 제공되는지 확인하고, 첫 번째 POI 정보를 추출합니다.
        if (Array.isArray(res.data.searchPoiInfo.pois) && res.data.searchPoiInfo.pois.length > 0) {
          [ target ] = res.data.searchPoiInfo.pois;
        // POI 정보가 객체로 제공되는 경우 deep copy 후 첫 번째 POI 정보를 추출합니다.
        } else if (typeof res.data.searchPoiInfo.pois === "object" && res.data.searchPoiInfo.pois !== null) {
          [ target ] = objectDeepCopy(res.data.searchPoiInfo.pois).poi;
        } else {
          target = null; // 유효한 POI 정보가 없는 경우 null로 설정합니다.
        }

        // 유효한 POI 정보가 있을 경우 주소 문자열을 구성합니다.
        if (target !== null) {
          if (typeof target.roadName === "string" && target.roadName !== "") {
            result = "";
            result += target.upperAddrName; // 상위 주소명을 추가합니다.
            result += " ";
            result += target.middleAddrName; // 중간 주소명을 추가합니다.
            result += " ";
            result += target.roadName; // 도로명을 추가합니다.
            result += " ";
            result += target.firstBuildNo; // 첫 번째 건물 번호를 추가합니다.
            if (target.secondBuildNo !== "" && target.secondBuildNo !== "0" && target.secondBuildNo !== 0) {
              result += "-";
              result += target.secondBuildNo; // 두 번째 건물 번호가 존재하면 추가합니다.
            }
            result = result.trim(); // 최종 주소 문자열을 정리합니다.
          } else {
            result = "";
            result += target.upperAddrName; // 상위 주소명을 추가합니다.
            result += " ";
            result += target.middleAddrName; // 중간 주소명을 추가합니다.
            result += " ";
            result += target.lowerAddrName; // 하위 주소명을 추가합니다.
            result += " ";
            result += target.firstNo; // 첫 번째 번호를 추가합니다.
            if (target.secondNo !== "" && target.secondNo !== "0" && target.secondNo !== 0) {
              result += "-";
              result += target.secondNo; // 두 번째 번호가 존재하면 추가합니다.
            }
          }
          
          // 결과가 유효하고 POI 이름과 주소가 다른 경우 POI 이름을 추가합니다.
          if (result !== null) {
            if (target.name.slice(0, 2) !== result.slice(0, 2)) {
              result += " " + target.name;
            }
          }
        }
      }
    }

    // 자식 호출이 아닌 경우 (첫 호출인 경우) 추가적인 검색 시도 로직을 실행합니다.
    if (!child) {
      // 초기 검색 결과가 없을 경우 검색어를 변형하여 재시도합니다.
      if (result === null) {
        await sleep(delta); // delta만큼 대기합니다.
        searchKeyword = searchKeyword.replace(/\([^\)]*\)/gi, ''); // 괄호로 둘러싸인 부분을 제거합니다.
        result = await instance.getTmapPoiSearch(searchKeyword, true); // 재귀적으로 검색을 재시도합니다.
        
        if (result === null) {
          await sleep(delta); // delta만큼 대기합니다.
          // 특정 패턴을 필터링하여 검색어를 변형합니다.
          tempArr = searchKeyword.split(" ").map((s) => { return s.trim() }).filter((s) => { return !/[도리]$/gi.test(s); });
          tempArr = tempArr.filter((s) => { return !/거주(중)?/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/입주(할|예정)?/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/예정/gi.test(s) });
          tempArr = tempArr.filter((s) => { return !/아파트/gi.test(s) });
          searchKeyword = tempArr.join(" "); // 변형된 검색어를 다시 합칩니다.
          result = await instance.getTmapPoiSearch(searchKeyword, true); // 재귀적으로 검색을 재시도합니다.
          
          if (result === null) {
            await sleep(delta); // delta만큼 대기합니다.
            // 다시 필터링하여 검색어를 재변형합니다.
            tempArr = searchKeyword.split(" ").map((s) => { return s.trim() }).filter((s) => { return !/[도시구동리]$/gi.test(s); });
            searchKeyword = tempArr.join(" "); // 변형된 검색어를 다시 합칩니다.
            result = await instance.getTmapPoiSearch(searchKeyword, true); // 재귀적으로 검색을 재시도합니다.
          }
        }
      }
    }

    return result; // 최종 검색 결과를 반환합니다.

  } catch (e) {
    console.log(e); // 오류를 콘솔에 출력합니다.
    emergencyAlarm("getTmapPoiSearch error : " + e.message).catch((err) => { console.log(err) }); // 오류 발생 시 긴급 알람을 보냅니다.
    return null; // 오류 발생 시 null을 반환합니다.
  }
}

/**
 * 주어진 주소를 기반으로 다양한 API를 활용하여 주소 정보를 검색하고,
 * 이를 좌표 및 상세 주소 정보로 변환하는 메서드입니다.
 *
 * @param {string} address - 검색할 주소 문자열입니다.
 * @param {boolean} [pointMode=false] - 결과를 좌표 값으로 반환할지 여부를 결정하는 플래그입니다. 기본값은 false입니다.
 * @returns {Promise<Object|string|null>} 주소 정보 객체나 좌표 문자열을 반환하며, 실패 시 null을 반환합니다.
 * @throws {Error} 주소가 문자열이 아닌 경우 예외를 발생시킵니다.
 */
AddressParser.prototype.getAddress = async function (address, pointMode = false) {
  // 입력된 주소가 문자열인지 확인합니다. 그렇지 않으면 오류를 발생시킵니다.
  if (typeof address !== "string") {
    throw new Error("invaild input, address must be string");
  }

  // 현재 인스턴스를 this를 통해 참조합니다.
  const instance = this;
  // Mother 클래스에서 requestSystem 메서드를 가져옵니다.
  const { requestSystem } = this.mother;
  // Vworld API와 Juso API의 URL 및 API 키를 객체 디스트럭처링을 통해 추출합니다.
  const { url: vworldUrl, key: vworldKey } = this.token.vworld;
  const { url: roadUrl, key: roadKey } = this.token.jusoRoad;
  const { url: locationUrl, key: locationKey } = this.token.jusoLocation;
  
  try {
    // 여러 단계의 검색 및 결과를 저장할 변수를 선언합니다.
    let data, res, res2, result;
    let tempArr, roadBoo;
    let index;
    let firstBoo;
    let tempResult, convertResult;
    let tempValue0, tempValue1;
    let indexStop;
    let fixedAddress;

    // 주소의 특정 패턴을 교정하여 표준화된 주소 형식으로 변환합니다.
    if (/[가-힣]+로[0-9]+ /gi.test(address)) {
      [ , tempValue0, tempValue1 ] = [ .../([가-힣]+로)([0-9]+) /g.exec(address) ];
      address = address.replace(/[가-힣]+로[0-9]+ /g, tempValue0 + " " + tempValue1 + " ");
    }

    if (/[가-힣]+로 [0-9]+길/gi.test(address)) {
      [ , tempValue0, tempValue1 ] = [ .../([가-힣]+로) ([0-9]+길)/g.exec(address) ];
      address = address.replace(/[가-힣]+로 [0-9]+길/g, tempValue0 + tempValue1);
    }

    // 주소를 공백으로 나누어 배열로 변환하고, 도로명 주소인지 여부를 판단합니다.
    tempArr = address.split(' ');
    roadBoo = true;
    indexStop = false;
    
    // 주소의 각 요소를 순회하며, 도로명이나 지번 주소 여부를 판단하고 인덱스를 기록합니다.
    for (let i = 0; i < tempArr.length; i++) {
      if (/[동가리]$/i.test(tempArr[i].trim())) {
        roadBoo = false;
        index = i;
        indexStop = true;
        break;
      }
      if (/[로길]$/i.test(tempArr[i].trim())) {
        roadBoo = true;
        index = i;
        indexStop = true;
        break;
      }
    }

    // 인덱스가 결정되지 않은 경우, 마지막 요소의 인덱스를 설정합니다.
    if (!indexStop) {
      index = tempArr.length - 1;
    }

    // 주소 배열을 필요한 부분까지만 자르고, 공백을 제거한 뒤 다시 주소 문자열로 합칩니다.
    if (tempArr[index + 1] !== undefined) {
      tempArr = tempArr.slice(0, index + 1 + 1);
    } else {
      tempArr = tempArr.slice(0, index + 1);
    }
    tempArr = tempArr.map((i) => { return i.trim(); });
    address = tempArr.join(" ");

    // 첫 번째 시도: Tmap POI 검색을 이용하여 주소를 검색합니다.
    fixedAddress = await instance.getTmapPoiSearch(address);
    if (fixedAddress !== null) {
      address = fixedAddress; // Tmap 검색 결과가 유효하면 주소를 업데이트합니다.
    } else {
      fixedAddress = null; // 유효하지 않으면 null로 설정합니다.
    }

    // 두 번째 시도: Juso 도로명 주소 검색을 시도합니다.
    firstBoo = false;
    result = null;

    res = await requestSystem(roadUrl, {
      confmKey: roadKey,
      currentPage: 1,
      countPerPage: 50,
      keyword: address,
      resultType: "json",
      hstryYn: "Y",
    }, { method: "get" });

    // Juso API의 응답을 분석하여 유효한 주소 정보를 추출합니다.
    if (res.data !== undefined) {
      if (res.data.results !== undefined) {
        if (res.data.results.common !== undefined) {
          if (res.data.results.common.errorMessage === "정상") {
            if (Array.isArray(res.data.results.juso)) {
              if (res.data.results.juso.length > 0) {
                // 주소 정보가 유효할 경우, 상세 주소 정보를 구성합니다.
                tempResult = {
                  address: {
                    zipcode: res.data.results.juso[0].zipNo,
                    road: String(res.data.results.juso[0].roadAddr + " " + (res.data.results.juso[0].bdNm !== '' ? res.data.results.juso[0].bdNm : "")).trim(),
                    parcel: res.data.results.juso[0].jibunAddr,
                    english: res.data.results.juso[0].engAddr,
                  },
                  info: {
                    rn: res.data.results.juso[0].rn,
                    emdNm: res.data.results.juso[0].emdNm,
                    emdNo: res.data.results.juso[0].emdNo,
                    sggNm: res.data.results.juso[0].sggNm,
                    siNm: res.data.results.juso[0].siNm,
                    bdNm: res.data.results.juso[0].bdNm,
                    admCd: res.data.results.juso[0].admCd,
                    udrtYn: res.data.results.juso[0].udrtYn,
                    lnbrMnnm: res.data.results.juso[0].lnbrMnnm,
                    lnbrSlno: res.data.results.juso[0].lnbrSlno,
                    buldMnnm: res.data.results.juso[0].buldMnnm,
                    bdKdcd: res.data.results.juso[0].bdKdcd,
                    liNm: res.data.results.juso[0].liNm,
                    rnMgtSn: res.data.results.juso[0].rnMgtSn,
                    mtYn: res.data.results.juso[0].mtYn,
                    bdMgtSn: res.data.results.juso[0].bdMgtSn,
                    buldSlno: res.data.results.juso[0].buldSlno,
                  },
                  point: {},
                  queryResult: JSON.parse(JSON.stringify(res.data.results.juso)),
                };

                // 좌표 변환을 위해 추가 API 요청을 수행합니다.
                res2 = await requestSystem(locationUrl, {
                  confmKey: locationKey,
                  admCd: tempResult.info.admCd,
                  rnMgtSn: tempResult.info.rnMgtSn,
                  udrtYn: tempResult.info.udrtYn,
                  buldMnnm: Number(tempResult.info.buldMnnm),
                  buldSlno: Number(tempResult.info.buldSlno),
                  resultType: "json",
                }, { method: "get" });

                // 좌표 변환이 성공하면 결과에 추가합니다.
                if (res2.data !== undefined) {
                  if (res2.data.results !== undefined) {
                    if (res2.data.results.common !== undefined) {
                      if (res2.data.results.common.errorMessage === "정상") {
                        if (Array.isArray(res2.data.results.juso)) {
                          if (res2.data.results.juso.length > 0) {
                            convertResult = this.convertXY(Number(res2.data.results.juso[0].entX), Number(res2.data.results.juso[0].entY));
                            tempResult.point.x = convertResult.x;
                            tempResult.point.y = convertResult.y;
                            tempResult.point.h = Number(res2.data.results.juso[0].entX);
                            tempResult.point.v = Number(res2.data.results.juso[0].entY);
                            tempResult.point.value = String(convertResult.y) + "," + String(convertResult.x);
                            firstBoo = true;
                            result = tempResult;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // 세 번째 시도: Vworld API를 통해 주소를 검색합니다.
    if (!firstBoo) {
      data = {
        request: "search",
        key: vworldKey,
        type: "address",
        query: address,
        format: "json",
        errorformat: "json",
        category: (roadBoo ? "road" : "parcel")
      };

      result = null;
      try {
        res = await requestSystem(vworldUrl, data, { method: "get" });

        // Vworld API 응답을 분석하여 유효한 주소 정보를 추출합니다.
        if (res.data.response.status === "OK") {
          if (res.data.response.result !== undefined) {
            if (Array.isArray(res.data.response.result.items)) {
              if (res.data.response.result.items.length > 0) {
                result = res.data.response.result.items[0];
                result.queryResult = JSON.parse(JSON.stringify(res.data.response.result.items));
                result.point.value = result.point.y + "," + result.point.x;
                convertResult = this.convertXY(Number(result.point.x), Number(result.point.y));
                result.point.x = Number(result.point.x);
                result.point.y = Number(result.point.y);
                result.point.h = convertResult.x;
                result.point.v = convertResult.y;
                result.info = {};
                result.info.bldnm = result.address.bldnm;
                result.info.bldnmdc = result.address.bldnmdc;
                result.address.road = String(result.address.road + " " + (result.address.bldnm !== '' ? result.address.bldnm : "")).trim();
                delete result.id;
                delete result.address.category;
                delete result.address.bldnm;
                delete result.address.bldnmdc;
              }
            }
          }
        }
      } catch (e) {
        result = null; // 오류 발생 시 결과를 null로 설정합니다.
      }
    }

    // 최종 검색 결과가 없고 고정 주소(fixedAddress)도 없으면 null을 반환합니다.
    if (result === null && fixedAddress === null) {
      return null;
    } else if (result === null && !pointMode && typeof fixedAddress === "string") {
      // 고정 주소가 있으면 그것을 반환합니다.
      if (fixedAddress.trim() === "") {
        return null;
      } else {
        return {
          address: {
            road: fixedAddress
          }
        }
      }
    }

    // pointMode가 true인 경우 좌표 값만 반환합니다.
    if (result !== null && pointMode) {
      result = result.point.value;
    }
    return result; // 최종 결과를 반환합니다.
  } catch (e) {
    console.log(e); // 오류가 발생한 경우 콘솔에 출력합니다.
  }
}

/**
 * AddressParser 클래스의 getDistance 메서드는 두 지점 간의 거리를 계산하여 Distance 객체로 반환하는 비동기 함수입니다.
 * 이 메서드는 주어진 주소 또는 좌표로부터 출발지와 도착지를 설정하고, 외부 API를 호출하여 거리와 시간을 계산합니다.
 * 또한, 계산된 거리 데이터를 데이터베이스에 기록하고 캐싱된 결과를 재사용할 수 있도록 합니다.
 * @param {string|Object} from - 출발 지점의 주소 문자열 또는 좌표 객체입니다.
 * @param {string|Object} to - 도착 지점의 주소 문자열 또는 좌표 객체입니다.
 * @param {Object} [option={ selfMongo: null }] - MongoDB 연결 옵션 객체로, selfMongo 속성을 통해 외부에서 관리하는 MongoDB 연결을 사용할 수 있습니다.
 * @returns {Promise<Distance|null>} 두 지점 간의 거리를 나타내는 Distance 객체를 반환하거나, 오류 발생 시 null을 반환합니다.
 */
AddressParser.prototype.getDistance = async function (from, to, option = { selfMongo: null }) {

  // from 또는 to 파라미터가 정의되지 않은 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
  if (from === undefined || to === undefined) {
    throw new Error("invaild input => String: from address, String: to address");
  }

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // BackMaker 클래스의 인스턴스를 back 변수에 할당합니다. 이를 통해 back 객체의 메서드에 접근할 수 있습니다.
  const back = this.back;

  // Mother 클래스의 메서드와 속성을 비구조화 할당으로 추출합니다.
  // requestSystem: 외부 API 요청을 처리하는 함수입니다.
  // stringToDate: 문자열을 날짜 객체로 변환하는 함수입니다.
  // mongo: MongoDB 클라이언트 객체입니다.
  // mongoconsoleinfo: MongoDB 연결 문자열입니다.
  const { requestSystem, stringToDate, mongo, mongoconsoleinfo } = this.mother;

  // TMap API의 URL과 키를 비구조화 할당으로 추출합니다.
  const { url, key } = this.token.tMap;

  try {
    // 변수들을 선언합니다.
    let origin, destination, res, result;
    let meters, seconds;
    let data;
    let distanceLogCollection;
    let distanceRows;
    let addressLogCollection;
    let addressRows;
    let MONGOC;

    // option 객체의 selfMongo 속성이 null 또는 undefined인 경우, 새로운 MongoDB 연결을 생성합니다.
    if (option.selfMongo === null || option.selfMongo === undefined) {
      MONGOC = new mongo(mongoconsoleinfo);
      await MONGOC.connect(); // MongoDB에 연결을 시도합니다.
    } else {
      MONGOC = option.selfMongo; // 외부에서 제공된 MongoDB 연결을 사용합니다.
    }

    // distanceLogCollection과 addressLogCollection의 컬렉션 이름을 설정합니다.
    distanceLogCollection = "distanceLog";
    addressLogCollection = "addressLog";

    // from이 문자열인 경우, 해당 주소가 데이터베이스에 기록된 적이 있는지 확인합니다.
    if (typeof from === "string") {
      // addressLogCollection에서 입력된 주소에 해당하는 데이터를 검색합니다.
      addressRows = await back.mongoRead(addressLogCollection, { input: from }, { selfMongo: MONGOC });
      if (addressRows.length !== 0) {
        origin = addressRows[0].address; // 주소가 기록되어 있다면 해당 주소를 origin 변수에 할당합니다.
      } else {
        origin = await this.getAddress(from); // 기록이 없는 경우, getAddress 메서드를 통해 주소를 변환합니다.
        await back.mongoCreate(addressLogCollection, { input: from, address: origin }, { selfMongo: MONGOC }); // 새롭게 얻은 주소를 데이터베이스에 저장합니다.
      }
      if (origin === null) {
        return null; // origin이 null인 경우, 함수는 null을 반환합니다.
      }
    } else if (typeof from === "object") {
      // from이 객체인 경우, 해당 객체가 올바른 포맷인지 확인합니다.
      if (typeof from.point !== "object") {
        throw new Error("invaild from");
        return null;
      } else {
        if (typeof from.point.value !== "string") {
          throw new Error("invaild from");
          return null;
        } else {
          // from 객체의 좌표 값이 유효한 형식인지 검사합니다.
          if (/^[0-9]/.test(from.point.value) && /[0-9]$/.test(from.point.value) && /,/g.test(from.point.value)) {
            origin = from; // 좌표 형식이 유효하다면 origin에 할당합니다.
          } else {
            throw new Error("invaild from");
            return null;
          }
        }
      }
    } else {
      throw new Error("invaild from");
      return null;
    }

    // to에 대해서도 from과 동일한 검사를 수행합니다.
    if (typeof to === "string") {
      addressRows = await back.mongoRead(addressLogCollection, { input: to }, { selfMongo: MONGOC });
      if (addressRows.length !== 0) {
        destination = addressRows[0].address;
      } else {
        destination = await this.getAddress(to);
        await back.mongoCreate(addressLogCollection, { input: to, address: destination }, { selfMongo: MONGOC });
      }
      if (destination === null) {
        return null;
      }
    } else if (typeof to === "object") {
      if (typeof to.point !== "object") {
        throw new Error("invaild to");
        return null;
      } else {
        if (typeof to.point.value !== "string") {
          throw new Error("invaild to");
          return null;
        } else {
          if (/^[0-9]/.test(to.point.value) && /[0-9]$/.test(to.point.value) && /,/g.test(to.point.value)) {
            destination = to;
          } else {
            throw new Error("invaild to");
            return null;
          }
        }
      }
    } else {
      throw new Error("invaild to");
      return null;
    }

    result = null;

    // origin 또는 destination이 null인 경우, null을 반환합니다.
    if (origin === null || destination === null) {
      return result;
    }

    // 데이터베이스에서 저장된 거리 데이터를 검색합니다.
    distanceRows = await back.mongoRead(distanceLogCollection, { $and: [ { "input.origin": origin.point.value }, { "input.destination": destination.point.value } ] }, { selfMongo: MONGOC });
    if (distanceRows.length !== 0) {
      // 기록된 데이터가 있다면, 그 데이터를 바탕으로 Distance 객체를 생성합니다.
      result = new Distance(distanceRows[0].distance.meters, distanceRows[0].distance.seconds, origin, destination);
    } else {
      // 기록된 데이터가 없다면, 외부 API를 호출하여 거리를 계산합니다.
      data = {
        startX: origin.point.x,
        startY: origin.point.y,
        endX: destination.point.x,
        endY: destination.point.y,
        totalValue: 2,
        reqCoordType: "WGS84GEO",
        speed: 60,
      };

      // TMap API를 호출하여 경로 데이터를 가져옵니다.
      res = await requestSystem(url, data, { headers: { "appKey": key, "Content-type": "application/json" } });

      // API 응답 데이터가 유효한지 확인합니다.
      if (res.data === undefined) {
        return result;
      }
      if (!Array.isArray(res.data.features)) {
        return result;
      }
      if (res.data.features.length === 0) {
        return result;
      }
      if (res.data.features[0].properties === undefined) {
        return result;
      }
      if (res.data.features[0].properties.totalDistance === undefined) {
        return result;
      }
      if (res.data.features[0].properties.totalTime === undefined) {
        return result;
      }

      // 응답 데이터에서 거리를 추출합니다.
      meters = res.data.features[0].properties.totalDistance;
      seconds = res.data.features[0].properties.totalTime;

      // Distance 객체를 생성하고 결과를 데이터베이스에 기록합니다.
      result = new Distance(meters, seconds, origin, destination);
      await back.mongoCreate(distanceLogCollection, { input: { origin: origin.point.value, destination: destination.point.value }, distance: result.toNormal() }, { selfMongo: MONGOC });
    }

    // 자체 MongoDB 연결을 생성했을 경우, 연결을 종료합니다.
    if (option.selfMongo === null || option.selfMongo === undefined) {
      await MONGOC.close();
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * AddressParser 클래스의 chainDistance 메서드는 여러 지점 간의 거리를 계산하여 Distance 객체의 배열로 반환하는 비동기 함수입니다.
 * 이 메서드는 주어진 주소 또는 좌표 쌍을 통해 각각의 거리를 계산하고, 그 결과를 배열 형태로 반환합니다.
 * @param {string|Array} from - 출발 지점의 주소 문자열 또는 좌표 쌍의 배열입니다.
 * @param {string} [to] - 도착 지점의 주소 문자열입니다. from이 배열인 경우, to는 생략됩니다.
 * @returns {Promise<Distance|Array<Distance>|null>} 거리 정보를 담고 있는 Distance 객체 또는 Distance 객체의 배열을 반환하거나, 오류 발생 시 null을 반환합니다.
 */
AddressParser.prototype.chainDistance = async function (from, to) {

  // from 파라미터가 문자열이 아니고 배열도 아닌 경우, 유효하지 않은 입력으로 간주하여 오류를 발생시킵니다.
  if (typeof from !== "string" && !Array.isArray(from)) {
    throw new Error("invaild input");
  }

  // from이 문자열인 경우, to도 문자열인지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
  if (typeof from === "string") {
    if (typeof to !== "string") {
      throw new Error("invaild input");
    }
  } else {
    // from이 배열인 경우, 배열의 모든 요소가 배열인지 확인합니다. 그렇지 않으면 오류를 발생시킵니다.
    if (!from.every((f) => { return Array.isArray(f); })) {
      throw new Error("invaild input");
    }
    // from 배열의 모든 요소가 길이 2인지 확인합니다. 그렇지 않으면 오류를 발생시킵니다.
    if (!from.every((f) => { return f.length === 2 })) {
      throw new Error("invaild input");
    }
  }

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // 객체를 URL 인코딩 문자열로 변환하는 함수 encodeUrl을 선언합니다.
  const encodeUrl = (obj) => {
    let str;
    str = ''; // 결과 문자열을 초기화합니다.
    for (let i in obj) {
      str += i; // 객체의 키를 결과 문자열에 추가합니다.
      str += '=';
      str += global.encodeURI(obj[i]); // 객체의 값을 URL 인코딩하여 추가합니다.
      str += '&';
    }
    if (str.length > 0) {
      str = str.slice(0, -1); // 마지막 '&' 문자를 제거합니다.
    }
    return str; // 최종 인코딩된 문자열을 반환합니다.
  }

  // GoogleChrome 클래스를 가져와 인스턴스를 생성합니다.
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  const chrome = new GoogleChrome(); // GoogleChrome 인스턴스를 chrome 변수에 할당합니다.

  let url; // 요청할 URL을 저장할 변수입니다.
  let queries; // 요청할 쿼리 파라미터를 저장할 객체입니다.
  let res; // 요청 결과를 저장할 변수입니다.
  let map; // 여러 요청을 저장할 배열입니다.
  let tempObj; // 임시 객체를 저장할 변수입니다.
  let frontScript; // 프런트엔드에서 실행할 스크립트를 저장할 변수입니다.

  try {

    // 프런트엔드에서 거리와 시간을 추출하는 스크립트를 정의합니다.
    frontScript = async function () {
      const { sleep } = GeneralJs; // GeneralJs에서 sleep 함수를 가져옵니다.
      try {
        let distance, time;
        let meters, seconds;
        let tempArr;
        let targets;

        // 'span.distance' 요소를 찾고, 요소가 없을 경우 100ms 간격으로 재시도합니다.
        targets = document.querySelectorAll("span.distance");
        while (targets.length === 0) {
          await sleep(100);
          targets = document.querySelectorAll("span.distance");
        }
        // 'data-id'가 'distance'인 span 요소를 찾습니다.
        for (let dom of targets) {
          if (dom.getAttribute("data-id") === "distance") {
            distance = dom;
            break;
          }
        }

        // 'span.time' 요소를 찾고, 요소가 없을 경우 100ms 간격으로 재시도합니다.
        targets = document.querySelectorAll("span.time");
        while (targets.length === 0) {
          await sleep(100);
          targets = document.querySelectorAll("span.time");
        }
        // 'data-id'가 'time'인 span 요소를 찾습니다.
        for (let dom of targets) {
          if (dom.getAttribute("data-id") === "time") {
            time = dom;
            break;
          }
        }

        // 거리 값을 추출하고, km 단위일 경우 미터로 변환합니다.
        meters = Number(distance.querySelector(".num").textContent.trim()) * (distance.querySelector(".text").textContent.trim() === "km" ? 1000 : 1);

        // 시간 값을 추출하고, 시간과 분을 초로 변환하여 seconds 변수에 저장합니다.
        if (/시간/gi.test(time.textContent)) {
          if (/분/gi.test(time.textContent)) {
            tempArr = time.textContent.split("시간").map((str) => { return Number(str.replace(/[^0-9]/gi, '')) });
            seconds = (tempArr[0] * 60 * 60) + (tempArr[1] * 60);
          } else {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, '')) * 60 * 60;
          }
        } else {
          if (/분/gi.test(time.textContent)) {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, '')) * 60;
          } else {
            seconds = Number(time.textContent.replace(/[^0-9]/gi, ''));
          }
        }

        // meters와 seconds 값을 객체로 반환합니다.
        return { meters, seconds }
      } catch (e) {
        return e.message; // 오류 발생 시, 오류 메시지를 반환합니다.
      }
    }

    // from과 to가 모두 문자열인 경우
    if (typeof from === "string" && typeof to === "string") {

      // 쿼리 파라미터 객체를 생성합니다.
      queries = {
        map_type: "TYPE_MAP",
        target: "car",
        rt: ",,523953,1084098",
        rt1: from,
        rt2: to
      };
      url = "https://map.kakao.com/?" + encodeUrl(queries); // 쿼리 파라미터를 URL에 추가합니다.

      // Chrome 인스턴스를 사용해 프런트엔드 스크립트를 실행하고 결과를 가져옵니다.
      res = await chrome.frontScript(url, frontScript);

      // 결과에 from과 to를 추가합니다.
      res.from = from;
      res.to = to;
      return new Distance(res.meters, res.seconds, res.from, res.to); // Distance 객체를 생성하여 반환합니다.

    } else if (Array.isArray(from)) { // from이 배열인 경우

      // from 배열의 모든 요소가 길이 2의 배열인지 확인합니다. 그렇지 않으면 오류를 발생시킵니다.
      if (!from.every((f) => { return Array.isArray(f) && f.length === 2 })) {
        throw new Error("invaild input");
      }

      map = []; // 요청할 맵의 배열을 초기화합니다.
      for (let [ f, t ] of from) { // from 배열을 순회하며 각각의 출발지와 도착지 쌍을 처리합니다.
        tempObj = {};
        queries = {
          map_type: "TYPE_MAP",
          target: "car",
          rt: ",,523953,1084098",
          rt1: f,
          rt2: t
        };
        tempObj.link = "https://map.kakao.com/?" + encodeUrl(queries); // 각 쌍에 대해 URL을 생성합니다.
        tempObj.func = frontScript; // 각 쌍에 대해 실행할 스크립트를 설정합니다.
        map.push(tempObj); // 맵 배열에 추가합니다.
      }

      // Chrome 인스턴스를 사용해 맵의 각 요청을 순차적으로 처리합니다.
      res = await chrome.scriptChain(map, 100);
      res = res.map((obj, index) => {
        // 처리된 결과를 Distance 객체의 배열로 변환하여 반환합니다.
        return new Distance(obj.meters, obj.seconds, from[index][0], from[index][1]);
      });

      return res; // Distance 객체의 배열을 반환합니다.

    } else {
      throw new Error("invaild input"); // 유효하지 않은 입력일 경우 오류를 발생시킵니다.
    }

  } catch (e) {
    console.log(e); // 오류 발생 시, 콘솔에 출력합니다.
    return null; // null을 반환합니다.
  }
}

/**
 * AddressParser 클래스의 getTravelExpenses 메서드는 두 지점 간의 이동 비용을 계산하여 반환하는 비동기 함수입니다.
 * 이 메서드는 거리와 시간에 따라 이동 비용을 산정하고, 그 결과를 객체 형태로 반환합니다.
 * @param {string} from - 출발 지점의 주소 문자열입니다.
 * @param {string} to - 도착 지점의 주소 문자열입니다.
 * @param {Object} [option={ selfMongo: null }] - MongoDB 연결 옵션 객체로, selfMongo 속성을 통해 외부에서 관리하는 MongoDB 연결을 사용할 수 있습니다.
 * @returns {Promise<Object|null>} 계산된 이동 비용 정보를 담고 있는 객체를 반환하거나, 오류 발생 시 null을 반환합니다.
 */
AddressParser.prototype.getTravelExpenses = async function (from, to, option = { selfMongo: null }) {

  // from 또는 to 파라미터가 정의되지 않은 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
  if (from === undefined || to === undefined) {
    throw new Error("invaild input => String: from address, String: to address");
  }

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // priceStandardKey와 priceCollection을 this 객체에서 가져옵니다.
  const { priceStandardKey, priceCollection } = this;

  // BackMaker 클래스의 인스턴스를 back 변수에 할당합니다. 이를 통해 back 객체의 메서드에 접근할 수 있습니다.
  const back = this.back;

  // Mother 클래스의 autoComma 메서드를 비구조화 할당으로 추출합니다.
  // autoComma: 숫자를 콤마(,)로 구분된 문자열로 변환하는 함수입니다.
  const { autoComma } = this.mother;

  try {
    // priceCollection에서 이동 비용 산정을 위한 기준 데이터를 가져옵니다.
    const priceStandard = await back.mongoRead(priceCollection, { key: priceStandardKey }, { console: true });

    // 가격 기준 데이터가 없는 경우, 오류를 발생시킵니다.
    if (priceStandard.length === 0) {
      throw new Error("price collection error");
    }

    // 이동 비용 산정에 필요한 상수 값을 priceStandard에서 추출합니다.
    const mConst = priceStandard[0].travel.unit.meters; // 미터당 비용 단위
    const sConst = priceStandard[0].travel.unit.seconds; // 초당 비용 단위
    const consultingConst = priceStandard[0].travel.consulting.labor; // 상담 비용

    // getDistance 메서드를 사용하여 두 지점 간의 거리를 계산합니다.
    const distance = await this.getDistance(from, to, option);

    let m, s, result;

    // 결과 초기값을 null로 설정합니다.
    result = null;

    // 거리 계산 결과가 null인 경우, null을 반환합니다.
    if (distance === null) {
      return null;
    }

    // 계산된 거리와 시간을 변수에 저장합니다.
    m = distance.m; // 미터 단위 거리
    s = distance.s; // 초 단위 시간

    // 이동 비용을 계산합니다.
    result = (mConst * m * 2) + (sConst * s * 2); // 거리와 시간에 따른 비용 계산
    result = (Math.round(result / 1000) * 1000) + consultingConst; // 결과를 천 단위로 반올림하고 상담 비용을 추가합니다.

    // 최종 결과 객체를 반환합니다.
    return {
      from: distance.from, // 출발지 정보
      to: distance.to, // 도착지 정보
      amount: result, // 최종 비용
      string: autoComma(result) + '원', // 콤마로 구분된 비용 문자열
      distance: {
        meters: m, // 거리(미터)
        string: String(Math.round(m / 1000)) + "km", // 거리(킬로미터) 문자열
      },
      time: {
        seconds: s, // 시간(초)
        string: String(Math.floor(Math.round(s / 60) / 60)) + "시간 " + String(Math.round(s / 60) % 60) + "분", // 시간 문자열
      },
      standard: {
        distance: {
          value: mConst, // 거리 단위 비용
          string: "미터당 " + String(mConst) + "원", // 거리 단위 비용 문자열
        },
        time: {
          value: sConst, // 시간 단위 비용
          string: "초당 " + String(sConst) + "원", // 시간 단위 비용 문자열
        }
      }
    };

  } catch (e) {
    console.log(e); // 오류 발생 시, 콘솔에 출력합니다.
  }
}

/**
 * AddressParser 클래스의 addressInspection 메서드는 주소 배열을 검사하여 유효성을 확인하고, 문제가 있는 주소를 반환하는 비동기 함수입니다.
 * 이 메서드는 liteMode에 따라 간단한 검사만 할지, 더 상세한 검사를 수행할지 결정합니다.
 * @param {Array<Object>} addressArr - 검사할 주소 객체 배열입니다. 각 객체는 id와 address를 포함해야 합니다.
 * @param {boolean} [liteMode=false] - 간단한 검사 모드를 사용할지 여부를 나타냅니다. 기본값은 false입니다.
 * @returns {Promise<Array<Object>>} 유효하지 않은 주소와 그에 대한 설명이 포함된 객체 배열을 반환합니다.
 */
AddressParser.prototype.addressInspection = async function (addressArr, liteMode = false) {

  // addressArr 파라미터가 배열이 아닌 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
  if (!Array.isArray(addressArr)) {
    throw new Error("input must be address array");
  }

  // addressArr의 각 객체가 id와 문자열 타입의 address를 가지고 있는지 확인합니다.
  for (let obj of addressArr) {
    if (obj.id === undefined || typeof obj.address !== "string") {
      throw new Error(`address array => [ { id: "", address: "" }... ]`);
    }
  }

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // Mother 클래스의 fileSystem 메서드를 비구조화 할당으로 추출합니다.
  // fileSystem: 파일 시스템 관련 작업을 수행하는 메서드입니다.
  const { fileSystem } = this.mother;

  let failAddress; // 유효하지 않은 주소를 저장할 배열입니다.
  let inspectionResult; // 검사 결과를 저장할 변수입니다.

  try {
    /**
     * 주소를 검사하는 내부 비동기 함수입니다.
     * @param {string} id - 주소 객체의 고유 ID입니다.
     * @param {string} address - 검사할 주소 문자열입니다.
     * @param {boolean} [liteMode=false] - 간단한 검사 모드를 사용할지 여부를 나타냅니다.
     * @returns {Promise<Object>} 주소 검사 결과를 담은 객체를 반환합니다.
     */
    const inspection = async function (id, address, liteMode = false) {

      // id 또는 address가 정의되지 않은 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
      if (id === undefined || address === undefined) {
        throw new Error("invaild input");
      }

      // address가 문자열이 아닌 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
      if (typeof address !== "string") {
        throw new Error("input must be string");
      }

      try {
        // address를 공백으로 분리하고 각 요소를 트림한 배열로 변환합니다.
        const addressArr = address.split(' ').map((i) => { return i.trim(); });

        // addressArr의 길이가 2 미만인 경우, 유효하지 않은 주소로 간주하고 오류 메시지를 반환합니다.
        if (addressArr.length < 2) {
          return { boo: false, message: "ERROR: 주소가 아님" };
        }

        let targetIndex; // 타겟 인덱스를 저장할 변수입니다.
        let searchResult; // 주소 검색 결과를 저장할 변수입니다.
        let first;
        let road, parcel;

        targetIndex = null; // 초기 타겟 인덱스를 null로 설정합니다.

        // 주소 배열에서 '동', '로', '가', '리', '길'로 끝나는 항목을 찾습니다.
        for (let i = 0; i < addressArr.length; i++) {
          if (/[동로가리길]$/i.test(addressArr[i])) {
            targetIndex = i;
            break;
          }
        }

        // 타겟 인덱스를 찾지 못한 경우, 오류 메시지를 반환합니다.
        if (targetIndex === null) {
          return { boo: false, message: "ERROR: 지번명 또는 도로명 알 수 없음" };
        }

        // 타겟 인덱스 다음에 오는 요소가 없는 경우, 오류 메시지를 반환합니다.
        if (addressArr[targetIndex + 1] === undefined) {
          return { boo: false, message: "ERROR: 건물 번호 없음" };
        }

        // 도로명 주소인 경우, 건물 번호가 유효한지 확인합니다.
        if (/[로길]$/i.test(addressArr[targetIndex])) {
          if (addressArr[targetIndex + 1].replace(/\([^\)]*\)?/gi, '').replace(/[0-9\-\.]/gi, '') !== '') {
            return { boo: false, message: "ERROR: 건물 번호가 이상함" };
          }
        }

        // liteMode가 false일 경우, 상세한 주소 검사를 수행합니다.
        if (!liteMode) {
          // getAddress 메서드를 사용하여 주소 검색 결과를 가져옵니다.
          searchResult = await instance.getAddress(address);

          // 검색 결과가 없는 경우, 오류 메시지를 반환합니다.
          if (searchResult === null) {
            return { boo: false, message: "ERROR: 검색 결과가 없음" };
          }

          // 주소 배열의 첫 번째 요소에서 특별시, 광역시 등의 문자열을 제거합니다.
          first = addressArr[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');

          // 검색된 도로명 주소와 지번 주소에서 동일한 작업을 수행합니다.
          road = searchResult.address.road.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');
          parcel = searchResult.address.parcel.split(' ')[0].replace(/특별.+$/i, '').replace(/광역.+$/i, '').replace(/[남북].+$/i, '').replace(/도$/i, '').replace(/시$/i, '');

          // 첫 번째 요소와 도로명, 지번 주소가 일치하지 않는 경우, 오류 메시지를 반환합니다.
          if (first !== road && first !== parcel) {
            return { boo: false, message: "ERROR: 광역 단계 일치하지 않음" };
          }
        }

        // 모든 검사를 통과한 경우, 성공 메시지를 반환합니다.
        return { boo: true, message: "SUCCESS" };
      } catch (e) {
        console.log(e); // 오류 발생 시, 콘솔에 출력합니다.
      }
    }

    failAddress = []; // 유효하지 않은 주소를 저장할 배열을 초기화합니다.

    // addressArr의 각 주소에 대해 검사를 수행합니다.
    for (let { id, address } of addressArr) {
      inspectionResult = await inspection(id, address, liteMode); // inspection 함수를 호출하여 검사 결과를 가져옵니다.
      if (!inspectionResult.boo) { // 검사에 실패한 경우, failAddress 배열에 추가합니다.
        failAddress.push({ id, address, message: inspectionResult.message });
      }
    }

    // 유효하지 않은 주소가 포함된 배열을 반환합니다.
    return failAddress;
  } catch (e) {
    console.log(e); // 오류 발생 시, 콘솔에 출력합니다.
    failAddress = []; // 오류 발생 시, 빈 failAddress 배열을 초기화합니다.

    // 모든 주소에 대해 빈 메시지를 포함한 객체를 failAddress 배열에 추가합니다.
    for (let { id, address } of addressArr) {
      failAddress.push({ id, address, message: "" });
    }

    // failAddress 배열을 반환합니다.
    return failAddress;
  }
}

/**
 * AddressParser 클래스의 apartNameSearch 메서드는 아파트 이름을 검색하여 적절한 형식으로 반환하는 비동기 함수입니다.
 * 이 메서드는 네이버 검색 결과를 기반으로 주어진 단어에서 불필요한 문자열을 제거하고 아파트 이름을 추출합니다.
 * @param {string} words - 검색할 아파트 이름을 포함한 문자열입니다.
 * @returns {Promise<Object>} 검색된 결과를 포함하는 객체를 반환합니다. 검색이 실패한 경우 원본 문자열을 반환합니다.
 */
AddressParser.prototype.apartNameSearch = async function (words) {

  // words 파라미터가 문자열이 아닌 경우, 유효하지 않은 입력으로 간주하고 오류를 발생시킵니다.
  if (typeof words !== "string") {
    throw new Error("invaild input");
  }

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // Mother 클래스의 requestSystem 메서드를 비구조화 할당으로 추출합니다.
  // requestSystem: 외부 API 요청을 처리하는 메서드입니다.
  const { requestSystem } = this.mother;

  // 불필요한 문자열을 담은 리스트를 정의합니다. 이는 검색 결과에서 제외할 문자열들입니다.
  const junkList = [
    '로딩중', '우편번호', '도로명', '지번', '이 주소의 장소', '길찾기', 'VIEW', '문서 저장하기',
    'Keep에 저장', 'Keep 바로가기', '전체', '메뉴 영역으로 바로가기', '본문 영역으로 바로가기', 'NAVER',
    '검색', '한글 입력기', '자동완성 레이어', '최근검색어', '전체삭제', '컨텍스트 자동완성', 'ON/OFF 설정은',
    '해당기기(브라우저)에 저장됩니다.', '자세히', '동일한 시간대/연령/남녀별', '사용자 그룹의', '관심사에 맞춰 자동완성을 제공합니다.',
    '로그인', '자세히', '컨텍스트 자동완성 레이어 닫기', '도움말', '신고', '자동완성 끄기', '검색', '통합', 'VIEW', '이미지',
    '지식iN', '동영상', '쇼핑', '뉴스', '어학사전', '지도', '책', '더보기', '뮤직', '지식백과', '오디오클립', '학술정보',
    '검색옵션', '공유', '추가', '자세히보기', '바로가기', '검색옵션 닫기', '정렬', '관련도순', '최신순', '기간', '직접입력', '옵션',
    '펼치기', '접기', '삭제', '검색어 저장 기능이 꺼져 있습니다.', '설정이 초기화 된다면', '을 확인해주세요.', '최근 검색어 내역이 없습니다.',
    '설정이 초기화 된다면', '을 확인해주세요.', '자동저장 끄기', '기간 설정시작', '기간 설정끝', '적용', '옵션초기화', '검색옵션 가이드',
    '관심사를 반영한 컨텍스트 자동완성', '지급기한 1년', '블로그', '카페', '기본뷰', '타임라인뷰', '멀티미디어뷰', 'VIEW 더보기',
    '정보를 가져오는 중입니다.', '검색결과가 없습니다.', '옵션을 재선택 하시거나 초기화 해보시기 바랍니다.', '초기화', '죄송합니다. 일시적인 오류입니다.',
    '잠시 후 다시 시도해주십시오.', '재시도', 'MS엑셀(xls)', '리뷰월드', '년(Year)', '월(Month)', '일(Day)', '이 정보가 표시된 이유',
    '네이버가 운영하는 부동산 서비스입니다.', '정보확인 레이어 닫기', '다른 사이트를 보시려면 클릭하세요', '다른 사이트 더보기', '관심단지',
    '‘관심 단지’', '에 저장되었습니다',
  ];

  // 정규 표현식으로 매칭할 필요 없는 문자열을 담은 리스트를 정의합니다.
  const junkRegList = [
    /function/gi, /var/g, /root/g, /flex/g, /background/g, /hidden/g, /margin/g, /jQuery/gi, /^KEEP/gi, /\@\.?$/, /charCodeAt/g, /통합검색/gi, /setTimeout/gi, /\>\>/gi,
  ];

  /**
   * 네이버에서 아파트 이름을 검색하는 비동기 함수입니다.
   * @param {string} words - 검색할 아파트 이름을 포함한 문자열입니다.
   * @returns {Promise<Array<string>|null>} 검색된 결과 배열을 반환합니다. 오류 발생 시 null을 반환합니다.
   */
  const naverSearch = async function (words) {
    const protocol = "https:"; // 프로토콜을 설정합니다.
    const host = "search.naver.com"; // 네이버 검색의 호스트 이름을 설정합니다.
    const path = "/search.naver"; // 검색 요청 경로를 설정합니다.
    const token = "__split__"; // HTML 태그 제거를 위한 토큰을 설정합니다.

    try {
      // 검색어를 포함한 URL을 생성합니다.
      const url = `${protocol}//${host}${path}?query=${global.encodeURIComponent(words)}`;
      let response, arr, rawString, window, document, html, link;

      // requestSystem 메서드를 사용해 네이버 검색 결과를 요청합니다.
      response = await requestSystem(url);

      // 요청이 성공적으로 완료된 경우
      if (response.status < 300) {
        const { data } = response;
        // HTML 태그를 제거하고 남은 텍스트를 배열로 만듭니다.
        rawString = data.replace(/<[^\>]+>/gi, token);
        arr = rawString.split(token);
        arr = arr.map((str) => { return str.trim(); }).filter((str) => { return str.trim() !== ''; });
        arr = arr.map((str) => { if (/^[\'\"]/.test(str.trim()) || /[\'\"]$/.test(str.trim())) { return str.trim().slice(1, -1); } else { return str.trim(); } });
        arr = arr.filter((str) => { return junkRegList.every((reg) => { return !reg.test(str) }); });
        arr = arr.filter((str) => { return !junkList.includes(str.trim()); });
        arr = arr.filter((str) => { return str.trim() !== '' && str.trim() !== '|' && str.trim() !== '~' });
        arr = arr.slice(arr.findIndex((str) => { return (new RegExp('^' + words.slice(0, 2), 'i')).test(str) && / /g.test(str) && str.split(' ').map((a) => { return a.trim() }).some((a) => { return /[동로가리길]$/i.test(a); }) }));
        arr = arr.filter((str) => { return str.trim().replace(/[0-9\-]/gi, '') !== '' });

        // 최종 필터링된 배열을 반환합니다.
        return arr;
      } else {
        throw new Error("response error"); // 응답 상태 코드가 300 이상일 경우 오류를 발생시킵니다.
      }
    } catch (e) {
      return null; // 오류 발생 시 null을 반환합니다.
    }
  }

  const limit = 4; // 검색을 반복할 최대 횟수를 설정합니다.
  let num, resultArr, addressArr, targetIndex, fromClient, final, realFinal;

  try {
    // 검색어를 정제하여 공백 및 불필요한 괄호를 제거합니다.
    words = words.trim().replace(/\([^\)]+\)/gi, '').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ');

    // 주소를 공백으로 나누고, 불필요한 요소를 제거한 배열을 만듭니다.
    addressArr = words.split(' ').map((i) => { return i.trim(); }).filter((i) => { return i !== ''; });
    targetIndex = null;

    // 주소 배열에서 '동', '로', '가', '리', '길'로 끝나는 항목을 찾습니다.
    for (let i = 0; i < addressArr.length; i++) {
      if (/[동로가리길]$/i.test(addressArr[i])) {
        targetIndex = i;
        break;
      }
    }

    // 타겟 인덱스 이후의 요소에서 불필요한 데이터를 제거하여 클라이언트로부터 온 주소를 만듭니다.
    fromClient = addressArr.slice(targetIndex + 2).map((str) => { return str.trim(); }).filter((str) => { return !/^[0-9\-]+[동호]$/gi.test(str); }).filter((str) => { return str.replace(/[0-9\-\.동호]/gi, '') !== ''; }).join(' ');

    // 타겟 인덱스 이후의 요소가 특정 조건에 맞지 않는 경우, 원본 문자열을 반환합니다.
    if (addressArr[targetIndex + 2] !== undefined && !/^[0-9]/.test(addressArr[targetIndex + 2]) && !/동$/.test(addressArr[targetIndex + 2]) && !/^\(/.test(addressArr[targetIndex + 2])) {
      return { raw: words, apart: fromClient };
    }

    num = 0; // 반복 횟수를 초기화합니다.

    // 네이버 검색 요청을 최대 limit 횟수(기본값 4회)까지 반복하여 수행합니다.
    // naverSearch 함수가 반환하는 resultArr가 배열이 아니거나, 오류가 발생한 경우 재시도합니다.
    do {
      resultArr = await naverSearch(words); // naverSearch 함수를 호출하여 검색 결과를 가져옵니다.
      num++; // 요청 횟수를 증가시킵니다.
    } while (!Array.isArray(resultArr) && num <= limit); // 검색 결과가 배열이 아니거나, 최대 시도 횟수(limit)에 도달하지 않은 경우 반복합니다.

    // 만약 resultArr이 null이라면(검색 결과가 없거나 오류 발생 시), realFinal을 빈 문자열로 설정합니다.
    if (resultArr === null) {
      realFinal = '';
    } else {
      // 검색 결과의 첫 두 요소가 원본 검색어(words)의 앞부분과 일치하는지 확인합니다.
      if (resultArr.slice(0, 2).every((s) => { return (new RegExp("^" + words.slice(0, 2), 'i')).test(s); })) {
        // 일치하는 경우, fromClient에서 불필요한 공백을 제거한 후 final에 저장합니다.
        final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
      } else {
        // 첫 번째 조건에 해당하지 않는 경우, resultArr의 두 번째 요소가 존재하는지 확인합니다.
        if (resultArr[1] !== undefined) {
          // 두 번째 요소가 존재하고, 알파벳, 한글, 숫자로 시작하는 경우
          if (/^[a-zA-Z가-힣0-9]/.test(resultArr[1].trim())) {
            // 해당 요소에서 불필요한 괄호와 공백을 제거하고 final에 저장합니다.
            final = resultArr[1].replace(/\([^\)]+\)/gi, '').trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
          } else {
            // 그렇지 않으면, fromClient에서 불필요한 공백을 제거한 후 final에 저장합니다.
            final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
          }
        } else {
          // resultArr의 두 번째 요소가 존재하지 않으면, fromClient에서 불필요한 공백을 제거한 후 final에 저장합니다.
          final = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
        }
      }

      // final이 빈 문자열인 경우, realFinal에 fromClient에서 불필요한 공백을 제거한 값을 저장합니다.
      if (final === '') {
        realFinal = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
      } else {
        // final에서 숫자, 공백, 하이픈을 제외한 값이 빈 문자열인 경우
        if (final.replace(/[0-9 \-]/gi, '') === '') {
          realFinal = fromClient.trim().replace(/  /gi, ' ').replace(/  /gi, ' ');
        } else {
          // final을 공백 기준으로 나누어 각 요소에서 불필요한 공백과 특정 패턴(예: '동호')을 제거한 후, 다시 결합하여 realFinal에 저장합니다.
          final = final.split(' ').map((str) => { return str.trim(); })
                       .filter((str) => { return !/^[0-9\-]+[동호]$/gi.test(str); })
                       .filter((str) => { return str.replace(/[0-9\-\.동호]/gi, '') !== ''; })
                       .join(' ').trim();
          realFinal = final;
        }
      }

      // 최종적으로 realFinal이 빈 문자열이라면, 원본 검색어(words)를 apart로 설정한 객체를 반환합니다.
      if (realFinal === '') {
        return { raw: words, apart: words };
      } else {
        // final에 '필터'라는 단어가 포함되어 있는 경우, apartNameSearch 메서드를 다시 호출합니다.
        if (/필터/gi.test(realFinal)) {
          return instance.apartNameSearch(words);
        } else {
          // 그렇지 않으면, 최종적으로 정제된 realFinal 값을 apart로 설정한 객체를 반환합니다.
          return { raw: words, apart: realFinal };
        }
      }
    }

  } catch (e) {
    console.log(e); // 오류 발생 시, 콘솔에 출력합니다.
    return { raw: words, apart: words };
  }
}

/**
 * AddressParser 클래스의 returnAddressCodeMatrix 메서드는 주소 코드 매트릭스를 생성하여 반환하는 비동기 함수입니다.
 * 이 메서드는 파일에서 읽어온 주소 코드를 특정 형식으로 변환하여 매트릭스로 반환합니다.
 * @param {boolean} [five=true] - 코드의 앞 5자리만을 사용할지 여부를 결정하는 플래그입니다. 기본값은 true입니다.
 * @returns {Promise<Array<Array<string>>>} 주소 코드와 이름이 매핑된 매트릭스를 반환합니다.
 */
AddressParser.prototype.returnAddressCodeMatrix = async function (five = true) {

  // this를 instance 변수에 할당하여 내부에서의 this 참조를 유지합니다.
  const instance = this;

  // addressCode와 fileSystem을 this 객체에서 가져옵니다.
  const { addressCode } = this; // addressCode는 주소 코드가 저장된 파일 경로를 나타냅니다.
  const { fileSystem } = this.mother; // Mother 클래스의 fileSystem 메서드를 비구조화 할당으로 추출합니다.

  try {
    // fileSystem 메서드를 사용해 addressCode 파일에서 문자열 데이터를 읽어옵니다.
    // 'readString' 명령어와 파일 경로를 인자로 전달하여 파일 내용을 문자열로 가져옵니다.
    const target = await fileSystem(`readString`, [addressCode]);

    let arr, map;
    let targetCode;
    let targetMatrix;

    // 파일에서 읽어온 문자열을 줄 단위로 분할하고, '존재'라는 단어가 포함된 줄만 필터링합니다.
    // 그런 다음 각 줄을 탭 문자('\t')로 분할하여 코드와 이름의 배열로 변환합니다.
    arr = target.split("\n").filter((str) => { return /존재/gi.test(str); }).map((str) => {
      return str.split("\t").slice(0, 2); // 각 줄에서 코드와 이름만을 추출합니다.
    });

    // 빈 객체를 생성하여 코드와 이름을 맵핑합니다.
    map = {};
    for (let [code, name] of arr) {
      map[code] = name; // 코드와 이름을 맵 객체에 저장합니다.
    }

    // five 플래그가 true인 경우, 코드의 앞 5자리만 사용하여 유니크한 코드 목록을 생성합니다.
    if (five) {
      // 코드의 앞 5자리를 추출한 후, 중복을 제거하여 유니크한 코드 배열을 만듭니다.
      targetCode = [...new Set(arr.map((a) => { return a[0].slice(0, 5) }))];
      // 각 5자리 코드에 대해, 매트릭스 배열에 해당 코드와 이름을 저장합니다.
      targetMatrix = targetCode.map((code) => {
        return [code, map[code + "00000"]]; // 코드 뒤에 '00000'을 붙여 전체 코드를 완성한 후 이름을 매핑합니다.
      });
    } else {
      // five 플래그가 false인 경우, 전체 코드를 사용하여 유니크한 코드 목록을 생성합니다.
      targetCode = [...new Set(arr.map((a) => { return a[0]; }))];
      // 각 전체 코드에 대해, 매트릭스 배열에 해당 코드와 이름을 저장합니다.
      targetMatrix = targetCode.map((code) => {
        return [code, map[code]]; // 전체 코드를 사용하여 이름을 매핑합니다.
      });
    }

    // 생성된 매트릭스 배열을 반환합니다.
    return targetMatrix;

  } catch (e) {
    // 오류 발생 시, 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

module.exports = AddressParser;
