from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.flowParser.router.flowRouter import FlowRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class FlowParser:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/flowParser"

    def setReady(self):
        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")
        officeConnection = mongoConnection("office")

        router = FlowRouter(self.app, coreConnection, localConnection, officeConnection)
        router.setRouting()
        return router

    def returnApp(self):
        self.setReady()
        return self.app

