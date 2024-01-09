from quart import Quart
from apps.mother import processCwd, mongoConnection, shellExec, patternTest, listFilter, listMap, jsonStringify, requestSystem
from apps.infoObj import returnAddress
from apps.localLounge.router.localRouter import LocalRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class LocalLounge:

    def __init__(self):
        app = Quart(__name__)
        self.app = app

    async def registerIpAddress(self):
        address = returnAddress()
        result = await shellExec("ifconfig", [ "" ])
        resultArr = listMap(result.split("\n"), lambda x: x.strip())
        filteredArr = listFilter(resultArr, lambda x: x != "")
        filteredArr = listFilter(filteredArr, lambda x: patternTest(r"^inet[ ]+[0-9]+\.[0-9]+\.[0-9]+\.[0-9]", x))
        filteredArr = listMap(filteredArr, lambda x: x.split(" ")[1].strip())
        filteredArr = listFilter(filteredArr, lambda x: x != "127.0.0.1")
        await requestSystem("http://" + address["officeinfo"]["gitlab"]["host"] + ":" + str(address["officeinfo"]["gitlab"]["port"]) + "/registerIpAddress", { "id": "id", "ip": filteredArr }, { "headers": { "Content-Type": "application/json" } })

    def setReady(self):
        localConnection = mongoConnection("local")
        router = LocalRouter(self.app, localConnection)
        router.setRouting()

    def returnApp(self):
        asyncio.run(self.registerIpAddress())
        self.setReady()
        return self.app



