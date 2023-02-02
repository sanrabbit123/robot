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
from google.googleDocs import GoogleDocs
from google.googleYoutube import GoogleYoutube
from google.googleAds import GoogleAds
from google.googleCalendar import GoogleCalendar

try:

    data = getBridge()

    if argv[1] == 'analytics' and argv[2] == 'getSubmitClients':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getSubmitClients(data["startDate"], data["endDate"], data["cliid"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getInputBlurUsers':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getInputBlurUsers(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getUserMetric':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getUserMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getTimeMetric':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getTimeMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getOutMetric':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getOutMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getSessionMetric':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getSessionMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getUserById':
        analyticsApp = GoogleAnalytics()
        result = analyticsApp.getUserById(data["startDate"], data["endDate"], data["clientId"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'generalMetric':
        analytics = GoogleAnalytics()
        result = analytics.getGeneralMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getGeneralMetricById':
        analytics = GoogleAnalytics()
        result = analytics.getGeneralMetricById(data["startDate"], data["endDate"], data["clientId"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'eventMetric':
        analytics = GoogleAnalytics()
        result = analytics.getEventMetric(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getPopupOpenDetail':
        analytics = GoogleAnalytics()
        result = analytics.getPopupOpenDetail(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'getConsultingPageDetail':
        analytics = GoogleAnalytics()
        result = analytics.getConsultingPageDetail(data["startDate"], data["endDate"], data["dimensions"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'basicImpressions':
        analytics = GoogleSearchConsole()
        result = analytics.basicImpressions(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'analytics' and argv[2] == 'queryImpressions':
        analytics = GoogleSearchConsole()
        result = analytics.queryImpressions(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'ads' and argv[2] == 'getCampaignList':
        ads = GoogleAds()
        result = ads.getCampaignList(data["date"])
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

    elif argv[1] == 'sheets' and argv[2] == 'addSheet':
        sheetsApp = GoogleSheet()
        result = sheetsApp.addSheet(data["id"], data["nameArr"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'styleInjection':
        sheetsApp = GoogleSheet()
        result = sheetsApp.styleInjection(data["id"], data["sheetsIndex"], data["requestArr"])
        print(result)

    elif argv[1] == 'sheets' and argv[2] == 'updateDefaultSheetName':
        sheetsApp = GoogleSheet()
        result = sheetsApp.updateDefaultSheetName(data["id"], data["title"])
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

    elif argv[1] == 'drive' and argv[2] == 'searchId':
        driveApp = GoogleDrive()
        result = driveApp.searchId(data["name"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'delete':
        driveApp = GoogleDrive()
        result = driveApp.deleteFile(data["targetId"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'readFolderFiles':
        driveApp = GoogleDrive()
        result = driveApp.readFolderFiles(data["targetId"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'getTargetInfo':
        driveApp = GoogleDrive()
        result = driveApp.getTargetInfo(data["targetId"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'downloadFile':
        driveApp = GoogleDrive()
        result = driveApp.downloadFile(data["targetId"], data["targetFolder"])
        print(result)

    elif argv[1] == 'docs' and argv[2] == 'readDocs':
        docsApp = GoogleDocs()
        result = docsApp.readDocs(data["id"])
        print(dumps(result))

    elif argv[1] == 'docs' and argv[2] == 'createDocs':
        docsApp = GoogleDocs()
        id = docsApp.createDocs(data["title"])
        print(dumps({ "id": id }))

    elif argv[1] == 'docs' and argv[2] == 'insertText':
        docsApp = GoogleDocs()
        docsApp.insertText(data["id"], data["longText"])
        print(dumps({ "id": data["id"] }))

    elif argv[1] == 'docs' and argv[2] == 'insertImage':
        docsApp = GoogleDocs()
        docsApp.insertImage(data["id"], data["index"], data["url"])
        print(dumps({ "id": data["id"] }))

    elif argv[1] == 'docs' and argv[2] == 'insertContents':
        docsApp = GoogleDocs()
        docsApp.insertContents(data["id"], data["contents"])
        print(dumps({ "id": data["id"] }))

    elif argv[1] == 'test' and argv[2] == 'test':
        sheetsApp = GoogleSheet()
        result = sheetsApp.test("15WGLx0-FDlhNy_5kZJmPXSN4kBKcvaJpqJKJ7Gy9Evk")
        print(result)

    elif argv[1] == 'youtube' and argv[2] == 'channelNumbers':
        youtubeApp = GoogleYoutube()
        result = youtubeApp.channelNumbers(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'calendar' and argv[2] == 'listEvents':
        calendarApp = GoogleCalendar()
        result = calendarApp.listEvents(data["targetId"], data["query"])
        print(result)

    elif argv[1] == 'calendar' and argv[2] == 'makeSchedule':
        calendarApp = GoogleCalendar()
        result = calendarApp.makeSchedule(data["targetId"], data["body"])
        print(result)

    elif argv[1] == 'calendar' and argv[2] == 'updateSchedule':
        calendarApp = GoogleCalendar()
        result = calendarApp.updateSchedule(data["targetId"], data["eventId"], data["body"])
        print(result)

    elif argv[1] == 'calendar' and argv[2] == 'deleteSchedule':
        calendarApp = GoogleCalendar()
        result = calendarApp.deleteSchedule(data["targetId"], data["eventId"])
        print(result)

except Exception as e:
    print(e)
