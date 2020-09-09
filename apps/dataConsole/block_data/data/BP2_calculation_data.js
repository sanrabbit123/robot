let data = {
  dbtitle: 'BP2_calculation',
  dbname: '정산 관리',
  standard: 'a4_customernumber',
  colcol: {
    a4_customernumber: '아이디',
    a19_name: '성함',
    a5_name: '디자이너',
    a16_service: '서비스',
    a21_address: '주소',
    a24_pyeong: '평수',
    b1_process: '진행 단계',
    c1_supply: '공급가',
    c2_consumer: '소비자가',
    c3_vat: 'VAT',
    d1_deposit: '계약금',
    d5_deposit_yn: '계약금 입금',
    d2_left: '잔금',
    d6_left_yn: '잔금 입금',
    d3_depositinfo: '계약금 info',
    d4_leftinfo: '잔금 info',
    e1_fee: '수수료',
    e2_feeamount: '수수료 금액',
    f1_calculmethod: '정산 방식',
    f2_calculamount: '총 정산',
    f3_calculfirst: '선금 정산액',
    f4_calculfisrtyn: '선금 정산일',
    f5_calcullast: '잔금 정산액',
    f6_calcullastyn: '잔금 정산일',
    f7_calculinfo: '정산 info',
    g1_constuct: '시공사',
    g2_constuctamount: '시공 공급가',
    g6_constuctcustomer: '시공 소비자가',
    g7_constuctvat: '시공 VAT',
    g8_constuctfeesun: '시공 수수료',
    g3_constuctfee: '시공 순수수료',
    g4_constuctinfo: '시공 증빙',
    g5_constuct_yn: '시공 입금일',
    h1_refundratio: '환불 비율',
    h2_refund: '환불액',
    h4_refund_yn: '환불 출금일',
    h5_refundleaf: '환불 잔액',
    h6_inisisinfo: '이니시스'
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
    a16_service: 80,
    a21_address: 360,
    a24_pyeong: 46,
    b1_process: 60,
    c1_supply: 60,
    c2_consumer: 60,
    c3_vat: 60,
    d1_deposit: 41,
    d5_deposit_yn: 81,
    d2_left: 60,
    d6_left_yn: 81,
    d3_depositinfo: 300,
    d4_leftinfo: 300,
    e1_fee: 41,
    e2_feeamount: 70,
    f1_calculmethod: 81,
    f2_calculamount: 81,
    f3_calculfirst: 81,
    f4_calculfisrtyn: 81,
    f5_calcullast: 81,
    f6_calcullastyn: 81,
    f7_calculinfo: 440,
    g1_constuct: 84,
    g2_constuctamount: 120,
    g6_constuctcustomer: 120,
    g7_constuctvat: 120,
    g8_constuctfeesun: 120,
    g3_constuctfee: 120,
    g4_constuctinfo: 120,
    g5_constuct_yn: 120,
    h1_refundratio: 120,
    h2_refund: 120,
    h4_refund_yn: 120,
    h5_refundleaf: 120,
    h6_inisisinfo: 162
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
  ],
  longplus: [
  ],
  short: [
    'a5_name',
    'g1_constuct',
    'g4_constuctinfo'
  ],
  eashort: {
    e1_fee: ['%'],
    h1_refundratio: ['%']
  },
  menu: {
    b1_process: ['대기', '홀딩', '진행중', '완료', '드랍'],
    d1_deposit: ['Y', 'N'],
    f1_calculmethod: ['사업자(일반)', '사업자(간이)', '프리랜서']
  },
  calendar: [
  ],
  calendarplus: {
    d5_deposit_yn: ['Y', 'N'],
    d6_left_yn: ['Y', 'N'],
    f4_calculfisrtyn: ['Y', 'N'],
    f6_calcullastyn: ['Y', 'N'],
    g5_constuct_yn: ['Y', 'N'],
    h4_refund_yn: ['Y', 'N'],
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
    d3_depositinfo: [
      ['방식', 'input'],
      ['증빙', 'input'],
      ['수신자', 'input']
    ],
    d4_leftinfo: [
      ['방식', 'input'],
      ['증빙', 'input'],
      ['수신자', 'input']
    ],
    f7_calculinfo: [
      ['계좌', 'input'],
      ['증빙', 'input'],
      ['수신자', 'input'],
      ['비고', 'input']
    ],
    h6_inisisinfo: [
      ['수수료', 'input'],
      ['정산액', 'input']
    ]
  },
  plugin: [
    'M_moneymath'
  ],
  chaining: [
    'a5_name',
    'b1_process',
    'c1_supply',
    'd1_deposit',
    'd5_deposit_yn',
    'd6_left_yn',
    'e1_fee',
    'f1_calculmethod',
    'g1_constuct',
    'g2_constuctamount',
    'h1_refundratio'
  ],
  sortquery: {
    b1_process: ['대기', '홀딩', '진행중', '완료', '드랍']
  }
};

data.colcol_arr = Object.keys(data.colcol);
data.colinit_arr = Object.keys(data.colinit);
data.colleft_arr = Object.keys(data.colleft);

module.exports = data;
