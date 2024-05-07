import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from quart import request
from urllib import parse
import traceback

class HistoryRouter:

    def __init__(self, app, coreConnection, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()
        self.mongo = coreConnection
        self.mongolocal = localConnection
        self.members = returnMembers()
        self.postHost = "192.168.0.23"
        self.host = self.address["officeinfo"]["test"]["host"]

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

        @app.get("/history/<keyword>")
        async def rou_get_history(keyword):
            host = self.host
            pastHost = self.postHost
            headers = self.headers
            headers["Content-Type"] = "text/html"
            html = '<html></html>'
            if keyword == "green0":
                html = '<html><head><style>body {margin: 0;padding: 0;border: 0;}* {margin: 0;padding: 0;border: 0;}</style></head><body><iframe src="http://' + pastHost + ':52080" style="display: block;width: 100vw;height: 100vh;margin: 0;padding: 0;border: 0;"></iframe></body></html>'
            elif keyword == "green1":
                html = '<html><head><style>body {margin: 0;padding: 0;border: 0;}* {margin: 0;padding: 0;border: 0;}</style></head><body><iframe src="http://' + pastHost + ':60080" style="display: block;width: 100vw;height: 100vh;margin: 0;padding: 0;border: 0;"></iframe></body></html>'
            elif keyword == "black0":
                html = '<html><head><style>body {margin: 0;padding: 0;border: 0;}* {margin: 0;padding: 0;border: 0;}</style></head><body><iframe src="https://' + host + ':48901" style="display: block;width: 100vw;height: 100vh;margin: 0;padding: 0;border: 0;"></iframe></body></html>'
            elif keyword == "blue0":
                html = '<html><head><style>body {margin: 0;padding: 0;border: 0;}* {margin: 0;padding: 0;border: 0;}</style></head><body><iframe src="https://' + host + ':48902" style="display: block;width: 100vw;height: 100vh;margin: 0;padding: 0;border: 0;"></iframe></body></html>'
            return (html, 200, headers)

        # post =================================================================================

        @app.post("/coreReflect")
        async def rou_post_coreReflect():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("History Cloud 서버 문제 생김 (rou_post_coreReflect): " + str(e))
                return { "error": str(e) }
