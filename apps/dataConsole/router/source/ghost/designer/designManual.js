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
      "return ('홈스타일링 제공 내역 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return ('홈스타일링 제공 내역 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "designManual",
  "hangul": "의뢰서 리스트",
  "route": [
    "designManual"
  ]
} %/%/g

const DesignManualJs = function () {
  this.mother = new GeneralJs();
}

DesignManualJs.binaryPath = FRONTHOST + "/middle/console/manual";

DesignManualJs.prototype.staticSetting = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  let contents;

  contents = [
    {
      "title": "현장 미팅",
      "checklist": [
        {
          "title": "디자이너가 진행할 4가지",
          "children": [
            {
              "title": "현장 조사",
              "contents": "현장에 대한 <b%특이사항 파악과 실측이 중요%b>합니다. 현장 방문이 어려운 경우, 현 거주지 또는 외부에서 만나실 수 있지만 시공 계약 전의 현장 방문은 필수입니다."
            },
            {
              "title": "니즈 조사",
              "contents": "디자이너는 고객님이 전송해주신 자료를 바탕으로 <b%미팅 사전 준비를 합니다.%b> 그리고 <b%현장에서 고객님의 이야기를 들어 니즈를 파악%b>합니다."
            },
            {
              "title": "컨셉 잡기",
              "contents": "컨셉은 <b%디자인의 기준이 되므로 매우 중요%b>합니다. 이미지 기반의 제안 및 고객님의 동의 과정을 통해서 이후 디자인 작업이 진행되고, 컨셉은 계속 변경할 수 없습니다."
            },
            {
              "title": "시공 체크",
              "contents": "프로젝트에 시공이 있을 경우, 현장 상태를 보고 디자이너는 현재 상태에서 <b%어떤 시공을 진행할 수 있는지, 어디까지 할 수 있는지%b> 등을 구체적으로 파악하게 됩니다."
            }
          ]
        },
        {
          "title": "현장 조사 관련",
          "children": [
            {
              "title": "도면 확인",
              "contents": "<b%현장의 도면을 준비해주세요.%b> 적절한 도면이 없는 경우 실측을 통해 디자이너가 기록하지만 시간이 지체될 수 있습니다."
            },
            {
              "title": "실측",
              "contents": "도면이 있다고 해도 실제와 다를 수 있습니다. <b%도면보다 실측이 더 중요하므로 디자이너는 반드시 실측을 진행%b>합니다."
            }
          ]
        },
        {
          "title": "니즈 조사 관련",
          "children": [
            {
              "title": "예산 확인",
              "contents": "니즈와 항상 더불어 고려해야 하는 것은 예산입니다. 디자이너는 <b%예산에 대한 범위 확인과 어떻게 나누어 쓸 지를 파악%b>하게 됩니다."
            },
            {
              "title": "용도 확인",
              "contents": "단순한 니즈만 듣는 것을 넘어 디자이너는 고객님의 라이프 스타일과 가족 구성원을 기반으로 <b%최적의 공간 용도와 동선을 기획%b>합니다."
            }
          ]
        },
        {
          "title": "컨셉 잡기 관련",
          "children": [
            {
              "title": "진행의 기준",
              "contents": "조화로운 공간을 만들기 위해선 중심적인 기준이 필요하고, 그 <b%기준점을 정하는 작업이 컨셉을 잡는 일%b>입니다. 컨셉 작업은 1회를 초과하여 수정할 수 없습니다."
            },
            {
              "title": "이미지 기반",
              "contents": "추상적인 단어와 문장들로만 컨셉을 잡는 것이 아니라, <b%사진이나 이미지 등을 활용하여 디자인 컨셉%b>을 잡습니다. 컨셉 의논이 길게 소요되는 경우 <b%프로젝트 시작 후의 1차 시안에 해당 작업이 포함될 수 있습니다.%b>"
            }
          ]
        },
        {
          "title": "시공 체크 관련",
          "children": [
            {
              "title": "현장 진단",
              "contents": "니즈를 넘어서 원하는 <b%스타일을 구현하기 위해 현장 자체에 필요한 시공%b>이 있을 수 있습니다. 디자이너는 현장을 진단하여 필요한 시공 사항을 설명해드립니다."
            },
            {
              "title": "시공 범위",
              "contents": "디자이너는 고객님의 니즈와 예산의 균형적인 분배, 기존 현장의 상태를 <b%종합적으로 판단하여 시공의 범위를 조정%b>하게 됩니다."
            }
          ]
        },
        {
          "title": "기타 주의 사항",
          "children": [
            {
              "title": "디자이너 변경",
              "contents": "현장 미팅 후 디자이너와 잘 맞지 않는다고 판단될 시, <b%최대 1회까지 디자이너 변경을 요청%b>하실 수 있습니다. (거리로 인해 출장비가 발생한 경우, 변경 디자이너에 대한 출장비는 재발생됩니다.)"
            },
            {
              "title": "다음 단계 안내",
              "contents": "미팅 완료 후 계약서 작성과 잔금 결제가 완료되면 디자이너의 디자인 작업이 시작됩니다."
            },
            {
              "title": "진행 취소시",
              "contents": "현장 미팅 이후 진행 자체를 취소하실 시 <b%계약금은 환급되지 않습니다.%b>"
            }
          ]
        }
      ]
    },
    {
      "title": "일정 안내",
      "checklist": [
        {
          "title": "기본적인 순서",
          "children": [
            {
              "title": "6가지 과정",
              "contents": "인테리어의 기본적인 순서는 1 <b%실측%b>, 2 <b%디자인(설계)%b>, 3 <b%견적%b>, 4 <b%시공(제작)%b>, 5 <b%구매%b>, 6 <b%세팅%b> 으로 이루어집니다. <b%누락되거나 순서가 뒤바뀐 경우, 문제가 발생%b>할 수 있습니다."
            }
          ]
        },
        {
          "title": "디자인 일정",
          "children": [
            {
              "title": "1차 제안",
              "contents": "디자이너는 현장 상태와 예산을 고려해서 <b%컨셉을 잡고 디자인을 진행하여 도면 또는 디자인 시안의 형태로 어떻게 집을 만들지 제안%b>하게 됩니다. 페이퍼 워크의 형태는 디자이너마다 다를 수 있습니다."
            },
            {
              "title": "수정 제안",
              "contents": "디자인 제안은 <b%보통 2~3회 정도 수정을 거치며 고객님과 의견을 조율%b>해 완성해 나아갑니다. 일정에는 디자인 수정에 대한 시간적 고려가 반영되어 있어야 합니다."
            }
          ]
        },
        {
          "title": "견적 일정",
          "children": [
            {
              "title": "시공사 선택",
              "contents": "디자이너 시공사 또는 홈리에종 시공사로부터 <b%견적서를 받고 비교하여 시공사를 선택할 수 있는 과정%b>이 있습니다. 여러 업체에서 견적을 많이 받을수록 일정 기간이 늘어날 수 있습니다."
            },
            {
              "title": "견적 수정",
              "contents": "시공사 선택 후, 견적을 받고 견적을 수정할 수 있는 과정입니다. 공사가 시작된 후 공사 내역이 생기거나 수정될 시 추가 비용이 발생될 수 있기 때문에, <b%누락된 공사 항목은 없는지 꼼꼼하게 확인해야 하는 단계%b>입니다."
            }
          ]
        },
        {
          "title": "시공 일정",
          "children": [
            {
              "title": "공정표 제공",
              "contents": "시공이 <b%시작되면 시공사가 공정표를 제공%b>합니다. 공정표는 일반적으로 철거 -> 전기, 설비 -> 목공 -> 도장 -> 타일 -> 금속 -> 마감 순으로 되어 있습니다. 현장 상황에 따라 구체적인 순서는 달라질 수 있습니다."
            },
            {
              "title": "추가 공사 방지",
              "contents": "견적대로 진행하는 것이 중요하며, <b%부득이하게 수정 또는 추가 요청이 있을 경우, 공정상 언제 요청하는지에 따라 비용과 시간이 크게 늘어날 수%b> 있습니다."
            }
          ]
        },
        {
          "title": "구매 일정",
          "children": [
            {
              "title": "리스트 제공",
              "contents": "입주 청소가 끝나는 타이밍에 맞춰 제품이 올 수 있도록 디자이너는 <b%구체적인 제품과 스펙과 구매처(링크)가 적혀 있는 리스트를 제공%b>합니다. 구매 대행은 진행해드리지 않으며, 직접 구입해주시면 됩니다."
            },
            {
              "title": "배송 고려",
              "contents": "구매 일정에서 가장 중요한 것은 배송에 대한 고려입니다. 제품마다 배송 일자가 모두 다르고 <b%변수도 많기 때문에 일정의 여유를 두고 구매를 진행%b>하시는 것이 중요합니다."
            }
          ]
        },
        {
          "title": "세팅 일정",
          "children": [
            {
              "title": "세팅 가이드",
              "contents": "디자이너는 가구와 제품의 <b%배치도를 통해 어떤 것을 어디에 둘 지에 대한 구체적인 가이드를 제공%b>합니다. 디자이너가 직접 조립 및 설치를 도와드리지는 않습니다."
            },
            {
              "title": "촬영 조율",
              "contents": "구매와 세팅이 모두 완료되면 홈리에종 통해 촬영 일자를 잡게 되며, 촬영 일자에 맞춰 촬영과 인터뷰를 진행하게 됩니다."
            }
          ]
        }
      ]
    },
    {
      "title": "1차 제안",
      "checklist": [
        {
          "title": "기본적인 구성",
          "children": [
            {
              "title": "4가지 요소",
              "contents": "디자인 제안에는 다음과 같은 4가지 기본 요소를 갖추고 있습니다. 1 <b%컨셉%b>, 2 <b%공간 범위%b>, 3 <b%배치도%b>, 4 <b%시각화%b> 입니다. 디자이너마다 표현 방식은 다를 수 있으며, 4가지 외의 다른 요소가 포함되어 있을 수 있습니다."
            }
          ]
        },
        {
          "title": "컨셉 설명",
          "children": [
            {
              "title": "디자인의 방향",
              "contents": "컨셉은 <b%디자인의 방향이자 기준점%b>이 되어 모든 스타일링 과정에서 어떤 스타일로 할 지에 대한 기준이 되어줍니다. 컨셉은 조화로운 분위기를 갖추기 위한 가장 중요한 과정이며, 컨셉이 명확해야 결과 또한 명확하니 <b%가장 먼저, 가장 확실하게 결정%b>해주셔야 합니다."
            },
            {
              "title": "컨셉의 수정",
              "contents": "<b%컨셉의 수정은 최대 1회까지 가능%b>하며, 수정을 원할 시 빨리 말씀해주셔야 합니다. 컨셉이 수정되는 순간 모든 공간의 디자인을 처음부터 다시 해야 하는 상황이 되기 때문입니다."
            }
          ]
        },
        {
          "title": "공간 범위",
          "children": [
            {
              "title": "명확한 범위 설정",
              "contents": "스타일링이 진행될 명확한 범위 설정이 되어 있어야 하고, 동시에 현장 전체적인 구성과 계획을 보여주고 있어야 합니다."
            },
            {
              "title": "용도의 설정",
              "contents": "공간의 범위를 설정하는 과정은 각 공간의 용도를 설정하는 단계이기도 합니다. <b%고객님의 라이프 스타일과 니즈에 맞게 공간이 사용하기 좋게 구성될 수 있도록%b> 고민하고 결정하는 과정입니다."
            }
          ]
        },
        {
          "title": "공간별 배치도",
          "children": [
            {
              "title": "크기의 고려",
              "contents": "<b%도면에서 가장 중요한 것은 스케일(축적)입니다.%b> 배치도에 있는 모든 것들은 실제 크기에 맞게 그려져 있어야 하며, 공간에 어떤 크기로 들어가고 얼마나 면적을 차지하게 될지가 구체적으로 표현되어 있어야 합니다."
            }
          ]
        },
        {
          "title": "공간별 시각화",
          "children": [
            {
              "title": "콜라주, 사진, 3D",
              "contents": "디자이너는 홈스타일링이 되었을 때를 가정하여 <b%콜라주, 제품 사진, 3D 등으로 시각화된 자료를 제공%b>하게 됩니다. 이는 디자이너의 개인적인 시각화 스킬에 따라 그 종류와 퀄리티가 다를 수 있습니다."
            },
            {
              "title": "주의 사항",
              "contents": "시각화의 경우는 <b%디자이너마다 방식이 모두 다르고, 특히 3D의 경우 어떤 디자이너의 경우 유료로만 제공할 수%b> 있습니다. 시각화는 공간을 미리 확인할 수 있게 해주는 자료이지만 그만큼 시간이 많이 들고 어려운 작업이기에, 지나치게 시각화를 요청할 경우 추가 비용이 들어갈 수 있습니다."
            }
          ]
        },
        {
          "title": "디자인의 수정",
          "children": [
            {
              "title": "수정 횟수",
              "contents": "컨셉은 최대 1회, 그 외의 디자인 수정은 3~5회까지 가능합니다. <b%수정을 너무 많이 하거나 수정 범위가 지나치게 클 경우, 일정에 차질이 생길 수 있어%b> 추후 문제가 발생할 수도 있습니다."
            }
          ]
        }
      ]
    },
    {
      "title": "수정 제안",
      "checklist": [
        {
          "title": "기본적인 구성",
          "children": [
            {
              "title": "4가지 요소",
              "contents": "디자인 제안에는 다음과 같은 4가지 기본 요소를 갖추고 있습니다. 1 <b%컨셉%b>, 2 <b%공간 범위%b>, 3 <b%배치도%b>, 4 <b%시각화%b> 입니다. 디자이너마다 표현 방식은 다를 수 있으며, 4가지 외의 다른 요소가 포함되어 있을 수 있습니다."
            }
          ]
        },
        {
          "title": "컨셉 설명",
          "children": [
            {
              "title": "디자인의 방향",
              "contents": "컨셉은 <b%디자인의 방향이자 기준점%b>이 되어 모든 스타일링 과정에서 어떤 스타일로 할 지에 대한 기준이 되어줍니다. 컨셉은 조화로운 분위기를 갖추기 위한 가장 중요한 과정이며, 컨셉이 명확해야 결과 또한 명확하니 <b%가장 먼저, 가장 확실하게 결정%b>해주셔야 합니다."
            },
            {
              "title": "컨셉의 수정",
              "contents": "<b%컨셉의 수정은 최대 1회까지 가능%b>하며, 수정을 원할 시 빨리 말씀해주셔야 합니다. 컨셉이 수정되는 순간 모든 공간의 디자인을 처음부터 다시 해야 하는 상황이 되기 때문입니다."
            }
          ]
        },
        {
          "title": "공간 범위",
          "children": [
            {
              "title": "명확한 범위 설정",
              "contents": "스타일링이 진행될 명확한 범위 설정이 되어 있어야 하고, 동시에 현장 전체적인 구성과 계획을 보여주고 있어야 합니다."
            },
            {
              "title": "용도의 설정",
              "contents": "공간의 범위를 설정하는 과정은 각 공간의 용도를 설정하는 단계이기도 합니다. <b%고객님의 라이프 스타일과 니즈에 맞게 공간이 사용하기 좋게 구성될 수 있도록%b> 고민하고 결정하는 과정입니다."
            }
          ]
        },
        {
          "title": "공간별 배치도",
          "children": [
            {
              "title": "크기의 고려",
              "contents": "<b%도면에서 가장 중요한 것은 스케일(축적)입니다.%b> 배치도에 있는 모든 것들은 실제 크기에 맞게 그려져 있어야 하며, 공간에 어떤 크기로 들어가고 얼마나 면적을 차지하게 될지가 구체적으로 표현되어 있어야 합니다."
            }
          ]
        },
        {
          "title": "공간별 시각화",
          "children": [
            {
              "title": "콜라주, 사진, 3D",
              "contents": "디자이너는 홈스타일링이 되었을 때를 가정하여 <b%콜라주, 제품 사진, 3D 등으로 시각화된 자료를 제공%b>하게 됩니다. 이는 디자이너의 개인적인 시각화 스킬에 따라 그 종류와 퀄리티가 다를 수 있습니다."
            },
            {
              "title": "주의 사항",
              "contents": "시각화의 경우는 <b%디자이너마다 방식이 모두 다르고, 특히 3D의 경우 어떤 디자이너의 경우 유료로만 제공할 수%b> 있습니다. 시각화는 공간을 미리 확인할 수 있게 해주는 자료이지만 그만큼 시간이 많이 들고 어려운 작업이기에, 지나치게 시각화를 요청할 경우 추가 비용이 들어갈 수 있습니다."
            }
          ]
        },
        {
          "title": "디자인의 수정",
          "children": [
            {
              "title": "수정 횟수",
              "contents": "컨셉은 최대 1회, 그 외의 디자인 수정은 3~5회까지 가능합니다. <b%수정을 너무 많이 하거나 수정 범위가 지나치게 클 경우, 일정에 차질이 생길 수 있어%b> 추후 문제가 발생할 수도 있습니다."
            }
          ]
        }
      ]
    },
    {
      "title": "시공 의뢰서",
      "checklist": [
        {
          "title": "시공사 선택",
          "children": [
            {
              "title": "직접 선택",
              "contents": "홈리에종은 디자인 니즈의 반영, 품질, 합리적인 견적을 제시하는 시공사를 추천하여 고객님께서 직접 시공사를 선택할 수 있도록 해드립니다. 홈리에종 시공사, 디자이너가 데려온 시공사, 턴키 업체 등과 진행하실 수 있으며, <b%공정별 시공 계약은 선택이 불가%b>하십니다."
            },
            {
              "title": "직접 계약",
              "contents": "고객님은 <b%홈스타일링 계약과는 별개로 시공사와 직접 계약을 체결%b>하여 시공을 진행하시게 됩니다. 시공 대금의 지불, 감리, 하자 보수 등의 모든 사항은 고객님이 체결한 시공사 계약에 따릅니다."
            }
          ]
        },
        {
          "title": "시공 진행 과정",
          "children": [
            {
              "title": "시공 리스트",
              "contents": "디자이너는 완성된 <b%디자인안을 바탕으로 필요한 시공 리스트를 작성%b>하여 어떤 시공을 어떻게 할지 명확하게 정하게 됩니다."
            },
            {
              "title": "공정표 제공",
              "contents": "시공이 <b%시작되면 시공사가 공정표를 제공%b>합니다. 공정표는 일반적으로 철거 -&gt 전기, 설비 -&gt 목공 -&gt 도장 -&gt 타일 -&gt 금속 -&gt 마감 순으로 되어 있습니다. 현장 상황에 따라 구체적인 순서는 달라질 수 있습니다."
            },
            {
              "title": "추가 공사 방지",
              "contents": "견적대로 진행하는 것이 중요하며, <b%부득이하게 수정 또는 추가 요청이 있을 경우, 공정상 언제 요청하는지에 따라 비용과 시간이 크게 늘어날 수%b> 있습니다."
            }
          ]
        },
        {
          "title": "시공 하자 보수",
          "children": [
            {
              "title": "AS의 책임",
              "contents": "시공 계약과 홈스타일링 계약은 별도로 존재하기 때문에 시공에 대한 하자 보수 요청이나 불만 사항은 <b%계약된 시공 업체와 소통%b>하셔야 합니다. 홈리에종 시공사와 계약을 하신 경우에만 홈리에종에서 적극적으로 응대를 도와 드립니다."
            }
          ]
        }
      ]
    },
    {
      "title": "제품 리스트",
      "checklist": [
        {
          "title": "기본 사항",
          "children": [
            {
              "title": "제품 리스트",
              "contents": "디자이너는 공간별 구체적인 제품과 그 제품의 구매처(링크)를 제공합니다. 디자이너가 제시해준 구매처로 들어가 <b%직접 고객님께서 결제를 진행%b>하시고 구매를 해주시면 됩니다."
            },
            {
              "title": "구매 대행",
              "contents": "<b%구매 대행은 제공하지 않습니다.%b> 제공하지 않는 이유는 회사에 금전 거래가 발생할 시 일어나는 세금 문제가 있고, 구매 과정에서 이슈가 발생할 시 매우 복잡한 상황이 유발되기 때문입니다."
            },
            {
              "title": "하자 보수",
              "contents": "구매하신 제품에서 하자와 보수할 내용이 생기는 경우, 해당 구매 업체에 요청해주시면 됩니다. <b%구매한 제품에 대한 하자와 보수의 문제는 해당 업체에 책임이%b> 있습니다."
            }
          ]
        },
        {
          "title": "권장 구매 방법",
          "children": [
            {
              "title": "선택의 이유",
              "contents": "디자이너는 제품 자체가 그냥 예뻐서 제안하는 것이 아니라 전체적인 공간의 조화와 컨셉에 맞춰 적절한 제품을 제안합니다. 제품 자체가 엄청 예쁘지 않아도 공간 속에 놓일 때 확 분위기를 바꿔줄 수도 있고, 제품 자체가 아무리 예뻐도 조화롭지 않아 이상한 제품들이 있기 마련입니다. 따라서 <b%디자이너를 믿고 제품을 그대로 구입해주시는 것이 가장 좋습니다.%b>"
            },
            {
              "title": "유사 제품",
              "contents": "추천받은 것과 생김새가 비슷해 보이는 제품이 단순히 더 싸서 구입하실 경우, 문제가 발생할 수 있습니다. <b%제품의 디테일이나 내구성, 사용성 부분에서 차이가 날 수도%b> 있기 때문입니다."
            }
          ]
        }
      ]
    },
    {
      "title": "세팅 안내",
      "checklist": [
        {
          "title": "세팅 안내",
          "children": [
            {
              "title": "기본적인 배치",
              "contents": "<b%이사하는 날 디자이너가 현장에 가지 않기%b> 때문에, 배송된 제품의 수령, 언박싱, 조립, 1차 배치는 고객님께서 진행해주셔야 합니다. 디자이너는 배송 제품을 받아주거나 설치를 해주어야 하는 의무가 없다는 점을 인지해주셔야 합니다."
            },
            {
              "title": "촬영을 위한 세팅",
              "contents": "촬영일이 정해지면 <b%디자이너와 사진 작가가 현장에 방문하여 디자이너의 터치가 들어간 배치가 시작되고 동시에 현장 촬영%b>이 진행됩니다. 촬영된 현장 사진은 보정되어 고객님께 드립니다."
            }
          ]
        },
        {
          "title": "촬영 안내",
          "children": [
            {
              "title": "인터뷰 진행",
              "contents": "디자이너와 사진 작가가 세팅과 촬영을 진행할 때, <b%홈리에종 직원과 함께 고객 인터뷰를 진행%b>하게 됩니다. 인터뷰는 간단한 형식으로 진행되며 일정한 형식으로 편집되어 고객 후기로 웹사이트로 발행됩니다."
            },
            {
              "title": "컨텐츠 발행",
              "contents": "인터뷰와 함께 디자이너 또한 해당 <b%현장에 대한 디자인 의도가 담긴 글을 작성하여 포트폴리오 형식으로 웹사이트에 발행%b>됩니다. 이 컨텐츠들은 향후 디자이너를 홍보하는 데에 활용됩니다."
            }
          ]
        }
      ]
    }
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

  titleWording = "제공 내역 안내";
  subTitleContents = "디자인 진행시 확인해야 할 체크리스트";

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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 6 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 6 %%>;

  whiteBottomMargin = <%% 58, 58, 58, 58, 6 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;

  innerMargin = <%% 40, 40, 40, 40, 4 %%>;

  arrowBetween = <%% 5, 5, 5, 5, 4 %%>;
  arrowWidth = <%% 204, 203, 203, 203, 203 %%>;
  arrowHeight = <%% 100, 100, 100, 100, 100 %%>;

  textTop = <%% -2, -2, -2, -2, -2 %%>;
  textSize = <%% 16, 16, 16, 16, 16 %%>;
  textWeight = <%% 800, 800, 800, 800, 800 %%>;
  textMarginLeft = <%% 50, 50, 50, 50, 50 %%>;

  contents = {
    process: this.staticSetting().map((obj) => { return obj.title }),
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

  grayTong = createNode({
    mother: whiteTong,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(innerMargin) + ea,
      paddingBottom: String(innerMargin) + ea,
      paddingLeft: String(innerMargin) + ea,
      paddingRight: String(innerMargin) + ea,
      width: withOut(innerMargin * 2, ea),
      background: colorChip.gradientGray,
      borderRadius: String(8) + "px",
    }
  });

  for (let i = 0; i < contents.process.length; i++) {
    createNode({
      mother: grayTong,
      style: {
        display: "inline-flex",
        position: "relative",
        width: "calc(calc(100% - " + String(arrowBetween * (contents.process.length - 1)) + ea + ") / " + String(contents.process.length) + ")",
        height: String(arrowHeight) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          mode: "svg",
          source: svgMaker.processArrow(arrowWidth, arrowHeight, colorChip.white),
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(arrowWidth) + ea,
            height: String(arrowHeight) + ea,
            opacity: String(i % 2 === 0 ? 1 : 0.9),
          }
        },
        {
          text: contents.process[i],
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

DesignManualJs.prototype.contentsLoop = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const targetContents = this.staticSetting();

  for (let { title } of targetContents) {
    this.insertChecklistBox(title);
  }

}

DesignManualJs.prototype.insertChecklistBox = function (titleKey) {
  const instance = this;
  const mother = this.mother;
  const { client, ea, baseTong, media, project } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip, ajaxJson, stringToDate, dateToString, cleanChildren, isMac, autoComma } = GeneralJs;
  const blank = "&nbsp;&nbsp;&nbsp;";
  const mainTitle = titleKey;
  const mainContents = this.staticSetting().find((obj) => { return obj.title === titleKey }).checklist;
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

  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 55, 55, 47, 39, 4.7 %%>;
  paddingTop =  <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBottomMargin = <%% 42, 42, 42, 42, 0 %%>;

  titleFontSize = <%% 21, 21, 19, 17, 4 %%>;
  numberRight = <%% 12, 12, 12, 12, 3 %%>;

  titleTopNumber = <%% isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, isMac() ? 0 : 2, 0 %%>;
  titleTop = <%% isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, isMac() ? 1 : 3, 0 %%>;

  titleBottom = <%% (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), (isMac() ? 18 : 16), 0 %%>;
  contentsAreaPaddingTop = <%% 34, 34, 34, 34, 6 %%>;

  mobileTitleLeft = 1.5;
  mobileTitleTop = -8.7;

  secondBlockWidth = <%% 300, 300, 300, 300, 330 %%>;
  secondBlockMargin = <%% 36, 36, 36, 36, 33 %%>;

  contentsWordingSize = <%% 14.5, 14, 14, 13, 3.5 %%>;
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
  contentsMarginBottom1 = <%% 32, 32, 30, 28, 3 %%>;

  lineTop = <%% 10, 10, 10, 10, 10 %%>;
  linePadding = <%% 12, 12, 12, 12, 12 %%>;

  mobilePaddingLeft = 6;

  mobileContentsWordingSize = 3.2;

  checkBoxAreaWidth = <%% 16, 16, 16, 16, 3 %%>;

  this.whiteMargin = (desktop ? margin : 0);

  whiteBlock = createNode({
    mother: baseTong,
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
          paddingBottom: desktop ? "" : String(9.5) + ea,
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
              fontWeight: String(800),
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
    let designers, designer;
    let requestNumber;
    let service;

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
          instance.insertInitBox();
          instance.insertProcessBox();
          instance.contentsLoop();
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
