from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.imageParser.router.imageRouter import ImageRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class ImageParser:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/imageParser"

    def setReady(self):
        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")
        router = ImageRouter(self.app, coreConnection, localConnection)
        router.setRouting()
        return router

    def returnApp(self):
        self.setReady()
        return self.app

