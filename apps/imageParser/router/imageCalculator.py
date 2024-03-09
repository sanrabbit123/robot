import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker

class ImageCalculator:

    def __init__(self, coreConnection, localConnection):
        self.back = BackMaker()
        self.address = returnAddress()
        self.members = returnMembers()

        self.mongo = coreConnection
        self.mongolocal = localConnection
        
        


