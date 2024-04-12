from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.sqlCloud.router.sqlRouter import SqlRouter
from apps.sqlCloud.router.sqlTools import SqlTools
from apps.backMaker.backMaker import BackMaker
import asyncio
import aiomysql
from hypercorn.asyncio import serve
from hypercorn.config import Config

class SqlCloud:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/sqlCloud"
        self.tools = SqlTools()

    async def setReady(self, loop):
        address = self.address

        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")
        mysqlConnection = await aiomysql.connect(host=address["mysqlinfo"]["host"], port=address["mysqlinfo"]["port"], user=address["mysqlinfo"]["user"], password=address["mysqlinfo"]["password"], db=address["mysqlinfo"]["database"], loop=loop)

        router = SqlRouter(self.app, coreConnection, localConnection, mysqlConnection)
        router.setRouting()

        return router

    async def serverConnect(self):
        address = self.address

        loop = asyncio.get_running_loop()
        await self.setReady(loop)

        portObject = generalPort()

        config = Config()
        config.bind = [ portObject["bind"] ]
        config.certfile = processCwd() + "/pems/" + address["mysqlinfo"]["host"] + "/cert/cert1.pem"
        config.keyfile = processCwd() + "/pems/" + address["mysqlinfo"]["host"] + "/key/privkey1.pem"
        config.ca_certs = processCwd() + "/pems/" + address["mysqlinfo"]["host"] + "/ca/fullchain1.pem"

        await serve(self.app, config)

    def returnCoreStructure(self) -> dict:
        result = {}

        result["client"] = [
            { "title": "name", "name": "성함", },
            { "title": "status", "name": "상태", },
            { "title": "action", "name": "액션", },
            { "title": "outreason", "name": "유출 이유", },
            { "title": "kakao", "name": "카카오 등록", },
            { "title": "service", "name": "예정 서비스", },
            { "title": "next", "name": "다음 연락일", },
            { "title": "recommend", "name": "추천일", },
            { "title": "callHistory", "name": "전화 기록", },
            { "title": "timeline", "name": "문의일", },
            { "title": "spacePicture", "name": "공간 사진", },
            { "title": "preferPicture", "name": "선호 사진", },
            { "title": "phone", "name": "연락처", },
            { "title": "email", "name": "이메일", },
            { "title": "budget", "name": "예산", },
            { "title": "address", "name": "주소", },
            { "title": "contract", "name": "자가 여부", },
            { "title": "pyeong", "name": "평수", },
            { "title": "naver", "name": "네이버 부동산", },
            { "title": "living", "name": "거주중 여부", },
            { "title": "precheck", "name": "사전점검일", },
            { "title": "empty", "name": "집 비는 날", },
            { "title": "movein", "name": "이사 예정일", },
            { "title": "expected", "name": "입주 예정일", },
            { "title": "room", "name": "방 개수", },
            { "title": "bathroom", "name": "화장실 개수", },
            { "title": "valcony", "name": "발코니 확장 여부", },
            { "title": "family", "name": "가족 구성원", },
            { "title": "furniture", "name": "가구 구매 정도", },
            { "title": "comment", "name": "요청 사항", },
            { "title": "channel", "name": "유입 채널", },
            { "title": "partialBoo", "name": "부분 여부", },
            { "title": "partialPyeong", "name": "부분 평수", },
            { "title": "partialDetail", "name": "부분 상세 사항", },
            { "title": "designers", "name": "추천된 디자이너", },
            { "title": "priority", "name": "우선순위", },
            { "title": "target", "name": "타겟 여부", },
            { "title": "possible", "name": "가능성 여부", },
            { "title": "memo", "name": "메모", },
        ]

        return result
