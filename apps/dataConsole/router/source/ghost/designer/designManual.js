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
      "return ('디자이너 가이드 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('디자이너 가이드 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designManual",
  "hangul": "디자이너 가이드",
  "route": [
    "designManual"
  ]
} %/%/g

const DesignManualJs = function () {
  this.mother = new GeneralJs();
}

DesignManualJs.binaryPath = FRONTHOST + "/middle/console/manual";

DesignManualJs.prototype.returnDesignerContract = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let contents;

  contents = [
    {
      title: "계약의 목적",
      description: "홈리에종은 다양한 전문가 서비스를 제공하고 파트너십을 기반으로 함께 성장하고자 홈스타일링 서비스를 연계하여 주고, 디자이너의 개인 브랜딩, 각종 제휴 서비스의 제공, 디자이너 네트워크 및 교육/세미나 등의 서비스(유/무료)를 제공함에 있어서 홈리에종과 디자이너의 권리의무를 명확히 하여 홈리에종과 디자이너의 동반 성장을 도모함에 있습니다.",
    },
    {
      title: "계약의 기간",
      description: "본 계약은 1년 단위로 이루어지고, 계약기간 만료일 1달 전에 서면, 이메일, 문자메시지, 카톡 등으로 디자이너의 직접적인 계약갱신거절의 의사표시가 없다면 본 계약과 동일한 내용 및 기간 동안 별도의 의사표시없이 자동으로 연장됩니다.",
    },
    {
      title: "홈스타일링 연계 서비스 기본 정책",
      children: [
        {
          description: "「홈스타일링」의 개념에 맞는 서비스를 제공합니다. 고객의 총 예산을 충분히 고려하여 디자인 컨설팅을 진행합니다. 디자인 기획에 따라 시공 범위 및 견적 제안이 이루어집니다. 리모델링을 포함하더라도 기존 제품의 활용 및 신규 제품의 제안 등 생활에 필요한 디자인 위주로 진행하고, 스타일링 완료 확인 후 프로젝트를 종료합니다.",
        },
        {
          description: "홈리에종은 디자이너와의 사전 합의 내용을 바탕으로 고객 제안을 진행하고 계약된 건에 한해서 연계 서비스를 제공합니다. ① 서비스 제공 영역 ② 서비스 종류별 용역 대금 ③ 활동 지역 및 디자인 스타일 ④ 일정(사전확인) 등을 고려하여 고객에게 제안합니다.",
        },
        {
          title: "홈리에종의 상담",
          children: [
            {
              description: "고객에게 제공받은 정보(기본정보, 이사갈 현장사진, 선호사진 등)와 상담을 통해 고객에게 가장 알맞은 홈스타일링 서비스 및 적합한 디자이너를 추천합니다.",
            },
            {
              description: "홈리에종은 디자이너의 서비스 제공 영역, 서비스 종료별 용역 대금, 활동 지역 및 디자인 스타일, 일정을 고려하여 2~3명의 디자이너를 추천합니다.",
            },
            {
              description: "홈리에종은 자율적으로 디자이너를 추천하고, 특수한 고객의 경우 디자이너에게 건별 진행 의사 여부를 확인할 수 있습니다."
            }
          ]
        }
      ]
    },
    {
      title: "홈스타일링 서비스 종류",
      children: [
        {
          description: "고객이 요청하는 작업 방식에 따라 온라인, 오프라인으로 구분합니다.",
        },
        {
          description: "서비스 제공 범위에 따라 홈퍼니싱, 홈스타일링, 토탈스타일링, 원룸&부분, 상업공간, 패브릭 으로 구분합니다.",
          children: [
            {
              title: "홈퍼니싱",
              description: "시공 없이 가구, 패브릭, 조명, 소품으로 스타일링",
            },
            {
              title: "홈스타일링",
              description: "부분 시공과 가구, 패브릭, 조명, 소품으로 스타일링",
            },
            {
              title: "토탈 스타일링",
              description: "전체 시공과 가구, 패브릭, 조명, 소품으로 스타일링",
            },
            {
              title: "원룸 또는 부분 스타일링",
              description: "1인 가구용 원룸 스타일링과 전체 공간의 부분공간(예: 거실, 침실 등) 스타일링 ",
            },
            {
              title: "상업공간",
              description: "상업 용도의 공간 스타일링",
            },
            {
              title: "패브릭 스타일링",
              description: "커튼/블라인드, 베딩, 쿠션, 러그 등 패브릭으로 스타일링",
            },
          ]
        }
      ]
    },
    {
      title: "디자이너의 서비스 범위",
      children: [
        {
          title: "서비스의 개시",
          children: [
            {
              description: "디자이너는 홈리에종으로부터 고객의 용역 대금 전액이 지급 완료되었음을 고지받은 후에 디자인을 시작합니다.",
            },
            {
              description: "디자이너는 전달받은 정보를 사전에 숙지하여 미팅에 참여합니다.",
            }
          ]
        },
        {
          title: "서비스의 내용",
          children: [
            {
              description: "공간의 컨디션과 가용 예산을 고려하여 최대한 기능적 / 디자인적 결과 도출을 위해 컨설팅합니다.",
            },
            {
              description: "디자이너와 고객과의 미팅은 가급적 이사 갈 현장에서 진행하고, 신축 아파트의 경우 사전점검일에 진행하는 것을 권고하며 고객의 요청 사항을 존중하여 진행합니다.",
            },
            {
              description: "디자이너는 고객과의 미팅에서 현장 실측, 시공 범위에 대한 논의, 전체 컨셉 및 요청 사항에 대한 논의를 진행합니다.",
            },
            {
              description: "디자이너는 미팅시 시공사와 동행(상황에 따라 다를 수 있음) 하여 고객이 요청하는 시공 내역을 리스트업합니다.",
            },
            {
              description: "기능적인 문제로 교체해야 하는 것과 스타일링적으로 보완해야 하는 것을 구분하여 제안하고 고객에게 지나친 시공을 요구하지 않습니다.",
            },
            {
              description: "기본적인 시공 내역을 고객과 공유하여 비교 견적을 받을 수 있도록 합니다.",
            },
            {
              description: "온라인 서비스는 대면 미팅이 없습니다.",
            },
            {
              description: "디자이너는 고객과 전화, 카톡, 메일 등으로 커뮤니케이션하며 스타일링을 진행합니다.",
            },
            {
              description: "현장 상황과 디자이너에 따라 미팅 횟수에는 차이가 있을 수 있고, 평균적으로 2~3회 진행되며 첫 현장 미팅 1회, 마무리 확인 및 촬영시 1회를 포함하여 스타일링 진행 필요에 따라 진행하는 것으로 안내합니다.",
            },
            {
              description: "디자이너는 1차 현장 미팅시 논의한 전체 컨셉을 바탕으로 고객과의 커뮤니케이션을 통해 디자인을 수정 및 발전시킵니다.",
            },
            {
              description: "시공 진행시 방향 제시 및 시공 자재를 추천합니다. (예: 도배지, 페인트컬러, 바닥재, 타일, 필름컬러 등)",
            },
            {
              description: "고객의 기존 가구 중 지속적으로 사용할 것과 버릴 가구의 선택 및 배치/활용을 제안합니다.",
            },
            {
              description: "새로 구매할 가구, 조명, 패브릭(커튼, 베딩, 러그, 쿠션), 소품(식물, 액자, 시계 등)을 제안합니다.",
            },
            {
              description: "가전, 생활 용품 및 식기는 필수 제안 내용에 포함하지 않습니다. 다만 디자이너의 자율적인 의지에 의해서 고객의 요청에 대한 의견을 줄 수 있습니다.",
            },
            {
              description: "고객 맞춤형 서비스의 특성대로 성의 있는 고객 응대를 진행합니다.",
            }
          ]
        },
        {
          title: "서비스의 추가",
          description: "계약 기간 내 고객의 서비스 범위 추가가 가능하고, 이에 대한 요청이 있는 경우(예: 부분에서 전체 공간), 해당 건의 내용을 홈리에종에 전달하고 홈리에종을 통해서 결제하도록 합니다.",
        },
        {
          title: "문서의 작성",
          children: [
            {
              description: "고객 및 프로젝트 관련자의 올바른 커뮤니케이션을 위하여 필요한 문서 작업을 진행하고, 홈리에종에서 제안하는 기본 서식을 최대한 활용하고, 상호 동의한 디자인 프로세스에 따라 서비스를 제공합니다.",
            },
            {
              description: "디자이너가 고객에게 개별적으로 제공하는 「스타일링 진행안내」 문서를 홈리에종에 공유하여, 고객이 사전에 디자이너의 특징을 인지할 수 있도록 합니다. 디자이너의 특이사항이 있는 경우 그 내용이 꼭 전달되어야 합니다.",
            },
            {
              description: "최초 협업 프로젝트에 한하여 디자이너가 고객에게 제공하는 문서(예: 컨셉보드, 추천 제품 리스트 등)를 홈리에종에 공유합니다.",
            }
          ]
        }
      ]
    },
    {
      title: "시공사 추천 및 협업",
      children: [
        {
          description: "홈리에종은 고객에게 디자인 니즈의 반영, 공사 품질, A/S, 합리적인 견적을 제시하는 홈리에종 직영사를 추천할 수 있습니다.",
        },
        {
          description: "고객은 시공사를 선택할 수 있습니다. ① 고객이 찾은 시공사 ② 디자이너 협업 시공사 ③ 홈리에종 직영사 중 고객이 최종 선택한 시공사와 협업합니다. 시공의 난이도에 따라 디자이너 협업 시공사와 진행해야 하는 경우 사전 조율이 필요합니다.",
        },
        {
          description: "고객은 최종 선택한 시공사와 직접 계약을 체결하고, 시공 대금의 지불 등 시공과 관련된 일체의 사항은 고객과 계약한 시공사의 상세 계약 내용에 따르며 해당 업체에게 전적인 책임이 있습니다.",
        },
        {
          description: "고객이 디자이너 협업 시공사를 최종 선택한 경우 고객에게 합리적인 견적 제시, 공사 품질, A/S 에 대한 보장을 해주어야 하며 홈리에종은 시공 계약과 관련하여 어떠한 책임도 없습니다.",
        },
        {
          description: "디자이너는 고객이 최종 선택한 시공사와의 커뮤니케이션에 협조적으로 임해야 합니다.",
        }
      ]
    },
    {
      title: "구매 안내",
      children: [
        {
          description: "디자이너는 고객이 제품을 구매할 수 있도록 업체명, 금액, 특이사항, 링크 등을 상세하게 안내합니다.",
        },
        {
          description: "홈리에종은 구매 대행을 진행하지 않습니다. 개별적으로 구매 대행을 진행하는 경우 고객과 디자이너의 별도 약정으로 진행하며 구매 대행과 관련하여 홈리에종은 일체의 책임이 없습니다.",
        },
        {
          description: "고객이 디자이너를 통해 제품을 구매하는 경우 제품 구매 증빙에 대하여 홈리에종은 무관하며, 일체의 책임이 없습니다.",
        },
        {
          description: "디자이너는 패브릭 및 가구의 맞춤 제작, 해외 배송 제품 등에 대하여 교환/환불이 불가함과 고객의 변심 혹은 실수로 기성 제품의 교환/환불 필요시 구매처의 교환/환불 기준에 따라 처리해야 함과 홈리에종과 디자이너는 교환/환불 등에 관하여 일체의 책임이 없음을 사전에 고객에게 안내하여야 합니다.",
        },
        {
          description: "디자이너가 패브릭 및 가구의 맞춤 제작, 해외 배송 제품을 추천하는 경우 거래처의 교환/환불 규정, 최종 견적 금액 등의 내용을 상세히 안내하고, 이에 대한 내용을 증빙할 수 있는 자료를 가져야 합니다. ",
        },
        {
          description: "제품 구매에 소요되는 배송비, 조립 및 설치비를 고객에게 안내하여, 고객이 책임과 역할을 인지할 수 있도록 합니다.",
        },
        {
          description: "기존 사용 제품의 이동, 설치, 수리, 폐기 등 시공 현장에 필요한 제반 조치(민원해결 등)와 제품 구매에 소요되는 배송비, 조립 및 설치비 등을 사전에 고객에게 안내하여, 고객이 책임과 역할을 인지할 수 있도록 합니다.",
        }
      ]
    },
    {
      title: "촬영 및 컨텐츠",
      children: [
        {
          description: "홈스타일링 서비스가 완료되면 홈리에종, 디자이너와 고객은 일정을 조율하여 촬영하고 홈리에종은 촬영한 사진을 홍보에 활용할 권한이 있습니다.",
        },
        {
          description: "홈리에종은 고객과 디자이너의 인터뷰를 진행할 수 있습니다.",
        },
        {
          description: "디자이너는 해당 프로젝트 리뷰(포트폴리오)를 작성하여 홈리에종에 전달해야 하고, 홈리에종은 홍보용 콘텐츠에 사용할 수 있습니다.",
        },
        {
          description: "서비스를 이용한 고객은 홈리에종과 디자이너, 본인이 받은 서비스에 대한 후기를 남길 수 있습니다.",
        },
      ]
    },
    {
      title: "디자이너의 변경",
      children: [
        {
          description: "고객이 현장 미팅 후 디자이너 교체를 원하는 경우 1회에 한하여 재추천 후 변경이 가능합니다.",
        },
        {
          description: "프로젝트가 시작된 후 고객과 디자이너가 합의하기 어려울 정도의 분쟁이 있어 고객이 디자이너 교체를 요청할 경우 디자이너 변경을 진행할 수 있습니다.",
        },
      ]
    },
    {
      title: "홈스타일링 서비스 비용 책정 및 정산",
      children: [
        {
          title: "서비스 비용 책정",
          children: [
            {
              description: "홈리에종은 예산, 면적, 공간상태, 시공 및 스타일링 정도 등을 고려하여 상황과 디자이너의 용역 결과물의 수준에 맞는 디자인비(VAT별도)를 정합니다.",
            },
            {
              description: "동일 프로젝트의 디자이너별 디자인비는 각각 다르고 제공 가능한 서비스 범위, 제공 서비스의 정도와 수준, 디자인 결과물에 따른 인지도 및 선호도, 경력 등을 반영하여 정합니다.",
            },
            {
              description: "홈리에종은 필요한 경우 디자이너와 논의를 통해 디자인비를 조정할 수 있습니다.",
            },
            {
              description: "디자이너는 그 어떠한 이유로도 홈리에종에 위 제1) 항의 디자인비 이외의 금원을 요구할 수 없습니다.",
            }
          ]
        },
        {
          title: "고객의 결제",
          children: [
            {
              description: "홈스타일링 서비스의 계약금은 300,000(VAT별도)이며 고객이 계약금을 지불하면 디자이너와 대면 미팅을 할 수 있도록 안내합니다.",
            },
            {
              description: "고객은 디자이너와의 대면 미팅 후 계약금을 제외한 총액을 홈리에종에 지불합니다. 입금이 확인되면 고객의 프로젝트 진행을 확정합니다.",
            },
            {
              description: "홈스타일링 온라인 서비스는 계약금이 없이 전액 선불입니다.",
            }
          ]
        },
        {
          title: "용역 대금 보증 및 정산 방식",
          children: [
            {
              description: "고객과 디자이너의 상호 권리 보호를 위하여 용역 대금 보증 서비스를 진행하여 고객은 홈리에종에 용역 대금 총액을 선결제합니다.",
            },
            {
              description: "홈리에종은 프로젝트를 2단계로 나누고 프로젝트 진행 확정 후 선금 50%, 프로젝트 종료 확인 후 잔금 50%를 디자이너에게 정산합니다.",
            },
            {
              description: "고객의 프로젝트 진행 확정 여부는 총 용역 대금 입금 확인으로 정합니다.",
            },
            {
              description: "프로젝트 종료는 홈리에종이 디자이너와 고객 양측에 직접 결과를 확인한 후 확정합니다.",
              children: [
                {
                  description: "고객은 프로젝트 종료시, 홈리에종의 공식계정(카카오 플러스친구, 메일 등)을 통해 고객명, 디자이너명, 프로젝트 종료사실을 확인해주어야 합니다.",
                },
                {
                  description: "디자이너는 홈리에종에게 ①현장 촬영일정 ②프로젝트 리뷰(포트폴리오)를 발송함으로 프로젝트 종료를 확인해 주어야 합니다."
                }
              ]
            },
            {
              description: "온라인 서비스는 계약금, 대면 미팅이 없으므로 프로젝트 종료 후 일괄 정산합니다.",
            },
            {
              description: "고객과의 첫 대면 미팅 후 프로젝트 진행이 파기되는 경우 출장비 110,000원(VAT포함)을 디자이너에게 정산합니다.",
            },
            {
              description: "디자이너가 선택한 사업자 구분에 따라 정산방식이 달라집니다.",
              children: [
                {
                  title: "법인/개인(일반과세)",
                  description: "공급가에서 수수료를 제외한 금액 정산(VAT 별도)",
                },
                {
                  title: "개인(간이과세)",
                  description: "공급가에서 수수료를 제외한 금액 정산",
                },
                {
                  title: "프리랜서",
                  description: "공급가에서 수수료를 제외한 금액 정산(원천세 별도)",
                },
              ]
            },
            {
              description: "법인/개인(일반과세) 사업자의 경우 세금계산서를, 개인(간이과세) 사업자의 경우 현금영수증을 발행해야 합니다.",
            },
            {
              description: "계약 관련하여 관계 법령이나 이 계약의 위반을 포함한 서비스 이행에 문제가 발생한 경우 홈리에종은 해결시까지 대금지급을 보류할 수 있습니다.",
            }
          ]
        },
        {
          title: "수수료",
          children: [
            {
              description: "홈리에종의 연계 수수료는 20% ~ 30%로 디자이너별로 다르게 정합니다.",
            },
            {
              description: "신진 디자이너와 홈스타일링 영역으로의 확장을 원하는 디자이너의 시장 진입을 위해 홈리에종이 교육 및 지원하는 경우 30% ~ 50%의 수수료를 요청할 수 있습니다.",
            },
            {
              description: "서비스 제공시 홈리에종의 관여도, 홈리에종과의 협업 기간, 협업 횟수, 협업을 진행하면서 형성된 서비스 및 디자인의 질에 대한 신뢰, 디자이너별 특징 등을 기준으로 정합니다.",
            },
            {
              description: "홈리에종을 통해 연결된 시공의 경우, 총 시공견적의 5% 금액을 수수료로 정합니다.",
            },
            {
              description: "수수료는 향후 재조정될 수 있습니다.",
            }
          ]
        }
      ]
    },
    {
      title: "계약의 해제 및 해지",
      children: [
        {
          description: "디자이너가 아래 각 호를 위반한 경우 고객이 디자이너에게 그에 대한 시정을 최고하고 그럼에도 불구하고 시정되지 않을 시에는 고객은 계약을 해지할 수 있습니다.",
          children: [
            {
              description: "디자이너가 계약의 이행을 30일 이상 지체한 경우",
            },
            {
              description: "디자이너의 귀책 사유로 인하여 홈스타일링 작업이 30일 이상 중단된 경우",
            }
          ]
        },
        {
          description: "다음 각 호에 의한 경우 디자이너는 계약을 해지할 수 있습니다.",
          children: [
            {
              description: "고객이 확인 과정을 통해서 발주 또는 제작이 진행되는 중 계속하여 변심하는 경우",
            },
            {
              description: "고객이 해결할 수 없는 문제에 대하여 계속적으로 시정을 요구하는 경우",
            },
            {
              description: "고객이 기한 내 디자이너가 작업을 수행할 수 있는 여건을 제공하지 않는 경우",
            },
          ]
        },
        {
          description: "고객의 단순 변심 내지는 귀책 사유에 의해 계약이 해지되는 경우 홈리에종은 지급하여야 하는 금액에서 아래 기준에 따라 디자이너에게 정산합니다.",
          children: [
            {
              title: "계약 기간의 30% 이내",
              description: "기 지급 용역대금 중 60% 제외한 금액 반환",
            },
            {
              title: "계약 기간의 50% 이내",
              description: "기 지급 용역대금으로 정산 종결",
            },
            {
              title: "계약 기간의 50% 이상",
              description: "계약기간을 일할 정산하여 지급함",
            },
          ]
        },
        {
          description: "디자이너의 귀책 사유에 의해 해직되는 경우에는 디자이너는 홈리에종으로부터 6기지급용역대금 중 제 1회 출장료를 제외한 금액을 해지일로부터 3일 이내에 홈리에종에 반환하여야 합니다.",
        },
        {
          description: "본 계약서 및 안내 사항을 숙지하지 못하여 발생하는 문제에 대하여는 디자이너가 책임지고 홈리에종에는 책임이 없습니다.",
        },
        {
          description: "계약이 해제 또는 해지될 경우 책임이 있는 일방은 상대방의 손해를 배상할 책임이 있습니다. 단 천재 지변 등 불가항력 사유로 인한 경우에는 배상 책임을 면제합니다. 사. 고객의 취소, 환불, 변경 요청이 많은 디자이너의 경우 추후 수수료 책정에 영향을 줄 수 있습니다.",
        },
      ]
    },
    {
      title: "특별 상품 및 서비스 기획",
      children: [
        {
          description: "홈리에종과 디자이너는 일반적으로 제공하는 상품 및 서비스 외에 별도의 상품 및 서비스를 함께 기획하여 제공할 수 있습니다. 해당 건의 진행 과정 및 결과에서 생산된 모든 결과물들은 홈리에종에 귀속합니다.",
        },
        {
          description: "해당 기획 건의 진행 과정 및 결과에서 생산되는 원저작물, 콘텐츠 등의 2차적 저작물과 편집 저작물의 사용 및 활용 권한은 홈리에종에 귀속합니다.",
        },
        {
          description: "해당 기획 상품 및 서비스에 대한 판권은 100% 홈리에종에 있습니다. 타 서비스 또는 경쟁업체에서 동일 상품 및 서비스를 거래할 수 없습니다.",
        }
      ]
    },
    {
      title: "포트폴리오 활용",
      children: [
        {
          title: "포트폴리오의 제공",
          description: "최초 협업 시 디자이너의 스타일을 가장 잘 나타낼 수 있는 포트폴리오 1개 이상을 홈리에종에 제공합니다.",
          children: [
            {
              description: "최소 가로 800px 이상, 가능한 원본 파일을 제공합니다.",
            },
            {
              description: "워터마크 삽입, 필터 작업을 하지 않은 원본 파일을 제공합니다.",
            },
            {
              description: "이 후 주기적으로 최신 포트폴리오를 추가 요청할 수 있습니다.",
            },
          ]
        },
        {
          title: "포트폴리오의 사용",
          children: [
            {
              description: "디자이너의 포트폴리오는 홈리에종 웹사이트 및 SNS 채널에 노출하며 고객 제안 및 디자이너 브랜딩 용도로 사용합니다.",
            },
            {
              description: "제공 포트폴리오가 아니어도 고객 제안시 디자이너의 개인 채널에서 가져와 사용할 수 있으며 이는 비공개로 사용합니다.",
            },
            {
              description: "홈리에종 포트폴리오가 아니어도 웹사이트, SNS채널, 고객제안 등을 위해 사용할 수 있으며 이 경우 디자이너에게 사전에 동의여부를 확인합니다.",
            },
          ]
        },
        {
          title: "포트폴리오 사용 정지",
          children: [
            {
              description: "홈리에종과 협업 관계를 해지하는 경우 해당 디자이너의 개인 정보와 포트폴리오를 삭제할 수 있습니다.",
            },
            {
              description: "협업 관계를 해지하더라도 홈리에종 연결 프로젝트의 결과물은 홈리에종에서 영구적, 배타적 사용권이 있습니다.",
            },
          ]
        },
        {
          title: "홈리에종 프로젝트의 포트폴리오",
          children: [
            {
              description: "홈리에종 프로젝트의 경우 홈리에종이 촬영 할 수 있습니다. 촬영한 원저작물은 콘텐츠 등의 2차적 저작물과 편집 저작물로 사용 및 활용이 가능하며, 모든 결과물은 홈리에종에 귀속합니다. 홈리에종이 촬영하지 않은 경우 디자이너가 촬영하여 사진을 공유합니다.",
            },
            {
              description: "홈리에종이 촬영한 이미지의 제공",
              children: [
                {
                  description: "가로 사이즈 800px 이하의 사진은 홈리에종 로고를 삽입하여 기본 제공합니다.",
                },
                {
                  description: "가로 사이즈 1200px 이상의 사진은 유료로 제공합니다.",
                },
                {
                  description: "최초 협업 프로젝트에 한하여 홈리에종 촬영 및 보정본을 무료로 제공합니다.",
                }
              ]
            }
          ]
        },
        {
          title: "이미지의 활용",
          children: [
            {
              description: "홈리에종 프로젝트를 디자이너 개인 채널에 게시할 경우 ① 홈리에종에서 제공받은 사진 사용 ② 홈리에종 링크 삽입 ③ 홈리에종 협업 사실 명시 ④ 해시태그를 필수로 게시해야 합니다.",
            },
            {
              description: "만약 홈리에종과의 협업 사실 명시로 인하여 타 채널 활용(예: 네이버 리빙, 오늘의 집, 집꾸미기, 숨고 등)이 불가할 경우에도 위의 내용은 삭제할 수 없습니다.",
            }
          ]
        }
      ]
    },
    {
      title: "홈리에종의 책임과 의무",
      children: [
        {
          description: "홈리에종은 고객이 가장 마음에 드는 디자이너 1명을 정한 뒤 계약금(330,000원 정액, 온라인 스타일링인 경우에는 용역 대금 전액) 을 입금한 경우 디자이너와의 미팅을 주선합니다.",
        },
        {
          description: "홈리에종은 고객과 디자이너의 의견을 조율하여 현장 미팅 일정을 정하고, 개인 정보(이름, 연락처 등) 를 상호간에 전달합니다.",
        },
        {
          description: "홈리에종은 고객의 정보(기본정보, 선호이미지, 요청사항 등) 및 상담 과정의 내용을 정리하여 디자이너에게 전달합니다.",
        },
        {
          description: "홈리에종은 홈스타일링의 대중화를 위해 다양한 활동을 진행합니다.",
          children: [
            {
              description: "언론홍보, 출판, SNS 및 온라인을 통해 일관성 있는 메시지를 전달합니다.",
            },
            {
              description: "홈스타일링의 특징과 프로세스, 합리적인 시장 가격 형성을 위해 노력합니다.",
            }
          ]
        },
        {
          description: "홈리에종은 시장 활성화와 디자이너의 역량 강화를 위해 활동하고 협업 디자이너와 공유합니다.",
          children: [
            {
              description: "전문가 및 일반 고객에게 최상의 서비스를 제공하기 위해 지속적인 성장을 추구합니다.",
            },
            {
              description: "서비스 품질 관리 및 디자이너 역량 강화를 위한 다양한 교육, 세미나, 네트워킹을 진행합니다.",
            },
            {
              description: "더 나은 수익 창출을 위해 디자이너와 신규 프로젝트를 기획할 수 있습니다.",
            },
            {
              description: "일반 고객 만족도 향상을 위해 프로젝트 관리에 관여합니다.",
            },
            {
              description: "홈리에종은 협업 디자이너에게 유/무료 제휴 서비스를 다양하게 제공하고 관련 정보와 협력업체 네트워크를 공유합니다.",
            }
          ]
        },
        {
          description: "홈리에종은 디자이너 전문가 그룹을 지향하며 디자이너 권리 보호에 앞장섭니다.",
          children: [
            {
              description: "디자인비를 선금으로 받아 디자이너가 잔금을 결제받지 못하는 경우가 없도록 합니다.",
            },
            {
              description: "프로젝트 진행시 디자이너와 고객 사이에 문제가 있을 경우 이를 중재합니다. 고객의 무리한 요구가 지속되지 않도록 디자이너를 보호합니다.",
            },
            {
              description: "디자이너의 지적 재산을 무료로 판매하는 저가형 시장과 차별화합니다.",
            }
          ]
        },
        {
          description: "홈리에종은 디자이너가 제공하는 서비스의 마케팅, 디자이너의 경력/인지도/ 인기도에 따라 개인 브랜딩 활동(포트폴리오 재가공 외)을 진행합니다.",
          children: [
            {
              description: "홈리에종은 O2O 플랫폼으로 디자이너 연결을 위한 마케팅을 진행합니다.",
            },
            {
              description: "마케팅을 위해 홈리에종의 웹사이트와 SNS채널을 적극 활용합니다.",
            }
          ]
        }
      ]
    },
    {
      title: "디자이너의 책임과 의무",
      children: [
        {
          description: "홈리에종에서 제공하는 홈스타일링의 개념, 기본 서식, 프로세스 등 정책을 충분히 이해하고 준수합니다.",
        },
        {
          description: "개인 또는 타업체에서 의뢰한 고객과 동등한 또는 상향된 수준의 서비스를 제공합니다.",
        },
        {
          description: "프로젝트 진행시 촬영, 인터뷰, 컨텐츠 사용 동의에 대해서 고객에게 충분히 설명합니다.",
        },
        {
          description: "고객에게 서비스를 제공하는 과정에서 홈리에종과 고객의 신뢰와 기대에 어긋나는 언행은 하지 않습니다.",
        },
        {
          description: "홈리에종에게 이미 의뢰한 고객에게 개인적으로 접촉하여 계약하는 것은 금지합니다.",
        },
        {
          description: "홈리에종으로부터 고객 정보를 받은 고객이 개인채널로 별도 문의할 경우 이미 홈리에종을 통해서 일정 및 서비스 금액을 논의중이라는 것과 홈리에종 서비스의 특징을 잘 설명한 후 협약에 근거하여 홈리에종을 통해서 계약을 진행할 수 있도록 안내합니다.",
        },
        {
          description: "유사 서비스를 제공하는 업체(홈디 등) 및 경쟁업체와 계약할 수 없습니다.",
        },
        {
          description: "홈리에종과 디자이너는 상호 신뢰하에 협업하고, 원활한 진행을 위해 필요한 정보(개인 정보, 포트폴리오, 정기적 서비스 가능 일정 등)를 최대한 협조적으로 공유합니다.",
        },
        {
          description: "홈리에종이 주관하는 교육, 세미나, 네트워킹 등에 적극 참여합니다.",
        },
        {
          description: "디자이너의 사정으로 서비스 제공이 불가하거나 그에 상응하는 변경 사항이 발생할 경우 5영업일 이내에 홈리에종에 반드시 통지합니다. 이를 위반할 경우 홈리에종에 발생한 모든 손해에 대하여 디자이너가 일체의 책임을 집니다.",
        },
        {
          description: "계약의 모든 사항은 계약 기간 및 계약 종료 후에도 기밀이며 서비스를 진행하며 알게 된 시설,영업 비밀, 지적 재산, 고객에 대한 어떠한 정보도 상호간의 동의를 얻지 않고 외부로 유출 및 공개하거나 고유 목적 이외의 용도로 사용할 수 없습니다.",
        }
      ]
    },
    {
      title: "계약의 변경 및 합의 해지",
      children: [
        {
          title: "계약 내용의 변경",
          children: [
            {
              description: "정책 또는 계약의 세부사항은 필요에 따라 변경될 수 있습니다.",
            },
            {
              description: "변경시에는 변경사항에 대한 안내를 사전에 진행합니다.",
            },
            {
              description: "홈리에종과 디자이너간 상호 협의 후 변경합니다.",
            },
          ]
        },
        {
          title: "계약의 해지",
          children: [
            {
              description: "상호 협의 후 계약의 해지가 가능합니다.",
            },
            {
              description: "계약 해지 의사가 있을 경우 1개월 전에 협의를 통해 결정해야 합니다.",
            },
            {
              description: "진행 중 프로젝트가 있을 시 완료될 때까지 계약은 해지되지 않습니다.",
            },
          ]
        }
      ]
    },
    {
      title: "권리 / 책임과 의무의 양도 금지",
      description: "홈리에종과 사전 서면 동의 없이 본 계약에 따르는 권리와 의무를 제 3자에게 양도, 이전, 담보제공, 업무의 위임 등을 할 수 없습니다.",
    },
    {
      title: "비밀유지서약",
      description: "홈리에종의 각종 문서 서식과 정책 사항을 위부로 유출할 수 없습니다. 이로 인해 홈리에종의 이미지에 타격이 있거나 경제적 손실이 발생하는 경우 계약을 파기하고, 추정되는 손실 금액을 배상합니다.",
    },
    {
      title: "지식재산권",
      children: [
        {
          description: "홈리에종의 저작물에 대한 저작권 및 소유권은 홈리에종에 속하고, 디자이너는 계약에서 합의한 용도 이외의 목적으로 홈리에종의 지식 재산을 사용할 수 없습니다.",
        },
        {
          description: "홈리에종은 계약의 이행을 위하여 필요한 범위에 한하여 디자이너의 지식 재산을 사용할 수 있습니다. 디자이너의 원저작물을 2차적 저작물 및 편집저작물로 사용 및 활용 할 수 있고, 진행 과정에서 나온 2차적 저작물 및 편집저작물은 홈리에종에 귀속합니다.",
        }
      ]
    },
    {
      title: "손해배상",
      children: [
        {
          description: "디자이너가 프로젝트 진행 이후 업무를 수행하지 못하거나 지연되어 홈리에종 또는 고객이 손해를 입는 경우 이를 배상하여야 하고 업무 지연에 책임져야 합니다.",
        },
        {
          description: "디자이너가 업무 수행 중 디자이너의 귀책 사유로 인하여 결과물 및 제 3자에 대하여 손해를 발생시킨 경우 그 배상에 대한 책임을 부담합니다.",
        },
        {
          description: "민원 처리에 있어 디자이너의 중요 귀책 사유가 발견될 경우 해당 민원에 대한 처리 및 관련하여 발생되는 비용과 손해에 대해서는 디자이너의 책임으로 합니다.",
        },
        {
          description: "홈리에종과 디자이너가 협의 하에 다양한 신규 프로젝트를 진행하는 경우 해당 프로젝트의 조건에 따르되 문제가 있는 경우 귀책 사유가 있는 자의 부담으로 하고 책임 소재가 불명확한 경우에는 디자이너와 홈리에종이 협의하여 비율대로 비용을 분담합니다.",
        },
        {
          description: "천재지변, 기타 불가항력적인 사유로 인하여 발생한 손해에 대해서는 상호 책임을 물을 수 없습니다.",
        },
      ]
    },
    {
      title: "분쟁의 해결 및 관할",
      children: [
        {
          description: "계약의 당사자는 본 계약의 내용을 신의 성실에 의거하여 준수하여야 합니다. 계약 기간 중 계약의 변경은 당사자의 서면 합의에 의해서만 변경될 수 있으며 서면 날인 된 문서를 본 계약서에 첨부하고, 본 계약서에서 명시되지 않은 부분에 대하여는 관련 법규 및 상관습에 따르기로 합니다.",
        },
        {
          description: "본 계약과 관련하여 양 당사자간의 분쟁이 발생한 경우, 원칙적으로 디자이너와 고객간의 합의에 의해 해결합니다. 그럼에도 불구하고 분쟁이 해결되지 않을 경우 ‘을’의 주소지 관할 지방 법원을 그 관할 법원으로 합니다.",
        }
      ]
    },
  ];

  return contents;
}

DesignManualJs.prototype.insertInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "디자이너 가이드";
  subTitleContents = "홈리에종 프로젝트 디자이너 매뉴얼";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignManualJs.prototype.insertProcessBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let mobileVisualPaddingValue;
  let numberRight;
  let titleTopNumber;
  let titleTop;
  let titleBottom;
  let contentsAreaPaddingTop;
  let mobileTitleLeft;
  let mobileTitleTop;
  let mobilePaddingLeft;
  let mobileInnerPaddingBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 6 %%>;

  innerMargin = <%% 0, 0, 0, 0, 1 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 40 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 12 %%>;

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  textSize = <%% 16, 14, 13, 11, 3.3 %%>;
  textWeight = <%% 800, 800, 800, 800, 800 %%>;
  textMarginLeft = <%% 50, 48, 45, 30, 3 %%>;

  mobileVisualPaddingValue = 0.2;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;
  mobilePaddingLeft = 6;
  mobileInnerPaddingBottom = 8;

  contents = {
    process: this.contents,
  };

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  if (desktop) {
    createNode({
      mother: whiteTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
      },
      children: [
        {
          style: {
            display: "block",
            position: mobile ? "absolute" : "relative",
            left: desktop ? "" : String(mobileTitleLeft) + ea,
            top: desktop ? "" : String(mobileTitleTop) + ea,
            width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
            marginBottom: String(titleBottom) + ea,
            zIndex: mobile ? String(1) : "",
          },
          children: [
            {
              text: "프로세스별 체크리스트",
              event: {
                selectstart: (e) => { e.preventDefault() },
              },
              style: {
                position: "relative",
                display: "inline-block",
                top: String(titleTopNumber) + ea,
                fontSize: String(titleFontSize) + ea,
                fontWeight: String(600),
                background: desktop ? colorChip.white : colorChip.gray1,
                paddingRight: String(numberRight) + ea,
                color: colorChip.black,
              }
            },
          ]
        },
        {
          style: {
            display: "block",
            position: "relative",
            width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
            background: desktop ? "" : colorChip.white,
            boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
            borderRadius: mobile ? String(1) + ea : "",
            overflow: "hidden",
            marginBottom: String(0) + ea,
            marginTop: desktop ? "" : String(14) + ea,
            paddingTop: String(contentsAreaPaddingTop) + ea,
            borderTop: desktop ? "1px solid " + colorChip.shadow : "",
            paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
            paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
            paddingBottom: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
          }
        },
      ]
    });
  }

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  for (let i = 0; i < contents.process.length; i++) {
    createNode({
      mother: grayTong,
      class: [ buttonsClassName ],
      attribute: {
        index: String(i),
        key: contents.process[i].key,
        toggle: "off",
      },
      event: {
        mouseenter: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.green;
          } else {
            this.children[1].style.color = colorChip.white;
          }

        },
        mouseleave: function (e) {
          e.stopPropagation();
          e.preventDefault();

          const toggle = this.getAttribute("toggle");
          if (toggle === "off") {
            this.children[1].style.color = colorChip.black;
          } else {
            this.children[1].style.color = colorChip.white;
          }

        },
        click: function (e) {
          e.stopPropagation();

          const key = this.getAttribute("key");
          const target = instance.whiteBlocks.find((dom) => { return dom.getAttribute("key") === key });
          const siblings = [ ...document.querySelectorAll('.' + buttonsClassName) ];
          let sNum;

          sNum = 0;
          for (let dom of siblings) {
            if (dom !== this) {
              dom.setAttribute("toggle", "off");
              dom.children[0].querySelector("path").setAttribute("fill", sNum % 2 === 0 ? colorChip.gray3 : colorChip.gray1);
              dom.children[1].style.color = colorChip.black;
            } else {
              dom.setAttribute("toggle", "on");
              dom.children[0].querySelector("path").setAttribute("fill", colorChip.green);
              dom.children[1].style.color = colorChip.white;
            }
            sNum++;
          }

          for (let dom of instance.whiteBlocks) {
            if (dom !== target) {
              dom.setAttribute("toggle", "off");
              dom.style.display = "none";
            } else {
              dom.setAttribute("toggle", "on");
              dom.style.display = "block";
            }
          }

        }
      },
      style: {
        display: "inline-flex",
        position: "relative",
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(100% - " + String(arrowBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
        marginBottom: desktop ? "" : String(arrowBetween) + ea,
        height: String(arrowHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.1s ease",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, (i % 2 === 0 ? colorChip.gray3 : colorChip.gray1)),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
          }
        },
        {
          event: {
            selectstart: function (e) {
              e.preventDefault();
            }
          },
          text: contents.process[i].title,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            marginLeft: String(textMarginLeft) + ea,
          }
        }
      ]
    });
  }

  if (mobile) {
    createNode({
      mother: grayTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: desktop ? "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")" : "calc(calc(100% - " + String(arrowBetween * (2 - 1)) + ea + ") / " + String(2) + ")",
        marginBottom: desktop ? "" : String(arrowBetween) + ea,
        height: String(arrowHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.gray1),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
            opacity: String(0.9),
          }
        },
        {
          event: {
            selectstart: function (e) {
              e.preventDefault();
            }
          },
          text: "현장 완료",
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(textSize) + ea,
            fontWeight: String(textWeight),
            color: colorChip.black,
            marginLeft: String(textMarginLeft) + ea,
          }
        }
      ]
    });
  }

}

DesignManualJs.prototype.insertEducationBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media, totalContents, naviHeight } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const big = (media[0] || media[1] || media[2]);
  const small = !big;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, removeByClass, downloadFile, equalJson } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  const educationImageClassName = "educationImageClassName";
  const bigPhotoImageClassName = "bigPhotoImageClassName";
  const bigPhotoImageTargetClassName = "bigPhotoImageTargetClassName";
  let margin;
  let paddingTop;
  let whiteBottomMargin;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let contents;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let mobileVisualPaddingValue;
  let imageTong;
  let buttonsTong;
  let slideSource;
  let bigPhotoEvent;
  let zIndex;
  let ratio;
  let bigWidth, bigHeight;
  let widthRatio;
  let leftArrow, rightArrow;
  let bigArrowHeight;
  let bigArrowMargin;
  let heightVisual;
  let heightRatio;
  let rightArrowBox;
  let downloadSource;
  let initialVisualConst;
  let imageBasePadding;
  let imageBasePaddingBase;
  let mainImageHeight;
  let buttonsTongHeight;
  let buttonCircleWidth;
  let buttonCircleBetween;
  let buttonArrowWidth, buttonArrowVisual;
  let entireArrowWidth, entireArrowVisual;
  let downloadArrowWidth, downloadArrowVisual;
  let slideSourceMother;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop = <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 55, 55, 47, 39, 3 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 0, 0, 0, 0, 0 %%>;

  arrowBetween = <%% 5, 5, 5, 3, 1 %%>;
  arrowWidth = <%% 214, 160, 138, 109, 40 %%>;
  arrowHeight = <%% 100, 90, 80, 60, 12 %%>;

  textTop = <%% (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), (isMac() ? -2 : 0), -0.3 %%>;
  textSize = <%% 16, 14, 13, 11, 3.3 %%>;
  textWeight = <%% 800, 800, 800, 800, 800 %%>;
  textMarginLeft = <%% 50, 48, 45, 30, 3 %%>;

  imageBasePadding = <%% 45, 25, 10, 40, 0 %%>;
  imageBasePaddingBase = <%% 25, 10, 3, 20, 0 %%>;

  mainImageHeight = <%% 675, 500, 440, 632, 96.6 %%>;

  buttonsTongHeight = <%% 80, 72, 54, 54, 12 %%>;
  buttonCircleWidth = <%% 34, 32, 28, 28, 5.8 %%>;

  buttonCircleBetween = <%% 6, 6, 5, 5, 1 %%>;

  buttonArrowWidth = <%% 15, 14, 12, 12, 2.4 %%>;
  buttonArrowVisual = <%% 5, 5, 4, 4, 0.8 %%>;

  entireArrowWidth = <%% 16, 16, 14, 13, 2.6 %%>;
  entireArrowVisual = <%% 0, 0, 0, 0, 0 %%>;

  downloadArrowWidth = <%% 19, 19, 17, 17, 3.2 %%>;
  downloadArrowVisual = <%% -1, -1, -1, -1, -0.2 %%>;

  mobileVisualPaddingValue = 0.2;

  zIndex = 4;
  ratio = <%% (1920 / 1080), (1920 / 1080), (1920 / 1080), (960 / 1080), (960 / 1080) %%>;
  widthRatio = <%% 0.92, 0.92, 0.92, 0.9, 0.88 %%>;
  heightRatio = 0.9;

  bigArrowHeight = <%% 1.5, 1.4, 1.1, 1, 1 %%>;
  bigArrowMargin = <%% 48, 36, 28, 30, 18 %%>;
  heightVisual = 20;

  initialVisualConst = 20;

  slideSourceMother = {
    desktop: [
      DesignManualJs.binaryPath + "/education/education_desktop_title.png",
      DesignManualJs.binaryPath + "/education/education_desktop_0.png",
      DesignManualJs.binaryPath + "/education/education_desktop_1.png",
      DesignManualJs.binaryPath + "/education/education_desktop_2.png",
      DesignManualJs.binaryPath + "/education/education_desktop_3.png",
      DesignManualJs.binaryPath + "/education/education_desktop_4.png",
      DesignManualJs.binaryPath + "/education/education_desktop_5.png",
      DesignManualJs.binaryPath + "/education/education_desktop_6.png",
      DesignManualJs.binaryPath + "/education/education_desktop_7.png",
      DesignManualJs.binaryPath + "/education/education_desktop_8.png",
      DesignManualJs.binaryPath + "/education/education_desktop_9.png",
      DesignManualJs.binaryPath + "/education/education_desktop_10.png",
      DesignManualJs.binaryPath + "/education/education_desktop_11.png",
      DesignManualJs.binaryPath + "/education/education_desktop_12.png",
      DesignManualJs.binaryPath + "/education/education_desktop_13.png",
      DesignManualJs.binaryPath + "/education/education_desktop_14.png",
      DesignManualJs.binaryPath + "/education/education_desktop_15.png",
      DesignManualJs.binaryPath + "/education/education_desktop_16.png",
      DesignManualJs.binaryPath + "/education/education_desktop_17.png",
      DesignManualJs.binaryPath + "/education/education_desktop_18.png",
      DesignManualJs.binaryPath + "/education/education_desktop_19.png",
      DesignManualJs.binaryPath + "/education/education_desktop_20.png",
      DesignManualJs.binaryPath + "/education/education_desktop_21.png",
      DesignManualJs.binaryPath + "/education/education_desktop_22.png",
      DesignManualJs.binaryPath + "/education/education_desktop_23.png",
      DesignManualJs.binaryPath + "/education/education_desktop_24.png",
      DesignManualJs.binaryPath + "/education/education_desktop_25.png",
      DesignManualJs.binaryPath + "/education/education_desktop_26.png",
      DesignManualJs.binaryPath + "/education/education_desktop_27.png",
      DesignManualJs.binaryPath + "/education/education_desktop_28.png",
    ],
    tablet: [
      DesignManualJs.binaryPath + "/education/education_tablet_title.png",
      DesignManualJs.binaryPath + "/education/education_tablet_0.png",
      DesignManualJs.binaryPath + "/education/education_tablet_1.png",
      DesignManualJs.binaryPath + "/education/education_tablet_2.png",
      DesignManualJs.binaryPath + "/education/education_tablet_3.png",
      DesignManualJs.binaryPath + "/education/education_tablet_4.png",
      DesignManualJs.binaryPath + "/education/education_tablet_5.png",
      DesignManualJs.binaryPath + "/education/education_tablet_6.png",
      DesignManualJs.binaryPath + "/education/education_tablet_7.png",
      DesignManualJs.binaryPath + "/education/education_tablet_8.png",
      DesignManualJs.binaryPath + "/education/education_tablet_9.png",
      DesignManualJs.binaryPath + "/education/education_tablet_10.png",
      DesignManualJs.binaryPath + "/education/education_tablet_11.png",
      DesignManualJs.binaryPath + "/education/education_tablet_12.png",
      DesignManualJs.binaryPath + "/education/education_tablet_13.png",
      DesignManualJs.binaryPath + "/education/education_tablet_14.png",
      DesignManualJs.binaryPath + "/education/education_tablet_15.png",
      DesignManualJs.binaryPath + "/education/education_tablet_16.png",
      DesignManualJs.binaryPath + "/education/education_tablet_17.png",
      DesignManualJs.binaryPath + "/education/education_tablet_18.png",
      DesignManualJs.binaryPath + "/education/education_tablet_19.png",
      DesignManualJs.binaryPath + "/education/education_tablet_20.png",
      DesignManualJs.binaryPath + "/education/education_tablet_21.png",
      DesignManualJs.binaryPath + "/education/education_tablet_22.png",
      DesignManualJs.binaryPath + "/education/education_tablet_23.png",
      DesignManualJs.binaryPath + "/education/education_tablet_24.png",
      DesignManualJs.binaryPath + "/education/education_tablet_25.png",
      DesignManualJs.binaryPath + "/education/education_tablet_26.png",
      DesignManualJs.binaryPath + "/education/education_tablet_27.png",
      DesignManualJs.binaryPath + "/education/education_tablet_28.png",
      DesignManualJs.binaryPath + "/education/education_tablet_29.png",
      DesignManualJs.binaryPath + "/education/education_tablet_30.png",
      DesignManualJs.binaryPath + "/education/education_tablet_31.png",
      DesignManualJs.binaryPath + "/education/education_tablet_32.png",
      DesignManualJs.binaryPath + "/education/education_tablet_33.png",
      DesignManualJs.binaryPath + "/education/education_tablet_34.png",
      DesignManualJs.binaryPath + "/education/education_tablet_35.png",
      DesignManualJs.binaryPath + "/education/education_tablet_36.png",
    ],
    mobile: [
      DesignManualJs.binaryPath + "/education/education_mobile_title.png",
      DesignManualJs.binaryPath + "/education/education_mobile_0.png",
      DesignManualJs.binaryPath + "/education/education_mobile_1.png",
      DesignManualJs.binaryPath + "/education/education_mobile_2.png",
      DesignManualJs.binaryPath + "/education/education_mobile_3.png",
      DesignManualJs.binaryPath + "/education/education_mobile_4.png",
      DesignManualJs.binaryPath + "/education/education_mobile_5.png",
      DesignManualJs.binaryPath + "/education/education_mobile_6.png",
      DesignManualJs.binaryPath + "/education/education_mobile_7.png",
      DesignManualJs.binaryPath + "/education/education_mobile_8.png",
      DesignManualJs.binaryPath + "/education/education_mobile_9.png",
      DesignManualJs.binaryPath + "/education/education_mobile_10.png",
      DesignManualJs.binaryPath + "/education/education_mobile_11.png",
      DesignManualJs.binaryPath + "/education/education_mobile_12.png",
      DesignManualJs.binaryPath + "/education/education_mobile_13.png",
      DesignManualJs.binaryPath + "/education/education_mobile_14.png",
      DesignManualJs.binaryPath + "/education/education_mobile_15.png",
      DesignManualJs.binaryPath + "/education/education_mobile_16.png",
      DesignManualJs.binaryPath + "/education/education_mobile_17.png",
      DesignManualJs.binaryPath + "/education/education_mobile_18.png",
      DesignManualJs.binaryPath + "/education/education_mobile_19.png",
      DesignManualJs.binaryPath + "/education/education_mobile_20.png",
      DesignManualJs.binaryPath + "/education/education_mobile_21.png",
      DesignManualJs.binaryPath + "/education/education_mobile_22.png",
      DesignManualJs.binaryPath + "/education/education_mobile_23.png",
      DesignManualJs.binaryPath + "/education/education_mobile_24.png",
      DesignManualJs.binaryPath + "/education/education_mobile_25.png",
      DesignManualJs.binaryPath + "/education/education_mobile_26.png",
      DesignManualJs.binaryPath + "/education/education_mobile_27.png",
      DesignManualJs.binaryPath + "/education/education_mobile_28.png",
      DesignManualJs.binaryPath + "/education/education_mobile_29.png",
      DesignManualJs.binaryPath + "/education/education_mobile_30.png",
      DesignManualJs.binaryPath + "/education/education_mobile_31.png",
      DesignManualJs.binaryPath + "/education/education_mobile_32.png",
      DesignManualJs.binaryPath + "/education/education_mobile_33.png",
      DesignManualJs.binaryPath + "/education/education_mobile_34.png",
      DesignManualJs.binaryPath + "/education/education_mobile_35.png",
      DesignManualJs.binaryPath + "/education/education_mobile_36.png",
    ]
  }

  if (big) {
    slideSource = equalJson(JSON.stringify(slideSourceMother.desktop));
    downloadSource = DesignManualJs.binaryPath + "/education/education_desktop_download.pdf";
  } else {
    if (desktop) {
      slideSource = equalJson(JSON.stringify(slideSourceMother.tablet));
    } else {
      slideSource = equalJson(JSON.stringify(slideSourceMother.mobile));
    }
    downloadSource = DesignManualJs.binaryPath + "/education/education_tablet_download.pdf";
  }

  bigPhotoEvent = function (e) {
    const target = document.querySelector('.' + educationImageClassName);
    const current = Number(target.getAttribute("index"));
    const total = Number(target.getAttribute("length"));

    bigWidth = window.innerWidth * widthRatio;
    bigHeight = (window.innerWidth * widthRatio) / ratio;

    if (bigHeight >= (window.innerHeight - naviHeight) - heightVisual) {
      bigHeight = (window.innerHeight - naviHeight) * heightRatio;
      bigWidth = bigHeight * ratio;
    }

    createNode({
      mother: totalContents,
      class: [ bigPhotoImageClassName ],
      events: [
        {
          type: "click",
          event: function (e) {
            removeByClass(bigPhotoImageClassName);
          }
        }
      ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: String(100) + '%',
        background: colorChip.black,
        zIndex: String(zIndex),
        animation: "justfadeineight 0.2s ease forwards",
      }
    });

    createNode({
      mother: totalContents,
      class: [ bigPhotoImageClassName, bigPhotoImageTargetClassName ],
      attribute: [
        { index: String(current) },
        { length: String(total) },
      ],
      style: {
        position: "fixed",
        top: "calc(" + String(naviHeight) + "px" + " + calc(calc(calc(100% - " + String(naviHeight) + "px" + ") / 2) - " + String(bigHeight / 2) + "px" + "))",
        left: withOut(50, bigWidth / 2, "px"),
        width: String(bigWidth) + "px",
        height: String(bigHeight) + "px",
        zIndex: String(zIndex),
        borderRadius: String(3) + "px",
        transition: "all 0s ease",
        backgroundSize: "100% auto",
        backgroundPosition: "50% 50%",
        backgroundImage: "url('" + (desktop ? slideSource[current] : slideSourceMother.tablet[current]) + "')"
      }
    });

    leftArrow = createNode({
      mother: totalContents,
      events: [
        {
          type: [ "dblclick", "selectstart" ],
          event: (e) => {
            e.stopPropagation();
            e.preventDefault();
          }
        },
        {
          type: "click",
          event: function (e) {
            const target = document.querySelector('.' + bigPhotoImageTargetClassName);
            const current = Number(target.getAttribute("index"));
            const total = Number(target.getAttribute("length"));
            let next;
            next = current - 1;
            if (next < 0) {
              next = total - 1;
            }
            target.style.backgroundImage = "url('" + (desktop ? slideSource[next] : slideSourceMother.tablet[next]) + "')";
            target.setAttribute("index", String(next));
          }
        },
      ],
      attribute: [
        { direction: "left" }
      ],
      class: [ bigPhotoImageClassName ],
      mode: "svg",
      source: svgMaker.buttonArrow("left", colorChip.whiteBlack),
      style: {
        position: "fixed",
        top: "calc(" + String(naviHeight) + "px" + " + calc(calc(calc(100% - " + String(naviHeight) + "px" + ") / 2) - " + String(bigArrowHeight / 2) + "vh" + "))",
        left: withOut(50, (bigWidth / 2) + bigArrowMargin, "px"),
        height: String(bigArrowHeight) + "vh",
        zIndex: String(zIndex),
        transition: "all 0s ease",
        animation: "fadeuplite 0.2s ease forwards",
        cursor: "pointer"
      }
    });

    rightArrow = createNode({
      mother: totalContents,
      events: [
        {
          type: [ "dblclick", "selectstart" ],
          event: (e) => {
            e.stopPropagation();
            e.preventDefault();
          }
        },
        {
          type: "click",
          event: function (e) {
            const target = document.querySelector('.' + bigPhotoImageTargetClassName);
            const current = Number(target.getAttribute("index"));
            const total = Number(target.getAttribute("length"));
            let next;
            next = current + 1;
            if (next >= total) {
              next = 0;
            }
            target.style.backgroundImage = "url('" + (desktop ? slideSource[next] : slideSourceMother.tablet[next]) + "')";
            target.setAttribute("index", String(next));
          }
        },
      ],
      class: [ bigPhotoImageClassName ],
      mode: "svg",
      source: svgMaker.buttonArrow("right", colorChip.whiteBlack),
      style: {
        position: "fixed",
        top: "calc(" + String(naviHeight) + "px" + " + calc(calc(calc(100% - " + String(naviHeight) + "px" + ") / 2) - " + String(bigArrowHeight / 2) + "vh" + "))",
        left: withOut(50, ((bigWidth / 2) + bigArrowMargin - initialVisualConst) * -1, "px"),
        height: String(bigArrowHeight) + "vh",
        zIndex: String(zIndex),
        transition: "all 0s ease",
        animation: "fadeuplite 0.2s ease forwards",
        cursor: "pointer"
      }
    });
    rightArrowBox = rightArrow.getBoundingClientRect();
    rightArrow.style.left = withOut(50, ((bigWidth / 2) + bigArrowMargin - rightArrowBox.width) * -1, "px")

  }

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(whiteBottomMargin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(desktop ? innerMargin : innerMargin - arrowBetween) + ea,
      paddingLeft: String(desktop ? innerMargin : (innerMargin - mobileVisualPaddingValue)) + ea,
      paddingRight: String(desktop ? innerMargin : (innerMargin + mobileVisualPaddingValue)) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.white,
      borderRadius: String(8) + "px",
    }
  });

  imageTong = createNode({
    mother: grayTong,
    style: {
      display: "block",
      position: "relative",
      padding: String(imageBasePadding) + ea,
      width: withOut(imageBasePadding * 2, ea),
      background: desktop ? colorChip.gray2 : "transparent",
      borderRadius: String(8) + "px",
      paddingBottom: String(imageBasePaddingBase) + ea,
    }
  });

  createNode({
    mother: imageTong,
    class: [ educationImageClassName ],
    attribute: {
      index: String(0),
      length: String(slideSource.length),
    },
    style: {
      display: "block",
      position: "relative",
      width: withOut(0, ea),
      height: String(mainImageHeight) + ea,
      borderRadius: String(5) + "px",
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.darkShadow : "",
      backgroundSize: "100% auto",
      backgroundPosition: "50% 50%",
      backgroundImage: "url('" + slideSource[0] + "')",
      transition: "all 0s ease",
    }
  });

  buttonsTong = createNode({
    mother: imageTong,
    style: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      width: withOut(0, ea),
      height: String(buttonsTongHeight) + ea,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    children: [
      {
        event: { click: bigPhotoEvent },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCircleWidth) + ea,
          height: String(buttonCircleWidth) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(buttonCircleWidth) + ea,
          marginRight: String(buttonCircleBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: svgMaker.entireArrow(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(entireArrowWidth) + ea,
            marginTop: String(entireArrowVisual) + ea,
          }
        }
      },
      {
        event: {
          click: function (e) {
            const target = document.querySelector('.' + educationImageClassName);
            const current = Number(target.getAttribute("index"));
            const total = Number(target.getAttribute("length"));
            let next;
            next = current - 1;
            if (next < 0) {
              next = total - 1;
            }
            target.style.backgroundImage = "url('" + slideSource[next] + "')";
            target.setAttribute("index", String(next));
          },
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCircleWidth) + ea,
          height: String(buttonCircleWidth) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(buttonCircleWidth) + ea,
          marginRight: String(buttonCircleBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: svgMaker.buttonArrow("left", colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(buttonArrowWidth) + ea,
            marginLeft: String(-1 * buttonArrowVisual) + ea,
          }
        }
      },
      {
        event: {
          click: function (e) {
            const target = document.querySelector('.' + educationImageClassName);
            const current = Number(target.getAttribute("index"));
            const total = Number(target.getAttribute("length"));
            let next;
            next = current + 1;
            if (next >= total) {
              next = 0;
            }
            target.style.backgroundImage = "url('" + slideSource[next] + "')";
            target.setAttribute("index", String(next));
          },
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCircleWidth) + ea,
          height: String(buttonCircleWidth) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(buttonCircleWidth) + ea,
          marginRight: String(buttonCircleBetween) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: svgMaker.buttonArrow("right", colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(buttonArrowWidth) + ea,
            marginLeft: String(buttonArrowVisual) + ea,
          }
        }
      },
      {
        event: {
          click: async function (e) {
            try {
              await downloadFile(downloadSource);
            } catch (e) {
              console.log(e);
            }
          },
          selectstart: (e) => { e.preventDefault() },
        },
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(buttonCircleWidth) + ea,
          height: String(buttonCircleWidth) + ea,
          background: colorChip.gradientGray,
          borderRadius: String(buttonCircleWidth) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        child: {
          mode: "svg",
          source: svgMaker.downloadArrow(colorChip.white),
          style: {
            display: "inline-block",
            position: "relative",
            width: String(downloadArrowWidth) + ea,
            marginTop: String(downloadArrowVisual) + ea,
          }
        }
      },
    ]
  });

}

DesignManualJs.prototype.contentsLoop = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const targetContents = this.contents;

  this.whiteBlocks = [];
  for (let { key } of targetContents) {
    this.whiteBlocks.push(this.insertChecklistBox(key));
  }

}

DesignManualJs.prototype.insertChecklistBox = function (key) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = this.contents.find((obj) => { return obj.key === key }).title;
  const mainContents = this.contents.find((obj) => { return obj.key === key }).checklist;
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let checkBoxAreaWidth;
  let mobileInnerPaddingBottom;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), (isMac() ? 15 : 14), 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  mobileInnerPaddingBottom = 8;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.4 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
    attribute: { key, toggle: "on" },
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.white : "",
      paddingTop: desktop ? String(paddingTop + (desktop ? 0 : 1.7)) + ea : "",
      paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
      marginBottom: String(bottomMargin) + ea,
      boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.gray5 : "",
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: desktop ? withOut(margin * 2, ea) : String(100) + '%',
        height: String(100) + '%',
        marginLeft: String(desktop ? margin : 0) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  block = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
    },
    children: [
      {
        style: {
          display: "block",
          position: mobile ? "absolute" : "relative",
          left: desktop ? "" : String(mobileTitleLeft) + ea,
          top: desktop ? "" : String(mobileTitleTop) + ea,
          width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
          marginBottom: String(titleBottom) + ea,
          zIndex: mobile ? String(1) : "",
        },
        children: [
          {
            text: mainTitle,
            style: {
              position: "relative",
              display: "inline-block",
              top: String(titleTopNumber) + ea,
              fontSize: String(titleFontSize) + ea,
              fontWeight: String(600),
              background: desktop ? colorChip.white : colorChip.gray1,
              paddingRight: String(numberRight) + ea,
              color: colorChip.black,
            }
          },
        ]
      },
      {
        style: {
          display: "block",
          position: "relative",
          width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
          background: desktop ? "" : colorChip.white,
          boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
          borderRadius: mobile ? String(1) + ea : "",
          overflow: "hidden",
          marginBottom: String(0) + ea,
          marginTop: desktop ? "" : String(14) + ea,
          paddingTop: String(contentsAreaPaddingTop) + ea,
          borderTop: desktop ? "1px solid " + colorChip.shadow : "",
          paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
          paddingBottom: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
        }
      },
    ]
  });
  tong = block.lastChild;

  num = 0;
  for (let { title, children } of mainContents) {
    num2 = 0;
    for (let { title: str, contents } of children) {
      createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          marginBottom: String(num2 === children.length - 1 ? contentsMarginBottom1 : contentsMarginBottom0) + ea,
          marginTop: desktop ? "" : ((num === 0 || num2 !== 0) ? "" : String(6) + ea)
        },
        children: [
          {
            text: (num2 === 0 ? String(num + 1) : ""),
            style: {
              display: desktop ? "inline-block" : "none",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(zeroWidth) + ea,
              marginRight: String(zeroMarginRight) + ea,
              textAlign: "right",
              color: colorChip.green,
            }
          },
          {
            style: {
              display: desktop ? "inline-block" : "block",
              position: "relative",
              verticalAlign: "top",
              width: desktop ? String(firstWidth) + ea : String(100) + '%',
              marginBottom: desktop ? "" : String(1.5) + ea,
            },
            children: [
              {
                style: {
                  display: num2 === 0 ? "block" : "none",
                  position: "absolute",
                  top: String(0),
                  left: String(0),
                  height: String(lineTop) + ea,
                  width: withOut(0),
                  borderBottom: desktop ? "1px solid " + colorChip.gray3 : "",
                }
              },
              {
                text: (num2 === 0 ? (desktop ? title : "<b%" + String(num + 1) + "%b>" + blank + title) : ""),
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(800),
                  lineHeight: String(1.6),
                  color: colorChip.black,
                  textAlign: "left",
                  background: colorChip.white,
                  paddingRight: String(linePadding) + ea,
                },
                bold: {
                  fontSize: String(contentsWordingSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.green,
                },
              }
            ]
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(contentsWordingSize) + ea,
              fontWeight: String(600),
              verticalAlign: "top",
              lineHeight: String(1.6),
              width: String(secondWidth) + ea,
              marginRight: String(secondMarginRight) + ea,
              textAlign: desktop ? "right" : "left",
              color: colorChip.green,
            },
          },
          {
            text: "<u%" + str + ":%u>&nbsp;&nbsp;&nbsp;" + contents,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(400),
              verticalAlign: "top",
              lineHeight: String(1.6),
              paddingLeft: String(checkBoxAreaWidth) + ea,
              width: withOut(desktop ? zeroWidth + zeroMarginRight + firstWidth + secondWidth + secondMarginRight + checkBoxAreaWidth : secondWidth + secondMarginRight + checkBoxAreaWidth, ea),
              textAlign: "left",
              color: colorChip.black,
            },
            bold: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(600),
              color: colorChip.green,
            },
            under: {
              fontSize: String(desktop ? contentsWordingSize : mobileContentsWordingSize) + ea,
              fontWeight: String(700),
              color: colorChip.black,
            },
            children: [
              {
                mode: "svg",
                source: instance.mother.returnCheckBox(colorChip.green),
                style: {
                  top: String(checkBoxTop) + ea,
                  left: String(0),
                  position: "absolute",
                  width: String(checkBoxWidth) + ea,
                }
              }
            ]
          },
        ]
      });

      num2++;
    }
    num++;
  }

  return whiteBlock;
}

DesignManualJs.prototype.insertButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile, selfHref } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let buttonHeight, buttonPadding;
  let buttonBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
  textSize = <%% 17, 17, 15, 14, 2.5 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 20, 19, 18, 18, 2.1 %%>;
  buttonHeight = <%% 42, 42, 36, 32, 6.3 %%>;

  buttonBetween = <%% 6, 6, 5, 4, 0.5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/manual.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "콘솔 사용법",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/fee.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자인비 설명",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/partnership.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "파트너십 정보",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        cleanChildren(baseTong);
        instance.insertContractInitBox();
        instance.insertContractBox();
        instance.insertContractButtonBox();
        window.scroll(0, 0);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      // marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "계약 내역",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignManualJs.prototype.insertContractInitBox = function () {
  const instance = this;
  const { withOut, returnGet, createNode, colorChip, isMac, isIphone, setDebounce, sleep, svgMaker, serviceParsing, dateToString, stringToDate, findByAttribute, autoHypenPhone, setQueue, uniqueValue, homeliaisonAnalytics } = GeneralJs;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let whiteBlock;
  let style;
  let blockHeight;
  let leftBox, rightBox;
  let titleBox, barBox, indexBox;
  let margin;
  let quoteWidth;
  let quoteHeight;
  let titleFontSize, titleFontWeight;
  let serviceChildren;
  let searchTags;
  let titleWording;
  let servicePaddingLeft;
  let serviceSize;
  let serviceBlockPaddingTop;
  let whiteBlockPaddingTop, whiteBlockPaddingBottom;
  let quotoTongHeight;
  let searchBarPaddingTop;
  let searchBarHeight;
  let searchBarWidth;
  let searchIconHeight;
  let searchIconRight, searchIconTop;
  let whiteBlockMarginBottom;
  let inputWithoutHeight;
  let serviceButtonClassName;
  let serviceBlock;
  let inputSize, inputWeight;
  let placeholder;
  let titleTop;
  let servicePaddingTop, servicePaddingBottom;
  let serviceMarginRight;
  let subTitleMarginTop, subTitleFontSize, subTitleWeight;
  let subTitleContents;
  let middleBox;
  let tagTextTop;
  let tagTongBottom;
  let boxTopVisual;
  let mobileBlockTop;

  margin = <%% 30, 30, 30, 30, 30 %%>;

  whiteBlockMarginBottom = <%% 90, 80, 74, 60, 14.5 %%>;

  quoteHeight = <%% 15, 15, 15, 15, 2.5 %%>;
  quotoTongHeight = <%% 16, 16, 16, 16, 4 %%>;
  titleFontSize = <%% 35, 33, 32, 30, 6.4 %%>;
  titleFontWeight = <%% 700, 700, 700, 700, 700 %%>;
  titleTop = <%% (isMac() ? 0 : 4), (isMac() ? 0 : 4), (isMac() ? 0 : 3), (isMac() ? 0 : 2), (isMac() ? 0 : 4) %%>;

  servicePaddingTop = <%% 7, 7, 7, 7, 7 %%>;
  servicePaddingBottom = <%% 10, 10, 10, 10, 10 %%>;
  servicePaddingLeft = <%% 13, 13, 13, 12, 2.2 %%>;
  serviceMarginRight = <%% 6, 6, 6, 6, 6 %%>;
  serviceSize = <%% 13, 13, 13, 12, 3.3 %%>;
  serviceBlockPaddingTop = <%% (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), (isMac() ? 39 : 42), 5 %%>;

  whiteBlockPaddingTop = <%% 56, 56, 56, 56, 9 %%>;
  whiteBlockPaddingBottom = <%% 80, 80, 80, 80, 11 %%>;

  searchBarPaddingTop = <%% 220, 220, 192, 164, 12.5 %%>;
  searchBarHeight = <%% 40, 40, 40, 36, 8 %%>;
  searchBarWidth = <%% 690, 516, 516, 420, 88 %%>;

  searchIconHeight = <%% 20, 20, 20, 20, 4 %%>;
  searchIconRight = <%% 11, 11, 11, 11, 2 %%>;
  searchIconTop = <%% 10, 10, 10, 10, 1.8 %%>;

  inputWithoutHeight = <%% (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), (isMac() ? 3 : 0), 0.8 %%>;

  inputSize = <%% 15, 15, 15, 14, 3.1 %%>;
  inputWeight = <%% 300, 300, 300, 300, 300 %%>;

  subTitleMarginTop = <%% 2, 2, 1, 1, 0.2 %%>;
  subTitleFontSize = <%% 16, 16, 16, 15, 3.2 %%>;
  subTitleWeight = <%% 500, 500, 500, 500, 500 %%>;

  tagTextTop = <%% (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), (isMac() ? -1 : 0), -0.3 %%>;
  tagTongBottom = <%% 3, 3, 1, 1, 0 %%>;
  boxTopVisual = <%% 1, 1, 0, 0, 0 %%>;

  titleWording = "디자이너 계약 내역";
  subTitleContents = "디자이너 파트너십 계약서 내용";

  mobileBlockTop = 4.5;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      display: "block",
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      marginBottom: String(whiteBlockMarginBottom) + ea,
      top: String(-1 * boxTopVisual) + ea,
      paddingTop: desktop ? "" : String(mobileBlockTop) + ea,
    }
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      height: String(quotoTongHeight) + ea,
      opacity: String(0.6),
    },
    children: [
      {
        mode: "svg",
        source: svgMaker.serifAsterisk(colorChip.white),
        style: {
          display: "inline-block",
          height: String(quoteHeight) + ea,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    children: [
      {
        text: titleWording,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(titleTop) + ea,
          fontSize: String(titleFontSize) + ea,
          fontWeight: String(titleFontWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: whiteBlock,
    style: {
      display: "flex",
      position: "relative",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: String(subTitleMarginTop) + ea,
    },
    children: [
      {
        text: subTitleContents,
        style: {
          display: "inline-block",
          position: "relative",
          top: mobile ? "" : String(0) + ea,
          fontSize: String(subTitleFontSize) + ea,
          fontWeight: String(subTitleWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignManualJs.prototype.insertContractBox = function () {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, setDebounce } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainContents = this.returnDesignerContract();
  let paddingTop;
  let block;
  let whiteBlock, whiteTong;
  let bottomMargin;
  let titleFontSize;
  let num, num2, num3, num4;
  let numberRight;
  let titleTop, titleTopNumber;
  let titleBottom;
  let index;
  let mobileTitleLeft, mobileTitleTop;
  let secondBlockWidth, secondBlockMargin;
  let tong;
  let contentsWordingSize;
  let contentsBottom;
  let whiteBottomMargin;
  let contentsTitleMarginTop, contentsMarginTop;
  let contentsPaddingLeft;
  let arrowWidth;
  let arrowTop;
  let arrorLeft;
  let bigNumberSize;
  let bigNumberBetween;
  let bigNumberMargin;
  let bigNumberBetweenMargin;
  let matrix;
  let firstWidth, secondWidth, secondMarginRight;
  let contentsAreaPaddingTop;
  let zeroWidth, zeroMarginRight;
  let checkBoxWidth, checkBoxTop;
  let arrowBoxWidth, arrowBoxTop;
  let contentsMarginBottom0, contentsMarginBottom1;
  let mobilePaddingLeft;
  let mobileContentsWordingSize;
  let wordings;
  let lineTop, linePadding;
  let checkBoxAreaWidth;
  let mobileInnerPaddingBottom;
  let tapSize;
  let whiteNum;
  let whiteMother;
  let grayMother;
  let whiteTopMargin;
  let contractLoad;
  let contentsLineHeight;
  let contentsMarginBottom;
  let searchMotherHeight, searchMotherPaddingTop;
  let searchBoxWidth, searchBoxHeight;
  let searchIconWidth, searchIconTop, searchIconRight;
  let searchInputHeightVisual;
  let searchSize, searchWeight;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4 %%>;

  whiteTopMargin = <%% 36, 36, 28, 24, 4 %%>;
  whiteBottomMargin = <%% 40, 40, 32, 28, 0 %%>;

  titleFontSize = <%% 18, 18, 16, 15, 3.6 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% 15, 15, 12, 10, 0 %%>;
  contentsAreaPaddingTop = <%% 36, 36, 36, 36, 7 %%>;

  mobileTitleLeft = 1;
  mobileTitleTop = -7.8;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3 %%>;
  contentsBottom = <%% -5, -5, -5, -5, 0 %%>;

  contentsTitleMarginTop = <%% 14, 14, 14, 14, 1 %%>;
  contentsMarginTop = <%% 36, 36, 36, 36, 1 %%>;
  contentsPaddingLeft = <%% 14, 14, 14, 14, 0 %%>;
  arrowWidth = <%% 8, 8, 7, 6, 1.6 %%>;
  arrowTop = <%% 6, 6, 6, 6, 0.3 %%>;
  arrorLeft = <%% 1, 1, 1, 1, 0 %%>;

  bigNumberSize = <%% 37, 37, 37, 37, 5 %%>;
  bigNumberBetween = <%% -3, -3, -3, -3, 0 %%>;
  bigNumberMargin = <%% 0, 0, 0, 0, 0 %%>;
  bigNumberBetweenMargin = <%% 28, 28, 28, 28, 0 %%>;

  zeroWidth = <%% 8, 8, 8, 8, 10 %%>;
  zeroMarginRight = <%% 10, 10, 10, 10, 10 %%>;
  firstWidth = <%% 240, 240, 190, 170, 10 %%>;
  secondWidth = <%% 15, 15, 15, 15, 2 %%>;
  secondMarginRight = <%% 10, 10, 10, 10, 2 %%>;

  checkBoxWidth = <%% 10, 10, 10, 10, 2 %%>;
  arrowBoxWidth = <%% 9, 8, 8, 8, 1.8 %%>;
  checkBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.6 %%>;
  arrowBoxTop = <%% (isMac() ? 7 : 5.5), (isMac() ? 7 : 5), (isMac() ? 7 : 4.5), (isMac() ? 6.5 : 4), 1.5 %%>;

  contentsMarginBottom0 = <%% 4, 4, 4, 4, 2 %%>;
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 0 %%>;

  lineTop = <%% (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 10 : 8), (isMac() ? 9 : 7), 10 %%>;
  linePadding = <%% 12, 12, 12, 10, 12 %%>;

  mobilePaddingLeft = 6;
  mobileInnerPaddingBottom = 5;

  mobileContentsWordingSize = 3;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  tapSize = <%% 24, 24, 24, 24, 4 %%>;

  contentsLineHeight = <%% 1.6, 1.6, 1.6, 1.6, 1.6 %%>;
  contentsMarginBottom = <%% 2, 2, 1, 1, 0 %%>;

  searchMotherHeight = <%% 80, 80, 75, 70, 12.5 %%>;
  searchMotherPaddingTop = <%% 20, 20, 16, 12, 3.5 %%>;

  searchBoxWidth = <%% 420, 420, 420, 360, 60 %%>;
  searchBoxHeight = <%% 38, 38, 36, 32, 7 %%>;

  searchIconWidth = <%% 18, 18, 16, 14, 3.6 %%>;
  searchIconTop = <%% 9, 9, 9, 8, 1.4 %%>;
  searchIconRight = <%% 11, 11, 11, 10, 1.6 %%>;

  searchInputHeightVisual = <%% 2, 2, 2, 2, 0.5 %%>;

  searchSize = <%% 14, 14, 13, 12, 3 %%>;
  searchWeight = <%% 400, 400, 400, 400, 400 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  contractLoad = () => {}

  whiteMother = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(margin) + ea,
      paddingBottom: String(margin) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  }).firstChild;

  createNode({
    mother: whiteMother,
    style: {
      display: "flex",
      width: withOut(0),
      height: String(searchMotherHeight) + ea,
      justifyContent: "center",
      paddingTop: String(searchMotherPaddingTop) + ea,
    },
    children: [
      {
        style: {
          display: "inline-block",
          position: "relative",
          width: String(searchBoxWidth) + ea,
          height: String(searchBoxHeight) + ea,
          borderRadius: String(5) + "px",
          position: "relative",
          background: colorChip.gray1,
        },
        children: [
          {
            mode: "svg",
            source: instance.mother.returnSearch(colorChip.black),
            style: {
              position: "absolute",
              width: String(searchIconWidth) + ea,
              top: String(searchIconTop) + ea,
              right: String(searchIconRight) + ea,
              cursor: "pointer",
            }
          },
          {
            mode: "input",
            attribute: { type: "text" },
            event: {
              keyup: function (e) {
                setDebounce(() => {
                  const search = this.value.replace(/[^가-힣 ]/gi, '').trim();
                  let filteredContents;
                  if (search !== "") {
                    filteredContents = mainContents.filter((obj) => {
                      return (new RegExp(search, "gi")).test(JSON.stringify(obj));
                    });
                    contractLoad(filteredContents);
                  } else {
                    contractLoad(mainContents);
                  }
                });
              }
            },
            style: {
              position: "absolute",
              width: String(searchBoxWidth - searchIconWidth - searchIconRight) + ea,
              top: String(0) + ea,
              height: withOut(searchInputHeightVisual, ea),
              left: String(0),
              border: String(0),
              outline: String(0),
              background: "transparent",
              fontSize: String(searchSize) + ea,
              fontWeight: String(searchWeight),
              color: colorChip.black,
              textAlign: "center",
            }
          }
        ]
      }
    ]
  })

  grayMother = createNode({
    mother: whiteMother,
    style: {
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: desktop ? colorChip.gray2 : colorChip.gray1,
      paddingTop: String(whiteTopMargin) + ea,
      paddingBottom: String(whiteTopMargin) + ea,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(whiteTopMargin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(whiteTopMargin) + ea,
      }
    ]
  }).firstChild;

  contractLoad = (mainContents) => {

    cleanChildren(grayMother);

    whiteNum = 1;
    for (let obj0 of mainContents) {

      whiteBlock = createNode({
        mother: grayMother,
        style: {
          position: "relative",
          borderRadius: String(desktop ? 8 : 1) + ea,
          width: String(100) + '%',
          background: desktop ? colorChip.white : "",
          paddingTop: desktop ? String(whiteTopMargin) + ea : "",
          paddingBottom: desktop ? String(whiteBottomMargin) + ea : "",
          marginBottom: String(mainContents.length === whiteNum ? 0 : bottomMargin) + ea,
          boxShadow: desktop ? "0px 5px 12px -10px " + colorChip.shadow : "",
        },
        children: [
          {
            display: "block",
            position: "relative",
            width: desktop ? withOut(whiteBottomMargin * 2, ea) : String(100) + '%',
            height: String(100) + '%',
            marginLeft: String(desktop ? whiteBottomMargin : 0) + ea,
          }
        ]
      });
      whiteTong = whiteBlock.firstChild;

      block = createNode({
        mother: whiteTong,
        style: {
          display: "block",
          position: "relative",
          width: String(100) + '%',
        },
        children: [
          {
            style: {
              display: "block",
              position: mobile ? "absolute" : "relative",
              left: desktop ? "" : String(mobileTitleLeft) + ea,
              top: desktop ? "" : String(mobileTitleTop) + ea,
              width: desktop ? String(100) + '%' : withOut((mobileTitleLeft * 2), ea),
              marginBottom: String(titleBottom) + ea,
              zIndex: mobile ? String(1) : "",
            },
            children: [
              {
                text: obj0.title,
                style: {
                  position: "relative",
                  display: "inline-block",
                  top: String(titleTopNumber) + ea,
                  fontSize: String(titleFontSize) + ea,
                  fontWeight: String(700),
                  background: desktop ? colorChip.white : colorChip.gray1,
                  paddingRight: String(numberRight) + ea,
                  color: colorChip.black,
                }
              },
              {
                text: String(whiteNum),
                style: {
                  position: "absolute",
                  right: String(0),
                  display: "inline-block",
                  top: String(titleTopNumber) + ea,
                  fontSize: String(titleFontSize) + ea,
                  fontWeight: String(200),
                  background: desktop ? colorChip.white : colorChip.gray1,
                  paddingLeft: String(numberRight) + ea,
                  color: colorChip.green,
                }
              },
            ]
          },
          {
            style: {
              display: "block",
              position: "relative",
              width: desktop ? String(100) + '%' : withOut(mobilePaddingLeft * 2, ea),
              background: desktop ? "" : colorChip.white,
              boxShadow: mobile ? "0px 5px 12px -10px " + colorChip.gray5 : "",
              borderRadius: mobile ? String(1) + ea : "",
              overflow: "hidden",
              marginBottom: String(0) + ea,
              marginTop: desktop ? "" : String(whiteNum === 1 ? 9 : 14) + ea,
              paddingLeft: desktop ? "" : String(mobilePaddingLeft) + ea,
              paddingRight: desktop ? "" : String(mobilePaddingLeft) + ea,
              paddingTop: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
              paddingBottom: desktop ? "" : String(mobileInnerPaddingBottom) + ea,
            }
          },
        ]
      });
      tong = block.lastChild;

      if (typeof obj0.description === "string") {

        createNode({
          mother: tong,
          text: obj0.description,
          style: {
            display: "block",
            fontSize: String(contentsWordingSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
            lineHeight: String(contentsLineHeight),
          }
        });

      }
      if (Array.isArray(obj0.children)) {

        for (let obj1 of obj0.children) {

          if (typeof obj1.title === "string") {
            createNode({
              mother: tong,
              text: "-&nbsp;&nbsp;" + obj1.title,
              style: {
                display: "block",
                fontSize: String(contentsWordingSize) + ea,
                paddingLeft: String(tapSize * 0) + ea,
                fontWeight: String(500),
                color: colorChip.black,
                lineHeight: String(contentsLineHeight),
                marginBottom: String(contentsMarginBottom) + ea,
              }
            });
          }

          if (typeof obj1.description === "string") {
            createNode({
              mother: tong,
              text: "-&nbsp;&nbsp;" + obj1.description,
              style: {
                display: "block",
                fontSize: String(contentsWordingSize) + ea,
                paddingLeft: String(tapSize * 0) + ea,
                fontWeight: String(500),
                color: colorChip.black,
                lineHeight: String(contentsLineHeight),
                marginBottom: String(contentsMarginBottom) + ea,
              }
            });
          }

          if (Array.isArray(obj1.children)) {

            num = 1;
            for (let obj2 of obj1.children) {

              if (typeof obj2.title === "string") {
                createNode({
                  mother: tong,
                  text: String(num) + ". " + obj2.title + (typeof obj2.description === "string" ? " :&nbsp;&nbsp;" +  obj2.description : ""),
                  style: {
                    display: "block",
                    fontSize: String(contentsWordingSize) + ea,
                    paddingLeft: String(tapSize * 1) + ea,
                    fontWeight: String(500),
                    color: colorChip.black,
                    lineHeight: String(contentsLineHeight),
                    marginBottom: String(contentsMarginBottom) + ea,
                  }
                })
                num++;
              }

              if (typeof obj2.description === "string") {
                if (typeof obj2.title !== "string") {
                  createNode({
                    mother: tong,
                    text: String(num) + ". " + obj2.description,
                    style: {
                      display: "block",
                      fontSize: String(contentsWordingSize) + ea,
                      paddingLeft: String(tapSize * 1) + ea,
                      fontWeight: String(500),
                      color: colorChip.black,
                      lineHeight: String(contentsLineHeight),
                      marginBottom: String(contentsMarginBottom) + ea,
                    }
                  });
                  num++;
                }
              }

              if (Array.isArray(obj2.children)) {

                num2 = 1;
                for (let obj3 of obj2.children) {

                  if (typeof obj3.title === "string") {
                    createNode({
                      mother: tong,
                      text: String(num2) + ") " + obj3.title + (typeof obj3.description === "string" ? " :&nbsp;&nbsp;" +  obj3.description : ""),
                      style: {
                        display: "block",
                        fontSize: String(contentsWordingSize) + ea,
                        paddingLeft: String(tapSize * 2) + ea,
                        fontWeight: String(500),
                        color: colorChip.black,
                        lineHeight: String(contentsLineHeight),
                        marginBottom: String(contentsMarginBottom) + ea,
                      }
                    })
                    num2++;
                  }

                  if (typeof obj3.description === "string") {
                    if (typeof obj3.title !== "string") {
                      createNode({
                        mother: tong,
                        text: String(num2) + ") " + obj3.description,
                        style: {
                          display: "block",
                          fontSize: String(contentsWordingSize) + ea,
                          paddingLeft: String(tapSize * 2) + ea,
                          fontWeight: String(500),
                          color: colorChip.black,
                          lineHeight: String(contentsLineHeight),
                          marginBottom: String(contentsMarginBottom) + ea,
                        }
                      });
                      num2++;
                    }
                  }

                  if (Array.isArray(obj3.children)) {

                    num3 = 1;
                    for (let obj4 of obj3.children) {

                      if (typeof obj4.title === "string") {
                        createNode({
                          mother: tong,
                          text: String(num3) + "] " + obj4.title + (typeof obj4.description === "string" ? " :&nbsp;&nbsp;" +  obj4.description : ""),
                          style: {
                            display: "block",
                            fontSize: String(contentsWordingSize) + ea,
                            paddingLeft: String(tapSize * 3) + ea,
                            fontWeight: String(500),
                            color: colorChip.black,
                            lineHeight: String(contentsLineHeight),
                            marginBottom: String(contentsMarginBottom) + ea,
                          }
                        })
                        num3++;
                      }

                      if (typeof obj4.description === "string") {
                        if (typeof obj4.title !== "string") {
                          createNode({
                            mother: tong,
                            text: String(num3) + "] " + obj4.description,
                            style: {
                              display: "block",
                              fontSize: String(contentsWordingSize) + ea,
                              paddingLeft: String(tapSize * 3) + ea,
                              fontWeight: String(500),
                              color: colorChip.black,
                              lineHeight: String(contentsLineHeight),
                              marginBottom: String(contentsMarginBottom) + ea,
                            }
                          });
                          num3++;
                        }
                      }

                      if (Array.isArray(obj4.children)) {

                        num4 = 1;
                        for (let obj5 of obj4.children) {

                          if (typeof obj5.title === "string") {
                            createNode({
                              mother: tong,
                              text: String(num4) + " | " + obj5.title + (typeof obj5.description === "string" ? " :&nbsp;&nbsp;" +  obj5.description : ""),
                              style: {
                                display: "block",
                                fontSize: String(contentsWordingSize) + ea,
                                paddingLeft: String(tapSize * 4) + ea,
                                fontWeight: String(500),
                                color: colorChip.black,
                                lineHeight: String(contentsLineHeight),
                                marginBottom: String(contentsMarginBottom) + ea,
                              }
                            })
                            num4++;
                          }

                          if (typeof obj5.description === "string") {
                            if (typeof obj5.title !== "string") {
                              createNode({
                                mother: tong,
                                text: String(num4) + " | " + obj5.description,
                                style: {
                                  display: "block",
                                  fontSize: String(contentsWordingSize) + ea,
                                  paddingLeft: String(tapSize * 4) + ea,
                                  fontWeight: String(500),
                                  color: colorChip.black,
                                  lineHeight: String(contentsLineHeight),
                                  marginBottom: String(contentsMarginBottom) + ea,
                                }
                              });
                              num4++;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      whiteNum++;
    }

  };

  contractLoad(mainContents);

}

DesignManualJs.prototype.insertContractButtonBox = function () {
  const instance = this;
  const mother = this.mother;
  const { ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma, svgMaker, downloadFile, selfHref } = GeneralJs;
  const buttonsClassName = "buttonsClassName";
  let margin;
  let paddingTop;
  let titleFontSize;
  let bottomMargin;
  let whiteBlock;
  let grayTong;
  let arrowBetween;
  let innerMargin;
  let arrowWidth, arrowHeight;
  let textTop;
  let textSize, textWeight;
  let textMarginLeft;
  let buttonHeight, buttonPadding;
  let buttonBetween;

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), (isMac() ? -1 : 1), -0.2 %%>;
  textSize = <%% 17, 17, 15, 14, 2.5 %%>;
  textWeight = <%% 700, 700, 700, 700, 700 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  buttonPadding = <%% 20, 19, 18, 18, 2.1 %%>;
  buttonHeight = <%% 42, 42, 36, 32, 6.3 %%>;

  buttonBetween = <%% 6, 6, 5, 4, 0.5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      background: colorChip.white,
      paddingTop: String(paddingTop) + ea,
      paddingBottom: String(paddingTop) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "flex",
      position: "relative",
      width: withOut(0, ea),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/manual.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "콘솔 사용법",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/fee.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자인비 설명",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/partnership.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "파트너십 정보",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

  createNode({
    mother: grayTong,
    event: {
      click: function (e) {
        let url;
        url = "";
        url += FRONTHOST;
        url += "/designer/provision.php";
        url += "?";
        url += "desid=";
        url += instance.designer.desid;
        selfHref(url);
      }
    },
    style: {
      display: "inline-flex",
      position: "relative",
      paddingLeft: String(buttonPadding) + ea,
      paddingRight: String(buttonPadding) + ea,
      // marginRight: String(buttonBetween) + ea,
      height: String(buttonHeight) + ea,
      borderRadius: String(5) + "px",
      background: colorChip.gradientGray,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      cursor: "pointer",
    },
    children: [
      {
        text: "디자이너 가이드",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(textTop) + ea,
          fontSize: String(textSize) + ea,
          fontWeight: String(textWeight),
          color: colorChip.white,
        }
      }
    ]
  });

}

DesignManualJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let cliid, clients, client;
    let proid, projects, project;
    let whereQuery;
    let desid, designers, designer;
    let requestNumber;
    let service;
    let socket;
    let wsLaunching;
    let wsOpenEvent;
    let wsMessageEvent;
    let wsCloseEvent;

    if (getObj.desid === undefined) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    desid = getObj.desid;
    designers = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getDesigners", { equal: true });
    if (designers.length === 0) {
      window.alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    [ designer ] = designers;
    this.designer = designer;

    this.contents = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    await this.mother.ghostDesignerLaunching({
      name: "designManual",
      designer: this.designer,
      base: {
        instance: this,
        binaryPath: DesignManualJs.binaryPath,
        subTitle: "",
      },
      local: async () => {
        try {
          if (GeneralJs.returnGet().mode === "contract") {
            instance.insertContractInitBox();
            instance.insertContractBox();
            instance.insertContractButtonBox();
          } else {
            instance.insertInitBox();
            instance.insertEducationBox();
            instance.insertProcessBox();
            instance.contentsLoop();
            instance.insertButtonBox();
          }
        } catch (e) {
          await GeneralJs.ajaxJson({ message: "DesignManualJs.launching.ghostClientLaunching : " + e.message }, BACKHOST + "/errorLog");
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (err) {
    console.log(err);
    await GeneralJs.ajaxJson({ message: "DesignManualJs.launching 에러 일어남 => " + err.message }, BACKHOST + "/errorLog");
  }
}
