class MaxrixFactor extends Array {
  convertString() {
    const length = 3;
    let tempArr, tempString, result;
    result = [];
    for (let i = 0; i < length; i++) {
      tempArr = [];
      tempString = '';
      for (let arr of this) {
        tempArr.push(arr[i]);
      }
      tempString = tempArr.join('\n');
      result.push(tempString);
    }
    return result;
  }
}

class Maxrix extends Array {
  convertString() {
    let result = [];
    for (let i of this) {
      result.push(i.convertString());
    }
    return result;
  }
}

class GhostCompositionContents extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(i);
    }
  }
}

class GhostComposition {
  constructor(obj) {
    this.contents = new GhostCompositionContents(obj.contents);
  }
}

class GhostClient {
  constructor(obj) {
    this.name = obj.name;
    this.composition = new GhostComposition(obj.composition);
  }
  contents() {
    return this.composition.contents;
  }
}

class GhostDesigner {
  constructor(obj) {
    this.name = obj.name;
    this.composition = new GhostComposition(obj.composition);
  }
  contents() {
    return this.composition.contents;
  }
}

class GhostProcessFactorDetail {
  constructor(obj) {
    if (obj.client !== null) {
      this.client = new GhostClient(obj.client);
    } else {
      this.client = null;
    }
    if (obj.designer !== null) {
      this.designer = new GhostDesigner(obj.designer);
    } else {
      this.designer = null;
    }
  }

  flatDeath() {
    let arr = [];
    if (this.client !== null) {
      for (let i of this.client.contents()) {
        arr.push(this.client.name + '(C)_' + i);
      }
    }
    if (this.designer !== null) {
      for (let i of this.designer.contents()) {
        arr.push(this.designer.name + '(D)_' + i);
      }
    }
    return arr;
  }

  flat() {
    return this.flatDeath();
  }

  clientMatrix() {
    if (this.client === null) {
      return [];
    } else {
      let arr = [];
      let contents = this.client.composition.contents;
      let temp;
      for (let i = 0; i < contents.length; i++) {
        temp = [];
        temp.push(i === 0 ? this.client.name : '');
        temp.push(contents[i]);
        arr.push(temp);
      }
      arr.push([ '', '' ]);
      return arr;
    }
  }
  designerMatrix() {
    if (this.designer === null) {
      return [];
    } else {
      let arr = [];
      let contents = this.designer.composition.contents;
      let temp;
      for (let i = 0; i < contents.length; i++) {
        temp = [];
        temp.push(i === 0 ? this.designer.name : '');
        temp.push(contents[i]);
        arr.push(temp);
      }
      arr.push([ '', '' ]);
      return arr;
    }
  }
}

class GhostProcessDetail extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new GhostProcessFactorDetail(i));
    }
  }
  flatDeath() {
    let arr = [];
    for (let i of this) {
      for (let j of i.flat()) {
        arr.push(j);
      }
    }
    return arr;
  }
  flat() {
    return this.flatDeath();
  }
  clientMatrix() {
    let arr = [];
    let temp;
    for (let i of this) {
      temp = i.clientMatrix();
      for (let j of temp) {
        arr.push(j);
      }
    }
    return arr;
  }
  designerMatrix() {
    let arr = [];
    let temp;
    for (let i of this) {
      temp = i.designerMatrix();
      for (let j of temp) {
        arr.push(j);
      }
    }
    return arr;
  }
}

class GhostProcessFactor {
  constructor(obj) {
    this.name = obj.name;
    this.process = new GhostProcessDetail(obj.process);
  }
  flat() {
    return this.process.flatDeath();
  }
  clientMatrix() {
    let arr = new MaxrixFactor;
    let temp;
    let matrix = this.process.clientMatrix();
    for (let i = 0; i < matrix.length; i++) {
      temp = [];
      temp.push(i === 0 ? this.name : '');
      for (let j = 0; j < matrix[i].length; j++) {
        temp.push(matrix[i][j]);
      }
      arr.push(temp);
    }
    return arr;
  }
  designerMatrix() {
    let arr = new MaxrixFactor;
    let temp;
    let matrix = this.process.designerMatrix();
    for (let i = 0; i < matrix.length; i++) {
      temp = [];
      temp.push(i === 0 ? this.name : '');
      for (let j = 0; j < matrix[i].length; j++) {
        temp.push(matrix[i][j]);
      }
      arr.push(temp);
    }
    return arr;
  }
}

class GhostProcess extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new GhostProcessFactor(i));
    }
  }
  flatDeath() {
    let arr = [];
    for (let i of this) {
      for (let j of i.flat()) {
        arr.push(j);
      }
    }
    return arr;
  }
  flat() {
    return this.flatDeath();
  }
  clientMatrix() {
    let arr = new Maxrix();
    for (let i of this) {
      arr.push(i.clientMatrix());
    }
    return arr;
  }
  designerMatrix() {
    let arr = new Maxrix();
    for (let i of this) {
      arr.push(i.designerMatrix());
    }
    return arr;
  }
}

class GhostMap {
  constructor(obj) {
    this.name = obj.name;
    this.process = new GhostProcess(obj.process);
  }
  flat() {
    return this.process.flatDeath();
  }
  clientMatrix() {
    return this.process.clientMatrix();
  }
  designerMatrix() {
    return this.process.designerMatrix();
  }
  matrix() {
    let arr = [];
    arr.push(this.process.clientMatrix());
    arr.push(this.process.designerMatrix());
    arr.client = arr[0];
    arr.designer = arr[1];
    return arr;
  }
}
