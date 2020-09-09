const Genemongo = function () {

}

Genemongo.queryFilter = function (str) {
  return str.replace(/ &/g, ',').replace(/&/g, ',').replace(/=/g, '');
}

Genemongo.ajax = function (url, data) {
  let ampArray = [ ...data.matchAll(/&/g) ];
  let equArray = [ ...data.matchAll(/=/g) ];
  let totalArray = ampArray.concat(equArray);
  totalArray.sort(function (a, b) {
    return a.index - b.index;
  });
  let problems = [];
  for (let z = 0; z < totalArray.length - 1; z++) {
    if (totalArray[z][0] === '=' && totalArray[z+1][0] !== '&') {
      problems.push(totalArray[z+1]);
    } else if (totalArray[z][0] === '&' && totalArray[z+1][0] !== '=') {
      problems.push(totalArray[z]);
    }
  }
  if (totalArray[totalArray.length - 1][0] !== '=') {
    problems.push(totalArray[totalArray.length - 1]);
  }
  for (let i = 0; i < problems.length; i++) {
    if (problems[i][0] === '=') {
      data = data.slice(0, problems[i].index) + '_' + data.slice(problems[i].index + 1);
    } else if (problems[i][0] === '&') {
      data = data.slice(0, problems[i].index) + ',' + data.slice(problems[i].index + 1);
    }
  }
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
      if (xhr.readyState !== 4) { return }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  });
}

Genemongo.tagParsing = function (target) {
  let arr0, arr1;
  let result_arr0 = []
  let result_arr1 = []
  let result_obj = {}

  function simple(str) {
    let obj = {}
    for (let i of str.split("__split1__")) {
      obj[i.split("__split2__")[0]] = i.split("__split2__")[1];
    }
    return obj;
  }
  if (target.search(/__split4__/g) !== -1) {
    arr0 = target.split("__split4__");
    for (let a of arr0) {
      arr1 = a.split("__split3__");
      for (let b of arr1) {
        result_arr1.push(simple(b));
      }
      result_arr0.push(result_arr1);
    }
    return result_arr0;

  } else if (target.search(/__split3__/g) !== -1) {
    arr0 = target.split("__split3__");
    for (let a of arr0) {
      result_arr0.push(simple(a));
    }
    return result_arr0;

  } else {
    return simple(target)
  }
}

Genemongo.tagCoverting = function (obj) {
  let keyArr = Object.keys(obj);
  let str = '';
  for (let i of keyArr) {
    if (typeof obj[i] === "string") {
      str += i + "__split2__" + obj[i];
      str += "__split1__";
    } else if (typeof obj[i] === "number") {
      str += i + "__split2__" + String(obj[i]);
      str += "__split1__";
    }
  }
  str = str.slice(0, -10);
  return str;
}
