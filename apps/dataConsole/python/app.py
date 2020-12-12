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

from tool.dateCalculation import DateCalculation
from cryptography.fernet import Fernet
from enDecrypt import EnDecrypt

try:

    data = getBridge()
    robotPath = returnModulepath()
    pemsName = {
        "data": robotPath["robot"] + "/pems/members.pem",
        "key": robotPath["robot"] + "/apps/dataConsole/python/members/membersKey.pem",
        "token": robotPath["robot"] + "/apps/dataConsole/python/members/membersToken.pem",
    }

    if argv[1] == 'dateMatrix':
        dateApp = DateCalculation(data["length"])
        print(dumps(dateApp.getDateMatrix()))

    elif argv[1] == 'dateMatrixFullSet':
        dateApp = DateCalculation(data["length"])
        print(dumps(dateApp.getDateMatrix(fullSet=True, future=True)))

    elif argv[1] == 'thisWeek':
        dateApp = DateCalculation(2)
        print(dumps(dateApp.thisWeek(data["today"])))

    elif argv[1] == 'membersEncode':
        with open(pemsName["data"], 'r') as membersJson:
            members = dumps(membersJson.read())

        key = Fernet.generate_key()
        enDecrypt = EnDecrypt(key)
        token = enDecrypt.encrypt(members)

        with open(pemsName["key"], 'wb') as keyFile:
            keyFile.write(key)
        with open(pemsName["token"], 'wb') as tokenFile:
            tokenFile.write(token)

    elif argv[1] == 'getMembers':
        with open(pemsName["key"], 'rb') as membersKeyRaw:
            membersKey = membersKeyRaw.read()
        with open(pemsName["token"], 'rb') as membersTokenRaw:
            membersToken = membersTokenRaw.read()

        membersEnDecrypt = EnDecrypt(membersKey)
        membersObjString = membersEnDecrypt.decrypt(membersToken)
        membersObj = loads(membersObjString)
        print(dumps(membersObj))

except Exception as e:
    print(e)
