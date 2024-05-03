from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import pprint

address = returnAddress()
mysqlHost = address["mysqlinfo"]["host"]
localHost = "127.0.0.1:8000"
back = BackMaker()

async def structure():
    tempFileName = processCwd() + "/temp/queryTableStructure.txt"
    result = await requestSystem(f"https://{mysqlHost}/getCoreStructure", { "data": False }, { "headers": { "Content-Type": "application/json" } })
    print(result["table"])
    await fileSystem("writeString", [ tempFileName, result["table"] ])
    await shellExec("code", [ tempFileName ])

async def query(queryString: str) -> list:
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString.strip() }, { "headers": { "Content-Type": "application/json" } })
    return result

async def mysql(queryString: str) -> list:
    return query(queryString)

async def sheets(rows: dict, queryString = False) -> dict:
    result = await requestSystem(f"https://{mysqlHost}/createSqlSheets", { "rows": rows["data"], "query": queryString }, { "headers": { "Content-Type": "application/json" } })
    await requestSystem(f"http://{localHost}/chromeOpen", { "url": result["link"] }, { "headers": { "Content-Type": "application/json" } })
    return { "link": result["link"] }

async def view(rows: dict):
    print(rows["table"])

async def excel(rows: list) -> dict:

    return { "link": "" }

async def read(filePath: str) -> str:
    sqlFolderName = "sql"
    if patternTest(r"^[\/\~\.]", filePath):
        filePath = patternReplace(filePath, r"^\~", processHome())
        filePath = patternReplace(filePath, r"^\.", processHome() + f"/{sqlFolderName}")
    else:
        filePath = processHome() + f"/{sqlFolderName}" + "/" + filePath
    fileStr = await fileSystem("readString", [ filePath ])
    return fileStr

async def write(rows: list) -> dict:

    return { "link": "" }

async def queryView(queryString: str):
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString.strip() }, { "headers": { "Content-Type": "application/json" } })
    print(result["table"])
    return result

async def querySheets(queryString: str) -> dict:
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString.strip() }, { "headers": { "Content-Type": "application/json" } })
    print(result["table"])
    result2 = await requestSystem(f"https://{mysqlHost}/createSqlSheets", { "rows": result["data"], "query": queryString }, { "headers": { "Content-Type": "application/json" } })
    await requestSystem(f"http://{localHost}/chromeOpen", { "url": result2["link"] }, { "headers": { "Content-Type": "application/json" } })
    return { "link": result2["link"] }

async def getDesigners() -> list:
    collection = "designer"
    coreConnection = mongoConnection("core")
    whereQuery = {}
    rows = await back.mongoRead(collection, whereQuery, { "selfMongo": coreConnection })
    return rows
    
async def getClients(queryDic, secondArg = None) -> list:
    collection = "client"
    coreConnection = mongoConnection("core")
    whereQuery = {}
    rows = []
    try:
        if type(queryDic) is dict:
            if "from" in queryDic and "to" in queryDic:
                startDate = dateToString(stringToDate(queryDic["from"]))
                endDate = dateToString(stringToDate(queryDic["to"]))
                ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
                ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
                startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
                endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
                endDate = setRelativeDate(endDate, 1, "date")
                whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }
            elif "from" in queryDic:
                startDate = dateToString(stringToDate(queryDic["from"]))
                endDate = dateToString(getNowDate())
                ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
                ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
                startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
                endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
                endDate = setRelativeDate(endDate, 1, "date")
                whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }
            elif "date" in queryDic:
                startDate = dateToString(stringToDate(queryDic["date"]))
                endDate = dateToString(stringToDate(queryDic["date"]))
                ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
                ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
                startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
                endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
                endDate = setRelativeDate(endDate, 1, "date")
                whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }
            elif "timeline" in queryDic:
                startDate = dateToString(stringToDate(queryDic["timeline"]))
                endDate = dateToString(stringToDate(queryDic["timeline"]))
                ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
                ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
                startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
                endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
                endDate = setRelativeDate(endDate, 1, "date")
                whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }
            else:
                whereQuery = objectDeepCopy(queryDic)
            
        elif type(queryDic) is str and type(secondArg) is str:
            startDate = dateToString(stringToDate(queryDic))
            endDate = dateToString(stringToDate(secondArg))
            ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
            ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
            startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
            endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
            endDate = setRelativeDate(endDate, 1, "date")
            whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }

        elif type(queryDic) is str and secondArg is None:
            startDate = dateToString(stringToDate(queryDic))
            endDate = dateToString(stringToDate(queryDic))
            ( sYear, sMonth, sDate ) = listMap(startDate.split("-"), lambda x: int(x))
            ( eYear, eMonth, eDate ) = listMap(endDate.split("-"), lambda x: int(x))
            startDate = numbersToDate(sYear, sMonth - 1, sDate, 0, 0, 0)
            endDate = numbersToDate(eYear, eMonth - 1, eDate, 0, 0, 0)
            endDate = setRelativeDate(endDate, 1, "date")
            whereQuery = { "requests": { "$elemMatch": { "request.timeline": { "$gte": startDate, "$lt": endDate } } } }

        elif type(queryDic) is list and secondArg is None:
            cliidArr = listMap(queryDic, lambda x: { "cliid": x })
            whereQuery = {}
            whereQuery["$or"] = objectDeepCopy(cliidArr)

        rows = await back.mongoRead(collection, whereQuery, { "selfMongo": coreConnection })

    except Exception as e:
        rows = await back.mongoRead(collection, {}, { "selfMongo": coreConnection })

    return rows

async def getProjects(clients, secondArg = None) -> list:
    collection = "project"
    coreConnection = mongoConnection("core")
    whereQuery = {}
    rows = []

    try:
        if type(clients) is dict:
            thisClients = await getClients(clients)
            cliidArr = []
            for c in thisClients:
                cliidArr.append(c["cliid"])
            cliidArr = listMap(cliidArr, lambda x: { "cliid": x })
            if len(cliidArr) > 0:
                whereQuery = {}
                whereQuery["$or"] = objectDeepCopy(cliidArr)
            else:
                whereQuery = {}
        elif type(clients) is list:
            cliidArr = []
            for c in clients:
                cliidArr.append(c["cliid"])
            cliidArr = listMap(cliidArr, lambda x: { "cliid": x })
            if len(cliidArr) > 0:
                whereQuery = {}
                whereQuery["$or"] = objectDeepCopy(cliidArr)
            else:
                whereQuery = {}
        elif type(clients) is str:
            thisClients = []
            if secondArg is None:
                thisClients = await getClients(clients)
            elif type(secondArg) is str:
                thisClients = await getClients(clients, secondArg)
            else:
                thisClients = await getClients(clients, secondArg)
            cliidArr = []
            for c in thisClients:
                cliidArr.append(c["cliid"])
            cliidArr = listMap(cliidArr, lambda x: { "cliid": x })
            if len(cliidArr) > 0:
                whereQuery = {}
                whereQuery["$or"] = objectDeepCopy(cliidArr)
            else:
                whereQuery = {}
        rows = await back.mongoRead(collection, whereQuery, { "selfMongo": coreConnection })
    except Exception as e:
        rows = await back.mongoRead(collection, {}, { "selfMongo": coreConnection })

    return rows

async def getProposals(clients: list) -> list:
    thisClients = objectDeepCopy(clients)
    projects = await getProjects(thisClients)
    designers = await getDesigners()

    proposalList = []
    for project in projects:
        thisClient = listFind(thisClients, lambda c: c["cliid"] == project["cliid"])
        proposalDetail = objectDeepCopy(project["proposal"]["detail"])
        newProposalDetail = []
        for proposal in proposalDetail:
            tempObj = {}
            thisDesigner = listFind(designers, lambda d: d["desid"] == proposal["desid"])
            tempObj["designer"] = thisDesigner["designer"]
            tempObj["desid"] = thisDesigner["desid"]
            tempObj["offline"] = 0
            tempObj["online"] = 0
            tempOfflineResult = listFind(proposal["fee"], lambda x: x["method"] == "offline")
            tempOnlineResult = listFind(proposal["fee"], lambda x: x["method"] == "online")
            if tempOfflineResult is not None:
                tempObj["offline"] = tempOfflineResult["amount"]
            if tempOnlineResult is not None:
                tempObj["online"] = tempOnlineResult["amount"]

            newProposalDetail.append(objectDeepCopy(tempObj))

        proposalList.append({
            "proid": project["proid"],
            "client": {
                "cliid": project["cliid"],
                "name": thisClient["name"],
                "pyeong": thisClient["requests"][0]["request"]["space"]["pyeong"],
                "timeline": dateToString(thisClient["requests"][0]["request"]["timeline"], True),
            },
            "date": dateToString(project["proposal"]["date"], True),
            "proposal": objectDeepCopy(newProposalDetail),
        })

    return proposalList

def sort(target: list, reverse = False):
    return listSort(target, reverse=reverse)

def find(target: list, property: str, value):
    if not listEvery(target, lambda x: type(x) is dict):
        raise TypeError("invalid input")
    if not listEvery(target, lambda x: property in x):
        raise TypeError("invalid input")
    return listFind(target, lambda x: x[property] == value)

def money(n: int):
    return autoComma(n) + "원"

def pyeong(n: int):
    return str(n) + "평"


