from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.sqlCloud.router.sqlRouter import SqlRouter
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