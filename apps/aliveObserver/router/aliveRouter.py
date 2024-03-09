import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from quart import request

class AliveRouter:

    def __init__(self, app, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()

        self.mongo = localConnection
        self.mongolocal = localConnection
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

        @app.post("/registerIpAddress")
        async def rou_post_registerIpAddress():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                return ({ "message": "done" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Alive Observer 서버 문제 생김 (rou_post_registerIpAddress): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }
