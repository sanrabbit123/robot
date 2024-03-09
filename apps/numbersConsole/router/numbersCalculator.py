import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker

class NumbersCalculator:

    def __init__(self, coreConnection, backConnection, pythonConnection, officeConnection, contentsConnection, localConnection):
        self.back = BackMaker()
        self.address = returnAddress()
        self.members = returnMembers()

        self.mongo = coreConnection
        self.mongoconsole = backConnection
        self.mongopython = pythonConnection
        self.mongooffice = officeConnection
        self.mongocontents = contentsConnection
        self.mongolocal = localConnection
        
    def returnColumns(self, fullMode: bool = False) -> list:

        columnsOriginal = { "standards": [], "columns": [] }

        # standards
        columnsOriginal["standards"].append({
            "title": "아이디",
            "width": 96,
            "name": "proid",
            "type": "string",
        })
        columnsOriginal["standards"].append({
            "title": "성함",
            "width": 60,
            "name": "name",
            "type": "string",
        })

        # columns : id

        # columns : info
        columnsOriginal["columns"].append({
            "title": "디자이너",
            "width": 60,
            "name": "designer",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "서비스",
            "width": 180,
            "name": "service",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "상태",
            "width": 60,
            "name": "status",
            "type": "string",
            "colorStandard": True,
            "colorMap": [
                {
                    "value": "대기",
                    "color": "black"
                },
                {
                    "value": "진행중",
                    "color": "black"
                },
                {
                    "value": "완료",
                    "color": "green"
                },
                {
                    "value": "드랍",
                    "color": "gray3"
                },
                {
                    "value": "홀딩",
                    "color": "gray3"
                },   
            ]
        })
        columnsOriginal["columns"].append({
            "title": "문의일",
            "width": 160,
            "name": "timeline",
            "type": "date",
        })
        columnsOriginal["columns"].append({
            "title": "계약일",
            "width": 160,
            "name": "contract",
            "type": "date",
        })

        # columns : fee - design
        columnsOriginal["columns"].append({
            "title": "총액(D)",
            "width": 100,
            "name": "feeDesign_total",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지불(D)",
            "width": 100,
            "name": "feeDesign_paid",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "예정(D)",
            "width": 100,
            "name": "feeDesign_expected",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "정산(D)",
            "width": 100,
            "name": "feeDesign_designer",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지급(D)",
            "width": 100,
            "name": "feeDesign_send",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "대기(D)",
            "width": 100,
            "name": "feeDesign_yet",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "이익(D)",
            "width": 100,
            "name": "feeDesign_profit",
            "type": "money",
        })
        
        # columns : fee - construct
        columnsOriginal["columns"].append({
            "title": "총액(C)",
            "width": 100,
            "name": "feeConstruct_total",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지불(C)",
            "width": 100,
            "name": "feeConstruct_paid",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "예정(C)",
            "width": 100,
            "name": "feeConstruct_expected",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "정산(C)",
            "width": 100,
            "name": "feeConstruct_designer",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지급(C)",
            "width": 100,
            "name": "feeConstruct_send",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "대기(C)",
            "width": 100,
            "name": "feeConstruct_yet",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "이익(C)",
            "width": 100,
            "name": "feeConstruct_profit",
            "type": "money",
        })
        
        # columns : fee - etc
        columnsOriginal["columns"].append({
            "title": "총액(E)",
            "width": 100,
            "name": "feeEtc_total",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지불(E)",
            "width": 100,
            "name": "feeEtc_paid",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "예정(E)",
            "width": 100,
            "name": "feeEtc_expected",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "정산(E)",
            "width": 100,
            "name": "feeEtc_designer",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지급(E)",
            "width": 100,
            "name": "feeEtc_send",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "대기(E)",
            "width": 100,
            "name": "feeEtc_yet",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "이익(E)",
            "width": 100,
            "name": "feeEtc_profit",
            "type": "money",
        })
        
        # columns : fee - total
        columnsOriginal["columns"].append({
            "title": "총액(T)",
            "width": 100,
            "name": "feeTotal_total",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지불(T)",
            "width": 100,
            "name": "feeTotal_paid",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "예정(T)",
            "width": 100,
            "name": "feeTotal_expected",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "정산(T)",
            "width": 100,
            "name": "feeTotal_designer",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "지급(T)",
            "width": 100,
            "name": "feeTotal_send",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "대기(T)",
            "width": 100,
            "name": "feeTotal_yet",
            "type": "money",
        })
        columnsOriginal["columns"].append({
            "title": "이익(T)",
            "width": 100,
            "name": "feeTotal_profit",
            "type": "money",
        })
        
        # id
        columnsOriginal["columns"].append({
            "title": "proid",
            "width": 96,
            "name": "proid",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "cliid",
            "width": 96,
            "name": "cliid",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "desid",
            "width": 96,
            "name": "desid",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "bilid",
            "width": 96,
            "name": "bilid",
            "type": "string",
        })
        columnsOriginal["columns"].append({
            "title": "고객",
            "width": 60,
            "name": "name",
            "type": "string",
        })

        standards = listMap(columnsOriginal["standards"], lambda x: x["title"])
        columns = listMap(columnsOriginal["columns"], lambda x: x["title"])
        
        if fullMode:
            return columnsOriginal
        else:
            return ( standards, columns )

    async def detailCalculate(self, targetProjects, targetClients, targetDesigners, targetBills) -> list:
        resultList = []
        for thisBill in targetBills:
            results = {}

            thisProject = listFind(targetProjects, lambda p: p["proid"] == thisBill["links"]["proid"])
            thisClient = listFind(targetClients, lambda c: c["cliid"] == thisProject["cliid"])
            thisDesigner = listFind(targetDesigners, lambda d: d["desid"] == thisProject["desid"])
            thisRequestNumber = 0
            for i in range(len(thisClient["requests"])):
                if getDateValue(thisClient["requests"][i]["request"]["timeline"]) <= getDateValue(thisProject["proposal"]["date"]):
                    thisRequestNumber = i
                    break
                else:
                    pass
            thisRequest = thisClient["requests"][thisRequestNumber]["request"]

            thisDesignRequests = objectDeepCopy(listFilter(thisBill["requests"], lambda x: patternTest(r"홈리에종 계약금", x["name"]) or patternTest(r"홈리에종 잔금", x["name"])))
            thisDesignResponses = objectDeepCopy(listFilter(thisBill["responses"], lambda x: patternTest(r"홈리에종 선금 정산", x["name"]) or patternTest(r"홈리에종 잔금 정산", x["name"])))

            thisConstructRequests = objectDeepCopy(listFilter(thisBill["requests"], lambda x: patternTest(r"시공", x["name"])))
            thisConstructResponses = objectDeepCopy(listFilter(thisBill["responses"], lambda x: patternTest(r"시공 정산", x["name"])))

            thisEtcRequests = objectDeepCopy(listFilter(thisBill["requests"], lambda x: x["name"] != "홈리에종 계약금" and x["name"] != "홈리에종 잔금" and not patternTest(r"시공", x["name"])))
            thisEtcResponses = objectDeepCopy(listFilter(thisBill["responses"], lambda x: x["name"] != "홈리에종 선금 정산" and x["name"] != "홈리에종 잔금 정산" and not patternTest(r"시공 정산", x["name"])))

            thisRequests = objectDeepCopy(thisBill["requests"])
            thisResponses = objectDeepCopy(thisBill["responses"])

            # 0
            results["id"] = {
                "proid": thisProject["proid"],
                "bilid": thisBill["bilid"],
                "cliid": thisClient["cliid"],
                "desid": thisDesigner["desid"],
            }

            # 1
            results["info"] = {
                "name": thisClient["name"],
                "designer": thisDesigner["designer"],
                "service": serviceParsing(thisProject["service"]),
                "status": thisProject["process"]["status"],
                "timeline": dateToString(thisRequest["timeline"], True),
                "contract": dateToString(thisProject["process"]["contract"]["first"]["date"], True)
            }

            results["fee"] = {}

            # 2 - design fee
            feeDesign_total = 0
            feeDesign_paid = 0
            feeDesign_expected = 0
            feeDesign_designer = 0
            feeDesign_send = 0
            feeDesign_yet = 0
            feeDesign_profit = 0

            for requestObj in thisDesignRequests:
                itemSum = listReduce(requestObj["items"], lambda acc, curr: acc + int(curr["amount"]["consumer"]), 0)
                paySum = listReduce(requestObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(requestObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeDesign_total += itemSum
                feeDesign_paid += paySum - cancelSum
                feeDesign_expected += (itemSum - (paySum - cancelSum))

            for responseObj in thisDesignResponses:
                itemSum = listReduce(responseObj["items"], lambda acc, curr: acc + int(curr["amount"]["pure"]), 0)
                paySum = listReduce(responseObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(responseObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeDesign_designer += itemSum
                feeDesign_send += paySum - cancelSum
                feeDesign_yet += (itemSum - (paySum - cancelSum))

            feeDesign_profit = feeDesign_total - feeDesign_designer
            if patternTest(r"드랍", thisProject["process"]["status"]):
                feeDesign_expected = 0
                feeDesign_yet = 0
                feeDesign_profit = feeDesign_paid - feeDesign_send

            results["fee"]["design"] = {
                "total": feeDesign_total,
                "paid": feeDesign_paid,
                "expected": feeDesign_expected,
                "designer": feeDesign_designer,
                "send": feeDesign_send,
                "yet": feeDesign_yet,
                "profit": feeDesign_profit,
            }

            # 3 - construct fee
            feeConstruct_total = 0
            feeConstruct_paid = 0
            feeConstruct_expected = 0
            feeConstruct_designer = 0
            feeConstruct_send = 0
            feeConstruct_yet = 0
            feeConstruct_profit = 0

            for requestObj in thisConstructRequests:
                itemSum = listReduce(requestObj["items"], lambda acc, curr: acc + int(curr["amount"]["consumer"]), 0)
                paySum = listReduce(requestObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(requestObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeConstruct_total += itemSum
                feeConstruct_paid += paySum - cancelSum
                feeConstruct_expected += (itemSum - (paySum - cancelSum))

            for responseObj in thisConstructResponses:
                itemSum = listReduce(responseObj["items"], lambda acc, curr: acc + int(curr["amount"]["pure"]), 0)
                paySum = listReduce(responseObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(responseObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeConstruct_designer += itemSum
                feeConstruct_send += paySum - cancelSum
                feeConstruct_yet += (itemSum - (paySum - cancelSum))

            feeConstruct_profit = feeConstruct_total - feeConstruct_designer
            if patternTest(r"드랍", thisProject["process"]["status"]):
                feeConstruct_expected = 0
                feeConstruct_yet = 0
                feeConstruct_profit = feeConstruct_paid - feeConstruct_send

            results["fee"]["construct"] = {
                "total": feeConstruct_total,
                "paid": feeConstruct_paid,
                "expected": feeConstruct_expected,
                "designer": feeConstruct_designer,
                "send": feeConstruct_send,
                "yet": feeConstruct_yet,
                "profit": feeConstruct_profit,
            }

            # 4 - etc fee
            feeEtc_total = 0
            feeEtc_paid = 0
            feeEtc_expected = 0
            feeEtc_designer = 0
            feeEtc_send = 0
            feeEtc_yet = 0
            feeEtc_profit = 0

            for requestObj in thisEtcRequests:
                itemSum = listReduce(requestObj["items"], lambda acc, curr: acc + int(curr["amount"]["consumer"]), 0)
                paySum = listReduce(requestObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(requestObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeEtc_total += itemSum
                feeEtc_paid += paySum - cancelSum
                feeEtc_expected += (itemSum - (paySum - cancelSum))

            for responseObj in thisEtcResponses:
                itemSum = listReduce(responseObj["items"], lambda acc, curr: acc + int(curr["amount"]["pure"]), 0)
                paySum = listReduce(responseObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(responseObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeEtc_designer += itemSum
                feeEtc_send += paySum - cancelSum
                feeEtc_yet += (itemSum - (paySum - cancelSum))

            feeEtc_profit = feeEtc_total - feeEtc_designer
            if patternTest(r"드랍", thisProject["process"]["status"]):
                feeEtc_expected = 0
                feeEtc_yet = 0
                feeEtc_profit = feeEtc_paid - feeEtc_send

            results["fee"]["etc"] = {
                "total": feeEtc_total,
                "paid": feeEtc_paid,
                "expected": feeEtc_expected,
                "designer": feeEtc_designer,
                "send": feeEtc_send,
                "yet": feeEtc_yet,
                "profit": feeEtc_profit,
            }

            # 5 - total fee
            feeTotal_total = 0
            feeTotal_paid = 0
            feeTotal_expected = 0
            feeTotal_designer = 0
            feeTotal_send = 0
            feeTotal_yet = 0
            feeTotal_profit = 0

            for requestObj in thisRequests:
                itemSum = listReduce(requestObj["items"], lambda acc, curr: acc + int(curr["amount"]["consumer"]), 0)
                paySum = listReduce(requestObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(requestObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeTotal_total += itemSum
                feeTotal_paid += paySum - cancelSum
                feeTotal_expected += (itemSum - (paySum - cancelSum))

            for responseObj in thisResponses:
                itemSum = listReduce(responseObj["items"], lambda acc, curr: acc + int(curr["amount"]["pure"]), 0)
                paySum = listReduce(responseObj["pay"], lambda acc, curr: acc + int(curr["amount"]), 0)
                cancelSum = listReduce(responseObj["cancel"], lambda acc, curr: acc + int(curr["amount"]), 0)
                feeTotal_designer += itemSum
                feeTotal_send += paySum - cancelSum
                feeTotal_yet += (itemSum - (paySum - cancelSum))

            feeTotal_profit = feeTotal_total - feeTotal_designer
            if patternTest(r"드랍", thisProject["process"]["status"]):
                feeTotal_expected = 0
                feeTotal_yet = 0
                feeTotal_profit = feeTotal_paid - feeTotal_send

            results["fee"]["total"] = {
                "total": feeTotal_total,
                "paid": feeTotal_paid,
                "expected": feeTotal_expected,
                "designer": feeTotal_designer,
                "send": feeTotal_send,
                "yet": feeTotal_yet,
                "profit": feeTotal_profit,
            }

            # result
            resultList.append(results)

        resultList = listSort(resultList, lambda x: getDateValue(stringToDate(x["info"]["contract"])), reverse=True)
        return resultList
    
    async def calculateIOList(self, fromDate, toDate = None) -> list:
        back = self.back
        mongo = self.mongo
        mongopython = self.mongopython

        # projects
        mongoOption = { "selfMongo": mongo }
        collection = "project"
        whereQuery = {}
        if toDate is None:
            whereQuery["process.contract.first.date"] = { "$gte": fromDate }
        else:
            whereQuery["$and"] = []
            whereQuery["$and"].append({ "process.contract.first.date": { "$gte": fromDate } })
            whereQuery["$and"].append({ "process.contract.first.date": { "$lt": toDate } })
        targetProjects = await back.mongoRead(collection, whereQuery, mongoOption)

        # clients
        mongoOption = { "selfMongo": mongo }
        collection = "client"
        whereQuery = {}
        whereQuery["$or"] = []
        for project in targetProjects:
            whereQuery["$or"].append({ "cliid": project["cliid"] })
        targetClients = await back.mongoRead(collection, whereQuery, mongoOption)

        # designers
        targetDesigners = await back.mongoRead("designer", {}, mongoOption)

        # bills
        mongoOption = { "selfMongo": mongopython }
        collection = "generalBill"
        whereQuery = {}
        whereQuery["$or"] = []
        for project in targetProjects:
            whereQuery["$or"].append({ "links.proid": project["proid"] })
        targetBills = await back.mongoRead(collection, whereQuery, mongoOption)

        def billFilter(targetBill):
            thisProject = listFind(targetProjects, lambda p: p["proid"] == targetBill["links"]["proid"])
            if thisProject["service"]["online"]:
                return targetBill["links"]["method"] == "online"
            else:
                return targetBill["links"]["method"] == "offline"
        targetBills = listFilter(targetBills, billFilter)

        resultList = await self.detailCalculate(targetProjects, targetClients, targetDesigners, targetBills)

        return resultList
    
    def convertListToMatrix(self, resultList: list):
        standardsMatrix = []
        matrix = []

        ( standards, columns ) = self.returnColumns()
        standardsMatrix.append(standards)
        matrix.append(columns)

        for obj in resultList:
            standardsTempArr = []
            tempArr = []

            standardsTempArr.append(obj["id"]["proid"])
            standardsTempArr.append(obj["info"]["name"])

            tempArr.append(obj["info"]["designer"])
            tempArr.append(obj["info"]["service"])
            tempArr.append(obj["info"]["status"])
            tempArr.append(obj["info"]["timeline"])
            tempArr.append(obj["info"]["contract"])

            tempArr.append(obj["fee"]["design"]["total"])
            tempArr.append(obj["fee"]["design"]["paid"])
            tempArr.append(obj["fee"]["design"]["expected"])
            tempArr.append(obj["fee"]["design"]["designer"])
            tempArr.append(obj["fee"]["design"]["send"])
            tempArr.append(obj["fee"]["design"]["yet"])
            tempArr.append(obj["fee"]["design"]["profit"])

            tempArr.append(obj["fee"]["construct"]["total"])
            tempArr.append(obj["fee"]["construct"]["paid"])
            tempArr.append(obj["fee"]["construct"]["expected"])
            tempArr.append(obj["fee"]["construct"]["designer"])
            tempArr.append(obj["fee"]["construct"]["send"])
            tempArr.append(obj["fee"]["construct"]["yet"])
            tempArr.append(obj["fee"]["construct"]["profit"])

            tempArr.append(obj["fee"]["etc"]["total"])
            tempArr.append(obj["fee"]["etc"]["paid"])
            tempArr.append(obj["fee"]["etc"]["expected"])
            tempArr.append(obj["fee"]["etc"]["designer"])
            tempArr.append(obj["fee"]["etc"]["send"])
            tempArr.append(obj["fee"]["etc"]["yet"])
            tempArr.append(obj["fee"]["etc"]["profit"])

            tempArr.append(obj["fee"]["total"]["total"])
            tempArr.append(obj["fee"]["total"]["paid"])
            tempArr.append(obj["fee"]["total"]["expected"])
            tempArr.append(obj["fee"]["total"]["designer"])
            tempArr.append(obj["fee"]["total"]["send"])
            tempArr.append(obj["fee"]["total"]["yet"])
            tempArr.append(obj["fee"]["total"]["profit"])

            tempArr.append(obj["id"]["proid"])
            tempArr.append(obj["id"]["cliid"])
            tempArr.append(obj["id"]["desid"])
            tempArr.append(obj["id"]["bilid"])

            tempArr.append(obj["info"]["name"])

            standardsMatrix.append(standardsTempArr)
            matrix.append(tempArr)

        return (standardsMatrix, matrix)

    async def calculateIOMatrix(self, fromDate, toDate = None) -> list:
        resultList = await self.calculateIOList(fromDate, toDate)
        return self.convertListToMatrix(resultList)

    async def searchIOList(self, inputWhereQuery: dict) -> list:
        back = self.back
        mongo = self.mongo
        mongopython = self.mongopython

        # projects
        mongoOption = { "selfMongo": mongo }
        collection = "project"
        targetProjects = await back.mongoRead(collection, inputWhereQuery, mongoOption)
        targetProjects = listFilter(targetProjects, lambda p: getDateValue(p["process"]["contract"]["first"]["date"]) > getDateValue(numbersToDate(2000, 0, 1)))

        # clients
        mongoOption = { "selfMongo": mongo }
        collection = "client"
        whereQuery = {}
        whereQuery["$or"] = []
        for project in targetProjects:
            whereQuery["$or"].append({ "cliid": project["cliid"] })
        targetClients = await back.mongoRead(collection, whereQuery, mongoOption)

        # designers
        targetDesigners = await back.mongoRead("designer", {}, mongoOption)

        # bills
        mongoOption = { "selfMongo": mongopython }
        collection = "generalBill"
        whereQuery = {}
        whereQuery["$or"] = []
        for project in targetProjects:
            whereQuery["$or"].append({ "links.proid": project["proid"] })
        targetBills = await back.mongoRead(collection, whereQuery, mongoOption)

        def billFilter(targetBill):
            thisProject = listFind(targetProjects, lambda p: p["proid"] == targetBill["links"]["proid"])
            if thisProject["service"]["online"]:
                return targetBill["links"]["method"] == "online"
            else:
                return targetBill["links"]["method"] == "offline"
        targetBills = listFilter(targetBills, billFilter)

        resultList = await self.detailCalculate(targetProjects, targetClients, targetDesigners, targetBills)

        return resultList
    
    async def searchIOMatrix(self, inputWhereQuery: dict) -> list:
        resultList = await self.searchIOList(inputWhereQuery)
        return self.convertListToMatrix(resultList)
