const collectionName = "projectDesignerStatus";

const collectionDescription = "디자이너가 디자이너 콘솔에서 특정 프로젝트의 상태 체크를 체크한 기록"

const collectionSampleData0 = {
  "_id": "66db32a84931bbf5cdb30d6f",
  "proid": "p2409_aa25s",
  "desid": "d2309_aa07s",
  "matrix": [
    {
      "title": "디자인",
      "children": [
        {
          "title": "현장 미팅 완료",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "firstPhoto",
          "children": [
            {
              "title": "현장 사진 업로드",
              "type": "upload",
              "key": "firstPhoto",
              "photo": true
            },
            {
              "title": "현장 사진 메모",
              "type": "memo",
              "key": "firstPhoto"
            }
          ]
        },
        {
          "title": "일정표 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "scheduleInfo",
          "children": [
            {
              "title": "일정표 업로드",
              "type": "upload",
              "key": "scheduleInfo",
              "photo": false
            },
            {
              "title": "일정표 메모",
              "type": "memo",
              "key": "scheduleInfo"
            }
          ]
        },
        {
          "title": "컨셉 제안서 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "designProposal",
          "children": [
            {
              "title": "컨셉 제안서 업로드",
              "type": "upload",
              "key": "designProposal",
              "photo": false
            },
            {
              "title": "컨셉 제안서 메모",
              "type": "memo",
              "key": "designProposal"
            }
          ]
        },
        {
          "title": "디자인 제안서 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "designDevelop",
          "children": [
            {
              "title": "디자인 제안서 업로드",
              "type": "upload",
              "key": "designDevelop",
              "photo": false
            },
            {
              "title": "디자인 제안서 메모",
              "type": "memo",
              "key": "designDevelop"
            }
          ]
        },
        {
          "title": "수정 제안서 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "designFix",
          "children": [
            {
              "title": "디자인 제안서 업로드",
              "type": "upload",
              "key": "designDevelop",
              "photo": false
            },
            {
              "title": "디자인 제안서 메모",
              "type": "memo",
              "key": "designDevelop"
            }
          ]
        },
        {
          "title": "제품 리스트 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "productList",
          "children": [
            {
              "title": "제품 리스트 업로드",
              "type": "upload",
              "key": "productList",
              "photo": false
            },
            {
              "title": "제품 리스트 메모",
              "type": "memo",
              "key": "productList"
            }
          ]
        },
        {
          "title": "제안서 최종 컨펌",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "finalDesign",
          "children": [
            {
              "title": "최종 완료 메모",
              "type": "memo",
              "key": "finalDesign"
            }
          ]
        }
      ]
    },
    {
      "title": "시공",
      "children": [
        {
          "title": "시공 의뢰서 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "constructInfo",
          "children": [
            {
              "title": "시공 의뢰서 업로드",
              "type": "upload",
              "key": "constructInfo",
              "photo": false
            },
            {
              "title": "시공 의뢰서 메모",
              "type": "memo",
              "key": "constructInfo"
            }
          ]
        },
        {
          "title": "시공 견적서 공유",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "constructEstimate",
          "children": [
            {
              "title": "시공 견적서 업로드",
              "type": "upload",
              "key": "constructEstimate",
              "photo": false
            },
            {
              "title": "시공 견적서 메모",
              "type": "memo",
              "key": "constructEstimate"
            }
          ]
        },
        {
          "title": "시공사 선택 완료",
          "type": "selection",
          "deactive": false,
          "value": 0,
          "key": "constructSelection",
          "children": [
            {
              "title": "홈리에종 시공사",
              "type": "selection",
              "value": 0,
              "view": "홈리에종 시공사 선택"
            },
            {
              "title": "디자이너 시공사",
              "type": "selection",
              "value": 0,
              "view": "디자이너 시공사 선택"
            },
            {
              "title": "고객 시공사",
              "type": "selection",
              "value": 0,
              "view": "고객 시공사 선택"
            }
          ]
        },
        {
          "title": "공정표 공유",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "constructSchedule",
          "children": [
            {
              "title": "시공 공정표 메모",
              "type": "memo",
              "key": "constructSchedule"
            }
          ]
        },
        {
          "title": "시공 착수",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "constructStart",
          "children": [
            {
              "title": "시공 착수 메모",
              "type": "memo",
              "key": "constructStart"
            }
          ]
        },
        {
          "title": "시공 진행중",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "constructProgress",
          "children": [
            {
              "title": "시공 진행 메모",
              "type": "memo",
              "key": "constructProgress"
            }
          ]
        },
        {
          "title": "시공 완료",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "constructMiddleFinal",
          "children": [
            {
              "title": "시공 사진 업로드",
              "type": "upload",
              "key": "middlePhoto",
              "photo": true
            },
            {
              "title": "시공 사진 메모",
              "type": "memo",
              "key": "middlePhoto"
            }
          ]
        },
        {
          "title": "시공 AS 완료",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "constructFinal",
          "children": [
            {
              "title": "시공 AS 메모",
              "type": "memo",
              "key": "constructFinal"
            }
          ]
        }
      ]
    },
    {
      "title": "구매",
      "children": [
        {
          "title": "제품 구매 시작 전",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "productReady",
          "children": [
            {
              "title": "제품 리스트 업로드",
              "type": "upload",
              "key": "productList",
              "photo": false
            },
            {
              "title": "제품 리스트 메모",
              "type": "memo",
              "key": "productList"
            }
          ]
        },
        {
          "title": "제품 구매 진행중",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "productPurchase",
          "children": [
            {
              "title": "제품 구매 메모",
              "type": "memo",
              "key": "productPurchase"
            }
          ]
        },
        {
          "title": "구매 완료, 배송중",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "productProgress",
          "children": [
            {
              "title": "배송중 메모",
              "type": "memo",
              "key": "productProgress"
            }
          ]
        },
        {
          "title": "배송 및 세팅 완료",
          "type": "upload",
          "deactive": false,
          "value": 0,
          "key": "productComplete",
          "children": [
            {
              "title": "제품 배치도 업로드",
              "type": "upload",
              "key": "settingGuide",
              "photo": false
            },
            {
              "title": "제품 배치도 메모",
              "type": "memo",
              "key": "settingGuide"
            }
          ]
        }
      ]
    },
    {
      "title": "세팅",
      "children": [
        {
          "title": "촬영 여부 확인",
          "type": "selection",
          "deactive": false,
          "value": 0,
          "key": "photoSelection",
          "children": [
            {
              "title": "촬영 진행 희망",
              "type": "selection",
              "value": 0,
              "view": "촬영 진행 희망"
            },
            {
              "title": "촬영 진행 안 함",
              "type": "selection",
              "value": 0,
              "view": "촬영 진행 안 함"
            }
          ]
        },
        {
          "title": "촬영일 확인 완료",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "contentsPhoto",
          "children": [
            {
              "title": "촬영일 메모",
              "type": "memo",
              "key": "contentsPhoto"
            }
          ]
        },
        {
          "title": "세팅 및 촬영 완료",
          "type": "string",
          "deactive": false,
          "value": 0,
          "key": "projectFinal",
          "children": [
            {
              "title": "세팅 관련 메모",
              "type": "memo",
              "key": "projectFinal"
            }
          ]
        }
      ]
    }
  ]
}

