module.exports = {
  collection: "designerForm",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      structure: {
        id: "",
        date: new Date(),
        name: "",
        aspid: "",
      },
      find: (fresh) => { return { aspid: fresh.aspid } }
    };
    const { DesignerForm } = alive(mother);
    tong = [];
    for (let json of updateQueryArr) {
      fresh = new DesignerForm(null);
      fresh.make(json);
      findQuery = map.find(fresh);
      insertEvent = async function (fresh) {}
      tong.push({ fresh, findQuery, insertEvent });
    }
    return tong;
  },
  alive: function (mother) {
    class DesignerForm {
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.id = json.id;
            this.date = json.date;
            this.name = json.name;
            this.aspid = json.aspid;
          }
        }
      }
      make(json) {
        this.id = json.id;
        this.date = new Date();
        this.name = json.name;
        this.aspid = json.aspid;
      }
    }
    return { DesignerForm };
  },
  wrap: function (alive, jsonArr, mother) {
    const { DesignerForm } = alive(mother);
    class DesignerForms extends Array {
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
    arr = new DesignerForms();
    for (let json of jsonArr) {
      arr.push(new DesignerForm(json));
    }
    return arr;
  }
}
