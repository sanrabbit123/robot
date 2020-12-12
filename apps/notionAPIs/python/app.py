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
    pythonCloudPath = resultPath + "apps/pythonCloud/python/tool"
    return { "robot": robotPath, "module": modulPath, "pythonCloud": pythonCloudPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    try:
        with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
            data = jsonFile.read()
    except Exception as e:
        data = {}

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
    path.append(pathDic["pythonCloud"])

except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

from tool.client import Client
from notion.client import NotionClient

from tool.notionCommunication import NotionCommunication

try:
    token = "a28a19d68caead0baa5bf2c8f46d1c58e00a62ea3ffa02a45dd3f9f26587e5d6a741a16f367732aa9031163e77728aead6e3e902fe3711c00cee3e083db43cc25df07d9de7083f152c962cabfc24"
    pathDic = returnModulepath()
    tempPath = pathDic["robot"] + "/temp"
    data = getBridge()

    # app = NotionClient(token_v2="671489b54b004ebe2d266be5e21154f69dda7373ed8ba6c70747b506bce158b094a8b8cdb990007c989b874aafa8dfb7cda655bd98d902a44399ae6797f21cbbdd23504409a0349107068db13406")
    # clientInstance = Client(app)

    if argv[1] == 'single':
        newId = clientInstance.createElement(data)
        resultDic = clientInstance.toDictionary(newId)
        print(dumps(resultDic))

    elif argv[1] == 'multiple':
        idArr = clientInstance.createElementsAll(data)
        resultArr = []
        for id in idArr:
            tempDic = clientInstance.toDictionary(id)
            resultArr.append(tempDic)
        print(dumps(resultArr))

    elif argv[1] == 'getById':
        resultDic = clientInstance.toDictionary(data["id"])
        print(dumps(resultDic))

    elif argv[1] == 'getAll':
        arr = clientInstance.getAllRows()
        print(dumps(arr))

    elif argv[1] == 'updateOne':
        target = clientInstance.getElementById(data["notionId"])
        clientInstance.updateElement(target, data)
        print(dumps({ "id": data["notionId"], "update": "success" }))

    elif argv[1] == 'blockToJson':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        fileList = notionInstance.blockToJson(data["blockInfo"])
        print(dumps({ "resultFileList": fileList }))

    elif argv[1] == 'getAllRows':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        allRows = notionInstance.getAllRows(data["blockInfo"])
        print(allRows)

    elif argv[1] == 'setConsoleLink':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        notionInstance.setConsoleLink(data["blockInfo"])
        print(dumps({ "message": "done" }))

    elif argv[1] == 'getElementById':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        cardObj = notionInstance.getElementById(data["id"])
        print(dumps(cardObj))

    elif argv[1] == 'pastToNewDesid':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        notionInstance.pastToNewDesid(data["blockInfo"], data["filter"])
        print(dumps({ "message": "done" }))

    elif argv[1] == 'treeParsing':
        notionInstance = NotionCommunication(token=token, tempDir=tempPath)
        fileName = notionInstance.treeParsingAndJson(data["id"])
        print(dumps({ "resultFile": fileName }))

except Exception as e:
    print(e)
