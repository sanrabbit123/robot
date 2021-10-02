module.exports = {
  collection: "apartInfo",
  main: function () {
    return {
      apaid: "",
      name: "",
      date: new Date(),
      created: new Date(1800, 0, 1),
      address: "",
      cliid: [],
      numbers: {
        households: null,
        buildings: null
      },
      floor: {
        min: null,
        max: null
      },
      ratio: {
        floorArea: null,
        buildingCover: null,
      },
      kinds: [],
      link: "",
    };
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "kinds" || subject === "kind") {
      dummy = {
        name: "",
        count: null,
        area: {
          supply: null,
          dedicated: null,
          ratio: null,
        },
        composition: {
          rooms: null,
          bathrooms: null,
        },
      };
    }
    return dummy;
  },
  alive: function (mother) {

    class TypeComposition {
      constructor(json) {
        this.rooms = json.rooms;
        this.bathrooms = json.bathrooms;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.rooms = this.rooms;
        obj.bathrooms = this.bathrooms;
        return obj;
      }
    }

    class TypeArea {
      constructor(json) {
        this.supply = json.supply;
        this.dedicated = json.dedicated;
        this.ratio = json.ratio;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.supply = this.supply;
        obj.dedicated = this.dedicated;
        obj.ratio = this.ratio;
        return obj;
      }
    }

    class Type {
      constructor(json) {
        this.name = json.name;
        this.count = json.count;
        this.area = new TypeArea(json.area);
        this.composition = new TypeComposition(json.composition);
      }
      toNormal() {
        let obj = {};
        obj.name = this.name;
        obj.count = this.count;
        obj.area = this.area.toNormal();
        obj.composition = this.composition.toNormal();
        return obj;
      }
    }

    class Kinds extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Type(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class Ratio {
      constructor(json) {
        this.floorArea = json.floorArea;
        this.buildingCover = json.buildingCover;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.floorArea = this.floorArea;
        obj.buildingCover = this.buildingCover;
        return obj;
      }
    }

    class Floor {
      constructor(json) {
        this.min = json.min;
        this.max = json.max;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.min = this.min;
        obj.max = this.max;
        return obj;
      }
    }

    class Numbers {
      constructor(json) {
        this.households = json.households;
        this.buildings = json.buildings;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.households = this.households;
        obj.buildings = this.buildings;
        return obj;
      }
    }

    class CliidArr extends Array {
      constructor(jsonArr) {
        super();
        for (let cliid of jsonArr) {
          this.push(cliid);
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

    class Apartment {
      constructor(json) {
        this.apaid = json.apaid;
        this.name = json.name;
        this.date = json.date;
        this.created = json.created;
        this.address = json.address;
        this.cliid = new CliidArr(json.cliid);
        this.numbers = new Numbers(json.numbers);
        this.floor = new Floor(json.floor);
        this.ratio = new Ratio(json.ratio);
        this.kinds = new Kinds(json.kinds);
        this.link = json.link;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.apaid = this.apaid;
        obj.name = this.name;
        obj.date = this.date;
        obj.created = this.created;
        obj.address = this.address;
        obj.cliid = this.cliid.toNormal();
        obj.numbers = this.numbers.toNormal();
        obj.floor = this.floor.toNormal();
        obj.ratio = this.ratio.toNormal();
        obj.kinds = this.kinds.toNormal();
        obj.link = this.link;
        return obj;
      }
    }

    return { Apartment };
  },
  wrap: function (alive, jsonArr, mother) {
    const { Apartment } = alive(mother);
    class Apartments extends Array {
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.apaid === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new Apartments();
    for (let json of jsonArr) {
      arr.push(new Apartment(json));
    }
    return arr;
  }
}
