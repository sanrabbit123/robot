import asyncio
from apps.mother import diskReading, aliveMongo, equalJson, alertLog, jsonStringify
from apps.infoObj import returnAddress
from apps.backMaker.backMaker import BackMaker
from quart import request

class ConstructRouter:

    def __init__(self, app, coreConnection, backConnection, localConnection):
        self.app = app

        self.back = BackMaker()
        self.address = returnAddress()

        self.collection = "builder"

        self.mongo = coreConnection
        self.mongoconsole = backConnection
        self.mongolocal = localConnection
    
    def setRouting(self):
        app = self.app

        # get ==================================================================================

        @app.get("/")
        async def rou_get_root():
            disk = await diskReading()
            aliveMongoResult = await aliveMongo()
            return { "disk": disk, "mongo": aliveMongoResult }

        @app.get("/ssl")
        async def rou_get_ssl():
            disk = await diskReading()
            aliveMongoResult = await aliveMongo()
            return { "disk": disk, "mongo": aliveMongoResult }

        @app.get("/disk")
        async def rou_get_disk():
            disk = await diskReading()
            return { "disk": disk }

        # post =================================================================================

        @app.post("/getBuilders")
        async def rou_post_getBuilders():
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

                return rows
            except Exception as e:
                print(e)
                await alertLog("Construct lounge 서버 문제 생김 (rou_get_First): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }


