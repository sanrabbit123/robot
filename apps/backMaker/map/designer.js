module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        designer: "",
        desid: "",
        information: {
          contract: {
            status: "협약 완료",
            date: new Date(1800, 0, 1),
          },
          phone: "",
          email: "",
          birth: new Date(1800, 0, 1),
          marry: false,
          child: [],
          cat: false,
          dog: false,
          did: "",
          address: [],
          personalSystem: {
            showRoom: false,
            webPage: [],
            sns: [],
          },
          business: {
            career: {
              relatedY: 0,
              relatedM: 0,
              startY: 0,
              startM: 0,
              detail: [],
              school: [],
            },
            account: [],
            businessInfo: {
              classification: "",
              businessNumber: "",
              files: {
                businessRegistration: false,
                bankBook: false,
                registrationCard: false
              },
            },
            service: {
              cost: {
                matrix: {
                  service: [
                    {
                      serid: "s2011_aa01s",
                      case: 9
                    },
                    {
                      serid: "s2011_aa02s",
                      case: 11
                    },
                    {
                      serid: "s2011_aa03s",
                      case: 9
                    }
                  ],
                  online: true
                },
                percentage: 30,
                percentageHistory: []
              },
              construct: {
                partner: "",
                method: "",
              },
            },
          }
        },
        analytics: {
          region: {
            transportation: "자동차",
            range: 40,
            expenses: 50,
            construct: 50
          },
          project: {
            time: {
              first: 7,
              entire: 30,
            },
            paperWork: [],
            online: true,
            living: true,
            matrix: [],
            operationBudget: {
              min: 5000000,
              max: 10000000
            }
          },
          construct: {
            level: 1,
            possible: {
              supervision: true,
            },
            case: [
              {
                name: "homeStyling",
                contract: [ "협업사 계약" ],
                possible: [],
              },
              {
                name: "totalStyling",
                contract: [ "협업사 계약" ],
                possible: [],
              },
              {
                name: "architecture",
                contract: [ "협업사 계약" ],
                possible: [],
              }
            ],
            partner: false,
            range: 2,
            major: "",
          },
          styling: {
            level: 1,
            method: "순차 제안",
            tendency: {
              style: {
                modern: 0,
                classic: 0,
                natural: 0,
                mixmatch: 0,
                scandinavian: 0,
                vintage: 0,
                oriental: 0,
                exotic: 0,
              },
              texture: {
                darkWood: 0,
                whiteWood: 0,
                coating: 0,
                metal: 0
              },
              color: {
                darkWood: 0,
                whiteWood: 0,
                highContrast: 0,
                vivid: 0,
                white: 0,
                mono: 0,
                bright: 0,
                dark: 0,
              },
              density: {
                maximun: 0,
                minimum: 0,
              }
            },
            furniture: {
              builtin: false,
              builtinDetail: [],
              design: false,
              designDetail: [],
            },
            fabric: {
              curtain: [ "업체 연결" ],
              bedding: [ "업체 연결" ]
            }
          },
          purchase: {
            agencies: false,
            setting: {
              install: false,
              storage: false,
            },
          },
          etc: {
            personality: [
              { name: "현장(최초) 미팅 전 심도 있게 준비하는 편", value: false },
              { name: "고객 미팅 회수에 연연하지 않는 편", value: false },
              { name: "디자인 제안 속도가 상대적으로 빠른 편", value: false },
              { name: "디자인 기획을 리드하는 편", value: false },
              { name: "디자인 기획시 고객에게 맞추는 편", value: false },
            ],
            relation: "확인중"
          },
          grade: 0,
        },
        realTime: {
          availableDate: [],
        },
        setting: {
          front: {
            introduction: {
              desktop: [],
              mobile: [],
            },
            methods: [],
            photo: {
              porlid: "",
              index: "",
            },
            order: 0,
          },
          proposal: [],
          ghost: [],
          description: [],
        },
      },
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "setting.proposal") {
      dummy = {
          name : "기본 세팅",
          photo : [
            {
              position: "0",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 66.5%;height: 66%;top: 0%;left: 0%;"
            },
            {
              position: "1",
              sgTrue: "s",
              unionPo: "right",
              styleText: "width: 32.8%;height: 66%;top: 0%;left: 67.2%;"
            },
            {
              position: "2",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 32.8%;height: 33%;top: 67%;left: 0%;"
            },
            {
              position: "3",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 33%;height: 33%;top: 67%;left: 33.5%;"
            },
            {
              position: "4",
              sgTrue: "g",
              unionPo: "union",
              styleText: "width: 32.8%;height: 33%;top: 67%;left: 67.2%;"
            }
          ],
          description : [
            "NULL",
            "NULL",
            "NULL"
          ]
      };
    } else if (subject === "information.business.career.detail") {
      dummy = {
        company: "",
        team: "",
        role: "",
        date: {
          start: new Date(1800, 0, 1),
          end: new Date(1800, 1, 1),
        }
      };
    } else if (subject === "information.business.career.school") {
      dummy = {
        school: "",
        major: "",
        date: {
          start: new Date(1800, 0, 1),
          end: new Date(1800, 1, 1),
        }
      };
    }
    return dummy;
  }
}
