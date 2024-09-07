/**
 * 콜렉션 이름
 * @type {string}
 * @description 해당 포트폴리오 아이디(pid)에 대한 관련 사진들을 공유하는 구글 공유 폴더 아이디를 저장하는 데이터베이스
 */
const collectionName = "shareGoogleId";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 포트폴리오 관련 구글 드라이브 공유 폴더 아이디를 저장한 기록. 디자이너와 고객에게 공유된 폴더 ID와 원본 및 워터마크 이미지 폴더가 포함됨.
 */
const collectionDescription = "해당 pid(포트폴리오 아이디)에 대해서 관련 사진들을 공유하는 공유 폴더의 구글 아이디를 저장한 기록";

/**
 * @typedef {Object} ShareGoogleId
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트 ID (p2402_aa48s 형식)
 * @property {string} cliid 고객 ID (c2402_aa59s 형식)
 * @property {string} desid 디자이너 ID (d2309_aa03s 형식)
 * @property {string} pid 포트폴리오 ID (p442 형식)
 * @property {string} date 기록이 생성된 날짜와 시간 (ISO 8601 형식)
 * @property {Object} google 구글 드라이브 폴더 ID를 저장한 객체
 * @property {string} google.designer 디자이너에게 공유된 구글 드라이브 폴더의 ID
 * @property {string} google.client 고객에게 공유된 구글 드라이브 폴더의 ID
 * @property {string} google.original 원본 이미지 폴더의 구글 드라이브 ID
 * @property {string} google.watermark 워터마크 이미지 폴더의 구글 드라이브 ID
 */

/**
 * 샘플 데이터 0
 * @type {ShareGoogleId}
 * @description 2024년 7월 26일 p2402_aa48s 프로젝트의 포트폴리오 이미지 공유를 위해 저장된 구글 드라이브 폴더 ID 기록
 */
const collectionSampleData0 = {
  _id: "66a337f7102135970e8b3dee", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2402_aa48s", // 프로젝트 ID, p2402_aa48s는 해당 프로젝트를 구분하는 고유 식별자
  cliid: "c2402_aa59s", // 고객 ID, c2402_aa59s는 해당 프로젝트의 고객을 구분하는 고유 식별자
  desid: "d2309_aa03s", // 디자이너 ID, d2309_aa03s는 해당 프로젝트를 담당하는 디자이너를 구분하는 고유 식별자
  pid: "p442", // 포트폴리오 ID, 해당 프로젝트의 포트폴리오를 구분하는 고유 식별자
  date: "2024-07-26T05:45:27.219Z", // 이 기록이 생성된 날짜와 시간 (2024년 7월 26일 05:45:27.219 UTC)
  google: { // 구글 드라이브 폴더 ID를 저장한 객체
    designer: "151YsPscIlGBSOrrtZskBI0d6b3GzyzPh", // 디자이너에게 공유된 구글 드라이브 폴더의 ID
    client: "11Y1mm9x7ls5nW3mZl9UoF_frk2PME5sN", // 고객에게 공유된 구글 드라이브 폴더의 ID
    original: "151YsPscIlGBSOrrtZskBI0d6b3GzyzPh", // 원본 이미지 폴더의 구글 드라이브 ID
    watermark: "11Y1mm9x7ls5nW3mZl9UoF_frk2PME5sN" // 워터마크 이미지 폴더의 구글 드라이브 ID
  }
};