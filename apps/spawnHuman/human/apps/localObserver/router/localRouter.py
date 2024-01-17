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
        self.members = returnMembers()
        self.sambaToken = "__samba__"

        self.targetIp = [
            "192.168.0.20",
            "192.168.0.24",
            "192.168.0.30"
        ]
        self.port = 8000

        self.appNames = {
            "branding": {
                "name": "homeliaison-branding-standard",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/homeliaison-branding-standard.git"
            },
            "brand": {
                "name": "homeliaison-branding-standard",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/homeliaison-branding-standard.git"
            },
            "apply": {
                "name": "apply-system-renewal",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/apply-system-renewal.git"
            }
        }
        self.coreServer = "https://" + self.address["officeinfo"]["gitlab"]["host"] + ":" + str(self.address["officeinfo"]["gitlab"]["endPort"])

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
                if not "id" in body:
                    raise Exception("invalid post 1")
                if not "ip" in body:
                    raise Exception("invalid post 2")
                id = body["id"]
                ip = body["ip"]
                member = None

                index = 0
                thisIndex = 0
                for m in self.members:
                    if m["id"] == id:
                        member = m
                        thisIndex = index
                    index = index + 1

                if member == None:
                    raise Exception("invalid id")

                self.members[thisIndex]["ip"] = objectDeepCopy(ip)

                return ({ "message": "done" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local Observer 서버 문제 생김 (rou_post_registerIpAddress): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/registerProjectGit")
        async def rou_post_registerProjectGit():
            headers = self.headers
            back = self.back
            mongo = self.mongolocal
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "type" in body:
                    raise Exception("invalid post 1")
                if not "name" in body:
                    raise Exception("invalid post 2")
                if not "address" in body:
                    raise Exception("invalid post 3")
                if not "member" in body:
                    raise Exception("invalid post 4")

                collection = "gitProjectInfo"

                thisType = body["type"]
                name = body["name"]
                address = stringToLink(body["address"])
                member = body["member"]
                member = listFind(self.members, lambda x: x.id == member)

                if type(thisType) is not list:
                    raise Exception("invalid post 5")

                json = {}
                json["date"] = getNowDate()
                json["member"] = {
                    "id": member["id"],
                    "name": member["name"]
                }
                json["type"] = thisType
                json["name"] = name
                json["address"] = address

                await back.mongoCreate(collection, json, { "selfMongo": mongo })

                return ({ "message": "done" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local Observer 서버 문제 생김 (rou_post_registerProjectGit): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/pushComplete")
        async def rou_post_pushComplete():
            headers = self.headers
            back = self.back
            mongo = self.mongolocal
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "member" in body:
                    raise Exception("invalid post 1")
                if not "appName" in body:
                    raise Exception("invalid post 2")
                if not "type" in body:
                    raise Exception("invalid post 3")
                if not "message" in body:
                    raise Exception("invalid post 4")

                collection = "gitPushLog"
                member = body["member"]
                appName = body["appName"]
                thisType = body["type"]
                message = body["message"]

                json = {}
                json["date"] = getNowDate()
                json["method"] = "push"
                json["member"] = {
                    "id": member["id"],
                    "name": member["name"]
                }
                json["message"] = message
                json["app"] = { "type": thisType, "name": appName["name"], "address": appName["address"] }

                await back.mongoCreate(collection, json, { "selfMongo": mongo })
                await messageSend({ "text": member["name"] + "님이 " + appName["name"] + " 프로젝트의 git 저장소를 업데이트 진행하였습니다!", "channel": "C063JC1417S", "voice": False })
                await requestSystem(self.coreServer + "/gitLocalSync", { "type": thisType }, { "headers": { "Content-Type": "application/json" } })

                return ({ "message": "done" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local Observer 서버 문제 생김 (rou_post_pushComplete): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/gitLocalSync")
        async def rou_post_gitLocalSync():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "type" in body:
                    raise Exception("invalid post 1")

                thisType = body["type"]
                targetIp = self.targetIp

                for ip in targetIp:
                    try:
                        asyncio.create_task(requestSystem("http://" + ip + ":" + str(self.port) + "/gitPull", { "type": thisType }, { "headers": { "Content-Type": "application/json" } }))
                    except Exception as e:
                        pass

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local Observer 서버 문제 생김 (rou_post_gitLocalSync): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }
