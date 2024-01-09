import asyncio
from apps.mother import equalJson, alertLog, jsonStringify, generalHeaders
from apps.infoObj import returnAddress
from apps.backMaker.backMaker import BackMaker
from quart import request

class LocalRouter:

    def __init__(self, app, localConnection):
        self.app = app

        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()

        self.mongo = localConnection
        self.mongolocal = localConnection
    
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


        # post =================================================================================

        @app.post("/getBuilders")
        async def rou_post_getBuilders():
            headers = self.headers
            back = self.back
            collection = self.collection
            selfMongo = self.mongo
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "whereQuery" in body:
                    raise Exception("invalid post")
                whereQuery = body["whereQuery"]
                rows = await back.mongoRead(collection, whereQuery, { "selfMongo": selfMongo })

                return rows, 200, headers
            except Exception as e:
                print(e)
                await alertLog("Construct lounge 서버 문제 생김 (rou_get_First): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }


