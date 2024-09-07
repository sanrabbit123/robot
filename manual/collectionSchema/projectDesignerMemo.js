/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔에서 특정 프로젝트 상태에 대한 메모를 작성한 기록을 저장하는 데이터베이스.
 */
const collectionName = "projectDesignerMemo";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 각 프로젝트의 상태에 대해 디자이너가 작성한 메모를 기록한 디비입니다. 디자이너가 프로젝트의 진행 상태에 따라 메모를 추가하고 관리합니다.
 */
const collectionDescription = "디자이너가 디자이너 콘솔에서 해당 프로젝트의 상태에 각각 메모를 적은 기록";

/**
 * @typedef {Object} ProjectDesignerMemo
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트의 고유 ID
 * @property {string} desid 디자이너의 고유 ID
 * @property {string} key 프로젝트와 관련된 상태의 식별자 (예: 'settingGuide', 'productList')
 * @property {Object} contents 메모 내용이 포함된 객체
 * @property {string} contents.memo 메모의 실제 내용
 * @property {string} contents.type 메모가 관련된 프로젝트의 상태 유형 (예: 'settingGuide', 'productList')
 */

/**
 * 샘플 데이터 0
 * @type {ProjectDesignerMemo}
 * @description 디자이너 'd2407_aa08s'가 'p2408_ab75s' 프로젝트의 'settingGuide' 상태에 대해 메모한 기록.
 */
const collectionSampleData0 = {
  _id: "66db46f44931bbf5cdb30da5", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2408_ab75s", // 프로젝트의 고유 ID ('p2408_ab75s')
  desid: "d2407_aa08s", // 디자이너의 고유 ID ('d2407_aa08s')
  key: "p2408_ab75s_settingGuide", // 프로젝트 상태에 대한 식별자 ('settingGuide')
  contents: {
    memo: "제안서에 포함", // 해당 상태에 대한 메모 내용 ('제안서에 포함')
    type: "settingGuide" // 상태 유형 ('settingGuide')
  }
};

/**
 * 샘플 데이터 1
 * @type {ProjectDesignerMemo}
 * @description 디자이너 'd2206_aa01s'가 'p2305_aa77s' 프로젝트의 'productList' 상태에 대해 메모한 기록.
 */
const collectionSampleData1 = {
  _id: "66c0a4df8e915b93c82d5493", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2305_aa77s", // 프로젝트의 고유 ID ('p2305_aa77s')
  desid: "d2206_aa01s", // 디자이너의 고유 ID ('d2206_aa01s')
  key: "p2305_aa77s_productList", // 프로젝트 상태에 대한 식별자 ('productList')
  contents: {
    memo: "https://docs.google.com/spreadsheets/d/1yjfL9w07DS1AgVk38Z_qSaDfScpjwK9W7RQ9PHLL95Q/edit#gid826490756", // 해당 상태에 대한 메모 내용 (구글 스프레드시트 링크)
    type: "productList" // 상태 유형 ('productList')
  }
};