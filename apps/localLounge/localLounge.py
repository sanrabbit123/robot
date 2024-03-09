from quart import Quart
from apps.mother import *
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
        systemInfo = getSystemInfo()
        
        filteredArr2 = []
        filteredArr2.append(systemInfo["network"]["mac"])

        targetMember = None
        for member in members:
            if member["computer"]["mac"] in filteredArr2:
                targetMember = objectDeepCopy(member)
                break
        
        router.member = targetMember
        router.ip = [ systemInfo["network"]["ip"] ]

    def setReady(self):
        router = LocalRouter(self.app)
        router.setRouting()
        return router

    def returnApp(self):
        router = self.setReady()
        asyncio.run(self.registerIpAddress(router))
        return self.app