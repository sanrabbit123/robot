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
    return number > 9 ? String(number) : '0' + String(number);
  }

  toString(detail = false) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    const hours = this.getHours();
    const minutes = this.getMinutes();
    const seconds = this.getSeconds();

    const dateString = `${DateParse.zeroAddition(year)}-${DateParse.zeroAddition(month)}-${DateParse.zeroAddition(day)}`;
    const timeString = `${DateParse.zeroAddition(hours)}:${DateParse.zeroAddition(minutes)}:${DateParse.zeroAddition(seconds)}`;

    return detail ? `${dateString} ${timeString}` : dateString;
  }

  toNormal() {
    return new Date(this.toISOString());
  }

  toSixString() {
    const date = this.toString(false);
    return `${date.slice(2, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`;
  }
}

class Aspirant {
  constructor(json) {
    this.aspid = json.aspid;
    this.designer = json.designer;
    this.phone = json.phone;
    this.gender = json.gender;
    this.birth = new DateParse(json.birth);
    this.address = json.address;
    this.email = json.email;
    
    this.information = {
      company: {
        name: json.information?.company?.name,
        classification: json.information?.company?.classification,
        businessNumber: json.information?.company?.businessNumber,
        representative: json.information?.company?.representative,
        start: new DateParse(json.information?.company?.start)
      },
      account: {
        bank: json.information?.account?.bank,
        number: json.information?.account?.number,
        to: json.information?.account?.to,
        etc: json.information?.account?.etc
      },
      career: {
        interior: {
          year: json.information?.career?.interior?.year,
          month: json.information?.career?.interior?.month
        },
        styling: {
          year: json.information?.career?.styling?.year,
          month: json.information?.career?.styling?.month
        },
        detail: (json.information?.career?.detail || []).map(item => ({
          company: item?.company,
          team: item?.team,
          role: item?.role,
          tag: item?.tag,
          date: {
            start: new DateParse(item?.date?.start),
            end: new DateParse(item?.date?.end)
          }
        })),
        school: (json.information?.career?.school || []).map(item => ({
          school: item?.school,
          major: item?.major,
          date: {
            start: new DateParse(item?.date?.start),
            end: new DateParse(item?.date?.end)
          }
        })),
        about: json.information?.career?.about
      },
      channel: {
        web: (json.information?.channel?.web || []),
        sns: (json.information?.channel?.sns || []),
        cloud: (json.information?.channel?.cloud || [])
      }
    };
    
    this.meeting = {
      status: json.meeting?.status,
      date: new DateParse(json.meeting?.date),
      memo: json.meeting?.memo,
      common: {
        date: new DateParse(json.meeting?.common?.date),
        status: json.meeting?.common?.status,
        eight: (json.meeting?.common?.eight || []).map(item => ({
          date: new DateParse(item?.date),
          priority: item?.priority,
          name: item?.name
        }))
      }
    };

    this.portfolio = (json.portfolio || []).map(item => ({
      date: new DateParse(item?.date),
      confirm: (item?.confirm || []).map(c => ({
        date: new DateParse(c?.date),
        who: c?.who
      })),
      folderId: item?.folderId
    }));

    this.submit = {
      presentation: {
        date: new DateParse(json.submit?.presentation?.date),
        boo: json.submit?.presentation?.boo
      },
      partnership: {
        date: new DateParse(json.submit?.partnership?.date),
        boo: json.submit?.partnership?.boo
      },
      firstRequest: {
        date: new DateParse(json.submit?.firstRequest?.date),
        method: json.submit?.firstRequest?.method
      },
      documents: {
        date: new DateParse(json.submit?.documents?.date),
        boo: json.submit?.documents?.boo
      },
      registration: {
        date: new DateParse(json.submit?.registration?.date),
        boo: json.submit?.registration?.boo
      },
      meeting: {
        date: new DateParse(json.submit?.meeting?.date),
        boo: json.submit?.meeting?.boo
      },
      comeFrom: json.submit?.comeFrom
    };

    this.response = {
      date: new DateParse(json.response?.date),
      long: json.response?.long,
      outreason: json.response?.outreason,
      manager: json.response?.manager,
      first: {
        status: json.response?.first?.status,
        reason: json.response?.first?.reason
      },
      portfolio: {
        summary: json.response?.portfolio?.summary,
        proper: {
          status: json.response?.portfolio?.proper?.status,
          remodeling: json.response?.portfolio?.proper?.remodeling,
          styling: json.response?.portfolio?.proper?.styling
        },
        ready: {
          home: json.response?.portfolio?.ready?.home,
          furnishing: json.response?.portfolio?.ready?.furnishing,
          set: json.response?.portfolio?.ready?.set
        },
        plus: {
          needs: json.response?.portfolio?.plus?.needs,
          request: new DateParse(json.response?.portfolio?.plus?.request),
          photo: new DateParse(json.response?.portfolio?.plus?.photo)
        }
      }
    };

    this.contract = {
      partnership: {
        date: new DateParse(json.contract?.partnership?.date),
        id: json.contract?.partnership?.id
      },
      designer: {
        date: new DateParse(json.contract?.designer?.date),
        id: json.contract?.designer?.id
      }
    };

    this.calendar = {
      mother: json.calendar?.mother,
      id: json.calendar?.id
    };
  }

  toNormal() {
    return {
      aspid: this.aspid,
      designer: this.designer,
      phone: this.phone,
      gender: this.gender,
      birth: this.birth.toNormal(),
      address: this.address,
      email: this.email,
      information: {
        company: {
          name: this.information.company.name,
          classification: this.information.company.classification,
          businessNumber: this.information.company.businessNumber,
          representative: this.information.company.representative,
          start: this.information.company.start.toNormal()
        },
        account: {
          bank: this.information.account.bank,
          number: this.information.account.number,
          to: this.information.account.to,
          etc: this.information.account.etc
        },
        career: {
          interior: {
            year: this.information.career.interior.year,
            month: this.information.career.interior.month
          },
          styling: {
            year: this.information.career.styling.year,
            month: this.information.career.styling.month
          },
          detail: this.information.career.detail.map(item => ({
            company: item.company,
            team: item.team,
            role: item.role,
            tag: item.tag,
            date: {
              start: item.date.start.toNormal(),
              end: item.date.end.toNormal()
            }
          })),
          school: this.information.career.school.map(item => ({
            school: item.school,
            major: item.major,
            date: {
              start: item.date.start.toNormal(),
              end: item.date.end.toNormal()
            }
          })),
          about: this.information.career.about
        },
        channel: {
          web: this.information.channel.web.slice(),
          sns: this.information.channel.sns.slice(),
          cloud: this.information.channel.cloud.slice()
        }
      },
      meeting: {
        status: this.meeting.status,
        date: this.meeting.date.toNormal(),
        memo: this.meeting.memo,
        common: {
          date: this.meeting.common.date.toNormal(),
          status: this.meeting.common.status,
          eight: this.meeting.common.eight.map(item => ({
            date: item.date.toNormal(),
            priority: item.priority,
            name: item.name
          }))
        }
      },
      portfolio: this.portfolio.map(item => ({
        date: item.date.toNormal(),
        confirm: item.confirm.map(c => ({
          date: c.date.toNormal(),
          who: c.who
        })),
        folderId: item.folderId
      })),
      submit: {
        presentation: {
          date: this.submit.presentation.date.toNormal(),
          boo: this.submit.presentation.boo
        },
        partnership: {
          date: this.submit.partnership.date.toNormal(),
          boo: this.submit.partnership.boo
        },
        firstRequest: {
          date: this.submit.firstRequest.date.toNormal(),
          method: this.submit.firstRequest.method
        },
        documents: {
          date: this.submit.documents.date.toNormal(),
          boo: this.submit.documents.boo
        },
        registration: {
          date: this.submit.registration.date.toNormal(),
          boo: this.submit.registration.boo
        },
        meeting: {
          date: this.submit.meeting.date.toNormal(),
          boo: this.submit.meeting.boo
        },
        comeFrom: this.submit.comeFrom
      },
      response: {
        date: this.response.date.toNormal(),
        long: this.response.long,
        outreason: this.response.outreason,
        manager: this.response.manager,
        first: {
          status: this.response.first.status,
          reason: this.response.first.reason
        },
        portfolio: {
          summary: this.response.portfolio.summary,
          proper: {
            status: this.response.portfolio.proper.status,
            remodeling: this.response.portfolio.proper.remodeling,
            styling: this.response.portfolio.proper.styling
          },
          ready: {
            home: this.response.portfolio.ready.home,
            furnishing: this.response.portfolio.ready.furnishing,
            set: this.response.portfolio.ready.set
          },
          plus: {
            needs: this.response.portfolio.plus.needs,
            request: this.response.portfolio.plus.request.toNormal(),
            photo: this.response.portfolio.plus.photo.toNormal()
          }
        }
      },
      contract: {
        partnership: {
          date: this.contract.partnership.date.toNormal(),
          id: this.contract.partnership.id
        },
        designer: {
          date: this.contract.designer.date.toNormal(),
          id: this.contract.designer.id
        }
      },
      calendar: {
        mother: this.calendar.mother,
        id: this.calendar.id
      }
    };
  }

  firstRequest() {
    return this.submit.firstRequest.date;
  }

  meetingAlarm() {
    const today = new Date();
    const dayConvert = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    const dateToString = (dateObject) => {
      return `${dateObject.getMonth() + 1}월 ${dateObject.getDate()}일 ${dayConvert[dateObject.getDay()]} ${dateObject.getHours()}시`;
    }

    let standard;
    if (today.getDay() === 4 || today.getDay() === 5) {
      standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 4));
    } else if (today.getDay() === 6 || today.getDay() === 0) {
      standard = null;
    } else {
      standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 2));
    }

    const obj = {
      name: this.designer,
      phone: this.phone,
      date: this.meeting.date,
      status: (this.meeting.date.valueOf() <= today.valueOf()) ? "미팅 완료" : "미팅 대기",
      dateString: dateToString(this.meeting.date),
      alarm: standard !== null && standard.getFullYear() === this.meeting.date.getFullYear() && standard.getMonth() === this.meeting.date.getMonth() && standard.getDate() === this.meeting.date.getDate()
    };

    return this.meeting.date.getFullYear() < 2000 ? null : obj;
  }
}

class Aspirants extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

  meetingAlarm() {
    let arr;
    arr = [];
    for (let i of this) {
      if (i.meetingAlarm() !== null) {
        arr.push(i.meetingAlarm());
      }
    }
    arr.sort((a, b) => {
      return a.date.valueOf() - b.date.valueOf();
    });
    return arr;
  }

}

const withTools = function (Aspirant) {

  Aspirant.prototype.flatDeath = function (mode = "total") {
    const aspirant = this.toNormal();
    const dateToStringDay = function (dateObject) {
      const dayConvert = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ];
      return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} ${String(dateObject.getHours())}시`;
    };
    const dateToString = function (str) {
      const zeroAddition = function (num) {
        if (num < 10) {
          return `0${String(num)}`;
        } else {
          return String(num);
        }
      }
      let date;
      date = new Date(str);
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
    }
    let tempObj;

    tempObj = {};

    if (mode === "total") {
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.status = aspirant.meeting.status;
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";
      tempObj.date = dateToString(aspirant.submit.firstRequest.date);
      tempObj.presentationBoo = aspirant.submit.presentation.boo;
      tempObj.partnershipBoo = aspirant.submit.partnership.boo;
      tempObj.portfolioBoo = (aspirant.portfolio.length > 0);
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;
      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;
      tempObj.classification = aspirant.information.company.classification;
      tempObj.company = aspirant.information.company.name;
      tempObj.businessNumber = aspirant.information.company.businessNumber;
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);
      tempObj.representative = aspirant.information.company.representative;
      tempObj.bankName = aspirant.information.account.bank;
      tempObj.bankAccount = aspirant.information.account.number;
      tempObj.bankTo = aspirant.information.account.to;
      tempObj.bankEtc = aspirant.information.account.etc;
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';
      tempObj.careerDetail = aspirant.information.career.detail;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      tempObj.portfolioConfirms = JSON.stringify([]);
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
        tempObj.portfolioConfirms = JSON.stringify(aspirant.portfolio[0].confirm);
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.portfolioBoo = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }
      tempObj.presentationBoo = tempObj.presentationBoo ? "신청" : "미신청";
      tempObj.partnershipBoo = tempObj.partnershipBoo ? "신청" : "미신청";
      tempObj.portfolioBoo = tempObj.portfolioBoo ? "제출" : "미제출";

      return tempObj;
    } else if (mode === "presentation") {

      if (!aspirant.submit.presentation.boo) {
        return null;
      }

      tempObj.date = dateToString(aspirant.submit.presentation.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;
      tempObj.status = aspirant.meeting.status;
      tempObj.presentationTimes = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";
      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

    } else if (mode === "partnership") {

      if (!aspirant.submit.partnership.boo) {
        return null;
      }

      tempObj.date = dateToString(aspirant.submit.partnership.date);
      tempObj.designer = aspirant.designer;
      tempObj.phone = aspirant.phone;
      tempObj.email = aspirant.email;
      tempObj.address = aspirant.address;

      tempObj.status = aspirant.meeting.status;
      tempObj.meetingTime = (!/^조정/.test(aspirant.meeting.status)) ? dateToStringDay(aspirant.meeting.date) : "기타";

      tempObj.classification = aspirant.information.company.classification;
      tempObj.company = aspirant.information.company.name;
      tempObj.businessNumber = aspirant.information.company.businessNumber;
      tempObj.startDate = dateToString(aspirant.information.company.start).slice(0, 10);
      tempObj.representative = aspirant.information.company.representative;
      tempObj.bankName = aspirant.information.account.bank;
      tempObj.bankAccount = aspirant.information.account.number;
      tempObj.bankTo = aspirant.information.account.to;
      tempObj.bankEtc = aspirant.information.account.etc;
      tempObj.interiorCareer = String(aspirant.information.career.interior.year) + '년 ' + String(aspirant.information.career.interior.month) + '개월';
      tempObj.stylingCareer = String(aspirant.information.career.styling.year) + '년 ' + String(aspirant.information.career.styling.month) + '개월';
      tempObj.careerDetail = aspirant.information.career.detail;

      tempObj.comeFrom = aspirant.submit.comeFrom;
      tempObj.webChannel = aspirant.information.channel.web.join(',');;
      tempObj.snsChannel = aspirant.information.channel.sns.join(',');;
      tempObj.cloudChannel = aspirant.information.channel.cloud.join(',');;

      tempObj.binary = (aspirant.portfolio.length > 0);
      tempObj.folderId = null;
      if (aspirant.portfolio.length > 0) {
        tempObj.folderId = aspirant.portfolio[0].folderId;
      }
      tempObj.relation = aspirant.submit.partnership.boo;
      if (!tempObj.binary) {
        for (let i of aspirant.information.channel.web) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.sns) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
        for (let i of aspirant.information.channel.cloud) {
          tempObj.binary = true;
          tempObj.folderId = "__link__" + i.replace(/[\&\=]/g, '');
        }
      }

    }

    return tempObj;
  }

  Aspirant.prototype.dimensionSqueeze = function () {
    const tong = JSON.parse(JSON.stringify(this.flatDeath()));
    let result;

    result = [];

    delete tong.portfolioConfirms;
    if (/^__link__/.test(tong.folderId)) {
      tong.folderId = tong.folderId.slice(8);
    }
    tong.aspirantBinary = tong.binary;
    delete tong.binary;

    result.push(tong);

    return result;
  }

  return Aspirant;
}

const withToolsArr = function (Aspirants) {

  Aspirants.prototype.flatDeath = function () {
    let tong, tempArr;
    tong = [];
    for (let i of this) {
      tempArr = i.flatDeath();
      for (let j of tempArr) {
        tong.push(j);
      }
    }
    return tong;
  }

  Aspirants.prototype.dimensionSqueeze = function () {
    const TABLE_NAME = "aspirant";
    const LONG_TARGETS = [];
    class SqlModel {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = "VARCHAR(255)";
          } else if (typeof sample[i] === "number") {
            this[i] = "INT(11)";
          } else if (typeof sample[i] === "boolean") {
            this[i] = "INT(11)";
          } else {
            this[i] = "VARCHAR(255)";
          }
          if (LONG_TARGETS.includes(i)) {
            this[i] = "TEXT";
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getCreateSql() {
        let sql = "CREATE TABLE \`" + this.getName() + "\` (";
        sql += "id INT(11) NOT NULL AUTO_INCREMENT,";
        sql += " ";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += " ";
          sql += this[i];
          sql += ", ";
        }
        sql += "PRIMARY KEY (id));";
        return sql;
      }

      getDropSql() {
        let sql = "DROP TABLE " + this.getName() + ";";
        return sql;
      }

    }
    class SqlTong extends Array {
      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let arr = [];
        for (let i of this) {
          arr.push(i.getInsertSql());
        }
        return arr;
      }

    }
    class SqlTongFactor {
      constructor(sample) {
        for (let i in sample) {
          if (typeof sample[i] === "string") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "number") {
            this[i] = sample[i];
          } else if (typeof sample[i] === "boolean") {
            if (sample[i]) {
              this[i] = 1;
            } else {
              this[i] = 0;
            }
          } else {
            this[i] = JSON.stringify(sample[i]);
          }
        }
      }

      getName() {
        return TABLE_NAME;
      }

      getInsertSql() {
        let sql = "INSERT INTO \`" + this.getName() + "\` (";
        for (let i in this) {
          sql += "\`";
          sql += i;
          sql += "\`";
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ") VALUES (";

        for (let i in this) {
          if (typeof this[i] === "number") {
            sql += this[i];
          } else {
            sql += "'";
            sql += this[i].replace(/'/g, '"');
            sql += "'";
          }
          sql += ",";
        }

        sql = sql.slice(0, -1);
        sql += ");";

        return sql;
      }
    }

    let tong, tempArr;
    let sample, model;

    tong = new SqlTong();

    for (let i of this) {
      tempArr = i.dimensionSqueeze();
      for (let j of tempArr) {
        tong.push(new SqlTongFactor(j));
      }
    }

    if (tong.length > 0) {
      sample = tong[0];
      model = new SqlModel(sample);
      return { model, data: tong };
    } else {
      return null;
    }
  }

  Aspirants.prototype.search = function (aspid) {
    let result = null;
    for (let i of this) {
      if (i.aspid === aspid) {
        result = i;
        break;
      }
    }
    return result;
  }

  Aspirants.prototype.find = function (aspid) {
    return this.search(aspid);
  }

  return Aspirants;
}

module.exports = { Aspirant, Aspirants, Tools: {
  withTools: withTools,
  withToolsArr: withToolsArr
} };
