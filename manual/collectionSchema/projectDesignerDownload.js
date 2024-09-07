/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너가 디자이너 콘솔을 통해 자신이 특정 프로젝트에 올린 파일을 다운로드한 기록을 저장하는 데이터베이스.
 */
const collectionName = "projectDesignerDownload";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너가 자신이 디자이너 콘솔에서 업로드한 파일을 해당 프로젝트 상세에서 다운로드한 기록을 저장하는 디비입니다.
 */
const collectionDescription = "디자이너가 디자이너 콘솔에서 해당 프로젝트 상세의 자신이 올린 파일을 다운로드한 기록";

/**
 * @typedef {Object} ProjectDesignerDownload
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} proid 프로젝트의 고유 ID
 * @property {string} desid 디자이너의 고유 ID
 * @property {Array} download 다운로드 기록을 저장하는 배열, 현재는 비어 있음
 */

/**
 * 샘플 데이터 0
 * @type {ProjectDesignerDownload}
 * @description 디자이너 'd2309_aa07s'가 'p2409_aa25s' 프로젝트에 대해 파일 다운로드 기록을 남긴 데이터.
 */
const collectionSampleData0 = {
  _id: "66db32ae4931bbf5cdb30d70", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2409_aa25s", // 프로젝트의 고유 ID ('p2409_aa25s')
  desid: "d2309_aa07s", // 디자이너의 고유 ID ('d2309_aa07s')
  download: [] // 현재까지의 다운로드 기록 (빈 배열)
};

/**
 * 샘플 데이터 1
 * @type {ProjectDesignerDownload}
 * @description 디자이너 'd2105_aa01s'가 'p2405_aa98s' 프로젝트에 대해 파일 다운로드 기록을 남긴 데이터.
 */
const collectionSampleData1 = {
  _id: "66c3ec0b52215d428723e03a", // MongoDB에서 자동 생성된 고유 ID
  proid: "p2405_aa98s", // 프로젝트의 고유 ID ('p2405_aa98s')
  desid: "d2105_aa01s", // 디자이너의 고유 ID ('d2105_aa01s')
  download: [] // 현재까지의 다운로드 기록 (빈 배열)
};