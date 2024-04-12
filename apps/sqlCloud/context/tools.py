from apps.mother import *
from apps.infoObj import returnAddress
import pprint

address = returnAddress()
mysqlHost = address["mysqlinfo"]["host"]

async def query(queryString: str) -> list:
    result = await requestSystem(f"https://{mysqlHost}/mysqlQuery", { "query": queryString }, { "headers": { "Content-Type": "application/json" } })
    return result["data"]

async def mysql(queryString: str) -> list:
    return query(queryString)

async def sheets(rows: list) -> dict:

    return { "link": "" }

async def excel(rows: list) -> dict:

    return { "link": "" }

async def write(rows: list) -> dict:

    return { "link": "" }

def print(something, indentNumber: int = 2):
    pp = pprint.PrettyPrinter(indent=indentNumber)
    pp.pprint(something)
