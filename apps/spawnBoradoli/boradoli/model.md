1. 고객 (CL)
  - 표 이름 : client
  - 컬럼
    cliid: 고객 아이디
    name: 이름
    status: 상태
    action: 응대
    outreason: 유출 이유
    kakao: 플친 등록
    service: 서비스
    next: 다음 연락
    callHistory: 연락 기록
    timeline: 문의일
    spacePicture: 공간 사진
    preferPicture: 선호 사진
    phone: 연락처
    email: 이메일
    budget: 예산
    address: 주소
    contract: 집 계약
    pyeong: 평수
    living: 거주중 여부 (0:거주중 아님 1:거주중)
    precheck: 사전점검일
    empty: 집 비는 날
    movein: 입주 예정일
    room: 방 개수
    bathroom: 화장실 개수
    valcony: 발코티 확장 (0:확장 안 함 1:확장함)
    family: 가족 구성원
    comment: 요청 사항

2. 프로젝트 (CA)
  - 표 이름 : project
  - 컬럼
    proid: 프로젝트 아이디
    cliid: 고객 아이디
    desid: 디자이너 아이디
    serid: 서비스 아이디
    xValue: 서비스 종류
    online: 온라인 여부
    status: 상태
    action: 응대
    next: 다음 연락
    callHistory: 연락 기록
    firstDate: 계약금 입금일
    firstCancel: 계약금 취소일
    firstAmount: 계약금액
    firstInfo: 계약금 정보
    firstRefund: 계약금 환불액
    remainDate: 잔금 입금일
    remainCancel: 잔금 취소일
    remainSupply: 공급가
    remainVat: VAT
    remainConsumer: 소비자가
    remainPure: 잔금액
    remainInfo: 잔금 정보
    remainRefund: 잔금 환불액
    formDateFrom: 계약상 시작일
    formDateTo: 계약상 종료일
    formDateCancel: 계약상 취소일
    meetingDate: 1차 미팅 날짜
    method: 정산 방식
    percentage: 수수료
    calculationInfo: 정산 정보
    paymentsTotalAmount: 정산 총 금액
    paymentsFirstAmount: 정산 선금액
    paymentsFirstDate: 선금 지불일
    paymentsFirstCancel: 선금 취소일
    paymentsFirstRefund: 선금 환수액
    paymentsRemainAmount: 정산 잔금액
    paymentsRemainDate: 잔금 지불일
    paymentsRemainCancel: 잔금 취소일
    paymentsRemainRefund: 잔금 확수액
    photoStatus: 촬영 상태
    contentsPhotoDate: 촬영 일자

3. 디자이너 (DE)
  - 표 이름 : designer
  - 컬럼
    desid: 디자이너 아이디
    designer: 디자이너 이름
    status: 상태
    date: 계약일
    phone: 연락처
    email: 이메일
    did: 디자이너 간소화 아이디
    address: 주소
    showRoom: 쇼룸 여부
    webPage: 웹페이지
    sns: SNS 정보
    career: 경력
    account: 계좌
    classification: 사업자 분류
    businessNumber: 사업자 등록 번호
    files: 파일 유무
    percentage: 수수료
    partner: 시공사 파트너
    method: 시공 방식
