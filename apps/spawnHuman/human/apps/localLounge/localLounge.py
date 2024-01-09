from quart import Quart
from apps.mother import processCwd, mongoConnection
from apps.localLounge.router.localRouter import LocalRouter
from apps.backMaker.backMaker import BackMaker

class LocalLounge:

    def __init__(self):
        app = Quart(__name__)
        self.app = app

    def setReady(self):
        localConnection = mongoConnection("local")
        router = LocalRouter(self.app, localConnection)
        router.setRouting()

    def returnApp(self):
        self.setReady()
        return self.app



