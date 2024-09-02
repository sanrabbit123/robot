/**
 * @class ReadDocuments
 * @description 이 클래스는 다양한 문서 파일(.docx, .doc 등)을 읽어 문자열로 변환하고 파일의 메타데이터와 함께 반환하는 기능을 제공합니다.
 * @param {Mother|null} mother - Mother 클래스의 인스턴스, null일 경우 생성자에서 자동으로 생성됩니다.
 * @param {BackMaker|null} back - BackMaker 클래스의 인스턴스, null일 경우 생성자에서 자동으로 생성됩니다.
 * @param {Object|null} address - 주소 정보 객체, null일 경우 생성자에서 자동으로 로드됩니다.
 */
const ReadDocuments = function (mother = null, back = null, address = null) {
  
  // 만약 mother, back, address가 null이 아니라면(즉, 외부에서 주입된 값이 있다면)
  if (mother !== null && back !== null && address !== null) {
    // 외부에서 주입된 mother 인스턴스를 현재 객체의 mother 속성에 할당합니다.
    this.mother = mother;
    
    // 외부에서 주입된 back 인스턴스를 현재 객체의 back 속성에 할당합니다.
    this.back = back;
    
    // 외부에서 주입된 address 객체를 현재 객체의 address 속성에 할당합니다.
    this.address = address;
  } else {
    // 만약 주입된 인스턴스나 객체가 없다면, 필요한 모듈들을 로드합니다.
    
    // 현재 작업 디렉토리의 apps 폴더에서 Mother 클래스 모듈을 로드합니다.
    const Mother = require(process.cwd() + "/apps/mother.js");
    
    // 현재 작업 디렉토리의 apps/backMaker 폴더에서 BackMaker 클래스 모듈을 로드합니다.
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    
    // 현재 작업 디렉토리의 apps 폴더에서 ADDRESS 객체를 로드합니다.
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    
    // 로드한 Mother 클래스의 인스턴스를 생성하여 현재 객체의 mother 속성에 할당합니다.
    this.mother = new Mother();
    
    // 로드한 BackMaker 클래스의 인스턴스를 생성하여 현재 객체의 back 속성에 할당합니다.
    this.back = new BackMaker();
    
    // 로드한 ADDRESS 객체를 현재 객체의 address 속성에 할당합니다.
    this.address = ADDRESS;
  }
  
  // 현재 작업 디렉토리의 apps 폴더 내 readDocuments 폴더 경로를 dir 속성에 할당합니다.
  this.dir = process.cwd() + "/apps/readDocuments";
  
  // readDocuments 폴더 내 module 폴더 경로를 moduleDir 속성에 할당합니다.
  this.moduleDir = this.dir + "/module";
  
  // fs/promises 모듈에서 stat 함수를 로드합니다.
  const { stat } = require("fs/promises");
  
  // 로드한 stat 함수를 현재 객체의 stat 속성에 할당합니다.
  this.stat = stat;
}

/**
 * @method readDocx
 * @description 주어진 .docx 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .docx 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readDocx = async function (fileName) {
  
  // 현재의 this 객체를 instance 변수에 할당합니다. (참조 유지용)
  const instance = this;
  
  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당합니다.
  const { moduleDir, stat } = this;
  
  // moduleDir 경로에 있는 readDocx.js 모듈을 require하여 가져옵니다.
  const readDocx = require(moduleDir + "/readDocx.js");
  
  try {
    // 파일의 상태 정보를 비동기로 가져옵니다.
    const raw = await stat(fileName);
    
    // readDocx 모듈을 사용하여 파일 내용을 비동기로 읽어옵니다.
    const text = await readDocx(fileName);
    
    // 파일의 메타데이터와 내용을 담을 result 객체를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 세팅합니다.
    result = {
      // 파일의 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],
      
      // 파일 타입을 docx로 명시합니다.
      type: "docx",
      
      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      
      // 파일의 크기 정보를 size 속성에 객체로 할당합니다.
      size: {
        // 바이트 단위의 파일 크기를 할당합니다.
        bytes: raw.size,
        
        // 킬로바이트 단위로 변환하여 할당합니다.
        kb: raw.size / 1024,
        
        // 메가바이트 단위로 변환하여 할당합니다.
        mb: (raw.size / 1024) / 1024,
      },
      
      // 파일의 날짜 정보를 date 속성에 객체로 할당합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 할당합니다.
        birth: raw.birthtime,
        
        // 마지막 접근 및 수정 날짜를 last 속성에 객체로 할당합니다.
        last: {
          // 마지막 접근 시간을 access 속성에 할당합니다.
          access: raw.atime,
          
          // 마지막 수정 시간을 modification 속성에 할당합니다.
          modification: raw.mtime,
        }
      },
      
      // 파일의 내용을 body 속성에 할당합니다.
      body: text
    };

    // result 객체를 반환합니다.
    return result;
    
  } catch (e) {
    // 에러 발생 시 에러를 콘솔에 출력합니다.
    console.log(e);
    
    // 에러 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readDoc
 * @description 주어진 .doc 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .doc 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readDoc = async function (fileName) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // moduleDir 경로에 있는 readDoc.js 모듈을 require하여 읽어옵니다.
  const readDoc = require(moduleDir + "/readDoc.js");

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // readDoc 모듈을 사용하여 .doc 파일의 내용을 비동기로 읽어옵니다.
    const text = await readDoc(fileName);

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 저장합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "doc"으로 설정합니다.
      type: "doc",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 파일의 내용을 body 속성에 저장합니다.
      body: text
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readPptx
 * @description 주어진 .pptx 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .pptx 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readPptx = async function (fileName) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // moduleDir 경로에 있는 readPptx.js 모듈을 require하여 읽어옵니다.
  const readPptx = require(moduleDir + "/readPptx.js");

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // readPptx 모듈을 사용하여 .pptx 파일의 내용을 비동기로 읽어옵니다.
    const text = await readPptx(fileName);

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 저장합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "pptx"으로 설정합니다.
      type: "pptx",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 파일의 내용을 body 속성에 저장합니다.
      body: text
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readPdf
 * @description 주어진 .pdf 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .pdf 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readPdf = async function (fileName) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // Mother 클래스에서 제공하는 shellExec, uniqueValue, fileSystem 메서드를 구조 분해 할당합니다.
  // shellExec는 쉘 명령어를 실행하는 메서드입니다.
  // uniqueValue는 고유한 값을 생성하는 메서드입니다.
  // fileSystem은 파일 시스템 작업을 수행하는 메서드입니다.
  const { shellExec, uniqueValue, fileSystem } = this.mother;

  // moduleDir 경로에 있는 readPdf.js 모듈을 require하여 읽어옵니다.
  const readPdf = require(moduleDir + "/readPdf.js");

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // 임시 파일의 이름을 고유한 값으로 설정합니다.
    const tempFileName = `${process.cwd()}/temp/__pdftotext__${uniqueValue("hex")}`;

    // 결과와 파일 내용을 저장할 변수를 선언합니다.
    let result, text;

    try {
      // shellExec를 사용하여 pdftotext 명령어를 실행하여 PDF 파일을 텍스트로 변환하고 임시 파일에 저장합니다.
      await shellExec("pdftotext", ["-q", fileName, tempFileName]);

      // fileSystem 메서드를 사용하여 임시 파일에서 텍스트 내용을 읽어옵니다.
      text = await fileSystem("readString", [tempFileName]);

      // shellExec를 사용하여 임시 파일을 삭제합니다.
      await shellExec("rm", ["-rf", tempFileName]);

    } catch {
      // 변환 과정에서 오류가 발생한 경우, 텍스트 내용을 빈 문자열로 설정합니다.
      text = "";
    }

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "pdf"로 설정합니다.
      type: "pdf",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 변환된 파일의 내용을 body 속성에 저장합니다.
      body: text,
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readHwp
 * @description 주어진 .hwp 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .hwp 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readHwp = async function (fileName) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // moduleDir 경로에 있는 readHwp.js 모듈을 require하여 읽어옵니다.
  const readHwp = require(moduleDir + "/readHwp.js");

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // readHwp 모듈을 사용하여 .hwp 파일의 내용을 비동기로 읽어옵니다.
    const text = await readHwp(fileName);

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 저장합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "hwp"로 설정합니다.
      type: "hwp",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 파일의 내용을 body 속성에 저장합니다.
      body: text
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readXlsx
 * @description 주어진 .xlsx 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .xlsx 파일의 경로입니다.
 * @param {string|null} sheetsName - 읽을 특정 시트의 이름 (옵션). null인 경우 모든 시트를 읽습니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readXlsx = async function (fileName, sheetsName = null) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // moduleDir 경로에 있는 readXlsx.js 모듈을 require하여 읽어옵니다.
  const readXlsx = require(moduleDir + "/readXlsx.js");

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // readXlsx 모듈을 사용하여 .xlsx 파일의 내용을 비동기로 읽어옵니다.
    // 특정 시트 이름이 제공되면 해당 시트만, 그렇지 않으면 모든 시트를 읽어옵니다.
    const matrix = await readXlsx(fileName, sheetsName);

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 저장합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "xlsx"로 설정합니다.
      type: "xlsx",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 읽어온 파일의 내용을 body 속성에 저장합니다.
      // 이 내용은 행렬 형태로, 각 시트의 데이터를 포함합니다.
      body: matrix
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readTxt
 * @description 주어진 .txt 파일을 읽어 파일의 메타데이터와 내용을 반환하는 비동기 메서드입니다.
 * @param {string} fileName - 읽을 .txt 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 에러 발생 시 null을 반환합니다.
 */
ReadDocuments.prototype.readTxt = async function (fileName) {

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  // 현재 객체의 moduleDir과 stat 속성을 구조 분해 할당하여 변수에 저장합니다.
  const { moduleDir, stat } = this;

  // Mother 클래스에서 제공하는 fileSystem 메서드를 구조 분해 할당합니다.
  // fileSystem 메서드는 파일 시스템 작업을 처리하는 데 사용됩니다.
  const { fileSystem } = this.mother;

  try {
    // 파일의 상태 정보를 비동기로 가져옵니다. (파일의 크기, 생성일, 수정일 등)
    const raw = await stat(fileName);

    // fileSystem 메서드를 사용하여 .txt 파일의 내용을 비동기로 읽어옵니다.
    const body = await fileSystem('readString', [fileName]);

    // 파일의 메타데이터와 내용을 담을 객체 result를 선언합니다.
    let result;

    // result 객체에 파일의 정보를 저장합니다.
    result = {
      // 파일 경로에서 파일명만 추출하여 name 속성에 할당합니다.
      name: fileName.split("/")[fileName.split("/").length - 1],

      // 파일 타입을 "txt"로 설정합니다.
      type: "txt",

      // 파일의 확장자를 추출하여 exe 속성에 할당합니다.
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],

      // 파일의 크기 정보를 size 속성에 객체로 저장합니다.
      size: {
        // 파일 크기를 바이트 단위로 저장합니다.
        bytes: raw.size,

        // 파일 크기를 킬로바이트 단위로 변환하여 저장합니다.
        kb: raw.size / 1024,

        // 파일 크기를 메가바이트 단위로 변환하여 저장합니다.
        mb: (raw.size / 1024) / 1024,
      },

      // 파일의 날짜 정보를 date 속성에 객체로 저장합니다.
      date: {
        // 파일의 생성 날짜를 birth 속성에 저장합니다.
        birth: raw.birthtime,

        // 파일의 마지막 접근 시간과 수정 시간을 last 속성에 객체로 저장합니다.
        last: {
          // 파일의 마지막 접근 시간을 access 속성에 저장합니다.
          access: raw.atime,

          // 파일의 마지막 수정 시간을 modification 속성에 저장합니다.
          modification: raw.mtime,
        }
      },

      // 읽어온 파일의 내용을 body 속성에 저장합니다.
      body: body
    };

    // result 객체를 반환합니다.
    return result;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);

    // 예외 발생 시 null을 반환합니다.
    return null;
  }
}

/**
 * @method readFile
 * @description 주어진 파일 경로에 따라 파일의 유형을 판별하고 적절한 메서드를 호출하여 파일의 내용을 읽어오는 비동기 메서드입니다.
 * @param {string} filePath - 읽을 파일의 경로입니다.
 * @returns {Promise<Object|null>} 파일의 메타데이터와 내용을 포함한 객체를 반환하며, 지원하지 않는 파일 형식의 경우 null을 반환합니다.
 * @throws {Error} 파일 경로가 문자열이 아닌 경우 오류를 발생시킵니다.
 */
ReadDocuments.prototype.readFile = async function (filePath) {

  // 파일 경로가 문자열이 아닌 경우, 오류를 발생시킵니다.
  if (typeof filePath !== "string") {
    throw new Error("invalid input");
  }

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  try {
    // 파일 이름과 확장자를 저장할 변수를 선언합니다.
    let fileName, exe;

    // 파일 경로에서 파일 이름을 추출합니다.
    fileName = filePath.split("/")[filePath.split("/").length - 1];

    // 파일 이름에서 확장자를 추출하고, 공백을 제거한 후 소문자로 변환합니다.
    exe = fileName.split(".")[fileName.split(".").length - 1].trim().toLowerCase();

    // 확장자에 따라 적절한 메서드를 호출하여 파일을 읽어옵니다.
    if (exe === "docx") {
      return this.readDocx(filePath); // .docx 파일 읽기
    } else if (exe === "doc") {
      return this.readDoc(filePath); // .doc 파일 읽기
    } else if (exe === "pptx") {
      return this.readPptx(filePath); // .pptx 파일 읽기
    } else if (exe === "pdf") {
      return this.readPdf(filePath); // .pdf 파일 읽기
    } else if (exe === "hwp") {
      return this.readHwp(filePath); // .hwp 파일 읽기
    } else if (exe === "xlsx") {
      return this.readXlsx(filePath); // .xlsx 파일 읽기
    } else if (exe === "txt") {
      return this.readTxt(filePath); // .txt 파일 읽기
    } else {
      return null; // 지원하지 않는 파일 형식인 경우 null 반환
    }

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력하고, null을 반환합니다.
    console.log(e);
    return null;
  }
}

/**
 * @method readFiles
 * @description 주어진 파일 경로 배열을 순차적으로 처리하여 각 파일의 내용을 읽어오는 비동기 메서드입니다.
 * @param {Array<string>} fileArr - 읽을 파일 경로들의 배열입니다.
 * @returns {Promise<Array<Object|null>>} 각 파일의 메타데이터와 내용을 포함한 객체의 배열을 반환하며, 지원하지 않는 파일 형식의 경우 null을 반환합니다.
 * @throws {Error} 파일 배열이 배열이 아니거나, 배열의 모든 요소가 문자열이 아닌 경우 오류를 발생시킵니다.
 */
ReadDocuments.prototype.readFiles = async function (fileArr) {

  // 입력된 값이 배열이 아닌 경우, 오류를 발생시킵니다.
  if (!Array.isArray(fileArr)) {
    throw new Error("invalid input");
  }

  // 배열의 모든 요소가 문자열이 아닌 경우, 오류를 발생시킵니다.
  if (!fileArr.every((str) => { return (typeof str === "string") })) {
    throw new Error("invalid input 2");
  }

  // 현재 객체의 참조를 instance 변수에 할당합니다. (내부 함수에서 this를 유지하기 위해 사용)
  const instance = this;

  try {
    // 결과를 저장할 배열과 임시 객체를 선언합니다.
    let resultArr;
    let obj;

    // 결과 배열을 초기화합니다.
    resultArr = [];

    // 파일 경로 배열을 순회하며 각 파일을 처리합니다.
    for (let str of fileArr) {
      // 각 파일을 읽어온 후 결과 배열에 추가합니다.
      obj = await this.readFile(str);
      resultArr.push(obj);
    }

    // 결과 배열을 반환합니다.
    return resultArr;

  } catch (e) {
    // 예외가 발생하면 에러 내용을 콘솔에 출력합니다.
    console.log(e);
  }
}

module.exports = ReadDocuments;

