const ContentsSampleData = {
  /**
   * 콘텐츠 ID - 콘텐츠의 고유 식별자
   * @type {string}
   */
  "conid": "t2209_aa06s", 

  /**
   * 디자이너 ID - 콘텐츠를 담당한 디자이너의 고유 식별자
   * @type {string}
   */
  "desid": "d2104_aa02s",

  /**
   * 고객 ID - 콘텐츠와 연관된 고객의 고유 식별자
   * @type {string}
   */
  "cliid": "c2201_aa02s",

  /**
   * 프로젝트 ID - 해당 콘텐츠와 연결된 프로젝트의 고유 식별자
   * @type {string}
   */
  "proid": "p2201_aa04s",

  /**
   * 콘텐츠에 포함된 상세 정보
   * @type {Object}
   */
  "contents": {
    /**
     * 포트폴리오 정보 - 프로젝트의 포트폴리오에 대한 상세 정보
     * @type {Object}
     */
    "portfolio": {
      /**
       * 포트폴리오 ID - 포트폴리오의 고유 식별자
       * @type {string}
       */
      "pid": "p208",

      /**
       * 포트폴리오 생성 날짜
       * @type {Date}
       */
      "date": new Date("2022-09-28T07:25:37.802Z"),

      /**
       * 공간 정보 - 프로젝트의 공간에 대한 정보
       * @type {Object}
       */
      "spaceInfo": {
        /**
         * 공간 이름 - 해당 프로젝트의 공간 명칭
         * @type {string}
         */
        "space": "현대 성우아파트",

        /**
         * 공간 평수 - 해당 공간의 크기 (평 단위)
         * @type {number}
         */
        "pyeong": 25,

        /**
         * 지역 - 프로젝트가 진행된 지역
         * @type {string}
         */
        "region": "경기 용인시",

        /**
         * 방식 - 프로젝트의 진행 방식
         * @type {string}
         */
        "method": "아파트 홈스타일링",

        /**
         * 예산 - 프로젝트에 할당된 예산
         * @type {string}
         */
        "budget": "1,000만원"
      },

      /**
       * 포트폴리오 제목 - 포트폴리오의 주제와 부제
       * @type {Object}
       */
      "title": {
        /**
         * 메인 제목 - 포트폴리오의 주요 제목
         * @type {string}
         */
        "main": "보다 나 같은 공간으로, 현대 성우아파트 25py 홈스타일링",

        /**
         * 부제 - 포트폴리오의 부제목
         * @type {string}
         */
        "sub": "보다 나 같은 공간으로, 현대 성우아파트 홈스타일링"
      },

      /**
       * 색상 정보 - 포트폴리오에서 사용된 색상들
       * @type {Object}
       */
      "color": {
        /**
         * 메인 색상 - 프로젝트의 주요 색상
         * @type {string}
         */
        "main": "#ececec",

        /**
         * 서브 색상 - 프로젝트의 보조 색상
         * @type {string}
         */
        "sub": "#d3d2d0",

        /**
         * 제목 색상 - 포트폴리오 제목의 색상
         * @type {string}
         */
        "title": "#606060"
      },

      /**
       * 세부 정보 - 프로젝트의 자세한 정보
       * @type {Object}
       */
      "detailInfo": {
        /**
         * 포토 대지 - 포트폴리오에서 강조된 이미지 인덱스
         * @type {number[]}
         */
        "photodae": [3, 2],

        /**
         * 사진 순서 - 첫 번째 및 마지막 사진의 순서 정보
         * @type {Object}
         */
        "photosg": {
          "first": 1,
          "last": 16
        },

        /**
         * 슬라이드 이미지 - 슬라이드 쇼에 포함된 이미지 인덱스
         * @type {number[]}
         */
        "slide": [1, 2, 5, 6, 7, 8, 12, 15, 16],

        /**
         * 태그 - 프로젝트와 관련된 키워드 목록
         * @type {string[]}
         */
        "tag": [
          "공간으로", "리모델링", "상황이라", "기본적인", "재택근무", "거실에서",
          "하셔서", "작업실", "거실로", "빼내어", "작업실로", "활용하고", "드레스룸",
          "미니서재로", "목적인", "프로젝트였습니다선호하시", "스타일로", "보아도", "있었듯",
          "화이트", "그레이로", "모노톤", "모던한", "분위기", "추천드릴", "때에도", "유념하여",
          "선정할", "우드톤", "가구들도", "있었기", "all", "현대 성우아파트", "25평",
          "20평형", "경기 용인시", "현대", "성우아파트", "경기", "용인시", "홈퍼니싱",
          "보다", "나", "같은", "공간으로,", "현대", "성우아파트", "25py", "홈스타일링"
        ],

        /**
         * 서비스 유형 - 해당 프로젝트에서 제공된 서비스 종류
         * @type {string}
         */
        "service": "홈스타일링",

        /**
         * 분류 키 - 프로젝트 분류를 위한 내부 키 값
         * @type {Object}
         */
        "sort": {
          "key8": "690",
          "key9": "220918"
        },

        /**
         * 성향 - 프로젝트의 스타일, 텍스처, 색상, 밀도 등의 성향 정보
         * @type {Object}
         */
        "tendency": {
          "style": {
            "modern": 8,
            "classic": 1,
            "natural": 6,
            "mixmatch": 3,
            "scandinavian": 6,
            "vintage": 4,
            "oriental": 3,
            "exotic": 2
          },
          "texture": {
            "darkWood": 4,
            "whiteWood": 7,
            "coating": 9,
            "metal": 8
          },
          "color": {
            "darkWood": 4,
            "whiteWood": 8,
            "highContrast": 10,
            "vivid": 5,
            "white": 10,
            "mono": 3,
            "bright": 8,
            "dark": 5
          },
          "density": {
            "maximun": 3,
            "minimum": 7
          }
        }
      },

      /**
       * 포트폴리오 콘텐츠 - 세부 설명과 이미지들
       * @type {Object}
       */
      "contents": {
        /**
         * 제안 - 디자이너의 제안 설명
         * @type {string}
         */
        "suggestion": "Designer's\nSuggestion",

        /**
         * 세부 내용 - 각 방의 디자인 설명과 관련 사진 인덱스
         * @type {Object[]}
         */
        "detail": [
          {
            "title": "init",
            "contents": "고객님의 집은 두 자매가 함께 지내는 공간으로, 3년 전에 리모델링을 하신 상황이라 기본적인 배경과 톤은 마음에 드시는 상황이었어요. 하지만 두 분 모두 재택근무를 하시는 상황이라 거의 모든 것을 거실에서 하셔서 방 안에 있던 작업실 가구를 거실로 빼내어, 거실을 작업실로 활용하고, 각각 방의 용도 변경을 원하셨습니다. 기존 거실을 작업실로, 기존 드레스룸을 작업 공방 겸 미니서재로, 기존 작업실을 드레스룸으로 용도 변경이 주 목적인 프로젝트였습니다.\n\n선호하시는 스타일로는 기본 톤을 보아도 알 수 있었듯이, 블랙 앤 화이트 앤 그레이로 모노톤에 모던한 분위기를 선호하셨습니다. 가구를 추천드릴 때에도 이 점을 유념하여 선정할 수 있도록 하였고, 기존의 우드톤 가구들도 있었기 때문에, 기존 가구와 새 가구의 조화를 유의하였습니다.",
            "photo": []
          },
          {
            "title": "livingroom",
            "contents": "거실은 두 자매의 작업실로 변경하여 모노톤의 분위기를 유지하면서, 트렌디한 무드를 살리려고 했습니다. 우선, 거실의 창가 쪽에 두 분의 작업공간이 될 컴퓨터 책상을 마주 보도록 두고 패브릭 파티션을 두어 깔끔한 작업 공간으로 만들어드렸습니다. 책상 반대편으로는 작업실의 휴게 공간과 같은 느낌으로 작은 소파와 유리 테이블을 두어 간단한 식사와 휴식을 취할 수 있는 공간으로 구성하였고, 러그 및 액자로 포인트를 주었습니다. 반대쪽 tv장은 화이트 금속 가구로 깔끔함을 강조하고, 트렌디한 조명들로 마무리하였습니다. 또, 기존의 커튼 대신 화이트 우드 블라인드로 좀 더 작업 공간의 완성도를 높였습니다.",
            "photo": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          {
            "title": "kitchen",
            "contents": "주방은 다이닝 테이블 없이 기존에도 홈바 형태로 사용 중이셨는데, 다소 낡고 어수선하여 보다 밝은 느낌을 줄 수 있는 작업실의 탕비 공간 컨셉으로, 화이트 홈바를 제안드렸습니다. ㄱ자 형태의 홈바로 구성하여, 키 큰장에는 커피바로 활용하고, 아일랜드장에는 간단한 간식과 지저분한 수납을 깔끔하게 할 수 있도록 하였고, 밝고 경쾌한 분위기의 액자와 펜던트 조명을 교체하였습니다.",
            "photo": [
              6,
              7
            ]
          },
          {
            "title": "bedroom",
            "contents": "침실에 슈퍼 싱글 2대를 사용 중이셨는데, 이 부분은 유지할 가구라고 하셔서 그대로 활용하되, 가구의 배치를 달리하여 좀 더 공간을 확보할 수 있도록 하였고, 전체 공간과 침대의 톤과 마감재가 다르기 때문에, 모노톤 체크 베딩과 액자로 전체적인 흐름과 연결될 수 있도록 하였습니다. 침대 맞은편으로는 기존 거실에 사용 중이셨던 수납장을 두고, 수납장 위로 모던한 느낌의 거울을 두어 화장대 공간으로 활용하였고, 기존 블라인드는 그레이 암막 커튼으로 교체하여 좀 더 포근한 공간으로 제안드렸습니다.",
            "photo": [
              8,
              9,
              10,
              11
            ]
          },
          {
            "title": "workroom",
            "contents": "기존 드레스룸 공간을 소소한 작업을 할 수 있는 공방 겸 미니 서재 느낌으로 변경하길 원하셨습니다. 모든 가구를 다 교체할 수 없는 상황이라, 4인 테이블을 제외하고는 기존 가구를 활용하였습니다. tv장과 수납장 등은 기존 가구를 활용하고, 기존 거실에 있던 피아노와 파티션 역시 이 방으로 옮겨 고객님의 취향과 취미가 묻어나는 공간이 되었습니다. 화이트 테이블 옆 벽면에는 블랙 컬러의 타공판을 추천드려 소품과 작업에 필요한 도구를 거치할 수 있도록 해드렸고, 이 공간 역시 화이트 우드 블라인드로 좁은 방을 보다 넓어 보이고 환해 보일 수 있도록 제안드렸습니다.",
            "photo": [
              12,
              13,
              14
            ]
          },
          {
            "title": "dressroom",
            "contents": "이 방은 기존에 메인 작업실 공간으로 사용 중이셨던 공간인데, 드레스룸 공간으로 변경하셨습니다. 기존 드레스룸 가구가 낡지 않은 상태라 그대로 사이즈에 맞춰 배치하여 옮길 것을 제안드렸고, 추가로 모던한 느낌의 원형 러그와 화이트 블라인드 교체를 통하여 깔끔한 분위기를 강조하였습니다. 획일된 공간의 쓰임보다 각 공간마다 용도 변경을 통하여 보다 나 같고 내가 편한 공간으로 탈바꿈시킨 고객님에게 많은 것을 배운 현장이었습니다 :)",
            "photo": [
              15,
              16
            ]
          }
        ]
      }
    },

    /**
     * 리뷰 정보 - 프로젝트에 대한 고객의 후기 정보
     * @type {Object}
     */
    "review": {
      /**
       * 리뷰 ID - 리뷰의 고유 식별자
       * @type {string}
       */
      "rid": "re202",

      /**
       * 리뷰 날짜 - 리뷰 작성 날짜
       * @type {Date}
       */
      "date": new Date("2022-09-28T07:25:37.802Z"),

      /**
       * 리뷰 제목 - 리뷰의 제목과 부제
       * @type {Object}
       */
      "title": {
        "main": "상담이라도 받아보자는, 마음에 시작해봤어요.",
        "sub": "상담이라도, 받아보자!"
      },

      /**
       * 리뷰 세부 정보 - 리뷰와 관련된 이미지 및 순서 정보
       * @type {Object}
       */
      "detailInfo": {
        "photodae": [9, 8],
        "order": 570
      },

      /**
       * 리뷰 콘텐츠 - 리뷰 내용 및 이미지들
       * @type {Object[]}
       */
      "contents": {
        "detail": [
          {
            "type": "init",
            "photos": [],
            "contents": [
              {
                "question": "",
                "answer": "아지트? 사무실? 알쏭달쏭 독특한 공간 용도가 매력적인 집을 소개합니다. 집이란 사용자가 한정된 공간이므로 주인의 생활양식에 맞게 목적을 두면 가장 효율적이고 독창적인 디자인의 인테리어를 완성할 수 있어요. 오늘의 연년생 자매 고객님들도 이 부분에 가장 집중하셨어요. 우리 집을 꾸밀 때에 남의 눈치 보지 마세요! 진정 나에게 맞는 것을 찾아보세요 :)"
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              8
            ],
            "contents": [
              {
                "question": "홈리에종을 알게 된 경로가 궁금해요.",
                "answer": "홈리에종 사업 초기부터 알고 있었어요. 여기 이사 준비를 하면서부터 봤거든요. 당시에는 홈스타일링이라는 키워드를 검색하면 큰 업체는 홈리에종 뿐이었어요. 하지만 그때는 저희가 리모델링 자금이 부족해서 조금이라도 아껴야 했어요. 또 홈리에종이 초창기에는 으리으리한 대형 주택 위주로 포트폴리오를 가지고 있었거든요. 저희와 같은 20평대도 진행이 가능할 거라고 생각을 못 해서 포기했어요.\n\n그런데 시공만 힘쓰고 가구들의 구색이 안 맞추어진 채로 살다 보니까 도저히 생활이 안 되는 거예요. 저희가 원룸에서 이사했던 상황이라 어차피 대부분 구매했어야 하는데, 그때 같이 맡길 걸 후회도 했고요. 생각이 나서 다시 왔는데 그 사이에 포트폴리오가 엄청 많이 다양하게 쌓였더라고요. “상담이라도 받아보자!”라는 생각으로 찾아왔어요."
              },
              {
                "question": "공간 기획이 특별한데요! 어떤 라이프 스타일을 가진 고객님이신가요?",
                "answer": "저희는 게임 회사에 다녀요. 어쩌다 자매가 같은 회사에 다니고 있어요. 재택 이전에는 출퇴근도 같이 하고, 같이 살고 정말 많이 붙어 있어요. 직무는 게임에 들어가는 그림들을 그리고요. 동생이 저한테 그림을 배운 케이스라서, 처음에는 스타일이 비슷했다가 사람이 다르다 보니까 점점 자기 것이 생기더라고요. 비슷한데 다른 자매입니다."
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              9,
              10,
              11
            ],
            "contents": [
              {
                "question": "두 분도 디자이너이시군요. 인테리어 디자이너를 선택할 때에 예리하게 보신 점이 있다면?",
                "answer": "(언니) 3D 모델링으로 결과물을 보여주실 수 있는 분을 원했어요. 저희도 나름대로 도면 위에 작업해 보고 이리저리 힘써서 바꿔도 보다가 도저히 답이 안 나와서 전문가를 찾은 상황이었기 때문에 확실하게 예상되는 결과치를 알아야 바꿀 마음이 들고 실행단계로 넘어갈 수 있을 것 같았어요. 그래서 3D가 가능한 디자이너님이라면 무조건 콜! 하는 마음이 있었습니다. 결과적으로 저희도 디자이너이지만 놀라운 정도로 시안과 똑같이 구현이 되었어요.\n\n(동생) 저희 집이 시공 베이스도 공간 기획도 특별한 점이 있잖아요. 3년 전에 시공을 다른 인테리어 업체랑 했을 때에도, 보통은 평이하게 선호도 높은 스타일을 많이 하시다 보니까, 저희가 “바닥은 까맣게 해주세요. 벽은 하얗게 해주세요. 사무실처럼 전자 기기들이 많이 들어가야 하니까 전선을 어떻게 해주세요.” 하면, 저희를 말리거나 감을 잘 못 잡으시더라고요. 그런데 왠지 호지희 디자이너님은 해주실 것 같은 느낌이 들어가지고요. 당시에 시안이 적으셨지만, 고객님이 원하는 것을 반영해 드린 느낌이 있었어요."
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              1,
              2,
              3,
              4,
              5
            ],
            "contents": [
              {
                "question": "오로지 두 분만을 위한 공간이네요.",
                "answer": "디자이너님이 니즈를 잘 캐치하고 반영해 주셔서 가능했어요. 사실 좁은 거실에 TV도 있고 게임기도 많은데 책상까지 두 개를 배치하는 것이 쉬운 일이 아니에요. 게다가 “소파도 넣어주세요~ 거기서 밥도 먹어야 하니까 테이블도 넣어주세요~” 이러니까, 아마 디자이너님이 속으로 당황하셨을 수도 있어요. 좁은 곳에 다 넣고자 하니까 어려운 작업이었을 텐데 적극적으로 해주셨어요. 특히 거실장은 세 네 번 정도 디벨롭했거든요. 그런데 그때마다 새로운, 더 좋은 방안을 제안해 주셨어요."
              },
              {
                "question": "가장 마음에 드는 공간은 어디인가요?",
                "answer": "거실이죠! 다른 공간도 마음에 들지만, 어떤 분이 하셨어도 잘 해주셨을 수도 있어요. 흔한 용도이니까요. 그런데 거실은 정말 저희가 원했던 모든 기능이 들어가면서, 까다로운 저희 언니가 만족했을 정도이고요. 밀도가 정말 높은데 지내보면 동선이 불편하거나 공간감이 답답하지도 않아요."
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              7,
              8
            ],
            "contents": [
              {
                "question": "거주 중 진행에 대한 tip을 공유해 주세요!",
                "answer": "(언니) 동생이 홈스타일링을 하자고 했을 때 저는 귀찮다고 회의적이었어요. 이사를 다닐 때마다 싫고 힘들었던 기억이 있어요. 이제는 자가로 정착해서 편히 지내고 있었으니까, 나는 손도 하나 까딱 안 할 거고 네가 알아서 하라며 시작했어요. 하다 보니까 저도 협조를 할 수밖에 없더라고요. 대신 저희는 에너지를 줄이려고 돈을 썼습니다. 돈을 조금만 더 쓰면 우리 몸이 편하다 생각해서 정리 수납도 업체를 부르고, 가구 옮겨주는 용역도 불렀어요. 그런데 역시 뭐든지 전문가가 좋아요. 단순히 가구를 옮겨주신 게 아니라 수평도 딱 딱 맞춰서 조립해 주시고, 정리 수납도 받고 나니 감탄이 나오더라고요. 거주 중에도 해결할 수 있는 방안들이 다 존재해요.\n\n(동생) 현실의 제약이 있더라도, 열린 마음으로 제안을 받아보시면 더 좋은 경험을 하실 수 있을 거예요. 저희도 워낙 큰 가구가 많았잖아요. 기존 제품을 살리거나 큰 이동을 줄이는 것을 최우선으로 요청드리면, 디자이너님이 구상하시기에 제약이 많으신 것 같은 거예요. 사실 원하는 대로 바꾸려면 폐기 비용도 들어가고, 또 사는 비용도 들어가니까 고려를 안 할 수는 없지만요. 경우에 따라 약간 더 수용해 보자는 열린 마음이요! 저희는 디자이너님께 중간에 의사를 확실히 말씀드렸어요. “가구 버리고 옮기는 거는 저희가 어떻게든 해볼 테니까 자유롭게 작업해 주세요.”했는데 확 달랐어요."
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              12,
              13,
              14
            ],
            "contents": [
              {
                "question": "초대하셨던 손님들 반응이 어떤가요?",
                "answer": "지금 인터뷰하고 있는 이 방은 놀려고 만든 아지트예요. 이미 친구들이 놀러 왔었고요! 올 때마다 너무 부러워하고 즐겁게 놀고 가요. 주변에 엄청 자랑하고 있어요."
              }
            ]
          },
          {
            "type": "contents",
            "photos": [
              15,
              16
            ],
            "contents": [
              {
                "question": "마지막 소감 부탁드려요.",
                "answer": "솔직히 저희는 강한 의지로 진행했지만, 어떤 분들은 관심이 있다가도 현실적으로 어렵다고 판단하고 포기하는 일이 꽤 많을 것 같아요. 하지만 살면서 계속 불편하고 답이 안 나와서 진짜 필요하다고 느끼시는 분들은 과감히 진행해 보세요. 일단 상담부터 해보세요. 저희 케이스가 좋은 선례가 되면 좋겠네요. 저 너무 마음에 들어요. 강력하게 만족합니다."
              }
            ]
          }
        ]
      }
    }
  },

  /**
   * 사진 정보 - 콘텐츠에 포함된 사진들에 대한 정보
   * @type {Object}
   */
  "photos": {
    "first": 1,
    "last": 16,
    "detail": [
      {
        "index": 1,
        "gs": "g"
      },
      {
        "index": 2,
        "gs": "g"
      },
      {
        "index": 3,
        "gs": "s"
      },
      {
        "index": 4,
        "gs": "s"
      },
      {
        "index": 5,
        "gs": "g"
      },
      {
        "index": 6,
        "gs": "g"
      },
      {
        "index": 7,
        "gs": "g"
      },
      {
        "index": 8,
        "gs": "g"
      },
      {
        "index": 9,
        "gs": "s"
      },
      {
        "index": 10,
        "gs": "s"
      },
      {
        "index": 11,
        "gs": "g"
      },
      {
        "index": 12,
        "gs": "g"
      },
      {
        "index": 13,
        "gs": "s"
      },
      {
        "index": 14,
        "gs": "s"
      },
      {
        "index": 15,
        "gs": "g"
      },
      {
        "index": 16,
        "gs": "g"
      }
    ]
  },

  /**
   * 서비스 정보 - 해당 콘텐츠와 관련된 서비스 정보
   * @type {Object}
   */
  "service": {
    "serid": "s2011_aa01s",
    "xValue": "B",
    "online": false
  }
}

/**
 * @description 홈리에종에서 발행한 인테리어 프로젝트 웹 콘텐츠의 스키마와 기본값을 정의하는 JSON 생성기 함수.
 * 이 함수는 프로젝트 콘텐츠에 대한 기본 구조와 데이터 형식을 제공합니다.
 */
const ContentsMap = {
  /**
   * 메인 콘텐츠 구조를 정의하는 함수.
   * @returns {Object} 기본 콘텐츠 구조를 담고 있는 객체를 반환합니다.
   */
  main: function () {
    let dummy;
    dummy = {
      structure: {
        conid: "", // 콘텐츠 ID, 해당 콘텐츠를 고유하게 식별하는 문자열.
        desid: "", // 디자인 ID, 해당 디자인을 고유하게 식별하는 문자열.
        cliid: "", // 클라이언트 ID, 클라이언트를 고유하게 식별하는 문자열.
        proid: "", // 프로젝트 ID, 해당 프로젝트를 고유하게 식별하는 문자열.
        contents: {
          portfolio: {
            pid: "", // 포트폴리오 ID, 포트폴리오를 고유하게 식별하는 문자열.
            date: new Date(1800, 0, 1), // 포트폴리오 생성 날짜, 기본값은 1800년 1월 1일.
            spaceInfo: {
              space: "", // 공간 이름 (예: 아파트 이름).
              pyeong: 0, // 평수, 기본값은 0.
              region: "", // 지역 정보 (예: 서울시 강남구).
              method: "", // 리모델링 또는 홈스타일링 방법 (예: 홈스타일링).
              budget: "3,000만원", // 예산, 기본값은 "3,000만원".
            },
            title: {
              main: "", // 메인 제목, 콘텐츠의 주제 또는 주요 제목.
              sub: "", // 서브 제목, 추가적인 설명 또는 보조 제목.
            },
            color: {
              main: "", // 메인 색상 코드 (예: "#FFFFFF").
              sub: "", // 서브 색상 코드 (예: "#CCCCCC").
              title: "", // 제목 색상 코드 (예: "#000000").
            },
            detailInfo: {
              photodae: [], // 포토데이 정보를 담은 배열.
              photosg: {
                first: 0, // 첫 번째 사진의 인덱스, 기본값은 0.
                last: 0, // 마지막 사진의 인덱스, 기본값은 0.
              },
              slide: [], // 슬라이드쇼에 포함될 사진 인덱스 배열.
              tag: [], // 태그 목록 배열, 검색 또는 분류를 위한 키워드.
              service: "", // 제공된 서비스의 유형 (예: "홈스타일링").
              sort: {
                key8: 0, // 정렬을 위한 키 8, 기본값은 0.
                key9: 0, // 정렬을 위한 키 9, 기본값은 0.
              },
              tendency: {
                style: {
                  modern: 0, // 스타일 경향: 모던, 기본값은 0.
                  classic: 0, // 스타일 경향: 클래식, 기본값은 0.
                  natural: 0, // 스타일 경향: 내추럴, 기본값은 0.
                  mixmatch: 0, // 스타일 경향: 믹스매치, 기본값은 0.
                  scandinavian: 0, // 스타일 경향: 스칸디나비아, 기본값은 0.
                  vintage: 0, // 스타일 경향: 빈티지, 기본값은 0.
                  oriental: 0, // 스타일 경향: 오리엔탈, 기본값은 0.
                  exotic: 0, // 스타일 경향: 이국적, 기본값은 0.
                },
                texture: {
                  darkWood: 0, // 텍스처 경향: 다크 우드, 기본값은 0.
                  whiteWood: 0, // 텍스처 경향: 화이트 우드, 기본값은 0.
                  coating: 0, // 텍스처 경향: 코팅, 기본값은 0.
                  metal: 0, // 텍스처 경향: 메탈, 기본값은 0.
                },
                color: {
                  darkWood: 0, // 색상 경향: 다크 우드, 기본값은 0.
                  whiteWood: 0, // 색상 경향: 화이트 우드, 기본값은 0.
                  highContrast: 0, // 색상 경향: 높은 대비, 기본값은 0.
                  vivid: 0, // 색상 경향: 비비드, 기본값은 0.
                  white: 0, // 색상 경향: 화이트, 기본값은 0.
                  mono: 0, // 색상 경향: 모노, 기본값은 0.
                  bright: 0, // 색상 경향: 밝은 색, 기본값은 0.
                  dark: 0, // 색상 경향: 어두운 색, 기본값은 0.
                },
                density: {
                  maximun: 0, // 밀도 경향: 최대, 기본값은 0.
                  minimum: 0, // 밀도 경향: 최소, 기본값은 0.
                }
              },
            },
            contents: {
              suggestion: "Designer's\nSuggestion", // 디자이너의 제안, 기본값은 "Designer's Suggestion".
              detail: [], // 세부 내용 배열, 각 내용은 객체 형태로 구성.
            }
          },
          review: {
            rid: "", // 리뷰 ID, 해당 리뷰를 고유하게 식별하는 문자열.
            date: new Date(1800, 0, 1), // 리뷰 작성 날짜, 기본값은 1800년 1월 1일.
            title: {
              main: "", // 리뷰의 메인 제목.
              sub: "", // 리뷰의 서브 제목.
            },
            detailInfo: {
              photodae: [], // 포토데이 정보 배열.
              order: 0, // 정렬 순서, 기본값은 0.
            },
            contents: {
              detail: [], // 리뷰 내용 배열, 각 내용은 객체 형태로 구성.
            }
          }
        },
        photos: {
          first: 0, // 첫 번째 사진의 인덱스, 기본값은 0.
          last: 0, // 마지막 사진의 인덱스, 기본값은 0.
          detail: [], // 사진 세부 정보 배열, 각 사진은 객체 형태로 구성.
        },
        service: {
          serid: "s2011_aa02s", // 서비스 ID, 기본값은 "s2011_aa02s".
          xValue: "B", // 서비스 레벨 또는 유형, 기본값은 "B".
          online: false, // 온라인 여부, 기본값은 false (오프라인).
        },
      }
    };
    return dummy; // 기본 구조가 설정된 객체를 반환.
  },

  /**
   * 주어진 주제에 따라 서브 콘텐츠 구조를 정의하는 함수.
   * @param {string} subject - 서브 콘텐츠의 주제 (예: "contents.portfolio.contents.detail").
   * @returns {Object|null} 주제에 맞는 기본 서브 콘텐츠 구조를 반환. 주제가 없으면 null 반환.
   */
  sub: function (subject) {
    let dummy = null;
    if (subject === "contents.portfolio.contents.detail") {
      dummy = {
        photo: [], // 사진 배열, 해당 포트폴리오 내용에 포함될 사진.
        title: "", // 세부 내용의 제목.
        contents: "", // 세부 내용의 본문.
      };
    } else if (subject === "contents.review.contents.detail") {
      dummy = {
        type: "", // 리뷰 콘텐츠 유형.
        photos: [], // 사진 배열, 리뷰에 포함될 사진.
        contents: [
          {
            question: "", // Q&A 형식의 질문.
            answer: "", // Q&A 형식의 답변.
          }
        ]
      };
    } else if (subject === "photos.detail") {
      dummy = { index: 0, gs: 'g' }; // 사진의 인덱스와 그레이드 정보, 기본값으로 인덱스 0, 그레이드 "g".
    }
    return dummy; // 서브 콘텐츠 구조가 설정된 객체를 반환.
  }
}

/**
 * @class DateParse
 * Date 클래스를 확장하여 날짜 처리 기능을 제공하는 클래스입니다.
 * 문자열 형식의 날짜를 Date 객체로 변환하거나, Date 객체를 다양한 형식으로 변환할 수 있습니다.
 */
class DateParse extends Date {

  /**
   * @constructor
   * 주어진 dateObject를 Date 객체로 변환하여 초기화합니다.
   * 문자열 형식의 날짜가 주어진 경우, 해당 문자열을 분석하여 Date 객체로 변환합니다.
   * @param {string|Date} dateObject - 변환할 날짜 문자열 또는 Date 객체
   * @throws {Error} 유효하지 않은 날짜 형식이 주어진 경우 예외를 발생시킵니다.
   */
  constructor(dateObject) {
    // 임시 배열 변수를 선언합니다.
    let tempArr0, tempArr1, tempArr2;

    // dateObject가 문자열인 경우
    if (typeof dateObject === "string") {
      // 날짜 문자열이 "YYYY-MM-DD HH:MM:SS" 형식인 경우
      if (dateObject.length === 19) {
        // 날짜와 시간을 분리하여 tempArr0에 저장합니다.
        tempArr0 = dateObject.split(" ");
        // 날짜 부분을 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = tempArr0[0].split("-");
        // 시간 부분을 ":"로 분리하여 tempArr2에 저장합니다.
        tempArr2 = tempArr0[1].split(":");
        // 분리된 연, 월, 일, 시, 분, 초 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2]), 
          Number(tempArr2[0]), 
          Number(tempArr2[1]), 
          Number(tempArr2[2])
        ));
      } 
      // 날짜 문자열이 "YYYY-MM-DD" 형식인 경우
      else if (dateObject.length === 10) {
        // 날짜를 "-"로 분리하여 tempArr1에 저장합니다.
        tempArr1 = dateObject.split("-");
        // 분리된 연, 월, 일 정보를 이용해 Date 객체를 생성하고, 상위 클래스(Date)의 생성자를 호출합니다.
        super(new Date(
          Number(tempArr1[0]), 
          Number(tempArr1[1]) - 1, 
          Number(tempArr1[2])
        ));
      } 
      // 유효하지 않은 날짜 형식인 경우
      else {
        // 예외를 발생시킵니다.
        throw new Error("invalid date object");
      }
    } 
    // dateObject가 문자열이 아닌 경우
    else {
      // dateObject를 ISO 문자열로 변환한 후 Date 객체로 초기화합니다.
      super(dateObject.toISOString());
    }
  }

  /**
   * @method zeroAddition
   * 숫자가 10보다 작은 경우 앞에 0을 추가하여 2자리 문자열로 반환합니다.
   * @param {number} number - 2자리로 변환할 숫자
   * @returns {string} 2자리 숫자 문자열
   */
  static zeroAddition(number) {
    // 숫자가 10보다 큰 경우 그대로 문자열로 반환합니다.
    if (number > 9) {
      return String(number);
    } 
    // 숫자가 10보다 작은 경우 앞에 0을 추가하여 문자열로 반환합니다.
    else {
      return '0' + String(number);
    }
  }

  /**
   * @method toString
   * Date 객체를 "YYYY-MM-DD" 또는 "YYYY-MM-DD HH:MM:SS" 형식의 문자열로 변환합니다.
   * @param {boolean} [detail=false] - 시간 정보까지 포함할지 여부
   * @returns {string} 변환된 날짜 문자열
   */
  toString(detail = false) {
    // 연도, 월, 일, 시, 분, 초 정보를 각각 추출합니다.
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();

    // detail이 true인 경우 "YYYY-MM-DD HH:MM:SS" 형식으로 변환합니다.
    if (detail) {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일, 시, 분, 초를 모두 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day) + " " + 
          DateParse.zeroAddition(hours) + ":" + 
          DateParse.zeroAddition(minutes) + ":" + 
          DateParse.zeroAddition(seconds)
        );
      }
    } 
    // detail이 false인 경우 "YYYY-MM-DD" 형식으로 변환합니다.
    else {
      // 연도가 1800년인 경우 "1800-01-01"로 반환합니다.
      if (year === 1800) {
        return "1800-01-01";
      } 
      // 그렇지 않으면 연, 월, 일만 포함한 문자열을 반환합니다.
      else {
        return (
          DateParse.zeroAddition(year) + "-" + 
          DateParse.zeroAddition(month) + "-" + 
          DateParse.zeroAddition(day)
        );
      }
    }
  }

  /**
   * @method toNormal
   * DateParse 객체를 일반 Date 객체로 변환합니다.
   * @returns {Date} 변환된 Date 객체
   */
  toNormal() {
    // 현재 객체의 ISO 문자열 표현을 사용하여 새로운 Date 객체를 반환합니다.
    return new Date(this.toISOString());
  }

  /**
   * @method toSixString
   * Date 객체를 "YYMMDD" 형식의 6자리 문자열로 변환합니다.
   * @returns {string} 변환된 6자리 날짜 문자열
   */
  toSixString() {
    // 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환한 후, 앞 두 자리를 제외한 "YYMMDD" 형식으로 잘라서 반환합니다.
    let date = this.toString(false);
    return (date.slice(2, 4) + date.slice(5, 7) + date.slice(8, 10));
  }

}

/**
 * @class Menu
 * @extends String
 * @description 주어진 값들 중 하나 또는 여러 개를 선택하여 관리하는 클래스입니다. Enum과 유사한 역할을 하며, 단일 선택 또는 다중 선택 모드를 지원합니다.
 */
class Menu extends String {

  /**
   * @constructor
   * @param {string|string[]} value - 초기 값 또는 값들의 배열입니다.
   * @param {string[]} items - 선택 가능한 값들의 배열입니다.
   * @param {boolean} [multiple=false] - 다중 선택 모드 여부를 지정합니다. 기본값은 false입니다.
   * @description 주어진 값이 유효한지 검사하고, 유효하다면 해당 값을 설정합니다. 다중 선택 모드인 경우, 유효한 값들만 필터링하여 저장합니다.
   */
  constructor(value, items, multiple = false) {
    // value가 배열인 경우 빈 문자열로 초기화하고, 그렇지 않으면 해당 값을 상위 클래스(String)로 전달하여 초기화합니다.
    if (Array.isArray(value)) {
      super(''); // 다중 선택 모드에서 상위 클래스(String)를 빈 문자열로 초기화합니다.
    } else {
      super(value); // 단일 선택 모드에서 상위 클래스(String)를 주어진 값으로 초기화합니다.
    }

    this.value = null; // 단일 선택된 값을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.values = null; // 다중 선택된 값들을 저장하기 위한 속성입니다. 초기값은 null입니다.
    this.items = items; // 선택 가능한 값들의 목록을 items 속성에 저장합니다.

    let temp; // 임시 배열을 선언합니다. 다중 선택 모드에서 사용됩니다.

    // 단일 선택 모드인 경우
    if (!multiple) {
      // 주어진 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
      if (items.includes(value)) {
        this.value = value; // 포함되어 있다면 해당 값을 value 속성에 저장합니다.
      } else {
        this.value = "알 수 없음"; // 포함되어 있지 않다면 "알 수 없음"을 value 속성에 저장합니다.
      }
    }
    // 다중 선택 모드인 경우
    else {
      temp = []; // 임시 배열을 빈 배열로 초기화합니다.
      for (let i of value) { // 주어진 값 배열에서 각 값을 반복합니다.
        if (items.includes(i)) { // 각 값이 선택 가능한 값 목록에 포함되어 있는지 확인합니다.
          temp.push(i); // 포함되어 있다면 임시 배열에 추가합니다.
        }
      }
      this.values = temp; // 필터링된 값을 values 속성에 저장합니다.
    }
  }

  /**
   * @method toNormal
   * @description 현재 선택된 값을 반환합니다. 단일 선택 모드인 경우 단일 값을 반환하고, 다중 선택 모드인 경우 선택된 값들의 배열을 반환합니다.
   * @returns {string|string[]} 선택된 값 또는 값들의 배열을 반환합니다.
   */
  toNormal() {
    if (this.values === null) { // 다중 선택된 값이 없는 경우 (단일 선택 모드)
      return this.value; // 단일 값을 반환합니다.
    } else {
      return this.values; // 다중 선택된 값들의 배열을 반환합니다.
    }
  }
  
}

/**
 * Contents 클래스는 홈리에종에서 발행한 인테리어 프로젝트 웹 콘텐츠 데이터를 다루는 클래스입니다.
 * 이 클래스는 JSON 데이터를 기반으로 객체를 생성하고, 다양한 속성 및 메서드를 통해 데이터에 접근하고 조작할 수 있도록 구성되어 있습니다.
 */
class Contents {
  /**
   * 생성자는 주어진 JSON 데이터를 기반으로 Contents 객체를 초기화합니다.
   * @param {Object} json - 콘텐츠 데이터를 담고 있는 JSON 객체
   */
  constructor(json) {
    /** @property {string} conid - 콘텐츠 ID */
    this.conid = json.conid;
    /** @property {string} desid - 디자이너 ID */
    this.desid = json.desid;
    /** @property {string} cliid - 클라이언트 ID */
    this.cliid = json.cliid;
    /** @property {string} proid - 프로젝트 ID */
    this.proid = json.proid;
    /** @property {Object} contents - 콘텐츠 상세 정보 */
    this.contents = new this.#ContentsTong(json.contents);
    /** @property {Object} photos - 사진 정보 */
    this.photos = new this.#PhotoTong(json.photos);
    /** @property {Object} service - 서비스 정보 */
    this.service = new this.#Service(json.service);
  }

  /**
   * #Service 클래스는 Contents 클래스 내부에서 사용되는 비공개(Private) 클래스입니다.
   * 서비스에 대한 정보를 처리하고, 이를 일반 객체 형태로 변환하는 메서드를 제공합니다.
   */
  #Service = class {
    /**
     * 생성자는 주어진 JSON 데이터를 기반으로 #Service 객체를 초기화합니다.
     * @param {Object} json - 서비스 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      /** @property {string} serid - 서비스 ID */
      this.serid = json.serid;
      /** @property {string} xValue - 서비스의 xValue 속성 */
      this.xValue = json.xValue;
      /** @property {boolean} online - 서비스의 온라인 여부 (Boolean으로 변환) */
      this.online = Boolean(json.online);
    }

    /**
     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
     * @returns {Object} 변환된 객체
     */
    toNormal() {
      /** 변환된 데이터를 저장할 빈 객체를 생성 */
      let obj = {};
      /** @property {string} obj.serid - 변환된 객체의 서비스 ID */
      obj.serid = this.serid;
      /** @property {string} obj.xValue - 변환된 객체의 xValue */
      obj.xValue = this.xValue;
      /** @property {boolean} obj.online - 변환된 객체의 온라인 여부 */
      obj.online = this.online;
      /** @returns {Object} 변환된 객체를 반환 */
      return obj;
    }
  }

  /**
   * #PhotoTong 클래스는 Contents 클래스 내부에서 사용되는 비공개(Private) 클래스입니다.
   * 프로젝트 내 사진들의 정보를 처리하고, 이를 일반 객체 형태로 변환하는 메서드를 제공합니다.
   */
  #PhotoTong = class {
    /**
     * 생성자는 주어진 JSON 데이터를 기반으로 #PhotoTong 객체를 초기화합니다.
     * @param {Object} json - 사진 관련 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
      /** @property {number} first - 첫 번째 사진의 인덱스 */
      this.first = json.first;
      /** @property {number} last - 마지막 사진의 인덱스 */
      this.last = json.last;

      // #PhotoDetails 클래스의 인스턴스를 생성하여 배열로 초기화
      let arr, temp;
      arr = new this.#PhotoDetails();
      
      // json.detail 배열의 각 항목을 #PhotoDetail 인스턴스로 변환하여 arr 배열에 추가
      for (let i of json.detail) {
        temp = new this.#PhotoDetail(i);
        arr.push(temp);
      }
      
      /** @property {Array} detail - 사진 상세 정보 객체들을 담고 있는 배열 */
      this.detail = arr;
    }

    /**
     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
     * @returns {Object} 변환된 객체
     */
    toNormal() {
      /** 변환된 데이터를 저장할 빈 객체를 생성 */
      let obj = {};
      /** @property {number} obj.first - 변환된 객체의 첫 번째 사진 인덱스 */
      obj.first = Number(this.first);
      /** @property {number} obj.last - 변환된 객체의 마지막 사진 인덱스 */
      obj.last = Number(this.last);
      /** @property {Array} obj.detail - 변환된 객체의 사진 상세 정보 배열 */
      obj.detail = this.detail.toNormal();
      
      /** @returns {Object} 변환된 객체를 반환 */
      return obj;
    }

    /**
     * #PhotoDetail 클래스는 각 사진의 세부 정보를 관리하는 비공개 클래스입니다.
     */
    #PhotoDetail = class {
      /**
       * 생성자는 주어진 JSON 데이터를 기반으로 #PhotoDetail 객체를 초기화합니다.
       * @param {Object} json - 사진 세부 정보를 담고 있는 JSON 객체
       */
      constructor(json) {
        /** @property {number} index - 사진의 인덱스 */
        this.index = json.index;
        /** @property {string} gs - 사진의 'gs' 속성 (예: 'g' 또는 's') */
        this.gs = json.gs;
      }
      
      /**
       * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
       * @returns {Object} 변환된 객체
       */
      toNormal() {
        /** 변환된 데이터를 저장할 빈 객체를 생성 */
        let obj = {};
        /** @property {number} obj.index - 변환된 객체의 사진 인덱스 */
        obj.index = Number(this.index);
        /** @property {string} obj.gs - 변환된 객체의 'gs' 속성 */
        obj.gs = this.gs;
        
        /** @returns {Object} 변환된 객체를 반환 */
        return obj;
      }
    }
    
    /**
     * #PhotoDetails 클래스는 여러 사진의 세부 정보를 관리하는 배열을 확장한 비공개 클래스입니다.
     * 이 클래스는 배열로 확장되어 배열의 기능을 유지하면서 추가적인 메서드를 제공합니다.
     */
    #PhotoDetails = class extends Array {
      /**
       * 배열에 포함된 모든 #PhotoDetail 객체를 일반적인 객체 형태로 변환하여 반환합니다.
       * @returns {Array} 변환된 객체들의 배열
       */
      toNormal() {
        /** 변환된 객체들을 저장할 배열을 생성 */
        let arr = [];
        // 배열의 각 요소를 toNormal 메서드를 통해 변환하여 arr 배열에 추가
        for (let i of this) {
          arr.push(i.toNormal());
        }
        
        /** @returns {Array} 변환된 객체들의 배열을 반환 */
        return arr;
      }
    }
  }

  /**
   * #ContentsTong 클래스는 Contents 클래스 내부에서 사용되는 비공개(Private) 클래스입니다.
   * 포트폴리오와 리뷰 관련 데이터를 처리하고, 이를 일반 객체 형태로 변환하는 메서드를 제공합니다.
   */
  #ContentsTong = class {
    /**
     * 생성자는 주어진 JSON 데이터를 기반으로 #ContentsTong 객체를 초기화합니다.
     * @param {Object} json - 포트폴리오와 리뷰 정보를 담고 있는 JSON 객체
     */
    constructor(json) {
        /** 
         * 포트폴리오 데이터를 관리하는 #Porfolio 클래스의 인스턴스를 생성합니다.
         * @property {Object} portfolio 
         */
        this.portfolio = new this.#Porfolio(json.portfolio);
        /** 
         * 리뷰 데이터를 관리하는 #Review 클래스의 인스턴스를 생성합니다.
         * @property {Object} review 
         */
        this.review = new this.#Review(json.review);
    }

    /**
     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
     * @returns {Object} 변환된 객체
     */
    toNormal() {
        let obj = {};
        /** 포트폴리오 데이터를 변환하여 일반 객체로 반환합니다. */
        obj.portfolio = this.portfolio.toNormal();
        /** 리뷰 데이터를 변환하여 일반 객체로 반환합니다. */
        obj.review = this.review.toNormal();
        return obj;
    }

    /**
     * #Review 클래스는 리뷰 데이터를 관리하는 비공개 클래스입니다.
     */
    #Review = class {
        /**
         * 생성자는 주어진 JSON 데이터를 기반으로 #Review 객체를 초기화합니다.
         * @param {Object} json - 리뷰 정보를 담고 있는 JSON 객체
         */
        constructor(json) {
            /** @property {string} rid - 리뷰 ID */
            this.rid = json.rid;
            /** @property {Object} date - 리뷰 작성 날짜를 관리하는 DateParse 객체 */
            this.date = new DateParse(json.date);
            /** @property {Object} title - 리뷰 제목을 관리하는 #Title 클래스의 인스턴스 */
            this.title = new this.#Title(json.title);
            /** @property {Object} detailInfo - 리뷰 상세 정보를 관리하는 #ReviewDetailInfo 클래스의 인스턴스 */
            this.detailInfo = new this.#ReviewDetailInfo(json.detailInfo);
            /** @property {Object} contents - 리뷰 내용을 관리하는 #ReviewContents 클래스의 인스턴스 */
            this.contents = new this.#ReviewContents(json.contents);
        }

        /**
         * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
         * @returns {Object} 변환된 객체
         */
        toNormal() {
            let obj = {};
            obj.rid = this.rid;
            obj.date = this.date.toNormal();
            obj.title = this.title.toNormal();
            obj.detailInfo = this.detailInfo.toNormal();
            obj.contents = this.contents.toNormal();
            return obj;
        }

        /**
         * #ReviewDetailInfo 클래스는 리뷰의 상세 정보를 관리하는 비공개 클래스입니다.
         */
        #ReviewDetailInfo = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #ReviewDetailInfo 객체를 초기화합니다.
             * @param {Object} json - 리뷰의 상세 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                let arr0 = new this.#Photodae();
                for (let i of json.photodae) {
                    arr0.push(i);
                }
                /** @property {Array} photodae - 사진 ID 목록을 저장하는 배열 */
                this.photodae = arr0;
                /** @property {number} order - 리뷰의 순서 */
                this.order = json.order;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.photodae = this.photodae.toNormal();
                obj.order = this.order;
                return obj;
            }

            /**
             * #Photodae 클래스는 사진 ID 목록을 관리하는 비공개 배열 확장 클래스입니다.
             */
            #Photodae = class extends Array {
                /**
                 * 배열에 포함된 모든 값을 그대로 반환합니다.
                 * @returns {Array} 변환된 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i);
                    }
                    return arr;
                }
            }
        }

        /**
         * #ReviewContents 클래스는 리뷰의 콘텐츠를 관리하는 비공개 클래스입니다.
         */
        #ReviewContents = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #ReviewContents 객체를 초기화합니다.
             * @param {Object} json - 리뷰의 콘텐츠 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                let arr = new this.#ReviewContentsDetails();
                for (let i of json.detail) {
                    let temp = new this.#ReviewContentsDetail(i);
                    arr.push(temp);
                }
                /** @property {Array} detail - 리뷰 세부 정보를 담은 배열 */
                this.detail = arr;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.detail = this.detail.toNormal();
                return obj;
            }

            /**
             * #ReviewContentsDetail 클래스는 리뷰의 각 세부 항목을 관리하는 비공개 클래스입니다.
             */
            #ReviewContentsDetail = class {
                /**
                 * 생성자는 주어진 JSON 데이터를 기반으로 #ReviewContentsDetail 객체를 초기화합니다.
                 * @param {Object} json - 리뷰 세부 항목 정보를 담고 있는 JSON 객체
                 */
                constructor(json) {
                    let arr0 = new this.#Photos();
                    let arr1 = new this.#QuestionAnswers();
                    for (let i of json.photos) {
                        arr0.push(i);
                    }
                    for (let i of json.contents) {
                        let temp = new this.#QuestionAnswer(i);
                        arr1.push(temp);
                    }
                    /** @property {string} type - 리뷰 세부 항목의 타입 */
                    this.type = json.type;
                    /** @property {Array} photos - 사진 ID 배열 */
                    this.photos = arr0;
                    /** @property {Array} contents - 질문과 답변을 담은 배열 */
                    this.contents = arr1;
                }

                /**
                 * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                 * @returns {Object} 변환된 객체
                 */
                toNormal() {
                    let obj = {};
                    obj.type = this.type;
                    obj.photos = this.photos.toNormal();
                    obj.contents = this.contents.toNormal();
                    return obj;
                }

                /**
                 * #QuestionAnswer 클래스는 리뷰 항목의 질문과 답변을 관리하는 비공개 클래스입니다.
                 */
                #QuestionAnswer = class {
                    /**
                     * 생성자는 주어진 JSON 데이터를 기반으로 #QuestionAnswer 객체를 초기화합니다.
                     * @param {Object} json - 질문과 답변 정보를 담고 있는 JSON 객체
                     */
                    constructor(json) {
                        /** @property {string} question - 질문 내용 */
                        this.question = json.question;
                        /** @property {string} answer - 답변 내용 */
                        this.answer = json.answer;
                    }

                    /**
                     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                     * @returns {Object} 변환된 객체
                     */
                    toNormal() {
                        let obj = {};
                        obj.question = this.question;
                        obj.answer = this.answer;
                        return obj;
                    }
                }

                /**
                 * #Photos 클래스는 사진 ID 배열을 관리하는 비공개 배열 확장 클래스입니다.
                 */
                #Photos = class extends Array {
                    /**
                     * 배열에 포함된 모든 값을 그대로 반환합니다.
                     * @returns {Array} 변환된 배열
                     */
                    toNormal() {
                        let arr = [];
                        for (let i of this) {
                            arr.push(i);
                        }
                        return arr;
                    }
                }

                /**
                 * #QuestionAnswers 클래스는 질문과 답변의 배열을 관리하는 비공개 배열 확장 클래스입니다.
                 */
                #QuestionAnswers = class extends Array {
                    /**
                     * 배열에 포함된 모든 #QuestionAnswer 객체를 일반적인 객체 형태로 변환하여 반환합니다.
                     * @returns {Array} 변환된 객체들의 배열
                     */
                    toNormal() {
                        let arr = [];
                        for (let i of this) {
                            arr.push(i.toNormal());
                        }
                        return arr;
                    }
                }
            }

            /**
             * #ReviewContentsDetails 클래스는 리뷰의 각 세부 항목을 관리하는 배열을 확장한 비공개 클래스입니다.
             */
            #ReviewContentsDetails = class extends Array {
                /**
                 * 배열에 포함된 모든 #ReviewContentsDetail 객체를 일반적인 객체 형태로 변환하여 반환합니다.
                 * @returns {Array} 변환된 객체들의 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i.toNormal());
                    }
                    return arr;
                }
            }
        }

        /**
         * #Title 클래스는 제목 정보를 관리하는 비공개 클래스입니다.
         */
        #Title = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #Title 객체를 초기화합니다.
             * @param {Object} json - 제목 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                /** @property {string} main - 메인 제목 */
                this.main = json.main;
                /** @property {string} sub - 서브 제목 */
                this.sub = json.sub;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.main = this.main;
                obj.sub = this.sub;
                return obj;
            }

            /**
             * 메인 및 서브 제목의 다양한 형태를 반환합니다.
             * @returns {Object} 제목의 다양한 케이스를 담은 객체
             */
            getAllCases() {
                let obj = {};
                obj.main = [];
                obj.main.push(this.main);
                obj.main.push(this.main.replace(/, /, "\n"));

                obj.sub = [];
                obj.sub.push(this.sub.replace(/, /, " "));
                obj.sub.push(this.sub.replace(/, /, "\n"));

                return obj;
            }
        }
    }

    /**
     * #Porfolio 클래스는 포트폴리오 데이터를 관리하는 비공개 클래스입니다.
     */
    #Porfolio = class {
        /**
         * 생성자는 주어진 JSON 데이터를 기반으로 #Porfolio 객체를 초기화합니다.
         * @param {Object} json - 포트폴리오 정보를 담고 있는 JSON 객체
         */
        constructor(json) {
            /** @property {string} pid - 포트폴리오 ID */
            this.pid = json.pid;
            /** @property {Object} date - 포트폴리오 날짜를 관리하는 DateParse 객체 */
            this.date = new DateParse(json.date);
            /** @property {Object} spaceInfo - 공간 정보를 관리하는 #SpaceInfo 클래스의 인스턴스 */
            this.spaceInfo = new this.#SpaceInfo(json.spaceInfo);
            /** @property {Object} title - 포트폴리오 제목을 관리하는 #Title 클래스의 인스턴스 */
            this.title = new this.#Title(json.title);
            /** @property {Object} color - 포트폴리오 색상 정보를 관리하는 #Color 클래스의 인스턴스 */
            this.color = new this.#Color(json.color);
            /** @property {Object} detailInfo - 포트폴리오 상세 정보를 관리하는 #PorfolioDetailInfo 클래스의 인스턴스 */
            this.detailInfo = new this.#PorfolioDetailInfo(json.detailInfo);
            /** @property {Object} contents - 포트폴리오 콘텐츠를 관리하는 #PorfolioContents 클래스의 인스턴스 */
            this.contents = new this.#PorfolioContents(json.contents);
        }

        /**
         * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
         * @returns {Object} 변환된 객체
         */
        toNormal() {
            let obj = {};
            obj.pid = this.pid;
            obj.date = this.date.toNormal();
            obj.spaceInfo = this.spaceInfo.toNormal();
            obj.title = this.title.toNormal();
            obj.color = this.color.toNormal();
            obj.detailInfo = this.detailInfo.toNormal();
            obj.contents = this.contents.toNormal();
            return obj;
        }

        /**
         * #PorfolioContents 클래스는 포트폴리오의 콘텐츠를 관리하는 비공개 클래스입니다.
         */
        #PorfolioContents = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #PorfolioContents 객체를 초기화합니다.
             * @param {Object} json - 포트폴리오의 콘텐츠 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                let temp;
                let arr = new this.#PorfolioContentsDetails();
                for (let i of json.detail) {
                    temp = new this.#PorfolioContentsDetail(i);
                    arr.push(temp);
                }
                /** @property {string} suggestion - 디자이너의 제안 내용 */
                this.suggestion = json.suggestion;
                /** @property {Array} detail - 포트폴리오 세부 정보를 담은 배열 */
                this.detail = arr;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.suggestion = this.suggestion;
                obj.detail = this.detail.toNormal();
                return obj;
            }

            /**
             * 포트폴리오 콘텐츠의 키 매트릭스를 반환합니다.
             * @returns {Object} 키 매트릭스를 담은 객체
             */
            keyMatrix() {
                return this.detail.keyMatrix();
            }

            /**
             * #PorfolioContentsDetail 클래스는 포트폴리오의 각 세부 항목을 관리하는 비공개 클래스입니다.
             */
            #PorfolioContentsDetail = class {
                /**
                 * 생성자는 주어진 JSON 데이터를 기반으로 #PorfolioContentsDetail 객체를 초기화합니다.
                 * @param {Object} json - 포트폴리오 세부 항목 정보를 담고 있는 JSON 객체
                 */
                constructor(json) {
                    /** @property {Array} photo - 사진 정보 배열 */
                    this.photo = json.photo;
                    /** @property {string} title - 포트폴리오 세부 항목의 제목 */
                    this.title = json.title;
                    /** @property {string} contents - 포트폴리오 세부 항목의 내용 */
                    this.contents = json.contents;
                }

                /**
                 * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                 * @returns {Object} 변환된 객체
                 */
                toNormal() {
                    let obj = {};
                    obj.photo = this.photo;
                    obj.title = this.title;
                    obj.contents = this.contents;
                    return obj;
                }
            }

            /**
             * #PorfolioContentsDetails 클래스는 포트폴리오의 각 세부 항목을 관리하는 배열을 확장한 비공개 클래스입니다.
             */
            #PorfolioContentsDetails = class extends Array {
                /**
                 * 배열에 포함된 모든 #PorfolioContentsDetail 객체를 일반적인 객체 형태로 변환하여 반환합니다.
                 * @returns {Array} 변환된 객체들의 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i.toNormal());
                    }
                    return arr;
                }

                /**
                 * 포트폴리오 콘텐츠의 키 매트릭스를 생성하여 반환합니다.
                 * @returns {Object} 키 매트릭스를 담은 객체
                 */
                keyMatrix() {
                    let result = {};
                    let arr = [];
                    let tempArr;
                    result.rooms = [];
                    for (let i = 1; i < this.length; i++) {
                        tempArr = this[i].photo;
                        arr.push(tempArr);
                        result.rooms.push(this[i].title);
                    }
                    result.photos = arr;
                    return result;
                }
            }
        }

        /**
         * #PorfolioDetailInfo 클래스는 포트폴리오의 상세 정보를 관리하는 비공개 클래스입니다.
         */
        #PorfolioDetailInfo = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #PorfolioDetailInfo 객체를 초기화합니다.
             * @param {Object} json - 포트폴리오의 상세 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                let arr0 = new this.#Photodae();
                let arr1 = new this.#Slide();
                let arr2 = new this.#Tag();
                for (let i of json.photodae) {
                    arr0.push(i);
                }
                for (let i of json.slide) {
                    arr1.push(i);
                }
                for (let i of json.tag) {
                    arr2.push(i);
                }
                /** @property {Array} photodae - 사진 ID 목록을 저장하는 배열 */
                this.photodae = arr0;
                /** @property {Object} photosg - 첫 번째와 마지막 사진의 정보를 저장하는 #Photosg 클래스의 인스턴스 */
                this.photosg = new this.#Photosg(json.photosg);
                /** @property {Array} slide - 슬라이드에 사용될 사진들의 ID 배열 */
                this.slide = arr1;
                /** @property {Array} tag - 태그 배열 */
                this.tag = arr2;
                /** @property {string} service - 제공된 서비스 정보 */
                this.service = json.service;
                /** @property {Object} sort - 정렬 정보를 관리하는 #Sort 클래스의 인스턴스 */
                this.sort = new this.#Sort(json.sort);
                /** @property {Object} tendency - 스타일 경향을 관리하는 #StylingTendency 클래스의 인스턴스 */
                this.tendency = new this.#StylingTendency(json.tendency);
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.photodae = this.photodae.toNormal();
                obj.photosg = this.photosg.toNormal();
                obj.slide = this.slide.toNormal();
                obj.tag = this.tag.toNormal();
                obj.service = this.service;
                obj.sort = this.sort.toNormal();
                obj.tendency = this.tendency.toNormal();
                return obj;
            }

            /**
             * #Slide 클래스는 슬라이드 사진 ID 배열을 관리하는 비공개 배열 확장 클래스입니다.
             */
            #Slide = class extends Array {
                /**
                 * 배열에 포함된 모든 값을 그대로 반환합니다.
                 * @returns {Array} 변환된 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i);
                    }
                    return arr;
                }
            }

            /**
             * #Photodae 클래스는 포트폴리오의 사진 ID 목록을 관리하는 비공개 배열 확장 클래스입니다.
             */
            #Photodae = class extends Array {
                /**
                 * 배열에 포함된 모든 값을 그대로 반환합니다.
                 * @returns {Array} 변환된 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i);
                    }
                    return arr;
                }
            }

            /**
             * #Tag 클래스는 포트폴리오의 태그 목록을 관리하는 비공개 배열 확장 클래스입니다.
             */
            #Tag = class extends Array {
                /**
                 * 배열에 포함된 모든 값을 그대로 반환합니다.
                 * @returns {Array} 변환된 배열
                 */
                toNormal() {
                    let arr = [];
                    for (let i of this) {
                        arr.push(i);
                    }
                    return arr;
                }
            }

            /**
             * #Photosg 클래스는 포트폴리오의 첫 번째와 마지막 사진 정보를 관리하는 비공개 클래스입니다.
             */
            #Photosg = class {
                /**
                 * 생성자는 주어진 JSON 데이터를 기반으로 #Photosg 객체를 초기화합니다.
                 * @param {Object} json - 첫 번째와 마지막 사진 정보를 담고 있는 JSON 객체
                 */
                constructor(json) {
                    /** @property {number} first - 첫 번째 사진의 ID */
                    this.first = Number(json.first);
                    /** @property {number} last - 마지막 사진의 ID */
                    this.last = Number(json.last);
                }
                /**
                 * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                 * @returns {Object} 변환된 객체
                 */
                toNormal() {
                    let obj = {};
                    obj.first = Number(this.first);
                    obj.last = Number(this.last);
                    return obj;
                }
            }

            /**
             * #Sort 클래스는 포트폴리오의 정렬 정보를 관리하는 비공개 클래스입니다.
             */
            #Sort = class {
                /**
                 * 생성자는 주어진 JSON 데이터를 기반으로 #Sort 객체를 초기화합니다.
                 * @param {Object} json - 정렬 정보를 담고 있는 JSON 객체
                 */
                constructor(json) {
                    /** @property {number} key8 - 정렬 키 8 */
                    this.key8 = json.key8;
                    /** @property {number} key9 - 정렬 키 9 */
                    this.key9 = json.key9;
                }
                /**
                 * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                 * @returns {Object} 변환된 객체
                 */
                toNormal() {
                    let obj = {};
                    obj.key8 = this.key8;
                    obj.key9 = this.key9;
                    return obj;
                }
            }

            /**
             * #StylingTendency 클래스는 스타일 경향을 관리하는 비공개 클래스입니다.
             */
            #StylingTendency = class {
                /**
                 * 생성자는 주어진 JSON 데이터를 기반으로 #StylingTendency 객체를 초기화합니다.
                 * @param {Object} json - 스타일 경향 정보를 담고 있는 JSON 객체
                 */
                constructor(json) {
                    /** @property {Object} style - 스타일 경향 정보를 관리하는 #TendencyStyle 클래스의 인스턴스 */
                    this.style = new this.#TendencyStyle(json.style);
                    /** @property {Object} texture - 질감 경향 정보를 관리하는 #TendencyTexture 클래스의 인스턴스 */
                    this.texture = new this.#TendencyTexture(json.texture);
                    /** @property {Object} color - 색상 경향 정보를 관리하는 #TendencyColor 클래스의 인스턴스 */
                    this.color = new this.#TendencyColor(json.color);
                    /** @property {Object} density - 밀도 경향 정보를 관리하는 #TendencyDensity 클래스의 인스턴스 */
                    this.density = new this.#TendencyDensity(json.density);
                }

                /**
                 * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                 * @returns {Object} 변환된 객체
                 */
                toNormal() {
                    let obj = {};
                    obj.style = this.style.toNormal();
                    obj.texture = this.texture.toNormal();
                    obj.color = this.color.toNormal();
                    obj.density = this.density.toNormal();
                    return obj;
                }

                /**
                 * 스타일, 질감, 색상, 밀도에 대한 데이터를 배열 형태로 반환합니다.
                 * @param {boolean} keymode - 키모드 활성화 여부
                 * @returns {Array} 키 배열 또는 값 배열
                 */
                toMatrix(keymode = false) {
                    const keys = ["style", "texture", "color", "density"];
                    const keyArr = [
                        [
                            "modern",
                            "classic",
                            "natural",
                            "mixmatch",
                            "scandinavian",
                            "vintage",
                            "oriental",
                            "exotic",
                        ],
                        [
                            "darkWood",
                            "whiteWood",
                            "coating",
                            "metal",
                        ],
                        [
                            "darkWood",
                            "whiteWood",
                            "highContrast",
                            "vivid",
                            "white",
                            "mono",
                            "bright",
                            "dark",
                        ],
                        [
                            "maximun",
                            "minimum",
                        ]
                    ];
                    let result = [];
                    for (let i = 0; i < keys.length; i++) {
                        for (let key of keyArr[i]) {
                            result.push(this[keys[i]][key]);
                        }
                    }
                    if (keymode) {
                        return keyArr.flat();
                    } else {
                        return result;
                    }
                }

                /**
                 * #TendencyDensity 클래스는 밀도 경향을 관리하는 비공개 클래스입니다.
                 */
                #TendencyDensity = class {
                    /**
                     * 생성자는 주어진 JSON 데이터를 기반으로 #TendencyDensity 객체를 초기화합니다.
                     * @param {Object} json - 밀도 경향 정보를 담고 있는 JSON 객체
                     */
                    constructor(json) {
                        /** @property {number} maximun - 최대 밀도 */
                        this.maximun = json.maximun;
                        /** @property {number} minimum - 최소 밀도 */
                        this.minimum = json.minimum;
                    }

                    /**
                     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                     * @returns {Object} 변환된 객체
                     */
                    toNormal() {
                        let obj = {};
                        obj.maximun = this.maximun;
                        obj.minimum = this.minimum;
                        return obj;
                    }
                }

                /**
                 * #TendencyColor 클래스는 색상 경향을 관리하는 비공개 클래스입니다.
                 */
                #TendencyColor = class {
                    /**
                     * 생성자는 주어진 JSON 데이터를 기반으로 #TendencyColor 객체를 초기화합니다.
                     * @param {Object} json - 색상 경향 정보를 담고 있는 JSON 객체
                     */
                    constructor(json) {
                        /** @property {number} darkWood - 어두운 나무 색상 */
                        this.darkWood = json.darkWood;
                        /** @property {number} whiteWood - 밝은 나무 색상 */
                        this.whiteWood = json.whiteWood;
                        /** @property {number} highContrast - 고대비 색상 */
                        this.highContrast = json.highContrast;
                        /** @property {number} vivid - 선명한 색상 */
                        this.vivid = json.vivid;
                        /** @property {number} white - 흰색 */
                        this.white = json.white;
                        /** @property {number} mono - 단색 */
                        this.mono = json.mono;
                        /** @property {number} bright - 밝은 색상 */
                        this.bright = json.bright;
                        /** @property {number} dark - 어두운 색상 */
                        this.dark = json.dark;
                    }

                    /**
                     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                     * @returns {Object} 변환된 객체
                     */
                    toNormal() {
                        let obj = {};
                        obj.darkWood = this.darkWood;
                        obj.whiteWood = this.whiteWood;
                        obj.highContrast = this.highContrast;
                        obj.vivid = this.vivid;
                        obj.white = this.white;
                        obj.mono = this.mono;
                        obj.bright = this.bright;
                        obj.dark = this.dark;
                        return obj;
                    }
                }

                /**
                 * #TendencyTexture 클래스는 질감 경향을 관리하는 비공개 클래스입니다.
                 */
                #TendencyTexture = class {
                    /**
                     * 생성자는 주어진 JSON 데이터를 기반으로 #TendencyTexture 객체를 초기화합니다.
                     * @param {Object} json - 질감 경향 정보를 담고 있는 JSON 객체
                     */
                    constructor(json) {
                        /** @property {number} darkWood - 어두운 나무 질감 */
                        this.darkWood = json.darkWood;
                        /** @property {number} whiteWood - 밝은 나무 질감 */
                        this.whiteWood = json.whiteWood;
                        /** @property {number} coating - 코팅 질감 */
                        this.coating = json.coating;
                        /** @property {number} metal - 금속 질감 */
                        this.metal = json.metal;
                    }

                    /**
                     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                     * @returns {Object} 변환된 객체
                     */
                    toNormal() {
                        let obj = {};
                        obj.darkWood = this.darkWood;
                        obj.whiteWood = this.whiteWood;
                        obj.coating = this.coating;
                        obj.metal = this.metal;
                        return obj;
                    }
                }

                /**
                 * #TendencyStyle 클래스는 스타일 경향을 관리하는 비공개 클래스입니다.
                 */
                #TendencyStyle = class {
                    /**
                     * 생성자는 주어진 JSON 데이터를 기반으로 #TendencyStyle 객체를 초기화합니다.
                     * @param {Object} json - 스타일 경향 정보를 담고 있는 JSON 객체
                     */
                    constructor(json) {
                        /** @property {number} modern - 모던 스타일 */
                        this.modern = json.modern;
                        /** @property {number} classic - 클래식 스타일 */
                        this.classic = json.classic;
                        /** @property {number} natural - 내추럴 스타일 */
                        this.natural = json.natural;
                        /** @property {number} mixmatch - 믹스매치 스타일 */
                        this.mixmatch = json.mixmatch;
                        /** @property {number} scandinavian - 스칸디나비아 스타일 */
                        this.scandinavian = json.scandinavian;
                        /** @property {number} vintage - 빈티지 스타일 */
                        this.vintage = json.vintage;
                        /** @property {number} oriental - 오리엔탈 스타일 */
                        this.oriental = json.oriental;
                        /** @property {number} exotic - 이국적인 스타일 */
                        this.exotic = json.exotic;
                    }

                    /**
                     * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
                     * @returns {Object} 변환된 객체
                     */
                    toNormal() {
                        let obj = {};
                        obj.modern = this.modern;
                        obj.classic = this.classic;
                        obj.natural = this.natural;
                        obj.mixmatch = this.mixmatch;
                        obj.scandinavian = this.scandinavian;
                        obj.vintage = this.vintage;
                        obj.oriental = this.oriental;
                        obj.exotic = this.exotic;
                        return obj;
                    }
                }
            }
        }

        /**
         * #SpaceInfo 클래스는 포트폴리오의 공간 정보를 관리하는 비공개 클래스입니다.
         */
        #SpaceInfo = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #SpaceInfo 객체를 초기화합니다.
             * @param {Object} json - 공간 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                /** @property {string} space - 공간 유형 (예: 거실, 침실 등) */
                this.space = json.space;
                /** @property {number} pyeong - 평수 (공간의 크기) */
                this.pyeong = Number(json.pyeong);
                /** @property {string} region - 지역 정보 */
                this.region = json.region;
                /** @property {string} method - 시공 방법 */
                this.method = json.method;
                /** @property {string} budget - 예산 */
                this.budget = json.budget;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.space = this.space;
                obj.pyeong = Number(this.pyeong);
                obj.region = this.region;
                obj.method = this.method;
                obj.budget = this.budget;
                return obj;
            }
        }

        /**
         * #Title 클래스는 포트폴리오의 제목 정보를 관리하는 비공개 클래스입니다.
         */
        #Title = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #Title 객체를 초기화합니다.
             * @param {Object} json - 제목 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                /** @property {string} main - 메인 제목 */
                this.main = json.main;
                /** @property {string} sub - 서브 제목 */
                this.sub = json.sub;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.main = this.main;
                obj.sub = this.sub;
                return obj;
            }

            /**
             * 메인 및 서브 제목의 다양한 형태를 반환합니다.
             * @returns {Object} 제목의 다양한 케이스를 담은 객체
             */
            getAllCases() {
                let obj = {};
                let tempArr, tempArr2, temp, tempResult;
                let pyIndex;

                obj.main = [];
                obj.main.push(this.main);
                obj.main.push(this.main.replace(/, /, "\n"));

                tempArr = this.main.split(", ");
                obj.main.push(tempArr[1]);

                tempArr2 = tempArr[1].split(" ");
                pyIndex = 0;
                for (let i = 0; i < tempArr2.length; i++) {
                    if (/py/gi.test(tempArr2[i])) {
                        pyIndex = i;
                    }
                }

                tempResult = '';
                temp = '';
                for (let i = 0; i < pyIndex; i++) {
                    temp += tempArr2[i] + ' ';
                }
                tempResult = temp.slice(0, -1);

                temp = '';
                for (let i = pyIndex; i < tempArr2.length; i++) {
                    temp += tempArr2[i] + ' ';
                }
                tempResult = tempResult + "\n" + temp.slice(0, -1);
                obj.main.push(tempResult);

                obj.sub = [];
                obj.sub.push(this.sub);
                obj.sub.push(this.sub.replace(/, /, "\n"));

                return obj;
            }
        }

        /**
         * #Color 클래스는 포트폴리오의 색상 정보를 관리하는 비공개 클래스입니다.
         */
        #Color = class {
            /**
             * 생성자는 주어진 JSON 데이터를 기반으로 #Color 객체를 초기화합니다.
             * @param {Object} json - 색상 정보를 담고 있는 JSON 객체
             */
            constructor(json) {
                /** @property {string} main - 메인 색상 */
                this.main = json.main;
                /** @property {string} sub - 서브 색상 */
                this.sub = json.sub;
                /** @property {string} title - 타이틀 색상 */
                this.title = json.title;
            }

            /**
             * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
             * @returns {Object} 변환된 객체
             */
            toNormal() {
                let obj = {};
                obj.main = this.main;
                obj.sub = this.sub;
                obj.title = this.title;
                return obj;
            }
        }

        /**
         * 포트폴리오 콘텐츠의 키 매트릭스를 반환합니다.
         * @returns {Object} 키 매트릭스를 담은 객체
         */
        keyMatrix() {
            return this.contents.keyMatrix();
        }
    }
  }
  
  /**
   * 객체의 모든 속성을 일반적인 객체 형태로 변환합니다.
   * @returns {Object} 변환된 객체
   */
  toNormal() {
    let obj = {};
    /** @property {string} obj.conid - 변환된 객체의 콘텐츠 ID */
    obj.conid = this.conid;
    /** @property {string} obj.desid - 변환된 객체의 디자이너 ID */
    obj.desid = this.desid;
    /** @property {string} obj.cliid - 변환된 객체의 클라이언트 ID */
    obj.cliid = this.cliid;
    /** @property {string} obj.proid - 변환된 객체의 프로젝트 ID */
    obj.proid = this.proid;
    /** @property {Object} obj.contents - 변환된 객체의 콘텐츠 상세 정보 */
    obj.contents = this.contents.toNormal();
    /** @property {Object} obj.photos - 변환된 객체의 사진 정보 */
    obj.photos = this.photos.toNormal();
    /** @property {Object} obj.service - 변환된 객체의 서비스 정보 */
    obj.service = this.service.toNormal();
    /** @returns {Object} 변환된 객체를 반환 */
    return obj;
  }

  /**
   * 객체를 JSON 형식의 문자열로 변환합니다.
   * @returns {string} JSON 문자열
   */
  toJson = () => {
    /** @returns {string} 변환된 JSON 문자열을 반환 */
    return JSON.stringify(this.toNormal(), null, 2);
  }

  /**
   * 객체를 JSON 형식의 문자열로 변환하는 메서드로, toJson과 동일한 기능을 합니다.
   * @returns {string} JSON 문자열
   */
  toDeath = () => {
    /** @returns {string} 변환된 JSON 문자열을 반환 */
    return JSON.stringify(this.toNormal(), null, 2);
  }

  /**
   * 콘텐츠의 제목을 가져옵니다.
   * @param {string} main - "portfolio" 또는 "review" 중 선택
   * @param {string} sub - "main" 또는 "sub" 중 선택
   * @returns {string} 해당하는 제목 문자열
   */
  getTitle = (main = "portfolio", sub = "main") => {
    /** 콘텐츠 객체에서 포트폴리오와 리뷰를 구조 분해 할당 */
    const { contents: { portfolio, review } } = this;
    /** 포트폴리오 또는 리뷰의 제목을 반환 */
    switch (main) {
      case "portfolio":
        switch (sub) {
          case "main":
            /** @returns {string} 포트폴리오의 메인 제목 */
            return portfolio.title.main;
          case "sub":
            /** @returns {string} 포트폴리오의 서브 제목 */
            return portfolio.title.sub;
        }
        break;
      case "review":
        switch (sub) {
          case "main":
            /** @returns {string} 리뷰의 메인 제목 */
            return review.title.main;
          case "sub":
            /** @returns {string} 리뷰의 서브 제목 */
            return review.title.sub;
        }
        break;
    }
  }

  /**
   * 포트폴리오와 리뷰의 모든 제목 변형을 객체로 반환합니다.
   * @returns {Object} 포트폴리오와 리뷰의 모든 제목 변형 객체
   */
  returnTitleObject = () => {
    /** 포트폴리오와 리뷰의 제목 객체를 구조 분해 할당 */
    const { contents: { portfolio: { title: portfolioTitle }, review: { title: reviewTitle } } } = this;
    /** 빈 객체를 생성 */
    let obj = {};
    /** 포트폴리오 제목의 모든 변형을 객체에 추가 */
    obj.portfolio = portfolioTitle.getAllCases();
    /** 리뷰 제목의 모든 변형을 객체에 추가 */
    obj.review = reviewTitle.getAllCases();
    /** @returns {Object} 포트폴리오와 리뷰 제목의 모든 변형 객체를 반환 */
    return obj;
  }

  /**
   * 콘텐츠의 공간 정보를 반환합니다.
   * @returns {string} 공간 정보
   */
  getSpace = () => {
    /** 콘텐츠 객체에서 공간 정보를 반환 */
    const { contents: { portfolio: { spaceInfo } } } = this;
    /** @returns {string} 공간 이름을 반환 */
    return spaceInfo.space;
  }

  /**
   * 콘텐츠의 평수 정보를 반환합니다.
   * @returns {number} 평수 정보
   */
  getPyeong = () => {
    /** 콘텐츠 객체에서 평수 정보를 반환 */
    const { contents: { portfolio: { spaceInfo } } } = this;
    /** @returns {number} 평수를 반환 */
    return spaceInfo.pyeong;
  }

  /**
   * 콘텐츠의 지역 정보를 반환합니다.
   * @returns {string} 지역 정보
   */
  getRegion = () => {
    /** 콘텐츠 객체에서 지역 정보를 반환 */
    const { contents: { portfolio: { spaceInfo } } } = this;
    /** @returns {string} 지역 정보를 반환 */
    return spaceInfo.region;
  }

  /**
   * 콘텐츠의 작업 방법 정보를 반환합니다.
   * @returns {string} 작업 방법 정보
   */
  getMethod = () => {
    /** 콘텐츠 객체에서 작업 방법 정보를 반환 */
    const { contents: { portfolio: { spaceInfo } } } = this;
    /** @returns {string} 작업 방법 정보를 반환 */
    return spaceInfo.method;
  }

  /**
   * 포트폴리오 ID를 반환합니다.
   * @returns {string} 포트폴리오 ID
   */
  getPid = () => {
    /** @returns {string} 포트폴리오 ID를 반환 */
    return this.contents.portfolio.pid;
  }

  /**
   * 리뷰 ID를 반환합니다.
   * @returns {string} 리뷰 ID
   */
  getRid = () => {
    /** @returns {string} 리뷰 ID를 반환 */
    return this.contents.review.rid;
  }

  /**
   * 원본 사진 경로 목록을 반환합니다.
   * @returns {Array<string>} 원본 사진 경로 배열
   */
  toOriginalPath = () => {
    /** 사진 경로를 저장할 빈 배열을 생성 */
    let arr = [];
    /** 모든 사진에 대해 경로를 생성하여 배열에 추가 */
    for (let i = 0; i < this.photos.detail.length; i++) {
      arr.push(`/corePortfolio/original/${this.contents.portfolio.pid}/i${String(i + 1)}${this.contents.portfolio.pid}.jpg`);
    }
    /** @returns {Array<string>} 생성된 사진 경로 배열을 반환 */
    return arr;
  }

  /**
   * 포트폴리오의 상세 내용을 반환합니다.
   * @returns {Array} 포트폴리오 상세 내용 배열
   */
  getPortfolioDetail = () => {
    /** @returns {Array} 포트폴리오의 상세 내용을 반환 */
    return this.contents.portfolio.contents.detail;
  }

  /**
   * 리뷰의 상세 내용을 반환합니다.
   * @returns {Array} 리뷰 상세 내용 배열
   */
  getReviewDetail = () => {
    /** @returns {Array} 리뷰의 상세 내용을 반환 */
    return this.contents.review.contents.detail;
  }

  /**
   * 사진의 gs 값을 배열로 반환합니다.
   * @returns {Array<string>} gs 값 배열
   */
  getGsArr = () => {
    /** 사진의 gs 값을 저장할 빈 배열을 생성 */
    let arr = [];
    /** 모든 사진의 gs 값을 배열에 추가 */
    for (let { gs } of this.photos.detail) {
      arr.push(gs);
    }
    /** @returns {Array<string>} gs 값 배열을 반환 */
    return arr;
  }

  /**
   * 콘텐츠의 평탄화된 세부 내용을 반환합니다.
   * @returns {Object} 평탄화된 포트폴리오와 리뷰 내용
   */
  getContentsFlatDetail = () => {
    /** 포트폴리오와 리뷰 세부 내용을 구조 분해 할당 */
    const { contents: { portfolio: { contents: { detail: portfolioDetail } }, review: { contents: { detail: reviewDetail } } } } = this;
    /** 포트폴리오와 리뷰의 내용을 저장할 변수를 초기화 */
    let portfolio, review;
    let pastKey = null;

    /** 포트폴리오 내용을 초기화 */
    portfolio = "";
    /** 포트폴리오의 각 세부 내용에 대해 루프 실행 */
    for (let { photo, title, contents, smallTalk: { title: smallTalkTitle, contents: smallTalkContents } } of portfolioDetail) {
      /** 이전 키가 null이 아닐 경우, 포트폴리오 내용에 사진과 제목을 추가 */
      if (pastKey !== null) {
        portfolio += photo.join(", ");
        portfolio += "\n\n";
        portfolio += title;
        portfolio += "\n\n";
      }
      /** 포트폴리오 내용에 콘텐츠를 추가 */
      portfolio += contents;
      /** 스몰토크가 있을 경우, 포트폴리오 내용에 추가 */
      if (smallTalkTitle !== "") {
        portfolio += "\n\n";
        portfolio += smallTalkTitle;
        portfolio += "\n";
        portfolio += smallTalkContents;
      }
      portfolio += "\n\n";
    }
    /** 포트폴리오 내용의 마지막 2개의 줄바꿈을 제거 */
    portfolio = portfolio.slice(0, -2);

    /** 리뷰 내용을 초기화 */
    review = "";
    /** 리뷰의 각 세부 내용에 대해 루프 실행 */
    for (let { type, photos, contents } of reviewDetail) {
      /** 리뷰 타입이 "init"일 경우, 답변 내용을 리뷰에 추가 */
      if (type === "init") {
        for (let { answer } of contents) {
          review += answer;
          review += "\n\n";
        }
      } else {
        /** 리뷰에 사진과 질문/답변 내용을 추가 */
        review += photos.join(" ");
        review += "\n\n";
        for (let { question, answer } of contents) {
          review += "Q. " + question;
          review += "\n\n";
          review += "A. " + answer;
          review += "\n\n";
        }
      }
    }
    /** 리뷰 내용의 마지막 2개의 줄바꿈을 제거 */
    review = review.slice(0, -2);

    /** @returns {Object} 평탄화된 포트폴리오와 리뷰 내용을 반환 */
    return { portfolio, review };
  }

  /**
   * Google Docs에 사용할 상세 콘텐츠 정보를 반환합니다.
   * @param {string} server - 서버 주소
   * @returns {Object} Google Docs에 사용 가능한 포트폴리오 및 리뷰 데이터
   */
  getGoogleDocsDetail = (server) => {
    /** 서버 주소가 문자열이 아닌 경우 오류를 발생 */
    if (typeof server !== "string") {
      throw new Error("server address must")
    }
    /** 클래스 내부에서 this를 참조할 self 변수를 초기화 */
    const self = this;
    /** 코어 포트폴리오 경로를 초기화 */
    const corePortfolio = "/corePortfolio/listImage";
    /** 포토 문자 지정 */
    const photoChar = 't';
    /** 평탄화된 포트폴리오와 리뷰 내용을 가져옴 */
    const { portfolio, review } = this.getContentsFlatDetail();
    /** 토큰 문자열 초기화 */
    const token = "___split___";
    /** 임시 배열과 결과 객체를 초기화 */
    let tempArr, tempArr2, result;

    /** 결과 객체 초기화 */
    result = {};

    /** 포트폴리오 내용을 줄 단위로 분리하고, 각 줄을 트림 처리한 후 처리 */
    tempArr = portfolio.split('\n').map((i) => { return (i === '' ? "\n" : i.trim()); }).map((i) => {
      let arr0, arr1;
      /** 텍스트가 숫자로 시작하고 끝나며 '-' 문자가 있을 경우, 범위 처리 */
      if (/^[0-9]/.test(i) && /[0-9]$/.test(i) && /\-/gi.test(i)) {
        /** 범위를 배열로 변환 */
        arr0 = i.split('-').map((j) => { return Number(j.trim()); });
        /** 범위가 올바르지 않을 경우 오류 발생 */
        if (arr0.length !== 2) {
          throw new Error("invaild text");
        }
        /** 범위 내의 각 숫자에 대해 URL을 생성하여 배열에 추가 */
        arr1 = [];
        for (let z = arr0[0]; z < arr0[1] + 1; z++) {
          arr1.push(server + corePortfolio + "/" + self.contents.portfolio.pid + "/" + photoChar + String(z) + self.contents.portfolio.pid + ".jpg" + token + String(z));
        }
        return arr1;
      } else {
        /** 일반 텍스트의 경우 그대로 반환 */
        return i;
      }
    });

    /** 임시 배열을 평탄화하고, 각 항목을 다시 처리 */
    tempArr = tempArr.flat().map((i) => {
      if (/^http/.test(i)) {
        /** URL일 경우, URL과 관련된 gs 값을 반환 */
        return [i.split(token)[0], self.photos.detail[Number(i.split(token)[1]) - 1].gs];
      } else {
        /** 일반 텍스트일 경우 그대로 반환 */
        return i;
      }
    });

    /** 포트폴리오 제목을 배열의 첫 번째 항목으로 추가 */
    tempArr.unshift("\n");
    tempArr.unshift(self.contents.portfolio.title.main);
    /** 포트폴리오 결과를 설정 */
    result.portfolio = tempArr;

    /** 리뷰가 있을 경우 리뷰 내용을 처리 */
    result.review = [];
    if (review !== '') {

      tempArr2 = review.split('\n').map((i) => { return (i === '' ? "\n" : i.trim()); }).map((i) => {
        let arr0;
        if (/^[0-9]/.test(i) && /[0-9]$/.test(i)) {
          arr0 = i.split(' ').map((j) => { return Number(j.trim()); });
          arr0 = arr0.map((z) => {
            return server + corePortfolio + "/" + self.contents.portfolio.pid + "/" + photoChar + String(z) + self.contents.portfolio.pid + ".jpg" + token + String(z);
          });
          return arr0;
        } else {
          return i;
        }
      });

      tempArr2 = tempArr2.flat().map((i) => {
        if (/^http/.test(i)) {
          return [i.split(token)[0], self.photos.detail[Number(i.split(token)[1]) - 1].gs];
        } else {
          return i;
        }
      });

      tempArr2.unshift("\n");
      tempArr2.unshift(self.contents.review.title.main);
      result.review = tempArr2;
    }

    /** @returns {Object} Google Docs에 사용할 포트폴리오 및 리뷰 데이터를 반환 */
    return result;
  }
}

/**
 * 콘텐츠 인스턴스를 담는 배열 클래스
 * 이 클래스는 콘텐츠 데이터를 배열로 관리하며, 다양한 메서드를 통해 데이터를 처리하고 조작하는 기능을 제공합니다.
 * @class ContentsArr
 * @extends {Array}
 */
class ContentsArr extends Array {

  /**
   * 배열에 있는 모든 콘텐츠 객체를 일반 객체로 변환하여 반환합니다.
   * @returns {Array<Object>} 일반 객체로 변환된 콘텐츠 배열
   */
  toNormal() {
    let tong; // 결과를 저장할 빈 배열 생성
    tong = []; 
    for (let i of this) { // 현재 배열에 있는 모든 요소에 대해
      tong.push(i.toNormal()); // 각 요소를 toNormal 메서드로 변환한 뒤 결과 배열에 추가
    }
    return tong; // 변환된 배열 반환
  }

  /**
   * 모든 사진 데이터를 가져와서 반환합니다.
   * @returns {PhotoArray} 모든 사진 데이터를 담은 배열
   */
  getAllPhotos() {
    const path = "/corePortfolio/listImage"; // 사진의 기본 경로 설정
    /**
     * 사진 배열을 관리하는 클래스
     * @class PhotoArray
     * @extends {Array}
     */
    class PhotoArray extends Array {
      
      /**
       * 콘텐츠 ID로 사진을 검색합니다.
       * @param {string} conid 콘텐츠 ID
       * @returns {PhotoArray} 검색된 사진 배열
       */
      searchByConid(conid) {
        if (typeof conid !== "string") { // conid가 문자열이 아니면 오류 발생
          throw new Error("must be conid"); 
        }
        let result = new PhotoArray(); // 결과를 저장할 새 PhotoArray 인스턴스 생성
        for (let i of this) { // 현재 배열의 모든 요소에 대해
          if (i.conid === conid) { // conid가 일치하는 경우
            result.push(i); // 결과 배열에 해당 요소 추가
          }
        }
        return result; // 검색된 결과 반환
      }
      
      /**
       * 방(Room)으로 사진을 검색합니다.
       * @param {string} room 방 이름
       * @returns {PhotoArray} 검색된 사진 배열
       */
      searchByRoom(room) {
        if (typeof room !== "string") { // room이 문자열이 아니면 오류 발생
          throw new Error("must be room"); 
        }
        let result = new PhotoArray(); // 결과를 저장할 새 PhotoArray 인스턴스 생성
        for (let i of this) { // 현재 배열의 모든 요소에 대해
          if (i.room === room) { // room이 일치하는 경우
            result.push(i); // 결과 배열에 해당 요소 추가
          }
        }
        return result; // 검색된 결과 반환
      }
    }
    
    let temp, result; // 중간 결과와 최종 결과를 저장할 변수 선언
    result = new PhotoArray(); // 최종 결과를 저장할 새 PhotoArray 인스턴스 생성
    for (let { conid, desid, contents: { portfolio, review }, photos } of this) { // 현재 배열의 모든 콘텐츠에 대해 반복
      temp = JSON.parse(JSON.stringify(photos)).detail; // photos 객체를 깊은 복사한 뒤 detail 속성만 추출
      for (let obj of temp) { // 복사한 사진 데이터의 모든 요소에 대해 반복
        obj.conid = conid; // 사진 객체에 콘텐츠 ID 추가
        obj.desid = desid; // 사진 객체에 디자이너 ID 추가
        obj.pid = portfolio.pid; // 사진 객체에 포트폴리오 ID 추가
        obj.pyeong = portfolio.spaceInfo.pyeong; // 사진 객체에 공간 정보의 평수 추가
        obj.room = "review"; // 기본 방 이름을 "review"로 설정
        for (let i = 1; i < portfolio.contents.detail.length; i++) { // 포트폴리오의 각 콘텐츠 상세 정보에 대해
          if (portfolio.contents.detail[i].photo.includes(obj.index)) { // 사진 인덱스가 일치하는 경우
            obj.room = portfolio.contents.detail[i].title; // 방 이름을 해당 제목으로 설정
          }
        }
        obj.keywords = []; // 키워드 배열 초기화
        for (let t of portfolio.detailInfo.tag) { // 각 태그에 대해
          obj.keywords.push(t); // 키워드 배열에 태그 추가
        }
        obj.keywords.push(portfolio.detailInfo.service); // 서비스 정보를 키워드 배열에 추가
        obj.keywords = obj.keywords.filter((z) => { return z !== '' && z !== "all"; }); // 빈 문자열이나 "all"을 제외한 키워드만 필터링
        obj.file = `t${String(obj.index)}${obj.pid}.jpg`; // 파일 이름 생성
        obj.path = path + "/" + obj.pid + "/" + obj.file; // 파일 경로 생성
      }
      result.push(temp); // 중간 결과를 최종 결과에 추가
    }
    result = result.flat(); // 다중 배열 구조를 평평하게 만듦
    return result; // 최종 결과 반환
  }

  /**
   * 주어진 콘텐츠 ID 배열과 일치하는 콘텐츠를 반환합니다.
   * @param {Array<string>} arr 콘텐츠 ID 배열
   * @param {boolean} [normalMode=false] 일반 객체로 반환할지 여부
   * @returns {ContentsArr|Array<Object>} 콘텐츠 배열 또는 일반 객체 배열
   */
  conidArr(arr, normalMode = false) {
    if (!Array.isArray(arr)) { // arr이 배열인지 확인
      throw new Error("invaild input"); 
    }
    if (!arr.every((c) => { return typeof c === "string"; })) { // 배열의 모든 요소가 문자열인지 확인
      throw new Error("invaild input"); 
    }
    let result; 
    if (!normalMode) { // 일반 모드가 아닌 경우
      result = new ContentsArr(); // 새로운 ContentsArr 생성
      for (let obj of this) { // 현재 배열의 모든 요소에 대해
        if (arr.includes(obj.conid)) { // 콘텐츠 ID가 주어진 배열에 포함되어 있는 경우
          result.push(obj); // 결과 배열에 추가
        }
      }
    } else { // 일반 모드인 경우
      result = []; // 결과 배열 초기화
      for (let conid of arr) { // 주어진 콘텐츠 ID 배열의 모든 요소에 대해
        for (let obj of this) { // 현재 배열의 모든 요소에 대해
          if (conid === obj.conid) { // 콘텐츠 ID가 일치하는 경우
            result.push(obj.toNormal()); // 일반 객체로 변환하여 결과 배열에 추가
          }
        }
      }
    }
    return result; // 결과 배열 반환
  }

}

/**
 * Contents 클래스에 유용한 메서드를 추가하는 함수
 * 이 함수는 Contents 클래스의 프로토타입에 여러 가지 메서드를 추가하여 콘텐츠 데이터를 처리하는 기능을 확장합니다.
 * @param {Class} Contents 콘텐츠 클래스
 * @returns {Class} 확장된 콘텐츠 클래스
 */
const withTools = function (Contents) {

  /**
   * 콘텐츠 데이터를 평탄화된 객체 형태로 변환합니다.
   * @returns {Array<Object>} 평탄화된 객체의 배열
   */
  Contents.prototype.flatDeath = function () {
    const contents = this.toNormal(); // 현재 콘텐츠 객체를 일반 객체로 변환
    const { conid, desid, contents: { portfolio, review }, photos } = contents; // 콘텐츠, 포트폴리오, 리뷰 및 사진 정보 추출
    const { pid, date: portfolioDate, spaceInfo, title, color, detailInfo, contents: portfolioContents } = portfolio; // 포트폴리오 세부 정보 추출
    const { space, pyeong, region, method } = spaceInfo; // 공간 정보 추출
    const { photodae, photosg, slide, tag, service, sort: { key8, key9 } } = detailInfo; // 포트폴리오 디테일 정보 추출
    const { rid, date: reviewDate, title: reviewTitle, detailInfo: reviewDetailInfo, contents: reviewContents } = review; // 리뷰 정보 추출

    /**
     * 날짜 객체를 문자열로 변환합니다.
     * @param {Date} dateObject 변환할 날짜 객체
     * @param {boolean} [detail=false] 시간까지 포함할지 여부
     * @returns {string} 변환된 날짜 문자열
     */
    const dateToString = function (dateObject, detail = false) {
      let dayString = ''; // 날짜를 저장할 문자열 초기화

      // 년도를 4자리 문자열로 변환하여 추가
      dayString += String(dateObject.getFullYear()).slice(0, 4);
      dayString += '-';

      // 월을 2자리 문자열로 변환하여 추가
      if (dateObject.getMonth() + 1 < 10) {
        dayString += '0' + String(dateObject.getMonth() + 1);
      } else {
        dayString += String(dateObject.getMonth() + 1);
      }

      dayString += '-';

      // 일을 2자리 문자열로 변환하여 추가
      if (dateObject.getDate() < 10) {
        dayString += '0' + String(dateObject.getDate());
      } else {
        dayString += String(dateObject.getDate());
      }

      // detail이 true일 경우 시간도 문자열에 추가
      if (detail) {
        dayString += ' ';
        if (dateObject.getHours() < 10) {
          dayString += '0' + String(dateObject.getHours());
        } else {
          dayString += String(dateObject.getHours());
        }
        dayString += ':';
        if (dateObject.getMinutes() < 10) {
          dayString += '0' + String(dateObject.getMinutes());
        } else {
          dayString += String(dateObject.getMinutes());
        }
        dayString += ':';
        if (dateObject.getSeconds() < 10) {
          dayString += '0' + String(dateObject.getSeconds());
        } else {
          dayString += String(dateObject.getSeconds());
        }
      }

      // 특정 조건에 따라 날짜 문자열 수정
      if (/^1[678]/.test(dayString)) {
        dayString = '-';
      } else if (/^3/.test(dayString)) {
        dayString = '예정';
      }

      return dayString; // 최종 변환된 날짜 문자열 반환
    }

    let tong = []; // 최종 결과를 저장할 배열 초기화
    let temp; // 임시 객체를 저장할 변수 선언

    temp = {};
    temp.standard = { // 표준 정보 객체 생성
      conid,
      pid
    };
    temp.info = { // 세부 정보 객체 생성
      desid,
      rid,
      portfolioDate: dateToString(portfolioDate, true), // 포트폴리오 날짜 문자열로 변환
      reviewDate: dateToString(reviewDate, true), // 리뷰 날짜 문자열로 변환
      titleMain: title.main, // 메인 제목
      titleSub: title.sub, // 서브 제목
      reviewTitleMain: reviewTitle.main, // 리뷰 메인 제목
      reviewTitleSub: reviewTitle.sub, // 리뷰 서브 제목
      space, // 공간 정보
      pyeong, // 평수
      region, // 지역
      method, // 방법
      color: (color.main + " / " + color.sub + " / " + color.title), // 색상 정보
      photodae: photodae.join(", "), // 포토대 정보
      reviewPhotodae: reviewDetailInfo.photodae.join(", "), // 리뷰 포토대 정보
      photosg: (photosg.first + ", " + photosg.last), // 사진 정보
      slide: slide.join(", "), // 슬라이드 정보
      tag: tag.join(", "), // 태그 정보
      service, // 서비스 정보
      key8, // 키8
      key9, // 키9
      order: reviewDetailInfo.order, // 리뷰 주문 정보
    };
    tong.push(temp); // 생성된 객체를 결과 배열에 추가

    return tong; // 결과 배열 반환
  }

  /**
   * 평탄화된 데이터를 기반으로 차원 축소된 객체 배열을 반환합니다.
   * @returns {Array<Object>} 차원 축소된 객체 배열
   */
  Contents.prototype.dimensionSqueeze = function () {
    const tong = this.flatDeath(); // flatDeath 메서드를 호출하여 평탄화된 데이터를 가져옴
    let result, tempObj;

    result = [];
    for (let { standard, info } of tong) { // 각 평탄화된 데이터에 대해
      tempObj = {};
      for (let i in standard) { // 표준 정보 복사
        tempObj[i] = standard[i];
      }
      for (let i in info) { // 세부 정보 복사
        tempObj[i] = info[i];
      }
      tempObj.reviewOrder = tempObj.order; // 리뷰 주문 정보를 복사하여 reviewOrder로 저장
      delete tempObj.order; // 원래 order 속성 삭제
      result.push(tempObj); // 최종 객체를 결과 배열에 추가
    }

    return result; // 최종 결과 배열 반환
  }

  /**
   * 이미지 경로를 생성하여 반환합니다.
   * @returns {Object} 이미지 경로 정보 객체
   */
  Contents.prototype.imagePath = function () {
    /**
     * 주요 이미지 정보를 담은 클래스
     * @class KeyImages
     */
    class KeyImages {
      /**
       * 객체를 배열 형태로 변환합니다.
       * @returns {Array<Object>} 변환된 배열
       */
      toArray() {
        let arr = []; // 결과를 저장할 배열 초기화
        let tempObj;
        for (let i in this.rooms) { // 각 방(Room) 정보에 대해
          tempObj = {}; 
          tempObj.pid = this.pid; // 포트폴리오 ID 복사
          tempObj.room = i; // 방 이름 복사
          tempObj.photos = this.rooms[i]; // 사진 정보 복사
          arr.push(tempObj); // 결과 배열에 추가
        }
        return arr; // 최종 배열 반환
      }
    }

    /**
     * 이미지 경로를 생성하는 클래스
     * @class ImagePath
     */
    class ImagePath {
      /**
       * 리스트 이미지의 경로를 생성합니다.
       * @returns {KeyImages} 생성된 이미지 정보 객체
       */
      keyListImage() {
        const { key: { rooms, photos }, listImage: images } = this; // 경로 생성에 필요한 정보 추출
        let result = new KeyImages(); // 새로운 KeyImages 객체 생성
        result.conid = this.conid; // 콘텐츠 ID 복사
        result.pid = this.pid; // 포트폴리오 ID 복사
        result.rooms = {};

        for (let i = 0; i < rooms.length; i++) { // 각 방(Room) 정보에 대해
          result.rooms[rooms[i]] = []; // 방에 해당하는 사진 배열 초기화
          for (let j = photos[i][0] - 1; j < photos[i][1]; j++) { // 각 사진 정보에 대해
            result.rooms[rooms[i]].push(images[j]); // 해당 방에 사진 경로 추가
          }
        }
        return result; // 최종 이미지 정보 객체 반환
      }

      /**
       * 원본 이미지의 경로를 생성합니다.
       * @returns {KeyImages} 생성된 이미지 정보 객체
       */
      keyOriginal() {
        const { key: { rooms, photos }, original: images } = this; // 경로 생성에 필요한 정보 추출
        let result = new KeyImages(); // 새로운 KeyImages 객체 생성
        result.conid = this.conid; // 콘텐츠 ID 복사
        result.pid = this.pid; // 포트폴리오 ID 복사
        result.rooms = {};

        for (let i = 0; i < rooms.length; i++) { // 각 방(Room) 정보에 대해
          result.rooms[rooms[i]] = []; // 방에 해당하는 사진 배열 초기화
          for (let j = photos[i][0] - 1; j < photos[i][1]; j++) { // 각 사진 정보에 대해
            result.rooms[rooms[i]].push(images[j]); // 해당 방에 사진 경로 추가
          }
        }
        return result; // 최종 이미지 정보 객체 반환
      }
    }

    const pid = this.contents.portfolio.pid; // 포트폴리오 ID 추출
    let result = new ImagePath(); // 새로운 ImagePath 객체 생성
    let tempObj;

    result.conid = this.conid; // 콘텐츠 ID 복사
    result.pid = pid; // 포트폴리오 ID 복사
    result.key = this.contents.portfolio.keyMatrix(); // 포트폴리오 키 매트릭스 생성

    result.listImage = []; // 리스트 이미지 경로 초기화
    result.original = []; // 원본 이미지 경로 초기화

    for (let i = 0; i < this.photos.detail.length; i++) { // 각 사진 디테일에 대해
      tempObj = {};
      tempObj.path = "/corePortfolio/listImage/" + pid + "/t" + this.photos.detail[i].index + pid + ".jpg"; // 리스트 이미지 경로 생성
      tempObj.gs = this.photos.detail[i].gs; // 사진 GS 정보 추가
      result.listImage.push(tempObj); // 리스트 이미지 경로 배열에 추가
      tempObj = {};
      tempObj.path = "/corePortfolio/original/" + pid + "/i" + this.photos.detail[i].index + pid + ".jpg"; // 원본 이미지 경로 생성
      tempObj.gs = this.photos.detail[i].gs; // 사진 GS 정보 추가
      result.original.push(tempObj); // 원본 이미지 경로 배열에 추가
    }

    return result; // 최종 이미지 경로 정보 객체 반환
  }

  return Contents; // 확장된 Contents 클래스 반환
}

/**
 * ContentsArr 클래스에 유용한 메서드를 추가하는 함수
 * 이 함수는 ContentsArr 클래스의 프로토타입에 다양한 메서드를 추가하여 콘텐츠 배열 데이터를 처리하는 기능을 확장합니다.
 * @param {Class} ContentsArr 콘텐츠 배열 클래스
 * @returns {Class} 확장된 콘텐츠 배열 클래스
 */
const withToolsArr = function (ContentsArr) {

  /**
   * 콘텐츠 배열의 각 콘텐츠 데이터를 평탄화된 객체 형태로 변환하여 하나의 배열로 반환합니다.
   * @returns {Array<Object>} 평탄화된 객체의 배열
   */
  ContentsArr.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = []; // 최종 결과를 담을 배열 초기화
    for (let i of this) { // 배열의 각 콘텐츠에 대해
      tempArr = i.flatDeath(); // 개별 콘텐츠를 평탄화된 객체로 변환
      for (let j of tempArr) {
        tong.push(j); // 결과 배열에 추가
      }
    }
    return tong; // 최종 결과 배열 반환
  }

  /**
   * 차원 축소된 데이터베이스 모델을 생성합니다.
   * @returns {Object|null} SQL 모델 및 데이터 객체 또는 null
   */
  ContentsArr.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "contents"; // 테이블 이름 정의
    const LONG_TARGETS = []; // TEXT로 저장할 긴 문자열 필드를 지정하는 배열 초기화

    /**
     * SQL 모델을 생성하는 클래스
     * @class SqlModel
     */
    class SqlModel {
      /**
       * SQL 모델 생성자
       * @param {Object} sample 차원 축소된 데이터 샘플 객체
       */
      constructor(sample) {
        for (let i in sample) { // 샘플 객체의 각 필드를 순회
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)"; // 문자열 타입은 VARCHAR(255)로 설정
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)"; // 숫자 타입은 INT(11)로 설정
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)"; // 불리언 타입은 INT(11)로 설정 (1 또는 0으로 저장)
          } else {
            this[i] = "VARCHAR(255)"; // 그 외 타입은 기본적으로 VARCHAR(255)로 설정
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT"; // 긴 문자열 필드는 TEXT로 설정
          }
        }
      }

      /**
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * SQL 테이블 생성 쿼리를 반환합니다.
       * @returns {string} 테이블 생성 SQL 쿼리
       */
      getCreateSql() {
        let sql = "CREATE TABLE `" + this.getName() + "` ("; // 테이블 생성 SQL 시작
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,"; // ID 필드 추가 (자동 증가)
        sql += " ";
        for (let i in this) {
          sql += "`";
          sql += i;
          sql += "` ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));"; // 기본 키 설정
        return sql; // 최종 SQL 반환
      }

      /**
       * SQL 테이블 삭제 쿼리를 반환합니다.
       * @returns {string} 테이블 삭제 SQL 쿼리
       */
      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";"; // 테이블 삭제 SQL
        return sql;
      }

    }

    /**
     * SQL 삽입 쿼리를 관리하는 배열 클래스
     * @class SqlTong
     */
    class SqlTong extends Array {
      /**
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * SQL 삽입 쿼리 배열을 반환합니다.
       * @returns {Array<string>} SQL 삽입 쿼리 배열
       */
      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql()); // 각 요소에 대해 삽입 SQL 쿼리 생성 및 배열에 추가
        }
        return arr;
      }

    }

    /**
     * SQL 삽입 쿼리를 생성하는 클래스
     * @class SqlTongFactor
     */
    class SqlTongFactor {
      /**
       * SQL 삽입 쿼리 객체 생성자
       * @param {Object} sample 차원 축소된 데이터 샘플 객체
       */
      constructor(sample) {
        for (let i in sample) { // 샘플 객체의 각 필드를 순회
          if (typeof sample[i] === "string") {
            this[i] = sample[i]; // 문자열 그대로 할당
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i]; // 숫자 그대로 할당
          } else if (typeof sample[i] === "boolean") {
            this[i] = sample[i] ? 1 : 0; // 불리언을 숫자 (1 또는 0)로 변환
          } else {
            this[i] = JSON.stringify(sample[i]); // 그 외의 경우 JSON 문자열로 변환
          }
        }
      }

      /**
       * 테이블 이름을 반환합니다.
       * @returns {string} 테이블 이름
       */
      getName() {
        return TABLE_NAME;
      }

      /**
       * SQL 삽입 쿼리를 반환합니다.
       * @returns {string} SQL 삽입 쿼리
       */
      getInsertSql() {
        let sql = "INSERT INTO `" + this.getName() + "` ("; // 삽입 SQL 시작
        for (let i in this) {
          sql += "`";
          sql += i;
          sql += "`,";
        }

        sql = sql.slice(0, -1); // 마지막 쉼표 제거
        sql += ") VALUES ("; // VALUES 부분 시작

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i]; // 숫자는 그대로 삽입
          } else {
            // 날짜 포맷에 맞는 경우 STR_TO_DATE 함수로 변환
            if (/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d')";
            } else if (/^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/gi.test(this[i])) {
              sql += "STR_TO_DATE('";
              sql += this[i].replace(/'/g, '"');
              sql += "', '%Y-%m-%d %H:%i:%s')";
            } else {
              sql += "'";
              sql += this[i].replace(/'/g, '"');
              sql += "'";
            }
          }
          sql += ",";
        }

        sql = sql.slice(0, -1); // 마지막 쉼표 제거
        sql += ");"; // SQL 쿼리 종료

        return sql; // 최종 SQL 쿼리 반환
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong(); // SQL 데이터 객체 초기화

    for (let i of this) { // 각 콘텐츠 객체에 대해
      tempArr = i.dimensionSqueeze(); // 차원 축소된 객체 배열을 가져옴
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j)); // 각 객체를 SQL 삽입 쿼리 객체로 변환 후 추가
      }
    }

    if (tong.length > 0) {
      sample = tong[0]; // 첫 번째 객체를 샘플로 사용
      model = new SqlModel(sample); // SQL 모델 생성
      return { model, data: tong }; // 모델 및 데이터 반환
    } else {
      return null; // 데이터가 없는 경우 null 반환
    }
  }

  /**
   * 콘텐츠 ID로 콘텐츠를 검색합니다.
   * @param {string} conid 콘텐츠 ID
   * @returns {Object|null} 검색된 콘텐츠 또는 null
   */
  ContentsArr.prototype.search = function (conid) {
    let result = null;
    for (let i of this) {
      if (i.conid === conid) { // 콘텐츠 ID가 일치하는지 확인
        result = i;
        break;
      }
    }
    return result; // 검색된 콘텐츠 반환
  }

  /**
   * 콘텐츠 ID로 콘텐츠를 찾아 반환합니다.
   * @param {string} conid 콘텐츠 ID
   * @returns {Object|null} 검색된 콘텐츠 또는 null
   */
  ContentsArr.prototype.find = function (conid) {
    return this.search(conid); // search 메서드를 호출하여 동일한 기능 수행
  }

  /**
   * 콘텐츠 배열의 이미지 경로를 관리하는 메서드
   * @returns {ImageArray} 이미지 경로를 포함하는 객체 배열
   */
  ContentsArr.prototype.imagePath = function () {
    /**
     * 이미지 배열을 관리하는 클래스
     * @class ImageArray
     */
    class ImageArray extends Array {
      /**
       * 콘텐츠 ID를 키로 변환하여 객체로 반환합니다.
       * @returns {Object} 콘텐츠 ID를 키로 하는 객체
       */
      convertConid() {
        let result = {};
        for (let i of this) {
          result[i.conid] = i; // 콘텐츠 ID를 키로 변환하여 저장
        }
        return result;
      }

      /**
       * 포트폴리오 ID를 키로 변환하여 객체로 반환합니다.
       * @returns {Object} 포트폴리오 ID를 키로 하는 객체
       */
      convertPid() {
        let result = {};
        for (let i of this) {
          result[i.pid] = i; // 포트폴리오 ID를 키로 변환하여 저장
        }
        return result;
      }

      /**
       * 리스트 이미지 경로를 평탄화하여 배열로 반환합니다.
       * @returns {Array<string>} 리스트 이미지 경로 배열
       */
      flatListImage() {
        let result = [];
        for (let i of this) {
          for (let j of i.listImage) {
            result.push(j.path); // 각 리스트 이미지 경로를 배열에 추가
          }
        }
        return result;
      }

      /**
       * 원본 이미지 경로를 평탄화하여 배열로 반환합니다.
       * @returns {Array<string>} 원본 이미지 경로 배열
       */
      flatOriginal() {
        let result = [];
        for (let i of this) {
          for (let j of i.original) {
            result.push(j.path); // 각 원본 이미지 경로를 배열에 추가
          }
        }
        return result;
      }

      /**
       * 키 리스트 이미지 경로를 평탄화하여 배열로 반환합니다.
       * @returns {Array<Object>} 키 리스트 이미지 경로 배열
       */
      keyListImage() {
        let result = [];
        let tempArr;
        for (let i of this) {
          tempArr = i.keyListImage().toArray(); // 키 리스트 이미지 배열을 가져옴
          result = result.concat(tempArr); // 결과 배열에 병합
        }
        return result;
      }

      /**
       * 키 원본 이미지 경로를 평탄화하여 배열로 반환합니다.
       * @returns {Array<Object>} 키 원본 이미지 경로 배열
       */
      keyOriginal() {
        let result = [];
        let tempArr;
        for (let i of this) {
          tempArr = i.keyOriginal().toArray(); // 키 원본 이미지 배열을 가져옴
          result = result.concat(tempArr); // 결과 배열에 병합
        }
        return result;
      }
    }

    let result = new ImageArray(); // 이미지 경로 배열 초기화
    for (let i of this) { // 각 콘텐츠 객체에 대해
      result.push(i.imagePath()); // 이미지 경로 객체를 생성하여 배열에 추가
    }
    return result; // 최종 이미지 경로 배열 반환
  }

  return ContentsArr; // 확장된 ContentsArr 클래스 반환
}

module.exports = { ContentsMap, Contents, ContentsArr, Tools: { withTools, withToolsArr } };