// generalBill : 홈리에종과 고객, 디자이너 사이에서 돈이 오가고 한 기록들과 줘야 할 돈, 받아야 할 돈이 모두 기록되는 종합 영수증 db입니다. 돈과 관련된 가장 중심적인 db로 고객에세 받아야 할 돈과 받은 돈의 기록인 'requests' 배열과 디자이너 또는 소장님에게 줘야 할 돈과 준 기록이 담겨 있는 'responses'로 구성되어 있습니다.

/**
 * 샘플 데이터 객체 sampleData0
 * 고객과 디자이너 간의 인테리어 작업 관련 영수증 정보를 담고 있습니다.
 * 각 필드는 영수증의 세부 사항을 나타냅니다.
 */
const sampleData0 = {
  /**
   * bilid: 영수증 ID (문자열)
   */
  "bilid": "b23b4_aa01s",

  /**
   * class: 영수증의 클래스 또는 유형 (문자열)
   */
  "class": "style",

  /**
   * name: 영수증의 이름, 주로 고객 이름과 작업 유형을 포함 (문자열)
   */
  "name": "안효진_010-6594-0774_스타일링",

  /**
   * date: 영수증 생성 날짜 (Date 객체)
   */
  "date": new Date("2023-11-04T04:54:40.369Z"),

  /**
   * participant: 이 작업에 관련된 사람들의 정보
   * managers: 담당 매니저들의 정보 목록
   * customer: 고객 정보
   * designer: 디자이너 정보
   */
  "participant": {
    /**
     * managers: 매니저 정보 배열
     * id: 매니저 ID (문자열)
     * name: 매니저 이름 (문자열)
     * phone: 매니저 전화번호 (문자열)
     * email: 매니저 이메일 주소 (문자열)
     */
    "managers": [
      {
        "id": "m1701_aa01s",
        "name": "박혜연",
        "phone": "010-6310-0284",
        "email": "hyp1121@gmail.com"
      }
    ],
    /**
     * customer: 고객 정보 객체
     * id: 고객 ID (문자열)
     * name: 고객 이름 (문자열)
     * phone: 고객 전화번호 (문자열)
     * email: 고객 이메일 주소 (문자열)
     */
    "customer": {
      "id": "c2310_ab29s",
      "name": "안효진",
      "phone": "010-6594-0774",
      "email": "hyojin67@naver.com"
    },
    /**
     * designer: 디자이너 정보 객체
     * id: 디자이너 ID (문자열)
     * name: 디자이너 이름 (문자열)
     * phone: 디자이너 전화번호 (문자열)
     * email: 디자이너 이메일 주소 (문자열)
     */
    "designer": {
      "id": "d2310_aa06s",
      "name": "허유진",
      "phone": "010-9931-4324",
      "email": "heoyujin1029@naver.com"
    }
  },

  /**
   * requests: 고객에게 청구된 결제 요청 목록
   * 각 객체는 개별 청구 내역을 나타냅니다.
   */
  "requests": [
    {
      /**
       * id: 요청 ID (문자열)
       */
      "id": "b23b4_aa01s_r7",

      /**
       * date: 요청 생성 날짜 (Date 객체)
       */
      "date": new Date("2024-02-08T02:50:39.554Z"),

      /**
       * removal: 요청 삭제 예정일 (Date 객체, 특정 값인 1799-12-31은 유효한 삭제 날짜가 아님을 의미)
       */
      "removal": new Date("1799-12-31T15:32:08.000Z"),

      /**
       * name: 요청 이름, 보통 청구 항목의 이름을 나타냄 (문자열)
       */
      "name": "시공 잔금",

      /**
       * status: 결제 상태, 결제 완료인지 여부를 나타냄 (문자열)
       */
      "status": "결제 완료",

      /**
       * info: 추가적인 결제 정보 배열, 결제 관련 세부 정보를 포함
       */
      "info": [
        {
          /**
           * 가상 계좌 정보, 결제 시 사용된 계좌 정보가 포함됨
           */
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1709613512359",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "716000",
            "real_account": "true"
          }
        },
        {
          /**
           * oid: 원거래 식별자, 해당 결제가 참조하는 거래의 고유 ID
           */
          "oid": "homeliaisonBill_1709613512359"
        },
        {
          /**
           * data: 결제에 대한 상세 데이터, 결제의 결과와 관련된 정보들이 포함됨
           */
          "data": {
            "goodName": "시공 잔금",
            "goodsName": "시공 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240305133832",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1709613512359",
            "TotPrice": "716000",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240312",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "1"
          }
        },
        {
          /**
           * address: 관련 주소 정보
           */
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          /**
           * pyeong: 평수 정보
           */
          "pyeong": 43
        }
      ],

      /**
       * items: 청구 항목 목록, 각 항목에 대한 정보가 포함됨
       */
      "items": [
        {
          /**
           * id: 항목 ID (문자열)
           */
          "id": "b23b4_aa01s_ictr",

          /**
           * class: 항목 클래스, 항목의 카테고리를 나타냄 (문자열)
           */
          "class": "constructTimeRemain",

          /**
           * name: 항목 이름, 청구 항목의 명칭을 나타냄 (문자열)
           */
          "name": "시공 잔금",

          /**
           * description: 항목 설명, 해당 항목이 무엇을 의미하는지 설명 (문자열)
           */
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 잔금입니다.",

          /**
           * info: 항목에 대한 추가 정보 배열
           */
          "info": [],

          /**
           * unit: 단위 정보, 항목의 가격과 수량 등을 포함
           * ea: 단위 수량 (문자열, 예: '회')
           * price: 단가 (숫자)
           * number: 수량 (숫자)
           */
          "unit": {
            "ea": null,
            "price": 650910,
            "number": 1
          },

          /**
           * amount: 금액 정보
           * supply: 공급가액 (숫자)
           * vat: 부가세 (숫자)
           * consumer: 소비자가 (숫자)
           */
          "amount": {
            "supply": 650910,
            "vat": 65090,
            "consumer": 716000
          }
        }
      ],

      /**
       * pay: 결제 기록 목록, 각 결제에 대한 정보가 포함됨
       */
      "pay": [
        {
          /**
           * date: 결제 날짜 (Date 객체)
           */
          "date": new Date("2024-03-05T04:38:47.848Z"),

          /**
           * amount: 결제 금액 (숫자)
           */
          "amount": 716000,

          /**
           * oid: 원거래 식별자, 해당 결제가 참조하는 거래의 고유 ID (문자열)
           */
          "oid": "homeliaisonBill_1709613512359"
        }
      ],

      /**
       * cancel: 결제 취소 목록, 각 취소에 대한 정보가 포함됨
       */
      "cancel": [],

      /**
       * proofs: 결제 증빙 자료 목록, 각 증빙 자료에 대한 정보가 포함됨
       */
      "proofs": [
        {
          /**
           * date: 증빙 자료 생성 날짜 (Date 객체)
           */
          "date": new Date("2024-03-05T04:38:47.850Z"),

          /**
           * method: 결제 방법 (문자열)
           */
          "method": "계좌 이체",

          /**
           * proof: 증빙 자료 (문자열)
           */
          "proof": "현금 영수증",

          /**
           * to: 증빙 자료의 대상자 (문자열)
           */
          "to": "안효진"
        }
      ],

      /**
       * comments: 요청에 대한 추가 설명이나 코멘트 배열
       */
      "comments": [
        "잔금은 공사가 마무리된 후, 내시는 금액입니다. 전체 시공 금액에 포함됩니다.",
        "잔금을 내시면 공사가 마무리되고, 홈스타일링 과정상 시공 다음 단계가 진행됩니다."
      ],

      /**
       * target: 요청의 대상자 정보
       * id: 대상자 ID (문자열)
       * name: 대상자 이름 (문자열)
       * phone: 대상자 전화번호 (문자열)
       * email: 대상자 이메일 주소 (문자열)
       */
      "target": {
        "id": "c2310_ab29s",
        "name": "안효진",
        "phone": "010-6594-0774",
        "email": "hyojin67@naver.com"
      }
    },

    // 추가적인 요청들이 동일한 구조로 이어집니다...
    {
      "id": "b23b4_aa01s_r6",
      "date": new Date("2024-02-08T02:50:39.447Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "시공 착수금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1709613452586",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "5728000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1709613452586"
        },
        {
          "data": {
            "goodName": "시공 착수금",
            "goodsName": "시공 착수금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240305133732",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1709613452586",
            "TotPrice": "5728000",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240312",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "1"
          }
        },
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_icts",
          "class": "constructTimeStart",
          "name": "시공 착수금",
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 착수금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 5207273,
            "number": 1
          },
          "amount": {
            "supply": 5207273,
            "vat": 520727,
            "consumer": 5728000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-03-05T04:37:58.801Z"),
          "amount": 5728000,
          "oid": "homeliaisonBill_1709613452586"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-03-05T04:37:58.801Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안효진"
        }
      ],
      "comments": [
        "착수금은 공사를 시작하기 위한 금액입니다. 전체 시공 금액에 포함됩니다.",
        "착수금 입금하시면 본격적인 시공이 진행됩니다."
      ],
      "target": {
        "id": "c2310_ab29s",
        "name": "안효진",
        "phone": "010-6594-0774",
        "email": "hyojin67@naver.com"
      }
    },
    {
      "id": "b23b4_aa01s_r5",
      "date": new Date("2024-02-08T02:50:39.338Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "시공 계약금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1709613396086",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "716000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1709613396086"
        },
        {
          "data": {
            "goodName": "시공 계약금",
            "goodsName": "시공 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240305133636",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1709613396086",
            "TotPrice": "716000",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240312",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "1"
          }
        },
        {
          "key": "refundReceipt",
          "oid": "homeliaisonBill_1707905582802",
          "data": {
            "original": 716000,
            "refund": 716000,
            "info": {
              "accountNumber": "3520894706693",
              "bankName": "농협중앙회",
              "accountName": "안효진"
            }
          }
        },
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1707905582802",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "716000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1707905582802"
        },
        {
          "data": {
            "goodName": "시공 계약금",
            "goodsName": "시공 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240214191302",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1707905582802",
            "TotPrice": "716000",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240221",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "2330137050"
          }
        },
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_ictf",
          "class": "constructTimeFirst",
          "name": "시공 계약금",
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 계약금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 650910,
            "number": 1
          },
          "amount": {
            "supply": 650910,
            "vat": 65090,
            "consumer": 716000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-03-05T04:37:13.124Z"),
          "amount": 716000,
          "oid": "homeliaisonBill_1709613396086"
        },
        {
          "date": new Date("2024-02-14T10:15:54.095Z"),
          "amount": 716000,
          "oid": "homeliaisonBill_1707905582802"
        }
      ],
      "cancel": [
        {
          "date": new Date("2024-03-05T01:06:50.497Z"),
          "amount": 716000,
          "oid": "homeliaisonBill_1707905582802"
        }
      ],
      "proofs": [
        {
          "date": new Date("2024-03-05T04:37:13.124Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안효진"
        },
        {
          "date": new Date("2024-03-05T01:06:50.497Z"),
          "method": "계좌 이체 취소",
          "proof": "현금영수증",
          "to": "안효진"
        },
        {
          "date": new Date("2024-02-14T10:15:54.095Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안효진"
        }
      ],
      "comments": [
        "계약금은 전체 시공 금액에 포함됩니다.",
        "계약금을 입금하시면 해당 시공사에게 고객님 정보가 전달되며, 현장 미팅을 할 수 있습니다."
      ],
      "target": {
        "id": "c2310_ab29s",
        "name": "안효진",
        "phone": "010-6594-0774",
        "email": "hyojin67@naver.com"
      }
    },
    {
      "id": "b23b4_aa01s_r1",
      "date": new Date("2023-11-04T04:54:40.480Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1702268467960",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "2614755",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1702268467960"
        },
        {
          "data": {
            "goodName": "홈리에종 잔금",
            "goodsName": "홈리에종 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20231211132107",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1702268467960",
            "TotPrice": "2614755",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20231218",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "2330137050"
          }
        },
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 2377050,
            "number": 1
          },
          "amount": {
            "supply": 2377050,
            "vat": 237705,
            "consumer": 2614755
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-11T04:24:06.652Z"),
          "amount": 2614755,
          "oid": "homeliaisonBill_1702268467960"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-11T04:24:06.652Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안효진"
        }
      ],
      "comments": [
        "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
        "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
        "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
        "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다."
      ],
      "target": {
        "id": "c2310_ab29s",
        "name": "안효진",
        "phone": "010-6594-0774",
        "email": "hyojin67@naver.com"
      }
    },
    {
      "id": "b23b4_aa01s_r0",
      "date": new Date("2023-11-04T04:54:40.375Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 계약금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1699073701154",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안효진",
            "amt_input": "330000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1699073701154"
        },
        {
          "data": {
            "goodName": "홈리에종 계약금",
            "goodsName": "홈리에종 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20231104135501",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1699073701154",
            "TotPrice": "330000",
            "buyerName": "안효진",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20231111",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "010-7560-3253"
          }
        },
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 300000,
            "number": 1
          },
          "amount": {
            "supply": 300000,
            "vat": 30000,
            "consumer": 330000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-11-04T04:58:27.212Z"),
          "amount": 330000,
          "oid": "homeliaisonBill_1699073701154"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-11-04T04:58:27.212Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안효진"
        }
      ],
      "comments": [
        "계약금은 전체 서비스 금액에 포함됩니다.",
        "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
        "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.",
        "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다."
      ],
      "target": {
        "id": "c2310_ab29s",
        "name": "안효진",
        "phone": "010-6594-0774",
        "email": "hyojin67@naver.com"
      }
    }
  ],
  /**
   * responses: 디자이너 또는 시공사에게 지급해야 할 금액 및 관련된 응답 목록
   */
  "responses": [
    {
      /**
       * id: 응답 ID (문자열)
       */
      "id": "b23b4_aa01s_s4",

      /**
       * date: 응답 생성 날짜 (Date 객체)
       */
      "date": new Date("2024-03-08T06:36:43.542Z"),

      /**
       * removal: 응답 삭제 예정일 (Date 객체, 특정 값인 1799-12-31은 유효한 삭제 날짜가 아님을 의미)
       */
      "removal": new Date("1799-12-31T15:32:08.000Z"),

      /**
       * name: 응답 이름, 주로 지급 대상의 이름 (문자열)
       */
      "name": "홈리에종 시공 정산",

      /**
       * status: 정산 상태, 정산 대기 여부를 나타냄 (문자열)
       */
      "status": "정산 대기",

      /**
       * info: 추가적인 정산 정보 배열, 정산 관련 세부 정보를 포함
       */
      "info": [
        {
          "address": "서울 강남구 개포동 660-4 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        }
      ],

      /**
       * items: 정산 항목 목록, 각 항목에 대한 정보가 포함됨
       */
      "items": [
        {
          /**
           * id: 항목 ID (문자열)
           */
          "id": "b23b4_aa01s_ecgs",

          /**
           * class: 항목 클래스, 항목의 카테고리를 나타냄 (문자열)
           */
          "class": "generalExpenses",

          /**
           * name: 항목 이름, 정산 항목의 명칭을 나타냄 (문자열)
           */
          "name": "시공 비용",

          /**
           * description: 항목 설명, 해당 항목이 무엇을 의미하는지 설명 (문자열)
           */
          "description": "시공 비용입니다.",

          /**
           * info: 항목에 대한 추가 정보 배열
           */
          "info": [],

          /**
           * unit: 단위 정보, 항목의 가격과 수량 등을 포함
           * ea: 단위 수량 (문자열, 예: '회')
           * price: 단가 (숫자)
           * number: 수량 (숫자)
           */
          "unit": {
            "ea": null,
            "price": 423500,
            "number": 1
          },

          /**
           * amount: 금액 정보
           * pure: 순수 금액 (숫자)
           * commission: 수수료 금액 (숫자)
           */
          "amount": {
            "pure": 423500,
            "commission": 0
          }
        }
      ],

      /**
       * pay: 정산 기록 목록, 각 정산에 대한 정보가 포함됨
       */
      "pay": [
        {
          "amount": 423500,
          "date": new Date("2024-03-08T06:36:44.820Z"),
          "oid": ""
        }
      ],

      /**
       * cancel: 정산 취소 목록, 각 취소에 대한 정보가 포함됨
       */
      "cancel": [],

      /**
       * proofs: 정산 증빙 자료 목록, 각 증빙 자료에 대한 정보가 포함됨
       */
      "proofs": [
        {
          "date": new Date("2024-03-08T06:36:44.820Z"),
          "method": "계좌 이체",
          "proof": "허유진",
          "to": "허유진"
        }
      ],

      /**
       * comments: 응답에 대한 추가 설명이나 코멘트 배열
       */
      "comments": [],

      /**
       * target: 정산의 대상자 정보
       * id: 대상자 ID (문자열)
       * name: 대상자 이름 (문자열)
       * phone: 대상자 전화번호 (문자열)
       * email: 대상자 이메일 주소 (문자열)
       */
      "target": {
        "id": "",
        "name": "예솔",
        "phone": "",
        "email": ""
      }
    },

    // 추가적인 응답들이 동일한 구조로 이어집니다...
    {
      "id": "b23b4_aa01s_s3",
      "date": new Date("2024-03-05T01:02:25.223Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 시공 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 강남구 개포동 660-4 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_ecgs",
          "class": "generalExpenses",
          "name": "시공 비용",
          "description": "시공 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 5500000,
            "number": 1
          },
          "amount": {
            "pure": 5500000,
            "commission": 0
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-03-05T01:02:27.178Z"),
          "amount": 5500000,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-03-05T01:02:27.178Z"),
          "method": "계좌 이체",
          "proof": "허유진",
          "to": "허유진"
        }
      ],
      "comments": [],
      "target": {
        "id": "",
        "name": "예솔",
        "phone": "",
        "email": ""
      }
    },
    {
      "id": "b23b4_aa01s_s2",
      "date": new Date("2024-02-21T07:34:31.651Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 시공 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 강남구 개포동 660-4 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_ecgs",
          "class": "generalExpenses",
          "name": "시공 비용",
          "description": "시공 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 660000,
            "number": 1
          },
          "amount": {
            "pure": 660000,
            "commission": 0
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-02-21T07:34:33.387Z"),
          "amount": 660000,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-02-21T07:34:33.387Z"),
          "method": "계좌 이체",
          "proof": "허유진",
          "to": "허유진"
        }
      ],
      "comments": [],
      "target": {
        "id": "",
        "name": "예솔",
        "phone": "",
        "email": ""
      }
    },
    {
      "id": "b23b4_aa01s_s1",
      "date": new Date("2023-11-04T04:54:40.690Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2310_aa06s"
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_edfr",
          "class": "designerFeeRemain",
          "name": "디자인비 잔금",
          "description": "디자인 비용에 대한 잔금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 906045,
            "number": 1
          },
          "amount": {
            "pure": 906045,
            "commission": 432480
          }
        }
      ],
      "pay": [
        {
          "amount": 906045,
          "date": new Date("2024-05-20T04:50:23.685Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-05-20T04:50:23.685Z"),
          "method": "계좌 이체",
          "proof": "허유진",
          "to": "허유진"
        }
      ],
      "comments": [
        "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2310_aa06s",
        "name": "허유진",
        "phone": "010-9931-4324",
        "email": "heoyujin1029@naver.com"
      }
    },
    {
      "id": "b23b4_aa01s_s0",
      "date": new Date("2023-11-04T04:54:40.585Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 선금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 강남구 개포동 660-10 디에이치퍼스티어아이파크 137동 1702호"
        },
        {
          "pyeong": 43
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2310_aa06s"
        }
      ],
      "items": [
        {
          "id": "b23b4_aa01s_edff",
          "class": "designerFeeFirst",
          "name": "디자인비 선금",
          "description": "디자인 비용에 대한 선금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 906045,
            "number": 1
          },
          "amount": {
            "pure": 906045,
            "commission": 432480
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-18T06:16:16.659Z"),
          "amount": 906045,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-18T06:16:16.659Z"),
          "method": "계좌 이체",
          "proof": "허유진",
          "to": "허유진"
        }
      ],
      "comments": [
        "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2310_aa06s",
        "name": "허유진",
        "phone": "010-9931-4324",
        "email": "heoyujin1029@naver.com"
      }
    }
  ],
  /**
   * links: 관련된 링크 정보
   * cliid: 고객 ID (문자열)
   * desid: 디자이너 ID (문자열)
   * method: 결제 방식 (문자열)
   * proid: 프로젝트 ID (문자열)
   * oid: 결제와 관련된 여러 거래 ID 목록 (배열)
   */
  "links": {
    "cliid": "c2310_ab29s",
    "desid": "d2310_aa06s",
    "method": "offline",
    "proid": "p2310_ab31s",
    "oid": [
      "homeliaisonBill_1709613512359",
      "homeliaisonBill_1709613452586",
      "homeliaisonBill_1709613396086",
      "homeliaisonBill_1707905582802",
      "homeliaisonBill_1702268467960",
      "homeliaisonBill_1699073701154"
    ]
  }
}

const sampleData1 = {
  "bilid": "b23be_aa02s",
  "class": "style",
  "name": "배유빈_010-7756-5340_스타일링",
  "date": new Date("2023-11-14T05:17:29.784Z"),
  "participant": {
    "managers": [
      {
        "id": "m1701_aa01s",
        "name": "박혜연",
        "phone": "010-6310-0284",
        "email": "hyp1121@gmail.com"
      }
    ],
    "customer": {
      "id": "c2107_aa93s",
      "name": "배유빈",
      "phone": "010-7756-5340",
      "email": "gomubin2@naver.com"
    },
    "designer": {
      "id": "d2310_aa02s",
      "name": "김은경",
      "phone": "010-8633-7814",
      "email": "ekim@eku.kr"
    }
  },
  "requests": [
    {
      "id": "b23be_aa02s_r2",
      "date": new Date("2023-11-14T05:24:30.345Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "디자이너 출장비",
      "status": "결제 요청",
      "info": [
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "distance": "43km"
        },
        {
          "time": "0시간 58분"
        },
        {
          "number": 2
        },
        {
          "limit": 5
        },
        {
          "method": "online"
        },
        {
          "desid": "d2310_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_ites",
          "class": "travelExpenses",
          "name": "출장비",
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          "info": [],
          "unit": {
            "ea": "회",
            "price": 39000,
            "number": 1
          },
          "amount": {
            "supply": 39000,
            "vat": 3900,
            "consumer": 42900
          }
        }
      ],
      "pay": [],
      "cancel": [],
      "proofs": [],
      "comments": [
        "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      "target": {
        "id": "c2107_aa93s",
        "name": "배유빈",
        "phone": "010-7756-5340",
        "email": "gomubin2@naver.com"
      }
    },
    {
      "id": "b23be_aa02s_r1",
      "date": new Date("2023-11-14T05:17:29.917Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금",
      "status": "결제 요청",
      "info": [
        {
          "oid": "homeliaisonBill_1703313838994"
        },
        {
          "data": {
            "goodName": "홈리에종 잔금",
            "goodsName": "홈리에종 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20231223154359",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1703313838994",
            "TotPrice": "1463880",
            "buyerName": "배유빈",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20231230",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "010-7756-5340"
          }
        },
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "method": "online"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1330800,
            "number": 1
          },
          "amount": {
            "supply": 1330800,
            "vat": 133080,
            "consumer": 1463880.0000000002
          }
        }
      ],
      "pay": [],
      "cancel": [],
      "proofs": [],
      "comments": [
        "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
        "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
        "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
        "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다."
      ],
      "target": {
        "id": "c2107_aa93s",
        "name": "배유빈",
        "phone": "010-7756-5340",
        "email": "gomubin2@naver.com"
      }
    },
    {
      "id": "b23be_aa02s_r0",
      "date": new Date("2023-11-14T05:17:29.805Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 계약금",
      "status": "전체 환불",
      "info": [
        {
          "resultCode": "00",
          "resultMsg": "정상처리되었습니다.",
          "cancelDate": "20240325",
          "cancelTime": "094218",
          "receiptInfo": "",
          "cshrCancelNum": "",
          "detailResultCode": ""
        },
        {
          "oid": "homeliaisonBill_1699939446539"
        },
        {
          "data": {
            "goodName": "홈리에종 계약금",
            "goodsName": "홈리에종 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "INIMX_CARDMOIhomeli120231114142429465918",
            "payMethod": "CARD",
            "applDate": "20231114142430",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1699939446539",
            "TotPrice": "330000",
            "buyerName": "배유빈",
            "CARD_BankCode": "365",
            "CARD_Num": "545089000527",
            "CARD_ApplPrice": "330000",
            "CARD_Code": "365",
            "vactBankName": "삼성카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "삼성카드"
          }
        },
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "method": "online"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 300000,
            "number": 1
          },
          "amount": {
            "supply": 300000,
            "vat": 30000,
            "consumer": 330000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-11-14T05:24:30.204Z"),
          "amount": 330000,
          "oid": "homeliaisonBill_1699939446539"
        }
      ],
      "cancel": [
        {
          "date": new Date("2024-03-25T00:42:18.085Z"),
          "amount": 330000,
          "oid": "homeliaisonBill_1699939446539"
        }
      ],
      "proofs": [
        {
          "date": new Date("2024-03-25T00:42:18.085Z"),
          "method": "카드(삼성) 취소",
          "proof": "이니시스",
          "to": "배유빈"
        },
        {
          "date": new Date("2023-11-14T05:24:30.204Z"),
          "method": "카드(삼성)",
          "proof": "이니시스",
          "to": "배유빈"
        }
      ],
      "comments": [
        "계약금은 전체 서비스 금액에 포함됩니다.",
        "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
        "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.",
        "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다."
      ],
      "target": {
        "id": "c2107_aa93s",
        "name": "배유빈",
        "phone": "010-7756-5340",
        "email": "gomubin2@naver.com"
      }
    }
  ],
  "responses": [
    {
      "id": "b23be_aa02s_s2",
      "date": new Date("2023-11-14T05:24:30.456Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "출장비 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "distance": "43km"
        },
        {
          "time": "0시간 58분"
        },
        {
          "number": 2
        },
        {
          "limit": 5
        },
        {
          "method": "online"
        },
        {
          "desid": "d2310_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_edte",
          "class": "travelExpenses",
          "name": "디자이너 출장비",
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          "info": [],
          "unit": {
            "ea": "회",
            "price": 36270,
            "number": 1
          },
          "amount": {
            "pure": 36270,
            "commission": 2730
          }
        }
      ],
      "pay": [],
      "cancel": [],
      "proofs": [],
      "comments": [
        "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      "target": {
        "id": "d2310_aa02s",
        "name": "김은경",
        "phone": "010-8633-7814",
        "email": "ekim@eku.kr"
      }
    },
    {
      "id": "b23be_aa02s_s1",
      "date": new Date("2023-11-14T05:17:30.130Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "method": "online"
        },
        {
          "desid": "d2310_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_edfr",
          "class": "designerFeeRemain",
          "name": "디자인비 잔금",
          "description": "디자인 비용에 대한 잔금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 0,
            "number": 1
          },
          "amount": {
            "pure": 0,
            "commission": 244620
          }
        }
      ],
      "pay": [],
      "cancel": [],
      "proofs": [],
      "comments": [
        "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2310_aa02s",
        "name": "김은경",
        "phone": "010-8633-7814",
        "email": "ekim@eku.kr"
      }
    },
    {
      "id": "b23be_aa02s_s0",
      "date": new Date("2023-11-14T05:17:30.024Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 선금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 봉담읍 삼봉안길 20-22 봉담 프라이드시티 자이 109동 501호"
        },
        {
          "pyeong": 35
        },
        {
          "method": "online"
        },
        {
          "desid": "d2310_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa02s_edff",
          "class": "designerFeeFirst",
          "name": "디자인비 선금",
          "description": "디자인 비용에 대한 선금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 0,
            "number": 1
          },
          "amount": {
            "pure": 0,
            "commission": 244620
          }
        }
      ],
      "pay": [],
      "cancel": [],
      "proofs": [],
      "comments": [
        "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2310_aa02s",
        "name": "김은경",
        "phone": "010-8633-7814",
        "email": "ekim@eku.kr"
      }
    }
  ],
  "links": {
    "cliid": "c2107_aa93s",
    "desid": "d2310_aa02s",
    "method": "online",
    "proid": "p2311_aa68s",
    "oid": [
      "homeliaisonBill_1703313838994",
      "homeliaisonBill_1699939446539"
    ]
  }
}

const sampleData2 = {
  "bilid": "b23be_aa03s",
  "class": "style",
  "name": "김주영_010-9162-7066_스타일링",
  "date": new Date("2023-11-14T09:08:43.984Z"),
  "participant": {
    "managers": [
      {
        "id": "m1701_aa01s",
        "name": "박혜연",
        "phone": "010-6310-0284",
        "email": "hyp1121@gmail.com"
      }
    ],
    "customer": {
      "id": "c2311_aa61s",
      "name": "김주영",
      "phone": "010-9162-7066",
      "email": "Kimmr0624@daum.net"
    },
    "designer": {
      "id": "d2309_aa07s",
      "name": "이지연",
      "phone": "010-2980-4030",
      "email": "jiyoun4030@gmail.com"
    }
  },
  "requests": [
    {
      "id": "b23be_aa03s_r2",
      "date": new Date("2023-11-14T09:10:12.633Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "디자이너 출장비",
      "status": "결제 완료",
      "info": [
        {
          "oid": "homeliaisonBill_1702897946021"
        },
        {
          "data": {
            "goodName": "디자이너 출장비",
            "goodsName": "디자이너 출장비",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "INIMX_CARDMOIhomeli120231218201246895321",
            "payMethod": "CARD",
            "applDate": "20231218201247",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1702897946021",
            "TotPrice": "44000",
            "buyerName": "김주영",
            "CARD_BankCode": "371",
            "CARD_Num": "542416049968",
            "CARD_ApplPrice": "44000",
            "CARD_Code": "371",
            "vactBankName": "NH카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "NH카드"
          }
        },
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "distance": "46km"
        },
        {
          "time": "0시간 49분"
        },
        {
          "number": 2
        },
        {
          "limit": 5
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2309_aa07s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_ites",
          "class": "travelExpenses",
          "name": "출장비",
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          "info": [],
          "unit": {
            "ea": "회",
            "price": 40000,
            "number": 1
          },
          "amount": {
            "supply": 40000,
            "vat": 4000,
            "consumer": 44000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-18T11:12:47.612Z"),
          "amount": 44000,
          "oid": "homeliaisonBill_1702897946021"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-18T11:12:47.612Z"),
          "method": "카드(NH)",
          "proof": "이니시스",
          "to": "김주영"
        }
      ],
      "comments": [
        "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      "target": {
        "id": "c2311_aa61s",
        "name": "김주영",
        "phone": "010-9162-7066",
        "email": "Kimmr0624@daum.net"
      }
    },
    {
      "id": "b23be_aa03s_r1",
      "date": new Date("2023-11-14T09:08:44.102Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금",
      "status": "결제 완료",
      "info": [
        {
          "oid": "homeliaisonBill_1702897895903"
        },
        {
          "data": {
            "goodName": "홈리에종 잔금",
            "goodsName": "홈리에종 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "INIMX_CARDMOIhomeli120231218201205105576",
            "payMethod": "CARD",
            "applDate": "20231218201206",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1702897895903",
            "TotPrice": "2376660",
            "buyerName": "김주영",
            "CARD_BankCode": "371",
            "CARD_Num": "542416049968",
            "CARD_ApplPrice": "2376660",
            "CARD_Code": "371",
            "vactBankName": "NH카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "NH카드"
          }
        },
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 2160600,
            "number": 1
          },
          "amount": {
            "supply": 2160600,
            "vat": 216060,
            "consumer": 2376660
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-18T11:12:06.201Z"),
          "amount": 2376660,
          "oid": "homeliaisonBill_1702897895903"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-18T11:12:06.201Z"),
          "method": "카드(NH)",
          "proof": "이니시스",
          "to": "김주영"
        }
      ],
      "comments": [
        "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
        "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
        "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
        "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다."
      ],
      "target": {
        "id": "c2311_aa61s",
        "name": "김주영",
        "phone": "010-9162-7066",
        "email": "Kimmr0624@daum.net"
      }
    },
    {
      "id": "b23be_aa03s_r0",
      "date": new Date("2023-11-14T09:08:43.996Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 계약금",
      "status": "결제 완료",
      "info": [
        {
          "oid": "homeliaisonBill_1699952940194"
        },
        {
          "data": {
            "goodName": "홈리에종 계약금",
            "goodsName": "홈리에종 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "INIMX_CARDMOIhomeli120231114181011575379",
            "payMethod": "CARD",
            "applDate": "20231114181012",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1699952940194",
            "TotPrice": "330000",
            "buyerName": "김주영",
            "CARD_BankCode": "371",
            "CARD_Num": "542416049968",
            "CARD_ApplPrice": "330000",
            "CARD_Code": "371",
            "vactBankName": "NH카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "NH카드"
          }
        },
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 300000,
            "number": 1
          },
          "amount": {
            "supply": 300000,
            "vat": 30000,
            "consumer": 330000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-11-14T09:10:12.473Z"),
          "amount": 330000,
          "oid": "homeliaisonBill_1699952940194"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-11-14T09:10:12.473Z"),
          "method": "카드(NH)",
          "proof": "이니시스",
          "to": "김주영"
        }
      ],
      "comments": [
        "계약금은 전체 서비스 금액에 포함됩니다.",
        "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
        "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.",
        "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다."
      ],
      "target": {
        "id": "c2311_aa61s",
        "name": "김주영",
        "phone": "010-9162-7066",
        "email": "Kimmr0624@daum.net"
      }
    }
  ],
  "responses": [
    {
      "id": "b23be_aa03s_s2",
      "date": new Date("2023-11-14T09:10:12.741Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "출장비 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "distance": "46km"
        },
        {
          "time": "0시간 49분"
        },
        {
          "number": 2
        },
        {
          "limit": 5
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2309_aa07s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_edte",
          "class": "travelExpenses",
          "name": "디자이너 출장비",
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          "info": [],
          "unit": {
            "ea": "회",
            "price": 40920,
            "number": 1
          },
          "amount": {
            "pure": 40920,
            "commission": 2800
          }
        }
      ],
      "pay": [
        {
          "amount": 40920,
          "date": new Date("2024-01-22T03:01:00.084Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-01-22T03:01:00.084Z"),
          "method": "계좌 이체",
          "proof": "디자인호호(이지연)",
          "to": "디자인호호(이지연)"
        }
      ],
      "comments": [
        "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      "target": {
        "id": "d2309_aa07s",
        "name": "이지연",
        "phone": "010-2980-4030",
        "email": "jiyoun4030@gmail.com"
      }
    },
    {
      "id": "b23be_aa03s_s1",
      "date": new Date("2023-11-14T09:08:44.317Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2309_aa07s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_edfr",
          "class": "designerFeeRemain",
          "name": "디자인비 잔금",
          "description": "디자인 비용에 대한 잔금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 947330,
            "number": 1
          },
          "amount": {
            "pure": 947330,
            "commission": 369090
          }
        }
      ],
      "pay": [
        {
          "amount": 947330,
          "date": new Date("2024-03-25T06:26:58.486Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-03-25T06:26:58.486Z"),
          "method": "계좌 이체",
          "proof": "디자인호호(이지연)",
          "to": "디자인호호(이지연)"
        }
      ],
      "comments": [
        "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2309_aa07s",
        "name": "이지연",
        "phone": "010-2980-4030",
        "email": "jiyoun4030@gmail.com"
      }
    },
    {
      "id": "b23be_aa03s_s0",
      "date": new Date("2023-11-14T09:08:44.209Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 선금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "경기 화성시 새솔동 32-5 메종드엘리프 송산"
        },
        {
          "pyeong": 30
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2309_aa07s"
        }
      ],
      "items": [
        {
          "id": "b23be_aa03s_edff",
          "class": "designerFeeFirst",
          "name": "디자인비 선금",
          "description": "디자인 비용에 대한 선금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 947330,
            "number": 1
          },
          "amount": {
            "pure": 947330,
            "commission": 369090
          }
        }
      ],
      "pay": [
        {
          "amount": 947330,
          "date": new Date("2024-01-22T03:01:04.426Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-01-22T03:01:04.426Z"),
          "method": "계좌 이체",
          "proof": "디자인호호(이지연)",
          "to": "디자인호호(이지연)"
        }
      ],
      "comments": [
        "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2309_aa07s",
        "name": "이지연",
        "phone": "010-2980-4030",
        "email": "jiyoun4030@gmail.com"
      }
    }
  ],
  "links": {
    "cliid": "c2311_aa61s",
    "desid": "d2309_aa07s",
    "method": "offline",
    "proid": "p2311_aa55s",
    "oid": [
      "homeliaisonBill_1702897946021",
      "homeliaisonBill_1702897895903",
      "homeliaisonBill_1699952940194"
    ]
  }
}

const sampleData3 = {
  "bilid": "b23bl_aa02s",
  "class": "style",
  "name": "안은빈_010-3545-7300_스타일링",
  "date": new Date("2023-11-21T02:31:16.210Z"),
  "participant": {
    "managers": [
      {
        "id": "m1707_aa01s",
        "name": "강해진",
        "phone": "010-2456-0311",
        "email": "jinijini0311@gmail.com"
      }
    ],
    "customer": {
      "id": "c2311_ab00s",
      "name": "안은빈",
      "phone": "010-3545-7300",
      "email": "eoseous@gmail.com"
    },
    "designer": {
      "id": "d2307_aa02s",
      "name": "김보하",
      "phone": "010-5717-3847",
      "email": "bh3847@naver.com"
    }
  },
  "requests": [
    {
      "id": "b23bl_aa02s_r4",
      "date": new Date("2023-12-13T01:43:59.444Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "시공 잔금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1706520839690",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안은빈",
            "amt_input": "1310000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1706520839690"
        },
        {
          "data": {
            "goodName": "시공 잔금",
            "goodsName": "시공 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240129183359",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1706520839690",
            "TotPrice": "1310000",
            "buyerName": "안은빈",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240205",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "010-3545-7300"
          }
        },
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_ictr",
          "class": "constructTimeRemain",
          "name": "시공 잔금",
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 잔금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1190910,
            "number": 1
          },
          "amount": {
            "supply": 1190910,
            "vat": 119090,
            "consumer": 1310000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-01-29T09:35:22.738Z"),
          "amount": 1310000,
          "oid": "homeliaisonBill_1706520839690"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-01-29T09:35:22.738Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안은빈"
        }
      ],
      "comments": [
        "잔금은 공사가 마무리된 후, 내시는 금액입니다. 전체 시공 금액에 포함됩니다.",
        "잔금을 내시면 공사가 마무리되고, 홈스타일링 과정상 시공 다음 단계가 진행됩니다."
      ],
      "target": {
        "id": "c2311_ab00s",
        "name": "안은빈",
        "phone": "010-3545-7300",
        "email": "eoseous@gmail.com"
      }
    },
    {
      "id": "b23bl_aa02s_r3",
      "date": new Date("2023-12-13T01:43:59.338Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "시공 착수금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1706169546964",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안은빈",
            "amt_input": "12029000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1706169546964"
        },
        {
          "data": {
            "goodName": "시공 착수금",
            "goodsName": "시공 착수금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20240125165906",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1706169546964",
            "TotPrice": "12029000",
            "buyerName": "안은빈",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20240201",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "010-3545-7300"
          }
        },
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_icts",
          "class": "constructTimeStart",
          "name": "시공 착수금",
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 착수금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 10935455,
            "number": 1
          },
          "amount": {
            "supply": 10935455,
            "vat": 1093545,
            "consumer": 12029000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-01-25T08:02:26.707Z"),
          "amount": 12029000,
          "oid": "homeliaisonBill_1706169546964"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-01-25T08:02:26.707Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안은빈"
        }
      ],
      "comments": [
        "착수금은 공사를 시작하기 위한 금액입니다. 전체 시공 금액에 포함됩니다.",
        "착수금 입금하시면 본격적인 시공이 진행됩니다."
      ],
      "target": {
        "id": "c2311_ab00s",
        "name": "안은빈",
        "phone": "010-3545-7300",
        "email": "eoseous@gmail.com"
      }
    },
    {
      "id": "b23bl_aa02s_r2",
      "date": new Date("2023-12-13T01:43:59.230Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "시공 계약금",
      "status": "결제 완료",
      "info": [
        {
          "virtualAccount": {
            "no_tid": "realAccount",
            "no_oid": "homeliaisonBill_1702435981523",
            "cd_bank": "00",
            "nm_inputbank": "unknown",
            "nm_input": "안은빈",
            "amt_input": "1381000",
            "real_account": "true"
          }
        },
        {
          "oid": "homeliaisonBill_1702435981523"
        },
        {
          "data": {
            "goodName": "시공 계약금",
            "goodsName": "시공 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "realAccount",
            "payMethod": "ACCOUNT",
            "applDate": "20231213115301",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1702435981523",
            "TotPrice": "1381000",
            "buyerName": "안은빈",
            "CARD_Code": "",
            "vactBankName": "기업",
            "VACT_Num": "049-085567-04-022",
            "VACT_Name": "(주)홈리에종",
            "VACT_Date": "20231220",
            "payDevice": "",
            "P_FN_NM": "realAccount",
            "REAL_Account": "true",
            "cashPhone": "010-3545-7300"
          }
        },
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_ictf",
          "class": "constructTimeFirst",
          "name": "시공 계약금",
          "description": "견적에 따른 인테리어 공사를 진행하는 비용 중 계약금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1255455,
            "number": 1
          },
          "amount": {
            "supply": 1255455,
            "vat": 125545,
            "consumer": 1381000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-13T03:14:17.544Z"),
          "amount": 1381000,
          "oid": "homeliaisonBill_1702435981523"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-13T03:14:17.544Z"),
          "method": "계좌 이체",
          "proof": "현금 영수증",
          "to": "안은빈"
        }
      ],
      "comments": [
        "계약금은 전체 시공 금액에 포함됩니다.",
        "계약금을 입금하시면 해당 시공사에게 고객님 정보가 전달되며, 현장 미팅을 할 수 있습니다."
      ],
      "target": {
        "id": "c2311_ab00s",
        "name": "안은빈",
        "phone": "010-3545-7300",
        "email": "eoseous@gmail.com"
      }
    },
    {
      "id": "b23bl_aa02s_r1",
      "date": new Date("2023-11-21T02:31:16.320Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금",
      "status": "결제 완료",
      "info": [
        {
          "oid": "homeliaisonBill_1701938670059"
        },
        {
          "data": {
            "goodName": "홈리에종 잔금",
            "goodsName": "홈리에종 잔금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "INIMX_CARDMOIhomeli120231207174455535642",
            "payMethod": "CARD",
            "applDate": "20231207174455",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1701938670059",
            "TotPrice": "3255780",
            "buyerName": "안은빈",
            "CARD_BankCode": "367",
            "CARD_Num": "532296000139",
            "CARD_ApplPrice": "3255780",
            "CARD_Code": "367",
            "vactBankName": "현대카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "현대카드"
          }
        },
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 2959800,
            "number": 1
          },
          "amount": {
            "supply": 2959800,
            "vat": 295980,
            "consumer": 3255780.0000000005
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-07T08:44:55.704Z"),
          "amount": 3255780,
          "oid": "homeliaisonBill_1701938670059"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-07T08:44:55.704Z"),
          "method": "카드(현대)",
          "proof": "이니시스",
          "to": "안은빈"
        }
      ],
      "comments": [
        "잔금은 총 디자인비에서 계약금을 제외한 금액입니다.",
        "잔금을 입금해주시면 홈스타일링 서비스가 계속 진행됩니다.",
        "결제해주신 디자인비는 서비스 정책상, 홈스타일링이 끝날 때까지 홈리에종에서 보관합니다.",
        "홈스타일링이 모두 끝나게 되면 고객님께 확인을 받게 되며, 컨펌 후 디자이너에게 정산합니다."
      ],
      "target": {
        "id": "c2311_ab00s",
        "name": "안은빈",
        "phone": "010-3545-7300",
        "email": "eoseous@gmail.com"
      }
    },
    {
      "id": "b23bl_aa02s_r0",
      "date": new Date("2023-11-21T02:31:16.213Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 계약금",
      "status": "결제 완료",
      "info": [
        {
          "oid": "homeliaisonBill_1700540528212"
        },
        {
          "data": {
            "goodName": "홈리에종 계약금",
            "goodsName": "홈리에종 계약금",
            "resultCode": "0000",
            "resultMsg": "성공적으로 처리 하였습니다.",
            "tid": "StdpayCARDMOIhomeli120231121132249943785",
            "payMethod": "CARD",
            "applDate": "20231121132253",
            "mid": "MOIhomeli1",
            "MOID": "homeliaisonBill_1700540528212",
            "TotPrice": "330000",
            "buyerName": "안은빈",
            "CARD_BankCode": "381",
            "CARD_Num": "557042374828",
            "CARD_ApplPrice": "330000",
            "CARD_Code": "381",
            "vactBankName": "국민카드",
            "payDevice": "MOBILE",
            "P_FN_NM": "국민카드"
          }
        },
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        },
        {
          "method": "offline"
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_idte",
          "class": "designerTime",
          "name": "디자인비",
          "description": "디자이너가 인테리어 디자인 작업을 진행하는 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 300000,
            "number": 1
          },
          "amount": {
            "supply": 300000,
            "vat": 30000,
            "consumer": 330000
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-11-21T04:22:53.377Z"),
          "amount": 330000,
          "oid": "homeliaisonBill_1700540528212"
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-11-21T04:22:53.377Z"),
          "method": "카드(국민)",
          "proof": "이니시스",
          "to": "안은빈"
        }
      ],
      "comments": [
        "계약금은 전체 서비스 금액에 포함됩니다.",
        "계약금을 입금하시면 담당 디자이너에게 고객님 정보가 전달되며, 현장 미팅이 진행됩니다.",
        "현장 미팅 후 계약금을 제외한 잔금을 입금하시면 디자인 서비스가 계속 진행됩니다.",
        "현장 미팅 진행 후 디자인 서비스를 더 진행하지 않더라도, 계약금은 환불되지 않습니다."
      ],
      "target": {
        "id": "c2311_ab00s",
        "name": "안은빈",
        "phone": "010-3545-7300",
        "email": "eoseous@gmail.com"
      }
    }
  ],
  "responses": [
    {
      "id": "b23bl_aa02s_s4",
      "date": new Date("2024-02-02T03:25:26.632Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 시공 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_ecgs",
          "class": "generalExpenses",
          "name": "시공 비용",
          "description": "시공 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1570500,
            "number": 1
          },
          "amount": {
            "pure": 1570500,
            "commission": 0
          }
        }
      ],
      "pay": [
        {
          "amount": 1570500,
          "date": new Date("2024-02-02T03:25:39.782Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-02-02T03:25:39.782Z"),
          "method": "계좌 이체",
          "proof": "김보하",
          "to": "김보하"
        }
      ],
      "comments": [],
      "target": {
        "id": "",
        "name": "규빗",
        "phone": "",
        "email": ""
      }
    },
    {
      "id": "b23bl_aa02s_s3",
      "date": new Date("2024-01-26T05:55:12.132Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 시공 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_ecgs",
          "class": "generalExpenses",
          "name": "시공 비용",
          "description": "시공 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 11000000,
            "number": 1
          },
          "amount": {
            "pure": 11000000,
            "commission": 0
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2024-01-26T05:55:13.744Z"),
          "amount": 11000000,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-01-26T05:55:13.744Z"),
          "method": "계좌 이체",
          "proof": "김보하",
          "to": "김보하"
        }
      ],
      "comments": [],
      "target": {
        "id": "",
        "name": "규빗",
        "phone": "",
        "email": ""
      }
    },
    {
      "id": "b23bl_aa02s_s2",
      "date": new Date("2023-12-18T06:35:27.721Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 시공 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_ecgs",
          "class": "generalExpenses",
          "name": "시공 비용",
          "description": "시공 비용입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1100000,
            "number": 1
          },
          "amount": {
            "pure": 1100000,
            "commission": 0
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-18T06:35:29.531Z"),
          "amount": 1100000,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-18T06:35:29.531Z"),
          "method": "계좌 이체",
          "proof": "김보하",
          "to": "김보하"
        }
      ],
      "comments": [],
      "target": {
        "id": "",
        "name": "규빗",
        "phone": "",
        "email": ""
      }
    },
    {
      "id": "b23bl_aa02s_s1",
      "date": new Date("2023-11-21T02:31:16.535Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 잔금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2307_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_edfr",
          "class": "designerFeeRemain",
          "name": "디자인비 잔금",
          "description": "디자인 비용에 대한 잔금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1103275,
            "number": 1
          },
          "amount": {
            "pure": 1103275,
            "commission": 488970
          }
        }
      ],
      "pay": [
        {
          "amount": 1103275,
          "date": new Date("2024-02-19T09:11:31.045Z"),
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2024-02-19T09:11:31.045Z"),
          "method": "계좌 이체",
          "proof": "김보하",
          "to": "김보하"
        }
      ],
      "comments": [
        "홈리에종 잔금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2307_aa02s",
        "name": "김보하",
        "phone": "010-5717-3847",
        "email": "bh3847@naver.com"
      }
    },
    {
      "id": "b23bl_aa02s_s0",
      "date": new Date("2023-11-21T02:31:16.427Z"),
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      "name": "홈리에종 선금 정산",
      "status": "정산 대기",
      "info": [
        {
          "address": "서울 마포구 토정로31길 23 (용강동) 101동 1001호"
        },
        {
          "pyeong": 44
        },
        {
          "method": "offline"
        },
        {
          "desid": "d2307_aa02s"
        }
      ],
      "items": [
        {
          "id": "b23bl_aa02s_edff",
          "class": "designerFeeFirst",
          "name": "디자인비 선금",
          "description": "디자인 비용에 대한 선금입니다.",
          "info": [],
          "unit": {
            "ea": null,
            "price": 1103275,
            "number": 1
          },
          "amount": {
            "pure": 1103275,
            "commission": 488970
          }
        }
      ],
      "pay": [
        {
          "date": new Date("2023-12-11T07:19:57.340Z"),
          "amount": 1103275,
          "oid": ""
        }
      ],
      "cancel": [],
      "proofs": [
        {
          "date": new Date("2023-12-11T07:19:57.340Z"),
          "method": "계좌 이체",
          "proof": "김보하",
          "to": "김보하"
        }
      ],
      "comments": [
        "홈리에종 선금 정산은 디자이너님께 드리는 총 정산 비용의 50%입니다.",
        "프로젝트가 모두 완료되고 고객님의 컨펌이 있은 후, 잔금 정산이 될 예정입니다.",
        "총 정산 비용은 전체 디자인비에서 해당 디자이너님의 수수료 비율을 제한 금액입니다.",
        "해당 디자이너님의 사업자 유형에 따라 정산의 방식이 다를 수 있습니다."
      ],
      "target": {
        "id": "d2307_aa02s",
        "name": "김보하",
        "phone": "010-5717-3847",
        "email": "bh3847@naver.com"
      }
    }
  ],
  "links": {
    "cliid": "c2311_ab00s",
    "desid": "d2307_aa02s",
    "method": "offline",
    "proid": "p2311_aa95s",
    "oid": [
      "homeliaisonBill_1706520839690",
      "homeliaisonBill_1706169546964",
      "homeliaisonBill_1702435981523",
      "homeliaisonBill_1701938670059",
      "homeliaisonBill_1700540528212"
    ]
  }
}

const sampleData4 = {
  // bilid: 영수증 ID로, 각 영수증을 고유하게 식별하는 데 사용됩니다.
  "bilid": "b23bs_aa02s",
  // class: 영수증의 종류를 나타내는 문자열입니다. 예: 'style'은 스타일링 관련 영수증임을 나타냅니다.
  "class": "style",
  // name: 영수증의 이름으로, 고객명, 연락처, 영수증의 간단한 설명이 포함됩니다.
  "name": "신경희_010-9804-0512_스타일링",
  // date: 영수증이 생성된 날짜 및 시간 정보입니다.
  "date": new Date("2023-11-28T03:57:30.527Z"),
  // participant: 이 영수증과 관련된 참여자 정보를 담고 있습니다.
  "participant": {
    // managers: 이 프로젝트를 관리하는 매니저들의 목록입니다.
    "managers": [
      {
        // id: 매니저의 고유 ID입니다.
        "id": "m1701_aa01s",
        // name: 매니저의 이름입니다.
        "name": "박혜연",
        // phone: 매니저의 전화번호입니다.
        "phone": "010-6310-0284",
        // email: 매니저의 이메일 주소입니다.
        "email": "hyp1121@gmail.com"
      }
    ],
    // customer: 이 영수증과 관련된 고객 정보입니다.
    "customer": {
      // id: 고객의 고유 ID입니다.
      "id": "c2311_ab40s",
      // name: 고객의 이름입니다.
      "name": "신경희",
      // phone: 고객의 전화번호입니다.
      "phone": "010-9804-0512",
      // email: 고객의 이메일 주소입니다.
      "email": "skhenv@gmail.com"
    },
    // designer: 이 프로젝트에 참여한 디자이너의 정보입니다.
    "designer": {
      // id: 디자이너의 고유 ID입니다.
      "id": "d2310_aa02s",
      // name: 디자이너의 이름입니다.
      "name": "김은경",
      // phone: 디자이너의 전화번호입니다.
      "phone": "010-8633-7814",
      // email: 디자이너의 이메일 주소입니다.
      "email": "ekim@eku.kr"
    }
  },
  // requests: 고객이 요청한 작업들에 대한 정보입니다.
  "requests": [
    {
      // id: 이 요청의 고유 ID입니다.
      "id": "b23bs_aa02s_r3",
      // date: 요청이 생성된 날짜 및 시간 정보입니다.
      "date": new Date("2024-01-24T06:11:32.246Z"),
      // removal: 요청이 삭제된 날짜 및 시간 정보로, 삭제되지 않았을 경우 기본 값이 설정됩니다.
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      // name: 요청의 이름으로, 이 요청의 목적을 나타냅니다. 예: '디자이너 출장비'
      "name": "디자이너 출장비",
      // status: 요청의 현재 상태입니다. 예: '결제 완료'
      "status": "결제 완료",
      // info: 요청과 관련된 추가적인 세부 정보들입니다.
      "info": [
        {
          // oid: 거래의 고유 ID입니다.
          "oid": "homeliaisonBill_1706604316272"
        },
        {
          // data: 결제와 관련된 세부 정보를 담고 있는 객체입니다.
          "data": {
            // goodName: 거래의 이름 또는 물품 이름입니다.
            "goodName": "디자이너 출장비",
            // goodsName: 결제된 물품의 이름입니다.
            "goodsName": "디자이너 출장비",
            // resultCode: 결제 결과 코드입니다. '0000'은 성공을 의미합니다.
            "resultCode": "0000",
            // resultMsg: 결제 결과 메시지입니다.
            "resultMsg": "성공적으로 처리 하였습니다.",
            // tid: 거래 ID입니다.
            "tid": "INIMX_CARDMOIhomeli120240130174536655511",
            // payMethod: 결제 수단입니다. 예: 'CARD'는 카드 결제를 의미합니다.
            "payMethod": "CARD",
            // applDate: 결제가 승인된 날짜와 시간 정보입니다.
            "applDate": "20240130174536",
            // mid: 가맹점 ID입니다.
            "mid": "MOIhomeli1",
            // MOID: 거래의 고유 ID입니다.
            "MOID": "homeliaisonBill_1706604316272",
            // TotPrice: 총 결제 금액입니다.
            "TotPrice": "94600",
            // buyerName: 구매자의 이름입니다.
            "buyerName": "신경희",
            // CARD_BankCode: 카드 은행 코드입니다.
            "CARD_BankCode": "367",
            // CARD_Num: 카드 번호입니다.
            "CARD_Num": "529942002245",
            // CARD_ApplPrice: 카드 결제 승인 금액입니다.
            "CARD_ApplPrice": "94600",
            // CARD_Code: 카드 코드입니다.
            "CARD_Code": "367",
            // vactBankName: 가상 계좌 은행 이름입니다.
            "vactBankName": "현대카드",
            // payDevice: 결제 디바이스입니다. 예: 'MOBILE'은 모바일 결제를 의미합니다.
            "payDevice": "MOBILE",
            // P_FN_NM: 결제 은행 이름입니다.
            "P_FN_NM": "현대카드"
          }
        },
        {
          // address: 고객의 주소입니다.
          "address": "세종특별자치시 반곡로 14 (반곡동, 수루배마을1단지) 114동 1102호"
        },
        {
          // pyeong: 시공 면적(평수)입니다.
          "pyeong": 39
        },
        {
          // distance: 디자이너의 이동 거리입니다.
          "distance": "138km"
        },
        {
          // time: 디자이너의 이동 시간입니다.
          "time": "2시간 28분"
        },
        {
          // number: 출장 횟수입니다.
          "number": 2
        },
        {
          // limit: 출장 횟수 제한입니다.
          "limit": 5
        },
        {
          // method: 결제 방법입니다.
          "method": "offline"
        },
        {
          // desid: 디자이너 ID입니다.
          "desid": "d2310_aa02s"
        }
      ],
      // items: 요청에 포함된 항목들입니다.
      "items": [
        {
          // id: 항목의 고유 ID입니다.
          "id": "b23bs_aa02s_ites",
          // class: 항목의 종류를 나타내는 클래스입니다.
          "class": "travelExpenses",
          // name: 항목의 이름입니다.
          "name": "출장비",
          // description: 항목에 대한 설명입니다.
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          // info: 항목에 관련된 추가 정보입니다.
          "info": [],
          // unit: 항목의 단위 정보입니다.
          "unit": {
            // ea: 단위(예: 회)의 종류입니다.
            "ea": "회",
            // price: 단위당 가격입니다.
            "price": 86000,
            // number: 수량입니다.
            "number": 1
          },
          // amount: 항목의 가격 정보입니다.
          "amount": {
            // supply: 공급가액입니다.
            "supply": 86000,
            // vat: 부가세입니다.
            "vat": 8600,
            // consumer: 소비자 가격입니다.
            "consumer": 94600
          }
        }
      ],
      // pay: 결제 정보입니다.
      "pay": [
        {
          // date: 결제가 완료된 날짜 및 시간 정보입니다.
          "date": new Date("2024-01-30T08:45:36.985Z"),
          // amount: 결제 금액입니다.
          "amount": 94600,
          // oid: 거래의 고유 ID입니다.
          "oid": "homeliaisonBill_1706604316272"
        }
      ],
      // cancel: 취소된 결제 내역입니다. 현재는 빈 배열로 설정되어 있습니다.
      "cancel": [],
      // proofs: 결제 증빙 정보입니다.
      "proofs": [
        {
          // date: 증빙이 발생한 날짜 및 시간 정보입니다.
          "date": new Date("2024-01-30T08:45:36.985Z"),
          // method: 결제 방법입니다. 예: '카드(현대)'
          "method": "카드(현대)",
          // proof: 결제 증빙 방법입니다.
          "proof": "이니시스",
          // to: 증빙의 대상입니다. 예: '신경희'
          "to": "신경희"
        }
      ],
      // comments: 요청에 대한 추가적인 설명이나 코멘트입니다.
      "comments": [
        "출장비는 디자이너가 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 청구됩니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      // target: 요청의 대상인 고객 정보입니다.
      "target": {
        // id: 고객의 고유 ID입니다.
        "id": "c2311_ab40s",
        // name: 고객의 이름입니다.
        "name": "신경희",
        // phone: 고객의 전화번호입니다.
        "phone": "010-9804-0512",
        // email: 고객의 이메일 주소입니다.
        "email": "skhenv@gmail.com"
      }
    },
    // 다른 requests에 대한 객체들이 이와 유사한 형태로 작성됩니다.
  ],
  // responses: 홈리에종에서 발생한 결제에 대한 정산 내역입니다.
  "responses": [
    {
      // id: 이 응답의 고유 ID입니다.
      "id": "b23bs_aa02s_s3",
      // date: 응답이 생성된 날짜 및 시간 정보입니다.
      "date": new Date("2024-01-24T06:11:32.353Z"),
      // removal: 응답이 삭제된 날짜 및 시간 정보로, 삭제되지 않았을 경우 기본 값이 설정됩니다.
      "removal": new Date("1799-12-31T15:32:08.000Z"),
      // name: 응답의 이름으로, 정산 목적을 나타냅니다.
      "name": "출장비 정산",
      // status: 응답의 현재 상태입니다. 예: '정산 대기'
      "status": "정산 대기",
      // info: 응답과 관련된 추가적인 세부 정보들입니다.
      "info": [
        {
          // address: 고객의 주소입니다.
          "address": "세종특별자치시 반곡로 14 (반곡동, 수루배마을1단지) 114동 1102호"
        },
        {
          // pyeong: 시공 면적(평수)입니다.
          "pyeong": 39
        },
        {
          // distance: 디자이너의 이동 거리입니다.
          "distance": "138km"
        },
        {
          // time: 디자이너의 이동 시간입니다.
          "time": "2시간 28분"
        },
        {
          // number: 출장 횟수입니다.
          "number": 2
        },
        {
          // limit: 출장 횟수 제한입니다.
          "limit": 5
        },
        {
          // method: 결제 방법입니다.
          "method": "offline"
        },
        {
          // desid: 디자이너 ID입니다.
          "desid": "d2310_aa02s"
        }
      ],
      // items: 응답에 포함된 항목들입니다.
      "items": [
        {
          // id: 항목의 고유 ID입니다.
          "id": "b23bs_aa02s_edte",
          // class: 항목의 종류를 나타내는 클래스입니다.
          "class": "travelExpenses",
          // name: 항목의 이름입니다.
          "name": "디자이너 출장비",
          // description: 항목에 대한 설명입니다.
          "description": "디자이너가 출장시 발생되는 왕복 비용입니다.",
          // info: 항목에 관련된 추가 정보입니다.
          "info": [],
          // unit: 항목의 단위 정보입니다.
          "unit": {
            // ea: 단위(예: 회)의 종류입니다.
            "ea": "회",
            // price: 단위당 가격입니다.
            "price": 79980,
            // number: 수량입니다.
            "number": 1
          },
          // amount: 항목의 가격 정보입니다.
          "amount": {
            // pure: 순수 공급가액입니다.
            "pure": 79980,
            // commission: 수수료입니다.
            "commission": 6020.000000000001
          }
        }
      ],
      // pay: 정산 정보입니다.
      "pay": [
        {
          // amount: 정산 금액입니다.
          "amount": 79980,
          // date: 정산이 완료된 날짜 및 시간 정보입니다.
          "date": new Date("2024-02-05T07:49:08.536Z"),
          // oid: 거래의 고유 ID입니다.
          "oid": ""
        }
      ],
      // cancel: 취소된 정산 내역입니다. 현재는 빈 배열로 설정되어 있습니다.
      "cancel": [],
      // proofs: 정산 증빙 정보입니다.
      "proofs": [
        {
          // date: 증빙이 발생한 날짜 및 시간 정보입니다.
          "date": new Date("2024-02-05T07:49:08.536Z"),
          // method: 정산 방법입니다. 예: '계좌 이체'
          "method": "계좌 이체",
          // proof: 정산 증빙 방법입니다.
          "proof": "김은경(weeare)",
          // to: 증빙의 대상입니다. 예: '김은경(weeare)'
          "to": "김은경(weeare)"
        }
      ],
      // comments: 정산에 대한 추가적인 설명이나 코멘트입니다.
      "comments": [
        "출장비는 디자이너님이 고객님의 집까지 이동하는 데에 발생하는 비용입니다.",
        "출장비는 도달 거리와 시간을 측정하여 계산되며, 왕복 비용으로 고객님께 받습니다.",
        "출장비는 대중 교통이 아닌 차량의 이동 거리 및 시간으로 측정됩니다.",
        "출장비에는 디자이너님의 미팅 시간이 감안된 디자인 인건비가 함께 포함되어 있습니다."
      ],
      // target: 정산의 대상인 디자이너 정보입니다.
      "target": {
        // id: 디자이너의 고유 ID입니다.
        "id": "d2310_aa02s",
        // name: 디자이너의 이름입니다.
        "name": "김은경",
        // phone: 디자이너의 전화번호입니다.
        "phone": "010-8633-7814",
        // email: 디자이너의 이메일 주소입니다.
        "email": "ekim@eku.kr"
      }
    },
    // 다른 responses에 대한 객체들이 이와 유사한 형태로 작성됩니다.
  ],
  // links: 이 영수증과 연결된 관련 정보를 담고 있는 객체입니다.
  "links": {
    // cliid: 고객의 고유 ID입니다.
    "cliid": "c2311_ab40s",
    // desid: 디자이너의 고유 ID입니다.
    "desid": "d2310_aa02s",
    // method: 결제 방법입니다.
    "method": "offline",
    // proid: 프로젝트의 고유 ID입니다.
    "proid": "p2311_ab29s",
    // oid: 영수증과 연결된 거래의 고유 ID 목록입니다.
    "oid": [
      "homeliaisonBill_1706604316272",
      "homeliaisonBill_1701839017532",
      "homeliaisonBill_1701838940072",
      "homeliaisonBill_1701143861961"
    ]
  }
}

// 모듈 정의 시작
module.exports = {
  // collection: 'generalBill'이라는 컬렉션 이름을 정의합니다.
  collection: "generalBill",
  // main: 영수증 데이터를 생성하는 기본 구조를 반환하는 함수입니다.
  main: function () {
    // 기본적으로 필요한 데이터 구조를 반환합니다.
    return {
      bilid: "", // 영수증 ID
      class: "", // 영수증 종류
      name: "", // 영수증 이름
      date: new Date(), // 영수증 생성 날짜
      participant: { // 참여자 정보
        managers: [], // 매니저 목록
        customer: { // 고객 정보
          id: "", // 고객 ID
          name: "", // 고객 이름
          phone: "", // 고객 전화번호
          email: "", // 고객 이메일
        },
        designer: { // 디자이너 정보
          id: "", // 디자이너 ID
          name: "", // 디자이너 이름
          phone: "", // 디자이너 전화번호
          email: "" // 디자이너 이메일
        }
      },
      requests: [], // 요청 정보 배열
      responses: [], // 응답 정보 배열
      links: {}, // 관련된 링크 정보
    };
  },
  // sub: 특정 주제에 맞는 더미 데이터를 생성하는 함수입니다.
  sub: function (subject) {
    let dummy = null;
    // 주제에 따라 다른 구조의 더미 데이터를 생성합니다.
    if (subject === "managers") {
      dummy = {
        id: "", // 매니저 ID
        name: "", // 매니저 이름
        phone: "", // 매니저 전화번호
        email: "", // 매니저 이메일
      };
    } else if (subject === "requests" || subject === "responses") {
      dummy = {
        id: "", // 요청 또는 응답 ID
        date: new Date(), // 생성 날짜
        removal: new Date(1800, 0, 1), // 삭제 날짜
        name: "", // 이름
        status: (subject === "requests" ? "결제 요청" : "정산 대기"), // 상태
        info: [], // 추가 정보
        items: [], // 항목 정보
        pay: [], // 결제 정보
        cancel: [], // 취소 정보
        proofs: [], // 증빙 정보
        comments: [], // 코멘트
        target: { // 대상 정보
          id: "", // 대상 ID
          name: "", // 대상 이름
          phone: "", // 대상 전화번호
          email: "" // 대상 이메일
        }
      };
    } else if (subject === "items") {
      dummy = {
        id: "", // 항목 ID
        class: "", // 항목 클래스
        name: "", // 항목 이름
        description: "", // 항목 설명
        info: [], // 추가 정보
        unit: { // 단위 정보
          ea: "", // 단위 종류
          price: 0, // 단가
          number: 0, // 수량
        },
        amount: { // 금액 정보
          supply: 0, // 공급가액
          vat: 0, // 부가세
          consumer: 0, // 소비자 가격
        }
      };
    } else if (subject === "responseItems") {
      dummy = {
        id: "", // 응답 항목 ID
        class: "", // 응답 항목 클래스
        name: "", // 응답 항목 이름
        description: "", // 응답 항목 설명
        info: [], // 추가 정보
        unit: { // 단위 정보
          ea: "", // 단위 종류
          price: 0, // 단가
          number: 0, // 수량
        },
        amount: { // 금액 정보
          pure: 0, // 순수 공급가액
          commission: 0, // 수수료
        }
      };
    } else if (subject === "proofs") {
      dummy = {
        date: new Date(), // 증빙 날짜
        method: "", // 증빙 방법
        proof: "", // 증빙 자료
        to: "", // 증빙 대상
      };
    } else if (subject === "pay") {
      dummy = {
        date: new Date(), // 결제 날짜
        amount: 0, // 결제 금액
        oid: "", // 거래 ID
      };
    }
    return dummy;
  },
  // alive: Mother 객체로부터 클래스들을 정의하는 함수입니다.
  alive: function (mother) {
    // Pay 클래스: 결제 정보를 관리하는 클래스입니다.
    class Pay {
      constructor(json) {
        this.date = json.date; // 결제 날짜
        this.amount = json.amount; // 결제 금액
        this.oid = json.oid; // 거래 ID
      }
      toNormal() {
        let obj = {};
        obj.date = this.date; // 결제 날짜
        obj.amount = this.amount; // 결제 금액
        obj.oid = this.oid; // 거래 ID
        return obj;
      }
    }

    // PayArray 클래스: Pay 객체들을 관리하는 배열입니다.
    class PayArray extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Pay(obj)); // 각 Pay 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // Pay 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // SeachArray 클래스: 객체들의 배열을 관리하며 각 객체의 키-값 쌍을 정의합니다.
    class SeachArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          if (typeof i === "object") {
            for (let key in i) {
              Object.defineProperty(this, key, {
                value: i[key], // 객체의 키-값을 정의
                configurable: true,
                enumerable: false,
                writable: true
              });
            }
          }
          this.push(i); // 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i); // 배열을 그대로 반환
        }
        return arr;
      }
    }

    // Links 클래스: 링크 정보를 관리하는 클래스입니다.
    class Links {
      constructor(obj) {
        for (let key in obj) {
          this[key] = obj[key]; // 각 링크의 키-값을 설정
        }
      }
      toNormal() {
        let obj = {};
        for (let key in this) {
          obj[key] = this[key]; // 링크 정보를 일반 객체로 변환
        }
        return obj;
      }
    }

    // Proof 클래스: 결제 증빙 정보를 관리하는 클래스입니다.
    class Proof {
      constructor(json) {
        this.date = json.date; // 증빙 날짜
        this.method = json.method; // 증빙 방법
        this.proof = json.proof; // 증빙 자료
        this.to = json.to; // 증빙 대상
      }
      toNormal() {
        let obj = {};
        obj.date = this.date; // 증빙 날짜
        obj.method = this.method; // 증빙 방법
        obj.proof = this.proof; // 증빙 자료
        obj.to = this.to; // 증빙 대상
        return obj;
      }
    }

    // Proofs 클래스: Proof 객체들을 관리하는 배열입니다.
    class Proofs extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Proof(obj)); // 각 Proof 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // Proof 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // Who 클래스: 참여자의 정보를 관리하는 클래스입니다.
    class Who {
      constructor(json) {
        this.id = json.id; // 참여자의 ID
        this.name = json.name; // 참여자의 이름
        this.phone = json.phone; // 참여자의 전화번호
        this.email = json.email; // 참여자의 이메일
      }
      toNormal() {
        let obj;
        obj = {};
        obj.id = this.id; // 참여자의 ID
        obj.name = this.name; // 참여자의 이름
        obj.phone = this.phone; // 참여자의 전화번호
        obj.email = this.email; // 참여자의 이메일
        return obj;
      }
    }

    // Amount 클래스: 금액 정보를 관리하는 클래스입니다.
    class Amount {
      constructor(json) {
        this.supply = json.supply; // 공급가액
        this.vat = json.vat; // 부가세
        this.consumer = json.consumer; // 소비자 가격
      }
      toNormal() {
        let obj = {};
        obj.supply = this.supply; // 공급가액
        obj.vat = this.vat; // 부가세
        obj.consumer = this.consumer; // 소비자 가격
        return obj;
      }
    }

    // Unit 클래스: 단위 정보를 관리하는 클래스입니다.
    class Unit {
      constructor(json) {
        this.ea = json.ea; // 단위 종류
        this.price = json.price; // 단가
        this.number = json.number; // 수량
      }
      toNormal() {
        let obj = {};
        obj.ea = this.ea; // 단위 종류
        obj.price = this.price; // 단가
        obj.number = this.number; // 수량
        return obj;
      }
    }

    // Item 클래스: 요청 항목의 정보를 관리하는 클래스입니다.
    class Item {
      constructor(json) {
        this.id = json.id; // 항목 ID
        this.class = json.class; // 항목 클래스
        this.name = json.name; // 항목 이름
        this.description = json.description; // 항목 설명
        this.info = new SeachArray(json.info); // 항목 관련 추가 정보
        this.unit = new Unit(json.unit); // 단위 정보
        this.amount = new Amount(json.amount); // 금액 정보
      }
      toNormal() {
        let obj = {};
        obj.id = this.id; // 항목 ID
        obj.class = this.class; // 항목 클래스
        obj.name = this.name; // 항목 이름
        obj.description = this.description; // 항목 설명
        obj.info = this.info.toNormal(); // 추가 정보
        obj.unit = this.unit.toNormal(); // 단위 정보
        obj.amount = this.amount.toNormal(); // 금액 정보
        return obj;
      }
    }

    // Items 클래스: Item 객체들을 관리하는 배열입니다.
    class Items extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Item(obj)); // 각 Item 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // Item 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // ResponseAmount 클래스: 응답 항목의 금액 정보를 관리하는 클래스입니다.
    class ResponseAmount {
      constructor(json) {
        this.pure = json.pure; // 순수 공급가액
        this.commission = json.commission; // 수수료
      }
      toNormal() {
        let obj = {};
        obj.pure = this.pure; // 순수 공급가액
        obj.commission = this.commission; // 수수료
        return obj;
      }
    }

    // ResponseItem 클래스: 응답 항목의 정보를 관리하는 클래스입니다.
    class ResponseItem {
      constructor(json) {
        this.id = json.id; // 응답 항목 ID
        this.class = json.class; // 응답 항목 클래스
        this.name = json.name; // 응답 항목 이름
        this.description = json.description; // 응답 항목 설명
        this.info = new SeachArray(json.info); // 응답 항목 관련 추가 정보
        this.unit = new Unit(json.unit); // 단위 정보
        this.amount = new ResponseAmount(json.amount); // 금액 정보
      }
      toNormal() {
        let obj = {};
        obj.id = this.id; // 응답 항목 ID
        obj.class = this.class; // 응답 항목 클래스
        obj.name = this.name; // 응답 항목 이름
        obj.description = this.description; // 응답 항목 설명
        obj.info = this.info.toNormal(); // 추가 정보
        obj.unit = this.unit.toNormal(); // 단위 정보
        obj.amount = this.amount.toNormal(); // 금액 정보
        return obj;
      }
    }

    // ResponseItems 클래스: ResponseItem 객체들을 관리하는 배열입니다.
    class ResponseItems extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new ResponseItem(obj)); // 각 ResponseItem 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // ResponseItem 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // Response 클래스: 응답 항목 전체를 관리하는 클래스입니다.
    class Response {
      constructor(json) {
        this.id = json.id; // 응답 항목 ID
        this.date = json.date; // 응답 생성 날짜
        this.removal = json.removal; // 삭제 날짜
        this.name = json.name; // 응답 이름
        this.status = json.status; // 응답 상태
        this.info = new SeachArray(json.info); // 응답 관련 추가 정보
        this.items = new ResponseItems(json.items); // 응답 항목들
        this.pay = new PayArray(json.pay); // 정산 정보
        this.cancel = new PayArray(json.cancel); // 취소 정보
        this.proofs = new Proofs(json.proofs); // 증빙 정보
        this.comments = new SeachArray(json.comments); // 코멘트
        this.target = new Who(json.target); // 대상 정보
      }
      toNormal() {
        let obj = {};
        obj.id = this.id; // 응답 항목 ID
        obj.date = this.date; // 응답 생성 날짜
        obj.removal = this.removal; // 삭제 날짜
        obj.name = this.name; // 응답 이름
        obj.status = this.status; // 응답 상태
        obj.info = this.info.toNormal(); // 응답 관련 추가 정보
        obj.items = this.items.toNormal(); // 응답 항목들
        obj.pay = this.pay.toNormal(); // 정산 정보
        obj.cancel = this.cancel.toNormal(); // 취소 정보
        obj.proofs = this.proofs.toNormal(); // 증빙 정보
        obj.comments = this.comments.toNormal(); // 코멘트
        obj.target = this.target.toNormal(); // 대상 정보
        return obj;
      }
    }

    // Responses 클래스: Response 객체들을 관리하는 배열입니다.
    class Responses extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Response(obj)); // 각 Response 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // Response 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // Request 클래스: 요청 항목 전체를 관리하는 클래스입니다.
    class Request {
      constructor(json) {
        this.id = json.id; // 요청 항목 ID
        this.date = json.date; // 요청 생성 날짜
        this.removal = json.removal; // 삭제 날짜
        this.name = json.name; // 요청 이름
        this.status = json.status; // 요청 상태
        this.info = new SeachArray(json.info); // 요청 관련 추가 정보
        this.items = new Items(json.items); // 요청 항목들
        this.pay = new PayArray(json.pay); // 결제 정보
        this.cancel = new PayArray(json.cancel); // 취소 정보
        this.proofs = new Proofs(json.proofs); // 증빙 정보
        this.comments = new SeachArray(json.comments); // 코멘트
        this.target = new Who(json.target); // 대상 정보
      }
      toNormal() {
        let obj = {};
        obj.id = this.id; // 요청 항목 ID
        obj.date = this.date; // 요청 생성 날짜
        obj.removal = this.removal; // 삭제 날짜
        obj.name = this.name; // 요청 이름
        obj.status = this.status; // 요청 상태
        obj.info = this.info.toNormal(); // 요청 관련 추가 정보
        obj.items = this.items.toNormal(); // 요청 항목들
        obj.pay = this.pay.toNormal(); // 결제 정보
        obj.cancel = this.cancel.toNormal(); // 취소 정보
        obj.proofs = this.proofs.toNormal(); // 증빙 정보
        obj.comments = this.comments.toNormal(); // 코멘트
        obj.target = this.target.toNormal(); // 대상 정보
        return obj;
      }
    }

    // Requests 클래스: Request 객체들을 관리하는 배열입니다.
    class Requests extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Request(obj)); // 각 Request 객체를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // Request 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // Managers 클래스: 매니저들의 정보를 관리하는 배열입니다.
    class Managers extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Who(obj)); // 각 매니저의 정보를 배열에 추가
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal()); // 매니저 객체들을 일반 객체로 변환하여 배열에 추가
        }
        return arr;
      }
    }

    // Participant 클래스: 참여자들의 정보를 관리하는 클래스입니다.
    class Participant {
      constructor(json) {
        this.managers = new Managers(json.managers); // 매니저 정보
        this.customer = new Who(json.customer); // 고객 정보
        this.designer = new Who(json.designer); // 디자이너 정보
      }
      toNormal() {
        let obj;
        obj = {};
        obj.managers = this.managers.toNormal(); // 매니저 정보
        obj.customer = this.customer.toNormal(); // 고객 정보
        obj.designer = this.designer.toNormal(); // 디자이너 정보
        return obj;
      }
    }

    // Bill 클래스: 하나의 영수증을 관리하는 클래스입니다.
    class Bill {
      constructor(json) {
        this.bilid = json.bilid; // 영수증 ID
        this.class = json.class; // 영수증 종류
        this.name = json.name; // 영수증 이름
        this.date = json.date; // 영수증 생성 날짜
        this.participant = new Participant(json.participant); // 참여자 정보
        this.requests = new Requests(json.requests); // 요청 정보
        this.responses = new Responses(json.responses); // 응답 정보
        this.links = new Links(json.links); // 링크 정보
      }
      toNormal() {
        let obj;
        obj = {};
        obj.bilid = this.bilid; // 영수증 ID
        obj.class = this.class; // 영수증 종류
        obj.name = this.name; // 영수증 이름
        obj.date = this.date; // 영수증 생성 날짜
        obj.participant = this.participant.toNormal(); // 참여자 정보
        obj.requests = this.requests.toNormal(); // 요청 정보
        obj.responses = this.responses.toNormal(); // 응답 정보
        obj.links = this.links.toNormal(); // 링크 정보
        return obj;
      }
    }

    return { Bill };
  },
  // wrap: 여러 개의 Bill 객체들을 관리하는 함수입니다.
  wrap: function (alive, jsonArr, mother) {
    const { Bill } = alive(mother);
    // Bills 클래스: Bill 객체들을 관리하는 배열입니다.
    class Bills extends Array {
      // 특정 ID를 가진 Bill 객체를 검색합니다.
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.bilid === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new Bills();
    for (let json of jsonArr) {
      arr.push(new Bill(json)); // 각 Bill 객체를 배열에 추가
    }
    return arr;
  }
}
