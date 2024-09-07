const collectionName = "costLog";

const collectionDescription = "AWS 비용 기록에 대한 디비, 사용되지 않음"

const collectionSampleData0 = {
  "_id": "66c215e67ae42c7111d0d949",
  "id": "cost_aws0000_aa20soq17vaa00saa00s",
  "date": {
    "start": "2024-08-16T15:00:00.000Z",
    "end": "2024-08-17T15:00:00.000Z"
  },
  "cost": {
    "unit": "USD",
    "amount": 21.6159914506,
    "composition": [
      {
        "name": "AWS Cost Explorer",
        "amount": 0.34,
        "ratio": 0.015729095784341764
      },
      {
        "name": "AWS Key Management Service",
        "amount": 0,
        "ratio": 0
      },
      {
        "name": "EC2 - Other",
        "amount": 13.2679989123,
        "ratio": 0.6138047816414971
      },
      {
        "name": "Amazon Elastic Compute Cloud - Compute",
        "amount": 7.4469655127,
        "ratio": 0.34451186427043545
      },
      {
        "name": "Amazon Route 53",
        "amount": 0.0032988,
        "ratio": 0.00015260923874525471
      },
      {
        "name": "Amazon Simple Notification Service",
        "amount": 5.6e-9,
        "ratio": 2.590674599773937e-10
      },
      {
        "name": "Amazon Simple Storage Service",
        "amount": 0.00614488,
        "ratio": 0.0002842747238331941
      },
      {
        "name": "Amazon Virtual Private Cloud",
        "amount": 0.55158334,
        "ratio": 0.025517374082079845
      },
      {
        "name": "AmazonCloudWatch",
        "amount": 0,
        "ratio": 0
      }
    ]
  }
}

const collectionSampleData1 = {
  "_id": "66c09c127d20f001559fcb8e",
  "id": "cost_aws0000_aa20sop08vaa00saa00s",
  "date": {
    "start": "2024-07-07T15:00:00.000Z",
    "end": "2024-07-08T15:00:00.000Z"
  },
  "cost": {
    "unit": "USD",
    "amount": 15.1642596803,
    "composition": [
      {
        "name": "AWS Cost Explorer",
        "amount": 0.42,
        "ratio": 0.027696703225520796
      },
      {
        "name": "EC2 - Other",
        "amount": 7.0373584333,
        "ratio": 0.4640753048064907
      },
      {
        "name": "Amazon Elastic Compute Cloud - Compute",
        "amount": 6.756119247,
        "ratio": 0.44552911842949533
      },
      {
        "name": "Amazon Route 53",
        "amount": 0.010702,
        "ratio": 0.0007057383759988656
      },
      {
        "name": "Amazon Virtual Private Cloud",
        "amount": 0.93,
        "ratio": 0.06132841428508177
      },
      {
        "name": "AmazonCloudWatch",
        "amount": 0.01008,
        "ratio": 0.0006647208774124991
      }
    ]
  }
}
