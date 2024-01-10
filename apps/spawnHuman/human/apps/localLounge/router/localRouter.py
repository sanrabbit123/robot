import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
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

        self.member = None
        self.members = returnMembers()

        self.rootFolderName = "project"
        self.rootFolder = processHome() + "/" + self.rootFolderName

        self.appNames = {
            "branding": {
                "name": "homeliaison-branding-standard",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/homeliaison-branding-standard.git"
            }
        }


    def setRouting(self):
        app = self.app

        # get ==================================================================================

        @app.get("/")
        async def rou_get_root():
            headers = self.headers
            return ({ "member": jsonStringify(self.member) }, 200, headers)

        @app.get("/ssl")
        async def rou_get_ssl():
            headers = self.headers
            return ({ "message": "hi" }, 200, headers)

        # post =================================================================================

        @app.post("/gitPull")
        async def rou_post_gitPull():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "type" in body:
                    raise Exception("invalid post")
                if not body["type"] in self.appNames:
                    raise Exception("invalid post 2")
                
                thisType = body["type"]

                command = "cd "
                command += shellLink(self.rootFolder + "/" + self.appNames[thisType]["name"])
                command += ";"
                command += "git pull;"

                asyncio.create_task(shellExec(command))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_gitPull): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/gitPush")
        async def rou_post_gitPush():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "type" in body:
                    raise Exception("invalid post")
                if not body["type"] in self.appNames:
                    raise Exception("invalid post 2")

                async def futureTask(thisType):
                    nowDate = getNowDate()
                    numbersStringValue = patternReplace(dateToString(nowDate, True), r"[^0-9]", "")
                    command = "cd "
                    command += shellLink(self.rootFolder + "/" + self.appNames[thisType]["name"])
                    command += ";"
                    command += "git add -A;git commit -m \"autoUpdate_" + numbersStringValue + "\";git push;"
                    
                    await shellExec(command)
                    await requestSystem("https://" + self.address["officeinfo"]["gitlab"]["host"] + ":" + str(self.address["officeinfo"]["gitlab"]["endPort"]) + "/pushComplete", { "member": self.member, "appName": self.appNames[thisType] }, { "headers": { "Content-Type": "application/json" } })

                asyncio.create_task(futureTask(body["type"]))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_gitPush): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }
