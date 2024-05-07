from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.historyCloud.router.historyRouter import HistoryRouter
from apps.backMaker.backMaker import BackMaker
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config

class HistoryCloud:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/historyCloud"

    async def setReady(self, loop):
        address = self.address

        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")

        router = HistoryRouter(self.app, coreConnection, localConnection)
        router.setRouting()

        return router

    async def serverConnect(self):
        address = self.address

        loop = asyncio.get_running_loop()
        await self.setReady(loop)

        portObject = generalPort()

        config = Config()
        config.bind = [ portObject["bind"] ]
        config.certfile = processCwd() + "/pems/" + address["officeinfo"]["test"]["host"] + "/cert/cert1.pem"
        config.keyfile = processCwd() + "/pems/" + address["officeinfo"]["test"]["host"] + "/key/privkey1.pem"
        config.ca_certs = processCwd() + "/pems/" + address["officeinfo"]["test"]["host"] + "/ca/fullchain1.pem"

        await serve(self.app, config)