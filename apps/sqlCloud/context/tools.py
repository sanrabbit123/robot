from apps.mother import *
from apps.infoObj import returnAddress
import pprint

address = returnAddress()
mysqlHost = address["mysqlinfo"]["host"]
localHost = "127.0.0.1:8000"

async def query(queryString: str) -> list:
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString.strip() }, { "headers": { "Content-Type": "application/json" } })
    return result["data"]

async def mysql(queryString: str) -> list:
    return query(queryString)

async def sheets(rows: list) -> dict:
    result = await requestSystem(f"https://{mysqlHost}/createSqlSheets", { "rows": rows }, { "headers": { "Content-Type": "application/json" } })
    await requestSystem(f"http://{localHost}/chromeOpen", { "url": result["link"] }, { "headers": { "Content-Type": "application/json" } })
    return { "link": result["link"] }

async def excel(rows: list) -> dict:

    return { "link": "" }

async def write(rows: list) -> dict:

    return { "link": "" }