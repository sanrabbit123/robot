const Front = function () {}

Front.ajax = function (url, data) {
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
    let xhr = new XMLHttpRequest();
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

Front.nodes = {
  div: document.createElement("DIV"),
  img: document.createElement("IMG"),
  input: document.createElement("INPUT"),
  textarea: document.createElement("TEXTAREA"),
  a: document.createElement('A'),
	style: document.createElement('STYLE'),
	article: document.createElement('ARTICLE'),
	iframe: document.createElement('IFRAME'),
}

Front.prototype.styleMake = function () {
	let style_clone;
	style_clone = Front.nodes.style.cloneNode(true);
	style_clone.setAttribute("media", "screen");

	let styleText = `
	*{margin:0;}
	div{font-size:1.5vw}
	input{margin:0px;width:79vw;position:absolute;top:0.5vw;height:1.2vw;font-size:0.9vw}
	.totaldiv{display:block;position:relative;width:90vw;left:50%;margin-left:-45vw;margin-top:5vw;margin-bottom:10vw;}
	.totaldiv2{display:none;}
	.blockdiv{display:block;margin-top:0.3vw;}
	.leftdiv{display:inline-block;width:9vw;position:relative}
	.rightdiv{display:inline-block;width:80vw;position:relative;height:2vw}
	.buttons{display:block;position:relative;top:5vw;width:8vw;left:50%;margin-left:-4vw;cursor:pointer;}
	#hidden_article{display:none;}`;
	styleText = styleText.replace(/\n/g, '').replace(/ /g, '').replace(/\t/g, '');

	style_clone.insertAdjacentHTML("beforeend", styleText);
	document.querySelector("head").appendChild(style_clone);
}

Front.prototype.hiddenMake = function () {
	let article_clone, iframe_clone;
	article_clone = Front.nodes.article.cloneNode(true);
	article_clone.id = "hidden_article1";

	iframe_clone = Front.nodes.iframe.cloneNode(true);
	iframe_clone.setAttribute("name", "hidden_iframe1");
	iframe_clone.id = "hidden_iframe1";
	iframe_clone.style.display = "none";

	document.querySelector("body").appendChild(article_clone);
	document.querySelector("body").appendChild(iframe_clone);
}

Front.prototype.returnFilters = function () {
	function filterAll(som) {
		let str = String(som);
		return str.replace(/&/g, ',').replace(/=/g, '');
	}

	function filterName(som) {
		let str = String(som);
		return str.replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, '').replace(/\t/g, '').replace(/  /g, '').replace(/ /g, '').replace(/ /g, '');
	}

	function filterDate(som) {
		if (String(som) === "거주중") {
			return "거주중";
		}
		let str = String(som).replace(/[^0-9]/g, '');
		if (str.length > 4) {
			if (/^20[0-9][0-9]/.test(str)) {
				if (str.length === 6) {
					return str.slice(0, 4) + '-0' + str.slice(4, 5) + '-0' + str.slice(5);
				} else if (str.length === 7) {
					if (str.slice(4, 5) === '1') {
						return str.slice(0, 4) + '-' + str.slice(4, 6) + '-0' + str.slice(6);
					} else {
						return str.slice(0, 4) + '-0' + str.slice(4, 5) + '-' + str.slice(5);
					}
				} else if (str.length === 8) {
					return str.slice(0, 4) + '-' + str.slice(4, 6) + '-' + str.slice(6);
				}
			} else {
				return String(som);
			}
		}
		return str.replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, '').replace(/\t/g, '').replace(/  /g, '').replace(/ /g, '').replace(/ /g, '');
	}

	function filterCont(som) {
		let str = String(som);
		if (str === '') {
			return "알 수 없음";
		} else if (/전/g.test(str)) {
			return "전월세";
		} else {
			return "자가";
		}
	}

  function filterNull(str) {
    let target;
		target = String(str);
		if (/^null/gi.test(target)) {
			return "-";
		} else {
			return target;
		}
	}

	return { filterAll, filterName, filterDate, filterCont, filterNull }
}

Front.prototype.buttonEvent = function (inputs) {
	let googleLink = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfqd1Q-En9K7YbQpknPE3OkqobzCMJaSO9G33W6KRodoE0I8g/formResponse";
	let dbcolumns = [ "a18_timeline", "a19_name", "a20_phone", "a35_aboutetc", "a21_address", "a22_family", "a23_budget", "a24_pyeong", "a25_due_date", "a27_contract", "a28_space", "a29_etc", "a30_channel" ];
	return async function (e) {
		let value = {};
		let dbmes_arr = [];
		let text_input_clone;
		for (let node of inputs) {
			value[node.name] = node.value;
			dbmes_arr.push(node.value);
		}

		let fo1 = document.createElement('FORM');
		fo1.id = "form1";
		fo1.setAttribute('method', 'POST');
		fo1.setAttribute('action', googleLink);
		fo1.setAttribute('target', 'hidden_iframe1');
		for (let i in value) {
			text_input_clone = Front.nodes.input.cloneNode(true);
			text_input_clone.setAttribute('type', 'text');
			text_input_clone.setAttribute('name', i);
			text_input_clone.setAttribute('value', value[i]);
			fo1.appendChild(text_input_clone);
		}
		document.getElementById('hidden_article1').appendChild(fo1);
		document.getElementById('form1').submit();

		let ajax_data = '';
		for (let z = 0; z < dbcolumns.length; z++) { ajax_data += dbcolumns[z] + '=' + dbmes_arr[z] + '&'; }
		ajax_data = ajax_data.slice(0, -1);
    console.log(ajax_data);
		console.log(await Front.ajax("/toMongo", ajax_data));
	}
}

Front.prototype.mainRow = async function () {
	const { rows, columns } = JSON.parse(await Front.ajax("/getRows", "mode=default"));
  const mother = document.querySelector("body");
  const { filterAll, filterName, filterDate, filterCont, filterNull } = this.returnFilters();

	let names = [ "entry.1749939672", "entry.1330142163", "entry.113799560", "entry.1481370131", "entry.2114079722", "entry.132869049", "entry.795490298", "entry.1040328027", "entry.2088583577", "entry.2069033904", "entry.1127622227", "entry.462371043", "entry.795957898" ];
	let div_clone, div_clone2, div_clone3, input_clone;
	let this_id = '';
	let inputs = [];

	for (let j = 0; j < rows.length; j++) {
		this_id = `r` + String(j + 1);

		div_clone = Front.nodes.div.cloneNode(true);
		div_clone.classList.add("totaldiv");
		inputs = [];

		for (let i = 0; i < names.length; i++) {
			div_clone2 = Front.nodes.div.cloneNode(true);
			div_clone2.classList.add("blockdiv");

			div_clone3 = Front.nodes.div.cloneNode(true);
			div_clone3.classList.add("leftdiv");
			div_clone3.textContent = columns[j][i] + " : ";
			div_clone2.appendChild(div_clone3);

			div_clone3 = Front.nodes.div.cloneNode(true);
			div_clone3.classList.add("rightdiv");
			input_clone = Front.nodes.input.cloneNode(true);
			input_clone.setAttribute("type", "text");
			input_clone.classList.add(`inputs_r${String(j+1)}`);
			input_clone.id = `${names[i]}_r${String(j+1)}`;
			input_clone.setAttribute("name", names[i]);
			if (i === 1) {
				input_clone.value = filterAll(filterName(rows[j][columns[j][i]]));
      } else if (i === 3) {
        input_clone.value = filterAll(filterNull(rows[j][columns[j][i]]));
			} else if (i === 8) {
				input_clone.value = filterAll(filterDate(rows[j][columns[j][i]]));
			} else if (i === 9) {
				input_clone.value = filterAll(filterCont(rows[j][columns[j][i]]));
			} else {
				input_clone.value = filterAll(rows[j][columns[j][i]]);
			}
			inputs.push(input_clone);
			div_clone3.appendChild(input_clone);
			div_clone2.appendChild(div_clone3);
			div_clone.appendChild(div_clone2);
		}

		input_clone = Front.nodes.input.cloneNode(true);
		input_clone.setAttribute("type", "button");
		input_clone.classList.add("buttons");
		input_clone.id = `button_r${String(j+1)}`;
		input_clone.addEventListener("click", this.buttonEvent(inputs));
		div_clone.appendChild(input_clone);

		mother.appendChild(div_clone);
	}
}

Front.prototype.launching = async function () {
	this.styleMake();
	this.hiddenMake();
	await this.mainRow();
}

const instance = new Front();
instance.launching();
