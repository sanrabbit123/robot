# 필요한 파이썬 모듈을 임포트합니다. osPath는 파일 경로를 다루기 위한 모듈이고, getcwd는 현재 작업 디렉토리를 얻기 위한 함수입니다.
# sys 모듈의 argv와 path는 명령 줄 인수를 처리하고 모듈 경로를 설정하는 데 사용됩니다.
# json 모듈의 loads와 dumps는 JSON 데이터를 파싱하고 생성하는 데 사용됩니다.
from os import path as osPath
from os import getcwd
from sys import argv, path
from json import loads, dumps

# 현재 작업 디렉토리에서 로봇 관련 경로를 반환하는 함수입니다.
def returnModulepath():
    # getcwd를 사용하여 현재 작업 디렉토리의 절대 경로를 얻습니다.
    rawPath = getcwd()
    # 경로를 '/'로 분할하여 배열로 만듭니다.
    rawPathArr = rawPath.split('/')
    num = 0  # 인덱스 추적을 위한 변수
    index = 0  # "robot" 디렉토리의 위치를 추적하기 위한 변수
    # 경로 배열에서 "robot"이라는 디렉토리의 위치를 찾습니다.
    for path in rawPathArr:
        if path == "robot":
            index = num  # "robot" 디렉토리의 인덱스를 저장
        num = num + 1
    resultPath = ''  # 최종 경로를 저장하기 위한 변수
    # "robot" 디렉토리까지의 경로를 재구성합니다.
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    # "robot" 경로와 모듈 경로 및 pythonCloud 경로를 설정합니다.
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    pythonCloudPath = resultPath + "apps/pythonCloud/python/tool"
    # 설정된 경로들을 딕셔너리 형태로 반환합니다.
    return { "robot": robotPath, "module": modulPath, "pythonCloud": pythonCloudPath }

# JSON 데이터를 반환하는 함수입니다.
def getBridge():
    # 로봇 모듈 경로를 가져옵니다.
    pathDic = returnModulepath()

    # 현재 파일의 절대 경로를 얻고, 이를 '/'로 분할하여 배열로 만듭니다.
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()  # 배열의 길이를 구합니다.
    name = fileArr[count - 3]  # 배열의 세 번째 마지막 요소를 파일 이름으로 설정합니다.

    # 지정된 경로에서 JSON 파일을 읽어 들여 데이터를 반환합니다.
    try:
        with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
            data = jsonFile.read()
    except Exception as e:
        data = {}  # 파일을 읽는 중 오류가 발생하면 빈 딕셔너리를 반환합니다.

    return loads(data)  # JSON 데이터를 파싱하여 반환합니다.

# 로봇 모듈 경로를 파이썬 모듈 경로에 추가하는 부분입니다.
try:
    # 경로를 설정하고 path 리스트에 추가합니다.
    pathDic = returnModulepath()
    path.append(pathDic["module"])
    path.append(pathDic["pythonCloud"])

# 만약 오류가 발생하면 예외를 출력합니다.
except Exception as e:
    print(e)


# Python 실행 부분입니다. 여기서 Google API 모듈을 사용합니다.
from google.googleAnalytics import GoogleAnalytics
from google.googleSearchConsole import GoogleSearchConsole
from google.googleSheet import GoogleSheet
from google.googleDrive import GoogleDrive
from google.googleYoutube import GoogleYoutube
from google.googleAds import GoogleAds
from google.googleCalendar import GoogleCalendar

# 명령줄 인수에 따라 적절한 Google API 기능을 호출하고 결과를 출력합니다.
try:
    # getBridge 함수를 호출하여 JSON 데이터를 로드합니다.
    data = getBridge()

    # 명령줄 인수에 따라 Google Analytics 모듈의 메서드를 호출합니다.
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

    # Google Search Console 관련 메서드 호출
    elif argv[1] == 'console' and argv[2] == 'basicImpressions':
        analytics = GoogleSearchConsole()
        result = analytics.basicImpressions(data["startDate"], data["endDate"])
        print(result)

    elif argv[1] == 'console' and argv[2] == 'queryImpressions':
        analytics = GoogleSearchConsole()
        result = analytics.queryImpressions(data["startDate"], data["endDate"])
        print(result)

    # Google Ads 관련 메서드 호출
    elif argv[1] == 'ads' and argv[2] == 'getCampaignList':
        ads = GoogleAds()
        result = ads.getCampaignList(data["date"])
        print(result)

    # Google Sheets 관련 메서드 호출
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

    # Google Drive 관련 메서드 호출
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

    elif argv[1] == 'drive' and argv[2] == 'searchFolderId':
        driveApp = GoogleDrive()
        result = driveApp.searchFolderId(data["name"], data["parentId"])
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'searchFileId':
        driveApp = GoogleDrive()
        result = driveApp.searchFileId(data["name"], data["parentId"])
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
        result = driveApp.getTargetInfo(data["targetId"], False)
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'getTargetAbsolute':
        driveApp = GoogleDrive()
        result = driveApp.getTargetInfo(data["targetId"], True)
        print(result)

    elif argv[1] == 'drive' and argv[2] == 'downloadFile':
        driveApp = GoogleDrive()
        result = driveApp.downloadFile(data["targetId"], data["targetFolder"])
        print(result)

    # Google YouTube 관련 메서드 호출
    elif argv[1] == 'youtube' and argv[2] == 'channelNumbers':
        youtubeApp = GoogleYoutube()
        result = youtubeApp.channelNumbers(data["startDate"], data["endDate"])
        print(result)

    # Google Calendar 관련 메서드 호출
    elif argv[1] == 'calendar' and argv[2] == 'listEvents':
        calendarApp = GoogleCalendar()
        result = calendarApp.listEvents(data["targetId"], data["query"])
        print(result)

    elif argv[1] == 'calendar' and argv[2] == 'listEventsNonePast':
        calendarApp = GoogleCalendar()
        result = calendarApp.listEventsNonePast(data["targetId"], data["query"])
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

    elif argv[1] == 'calendar' and argv[2] == 'deleteSchedules':
        calendarApp = GoogleCalendar()
        result = calendarApp.deleteSchedules(data["targetId"], data["eventId"])
        print(result)

# 오류 발생 시 예외 메시지를 출력합니다.
except Exception as e:
    print(e)