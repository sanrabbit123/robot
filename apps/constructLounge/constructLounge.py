from quart import Quart
from apps.mother import processCwd, mongoConnection
from apps.constructLounge.router.constructRouter import ConstructRouter
from apps.backMaker.backMaker import BackMaker

class ConstructLounge:

    def __init__(self):
        app = Quart(__name__)
        self.app = app

    def setReady(self):
        coreConnection = mongoConnection("core")
        backConnection = mongoConnection("back")
        localConnection = mongoConnection("local")
        router = ConstructRouter(self.app, coreConnection, backConnection, localConnection)
        router.setRouting()

    def returnApp(self):
        self.setReady()
        return self.app



