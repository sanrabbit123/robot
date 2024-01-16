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

        self.homeFolder = processHome()
        self.rootFolderName = "project"
        self.rootFolder = self.homeFolder + "/" + self.rootFolderName

        self.sambaToken = "__samba__"
        self.staticConst = self.homeFolder

        self.appRoot = "human"
        self.appDir = self.homeFolder + "/" + self.appRoot

        self.appNames = {
            "branding": {
                "name": "homeliaison-branding-standard",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/homeliaison-branding-standard.git"
            },
            "brand": {
                "name": "homeliaison-branding-standard",
                "address": "ssh://git@homeliaison.co.kr:40022/homeliaisonck/homeliaison-branding-standard.git"
            }
        }
        self.coreServer = self.address["officeinfo"]["gitlab"]["host"] + ":" + str(self.address["officeinfo"]["gitlab"]["endPort"])

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

        @app.get("/disk")
        async def rou_get_disk():
            headers = self.headers
            return ({ "message": "hi" }, 200, headers)

        @app.get("/system")
        async def rou_get_system():
            headers = self.headers
            return (getSystemInfo(), 200, headers)

        # post =================================================================================

        @app.post("/getSystemInfo")
        async def rou_post_getSystemInfo():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                return (getSystemInfo(), 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_getSystemInfo): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/readFolder")
        async def rou_post_readFolder():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            sambaToken = self.sambaToken
            staticConst = self.staticConst
            body = equalJson(rawBody)
            try:
                if not "path" in body:
                    raise Exception("invalid post")
                
                target = body["path"]
                target = patternReplace(target, r"^\/", "")
                target = patternReplace(target, r"\/$", "")
                target = target.strip()
                if target == "":
                    target = sambaToken
                if not patternTest(r"^__", target):
                    target = sambaToken + "/" + target
                target = patternReplace(target, "^" + sambaToken, staticConst)

                list = await fileSystem("readFolder", [ target ])

                return (list, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_readFolder): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }
            
        @app.post("/makeFolder")
        async def rou_post_makeFolder():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            sambaToken = self.sambaToken
            staticConst = self.staticConst
            body = equalJson(rawBody)
            try:
                if not "path" in body:
                    raise Exception("invalid post")
                target = body["path"]
                target = patternReplace(target, r"^\/", "")
                target = patternReplace(target, r"\/$", "")
                target = target.strip()
                if target == "":
                    target = sambaToken
                if not patternTest(r"^__", target):
                    target = sambaToken + "/" + target
                target = patternReplace(target, "^" + sambaToken, "")

                targetList = target.split("/")
                tempString = staticConst
                for i in targetList:
                    tempDir = await fileSystem("readFolder", [ tempString ])
                    if i != "":
                        if not i in tempDir:
                            await shellExec("mkdir " + shellLink(tempString + "/" + i))
                    tempString += "/"
                    tempString += i

                target2 = body["path"]
                target2 = patternReplace(target2, r"^\/", "")
                target2 = patternReplace(target2, r"\/$", "")
                target2 = target2.strip()
                if target2 == "":
                    target2 = sambaToken
                if not patternTest(r"^__", target2):
                    target2 = sambaToken + "/" + target2
                target2 = patternReplace(target2, "^" + sambaToken, staticConst)
                folderList = await fileSystem("readFolder", [ target2 ])

                return ({ "message": "done", "list": folderList }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_makeFolder): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/moveFiles")
        async def rou_post_moveFiles():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            sambaToken = self.sambaToken
            staticConst = self.staticConst
            body = equalJson(rawBody)
            try:
                if not "fromItems" in body:
                    raise Exception("invalid post")
                if not "toFolder" in body:
                    raise Exception("invalid post")

                target = body["toFolder"]
                target = patternReplace(target, r"^\/", "")
                target = patternReplace(target, r"\/$", "")
                target = target.strip()
                if target == "":
                    target = sambaToken
                if not patternTest(r"^__", target):
                    target = sambaToken + "/" + target
                target = patternReplace(target, "^" + sambaToken, staticConst)

                fromItems = body["fromItems"]
                for str in fromItems:
                    thisItem = str
                    thisItem = patternReplace(thisItem, r"^\/", "")
                    thisItem = patternReplace(thisItem, r"\/$", "")
                    thisItem = thisItem.strip()
                    if thisItem == "":
                        thisItem = sambaToken
                    if not patternTest(r"^__", thisItem):
                        thisItem = sambaToken + "/" + thisItem
                    thisItem = patternReplace(thisItem, "^" + sambaToken, staticConst)
                    await shellExec("mv", [ thisItem, target + "/" ])

                return ({ "message": "success" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_moveFiles): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

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

        @app.post("/appUpdate")
        async def rou_post_appUpdate():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:                
                command = "cd "
                command += shellLink(self.appDir)
                command += ";"
                command += "git pull;"

                asyncio.create_task(shellExec(command))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_appUpdate): " + str(e) + " / " + jsonStringify(body))
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
                    message = "autoUpdate_" + numbersStringValue
                    command = "cd "
                    command += shellLink(self.rootFolder + "/" + self.appNames[thisType]["name"])
                    command += ";"
                    command += "git add -A;git commit -m \"" + message + "\";git push;"
                    
                    await shellExec(command)
                    await requestSystem("https://" + self.coreServer + "/pushComplete", { "member": self.member, "appName": self.appNames[thisType], "type": thisType, "message": message }, { "headers": { "Content-Type": "application/json" } })

                asyncio.create_task(futureTask(body["type"]))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_gitPush): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }

        @app.post("/scriptInjection")
        async def rou_post_scriptInjection():
            headers = self.headers
            sambaToken = self.sambaToken
            staticConst = self.staticConst
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "script" in body:
                    raise Exception("invalid post")

                finalCommand = body["script"].strip()
                finalCommand = patternReplace(finalCommand, sambaToken, staticConst)

                asyncio.create_task(shellExec(finalCommand))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_scriptInjection): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }
            
        @app.post("/chromeOpen")
        async def rou_post_chromeOpen():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            try:
                if not "url" in body:
                    raise Exception("invalid post")

                linkTarget = body["url"].strip()
                if patternTest(r"^http[s]*\:\/\/", linkTarget):
                    linkTarget = linkTarget
                else:
                    linkTarget = stringToLink(linkTarget)

                chromeApp = "/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome'"
                finalCommand = chromeApp + " " + "'" + linkTarget + "'"

                asyncio.create_task(shellExec(finalCommand))

                return ({ "message": "will do" }, 200, headers)
            except Exception as e:
                print(e)
                await alertLog("Local lounge 서버 문제 생김 (rou_post_chromeOpen): " + str(e) + " / " + jsonStringify(body))
                return { "error": str(e) + " / " + jsonStringify(body) }