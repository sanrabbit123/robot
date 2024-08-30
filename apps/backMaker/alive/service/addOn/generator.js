const ServiceSampleData = {
  "serid": "s2011_aa02s",
  "key": "homeStyling",
  "date": new Date("2021-11-01T04:48:27.122Z"),
  "kind": "service",
  "setting": {
    "coordinates": {
      "x": {
        "M": "mini",
        "B": "basic",
        "P": "premium"
      },
      "y": {
        "homeFurnishing": "홈퍼니싱",
        "homeStyling": "홈스타일링",
        "totalStyling": "토탈 스타일링",
        "extraStyling": "엑스트라 스타일링"
      },
      "z": {
        "online": "온라인",
        "offline": "오프라인"
      }
    },
    "period": 45,
    "schedule": [
      {
        "title": "1차 디자인 제안",
        "description": "컨셉 설정과 공간 기획을 포함한 첫 번째 디자인 제안입니다. 컨셉 설명과 공간 구성 시각화 자료, 배치도, 제품 리스트를 제공합니다.",
        "color": "#f05a24",
        "period": 10,
        "order": 0
      },
      {
        "title": "수정 디자인 제안",
        "description": "최대 3회까지 디자인 수정을 거쳐 고객님만의 맞춤 디자인이 확정됩니다. 컨셉을 최대 1회까지 수정 가능합니다.",
        "color": "#f05a24",
        "period": 6,
        "order": 1
      },
      {
        "title": "시공 디자인",
        "description": "디자인에 따라 시공 공정 선택과 범위를 정합니다. 공정이 선택되었다면, 전체 완성도와 예산을 고려하여 자재와 세부 디자인을 정합니다.",
        "color": "#cccccc",
        "period": 6,
        "order": 1
      },
      {
        "title": "시공 견적 안내",
        "description": "고객님은 홈리에종 시공사, 디자이너 시공사, 고객 지정 시공사로부터 견적서를 받고 비교하여 선택할 수 있습니다.",
        "color": "#cccccc",
        "period": 3,
        "order": 2
      },
      {
        "title": "시공 진행",
        "description": "철거, 전기, 설비, 목공, 도장, 타일, 금속, 마감 순으로 시공을 진행합니다. 구체적인 순서는 상황에 따라 달라질 수 있습니다.",
        "color": "#cccccc",
        "period": 15,
        "order": 2
      },
      {
        "title": "제품 구매",
        "description": "제품 리스트를 통해 제품의 스펙과 금액과 구매처를 안내드립니다. 구매처는 온라인 링크 또는 쇼룸 방문에 대한 정보를 제공합니다.",
        "color": "#29aae1",
        "period": 7,
        "order": 3
      },
      {
        "title": "패브릭 제작",
        "description": "패브릭을 제작할 때는 디자이너님이 직접 발주합니다. 결제는 상황에 따라 업체로 지불하거나 디자이너가 수령하여 발주와 함께 진행합니다.",
        "color": "#faaf3b",
        "period": 7,
        "order": 3
      },
      {
        "title": "제작 가구 발주",
        "description": "가구를 제작할 때는 디자이너님이 직접 발주합니다. 결제는 상황에 따라 업체로 지불하거나 디자이너가 수령하여 발주와 함께 진행합니다.",
        "color": "#faaf3b",
        "period": 7,
        "order": 3
      },
      {
        "title": "입주 청소",
        "description": "홈리에종에 연계된 업체를 통해 입주 청소를 제공 받으실 수 있습니다. 문의주시면 예약 가능 여부와 서비스 비용을 확인해드립니다.",
        "color": "#8bc53f",
        "period": 2,
        "order": 4
      },
      {
        "title": "설치 및 세팅",
        "description": "배치도를 통해 어떤 것을 어디에 둘 지에 대한 구체적인 가이드를 제공합니다. 디자이너가 직접 조립 및 설치를 도와드리지는 않습니다.",
        "color": "#e856ba",
        "period": 4,
        "order": 5
      },
      {
        "title": "정리 수납",
        "description": "홈리에종에 연계된 정리 수납 전문가가 방문 견적을 드립니다. 정리 수납을 진행하기에 적합한 시점은 현장에 따라 다를 수 있습니다.",
        "color": "#e856ba",
        "period": 4,
        "order": 5
      },
      {
        "title": "촬영 및 인터뷰",
        "description": "집의 가장 아름다운 모습을 사진으로 남기실 수 있습니다. 홈리에종을 통해 촬영 일자를 조율하며, 시간은 2시간 가량 소요됩니다.",
        "color": "#2fa678",
        "period": 1,
        "order": 6
      }
    ]
  }
}

const ServiceMap = {
  main: function (kind = "service") {
    if (kind !== "service" && kind !== "checklist") {
      throw new Error("invaild kind");
    }
    let dummy;
    if (kind === "service") {
      dummy = {
        structure: {
          serid: "",
          key: "",
          date: new Date(),
          kind,
          setting: {
            coordinates: {
              x: {
                M: "mini",
                B: "basic",
                P: "premium"
              },
              y: {
                homeFurnishing: "홈퍼니싱",
                homeStyling: "홈스타일링",
                totalStyling: "토탈 스타일링",
                extraStyling: "엑스트라 스타일링"
              },
              z: {
                online: "온라인",
                offline: "오프라인"
              },
            },
            period: 0,
            schedule: [],
          },
        }
      };
    } else if (kind === "checklist") {
      dummy = {
        structure: {
          serid: "",
          key: "",
          date: new Date(),
          kind,
          setting: {
            target: {
              collection: "",
              action: "",
            },
            contents: {
              title: "",
              checklist: [],
            }
          }
        }
      };
    }
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "setting.contents.checklist") {
      dummy = {
        title: "",
        children: [],
      };
    } else if (subject === "setting.contents.checklist.children") {
      dummy = {
        title: "",
        contents: "",
      };
    } else if (subject === "setting.schedule") {
      dummy = {
        title: "",
        description: "",
        color: "#000000",
        period: 0,
        order: 0
      };
    }
    return dummy;
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

class Service {
  constructor(json) {
    this.serid = json.serid;
    this.key = json.key;
    this.date = new DateParse(json.date);
    this.kind = json.kind;
    if (this.kind === "service") {
      this.setting = new this.#CoreSetting(json.setting);
    } else if (this.kind === "checklist") {
      this.setting = new this.#ChecklistSetting(json.setting);
    } else {
      throw new Error("invalid kind");
    }
  }

  toNormal() {
    return {
      serid: this.serid,
      key: this.key,
      date: this.date.toNormal(),
      kind: this.kind,
      setting: this.setting.toNormal()
    };
  }

  toMatrix() {
    const { title, checklist } = this.setting.contents;
    const matrix = [[title, ""]];
    let num = 0;
    for (let { title, children } of checklist) {
      matrix.push([String(num + 1), title]);
      for (let obj of children) {
        matrix.push([obj.title, obj.contents.replace(/\<[ub]\%/gi, '').replace(/\%[ub]\>/gi, '')]);
      }
      num++;
    }
    return matrix;
  }

  #ChecklistSetting = class {
    constructor (json) {
      this.target = new this.#ChecklistTarget(json.target);
      this.contents = new this.#ChecklistContents(json.contents);
    }
    toNormal () {
      let obj;
      obj = {};
      obj.target = this.target.toNormal();
      obj.contents = this.contents.toNormal();
      return obj;
    }
  
    #ChecklistTarget = class {
      constructor (json) {
        this.collection = json.collection;
        this.action = new this.#Action(json.action);
      }
      toNormal () {
        let obj = {};
        obj.collection = this.collection;
        obj.action = this.action.toNormal();
        return obj;
      }
      #Action = class extends Array {
        constructor(arr) {
          super();
          for (let i of arr) {
            this.push(i);
          }
        }
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i);
          }
          return arr;
        }
      }
    }
  
    #ChecklistContents = class {
      constructor (json) {
        this.title = json.title;
        this.checklist = new this.#Checklist(json.checklist);
      }
    
      toNormal () {
        let obj = {};
        obj.title = this.title;
        obj.checklist = this.checklist.toNormal();
        return obj;
      }
    
      #Checklist = class extends Array {
        constructor(arr) {
          super();
          for (let obj of arr) {
            this.push(new this.#ChecklistFactor(obj));
          }
        }
        toNormal() {
          let arr = [];
          for (let i of this) {
            arr.push(i.toNormal());
          }
          return arr;
        }
        #ChecklistFactor = class {
          constructor (json) {
            this.title = json.title;
            this.children = new this.#ChecklistChildren(json.children);
          }
        
          toNormal () {
            let obj = {};
            obj.title = this.title;
            obj.children = this.children.toNormal();
            return obj;
          }
      
          #ChecklistChildren = class extends Array {
            constructor(arr) {
              super();
              for (let obj of arr) {
                this.push(new this.#ChecklistChildrenFactor(obj));
              }
            }
          
            toNormal() {
              let arr = [];
              for (let i of this) {
                arr.push(i.toNormal());
              }
              return arr;
            }
          
            #ChecklistChildrenFactor = class {
              constructor (json) {
                this.title = json.title;
                this.contents = json.contents;
              }
            
              toNormal () {
                let obj = {};
                obj.title = this.title;
                obj.contents = this.contents;
                return obj;
              }
            }
          }
        }
      }
    }
  }
  
  #CoreSetting = class {
    constructor (json) {
      this.coordinates = new this.#Coordinates(json.coordinates);
      this.period = new this.#Period(json.period);
      this.schedule = new this.#Schedule(json.schedule);
    }
  
    toNormal () {
      let obj;
      obj = {};
      obj.coordinates = this.coordinates.toNormal();
      obj.period = this.period.toNormal();
      obj.schedule = this.schedule.toNormal();
      return obj;
    }
  
    #Period = class extends Number {
      constructor(num) {
        super(num);
        this.value = num;
      }
      toNormal() {
        return Number(this.value);
      }
    }
    
    #Coordinates = class {
      constructor (json) {
        this.x = new this.#CoordinatesX(json.x);
        this.y = new this.#CoordinatesY(json.y);
        this.z = new this.#CoordinatesZ(json.z);
      }
    
      toNormal () {
        let obj = {};
        obj.x = this.x.toNormal();
        obj.y = this.y.toNormal();
        obj.z = this.z.toNormal();
        return obj;
      }
    
      #CoordinatesX = class extends Array {
        constructor(json) {
          super();
          this.push('M');
          this.push('B');
          this.push('P');
          this.M = json.M;
          this.B = json.B;
          this.P = json.P;
        }
        toNormal() {
          return {
            M: this.M,
            B: this.B,
            P: this.P
          };
        }
      }
      
      #CoordinatesY = class extends Array {
        constructor(json) {
          super();
          this.push("homeFurnishing");
          this.push("homeStyling");
          this.push("totalStyling");
          this.push("extraStyling");
          this.homeFurnishing = json.homeFurnishing;
          this.homeStyling = json.homeStyling;
          this.totalStyling = json.totalStyling;
          this.extraStyling = json.extraStyling;
        }
        toNormal() {
          return {
            homeFurnishing: this.homeFurnishing,
            homeStyling: this.homeStyling,
            totalStyling: this.totalStyling,
            extraStyling: this.extraStyling
          };
        }
      }
      
      #CoordinatesZ = class extends Array {
        constructor(json) {
          super();
          this.push("online");
          this.push("offline");
          this.online = json.online;
          this.offline = json.offline;
        }
        toNormal() {
          return {
            online: this.online,
            offline: this.offline,
          };
        }
      }
    }
    
    #Schedule = class extends Array {
      constructor(json) {
        super();
        for (let i of json) {
          this.push(new this.#ScheduleTask(i));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
      #ScheduleTask = class {
        constructor (json) {
          this.title = json.title;
          this.description = json.description;
          this.color = json.color;
          this.period = json.period;
          this.order = json.order;
        }
      
        toNormal () {
          let obj = {};
          obj.title = this.title;
          obj.description = this.description;
          obj.color = this.color;
          obj.period = this.period;
          obj.order = this.order;
          return obj;
        }
      }
    }
  }
}

class Services extends Array {
  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }
  get setting() {
    let arr = [];
    for (let i of this) {
      arr.push(i.setting);
    }
    return arr;
  }
  toMatrix() {
    let arr;
    arr = [];
    for (let i of this) {
      arr.push(i.toMatrix());
    }
    return arr;
  }
}

const withTools = function (Service) {
  return Service;
}

const withToolsArr = function (Services) {
  return Services;
}

module.exports = { ServiceMap, Service, Services, Tools: { withTools, withToolsArr } };
