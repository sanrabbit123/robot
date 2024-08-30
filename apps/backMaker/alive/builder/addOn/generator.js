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

class DateParse extends Date {

  constructor(dateObject) {
    let tempArr0, tempArr1, tempArr2;
    if (typeof dateObject === "string") {
      if (dateObject.length === 19) {
        tempArr0 = dateObject.split(" ");
        tempArr1 = tempArr0[0].split("-");
        tempArr2 = tempArr0[1].split(":");
        super(new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]), Number(tempArr2[0]), Number(tempArr2[1]), Number(tempArr2[2])));
      } else if (dateObject.length === 10) {
        tempArr1 = dateObject.split("-");
        super(new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2])));
      } else {
        throw new Error("invalid date object");
      }
    } else {
      super(dateObject.toISOString());
    }
  }

  static zeroAddition(number) {
    if (number > 9) {
      return String(number);
    } else {
      return '0' + String(number);
    }
  }

  toString(detail = false) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();
    if (detail) {
      if (year === 1800) {
        return "1800-01-01";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day) + " " + DateParse.zeroAddition(hours) + ":" + DateParse.zeroAddition(minutes) + ":" + DateParse.zeroAddition(seconds));
      }
    } else {
      if (year === 1800) {
        return "1800-01-01";
      } else {
        return (DateParse.zeroAddition(year) + "-" + DateParse.zeroAddition(month) + "-" + DateParse.zeroAddition(day));
      }
    }
  }

  toNormal() {
    return new Date(this.toISOString());
  }

  toSixString() {
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
