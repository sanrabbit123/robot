DesignerJs.prototype.contentsView = async function () {
  const instance = this;
  try {
    const { createNodes, colorChip, ajaxJson, sleep, returnGet, equalJson } = GeneralJs;
    let loading;

    loading = await this.mother.loadingRun();



    /*

    // -----------------------------------------------------------------

    [ 촬영 관리 ]

    촬영 진행 여부

    촬영 진행 상태

    촬영일

    촬영 작가

    인터뷰어

    촬영 메모

    // -----------------------------------------------------------------

    [ 소스 수집 ]

    사진 원본

    인터뷰 상태

    인터뷰 원고

    디자이너 글

    // -----------------------------------------------------------------

    [ 발행 관리 ]

    블로그 포트폴리오 컨텐츠 발행

    블로그 인터뷰 컨텐츠 발행

    인스타 포트폴리오 컨텐츠 발행

    인스타 인터뷰 컨텐츠 발행

    웹 컨텐츠 발행

    // -----------------------------------------------------------------


    */



    await sleep(2000);

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
