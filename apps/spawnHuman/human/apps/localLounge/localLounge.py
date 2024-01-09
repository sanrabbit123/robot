from quart import Quart
from apps.mother import processCwd, mongoConnection, shellExec, patternTest, listFilter, listMap, jsonStringify, requestSystem, objectDeepCopy
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.localLounge.router.localRouter import LocalRouter
from apps.backMaker.backMaker import BackMaker
import asyncio

class LocalLounge:

    def __init__(self):
        app = Quart(__name__)
        self.app = app

    async def registerIpAddress(self, router):
        members = returnMembers()

        result = await shellExec("ifconfig", [ "" ])
        resultArr = listMap(result.split("\n"), lambda x: x.strip())
        filteredArr = listFilter(resultArr, lambda x: x != "")
        filteredArr = listFilter(filteredArr, lambda x: patternTest(r"^inet[ ]+[0-9]+\.[0-9]+\.[0-9]+\.[0-9]", x))
        filteredArr = listMap(filteredArr, lambda x: x.split(" ")[1].strip())
        filteredArr = listFilter(filteredArr, lambda x: x != "127.0.0.1")

        filteredArr2 = listFilter(resultArr, lambda x: x != "")
        filteredArr2 = listFilter(filteredArr2, lambda x: patternTest(r"^ether[ ]+[a-z0-9][a-z0-9]\:[a-z0-9][a-z0-9]\:[a-z0-9][a-z0-9]\:[a-z0-9][a-z0-9]", x))
        filteredArr2 = listMap(filteredArr2, lambda x: x.split(" ")[1].strip())

        targetMember = None
        for member in members:
            if member["computer"]["mac"] in filteredArr2:
                targetMember = objectDeepCopy(member)
                break
        
        router.member = targetMember
        router.ip = objectDeepCopy(filteredArr)

    def setReady(self):
        localConnection = mongoConnection("local")
        router = LocalRouter(self.app, localConnection)
        router.setRouting()
        return router

    def returnApp(self):
        router = self.setReady()
        asyncio.run(self.registerIpAddress(router))
        return self.app



