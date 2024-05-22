/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈리에종 서비스 소개 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "frontAbout",
  "hangul": "서비스 소개",
  "route": [
    "frontAbout"
  ]
} %/%/g

const FrontAboutJs = function () {
  this.mother = new GeneralJs();
}

FrontAboutJs.binaryPath = FRONTHOST + "/middle/index";

FrontAboutJs.prototype.insertServiceDetailBox = async function (secondBaseMother = null) {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, colorExtended, isMac, isIphone, svgMaker, serviceParsing, dateToString, dateToHangul, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics, objectDeepCopy, zeroAddition } = GeneralJs;
  const { ea, media, baseTong, standardWidth, naviHeight, heightTong } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { secondBaseClassName } = this;
  try {
    let secondBase;
    let contents;
    let moreWords;
    let num;
    let boxRadius;
    let moreAreaHeight;
    let moreSize, moreWeight;
    let moreTextTop;
    let mobileMargin;
    let blackTop;
    let whiteBlockBetween;
    let whiteBlockHeight;
    let whiteBlock;
    let barMargin;
    let topBottomMargin;
    let blueBlock;
    let blueBlockBetween;
    let titleSize;
    let imageReviewBox;
    let imageBoxWidth;
    let imageScale;
    let imageOpacity;
    let imageMarginTop;
    let selectionButtons;
    let tableColumns;
    let tableTitle, tableDescription;
    let thisServiceBase;
    let selectionButtonsBase;
    let serviceButtonBlock;
    let num2;
    let boo;
    let mainServiceBlock;
    let blackBlock;
    let solveBlock;
    let thisBlueOpacity;
    let photoBlock;
    let blackBlueArea;
    let num3;
    let solveListArea;
    let num4;
    let solveBlockHeight;
    let blockBetween;
    let commentsTitleSize;
    let photoHeight;
    let photoBetween;
    let serviceAreaBetween;
    let photoWidth;
    let photoRadius;
    let tableBase;
    let bigMargin;
    let tableMother;
    let tableFactor;
    let num5;
    let tableFactorHeight;
    let tableFactorWidth0, tableFactorWidth1;
    let factorBetween;
    let factorSize;
    let factorTextTop;
    let factorRadius;

    boxRadius = 15;
    photoRadius = 8;
    moreAreaHeight = 12;
    factorRadius = 4;

    moreSize = 3.2;
    moreWeight = 600;
    moreTextTop = -0.2;

    mobileMargin = 6;
    blackTop = -31;

    whiteBlockBetween = 4;

    whiteBlockHeight = 80;
    barMargin = 2.5;

    topBottomMargin = 9;

    blueBlockBetween = 1.8;

    titleSize = 4.8;

    imageBoxWidth = 62;
    imageScale = 0.84;
    imageOpacity = 0.4;

    imageMarginTop = 3;

    solveBlockHeight = 9.4;
    blockBetween = 1.8;

    commentsTitleSize = 5.4;

    photoHeight = 70;
    photoWidth = 140;
    photoBetween = 2.5;

    serviceAreaBetween = 24;

    bigMargin = 11;
    tableFactorHeight = 8.2;
    factorBetween = 0.4;
    tableFactorWidth0 = 11.5;
    tableFactorWidth1 = (standardWidth - tableFactorWidth0 - (factorBetween * 3)) / 3;

    factorSize = 2.8;
    factorTextTop = -0.2;

    if (secondBaseMother === null || typeof secondBaseMother !== "object") {
      secondBaseMother = baseTong;
    }

    moreWords = "더보기";
    tableTitle = "나에게 필요한 서비스는 무엇일까?";
    tableDescription = [
      "홈리에종 서비스 유형은 3가지로 나뉘며,",
      "시공의 정도와 범위에 따라 구분됩니다.",
    ]
    tableColumns = [
      "철거",
      "보양",
      "목공",
      "전기",
      "타일",
      "바닥",
      "욕실",
      "주방",
      "필름",
      "도배",
      "중문",
      "가구",
      "발코니",
      "기타",
    ];
    contents = [
      {
        title: "홈퍼니싱",
        eng: "Home Furnishing",
        description: [
          "인테리어 시공 없이",
          "가구, 패브릭, 소품만으로",
          "공간을 변화시키는 홈퍼니싱",
        ],
        comments: [
          "시간은 부족하고",
          "선택할 것은 많아요..",
        ],
        buttons: [
          "예산 문제",
          "바쁜 일상",
          "취향과 감각",
          "셀프 인테리어 실패",
        ],
        table: [
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
          "제공 없음",
        ],
        solve: {
          title: [
            "가구 구매와 배치,",
            "소품 활용으로 무드 체인지!",
          ],
          description: [
            "경력과 역량을 지닌 디자이너가 제공하는 배치도와",
            "기획이 담긴 홈퍼니싱 서비스를 경험하세요.",
          ],
          buttons: [
            "디자이너의 컨셉 제안과 기획",
            "공간 배치도와 퍼니싱 구입 제안서 제공",
            "맞춤형 홈퍼니싱 완성",
          ],
          images: [
            FrontAboutJs.binaryPath + "/furnishingSource0.jpg",
            FrontAboutJs.binaryPath + "/furnishingSource1.jpg",
          ],
        }
      },
      {
        title: "홈스타일링",
        eng: "Home Styling",
        description: [
          "필수적인 부분만 적절하게 시공을 하고",
          "적절한 퍼니싱으로 집 컨디션에 알맞는",
          "합리적인 서비스",
        ],
        comments: [
          "전체 구조 변경은 부담스럽고,",
          "원하는 곳만 시공하고 싶어요!",
        ],
        buttons: [
          "예산 문제",
          "부담스러운 개별 시공 의뢰",
          "새아파트 단일 시공",
        ],
        table: [
          "부분 철거",
          "해당 면적",
          "걸레받이, 몰딩, 문짝",
          "일부 배선 및 조명",
          "덧방 위주",
          "마루, 장판",
          "악세사리 교체",
          "악세사리 교체",
          "전체 제공",
          "전체 제공",
          "중문 교체",
          "붙박이장, 냉장고장",
          "제공 없음",
          "제공 없음",
        ],
        solve: {
          title: [
            "도배 바닥 필름 등",
            "기본적인 톤 보정만으로",
            "공간의 분위기 전환!",
          ],
          description: [
            "디자이너가 제공하는 기획을 바탕으로",
            "믿을 수 있는 시공사와 안정적인 인테리어를 경험하세요.",
          ],
          buttons: [
            "디자이너의 컨셉 제안과 기획",
            "공간 배치도와 퍼니싱 구입 제안서 제공",
            "부분 시공 디자인 및 진행",
            "맞춤형 홈스타일링 완성",
          ],
          images: [
            FrontAboutJs.binaryPath + "/stylingSource0.jpg",
            FrontAboutJs.binaryPath + "/stylingSource1.jpg",
          ],
        }
      },
      {
        title: "토탈 스타일링",
        eng: "Total Styling",
        description: [
          "원하는 구조를 위한 철거와 주방, 화장실 등",
          "기본 이상의 시공을 통해",
          "전체적인 분위기를 업그레이드",
        ],
        comments: [
          "라이프 스타일이 담긴",
          "인테리어를 원해요.",
        ],
        buttons: [
          "구조 변경과 철거",
          "제작 가구로 나에게 맞는 공간",
          "구축 아파트 시공",
        ],
        table: [
          "전체 철거",
          "해당 면적",
          "모든 종류의 목공",
          "전체 배선 및 조명",
          "전체 철거 및 교체",
          "마루, 장판, 타일",
          "전체 철거 및 공사",
          "전체 철거 및 공사",
          "전체 제공",
          "전체 제공",
          "중문 교체",
          "모든 제작 가구",
          "발코니 확장",
          "금속, 샤시 등",
        ],
        solve: {
          title: [
            "오래 머물고 싶은",
            "나에게 맞는 공간으로",
            "평범한 집의 형태 탈피!",
          ],
          description: [
            "구조 변경과 자유로운 시공을 통해",
            "내 옷을 입은 것만 같은",
            "맞춤형 주거공간을 경험하세요.",
          ],
          buttons: [
            "디자이너의 컨셉 제안과 기획",
            "공간 배치도와 퍼니싱 구입 제안서 제공",
            "전체 시공 디자인 및 진행",
            "맞춤형 토탈 스타일링 완성"
          ],
          images: [
            FrontAboutJs.binaryPath + "/totalSource0.jpg",
            FrontAboutJs.binaryPath + "/totalSource1.jpg",
          ],
        }
      },
    ];
    selectionButtons = contents.map((o) => { return o.eng });

    secondBase = createNode({
      mother: secondBaseMother,
      class: [ secondBaseClassName ],
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        paddingTop: String(secondBaseMother === baseTong ? 4 : 0) + ea,
      },
    });

    // service contents
    num = 0;
    for (let c of contents) {

      thisBlueOpacity = 1 - (0.2 * num);

      thisServiceBase = createNode({
        mother: secondBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
        }
      });
      selectionButtonsBase = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          marginBottom: String(1.6) + ea,
          paddingLeft: String(1) + ea,
        }
      })

      // service buttons
      num2 = 0;
      for (let service of selectionButtons) {
        boo = (num === num2);
        serviceButtonBlock = createNode({
          mother: selectionButtonsBase,
          style: {
            display: "inline-flex",
            position: "relative",
            width: "auto",
            height: String(3) + ea,
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "row",
            marginRight: String(3) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          style: {
            display: "inline-block",
            position: "relative",
            width: String(2) + ea,
            height: String(2) + ea,
            borderRadius: String(1) + "px",
            background: boo ? colorExtended.blue : colorExtended.white,
            border: "1px solid " + colorExtended.black,
            marginRight: String(1) + ea,
          }
        });
        createNode({
          mother: serviceButtonBlock,
          text: service,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(2.5) + ea,
            fontWeight: String(700),
            fontFamily: "mont",
            color: boo ? colorExtended.mainBlue : colorExtended.deactive,
            top: String(0) + ea,
          }
        });

        num2++;
      }

      // main box
      mainServiceBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: String(2) + "px solid " + colorExtended.black,
          background: colorExtended.white,
          borderRadius: String(boxRadius) + "px",
          marginBottom: String(2) + ea,
          height: String(52) + ea,
          zIndex: String(2),
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "absolute",
          width: String(1.3) + ea,
          height: String(1.3) + ea,
          background: colorExtended.mainBlue,
          top: String(2.5) + ea,
          right: String(2.5) + ea,
          opacity: String(0.5),
        }
      })
      createNode({
        mother: mainServiceBlock,
        text: c.title,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(4.8) + ea,
          fontWeight: String(700),
          fontFamily: "pretendard",
          color: colorExtended.black,
          marginBottom: String(0.1) + ea,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.eng,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(2.3) + ea,
          fontWeight: String(700),
          fontFamily: "mont",
          color: colorExtended.mainBlue,
        }
      });
      createNode({
        mother: mainServiceBlock,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(28) + ea,
          height: String(3.6) + ea,
          marginBottom: String(3.8) + ea,
          borderBottom: String(2) + "px solid " + colorExtended.black,
        }
      });
      createNode({
        mother: mainServiceBlock,
        text: c.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.3) + ea,
          fontWeight: String(500),
          fontFamily: "pretendard",
          color: colorExtended.black,
          lineHeight: String(1.5),
          textAlign: "center",
        }
      });

      // black box
      blackBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(mobileMargin, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(6) + ea,
          paddingBottom: String(11) + ea,
          zIndex: String(1),
          paddingLeft: String(mobileMargin / 2) + ea,
          paddingRight: String(mobileMargin / 2) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            width: withOut(-1 * mobileMargin * 2, ea),
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.black,
            height: withOut(-1 * 20, ea),
            top: String(-20) + ea,
            borderBottomRightRadius: String(8) + ea,
          }
        }
      });
      createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0.8) + ea,
          marginBottom: String(2) + ea,
        },
        child: {
          mode: "svg",
          source: svgMaker.doubleQuote(colorExtended.mainBlue),
          style: {
            display: "inline-block",
            width: String(3) + ea,
          }
        }
      });
      createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0) + ea,
        },
        child: {
          text: c.comments,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.white,
            lineHeight: String(1.44),
          }
        }
      });
      blackBlueArea = createNode({
        mother: blackBlock,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "end",
          alignItems: "end",
          flexDirection: "column",
          paddingTop: String(num === 0 ? 7.5 : 9) + ea,
          paddingLeft: String(0 / 2) + ea,
          paddingRight: String(0 / 2) + ea,
        }
      });
      num3 = 0;
      for (let b of c.buttons) {

        createNode({
          mother: blackBlueArea,
          style: {
            height: String(8.6) + ea,
            paddingLeft: String(7) + ea,
            paddingRight: String(7) + ea,
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: String(2.5) + ea,
            overflow: "hidden",
            borderTopLeftRadius: String(num3 % 2 !== 0 ? 8.6 / 2 : 0) + ea,
            borderBottomLeftRadius: String(8.6 / 2) + ea,
            borderBottomRightRadius: String(8.6 / 2) + ea,
            borderTopRightRadius: String(num3 % 2 === 0 ? 8.6 / 2 : 0) + ea,
            marginRight: num3 % 2 === 0 ? String(6 + (11 * Math.floor(num3 / 2) - 1)) + ea : String(0) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.white,
              }
            },
            {
              style: {
                position: "absolute",
                display: "block",
                top: String(0),
                left: String(0),
                width: withOut(0, ea),
                height: withOut(0, ea),
                background: colorExtended.mainBlue,
                opacity: String(thisBlueOpacity),
              }
            },
            {
              style: {
                position: "absolute",
                top: String(1.2) + ea,
                left: num3 % 2 === 0 ? String(1.2) + ea : "",
                right: num3 % 2 === 0 ? "" : String(1.2) + ea,
                width: String(0.9) + ea,
                height: String(0.9) + ea,
                borderRadius: String(1) + ea,
                background: colorExtended.blueDim,
              }
            },
            {
              text: b,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(3.4) + ea,
                fontWeight: String(600),
                color: colorExtended.black,
                fontFamily: "pretendard",
                top: String(-0.2) + "px",
              }
            }
          ]
        });

        num3++;
      }

      // solve box
      solveBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(mobileMargin, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          paddingTop: String(11) + ea,
          paddingBottom: String(11) + ea,
          paddingLeft: String(mobileMargin / 2) + ea,
          paddingRight: String(mobileMargin / 2) + ea,
        },
        child: {
          style: {
            display: "block",
            position: "absolute",
            width: withOut(-1 * mobileMargin * 2, ea),
            left: String(-1 * mobileMargin) + ea,
            background: colorExtended.white,
            height: withOut(-1 * 10, ea),
            top: String(-10) + ea,
          },
          next: {
            style: {
              display: "block",
              position: "absolute",
              width: withOut(-1 * mobileMargin * 2, ea),
              left: String(-1 * mobileMargin) + ea,
              background: colorExtended.mainBlue,
              height: withOut(-1 * 10, ea),
              top: String(-10) + ea,
              opacity: String(thisBlueOpacity),
            }
          }
        }
      });
      createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0.8) + ea,
          marginBottom: String(6) + ea,
        },
        child: {
          text: c.eng,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(3.3) + ea,
            fontWeight: String(700),
            color: colorExtended.black,
            fontFamily: "mont",
          },
          previous: {
            style: {
              position: "absolute",
              left: String(-0.8) + ea,
              top: String(-0.5) + ea,
              width: String(4.8) + ea,
              height: String(4.8) + ea,
              borderRadius: String(3) + "px",
              background: colorExtended.white,
              opacity: String(0.7),
            }
          }
        }
      });
      createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "start",
          alignItems: "start",
          width: withOut(0, ea),
          paddingLeft: String(0) + ea,
        },
        child: {
          text: c.solve.title,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(commentsTitleSize) + ea,
            fontWeight: String(600),
            fontFamily: "pretendard",
            color: colorExtended.darkBlack,
            lineHeight: String(1.44),
          }
        }
      });
      createNode({
        mother: solveBlock,
        text: c.solve.description.join("\n"),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(3.3) + ea,
          fontWeight: String(400),
          fontFamily: "pretendard",
          color: colorExtended.darkBlack,
          lineHeight: String(1.5),
          textAlign: "left",
          marginTop: String(3) + ea,
        }
      });
      solveListArea = createNode({
        mother: solveBlock,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "end",
          alignItems: "end",
          flexDirection: "column",
          paddingTop: String(10) + ea,
        }
      });
      num4 = 0;
      for (let b of c.solve.buttons) {

        createNode({
          mother: solveListArea,
          style: {
            height: String(solveBlockHeight) + ea,
            display: "flex",
            width: withOut(0, ea),
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: String(blockBetween) + ea,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: String(solveBlockHeight) + ea,
                height: String(solveBlockHeight) + ea,
                borderRadius: String(8) + "px",
                background: colorExtended.blueDark,
                justifyContent: "center",
                alignItems: "center",
                marginRight: String(blockBetween) + ea,
              },
              child: {
                text: zeroAddition(num4 + 1),
                style: {
                  display: "inline-flex",
                  position: "relative",
                  top: String(0) + ea,
                  fontSize: String(3.4) + ea,
                  fontWeight: String(700),
                  fontFamily: "mont",
                  color: colorExtended.darkBlack,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                position: "relative",
                width: withOut(solveBlockHeight + blockBetween, ea),
                height: String(solveBlockHeight) + ea,
                borderRadius: String(8) + "px",
                background: colorExtended.darkBlack,
                justifyContent: "center",
                alignItems: "center",
              },
              child: {
                text: b,
                style: {
                  display: "inline-flex",
                  position: "relative",
                  top: String(-0.1) + ea,
                  fontSize: String(3.3) + ea,
                  fontWeight: String(600),
                  fontFamily: "pretendard",
                  color: colorExtended.white,
                }
              }
            },
          ]
        });

        num4++;
      }

      // photo zone
      photoBlock = createNode({
        mother: thisServiceBase,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          height: String(photoHeight) + ea,
          paddingTop: String(11) + ea,
          paddingBottom: String(serviceAreaBetween) + ea,
        },
      });
      createNode({
        mother: photoBlock,
        style: {
          display: "block",
          position: "relative",
          width: withOut(-1 * mobileMargin * 2, ea),
          height: withOut(0, ea),
          left: String(-1 * mobileMargin) + ea,
          overflow: "scroll",
        },
        children: [
          {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                height: withOut(0, ea),
                paddingLeft: String(mobileMargin) + ea,
                paddingRight: String(mobileMargin * 1.5) + ea,
                width: String(photoWidth) + ea,
              },
              children: [
                {
                  mode: "img",
                  attribute: { src: c.solve.images[0] },
                  style: {
                    display: "inline-block",
                    height: String(photoHeight) + ea,
                    borderRadius: String(photoRadius) + "px",
                    marginRight: String(photoBetween) + ea,
                  }
                },
                {
                  mode: "img",
                  attribute: { src: c.solve.images[1] },
                  style: {
                    display: "inline-block",
                    height: String(photoHeight) + ea,
                    borderRadius: String(photoRadius) + "px",
                  }
                },
              ]
            }
          }
        ]
      });

      num++;
    }

    // table
    tableBase = createNode({
      mother: secondBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: String(16) + ea,
        paddingBottom: String(22) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "absolute",
          width: withOut(-1 * mobileMargin * 2, ea),
          left: String(-1 * mobileMargin) + ea,
          background: colorExtended.blueWhiteWhiteBack,
          height: withOut(0, ea),
          top: String(0) + ea,
        }
      }
    });

    createNode({
      mother: tableBase,
      style: {
        display: "inline-flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        background: colorExtended.black,
        width: String(70) + ea,
        height: String(11) + ea,
        borderRadius: String(11) + ea,
      },
      child: {
        text: tableTitle,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(4.4) + ea,
          fontWeight: String(700),
          fontFamily: "pretendard",
          color: colorExtended.white,
          top: String(-0.2) + ea,
        }
      }
    });
    createNode({
      mother: tableBase,
      text: tableDescription.join("\n"),
      style: {
        display: "inline-block",
        position: "relative",
        fontSize: String(3.3) + ea,
        fontWeight: String(500),
        fontFamily: "pretendard",
        color: colorExtended.black,
        lineHeight: String(1.5),
        textAlign: "center",
        marginTop: String(3) + ea,
        marginBottom: String(9) + ea,
      }
    });

    tableMother = createNode({
      mother: tableBase,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }
    });

    tableFactor = createNode({
      mother: tableMother,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(0, ea),
        height: String(tableFactorHeight) + ea,
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "row",
        marginBottom: String(factorBetween) + ea,
      }
    });
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth0) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1.5px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.white,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "구분",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    });
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1.5px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "홈퍼니싱",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    })
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1.5px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        marginRight: String(factorBetween) + ea,
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "홈스타일링",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    })
    createNode({
      mother: tableFactor,
      style: {
        display: "inline-flex",
        position: "relative",
        width: String(tableFactorWidth1) + ea,
        height: withOut(0, ea),
        boxSizing: "border-box",
        border: "1.5px solid " + colorExtended.black,
        borderRadius: String(factorRadius) + "px",
        background: colorExtended.mainBlue,
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "토탈 스타일링",
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(factorSize) + ea,
          fontWeight: String(800),
          color: colorExtended.black,
          top: String(factorTextTop) + ea,
        }
      }
    });

    for (let i = 0; i < tableColumns.length; i++) {
      tableFactor = createNode({
        mother: tableMother,
        style: {
          display: "flex",
          position: "relative",
          width: withOut(0, ea),
          height: String(tableFactorHeight) + ea,
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
          marginBottom: String(factorBetween) + ea,
        }
      });
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth0) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px solid " + colorExtended.black,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.black,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: tableColumns[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(800),
            color: colorExtended.white,
            top: String(factorTextTop) + ea,
          }
        }
      });
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray3,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[0].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(600),
            color: /없음/gi.test(contents[0].table[i]) ? colorExtended.deactive : colorExtended.black,
            top: String(factorTextTop) + ea,
          }
        }
      })
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray3,
          borderRadius: String(factorRadius) + "px",
          marginRight: String(factorBetween) + ea,
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[1].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(600),
            color: /없음/gi.test(contents[1].table[i]) ? colorExtended.deactive : colorExtended.black,
            top: String(factorTextTop) + ea,
          }
        }
      })
      createNode({
        mother: tableFactor,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(tableFactorWidth1) + ea,
          height: withOut(0, ea),
          boxSizing: "border-box",
          border: "1.5px dotted " + colorExtended.gray3,
          borderRadius: String(factorRadius) + "px",
          background: colorExtended.white,
          justifyContent: "center",
          alignItems: "center",
        },
        child: {
          text: contents[2].table[i],
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(factorSize) + ea,
            fontWeight: String(600),
            color: colorExtended.blueDark,
            top: String(factorTextTop) + ea,
          }
        }
      });
    }
    
  } catch (e) {
    console.log(e);
  }
}

FrontAboutJs.prototype.resizeEvent = function () {
  const instance = this;
  const { homeliaisonAnalytics, colorExtended } = GeneralJs;
  const { ea, media, baseTong, standardWidth, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;

  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;

  if (desktop) {
    const resizeDebounceEvent = function () {
      let timeout;
      const reEvent = function () {
        homeliaisonAnalytics({
          page: instance.pageName,
          standard: instance.firstPageViewTime,
          action: "aspirantPageResize",
          data: {
            delta: (new Date()).valueOf() - instance.firstPageViewTime.valueOf(),
            date: new Date(),
          },
        }).then(() => {
          window.location.reload();
          instance.resizeStack = 0;
        }).catch((err) => {
          console.log(err);
        });
      }
      let immediate = null;
      return function (e) {
        if (instance.resizeStack === 0) {
          instance.resizeStack = 1;
          instance.resizeFrom = window.innerWidth;
        }
        let context = this;
        let args = arguments;
        function later() {
          timeout = null;
          if (!immediate) { reEvent.apply(context, args); };
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, 250);
        if (callNow) {
          reEvent.apply(context, args);
        }
      }
    }
    window.addEventListener("resize", resizeDebounceEvent());
  }
}

FrontAboutJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { media } = this;
    const { returnGet, ajaxJson, dateToString, homeliaisonAnalytics, colorExtended, stringToLink, objectDeepCopy } = GeneralJs;
    const getObj = returnGet();
    const mobile = media[4];
    const desktop = !mobile;

    this.initAreaClassName = "initAreaClassName";
    this.secondBaseClassName = "secondBaseClassName";

    await this.mother.ghostClientLaunching({
      mode: "front",
      name: "frontAbout",
      client: null,
      base: {
        instance: this,
        binaryPath: FrontAboutJs.binaryPath,
        subTitle: "",
        secondBackground: false,
        backgroundType: 9,
        blueLogo: true,
      },
      local: async () => {
        try {

          await instance.insertServiceDetailBox();
          
          instance.resizeEvent();
          setInterval(() => {
            homeliaisonAnalytics({
              page: instance.pageName,
              standard: instance.firstPageViewTime,
              action: "readTimer",
              data: {
                cliid: "null",
                href: window.encodeURIComponent(window.location.href),
                date: dateToString(new Date(), true),
              },
            }).catch((err) => {
              console.log(err);
            });
          }, 60 * 1000);
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "FrontAboutJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

    document.querySelector("style").insertAdjacentHTML("beforeend", "*{transition:all 0.3s ease}");

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "FrontAboutJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
