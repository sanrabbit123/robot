const collectionName = "aliveLog";

const collectionDescription = "서버가 살아 있는지 죽어 있는지에 대한 로그가 기록되어 있는 콜렉션"

const collectionSampleData0 = {
  "_id": "66c09be07d20f001559da0d6",
  "id": "alive_of0000_aa20soq15vaj30saa11s",
  "name": "staticLounge",
  "alive": true,
  "date": {
    "from": "2024-08-15T00:20:11.370Z",
    "to": "2024-08-15T00:30:11.370Z"
  },
  "info": "officeinfo",
  "instance": {
    "id": "i-0000000000000000a",
    "type": "minisuit.i7"
  },
  "network": {
    "host": "office.home-liaison.net",
    "ip": {
      "outer": {
        "value": "3.34.135.61",
        "match": true
      },
      "inner": {
        "value": "192.168.0.88",
        "match": true
      }
    }
  },
  "utilization": {
    "cpu": null,
    "network": null,
    "disk": {
      "total": 2081092508,
      "used": 1303527204,
      "available": 777565304
    }
  }
}

const collectionSampleData1 = {
  "_id": "66c09be07d20f001559d0d00",
  "id": "alive_of0000_aa20soo11vau37saa47s",
  "name": "staticLounge",
  "alive": true,
  "date": {
    "from": "2024-06-11T11:27:47.183Z",
    "to": "2024-06-11T11:37:47.183Z"
  },
  "info": "officeinfo",
  "instance": {
    "id": "i-0000000000000000a",
    "type": "minisuit.i7"
  },
  "network": {
    "host": "home-liaison.serveftp.com",
    "ip": {
      "outer": {
        "value": "1.229.181.6",
        "match": true
      },
      "inner": {
        "value": "192.168.0.88",
        "match": true
      }
    }
  },
  "utilization": {
    "cpu": {
      "average": 0.13698983050847455,
      "maximum": 0.804
    },
    "network": {
      "in": 361370,
      "out": 361370
    },
    "disk": {
      "total": 3841399992,
      "used": 2020644720,
      "available": 1820755272
    }
  }
}

const collectionSampleData2 = {
  "_id": "66c09be07d20f001559c792a",
  "id": "alive_co0000_aa20soo03vah00saa34s",
  "name": "coreDB",
  "alive": true,
  "date": {
    "from": "2024-06-02T21:50:34.805Z",
    "to": "2024-06-02T22:00:34.805Z"
  },
  "info": "mongoinfo",
  "instance": {
    "id": "i-0bf0b3f3836d393f5",
    "type": "t3.micro"
  },
  "network": {
    "host": "13.125.51.81",
    "ip": {
      "outer": {
        "value": "13.125.51.81",
        "match": true
      },
      "inner": {
        "value": "172.31.57.134",
        "match": true
      }
    }
  },
  "utilization": {
    "cpu": {
      "average": 0.005907561405618303,
      "maximum": 0.007250966795572743
    },
    "network": {
      "in": 90393,
      "out": 3944802
    },
    "disk": {
      "total": 8377344,
      "used": 4325340,
      "available": 4052004
    }
  }
}

