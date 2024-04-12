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
import sys
import base64
from requests_toolbelt import MultipartEncoder
from requests_toolbelt.multipart import decoder
from motor.motor_asyncio import AsyncIOMotorClient
import requests
from urllib.parse import urlencode, urlparse, quote, parse_qs
from dateutil.parser import parse as dateParse
from apscheduler.schedulers.background import BackgroundScheduler
import random
import math
import pprint
import platform
import socket
import psutil
import shutil
from pathlib import Path
from functools import reduce
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import binascii

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
    elif target == "numbers":
        url += address["numbersinfo"]["user"] + ":" + address["numbersinfo"]["password"] + "@" + address["numbersinfo"]["host"] + ":" + str(address["numbersinfo"]["port"]) + "/admin"
    elif target == "office":
        url += address["officeinfo"]["user"] + ":" + address["officeinfo"]["password"] + "@" + address["officeinfo"]["ghost"]["host"] + ":" + str(address["officeinfo"]["port"]) + "/admin"
    elif target == "local":
        url += address["officeinfo"]["user"] + ":" + address["officeinfo"]["password"] + "@" + "127.0.0.1" + ":" + str(address["officeinfo"]["port"]) + "/admin"
    else:
        url += address["mongoinfo"]["user"] + ":" + address["mongoinfo"]["password"] + "@" + address["mongoinfo"]["host"] + ":" + str(address["mongoinfo"]["port"]) + "/admin"
    connection = AsyncIOMotorClient(url)
    return connection

def generalHeaders():
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
      "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me",
    }

def generalPort():
    return { "host": "0.0.0.0", "bind": "0.0.0.0:8000", "bindDev": "0.0.0.0:8001", "port": 8000, "portDev": 8001 }

def processCwd():
    return os.getcwd()

def processHome():
    return str(Path.home())

def consoleQ(question: str):
    print(question)
    temp = sys.stdin.readline()
    return temp.strip()

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

def patternExec(pattern: str, targetString: str):
    if type(pattern) is not str:
        raise TypeError("pattern must be string")
    if type(targetString) is not str:
        raise TypeError("targetString must be string")
    resultList = re.findall(pattern, targetString)
    return resultList

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

def listMap(target: list, lambFunc):
    if type(target) is not list:
        raise TypeError("target must be list")
    return list(map(lambFunc, target))

def listFilter(target: list, lambFunc):
    if type(target) is not list:
        raise TypeError("target must be list")
    return list(filter(lambFunc, target))

def listFlatten(target: list):
    if type(target) is not list:
        raise TypeError("target must be list")
    result = []
    for item in target:
        result.extend(item)
    return result

def listFind(target: list, lambFunc):
    if type(target) is not list:
        raise TypeError("target must be list")
    filteredList = listFilter(target, lambFunc)
    if filteredList.__len__() > 0:
        return filteredList[0]
    else:
        return None

def listFindIndex(target: list, lambFunc) -> int:
    if type(target) is not list:
        raise TypeError("target must be list")
    targetItem = listFind(target, lambFunc)
    if targetItem is None:
        num = -1
    else:
        num = 0
        for i in range(len(target)):
            if target[i] == targetItem:
                num = i
                break
    return num

def listIncludes(target: list, lambFunc):
    if type(target) is not list:
        raise TypeError("target must be list")
    filteredList = listFilter(target, lambFunc)
    if filteredList.__len__() > 0:
        return True
    else:
        return False

def listSort(target: list, lambFunc, reverse: bool = False):
    if type(target) is not list:
        raise TypeError("target must be list")
    return sorted(target, key=lambFunc, reverse=reverse)

def listReduce(target: list, lambFunc, init = 0):
    if type(target) is not list:
        raise TypeError("target must be list")
    return reduce(lambFunc, target, init)

def getSystemInfo():
    def filterFunc(x):
        boo = False
        for item in x:
            if patternTest(r"^(192|172|10)", item.address):
                boo = True
                break
        return boo

    networkTargets = listFlatten(listFilter(list(psutil.net_if_addrs().values()), filterFunc))
    ipTarget = listFind(networkTargets, lambda x: patternTest(r"^(192|172|10)", x.address)).address
    macTarget = listFind(networkTargets, lambda x: patternTest(r"[a-zA-Z0-9][a-zA-Z0-9][\:\-][a-zA-Z0-9][a-zA-Z0-9][\:\-][a-zA-Z0-9][a-zA-Z0-9][\:\-][a-zA-Z0-9][a-zA-Z0-9][\:\-][a-zA-Z0-9][a-zA-Z0-9][\:\-][a-zA-Z0-9][a-zA-Z0-9]", x.address)).address
    if patternTest(r"\-", macTarget):
        macTarget = patternReplace(macTarget, r"\-", ":")

    info = {}

    info["platform"] = {}
    info["platform"]["detail"] = platform.platform()
    info["platform"]["architecture"] = platform.machine()
    info["platform"]["system"] = platform.system()
    info["platform"]["release"] = platform.release()
    info["platform"]["version"] = platform.version()

    info["network"] = {}
    info["network"]["hostname"] = socket.gethostname()
    info["network"]["ip"] = ipTarget
    info["network"]["mac"] = macTarget

    info["hardware"] = {}
    info["hardware"]["cpu"] = psutil.cpu_count()
    info["hardware"]["ram"] = str(round(psutil.virtual_memory().total / (1024.0 ** 3))) + "GB"
    info["hardware"]["disk"] =str(round(psutil.disk_usage("/").total / (1024.0 ** 3))) + "GB"

    return info

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

async def shellExec(mainCommand: str, commandArr = None):
    if type(mainCommand) is not str:
        raise TypeError("mainCommand must be string")
    if type(commandArr) is list:
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
    else:
        proc = await asyncio.create_subprocess_shell(mainCommand, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
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

def dateToString(dateObject, detail: bool = False):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    if type(detail) is not bool:
        detail = False
    if not detail:
        return dateObject.strftime("%Y-%m-%d")
    else:
        return dateObject.strftime("%Y-%m-%d %H:%M:%S")

def dateToHangul(dateObject, shortYear: bool = False):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    middle = dateObject.strftime("%Y-%m-%d")
    middleArr = middle.split("-")
    finalString = middleArr[0] + "년 " + middleArr[1] + "월 " + middleArr[2] + "일"
    if shortYear:
        return finalString[2:]
    else:
        return finalString

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
        if dateString.strip() == '' or dateString.strip() == '-' or patternTest(r"없음", dateString):
            return numberToDate(1800, 0, 1)
        elif dateString.strip() == "예정" or dateString.strip() == "진행중" or dateString.strip() == "미정":
            return numberToDate(3800, 0, 1)
        elif patternTest(r"^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] [0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]$", dateString):
            tempArr = dateString.split(' ')
            tempArr2 = tempArr[0].split('-')
            tempArr3 = tempArr[1].split(':')
            return numberToDate(int(tempArr2[0]), int(tempArr2[1]) - 1, int(tempArr2[2]), int(tempArr3[0]), int(tempArr3[1]), int(tempArr3[2]))
        elif patternTest(r"^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$", dateString):
            tempArr = dateString.split('-')
            return numberToDate(int(tempArr[0]), int(tempArr[1]) - 1, int(tempArr[2]))
        elif patternTest(r"^[0-9][0-9][년] ?[0-9]", dateString):
            tempArr = dateString.split("년")
            year = int(patternReplace(tempArr[0], r"[^0-9]", "")) + 2000
            if patternTest(r"월", dateString):
                tempArr4 = tempArr[1].strip().split("월")
                if patternTest(r"일", dateString):
                    return numberToDate(year, int(patternReplace(tempArr4[0], r"[^0-9]", "")) - 1, int(patternReplace(tempArr4[1], r"[^0-9]", "")))
                else:
                    return numberToDate(year, int(patternReplace(tempArr4[0], r"[^0-9]", "")) - 1, 1)
            else:
                return numberToDate(year, int(patternReplace(tempArr[1], r"[^0-9]", "")) - 1, 1)
        elif patternTest(r"[0-9][0-9][0-9][0-9][년] ?[0-9]", dateString):
            tempArr = dateString.split("년")
            year = int(patternReplace(tempArr[0], r"[^0-9]", ""))
            if patternTest(r"월", dateString):
                tempArr4 = tempArr[1].strip().split("월")
                if patternTest(r"일", dateString):
                    return numberToDate(year, int(patternReplace(tempArr4[0], r"[^0-9]", "")) - 1, int(patternReplace(tempArr4[1], r"[^0-9]", "")))
                else:
                    return numberToDate(year, int(patternReplace(tempArr4[0], r"[^0-9]", "")) - 1, 1)
            else:
                return numberToDate(year, int(patternReplace(tempArr[1], r"[^0-9]", "")) - 1, 1)
        elif patternTest(r"^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$", dateString):
            return numberToDate(int(dateString[0:4]), int(dateString[4:6]) - 1, int(dateString[6:]))
        elif patternTest(r"^[0-9][0-9][0-9][0-9][0-9][0-9]$", dateString):
            return numberToDate(int("20" + dateString[0:2]), int(dateString[2:4]) - 1, int(dateString[4:]))
        else:
            return dateParse(dateString)

def getNowDate():
    return datetime.datetime.now()

def getDateValue(dateObject):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    try:
        return ((int)(dateObject.timestamp())) * 1000
    except Exception as e:
        return -32400000

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
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
        return newDateObject
    elif mode == "hour":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000 * 60 * 60))) / 1000
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
        return newDateObject
    elif mode == "minute":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000 * 60))) / 1000
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
        return newDateObject
    elif mode == "second":
        stamp = getDateValue(dateObject)
        stamp = (stamp + (num * (1000))) / 1000
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
        return newDateObject
    elif mode == "month":
        thisYear = dateObject.year
        thisMonth = dateObject.month
        thisDate = dateObject.day
        targetMonthNumber = thisMonth + num
        yearNumber = targetMonthNumber // 12
        monthNumber = targetMonthNumber % 12
        if monthNumber == 0:
            monthNumber = 12
            yearNumber = yearNumber - 1

        isErrorExist = False
        try:
            targetDate = numbersToDate(thisYear + yearNumber, monthNumber - 1, thisDate)
            isErrorExist = False
        except:
            isErrorExist = True

        if not isErrorExist:
            middleDateObject = dateObject.replace(year=(thisYear + yearNumber))
            finalDateObject = middleDateObject.replace(month=monthNumber)
            return finalDateObject
        else:
            middle = numbersToDate(thisYear + yearNumber, monthNumber - 1, 1, dateObject.hour, dateObject.minute, dateObject.second)
            middleMiddle = setRelativeDate(middle, 1, "month")
            middleMiddle = setRelativeDate(middleMiddle, -1, "date")
            return middleMiddle

    elif mode == "year":
        try:
            newDateObject = dateObject.replace(year=(dateObject.year + num))
            return newDateObject
        except:
            stamp = getDateValue(dateObject)
            stamp = (stamp + (num * (1000 * 60 * 60 * 24 * 365))) / 1000
            try:
                newDateObject = datetime.datetime.fromtimestamp(stamp)
            except Exception as e:
                newDateObject = numbersToDate(1800, 0, 1)
            return newDateObject
    else:
        raise TypeError("invalid mode")

def toIsoFormatDate(dateObject, backMode: bool = False):
    if not isinstance(dateObject, datetime.datetime):
        raise TypeError("dateObject must be time object")
    stamp = getDateValue(dateObject) / 1000
    if not backMode:
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
        newDateObject = setRelativeDate(newDateObject, -9, "hour")
    else:
        try:
            newDateObject = datetime.datetime.fromtimestamp(stamp)
        except Exception as e:
            newDateObject = numbersToDate(1800, 0, 1)
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

def dateDeepCopy(dateObj):
    stringDate = dateToString(dateObj, True)
    dateArr = stringDate.split(" ")
    dateArr1 = listMap(dateArr[0].split("-"), lambda x: int(x.strip()))
    dateArr2 = listMap(dateArr[1].split(":"), lambda x: int(x.strip()))
    return numberToDate(dateArr1[0], dateArr1[1] - 1, dateArr1[2], dateArr2[0], dateArr2[1], dateArr2[2])

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

def bytesJsonParse(target: bytes):
    return json.loads(patternReplace(patternReplace(str(target), r"^b[\'\"\\]", ""), r"[\'\"\\]$", ""))

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

async def aliveTest(url, callback, timeoutMilliSeconds: int = 2000):
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=round(timeoutMilliSeconds / 1000))) as session:
        try:
            async with session.get(url) as response:
                await response.text()
                callback(url, True)
        except Exception as e:
            callback(url, False)

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
        os.makedirs(detail[0])
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
    elif command == "rename":
        if len(detail) != 2:
            raise Exception("invalid detail command length")
        os.rename(detail[0], detail[1])
        return "success"
    elif command == "move":
        if len(detail) != 2:
            raise Exception("invalid detail command length")
        shutil.move(detail[0], detail[1])
        return "success"
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
        elif config["method"] == "patch":
            method = "patch"
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
                        if type(data[key]) is str or type(data[key]) is int or type(data[key]) is float:
                            params[key] = data[key]
                        elif type(data[key]) is dict or type(data[key]) is list:
                            params[key] = jsonStringify(data[key])
                        elif type(data[key]) is bool:
                            if data[key]:
                                params[key] = "true"
                            else:
                                params[key] = "false"
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
                        if type(data[key]) is str or type(data[key]) is int or type(data[key]) is float:
                            params[key] = data[key]
                        elif type(data[key]) is dict or type(data[key]) is list:
                            params[key] = jsonStringify(data[key])
                        elif type(data[key]) is bool:
                            if data[key]:
                                params[key] = "true"
                            else:
                                params[key] = "false"
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
                        data[key] = jsonStringify(list(data[key]))
                    if type(data[key]) is dict:
                        if len(value) == 3 and "path" in data[key] and "fileName" in data[key] and "contentType" in data[key]:
                            fileBinary = await fileSystem("readBinary", [ value["path"] ])
                            postData[key] = (value["fileName"], fileBinary, value["contentType"])
                        else:
                            postData[key] = jsonStringify(value)
                    else:
                        postData[key] = jsonStringify(value)
                elif type(data[key]) is str or type(data[key]) is bool or type(data[key]) is int or type(data[key]) is float or type(data[key]) is complex:
                    if type(data[key]) is bool:
                        if data[key]:
                            postData[key] = "true"
                        else:
                            postData[key] = "false"
                    else:
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
    elif method == "patch":
        if postType == "json":
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.patch(url, data=jsonStringify(data)) as response:
                    body = await response.text()
                    if not isJson(body):
                        return body
                    else:
                        return equalJson(body)
        else:
            async with aiohttp.ClientSession(headers=headers) as session:
                async with session.patch(url, data=urlencode(data)) as response:
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

    fairy = False
    if "fairy" in obj and obj["fairy"] == True:
        fairy = True
    else:
        fairy = False

    target = None
    if "target" in obj and type(obj["target"]) is list:
        target = obj["target"]
    else:
        target = None

    response = await requestSystem(recordUrl, { "text": obj["text"], "channel": obj["channel"], "collection": "errorLog", "voice": voice, "target": target, "fairy": fairy }, {
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

def setInterval(func, microseconds: int):
    scheduler = BackgroundScheduler()
    @scheduler.scheduled_job("interval", seconds=(microseconds / 1000), id="job_" + str(uniqueValue("number")))
    def job():
        func()
    scheduler.start()

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

async def decodeMultipart(thisRequest):
    class MiddleBody:
        def __init__(self, bytesData: bytes, headers):
            self.content = bytesData
            self.headers = headers
    target = MiddleBody((await thisRequest.get_data()), thisRequest.headers)
    multipart_data = decoder.MultipartDecoder.from_response(target)
    resultDict = {}
    for part in multipart_data.parts:
        keyTarget = str(part.headers[b'Content-Disposition']).split("name=")[1]
        keyTarget = patternReplace(keyTarget, r"[\"\'\\]", "")
        resultDict[keyTarget] = part.content

    return resultDict

def serviceParsing(serviceObj = False, startDateMode = False, initialMode = False):
    onoffString = [ "온라인", "오프라인" ]
    serviceString = [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "엑스트라 스타일링" ]
    serviceInitial = [ "F", "S", "T", "XT" ]
    startDateNumbers = [ 30, 45, 60, 60 ]
    xValueString = [ "mini", "basic", "premium" ]
    seridKeywords = "s2011_aa0"

    if type(serviceObj) is dict:
        online = serviceObj["online"]
        serid = serviceObj["serid"]
        xValue = serviceObj["xValue"]

        finalWords = ""
        if online:
            finalWords += onoffString[0]
        else:
            finalWords += onoffString[1]
        finalWords += " "

        if patternTest(r"_", serid) and serid.split("_").__len__() == 2:
            if patternTest(r"aa01s", serid):
                finalWords += serviceString[0] + " "
                startDateNumber = startDateNumbers[0]
                initial = serviceInitial[0]
            elif patternTest(r"aa02s", serid):
                finalWords += serviceString[1] + " "
                startDateNumber = startDateNumbers[1]
                initial = serviceInitial[1]
            elif patternTest(r"aa03s", serid):
                finalWords += serviceString[2] + " "
                startDateNumber = startDateNumbers[2]
                initial = serviceInitial[2]
            elif patternTest(r"aa04s", serid):
                finalWords += serviceString[3] + " "
                startDateNumber = startDateNumbers[3]
                initial = serviceInitial[3]
        else:
            if patternTest(r"1", serid):
                finalWords += serviceString[0] + " "
                startDateNumber = startDateNumbers[0]
                initial = serviceInitial[0]
            elif patternTest(r"2", serid):
                finalWords += serviceString[1] + " "
                startDateNumber = startDateNumbers[1]
                initial = serviceInitial[1]
            elif patternTest(r"3", serid):
                finalWords += serviceString[2] + " "
                startDateNumber = startDateNumbers[2]
                initial = serviceInitial[2]
            elif patternTest(r"4", serid):
                finalWords += serviceString[3] + " "
                startDateNumber = startDateNumbers[3]
                initial = serviceInitial[3]

        if patternTest(r"M", xValue):
            finalWords += xValueString[0]
        elif patternTest(r"B", xValue):
            finalWords += xValueString[1]
        elif patternTest(r"P", xValue):
            finalWords += xValueString[2]

        if startDateMode:
            return startDateNumber
        elif initialMode:
            return initial
        else:
            return finalWords

    elif type(serviceObj) is str:
        
        tempArr = serviceObj.split("_")
        if len(tempArr) > 1:
            serviceNumber = int(patternReplace(patternReplace(tempArr[1], r"[a-z]", ""), r"^0", "")) - 1
            return serviceString[serviceNumber]
        else:
            tempArr = serviceObj.split(" ")
            thisXValue = tempArr[len(tempArr) - 1][0:1].upper()
            thisOnline = patternTest(r"online", serviceObj) or patternTest(r"온라인", serviceObj)

            thisSerid = seridKeywords
            if patternTest(r"홈퍼니싱", serviceObj):
                thisSerid += str(1)
            elif patternTest(r"홈스타일링", serviceObj):
                thisSerid += str(2)
            elif patternTest(r"토탈 스타일링", serviceObj):
                thisSerid += str(3)
            else:
                thisSerid += str(4)
            thisSerid += 's'

            return {
                "serid": thisSerid,
                "xValue": thisXValue,
                "online": thisOnline
            }

    else:
        return {
            "onoff": onoffString,
            "name": serviceString,
            "date": startDateNumbers,
            "xValue": xValueString
        }

def cryptoString(password: str, targetString: str) -> str:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
        iterations=480000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(bytes(password, "utf-8")))
    fernet = Fernet(key)
    token = fernet.encrypt(bytes(targetString, "utf-8"))
    hexToken = binascii.hexlify(token).decode("utf-8")
    return hexToken

def decryptoHash(password: str, hash: str) -> str:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",
        iterations=480000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(bytes(password, "utf-8")))
    fernet = Fernet(key)
    result = fernet.decrypt(binascii.unhexlify(hash))
    return result.decode("utf-8")

def getMimeTypes(exeName: str = ""):
    default = "application/octet-stream"
    mimeTypes = {
        "aac": "audio/aac",
        "abw": "application/x-abiword",
        "apng": "image/apng",
        "arc": "application/x-freearc",
        "avif": "image/avif",
        "avi": "video/x-msvideo",
        "azw": "application/vnd.amazon.ebook",
        "bin": "application/octet-stream",
        "bmp": "image/bmp",
        "bz": "application/x-bzip",
        "bz2": "application/x-bzip2",
        "cda": "application/x-cdf",
        "csh": "application/x-csh",
        "css": "text/css",
        "csv": "text/csv",
        "doc": "application/msword",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "eot": "application/vnd.ms-fontobject",
        "epub": "application/epub+zip",
        "gz": "application/gzip",
        "gif": "image/gif",
        "htm": "text/html",
        "html": "text/html",
        "ico": "image/vnd.microsoft.icon",
        "ics": "text/calendar",
        "jar": "application/java-archive",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "jsonld": "application/ld+json",
        "mid": "audio/midi",
        "midi": "audio/midi",
        "mjs": "text/javascript",
        "mp3": "audio/mpeg",
        "mp4": "video/mp4",
        "mpeg": "video/mpeg",
        "mpkg": "application/vnd.apple.installer+xml",
        "odp": "application/vnd.oasis.opendocument.presentation",
        "ods": "application/vnd.oasis.opendocument.spreadsheet",
        "odt": "application/vnd.oasis.opendocument.text",
        "oga": "audio/ogg",
        "ogv": "video/ogg",
        "ogx": "application/ogg",
        "opus": "audio/opus",
        "otf": "font/otf",
        "png": "image/png",
        "pdf": "application/pdf",
        "php": "application/x-httpd-php",
        "ppt": "application/vnd.ms-powerpoint",
        "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "rar": "application/vnd.rar",
        "rtf": "application/rtf",
        "sh": "application/x-sh",
        "svg": "image/svg+xml",
        "tar": "application/x-tar",
        "tif": "image/tiff",
        "tiff": "image/tiff",
        "ts": "video/mp2t",
        "ttf": "font/ttf",
        "txt": "text/plain",
        "vsd": "application/vnd.visio",
        "wav": "audio/wav",
        "weba": "audio/webm",
        "webm": "video/webm",
        "webp": "image/webp",
        "woff": "font/woff",
        "woff2": "font/woff2",
        "xhtml": "application/xhtml+xml",
        "xls": "application/vnd.ms-excel",
        "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "xml": "application/xml",
        "xul": "application/vnd.mozilla.xul+xml",
        "zip": "application/zip",
        "3gp": "video/3gpp",
        "3g2": "video/3gpp2",
        "7z": "application/x-7z-compressed",
    }
    exeName = exeName.strip()
    if exeName == "":
        return mimeTypes
    else:
        try:
            if exeName in mimeTypes:
                return mimeTypes[exeName]
            else:
                return default
        except:
            return default
