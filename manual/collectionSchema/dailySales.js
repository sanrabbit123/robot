const collectionName = "dailySales";

const collectionDescription = "해당 영업일 기준 세일즈 대상 (고객 아이디 배열) 추리는 연산 결과를 저장하는 디비"

const collectionSampleData0 = {
  "_id": "66db92d671210d45f3faed9d",
  "id": "sales_20240902",
  "date": "2024-09-02T00:00:00.000Z",
  "range": {
    "from": "2024-08-30T00:00:00.000Z",
    "to": "2024-09-02T00:00:00.000Z"
  },
  "cliids": [
    {
      "cliid": "c2409_aa08s",
      "possible": 0,
      "priority": 0,
      "target": 0
    },
    {
      "cliid": "c2408_ab52s",
      "possible": 0,
      "priority": 0,
      "target": 0
    },
    {
      "cliid": "c2409_aa07s",
      "possible": 0,
      "priority": 0,
      "target": 0
    },
  ]
}
