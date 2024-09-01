/**
 * CronSource 클래스는 크론 작업에 필요한 소스 데이터를 관리하는 역할을 합니다.
 * 이 클래스는 주어진 매개변수를 통해 인스턴스를 초기화하며, 다양한 소스 데이터를 로드하고 처리하는 기능을 제공합니다.
 * @param {Object} mother - Mother 클래스의 인스턴스. 유틸리티 메서드와 시스템 함수들을 포함하고 있습니다.
 * @param {Object} back - BackMaker 클래스의 인스턴스. MongoDB와 관련된 작업을 처리합니다.
 * @param {Object} address - 주소 정보 객체.
 * @param {Object} MONGOC - MongoDB 클라이언트 객체.
 * @param {Object} MONGOLOCALC - 로컬 MongoDB 클라이언트 객체.
 */
const CronSource = function (mother, back, address, MONGOC, MONGOLOCALC) {
  /**
   * Mother 클래스의 인스턴스를 this.mother에 저장합니다.
   * @type {Object}
   */
  this.mother = mother;

  /**
   * BackMaker 클래스의 인스턴스를 this.back에 저장합니다.
   * @type {Object}
   */
  this.back = back;

  /**
   * 주소 정보를 this.address에 저장합니다.
   * @type {Object}
   */
  this.address = address;

  /**
   * MongoDB 클라이언트 객체를 this.mongo에 저장합니다.
   * @type {Object}
   */
  this.mongo = MONGOC;

  /**
   * 로컬 MongoDB 클라이언트 객체를 this.mongolocal에 저장합니다.
   * @type {Object}
   */
  this.mongolocal = MONGOLOCALC;

  /**
   * 현재 작업 디렉토리의 경로를 가져와 this.dir에 저장합니다.
   * 이 디렉토리는 크론 작업에 필요한 소스 파일들이 위치한 디렉토리입니다.
   * @type {string}
   */
  this.dir = process.cwd() + "/apps/cronGhost/source";

  /**
   * 소스 데이터를 저장하기 위한 변수입니다. 초기값은 null로 설정됩니다.
   * @type {Object|null}
   */
  this.sourceMap = null;
}

/**
 * sourceLoad 메서드는 크론 작업에 필요한 소스 데이터를 로드하여 this.sourceMap에 저장합니다.
 * 이 메서드는 비동기로 작동하며, 여러 소스 파일을 읽고 데이터를 정렬하여 소스 맵을 생성합니다.
 * @returns {Promise<Object|null>} 로드된 소스 맵을 반환하거나 오류 발생 시 null을 반환합니다.
 */
CronSource.prototype.sourceLoad = async function () {
  /**
   * this를 instance 변수에 저장하여 내부 함수에서의 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * Mother 클래스의 fileSystem 메서드를 비구조화 할당으로 추출합니다.
   * 이 메서드는 파일 시스템 작업을 처리합니다.
   * @type {Function}
   */
  const { fileSystem } = this.mother;

  /**
   * 크론 작업 소스 파일이 위치한 디렉토리 경로를 가져옵니다.
   * @type {string}
   */
  const { dir } = this;

  try {
    /**
     * 'worker' 디렉토리 내의 모든 파일 목록을 읽어와 workerList 배열에 저장합니다.
     * @type {Array<string>}
     */
    const workerList = await fileSystem(`readFolder`, [ dir + "/worker" ]);

    /**
     * 날짜별, 시간별 최종 리스트를 저장할 배열을 초기화합니다.
     * @type {Array<Array>}
     */
    let dateFinalList = [];
    let hourFinalList = [];

    /**
     * workerList 배열에서 각 파일의 경로를 생성하여 pathList 배열에 저장합니다.
     * @type {Array<string>}
     */
    let pathList = workerList.map((name) => { return `${dir}/worker/${name}` });

    /**
     * 각 경로에 위치한 파일을 require하여 가져오고, 해당 파일에서 dayId와 hourId를 추출합니다.
     * 이를 통해 크론 작업을 실행할 시간을 결정합니다.
     */
    for (let path of pathList) {
      /**
       * 해당 경로에서 모듈을 가져옵니다.
       * @type {Object}
       */
      let tempObj = require(path);

      /**
       * dayId를 기준으로 dateFinalList에 추가합니다.
       * 동일한 dayId가 있는 경우 해당 경로를 리스트에 추가하고, 그렇지 않으면 새로 리스트를 만듭니다.
       */
      for (let id of tempObj.dayId) {
        /**
         * dayId가 이미 존재하는지 확인합니다.
         * @type {number}
         */
        let index = dateFinalList.findIndex((arr) => { return arr[0] === id });

        /**
         * dayId가 존재하지 않는다면 새로운 항목을 리스트에 추가합니다.
         * 그렇지 않다면 기존 항목에 경로를 추가합니다.
         */
        if (index === -1) {
          dateFinalList.push([ id, [ path ] ]);
        } else {
          dateFinalList[index][1].push(path);
        }
      }

      /**
       * hourId를 기준으로 hourFinalList에 추가합니다.
       * dayId 처리 방식과 유사하게 동작합니다.
       */
      for (let id of tempObj.hourId) {
        /**
         * hourId가 이미 존재하는지 확인합니다.
         * @type {number}
         */
        let index = hourFinalList.findIndex((arr) => { return arr[0] === id });

        /**
         * hourId가 존재하지 않는다면 새로운 항목을 리스트에 추가합니다.
         * 그렇지 않다면 기존 항목에 경로를 추가합니다.
         */
        if (index === -1) {
          hourFinalList.push([ id, [ path ] ]);
        } else {
          hourFinalList[index][1].push(path);
        }
      }
    }

    /**
     * dateFinalList를 정렬합니다.
     * 각 dayId를 숫자로 변환하여 오름차순으로 정렬합니다.
     */
    dateFinalList.sort((a, b) => {
      return Number(a[0].replace(/[^0-9]/gi, '')) - Number(b[0].replace(/[^0-9]/gi, ''));
    });

    /**
     * hourFinalList를 정렬합니다.
     * 각 hourId를 숫자로 변환하여 오름차순으로 정렬합니다.
     */
    hourFinalList.sort((a, b) => {
      return Number(a[0].replace(/[^0-9]/gi, '')) - Number(b[0].replace(/[^0-9]/gi, ''));
    });

    /**
     * 정렬된 dateFinalList와 hourFinalList를 sourceMap 객체에 저장합니다.
     * 이 객체는 날짜와 시간에 따라 실행할 작업을 관리합니다.
     * @type {Object}
     */
    let sourceMap = {
      date: dateFinalList,
      hour: hourFinalList
    };

    /**
     * 생성된 sourceMap을 this.sourceMap에 저장하여 인스턴스의 속성으로 유지합니다.
     */
    this.sourceMap = sourceMap;

    /**
     * 생성된 sourceMap을 콘솔에 출력하여 확인합니다.
     * 이때 JSON.stringify를 사용하여 가독성 있게 출력합니다.
     */
    console.log(JSON.stringify(sourceMap, null, 2));

    /**
     * 최종적으로 생성된 sourceMap을 반환합니다.
     * @returns {Object} sourceMap - 날짜 및 시간별로 정렬된 크론 작업 소스 데이터.
     */
    return sourceMap;

  } catch (e) {
    /**
     * 예외가 발생한 경우 오류 메시지를 콘솔에 출력합니다.
     */
    console.log(e);
  }
}

/**
 * targetLaunching 메서드는 주어진 크론 작업 ID(cronId)에 따라 적절한 작업을 실행합니다.
 * 이 메서드는 sourceMap에서 일치하는 dayId와 hourId를 찾아 해당 작업을 실행하는 기능을 수행합니다.
 * @param {Object} cronId - 현재 실행할 크론 작업의 ID를 포함한 객체입니다.
 * @param {string} cronId.day - 일간 작업을 식별하는 ID입니다.
 * @param {string} cronId.hour - 시간별 작업을 식별하는 ID입니다.
 * @returns {Promise<void>}
 */
CronSource.prototype.targetLauching = async function (cronId) {
  /**
   * instance 변수에 this를 저장하여 내부 함수에서도 this 참조를 유지합니다.
   * @type {Object}
   */
  const instance = this;

  /**
   * sourceMap에서 dayId와 hourId를 추출합니다.
   * sourceMap은 날짜와 시간에 따라 실행할 작업 목록을 저장한 객체입니다.
   * @type {Object}
   */
  const { sourceMap } = this;

  /**
   * cronId 객체에서 dayId와 hourId를 비구조화 할당으로 추출합니다.
   * @type {string}
   */
  const { day: dayId, hour: hourId } = cronId;

  /**
   * 크론 작업에 필요한 모든 패키지들을 하나의 객체로 묶어 package에 저장합니다.
   * 각 작업은 이 패키지를 받아 작업을 수행합니다.
   * @type {Object}
   */
  const package = {
    mother: this.mother,
    back: this.back,
    address: this.address,
    mongo: this.mongo,
    mongolocal: this.mongolocal,
  };

  try {
    /**
     * sourceMap에서 날짜별(dayId) 및 시간별(hourId) 작업 리스트를 가져옵니다.
     * @type {Object}
     */
    const { date, hour } = sourceMap;

    /**
     * 실행할 작업들의 리스트를 저장할 변수입니다.
     * @type {Array<Function>}
     */
    let targetList;

    /**
     * 일치하는 dayId를 찾기 위해 date 리스트에서 index를 찾습니다.
     * @type {number}
     */
    let index;

    /**
     * 실행된 작업의 수를 기록하기 위한 변수입니다.
     * @type {number}
     */
    let num;

    /**
     * 각 작업의 실행 결과를 저장할 변수입니다.
     * @type {any}
     */
    let res;

    /**
     * sourceMap.date에서 dayId와 일치하는 항목을 찾습니다.
     * - 일치하는 항목이 있으면 해당 작업을 targetList에 저장합니다.
     * @type {number}
     */
    index = sourceMap.date.findIndex((arr) => { return arr[0] === dayId; });
    if (index !== -1) {
      /**
       * 일치하는 dayId가 존재하는 경우, 해당 작업들을 로드하여 targetList에 저장합니다.
       * 각 작업 경로에서 모듈을 require하여 로드합니다.
       * @type {Array<Function>}
       */
      targetList = sourceMap.date[index][1].map((path) => {
        return require(path);
      });

      /**
       * targetList에 저장된 모든 작업을 순차적으로 실행합니다.
       * 실행된 작업의 수를 num에 기록합니다.
       * 각 작업은 package 객체를 인자로 받아 수행됩니다.
       */
      num = 0;
      for (let obj of targetList) {
        res = await obj.worker(package);
        num++;
      }
    }

    /**
     * sourceMap.hour에서 hourId와 일치하는 항목을 찾습니다.
     * - 일치하는 항목이 있으면 해당 작업을 targetList에 저장합니다.
     * @type {number}
     */
    index = sourceMap.hour.findIndex((arr) => { return arr[0] === hourId; });
    if (index !== -1) {
      /**
       * 일치하는 hourId가 존재하는 경우, 해당 작업들을 로드하여 targetList에 저장합니다.
       * 각 작업 경로에서 모듈을 require하여 로드합니다.
       * @type {Array<Function>}
       */
      targetList = sourceMap.hour[index][1].map((path) => {
        return require(path);
      });

      /**
       * targetList에 저장된 모든 작업을 순차적으로 실행합니다.
       * 실행된 작업의 수를 num에 기록합니다.
       * 각 작업은 package 객체를 인자로 받아 수행됩니다.
       */
      num = 0;
      for (let obj of targetList) {
        res = await obj.worker(package);
        num++;
      }
    }

  } catch (e) {
    /**
     * 작업 중 예외가 발생하면 콘솔에 오류 메시지를 출력합니다.
     */
    console.log(e);
  }
}

module.exports = CronSource;
