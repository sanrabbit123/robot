import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from quart import request
from urllib import parse
import traceback

class SqlRouter:

    def __init__(self, app, coreConnection, localConnection):
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.headers = generalHeaders()
        self.mongo = coreConnection
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
                await alertLog("Sql Cloud 서버 문제 생김 (rou_post_coreReflect): " + str(e))
                return { "error": str(e) }


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