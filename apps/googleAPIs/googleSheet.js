/**
 * GoogleSheet 클래스는 Google Sheets 및 관련 Google API와 상호작용하는 도구입니다.
 * @constructor
 */
const GoogleSheet = function () {
  // 현재 작업 디렉토리에서 Mother 클래스를 가져옴
  const Mother = require(`${process.cwd()}/apps/mother.js`);

  // Mother 클래스의 인스턴스를 생성하여 this.mother 속성에 할당
  this.mother = new Mother();

  // Google API 관련 작업을 수행할 디렉토리 경로를 설정
  this.dir = process.cwd() + "/apps/googleAPIs";

  // 파이썬 애플리케이션 경로를 설정
  this.pythonApp = this.dir + "/python/app.py";

  // 알파벳을 담을 배열을 초기화
  let alphabet, temp0, temp1;
  
  // 'A'와 'Z'의 ASCII 코드를 가져옴
  temp0 = 'A'.charCodeAt();
  temp1 = 'Z'.charCodeAt();

  // A부터 Z까지의 알파벳을 담을 배열을 생성
  alphabet = [];
  for (let i = temp0; i < temp1 + 1; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  // GoogleSheet 클래스에서 사용할 알파벳 조합 배열을 초기화
  this.abc = [];

  // 알파벳 단일 문자 조합을 abc 배열에 추가
  for (let i of alphabet) {
    this.abc.push(i);
  }

  // 알파벳 두 글자 조합을 abc 배열에 추가
  for (let i of alphabet) {
    for (let j of alphabet) {
      this.abc.push(i + j);
    }
  }
}

/**
 * Google Sheets 또는 Google Drive 링크에서 ID를 추출하는 메서드입니다.
 * @param {string} link - ID를 추출할 링크
 * @returns {string} 추출된 ID
 */
GoogleSheet.prototype.parsingId = function (link) {
  let linkArr, target;

  // 링크가 HTTP로 시작하는지 확인
  if (/^http/i.test(link)) {
    // 링크를 '?'로 분리한 후 '/'로 분할하여 배열로 변환
    linkArr = (link.split('?'))[0].split('/');

    // 배열의 각 요소를 순회하며 특정 패턴에 맞지 않는 요소 중 ID로 추정되는 값을 찾음
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i)) {
        if (i.length > 12) {
          // 길이가 12자 이상인 경우 ID로 간주하여 target 변수에 저장
          target = i;
        }
      }
    }
  } else {
    // 링크가 HTTP로 시작하지 않는 경우, 링크 자체를 ID로 간주
    target = link;
  }

  // 추출된 ID를 반환
  return target;
}

/**
 * Python 스크립트를 사용하여 새로운 Google Sheets 문서를 생성하고 해당 문서를 특정 폴더로 이동시키는 메서드입니다.
 * @param {string} title - 생성할 문서의 제목
 * @param {string} parent - 문서를 이동시킬 폴더의 ID
 * @returns {Promise<string|null>} 생성된 문서의 ID 또는 오류 발생 시 null
 */
GoogleSheet.prototype.create_newSheets_inPython = async function (title, parent) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // Python 스크립트를 실행하여 새 Google Sheets 문서를 생성
    const { id } = await mother.pythonExecute(this.pythonApp, ["sheets", "create"], { title });

    // 생성된 문서를 지정된 폴더로 이동
    await mother.pythonExecute(this.pythonApp, ["drive", "moveFolder"], { targetId: id, parent: parent });

    // 생성된 문서의 ID를 반환
    return id;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets 문서의 보기 화면을 초기화하는 메서드입니다.
 * @param {string} id - 초기화할 Google Sheets 문서의 ID
 * @returns {Promise<string|null>} 초기화 성공 메시지 또는 오류 발생 시 null
 */
GoogleSheet.prototype.setting_cleanView_inPython = async function (id) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // 링크에서 ID를 추출
    id = this.parsingId(id);

    // Python 스크립트를 실행하여 보기 화면을 초기화
    const result = await mother.pythonExecute(this.pythonApp, ["sheets", "cleanView"], { id });

    // 초기화 성공 메시지를 반환
    return result.message;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets 문서에 스타일을 적용하는 메서드입니다.
 * @param {string} id - 스타일을 적용할 Google Sheets 문서의 ID
 * @param {number} sheetsIndex - 스타일을 적용할 시트의 인덱스
 * @param {Array} requests - 적용할 스타일 요청들의 배열
 * @returns {Promise<string|null>} 스타일 적용 성공 메시지 또는 오류 발생 시 null
 */
GoogleSheet.prototype.setting_styleInjection_inPython = async function (id, sheetsIndex, requests) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // 링크에서 ID를 추출
    id = this.parsingId(id);

    // Python 스크립트를 실행하여 스타일을 적용
    const result = await mother.pythonExecute(this.pythonApp, ["sheets", "styleInjection"], { id, sheetsIndex, requestArr: requests });

    // 스타일 적용 성공 메시지를 반환
    return result.message;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets의 기본 시트 이름을 업데이트하는 메서드입니다.
 * @param {string} id - 업데이트할 Google Sheets 문서의 ID
 * @param {string} title - 새로운 시트 이름
 * @returns {Promise<string|null>} 업데이트 성공 메시지 또는 오류 발생 시 null
 */
GoogleSheet.prototype.update_defaultSheetName_inPython = async function (id, title) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // 링크에서 ID를 추출
    id = this.parsingId(id);

    // Python 스크립트를 실행하여 기본 시트 이름을 업데이트
    const result = await mother.pythonExecute(this.pythonApp, ["sheets", "updateDefaultSheetName"], { id, title });

    // 업데이트 성공 메시지를 반환
    return result.message;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets 문서에 새로운 시트를 추가하는 메서드입니다.
 * @param {string} id - 시트를 추가할 Google Sheets 문서의 ID
 * @param {Array<string>} nameArr - 추가할 시트 이름들의 배열
 * @returns {Promise<string|null>} 시트 추가 성공 메시지 또는 오류 발생 시 null
 */
GoogleSheet.prototype.add_newSheet_inPython = async function (id, nameArr) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // 링크에서 ID를 추출
    id = this.parsingId(id);

    // Python 스크립트를 실행하여 새로운 시트를 추가
    const result = await mother.pythonExecute(this.pythonApp, ["sheets", "addSheet"], { id, nameArr });

    // 시트 추가 성공 메시지를 반환
    return result.message;
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 null을 반환
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets 문서에서 특정 범위의 값을 가져오는 메서드입니다.
 * 여러 번 시도하여 값을 가져오며, 실패 시 최대 4번 재시도합니다.
 * @param {string} id - 값을 가져올 Google Sheets 문서의 ID
 * @param {string} range - 값을 가져올 범위 (예: "Sheet1!A1:C10")
 * @returns {Promise<Array|null>} 범위 내의 값 또는 오류 발생 시 빈 배열
 */
GoogleSheet.prototype.get_value_inPython = async function (id, range) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  // Mother 클래스의 sleep 메서드를 불러옴 (재시도 전 대기 시간)
  const { sleep } = this.mother;

  try {
    let result;

    // 링크에서 ID를 추출
    id = this.parsingId(id);

    // Python 스크립트를 실행하여 값을 가져옴
    result = await mother.pythonExecute(this.pythonApp, ["sheets", "get"], { id, range });

    // 결과가 배열이 아닌 경우 최대 4번 재시도
    if (!Array.isArray(result)) {
      await sleep(3000);
      result = await mother.pythonExecute(this.pythonApp, ["sheets", "get"], { id, range });
      if (!Array.isArray(result)) {
        await sleep(3000);
        result = await mother.pythonExecute(this.pythonApp, ["sheets", "get"], { id, range });
        if (!Array.isArray(result)) {
          await sleep(3000);
          result = await mother.pythonExecute(this.pythonApp, ["sheets", "get"], { id, range });
          if (!Array.isArray(result)) {
            // 모든 시도에서 실패하면 오류를 발생시킴
            throw new Error("fail read");
          } else {
            return result;
          }
        } else {
          return result;
        }
      } else {
        return result;
      }
    } else {
      return result;
    }
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고 빈 배열을 반환
    console.log(e);
    return [];
  }
}

/**
 * Google Sheets에서 데이터를 읽어오는 메서드입니다.
 * @param {string|object} id - 읽어올 Google Sheets 문서의 ID 또는 문서 정보 객체
 * @param {string} [range="A1:ZZ"] - 값을 가져올 범위 (기본값: "A1:ZZ")
 * @returns {Promise<Matrix>} 읽어온 데이터를 Matrix 객체로 반환
 */
GoogleSheet.prototype.read = async function (id, range = "A1:ZZ") {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  /**
   * 2차원 배열을 다루는 Matrix 클래스
   * @class
   * @extends Array
   */
  class Matrix extends Array {
    /**
     * @constructor
     * @param {Array} arr - 초기화할 배열
     */
    constructor(arr) {
      super(); // Array 클래스를 확장하므로 부모 클래스의 생성자를 호출

      let tempArr, max, columnIndex;
      let testArr, typeArr_raw, typeArr;
      let hiddenProperty;

      // 배열이 2차원 배열인지 검사
      if (Array.isArray(arr) && arr.length > 1 && arr.every((obj) => { return Array.isArray(obj); })) {
        // 각 서브 배열의 길이를 비교하여 가장 긴 배열의 길이를 찾음
        tempArr = arr.map((a) => { return a.length });
        tempArr.sort((a, b) => { return b - a; });
        max = tempArr[0];

        // 모든 서브 배열의 길이를 가장 긴 배열의 길이와 동일하게 맞춤
        for (let array of arr) {
          if (array.length !== max) {
            do {
              array.push('');
            } while (array.length !== max);
          }
        }

        // 배열 요소의 값을 필터링하여 숫자, 날짜, 문자열 등의 타입을 설정
        arr = arr.map((a) => {
          return a.map((s) => {
            let filtered;
            let tempArr0, tempArr1, tempArr2;
            if (typeof s === "string") {
              filtered = s.replace(/\n/g, '').trim();
              if (/[0-9]/gi.test(filtered)) {
                if (filtered.replace(/^\-/gi, '').replace(/[0-9\. ]/gi, '') === '') {
                  return Number(filtered.replace(/ /gi, ''));
                }
              }
              if (/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/i.test(filtered)) {
                tempArr0 = filtered.split('-');
                return new Date(Number(tempArr0[0]), Number(tempArr0[1]) - 1, Number(tempArr0[2]));
              }
              if (/[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}/i.test(filtered)) {
                tempArr0 = filtered.split(' ');
                tempArr1 = tempArr0[0].split('-');
                tempArr2 = tempArr0[1].split(':');
                return new Date(Number(tempArr1[0]), Number(tempArr1[1]) - 1, Number(tempArr1[2]), Number(tempArr2[0]), Number(tempArr2[1]), Number(tempArr2[2]));
              }
              if (filtered === '-') {
                return null;
              }
              if (filtered === '') {
                return null;
              } else {
                return filtered;
              }
            } else {
              return s;
            }
          });
        });

        // 유효한 열 인덱스를 찾음
        columnIndex = arr.findIndex((a) => { return a.every((s) => { return s !== null }) });
        if (columnIndex === -1) {
          throw new Error("invalid matrix");
        }

        // 배열을 유효한 데이터가 있는 부분부터 슬라이스
        arr = arr.slice(columnIndex);

        // 배열의 타입을 결정
        testArr = arr.slice(1);
        if (testArr.length > 0) {
          typeArr_raw = [];
          for (let i = 0; i < testArr[0].length; i++) {
            tempArr = [];
            for (let a of arr) {
              if (a[i] !== null) {
                tempArr.push(a[i]);
              }
            }
            typeArr_raw.push(tempArr.slice(1));
          }

          typeArr = [];
          for (let i = 0; i < typeArr_raw.length; i++) {
            if (typeArr_raw[i].every((s) => { return s === 'O' || s === 'X'; })) {
              typeArr.push("boolean");
            } else {
              if (typeArr_raw[i].some((s) => { return typeof s === "number"; })) {
                typeArr.push("number");
              } else {
                if (typeArr_raw[i].some((s) => { return s instanceof Date; })) {
                  typeArr.push("date");
                } else {
                  typeArr.push("string");
                }
              }
            }
          }

          // 각 행의 데이터를 타입에 맞게 변환
          for (let i = 1; i < arr.length; i++) {
            arr[i] = arr[i].map((j, index) => {
              if (typeArr[index] === "string") {
                if (typeof j !== "string") {
                  return '';
                } else {
                  return j;
                }
              } else if (typeArr[index] === "number") {
                if (typeof j !== "number") {
                  return 0;
                } else {
                  return j;
                }
              } else if (typeArr[index] === "boolean") {
                if (j === 'O') {
                  return true;
                } else {
                  return false;
                }
              } else if (typeArr[index] === "date") {
                if (j instanceof Date) {
                  return j;
                } else {
                  return new Date(1800, 0, 1);
                }
              }
            });
          }

        } else {
          throw new Error("invalid matrix");
        }

        // 유효한 데이터가 있는 행만 this에 추가
        for (let i of arr) {
          if (!i.every((a) => { return a === null })) {
            this.push(i);
          }
        }

      }

      // 숨겨진 속성 설정
      hiddenProperty = ["columns", "json"];
      for (let key of hiddenProperty) {
        Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          writable: true,
          value: false
        });
      }

    }

    /**
     * 열 이름을 설정하는 메서드
     * @param {Array<string>} arr - 열 이름 배열
     */
    setColumns(arr) {
      if (!Array.isArray(arr)) {
        throw new Error("invalid input 0");
      }
      if (!arr.every((s) => { return typeof s === "string" })) {
        throw new Error("invalid input 1");
      }
      if (this.length === 0) {
        throw new Error("invalid matrix");
      }
      if (this[0].length !== arr.length) {
        throw new Error("invalid input 2");
      }
      this[0] = arr;
      this.columns = true;
    }

    /**
     * 현재 Matrix를 JSON 형식으로 변환하는 메서드
     * @returns {Matrix} JSON 형식으로 변환된 Matrix
     */
    toJson() {
      if (!this.columns) {
        throw new Error("set columns first");
      }
      let result, target, columns;
      let tempObj;

      result = new Matrix();
      columns = this[0];
      target = this.slice(1);

      for (let arr of target) {
        tempObj = {};
        for (let i = 0; i < arr.length; i++) {
          tempObj[columns[i]] = arr[i];
        }
        result.push(tempObj);
      }

      result.columns = true;
      result.json = true;

      return result;
    }

    /**
     * Matrix의 내용을 로그로 출력하는 메서드
     */
    log() {
      console.log(this);
    }

    /**
     * JSON 형식의 데이터를 표 형식으로 콘솔에 출력하는 메서드
     */
    view() {
      if (!this.json) {
        throw new Error("json converting first");
      }
      console.table(this);
    }

  }

  try {
    let raw, columns, json;
    if (typeof id === "string") {
      // id가 문자열인 경우 해당 ID로 Google Sheets 데이터를 읽어와 Matrix 객체로 반환
      return new Matrix(await this.get_value_inPython(id, range));
    } else if (typeof id === "object" && id !== null) {
      // id가 객체인 경우 객체의 id 속성을 사용하여 Google Sheets 데이터를 읽어옴
      if (typeof id.id !== "string") {
        throw new Error("invalid input");
      }
      if (typeof id.range === "string") {
        range = id.range;
      }
      raw = new Matrix(await this.get_value_inPython(id.id, range));
      if (Array.isArray(id.columns)) {
        raw.setColumns(id.columns);
      }
      if (id.json === false) {
        return raw;
      } else {
        return raw.toJson();
      }
    } else {
      throw new Error("invalid input");
    }
  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지를 출력
    console.log(e);
  }
}

/**
 * Python 스크립트를 사용하여 Google Sheets의 특정 범위에 값을 업데이트하는 메서드입니다.
 * @param {string} id - 값을 업데이트할 Google Sheets 문서의 ID
 * @param {string} sheetName - 값을 업데이트할 시트의 이름
 * @param {Array<Array>} values - 업데이트할 값들의 2차원 배열
 * @param {Array<number>} [startPoint=[0, 0]] - 값을 삽입할 시작 지점의 좌표 (기본값: [0, 0])
 * @returns {Promise<Object|null>} 업데이트 결과를 반환하거나, 값이 없을 경우 null을 반환
 */
GoogleSheet.prototype.update_value_inPython = async function (id, sheetName, values, startPoint = [0, 0]) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    let range, result;

    // startPoint가 배열이 아닌 경우 오류를 발생시킴
    if (!Array.isArray(startPoint)) {
      throw new Error("invalid start point");
    }

    // 업데이트할 값이 있는지 확인
    if (values.length > 0) {
      // 시작 셀 주소와 끝 셀 주소를 사용해 범위를 설정
      range = sheetName + "!";
      range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
      range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);

      // ID를 파싱하여 유효한 형식으로 변환
      id = this.parsingId(id);

      // Python 스크립트를 실행하여 값을 업데이트하고 결과를 반환
      result = await mother.pythonExecute(this.pythonApp, ["sheets", "update"], { id, range, values });
      return result;
    } else {
      // 값이 없는 경우 null을 반환
      return null;
    }
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e);
    return null;
  }
}

/**
 * Python 스크립트를 사용하여 여러 시트에 값을 업데이트하는 메서드입니다.
 * @param {string} id - 값을 업데이트할 Google Sheets 문서의 ID
 * @param {Array<Object>} sheetsTargets - 시트 이름과 값을 포함한 객체들의 배열
 * @param {Array<number>} startPoint - 값을 삽입할 시작 지점의 좌표
 * @returns {Promise<string|null>} 업데이트 성공 시 "success" 메시지 반환, 오류 발생 시 null 반환
 */
GoogleSheet.prototype.update_values_inPython = async function (id, sheetsTargets, startPoint) {
  // 현재 인스턴스를 instance 변수에 저장
  const instance = this;

  // Mother 클래스의 인스턴스를 mother 변수에 저장
  const mother = this.mother;

  try {
    // ID가 문자열이 아닌 경우 오류를 발생시킴
    if (typeof id !== "string") {
      throw new Error("invalid id");
    }

    // sheetsTargets가 배열이 아닌 경우 오류를 발생시킴
    if (!Array.isArray(sheetsTargets)) {
      throw new Error("multiple value must be [ { sheets, matrix }... ]");
    }

    // 각 요소가 올바른 형식인지 확인
    for (let i = 0; i < sheetsTargets.length; i++) {
      if (typeof sheetsTargets[i] !== "object") {
        throw new Error("multiple value must be [ { sheets, matrix }... ]");
      }
      if (sheetsTargets[i].sheets === undefined || sheetsTargets[i].matrix === undefined) {
        throw new Error("multiple value must be [ { sheets, matrix }... ]");
      }
    }

    // 업데이트할 시트와 값이 있는지 확인
    if (sheetsTargets.length > 0) {
      // ID를 파싱하여 유효한 형식으로 변환
      id = this.parsingId(id);

      // 각 시트에 값을 업데이트
      for (let { sheets: sheetsName, matrix } of sheetsTargets) {
        await this.update_value_inPython(id, sheetsName, matrix, startPoint);
      }

      // 성공 메시지 반환
      return "success";
    } else {
      // 업데이트할 값이 없는 경우 null 반환
      return null;
    }
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력
    console.log(e);
    return null;
  }
}

module.exports = GoogleSheet;
