from apps.mother import *
from apps.infoObj import returnAddress
import pprint

address = returnAddress()
mysqlHost = address["mysqlinfo"]["host"]
localHost = "127.0.0.1:8000"

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

async def querySheets(queryString: str):
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString.strip() }, { "headers": { "Content-Type": "application/json" } })
    print(result["table"])
    result2 = await requestSystem(f"https://{mysqlHost}/createSqlSheets", { "rows": result["data"], "query": queryString }, { "headers": { "Content-Type": "application/json" } })
    await requestSystem(f"http://{localHost}/chromeOpen", { "url": result2["link"] }, { "headers": { "Content-Type": "application/json" } })
    return { "link": result2["link"] }
