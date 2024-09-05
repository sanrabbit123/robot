/**
 * DataConsole 클래스는 서버 애플리케이션의 디렉토리 구조와 관련된 설정을 관리하고,
 * Mother 및 BackMaker 클래스와 같은 중요한 종속성을 초기화합니다.
 * 
 * @class DataConsole
 */

class DataConsole {
  /**
   * DataConsole 클래스의 생성자입니다. 애플리케이션의 주요 디렉토리를 설정하고,
   * Mother 및 BackMaker 클래스 인스턴스를 생성하여 다양한 유틸리티 및 데이터 관련 기능을 사용합니다.
   * 
   * @constructor
   */
  constructor() {
    /**
     * Mother 클래스는 데이터베이스 연결, 파일 처리, 쉘 명령 실행 등 다양한 유틸리티 기능을 제공합니다.
     * @requires Mother
     */
    const Mother = require(`${process.cwd()}/apps/mother.js`);
    
    /**
     * BackMaker 클래스는 데이터 생성, 초기화 및 관련 백엔드 작업을 처리하는 모듈입니다.
     * @requires BackMaker
     */
    const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

    /**
     * address는 서버의 네트워크 정보 및 기타 환경 설정을 포함한 정보 객체입니다.
     * 이를 통해 애플리케이션의 호스트 정보 등을 관리합니다.
     * 
     * @type {Object}
     */
    this.address = require(`${process.cwd()}/apps/infoObj.js`);

    /**
     * Mother 클래스의 인스턴스를 생성합니다. 이 인스턴스는 MongoDB 연결 상태 확인, 파일 시스템 접근,
     * 쉘 명령 실행 등의 다양한 기능을 제공합니다.
     * 
     * @type {Mother}
     */
    this.mother = new Mother();

    /**
     * BackMaker 클래스의 인스턴스를 생성합니다. 이 인스턴스는 데이터베이스 초기화 및 백엔드 데이터 관리 작업을 수행합니다.
     * 
     * @type {BackMaker}
     */
    this.back = new BackMaker();

    /**
     * 현재 작업 디렉토리를 기준으로 DataConsole 애플리케이션의 경로를 설정합니다.
     * 
     * @type {string}
     */
    this.dir = process.cwd() + "/apps/dataConsole";

    /**
     * 라우팅 소스 파일들이 저장된 디렉토리의 경로를 설정합니다.
     * 이 디렉토리에는 DataConsole의 주요 라우팅 로직이 포함됩니다.
     * 
     * @type {string}
     */
    this.sourceDir = this.dir + "/router/source";

    /**
     * 미들웨어 관련 파일이 저장된 디렉토리의 경로를 설정합니다.
     * 이 디렉토리에는 중간처리 모듈들이 저장됩니다.
     * 
     * @type {string}
     */
    this.middleDir = this.sourceDir + "/middle";

    /**
     * Ghost 관련 파일들이 저장된 디렉토리의 경로를 설정합니다.
     * 이 디렉토리는 백엔드 관련 로직을 처리하는 데 사용될 수 있습니다.
     * 
     * @type {string}
     */
    this.ghostDir = this.sourceDir + "/ghost";

    /**
     * 프론트엔드 관련 파일들이 저장된 디렉토리의 경로를 설정합니다.
     * 이 디렉토리는 클라이언트 측 로직과 관련된 파일들을 포함합니다.
     * 
     * @type {string}
     */
    this.frontDir = this.sourceDir + "/front";

    /**
     * 미들웨어 모듈 파일들이 저장된 디렉토리의 경로를 설정합니다.
     * 미들웨어 모듈은 중간단계에서 데이터를 처리하는 데 사용됩니다.
     * 
     * @type {string}
     */
    this.middleModuleDir = this.middleDir + "/module";
  }
}

/**
 * 프론트엔드 자바스크립트 파일을 컴파일하고 해당 파일들을 지정된 디렉토리에 배포하는 함수입니다.
 * 파일 시스템을 사용해 여러 작업을 수행하며, 이를 통해 정적 자원을 설정하고 구성합니다.
 * 
 * @async
 * @function
 * @param {string} staticFolder - 정적 자원을 저장할 폴더 경로입니다.
 * @returns {Promise<Array>} - 설정된 정적 파일들의 경로 목록을 반환합니다.
 */
DataConsole.prototype.renderStatic = async function (staticFolder) {
  // 현재 클래스 인스턴스를 instance로 참조합니다. 비동기 함수 내부에서 this를 잃지 않기 위함입니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem, shellExec, shellLink, sleep, mediaQuery, uniqueValue } = this.mother;

  // 다양한 호스트 정보들을 설정합니다. 이는 S3, 파일 서버, 로그 서버 등 다양한 서버에 대한 URL을 정의합니다.
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const BRIDGEHOST = "https://" + this.address.secondinfo.host + ":3003";
  const PYTHONHOST = "https://" + this.address.officeinfo.host + ":3002";
  const LOGHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.officeinfo.host + ":3002";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3003";
  const CONTENTSHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const CONSTRUCTHOST = "https://" + this.address.officeinfo.construct.host + "";
  const NUMBERSHOST = "https://" + this.address.officeinfo.numbers.host + "";

  // 예외 처리를 위한 클래스 예외 리스트입니다. 특정 클래스 파일에 대한 예외 처리를 정의합니다.
  const classException = {
    proposal: [ "designer.js" ],
    bill: [ "designer.js" ],
  };

  try {
    // 정적 자원 작업을 시작합니다. worker와 module 디렉토리 및 파일들을 설정하고 처리합니다.
    const workerName = "worker";
    const moduleName = "module";
    const staticDir = `${this.dir}/router/source/local`;
    
    // 파일 시스템을 통해 staticDir에서 모든 파일 목록을 가져옵니다.
    const staticDirList_raw = await fileSystem(`readDir`, [ staticDir ]);

    // .DS_Store 및 module을 제외한 파일 목록을 필터링하여 최종 staticDirList를 만듭니다.
    const staticDirList = staticDirList_raw.filter((fileName) => { return !(([ ".DS_Store", moduleName ]).includes(fileName)); });

    // 홈 디렉토리의 파일 목록을 가져옵니다.
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);
    let tempScriptString;  // 임시로 스크립트 내용을 저장하는 변수입니다.
    let tempMediaResult;  // 미디어 쿼리 처리 결과를 저장할 변수입니다.

    // 정적 폴더가 홈 디렉토리에 없으면 새로 생성합니다.
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      await shellExec(`mkdir ${shellLink(staticFolder)}`);
    }

    // 정적 폴더의 파일 목록을 가져옵니다.
    const staticFolderList = await fileSystem(`readDir`, [ staticFolder ]);

    // 모듈 폴더가 있으면 삭제 후 재생성합니다.
    if (staticFolderList.includes(moduleName)) {
      await shellExec(`rm -rf ${shellLink(staticFolder)}/${shellLink(moduleName)}`);
    }
    await shellExec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}`);

    // worker 폴더가 있으면 삭제하고 새롭게 복사합니다.
    if (staticFolderList.includes(workerName)) {
      await shellExec(`rm -rf ${shellLink(staticFolder)}/${shellLink(workerName)}`);
    }
    await shellExec(`cp -r ${shellLink(this.dir)}/router/source/general/worker ${shellLink(staticFolder)}`);

    // 모듈 폴더의 파일 목록을 가져옵니다.
    const staticModuleFolderList = await fileSystem(`readDir`, [ staticFolder + "/" + moduleName ]);

    // staticDirList에 있는 파일들 중 모듈 폴더에 포함되지 않은 파일에 대해 새 폴더를 생성합니다.
    for (let i of staticDirList) {
      if (!staticModuleFolderList.includes(i.replace(/\.js/gi, ''))) {
        await shellExec(`mkdir ${shellLink(staticFolder)}/${shellLink(moduleName)}/${shellLink(i.replace(/\.js/gi, ''))}`);
      }
    }

    // 각 파일을 읽고 필요한 경우 수정 및 복사를 진행합니다.
    for (let i of staticDirList) {
      // 스크립트 내용을 읽어옵니다.
      tempScriptString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);

      // 정규 표현식을 사용해 특정 패턴을 함수 생성자로 변환합니다.
      tempScriptString = tempScriptString.replace(/^const ([A-Z][^ \=]+) = function \(/, (match, p1, offset, string) => {
        return p1 + ".prototype.constructor = function (";
      });

      // launching 메서드를 launching_pastFunction으로 변경합니다.
      tempScriptString = tempScriptString.replace(/\.prototype\.launching = /g, ".prototype.launching_pastFunction = ");

      // 스크립트에 미디어 쿼리 태그가 있을 경우, mediaQuery 메서드를 사용해 처리합니다.
      if (/<%%/gi.test(tempScriptString)) {
        tempMediaResult = mediaQuery(tempScriptString);
        tempScriptString = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      // 파일이 존재하지 않을 경우, 파일을 생성할 때까지 대기합니다.
      while (!(await fileSystem(`exist`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}` ]))) {
        console.log("waiting....");
        await sleep(500);  // 0.5초 대기
      }

      // 파일을 씁니다.
      await fileSystem(`write`, [ `${staticFolder}/${moduleName}/${i.replace(/\.js/gi, '')}/${i}`, tempScriptString ]);
    }

    // 여러 스크립트 문자열을 미리 준비합니다.
    let svgTongString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, classString, pythonString, bridgeString, frontWebString, officeString, logString, backString, secondString, contentsString, constructString;
    let numbersString, parserString;
    let code0, code1, code2, code3;
    let result;
    let resultFromArr;

    // S3 호스트와 같은 다양한 문자열을 설정합니다.
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    contentsString = "const CONTENTSHOST = \"" + CONTENTSHOST + "\";";
    constructString = "const CONSTRUCTHOST = \"" + CONSTRUCTHOST + "\";";
    numbersString = "const NUMBERSHOST = \"" + NUMBERSHOST + "\";";
    parserString = "";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";

    // svgTong 및 기타 파일 내용을 불러옵니다.
    svgTongString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);

    // 결과 배열을 초기화합니다.
    resultFromArr = [];

    // staticDirList의 각 파일을 순회하며, 파일 내용을 처리합니다.
    for (let i of staticDirList) {
      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = null;

      // exec.js 파일을 읽습니다.
      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/exec.js` ]);

      // 파일 이름을 대문자로 변경해 exec.js의 특정 부분을 대체합니다.
      execString = execString.replace(/\/<%name%>\//g, (i.slice(0, 1).toUpperCase() + i.replace(/\.js$/, '').slice(1)));

      // local 디렉토리에서 파일을 읽습니다.
      fileString = await fileSystem(`readString`, [ `${this.dir}/router/source/local/${i}` ]);

      // class 디렉토리에 해당 파일이 있는 경우 classString을 추가합니다.
      if (await fileSystem(`exist`, [ `${this.dir}/router/source/class/${i}` ])) {
        classString = await fileSystem(`readString`, [ `${this.dir}/router/source/class/${i}` ]);
        fileString = classString.replace(/module\.exports \= [^\n]+/gi, '') + "\n\n" + fileString;
      }

      // 특정 예외 파일들에 대해 추가적인 classString을 추가합니다.
      if (classException[i.replace(/\.js$/, '')] !== undefined) {
        for (let add of classException[i.replace(/\.js$/, '')]) {
          classString = await fileSystem(`readString`, [ `${this.dir}/router/source/class/${add}` ]);
          fileString = classString.replace(/module\.exports \= [^\n]+/gi, '') + "\n\n" + fileString;
        }
      }

      // 파일을 병합합니다.
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + contentsString + "\n\n" + constructString + "\n\n" + numbersString + "\n\n" + parserString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "";
      code2 = consoleGeneralString;
      code3 = fileString + "\n\n" + execString;

      // 미디어 쿼리를 적용합니다.
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2);
        code2 = tempMediaResult.code;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
        code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
      }

      // 결과를 최종적으로 병합합니다.
      result = '';
      result += code0;
      result += "\n\n";
      if (svgTongItemsString !== null) {
        result += svgTongItemsString;
        result += "\n\n";
      }
      result += code1;
      result += "\n\n";
      result += code2;
      result += "\n\n";
      result += code3;
      result += "\n\n";

      // 파일이 성공적으로 병합되었음을 출력합니다.
      console.log(`${i} merge success`);

      // 파일을 씁니다.
      await fileSystem(`write`, [ `${staticFolder}/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/${i}`);
    }

    // 최종적으로 파일들의 경로 목록을 반환합니다.
    return resultFromArr;

  } catch (e) {
    // 오류가 발생한 경우 오류를 출력합니다.
    console.log(e);
  }
}

/**
 * 프론트엔드와 관련된 자바스크립트 파일을 처리하고, 미들웨어 정적 파일을 설정하는 함수입니다.
 * 이 함수는 Ghost 및 Designer 관련 파일을 포함한 다양한 정적 자원을 처리합니다.
 * 
 * @async
 * @function renderMiddleStatic
 * @param {string} staticFolder - 정적 자원을 저장할 폴더 경로입니다.
 * @returns {Promise<Array>} - 설정된 정적 파일들의 경로 목록을 반환합니다.
 */
DataConsole.prototype.renderMiddleStatic = async function (staticFolder) {
  // 현재 클래스 인스턴스를 instance로 참조합니다. 비동기 함수 내부에서 this를 잃지 않기 위함입니다.
  const instance = this;

  // Mother 클래스에서 제공하는 다양한 유틸리티 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem, shell, shellLink, treeParsing, mediaQuery } = this.mother;

  // 서버의 호스트 정보를 설정합니다. Ghost, 파일 서버, Python 서버 등 다양한 서버에 대한 URL을 정의합니다.
  const S3HOST = "https://" + this.address.officeinfo.ghost.host;
  const FILEHOST = this.address.officeinfo.ghost.host;
  const PYTHONHOST = "https://" + this.address.officeinfo.host + ":3002";
  const BRIDGEHOST = "https://" + this.address.secondinfo.host + ":3003";
  const LOGHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const FRONTHOST = "https://" + this.address.frontinfo.host;
  const BACKHOST = "https://" + this.address.officeinfo.host + ":3002";
  const SECONDHOST = "https://" + this.address.secondinfo.host + ":3003";
  const CONTENTSHOST = "https://" + this.address.officeinfo.ghost.host + ":3000";
  const CONSTRUCTHOST = "https://" + this.address.officeinfo.construct.host + "";
  const NUMBERSHOST = "https://" + this.address.officeinfo.numbers.host + "";

  try {
    // staticTargets 배열은 클라이언트와 디자이너 관련 Ghost 소스 파일 경로를 지정합니다.
    const staticTargets = [
      `${this.dir}/router/source/ghost/client`,
      `${this.dir}/router/source/ghost/designer`,
    ];

    // 홈 디렉토리에서 파일 목록을 읽어옵니다.
    const homeDirList = await fileSystem(`readDir`, [ process.env.HOME ]);

    // 정적 폴더가 홈 디렉토리에 없으면 새로 생성합니다.
    if (!homeDirList.includes(staticFolder.split('/')[staticFolder.split('/').length - 1])) {
      await fileSystem(`mkdir`, [ staticFolder ]);
    }

    // 대상 정적 폴더에서 파일 목록을 읽어옵니다.
    const targetStaticFolder = await fileSystem(`readDir`, [ staticFolder ]);

    // middle 폴더가 없으면 새로 생성합니다.
    if (!targetStaticFolder.includes(`middle`)) {
      await fileSystem(`mkdir`, [ `${staticFolder}/middle` ]);
    }
    console.log(`set middle static`);

    // 각 디렉토리에서 파일 목록을 읽어와 staticDirList에 저장합니다.
    let staticDirList;
    let staticTempDir, staticTempDirList_raw, staticTempDirList;
    let svgTongString, consoleGeneralString, execString, fileString, svgTongItemsString, s3String, pythonString, frontClassString, bridgeString, frontWebString, officeString, logString, backString, secondString, contentsString, constructString;
    let numbersString, parserString;
    let code0, code1, code2, code3;
    let result, moduleString;
    let totalModuleObjectConst;
    let resultFromArr;
    let tempArr;
    let tempMediaResult;
    let ghostClientGeneral, ghostDesignerGeneral;
    let ghostClientGeneralString, ghostDesignerGeneralString;
    let generalMediaBoo;
    let testHomeLiaisonAnalytics;

    staticDirList = [];

    // staticTargets 배열에 지정된 각 경로에서 파일 목록을 읽어옵니다.
    for (let s of staticTargets) {
      staticTempDir = s;
      staticTempDirList_raw = await fileSystem(`readDir`, [ staticTempDir ]);
      
      // ".DS_Store"와 "module"을 제외한 파일 목록을 필터링합니다.
      staticTempDirList_raw = staticTempDirList_raw.filter((fileName) => { return !(([ ".DS_Store", "module" ]).includes(fileName)); });

      // 각 파일의 경로와 종류를 기록합니다. (예: GHOST:CLIENT, GHOST:DESIGNER 등)
      staticTempDirList = staticTempDirList_raw.map((fileName) => { return { dir: staticTempDir, file: fileName, kinds: (/apps\/dataConsole\/router\/source\/ghost\/client/g.test(staticTempDir) ? "GHOST:CLIENT" : (/apps\/dataConsole\/router\/source\/ghost\/designer/g.test(staticTempDir) ? "GHOST:DESIGNER" : "MIDDLE")) }; });
      
      // 필터링된 파일 목록을 staticDirList에 추가합니다.
      staticDirList = staticDirList.concat(staticTempDirList);
    }

    // Ghost의 클라이언트와 디자이너 관련 일반 파일을 각각 읽어옵니다.
    ghostClientGeneralString = '';
    ghostDesignerGeneralString = '';
    for (let { kinds, dir, file } of staticDirList) {
      if (kinds === "GHOST:CLIENT" && file === "general.js") {
        ghostClientGeneral = dir + "/" + file;
        ghostClientGeneralString = await fileSystem(`readString`, [ ghostClientGeneral ]);
      } else if (kinds === "GHOST:DESIGNER" && file === "general.js") {
        ghostDesignerGeneral = dir + "/" + file;
        ghostDesignerGeneralString = await fileSystem(`readString`, [ ghostDesignerGeneral ]);
      }
    }

    // general.js 파일은 제외합니다.
    staticDirList = staticDirList.filter((obj) => { return !(obj.file === "general.js" && /^GHOST/.test(obj.kinds)); });

    // 여러 설정 변수를 미리 정의합니다.
    s3String = "const S3HOST = \"" + S3HOST + "\";";
    pythonString = "const PYTHONHOST = \"" + PYTHONHOST + "\";";
    bridgeString = "const BRIDGEHOST = \"" + BRIDGEHOST + "\";";
    logString = "const LOGHOST = \"" + LOGHOST + "\";";
    backString = "const BACKHOST = \"" + BACKHOST + "\";";
    secondString = "const SECONDHOST = \"" + SECONDHOST + "\";";
    contentsString = "const CONTENTSHOST = \"" + CONTENTSHOST + "\";";
    constructString = "const CONSTRUCTHOST = \"" + CONSTRUCTHOST + "\";";
    numbersString = "const NUMBERSHOST = \"" + NUMBERSHOST + "\";";
    parserString = "";
    frontWebString = "const FRONTHOST = \"" + FRONTHOST + "\";";
    officeString = "const FILEHOST = \"" + FILEHOST + "\";";
    svgTongString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/svgTong.js` ]);
    consoleGeneralString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/general.js` ]);

    // 각 타겟 파일에 대해 처리 작업을 수행합니다.
    console.log(`set middle target :`, staticDirList);
    resultFromArr = [];
    for (let { file: i, dir: staticDir, kinds } of staticDirList) {
      result = '';
      code0 = '';
      code1 = '';
      svgTongItemsString = '';

      // 파일을 읽습니다.
      fileString = await fileSystem(`readString`, [ `${staticDir}/${i}` ]);

      // 패치에 대한 정보가 포함되지 않으면 오류를 발생시킵니다.
      if (!/\/<%patch%>\//g.test(fileString)) {
        throw new Error("There is no patch, impossible");
      }

      // 데이터 패치를 설정합니다.
      const { class: classOnOffObj, name, route } = JSON.parse(fileString.slice(0, [ ...fileString.matchAll(/%\/%\/g/g) ][0].index).replace(/\/<%patch%>\/ /gi, ''));

      // 메타 정보를 설정합니다.
      route.unshift(name);

      // 브라우저에서 실행될 자바스크립트를 설정합니다.
      execString = await fileSystem(`readString`, [ `${this.dir}/router/source/general/middleExec.js` ]);
      execString = execString.replace(/\/<%name%>\//g, (name.slice(0, 1).toUpperCase() + name.slice(1)));

      // 파일 내용을 추가적으로 처리합니다.
      fileString = fileString.slice([ ...fileString.matchAll(/%\/%\/g/g) ][0].index + String("%/%/g").length + 1);

      // front 관련 클래스 설정을 추가합니다.
      frontClassString = '';
      for (let c in classOnOffObj) {
        if (classOnOffObj[c]) {
          frontClassString += (await fileSystem(`readString`, [ `${this.dir}/router/source/class/${c}.js` ])).replace(/module\.exports = [^\n]+/gi , '');
          frontClassString += "\n\n";
        }
      }

      // 코드 병합 작업을 수행합니다.
      code0 = svgTongString + "\n\n" + s3String + "\n\n" + pythonString + "\n\n" + bridgeString + "\n\n" + logString + "\n\n" + backString + "\n\n" + secondString + "\n\n" + contentsString + "\n\n" + constructString + "\n\n" + numbersString + "\n\n" + parserString + "\n\n" + frontWebString + "\n\n" + officeString + "\n\n";
      code1 = "" + "\n\n";
      if (kinds === "MIDDLE") {
        code2 = consoleGeneralString + "\n\n" + frontClassString + "\n\n";
      } else if (/CLIENT/gi.test(kinds)) {
        code2 = consoleGeneralString + "\n\n" + ghostClientGeneralString + "\n\n" + frontClassString + "\n\n";
      } else {
        code2 = consoleGeneralString + "\n\n" + ghostDesignerGeneralString + "\n\n" + frontClassString + "\n\n";
      }
      code3 = fileString + "\n\n" + execString;

      // 미디어 쿼리를 적용합니다.
      generalMediaBoo = false;
      if (/<%%/gi.test(code2)) {
        tempMediaResult = mediaQuery(code2);
        code2 = tempMediaResult.code + "\n\n" + tempMediaResult.conditions;
        generalMediaBoo = true;
      }
      if (/<%%/gi.test(code3)) {
        tempMediaResult = mediaQuery(code3);
        if (generalMediaBoo) {
          code3 = tempMediaResult.code;
        } else {
          code3 = tempMediaResult.conditions + "\n\n" + tempMediaResult.code;
        }
      }

      // 결과 코드를 병합합니다.
      result = '';
      result += code0;
      result += "\n\n";
      if (svgTongItemsString !== null) {
        result += svgTongItemsString;
        result += "\n\n";
      }
      result += code1;
      result += "\n\n";
      result += code2;
      result += "\n\n";
      result += code3;
      result += "\n\n";

      // 성공적으로 병합된 파일을 출력하고 저장합니다.
      console.log(`${i} merge success`);
      await fileSystem(`write`, [ `${staticFolder}/middle/${i}`, result ]);
      resultFromArr.push(`${staticFolder}/middle/${i}`);
    }

    // 최종적으로 처리된 파일 경로 목록을 반환합니다.
    return resultFromArr;

  } catch (e) {
    // 오류가 발생한 경우 이를 출력합니다.
    console.log(e);
  }
}

/**
 * HomeLiaison의 프론트 웹에 있는 PHP 파일을 컴파일하고 서버에 배포하는 함수입니다.
 * 프론트 웹은 cafe24 호스팅에서 Apache/PHP 서버를 사용하고 있으며, 각종 정적 파일 및 PHP 파일을 처리합니다.
 * 
 * @async
 * @function renderFrontPhp
 * @returns {Promise<void>} - 작업 완료 시 반환값 없이 종료됩니다.
 */
DataConsole.prototype.renderFrontPhp = async function () {
  // 현재 인스턴스를 변수로 저장하여 비동기 함수 내부에서 this를 사용합니다.
  const instance = this;

  // Mother 클래스에서 유용한 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem, shellLink, shellExec, equalJson, requestSystem, consoleQ } = this.mother;

  // 클래스 내부에서 정의된 ghostDir과 address 변수를 사용합니다.
  const { ghostDir } = this;
  const address = this.address;

  // 정적 파일을 저장할 폴더 경로를 설정합니다.
  const staticFolder = process.env.HOME + "/static";
  const staticMiddleFolder = staticFolder + "/middle";
  const frontGeneralDir = this.frontDir + "/general";
  const frontDir = this.frontDir + "/client";

  try {
    // renderMiddleStatic 메서드를 호출하여 중간 정적 자원을 처리합니다.
    await this.renderMiddleStatic(staticFolder);

    // 파일 매핑을 위한 배열로, from과 to의 이름 및 파일 경로를 정의합니다.
    const targetMap = [
      { from: "clientConsulting", to: "consulting", path: "/middle/consulting" },
      { from: "clientEvaluation", to: "evaluation", path: "/middle/evaluation" },
      { from: "aspirantExplanation", to: "aspiration", path: "/middle/aspirantExplanation" },
      { from: "aspirantSubmit", to: "aspirant", path: "/middle/aspirantSubmit" },
      { from: "aspirantNotice", to: "aspnotice", path: "/middle/aspirantNotice" },
      { from: "aspirantPayment", to: "asppayment", path: "/middle/aspirantPayment" },
      { from: "aspirantPortfolio", to: "aspportfolio", path: "/middle/aspirantPortfolio" },
      { from: "aspirantSetting", to: "aspsetting", path: "/middle/aspirantSetting" },
      { from: "aspirantInformation", to: "aspinformation", path: "/middle/aspirantInformation" },
      { from: "aspirantCommon", to: "aspcommon", path: "/middle/aspirantCommon" },
      { from: "frontIndex", to: "index", path: "/middle/frontIndex" },
      { from: "portfolioList", to: "portfolio", path: "/middle/portfolioList" },
      { from: "portfolioDetail", to: "portdetail", path: "/middle/portfolioDetail" },
      { from: "reviewList", to: "review", path: "/middle/reviewList" },
      { from: "reviewDetail", to: "revdetail", path: "/middle/reviewDetail" },
      { from: "designerList", to: "designer", path: "/middle/designerList" },
      { from: "designerDetail", to: "desdetail", path: "/middle/designerDetail" },
      { from: "frontAbout", to: "about", path: "/middle/frontAbout" },
      { from: "frontFaq", to: "faq", path: "/middle/frontFaq" },
      { from: "frontTerms", to: "terms", path: "/middle/frontTerms" },
      { from: "frontNotfound", to: "notfound", path: "/middle/frontNotfound" },
      { from: "styleCuration", to: "curation", path: "/middle/styleCuration" },
      { from: "designerProposal", to: "proposal", path: "/middle/designerProposal" },
      { from: "firstMeeting", to: "meeting", path: "/middle/firstMeeting" },
      { from: "universalEstimation", to: "estimation", path: "/middle/universalEstimation" },
      { from: "magazineDetail", to: "magdetail", path: "/middle/magazineDetail" },
      { from: "magazineList", to: "magazine", path: "/middle/magazineList" },
      { from: "aboutService", to: "magnetic", path: "/middle/aboutService" },
      { from: "contractCaution", to: "caution", path: "/middle/contractCaution" },
      { from: "styleParts", to: "styleparts", path: "/middle/styleParts" },
      { from: "projectDetail", to: "project", path: "/middle/projectDetail" },
      { from: "serviceDetail", to: "service", path: "/middle/serviceDetail" },
      { from: "firstResponse", to: "response", path: "/middle/firstResponse" },
      { from: "jobPosting", to: "job", path: "/middle/jobPosting" },
      { from: "imageTransfer", to: "transfer", path: "/middle/imageTransfer" },
      { from: "firstPayment", to: "payment", path: "/middle/firstPayment" },
    ];

    // Ghost 클라이언트 디렉토리의 파일 목록을 필터링하고 필요한 대상만 선택합니다.
    const ghostTargets = (await fileSystem(`readDir`, [ ghostDir + "/client" ])).filter((str) => { return str !== ".DS_Store" }).filter((str) => {
      const fromArr = targetMap.map((obj) => { return obj.from });
      return fromArr.includes(str.replace(/\.js$/i, ''));
    }).map((str) => {
      const o = targetMap.find((obj) => { return obj.from === str.replace(/\.js$/i, '') });
      o.file = `${staticMiddleFolder}/${str}`;
      o.php = `${frontDir}/${str.replace(/\.js$/i, ".php")}`;
      return o;
    });

    // PHP 및 JS 파일을 업데이트하고, 서버에 배포하는 과정입니다.
    let targetScript, phpScript;
    let motherTong = [];
    let middleTong = [];

    for (let { from, to, file, php, path } of ghostTargets) {
      // JS 파일을 읽고, ajaxJson 호출을 수정하여 절대 경로로 설정합니다.
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.officeinfo.host}:3002" + ${p2}`;
        }
      });

      // PHP 스크립트를 읽어옵니다.
      phpScript = await fileSystem(`readString`, [ php ]);

      // 임시로 파일을 작성합니다.
      await fileSystem(`write`, [ `${process.cwd()}/temp/${from}.js`, targetScript ]);
      middleTong.push(`${shellLink(process.cwd())}/temp/${shellLink(from)}.js`);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${to}.php`, phpScript ]);
      motherTong.push(`${shellLink(process.cwd())}/temp/${shellLink(to)}.php`);
    }

    // 명령어 목록을 만들어 서버에 파일을 복사합니다.
    let commandTong = middleTong.map((p) => {
      return `scp ${shellLink(p)} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${shellLink(p)} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/`;
    }));
    let command = commandTong.join(';');

    // general.php 파일을 업데이트하고 서버에 복사합니다.
    let generalPhpScript = await fileSystem(`readString`, [ frontDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__realHost__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__coreHost__/gi, address.officeinfo.core.ddns);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3003");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.officeinfo.host + ":3002");
    generalPhpScript = generalPhpScript.replace(/__contentsHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__constructHost__/gi, address.officeinfo.construct.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__numbersHost__/gi, address.officeinfo.numbers.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__officeIp__/gi, address.officeinfo.test.ip.outer);
    generalPhpScript = generalPhpScript.replace(/__testHost__/gi, address.officeinfo.test.host);
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);
    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`;

    // 프론트 엔드의 general 디렉토리의 파일을 업데이트하여 서버에 복사합니다.
    let generalTargets = await fileSystem(`readDir`, [ frontGeneralDir ]);
    generalTargets = generalTargets.filter((str) => { return str !== ".DS_Store" });
    for (let target of generalTargets) {
      let generalTargetScript = await fileSystem(`readString`, [ frontGeneralDir + "/" + target ]);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${target}`, generalTargetScript ]);
      command += `scp ${process.cwd()}/temp/${target} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/;`;
    }

    // 명령어를 실행하여 파일들을 복사합니다.
    console.log(command);
    await shellExec(command);

    // 두 번째 복사 작업을 위한 명령어를 실행합니다.
    let scpCommand2 = middleTong.map((p) => {
      return `scp ${shellLink(p)} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).join(";");
    console.log(scpCommand2);
    await shellExec(scpCommand2);
    console.log(`front update done`);

    // renderDesignerPhp 메서드를 호출하여 디자이너 관련 PHP 파일을 처리합니다.
    await instance.renderDesignerPhp();

  } catch (e) {
    // 오류가 발생한 경우 이를 출력합니다.
    console.log(e);
  }
}

/**
 * HomeLiaison의 디자이너 관련 PHP 파일을 처리하고 서버에 배포하는 함수입니다.
 * 이 함수는 cafe24 호스팅 환경에서 Apache/PHP 서버로 프론트 엔드 파일을 전송하여 업데이트를 진행합니다.
 * 
 * @async
 * @function renderDesignerPhp
 * @returns {Promise<void>} - 작업 완료 후 반환값 없이 종료됩니다.
 */
DataConsole.prototype.renderDesignerPhp = async function () {
  // 현재 인스턴스를 저장하여 비동기 함수 내부에서 this를 사용할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 비구조화 할당으로 가져옵니다.
  const { fileSystem, shellLink, shellExec, equalJson, requestSystem, consoleQ } = this.mother;

  // 클래스 내부의 ghostDir 및 address 속성을 사용합니다.
  const { ghostDir } = this;
  const address = this.address;

  // 정적 자원을 저장할 폴더 경로를 설정합니다.
  const staticFolder = process.env.HOME + "/static";
  const staticMiddleFolder = staticFolder + "/middle";

  // 프론트엔드의 클라이언트 및 디자이너 관련 디렉토리 경로를 설정합니다.
  const frontClientDir = this.frontDir + "/client";
  const frontGeneralDir = this.frontDir + "/general";
  const frontDir = this.frontDir + "/designer";

  try {
    // 중간 정적 자원을 처리하는 메서드를 호출합니다.
    await this.renderMiddleStatic(staticFolder);

    // 파일 경로 매핑을 위한 배열을 설정합니다.
    const targetMap = [
      { from: "designerAbout", to: "about", path: "/middle/designerAbout" },
      { from: "designerBoard", to: "dashboard", path: "/middle/designerBoard" },
      { from: "designerReport", to: "report", path: "/middle/designerReport" },
      { from: "requestDetail", to: "request", path: "/middle/requestDetail" },
      { from: "requestList", to: "requests", path: "/middle/requestList" },
      { from: "designerLogin", to: "login", path: "/middle/designerLogin" },
      { from: "designManual", to: "provision", path: "/middle/designManual" },
      { from: "consoleManual", to: "manual", path: "/middle/consoleManual" },
      { from: "designerPossible", to: "possible", path: "/middle/designerPossible" },
      { from: "partnershipManual", to: "partnership", path: "/middle/partnershipManual" },
      { from: "feeManual", to: "fee", path: "/middle/feeManual" },
      { from: "processDetail", to: "process", path: "/middle/processDetail" },
      { from: "setPortfolio", to: "setting", path: "/middle/setPortfolio" },
      { from: "proposalManual", to: "proposal_manual", path: "/middle/proposalManual" },
    ];

    // Ghost 디렉토리에서 파일 목록을 읽어오고, 필요한 파일만 필터링합니다.
    const ghostTargets = (await fileSystem(`readDir`, [ ghostDir + "/designer" ])).filter((str) => { return str !== ".DS_Store" }).filter((str) => {
      const fromArr = targetMap.map((obj) => { return obj.from });
      return fromArr.includes(str.replace(/\.js$/i, ''));
    }).map((str) => {
      const o = targetMap.find((obj) => { return obj.from === str.replace(/\.js$/i, '') });
      o.file = `${staticMiddleFolder}/${str}`;
      o.php = `${frontDir}/${str.replace(/\.js$/i, ".php")}`;
      return o;
    });

    let targetScript, phpScript;
    let motherTong = [];
    let middleTong = [];

    // 각 파일을 읽어오고 변환 및 복사 작업을 진행합니다.
    for (let { from, to, file, php, path } of ghostTargets) {
      // JS 파일을 읽어오고 ajaxJson 호출을 수정하여 절대 경로로 변환합니다.
      targetScript = await fileSystem(`readString`, [ file ]);
      targetScript = targetScript.replace(/ajaxJson\((\{[^}]*\}[^}]*\}?, ?)(\"[^\"]+\")/gi, (original, p1, p2) => {
        if (/^[\"\']http/.test(p2)) {
          return original;
        } else {
          return `ajaxJson(${p1}"https://${address.officeinfo.host}:3002" + ${p2}`;
        }
      });

      // PHP 파일을 읽어옵니다.
      phpScript = await fileSystem(`readString`, [ php ]);

      // 변환된 스크립트를 임시 파일로 작성합니다.
      await fileSystem(`write`, [ `${process.cwd()}/temp/${from}.js`, targetScript ]);
      middleTong.push(`${shellLink(process.cwd())}/temp/${shellLink(from)}.js`);
      await fileSystem(`write`, [ `${process.cwd()}/temp/${to}.php`, phpScript ]);
      motherTong.push(`${shellLink(process.cwd())}/temp/${shellLink(to)}.php`);
    }

    // 복사할 파일 목록을 출력합니다.
    console.log("middle :", middleTong);
    console.log("mother :", motherTong);

    // SCP 명령어를 사용해 서버로 파일을 복사합니다.
    let commandTong = middleTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    }).concat(motherTong.map((p) => {
      return `scp ${p} ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/`;
    }));

    // 모든 명령어를 결합합니다.
    let command = commandTong.join(';');

    // 클라이언트 디렉토리의 general.php 파일을 읽고 호스트 정보로 업데이트합니다.
    let generalPhpScript = await fileSystem(`readString`, [ frontClientDir + "/general.php" ]);
    generalPhpScript = generalPhpScript.replace(/__host__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__realHost__/gi, address.frontinfo.host);
    generalPhpScript = generalPhpScript.replace(/__coreHost__/gi, address.officeinfo.core.ddns);
    generalPhpScript = generalPhpScript.replace(/__secondHost__/gi, address.secondinfo.host + ":3003");
    generalPhpScript = generalPhpScript.replace(/__logHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__backHost__/gi, address.officeinfo.host + ":3002");
    generalPhpScript = generalPhpScript.replace(/__contentsHost__/gi, address.officeinfo.ghost.host + ":3000");
    generalPhpScript = generalPhpScript.replace(/__constructHost__/gi, address.officeinfo.construct.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__numbersHost__/gi, address.officeinfo.numbers.host + ":8000");
    generalPhpScript = generalPhpScript.replace(/__officeIp__/gi, address.officeinfo.test.ip.outer);
    generalPhpScript = generalPhpScript.replace(/__testHost__/gi, address.officeinfo.test.host);
    generalPhpScript = generalPhpScript.replace(/__user__/gi, address.frontinfo.user);
    generalPhpScript = generalPhpScript.replace(/__password__/gi, address.frontinfo.password);
    generalPhpScript = generalPhpScript.replace(/__database__/gi, address.frontinfo.database);
    
    // 업데이트된 general.php 파일을 작성합니다.
    await fileSystem(`write`, [ `${process.cwd()}/temp/general.php`, generalPhpScript ]);
    command += `;scp ${process.cwd()}/temp/general.php ${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/designer/;`;

    // SCP 명령어를 실행하여 파일을 전송합니다.
    console.log(command);
    await shellExec(command);

    // 추가적인 명령어를 만들어 실행합니다.
    let cpCommandTong = commandTong.filter((o) => { return /\.js[\'\"]? /.test(o) }).map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      const updatedJs = tempCommandArr[1].replace(/\/([a-zA-Z0-9_\- ]+\.js[\'\"]?)/g, (match, p1) => {
        return "/" + p1;
      });
      return tempCommandArr.slice(0, -1).join(" ").replace(/^scp/, "cp") + " " + updatedJs;
    });

    // 복사 명령어를 연결하여 생성합니다.
    let cpCommand = cpCommandTong.join(";");
    let scpCommand2Tong = cpCommandTong.map((c) => {
      const tempCommandArr = c.split(" ").map((s) => { return s.trim() });
      return "scp " + tempCommandArr[2] + " " + `${address.frontinfo.user}@${address.frontinfo.host}:/${address.frontinfo.user}/www/middle/`;
    });
    let scpCommand2 = scpCommand2Tong.join(";");

    // 두 번째 복사 명령어를 실행합니다.
    console.log(scpCommand2);
    await shellExec(scpCommand2);

    // 작업 완료 후 로그를 출력합니다.
    console.log(`front update done`);

  } catch (e) {
    // 예외가 발생할 경우 에러를 출력합니다.
    console.log(e);
  }
}

/**
 * DataConsole 서버를 설정하고 MongoDB 연결, 정적 파일 처리, HTTPS 서버 실행 등을 담당하는 함수입니다.
 * 
 * @async
 * @function connect
 * @returns {Promise<void>} - 작업이 완료되면 반환값 없이 종료됩니다.
 */
DataConsole.prototype.connect = async function () {
  // 현재 클래스 인스턴스를 instance로 참조합니다. 비동기 함수 내에서 this가 변경될 수 있기 때문입니다.
  const instance = this;

  /**
   * Mother 클래스에서 가져온 여러 유틸리티 메서드를 비구조화 할당으로 정의합니다.
   * - fileSystem: 파일 시스템 관련 작업을 처리합니다.
   * - sleep: 지정된 시간 동안 비동기로 대기합니다.
   * - mongo: MongoDB 연결을 위한 클래스입니다.
   * - mongoinfo 등: MongoDB에 대한 연결 정보입니다.
   * - uniqueValue: 고유한 값을 생성하는 유틸리티 함수입니다.
   * - errorLog, expressLog 등: 다양한 로그 기록용 함수들입니다.
   */
  const { fileSystem, sleep, mongo, mongoinfo, mongolocalinfo, mongotestinfo, mongoofficeinfo, uniqueValue, errorLog, expressLog, dateToString, aliveLog, cronLog, emergencyAlarm, alertLog, shellExec, shellLink } = this.mother;

  // 서버가 실행될 포트 번호를 설정합니다. 기본적으로 3002번 포트를 사용합니다.
  const PORT = 3002;

  // HTTPS 및 Express 모듈을 불러옵니다.
  const https = require("https");
  const express = require("express");

  // Express 애플리케이션 인스턴스를 생성합니다.
  const app = express();

  // multer 모듈을 통해 multipart/form-data 요청을 처리합니다.
  const multer = require("multer");
  const multiForms = multer();

  // express-useragent 모듈을 사용하여 클라이언트의 사용자 에이전트 정보를 분석합니다.
  const useragent = require("express-useragent");

  // 정적 파일을 저장할 폴더 경로를 설정합니다.
  const staticFolder = process.env.HOME + "/static";

  // 임시 프로세스 파일 이름을 설정합니다. uniqueValue를 사용해 고유한 파일 이름을 생성합니다.
  const processDoingKeywords = "processDoing_";
  const tempProcessName = processDoingKeywords + uniqueValue("hex") + ".temp";

  // 사용자 에이전트를 분석하는 미들웨어를 추가하여 Express 애플리케이션에서 사용할 수 있도록 설정합니다.
  app.use(useragent.express());

  // JSON 요청 본문의 크기를 최대 50MB로 제한하는 미들웨어를 추가합니다.
  app.use(express.json({ limit: "50mb" }));

  // multipart/form-data 요청을 처리할 수 있도록 multer 미들웨어를 추가합니다.
  app.use(multiForms.array());

  // URL-encoded 본문의 크기를 최대 50MB로 제한하고 확장된 옵션을 사용할 수 있도록 설정합니다.
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // 정적 파일을 제공할 수 있도록 static 폴더를 설정합니다.
  app.use(express.static(staticFolder));

  // CORS 설정을 추가하여 모든 도메인에서의 접근을 허용합니다.
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  try {
    // 콘솔에 서버가 시작됨을 알리는 메시지를 출력합니다.
    console.log(`\n\x1b[36m\x1b[1m%s\x1b[0m`, `launching console ==============\n`);

    // MongoDB 연결 설정을 시작합니다. back 객체의 setInfoObj 메서드를 호출하여 MongoDB 설정 정보를 불러옵니다.
    await this.back.setInfoObj({ getMode: false });

    // MongoDB 연결을 위한 인스턴스를 생성하고 연결을 수행합니다.
    const MONGOC = new mongo(mongoinfo);
    await MONGOC.connect();

    // KakaoTalk 모듈을 불러와 인스턴스를 생성합니다. 이 인스턴스는 카카오톡과의 상호작용을 처리합니다.
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();

    // HumanPacket 모듈을 불러와 인스턴스를 생성합니다. 이는 사람과 관련된 데이터를 처리합니다.
    const HumanPacket = require(`${process.cwd()}/apps/humanPacket/humanPacket.js`);
    const humanInstance = new HumanPacket();

    // HTTPS 인증서 및 키를 읽어와 설정합니다.
    let pems, pemsLink;
    let certDir, keyDir, caDir;

    // 인증서와 키 파일 경로를 설정합니다.
    pems = {};
    pemsLink = process.cwd() + "/pems/" + this.address.officeinfo.host;

    // 인증서 디렉토리에서 인증서 파일을 읽어옵니다.
    certDir = await fileSystem(`readDir`, [ `${pemsLink}/cert` ]);
    for (let i of certDir) {
      if (i !== `.DS_Store`) {
        pems.cert = await fileSystem(`read`, [ `${pemsLink}/cert/${i}` ]);
      }
    }

    // 키 디렉토리에서 키 파일을 읽어옵니다.
    keyDir = await fileSystem(`readDir`, [ `${pemsLink}/key` ]);
    for (let i of keyDir) {
      if (i !== `.DS_Store`) {
        pems.key = await fileSystem(`read`, [ `${pemsLink}/key/${i}` ]);
      }
    }

    // CA 디렉토리에서 CA 파일을 읽어와 pems 객체에 저장합니다.
    caDir = await fileSystem(`readDir`, [ `${pemsLink}/ca` ]);
    pems.ca = [];
    for (let i of caDir) {
      if (i !== `.DS_Store`) {
        pems.ca.push(await fileSystem(`read`, [ `${pemsLink}/ca/${i}` ]));
      }
    }

    // HTTP/1.1 지원을 활성화합니다.
    pems.allowHTTP1 = true;

    // DataRouter를 불러와 MongoDB, KakaoTalk, HumanPacket 인스턴스를 전달하여 설정합니다.
    const DataRouter = require(`${this.dir}/router/dataRouter.js`);
    const dataRouter = new DataRouter(MONGOC, kakaoInstance, humanInstance);

    // DataRouter 인스턴스의 setMembers 메서드를 호출하여 홈리에종 직원 정보를 설정합니다.
    await dataRouter.setMembers();

    // DataRouter의 setRouter 메서드를 호출하여 라우터를 설정합니다.
    const router = dataRouter.setRouter();

    // 라우터를 Express 애플리케이션에 추가하여 요청을 처리할 수 있게 합니다.
    app.use("/", router);

    // 정적 파일 처리를 위한 작업을 설정합니다. 일정 시간 대기 후 파일을 읽습니다.
    sleep(1000 * Math.random()).then(() => {
      return fileSystem("readFolder", [ process.env.HOME ]);
    }).then((homeFolderList) => {
      // processDoingKeywords로 시작하는 파일이 있는지 확인하고, 있으면 정적 파일을 처리합니다.
      if (homeFolderList.some((str) => { return (new RegExp("^" + processDoingKeywords, "i")).test(str) })) {
        sleep(500).then(() => {
          return instance.renderStatic(staticFolder);
        }).then(() => {
          return instance.renderMiddleStatic(staticFolder);
        }).then(() => {
          console.log(`static done`);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        // 임시 프로세스 파일을 생성하고, 정적 파일을 처리한 후 삭제합니다.
        fileSystem("writeString", [ process.env.HOME + "/" + tempProcessName, String(1) ]).then(() => {
          return instance.renderStatic(staticFolder);
        }).then(() => {
          return instance.renderMiddleStatic(staticFolder);
        }).then(() => {
          console.log(`static done`);
          return shellExec("rm", [ "-rf", process.env.HOME + "/" + tempProcessName ]);
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      // 파일 읽기 중 오류가 발생하면 콘솔에 출력합니다.
      console.log(err);
    });

    // HTTPS 서버를 시작하고 지정된 포트에서 요청을 처리할 준비를 합니다.
    https.createServer(pems, app).listen(PORT, () => { 
      console.log(`\x1b[33m%s\x1b[0m`, `\nServer running\n`); 
    });

  } catch (e) {
    // 오류가 발생한 경우, 오류 내용을 콘솔에 출력합니다.
    console.log(e);
  }
}

module.exports = DataConsole;
