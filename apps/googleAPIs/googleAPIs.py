from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
from apps.googleAPIs.module.googleAnalytics import GoogleAnalytics
from apps.googleAPIs.module.googleSearchConsole import GoogleSearchConsole
from apps.googleAPIs.module.googleSheets import GoogleSheets
from apps.googleAPIs.module.googleDrive import GoogleDrive
from apps.googleAPIs.module.googleDocs import GoogleDocs
from apps.googleAPIs.module.googleYoutube import GoogleYoutube
from apps.googleAPIs.module.googleAds import GoogleAds
from apps.googleAPIs.module.googleCalendar import GoogleCalendar
from apps.googleAPIs.module.googleSlides import GoogleSlides
from apps.googleAPIs.module.googleForms import GoogleForms
from apps.googleAPIs.module.googleAi import GoogleAi

class GoogleAPIs:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/googleAPIs"
        self.moduleDir = self.dir + "/module"

        self.abc = []
        alphabet = []
        for i in range(ord("A"), ord("Z") + 1):
            alphabet.append(chr(i))
        for c in alphabet:
            self.abc.append(c)
        for c in alphabet:
            for d in alphabet:
                self.abc.append(c + d)

    def parsingId(self, link: str) -> str:
        if patternTest(r"^http", link):
            linkArr0 = link.split("?")
            linkArr1 = linkArr0[0].split("/")
            target = None
            for factor in linkArr1:
                if not patternTest(r"(docs|document|spreadsheets|drive|google|file|folders|view)", factor):
                    if len(factor) > 12:
                        target = factor
            if target is None:
                raise Exception("invalid link")
            return target
        else:
            return link

    async def ai_talkToGemini(self, inputString: str) -> str:
        gemini = GoogleAi()
        responseText = await gemini.talkToGemini(inputString)
        return responseText
    
    async def ai_extractKeywords(self, inputString: str) -> list:
        gemini = GoogleAi()
        responseText = await gemini.extractKeywords(inputString)
        return responseText

    async def ai_geminiSlack(self, channel: str, query: str, userDict = None):
        address = self.address
        port = 3000
        path = "/geminiSlack"
        result = await self.ai_talkToGemini(query)
        thisText = ""
        if type(userDict) is dict:
            thisText = "<@" + userDict["slack"]["id"] + "> " + patternReplace(result, r"\<\@[^\>]+\>", "")
        elif type(userDict) is str:
            thisText = "<@" + userDict + "> " + patternReplace(result, r"\<\@[^\>]+\>", "")
        else:
            thisText = patternReplace(result, r"\<\@[^\>]+\>", "")

        await requestSystem("https://" + address["secondinfo"]["host"] + ":" + str(port) + path, {
            "channel": channel,
            "text": thisText
        }, {
            "headers": {
                "Content-Type": "application/json"
            }
        })

        return { "message": "done" }

    def search_basicImpressions(self, siteUrl, startDate, endDate):
        analytics = GoogleSearchConsole()
        result = analytics.basicImpressions(siteUrl, startDate, endDate)
        del result["responseAggregationType"]
        return result["rows"]

    def search_queryImpressions(self, siteUrl, startDate, endDate):
        analytics = GoogleSearchConsole()
        result = analytics.queryImpressions(siteUrl, startDate, endDate)
        del result["responseAggregationType"]
        return result["rows"]

    def drive_fileUpload(self, folderId: str, filePath: str):
        driveApp = GoogleDrive()
        result = driveApp.fileUpload(folderId, filePath)
        return result

    def drive_makeFolder(self, parentId: str, folderName: str):
        driveApp = GoogleDrive()
        result = driveApp.makeFolder(folderName)
        targetId = result["id"]
        result = driveApp.moveFolder(targetId, parentId)
        return { "id": targetId }

    def drive_moveFile(self, targetId: str, newParentId: str):
        driveApp = GoogleDrive()
        result = driveApp.moveFolder(targetId, newParentId)
        return result

    def drive_permissionsOn(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.permissionsOn(targetId)
        return result

    def drive_webPublish(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.webPublish(targetId)
        return result

    def drive_searchId(self, query: str):
        driveApp = GoogleDrive()
        result = driveApp.searchId(query)
        return result

    def drive_searchFolderId(self, query: str, parentId: str):
        driveApp = GoogleDrive()
        result = driveApp.searchFolderId(query, parentId)
        return result

    def drive_searchFileId(self, query: str, parentId: str):
        driveApp = GoogleDrive()
        result = driveApp.searchFileId(query, parentId)
        return result

    def drive_deleteFile(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.deleteFile(targetId)
        return result

    def drive_listFolderFiles(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.readFolderFiles(targetId)
        return result

    def drive_getTargetInfo(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.getTargetInfo(targetId, False)
        return result

    def drive_getTargetAbsolute(self, targetId: str):
        driveApp = GoogleDrive()
        result = driveApp.getTargetInfo(targetId, True)
        return result

    def drive_downloadFile(self, targetId: str, targetFolder: str):
        driveApp = GoogleDrive()
        result = driveApp.downloadFile(targetId, targetFolder)
        return result

    def sheets_getValue(self, targetId, thisRange):
        sheetsApp = GoogleSheets()
        result = sheetsApp.getValue(self.parsingId(targetId), thisRange)
        return result

    def sheets_updateValue(self, targetId: str, sheetsName: str, values: list, startPoint = None):
        sheetsApp = GoogleSheets()

        if startPoint is None:
            startPoint = [ 0, 0 ]
        if type(startPoint) is not list:
            startPoint = [ 0, 0 ]
        if len(startPoint) != 2:
            startPoint = [ 0, 0 ]
        if len(values) == 0:
            raise Exception("invalid update values")

        thisRange = ""
        thisRange += sheetsName + "!"
        thisRange += self.abc[startPoint[0]] + str(startPoint[1] + 1) + ":"
        thisRange += self.abc[startPoint[0] + values[0].__len__() - 1] + str(startPoint[1] + 1 + values.__len__() - 1)

        result = sheetsApp.updateValue(self.parsingId(targetId), thisRange, values)
        return result

    def sheets_createSheets(self, sheetsTitle: str, parentId: str):
        sheetsApp = GoogleSheets()
        result = sheetsApp.createSheets(sheetsTitle)
        targetId = result["id"]
        self.drive_moveFile(targetId, parentId)
        return { "id": targetId }

    def sheets_cleanView(self, targetId: str):
        sheetsApp = GoogleSheets()
        result = sheetsApp.cleanView(targetId)
        return result
    
    def sheets_addSheets(self, targetId: str, nameList: list):
        sheetsApp = GoogleSheets()
        result = sheetsApp.addSheet(targetId, nameList)
        return result

    def sheets_styleInjection(self, targetId: str, sheetsIndex, requestArr: list):
        sheetsApp = GoogleSheets()
        result = sheetsApp.styleInjection(targetId, sheetsIndex, requestArr)
        return result

    def sheets_updateDefaultSheetsName(self, targetId: str, sheetsName: str):
        sheetsApp = GoogleSheets()
        result = sheetsApp.updateDefaultSheetName(targetId, sheetsName)
        return result

    def docs_readDocs(self, targetId: str):
        docsApp = GoogleDocs()
        result = docsApp.readDocs(targetId)
        return result

    def docs_createDocs(self, docsTitle: str, parentId: str):
        docsApp = GoogleDocs()
        result = docsApp.createDocs(docsTitle)
        targetId = result["id"]
        self.drive_moveFile(targetId, parentId)
        return { "id": targetId }

    def docs_insertText(self, targetId: str, longText: str):
        docsApp = GoogleDocs()
        docsApp.insertText(targetId, longText)
        return { "id": targetId }

    def docs_insertImage(self, targetId: str, index, url: str):
        docsApp = GoogleDocs()
        docsApp.insertImage(targetId, index, url)
        return { "id": targetId }

    def docs_insertContents(self, targetId: str, contents: list):
        docsApp = GoogleDocs()
        docsApp.insertContents(targetId, contents)
        return { "id": targetId }

    def youtube_channelNumbers(self, startDate, endDate):
        youtubeApp = GoogleYoutube()
        result = youtubeApp.channelNumbers(dateToString(startDate), dateToString(endDate))
        return result

    def calendar_listEvents(self, targetId: str, query: str):
        calendarApp = GoogleCalendar()
        result = calendarApp.listEvents(targetId, query)
        return result

    def calendar_makeSchedule(self, targetId: str, scheduleBody):
        calendarApp = GoogleCalendar()
        result = calendarApp.makeSchedule(targetId, scheduleBody)
        return result

    def calendar_updateSchedule(self, targetId: str, eventId: str, scheduleBody):
        calendarApp = GoogleCalendar()
        result = calendarApp.updateSchedule(targetId, eventId, scheduleBody)
        return result

    def calendar_deleteSchedule(self, targetId: str, eventId: str):
        calendarApp = GoogleCalendar()
        result = calendarApp.deleteSchedule(targetId, eventId)
        return result

    def slides_createSlides(self, slidesTitle: str):
        slidsApp = GoogleSlides()
        id = slidsApp.createSlides(slidesTitle)
        return { "id": id }

    def slides_createForms(self, formsTitle: str):
        formsApp = GoogleForms()
        id = formsApp.createForms(formsTitle)
        return { "id": id }