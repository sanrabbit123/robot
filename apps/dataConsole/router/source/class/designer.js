class Designers extends Array {

  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(i);
    }
  }

  pick(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i of this) {
      if (i.desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    return target;
  }

  getById(desid) {
    return this.pick(desid);
  }

  getByDesid(desid) {
    return this.pick(desid);
  }

  previous(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i = 0; i < this.length; i++) {
      if (this[i].desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    if (target !== 0) {
      return this[target - 1];
    } else {
      return this[this.length - 1];
    }
  }

  next(desid) {
    if (desid === undefined) {
      throw new Error("invaild input");
    }
    let target = null;
    for (let i = 0; i < this.length; i++) {
      if (this[i].desid === desid) {
        target = i;
        break;
      }
    }
    if (target === null) {
      throw new Error("invaild desid");
    }
    if (target !== this.length - 1) {
      return this[target + 1];
    } else {
      return this[0];
    }
  }

  setProjects(projects) {
    if (!Array.isArray(projects)) {
      throw new Error("invaild arguments");
    }
    for (let designer of this) {
      designer.projects = [];
      for (let project of projects) {
        if (designer.desid === project.desid) {
          designer.projects.push(project);
        }
      }
    }
  }

  setClients(clients) {
    if (!Array.isArray(clients)) {
      throw new Error("invaild arguments");
    }
    for (let designer of this) {
      if (designer.projects === undefined) {
        throw new Error("set Project first");
      }
      for (let project of designer.projects) {
        for (let client of clients) {
          if (project.cliid === client.cliid) {
            project.name = client.name;
          }
        }
      }
    }
  }

  search(q) {
    if (typeof q !== "string") {
      throw new Error("search input must be string");
    }
    if (q === '' || q === "전체" || q === '.' || q === "all" || q === ",") {
      return this;
    }
    let query, tempArr;
    if (/,/g.test(q)) {
      tempArr = q.split(',');
    } else if (/\//g.test(q)) {
      tempArr = q.split('/');
    } else if (/\./g.test(q)) {
      tempArr = q.split(' ');
    } else {
      tempArr = [ q ];
    }
    query = [];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].trim() !== '') {
        query.push(tempArr[i].trim());
      }
    }
    if (query.length === 0) {
      return this;
    }
    const newTong = [];
    for (let q of query) {
      for (let designer of this) {
        if ((new RegExp(q, "gi")).test(designer.designer) || (new RegExp(q, "gi")).test(designer.desid) || (new RegExp(q, "gi")).test(designer.information.phone) || (new RegExp(q, "gi")).test(designer.information.email)) {
          newTong.push(designer);
        }
      }
    }
    if (newTong.length === 0) {
      return this;
    }
    return new Designers(newTong);
  }

  getProjectsByDesid(desid) {
    if (typeof desid !== "string") {
      throw new Error("input must be string");
    }
    const designer = this.pick(desid);
    if (designer.projects === undefined) {
      throw new Error("set Project first");
    }
    return designer.projects;
  }

  returnDoingDesigners() {
    let arr = [];
    if (this.length === 0) {
      throw new Error("no designer error");
    }
    if (this[0].projects === undefined) {
      throw new Error("set projects first");
    }
    for (let designer of this) {
      if (designer.projects.length > 0) {
        arr.push(designer);
      }
    }
    return new Designers(arr);
  }

  update(queryArr) {
    if (!Array.isArray(queryArr)) {
      throw new Error("must be query arr");
    }
    if (queryArr.length !== 2) {
      throw new Error("must be query arr");
    }
    const [ whereQuery, updateQuery ] = queryArr;
    if (typeof whereQuery !== "object" || typeof updateQuery !== "object") {
      throw new Error("invaild query");
    }
    if (whereQuery.desid === undefined) {
      throw new Error("invaild whereQuery");
    }
    let tempArr, targetObj;
    for (let position in updateQuery) {
      tempArr = position.split('.');
      targetObj = this.pick(whereQuery.desid);
      for (let i = 0; i < tempArr.length - 1; i++) {
        targetObj = targetObj[tempArr[i]];
      }
      targetObj[tempArr[tempArr.length - 1]] = updateQuery[position];
    }
  }

}

module.exports = Designers;
