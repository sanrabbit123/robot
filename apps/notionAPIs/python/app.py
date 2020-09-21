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
    app = NotionClient(token_v2="48939ecc63b3d656b974759f02242a4ab3668d47a946fae84e3897b20db14dfb2f0afae3c69dd00f75384e29ca9bacebf62347556719ee03a66f3988385dfb7edb341e1331049d0937f3f2987208")
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

except Exception as e:
    print(e)
