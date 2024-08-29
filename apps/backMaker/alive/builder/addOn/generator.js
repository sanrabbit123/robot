Object.prototype.toNormal = function () {
  let obj = {};
  for (let key in this) {
    if (this[key].constructor.name !== "Object" && this[key].constructor.name !== "Function" && this[key].constructor.name !== "Array" && this[key].constructor.name !== "String" && this[key].constructor.name !== "Number" && this[key].constructor.name !== "Boolean" && this[key].constructor.name !== "Date") {
      if (typeof this[key]["toNormal"] === "function") {
        obj[key] = this[key].toNormal();
      } else {
        obj[key] = this[key];
      }
    } else {
      obj[key] = this[key];
    }
  }
  delete obj.toNormal;
  return obj;
}

class Address {
  constructor(rawString) {
    this.raw = this.value = rawString;
  }

  toNormal() {
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
  constructor(value, items, multiple = false) {
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
  toNormal() {
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
    this.information = {
      contract: {
        status: new Menu(json.information?.contract?.status, ["협약 완료", "협약 휴직", "협약 해지", "신청 대기", "컨택중"], false),
        date: new DateParse(json.information?.contract?.date)
      },
      phone: json.information?.phone,
      email: json.information?.email,
      address: (json.information?.address || []).map(addr => new Address(addr)),
      business: {
        company: json.information?.business?.company,
        career: {
          relatedY: Number(json.information?.business?.career?.relatedY),
          relatedM: Number(json.information?.business?.career?.relatedM),
          startY: Number(json.information?.business?.career?.startY),
          startM: Number(json.information?.business?.career?.startM)
        },
        account: (json.information?.business?.account || []).map(acc => ({
          bankName: acc?.bankName,
          accountNumber: acc?.accountNumber,
          to: acc?.to
        })),
        businessInfo: {
          classification: new Menu(json.information?.business?.businessInfo?.classification, ["법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서"], false),
          businessNumber: json.information?.business?.businessInfo?.businessNumber
        },
        service: {
          cost: {
            percentage: json.information?.business?.service?.cost?.percentage,
            percentageHistory: (json.information?.business?.service?.cost?.percentageHistory || []).map(history => ({
              date: {
                start: new DateParse(history?.date?.start),
                end: new DateParse(history?.date?.end)
              },
              percentage: history?.percentage
            }))
          },
          designer: {
            partner: json.information?.business?.service?.designer?.partner
          }
        }
      }
    };
    this.analytics = {
      region: {
        transportation: new Menu(json.analytics?.region?.transportation, ["자동차", "대중교통"], false),
        range: json.analytics?.region?.range,
        expenses: json.analytics?.region?.expenses
      },
      construct: {
        level: json.analytics?.construct?.level,
        cost: json.analytics?.construct?.cost,
        available: (json.analytics?.construct?.available || []).map(item => ({ name: item?.name }))
      }
    };
  }

  toNormal() {
    return {
      builder: this.builder,
      buiid: this.buiid,
      information: {
        contract: {
          status: this.information.contract.status.toNormal(),
          date: this.information.contract.date.toNormal()
        },
        phone: this.information.phone,
        email: this.information.email,
        address: this.information.address.map(addr => addr.toNormal()),
        business: {
          company: this.information.business.company,
          career: {
            relatedY: Number(this.information.business.career.relatedY),
            relatedM: Number(this.information.business.career.relatedM),
            startY: Number(this.information.business.career.startY),
            startM: Number(this.information.business.career.startM)
          },
          account: this.information.business.account.map(acc => ({
            bankName: acc.bankName,
            accountNumber: acc.accountNumber,
            to: acc.to
          })),
          businessInfo: {
            classification: this.information.business.businessInfo.classification.toNormal(),
            businessNumber: this.information.business.businessInfo.businessNumber
          },
          service: {
            cost: {
              percentage: this.information.business.service.cost.percentage,
              percentageHistory: this.information.business.service.cost.percentageHistory.map(history => ({
                date: {
                  start: history.date.start.toNormal(),
                  end: history.date.end.toNormal()
                },
                percentage: history.percentage
              }))
            },
            designer: {
              partner: this.information.business.service.designer.partner
            }
          }
        }
      },
      analytics: {
        region: {
          transportation: this.analytics.region.transportation.toNormal(),
          range: this.analytics.region.range,
          expenses: this.analytics.region.expenses
        },
        construct: {
          level: this.analytics.construct.level,
          cost: this.analytics.construct.cost,
          available: this.analytics.construct.available.map(item => ({ name: item.name }))
        }
      }
    };
  }
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

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { Builder, Builders, Tools: {
  withTools: withTools,
  withToolsArr: withToolsArr
} };
