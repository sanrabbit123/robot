/**
 * 콜렉션 이름
 * @type {string}
 * @description 디자이너 체크리스트에서 추천서에 보여질 대표 페이퍼워크 번호를 기록한 데이터베이스
 */
const collectionName = "designerRepresentativePaper";

/**
 * 콜렉션 설명
 * @type {string}
 * @description 디자이너의 대표 페이퍼워크 번호와 관련된 데이터를 저장하는 디비
 */
const collectionDescription = "디자이너 체크리스트에서 추천서에 보여질 대표 페이퍼워크 번호에 대한 기록";

/**
 * 샘플 데이터 0
 * @typedef {Object} DesignerRepresentativePaper
 * @property {string} _id MongoDB에서 자동 생성된 고유 ID
 * @property {string} date 페이퍼워크가 기록된 날짜 (ISO 형식)
 * @property {string} desid 디자이너 ID
 * @property {string[]} position 페이퍼워크에 등록된 이미지나 문서 파일의 경로 목록
 */
const collectionSampleData0 = {
  _id: "66c0a4df8e915b93c82d55f9",  // MongoDB에서 자동 생성된 고유 ID
  date: "2024-03-02T14:57:39.341Z",  // 페이퍼워크가 기록된 날짜 (ISO 형식)
  desid: "d2305_aa01s",  // 디자이너 ID
  position: [
    // 각 경로는 페이퍼워크에 등록된 이미지나 문서 파일의 경로를 나타냄
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____17____index____design_1693385376507_0_598390a7e89c4872c31b5cd2de236d15_____dot_____png",  // 디자인 제안서 관련 이미지 파일 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____12____index____d2305_aa01s__split__g__split__1693385110707__split__50__split__50__split__102__split__works0_BC1F1693385110707A3B43E954A81F545CF7166A_____dot_____png",  // 디자인 제안서 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____19____index____modeling_1693385421253_0_598390a7e89c4872c31b5cd2de236d150002_____dot_____jpg",  // 모델링 관련 이미지 파일 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____23____index____modeling_1693385421253_0_598390a7e89c4872c31b5cd2de236d150006_____dot_____jpg",  // 모델링 관련 이미지 파일 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____3____index____designProposal_1691565119227_0_598390a7e89c4872c31b5cd2de236d150004_____dot_____jpg",  // 디자인 제안서 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____5____index____productList_1691565290115_0_598390a7e89c4872c31b5cd2de236d150001_____dot_____jpg",  // 제품 목록 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____23____index____designProposal_1691565119227_0_598390a7e89c4872c31b5cd2de236d150005_____dot_____jpg",  // 디자인 제안서 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____7____index____concept_1693385350609_0_598390a7e89c4872c31b5cd2de236d15_____dot_____png",  // 컨셉 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____8____index____d2305_aa01s__split__g__split__1693385139952__split__50__split__50__split__102__split__works3_FE0F1693385139952A0F6AE954A81B5A88D9EC73_____dot_____png",  // 디자인 작업 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____3____index____modeling_1693385421253_0_598390a7e89c4872c31b5cd2de236d150004_____dot_____jpg",  // 모델링 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____2____index____modeling_1693385421253_0_598390a7e89c4872c31b5cd2de236d150003_____dot_____jpg",  // 모델링 관련 이미지 경로
    "_____slash_____designProposal_____slash_____image_____slash_____d2305_aa01s_____slash_____4____index____modeling_1693385421253_0_598390a7e89c4872c31b5cd2de236d150005_____dot_____jpg"  // 모델링 관련 이미지 경로
  ]
};