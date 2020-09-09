let data = {
  dbtitle: 'BC1_conlist',
  dbname: '1차 응대',
  standard: 'a4_customernumber',
  colcol: {
    a4_customernumber: '아이디',
    a19_name: '성함',
    a1_class1: '1차 분류',
    a2_class2: '2차 분류',
    a3_reason: '유출 원인',
    a5_call: '통화',
    a7_channelenroll: '플친 등록',
    a8_image: '이미지 발송',
    a9_proposal: '제안서',
    a10_comfirmcall: '확인 통화',
    a11_next: 'NEXT',
    a12_history: 'History',
    a13_sajeon: '사전 점검',
    a14_emptyday: '집 비는 날',
    a25_due_date: '입주일',
    a16_service: '제안 서비스',
    a17_money: '금액대',
    a18_timeline: '문의일',
    a20_phone: '연락처',
    a21_address: '주소',
    a22_family: '가족구성원',
    a23_budget: '예산',
    a24_pyeong: '평수',
    a27_contract: '계약 형태',
    a28_space: '공간 상태',
    a29_etc: '요청 사항',
    a30_channel: '유입 경로',
    a31_aboutsite: '현장 관련',
    a32_aboutcom: '시공 관련',
    a33_aboutsty: '스타일링 관련',
    a34_aboutmon: '예산 관련',
    a35_aboutetc: '기타 내용'
  },
  colinit: {
    a4_customernumber: 'left:-2px;width:96px;',
    a19_name: 'right:1px;width:84px;'
  },
  coltitle: {
    a19_name: 1
  },
  colleft: {
    a1_class1: 46,
    a2_class2: 102,
    a3_reason: 82,
    a5_call: 80,
    a7_channelenroll: 80,
    a8_image: 80,
    a9_proposal: 80,
    a10_comfirmcall: 80,
    a11_next: 80,
    a12_history: 400,
    a13_sajeon: 80,
    a14_emptyday: 80,
    a25_due_date: 80,
    a16_service: 80,
    a17_money: 80,
    a18_timeline: 132,
    a20_phone: 104,
    a21_address: 360,
    a22_family: 142,
    a23_budget: 94,
    a24_pyeong: 46,
    a27_contract: 66,
    a28_space: 264,
    a29_etc: 400,
    a30_channel: 80,
    a31_aboutsite: 400,
    a32_aboutcom: 400,
    a33_aboutsty: 400,
    a34_aboutmon: 400,
    a35_aboutetc: 400
  },
  classify: {
    column_title: "a1_class1",
    setting: [
      [ "드랍", "silver" ],
      [ "진행", "lightblue" ],
      [ "응대중", "transparent" ],
      [ "완료", "seagreen" ]
    ]
  },
  long: [
    'a21_address',
    'a29_etc',
    'a31_aboutsite',
    'a32_aboutcom',
    'a33_aboutsty',
    'a34_aboutmon',
    'a35_aboutetc'
  ],
  longplus: [
    'a12_history'
  ],
  short: [
    'a4_customernumber',
    'a13_sajeon',
    'a14_emptyday',
    'a19_name',
    'a20_phone',
    'a22_family'
  ],
  eashort: {
    a24_pyeong: ['평','m2']
  },
  menu: {
    a1_class1: ['드랍','진행','응대중','완료'],
    a2_class2: ['가능성상/포커싱상','가능성상/포커싱하','가능성하/포커싱상','가능성하/포커싱하','신청~통화전','통화~제안서전','제안서후','-'],
    a3_reason: ['알 수 없음','연결 안 됨','가벼운 문의','타사 계약','비용 문제','의견 조정 안 됨','직접 진행','기타','-'],
    a16_service: ['홈퍼니싱','홈스타일링','토탈 스타일링','온라인','부분 공간','기타','-'],
    a23_budget: ['500만원 이하','1,000만원','1,500만원','2,000만원','2,500만원','3,000만원','3,500만원','4,000만원','4,500만원','5,000만원 이상'],
    a27_contract: ['전월세','자가','알 수 없음'],
    a30_channel: ['검색','블로그','인스타','브런치','유튜브','지인','언론','기타','-']
  },
  calendar: [
  ],
  calendarplus: {
    a5_call: ['Y', 'N'],
    a7_channelenroll: ['Y', 'N'],
    a8_image: ['Y', 'N'],
    a9_proposal: ['Y', 'N'],
    a10_comfirmcall: ['Y', 'N'],
    a11_next: ['Y', 'N'],
    a25_due_date: ['Y', 'N']
  },
  scope: {
    a17_money: ["input","만원"]
  },
  slide: {
  },
  opposite: {
  },
  period: {
  },
  multiple: {
  },
  arraymaker: [
  ],
  objectmaker: {
    a28_space: [
      ['방', ['1개', '2개', '3개', '4개 이상']],
      ['화장실', ['1개', '2개', '3개 이상']],
      ['발코니', ['확장', '확장 없음']]
    ]
  },
  plugin: [
  ],
  chaining: [
    'a1_class1',
    'a16_service',
    'a21_address',
    'a24_pyeong',
    'a30_channel',
    'a18_timeline'
  ],
  sortquery: {
    a1_class1: ['드랍','진행','응대중','완료']
  }
};

data.colcol_arr = Object.keys(data.colcol);
data.colinit_arr = Object.keys(data.colinit);
data.colleft_arr = Object.keys(data.colleft);

module.exports = data;
