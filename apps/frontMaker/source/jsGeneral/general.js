const GeneralJs = function () {
  this.map = /<%generalMap%>/;
  this.loader = null;
  this.navigator = null;
  this.footer = null;
  this.talkIcon = null;
}

GeneralJs.sourceLink = "/list_image/general";

GeneralJs.universalLink = "/list_image/universal";

GeneralJs.events = {};

GeneralJs.stacks = {};

GeneralJs.timeouts = {};

GeneralJs.boos = {
  scroll: true,
};

GeneralJs.colorChip = {
  white: "#ffffff",
  whiteIcon: "#ffffff",
  gray0: "#f7f7f7",
  gray1: "#f2f2f2",
  gray2: "#ececec",
  gray3: "#dddddd",
  gray4: "#cccccc",
  gray5: "#aaaaaa",
  gradientGray: "linear-gradient(256deg, rgba(20, 20, 20, 0.65) 0%, rgba(28, 28, 28, 0.7) 100%)",
  gradientSilver: "linear-gradient(256deg, rgba(30, 30, 30, 0.65) 0%, rgba(38, 38, 38, 0.7) 100%)",
  grayDeactive: "#c2c2c2",
  deactive: "#bbbbbb",
  shadow: "#808080",
  darkShadow: "#606060",
  darkDarkShadow: "#505050",
  black: "#404040",
  darkBlack: "#303030",
  realBlack: "#202020",
  green: "#2fa678",
  darkGreen: "#009b6a",
  whiteGreen: "#bedacb",
  gradientGreen: "linear-gradient(222deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen2: "linear-gradient(222deg, rgba(89, 175, 137, 0.8) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen3: "linear-gradient(172deg, rgba(89, 175, 137, 0.9) 5%, rgba(0, 156, 106, 0.9) 100%)",
  gradientGreen4: "linear-gradient(222deg, rgba(89, 175, 137, 1) 5%, rgba(0, 156, 106, 1) 100%)",
  red: "#ff5f57",
  yellow: "#ffbd3d",
  purple: "#ba7dd7",
};

GeneralJs.colorParsing = function (str) {
  if (typeof str === "string") {
    if (/^\#/.test(str) && str.length === 7) {
      str = str.slice(1);
    }
    if (str.length !== 6 && str.replace(/[^0-9a-f]/gi, '') === '') {
      throw new Error("invaild input");
    }
    let colorArr;
    colorArr = [ str.slice(0, 2), str.slice(2, 4), str.slice(4) ];
    colorArr = colorArr.map((s) => {
      let num;
      num = 0;
      if (/[a-z]/gi.test(s[1])) {
        num += s[1].charCodeAt(0) - 97 + 10;
      } else {
        num += Number(s[1]);
      }
      if (/[a-z]/gi.test(s[0])) {
        num += (s[0].charCodeAt(0) - 97 + 10) * 16;
      } else {
        num += (Number(s[0])) * 16;
      }
      return num;
    });
    return colorArr;
  } else if (Array.isArray(str)) {
    if (str.length !== 3) {
      throw new Error("invaild input");
    }
    if (typeof str[0] !== "number" || typeof str[1] !== "number" || typeof str[2] !== "number") {
      throw new Error("invaild input");
    }
    if (Number.isNaN(str[0]) || Number.isNaN(str[1]) || Number.isNaN(str[2])) {
      throw new Error("invaild input");
    }
    const convertNum = (num) => {
      const convertStr = (n) => {
        if (n < 10) {
          return String(n);
        } else {
          return String.fromCharCode(n + 87);
        }
      }
      let first, second;
      second = num % 16;
      first = (num - second) / 16;
      return convertStr(first) + convertStr(second);
    }
    str = str.map(convertNum);
    return '#' + str.join('');
  } else {
    throw new Error("invaild input");
  }
}

GeneralJs.mimeTypes = { aac: "audio/aac", abw: "application/x-abiword", arc: "application/octet-stream", avi: "video/x-msvideo", azw: "application/vnd.amazon.ebook", bin: "application/octet-stream", bz: "application/x-bzip", bz2: "application/x-bzip2", csh: "application/x-csh", css: "text/css", csv: "text/csv", doc: "application/msword", epub: "application/epub+zip", gif: "image/gif", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jar: "application/java-archive", jpeg: "image/jpeg", jpg: "image/jpeg", mjs: "application/js", js: "application/js", json: "application/json", mid: "audio/midi", midi: "audio/midi", mpeg: "video/mpeg", mpkg: "application/vnd.apple.installer+xml", odp: "application/vnd.oasis.opendocument.presentation", ods: "application/vnd.oasis.opendocument.spreadsheet", odt: "application/vnd.oasis.opendocument.text", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", pdf: "application/pdf", ppt: "application/vnd.ms-powerpoint", rar: "application/x-rar-compressed", rtf: "application/rtf", sh: "application/x-sh", svg: "image/svg+xml", swf: "application/x-shockwave-flash", tar: "application/x-tar", tif: "image/tiff", tiff: "image/tiff", ttf: "application/x-font-ttf", vsd: "application/vnd.visio", wav: "audio/x-wav", weba: "audio/webm", webm: "video/webm", webp: "image/webp", woff: "application/x-font-woff", xhtml: "application/xhtml+xml", xls: "application/vnd.ms-excel", xml: "application/xml", xul: "application/vnd.mozilla.xul+xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", "7z": "application/x-7z-compressed" };

GeneralJs.postWall = function (xhr) {
  if (!(xhr instanceof XMLHttpRequest)) {
    throw new Error("invaild input");
  }
  const target = "879617562858";
  let res = '';
  for (let i = target.length - 1; i > -1; i--) {
    if (i % 2 === 1) {
      res += String.fromCharCode(Number(target.slice(((i - 1) * 1), ((i + 1) * 1))[1] + target.slice(((i - 1) * 1), ((i + 1) * 1))[0]));
    }
  }
  xhr.setRequestHeader("Authorization", "Basic " + SvgTong["___" + res + "___"]);
}

GeneralJs.ajax = function (data, url, callback) {
  if (data === undefined && url === undefined && callback === undefined) {
    throw new Error("must be arguments (data, url, callback)");
  } else if (data !== undefined && typeof url === "function" && callback === undefined) {
    callback = url;
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
        dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '');
      } else {
        dataString += String(data[i]).replace(/[\=\&]/g, '');
      }
      dataString += '&';
    }
    data = dataString.slice(0, -1);
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.onload = function () {
    if (xhr.readyState !== 4) { return }
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = xhr.response;
      if (!/Exception occur/g.test(response)) {
        callback(response);
      } else {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      }
    } else if (xhr.status >= 500) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if (xhr.status >= 402 && xhr.status <= 420) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if(xhr.status === 400 || xhr.status === 401) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    }
  }
  xhr.onerror = function () {
    alert("오류가 발생하였습니다. 다시 시도해주세요!");
    window.location.reload();
  }
  if (typeof data === "string") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  xhr.send(data);
}

GeneralJs.ajaxPromise = function (data, url) {
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
        dataString += JSON.stringify(data[i]).replace(/[\=\&]/g, '');
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

GeneralJs.ajaxForm = function (data, url) {
  if (data === undefined && url === undefined) {
    throw new Error("must be arguments (data, url)");
  } else if (data !== undefined && url === undefined) {
    url = data;
    data = "";
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
    xhr.send(data);
  });
}

GeneralJs.ajaxJson = function (data, url, option = { equal: null }) {
  if (typeof option !== "object") {
    throw new Error("invaild input");
  }
  return new Promise(function (resolve, reject) {
    GeneralJs.ajaxPromise(data, url).then(function (jsonString) {
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

GeneralJs.request = function (url, callback) {
  if (url === undefined && callback === undefined) {
    throw new Error("must be arguments (url, callback)");
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.readyState !== 4) { return; }
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = xhr.response;
      if (!/Exception occur/g.test(response)) {
        callback(response);
      } else {
        alert("오류가 발생하였습니다. 다시 시도해주세요!");
        window.location.reload();
      }
    } else if (xhr.status >= 500) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if (xhr.status >= 402 && xhr.status <= 420) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    } else if(xhr.status === 400 || xhr.status === 401) {
      alert("오류가 발생하였습니다. 다시 시도해주세요!");
      window.location.reload();
    }
  }
  xhr.onerror = function () {
    alert("오류가 발생하였습니다. 다시 시도해주세요!");
    window.location.reload();
  }
  xhr.send();
}

GeneralJs.requestPromise = function (url) {
  if (url === undefined) {
    throw new Error("must be arguments (url)");
  }
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
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
    xhr.send();
  });
}

GeneralJs.downloadFile = function (url, forceName = null) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
     if (xhr.readyState !== 4) { return; }
     if (xhr.status >= 200 && xhr.status < 300) {
       let fileName, fileType, blob, a, timeoutId;
       let execSearch;
       fileName = url.split("/")[url.split("/").length - 1];
       execSearch = /\.[^\.]+$/.exec(fileName);
       if (execSearch === null) {
         reject("invaild url");
         return;
       }
       fileType = GeneralJs.mimeTypes[execSearch[0].replace(/\./g, '').toLowerCase()];
       if (fileType === undefined) {
         fileType = "application/octet-stream";
       }
       if (forceName !== null && typeof forceName === "string") {
         fileName = forceName.replace(/\.[^\.]+$/, '') + '.' + execSearch[0].replace(/\./g, '').toLowerCase();
       }
       blob = new Blob([ xhr.response ], { type: fileType });
       a = document.createElement('A');
       a.download = fileName;
       a.href = URL.createObjectURL(blob);
       a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
       a.style.display = "none";
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       resolve(fileName);
       timeoutId = setTimeout(function() {
         URL.revokeObjectURL(a.href);
         clearTimeout(timeoutId);
       }, 1500);
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
    xhr.send();
  });
}

GeneralJs.formtoAjax = function (id) {
  let dom = document.getElementById(id);
  let kids = dom.children;
  let result = '';
  for (let i = 0; i < kids.length; i++) {
    result += kids[i].getAttribute("name").replace(/[\=\&]/g, '') + '=' + kids[i].getAttribute("value").replace(/[\=\&]/g, '') + '&';
  }
  result = result.slice(0, -1);
  return result;
}

GeneralJs.nodes = {
  div: document.createElement("DIV"),
  img: document.createElement("IMG"),
  input: document.createElement("INPUT"),
  textarea: document.createElement("TEXTAREA"),
  a: document.createElement('A'),
  label: document.createElement('LABEL'),
  iframe: document.createElement('IFRAME'),
  aside: document.createElement('ASIDE'),
  video: document.createElement('VIDEO'),
  source: document.createElement('SOURCE'),
}

GeneralJs.scrollTo = function (from, valueOrTo, visualSpecific = 0) {
  if (from === undefined || valueOrTo === undefined || typeof visualSpecific !== "number") {
    throw new Error("invaild input");
  }
  if (typeof valueOrTo !== "number") {
    if (typeof valueOrTo === "object") {
      valueOrTo = from.scrollTop + valueOrTo.getBoundingClientRect().top;
    } else {
      throw new Error("invaild input");
    }
  }
  from.scrollTop = valueOrTo - visualSpecific;
}

GeneralJs.createNode = function (mode, source, style, mother = null) {
  /* append style object properties */
  /*
  style = {
    mode: "div",
    source: "",
    mother: base,
    text: "안녕하세요!",
    class: [ "hoverdefault" ],
    id: "aaa",
    attribute: [
      { index: "b" },
    ],
    events: [
      { type: "click", event: new Function() }
    ],
    style: {},
    children: [
      ...nodeObject
    ]
  }
  */
  let dom_clone, targetStyle, ea, ratio, temp, boldObject, underObject, children;
  children = [];
  if (mode === undefined && source === undefined && style === undefined) {
    throw new Error("arguments must be mode(dom node name), style");
    return null;
  } else {
    if (mode !== undefined && typeof mode === "object") {
      style = mode;
      mode = "div";
      if (typeof source === "object" && source.nodeName !== undefined) {
        mother = source;
      } else {
        mother = null;
      }
      source = null;
    } else if (typeof mode === "string" && typeof source === "object") {
      mode = mode;
      if (typeof style === "object" && style.nodeName !== undefined) {
        mother = style;
        style = source;
        source = null;
      } else {
        style = source;
        mother = null;
        source = null;
      }
    } else if (typeof mode === "string" && typeof source === "string" && typeof style === "object") {
      mode = mode;
      style = style;
      source = source;
      mother = mother;
    } else {
      throw new Error("arguments must be mode(dom node name), svg source string, style object, dom mother");
      return null;
    }
  }
  if (Array.isArray(style)) {
    throw new Error("argument must be object, not array");
  }
  if (style.mode !== undefined) {
    if (typeof style.mode === "string") {
      mode = style.mode;
    }
    delete style.mode;
  }
  if (style.source !== undefined) {
    if (typeof style.source === "string") {
      source = style.source;
    }
    delete style.source;
  }
  if (style.mother !== undefined) {
    if (typeof style.mother === "object" && style.mother.nodeName !== undefined) {
      mother = style.mother;
    }
    delete style.mother;
  }
  if (style.children !== undefined) {
    if (Array.isArray(style.children)) {
      children = style.children;
    }
    delete style.children;
  }
  if (!/svg/gi.test(mode)) {
    if (GeneralJs.nodes[mode] === undefined || typeof style !== "object") {
      throw new Error("invaild arguments");
      return null;
    } else {
      dom_clone = GeneralJs.nodes[mode].cloneNode(true);
      if (style.text !== undefined) {
        if ((typeof style.text === "string" || Array.isArray(style.text)) && dom_clone.textContent !== undefined) {
          if (Array.isArray(style.text)) {
            style.text = style.text.join("<br>");
          }
          if (/\<b\%/gi.test(style.text)) {
            if (style.bold === undefined || typeof style.bold !== "object") {
              throw new Error("bold option needs");
            } else {
              boldObject = "";
              for (let b in style.bold) {
                if (b === "fontSize") {
                  boldObject += "font-size";
                } else if (b === "fontWeight") {
                  boldObject += "font-weight";
                } else {
                  boldObject += b;
                }
                boldObject += ':';
                boldObject += style.bold[b];
                boldObject += ';';
              }
              style.text = style.text.replace(/\<b\%/gi, "<b style=\"" + boldObject + "\">");
              style.text = style.text.replace(/\%b\>/gi, "</b>");
            }
          }
          if (/\<u\%/gi.test(style.text)) {
            if (style.under === undefined || typeof style.under !== "object") {
              throw new Error("under option needs");
            } else {
              underObject = "";
              for (let b in style.under) {
                if (b === "fontSize") {
                  underObject += "font-size";
                } else if (b === "fontWeight") {
                  underObject += "font-weight";
                } else {
                  underObject += b;
                }
                underObject += ':';
                underObject += style.under[b];
                underObject += ';';
              }
              style.text = style.text.replace(/\<u\%/gi, "<b style=\"" + underObject + "\">");
              style.text = style.text.replace(/\%u\>/gi, "</b>");
            }
          }
          if (mode !== "textarea") {
            dom_clone.insertAdjacentHTML("beforeend", style.text.replace(/\n/g, "<br>"));
          } else {
            dom_clone.textContent = style.text.replace(/\<br\>/g, "\n");
          }
        }
        delete style.text;
      }
      if (style.class !== undefined) {
        if (Array.isArray(style.class)) {
          for (let c of style.class) {
            dom_clone.classList.add(c);
          }
        }
        delete style.class;
      }
      if (style.id !== undefined) {
        if (typeof style.id === "string" && dom_clone.id !== undefined) {
          dom_clone.id = style.id;
        }
        delete style.id;
      }
      if (style.attribute !== undefined) {
        if (Array.isArray(style.attribute)) {
          for (let a of style.attribute) {
            if (typeof a === "object") {
              for (let key in a) {
                dom_clone.setAttribute(key, a[key]);
              }
            }
          }
        }
        delete style.attribute;
      }
      if (style.style !== undefined) {
        if (typeof style.style === "object") {
          targetStyle = style.style;
        } else {
          throw new Error("invaild arguments");
        }
      } else {
        targetStyle = style;
      }
      targetStyle.wordSpacing = String(-1) + "px";
      for (let i in targetStyle) {
        dom_clone.style[i] = targetStyle[i];
      }
      if (style.events !== undefined && Array.isArray(style.events)) {
        for (let obj of style.events) {
          if (Array.isArray(obj.type)) {
            for (let str of obj.type) {
              dom_clone.addEventListener(str, obj.event);
            }
          } else if (typeof obj.type === "string") {
            dom_clone.addEventListener(obj.type, obj.event);
          } else {
            throw new Error("invaild type");
          }
        }
      }
      if (mother !== null && mother.appendChild.constructor === Function) {
        mother.appendChild(dom_clone);
      }
      if (Array.isArray(children)) {
        if (children.length > 0) {
          for (let childObject of children) {
            childObject.mother = dom_clone;
            GeneralJs.createNode(childObject);
          }
        }
      }
      return dom_clone;
    }
  } else {
    if (typeof source === "string" && typeof style === "object") {
      dom_clone = SvgTong.stringParsing(source);
      if (style.text !== undefined) {
        delete style.text;
      }
      if (style.class !== undefined) {
        if (Array.isArray(style.class)) {
          for (let c of style.class) {
            dom_clone.classList.add(c);
          }
        }
        delete style.class;
      }
      if (style.id !== undefined) {
        if (typeof style.id === "string" && dom_clone.id !== undefined) {
          dom_clone.id = style.id;
        }
        delete style.id;
      }
      if (style.attribute !== undefined) {
        if (Array.isArray(style.attribute)) {
          for (let a of style.attribute) {
            if (typeof a === "object") {
              for (let key in a) {
                dom_clone.setAttribute(key, a[key]);
              }
            }
          }
        }
        delete style.attribute;
      }
      if (style.style !== undefined) {
        if (typeof style.style === "object") {
          targetStyle = style.style;
        } else {
          throw new Error("invaild arguments");
        }
      } else {
        targetStyle = style;
      }
      if ((targetStyle.width === "auto" || targetStyle.width === undefined) && targetStyle.height !== undefined) {
        ratio = SvgTong.getRatio(dom_clone);
        ea = targetStyle.height.replace(/[\-\.0-9]/gi, '');
        temp = Number(targetStyle.height.replace(/[^\-\.0-9]/gi, ''));
        targetStyle.width = String(temp * ratio) + ea;
      }
      if ((targetStyle.height === "auto" || targetStyle.height === undefined) && targetStyle.width !== undefined) {
        ratio = SvgTong.getRatio(dom_clone);
        ea = targetStyle.width.replace(/[\-\.0-9]/gi, '');
        temp = Number(targetStyle.width.replace(/[^\-\.0-9]/gi, ''));
        targetStyle.height = String(temp / ratio) + ea;
      }
      for (let i in targetStyle) {
        dom_clone.style[i] = targetStyle[i];
      }
      if (style.events !== undefined && Array.isArray(style.events)) {
        for (let obj of style.events) {
          if (Array.isArray(obj.type)) {
            for (let str of obj.type) {
              dom_clone.addEventListener(str, obj.event);
            }
          } else if (typeof obj.type === "string") {
            dom_clone.addEventListener(obj.type, obj.event);
          } else {
            throw new Error("invaild type");
          }
        }
      }
      if (mother !== null && mother.appendChild.constructor === Function) {
        mother.appendChild(dom_clone);
      }
      return dom_clone;
    } else {
      throw new Error("invaild arguments");
      return null;
    }
  }
}

GeneralJs.createElement = GeneralJs.createNode;

GeneralJs.create = GeneralJs.createNode;

GeneralJs.createFragment = function () {
  return document.createDocumentFragment();
}

GeneralJs.createNodes = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("arguments must be array");
  } else {
    let result, pastNode;

    pastNode = null;
    result = [];
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "object") {
        throw new Error("arguments must be [ object, object, object... ]");
      } else {
        if (arr[i].mother === undefined) {
          throw new Error("mother must be exist");
        } else {
          if (typeof arr[i].mother === "string") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (/ch/gi.test(arr[i].mother)) {
              arr[i].mother = pastNode;
            } else {
              throw new Error("invaild mother operation");
            }
          } else if (typeof arr[i].mother === "number") {
            if (pastNode === null) {
              throw new Error("first mother can not be chain");
            }
            if (arr[i].mother >= 0) {
              if (result[arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[arr[i].mother];
            } else {
              if (result[i + arr[i].mother] === undefined) {
                throw new Error("index out error");
              }
              arr[i].mother = result[i + arr[i].mother];
            }
          }
          pastNode = GeneralJs.createNode(arr[i]);
          result.push(pastNode);
        }
      }
    }

    return result;
  }
}

GeneralJs.createElements = GeneralJs.createNodes;

GeneralJs.withOut = function (percent, num, ea) {
  if (typeof percent === "number" && typeof num !== undefined && typeof ea === "string") {
    return ("calc(" + String(percent) + "% - " + String(num) + ea + ")");
  } else if (typeof percent !== undefined && typeof num === "string" && ea === undefined) {
    return ("calc(" + String(100) + "% - " + String(percent) + num + ")");
  } else {
    throw new Error("invaild arguments");
  }
}

GeneralJs.vwConvert = function (num) {
  if (typeof num !== "number") {
    throw new Error("argument must be number");
  } else {
    return (num / 100) * window.innerWidth;
  }
}

GeneralJs.setTimeout = function (callback, time) {
  let propertyName;
  propertyName = "tempTimeout_" + String((new Date()).valueOf());
  GeneralJs.timeouts[propertyName] = setTimeout(function () {
    callback();
    clearTimeout(propertyName);
    GeneralJs.timeouts[propertyName] = null;
  }, time);
}

GeneralJs.willDo = function (func) {
  GeneralJs.setTimeout(func, 0);
}

GeneralJs.deBounce = function (func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    function later() {
      timeout = null;
      if (!immediate) { func.apply(context, args); };
    }
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); };
  }
}

GeneralJs.throTtle = function (callback, ms) {
  let timeout;
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      timeout = setTimeout(function () {
        waiting = false;
        clearTimeout(timeout);
      }, ms);
    }
  }
}

GeneralJs.delayLaunching = function (callback, ms) {
  let timer = 0;
  return function () {
    if (timer !== 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, ms);
  }
}

GeneralJs.totalDelete = function () {
  let desktop = document.getElementById("totalcontents");
  let mobile = document.getElementById("mototalcontents");
  while (desktop.firstChild) { desktop.removeChild(desktop.lastChild); }
  while (mobile.firstChild) { mobile.removeChild(mobile.lastChild); }
}

GeneralJs.autoHypenPhone = function (m) {
  let str = m.trim();
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0,3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
}

GeneralJs.returnGet = function () {
  let obj = {};
  let target = document.location.search;
  target.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (origin, name, value) {
    let decode = function (str) { return decodeURIComponent(str.split("+").join(" ")); }
    obj[decode(name)] = decode(value);
  });
  return obj;
}

GeneralJs.parseRatio = function (options) {
  let obj = options;
  let srcName = obj.source;
  let srcArr = srcName.split('_');
  let ratio_raw, number0, number1, result, result_return;
  let ratio = 0;
  for (let i = 0; i < srcArr.length; i++) {
    if (/^[0-9]+rspot/.test(srcArr[i])) {
      ratio_raw = srcArr[i].split("rspot");
      number0 = Number(ratio_raw[0]);
      if (ratio_raw[1] === undefined) {
        number1 = 0;
      } else if (ratio_raw[1].length === 0) {
        number1 = 0;
      } else if (ratio_raw[1].length === 1) {
        number1 = Number(ratio_raw[1]) / 10;
      } else if (ratio_raw[1].length === 2) {
        number1 = Number(ratio_raw[1]) / 100;
      } else if (ratio_raw[1].length === 3) {
        number1 = Number(ratio_raw[1]) / 1000;
      }
      ratio = number0 + number1;
    }
  }
  if (obj.method === "height") {
    result = (ratio * obj.target);
  } else {
    result = (obj.target / ratio);
  }
  result_return = result;
  if (obj.result === "string") {
    result_return = String(result);
  }
  return result_return;
}

GeneralJs.addHrefEvent = function (dom, to) {
  dom.addEventListener("click", function (e) {
    window.location.href = to;
  });
}

GeneralJs.objectToRawquery = function (dataObj) {
  if (typeof dataObj !== "object") {
    throw new Error("invaild input, must be object");
  }
  let dataString;
  dataString = '';
  for (let i in dataObj) {
    dataString += i.replace(/[\=\&]/gi, '');
    dataString += '=';
    if (typeof dataObj[i] === "object") {
      dataString += JSON.stringify(dataObj[i]).replace(/[\=\&]/g, '');
    } else {
      dataString += String(dataObj[i]).replace(/[\=\&]/g, '');
    }
    dataString += '&';
  }
  dataString = dataString.slice(0, -1);

  return dataString;
}

GeneralJs.objectToQuery = function (obj) {
  // obj = {
  //   collection: "",
  //   columns: [],
  //   where: [ [ [ column, value, notBoo ],[],[] ], [ [],[],[] ], [ [],[],[] ] ],
  //   sort: [ column, DESC/ASC ],
  //   limit: [],
  // }
  let data = "collection=";
  data += obj.collection;
  if (obj.columns !== undefined) {
    data += '&';
    data += "columns=";
    data += obj.columns.join(',');
  } else {
    data += '&';
    data += "columns=";
    data += "*";
  }
  if (obj.where !== undefined) {
    data += '&';
    data += "where=";
    data += JSON.stringify(obj.where);
  }
  if (obj.sort !== undefined) {
    data += '&';
    data += "sort=";
    data += JSON.stringify(obj.sort);
  }
  if (obj.limit !== undefined) {
    data += '&';
    data += "limit=";
    data += JSON.stringify(obj.limit);
  }
  return data;
}

GeneralJs.inputBackward = function (dom, text) {
  alert(text);
  dom.parentNode.style.border = "1px solid #59af89";
  let setTime = setTimeout(function () {
    dom.focus();
    clearTimeout(setTime);
  }, 0);
  dom.addEventListener("blur", function (e) {
    this.parentElement.style.border = "";
  }, { once: true });
}

GeneralJs.escapeString = function (str, option = { number: false, hangul: false, queryString: false, noSpace: false, isPhone: false }) {
  if (option.number === undefined) { option.number = false; }
  if (option.hangul === undefined) { option.hangul = false; }
  if (option.queryString === undefined) { option.queryString = false; }
  if (option.noSpace === undefined) { option.noSpace = false; }
  if (option.isPhone === undefined) { option.isPhone = false; }

  const { number: numberOnly, hangul: hangulOnly, queryString, noSpace, isPhone } = option;

  str = str.replace(/[\*\^\:\&\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  if (numberOnly) {
    str = str.replace(/[^0-9]/g, '');
  }
  if (hangulOnly) {
    str = str.replace(/[a-zA-Z]/g, '');
    str = str.replace(/[ㄱ-ㅎㅏ-ㅣ]/g, '');
    str = str.replace(/[0-9]/g, '');
  }
  if (noSpace) {
    str = str.replace(/ /g, '');
    str = str.replace(/\n/g, '');
    str = str.replace(/\t/g, '');
    str = str.trim();
  }
  if (isPhone) {
    str = GeneralJs.autoHypenPhone(str);
  }
  if (queryString) {
    str = encodeURIComponent(str);
  }

  return str;
}

GeneralJs.isClient = function (name, phone) {
  let n, p;

  if (typeof name === 'object') {
    if (Array.isArray(name)) {
      n = GeneralJs.escapeString(name[0], { hangul: true, noSpace: true });
      p = GeneralJs.escapeString(name[1], { isPhone: true });
    } else {
      throw new Error("invaild arguments");
    }
  } else if (typeof name === 'string') {
    n = GeneralJs.escapeString(name, { hangul: true, noSpace: true });
    p = GeneralJs.escapeString(phone, { isPhone: true });
  } else {
    throw new Error("invaild arguments");
  }

  return new Promise(function(resolve, reject) {
    GeneralJs.ajax("name=" + n + "&phone=" + p, "https://homeliaison-bridge.xyz:3000/namephone", function (data) {
      if (data === "success") {
        resolve({ boo: true, name: n, phone: p });
      } else {
        resolve({ boo: false, name: n, phone: p });
      }
    });
  });

}

GeneralJs.toPhotoUpload = async function (name, phone) {
  try {
    const { boo, name: n, phone: p } = await GeneralJs.isClient(name, phone);
    if (boo) {
      window.location.href = window.location.protocol + "//" + window.location.host + "/consulting.php?name=" + GeneralJs.escapeString(n, { queryString: true }) + "&phone=" + GeneralJs.escapeString(p, { queryString: true });
    } else {
      alert("성함과 연락처를 정확히 입력해주세요!");
      window.location.href = window.location.protocol + "//" + window.location.host + "/consulting.php?login=true";
    }
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.addScrollXEvent = function (node, name = "") {
  const today = new Date();
  const todayConst = String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate());

  if (name === "") {
    name = node.nodeName + "_" + String(today.getTime() + Math.round(Math.random() * 1000));
  }
  const keyName = name + "_" + todayConst;
  const variablesName = {
    isDown: "isDown" + '_' + keyName,
    startX: "startX" + '_' + keyName,
    scrollLeft: "scrollLeft" + '_' + keyName,
    mouseDown: "mouseDown" + '_' + keyName,
    mouseLeave: "mouseLeave" + '_' + keyName,
    mouseUp: "mouseUp" + '_' + keyName,
    mouseMove: "mouseMove" + '_' + keyName,
    events: [
      { target: "mousedown", name: "mouseDown" + '_' + keyName, },
      { target: "mouseleave", name: "mouseLeave" + '_' + keyName, },
      { target: "mouseup", name: "mouseUp" + '_' + keyName, },
      { target: "mousemove", name: "mouseMove" + '_' + keyName, },
    ],
  };

  GeneralJs.stacks[variablesName.isDown] = false;
  GeneralJs.stacks[variablesName.startX] = 0;
  GeneralJs.stacks[variablesName.scrollLeft] = 0;

  GeneralJs.events[variablesName.mouseDown] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = true;
    GeneralJs.stacks[variablesName.startX] = e.pageX - node.offsetLeft;
    GeneralJs.stacks[variablesName.scrollLeft] = node.scrollLeft;
    node.style.cursor = "grabbing";
  }

  GeneralJs.events[variablesName.mouseLeave] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = false;
    node.style.cursor = "pointer";
  }

  GeneralJs.events[variablesName.mouseUp] = function (e) {
    GeneralJs.stacks[variablesName.isDown] = false;
    node.style.cursor = "pointer";
  }

  GeneralJs.events[variablesName.mouseMove] = function (e) {
    let x, walk;
    if (!GeneralJs.stacks[variablesName.isDown]) {
      return;
    }
    e.preventDefault();
    x = e.pageX - node.offsetLeft;
    walk = x - GeneralJs.stacks[variablesName.startX];
    node.scrollLeft = GeneralJs.stacks[variablesName.scrollLeft] - walk;
    node.style.cursor = "grabbing";
  }

  node.addEventListener("mousedown", GeneralJs.events[variablesName.mouseDown]);
  node.addEventListener("mouseleave", GeneralJs.events[variablesName.mouseLeave]);
  node.addEventListener("mouseup", GeneralJs.events[variablesName.mouseUp]);
  node.addEventListener("mousemove", GeneralJs.events[variablesName.mouseMove]);

  return variablesName;
}

GeneralJs.getDateMatrix = function (year, month) {
  let tempObj, tempArr, tempArr2, tempArr3;

  if (year === "today" || (year === undefined && month === undefined)) {
    tempObj = new Date();
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } else if (typeof year === "string" && month === undefined && /\-/g.test(year)) {
    if (year.length === 10) {
      tempArr = year.split("-");
      tempObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
    } else {
      tempArr = year.split(" ");
      tempArr2 = tempArr[0].split("-");
      tempArr3 = tempArr[1].split(":");
      tempObj = new Date(Number(tempArr2[0]), Number(tempArr2[1].replace(/^0/, '')) - 1, Number(tempArr2[2].replace(/^0/, '')), Number(tempArr3[0].replace(/^0/, '')), Number(tempArr3[1].replace(/^0/, '')), Number(tempArr3[2].replace(/^0/, '')));
    }
    year = tempObj.getFullYear();
    month = tempObj.getMonth();
  } else if (typeof year === "object") {
    month = year.getMonth();
    year = year.getFullYear();
  }

  const getLastDate = function (year, month) {
    const today = new Date(year, month, 1);
    let newMonth, lastDate;
    for (let i = 27; i < 33; i++) {
      today.setDate(i);
      newMonth = today.getMonth();
      if (month !== newMonth) {
        lastDate = i - 1;
        break;
      }
    }
    return lastDate;
  }

  const firstDate = 1;
  const firstDay = (new Date(year, month, 1)).getDay();
  const lastDate = getLastDate(year, month);

  const DateMatrix = function (year, month) {
    this.year = year;
    this.month = month;
    this.matrix = null;
  }

  DateMatrix.prototype.getYearString = function () {
    return String(this.year) + "년";
  }

  DateMatrix.prototype.getMonthString = function () {
    return String(this.month + 1) + "월";
  }

  DateMatrix.prototype.getMatrix = function () {
    return this.matrix;
  }

  DateMatrix.prototype.getNormalMatrix = function () {
    let justTong, justArr;
    justTong = [];
    justArr = [];
    for (let arr of this.matrix) {
      justArr = [];
      for (let obj of arr) {
        if (obj === null) {
          justArr.push(null);
        } else {
          justArr.push(obj.date);
        }
      }
      justTong.push(justArr);
    }
    return justTong;
  }

  DateMatrix.prototype.getDateArr = function () {
    let justTong;
    justTong = [];
    for (let arr of this.matrix) {
      for (let obj of arr) {
        if (obj !== null) {
          justTong.push(obj);
        }
      }
    }
    return justTong;
  }

  DateMatrix.prototype.nextMatrix = function () {
    if (this.month === 11) {
      return GeneralJs.getDateMatrix(this.year + 1, 0);
    } else {
      return GeneralJs.getDateMatrix(this.year, this.month + 1);
    }
  }

  DateMatrix.prototype.previousMatrix = function () {
    if (this.month === 0) {
      return GeneralJs.getDateMatrix(this.year - 1, 11);
    } else {
      return GeneralJs.getDateMatrix(this.year, this.month - 1);
    }
  }

  DateMatrix.prototype.yearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year, i));
    }
    return arr;
  }

  DateMatrix.prototype.nextYearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year + 1, i));
    }
    return arr;
  }

  DateMatrix.prototype.previousYearMatrix = function () {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(GeneralJs.getDateMatrix(this.year - 1, i));
    }
    return arr;
  }

  DateMatrix.prototype.rangeMatrix = function (range = 3) {
    let arr = [];
    let tempMatrix;

    tempMatrix = this.previousMatrix();
    arr.unshift(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.previousMatrix();
      arr.unshift(tempMatrix);
    }

    arr.push(this);

    tempMatrix = this.nextMatrix();
    arr.push(tempMatrix);
    for (let i = 1; i < range; i++) {
      tempMatrix = tempMatrix.nextMatrix();
      arr.push(tempMatrix);
    }

    return arr;
  }

  DateMatrix.prototype.returnSundayMatrix = function () {
    let arr, boo;
    let tempArr;
    let tong;
    let length;

    arr = [];
    for (let matrix of this.matrix) {
      for (let i of matrix) {
        arr.push(i);
      }
    }
    arr.unshift(null);

    boo = true;
    for (let i = 0; i < 7; i++) {
      if (arr[i] !== null) {
        boo = false;
      }
    }

    if (boo) {
      for (let i = 0; i < 7; i++) {
        arr.shift();
      }
    }

    tong = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 7 === 0) {
        tempArr = [];
      }
      tempArr.push(arr[i]);
      if (i % 7 === 6 || i === arr.length - 1) {
        tong.push(tempArr);
      }
    }

    if (tong[tong.length - 1].length === 0) {
      tong.pop();
    }

    length = tong[tong.length - 1].length;
    if (length !== 7) {
      for (let i = 0; i < 7 - length; i++) {
        tong[tong.length - 1].push(null);
      }
    }

    boo = true;
    for (let i = 0; i < 7; i++) {
      if (tong[tong.length - 1][i] !== null) {
        boo = false;
      }
    }

    if (boo) {
      tong.pop();
    }

    return tong;
  }

  const DateFactor = function (year, month, date, index) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.day = ([ '월', '화', '수', '목', '금', '토', '일' ])[index];
    this.dateObject = new Date(year, month, date);
    this.dayday = this.dateObject.getDay()
  }

  DateFactor.prototype.getDateString = function () {
    const zeroAddition = function (num) {
      if (typeof num === 'string') {
        if (Number.isNaN(Number(num))) {
          throw new Error("invaild type");
        } else {
          num = Number(num);
        }
      }
      if (num < 10) {
        return '0' + String(num);
      } else {
        return String(num);
      }
    }
    return (String(this.year) + '-' + zeroAddition(this.month + 1) + '-' + zeroAddition(this.date));
  }

  let tempDate, arr;
  let tong;
  let pastLength;
  let result;
  let num;

  result = new DateMatrix(year, month);
  tong = [];
  arr = [];

  if (firstDay !== 0) {
    for (let i = 0; i < firstDay - 1; i++) {
      arr.push(null);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      arr.push(null);
    }
  }

  for (let i = firstDate; i < lastDate + 1; i++) {
    tempDate = new Date(year, month, i);
    arr.push(tempDate.getDay());
    if (arr.length % 7 === 0) {
      tong.push(arr);
      arr = [];
    }
  }

  if (arr.length !== 7 && arr.length !== 0) {
    pastLength = arr.length;
    for (let i = 0; i < 7 - pastLength; i++) {
      arr.push(null);
    }
    tong.push(arr);
  }

  num = 1;
  for (let arr of tong) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        arr[i] = new DateFactor(year, month, num, i);
        num++;
      }
    }
  }

  result.matrix = tong;

  return result;
}

GeneralJs.sleep = function (time) {
  let timeoutId = null;
  return new Promise(function (resolve, reject) {
    timeoutId = setTimeout(function () {
      resolve('awake');
      clearTimeout(timeoutId);
      timeoutId = null;
    }, time);
  });
}

GeneralJs.downloadString = function (text, fileName, fileType = "plain") {
  if (/csv/gi.test(fileType)) {
    fileType = "text/csv"
  } else if (/csv/gi.test(fileType)) {
    fileType = "application/json"
  } else if (/csv/gi.test(fileType)) {
    fileType = "application/js"
  } else if (/svg/gi.test(fileType)) {
    fileType = "image/svg+xml"
  } else if (/xml/gi.test(fileType)) {
    fileType = "application/xml"
  } else if (/html/gi.test(fileType)) {
    fileType = "text/html"
  } else if (/pdf/gi.test(fileType)) {
    fileType = "application/pdf"
  } else {
    fileType = "text/plain"
  }

  let blob, a, timeoutId;

  blob = new Blob([ text ], { type: fileType });

  a = document.createElement('A');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  timeoutId = setTimeout(function() {
    URL.revokeObjectURL(a.href);
    clearTimeout(timeoutId);
  }, 1500);
}

GeneralJs.blankHref = function (link) {
  if (link === undefined) {
    throw new Error("must be link");
  }
  let a = document.createElement("A");
  a.style.display = "none";
  a.href = link;
  a.setAttribute("target", "_blank");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

GeneralJs.styleInjection = function (dom, styleObj) {
  if (dom === undefined || styleObj === undefined) {
    throw new Error("arguments must be dom, style object");
  }
  if (typeof styleObj !== "object") {
    throw new Error("style object type must be object");
  }
  for (let i in styleObj) {
    dom.style[i] = styleObj[i];
  }
}

GeneralJs.cssInjection = function (cssString) {
  if (typeof cssString !== "string") {
    throw new Error("invaild argument");
  }
  const style = document.querySelector("style");
  style.insertAdjacentHTML("beforeend", cssString);
}

GeneralJs.uniqueValue = function (type = "number") {
  if (type === "number") {
    return Number(String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000)));
  } else {
    return String((new Date()).valueOf()) + String(Math.round(Math.random() * 10000));
  }
}

GeneralJs.cleanChildren = function (dom) {
  if (typeof dom !== "object") {
    throw new Error("argument must be dom");
  }
  if (Array.isArray(dom)) {
    for (let d of dom) {
      while (d.firstChild !== null && d.firstChild !== undefined) {
        d.removeChild(d.lastChild);
      }
    }
  } else {
    while (dom.firstChild !== null && dom.firstChild !== undefined) {
      dom.removeChild(dom.lastChild);
    }
  }
}

GeneralJs.protoPatch = async function (instance, modulePath, protoName = null) {
  try {
    const className = instance.constructor.name;
    let appendScript, protoFunc;
    if (typeof modulePath === "string") {
      appendScript = await GeneralJs.requestPromise(modulePath);
    } else if (Array.isArray(modulePath)) {
      appendScript = '';
      for (let script of modulePath) {
        if (typeof script !== "string") {
          throw new Error("invaild input");
        }
        appendScript += await GeneralJs.requestPromise(script);
        appendScript += "\n\n";
      }
    } else {
      throw new Error("invaild input");
    }
    if (protoName === null || protoName === undefined) {
      protoFunc = new Function(className, appendScript);
    } else if (typeof protoName === "string") {
      protoFunc = new Function(protoName, appendScript);
    } else {
      throw new Error("invaild input");
    }
    protoFunc(instance.constructor);
  } catch (e) {
    console.log(e);
  }
}

GeneralJs.equalJson = function (jsonString) {
  if (typeof jsonString === "string") {
    let filtered;
    filtered = jsonString.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
    filtered = filtered.replace(/nbsp\;/g, "&nbsp;");
    const tempFunc = new Function("const obj = " + filtered + "; return obj;");
    const json = tempFunc();
    return json;
  } else if (typeof jsonString === "object") {
    return jsonString;
  } else {
    throw new Error("invaild input");
  }
}

GeneralJs.autoComma = function (str) {
  let minus;
  let count, countArr;
  let temp, tempArr;
  if (typeof str === "number") {
    str = String(Math.floor(str));
  }
  if (/e/gi.test(str)) {
    throw new Error("is too heavy");
  }
  minus = /\-/g.test(str) ? /\-/g.exec(str)[0] : '';
  str = str.replace(/[^0-9]/g, '');
  if (str === '') {
    throw new Error("invaild number");
  }
  count = Math.ceil(str.length / 3);
  countArr = [];
  for (let i = 0; i < count; i++) {
    countArr.push([ 3 * i, 3 * (i + 1) ]);
  }
  if (countArr.length === 0) {
    throw new Error("invaild number");
  }
  tempArr = [];
  for (let arr of countArr) {
    temp = '';
    for (let i = arr[0]; i < arr[1]; i++) {
      if (str.length - 1 - i < 0) {
        temp += '';
      } else {
        temp = str[str.length - 1 - i] + temp;
      }
    }
    if (temp !== '') {
      tempArr.unshift(temp);
    }
  }
  return (minus + tempArr.join(','));
}

GeneralJs.dateToString = function (date, detail = false) {
  if (!(date instanceof Date)) {
    throw new Error("invaild input");
  }
  if (detail === undefined || detail === null) {
    detail = false;
  }
  if (typeof detail !== "boolean") {
    throw new Error("second input must be boolean");
  }
  const zeroAddition = (num) => { return (num < 10) ? `0${String(num)}` : String(num); }
  const emptyDateValue = (new Date(1901, 0, 1)).valueOf();
  const futureDateValue = (new Date(3000, 0, 1)).valueOf();
  if (date.valueOf() <= emptyDateValue) {
    return "해당 없음";
  } else if (date.valueOf() >= futureDateValue) {
    return "예정";
  } else {
    if (!detail) {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())}`;
    } else {
      return `${String(date.getFullYear())}-${zeroAddition(date.getMonth() + 1)}-${zeroAddition(date.getDate())} ${zeroAddition(date.getHours())}:${zeroAddition(date.getMinutes())}:${zeroAddition(date.getSeconds())}`;
    }
  }
}

GeneralJs.stringToDate = function (str) {
  if (typeof str !== "string") {
    throw new Error("invaild input");
  }
  if (str.trim() === '' || str.trim() === '-' || /없음/gi.test(str)) {
    return (new Date(1800, 0, 1));
  }
  if (str === "예정" || str === "진행중" || str === "미정") {
    return (new Date(3800, 0, 1));
  }
  str = str.trim();
  if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str) && !/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$/.test(str)) {
    throw new Error("not date string : " + str);
  }
  let tempArr, tempArr2, tempArr3;
  if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(str)) {
    tempArr = str.split('-');
    return (new Date(Number(tempArr[0]), Number(tempArr[1]) - 1, Number(tempArr[2])));
  } else {
    tempArr = str.split(' ');
    tempArr2 = tempArr[0].split('-');
    tempArr3 = tempArr[1].split(':');
    return (new Date(Number(tempArr2[0]), Number(tempArr2[1]) - 1, Number(tempArr2[2]), Number(tempArr3[0]), Number(tempArr3[1]), Number(tempArr3[2])));
  }
}

GeneralJs.serviceParsing = function (serviceObj) {
  if (serviceObj.online === undefined || serviceObj.serid === undefined || serviceObj.xValue === undefined) {
    throw new Error("invaild service object");
  }
  const { online, serid, xValue } = serviceObj;
  let finalWords;

  if (online) {
    finalWords = "온라인 ";
  } else {
    finalWords = "오프라인 ";
  }

  if (/aa01s/gi.test(serid)) {
    finalWords += "홈퍼니싱 ";
  } else if (/aa02s/gi.test(serid)) {
    finalWords += "홈스타일링 ";
  } else if (/aa03s/gi.test(serid)) {
    finalWords += "토탈 스타일링 ";
  } else {
    throw new Error("invaild service object");
  }

  if (/M/gi.test(xValue)) {
    finalWords += "mini";
  } else if (/B/gi.test(xValue)) {
    finalWords += "basic ";
  } else if (/P/gi.test(xValue)) {
    finalWords += "premium";
  } else {
    throw new Error("invaild service object");
  }

  return finalWords;
}

GeneralJs.prototype.resizeLaunching = function (callback) {
  const instance = this;
  this.resizeStack = 0;
  this.resizeFrom = 0;
  this.resizePopup = 0;
  const resizeDebounceEvent = function () {
    let timeout;
    const reEvent = function () {
      if ((instance.resizeFrom >= 1510 && window.innerWidth <= 1610) || (instance.resizeFrom <= 1610 && window.innerWidth >= 1610)) {
        GeneralJs.totalDelete();
        callback();
        instance.specialBan();
        instance.homeliaisonTalk();
      }
      instance.resizeStack = 0;
    }
    let immediate = null;
    return function (e) {
      if (instance.resizeStack === 0) {
        instance.resizeStack = 1;
        instance.resizeFrom = window.innerWidth;
      }
      let context = this;
      let args = arguments;
      function later() {
        timeout = null;
        if (!immediate) { reEvent.apply(context, args); };
      }
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, 250);
      if (callNow) { reEvent.apply(context, args); };
    }
  }
  window.addEventListener('resize', resizeDebounceEvent());
}

GeneralJs.prototype.stateLaunching = function (callback) {
  window.addEventListener('popstate', function (e) {
    callback(e.state);
  });
}

GeneralJs.prototype.loadLaunching = function (callback) {
  window.addEventListener('load', callback);
}

GeneralJs.prototype.scrollAsyncLaunching = function (callback) {
  let tempArr = [];
  let num = 0;
  const filter = function (str) { return Number(str.replace(/[^0-9\.-]/g, '')); }
  for (let i in GeneralJs.events) {
    if (/scrollAsyncLaunching/.test(i)) { tempArr.push(i); }
  }
  if (tempArr.length > 0) {
    tempArr.sort((a, b) => { return filter(b) - filter(a); });
    num = filter(tempArr[0]) + 1;
  }
  GeneralJs.events["scrollAsyncLaunching" + String(num)] = function (e) {
    if (GeneralJs.boos.scroll) {
      callback(e);
      GeneralJs.boos.scroll = false;
    }
    window.removeEventListener("scroll", GeneralJs.events["scrollAsyncLaunching" + String(num)]);
  };
  window.addEventListener("scroll", GeneralJs.events["scrollAsyncLaunching" + String(num)], { once: true });
}

GeneralJs.prototype.fadeIn = function () {
  let fades = document.querySelectorAll(".fadeInmaininit");
  for (let i = 0; i < fades.length; i++){
    fades[i].classList.add("fadeInmainclass");
  }
  this.loader.classList.add("loaderfadeout");
}

GeneralJs.prototype.rightClick = function () {
  window.addEventListener("contextmenu", function (e) {
    alert("오른쪽버튼은 사용하실 수 없습니다 :)");
    e.preventDefault();
  });
}

GeneralJs.prototype.specialBan = function () {
  function specialban(e) {
    this.value = this.value.replace(/[\*\!\?\~\^\:\/\%\&\+\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  }
  function specialban_lite(e) {
    this.value = this.value.replace(/[\*\^\:\&\<\>\;\=\#\$\[\]\\\|\(\)\`\'\"\{\}]/g, '');
  }
  let i;
  let inputs = document.querySelectorAll("input");
  for (i = 0; i < inputs.length; i++) {
    if (!inputs[i].hasAttribute("hypenboo")) {
      inputs[i].addEventListener("keyup", specialban);
    }
  }
  let textareas = document.querySelectorAll("textarea");
  for (i = 0; i < textareas.length; i++) { textareas[i].addEventListener("keyup", specialban_lite); }
}

GeneralJs.prototype.loaderMake = function () {
  const hiddenSpot = document.getElementById('hiddentextmain0817');

  const loader = GeneralJs.nodes.div.cloneNode(true);
  loader.id = "loader";

  const loaderImg = SvgTong.tongMaker();
  loaderImg.src = this.map.sub.loader;
  loaderImg.classList.add("loading");
  loaderImg.classList.add("loaderc");
  loader.appendChild(SvgTong.parsing(loaderImg));

  this.loader = loader;

  document.body.insertBefore(loader, hiddenSpot);
}

GeneralJs.prototype.navigatorMake = function () {
  const { menu, src } = this.map.main.navigator;
  let logo, search, hamburger, menuTong, menuItem, temp, height, marginLeft, thisLocationArr, thisLocation;

  //desktop
  const desktopNavigator = GeneralJs.nodes.div.cloneNode(true);
  const desktopNavigatorFrame = GeneralJs.nodes.div.cloneNode(true);
  desktopNavigator.id = "desknavihome";
  desktopNavigatorFrame.id = "desknaviframe";

  //logo
  logo = SvgTong.tongMaker();
  logo.src = src.logo;
  logo.classList.add("desknaviclick");
  GeneralJs.addHrefEvent(logo, "http://home-liaison.com");
  logo.style.width = "165px";
  logo.style.height = "23px";
  logo.style.top = "21.3px";
  logo.style.left = "0";
  desktopNavigatorFrame.appendChild(SvgTong.parsing(logo));

  //search icon
  search = SvgTong.tongMaker();
  search.src = src.icons.search;
  search.classList.add("desknaviclick");
  GeneralJs.addHrefEvent(search, "/portfolio.php");
  search.style.width = "24px";
  search.style.height = "24px";
  search.style.top = "22px";
  search.style.right = "0";
  desktopNavigatorFrame.appendChild(SvgTong.parsing(search));

  //menu
  height = 16.5;
  marginLeft = 33;
  thisLocationArr = window.location.href.split('/');
  thisLocation = thisLocationArr[thisLocationArr.length - 1].replace(/\?.+/, '');
  thisLocation = '/' + thisLocation;

  menuTong = GeneralJs.nodes.div.cloneNode(true);
  menuTong.classList.add("desknavimenuframe");
  menuTong.style.left = String(-1 * ((marginLeft / 2) + 4)) + "px"

  for (let i = 0; i < menu.length; i++) {
    menuItem = GeneralJs.nodes.div.cloneNode(true);
    menuItem.style.display = "inline-block";
    menuItem.style.position = "relative";
    menuItem.style.marginLeft = String(marginLeft) + "px";
    menuItem.style.cursor = "pointer";

    temp = SvgTong.tongMaker();
    temp.src = src.words.desktop[i].gray;
    menuItem.style.height = String(height) + "px";
    menuItem.style.width = GeneralJs.parseRatio({ source: temp.src, target: height, method: "height", result: "string" }) + "px";
    temp.style.position = "absolute";
    temp.style.top = "0";
    temp.style.left = "0";
    temp.style.width = "100%";
    temp.style.height = "100%";
    menuItem.appendChild(SvgTong.parsing(temp));

    temp = SvgTong.tongMaker();
    temp.src = src.words.desktop[i].green;
    temp.style.position = "absolute";
    temp.style.top = "0";
    temp.style.left = "0";
    temp.style.width = "100%";
    temp.style.height = "100%";
    temp.style.transition = "all 0.5s ease";
    if (thisLocation === menu[i].href) {
      temp.style.opacity = "1";
    } else {
      temp.style.opacity = "0";
    }
    menuItem.appendChild(SvgTong.parsing(temp));
    if (thisLocation !== menu[i].href) {
      menuItem.addEventListener("mouseleave", function (e) { this.lastChild.style.opacity = '0'; });
    }
    menuItem.addEventListener("mouseenter", function (e) { this.lastChild.style.opacity = '1'; });
    GeneralJs.addHrefEvent(menuItem, menu[i].href);
    menuTong.appendChild(menuItem);
  }
  desktopNavigatorFrame.appendChild(menuTong);
  desktopNavigator.appendChild(desktopNavigatorFrame);
  document.body.insertBefore(desktopNavigator, loader);

  //mobile
  let menuBack, menuButton, width, buttonHeight;
  const mobileNavigator = GeneralJs.nodes.div.cloneNode(true);
  mobileNavigator.id = "mobilenavihome";
  height = 210;

  //logo
  logo = SvgTong.tongMaker();
  logo.src = src.logo;
  GeneralJs.addHrefEvent(logo, "http://home-liaison.com");
  logo.style.position = "absolute";
  logo.style.left = "6.05vw";
  logo.style.top = "18px";
  logo.style.width = "136px";
  logo.style.height = "19px";
  logo.style.cursor = "pointer";
  mobileNavigator.appendChild(SvgTong.parsing(logo));

  //menu
  menuTong = GeneralJs.nodes.div.cloneNode(true);
  menuTong.style.width = "100%";
  menuTong.style.position = "relative";
  menuTong.style.height = String(0) + "px";
  menuTong.style.overflow = "hidden";
  menuTong.style.display = "block";
  menuTong.style.top = "59px";
  menuTong.style.transition = "all 0.5s ease";

  menuItem = GeneralJs.nodes.div.cloneNode(true);
  menuItem.style.width = "100%";
  menuItem.style.position = "absolute";
  menuItem.style.height = String(height) + "px";
  menuItem.style.backgroundColor = "white";
  menuItem.style.display = "block";
  menuItem.style.bottom = "0";

  menuBack = SvgTong.tongMaker();
  menuBack.src = src.words.mobile[0].group;
  menuBack.style.width = "100%";
  menuBack.style.position = "absolute";
  menuBack.style.height = String(height) + "px";
  width = GeneralJs.parseRatio({ source: menuBack.src, target: height, method: "height", result: "number" });
  menuBack.style.width = String(width) + "px";
  menuBack.style.left = "50%";
  menuBack.style.top = "-7px";
  menuBack.style.marginLeft = '-' + String(width / 2) + "px";
  menuItem.appendChild(SvgTong.parsing(menuBack));

  buttonHeight = (height - 22) / menu.length;
  for (let i = 0; i < menu.length; i++) {
    menuButton = GeneralJs.nodes.div.cloneNode(true);
    menuButton.style.width = "100%";
    menuButton.style.position = "absolute";
    menuButton.style.height = String(buttonHeight - 2.6) + "px";
    if (i === menu.length - 1) {
      menuButton.style.height = String(buttonHeight + 10 - 2.6) + "px";
    } else if (i === 0) {
      menuButton.style.height = String(buttonHeight + 10 - 2.6) + "px";
    }
    menuButton.style.cursor = "pointer";
    menuButton.style.top = String((buttonHeight * i) + 5) + "px";
    if (i === 0) {
      menuButton.style.top = String((buttonHeight * i) - 5) + "px";
    }
    GeneralJs.addHrefEvent(menuButton, menu[i].href);
    menuItem.appendChild(menuButton);
  }
  menuTong.appendChild(menuItem);
  menuTong.setAttribute("cus_open", "0");
  mobileNavigator.appendChild(menuTong);

  //hamburger icon
  hamburger = SvgTong.tongMaker();
  hamburger.src = src.icons.hamburger;
  hamburger.style.position = "absolute";
  hamburger.style.right = "6.05vw";
  hamburger.style.top = "18px";
  hamburger.style.width = "21px";
  hamburger.style.height = "18px";
  hamburger.style.cursor = "pointer";
  hamburger.addEventListener("click", function (e) {
    let open = menuTong.getAttribute("cus_open");
    if (Number(open) === 0) {
      menuTong.style.height = String(height) + "px";
      menuTong.setAttribute("cus_open", "1");
    } else {
      menuTong.style.height = "0" + "px";
      menuTong.setAttribute("cus_open", "0");
    }
  });
  mobileNavigator.appendChild(SvgTong.parsing(hamburger));

  document.body.insertBefore(mobileNavigator, loader);
  this.navigator = { desktop: desktopNavigator, mobile: mobileNavigator };
}

GeneralJs.prototype.footerMake = function (type = 'A', color = "gradientGreen", mobileForce = false) {
  const instance = this;
  const { footer } = this.map.main;
  const { words, src } = footer;
  const { mobileCase } = words;
  const wordsKey = Object.keys(words);
  const media = [
    (window.innerWidth > 1540),
    (window.innerWidth <= 1540 && window.innerWidth > 1050),
    (window.innerWidth <= 1050 && window.innerWidth > 900),
    (window.innerWidth <= 900 && window.innerWidth > 760),
    (window.innerWidth <= 760),
  ];
  const standardWidths = [ 1400, 1050, 900, 720, 100 ];
  // css tong => [ width, height, top, margin-left ]
  const cssTong = {
    f18home: [
      255,
      73,
      66,
      -700,
      "right",
    ],
    f18faq: [
      80,
      18,
      120,
      157,
      "left"
    ],
    f18card: [
      70,
      18,
      120,
      247,
      "left"
    ],
    f18terms: [
      190,
      17,
      153,
      126,
      "left"
    ],
    f18about: [
      78,
      18,
      120,
      380,
      "left"
    ],
    f18port: [
      72,
      17,
      153,
      386,
      "left"
    ],
    f18designer: [
      62,
      17,
      186,
      397,
      "left"
    ],
    f18blog: [
      64,
      17,
      216,
      395,
      "left"
    ],
    f18channel: [
      163,
      25,
      64,
      539,
      "left"
    ],
    f18naverblog: [
      52,
      25,
      95,
      549,
      "left"
    ],
    f18instagram: [
      80,
      25,
      95,
      621,
      "left"
    ],
    f18designersubmit: [
      100,
      25,
      125,
      601,
      "left"
    ],
    f18partnershipsubmit: [
      60,
      25,
      125,
      526,
      "left"
    ],
  };

  let div_clone, div_clone2, a_clone, svg_clone;
  let height, width, top;
  let style = {};
  let ea;
  let actionTong = [];
  let tempFunc;
  let arr = [];
  let mobileType;
  let mobileCaseKeys = Object.keys(mobileCase);
  let mobileCaseTempArr;
  let mobileCaseTongs = {};
  let standardWidth;
  let height_original, top_original;

  //make action tong
  for (let i = 0; i < wordsKey.length; i++) {
    if (wordsKey[i] !== "mobileCase") {
      for (let j = 0; j < words[wordsKey[i]].length; j++) {
        if (Array.isArray(words[wordsKey[i]][j].action)) {
          for (let k = 0; k < words[wordsKey[i]][j].action.length; k++) {
            if (words[wordsKey[i]][j].action[k].css !== "") {
              actionTong.push({
                css: words[wordsKey[i]][j].action[k].css,
                js: words[wordsKey[i]][j].action[k].js
              });
            }
          }
        } else {
          if (words[wordsKey[i]][j].action.css !== "") {
            actionTong.push({
              css: words[wordsKey[i]][j].action.css,
              js: words[wordsKey[i]][j].action.js
            });
          }
        }
      }
    }
  }

  //desktop
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = "footergreenback0817";
  div_clone.style.background = GeneralJs.colorChip[color];

  standardWidth = 0;
  if (media[0]) {
    standardWidth = standardWidths[0];
  } else if (media[1]) {
    standardWidth = standardWidths[1];
  } else if (media[2]) {
    standardWidth = standardWidths[2];
  } else if (media[3]) {
    standardWidth = standardWidths[3];
  } else if (media[4]) {
    standardWidth = standardWidths[4];
  }

  //footer left
  ea = "px";
  height = 165;
  top = 67;
  if (media[3] || media[4]) {
    height_original = height;
    top_original = top;
    height = 135;
    top = 52;
    div_clone.style.height = String(240) + ea;
  }

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = src.desktop.left;
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    display: "block",
    position: "absolute",
    left: String(50) + '%',
    transition: "all 0.5s ease",
    height: String(height) + ea,
    width: String(width) + ea,
    top: String(top) + ea,
    marginLeft: String(-1 * (standardWidth / 2)) + ea
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  //footer right
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = src.desktop.right;
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style = {
    display: "block",
    position: "absolute",
    left: String(50) + '%',
    transition: "all 0.5s ease",
    height: String(height) + ea,
    width: String(width) + ea,
    top: String(top) + ea,
    marginLeft: String((standardWidth / 2) - width) + ea
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  for (let i = 0; i < actionTong.length; i++) {
    tempFunc = new Function("instance", "return function (e) { " + actionTong[i].js + " }");
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      opacity: String(0),
      left: String(50) + '%',
      cursor: "pointer",
      width: String(cssTong[actionTong[i].css][0]) + ea,
      height: String(cssTong[actionTong[i].css][1]) + ea,
      top: String(cssTong[actionTong[i].css][2]) + ea,
      marginLeft: String(cssTong[actionTong[i].css][4] === "right" ? -1 * (standardWidth / 2) : cssTong[actionTong[i].css][3] - ((standardWidths[0] / 2) - (standardWidth / 2))) + ea,
    };
    if (media[3]) {
      style.width = String(cssTong[actionTong[i].css][0] * (height / height_original)) + ea;
      style.height = String(cssTong[actionTong[i].css][1] * (height / height_original)) + ea;
      style.top = String(((cssTong[actionTong[i].css][2] - top_original) * (height / height_original)) + top) + ea;
      if (cssTong[actionTong[i].css][4] === "left") {
        style.marginLeft = String(((cssTong[actionTong[i].css][3] - ((standardWidths[0] / 2) - (standardWidth / 2))) * (height / height_original)) + 65) + ea;
      }
    }
    for (let j in style) {
      div_clone2.style[j] = style[j];
    }
    div_clone2.addEventListener("click", tempFunc(this));
    div_clone.appendChild(div_clone2);
  }

  //mother append
  if (document.getElementById("totalcontents") !== null) {
    if (!mobileForce) {
      document.getElementById("totalcontents").appendChild(div_clone);
    }
  }

  //mobile
  for (let i in mobileCase) {
    mobileCaseTongs[i] = [];
    mobileCaseTongs[i].push(i);
    for (let j = 0; j < mobileCase[i].targets.length; j++) {
      mobileCaseTongs[i].push(mobileCase[i].targets[j]);
    }
  }

  for (let i in mobileCaseTongs) {
    for (let j = 0; j < mobileCaseTongs[i].length; j++) {
      if (type === mobileCaseTongs[i][j]) {
        mobileType = i;
      }
    }
  }

  arr.push("mofooter" + mobileType);
  for (let i = 0; i < mobileCase[mobileType].menu.length; i++) {
    arr.push(mobileCase[mobileType].menu[i].href);
  }

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.className = "mofooterbelow";

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = src.mobile[mobileType];
  svg_clone.style.width = "100%";
  svg_clone.style.display = "block";
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = src.mobile['Z'];
  svg_clone.style.width = "100%";
  svg_clone.style.display = "block";
  div_clone.appendChild(SvgTong.parsing(svg_clone));

  for (let i = 0; i < 3; i++) {
    a_clone = GeneralJs.nodes.a.cloneNode(true);
    a_clone.href = arr[i + 1];
    div_clone2 = GeneralJs.nodes.div.cloneNode(true);
    div_clone2.classList.add("mfbelbutton");
    div_clone2.classList.add("mfbelbu" + String(i + 1));
    a_clone.appendChild(div_clone2);
    div_clone.appendChild(a_clone);
  }
  if (document.getElementById("mototalcontents") !== null) {
    document.getElementById("mototalcontents").appendChild(div_clone);
  }
  if (mobileForce) {
    document.getElementById("totalcontents").appendChild(div_clone);
  }
}

GeneralJs.prototype.homeliaisonTalk = function (local_instance = {}) {
  const instance = this;
  let div_clone, div_clone2, svg_clone, height, baseWidth, width, right, ea, mother, top, radius, visualSpecific, visualSpecific2, leftMargin, totalHeight, margin;
  let func, func_RAW;
  let style = {};
  let list = [ "desktop", "mobile" ];
  let wording = { desktop: "", mobile: "" };
  let doms = { desktop: {}, mobile: {} };
  let domsWording = { desktop: {}, mobile: {} };
  let interactionArr, interactionTarget = null;
  const { main: { interaction }, sub: { loader, talk, triangle, close, arrow: inputArrow } } = this.map;
  interactionArr = Object.keys(interaction);
  for (let i = 0; i < interactionArr.length; i++) {
    interactionTarget = interaction[interactionArr[i]];
  }

  if (interactionTarget === null) {
    throw new Error("interaction patch first");
  }
  const { behaviors } = interactionTarget;
  let icon, eventFunc;
  let finalNum = Math.abs(Math.round(Math.random() * ((behaviors.length - 1) + 0.5 - (-1 * 0.5)) - 0.5));

  GeneralJs.events["iconClickEvent"] = [];

  for (let i = 0; i < list.length; i++) {

    ea = !Boolean(i) ? "px" : "vw";

    //set target
    mother = document.getElementById(!Boolean(i) ? "totalcontents" : "mototalcontents");

    //green base
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    baseWidth = !Boolean(i) ? 68 : 14;
    right = !Boolean(i) ? 38 : 5.2;
    style = {
      position: "fixed",
      cursor: "pointer",
      width: String(baseWidth) + ea,
      height: String(baseWidth) + ea,
      bottom: String(right + 1) + ea,
      right: String(right) + ea,
      borderRadius: String(baseWidth / 2) + ea,
      background: "linear-gradient(222deg,rgba(89,175,137,.85) 5%,rgba(0,156,106,.85) 100%)",
      boxShadow: "0px 6px 20px -10px #606060",
      animation: "talkfade 1.2s ease forwards",
      zIndex: "1",
    }
    for (let j in style) {
      div_clone.style[j] = style[j];
    }

    //talk icon
    width = !Boolean(i) ? 38 : 7;
    visualSpecific = !Boolean(i) ? { top: 1, left: 1 } : { top: 0.3, left: 0.2 };
    svg_clone = SvgTong.tongMaker();
    svg_clone.src = talk;
    svg_clone.id = (!Boolean(i) ? "" : "mo") + "talkIcon";
    height = GeneralJs.parseRatio({ source: svg_clone.src, target: width, method: "width", result: "number" });
    svg_clone.classList.add("hoverdefault");
    style = {
      position: "relative",
      width: String(width) + ea,
      height: String(height) + ea,
      top: String(((baseWidth - height) / 2) - visualSpecific.top) + ea,
      left: String(((baseWidth - width) / 2) - visualSpecific.left) + ea,
    };
    for (let j in style) {
      svg_clone.style[j] = style[j];
    }
    icon = SvgTong.parsing(svg_clone);
    div_clone.appendChild(icon);

    //white wording
    if (behaviors.length !== 0) {

      //white
      totalHeight = !Boolean(i) ? 48 : 10;
      div_clone2 = GeneralJs.nodes.div.cloneNode(true);
      top = !Boolean(i) ? 11 : 2;
      radius = !Boolean(i) ? 5 : 1.5;
      style = {
        position: "absolute",
        height: String(totalHeight) + ea,
        top: String(top) + ea,
        background: "white",
        borderRadius: String(radius) + ea,
        boxShadow: "2px 2px 18px -10px #a0a0a0",
        animation: "talkwhitefade 1.6s ease forwards",
      };
      for (let j in style) {
        div_clone2.style[j] = style[j];
      }

      //triangle
      height = !Boolean(i) ? 12 : 4;
      visualSpecific = !Boolean(i) ? -1 : -0.4;
      visualSpecific2 = !Boolean(i) ? 1 : 1;
      svg_clone = SvgTong.tongMaker();
      svg_clone.src = triangle;
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "absolute",
        width: String(width) + ea,
        height: String(height) + ea,
        top: String(((totalHeight - height) / 2) + visualSpecific) + ea,
        boxShadow: "2px 0px 16px -12px #a0a0a0",
        right: String((-1 * width) + visualSpecific2) + ea,
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      div_clone2.appendChild(SvgTong.parsing(svg_clone));

      //wording
      height = !Boolean(i) ? 14.5 : 3.3;
      margin = !Boolean(i) ? 20 : 3.5;
      visualSpecific = !Boolean(i) ? -1 : -0.2;
      visualSpecific2 = !Boolean(i) ? 2 : 0.5;
      leftMargin = !Boolean(i) ? -22 : -5;
      svg_clone = SvgTong.tongMaker();
      svg_clone.src = behaviors[finalNum].src[(!Boolean(i) ? "desktop" : "mobile")];
      svg_clone.classList.add("hoverdefault");
      width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
      style = {
        position: "absolute",
        width: String(width) + ea,
        height: String(height) + ea,
        top: String(((totalHeight - height) / 2) + visualSpecific) + ea,
        left: String(margin) + ea,
      };
      for (let j in style) {
        svg_clone.style[j] = style[j];
      }
      div_clone2.appendChild(SvgTong.parsing(svg_clone));
      div_clone2.style.width = String(width + (margin * 2) + visualSpecific2) + ea;
      div_clone2.style.left = String((-1 * (width + (margin * 2))) + leftMargin) + ea;

      //append
      domsWording[list[i]] = div_clone2;
      doms[list[i]] = div_clone;
      div_clone.appendChild(div_clone2);

      //add event
      func_RAW = behaviors[finalNum].action;

      if (behaviors[finalNum].actionException === undefined) {
        eventFunc = function (e) {
          let func = new Function("getObj", behaviors[finalNum].action);
          func(GeneralJs.returnGet());
        }
        domsWording[list[i]].addEventListener("click", eventFunc);
        icon.addEventListener("click", eventFunc);
      } else {
        eventFunc = function (e) {
          let target = doms[(!Boolean(i) ? "desktop" : "mobile")];
          let boo = !Boolean(i) ? true : false;
          let ea = !Boolean(i) ? "px" : "vw";
          let div_clone, div_clone2, svg_clone, input_clone, totalHeight, totalWidth, top, bottom, margin, radius, height, width, visualSpecific, visualSpecific2;
          let style = {};
          let whiteDoms = {};

          target.lastChild.style.animation = "talkwhitefadeout 0.3s ease forwards";

          //white box
          totalHeight = !Boolean(i) ? 150 : 30;
          totalWidth = !Boolean(i) ? 340 : 69;
          div_clone = GeneralJs.nodes.div.cloneNode(true);
          top = !Boolean(i) ? -97 : -17;
          radius = !Boolean(i) ? 5 : 1;
          visualSpecific = !Boolean(i) ? 20 : 4.2;
          style = {
            position: "absolute",
            height: String(totalHeight) + ea,
            top: String(top) + ea,
            background: "white",
            borderRadius: String(radius) + ea,
            boxShadow: "2px 2px 18px -10px #a0a0a0",
            animation: "talkwhitefadeconvert 0.3s ease forwards",
            width: String(totalWidth) + ea,
            left: "-" + String(totalWidth + visualSpecific) + ea,
          };
          for (let j in style) {
            div_clone.style[j] = style[j];
          }
          whiteDoms.box = div_clone;

          //green
          height = !Boolean(i) ? 17 : 3.2;
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            height: String(height) + ea,
            top: String(0) + ea,
            borderTopLeftRadius: String(radius) + ea,
            borderTopRightRadius: String(radius) + ea,
            borderBottomLeftRadius: String(0) + ea,
            borderBottomRightRadius: String(0) + ea,
            background: "linear-gradient(222deg,rgba(89,175,137,.85) 5%,rgba(0,156,106,.85) 100%)",
            width: "100%",
            left: "0"
          };
          for (let j in style) {
            div_clone2.style[j] = style[j];
          }
          div_clone.appendChild(div_clone2);
          whiteDoms.green = div_clone2;

          //triangle
          height = !Boolean(i) ? 12 : 4;
          visualSpecific = !Boolean(i) ? -6 : -0.4;
          visualSpecific2 = !Boolean(i) ? 1 : 1;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = triangle;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            width: String(width) + ea,
            height: String(height) + ea,
            top: String(((totalHeight - (height * 2))) + visualSpecific) + ea,
            boxShadow: "2px 0px 16px -12px #a0a0a0",
            right: String((-1 * width) + visualSpecific2) + ea,
          };
          for (let j in style) {
            svg_clone.style[j] = style[j];
          }
          whiteDoms.arrow = SvgTong.parsing(svg_clone);
          div_clone.appendChild(whiteDoms.arrow);

          //x icon
          height = !Boolean(i) ? 7 : 1.5;
          top = !Boolean(i) ? 5 : 0.9;
          visualSpecific = !Boolean(i) ? 1 : 0.2;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = close;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            width: String(width) + ea,
            height: String(height) + ea,
            top: String(top) + ea,
            left: String(top + visualSpecific) + ea,
          };
          for (let j in style) {
            svg_clone.style[j] = style[j];
          }
          svg_clone.addEventListener("click", function (e) {
            target.removeChild(target.lastChild);
          });
          whiteDoms.xIcon = SvgTong.parsing(svg_clone);
          div_clone.appendChild(whiteDoms.xIcon);

          //input arrow
          height = !Boolean(i) ? 15 : 3.8;
          bottom = !Boolean(i) ? 28 : 6;
          visualSpecific = !Boolean(i) ? -9 : -1;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = inputArrow;
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            width: String(width) + ea,
            height: String(height) + ea,
            bottom: String(bottom) + ea,
            left: String(bottom + visualSpecific) + ea,
          };
          for (let j in style) {
            svg_clone.style[j] = style[j];
          }
          whiteDoms.greenArrow = SvgTong.parsing(svg_clone);
          div_clone.appendChild(whiteDoms.greenArrow);

          //input base
          height = !Boolean(i) ? 29 : 6;
          visualSpecific2 = !Boolean(i) ? -8 : -1.3;
          div_clone2 = GeneralJs.nodes.div.cloneNode(true);
          style = {
            position: "absolute",
            height: String(height) + ea,
            bottom: String(bottom + visualSpecific2) + ea,
            borderRadius: String(radius + (!Boolean(i) ? -2 : 0)) + ea,
            background: "#f2f2f2",
            width: String(totalWidth - (bottom + visualSpecific + width + (!Boolean(i) ? 26.3 : 6.4))) + ea,
            left: String(bottom + visualSpecific + (!Boolean(i) ? 17.2 : 4.1)) + ea,
          };
          for (let j in style) {
            div_clone2.style[j] = style[j];
          }
          whiteDoms.inputBase = div_clone2;
          div_clone.appendChild(div_clone2);

          //input
          input_clone = GeneralJs.nodes.input.cloneNode(true);
          input_clone.classList.add("inputdefault");
          input_clone.setAttribute("type", "text");
          style = {
            position: "absolute",
            height: String(height) + ea,
            bottom: String(bottom + visualSpecific2) + ea,
            borderRadius: String(radius + (!Boolean(i) ? -2 : 0)) + ea,
            background: "transparent",
            width: String(totalWidth - (bottom + visualSpecific + width + (!Boolean(i) ? 26.3 : 6.4))) + ea,
            left: String(bottom + visualSpecific + (!Boolean(i) ? 17.2 : 4.7)) + ea,
          };
          for (let j in style) {
            input_clone.style[j] = style[j];
          }
          whiteDoms.input = input_clone;
          div_clone.appendChild(input_clone);

          let timeout = setTimeout(function () {
            whiteDoms.input.focus();
            clearTimeout(timeout);
          }, 0);

          //wording
          height = !Boolean(i) ? 15 : 3.6;
          top = !Boolean(i) ? 50 : 9.2;
          visualSpecific2 = !Boolean(i) ? -2 : -0.2;
          svg_clone = SvgTong.tongMaker();
          svg_clone.src = behaviors[finalNum].actionException[0].src[list[i]];
          width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
          style = {
            position: "absolute",
            width: String(width) + ea,
            height: String(height) + ea,
            top: String(top) + ea,
            left: String(bottom + visualSpecific + visualSpecific2) + ea,
          };
          for (let j in style) {
            svg_clone.style[j] = style[j];
          }
          whiteDoms.wording = SvgTong.parsing(svg_clone);
          div_clone.appendChild(whiteDoms.wording);

          //event
          if (behaviors[finalNum].actionException.length === 1) {
            whiteDoms.input.addEventListener("keyup", function (e) {
              this.value = GeneralJs.escapeString(this.value);
            });
            whiteDoms.input.addEventListener("keypress", function (e) {
              let svg_clone;
              let height, top, width, visualSpecific;
              let style = {};
              let ea = !Boolean(i) ? "px" : "vw";
              let valuesTong = [];

              if (e.key === "Enter") {

                //loader
                height = !Boolean(i) ? 48 : 10;
                top = !Boolean(i) ? 50 : 9.5;
                visualSpecific = !Boolean(i) ? 3 : 0.5;
                svg_clone = SvgTong.tongMaker();
                svg_clone.src = loader;
                width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                style = {
                  position: "absolute",
                  width: String(width) + ea,
                  height: String(height) + ea,
                  top: String(top) + ea,
                  left: "50%",
                  marginLeft: '-' + String((width / 2) + visualSpecific) + ea,
                  animation: "loadingrotate 1.8s linear 20",
                };
                for (let j in style) {
                  svg_clone.style[j] = style[j];
                }
                div_clone.appendChild(SvgTong.parsing(svg_clone));

                valuesTong.push(this.value);
                let func = new Function("valuesTong", "instance", "flatform", "mother", behaviors[finalNum].action);
                func(valuesTong, local_instance, (!Boolean(i) ? "desktop" : "mobile"), div_clone);
                let icon = document.getElementById((!Boolean(i) ? "" : "mo") + "talkIcon");
                icon.removeEventListener("click", GeneralJs.events["iconClickEvent"][i]);
                GeneralJs.addHrefEvent(icon, "http://pf.kakao.com/_vxixkjxl/chat");

              }
            });
          } else if (behaviors[finalNum].actionException.length === 2) {
            whiteDoms.input.addEventListener("keyup", function (e) {
              this.value = GeneralJs.escapeString(this.value);
            });
            whiteDoms.input.addEventListener("keypress", function (e) {
              let height, top, bottom, visualSpecific, visualSpecific2, width;
              let svg_clone, input_clone;
              let style = {};
              let ea = !Boolean(i) ? "px" : "vw";
              let valuesTong = [];

              if (e.key === "Enter") {
                valuesTong.push(this.value);

                //fadeout word and input
                whiteDoms.wording.style.animation = "talkwhitefadeout 0.3s ease forwards";
                whiteDoms.input.style.display = "none";

                //new input
                bottom = !Boolean(i) ? 28 : 6;
                visualSpecific = !Boolean(i) ? -9 : -1;
                height = !Boolean(i) ? 29 : 6;
                visualSpecific2 = !Boolean(i) ? -8 : -1.3;
                input_clone = GeneralJs.nodes.input.cloneNode(true);
                input_clone.classList.add("inputdefault");
                input_clone.setAttribute("type", "text");
                style = {
                  position: "absolute",
                  height: String(height) + ea,
                  bottom: String(bottom + visualSpecific2) + ea,
                  borderRadius: String(radius + (!Boolean(i) ? -2 : 0)) + ea,
                  background: "transparent",
                  width: String(totalWidth - (bottom + visualSpecific + width + (!Boolean(i) ? 26.3 : 6.4))) + ea,
                  left: String(bottom + visualSpecific + (!Boolean(i) ? 17.2 : 4.7)) + ea,
                };
                for (let j in style) {
                  input_clone.style[j] = style[j];
                }
                whiteDoms.newInput = input_clone;
                div_clone.appendChild(input_clone);

                //new wording
                height = !Boolean(i) ? 15 : 3.6;
                top = !Boolean(i) ? 50 : 9.2;
                visualSpecific2 = !Boolean(i) ? -2 : -0.2;
                svg_clone = SvgTong.tongMaker();
                svg_clone.src = behaviors[finalNum].actionException[1].src[list[i]];
                width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                style = {
                  position: "absolute",
                  width: String(width) + ea,
                  height: String(height) + ea,
                  top: String(top) + ea,
                  left: String(bottom + visualSpecific + visualSpecific2) + ea,
                  animation: "talkwhitefadeconvert 0.3s ease forwards",
                };
                for (let j in style) {
                  svg_clone.style[j] = style[j];
                }
                whiteDoms.newWording = SvgTong.parsing(svg_clone);
                div_clone.appendChild(whiteDoms.newWording);

                //second event
                let timeout = setTimeout(function () {
                  whiteDoms.newInput.focus();
                  clearTimeout(timeout);
                }, 0);
                whiteDoms.newInput.addEventListener("keyup", function (e) {
                  this.value = GeneralJs.autoHypenPhone(this.value);
                });
                whiteDoms.newInput.addEventListener("keypress", function (e) {
                  let targets;
                  let svg_clone;
                  let height, top, width, visualSpecific;
                  let style = {};
                  let ea = !Boolean(i) ? "px" : "vw";

                  if (e.key === "Enter") {
                    targets = [ "green", "newWording", "newInput", "greenArrow", "inputBase" ];
                    for (let i = 0; i < targets.length; i++) {
                      whiteDoms[targets[i]].style.animation = "justfadeout 0.3s ease forwards";
                    }

                    //loader
                    height = !Boolean(i) ? 48 : 10;
                    top = !Boolean(i) ? 50 : 9.5;
                    visualSpecific = !Boolean(i) ? 3 : 0.5;
                    svg_clone = SvgTong.tongMaker();
                    svg_clone.src = loader;
                    width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
                    style = {
                      position: "absolute",
                      width: String(width) + ea,
                      height: String(height) + ea,
                      top: String(top) + ea,
                      left: "50%",
                      marginLeft: '-' + String((width / 2) + visualSpecific) + ea,
                      animation: "loadingrotate 1.8s linear 20",
                    };
                    for (let j in style) {
                      svg_clone.style[j] = style[j];
                    }
                    div_clone.appendChild(SvgTong.parsing(svg_clone));

                    valuesTong.push(this.value);
                    let func = new Function("valuesTong", "instance", "flatform", "mother", behaviors[finalNum].action);
                    func(valuesTong, local_instance, (!Boolean(i) ? "desktop" : "mobile"), div_clone);
                  }
                });
              }
            });
          } else {
            throw new Error("Please bulidng logic");
          }

          //event end
          target.appendChild(div_clone);

        }
        GeneralJs.events["iconClickEvent"].push(eventFunc);
        domsWording[list[i]].addEventListener("click", GeneralJs.events["iconClickEvent"][i]);
        icon.addEventListener("click", GeneralJs.events["iconClickEvent"][i]);

      }

    } else {
      GeneralJs.addHrefEvent(div_clone, "http://pf.kakao.com/_vxixkjxl/chat");
    }

    //end
    this.talkIcon = { dom: div_clone };
    if (mother !== null) {
      mother.appendChild(div_clone);
    }

  }
}

GeneralJs.prototype.whiteLogin = function (boo = "desktop") {
  const instance = this;
  const { main: { login: { flow } }, sub: { loader } } = this.map;
  const [ login, certification ] = flow;
  const { src: subtitle, title: { src: title }, children } = login;
  const [ nameSrc, phoneSrc ] = children;
  const { src: name } = nameSrc;
  const { src: phone } = phoneSrc;
  const mother = document.getElementById(((boo === "desktop") ? "" : "mo") + "totalcontents");

  let toggle = (boo === "desktop") ? true : false;
  let div_back, white_back, div_clone, div_clone2, svg_clone, input_clone;
  let height, width, top, left, right;
  let ea = toggle ? "px" : "vw";
  let style = {};
  let inputs = [];
  let inputsBack = [];
  let submitEvent, submitEventKey, cancelOrSubmitEvent;
  let targetDoms = {};

  //MAKE DOMS -----------------------------------------------------------------------------

  //gray back
  div_back = GeneralJs.nodes.div.cloneNode(true);
  div_back.id = ((boo === "desktop") ? "" : "mo") + "loginbox_back";
  mother.appendChild(div_back);


  //login box window (div_clone)
  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.id = ((boo === "desktop") ? "" : "mo") + "loginbox";


  //white back
  white_back = GeneralJs.nodes.div.cloneNode(true);
  white_back.classList.add("absolutedefault");
  style = {
    background: "#ffffff",
    borderRadius: "5px",
  }
  for (let i in style) {
    white_back.style[i] = style[i];
  }
  div_clone.appendChild(white_back);


  //title
  height = toggle ? 68 : 15.5;
  top = toggle ? 41 : 9.2;
  left = toggle ? 41 : 0;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = title[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    top: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  if (!toggle) {
    svg_clone.style.left = String((78 - width) / 2) + ea;
  }
  targetDoms.title = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.title);


  //sub title
  height = toggle ? 16 : 0;
  top = toggle ? 43 : 0;
  right = toggle ? 46 : 0;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = subtitle[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    top: String(top) + ea,
    right: String(right) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }
  if (!toggle) {
    svg_clone.style.display = "none";
  }
  targetDoms.subTitle = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.subTitle);


  //name
  height = toggle ? 18 : 4.4;
  top = toggle ? 57 : 23.2;
  left = toggle ? 51 : 9;

  svg_clone = SvgTong.tongMaker();
  svg_clone.src = name[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });

  style = {
    position: "absolute",
    bottom: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
  };
  for (let i in style) {
    svg_clone.style[i] = style[i];
  }

  targetDoms.name = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.name);


  //phone
  svg_clone = SvgTong.tongMaker();
  svg_clone.src = phone[boo];
  width = GeneralJs.parseRatio({ source: svg_clone.src, target: height, method: "height", result: "number" });
  style.width = String(width) + ea;

  if (toggle) {
    style.left = String(290) + ea;
  } else {
    style.bottom = String(13) + ea;
  }

  for (let i in style) {
    svg_clone.style[i] = style[i];
  }

  targetDoms.phone = SvgTong.parsing(svg_clone);
  div_clone.appendChild(targetDoms.phone);


  //name input back
  height = toggle ? 33 : 8;
  width = toggle ? 151 : 39.5;
  top = toggle ? 48 : 21.5;
  left = toggle ? 115 : 30;

  div_clone2 = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "absolute",
    bottom: String(top) + ea,
    left: String(left) + ea,
    width: String(width) + ea,
    height: String(height) + ea,
    borderRadius: String(toggle ? 3 : 1) + ea,
    background: "#f2f2f2",
  };
  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  targetDoms.nameBack = div_clone2;
  div_clone.appendChild(div_clone2);
  inputsBack.push(div_clone2);


  //phone input back
  div_clone2 = GeneralJs.nodes.div.cloneNode(true);

  if (toggle) {
    style.left = String(371) + ea;
  } else {
    style.bottom = String(11) + ea;
  }

  for (let i in style) {
    div_clone2.style[i] = style[i];
  }
  targetDoms.phoneBack = div_clone2;
  div_clone.appendChild(div_clone2);
  inputsBack.push(div_clone2);


  //name input
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.classList.add("inputdefault");
  input_clone.setAttribute("type", "text");
  input_clone.setAttribute("placeholder", "성함");
  style = {
    position: "absolute",
    height: String(height) + ea,
    bottom: String(0) + ea,
    background: "transparent",
    width: String(width) + ea,
    left: String(0) + ea,
    textAlign: "center",
    textIndent: "0",
  };
  for (let j in style) {
    input_clone.style[j] = style[j];
  }
  input_clone.addEventListener("keyup", function (e) {
    this.value = GeneralJs.escapeString(this.value, { noSpace: true });
  });
  targetDoms.nameInput = div_clone2;
  inputsBack[0].appendChild(input_clone);
  inputs.push(input_clone);


  //phone input
  input_clone = GeneralJs.nodes.input.cloneNode(true);
  input_clone.classList.add("inputdefault");
  input_clone.setAttribute("placeholder", "010-0000-0000");
  for (let j in style) {
    input_clone.style[j] = style[j];
  }
  input_clone.setAttribute("hypenboo", "yes");
  input_clone.addEventListener("keyup", function (e) {
    this.value = GeneralJs.autoHypenPhone(this.value);
  });
  targetDoms.phoneInput = div_clone2;
  inputsBack[1].appendChild(input_clone);
  inputs.push(input_clone);


  //end
  mother.appendChild(div_clone);


  //EVENTS --------------------------------------------------------------------------------------

  //input submit event
  submitEvent = function (e) {

    //certification
    if (inputs[0].value === "") {
      GeneralJs.inputBackward(inputs[0], "성함을 입력해주세요!");
    } else if (inputs[1].value === "") {
      GeneralJs.inputBackward(inputs[1], "연락처를 입력해주세요!");
    } else {

      //question server
      GeneralJs.toPhotoUpload(inputs[0].value, inputs[1].value);

      //loading bar
      for (let i in targetDoms) {
        targetDoms[i].style.animation = "justfadeout 0.3s ease forwards";
      }
      const loaderImg = SvgTong.tongMaker();
      loaderImg.src = instance.map.sub.loader;
      loaderImg.classList.add("loading");
      loaderImg.classList.add("loaderc");
      loaderImg.style.top = String(toggle ? 73 : 23.5) + ea;
      div_clone.appendChild(SvgTong.parsing(loaderImg));

    }
  }


  //submit event to keypress event
  GeneralJs.stacks["whiteLoginBox"] = 0;
  submitEventKey = function (e) {
    if (e.key === "Enter" && GeneralJs.stacks["whiteLoginBox"] === 0) {
      submitEvent(e);
      GeneralJs.stacks["whiteLoginBox"] = 1;
    }
  }


  //focus on name and keypress event on
  inputs[0].focus();
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", submitEventKey);
  }


  //cancel or submit event (gray back and white back on)
  cancelOrSubmitEvent = function (cancelBoo) {
    return function (e) {
      if (GeneralJs.stacks["whiteLoginBox"] === 0 && inputs[0].value !== '' && inputs[1].value !== '') {
        submitEvent(e);
        GeneralJs.stacks["whiteLoginBox"] = 1;
      } else {
        if (cancelBoo) {
          mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "loginbox_back"));
          mother.removeChild(document.getElementById(((boo === "desktop") ? "" : "mo") + "loginbox"));
        }
      }
    }
  }


  //cancel or submit event on
  div_back.addEventListener("click", cancelOrSubmitEvent(true));
  white_back.addEventListener("click", cancelOrSubmitEvent(false));
}

GeneralJs.prototype.todayMaker = function (startPoint = "month") {
  const today = new Date();
  let dayString = '';
  if (startPoint === "month") {
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
    if (today.getHours() < 10) {
      dayString += '0' + String(today.getHours());
    } else {
      dayString += String(today.getHours());
    }
  } else if (startPoint === "year") {
    dayString += String(today.getFullYear()).slice(2, 4);
    if (today.getMonth() + 1 < 10) {
      dayString += '0' + String(today.getMonth() + 1);
    } else {
      dayString += String(today.getMonth() + 1);
    }
    if (today.getDate() < 10) {
      dayString += '0' + String(today.getDate());
    } else {
      dayString += String(today.getDate());
    }
  } else {
    throw new Error("invaild option");
  }
  return dayString;
}

GeneralJs.prototype.returnPlus = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.388 8.388"><path d="M4.194 0C1.878 0 0 1.878 0 4.194s1.878 4.194 4.194 4.194 4.194-1.878 4.194-4.194S6.51 0 4.194 0zM6.469 4.606H4.606v1.863c0 0.228-0.185 0.412-0.412 0.412 -0.228 0-0.412-0.185-0.412-0.412V4.606H1.918c-0.228 0-0.412-0.185-0.412-0.412 0-0.228 0.185-0.412 0.412-0.412h1.863V1.918c0-0.228 0.185-0.412 0.412-0.412 0.228 0 0.412 0.185 0.412 0.412v1.863h1.863c0.228 0 0.412 0.185 0.412 0.412C6.881 4.421 6.697 4.606 6.469 4.606z" fill="${color}"/></svg>`;
}

GeneralJs.prototype.returnOk = function (color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 545.677 545.677"><path class="st0" d="M272.839 0c-150.685 0-272.839 122.154-272.839 272.839s122.154 272.839 272.839 272.839 272.839-122.154 272.839-272.839S423.523 0 272.839 0zM433.643 193.855L241.566 405.315c-4.247 4.676-10.264 7.352-16.581 7.372 -0.024 0-0.049 0-0.074 0 -6.291 0-12.294-2.633-16.555-7.263L99.241 286.872c-8.416-9.143-7.825-23.377 1.318-31.792 9.143-8.416 23.377-7.826 31.792 1.318l92.45 100.446 175.532-193.246c8.355-9.198 22.584-9.881 31.783-1.526C441.315 170.426 441.999 184.656 433.643 193.855z" fill="${color}"/></svg>`;
}

GeneralJs.setCookie = function (obj, day = 730, del = false) {
  if (typeof day === "boolean") {
    del = day;
    day = 730;
  }
  const today = new Date();
  let totalString, expires;

  today.setTime(today.getTime() + (day * 24 * 60 * 60 * 1000));
  if (!del) {
    expires = "expires=" + today.toUTCString();
  } else {
    expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }

  for (let i in obj) {
    totalString = '';
    totalString += encodeURIComponent(i.replace(/\=\;/g, ''));
    totalString += '=';
    totalString += encodeURIComponent(String(obj[i]).replace(/\=\;/g, ''));
    totalString += ';';
    totalString += expires + ";path=/";
    document.cookie = totalString;
  }
}

GeneralJs.getCookiesAll = function () {
  const cookies = decodeURIComponent(document.cookie);
  let tempArr0, tempArr1;
  let resultObj;

  resultObj = {};
  tempArr0 = cookies.split(';');

  if (tempArr0[0] === undefined) {
    return {};
  } else {
    if (tempArr0[0].split('=').length < 2) {
      return {};
    }
  }

  for (let i of tempArr0) {
    tempArr1 = i.split('=');
    if (tempArr1.length > 1) {
      resultObj[tempArr1[0].trim()] = tempArr1[1].trim();
    }
  }

  return resultObj;
}

GeneralJs.getCookieById = function (key) {
  const cookiesObj = GeneralJs.getCookiesAll();
  const cookiesKey = Object.keys(cookiesObj);
  if (cookiesKey.includes(key)) {
    return cookiesObj[key];
  } else {
    return null;
  }
}

GeneralJs.googleLogInInit = function () {
  GeneralJs.stacks["GoogleAuth"] = null;
  GeneralJs.stacks["GoogleClient"] = null;
  GeneralJs.stacks["GoogleClientProfile"] = {
    homeliaisonConsoleLoginedName: null,
    homeliaisonConsoleLoginedEmail: null,
    homeliaisonConsoleLoginedBoolean: false
  };
  return new Promise(function(resolve, reject) {
    GeneralJs.request("https://apis.google.com/js/platform.js?onload=googleLogInInit", function (response) {
      const googleCode = new Function(response);
      googleCode();
      gapi.load("auth2", function () {
        const googleAuth = gapi.auth2.init({
          client_id: "444967534334-r85i9pcnfd3oeschret07t465vcnv4gf.apps.googleusercontent.com",
        });
        googleAuth.then(function () {
          GeneralJs.stacks["GoogleAuth"] = googleAuth;
          console.log(googleAuth);
          resolve(googleAuth);
        }, function (e) {
          reject(e);
        });
      });
    });
  });
}

GeneralJs.isMac = function () {
  return !/Windows/gi.test(window.navigator.userAgent);
}

GeneralJs.isIE = function () {
  let agent = window.navigator.userAgent.toLowerCase();
  if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1)) {
    return true;
  } else {
    return false;
  }
}
