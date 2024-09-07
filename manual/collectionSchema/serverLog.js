const collectionName = "serverLog";

const collectionDescription = "서버에서 에러 로그를 출력한 패킷에 대해 시간순으로 저장해놓은 콜렉션"

const collectionSampleData0 = {
  "_id": "66dbdc4f90e99ee12a2a2cd9",
  "date": "2024-09-07T04:20:20.644Z",
  "server": "transferLounge",
  "contents": "============================================================\n2024-09-07T04:20:20.644Z error\naspirant onboarding => \n[{\"aspid\":\"a2404_aa17s\",\"name\":\"정기현\"},{\"aspid\":\"a2306_aa02s\",\"name\":\"김정옥\"},{\"aspid\":\"a2403_aa02s\",\"name\":\"황미연\"},{\"aspid\":\"a2402_aa05s\",\"name\":\"김민지\"},{\"aspid\":\"a2312_aa07s\",\"name\":\"김민하\"}]\n============================================================"
}

const collectionSampleData1 = {
  "_id": "66da7c5af79983585f1a29d1",
  "date": "2024-09-06T01:10:39.712Z",
  "server": "staticLounge",
  "contents": "============================================================\n2024-09-06T01:10:39.712Z error\nin /updateImagesOrder\nTypeError: Cannot read properties of undefined (reading 'fromIndex')\n    at /home/ubuntu/robot/apps/staticLounge/router/staticRouter.js:9622:89\n    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ubuntu/robot/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ubuntu/robot/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ubuntu/robot/node_modules/express/lib/router/index.js:284:15\n    at Function.process_params (/home/ubuntu/robot/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ubuntu/robot/node_modules/express/lib/router/index.js:280:10)\n    at Function.handle (/home/ubuntu/robot/node_modules/express/lib/router/index.js:175:3)\n    at router (/home/ubuntu/robot/node_modules/express/lib/router/index.js:47:12)\n============================================================"
}

const collectionSampleData2 = {
  "_id": "66da794c4682dd991f081a64",
  "date": "2024-09-05T07:17:53.090Z",
  "server": "dataConsole",
  "contents": "============================================================\n2024-09-05T07:17:53.090Z error\nin /errorLog\nReferenceError: e is not defined\n    at obj.func (/home/ubuntu/robot/apps/dataConsole/router/dataRouter.js:6151:20)\n    at /home/ubuntu/robot/apps/dataConsole/dataConsole.js:791:23\n    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/ubuntu/robot/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/ubuntu/robot/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/ubuntu/robot/node_modules/express/lib/router/layer.js:95:5)\n    at /home/ubuntu/robot/node_modules/express/lib/router/index.js:284:15\n    at Function.process_params (/home/ubuntu/robot/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/ubuntu/robot/node_modules/express/lib/router/index.js:280:10)\n    at /home/ubuntu/robot/apps/dataConsole/dataConsole.js:666:7\n============================================================"
}

