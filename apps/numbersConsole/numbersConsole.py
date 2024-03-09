from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.numbersConsole.router.numbersRouter import NumbersRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class NumbersConsole:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/numbersConsole"

    def setReady(self):
        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")
        backConnection = mongoConnection("back")
        pythonConnection = mongoConnection("python")
        officeConnection = mongoConnection("office")
        contentsConnection = mongoConnection("contents")

        router = NumbersRouter(self.app, coreConnection, backConnection, pythonConnection, officeConnection, contentsConnection, localConnection)
        router.setRouting()
        return router

    def returnApp(self):
        self.setReady()
        return self.app



