const collectionName = "aliveLog";

const collectionDescription = "서버가 살아 있는지 죽어 있는지에 대한 로그가 기록되어 있는 콜렉션"

/**
 * aliveLog 컬렉션: 서버가 살아 있는지, 죽어 있는지에 대한 로그를 저장하는 컬렉션
 * 이 컬렉션은 서버의 상태를 추적하고 기록하는 데이터를 포함합니다.
 */

/**
 * 첫 번째 샘플 데이터: staticLounge 서버의 생존 기록
 */
const collectionSampleData0 = {
  /**
   * 고유 식별자 (_id)
   * @type {string}
   */
  "_id": "66c09be07d20f001559da0d6",  // MongoDB에서 자동 생성된 ObjectId로 이 로그 문서의 고유 식별자입니다.
  
  /**
   * 서버 식별 ID (id)
   * @type {string}
   */
  "id": "alive_of0000_aa20soq15vaj30saa11s",  // 서버의 생존 상태를 나타내는 고유 ID입니다.
  
  /**
   * 서버 이름 (name)
   * @type {string}
   */
  "name": "staticLounge",  // 이 로그가 기록된 서버의 이름입니다.
  
  /**
   * 서버 생존 여부 (alive)
   * @type {boolean}
   */
  "alive": true,  // 서버가 현재 살아있음을 나타냅니다.
  
  /**
   * 서버 생존 시간 (date)
   * @type {object}
   */
  "date": {
    /**
     * 서버가 시작된 시간 (from)
     * @type {string}
     */
    "from": "2024-08-15T00:20:11.370Z",  // 서버가 작동을 시작한 시간입니다.
    
    /**
     * 서버가 종료된 시간 (to)
     * @type {string}
     */
    "to": "2024-08-15T00:30:11.370Z"  // 서버가 작동을 중단한 시간입니다.
  },
  
  /**
   * 서버 관련 정보 (info)
   * @type {string}
   */
  "info": "officeinfo",  // 서버에 대한 추가적인 정보입니다.
  
  /**
   * 서버 인스턴스 정보 (instance)
   * @type {object}
   */
  "instance": {
    /**
     * 인스턴스 ID (id)
     * @type {string}
     */
    "id": "i-0000000000000000a",  // 서버 인스턴스의 고유 ID입니다.
    
    /**
     * 인스턴스 유형 (type)
     * @type {string}
     */
    "type": "minisuit.i7"  // 서버 인스턴스의 유형을 나타냅니다.
  },
  
  /**
   * 네트워크 정보 (network)
   * @type {object}
   */
  "network": {
    /**
     * 서버 호스트 주소 (host)
     * @type {string}
     */
    "host": "office.home-liaison.net",  // 서버가 속한 네트워크의 호스트 주소입니다.
    
    /**
     * 서버의 IP 정보 (ip)
     * @type {object}
     */
    "ip": {
      /**
       * 외부 IP 정보 (outer)
       * @type {object}
       */
      "outer": {
        "value": "3.34.135.61",  // 서버의 외부 IP 주소입니다.
        "match": true  // 기록된 외부 IP가 일치함을 나타냅니다.
      },
      
      /**
       * 내부 IP 정보 (inner)
       * @type {object}
       */
      "inner": {
        "value": "192.168.0.88",  // 서버의 내부 IP 주소입니다.
        "match": true  // 기록된 내부 IP가 일치함을 나타냅니다.
      }
    }
  },
  
  /**
   * 서버의 자원 활용도 (utilization)
   * @type {object}
   */
  "utilization": {
    /**
     * CPU 활용도 (cpu)
     * @type {null}
     */
    "cpu": null,  // 이 항목에 대한 CPU 데이터는 수집되지 않았습니다.
    
    /**
     * 네트워크 활용도 (network)
     * @type {null}
     */
    "network": null,  // 이 항목에 대한 네트워크 데이터는 수집되지 않았습니다.
    
    /**
     * 디스크 활용도 (disk)
     * @type {object}
     */
    "disk": {
      "total": 2081092508,  // 서버의 디스크 총 용량 (바이트 단위)
      "used": 1303527204,  // 사용 중인 디스크 용량 (바이트 단위)
      "available": 777565304  // 남은 디스크 용량 (바이트 단위)
    }
  }
}

/**
 * 두 번째 샘플 데이터: staticLounge 서버의 또 다른 생존 기록
 */
const collectionSampleData1 = {
  "_id": "66c09be07d20f001559d0d00",  // MongoDB에서 자동 생성된 고유 ObjectId입니다.
  "id": "alive_of0000_aa20soo11vau37saa47s",  // 서버 생존 상태를 나타내는 고유 ID입니다.
  "name": "staticLounge",  // 이 로그가 기록된 서버의 이름입니다.
  "alive": true,  // 서버가 살아 있음을 나타냅니다.
  "date": {
    "from": "2024-06-11T11:27:47.183Z",  // 서버가 작동을 시작한 시간입니다.
    "to": "2024-06-11T11:37:47.183Z"  // 서버가 작동을 중단한 시간입니다.
  },
  "info": "officeinfo",  // 서버 관련 추가 정보입니다.
  "instance": {
    "id": "i-0000000000000000a",  // 서버 인스턴스의 고유 ID입니다.
    "type": "minisuit.i7"  // 서버 인스턴스의 유형입니다.
  },
  "network": {
    "host": "home-liaison.serveftp.com",  // 서버의 네트워크 호스트 주소입니다.
    "ip": {
      "outer": {
        "value": "1.229.181.6",  // 외부 IP 주소입니다.
        "match": true  // 기록된 외부 IP가 일치함을 나타냅니다.
      },
      "inner": {
        "value": "192.168.0.88",  // 내부 IP 주소입니다.
        "match": true  // 기록된 내부 IP가 일치함을 나타냅니다.
      }
    }
  },
  "utilization": {
    /**
     * CPU 활용도 (cpu)
     * @type {object}
     */
    "cpu": {
      "average": 0.13698983050847455,  // 평균 CPU 활용도 (백분율)
      "maximum": 0.804  // 최대 CPU 활용도 (백분율)
    },
    
    /**
     * 네트워크 사용량 (network)
     * @type {object}
     */
    "network": {
      "in": 361370,  // 네트워크 입력 데이터 양 (바이트 단위)
      "out": 361370  // 네트워크 출력 데이터 양 (바이트 단위)
    },
    
    /**
     * 디스크 활용도 (disk)
     * @type {object}
     */
    "disk": {
      "total": 3841399992,  // 서버의 디스크 총 용량 (바이트 단위)
      "used": 2020644720,  // 사용 중인 디스크 용량 (바이트 단위)
      "available": 1820755272  // 남은 디스크 용량 (바이트 단위)
    }
  }
}
