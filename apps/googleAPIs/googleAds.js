/**
 * GoogleAds 클래스는 Google Ads API와의 상호작용을 위한 클래스로,
 * 광고 캠페인 데이터를 조회하고, MongoDB에 저장하는 등의 작업을 수행합니다.
 *
 * @param {object|null} mother - Mother 클래스의 인스턴스입니다. null일 경우, 내부에서 생성됩니다.
 * @param {object|null} back - BackMaker 클래스의 인스턴스입니다. null일 경우, 내부에서 생성됩니다.
 * @param {object|null} address - 시스템 설정 정보 객체입니다. null일 경우, 내부에서 생성됩니다.
 * @class
 */
const GoogleAds = function (mother = null, back = null, address = null) {
  // mother, back, address가 null이 아닐 경우, 외부에서 제공된 인스턴스를 사용합니다.
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    // mother, back, address가 null일 경우, 내부에서 직접 생성하여 초기화합니다.
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();  // Mother 클래스의 인스턴스를 생성하여 this.mother에 할당합니다.
    this.back = new BackMaker();  // BackMaker 클래스의 인스턴스를 생성하여 this.back에 할당합니다.
    this.address = ADDRESS;  // 시스템 설정 정보 객체를 this.address에 할당합니다.
  }
  // Google API 관련 작업이 수행될 디렉토리 경로를 this.dir에 할당합니다.
  this.dir = process.cwd() + "/apps/googleAPIs";
}

/**
 * 광고 캠페인의 일일 데이터를 수집하고 MongoDB에 저장하는 메서드입니다.
 *
 * @param {object} selfMongo - MongoDB 연결 객체입니다.
 * @param {number} [dayNumber=3] - 수집할 데이터의 일 수입니다.
 * @param {object|null} logger - 로그를 기록하기 위한 로거 객체입니다. null일 경우 로깅을 수행하지 않습니다.
 * @returns {Promise<void>}
 */
GoogleAds.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  const instance = this;  // GoogleAds 클래스의 인스턴스를 instance에 할당하여 내부에서 참조할 수 있게 합니다.
  const back = this.back;  // BackMaker 인스턴스를 back에 할당하여 백엔드 관련 작업을 수행할 수 있게 합니다.
  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, emergencyAlarm, zeroAddition } = this.mother;
  
  try {
    const campaignCollection = "dailyCampaign";  // MongoDB에서 사용할 컬렉션 이름을 정의합니다.
    let startDate;  // 수집을 시작할 날짜를 저장할 변수입니다.
    let res;  // API 응답 데이터를 저장할 변수입니다.
    let from, to;  // 데이터 수집의 시작 및 종료 날짜를 저장할 변수입니다.
    let key;  // 각 캠페인 데이터를 고유하게 식별하기 위한 키입니다.
    let json;  // MongoDB에 저장할 데이터를 JSON 형식으로 저장할 변수입니다.
    let tempRows;  // 기존 MongoDB 데이터 조회 결과를 저장할 변수입니다.
    let now;  // 현재 날짜와 시간을 저장할 변수입니다.
    let targetRows;  // 처리된 캠페인 데이터를 저장할 배열입니다.

    // 현재 날짜를 now에 저장합니다.
    now = new Date();
    // startDate를 현재 날짜로 초기화합니다.
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 수집할 일 수(dayNumber)에 따라 startDate를 조정합니다.
    for (let i = 0; i < (dayNumber - 1); i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // 지정된 일 수만큼 데이터를 수집합니다.
    for (let i = 0; i < dayNumber; i++) {
      await sleep(500);  // 각 요청 사이에 500ms의 지연 시간을 줍니다.

      if (i === 0) {
        // 첫 번째 반복에서 수집 기간의 시작과 끝 날짜를 설정합니다.
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        // 이후 반복에서는 수집 기간을 하루씩 증가시킵니다.
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      // Python 스크립트를 실행하여 Google Ads API로부터 데이터를 가져옵니다.
      res = await pythonExecute(`${this.dir}/python/app.py`, [ "ads", "getCampaignList" ], { date: dateToString(from) });

      // API 응답 데이터가 배열인지 확인하고, 배열일 경우 데이터를 처리합니다.
      if (Array.isArray(res)) {
        // 응답 데이터를 가공하여 필요한 정보만 포함된 객체로 변환합니다.
        targetRows = res.map((obj) => {
          return {
            id: obj.id,  // 캠페인 ID
            account: obj.account,  // 광고 계정 ID
            name: obj.name,  // 캠페인 이름
            type: obj.type.replace(/^AdvertisingChannelType\./i, ''),  // 광고 채널 유형에서 접두사를 제거합니다.
            cost: Math.round(Number(obj.cost_micros) / 1000000),  // 비용을 마이크로 단위에서 표준 단위로 변환합니다.
            impressions: Number(obj.impressions),  // 노출 수를 숫자로 변환합니다.
            clicks: Number(obj.clicks),  // 클릭 수를 숫자로 변환합니다.
          };
        }).filter((obj) => {
          // 비용, 노출 수, 클릭 수가 모두 0인 데이터는 제외합니다.
          return !(obj.cost === 0 && obj.impressions === 0 && obj.clicks === 0);
        });
  
        num = 0;  // 캠페인 ID에 대한 고유 키를 생성하기 위한 숫자 카운터입니다.
  
        for (let obj of targetRows) {
          // 캠페인 데이터를 고유하게 식별하기 위한 키를 생성합니다.
          key = dateToString(from).replace(/\-/gi, '') + "_" + obj.id;
  
          // MongoDB에 저장할 데이터를 JSON 형식으로 구성합니다.
          json = {
            camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'g' + String.fromCharCode(97 + num) + zeroAddition(from.getDate()) + 's',
            key,
            date: { from, to },  // 데이터 수집 기간을 포함합니다.
            value: {
              charge: Number(obj.cost),  // 비용을 포함합니다.
              performance: {
                impressions: Number(obj.impressions),  // 노출 수를 포함합니다.
                clicks: Number(obj.clicks),  // 클릭 수를 포함합니다.
              },
            },
            information: {
              mother: "google",  // 데이터 출처를 포함합니다.
              type: obj.type,  // 광고 채널 유형을 포함합니다.
              id: {
                account: obj.account,  // 광고 계정 ID를 포함합니다.
                campaign: obj.id,  // 캠페인 ID를 포함합니다.
              },
              name: obj.name,  // 캠페인 이름을 포함합니다.
            }
          };
  
          // 기존에 동일한 키를 가진 데이터가 있는지 확인합니다.
          tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
          if (tempRows.length !== 0) {
            // 기존 데이터가 있으면 삭제합니다.
            await back.mongoDelete(campaignCollection, { key }, { selfMongo });
          }
          // 새 데이터를 MongoDB에 저장합니다.
          await back.mongoCreate(campaignCollection, json, { selfMongo });
          console.log(json);  // 저장된 데이터를 콘솔에 출력합니다.
          num++;  // 카운터를 증가시켜 다음 캠페인 ID에 고유 키를 부여합니다.
        }
      }
    }

    // 로거가 제공된 경우, 작업 완료 메시지를 기록합니다.
    if (logger !== null) {
      logger.cron("google daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    // 오류 발생 시 긴급 알람을 발송하고, 오류 메시지를 출력합니다.
    emergencyAlarm("GoogleAds.dailyCampaign error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

/**
 * 주어진 날짜에 대한 광고 캠페인 데이터를 가져오는 메서드입니다.
 * 이 메서드는 특정 날짜의 Google Ads 캠페인 데이터를 조회하고, 필요한 정보만을 추출하여 반환합니다.
 *
 * @param {Date} targetDate - 조회할 날짜입니다. Date 객체여야 하며, 'YYYY-MM-DD' 형식으로 변환되어 사용됩니다.
 * @returns {Promise<Array<Object>>} - 조회된 캠페인 데이터를 배열로 반환합니다. 각 객체는 캠페인 관련 정보를 포함합니다.
 */
GoogleAds.prototype.getCampaignsByDate = async function (targetDate) {

  // GoogleAds 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // BackMaker 인스턴스를 back에 할당하여 백엔드 관련 작업을 수행할 수 있게 합니다.
  const back = this.back;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // sleep: 비동기 함수에서 지연을 주는 유틸리티 메서드
  // dateToString: Date 객체를 문자열로 변환하는 메서드
  // stringToDate: 문자열을 Date 객체로 변환하는 메서드
  // requestSystem: HTTP 요청을 수행하는 유틸리티 메서드
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // emergencyAlarm: 오류 발생 시 알림을 보내는 유틸리티 메서드
  // zeroAddition: 숫자를 두 자리 문자열로 변환하는 메서드
  const { sleep, dateToString, stringToDate, requestSystem, pythonExecute, emergencyAlarm, zeroAddition } = this.mother;
  
  try {
    let res;  // API 응답 데이터를 저장할 변수입니다.
    let targetRows;  // 가공된 캠페인 데이터를 저장할 배열입니다.
    let num;  // 캠페인 데이터를 고유하게 식별하기 위한 카운터입니다.
    let key, json;  // MongoDB에 저장할 데이터를 구성하는 데 사용할 변수들입니다.
    let from, to;  // 데이터 수집의 시작 및 종료 날짜를 저장할 변수입니다.
    let result;  // 최종적으로 반환할 결과 배열입니다.

    // targetDate가 Date 객체가 아닌 경우, 에러를 던집니다.
    if (!(targetDate instanceof Date)) {
      throw new Error("invalid input");
    }

    // 수집 기간의 시작과 끝 날짜를 설정합니다.
    from = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
    to = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
    to.setDate(to.getDate() + 1);

    // Python 스크립트를 실행하여 Google Ads API로부터 데이터를 가져옵니다.
    res = await pythonExecute(`${this.dir}/python/app.py`, [ "ads", "getCampaignList" ], { date: dateToString(targetDate) });
    
    // API 응답 데이터가 배열인지 확인하고, 배열일 경우 데이터를 처리합니다.
    if (Array.isArray(res)) {
      // 응답 데이터를 가공하여 필요한 정보만 포함된 객체로 변환합니다.
      targetRows = res.map((obj) => {
        return {
          id: obj.id,  // 캠페인 ID
          account: obj.account,  // 광고 계정 ID
          name: obj.name,  // 캠페인 이름
          type: obj.type.replace(/^AdvertisingChannelType\./i, ''),  // 광고 채널 유형에서 접두사를 제거합니다.
          cost: Math.round(Number(obj.cost_micros) / 1000000),  // 비용을 마이크로 단위에서 표준 단위로 변환합니다.
          impressions: Number(obj.impressions),  // 노출 수를 숫자로 변환합니다.
          clicks: Number(obj.clicks),  // 클릭 수를 숫자로 변환합니다.
          interactions: Number(obj.interactions),  // 상호작용 수를 숫자로 변환합니다.
        };
      }).filter((obj) => {
        // 비용, 노출 수, 클릭 수가 모두 0인 데이터는 제외합니다.
        return !(obj.cost === 0 && obj.impressions === 0 && obj.clicks === 0);
      });

      num = 0;  // 캠페인 ID에 대한 고유 키를 생성하기 위한 숫자 카운터입니다.
      result = [];  // 최종적으로 반환할 결과 배열을 초기화합니다.

      for (let obj of targetRows) {
        // 캠페인 데이터를 고유하게 식별하기 위한 키를 생성합니다.
        key = dateToString(targetDate).replace(/\-/gi, '') + "_" + obj.id;

        console.log(obj);  // 처리된 캠페인 데이터를 콘솔에 출력합니다.

        // 결과 배열에 추가할 데이터를 JSON 형식으로 구성합니다.
        json = {
          key,
          date: { from, to },  // 데이터 수집 기간을 포함합니다.
          value: {
            charge: Number(obj.cost),  // 비용을 포함합니다.
            performance: {
              impressions: Number(obj.impressions),  // 노출 수를 포함합니다.
              clicks: Number(obj.clicks),  // 클릭 수를 포함합니다.
              interactions: Number(obj.interactions),  // 상호작용 수를 포함합니다.
            },
          },
          information: {
            mother: "google",  // 데이터 출처를 포함합니다.
            type: obj.type,  // 광고 채널 유형을 포함합니다.
            id: {
              account: obj.account,  // 광고 계정 ID를 포함합니다.
              campaign: obj.id,  // 캠페인 ID를 포함합니다.
            },
            name: obj.name,  // 캠페인 이름을 포함합니다.
          }
        };

        // 결과 배열에 구성된 JSON 데이터를 추가합니다.
        result.push(json);
        num++;  // 카운터를 증가시켜 다음 캠페인 ID에 고유 키를 부여합니다.
      }

      return result;  // 최종적으로 가공된 캠페인 데이터 배열을 반환합니다.

    } else {
      return [];  // API 응답이 배열이 아닐 경우 빈 배열을 반환합니다.
    }

  } catch (e) {
    // 오류 발생 시 긴급 알람을 발송하고, 오류 메시지를 출력합니다.
    emergencyAlarm("GoogleAds.getCampaignsByDate error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

/**
 * Google Ads, YouTube, 그리고 Google Analytics 데이터를 통합하여 MongoDB에 저장하는 메서드입니다.
 * 이 메서드는 지정된 기간 동안의 데이터 수집, 분석, 가공을 수행한 후 결과를 MongoDB에 저장합니다.
 *
 * @param {object} selfMongo - MongoDB 연결 객체입니다.
 * @param {number} [dayNumber=3] - 수집할 데이터의 일 수입니다.
 * @param {object|null} logger - 로그를 기록하기 위한 로거 객체입니다. null일 경우 로깅을 수행하지 않습니다.
 * @returns {Promise<boolean>} - 작업이 성공적으로 완료되었는지 여부를 반환합니다.
 */
GoogleAds.prototype.googleComplex = async function (selfMongo, dayNumber = 3, logger = null) {
  
  // GoogleAds 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // BackMaker 인스턴스를 back에 할당하여 백엔드 관련 작업을 수행할 수 있게 합니다.
  const back = this.back;

  // Google Analytics와 상호작용하기 위한 GoogleAnalytics 클래스를 로드하고 인스턴스를 생성합니다.
  const GoogleAnalytics = require(this.dir + "/googleAnalytics.js");
  const analytics = new GoogleAnalytics();

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // sleep: 비동기 함수에서 지연을 주는 유틸리티 메서드
  // dateToString: Date 객체를 문자열로 변환하는 메서드
  // stringToDate: 문자열을 Date 객체로 변환하는 메서드
  // sha256Hmac: SHA-256 HMAC 암호화 메서드
  // requestSystem: HTTP 요청을 수행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  // emergencyAlarm: 오류 발생 시 알림을 보내는 유틸리티 메서드
  // zeroAddition: 숫자를 두 자리 문자열로 변환하는 메서드
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // equalJson: JSON 데이터를 비교 및 변환하는 유틸리티 메서드
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, pythonExecute, equalJson } = this.mother;
  
  try {
    const collection = "googleComplex";  // MongoDB에서 사용할 컬렉션 이름을 정의합니다.
    const idKeyword = 'f';  // ID를 생성할 때 사용할 키워드입니다.
    const googleKeyword = 'g';  // Google과 관련된 데이터를 나타내는 키워드입니다.
    const googleKeyKeyword = "google";  // Google 키워드로 사용할 문자열입니다.
    let tempRows;  // MongoDB에서 조회한 기존 데이터를 저장할 변수입니다.
    let res;  // Python 스크립트 또는 API 응답 데이터를 저장할 변수입니다.
    let json;  // MongoDB에 저장할 데이터를 JSON 형식으로 구성할 변수입니다.
    let from, to;  // 데이터 수집의 시작 및 종료 날짜를 저장할 변수입니다.
    let startDate;  // 수집을 시작할 날짜를 저장할 변수입니다.
    let num;  // 캠페인 데이터를 고유하게 식별하기 위한 카운터입니다.
    let key;  // 각 캠페인 데이터를 고유하게 식별하기 위한 키입니다.
    let now;  // 현재 날짜와 시간을 저장할 변수입니다.
    let campaignId;  // 캠페인 ID를 저장할 변수입니다.
    let adsetId;  // 광고 세트 ID를 저장할 변수입니다.
    let targetObj;  // 특정 데이터를 처리하기 위한 임시 객체입니다.
    let campaigns;  // 수집된 캠페인 데이터를 저장할 배열입니다.
    let views, likes, shares, followers;  // YouTube 데이터 (조회수, 좋아요, 공유수, 팔로워수)를 저장할 변수입니다.
    let report;  // Google Analytics 보고서 데이터를 저장할 변수입니다.

    // 현재 날짜를 now에 저장합니다.
    now = new Date();
    // startDate를 현재 날짜로 초기화합니다.
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    // 지정된 일 수(dayNumber)만큼 데이터를 수집할 수 있도록 startDate를 조정합니다.
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // 지정된 일 수만큼 데이터를 수집합니다.
    for (let i = 0; i < dayNumber; i++) {

      await sleep(500);  // 각 요청 사이에 500ms의 지연 시간을 줍니다.
      
      // 수집 기간의 시작과 끝 날짜를 설정합니다.
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      // 각 데이터 세트에 대해 고유한 키를 생성합니다.
      key = dateToString(from).replace(/\-/gi, '') + "_" + googleKeyKeyword;
      
      // MongoDB에 저장할 데이터를 JSON 형식으로 초기화합니다.
      json = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + googleKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0,
            performance: {
              interactions: 0,
              impressions: 0,
              clicks: 0
            },
            length: {
              campaign: 0,
            }
          },
          campaign: [],
        },
        youtube: {
          profile: {
            followers: 0
          },
          performance: {
            views: 0,
            likes: 0,
            shares: 0
          }
        },
        search: {
          clicks: 0,
          impressions: 0,
          detail: [],
        }
      };

      // Google Ads API를 통해 캠페인 데이터를 수집합니다.
      campaigns = await this.getCampaignsByDate(from);
      for (let campaign of campaigns) {
        json.advertisement.campaign.push({
          value: {
            charge: campaign.value.charge,  // 캠페인 비용을 포함합니다.
            performance: {
              interactions: campaign.value.performance.interactions,  // 상호작용 수를 포함합니다.
              impressions: campaign.value.performance.impressions,  // 노출 수를 포함합니다.
              clicks: campaign.value.performance.clicks,  // 클릭 수를 포함합니다.
            }
          },
          information: {
            id: campaign.information.id.campaign,  // 캠페인 ID를 포함합니다.
            account: campaign.information.id.account,  // 광고 계정 ID를 포함합니다.
            name: campaign.information.name,  // 캠페인 이름을 포함합니다.
          }
        });
      }
      
      // 캠페인 데이터를 종합하여 총합을 계산합니다.
      json.advertisement.value.length.campaign = json.advertisement.campaign.length;  // 총 캠페인 수
      json.advertisement.value.charge = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge }, 0);  // 총 비용
      json.advertisement.value.performance.interactions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.interactions }, 0);  // 총 상호작용 수
      json.advertisement.value.performance.impressions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);  // 총 노출 수
      json.advertisement.value.performance.clicks = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);  // 총 클릭 수
  
      // YouTube 채널 데이터를 수집합니다.
      res = await pythonExecute(`${this.dir}/python/app.py`, [ "youtube", "channelNumbers" ], { startDate: dateToString(from), endDate: dateToString(from) });
      if (!Array.isArray(res)) {
        views = 0;
        likes = 0;
        followers = 0;
        shares = 0;
      } else {
        if (!res.every((s) => { return typeof s === "number" })) {
          views = 0;
          likes = 0;
          followers = 0;
          shares = 0;
        } else {
          [ views, likes, followers, shares ] = res;  // YouTube 조회수, 좋아요, 팔로워, 공유수 데이터를 할당합니다.
        }
      }
      json.youtube = {
        profile: {
          followers  // 팔로워 수를 포함합니다.
        },
        performance: {
          views,  // 조회수를 포함합니다.
          likes,  // 좋아요 수를 포함합니다.
          shares  // 공유 수를 포함합니다.
        }
      };

      // Google Analytics 데이터를 수집합니다.
      report = await analytics.googleQuery(from);
      if (report !== null) {
        json.search = equalJson(JSON.stringify(report.data));  // 검색 데이터를 JSON 형식으로 변환하여 저장합니다.
      }

      // 데이터를 MongoDB에 저장합니다.
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      await back.mongoCreate(collection, json, { selfMongo });
      console.log(json);  // 저장된 데이터를 콘솔에 출력합니다.
      
    }

    // 로거가 제공된 경우, 작업 완료 메시지를 기록합니다.
    if (logger !== null) {
      logger.cron("google complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return true;  // 작업이 성공적으로 완료되었음을 반환합니다.

  } catch (e) {
    // 오류 발생 시 긴급 알람을 발송하고, 오류 메시지를 출력합니다.
    emergencyAlarm("GoogleAds.googleComplex error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
    return false;  // 작업이 실패했음을 반환합니다.
  }
}

module.exports = GoogleAds;
