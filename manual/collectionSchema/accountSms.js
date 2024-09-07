const collectionName = "accountSms";

const collectionDescription = "푸쉬 블렛이 법인폰으로부터 읽은 홈리에종 계좌 알림을 분석한 정보가 쌓여 있는 디비"

/**
 * 홈리에종 계좌 알림 정보를 저장하는 `accountSms` 컬렉션
 * 이 컬렉션은 법인폰으로부터 읽은 푸쉬 블렛 계좌 알림을 분석한 정보를 저장합니다.
 */

/**
 * 첫 번째 샘플 데이터: 2024년 9월 6일에 기록된 계좌 알림 정보
 */
const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "66dac25e8805ec2a19a807ab",  // 이 문서는 MongoDB에서 고유하게 식별되는 ObjectId로 이루어져 있습니다.
  
  /**
   * SMS 알림 ID (id)
   * @type {string}
   */
  "id": "sms_1725612638877_495000",  // 이 알림은 SMS로부터 받은 고유한 알림 ID입니다.
  
  /**
   * 기록된 날짜 (date)
   * @type {string}
   */
  "date": "2024-09-06T08:50:38.877Z",  // 계좌 이체 알림이 수신된 날짜이며, ISO 8601 형식으로 기록됩니다.
  
  /**
   * 이체 금액 (amount)
   * @type {number}
   */
  "amount": 495000,  // 이체된 금액은 495,000원입니다.
  
  /**
   * 이체 상대방 이름 (name)
   * @type {string}
   */
  "name": "아파트멘터리"  // 이체된 상대방의 이름은 '아파트멘터리'입니다.
};

/**
 * 두 번째 샘플 데이터: 2024년 8월 5일에 기록된 계좌 알림 정보
 */
const collectionSampleData1 = {
  "_id": "66b0335899329fd308632b48",  // 두 번째 샘플 데이터의 고유 식별자입니다.
  "id": "sms_1722823511191_1608000",  // 이 SMS 알림의 고유한 ID입니다.
  "date": "2024-08-05T02:05:11.191Z",  // 이 알림이 수신된 날짜는 2024년 8월 5일입니다.
  "amount": 1608000,  // 이체 금액은 1,608,000원입니다.
  "name": "최임지"  // 이체 상대방의 이름은 '최임지'입니다.
};

/**
 * 세 번째 샘플 데이터: 2024년 6월 21일에 기록된 계좌 알림 정보
 */
const collectionSampleData2 = {
  "_id": "66754013cacdc6cd14914273",  // 세 번째 샘플 데이터의 고유 식별자입니다.
  "id": "sms_1718960144676_165000",  // 이 SMS 알림의 고유한 ID입니다.
  "date": "2024-06-21T08:55:44.676Z",  // 이 알림이 수신된 날짜는 2024년 6월 21일입니다.
  "amount": 165000,  // 이체된 금액은 165,000원입니다.
  "name": "오정민"  // 이체 상대방의 이름은 '오정민'입니다.
};
