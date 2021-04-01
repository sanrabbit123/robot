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
}

class GhostDesigner {
  constructor(obj) {
    this.name = obj.name;
    this.composition = new GhostComposition(obj.composition);
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
}

class GhostProcessDetail extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new GhostProcessFactorDetail(i));
    }
  }
}

class GhostProcessFactor {
  constructor(obj) {
    this.name = obj.name;
    this.process = new GhostProcessDetail(obj.process);
  }
}

class GhostProcess extends Array {
  constructor(arr) {
    super();
    for (let i of arr) {
      this.push(new GhostProcessFactor(i));
    }
  }
}

class GhostMap {
  constructor(obj) {
    this.name = obj.name;
    this.process = new GhostProcess(obj.process);
  }
}
