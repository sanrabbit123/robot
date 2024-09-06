/**
 * @class NaverAPIs
 * @description 네이버 광고, 네이버 맵, 네이버 부동산 API 등을 관리하는 클래스입니다.
 * @param {Object|null} mother - Mother 클래스의 인스턴스. 기본값은 null입니다.
 * @param {Object|null} back - BackMaker 클래스의 인스턴스. 기본값은 null입니다.
 * @param {Object|null} address - 주소 객체. 기본값은 null입니다.
 * @constructor 네이버 API를 활용하여 다양한 작업을 수행할 수 있는 인스턴스를 생성합니다.
 */
const NaverAPIs = function (mother = null, back = null, address = null) {
  // Mother, BackMaker, address 객체가 모두 전달된 경우
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother; // 전달된 Mother 객체를 사용
    this.back = back; // 전달된 BackMaker 객체를 사용
    this.address = address; // 전달된 address 객체를 사용
  } else {
    // Mother, BackMaker, address 객체가 전달되지 않은 경우, 새로 객체를 생성합니다.
    const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 모듈을 가져옵니다.
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 모듈을 가져옵니다.
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js"); // address 객체를 가져옵니다.
    this.mother = new Mother(); // 새 Mother 인스턴스를 생성
    this.back = new BackMaker(); // 새 BackMaker 인스턴스를 생성
    this.address = ADDRESS; // ADDRESS 객체를 사용
  }

  // GoogleChrome 클래스 로드 및 인스턴스 생성
  const GoogleChrome = require(process.cwd() + "/apps/googleAPIs/googleChrome.js");
  this.chrome = new GoogleChrome(); // GoogleChrome 인스턴스를 생성하여 this.chrome에 할당

  // NaverAPIs 디렉터리 경로 설정
  this.dir = process.cwd() + "/apps/naverAPIs";

  // 네이버 API 인증 정보 설정
  this.naverToken = "01000000001df72459c6f186739e0778461122cfee6a0fddea2bb30df35e82c92f20944587"; // 네이버 API 토큰
  this.naverSecret = "AQAAAAAd9yRZxvGGc54HeEYRIs/uQCeezUnYnLfpaLvLRNMcyg=="; // 네이버 API 시크릿 키
  this.naverId = "1608132"; // 네이버 API ID
  this.naverUrl = "https://api.naver.com"; // 네이버 API 기본 URL

  // 네이버 지도 API 설정
  this.naverMapVersion = "v5"; // 네이버 지도 API 버전
  this.naverMapUrl = "https://map.naver.com"; // 네이버 지도 기본 URL
  this.naverMapSearch = "/p/api/search/allSearch"; // 네이버 지도 검색 API 엔드포인트

  // 네이버 부동산 API 설정
  this.naverLandUrl = "https://new.land.naver.com"; // 네이버 부동산 기본 URL
  this.naverLandAuthorizationKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJFQUxFU1RBVEUiLCJpYXQiOjE2OTQwNTg5MTUsImV4cCI6MTY5NDA2OTcxNX0.I6HBJO77xIkg_4M9nnTmu-kIYbV8y4bjswqpbNC2LfQ"; // 네이버 부동산 인증 키

  // 네이버 부동산 복합 ID 키워드 설정
  this.complexIdKeyword = "land_complex_"; // 네이버 부동산 복합 ID 키워드

  // 가짜 헤더 설정 (헤더 값은 브라우저 환경을 흉내 내기 위해 사용됩니다)
  this.fakeHeaders = {
    "Accept": "application/json, text/plain, */*", // 모든 데이터 형식 허용
    "Accept-Encoding": "gzip, deflate, br", // 압축 방식 허용
    "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4", // 언어 설정
    "Cache-Control": "no-cache", // 캐시 사용 금지
    "Cookie": "NNB=5XIB6BZTOOQWI; ASID=d2b204fd00000189c9dcbaaa00000062; _ga=GA1.1.937291492.1692025459; naverfinancial_CID=a0caafb6e3ca4fd1acfa82580cb6dd7f; _ga_Q7G1QTKPGB=GS1.1.1692025458.1.0.1692025462.0.0.0; _ga_451MFZ9CFM=GS1.1.1703148673.1.1.1703148684.0.0.0; nx_ssl=2", // 네이버 쿠키 값
    "Expires": "Sat, 01 Jan 3000 00:00:00 GMT", // 캐시 만료 날짜 (매우 먼 미래)
    "Pragma": "no-cache", // 캐시 사용 금지
    "Referer": "https://map.naver.com/p/search/%EC%98%A4%EC%82%B0%EC%97%AD%20e-%ED%8E%B8%ED%95%9C%EC%84%B8%EC%83%81%202%EB%8B%A8%EC%A7%80?c=15.00,0,0,0,dh", // 네이버 지도 페이지를 참조하는 값
    "Sec-Ch-Ua": `"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"`, // User-Agent 정보
    "Sec-Ch-Ua-Mobile": `?0`, // 모바일 여부
    "Sec-Ch-Ua-Platform": `"macOS"`, // 플랫폼 정보
    "Sec-Fetch-Dest": `empty`, // 리소스 가져오기 대상
    "Sec-Fetch-Mode": `cors`, // Cross-Origin Resource Sharing 모드
    "Sec-Fetch-Site": `same-origin`, // 동일 출처 정책
    "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`, // 사용자 에이전트 문자열
  }
}

/**
 * @method dailyCampaign
 * @description 네이버 광고 캠페인의 일일 성과 데이터를 MongoDB에 저장하는 메서드입니다.
 * @param {Object} selfMongo - MongoDB 인스턴스입니다.
 * @param {number} dayNumber - 데이터를 수집할 일 수입니다. 기본값은 3일입니다.
 * @param {Object|null} logger - 로깅을 위한 logger 인스턴스입니다. 기본값은 null입니다.
 * @returns {Promise<void>} 비동기 처리 결과를 반환합니다.
 */
NaverAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this; // this 참조를 유지하기 위한 변수
  const back = this.back; // BackMaker 인스턴스 참조
  const { naverToken, naverSecret, naverId, naverUrl } = this; // 네이버 API 사용을 위한 인증 정보
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother; // Mother 메서드를 destructuring하여 참조
  try {
    const campaignCollection = "dailyCampaign"; // MongoDB에서 사용할 컬렉션 이름
    let tempRows; // 임시 데이터 저장 변수
    let res, res2, url; // API 응답 및 URL 저장 변수
    let json; // MongoDB에 저장할 JSON 데이터
    let from, to; // 데이터 수집 시작 및 종료 날짜
    let startDate; // 데이터 수집 시작 날짜
    let num, num2; // 루프 카운터
    let key; // MongoDB에 저장할 키 값
    let now; // 현재 날짜
    let thisNowDate; // 현재 시각 저장 변수

    now = new Date(); // 현재 시각을 now에 저장
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 현재 날짜를 기준으로 startDate 설정
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1); // dayNumber 만큼 날짜를 이전으로 설정
    }

    url = "/ncc/campaigns"; // 네이버 API의 캠페인 엔드포인트 설정
    thisNowDate = new Date(); // API 요청 시 현재 시각을 사용
    res = await requestSystem(naverUrl + url, {
      recordSize: 200, // 최대 200개의 레코드를 요청
      timeRange: JSON.stringify({
        since: dateToString(startDate), // 데이터 수집 시작 날짜
        until: dateToString(now), // 데이터 수집 종료 날짜
      }),
    }, {
      method: "get", // HTTP GET 메서드 사용
      headers: {
        "X-Timestamp": String(thisNowDate.valueOf()), // 현재 타임스탬프
        "X-API-KEY": naverToken, // 네이버 API 키
        "X-Customer": naverId, // 네이버 고객 ID
        "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url) // 서명 생성
      }
    });

    for (let i = 0; i < dayNumber; i++) {
      await sleep(1000); // API 요청 간의 딜레이 설정

      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1)); // 시작 날짜 설정
        to = new Date(JSON.stringify(startDate).slice(1, -1)); // 종료 날짜 설정
        to.setDate(to.getDate() + 1); // 다음 날짜로 설정
      } else {
        from.setDate(from.getDate() + 1); // from 날짜를 다음 날로 설정
        to.setDate(to.getDate() + 1); // to 날짜를 다음 날로 설정
      }

      url = "/stats"; // 네이버 API의 통계 엔드포인트 설정
      num2 = 0; // 루프 카운터 초기화
      for (let { nccCampaignId, customerId, name, campaignTp } of res.data) { // API 응답에서 각 캠페인에 대한 정보 추출
        await sleep(100); // API 요청 간의 짧은 딜레이 설정

        try {
          thisNowDate = new Date(); // API 요청 시 현재 시각을 사용
          res2 = await requestSystem(naverUrl + url, {
            id: nccCampaignId, // 캠페인 ID 설정
            fields: JSON.stringify([ "impCnt", "clkCnt", "salesAmt", "ccnt" ]), // 요청할 데이터 필드 설정
            timeRange: JSON.stringify({
              since: dateToString(from), // 통계 데이터 수집 시작 날짜
              until: dateToString(from), // 통계 데이터 수집 종료 날짜
            }),
          }, {
            method: "get", // HTTP GET 메서드 사용
            headers: {
              "X-Timestamp": String(thisNowDate.valueOf()), // 현재 타임스탬프
              "X-API-KEY": naverToken, // 네이버 API 키
              "X-Customer": naverId, // 네이버 고객 ID
              "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url) // 서명 생성
            }
          });
          if (!(res2.data.data[0].impCnt === 0 && res2.data.data[0].clkCnt === 0 && res2.data.data[0].salesAmt === 0)) { // 통계 데이터가 0이 아닌 경우에만 처리
            key = dateToString(from).replace(/\-/gi, '') + "_" + nccCampaignId; // MongoDB에 저장할 키 값 생성

            json = { // MongoDB에 저장할 JSON 데이터 생성
              camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'n' + String.fromCharCode(97 + num2) + zeroAddition(from.getDate()) + 's',
              key,
              date: { from, to }, // 데이터 수집 기간
              value: {
                charge: Number(res2.data.data[0].salesAmt), // 광고비
                performance: {
                  impressions: Number(res2.data.data[0].impCnt), // 노출 수
                  clicks: Number(res2.data.data[0].clkCnt), // 클릭 수
                },
              },
              information: {
                mother: "naver", // 데이터 출처
                type: campaignTp, // 캠페인 타입
                id: {
                  account: String(customerId), // 고객 ID
                  campaign: nccCampaignId, // 캠페인 ID
                },
                name: name, // 캠페인 이름
              }
            };

            tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo }); // MongoDB에서 기존 데이터 조회
            if (tempRows.length !== 0) {
              await back.mongoDelete(campaignCollection, { key }, { selfMongo }); // 기존 데이터 삭제
            }

            await back.mongoCreate(campaignCollection, json, { selfMongo }); // MongoDB에 새 데이터 저장
            console.log(json); // 저장된 JSON 데이터 출력

            num2++; // 루프 카운터 증가
          }
        } catch (e) {
          await errorLog("NaverAPIs.dailyCampaign error : " + "too much requests"); // 에러 로그 기록
          console.log("there is nothing"); // 오류 발생 시 출력
        }
      }
    }

    if (logger !== null) {
      logger.cron("naver daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); }); // 작업 완료 로그 기록
    }

  } catch (e) {
    await emergencyAlarm("NaverAPIs.dailyCampaign error : " + e.message); // 긴급 알림 전송
    await errorLog(e); // 오류 출력
  }
}

/**
 * @method naverComplex
 * @description 네이버 광고의 복합적인 성과 데이터를 수집하고 MongoDB에 저장하는 메서드입니다.
 * @param {Object} selfMongo - MongoDB 인스턴스입니다.
 * @param {number} dayNumber - 데이터를 수집할 일 수입니다. 기본값은 3일입니다.
 * @param {Object|null} logger - 로깅을 위한 logger 인스턴스입니다. 기본값은 null입니다.
 * @returns {Promise<boolean>} 비동기 처리 결과를 반환합니다. 성공 시 true, 실패 시 false를 반환합니다.
 */
NaverAPIs.prototype.naverComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this; // this 참조를 유지하기 위한 변수
  const back = this.back; // BackMaker 인스턴스 참조
  const { naverToken, naverSecret, naverId, naverUrl } = this; // 네이버 API 사용을 위한 인증 정보
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, fileSystem } = this.mother; // Mother 메서드에서 필요한 유틸리티 함수들을 가져옴
  try {
    const collection = "naverComplex"; // MongoDB에서 사용할 컬렉션 이름
    const idKeyword = 'f'; // ID 키워드 설정
    const naverKeyword = 'n'; // 네이버 관련 키워드 설정
    const naverKeyKeyword = "naver"; // 네이버 키워드 설정
    let tempRows; // 임시 데이터 저장 변수
    let res, res2, url; // API 응답 및 URL 저장 변수
    let json; // MongoDB에 저장할 JSON 데이터
    let from, to; // 데이터 수집 시작 및 종료 날짜
    let startDate; // 데이터 수집 시작 날짜
    let num, num2; // 루프 카운터
    let key; // MongoDB에 저장할 키 값
    let now; // 현재 날짜
    let resultObject; // 최종 결과 객체
    let thisNowDate; // 현재 시각 저장 변수

    now = new Date(); // 현재 시각을 now에 저장
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 현재 날짜를 기준으로 startDate 설정
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1); // dayNumber 만큼 날짜를 이전으로 설정
    }

    url = "/ncc/campaigns"; // 네이버 API의 캠페인 엔드포인트 설정
    thisNowDate = new Date(); // API 요청 시 현재 시각을 사용
    res = await requestSystem(naverUrl + url, {
      recordSize: 200, // 최대 200개의 레코드를 요청
      timeRange: JSON.stringify({
        since: dateToString(startDate), // 데이터 수집 시작 날짜
        until: dateToString(now), // 데이터 수집 종료 날짜
      }),
    }, {
      method: "get", // HTTP GET 메서드 사용
      headers: {
        "X-Timestamp": String(thisNowDate.valueOf()), // 현재 타임스탬프
        "X-API-KEY": naverToken, // 네이버 API 키
        "X-Customer": naverId, // 네이버 고객 ID
        "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url) // 서명 생성
      }
    });

    for (let i = 0; i < dayNumber; i++) {

      await sleep(1000); // API 요청 간의 딜레이 설정
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1)); // 시작 날짜 설정
        to = new Date(JSON.stringify(startDate).slice(1, -1)); // 종료 날짜 설정
        to.setDate(to.getDate() + 1); // 다음 날짜로 설정
      } else {
        from.setDate(from.getDate() + 1); // from 날짜를 다음 날로 설정
        to.setDate(to.getDate() + 1); // to 날짜를 다음 날로 설정
      }

      key = dateToString(from).replace(/\-/gi, '') + "_" + naverKeyKeyword; // MongoDB에 저장할 키 값 생성
      resultObject = { // 최종 저장할 객체 초기화
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + naverKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0,
            performance: {
              impressions: 0,
              clicks: 0,
            },
            length: {
              web: 0,
              power: 0,
              contents: 0,
              brand: 0,
              place: 0,
              etc: 0,
            }
          },
          campaign: [],
        },
      }

      url = "/stats"; // 네이버 API의 통계 엔드포인트 설정
      num2 = 0; // 루프 카운터 초기화
      for (let { nccCampaignId, customerId, name, campaignTp } of res.data) { // API 응답에서 각 캠페인에 대한 정보 추출
        await sleep(100); // API 요청 간의 짧은 딜레이 설정
        try {
          thisNowDate = new Date(); // API 요청 시 현재 시각을 사용
          res2 = await requestSystem(naverUrl + url, {
            id: nccCampaignId, // 캠페인 ID 설정
            fields: JSON.stringify([ "impCnt", "clkCnt", "salesAmt", "ccnt", "avgRnk" ]), // 요청할 데이터 필드 설정
            timeRange: JSON.stringify({
              since: dateToString(from), // 통계 데이터 수집 시작 날짜
              until: dateToString(from), // 통계 데이터 수집 종료 날짜
            }),
          }, {
            method: "get", // HTTP GET 메서드 사용
            headers: {
              "X-Timestamp": String(thisNowDate.valueOf()), // 현재 타임스탬프
              "X-API-KEY": naverToken, // 네이버 API 키
              "X-Customer": naverId, // 네이버 고객 ID
              "X-Signature": sha256Hmac(naverSecret, String(thisNowDate.valueOf()) + ".GET." + url) // 서명 생성
            }
          });
          if (!(res2.data.data[0].impCnt === 0 && res2.data.data[0].clkCnt === 0 && res2.data.data[0].salesAmt === 0)) { // 통계 데이터가 0이 아닌 경우에만 처리
            resultObject.advertisement.campaign.push({ // 각 캠페인의 결과를 resultObject에 추가
              value: {
                charge: Number(res2.data.data[0].salesAmt), // 광고비
                performance: {
                  impressions: Number(res2.data.data[0].impCnt), // 노출 수
                  clicks: Number(res2.data.data[0].clkCnt), // 클릭 수
                  rank: Number(res2.data.data[0].avgRnk), // 평균 랭킹
                },
              },
              information: {
                id: nccCampaignId, // 캠페인 ID
                type: campaignTp, // 캠페인 타입
                name: name, // 캠페인 이름
              }
            });
            num2++; // 루프 카운터 증가
          }
        } catch (e) {
          await errorLog("NaverAPIs.naverComplex error : " + "too much requests"); // 에러 로그 기록
          console.log("there is nothing"); // 오류 발생 시 출력
        }
      }

      // 최종 광고 데이터에 대한 합산 계산
      resultObject.advertisement.value.charge = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge; }, 0);
      resultObject.advertisement.value.performance.impressions = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions; }, 0);
      resultObject.advertisement.value.performance.clicks = resultObject.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks; }, 0);

      // 각 광고 타입별로 캠페인 개수 계산
      resultObject.advertisement.value.length.web = resultObject.advertisement.campaign.filter((o) => { return /WEB_SITE/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.power = resultObject.advertisement.campaign.filter((o) => { return /POWER/gi.test(o.information.type) && !/POWER_CONTENTS/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.contents = resultObject.advertisement.campaign.filter((o) => { return /POWER_CONTENTS/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.brand = resultObject.advertisement.campaign.filter((o) => { return /BRAND_SEARCH/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.place = resultObject.advertisement.campaign.filter((o) => { return /PLACE/gi.test(o.information.type) }).length;
      resultObject.advertisement.value.length.etc = resultObject.advertisement.campaign.length - (resultObject.advertisement.value.length.web + resultObject.advertisement.value.length.power + resultObject.advertisement.value.length.contents + resultObject.advertisement.value.length.brand + resultObject.advertisement.value.length.place);

      // MongoDB에 결과 저장
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      await back.mongoCreate(collection, resultObject, { selfMongo });
      console.log(resultObject);

    }

    if (logger !== null) {
      logger.cron("naver complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); }); // 작업 완료 로그 기록
    }

    return true;

  } catch (e) {
    emergencyAlarm("NaverAPIs.naverComplex error : " + e.message).catch((err) => { console.log(err); }); // 긴급 알림 전송
    await errorLog(e); // 오류 출력
    return false;
  }
}

/**
 * @method mapVersionCheck
 * @description 네이버 지도 API의 버전을 확인하고, 변경된 경우 알림을 전송하는 메서드입니다.
 * @returns {Promise<boolean>} 버전이 일치하면 true, 일치하지 않으면 false를 반환합니다.
 */
NaverAPIs.prototype.mapVersionCheck = async function () {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수 설정
  const { emergencyAlarm, errorLog } = this.mother; // Mother 클래스의 emergencyAlarm 메서드를 사용하기 위해 가져옴
  const { chrome, naverMapUrl, naverMapVersion } = this; // 네이버 지도 관련 설정값들을 가져옴

  try {
    // 네이버 지도 URL을 사용하여 Chrome을 통해 현재 페이지 URL을 가져옴
    const test = await chrome.frontScript(naverMapUrl, async function () {
      return window.location.href; // 현재 페이지의 URL을 반환하는 함수
    });

    // 가져온 URL에서 버전 정보를 추출함
    const version = test.replace(new RegExp(naverMapUrl, "gi"), "").split("/").find((str) => { return /^v/i.test(str) });

    // 추출한 버전 정보가 현재 설정된 버전과 일치하는지 확인
    if (version !== naverMapVersion) {
      // 버전이 일치하지 않으면 긴급 알림을 전송
      await emergencyAlarm("네이버 주소 버전 바뀌었음 작업 필요 : " + JSON.stringify(new Date()));
      return false; // 버전이 일치하지 않음을 반환
    } else {
      return true; // 버전이 일치함을 반환
    }
  } catch (e) {
    await errorLog(e); // 오류 발생 시 콘솔에 출력
    return false; // 오류가 발생한 경우 false를 반환
  }
}

/**
 * @method mapSearch
 * @description 네이버 지도에서 특정 쿼리에 대한 검색을 수행하고 결과를 반환하는 메서드입니다.
 * @param {string} query - 검색할 쿼리 문자열입니다.
 * @param {boolean} justWordingMode - true인 경우, 추가적인 주소 정보를 가져옵니다.
 * @returns {Promise<Object|null>} 검색 결과를 담은 객체를 반환하거나, 검색 실패 시 null을 반환합니다.
 */
NaverAPIs.prototype.mapSearch = async function (query, justWordingMode = false) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수 설정
  const { equalJson, requestSystem, emergencyAlarm, errorLog } = this.mother; // Mother 클래스의 메서드들을 사용하기 위해 가져옴
  const { chrome, naverMapUrl, naverMapSearch, fakeHeaders } = this; // 네이버 지도 관련 설정값들을 가져옴
  const querystring = require("querystring"); // querystring 모듈을 사용하여 쿼리 문자열을 생성

  try {
    // 쿼리 문자열 생성 (아파트 단어 제거, 검색 좌표 및 타입 설정)
    const queryStr = querystring.stringify({
      query: query.replace(/아파트/gi, ""),
      searchCoord: "127.05840838974427;37.75015390090829",
      type: "all",
      lang: "ko"
    });

    // 네이버 지도 검색 API 호출을 위한 URL 생성
    const targetUrl = naverMapUrl + naverMapSearch + "?" + queryStr;

    // 네이버 지도 API에 GET 요청을 보내고 결과를 받아옴
    const { data: queryResult } = await requestSystem(targetUrl, {}, {
      method: "get",
      headers: {
        ...fakeHeaders
      }
    });

    const { result } = queryResult; // 결과에서 필요한 부분 추출
    let targetAddress;
    let resultList;

    // 결과가 객체가 아닌 경우 오류를 발생시킴
    if (typeof result !== "object") {
      throw new Error("query fail");
    }

    targetAddress = null;

    // 도로명 주소나 지번 주소가 있는 경우 이를 처리
    if (result.address !== null) {    
      if (result.address.roadAddress !== null) {
        targetAddress = equalJson(JSON.stringify(result.address.roadAddress)); // 도로명 주소를 JSON 형태로 변환하여 처리
      } else {
        targetAddress = equalJson(JSON.stringify(result.address.jibunsAddress)); // 지번 주소를 JSON 형태로 변환하여 처리
      }

      // 주소 리스트에서 필요한 요소만 추출하여 결과 리스트 생성
      resultList = targetAddress.list;
      resultList = resultList.map((obj) => {
        if (typeof obj.addressElements !== "object" || typeof obj.siteRepName !== "string") {
          throw new Error("invalid address");
        }
        let latitude, longitude;
        latitude = 0;
        longitude = 0;
        if (!Number.isNaN(Number(obj.x))) {
          longitude = Number(obj.x); // 경도 값이 유효한 숫자인지 확인 후 저장
        }
        if (!Number.isNaN(Number(obj.y))) {
          latitude = Number(obj.y); // 위도 값이 유효한 숫자인지 확인 후 저장
        }
        return {
          name: (obj.addressElements.buildName === null || obj.addressElements.buildName === undefined) ? "" : (obj.addressElements.buildName.trim() === "" ? obj.siteRepName.trim() : obj.addressElements.buildName.trim()),
          address: obj.fullAddress, // 전체 주소
          latitude, // 위도
          longitude, // 경도
          elements: obj.addressElements, // 주소 구성 요소
        }
      });

    // 장소 검색 결과가 있는 경우 이를 처리
    } else if (result.place !== null) {
      resultList = result.place.list;
      resultList = resultList.map((obj) => {
        let thisComplexId;
        if (obj.poiInfo.land === null) {
          if (obj.theme !== null) {
            if (obj.theme.themeId !== null) {
              thisComplexId = obj.theme.themeId;
            } else {
              thisComplexId = "";
            }
          } else {
            thisComplexId = "";
          }
        } else {
          thisComplexId = obj.poiInfo.land.shapeKey.shapeID;
        }
        return {
          name: obj.name, // 장소 이름
          address: obj.roadAddress, // 도로명 주소
          elements: {
            id: obj.id, // 장소 ID
            bcode: '', // 행정 코드
            hcode: '', // 집계구 코드
            complexId: thisComplexId, // 복합 ID (건물 등)
          },
        }
      }).filter((obj) => {
        return obj.elements.complexId !== "" && obj.elements.complexId !== null;
      });

    } else {
      return null; // 결과가 없을 경우 null 반환
    }

    if (resultList.length === 0) {
      return null; // 결과 리스트가 비어있는 경우 null 반환
    }

    // justWordingMode가 활성화된 경우 추가적인 주소 정보 요청
    if (justWordingMode) {
      if (resultList[0].elements.bcode === '' && resultList[0].elements.hcode === '' && resultList[0].elements.complexId === '' && resultList[0].elements.id !== "") {
        const finalRes = await requestSystem("https://map.naver.com/v5/api/sites/summary/" + resultList[0].elements.id + "?lang=ko")
        if (finalRes.data.theme.isLand) {
          resultList[0].elements.complexId = finalRes.data.theme.extKey;
        }
      }
    }

    return {
      first: resultList[0], // 첫 번째 결과
      list: resultList, // 전체 결과 리스트
    }
  } catch (e) {
    await emergencyAlarm("NaverAPIs.mapSearch error : " + e.message); // 오류 발생 시 긴급 알림 전송
    await errorLog(e); // 오류 내용 콘솔 출력
    return null; // 오류 발생 시 null 반환
  }
}

/**
 * @method complexSearch
 * @description 네이버 지도와 네이버 부동산 API를 사용하여 복합 시설(단지 등)을 검색하는 메서드입니다.
 * @param {string} query - 검색할 쿼리 문자열입니다.
 * @param {boolean} complexIdMode - true인 경우, 복합 시설의 ID만 반환합니다.
 * @returns {Promise<Object|string|null>} 복합 시설 정보를 담은 객체, 복합 시설 ID 또는 null을 반환합니다.
 */
NaverAPIs.prototype.complexSearch = async function (query, complexIdMode = false) {
  const instance = this; // 현재 인스턴스를 참조하기 위한 변수 설정
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition, errorLog } = this.mother; // Mother 클래스의 메서드들을 사용하기 위해 가져옴
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey } = this; // 네이버 지도 및 네이버 부동산 관련 설정값들을 가져옴
  
  try {
    // 특정 주소에 대한 쿼리 문자열에서 불필요한 부분 제거
    query = query.replace(/전라남도 장성군 북이면 백양로 3/gi, "").trim();

    // 네이버 지도에서 쿼리 검색
    const naverMapResult = await this.mapSearch(query);
    
    if (naverMapResult === null) {
      // 검색 결과가 없는 경우 에러 발생
      throw new Error("no result");
    } else {
      // 네이버 부동산 API를 사용하여 복합 시설 검색
      const response = await requestSystem(naverLandUrl + "/api/search", { keyword: naverMapResult.first.name.replace(/아파트/gi, "").replace(/[0-9]단지/gi, '') }, { method: "get" });
      const { bcode, hcode } = naverMapResult.first.elements; // 검색 결과에서 행정 코드와 집계구 코드 추출
      let target, complexId;
      let resultObj;

      // deepLink에 복합 시설 ID가 있는 경우 이를 추출
      if (/\/complexes\/[0-9]+/g.test(response.data.deepLink)) {
        complexId = response.data.deepLink.split("/")[2].split("?")[0];
      } else {
        // 검색 결과에 복합 시설 ID가 없는 경우, 다른 방법으로 ID를 찾음
        if (bcode === "" && hcode === "" && typeof naverMapResult.first.elements.complexId === "string" && naverMapResult.first.elements.complexId !== "") {
          complexId = naverMapResult.first.elements.complexId;
        } else {
          // 복합 시설 리스트에서 bcode 또는 hcode와 일치하는 시설을 찾음
          if (!Array.isArray(response.data.complexes)) {
            throw new Error("there is no information");
          }
          if (response.data.complexes.length === 0) {
            throw new Error("there is no information 2");
          }
          target = response.data.complexes.find((obj) => {
            if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
              return true;
            } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
              return true;
            } else {
              return false;
            }
          });

          // 대상이 없을 경우, 첫 번째 결과를 기본으로 설정
          if (target === undefined && response.data.complexes.length === 1) {
            target = response.data.complexes[0];
          }

          // 여러 결과가 있는 경우, 위치를 기준으로 가장 가까운 시설을 선택
          if (target === undefined && response.data.complexes.length > 1) {
            if (typeof naverMapResult.first.longitude === "number") {
              response.data.complexes.sort((a, b) => {
                return (Math.abs(a.longitude - naverMapResult.first.longitude) + Math.abs(a.latitude - naverMapResult.first.latitude)) - (Math.abs(b.longitude - naverMapResult.first.longitude) + Math.abs(b.latitude - naverMapResult.first.latitude));
              })
              target = response.data.complexes.find((obj) => {
                let tempArr = obj.cortarAddress.split(" ");
                let tempArr2 = naverMapResult.first.address.split(" ");
                let boo;
                tempArr = tempArr.map((str) => { return str.slice(0, 2) });
                tempArr2 = tempArr2.map((str) => { return str.slice(0, 2) });
                boo = (tempArr[0] === tempArr2[0]) && (tempArr[1] === tempArr2[1]);
                if (boo) {
                  boo = Math.floor(naverMapResult.first.longitude * 1000) === Math.floor(obj.longitude * 1000) && Math.floor(naverMapResult.first.latitude * 1000) === Math.floor(obj.latitude * 1000);
                }
                return boo;
              });
            }
          }

          // 대상이 없을 경우 에러 발생
          if (target === undefined) {
            throw new Error("there is no information 3");
          }
          complexId = target.complexNo;
        }
      }

      // complexIdMode가 활성화된 경우, 복합 시설 ID만 반환
      if (complexIdMode) {
        return complexId;
      }

      // 복합 시설 모델링 수행
      resultObj = await this.complexModeling(complexId, naverMapResult);

      return resultObj;

    }
  } catch (e) {
    try {
      let justAddress;
    
      // 쿼리 문자열에서 '로' 또는 '길'로 끝나는 단어가 있는지 확인합니다.
      // 만약 없다면 '동', '로', '가'로 끝나는 단어까지의 주소를 추출합니다.
      // 예를 들어, "서울특별시 강남구 도산대로 123"이라는 쿼리가 주어지면, "서울특별시 강남구 도산대로"가 추출됩니다.
      if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
        // '로', '길'이 없는 경우 '동', '로', '가'로 끝나는 단어를 기준으로 주소의 앞 부분을 추출합니다.
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2).join(" ");
      } else {
        // '로', '길'로 끝나는 단어가 있는 경우 그 단어를 포함한 앞 부분을 추출합니다.
        justAddress = query.split(" ").slice(0, query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2).join(" ");
      }
    
      // 추출된 주소로 네이버 지도에서 검색을 수행합니다.
      const justAddressResult = await this.mapSearch(justAddress);
    
      if (justAddressResult === null) {
        // 검색 결과가 없을 경우 에러를 발생시킵니다.
        throw new Error("no result");
      } else {
        // 검색 결과가 있을 경우 네이버 부동산 API를 사용하여 해당 주소에 대한 상세 정보를 검색합니다.
        const response = await requestSystem(naverLandUrl + "/api/search", { keyword: justAddressResult.first.name }, { method: "get" });
        const { bcode, hcode } = justAddressResult.first.elements; // 검색 결과에서 행정 코드(bcode)와 집계구 코드(hcode)를 추출합니다.
        let target, complexId;
        let resultObj;
    
        // 만약 bcode와 hcode가 비어있고, 검색 결과에 complexId가 존재하는 경우 그 complexId를 사용합니다.
        if (bcode === "" && hcode === "" && typeof justAddressResult.first.elements.complexId === "string" && justAddressResult.first.elements.complexId !== "") {
          complexId = justAddressResult.first.elements.complexId;
        } else {
          // 검색 결과에서 complexId가 없는 경우, response 데이터에서 complexId를 찾습니다.
          if (!Array.isArray(response.data.complexes)) {
            // response 데이터가 배열 형태가 아니라면 에러를 발생시킵니다.
            throw new Error("there is no information");
          }
          if (response.data.complexes.length === 0) {
            // 배열이 비어있다면 에러를 발생시킵니다.
            throw new Error("there is no information 2");
          }
    
          // bcode 또는 hcode와 일치하는 complex를 찾습니다.
          target = response.data.complexes.find((obj) => {
            if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
              return true;
            } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
              return true;
            } else {
              return false;
            }
          });
    
          // 만약 찾지 못했다면, 에러를 발생시킵니다.
          if (target === undefined) {
            throw new Error("there is no information 3");
          }
    
          // 찾은 complex의 ID를 complexId에 할당합니다.
          complexId = target.complexNo;
        }
    
        // 만약 complexIdMode가 true라면, complexId만 반환합니다.
        if (complexIdMode) {
          return complexId;
        }
    
        // complexId를 기반으로 복합 시설의 모델링을 수행하고, 그 결과를 반환합니다.
        resultObj = await this.complexModeling(complexId, justAddressResult);
    
        return resultObj;
      }
    } catch (e) {
      try {
        let nameAddress;
    
        // 쿼리 문자열에서 '로' 또는 '길'로 끝나는 단어가 있는지 확인하고,
        // 그 이후의 문자열을 별도로 추출합니다.
        if (query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) === -1) {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[동로가]$/gi.test(str) }) + 2);
        } else {
          nameAddress = query.split(" ").slice(query.split(" ").findIndex((str) => { return /[로길]$/gi.test(str) }) + 2);
        }
    
        // 추출된 문자열에서 '동' 또는 '호'로 끝나는 단어를 제거합니다.
        nameAddress = nameAddress.filter((str) => { return !/[동호]$/gi.test(str.trim()) });
        nameAddress = nameAddress.join(" "); // 문자열을 합쳐서 완성된 주소로 만듭니다.
    
        // 이름과 주소를 기반으로 네이버 지도에서 검색을 수행합니다.
        const nameAddressResult = await this.mapSearch(nameAddress);
    
        if (nameAddressResult === null) {
          // 검색 결과가 없으면 에러를 발생시킵니다.
          throw new Error("no result");
        } else {
          // 검색 결과가 있을 경우, 네이버 부동산 API를 사용하여 복합 시설을 검색합니다.
          const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
          const { bcode, hcode } = nameAddressResult.first.elements;
          let target, complexId;
          let resultObj;
    
          if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
            complexId = nameAddressResult.first.elements.complexId;
          } else {
            if (!Array.isArray(response.data.complexes)) {
              throw new Error("there is no information");
            }
            if (response.data.complexes.length === 0) {
              throw new Error("there is no information 2");
            }
            target = response.data.complexes.find((obj) => {
              if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                return true;
              } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                return true;
              } else {
                return false;
              }
            })
            if (target === undefined) {
              throw new Error("there is no information 3");
            }
            complexId = target.complexNo;
          }
    
          if (complexIdMode) {
            return complexId;
          }
          resultObj = await this.complexModeling(complexId, nameAddressResult);
          return resultObj;
        }
      } catch (e) {
        try {
          // 입력된 query 문자열을 공백으로 구분하여 배열로 나누고, 각 요소에서 불필요한 특수문자(콤마, 괄호 등)를 제거합니다.
          const targetWordsArr = query
            .split(" ")
            .map((str) => {
              return str.trim().replace(/[\, \(\)]/gi, ''); // 문자열에서 특수문자 제거
            })
            .filter((str) => {
              return !/[0-9]$/gi.test(str); // 숫자로 끝나는 문자열 제거
            })
            .filter((str) => {
              return !/[동로가]$/gi.test(str); // '동', '로', '가'로 끝나는 문자열 제거
            })
            .filter((str) => {
              return !/[로길]$/gi.test(str); // '로', '길'로 끝나는 문자열 제거
            })
            .filter((str) => {
              return !/[호]$/gi.test(str); // '호'로 끝나는 문자열 제거
            });
        
          // 처리된 배열의 마지막 요소를 targetWords로 지정
          const targetWords = targetWordsArr[targetWordsArr.length - 1];
        
          // targetWords를 이용해 네이버 지도에서 검색 수행
          const nameAddressResult = await this.mapSearch(targetWords, true);
        
          if (nameAddressResult === null) {
            // 검색 결과가 없으면 예외를 발생시킴
            throw new Error("no result");
          } else {
            // 검색 결과가 있는 경우, 네이버 부동산 API를 통해 추가 정보를 조회
            const response = await requestSystem(naverLandUrl + "/api/search", { keyword: nameAddressResult.first.name }, { method: "get" });
            const { bcode, hcode } = nameAddressResult.first.elements; // 검색 결과에서 bcode와 hcode 추출
            let target, complexId;
            let resultObj;
        
            // bcode와 hcode가 비어있고, 검색 결과에 complexId가 있으면 그것을 사용
            if (bcode === "" && hcode === "" && typeof nameAddressResult.first.elements.complexId === "string" && nameAddressResult.first.elements.complexId !== "") {
              complexId = nameAddressResult.first.elements.complexId;
            } else {
              // complexId가 없을 경우, response에서 complexId를 찾음
              if (!Array.isArray(response.data.complexes)) {
                throw new Error("there is no information"); // 데이터가 배열이 아닌 경우 예외 발생
              }
              if (response.data.complexes.length === 0) {
                throw new Error("there is no information 2"); // 데이터 배열이 비어 있는 경우 예외 발생
              }
        
              // bcode 또는 hcode와 일치하는 복합 단지를 찾음
              target = response.data.complexes.find((obj) => {
                if (bcode !== "" && String(obj.cortarNo) === String(bcode)) {
                  return true;
                } else if (hcode !== "" && String(obj.cortarNo) === String(hcode)) {
                  return true;
                } else {
                  return false;
                }
              });
        
              if (target === undefined) {
                throw new Error("there is no information 3"); // 해당 단지를 찾지 못하면 예외 발생
              }
        
              // 찾은 단지의 complexNo를 complexId에 할당
              complexId = target.complexNo;
            }
        
            // complexIdMode가 활성화된 경우 complexId만 반환
            if (complexIdMode) {
              return complexId;
            }
        
            // complexId를 기반으로 복합 단지 모델링을 수행하고 결과를 반환
            resultObj = await this.complexModeling(complexId, nameAddressResult);
            return resultObj;
          }
        } catch (e) {
          // 예외 발생 시 에러 로그를 출력하고 null을 반환
          await errorLog(e);
          return null;
        }
      }
    }
  }
}

/**
 * 주어진 complexId를 기반으로 복합 단지의 상세 정보를 모델링합니다.
 * 네이버 지도 검색 결과를 이용해 복합 단지의 위치 정보와 상세 정보를 수집합니다.
 * @param {string} complexId - 네이버 부동산에서 사용되는 복합 단지의 고유 ID.
 * @param {object} [naverMapResult=null] - 네이버 지도 검색 결과 객체 (선택적).
 * @returns {object|null} 복합 단지의 상세 정보가 포함된 객체를 반환하며, 오류 발생 시 null을 반환합니다.
 */
NaverAPIs.prototype.complexModeling = async function (complexId, naverMapResult = null) {
  const instance = this;
  const { equalJson, requestSystem, dateToString, stringToDate, zeroAddition, emergencyAlarm, errorLog } = this.mother; // Mother 객체에서 필요한 메서드들을 구조 분해 할당
  const { chrome, naverMapUrl, naverMapSearch, naverLandUrl, naverLandAuthorizationKey, complexIdKeyword } = this; // 현재 인스턴스에서 필요한 속성들을 구조 분해 할당
  try {
    let resultObj; // 결과를 저장할 객체 선언
    let complexDetail, complexPyeongDetailList; // 복합 단지의 상세 정보와 평형별 상세 정보를 저장할 변수 선언
    let addressValue; // 복합 단지의 주소 정보를 저장할 변수 선언

    // 네이버 부동산 API를 통해 복합 단지 상세 정보를 가져옴
    ({ complexDetail, complexPyeongDetailList } = (await chrome.frontScript(naverLandUrl + "/complexes/" + complexId, (async function () {
      const res = await fetch("/api/complexes/__complexId__?sameAddressGroup=false", { 
        headers: { "Authorization": "Bearer " + "__authorizationKey__" } }) // API 호출 시 필요한 인증 키 설정
      const json = await res.json(); // 응답을 JSON 형식으로 파싱
      return JSON.stringify(json); // JSON 객체를 문자열로 변환하여 반환
    }).toString().trim().replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '').replace(/__authorizationKey__/gi, naverLandAuthorizationKey).replace(/__complexId__/gi, complexId))));

    // 도로명 주소가 존재하면 이를 사용, 그렇지 않으면 기본 주소 사용
    if (complexDetail.roadAddress !== undefined) {
      addressValue = (complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress).trim() === "" ? 
        complexDetail.address + " " + complexDetail.detailAddress : 
        complexDetail.roadAddressPrefix + " " + complexDetail.roadAddress;
    } else {
      addressValue = complexDetail.address;
    }
    
    // naverMapResult가 없으면 주소를 이용해 네이버 지도에서 검색 수행
    if (naverMapResult === null) {
      naverMapResult = await this.mapSearch(addressValue);
    }

    resultObj = {}; // 결과 객체 초기화
    resultObj.id = complexIdKeyword + complexDetail.complexNo; // 복합 단지의 고유 ID 생성
    resultObj.naver = complexId; // 네이버에서 사용하는 복합 단지 ID 저장
    resultObj.name = complexDetail.complexName; // 복합 단지 이름 저장
    resultObj.date = new Date(); // 현재 날짜를 저장
    resultObj.address = { // 주소 정보 저장
      value: addressValue, // 주소 값 저장
      latitude: complexDetail.latitude, // 위도 정보 저장
      longitude: complexDetail.longitude, // 경도 정보 저장
      zipCode: complexDetail.roadZipCode === undefined ? "" : complexDetail.roadZipCode, // 우편번호 저장 (존재하지 않으면 빈 문자열)
      detail: naverMapResult === null ? {} : naverMapResult.first.elements, // 네이버 지도 검색 결과의 상세 정보 저장
    }
    resultObj.information = {}; // 복합 단지의 추가 정보를 저장할 객체 초기화

    // 사용 승인일 정보를 저장, 존재하지 않으면 기본 값으로 설정
    if (complexDetail.useApproveYmd.length > 6) {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4, 6)) - 1, Number(complexDetail.useApproveYmd.slice(6)));
    } else {
      resultObj.information.date = new Date(Number(complexDetail.useApproveYmd.slice(0, 4)), Number(complexDetail.useApproveYmd.slice(4)) - 1, 1);
    }
    
    // 가구수, 동수, 주차 가능 대수 정보를 저장
    resultObj.information.count = {
      household: complexDetail.totalHouseholdCount,
      dong: complexDetail.totalDongCount,
      parking: complexDetail.parkingPossibleCount,
    };
    
    // 층수 정보를 저장 (저층, 고층)
    resultObj.information.floor = {
      low: complexDetail.lowFloor,
      high: complexDetail.highFloor,
    };
    
    // 평형별 상세 정보를 저장
    resultObj.information.type = {};
    resultObj.information.type.length = complexPyeongDetailList.length; // 평형의 개수 저장
    resultObj.information.type.detail = complexPyeongDetailList.map((obj) => { // 각 평형에 대한 상세 정보 저장
      return {
        name: obj.pyeongName, // 평형 이름
        area: { // 면적 정보
          supply: obj.supplyAreaDouble, // 공급 면적
          exclusive: Number(obj.exclusiveArea), // 전용 면적
          pyeong: Number(obj.supplyPyeong), // 공급 면적(평형)
          exclusivePyeong: Number(obj.exclusivePyeong), // 전용 면적(평형)
        },
        count: { // 해당 평형의 가구 수, 방 수, 화장실 수 저장
          household: Number.isNaN(Number(obj.householdCountByPyeong)) ? 0 : Number(obj.householdCountByPyeong),
          room: Number.isNaN(Number(obj.roomCnt)) ? 0 : Number(obj.roomCnt),
          bathroom: Number.isNaN(Number(obj.bathroomCnt)) ? 0 : Number(obj.bathroomCnt),
        }
      }
    });

    return resultObj; // 모델링된 결과 객체를 반환

  } catch (e) {
    await emergencyAlarm("NaverAPIs.complexModeling error : " + e.message); // 예외 발생 시 알림 전송
    await errorLog(e); // 예외 내용을 콘솔에 출력
    return null; // 오류 발생 시 null 반환
  }
}

module.exports = NaverAPIs;
