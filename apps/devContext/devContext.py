from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.notionAPIs.notionAPIs import NotionAPIs
from apps.googleAPIs.googleAPIs import GoogleAPIs
from apps.notionAPIs.children.liaisonCalendar import LiaisonCalendar
from apps.numbersConsole.router.numbersCalculator import NumbersCalculator
from apps.numbersConsole.numbersConsole import NumbersConsole
from apps.excelReader.excelReader import ExcelReader
from apps.sqlCloud.router.sqlTools import SqlTools
from apps.openAiAPIs.openAiAPIs import OpenAiAPIs
from apps.awsAPIs.awsAPIs import AwsAPIs
from prettytable import PrettyTable
import asyncio

class DevContext:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.members = returnMembers()

        localConnection = mongoConnection("local")
        coreConnection = mongoConnection("core")
        backConnection = mongoConnection("back")
        pythonConnection = mongoConnection("python")
        officeConnection = mongoConnection("office")
        contentsConnection = mongoConnection("contents")

        self.mongo = coreConnection
        self.mongoconsole = backConnection
        self.mongopython = pythonConnection
        self.mongooffice = officeConnection
        self.mongocontents = contentsConnection
        self.mongolocal = localConnection

    async def launching(self) -> int:
        back = self.back
        address = self.address
        mongo = self.mongo
        mongoconsole = self.mongoconsole
        mongopython = self.mongopython
        mongooffice = self.mongooffice
        mongocontents = self.mongocontents
        mongolocal = self.mongolocal
        google = GoogleAPIs()
        aws = AwsAPIs()
        gpt = OpenAiAPIs()
        try:            



            return 1
        except Exception as e:
            print(e)
            return 0