import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.sqlCloud.router.sqlTools import SqlTools
from quart import request
from urllib import parse
import traceback

class SqlRouter:

    def __init__(self, app, coreConnection, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()
        self.mongo = coreConnection
        self.mongolocal = localConnection
        self.members = returnMembers()
        self.tools = SqlTools()

    def setRouting(self):
        app = self.app

        # get ==================================================================================

        @app.get("/")
        async def rou_get_root():
            headers = self.headers
            return ({ "message": "hi" }, 200, headers)

        @app.get("/ssl")
        async def rou_get_ssl():
            headers = self.headers
            return ({ "message": "hi" }, 200, headers)

        @app.get("/disk")
        async def rou_get_disk():
            headers = self.headers
            return ({ "message": "hi" }, 200, headers)

        @app.get("/system")
        async def rou_get_system():
            headers = self.headers
            return (getSystemInfo(), 200, headers)

        # post =================================================================================

        @app.post("/coreReflect")
        async def rou_post_coreReflect():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            tools = self.tools
            try:
                asyncio.create_task(tools.coreReflect())
                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Sql Cloud 서버 문제 생김 (rou_post_coreReflect): " + str(e))
                return { "error": str(e) }

        @app.post("/getCoreStructure")
        async def rou_post_getCoreStructure():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            tools = self.tools
            try:
                resultString = tools.getCoreStructure()
                return ({ "table": resultString }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Sql Cloud 서버 문제 생김 (rou_post_getCoreStructure): " + str(e))
                return { "error": str(e) }

        @app.post("/createSqlSheets")
        async def rou_post_createSqlSheets():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            tools = self.tools
            try:
                if not "rows" in body:
                    raise Exception("invalid post")
                
                if not type(body["rows"] is list):
                    raise Exception("invalid post")
                resultDic = await tools.createSqlSheets(body["rows"])
                return (resultDic, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Sql Cloud 서버 문제 생김 (rou_post_createSqlSheets): " + str(e))
                return { "error": str(e) }
            
        @app.post("/mysqlQuery")
        async def rou_post_mysqlQuery():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            tools = self.tools
            try:
                if not "query" in body:
                    raise Exception("invalid post")
                
                if not type(body["query"] is str):
                    raise Exception("invalid post")

                query = body["query"].strip()
                query = patternReplace(query, r"[\n\t]", " ")
                for i in range(10):
                    query = patternReplace(query, r"  ", " ")

                result = await tools.homeliaisonQuery(query)

                return (result, 200, headers)
            except Exception as e:
                traceback.print_exc()
                print(body)
                await alertLog("Sql Cloud 서버 문제 생김 (rou_post_mysqlQuery): " + str(e))
                return { "error": str(e) }