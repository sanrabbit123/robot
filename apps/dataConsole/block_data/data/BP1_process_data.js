let data = {
  dbtitle: 'BP1_process',
  dbname: '프로세스 관리',
  standard: 'a4_customernumber',
  colcol: {
    a4_customernumber: '아이디',
    a19_name: '성함',
    a5_name: '디자이너',
    g1_constuct: '시공사',
    a16_service: '제안 서비스',
    a21_address: '주소',
    a24_pyeong: '평수',
    a30_channel: '유입경로',
    a18_timeline: '문의일',
    z1_history1: '진행 현황 1',
    z2_history2: '진행 현황 2',
    z3_history3: '진행 현황 3',
    b1_process: '진행 단계',
    b2_contractfee: '계약금 입금',
    b3_designfee: '디자인비 입금',
    b4_calling: '디자이너 통화',
    b5_metting1: '1차 미팅',
    b6_metting2: '2차 미팅',
    b7_change: '전디자이너',
    b8_interview: '촬영 / 인터뷰',
    b9_interviewissue: '특이 사항',
    b10_contents: '포트폴리오',
    b11_review: '고객 후기',
    c1_photo: '포토',
    c2_interviewer: '인터뷰어'
  },
  colinit: {
    a4_customernumber: 'left:-2px;width:96px;',
    a19_name: 'right:1px;width:84px;'
  },
  coltitle: {
    a19_name: 1
  },
  colleft: {
    a5_name: 60,
    g1_constuct: 56,
    a16_service: 80,
    a21_address: 360,
    a24_pyeong: 36,
    a30_channel: 80,
    a18_timeline: 132,
    z1_history1: 300,
    z2_history2: 300,
    z3_history3: 300,
    b1_process: 80,
    b2_contractfee: 80,
    b3_designfee: 80,
    b4_calling: 80,
    b5_metting1: 80,
    b6_metting2: 80,
    b7_change: 80,
    b8_interview: 80,
    b9_interviewissue: 200,
    b10_contents: 80,
    b11_review: 80,
    c1_photo: 60,
    c2_interviewer: 60
  },
  classify: {
    column_title: "b1_process",
    setting: [
      [ "대기", "#bb9988" ],
      [ "홀딩", "#f5b5a7" ],
      [ "진행중", "transparent" ],
      [ "완료", "silver" ],
      [ "드랍", "#808080" ]
    ]
  },
  long: [
    'b9_interviewissue',
    'z1_history1',
    'z2_history2',
    'z3_history3'
  ],
  longplus: [
  ],
  short: [
    'a5_name',
    'g1_constuct',
    'c1_photo',
    'c2_interviewer',
    'b7_change'
  ],
  eashort: {
  },
  menu: {
    b1_process: ['대기', '홀딩', '진행중', '완료', '드랍']
  },
  calendar: [
  ],
  calendarplus: {
    b2_contractfee: ['Y', 'N'],
    b3_designfee: ['Y', 'N'],
    b4_calling: ['Y', 'N'],
    b5_metting1: ['Y', 'N'],
    b6_metting2: ['Y', 'N'],
    b8_interview: ['Y', 'N'],
    b10_contents: ['Y', 'N'],
    b11_review: ['Y', 'N']
  },
  scope: {
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
  },
  plugin: [
  ],
  chaining: [
    'a5_name',
    'b1_process',
    'b2_contractfee',
    'b3_designfee',
    'g1_constuct'
  ],
  sortquery: {
    b1_process: ['대기', '홀딩', '진행중', '완료', '드랍']
  }
};

data.colcol_arr = Object.keys(data.colcol);
data.colinit_arr = Object.keys(data.colinit);
data.colleft_arr = Object.keys(data.colleft);

module.exports = data;
