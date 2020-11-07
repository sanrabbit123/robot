# set python modules ------------------------------------------------------------------------------------------------------

from os import path as osPath
from os import getcwd
from sys import argv, path
from json import loads, dumps

# return robot path
def returnModulepath():
    rawPath = getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "robot":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": robotPath, "module": modulPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
        data = jsonFile.read()

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

from tool.client import Client
from notion.client import NotionClient

try:
    app = NotionClient(token_v2="671489b54b004ebe2d266be5e21154f69dda7373ed8ba6c70747b506bce158b094a8b8cdb990007c989b874aafa8dfb7cda655bd98d902a44399ae6797f21cbbdd23504409a0349107068db13406")
    clientInstance = Client(app)
    data = getBridge()

    if argv[1] == 'single':
        newId = clientInstance.createElement(data)
        resultDic = clientInstance.toDictionary(newId)
        print(dumps(resultDic))

    if argv[1] == 'multiple':
        idArr = clientInstance.createElementsAll(data)
        resultArr = []
        for id in idArr:
            tempDic = clientInstance.toDictionary(id)
            resultArr.append(tempDic)
        print(dumps(resultArr))

    if argv[1] == 'getById':
        resultDic = clientInstance.toDictionary(data["id"])
        print(dumps(resultDic))

    if argv[1] == 'getAll':
        arr = clientInstance.getAllRows()
        print(dumps(arr))

    if argv[1] == 'updateOne':
        target = clientInstance.getElementById(data["notionId"])
        clientInstance.updateElement(target, data)
        print(dumps({ "id": data["notionId"], "update": "success" }))

except Exception as e:
    print(e)
