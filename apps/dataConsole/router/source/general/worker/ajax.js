const ajaxPromise = function (data, url) {
  if (data === undefined && url === undefined) {
    throw new Error("must be arguments (data, url)");
  } else if (data !== undefined && url === undefined) {
    url = data;
    data = "";
  }
  let dataString;
  if (typeof data === "object") {
    dataString = "";
    for (let i in data) {
      dataString += i.replace(/[\=\&]/g, '');
      dataString += '=';
      if (typeof data[i] === "object") {
        if (data[i] instanceof Date) {
          dataString += JSON.stringify(data[i]).replace(/^\"/g, '').replace(/\"$/g, '');
        } else {
          dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '');
        }
      } else {
        dataString += String(data[i]).replace(/[\=\&]/g, '');
      }
      dataString += '&';
    }
    data = dataString.slice(0, -1);
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
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
    if (typeof data === "string") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.send(data);
  });
}

const ajaxJson = function (data, url, option = { equal: null }) {
  if (typeof option !== "object") {
    throw new Error("invaild input");
  }
  return new Promise(function (resolve, reject) {
    ajaxPromise(data, url).then(function (jsonString) {
      let json, filtered, temp, tempFunc;
      try {
        temp = jsonString.trim();
        if (temp[0] !== '{' && temp[0] !== '[') {
          reject("server must send json");
        } else {
          if (option.equal !== undefined && option.equal !== null) {
            filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
            tempFunc = new Function("const obj = " + filtered + "; return obj;");
            json = tempFunc();
          } else {
            json = JSON.parse(jsonString);
          }
          resolve(json);
        }
      } catch (e) {
        reject(e);
      }
    }).catch(function (e) {
      reject(e);
    });
  });
}

const equalJson = function (jsonString) {
  const equal = function (jsonString) {
    if (typeof jsonString === "object") {
      jsonString = JSON.stringify(jsonString);
    }
    if (typeof jsonString !== "string") {
      jsonString = String(jsonString);
    }
    let filtered;
    filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
    filtered = filtered.replace(/nbsp\;/g, "&nbsp;");
    filtered = filtered.replace(/\&\&nbsp\;/g, "&nbsp;");
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    const json = tempFunc();
    let temp, boo;
    if (typeof json === "object") {
      for (let i in json) {
        if (typeof json[i] === "string") {
          if (/^[\{\[]/.test(json[i].trim()) && /[\}\]]$/.test(json[i].trim())) {
            try {
              temp = JSON.parse(json[i]);
              boo = true;
            } catch (e) {
              boo = false;
            }
            if (boo) {
              json[i] = equal(json[i]);
            }
          }
        }
      }
      return json;
    } else {
      return jsonString;
    }
  }
  return equal(jsonString);
}

const main = async function () {
  try {
    onmessage = async function (e) {
      try {
        if (e.data.data === undefined || e.data.url === undefined || e.data.number === undefined) {
          throw new Error("invalid post message");
        }
        const { data, url, number } = equalJson(JSON.stringify(e.data));
        const response = await ajaxJson(data, url, { equal: true }); 
        postMessage(JSON.stringify({ response, number }));
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

main().catch((err) => { console.log(err); });
