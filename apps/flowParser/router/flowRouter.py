import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from quart import request
from apps.openAiAPIs.openAiAPIs import OpenAiAPIs
from apps.awsAPIs.awsAPIs import AwsAPIs
from apps.googleAPIs.googleAPIs import GoogleAPIs
from urllib import parse
import traceback

class FlowRouter:

    def __init__(self, app, coreConnection, localConnection, officeConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()
        self.mongo = coreConnection
        self.mongolocal = localConnection
        self.mongooffice = officeConnection
        self.members = returnMembers()
        self.fairyId = "U067FG4GTNZ"
        self.fairyAppId = "A04GQKWAQF6"
        self.fairyToken = "xoxp-717757271335-6253548571781-6337284288178-c87ebd41bc1e5f620d9619ca53644de8"
        self.geminiId = "U06LVR0T07K"
        self.geminiAppId = "A06L5DPDYR5"
        self.geminiToken = "xoxp-717757271335-6709850918257-6685498874183-996bafe2e93d6656aff877f8ca0589bb"
        self.uragenAppId = "A06NPAEMLQZ"
        self.uragenToken = "xoxp-717757271335-5166005860961-6752069028278-3af6086b14dde6cb44fadb21201440be"
        self.uragenTargetChannel = "D054ECVTY7P"
        self.uragenUserId = "U054W05RAU9"
        self.openAi = OpenAiAPIs()
        self.aws = AwsAPIs()
        self.google = GoogleAPIs()
        self.protocol = "https"
        self.host = self.address["officeinfo"]["parser"]["host"]
        self.staticPath = processHome() + "/static"
        self.attachmentFolder = self.staticPath + "/hlemail/attachment"

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
            openAi = self.openAi
            members = self.members
            google = self.google
            selfMongo = self.mongolocal
            back = self.back
            collection = "slackMessageBlocks"
            try:
                if "challenge" in body:
                    return ({ "challenge": body["challenge"] }, 200, headers)
                membersDMRooms = listFilter(listMap(members, lambda x: x["slack"]["fairy"]), lambda x: type(x) is str)
                thisBlockId = ''
                if "event" in body:
                    if type(body["event"]) is dict:
                        if "text" in body["event"]:
                            if type(body["event"]["text"]) is str:
                                if body["event"]["user"] != self.fairyId and body["event"]["user"] != self.geminiId:
                                    if "blocks" in body["event"]:
                                        if type(body["event"]["blocks"]) is list and len(body["event"]["blocks"]) > 0:
                                            thisChannel = body["event"]["channel"]
                                            thisUser = body["event"]["user"]
                                            if thisChannel == self.uragenTargetChannel:
                                                pass
                                                # if thisUser != self.uragenUserId:
                                                #     asyncio.create_task(openAi.uragenGPT(thisChannel, body["event"]["text"], thisUser))
                                            else:
                                                thisBlockId = body["event"]["blocks"][0]["block_id"] + "__split__" + body["event"]["event_ts"]
                                                if patternTest(r"^요정[이아야님]?", body["event"]["text"].strip()) or patternTest(self.fairyId, body["event"]["text"].strip()):
                                                    rows = await back.mongoRead(collection, { "id": thisBlockId }, { "selfMongo": selfMongo })
                                                    if len(rows) == 0:
                                                        asyncio.create_task(openAi.fairyGPT(thisChannel, patternReplace(body["event"]["text"], r"^요정[이아야님]?", ""), thisUser))
                                                        await back.mongoCreate(collection, { "id": thisBlockId, "text": body["event"]["text"].strip(), "user": thisUser, "channel": thisChannel }, { "selfMongo": selfMongo })
                                                elif body["event"]["channel"] in membersDMRooms:
                                                    rows = await back.mongoRead(collection, { "id": thisBlockId }, { "selfMongo": selfMongo })
                                                    if len(rows) == 0:
                                                        asyncio.create_task(openAi.fairyGPT(thisChannel, body["event"]["text"]))
                                                        await back.mongoCreate(collection, { "id": thisBlockId, "text": body["event"]["text"].strip(), "user": thisUser, "channel": thisChannel }, { "selfMongo": selfMongo })
                                                elif patternTest(r"^잼민[이아야님]?", body["event"]["text"].strip()) or patternTest(self.geminiId, body["event"]["text"].strip()):
                                                    rows = await back.mongoRead(collection, { "id": thisBlockId }, { "selfMongo": selfMongo })
                                                    if len(rows) == 0:
                                                        asyncio.create_task(google.ai_geminiSlack(thisChannel, patternReplace(body["event"]["text"], r"^잼민[이아야님]?", ""), thisUser))
                                                        await back.mongoCreate(collection, { "id": thisBlockId, "text": body["event"]["text"].strip(), "user": thisUser, "channel": thisChannel }, { "selfMongo": selfMongo })
                                                elif patternTest(r"^얘들[이아야님]?", body["event"]["text"].strip()):
                                                    rows = await back.mongoRead(collection, { "id": thisBlockId }, { "selfMongo": selfMongo })
                                                    if len(rows) == 0:
                                                        asyncio.create_task(google.ai_geminiSlack(thisChannel, patternReplace(body["event"]["text"], r"^얘들[이아야님]?", ""), thisUser))
                                                        asyncio.create_task(openAi.fairyGPT(thisChannel, patternReplace(body["event"]["text"], r"^얘들[이아야님]?", ""), thisUser))
                                                        await back.mongoCreate(collection, { "id": thisBlockId, "text": body["event"]["text"].strip(), "user": thisUser, "channel": thisChannel }, { "selfMongo": selfMongo })

                return ({ "message": "ok" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_slackEvents): " + str(e))
                return { "error": str(e) }

        @app.post("/extractKeywords")
        async def rou_post_extractKeywords():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            google = self.google
            try:
                if not "sentence" in body:
                    raise Exception("invalid post")
                
                if not type(body["sentence"] is str):
                    raise Exception("invalid post")

                resultList = await google.ai_extractKeywords(body["sentence"])

                return ({ "keywords": resultList }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_extractKeywords): " + str(e))
                return { "error": str(e) }

        @app.post("/receiveEmail")
        async def rou_post_receiveEmail():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            members = self.members
            aws = self.aws
            back = self.back
            bar = "=" * 35
            selfMongo = self.mongolocal
            collection = "homeliaisonEmail"
            address = self.address
            try:
                if "Records" in body and type(body["Records"]) is list:
                    for record in body["Records"]:
                        if record["eventSource"] == "aws:ses":
                            headersList = record["ses"]["mail"]["headers"]

                            fromObj = listFind(headersList, lambda x: x["name"] == "From")
                            fromValue = fromObj["value"]
                            fromEmail = patternExec(r"\<[^\>]+\>", fromValue)[0].strip()
                            fromName = patternReplace(fromValue, r"\<[^\>]+\>", "").strip()
                            if patternTest(r"^[\"\']?\=\?", fromName) and patternTest(r"\?\=[\"\']?$", fromName):
                                fromName = base64.b64decode(fromName.split("?")[3]).decode(fromName.split("?")[1]).strip()
                            fromEmail = patternReplace(patternReplace(fromEmail, r"^\<", ""), r"\>$", "")

                            dateObj = listFind(headersList, lambda x: x["name"] == "Date")
                            dateValue = stringToDate(dateToString(stringToDate(dateObj["value"]), True))

                            titleObj = listFind(headersList, lambda x: x["name"] == "Subject")
                            titleValue = titleObj["value"]

                            toObj = listFind(headersList, lambda x: x["name"] == "To")
                            if patternTest(r"\<", toObj["value"].strip()) and patternTest(r"\>", toObj["value"].strip()):
                                toValue = patternExec(r"\<[^\>]+\>", toObj["value"].strip())[0].strip()
                            else:
                                toValue = patternReplace(patternReplace(toObj["value"].strip(), r"^\<", ""), r"\>$", "")
                            toValue = patternReplace(patternReplace(toValue, r"^\<", ""), r"\>$", "")

                            targetMember = None
                            for member in members:
                                if listIncludes(member["email"], lambda e: e == toValue):
                                    targetMember = objectDeepCopy(member)
                                    break

                            resultObj = {
                                "id": aws.emailIdMaker(dateValue, fromEmail, toValue),
                                "from": {
                                    "name": fromName,
                                    "email": fromEmail,
                                },
                                "to": toValue,
                                "date": dateValue,
                                "title": titleValue,
                            }
                            resultObj["member"] = targetMember

                            if targetMember is not None:
                                targetChannel = resultObj["member"]["slack"]["fairy"]
                                targetId = resultObj["id"]
                                targetLink = "https://" + address["backinfo"]["host"] + "/designer?mode=normal&emailtarget=" + targetId
                                if targetChannel is not None:
                                    thisMessage = f"새로운 메일이 왔습니다!\n{bar}\n\n- 보낸 사람 : {fromName}\n- 보낸 주소 : {fromEmail}\n- 보낸 일자 : {dateToString(dateValue, True)}\n- 제목 : {titleValue}\n- 링크 : {targetLink}\n\n{bar}"
                                    await messageSend({
                                        "text": thisMessage,
                                        "channel": targetChannel,
                                        "voice": False,
                                        "fairy": True
                                    })

                        elif record["eventSource"] == "aws:s3":
                            if "key" in record["s3"]["object"]:
                                thisKey = record["s3"]["object"]["key"]
                                thisId = await aws.parseEmail(thisKey, False, True)
                                if type(thisId) is str:
                                    rows = await back.mongoRead(collection, { "id": thisId }, { "selfMongo": selfMongo })
                                    if len(rows) == 0:
                                        thisMailObj = await aws.parseEmail(thisKey, True, False)
                                        if thisMailObj is not None and type(thisMailObj) is dict:
                                            rows = await back.mongoRead(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                                            if len(rows) == 0:
                                                await back.mongoCreate(collection, objectDeepCopy(thisMailObj), { "selfMongo": selfMongo })
                                            else:
                                                await back.mongoDelete(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                                                while len(rows) > 0:
                                                    rows = await back.mongoRead(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                                                await back.mongoCreate(collection, objectDeepCopy(thisMailObj), { "selfMongo": selfMongo })

                return ({ "message": "ok" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_receiveEmail): " + str(e))
                return { "error": str(e) }

        @app.post("/parseEmail")
        async def rou_post_parseEmail():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            aws = self.aws
            back = self.back
            selfMongo = self.mongolocal
            collection = "homeliaisonEmail"
            try:
                thisKey = body["key"]
                thisId = await aws.parseEmail(thisKey, False, True)
                if type(thisId) is str:
                    rows = await back.mongoRead(collection, { "id": thisId }, { "selfMongo": selfMongo })
                    if len(rows) == 0:
                        thisMailObj = await aws.parseEmail(thisKey, True, False)
                        if thisMailObj is not None and type(thisMailObj) is dict:
                            rows = await back.mongoRead(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                            if len(rows) == 0:
                                await back.mongoCreate(collection, objectDeepCopy(thisMailObj), { "selfMongo": selfMongo })
                            else:
                                await back.mongoDelete(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                                while len(rows) > 0:
                                    rows = await back.mongoRead(collection, { "id": thisMailObj["id"] }, { "selfMongo": selfMongo })
                                await back.mongoCreate(collection, objectDeepCopy(thisMailObj), { "selfMongo": selfMongo })
                return ({ "message": "ok" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_parseEmail): " + str(e))
                return { "error": str(e) }

        @app.post("/getEmailBody")
        async def rou_post_getEmailBody():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            members = self.members
            aws = self.aws
            back = self.back
            selfMongo = self.mongolocal
            collection = "homeliaisonEmail"
            try:
                if not "id" in body:
                    raise Exception("invalid post")

                targetId = body["id"]
                rows = await back.mongoRead(collection, { "id": targetId }, { "selfMongo": selfMongo })

                if rows.__len__() > 0:
                    target = rows[0]
                    targetBody = target["body"]
                    targetBody = decryptoHash(password="homeliaison", hash=targetBody)

                    targetAttachment = target["attachment"]
                    newAttachment = []
                    for hash in targetAttachment:
                        newAttachment.append({ "key": patternReplace(decryptoHash(password="homeliaison", hash=hash), r"^\/", ""), "hash": hash })

                    return (jsonStringify({ "body": targetBody, "attachment": newAttachment }), 200, headers)

                else:
                    return (jsonStringify({ "data": None }), 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_getEmailBody): " + str(e))
                return { "error": str(e) }

        @app.post("/getFileLink")
        async def rou_post_getFileLink():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            protocol = self.protocol
            host = self.host
            try:
                if not "hash" in body:
                    raise Exception("invalid post")

                targetHash = body["hash"]
                targetKey = decryptoHash(password="homeliaison", hash=targetHash)
                targetKey = patternReplace(targetKey, r"^\/", "")

                resultUrl = protocol + "://" + host + "/" + targetKey

                return (jsonStringify({ "link": resultUrl }), 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_getFileLink): " + str(e))
                return { "error": str(e) }
    
        @app.post("/listEmail")
        async def rou_post_listEmail():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            members = self.members
            aws = self.aws
            back = self.back
            selfMongo = self.mongolocal
            collection = "homeliaisonEmail"
            try:
                if not "memid" in body:
                    raise Exception("invalid post")
                
                password = "homeliaison"
                targetId = body["memid"]
                whereQuery = {}
                whereQuery["member"] = targetId

                rows = await back.mongoRead(collection, whereQuery, { "selfMongo": selfMongo })

                return (jsonStringify({ "data": rows }), 200, headers)
            
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_listEmail): " + str(e))
                return { "error": str(e) }

        @app.post("/slackForms")
        async def rou_post_slackForms():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            aws = self.aws
            try:
                if "payload" in body:
                    if type(body["payload"] is str):
                        body["payload"] = parse.unquote(body["payload"])
                        body["payload"] = equalJson(body["payload"])

                if "payload" in body:
                    if type(body["payload"]) is dict:
                        if body["payload"]["type"] == "view_submission":
                            if body["payload"]["view"]["callback_id"] == "sendMail":
                                thisUser = body["payload"]["user"]["id"]
                                thisEmail = aws.slackToEmailAddress(thisUser)
                                try:
                                    valuesDict = objectDeepCopy(body["payload"]["view"]["state"]["values"])

                                    body = valuesDict["contents"]["contentsInput"]["value"]
                                    target = valuesDict["target"]["targetInput"]["value"]
                                    title = valuesDict["title"]["titleInput"]["value"]

                                    body = patternReplace(body, r"\+", " ")
                                    target = patternReplace(target, r"\+", " ")
                                    title = patternReplace(title, r"\+", " ")

                                    aws.sendEmail({ "from": thisEmail, "to": target, "title": title, "body": body })
                                    return ({ "response_action": "clear" }, 200, headers)
                                except Exception as e:
                                    print(e)
                                    pass

                return ({ "message": "ok" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_slackForms): " + str(e))
                return { "error": str(e) }

        @app.post("/sendSlackEmail")
        async def rou_post_sendSlackEmail():
            headers = self.headers
            bytesData = await request.get_data()
            rawBody = bytesData.decode("utf-8")
            body = equalJson(rawBody)
            fairyToken = self.fairyToken
            try:
                triggerId = ""
                if "payload" in body:
                    if type(body["payload"]) is dict:
                        triggerId = body["payload"]["trigger_id"]
                    else:
                        triggerId = body["trigger_id"]
                else:
                    triggerId = body["trigger_id"]

                thisUserSlackId = body["user_id"]

                jsonModel = {
                    "trigger_id": triggerId,
                    "view": {
                        "type": "modal",
                        "callback_id": "sendMail",
                        "title": {
                            "type": "plain_text",
                            "text": "메일 보내기"
                        },
                        "blocks": [
                            {
                                "type": "input",
                                "block_id": "target",
                                "label": {
                                    "type": "plain_text",
                                    "text": "받는 사람의 이메일",
                                    "emoji": True
                                },
                                "optional": False,
                                "element": {
                                    "type": "email_text_input",
                                    "action_id": "targetInput",
                                }
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "plain_text",
                                    "text": " ",
                                    "emoji": True
                                }
                            },
                            {
                                "type": "input",
                                "block_id": "title",
                                "label": {
                                    "type": "plain_text",
                                    "text": "제목",
                                    "emoji": True
                                },
                                "optional": False,
                                "element": {
                                    "type": "plain_text_input",
                                    "action_id": "titleInput",
                                }
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "plain_text",
                                    "text": " ",
                                    "emoji": True
                                }
                            },
                            {
                                "type": "input",
                                "block_id": "contents",
                                "label": {
                                    "type": "plain_text",
                                    "text": "본문",
                                    "emoji": True
                                },
                                "optional": False,
                                "element": {
                                    "type": "plain_text_input",
                                    "action_id": "contentsInput",
                                    "multiline": True,
                                }
                            },
                            {
                                "type": "section",
                                "text": {
                                    "type": "plain_text",
                                    "text": " ",
                                    "emoji": True
                                }
                            },
                        ],
                        "close": {
                            "type": "plain_text",
                            "text": "취소",
                            "emoji": True
                        },
                        "submit": {
                            "type": "plain_text",
                            "text": "전송하기",
                            "emoji": True
                        },
                    }
                }
                await requestSystem("https://slack.com/api/views.open", jsonModel, {
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + fairyToken,
                    }
                })

                return ({ "message": "ok" }, 200, headers)
            except Exception as e:
                traceback.print_exc()
                await alertLog("Message Parser 서버 문제 생김 (rou_post_sendSlackEmail): " + str(e))
                return { "error": str(e) }