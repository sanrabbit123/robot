from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.aliveObserver.router.aliveRouter import AliveRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class AliveObserver:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.address = returnAddress()

    def setReady(self):
        localConnection = mongoConnection("local")
        router = AliveRouter(self.app, localConnection)
        router.setRouting()

        def intervalFunc():
            try:
                pass
            except Exception as e:
                pass
        setInterval(intervalFunc, 1000 * 60 * 1)

        return router

    def returnApp(self):
        self.setReady()
        return self.app



