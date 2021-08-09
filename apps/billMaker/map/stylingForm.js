module.exports = {
  collection: "stylingForm",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      structure: {
        id: "",
        date: new Date(),
        name: "",
        proid: "",
        client: {
          cliid: "",
          requestNumber: 0
        }
      },
      find: (fresh) => { return { proid: fresh.proid } }
    };
    const { StylingForm } = alive(mother);
    tong = [];
    for (let json of updateQueryArr) {
      fresh = new StylingForm(null);
      fresh.make(json);
      findQuery = map.find(fresh);
      insertEvent = async function (fresh) {}
      tong.push({ fresh, findQuery, insertEvent });
    }
    return tong;
  },
  alive: function (mother) {
    class StylingForm {
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.id = json.id;
            this.date = json.date;
            this.name = json.name;
            this.proid = json.proid;
            this.client = json.client;
          }
        }
      }
      make(json) {
        this.id = json.id;
        this.date = new Date();
        this.name = json.name;
        this.proid = json.proid;
        this.client = {};
        this.client.cliid = json.cliid;
        this.client.requestNumber = json.requestNumber;
      }
    }
    return { StylingForm };
  },
  wrap: function (alive, jsonArr, mother) {
    const { StylingForm } = alive(mother);
    class StylingForms extends Array {
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.id === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new StylingForms();
    for (let json of jsonArr) {
      arr.push(new StylingForm(json));
    }
    return arr;
  }
}
