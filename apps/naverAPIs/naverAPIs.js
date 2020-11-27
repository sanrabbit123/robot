const NaverAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/naverAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

NaverAPIs.prototype.spellChecker = async function (text) {
  const instance = this;
  try {
    let res = await this.mother.pythonExecute(this.pythonApp, [ "spell" ], { target: text });
    return res;
  } catch (e) {
    console.log(e);
  }
}

NaverAPIs.prototype.paragraphChecker = async function (paragraph) {
  const instance = this;
  const exceptionList = [
    [ "홈피에 종", "홈리에종" ],
    [ "홈 리에 종", "홈리에종" ],
    [ "홈 리에종", "홈리에종" ],
    [ "홈리에 종", "홈리에종" ],
    [ "홈리 에종", "홈리에종" ],
    [ "고급 진", "고급진" ],
    [ "홈 스타일링", "홈스타일링" ],
    [ "컬 러", "컬러" ],
    [ "고객 님", "고객님" ],
    [ "스탠드 가", "스탠드가" ],
    [ "톤 다운", "톤다운" ],
    [ "새 아파트", "새아파트" ],
    [ "수납 역", "수납력" ],
    [ "모 양", "모양" ],
    [ "없는 데", "없는데" ],
    [ "우리 집", "우리집" ],
    [ "변경한 기로", "변경하기로" ],
    [ "제안 드렸", "제안드렸" ],
    [ "구 매", "구매" ],
    [ "하셨어 요", "하셨어요" ],
    [ "주 고", "주고" ],
    [ "홈 피니싱", "홈퍼니싱" ],
    [ "홈피니싱", "홈퍼니싱" ],
    [ "스타 필링", "스타일링" ],
    [ "게스 트롬은", "게스트롬은" ],
    [ "화이 트", "화이트" ],
    [ "였 던", "였던" ],
    [ "내주시 고", "내주시고" ],
    [ "되 어", "되어" ],
    [ "전 문가", "전문가" ],
    [ "스크린 을", "스크린을" ],
    [ "해 주시는", "해주시는" ],
    [ "주시 고", "주시고" ],
    [ "디자이너 분", "디자이너분" ],
    [ "했 어요", "했어요" ],
    [ "마 무리", "마무리" ],
    [ "마무 리", "마무리" ],
    [ "스타 일", "스타일" ],
    [ "주방 은", "주방은" ],
    [ "실 로도", "실로도" ],
    [ "만셀 프", "반셀프" ],
    [ "인 더스타 리얼", "인더스트리얼" ],
    [ "조 명", "조명" ],
    [ "문제 가", "문제가" ],
    [ "어 느", "어느" ],
    [ "파 우더", "파우더" ],
    [ "장 으로", "장으로" ],
    [ "신경 써서", "신경써서" ],
    [ "어린 이", "어린이" ],
    [ "데코 해", "데코해" ],
    [ "손님 방", "손님방" ],
    [ "제품이에 요", "제품이에요" ],
    [ "함 께", "함께" ],
    [ "공간 이", "공간이" ],
    [ "하나씩같이", "하나씩 같이" ],
    [ "꾸 머나", "꾸며" ],
    [ "시계 와", "시계와" ],
    [ "결 과", "결과" ],
    [ "열 일", "열일" ],
    [ "배치한 고", "배치하고" ],
    [ "저 랑", "저랑" ],
    [ "러그 가", "러그가" ],
    [ "포인 트", "포인트" ],
    [ "이사가 실", "이사가실" ],
    [ "제품들 을", "제품들을" ],
    [ "파스텔컬러", "파스텔 컬러" ],
    [ "벽 지", "벽지" ],
    [ "아이 방", "아이방" ],
    [ "셰어 하우스", "셰어하우스" ],
    [ "사 항", "사항" ],
    [ "꼬여 어요", "꼬여 있었어요" ],
    [ "마 년 했", "마련했" ],
    [ "사용자 들", "사용자들" ],
    [ "아무래 도", "아무래도" ],
    [ "들어볼까 요", "들어볼까요" ],
    [ "신경 써야", "신경써야" ],
    [ "운영할 시다", "운영하시다" ],
    [ "바라 셨어요", "바라셨어요" ],
    [ "입 체적인", "입체적인" ],
    [ "가 구", "가구" ],
    [ "디자이너들 이", "디자이너들이" ],
    [ "이상하 게", "이상하게" ],
    [ "답 답해", "답답해" ],
    [ "터라 조", "테라조" ],
    [ "사워", "샤워" ],
    [ "포 인트", "포인트" ],
    [ "셨 어요", "셨어요" ],
    [ "좋 아", "좋아" ],
    [ "홈 파티", "홈파티" ],
    [ "연 결되", "연결된" ],
    [ "셨어 요", "셨어요" ],
    [ "소 파", "소파" ],
    [ "제작한 고", "제작하고" ],
    [ "매 립", "매립" ],
    [ "주 방", "주방" ],
    [ "타운화 우스", "타운하우스" ],
    [ "화 이트", "화이트" ],
    [ "이렇 게", "이렇게" ],
    [ "훨 신", "훨씬" ],
    [ "같아 요", "같아요" ],
    [ "조 절", "조절" ],
    [ "이 구요", "이구요" ],
    [ "이구 요", "이구요" ],
    [ "있어 요", "있어요" ],
    [ "있 어요", "있어요" ],
    [ "니스", "니즈" ],
    [ "정 말", "정말" ],
    [ "기자 이너", "디자이너" ],
    [ "홈 카페", "홈카페" ],
    [ "한 서 원", "한서원" ],
    [ "앤티크", "앤틱" ],
    [ "홍미영", "홍민영" ],
    [ "누드", "우드" ],
    [ "앤틱 한", "앤틱한" ],
    [ "구성비", "가성비" ],
    [ "제안해 주셔서", "제안해주셔서" ],
    [ "스타일 대로", "스타일대로" ],
    [ "비비드 한", "비비드한" ],
    [ "콘셉트", "컨셉" ],
    [ "셀렉 해", "셀렉해" ],
  ];
  try {
    let resultArr = [];
    let temp, tempReg;
    let paragraphArr = paragraph.split(". ");
    for (let p of paragraphArr) {
      for (let [ from, to ] of exceptionList) {
        tempReg = new RegExp(from, 'g');
        p = p.replace(tempReg, to);
      }
      temp = await this.spellChecker(p);
      resultArr.push(temp.result);
    }

    let finalText = resultArr.join(". ");

    for (let [ from, to ] of exceptionList) {
      tempReg = new RegExp(from, 'g');
      finalText = finalText.replace(tempReg, to);
    }

    return finalText;
  } catch (e) {
    console.log(e);
  }
}

module.exports = NaverAPIs;
