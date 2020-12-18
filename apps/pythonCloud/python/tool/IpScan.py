import subprocess
import sys

class IpScan:

    def __init__(self):
        commandList = []
        commandList.append("sudo")
        commandList.append("arp-scan")
        commandList.append("--interface=eth0")
        commandList.append("--localnet")

        arpScanStout = subprocess.check_output(commandList, encoding="utf-8")
        arpScanStoutList = arpScanStout.split("\n")

        refinedList = []
        for i in arpScanStoutList:
            if i[0:3] == "172":
                refinedList.append(i)

        resultList = []
        for i in refinedList:
            tempList = i.split("\t")
            tempDic = {}
            tempDic["ip"] = tempList[0]
            tempDic["mac"] = tempList[1]
            resultList.append(tempDic)

        self.ipList = resultList

    def getIpFromMac(self, mac):
        finalList = []
        for i in self.ipList:
            if i["mac"] == mac:
                finalList.append(i["ip"])

        if finalList.__len__() > 0:
            return finalList[0]
        else:
            return None

    def getMacFromIp(self, ip):
        finalList = []
        for i in self.ipList:
            if i["ip"] == ip:
                finalList.append(i["mac"])

        if finalList.__len__() > 0:
            return finalList[0]
        else:
            return None
