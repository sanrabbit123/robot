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

from google.googleAnalytics import GoogleAnalytics
from google.googleSearchConsole import GoogleSearchConsole
from google.googleSheet import GoogleSheet
from google.googleDrive import GoogleDrive

try:

    data = getBridge()

    if argv[1] == 'analytics' and argv[2] == 'clientsIdTesting':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.clientsIdTesting(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getTodayClients':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getTodayClients()
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getClientsByDate':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getClientsByDate(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getClientById':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getClientById(data["clientId"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getUsers':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getUserNumber(data["consulting"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getAgeGender':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getAgeGender()
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'monthSearch':
        analyticsApp = GoogleSearchConsole()
        result = analyticsApp.getAllMonthData(data["monthBox"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'get':
        sheetsApp = GoogleSheet()
        result = sheetsApp.getValue(data["id"], data["range"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'update':
        sheetsApp = GoogleSheet()
        result = sheetsApp.updateValue(data["id"], data["range"], data["values"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'create':
        sheetsApp = GoogleSheet()
        result = sheetsApp.createSheets(data["title"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'cleanView':
        sheetsApp = GoogleSheet()
        result = sheetsApp.cleanView(data["id"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'fileUpload':
        driveApp = GoogleDrive()
        result = driveApp.fileUpload(data["folder_id"], data["file"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'makeFolder':
        driveApp = GoogleDrive()
        result = driveApp.makeFolder(data["folderName"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'moveFolder':
        driveApp = GoogleDrive()
        result = driveApp.moveFolder(data["targetId"], data["parent"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'permissionsOn':
        driveApp = GoogleDrive()
        result = driveApp.permissionsOn(data["targetId"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'webPublish':
        driveApp = GoogleDrive()
        result = driveApp.webPublish(data["targetId"])
        print(result)

except Exception as e:
    print(e)
