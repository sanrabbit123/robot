from sys import argv
from json import loads, dumps
from bridge import getBridge
from tool.client import Client
from notion.client import NotionClient

try:
    app = NotionClient(token_v2="48939ecc63b3d656b974759f02242a4ab3668d47a946fae84e3897b20db14dfb2f0afae3c69dd00f75384e29ca9bacebf62347556719ee03a66f3988385dfb7edb341e1331049d0937f3f2987208")
    clientInstance = Client(app)
    data = getBridge()

    if argv[1] == 'single':
        newId = clientInstance.createElement(data)
        resultDic = clientInstance.toDictionary(newId)
        resultDic["notionId"] = newId
        print(dumps(resultDic))

    if argv[1] == 'multiple':
        idArr = clientInstance.createElementsAll(data)
        resultArr = []
        for id in idArr:
            tempDic = clientInstance.toDictionary(id)
            tempDic["notionId"] = id
            resultArr.append(tempDic)
        print(dumps(resultArr))

except:
    print("error")
