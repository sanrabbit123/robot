/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔을 통해 해당 프로젝트의 디자이너 글을 업로드한 기록을 저장하는 데이터베이스
 */
const collectionName = "designerRawContents";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너가 프로젝트별로 업로드한 글과 그 기록을 저장하는 디비
 */
const collectionDescription = "디자이너가 디자이너 콘솔을 통해 해당 프로젝트의 디자이너 글을 업로드한 내용과 기록";

/**
 * 샘플 데이터 0
 * @typedef {Object} DesignerRawContent
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트 ID
 * @property {string} desid 디자이너 ID
 * @property {string} cliid 클라이언트 ID
 * @property {string} date 업로드된 날짜와 시간 (ISO 형식)
 * @property {Object} contents 글의 본문과 종류를 포함한 내용
 * @property {string} contents.body 디자이너가 작성한 글의 본문
 * @property {string} contents.type 콘텐츠의 타입 (예: 'web', 'mobile')
 * @property {Object} addition 추가 정보 (프로젝트, 제목, 아파트명, 지역, 평수 등)
 * @property {string} addition.pid 프로젝트 ID
 * @property {string} addition.subject 제목
 * @property {string} addition.apart 아파트명
 * @property {string} addition.region 지역명
 * @property {number} addition.pyeong 평수
 * @property {Object} addition.text 본문 앞뒤 설명 (front, back)
 * @property {string} addition.text.front 본문 앞부분에 해당하는 텍스트
 * @property {string} addition.text.back 본문 뒷부분에 해당하는 텍스트
 * @property {Array<string>} addition.text.backArr 본문 뒷부분을 배열로 표현한 내용
 */
const collectionSampleData0 = {
  _id: "66c0a4de8e915b93c82d4b0c",  // MongoDB에서 자동 생성된 고유 ID
  proid: "p2403_aa80s",  // 프로젝트 ID
  desid: "d2307_aa02s",  // 디자이너 ID
  cliid: "c2403_aa85s",  // 클라이언트 ID
  date: "2024-08-26T07:33:22.536Z",  // 업로드된 날짜와 시간 (ISO 형식)
  contents: {
    body: "고객님은 오래된 집에서 벗어나 새로운 공간에서의 삶을 설계하기로 결심하셨어요. ...",  // 디자이너가 작성한 글의 본문
    type: "web"  // 콘텐츠 타입 (웹)
  },
  addition: {
    pid: "p448",  // 프로젝트 ID
    subject: "제목을 입력해주세요",  // 글의 제목
    apart: "아파트 아파트명",  // 아파트명
    region: "인천 연수구",  // 지역명
    pyeong: 28,  // 평수
    text: {
      front: "신혼집 입주를 앞두고 부분시공 홈스타일링에 관심이 많아 찾아주셨어요. ...",  // 본문 앞부분
      back: "현장미팅 시 고객님께서 적극적으로 요청하신 내용을 바탕으로 현관에 딸린 펜트리룸을 확장하여 ...",  // 본문 뒷부분
      backArr: [
        "현장미팅 시 고객님께서 적극적으로 요청하신 내용을 바탕으로 현관에 딸린 펜트리룸을 확장하여 ...",  // 뒷부분을 배열로 표현한 내용
      ]
    }
  }
};