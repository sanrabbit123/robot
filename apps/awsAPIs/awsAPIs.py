from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio
import boto3
import email
import base64
from botocore.config import Config
import traceback

class AwsAPIs:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.members = returnMembers()
        self.region = "ap-northeast-2"
        self.sesRegion = "ap-northeast-1"
        self.emailRegion = "ap-northeast-1"
        self.emailBucket = "homeliaison-email"
        self.emailFolder = "hlemail"
        self.attachmentFolder = "attachment"
        self.password = "homeliaison"
        self.staticPath = processHome() + "/static"
        self.attachmentFolderPath = self.staticPath + f"/{self.emailFolder}/{self.attachmentFolder}"

    def slackToEmailAddress(self, slackId: str) -> str:
        members = self.members
        targetMember = listFind(members, lambda x: x["slack"]["id"] == slackId)
        if targetMember is None:
            raise Exception("invalid input")
        targetMemid = targetMember["id"]
        return self.findEmailAddress(targetMemid)

    def findEmailAddress(self, memid):
        members = self.members
        address = self.address
        targetMembers = listFilter(members, lambda x: listFilter(x["email"], lambda e: patternTest(address["officeinfo"]["numbers"]["host"], e)).__len__() > 0)
        
        def extractEmail(obj):
            result = {}
            result["memid"] = obj["id"]
            result["name"] = obj["name"]
            result["email"] = listFind(obj["email"], lambda e: patternTest(address["officeinfo"]["numbers"]["host"], e))
            return result
        targetMembers = listMap(targetMembers, extractEmail)

        if type(memid) is bool:
            return objectDeepCopy(targetMembers)
        elif type(memid) is str:
            findResult = listFind(targetMembers, lambda obj: obj["memid"] == memid)
            if findResult is not None:
                return findResult["email"]
            else:
                return None
        else:
            raise Exception("invalid input")

    def sendEmail(self, inputDict: dict):
        if type(inputDict) is not dict:
            raise Exception("invalid input 0")
        if "from" not in inputDict:
            raise Exception("invalid input 1")
        if "to" not in inputDict:
            raise Exception("invalid input 2")
        if "title" not in inputDict:
            raise Exception("invalid input 3")
        if "body" not in inputDict:
            raise Exception("invalid input 4")

        source = inputDict["from"]
        target = inputDict["to"]
        subject = inputDict["title"]
        body = inputDict["body"]

        config = Config(region_name=self.sesRegion)
        ses = boto3.client("ses", config=config)
        charset = "utf-8"

        response = ses.send_email(Source=source, Destination={ "ToAddresses": [ target ] }, ReplyToAddresses=[ source ], Message={
            "Subject": { "Data": subject, "Charset": charset },
            "Body": { "Text": { "Data": body, "Charset": charset }, "Html": { "Data": body, "Charset": charset } }
        })

        return response

    def emailIdMaker(self, thisDate, fromEmail: str, toEmail: str) -> str:
        idKeywords = "hlemail_"
        thisId = idKeywords + str(getDateValue(thisDate)) + "_" + patternReplace(patternReplace(fromEmail, r"@", "__split__"), r"\.", "__dot__") + "_" + patternReplace(patternReplace(toEmail, r"@", "__split__"), r"\.", "__dot__")
        return thisId

    async def parseEmail(self, emailKey: str, hexMode: bool = True, idMode = False):
        members = self.members
        bucketName = self.emailBucket
        keyName = emailKey
        password = self.password
        parentKey = self.emailFolder + "/" + self.attachmentFolder
        s3 = boto3.client("s3", region_name=self.emailRegion)
        attachmentFolderPath = self.attachmentFolderPath
        try:
            objectInfo = s3.get_object(Bucket=bucketName, Key=keyName)
            rawEmailBody = objectInfo["Body"].read()
            msg = email.message_from_bytes(rawEmailBody)

            # header parsing
            rawEmailList = rawEmailBody.decode("utf-8").split("\r\n")
            if listFind(rawEmailList, lambda x: patternTest(r"^From: ", x)) is None or listFind(rawEmailList, lambda x: patternTest(r"^Date: ", x)) is None or listFind(rawEmailList, lambda x: patternTest(r"^Subject: ", x)) is None or listFind(rawEmailList, lambda x: patternTest(r"^To: ", x)) is None:
                return None
            
            fromStartRawIndex = listFindIndex(rawEmailList, lambda x: patternTest(r"^From: ", x))
            fromRaw = rawEmailList[fromStartRawIndex]
            num = 1
            while len(rawEmailList) > fromStartRawIndex + num and (not patternTest(r"^[A-Z][^\:]+\: ", rawEmailList[fromStartRawIndex + num])):
                fromRaw += rawEmailList[fromStartRawIndex + num]
                num = num + 1

            dateStartRawIndex = listFindIndex(rawEmailList, lambda x: patternTest(r"^Date: ", x))
            dateRaw = rawEmailList[dateStartRawIndex]
            num = 1
            while len(rawEmailList) > dateStartRawIndex + num and (not patternTest(r"^[A-Z][^\:]+\: ", rawEmailList[dateStartRawIndex + num])):
                dateRaw += rawEmailList[dateStartRawIndex + num]
                num = num + 1

            subjectStartRawIndex = listFindIndex(rawEmailList, lambda x: patternTest(r"^Subject: ", x))
            subjectRaw = rawEmailList[subjectStartRawIndex]
            num = 1
            while len(rawEmailList) > subjectStartRawIndex + num and (not patternTest(r"^[A-Z][^\:]+\: ", rawEmailList[subjectStartRawIndex + num])):
                subjectRaw += rawEmailList[subjectStartRawIndex + num]
                num = num + 1

            toStartRawIndex = listFindIndex(rawEmailList, lambda x: patternTest(r"^To: ", x))
            toRaw = rawEmailList[toStartRawIndex]
            num = 1
            while len(rawEmailList) > toStartRawIndex + num and (not patternTest(r"^[A-Z][^\:]+\: ", rawEmailList[toStartRawIndex + num])):
                toRaw += rawEmailList[toStartRawIndex + num]
                num = num + 1

            fromRaw = fromRaw.split(": ")[1].strip()
            dateRaw = dateRaw.split(": ")[1].strip()
            subjectRaw = subjectRaw.split(": ")[1].strip()
            toRaw = toRaw.split(": ")[1].strip()

            if patternTest(r"\<", toRaw.strip()) and patternTest(r"\>", toRaw.strip()):
                toValue = patternExec(r"\<[^\>]+\>", toRaw.strip())[0].strip()
            else:
                toValue = patternReplace(patternReplace(toRaw.strip(), r"^\<", ""), r"\>$", "")
            toValue = patternReplace(patternReplace(toValue, r"^\<", ""), r"\>$", "")
            toRaw = toValue

            fromEmail = patternExec(r"\<[^\>]+\>", fromRaw)[0].strip()[1:-1]
            fromRaw = patternReplace(fromRaw, r"\<[^\>]+\>", "").strip()

            if patternTest(r"^[\"\']?\=\?", fromRaw) and patternTest(r"\?\=[\"\']?$", fromRaw):
                fromMiddleArr = list(objectDeepCopy(patternReplace(patternReplace(fromRaw, r"\n", " "), r"\t", " ").split(" ")))
                fromMiddleArr = listMap(fromMiddleArr, lambda x: x.strip())
                fromMiddleArr = listMap(fromMiddleArr, lambda x: patternReplace(patternReplace(patternReplace(x, r"^\t", ""), r"\r\n$", ""), r"\t$", ""))
                fromMiddleArr = listFilter(fromMiddleArr, lambda x: patternTest(r"^[\"\']?\=\?", x) and patternTest(r"\?\=[\"\']?$", x))
                fromMiddleArr = listMap(fromMiddleArr, lambda x: base64.b64decode(x.split("?")[3]).decode(x.split("?")[1]).strip())
                fromName = "".join(fromMiddleArr)
            else:
                fromName = fromRaw

            if patternTest(r"^[\"\']?\=\?", subjectRaw) and patternTest(r"\?\=[\"\']?$", subjectRaw):
                subjectMiddleArr = list(objectDeepCopy(patternReplace(patternReplace(subjectRaw, r"\n", " "), r"\t", " ").split(" ")))
                subjectMiddleArr = listMap(subjectMiddleArr, lambda x: x.strip())
                subjectMiddleArr = listMap(subjectMiddleArr, lambda x: patternReplace(patternReplace(patternReplace(x, r"^\t", ""), r"\r\n$", ""), r"\t$", ""))
                subjectMiddleArr = listFilter(subjectMiddleArr, lambda x: patternTest(r"^[\"\']?\=\?", x) and patternTest(r"\?\=[\"\']?$", x))
                subjectMiddleArr = listMap(subjectMiddleArr, lambda x: base64.b64decode(x.split("?")[3]).decode(x.split("?")[1]).strip())
                subjectName = "".join(subjectMiddleArr)
            else:
                subjectName = subjectRaw

            thisDate = stringToDate(dateToString(stringToDate(dateRaw), True))
            thisMember = listFind(members, lambda x: listIncludes(x["email"], lambda e: e == toRaw))

            thisId = self.emailIdMaker(thisDate, fromEmail, toRaw)
            if idMode:
                return thisId

            # body parsing
            emailArr = []
            bodyArr = []
            for part in msg.walk():
                if type(part.get_payload()) is not list:
                    contentType = part.get_content_type()
                    fileName = part.get_filename()
                    if contentType == "text/html":
                        try:
                            bodyArr.append(base64.b64decode(part.get_payload()).decode("utf-8").strip())
                        except Exception as e:
                            try:
                                bodyArr.append(base64.b64decode(part.get_payload()).decode("utf-16").strip())
                            except Exception as e:
                                bodyArr.append("")
                    elif contentType != "text/plain":
                        emailArr.append({ "contentType": contentType, "fileName": fileName, "binary": part.get_payload(decode=True) })
            rawHtml = "".join(bodyArr)

            # attachment parsing
            if len(emailArr) > 0:
                tempTargetFolderName = "tempEmailAttachment" + uniqueValue("hex")
                tempTargetFolder = processCwd() + "/temp/" + tempTargetFolderName
                await shellExec("mkdir", [ "-p", tempTargetFolder ])
                self.makeFolder(parentPath="/" + parentKey, folderName=tempTargetFolderName)
                for rawObject in emailArr:
                    thisFileName = rawObject["fileName"]
                    if patternTest(r"^[\"\']?\=\?", thisFileName):
                        thisFileNameArr = list(objectDeepCopy(patternReplace(patternReplace(rawObject["fileName"], r"\n", " "), r"\t", " ").split(" ")))
                        thisFileNameArr = listMap(thisFileNameArr, lambda x: x.strip())
                        thisFileNameArr = listMap(thisFileNameArr, lambda x: patternReplace(patternReplace(patternReplace(x, r"^\t", ""), r"\r\n$", ""), r"\t$", ""))
                        thisFileNameArr = listFilter(thisFileNameArr, lambda x: patternTest(r"^[\"\']?\=\?", x) and patternTest(r"\?\=[\"\']?$", x))
                        thisFileNameArr = listMap(thisFileNameArr, lambda x: base64.b64decode(x.split("?")[3]).decode(x.split("?")[1]).strip())
                        thisFileName = "".join(thisFileNameArr)
                    tempFileTarget = tempTargetFolder + "/" + thisFileName
                    await fileSystem("writeBinary", [ tempFileTarget, rawObject["binary"] ])
                await shellExec("mv", [ tempTargetFolder, attachmentFolderPath + "/" + tempTargetFolderName ])
                attachments = await fileSystem("readFolder", [ attachmentFolderPath + "/" + tempTargetFolderName ])
                attachments = listMap(attachments, lambda x: parentKey + "/" + tempTargetFolderName + "/" + x)

            else:
                attachments = []

            # result
            if hexMode:
                resultObj = {
                    "id": thisId,
                    "from": {
                        "name": fromName,
                        "email": fromEmail,
                    },
                    "to": toRaw,
                    "date": thisDate,
                    "title": subjectName,
                    "body": cryptoString(password, rawHtml),
                    "attachment": listMap(attachments, lambda p: cryptoString(password, p)),
                    "history": []
                }
                if thisMember is not None:
                    resultObj["member"] = thisMember["id"]
                else:
                    resultObj["member"] = ""
            else:
                resultObj = {
                    "id": thisId,
                    "from": {
                        "name": fromName,
                        "email": fromEmail,
                    },
                    "to": toRaw,
                    "date": thisDate,
                    "title": subjectName,
                    "body": rawHtml,
                    "attachment": attachments,
                    "history": []
                }
                if thisMember is not None:
                    resultObj["member"] = thisMember["id"]
                else:
                    resultObj["member"] = ""
            return resultObj

        except Exception as e:
            print(e)
            traceback.print_exc()
            return None

    def listObjects(self, targetBucket = None, path: str = "/") -> list:
        if targetBucket is None:
            targetBucket = self.emailBucket

        client = boto3.client("s3")
        response = client.get_bucket_location(Bucket=targetBucket)
        client = boto3.client("s3", region_name=response["LocationConstraint"])
        paginator = client.get_paginator("list_objects")

        resultList = []
        if path == "/":
            result = paginator.paginate(Bucket=targetBucket, Delimiter=path)
            for i in result:
                for j in i["CommonPrefixes"]:
                    resultList.append("/" + patternReplace(patternReplace(j["Prefix"], r"^\/", ""), r"\/$", ""))
        else:
            path = patternReplace(path, r"\/$", "")
            path = patternReplace(path, r"^\/", "")
            path = path + "/"

            response = client.list_objects_v2(Bucket=targetBucket, Prefix=path)
            for obj in response["Contents"]:
                if obj["Key"] != path:
                    resultList.append("/" + obj["Key"])

        return resultList

    def makeFolder(self, targetBucket = None, parentPath: str = "/", folderName: str = "") -> dict:
        if targetBucket is None:
            targetBucket = self.emailBucket

        client = boto3.client("s3")
        response = client.get_bucket_location(Bucket=targetBucket)
        client = boto3.client("s3", region_name=response["LocationConstraint"])

        if parentPath != "/":
            parentPath = patternReplace(parentPath, r"\/$", "")
            parentPath = patternReplace(parentPath, r"^\/", "")

        folderName = patternReplace(folderName, r"\/$", "")
        folderName = patternReplace(folderName, r"^\/", "")

        if folderName == "":
            raise Exception("invalid input")

        client.put_object(Bucket=targetBucket, Key=f"{parentPath}/{folderName}/")

        return { "message": "done" }

    def uploadFile(self, targetBucket = None, filePath: str = "/", parentPath: str = "/") -> dict:
        if targetBucket is None:
            targetBucket = self.emailBucket

        client = boto3.client("s3")
        response = client.get_bucket_location(Bucket=targetBucket)
        client = boto3.client("s3", region_name=response["LocationConstraint"])

        filePathArr = filePath.split("/")
        thisFileName = filePathArr[len(filePathArr) - 1]

        if parentPath != "/":
            parentPath = patternReplace(parentPath, r"\/$", "")
            parentPath = patternReplace(parentPath, r"^\/", "")
            parentPath = parentPath + "/"

        parentPath = parentPath + thisFileName

        thisContentType = getMimeTypes(filePath.split(".")[len(filePath.split(".")) - 1].strip())
        client.put_object(Body=filePath, Bucket=targetBucket, Key=parentPath, ContentType=thisContentType)

        return { "message": "done" }

    def downloadFile(self, targetBucket = None, filePath: str = "/", targetKey: str = "/") -> dict:
        if targetBucket is None:
            targetBucket = self.emailBucket

        client = boto3.client("s3")
        response = client.get_bucket_location(Bucket=targetBucket)
        client = boto3.client("s3", region_name=response["LocationConstraint"])

        client.download_file(targetBucket, targetKey, filePath)

        return { "message": "done" }

    def getFileLink(self, targetBucket = None, targetKey: str = "") -> dict:
        if targetBucket is None:
            targetBucket = self.emailBucket
        
        client = boto3.client("s3")
        response = client.get_bucket_location(Bucket=targetBucket)
        client = boto3.client("s3", region_name=response["LocationConstraint"])

        url = client.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": targetBucket,
                "Key": targetKey
            }
        )

        return { "link": url }





