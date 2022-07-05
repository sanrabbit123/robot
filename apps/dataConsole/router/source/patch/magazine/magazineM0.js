MagazineM0Js.prototype.returnContents = function () {
  return {
    title: {
      main: "멋진 인테리어는 벽을 낭비하지 않는다.",
      sub: "밋밋한 벽을 꾸미는 스타일링법"
    },
    contents: {
      init: [
        "모든 집에는 벽이 있다. 집에서 아주 많은 면적을 차지하는 벽을 잘 꾸미는 것은 인테리어 성공의 지름길이다. 멋진 인테리어는 절대로 벽을 낭비하지 않는다. 우리 집에도 꾸밀 벽이 있는지 떠올려보자.",
        [
          "아파트에서 찾아볼 수 있는 전형적인 구조의 벽이 있다. 현관 신발장 입구에서 바라보는 복도 벽이다. 여기에 와우 포인트를 주면 집의 첫인상이 멋지다.",
          "데드 스페이스를 활용한다. 분명히 냉장고 문 또는 방문이 열리는 방향 탓에 쓰이지 못하는 벽이 있을 것이다.",
          "가구 주변의 벽을 함께 꾸미면 배치한 그 가구를 더욱 빛나게 한다.",
          "충분한 양의 가구가 벽을 메우지 못한 경우가 있다. 미니멀 라이프를 지향해서 최소한의 가구만 두더라도 휑한 벽에 포인트를 주면 자칫 단조로울 수 있는 공간에 무게감이 생긴다.",
        ],
        "당신의 도화지를 골랐다면, 상상 이상으로 좋은 효과를 낼 수 있는 월 데코 방법 5가지를 제안한다."
      ]
    }
  };
}

MagazineM0Js.prototype.baseMaker = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, isMac, isIphone } = GeneralJs;
  const { totalContents, naviHeight, ea, media, baseTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const contents = this.returnContents();


  


  console.log(contents);


  createNode({
    mother: baseTong,
    style: {
      display: "block",
      paddingTop: String(naviHeight) + ea,
    }
  });

}

MagazineM0Js.prototype.magazineLaunching = async function () {
  const instance = this;
  try {

    this.baseMaker();

  } catch (e) {
    console.log(e);
  }
}
