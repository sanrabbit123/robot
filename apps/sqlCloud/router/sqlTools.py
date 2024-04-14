from quart import Quart
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.googleAPIs.googleAPIs import GoogleAPIs
from prettytable import PrettyTable
import asyncio

class SqlTools:

    def __init__(self):
        app = Quart(__name__)
        self.app = app
        self.back = BackMaker()
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/sqlCloud"
        self.google = GoogleAPIs()
        self.sheetsLink = "https://docs.google.com/spreadsheets/d/"
        self.extractFolderId = "1I7jcio6n9bdVvEvS9mz7PQTcbzxlfNbd"

    async def createSqlSheets(self, rows: list) -> dict:
        try:
            defaultSheetsName = "client"
            google = self.google
            parentId = self.extractFolderId
            sheetsName = "sqlSheets_" + uniqueValue("hex")

            coreStructure = self.returnCoreStructure()

            clientMap = coreStructure["client"]["map"]
            projectMap = coreStructure["project"]["map"]
            designerMap = coreStructure["designer"]["map"]

            matrix = []

            if len(rows) == 0:
                raise Exception("no empty rows")

            initKeyList = []
            for key in rows[0]:
                initKeyList.append(key)

            columns = []
            columnNames = []
            for obj in clientMap:
                if listIncludes(initKeyList, lambda s: s == obj["title"]):
                    columns.append(obj["title"])
                    columnNames.append(obj["name"])
            for obj in projectMap:
                if listIncludes(initKeyList, lambda s: s == obj["title"]):
                    columns.append(obj["title"])
                    columnNames.append(obj["name"])
            for obj in designerMap:
                if listIncludes(initKeyList, lambda s: s == obj["title"]):
                    columns.append(obj["title"])
                    columnNames.append(obj["name"])

            matrix.append(columnNames)

            for obj in rows:
                tempList = []
                for k in columns:
                    tempList.append(obj[k])
                matrix.append(tempList)

            tempObj = google.sheets_createSheets(sheetsName, parentId)
            thisSheetsId = tempObj["id"]

            google.sheets_updateDefaultSheetsName(thisSheetsId, defaultSheetsName)
            google.sheets_updateValue(thisSheetsId, defaultSheetsName, matrix)
            google.sheets_cleanView(thisSheetsId)

            return { "id": thisSheetsId, "link": self.sheetsLink + thisSheetsId }
        except:
            return { "id": "" }

    async def coreReflect(self):
        print(await shellExec("node", [ processCwd() + "/robot.js", "coreReflect" ]))
        await sleep(1 * 1000)
        print(await shellExec("node", [ processCwd() + "/robot.js", "mysqlReflect" ]))
        return 0

    def getCoreStructure(self) -> str:
        structure = self.returnCoreStructure()            
        table = PrettyTable()
        table.header = False
        table.field_names = [ "a", "b" ]
        table.align = "l"

        for tableName in structure:
            thisMap = structure[tableName]["map"]
            table.add_row([ tableName, "" ], divider=True)
            matrix = []
            for obj in thisMap:
                matrix.append([ obj["title"], obj["name"] ])
            lastArr = matrix.pop()
            table.add_rows(matrix)
            table.add_row(lastArr, divider=True)

        return table.get_string()

    async def homeliaisonQuery(self, query: str) -> dict:
        structure = self.returnCoreStructure()    
        
        query = query.strip()
        query = patternReplace(query, r"[\n\t]", " ")
        for i in range(10):
            query = patternReplace(query, r"  ", " ")
        if patternTest(r"^(SELECT|select)", query):
            queryArr = []
            if patternTest(r"FROM", query):
                queryArr.append(query.split("FROM")[0])
            else:
                queryArr.append(query.split("from")[0])

            queryArr[0] = patternReplace(queryArr[0], r"^(SELECT|select)", "").strip()
            tableArr = queryArr[0].split(",")
            tableArr = listMap(tableArr, lambda x: x.strip())
            tableArr = listFilter(tableArr, lambda x: x != "")
            newQueryString = "SELECT " + ", ".join(tableArr) + " FROM " + queryArr[1].strip()
            query = newQueryString

        result = await mysqlQuery(query)

        responseDic = {}
        if patternTest(r"^(SELECT|select)", query):
            responseDic["data"] = result["data"]
            tableString = self.intoPrettyTable(query, result["data"])
            responseDic["table"] = tableString
        else:
            responseDic["data"] = result["data"]

        return responseDic

    def intoPrettyTable(self, query: str, data: list) -> str:
        finalString = ""
        structure = self.returnCoreStructure()            
        query = query.strip()
        query = patternReplace(query, r"[\n\t]", " ")
        for i in range(10):
            query = patternReplace(query, r"  ", " ")

        table = PrettyTable()
        table.align = "l"

        if patternTest(r"(JOIN|join)", query):
            queryArr = []
            if patternTest(r"FROM", query):
                queryArr.append(query.split("FROM")[0])
                queryArr.append(query.split("FROM")[1])
            else:
                queryArr.append(query.split("from")[0])
                queryArr.append(query.split("from")[1])

            queryArr[0] = patternReplace(queryArr[0], r"^(SELECT|select)", "").strip()
            tableArr = queryArr[0].split(",")
            tableArr = listMap(tableArr, lambda x: x.strip())
            tableMatrix = listMap(tableArr, lambda x: x.split("."))

            tableNameArr = []
            for arr in tableMatrix:
                tableName = arr[0]
                thisMap = structure[tableName]["map"]
                thisDic = {}
                for obj in thisMap:
                    thisDic[obj["title"]] = obj["name"]
                tableHangul = thisDic[arr[1]]
                tableNameArr.append(tableHangul)

            table.field_names = tableNameArr

            matrix = []
            for dictionaryFactor in data:
                tempArr = []
                for arr in tableMatrix:
                    tempArr.append(dictionaryFactor[arr[1]])
                matrix.append(tempArr)

            table.add_rows(matrix)
            finalString = table.get_string()
        else:
            queryArr = []
            if patternTest(r"FROM", query):
                queryArr.append(query.split("FROM")[0])
                queryArr.append(query.split("FROM")[1])
            else:
                queryArr.append(query.split("from")[0])
                queryArr.append(query.split("from")[1])

            queryArr[0] = patternReplace(queryArr[0], r"^(SELECT|select)", "").strip()
            tableArr = queryArr[0].split(",")
            tableArr = listMap(tableArr, lambda x: x.strip())

            queryArr[1] = queryArr[1].strip().split(" ")[0]
            tableName = queryArr[1]
            thisMap = structure[tableName]["map"]
            thisDic = {}
            for obj in thisMap:
                thisDic[obj["title"]] = obj["name"]

            tableNameArr = []
            for key in tableArr:
                tableNameArr.append(thisDic[key])

            table.field_names = tableNameArr

            matrix = []
            for dictionaryFactor in data:
                tempArr = []
                for key in tableArr:
                    tempArr.append(dictionaryFactor[key])
                matrix.append(tempArr)

            table.add_rows(matrix)

            finalString = table.get_string()

        return finalString

    def returnCoreStructure(self) -> dict:
        result = {
            "client": { "name": "고객" },
            "project": { "name": "프로젝트" },
            "designer": { "name": "디자이너" },
        }

        result["client"]["map"] = [
            { "title": "cliid", "name": "고객 아이디", "type": "string", },
            { "title": "name", "name": "성함", "type": "string", },
            { "title": "status", "name": "상태", "type": "string", },
            { "title": "action", "name": "액션", "type": "string", },
            { "title": "outreason", "name": "유출 이유", "type": "string", },
            { "title": "kakao", "name": "카카오 등록", "type": "string", },
            { "title": "service", "name": "예정 서비스", "type": "string", },
            { "title": "next", "name": "다음 연락일", "type": "string", },
            { "title": "recommend", "name": "추천일", "type": "string", },
            { "title": "callHistory", "name": "전화 기록", "type": "string", },
            { "title": "timeline", "name": "문의일", "type": "date", },
            { "title": "spacePicture", "name": "공간 사진", "type": "string", },
            { "title": "preferPicture", "name": "선호 사진", "type": "string", },
            { "title": "phone", "name": "연락처", "type": "string", },
            { "title": "email", "name": "이메일", "type": "string", },
            { "title": "budget", "name": "예산", "type": "string", },
            { "title": "address", "name": "주소", "type": "string", },
            { "title": "contract", "name": "계약 형태", "type": "string", },
            { "title": "pyeong", "name": "평수", "type": "number", },
            { "title": "naver", "name": "네이버 부동산", "type": "string", },
            { "title": "living", "name": "거주중 여부", "type": "string", },
            { "title": "precheck", "name": "사전점검일", "type": "date", },
            { "title": "empty", "name": "집 비는 날", "type": "date", },
            { "title": "movein", "name": "이사 예정일", "type": "date", },
            { "title": "expected", "name": "입주 예정일", "type": "date", },
            { "title": "room", "name": "방 개수", "type": "number", },
            { "title": "bathroom", "name": "화장실 개수", "type": "number", },
            { "title": "valcony", "name": "발코니 확장 여부", "type": "string", },
            { "title": "family", "name": "가족 구성원", "type": "string", },
            { "title": "furniture", "name": "가구 구매 정도", "type": "string", },
            { "title": "comment", "name": "요청 사항", "type": "string", },
            { "title": "channel", "name": "유입 채널", "type": "string", },
            { "title": "partialBoo", "name": "부분 여부", "type": "string", },
            { "title": "partialPyeong", "name": "부분 평수", "type": "number", },
            { "title": "partialDetail", "name": "부분 상세 사항", "type": "string", },
            { "title": "designers", "name": "추천된 디자이너", "type": "string", },
            { "title": "priority", "name": "우선순위", "type": "string", },
            { "title": "target", "name": "타겟 여부", "type": "string", },
            { "title": "possible", "name": "가능성 여부", "type": "string", },
            { "title": "memo", "name": "메모", "type": "string", },
        ]

        result["project"]["map"] = [
            { "title": "proid", "name": "프로젝트 아이디", "type": "string" },
            { "title": "cliid", "name": "고객 아이디", "type": "string" },
            { "title": "desid", "name": "디자이너 아이디", "type": "string" },
            { "title": "serid", "name": "서비스 아이디", "type": "string" },
            { "title": "xValue", "name": "서비스 수준", "type": "string" },
            { "title": "online", "name": "온라인 여부", "type": "string" },
            { "title": "status", "name": "상태", "type": "string" },
            { "title": "action", "name": "액션", "type": "string" },
            { "title": "next", "name": "다음 연락일", "type": "string" },
            { "title": "callHistory", "name": "전화 기록", "type": "string" },
            { "title": "firstDate", "name": "계약일", "type": "date" },
            { "title": "firstCancel", "name": "계약 취소일", "type": "date" },
            { "title": "firstAmount", "name": "계약금", "type": "number" },
            { "title": "firstInfo", "name": "계약금 지불 정보", "type": "string" },
            { "title": "firstRefund", "name": "계약금 환불액", "type": "nunber" },
            { "title": "remainDate", "name": "잔금일", "type": "date" },
            { "title": "remainCancel", "name": "잔금 취소일", "type": "date" },
            { "title": "remainSupply", "name": "공급가", "type": "number" },
            { "title": "remainVat", "name": "VAT", "type": "number" },
            { "title": "remainConsumer", "name": "소비자가", "type": "number" },
            { "title": "remainPure", "name": "잔금", "type": "number" },
            { "title": "remainInfo", "name": "잔금 지불 정보", "type": "string" },
            { "title": "remainRefund", "name": "잔금 환불액", "type": "number" },
            { "title": "discount", "name": "할인율 홈리에종", "type": "number" },
            { "title": "discountDesigner", "name": "할인율 디자이너", "type": "number" },
            { "title": "formDateFrom", "name": "프로젝트 시작일", "type": "date" },
            { "title": "formDateTo", "name": "프로젝트 종료일", "type": "date" },
            { "title": "formDateCancel", "name": "프로젝트 취소일", "type": "date" },
            { "title": "meetingDate", "name": "현장 미팅일", "type": "date" },
            { "title": "method", "name": "사업자 방식", "type": "string" },
            { "title": "percentage", "name": "수수료", "type": "number" },
            { "title": "calculationInfo", "name": "정산 정보", "type": "string" },
            { "title": "paymentsTotalAmount", "name": "정산 총 금액", "type": "number" },
            { "title": "paymentsFirstAmount", "name": "선금 금액", "type": "number" },
            { "title": "paymentsFirstDate", "name": "선금 지급일", "type": "date" },
            { "title": "paymentsFirstCancel", "name": "선금 환수일", "type": "date" },
            { "title": "paymentsFirstRefund", "name": "선금 환수액", "type": "number" },
            { "title": "paymentsRemainAmount", "name": "잔금 금액", "type": "number" },
            { "title": "paymentsRemainDate", "name": "잔금 지급일", "type": "date" },
            { "title": "paymentsRemainCancel", "name": "잔금 환수일", "type": "date" },
            { "title": "paymentsRemainRefund", "name": "잔금 환수액", "type": "number" },
            { "title": "photoStatus", "name": "촬영 여부", "type": "string" },
            { "title": "contentsPhotoDate", "name": "촬영 일자", "type": "date" },
            { "title": "proposalDate", "name": "제안일", "type": "date" },
            { "title": "proposalDesigner0", "name": "제안 디자이너 0", "type": "string" },
            { "title": "proposalFee0", "name": "제안 금액 0", "type": "number" },
            { "title": "proposalDesigner1", "name": "제안 디자이너 1", "type": "string" },
            { "title": "proposalFee1", "name": "제안 금액 1", "type": "number" },
            { "title": "proposalDesigner2", "name": "제안 디자이너 2", "type": "string" },
            { "title": "proposalFee2", "name": "제안 금액 2", "type": "number" },
            { "title": "proposalDesigner3", "name": "제안 디자이너 3", "type": "string" },
            { "title": "proposalFee3", "name": "제안 금액 3", "type": "number" },
            { "title": "proposalDesigner4", "name": "제안 디자이너 4", "type": "string" },
            { "title": "proposalFee4", "name": "제안 금액 4", "type": "number" },
            { "title": "proposalDesigner5", "name": "제안 디자이너 5", "type": "string" },
            { "title": "proposalFee5", "name": "제안 금액 5", "type": "number" },
            { "title": "proposalDesigner6", "name": "제안 디자이너 6", "type": "string" },
            { "title": "proposalFee6", "name": "제안 금액 6", "type": "number" },
            { "title": "proposalDesigner7", "name": "제안 디자이너 7", "type": "string" },
            { "title": "proposalFee7", "name": "제안 금액 7", "type": "number" },
            { "title": "proposalDesigner8", "name": "제안 디자이너 8", "type": "string" },
            { "title": "proposalFee8", "name": "제안 금액 8", "type": "number" },
            { "title": "proposalDesigner9", "name": "제안 디자이너 9", "type": "string" },
            { "title": "proposalFee9", "name": "제안 금액 9", "type": "number" },
            { "title": "proposalAverage", "name": "제안 평균 금액", "type": "number" },
        ]

        result["designer"]["map"] = [
            { "title": "desid", "name": "디자이너 아이디", "type": "string", },
            { "title": "designer", "name": "디자이너", "type": "string", },
            { "title": "status", "name": "상태", "type": "string", },
            { "title": "date", "name": "계약일", "type": "date", },
            { "title": "phone", "name": "연락처", "type": "string", },
            { "title": "email", "name": "이메일", "type": "string", },
            { "title": "did", "name": "서브 아이디", "type": "string", },
            { "title": "address", "name": "주소", "type": "string", },
            { "title": "showRoom", "name": "쇼룸 소유 여부", "type": "string", },
            { "title": "webPage", "name": "웹페이지", "type": "string", },
            { "title": "sns", "name": "SNS", "type": "string", },
            { "title": "career", "name": "경력", "type": "string", },
            { "title": "account", "name": "계좌번호", "type": "string", },
            { "title": "classification", "name": "사업자 분류", "type": "string", },
            { "title": "businessNumber", "name": "사업자 번호", "type": "string", },
            { "title": "percentage", "name": "수수료", "type": "number", },
        ]

        return result
