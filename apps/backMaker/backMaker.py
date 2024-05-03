import asyncio
import motor
from apps.mother import processCwd, equalJson, jsonStringify, mongoConnection, objectDeepCopy, fileSystem, patternReplace, listMap, consoleLog, equalBackQuery
from apps.infoObj import returnAddress

class BackMaker:

    def __init__(self):
        self.address = returnAddress()
        self.dir = processCwd() + "/apps/backMaker"
        self.tempDir = processCwd() + "/temp"
        self.db = "miro81"
    
    async def mongoCreate(self, collection: str, json: dict, option: dict = {}):
        if type(collection) is not str:
            raise TypeError("collection must be string")
        if type(json) is not dict:
            raise TypeError("json must be dict")
        if type(option) is not dict:
            raise TypeError("option must be dict")
        
        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")
        
        db = connection[self.db]
        collectionObject = db[collection]
        await collectionObject.insert_one(equalJson(jsonStringify(json), backMode=True))
        return "success"

    async def mongoRead(self, collection: str, query: dict, option: dict = {}):
        if type(collection) is not str:
            raise TypeError("collection must be string")
        if type(query) is not dict:
            raise TypeError("query must be dict")
        if type(option) is not dict:
            raise TypeError("option must be dict")

        if "sort" in option:
            sortQuery = option["sort"]
        else: 
            sortQuery = {}
        sortQueryArr = []
        for key in sortQuery:
            if sortQuery[key] == -1:
                sortQueryArr.append((key, -1))
            else:
                sortQueryArr.append((key, 1))

        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")

        limitNumber = 0
        if "limit" in option:
            if type(option["limit"]) is int:
                limitNumber = option["limit"]

        db = connection[self.db]
        collectionObject = db[collection]

        query = equalBackQuery(jsonStringify(query))
        if len(sortQueryArr) > 0:
            if limitNumber == 0:
                result = collectionObject.find(query).sort(sortQueryArr[0][0], sortQueryArr[0][1])
            else:
                result = collectionObject.find(query).sort(sortQueryArr[0][0], sortQueryArr[0][1]).limit(limitNumber)
        else:
            if limitNumber == 0:
                result = collectionObject.find(query)
            else:
                result = collectionObject.find(query).limit(limitNumber)

        resultList = []
        async for item in result:
            resultList.append(equalJson(jsonStringify(item, backMode = True)))

        return resultList

    async def mongoPick(self, collection: str, queryArr: list, option: dict = {}):
        if type(collection) is not str:
            raise TypeError("collection must be string")
        if type(queryArr) is not list:
            raise TypeError("queryArr must be list")
        if type(option) is not dict:
            raise TypeError("option must be dict")
        if len(queryArr) != 2:
            raise TypeError("must be [ whereQuery, projectQuery ]")

        query = queryArr[0]
        projectQuery = queryArr[1]
        projectQuery["_id"] = 0

        if "sort" in option:
            sortQuery = option["sort"]
        else: 
            sortQuery = {}
        sortQueryArr = []
        for key in sortQuery:
            if sortQuery[key] == -1:
                sortQueryArr.append((key, -1))
            else:
                sortQueryArr.append((key, 1))

        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")

        limitNumber = 0
        if "limit" in option:
            if type(option["limit"]) is int:
                limitNumber = option["limit"]

        db = connection[self.db]
        collectionObject = db[collection]

        query = equalBackQuery(jsonStringify(query))
        if len(sortQueryArr) > 0:
            if limitNumber == 0:
                result = collectionObject.find(query, projectQuery).sort(sortQueryArr[0][0], sortQueryArr[0][1])
            else:
                result = collectionObject.find(query, projectQuery).sort(sortQueryArr[0][0], sortQueryArr[0][1]).limit(limitNumber)
        else:
            if limitNumber == 0:
                result = collectionObject.find(query, projectQuery)
            else:
                result = collectionObject.find(query, projectQuery).limit(limitNumber)

        resultList = []
        async for item in result:
            resultList.append(equalJson(jsonStringify(item, backMode = True)))

        return resultList

    async def mongoUpdate(self, collection: str, queryArr: list, option: dict = {}):
        if type(collection) is not str:
            raise TypeError("collection must be string")
        if type(queryArr) is not list:
            raise TypeError("queryArr must be list")
        if type(option) is not dict:
            raise TypeError("option must be dict")
        if len(queryArr) != 2:
            raise TypeError("must be [ whereQuery, updateQuery ]")
        
        unsetBoo = False
        if "unset" in option:
            if option["unset"] == True:
                unsetBoo = True
            else:
                unsetBoo = False
        else: 
            unsetBoo = False

        whereQuery = queryArr[0]
        updateQuery = queryArr[1]
        finalUpdateObj = {}
        if not unsetBoo:
            finalUpdateObj["$set"] = updateQuery
        else:
            finalUpdateObj["$unset"] = updateQuery

        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")
        
        db = connection[self.db]
        collectionObject = db[collection]

        await collectionObject.update_one(whereQuery, finalUpdateObj)

        return "success"

    async def mongoDelete(self, collection: str, query: dict, option: dict = {}):
        if type(collection) is not str:
            raise TypeError("collection must be string")
        if type(query) is not dict:
            raise TypeError("query must be dict")
        if type(option) is not dict:
            raise TypeError("option must be dict")

        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")
        
        db = connection[self.db]
        collectionObject = db[collection]
        await collectionObject.delete_one(query)
        return "success"

    async def mongoListCollections(self, option: dict = {}):
        if type(option) is not dict:
            raise TypeError("option must be dict")
        
        if "selfMongo" in option:
            connection = option["selfMongo"]
        else:
            raise Exception("self mongo must")
        
        db = connection[self.db]
        names = await db.list_collection_names()
        resultList = []
        for n in names:
            resultList.append(n)
        return resultList

    async def setInfoObj(self):
        coreConnection = mongoConnection("core")
        rows = await self.mongoRead("info", { "classification.id": 0 }, { "selfMongo": coreConnection, "sort": { "date": -1 } })
        targetInfoObj = objectDeepCopy(rows[0]["info"])
        rows = await self.mongoRead("info", { "classification.id": 1 }, { "selfMongo": coreConnection, "sort": { "date": -1 } })
        targetMemberObj = objectDeepCopy(rows[0]["info"])

        infoObjArr = patternReplace(patternReplace(patternReplace(jsonStringify(targetInfoObj, indent=2), r"null", "None"), r"true", "True"), r"false", "False").split("\n")
        infoObjArr[0] = "infoAddress = {"
        infoObjArr.append("return infoAddress")
        fianlInfoScript = "def returnAddress():" + "\n" + "\n".join(listMap(infoObjArr, lambda x: "    " + x))

        infoMemberArr = patternReplace(patternReplace(patternReplace(jsonStringify(targetMemberObj, indent=2), r"null", "None"), r"true", "True"), r"false", "False").split("\n")
        infoMemberArr[0] = "memberArray = ["
        infoMemberArr.append("return memberArray")
        fianlMembersScript = "def returnMembers():" + "\n" + "\n".join(listMap(infoMemberArr, lambda x: "    " + x))

        await fileSystem("writeString", [ processCwd() + "/apps/infoObj.py", fianlInfoScript ])
        await fileSystem("writeString", [ processCwd() + "/apps/memberObj.py", fianlMembersScript ])
