from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
import aiomysql

class SqlContext:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()

        localConnection = mongoConnection("local")

        self.mongo = localConnection
        self.mongolocal = localConnection

    async def launching(self) -> int:
        back = self.back
        mongo = self.mongo
        mongolocal = self.mongolocal
        try:



            




            return 1
        except Exception as e:
            print(e)
            return 0