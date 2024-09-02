/**
 * FacebookAPIs 클래스 생성자 함수입니다.
 * 이 클래스는 Facebook과 Instagram의 API를 사용하여 광고 및 관련 데이터를 관리합니다.
 * @param {object} [mother=null] - Mother 클래스의 인스턴스.
 * @param {object} [back=null] - BackMaker 클래스의 인스턴스.
 * @param {object} [address=null] - 주소 정보 객체.
 */
const FacebookAPIs = function (mother = null, back = null, address = null) {
  // 전달된 mother, back, address 객체가 null이 아닌 경우 해당 객체를 인스턴스에 할당
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother; // mother 객체를 this.mother에 할당
    this.back = back; // back 객체를 this.back에 할당
    this.address = address; // address 객체를 this.address에 할당
  } else {
    // mother, back, address가 null일 경우 모듈을 require하여 초기화
    const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스 로드
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스 로드
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js"); // 주소 정보 객체 로드
    this.mother = new Mother(); // Mother 클래스의 인스턴스를 생성하여 this.mother에 할당
    this.back = new BackMaker(); // BackMaker 클래스의 인스턴스를 생성하여 this.back에 할당
    this.address = ADDRESS; // ADDRESS 객체를 this.address에 할당
  }

  // 현재 작업 디렉토리를 기준으로 Facebook APIs의 디렉토리 경로를 설정
  this.dir = process.cwd() + "/apps/facebookAPIs";

  // Facebook Graph API의 기본 URL 설정
  this.facebookUrl = "https://graph.facebook.com";
  // Facebook App ID 설정
  this.facebookAppId = "4385911554783319";
  // Facebook App Secret 설정
  this.facebookAppSecret = "5c9ad0873f5983081b8ad1ba1855806e";
  // Facebook API 토큰 설정
  this.facebookToken = "EAAZBU9pw9OFcBO0a81H4j76O3X6eChLCasDzmpdxrVnVYWpXCZCr0cfTmlYCNPc46D3d6whJoQHvWZCk0JUuzdG2PTDn4ccvtbWWRRrC2SMZBxSZA4ewUH8ZCgMZCLC5csAbND94viqf6kacJQ5Y3E4SsYQsvPitxmtHcgP6uNYPCLKW9H7ZBZCQtPfMPJMYJTkhC";
  // 관리할 Facebook 페이지 ID 설정
  this.facebookPageId = "290144638061244";
  // 관리할 Instagram ID 설정
  this.instagramId = "17841405547472752";
  // 관리할 Facebook 광고 계정 ID 설정
  this.facebookAdId = "505249990112820";
  // 사용자 ID 설정
  this.facebookUserId = "192515798954554";
  // 광고 계정 ID에 "act_"를 접두사로 추가하여 설정
  this.facebookAdAccountId = "act_" + this.facebookAdId;
  // Facebook Pixel ID 설정
  this.pixelId = "814052605684956";
  // 사용할 Facebook API 버전 설정
  this.appVersion = "v19.0";

  // facebook-nodejs-business-sdk 모듈을 로드
  const bizSdk = require("facebook-nodejs-business-sdk");
  // Facebook API 초기화
  const FacebookAdsApi = bizSdk.FacebookAdsApi.init(this.facebookToken);
  // 광고 계정 및 캠페인 관리에 필요한 클래스 로드
  const AdAccount = bizSdk.AdAccount;
  const Campaign = bizSdk.Campaign;
  // 광고 계정 인스턴스 생성
  const account = new AdAccount("act_" + this.facebookAdId);
  // 클래스 속성에 SDK 관련 객체들을 할당
  this.bizSdk = bizSdk; // facebook-nodejs-business-sdk 객체를 this.bizSdk에 할당
  this.FacebookAdsApi = FacebookAdsApi; // 초기화된 FacebookAdsApi를 this.FacebookAdsApi에 할당
  this.AdAccount = AdAccount; // AdAccount 클래스를 this.AdAccount에 할당
  this.Campaign = Campaign; // Campaign 클래스를 this.Campaign에 할당
  this.account = account; // 생성된 광고 계정 인스턴스를 this.account에 할당
};

/**
 * Instagram 인스턴트 문의(Leads)를 처리하는 캠페인을 읽어오는 메서드입니다.
 * 이 메서드는 주어진 날짜부터 현재까지의 광고 캠페인을 조회하고, 
 * 특정 키워드("인스턴트", "양식", "instant", "form")가 포함된 캠페인만을 필터링하여 결과를 반환합니다.
 * 
 * @param {Date} ago - 조회할 시작 날짜를 나타내는 Date 객체.
 * @param {boolean} [noRawMode=true] - 원본 데이터를 포함할지 여부를 나타내는 플래그. 기본값은 true이며, 원본 데이터를 제외합니다.
 * @returns {Array} - 조회된 캠페인의 배열을 반환하며, 캠페인에는 광고와 리드 정보가 포함됩니다.
 */
FacebookAPIs.prototype.readLeadgenCampaigns = async function (ago, noRawMode = true) {
  const instance = this; // 인스턴스 참조
  const back = this.back; // back 객체 참조
  // 인스턴스 내에서 사용할 주요 설정 변수들을 상수로 선언
  const { facebookAppId, facebookAppSecret, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId, facebookAdAccountId } = this;
  // Mother 메서드 사용을 위한 참조
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy } = this.mother;
  // Facebook 광고 SDK 관련 객체 참조
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;
  const Ad = bizSdk.Ad; // 광고 객체

  try {
    const future = new Date(); // 현재 날짜 생성
    const delta = 3 * 1000; // 요청 간의 대기 시간 (3초)
    let fields, params, campaigns; // 필요한 변수 선언
    let campaign;
    let result;
    let leads;
    let ads;
    let ad;
    let leadArr;
    let targetObj;

    future.setDate(future.getDate() + 1); // 미래 날짜로 설정하여 tomorrow와 같은 효과를 줌

    // 캠페인에서 필요한 필드 설정
    fields = ["name"];
    params = {};
    // 광고 계정에서 캠페인 목록을 조회
    result = await (new AdAccount(facebookAdAccountId)).getCampaigns(
      fields,
      params
    );

    campaigns = []; // 결과를 저장할 배열 초기화
    for (let o of result) { // 조회된 각 캠페인에 대해 반복
      // 캠페인 이름에 "인스턴트", "양식" 등의 키워드가 포함된 경우에만 처리
      if (/인스턴트/gi.test(o._data.name) || /인스탄트/gi.test(o._data.name) || /양식/gi.test(o._data.name) || /instant/gi.test(o._data.name) || /form/gi.test(o._data.name)) {
        await sleep(delta); // 대기 시간 설정

        campaign = {}; // 캠페인 객체 초기화
        if (!noRawMode) { // 원본 데이터를 포함할 경우
          campaign.raw = o; // 원본 데이터 저장
        }
        campaign.id = o._data.id; // 캠페인 ID 저장
        campaign.name = o._data.name; // 캠페인 이름 저장

        // 광고에서 필요한 필드 설정
        fields = ["name", "adset_id", "adset_name"];
        params = {
          "time_range": { // 조회할 시간 범위 설정
            "since": dateToString(ago), // 시작 날짜
            "until": dateToString(future), // 종료 날짜
          }
        };

        // 해당 캠페인의 광고 목록을 조회
        ads = await (new Campaign(campaign.id)).getAds(
          fields,
          params
        );

        campaign.ads = []; // 광고 배열 초기화
        for (let a of ads) { // 각 광고에 대해 반복
          ad = {}; // 광고 객체 초기화
          if (!noRawMode) { // 원본 데이터를 포함할 경우
            ad.raw = a; // 원본 데이터 저장
          }
          ad.id = a._data.id; // 광고 ID 저장
          ad.name = a._data.name; // 광고 이름 저장
          ad.adset = { // 광고 세트 정보 저장
            id: a._data.adset_id,
            name: a._data.adset_name,
          };

          await sleep(delta); // 대기 시간 설정

          // 광고의 리드 정보 조회
          leads = await (new Ad(ad.id)).getLeads(["created_time", "id", "ad_id", "form_id", "field_data"], {});
          leadArr = []; // 리드 배열 초기화
          for (let lead of leads) { // 각 리드에 대해 반복
            targetObj = objectDeepCopy(lead._data); // 리드 데이터 복사
            targetObj.created_time = new Date(targetObj.created_time); // 생성 시간을 Date 객체로 변환
            leadArr.push(objectDeepCopy(lead._data)); // 리드 데이터를 배열에 추가
          }
          leadArr.sort((a, b) => { return b.created_time.valueOf() - a.created_time.valueOf() }); // 생성 시간 기준으로 내림차순 정렬
          ad.lead = objectDeepCopy(leadArr); // 정렬된 리드 배열을 광고 객체에 저장

          campaign.ads.push(objectDeepCopy(ad)); // 광고 객체를 캠페인에 추가
        }

        campaigns.push(objectDeepCopy(campaign)); // 캠페인 객체를 최종 결과 배열에 추가
      }
    }

    return campaigns; // 최종 결과 반환

  } catch (e) {
    console.log(e); // 에러 발생 시 콘솔에 출력
    return null; // null 반환
  }
};

/**
 * 인스타그램 인스턴트 문의(Leads)를 조회하는 메서드입니다.
 * 이 메서드는 주어진 날짜 범위 내에서 생성된 리드(문의)를 조회하고, 특정 조건을 충족하는 리드만을 필터링하여 반환합니다.
 *
 * @param {number} [dateDelta=30] - 현재 날짜로부터 조회할 기간(일 단위)을 나타내는 값. 기본값은 30일.
 * @returns {Array|null} - 필터링된 리드 배열을 반환하며, 조회된 리드가 없거나 에러가 발생한 경우 null을 반환합니다.
 */
FacebookAPIs.prototype.readLeads = async function (dateDelta = 30) {
  const instance = this; // 인스턴스 참조

  try {
    const now = new Date(); // 현재 날짜를 저장하는 객체 생성
    let ago; // 조회할 기간의 시작 날짜를 저장할 변수
    let agoAgo; // 조회할 기간의 끝 날짜를 저장할 변수

    // 조회할 기간의 시작 날짜를 현재 날짜로부터 dateDelta만큼 뺀 값으로 설정
    ago = new Date(JSON.stringify(now).slice(1, -1)); // 현재 날짜를 문자열로 변환하여 다시 Date 객체로 변환
    ago.setDate(ago.getDate() - dateDelta); // 현재 날짜에서 dateDelta만큼 날짜를 뺌

    // 조회할 기간의 끝 날짜를 ago보다 하루 전으로 설정
    agoAgo = new Date(JSON.stringify(ago).slice(1, -1)); // ago 날짜를 문자열로 변환하여 다시 Date 객체로 변환
    agoAgo.setDate(agoAgo.getDate() - 1); // ago 날짜에서 하루를 뺌

    // readLeadgenCampaigns 메서드를 호출하여 캠페인을 조회
    const campaigns = await this.readLeadgenCampaigns(ago, true);
    if (!Array.isArray(campaigns)) { // 캠페인이 배열 형태가 아니면 null 반환
      return null;
    }

    // 캠페인의 광고(ads) 배열을 평탄화하여 리드(lead) 배열로 변환하고 필터링 및 정렬을 수행
    const result = campaigns
      .map((c) => { return c.ads }) // 각 캠페인에서 광고 배열을 추출
      .flat() // 중첩된 배열을 평탄화
      .map((a) => { return a.lead }) // 각 광고에서 리드 배열을 추출
      .flat() // 중첩된 배열을 평탄화
      .filter((l) => { // 리드에서 필터링을 수행하여 한글 이름이 포함된 리드를 제외
        return !l.field_data.some(({ name }) => { return /[가-힣]/gi.test(name) });
      })
      .map((c) => { // 각 리드의 생성 시간을 Date 객체로 변환
        c.created_time = new Date(c.created_time);
        return c;
      });

    // 리드 배열을 생성 시간(created_time) 기준으로 내림차순으로 정렬
    result.sort((a, b) => { return b.created_time.valueOf() - a.created_time.valueOf() });

    // 정렬된 리드 배열에서 agoAgo 날짜 이후에 생성된 리드만 필터링하여 반환
    return result.filter((o) => { return o.created_time.valueOf() >= agoAgo.valueOf() });

  } catch (e) { // 에러 발생 시
    console.log(e); // 에러를 콘솔에 출력
    return null; // null 반환
  }
}

/**
 * FacebookAPIs 클래스의 readActiveCampaigns 메서드는 활성 상태의 광고 캠페인, 광고 세트, 광고를 조회합니다.
 * @async
 * @function
 * @param {boolean} [noRawMode=true] - 원본 데이터를 포함할지 여부를 결정하는 플래그입니다. true일 경우 원본 데이터가 포함되지 않으며, false일 경우 포함됩니다.
 * @returns {Promise<Array<Object>>} - 활성화된 캠페인, 광고 세트 및 광고의 리스트를 반환합니다.
 */
FacebookAPIs.prototype.readActiveCampaigns = async function (noRawMode = true) {
  // 메서드 내에서 this 참조를 instance에 할당하여 사용
  const instance = this;
  // back 객체는 데이터베이스 접근 등에 사용될 수 있는 클래스의 멤버입니다.
  const back = this.back;
  
  // 클래스의 필드들을 로컬 변수로 할당
  const { facebookAppId, facebookAppSecret, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId, facebookAdAccountId } = this;
  
  // mother 객체의 유틸리티 메서드를 로컬 변수로 할당
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy } = this.mother;
  
  // Facebook 광고 SDK 객체들을 로컬 변수로 할당
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;

  try {
    // 각 요청 사이에 대기할 시간을 설정 (1초)
    const delta = 1 * 1000;
    let fields, params, campaigns;
    let campaign;
    let result;
    let adsets;
    let adset;
    let ads;
    let ad;
    let target;

    // 캠페인의 필드 및 파라미터 설정
    fields = ["name"];  // 조회할 필드는 캠페인의 이름입니다.
    params = {
      "effective_status": ["ACTIVE"],  // 상태가 활성화된 캠페인만 조회
    };

    // AdAccount 객체를 사용하여 활성화된 캠페인을 가져옴
    result = await (new AdAccount(facebookAdAccountId)).getCampaigns(
      fields,
      params
    );

    // 캠페인 정보를 저장할 배열 초기화
    campaigns = [];
    for (let o of result) {

      // 각 캠페인 간 대기 시간을 설정하여 API 요청 속도를 조절
      await sleep(delta);

      // 각 캠페인에 대한 기본 정보 설정
      campaign = {};
      if (!noRawMode) {
        // 원본 데이터가 필요한 경우 원본 데이터를 campaign 객체에 저장
        campaign.raw = o;
      }
      campaign.id = o._data.id;  // 캠페인의 ID
      campaign.name = o._data.name;  // 캠페인의 이름

      // 광고 세트의 필드 및 파라미터 설정
      fields = ["name"];  // 광고 세트의 이름 필드를 조회
      params = { "effective_status": ["ACTIVE"] };  // 활성화된 광고 세트만 조회

      // 현재 캠페인에 연결된 광고 세트를 가져옴
      adsets = await (new Campaign(campaign.id)).getAdSets(
        fields,
        params
      );

      // 광고 세트를 저장할 배열 초기화
      campaign.adset = [];
      for (let a of adsets) {
        adset = {};
        if (!noRawMode) {
          // 원본 데이터가 필요한 경우 광고 세트 원본 데이터를 adset 객체에 저장
          adset.raw = a;
        }
        adset.id = a._data.id;  // 광고 세트의 ID
        adset.name = a._data.name;  // 광고 세트의 이름
        adset.ad = [];  // 각 광고 세트에 연결된 광고를 저장할 배열 초기화
        campaign.adset.push(objectDeepCopy(adset));  // 현재 광고 세트를 캠페인에 추가
      }

      // 광고의 필드 및 파라미터 설정
      fields = ["name", "adset_id"];  // 광고의 이름과 연결된 광고 세트 ID를 조회
      params = { "effective_status": ["ACTIVE"] };  // 활성화된 광고만 조회

      // 각 캠페인 간 대기 시간을 설정
      await sleep(delta);

      // 현재 캠페인에 연결된 광고를 가져옴
      ads = await (new Campaign(campaign.id)).getAds(
        fields,
        params
      );

      // 각 광고를 적절한 광고 세트에 할당
      for (let a of ads) {
        target = campaign.adset.find((adset) => { return adset.id === a._data.adset_id });  // 광고 세트를 찾음
        ad = {};
        ad.id = a._data.id;  // 광고의 ID
        ad.name = a._data.name;  // 광고의 이름
        if (target !== undefined) {
          // 해당 광고 세트가 존재하는 경우 광고를 광고 세트에 추가
          target.ad.push(objectDeepCopy(ad));
        }
      }

      // 현재 캠페인을 캠페인 목록에 추가
      campaigns.push(objectDeepCopy(campaign));
    }

    // 모든 캠페인 정보를 반환
    return campaigns;

  } catch (e) {
    // 오류 발생 시 콘솔에 오류를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Facebook의 일일 캠페인 데이터를 수집하여 MongoDB에 저장하는 함수입니다.
 * @param {object} selfMongo - MongoDB 연결 객체입니다.
 * @param {number} [dayNumber=3] - 조회할 날짜 범위를 지정합니다. 기본값은 3일입니다.
 * @param {object} [logger=null] - 로그 기록을 위한 logger 객체입니다. 기본값은 null입니다.
 * @returns {Promise<void>} - 함수가 완료되면 void를 반환합니다.
 */
FacebookAPIs.prototype.dailyCampaign = async function (selfMongo, dayNumber = 3, logger = null) {
  // 인스턴스 내의 변수를 참조하기 위해 instance로 현재 인스턴스를 저장합니다.
  const instance = this;
  // 인스턴스에서 백엔드 관련 메서드를 사용하기 위해 back을 가져옵니다.
  const back = this.back;
  // Facebook 관련 API 정보를 인스턴스에서 가져옵니다.
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  // Mother 메서드에서 다양한 유틸리티 함수를 가져옵니다.
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  // Facebook 비즈니스 SDK에서 필요한 객체들을 인스턴스에서 가져옵니다.
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;
  
  try {
    // 데이터를 저장할 MongoDB 컬렉션 이름을 지정합니다.
    const campaignCollection = "dailyCampaign";
    let tempRows;
    let res;
    let json;
    let from, to;
    let startDate;
    let num;
    let key;
    let now;

    // 현재 날짜를 저장합니다.
    now = new Date();
    // 조회할 시작 날짜를 현재 날짜로 초기화합니다.
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 조회할 날짜 범위만큼 startDate를 과거로 이동시킵니다.
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // 조회할 날짜 범위만큼 데이터를 수집합니다.
    for (let i = 0; i < dayNumber; i++) {

      // 데이터 수집 전 잠시 대기합니다.
      await sleep(500);

      if (i === 0) {
        // 시작 날짜와 종료 날짜를 동일하게 설정합니다.
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        // 시작 날짜와 종료 날짜를 하루씩 증가시킵니다.
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      // Facebook API를 통해 캠페인 데이터를 요청합니다.
      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/act_" + facebookAdId + "/insights", {
        level: "campaign",
        fields: [
          "account_id",
          "campaign_id",
          "campaign_name",
          "reach",
          "impressions",
          "spend",
          "clicks",
          "date_start",
          "date_stop",
        ].join(","),
        time_range: JSON.stringify({
          since: dateToString(from),
          until: dateToString(from),
        }),
        access_token: facebookToken
      }, { method: "get" });

      num = 0;

      // 응답받은 캠페인 데이터를 순회하면서 MongoDB에 저장합니다.
      for (let obj of res.data.data) {

        // 각 캠페인 데이터를 고유하게 식별하기 위한 키를 생성합니다.
        key = dateToString(from).replace(/\-/gi, '') + "_" + obj.campaign_id

        // MongoDB에 저장할 JSON 데이터를 생성합니다.
        json = {
          camid: 'g' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'f' + String.fromCharCode(97 + num) + zeroAddition(from.getDate()) + 's',
          key,
          date: { from, to },
          value: {
            charge: Number(obj.spend),
            performance: {
              reach: Number(obj.reach),
              impressions: Number(obj.impressions),
              clicks: Number(obj.clicks),
            },
          },
          information: {
            mother: "facebook",
            type: "instagram",
            id: {
              account: obj.account_id,
              campaign: obj.campaign_id,
            },
            name: obj.campaign_name,
          }
        };

        // 기존에 동일한 키를 가진 데이터가 있는지 확인 후 삭제합니다.
        tempRows = await back.mongoRead(campaignCollection, { key }, { selfMongo });
        if (tempRows.length !== 0) {
          await back.mongoDelete(campaignCollection, { key }, { selfMongo });
        }
        // 새로운 캠페인 데이터를 MongoDB에 저장합니다.
        await back.mongoCreate(campaignCollection, json, { selfMongo });
        console.log(json);
        num++;
      }

    }

    // 작업 완료 후 로그 기록을 남깁니다.
    if (logger !== null) {
      logger.cron("facebook daily campaign done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    // 에러 발생 시 알람을 보내고, 에러 메시지를 기록합니다.
    emergencyAlarm("FacebookAPIs.dailyCampaign error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
  }
}

/**
 * Facebook 광고 계정의 상태를 확인하는 함수입니다.
 * @param {object} [logger=null] - 로그 기록을 위한 logger 객체입니다. 기본값은 null입니다.
 * @returns {Promise<boolean>} - 계정 상태가 정상적이면 true를 반환하고, 문제가 있으면 false를 반환합니다.
 */
FacebookAPIs.prototype.accountStatusCheck = async function (logger = null) {
  // 인스턴스 내의 변수를 참조하기 위해 instance로 현재 인스턴스를 저장합니다.
  const instance = this;
  // 인스턴스에서 백엔드 관련 메서드를 사용하기 위해 back을 가져옵니다.
  const back = this.back;
  // Facebook 관련 API 정보를 인스턴스에서 가져옵니다.
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  // Mother 메서드에서 다양한 유틸리티 함수를 가져옵니다.
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition } = this.mother;
  // Facebook 비즈니스 SDK에서 필요한 객체들을 인스턴스에서 가져옵니다.
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;
  
  try {
    // 계정 상태를 확인할 때 사용할 상태 코드와 그에 대응하는 메시지 딕셔너리를 정의합니다.
    const statusDictionary = {
      "s1": "ACTIVE",
      "s2": "DISABLED",
      "s3": "UNSETTLED",
      "s7": "PENDING_RISK_REVIEW",
      "s8": "PENDING_SETTLEMENT",
      "s9": "IN_GRACE_PERIOD",
      "s100": "PENDING_CLOSURE",
      "s101": "CLOSED",
      "s201": "ANY_ACTIVE",
      "s202": "ANY_CLOSED",
    };
    // 계정이 비활성화된 이유에 대한 코드와 그에 대응하는 메시지 딕셔너리를 정의합니다.
    const disableDictionary = {
      "d0": "NONE",
      "d1": "ADS_INTEGRITY_POLICY",
      "d2": "ADS_IP_REVIEW",
      "d3": "RISK_PAYMENT",
      "d4": "GRAY_ACCOUNT_SHUT_DOWN",
      "d5": "ADS_AFC_REVIEW",
      "d6": "BUSINESS_INTEGRITY_RAR",
      "d7": "PERMANENT_CLOSE",
      "d8": "UNUSED_RESELLER_ACCOUNT",
      "d9": "UNUSED_ACCOUNT",
      "d10": "UMBRELLA_AD_ACCOUNT",
      "d11": "BUSINESS_MANAGER_INTEGRITY_POLICY",
      "d12": "MISREPRESENTED_AD_ACCOUNT",
      "d13": "AOAB_DESHARE_LEGAL_ENTITY",
      "d14": "CTX_THREAD_REVIEW",
      "d15": "COMPROMISED_AD_ACCOUNT",
    };
    let res;
    let account_status;
    let disable_reason;
    let statusErrorMessage;
    let disableErrorMessage;
    let boo;

    // Facebook API를 호출하여 광고 계정의 상태를 가져옵니다.
    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/act_" + facebookAdId, {
      fields: [
        "account_id",
        "account_status",
        "amount_spent",
        "disable_reason",
      ].join(","),
      access_token: facebookToken
    }, { method: "get" });

    // 응답에서 계정 상태와 비활성화 이유를 추출합니다.
    ({ account_status, disable_reason } = res.data);

    // 계정 상태를 정상으로 초기화합니다.
    boo = true;

    // 계정 상태가 1(ACTIVE)이 아닌 경우 에러 메시지를 생성하고 알람을 보냅니다.
    if (Number(account_status) !== 1) {
      statusErrorMessage = statusDictionary["s" + String(account_status)] === undefined ? "UNKNOWN" : statusDictionary["s" + String(account_status)];
      statusErrorMessage = "facebook account status error (" + statusErrorMessage + ")";
      statusErrorMessage = "FacebookAPIs.accountStatusCheck error : " + statusErrorMessage + " / " + dateToString(new Date());
      if (logger !== null) {
        // Logger가 있을 경우, 로그를 기록합니다.
        logger.error(statusErrorMessage).catch((err) => { console.log(err); });
      } else {
        // Logger가 없을 경우, 알람을 보냅니다.
        emergencyAlarm(statusErrorMessage).catch((err) => { console.log(err); });
      }
      // 계정 상태가 비정상이므로 boo를 false로 설정합니다.
      boo = false;
    }

    // 비활성화 이유가 0(NONE)이 아닌 경우 에러 메시지를 생성하고 알람을 보냅니다.
    if (Number(disable_reason) !== 0) {
      disableErrorMessage = disableDictionary["d" + String(disable_reason)] === undefined ? "UNKNOWN" : disableDictionary["d" + String(disable_reason)];
      disableErrorMessage = "facebook account disable reason (" + disableErrorMessage + ")";
      disableErrorMessage = "FacebookAPIs.accountStatusCheck error : " + disableErrorMessage + " / " + dateToString(new Date());
      if (logger !== null) {
        // Logger가 있을 경우, 로그를 기록합니다.
        logger.error(disableErrorMessage).catch((err) => { console.log(err); });
      } else {
        // Logger가 없을 경우, 알람을 보냅니다.
        emergencyAlarm(disableErrorMessage).catch((err) => { console.log(err); });
      }
      // 비활성화 이유가 있으므로 boo를 false로 설정합니다.
      boo = false;
    }

    // 계정 상태 확인이 완료되었음을 로그로 기록합니다.
    if (logger !== null) {
      logger.cron("facebook account status check done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    // 계정 상태가 정상인지 여부를 반환합니다.
    return boo;

  } catch (e) {
    // 오류 발생 시 알람을 보냅니다.
    emergencyAlarm("FacebookAPIs.accountStatusCheck error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
    // 오류 발생 시 false를 반환합니다.
    return false;
  }
}

/**
 * Facebook 페이지에서 활성 상태의 인스턴트 양식(Form) ID를 가져오는 함수입니다.
 * @param {object} [logger=null] - 로그 기록을 위한 logger 객체입니다. 기본값은 null입니다.
 * @returns {Promise<object|null>} - 활성화된 양식의 페이지 액세스 토큰과 양식 ID를 반환하며, 없을 경우 null을 반환합니다.
 */
FacebookAPIs.prototype.getActiveInstantFormId = async function (logger = null) {
  // 인스턴스 내의 변수를 참조하기 위해 instance로 현재 인스턴스를 저장합니다.
  const instance = this;
  // 인스턴스에서 백엔드 관련 메서드를 사용하기 위해 back을 가져옵니다.
  const back = this.back;
  // Facebook 관련 API 정보를 인스턴스에서 가져옵니다.
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this;
  // Mother 메서드에서 다양한 유틸리티 함수를 가져옵니다.
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy } = this.mother;
  // Facebook 비즈니스 SDK에서 필요한 객체들을 인스턴스에서 가져옵니다.
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;

  try {
    // Facebook API 요청 간의 지연 시간을 설정합니다.
    const delta = 20 * 1000;
    let res;
    let pageAccessToken;
    let formArr;

    // Facebook User ID를 통해 계정 목록을 가져옵니다.
    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + facebookUserId + "/accounts", {
      access_token: facebookToken
    }, { method: "get" });

    // 가져온 계정 목록에서 Facebook Page ID와 일치하는 페이지의 액세스 토큰을 추출합니다.
    pageAccessToken = res.data.data.find((o) => { return o.id === facebookPageId }).access_token;

    // 일정 시간 대기합니다.
    await sleep(delta);

    // Facebook Page에서 리드 생성 양식(leadgen_forms)을 가져옵니다.
    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + facebookPageId + "/leadgen_forms", {
      access_token: pageAccessToken
    }, { method: "get" });

    // 가져온 양식 배열을 깊은 복사하여 formArr에 저장합니다.
    formArr = objectDeepCopy(res.data.data);

    // 양식 이름에 숫자가 포함된 경우 필터링하여 남깁니다.
    formArr = formArr.filter((o) => { return o.name.replace(/[^0-9]/gi, '').trim().length > 5 });

    // 양식 이름에 포함된 날짜를 기준으로 정렬합니다. 최신 날짜가 상단에 오도록 정렬합니다.
    formArr.sort((a, b) => {
      // 양식 이름에서 날짜를 추출하고, 이를 표준화된 날짜 형식으로 변환합니다.
      const aStandard = a.name.replace(/[^0-9\.\- ]/gi, '').trim();
      const bStandard = b.name.replace(/[^0-9\.\- ]/gi, '').trim();
      const aStandardDate = stringToDate(aStandard.split(/[\.\- ]/gi).map((s) => { return s.replace(/[^0-9]/gi, '').trim() }).filter((s) => { return s !== "" }).join("-"));
      const bStandardDate = stringToDate(bStandard.split(/[\.\- ]/gi).map((s) => { return s.replace(/[^0-9]/gi, '').trim() }).filter((s) => { return s !== "" }).join("-"));
      // 날짜를 비교하여 내림차순으로 정렬합니다.
      return bStandardDate.valueOf() - aStandardDate.valueOf();
    });

    // 정렬된 양식 배열에서 가장 최근의 양식 ID와 페이지 액세스 토큰을 반환합니다.
    if (formArr.length > 0) {
      return { pageAccessToken, formId: formArr[0].id };
    } else {
      // 양식이 없을 경우 null을 반환합니다.
      return null;
    }

  } catch (e) {
    // 오류가 발생할 경우, 콘솔에 오류를 출력하고 null을 반환합니다.
    console.log(e);
    return null;
  }
}

/**
 * 인스타그램 인스턴트 문의 데이터를 동기화하는 메서드입니다.
 * 이 메서드는 MetaInstant로부터 수집된 문의 데이터를 MongoDB에 저장하고, 새로운 문의가 있는 경우 슬랙 채널에 알림을 보냅니다.
 *
 * @param {Object} selfMongo - MongoDB 연결 객체.
 * @param {number} [dateDelta=3] - 조회할 날짜 범위를 지정하는 값으로, 기본값은 3일.
 * @param {Object|null} [logger=null] - 로그 기록을 위한 로거 객체로, null일 경우 로그를 기록하지 않음.
 * @returns {boolean} - 동기화가 성공적으로 완료되면 true, 실패 시 false를 반환.
 */
FacebookAPIs.prototype.syncMetaInstantForm = async function (selfMongo, dateDelta = 3, logger = null) {
  const instance = this; // 인스턴스 참조
  const back = this.back; // 백엔드 관련 기능 참조
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this; // Facebook API 관련 설정 변수
  const { sleep, dateToString, stringToDate, sha256Hmac, fileSystem, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy, binaryRequest, messageSend } = this.mother; // Mother 객체의 메서드들
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this; // Facebook SDK 관련 객체들

  try {
    const collection = "metaInstantForm"; // MongoDB 컬렉션 이름 설정
    const leads = await this.readLeads(); // 인스타그램 인스턴트 문의 데이터를 조회
    if (leads === null) { // 리드 데이터가 없으면 false 반환
      return false;
    }

    let tong = []; // 최종 저장할 데이터를 담을 배열
    let tempObj; // 임시 객체로, 각 리드 데이터를 저장하기 위해 사용
    let thisDate; // 리드의 생성 시간을 저장할 변수
    let rawArr; // 각 리드의 필드 데이터를 저장할 배열
    let seridRaw, purchaseRaw, budgetRaw, nameRaw, phoneRaw, addressRaw, pyeongRaw, expectedRaw, emailRaw, contractRaw, timeRaw; // 리드의 각 필드 데이터를 저장할 변수
    let thisId, json; // MongoDB 저장을 위한 ID와 JSON 데이터
    let rows; // MongoDB에서 조회한 결과를 저장할 변수

    // 각 리드 데이터를 순회하면서 필요한 정보를 추출하고 가공
    for (let obj of leads) {

      if (typeof obj.created_time === "string") {
        thisDate = new Date(obj.created_time); // 문자열로 저장된 생성 시간을 Date 객체로 변환
        thisDate = dateToString(thisDate, true); // 날짜를 문자열로 변환
      } else {
        thisDate = dateToString(obj.created_time, true); // 생성 시간을 문자열로 변환
      }
      thisDate = stringToDate(thisDate); // 문자열로 변환된 시간을 다시 Date 객체로 변환
      rawArr = objectDeepCopy(obj.field_data); // 리드의 필드 데이터를 깊은 복사하여 rawArr에 저장

      // 각 필드 데이터를 추출하여 tempObj 객체에 저장
      tempObj = {
        id: obj.id, // 리드의 ID
        ad: obj.ad_id, // 리드가 발생한 광고의 ID
        date: new Date(JSON.stringify(thisDate).slice(1, -1)), // 리드의 생성 시간
        injection: 0, // MongoDB에서 조회된 이전 데이터의 injection 필드를 업데이트하기 위한 초기 값
        raw: rawArr, // 리드의 원시 데이터
        data: {}, // 리드에서 추출한 데이터를 저장할 객체
      };

      try {
        seridRaw = rawArr.find((o) => { return /serid/gi.test(o.name) })?.values?.join(""); // serid 필드 데이터 추출
        if (seridRaw === null || seridRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.serid = seridRaw;
      } catch {
        tempObj.data.serid = null;
      }

      try {
        purchaseRaw = rawArr.find((o) => { return /purchase/gi.test(o.name) })?.values?.join(""); // purchase 필드 데이터 추출
        if (purchaseRaw === null || purchaseRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.purchase = purchaseRaw;
      } catch {
        tempObj.data.purchase = null;
      }

      try {
        budgetRaw = rawArr.find((o) => { return /budget/gi.test(o.name) })?.values?.join(""); // budget 필드 데이터 추출
        if (budgetRaw === null || budgetRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.budget = budgetRaw;
      } catch {
        tempObj.data.budget = null;
      }

      try {
        nameRaw = rawArr.find((o) => { return /name/gi.test(o.name) })?.values?.join(""); // name 필드 데이터 추출
        if (nameRaw === null || nameRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.name = nameRaw;
      } catch {
        tempObj.data.name = null;
      }

      try {
        phoneRaw = rawArr.find((o) => { return /phone/gi.test(o.name) })?.values?.join(""); // phone 필드 데이터 추출
        if (phoneRaw === null || phoneRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.phone = phoneRaw;
      } catch {
        tempObj.data.phone = null;
      }

      try {
        addressRaw = rawArr.find((o) => { return /address/gi.test(o.name) })?.values?.join(""); // address 필드 데이터 추출
        if (addressRaw === null || addressRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.address = addressRaw;
      } catch {
        tempObj.data.address = null;
      }

      try {
        pyeongRaw = rawArr.find((o) => { return /pyeong/gi.test(o.name) })?.values?.join(""); // pyeong 필드 데이터 추출
        if (pyeongRaw === null || pyeongRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.pyeong = pyeongRaw;
      } catch {
        tempObj.data.pyeong = null;
      }

      try {
        expectedRaw = rawArr.find((o) => { return /expected/gi.test(o.name) })?.values?.join(""); // expected 필드 데이터 추출
        if (expectedRaw === null || expectedRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.expected = expectedRaw;
      } catch {
        tempObj.data.expected = null;
      }

      try {
        emailRaw = rawArr.find((o) => { return /email/gi.test(o.name) })?.values?.join(""); // email 필드 데이터 추출
        if (emailRaw === null || emailRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.email = emailRaw;
      } catch {
        tempObj.data.email = "";
      }

      try {
        contractRaw = rawArr.find((o) => { return /contract/gi.test(o.name) })?.values?.join(""); // contract 필드 데이터 추출
        if (contractRaw === null || contractRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.contract = contractRaw;
      } catch {
        tempObj.data.contract = "자가";
      }

      try {
        timeRaw = rawArr.find((o) => { return /time/gi.test(o.name) })?.values?.join(""); // time 필드 데이터 추출
        if (timeRaw === null || timeRaw === undefined) {
          throw new Error("");
        }
        tempObj.data.time = [ "9:30 - 11:00", "11:00 - 12:30", "13:30 - 16:30", "16:30 - 18:30", ][Number(timeRaw)];
      } catch {
        tempObj.data.time = "";
      }

      tong.push(tempObj); // 완성된 객체를 tong 배열에 추가
    }

    // 각 리드 데이터를 MongoDB에 저장하거나 업데이트
    for (let row of tong) {
      json = objectDeepCopy(row); // 각 리드 데이터를 깊은 복사하여 json에 저장
      thisId = row.id; // 리드의 ID를 저장
      rows = await back.mongoRead(collection, { id: thisId }, { selfMongo }); // MongoDB에서 기존 데이터를 조회
      if (rows.length === 0) { // 새로운 리드인 경우
        messageSend({ text: "새로운 인스턴트 문의가 왔습니다! 성함은 " + json.data.name + "입니다!", channel: "#401_consulting" }).catch((err) => { console.log(err); }); // 슬랙 알림 전송
      } else { // 기존 데이터가 있는 경우
        json.injection = rows[0].injection; // 기존 데이터의 injection 값을 복사
      }
      for (let pastRow of rows) {
        await back.mongoDelete(collection, { id: pastRow.id }, { selfMongo }); // 기존 데이터 삭제
      }
      await back.mongoCreate(collection, json, { selfMongo }); // 새로운 데이터 저장
    }

    return true; // 성공적으로 동기화가 완료된 경우 true 반환

  } catch (e) { // 에러 발생 시
    emergencyAlarm("FacebookAPIs.syncMetaInstantForm error : " + e.message).catch((err) => { console.log(err); }); // 에러 내용을 슬랙으로 전송
    emergencyAlarm("FacebookAPIs.syncMetaInstantForm error : " + JSON.stringify(e?.response?.data?.error)).catch((err) => { console.log(err); }); // 에러 내용을 슬랙으로 전송
    console.log(e); // 콘솔에 에러 출력
    console.log("FacebookAPIs.syncMetaInstantForm error : " + JSON.stringify(e?.response?.data?.error)); // 에러 내용을 콘솔에 출력
    return false; // 동기화 실패 시 false 반환
  }
}

/**
 * MetaInstant 데이터를 고객 관리 시스템으로 동기화하는 메서드입니다.
 * 이 메서드는 인스타그램 인스턴트 문의 데이터를 MongoDB에서 읽어와 처리하고, 필요한 정보를 추출하여 
 * 고객 관리 시스템에 저장합니다. 또한, 특정 조건을 만족하는 경우 알림을 전송하고 데이터베이스를 업데이트합니다.
 *
 * @param {Object} selfMongo - MongoDB 연결 객체.
 * @param {Object} selfCoreMongo - 코어 MongoDB 연결 객체.
 * @param {Object|null} [logger=null] - 로그 기록을 위한 로거 객체로, null일 경우 로그를 기록하지 않음.
 */
FacebookAPIs.prototype.metaInstantToClient = async function (selfMongo, selfCoreMongo, logger = null) {
  const instance = this; // 인스턴스 참조
  const back = this.back; // 백엔드 관련 기능 참조
  const AddressParser = require(process.cwd() + "/apps/addressParser/addressParser.js"); // 주소 파싱 모듈 불러오기
  const app = new AddressParser(); // 주소 파싱 객체 생성
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId } = this; // Facebook API 관련 설정 변수
  const { sleep, dateToString, stringToDate, sha256Hmac, fileSystem, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy, binaryRequest, messageSend, autoComma, autoHypenPhone, homeliaisonAnalytics } = this.mother; // Mother 객체의 메서드들
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this; // Facebook SDK 관련 객체들

  try {
    const budgetArr = [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상', '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상', '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상', '5억원 이상', '10억원 이상', ]; // 예산 범위 배열
    const purchaseArr = [ "재배치", "일부 구매", "전체 구매" ]; // 구매 유형 배열
    const staticImageSet = [ // 정적 이미지 세트
      "t6p18.jpg",
      "t11p58.jpg",
      "t4p123.jpg",
      "t9p306.jpg",
      "t1p29.jpg",
      "t18p350.jpg"
    ];
    const collection = "metaInstantForm"; // MongoDB 컬렉션 이름 설정
    let rows; // MongoDB에서 읽어온 데이터를 저장할 변수
    let target; // 현재 처리 중인 리드 데이터를 저장할 변수
    let serid, purchase, budget, name, phone, address, pyeong, expected, searchResult; // 리드 데이터의 필드를 저장할 변수
    let expectedYear, expectedMonth, expectedDate; // 예상 날짜를 저장할 변수
    let now, thisDate, tempDate; // 현재 시간과 관련된 변수를 저장
    let year, month, date; // 예상 날짜의 연, 월, 일을 저장할 변수
    let email, contract, etc, living, map, response; // 리드 데이터의 필드를 저장할 변수
    let thisId, clientResponse, cliid; // 리드 ID와 클라이언트 응답 데이터를 저장할 변수
    let whereQuery, updateQuery, coreQuery; // MongoDB 업데이트를 위한 쿼리 객체
    let defaultQueryObject; // 기본 쿼리 객체
    let requestNumber; // 요청 번호를 저장할 변수
    let livingNow; // 현재 거주 여부를 저장할 변수
    let time; // 상담 가능 시간을 저장할 변수

    now = new Date(); // 현재 시간 저장
    rows = await back.mongoRead(collection, { injection: 0 }, { selfMongo }); // injection 값이 0인 리드 데이터를 MongoDB에서 읽어옴

    for (let i = 0; i < rows.length; i++) {

      await sleep(1000); // 1초 대기

      target = rows[i]; // 현재 처리 중인 리드 데이터
      thisId = target.id; // 현재 리드의 ID
      requestNumber = 0; // 요청 번호 초기화

      try {
        serid = target.data.serid; // serid 필드 추출
        if (/[0-9]/gi.test(target.data.purchase)) {
          purchase = Number(target.data.purchase.replace(/[^0-9]/gi, '')); // 숫자가 포함된 purchase 필드 처리
        } else {
          purchase = (/기존[_ ]?가구/gi.test(target.data.purchase) ? 0 : (/일부/gi.test(target.data.purchase) ? 1 : 2)); // "기존 가구", "일부", "전체" 등 텍스트로 구성된 purchase 필드 처리
        }
        budget = target.data.budget; // 예산 필드 추출
        name = target.data.name.trim(); // 이름 필드 추출 및 공백 제거
        email = target.data.email.trim(); // 이메일 필드 추출 및 공백 제거
        contract = target.data.contract; // 계약 유형 필드 추출
        etc = "from meta instant ads"; // 기타 정보 초기화
        living = "false"; // 거주 여부 초기화

        if (/^0/gi.test(target.data.phone)) {
          phone = autoHypenPhone(target.data.phone.trim().replace(/[^0-9\-]/gi, '')); // 휴대폰 번호에 하이픈 추가
        } else {
          phone = autoHypenPhone(String('0' + target.data.phone).trim().replace(/[^0-9\-]/gi, '')); // 휴대폰 번호 앞에 0을 추가하고 하이픈 추가
        }

        address = target.data.address.trim().replace(/[\n\t]/gi, '').replace(/[\n\t]/gi, ''); // 주소 필드에서 불필요한 공백 제거
        searchResult = await app.getAddress(address); // 주소 검색
        if (searchResult !== null) { // 검색 결과가 존재하는 경우
          if (typeof searchResult === "object" && searchResult.address !== undefined && searchResult.address !== null && typeof searchResult.address === "object") {
            if (typeof searchResult.address.road === "string") {
              if (searchResult.address.road.trim() !== "") {
                address = searchResult.address.road; // 검색된 도로명 주소로 변경
              }
            }
          }
        }

        pyeong = target.data.pyeong.replace(/[^0-9\.]/gi, ''); // 평수 필드에서 숫자만 추출
        if (pyeong === '' || Number.isNaN(Number(pyeong))) {
          pyeong = 34; // 평수 값이 비어 있거나 유효하지 않은 경우 기본값으로 34를 설정
        } else {
          pyeong = Number(pyeong); // 유효한 평수 값을 Number로 변환
        }

        livingNow = false; // 현재 거주 여부 초기화
        try {
          if (/거주/gi.test(target.data.expected)) {
            livingNow = true; // "거주"라는 단어가 포함된 경우 현재 거주 중으로 설정
            expected = new Date(); // 예상 이사 날짜를 현재 날짜로 설정
          } else {
            try {
              livingNow = false;
              expected = stringToDate(target.data.expected.trim()); // 예상 이사 날짜를 문자열에서 Date 객체로 변환
            } catch (e) {
              livingNow = true;
              expected = new Date(); // 변환에 실패한 경우 현재 날짜로 설정
            }
          }
        } catch {
          expected = target.data.expected; // 예상 이사 날짜 필드 설정
          expectedYear = /([0-9]+[ ]*[년연])/gi.exec(expected) // 예상 연도 추출
          expectedMonth = /([0-9]+[ ]*[월윌])/gi.exec(expected) // 예상 월 추출
          expectedDate = /([0-9]+[ ]*[일])/gi.exec(expected) // 예상 일 추출

          if (expectedYear === null && expectedMonth === null && expectedDate === null) { // 연, 월, 일이 모두 없는 경우
            if (/거주/gi.test(target.data.expected)) {
              livingNow = true; // "거주"라는 단어가 포함된 경우 현재 거주 중으로 설정
              expected = new Date(); // 예상 이사 날짜를 현재 날짜로 설정
            } else {
              try {
                livingNow = false;
                expected = stringToDate(target.data.expected.trim()); // 예상 이사 날짜를 문자열에서 Date 객체로 변환
              } catch (e) {
                livingNow = true;
                expected = new Date(); // 변환에 실패한 경우 현재 날짜로 설정
              }
            }
          } else {
            livingNow = false;

            if (expectedYear !== null) {
              if (expectedYear[0] !== undefined) {
                expectedYear = Number(expectedYear[0].replace(/[^0-9]/gi, '')); // 예상 연도를 숫자로 변환
                if (expectedYear < 1000) {
                  expectedYear = 2000 + expectedYear; // 예상 연도가 1000 이하인 경우 2000년대를 가정
                }
              } else {
                expectedYear = null;
              }
            } else {
              expectedYear = null;
            }

            if (expectedMonth !== null) {
              if (expectedMonth[0] !== undefined) {
                expectedMonth = Number(expectedMonth[0].replace(/[^0-9]/gi, '')); // 예상 월을 숫자로 변환
              } else {
                expectedMonth = null;
              }
            } else {
              expectedMonth = null;
            }

            if (expectedDate !== null) {
              if (expectedDate[0] !== undefined) {
                expectedDate = Number(expectedDate[0].replace(/[^0-9]/gi, '')); // 예상 일을 숫자로 변환
              } else {
                expectedDate = null;
              }
            } else {
              expectedDate = null;
            }

            tempDate = new Date(JSON.stringify(now).slice(1, -1)); // 현재 날짜를 JSON 형식으로 변환
            if (expectedYear === null) {
              year = tempDate.getFullYear(); // 연도가 없는 경우 현재 연도로 설정
            } else {
              year = expectedYear;
            }
            if (expectedMonth === null) {
              month = tempDate.getMonth() + 1; // 월이 없는 경우 현재 월로 설정
            } else {
              month = expectedMonth;
            }
            if (expectedDate === null) {
              date = 1; // 일이 없는 경우 1일로 설정
            } else {
              date = expectedDate;
            }

            thisDate = stringToDate(`${String(year)}-${zeroAddition(month)}-${zeroAddition(date)}`) // 예상 날짜를 문자열로 결합하여 Date 객체로 변환
            expected = new Date(JSON.stringify(thisDate).slice(1, -1)); // 예상 날짜를 JSON 형식으로 변환
          }
        }

        if (email === undefined || email === null || email === '') {
          email = ""; // 이메일이 비어있는 경우 빈 문자열로 설정
        }

        if (contract === undefined || contract === null || contract === '') {
          contract = "자가"; // 계약 유형이 비어있는 경우 "자가"로 설정
        }

        // 고객 정보를 담은 map 객체 생성
        map = [
          {
            property: "name", // 고객의 이름을 나타내는 속성
            value: String(name), // 이름 값을 문자열로 변환하여 저장
          },
          {
            property: "phone", // 고객의 전화번호를 나타내는 속성
            value: String(phone), // 전화번호 값을 문자열로 변환하여 저장
          },
          {
            property: "address0", // 고객의 주요 주소를 나타내는 속성
            value: String(address), // 주소 값을 문자열로 변환하여 저장
          },
          {
            property: "address1", // 고객의 세부 주소를 나타내는 속성 (현재는 빈 문자열로 설정)
            value: "",
          },
          {
            property: "email", // 고객의 이메일을 나타내는 속성
            value: String(email), // 이메일 값을 문자열로 변환하여 저장
          },
          {
            property: "pyeong", // 고객의 평수를 나타내는 속성
            value: String(pyeong), // 평수 값을 문자열로 변환하여 저장
          },
          {
            property: "movein", // 고객의 이사 날짜를 나타내는 속성
            value: dateToString(expected), // 이사 날짜를 문자열로 변환하여 저장
          },
          {
            property: "living", // 고객의 현재 거주 여부를 나타내는 속성
            value: livingNow ? "거주중" : "이사", // 거주 중인 경우 "거주중", 아니면 "이사"로 설정
          },
          {
            property: "etc", // 기타 정보를 나타내는 속성
            value: String(etc), // 기타 정보 값을 문자열로 변환하여 저장
          },
          {
            property: "contract", // 고객의 계약 상태를 나타내는 속성
            value: String(contract), // 계약 상태 값을 문자열로 변환하여 저장
          },
        ];

        // 유효한 전화번호 형식인지 확인
        if (/0[0-9][0-9]?\-[0-9][0-9][0-9][0-9]?\-[0-9][0-9][0-9][0-9]/gi.test(phone)) {
          // 이름이 유효한 길이인지 확인 (2자 이상 8자 이하)
          if (name.length < 9 && name.length > 1) {
            // 이름이 유효하지 않은 경우(특정 키워드를 포함하는지 확인)
            if (/없/gi.test(name) || /없음/gi.test(name) || /딱히/gi.test(name) || /비공개/gi.test(name) || /않/gi.test(name) || /개인샵/gi.test(name) || /개인샾/gi.test(name) || /필라테스/gi.test(name) || /필름도배/gi.test(name)) {
              await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo }); // 유효하지 않은 이름의 경우 injection 값을 1로 설정하여 업데이트
            } else {
              response = await back.getClientsByQuery({ phone }, { selfMongo: selfCoreMongo }) // 동일한 전화번호로 기존 클라이언트 조회
              if (response.length === 0) { // 기존 클라이언트가 없는 경우

                // 신규 클라이언트를 생성하기 위해 요청 전송
                clientResponse = await requestSystem("https://" + instance.address.officeinfo.host + ":3002/clientSubmit", {
                  map
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                // 클라이언트 ID가 없으면 오류 발생
                if (clientResponse.data.cliid === undefined) {
                  throw new Error("");
                }
                cliid = clientResponse.data.cliid; // 클라이언트 ID 저장

                // 클라이언트 분석 데이터를 전송
                await homeliaisonAnalytics({
                  action: "login",
                  data: {
                    cliid,
                    date: dateToString(new Date(), true),
                  },
                });
                await sleep(5000); // 5초 대기

                // 기본 쿼리 객체 설정
                defaultQueryObject = {
                  newMode: true,
                  method: "client",
                  id: cliid
                };
                whereQuery = { cliid }; // 클라이언트 ID 기반의 조회 조건 설정

                // 클라이언트의 서비스 ID 업데이트
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.service.serid"] = [ serid ]; // 서비스 ID 설정
                updateQuery["curation.check.serid"] = serid; // 서비스 ID 확인용 설정
                coreQuery["requests." + String(requestNumber) + ".analytics.response.service.serid"] = serid; // 요청 번호 기반으로 서비스 ID를 설정
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(100); // 100ms 대기

                // 클라이언트의 구매 정보 업데이트
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.purchase"] = Number.isNaN(Number(purchase)) ? 0 : Number(purchase); // 구매 정보 확인 후 업데이트
                coreQuery["requests." + String(requestNumber) + ".request.furniture"] = purchaseArr[Number.isNaN(Number(purchase)) ? 0 : Number(purchase)]; // 구매 정보를 요청 데이터에 업데이트
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(100); // 100ms 대기

                // 클라이언트의 상담 가능 시간을 빈 배열로 초기화하고, 예산 정보를 추가
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.time"] = []; // 상담 가능 시간을 초기화
                updateQuery["budget"] = "상담 가능 시간 : \n" + [].join(", "); // 예산 정보에 상담 가능 시간을 추가
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(100); // 100ms 대기

                // 클라이언트의 예산 정보 업데이트
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.check.budget"] = budgetArr.findIndex((s) => { return s === budget }); // 예산 정보를 찾아서 설정
                coreQuery["requests." + String(requestNumber) + ".request.budget"] = budget; // 요청 번호에 따라 예산 정보를 설정
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(100); // 100ms 대기

                // 클라이언트의 이미지 세트를 업데이트
                updateQuery = {};
                coreQuery = {};
                updateQuery["curation.image"] = objectDeepCopy(staticImageSet); // 이미지 세트를 깊은 복사하여 설정
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(100); // 100ms 대기

                // 클라이언트의 상담 가능 시간을 업데이트
                updateQuery = {};
                coreQuery = {};
                updateQuery["budget"] = "상담 가능 시간 : \n" + (typeof target.data.time === "string" ? target.data.time : ""); // 상담 가능 시간 설정
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/updateHistory", {
                  ...defaultQueryObject,
                  updateQuery,
                  coreQuery
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.frontinfo.host,
                  }
                });

                await sleep(3 * 1000); // 3초 대기

                // MongoDB에 injection 값을 1로 업데이트
                await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });

                await sleep(1000); // 1초 대기

                // 알림톡 전송
                await requestSystem("https://" + instance.address.officeinfo.host + ":3002/alimTalk", {
                  method: "pushClient", // 알림톡 전송 방식
                  name: String(name), // 클라이언트 이름 설정
                  phone: String(phone), // 클라이언트 전화번호 설정
                  option: {
                    client: String(name), // 클라이언트 이름 설정
                    host: instance.address.frontinfo.host, // 프론트엔드 호스트 정보 설정
                    path: "curation", // 경로 설정
                    cliid: cliid, // 클라이언트 ID 설정
                  }
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    "origin": instance.address.officeinfo.host,
                  }
                });

                await sleep(1000); // 1초 대기

              } else {
                // 기존 클라이언트가 존재하는 경우 injection 값을 1로 업데이트
                await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
              }
            }
          } else {
            // 이름 길이가 유효하지 않은 경우 injection 값을 1로 업데이트
            await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
          }
        } else {
          // 전화번호 형식이 유효하지 않은 경우 injection 값을 1로 업데이트
          await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
        }
      } catch (e) {
        // 오류 발생 시 로그 기록 및 알림
        console.log(e);
        if (logger !== null) {
          logger.error("intant error : " + thisId + " / " + e.message).catch((err) => { console.log(err) });
        }
        emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + e.message).catch((err) => { console.log(err); });
        await back.mongoUpdate(collection, [ { id: thisId }, { injection: 1 } ], { selfMongo });
      }
    }

  } catch (e) {
    // 전역 오류 처리 및 알림
    emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + e.message).catch((err) => { console.log(err); });
    emergencyAlarm("FacebookAPIs.metaInstantToClient error : " + JSON.stringify(e?.response?.data?.error)).catch((err) => { console.log(err); });
    console.log(e);
    console.log("FacebookAPIs.metaInstantToClient error : " + JSON.stringify(e?.response?.data?.error));
  }
}

/**
 * Facebook과 Instagram 광고 캠페인 및 인스타그램 성과 데이터를 수집하여 MongoDB에 저장하는 함수입니다.
 * @param {Object} selfMongo - MongoDB 연결 객체입니다.
 * @param {number} [dayNumber=2] - 수집할 일 수를 지정합니다. 기본값은 2일입니다.
 * @param {Object} [logger=null] - 로그를 기록하기 위한 로거 객체입니다. 기본값은 null입니다.
 * @returns {boolean} - 작업 성공 여부를 반환합니다.
 */
FacebookAPIs.prototype.metaComplex = async function (selfMongo, dayNumber = 2, logger = null) {
  // 현재 인스턴스를 instance로 저장합니다.
  const instance = this;
  // back 및 필요한 Facebook API 관련 정보를 인스턴스에서 가져옵니다.
  const back = this.back;
  // Mother 클래스에서 필요한 메서드들을 가져옵니다.
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, emergencyAlarm, zeroAddition, objectDeepCopy } = this.mother;
  // Facebook API 관련 변수들을 가져옵니다.
  const { facebookAppId, facebookAppSecret, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion, facebookUserId, facebookAdAccountId } = this;
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;
  const AdSet = bizSdk.AdSet; // 광고 세트를 나타내는 클래스입니다.
  const Ad = bizSdk.Ad; // 광고를 나타내는 클래스입니다.

  try {
    // MongoDB 컬렉션 이름을 설정합니다.
    const collection = "metaComplex";
    const idKeyword = 'f'; // 캠페인 ID의 접두사를 설정합니다.
    const metaKeyword = 'f'; // 메타 키워드를 설정합니다.
    const metaKeyKeyword = "meta"; // 메타 키 키워드를 설정합니다.
    const delta = 30 * 1000; // 각 요청 사이의 대기 시간 (30초)입니다.
    let tempRows; // 임시로 데이터를 저장할 변수입니다.
    let res; // Facebook API로부터의 응답을 저장할 변수입니다.
    let json; // MongoDB에 저장할 데이터를 담는 객체입니다.
    let from, to; // 각 통계의 시작일과 종료일을 나타냅니다.
    let startDate; // 통계 수집을 시작할 날짜입니다.
    let num; // 카운터 역할을 할 변수입니다.
    let key; // MongoDB에 저장될 문서의 고유 키입니다.
    let now; // 현재 날짜를 나타내는 변수입니다.
    let campaignId; // 캠페인 ID를 저장할 변수입니다.
    let adsetId; // 광고 세트 ID를 저장할 변수입니다.
    let targetObj; // 타겟 객체를 임시로 저장할 변수입니다.
    let fields, params, campaigns; // API 요청을 위한 필드, 파라미터, 캠페인 목록을 저장할 변수입니다.
    let campaign; // 개별 캠페인을 저장할 변수입니다.
    let result; // API 결과를 저장할 변수입니다.
    let adsets; // 광고 세트 목록을 저장할 변수입니다.
    let adset, adsetArr; // 개별 광고 세트 및 광고 세트 배열을 저장할 변수입니다.
    let ads; // 광고 목록을 저장할 변수입니다.
    let ad, adArr; // 개별 광고 및 광고 배열을 저장할 변수입니다.
    let target; // 타겟 광고 세트를 저장할 변수입니다.
    let id; // 임시 ID를 저장할 변수입니다.
    let campaignResult; // 캠페인 결과를 저장할 변수입니다.
    let accountResult; // 계정 결과를 저장할 변수입니다.
    let adResult; // 광고 결과를 저장할 변수입니다.
    let thisAdId; // 현재 광고 ID를 저장할 변수입니다.
    let thisAdSet; // 현재 광고 세트를 저장할 변수입니다.
    let resultObj; // 최종 결과 객체를 저장할 변수입니다.
    let tempAdsTong; // 임시 광고 데이터 배열을 저장할 변수입니다.
    let campaignTarget; // 현재 캠페인 타겟을 저장할 변수입니다.
    let thisAdSetSet; // 광고 세트 ID 집합을 저장할 변수입니다.

    // 기본 수집 일 수를 2일로 설정합니다.
    dayNumber = 2;

    // 캠페인 목록을 가져오기 위한 필드 및 파라미터를 설정합니다.
    fields = [ "name" ];
    params = {};
    accountResult = await (new AdAccount(facebookAdAccountId)).getCampaigns(
      fields,
      params
    );

    // 현재 날짜를 저장합니다.
    now = new Date();
    // 통계를 시작할 날짜를 현재 날짜로 설정합니다.
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    // 수집할 일 수만큼 날짜를 과거로 설정합니다.
    for (let i = 0; i < dayNumber; i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // 수집할 각 날짜에 대해 데이터를 처리합니다.
    for (let i = 0; i < dayNumber; i++) {

      // 각 요청 사이에 대기 시간을 줍니다.
      await sleep(delta);

      // 첫 번째 반복에서 시작일과 종료일을 설정합니다.
      if (i === 0) {
        from = new Date(JSON.stringify(startDate).slice(1, -1));
        to = new Date(JSON.stringify(startDate).slice(1, -1));
        to.setDate(to.getDate() + 1);
      } else {
        // 그 이후 반복에서는 날짜를 하루씩 증가시킵니다.
        from.setDate(from.getDate() + 1);
        to.setDate(to.getDate() + 1);
      }

      // MongoDB에 저장할 고유 키를 생성합니다.
      key = dateToString(from).replace(/\-/gi, '') + "_" + metaKeyKeyword;
      // MongoDB에 저장할 JSON 데이터를 구성합니다.
      json = {
        camid: idKeyword + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + metaKeyword + 'a' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        advertisement: {
          value: {
            charge: 0, // 광고 비용을 초기화합니다.
            performance: {
              reach: 0, // 도달 범위를 초기화합니다.
              impressions: 0, // 노출 수를 초기화합니다.
              clicks: 0, // 클릭 수를 초기화합니다.
            },
            length: {
              campaign: 0, // 캠페인 수를 초기화합니다.
              adset: 0, // 광고 세트 수를 초기화합니다.
              ad: 0, // 광고 수를 초기화합니다.
            }
          },
          campaign: [], // 캠페인 목록을 초기화합니다.
        },
        instagram: {
          profile: {
            views: 0, // 프로필 조회 수를 초기화합니다.
            followers: 0, // 팔로워 수를 초기화합니다.
          },
          performance: {
            impressions: 0, // 노출 수를 초기화합니다.
            clicks: 0, // 클릭 수를 초기화합니다.
            likes: 0, // 좋아요 수를 초기화합니다.
            comments: 0, // 댓글 수를 초기화합니다.
            saves: 0, // 저장 수를 초기화합니다.
            shares: 0, // 공유 수를 초기화합니다.
          }
        }
      };

      // 캠페인 데이터를 수집합니다.
      await sleep(delta);

      campaigns = [];
      for (let o of accountResult) {
        id = o._data.id;

        // 캠페인 성과 데이터를 가져옵니다.
        campaignResult = await (new Campaign(id)).getInsights([
          "account_id",
          "campaign_id",
          "campaign_name",
          "reach",
          "impressions",
          "spend",
          "clicks",
          "date_start",
          "date_stop",
        ], {
          "time_range": {
            "since": dateToString(from),
            "until": dateToString(from),
          }
        });

        // 각 캠페인에 대한 데이터를 처리합니다.
        for (let c of campaignResult) {
          json.advertisement.campaign.unshift({
            value: {
              charge: Number(c._data.spend),
              performance: {
                reach: Number(c._data.reach),
                impressions: Number(c._data.impressions),
                clicks: Number(c._data.clicks),
              },
            },
            information: {
              id: c._data.campaign_id,
              account: c._data.account_id,
              name: c._data.campaign_name,
            },
            children: [],
          });
        }

        // 캠페인 결과가 있는 경우
        if (campaignResult.length > 0) {

          await sleep(delta);

          // 광고 세트를 가져옵니다.
          adsets = await (new Campaign(id)).getAdSets([ "name" ], {});
          adsetArr = [];
          for (let a of adsets) {
            adset = {};
            adset.id = a._data.id;
            adset.name = a._data.name;
            adset.ad = [];
            adsetArr.push(objectDeepCopy(adset));
          }

          // 광고를 가져옵니다.
          ads = await (new Campaign(id)).getAds([ "name", "adset_id" ], {});
          for (let a of ads) {
            thisAdSet = adsetArr.find((adset) => { return adset.id === a._data.adset_id });
            ad = {};
            ad.id = a._data.id;
            ad.name = a._data.name;
            if (thisAdSet !== undefined) {
              thisAdSet.ad.push(objectDeepCopy(ad));
            }
          }

          // 광고 데이터를 임시로 저장합니다.
          tempAdsTong = [];
          for (let adset of adsetArr) {
            for (let ad of adset.ad) {
              thisAdId = ad.id;
              await sleep(delta);
              // 광고 성과 데이터를 가져옵니다.
              adResult = await (new Ad(thisAdId)).getInsights([
                "adset_id",
                "adset_name",
                "ad_id",
                "ad_name",
                "reach",
                "impressions",
                "spend",
                "clicks",
                "date_start",
                "date_stop",
              ], {
                "time_range": {
                  "since": dateToString(from),
                  "until": dateToString(from),
                }
              });
              // 각 광고에 대한 결과를 처리합니다.
              for (let adResultFactor of adResult) {
                resultObj = {
                  value: {
                    charge: Number(adResultFactor._data.spend),
                    performance: {
                      reach: Number(adResultFactor._data.reach),
                      impressions: Number(adResultFactor._data.impressions),
                      clicks: Number(adResultFactor._data.clicks),
                    },
                  },
                  information: {
                    id: adResultFactor._data.ad_id,
                    adset: adResultFactor._data.adset_id,
                    name: adResultFactor._data.ad_name,
                  },
                };
                // 결과 객체를 임시 광고 배열에 추가합니다.
                tempAdsTong.push(objectDeepCopy(resultObj));
              }
            }
          }

          // 광고 세트 ID 집합을 생성합니다.
          thisAdSetSet = [ ...new Set(tempAdsTong.map((o) => { return o.information.adset })) ];
          // 유효한 광고 세트만 남깁니다.
          adsetArr = adsetArr.filter((a) => { return thisAdSetSet.includes(a.id) });
          // 현재 캠페인 타겟을 찾습니다.
          campaignTarget = json.advertisement.campaign.find((o) => { return id === o.information.id });

          // 광고 세트별로 광고 데이터를 처리합니다.
          for (let adset of adsetArr) {
            campaignTarget.children.unshift({
              value: {
                charge: 0,
                performance: {
                  reach: 0,
                  impressions: 0,
                  clicks:0,
                },
              },
              information: {
                id: adset.id,
                campaign: id,
                name: adset.name,
              },
              children: [],
            });
            for (let adObj of tempAdsTong) {
              if (adObj.information.adset === adset.id) {
                campaignTarget.children[0].children.unshift(objectDeepCopy(adObj));
              }
            }
            // 광고 세트의 성과 데이터를 집계합니다.
            campaignTarget.children[0].value.charge = campaignTarget.children[0].children.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
            campaignTarget.children[0].value.performance.reach = campaignTarget.children[0].children.reduce((acc, curr) => { return acc + curr.value.performance.reach }, 0);
            campaignTarget.children[0].value.performance.impressions = campaignTarget.children[0].children.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
            campaignTarget.children[0].value.performance.clicks = campaignTarget.children[0].children.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
          }
        }

      }

      // 캠페인 요약 데이터를 집계합니다.
      if (json.advertisement.campaign.length > 0) {
        json.advertisement.value.charge = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.charge }, 0);
        json.advertisement.value.performance.reach = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.reach }, 0);
        json.advertisement.value.performance.impressions = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.impressions }, 0);
        json.advertisement.value.performance.clicks = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.value.performance.clicks }, 0);
        json.advertisement.value.length.campaign = json.advertisement.campaign.length;
        json.advertisement.value.length.adset = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.children.length }, 0);
        json.advertisement.value.length.ad = json.advertisement.campaign.reduce((acc, curr) => { return acc + curr.children.reduce((a, c) => { return a + c.children.length }, 0) }, 0);
      }

      // 인스타그램 데이터를 수집합니다.
      await sleep(60 * 1000); // 수집 전 1분 대기
      await sleep(delta);
      // 인스타그램 성과 지표를 가져옵니다.
      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
        metric: "impressions,profile_views,follower_count,website_clicks",
        period: "day",
        since: dateToString(from),
        access_token: facebookToken
      }, { method: "get" });

      // 각 지표를 JSON에 저장합니다.
      [ impressions, profile, follower, website ] = res.data.data;
      try {
        json.instagram.performance.impressions = impressions.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.performance.impressions = 0;
      }
      try {
        json.instagram.profile.views = profile.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.profile.views = 0;
      }
      try {
        json.instagram.profile.followers = follower.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.profile.followers = 0;
      }
      try {
        json.instagram.performance.clicks = website.values.find((o) => { return o.end_time.slice(0, 10) === dateToString(from) }).value;
      } catch {
        json.instagram.performance.clicks = 0;
      }
      await sleep(delta);
      await sleep(delta);
      // 추가 인스타그램 지표를 가져옵니다.
      res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
        metric: "likes,comments,saves,shares",
        metric_type: "total_value",
        period: "day",
        since: dateToString(from),
        until: dateToString(to),
        access_token: facebookToken
      }, { method: "get" });
      // JSON에 추가 지표를 저장합니다.
      json.instagram.performance.likes = res.data.data.find((o) => { return o.name === "likes" }).total_value.value;
      json.instagram.performance.comments = res.data.data.find((o) => { return o.name === "comments" }).total_value.value;
      json.instagram.performance.saves = res.data.data.find((o) => { return o.name === "saves" }).total_value.value;
      json.instagram.performance.shares = res.data.data.find((o) => { return o.name === "shares" }).total_value.value;

      // MongoDB에 저장하기 전에 기존 데이터를 삭제합니다.
      tempRows = await back.mongoRead(collection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        await back.mongoDelete(collection, { key }, { selfMongo });
      }
      // 새 데이터를 MongoDB에 저장합니다.
      await back.mongoCreate(collection, json, { selfMongo });

      // 저장된 데이터를 콘솔에 출력합니다.
      console.log(json);
      // 다음 수집 전 3분 대기합니다.
      await sleep(3 * 60 * 1000);
    }

    // 로그를 기록할 로거가 있으면 작업 완료 로그를 남깁니다.
    if (logger !== null) {
      logger.cron("meta complex store done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

    return true;

  } catch (e) {
    // 오류 발생 시 긴급 알람을 보내고 오류 로그를 남깁니다.
    emergencyAlarm("FacebookAPIs.metaComplex error : " + e.message).catch((err) => { console.log(err); });
    console.log(e);
    return false;
  }
}

/**
 * 인스타그램의 일일 통계를 수집하여 MongoDB에 저장하는 함수입니다.
 * @param {Object} selfMongo - MongoDB 연결 객체입니다.
 * @param {number} [dayNumber=7] - 수집할 일 수를 지정합니다. 기본값은 7일입니다.
 * @param {Object} [logger=null] - 로그를 기록하기 위한 로거 객체입니다. 기본값은 null입니다.
 */
FacebookAPIs.prototype.dailyInstagram = async function (selfMongo, dayNumber = 7, logger = null) {
  // 현재 인스턴스를 instance로 저장합니다.
  const instance = this;
  // back 및 필요한 Facebook API 관련 정보를 인스턴스에서 가져옵니다.
  const back = this.back;
  const { facebookAppId, facebookToken, facebookPageId, instagramId, facebookAdId, appVersion } = this;
  // Mother 클래스에서 필요한 메서드들을 가져옵니다.
  const { sleep, dateToString, stringToDate, sha256Hmac, requestSystem, errorLog, zeroAddition } = this.mother;
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;
  try {
    // MongoDB 컬렉션 이름을 설정합니다.
    const channelCollection = "dailyChannel";
    let res; // Facebook API로부터의 응답을 저장할 변수입니다.
    let startDate; // 통계 수집을 시작할 날짜입니다.
    let impressions, profile, follower, website; // 각 인스타그램 통계 지표를 저장할 변수입니다.
    let json; // MongoDB에 저장할 데이터를 담는 객체입니다.
    let from, to; // 각 통계의 시작일과 종료일을 나타냅니다.
    let key; // MongoDB에 저장될 문서의 고유 키입니다.
    let tempRows; // 임시로 데이터를 저장할 변수입니다.
    let now; // 현재 날짜를 나타내는 변수입니다.

    // 현재 날짜를 저장합니다.
    now = new Date();
    // startDate를 현재 날짜로 설정합니다.
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 수집할 일 수만큼 날짜를 과거로 설정합니다.
    for (let i = 0; i < (dayNumber - 1); i++) {
      startDate.setDate(startDate.getDate() - 1);
    }

    // Facebook Graph API를 통해 인스타그램 통계를 가져옵니다.
    res = await requestSystem("https://graph.facebook.com/" + appVersion + "/" + instagramId + "/insights", {
      metric: "impressions,profile_views,follower_count,website_clicks", // 수집할 통계 지표입니다.
      period: "day", // 통계 수집 주기를 하루 단위로 설정합니다.
      since: dateToString(startDate), // 통계를 시작할 날짜입니다.
      access_token: facebookToken // Facebook API 액세스 토큰입니다.
    }, { method: "get" });

    // 수집한 통계 데이터를 개별 변수에 저장합니다.
    [ impressions, profile, follower, website ] = res.data.data;

    // 각 날짜별로 데이터를 처리합니다.
    for (let i = 0; i < impressions.values.length; i++) {
      // 통계의 시작일을 저장합니다.
      from = stringToDate(impressions.values[i].end_time.slice(0, 10));
      // 통계의 종료일을 저장합니다. 종료일은 시작일의 다음 날로 설정합니다.
      to = stringToDate(impressions.values[i].end_time.slice(0, 10));
      to.setDate(to.getDate() + 1);

      // 각 통계 데이터의 고유 키를 생성합니다.
      key = dateToString(from).replace(/\-/gi, '') + "_" + "instagram";

      // MongoDB에 저장할 데이터를 구성합니다.
      json = {
        chaid: 'h' + String(from.getFullYear()).slice(2) + zeroAddition(from.getMonth() + 1) + '_' + 'f' + 'i' + zeroAddition(from.getDate()) + 's',
        key,
        date: { from, to },
        value: {
          profile: {
            views: profile.values[i].value, // 프로필 조회 수입니다.
            followers: follower.values[i].value, // 팔로워 수입니다.
          },
          performance: {
            impressions: impressions.values[i].value, // 노출 수입니다.
            clicks: website.values[i].value, // 웹사이트 클릭 수입니다.
          }
        },
        information: {
          mother: "facebook", // 데이터 출처를 나타냅니다.
          type: "instagram", // 데이터 타입을 나타냅니다.
        }
      };

      // MongoDB에서 해당 날짜에 해당하는 데이터가 있는지 확인합니다.
      tempRows = await back.mongoRead(channelCollection, { key }, { selfMongo });
      if (tempRows.length !== 0) {
        // 기존 데이터가 있으면 삭제합니다.
        await back.mongoDelete(channelCollection, { key }, { selfMongo });
      }
      // 새 데이터를 MongoDB에 저장합니다.
      await back.mongoCreate(channelCollection, json, { selfMongo });
      // 저장된 데이터를 콘솔에 출력합니다.
      console.log(json);
    }

    // 로그를 기록할 로거가 있으면 작업 완료 로그를 남깁니다.
    if (logger !== null) {
      logger.cron("facebook daily instagram done : " + dateToString(new Date())).catch((err) => { console.log(err); });
    }

  } catch (e) {
    // 오류가 발생하면 오류 로그를 남기고 콘솔에 출력합니다.
    await errorLog("FacebookAPIs.dailyInstagram error : " + e.message);
    console.log(e);
  }
}

/**
 * Facebook의 Conversion Event를 전송하는 함수입니다.
 * 이 함수는 Facebook Pixel을 사용하여 특정 이벤트(예: 구매, 페이지 방문 등)를 전송합니다.
 * @param {Object} obj - 전송할 이벤트에 대한 정보가 담긴 객체입니다.
 * @param {string} obj.name - 이벤트 이름입니다.
 * @param {Object} obj.data - 사용자 데이터 객체입니다.
 * @param {string} obj.data.ip - 사용자의 IP 주소입니다.
 * @param {string} obj.data.userAgent - 사용자의 User Agent 정보입니다.
 * @param {Object} obj.custom - 이벤트에 대한 추가 사용자 정의 데이터입니다.
 * @returns {Promise<Object|null>} - 이벤트 전송 성공 시 메시지를 포함한 객체를 반환하며, 실패 시 null을 반환합니다.
 */
FacebookAPIs.prototype.conversionEvent = async function (obj) {
  // 현재 인스턴스를 참조하기 위해 instance로 저장합니다.
  const instance = this;
  // Mother 클래스에서 requestSystem과 emergencyAlarm 메서드를 가져옵니다.
  const { requestSystem, emergencyAlarm } = this.mother;
  // Facebook 관련 API 정보를 인스턴스에서 가져옵니다.
  const { facebookToken, pixelId, appVersion } = this;
  // Facebook 비즈니스 SDK에서 필요한 객체들을 인스턴스에서 가져옵니다.
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;

  try {
    // Facebook Pixel 이벤트를 전송할 URL을 설정합니다.
    const url = `https://graph.facebook.com/${appVersion}/${pixelId}/events?access_token=${facebookToken}`;
    let res, data;
    let injectionObject;

    // 전송할 이벤트 데이터를 설정합니다.
    // event_name: 이벤트 이름
    // event_time: 현재 시간을 초 단위로 설정
    // event_source_url: 이벤트가 발생한 URL
    // action_source: 이벤트가 발생한 소스 (웹사이트)
    // user_data: 사용자의 IP 주소와 User Agent 정보
    // custom_data: 사용자가 제공한 추가 데이터
    injectionObject = {
      event_name: obj.name,
      event_time: Math.floor((new Date()).valueOf() / 1000),
      event_source_url: "https://" + instance.address.frontinfo.host,
      action_source: "website",
      user_data: {
        client_ip_address: obj.data.ip,
        client_user_agent: obj.data.userAgent,
      },
      custom_data: { ...obj.custom },
    };

    // data 배열에 injectionObject를 담습니다.
    data = [ injectionObject ];

    // Facebook API로 요청을 보냅니다.
    res = await requestSystem(url, { data }, {
      headers: { "Content-Type": "application/json" }
    });

    // 성공 메시지를 반환합니다.
    return { message: "success" };

  } catch (e) {
    // 오류 발생 시, emergencyAlarm을 통해 알림을 보내고 오류를 콘솔에 출력합니다.
    await emergencyAlarm("FacebookAPIs.conversionEvent error : " + e.message);
    console.log(e);
    return null;
  }
}

/**
 * Facebook API를 사용하여 새 액세스 토큰을 가져오는 함수입니다.
 * 이 함수는 기존의 Facebook 액세스 토큰을 연장하거나 새로 발급받는 데 사용됩니다.
 * @returns {Promise<void>} - 반환값이 없으며, 콘솔에 결과를 출력합니다.
 */
FacebookAPIs.prototype.getAccessToken = async function () {
  // 인스턴스 내의 변수를 참조하기 위해 instance로 현재 인스턴스를 저장합니다.
  const instance = this;
  // Mother 메서드에서 requestSystem 함수를 가져옵니다.
  const { requestSystem } = this.mother;
  // Facebook 관련 API 정보를 인스턴스에서 가져옵니다.
  const { facebookAppId, facebookAppSecret, facebookPageId, instagramId, facebookAdId } = this;
  // Facebook 비즈니스 SDK에서 필요한 객체들을 인스턴스에서 가져옵니다.
  const { bizSdk, FacebookAdsApi, AdAccount, Campaign, account } = this;

  try {
    // Facebook OAuth 토큰을 가져오기 위한 URL입니다.
    const url = "https://graph.facebook.com/oauth/access_token";
    let res, token;

    // 사용 중인 Facebook 액세스 토큰을 지정합니다.
    // 여기서 token 변수는 기존에 사용 중인 액세스 토큰입니다.
    token = "EAAZBU9pw9OFcBO9CwZA4486c8IKJdPZAHhcPn7BWQGcGZAnB7tnQa5Ca9EomJUMikGOtg1IR7wghHjz9GFZByNkw9jOyNUXvEdRZCHQmtmcdEZAgnFzsLO8TngSwW86Fz9TeNYS7Wf3ZBDR1dJ5GR8TQq3lzpN8KGTwMo41sLBiptiSTLSCoJUqbEOlSjcBDLlU34ENs3G9T8u8iVxGk1kZCYko2pMMQq1Qb8oYcZD";

    // Facebook OAuth 토큰 갱신을 요청하는 API 호출을 수행합니다.
    res = await requestSystem(url, {
      grant_type: "fb_exchange_token",  // 토큰 교환을 위한 grant_type 파라미터입니다.
      client_id: facebookAppId,         // Facebook 앱의 ID입니다.
      client_secret: facebookAppSecret, // Facebook 앱의 시크릿 키입니다.
      fb_exchange_token: token,         // 교환할 기존 액세스 토큰입니다.
    }, { method: "get" });

    // API 호출의 결과를 콘솔에 출력합니다.
    console.log(res.data);

  } catch (e) {
    // 오류가 발생할 경우 오류 메시지를 콘솔에 출력합니다.
    console.log(e);
  }
}

module.exports = FacebookAPIs;
