/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔에서 프로젝트와 관련된 일정 정보를 기록하는 데이터베이스입니다.
 */
const collectionName = "projectDesignerSchedule";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너가 프로젝트와 관련된 일정을 디자이너 콘솔에서 기록한 정보를 저장하는 데이터베이스입니다.
 */
const collectionDescription = "디자이너가 디자이너 콘솔에서 일정표를 적은 정보에 대한 기록";

/**
 * @typedef {Object} Schedule
 * @property {string} title 일정의 제목
 * @property {string} description 일정에 대한 설명
 * @property {Object} date 일정의 날짜 정보
 * @property {string} date.start 시작 날짜 및 시간 (ISO 8601 형식)
 * @property {string} date.end 종료 날짜 및 시간 (ISO 8601 형식)
 */

/**
 * @typedef {Object} ProjectDesignerSchedule
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트의 고유 ID
 * @property {string} desid 디자이너의 고유 ID
 * @property {Schedule[]} schedule 프로젝트와 관련된 일정 리스트
 */

/**
 * 샘플 데이터 0
 * @type {ProjectDesignerSchedule}
 * @description 프로젝트 'p2409_aa17s'에 대한 디자이너 'd2310_aa07s'가 기록한 일정 정보.
 */
const collectionSampleData0 = {
  _id: "66dbfb4d23ae8b1d472188ba", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2409_aa17s", // 프로젝트의 고유 ID ('p2409_aa17s')
  desid: "d2310_aa07s", // 디자이너의 고유 ID ('d2310_aa07s')
  schedule: [
    {
      title: "현장 미팅", // 일정 제목: 현장 미팅
      description: "현장에서 고객님과 미팅 후 실측과 스타일링의 방향을 정합니다.", // 일정 설명: 미팅 후 스타일링 방향 설정
      date: {
        start: "2024-09-07T06:00:00.000Z", // 시작 날짜: 2024년 9월 7일 06:00 (UTC)
        end: "2024-09-07T06:00:00.000Z" // 종료 날짜: 2024년 9월 7일 06:00 (UTC)
      }
    },
    {
      title: "계약 시작일", // 일정 제목: 계약 시작일
      description: "계약서상 프로젝트 시작일입니다. 본격적인 디자인 작업이 시작됩니다.", // 일정 설명: 프로젝트 시작일
      date: {
        start: "2024-08-30T15:00:00.000Z", // 시작 날짜: 2024년 8월 30일 15:00 (UTC)
        end: "2024-08-30T15:00:00.000Z" // 종료 날짜: 2024년 8월 30일 15:00 (UTC)
      }
    },
    {
      title: "컨셉 제안서", // 일정 제목: 컨셉 제안서
      description: "전체적인 디자인 방향을 정할 컨셉 제안서 입니다.", // 일정 설명: 디자인 방향을 설정하는 제안서
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    },
    {
      title: "1차 디자인 제안서", // 일정 제목: 1차 디자인 제안서
      description: "컨셉을 바탕으로 구체적인 디자인 시안을 1차적으로 제공드립니다.", // 일정 설명: 1차 디자인 시안 제공
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    },
    {
      title: "제안서 수정 작업", // 일정 제목: 제안서 수정 작업
      description: "디자인 제안서의 수정 사항을 반영하여 수정 작업을 진행하는 기간입니다.", // 일정 설명: 제안서 수정 작업
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    },
    {
      title: "제품 리스트", // 일정 제목: 제품 리스트
      description: "디자인 제안서에 나와 있는 제품의 구체적인 리스트를 제공합니다.", // 일정 설명: 제품 리스트 제공
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    },
    {
      title: "제품 구매 및 배송", // 일정 제목: 제품 구매 및 배송
      description: "리스트에 나온 제품들을 실제로 구매하고 배송을 기다리는 기간입니다.", // 일정 설명: 제품 구매 및 배송
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    },
    {
      title: "제품 설치 및 세팅", // 일정 제목: 제품 설치 및 세팅
      description: "배송된 가구, 가전, 패브릭 등의 설치와 세팅이 진행되는 기간입니다.", // 일정 설명: 제품 설치 및 세팅
      date: {
        start: "1799-12-31T15:32:08.000Z", // 시작 날짜: 미정 (임시 날짜)
        end: "1799-12-31T15:32:08.000Z" // 종료 날짜: 미정 (임시 날짜)
      }
    }
  ]
};