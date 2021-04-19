const data = [
  {
    "name": "3월",
    "index": 3
  },
  {
    "name": "4월",
    "index": 9
  },
  {
    "name": "5월",
    "index": 9
  },
  {
    "name": "6월",
    "index": 17
  },
  {
    "name": "7월",
    "index": 17
  },
  {
    "name": "8월",
    "index": 13
  },
  {
    "name": "9월",
    "index": 11
  },
  {
    "name": "10월",
    "index": 32
  },
  {
    "name": "11월",
    "index": 36
  },
  {
    "name": "12월",
    "index": 44
  },
  {
    "name": "1월",
    "index": 42
  },
  {
    "name": "2월",
    "index": 35
  },
  {
    "name": "3월",
    "index": 41
  },
  {
    "name": "4월",
    "index": 52
  },
  {
    "name": "5월",
    "index": 47
  },
  {
    "name": "6월",
    "index": 51
  },
  {
    "name": "7월",
    "index": 64
  },
  {
    "name": "8월",
    "index": 66
  },
  {
    "name": "9월",
    "index": 72
  },
  {
    "name": "10월",
    "index": 70
  },
  {
    "name": "11월",
    "index": 55
  },
  {
    "name": "12월",
    "index": 68
  },
  {
    "name": "1월",
    "index": 88
  },
  {
    "name": "2월",
    "index": 75
  },
  {
    "name": "3월",
    "index": 96
  }
];

let this_ai;
let margin, width, heightMultiple;

this_ai = console.createDoc();

width = 24;
margin = 8;
heightMultiple = 4.2;

for (let i = 0; i < data.length; i++) {
  console.rectangle({
    top: (data[i].index * heightMultiple),
    left: ((width + margin) * i),
    width: width,
    height: (data[i].index * heightMultiple),
    stroke: null,
    fill: "#2fa678",
    radius: 2,
    upRound: true
  });
}
