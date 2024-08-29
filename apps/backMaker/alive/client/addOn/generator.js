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

class Family {
  constructor(rawString) {
    this.raw = this.value = rawString;
  }

  toNormal() {
    return this.value;
  }
}

class Pyeong {
  constructor(rawString) {
    this.raw = this.value = rawString;
  }

  toNormal() {
    return this.value;
  }
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

class Request {
  constructor(_request) {
    const { request, analytics } = _request;

    this.request = {};
    this.request.timeline = new DateParse(request.timeline);
    this.request.notionId = request.notionId;
    this.request.budget = new Menu(request.budget, [
      '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원',
      '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상',
      '6,000만원 이상', '7,000만원 이상', '8,000만원 이상', '9,000만원 이상',
      '1억원 이상', '1억 5,000만원 이상', '2억원 이상', '3억원 이상',
      '5억원 이상', '10억원 이상'
    ], false);
    this.request.family = new Family(request.family);
    this.request.furniture = new Menu(request.furniture, ["재배치", "일부 구매", "전체 구매"], false);
    this.request.space = {
      address: new Address(request.space.address),
      contract: new Menu(request.space.contract, ['전월세', '자가'], false),
      pyeong: new Pyeong(request.space.pyeong),
      naver: request.space.naver,
      spec: {
        room: request.space.spec.room,
        bathroom: request.space.spec.bathroom,
        valcony: request.space.spec.valcony,
      },
      resident: {
        living: Boolean(request.space.resident.living),
        expected: new DateParse(request.space.resident.expected),
      },
      partial: {
        boo: request.space.partial.boo,
        pyeong: new Pyeong(request.space.partial.pyeong),
        detail: request.space.partial.detail,
      }
    };
    this.request.etc = {
      comment: request.etc.comment,
      channel: request.etc.channel
    };

    this.analytics = {};
    this.analytics.response = {
      status: new Menu(analytics.response?.status, ["드랍", "진행", "응대중", "장기"], false),
      action: new Menu(analytics.response?.action, [
        "1차 응대 예정",
        "1차 응대 후 대기",
        "스타일 체크 대기",
        "제안 발송 예정",
        "제안 피드백 예정",
        "피드백 부재중",
        "제안 피드백 완료",
        "부재중 알림 발송",
        "상세 설문 대기",
        "부재중 제안 발송",
        "피드백과 응대 예정",
        "자동 피드백 부재중",
        "피드백과 응대 완료",
        "디자이너 선택",
        "해당 없음",
      ], false),
      outreason: new Menu(analytics.response?.outreason, [
        "연결 안 됨",
        "가벼운 문의",
        "고객 미션 미응답",
        "직접 진행",
        "고객 상황 변동",
        "가족 의견 불일치",
        "기간 임박",
        "장기 고객",
        "시공만 필요",
        "거주중 시공",
        "일단 견적 먼저",
        "시공 문제",
        "서비스 불일치",
        "타사 계약",
        "지역 이슈",
        "총 예산 문제",
        "디자인비 문제",
        "프로세스 문제",
        "디자이너 부족",
        "제안서 매력도",
      ], true),
      kakao: analytics.response?.kakao,
      service: {
        serid: analytics.response?.service?.serid,
        xValue: analytics.response?.service?.xValue,
        online: Boolean(analytics.response?.service?.online)
      },
      designers: analytics.response?.designers || [],
      priority: new Menu(analytics.response?.priority, ["상", "중", "하"], false),
      possible: new Menu(analytics.response?.possible, ["높음", "애매", "낮음"], false),
      target: new Menu(analytics.response?.target, ["타겟", "애매", "해당 없음"], false),
      memo: analytics.response?.memo
    };
    this.analytics.date = {
      call: {
        next: new DateParse(analytics.date?.call?.next),
        history: (analytics.date?.call?.history || []).map(item => ({
          date: new DateParse(item?.date),
          who: item?.who
        })),
        recommend: new DateParse(analytics.date?.call?.recommend)
      },
      space: {
        precheck: new DateParse(analytics.date?.space?.precheck),
        empty: new DateParse(analytics.date?.space?.empty),
        movein: new DateParse(analytics.date?.space?.movein)
      },
      calendar: {
        call: {
          mother: analytics.date?.calendar?.call?.mother,
          id: analytics.date?.calendar?.call?.id
        },
        precheck: {
          mother: analytics.date?.calendar?.precheck?.mother,
          id: analytics.date?.calendar?.precheck?.id
        },
        empty: {
          mother: analytics.date?.calendar?.empty?.mother,
          id: analytics.date?.calendar?.empty?.id
        },
        movein: {
          mother: analytics.date?.calendar?.movein?.mother,
          id: analytics.date?.calendar?.movein?.id
        }
      }
    };
    this.analytics.picture = {
      space: {
        boo: Boolean(analytics.picture?.space?.boo),
        file: (analytics.picture?.space?.file || []).map(item => ({
          date: new DateParse(item?.date),
          confirm: (item?.confirm || []).map(c => ({
            date: new DateParse(c?.date),
            who: c?.who
          })),
          folderId: item?.folderId
        }))
      },
      prefer: {
        boo: Boolean(analytics.picture?.prefer?.boo),
        file: (analytics.picture?.prefer?.file || []).map(item => ({
          date: new DateParse(item?.date),
          confirm: (item?.confirm || []).map(c => ({
            date: new DateParse(c?.date),
            who: c?.who
          })),
          folderId: item?.folderId
        }))
      }
    };
    this.analytics.proposal = (analytics.proposal || []).map(item => ({
        proid: item?.proid,
        date: new DateParse(item?.date),
        contract: item?.contract
    }));
    this.analytics.session = analytics.session || [];
  }

  toNormal() {
    return {
      request: {
        timeline: this.request.timeline.toNormal(),
        notionId: this.request.notionId,
        budget: this.request.budget.toNormal(),
        family: this.request.family.toNormal(),
        furniture: this.request.furniture.toNormal(),
        space: {
          address: this.request.space.address.toNormal(),
          contract: this.request.space.contract.toNormal(),
          pyeong: this.request.space.pyeong.toNormal(),
          naver: this.request.space.naver,
          spec: {
            room: this.request.space.spec.room,
            bathroom: this.request.space.spec.bathroom,
            valcony: this.request.space.spec.valcony,
          },
          resident: {
            living: this.request.space.resident.living,
            expected: this.request.space.resident.expected.toNormal(),
          },
          partial: {
            boo: this.request.space.partial.boo,
            pyeong: this.request.space.partial.pyeong.toNormal(),
            detail: this.request.space.partial.detail,
          }
        },
        etc: this.request.etc
      },
      analytics: {
        response: {
          status: this.analytics.response.status.toNormal(),
          action: this.analytics.response.action.toNormal(),
          outreason: this.analytics.response.outreason.toNormal(),
          kakao: this.analytics.response.kakao,
          service: {
            serid: this.analytics.response.service.serid,
            xValue: this.analytics.response.service.xValue,
            online: this.analytics.response.service.online
          },
          designers: this.analytics.response.designers.slice(),
          priority: this.analytics.response.priority.toNormal(),
          possible: this.analytics.response.possible.toNormal(),
          target: this.analytics.response.target.toNormal(),
          memo: this.analytics.response.memo
        },
        date: {
          call: {
            next: this.analytics.date.call.next.toNormal(),
            history: this.analytics.date.call.history.map(item => ({
              date: item.date.toNormal(),
              who: item.who
            })),
            recommend: this.analytics.date.call.recommend.toNormal()
          },
          space: {
            precheck: this.analytics.date.space.precheck.toNormal(),
            empty: this.analytics.date.space.empty.toNormal(),
            movein: this.analytics.date.space.movein.toNormal()
          },
          calendar: {
            call: {
              mother: this.analytics.date.calendar.call.mother,
              id: this.analytics.date.calendar.call.id
            },
            precheck: {
              mother: this.analytics.date.calendar.precheck.mother,
              id: this.analytics.date.calendar.precheck.id
            },
            empty: {
              mother: this.analytics.date.calendar.empty.mother,
              id: this.analytics.date.calendar.empty.id
            },
            movein: {
              mother: this.analytics.date.calendar.movein.mother,
              id: this.analytics.date.calendar.movein.id
            }
          }
        },
        picture: {
          space: {
            boo: this.analytics.picture.space.boo,
            file: this.analytics.picture.space.file.map(item => ({
              date: item.date.toNormal(),
              confirm: item.confirm.map(c => ({
                date: c.date.toNormal(),
                who: c.who
              })),
              folderId: item.folderId
            }))
          },
          prefer: {
            boo: this.analytics.picture.prefer.boo,
            file: this.analytics.picture.prefer.file.map(item => ({
              date: item.date.toNormal(),
              confirm: item.confirm.map(c => ({
                date: c.date.toNormal(),
                who: c.who
              })),
              folderId: item.folderId
            }))
          }
        },
        proposal: this.analytics.proposal.map(item => ({
            proid: item.proid,
            date: item.date.toNormal(),
            contract: item.contract
        })),
        session: this.analytics.session.slice()
      }
    };
  }

  get space() {
    return this.request.space;
  }
}

class Client {
  constructor(json) {
    this.name = json.name;
    this.phone = json.phone;
    this.email = json.email;
    this.cliid = this.validateClientId(json.cliid);
    this.requests = this.createRequests(json.requests);
  }

  validateClientId(rawId) {
    if (!/^c/.test(rawId) || rawId.length !== 11) {
      throw new Error("invalid client id");
    }
    return rawId;
  }

  createRequests(requests) {
    return requests.map(request => new Request(request));
  }

  latestRequest() {
    return this.requests[0];
  }

  toJson() {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      cliid: this.cliid,
      requests: this.requests.toNormal()
    };
  }

  toNormal() {
    return this.toJson();
  }

  toString() {
    return JSON.stringify(this.toJson(), null, 2);
  }

  toDeath() {
    return this.toString();
  }

  stringify() {
    return this.toString();
  }

  returnPyeongArr() {
    return this.requests.map(request => request.space.pyeong.value);
  }
}

class Clients extends Array {

  latestRequests() {
    let arr = [];
    for (let i of this) {
      arr.push(i.latestRequest());
    }
    return arr;
  }

  getRequests() {
    let arr = [];
    let tempArr;
    for (let i of this) {
      tempArr = i.requests;
      for (let j of tempArr) {
        arr.push(j);
      }
    }
    return arr;
  }

  get requests() {
    return this.getRequests();
  }

  get name() {
    let arr = [];
    for (let i of this) {
      arr.push(i.name);
    }
    return arr.join(',');
  }

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

module.exports = { Client, Clients };
