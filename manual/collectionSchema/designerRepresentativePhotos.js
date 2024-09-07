/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너 체크리스트에서 추천서에 보여질 대표 세로 사진 번호를 기록한 데이터베이스
 */
const collectionName = "designerRepresentativePhotos";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너의 대표 세로 사진 번호에 대한 데이터를 저장하는 디비
 */
const collectionDescription = "디자이너 체크리스트에서 추천서에 보여질 대표 세로 사진 번호에 대한 기록";

/**
 * 샘플 데이터 0
 * @typedef {Object} DesignerRepresentativePhotos
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 사진 기록이 생성된 날짜 (ISO 형식)
 * @property {string} desid 디자이너 ID
 * @property {string[]} position 페이퍼워크에 등록된 대표 사진 파일의 경로 목록
 */
const collectionSampleData0 = {
  _id: "66c0a4df8e915b93c82d531a",  // MongoDB에서 자동 생성된 고유 ID
  date: "2024-03-02T06:47:56.885Z",  // 사진 기록이 생성된 날짜 (ISO 형식)
  desid: "d2305_aa01s",  // 디자이너 ID
  position: [
    // 각 경로는 페이퍼워크에 등록된 대표 세로 사진 파일의 경로를 나타냄
    "_____slash_____corePortfolio_____slash_____listImage_____slash_____a102_____slash_____t1a102_____dot_____jpg",  // 포트폴리오 목록의 첫 번째 사진 경로
    "_____slash_____corePortfolio_____slash_____listImage_____slash_____a102_____slash_____t2a102_____dot_____jpg",  // 포트폴리오 목록의 두 번째 사진 경로
    "_____slash_____corePortfolio_____slash_____listImage_____slash_____a102_____slash_____t10a102_____dot_____jpg",  // 포트폴리오 목록의 열 번째 사진 경로
    "_____slash_____corePortfolio_____slash_____listImage_____slash_____a102_____slash_____t11a102_____dot_____jpg",  // 포트폴리오 목록의 열한 번째 사진 경로
    "_____slash_____corePortfolio_____slash_____listImage_____slash_____a102_____slash_____t12a102_____dot_____jpg"  // 포트폴리오 목록의 열두 번째 사진 경로
  ]
};