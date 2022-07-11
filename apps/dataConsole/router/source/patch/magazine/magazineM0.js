MagazineM0Js.prototype.returnContents = function () {
  return {};
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


  // 1

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

  createNode({
    mother: mainTong,
    style: {
      display: "block",
      height: String(blankMargin) + ea,
    }
  });

   // 2
   createNode({
     mother: mainTong,
     text: "02\n벽 선반",
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
     text: "쓸모없는 벽에 실용성을 더해 쓸모 있게 만드는 방법으로는 단연 벽 선반이 최고다. 수납 가구의 역할을 어느 정도 수행하면서도 하부를 띄워 설치할 수 있어서 공간 활용에 좋으며, 특히 대가구 주변에 설치하는 것을 추천한다. 소파 주변 벽 선반에 리모컨과 읽을 책을 두면 물건을 쉽게 찾을 수 있고 동선이 편안하다. 침대 주변 벽 선반에 알람 시계와 수면 램프를 두면 침대 협탁이 따로 필요 없다.",
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
     attribute: { src: binaryPath + "/c0.jpg" },
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
     text: "크고 작은 크기부터, 나무와 철제까지 다채로운 벽 선반 제품이 시중에 있으니 그 실용성을 극대화할 수 있도록 어떤 것을 비치할 목적인지 생각해 보고 고르는 것이 좋겠다. 수납 목적에는 튼튼한 시스템 선반이나 찬넬 선반이 적합하다. 데코 목적이 중점일 경우에는 무지주 선반이 괜찮은데, 선반을 받쳐주는 지지대가 밖으로 보이지 않는 깔끔한 형태라 그 위에 장식품이나 작은 액자, 디퓨저 등을 올려주면 인테리어 소품이 도드라진다.",
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
     attribute: { src: binaryPath + "/c1.jpg" },
     event: {
       contextmenu: (e) => { e.preventDefault(); },
       selectstart: (e) => { e.preventDefault(); }
     },
     style: {
       width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
       display: "inline-block",
       marginRight: String(photoMargin) + ea,
       marginBottom: String(photoMargin) + ea,
       borderRadius: String(3) + "px",
     }
   });
   createNode({
     mother: mainTong,
     mode: "img",
     attribute: { src: binaryPath + "/c2.jpg" },
     event: {
       contextmenu: (e) => { e.preventDefault(); },
       selectstart: (e) => { e.preventDefault(); }
     },
     style: {
       width: "calc(calc(100% - " + String(photoMargin) + ea + ") / 2)",
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
     text: "혹은 선반에 특별히 멋있는 것을 두지 않아도, 선반 자체를 오브제 삼아 여러 개를 배열하여 율동감을 표현할 수도 있다. 타공을 하고 못을 박기 어려운 임차 공간에도 꼭꼬핀을 사용하거나 부착식, 흡착식으로 설치하는 노하우가 있으니 낙담하지 않아도 된다. 아쉽지만 지지력이 약하니 수납 목적보다는 데코용으로 가벼운 제품을 선택하는 것이 좋다.",
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
     text: "* Top Tip\n스트링 시스템 (String® System) 브랜드는 수납용 월 시스템의 대중화와 유행의 주역이다. 건축가 출신의 디자이너 니세 스트링(Nisse Strinning)이 고안했기에 그의 이름을 땄다. 1949년에 스웨덴의 대형 출판사 본니에르는 많은 가정에서 책을 수납할 마땅한 가구가 없어 책 소비가 적다는 것을 깨닫고 선반 디자인 공모를 열였고, 그가 우승했다. 현재 스트링 시스템은 스칸디나비아 디자인의 아이콘이며 유럽 전역에서 사랑받는다. 책은 하중이 어마어마해서 도서관은 건축 초기부터 위치를 별도로 정하고 강력하게 설계된다는 사실을 아는가? 책을 수납할 목적으로 시작되어 얇은 라미네이트 고강도 강철로 제작하는 제품이니 견고함과 기능성을 신뢰해도 좋다. 스트링 시스템을 사용하여 물건이 많은 아이 방과 서재를 환상적으로 꾸며보길.",
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
     attribute: { src: binaryPath + "/c3.jpg" },
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


   // 3
   createNode({
     mother: mainTong,
     text: "03\n빛의 활용, 조명과 빔프로젝트",
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
     text: "비어 있는 벽을 꼭 채우기는 싫으면서도, 무언가 포인트나 기능은 있었으면 하는 두 가지 마음이 공존한다면 빛을 활용하여 자유롭게 사용될 수 있는 여지를 두면 된다.",
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
     text: "벽 자체에 벽부등이나 브라켓 조명을 설치할 수도 있지만, 그때그때 마음 가는 대로 변형이 가능하도록 완전히 벽을 자유롭게 하는 방식으로 제안한다. 벽이 아닌 천장에 핀 조명을 설치하고 벽을 따라 떨어지는 빛의 중심에 물건을 놓는다. 디자인 의자와 같이 가구 자체를 하나의 작품처럼 두어도 좋고, 피규어와 액자를 배치하면 우리 집만의 갤러리가 된다. 공사가 필요 없이, 스탠딩 조명과 테이블 조명을 벽면에 비추는 것도 똑똑하다. 거기에 어릴 때 하던 그림자 놀이를 응용해서 빛이 향하는 방향에 오브제를 두면 재미 요소가 생긴다.",
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
     attribute: { src: binaryPath + "/d1.jpg" },
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
     text: "벽은 빔 프로젝터를 쏘는 스크린으로 변신하기도 한다. 아무래도 화이트 계열의 벽이 좋을 것이다. 특히 작은 평수의 집에서는 부피가 크고 짐이 되는 스크린을 쌓아두지 않을 수 있어 효율적이다. 비록 실제 스크린에 비하면 화질의 차이가 있겠지만, 스크린을 사는 돈을 절약했으니 빔 프로젝터를 고성능으로 업그레이드해 보자. 영화를 보고 야구나 축구 등의 스포츠 경기를 시청하며 즐거움을 누리고, 액자를 대신해서 그림 작품을 띄워놓는 것도 멋질 테니 최고의 컨버터블 벽 꾸미기 방법.",
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

   // 4
   createNode({
     mother: mainTong,
     text: "04\n수집가들의 벽",
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
     text: "진정한 수집광들은 자신들의 수집품을 자랑하거나 고이 모실 공간이 필요하고, 실제로 박물관 관장들 중에는 수집광이 아주 많다. 그동안 정성스레 모아 온 물품으로 채운 벽은 더욱 애정이 갈 것이며, 하나의 전시 공간이 된다.",
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
     attribute: { src: binaryPath + "/d2.jpg" },
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
     text: "수집품은 거창하지 않고 개인의 관심사에 따라 하나 둘 모으면 그것이 수집품이고 컬렉션이다. 음악을 좋아하는 사람이라면 LP, CD, 테이프를 활용할 수 있고 실제 사용하는 악기를 벽에 수납과 동시에 진열할 수도 있다. 여행에서 가져온 마그네틱과 각 민족들의 마스크를 벽에 걸어 장식한다. 마그네틱은 시공을 병행하는 상황에서 벽 안에 자석판을 덧대고 그 위에 도배를 하면 이후 별다른 장치 없이도 감쪽같이 붙일 수 있다는 팁. 운동 선수에게는 메달과 트로피가, 동심을 간직한 키덜트들에게는 미니 RC카와 피규어가 아이템이 된다. 기타 등등 무엇이든 당신이 좋아하는 것으로 벽을 나를 표현하는 컬렉션 보드로 만들어 보길 추천한다.",
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

   // 5
   createNode({
     mother: mainTong,
     text: "05\n그린 월",
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
     text: "인테리어 트렌드도 시대에 걸맞게 친환경 키워드를 반영하고 있다. 그린 월은 벽면을 각종 식물로 입힌 형태를 의미한다. 본래 실외 건축에서 도심 속 열섬효과를 방지하고 건물의 에너지 효율을 높여주는 대표적인 친환경 조경 방식으로 많이 사용되어 왔다.",
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
     attribute: { src: binaryPath + "/e0.jpg" },
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
     text: "이제는 그린월이 인테리어에 접목되는 기술이 발전하면서 그 유익한 점도 그대로 실내로 들어왔다. 1) 공기를 정화해 주고 온도와 습도를 생명 친화적으로 유지해 준다. (보통의 공기청정기는 미세먼지를 걸러주지만 화학물을 분해하고 거르지는 못한다.) 그래서 비염이 있는 아이들이 있는 집이나, 기관지가 안 좋은 어르신들이 있는 집에 추천한다. 또는 병원과 같은 의료기관에도 적합하다. 2) 식물의 녹색이 스트레스를 해소하고 심신의 평안을 준다. 오피스와 공공 기관에 녹색을 사용해서 정신의 피로를 덜어보자.",
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
     text: "이렇게 좋은 그린월을 설치하려면 다음의 사항을 체크해야 한다. 급배수 시설의 연결이 가능한지, 식물의 종류에 따라 채광과 습도 등을 고려하여 설치 위치와 관리 측면을 살펴야 한다. 특히 급배수 시설의 조건 때문에 주거공간에서는 주로 화장실 또는 베란다에 그린월을 많이 활용하는 편이다.",
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
     text: "* Top Tip\n‘아… 조건이 까다로운데 좀 더 현실적인 방법은 없나’ 실망하고 있을 여러분에게! 획기적인 제품을 소개한다. 스마트 그린월이라는 것이 있는데, 전자 제품의 형태로 정수기처럼 렌트 또는 구매를 할 수 있고 핸드폰과 연동하여 물 흐름과 수분 농도를 조절이 가능하다. 그럼에도 아직은 그린월이 낯설다면, 행잉 플랜트나 식물 액자를 벽면에 잔뜩 걸어 비슷한 무드를 느껴보는 작은 경험부터 해보면 어떨까?",
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

   // 5
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
     text: "대중에게 가장 친숙하고 쉬운 방법은 아이템을 구매해서 데코하는 것이다. 하지만 액자는 지겹고 보다 특별한 아이템을 원한다면, 헌팅 트로피 / 패브릭 월 행잉 / 금속 오브제 / 시계 / 액자 등의 폭넓은 선택지가 있다. 내추럴 코지 컨셉에는 패브릭으로, 모던 시크 컨셉에는 금속 오브제로 우리 집 무드에 맞는 아이템을 고르면 컨셉의 매력이 배가 된다.",
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
     attribute: { src: binaryPath + "/f0.jpg" },
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
     text: "오늘 소개한 월 데코 방법들은 평범하지 않으면서도 대대적인 공사 없이 누구나 시도가 가능한 것들 위주이다. 한 번 시도해 보면, 그 변화와 효과에 놀랄 테니 마음에 드는 방법으로 꼭 연출해 볼 것. 하지만 언제나 고려 사항과 주의점들은 있다. 예를 들어, 벽 선반은 벽의 구조체가 콘크리트인지, 석고보드인지, 타일 마감인지 등의 상태에 따라 설치의 가능 여부와 방식이 상이하다. 벽 선반 제품과 적재할 물건들의 하중을 석고보드 벽이 버티지 못한다면, 벽 보강 공사가 필요하다. 이런 점을 생각하지 않고 예쁘게 완성될 상상만을 하다가는 선반이 떨어지는 것은 물론 벽이 와르르 무너질 수도! 또 벽의 안쪽 어떤 위치에는 배선함과 같은 중요 시설이 지나간다. 못 하나를 박더라도 우리 집의 형태와 구조를 이해하고 실행하면 더 안전하게 아름다운 결과물을 만든다. 이 글을 읽고 하고 싶은 마음은 굴뚝같지만 혼자서는 자신이 없는 이들이여, 인테리어 전문가에게 도움을 청하면 실패하지 않는다.",
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
