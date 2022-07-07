MagazineM0Js.prototype.returnContents = function () {
  return {
    title: {
      sub: "멋진 인테리어는 벽을 낭비하지 않는다.",
      main: "밋밋한 벽을 꾸미는 스타일링법"
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

MagazineM0Js.prototype.mainContents = function () {
  const instance = this;
  const { createNode, colorChip, withOut, svgMaker, equalJson, designerMthParsing, designerCareer, isMac, isIphone, selfHref, setQueue } = GeneralJs;
  const { totalContents, ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let mainWidth;
  let mainPaddingTop;
  let titleSize;
  let titleWeight;
  let titleLineHeight;
  let titleBarMarginTop;
  let titleBarWidth;
  let contentsSize;
  let contentsWeight;
  let contentsLineHeight;
  let mainTong;
  let titleBarMarginBottom;
  let photoMargin;
  let blankMarginFirst;
  let blankMargin;
  let blankMargin2;
  let blankMarginLast;
  let contentsMarginBottom;
  let binaryPath;

  binaryPath = FRONTHOST + "/list_image/magaz" + "m0";

  mainWidth = <%% 900, 900, 900, 720, 100 %%>;
  mainPaddingTop = <%% 110, 110, 110, 80, 11.7 %%>;

  titleSize = <%% 23, 23, 23, 21, 4.8 %%>;
  titleWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleLineHeight = <%% 1.5, 1.5, 1.5, 1.5, 1.5 %%>;
  titleBarMarginTop = <%% 15, 15, 15, 15, 3 %%>;
  titleBarWidth = <%% 80, 80, 80, 80, 18 %%>;
  titleBarMarginBottom = <%% 36, 36, 36, 36, 5.5 %%>;

  contentsSize = <%% 16, 16, 16, 15, 3.8 %%>;
  contentsWeight = <%% 400, 400, 400, 400, 400 %%>;
  contentsLineHeight = <%% 1.7, 1.7, 1.7, 1.7, 1.7 %%>;
  contentsMarginBottom = <%% 36, 36, 36, 36, 6 %%>;

  photoMargin = <%% 8, 8, 8, 8, 1 %%>;
  blankMarginFirst = <%% 126, 126, 126, 96, 13.5 %%>;
  blankMargin = <%% 100, 100, 100, 70, 11 %%>;
  blankMargin2 = <%% 100, 100, 100, 70, 10 %%>;
  blankMarginLast = <%% 200, 200, 200, 170, 20 %%>;


  mainTong = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      width: String(mainWidth) + ea,
      left: "calc(50% - " + String(mainWidth / 2) + ea + ")",
      background: colorChip.white,
      paddingTop: String(mainPaddingTop) + ea,
      paddingBottom: String(200) + ea,
      animation: "fadeupdelay 0.5s ease forwards",
    },
  });

  createNode({
    mother: mainTong,
    text: "멋진 인테리어는\n벽을 낭비하지 않는다.",
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginTop: String(titleBarMarginTop) + ea,
      marginBottom: String(titleBarMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          width: String(titleBarWidth) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      }
    ]
  });

  createNode({
    mother: mainTong,
    text: "모든 집에는 벽이 있다. 집에서 아주 많은 면적을 차지하는 벽을 잘 꾸미는 것은 인테리어 성공의 지름길이다. 멋진 인테리어는 절대로 벽을 낭비하지 않는다. 우리 집에도 꾸밀 벽이 있는지 떠올려보자.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      color: colorChip.black,
      lineHeight: String(contentsLineHeight),
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMarginFirst) + ea,
    }
  });

  createNode({
    mother: mainTong,
    mode: "img",
    attribute: { src: binaryPath + "/a0.jpg" },
    event: {
      contextmenu: (e) => { e.preventDefault(); },
      selectstart: (e) => { e.preventDefault(); }
    },
    style: {
      width: withOut(0),
      display: "inline-block",
      marginBottom: String(photoMargin) + ea,
      marginRight: String(0) + ea,
      borderRadius: String(3) + "px",
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  createNode({
    mother: mainTong,
    text: "1) 아파트에서 찾아볼 수 있는 전형적인 구조의 벽이 있다. 현관 신발장 입구에서 바라보는 복도 벽이다. 여기에 와우 포인트를 주면 집의 첫인상이 멋지다. 2) 데드 스페이스를 활용한다. 분명히 냉장고 문 또는 방문이 열리는 방향 탓에 쓰이지 못하는 벽이 있을 것이다. 3) 가구 주변의 벽을 함께 꾸미면 배치한 그 가구를 더욱 빛나게 한다. 4) 충분한 양의 가구가 벽을 메우지 못한 경우가 있다. 미니멀 라이프를 지향해서 최소한의 가구만 두더라도 휑한 벽에 포인트를 주면 자칫 단조로울 수 있는 공간에 무게감이 생긴다.\n\n당신의 도화지를 골랐다면, 상상 이상으로 좋은 효과를 낼 수 있는 월 데코 방법 5가지를 제안한다.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      color: colorChip.black,
      lineHeight: String(contentsLineHeight),
      marginBottom: String(contentsMarginBottom) + ea,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  createNode({
    mother: mainTong,
    text: "01\n실크 스크린, 스텐실, 스티커",
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      fontSize: String(titleSize) + ea,
      fontWeight: String(titleWeight),
      lineHeight: String(titleLineHeight),
      color: colorChip.black,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      position: "relative",
      textAlign: "center",
      marginTop: String(titleBarMarginTop) + ea,
      marginBottom: String(titleBarMarginBottom) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          width: String(titleBarWidth) + ea,
          borderBottom: "1px solid " + colorChip.gray3,
        }
      }
    ]
  });

  createNode({
    mother: mainTong,
    text: "디자인 벽지와 같은 효과를 원하지만 가구와 짐을 비우고 도배를 할 수 없는 상황이라면, 가능한 범위에 부분적으로 연출이 가능한 것이 장점인 실크 스크린과 스텐실, 스티커를 활용할 수 있다.\n\n이것들의 두 번째 장점은 도안을 고르고 원하는 위치에 붙이는 것이 자유로워 나만의 디자인을 원한다면 적합하다는 것이다. 내가 원하는 도안을 인쇄해 주거나 같이 만들어주기도 하는 제조업자들이 있다. 아이 방에는 토끼나 바다 생물, 공룡 등의 동물류와 무지개와 구름, 별 같은 자연 풍경이 어울린다. 주방이나 현관, 세탁실에는 관련한 소재의 그림이나 텍스트를 도안으로 사용해 공간 용도를 미적으로 표시할 수 있다. 그 외에도 일러스트 삽화와 질감 표시, 기하학적인 무늬까지 디자인에 한계가 거의 없다.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      color: colorChip.black,
      lineHeight: String(contentsLineHeight),
      marginBottom: String(contentsMarginBottom) + ea,
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  createNode({
    mother: mainTong,
    mode: "img",
    attribute: { src: binaryPath + "/b1.jpg" },
    event: {
      contextmenu: (e) => { e.preventDefault(); },
      selectstart: (e) => { e.preventDefault(); }
    },
    style: {
      width: withOut(0),
      display: "inline-block",
      marginBottom: String(photoMargin) + ea,
      marginRight: String(0) + ea,
      borderRadius: String(3) + "px",
    }
  });

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

  createNode({
    mother: mainTong,
    text: "세 가지 기법은 유사하면서도 작은 차이점들이 있다. 실크 스크린은 도료로 작업하고 꽤 정교한 표현이 가능해서 가장 퀄리티가 좋지만 난이도 또한 가장 높으니 전문 업체에 맡기는 것을 권장한다. 스텐실은 상대적으로 간단한 틀을 대고 물감을 찍어내는 방식이므로 손재주가 있으면 셀프로 도전할 수 있다. 벽지 스티커는 가장 쉽고 간편한 방식이며, 비닐로 되어 있어 청소와 유지가 쉽고 습기에 강하다.",
    style: {
      display: "block",
      position: "relative",
      fontSize: String(contentsSize) + ea,
      fontWeight: String(contentsWeight),
      color: colorChip.black,
      lineHeight: String(contentsLineHeight),
      marginBottom: String(contentsMarginBottom) + ea,
    }
  });



}

MagazineM0Js.prototype.magazineLaunching = async function () {
  const instance = this;
  try {

    this.mainContents();

  } catch (e) {
    console.log(e);
  }
}
