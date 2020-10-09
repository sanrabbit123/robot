import subprocess
import time
import sys
from pathlib import Path
from os import path as osPath

class RobotInstall:
    def __init__(self):
        self.install = [
            [ "notion" ],
            [ "flask" ],
            [ "pymysql" ],
            [ "pymongo" ],
            [ "argparse" ],
            [ "cryptography" ],
        ]
        self.upgrade = [
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
        ]
        self.homeDir = str(Path.home())
        self.tempDir = ""
        thisFile = osPath.abspath(__file__)
        thisFileArr = thisFile.split('/')
        thisFileArr.pop()
        self.robotPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.robotPath + "/" + self.moduleFolder

    def setTempDir(self):
        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName
        # subprocess.run([ "mkdir", self.tempDir ], shell=False, encoding='utf8')

    def moduleInstall(self):
        target = "--target=" + self.tempDir
        # for module in self.install:
        #     commandList = []
        #     commandList.append("pip3")
        #     commandList.append("install")
        #     for m in module:
        #         commandList.append(m)
        #     commandList.append(target)
        #     subprocess.run(commandList, shell=False, encoding='utf8')
        # for module in self.upgrade:
        #     commandList = []
        #     commandList.append("pip3")
        #     commandList.append("install")
        #     commandList.append("--upgrade")
        #     for m in module:
        #         commandList.append(m)
        #     commandList.append(target)
        #     subprocess.run(commandList, shell=False, encoding='utf8')

    def moveModules(self):
        bridge = self.homeDir + "/" + self.moduleFolder
        # subprocess.run([ "mv", self.tempDir, bridge ], shell=False, encoding='utf8')
        # subprocess.run([ "mv", bridge, self.modulePath ], shell=False, encoding='utf8')

    def ignoreDirs(self):
        targetList = [
            "/binary",
            "/temp",
            "/pems",
            "/apps/mapMaker/svgTong",
        ]
        # for dir in targetList:
            # subprocess.run([ "mkdir", (self.robotPath + "/" + dir) ], shell=False, encoding='utf8')

    def launching(self):
        self.setTempDir()
        self.ignoreDirs()
        self.moduleInstall()
        self.moveModules()
        return self.modulePath

installApps = RobotInstall()
modulePath = installApps.launching()
sys.path.append(modulePath)

from cryptography.fernet import Fernet

class EnDecrypt:
    def __init__(self, key=None):
        if key is None:
            key = Fernet.generate_key()
        self.key = key
        self.f = Fernet(self.key)

    def encrypt(self, data):
        if isinstance(data, bytes):
            ou = self.f.encrypt(data)
        else:
            ou = self.f.encrypt(data.encode('utf-8'))
        return ou

    def decrypt(self, data):
        if isinstance(data, bytes):
            ou = self.f.decrypt(data)
        else:
            ou = self.f.decrypt(data.encode('utf-8'))
        return ou.decode('utf-8')

key = b'LzFvkoJV2t_X4OeMCu3-YaTCrpdn2ZdfMJqVGw4PK5o='
token = b'gAAAAABfgJAg2nu0K2GpcFtD923oJsW84yVHG62Sr62PhAt0DBBx3S2yBJjQ2lT7voG79WJqRmN_RNKKQPAGualLXdmvoCqLdA=='
enDecrypt = EnDecrypt(key)
print(enDecrypt.decrypt(token))
