/**
 * @class Robot
 * @description Robot 클래스는 robot앱의 진입점 클래스로 arguments에 따라 다른 명령을 실행하는 앱입니다.
 */
const Robot = function () {
  /**
   * Mother 클래스 인스턴스를 생성합니다.
   * Mother 클래스는 MongoDB 연결과 다양한 유틸리티 메서드를 제공합니다.
   * @type {Mother}
   */
  const Mother = require(process.cwd() + "/apps/mother.js"); // Mother 클래스를 불러와 MongoDB 관련 유틸리티와 여러 기능을 사용합니다.

  /**
   * BackMaker 클래스 인스턴스를 생성합니다.
   * BackMaker는 백엔드 작업을 관리하는 클래스입니다.
   * @type {BackMaker}
   */
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js"); // BackMaker 클래스를 불러와 백엔드 작업을 처리합니다.

  /**
   * 주소 정보 객체를 불러옵니다.
   * 이 객체는 데이터베이스 연결 정보를 포함하고 있습니다.
   * @type {Object}
   */
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js"); // 데이터베이스 연결 정보가 담긴 객체를 불러옵니다.

  /**
   * Mother 클래스 인스턴스를 this.mother로 설정합니다.
   * 이를 통해 Robot 클래스 내부에서 Mother 클래스의 유틸리티 메서드를 사용할 수 있습니다.
   */
  this.mother = new Mother(); // Mother 클래스 인스턴스를 Robot 클래스에서 사용하기 위해 this.mother에 할당합니다.

  /**
   * BackMaker 클래스 인스턴스를 this.back으로 설정합니다.
   * 백엔드 작업을 처리하기 위해 사용됩니다.
   */
  this.back = new BackMaker(); // BackMaker 클래스 인스턴스를 this.back에 할당하여 백엔드 작업을 처리합니다.

  /**
   * 주소 정보를 this.address에 할당합니다.
   * @type {Object}
   */
  this.address = ADDRESS; // 주소 정보 객체를 this.address에 할당하여 데이터베이스 연결 정보에 접근할 수 있게 합니다.
}

/**
 * Robot 클래스의 전역 타임아웃 객체를 정의합니다.
 * 타임아웃 관리를 위해 사용됩니다.
 */
Robot.timeouts = {}; // Robot 클래스의 전역 타임아웃 객체를 정의합니다.

/**
 * @method mongoToJson
 * @description MongoDB 데이터를 JSON 형식으로 백업하는 메서드입니다.
 * 파일 시스템 작업과 쉘 명령어를 사용하여 MongoDB의 데이터를 백업 폴더에 저장하고, 압축한 후 제거합니다.
 * @returns {Promise<string>} - 백업 완료 메시지를 반환합니다.
 */
Robot.prototype.mongoToJson = async function () {
  /**
   * Robot 인스턴스를 참조하는 변수입니다.
   * @type {Robot}
   */
  const instance = this; // 현재 Robot 인스턴스를 참조합니다.

  /**
   * Mother 클래스에서 가져온 유틸리티 메서드를 구조 분해 할당합니다.
   * fileSystem: 파일 시스템 작업을 처리하는 메서드입니다.
   * shellExec: 쉘 명령어를 실행하는 메서드입니다.
   * shellLink: 파일 경로를 쉘 명령어에서 사용할 수 있도록 변환하는 메서드입니다.
   * zeroAddition: 날짜 및 시간 형식을 맞추기 위해 0을 추가하는 메서드입니다.
   */
  const { fileSystem, shellExec, shellLink, zeroAddition } = this.mother; // Mother 클래스에서 제공하는 유틸리티 메서드를 사용합니다.

  try {
    /**
     * 현재 날짜를 가져옵니다.
     * @type {Date}
     */
    const today = new Date(); // 오늘 날짜를 가져옵니다.

    /**
     * 백업 폴더 이름을 설정합니다.
     * @constant {string}
     */
    const backFolderName = "backup"; // 백업 폴더 이름을 설정합니다.

    /**
     * MongoDB 백업을 수행할 타겟 데이터베이스와 파일 이름을 정의합니다.
     * @type {Array<Array<string>>}
     */
    const mongoTargets = [
      [ "mongoinfo", "mongo" ],
    ]; // MongoDB 백업을 수행할 타겟 데이터베이스와 파일 이름을 설정합니다.

    /**
     * 현재 작업 디렉토리를 배열로 분리한 후 마지막 요소를 제거합니다.
     * @type {Array<string>}
     */
    const robotDirArr = process.cwd().split("/"); // 현재 작업 디렉토리를 배열로 나눈 후 마지막 요소를 제거합니다.
    robotDirArr.pop(); // 디렉토리 경로 배열에서 마지막 요소를 제거합니다.

    /**
     * 상위 작업 디렉토리 경로를 문자열로 변환합니다.
     * @type {string}
     */
    const robotDirMother = robotDirArr.join("/"); // 배열로 나눈 경로를 다시 문자열로 합칩니다.

    /**
     * 상위 작업 디렉토리의 파일 및 폴더 목록을 가져옵니다.
     * @type {Array<string>}
     */
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]); // 상위 작업 디렉토리 내의 파일 및 폴더 목록을 읽어옵니다.

    /**
     * 백업 폴더가 존재하지 않으면 생성합니다.
     */
    if (!robotDirMotherDetail.includes(backFolderName)) {
      await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`); // 백업 폴더가 없으면 새로 생성합니다.
    }

    /**
     * 백업 파일을 저장할 디렉토리 경로를 설정합니다.
     * @type {string}
     */
    const backDir = robotDirMother + "/" + backFolderName; // 백업 디렉토리 경로를 설정합니다.

    let tempInfo, timeString; // 임시 변수와 시간을 문자열로 저장할 변수입니다.

    /**
     * 현재 시간을 기반으로 백업 폴더 이름을 생성합니다.
     * zeroAddition 메서드를 사용하여 한 자리 숫자에 0을 추가합니다.
     * @type {string}
     */
    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`; // 백업 파일 이름에 사용할 시간을 문자열로 만듭니다.

    /**
     * 각 타겟 데이터베이스에 대해 MongoDB 데이터를 백업합니다.
     */
    for (let [ infoName, dbName ] of mongoTargets) {
      tempInfo = this.address[infoName]; // 데이터베이스 연결 정보를 가져옵니다.
      await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`); // MongoDB 데이터를 백업합니다.
    }

    /**
     * officeinfo 데이터베이스를 백업합니다.
     */
    tempInfo = this.address["officeinfo"]; // officeinfo 데이터베이스 정보를 가져옵니다.
    await shellExec(`mongodump --uri="mongodb://${tempInfo["ghost"]["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${"office"}${timeString}" --authenticationDatabase admin`); // officeinfo 데이터베이스를 백업합니다.

    /**
     * 백업 파일을 압축하고, 원본 디렉토리를 제거합니다.
     */
    await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`); // 백업된 파일을 압축한 후 원본 폴더를 삭제합니다.

    /**
     * 백업이 완료되었음을 알리는 메시지를 반환합니다.
     * @returns {string} - 백업 완료 메시지
     */
    return `mongo exports done`; // MongoDB 백업이 완료되었다는 메시지를 반환합니다.
  } catch (e) {
    /**
     * 오류가 발생한 경우 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류가 발생한 경우 이를 출력합니다.
  }
}

/**
 * @method infoObj
 * @description BackMaker 클래스를 통해 infoObj 객체를 설정하는 메서드입니다.
 * 주어진 설정을 사용하여 데이터베이스에서 정보를 가져옵니다.
 * @returns {Promise<void>}
 */
Robot.prototype.infoObj = async function () {
  try {
    /**
     * BackMaker의 setInfoObj 메서드를 호출하여 infoObj 객체를 설정합니다.
     * getMode: false 설정을 사용하여 데이터를 가져오지 않고 기본적으로 객체를 설정합니다.
     * @type {Promise<void>}
     */
    await this.back.setInfoObj({ getMode: false }); // getMode를 false로 설정하여 정보를 가져오지 않고 infoObj 객체를 설정합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 오류를 콘솔에 출력합니다.
  }
}

/**
 * @method memberObj
 * @description BackMaker 클래스를 통해 memberObj 객체를 설정하는 메서드입니다.
 * 주어진 설정을 사용하여 데이터베이스에서 회원 정보를 가져옵니다.
 * @returns {Promise<void>}
 */
Robot.prototype.memberObj = async function () {
  try {
    /**
     * BackMaker의 setMemberObj 메서드를 호출하여 memberObj 객체를 설정합니다.
     * getMode: false 설정을 사용하여 데이터를 가져오지 않고 기본적으로 객체를 설정합니다.
     * @type {Promise<void>}
     */
    await this.back.setMemberObj({ getMode: false }); // getMode를 false로 설정하여 정보를 가져오지 않고 memberObj 객체를 설정합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 오류를 콘솔에 출력합니다.
  }
}

/**
 * @method infoUpdate
 * @description BackMaker 클래스를 통해 infoObj 객체를 업데이트하는 메서드입니다.
 * 데이터베이스에 저장된 infoObj 객체의 정보를 갱신합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.infoUpdate = async function () {
  try {
    /**
     * BackMaker 클래스의 updateInfoObj 메서드를 호출하여 infoObj 객체를 업데이트합니다.
     * 데이터베이스의 정보를 최신 상태로 갱신합니다.
     * @type {Promise<void>}
     */
    await this.back.updateInfoObj(); // infoObj 객체를 업데이트하여 데이터베이스의 정보를 갱신합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method memberUpdate
 * @description BackMaker 클래스를 통해 memberObj 객체를 업데이트하는 메서드입니다.
 * 데이터베이스에 저장된 memberObj 객체의 정보를 갱신합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.memberUpdate = async function () {
  try {
    /**
     * BackMaker 클래스의 updateMemberObj 메서드를 호출하여 memberObj 객체를 업데이트합니다.
     * 데이터베이스의 회원 정보를 최신 상태로 갱신합니다.
     * @type {Promise<void>}
     */
    await this.back.updateMemberObj(); // memberObj 객체를 업데이트하여 데이터베이스의 회원 정보를 갱신합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method dataConsole
 * @description DataConsole 클래스를 사용하여 데이터베이스와의 연결을 설정하는 메서드입니다.
 * 연결 과정에서 발생한 오류를 처리합니다.
 * @returns {void}
 */
Robot.prototype.dataConsole = function () {
  /**
   * DataConsole 클래스를 불러옵니다.
   * 이 클래스는 데이터베이스와의 연결 및 데이터 작업을 처리하는 역할을 합니다.
   * @type {DataConsole}
   */
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js"); // DataConsole 클래스를 불러옵니다.

  /**
   * DataConsole 클래스의 인스턴스를 생성하여 데이터베이스 연결을 설정합니다.
   * @type {DataConsole}
   */
  const app = new DataConsole(); // DataConsole의 인스턴스를 생성합니다.

  /**
   * 데이터베이스에 연결을 시도합니다.
   * 연결에 실패할 경우 발생한 오류를 catch 블록에서 처리합니다.
   * @returns {Promise<void>}
   */
  app.connect().catch((err) => { console.log(err); }); // 연결 과정에서 발생한 오류를 처리합니다.
}

/**
 * @method renderFrontPhp
 * @description DataConsole 클래스를 사용하여 프론트엔드 관련 PHP 파일을 렌더링하는 메서드입니다.
 * @returns {Promise<void>}
 */
Robot.prototype.renderFrontPhp = async function () {
  /**
   * DataConsole 클래스를 불러옵니다.
   * 이 클래스는 데이터베이스와의 연결 및 데이터 작업을 처리하는 역할을 합니다.
   * @type {DataConsole}
   */
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js"); // DataConsole 클래스를 불러옵니다.

  /**
   * DataConsole 클래스의 인스턴스를 생성합니다.
   * @type {DataConsole}
   */
  const app = new DataConsole(); // DataConsole 인스턴스를 생성합니다.

  /**
   * 프론트엔드 관련 PHP 파일을 렌더링합니다.
   * @returns {Promise<void>}
   */
  await app.renderFrontPhp(); // 프론트엔드와 관련된 PHP 파일을 렌더링합니다.
}

/**
 * @method renderDesignerPhp
 * @description DataConsole 클래스를 사용하여 디자이너 관련 PHP 파일을 렌더링하는 메서드입니다.
 * @returns {Promise<void>}
 */
Robot.prototype.renderDesignerPhp = async function () {
  /**
   * DataConsole 클래스를 불러옵니다.
   * 이 클래스는 데이터베이스와의 연결 및 데이터 작업을 처리하는 역할을 합니다.
   * @type {DataConsole}
   */
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js"); // DataConsole 클래스를 불러옵니다.

  /**
   * DataConsole 클래스의 인스턴스를 생성합니다.
   * @type {DataConsole}
   */
  const app = new DataConsole(); // DataConsole 인스턴스를 생성합니다.

  /**
   * 디자이너 관련 PHP 파일을 렌더링합니다.
   * @returns {Promise<void>}
   */
  await app.renderDesignerPhp(); // 디자이너와 관련된 PHP 파일을 렌더링합니다.
}

/**
 * @method aliveTest
 * @description CronGhost 클래스를 사용하여 서버의 상태를 테스트하는 메서드입니다.
 * aliveTest 메서드는 서버가 정상적으로 동작하는지 확인하는 작업을 수행합니다.
 * @returns {void}
 */
Robot.prototype.aliveTest = function () {
  /**
   * 현재 Robot 인스턴스를 참조하는 변수입니다.
   * 내부에서 this의 참조를 유지하기 위해 사용됩니다.
   * @type {Robot}
   */
  const instance = this; // 현재 Robot 인스턴스를 참조하는 변수입니다.

  /**
   * CronGhost 클래스를 불러옵니다.
   * 이 클래스는 크론 작업과 서버 상태 확인 작업을 처리합니다.
   * @type {CronGhost}
   */
  const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`); // CronGhost 클래스를 불러옵니다.

  /**
   * CronGhost 클래스의 인스턴스를 생성합니다.
   * @type {CronGhost}
   */
  const app = new CronGhost(); // CronGhost 인스턴스를 생성하여 크론 작업을 관리합니다.

  /**
   * aliveTest 메서드를 호출하여 서버의 상태를 확인합니다.
   * 작업 중 오류가 발생할 경우 이를 catch 블록에서 처리합니다.
   * @returns {Promise<void>}
   */
  app.aliveTest().catch((err) => { console.log(err); }); // 서버 상태를 확인하는 메서드를 실행하고, 오류 발생 시 이를 처리합니다.
}

/**
 * @method proposalMaker
 * @description 디자이너가 클라이언트에게 제안서를 보내는 기능을 수행하는 메서드입니다.
 * KakaoTalk API를 사용하여 클라이언트에게 제안서를 전송하며, 프로젝트와 클라이언트의 상태를 업데이트합니다.
 * @param {string} button - 작업의 유형을 지정하는 매개변수입니다.
 * @param {string} arg - 제안서가 속한 프로젝트의 ID입니다. 필수 값입니다.
 * @throws {Error} 제안서의 프로젝트 ID가 전달되지 않으면 오류를 발생시킵니다.
 * @returns {Promise<Object>} - 성공 메시지를 포함한 객체를 반환합니다.
 */
Robot.prototype.proposalMaker = function (button, arg) {
  /**
   * 제안서의 프로젝트 ID가 전달되지 않으면 오류를 발생시키고, 메서드를 종료합니다.
   * @throws {Error} 프로젝트 ID가 없는 경우 "proposal must be id" 오류를 발생시킵니다.
   */
  if (arg === undefined) {
    throw new Error("proposal must be id"); // 프로젝트 ID가 전달되지 않은 경우 오류를 발생시킵니다.
    return;
  }

  /**
   * 현재 Robot 인스턴스를 참조하는 변수입니다.
   * 내부에서 this의 참조를 유지하기 위해 사용됩니다.
   * @type {Robot}
   */
  const instance = this; // 현재 Robot 인스턴스를 참조하는 변수입니다.

  /**
   * BackMaker 인스턴스를 사용하여 프로젝트 및 클라이언트 관련 작업을 수행합니다.
   * @type {BackMaker}
   */
  const back = this.back; // BackMaker 인스턴스를 사용하여 프로젝트 및 클라이언트 데이터를 처리합니다.

  /**
   * KakaoTalk 클래스를 불러옵니다. 클라이언트에게 메시지를 전송하는 데 사용됩니다.
   * @type {KakaoTalk}
   */
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`); // KakaoTalk API를 사용하여 메시지를 전송합니다.

  /**
   * 제안서 관련 경로를 지정합니다.
   * @constant {string}
   */
  const path = "proposal"; // 제안서 경로를 설정합니다.

  /**
   * 제안서 로그를 기록할 MongoDB 컬렉션 이름을 설정합니다.
   * @constant {string}
   */
  const collection = "proposalLog"; // 제안서 로그를 기록할 MongoDB 컬렉션 이름입니다.

  /**
   * 클라이언트와 상호작용할 서버의 호스트 주소를 설정합니다.
   * @constant {string}
   */
  const { host } = this.address.frontinfo; // 클라이언트와의 상호작용을 처리할 서버의 호스트 주소를 가져옵니다.

  /**
   * Mother 클래스에서 제공하는 유틸리티 메서드를 구조 분해 할당합니다.
   * requestSystem: 서버 간 요청을 처리하는 메서드입니다.
   * messageLog: 메시지 로그를 기록하는 메서드입니다.
   * errorLog: 오류 로그를 기록하는 메서드입니다.
   * messageSend: 메시지를 전송하는 메서드입니다.
   */
  const { requestSystem, messageLog, errorLog, messageSend } = this.mother; // Mother 클래스의 유틸리티 메서드를 사용합니다.

  /**
   * 제안서가 속한 프로젝트의 ID입니다.
   * @type {string}
   */
  const proid = arg; // 전달된 프로젝트 ID를 저장합니다.

  let kakaoInstance, cliid, name, phone, client; // KakaoTalk 인스턴스와 클라이언트 정보를 저장할 변수를 선언합니다.
  let requestNumber, action; // 클라이언트의 요청 번호와 상태를 저장할 변수를 선언합니다.
  let now; // 현재 시간을 저장할 변수를 선언합니다.
  let project; // 프로젝트 정보를 저장할 변수를 선언합니다.

  /**
   * Promise를 반환하여 비동기 작업을 처리합니다.
   * @returns {Promise<Object>}
   */
  return new Promise((resolve, reject) => {

    /**
     * 현재 날짜와 시간을 가져옵니다.
     * @type {Date}
     */
    now = new Date(); // 현재 시간을 가져옵니다.

    /**
     * BackMaker의 getProjectById 메서드를 사용하여 프로젝트 ID로 프로젝트를 조회합니다.
     * @param {string} proid - 프로젝트 ID
     * @returns {Promise<Object>} - 프로젝트 데이터를 반환합니다.
     */
    back.getProjectById(proid).then((thisProject) => {
      if (thisProject === null) {
        reject("There is no project"); // 프로젝트가 없으면 오류를 발생시킵니다.
      }
      project = thisProject; // 프로젝트 데이터를 저장합니다.
      cliid = thisProject.cliid; // 프로젝트와 연관된 클라이언트 ID를 저장합니다.
      return back.getClientById(cliid); // 클라이언트 ID로 클라이언트 정보를 조회합니다.
    }).then((data) => {
      client = data; // 클라이언트 데이터를 저장합니다.
      name = client.name; // 클라이언트 이름을 저장합니다.
      phone = client.phone; // 클라이언트 전화번호를 저장합니다.

      /**
       * 클라이언트의 요청 리스트에서 가장 최근 요청을 찾습니다.
       */
      requestNumber = 0; // 요청 번호 초기화
      for (let i = 0; i < client.requests.length; i++) {
        if (client.requests[i].request.timeline.valueOf() <= now.valueOf()) {
          requestNumber = i; // 현재 시간보다 이른 요청을 찾습니다.
          break;
        }
      }

      /**
       * 요청에 따른 분석 결과에 따라 클라이언트의 응답 행동을 설정합니다.
       */
      if (client.requests[requestNumber].analytics.response.action.value === "부재중 제안 발송") {
        action = "피드백과 응대 예정"; // 부재중 제안 발송 시 상태를 설정합니다.
      } else {
        action = "제안 피드백 예정"; // 그 외의 경우 제안 피드백 예정으로 설정합니다.
      }

      /**
       * KakaoTalk 인스턴스를 생성하고 클라이언트에게 메시지를 전송합니다.
       * @param {string} template - 메시지 템플릿 이름
       * @param {string} name - 클라이언트 이름
       * @param {string} phone - 클라이언트 전화번호
       * @param {Object} data - 메시지에 포함할 데이터
       * @returns {Promise<void>}
       */
      kakaoInstance = new KakaoTalk(); // KakaoTalk 인스턴스를 생성합니다.
      return kakaoInstance.sendTalk("designerProposal", name, phone, { client: name, host, path, proid }); // 클라이언트에게 제안서를 전송합니다.
    }).then(() => {
      /**
       * 프로젝트의 제안 상태를 업데이트합니다.
       * @param {Object} query - 업데이트할 조건과 데이터를 포함하는 객체
       * @returns {Promise<void>}
       */
      return back.updateProject([ { proid }, { "proposal.status": "완료", "proposal.date": now } ]); // 프로젝트 제안 상태를 완료로 업데이트합니다.
      
    }).then(() => {

      /**
       * 프로젝트 데이터를 일반 객체로 변환하고 제안 상태를 업데이트합니다.
       * @returns {Object}
       */
      const targetProposal = project.toNormal().proposal; // 프로젝트 데이터를 일반 객체로 변환합니다.
      targetProposal.status = "완료"; // 제안 상태를 완료로 설정합니다.
      targetProposal.date = now; // 제안 완료 시간을 설정합니다.

      /**
       * MongoDB에 제안 로그를 생성합니다.
       * @param {Object} data - 생성할 데이터를 포함하는 객체
       * @param {Object} options - 콘솔 출력 옵션
       * @returns {Promise<void>}
       */
      return back.mongoCreate(collection, {
        date: new Date(),
        method: "send",
        proid: proid,
        project: targetProposal,
      }, { console: true }); // 제안 로그를 MongoDB에 저장합니다.

    }).then(() => {

      let updateObj; // 업데이트할 객체를 선언합니다.
      updateObj = {}; // 객체 초기화
      updateObj["requests." + String(requestNumber) + ".analytics.response.action"] = action; // 요청 상태를 업데이트합니다.

      /**
       * 클라이언트 데이터를 업데이트합니다.
       * @param {Object} query - 업데이트할 조건과 데이터를 포함하는 객체
       * @returns {Promise<void>}
       */
      return back.updateClient([ { cliid }, updateObj ]); // 클라이언트의 요청 상태를 업데이트합니다.

    }).then(() => {
      /**
       * 메시지를 전송하여 제안서 발송을 알립니다.
       * @param {Object} message - 전송할 메시지 내용
       * @returns {Promise<void>}
       */
      return messageSend({ text: name + " 고객님께 추천서를 전송하였어요.\nlink : https://" + host + "/" + path + ".php?proid=" + proid + "&mode=test", channel: "#403_proposal", voice: false }); // 제안서 발송을 알리는 메시지를 전송합니다.

    }).then(() => {

      /**
       * 제안서 발송이 완료되었음을 알리는 메시지를 반환합니다.
       * @returns {Object} - 완료 메시지를 포함하는 객체
       */
      resolve({ message: "done" }); // 제안서 발송이 완료되었음을 알리는 메시지를 반환합니다.

    }).catch((err) => {
      /**
       * 오류가 발생한 경우 이를 로그로 기록하고, Promise를 거절합니다.
       * @param {Error} err - 발생한 오류 객체
       * @returns {Promise<void>}
       */
      errorLog("추천서 보내는 도중 오류남 : " + err.message).catch((e) => { console.log(e); }); // 오류가 발생한 경우 이를 로그로 기록합니다.
      reject(err); // Promise를 거절합니다.
    });
  });
}

/**
 * @method transferConnect
 * @description TransferLounge 클래스를 사용하여 데이터 전송 관련 작업을 처리하는 메서드입니다.
 * TransferLounge의 transConnect 메서드를 호출하여 데이터 전송을 설정하고 처리합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.transferConnect = async function () {
  try {
    /**
     * TransferLounge 클래스를 불러옵니다.
     * 이 클래스는 데이터 전송 작업을 관리하고 처리하는 역할을 합니다.
     * @type {TransferLounge}
     */
    const TransferLounge = require(process.cwd() + "/apps/transferLounge/transferLounge.js"); // TransferLounge 클래스를 불러옵니다.

    /**
     * TransferLounge 클래스의 인스턴스를 생성하여 데이터 전송 작업을 처리합니다.
     * @type {TransferLounge}
     */
    const app = new TransferLounge(); // TransferLounge 인스턴스를 생성합니다.

    /**
     * TransferLounge 클래스의 transConnect 메서드를 호출하여 데이터 전송을 설정하고 처리합니다.
     * @returns {Promise<void>}
     */
    await app.transConnect(); // 데이터 전송을 설정하고 처리하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method staticConnect
 * @description StaticLounge 클래스를 사용하여 정적 데이터 관련 작업을 처리하는 메서드입니다.
 * StaticLounge의 staticConnect 메서드를 호출하여 정적 데이터와 관련된 작업을 설정하고 처리합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.staticConnect = async function () {
  try {
    /**
     * StaticLounge 클래스를 불러옵니다.
     * 이 클래스는 정적 데이터 처리 작업을 관리하는 역할을 합니다.
     * @type {StaticLounge}
     */
    const StaticLounge = require(process.cwd() + "/apps/staticLounge/staticLounge.js"); // StaticLounge 클래스를 불러옵니다.

    /**
     * StaticLounge 클래스의 인스턴스를 생성하여 정적 데이터 관련 작업을 처리합니다.
     * @type {StaticLounge}
     */
    const app = new StaticLounge(); // StaticLounge 인스턴스를 생성합니다.

    /**
     * StaticLounge 클래스의 staticConnect 메서드를 호출하여 정적 데이터와 관련된 작업을 설정하고 처리합니다.
     * @returns {Promise<void>}
     */
    await app.staticConnect(); // 정적 데이터와 관련된 작업을 설정하고 처리하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method kakaoTokenGenerate
 * @description KakaoTalk API를 사용하여 새로운 카카오톡 인증 토큰을 생성하는 메서드입니다.
 * KakaoTalk 클래스의 generateToken 메서드를 호출하여 토큰을 생성합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.kakaoTokenGenerate = async function () {
  try {
    /**
     * KakaoTalk 클래스를 불러옵니다.
     * 이 클래스는 카카오톡 API와 통신하여 인증 토큰을 생성하는 역할을 합니다.
     * @type {KakaoTalk}
     */
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`); // KakaoTalk 클래스를 불러옵니다.

    /**
     * KakaoTalk 클래스의 인스턴스를 생성하여 카카오톡 인증 토큰을 생성합니다.
     * @type {KakaoTalk}
     */
    const app = new KakaoTalk(); // KakaoTalk 인스턴스를 생성합니다.

    /**
     * KakaoTalk 클래스의 generateToken 메서드를 호출하여 새로운 인증 토큰을 생성합니다.
     * @returns {Promise<void>}
     */
    await app.generateToken(); // 카카오톡 인증 토큰을 생성하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method frontSync
 * @description 시스템의 프론트엔드 데이터를 동기화하는 메서드입니다.
 * Mother 클래스의 requestSystem 메서드를 사용하여 프론트엔드 서버에 동기화 요청을 보냅니다.
 * @returns {Promise<void>}
 */
Robot.prototype.frontSync = async function () {
  try {
    /**
     * Mother 클래스의 requestSystem 메서드를 호출하여 프론트엔드 서버에 데이터를 동기화합니다.
     * URL은 테스트 서버의 주소를 사용하며, Content-Type은 JSON입니다.
     * @returns {Promise<void>}
     */
    await this.mother.requestSystem(
      "https://" + this.address.testinfo.host + ":3000/frontReflection", 
      { data: null }, 
      { headers: { "Content-Type": "application/json" } }
    ); // 프론트엔드 서버와 데이터를 동기화하는 요청을 보냅니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method clientReportToSheets
 * @description 클라이언트 리포트를 Google Sheets에 업로드하는 메서드입니다.
 * BackMaker의 getClientReport 메서드를 사용하여 클라이언트 데이터를 가져오고, GoogleSheet API를 통해 이를 Google Sheets에 업데이트합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.clientReportToSheets = async function () {
  try {
    /**
     * GoogleSheet 클래스를 불러옵니다.
     * Google Sheets API를 사용하여 데이터를 처리합니다.
     * @type {GoogleSheet}
     */
    const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js"); // GoogleSheet 클래스를 불러옵니다.

    /**
     * GoogleSheet 클래스의 인스턴스를 생성하여 Google Sheets와의 통신을 처리합니다.
     * @type {GoogleSheet}
     */
    const sheets = new GoogleSheet(); // GoogleSheet 인스턴스를 생성합니다.

    /**
     * 데이터를 업데이트할 Google Sheets의 ID를 정의합니다.
     * @constant {string}
     */
    const sheetId = "14tnBRhwpvrf0h6iYTJzLaxs8UPseNYsznhdhV5kc0UM"; // Google Sheets의 ID입니다.

    /**
     * Google Sheets에 데이터를 입력할 시작 좌표를 정의합니다.
     * @constant {Array<number>}
     */
    const startPoint = [ 0, 0 ]; // 시작 좌표를 정의합니다.

    /**
     * BackMaker의 getClientReport 메서드를 사용하여 클라이언트 리포트를 가져옵니다.
     * @returns {Object} 클라이언트 리포트 객체
     */
    const report = await this.back.getClientReport(); // 클라이언트 리포트를 가져옵니다.

    /**
     * Google Sheets의 지정된 위치에 클라이언트 데이터를 업데이트합니다.
     * @param {string} sheetId - Google Sheets의 ID
     * @param {string} range - 업데이트할 범위
     * @param {Array<Array>} values - 업데이트할 값의 배열
     * @param {Array<number>} startPoint - 업데이트할 시작 좌표
     * @returns {Promise<void>}
     */
    await sheets.update_value_inPython(sheetId, "", report.getMatrix(), startPoint); // Google Sheets에 데이터를 업데이트합니다.

    /**
     * 작업이 완료되었음을 알리는 메시지를 콘솔에 출력합니다.
     */
    console.log(`\x1b[33m%s\x1b[0m`, `sheets upload done`); // 업로드 완료 메시지를 출력합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method fixDir
 * @description 디렉토리 내의 한글 파일명 및 디렉토리 구조를 수정하는 메서드입니다.
 * ParsingHangul 클래스를 사용하여 한글 파일명 문제를 해결하고, 프로세스를 종료합니다.
 * @param {string} target - 수정할 대상 디렉토리 경로입니다.
 * @returns {Promise<void>}
 */
Robot.prototype.fixDir = async function (target) {
  try {
    /**
     * ParsingHangul 클래스를 불러옵니다.
     * 이 클래스는 한글 파일명 문제를 해결하는 데 사용됩니다.
     * @type {ParsingHangul}
     */
    const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js"); // ParsingHangul 클래스를 불러옵니다.

    /**
     * ParsingHangul 클래스의 인스턴스를 생성하여 한글 파일명 문제를 처리합니다.
     * @type {ParsingHangul}
     */
    const hangul = new ParsingHangul(); // ParsingHangul 인스턴스를 생성합니다.

    /**
     * 디렉토리 내의 한글 파일명을 수정하는 비동기 작업을 실행합니다.
     * 작업 완료 후 프로세스를 종료합니다.
     * @param {string} target - 수정할 디렉토리 경로
     * @returns {Promise<void>}
     */
    hangul.fixDirPromise(target).then(function (tree) {
      /**
       * 수정 작업이 완료되면 완료 메시지를 출력하고 프로세스를 종료합니다.
       */
      console.log("done"); // 작업 완료 메시지를 출력합니다.
      process.exit(); // 프로세스를 종료합니다.
    }).catch(function (err) {
      /**
       * 오류가 발생하면 오류 메시지를 출력하고 프로세스를 종료합니다.
       * @param {Error} err - 발생한 오류 객체입니다.
       */
      console.log(err); // 오류 메시지를 출력합니다.
      process.exit(); // 프로세스를 종료합니다.
    });
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method proposalToClient
 * @description BackWorker 클래스를 사용하여 클라이언트에게 제안서를 전송하는 작업을 처리하는 메서드입니다.
 * setProposalToClient 메서드를 호출하여 주어진 모드("cron")로 제안서를 설정합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.proposalToClient = async function () {
  try {
    /**
     * BackWorker 클래스를 불러옵니다.
     * 이 클래스는 백엔드 작업을 관리하고, 클라이언트와 관련된 작업을 처리합니다.
     * @type {BackWorker}
     */
    const BackWorker = require(process.cwd() + "/apps/backMaker/backWorker.js"); // BackWorker 클래스를 불러옵니다.

    /**
     * BackWorker 클래스의 인스턴스를 생성하여 제안서 전송 작업을 처리합니다.
     * @type {BackWorker}
     */
    const work = new BackWorker(); // BackWorker 인스턴스를 생성합니다.

    /**
     * setProposalToClient 메서드를 호출하여 클라이언트에게 제안서를 전송하는 작업을 설정합니다.
     * 여기서는 "cron" 모드를 사용하여 작업을 설정합니다.
     * @param {string} mode - 제안서를 전송하는 모드 ("cron"이 사용됨)
     * @returns {Promise<void>}
     */
    await work.setProposalToClient("cron"); // "cron" 모드로 클라이언트에게 제안서를 전송하는 작업을 처리합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method designerCalculation
 * @description BackWorker 클래스를 사용하여 디자이너의 작업에 대한 계산을 수행하는 메서드입니다.
 * BackWorker의 designerCalculation 메서드를 호출하여 디자이너의 프로젝트 및 관련 데이터를 기반으로 계산 작업을 처리합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.designerCalculation = async function () {
  try {
    /**
     * BackWorker 클래스를 불러옵니다.
     * 이 클래스는 백엔드에서 디자이너와 관련된 작업을 처리하는 역할을 합니다.
     * @type {BackWorker}
     */
    const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // BackWorker 클래스를 불러옵니다.

    /**
     * BackWorker 클래스의 인스턴스를 생성하여 디자이너 계산 작업을 처리합니다.
     * @type {BackWorker}
     */
    const work = new BackWorker(); // BackWorker 인스턴스를 생성합니다.

    /**
     * BackWorker 클래스의 designerCalculation 메서드를 호출하여 디자이너 계산 작업을 수행합니다.
     * @returns {Promise<void>}
     */
    await work.designerCalculation(); // 디자이너와 관련된 계산 작업을 처리하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method passiveSync
 * @description BillMaker 클래스를 사용하여 패시브 데이터를 동기화하는 메서드입니다.
 * passiveSyncAll 메서드를 호출하여 모든 패시브 데이터를 동기화합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.passiveSync = async function () {
  try {
    /**
     * BillMaker 클래스를 불러옵니다.
     * 이 클래스는 청구서 및 결제 관련 작업을 처리합니다.
     * @type {BillMaker}
     */
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`); // BillMaker 클래스를 불러옵니다.

    /**
     * BillMaker 클래스의 인스턴스를 생성하여 패시브 데이터를 동기화합니다.
     * @type {BillMaker}
     */
    const bill = new BillMaker(); // BillMaker 인스턴스를 생성합니다.

    /**
     * BillMaker 클래스의 passiveSyncAll 메서드를 호출하여 모든 패시브 데이터를 동기화합니다.
     * @returns {void}
     */
    bill.passiveSyncAll(); // 모든 패시브 데이터를 동기화하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method cronServer
 * @description CronGhost 클래스를 사용하여 서버에서 주기적인 작업을 실행하는 메서드입니다.
 * cronServer 메서드를 호출하여 서버에서 정기적인 크론 작업을 설정하고 실행합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.cronServer = async function () {
  try {
    /**
     * CronGhost 클래스를 불러옵니다.
     * 이 클래스는 주기적인 작업(크론 작업)을 처리합니다.
     * @type {CronGhost}
     */
    const CronGhost = require(`${process.cwd()}/apps/cronGhost/cronGhost.js`); // CronGhost 클래스를 불러옵니다.

    /**
     * CronGhost 클래스의 인스턴스를 생성하여 크론 작업을 처리합니다.
     * @type {CronGhost}
     */
    const cron = new CronGhost(); // CronGhost 인스턴스를 생성합니다.

    /**
     * CronGhost 클래스의 cronServer 메서드를 호출하여 서버에서 주기적인 작업을 실행합니다.
     * @returns {Promise<void>}
     */
    await cron.cronServer(); // 크론 작업을 설정하고 실행하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

/**
 * @method taxBill
 * @description BillMaker 클래스를 사용하여 세금계산서를 처리하는 메서드입니다.
 * BillMaker 클래스의 taxBill 메서드를 호출하여 세금계산서 생성 및 처리를 수행합니다.
 * @returns {Promise<void>}
 */
Robot.prototype.taxBill = async function () {
  try {
    /**
     * BillMaker 클래스를 불러옵니다.
     * 이 클래스는 세금계산서 및 결제 관련 작업을 처리하는 역할을 합니다.
     * @type {BillMaker}
     */
    const BillMaker = require(`${process.cwd()}/apps/billMaker/billMaker.js`); // BillMaker 클래스를 불러옵니다.

    /**
     * BillMaker 클래스의 인스턴스를 생성하여 세금계산서 작업을 처리합니다.
     * @type {BillMaker}
     */
    const app = new BillMaker(); // BillMaker 인스턴스를 생성합니다.

    /**
     * BillMaker 클래스의 taxBill 메서드를 호출하여 세금계산서를 생성하고 처리합니다.
     * @returns {Promise<void>}
     */
    await app.taxBill(); // 세금계산서를 생성하고 처리하는 메서드를 호출합니다.
  } catch (e) {
    /**
     * 오류가 발생하면 이를 콘솔에 출력합니다.
     * @param {Error} e - 발생한 오류 객체입니다.
     */
    console.log(e); // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
  }
}

// EXE --------------------------------------------------------------------------------------

/**
 * Robot 인스턴스를 생성하여 여러 작업을 처리할 수 있도록 설정합니다.
 * @type {Robot}
 */
const robot = new Robot();

/**
 * 작업 메뉴(MENU) 객체입니다. 다양한 작업을 처리할 함수들을 정의하고, 이를 실행합니다.
 * 각 함수는 비동기로 실행되며, 필요한 작업에 맞게 로봇 인스턴스의 메서드를 호출합니다.
 */
const MENU = {
  /**
   * @method proposal
   * @description proposal 작업을 처리하는 함수입니다. 프로젝트 ID(proid)가 필요합니다.
   * @throws {Error} 프로젝트 ID가 없으면 오류를 발생시킵니다.
   */
  proposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid"); // 프로젝트 ID가 없는 경우 오류를 발생시킵니다.
      }
      robot.proposalMaker("make", process.argv[3]).catch((err) => { console.log(err); }); // proposalMaker 메서드를 호출하여 작업을 처리합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method webProposal
   * @description 웹에서 제안서를 처리하는 작업입니다. 프로젝트 ID가 필요합니다.
   * @throws {Error} 프로젝트 ID가 없으면 오류를 발생시킵니다.
   */
  webProposal: async function () {
    try {
      if (process.argv[3] === undefined) {
        throw new Error("must be proid"); // 프로젝트 ID가 없는 경우 오류를 발생시킵니다.
      }
      console.log(await robot.proposalMaker("web", process.argv[3])); // 웹 제안서를 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method back
   * @description 백엔드 데이터 콘솔을 실행하는 작업입니다.
   */
  back: async function () {
    try {
      robot.dataConsole(); // 백엔드 데이터 콘솔을 실행합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method frontSync
   * @description 프론트엔드 데이터를 동기화하는 작업입니다.
   */
  frontSync: async function () {
    try {
      await robot.frontSync(); // 프론트엔드 데이터 동기화를 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method clientReportToSheets
   * @description 클라이언트 리포트를 Google Sheets에 업로드하는 작업입니다.
   */
  clientReportToSheets: async function () {
    try {
      await robot.clientReportToSheets(); // 클라이언트 리포트를 Google Sheets에 업로드하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method taxBill
   * @description 세금계산서를 처리하는 작업입니다.
   */
  taxBill: async function () {
    try {
      await robot.taxBill(); // 세금계산서를 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method fixDir
   * @description 디렉토리 내 파일 및 폴더 이름을 수정하는 작업입니다.
   */
  fixDir: async function () {
    try {
      let target;
      if (process.argv[3] === undefined) {
        target = process.env.HOME + "/samba/drive/HomeLiaisonServer"; // 대상 디렉토리를 설정합니다.
      } else {
        target = process.argv[3]; // 명령행에서 지정된 타겟 경로를 사용합니다.
      }
      await robot.fixDir(target); // fixDir 메서드를 호출하여 디렉토리 구조를 수정합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method proposalToClient
   * @description 클라이언트에게 제안서를 전송하는 작업입니다.
   */
  proposalToClient: async function () {
    try {
      await robot.proposalToClient(); // 제안서를 클라이언트에게 전송하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method mongoToJson
   * @description MongoDB 데이터를 JSON 형식으로 백업하는 작업입니다.
   */
  mongoToJson: async function () {
    try {
      await robot.mongoToJson(); // MongoDB 데이터를 백업하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method dev
   * @description DevContext를 실행하는 개발 환경 설정 작업입니다.
   */
  dev: async function () {
    try {
      const DevContext = require(`${process.cwd()}/apps/devContext/devContext.js`); // DevContext 클래스를 불러옵니다.
      const dev = new DevContext(); // DevContext 인스턴스를 생성합니다.
      await dev.launching(); // DevContext에서 개발 환경을 실행하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method clientActionSyncLocal
   * @description 클라이언트 동작을 로컬에서 동기화하는 작업입니다.
   */
  clientActionSyncLocal: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // BackWorker 클래스를 불러옵니다.
      const work = new BackWorker(); // BackWorker 인스턴스를 생성합니다.
      await work.clientActionSync({ fromLocal: true }); // 로컬에서 클라이언트 동작을 동기화합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method clientActionSync
   * @description 클라이언트 동작을 동기화하는 작업입니다.
   */
  clientActionSync: async function () {
    try {
      const BackWorker = require(`${process.cwd()}/apps/backMaker/backWorker.js`); // BackWorker 클래스를 불러옵니다.
      const work = new BackWorker(); // BackWorker 인스턴스를 생성합니다.
      await work.clientActionSync(); // 클라이언트 동작을 동기화하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method kakaoTokenGenerate
   * @description 카카오톡 토큰을 생성하는 작업입니다.
   */
  kakaoTokenGenerate: async function () {
    try {
      await robot.kakaoTokenGenerate(); // 카카오톡 토큰을 생성하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method designerCalculation
   * @description 디자이너 계산 작업을 처리하는 작업입니다.
   */
  designerCalculation: async function () {
    try {
      await robot.designerCalculation(); // 디자이너 계산 작업을 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method infoObj
   * @description infoObj 객체를 설정하는 작업입니다.
   */
  infoObj: async function () {
    try {
      await robot.infoObj(); // infoObj 객체를 설정하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method infoUpdate
   * @description infoObj 객체를 업데이트하는 작업입니다.
   */
  infoUpdate: async function () {
    try {
      await robot.infoUpdate(); // infoObj 객체를 업데이트하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method memberObj
   * @description memberObj 객체를 설정하는 작업입니다.
   */
  memberObj: async function () {
    try {
      await robot.memberObj(); // memberObj 객체를 설정하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method memberUpdate
   * @description memberObj 객체를 업데이트하는 작업입니다.
   */
  memberUpdate: async function () {
    try {
      await robot.memberUpdate(); // memberObj 객체를 업데이트하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method aliveTest
   * @description 서버 상태를 테스트하는 작업입니다.
   */
  aliveTest: async function () {
    try {
      robot.aliveTest(); // 서버 상태를 테스트하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method passiveSync
   * @description 패시브 동기화를 처리하는 작업입니다.
   */
  passiveSync: async function () {
    try {
      await robot.passiveSync(); // 패시브 동기화를 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method cronServer
   * @description 크론 작업을 설정하는 작업입니다.
   */
  cronServer: async function () {
    try {
      await robot.cronServer(); // 크론 작업을 설정하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method php
   * @description 프론트엔드 PHP 파일을 렌더링하는 작업입니다.
   */
  php: async function () {
    try {
      await robot.renderFrontPhp(); // 프론트엔드 PHP 파일을 렌더링하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method phpDesigner
   * @description 디자이너 관련 PHP 파일을 렌더링하는 작업입니다.
   */
  phpDesigner: async function () {
    try {
      await robot.renderDesignerPhp(); // 디자이너 관련 PHP 파일을 렌더링하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method trans
   * @description 데이터 전송을 설정하는 작업입니다.
   */
  trans: async function () {
    try {
      await robot.transferConnect(); // 데이터 전송을 설정하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
  
  /**
   * @method static
   * @description 정적 데이터를 처리하는 작업입니다.
   */
  static: async function () {
    try {
      await robot.staticConnect(); // 정적 데이터를 처리하는 메서드를 호출합니다.
    } catch (e) {
      console.log(e); // 오류 발생 시 콘솔에 출력합니다.
    }
  },
};

/**
 * 명령어에 따라 해당 작업을 실행합니다.
 * process.argv[2]가 정의되어 있으면 해당 작업을 실행합니다.
 */
let launchingFunc;

if (process.argv[2] === undefined) {
  // 명령어가 없으면 아무 작업도 하지 않습니다.
} else {
  launchingFunc = MENU[process.argv[2]]; // 명령어에 해당하는 작업을 찾습니다.
  if (launchingFunc !== undefined) {
    launchingFunc().catch((err) => { console.log(err); }); // 작업 실행 중 오류가 발생하면 이를 처리합니다.
  }
}
