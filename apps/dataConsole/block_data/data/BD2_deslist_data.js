let data = {
  dbtitle: 'BD2_deslist',
  dbname: '협력 디자이너 카드',
  standard: 'a4_desid',
  colcol: {
    a1_relation: '관계',
    a2_contractday: '계약일',
    a3_contract: '계약서',
    a4_desid: '아이디',
    a5_name: '이름',
    b2_phone: '연락처',
    b3_email: '이메일',
    b1_web: '웹사이트',
    b4_sns: 'SNS',
    b7_showroom: '쇼룸',
    b5_address: '주소',
    b6_career: '경력',
    c1_fees: '수수료',
    c2_classification: '사업자 구분',
    c3_businessnumber: '사업자 등록번호',
    c4_bankname: '입금 계좌',
    c5_accountnumber: '파일 유무',
    c6_cashreceipt: '희망 증빙',
    d1_personality: '성격적 특징',
    d2_designstyle: '디자인 스타일',
    d3_determinants: '수수료 결정 요소',
    d4_needs: '디자이너 필요 요소',
    e1_servicearea: '서비스 지역',
    e2_available: '제공 가능 서비스',
    e3_technology: '디자인 기술',
    e4_furniture: '제작 가구',
    e5_fabric: '패브릭',
    e6_construction: '시공 능력 단계',
    f1_designerinfo: '개인 활동 정보'
  },
  colinit: {
    a4_desid: 'left:0;width:84px;',
    a5_name: 'right:-2px;width:106px;'
  },
  coltitle: {
    a5_name: 1
  },
  colleft: {
    a1_relation: 56,
    a2_contractday: 80,
    a3_contract: 80,
    b2_phone: 104,
    b3_email: 200,
    b1_web: 200,
    b4_sns: 480,
    b7_showroom: 80,
    b5_address: 360,
    b6_career: 80,
    c1_fees: 80,
    c2_classification: 120,
    c3_businessnumber: 120,
    c4_bankname: 240,
    c5_accountnumber: 480,
    c6_cashreceipt: 120,
    d1_personality: 240,
    d2_designstyle: 240,
    d3_determinants: 240,
    d4_needs: 240,
    e1_servicearea: 120,
    e2_available: 240,
    e3_technology: 240,
    e4_furniture: 240,
    e5_fabric: 240,
    e6_construction: 480,
    f1_designerinfo: 480
  },
  classify: {
    column_title: "a1_relation",
    setting: [
      [ "협약 완료", "transparent" ],
      [ "협약 해지", "#808080" ],
      [ "신청 대기", "lightblue" ],
      [ "컨택중", "silver" ],
    ]
  },
  long: [
    "d1_personality",
    "d4_needs",
    "e4_furniture",
    "e5_fabric",
  ],
  longplus: [
    "b5_address",
    "c4_bankname",
    "e6_construction",
    "f1_designerinfo"
  ],
  short: [
    "b2_phone",
    "b3_email",
    "b1_web",
    "c3_businessnumber",
    "b6_career"
  ],
  eashort: {
    c1_fees: ['%']
  },
  menu: {
    a1_relation: ['협약 완료','협약 해지','신청 대기','컨택중','-'],
    a3_contract: ['조정중','날인 대기중','완료','-'],
    b7_showroom: ['Y','N'],
    c2_classification: ["개인사업자(일반)", "개인사업자(간이)", "법인사업자(일반)", "법인사업자(간이)", "프리랜서",'-'],
    c6_cashreceipt: ["현금영수증 발행", "세금계산서 발행", "원천징수",'-']
  },
  calendar: [
  ],
  calendarplus: {
    a2_contractday: ['Y', 'N']
  },
  scope: {
  },
  slide: {
  },
  opposite: {
  },
  period: {
    // b6_career: ['input','now']
  },
  multiple: {
    d2_designstyle: ["모던", "내추럴", "글램", "트레디셔널", "빈티지", "스트릿", "인더스트리얼", "코지"],
    d3_determinants: ["신진 디자이너", "경력 디자이너", "홈리에종과 협업 관계"],
    e2_available: ['홈퍼니싱','홈스타일링','토탈스타일링','온라인','마감재','기타공간'],
    e3_technology: ["컨셉제안서", "캐드도면", "쉬운도면", "스케치업/3D", "제작가구", "패브릭"],
  },
  arraymaker: [
    "e1_servicearea",
  ],
  objectmaker: {
    b4_sns: [
      ["블로그", "input"],
      ["인스타", "input"],
      ["기타", "input"]
    ],
    c5_accountnumber: [
      ['사업자등록증', 'input'],
      ['통장사본', 'input'],
      ['민증사본', 'input']
    ]
  },
  plugin: [
  ],
  chaining: [
  ],
  sortquery: {
  }
}

data.colcol_arr = Object.keys(data.colcol);
data.colinit_arr = Object.keys(data.colinit);
data.colleft_arr = Object.keys(data.colleft);

module.exports = data;
