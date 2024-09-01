/**
 * GoogleChrome 클래스는 Google Chrome의 자동화 및 스크린샷, PDF 생성 등의 기능을 제공하는 Playwright 라이브러리를 사용하여 
 * 웹 페이지의 PDF 생성 등을 수행합니다. 이 클래스는 다양한 구글 API와 통합하기 위해 설계된 모듈의 일부입니다.
 * 
 * @class GoogleChrome
 */
const GoogleChrome = function () {
  // Mother 클래스를 현재 작업 디렉토리에서 가져옵니다.
  // 이 클래스는 MongoDB 연결 정보와 기타 유틸리티 메서드를 제공합니다.
  const Mother = require(process.cwd() + "/apps/mother.js");

  // BackMaker 클래스를 현재 작업 디렉토리에서 가져옵니다.
  // 이 클래스는 백엔드 관련 작업을 관리하기 위한 도구로, MongoDB와 관련된 여러 기능을 제공합니다.
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);

  // 홈리에종 시스템에서 사용하는 정보 객체를 가져옵니다.
  // 이 객체에는 다양한 설정 값들이 포함되어 있습니다.
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);

  // Playwright 라이브러리에서 chromium 모듈을 가져옵니다.
  // 이 모듈은 크롬 브라우저의 자동화를 위한 기능을 제공합니다.
  const { chromium } = require("playwright");

  // Mother 클래스의 인스턴스를 생성하여 this.mother 속성에 할당합니다.
  // 이를 통해 GoogleChrome 클래스에서도 Mother 클래스의 메서드와 속성을 사용할 수 있습니다.
  this.mother = new Mother();

  // BackMaker 클래스의 인스턴스를 생성하여 this.back 속성에 할당합니다.
  // 이를 통해 GoogleChrome 클래스에서도 BackMaker 클래스의 메서드와 속성을 사용할 수 있습니다.
  this.back = new BackMaker();

  // ADDRESS 객체를 this.address 속성에 할당합니다.
  // 이를 통해 시스템에서 필요한 설정 값을 사용할 수 있습니다.
  this.address = ADDRESS;

  // GoogleAPIs 디렉토리 경로를 this.dir 속성에 할당합니다.
  // 이 경로는 GoogleChrome 클래스에서 사용되는 파일 경로의 기본값으로 사용됩니다.
  this.dir = process.cwd() + "/apps/googleAPIs";

  // Playwright의 chromium 모듈을 this.chromium 속성에 할당합니다.
  // 이를 통해 이 클래스에서 크롬 브라우저를 자동화할 수 있습니다.
  this.chromium = chromium;
}

/**
 * 웹 페이지의 PDF를 생성하여 저장하는 메서드입니다.
 * 
 * @param {string} link - PDF로 변환할 웹 페이지의 URL입니다. HTTP 또는 HTTPS로 시작하는 유효한 URL이어야 합니다.
 * @param {string|null} filePath - 생성된 PDF 파일을 저장할 절대 경로입니다. 경로가 제공되지 않으면 기본 경로가 사용됩니다.
 * @param {boolean} openMode - PDF 생성 후 파일을 자동으로 열지 여부를 결정합니다. true일 경우 생성된 PDF가 자동으로 열립니다.
 * @returns {Promise<Object>} - 생성된 PDF 파일의 경로를 포함하는 객체를 반환합니다.
 */
GoogleChrome.prototype.pdfPrint = async function (link, filePath = null, openMode = false) {
  // link 인수가 문자열인지 확인합니다. 문자열이 아닐 경우 에러를 던집니다.
  if (typeof link !== "string") {
    throw new Error("invalid input => { link, filePath }");
  }
  // link가 HTTP 또는 HTTPS로 시작하는 유효한 URL인지 확인합니다. 그렇지 않으면 에러를 던집니다.
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }
  // filePath가 문자열일 경우, 해당 경로가 절대 경로인지 확인합니다. 절대 경로가 아니면 에러를 던집니다.
  if (typeof filePath === "string") {
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }
  }

  // GoogleChrome 클래스의 인스턴스를 instance 변수에 할당합니다.
  // 이를 통해 내부 메서드에서 this를 사용하지 않고 instance를 참조할 수 있습니다.
  const instance = this;

  // Mother 클래스의 메서드인 shellLink, shellExec, uniqueValue를 destructuring으로 할당합니다.
  // shellLink: 파일 경로를 안전하게 변환하는 메서드
  // shellExec: 쉘 명령을 실행하는 메서드
  // uniqueValue: 고유한 값을 생성하는 메서드 (예: 파일명 생성에 사용)
  const { shellLink, shellExec, uniqueValue } = this.mother;

  // Playwright의 chromium 모듈을 destructuring으로 할당합니다.
  // 이를 통해 크롬 브라우저를 제어할 수 있습니다.
  const { chromium } = this;

  // 임시 파일을 저장할 디렉토리 경로를 tempDir에 설정합니다.
  const tempDir = process.cwd() + "/temp";

  try {
    // filePath가 null일 경우, 임시 디렉토리에 고유한 파일명을 가진 PDF 파일을 생성합니다.
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".pdf";
    }

    // Playwright를 사용하여 headless 모드의 크롬 브라우저를 실행합니다.
    // headless 모드: 브라우저 UI 없이 백그라운드에서 동작
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",                // 샌드박스 모드 비활성화 (특정 환경에서 필요할 수 있음)
      "--disable-setuid-sandbox",    // setuid 샌드박스 비활성화 (루트 권한 문제 방지)
      "--hide-scrollbars",           // 스크롤바 숨기기
      "--disable-gpu",               // GPU 가속 비활성화 (헤드리스 모드에서 불필요함)
    ] });

    // 새 브라우저 컨텍스트를 생성합니다.
    // 컨텍스트: 브라우저 내에서 독립된 환경 (예: 쿠키, 세션 등)
    const context = await browser.newContext();

    // 새 페이지를 생성합니다.
    const page = await context.newPage();

    // 지정된 URL로 이동합니다. 네트워크 요청이 완전히 끝날 때까지 대기합니다.
    await page.goto(link, { waitUntil: "networkidle" });

    // 페이지 내의 모든 폰트가 로드될 때까지 대기합니다.
    await page.evaluateHandle("document.fonts.ready");

    // 페이지를 PDF로 저장합니다.
    await page.pdf({
      path: filePath,               // PDF가 저장될 경로
      format: "a4",                 // PDF 포맷 (A4 사이즈)
      printBackground: true,        // 배경색 포함
      scale: 0.8,                   // 출력 스케일 조정 (0.8배)
      margin: {
        top: 30,                    // 상단 여백 (30px)
        bottom: 30                  // 하단 여백 (30px)
      }
    });

    // 브라우저를 닫습니다.
    await browser.close();

    // openMode가 true일 경우, 생성된 PDF 파일을 자동으로 엽니다.
    if (openMode) {
      // shellExec 메서드를 사용하여 PDF 파일을 열도록 쉘 명령을 실행합니다.
      await shellExec(`open ${shellLink(filePath)}`);
    }

    // 생성된 PDF 파일의 경로를 포함하는 객체를 반환합니다.
    return { file: filePath };
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고, 오류 메시지를 포함하는 객체를 반환합니다.
    console.log(e);
    return { message: "error : " + e.message };
  }
}

/**
 * 웹 페이지를 PNG 이미지로 저장하는 메서드입니다.
 * 이 메서드는 지정된 URL의 웹 페이지를 캡처하여 PNG 파일로 저장합니다. 
 * 모바일 모드와 태블릿 모드도 지원하여 다양한 화면 크기에 맞춘 이미지를 생성할 수 있습니다.
 *
 * @param {string} link - 캡처할 웹 페이지의 URL입니다. HTTP 또는 HTTPS로 시작하는 유효한 URL이어야 합니다.
 * @param {string|null} filePath - 생성된 PNG 파일을 저장할 절대 경로입니다. 경로가 제공되지 않으면 기본 경로가 사용됩니다.
 * @param {boolean} tabletMode - 태블릿 모드에서 캡처할지 여부를 결정합니다. true일 경우 태블릿 화면 크기로 캡처합니다.
 * @param {boolean} mobileMode - 모바일 모드에서 캡처할지 여부를 결정합니다. true일 경우 모바일 화면 크기로 캡처합니다.
 * @returns {Promise<Object>} - 생성된 PNG 파일의 경로를 포함하는 객체를 반환합니다.
 */
GoogleChrome.prototype.pageToPng = async function (link, filePath = null, tabletMode = false, mobileMode = false) {
  
  // GoogleChrome 클래스의 인스턴스를 instance 변수에 할당합니다.
  // 이를 통해 내부 메서드에서 this를 사용하지 않고 instance를 참조할 수 있습니다.
  const instance = this;

  // Mother 클래스의 메서드인 shellLink, shellExec, uniqueValue를 destructuring으로 할당합니다.
  // shellLink: 파일 경로를 안전하게 변환하는 메서드
  // shellExec: 쉘 명령을 실행하는 메서드
  // uniqueValue: 고유한 값을 생성하는 메서드 (예: 파일명 생성에 사용)
  const { shellLink, shellExec, uniqueValue } = this.mother;

  // Playwright의 chromium 모듈을 destructuring으로 할당합니다.
  // 이를 통해 크롬 브라우저를 제어할 수 있습니다.
  const { chromium } = this;

  // 임시 파일을 저장할 디렉토리 경로를 tempDir에 설정합니다.
  const tempDir = process.cwd() + "/temp";

  try {
    // filePath가 null일 경우, 임시 디렉토리에 고유한 파일명을 가진 PNG 파일을 생성합니다.
    if (filePath === null) {
      filePath = tempDir + "/" + uniqueValue("hex") + ".png";
    }

    // Playwright를 사용하여 headless 모드의 크롬 브라우저를 실행합니다.
    // headless 모드: 브라우저 UI 없이 백그라운드에서 동작
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",                // 샌드박스 모드 비활성화 (특정 환경에서 필요할 수 있음)
      "--disable-setuid-sandbox",    // setuid 샌드박스 비활성화 (루트 권한 문제 방지)
      "--hide-scrollbars",           // 스크롤바 숨기기
      "--disable-gpu",               // GPU 가속 비활성화 (헤드리스 모드에서 불필요함)
    ] });

    // 새 브라우저 컨텍스트를 생성합니다.
    // 컨텍스트: 브라우저 내에서 독립된 환경 (예: 쿠키, 세션 등)
    const context = await browser.newContext();

    // 새 페이지를 생성합니다.
    const page = await context.newPage();

    // 페이지의 뷰포트 크기를 설정합니다.
    // 뷰포트 크기는 모바일 모드, 태블릿 모드, 또는 기본 모드에 따라 다르게 설정됩니다.
    await page.setViewportSize({
      width: !mobileMode ? (!tabletMode ? 2400 : 1200) : 720, // 화면 너비를 설정합니다. (기본: 2400px, 태블릿: 1200px, 모바일: 720px)
      height: 1200, // 화면 높이를 1200px로 설정합니다.
    });

    // 지정된 URL로 이동합니다. 네트워크 요청이 완전히 끝날 때까지 대기합니다.
    await page.goto(link, { waitUntil: "networkidle" });

    // 페이지 내의 모든 폰트가 로드될 때까지 대기합니다.
    await page.evaluateHandle("document.fonts.ready");

    // 페이지를 스크린샷으로 캡처하여 PNG 파일로 저장합니다.
    await page.screenshot({ path: filePath, fullPage: true });

    // 브라우저를 닫습니다.
    await browser.close();

    // 생성된 PNG 파일의 경로를 포함하는 객체를 반환합니다.
    return { file: filePath };
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력합니다.
    console.log(e);
  }
}

/**
 * 웹 페이지의 HTML 소스를 가져오는 메서드입니다.
 * 이 메서드는 지정된 URL의 웹 페이지를 로드하고, 해당 페이지의 전체 HTML 코드를 문자열로 반환합니다.
 *
 * @param {string} link - HTML 소스를 가져올 웹 페이지의 URL입니다. HTTP 또는 HTTPS로 시작하는 유효한 URL이어야 합니다.
 * @returns {Promise<string|Object>} - 웹 페이지의 HTML 코드를 문자열로 반환하거나, 오류 발생 시 오류 메시지를 포함하는 객체를 반환합니다.
 */
GoogleChrome.prototype.getHtml = async function (link) {

  // link 인수가 문자열인지 확인합니다. 문자열이 아닐 경우 에러를 던집니다.
  if (typeof link !== "string") {
    throw new Error("invalid input => { link }");
  }

  // link가 HTTP 또는 HTTPS로 시작하는 유효한 URL인지 확인합니다. 그렇지 않으면 에러를 던집니다.
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }

  // GoogleChrome 클래스의 인스턴스를 instance 변수에 할당합니다.
  // 이를 통해 내부 메서드에서 this를 사용하지 않고 instance를 참조할 수 있습니다.
  const instance = this;

  // GoogleChrome 클래스의 속성에서 chromium과 fileSystem을 destructuring으로 할당합니다.
  // chromium: Playwright의 크롬 브라우저 모듈
  // fileSystem: 파일 시스템 작업을 처리하는 유틸리티 (이 코드에서는 사용되지 않지만 구조를 반영)
  const { chromium, fileSystem } = this;

  try {
    // Playwright를 사용하여 headless 모드의 크롬 브라우저를 실행합니다.
    // headless 모드: 브라우저 UI 없이 백그라운드에서 동작
    const browser = await chromium.launch({ headless: true, args: [
      "--no-sandbox",                // 샌드박스 모드 비활성화 (특정 환경에서 필요할 수 있음)
      "--disable-setuid-sandbox",    // setuid 샌드박스 비활성화 (루트 권한 문제 방지)
      "--hide-scrollbars",           // 스크롤바 숨기기
      "--disable-gpu",               // GPU 가속 비활성화 (헤드리스 모드에서 불필요함)
    ] });

    // 새 브라우저 컨텍스트를 생성합니다.
    // 컨텍스트: 브라우저 내에서 독립된 환경 (예: 쿠키, 세션 등)
    const context = await browser.newContext();

    // 새 페이지를 생성합니다.
    const page = await context.newPage();

    // 지정된 URL로 이동합니다. 네트워크 요청이 완전히 끝날 때까지 대기합니다.
    await page.goto(link, { waitUntil: "networkidle" });

    // 페이지의 HTML 소스를 가져옵니다. 
    // document 객체를 사용하여 페이지의 head와 body 요소의 HTML을 조합해 전체 HTML을 반환합니다.
    const frontHtml = await page.evaluate(async () => {
      return `<html><head>${document.head.innerHTML}</head><body>${document.body.innerHTML}</body></html>`;
    });

    // 브라우저를 닫습니다.
    await browser.close();

    // 가져온 HTML 소스를 반환합니다.
    return frontHtml;

  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고, 오류 메시지를 포함하는 객체를 반환합니다.
    console.log(e);
    return { message: "error : " + e.message };
  }
}

/**
 * 웹 페이지에서 특정 JavaScript 코드를 실행하고 그 결과를 반환하는 메서드입니다.
 * 이 메서드는 지정된 URL의 웹 페이지를 로드한 후, 주어진 함수 또는 스크립트를 해당 페이지 내에서 실행하여 결과를 얻습니다.
 *
 * @param {string} link - 스크립트를 실행할 웹 페이지의 URL입니다. HTTP 또는 HTTPS로 시작하는 유효한 URL이어야 합니다.
 * @param {Function|string} func - 페이지에서 실행할 함수 또는 스크립트입니다. 함수 형태나 문자열 형태로 전달할 수 있습니다.
 * @returns {Promise<Object|string>} - 실행된 스크립트의 결과를 JSON으로 변환하여 반환하거나, 문자열로 반환합니다.
 */
GoogleChrome.prototype.frontScript = async function (link, func) {

  // link가 HTTP 또는 HTTPS로 시작하는 유효한 URL인지 확인합니다. 그렇지 않으면 에러를 던집니다.
  if (!/^http/.test(link)) {
    throw new Error("invalid link");
  }

  // GoogleChrome 클래스의 인스턴스를 instance 변수에 할당합니다.
  // 이를 통해 내부 메서드에서 this를 사용하지 않고 instance를 참조할 수 있습니다.
  const instance = this;

  // Mother 클래스의 메서드인 equalJson, fileSystem, mediaQuery를 destructuring으로 할당합니다.
  // equalJson: JSON 데이터를 비교 및 변환하는 유틸리티 메서드
  // fileSystem: 파일 시스템 작업을 처리하는 유틸리티 메서드
  // mediaQuery: 특정 조건에 따라 미디어 쿼리를 처리하는 유틸리티 메서드
  const { equalJson, fileSystem, mediaQuery } = this.mother;

  // Playwright의 chromium 모듈을 destructuring으로 할당합니다.
  // 이를 통해 크롬 브라우저를 제어할 수 있습니다.
  const { chromium } = this;

  // JavaScript의 AsyncFunction을 동적으로 생성하기 위한 생성자 함수를 정의합니다.
  // 이 생성자는 비동기 함수 (async function)를 동적으로 생성하는 데 사용됩니다.
  const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;

  // Playwright를 사용하여 headless 모드의 크롬 브라우저를 실행합니다.
  // headless 모드: 브라우저 UI 없이 백그라운드에서 동작
  const browser = await chromium.launch({ headless: true, args: [
    "--no-sandbox",                // 샌드박스 모드 비활성화 (특정 환경에서 필요할 수 있음)
    "--disable-setuid-sandbox",    // setuid 샌드박스 비활성화 (루트 권한 문제 방지)
    "--hide-scrollbars",           // 스크롤바 숨기기
    "--disable-gpu",               // GPU 가속 비활성화 (헤드리스 모드에서 불필요함)
  ] });

  // 새 브라우저 컨텍스트를 생성합니다.
  // 컨텍스트: 브라우저 내에서 독립된 환경 (예: 쿠키, 세션 등)
  const context = await browser.newContext();

  try {
    // 새 페이지를 생성합니다.
    const page = await context.newPage();
    let funcScript, generalString, frontResponse;

    // 지정된 URL로 이동합니다. 네트워크 요청이 완전히 끝날 때까지 대기합니다.
    await page.goto(link, { waitUntil: "networkidle" });

    // 파일 시스템에서 일반적인 JavaScript 코드를 읽어옵니다.
    // 이 코드는 스크립트 실행 시 필요한 기본 코드일 수 있습니다.
    generalString = await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]);

    // func가 함수인지 문자열인지 확인하고, 적절한 스크립트로 변환합니다.
    if (typeof func === "function") {
      // 함수일 경우, 해당 함수의 내용을 스크립트로 변환하고 미디어 쿼리를 적용한 기본 코드와 결합합니다.
      funcScript = mediaQuery(generalString).code + "\n\n" + func.toString().trim()
        .replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    } else if (typeof func === "string") {
      // 문자열일 경우, 미디어 쿼리를 적용한 기본 코드와 문자열 스크립트를 결합합니다.
      funcScript = mediaQuery(generalString).code + "\n\n" + func;
    } else {
      throw new Error("invalid input"); // func가 함수나 문자열이 아닌 경우 에러를 던집니다.
    }

    // 페이지 내에서 스크립트를 실행하고 그 결과를 frontResponse에 저장합니다.
    frontResponse = await page.evaluate(new AsyncFunction(funcScript));

    // 브라우저 컨텍스트를 닫습니다.
    await context.close();
    // 브라우저를 닫습니다.
    await browser.close();

    try {
      // 실행 결과를 JSON으로 변환하여 반환합니다.
      return equalJson(frontResponse);
    } catch {
      // JSON 변환이 실패할 경우, 원본 실행 결과를 반환합니다.
      return frontResponse;
    }
  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고, 오류 메시지를 포함하는 객체를 반환합니다.
    console.log(e);
    // 브라우저 컨텍스트를 닫습니다.
    await context.close();
    // 브라우저를 닫습니다.
    await browser.close();
    return { message: "error : " + e.message };
  }
}

/**
 * 여러 웹 페이지에서 JavaScript 코드를 순차적으로 실행하고 그 결과를 반환하는 메서드입니다.
 * 이 메서드는 각 웹 페이지에 대한 스크립트를 체인 형태로 실행하며, 페이지 간 지연 시간을 설정할 수 있습니다.
 *
 * @param {Array<Object>} map - 스크립트를 실행할 웹 페이지와 함수의 배열입니다. 각 객체는 {link, func} 형식이어야 합니다.
 * @param {number} [between=2500] - 각 스크립트 실행 간의 대기 시간(밀리초)입니다.
 * @param {Object} [tong={}] - 실행 중 사용할 공유 객체입니다.
 * @param {boolean} [noHeadlessMode=false] - 브라우저의 headless 모드를 비활성화할지 여부를 결정합니다. true로 설정하면 브라우저 UI가 표시됩니다.
 * @returns {Promise<Array>} - 각 웹 페이지에서 실행된 스크립트의 결과를 배열로 반환합니다.
 */
GoogleChrome.prototype.scriptChain = async function (map, between = 2500, tong = {}, noHeadlessMode = false) {

  // map이 배열인지 확인합니다. 배열이 아닌 경우 에러를 던집니다.
  if (!Array.isArray(map)) {
    throw new Error("invalid input => [ { link, async func } ]");
  }

  // GoogleChrome 클래스의 인스턴스를 instance 변수에 할당합니다.
  // 이를 통해 내부 메서드에서 this를 사용하지 않고 instance를 참조할 수 있습니다.
  const instance = this;

  // Mother 클래스의 메서드인 equalJson, fileSystem, sleep, mediaQuery를 destructuring으로 할당합니다.
  // equalJson: JSON 데이터를 비교 및 변환하는 유틸리티 메서드
  // fileSystem: 파일 시스템 작업을 처리하는 유틸리티 메서드
  // sleep: 비동기 함수에서 지연을 주는 유틸리티 메서드
  // mediaQuery: 특정 조건에 따라 미디어 쿼리를 처리하는 유틸리티 메서드
  const { equalJson, fileSystem, sleep, mediaQuery } = this.mother;

  // Playwright의 chromium 모듈을 destructuring으로 할당합니다.
  // 이를 통해 크롬 브라우저를 제어할 수 있습니다.
  const { chromium } = this;

  // JavaScript의 AsyncFunction을 동적으로 생성하기 위한 생성자 함수를 정의합니다.
  // 이 생성자는 비동기 함수 (async function)를 동적으로 생성하는 데 사용됩니다.
  const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;

  // Playwright를 사용하여 크롬 브라우저를 실행합니다.
  // noHeadlessMode가 true인 경우 UI가 표시되며, 그렇지 않으면 headless 모드로 실행됩니다.
  const browser = await chromium.launch({ headless: !noHeadlessMode, args: [
    "--no-sandbox",                // 샌드박스 모드 비활성화 (특정 환경에서 필요할 수 있음)
    "--disable-setuid-sandbox",    // setuid 샌드박스 비활성화 (루트 권한 문제 방지)
    "--hide-scrollbars",           // 스크롤바 숨기기
    "--disable-gpu",               // GPU 가속 비활성화 (헤드리스 모드에서 불필요함)
  ] });

  // 새 브라우저 컨텍스트를 생성합니다.
  // 컨텍스트: 브라우저 내에서 독립된 환경 (예: 쿠키, 세션 등)
  const context = await browser.newContext();

  try {
    // 새 페이지를 생성합니다.
    const page = await context.newPage();
    let funcScript, generalString, frontResponse, frontResponses;

    // 일반적인 JavaScript 코드 문자열을 초기화합니다.
    generalString = "";

    // 파일 시스템에서 기본 JavaScript 코드를 읽어옵니다.
    // 이 코드는 스크립트 실행 시 필요한 일반적인 코드일 수 있습니다.
    generalString += (await fileSystem(`readString`, [ `${process.cwd()}/apps/dataConsole/router/source/general/general.js` ]));

    // mediaQuery 메서드를 사용하여 일반적인 코드에 미디어 쿼리를 적용합니다.
    generalString = mediaQuery(generalString).code;

    // 주어진 함수(func)를 포함한 스크립트를 반환하는 헬퍼 함수를 정의합니다.
    // 이 함수는 JSON으로 변환된 INFO와 TONG 객체, 그리고 기본 코드를 포함한 스크립트를 생성합니다.
    returnScript = (func) => {
      return "const INFO = " + JSON.stringify(instance.address) + ";\n\nconst TONG = " + JSON.stringify(tong) + ";\n\n" + generalString + "\n\n" + func.toString().trim()
        .replace(/^(async)? *(function[^\(]*\([^\)]*\)|\([^\)]*\)[^\=]+\=\>)[^\{]*\{/i, '').replace(/\}$/i, '');
    }

    // 각 웹 페이지에 대해 스크립트를 실행한 결과를 저장할 배열을 초기화합니다.
    frontResponses = [];

    // map 배열의 각 항목에 대해 루프를 돌면서 스크립트를 실행합니다.
    for (let { link, func } of map) {
      // 지정된 URL로 이동합니다. 네트워크 요청이 완전히 끝날 때까지 대기합니다.
      await page.goto(link, { waitUntil: "networkidle" });

      // 페이지 내에서 스크립트를 실행하고 그 결과를 frontResponse에 저장합니다.
      frontResponse = await page.evaluate(new AsyncFunction(returnScript(func)));

      // 실행 결과를 frontResponses 배열에 추가합니다.
      frontResponses.push(frontResponse);

      // 두 스크립트 실행 간의 대기 시간을 적용합니다.
      await sleep(between);
    }

    // 브라우저 컨텍스트를 닫습니다.
    await context.close();

    // 브라우저를 닫습니다.
    await browser.close();

    // 모든 스크립트 실행 결과를 배열로 반환합니다.
    return frontResponses;

  } catch (e) {
    // 오류 발생 시 오류 메시지를 출력하고, 오류 메시지를 포함하는 객체를 반환합니다.
    console.log(e);

    // 오류가 발생해도 브라우저 컨텍스트와 브라우저를 닫아 자원을 해제합니다.
    await context.close();
    await browser.close();

    return { message: "error : " + e.message };
  }
}

module.exports = GoogleChrome;
