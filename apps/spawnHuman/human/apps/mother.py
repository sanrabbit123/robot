from apps.infoObj import returnAddress
import asyncio
import aiofiles
import aiohttp
import time
import datetime
import json
import copy
import re
import os
from requests_toolbelt import MultipartEncoder
from motor.motor_asyncio import AsyncIOMotorClient
import requests
from urllib.parse import urlencode, urlparse, quote, parse_qs
from dateutil.parser import parse as dateParse
import random
import math
import pprint

def mongoConnection(target: str = "core"):
    if type(target) is not str:
        raise TypeError("target must be string")
    address = returnAddress()
    url = "mongodb://"
    if target == "core" or target == "mongo":
        url += address["mongoinfo"]["user"] + ":" + address["mongoinfo"]["password"] + "@" + address["mongoinfo"]["host"] + ":" + str(address["mongoinfo"]["port"]) + "/admin"
    elif target == "back":
        url += address["backinfo"]["user"] + ":" + address["backinfo"]["password"] + "@" + address["backinfo"]["host"] + ":" + str(address["backinfo"]["port"]) + "/admin"
    elif target == "python" or target == "receipt":
        url += address["pythoninfo"]["user"] + ":" + address["pythoninfo"]["password"] + "@" + address["pythoninfo"]["host"] + ":" + str(address["pythoninfo"]["port"]) + "/admin"
    elif target == "test" or target == "log":
        url += address["testinfo"]["user"] + ":" + address["testinfo"]["password"] + "@" + address["testinfo"]["host"] + ":" + str(address["testinfo"]["port"]) + "/admin"
    elif target == "second":
        url += address["secondinfo"]["user"] + ":" + address["secondinfo"]["password"] + "@" + address["secondinfo"]["host"] + ":" + str(address["secondinfo"]["port"]) + "/admin"
    elif target == "trans":
        url += address["transinfo"]["user"] + ":" + address["transinfo"]["password"] + "@" + address["transinfo"]["host"] + ":" + str(address["transinfo"]["port"]) + "/admin"
    elif target == "contents":
        url += address["contentsinfo"]["user"] + ":" + address["contentsinfo"]["password"] + "@" + address["contentsinfo"]["host"] + ":" + str(address["contentsinfo"]["port"]) + "/admin"
    elif target == "construct":
        url += address["constructinfo"]["user"] + ":" + address["constructinfo"]["password"] + "@" + address["constructinfo"]["host"] + ":" + str(address["constructinfo"]["port"]) + "/admin"
    elif target == "office":
        url += address["officeinfo"]["user"] + ":" + address["officeinfo"]["password"] + "@" + address["officeinfo"]["ghost"]["host"] + ":" + str(address["officeinfo"]["port"]) + "/admin"
    elif target == "local":
        url += address["officeinfo"]["user"] + ":" + address["officeinfo"]["password"] + "@" + "127.0.0.1" + ":" + str(address["officeinfo"]["port"]) + "/admin"
    else:
        url += address["mongoinfo"]["user"] + ":" + address["mongoinfo"]["password"] + "@" + address["mongoinfo"]["host"] + ":" + str(address["mongoinfo"]["port"]) + "/admin"
    connection = AsyncIOMotorClient(url)
    return connection

def processCwd():
    return os.getcwd()

def consoleLog(something, indentNumber: int = 2):
    pp = pprint.PrettyPrinter(indent=indentNumber)
    pp.pprint(something)

def patternTest(pattern: str, targetString: str):
    if type(pattern) is not str:
        raise TypeError("pattern must be string")
    if type(targetString) is not str:
        raise TypeError("targetString must be string")
    compiledPattern = re.compile(pattern)
    result = compiledPattern.search(targetString)
    boo = not (result == None)
    return boo

def patternReplace(targetString: str, pattern: str, replaceString: str, sensitiveCase: bool = False):
    if type(targetString) is not str:
        raise TypeError("targetString must be string")
    if type(pattern) is not str:
        raise TypeError("pattern must be string")
    if type(replaceString) is not str:
        raise TypeError("replaceString must be string")
    if type(sensitiveCase) is not bool:
        sensitiveCase = False
    if not sensitiveCase:
        result = re.sub(pattern, replaceString, targetString, flags = re.IGNORECASE)
    else:
        result = re.sub(pattern, replaceString, targetString)
    return result

def zeroAddition(num: int):
    if type(num) is not int:
        raise TypeError("invalid input")
    if num < 10:
        return '0' + str(num)
    else:
        return str(num)

def shellLink(linkString: str):
    if type(linkString) is not str:
        raise TypeError("linkString must be string")
    linkStringArr = linkString.split("/")
    newLinkStringArr = []
    for factor in linkStringArr:
        if patternTest(r"[ \&\(\)\#\%\[\]\{\}\@\!\=\+\~\?\$]", factor):
            if patternTest(r"^[\'\"]", factor) and patternTest(r"[\'\"]$", factor):
                newLinkStringArr.append(factor)
            else:
                if patternTest("'", factor):
                    newLinkStringArr.append('"' + factor + '"')
                else:
                    newLinkStringArr.append("'" + factor + "'")
        else:
            newLinkStringArr.append(factor)
    newLinkString = "/".join(newLinkStringArr)
    return newLinkString

async def shellExec(mainCommand: str, commandArr: list):
    if type(mainCommand) is not str:
        raise TypeError("mainCommand must be string")
    if type(commandArr) is not list:
        raise TypeError("commandArr must be list")
    newCommandArr = []
    for factor in commandArr:
        if patternTest(r"\/", factor):
            newCommandArr.append(shellLink(factor))
        else:
            newCommandArr.append(factor)
    cmd = mainCommand + ' ' + ' '.join(newCommandArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        return stdout.decode()
    if stderr:
        return stderr.decode()

async def diskReading(mode: str = "check", arr: list = []):
    if type(mode) is not str:
        raise TypeError("mode must be string")
    if type(arr) is not list:
        raise TypeError("arr must be list")
    if mode != "check" and mode != "view":
        raise Exception("invalid mode")

    if mode == "check":
        commandResponse = await shellExec("df", [ "-Pk", "--", "/" ])
        commandResponseArr = list(map(lambda x: x.strip(), commandResponse.strip().split("\n")))
        commandResponseArrResult = list(filter(lambda x: x.strip() != '', commandResponseArr[1].split(" ")))

        total = int(commandResponseArrResult[1])
        available = int(commandResponseArrResult[2])
        used = total - available

        result = [ total, used, available ]

        return result
    else:
        if len(arr) != 3:
            raise Exception("invaild input => arr must be [ total, used, available ]")

        gigaByte = {}
        percentage = {}

        gigaByte["total"] = round((arr[0] / (1024 * 1024)) * 100) / 100
        gigaByte["used"] = round((arr[1] / (1024 * 1024)) * 100) / 100
        gigaByte["available"] = round((arr[2] / (1024 * 1024)) * 100) / 100

        percentage["total"] = 100
        percentage["used"] = round(((arr[1] / arr[0]) * 100) * 100) / 100
        percentage["available"] = 100 - percentage["used"]

        return { "gigaByte": gigaByte, "percentage": percentage }

async def aliveMongo():
    try:
        commandResponse = await shellExec("systemctl", [ "status", "mongod" ])
        commandArr = list(map(lambda x: x.strip(), commandResponse.split("\n")))
        targetArr = list(filter(lambda x: x != "", commandArr))
        target = ":"
        for s in targetArr:
            if patternTest(r"Active\:", s):
                target = s
        activeStatus = target.split(":")[1].strip()
        aliveStatus = patternTest(r"^active", activeStatus) and patternTest(r"running", activeStatus)
        return aliveStatus
    except Exception as e:
        return False

def dateToString(dateObject, detail: bool = False):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    if type(detail) is not bool:
        detail = False
    if not detail:
        return dateObject.strftime("%Y-%m-%d")
    else:
        return dateObject.strftime("%Y-%m-%d %H:%M:%S")

def stringToDate(dateString: str):
    if type(dateString) is not str:
        raise TypeError("dateString must be string")
    if patternTest("T", dateString) and patternTest("Z", dateString):
        if patternTest(r"^[0-9][0-9][0-9][0-9]", dateString):
            dateArr = dateString.split("T")
            fixedDateString = dateArr[0] + " " + dateArr[1][0:8]
            dateObject = dateParse(fixedDateString)
            finalDateObject = setRelativeDate(dateObject, 9, "hour")
            return finalDateObject
        else:
            return dateParse(dateString)
    else:
        return dateParse(dateString)

def numberToDate(year: int, month: int, date: int, hour: int = 0, minute: int = 0, second: int = 0):
    if type(year) is not int:
        raise TypeError("invalid input - year")
    if type(month) is not int:
        raise TypeError("invalid input - month")
    if type(date) is not int:
        raise TypeError("invalid input - date")
    if type(hour) is not int:
        hour = 0
    if type(minute) is not int:
        minute = 0
    if type(second) is not int:
        second = 0
    if year < 1000:
        raise TypeError("invalid input - year")
    if month < 0 or month > 11:
        raise TypeError("invalid input - month")
    if date < 1 or date > 31:
        raise TypeError("invalid input - date")
    if hour < 0 or hour > 24:
        hour = 0
    if minute < 0 or minute > 60:
        minute = 0
    if second < 0 or second > 60:
        second = 0

    dateString = str(year) + "-" + zeroAddition(month + 1) + "-" + zeroAddition(date)
    dateString += " "
    dateString += zeroAddition(hour)
    dateString += ":"
    dateString += zeroAddition(minute)
    dateString += ":"
    dateString += zeroAddition(second)

    return dateParse(dateString)

def numbersToDate(year: int, month: int, date: int, hour: int = 0, minute: int = 0, second: int = 0):
    return numberToDate(year, month, date, hour, minute, second)

def getNowDate():
    return datetime.datetime.now()

def getDateValue(dateObject):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    return ((int)(dateObject.timestamp())) * 1000

def setRelativeDate(dateObject, num: int, mode: str = "date"):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    if type(num) is not int:
        raise TypeError("invalid input")
    if type(mode) is not str:
        mode = "date"

    if mode == "date":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000 * 60 * 60 * 24))) / 1000
        newDateObject = datetime.datetime.fromtimestamp(stamp)
        return newDateObject
    elif mode == "hour":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000 * 60 * 60))) / 1000
        newDateObject = datetime.datetime.fromtimestamp(stamp)
        return newDateObject
    elif mode == "minute":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000 * 60))) / 1000
        newDateObject = datetime.datetime.fromtimestamp(stamp)
        return newDateObject
    elif mode == "second":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000))) / 1000
        newDateObject = datetime.datetime.fromtimestamp(stamp)
        return newDateObject
    elif mode == "month":
        thisMonth = dateObject.month
        targetMonthNumber = thisMonth + num
        yearNumber = targetMonthNumber // 12
        monthNumber = targetMonthNumber % 12
        if monthNumber == 0:
            monthNumber = 12
            yearNumber = yearNumber - 1
        middleDateObject = dateObject.replace(year=(dateObject.year + yearNumber))
        finalDateObject = middleDateObject.replace(month=monthNumber)
        return finalDateObject
    elif mode == "year":
        newDateObject = dateObject.replace(year=(dateObject.year + num))
        return newDateObject
    else:
        raise TypeError("invalid mode")

def toIsoFormatDate(dateObject, backMode: bool = False):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    stamp = getDateValue(dateObject) / 1000
    if not backMode:
        newDateObject = datetime.datetime.fromtimestamp(stamp)
        newDateObject = setRelativeDate(newDateObject, -9, "hour")
    else:
        newDateObject = datetime.datetime.fromtimestamp(stamp)
    return newDateObject.isoformat(timespec="microseconds")[0:19] + ".000Z"

def fromIsoFormatDate(dateString: str, backMode: bool = False):
    if type(dateString) is not str:
        raise TypeError("dateString must be string")
    if patternTest("T", dateString) and patternTest("Z", dateString):
        if patternTest(r"^[0-9][0-9][0-9][0-9]", dateString):
            dateArr = dateString.split("T")
            fixedDateString = dateArr[0] + " " + dateArr[1][0:8]
            dateObject = dateParse(fixedDateString)
            if not backMode:
                finalDateObject = setRelativeDate(dateObject, 9, "hour")
            else:
                finalDateObject = dateObject
            return finalDateObject
        else:
            return False
    else:
        return False

def isIsoFormatDate(dateString: str):
    if type(dateString) is not str:
        raise TypeError("dateString must be string")
    return patternTest(r"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z", dateString)

def objectDeepCopy(obj):
    if type(obj) is dict or type(obj) is list:
        return copy.deepcopy(obj)
    else:
        raise TypeError("invalid input")

def isJson(targetJson):
    if not type(targetJson) is str:
        return False
    try:
        json_object = json.loads(targetJson)
    except ValueError as e:
        return False
    if patternTest(r"^\[", targetJson.strip()) or patternTest(r"^\{", targetJson.strip()):
        return True
    else:
        return False

def jsonStringify(obj, toString: bool = True, backMode: bool = False, indent: int = 0):
    if type(obj) is not dict and type(obj) is not list:
        print(obj)
        raise TypeError("invalid input")
    copied = objectDeepCopy(obj)
    result = None
    if type(obj) is dict:
        newDict = {}
        for key in copied:
            if type(copied[key]) is dict or type(copied[key]) is list:
                newDict[key] = jsonStringify(copied[key], False, backMode)
            elif isinstance(copied[key], datetime.datetime):
                newDict[key] = toIsoFormatDate(copied[key], backMode)
            else:
                newDict[key] = copied[key]
        result = newDict
    else:
        newList = []
        for factor in copied:
            if type(factor) is dict or type(factor) is list:
                newList.append(jsonStringify(factor, False, backMode))
            elif isinstance(factor, datetime.datetime):
                newList.append(toIsoFormatDate(factor, backMode))
            else:
                newList.append(factor)
        result = newList
    if toString:
        try:
            if indent == 0:
                return json.dumps(result, ensure_ascii=False)
            else:
                return json.dumps(result, indent=indent, ensure_ascii=False)
        except:
            if indent == 0:
                return json.dumps(result, default=str, ensure_ascii=False)
            else:
                return json.dumps(result, default=str, indent=indent, ensure_ascii=False)
    else:
        return result

def jsonParse(input: str):
    if type(input) is not str:
        raise TypeError("input must be string")
    return json.loads(input)

def equalJson(input, backMode: bool = False):
    if type(input) is dict or type(input) is list:
        target = jsonStringify(input)
    elif type(input) is str:
        target = input
    if isJson(target):
        middleObject = json.loads(target)
        result = None
        if type(middleObject) is dict:
            newDict = {}
            for key in middleObject:
                if type(middleObject[key]) is dict or type(middleObject[key]) is list:
                    newDict[key] = equalJson(middleObject[key], backMode)
                elif type(middleObject[key]) is str and isIsoFormatDate(middleObject[key]):
                    newDict[key] = fromIsoFormatDate(middleObject[key], backMode)
                else:
                    newDict[key] = middleObject[key]
            result = newDict
        else:
            newList = []
            for factor in middleObject:
                if type(factor) is dict or type(factor) is list:
                    newList.append(equalJson(factor, backMode))
                elif type(factor) is str and isIsoFormatDate(factor):
                    newList.append(fromIsoFormatDate(factor, backMode))
                else:
                    newList.append(factor)
            result = newList
        return result
    else:
        queryArr = target.split("&")
        queryDictionary = {}
        for keyValue in queryArr:
            key = keyValue.split("=")[0]
            value = keyValue.split("=")[1]
            if isJson(value):
                if jsonParse(value) is None:
                    queryDictionary[key] = None
                else:
                    queryDictionary[key] = equalJson(value, backMode)
            else:
                queryDictionary[key] = value
        newTarget = jsonStringify(queryDictionary)
        return equalJson(newTarget, backMode)

async def fileSystem(command: str, detail: list):
    if type(command) is not str:
        raise TypeError("command must be string")
    if type(detail) is not list:
        raise TypeError("detail must be list")
    if command == "read" or command == "readString":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        contents = ""
        async with aiofiles.open(detail[0], mode="rt", encoding="utf-8") as f:
            contents = await f.read()
        return contents
    elif command == "readJson":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        contents = ""
        async with aiofiles.open(detail[0], mode="rt", encoding="utf-8") as f:
            contents = await f.read()
        return equalJson(contents)
    elif command == "readBinary":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        contents = ""
        async with aiofiles.open(detail[0], mode="rb") as f:
            contents = await f.read()
        return contents
    elif command == "readDir" or command == "readFolder":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        original = os.listdir(detail[0])
        resultList = []
        for factor in original:
            if factor != ".DS_Store":
                resultList.append(factor)
        return resultList
    elif command == "write" or command == "writeString":
        if len(detail) != 2:
            raise Exception("invalid detail command length")
        async with aiofiles.open(detail[0], mode="wt", encoding="utf-8") as out:
            await out.write(detail[1])
            await out.flush()
        return "success"
    elif command == "writeJson":
        if len(detail) != 2:
            raise Exception("invalid detail command length")
        async with aiofiles.open(detail[0], mode="wt", encoding="utf-8") as out:
            await out.write(jsonStringify(detail[1], indent=2))
            await out.flush()
        return "success"
    elif command == "writeBinary":
        if len(detail) != 2:
            raise Exception("invalid detail command length")
        async with aiofiles.open(detail[0], mode="wb") as out:
            await out.write(detail[1])
            await out.flush()
        return "success"
    elif command == "mkdir":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        await shellExec("mkdir", [ detail[0] ])
        return detail[0]
    elif command == "exist":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        return os.path.exists(detail[0])
    elif command == "isDir":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        if os.path.exists(detail[0]):
            return os.path.isdir(detail[0])
    elif command == "remove":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        await shellExec("rm", [ "-rf", detail[0] ])
        return detail[0]
    elif command == "open":
        if len(detail) != 1:
            raise Exception("invalid detail command length")
        await shellExec("open", [ detail[0] ])
        return detail[0]
    else:
        raise Exception("invalid command")

async def requestSystem(url: str, data: dict = {}, config: dict = {}):
    if type(url) is not str:
        raise TypeError("url must be string")
    if type(data) is not dict:
        raise TypeError("data must be string")
    if type(config) is not dict:
        raise TypeError("config must be string")
    
    method = "post"
    if "method" in config:
        if config["method"] == "get":
            method = "get"
        else:
            if len(data) == 0:
                method = "get"
            else:
                method = "post"
    else:
        if len(data) == 0:
            method = "get"
        else:
            method = "post"

    headers = {}
    if "headers" in config:
        if len(config["headers"]) > 0:
            headers = objectDeepCopy(config["headers"])
        else:
            headers = {}
    else:
        headers = {}

    postType = "form"
    if "headers" in config:
        if type(config["headers"]) is dict and "Content-Type" in config["headers"]:
            typeRawString = config["headers"]["Content-Type"]
            if patternTest(r"json", typeRawString):
                postType = "json"
            elif patternTest(r"www", typeRawString):
                postType = "nvp"
            else:
                postType = "form"
        else:
            postType = "form"
    else:
        postType = "form"

    if method == "get":
        if (len(headers) > 0):
            async with aiohttp.ClientSession(headers=headers) as session:
                if len(data) == 0:
                    async with session.get(url) as response:
                        body = await response.text()
                        if not isJson(body):
                            return body
                        else:
                            return equalJson(body)
                else:
                    params = {}
                    for key in data:
                        if type(data[key]) == str or type(data[key]) == int or type(data[key]) == float:
                            params[key] = data[key]
                        elif type(data[key]) == dict or type(data[key]) == list:
                            params[key] = jsonStringify(data[key])
                        else:
                            params[key] = str(data[key])
                    async with session.get(url, params=params) as response:
                        body = await response.text()
                        if not isJson(body):
                            return body
                        else:
                            return equalJson(body)
        else:
            async with aiohttp.ClientSession() as session:
                if len(data) == 0:
                    async with session.get(url) as response:
                        body = await response.text()
                        if not isJson(body):
                            return body
                        else:
                            return equalJson(body)
                else:
                    params = {}
                    for key in data:
                        if type(data[key]) == str or type(data[key]) == int or type(data[key]) == float:
                            params[key] = data[key]
                        elif type(data[key]) == dict or type(data[key]) == list:
                            params[key] = jsonStringify(data[key])
                        else:
                            params[key] = str(data[key])
                    async with session.get(url, params=params) as response:
                        body = await response.text()
                        if not isJson(body):
                            return body
                        else:
                            return equalJson(body)                 
    elif method == "post":
        if postType == "form":
            postData = {}
            for key in data:
                value = data[key]
                if type(data[key]) is dict or type(data[key]) is list or type(data[key]) is tuple:
                    if type(data[key]) is tuple:
                        data[key] = list(data[key])
                    if type(data[key]) is dict:
                        if len(value) == 3 and "path" in data[key] and "fileName" in data[key] and "contentType" in data[key]:
                            fileBinary = await fileSystem("readBinary", [ value["path"] ])
                            postData[key] = (value["fileName"], fileBinary, value["contentType"])
                        else:
                            postData[key] = jsonStringify(value)
                    else:
                        postData[key] = jsonStringify(value)
                elif type(data[key]) is str or type(data[key]) is bool or type(data[key]) is int or type(data[key]) is float or type(data[key]) is complex:
                    postData[key] = value
                elif data[key] is None:
                    postData[key] = value
                else:
                    postData[key] = value
            form = MultipartEncoder(fields=postData)
            headers["Content-Type"] = form.content_type
            response = requests.post(url, headers=headers, data=form)
            body = response.text
            if not isJson(body):
                return body
            else:
                return equalJson(body)
        elif postType == "json":
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.post(url, data=jsonStringify(data)) as response:
                    body = await response.text()
                    if not isJson(body):
                        return body
                    else:
                        return equalJson(body)
        else:
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.post(url, data=urlencode(data)) as response:
                    body = await response.text()
                    if not isJson(body):
                        return body
                    else:
                        return equalJson(body)

async def ajaxJson(data: dict, url: str):
    if type(url) is not str:
        raise TypeError("url must be string")
    if type(data) is not dict:
        raise TypeError("data must be string")
    response = await requestSystem(url, data, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    return response

async def errorLog(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/messageLog"
    collection = "errorLog"
    channel = "#error_log"
    response = await requestSystem(recordUrl, { "text": text, "channel": channel, "collection": collection }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def aliveLog(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/messageLog"
    collection = "errorLog"
    channel = "#alive_log"
    response = await requestSystem(recordUrl, { "text": text, "channel": channel, "collection": collection }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def cronLog(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/messageLog"
    collection = "errorLog"
    channel = "#cron_log"
    response = await requestSystem(recordUrl, { "text": text, "channel": channel, "collection": collection }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def alertLog(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/messageLog"
    collection = "errorLog"
    channel = "#alert_log"
    response = await requestSystem(recordUrl, { "text": text, "channel": channel, "collection": collection }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def emergencyAlarm(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/emergencyAlarm"
    response = await requestSystem(recordUrl, { "text": text }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def messageSend(obj: dict):
    if type(obj) is not dict:
        raise TypeError("obj must be dictionary")
    address = returnAddress()
    recordUrl = "https://" + address["secondinfo"]["host"] + ":3000/messageLog"
    voice = False
    if "voice" in obj and obj["voice"] == True:
        voice = True
    else:
        voice = False
    target = None
    if "target" in obj and type(obj["target"]) is list:
        target = obj["target"]
    else:
        target = None
    response = await requestSystem(recordUrl, { "text": obj["text"], "channel": obj["channel"], "collection": "errorLog", "voice": voice, "target": target, "fairy": False }, {
        "headers": {
            "Content-Type": "application/json"
        }
    })
    if "message" in response and patternTest(r"do", response["message"]):
        return True
    else:
        return False

async def sleep(number: int):
    if type(number) is not int:
        raise TypeError("number must be int")
    await asyncio.sleep(number / 1000)

def uniqueValue(mode: str = "number"):
    if type(mode) is not str:
        raise TypeError("mode must be string")
    if mode == "number":
        randomNumber = str(getDateValue(getNowDate()))
        randomNumber += str(round(random.random() * 10000))
        return int(randomNumber)
    elif mode == "string":
        randomNumber = str(getDateValue(getNowDate()))
        randomNumber += str(round(random.random() * 10000))
        return str(randomNumber)
    elif mode == "hex":
        x = 16
        length = 11
        uniqueNumber = getDateValue(getNowDate())
        uniqueNumber_copied = uniqueNumber
        hexChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ]
        randomKeyWords = [ 'A', 'B', 'C', 'D', 'E', 'F' ]
        maxExponent = 0
        while x ** maxExponent <= uniqueNumber:
            maxExponent = maxExponent + 1
        cArr = []
        for i in range(maxExponent):
            tempNumber = x ** i
            temp = (uniqueNumber_copied / tempNumber) % x
            cArr.append(int(temp))
            uniqueNumber_copied = uniqueNumber_copied - (temp * (x ** i))
        hexString = ""
        for index in cArr:
            hexString += hexChars[index]
        for i in range(length):
            hexString += hexChars[math.floor(len(hexChars) * random.random())]
        finalString = ""
        finalString += randomKeyWords[math.floor(len(randomKeyWords) * random.random())]
        finalString += randomKeyWords[math.floor(len(randomKeyWords) * random.random())]
        finalString += hexChars[math.floor(len(hexChars) * random.random())]
        finalString += randomKeyWords[math.floor(len(randomKeyWords) * random.random())]
        finalString += str(uniqueNumber)
        finalString += 'A'
        finalString += hexString
        return finalString

def stringToLink(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    def nameToToken(name: str):
        return f"_____{name}_____"
    tokens = {
        "equal": nameToToken("equal"),
        "amp": nameToToken("amp"),
        "question": nameToToken("question"),
        "hypen": nameToToken("hypen"),
        "slash": nameToToken("slash"),
        "colon": nameToToken("colon"),
        "back": nameToToken("back"),
        "sharp": nameToToken("sharp"),
        "plus": nameToToken("plus"),
        "percent": nameToToken("percent"),
        "dot": nameToToken("dot"),
        "wave": nameToToken("wave"),
        "hat": nameToToken("hat"),
    }

    filteredLink = text
    filteredLink = re.sub(tokens["equal"], "=", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["amp"], "&", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["question"], "?", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["hypen"], "-", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["slash"], "/", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["colon"], ":", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["back"], r"\\", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["sharp"], "#", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["plus"], "+", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["percent"], "%", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["dot"], ".", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["wave"], "~", filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(tokens["hat"], "^", filteredLink, flags = re.IGNORECASE)

    return filteredLink

def linktoString(text: str):
    if type(text) is not str:
        raise TypeError("text must be string")
    def nameToToken(name: str):
        return f"_____{name}_____"
    tokens = {
        "equal": nameToToken("equal"),
        "amp": nameToToken("amp"),
        "question": nameToToken("question"),
        "hypen": nameToToken("hypen"),
        "slash": nameToToken("slash"),
        "colon": nameToToken("colon"),
        "back": nameToToken("back"),
        "sharp": nameToToken("sharp"),
        "plus": nameToToken("plus"),
        "percent": nameToToken("percent"),
        "dot": nameToToken("dot"),
        "wave": nameToToken("wave"),
        "hat": nameToToken("hat"),
    }

    urlParsedObject = urlparse(text)

    protocol = urlParsedObject.scheme
    host = urlParsedObject.netloc
    
    path = urlParsedObject.path
    pathArr = path.split("/")
    newPathArr = []
    for i in pathArr:
        newPathArr.append(quote(i))
    path = "/".join(newPathArr)

    queryArr = urlParsedObject.query.split("&")
    queryDictionary = {}
    for keyValue in queryArr:
        key = keyValue.split("=")[0]
        value = keyValue.split("=")[1]
        queryDictionary[key] = value
    search = urlencode(queryDictionary)

    filteredLink = protocol + "://" + host + path + "?" + search
    filteredLink = re.sub(r"[\=]", tokens["equal"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\&]", tokens["amp"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\?]", tokens["question"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\-]", tokens["hypen"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\/]", tokens["slash"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\:]", tokens["colon"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\\]", tokens["back"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\#]", tokens["sharp"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\+]", tokens["plus"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\%]", tokens["percent"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\.]", tokens["dot"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\~]", tokens["wave"], filteredLink, flags = re.IGNORECASE)
    filteredLink = re.sub(r"[\^]", tokens["hat"], filteredLink, flags = re.IGNORECASE)

    return filteredLink

def variableArray(length: int, callback = None):
    if type(length) is not int:
        raise TypeError("length must be int")
    if patternTest("function", str(type(callback))):
        resultArr = []
        for i in range(length):
            resultArr.append(callback(i))
        return resultArr
    else:
        return list(range(length))

def autoComma(number: int):
    if type(number) is not int:
        raise TypeError("number must be int")
    string = str(number)
    if patternTest(r"^\-", string):
        minus = '-'
        string = string[1:]
    else:
        minus = ''
    count = math.ceil(len(string) / 3)
    countArr = []
    for i in range(count):
        countArr.append([ 3 * i, 3 * (i + 1) ])
    if len(countArr) == 0:
        raise Exception("invalid number")
    tempArr = []
    for arr in countArr:
        temp = ''
        for i in range(arr[1] - arr[0]):
            thisNumber = i + arr[0]
            if len(string) - 1 - thisNumber < 0:
                temp += ""
            else:
                temp = string[len(string) - 1 - thisNumber] + temp
        if temp != "":
            tempArr.insert(0, temp)
    return minus + ','.join(tempArr)

def autoHypenPhone(phone: str):
    if type(phone) is not str:
        raise TypeError("phone must be string")
    targetString = phone.strip()
    temp = ''
    if len(targetString) < 4:
        return targetString
    elif len(targetString) < 7:
        return targetString[0:3] + '-' + targetString[3:]
    elif len(targetString) < 7:
        return targetString[0:3] + '-' + targetString[3:6] + '-' + targetString[6:]
    else:
        return targetString[0:3] + '-' + targetString[3:7] + '-' + targetString[7:]

