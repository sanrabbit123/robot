import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.numbersConsole.router.numbersCalculator import NumbersCalculator
from quart import request

class NumbersRouter:

    def __init__(self, app, coreConnection, backConnection, pythonConnection, officeConnection, contentsConnection, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()

        self.mongo = coreConnection
        self.mongoconsole = backConnection
        self.mongopython = pythonConnection
        self.mongooffice = officeConnection
        self.mongocontents = contentsConnection
        self.mongolocal = localConnection

        self.calculator = NumbersCalculator(coreConnection, backConnection, pythonConnection, officeConnection, contentsConnection, localConnection)
        
        self.members = returnMembers()

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

        @app.post("/returnColumns")
        async def rou_post_returnColumns():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            calculator = self.calculator
            try:
                columns = calculator.returnColumns(fullMode=True)
                return ({ "columns": columns }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Numbers Console 서버 문제 생김 (rou_post_returnColumns): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/calculateEntireIO")
        async def rou_post_calculateEntireIO():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            calculator = self.calculator
            try:
                if not "fromDate" in body:
                    raise Exception("invalid post")
                
                fromDate = body["fromDate"]
                toDate = None
                if "toDate" in body:
                    toDate = body["toDate"]

                mode = "matrix"
                if "mode" in body:
                    mode = body["mode"]

                if mode == "name" or mode == "object":
                    resultList = await calculator.calculateIOList(fromDate, toDate)
                    return ({ "data": resultList }, 200, headers)
                else:
                    (standardsMatrix, matrix) = await calculator.calculateIOMatrix(fromDate, toDate)
                    return ({ "standards": standardsMatrix, "data": matrix }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Numbers Console 서버 문제 생김 (rou_post_calculateEntireIO): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/searchEntireIO")
        async def rou_post_searchEntireIO():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            calculator = self.calculator
            try:
                if not "whereQuery" in body:
                    raise Exception("invalid post")
                
                whereQuery = body["whereQuery"]
                mode = "matrix"
                if "mode" in body:
                    mode = body["mode"]

                if mode == "name" or mode == "object":
                    resultList = await calculator.searchIOList(whereQuery)
                    return ({ "data": resultList }, 200, headers)
                else:
                    (standardsMatrix, matrix) = await calculator.searchIOMatrix(whereQuery)
                    return ({ "standards": standardsMatrix, "data": matrix }, 200, headers)

            except Exception as e:
                print(e)
                await alertLog("Numbers Console 서버 문제 생김 (rou_post_searchEntireIO): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }



