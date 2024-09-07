/**
 * 콜렉션 이름
 * @type {string}
 * @description 협업 디자이너의 구글 드라이브 및 구글 문서(디자이너 메모)의 주소와 ID를 저장하는 데이터베이스
 */
const collectionName = "folderDesigner";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 협업 디자이너들의 구글 드라이브 폴더와 구글 문서의 링크 및 해당 디자이너의 ID를 기록한 데이터베이스
 */
const collectionDescription = "협업 디자이너의 구글 드라이브와 구글 문서(디자이너 메모)의 주소와 아이디가 적혀 있는 디비";

/**
 * 샘플 데이터 0
 * @typedef {Object} FolderDesigner
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} folderName 디자이너 폴더 이름, 구글 드라이브에 저장된 폴더의 이름
 * @property {string} drive 구글 드라이브 URL, 협업 디자이너의 구글 드라이브 폴더로 연결되는 링크
 * @property {string} docs 구글 문서 URL, 해당 디자이너의 작업 메모나 관련 정보가 기록된 구글 문서로 연결되는 링크
 * @property {string} desid 디자이너 ID, 홈리에종에서 관리하는 디자이너의 고유 식별자
 * @property {string} date 생성 날짜, 해당 정보가 생성된 날짜와 시간
 */
const collectionSampleData0 = {
  _id: "66cc2c0b3271579e96beaab0", // MongoDB에서 자동 생성된 고유 ID
  folderName: "d140_윤영은", // 디자이너 폴더 이름, "d140_윤영은"이라는 이름으로 관리
  drive: "https://drive.google.com/drive/folders/undefined", // 구글 드라이브 링크, 디자이너의 작업 자료가 저장된 폴더
  docs: "https://docs.google.com/document/d/1mIi_rEY5lFXSjkjKvO720yWLyqAoWLMDufxSuDAZ3so", // 구글 문서 링크, 해당 디자이너의 작업 관련 메모가 기록된 문서
  desid: "d2408_aa03s", // 디자이너 ID, "d2408_aa03s"라는 고유 식별자
  date: "2024-08-26T07:17:31.531Z" // 데이터가 생성된 날짜와 시간
};

/**
 * 샘플 데이터 1
 * @typedef {Object} FolderDesigner
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} folderName 디자이너 폴더 이름, 구글 드라이브에 저장된 폴더의 이름
 * @property {string} drive 구글 드라이브 URL, 협업 디자이너의 구글 드라이브 폴더로 연결되는 링크
 * @property {string} docs 구글 문서 URL, 해당 디자이너의 작업 메모나 관련 정보가 기록된 구글 문서로 연결되는 링크
 * @property {string} desid 디자이너 ID, 홈리에종에서 관리하는 디자이너의 고유 식별자
 * @property {string} date 생성 날짜, 해당 정보가 생성된 날짜와 시간
 */
const collectionSampleData1 = {
  _id: "66c09c157d20f001559fecd6", // MongoDB에서 자동 생성된 고유 ID
  folderName: "d72_이선민", // 디자이너 폴더 이름, "d72_이선민"으로 구글 드라이브에 저장
  drive: "https://drive.google.com/drive/folders/1XMNZb5DOBEdE5GL0I9mqjdJiHPvybXbB", // 구글 드라이브 링크, 해당 디자이너의 작업 폴더
  docs: "https://docs.google.com/document/d/1R7iJFqjmUIXG4iu8sHqmngvrfBIbHljtcGp1gyuHtIU", // 구글 문서 링크, 디자이너가 작성한 메모 또는 관련 작업 정보
  desid: "d2202_aa01s", // 디자이너 ID, "d2202_aa01s"라는 고유 식별자
  date: "2022-02-08T07:37:05.888Z" // 데이터가 생성된 날짜와 시간
};