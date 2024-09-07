/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 콘솔을 통해 특정 프로젝트의 상태 체크를 한 기록을 저장하는 데이터베이스
 */
const collectionName = "projectDesignerStatus";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 프로젝트의 다양한 상태(디자인, 시공, 구매, 세팅)에 대한 체크 및 업데이트를 저장하는 데이터베이스입니다.
 */
const collectionDescription = "디자이너가 디자이너 콘솔에서 특정 프로젝트의 상태 체크를 체크한 기록";

/**
 * @typedef {Object} ProjectStatus
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트의 고유 ID
 * @property {string} desid 디자이너의 고유 ID
 * @property {Array<Object>} matrix 상태 체크 항목에 대한 상세 데이터
 */

/**
 * 샘플 데이터 0
 * @type {ProjectStatus}
 * @description 프로젝트 'p2409_aa25s'와 관련된 디자이너 'd2309_aa07s'가 프로젝트 상태를 체크한 기록.
 */
const collectionSampleData0 = {
  _id: "66db32a84931bbf5cdb30d6f", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2409_aa25s", // 프로젝트의 고유 ID
  desid: "d2309_aa07s", // 디자이너의 고유 ID
  matrix: [
    {
      title: "디자인", // 상태 제목: 디자인과 관련된 작업
      children: [
        {
          title: "현장 미팅 완료", // 상태 세부 항목: 현장 미팅 완료
          type: "upload", // 항목 타입: 업로드
          deactive: false, // 비활성화 여부: 활성화
          value: 0, // 상태 값: 0
          key: "firstPhoto", // 상태 항목의 키: 'firstPhoto'
          children: [
            {
              title: "현장 사진 업로드", // 세부 항목: 현장 사진 업로드
              type: "upload", // 항목 타입: 업로드
              key: "firstPhoto", // 관련 키: 'firstPhoto'
              photo: true // 사진 여부: 사진을 포함함
            },
            {
              title: "현장 사진 메모", // 세부 항목: 현장 사진에 대한 메모
              type: "memo", // 항목 타입: 메모
              key: "firstPhoto" // 관련 키: 'firstPhoto'
            }
          ]
        },
        {
          title: "일정표 공유", // 상태 세부 항목: 일정표 공유
          type: "upload", // 항목 타입: 업로드
          deactive: false, // 비활성화 여부: 활성화
          value: 0, // 상태 값: 0
          key: "scheduleInfo", // 상태 항목의 키: 'scheduleInfo'
          children: [
            {
              title: "일정표 업로드", // 세부 항목: 일정표 업로드
              type: "upload", // 항목 타입: 업로드
              key: "scheduleInfo", // 관련 키: 'scheduleInfo'
              photo: false // 사진 여부: 사진을 포함하지 않음
            },
            {
              title: "일정표 메모", // 세부 항목: 일정표에 대한 메모
              type: "memo", // 항목 타입: 메모
              key: "scheduleInfo" // 관련 키: 'scheduleInfo'
            }
          ]
        }
      ]
    },
    {
      title: "시공", // 상태 제목: 시공과 관련된 작업
      children: [
        {
          title: "시공 의뢰서 공유", // 상태 세부 항목: 시공 의뢰서 공유
          type: "upload", // 항목 타입: 업로드
          deactive: false, // 비활성화 여부: 활성화
          value: 0, // 상태 값: 0
          key: "constructInfo", // 상태 항목의 키: 'constructInfo'
          children: [
            {
              title: "시공 의뢰서 업로드", // 세부 항목: 시공 의뢰서 업로드
              type: "upload", // 항목 타입: 업로드
              key: "constructInfo", // 관련 키: 'constructInfo'
              photo: false // 사진 여부: 사진을 포함하지 않음
            },
            {
              title: "시공 의뢰서 메모", // 세부 항목: 시공 의뢰서에 대한 메모
              type: "memo", // 항목 타입: 메모
              key: "constructInfo" // 관련 키: 'constructInfo'
            }
          ]
        }
      ]
    },
    {
      title: "구매", // 상태 제목: 구매와 관련된 작업
      children: [
        {
          title: "제품 구매 시작 전", // 상태 세부 항목: 제품 구매 시작 전
          type: "upload", // 항목 타입: 업로드
          deactive: false, // 비활성화 여부: 활성화
          value: 0, // 상태 값: 0
          key: "productReady", // 상태 항목의 키: 'productReady'
          children: [
            {
              title: "제품 리스트 업로드", // 세부 항목: 제품 리스트 업로드
              type: "upload", // 항목 타입: 업로드
              key: "productList", // 관련 키: 'productList'
              photo: false // 사진 여부: 사진을 포함하지 않음
            },
            {
              title: "제품 리스트 메모", // 세부 항목: 제품 리스트에 대한 메모
              type: "memo", // 항목 타입: 메모
              key: "productList" // 관련 키: 'productList'
            }
          ]
        }
      ]
    },
    {
      title: "세팅", // 상태 제목: 세팅과 관련된 작업
      children: [
        {
          title: "세팅 완료", // 상태 세부 항목: 세팅 완료
          type: "upload", // 항목 타입: 업로드
          deactive: false, // 비활성화 여부: 활성화
          value: 0, // 상태 값: 0
          key: "settingComplete", // 상태 항목의 키: 'settingComplete'
          children: [
            {
              title: "세팅 완료 사진 업로드", // 세부 항목: 세팅 완료 사진 업로드
              type: "upload", // 항목 타입: 업로드
              key: "settingComplete", // 관련 키: 'settingComplete'
              photo: true // 사진 여부: 사진을 포함함
            },
            {
              title: "세팅 완료 메모", // 세부 항목: 세팅 완료에 대한 메모
              type: "memo", // 항목 타입: 메모
              key: "settingComplete" // 관련 키: 'settingComplete'
            }
          ]
        }
      ]
    }
  ]
};