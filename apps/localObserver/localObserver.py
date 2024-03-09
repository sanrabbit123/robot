from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.localObserver.router.localRouter import LocalRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class LocalObserver:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.address = returnAddress()

    def setReady(self):
        localConnection = mongoConnection("local")
        router = LocalRouter(self.app, localConnection)
        router.setRouting()

        def intervalFunc():
            try:
                currentType = [
                    "apply",
                ]
                for c in currentType:
                    asyncio.run(requestSystem("https://" + self.address["officeinfo"]["gitlab"]["host"] + ":" + str(self.address["officeinfo"]["gitlab"]["endPort"]) + "/gitLocalSync", { "type": c }, { "headers": { "Content-Type": "application/json" } }))
            except Exception as e:
                pass
        
        setInterval(intervalFunc, 1000 * 60 * 3)

        return router

    def returnApp(self):
        self.setReady()
        return self.app



