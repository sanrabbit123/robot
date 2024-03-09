import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.imageParser.router.imageCalculator import ImageCalculator
from quart import request
from urllib import parse
import traceback

class ImageRouter:

    def __init__(self, app, coreConnection, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()
        self.mongo = coreConnection
        self.mongolocal = localConnection
        self.members = returnMembers()
        self.calculator = ImageCalculator(coreConnection, localConnection)

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

        @app.post("/slackEvents")
        async def rou_post_slackEvents():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:


                






                return (jsonStringify({ "message": "ok" }), 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_slackEvents): " + str(e))
                return { "error": str(e) }

