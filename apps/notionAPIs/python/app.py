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

from tool.notionCommunication import NotionCommunication

try:
    token = "6ec68e96c2012ad1e243df2f30b7cf9098d5f558ea0883dbfaa3a22da058ba69466786a87d25dfdb6a9a3f04955f50c7c9d49a5a75262f6493ca4626d18363b9028ca6ff214364792bb637cded46"
    pathDic = returnModulepath()
    tempPath = pathDic["robot"] + "/temp"
    data = getBridge()
    notionInstance = NotionCommunication(token=token, tempDir=tempPath)

    if argv[1] == 'getCollection':
        resultList = notionInstance.getCollection(data["id"])
        print(dumps(resultList))

    elif argv[1] == 'appendRow':
        notionInstance.appendRow(data["id"], data["dictionary"])
        print(dumps({ "message": "done" }))

except Exception as e:
    print(e)
