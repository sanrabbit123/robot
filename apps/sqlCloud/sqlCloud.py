from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.sqlCloud.router.sqlRouter import SqlRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class SqlCloud:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/sqlCloud"

    def setReady(self):
        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")

        router = SqlRouter(self.app, coreConnection, localConnection)
        router.setRouting()
        return router

    def returnApp(self):
        self.setReady()
        return self.app

