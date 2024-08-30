const BuilderSampleData = {
  "buiid": "u2111_aa02s",
  "builder": "조호익",
  "information": {
    "contract": {
      "status": "협약 완료",
      "date": new Date(1800, 0, 1),
    },
    "phone": "010-5350-0527",
    "email": "chhi1106@naver.com",
    "address": [
      "경기도 의정부시 장암동 101-7"
    ],
    "business": {
      "company": "태호금속",
      "career": {
        "relatedY": 0,
        "relatedM": 0,
        "startY": 0,
        "startM": 0
      },
      "account": [
        {
          "bankName": "우리",
          "accountNumber": "1002731851156",
          "to": "태호금속"
        }
      ],
      "businessInfo": {
        "classification": "개인사업자(일반)",
        "businessNumber": ""
      },
      "service": {
        "cost": {
          "percentage": 5,
          "percentageHistory": []
        },
        "designer": {
          "partner": ""
        }
      }
    }
  },
  "analytics": {
    "region": {
      "transportation": "자동차",
      "range": 40,
      "expenses": 50
    },
    "construct": {
      "level": 1,
      "cost": 2,
      "available": []
    }
  }
};

const BuilderMap = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        buiid: "",
        builder: "",
        information: {
          contract: {
            status: "협약 완료",
            date: new Date(1800, 0, 1),
          },
          phone: "",
          email: "",
          address: [],
          business: {
            company: "",
            career: {
              relatedY: 0,
              relatedM: 0,
              startY: 0,
              startM: 0,
            },
            account: [],
            businessInfo: {
              classification: "개인사업자(일반)",
              businessNumber: "",
            },
            service: {
              cost: {
                percentage: 5,
                percentageHistory: []
              },
              designer: {
                partner: "",
              },
            }
          }
        },
        analytics: {
          region: {
            transportation: "자동차",
            range: 40,
            expenses: 50,
          },
          construct: {
            level: 1,
            cost: 1,
            available: [],
          }
        }
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "") {
      dummy = {};
    }
    return dummy;
  }
}

class Address {
  constructor (rawString) {
    this.raw = rawString;
    this.value = rawString;
  }

  toNormal () {
    return this.value;
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

class Menu extends String {

  constructor (value, items, multiple = false) {
    if (Array.isArray(value)) {
      super('');
    } else {
      super(value);
    }
    this.value = null;
    this.values = null;
    this.items = items;
    let temp;
    if (!multiple) {
      if (items.includes(value)) {
        this.value = value;
      } else {
        this.value = "알 수 없음";
      }
    } else {
      temp = [];
      for (let i of value) {
        if (items.includes(i)) {
          temp.push(i);
        }
      }
      this.values = temp;
    }
  }

  toNormal () {
    if (this.values === null) {
      return this.value;
    } else {
      return this.values;
    }
  }
  
}

class Builder {
  constructor(json) {
    this.builder = json.builder;
    this.buiid = json.buiid;
    this.information = new this.#BuilderInformation(json.information);
    this.analytics = new this.#HomeLiaisonAnalytics(json.analytics);
  }

  toNormal() {
    return {
      builder: this.builder,
      buiid: this.buiid,
      information: this.information.toNormal(),
      analytics: this.analytics.toNormal(),
    };
  }

  #BuilderInformation = class {
    constructor(json) {
      this.contract = new this.#Contract(json.contract);
      this.phone = json.phone;
      this.email = json.email;
      this.address = new this.#Addresses(json.address);
      this.business = new this.#Business(json.business);
    }

    toNormal() {
      return {
        contract: this.contract.toNormal(),
        phone: this.phone,
        email: this.email,
        address: this.address.toNormal(),
        business: this.business.toNormal(),
      };
    }

    #Contract = class {
      constructor(json) {
        this.status = new Menu(json.status, ["협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중"], false);
        this.date = new DateParse(json.date);
      }

      toNormal() {
        return {
          status: this.status.toNormal(),
          date: this.date.toNormal(),
        };
      }
    };

    #Addresses = class extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(new Address(i));
        }
      }

      toNormal() {
        const arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    };

    #Business = class {
      constructor(json) {
        this.company = json.company;
        this.career = new this.#Career(json.career);
        this.account = new this.#Accounts(json.account);
        this.businessInfo = new this.#BusinessInfo(json.businessInfo);
        this.service = new this.#Service(json.service);
      }

      toNormal() {
        return {
          company: this.company,
          career: this.career.toNormal(),
          account: this.account.toNormal(),
          businessInfo: this.businessInfo.toNormal(),
          service: this.service.toNormal(),
        };
      }

      #Career = class {
        constructor(json) {
          this.relatedY = Number(json.relatedY);
          this.relatedM = Number(json.relatedM);
          this.startY = Number(json.startY);
          this.startM = Number(json.startM);
        }
  
        toNormal() {
          return {
            relatedY: this.relatedY,
            relatedM: this.relatedM,
            startY: this.startY,
            startM: this.startM,
          };
        }
      };
  
      #Accounts = class extends Array {
        constructor(arr) {
          super();
          for (let i of arr) {
            this.push(new this.#Account(i));
          }
        }
  
        toNormal() {
          const arr = [];
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }
  
        #Account = class {
          constructor(json) {
            this.bankName = json.bankName;
            this.accountNumber = json.accountNumber;
            this.to = json.to;
          }
    
          toNormal() {
            return {
              bankName: this.bankName,
              accountNumber: this.accountNumber,
              to: this.to,
            };
          }
        };
      };
  
      #BusinessInfo = class {
        constructor(json) {
          this.classification = new Menu(json.classification, ["법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서"], false);
          this.businessNumber = json.businessNumber;
        }
  
        toNormal() {
          return {
            classification: this.classification.toNormal(),
            businessNumber: this.businessNumber,
          };
        }
      };
  
      #Service = class {
        constructor(json) {
          this.cost = new this.#Cost(json.cost);
          this.designer = new this.#Designer(json.designer);
        }
  
        toNormal() {
          return {
            cost: this.cost.toNormal(),
            designer: this.designer.toNormal(),
          };
        }
  
        #Cost = class {
          constructor(json) {
            this.percentage = json.percentage;
            this.percentageHistory = new this.#PercentageHistory(json.percentageHistory);
          }
    
          toNormal() {
            return {
              percentage: this.percentage,
              percentageHistory: this.percentageHistory.toNormal(),
            };
          }
    
          #PercentageHistory = class extends Array {
            constructor(arr) {
              super();
              for (let i of arr) {
                this.push(new this.#PastPercentage(i));
              }
            }
      
            toNormal() {
              const arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }
      
            #PastPercentage = class {
              constructor(json) {
                this.date = {
                  start: new DateParse(json.date.start),
                  end: new DateParse(json.date.end),
                };
                this.percentage = json.percentage;
              }
        
              toNormal() {
                return {
                  date: {
                    start: this.date.start.toNormal(),
                    end: this.date.end.toNormal(),
                  },
                  percentage: this.percentage,
                };
              }
            };
          };
        };
    
        #Designer = class {
          constructor(json) {
            this.partner = json.partner;
          }
    
          toNormal() {
            return {
              partner: this.partner,
            };
          }
        };
      };
    };
  };

  #HomeLiaisonAnalytics = class {
    constructor(json) {
      this.region = new this.#RegionAnalytics(json.region);
      this.construct = new this.#ConstructAnalytics(json.construct);
    }

    toNormal() {
      return {
        region: this.region.toNormal(),
        construct: this.construct.toNormal(),
      };
    }

    #ConstructAnalytics = class {
      constructor(json) {
        this.level = json.level;
        this.cost = json.cost;
        this.available = new this.#Available(json.available);
      }

      toNormal() {
        return {
          level: this.level,
          cost: this.cost,
          available: this.available.toNormal(),
        };
      }

      #Available = class extends Array {
        constructor(arr) {
          super();
          for (let i of arr) {
            this.push(new this.#AvailableFactor(i));
          }
        }
  
        toNormal() {
          const arr = [];
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }
  
        #AvailableFactor = class {
          constructor(json) {
            this.name = json.name;
          }
    
          toNormal() {
            return {
              name: this.name,
            };
          }
        };
      };
    };

    #RegionAnalytics = class {
      constructor(json) {
        this.transportation = new Menu(json.transportation, ["자동차", "대중교통"], false);
        this.range = json.range;
        this.expenses = json.expenses;
      }

      toNormal() {
        return {
          transportation: this.transportation.toNormal(),
          range: this.range,
          expenses: this.expenses,
        };
      }
    };
  };
}

class Builders extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const withTools = function (Builder) {
  return Builder;
}

const withToolsArr = function (Builders) {
  return Builders;
}

module.exports = { BuilderMap, Builder, Builders, Tools: { withTools, withToolsArr } };
